/*
    Copyright (C) 2025, Paul Hammant

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation, either version 3 of the
    License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

document.addEventListener('DOMContentLoaded', async () => {
    const content = document.getElementById('content');
    const settingsLink = document.getElementById('settingsLink');
    const debugLink = document.getElementById('debugLink');

    // Open settings
    settingsLink.addEventListener('click', (e) => {
        e.preventDefault();
        browser.runtime.openOptionsPage();
    });

    // Show debug panel
    debugLink.addEventListener('click', async (e) => {
        e.preventDefault();
        await showDebugPanel();
    });

    // Get verification history from background
    try {
        const history = await browser.runtime.sendMessage({ type: 'getHistory' });

        if (!history || history.length === 0) {
            // Show default empty state
            return;
        }

        // Render verification history
        let html = '';

        for (const result of history) {
            html += renderResultCard(result);
        }

        // Add clear history link
        html += `
            <div class="clear-history">
                <a href="#" id="clearHistory">Clear history</a>
            </div>
        `;

        content.innerHTML = html;

        // Add event listeners for details toggles
        document.querySelectorAll('.details-toggle').forEach(toggle => {
            toggle.addEventListener('click', () => {
                const details = toggle.nextElementSibling;
                const isVisible = details.classList.toggle('visible');
                toggle.innerHTML = isVisible ? '\u25BC Hide details' : '\u25B6 Show details';
            });
        });

        // Add event listeners for copy buttons
        document.querySelectorAll('.copy-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                e.stopPropagation();
                const text = btn.dataset.text;
                await navigator.clipboard.writeText(text);
                const original = btn.textContent;
                btn.textContent = 'Copied!';
                setTimeout(() => btn.textContent = original, 1500);
            });
        });

        // Clear history handler
        document.getElementById('clearHistory')?.addEventListener('click', async (e) => {
            e.preventDefault();
            await browser.runtime.sendMessage({ type: 'clearHistory' });
            content.innerHTML = `
                <div class="no-results">
                    <h2>No verifications yet</h2>
                    <p>Select text containing a verify: URL in an email,<br>then right-click and choose "Verify this claim"</p>
                    <div class="shortcut">Cmd+Shift+V / Ctrl+Shift+V</div>
                </div>
            `;
        });

    } catch (error) {
        console.error('Failed to get history:', error);
        content.innerHTML = `
            <div class="no-results">
                <h2>Connection Error</h2>
                <p>Could not connect to extension background.<br>
                Try reloading the extension in Add-ons Manager</p>
                <div class="error-detail">${escapeHtml(error.message)}</div>
            </div>
        `;
    }
});

function renderResultCard(result) {
    const isVerified = result.success;
    const isError = result.error && !result.domain;

    // Determine badge type and text
    let badgeClass, badgeText;
    if (isVerified) {
        badgeClass = 'verified';
        badgeText = 'Verified';
    } else if (isError) {
        badgeClass = 'error';
        badgeText = 'Error';
    } else {
        badgeClass = 'failed';
        badgeText = 'Not Verified';
    }

    // Format timestamp
    const time = result.timestamp ? new Date(result.timestamp).toLocaleTimeString() : '';
    const date = result.timestamp ? new Date(result.timestamp).toLocaleDateString() : '';

    // Status text with better error messages
    let statusText = '';
    if (result.error) {
        statusText = getReadableError(result.error);
    } else if (result.status) {
        statusText = result.success ? `Verified by issuer` : result.status;
    }

    // Build HTML
    let html = `
        <div class="result-card">
            <div class="result-header">
                <span class="status-badge ${badgeClass}">${badgeText}</span>
                ${result.domain ? `<span class="by-domain">by ${formatDomainEmphasis(result.domain, result.registrableDomain)}</span>` : ''}
                ${!isVerified && statusText ? `<span class="status-text ${isError ? 'error' : ''}">${escapeHtml(statusText)}</span>` : ''}
                <div class="result-timestamp">${time}<br>${date}</div>
            </div>
    `;

    // Show claim text if available
    if (result.certText) {
        html += `
            <div class="claim-section">
                <div class="label">
                    Claim Text
                    <span class="copy-btn" data-text="${escapeAttr(result.certText)}">Copy</span>
                </div>
                <div class="claim-text">${escapeHtml(result.certText)}</div>
            </div>
        `;
    }

    // Details toggle (for power users)
    if (result.hash || result.verificationUrl || result.normalizedText) {
        html += `
            <div class="details-toggle">\u25B6 Show details</div>
            <div class="details-content">
        `;

        if (result.hash) {
            html += `
                <div class="detail-row">
                    <div class="label">SHA-256 Hash</div>
                    <div class="value mono">${result.hash}</div>
                </div>
            `;
        }

        if (result.verificationUrl) {
            html += `
                <div class="detail-row">
                    <div class="label">Verification URL</div>
                    <div class="value mono">${escapeHtml(result.verificationUrl)}</div>
                </div>
            `;
        }

        if (result.normalizedText && result.normalizedText !== result.certText) {
            html += `
                <div class="detail-row">
                    <div class="label">Normalized Text (hashed)</div>
                    <div class="value mono" style="white-space: pre-wrap; max-height: 100px; overflow-y: auto;">${escapeHtml(result.normalizedText)}</div>
                </div>
            `;
        }

        if (result.elapsed) {
            html += `
                <div class="detail-row">
                    <div class="label">Verification Time</div>
                    <div class="value">${result.elapsed}ms</div>
                </div>
            `;
        }

        html += `</div>`;
    }

    html += `</div>`;
    return html;
}

function getReadableError(error) {
    if (error.includes('No verify:') || error.includes('No vfy:')) {
        return 'No verify: URL found in selection';
    }
    if (error.includes('No certification text')) {
        return 'No text found before the verify: URL. Select the full claim including content.';
    }
    if (error.includes('Network error') || error.includes('fetch')) {
        return 'Network error - could not reach verification server';
    }
    if (error.includes('CORS')) {
        return 'Server blocked the request (CORS). The issuer may not support browser verification.';
    }
    return error;
}

function formatDomainEmphasis(domain, registrableDomain) {
    if (registrableDomain && domain.includes(registrableDomain)) {
        // Bold only the registrable domain portion within the full hostname
        const escaped = escapeHtml(domain);
        const regEscaped = escapeHtml(registrableDomain);
        return escaped.replace(
            regEscaped,
            `<strong>${regEscaped}</strong>`
        );
    }
    return `<strong>${escapeHtml(domain)}</strong>`;
}

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function escapeAttr(text) {
    if (!text) return '';
    return text.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

async function showDebugPanel() {
    const content = document.getElementById('content');

    let debugInfo = {
        extensionId: browser.runtime.id,
        backgroundConnected: false,
        localStorageWorks: false,
        historyCount: 0,
        lastError: null
    };

    // Test background connection
    try {
        const history = await browser.runtime.sendMessage({ type: 'getHistory' });
        debugInfo.backgroundConnected = true;
        debugInfo.historyCount = history ? history.length : 0;
    } catch (e) {
        debugInfo.lastError = e.message;
    }

    // Test local storage directly
    try {
        await browser.storage.local.set({ _test: Date.now() });
        const result = await browser.storage.local.get('_test');
        debugInfo.localStorageWorks = !!result._test;
        await browser.storage.local.remove('_test');

        // Get raw local storage
        const rawStorage = await browser.storage.local.get('verificationHistory');
        debugInfo.rawHistory = rawStorage.verificationHistory || [];
        debugInfo.rawHistoryCount = debugInfo.rawHistory.length;
    } catch (e) {
        debugInfo.localStorageError = e.message;
        debugInfo.rawHistory = [];
    }

    content.innerHTML = `
        <div class="debug-panel">
            <h3>Debug Information</h3>
            <div class="debug-item">
                <div class="debug-label">Extension ID</div>
                <div class="debug-value">${debugInfo.extensionId}</div>
            </div>
            <div class="debug-item">
                <div class="debug-label">Background Connection</div>
                <div class="debug-value ${debugInfo.backgroundConnected ? 'ok' : 'error'}">
                    ${debugInfo.backgroundConnected ? 'Connected' : 'Failed: ' + debugInfo.lastError}
                </div>
            </div>
            <div class="debug-item">
                <div class="debug-label">Local Storage</div>
                <div class="debug-value ${debugInfo.localStorageWorks ? 'ok' : 'error'}">
                    ${debugInfo.localStorageWorks ? 'Working' : 'Failed: ' + (debugInfo.localStorageError || 'Unknown')}
                </div>
            </div>
            <div class="debug-item">
                <div class="debug-label">History Count (via message)</div>
                <div class="debug-value">${debugInfo.historyCount}</div>
            </div>
            <div class="debug-item">
                <div class="debug-label">History Count (raw storage)</div>
                <div class="debug-value">${debugInfo.rawHistoryCount}</div>
            </div>
            ${debugInfo.rawHistory.length > 0 ? `
                <div class="debug-item" style="margin-top: 12px;">
                    <div class="debug-label">Stored Verifications</div>
                    ${debugInfo.rawHistory.map((item, i) => `
                        <div style="margin-top: 8px; padding: 8px; background: #fff; border-radius: 4px; border: 1px solid #e5e7eb;">
                            <div style="font-size: 10px; color: #6b7280;">#${i + 1} - ${item.success ? '\u2713 Verified' : '\u2717 Not Verified'} - ${item.domain || 'No domain'}</div>
                            ${item.error ? `<div style="color: #dc2626; font-size: 10px;">Error: ${escapeHtml(item.error)}</div>` : ''}
                            ${item.certText ? `
                                <div style="margin-top: 4px; font-size: 10px; color: #6b7280;">Claim text:</div>
                                <div style="font-size: 10px; white-space: pre-wrap; max-height: 80px; overflow-y: auto; background: #f9fafb; padding: 4px; border-radius: 2px;">${escapeHtml(item.certText)}</div>
                            ` : ''}
                            ${item.rawSelection ? `
                                <div style="margin-top: 4px; font-size: 10px; color: #6b7280;">Raw selection (urlLineIndex: ${item.urlLineIndex}):</div>
                                <div style="font-size: 10px; white-space: pre-wrap; max-height: 120px; overflow-y: auto; background: #fef3c7; padding: 4px; border-radius: 2px; border: 1px solid #fbbf24;">${escapeHtml(item.rawSelection)}</div>
                            ` : ''}
                            ${!item.certText && !item.rawSelection ? '<div style="font-size: 10px; color: #9ca3af;">No claim text captured</div>' : ''}
                            ${item.hash ? `<div style="margin-top: 4px; font-size: 9px; color: #9ca3af;">Hash: ${item.hash.substring(0, 16)}...</div>` : ''}
                        </div>
                    `).join('')}
                </div>
            ` : ''}
            <div class="debug-item" style="margin-top: 16px;">
                <a href="#" id="backToResults" style="color: #3b82f6;">\u2190 Back to results</a>
            </div>
        </div>
    `;

    document.getElementById('backToResults').addEventListener('click', (e) => {
        e.preventDefault();
        location.reload();
    });
}

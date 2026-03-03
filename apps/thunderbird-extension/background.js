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

/**
 * Background script for Thunderbird LiveVerify extension
 * Adapted from browser extension for Thunderbird MailExtension APIs
 *
 * Functions from shared/ scripts are available globally:
 * - normalizeText, sha256, applyDocSpecificNorm (from shared/normalize.js)
 * - extractVerificationUrl, extractCertText, buildVerificationUrl, extractDomain,
 *   fetchVerificationMeta, verifyHash, checkAuthorization (from shared/verify.js)
 * - extractDomainAuthority (from shared/domain-authority.js)
 * - psl (from shared/psl.js)
 */

// Default settings
const DEFAULT_SETTINGS = {
    intrusiveness: 'maximum', // 'maximum', 'standard', 'minimal'
};

// Maximum history items to store
const MAX_HISTORY = 20;

// Verification history (in-memory, cleared on restart)
// Thunderbird doesn't have session storage, so we use memory for privacy
let verificationHistory = [];

// Load history from local storage on startup (optional persistence)
browser.storage.local.get('verificationHistory').then(result => {
    if (result.verificationHistory) {
        verificationHistory = result.verificationHistory;
    }
});

// Create context menu for message display
messenger.menus.create({
    id: 'verify-selection',
    title: 'Verify this claim',
    contexts: ['selection'],
    viewTypes: ['messageDisplay']
});

// Handle context menu click
messenger.menus.onClicked.addListener(async (info, tab) => {
    if (info.menuItemId === 'verify-selection') {
        try {
            // Get selected text from the message display tab
            const selectedText = await getSelectedText(tab);

            if (!selectedText) {
                const result = {
                    success: false,
                    error: 'No text selected',
                    timestamp: new Date().toISOString()
                };
                addToHistory(result);
                await showResult(result);
                return;
            }

            await verifySelection(selectedText, tab);
        } catch (error) {
            const result = {
                success: false,
                error: `Verification error: ${error.message}`,
                timestamp: new Date().toISOString()
            };
            addToHistory(result);
            await showResult(result);
        }
    }
});

// Handle keyboard shortcut
browser.commands.onCommand.addListener(async (command) => {
    if (command === 'verify-selection') {
        // Get the active message display tab
        const tabs = await messenger.tabs.query({ active: true, currentWindow: true });
        const tab = tabs[0];

        if (tab && tab.type === 'messageDisplay') {
            try {
                const selectedText = await getSelectedText(tab);
                if (selectedText) {
                    await verifySelection(selectedText, tab);
                }
            } catch (error) {
                console.error('Failed to get selection:', error);
            }
        }
    }
});

// Get selected text from a message display tab
async function getSelectedText(tab) {
    if (!tab || tab.type !== 'messageDisplay') {
        return null;
    }

    try {
        const results = await messenger.tabs.executeScript(tab.id, {
            code: 'window.getSelection().toString()'
        });
        return results[0] || null;
    } catch (error) {
        console.error('Failed to execute script:', error);
        return null;
    }
}

// Main verification function
async function verifySelection(selectedText, tab) {
    const startTime = Date.now();

    // Extract verification URL
    const { url: baseUrl, urlLineIndex } = extractVerificationUrl(selectedText);

    if (!baseUrl) {
        const result = {
            success: false,
            error: 'No verify: or vfy: URL found in selection',
            timestamp: new Date().toISOString()
        };
        addToHistory(result);
        await showResult(result);
        return;
    }

    const domain = extractDomain(baseUrl);

    // Extract certification text (before URL line, strip brackets)
    const certText = extractCertText(selectedText, urlLineIndex);

    if (!certText.trim()) {
        const result = {
            success: false,
            error: 'No certification text found before verify URL',
            domain,
            rawSelection: selectedText,
            urlLineIndex,
            timestamp: new Date().toISOString()
        };
        addToHistory(result);
        await showResult(result);
        return;
    }

    // Fetch verification meta (optional)
    const meta = await fetchVerificationMeta(baseUrl);

    // Normalize text
    const normalizedText = normalizeText(certText, meta);

    // Compute hash
    const hash = await sha256(normalizedText);

    // Build verification URL
    const verificationUrl = buildVerificationUrl(baseUrl, hash, meta);

    // Verify against endpoint
    const verifyResult = await verifyHash(verificationUrl, meta);

    // Extract registrable domain via PSL for domain emphasis display
    let registrableDomain = '';
    let domainNotListed = false;
    try {
        registrableDomain = extractDomainAuthority(verificationUrl);
        if (typeof psl !== 'undefined' && psl.parse) {
            const parsed = psl.parse(verifyResult.domain);
            if (!parsed.listed) {
                domainNotListed = true;
            }
        }
    } catch {
        // Fall back to simple domain
    }

    // Check authorization if metadata has endorsedBy
    let authorization = null;
    if (meta && meta.endorsedBy) {
        // Compute metaUrl from baseUrl
        let metaHttpsBase = baseUrl;
        const lowerBase2 = baseUrl.toLowerCase();
        if (lowerBase2.startsWith('verify:')) {
            metaHttpsBase = `https://${baseUrl.substring(7)}`;
        } else if (lowerBase2.startsWith('vfy:')) {
            metaHttpsBase = `https://${baseUrl.substring(4)}`;
        }
        const metaUrl = `${metaHttpsBase}/verification-meta.json`;
        try {
            authorization = await checkAuthorization(meta, metaUrl, verificationUrl);
        } catch {
            authorization = { checked: false, confirmed: false, authorizer: meta.endorsedBy.split('/')[0], description: null, expired: false, successor: null, error: 'Check failed', chain: [] };
        }
    }

    const elapsed = Date.now() - startTime;

    const result = {
        success: verifyResult.success,
        status: verifyResult.status,
        domain: verifyResult.domain,
        registrableDomain,
        domainNotListed,
        authorization,
        hash,
        verificationUrl,
        certText,
        normalizedText,
        elapsed,
        timestamp: new Date().toISOString()
    };

    addToHistory(result);
    await showResult(result);
}

// Add result to history
function addToHistory(result) {
    verificationHistory.unshift(result);
    // Keep only the most recent items
    if (verificationHistory.length > MAX_HISTORY) {
        verificationHistory = verificationHistory.slice(0, MAX_HISTORY);
    }
    // Persist to local storage
    browser.storage.local.set({ verificationHistory });
}

// Show result based on intrusiveness setting
async function showResult(result) {
    const settings = await getSettings();

    // Update badge on message_display_action
    await messenger.messageDisplayAction.setBadgeText({
        text: result.success ? '\u2713' : '\u2717'
    });
    await messenger.messageDisplayAction.setBadgeBackgroundColor({
        color: result.success ? '#22c55e' : '#ef4444'
    });

    // Clear badge after 30 seconds
    setTimeout(async () => {
        await messenger.messageDisplayAction.setBadgeText({ text: '' });
    }, 30000);

    if (settings.intrusiveness === 'minimal') {
        // Badge only - user clicks to see details
        return;
    }

    // Build notification message
    let message;
    if (result.success) {
        message = `Verified by ${result.domain}`;
    } else if (result.error) {
        message = result.error;
    } else {
        message = `${result.status} (${result.domain})`;
    }

    // Show notification for standard and maximum
    const notificationOptions = {
        type: 'basic',
        iconUrl: result.success ? 'icons/icon-verified-128.png' : 'icons/icon-failed-128.png',
        title: result.success ? 'Verified' : 'Not Verified',
        message,
    };

    // Note: Thunderbird notifications don't support requireInteraction
    // but we can set priority
    if (settings.intrusiveness === 'maximum') {
        notificationOptions.priority = 2;
    }

    try {
        await browser.notifications.create('verification-result', notificationOptions);
    } catch (error) {
        console.error('Failed to show notification:', error);
    }
}

// Get settings from storage
async function getSettings() {
    try {
        const result = await browser.storage.sync.get('settings');
        return { ...DEFAULT_SETTINGS, ...result.settings };
    } catch {
        // Fall back to local storage if sync not available
        try {
            const result = await browser.storage.local.get('settings');
            return { ...DEFAULT_SETTINGS, ...result.settings };
        } catch {
            return DEFAULT_SETTINGS;
        }
    }
}

// Message handler for popup
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'getLatestResult') {
        sendResponse(verificationHistory[0] || null);
    } else if (message.type === 'getHistory') {
        sendResponse(verificationHistory);
    } else if (message.type === 'clearHistory') {
        verificationHistory = [];
        browser.storage.local.set({ verificationHistory });
        sendResponse({ success: true });
    } else if (message.type === 'getSettings') {
        getSettings().then(settings => sendResponse(settings));
        return true; // Keep channel open for async
    } else if (message.type === 'verifyText') {
        // Verify text directly (for potential future use)
        verifyText(message.text).then(result => sendResponse(result));
        return true; // Keep channel open for async
    }
    return true;
});

// Verify text directly
async function verifyText(selectedText) {
    const startTime = Date.now();

    // Extract verification URL
    const { url: baseUrl, urlLineIndex } = extractVerificationUrl(selectedText);

    if (!baseUrl) {
        return {
            success: false,
            error: 'No verify: or vfy: URL found'
        };
    }

    const domain = extractDomain(baseUrl);

    // Extract certification text
    const certText = extractCertText(selectedText, urlLineIndex);

    if (!certText.trim()) {
        return {
            success: false,
            error: 'No certification text found',
            domain
        };
    }

    // Fetch verification meta
    const meta = await fetchVerificationMeta(baseUrl);

    // Normalize and hash
    const normalizedText = normalizeText(certText, meta);
    const hash = await sha256(normalizedText);

    // Build verification URL
    const verificationUrl = buildVerificationUrl(baseUrl, hash, meta);

    // Verify against endpoint
    const verifyResult = await verifyHash(verificationUrl, meta);

    // Extract registrable domain via PSL
    let registrableDomain = '';
    let domainNotListed = false;
    try {
        registrableDomain = extractDomainAuthority(verificationUrl);
        if (typeof psl !== 'undefined' && psl.parse) {
            const parsed = psl.parse(verifyResult.domain);
            if (!parsed.listed) {
                domainNotListed = true;
            }
        }
    } catch {
        // Fall back to simple domain
    }

    // Check authorization if metadata has endorsedBy
    let authorization = null;
    if (meta && meta.endorsedBy) {
        // Compute metaUrl from baseUrl
        let metaHttpsBase2 = baseUrl;
        const lowerBase3 = baseUrl.toLowerCase();
        if (lowerBase3.startsWith('verify:')) {
            metaHttpsBase2 = `https://${baseUrl.substring(7)}`;
        } else if (lowerBase3.startsWith('vfy:')) {
            metaHttpsBase2 = `https://${baseUrl.substring(4)}`;
        }
        const metaUrl2 = `${metaHttpsBase2}/verification-meta.json`;
        try {
            authorization = await checkAuthorization(meta, metaUrl2, verificationUrl);
        } catch {
            authorization = { checked: false, confirmed: false, authorizer: meta.endorsedBy.split('/')[0], description: null, expired: false, successor: null, error: 'Check failed', chain: [] };
        }
    }

    const elapsed = Date.now() - startTime;

    const result = {
        success: verifyResult.success,
        status: verifyResult.status,
        domain: verifyResult.domain,
        registrableDomain,
        domainNotListed,
        authorization,
        hash,
        verificationUrl,
        certText,
        normalizedText,
        elapsed,
        timestamp: new Date().toISOString()
    };

    // Add to history
    addToHistory(result);

    return result;
}

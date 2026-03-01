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
 * Text Selection Verification - Simulates browser-native "Verify" context menu action
 *
 * This script adds text-selection verification capability to web pages.
 * When users select text ending with a verify:/vfy: URL, they can right-click
 * to verify the claim against the issuer's endpoint.
 *
 * Required dependencies (loaded before this script):
 * - normalize.js (normalizeText, sha256)
 * - app-logic.js (extractVerificationUrl, extractCertText, buildVerificationUrl)
 * - domain-authority.js (optional, for getVerificationAuthority)
 */

(function() {
    'use strict';

    // Create verification UI elements
    let verifyButton = null;
    let resultModal = null;
    let currentSelection = '';

    /**
     * Initialize the text selection verification feature
     */
    function init() {
        createVerifyButton();
        createResultModal();
        attachEventListeners();
    }

    /**
     * Create the floating "Verify" button that appears near text selections
     */
    function createVerifyButton() {
        verifyButton = document.createElement('button');
        verifyButton.id = 'tsv-verify-btn';
        verifyButton.innerHTML = '&#x1F50D; Verify?';
        verifyButton.style.cssText = `
            position: fixed;
            display: none;
            padding: 8px 16px;
            background: linear-gradient(135deg, #1976d2 0%, #1565c0 100%);
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            font-size: 14px;
            font-weight: 600;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            z-index: 999999;
            transition: transform 0.1s, box-shadow 0.1s;
        `;
        verifyButton.addEventListener('mouseenter', () => {
            verifyButton.style.transform = 'scale(1.05)';
            verifyButton.style.boxShadow = '0 6px 16px rgba(0,0,0,0.4)';
        });
        verifyButton.addEventListener('mouseleave', () => {
            verifyButton.style.transform = 'scale(1)';
            verifyButton.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
        });
        verifyButton.addEventListener('click', handleVerifyClick);
        document.body.appendChild(verifyButton);
    }

    /**
     * Create the result modal (browser chrome-style, outside content area)
     */
    function createResultModal() {
        resultModal = document.createElement('div');
        resultModal.id = 'tsv-result-modal';
        resultModal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            display: none;
            background: #1a1a2e;
            color: white;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            z-index: 9999999;
            box-shadow: 0 4px 20px rgba(0,0,0,0.5);
        `;
        resultModal.innerHTML = `
            <div id="tsv-modal-header" style="
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 12px 20px;
                border-bottom: 1px solid #333;
            ">
                <div style="display: flex; align-items: center; gap: 16px;">
                    <span id="tsv-status-icon" style="font-size: 32px; line-height: 1; display: flex; align-items: center; justify-content: center;"></span>
                    <div style="flex: 1;">
                        <div id="tsv-status-text" style="font-weight: 600; font-size: 16px;"></div>
                        <div id="tsv-domain" style="font-size: 13px; opacity: 0.8;"></div>
                    </div>
                </div>
                <button id="tsv-close-btn" style="
                    background: none;
                    border: none;
                    color: white;
                    font-size: 24px;
                    cursor: pointer;
                    padding: 4px 8px;
                    opacity: 0.7;
                    transition: opacity 0.2s;
                ">&times;</button>
            </div>
            <div id="tsv-modal-simulation-note" style="
                padding: 8px 20px;
                background: rgba(100, 100, 100, 0.2);
                border-bottom: 1px solid #333;
                font-size: 11px;
                color: #aaa;
                text-align: center;
            ">
                Simulation of a future first-class feature of browsers, but a single browser extension today
            </div>
            <div id="tsv-modal-disclaimer" style="
                display: none;
                padding: 12px 20px;
                background: rgba(72, 187, 120, 0.15);
                border-bottom: 1px solid #333;
                font-size: 12px;
                color: #48bb78;
                font-style: italic;
            ">
                Screencaps of this verified message are not proof of anything
            </div>
            <div id="tsv-modal-details" style="
                display: none;
                padding: 16px 20px;
                background: #16213e;
                font-size: 13px;
                max-height: 200px;
                overflow-y: auto;
            ">
                <div style="margin-bottom: 12px;">
                    <strong style="color: #888;">Normalized Text:</strong>
                    <pre id="tsv-normalized-text" style="
                        margin: 8px 0 0 0;
                        padding: 12px;
                        background: #0f0f23;
                        border-radius: 4px;
                        white-space: pre-wrap;
                        word-break: break-all;
                        font-size: 12px;
                        max-height: 100px;
                        overflow-y: auto;
                    "></pre>
                </div>
                <div>
                    <strong style="color: #888;">SHA-256 Hash:</strong>
                    <code id="tsv-hash" style="
                        display: block;
                        margin-top: 8px;
                        padding: 8px 12px;
                        background: #0f0f23;
                        border-radius: 4px;
                        font-size: 11px;
                        word-break: break-all;
                    "></code>
                </div>
            </div>
        `;
        document.body.appendChild(resultModal);

        // Close button handler
        resultModal.querySelector('#tsv-close-btn').addEventListener('click', hideResultModal);
        resultModal.querySelector('#tsv-close-btn').addEventListener('mouseenter', (e) => {
            e.target.style.opacity = '1';
        });
        resultModal.querySelector('#tsv-close-btn').addEventListener('mouseleave', (e) => {
            e.target.style.opacity = '0.7';
        });

        // Toggle details on header click
        resultModal.querySelector('#tsv-modal-header').addEventListener('click', (e) => {
            if (e.target.id !== 'tsv-close-btn') {
                const details = resultModal.querySelector('#tsv-modal-details');
                details.style.display = details.style.display === 'none' ? 'block' : 'none';
            }
        });
    }

    /**
     * Attach event listeners for text selection
     */
    function attachEventListeners() {
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('keyup', handleKeyUp);

        // Also support context menu (right-click)
        document.addEventListener('contextmenu', handleContextMenu);
    }

    /**
     * Handle mouse up - check for text selection
     */
    function handleMouseUp(e) {
        // Small delay to let selection finalize
        setTimeout(() => {
            const selection = window.getSelection();
            const selectedText = selection.toString().trim();

            if (selectedText.length > 10 && hasVerificationUrl(selectedText)) {
                currentSelection = selectedText;
                showVerifyButton(e.clientX, e.clientY);
            } else {
                hideVerifyButton();
            }
        }, 10);
    }

    /**
     * Handle mouse down - hide button if clicking outside
     */
    function handleMouseDown(e) {
        if (e.target !== verifyButton && !verifyButton.contains(e.target)) {
            hideVerifyButton();
        }
    }

    /**
     * Handle keyboard selection (Shift+arrow keys, Ctrl+A, etc.)
     */
    function handleKeyUp(e) {
        // Check for selection-related keys
        if (e.shiftKey || e.ctrlKey || e.metaKey) {
            const selection = window.getSelection();
            const selectedText = selection.toString().trim();

            if (selectedText.length > 10 && hasVerificationUrl(selectedText)) {
                currentSelection = selectedText;
                // Position near the end of selection
                const range = selection.getRangeAt(0);
                const rect = range.getBoundingClientRect();
                showVerifyButton(rect.right, rect.bottom);
            }
        }
    }

    /**
     * Handle context menu - add verify option if text selected
     */
    function handleContextMenu(e) {
        const selection = window.getSelection();
        const selectedText = selection.toString().trim();

        if (selectedText.length > 10 && hasVerificationUrl(selectedText)) {
            currentSelection = selectedText;
            showVerifyButton(e.clientX, e.clientY);
        }
    }

    /**
     * Check if text contains a verification URL (verify: or vfy:)
     */
    function hasVerificationUrl(text) {
        const lowerText = text.toLowerCase();
        return lowerText.includes('verify:') || lowerText.includes('vfy:');
    }

    /**
     * Show the verify button near the specified position
     */
    function showVerifyButton(x, y) {
        verifyButton.style.display = 'block';

        // Position button, keeping it within viewport
        const btnRect = verifyButton.getBoundingClientRect();
        const maxX = window.innerWidth - btnRect.width - 10;
        const maxY = window.innerHeight - btnRect.height - 10;

        verifyButton.style.left = Math.min(x + 10, maxX) + 'px';
        verifyButton.style.top = Math.min(y + 10, maxY) + 'px';
    }

    /**
     * Hide the verify button
     */
    function hideVerifyButton() {
        verifyButton.style.display = 'none';
    }

    /**
     * Handle verify button click
     */
    async function handleVerifyClick(e) {
        e.preventDefault();
        e.stopPropagation();
        hideVerifyButton();

        // Clear the text selection so button doesn't reappear
        window.getSelection().removeAllRanges();

        if (!currentSelection) {
            console.warn('[TSV] Verify button clicked but no selection');
            showResult('error', 'No text selected', '', '', '');
            return;
        }

        console.log('[TSV] Verify button clicked. Starting verification process...');
        console.log('[TSV] Selected text length:', currentSelection.length, 'chars');
        showResult('loading', 'Verifying...', '', '', '');

        try {
            await performVerification(currentSelection);
        } catch (error) {
            console.error('[TSV] Verification error:', error);
            showResult('error', 'Verification Error', error.message, '', '');
        }
    }

    /**
     * Perform the verification process
     */
    async function performVerification(text) {
        // Step 1: Extract verification URL from the text
        const { url: baseUrl, urlLineIndex } = extractVerificationUrl(text);

        if (!baseUrl) {
            console.warn('[TSV] No verification URL found in selected text');
            showResult('error', 'No Verification URL Found',
                'Selected text must end with a verify: or vfy: URL', '', '');
            return;
        }

        console.log('[TSV] Extracted base URL:', baseUrl, 'at line', urlLineIndex);

        // Step 2: Extract the certification text (everything before the URL line)
        const certText = extractCertText(text, urlLineIndex);

        if (!certText.trim()) {
            console.warn('[TSV] No certification text found');
            showResult('error', 'No Content to Verify',
                'Selected text must contain content before the verification URL', '', '');
            return;
        }

        console.log('[TSV] Extracted cert text:', certText.substring(0, 50) + '...');

        // Step 3: Try to fetch verification-meta.json for document-specific normalization
        let metadata = null;
        try {
            metadata = await fetchVerificationMeta(baseUrl);
            if (metadata) {
                console.log('[TSV] Loaded document-specific metadata');
            }
        } catch (e) {
            // Metadata is optional, continue without it
            console.log('[TSV] No metadata file found (optional)');
        }

        // Step 4: Normalize the text
        const normalizedText = normalizeText(certText, metadata);
        console.log('[TSV] Normalized text:', normalizedText.substring(0, 50) + '...');

        // Step 5: Compute SHA-256 hash
        const hash = await sha256(normalizedText);
        console.log('[TSV] Computed SHA-256 hash:', hash);

        // Step 6: Build verification URL
        const verificationUrl = buildVerificationUrl(baseUrl, hash);
        console.log('[TSV] Verification URL:', verificationUrl);

        // Step 7: Extract domain for display
        let domain = '';
        let registrableDomain = '';
        let domainNotListed = false;
        try {
            const urlObj = new URL(verificationUrl);
            domain = urlObj.hostname;

            // Use extractDomainAuthority (PSL-based) for registrable domain emphasis
            if (typeof extractDomainAuthority === 'function') {
                registrableDomain = extractDomainAuthority(verificationUrl);
            }
            // Check if domain TLD is recognized by PSL
            if (typeof psl !== 'undefined' && psl.parse) {
                const parsed = psl.parse(domain);
                if (!parsed.listed) {
                    domainNotListed = true;
                }
            }
        } catch (e) {
            domain = baseUrl;
        }

        // Step 8: Perform verification fetch (REAL HTTP verification)
        console.log('[TSV] Starting HTTP verification fetch...');
        try {
            const response = await fetch(verificationUrl, {
                method: 'GET',
                mode: 'cors'
            });

            console.log('[TSV] Verification endpoint returned HTTP', response.status);

            // Step 9: Check endorsement (if metadata has endorsedBy)
            let endorsement = null;
            if (metadata && metadata.endorsedBy) {
                console.log('[TSV] Checking endorsement from', metadata.endorsedBy);
                // Compute metaUrl from baseUrl (same logic as fetchVerificationMeta)
                let metaUrlForEndorsement = baseUrl;
                const lowerBase2 = baseUrl.toLowerCase();
                if (lowerBase2.startsWith('verify:')) {
                    metaUrlForEndorsement = `https://${baseUrl.substring(7)}`;
                } else if (lowerBase2.startsWith('vfy:')) {
                    metaUrlForEndorsement = `https://${baseUrl.substring(4)}`;
                }
                metaUrlForEndorsement = `${metaUrlForEndorsement}/verification-meta.json`;
                try {
                    endorsement = await checkEndorsement(metadata, metaUrlForEndorsement);
                    console.log('[TSV] Endorsement result:', endorsement);
                } catch (e) {
                    console.log('[TSV] Endorsement check failed:', e.message);
                    endorsement = {
                        checked: false,
                        confirmed: false,
                        endorser: metadata.endorsedBy.split('/')[0],
                        description: null,
                        expired: false,
                        successor: null,
                        error: e.message,
                        chain: []
                    };
                }
            }

            if (response.status === 200) {
                const body = await response.text();
                const trimmedBody = body.trim().toUpperCase();

                console.log('[TSV] Response body:', trimmedBody);

                if (trimmedBody === 'OK' || trimmedBody.includes('OK')) {
                    console.log('[TSV] ✓ VERIFICATION SUCCESSFUL - hash matches and endpoint confirmed');
                    showResult('verified', 'VERIFIED', `by ${domain}`, normalizedText, hash,
                        registrableDomain, domainNotListed, endorsement);
                } else {
                    // Show the actual status from the response (e.g., REVOKED)
                    console.log('[TSV] ✗ VERIFICATION FAILED - endpoint returned non-OK status');
                    showResult('denied', trimmedBody || 'UNKNOWN STATUS',
                        `from ${domain}`, normalizedText, hash,
                        registrableDomain, domainNotListed, endorsement);
                }
            } else if (response.status === 404) {
                console.log('[TSV] ✗ VERIFICATION FAILED - hash endpoint not found (404)');
                showResult('failed', 'NOT FOUND',
                    `Hash not registered at ${domain}`, normalizedText, hash,
                    registrableDomain, domainNotListed, endorsement);
            } else {
                console.log('[TSV] ✗ VERIFICATION FAILED - unexpected HTTP status');
                showResult('failed', `HTTP ${response.status}`,
                    `Unexpected response from ${domain}`, normalizedText, hash,
                    registrableDomain, domainNotListed, endorsement);
            }
        } catch (error) {
            console.error('[TSV] Verification error:', error);
            if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
                showResult('error', 'CANNOT VERIFY',
                    `Network error or CORS restriction for ${domain}`, normalizedText, hash,
                    registrableDomain, domainNotListed);
            } else {
                throw error;
            }
        }
    }

    /**
     * Show verification result in the modal
     */
    function showResult(type, status, detail, normalizedText, hash, emphasisDomain, domainNotListed, endorsement) {
        const statusIcon = resultModal.querySelector('#tsv-status-icon');
        const statusText = resultModal.querySelector('#tsv-status-text');
        const domainEl = resultModal.querySelector('#tsv-domain');
        const normalizedEl = resultModal.querySelector('#tsv-normalized-text');
        const hashEl = resultModal.querySelector('#tsv-hash');
        const header = resultModal.querySelector('#tsv-modal-header');
        const details = resultModal.querySelector('#tsv-modal-details');
        const disclaimer = resultModal.querySelector('#tsv-modal-disclaimer');

        // Set content
        statusText.textContent = status;
        if (emphasisDomain && detail.includes(emphasisDomain)) {
            // Bold only the registrable domain within the full hostname
            const escaped = emphasisDomain.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            domainEl.innerHTML = detail.replace(
                new RegExp(escaped),
                `<strong>${emphasisDomain}</strong>`
            );
        } else {
            domainEl.textContent = detail;
        }

        // Warn if domain TLD is not in the Public Suffix List
        let trustWarning = resultModal.querySelector('#tsv-trust-warning');
        if (domainNotListed) {
            if (!trustWarning) {
                trustWarning = document.createElement('div');
                trustWarning.id = 'tsv-trust-warning';
                trustWarning.style.cssText = `
                    padding: 8px 20px;
                    background: rgba(255, 152, 0, 0.2);
                    border-bottom: 1px solid #333;
                    font-size: 12px;
                    color: #ffb74d;
                    text-align: center;
                `;
                const simNote = resultModal.querySelector('#tsv-modal-simulation-note');
                simNote.parentNode.insertBefore(trustWarning, simNote.nextSibling);
            }
            trustWarning.textContent = 'Domain TLD not recognized — treat this verification with caution';
            trustWarning.style.display = 'block';
        } else if (trustWarning) {
            trustWarning.style.display = 'none';
        }

        // Show endorsement status if available
        let endorsementEl = resultModal.querySelector('#tsv-endorsement');
        if (endorsement && endorsement.endorser) {
            if (!endorsementEl) {
                endorsementEl = document.createElement('div');
                endorsementEl.id = 'tsv-endorsement';
                endorsementEl.style.cssText = `
                    padding: 8px 20px;
                    border-bottom: 1px solid #333;
                    font-size: 12px;
                    text-align: center;
                `;
                // Insert after domain element
                domainEl.parentNode.insertBefore(endorsementEl, domainEl.nextSibling);
            }
            let endorsementHtml = '';
            if (endorsement.expired) {
                endorsementEl.style.background = 'rgba(255, 152, 0, 0.2)';
                endorsementEl.style.color = '#ffb74d';
                const toDate = endorsement.successor ? '' : '';
                endorsementHtml = `Endorsement by ${endorsement.endorser} — expired`;
                if (endorsement.successor) {
                    endorsementHtml += `. Successor: ${endorsement.successor}`;
                }
            } else if (endorsement.confirmed) {
                endorsementEl.style.background = 'rgba(72, 187, 120, 0.2)';
                endorsementEl.style.color = '#68d391';
                const desc = endorsement.description ? ` (${endorsement.description})` : '';
                endorsementHtml = `Endorsed by ${endorsement.endorser}${desc}`;
                // Show chain entries if available
                if (endorsement.chain && endorsement.chain.length > 1) {
                    for (let i = 1; i < endorsement.chain.length; i++) {
                        const c = endorsement.chain[i];
                        const cDesc = c.description ? ` (${c.description})` : '';
                        endorsementHtml += `<br>&nbsp;&nbsp;Endorsed by ${c.endorser}${cDesc}`;
                    }
                }
            } else if (endorsement.checked) {
                endorsementEl.style.background = 'rgba(255, 152, 0, 0.2)';
                endorsementEl.style.color = '#ffb74d';
                endorsementHtml = `Endorsement by ${endorsement.endorser} — not confirmed`;
            } else {
                endorsementEl.style.background = 'rgba(158, 158, 158, 0.2)';
                endorsementEl.style.color = '#bdbdbd';
                endorsementHtml = `Endorsement by ${endorsement.endorser} — check unavailable`;
            }
            endorsementEl.innerHTML = endorsementHtml;
            endorsementEl.style.display = 'block';
        } else if (endorsementEl) {
            endorsementEl.style.display = 'none';
        }

        normalizedEl.textContent = normalizedText || '';
        hashEl.textContent = hash || '';

        // Style based on type
        switch (type) {
            case 'verified':
                statusIcon.textContent = '\u2713';
                statusIcon.style.fontSize = '40px';
                statusIcon.style.color = '#fff';
                // Match camera app's green color scheme
                header.style.background = 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)';
                statusText.style.fontSize = '20px';
                statusText.style.fontWeight = '700';
                statusText.style.letterSpacing = '0.5px';
                disclaimer.style.display = 'block';
                break;
            case 'denied':
                statusIcon.textContent = '\u2717';
                header.style.background = 'linear-gradient(135deg, #c62828 0%, #b71c1c 100%)';
                statusText.style.fontSize = '16px';
                disclaimer.style.display = 'none';
                break;
            case 'failed':
                statusIcon.textContent = '\u2717';
                header.style.background = 'linear-gradient(135deg, #d32f2f 0%, #c62828 100%)';
                statusText.style.fontSize = '16px';
                disclaimer.style.display = 'none';
                break;
            case 'error':
                statusIcon.textContent = '\u26A0';
                header.style.background = 'linear-gradient(135deg, #f57c00 0%, #e65100 100%)';
                statusText.style.fontSize = '16px';
                disclaimer.style.display = 'none';
                break;
            case 'loading':
                statusIcon.textContent = '\u23F3';
                header.style.background = 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)';
                statusText.style.fontSize = '16px';
                disclaimer.style.display = 'none';
                break;
        }

        // Show/hide details section
        details.style.display = normalizedText ? 'none' : 'none'; // Start hidden, click to expand

        // Show modal
        resultModal.style.display = 'block';

        // Auto-hide after 8 seconds for success, keep for errors
        if (type === 'verified') {
            setTimeout(hideResultModal, 8000);
        }
    }

    /**
     * Hide the result modal
     */
    function hideResultModal() {
        resultModal.style.display = 'none';
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose for testing/debugging
    window.textSelectionVerify = {
        performVerification,
        hideResultModal
    };

})();

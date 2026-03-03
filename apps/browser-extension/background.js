/*
    Copyright (C) 2025-2026, Paul Hammant

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

// This browser extension is a proof-of-concept / stopgap until browser vendors
// (Chrome, Safari, Firefox) build verify: URL recognition natively into their
// browsers alongside Live Text / Camera Text features. Once that happens, this
// extension becomes obsolete. The native implementations will make their own
// decisions about storage, history, and UX.

import './shared/psl.js';
import { normalizeText, sha256 } from './shared/normalize.js';
import {
    extractVerificationUrl,
    extractCertText,
    buildVerificationUrl,
    extractDomain,
    fetchVerificationMeta,
    verifyHash,
    checkAuthorization
} from './shared/verify.js';
import { extractDomainAuthority } from './shared/domain-authority.js';

console.log('[LiveVerify] Service worker started');

// Hard-coded switch: 'banner' shows an in-page slide-down banner,
// 'notification' uses OS-level system notifications (can be silently suppressed)
const RESULT_DISPLAY = 'banner'; // 'banner' or 'notification'

// Default settings
const DEFAULT_SETTINGS = {
    intrusiveness: 'maximum', // 'maximum', 'standard', 'minimal'
    autoScanPages: false,     // Auto-scan pages for verifiable regions
    autoVerify: false         // Auto-verify detected regions
};

// Maximum history items to store
const MAX_HISTORY = 20;

// Verification history (most recent first) - session storage for privacy
// Automatically cleared when browser closes, but survives service worker restarts
let verificationHistory = [];

// Load history from session storage on startup
chrome.storage.session.get('verificationHistory').then(result => {
    if (result.verificationHistory) {
        verificationHistory = result.verificationHistory;
        console.log('[LiveVerify] Loaded', verificationHistory.length, 'history items from session storage');
    }
});

// Create context menu (runs on every service worker start)
chrome.contextMenus.removeAll().then(() => {
    chrome.contextMenus.create({
        id: 'verify-selection',
        title: 'Verify this claim',
        type: 'normal',
        contexts: ['selection']
    });
    console.log('[LiveVerify] Context menu created');
});

// Handle context menu click
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
    console.log('[LiveVerify] Context menu clicked:', info.menuItemId);
    if (info.menuItemId === 'verify-selection') {
        try {
            // Use scripting to get selection with preserved newlines
            // (info.selectionText strips newlines)
            const [{ result: selectedText }] = await chrome.scripting.executeScript({
                target: { tabId: tab.id },
                func: () => window.getSelection().toString()
            });

            console.log('[LiveVerify] Selected text length:', selectedText?.length || 0);

            if (!selectedText) {
                const result = {
                    success: false,
                    error: 'No text selected',
                    timestamp: new Date().toISOString()
                };
                addToHistory(result);
                await showResult(result, tab);
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
            await showResult(result, tab);
        }
    }
});

// Handle keyboard shortcut
chrome.commands.onCommand.addListener(async (command) => {
    if (command === 'verify-selection') {
        // Get selected text from active tab
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (tab) {
            try {
                const [{ result }] = await chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    func: () => window.getSelection().toString()
                });
                if (result) {
                    await verifySelection(result, tab);
                }
            } catch (error) {
                console.error('Failed to get selection:', error);
            }
        }
    }
});

// Main verification function
async function verifySelection(selectedText, tab) {
    console.log('[LiveVerify] verifySelection started');
    const startTime = Date.now();

    // Extract verification URL
    const { url: baseUrl, urlLineIndex } = extractVerificationUrl(selectedText);
    console.log('[LiveVerify] Extracted URL:', baseUrl, 'at line', urlLineIndex);

    if (!baseUrl) {
        const result = {
            success: false,
            error: 'No verify: or vfy: URL found in selection',
            timestamp: new Date().toISOString()
        };
        addToHistory(result);
        await showResult(result, tab);
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
            rawSelection: selectedText,  // Debug: capture what browser gave us
            urlLineIndex,
            timestamp: new Date().toISOString()
        };
        addToHistory(result);
        await showResult(result, tab);
        return;
    }

    // Fetch verification meta (optional)
    const meta = await fetchVerificationMeta(baseUrl);
    console.log('[LiveVerify] Meta:', meta ? 'loaded' : 'none', meta?.endorsedBy ? `(authorizedBy: ${meta.endorsedBy})` : '');

    // Normalize text
    const normalizedText = normalizeText(certText, meta);

    // Compute hash
    const hash = await sha256(normalizedText);
    console.log('[LiveVerify] Hash:', hash.substring(0, 16) + '...');

    // Build verification URL
    const verificationUrl = buildVerificationUrl(baseUrl, hash, meta);
    console.log('[LiveVerify] Verification URL:', verificationUrl);

    // Verify against endpoint
    const verifyResult = await verifyHash(verificationUrl, meta);
    console.log('[LiveVerify] Verify result:', verifyResult.success ? 'SUCCESS' : 'FAILED', verifyResult.status);

    // Extract registrable domain via PSL for domain emphasis display
    let registrableDomain = '';
    let domainNotListed = false;
    try {
        const authority = extractDomainAuthority(verificationUrl);
        registrableDomain = authority;
        // Check if the TLD is in the PSL
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
        console.log('[LiveVerify] Checking authorization from', meta.endorsedBy);
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
            console.log('[LiveVerify] Authorization result:', JSON.stringify(authorization));
        } catch (e) {
            console.error('[LiveVerify] Authorization check failed:', e.message);
            authorization = { checked: false, confirmed: false, authorizer: meta.endorsedBy.split('/')[0], description: null, expired: false, successor: null, error: 'Check failed', chain: [] };
        }
    }

    const elapsed = Date.now() - startTime;
    console.log('[LiveVerify] Verification complete in', elapsed, 'ms');

    const result = {
        success: verifyResult.success,
        status: verifyResult.status,
        domain: verifyResult.domain,
        registrableDomain,
        domainNotListed,
        authorization,
        hash,
        verificationUrl,
        certText,           // Full claim text
        normalizedText,     // Text after normalization (what was hashed)
        elapsed,
        timestamp: new Date().toISOString()
    };

    addToHistory(result);
    await showResult(result, tab);
}

// Add result to history (session storage for privacy - cleared on browser close)
function addToHistory(result) {
    verificationHistory.unshift(result);
    // Keep only the most recent items
    if (verificationHistory.length > MAX_HISTORY) {
        verificationHistory = verificationHistory.slice(0, MAX_HISTORY);
    }
    // Persist to session storage (survives service worker restarts, cleared on browser close)
    chrome.storage.session.set({ verificationHistory });
}

// Show result — inject a banner into the active tab so the user always sees it
async function showResult(result, tab) {
    // Update badge
    await chrome.action.setBadgeText({
        text: result.success ? '✓' : '✗'
    });
    await chrome.action.setBadgeBackgroundColor({
        color: result.success ? '#22c55e' : '#ef4444'
    });

    // Clear badge after 30 seconds
    setTimeout(async () => {
        await chrome.action.setBadgeText({ text: '' });
    }, 30000);

    if (RESULT_DISPLAY === 'banner') {
        // Inject result banner into the active tab
        if (tab?.id) {
            try {
                await chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    func: showResultBanner,
                    args: [result]
                });
            } catch (error) {
                console.error('[LiveVerify] Failed to inject result banner:', error);
            }
        }
    } else {
        // OS-level system notification
        const settings = await getSettings();

        if (settings.intrusiveness === 'minimal') return;

        let message;
        if (result.success) {
            message = `Verified by ${result.domain}`;
        } else if (result.error) {
            message = result.error;
        } else {
            message = `${result.status} (${result.domain})`;
        }

        const notificationOptions = {
            type: 'basic',
            iconUrl: result.success ? 'icons/icon-verified-128.png' : 'icons/icon-failed-128.png',
            title: result.success ? 'Verified' : 'Not Verified',
            message,
            priority: 2
        };

        if (settings.intrusiveness === 'maximum') {
            notificationOptions.requireInteraction = true;
        }

        try {
            await chrome.notifications.create('verification-result', notificationOptions);
        } catch (error) {
            console.error('[LiveVerify] Failed to show notification:', error);
        }
    }
}

// This function is injected into the page — it must be self-contained
function showResultBanner(result) {
    // Remove any existing banner
    const existing = document.getElementById('liveverify-result-banner');
    if (existing) existing.remove();

    const isVerified = result.success;
    const isError = result.error && !result.domain;

    // Format domain with registrable part bolded: verify.<b>acme-corp.com</b>
    function emph(domain) {
        const reg = result.registrableDomain;
        if (reg && domain && domain.includes(reg)) {
            return domain.replace(reg, `<strong>${reg}</strong>`);
        }
        return domain ? `<strong>${domain}</strong>` : '';
    }

    // Build status text
    let statusText, statusDetail;
    if (isVerified) {
        statusText = 'VERIFIED';
        statusDetail = `by ${emph(result.domain)}`;
    } else if (isError) {
        statusText = 'ERROR';
        statusDetail = result.error;
    } else {
        statusText = result.status || 'NOT VERIFIED';
        statusDetail = result.domain ? `${emph(result.domain)} does not verify this claim` : (result.error || '');
    }

    // Colours
    let bgGradient, iconChar;
    if (isVerified) {
        bgGradient = 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)';
        iconChar = '\u2713';
    } else if (isError) {
        bgGradient = 'linear-gradient(135deg, #f57c00 0%, #e65100 100%)';
        iconChar = '\u26A0';
    } else {
        bgGradient = 'linear-gradient(135deg, #d32f2f 0%, #c62828 100%)';
        iconChar = '\u2717';
    }

    // Create banner
    const banner = document.createElement('div');
    banner.id = 'liveverify-result-banner';
    banner.style.cssText = `
        position: fixed; top: 0; left: 0; right: 0; z-index: 2147483647;
        background: ${bgGradient};
        color: white; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        box-shadow: 0 4px 20px rgba(0,0,0,0.4);
        animation: liveverify-slide-in 0.3s ease-out;
    `;

    // Build authorization HTML
    let authorizationHtml = '';
    if (result.authorization && result.authorization.authorizer) {
        const a = result.authorization;
        const authorizerBold = `<strong>${a.authorizer}</strong>`;
        let aColor, aText;
        if (a.expired) {
            aColor = '#ffb74d';
            aText = `Verification authorization by ${authorizerBold} \u2014 expired`;
            if (a.successor) aText += `. Successor: ${a.successor}`;
        } else if (a.confirmed) {
            aColor = '#c8e6c9';
            aText = `Verification authorized by ${authorizerBold}`;
            if (a.description) aText += ` (${a.description})`;
            if (a.chain && a.chain.length > 1) {
                for (let i = 1; i < a.chain.length; i++) {
                    const c = a.chain[i];
                    aText += ` \u2190 <strong>${c.authorizer}</strong>`;
                    if (c.description) aText += ` (${c.description})`;
                }
            }
        } else if (a.checked) {
            aColor = '#ffb74d';
            aText = `Verification authorization by ${authorizerBold} \u2014 not confirmed`;
        } else {
            aColor = '#ffb74d';
            aText = `${emph(result.domain) || 'Issuer'} claims verification authorization by ${authorizerBold} \u2014 missing`;
        }
        authorizationHtml = `<div style="font-size: 12px; color: ${aColor}; margin-top: 2px;">${aText}</div>`;
    }

    banner.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px 20px;">
            <div style="display: flex; align-items: center; gap: 14px;">
                <span style="font-size: 32px; line-height: 1;">${iconChar}</span>
                <div>
                    <div style="font-weight: 700; font-size: 18px; letter-spacing: 0.5px;">${statusText}</div>
                    <div style="font-size: 13px; opacity: 0.9;">${statusDetail}</div>
                    ${authorizationHtml}
                </div>
            </div>
            <button id="liveverify-close-btn" style="
                background: none; border: none; color: white; font-size: 24px;
                cursor: pointer; padding: 4px 8px; opacity: 0.7; line-height: 1;
            ">&times;</button>
        </div>
        <div style="padding: 4px 20px 6px; background: rgba(0,0,0,0.15); font-size: 11px; opacity: 0.8; text-align: center;">
            LiveVerify browser extension \u2014 screencaps of this are not proof of anything
        </div>
    `;

    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes liveverify-slide-in {
            from { transform: translateY(-100%); }
            to { transform: translateY(0); }
        }
    `;
    banner.appendChild(style);

    document.body.appendChild(banner);

    // Close button
    banner.querySelector('#liveverify-close-btn').addEventListener('click', () => {
        banner.style.animation = 'none';
        banner.style.transition = 'transform 0.2s ease-in';
        banner.style.transform = 'translateY(-100%)';
        setTimeout(() => banner.remove(), 200);
    });

    // Auto-dismiss after 8 seconds for success, 15 for failures
    const dismissTime = isVerified ? 8000 : 15000;
    setTimeout(() => {
        if (document.getElementById('liveverify-result-banner')) {
            banner.style.transition = 'opacity 0.5s ease-out';
            banner.style.opacity = '0';
            setTimeout(() => banner.remove(), 500);
        }
    }, dismissTime);
}

// Get settings from storage
async function getSettings() {
    try {
        const result = await chrome.storage.sync.get('settings');
        return { ...DEFAULT_SETTINGS, ...result.settings };
    } catch {
        return DEFAULT_SETTINGS;
    }
}

// Message handler for popup and content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'getLatestResult') {
        // Return most recent result from session storage
        chrome.storage.session.get('verificationHistory').then(result => {
            verificationHistory = result.verificationHistory || [];
            sendResponse(verificationHistory[0] || null);
        });
        return true; // Keep channel open for async response
    } else if (message.type === 'getHistory') {
        // Return full history from session storage
        chrome.storage.session.get('verificationHistory').then(result => {
            verificationHistory = result.verificationHistory || [];
            sendResponse(verificationHistory);
        });
        return true; // Keep channel open for async response
    } else if (message.type === 'clearHistory') {
        // Clear history
        verificationHistory = [];
        chrome.storage.session.set({ verificationHistory });
        sendResponse({ success: true });
    } else if (message.type === 'getSettings') {
        // Return settings to content script
        getSettings().then(settings => sendResponse(settings));
        return true; // Keep channel open for async
    } else if (message.type === 'verifyText') {
        // Verify text from content script
        verifyText(message.text).then(result => sendResponse(result));
        return true; // Keep channel open for async
    }
    return true;
});

// Verify text directly (for content script)
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

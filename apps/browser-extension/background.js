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
    checkEndorsement
} from './shared/verify.js';
import { extractDomainAuthority } from './shared/domain-authority.js';

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
});

// Handle context menu click
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
    if (info.menuItemId === 'verify-selection') {
        try {
            // Use scripting to get selection with preserved newlines
            // (info.selectionText strips newlines)
            const [{ result: selectedText }] = await chrome.scripting.executeScript({
                target: { tabId: tab.id },
                func: () => window.getSelection().toString()
            });

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
            rawSelection: selectedText,  // Debug: capture what browser gave us
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

    // Check endorsement if metadata has endorsedBy
    let endorsement = null;
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
            endorsement = await checkEndorsement(meta, metaUrl);
        } catch {
            endorsement = { checked: false, confirmed: false, endorser: meta.endorsedBy.split('/')[0], description: null, expired: false, successor: null, error: 'Check failed', chain: [] };
        }
    }

    const elapsed = Date.now() - startTime;

    const result = {
        success: verifyResult.success,
        status: verifyResult.status,
        domain: verifyResult.domain,
        registrableDomain,
        domainNotListed,
        endorsement,
        hash,
        verificationUrl,
        certText,           // Full claim text
        normalizedText,     // Text after normalization (what was hashed)
        elapsed,
        timestamp: new Date().toISOString()
    };

    addToHistory(result);
    await showResult(result);
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

// Show result based on intrusiveness setting
async function showResult(result) {
    const settings = await getSettings();

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
        priority: 2
    };

    if (settings.intrusiveness === 'maximum') {
        notificationOptions.requireInteraction = true;
    }

    try {
        await chrome.notifications.create('verification-result', notificationOptions);
    } catch (error) {
        console.error('Failed to show notification:', error);
    }
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

    // Check endorsement if metadata has endorsedBy
    let endorsement = null;
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
            endorsement = await checkEndorsement(meta, metaUrl2);
        } catch {
            endorsement = { checked: false, confirmed: false, endorser: meta.endorsedBy.split('/')[0], description: null, expired: false, successor: null, error: 'Check failed', chain: [] };
        }
    }

    const elapsed = Date.now() - startTime;

    const result = {
        success: verifyResult.success,
        status: verifyResult.status,
        domain: verifyResult.domain,
        registrableDomain,
        domainNotListed,
        endorsement,
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

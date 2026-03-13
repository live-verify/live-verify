/*
    Copyright (C) 2025, Paul Hammant

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/

/**
 * Content script for detecting and verifying marked regions on pages
 *
 * Looks for HTML markers:
 *   <span verifiable-text="start" data-for="id">[</span>
 *   ...content...
 *   <span data-verify-line="id">verify:domain.com/path</span>
 *   <span verifiable-text="end" data-for="id">]</span>
 */

(function() {
    'use strict';

    // Avoid running multiple times
    if (window.__liveVerifyContentScriptLoaded) return;
    window.__liveVerifyContentScriptLoaded = true;

    // CSS for overlays
    const styles = `
        .liveverify-region {
            position: relative;
            outline: 2px dashed #3b82f6;
            outline-offset: 2px;
            border-radius: 4px;
        }
        .liveverify-region.verified {
            outline-color: #22c55e;
            outline-style: solid;
        }
        .liveverify-region.failed {
            outline-color: #ef4444;
            outline-style: solid;
        }
        .liveverify-region.pending {
            outline-color: #f59e0b;
            outline-style: dotted;
        }
        .liveverify-badge {
            position: absolute;
            top: -10px;
            right: -10px;
            background: #3b82f6;
            color: white;
            font-size: 11px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            padding: 4px 8px;
            border-radius: 4px;
            cursor: pointer;
            z-index: 10000;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            display: flex;
            align-items: center;
            gap: 4px;
        }
        .liveverify-badge:hover {
            background: #2563eb;
        }
        .liveverify-badge.verified {
            background: #22c55e;
            cursor: default;
        }
        .liveverify-badge.failed {
            background: #ef4444;
        }
        .liveverify-badge.pending {
            background: #f59e0b;
        }
        .liveverify-chain {
            position: absolute;
            bottom: -2px;
            left: -2px;
            right: -2px;
            transform: translateY(100%);
            background: rgba(34, 197, 94, 0.9);
            color: white;
            font-size: 12px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            padding: 5px 10px;
            border-radius: 0 0 4px 4px;
            z-index: 10000;
            line-height: 1.5;
        }
        .liveverify-scan-btn {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #3b82f6;
            color: white;
            font-size: 13px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            padding: 10px 16px;
            border-radius: 8px;
            cursor: pointer;
            z-index: 10001;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            border: none;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .liveverify-scan-btn:hover {
            background: #2563eb;
        }
        .liveverify-scan-btn.hidden {
            display: none;
        }
    `;

    // Inject styles
    const styleEl = document.createElement('style');
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);

    // Extract text nodes and BR elements with their visual positions
    function getTextNodesWithPositions(container) {
        const items = [];  // {type, text, rect, node}

        function traverse(node) {
            if (node.nodeType === Node.TEXT_NODE) {
                const text = node.textContent;
                if (text && text.trim().length > 0) {
                    // Get bounding rect for text node
                    const range = document.createRange();
                    range.selectNodeContents(node);
                    const rect = range.getBoundingClientRect();

                    if (rect.width > 0 && rect.height > 0) {
                        items.push({
                            type: 'text',
                            text: text,
                            rect: rect,
                            node: node
                        });
                    }
                }
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                if (node.nodeName === 'BR') {
                    const rect = node.getBoundingClientRect();
                    items.push({
                        type: 'br',
                        rect: rect,
                        node: node
                    });
                } else {
                    // Recursively process child nodes
                    for (const child of node.childNodes) {
                        traverse(child);
                    }
                }
            }
        }

        traverse(container);

        // Sort by visual position: top (Y) first, then left (X)
        // Group by approximate line height to keep same-line items together
        const lineHeight = 20; // Approximate default
        items.sort((a, b) => {
            const aLineIndex = Math.floor(a.rect.top / lineHeight);
            const bLineIndex = Math.floor(b.rect.top / lineHeight);

            if (aLineIndex !== bLineIndex) {
                return aLineIndex - bLineIndex;
            }
            return a.rect.left - b.rect.left;
        });

        return items;
    }

    // Find all verifiable regions on the page
    function findVerifiableRegions() {
        const regions = [];
        const startMarkers = document.querySelectorAll('[verifiable-text="start"]');

        startMarkers.forEach(startEl => {
            const forId = startEl.getAttribute('data-for');
            if (!forId) return;

            // Find corresponding end marker
            const endEl = document.querySelector(`[verifiable-text="end"][data-for="${forId}"]`);
            if (!endEl) return;

            // Find verify line
            const verifyLineEl = document.querySelector(`[data-verify-line="${forId}"]`);
            if (!verifyLineEl) return;

            // Extract text between start and end (excluding markers themselves)
            const range = document.createRange();
            range.setStartAfter(startEl);
            range.setEndBefore(endEl);

            // Get text content
            const fragment = range.cloneContents();
            const tempDiv = document.createElement('div');
            tempDiv.appendChild(fragment);

            // Temporarily insert into DOM to get valid bounding rects
            // (detached fragments return zero rects)
            tempDiv.style.visibility = 'hidden';
            tempDiv.style.position = 'absolute';
            tempDiv.style.left = '0';
            tempDiv.style.top = '0';
            tempDiv.style.pointerEvents = 'none';
            document.body.appendChild(tempDiv);

            // Get text nodes with visual positions and sort by top-to-bottom, left-to-right
            const items = getTextNodesWithPositions(tempDiv);

            // Remove from DOM
            document.body.removeChild(tempDiv);

            let text = '';
            let lastLineIndex = -1;
            for (const item of items) {
                if (item.type === 'text') {
                    const currentLineIndex = Math.floor(item.rect.top / 20);
                    if (currentLineIndex !== lastLineIndex && lastLineIndex !== -1) {
                        text += '\n';
                    }
                    text += item.text;
                    lastLineIndex = currentLineIndex;
                } else if (item.type === 'br') {
                    text += '\n';
                    lastLineIndex = -1;
                }
            }

            // Clean up text
            text = text.trim();

            // Get verify URL
            const verifyUrl = verifyLineEl.textContent.trim();

            // Find common parent for highlighting
            let commonParent = startEl.parentElement;
            while (commonParent && !commonParent.contains(endEl)) {
                commonParent = commonParent.parentElement;
            }

            regions.push({
                id: forId,
                text,
                verifyUrl,
                startEl,
                endEl,
                verifyLineEl,
                container: commonParent,
                status: 'unverified'
            });
        });

        return regions;
    }

    // Highlight a region and add verify badge
    function highlightRegion(region) {
        if (!region.container) return;

        // Make container position relative for badge positioning
        const style = window.getComputedStyle(region.container);
        if (style.position === 'static') {
            region.container.style.position = 'relative';
        }

        region.container.classList.add('liveverify-region');

        // Create badge
        const badge = document.createElement('div');
        badge.className = 'liveverify-badge';
        badge.innerHTML = '🔍 Verify';
        badge.dataset.regionId = region.id;
        badge.addEventListener('click', () => verifyRegion(region, badge));

        region.container.appendChild(badge);
        region.badge = badge;
    }

    // Verify a single region
    async function verifyRegion(region, badge) {
        if (region.status === 'pending') return;

        region.status = 'pending';
        badge.className = 'liveverify-badge pending';
        badge.innerHTML = '⏳ Verifying...';
        region.container.classList.remove('verified', 'failed');
        region.container.classList.add('pending');

        try {
            // Send to background script for verification
            const result = await chrome.runtime.sendMessage({
                type: 'verifyText',
                text: region.text + '\n' + region.verifyUrl
            });

            if (result.success) {
                region.status = 'verified';
                badge.className = 'liveverify-badge verified';
                badge.innerHTML = '✓ Verified';
                badge.title = `Verified by ${result.domain}`;
                region.container.classList.remove('pending');
                region.container.classList.add('verified');

                // Show combined result panel (chain + payload) below the region
                const hasChain = result.authorization && result.authorization.chain && result.authorization.chain.length > 0;
                const hasPayload = result.payload && (result.payload.headshot || result.payload.message);

                if (hasChain || hasPayload) {
                    const panelEl = document.createElement('div');
                    panelEl.className = 'liveverify-chain';
                    let inner = '';

                    // Authority chain
                    if (hasChain) {
                        const domains = [result.domain, ...result.authorization.chain.map(c => c.authorizer)];
                        const chainHtml = domains[0] + domains.slice(1).map(d => '<br>\u00a0\u00a0authorised by ' + d).join('');
                        inner += `<div>${chainHtml}</div>`;
                        // Full details with descriptions in tooltip
                        const details = result.authorization.chain.map(c => {
                            return c.description ? `${c.authorizer} (${c.description})` : c.authorizer;
                        });
                        panelEl.title = result.domain + ' authorised by ' + details.join(' authorised by ');
                    }

                    // Payload (headshot + message)
                    if (hasPayload) {
                        inner += '<div style="display:flex; align-items:center; gap:10px; margin-top:6px;">';
                        if (result.payload.headshot) {
                            inner += `<img src="${result.payload.headshot}" style="width:120px; height:150px; object-fit:cover; border-radius:4px; border:2px solid rgba(255,255,255,0.7);">`;
                        }
                        if (result.payload.message) {
                            inner += `<span style="font-size:14px; font-weight:500;">${result.payload.message}</span>`;
                        }
                        inner += '</div>';
                    }

                    panelEl.innerHTML = inner;
                    region.container.appendChild(panelEl);
                }
            } else {
                region.status = 'failed';
                badge.className = 'liveverify-badge failed';
                const reason = result.status || result.error || '';
                if (reason && reason !== 'Not verified' && !reason.includes('does not verify')) {
                    badge.innerHTML = `✗ Not Verified <span style="font-size:0.8em; opacity:0.85;">(${reason})</span>`;
                } else {
                    badge.innerHTML = '✗ Not Verified';
                }
                badge.title = reason || 'Not verified';

                // Expand outline to include verify line if it's outside the container
                if (region.verifyLineEl && !region.container.contains(region.verifyLineEl)) {
                    let wider = region.container.parentElement;
                    while (wider && !wider.contains(region.verifyLineEl)) {
                        wider = wider.parentElement;
                    }
                    if (wider && wider !== document.body) {
                        region.container.classList.remove('liveverify-region', 'pending');
                        wider.classList.add('liveverify-region');
                        if (window.getComputedStyle(wider).position === 'static') {
                            wider.style.position = 'relative';
                        }
                        wider.appendChild(region.badge);
                        region.container = wider;
                    }
                }

                region.container.classList.remove('pending');
                region.container.classList.add('failed');
            }
        } catch (error) {
            region.status = 'failed';
            badge.className = 'liveverify-badge failed';
            badge.innerHTML = '✗ Error';
            badge.title = error.message;
            region.container.classList.remove('pending');
            region.container.classList.add('failed');
        }
    }

    // Scan page and highlight all regions
    function scanPage() {
        const regions = findVerifiableRegions();

        if (regions.length === 0) {
            return [];
        }

        regions.forEach(region => {
            highlightRegion(region);
        });

        return regions;
    }

    // Verify all regions
    async function verifyAll(regions) {
        for (const region of regions) {
            if (region.badge) {
                await verifyRegion(region, region.badge);
            }
        }
    }

    // Check settings and initialize
    async function initialize() {
        try {
            const response = await chrome.runtime.sendMessage({ type: 'getSettings' });
            const settings = response || {};

            // Find regions first
            const regions = findVerifiableRegions();

            if (regions.length === 0) return;

            // Show scan button or auto-scan based on settings
            if (settings.autoScanPages) {
                // Auto-scan and highlight
                const scannedRegions = scanPage();

                // Auto-verify if enabled
                if (settings.autoVerify) {
                    await verifyAll(scannedRegions);
                }
            } else {
                // Show floating scan button
                showScanButton(regions.length);
            }
        } catch (error) {
            // Extension context may not be available, show manual button
            const regions = findVerifiableRegions();
            if (regions.length > 0) {
                showScanButton(regions.length);
            }
        }
    }

    // Show floating scan button
    function showScanButton(count) {
        const btn = document.createElement('button');
        btn.className = 'liveverify-scan-btn';
        btn.innerHTML = `🔍 Scan ${count} verifiable region${count > 1 ? 's' : ''}`;
        btn.addEventListener('click', async () => {
            btn.classList.add('hidden');
            const regions = scanPage();

            // Check if auto-verify is enabled
            try {
                const response = await chrome.runtime.sendMessage({ type: 'getSettings' });
                if (response?.autoVerify) {
                    await verifyAll(regions);
                }
            } catch (e) {
                // Ignore
            }
        });
        document.body.appendChild(btn);
    }

    // Listen for messages from background/popup
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.type === 'scanPage') {
            const regions = scanPage();
            sendResponse({ count: regions.length });
        } else if (message.type === 'verifyAllOnPage') {
            const regions = scanPage();
            verifyAll(regions).then(() => {
                sendResponse({ success: true });
            });
            return true; // Keep channel open for async response
        } else if (message.type === 'showClaim') {
            const found = findAndHighlightText(message.text);
            sendResponse({ found });
        }
    });

    // Find text on page, scroll to it, and flash highlight
    function findAndHighlightText(searchText) {
        if (!searchText) return false;

        // Normalize search text for comparison
        const normalizedSearch = searchText.trim().replace(/\s+/g, ' ');

        // Walk through text nodes to find a match
        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );

        let node;
        let foundNode = null;
        let foundElement = null;

        // Try to find text content that contains our search text
        while (node = walker.nextNode()) {
            const parent = node.parentElement;
            if (!parent) continue;

            // Skip script/style elements
            if (parent.tagName === 'SCRIPT' || parent.tagName === 'STYLE') continue;

            // Check if this element or its ancestors contain the text
            const elementText = parent.textContent.trim().replace(/\s+/g, ' ');
            if (elementText.includes(normalizedSearch)) {
                // Find the best container element
                foundElement = parent;
                // Walk up to find a reasonable container (not too small, not body)
                while (foundElement.parentElement &&
                       foundElement.parentElement !== document.body &&
                       foundElement.parentElement.textContent.trim().replace(/\s+/g, ' ').includes(normalizedSearch) &&
                       foundElement.offsetHeight < 500) {
                    foundElement = foundElement.parentElement;
                }
                foundNode = node;
                break;
            }
        }

        if (!foundElement) return false;

        // Scroll to element
        foundElement.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Add flash highlight
        const originalOutline = foundElement.style.outline;
        const originalOutlineOffset = foundElement.style.outlineOffset;
        const originalTransition = foundElement.style.transition;

        foundElement.style.transition = 'outline-color 0.3s ease-in-out';
        foundElement.style.outline = '3px solid #ef4444';
        foundElement.style.outlineOffset = '4px';

        // Flash animation
        let flashes = 0;
        const flashInterval = setInterval(() => {
            flashes++;
            if (flashes >= 6) {
                clearInterval(flashInterval);
                foundElement.style.outline = originalOutline;
                foundElement.style.outlineOffset = originalOutlineOffset;
                foundElement.style.transition = originalTransition;
                return;
            }
            foundElement.style.outlineColor = flashes % 2 === 0 ? '#ef4444' : 'transparent';
        }, 300);

        return true;
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }
})();

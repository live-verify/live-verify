/**
 * @jest-environment jsdom
 */

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
 * Tests for content.js verifiable region detection.
 *
 * Tests both marker styles:
 *   Style 1: verifiable-text="start"/"end" span pairs
 *   Style 2: verifiable-text-element="true" on a single container
 */

const fs = require('fs');
const path = require('path');

// Load content.js source for evaluation in jsdom
const contentScriptSource = fs.readFileSync(
    path.resolve(__dirname, '../apps/browser-extension/content.js'),
    'utf-8'
);

// Mock chrome.runtime before each test
function setupChromeApi() {
    window.chrome = {
        runtime: {
            sendMessage: jest.fn().mockResolvedValue({}),
            onMessage: {
                addListener: jest.fn()
            }
        }
    };
}

// Load content script into the current jsdom window
function loadContentScript() {
    // Reset in case a previous test loaded it
    window.__liveVerifyContentScriptLoaded = false;
    eval(contentScriptSource);
}

// Mock Range.getBoundingClientRect and Element.getBoundingClientRect for jsdom
// (jsdom doesn't implement layout, so these return meaningful fake values)
let rectCallCount = 0;

beforeEach(() => {
    rectCallCount = 0;

    // Range prototype mock
    Range.prototype.getBoundingClientRect = function() {
        rectCallCount++;
        return { top: rectCallCount * 20, left: 10, right: 110, bottom: rectCallCount * 20 + 16, width: 100, height: 16 };
    };

    // Element prototype mock (for BR elements etc.)
    const originalGetBCR = Element.prototype.getBoundingClientRect;
    Element.prototype.getBoundingClientRect = function() {
        rectCallCount++;
        return { top: rectCallCount * 20, left: 10, right: 110, bottom: rectCallCount * 20 + 16, width: 100, height: 16 };
    };
});

// Helper: set up DOM, load script, and wait for async initialization
async function setupAndScan(bodyHtml) {
    document.body.innerHTML = bodyHtml;
    setupChromeApi();
    loadContentScript();
    // initialize() is async — flush the microtask queue
    await new Promise(resolve => setTimeout(resolve, 0));
}

describe('Content script: Style 1 — start/end span pairs', () => {
    test('detects a verifiable region with start/end markers', async () => {
        await setupAndScan(`
            <div>
                <span verifiable-text="start" data-for="cert1"></span>
                <span>University of Test</span>
                <span>John Doe</span>
                <span verifiable-text="end" data-for="cert1"></span>
                <span data-verify-line="cert1">verify:example.com/c</span>
            </div>
        `);

        const btn = document.querySelector('.liveverify-scan-btn');
        expect(btn).not.toBeNull();
        expect(btn.textContent).toContain('1 verifiable region');
    });

    test('detects multiple start/end regions', async () => {
        await setupAndScan(`
            <div>
                <span verifiable-text="start" data-for="a"></span>
                <span>Claim A</span>
                <span verifiable-text="end" data-for="a"></span>
                <span data-verify-line="a">verify:example.com/a</span>
            </div>
            <div>
                <span verifiable-text="start" data-for="b"></span>
                <span>Claim B</span>
                <span verifiable-text="end" data-for="b"></span>
                <span data-verify-line="b">verify:example.com/b</span>
            </div>
        `);

        const btn = document.querySelector('.liveverify-scan-btn');
        expect(btn).not.toBeNull();
        expect(btn.textContent).toContain('2 verifiable regions');
    });

    test('ignores start marker without matching end marker', async () => {
        await setupAndScan(`
            <div>
                <span verifiable-text="start" data-for="orphan"></span>
                <span>Orphaned text</span>
                <span data-verify-line="orphan">verify:example.com/c</span>
            </div>
        `);

        const btn = document.querySelector('.liveverify-scan-btn');
        expect(btn).toBeNull();
    });

    test('ignores region without verify line', async () => {
        await setupAndScan(`
            <div>
                <span verifiable-text="start" data-for="noverify"></span>
                <span>No verify URL</span>
                <span verifiable-text="end" data-for="noverify"></span>
            </div>
        `);

        const btn = document.querySelector('.liveverify-scan-btn');
        expect(btn).toBeNull();
    });
});

describe('Content script: Style 2 — verifiable-text-element', () => {
    test('detects a verifiable-text-element region', async () => {
        await setupAndScan(`
            <div verifiable-text-element="true">
                <span>8 Market Square</span>
                <span>Flat White £3.40</span>
                <span data-verify-line="receipt">vfy:r.the-daily-grind.co.uk</span>
            </div>
        `);

        const btn = document.querySelector('.liveverify-scan-btn');
        expect(btn).not.toBeNull();
        expect(btn.textContent).toContain('1 verifiable region');
    });

    test('ignores verifiable-text-element without verify line', async () => {
        await setupAndScan(`
            <div verifiable-text-element="true">
                <span>No verify URL here</span>
            </div>
        `);

        const btn = document.querySelector('.liveverify-scan-btn');
        expect(btn).toBeNull();
    });

    test('extracts text excluding the verify line', async () => {
        await setupAndScan(`
            <div verifiable-text-element="true" id="receipt-region">
                <span>Receipt line 1</span>
                <span data-verify-line="r1">verify:example.com/r</span>
            </div>
        `);

        const btn = document.querySelector('.liveverify-scan-btn');
        btn.click();

        const region = document.getElementById('receipt-region');
        expect(region.classList.contains('liveverify-region')).toBe(true);
        expect(region.querySelector('.liveverify-badge')).not.toBeNull();
    });
});

describe('Content script: Mixed styles on same page', () => {
    test('detects both style 1 and style 2 regions together', async () => {
        await setupAndScan(`
            <div>
                <span verifiable-text="start" data-for="cert"></span>
                <span>Certificate text</span>
                <span verifiable-text="end" data-for="cert"></span>
                <span data-verify-line="cert">verify:example.com/c</span>
            </div>
            <div verifiable-text-element="true">
                <span>Receipt text</span>
                <span data-verify-line="receipt">vfy:shop.example.com</span>
            </div>
        `);

        const btn = document.querySelector('.liveverify-scan-btn');
        expect(btn).not.toBeNull();
        expect(btn.textContent).toContain('2 verifiable regions');
    });
});

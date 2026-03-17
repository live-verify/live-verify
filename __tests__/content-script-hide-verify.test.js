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
 * Tests for content script hideVerifyQuasiUrls feature.
 *
 * These tests exercise the DOM hiding logic from content.js.
 * Because content.js is an IIFE that binds to chrome.runtime,
 * we replicate the relevant functions here against jsdom.
 */

// -- Replicate the hiding logic from content.js --

const HIDE_CLASS = 'liveverify-verify-line-hidden';

function hideVerifyLines(regions) {
    regions.forEach(region => {
        if (region.verifyLineEl) {
            region.verifyLineEl.classList.add(HIDE_CLASS);
        }
    });
}

function findVerifiableRegions(doc) {
    const regions = [];

    // Style 1: start/end spans
    const startMarkers = doc.querySelectorAll('[verifiable-text="start"]');
    startMarkers.forEach(startEl => {
        const forId = startEl.getAttribute('data-for');
        if (!forId) return;
        const endEl = doc.querySelector(`[verifiable-text="end"][data-for="${forId}"]`);
        if (!endEl) return;
        const verifyLineEl = doc.querySelector(`[data-verify-line="${forId}"]`);
        if (!verifyLineEl) return;

        regions.push({
            id: forId,
            verifyLineEl,
            container: startEl.parentElement
        });
    });

    // Style 2: verifiable-text-element
    const elementMarkers = doc.querySelectorAll('[verifiable-text-element="true"]');
    elementMarkers.forEach(el => {
        const verifyLineEl = el.querySelector('[data-verify-line]');
        if (!verifyLineEl) return;
        const forId = verifyLineEl.getAttribute('data-verify-line');

        regions.push({
            id: forId,
            verifyLineEl,
            container: el
        });
    });

    return regions;
}

// -- Tests --

describe('hideVerifyQuasiUrls', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
    });

    test('hides verify line spans for style 1 (start/end markers)', () => {
        document.body.innerHTML = `
            <div>
                <span verifiable-text="start" data-for="cert1">[</span>
                <p>University of Test</p>
                <p>John Doe</p>
                <span data-verify-line="cert1">verify:example.com/c</span>
                <span verifiable-text="end" data-for="cert1">]</span>
            </div>
        `;

        const regions = findVerifiableRegions(document);
        expect(regions).toHaveLength(1);

        const verifyLine = document.querySelector('[data-verify-line="cert1"]');
        expect(verifyLine.classList.contains(HIDE_CLASS)).toBe(false);

        hideVerifyLines(regions);

        expect(verifyLine.classList.contains(HIDE_CLASS)).toBe(true);
    });

    test('hides verify line spans for style 2 (whole element)', () => {
        document.body.innerHTML = `
            <div verifiable-text-element="true">
                <p>Certificate of Completion</p>
                <p>Jane Smith</p>
                <span data-verify-line="cert2">verify:example.com/c</span>
            </div>
        `;

        const regions = findVerifiableRegions(document);
        expect(regions).toHaveLength(1);

        const verifyLine = document.querySelector('[data-verify-line="cert2"]');
        expect(verifyLine.classList.contains(HIDE_CLASS)).toBe(false);

        hideVerifyLines(regions);

        expect(verifyLine.classList.contains(HIDE_CLASS)).toBe(true);
    });

    test('hides multiple verify lines across mixed styles', () => {
        document.body.innerHTML = `
            <div>
                <span verifiable-text="start" data-for="a">[</span>
                <p>Cert A</p>
                <span data-verify-line="a">verify:example.com/c</span>
                <span verifiable-text="end" data-for="a">]</span>
            </div>
            <div verifiable-text-element="true">
                <p>Cert B</p>
                <span data-verify-line="b">vfy:example.com/c</span>
            </div>
        `;

        const regions = findVerifiableRegions(document);
        expect(regions).toHaveLength(2);

        hideVerifyLines(regions);

        const lineA = document.querySelector('[data-verify-line="a"]');
        const lineB = document.querySelector('[data-verify-line="b"]');
        expect(lineA.classList.contains(HIDE_CLASS)).toBe(true);
        expect(lineB.classList.contains(HIDE_CLASS)).toBe(true);
    });

    test('does not hide anything when regions list is empty', () => {
        document.body.innerHTML = `
            <div>
                <span data-verify-line="orphan">verify:example.com/c</span>
            </div>
        `;

        const regions = findVerifiableRegions(document);
        expect(regions).toHaveLength(0);

        hideVerifyLines(regions);

        const orphan = document.querySelector('[data-verify-line="orphan"]');
        expect(orphan.classList.contains(HIDE_CLASS)).toBe(false);
    });

    test('the CSS class applies display:none', () => {
        // Inject the same style rule content.js injects
        const style = document.createElement('style');
        style.textContent = `.${HIDE_CLASS} { display: none !important; }`;
        document.head.appendChild(style);

        document.body.innerHTML = `
            <div verifiable-text-element="true">
                <p>Some cert</p>
                <span data-verify-line="x">verify:example.com/c</span>
            </div>
        `;

        const regions = findVerifiableRegions(document);
        hideVerifyLines(regions);

        const el = document.querySelector('[data-verify-line="x"]');
        expect(el.classList.contains(HIDE_CLASS)).toBe(true);
        // Note: jsdom doesn't compute styles, so we verify the class is applied.
        // In a real browser the CSS rule makes it display:none.
    });

    test('skips regions with null verifyLineEl gracefully', () => {
        const regions = [
            { id: 'ok', verifyLineEl: document.createElement('span') },
            { id: 'missing', verifyLineEl: null }
        ];

        expect(() => hideVerifyLines(regions)).not.toThrow();
        expect(regions[0].verifyLineEl.classList.contains(HIDE_CLASS)).toBe(true);
    });
});

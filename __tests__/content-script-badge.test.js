/**
 * @jest-environment jsdom
 */

/*
    Copyright (C) 2025-2026, Paul Hammant

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
 * Tests for the X/N badge count feature in content.js.
 *
 * After scanning, the content script sends updateBadge messages to the
 * background with text like "0/2", "1/2", "2/2" and appropriate colours.
 */

const fs = require('fs');
const path = require('path');

const contentScriptSource = fs.readFileSync(
    path.resolve(__dirname, '../apps/browser-extension/content.js'),
    'utf-8'
);

// Capture all sendMessage calls
let sendMessageCalls;

function setupChromeApi(verifyResponder) {
    sendMessageCalls = [];
    window.chrome = {
        runtime: {
            sendMessage: jest.fn(async (msg) => {
                sendMessageCalls.push(msg);
                if (msg.type === 'getSettings') {
                    return { autoScanPages: true, autoVerify: false };
                }
                if (msg.type === 'verifyText' && verifyResponder) {
                    return verifyResponder(msg.text);
                }
                return {};
            }),
            onMessage: {
                addListener: jest.fn()
            }
        },
        scripting: {
            executeScript: jest.fn()
        }
    };
}

function loadContentScript() {
    window.__liveVerifyContentScriptLoaded = false;
    eval(contentScriptSource);
}

// Mock bounding rects for jsdom (no layout engine)
let rectCallCount = 0;

beforeEach(() => {
    rectCallCount = 0;

    Range.prototype.getBoundingClientRect = function() {
        rectCallCount++;
        return { top: rectCallCount * 20, left: 10, right: 110, bottom: rectCallCount * 20 + 16, width: 100, height: 16 };
    };

    Element.prototype.getBoundingClientRect = function() {
        rectCallCount++;
        return { top: rectCallCount * 20, left: 10, right: 110, bottom: rectCallCount * 20 + 16, width: 100, height: 16 };
    };
});

function getBadgeMessages() {
    return sendMessageCalls.filter(m => m.type === 'updateBadge');
}

async function setupAndScan(bodyHtml, verifyResponder) {
    document.body.innerHTML = bodyHtml;
    setupChromeApi(verifyResponder);
    loadContentScript();
    // flush async initialization
    await new Promise(resolve => setTimeout(resolve, 0));
}

describe('Content script: badge count', () => {
    test('shows 0/1 after scanning a single region', async () => {
        await setupAndScan(`
            <div verifiable-text-element="true">
                <span>Claim text here</span>
                <span data-verify-line="r1">verify:example.com/r</span>
            </div>
        `);

        const badges = getBadgeMessages();
        expect(badges.length).toBeGreaterThanOrEqual(1);
        const last = badges[badges.length - 1];
        expect(last.text).toBe('0/1');
        expect(last.color).toBe('#3b82f6'); // blue — none checked
    });

    test('shows 0/2 after scanning two regions', async () => {
        await setupAndScan(`
            <div verifiable-text-element="true">
                <span>Claim A</span>
                <span data-verify-line="a">verify:example.com/a</span>
            </div>
            <div verifiable-text-element="true">
                <span>Claim B</span>
                <span data-verify-line="b">verify:example.com/b</span>
            </div>
        `);

        const badges = getBadgeMessages();
        const last = badges[badges.length - 1];
        expect(last.text).toBe('0/2');
        expect(last.color).toBe('#3b82f6');
    });

    test('shows 1/1 green after successful verification', async () => {
        await setupAndScan(`
            <div verifiable-text-element="true">
                <span>Verified claim</span>
                <span data-verify-line="v1">verify:example.com/v</span>
            </div>
        `, () => ({
            success: true,
            domain: 'example.com',
            status: 'verified'
        }));

        // Click the verify badge to trigger verification
        const badge = document.querySelector('.liveverify-badge');
        expect(badge).not.toBeNull();
        badge.click();
        // flush async verification
        await new Promise(resolve => setTimeout(resolve, 50));

        const badges = getBadgeMessages();
        const last = badges[badges.length - 1];
        expect(last.text).toBe('1/1');
        expect(last.color).toBe('#22c55e'); // green
    });

    test('shows 0/1 red after failed verification', async () => {
        await setupAndScan(`
            <div verifiable-text-element="true">
                <span>Failed claim</span>
                <span data-verify-line="f1">verify:example.com/f</span>
            </div>
        `, () => ({
            success: false,
            domain: 'example.com',
            status: 'Not verified'
        }));

        const badge = document.querySelector('.liveverify-badge');
        badge.click();
        await new Promise(resolve => setTimeout(resolve, 50));

        const badges = getBadgeMessages();
        const last = badges[badges.length - 1];
        expect(last.text).toBe('0/1');
        expect(last.color).toBe('#ef4444'); // red
    });

    test('shows 1/2 amber with mixed results', async () => {
        let callCount = 0;
        await setupAndScan(`
            <div verifiable-text-element="true">
                <span>Good claim</span>
                <span data-verify-line="g1">verify:example.com/g</span>
            </div>
            <div verifiable-text-element="true">
                <span>Bad claim</span>
                <span data-verify-line="b1">verify:example.com/b</span>
            </div>
        `, () => {
            callCount++;
            if (callCount === 1) {
                return { success: true, domain: 'example.com', status: 'verified' };
            }
            return { success: false, domain: 'example.com', status: 'Not verified' };
        });

        // Click both badges
        const badges = document.querySelectorAll('.liveverify-badge');
        expect(badges.length).toBe(2);

        badges[0].click();
        await new Promise(resolve => setTimeout(resolve, 50));

        badges[1].click();
        await new Promise(resolve => setTimeout(resolve, 50));

        const badgeMsgs = getBadgeMessages();
        const last = badgeMsgs[badgeMsgs.length - 1];
        expect(last.text).toBe('1/2');
        expect(last.color).toBe('#f59e0b'); // amber
    });

    test('sends skipBadge with showNotification from scan mode', async () => {
        await setupAndScan(`
            <div verifiable-text-element="true">
                <span>Claim</span>
                <span data-verify-line="s1">verify:example.com/s</span>
            </div>
        `, () => ({
            success: true,
            domain: 'example.com',
            status: 'verified'
        }));

        const badge = document.querySelector('.liveverify-badge');
        badge.click();
        await new Promise(resolve => setTimeout(resolve, 50));

        const notifications = sendMessageCalls.filter(m => m.type === 'showNotification');
        expect(notifications.length).toBe(1);
        expect(notifications[0].skipBadge).toBe(true);
    });

    test('no badge messages when page has no verifiable regions', async () => {
        await setupAndScan(`
            <div>
                <p>Just a normal page with no verifiable content.</p>
            </div>
        `);

        const badges = getBadgeMessages();
        expect(badges.length).toBe(0);
    });
});

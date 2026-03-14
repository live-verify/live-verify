import { test, expect, chromium, type BrowserContext } from '@playwright/test';
import path from 'path';

const EXTENSION_PATH = path.resolve(__dirname, '../../apps/browser-extension');
const FIXTURE_URL = 'https://meridian-national.bank.us/demo/james-bank-statement.html';

test.describe('Bank Statement PDF Verification (James Whitfield)', () => {
    let context: BrowserContext;

    test.beforeEach(async ({}) => {
        const userDataDir = path.join(__dirname, '../../tmp/test-user-data-' + Date.now());
        context = await chromium.launchPersistentContext(userDataDir, {
            headless: false,
            args: [
                `--disable-extensions-except=${EXTENSION_PATH}`,
                `--load-extension=${EXTENSION_PATH}`,
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--ignore-certificate-errors',
                '--host-resolver-rules=MAP meridian-national.bank.us 127.0.0.1, MAP fdic.gov 127.0.0.1, MAP treasury.gov 127.0.0.1'
            ],
        });

        context.on('console', msg => console.log(`[CONTEXT] [${msg.type()}] ${msg.text()}`));
    });

    test.afterEach(async () => {
        if (context) await context.close();
    });

    test('should verify James Whitfield bank statement rendered via PDF.js', async () => {
        test.setTimeout(120000);
        const page = await context.newPage();

        page.on('console', msg => console.log(`[PAGE] ${msg.text()}`));

        console.log('Navigating to fixture...');
        await page.goto(FIXTURE_URL);

        // Wait for PDF.js to render the text layer
        console.log('Waiting for PDF.js text layer...');
        await expect(page.locator('.textLayer')).toBeVisible({ timeout: 30000 });
        await page.waitForFunction(() => {
            const layer = document.querySelector('.textLayer');
            return layer && layer.children.length > 5;
        }, { timeout: 30000 });

        // Screenshot before verification
        await page.screenshot({ path: 'public/test-results/james-before-verification-page.png' });

        // Select text from "Account Holder:" through "verify:..." line
        console.log('Selecting claim text from PDF text layer...');
        const selectedText = await page.evaluate(() => {
            const spans = Array.from(document.querySelectorAll('.textLayer span'));
            const startSpan = spans.find(s => s.textContent?.startsWith('Account Holder:'));
            const endSpan = spans.find(s => s.textContent?.startsWith('verify:'));
            if (!startSpan || !endSpan) return '';

            const range = document.createRange();
            range.setStartBefore(startSpan);
            range.setEndAfter(endSpan);
            const sel = window.getSelection()!;
            sel.removeAllRanges();
            sel.addRange(range);
            return sel.toString();
        });

        console.log('Selected text length:', selectedText.length);
        console.log('Selected text preview:', selectedText.substring(0, 100));
        expect(selectedText).toContain('Account Holder:');
        expect(selectedText).toContain('verify:meridian-national.bank.us/statements');

        // Get service worker and trigger verification programmatically
        // (Playwright cannot invoke Chrome extension context menus)
        let [background] = context.serviceWorkers();
        if (!background) background = await context.waitForEvent('serviceworker');

        console.log('Triggering verification via service worker...');

        // Inject a script in the extension's isolated world that sends
        // the selected text to the background for verification, waits for
        // the result, and injects a result banner into the page.
        await background.evaluate(async (text) => {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            await chrome.scripting.executeScript({
                target: { tabId: tab.id },
                func: async (selectedText) => {
                    const result = await chrome.runtime.sendMessage({ type: 'verifyText', text: selectedText });
                    if (!result) return;

                    // Inject result banner (mirrors showResultBanner in background.js)
                    const isVerified = result.success;
                    const bg = isVerified
                        ? 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)'
                        : 'linear-gradient(135deg, #d32f2f 0%, #c62828 100%)';
                    const icon = isVerified ? '\u2713' : '\u2717';
                    const status = isVerified ? 'VERIFIED' : (result.status || 'NOT VERIFIED');
                    const detail = isVerified
                        ? `by <strong>${result.domain}</strong>`
                        : `<strong>${result.domain}</strong> does not verify this claim`;

                    let authHtml = '';
                    if (result.authorization && result.authorization.confirmed && result.authorization.chain) {
                        const chain = result.authorization.chain;
                        const parts = chain.map(c => c.description ? `<strong>${c.authorizer}</strong> (${c.description})` : `<strong>${c.authorizer}</strong>`);
                        authHtml = `<div style="font-size:12px;color:#c8e6c9;margin-top:2px;">Authorized by ${parts.join(' \u2190 ')}</div>`;
                    }

                    const banner = document.createElement('div');
                    banner.id = 'liveverify-result-banner';
                    banner.style.cssText = `position:fixed;top:0;left:0;right:0;z-index:2147483647;background:${bg};color:white;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;box-shadow:0 4px 20px rgba(0,0,0,0.4);`;
                    banner.innerHTML = `
                        <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 20px;">
                            <div style="display:flex;align-items:center;gap:14px;">
                                <span style="font-size:32px;line-height:1;">${icon}</span>
                                <div>
                                    <div style="font-weight:700;font-size:18px;letter-spacing:0.5px;">${status}</div>
                                    <div style="font-size:13px;opacity:0.9;">${detail}</div>
                                    ${authHtml}
                                </div>
                            </div>
                        </div>
                        <div style="padding:4px 20px 6px;background:rgba(0,0,0,0.15);font-size:11px;opacity:0.8;text-align:center;">
                            LiveVerify browser extension \u2014 screencaps of this are not proof of anything
                        </div>`;
                    document.body.appendChild(banner);
                },
                args: [text],
            });
        }, selectedText);

        // Poll session storage for the verification result
        console.log('Waiting for verification result in history...');
        let history: any[] = [];
        for (let i = 0; i < 30; i++) {
            await page.waitForTimeout(1000);
            history = await background.evaluate(async () => {
                const result = await chrome.storage.session.get('verificationHistory');
                return result.verificationHistory || [];
            });
            if (history.length > 0) {
                console.log(`Verification result found after ${i + 1}s`);
                break;
            }
        }

        console.log('History entries:', history.length);
        expect(history.length).toBeGreaterThan(0);

        const result = history[0];
        console.log('Result:', JSON.stringify({
            success: result.success,
            status: result.status,
            domain: result.domain,
            hash: result.hash,
            error: result.error,
        }));

        // Screenshot
        await page.screenshot({ path: 'public/test-results/james-final-page.png' });

        // Open popup and screenshot
        const extensionId = background.url().split('/')[2];
        const popupPage = await context.newPage();
        await popupPage.goto(`chrome-extension://${extensionId}/popup/popup.html`);
        await popupPage.bringToFront();
        const detailsToggle = popupPage.locator('.details-toggle');
        if (await detailsToggle.isVisible()) {
            await detailsToggle.click();
        }
        await popupPage.screenshot({ path: 'public/test-results/james-final-popup.png' });

        // Assert success — chain: meridian-national.bank.us → fdic.gov → treasury.gov
        expect(result.success).toBe(true);
        expect(result.domain).toBe('meridian-national.bank.us');

        if (result.authorization) {
            console.log('Authorization chain:', JSON.stringify(result.authorization));
        }

        console.log('Test successful — PDF bank statement verified via text selection!');
    });
});

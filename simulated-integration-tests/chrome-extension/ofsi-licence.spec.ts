import { test, expect, chromium, type BrowserContext } from '@playwright/test';
import path from 'path';

const EXTENSION_PATH = path.resolve(__dirname, '../../apps/browser-extension');
const FIXTURE_URL = 'https://ofsi.hm-treasury.gov.uk/demo/ofsi-licence.html';

test.describe('OFSI Sanctions Licence Verification (Albion Capital)', () => {
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
                '--host-resolver-rules=MAP ofsi.hm-treasury.gov.uk 127.0.0.1, MAP gov.uk 127.0.0.1'
            ],
        });

        context.on('console', msg => console.log(`[CONTEXT] [${msg.type()}] ${msg.text()}`));
    });

    test.afterEach(async () => {
        if (context) await context.close();
    });

    test('should verify OFSI sanctions licence rendered via PDF.js', async () => {
        test.setTimeout(120000);
        const page = await context.newPage();

        page.on('console', msg => console.log(`[PAGE] ${msg.text()}`));

        console.log('Navigating to fixture...');
        await page.goto(FIXTURE_URL);

        // Wait for PDF.js to render the text layer
        console.log('Waiting for PDF.js text layer...');
        await expect(page.locator('.textLayer')).toBeVisible({ timeout: 30000 });
        // Wait for text content to populate
        await page.waitForFunction(() => {
            const layer = document.querySelector('.textLayer');
            return layer && layer.children.length > 5;
        }, { timeout: 30000 });

        // Screenshot before verification
        await page.screenshot({ path: 'simulated-integration-tests/results/ofsi-before-verification-page.png' });

        // Select text from "HM TREASURY" through "verify:" line
        console.log('Selecting claim text from PDF text layer...');
        const selectedText = await page.evaluate(() => {
            const spans = Array.from(document.querySelectorAll('.textLayer span'));
            const startSpan = spans.find(s => s.textContent?.startsWith('HM TREASURY'));
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
        console.log('Selected text preview:', selectedText.substring(0, 200));
        expect(selectedText).toContain('HM TREASURY');
        expect(selectedText).toContain('verify:ofsi.hm-treasury.gov.uk/licences');

        // Get service worker
        let [background] = context.serviceWorkers();
        if (!background) background = await context.waitForEvent('serviceworker');

        // Trigger verification via service worker + inject banner
        console.log('Triggering verification via service worker...');
        await background.evaluate(async (text) => {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            await chrome.scripting.executeScript({
                target: { tabId: tab.id! },
                func: async (selectedText: string) => {
                    const result = await chrome.runtime.sendMessage({ type: 'verifyText', text: selectedText });
                    if (!result) return;

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
                        const parts = chain.map((c: any) => c.description ? `<strong>${c.authorizer}</strong> (${c.description})` : `<strong>${c.authorizer}</strong>`);
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

        // Poll session storage for verification result
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

        expect(history.length).toBeGreaterThan(0);
        const result = history[0];
        console.log('Result:', JSON.stringify({
            success: result.success, status: result.status,
            domain: result.domain, hash: result.hash, error: result.error,
        }));

        // Screenshots
        await page.screenshot({ path: 'simulated-integration-tests/results/ofsi-final-page.png' });

        // Assert success — chain: ofsi.hm-treasury.gov.uk → gov.uk
        expect(result.success).toBe(true);
        expect(result.domain).toBe('ofsi.hm-treasury.gov.uk');

        if (result.authorization) {
            console.log('Authorization chain:', JSON.stringify(result.authorization));
        }

        console.log('Test successful — OFSI licence verified via text selection!');
    });
});

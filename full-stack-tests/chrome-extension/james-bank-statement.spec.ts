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
        // if (context) await context.close();
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
        // Wait for text content to populate
        await page.waitForFunction(() => {
            const layer = document.querySelector('.textLayer');
            return layer && layer.children.length > 5;
        }, { timeout: 30000 });

        // Screenshot before verification
        await page.screenshot({ path: 'full-stack-tests/results/james-before-verification-page.png' });

        // Select all text in the text layer (simulates user Ctrl+A within the PDF)
        console.log('Selecting text layer content...');
        await page.evaluate(() => {
            const textLayer = document.querySelector('.textLayer');
            const range = document.createRange();
            range.selectNodeContents(textLayer!);
            const selection = window.getSelection()!;
            selection.removeAllRanges();
            selection.addRange(range);
        });

        // Get the selected text for logging
        const selectedText = await page.evaluate(() => window.getSelection()!.toString());
        console.log('Selected text length:', selectedText.length);
        console.log('Selected text preview:', selectedText.substring(0, 200));

        // Trigger verification via the extension's keyboard shortcut (Ctrl+Shift+V)
        console.log('Triggering verification via keyboard shortcut...');
        await page.keyboard.press('Control+Shift+V');

        // Wait for the extension's result banner to appear on the page
        console.log('Waiting for verification result banner...');
        const resultBanner = page.locator('.liveverify-result-banner, .liveverify-badge');
        await expect(resultBanner.first()).toBeVisible({ timeout: 40000 });

        // Give the chain walk time to complete
        await page.waitForTimeout(5000);

        // Get extension ID
        let [background] = context.serviceWorkers();
        if (!background) background = await context.waitForEvent('serviceworker');
        const extensionId = background.url().split('/')[2];

        // Open popup to check result details
        console.log('Opening popup to check details...');
        const popupPage = await context.newPage();
        await popupPage.goto(`chrome-extension://${extensionId}/popup/popup.html`);

        // Wait for history to load
        await popupPage.waitForTimeout(2000);

        // Screenshots
        await page.bringToFront();
        await page.screenshot({ path: 'full-stack-tests/results/james-final-page.png' });

        await popupPage.bringToFront();
        const detailsToggle = popupPage.locator('.details-toggle');
        if (await detailsToggle.isVisible()) {
            await detailsToggle.click();
        }
        await popupPage.screenshot({ path: 'full-stack-tests/results/james-final-popup.png' });

        // Check the popup for the verification result
        const statusEl = popupPage.locator('.history-status, .result-status').first();
        const statusText = await statusEl.innerText();
        console.log('Popup status:', statusText);

        // Assert success — chain: meridian-national.bank.us → fdic.gov → treasury.gov
        expect(statusText.toLowerCase()).toContain('verified');

        console.log('Test successful — PDF bank statement verified via text selection!');
    });
});

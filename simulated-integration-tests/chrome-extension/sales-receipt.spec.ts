import { test, expect, chromium, type BrowserContext } from '@playwright/test';
import path from 'path';

const EXTENSION_PATH = path.resolve(__dirname, '../../apps/browser-extension');
const FIXTURE_URL = 'https://r.the-red-lion.co.uk/demo/red-lion-receipt.html';

test.describe('Sales Receipt (The Red Lion)', () => {
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
                '--host-resolver-rules=MAP r.the-red-lion.co.uk 127.0.0.1, MAP hmrc.gov.uk 127.0.0.1, MAP gov.uk 127.0.0.1'
            ],
        });

        context.on('console', msg => console.log(`[CONTEXT] [${msg.type()}] ${msg.text()}`));
    });

    test.afterEach(async () => {
        // if (context) await context.close();
    });

    test('should verify a pub receipt with HMRC VAT authority chain', async () => {
        test.setTimeout(120000);
        const page = await context.newPage();

        page.on('console', msg => console.log(`[PAGE] ${msg.text()}`));

        console.log('Navigating to fixture...');
        await page.goto(FIXTURE_URL);

        // Check if page loaded
        await expect(page.locator('.pub-name')).toHaveText('THE RED LION', { timeout: 10000 });

        // Wait for scan button
        console.log('Waiting for scan button...');
        const scanBtn = page.locator('.liveverify-scan-btn');
        await expect(scanBtn).toBeVisible({ timeout: 20000 });

        await page.screenshot({ path: 'public/test-results/receipt-before.png' });

        await scanBtn.click();

        // Find and click verify badge
        console.log('Clicking verify badge...');
        const verifyBadge = page.locator('.liveverify-badge');
        await expect(verifyBadge).toBeVisible();
        await verifyBadge.click();

        // Capture service worker logs
        let [background] = context.serviceWorkers();
        if (!background) background = await context.waitForEvent('serviceworker');
        background.on('console', msg => console.log(`[SW] ${msg.text()}`));

        // Wait for result
        console.log('Waiting for verification result...');
        await expect(verifyBadge).not.toHaveText('⏳ Verifying...', { timeout: 40000 });
        const finalBadgeText = await verifyBadge.innerText();
        const finalBadgeTitle = await verifyBadge.getAttribute('title');
        console.log('Final badge text:', finalBadgeText);
        console.log('Final badge title:', finalBadgeTitle);

        // Get extension ID
        const extensionId = background.url().split('/')[2];

        // Open popup
        console.log('Opening popup to check details...');
        const popupPage = await context.newPage();
        await popupPage.goto(`chrome-extension://${extensionId}/popup/popup.html`);

        // Screenshots
        await page.bringToFront();
        await page.screenshot({ path: 'public/test-results/receipt-final-page.png' });

        await popupPage.bringToFront();
        const detailsToggle = popupPage.locator('.details-toggle');
        if (await detailsToggle.isVisible()) {
            await detailsToggle.click();
        }
        await popupPage.screenshot({ path: 'public/test-results/receipt-final-popup.png' });

        // Assert verified
        expect(finalBadgeText).toBe('✓ Verified');

        // Wait for chain panel to appear (authorization check is async, may take a moment)
        const chainEl = page.locator('.liveverify-chain');
        await expect(chainEl).toBeVisible({ timeout: 15000 });
        const chainText = await chainEl.innerText();
        console.log('Authority chain:', chainText);
        expect(chainText).toContain('hmrc.gov.uk');
        expect(chainText).toContain('gov.uk');

        console.log('Test successful — sales receipt verified with HMRC VAT authority chain!');
    });
});

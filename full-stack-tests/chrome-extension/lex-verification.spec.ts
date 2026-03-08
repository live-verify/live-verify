import { test, expect, chromium, type BrowserContext } from '@playwright/test';
import path from 'path';

const EXTENSION_PATH = path.resolve(__dirname, '../../apps/browser-extension');
const FIXTURE_URL = 'https://ids.nypd.nyc.gov/warrant/lex-claim.html';

test.describe('Fake Police ID Verification (Lex Luthor)', () => {
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
                '--host-resolver-rules=MAP ids.nypd.nyc.gov 127.0.0.1, MAP ny.gov 127.0.0.1'
            ],
        });

        context.on('console', msg => console.log(`[CONTEXT] [${msg.type()}] ${msg.text()}`));
    });

    test.afterEach(async () => {
        // if (context) await context.close();
    });

    test('should FAIL to verify Lex Luthor fake NYPD warrant card', async () => {
        test.setTimeout(120000);
        const page = await context.newPage();

        page.on('console', msg => console.log(`[PAGE] ${msg.text()}`));

        console.log('Navigating to fixture...');
        await page.goto(FIXTURE_URL);

        // Check if page loaded
        await expect(page.locator('.name')).toHaveText('LEX LUTHOR', { timeout: 10000 });

        // Wait for scan button
        console.log('Waiting for scan button...');
        const scanBtn = page.locator('.liveverify-scan-btn');
        await expect(scanBtn).toBeVisible({ timeout: 20000 });

        // Screenshot before any verification
        await page.screenshot({ path: 'full-stack-tests/results/lex-before-verification-page.png' });

        await scanBtn.click();

        // Find and click verify badge
        console.log('Clicking verify badge...');
        const verifyBadge = page.locator('.liveverify-badge');
        await expect(verifyBadge).toBeVisible();
        await verifyBadge.click();

        // Wait for result (should be failure — hash not in database)
        console.log('Waiting for verification result (expecting failure)...');
        await expect(verifyBadge).not.toHaveText('⏳ Verifying...', { timeout: 40000 });
        const finalBadgeText = await verifyBadge.innerText();
        const finalBadgeTitle = await verifyBadge.getAttribute('title');
        console.log('Final badge text:', finalBadgeText);
        console.log('Final badge title:', finalBadgeTitle);

        // Get extension ID
        let [background] = context.serviceWorkers();
        if (!background) background = await context.waitForEvent('serviceworker');
        const extensionId = background.url().split('/')[2];

        // Open history popup
        console.log('Opening popup to check details...');
        const popupPage = await context.newPage();
        await popupPage.goto(`chrome-extension://${extensionId}/popup/popup.html`);

        // Screenshots
        await page.bringToFront();
        await page.screenshot({ path: 'full-stack-tests/results/lex-final-page.png' });

        await popupPage.bringToFront();
        const detailsToggle = popupPage.locator('.details-toggle');
        if (await detailsToggle.isVisible()) {
            await detailsToggle.click();
        }
        await popupPage.screenshot({ path: 'full-stack-tests/results/lex-final-popup.png' });

        // Assert FAILURE — Lex's fake ID was never issued by NYPD
        expect(finalBadgeText).toBe('✗ Not Verified');

        console.log('Test successful — fake ID correctly rejected!');
    });
});

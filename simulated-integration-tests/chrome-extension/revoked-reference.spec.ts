import { test, expect, chromium, type BrowserContext } from '@playwright/test';
import path from 'path';

const EXTENSION_PATH = path.resolve(__dirname, '../../apps/browser-extension');
const FIXTURE_URL = 'https://hr.meridian-consulting.com/demo/revoked-reference-claim.html';

test.describe('Revoked Employment Reference (Meridian Consulting)', () => {
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
                '--host-resolver-rules=MAP hr.meridian-consulting.com 127.0.0.1'
            ],
        });

        context.on('console', msg => console.log(`[CONTEXT] [${msg.type()}] ${msg.text()}`));
    });

    test.afterEach(async () => {
        // if (context) await context.close();
    });

    test('should show REVOKED for withdrawn employment reference', async () => {
        test.setTimeout(120000);
        const page = await context.newPage();

        page.on('console', msg => console.log(`[PAGE] ${msg.text()}`));

        console.log('Navigating to fixture...');
        await page.goto(FIXTURE_URL);

        // Check if page loaded
        await expect(page.locator('.name')).toHaveText('SARAH CHEN', { timeout: 10000 });

        // Wait for scan button (injected by extension when it detects registration marks)
        console.log('Waiting for scan button...');
        const scanBtn = page.locator('.liveverify-scan-btn');
        await expect(scanBtn).toBeVisible({ timeout: 20000 });

        await page.screenshot({ path: 'simulated-integration-tests/results/revoked-reference-before.png' });

        await scanBtn.click();

        // Find and click verify badge
        console.log('Clicking verify badge...');
        const verifyBadge = page.locator('.liveverify-badge');
        await expect(verifyBadge).toBeVisible();
        await verifyBadge.click();

        // Wait for result
        console.log('Waiting for verification result (expecting REVOKED)...');
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
        await page.screenshot({ path: 'simulated-integration-tests/results/revoked-reference-final-page.png' });

        await popupPage.bringToFront();
        const detailsToggle = popupPage.locator('.details-toggle');
        if (await detailsToggle.isVisible()) {
            await detailsToggle.click();
        }
        await popupPage.screenshot({ path: 'simulated-integration-tests/results/revoked-reference-final-popup.png' });

        // Assert failure — badge always shows "✗ Not Verified" for denying results
        expect(finalBadgeText).toBe('✗ Not Verified');
        // The title contains the status — either "This reference has been withdrawn" (from meta)
        // or "REVOKED" (fallback), but NOT a 404 message
        expect(finalBadgeTitle).not.toContain('does not verify');
        console.log('Confirmed: document found but denied (not a 404)');

        console.log('Test successful — revoked reference correctly identified!');
    });
});

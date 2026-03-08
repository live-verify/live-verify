import { test, expect, chromium, type BrowserContext } from '@playwright/test';
import path from 'path';
import fs from 'fs';

const EXTENSION_PATH = path.resolve(__dirname, '../../apps/browser-extension');
const FIXTURE_URL = 'https://midsomer.police.uk/warrant/gina-claim.html';

test.describe('Police Officer Verification (Gina Coulby)', () => {
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
                '--host-resolver-rules=MAP midsomer.police.uk 127.0.0.1, MAP policing.gov.uk 127.0.0.1, MAP gov.uk 127.0.0.1'
            ],
        });
        
        context.on('console', msg => console.log(`[CONTEXT] [${msg.type()}] ${msg.text()}`));
    });

    test.afterEach(async () => {
        // if (context) await context.close();
    });

    test('should verify Gina Coulby warrant card and show authority chain', async () => {
        test.setTimeout(120000); // 2 minutes for this long chain walk
        const page = await context.newPage();
        
        page.on('console', msg => console.log(`[PAGE] ${msg.text()}`));

        console.log('Navigating to fixture...');
        await page.goto(FIXTURE_URL);

        // Check if page loaded
        await expect(page.locator('.name')).toHaveText('DETECTIVE GINA COULBY', { timeout: 10000 });

        // Wait for scan button
        console.log('Waiting for scan button...');
        const scanBtn = page.locator('.liveverify-scan-btn');
        await expect(scanBtn).toBeVisible({ timeout: 20000 });

        // Screenshot before any verification
        await page.screenshot({ path: 'full-stack-tests/results/gina-before-verification-page.png' });

        await scanBtn.click();

        // Find and click verify badge
        console.log('Clicking verify badge...');
        const verifyBadge = page.locator('.liveverify-badge');
        await expect(verifyBadge).toBeVisible();
        await verifyBadge.click();

        // Wait for result (can be success or failure)
        console.log('Waiting for verification result...');
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
        await page.screenshot({ path: 'full-stack-tests/results/gina-final-page.png' });
        
        await popupPage.bringToFront();
        // Wait for details toggle to be visible and click it to see normalized text
        const detailsToggle = popupPage.locator('.details-toggle');
        if (await detailsToggle.isVisible()) {
            await detailsToggle.click();
        }
        await popupPage.screenshot({ path: 'full-stack-tests/results/gina-final-popup.png' });

        // Now assert success
        expect(finalBadgeText).toBe('✓ Verified');
        
        console.log('Test successful!');
    });
});

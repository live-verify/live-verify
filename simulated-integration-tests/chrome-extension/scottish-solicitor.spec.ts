import { test, expect, chromium, type BrowserContext } from '@playwright/test';
import path from 'path';

const EXTENSION_PATH = path.resolve(__dirname, '../../apps/browser-extension');
const CERT_FIXTURE_URL = 'https://macleod-fraser.co.uk/demo/practising-certificate.html';
const FIRM_FIXTURE_URL = 'https://macleod-fraser.co.uk/demo/firm-registration.html';

test.describe('Scottish Solicitor Practising Certificate (Macleod Fraser)', () => {
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
                '--host-resolver-rules=MAP macleod-fraser.co.uk 127.0.0.1, MAP lawscot.org.uk 127.0.0.1, MAP gov.scot 127.0.0.1'
            ],
        });

        context.on('console', msg => console.log(`[CONTEXT] [${msg.type()}] ${msg.text()}`));
    });

    test.afterEach(async () => {
        // if (context) await context.close();
    });

    test('should verify individual practising certificate (Fiona Macleod)', async () => {
        test.setTimeout(120000);
        const page = await context.newPage();

        page.on('console', msg => console.log(`[PAGE] ${msg.text()}`));

        console.log('Navigating to practising certificate fixture...');
        await page.goto(CERT_FIXTURE_URL);

        await expect(page.locator('.solicitor-name')).toHaveText('FIONA MACLEOD', { timeout: 10000 });

        console.log('Waiting for scan button...');
        const scanBtn = page.locator('.liveverify-scan-btn');
        await expect(scanBtn).toBeVisible({ timeout: 20000 });

        await page.screenshot({ path: 'simulated-integration-tests/results/solicitor-before.png' });

        await scanBtn.click();

        console.log('Clicking verify badge...');
        const verifyBadge = page.locator('.liveverify-badge');
        await expect(verifyBadge).toBeVisible();
        await verifyBadge.click();

        console.log('Waiting for verification result...');
        await expect(verifyBadge).not.toHaveText('⏳ Verifying...', { timeout: 40000 });
        const finalBadgeText = await verifyBadge.innerText();
        console.log('Final badge text:', finalBadgeText);

        let [background] = context.serviceWorkers();
        if (!background) background = await context.waitForEvent('serviceworker');
        const extensionId = background.url().split('/')[2];

        const popupPage = await context.newPage();
        await popupPage.goto(`chrome-extension://${extensionId}/popup/popup.html`);

        await page.bringToFront();
        await page.screenshot({ path: 'simulated-integration-tests/results/solicitor-final-page.png' });

        await popupPage.bringToFront();
        const detailsToggle = popupPage.locator('.details-toggle');
        if (await detailsToggle.isVisible()) await detailsToggle.click();
        await popupPage.screenshot({ path: 'simulated-integration-tests/results/solicitor-final-popup.png' });

        expect(finalBadgeText).toBe('✓ Verified');

        const chainEl = page.locator('.liveverify-chain');
        await expect(chainEl).toBeVisible({ timeout: 15000 });
        const chainText = await chainEl.innerText();
        console.log('Authority chain:', chainText);
        expect(chainText).toContain('lawscot.org.uk');
        expect(chainText).toContain('gov.scot');

        console.log('Individual practising certificate verified with devolved authority chain.');
    });

    test('should verify firm registration (Macleod Fraser & Partners)', async () => {
        test.setTimeout(120000);
        const page = await context.newPage();

        page.on('console', msg => console.log(`[PAGE] ${msg.text()}`));

        console.log('Navigating to firm registration fixture...');
        await page.goto(FIRM_FIXTURE_URL);

        await expect(page.locator('.firm-name')).toHaveText('MACLEOD FRASER & PARTNERS', { timeout: 10000 });

        console.log('Waiting for scan button...');
        const scanBtn = page.locator('.liveverify-scan-btn');
        await expect(scanBtn).toBeVisible({ timeout: 20000 });

        await page.screenshot({ path: 'simulated-integration-tests/results/solicitors-firm-before.png' });

        await scanBtn.click();

        console.log('Clicking verify badge...');
        const verifyBadge = page.locator('.liveverify-badge');
        await expect(verifyBadge).toBeVisible();
        await verifyBadge.click();

        console.log('Waiting for verification result...');
        await expect(verifyBadge).not.toHaveText('⏳ Verifying...', { timeout: 40000 });
        const finalBadgeText = await verifyBadge.innerText();
        console.log('Final badge text:', finalBadgeText);

        let [background] = context.serviceWorkers();
        if (!background) background = await context.waitForEvent('serviceworker');
        const extensionId = background.url().split('/')[2];

        const popupPage = await context.newPage();
        await popupPage.goto(`chrome-extension://${extensionId}/popup/popup.html`);

        await page.bringToFront();
        await page.screenshot({ path: 'simulated-integration-tests/results/solicitors-firm-final-page.png' });

        await popupPage.bringToFront();
        const detailsToggle = popupPage.locator('.details-toggle');
        if (await detailsToggle.isVisible()) await detailsToggle.click();
        await popupPage.screenshot({ path: 'simulated-integration-tests/results/solicitors-firm-final-popup.png' });

        expect(finalBadgeText).toBe('✓ Verified');

        const chainEl = page.locator('.liveverify-chain');
        await expect(chainEl).toBeVisible({ timeout: 15000 });
        const chainText = await chainEl.innerText();
        console.log('Authority chain:', chainText);
        expect(chainText).toContain('lawscot.org.uk');
        expect(chainText).toContain('gov.scot');

        console.log('Firm registration verified with devolved authority chain.');
    });
});

#!/usr/bin/env node

// Converts gina-kindle.html to gina-kindle.pdf
// Sized for Kindle v3 held at 90 degrees (landscape): 800x600 pixels at 167 PPI.
//
// Usage: node simulated-integration-tests/fixtures/kindle-to-pdf.js

const { chromium } = require(require.resolve('playwright-core', { paths: [require.resolve('@playwright/test')] }));
const path = require('path');

async function main() {
    const fixturesDir = path.resolve(__dirname);
    const htmlPath = path.join(fixturesDir, 'gina-kindle.html');
    const pdfPath = path.join(fixturesDir, 'gina-kindle.pdf');

    // Kindle v3: 600x800 native at 167 PPI.
    // Held at 90 degrees = 800x600 in landscape.
    // 800px / 167 PPI = 4.79 inches, 600px / 167 PPI = 3.59 inches
    const widthInches = 800 / 167;
    const heightInches = 600 / 167;

    const browser = await chromium.launch();
    const page = await browser.newPage();

    await page.setViewportSize({ width: 800, height: 600 });
    await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle' });

    await page.pdf({
        path: pdfPath,
        width: `${widthInches}in`,
        height: `${heightInches}in`,
        margin: { top: '0', right: '0', bottom: '0', left: '0' },
        printBackground: true,
        preferCSSPageSize: true,
    });

    await browser.close();
    console.log(`Written: ${pdfPath}`);
    console.log(`Size: ${widthInches.toFixed(2)}" x ${heightInches.toFixed(2)}" (Kindle v3 landscape at 167 PPI)`);
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});

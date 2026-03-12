/*
    Copyright (C) 2025, Paul Hammant

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
 * Integration tests for training pages
 *
 * These tests read the HTML source of training pages, extract the verifiable
 * text content, and validate it through the app-logic.js and normalize.js functions.
 * This simulates what the text-selection verification feature does.
 */

const fs = require('fs');
const path = require('path');

const { extractVerificationUrl, extractCertText, buildVerificationUrl } = require('../public/app-logic.js');
const { normalizeText, sha256 } = require('../public/normalize.js');

const TRAINING_PAGES_DIR = path.join(__dirname, '../public/training-pages');

/**
 * Strip HTML tags and decode common entities
 */
function stripHtml(html) {
    return html
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/<\/?(p|div|span|h[1-6])[^>]*>/gi, '\n')
        .replace(/<[^>]+>/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/\n\s*\n/g, '\n')
        .trim();
}

/**
 * Extract text content from the bordered verification area in an HTML file
 * Uses regex to find .bordered-content or .cert-content sections
 */
function extractVerifiableText(htmlContent) {
    // Try to find .bordered-content section
    let match = htmlContent.match(/<div[^>]*class="[^"]*bordered-content[^"]*"[^>]*>([\s\S]*?)<\/div>\s*(?:<div[^>]*class="[^"]*(?:footer|server|contact)[^"]*"|\s*<\/div>)/i);

    if (!match) {
        // Try .cert-content section
        match = htmlContent.match(/<div[^>]*class="[^"]*cert-content[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
    }

    if (!match) {
        return null;
    }

    let content = match[1];

    // Also look for verify-url element if not already in content
    const verifyUrlMatch = htmlContent.match(/<div[^>]*class="[^"]*verify-url[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
    if (verifyUrlMatch && !content.includes(verifyUrlMatch[1])) {
        content += '\n' + verifyUrlMatch[1];
    }

    return stripHtml(content);
}

/**
 * Alternative extraction for certificate pages with specific structure
 */
function extractCertificateText(htmlContent) {
    // For certificate pages, look for .cert-content followed by .verify-url
    const certMatch = htmlContent.match(/<div[^>]*class="[^"]*cert-content[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
    const verifyMatch = htmlContent.match(/<div[^>]*class="[^"]*verify-url[^"]*"[^>]*>([\s\S]*?)<\/div>/i);

    if (!certMatch) {
        return null;
    }

    let text = stripHtml(certMatch[1]);
    if (verifyMatch) {
        text += '\n' + stripHtml(verifyMatch[1]);
    }

    return text;
}

describe('Training Pages Integration Tests', () => {
    // Test files that have registered hashes (should verify successfully)
    const registeredPages = [
        {
            file: 'bachelor-thaumatology.html',
            expectedHash: '1cddfbb2adfa13e4562d274b59e56b946f174a0feb566622dd67a4880cf0b223',
            description: 'Bachelor of Thaumatology - Ponder Stibbons'
        },
        {
            file: 'master-applied-anthropics.html',
            expectedHash: '6725b845dcdf2490adf8d5f62e09e5f2055cb80c6200e5ccf58875c8190f4a80',
            description: 'Master of Applied Anthropics - Esk Weatherwax'
        },
        {
            file: 'doctorate-high-energy-magic.html',
            expectedHash: '09d1e6765c2dbd833e5a1f4770d9f0c9368224f7b1aed34de7a3bd5bf4d1f031',
            description: 'Doctorate in High Energy Magic - Adrian Turnipseed'
        }
    ];

    describe('Verification URL extraction from HTML source', () => {
        const testPages = [
            { file: 'bachelor-thaumatology.html', expectedPrefix: 'verify:' },
            { file: 'uk-coffee-shop.html', expectedPrefix: 'vfy:' },
            { file: 'hotel-receipt-scheidegg.html', expectedPrefix: 'vfy:' },
            { file: 'us-burrito-shop.html', expectedPrefix: 'vfy:' }
        ];

        testPages.forEach(({ file, expectedPrefix }) => {
            it(`should extract ${expectedPrefix} URL from ${file}`, () => {
                const htmlPath = path.join(TRAINING_PAGES_DIR, file);
                const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

                let text = extractVerifiableText(htmlContent);
                if (!text) {
                    text = extractCertificateText(htmlContent);
                }

                expect(text).not.toBeNull();
                expect(text.length).toBeGreaterThan(10);

                const { url, urlLineIndex } = extractVerificationUrl(text);
                expect(url).not.toBeNull();
                expect(url.toLowerCase().startsWith(expectedPrefix)).toBe(true);
                expect(urlLineIndex).toBeGreaterThanOrEqual(0);
            });
        });
    });

    describe('Full verification pipeline for registered pages', () => {
        registeredPages.forEach(({ file, expectedHash, description }) => {
            it(`should produce correct hash for ${description}`, () => {
                const htmlPath = path.join(TRAINING_PAGES_DIR, file);
                const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

                let text = extractVerifiableText(htmlContent);
                if (!text) {
                    text = extractCertificateText(htmlContent);
                }

                expect(text).not.toBeNull();

                // Step 1: Extract verification URL
                const { url, urlLineIndex } = extractVerificationUrl(text);
                expect(url).not.toBeNull();

                // Step 2: Extract certification text (everything before URL)
                const certText = extractCertText(text, urlLineIndex);
                expect(certText.length).toBeGreaterThan(0);

                // Step 3: Normalize the text
                const normalized = normalizeText(certText);
                expect(normalized.length).toBeGreaterThan(0);

                // Step 4: Compute SHA-256 hash
                const hash = sha256(normalized);
                expect(hash).toBe(expectedHash);

                // Step 5: Build verification URL
                const verificationUrl = buildVerificationUrl(url, hash);
                expect(verificationUrl).toContain(expectedHash);
                expect(verificationUrl.startsWith('https://')).toBe(true);
            });
        });
    });

    describe('Certification text extraction', () => {
        it('should extract cert text without the verification URL line', () => {
            const htmlPath = path.join(TRAINING_PAGES_DIR, 'bachelor-thaumatology.html');
            const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

            let text = extractVerifiableText(htmlContent);
            if (!text) {
                text = extractCertificateText(htmlContent);
            }

            const { urlLineIndex } = extractVerificationUrl(text);
            const certText = extractCertText(text, urlLineIndex);

            // Cert text should NOT contain verify: or vfy:
            expect(certText.toLowerCase()).not.toContain('verify:');
            expect(certText.toLowerCase()).not.toContain('vfy:');

            // Should contain expected content
            expect(certText).toContain('Unseen University');
            expect(certText).toContain('Ponder Stibbons');
        });
    });

    describe('Normalization consistency', () => {
        it('should produce consistent normalized text from HTML source', () => {
            const htmlPath = path.join(TRAINING_PAGES_DIR, 'bachelor-thaumatology.html');
            const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

            let text = extractVerifiableText(htmlContent);
            if (!text) {
                text = extractCertificateText(htmlContent);
            }

            const { urlLineIndex } = extractVerificationUrl(text);
            const certText = extractCertText(text, urlLineIndex);

            // Normalize twice - should be identical (idempotent)
            const normalized1 = normalizeText(certText);
            const normalized2 = normalizeText(normalized1);

            expect(normalized1).toBe(normalized2);
        });

        it('should handle receipts with special formatting', () => {
            const htmlPath = path.join(TRAINING_PAGES_DIR, 'uk-coffee-shop.html');
            const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

            let text = extractVerifiableText(htmlContent);
            if (!text) {
                text = extractCertificateText(htmlContent);
            }

            expect(text).not.toBeNull();

            const { url, urlLineIndex } = extractVerificationUrl(text);
            expect(url).not.toBeNull();
            expect(url.toLowerCase().startsWith('vfy:')).toBe(true);

            const certText = extractCertText(text, urlLineIndex);
            const normalized = normalizeText(certText);

            // Should not have multiple consecutive spaces after normalization
            expect(normalized).not.toMatch(/  +/);
        });
    });

    describe('All training pages have valid structure', () => {
        const allTrainingPages = fs.readdirSync(TRAINING_PAGES_DIR)
            .filter(f => f.endsWith('.html') && f !== 'index.html' && !f.includes('CV'));

        allTrainingPages.forEach(file => {
            it(`${file} should have extractable verification content`, () => {
                const htmlPath = path.join(TRAINING_PAGES_DIR, file);
                const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

                // Should have verification scripts
                expect(htmlContent).toContain('text-selection-verify.js');

                // Should have either verify: or vfy: in the content
                const hasVerifyUrl = htmlContent.includes('verify:') || htmlContent.includes('vfy:');
                expect(hasVerifyUrl).toBe(true);
            });
        });
    });
});

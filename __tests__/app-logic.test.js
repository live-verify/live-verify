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

// Mock canvas for testing (avoids need for jsdom)
class MockCanvas {
    constructor() {
        this.width = 0;
        this.height = 0;
    }
    getContext() {
        return {
            translate: jest.fn(),
            rotate: jest.fn(),
            drawImage: jest.fn()
        };
    }
}

// Mock document.createElement for canvas
global.document = {
    createElement: (tag) => {
        if (tag === 'canvas') {
            return new MockCanvas();
        }
        throw new Error(`Unexpected createElement: ${tag}`);
    }
};

const {
    rotateCanvas,
    extractVerificationUrl,
    trimToFirstLinePattern,
    extractCertText,
    hashMatchesUrl,
    buildVerificationUrl,
    extractDomain,
    fetchVerificationMeta,
    checkAuthorization,
    walkAuthorizationChain
} = require('../public/app-logic.js');

function extractVerificationUrlOnly(rawText) {
    return extractVerificationUrl(rawText).url;
}

describe('App Logic - Pure Functions', () => {
    describe('rotateCanvas', () => {
        let sourceCanvas;

        beforeEach(() => {
            sourceCanvas = new MockCanvas();
            sourceCanvas.width = 100;
            sourceCanvas.height = 200;
        });

        it('should preserve dimensions at 0 degrees', () => {
            const rotated = rotateCanvas(sourceCanvas, 0);
            expect(rotated.width).toBe(100);
            expect(rotated.height).toBe(200);
        });

        it('should swap dimensions at 90 degrees', () => {
            const rotated = rotateCanvas(sourceCanvas, 90);
            expect(rotated.width).toBe(200);
            expect(rotated.height).toBe(100);
        });

        it('should preserve dimensions at 180 degrees', () => {
            const rotated = rotateCanvas(sourceCanvas, 180);
            expect(rotated.width).toBe(100);
            expect(rotated.height).toBe(200);
        });

        it('should swap dimensions at 270 degrees', () => {
            const rotated = rotateCanvas(sourceCanvas, 270);
            expect(rotated.width).toBe(200);
            expect(rotated.height).toBe(100);
        });

        it('should normalize 360 degrees to 0', () => {
            const rotated = rotateCanvas(sourceCanvas, 360);
            expect(rotated.width).toBe(100);
            expect(rotated.height).toBe(200);
        });

        it('should normalize 450 degrees to 90', () => {
            const rotated = rotateCanvas(sourceCanvas, 450);
            expect(rotated.width).toBe(200);
            expect(rotated.height).toBe(100);
        });

        it('should normalize negative degrees (-90 = 270)', () => {
            const rotated = rotateCanvas(sourceCanvas, -90);
            expect(rotated.width).toBe(200);
            expect(rotated.height).toBe(100);
        });

        it('should normalize negative degrees (-180)', () => {
            const rotated = rotateCanvas(sourceCanvas, -180);
            expect(rotated.width).toBe(100);
            expect(rotated.height).toBe(200);
        });

        it('should return a new canvas instance', () => {
            const rotated = rotateCanvas(sourceCanvas, 90);
            expect(rotated).not.toBe(sourceCanvas);
        });
    });

    describe('extractVerificationUrl', () => {


        it('should return null for http (not https)', () => {
            const rawText = `Text
http://example.com`;

            const result = extractVerificationUrl(rawText);
            expect(result.url).toBeNull();
            expect(result.urlLineIndex).toBe(-1);
        });

        it('should accept verify: URLs', () => {
            const rawText = `Certification text
verify:live-verify.github.io/live-verify/c`;

            const result = extractVerificationUrl(rawText);
            expect(result.url).toBe('verify:live-verify.github.io/live-verify/c');
            expect(result.urlLineIndex).toBe(1);
        });

        it('should NOT match spaced-out "v e r i f y :" (requires contiguous verify:)', () => {
            const rawText = `Text
v e r i f y : e x a m p l e . c o m / v e r i f i c a t i o n`;

            const result = extractVerificationUrl(rawText);
            // Spaced-out text doesn't match - space removal is handled by normalization elsewhere
            expect(result.url).toBeNull();
        });

        it('should accept VERIFY: in any case (prefix normalized to lowercase)', () => {
            const rawText = `Text
VERIFY:EXAMPLE.COM/PATH`;

            const result = extractVerificationUrl(rawText);
            // Prefix is normalized to lowercase, path case preserved
            expect(result.url).toBe('verify:EXAMPLE.COM/PATH');
        });

        it('should discard OCR garbage below verify: line (real-world example)', () => {
            const rawText = `Unseen University |
Ankh-Morpork
Bachelor of Thaumatology
Awarded to: Ponder Stibbons
Date: Grune 23, A.M. 2024
Archchancellor: Mustrum Ridcully
Registrar: Rincewind (Wizzard)
verify:live-verify.github.io/live-verify/c
ee a SE AA i Aa A A Re Xe NE Ne ea`;

            const result = extractVerificationUrl(rawText);
            expect(result.url).toBe('verify:live-verify.github.io/live-verify/c');
            expect(result.urlLineIndex).toBe(7);
        });

        // vfy: prefix tests (shortened alternative to verify:)
        it('should accept vfy: URLs', () => {
            const rawText = `Certification text
vfy:live-verify.github.io/live-verify/c`;

            const result = extractVerificationUrl(rawText);
            expect(result.url).toBe('vfy:live-verify.github.io/live-verify/c');
            expect(result.urlLineIndex).toBe(1);
        });

        it('should NOT match spaced-out "v f y :" (requires contiguous vfy:)', () => {
            const rawText = `Text
v f y : e x a m p l e . c o m / v e r i f i c a t i o n`;

            const result = extractVerificationUrl(rawText);
            // Spaced-out text doesn't match - space removal is handled by normalization elsewhere
            expect(result.url).toBeNull();
        });

        it('should accept VFY: in any case (prefix normalized to lowercase)', () => {
            const rawText = `Text
VFY:EXAMPLE.COM/PATH`;

            const result = extractVerificationUrl(rawText);
            // Prefix is normalized to lowercase, path case preserved
            expect(result.url).toBe('vfy:EXAMPLE.COM/PATH');
        });

        it('should accept vfy: in mixed case (prefix normalized to lowercase)', () => {
            const rawText = `Text
VfY:example.com/path`;

            const result = extractVerificationUrl(rawText);
            // Prefix is normalized to lowercase, path case preserved
            expect(result.url).toBe('vfy:example.com/path');
        });

        it('should discard OCR garbage below vfy: line', () => {
            const rawText = `Unseen University
Bachelor of Thaumatology
Awarded to: Ponder Stibbons
vfy:live-verify.github.io/live-verify/c
random OCR garbage text`;

            const result = extractVerificationUrl(rawText);
            expect(result.url).toBe('vfy:live-verify.github.io/live-verify/c');
            expect(result.urlLineIndex).toBe(3);
        });

        // Tests for OCR leading garbage (verify: preceded by space)
        describe('OCR verify-line garbage handling', () => {
            it('should find verify: preceded by OCR mistakes or with trailing mistakes', () => {
                expect(extractVerificationUrlOnly(`abc verify:example.com/path e`))
                    .toBe('verify:example.com/path');
                expect(extractVerificationUrlOnly(`abc vfy:example.com/path e`))
                    .toBe('vfy:example.com/path');

                expect(extractVerificationUrlOnly(`xyz verify:example.com/path |`))
                    .toBe('verify:example.com/path');
                expect(extractVerificationUrlOnly(`xyz vfy:example.com/path |`))
                    .toBe('vfy:example.com/path');

                expect(extractVerificationUrlOnly(`]  verify:example.com/path [`))
                    .toBe('verify:example.com/path');
                expect(extractVerificationUrlOnly(`]  vfy:example.com/path [`))
                    .toBe('vfy:example.com/path');

                expect(extractVerificationUrlOnly(`|  verify:example.com/path`))
                    .toBe('verify:example.com/path');
                expect(extractVerificationUrlOnly(`|  vfy:example.com/path`))
                    .toBe('vfy:example.com/path');

                expect(extractVerificationUrlOnly(`verify:example.com/path | ee`))
                    .toBe('verify:example.com/path');
                expect(extractVerificationUrlOnly(`vfy:example.com/path | ee`))
                    .toBe('vfy:example.com/path');

                expect(extractVerificationUrlOnly(`verify:example.com/path } ee`))
                    .toBe('verify:example.com/path');
                expect(extractVerificationUrlOnly(`vfy:example.com/path } ee`))
                    .toBe('vfy:example.com/path');

                expect(extractVerificationUrlOnly(`\tverify:example.com/path`))
                    .toBe('verify:example.com/path');
                expect(extractVerificationUrlOnly(`\tvfy:example.com/path`))
                    .toBe('vfy:example.com/path');

                expect(extractVerificationUrlOnly(`vverify:example.com/path`))
                    .toBe(null);
                expect(extractVerificationUrlOnly(`vvfy:example.com/path`))
                    .toBe(null);

                // Space after colon IS supported (see extractVerificationUrl comment)
                expect(extractVerificationUrlOnly(`verify: example.com/path`))
                    .toBe('verify:example.com/path');
                expect(extractVerificationUrlOnly(`vfy: example.com/path`))
                    .toBe('vfy:example.com/path');

            });
        });

        // Tests for what should NOT match
        describe('should NOT match invalid patterns', () => {

            it('should return null for empty text', () => {
                const result = extractVerificationUrl('');
                expect(result.url).toBeNull();
                expect(result.urlLineIndex).toBe(-1);
            });

            it('should return null for whitespace only', () => {
                const result = extractVerificationUrl('   \n   \n   ');
                expect(result.url).toBeNull();
                expect(result.urlLineIndex).toBe(-1);
            });

            it('should return null when verify: has no URL after it', () => {
                const rawText = `Some text
verify:`;

                const result = extractVerificationUrl(rawText);
                expect(result.url).toBeNull();
            });

            it('should return null when vfy: has no URL after it', () => {
                const rawText = `Some text
vfy:`;

                const result = extractVerificationUrl(rawText);
                expect(result.url).toBeNull();
            });

            it('should return null when verify: has only whitespace after it', () => {
                const rawText = `Some text
verify:   `;

                const result = extractVerificationUrl(rawText);
                expect(result.url).toBeNull();
            });
        });

        // Edge cases
        describe('edge cases', () => {


            it('should handle verify: at very start of text', () => {
                const rawText = `verify:example.com/path`;

                const result = extractVerificationUrl(rawText);
                expect(result.url).toBe('verify:example.com/path');
                expect(result.urlLineIndex).toBe(0);
            });

            it('should handle tabs as whitespace before verify:', () => {
                const rawText = `Some text
\tverify:example.com/path`;

                const result = extractVerificationUrl(rawText);
                expect(result.url).toBe('verify:example.com/path');
            });

            it('should handle URL with query params (space after = garbage)', () => {
                const rawText = `Some text
verify:example.com/path?foo=bar baz`;

                const result = extractVerificationUrl(rawText);
                expect(result.url).toBe('verify:example.com/path?foo=bar');
            });

            it('should preserve path case in extracted URL', () => {
                const rawText = `Some text
verify:Example.COM/VeRiFy/PaTh`;

                const result = extractVerificationUrl(rawText);
                expect(result.url).toBe('verify:Example.COM/VeRiFy/PaTh');
            });
        });
    });

    describe('extractCertText', () => {
        it('should extract text before URL line', () => {
            const rawText = `Line 1
Line 2
Line 3
https://example.com`;

            const result = extractCertText(rawText, 3);
            expect(result).toBe('Line 1\nLine 2\nLine 3');
        });

        it('should remove trailing blank lines from cert text', () => {
            const rawText = `Line 1
Line 2


https://example.com`;

            const result = extractCertText(rawText, 4);
            expect(result).toBe('Line 1\nLine 2');
        });

        it('should handle cert text with no trailing blanks', () => {
            const rawText = `Line 1
Line 2
https://example.com`;

            const result = extractCertText(rawText, 2);
            expect(result).toBe('Line 1\nLine 2');
        });

        it('should handle single line cert text', () => {
            const rawText = `Single Line
https://example.com`;

            const result = extractCertText(rawText, 1);
            expect(result).toBe('Single Line');
        });

        it('should handle empty cert text (URL on first line)', () => {
            const rawText = `https://example.com`;

            const result = extractCertText(rawText, 0);
            expect(result).toBe('');
        });

        it('should preserve blank lines within cert text', () => {
            const rawText = `Line 1

Line 3
https://example.com`;

            const result = extractCertText(rawText, 3);
            expect(result).toBe('Line 1\n\nLine 3');
        });
    });

    describe('trimToFirstLinePattern', () => {
        it('should trim OCR text to the first matching line', () => {
            const text = 'NOISE FROM ABOVE\nRandom stuff\nAccount Number: 12345678\nBalance: $1,000.00';
            const meta = { firstLinePatterns: ['^Account Number:'] };
            expect(trimToFirstLinePattern(text, meta)).toBe('Account Number: 12345678\nBalance: $1,000.00');
        });

        it('should try multiple patterns and match the first occurrence', () => {
            const text = 'Header junk\nLoan Reference: LN-9876\nAmount: $50,000';
            const meta = { firstLinePatterns: ['^Account Number:', '^Loan Reference:'] };
            expect(trimToFirstLinePattern(text, meta)).toBe('Loan Reference: LN-9876\nAmount: $50,000');
        });

        it('should return text unchanged when no patterns match', () => {
            const text = 'Line 1\nLine 2\nLine 3';
            const meta = { firstLinePatterns: ['^Account Number:'] };
            expect(trimToFirstLinePattern(text, meta)).toBe(text);
        });

        it('should return text unchanged when meta is null', () => {
            const text = 'Line 1\nLine 2';
            expect(trimToFirstLinePattern(text, null)).toBe(text);
        });

        it('should return text unchanged when firstLinePatterns is absent', () => {
            const text = 'Line 1\nLine 2';
            expect(trimToFirstLinePattern(text, { issuer: 'Test' })).toBe(text);
        });

        it('should return text unchanged when firstLinePatterns is empty', () => {
            const text = 'Line 1\nLine 2';
            expect(trimToFirstLinePattern(text, { firstLinePatterns: [] })).toBe(text);
        });

        it('should match first line if it already matches', () => {
            const text = 'Account Number: 12345678\nBalance: $1,000.00';
            const meta = { firstLinePatterns: ['^Account Number:'] };
            expect(trimToFirstLinePattern(text, meta)).toBe(text);
        });

        it('should trim whitespace before matching', () => {
            const text = 'Noise\n  Account Number: 12345678\nBalance: $1,000.00';
            const meta = { firstLinePatterns: ['^Account Number:'] };
            expect(trimToFirstLinePattern(text, meta)).toBe('  Account Number: 12345678\nBalance: $1,000.00');
        });

        it('should support object entries with pattern field', () => {
            const text = 'Noise\n8 Market Square\nHenley-on-Thames';
            const meta = {
                firstLinePatterns: [
                    { pattern: '^\\d+\\s+\\w+\\s+Square', description: 'Street address' }
                ]
            };
            expect(trimToFirstLinePattern(text, meta)).toBe('8 Market Square\nHenley-on-Thames');
        });

        it('should skip invalid regex patterns gracefully', () => {
            const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
            const text = 'Noise\nAccount Number: 123';
            const meta = { firstLinePatterns: ['(invalid', '^Account Number:'] };
            expect(trimToFirstLinePattern(text, meta)).toBe('Account Number: 123');
            expect(consoleSpy).toHaveBeenCalled();
            consoleSpy.mockRestore();
        });

        it('should pick the earliest matching line across multiple patterns', () => {
            const text = 'Noise\nReceipt: DG-001\nAccount Number: 123\nMore stuff';
            const meta = { firstLinePatterns: ['^Account Number:', '^Receipt:'] };
            // Receipt: appears on line 2, Account Number: on line 3 — should pick line 2
            expect(trimToFirstLinePattern(text, meta)).toBe('Receipt: DG-001\nAccount Number: 123\nMore stuff');
        });
    });

    describe('hashMatchesUrl', () => {
        const hash = '09d1e6765c2dbd833e5a1f4770d9f0c9368224f7b1aed34de7a3bd5bf4d1f031';

        it('should return true when hash is in URL', () => {
            const url = `https://example.com/c/${hash}`;
            expect(hashMatchesUrl(url, hash)).toBe(true);
        });

        it('should return false when hash is not in URL', () => {
            const url = 'https://example.com/c/differenthash123';
            expect(hashMatchesUrl(url, hash)).toBe(false);
        });

        it('should return false for empty URL', () => {
            expect(hashMatchesUrl('', hash)).toBe(false);
        });

        it('should handle partial hash matches correctly', () => {
            const partialHash = '09d1e676';
            const url = `https://example.com/c/${hash}`;
            expect(hashMatchesUrl(url, partialHash)).toBe(true);
        });

        it('should be case sensitive', () => {
            const upperHash = hash.toUpperCase();
            const url = `https://example.com/c/${hash}`;
            expect(hashMatchesUrl(url, upperHash)).toBe(false);
        });
    });

    describe('buildVerificationUrl', () => {
        const hash = '09d1e6765c2dbd833e5a1f4770d9f0c9368224f7b1aed34de7a3bd5bf4d1f031';

        it('should convert verify: to https:// and append hash', () => {
            const baseUrl = 'verify:live-verify.github.io/live-verify/c';
            const result = buildVerificationUrl(baseUrl, hash);
            expect(result).toBe(`https://live-verify.github.io/live-verify/c/${hash}`);
        });


        it('should handle VERIFY: in uppercase', () => {
            const baseUrl = 'VERIFY:example.com/path';
            const result = buildVerificationUrl(baseUrl, hash);
            expect(result).toBe(`https://example.com/path/${hash}`);
        });

        it('should handle verify: with mixed case', () => {
            const baseUrl = 'VeRiFy:example.com/path';
            const result = buildVerificationUrl(baseUrl, hash);
            expect(result).toBe(`https://example.com/path/${hash}`);
        });

        it('should preserve case in domain and path', () => {
            const baseUrl = 'verify:Example.COM/VeRiFiCation';
            const result = buildVerificationUrl(baseUrl, hash);
            expect(result).toBe(`https://Example.COM/VeRiFiCation/${hash}`);
        });

        it('should handle verify: without trailing slash', () => {
            const baseUrl = 'verify:example.com';
            const result = buildVerificationUrl(baseUrl, hash);
            expect(result).toBe(`https://example.com/${hash}`);
        });

        // vfy: prefix tests
        it('should convert vfy: to https:// and append hash', () => {
            const baseUrl = 'vfy:live-verify.github.io/live-verify/c';
            const result = buildVerificationUrl(baseUrl, hash);
            expect(result).toBe(`https://live-verify.github.io/live-verify/c/${hash}`);
        });

        it('should handle VFY: in uppercase', () => {
            const baseUrl = 'VFY:example.com/path';
            const result = buildVerificationUrl(baseUrl, hash);
            expect(result).toBe(`https://example.com/path/${hash}`);
        });

        it('should handle vfy: with mixed case', () => {
            const baseUrl = 'VfY:example.com/path';
            const result = buildVerificationUrl(baseUrl, hash);
            expect(result).toBe(`https://example.com/path/${hash}`);
        });

        it('should preserve case in domain and path for vfy:', () => {
            const baseUrl = 'vfy:Example.COM/VeRiFiCation';
            const result = buildVerificationUrl(baseUrl, hash);
            expect(result).toBe(`https://Example.COM/VeRiFiCation/${hash}`);
        });

        it('should handle vfy: without trailing slash', () => {
            const baseUrl = 'vfy:example.com';
            const result = buildVerificationUrl(baseUrl, hash);
            expect(result).toBe(`https://example.com/${hash}`);
        });

        it('should use hashesHostedAt when present in meta', () => {
            const baseUrl = 'verify:paulhammant.com/refs';
            const meta = { hashesHostedAt: 'https://paul-hammant.github.io/claims_i_verify/refs' };
            const result = buildVerificationUrl(baseUrl, hash, meta);
            expect(result).toBe(`https://paul-hammant.github.io/claims_i_verify/refs/${hash}`);
        });

        it('should use hashesHostedAt with appendToHashResourceName', () => {
            const baseUrl = 'verify:paulhammant.com/refs';
            const meta = {
                hashesHostedAt: 'https://paul-hammant.github.io/claims_i_verify/refs',
                appendToHashResourceName: '.json'
            };
            const result = buildVerificationUrl(baseUrl, hash, meta);
            expect(result).toBe(`https://paul-hammant.github.io/claims_i_verify/refs/${hash}.json`);
        });

        it('should strip trailing slash from hashesHostedAt', () => {
            const baseUrl = 'verify:paulhammant.com/refs';
            const meta = { hashesHostedAt: 'https://example.com/hashes/' };
            const result = buildVerificationUrl(baseUrl, hash, meta);
            expect(result).toBe(`https://example.com/hashes/${hash}`);
        });

        it('should prefer appendToHashResourceName over appendToHashFileName', () => {
            const baseUrl = 'verify:example.com/c';
            const meta = {
                appendToHashResourceName: '.json',
                appendToHashFileName: '.old'
            };
            const result = buildVerificationUrl(baseUrl, hash, meta);
            expect(result).toBe(`https://example.com/c/${hash}.json`);
        });

        it('should fall back to appendToHashFileName when appendToHashResourceName absent', () => {
            const baseUrl = 'verify:example.com/c';
            const meta = { appendToHashFileName: '.json' };
            const result = buildVerificationUrl(baseUrl, hash, meta);
            expect(result).toBe(`https://example.com/c/${hash}.json`);
        });

        it('should correctly remove exactly 4 characters from vfy: prefix', () => {
            // vfy: is 4 characters, verify: is 7 characters
            const vfyUrl = 'vfy:domain.com/path';
            const verifyUrl = 'verify:domain.com/path';

            const vfyResult = buildVerificationUrl(vfyUrl, hash);
            const verifyResult = buildVerificationUrl(verifyUrl, hash);

            // Both should produce the same https URL
            expect(vfyResult).toBe(`https://domain.com/path/${hash}`);
            expect(verifyResult).toBe(`https://domain.com/path/${hash}`);
            expect(vfyResult).toBe(verifyResult);
        });
    });

    describe('extractCertText preserves brackets', () => {
        it('should preserve brackets in text', () => {
            const rawText = `Test [inner] text\nverify:example.com/c`;
            const result = extractCertText(rawText, 1);
            expect(result).toBe('Test [inner] text');
        });
    });

    describe('extractDomain', () => {
        it('should extract domain from verify: URL', () => {
            expect(extractDomain('verify:example.com/c')).toBe('example.com');
        });

        it('should extract domain from vfy: URL', () => {
            expect(extractDomain('vfy:test.org/path')).toBe('test.org');
        });

        it('should extract domain from https:// URL', () => {
            expect(extractDomain('https://secure.example.com/verify')).toBe('secure.example.com');
        });

        it('should handle URL without path', () => {
            expect(extractDomain('verify:example.com')).toBe('example.com');
        });

        it('should handle complex subdomains', () => {
            expect(extractDomain('verify:sub.domain.example.co.uk/path')).toBe('sub.domain.example.co.uk');
        });
    });

    describe('fetchVerificationMeta', () => {
        it('should be exported as fetchVerificationMeta (not fetchVerificMeta)', () => {
            expect(typeof fetchVerificationMeta).toBe('function');
        });
    });

    describe('checkAuthorization', () => {
        beforeEach(() => {
            global.fetch = jest.fn();
        });

        afterEach(() => {
            delete global.fetch;
        });

        it('should return checked: false when meta has no authorizedBy', async () => {
            const result = await checkAuthorization({}, 'https://example.com/verification-meta.json');
            expect(result.checked).toBe(false);
            expect(result.confirmed).toBe(false);
            expect(result.authorizer).toBeNull();
        });

        it('should return checked: false when meta is null', async () => {
            const result = await checkAuthorization(null, 'https://example.com/verification-meta.json');
            expect(result.checked).toBe(false);
        });

        it('should return confirmed: true when authorizer returns OK for correct hash', async () => {
            const meta = {
                issuer: 'Test Issuer',
                authorizedBy: 'endorser.com/verifiers'
            };
            const metaJson = JSON.stringify(meta);
            const canonicalJson = JSON.stringify(JSON.parse(metaJson));

            // Mock fetch: first call returns the meta JSON (re-fetch for hashing),
            // second call returns OK (authorization confirmation),
            // third call is the chain walk (authorizer's own meta)
            global.fetch = jest.fn()
                .mockResolvedValueOnce({
                    ok: true,
                    text: () => Promise.resolve(metaJson)
                })
                .mockResolvedValueOnce({
                    ok: true,
                    status: 200,
                    text: () => Promise.resolve('OK')
                })
                .mockResolvedValueOnce({
                    ok: true,
                    json: () => Promise.resolve({ description: 'Test Authorizer Org' })
                });

            const result = await checkAuthorization(meta, 'https://example.com/verification-meta.json');
            expect(result.checked).toBe(true);
            expect(result.confirmed).toBe(true);
            expect(result.authorizer).toBe('endorser.com');
            expect(result.expired).toBe(false);
        });

        it('should return confirmed: false when authorizer returns 404', async () => {
            const meta = {
                issuer: 'Test Issuer',
                authorizedBy: 'endorser.com/verifiers'
            };
            const metaJson = JSON.stringify(meta);

            global.fetch = jest.fn()
                .mockResolvedValueOnce({
                    ok: true,
                    text: () => Promise.resolve(metaJson)
                })
                .mockResolvedValueOnce({
                    ok: false,
                    status: 404
                })
                .mockResolvedValueOnce({
                    ok: true,
                    json: () => Promise.resolve({ description: 'Test Authorizer Org' })
                });

            const result = await checkAuthorization(meta, 'https://example.com/verification-meta.json');
            expect(result.checked).toBe(true);
            expect(result.confirmed).toBe(false);
        });

        it('should return expired: true when authorizedTo is in the past', async () => {
            const meta = {
                issuer: 'Test Issuer',
                authorizedBy: 'endorser.com/verifiers',
                authorizedTo: '2020-01-01'
            };

            const result = await checkAuthorization(meta, 'https://example.com/verification-meta.json');
            expect(result.checked).toBe(true);
            expect(result.confirmed).toBe(false);
            expect(result.expired).toBe(true);
        });

        it('should return successor when authorization is expired and successor is set', async () => {
            const meta = {
                issuer: 'Test Issuer',
                authorizedBy: 'old-endorser.com/verifiers',
                authorizedTo: '2020-01-01',
                successor: 'new-endorser.com/verifiers'
            };

            const result = await checkAuthorization(meta, 'https://example.com/verification-meta.json');
            expect(result.expired).toBe(true);
            expect(result.successor).toBe('new-endorser.com/verifiers');
        });

        it('should handle missing authorizedFrom/authorizedTo (open-ended authorization)', async () => {
            const meta = {
                issuer: 'Test Issuer',
                authorizedBy: 'endorser.com/verifiers'
            };
            const metaJson = JSON.stringify(meta);

            global.fetch = jest.fn()
                .mockResolvedValueOnce({
                    ok: true,
                    text: () => Promise.resolve(metaJson)
                })
                .mockResolvedValueOnce({
                    ok: true,
                    status: 200,
                    text: () => Promise.resolve('OK')
                })
                .mockResolvedValueOnce({
                    ok: true,
                    json: () => Promise.resolve({ description: 'Test Authorizer Org' })
                });

            const result = await checkAuthorization(meta, 'https://example.com/verification-meta.json');
            expect(result.checked).toBe(true);
            expect(result.confirmed).toBe(true);
            expect(result.expired).toBe(false);
        });
    });

    describe('walkAuthorizationChain', () => {
        beforeEach(() => {
            global.fetch = jest.fn();
        });

        afterEach(() => {
            delete global.fetch;
        });

        const dummyHashFn = async (text) => 'abc123';

        it('should return single-level chain', async () => {
            global.fetch = jest.fn().mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve({ description: 'Test Authorizer' })
            });

            const result = await walkAuthorizationChain('endorser.com/verifiers', true, dummyHashFn);
            expect(result).toHaveLength(1);
            expect(result[0].authorizer).toBe('endorser.com');
            expect(result[0].description).toBe('Test Authorizer');
            expect(result[0].confirmed).toBe(true);
        });

        it('should return two-level chain when authorizer has authorizedBy', async () => {
            global.fetch = jest.fn()
                .mockResolvedValueOnce({
                    ok: true,
                    json: () => Promise.resolve({
                        description: 'ARB',
                        authorizedBy: 'gov.uk/regulators'
                    })
                })
                .mockResolvedValueOnce({
                    ok: true,
                    json: () => Promise.resolve({
                        description: 'UK Government'
                    })
                });

            const result = await walkAuthorizationChain('arb.org.uk/accredited', true, dummyHashFn);
            expect(result).toHaveLength(2);
            expect(result[0].authorizer).toBe('arb.org.uk');
            expect(result[0].description).toBe('ARB');
            expect(result[1].authorizer).toBe('gov.uk');
            expect(result[1].description).toBe('UK Government');
        });

        it('should respect max depth of 3', async () => {
            global.fetch = jest.fn()
                .mockResolvedValueOnce({
                    ok: true,
                    json: () => Promise.resolve({
                        description: 'Level 1',
                        authorizedBy: 'level2.com/v'
                    })
                })
                .mockResolvedValueOnce({
                    ok: true,
                    json: () => Promise.resolve({
                        description: 'Level 2',
                        authorizedBy: 'level3.com/v'
                    })
                })
                .mockResolvedValueOnce({
                    ok: true,
                    json: () => Promise.resolve({
                        description: 'Level 3',
                        authorizedBy: 'level4.com/v'
                    })
                });

            const result = await walkAuthorizationChain('level1.com/v', true, dummyHashFn);
            expect(result).toHaveLength(3);
            expect(result[2].authorizer).toBe('level3.com');
        });

        it('should handle failed fetch gracefully', async () => {
            global.fetch = jest.fn().mockResolvedValueOnce({
                ok: false,
                status: 404
            });

            const result = await walkAuthorizationChain('missing.com/v', true, dummyHashFn);
            expect(result).toHaveLength(1);
            expect(result[0].authorizer).toBe('missing.com');
            expect(result[0].description).toBeNull();
            expect(result[0].confirmed).toBe(true);
        });
    });

    describe('Canonicalization', () => {
        it('should produce consistent output regardless of input formatting', () => {
            const json1 = '{"a": 1, "b": 2}';
            const json2 = '{"a":1,"b":2}';
            const json3 = '{\n  "a": 1,\n  "b": 2\n}';

            const canonical1 = JSON.stringify(JSON.parse(json1));
            const canonical2 = JSON.stringify(JSON.parse(json2));
            const canonical3 = JSON.stringify(JSON.parse(json3));

            expect(canonical1).toBe(canonical2);
            expect(canonical2).toBe(canonical3);
            expect(canonical1).toBe('{"a":1,"b":2}');
        });

        it('should preserve key order for string keys', () => {
            const json = '{"z": 1, "a": 2, "m": 3}';
            const canonical = JSON.stringify(JSON.parse(json));
            expect(canonical).toBe('{"z":1,"a":2,"m":3}');
        });
    });
});

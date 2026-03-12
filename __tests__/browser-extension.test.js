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
 * Tests for browser extension shared modules
 */

const {
    applyDocSpecificNorm,
    normalizeText,
    sha256
} = require('../apps/browser-extension/shared/normalize.js');

const {
    extractVerificationUrl,
    extractCertText,
    buildVerificationUrl,
    extractDomain,
    fetchVerificationMeta
} = require('../apps/browser-extension/shared/verify.js');

const {
    extractDomainAuthority
} = require('../apps/browser-extension/shared/domain-authority.js');

// =============================================================================
// normalize.js tests
// =============================================================================

describe('Browser Extension: normalizeText', () => {
    test('collapses multiple spaces', () => {
        const result = normalizeText('hello    world');
        expect(result).toBe('hello world');
    });

    test('removes leading and trailing spaces from lines', () => {
        const result = normalizeText('  hello world  ');
        expect(result).toBe('hello world');
    });

    test('removes blank lines', () => {
        const result = normalizeText('line1\n\nline2\n\n\nline3');
        expect(result).toBe('line1\nline2\nline3');
    });

    test('normalizes curly double quotes to straight', () => {
        const result = normalizeText('\u201Chello\u201D');
        expect(result).toBe('"hello"');
    });

    test('normalizes curly single quotes to straight', () => {
        const result = normalizeText('\u2018hello\u2019');
        expect(result).toBe("'hello'");
    });

    test('normalizes en-dash and em-dash to hyphen', () => {
        const result = normalizeText('2020\u20132021 and 2021\u20142022');
        expect(result).toBe('2020-2021 and 2021-2022');
    });

    test('normalizes non-breaking space to regular space', () => {
        const result = normalizeText('hello\u00A0world');
        expect(result).toBe('hello world');
    });

    test('normalizes ellipsis to three periods', () => {
        const result = normalizeText('wait\u2026');
        expect(result).toBe('wait...');
    });

    // Note: OCR artifact removal (pipes, tildes, trailing letters) is NOT in
    // browser extension's normalizeText. That's in ocr-cleanup.js for camera apps.
    // Browser extension handles text selection, not OCR output.

    test('preserves pipes in middle of text (not OCR artifact)', () => {
        const result = normalizeText('hello | world');
        expect(result).toBe('hello | world');
    });
});

describe('Browser Extension: applyDocSpecificNorm', () => {
    test('returns text unchanged when no metadata', () => {
        const result = applyDocSpecificNorm('hello world', null);
        expect(result).toBe('hello world');
    });

    test('applies character normalization', () => {
        const metadata = { charNormalization: 'éèêë→e' };
        const result = applyDocSpecificNorm('café', metadata);
        expect(result).toBe('cafe');
    });

    test('applies multiple character groups', () => {
        const metadata = { charNormalization: 'éèêë→e àáâä→a' };
        const result = applyDocSpecificNorm('café à la carte', metadata);
        expect(result).toBe('cafe a la carte');
    });

    test('applies OCR normalization rules', () => {
        const metadata = {
            ocrNormalizationRules: [
                { pattern: 'CHF\\s+(\\d)', replacement: 'CHF$1' }
            ]
        };
        const result = applyDocSpecificNorm('Total: CHF 100', metadata);
        expect(result).toBe('Total: CHF100');
    });
});

describe('Browser Extension: sha256', () => {
    test('hashes empty string correctly', async () => {
        const hash = await sha256('');
        expect(hash).toBe('e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');
    });

    test('hashes "hello" correctly', async () => {
        const hash = await sha256('hello');
        expect(hash).toBe('2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824');
    });

    test('produces 64-character hex string', async () => {
        const hash = await sha256('test');
        expect(hash).toHaveLength(64);
        expect(hash).toMatch(/^[0-9a-f]+$/);
    });

    test('produces consistent results', async () => {
        const hash1 = await sha256('consistent');
        const hash2 = await sha256('consistent');
        expect(hash1).toBe(hash2);
    });

    test('handles unicode correctly', async () => {
        const hash = await sha256('héllo wörld');
        expect(hash).toHaveLength(64);
    });
});

// =============================================================================
// verify.js tests
// =============================================================================

describe('Browser Extension: extractVerificationUrl', () => {
    test('extracts verify: URL', () => {
        const text = 'Certificate text\nJohn Doe\nverify:example.com/c';
        const result = extractVerificationUrl(text);
        expect(result.url).toBe('verify:example.com/c');
        expect(result.urlLineIndex).toBe(2);
    });

    test('extracts vfy: URL', () => {
        const text = 'Certificate\nvfy:example.com/path';
        const result = extractVerificationUrl(text);
        expect(result.url).toBe('vfy:example.com/path');
        expect(result.urlLineIndex).toBe(1);
    });

    test('returns null when no URL found', () => {
        const text = 'Just plain text\nNo URL here';
        const result = extractVerificationUrl(text);
        expect(result.url).toBeNull();
        expect(result.urlLineIndex).toBe(-1);
    });

    test('handles space after colon', () => {
        const text = 'Certificate\nverify: example.com/c';
        const result = extractVerificationUrl(text);
        expect(result.url).toBe('verify:example.com/c');
    });

    test('handles space before colon', () => {
        const text = 'Certificate\nverify :example.com/c';
        const result = extractVerificationUrl(text);
        expect(result.url).toBe('verify:example.com/c');
    });

    test('handles spaces around colon', () => {
        const text = 'Certificate\nverify : example.com/c';
        const result = extractVerificationUrl(text);
        expect(result.url).toBe('verify:example.com/c');
    });

    test('scans from bottom to top', () => {
        const text = 'verify:wrong.com/path\nCertificate\nverify:correct.com/path';
        const result = extractVerificationUrl(text);
        expect(result.url).toBe('verify:correct.com/path');
        expect(result.urlLineIndex).toBe(2);
    });

    test('strips trailing garbage after space in URL', () => {
        const text = 'Certificate\nverify:example.com/c ]';
        const result = extractVerificationUrl(text);
        expect(result.url).toBe('verify:example.com/c');
    });
});

describe('Browser Extension: extractCertText', () => {
    test('extracts text before URL line', () => {
        const text = 'University of Test\nJohn Doe\nFirst Class\nverify:example.com/c';
        const result = extractCertText(text, 3);
        expect(result).toContain('University of Test');
        expect(result).toContain('John Doe');
        expect(result).not.toContain('verify:');
    });

    test('strips leading bracket marker', () => {
        const text = '[University of Test\nJohn Doe\nverify:example.com/c';
        const result = extractCertText(text, 2);
        expect(result).toBe('University of Test\nJohn Doe');
        expect(result).not.toContain('[');
    });

    test('strips trailing bracket marker', () => {
        const text = 'University of Test\nJohn Doe ]\nverify:example.com/c';
        const result = extractCertText(text, 2);
        expect(result).toBe('University of Test\nJohn Doe');
        expect(result).not.toContain(']');
    });

    test('strips both bracket markers', () => {
        const text = '[ University of Test\nJohn Doe ]\nverify:example.com/c';
        const result = extractCertText(text, 2);
        expect(result).toBe('University of Test\nJohn Doe');
    });

    test('removes trailing blank lines', () => {
        const text = 'University of Test\nJohn Doe\n\n\nverify:example.com/c';
        const result = extractCertText(text, 4);
        expect(result).toBe('University of Test\nJohn Doe');
    });
});

describe('Browser Extension: buildVerificationUrl', () => {
    test('converts verify: to https:// and appends hash', () => {
        const result = buildVerificationUrl('verify:example.com/c', 'abc123', null);
        expect(result).toBe('https://example.com/c/abc123');
    });

    test('converts vfy: to https:// and appends hash', () => {
        const result = buildVerificationUrl('vfy:example.com/path', 'def456', null);
        expect(result).toBe('https://example.com/path/def456');
    });

    test('appends suffix from meta', () => {
        const meta = { appendToHashFileName: '.json' };
        const result = buildVerificationUrl('verify:example.com/refs', 'abc123', meta);
        expect(result).toBe('https://example.com/refs/abc123.json');
    });

    test('works without suffix in meta', () => {
        const meta = { someOtherField: 'value' };
        const result = buildVerificationUrl('verify:example.com/c', 'abc123', meta);
        expect(result).toBe('https://example.com/c/abc123');
    });

    test('throws for invalid URL format', () => {
        expect(() => {
            buildVerificationUrl('https://example.com/c', 'abc123', null);
        }).toThrow('Invalid base URL format');
    });
});

describe('Browser Extension: extractDomain', () => {
    test('extracts domain from verify: URL', () => {
        const result = extractDomain('verify:example.com/c');
        expect(result).toBe('example.com');
    });

    test('extracts domain from vfy: URL', () => {
        const result = extractDomain('vfy:test.org/path');
        expect(result).toBe('test.org');
    });

    test('extracts domain from https:// URL', () => {
        const result = extractDomain('https://secure.example.com/verify');
        expect(result).toBe('secure.example.com');
    });

    test('handles URL without path', () => {
        const result = extractDomain('verify:example.com');
        expect(result).toBe('example.com');
    });
});

// =============================================================================
// Integration tests
// =============================================================================

describe('Browser Extension: Full verification flow', () => {
    test('extracts, normalizes, and hashes certificate text', async () => {
        const selectedText = `[Global Tech Exports, Inc.
400 Silicon Valley Blvd
San Jose, CA 95134
verify:example.com/c ]`;

        // Extract URL
        const { url, urlLineIndex } = extractVerificationUrl(selectedText);
        expect(url).toBe('verify:example.com/c');

        // Extract cert text
        const certText = extractCertText(selectedText, urlLineIndex);
        expect(certText).not.toContain('[');
        expect(certText).not.toContain(']');
        expect(certText).not.toContain('verify:');

        // Normalize
        const normalized = normalizeText(certText);
        expect(normalized).toContain('Global Tech Exports, Inc.');

        // Hash
        const hash = await sha256(normalized);
        expect(hash).toHaveLength(64);

        // Build URL
        const verificationUrl = buildVerificationUrl(url, hash, null);
        expect(verificationUrl).toMatch(/^https:\/\/example\.com\/c\/[a-f0-9]{64}$/);
    });

    test('handles unicode and special characters', async () => {
        const selectedText = `[Café "La Maison" – Paris
Owner: François Müller
verify:example.com/c ]`;

        const { url, urlLineIndex } = extractVerificationUrl(selectedText);
        const certText = extractCertText(selectedText, urlLineIndex);
        const normalized = normalizeText(certText);

        // Check normalization happened
        expect(normalized).toContain('"La Maison"'); // Curly quotes normalized
        expect(normalized).toContain('-'); // Em-dash normalized

        const hash = await sha256(normalized);
        expect(hash).toHaveLength(64);
    });
});

// =============================================================================
// domain-authority.js tests (synced from public/)
// =============================================================================

describe('Browser Extension: extractDomainAuthority', () => {
    test('extracts registrable domain from standard URL', () => {
        expect(extractDomainAuthority('https://www.example.com/path')).toBe('example.com');
    });

    test('handles country-code TLDs', () => {
        expect(extractDomainAuthority('https://costa.co.uk/verify')).toBe('costa.co.uk');
    });

    test('strips subdomains from .ac.uk', () => {
        expect(extractDomainAuthority('https://degrees.ed.ac.uk/path')).toBe('ed.ac.uk');
    });

    test('handles GitHub Pages', () => {
        expect(extractDomainAuthority('https://myproject.github.io/path')).toBe('github.io');
    });

    test('handles IP addresses', () => {
        expect(extractDomainAuthority('https://192.168.1.1/path')).toBe('192.168.1.1');
    });
});

// =============================================================================
// verify.js exported function name tests
// =============================================================================

describe('Browser Extension: fetchVerificationMeta (renamed)', () => {
    test('fetchVerificationMeta is exported (not fetchVerificMeta)', () => {
        expect(typeof fetchVerificationMeta).toBe('function');
    });
});

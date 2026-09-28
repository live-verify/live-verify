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

const fs = require('fs');
const path = require('path');
const { normalizeText, sha256 } = require('../public/normalize.js');
const { cleanOcrArtifacts } = require('../public/ocr-cleanup.js');

const FIXTURES_DIR = path.join(__dirname, '..', 'normalization-hashes');

/**
 * Parse YAML-like frontmatter from markdown file
 * Simple parser - handles description, charNormalization, and ocrNormalizationRules
 */
function parseFrontmatter(content) {
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);

    if (!frontmatterMatch) {
        return { metadata: null, body: content };
    }

    const frontmatter = frontmatterMatch[1];
    const body = frontmatterMatch[2];

    const metadata = {};

    // Parse description
    const descMatch = frontmatter.match(/^description:\s*(.+)$/m);
    if (descMatch) {
        metadata.description = descMatch[1].trim();
    }

    // Parse charNormalization
    const charNormMatch = frontmatter.match(/^charNormalization:\s*"(.+)"$/m);
    if (charNormMatch) {
        metadata.charNormalization = charNormMatch[1];
    }

    // Parse lineBreaks (faithful | flow)
    const lineBreaksMatch = frontmatter.match(/^lineBreaks:\s*"?([a-z]+)"?\s*$/m);
    if (lineBreaksMatch) {
        metadata.lineBreaks = lineBreaksMatch[1];
    }

    // Parse ocrNormalizationRules (simple single-rule case)
    const ocrRulesMatch = frontmatter.match(/ocrNormalizationRules:\n((?:\s+-[^\n]+\n?)+)/);
    if (ocrRulesMatch) {
        const rules = [];
        const ruleText = ocrRulesMatch[1];
        const patternMatch = ruleText.match(/pattern:\s*"(.+)"/);
        const replacementMatch = ruleText.match(/replacement:\s*"(.*)"/);
        if (patternMatch && replacementMatch) {
            rules.push({
                pattern: patternMatch[1],
                replacement: replacementMatch[1]
            });
        }
        if (rules.length > 0) {
            metadata.ocrNormalizationRules = rules;
        }
    }

    return {
        metadata: Object.keys(metadata).length > 0 ? metadata : null,
        body
    };
}

/**
 * Load all text fixture files from normalization-hashes directory
 */
function loadFixtures() {
    const files = fs.readdirSync(FIXTURES_DIR)
        .filter(f => f.endsWith('.md') && f !== 'README.md');

    return files.map(filename => {
        const expectedHash = filename.replace('.md', '');
        const content = fs.readFileSync(path.join(FIXTURES_DIR, filename), 'utf8');
        const { metadata, body } = parseFrontmatter(content);

        // Skip image fixtures — OCR is handled by native iOS/Android apps
        const isImage = body.trim().match(/^!\[\]\((.+)\)$/);

        return {
            filename,
            expectedHash,
            body: body.trimEnd(),
            metadata,
            description: metadata?.description || filename,
            isImage: !!isImage
        };
    });
}

/**
 * Decode encoded-forms/ sibling files without trusting the platform's decoders:
 * some Node builds silently decode 'windows-1252' with latin1 semantics (0x80-0x9F
 * as C1 controls), which is precisely the trap these fixtures exist to catch.
 * The suffix before .txt names the encoding.
 */
const CP1252_HIGH = { // WHATWG windows-1252, the 0x80-0x9F block where it differs from latin1
    0x80: 0x20AC, 0x82: 0x201A, 0x83: 0x0192, 0x84: 0x201E, 0x85: 0x2026, 0x86: 0x2020,
    0x87: 0x2021, 0x88: 0x02C6, 0x89: 0x2030, 0x8A: 0x0160, 0x8B: 0x2039, 0x8C: 0x0152,
    0x8E: 0x017D, 0x91: 0x2018, 0x92: 0x2019, 0x93: 0x201C, 0x94: 0x201D, 0x95: 0x2022,
    0x96: 0x2013, 0x97: 0x2014, 0x98: 0x02DC, 0x99: 0x2122, 0x9A: 0x0161, 0x9B: 0x203A,
    0x9C: 0x0153, 0x9E: 0x017E, 0x9F: 0x0178,
};

function decodeEncodedForm(buf, encoding) {
    switch (encoding) {
        case 'utf8':
        case 'utf8bom': // a leading U+FEFF survives decoding; normalization trims it
            return buf.toString('utf8');
        case 'utf16le':
            return buf.toString('utf16le');
        case 'utf16be': {
            const swapped = Buffer.alloc(buf.length);
            for (let i = 0; i + 1 < buf.length; i += 2) {
                swapped[i] = buf[i + 1];
                swapped[i + 1] = buf[i];
            }
            return swapped.toString('utf16le');
        }
        case 'cp1252':
            return Array.from(buf, b => String.fromCodePoint(CP1252_HIGH[b] || b)).join('');
        default:
            throw new Error(`Unknown encoded-form encoding: ${encoding}`);
    }
}

describe('Decode boundary: encoded forms converge on one hash', () => {
    const withForms = loadFixtures().filter(f => {
        const raw = fs.readFileSync(path.join(FIXTURES_DIR, f.filename), 'utf8');
        const m = raw.match(/^encodedForms:\s*(\S+)\s*$/m);
        if (m) f.encodedFormsBase = m[1];
        return !!m;
    });

    it('has at least one encoded-forms fixture', () => {
        expect(withForms.length).toBeGreaterThanOrEqual(1);
    });

    withForms.forEach(fixture => {
        const dir = path.join(FIXTURES_DIR, 'encoded-forms');
        const siblings = fs.readdirSync(dir)
            .filter(n => n.startsWith(fixture.encodedFormsBase + '.') && n.endsWith('.txt'));

        it(`${fixture.encodedFormsBase}: has multiple encoded siblings`, () => {
            expect(siblings.length).toBeGreaterThanOrEqual(4);
        });

        siblings.forEach(name => {
            const encoding = name.split('.')[1];
            const buf = fs.readFileSync(path.join(dir, name));

            it(`${name} decodes -> canonicalizes -> hashes to the pinned hash`, () => {
                const decoded = decodeEncodedForm(buf, encoding);
                expect(sha256(normalizeText(decoded, fixture.metadata))).toBe(fixture.expectedHash);
            });

            it(`${name} raw file bytes do NOT hash to the pinned hash (sha256sum is the wrong tool)`, () => {
                const rawDigest = require('crypto').createHash('sha256').update(buf).digest('hex');
                expect(rawDigest).not.toBe(fixture.expectedHash);
            });
        });
    });
});

describe('Cross-Platform Hash Consistency', () => {
    const fixtures = loadFixtures();
    const textFixtures = fixtures.filter(f => !f.isImage);

    describe('Text fixtures (normalize → hash)', () => {
        test.each(textFixtures)(
            '$description',
            ({ expectedHash, body, metadata }) => {
                const normalized = normalizeText(body, metadata);
                const computedHash = sha256(normalized);

                expect(computedHash).toBe(expectedHash);
            }
        );
    });

    it('should have loaded at least 5 text fixtures', () => {
        expect(textFixtures.length).toBeGreaterThanOrEqual(5);
    });
});

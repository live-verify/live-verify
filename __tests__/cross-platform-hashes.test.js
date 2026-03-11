/*
    Copyright (C) 2025, Paul Hammant

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation, either version 3 of the
    License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
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

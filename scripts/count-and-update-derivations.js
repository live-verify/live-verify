#!/usr/bin/env node
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
 * Count further derivations in each use-case markdown file and update frontmatter.
 *
 * Further derivations are counted by looking for unique data-verify-line attributes
 * in the HTML content of the markdown files.
 *
 * Usage: node scripts/count-and-update-derivations.js [--dry-run]
 */
const fs = require('fs');
const path = require('path');
const USE_CASES_DIR = path.join(__dirname, '../public/use-cases');
const dryRun = process.argv.includes('--dry-run');
/**
 * Count unique further derivations in markdown content
 * Further derivations are marked by data-verify-line attributes
 */
function countFurtherDerivations(content) {
    // Find all data-verify-line="..." attributes
    const verifyLineMatches = content.match(/data-verify-line="([^"]+)"/g) || [];
    // Remove duplicates
    const uniqueVerifyLines = new Set(verifyLineMatches.map(m => m.match(/data-verify-line="([^"]+)"/)[1]));
    return uniqueVerifyLines.size;
}
/**
 * Parse YAML frontmatter from markdown content
 */
function parseFrontmatter(content) {
    const match = content.match(/^---\n([\s\S]*?)\n---/);
    if (!match) return null;
    return match[1];
}
/**
 * Extract frontmatter and body
 */
function splitFrontmatterAndBody(content) {
    const match = content.match(/^(---\n[\s\S]*?\n---)\n([\s\S]*)$/);
    if (!match) return { frontmatter: '', body: content };
    return { frontmatter: match[1], body: match[2] };
}
/**
 * Check if furtherDerivations field exists in frontmatter
 */
function hasFurtherDerivationsField(frontmatter) {
    return /^\s*furtherDerivations:\s*\d+\s*$/m.test(frontmatter);
}
/**
 * Update furtherDerivations field in frontmatter
 */
function updateFurtherDerivationsInFrontmatter(frontmatter, count) {
    if (hasFurtherDerivationsField(frontmatter)) {
        // Replace existing furtherDerivations field
        return frontmatter.replace(/^\s*furtherDerivations:\s*\d+\s*$/m, `furtherDerivations: ${count}`);
    } else {
        // Add furtherDerivations field after other fields, before the closing ---
        // Insert before the closing --- marker
        return frontmatter.replace(/\n---$/, `\nfurtherDerivations: ${count}\n---`);
    }
}
/**
 * Main function
 */
async function main() {
    console.log(`Reading use-cases from ${USE_CASES_DIR}`);
    console.log(`Dry run: ${dryRun}\n`);
    // Read all markdown files
    const files = fs.readdirSync(USE_CASES_DIR)
        .filter(f => f.endsWith('.md') && f !== 'criteria-template.md' && f !== 'search-index.md')
        .sort();
    console.log(`Found ${files.length} markdown files\n`);
    let totalFurtherDerivations = 0;
    let updatedCount = 0;
    const stats = [];
    for (const file of files) {
        const filepath = path.join(USE_CASES_DIR, file);
        const content = fs.readFileSync(filepath, 'utf-8');
        const furtherDerivations = countFurtherDerivations(content);
        totalFurtherDerivations += furtherDerivations;
        const { frontmatter, body } = splitFrontmatterAndBody(content);
        if (!hasFurtherDerivationsField(frontmatter)) {
            // Would need to update
            updatedCount++;
        }
        stats.push({
            file,
            furtherDerivations
        });
        if (!dryRun) {
            // Always update - add or replace the furtherDerivations field
            const newFrontmatter = updateFurtherDerivationsInFrontmatter(frontmatter, furtherDerivations);
            const newContent = newFrontmatter + '\n' + body;
            fs.writeFileSync(filepath, newContent, 'utf-8');
        }
    }
    // Print summary sorted by furtherDerivation count (descending)
    console.log('--- Further Derivations by Use Case ---');
    stats
        .filter(s => s.furtherDerivations > 0)
        .sort((a, b) => b.furtherDerivations - a.furtherDerivations)
        .forEach(s => {
            console.log(`${s.file}: ${s.furtherDerivations} further derivation(s)`);
        });
    console.log('\n--- Summary ---');
    console.log(`Total use cases: ${files.length}`);
    console.log(`Use cases with further derivations: ${stats.filter(s => s.furtherDerivations > 0).length}`);
    console.log(`Total further derivations across all use cases: ${totalFurtherDerivations}`);
    console.log(`Files updated: ${updatedCount}`);
    if (dryRun) {
        console.log('\n(Dry run - no files modified)');
    }
}
main().catch(console.error);

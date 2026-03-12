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
 * Generate index.json from use-case markdown files with YAML frontmatter.
 *
 * Usage: node scripts/generate-use-cases-index.js [--dry-run]
 */
const fs = require('fs');
const path = require('path');
const USE_CASES_DIR = path.join(__dirname, '../public/use-cases');
const INDEX_FILE = path.join(__dirname, '../public/use-cases/index.json');
const dryRun = process.argv.includes('--dry-run');
/**
 * Parse YAML frontmatter from markdown content
 */
function parseFrontmatter(content) {
    const match = content.match(/^---\n([\s\S]*?)\n---/);
    if (!match) return null;
    const yaml = match[1];
    const metadata = {};
    // Parse simple YAML (key: "value" or key: value)
    yaml.split('\n').forEach(line => {
        const keyMatch = line.match(/^(\w+):\s*"?([^"]*)"?\s*$/);
        if (keyMatch) {
            const key = keyMatch[1];
            const value = keyMatch[2];
            // Parse numeric values
            if (key === 'furtherDerivations' || key === 'volume') {
                metadata[key] = isNaN(value) ? value : parseInt(value, 10);
            } else {
                metadata[key] = value;
            }
        }
        // Handle arrays like tags: ["a", "b"]
        const arrayMatch = line.match(/^(\w+):\s*\[(.*)\]\s*$/);
        if (arrayMatch) {
            metadata[arrayMatch[1]] = arrayMatch[2]
                .split(',')
                .map(s => s.trim().replace(/^"(.*)"$/, '$1'))
                .filter(s => s);
        }
    });
    return metadata;
}
/**
 * Extract snippet from markdown body (first paragraph of Data Verified section)
 */
function extractSnippet(content) {
    // Skip frontmatter
    const bodyMatch = content.match(/^---\n[\s\S]*?\n---\n([\s\S]*)$/);
    if (!bodyMatch) return '';
    const body = bodyMatch[1];
    const dataVerifiedMatch = body.match(/##\s*Data Verified\s*\n+([\s\S]*?)(?=\n##|\n\*\*|$)/);
    if (dataVerifiedMatch) {
        return dataVerifiedMatch[1]
            .split('\n')[0]
            .replace(/\*\*/g, '')
            .trim()
            .substring(0, 200);
    }
    return '';
}
/**
 * Main function
 */
async function main() {
    console.log(`Reading use-cases from ${USE_CASES_DIR}`);
    console.log(`Dry run: ${dryRun}\n`);
    // Read all markdown files
    const files = fs.readdirSync(USE_CASES_DIR)
        .filter(f => f.endsWith('.md') && f !== 'criteria-template.md' && f !== 'search-index.md');
    console.log(`Found ${files.length} markdown files\n`);
    const index = {
        generated: new Date().toISOString(),
        totalUseCases: files.length,
        totalFurtherDerivations: 0,
        categories: {},
        useCases: []
    };
    let errorCount = 0;
    for (const file of files) {
        const filepath = path.join(USE_CASES_DIR, file);
        const content = fs.readFileSync(filepath, 'utf-8');
        const slug = file.replace('.md', '');
        const metadata = parseFrontmatter(content);
        if (!metadata) {
            console.error(`ERROR: No frontmatter in ${file}`);
            errorCount++;
            continue;
        }
        const snippet = extractSnippet(content);
        const furtherDerivations = metadata.furtherDerivations || 0;
        // Add to index
        index.useCases.push({
            slug: metadata.slug || slug,
            title: metadata.title || slug,
            category: metadata.category || 'Uncategorized',
            volume: metadata.volume || 'Unknown',
            retention: metadata.retention || 'Unknown',
            verificationMode: metadata.verificationMode || 'clip',
            furtherDerivations: furtherDerivations,
            snippet: snippet,
            tags: metadata.tags || []
        });
        // Track categories
        const cat = metadata.category || 'Uncategorized';
        index.categories[cat] = (index.categories[cat] || 0) + 1;
        // Sum up further derivations
        index.totalFurtherDerivations += furtherDerivations;
        if (dryRun) {
            console.log(`${file}: ${metadata.title} [${metadata.category}] (${furtherDerivations} further derivations)`);
        }
    }
    // Convert categories to sorted array
    index.categoriesList = Object.entries(index.categories)
        .sort((a, b) => b[1] - a[1])
        .map(([name, count]) => ({ name, count }));
    index.totalCategories = index.categoriesList.length;
    console.log('\n--- Summary ---');
    console.log(`Total use cases: ${index.totalUseCases}`);
    console.log(`Total categories: ${index.totalCategories}`);
    console.log(`Total further derivations: ${index.totalFurtherDerivations}`);
    if (errorCount > 0) {
        console.log(`Errors: ${errorCount}`);
    }
    if (!dryRun) {
        fs.writeFileSync(INDEX_FILE, JSON.stringify(index, null, 2));
        console.log(`\nWrote index to ${INDEX_FILE}`);
    }
}
main().catch(console.error);

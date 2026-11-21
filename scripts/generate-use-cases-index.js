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
 * Strip markdown/HTML markup so a snippet is safe to drop into a catalog card.
 */
function plainText(s) {
    return s
        .replace(/<[^>]*>/g, '')
        .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
        .replace(/\*\*|__|`/g, '')
        .replace(/\s+/g, ' ')
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .trim();
}
/**
 * First sentence of a paragraph, capped so a card never carries more than a line or two.
 */
function firstSentence(text, max = 160) {
    const end = text.search(/[.!?](?=\s+[A-Z"“(]|\s*$)/);
    let sentence = end >= 30 ? text.substring(0, end + 1) : text;
    if (sentence.length > max) {
        sentence = sentence.substring(0, max).replace(/\s+\S*$/, '').replace(/[,;:—-]+$/, '') + '…';
    }
    return sentence;
}
/**
 * Extract the one-line snippet shown on a catalog card. In order of preference:
 *   1. `summary` in the frontmatter (hand-written hook)
 *   2. the first sentence of the page's opening prose paragraph
 *   3. the first line of the "What Is Checked" section (a field list)
 */
function extractSnippet(content, metadata) {
    if (metadata && metadata.summary) return plainText(metadata.summary);
    // Skip frontmatter
    const bodyMatch = content.match(/^---\n[\s\S]*?\n---\n([\s\S]*)$/);
    if (!bodyMatch) return '';
    const body = bodyMatch[1];
    const intro = body.split(/\n##\s*What Is Checked/)[0];
    let htmlDepth = 0;
    for (const rawBlock of intro.split(/\n\s*\n/)) {
        const block = rawBlock.trim();
        const opens = (block.match(/<(div|pre|details|table|svg)\b/g) || []).length;
        const closes = (block.match(/<\/(div|pre|details|table|svg)>/g) || []).length;
        const insideHtml = htmlDepth > 0 || block.startsWith('<');
        htmlDepth = Math.max(0, htmlDepth + opens - closes);
        if (insideHtml || block.length < 40) continue;
        if (/^(#|\||[-*+]\s|>|```|\d+\.\s|\*\*[^*]+:\*\*)/.test(block)) continue;
        // A paragraph that runs straight into a list contributes only its lead-in
        return firstSentence(plainText(block.split(/\n\s*[-*+]\s/)[0]));
    }
    const whatIsCheckedMatch = body.match(/##\s*What Is Checked\s*\n+([\s\S]*?)(?=\n##|\n\*\*|$)/);
    if (whatIsCheckedMatch) {
        return plainText(whatIsCheckedMatch[1].split('\n')[0]).substring(0, 200);
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
        const snippet = extractSnippet(content, metadata);
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

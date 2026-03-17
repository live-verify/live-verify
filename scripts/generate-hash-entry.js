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

// Entry point for webpack-bundled generate-hash.js
// Imports canonical normalizeText from public/normalize.js.
//
// Usage (after webpack build):
//   node generate-hash.js claim.txt              # prints hash
//   node generate-hash.js claim.txt output-dir/  # also writes {hash}.json

const fs = require('fs');
const crypto = require('crypto');
const { normalizeText } = require('../public/normalize.js');

function sha256(text) {
    return crypto.createHash('sha256').update(text, 'utf8').digest('hex');
}

const args = process.argv.slice(2);

if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
    console.error('Usage: node generate-hash.js <claim.txt> [output-dir/]');
    console.error('');
    console.error('  Reads claim text, normalizes it, computes SHA-256 hash.');
    console.error('  If output-dir is given, writes {hash}.json there.');
    console.error('  The claim text should NOT include the verify: line.');
    process.exit(1);
}

const inputFile = args[0];
const outputDir = args[1] || null;

if (!fs.existsSync(inputFile)) {
    console.error('File not found: ' + inputFile);
    process.exit(1);
}

const raw = fs.readFileSync(inputFile, 'utf8').trim();
const normalized = normalizeText(raw);
const hash = sha256(normalized);

console.log(hash);

if (outputDir) {
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    const outPath = outputDir.replace(/\/+$/, '') + '/' + hash + '.json';
    fs.writeFileSync(outPath, '{"status":"verified"}\n');
    console.error('Wrote ' + outPath);
}

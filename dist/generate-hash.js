/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 344
(module, __unused_webpack_exports, __webpack_require__) {

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
 * Shared text normalization and hashing functions
 * Used by both the main app and test pages
 */

/**
 * Apply document-specific normalization rules from verification-meta.json
 * This allows document issuers to define character substitutions and regex patterns
 * @param {string} text - Text to normalize
 * @param {Object} metadata - Metadata from verification-meta.json (optional)
 * @returns {string} Normalized text with document-specific rules applied
 */
function applyDocSpecificNorm(text, metadata) {
    if (!metadata) {
        return text;
    }

    let result = text;

    // 1. Apply character normalization (compact notation: "éèêë→e àáâä→a")
    if (metadata.charNormalization) {
        const groups = metadata.charNormalization.trim().split(/\s+/);
        for (const group of groups) {
            const parts = group.split('→');
            if (parts.length === 2 && parts[1].length === 1) {
                const sourceChars = parts[0];
                const targetChar = parts[1];
                for (const sourceChar of sourceChars) {
                    const regex = new RegExp(sourceChar.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
                    result = result.replace(regex, targetChar);
                }
            }
        }
    }

    // 2. Apply OCR normalization rules (regex patterns)
    if (metadata.ocrNormalizationRules && Array.isArray(metadata.ocrNormalizationRules)) {
        for (const rule of metadata.ocrNormalizationRules) {
            if (rule.pattern && rule.replacement) {
                try {
                    const regex = new RegExp(rule.pattern, 'g');
                    result = result.replace(regex, rule.replacement);
                } catch (e) {
                    console.error(`Invalid regex pattern: ${rule.pattern}`, e);
                }
            }
        }
    }

    return result;
}

// Text normalization function (as per the document rules)
function normalizeText(text, metadata = null) {
    // Apply document-specific normalization FIRST (before standard normalization)
    // This ensures user-typed text gets the same treatment as OCR text
    text = applyDocSpecificNorm(text, metadata);

    // Normalize Unicode characters that OCR might produce
    text = text.replace(/[\u201C\u201D\u201E]/g, '"');  // Curly double quotes → straight
    text = text.replace(/[\u2018\u2019]/g, "'");        // Curly single quotes → straight
    text = text.replace(/[\u00AB\u00BB]/g, '"');        // Angle quotes → straight double
    text = text.replace(/[\u2013\u2014]/g, '-');        // En/em dash → hyphen
    text = text.replace(/\u00A0/g, ' ');                // Non-breaking space → space
    text = text.replace(/\u2026/g, '...');              // Ellipsis → three periods

    // Split into lines
    const lines = text.split('\n');

    // Apply normalization rules to each line
    // Note: OCR artifact cleanup (border chars, trailing letters) is in ocr-cleanup.js
    // and should be applied BEFORE this function for OCR'd text
    const normalizedLines = lines.map(line => {
        // Remove leading spaces
        line = line.replace(/^\s+/, '');
        // Remove trailing spaces
        line = line.replace(/\s+$/, '');
        // Collapse multiple spaces into single space
        line = line.replace(/\s+/g, ' ');
        return line;
    })
    .filter(line => line.length > 0); // Remove blank lines

    // Join back with newlines, no trailing newline
    return normalizedLines.join('\n');
}

// SHA-256 hash function (works in both browser and Node.js)
function sha256(text) {
    // Node.js environment (for testing)
    if ( true && typeof window === 'undefined') {
        const crypto = __webpack_require__(982);
        return crypto.createHash('sha256').update(text, 'utf8').digest('hex');
    }

    // Browser environment (production)
    return (async () => {
        const encoder = new TextEncoder();
        const data = encoder.encode(text);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return hashHex;
    })();
}

// Export for Node.js testing (doesn't affect browser usage)
if ( true && module.exports) {
    module.exports = { normalizeText, sha256, applyDocSpecificNorm };
}


/***/ },

/***/ 982
(module) {

"use strict";
module.exports = require("crypto");

/***/ },

/***/ 896
(module) {

"use strict";
module.exports = require("fs");

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
//#!/usr/bin/env node
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

const fs = __webpack_require__(896);
const generate_hash_entry_crypto = __webpack_require__(982);
const { normalizeText } = __webpack_require__(344);

function sha256(text) {
    return generate_hash_entry_crypto.createHash('sha256').update(text, 'utf8').digest('hex');
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

/******/ })()
;
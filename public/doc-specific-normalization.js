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
 * Document-specific text normalization rules from verification-meta.json
 *
 * Supports two types of normalization:
 * 1. charNormalization: Compact notation for single-character mappings
 *    Format: "éèêë→e àáâä→a ñ→n ß→B"
 *
 * 2. ocrNormalizationRules: Regex-based structural cleanup
 *    Format: [{pattern: "CHF\\s+(\\d)", replacement: "CHF$1"}]
 */

/**
 * Parse compact character normalization notation
 *
 * @param {string} notation - e.g., "éèêë→e àáâä→a ñ→n ß→B"
 * @returns {Map<string, string>} - Map of source char to target char
 *
 * @example
 * parseCharNormalization("éèêë→e ñ→n")
 * // Returns: Map { 'é' => 'e', 'è' => 'e', 'ê' => 'e', 'ë' => 'e', 'ñ' => 'n' }
 */
function parseCharNormalization(notation) {
    const charMap = new Map();

    if (!notation || typeof notation !== 'string') {
        return charMap;
    }

    // Split by whitespace to get groups like "éèêë→e"
    const groups = notation.trim().split(/\s+/);

    for (const group of groups) {
        // Split by arrow to get source chars and target char
        const parts = group.split('→');
        if (parts.length !== 2) {
            console.warn(`Invalid charNormalization group: ${group}`);
            continue;
        }

        const sourceChars = parts[0];
        const targetChar = parts[1];

        // Validate target is single character
        if (targetChar.length !== 1) {
            console.warn(`Target must be single character in: ${group}`);
            continue;
        }

        // Map each source character to the target
        for (const sourceChar of sourceChars) {
            charMap.set(sourceChar, targetChar);
        }
    }

    return charMap;
}

/**
 * Apply character normalization map to text
 *
 * @param {string} text - Input text
 * @param {Map<string, string>} charMap - Character mapping
 * @returns {string} - Normalized text
 */
function applyCharNormalization(text, charMap) {
    if (!charMap || charMap.size === 0) {
        return text;
    }

    let result = '';
    for (const char of text) {
        result += charMap.get(char) || char;
    }
    return result;
}

/**
 * Apply OCR normalization rules (regex-based)
 *
 * @param {string} text - Input text
 * @param {Array<{pattern: string, replacement: string}>} rules - Normalization rules
 * @returns {string} - Normalized text
 */
function applyOcrNormalizationRules(text, rules) {
    if (!rules || !Array.isArray(rules) || rules.length === 0) {
        return text;
    }

    let result = text;

    for (const rule of rules) {
        if (!rule.pattern || !rule.replacement) {
            console.warn('Invalid OCR normalization rule:', rule);
            continue;
        }

        try {
            const regex = new RegExp(rule.pattern, 'g');
            result = result.replace(regex, rule.replacement);
        } catch (error) {
            console.error(`Invalid regex pattern: ${rule.pattern}`, error);
        }
    }

    return result;
}

/**
 * Apply all document-specific normalization rules
 *
 * @param {string} text - Input text
 * @param {Object} metadata - Parsed verification-meta.json content
 * @returns {string} - Normalized text
 */
function applyDocumentSpecificNormalization(text, metadata) {
    if (!metadata) {
        return text;
    }

    let result = text;

    // 1. Apply character normalization first
    if (metadata.charNormalization) {
        const charMap = parseCharNormalization(metadata.charNormalization);
        result = applyCharNormalization(result, charMap);
    }

    // 2. Apply OCR normalization rules second
    if (metadata.ocrNormalizationRules) {
        result = applyOcrNormalizationRules(result, metadata.ocrNormalizationRules);
    }

    return result;
}

/**
 * Fetch verification-meta.json from a base URL
 *
 * @param {string} baseUrl - Base URL (e.g., "https://example.com/receipts/hotel")
 * @returns {Promise<Object|null>} - Parsed metadata or null if not found
 */
async function fetchMetadata(baseUrl) {
    try {
        // Construct metadata URL by appending /verification-meta.json
        const metadataUrl = baseUrl.endsWith('/')
            ? `${baseUrl}verification-meta.json`
            : `${baseUrl}/verification-meta.json`;

        const response = await fetch(metadataUrl);

        if (!response.ok) {
            // Not found is expected for many documents
            if (response.status === 404) {
                return null;
            }
            console.warn(`Failed to fetch metadata from ${metadataUrl}: ${response.status}`);
            return null;
        }

        return await response.json();
    } catch (error) {
        console.warn(`Error fetching metadata from ${baseUrl}:`, error);
        return null;
    }
}

// Export functions for Node.js (tests) and browser
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        parseCharNormalization,
        applyCharNormalization,
        applyOcrNormalizationRules,
        applyDocumentSpecificNormalization,
        fetchMetadata
    };
}

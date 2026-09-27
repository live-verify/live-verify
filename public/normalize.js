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
    // Unicode canonical composition FIRST. The same glyph can be encoded two ways —
    // precomposed "é" (U+00E9) vs decomposed "e" + combining acute (U+0065 U+0301) —
    // which look identical but are different byte sequences and hash differently.
    // Different OCR engines / text sources emit different forms, so without this the
    // same document can produce different hashes on iOS vs Android. NFC folds both to
    // the canonical precomposed form. Native clients MUST apply the SAME form:
    // Swift .precomposedStringWithCanonicalMapping, Kotlin/Java Normalizer NFC.
    text = text.normalize('NFC');

    // Apply document-specific normalization (before standard normalization)
    // This ensures user-typed text gets the same treatment as OCR text
    text = applyDocSpecificNorm(text, metadata);

    // Normalize Unicode characters that OCR might produce
    text = text.replace(/[\u201C\u201D\u201E]/g, '"');  // Curly double quotes → straight
    text = text.replace(/[\u2018\u2019]/g, "'");        // Curly single quotes → straight
    text = text.replace(/[\u00AB\u00BB]/g, '"');        // Angle quotes → straight double
    text = text.replace(/[\u2013\u2014]/g, '-');        // En/em dash → hyphen
    text = text.replace(/\u00A0/g, ' ');                // Non-breaking space → space
    text = text.replace(/\u2026/g, '...');              // Ellipsis → three periods

    // Line-break regime, declared by the issuer in verification-meta.json.
    // "faithful" (default): every line break is load-bearing — right for tabular
    // documents where row structure is meaning. "flow": a single newline is a soft
    // break (rendering arrangement, e.g. viewport wrap) and collapses to a space;
    // only a blank line separates paragraphs — right for prose, where soft wrap
    // would otherwise change the hash with the reader's screen width.
    // Unrecognised values throw: silently defaulting would hash under the wrong
    // regime and report a false mismatch (or worse, a false match) downstream.
    const lineBreaks = (metadata && metadata.lineBreaks) || 'faithful';
    if (lineBreaks !== 'faithful' && lineBreaks !== 'flow') {
        throw new Error(`Unrecognised lineBreaks mode "${lineBreaks}" — expected "faithful" or "flow"`);
    }

    // Split into lines
    const lines = text.split('\n');

    // Apply normalization rules to each line
    // Note: OCR artifact cleanup (border chars, trailing letters) is in ocr-cleanup.js
    // and should be applied BEFORE this function for OCR'd text
    const trimmedLines = lines.map(line => {
        // Remove leading spaces
        line = line.replace(/^\s+/, '');
        // Remove trailing spaces
        line = line.replace(/\s+$/, '');
        // Collapse multiple spaces into single space
        line = line.replace(/\s+/g, ' ');
        return line;
    });

    if (lineBreaks === 'flow') {
        // Group runs of non-blank lines into paragraphs (blank line = separator),
        // join lines within a paragraph with a single space, paragraphs with LF.
        const paragraphs = [];
        let current = [];
        for (const line of trimmedLines) {
            if (line.length === 0) {
                if (current.length > 0) {
                    paragraphs.push(current.join(' '));
                    current = [];
                }
            } else {
                current.push(line);
            }
        }
        if (current.length > 0) {
            paragraphs.push(current.join(' '));
        }
        return paragraphs.join('\n');
    }

    // faithful: remove blank lines, join with newlines, no trailing newline
    return trimmedLines.filter(line => line.length > 0).join('\n');
}

// SHA-256 hash function (works in both browser and Node.js)
function sha256(text) {
    // Node.js environment (for testing)
    if (typeof require !== 'undefined' && typeof window === 'undefined') {
        const crypto = require('crypto');
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
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { normalizeText, sha256, applyDocSpecificNorm };
}

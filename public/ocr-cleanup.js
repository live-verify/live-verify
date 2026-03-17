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
 * OCR-specific artifact cleanup functions
 * Only needed for camera/OCR verification paths, not for text selection
 */

/**
 * Clean OCR artifacts from text (border characters, trailing letters)
 * Call this BEFORE normalizeText() for OCR'd content
 * @param {string} text - Raw OCR text
 * @returns {string} Text with OCR artifacts removed
 */
function cleanOcrArtifacts(text) {
    const lines = text.split('\n');

    const cleanedLines = lines.map(line => {
        // Remove leading border artifacts (OCR from registration marks/borders)
        // Common characters: | ~ ` ^ * # + = _ \ / [ ] { }
        // Examples: "| text", "~ text", "|| text", "| | text"
        line = line.replace(/^[|~`^*#+=/\\_\[\]{}]+\s*/, '');

        // Remove trailing border artifacts (OCR from registration marks/borders)
        // Examples: "text |", "text ~", "text ||", "text | |"
        line = line.replace(/\s*[|~`^*#+=/\\_\[\]{}]+$/, '');

        // Remove trailing ⌝ registration mark (U+231D) from first line
        // Temporary: until Apple/Google OCR engines consume this mark natively
        // and omit it from text output, we strip it here.
        line = line.replace(/\s*\u231D$/, '');

        // Remove trailing single lowercase letter (OCR artifact)
        // Examples: "John Doe a", "Company Name b" -> "John Doe", "Company Name"
        // Preserves uppercase like "Appendix A", "Grade A" which are likely meaningful
        line = line.replace(/\s+[a-z]$/, '');

        return line;
    });

    return cleanedLines.join('\n');
}

// Export for Node.js testing (doesn't affect browser usage)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { cleanOcrArtifacts };
}

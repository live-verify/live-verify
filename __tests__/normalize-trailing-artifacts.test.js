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

const { normalizeText } = require('../public/normalize.js');
const { cleanOcrArtifacts } = require('../public/ocr-cleanup.js');

// Helper that applies OCR cleanup then normalization (for OCR'd content)
const ocrNormalize = (text) => normalizeText(cleanOcrArtifacts(text));

describe('OCR Cleanup - Trailing Single Character Artifacts', () => {
    it('should remove trailing single character artifacts from OCR', () => {
        // Real example from MIT PhD credential OCR
        const extractedText = `Massachusetts Institute of Technology
Doctor of Philosophy in Computer Science
Hareld J Finch a
Dates: September 1980 - June 1985
Honors: Summa Cum Laude
Certificate Number : MIT-CS-PHD-1985-042
Registrar ID: REG-85-CSAIL-0142`;

        const normalized = ocrNormalize(extractedText);

        // The " a" should be removed from "Hareld J Finch a"
        expect(normalized).toContain('Hareld J Finch');
        expect(normalized).not.toContain('Hareld J Finch a');

        // Full expected output
        const expected = `Massachusetts Institute of Technology
Doctor of Philosophy in Computer Science
Hareld J Finch
Dates: September 1980 - June 1985
Honors: Summa Cum Laude
Certificate Number : MIT-CS-PHD-1985-042
Registrar ID: REG-85-CSAIL-0142`;

        expect(normalized).toBe(expected);
    });

    it('should remove trailing single letters that are OCR artifacts', () => {
        const testCases = [
            { input: 'John Doe a', expected: 'John Doe' },
            { input: 'Jane Smith b', expected: 'Jane Smith' },
            { input: 'Company Name x', expected: 'Company Name' },
            { input: 'Certificate 123 z', expected: 'Certificate 123' },
        ];

        testCases.forEach(({ input, expected }) => {
            const result = ocrNormalize(input);
            expect(result).toBe(expected);
        });
    });

    it('should NOT remove meaningful single letters at end of line', () => {
        // These should be preserved as they're meaningful (uppercase letters)
        // OCR cleanup only removes trailing lowercase letters
        const testCases = [
            'Appendix A',
            'Section B',
            'Grade A',
            'Plan B',
            'Vitamin D',
        ];

        testCases.forEach(input => {
            const result = ocrNormalize(input);
            expect(result).toBe(input);
        });
    });

    it('should remove multiple trailing single character artifacts', () => {
        const input = `Line one a
Line two b
Line three c`;

        const expected = `Line one
Line two
Line three`;

        const result = ocrNormalize(input);
        expect(result).toBe(expected);
    });
});

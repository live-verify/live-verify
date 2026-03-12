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

const {
    parseCharNormalization,
    applyCharNormalization,
    applyOcrNormalizationRules,
    applyDocumentSpecificNormalization
} = require('../public/doc-specific-normalization.js');

describe('parseCharNormalization', () => {
    test('parses single group', () => {
        const map = parseCharNormalization('éèêë→e');
        expect(map.get('é')).toBe('e');
        expect(map.get('è')).toBe('e');
        expect(map.get('ê')).toBe('e');
        expect(map.get('ë')).toBe('e');
        expect(map.size).toBe(4);
    });

    test('parses multiple groups', () => {
        const map = parseCharNormalization('éèêë→e àáâä→a');
        expect(map.get('é')).toBe('e');
        expect(map.get('à')).toBe('a');
        expect(map.size).toBe(8);
    });

    test('parses single char to single char', () => {
        const map = parseCharNormalization('ñ→n ç→c');
        expect(map.get('ñ')).toBe('n');
        expect(map.get('ç')).toBe('c');
        expect(map.size).toBe(2);
    });

    test('handles OCR misread mappings', () => {
        const map = parseCharNormalization('ß→B');
        expect(map.get('ß')).toBe('B');
        expect(map.size).toBe(1);
    });

    test('handles empty string', () => {
        const map = parseCharNormalization('');
        expect(map.size).toBe(0);
    });

    test('handles null/undefined', () => {
        expect(parseCharNormalization(null).size).toBe(0);
        expect(parseCharNormalization(undefined).size).toBe(0);
    });

    test('handles extra whitespace', () => {
        const map = parseCharNormalization('  éè→e   àá→a  ');
        expect(map.get('é')).toBe('e');
        expect(map.get('à')).toBe('a');
        expect(map.size).toBe(4);
    });

    test('warns on invalid format', () => {
        const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
        const map = parseCharNormalization('invalid');
        expect(map.size).toBe(0);
        expect(consoleSpy).toHaveBeenCalled();
        consoleSpy.mockRestore();
    });

    test('warns on multi-character target', () => {
        const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
        const map = parseCharNormalization('ö→oe'); // Invalid: 1 char → 2 chars
        expect(map.size).toBe(0);
        expect(consoleSpy).toHaveBeenCalled();
        consoleSpy.mockRestore();
    });
});

describe('applyCharNormalization', () => {
    test('applies character mappings', () => {
        const map = parseCharNormalization('éèêë→e àáâä→a');
        const result = applyCharNormalization('café', map);
        expect(result).toBe('cafe');
    });

    test('preserves unmapped characters', () => {
        const map = parseCharNormalization('é→e');
        const result = applyCharNormalization('résumé xyz', map);
        expect(result).toBe('resume xyz');
    });

    test('handles empty map', () => {
        const map = new Map();
        const result = applyCharNormalization('café', map);
        expect(result).toBe('café');
    });

    test('handles null map', () => {
        const result = applyCharNormalization('café', null);
        expect(result).toBe('café');
    });

    test('applies OCR misread corrections', () => {
        const map = parseCharNormalization('ß→B');
        const result = applyCharNormalization('Straße', map);
        expect(result).toBe('StraBe');
    });
});

describe('applyOcrNormalizationRules', () => {
    test('applies single rule', () => {
        const rules = [
            { pattern: 'CHF\\s+(\\d)', replacement: 'CHF$1' }
        ];
        const result = applyOcrNormalizationRules('CHF 22.00', rules);
        expect(result).toBe('CHF22.00');
    });

    test('applies multiple rules in sequence', () => {
        const rules = [
            { pattern: 'CHF\\s+(\\d)', replacement: 'CHF$1' },
            { pattern: '(\\d+)\\s+\\.\\s+(\\d+)', replacement: '$1.$2' }
        ];
        const result = applyOcrNormalizationRules('CHF 22 . 00', rules);
        expect(result).toBe('CHF22.00');
    });

    test('supports multiple capture groups', () => {
        const rules = [
            { pattern: '(\\d+)/(\\d+)/(\\d+)', replacement: '$3-$2-$1' }
        ];
        const result = applyOcrNormalizationRules('01/20/2025', rules);
        expect(result).toBe('2025-20-01');
    });

    test('handles empty rules array', () => {
        const result = applyOcrNormalizationRules('CHF 22.00', []);
        expect(result).toBe('CHF 22.00');
    });

    test('handles null rules', () => {
        const result = applyOcrNormalizationRules('CHF 22.00', null);
        expect(result).toBe('CHF 22.00');
    });

    test('handles global replacement', () => {
        const rules = [
            { pattern: '\\s+', replacement: ' ' }
        ];
        const result = applyOcrNormalizationRules('a    b   c', rules);
        expect(result).toBe('a b c');
    });

    test('warns on invalid rule', () => {
        const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
        const rules = [{ pattern: 'test' }]; // Missing replacement
        applyOcrNormalizationRules('test', rules);
        expect(consoleSpy).toHaveBeenCalled();
        consoleSpy.mockRestore();
    });

    test('handles invalid regex', () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
        const rules = [
            { pattern: '(invalid', replacement: 'x' } // Unclosed group
        ];
        const result = applyOcrNormalizationRules('test', rules);
        expect(result).toBe('test'); // Unchanged due to error
        expect(consoleSpy).toHaveBeenCalled();
        consoleSpy.mockRestore();
    });
});

describe('applyDocumentSpecificNormalization', () => {
    test('applies both character and OCR normalization', () => {
        const metadata = {
            charNormalization: 'é→e',
            ocrNormalizationRules: [
                { pattern: 'CHF\\s+(\\d)', replacement: 'CHF$1' }
            ]
        };
        const result = applyDocumentSpecificNormalization('Café CHF 22.00', metadata);
        expect(result).toBe('Cafe CHF22.00');
    });

    test('applies character normalization only', () => {
        const metadata = {
            charNormalization: 'é→e'
        };
        const result = applyDocumentSpecificNormalization('Café', metadata);
        expect(result).toBe('Cafe');
    });

    test('applies OCR normalization only', () => {
        const metadata = {
            ocrNormalizationRules: [
                { pattern: 'CHF\\s+(\\d)', replacement: 'CHF$1' }
            ]
        };
        const result = applyDocumentSpecificNormalization('CHF 22.00', metadata);
        expect(result).toBe('CHF22.00');
    });

    test('handles empty metadata', () => {
        const result = applyDocumentSpecificNormalization('test', {});
        expect(result).toBe('test');
    });

    test('handles null metadata', () => {
        const result = applyDocumentSpecificNormalization('test', null);
        expect(result).toBe('test');
    });

    test('applies in correct order: char normalization then OCR rules', () => {
        const metadata = {
            charNormalization: 'é→e',
            ocrNormalizationRules: [
                { pattern: 'cafe', replacement: 'coffee' }
            ]
        };
        const result = applyDocumentSpecificNormalization('café', metadata);
        // é→e first: café → cafe
        // then regex: cafe → coffee
        expect(result).toBe('coffee');
    });
});

describe('Integration with normalizeText', () => {
    const { normalizeText } = require('../public/normalize.js');

    test('normalizeText applies document-specific rules before standard normalization', () => {
        const metadata = {
            charNormalization: 'é→e',
            ocrNormalizationRules: [
                { pattern: 'CHF\\s+(\\d)', replacement: 'CHF$1' }
            ]
        };
        const result = normalizeText('Café CHF 22.00', metadata);
        expect(result).toBe('Cafe CHF22.00');
    });

    test('normalizeText works without metadata', () => {
        const result = normalizeText('  Test  \nLine 2  ');
        expect(result).toBe('Test\nLine 2');
    });

    test('user-typed text with special chars gets normalized', () => {
        // User types ß in textarea to fix OCR error
        const metadata = {
            charNormalization: 'ß→B'
        };
        const result = normalizeText('Straße', metadata);
        expect(result).toBe('StraBe');
    });

    test('hotel receipt example with CHF spacing', () => {
        const metadata = {
            charNormalization: 'éèêë→e',
            ocrNormalizationRules: [
                { pattern: 'CHF\\s+(\\d)', replacement: 'CHF$1' }
            ]
        };
        const input = `Hotel Schéidegg
CHF 22.00
Chéasspatzli CHF 18.50`;
        const result = normalizeText(input, metadata);
        expect(result).toContain('Scheidegg');
        expect(result).toContain('CHF22.00');
        expect(result).toContain('CHF18.50');
        expect(result).toContain('Cheasspatzli');
    });
});

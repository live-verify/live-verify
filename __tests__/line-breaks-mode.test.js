/*
    Copyright (C) 2026, Paul Hammant

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

// The lineBreaks regime from verification-meta.json: "faithful" (default —
// every line break load-bearing) vs "flow" (single newline = soft break,
// blank line = paragraph separator). See docs/flow-proposal.md and
// docs/SPEC.md §4 step 6. The conformance corpus pins the hash of one flow
// vector; these tests pin the semantic properties around it.

const { normalizeText } = require('../public/normalize.js');

const PROSE =
    'This is a paragraph that has been\n' +
    'soft-wrapped across three lines by a\n' +
    'narrow viewport.\n' +
    '\n' +
    'Second paragraph, one line.';

describe('lineBreaks: flow', () => {
    test('single newlines collapse to spaces; blank line separates paragraphs', () => {
        expect(normalizeText(PROSE, { lineBreaks: 'flow' })).toBe(
            'This is a paragraph that has been soft-wrapped across three lines by a narrow viewport.\n' +
            'Second paragraph, one line.'
        );
    });

    test('wrap-invariance: the same words re-wrapped at a different width hash-equal', () => {
        const rewrapped =
            'This is a paragraph\n' +
            'that has been soft-wrapped across\n' +
            'three lines by a narrow viewport.\n' +
            '\n' +
            'Second paragraph, one line.';
        expect(normalizeText(rewrapped, { lineBreaks: 'flow' }))
            .toBe(normalizeText(PROSE, { lineBreaks: 'flow' }));
    });

    test('unwrapped input is already canonical (idempotent with wrapped forms)', () => {
        const unwrapped =
            'This is a paragraph that has been soft-wrapped across three lines by a narrow viewport.\n' +
            '\n' +
            'Second paragraph, one line.';
        expect(normalizeText(unwrapped, { lineBreaks: 'flow' }))
            .toBe(normalizeText(PROSE, { lineBreaks: 'flow' }));
    });

    test('runs of blank lines collapse to one paragraph separator; leading/trailing blanks produce no empty paragraphs', () => {
        const gappy = '\n\nFirst para.\n\n\n\nSecond\npara.\n\n\n';
        expect(normalizeText(gappy, { lineBreaks: 'flow' })).toBe('First para.\nSecond para.');
    });

    test('whitespace-only lines count as blank (paragraph separators)', () => {
        const input = 'One\ntwo.\n   \t \nThree.';
        expect(normalizeText(input, { lineBreaks: 'flow' })).toBe('One two.\nThree.');
    });

    test('flow and faithful genuinely diverge on wrapped prose (discriminating)', () => {
        expect(normalizeText(PROSE, { lineBreaks: 'flow' }))
            .not.toBe(normalizeText(PROSE, { lineBreaks: 'faithful' }));
    });
});

describe('lineBreaks: faithful and default', () => {
    test('absent metadata defaults to faithful — byte-identical to explicit faithful', () => {
        expect(normalizeText(PROSE)).toBe(normalizeText(PROSE, { lineBreaks: 'faithful' }));
        expect(normalizeText(PROSE, {})).toBe(normalizeText(PROSE, { lineBreaks: 'faithful' }));
    });

    test('faithful preserves every line break and drops blank lines (pre-existing behaviour)', () => {
        expect(normalizeText(PROSE, { lineBreaks: 'faithful' })).toBe(
            'This is a paragraph that has been\n' +
            'soft-wrapped across three lines by a\n' +
            'narrow viewport.\n' +
            'Second paragraph, one line.'
        );
    });
});

describe('lineBreaks: unrecognised values fail loudly', () => {
    test.each(['mixed', 'Flow', 'FAITHFUL', 'prose', ''])(
        'value %j throws rather than silently defaulting',
        (value) => {
            // '' is falsy so it falls back to the faithful default — the one
            // deliberate exception, matching an absent field.
            if (value === '') {
                expect(() => normalizeText(PROSE, { lineBreaks: value })).not.toThrow();
                return;
            }
            expect(() => normalizeText(PROSE, { lineBreaks: value }))
                .toThrow(/Unrecognised lineBreaks mode/);
        }
    );
});

describe('flow interacts correctly with earlier pipeline steps', () => {
    test('issuer charNormalization folds apply before flow joining', () => {
        const input = 'Café régime\nwrapped line.\n\nNext.';
        expect(normalizeText(input, { lineBreaks: 'flow', charNormalization: 'éè→e' }))
            .toBe('Cafe regime wrapped line.\nNext.');
    });

    test('punctuation folds (NBSP, curly quotes) apply before flow joining', () => {
        const input = '“Quoted” text\nwraps here.';
        expect(normalizeText(input, { lineBreaks: 'flow' })).toBe('"Quoted" text wraps here.');
    });
});

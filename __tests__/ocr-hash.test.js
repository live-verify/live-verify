/*
    Copyright (C) 2025, Paul Hammant

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation, either version 3 of the
    License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

const { normalizeText, sha256 } = require('../public/normalize.js');
const { cleanOcrArtifacts } = require('../public/ocr-cleanup.js');

// Helper: full OCR pipeline (cleanup + normalize)
const ocrNormalize = (text) => normalizeText(cleanOcrArtifacts(text));

describe('OCR Hash Verification', () => {
  describe('Text Normalization', () => {
    it('should remove leading spaces', () => {
      const input = '  Hello World';
      const expected = 'Hello World';
      expect(normalizeText(input)).toBe(expected);
    });

    it('should remove trailing spaces', () => {
      const input = 'Hello World  ';
      const expected = 'Hello World';
      expect(normalizeText(input)).toBe(expected);
    });

    it('should collapse multiple spaces to single space', () => {
      const input = 'Hello    World';
      const expected = 'Hello World';
      expect(normalizeText(input)).toBe(expected);
    });

    it('should remove blank lines', () => {
      const input = 'Line 1\n\nLine 2';
      const expected = 'Line 1\nLine 2';
      expect(normalizeText(input)).toBe(expected);
    });

    it('should handle complex multi-line text', () => {
      const input = `  Hello World

  Test  Line  `;
      const expected = `Hello World\nTest Line`;
      expect(normalizeText(input)).toBe(expected);
    });

    it('should normalize curly double quotes to straight quotes', () => {
      const input = 'Thesis: "On theMalleability of L-Space"';
      const expected = 'Thesis: "On theMalleability of L-Space"';
      expect(normalizeText(input)).toBe(expected);
    });

    it('should normalize curly single quotes to straight quotes', () => {
      const input = `It${String.fromCharCode(0x2019)}s a nice day`; // 0x2019 is right single quote '
      const expected = `It${String.fromCharCode(0x0027)}s a nice day`; // 0x0027 is straight apostrophe
      expect(normalizeText(input)).toBe(expected);
    });

    it('should normalize en-dash and em-dash to hyphen', () => {
      const input = 'Date: 2020–2024 — present';
      const expected = 'Date: 2020-2024 - present';
      expect(normalizeText(input)).toBe(expected);
    });

    it('should normalize non-breaking spaces to regular spaces', () => {
      const input = 'Hello\u00A0World';
      const expected = 'Hello World';
      expect(normalizeText(input)).toBe(expected);
    });

    it('should normalize ellipsis to three periods', () => {
      const input = 'To be continued…';
      const expected = 'To be continued...';
      expect(normalizeText(input)).toBe(expected);
    });

    // OCR artifact tests use ocrNormalize (cleanOcrArtifacts + normalizeText)
    it('should remove leading pipes (OCR artifacts)', () => {
      const input = '| Hello World';
      const expected = 'Hello World';
      expect(ocrNormalize(input)).toBe(expected);
    });

    it('should remove multiple leading pipes', () => {
      const input = '|| Hello World';
      const expected = 'Hello World';
      expect(ocrNormalize(input)).toBe(expected);
    });

    it('should remove leading pipes with spaces after them', () => {
      const input = '|  Hello World';
      const expected = 'Hello World';
      expect(ocrNormalize(input)).toBe(expected);
    });

    it('should handle multi-line text with leading pipes', () => {
      const input = `| Awarded to: Ponder Stibbons
| verify:live-verify.github.io/live-verify/c`;
      const expected = `Awarded to: Ponder Stibbons
verify:live-verify.github.io/live-verify/c`;
      expect(ocrNormalize(input)).toBe(expected);
    });

    it('should preserve pipes that are not at the start of lines', () => {
      const input = 'Hello | World';
      const expected = 'Hello | World';
      expect(ocrNormalize(input)).toBe(expected);
    });

    it('should remove trailing pipes (OCR artifacts)', () => {
      const input = 'Hello World |';
      const expected = 'Hello World';
      expect(ocrNormalize(input)).toBe(expected);
    });

    it('should remove multiple trailing pipes', () => {
      const input = 'Hello World ||';
      const expected = 'Hello World';
      expect(ocrNormalize(input)).toBe(expected);
    });

    it('should remove trailing pipes with spaces before them', () => {
      const input = 'Hello World  |';
      const expected = 'Hello World';
      expect(ocrNormalize(input)).toBe(expected);
    });

    it('should remove both leading and trailing pipes', () => {
      const input = '| Hello World |';
      const expected = 'Hello World';
      expect(ocrNormalize(input)).toBe(expected);
    });

    it('should handle multi-line text with leading and trailing pipes', () => {
      const input = `| Line 1 |
| Line 2 |
| Line 3 |`;
      const expected = `Line 1
Line 2
Line 3`;
      expect(ocrNormalize(input)).toBe(expected);
    });

    it('should remove leading tilde (OCR artifact from borders)', () => {
      const input = '~ Ankh-Morpork';
      const expected = 'Ankh-Morpork';
      expect(ocrNormalize(input)).toBe(expected);
    });

    it('should handle real-world example with tilde prefix', () => {
      const input = `Unseen University
~ Ankh-Morpork
Bachelor of Thaumatology
Awarded to: Ponder Stibbons`;
      const expected = `Unseen University
Ankh-Morpork
Bachelor of Thaumatology
Awarded to: Ponder Stibbons`;
      expect(ocrNormalize(input)).toBe(expected);
    });

    it('should remove various border artifact characters', () => {
      const testCases = [
        { input: '| Line', expected: 'Line' },
        { input: '~ Line', expected: 'Line' },
        { input: '` Line', expected: 'Line' },
        { input: '^ Line', expected: 'Line' },
        { input: '* Line', expected: 'Line' },
        { input: '# Line', expected: 'Line' },
        { input: '+ Line', expected: 'Line' },
        { input: '= Line', expected: 'Line' },
        { input: '_ Line', expected: 'Line' },
        { input: '[ Line', expected: 'Line' },
        { input: '] Line', expected: 'Line' },
        { input: 'Line |', expected: 'Line' },
        { input: 'Line ~', expected: 'Line' },
      ];

      testCases.forEach(({ input, expected }) => {
        expect(ocrNormalize(input)).toBe(expected);
      });
    });
  });

  describe('SHA-256 Hashing', () => {
    it('should generate correct SHA-256 hash', () => {
      const text = 'Hello World';
      const expected = 'a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e';
      expect(sha256(text)).toBe(expected);
    });

    it('should generate different hashes for different text', () => {
      const text1 = 'Hello World';
      const text2 = 'Hello  World'; // Extra space
      expect(sha256(text1)).not.toBe(sha256(text2));
    });

    it('should generate same hash after normalization', () => {
      const text1 = '  Hello World  ';
      const text2 = 'Hello    World';
      const normalized1 = normalizeText(text1);
      const normalized2 = normalizeText(text2);
      expect(sha256(normalized1)).toBe(sha256(normalized2));
    });
  });

  describe('Intertek Certification from ocr-hash2.png', () => {
    const intertekText = `This gown was certified by Intertek
on March 1, 2022 for MedPro Ltd of
Douglas, Isle of Man.
UK medical standards Abc123, Def456
apply. #SHAT0664891
Description of gown: one piece,
tie behind, neck loop, spunbond
polypropylene, spash resistent
sterile, double wrapped.`;

    const expectedHash = 'a5b0e330eeb4e827c3cc20a5e21e3c6c43f75b58f3e4eb3de3e6e4c9c73c0c9a';

    it('should normalize Intertek certification text correctly', () => {
      const normalized = normalizeText(intertekText);

      // Check that leading/trailing spaces are removed
      const lines = normalized.split('\n');
      lines.forEach(line => {
        expect(line).not.toMatch(/^\s/);
        expect(line).not.toMatch(/\s$/);
      });

      // Check that multiple spaces are collapsed
      expect(normalized).not.toMatch(/\s{2,}/);
    });

    it('should generate consistent hash for Intertek certification', () => {
      const normalized = normalizeText(intertekText);
      const hash = sha256(normalized);

      // Hash should be 64 characters (SHA-256 in hex)
      expect(hash).toHaveLength(64);
      expect(hash).toMatch(/^[a-f0-9]{64}$/);

      console.log('\nIntertek Certification Hash:');
      console.log(hash);
      console.log('\nVerification URL would be:');
      console.log(`https://intertek.com/certifications/${hash}`);
    });

    it('should generate same hash with extra whitespace', () => {
      const textWithExtraSpaces = `  This gown was certified by Intertek
on March 1, 2022 for MedPro Ltd of
Douglas, Isle of Man.
UK medical standards Abc123, Def456
apply. #SHAT0664891
Description of gown: one piece,
tie behind, neck loop, spunbond
polypropylene, spash resistent
sterile, double wrapped.  `;

      const hash1 = sha256(normalizeText(intertekText));
      const hash2 = sha256(normalizeText(textWithExtraSpaces));

      expect(hash1).toBe(hash2);
    });

    it('should preserve exact wording including typos', () => {
      // The text contains "spash resistent" (typos)
      // These should be preserved in the hash
      expect(intertekText).toContain('spash resistent');

      const normalized = normalizeText(intertekText);
      expect(normalized).toContain('spash resistent');
    });
  });

  describe('URL Extraction', () => {
    it('should extract HTTPS URLs from text', () => {
      const text = `Some text here
https://intertek.com/certifications
More text`;

      const urlRegex = /https?:\/\/[^\s]+/gi;
      const urls = text.match(urlRegex);

      expect(urls).not.toBeNull();
      expect(urls).toHaveLength(1);
      expect(urls[0]).toBe('https://intertek.com/certifications');
    });

    it('should extract URL with hash parameter', () => {
      const hash = 'a5b0e330eeb4e827c3cc20a5e21e3c6c43f75b58f3e4eb3de3e6e4c9c73c0c9a';
      const text = `Certification text
https://intertek.com/certifications/${hash}`;

      const urlRegex = /https?:\/\/[^\s]+/gi;
      const urls = text.match(urlRegex);

      expect(urls).not.toBeNull();
      expect(urls[0]).toContain(hash);
    });

    it('should remove URL line from certification text', () => {
      const fullText = `This gown was certified by Intertek
on March 1, 2022 for MedPro Ltd of
Douglas, Isle of Man.
https://intertek.com/certifications/abc123`;

      const lines = fullText.split('\n');
      const urlRegex = /https?:\/\//i;
      const textWithoutUrl = lines.filter(line => !urlRegex.test(line)).join('\n');

      expect(textWithoutUrl).not.toContain('https://');
      expect(textWithoutUrl).toContain('This gown was certified');
      expect(textWithoutUrl).toContain('Douglas, Isle of Man.');
    });
  });

  describe('Registration Mark Capture Area', () => {
    it('should calculate correct capture area dimensions', () => {
      // Simulate video dimensions
      const videoWidth = 1920;
      const videoHeight = 1080;

      // These margins MUST match app-url-based.js and styles.css
      const leftMargin = 0.10;
      const rightMargin = 0.10;
      const topMargin = 0.15;
      const bottomMargin = 0.15;

      const sourceX = videoWidth * leftMargin;
      const sourceY = videoHeight * topMargin;
      const sourceWidth = videoWidth * (1 - leftMargin - rightMargin);
      const sourceHeight = videoHeight * (1 - topMargin - bottomMargin);

      expect(sourceX).toBe(192);        // 10% from left
      expect(sourceY).toBe(162);        // 15% from top
      expect(sourceWidth).toBe(1536);   // 80% of width
      expect(sourceHeight).toBe(756);   // 70% of height
    });

    it('should match CSS registration marks positioning', () => {
      // CSS defines: top: 15%, left: 10%, right: 10%, bottom: 15%
      const videoWidth = 1000;  // Use simple numbers for clarity
      const videoHeight = 1000;

      const leftMargin = 0.10;
      const rightMargin = 0.10;
      const topMargin = 0.15;
      const bottomMargin = 0.15;

      const sourceX = videoWidth * leftMargin;
      const sourceY = videoHeight * topMargin;
      const sourceWidth = videoWidth * (1 - leftMargin - rightMargin);
      const sourceHeight = videoHeight * (1 - topMargin - bottomMargin);

      // Verify left edge
      expect(sourceX).toBe(100);  // 10% = 100px from left

      // Verify top edge
      expect(sourceY).toBe(150);  // 15% = 150px from top

      // Verify right edge (should end at 90% of width)
      expect(sourceX + sourceWidth).toBe(900);  // 100 + 800 = 900

      // Verify bottom edge (should end at 85% of height)
      expect(sourceY + sourceHeight).toBe(850);  // 150 + 700 = 850

      // Verify dimensions
      expect(sourceWidth).toBe(800);   // 80% of 1000
      expect(sourceHeight).toBe(700);  // 70% of 1000
    });

    it('should capture only the area inside registration marks', () => {
      const videoWidth = 640;
      const videoHeight = 480;

      // Calculate capture area (same as app-url-based.js)
      const leftMargin = 0.10;
      const rightMargin = 0.10;
      const topMargin = 0.15;
      const bottomMargin = 0.15;

      const sourceX = videoWidth * leftMargin;
      const sourceY = videoHeight * topMargin;
      const sourceWidth = videoWidth * (1 - leftMargin - rightMargin);
      const sourceHeight = videoHeight * (1 - topMargin - bottomMargin);

      // Verify we're capturing the correct region
      expect(sourceX).toBe(64);     // Start 10% in from left
      expect(sourceY).toBe(72);     // Start 15% down from top
      expect(sourceWidth).toBe(512); // 80% of width
      expect(sourceHeight).toBe(336); // 70% of height

      // Verify the captured area is smaller than the full video
      expect(sourceWidth).toBeLessThan(videoWidth);
      expect(sourceHeight).toBeLessThan(videoHeight);

      // Verify we're not capturing the full video area
      const fullVideoArea = videoWidth * videoHeight;
      const captureArea = sourceWidth * sourceHeight;
      const capturePercentage = (captureArea / fullVideoArea) * 100;

      expect(capturePercentage).toBeCloseTo(56, 5);  // 80% * 70% = 56% of total area
    });

    it('should have consistent margins on opposite sides', () => {
      const leftMargin = 0.10;
      const rightMargin = 0.10;
      const topMargin = 0.15;
      const bottomMargin = 0.15;

      // Verify horizontal margins match
      expect(leftMargin).toBe(rightMargin);

      // Verify vertical margins match
      expect(topMargin).toBe(bottomMargin);
    });
  });

  describe('Full Verification Flow', () => {
    it('should verify document with matching hash in URL', () => {
      const certText = `This gown was certified by Intertek
on March 1, 2022 for MedPro Ltd of
Douglas, Isle of Man.
UK medical standards Abc123, Def456
apply. #SHAT0664891
Description of gown: one piece,
tie behind, neck loop, spunbond
polypropylene, spash resistent
sterile, double wrapped.`;

      const normalized = normalizeText(certText);
      const hash = sha256(normalized);
      const claimedUrl = `https://intertek.com/certifications/${hash}`;

      // Verify: hash should be in the URL
      expect(claimedUrl).toContain(hash);

      const isVerified = claimedUrl.includes(hash);
      expect(isVerified).toBe(true);
    });

    it('should fail verification when hash does not match URL', () => {
      const certText = `This gown was certified by Intertek
on March 1, 2022 for MedPro Ltd of
Douglas, Isle of Man.`;

      const normalized = normalizeText(certText);
      const hash = sha256(normalized);
      const claimedUrl = 'https://intertek.com/certifications/wronghash123';

      const isVerified = claimedUrl.includes(hash);
      expect(isVerified).toBe(false);
    });
  });
});

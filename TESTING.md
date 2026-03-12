# Testing Guide

## Test Directory Structure

This project uses the standard Jest + Playwright test organization pattern:

```
__tests__/              # Jest unit tests (*.test.js)
├── app-logic.test.js
├── doc-specific-normalization.test.js
├── domain-authority.test.js
├── normalize-trailing-artifacts.test.js
├── ocr-hash.test.js
└── ui-state-machine.test.js

e2e/                    # Playwright E2E tests (*.spec.ts)
├── psl.spec.ts
├── state-transitions.spec.ts
└── ...

test/fixtures/          # Shared test fixtures
├── should-detect/      # Images with registration marks
├── should-not-detect/  # Images without marks
└── screenshots/        # Training page screenshots (committed)

test-results/           # Playwright output (gitignored)
```

This structure is idiomatic and recommended by both Jest and Playwright documentation.

## Running Tests

```bash
npm test              # All tests (unit + E2E)
npm run test:unit     # Jest only (fast)
npm run test:e2e      # Playwright only (slow, includes OCR)
```

### Screenshot Verification Tests (E2E)

The E2E test suite includes automated screenshot verification tests that exercise the entire pipeline from image → detection → OCR → normalization → hash → verification.

**Prerequisites:**
- ImageMagick installed (`sudo apt install imagemagick`)
- Screenshots generated from training pages

**Generate screenshots:**
```bash
cd public/training-pages
chmod +x screenshot-training-pages.sh
./screenshot-training-pages.sh
```

This creates trimmed screenshots in `test/fixtures/screenshots/` that are used by Playwright tests.

**Run screenshot verification tests:**
```bash
# Start server in one terminal:
cd public && python3 -m http.server 8000

# Run tests in another terminal:
npm run test:e2e -- screenshot-verification
```

**Note:** Screenshot fixtures are already committed in `test/fixtures/screenshots/`. You only need to regenerate them if you modify training pages.

**What it tests:**
- Registration mark detection on real rendered pages
- Multi-orientation OCR (0°, 90°, 180°, 270°)
- Text normalization accuracy
- Hash computation matches expected values
- Verification status (200/OK or REVOKED/NOT_OK)

**Test cases:**
1. Bachelor of Thaumatology (2 formats)
2. Master of Applied Anthropics
3. Doctorate in High Energy Magic
4. Medical License (REVOKED) - tests failure case
5. Driving License (SVG-based)
6. Hotel Receipt

**Design for Testability:**

The app exposes test seams via `window.liveVerifyApp.processImageCanvas()` that allows E2E tests to inject images directly into the verification pipeline without requiring camera access. See `e2e/test-helpers.js` for usage.

**Fixtures:**
- PNG fixtures and matching .txt files under `test/fixtures/` are checked in
- Fixture naming conventions:
  - `should-detect/` - Images with clear registration marks
  - `should-not-detect/` - Images without registration marks
  - `screenshots/` - Training page screenshots (committed)
- .txt files must contain normalized text only:
  - Per line: trim leading/trailing whitespace and collapse internal spaces to one
  - Preserve line breaks
- Contributions welcome via PRs; no generator is required

## Test Coverage

The test suite (`ocr-hash.test.js`) validates:

### 1. Text Normalization
- Removes leading spaces
- Removes trailing spaces
- Collapses multiple spaces to single space
- Preserves blank lines

### 2. SHA-256 Hashing
- Generates correct hashes
- Different text produces different hashes
- Normalized text produces consistent hashes

### 3. Intertek Certification Test Case

**Original Text:**
```
This gown was certified by Intertek
on March 1, 2022 for MedPro Ltd of
Douglas, Isle of Man.
UK medical standards Abc123, Def456
apply. #SHAT0664891
Description of gown: one piece,
tie behind, neck loop, spunbond
polypropylene, spash resistent
sterile, double wrapped.
```

**Generated Hash:**
```
483a2710e7b533836a06ed2d34a646bca05e0761cd59e482db9296395313a44f
```

**Verification URL:**
```
https://intertek.com/certifications/483a2710e7b533836a06ed2d34a646bca05e0761cd59e482db9296395313a44f
```

### 4. URL Extraction
- Extracts HTTPS/HTTP URLs from OCR text
- Removes URL lines from certification text
- Preserves certification content

### 5. Full Verification Flow
- Verifies documents when hash matches URL
- Fails verification when hash doesn't match URL

## Manual Testing with Physical Documents

### Test Document 1: Intertek Certification

Print this document and test with the app:

```
┌──────────────────────────────────────────────┐
│ This gown was certified by Intertek          │
│ on March 1, 2022 for MedPro Ltd of           │
│ Douglas, Isle of Man.                        │
│ UK medical standards Abc123, Def456          │
│ apply. #SHAT0664891                          │
│ Description of gown: one piece,              │
│ tie behind, neck loop, spunbond              │
│ polypropylene, spash resistent               │
│ sterile, double wrapped.                     │
│                                               │
│ https://intertek.com/certifications/483a2... │
└──────────────────────────────────────────────┘
```

Expected result: ✅ Green "VERIFIED" overlay

### Test Document 2: Invalid Hash

Print this with a wrong hash:

```
┌──────────────────────────────────────────────┐
│ This gown was certified by Intertek          │
│ on March 1, 2022 for MedPro Ltd of           │
│ Douglas, Isle of Man.                        │
│ UK medical standards Abc123, Def456          │
│ apply. #SHAT0664891                          │
│ Description of gown: one piece,              │
│ tie behind, neck loop, spunbond              │
│ polypropylene, spash resistent               │
│ sterile, double wrapped.                     │
│                                               │
│ https://intertek.com/certifications/wronghash│
└──────────────────────────────────────────────┘
```

Expected result: ❌ Red "FAILS VERIFICATION" overlay

## Edge Cases Tested

- **Typos preserved**: "spash resistent" (not "splash resistant")
- **Special characters**: #SHAT0664891 preserved
- **Whitespace variations**: Leading/trailing spaces normalized
- **Multiple spaces**: Collapsed to single space
- **Blank lines**: Preserved in normalized text

## Continuous Integration

Tests run automatically on GitHub Actions when you push to main/master:

1. Install dependencies
2. Run Jest tests
3. If tests pass, deploy to GitHub Pages

See `.github/workflows/deploy.yml` for CI/CD configuration.

## Adding New Tests

To test a new certification:

1. Add the exact text to `ocr-hash.test.js`
2. Run `npm test` to see the generated hash
3. Print the document with that hash in the URL
4. Test with the camera app

Example:
```javascript
it('should verify new certification', () => {
  const text = `Your certification text here`;
  const normalized = normalizeText(text);
  const hash = sha256(normalized);

  console.log('Hash:', hash);
  console.log('URL:', `https://your-org.com/verify/${hash}`);

  expect(hash).toHaveLength(64);
});
```

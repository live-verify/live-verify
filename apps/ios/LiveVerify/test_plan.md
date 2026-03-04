# LiveVerify iOS Test Plan

## Running Tests

```bash
xcodebuild test -scheme LiveVerify \
  -destination "platform=iOS Simulator,OS=18.5,name=16)pro)ios18p5" \
  -derivedDataPath ./DerivedDataLocal \
  -quiet
```

To run only unit tests (skip UI tests):
```bash
xcodebuild test -scheme LiveVerify \
  -destination "platform=iOS Simulator,OS=18.5,name=16)pro)ios18p5" \
  -derivedDataPath ./DerivedDataLocal \
  -only-testing:LiveVerifyTests \
  -quiet
```

---

## Current Test Coverage

### SHA256HasherTests (5 tests)
- [x] Empty string hash
- [x] Simple string hash
- [x] Unicode string hash
- [x] Multiline string hash
- [x] Hash consistency

### JSBridgeTests (14 tests)
- [x] Extract verify: URL
- [x] Extract vfy: URL
- [x] No URL returns nil
- [x] Extract cert text (lines before URL)
- [x] Build verification URL (verify: prefix)
- [x] Build verification URL (vfy: prefix)
- [x] Build verification URL with suffix (appendToHashFileName)
- [x] Build verification URL without suffix in meta
- [x] Space tolerance: "verify: domain"
- [x] Space tolerance: "verify :domain"
- [x] Space tolerance: "verify : domain"
- [x] Normalize text (collapse spaces)
- [x] Normalize text (unicode quotes)

### VisionFixtureTests (1 test)
- [x] Full image OCR reads verify URL

### StringJSEscapedTests (4 tests)
- [x] Basic string escaping
- [x] Quotes escaping
- [x] Newlines escaping
- [x] Backslash escaping

### VerificationClientTests (13 tests)
Uses MockURLProtocol to mock URLSession responses.

#### fetchVerificationMeta (5 tests)
- [x] Returns parsed JSON on HTTP 200
- [x] Returns nil on HTTP 404
- [x] Returns nil on HTTP 500
- [x] Returns nil on network error
- [x] Returns nil on invalid JSON

#### verify (8 tests)
- [x] HTTP 200 + "OK" body → affirming
- [x] HTTP 200 + `{"status": "VERIFIED"}` → affirming
- [x] HTTP 200 + `{"status": "REVOKED"}` → denying
- [x] HTTP 404 → denying "Hash not found"
- [x] HTTP 500 → denying
- [x] Network error → networkError outcome
- [x] Custom responseTypes from meta (affirming class)
- [x] Custom responseTypes from meta (denying class)

---

## Proposed New Tests

### VerificationPipeline Integration Tests (Priority: Medium)

Test the full pipeline with text input (no camera/image needed).

```swift
final class VerificationPipelineTests: XCTestCase {
    // Test verifyText() with sample inputs
}
```

- [ ] Valid text with verify: URL → computes correct hash
- [ ] Text without verify: URL → noVerifyURL outcome
- [ ] Text with vfy: URL → works same as verify:
- [ ] Re-verify with edited text produces different hash
- [ ] Cert text extraction excludes verify: line
- [ ] Multiline cert text preserves line breaks in hash

### DataScanner Text Processing Tests (Priority: Medium)

Test the space-stripping and line-ordering logic.

- [ ] Strips spaces from verify: URL line
- [ ] Preserves spaces in non-verify lines
- [ ] Lines sorted correctly (X-based for landscape)
- [ ] Handles "verify :" with space before colon

### Edge Cases (Priority: Low)

- [ ] Unicode characters in cert text
- [ ] Very long cert text
- [ ] Empty cert text (only verify: line)
- [ ] Multiple verify: lines (behavior TBD)
- [ ] Verify URL with path components
- [ ] Verify URL with special characters

---

## Test Fixtures

- `LiveVerifyTests/kevinAtHedgeServ.png` - Photo of document with verify:paulhammant.com/refs

---

## Notes

- UI tests require camera which doesn't work well in simulator
- VisionFixtureTests require the fixture image file to be present
- JSBridge tests require JS files to be in the test bundle

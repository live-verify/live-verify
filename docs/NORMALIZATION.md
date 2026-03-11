# Text Normalization Rules

Before computing the SHA-256 hash of certification text, the following normalization steps are applied **in this order**:

## 1. Document-Specific Normalization (Optional)

If a `verification-meta.json` file exists at the verification URL path, it may define additional normalization rules specific to that document type. These rules are applied **before** the standard normalization steps below.

### Schema

```json
{
  "charNormalization": "éèêë→e àáâä→a ìíîï→i òóôö→o ùúûü→u ñ→n ç→c ß→B",
  "ocrNormalizationRules": [
    {
      "pattern": "CHF\\s+(\\d)",
      "replacement": "CHF$1",
      "description": "Remove space between currency and amount"
    }
  ]
}
```

### Character Normalization

**Compact notation for single-character mappings:**
- Format: `sourceChars→targetChar` (space-separated groups)
- Example: `éèêë→e` means: é→e, è→e, ê→e, ë→e
- **Use cases:**
  - Diacritic removal: `é→e`, `ñ→n`, `ç→c`
  - Known OCR misreads: `ß→B` (if OCR consistently misreads ß as B)
- **NOT for:**
  - Multi-character expansions: `ö→oe` (language-specific, not universal)
  - Numeral replacements: `0→O`, `1→l` (numerals must remain as-is)

### OCR Normalization Rules

**Regex-based rules for structural/formatting cleanup:**
- Applied after character normalization
- Supports backreferences: `$1`, `$2`, etc.
- **Use cases:**
  - Whitespace from HTML rendering: `CHF\s+(\d)` → `CHF$1`
  - Date formatting artifacts: `(\d+)\s+/\s+(\d+)` → `$1/$2`
- **NOT for:**
  - Word-specific replacements
  - Proper nouns or domain vocabulary

### Fetching Rules

When OCR extracts `vfy:rcpts.domain.com/hotel/abc123`:
1. Client converts to: `https://rcpts.domain.com/hotel/verification-meta.json`
2. Fetches metadata file (if it exists)
3. Applies `charNormalization` rules first
4. Applies `ocrNormalizationRules` second
5. Proceeds to standard normalization steps below

If `verification-meta.json` is not found or fetch fails, standard normalization is used without document-specific rules.

## 2. Unicode Character Normalization

OCR often produces Unicode variants of standard ASCII characters. These are normalized first:

### Quotation Marks
- **Left double quote** (`"` U+201C) → `"` (straight double quote, U+0022)
- **Right double quote** (`"` U+201D) → `"` (straight double quote, U+0022)
- **Double low-9 quote** (`„` U+201E) → `"` (straight double quote, U+0022)
- **Left single quote** (`'` U+2018) → `'` (straight apostrophe, U+0027)
- **Right single quote** (`'` U+2019) → `'` (straight apostrophe, U+0027)
- **Left angle quote** (`«` U+00AB) → `"` (straight double quote, U+0022)
- **Right angle quote** (`»` U+00BB) → `"` (straight double quote, U+0022)

### Dashes
- **En dash** (`–` U+2013) → `-` (hyphen-minus, U+002D)
- **Em dash** (`—` U+2014) → `-` (hyphen-minus, U+002D)

### Spaces
- **Non-breaking space** (U+00A0) → ` ` (regular space, U+0020)

### Ellipsis
- **Horizontal ellipsis** (`…` U+2026) → `...` (three periods)

## 3. Line-by-Line Normalization

After Unicode character normalization, each line is processed:

1. **Remove leading whitespace** - All spaces and tabs at the start of the line are removed
2. **Remove leading border artifacts** - Leading non-alphanumeric characters (from OCR of registration marks/borders) and any whitespace after them are removed
   - Removed characters: `|` `~` `` ` `` `^` `*` `#` `+` `=` `/` `_` `\` `[` `]` `{` `}`
   - Examples: `"| text"` → `"text"`, `"~ text"` → `"text"`, `"|| text"` → `"text"`
3. **Remove trailing whitespace** - All spaces and tabs at the end of the line are removed
4. **Remove trailing border artifacts** - Trailing non-alphanumeric characters (from OCR of registration marks/borders) and any whitespace before them are removed
   - Same character set as leading artifacts
   - Examples: `"text |"` → `"text"`, `"text ~"` → `"text"`, `"text ||"` → `"text"`
5. **Collapse multiple spaces** - Any sequence of 2+ spaces is replaced with a single space

## 4. Blank Line Removal

After line normalization:

- **Remove all blank lines** - Any line that is empty (length 0) after trimming is removed

## 5. Final Assembly

- Lines are joined with newline characters (`\n` U+000A)
- **No trailing newline** is added to the final text

## Example

### Input (with OCR errors):
```
  Unseen University
~ Ankh-Morpork
| College of High Energy Magic |

| Thesis: "On the Malleability of L–Space" |
```

### After normalization:
```
Unseen University
Ankh-Morpork
College of High Energy Magic
Thesis: "On the Malleability of L-Space"
```

### Changes applied:
1. Curly quotes `"` `"` → straight quotes `"`
2. En dash `–` → hyphen `-`
3. Leading spaces removed from each line
4. Leading border artifacts removed (`~`, `|`)
5. Trailing spaces removed from each line
6. Trailing border artifacts removed (`|`)
7. Blank lines removed
8. No trailing newline

## 6. Verification URL Handling

The last line of the OCR text is treated as the verification base URL. It can use either:

- **`verify:` scheme** (preferred for printed documents): `verify:live-verify.github.io/live-verify/c`
- **`https://` scheme** (legacy support): `https://live-verify.github.io/live-verify/c`

The app converts the base URL to a full HTTPS URL with the hash appended:
```javascript
// If base URL is "verify:example.com/c"
// Result: "https://example.com/c/{hash}"

// If base URL is "https://example.com/c"
// Result: "https://example.com/c/{hash}"
```

The `verify:` scheme is shorter on printed documents and makes it clear the URL is for verification purposes.

## 7. SHA-256 Hash Computation

After normalization, the SHA-256 hash is computed with these parameters:

- **Input Encoding:** UTF-8
- **Output Encoding:** Hex (lowercase)
- **HMAC:** No (plain SHA-256, not HMAC-SHA256)

### Command-line verification example:
```bash
printf 'Normalized text here' | sha256sum
```

### JavaScript implementation:
```javascript
const encoder = new TextEncoder();  // UTF-8 encoding
const data = encoder.encode(normalizedText);
const hashBuffer = await crypto.subtle.digest('SHA-256', data);
const hashArray = Array.from(new Uint8Array(hashBuffer));
const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');  // lowercase hex
```

## Implementation

The code is implemented in:
- **Production** (public/normalize.js) - text normalization and hashing for the live webapp
- **Production** (public/app-logic.js) - pure functions for URL extraction, text processing, canvas rotation, and verify: to https:// conversion
- **Tests** (ocr-hash.test.js) - tests normalize.js (40 tests, including leading/trailing pipe removal)
- **Tests** (app-logic.test.js) - tests app-logic.js (38 tests, including buildVerificationUrl)

All tests validate the production browser code to ensure correctness.

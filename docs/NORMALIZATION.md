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

### The invariant — and the honest limit on it

Live Verify's pitch is that **what you see is what gets hashed**: change the displayed text and the hash changes. Document-specific normalization is the one place that needs a precise caveat, because these rules run on the text *before* hashing and are supplied by the issuer's own `verification-meta.json`.

The exact invariant is therefore: **displayed text == hashed text, *modulo published, meaning-preserving normalization*.** In practice that qualifier is small, and it should stay small:

- **Normalization exists to absorb OCR/rendering *noise*, never to change *meaning*.** `charNormalization` folds a rendering variant onto its canonical form — `é → e`, a curly quote onto a straight one, a thin space onto a regular one — so that a camera reading `café` as `cafe` still verifies. That is its entire legitimate purpose.
- **In clip mode — the primary mode — these rules are almost never needed at all.** Clip mode selects the actual digital text; there is no OCR and therefore no noise to absorb. `é` is already `é`. Document-specific normalization earns its keep essentially only on the **camera/OCR** path. A clip-mode issuer shipping `charNormalization` at all is unusual; shipping accent-folding like `é→e` for clip mode would almost never be done.
- **A rule that changes what a human reads is an attack, not a feature.** `é→e` is meaning-preserving folding. A rule that turned `Wolf` into `wolf`, or `£100` into `£900`, or any displayed claim into a different string, is not normalization — it is precisely the thing the invariant exists to prevent. Legitimate rules are the boring, meaning-preserving, character-folding kind; anything else is a red flag.

**Where the current implementation does not *enforce* this:** `charNormalization` is constrained by the code to single-character → single-character (or → empty) folds, which cannot rewrite meaning. But `ocrNormalizationRules` accepts **arbitrary issuer-supplied regex pattern/replacement pairs**, so a hostile or compromised issuer *could* ship a rule that rewrites the on-screen claim into whatever string it has hashed. So "displayed == hashed" is, for arbitrary `ocrNormalizationRules`, an **intent the protocol does not currently enforce**, not a guaranteed invariant. Two things bound the risk today, and one is roadmap:

- **The rules are hash-committed.** Because an endorser's `authorizedBy` walk commits to the issuer's *entire* `verification-meta.json` (see [verification-meta-schemas.md](verification-meta-schemas.md)), a rewrite rule is part of what the endorser signed — an **endorsed (green-chain)** issuer cannot ship one secretly. The exposure is confined to **self-verified (amber)** issuers, which the app already tells the verifier to judge for themselves.
- **The normalized text is inspectable.** The apps show the exact text about to be hashed (the "Normalized" tab), so a divergence between the displayed claim and what is hashed is *visible* to a human who looks — the same fail-loudly principle used elsewhere.
- **Roadmap:** the honest fix is to make the invariant *enforced* rather than intended — restrict issuer-supplied rules to a closed, client-owned folding table rather than arbitrary regex (which also removes the ReDoS surface noted in [spoofing-countermeasures.md](spoofing-countermeasures.md)). See that doc for the threat write-up.
- **Clients should treat issuer-supplied rules as untrusted input and guard against abnormal metas — with whatever heuristic each client chooses.** The protocol does not (and should not) mandate a specific test; different clients will pick their own. A count cap is one obvious example — a legitimate accent/whitespace-folding meta needs only a handful of rules, so refusing a `verification-meta.json` carrying an unusually large number, and surfacing it as a loud "this issuer's normalization looks abnormal" signal, cheaply catches both meaning-altering and ReDoS metas. Other reasonable guards a client might apply: a per-rule execution timeout, a total-normalization-time budget, rejecting patterns with backreferences or nested quantifiers, or bounding replacement length. Each phone app, extension, or browser-native implementation makes its own call; the point is that none should silently apply arbitrary regex from the party being verified. These bound the blast radius but do not fully enforce meaning-preservation — that waits for the closed-folding-table fix.

## 2. Unicode Character Normalization

### Step 0: Canonical composition (NFC)

Before any other step, `normalizeText()` applies **`String.prototype.normalize('NFC')`**. The same glyph can be encoded two ways — precomposed `é` (U+00E9) or decomposed `e` + combining acute (U+0065 U+0301) — that render identically but are different byte sequences and would otherwise hash differently. Because different OCR engines and text sources emit different forms, the *same* document could hash differently on iOS vs Android without this. NFC folds both to the canonical precomposed form. All clients (web, iOS, Android) run this same canonical `normalize.js` via a JS bridge, so NFC is applied identically everywhere. (NFC does not resolve every ambiguity — Turkish İ/I, German ß/ss, and fullwidth/halfwidth forms remain; see [weaknesses_audit.md](weaknesses_audit.md).)

### Ad-hoc ASCII folds

OCR often produces Unicode variants of standard ASCII characters. These are normalized next:

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

After line normalization, behaviour depends on the issuer's declared line-break regime
(`lineBreaks` in `verification-meta.json`; default `faithful` — see
[flow-proposal.md](flow-proposal.md) for the rationale):

- **`faithful`** (default): **Remove all blank lines** - Any line that is empty (length 0) after
  trimming is removed. Every remaining line break is load-bearing.
- **`flow`**: Blank lines are **paragraph separators**. Consecutive non-blank lines are joined
  into one line with single spaces (a lone newline is a soft break — rendering arrangement, not
  authored structure). Runs of blank lines collapse to one separator.

An unrecognised `lineBreaks` value is an error, never a silent fallback.

## 5. Final Assembly

- Lines (in `flow` mode: paragraphs, one line each) are joined with newline characters (`\n` U+000A)
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
- **Production** (public/app-logic.js) - pure functions for URL extraction, text processing, and verify: to https:// conversion
- **Tests** (__tests__/ocr-hash.test.js) - tests normalize.js
- **Tests** (__tests__/app-logic.test.js) - tests app-logic.js

All tests validate the production browser code to ensure correctness.

# LLM Context: Live Verify System

## Project Overview

Proof-of-concept implementations demonstrating **Live Verify** verification for resolving fraud or disputes. The pipeline is `Input -> normalization -> hash -> GET`.

### Two Verification Modes:
Live Verify works two ways: **select** claims on screen, or **scan** them on paper — both with quick mathematical verification.
- **Live Verify - Clip:** Select text from digital document (browser, email client, PDF reader) -> normalization -> hash -> GET. Best for administrative/remote verification. This is the primary mode.
- **Live Verify - Camera:** Point phone at physical document -> OCR -> normalized-text -> hash -> GET. Best for in-person verification (doorstep, front desk, roadside).

### Integration Vision
These capabilities are designed for building into camera apps, browsers (mobile/desktop), email clients, PDF viewers, messaging systems (SMS, WhatsApp, iMessage), and collaboration tools (Slack, Discord).

### POC 1: Live Verify - Clip (Browser Extension)
`public/text-selection-verify.js` — Select text on webpage, right-click "Verify?", computes hash, checks issuer endpoint.

### iOS App
`apps/ios/LiveVerify/` — Native Swift iOS app for camera-based verification. Uses Vision framework for OCR, CryptoKit for SHA-256. Normalization is NOT reimplemented in Swift — the canonical `normalize.js` is bundled (`Resources/JS/normalize.js`) and run via JavaScriptCore. Key files:
- `Pipeline/JSBridge.swift` — Runs canonical normalize.js via JavaScriptCore
- `Pipeline/SHA256Hasher.swift` — CryptoKit hashing
- `Pipeline/VerificationPipeline.swift` — Orchestrates OCR → normalize → hash → verify
- `Pipeline/VerificationClient.swift` — HTTP verification against issuer endpoints
- `Pipeline/TextRecognizer.swift`, `Pipeline/ContourDetector.swift`, `Pipeline/OcrCleanup.swift` — OCR and registration-mark detection
- `Camera/CameraService.swift`, `Camera/CameraView.swift`, `Camera/DataScanner.swift` — Camera capture
- `App/`, `Views/` — SwiftUI app shell and result/overlay views
- Tests in `LiveVerifyTests/` — Unit tests incl. cross-platform hash fixtures

### Chrome Extension (Browser)
`apps/browser-extension/` — Manifest V3 extension for text selection verification. Works in Chrome, Edge, Firefox. Key files:
- `background.js` — Service worker handling verification, context menu, notifications
- `content.js` — Page scanning for `verifiable-text` HTML markers (two styles: start/end spans and `verifiable-text-element` whole-element), auto-verify regions
- `popup/` — Verification history UI with "Show me" feature to locate claims on page
- `settings/` — Intrusiveness levels, auto-scan options
- `shared/` — **Auto-generated** by `scripts/sync-shared.js` from canonical `public/` sources. Do not edit directly.

### Android App
`apps/android/` — Native Kotlin Android app for camera-based verification. Uses ML Kit for OCR, CameraX for camera. Key files:
- `app/src/main/java/com/liveverify/app/TextNormalizer.kt` — Text normalization matching JS implementation
- `app/src/main/java/com/liveverify/app/VerificationLogic.kt` — URL extraction, HTTP verification
- `app/src/main/java/com/liveverify/app/MainActivity.kt` — Camera capture and verification UI
- `app/build.gradle.kts` — Dependencies: ML Kit, CameraX, OkHttp, Coroutines

Target SDK: 35 (Android 15), Min SDK: 26 (Android 8.0). Uses Mozilla Rhino JS engine to run canonical normalize.js — same approach as iOS's JSBridge.

**Normalization sync:** Text normalization is implemented once in `public/normalize.js` and consumed everywhere:
1. `public/normalize.js` (JavaScript, web app — canonical source)
2. `apps/browser-extension/shared/normalize.js` (auto-generated ES module copy via `scripts/sync-shared.js`)
3. `apps/ios/LiveVerify/LiveVerify/Resources/JS/normalize.js` (bundled copy — run via JavaScriptCore through `Pipeline/JSBridge.swift`)
4. `apps/android/app/src/main/assets/normalize.js` (copy of canonical — run via Rhino JS engine)

If you change normalization logic, update `public/normalize.js` then run `npm run sync-shared` and copy to `apps/android/app/src/main/assets/`. The web app version also has `public/ocr-cleanup.js` for OCR-specific artifact removal (not needed by Clip mode).

**Extension features:**
- Right-click "Verify this claim" on selected text
- Keyboard shortcut Cmd/Ctrl+Shift+V
- Session-only history (privacy: cleared on browser close)
- Auto-detect `verifiable-text` HTML markers on pages (both start/end span pairs and `verifiable-text-element="true"` whole-element style)
- "Show me" button scrolls to and highlights verified claims

### Additional Modes
See [VERIFICATION-MODES.md](./docs/VERIFICATION-MODES.md) for detailed permutations and the platform integration roadmap.

## Key Design Decisions

### 1. No Backend Server Required
- **Initial approach**: Built with Express backend + in-memory hash database
- **Final approach**: Pure client-side verification against URLs printed on documents
- **Why**: Can deploy to GitHub Pages for free, works offline, no infrastructure needed

### 2. URL-Based Verification (Not Local Database)
The document itself contains:
- Certification text within black square registration marks
- Verification base URL printed below the text (e.g., `verify:live-verify.github.io/live-verify/c`)

The app:
1. On-device OCR extracts text from the captured frame (Apple Vision on iOS, ML Kit on Android)
2. Tries **multi-orientation OCR** (0°, 90°, 270°, 180°) and picks the best result
3. Extracts the base URL from the last line of OCR text (accepts `verify:` or `https://` prefix)
4. Removes URL line from certification text
5. Normalizes remaining text (Unicode normalization + whitespace rules)
6. Computes SHA-256 hash
7. **Builds full verification URL** by converting `verify:` to `https://` and appending the hash
8. Fetches the URL and verifies HTTP 200 + `{"status":"verified"}` in response
9. Shows green "VERIFIED" or red "FAILS VERIFICATION" overlay on camera

### 3. No Hardcoded Hashes in the App
- We do **NOT** maintain a local database of valid hashes in the app
- Trust model: The organization that controls the domain (e.g., `live-verify.github.io`) is trusted
- Hash database is pre-built and deployed to GitHub Pages at `/c/{hash}/index.html`
- If hash matches URL AND endpoint returns 200 + `{"status":"verified"}` → verified
- If hash doesn't match URL OR endpoint fails → verification fails

## File Structure

```
live-verify/
├── apps/
│   ├── ios/LiveVerify/              # Native iOS app (Swift)
│   │   ├── LiveVerify/              # Main app source
│   │   │   ├── App/                 # SwiftUI app shell
│   │   │   ├── Camera/              # CameraService, CameraView, DataScanner
│   │   │   ├── Pipeline/            # JSBridge, SHA256Hasher, VerificationPipeline,
│   │   │   │                        #   VerificationClient, TextRecognizer,
│   │   │   │                        #   ContourDetector, OcrCleanup
│   │   │   ├── Resources/JS/        # Bundled normalize.js (canonical copy)
│   │   │   └── Views/               # Result and overlay views
│   │   └── LiveVerifyTests/         # Unit tests
│   │
│   ├── browser-extension/           # Chrome/Edge/Firefox extension
│   │   ├── manifest.json            # Manifest V3 config
│   │   ├── background.js            # Service worker
│   │   ├── content.js               # Page scanning
│   │   ├── popup/                   # History UI
│   │   ├── settings/                # Options page
│   │   ├── shared/                  # AUTO-GENERATED from public/ via scripts/sync-shared.js
│   │   ├── icons/                   # Extension icons
│   │   └── __tests__/               # Jest tests
│   │
│   ├── android/                     # Native Android app (Kotlin)
│   │   ├── app/
│   │   │   ├── build.gradle.kts     # App dependencies
│   │   │   └── src/main/
│   │   │       ├── java/com/liveverify/app/
│   │   │       │   ├── MainActivity.kt      # Camera + verification UI
│   │   │       │   ├── TextNormalizer.kt    # Text normalization
│   │   │       │   └── VerificationLogic.kt # URL extraction, HTTP
│   │   │       ├── res/layout/              # XML layouts
│   │   │       └── AndroidManifest.xml
│   │   ├── build.gradle.kts         # Project config
│   │   └── settings.gradle.kts
│   │
│
├── normalization-hashes/            # Cross-platform test fixtures
│   ├── README.md                    # Format documentation
│   └── {sha256}.md                  # Test cases (filename = expected hash)
│
├── public/                          # Deploy this folder to GitHub Pages
│   ├── index.html                   # Landing page
│   ├── styles.css                   # Responsive design, mobile-first
│   ├── normalize.js                 # Text normalization + SHA-256 (canonical, TESTED)
│   ├── app-logic.js                 # URL extraction, text processing (canonical, TESTED)
│   ├── domain-authority.js          # PSL-based registrable domain extraction (canonical, TESTED)
│   ├── doc-specific-normalization.js# Document-specific normalization rules
│   ├── ocr-cleanup.js               # OCR artifact cleanup
│   ├── text-selection-verify.js     # Text selection → hash → verify UI
│   ├── hash-calculator.html         # Standalone hash calculator page
│   ├── one-way-hash.html            # One-way hash explainer
│   ├── test-normalization.html      # Interactive test page for normalization
│   ├── training-pages/              # Training certificates for testing
│   │   ├── index.html               # Landing page
│   │   ├── bachelor-thaumatology.html
│   │   ├── master-applied-anthropics.html
│   │   └── ...                      # 17 files total (receipts, licenses, CVs, etc.)
│   ├── examples/                    # Text selection verification demo
│   ├── use-cases/                   # ~590 use case documents (Markdown)
│   ├── rejected-use-cases/          # Use cases considered and rejected (kept for the record)
│   └── c/
│       ├── verification-meta.json   # Demo issuer metadata (Unseen University)
│       └── {hash}/index.html        # Static verification endpoints (200 + {"status":"verified"})
│
├── dist/                            # Webpack output (generate-hash.js standalone hasher)
│
├── scripts/
│   ├── sync-shared.js               # Generates extension shared/ from canonical public/ sources
│   ├── count-and-update-derivations.js # Updates use-case derivation counts
│   ├── generate-use-cases-index.js  # Regenerates public/use-cases/index.json
│   ├── generate-hash-entry.js       # Webpack entry for dist/generate-hash.js
│   ├── transpile-normalize.js       # Normalize.js transpilation helper
│   ├── package-chrome-extension.sh  # Zips the browser extension for distribution
│   └── ...                          # PDF generators (Python), Vision debug tools (Swift)
│
├── __tests__/                       # Jest unit tests (12 test files)
│   ├── ocr-hash.test.js             # normalize.js tests
│   ├── app-logic.test.js            # app-logic.js tests
│   ├── domain-authority.test.js     # PSL-based domain extraction tests
│   ├── doc-specific-normalization.test.js
│   ├── normalize-trailing-artifacts.test.js
│   ├── cross-platform-hashes.test.js # Cross-platform hash fixtures
│   ├── browser-extension.test.js    # Browser extension shared module tests
│   ├── content-script-badge.test.js # Extension content script: badge rendering
│   ├── content-script-detection.test.js # Extension content script: marker detection
│   ├── content-script-hide-verify.test.js # Extension content script: hide/verify behavior
│   ├── notification-message.test.js # Extension notification messages
│   └── training-pages-integration.test.js # Training page hash verification
│
├── webapp-playwright-tests/
│   ├── psl.spec.ts                  # Playwright: PSL domain authority in browser
│   ├── state-transitions.spec.ts    # Playwright: state transitions
│   ├── psl-harness.html             # Test harness for PSL
│   ├── state-harness.html           # Test harness for state transitions
│   └── test-helpers.js              # Test orchestration helpers
│
├── test/fixtures/                   # Test images
│   ├── should-detect/               # Images with valid registration marks
│   ├── should-not-detect/           # Images without marks
│   └── mixed/                       # Mixed test cases
│
├── docs/                            # Detailed documentation (~60 files)
│   ├── NORMALIZATION.md             # Detailed normalization rules
│   ├── Technical_Concepts.md        # Registration marks, domain binding, OCR challenges, multi-page manifests
│   ├── Verification-Response-Format.md # Response format specification
│   ├── VERIFICATION-MODES.md        # Clip, Camera, Image modes
│   ├── weaknesses_audit.md          # Self-critical audit of protocol weaknesses
│   └── ...                          # Authority chains, .vcv format, peer references, etc.
│
├── .github/workflows/
│   └── deploy.yml                   # CI/CD: runs tests, deploys to GitHub Pages
│
├── README.md                        # User-facing documentation
├── TESTING.md                       # Test documentation
├── BUILDING.md                      # Build instructions
└── LLM.md                           # This file
```

## Use Cases Content

~590 use case documents in `public/use-cases/*.md` (plus a `public/rejected-use-cases/` folder for ideas considered and rejected). Each has YAML frontmatter:

```yaml
---
title: "Document Title"
category: "Category Name"
type: "use-case"  # or "rollup" for aggregates
slug: "document-slug"
volume: "Medium"
retention: "7 years"
verificationMode: "clip"  # or "camera", "both"
tags: ["tag-one", "tag-two"]
furtherDerivations: 3  # maintained by scripts/count-and-update-derivations.js
---
```

**Document conventions:**
- Sections: The Problem, numbered document sections with HTML mockups, Verification Response, Second-Party Use, Third-Party Use, Verification Architecture, Privacy Salt, Authority Chain, Competition table, Jurisdictional Witnessing (Optional), Further Derivations
- Mockups use `verifiable-text="start"`/`"end"` spans or `verifiable-text-element="true"`, with `data-verify-line` spans wrapping `verify:` lines
- No brackets `[` `]` around start/end span content; no "Scan to verify..." meta commentary in mockups
- Country-specific details go in collapsible `<details>` sections when the doc is international
- Jurisdictional Witnessing is "(Optional)" — only include when genuinely needed
- Frame Live Verify as complementary to existing controls, not a replacement

**Key files:**
- `public/use-cases/criteria-template.md` — Template + guidance for writing use cases. Covers: good use case criteria, party definitions (issuer/second/third), fraud patterns, status indications, common objections.
- `scripts/generate-use-cases-index.js` — Regenerates `public/use-cases/index.json` from .md frontmatter. Run after adding/editing use cases.
- `public/use-cases/view.html` — Client-side markdown viewer. Access via `view.html?doc=slug-name`.

**Workflow:** Edit .md files → run `node scripts/generate-use-cases-index.js` → index.json updated.

**Important:** `public/use-cases/index.json` is GENERATED — never hand-edit it. Always run `node scripts/generate-use-cases-index.js` before committing changes to use-cases. Both index and derivation scripts support `--dry-run`.

**Categories:** 40 categories. Large ones split (Insurance→Specialty/Claims/Bonds, Logistics→Shipping/Customs/Warehouse/Fleet, Banking→Payments/Compliance/Trade/Fintech).

## Core Logic

### Text Normalization Rules (docs/NORMALIZATION.md)

**Step 1: Unicode Character Normalization**
```javascript
// Normalize Unicode characters that OCR might produce
text = text.replace(/[“”„]/g, '"');  // Curly double quotes → straight
text = text.replace(/[‘’]/g, "'");        // Curly single quotes → straight
text = text.replace(/[«»]/g, '"');        // Angle quotes → straight double
text = text.replace(/[–—]/g, '-');        // En/em dash → hyphen
text = text.replace(/\u00A0/g, ' ');                // Non-breaking space → space
text = text.replace(/\u2026/g, '...');              // Ellipsis → three periods
```

**Step 2: Line-by-Line Normalization**
```javascript
const lines = text.split('\n');
const normalizedLines = lines.map(line => {
    line = line.replace(/^\s+/, '');    // Remove leading spaces
    line = line.replace(/\s+$/, '');    // Remove trailing spaces
    line = line.replace(/\s+/g, ' ');   // Collapse multiple spaces
    return line;
})
.filter(line => line.length > 0);       // REMOVE blank lines
```

**Step 3: Final Assembly**
```javascript
return normalizedLines.join('\n');      // No trailing newline
```

### SHA-256 Hashing

**Input Encoding:** UTF-8
**Output Encoding:** Hex (lowercase)
**HMAC:** No (plain SHA-256)

**Browser implementation:**
```javascript
async function sha256(text) {
    const encoder = new TextEncoder();              // UTF-8 encoding
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;                                 // lowercase hex
}
```

**Node.js implementation (for tests):**
```javascript
function sha256(text) {
    const crypto = require('crypto');
    return crypto.createHash('sha256').update(text, 'utf8').digest('hex');
}
```


### Verification Logic

**Verification URL schemes: `verify:` and `vfy:`**

Documents should print base URLs using either the long `verify:` scheme or the short `vfy:` alias instead of `https://`:
- Example (long): `verify:live-verify.github.io/live-verify/c`
- Example (short): `vfy:live-verify.github.io/live-verify/c`

The app converts either form to `https://` and appends the computed hash:
- `verify:example.com/c` → `https://example.com/c/{hash}`
- `vfy:example.com/c` → `https://example.com/c/{hash}`

This keeps printed documents concise while remaining explicit that the URL is for verification.

**Document-Specific Normalization (`verification-meta.json`):**

Issuers can optionally provide document-specific normalization rules and OCR optimization hints at the base URL by hosting a `verification-meta.json` file:

```json
{
  "description": "Example verification-meta.json for hotel receipts with Swiss Franc formatting",
  "hashAlgorithm": "SHA-256",
  "hashSuffix": ".json",
  "charNormalization": "éèêë→e àáâä→a ìíîï→i òóôö→o ùúûü→u ñ→n ç→c",
  "ocrNormalizationRules": [
    {
      "pattern": "CHF\\s+(\\d)",
      "replacement": "CHF$1",
      "description": "Remove space between CHF currency code and amount"
    }
  ]
}
```

**Optional: `hashAlgorithm`** — Issuer-specified hash function. Defaults to `SHA-256` if omitted. Clients that don't support the specified algorithm must fail loudly (no silent fallback). See docs/Technical_Concepts.md § Hash Algorithms for SHA-512, BLAKE3, and algorithm negotiation.

**Optional: `hashSuffix`** — Specifies what to append to the hash when building the lookup URL. If omitted, the app requests the bare hash path (e.g., `https://example.com/c/{hash}`). GitHub Pages users typically use `{hash}/index.html` directories, which GitHub serves at the bare path via 302 — so no `hashSuffix` is needed. Issuers on other infrastructure can set `"hashSuffix": ".json"` to produce `https://example.com/c/{hash}.json`, or any other suffix appropriate to their server configuration.

**Optional: `firstLinePatterns`** — Array of regex patterns (strings or `{pattern, description}` objects) that identify the first line of verifiable text. Primarily for camera mode: when OCR captures noise above the verifiable region and the `⌝` (U+231D) registration mark is absent or unrecognized, the app scans OCR lines top-to-bottom and discards everything above the first match. If no pattern matches, the text is used as-is (same as when the field is absent). Issuers with multiple document types from the same base URL can list several patterns:

```json
{
  "firstLinePatterns": [
    "^Account Number:",
    { "pattern": "^Loan Reference:", "description": "Loan confirmation letters" }
  ]
}
```

If the app finds this file at `https://example.com/c/verification-meta.json`, it applies the rules in this order:

**0. First-Line Trimming (camera mode, applied before normalization):**
- `firstLinePatterns`: Regex array as described above. Applied to OCR text after URL extraction but before any normalization. The `⌝` registration mark remains the universal visual cue; this field is a text-content fallback.

**1. Text Normalization Rules (applied before standard normalization):**
- `charNormalization`: Compact notation for character mappings (e.g., `éèêë→e` means é→e, è→e, ê→e, ë→e)
  - Use cases: Diacritic removal, known OCR misreads
  - Example: Swiss hotel receipts where `Chéasspätzli` should normalize to `Cheasspatzli`
- `ocrNormalizationRules`: Regex-based structural cleanup (applied after character normalization)
  - Use cases: Whitespace from HTML rendering, date formatting artifacts
  - Example: `CHF\s+(\d)` → `CHF$1` removes spaces between currency code and amount

**2. Data Retention & Compliance Rules (optional):**

Issuers can add a `compliance` block specifying legal/regulatory requirements for how verification apps must handle captured data:
- `dataRetention` — Per-artifact retention policies (e.g., `capturedImage: DELETE_IMMEDIATELY`, `auditLog: RETAIN_1_YEAR`)
- `auditLogging` — Log structure and retention (context-aware, never provider-identifiable)
- `applicableLaws` — HIPAA/GDPR/CCPA conditions and impacts
- `purposeLimitation`, `dataMinimization`, `userConsent`, `incidentReporting`
- `abuseProtection` — Rate limiting, harassment-pattern detection, facility-level monitoring guidance
- `progressiveGuidance` — Optional escalating guidance URLs at verification-frequency thresholds (most issuers omit)

See [docs/verification-meta-compliance.md](./docs/verification-meta-compliance.md) for the full annotated example (healthcare worker badge with HIPAA/GDPR/CCPA, audit-log schemas, and abuse-protection details).

This is particularly useful for:
- Documents with diacritics or special characters that need consistent normalization
- Receipt formats with known whitespace issues (e.g., HTML tabs rendering as spaces)
- Specialized documents with known character sets (e.g., employment letters won't have `@#$%^&*`)
- High-security credentials (healthcare, law enforcement, government IDs) requiring strict compliance
- Multi-jurisdictional deployments needing GDPR, HIPAA, CCPA compliance

**Full verification requires these checks:**

```javascript
// Extract base URL (verify: or https://)
const { url: baseUrl, urlLineIndex } = extractVerificationUrl(rawText);

// Build full URL with hash
const fullVerificationUrl = buildVerificationUrl(baseUrl, hash);
// If baseUrl = "verify:example.com/c", result = "https://example.com/c/{hash}"
// If baseUrl = "https://example.com/c", result = "https://example.com/c/{hash}"

async function verifyAgainstClaimedUrl(claimedUrl, computedHash) {
    // Check 1: Hash in URL
    if (!hashMatchesUrl(claimedUrl, computedHash)) {
        showOverlay('red', 'FAILS VERIFICATION');
        return;
    }

    // Check 2 & 3: Fetch URL and verify response
    const response = await fetch(claimedUrl);

    if (response.status !== 200) {
        showOverlay('red', 'FAILS VERIFICATION');
        return;
    }

    const body = await response.text();
    if (!body.includes('"verified"')) {
        // Show actual status (e.g., "revoked")
        const status = body.trim().toUpperCase().substring(0, 50);
        showOverlay('red', status);
        return;
    }

    // All checks passed
    showOverlay('green', 'VERIFIED');
}
```

## Test Coverage

### Unit Tests (Jest) — 12 test files in `__tests__/`

**ocr-hash.test.js:** Text normalization (whitespace, Unicode), SHA-256 hashing, full verification flow
**app-logic.test.js:** URL extraction (verify: and https://), certification text extraction, buildVerificationUrl
**domain-authority.test.js:** PSL-based registrable domain extraction
**doc-specific-normalization.test.js:** Document-specific normalization rules
**normalize-trailing-artifacts.test.js:** OCR trailing artifact cleanup
**cross-platform-hashes.test.js:** Cross-platform hash fixtures from `normalization-hashes/`
**browser-extension.test.js:** Browser extension shared module tests
**content-script-badge.test.js:** Extension content script badge rendering
**content-script-detection.test.js:** Extension content script marker detection
**content-script-hide-verify.test.js:** Extension content script hide/verify behavior
**notification-message.test.js:** Extension notification messages
**training-pages-integration.test.js:** Training page hash verification

### Playwright Tests — 2 spec files in `webapp-playwright-tests/`

**psl.spec.ts:** PSL domain authority in browser context
**state-transitions.spec.ts:** State machine transitions

### Android Unit Tests (JUnit)

**TextNormalizerTest.kt:**
- Text normalization (whitespace, Unicode characters)
- SHA-256 hashing
- Document-specific normalization with metadata
- Cross-platform consistency (hash must match JavaScript)

**VerificationLogicTest.kt:**
- URL extraction (verify:, vfy: prefixes)
- Certification text extraction
- buildVerificationUrl conversion
- Full verification flow integration

### Cross-Platform Hash Fixtures

`/normalization-hashes/*.md` — Shared test fixtures ensuring all platforms produce identical hashes.

**Format:**
```markdown
---
description: What this tests
charNormalization: "éè→e" (optional)
ocrNormalizationRules: (optional)
  - pattern: "regex"
    replacement: "text"
---
Input text to normalize
```

**Filename = expected SHA-256 hash** (e.g., `1cddfbb2...f0b223.md`)

**Adding new fixtures:**
```bash
node -e "const {normalizeText,sha256}=require('./public/normalize.js'); console.log(sha256(normalizeText('your text')))"
# Save as {hash}.md with the input text
```

### Test Commands

```bash
# Web app (Jest + Playwright)
npm test              # All tests (unit + E2E)
npm run test:unit     # Jest only
npm run test:playwright      # Playwright only
npm run lint          # ESLint (enforces fail-loudly rules — see Development Guidelines)
npm run lint:fix      # ESLint with auto-fix

# Android (from apps/android/)
./gradlew test        # Run unit tests
./gradlew connectedAndroidTest  # Run instrumented tests
```

## Training Pages

Three fictional Unseen University certificates (Terry Pratchett universe) for testing:

1. **Bachelor of Thaumatology** - Ponder Stibbons
   - Hash: `1cddfbb2adfa13e4562d274b59e56b946f174a0feb566622dd67a4880cf0b223`

2. **Master of Applied Anthropics** - Esk Weatherwax
   - Hash: `6725b845dcdf2490adf8d5f62e09e5f2055cb80c6200e5ccf58875c8190f4a80`

3. **Doctorate in High Energy Magic** - Adrian Turnipseed
   - Hash: `09d1e6765c2dbd833e5a1f4770d9f0c9368224f7b1aed34de7a3bd5bf4d1f031`

All have corresponding verification endpoints at `/c/{hash}/index.html`

## Dependencies

### Runtime (Browser Built-ins)
- **Web Crypto API**: Built into browsers for SHA-256
- **psl**: Public Suffix List parsing (CDN in browser, npm in Node tests)

### Development (npm install)
- **Jest 29**: Testing framework
- **@playwright/test**: E2E testing
- **jsdom**: DOM environment for Jest
- **jest-environment-jsdom**: jsdom integration for Jest
- **webpack**: Builds `dist/generate-hash.js`
- **ESLint 9**: Enforces fail-loudly rules

### NOT Used
- ~~Express/CORS~~ (no server needed — removed from package.json)
- ~~better-sqlite3~~ (no database needed)

## Build Process

Hash endpoints (`public/c/{hash}/index.html`) and training pages are maintained manually in the repo. There are no build scripts for generating them — they are committed directly.

Two build steps do exist, but neither touches the hash endpoints:
- `npm run build` — webpack builds `dist/generate-hash.js` (standalone hash generator, entry: `scripts/generate-hash-entry.js`)
- `npm run sync-shared` — copies canonical JS from `public/` into the browser extension's `shared/` (and the Android assets copy is maintained alongside)

## Deployment

### GitHub Pages (Current)
1. Push to GitHub
2. GitHub Actions runs tests
3. Deploys `public/` folder to `https://live-verify.github.io/live-verify/`

### Local Testing
```bash
cd public
python3 -m http.server 8000
# Visit http://localhost:8000
```

**Note:** HTTPS required for camera access. Use GitHub Pages or ngrok for mobile testing.

## CORS Considerations

The app performs a **full fetch** of verification URLs:
- If CORS allows: Fetches and checks for HTTP 200 + `{"status":"verified"}` in body
- If CORS blocks: Shows "CANNOT VERIFY - Network error or CORS restriction"

Most verification endpoints need CORS headers:
```
Access-Control-Allow-Origin: *
```

GitHub Pages provides this automatically.

## UI/UX Features

### Camera Controls
- Enable Camera → Stop Camera
- Floating shutter button (center of viewfinder)
- Resolution fallback: 4K → 1080p → 720p

### Result Display (Tabbed Interface)
1. **Captured Image** - Cropped & oriented image with "Copy Image" button
2. **Extracted Text** - Raw OCR output
3. **Normalized Text** - After normalization rules applied

### Status Indicators
- 📷 Ready to scan
- ✅ Camera active
- 📸 Capturing...
- 🧭 Detecting registration square...
- 🔄 Detecting text orientation...
- 🔧 Normalizing text...
- 🔐 Generating hash...
- 🌐 Verifying against claimed URL...
- ✅ VERIFIED / ❌ FAILS VERIFICATION

### Easter Egg
Click the app title to see build timestamp.

## Known Limitations

1. **OCR accuracy**: On-device OCR (Apple Vision, Google ML Kit) is very good but not perfect on ornate typography
2. **Registration marks**: Must be visible and form a clear rectangle
3. **Lighting**: Poor lighting affects both detection and OCR quality
4. **Camera quality**: Works best with modern phone cameras
5. **Moiré patterns**: Screens can introduce patterns that confuse OCR

## Development Guidelines

### No Defensive Coding for Dependencies

This project enforces a **fail-loudly** philosophy for dependencies. We DO NOT swallow a missing dependency and continue without it:

```javascript
// ❌ BAD - Catch and continue without the dependency
try {
    const psl = require('psl');
} catch (e) {
    console.warn('psl not available, using fallback');
}

// ❌ BAD - Silently skip the work if the dependency is absent
if (typeof require !== 'undefined') {
    const psl = require('psl');
}

// ❌ BAD - Substitute a default value when the real thing is missing
const config = loadConfig() || DEFAULT_CONFIG;
```

**Environment dispatch is allowed** — picking the right source for the current environment (extension global, browser CDN, Node require). The key property: if no source provides the dependency, the code throws rather than continuing without it:

```javascript
// ✅ GOOD - Resolve per environment; throws if no source has psl
const psl = (typeof window !== 'undefined' && window.psl) || require('psl');
```

The difference is not the syntax (`||` appears in both) — it's whether execution continues when the dependency is genuinely unavailable. Dispatch selects among legitimate sources; a fallback hides absence.

**Why:**
- Silent failures in production are worse than loud failures in development
- Missing dependencies should be caught during build/test, not in production
- Defensive fallbacks hide configuration problems

**How we enforce this:**
- ESLint rules (`eslint.config.js`) forbid defensive patterns
- Run `npm run lint` to check for violations
- CI should fail if linting fails

**How we handle browser vs Node.js:**
- Browser: Load from CDN (see `<script>` tags in `index.html`)
- Node.js tests: `npm install` provides dependencies
- Both environments get the same code - no fallbacks

### No Fallback Logic
- Do not add "last known good" caches, silent fallbacks, or default defaults when inputs/signals are missing (orientation, network, feature flags, etc.). Surface missing data explicitly and fail loudly so issues are visible.
- **LLM instruction:** Never add retry, fallback, or graceful-degradation logic on your own initiative. If you think a fallback might be appropriate, raise it as a question for the product owner to decide — do not implement it speculatively. Fallback behaviour is a design decision, not a coding convenience.


## Trust Model

The app verifies:
1. ✅ Computed hash matches the hash in the URL
2. ✅ URL endpoint exists (HTTP 200)
3. ✅ Endpoint confirms validity (body contains `{"status":"verified"}`)

**Verification endpoints NEVER echo claim content.** The verifier already has the document—they just scanned/selected it. The endpoint confirms authenticity (status: OK, REVOKED, EXPIRED, etc.), not content. Echoing back "Driver: MICHAEL CHEN, Vehicle: Tesla Model Y" would be redundant; that's already in the document being verified.

## Post-Verification Actions

Endpoints may return optional actions after successful verification. These vary by use case:

**Pattern 1: POST form for reporting (strong action)**
Used when there's a power dynamic and accountability matters. The "never discouraged" principle applies—verifiers are explicitly told reporting is always welcomed.

```
HTTP 200 OK
Status: OK

--- Optional Follow-Up ---
Are you a homeowner/patient/family member?
You may record details of this interaction.
You will NEVER be told not to do this or that it is not needed.

POST to: https://issuer.com/report/{id}
Fields: [context-specific]
```

**Use cases with POST reporting:**
- **Building inspectors** — Homeowner records visit details; bribery deterrent; pattern detection
- **Healthcare workers** — Patient/family records interaction; abuse deterrent; staffing evidence
- **Clinical trials** — Report encounter, medications given, adverse events

**Pattern 2: Link to existing infrastructure (light action)**
Used when robust complaint/information channels already exist.

```
HTTP 200 OK
Status: OK
More: https://issuer.com/public-profile/{id}
```

**Use cases with link only:**
- **Bar admission** — Link to bar association profile (disciplinary history, complaint channel)
- **Professional licenses** — Link to licensing board's public registry

**Key principles:**
- Endpoints never echo claim content (verifier already has it)
- POST forms are write-only from verifier's POV
- "Never discouraged" principle for accountability-focused use cases
- Strong actions where power dynamics exist (inspector at door, healthcare worker with vulnerable patient)
- Light actions where existing infrastructure suffices (bar associations, licensing boards)

**CSV reference:** `public/use-cases/post-verification-actions.csv` tracks which use cases have post-verification actions and their descriptions.

**Trust assumption:** The domain owner (e.g., `intertek.com`) won't host fake verification endpoints.

**Attack resistance:**
- Can't forge a URL with correct hash without the original text
- Can't alter text without changing the hash
- Can't use someone else's hash because OCR'd URL won't match

## Related Concepts

- Estonia's KSI blockchain (mentioned in blog post)
- Merkle trees for audit trails
- NFT-less verification (no blockchain needed for basic use case)
- The Medpro/Intertek fraud case that inspired this
- Independent Witnessing and Stateful Verification (see docs/Technical_Concepts.md)
- Multi-page document manifests: `compositeHash` + `totalPages` + `thisPage` (see docs/Technical_Concepts.md)
- OIRST (Owner-Initiated Re-Salting with Timeout): ephemeral salted links preventing inventory enumeration (see docs/Technical_Concepts.md)
- VCRS (Verification-Consumed Re-Salting): single-use links that auto-rotate after each scan, prevents replay (see docs/Technical_Concepts.md)
- Deployment architecture: air-gapped originals in secure zone, public hash database in DMZ (see docs/Technical_Concepts.md)
- Channel impersonation fraud: phishing, smishing, quishing, vishing — Live Verify as countermeasure (see docs/channel-impersonation-fraud-controls.md)
- Urgent verification framing: power asymmetry and directionality in pressured situations (see docs/urgent-verification-framing.md)
- Quantum computing threat assessment: SHA-256 longevity under quantum attack (see docs/quantum-computing-threat-assessment.md)
- E-Ink badges: physical rotating-salt credentials, Kindle simulation for prototyping (see public/e-ink-id-cards.md)
- Legal witnessing future: hash-based witnessing ceremonies with three roles (lawyer confirms hash, witness attests ceremony, registry holds record) (see docs/legal-witnessing-future-architecture.md)
- Transaction records (`tx` field): verification receipt with ID, timestamp, hash — citable in due-process proceedings (see docs/Verification-Response-Format.md)
- Sovereign roots anchor list: the known-roots list that makes authority-chain display meaningful (vs. trust theater); three-state anchored/amber-unanchored/no-chain UI, jurisdiction-mismatch heuristic (country from locale/SIM/timezone, never GPS), PSL-style governance, root-compromise/update-channel (see docs/sovereign-roots.md)
- Web-page region provenance: the GENERAL primitive the ad work is a special case of — "who placed/who's accountable for any third-party-injected region of a page?" (ads, sponsored/native content, embedded widgets, syndicated content, page-mutating scripts). Member of safe-sequence (platform is subject, inward gesture, absence-is-finding). DISCIPLINE: it scales with whether a region has an ACCOUNTABLE CHAIN to route to, NOT with "importance" — comment/recommendation/review/feed regions are NOT low-stakes (real bot-spam/prominence-manipulation economy, "1000 eyes for a cent"), so they warrant provenance+escalated-reporting too; only truly static known components (map tile, payment iframe) warrant little/nothing. CRUCIAL LIMIT: provenance answers "who's ACCOUNTABLE for this region" — NOT "is this content a bot" (content-level bot/spam detection is statistical/server-side = same as click fraud = out of scope everywhere). §230 TERMINUS (per-node, not one tidy "the §230 node" — protocol surfaces claims, doesn't adjudicate): each node declares on THREE axes — (1) role (host/embedder/amplifier/relay/author), (2) §230 posture (claims/none-author/contested), (3) IDENTITY CUSTODY: do I hold the author's ID? A node that received content from upstream and doesn't hold the ID must declare "§230-exempt — conduit, ID upstream", which FORCES the escalated-reporting cascade to keep walking PAST it (stops a complicit relay being a false terminus). Only the node that actually HOLDS the author's ID is the unmaskable terminus — court-order-gated, never self-service. §230 can be claimed by MULTIPLE nodes / lost by an amplifier that materially contributes (Roommates.com edge); surfacing the CONTESTED amplifier-claiming-immunity node is the point. Declarations self-evidencing/self-policing (upstream corroborates). The individual author is NEVER surfaced to the reporter; reached only by due process (anti-doxxing; mirrors defamation John-Doe unmasking). Instances: ad-placement-provenance, sponsored-content-disclosure, ai-content-provenance (see docs/web-page-region-provenance.md)
- Chain-escalated reporting: a user-initiated ad-fraud report routed ROOT-FIRST down the resolved provenance chain — honest root gets first dibs, steps down one party at a time, first to "consume" stops it. The point: the knowingly-complicit party is usually FAR from root, so root-first sends the report PAST them to the honest parties above (who hold indemnity and can cut them off) FIRST; the bad actor is last to see a complaint about themselves. NO complicit root — the root is NOT the serving publisher but a curated, neutrally-governed (501c3) list of honest ad-placement roots (sovereign-roots pattern applied to ads; the platform running the gesture e.g. Chrome must not anoint itself). Publisher = liability anchor; curated root = reporting anchor. Report payload = the whole chain + URL (self-evidencing) (see docs/chain-escalated-reporting.md)
- Safe-Sequence Platform Disclosure: a new protocol direction — verification turned BACK onto the platform (platform is the subject), invoked via a non-overridable OS/browser "safe sequence" the app can't suppress, where absence-of-chain is the informative finding; compelled by regulation. Member use cases: ad-placement-provenance, platform-age-assurance-parental-audit; frontier: location/blue-check/consent/sponsored-content disclosure (see docs/safe-sequence-platform-disclosure.md)
- Merkle Tree Certificates (MTC) precedent: Cloudflare/Chrome/IETF rebuilding the WebPKI around Merkle inclusion proofs + per-issuer transparency logs (Live Verify's own primitives) for the post-quantum era — validation, not competition. MTC secures the channel, Live Verify secures the document (complementary). PQ migration is a SIGNATURE problem; Live Verify's hash-lookup core sidesteps it. Cloudflare can't self-anchor (bootstraps off a real CA) → validates sovereign-roots + the not-a-CA FUD to pre-empt (see docs/merkle-tree-certificates-precedent.md)
- Voice-call transport: carrying a Live Verify claim with a phone call (not a message). Path 1 = SIP signaling headers on VoIP/VoLTE/VoNR — silent, claim verified and shown on the incoming-call screen BEFORE audio. Path 2 = RCS side-channel + spoken one-time code words (the anti-vishing design) for PSTN/legacy. NOT a replacement for STIR/SHAKEN (that authenticates caller IDENTITY; Live Verify verifies CONTENT — complementary). In-band audio data-burst is explicitly the WRONG approach (codecs strip non-speech). Sibling to messaging-transport.md (see docs/voice-call-transport.md)
- Point-in-time vs current (authentic ≠ true-now): the hash proves a document is AUTHENTIC AS OF ITS STATED DATE, not that it reflects current reality. STALENESS (a genuine, never-revoked snapshot that has aged — real bank statement for a since-drained account) is distinct from REVOCATION (issuer flipped a status). Three fraud archetypes: forged (404), tampered (hash fails), STALE (hash can't catch it — needs the currency check: as-at date / proof expiry / live re-verification). Corrects the old `verified`="authentic and current" overclaim. Rule: the more a claim's value depends on being current, the shorter-lived its proof (see docs/point-in-time-vs-current.md)
- Page-at-a-time hashing: for long multi-row documents (bank statements, contracts), the verifiable unit is one rendered PAGE's full visible text (header + summary + rows), not a summary block and not the whole PDF file. Catches row-level tampering on a checked page. RELIABILITY depends on text-read method: strong in extension (DOM) and PDF mode (text layer), FRAGILE in camera-OCR on dense printed pages (falls back to summary). Default is independent per-page hashes; the optional compositeHash manifest (thisPage/totalPages) closes the "removed page" omission attack where completeness matters, e.g. KYC (see docs/page-at-a-time-hashing.md)
- Dual-channel trust: the NAME for how Live Verify's mechanisms combine at the threshold moment — the human channel (reading/judging the domain) and the machine channel (walking the authority chain to a sovereign root) resolve IN PARALLEL and "click" together. Keeps human judgement load-bearing (machine narrows the question, human answers it); the amber unanchored state hands decisions back to the human. "Burn-on-verify" is the plain-language name for VCRS in outward copy (see docs/dual-channel-trust.md)
- NotebookLM analysis log: record of the meta-analysis loop + scrutiny verdict (what was real-repo / new-synthesis / illustrative-embellishment). Lesson: NotebookLM reliably NAMES latent patterns but invents plausible specifics (domains, statutes, figures) — always grep the repo before acting on a cited fact (see docs/notebooklm-analysis-log.md)
- Verification enrichment hazards: a few use cases (self-attested authorship) DELIBERATELY break the no-echo rule to disclose what a terse claim withheld (disambiguation). Legitimate ONLY when it reveals what the doc withheld (not redundant repeat) — but risky: disclosure-creep, correlation (endorsement ladder = identity graph), stale enrichment outliving truth, endorsement laundering, endorser-gains-a-hold. Public enrichment is permanent/harvestable → disclose only the minimum that resolves the question. Mode-binding mitigations: camera=extra warnings, PDF=also-hash-the-file, extension=bind-the-page-URL. Subject control node: the SUBJECT can be a chain node to retain control over claims made about them. Affirmation is the DEFAULT (the hash being there = a past moment of agreement), so only TWO control verbs exist: RECANT (wholly withdraw → revoked) and RESTRICT (partial, with a FIXED enumerated reason code like no-longer-employed-there → suspended). No affirm/supersede/dispute verbs. Mitigates stale enrichment, but must be authenticated to the subject or it's a censorship vector (see docs/verification-enrichment-hazards.md)

## License

Two licenses, split by kind of work (see LICENSING.md):
- **Code** (`apps/`, `public/*.js`, `scripts/`, build tooling) — **Apache 2.0** (`LICENSE`). All code files require the Apache 2.0 header.
- **Content** (`public/use-cases/`, `public/rejected-use-cases/`, `docs/`, website prose) — **CC BY-SA 4.0** (`LICENSE-CONTENT`). Content files do NOT carry a code license header; the share-alike content license covers them. Don't add Apache headers to .md content files.

**Patents:** none and none possible — the method was publicly disclosed on 17 January 2023 (a dated blog post: "OCR-to-Hash: A Simple Audit Trail for Physical Documents"), so it is unpatentable prior art in every jurisdiction. This is a defensive-publication fact, not a promise. See docs/no-patents-declaration.md. (Distinct from the Apache licence, which is a patent grant on the code; this concerns whether the invention can be patented at all — it can't.)

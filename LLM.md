# LLM Context: Live Verify System

## Project Overview

Proof-of-concept implementations demonstrating **Live Verify** verification for resolving fraud or disputes. The pipeline is `Input -> normalization -> hash -> GET`.

### Two Verification Modes:
Live Verify works two ways: **select** claims on screen, or **scan** them on paper — both with quick mathematical verification.
- **Live Verify - Clip:** Select text from digital document (browser, email client, PDF reader) -> normalization -> hash -> GET. Best for administrative/remote verification. This is the primary mode.
- **Live Verify - Camera:** Point phone at physical document -> OCR -> normalized-text -> hash -> GET. Best for in-person verification (doorstep, front desk, roadside).

### Integration Vision
These capabilities are designed for building into camera apps, browsers (mobile/desktop), email clients, PDF viewers, messaging systems (SMS, WhatsApp, iMessage), and collaboration tools (Slack, Discord).

### POC 1: Live Verify - Camera
`public/camera-app/index.html` — Point camera at physical document, OCR extracts text, normalizes, hashes, verifies against issuer's endpoint.

### POC 2: Live Verify - Clip (Browser Extension)
`public/text-selection-verify.js` — Select text on webpage, right-click "Verify?", computes hash, checks issuer endpoint.

### iOS App
`apps/ios/LiveVerify/` — Native Swift iOS app for camera-based verification. Uses Vision framework for OCR, CryptoKit for SHA-256. Key files:
- `TextNormalizer.swift` — Text normalization matching JS implementation
- `VerificationClient.swift` — HTTP verification against issuer endpoints
- `CameraViewController.swift` — Camera capture and OCR pipeline
- Tests in `LiveVerifyTests/` — Unit tests for normalizer, hasher, verification client

### Chrome Extension (Browser)
`apps/browser-extension/` — Manifest V3 extension for text selection verification. Works in Chrome, Edge, Firefox. Key files:
- `background.js` — Service worker handling verification, context menu, notifications
- `content.js` — Page scanning for `verifiable-text` HTML markers, auto-verify regions
- `popup/` — Verification history UI with "Show me" feature to locate claims on page
- `settings/` — Intrusiveness levels, auto-scan options
- `shared/` — **Auto-generated** by `scripts/sync-shared.js` from canonical `public/` sources. Do not edit directly.

### Android App
`apps/android/` — Native Kotlin Android app for camera-based verification. Uses ML Kit for OCR, CameraX for camera. Key files:
- `app/src/main/java/com/liveverify/app/TextNormalizer.kt` — Text normalization matching JS implementation
- `app/src/main/java/com/liveverify/app/VerificationLogic.kt` — URL extraction, HTTP verification
- `app/src/main/java/com/liveverify/app/MainActivity.kt` — Camera capture and verification UI
- `app/build.gradle.kts` — Dependencies: ML Kit, CameraX, OkHttp, Coroutines

Target SDK: 35 (Android 15), Min SDK: 26 (Android 8.0). Uses native Kotlin implementation for normalization (no JS engine) for performance and minimal APK size.

### Thunderbird Extension (Email Client)
`apps/thunderbird-extension/` — Thunderbird MailExtension for verifying claims in emails. Key files:
- `background.js` — Background script handling verification, context menu, notifications
- `popup/` — Verification history UI
- `settings/` — Notification level settings
- `shared/` — **Auto-generated** by `scripts/sync-shared.js` from canonical `public/` sources. Do not edit directly.

Minimum version: Thunderbird 102. Uses `messenger.*` APIs for email-specific functionality.

**CRITICAL - Keep normalization in sync:** Text normalization is implemented in FIVE places that must match:
1. `public/normalize.js` (JavaScript, web app)
2. `apps/browser-extension/shared/normalize.js` (JavaScript ES modules, browser extension)
3. `apps/ios/LiveVerify/` uses JSBridge to run normalize.js directly
4. `apps/android/app/src/main/java/com/liveverify/app/TextNormalizer.kt` (Kotlin, Android app)
5. `apps/thunderbird-extension/shared/normalize.js` (JavaScript, Thunderbird extension)

If you change normalization logic, update ALL implementations. The web app version also has `public/ocr-cleanup.js` for OCR-specific artifact removal (not needed by Clip mode).

**Extension features:**
- Right-click "Verify this claim" on selected text
- Keyboard shortcut Cmd/Ctrl+Shift+V
- Session-only history (privacy: cleared on browser close)
- Auto-detect `verifiable-text` HTML markers on pages
- "Show me" button scrolls to and highlights verified claims

### Additional Modes
See [VERIFICATION-MODES.md](./VERIFICATION-MODES.md) for detailed permutations and the platform integration roadmap.

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
1. Uses **OpenCV.js** to detect the black square registration marks
2. Crops to the rectangle defined by the marks
3. Tries **multi-orientation OCR** (0°, 90°, 270°, 180°) and picks the best result
4. Extracts the base URL from the last line of OCR text (accepts `verify:` or `https://` prefix)
5. Removes URL line from certification text
6. Normalizes remaining text (Unicode normalization + whitespace rules)
7. Computes SHA-256 hash
8. **Builds full verification URL** by converting `verify:` to `https://` and appending the hash
9. Fetches the URL and verifies HTTP 200 + `{"status":"verified"}` in response
10. Shows green "VERIFIED" or red "FAILS VERIFICATION" overlay on camera

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
│   │   │   ├── TextNormalizer.swift # Text normalization
│   │   │   ├── SHA256Hasher.swift   # CryptoKit hashing
│   │   │   └── VerificationClient.swift # HTTP verification
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
│   ├── thunderbird-extension/       # Thunderbird MailExtension
│   │   ├── manifest.json            # MailExtension manifest
│   │   ├── background.js            # Background script
│   │   ├── popup/                   # History UI
│   │   ├── settings/                # Options page
│   │   ├── shared/                  # AUTO-GENERATED from public/ via scripts/sync-shared.js
│   │   └── icons/                   # Extension icons
│   │
│
├── normalization-hashes/            # Cross-platform test fixtures
│   ├── README.md                    # Format documentation
│   └── {sha256}.md                  # Test cases (filename = expected hash)
│
├── public/                          # Deploy this folder to GitHub Pages
│   ├── camera-app/index.html        # Camera UI with registration marks overlay
│   ├── styles.css                   # Responsive design, mobile-first
│   ├── normalize.js                 # Text normalization + SHA-256 (TESTED)
│   ├── app-logic.js                 # Pure functions for URL extraction, rotation (TESTED)
│   ├── live-verify-app.js             # Main app logic (camera, OCR, verification)
│   ├── test-normalization.html      # Interactive test page for normalization
│   ├── cv/
│   │   ├── geometry.js              # OpenCV geometry utilities (TESTED)
│   │   └── detectSquares.js         # Registration mark detection (TESTED via E2E)
│   ├── training-pages/              # Training certificates for testing
│   │   ├── index.html               # Landing page
│   │   ├── bachelor-thaumatology.html
│   │   ├── master-applied-anthropics.html
│   │   └── doctorate-high-energy-magic.html
│   ├── c/
│   │   ├── verification-meta.json       # Document normalization rules + OCR settings (optional)
│   │   └── {hash}/index.html        # Static verification endpoints (200 + {"status":"verified"})
│   └── hashes.json                  # Hash database metadata
│
├── scripts/
│   ├── sync-shared.js               # Generates extension shared/ from canonical public/ sources
│   └── concat-source.py             # Concatenates source files for review
│
├── build-hashes.js                  # Build tool: generates hash database
├── generate-training-pages.js       # Build tool: generates training pages
│
├── ocr-hash.test.js                 # Jest: normalize.js tests (30 tests)
├── app-logic.test.js                # Jest: app-logic.js tests (29 tests)
├── cv-geometry.test.js              # Jest: geometry.js tests
├── detectSquares.node.test.js       # Jest: placeholder tests
│
├── e2e/
│   ├── cv-detect.spec.ts            # Playwright: registration mark detection (8 tests)
│   ├── cv-ocr.spec.ts               # Playwright: OCR integration (8 tests)
│   └── cv-harness.html              # Test harness for E2E tests
│
├── test/fixtures/                   # Test images
│   ├── should-detect/               # Images with valid registration marks
│   ├── should-not-detect/           # Images without marks
│   └── mixed/                       # Mixed test cases
│
├── .github/workflows/
│   └── deploy.yml                   # CI/CD: runs tests, deploys to GitHub Pages
│
├── README.md                        # User-facing documentation
├── TESTING.md                       # Test documentation
├── docs/NORMALIZATION.md                 # Detailed normalization rules
├── BUILDING.md                      # Build instructions
└── LLM.md                           # This file
```

## Use Cases Content

~450 use case documents in `public/use-cases/*.md`. Each has YAML frontmatter:

```yaml
---
title: "Document Title"
category: "Category Name"
type: "use-case"  # or "rollup" for aggregates
slug: "document-slug"
volume: "Medium"
retention: "7 years"
---
```

**Key files:**
- `public/use-cases/criteria-template.md` — Template + guidance for writing use cases. Covers: good use case criteria, party definitions (issuer/second/third), fraud patterns, status indications, common objections.
- `scripts/migrate-use-cases.js` — Regenerates `public/use-cases/index.json` from .md frontmatter. Run after adding/editing use cases.
- `public/use-cases/view.html` — Client-side markdown viewer. Access via `view.html?doc=slug-name`.

**Workflow:** Edit .md files → run `node scripts/migrate-use-cases.js` → index.json updated.

**Important:** Always run `node scripts/migrate-use-cases.js` before committing changes to use-cases. The generated `index.json` must be kept in sync with the .md files.

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

### Computer Vision: Registration Mark Detection

Uses **OpenCV.js** to detect black square registration marks:

1. Convert image to grayscale
2. Apply Gaussian blur
3. Adaptive thresholding
4. Find contours
5. Filter for square-like shapes (aspect ratio ~1.0, area > threshold)
6. Select best 4 squares that form a rectangle
7. Apply perspective transform to crop and deskew

**Key files:**
- `public/cv/geometry.js` - Geometry utilities (orderCorners, etc.)
- `public/cv/detectSquares.js` - Detection algorithm

### Multi-Orientation OCR

Since users may hold the camera sideways, the app tries OCR at multiple orientations:

```javascript
const orientations = [
    { rotation: 0, canvas: cropped },                // Most likely (portrait)
    { rotation: 270, canvas: rotateCanvas(cropped, 270) },  // Landscape right
    { rotation: 90, canvas: rotateCanvas(cropped, 90) },    // Landscape left
    { rotation: 180, canvas: rotateCanvas(cropped, 180) }   // Upside down (rare)
];

// Try in order: 0°, 270°, 90°, 180°
// Pick FIRST orientation that achieves high confidence (early exit optimization)
for (const { rotation, canvas } of orientations) {
    const result = await Tesseract.recognize(canvas.toDataURL(), 'eng');
    const confidence = result.data.confidence || 0;

    if (confidence > HIGH_CONFIDENCE_THRESHOLD) {
        // Good enough - use this orientation
        bestResult = result;
        bestRotation = rotation;
        break;
    }
}
```

### High-Resolution Capture

Uses **ImageCapture API** when available for higher resolution than video frames:

```javascript
if ('ImageCapture' in window) {
    const ic = new ImageCapture(track);
    const photo = await ic.takePhoto();           // Returns high-res Blob
    imageBitmap = await createImageBitmap(photo);
}
```

Falls back to canvas capture from video element if ImageCapture not supported.

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
  "charNormalization": "éèêë→e àáâä→a ìíîï→i òóôö→o ùúûü→u ñ→n ç→c",
  "ocrNormalizationRules": [
    {
      "pattern": "CHF\s+(\d)",
      "replacement": "CHF$1",
      "description": "Remove space between CHF currency code and amount"
    }
  ],
  "tesseract": {
    "lang": "eng",
    "psm": 6,
    "oem": 1,
    "tessedit_char_whitelist": "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0-9 .,-/:()",
    "preserve_interword_spaces": "1"
  }
}
```

If the app finds this file at `https://example.com/c/verification-meta.json`, it applies the rules in this order:

**1. Text Normalization Rules (applied before standard normalization):**
- `charNormalization`: Compact notation for character mappings (e.g., `éèêë→e` means é→e, è→e, ê→e, ë→e)
  - Use cases: Diacritic removal, known OCR misreads
  - Example: Swiss hotel receipts where `Chéasspätzli` should normalize to `Cheasspatzli`
- `ocrNormalizationRules`: Regex-based structural cleanup (applied after character normalization)
  - Use cases: Whitespace from HTML rendering, date formatting artifacts
  - Example: `CHF\s+(\d)` → `CHF$1` removes spaces between currency code and amount

**2. OCR Optimization (optional Tesseract settings):**
- `lang`: OCR language model (e.g., "eng", "eng+fra")
- `psm`: Page segmentation mode (6 = uniform block of text)
- `oem`: OCR engine mode (1 = LSTM neural net only)
- `tessedit_char_whitelist`: Allowed characters (reduces false positives)
- `preserve_interword_spaces`: Keeps spaces between words intact

**3. Data Retention & Compliance Rules (optional but recommended):**

Issuers can specify legal/regulatory requirements for how verification apps must handle captured data:

```json
{
  "compliance": {
    "dataRetention": {
      "capturedImage": "DELETE_IMMEDIATELY",
      "ocrText": "DELETE_AFTER_VERIFICATION",
      "verificationHash": "NONE",
      "verificationResult": "RETAIN_7_DAYS",
      "auditLog": "RETAIN_1_YEAR"
    },
    "auditLogging": {
      "description": "Context-aware audit logging for healthcare verification. Hospitals are high-stress environments where verification can happen at any time—not just key treatment moments. Family members may challenge credentials during adversarial care disputes, safety concerns, or general distrust.",
      "logStructure": {
        "timestamp": "ISO 8601 format",
        "verificationResult": "VALID, SUSPENDED, EXPIRED, or UNKNOWN",
        "verifierRole": "Staff member / Family member / Visitor",
        "patientContext": "Patient identifier (hash or MRN, NOT plain name)",
        "treatmentContext": "Unit/area (ICU/OR/etc), NOT detailed medical info",
        "verifiedPersonRole": "Doctor title, specialty (e.g., 'Cardiologist'), NOT name/license number",
        "verificationContext": "Routine check / Pre-procedure consent / Care dispute / Safety concern / Unscheduled visit / Distrust/adversarial encounter",
        "purposeOfVerification": "Why verification was sought at this moment"
      },
      "examples": [
        {
          "timestamp": "2025-01-03T08:30:00Z",
          "scenario": "Routine pre-procedure verification",
          "verificationResult": "VALID",
          "verifierRole": "Family member",
          "patientContext": "Patient_8847",
          "treatmentContext": "OR preparation, pre-operative",
          "verifiedPersonRole": "Cardiologist (Arizona-licensed, on-duty)",
          "verificationContext": "Pre-procedure consent",
          "purposeOfVerification": "Family member confirming surgeon credentials before cardiothoracic procedure"
        },
        {
          "timestamp": "2025-01-03T14:45:00Z",
          "scenario": "Adversarial encounter during care dispute",
          "verificationResult": "VALID",
          "verifierRole": "Family member",
          "patientContext": "Patient_8847",
          "treatmentContext": "CCU",
          "verifiedPersonRole": "Cardiologist (Arizona-licensed, on-duty)",
          "verificationContext": "Care dispute/distrust",
          "purposeOfVerification": "Family member challenges physician credentials during disagreement over treatment plan"
        },
        {
          "timestamp": "2025-01-03T23:15:00Z",
          "scenario": "Safety concern, unscheduled visit",
          "verificationResult": "VALID",
          "verifierRole": "Family member",
          "patientContext": "Patient_8847",
          "treatmentContext": "CCU night shift",
          "verifiedPersonRole": "Nurse (RN, on-duty)",
          "verificationContext": "Unscheduled visit/safety check",
          "purposeOfVerification": "Family member verifies aide credentials during unexpected 11 PM entry to verify legitimacy of unannounced care"
        }
      ],
      "retention": "1 year (HIPAA medical record retention). Audit logs may document adversarial encounters—this is expected and appropriate when family members exercise verification rights during disputes over care."
    },
    "applicableLaws": [
      {
        "name": "HIPAA Privacy Rule",
        "condition": "if patient data visible in capture",
        "regulation": "45 CFR §164.500",
        "canonical": "https://www.hhs.gov/hipaa/for-professionals/privacy/index.html",
        "impact": "Captured badge images containing patient information must be deleted immediately. Audit logs retained for 1 year per medical record requirements."
      },
      {
        "name": "GDPR",
        "condition": "if EU user or data processed in EU",
        "articles": "Articles 5-6 (Processing Principles), Article 35 (Data Protection Impact Assessment)",
        "canonical": "https://gdpr-info.eu/",
        "impact": "Data minimization required. Only non-identifiable role/specialty verified, no provider names. User consent required before processing."
      },
      {
        "name": "CCPA",
        "condition": "if California resident",
        "statute": "California Consumer Privacy Act §1798.100+",
        "canonical": "https://oag.ca.gov/privacy/ccpa",
        "impact": "Consumer right to know/delete. Audit logs tied to patient encounter (not provider-identifiable). No sale of verification data."
      }
    ],
    "purposeLimitation": "Verification only. Cannot use captured data for ML training, analytics, or secondary purposes. Audit logs tied to specific patient encounters for treatment/compliance purposes only.",
    "dataMinimization": "App should not transmit captured image to issuer. Only hash and verification result. Audit logs must not include provider names, license numbers, or provider-specific identifiers—only role/specialty and verification status.",
    "userConsent": "App must notify user that verification data is being processed and retained per this policy. For family members: 'Your verification of this provider will be logged in patient's medical record as: [family member] verified [provider role] at [timestamp] '",
    "incidentReporting": "If verification app is compromised, issuer domain operator must be notified within 24 hours.",
    "contextualAwareness": "Verification audit logs should distinguish between: staff member verifying peer (internal audit), family member verifying provider (patient safety), visitor verification (security). Each has different retention and privacy implications.",
    "abuseProtection": {
      "description": "Protections against 'First Amendment auditors' and bad-faith verification abuse. Verification is legitimate, but systematic harassment via verification is not.",
      "reasonableVerification": [
        "Family member verifying provider once before treatment",
        "Citizen verifying officer legitimacy during traffic stop",
        "Patient verifying nurse during unexpected room entry",
        "Staff member verifying peer credentials occasionally"
      ],
      "harassmentPatterns": [
        "Same person verifying same staff member 5+ times in one shift (tracking)",
        "Repeated verification attempts with incrementally delayed times (movement mapping)",
        "Systematic attempts to verify all staff at facility (roster enumeration attack)",
        "Verification requests targeting specific individuals based on name/identity (targeted harassment)",
        "Flood verification attempts to probe endpoint vulnerabilities"
      ],
      "rateLimiting": {
        "perUser": "Maximum 3 verification requests per user per staff member per 24 hours (app-level user consent)",
        "perStaff": "CRITICAL: Monitor badge verification frequency at facility level. Alert security if same staff member receives 5+ verification attempts in 5 minutes (real-time targeting detection). This is NOT app-level rate limiting—this is facility monitoring triggering immediate security response.",
        "perIPAddress": "NOT EFFECTIVE in practice (all facility staff behind NAT share same public IP). Do NOT rely on IP-based rate limiting.",
        "escalation": "Upon detection of rapid verification attempts on a staff member: (1) Consider alerting facility security to conduct welfare check on staff member's location, (2) Notify staff member and management, (3) Document incident for potential harassment/stalking report to law enforcement if pattern continues."
      },
      "legalFramework": {
        "description": "Emerging laws protect staff from verification-based harassment. Issuers should document abuse prevention in compliance metadata.",
        "applicableStatutes": [
          {
            "law": "Harassment/Cyberstalking Statutes",
            "applies": "Repeated verification attempts targeting specific person may constitute harassment or stalking under state law (varies by jurisdiction)"
          },
          {
            "law": "Workplace Violence Prevention Laws",
            "applies": "Healthcare facilities, law enforcement can restrict verification in abusive/confrontational contexts under workplace safety rules"
          },
          {
            "law": "Interference with Public Employees",
            "applies": "Some jurisdictions: deliberately provoking confrontations via verification scanning may constitute interference with officer/employee duties"
          },
          {
            "law": "Computer Fraud & Abuse Act (CFAA)",
            "applies": "US law: automated verification scraping or flood attacks may constitute 'unauthorized access' under CFAA §1030"
          }
        ]
      },
      "appGuidance": [
        "Apps should display rate-limit warnings: 'You've verified this person 3 times today. Additional requests may be flagged as suspicious.'",
        "Apps should NOT enable batch verification or allow scripts to automate verification requests",
        "Apps should warn users if verification pattern resembles stalking/tracking (same person multiple times, different times)",
        "Apps should provide 'report abuse' button if user believes verification is being weaponized against staff member"
      ],
      "issuerGuidance": [
        "Facility-level monitoring: Issuers (hospitals, police departments) must actively monitor verification endpoint for rapid-fire attempts on single staff members. Set alerts at 5+ attempts in 5 minutes.",
        "Real-time dispatch: Upon alert, consider automatic notification of facility security to conduct welfare check on staff member's location. Do NOT wait for staff to self-report harassment—treat rapid verification as potential active targeting and escalate accordingly.",
        "App-level guidance: Transparent rate limiting in verification-meta.json for user consent (3 per day), but do NOT rely on app to stop abuse—facility monitoring is primary defense.",
        "Documentation: Log all verification patterns (who verified whom, when, from where if available). Correlate with any harassment/threat reports. This becomes evidence if legal escalation needed.",
        "Policy clarification: Document that 'legitimate verification for lawful purpose' (one scan before treatment, one check during traffic stop) is protected. Systematic targeting (20+ attempts, movement tracking, roster enumeration) is not."
      ]
    },
    "progressiveGuidance": {
      "description": "Context-sensitive guidance URLs triggered at verification frequency thresholds. Allows issuers to provide educational, warning, and legal framework resources at escalating frequency levels. Apps track verification attempts per staff member and offer corresponding guidance URLs.",
      "implementation": "App tracks cumulative verification attempts for same staff member and presents guidance URL (as modal, banner, or link) when threshold is reached. Frequency counter resets per 24-hour period.",
      "thresholds": [
        {
          "requestNumber": 1,
          "guidanceUrl": "https://issuer-domain.org/guidance/first-verification",
          "purpose": "Educational: explain legitimate verification use cases and appropriate contexts",
          "exampleContent": "What is verification? When is it appropriate? This badge proves this person is authorized to be here. You can verify them for lawful purposes like confirming credentials before treatment, checking during security incident, or during care discussions."
        },
        {
          "requestNumber": 3,
          "guidanceUrl": "https://issuer-domain.org/guidance/repeated-verification",
          "purpose": "Warning: notify user that repeated verification may indicate concerning pattern",
          "exampleContent": "You've verified this person 3 times in the last 24 hours. If you're verifying the same person repeatedly without a specific new reason, this may be flagged by facility security as a potential targeting or stalking pattern."
        },
        {
          "requestNumber": 10,
          "guidanceUrl": "https://issuer-domain.org/guidance/harassment-law",
          "purpose": "Legal framework: explain harassment/stalking statutes and escalation procedures",
          "exampleContent": "Repeated verification attempts may constitute harassment or stalking under state law. Facility security monitors for patterns like 5+ attempts in 5 minutes (real-time targeting). If you believe someone is using verification to harass staff, report to facility security or law enforcement."
        }
      ],
      "exampleImplementation": {
        "scenario": "User verifies same staff member multiple times",
        "firstRequest": {
          "requestCount": 1,
          "action": "Show educational guidance: display banner or modal linking to first guidance URL",
          "userExperience": "'This badge is verified. Learn when verification is appropriate.' [Learn more]"
        },
        "thirdRequest": {
          "requestCount": 3,
          "action": "Show warning guidance: display banner or modal linking to repeated verification guidance",
          "userExperience": "'You've verified this person 3 times. Repeated verification without new reason may be flagged.' [Learn more]"
        },
        "tenthRequest": {
          "requestCount": 10,
          "action": "Show legal guidance: display prominent notice with escalation procedures",
          "userExperience": "'Repeated verification attempts may violate harassment or stalking laws. See facility security.' [Legal Framework]"
        }
      },
      "designNotes": "Progressive guidance avoids hard-coded warnings in app code. Instead, issuers customize guidance URLs for their jurisdiction, organization, and context. URLs can link to facility-specific policies, legal frameworks, abuse reporting forms, or educational materials. This approach provides flexibility while maintaining consistent user experience across different issuer domains.",
      "adoptionNote": "Progressive guidance is optional and best suited for jurisdictions with specific legal frameworks around verification rights or organizations with documented verification abuse patterns. Most issuers will omit these URLs entirely to keep verification flows streamlined and user-friendly. The primary abuse defense is facility-level monitoring (detecting rapid-fire attempts and triggering security welfare checks), not user-facing warnings. Don't enable progressive guidance unless you have a specific reason."
    },
    "notes": "Healthcare credentials: Captured badge image must not be stored if it contains patient-visible information. Audit logs MUST be contextualized to patient encounter, not provider-centric. Police credentials: Do not retain verification requests or movement tracking. All contexts: Verification is legitimate for authorized purposes, but systematic harassment via verification is not and may violate harassment/stalking laws. Progressive guidance is optional—most issuers will omit it to keep flows clean."
  }
}
```

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

### Unit Tests (Jest) - 68 tests

**ocr-hash.test.js (30 tests):**
- Text normalization (whitespace, Unicode characters)
- SHA-256 hashing
- Registration mark positioning
- Full verification flow

**app-logic.test.js (38 tests):**
- Canvas rotation (0°, 90°, 180°, 270°, negative angles)
- URL extraction (space removal, validation, verify: and https:// prefixes)
- Certification text extraction
- Hash matching logic
- buildVerificationUrl (converts verify: to https:// with hash appended)

**cv-geometry.test.js:**
- Corner ordering
- Square candidate scoring

**detectSquares.node.test.js:**
- Placeholder tests (fixtures exist)

### E2E Tests (Playwright) - 16 tests

**e2e/cv-detect.spec.ts (8 tests):**
- Detection on should-detect fixtures ✓
- Detection on mixed fixtures ✓
- Non-detection on should-not-detect fixtures ✓

**e2e/cv-ocr.spec.ts (8 tests):**
- OCR on cropped regions ✓
- Text extraction and normalization ✓

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
npm run test:e2e      # Playwright only

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

### Runtime (Loaded from CDN)
- **Tesseract.js v5**: OCR engine (~2MB WASM)
- **OpenCV.js 4.x**: Computer vision for registration mark detection (~8MB)
- **Web Crypto API**: Built into browsers for SHA-256

### Development (npm install)
- **Jest 29**: Testing framework
- **@playwright/test**: E2E testing
- **jsdom**: DOM environment for Jest
- **jest-environment-jsdom**: jsdom integration for Jest

### NOT Used
- ~~Express/CORS~~ (no server needed)
- ~~better-sqlite3~~ (no database needed)

## Build Process

### Generate Hash Database

```bash
node build-hashes.js
```

Creates:
- `public/hashes.json` - Metadata for all hashes
- `public/c/{hash}/index.html` - Verification endpoints
- Updates build timestamp in `public/live-verify-app.js`

### Generate Training Pages

```bash
node generate-training-pages.js
```

Creates HTML pages for the three training certificates.

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

1. **OCR accuracy**: Tesseract isn't perfect, may need retries
2. **Registration marks**: Must be visible and form a clear rectangle
3. **Lighting**: Poor lighting affects both detection and OCR quality
4. **Camera quality**: Works best with modern phone cameras
5. **HTTPS required**: Camera API needs HTTPS (GitHub Pages provides this)
6. **Wide-angle lens**: Some phones capture wide FOV, reducing text pixel density
7. **iOS zoom**: No zoom control available on iOS Safari

## Development Guidelines

### No Defensive Coding for Dependencies

This project enforces a **fail-loudly** philosophy for dependencies. We DO NOT use defensive coding patterns like:

```javascript
// ❌ BAD - Silent fallbacks
try {
    const psl = require('psl');
} catch (e) {
    console.warn('psl not available, using fallback');
}

// ❌ BAD - typeof checks
if (typeof require !== 'undefined') {
    const psl = require('psl');
}

// ❌ BAD - || fallbacks
const psl = window.psl || require('psl');
```

Instead, dependencies MUST be available or the app fails:

```javascript
// ✅ GOOD - Fail loudly if psl not available
const psl = (typeof window !== 'undefined' && window.psl) || require('psl');
```

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
- OpenCV.js for web-based computer vision
- Independent Witnessing and Stateful Verification (see Technical_Concepts.md)

## License

GNU Affero General Public License v3.0 or later (AGPL-3.0-or-later)

All code requires AGPL license header. Run `./add-license-headers.sh` to add missing headers.

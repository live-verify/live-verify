# Verification Modes: Text-to-Hash Applications

Live Verify is a **text-to-hash** pipeline with multiple input permutations. The core process is `Input -> normalized-text -> hash -> GET`.

## Input Permutations

### 1. Image-to-Text (OCR)
- **Camera-based:** Pointing a live camera at a physical document or screen.
- **Rectangular Clip:** Selecting a region of an image from a view (screenshot, photo).
- **Automatic Detection:** Using computer vision (registration marks) to find scannable regions.

### 2. Direct Text Selection
- **Actual Text:** Selecting digital text from a view (webpage, PDF, email).
- **Normalization:** Even direct text requires the same normalization rules as OCR to ensure hash consistency across different viewing environments.

## Platform Integration Vision

These capabilities are designed to be built into the native fabric of digital life:

- **Camera Apps:** System-level recognition of `verify:` lines in the viewfinder.
- **Browsers:** (Desktop, Tablet, Mobile) Right-click context menus for selected text.
- **Email Packages:** Automatic verification of headers or body claims.
- **PDF Viewers:** Built-in "Verify Page" or "Verify Selection" tools.
- **Messaging Systems:** (SMS, RCS, iMessage, WhatsApp, WeChat) Verification indicators appearing in the chat chrome or via long-press on a message.
- **Automatic Status:** Software tools (PDF viewers, browsers, email clients) automatically identifying claims and displaying verification status in the "chrome" or status bar as the user scrolls through a document or view.
- **Collaboration Apps:** (Slack, Discord, Teams) Integration for verifying shared documents or claims within channels with real-time status badges.

---

## Mode 1: Camera-Based Document Verification (POC Implemented)

**Physical documents with printed verification lines**

*Future: iOS/Android camera apps get this built-in natively.*

### How It Works

1. User holds physical document in front of camera
2. App detects black square registration marks (corners of verification region)
3. App extracts text within registration marks via OCR
4. App normalizes text and computes SHA-256 hash
5. App builds full verification URL: `https://issuer.com/c/{hash}`
6. App fetches URL and confirms HTTP 200 + "OK" response
7. Result displayed as green "VERIFIED" overlay on camera

### Key Features
- Physical registration marks define clear boundaries
- OCR operates only on marked region
- Works with any camera-capable device
- Offline-first (processes locally before verification)
- Multi-orientation OCR (handles camera rotation)

### Ideal For
- Government-issued credentials (driver's license, passport)
- University degrees, certificates
- Medical reports, lab results
- Insurance policies, financial documents
- Legal documents, notarizations
- Professional licenses
- Any document printed with registration marks and verification line

---

## Mode 2: Web-Based Text Selection Verification (POC Implemented)

**User-selected text from web pages with external verification display**

*Future: Chrome/Firefox/Safari get this built-in via native context menu.*

### How It Works

1. User visits a web page containing text to verify
2. User selects/highlights the text they want to verify
3. Browser extension or web app captures selection
4. App normalizes selected text using same rules as documents
5. App computes SHA-256 hash
6. App builds verification URL with hash
7. **Critical difference:** Verification result displays in **browser UI outside the content pane**
8. Result cannot be faked by page manipulations

### Key Architecture Differences from Document Mode

**Selection without borders:**
- User manually selects content (no registration marks needed)
- Selection boundaries defined by text cursor, not image detection
- Works on any text source (web pages, PDFs, documents)

**Verification result display:**
- Result shown in browser extension popup, toolbar, or dedicated pane
- **NOT injected into page DOM** (prevents content manipulation)
- Uses browser's native UI elements
- Shows in persistent location user can trust

**Text source possibilities:**
- Direct web page text (HTML)
- PDF viewer selections
- Document viewer selections
- Social media post excerpts
- News article quotes

### Security Model

**Prevents two classes of attacks:**

1. **Page manipulation by attacker:**
   - Attacker cannot modify page to show fake "VERIFIED" result
   - Verification appears outside attackable content
   - User sees result in trusted browser UI

2. **Content spoofing:**
   - If user selects text and sees "VERIFIED", that exact text was hashed
   - Cannot be different from displayed text (unlike camera mode where OCR could misread)
   - Verification result tied to user's exact selection

### Trust Anchors

- **Domain trust:** Same as document mode (issuer domain)
- **Browser trust:** Native UI location (address bar, extension icon, sidebar)
- **User selection:** User controls what text is verified
- **Exact match:** Hashed text must exactly match selected text

### Use Cases

**News & Media Verification**
- Verify exact quote from news article
- Confirm tweet or social media post content
- Validate claim in blog post or research paper
- Track when article text was changed

**Contract & Legal Document Verification**
- Verify specific clause from contract
- Confirm terms in license agreement
- Validate legal document excerpt
- Track contract revisions

**Scientific & Research**
- Verify quote from published paper
- Confirm methodology description
- Validate data claim or result
- Track research publication versions

**Social Media & Online Discussion**
- Verify what someone actually wrote
- Confirm quote in forum post
- Validate testimonial or review
- Create immutable record of post content

**Content Attribution**
- Link to authoritative source of quote
- Track original publication date
- Document where quote appeared
- Prevent quote misattribution

### Workflow Example: News Quote Verification

**Scenario:** Reader encounters news article with controversial quote

1. Reader selects the controversial quote with mouse/keyboard
2. Click browser extension icon
3. Extension shows: "Verify this selection?"
4. User clicks "Verify"
5. Extension computes hash and builds URL
6. Browser shows result in extension popup:
   ```
   ✅ VERIFIED
   Source: example-news.com
   Hash: 3f4a7b9c...
   Verified: 2025-12-31
   ```
7. Result links to original article source
8. User can share link with verification URL to prove exact quote

### Implementation Considerations

**Browser Capabilities Required:**
- Text selection access (DOM Selection API)
- Extension/userscript environment or bookmarklet
- Access to Tesseract or native text extraction
- Network access for verification fetch
- UI element injection capability

**Mobile Browser Support:**

The web selection mode must work on **mobile browsers** where extensions are limited:

**iOS Safari Limitations:**
- No content blocking extensions
- Limited JavaScript injection
- No persistent background script
- **Workaround:** Bookmarklet approach
  - User adds "Verify This" bookmark with JavaScript code
  - Select text → tap bookmark → verification in new tab/modal
  - Similar to mobile-friendly web tools (Pocket, Instapaper)
  - Result shown in trusted iOS browser UI (notification or popup)

**Android Chrome/Firefox:**
- Some support for extensions (limited)
- Better JavaScript injection capabilities
- Service Worker support
- **Implementations:**
  - Native extension (full-featured)
  - Bookmarklet (fallback for all browsers)
  - Web app with bookmarklet launcher

**Universal Bookmarklet Approach** (works everywhere):

```javascript
javascript:(function(){
  if(window.getSelection){
    let text = window.getSelection().toString().trim();
    if(text.length > 0) {
      // Send to live-verify verification page
      let encoded = encodeURIComponent(text);
      window.open('https://live-verify.example.com/verify?text=' + encoded, 'verify-modal', 'width=500,height=600');
    } else {
      alert('Please select text to verify');
    }
  }
})();
```

**Mobile-Optimized Result Display:**
- Modal or new tab (don't navigate away from source)
- Results shown in scrollable panel
- "Copy verification link" button (share with others)
- "Back to source" button
- QR code of verification URL (for offline sharing)

**Cross-Browser Consistency:**
- Desktop: Extension + bookmarklet support
- Tablet: Bookmarklet primary, extension secondary
- Mobile: Bookmarklet only (most compatible)
- All platforms: Fall back to manual URL entry

**Performance on Mobile:**
- Hashing (SHA-256) is fast even on older phones
- OCR/Tesseract can be heavy - optional for mode 2
- Prefer simple text extraction from selections
- Minimal UI for slower networks

**Text Processing Pipeline (No OCR Required):**
- Browser already has text selected (DOM provides raw text)
- **Skip OCR entirely** - no need for Tesseract or image recognition
- Apply Unicode normalization
- Apply whitespace rules
- Compute SHA-256 hash
- Build verification URL with hash

This is a key difference from document mode: web text is already in digital form, so OCR is unnecessary. The pipeline is much faster and simpler.

**Verification Endpoint Response:**
- Same format as document mode
- Status: "OK" (verified), "REVOKED" (content no longer valid), etc.
- Optional: timestamp, version number, source metadata

**Source Metadata** (optional)
- Publication date from web page
- Author/publication information
- URL of source page
- Excerpt location (paragraph number, section)

### Technical Challenges

1. **Text extraction varies by source**
   - HTML copy-paste may include formatting
   - PDF text extraction inconsistent
   - Word processors may include metadata
   - Solution: normalize aggressively

2. **Web content changes frequently**
   - Article text updates
   - Edits and corrections
   - Removal/archival
   - Solution: issuer maintains version history

3. **Multi-language text**
   - Unicode normalization rules differ
   - Diacritics handling per language
   - Solution: same as document mode (universal rules)

4. **Linking to context**
   - Verification proves text hash, not source
   - Additional step: prove verified text came from claimed source
   - Solution: issuer includes source URL in verification response

### Mode 2b: In-Photo Text Selection (Screenshots, Images)

**Browser-based screenshot/image text verification**

Similar to Mode 2, but the source is an image (screenshot, photo, PNG) rather than live web page:

**How It Works**
1. User pastes or uploads an image (screenshot, photo, etc.)
2. Browser uses built-in text recognition (Canvas API, Tesseract optional)
3. Browser displays extracted text with verification indicators
4. User can select specific text portions to verify
5. Selected text is normalized and hashed
6. Verification performed same as Mode 2

**Key Difference from Mode 1:**
- No registration marks needed
- User manually selects text from image (not automatic boundary detection)
- Simpler than document mode (no OpenCV geometry)
- Useful for: WhatsApp screenshots, social media post screenshots, receipts without registration marks

**Use Cases:**
- Verify screenshot of social media post
- Confirm text from notification/email screenshot
- Validate receipt image (with or without marks)
- Prove what someone wrote in a message

---

## Mode 3: Real-Time Document Streaming (Future)

**Continuous verification of document content as it's presented**

### Concept
- Document or content stream provides continuous hash updates
- Each section/page has its own verification line
- Verifier sees continuous "VERIFIED" as content flows
- Prevents page substitution in real-time scenarios

### Use Cases
- Live video of credential (over video call)
- Real-time document transmission (fax replacement)
- Streaming legal proceedings (court record)
- Continuous content broadcast (government publication)

---

## Mode 4: Batch Verification (Systematic Hash Receipt)

**Organizations receiving hashes in bulk from issuers**

### How It Works

By regulation or contract, issuers submit hashes to oversight bodies:
- Banks submit statement hashes to regulators
- Insurance companies submit policy hashes to commissioners
- Trial sponsors submit consent hashes to FDA
- Universities submit degree hashes to credentialing bodies

### Recipients

Systematic recipients (never see original documents):
- Maintain verification capability for audits
- Enable compliance checking
- Support future dispute resolution
- Detect altered documents in bulk

### Delivery Formats

- Raw hash list (simple CSV/JSON)
- Merkle tree (efficient batch verification)
- Blockchain (some jurisdictions)
- Dedicated database (regulatory portal)

---

## Mode 5: Automatic Claim Verification (Future)

**Browser automatically identifies and verifies claims without user selection**

### Vision

As OCR and NLP technologies mature, browsers could automatically:

1. **Identify claim text** - Recognize factual statements that might need verification
2. **Compute hashes** - For each identified claim
3. **Perform verification** - Check against issuer endpoints
4. **Display status** - Show verification indicators **in browser chrome only** (address bar area, sidebar, notification)
5. **Navigate claims** - User controls via < Previous / Next > buttons in browser UI (not content area)

### How It Works

**Document Mode (with camera):**
```
User scans physical document with camera
    ↓
Browser auto-detects registration marks (existing Mode 1)
    ↓
Browser extracts text via OCR
    ↓
[NEW] Browser's NLP identifies individual claims within text
    ↓
Browser computes hash for each claim
    ↓
Browser verifies each claim against issuer
    ↓
Browser displays verification status in chrome:
   "Claim 1/5: [claim text preview] ✅ VERIFIED"
   "Claim 2/5: [claim text preview] ❌ REVOKED"
    ↓
User can navigate with < Prev | Next > buttons in browser UI
    ↓
Click claim to see full details in side panel (not modifying document content)
```

**Web Page Mode:**
```
User visits web page
    ↓
[NEW] Browser's NLP identifies verifiable claims on page
    ↓
Browser computes hashes for claims it recognizes
    ↓
Browser performs verification automatically
    ↓
Visual indicators appear next to claims in document:
   - Green underline = verified
   - Red dashed underline = failed verification
   - Yellow dot = unknown issuer
    ↓
Hover over claim → Sidebar or popup shows:
   - Claim text
   - Verification status
   - Issuer domain
   - Timestamp
    ↓
Navigation bar in browser chrome shows:
   "✅ 8 verified | ❌ 2 failed | ⚠️ 3 unknown"
    ↓
User clicks < Prev | Next > to jump between claims
```

### Key Design Principles

**Verification Status In Browser Chrome, NOT Content:**
- **Content area:** Only original document/page text (possibly with subtle visual indicators like underlines)
- **Browser chrome:** All verification results, navigation, detailed status
- **Why:** Prevents document manipulation while showing comprehensive verification info
- **User trust anchor:** Status shown in area they control and can verify is unmodified

**Browser-Level Control:**
- < Previous Claim button in address bar area
- > Next Claim button in address bar area
- Verification summary badge (e.g., "8/10 verified")
- Optional: Side panel or bottom notification drawer
- All outside the document content rectangle

**Three Visual States for Content:**
1. **✅ Verified claim** - Light green background or underline
2. **❌ Failed claim** - Light red background or strikethrough
3. **⚠️ Unknown claim** - Yellow indicator (no issuer found)

### Technical Requirements

**Claim Identification (NLP):**
- Identify factual statements that are likely to have issuers
- Common patterns:
  - "This certifies that..."
  - "Name: [value]"
  - "Date: [value]"
  - "ID: [value]"
  - Quoted statistics or facts
- Machine learning model to recognize claim boundaries

**Partial Text Hashing:**
- Hash individual claims, not entire document
- Normalize each claim independently
- Allow multiple verification URLs per document
- Handle claim overlaps and nesting

**Async Verification:**
- Don't block page load
- Fetch verification in background
- Update status as results return
- Show loading indicator while pending

**Issuer Discovery:**
- Extract domain hints from document (letterhead, footer)
- Use URL pattern conventions (e.g., `verify:example.com/c`)
- Support domain configuration (e.g., `verification-meta.json`)

### Limitations & Challenges

**Current limitations (why this is "future"):**

1. **Claim identification accuracy**
   - NLP models struggle with context
   - False positives (identifying non-claims as claims)
   - False negatives (missing actual claims)
   - Language diversity

2. **Claim boundary detection**
   - Multi-line claims hard to identify
   - Context-dependent claim scope
   - Partial claims vs full statements

3. **Privacy concerns**
   - Sending partial text to verifiers
   - Issuer learns which claims are being verified
   - Mitigation: privacy salt, synthetic claims, batch verification

4. **Issuer endpoint proliferation**
   - Every claim needs issuer endpoint
   - Sparse issuer adoption
   - Requires standardization

5. **User expectation mismatch**
   - Users may misinterpret indicators
   - "Green = true" misconception
   - Verification only confirms text match, not truth

### Evolution Path

**Phase 1 (Current):** Mode 1-4 manual verification
- User initiates verification
- Full document verification

**Phase 2 (Near future):** Semi-automatic claim identification
- Browser suggests claims to verify
- User accepts/rejects suggestions
- Manual claim selection with auto-verification

**Phase 3 (Medium future):** Full automatic identification with manual navigation
- Browser identifies all claims automatically
- User navigates with < Prev / Next > buttons
- Visual indicators show verification status
- Detailed info in browser chrome

**Phase 4 (Long future):** Intelligent filtering and prioritization
- Browser prioritizes high-importance claims
- Filters out low-confidence claims
- Learns user verification interests
- Predictive verification (pre-verify likely-checked claims)

### Example: Medical Report

```
User scans medical report (document with registration marks + claims)
    ↓
Mode 1: Register marks detected ✓
    ↓
[NEW] OCR extracts full text
    ↓
[NEW] NLP identifies these claims:
   1. "Patient: John Smith"
   2. "Date: 2025-12-31"
   3. "Lab: Quest Diagnostics"
   4. "Result: Negative"
   5. "Physician: Dr. Jane Doe, MD #12345"
    ↓
Browser verifies each:
   1. ✅ VERIFIED (lab.example.com/c/{hash})
   2. ✅ VERIFIED (lab.example.com/c/{hash})
   3. ✅ VERIFIED (quest.example.com/c/{hash})
   4. ✅ VERIFIED (quest.example.com/c/{hash})
   5. ❌ REVOKED (medical-board.example.com shows license revoked)
    ↓
Browser chrome shows:
   "[1/5] Patient: John Smith ✅"
   "< Previous | Next >"
   "Status: 4 verified, 1 revoked"
    ↓
User can navigate through each claim
   - Click Next: Shows claim 2, claim 3, etc.
   - Hover on red-underlined "Dr. Jane Doe" → Shows "License revoked 2025-12-15"
```

---

## Comparison Matrix

| Aspect | Camera Document | Web Selection | Photo Selection | Real-Time Stream | Batch Receipt | Auto Claims |
|--------|-----------------|---------------|-----------------|------------------|---------------|-------------|
| **What's Verified** | Printed doc text | Web page text | Image text | Content stream | Historical hashes | Individual claims |
| **OCR Required?** | Yes | No | Optional | Yes | No | Yes |
| **User Action** | Hold camera | Select text | Paste image | Monitor flow | Query DB | Read document |
| **Normalization** | Yes | Yes | Yes | Yes | No | Yes (per-claim) |
| **Result Display** | Camera overlay | Browser UI | Browser UI | Overlay | DB response | **Browser chrome** |
| **Tampering Risk** | OCR misreads | Page manipulation | Image editing | Stream edit | None | Minor (UI out of reach) |
| **Timeline** | Snapshot | Immediate | Immediate | Continuous | Historical | Background |
| **Best For** | Credentials | Quotes | Screenshots | Live events | Audit | General docs |
| **Issuer Load** | Simple endpoint | Simple endpoint | Simple endpoint | Streaming | Batch ingest | Multiple endpoints |
| **Device** | Camera phone | Browser | Browser | Camera+display | Network | Any browser |
| **Status** | ✅ POC | ✅ POC | 📋 Future | 📋 Future | 📋 Future | 🚀 Vision |

---

## Cross-Mode Architecture

All modes share:

1. **Text Normalization Rules** (`normalize.js`)
   - Unicode character mapping
   - Whitespace collapsing
   - Line-by-line processing
   - Language-agnostic rules

2. **SHA-256 Hashing**
   - UTF-8 input encoding
   - Hex lowercase output
   - No HMAC or salt (unless document-specific)

3. **Verification Model**
   - Issuer operates endpoint at domain
   - Hash in URL → issuer domain must authenticate
   - Response: HTTP 200 + "OK" means verified
   - Response: HTTP 200 + other text = status (REVOKED, EXPIRED, etc.)

4. **Trust Anchor**
   - Domain ownership (not distributed consensus)
   - HTTPS for communication security
   - CORS headers for browser access
   - Optional: `verification-meta.json` for document-specific rules

---

## Future Directions

**Hybrid Verification**
- Combine camera document + web reference
- Verify document matches web source
- Detect divergence between document and web version

**Progressive Verification**
- Partial verification (section of document)
- Multi-layer verification (page + document + issuer)
- Attestation chains (endorser confirms issuer)

**Cryptographic Signatures**
- Issuer digitally signs hashes
- Third parties verify issuer's key
- Public key infrastructure (PKI) integration

**Decentralized Verification**
- Issuer publishes hashes to public ledger
- Multiple parties can independently verify
- No single point of failure

---

## Implementation Roadmap

### Phase 1: Foundation ✅
- **Mode 1:** Camera-based document verification (POC complete)
- **Mode 2:** Web text selection verification (POC complete)
- Both demonstrate capabilities for future native platform integration

### Phase 2: Image-Based Verification 📋
- **Mode 2b:** In-photo text selection
  - Similar to Mode 2, but for images/screenshots
  - Use case: verify screenshot of social media post, receipt image
  - Lower priority (Mode 2 covers most use cases)

### Phase 3: Advanced Verification 📋
- **Mode 3:** Real-time document streaming
  - Use case: live credential verification
  - Requires streaming architecture
  - Lower priority (niche use case)

- **Mode 4:** Batch systematic receipt
  - Use case: regulatory audit trail
  - Infrastructure: issuer batch submission
  - Requires regulatory adoption
  - Lower priority (B2B focus)

### Phase 4: Intelligent Verification 🚀
- **Mode 5:** Automatic claim verification
  - Requires NLP maturity
  - Requires issuer standardization
  - Long-term vision (5+ years)
  - Key innovation: browser chrome UI model prevents tampering


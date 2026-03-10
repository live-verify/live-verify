# Technical Concepts: Live Verify

This document explains technical concepts referenced across multiple use case documents. Read this first to understand how Live Verify works under the hood.

## Table of Contents

1. [Registration Marks](#registration-marks)
2. [Text Normalization](#text-normalization)
3. [Domain Binding](#domain-binding)
4. [Hash Algorithms](#hash-algorithms)
5. [Response Formats](#response-formats)
6. [Photo Encoding](#photo-encoding)
7. [Dynamic Badges & Worker Verification](#dynamic-badges--worker-verification)
8. [OCR Challenges](#ocr-challenges)
9. [Standard Libraries & Native Integration](#standard-libraries--native-integration)
10. [Deployment Architecture](#deployment-architecture-air-gapped-originals-public-hashes)
11. [Independent Witnessing & Stateful Verification](#independent-witnessing--stateful-verification)
12. [Sector-Specific Implementation Nuances](#sector-specific-implementation-nuances)

---

## Registration Marks

**What they are:** Black borders drawn around verifiable text to help computer vision algorithms detect the scannable region.

**Visual example:**
```
┌─────────────────────────────────┐  ← Black border registration marks
│                                 │    (3px solid black CSS border)
│  Bachelor of Science            │
│  Computer Science               │
│  Jane Smith, 2018               │
│  verify:degrees.ed.ac.uk/c      │
│                                 │
└─────────────────────────────────┘
```

**How they work:**
1. **OpenCV.js** detects contours (outlines of shapes)
2. Finds the largest quadrilateral (4-sided polygon)
3. Extracts the region inside this quadrilateral
4. Sends extracted region to Tesseract.js for OCR

**Why needed:**
- **Prevents OCR of wrong text** - Without registration marks, Tesseract might OCR the entire page (headers, footers, adjacent text)
- **Improves accuracy** - Knowing the boundary helps OCR focus on the relevant region
- **Enables perspective correction** - Can detect tilted documents and rotate them

**Standard implementation:**
- **Border width:** 3px solid black (CSS: `border: 3px solid black;`)
- **Variance testing:** Some training pages use 10px borders to test robustness
- **Detection algorithm:** OpenCV `findContours()` with area thresholding

**Alternative approaches:**
- **Corner marks only** - ┌ └ ┐ ┘ instead of full border (saves ink)
- **Proximity to `verify:` URL** - If no registration marks, just OCR text near the `verify:` line
- **QR code hybrid** - Use QR code to indicate scannable region boundaries

See [bachelor-thaumatology-square.html](public/training-pages/bachelor-thaumatology-square.html) for example with decorative text OUTSIDE the scannable area.

---

## Text Normalization

**Why needed:** OCR engines may introduce inconsistencies (extra spaces, line breaks, case variations). Normalization ensures the same text always produces the same hash.

**Normalization rules** (see [NORMALIZATION.md](docs/NORMALIZATION.md) for complete specification):

1. **Unicode NFC normalization** - Combines accented characters (é → e + combining accent)
2. **Trim leading/trailing whitespace** - `"  text  "` → `"text"`
3. **Collapse multiple spaces** - `"hello    world"` → `"hello world"`
4. **Remove leading/trailing pipe characters** - `"|text|"` → `"text"` (OCR artifacts from registration mark borders)
5. **Preserve case** - `"Edinburgh"` ≠ `"edinburgh"` (case matters unless document specifies otherwise)
6. **Preserve punctuation** - `"Bachelor of Science"` ≠ `"Bachelor of Science,"`

**Example:**

**Original OCR output:**
```
|  Bachelor  of Science
   Computer Science
   Jane Smith, 2018  |
```

**After normalization:**
```
Bachelor of Science
Computer Science
Jane Smith, 2018
```

**Critical detail:** Organizations must document their normalization rules so verifiers can reproduce the exact hash. If Edinburgh prints "Honours" but you normalize to "Honors" (US spelling), verification will fail.

**Privacy implication:** Normalization doesn't change the meaning but changes the hash. Two identical documents with different whitespace will have different hashes - this is actually a **feature** for preventing hash enumeration attacks.

---

## Domain Binding

**Core concept:** The verification text itself determines which domain to query for verification. This prevents issuer impersonation.

**How it works:**

**Document contains:**
```
Bachelor of Science
Computer Science
Jane Smith
verify:degrees.ed.ac.uk/c
```

**Verification process:**
1. OCR extracts text including `verify:degrees.ed.ac.uk/c`
2. App normalizes text (removes `verify:` line for hashing)
3. Computes SHA-256: `abc123def456...`
4. Constructs URL: `https://degrees.ed.ac.uk/c/abc123def456...`
5. Fetches URL - only `degrees.ed.ac.uk` can return `{"status":"verified"}`

**Why this prevents fraud:**

**Attack attempt:** Someone creates fake degree from `fake-university.com`:
```
Bachelor of Science
Computer Science
Jane Smith
verify:fake-university.com/c
```

**What happens:**
- Hash computes correctly
- App queries `https://fake-university.com/c/{hash}`
- Fake server returns `{"status":"verified"}`
- **BUT** - App displays: ❌ **VERIFIED by fake-university.com**
- User sees immediately this is NOT from Edinburgh University

**Key insight:** You can't change the `verify:` URL without changing the hash. If you photoshop "verify:degrees.ed.ac.uk/c" onto a fake document, the hash won't match Edinburgh's database.

**Domain authority display:**

The app MUST show the verifying domain prominently:
- ✅ **VERIFIED by degrees.ed.ac.uk** (clear)
- ❌ **VERIFIED** (dangerous - user doesn't know who verified)

**Subdomain nuances:**
- `ed.ac.uk` - University of Edinburgh (UK academic domain)
- `degrees.ed.ac.uk` - Subdomain for degree verification (different authority)
- `example.co.uk` - UK company domain
- `foobar.com.br` - Brazilian company domain

The verification app uses the **Public Suffix List** to correctly identify the full hostname, not truncate to just `ed.ac.uk`.

See [public/domain-authority.js](public/domain-authority.js) for implementation.

---

## Hash Algorithms

**Default: SHA-256** - Used for most documents (degrees, receipts, certifications).

**Properties:**
- **256-bit output** - 64 hexadecimal characters.
- **One-way function** - Cannot reconstruct original text from hash.
- **Collision-resistant** - Probability of two different texts producing same hash: ~1 in 2^256 (effectively zero).
- **Fast** - Computes in milliseconds on modern phones.

### Flexible Algorithm Choice

While SHA-256 is the recommended default, different use cases may prefer stronger or weaker alternatives. The preferred algorithm for a domain is specified in its [`verification-meta.json`](#extended-response-with-metadata) file.

**SHA-512 for High-Security Documents** (Government IDs, Passports):
- **Why upgrade:** Provides significantly higher collision resistance and better long-term "future-proofing" against theoretical quantum computing threats.
- **Tradeoff:** Produces 128 hex characters (longer URLs).

**Weaker/Faster Algorithms** (Low-value, high-volume micro-transactions):
- In rare cases where extreme speed or minimal URL length is required for non-critical claims (e.g., short-lived loyalty points), an organization might choose a faster algorithm or a truncated hash, provided the entropy is managed to prevent brute-force guessing.

**Verification apps must:**
1. Check for a `hashAlgorithm` specification in the issuer's `verification-meta.json`.
2. Fall back to SHA-256 if no algorithm is specified.

### Configuring via verification-meta.json

Organizations specify their hash algorithm choice in the root-level configuration:

```json
{
  "hashAlgorithm": "SHA-512",
  "description": "Government ID uses stronger hash for long-term security"
}
```

**Hash not printed on document:**
Critical privacy property - the hash is **never** printed on the physical document. Only the base verification URL (`verify:example.com/c`) appears. This prevents hash enumeration from public photos and ensures privacy.

---

## Response Formats

Organizations can return different response types from verification endpoints:

### Simple JSON Response

**Simplest implementation:**
```
GET https://degrees.ed.ac.uk/c/abc123def456...
Response: 200 OK
Body: {"status":"verified"}
```

App displays: ✅ **VERIFIED by degrees.ed.ac.uk**

**Invalid hash:**
```
GET https://degrees.ed.ac.uk/c/invalid_hash...
Response: 404 Not Found
```

App displays: ❌ **FAILS VERIFICATION**

### JSON Response (Recommended)

**For credentials with revocation capability (medical licenses, security clearances):**

```json
{
  "status": "verified",
  "issuer": "California Medical Board",
  "issued_date": "2018-06-23",
  "expiry_date": "2026-06-23",
  "photo": "data:image/jpeg;base64,/9j/4AAQSkZJRg...",
  "link": "https://mbc.ca.gov/verification-info.html"
}
```

**Possible status values:**
- `"verified"` - Valid, active credential
- `"revoked"` - Credential has been revoked (malpractice, disciplinary action)
- `"SUSPENDED"` - Temporarily suspended (pending investigation)
- `"EXPIRED"` - Credential has expired (needs renewal)
- `"STOLEN"` - Reported stolen (remove photo from response for privacy)
- `"REPLACED"` - Superseded by newer version (wills, estate documents)

**Status display:**
- `"verified"` → ✅ Green **VERIFIED by mbc.ca.gov**
- `"revoked"` → ❌ Red **REVOKED by mbc.ca.gov**
- `"SUSPENDED"` → ⚠️ Yellow **SUSPENDED by mbc.ca.gov**

See [Use_Case-Medical_License.md](Use_Case-Medical_License.md) for detailed JSON schema.

### Extended Response with Metadata

**Using `verification-meta.json` configuration:**

Organizations can host `https://example.com/c/verification-meta.json` to define custom response types and suggest more integrated participation:

```json
{
  "integrationLinks": {
    "website": "https://example.com/verify-help",
    "iosApp": "https://apps.apple.com/app/example-verify",
    "androidApp": "https://play.google.com/store/apps/details?id=com.example.verify"
  },
  "responseTypes": {
    "SUPERSEDED": {
      "class": "denying",
      "text": "This document has been replaced by a newer version",
      "link": "https://example.com/verification-updates.html"
    }
  }
}
```

This allows the verifier's generic app to suggest the issuer's dedicated app for a more rich experience (e.g., real-time notifications or biometric integration).

See [README.md: For Organizations Creating Verifiable Documents](README.md#for-organizations-creating-verifiable-documents) for complete `verification-meta.json` specification.

---

## Photo Encoding

**Why Base64 instead of URL:** Privacy and security.

### The Problem with Photo URLs

**Bad approach:**
```json
{
  "status": "verified",
  "photo_url": "https://mbc.ca.gov/photos/12345.jpg"
}
```

**Attacks this enables:**
1. **Photo enumeration** - Attacker can iterate `/photos/1.jpg`, `/photos/2.jpg`, ... and download entire database
2. **Privacy violation** - Photo URLs may be guessable or publicly accessible
3. **Tracking** - Server can log who accessed which photo URLs

### Base64 Encoding Solution

**Correct approach:**
```json
{
  "status": "verified",
  "photo": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgID..."
}
```

**Benefits:**
1. **No enumeration** - Can't guess other photos without knowing their hashes
2. **Privacy** - Photo only revealed when someone has physical document
3. **No tracking** - Server doesn't know who viewed which photos
4. **Offline capability** - Photo embedded in response, no second network request

**How it works:**
- Photograph converted to Base64 string
- Embedded directly in JSON response
- Browser decodes and displays automatically
- Typical photo size: 20-50 KB (reasonable for mobile networks)

**Photo opt-out mechanism** (government IDs):

During transition period (20-30 years), some individuals may opt out of photo verification:

```json
{
  "status": "verified",
  "photo": null,
  "photo_opt_out": true,
  "issued_date": "2015-03-10"
}
```

App displays: ✅ **VERIFIED by dmv.ca.gov** (no photo, issued before photo mandate)

See [Use_Case-Government_IDs.md](Use_Case-Government_IDs.md) lines 236-242 for cultural transition discussion.

---

## Dynamic Badges & Worker Verification

In some high-volume use cases (delivery drivers, utility workers, field inspectors), the "document" being verified is a **Dynamic Badge** or wearable pendant.

### e-Ink Badges

Static ID cards can be easily photographed or forged. Next-generation worker verification uses **e-Ink badges** that can display a rotating "Salt" or a specific "Session ID" linked to the worker's current task.

**Typical Use Cases:**
- **[Police Officer Verification](public/use-cases/police-officer-verification.md):** Preventing impersonation during traffic stops or home visits.
- **[Delivery & Courier Verification](public/use-cases/delivery-courier-verification.md):** High-volume interactions where route-specific salts protect driver privacy.
- **[Utility & Field Worker Verification](public/use-cases/utility-field-worker-verification.md):** Verifying authorized access for meter readers and repair crews.
- **[Social Services Worker Verification](public/use-cases/social-services-worker-verification.md):** Ensuring the legitimacy of officials conducting sensitive home visits.
- **[Hotel & Vacation Rental Staff](public/use-cases/hotel-staff-verification.md):** Verifying maintenance and room-service workers at the guest's door.

**How it works:**
1.  **Task Assignment:** A driver starts a delivery shift. Their phone app syncs a unique salt to their e-Ink badge via Bluetooth.
2.  **Visual Presentation:** The worker shows the badge through a window or doorbell camera. The badge displays their name, ID, and the current session salt.
3.  **No-Friction Verification:** The recipient scans the badge. The salt ensures that a simple photocopy of the badge won't verify. The hash lookup returns the worker's current duty status and assignment.

### Pre-Notification Integration

Where a recipient already has a relationship with the issuer (e.g., an Amazon customer expecting a package), the verification details can be pushed to the recipient's phone via SMS, email, or a mobile app **before** the worker arrives.

- **Synced Metadata:** The "Verification Line" on the driver's e-Ink badge matches the details sent in the "Out for Delivery" notification.
- **Participatory Security:** The recipient can verify the driver's authority without needing to interact or open the door, increasing safety for both parties.

---

## OCR Challenges

**Current technology (Tesseract.js v5)** works reliably with:

### ✅ Works Well Today

| Document Type | Why It Works |
|---------------|--------------|
| Till receipts | Monospace fonts, thermal printing, structured format |
| Business letters | Standard fonts (Arial, Times), clean layout |
| CV/resume claims | Plain text, simple formatting |
| Medical license wallet cards | Government standard fonts, plain design |
| Simple certificates | Designed with OCR in mind |

### ❌ Struggles With

| Document Type | Challenge | Example |
|---------------|-----------|---------|
| Ornate degree certificates | Gothic/blackletter fonts, calligraphy | University names like "𝓤𝓷𝓲𝓿𝓮𝓻𝓼𝓲𝓽𝔂" |
| Embossed seals | Raised ink, shadows | Official university seals |
| Gold foil elements | Reflective surfaces confuse OCR | Decorative borders, emblems |
| Handwritten signatures | Cursive writing | Official signatures |
| Aged documents | Faded ink, yellowed paper | Historical certificates |
| Small text on fabric | Size constraints, texture | Product labels (2cm × 5cm) |

### Specific Challenge: Fabric Labels

**Problem:** Product safety certifications sewn into garments (2cm × 5cm label):

```
┌────────────────┐
│ Certified Safe │  ← Too small for registration marks
│ Intertek.com   │  ← Standard fonts work
│ verify:...     │
└────────────────┘
```

**Solution:** User-guided framing instead of registration marks:
1. App shows targeting reticle
2. User aligns label within frame manually
3. OCR processes just the framed region
4. Works without registration marks

See [Use_Case-Product_Labeling.md](Use_Case-Product_Labeling.md) lines 79-99.

### Challenge: Thermal Receipt Fading

**Problem:** Thermal receipts fade over months/years:

**Original (2024):**
```
In-N-Out Burger
Total: $45.67
```

**After 6 months (2024):**
```
In-   ut Bur  r     ← Faded sections
Tot  : $  .67      ← Partial readability
```

**Solutions:**
1. **Hybrid approach** - Print both verifiable text AND QR code with same hash
2. **Immediate scanning** - Scan receipt when issued (before fading)
3. **Photo archive** - Store high-resolution photo alongside hash
4. **Longer retention** - Restaurant keeps hash valid for 7+ years even if receipt fades

See [Use_Case-Sales_Receipts.md](Use_Case-Sales_Receipts.md) lines 106-124.

### Future: On-Device AI (2026+)

**Apple Intelligence, Google Gemini, Samsung Galaxy AI** will handle:
- Ornate certificates with decorative fonts
- Handwritten signatures and notes
- Aged documents with faded ink
- Multiple languages simultaneously
- Complex layouts with background patterns

**Still 100% on-device** - maintains privacy guarantee.

See [README.md: Privacy-First Architecture](README.md#privacy-first-architecture-why-client-side-ocr-matters) for detailed discussion.

---

## Standard Libraries & Native Integration

As the ecosystem matures, the processing pipeline (text capture → normalization → hashing → verification) becomes a candidate for standardization at the OS or library level.

**Inevitable Library Availability:**
We anticipate that native libraries for **iOS, Android, Windows, macOS, and Linux** will eventually be made available (by OS vendors or trusted third parties) to handle this pipeline atomically. Similarly, **JavaScript and WebAssembly (WASM)** versions will provide these capabilities for browser-based environments, allowing web-first applications to participate in the ecosystem.

**Core Capabilities:**
These libraries will encapsulate the entire flow:
1.  **Text Capture:** Secure, optimized camera access for text regions.
2.  **Normalization:** Rigorous implementation of the ruleset (e.g., [NORMALIZATION.md](docs/NORMALIZATION.md)) to guarantee hash consistency.
3.  **Hashing:** Cryptographically secure hashing (SHA-256/512) with salt management.
4.  **GET Processing:** Handling the verification network request securely.
5.  **Outcome Display:** Rendering the result (verified/revoked) in a trusted UI component.

**Non-Vetoable Judgment:**
Crucially, the library itself indicates the verification judgment to the human user. This judgment (e.g., a green "Verified" shield or a red "Revoked" warning) is a **non-vetoable aspect of the library**. The calling application cannot intercept, suppress, or modify this final status display. This ensures that a malicious app cannot perform the verification and then lie to the user about the result.

**Caution: The "Content Rectangle" Authenticity Gap**
For web-based implementations (JavaScript/WASM), developers must exercise caution regarding where the verification outcome is displayed.
- **Inauthentic Display:** Rendering a "Verified" checkmark or status message inside the **content rectangle** (the HTML DOM of the page itself) is inherently spoofable. Just as it would be inauthentic for the HTML content of a page to claim "This website is secure," it is untrustworthy for a page to declare its own verification success within its own layout.
- **Trusted Display:** Higher trust is achieved when the outcome is displayed within the **"Browser Chrome"** (e.g., via a trusted browser extension or the address bar) or a **Native OS Overlay** that the underlying page content cannot manipulate. This aligns with platform standards for security indicators; for example, browser vendors place "Not Secure" warnings outside the viewport to lend authenticity to the judgment (see [Chrome's guidance on secure UI](https://developer.chrome.com/blog/avoid-not-secure-warn)).
- **Platform Judgment:** The goal is to move the "judgment of truth" from the untrusted content to the trusted platform (OS or Browser).

**Standardized Capability & Testing:**
To ensure cross-platform interoperability, these libraries will likely be validated against a **Shipped Set of Test Cases**.
-   **Purpose:** To prove that an Android library produces the exact same hash for a given physical document as an iOS or WASM library.
-   **Mechanism:** A certification suite containing reference images, raw OCR outputs, and expected final hashes. Any library purporting to support the standard must pass 100% of these cases to be considered compliant.

---

## Deployment Architecture: Air-Gapped Originals, Public Hashes

### The Protocol Property: Decoupled Security and Availability

Most verification systems force a tradeoff: either the plaintext is accessible (so verification works) or the plaintext is secured (so verification doesn't). Live Verify eliminates this tradeoff. The system holding the original records — names, amounts, diagnoses, criminal histories, classified data — can sit at whatever security posture the jurisdiction, regulator, or organization requires. The verification endpoint only ever sees hashes. **The security posture of the plaintext and the availability of verification are completely independent.**

This is not a deployment recommendation. It is an inherent property of one-way hashing. The hash is the same whether it was generated on an air-gapped machine in a SCIF or on a laptop in a coffee shop. The protocol doesn't care. The verification is always a public GET against a hash.

### The Plaintext Security Spectrum

Organizations choose where their plaintext registry sits based on regulatory requirements, threat model, and operational constraints:

| Level | Network Posture | Hash Transfer | Typical Use |
|-------|----------------|---------------|-------------|
| **Air-gapped** | No network connection. Physically isolated. | USB drive, one-way data diode, physical media | Military, intelligence, nuclear, national security |
| **Network-isolated** | Private network, no internet route | One-way gateway, unidirectional transfer appliance | Government classified systems, central banks, critical infrastructure |
| **VPC-isolated** | Cloud-hosted, private subnet, no public ingress | Internal pipeline to public-facing bucket/database | Regulated industries, healthcare networks, financial institutions |
| **VPN-accessible** | On the internet but reachable only via authenticated VPN | Hashes published to a separate public endpoint | Healthcare systems, corporate HR, legal case management |
| **Access-controlled** | On the internet with authentication/authorization | Hashes on a separate public endpoint | Most commercial deployments, SaaS providers, universities |

Every level produces the same public verification experience: a GET request, a hash lookup, a status response. The person scanning a document in a parking lot has no idea — and no need to know — whether the plaintext registry is in an air-gapped vault or a cloud database.

**Why this matters:**

- **Government mandates:** A jurisdiction can require that criminal record plaintext never touch the internet, while still allowing police clearance certificates to be publicly verifiable. The protocol supports this by design — it doesn't need to be engineered around the mandate.
- **Regulatory compliance:** HIPAA, GDPR, and financial regulations impose requirements on where and how PII is stored and accessed. The plaintext registry must comply. The hash endpoint doesn't contain PII and operates outside those constraints.
- **Defense and intelligence:** Classified personnel records, security clearances, and operational authorities can generate verifiable credentials without exposing the classified systems to any network that touches the public internet.
- **Selling point vs. mandate:** For some organizations, the air-gap is a competitive differentiator — "your data never leaves our secure facility." For others, it's a legal requirement. The protocol accommodates both without any change to the verification mechanism.

**The critical invariant:** Regardless of where on the spectrum the plaintext sits, the flow is always one-way: plaintext → hash generation → hash publication. The public tier never queries back into the private tier. The private tier never receives inbound connections from the verification service. Hashes flow out. Nothing flows in.

### The Security Model

**Critical principle for organizations:** The hash database should be completely separate from the original credential data.

**What's sensitive (private tier - secure zone):**
- Original credential records (graduate names, degree details, photos)
- Student information systems, medical license databases
- Personally identifiable information (PII)
- Application data, correspondence, supporting documents

**What's public (public-facing tier - verification service):**
- Just the hashes and their verification status (OK/REVOKED)
- No names, no details, no PII
- Hash reveals nothing about the document content (one-way function)

**12-factor / cloud-native perspective:**
- Verification service: stateless, auto-scaling, treats hash database as attached resource (backing service)
- Hash database: managed service (DynamoDB, Cloud SQL, etc.) or static storage (S3, Cloud Storage)
- Config: environment variables for database connection strings
- Security: VPC/security groups, IAM roles, not traditional "DMZ"

### Production Architecture

**Recommended deployment pattern:**

```
┌─────────────────────────────────────────┐
│  PRIVATE TIER (Secure Zone)            │
│  • Air-gapped or VPC-isolated          │
│  • No public internet access           │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │ Original Records Database       │   │
│  │ • Graduate names, details       │   │
│  │ • Degree types, honors, dates   │   │
│  │ • Photos, signatures            │   │
│  └─────────────────────────────────┘   │
│              │                          │
│              │ Hash generation          │
│              │ (batch or real-time)     │
│              ▼                          │
│  ┌─────────────────────────────────┐   │
│  │ Hash Generator                  │   │
│  │ • Reads original records        │   │
│  │ • Applies normalization         │   │
│  │ • Computes SHA-256 hashes       │   │
│  │ • Generates static files OR     │   │
│  │ • Syncs to verification database│   │
│  └─────────────────────────────────┘   │
│              │                          │
└──────────────┼──────────────────────────┘
               │ One-way transfer
               │ (hashes only, no PII)
               ▼
┌─────────────────────────────────────────┐
│  PUBLIC-FACING TIER                    │
│  • Exposed to internet                 │
│  • Stateless, auto-scaling             │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │ Verification Data Store         │   │
│  │ (Backing Service)               │   │
│  │ • Static files (S3/CDN) OR      │   │
│  │ • Database (DynamoDB, Cloud SQL)│   │
│  │ • {hash} → status only          │   │
│  │ • No names, no PII              │   │
│  └─────────────────────────────────┘   │
│              │                          │
│              │ HTTPS requests           │
│              ▼                          │
│  ┌─────────────────────────────────┐   │
│  │ Verification Service            │   │
│  │ • Stateless (12-factor)         │   │
│  │ • Static server OR serverless   │   │
│  │ • Config via environment vars   │   │
│  │ • Public internet access        │   │
│  └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

### Why This Matters

**If the hash database is compromised:**
- Attacker gets a list of SHA-256 hashes
- Hashes are one-way (cannot reverse to get names/details)
- No PII exposed, no privacy breach
- Worst case: Attacker knows "these credentials exist" but not who they belong to

**If the original records database is compromised:**
- This is a serious breach (PII exposed)
- But: Air-gapping makes this much harder to achieve
- The hash database remains unaffected (different system)

### Deployment Option 1: Static Files

**Simple, scalable, zero database vulnerabilities:**

Generate static files in the secure zone, transfer to DMZ:

```bash
# In secure zone, run once per day/week:
./generate-hashes.sh

# Creates:
# public/c/abc123.../index.html  → {"status":"verified"}
# public/c/def456.../index.html  → {"status":"verified"}
# public/c/xyz789.../index.html  → {"status":"revoked"}

# Transfer to public-facing tier (one-way sync):
rsync -av --delete public/ public-server:/var/www/degrees/
# Or: aws s3 sync public/ s3://degrees-bucket/

# Public server just serves static files - no database, no queries
```

**Benefits:**
- No database in public tier (nothing to query, nothing to steal)
- Infinitely scalable (CDN can cache everything)
- No SQL injection, no database vulnerabilities
- Can't be compromised to modify statuses (read-only filesystem / object storage)
- Cheap to host (GitHub Pages, Cloudflare Pages, S3 + CloudFront, Cloud Storage + CDN)

### Hash Updates: One-Way Flow

**When a credential status changes (revoked, suspended):**

1. **Private tier:** Update status in original records database
2. **Private tier:** Regenerate affected hash file(s)
3. **Transfer:** Push updated static files to public tier
4. **Public tier:** Overwrite old files (or blue/green deployment)

**Never:** Allow public tier to query back into private tier
**Never:** Store PII in public-facing services
**Never:** Allow public internet to reach secure zone

### Example: University Degree Verification

**University of Edinburgh deploys like this:**

**Private tier (internal network, VPC-isolated):**
- Student records database (Oracle, PostgreSQL, whatever)
- Alumni data, graduation dates, honors, photos
- Generate hashes nightly: `cron: 0 2 * * * /usr/local/bin/generate-degree-hashes.sh`
- Creates 50,000 static files (one per graduate)
- Transfers to public tier via one-way sync (rsync, S3 sync, etc.)

**Public-facing tier (degrees.ed.ac.uk):**
- Static hosting (Nginx, Apache, S3+CloudFront, Cloud Storage+CDN)
- 50,000 tiny files: `/c/{hash}/index.html` containing `{"status":"verified"}`
- If student's degree is revoked: file contents change to `{"status":"revoked"}`
- No database, no application server, no state (12-factor backing service pattern)

### Cost and Scale

**Static file approach scales incredibly well:**

- **10,000 graduates:** 10,000 tiny files (~50 bytes each = 500 KB total)
- **100,000 graduates:** 100,000 files (~5 MB total)
- **1,000,000 graduates:** 1M files (~50 MB total)

**Hosting cost:** $0 (GitHub Pages) to $1-5/month (Cloudflare, AWS S3)

**Performance:** CDN caches everything, sub-10ms response times globally

### Deployment Option 2: Dynamic Database

**Sophisticated, flexible, real-time updates:**

Many organizations prefer a database in the DMZ for dynamic queries:

```
DMZ:
  ┌─────────────────────────┐
  │ Read-Only Hash Database │
  │ • PostgreSQL, DynamoDB  │
  │ • Hash → Status lookup  │
  │ • No PII, just hashes   │
  └─────────────────────────┘
           │
           ▼
  ┌─────────────────────────┐
  │ Serverless Function     │
  │ • AWS Lambda            │
  │ • Cloudflare Workers    │
  │ • Queries hash database │
  └─────────────────────────┘
```

**Advantages of dynamic approach:**
- **Real-time updates:** Revoke a credential, instant effect (no file regeneration)
- **Scale:** Millions of credentials without filesystem limits
- **Flexibility:** Complex queries (e.g., "all credentials issued in 2024")
- **Analytics:** Track verification counts, geographic patterns, peak times
- **Metadata:** Return dynamic info (last verified timestamp, verification count)
- **Standards:** Many organizations already have database expertise/infrastructure
- **Granular control:** Per-hash access logging, rate limiting, abuse detection

**Tradeoffs vs static:**
- Need to secure database (SQL injection, access control, etc.)
- Slightly higher hosting cost ($10-50/month vs $0-5/month)
- More complex infrastructure (database + application server/serverless)
- Database is a target (though still only contains hashes, no PII)

**Critical security rule (same as static):**
- Database in DMZ contains **only hashes + statuses**
- No PII, no names, no details
- Air-gapped secure zone generates the data
- One-way flow: secure zone → DMZ (never reverse)

**Popular serverless stacks for dynamic approach:**
- **AWS:** DynamoDB (hash table) + Lambda (API) + CloudFront (CDN)
- **Google Cloud:** Firestore + Cloud Functions + Cloud CDN
- **Azure:** Cosmos DB + Azure Functions + Front Door
- **Cloudflare:** Workers KV (edge database) + Workers (serverless)

These architectures auto-scale, have built-in security, and cost pennies per million requests.

### Choosing Between Static and Dynamic

**Both approaches are valid.** Choose based on your needs:

| Factor | Static Files | Dynamic Database |
|--------|-------------|------------------|
| **Simplicity** | ✅ Extremely simple | ⚠️ More complex |
| **Cost** | ✅ $0-5/month | ⚠️ $10-50/month |
| **Scale** | ✅ Up to ~1M files | ✅ Unlimited |
| **Update speed** | ⚠️ Batch (hourly/daily) | ✅ Real-time |
| **Security surface** | ✅ Read-only files | ⚠️ Database to secure |
| **CDN caching** | ✅ Perfect for CDN | ⚠️ Cache invalidation needed |
| **Analytics** | ❌ No tracking | ✅ Full analytics |
| **Expertise needed** | ✅ Basic web hosting | ⚠️ Database + app server |
| **Failure modes** | ✅ Few moving parts | ⚠️ DB/app can fail |

**Common choices:**
- **Universities:** Static (simple, cheap, sufficient for daily/weekly updates)
- **Medical boards:** Dynamic (real-time revocations critical)
- **Government DMVs:** Dynamic (millions of licenses, frequent updates)
- **Small certifiers:** Static (hundreds of certs, rarely revoked)
- **Financial institutions:** Dynamic (analytics, audit trails, compliance)

**Hybrid approach (best of both):**

Some sophisticated organizations use both:

```
Secure Zone:
  └─> Generate hashes
       ├─> Push to static CDN (fast, global, cached)
       └─> Sync to database (analytics, real-time admin)

Public queries:
  └─> CDN serves static files (99% of traffic, cached)

Admin/analytics:
  └─> Database API (real-time stats, not public)
```

This gives CDN speed + database flexibility without exposing the database to public traffic.

### Disaster Recovery

**If DMZ is completely destroyed:**
1. Original records are safe (air-gapped)
2. Regenerate all hashes from secure zone
3. Redeploy to new DMZ infrastructure
4. Back online within hours

**If secure zone is compromised (worst case):**
1. Hash database in DMZ continues serving (verification still works)
2. Restore secure zone from backups
3. Investigate breach, revoke affected credentials
4. Regenerate hashes, push updates to DMZ

### Summary: Separation of Concerns

**Original documents:** Never lose these. Air-gapped, backed up, secured.

**Hash database:** Can be public-facing, static files, cheaply hosted. If stolen, reveals nothing (hashes are one-way).

**The magic:** Public can verify credentials without ever accessing the private data. Universities, medical boards, governments can offer instant verification without exposing student/patient/citizen records.

---

## Independent Witnessing & Stateful Verification

While the underlying text of a claim is static, its **legal or financial standing** can change over time.

### Stateful Verification

A verification endpoint can return different statuses during the lifecycle of a document.

**Example: Hotel Receipt Lifecycle**
1.  **Day 0 (Checkout):** Guest receives receipt for $500. Hash endpoint returns `{"status": "verified"}`.
2.  **Day 3 (Dispute):** Guest complains about a broken AC. Hotel agrees to a $100 refund.
3.  **Day 4 (Update):** The hotel updates their internal system. The **same hash** endpoint now returns `{"status": "AMENDED"}` (or `PARTIAL_REFUND`).

This allows external parties (like corporate finance or tax authorities) to see the *current* reality of a claim even if they only possess the *original* document. Note that specific refund amounts are typically NOT returned in the JSON to preserve privacy; the status change simply signals that the original total is no longer the final net amount.

### Independent Witnessing Services

To prevent issuers from "rewriting history" (e.g., deleting a verification record to hide a mistake), some implementations use a **Secondary Witness**.

**How it is communicated:**
There are two primary methods for identifying the witness service:

1.  **Explicitly on the document:** The physical document includes a second line or alias:
    ```
    verify:hotel-chain.com/c
    witness:independent-audit.org/w
    ```
2.  **Discovery via Issuer Response:** The primary verification GET request returns the witness URL as metadata in its response:
    ```json
    {
      "status": "verified",
      "witness": "https://independent-audit.org/w"
    }
    ```

**How it works:**
1.  **Issuance:** When the issuer creates the document, they send the hash to an independent third-party service (the Witness).
2.  **Anchoring:** The Witness stores the hash and a timestamp, often "anchoring" it to a public ledger (blockchain or certificate transparency log).
3.  **Verification:** The verifier app primarily checks the issuer's endpoint for current status. If witness information is available, the app provides an **option** to also check the Witness service to prove the document existed and was valid on its claimed issuance date.

**Benefits & Reasons for Existence:**
-   **Immutable Timestamps (Neutral Ground):** Proves a receipt or certificate wasn't backdated by the issuer or holder. The Witness provides a non-repudiable "Proof of Existence" at a specific point in time.
-   **Anti-Deletion / Issuer Longevity:** If an issuer goes out of business, deletes their records, or is compromised, the Witness service remains as a neutral proof that the document was once authoritative.
-   **Collusion Resistance:** Prevents an issuer and holder from colluding to create a "fake historical" record. If it wasn't witnessed on day zero, it can't be claimed as valid on day 100.
-   **Anti-Dishonesty (Conflict of Interest):** Prevents an issuer who is also the "Payor" from later denying a valid claim for financial gain. For example, if a Lottery Commission informs a user they won a jackpot via a digital or printed receipt, an independent witness prevents the Commission from later deleting the record or claiming "no one won" to keep the prize money.
-   **Audit Integrity:** Provides a neutral "third party" for resolving disputes between two parties (e.g., Guest vs. Hotel) without requiring one to trust the other's internal database.
-   **Public Transparency (Optional):** For government or high-stakes certifications, a Witness can publish hashes to a public ledger, allowing anyone to verify the volume and issuance rate of credentials without seeing PII.

---

## Sector-Specific Implementation Nuances

This section addresses practical considerations for specific organization types.

### Healthcare Facilities: The Credentialing Complexity

**Key Nuance:** Healthcare adds regulatory layers that hotels don't have.

- **Credential Verification vs. Identity Verification:** Your patients need to know both "who is this person?" (identity) and "are they licensed?" (credential). The e-Ink badge solves the second; photo handles the first. Budget time for staff training that this is *not* the same as traditional photo ID checks
- **License Boards Integration:** If you want real-time license status (suspended, expired, active), you need to either:
  - Partner with state medical/nursing boards for API access (complex, 3-6 months)
  - Pre-generate badge hashes daily from board data (requires daily hash rebuilds)
  - Use hash-based status (simpler, but less real-time)
- **Abusive Patient Escalation:** You will get calls from staff saying "A patient scanned my badge 10 times in 2 hours." Rate limiting prevents this at the app level, but you need security/HR procedures to actually *respond*. Budget time for legal review of harassment policy *before* deployment
- **HIPAA Audit Log Retention:** Your audit logs documenting "Dr. Smith was verified at 2:15 PM in CCU" are medical records. They stay for 6 years minimum under HIPAA. Budget data storage; don't assume it's negligible
- **Timeline Expectation:** Healthcare implementation is 12-18 months (vs. 6-12 months for hotels), mostly due to regulatory review and credentialing integration

### Police Departments: The Officer Safety Paradox

**Key Nuance:** Verification helps citizens, but exposes officers to doxing. You must solve this or face officer resistance.

- **Privacy-Protective Claim vs. Badge Display:** The breakthrough is that your badge can show "Officer A 1332" (for identification) but the verification claim never includes the badge number. Instead, it verifies "NYC Police Department officer, active duty, authorized for traffic enforcement" (anonymized, role-based). This is *the* critical architectural choice. Without this, you cannot ethically deploy to officers working organized crime, narcotics, or undercover
- **Rotating Salt Non-Negotiable:** If your police department issues static badges with permanent hashes, you've created a searchable database. A suspect verifies an officer's hash, then can verify it repeatedly to track the officer's movements (Brixton, then Peckham, then Westminster = movement trail). You must use ephemeral hashes (10-minute rotation) or officers will resist
- **Federal vs. Local:** FBI, ATF, and federal agents have even higher operational security needs. If you deploy to federal LEO, your verification system cannot expose operational assignment or task force affiliation. Design around this from day one
- **Citizen Verification Expectations:** Not all citizens will understand why they can verify an officer is real but can't see the officer's full name. Budget time for public education. Some will feel this is "opaque." Address this in your messaging
- **Timeline Expectation:** 9-15 months, heavily back-loaded with officer buy-in and operational security review

### Hotels & Vacation Rentals: The Counterfeiting Problem

**Key Nuance:** Your biggest risk is printed counterfeits. E-Ink doesn't help if counterfeits are in circulation.

- **Badge Replacement Logistics:** When you switch to e-Ink, you have old plastic badges in circulation. You need a *sunset policy* — plastic badges stop working on Date X. Without this, guests see both types and may not understand which is real. Budget 3-6 months to get all staff switched over; shorter timelines will have parallel authentication confusion
- **Guest Training:** Not all guests will carry phones or understand how to scan. Some will ask staff to do it for them (defeats the purpose). Budget time for signage ("You can scan our staff badges using the hotel app") and guest education
- **Turnover Reality:** If you have 50% staff turnover annually, issuing new badges for half your staff every year is normal ops. If you have 20% turnover, badge distribution isn't a burden. Know your baseline
- **Third-Party Contractors:** Housekeeping, maintenance, laundry, food service contractors may not want e-Ink badges if they work multiple hotels. Will you mandate it? Provide it? Ensure contracts allow it? This is an underestimated friction point
- **Timeline Expectation:** 6-10 months for hotels (shorter than healthcare/police because fewer regulatory constraints)

### Residential Buildings & Apartment Management: The Burden of Proof

**Key Nuance:** You're asking residents to trust a system they didn't choose, for contractors they didn't hire.

- **Resident Adoption:** Unlike hotels, residents have limited incentive to scan contractor badges if they're expecting the work. The value proposition ("Are you sure you want to let a stranger in?") only works if residents are naturally skeptical. Know your resident demographics before deploying
- **Work Order Integration:** For e-Ink verification to work, your badge system must tie to your work order system. A contractor shows up with badge for unit 412 on Friday 9-5, but there's no work order in the system. Now the resident won't let them in *correctly*, but you have a service gap. Budget time for integrating badges with your maintenance scheduling software
- **Contractor Resistance:** Many plumbers, electricians, and HVAC companies work multiple buildings. They won't want separate badges for each. Provide lanyards, centralized distribution, or other solutions to reduce friction
- **Insurance & Liability:** If a contractor commits theft and claims "But I was verified, so that proves I was authorized," your insurance may have questions. Work with your insurance and legal counsel on liability implications *before* deployment
- **Timeline Expectation:** 8-12 months (contractor coordination adds friction)

### Event Venues & Hospitality: The Temporary Logistics Challenge

**Key Nuance:** You're managing hundreds of workers you'll never see again. Verification is useful, but only if you have a process to issue badges quickly.

- **Just-In-Time Badge Printing:** Unlike permanent staff, event contractors arrive 2-3 days before setup. You don't have time for a 3-week badge process. You need *rapid printing* (24 hours or less) or a kiosk system for on-site badge generation. Budget for this upfront
- **Multi-Company Coordination:** If setup involves 5 different contractors (security, catering, AV, talent handlers, event staff), they all need badges issued by 5 different companies. Who coordinates? Who enforces policy? One company won't adopt if others don't, and vice versa. This is a *coordination problem*, not a technology problem
- **Post-Event Badge Destruction:** After the event, you have 500 single-use e-Ink badges. Do you recycle? Destroy? Store? Budget for disposal and secure destruction (GDPR/privacy regulation applies)
- **Timeline Expectation:** 6-9 months to implement, but with higher ongoing logistics burden (each event = badge coordination cycle)
# Technical Concepts: Live Verify

This document explains technical concepts referenced across multiple use case documents. Some sections are canonical (full content here); others are stubs linking to newer, more detailed documents.

## Table of Contents

**Canonical sections:**
1. [Registration Marks](#registration-marks)
2. [Domain Binding](#domain-binding)
3. [Hash Algorithms](#hash-algorithms)
4. [OCR Challenges](#ocr-challenges)
5. [Standard Libraries & Native Integration](#standard-libraries--native-integration)
6. [Deployment Architecture](#deployment-architecture-air-gapped-originals-public-hashes)

6. [Owner-Initiated Re-Salting with Timeout (OIRST)](#owner-initiated-re-salting-with-timeout-oirst)
7. [Verification-Consumed Re-Salting (VCRS)](#verification-consumed-re-salting-vcrs)
8. [PIN-Protected Verification](#pin-protected-verification)
9. [Multi-Page Document Manifests](#multi-page-document-manifests)

**Stubs (see linked docs for detail):**
7. [Text Normalization](#text-normalization) → [NORMALIZATION.md](NORMALIZATION.md)
8. [Response Formats](#response-formats) → [Verification-Response-Format.md](Verification-Response-Format.md)
9. [Photo Encoding](#photo-encoding) → [Verification-Response-Format.md](Verification-Response-Format.md)
10. [Dynamic Badges](#dynamic-badges--worker-verification) → [e-ink-id-cards.md](../public/e-ink-id-cards.md)
11. [Witnessing](#independent-witnessing--stateful-verification) → [WITNESSING-THIRD-PARTIES.md](WITNESSING-THIRD-PARTIES.md)
12. [Sector-Specific Nuances](#sector-specific-implementation-nuances) (condensed table)
13. [Legal Witnessing Future Architecture](legal-witnessing-future-architecture.md) — hash-based witnessing ceremonies with three attestation roles

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
1. **Computer vision** detects contours (outlines of shapes)
2. Finds the largest quadrilateral (4-sided polygon)
3. Extracts the region inside this quadrilateral
4. Sends extracted region to on-device OCR (Apple Vision on iOS, Google ML Kit on Android)

**Why needed:**
- **Prevents OCR of wrong text** - Without registration marks, OCR might process the entire page (headers, footers, adjacent text)
- **Improves accuracy** - Knowing the boundary helps OCR focus on the relevant region
- **Enables perspective correction** - Can detect tilted documents and rotate them

**Standard implementation:**
- **Border width:** 3px solid black (CSS: `border: 3px solid black;`)
- **Variance testing:** Some training pages use 10px borders to test robustness
- **Detection algorithm:** Contour detection with area thresholding (native CV frameworks on iOS/Android)

**Alternative approaches:**
- **Corner marks only** - ┌ └ ┐ ┘ instead of full border (saves ink)
- **Proximity to `verify:` URL** - If no registration marks, just OCR text near the `verify:` line
- **QR code hybrid** - Use QR code to indicate scannable region boundaries

The `bachelor-thaumatology-square.html` training page demonstrates decorative text OUTSIDE the scannable area.

---

## Text Normalization

**Why needed:** OCR engines may introduce inconsistencies (extra spaces, line breaks, case variations). Normalization ensures the same text always produces the same hash.

See [NORMALIZATION.md](NORMALIZATION.md) for the complete specification, including per-document normalization via `verification-meta.json`, character and OCR normalization schemas, line-by-line processing rules, and the SHA-256 hash computation pipeline.

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

See [domain-authority.js](../public/domain-authority.js) for implementation.

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

## Owner-Initiated Re-Salting with Timeout (OIRST)

**Problem:** For some document types, the inputs to the hash are publicly guessable. If an attacker knows the document format and can guess the content (e.g., a famous racehorse's name, sire/dam, and registration number are all in public databases), they can compute the hash themselves and probe the verification endpoint. This enables enumeration attacks — mapping which high-value assets exist at which locations, or confirming that a specific animal/person/asset has a current credential.

**When OIRST is needed:** When all three conditions are met:
1. **Guessable inputs** — The document content can be reconstructed from public information (racing databases, auction catalogues, public registries, company filings).
2. **High-value target** — Confirming the credential's existence creates a real-world incentive for theft, fraud, or surveillance.
3. **Persistent endpoint would be dangerous** — A hash that never expires gives attackers unlimited time to probe.

**When OIRST is NOT needed:** When document content has high entropy that cannot be guessed — microchip numbers, DNA profile references, internal serial numbers, or multi-generation registered names for pets. Standard persistent verification endpoints are fine in these cases.

### How It Works

1. **Holder requests a verification link.** The holder — the registered owner, or a delegate they have authorized (trainer, syndicate manager, solicitor, estate agent) — logs into the registry's portal or app and requests a time-limited verification for a specific asset.

2. **Registry generates a fresh salt.** The registry creates a new random salt, prepends or appends it to the document content, computes the hash, and publishes it at a new endpoint. The salt is embedded in the verification link itself (as a path segment or query parameter), so the verifier's app can reconstruct the salted hash from the document text.

3. **Registry sets a TTL.** The endpoint is configured to return 404 after a short window (e.g., 24-48 hours). The TTL is chosen by the issuer and may be configurable by the owner within issuer-defined bounds.

4. **Holder sends the link.** The holder shares the verification link with the prospective buyer/inspector via email, RCS, WhatsApp, or any messaging channel.

5. **Buyer verifies within the window.** The buyer scans or clips the document and verifies against the ephemeral endpoint. The app handles the salted hash transparently — the buyer experience is identical to standard verification.

6. **Endpoint expires.** After the TTL, the endpoint returns 404. The salt is discarded. No permanent hash exists to enumerate.

### Properties

- **No permanent attack surface.** There is no long-lived hash for an attacker to discover or probe at leisure.
- **Holder controls disclosure.** Verification is only available when the holder (or their authorized delegate) explicitly chooses to share it, and only for the duration they choose.
- **Each interaction is independent.** Every prospective buyer gets a unique link with a unique salt. Links cannot be accumulated to build an inventory map.
- **Audit trail.** The registry can log who requested verification, when, and (optionally) for whom — creating a record of interest in the asset.
- **No change to verifier experience.** The buyer's app works identically; the salt is carried in the link, not entered manually.

### Link Format

The ephemeral link carries the salt so the verifier's app can reconstruct the hash:

```
verify:registry.example.com/c?s=a8f3e9b1
```

The app:
1. Extracts salt `a8f3e9b1` from the query parameter
2. Reads the document text, normalizes it
3. Computes `SHA-256(salt + normalizedText)` (or as specified in `verification-meta.json`)
4. Requests `https://registry.example.com/c/{saltedHash}`
5. Endpoint returns `{"status":"verified"}` (within TTL) or 404 (expired)

### Example Use Cases

| Domain | Why OIRST | Typical TTL |
|--------|-----------|-------------|
| **Thoroughbred pedigrees** | Horse names, sire/dam, registry IDs are public. Confirming a champion stallion's location enables targeted theft. | 24-48 hours |
| **Bloodstock insurance** | Insured values for named horses are high-value intelligence for fraud syndicates. | 24-48 hours |
| **High-value livestock** | Prize bulls and breeding stock worth $100K+ are theft targets; locations are sensitive. | 48-72 hours |
| **Art authentication** | Confirming a specific artwork's provenance certificate exists at a location enables targeted burglary. | 24 hours |
| **High-net-worth personal assets** | Jewellery valuations, classic car certifications — confirming existence and location. | 24 hours |

### Comparison with Other Salt Patterns

| Pattern | Salt Lifetime | Who Controls | Trigger | Use Case |
|---------|--------------|--------------|---------|----------|
| **No salt** | N/A | N/A | N/A | High-entropy documents (pet pedigrees, medical records with internal IDs) |
| **Persistent salt** | Permanent | Issuer | Issuance | Documents where enumeration risk is low but content is partially guessable |
| **Time-Rotating salt** | Minutes | Device/Issuer | Clock (every N minutes) | Physical e-Ink badges needing anti-replay (police, delivery workers) |
| **OIRST** | Hours/days | Holder | Holder requests link | High-value assets where the holder controls when verification is available |
| **VCRS** | Single use | Automatic | Successful verification | Credentials where each check should be fresh; prevents replay of intercepted links |

See also: [Dynamic Badges](../public/e-ink-id-cards.md) for time-rotating and VCRS patterns in worker verification, and [Breed Pedigree and Registration](../public/use-cases/breed-pedigree-registration.md) for the OIRST motivating use case.

---

## Verification-Consumed Re-Salting (VCRS)

**Problem:** Some credentials should not survive verification. Once a verifier has confirmed authenticity, the hash should be burned — preventing replay by anyone who intercepted, screenshotted, or forwarded the verification link.

**When VCRS is needed:** When any of these conditions apply:
1. **Single-use verification moments** — The credential is presented once to one verifier at one point in time (customs checkpoint, call verification, doorstep check).
2. **Replay is the primary threat** — An attacker who obtains a valid verification link (screenshot, forwarded message, shoulder-surfing) could use it to impersonate the credential holder.
3. **The holder can easily obtain a fresh hash** — Either automatically (e-Ink badge syncs a new salt after scan) or on demand (holder taps a button to regenerate).

**When VCRS is NOT needed:**
- Documents that multiple independent parties need to verify at different times against the same hash (university degrees, professional licenses with persistent endpoints).
- High-volume public credentials where burning after each check would create unacceptable friction.

### How It Works

1. **Issuer publishes a salted hash** at the verification endpoint (salt may be time-rotating or holder-initiated — VCRS is compatible with both).
2. **Verifier scans/clips the credential** and the app queries the endpoint.
3. **Endpoint returns `{"status":"verified"}`** (or other valid status).
4. **Endpoint burns the hash.** After a short grace period (e.g., 60 seconds — to handle network retries and allow the verifier's app to fully render the result), the endpoint returns 404 for that hash.
5. **A new salt is generated.** Either automatically (badge syncs new salt via Bluetooth) or on holder request (OIRST-style).

### Properties

- **Anti-replay.** A screenshotted or forwarded verification link is worthless — by the time the attacker uses it, the hash is already burned.
- **Anti-surveillance.** Historical hashes return 404. No one can retroactively confirm that a credential was verified at a specific time and place.
- **Efficient.** Unlike time-based rotation (which churns through salts whether or not anyone scans), VCRS only generates a new salt when needed. A badge sitting idle in a pocket consumes zero salt cycles.
- **Composable.** VCRS works alongside time-based rotation as a belt-and-suspenders approach (as in e-Ink badges), or standalone for non-badge credentials.

### Example Use Cases

| Domain | Why VCRS | Re-salt mechanism |
|--------|----------|-------------------|
| **E-Ink badges (police, delivery, utility)** | Photographed badge must be useless within seconds | Automatic: badge syncs new salt via Bluetooth after scan |
| **Inbound call verification** | Deputy's SMS hash should be single-use; screenshotted verification can't be replayed by scammer | Automatic: system generates fresh hash per call |
| **Art in transit** | Each customs checkpoint burns the hash; courier must request fresh verification from shipper for next checkpoint | Holder-initiated: shipper generates new OIRST link per checkpoint |
| **High-security facility access** | Visitor credential verified at gate; same credential can't be re-presented at a second entrance | Automatic: facility system burns hash on successful gate scan |
| **One-time prescription fills** | Pharmacy verifies prescription; burned hash prevents same script being presented at a second pharmacy | Automatic: prescriber system burns hash on successful fill verification |

### VCRS + Time-Rotating (Belt and Suspenders)

For e-Ink badges, both patterns run simultaneously:

| Trigger | What happens | Why |
|---------|-------------|-----|
| **Successful scan** | Salt rotates after 60-second grace period | Burns the current hash so a photograph is immediately useless |
| **10-minute timer** | Salt rotates regardless | Handles the case where a badge is photographed but never scanned — the timer ensures the photo expires even without a verification event |

Time-based rotation is the safety net; VCRS is the primary defense. Most badge interactions will be VCRS-driven, with the timer only firing during idle periods.

### VCRS + OIRST (Sequential)

For high-value asset verification (art, racehorses), the two patterns chain naturally:

1. Holder generates an OIRST link (salted, time-limited) and sends it to the buyer
2. Buyer verifies — VCRS burns the hash immediately
3. If the buyer needs to re-verify (e.g., brought a partner to inspect), the holder generates a new OIRST link

The TTL acts as a backstop (hash expires even if never used), while VCRS ensures a used hash can't be replayed within the TTL window.

---

## Response Formats

Verification endpoints return JSON with a `status` field. The simplest case: `GET https://degrees.ed.ac.uk/c/{hash}` returns `{"status":"verified"}` (200 OK) or 404 (not found). Richer responses can include issuer name, dates, base64-encoded photos, and revocation status.

See [Verification-Response-Format.md](Verification-Response-Format.md) for the complete specification, including the "never echo claim content" principle, universal and sector-specific status codes, photo encoding rationale, and the `verification-meta.json` schema for custom response types.

---

## Photo Encoding

Photos are embedded as Base64 in the JSON response, not served via URL. This prevents enumeration attacks (iterating `/photos/1.jpg`, `/photos/2.jpg`...), eliminates tracking, and enables offline display.

See [Verification-Response-Format.md](Verification-Response-Format.md) for the full rationale, the photo opt-out mechanism for government IDs, and the JSON schema.

---

## Dynamic Badges & Worker Verification

For high-volume use cases (delivery drivers, utility workers, police officers), the "document" being verified is a **dynamic e-Ink badge** with a rotating salt synced via Bluetooth. The salt rotates every 10 minutes, preventing photograph-and-replay attacks. A photocopy of a badge stops working within minutes.

See [e-ink-id-cards.md](../public/e-ink-id-cards.md) for the complete specification: hardware architecture, salt mechanics, anti-cloning/anti-tracking properties, six use cases (police, delivery, utility, social services, hotel staff, residential buildings), privacy tiers, and when e-Ink badges are and aren't necessary.

---

## OCR Challenges

**Current on-device OCR (Apple Vision, Google ML Kit)** works reliably with:

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

See [Product_Labeling.md](../deep-dives/Product_Labeling.md) lines 79-99.

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

See [Sales_Receipts.md](../deep-dives/Sales_Receipts.md) lines 106-124.

### Future: On-Device AI (2026+)

**Apple Intelligence, Google Gemini, Samsung Galaxy AI** will handle:
- Ornate certificates with decorative fonts
- Handwritten signatures and notes
- Aged documents with faded ink
- Multiple languages simultaneously
- Complex layouts with background patterns

**Still 100% on-device** - maintains privacy guarantee.

See [README.md: Privacy-First Architecture](../README.md#privacy-first-architecture) for detailed discussion.

---

## Standard Libraries & Native Integration

As the ecosystem matures, the processing pipeline (text capture → normalization → hashing → verification) becomes a candidate for standardization at the OS or library level.

**Inevitable Library Availability:**
We anticipate that native libraries for **iOS, Android, Windows, macOS, and Linux** will eventually be made available (by OS vendors or trusted third parties) to handle this pipeline atomically. Similarly, **JavaScript and WebAssembly (WASM)** versions will provide these capabilities for browser-based environments, allowing web-first applications to participate in the ecosystem.

**Core Capabilities:**
These libraries will encapsulate the entire flow:
1.  **Text Capture:** Secure, optimized camera access for text regions.
2.  **Normalization:** Rigorous implementation of the ruleset (e.g., [NORMALIZATION.md](NORMALIZATION.md)) to guarantee hash consistency.
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

Verification endpoints can return different statuses over time (e.g., a hotel receipt goes from `verified` to `AMENDED` after a refund). To prevent issuers from rewriting history, some implementations use an independent witnessing service that anchors hashes with timestamps.

See [WITNESSING-THIRD-PARTIES.md](WITNESSING-THIRD-PARTIES.md) for the complete model: party roles (issuer, recipient, verifier, witness), anti-deletion and collusion resistance, blockchain anchoring, and the three verification paths.

---

## Sector-Specific Implementation Nuances

Implementation timelines and key friction points vary by sector. These are planning estimates, not technical specifications — the individual use case files in [public/use-cases/](../public/use-cases/) have the technical details.

| Sector | Timeline | Key Friction |
|--------|----------|-------------|
| **Healthcare** | 12–18 months | Regulatory review, license board integration, HIPAA audit log retention (6 yr minimum), staff training that credential verification ≠ identity verification |
| **Police** | 9–15 months | Officer doxing risk (must use anonymized role-based claims, not badge numbers), rotating salt non-negotiable (prevents movement tracking), federal agencies need higher OPSEC |
| **Hotels** | 6–10 months | Badge sunset policy for old plastic badges, guest training, third-party contractor resistance (work multiple hotels) |
| **Residential buildings** | 8–12 months | Resident adoption (low incentive if expecting the work), work order system integration, contractor resistance, insurance/liability questions |
| **Event venues** | 6–9 months | Just-in-time badge issuance (24 hr turnaround), multi-company coordination problem, post-event badge destruction (GDPR) |

See also [e-ink-id-cards.md](../public/e-ink-id-cards.md) for the privacy tiers and risk assessment across these sectors.

---

## PIN-Protected Verification

**Problem:** Some document types are sensitive enough that the hash alone should not be sufficient to retrieve the verification status. A bank statement, a medical record, or a trust deed contains information that — while not recoverable from the hash — the holder may not want anyone with access to the document to verify without their knowledge or consent. The hash is a credential: if someone has the document (or a photo of it), they can compute the hash and query the endpoint. For certain document classes, the holder should be able to gate that query with a PIN.

**When PIN protection is needed:**
1. **Holder consent required** — The holder wants to know when and by whom their document is being verified (e.g., a patient's medical record, a client's trust deed)
2. **Access control beyond possession** — Having the document should not automatically grant verification access (e.g., a stolen bank statement shouldn't be verifiable by the thief)
3. **Selective disclosure** — The holder shares the PIN with specific parties (their solicitor, their fund manager) and withholds it from others

**When PIN protection is NOT needed:**
- Public credentials (professional licenses, company registrations) — verification should be frictionless
- Documents where the hash alone is already high-entropy and non-sensitive (university degrees, receipts)
- E-Ink badges and other real-time credentials — adding a PIN would defeat the purpose of instant verification

### How It Works

1. **Issuer declares PIN requirement** in `verification-meta.json`:

```json
{
  "issuer": "Meridian National Bank",
  "claimType": "BankStatement",
  "pinRequired": true,
  "pinDescription": "4-6 digit PIN set by the account holder"
}
```

2. **Holder sets or receives a PIN** when the document is issued. The PIN may be chosen by the holder, assigned by the issuer, or derived from an existing credential (e.g., the last 4 digits of the account number).

3. **Verifier's app detects PIN requirement** by reading `verification-meta.json` for the domain. Before making the GET request, the app prompts the verifier to enter the PIN.

4. **PIN is sent as an HTTP header** on the GET request:

```
GET /statements/a3f2b8c9d4e5f6a7... HTTP/1.1
Host: meridian-national.bank.us
X-Verify-Pin: 8834
```

5. **Endpoint evaluates PIN + hash together:**
   - Correct PIN + valid hash → `200 OK` with `{"status": "verified"}`
   - Wrong PIN (regardless of hash validity) → `404 Not Found`
   - No PIN header (on a PIN-required endpoint) → `404 Not Found`

### Why 404 for Wrong PIN (Not 401 or 403)

A wrong PIN returns `404` — the same response as "hash not found." This is deliberate:

- **No information leakage:** An attacker probing with a valid hash but no PIN cannot distinguish "hash exists but PIN wrong" from "hash doesn't exist." There is no signal to confirm the document is real.
- **No brute-force signal:** A 401 or 403 would confirm the hash exists and invite PIN guessing. A 404 gives nothing to work with.
- **Consistent with the protocol's existing semantics:** 404 already means "cannot verify this document." Wrong PIN is functionally the same — the endpoint cannot verify the document for this requester.

### Rate Limiting

PIN-protected endpoints should apply stricter rate limiting than standard endpoints:

- **Per-hash rate limiting:** After N failed attempts (e.g., 5) for the same hash within a time window, the endpoint should temporarily block further attempts for that hash. The response is still `404` — no signal that a limit was hit.
- **Global rate limiting:** Standard per-IP / per-ASN rate limiting applies as for any endpoint.

### Configuring via verification-meta.json

The `pinRequired` field is a boolean. When `true`, verifier apps must prompt for a PIN before making the GET request. The `pinDescription` field is a human-readable hint displayed to the verifier (e.g., "Enter the 4-digit PIN provided by the account holder").

```json
{
  "issuer": "Meridian National Bank",
  "claimType": "BankStatement",
  "pinRequired": true,
  "pinDescription": "4-6 digit PIN set by the account holder"
}
```

### PIN on Physical Documents

For camera mode, the PIN is not printed on the document — that would defeat the purpose. The holder communicates the PIN to the verifier separately: verbally, via a messaging channel, or as part of a secure handoff. The verifier's app prompts for the PIN after OCR captures the text, before making the verification request.

### Interaction with Other Patterns

| Pattern | Compatible with PIN? | Notes |
|---------|---------------------|-------|
| **OIRST (time-limited salt)** | Yes, but redundant | OIRST already gates access via holder-controlled ephemeral links. Adding a PIN is belt-and-suspenders. |
| **VCRS (single-use)** | Yes, but unusual | The hash is already burned after one use. A PIN adds little. |
| **allowedDomains** | Yes | Domain checking and PIN are orthogonal — one checks where the claim is displayed, the other gates who can verify it. |
| **Multi-page manifests** | Yes | Each page's GET requires the same PIN. |
| **Static file hosting** | **No** | PIN verification requires server-side logic. Static file hosts (GitHub Pages, S3) cannot evaluate a PIN header. PIN-protected endpoints must use dynamic hosting. |

### Example Use Cases

| Document | Why PIN | Who Gets the PIN |
|----------|---------|-----------------|
| **Bank statements** | Prevents a stolen statement from being verified by the thief, confirming the account is real and active | Account holder shares PIN with mortgage broker |
| **Medical records** | Patient controls who can verify their health records | Patient shares PIN with new doctor or insurer |
| **Trust deeds** | Settlor/trustees control who can confirm the trust's existence and status | Trustees share PIN with fund manager during KYC |
| **Tax returns** | Taxpayer controls who can verify their filing status | Taxpayer shares PIN with landlord for rental application |
| **Salary confirmations** | Employee controls who can verify their compensation | Employee shares PIN with mortgage lender |

### Time-Limited PINs and Regulatory Lodgement

The most powerful variant of PIN-protected verification combines a **time-limited PIN** with **regulatory pre-caching** — allowing a regulator to lock in a verification result during the PIN window, so that months later at audit, the evidence is already there.

#### The Scenario

A high-net-worth individual, James R. Whitfield, is onboarding with Machina Capital, a quant hedge fund based in Paris. Machina Capital needs source-of-wealth verification. Whitfield banks with Meridian National Bank in the US.

**Step 1 — Whitfield gets a time-limited PIN from his bank.**

Whitfield logs into Meridian National's online banking and requests a verification PIN. The bank generates a PIN valid for 6 hours:

```
PIN: 27323
Valid: 2026-04-05 09:00 UTC to 2026-04-05 15:00 UTC
Scope: Source of wealth summary — account statements
```

The bank publishes a one-page source-of-wealth summary as a verifiable claim on its endpoint. The PIN gates access to the verification.

**Step 2 — Machina Capital verifies the document.**

Whitfield shares the document and the PIN with Machina Capital's compliance team. They clip the source-of-wealth summary and verify it:

```
GET /statements/7abe7d19b3ba13296ce5a2bbe6cde9a280579865a8bd434ef14460423c4e2a57 HTTP/1.1
Host: meridian-national.bank.us
X-Verify-Pin: 27323

→ 200 OK
→ {"status": "verified"}
```

Machina Capital records the verification result internally: document verified, timestamp, issuer domain.

**Step 3 — Machina Capital lodges the verification with the regulator.**

Machina Capital submits a lodgement to the Autorité des marchés financiers (AMF) — not the plaintext of the document, just:

| Field | Value |
|-------|-------|
| **Verification URL** | `https://meridian-national.bank.us/statements/7abe7d19...` |
| **PIN** | `27323` |
| **Date/time of verification** | `2026-04-05T10:14:22Z` |
| **Regulated entity** | Machina Capital SAS (AMF #GP-2019-0847) |

Crucially, **not** lodged: the plaintext, the client's name, the reason for verifying, or any other identifying information at this stage. The lodgement is a minimal record: "we verified this URL with this PIN at this time."

**Step 4 — AMF's systems verify within the PIN window.**

AMF's automated compliance system receives the lodgement and — within the same 6-hour PIN window — makes its own GET request:

```
GET /statements/7abe7d19b3ba13296ce5a2bbe6cde9a280579865a8bd434ef14460423c4e2a57 HTTP/1.1
Host: meridian-national.bank.us
X-Verify-Pin: 27323

→ 200 OK
→ {"status": "verified"}
```

AMF stores the result: **verified**, at this URL, at this timestamp. The PIN is discarded — it's no longer needed. AMF now has an independent, first-hand verification receipt.

**Step 5 — Six months later: audit.**

AMF is auditing Machina Capital. The sampling strategy selects the Whitfield onboarding. Questions are asked: "How did you come to approve this client?"

Machina Capital now turns over the **plaintext** of the claims that were verified — the source-of-wealth summary text. The meridian-national.bank.us endpoint no longer accepts the old PIN (it expired 6 months ago), so re-verification is impossible. But AMF doesn't need to re-verify — **they already did**, within the PIN window, and stored the result.

AMF's audit tool confirms: "Verification of `meridian-national.bank.us/statements/7abe7d19...` was performed by AMF systems on 2026-04-05T10:18:41Z. Result: VERIFIED. Lodged by Machina Capital SAS at 2026-04-05T10:14:22Z."

If the lodgement was never made, or the PIN was invalid, or the URL returned 404 — AMF has no stored verification. The excuses and apologies start.

#### Why This Matters

**For the high-net-worth individual:** Personal financial details are never exposed to the regulator at onboarding time. The regulator gets a verification receipt — "this bank confirms the claims in this document" — but not the document itself. The plaintext is only disclosed later, during a specific audit, under regulatory compulsion. This is a significant privacy improvement over the current model where fund managers routinely share client bank statements with regulators proactively.

**For the fund manager:** The lodgement is proof of diligence. At audit, the fund manager can demonstrate: "We verified this document, we lodged the verification with you within hours, and your own systems confirmed it." This is stronger evidence than "we have a PDF in our files."

**For the regulator:** The pre-cached verification is first-hand evidence. AMF didn't take Machina Capital's word that the document was verified — AMF verified it independently, using the same PIN, within the same window. The regulator's verification receipt is their own, not a copy of the fund manager's.

**For the banking industry and privacy advocates:** Time-limited PINs address the objection that universal verification erodes personal secrecy. The account holder controls when and for how long the verification window is open. Outside the window, the endpoint returns 404 regardless of hash. The PIN is not permanent — it is a consent mechanism with a built-in expiry.

#### The "Failing Bank Account Verification" Problem

Current KYC processes rely on the client providing bank statements as PDFs. These PDFs are trivially forged. A [video demonstration](https://www.youtube.com/shorts/FyWTzZXiZeo) shows how easily fake bank statements pass manual review. If every onshore country mandated Live Verify for bank account verification, this class of fraud would be eliminated — the forged statement's hash wouldn't exist at the bank's endpoint.

The resistance comes from high-net-worth individuals who perceive any bank verification mandate as erosion of financial privacy. Time-limited PINs counter this: the verification is only available when the account holder explicitly opens the window, for a duration they control, for a specific purpose. The bank sees who requested the PIN (audit trail). The account holder can refuse to generate a PIN at all — though a fund manager who cannot verify source of wealth may decline to onboard.

#### Implementation Notes

**PIN expiry and endpoint behavior:**

Whether a PIN is permanent or time-limited is an issuer-side decision — the verifier app doesn't need to know. The `verification-meta.json` declares `pinRequired: true` and a `pinDescription` hint; the description can mention the time limit in human-readable terms (e.g., "Time-limited PIN from online banking"). The app's behavior is the same either way: prompt for PIN, send it as the `X-Verify-Pin` header with the GET of the hash, process the result.

After a time-limited PIN expires, the endpoint returns 404 for all requests with that hash — whether the PIN was once valid, is incorrect, or is missing. All of those yield wholly identical responses. The hash itself may remain in the bank's system (the statement is still real), but it is no longer accessible without a fresh PIN.

**What AMF lodges vs. what it doesn't:**

| Lodged at onboarding | NOT lodged at onboarding |
|---------------------|-------------------------|
| Verification URL (including hash) | Plaintext of the document |
| PIN (used once, discarded after AMF verifies) | Client name or identity |
| Timestamp of fund manager's verification | Reason for verification |
| Identity of the regulated entity (fund manager) | Account balances or transaction details |

The plaintext is disclosed only at audit, under regulatory authority, to the specific auditor examining the specific client. This is a meaningful privacy boundary.

**Regulator's verification tool:**

AMF's system for processing lodgements and performing automated verification is operationally simple — a queue that processes incoming lodgements, makes the GET request with the PIN header, stores the result, and discards the PIN. The tool described in [fca-audits-and-batch-audit-tools.md](fca-audits-and-batch-audit-tools.md) covers the audit-day verification scenario; this lodgement pattern covers the **pre-audit evidence accumulation** scenario.

---

## Multi-Page Document Manifests

**Problem:** Many real-world documents are multi-page — bank statements, contracts, medical records, insurance policies. A verifier may clip (select) text from just one page. How does the system communicate that the verified page is part of a larger document, and provide integrity for the whole?

**Solution: Page manifests with a composite hash.** Each page is independently hashable. The issuer also computes a composite hash — the SHA-256 of all page hashes concatenated in order (a Merkle-like root). When a verifier checks any single page, the response includes a `manifest` indicating which page they verified, how many pages exist, and the composite hash of the complete document.

### Terminology

| Term | Meaning |
|------|---------|
| **Page hash** | SHA-256 of a single page's normalized text |
| **Composite hash** | SHA-256 of all page hashes concatenated in page order — covers the whole document |
| **Manifest** | The metadata in the verification response that describes the document's page structure |

**Why "manifest":** The term is established in software (JAR manifests, cargo manifests, IIIF manifests for digitized documents) and means exactly this — an inventory of parts with their integrity hashes plus a root hash for the whole.

**Why not other terms:**
- **"Collection"** — implies unrelated, heterogeneous items. A bank statement's pages aren't a collection; they're ordered parts of one document.
- **"Bundle"** — informal, no prior art in integrity/hashing contexts.
- **"Tree"** — too implementation-specific; exposes the Merkle structure to the verifier who doesn't need to know.

**Why "compositeHash":** The field name should immediately tell a human reader "this hash is composed from multiple parts" without being jargon-heavy. Alternatives considered: `rootHash` (accurate but Merkle jargon), `fullHash` (ambiguous), `wholeDocumentHash` (verbose), `combinedHash` (vague). "Composite" signals "made up of parts" at a glance.

### Response Format

When a verifier clips page 1 of a 4-page bank statement:

```json
{
  "status": "verified",
  "manifest": {
    "compositeHash": "e8b7c2...sha256 of all four page hashes concatenated...",
    "totalPages": 4,
    "thisPage": 1
  }
}
```

This tells the verifier three things:
1. **Page 1 is authentic** — the hash they computed matches the issuer's record
2. **It belongs to a 4-page document** — they're not seeing the complete picture
3. **The complete document has composite hash `e8b7c2...`** — if they verify all 4 pages, they can independently confirm they're looking at the same document, not pages cherry-picked from different statements

### Computing the Composite Hash

The composite hash is computed by concatenating page hashes in page order and hashing the result:

```
pageHash1 = SHA256(normalizedText of page 1)
pageHash2 = SHA256(normalizedText of page 2)
pageHash3 = SHA256(normalizedText of page 3)
pageHash4 = SHA256(normalizedText of page 4)

compositeHash = SHA256(pageHash1 + pageHash2 + pageHash3 + pageHash4)
```

Where `+` is string concatenation of the hex-encoded hashes. This is a flat Merkle tree (one level) — simple to implement, simple to explain, and sufficient for documents with a small number of pages. A deeper tree structure adds no practical benefit for typical document sizes (2–50 pages).

### Use Cases

| Document | Typical Pages | Why Manifest Matters |
|----------|--------------|---------------------|
| **Bank statement** | 2–8 | Verifier clips one transaction; manifest shows it's part of a complete statement |
| **Insurance policy** | 10–30 | Verifier clips the coverage summary; manifest confirms the full policy is intact |
| **Contract** | 5–50 | Verifier clips a specific clause; manifest proves the clause belongs to the complete, unaltered contract |
| **Medical record** | Variable | Verifier clips a diagnosis page; manifest shows it's part of a complete record, not an isolated excerpt |
| **Court filing** | 3–20 | Verifier clips the ruling; manifest proves it's part of the full filing |

### Partial vs. Complete Verification

The manifest enables a spectrum of verification confidence:

- **Single page verified:** "This page is authentic and belongs to a 4-page document." Sufficient for many purposes (e.g., checking a specific transaction on a bank statement).
- **All pages verified independently:** The verifier can concatenate the page hashes they computed and confirm the result matches `compositeHash`. This proves the entire document is intact and unaltered.
- **Some pages verified:** The verifier knows which pages they've checked and which they haven't. They can make a risk-based decision about whether partial verification is sufficient.

### Design Principles

1. **Minimal response** — the manifest adds only three fields. No page content is echoed.
2. **No mandatory full verification** — the verifier decides how many pages to check based on their risk tolerance.
3. **Independent page hashes** — each page stands alone for verification. The composite hash is additive assurance, not a prerequisite.
4. **Page order matters** — the composite hash is sensitive to page ordering, preventing reordering attacks (e.g., swapping pages to change a contract's meaning).
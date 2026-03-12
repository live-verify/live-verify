# Why Human-Readable Text Is the Right Verification Primitive

Verification systems face a fundamental design choice: **what is the unit of truth?**

QR codes, barcodes, NFC chips, and blockchain anchors all answer the same way: the truth lives in a machine-readable artifact that humans cannot inspect. Live Verify takes the opposite position: **the text humans already read IS the verification input.** No secondary artifact. No opaque payload. No trust gap.

This is not a tradeoff — it is a strictly better architecture for any document whose primary audience is human.

## The QR Code Problem

QR codes are popular. They are also fundamentally wrong for document verification:

- **Opaque by design.** Humans cannot read a QR code. They must scan it, then trust whatever URL or data the scanner reveals. A QR code on a fake degree could point to `degrees-edinburgh-verify.com` (a phishing site). The user must then manually check the browser's address bar — a step most people skip.

- **Context disconnection.** A QR code sits next to text but is not derived from it. A fake document can carry a valid QR code pointing to a real (but unrelated) verification page. The QR code says "something is verified" — but not *what*.

- **Visual pollution.** A CV with five verifiable claims would need five QR codes. A medical license wallet card has no room for one. An ornate university degree looks absurd with a QR code on it.

- **Privacy inversion.** QR codes either (a) encode all data publicly in the code itself, or (b) link to databases anyone can scrape. Both leak information to anyone with a camera, not just the intended verifier.

Live Verify has none of these problems. The interviewer reads "Edinburgh University, First Class Honours in Computer Science" on a CV. If they want to verify, they select the text. The hash is computed from what they just read. The domain in the `verify:` URL tells them who is attesting — before they even click. No scanning, no redirects, no address bar inspection.

## The Blockchain Non-Problem

Blockchain verification solves a problem that does not exist here.

Universities already have trusted domains (`degrees.ed.ac.uk`). Hospitals already have trusted domains. Governments already have trusted domains. The trust anchor is DNS + HTTPS infrastructure that has worked for decades.

| Dimension | Blockchain Verification | Live Verify |
|-----------|------------------------|-------------|
| Trust anchor | Distributed consensus | Issuer's domain (DNS/TLS) |
| Cost per verification | Transaction fees (variable) | ~$0.000005 (static file hosting) |
| Speed | Seconds to minutes | Milliseconds |
| Infrastructure | Nodes, wallets, gas | Static files on any CDN |
| Human readability | None (hash on chain) | The document text itself |

Blockchain adds complexity, cost, and latency without solving a real problem. The issuer is already known and trusted — that is the entire point of a credential.

## Decision Framework

**Ask one question:** *Would a human need to read and understand this text for the document to serve its primary purpose?*

**YES → Live Verify is correct:**

| Criterion | Why | Examples |
|-----------|-----|----------|
| Human readability is primary | Document exists for humans to read | CVs, certificates, legal documents |
| Professional appearance matters | Visual clutter is unacceptable | Formal certificates, letters, licenses |
| Multiple independent claims | Each claim verified separately | Degree + employers + certifications |
| Privacy required | Only the person holding the document should verify | No public registry of graduates |
| Text already exists | Verification IS the text, not an addition to it | The degree claim is the text itself |

**NO → Use QR/barcode:**

| Criterion | Why | Examples |
|-----------|-----|----------|
| Machine processing is primary | Humans don't read it | Shipping labels, inventory tags |
| Space is constrained | No room for text + registration marks | Specimen tubes, tiny labels |
| Speed is critical | Instant scan, no OCR | Boarding passes, event tickets |
| Already machine-focused | Barcode infrastructure exists | Retail POS, package tracking |

This is not a competition. QR codes are excellent for logistics, inventory, and machine-to-machine workflows. Live Verify is correct for documents that humans read.

## Where Live Verify Is Unambiguously Right

- Academic degrees and certificates
- Professional licenses (medical, legal, engineering — wallet cards and wall certificates)
- Employment verification letters
- Government IDs — for non-government verifiers (hotel check-in, traffic stop, pub entry)
- Court documents, notarized attestations
- Birth/death certificates, legal documents
- Tax receipts for expense claims (prevents double-expensing)
- Safety certifications, medical certifications
- Financial crime compliance documents (SARs, KYC, sanctions attestations)

## Where QR Codes Are Unambiguously Right

- Shipping labels (barcodes already dominate, speed matters, machine-only)
- Price tags (retail barcode infrastructure is universal)
- Event tickets (speed of entry is critical)
- Component traceability (tiny labels, machine scanning)
- Gift cards (barcode/magnetic stripe infrastructure exists)

## The Hybrid Case

Some scenarios benefit from both:

- **Live Verify + timestamp anchoring** (RFC 3161 or Merkle root anchoring) for independent time/immutability proof
- **Live Verify + Verifiable Credentials** for cryptographic signatures alongside human-readable print
- **Live Verify + QR/NFC** for speed while retaining a human-verifiable pathway

When to layer:

| Need | Approach |
|------|----------|
| High legal weight / non-repudiation | Digital signatures (PAdES) + Verifiable Credentials; add Live Verify for human inspection and offline fallback |
| High-volume scanning | QR/barcodes for throughput; add Live Verify to keep a human-verifiable pathway and reduce redirect spoofing |
| Field verification with privacy | Live Verify alone — no PII transmission, works in browser or on phone, issuer hosts a simple OK/REVOKED endpoint |
| Anti-clone physical goods | NFC-secured labels; optionally pair with printed Live Verify declarations for paperwork |

## Existing Verification Technologies

Live Verify does not replace all of these. It occupies a specific and previously empty niche.

**Established technologies:**

| Technology | Strength | Limitation for human-readable documents |
|------------|----------|----------------------------------------|
| PKI / digital signatures (X.509, PAdES, CAdES) | Strong cryptographic authenticity | Requires key management, user tooling, heavyweight workflows |
| Barcodes / QR codes (GS1, PDF417) | High-volume machine reading | Opaque to humans, redirect risk |
| Holograms / security printing | Physical anti-counterfeiting | Costly, not cryptographic, still forgeable |
| Smartcards / ePassports (ICAO 9303) | Strong cryptographic identity at borders | Requires NFC hardware readers |
| eIDAS / ESIGN / UETA platforms | Legal enforceability + audit trails | Vendor lock-in, account-based verification |

**Emerging technologies:**

| Technology | Promise | Current limitation |
|------------|---------|-------------------|
| W3C Verifiable Credentials + DIDs | Issuer-signed, holder-presented, selective disclosure | Browser wallet adoption still maturing |
| Selective disclosure (BBS+, SD-JWT, zk-SNARKs) | Prove predicates without revealing raw data | Early stage |
| Hash anchoring (Guardtime KSI, Hedera HCS, Ethereum) | Independent timestamping and tamper evidence | Born-digital only, no physical bridge |
| SBOM attestation (Sigstore, in-toto, SLSA) | Software supply chain integrity | Software artifacts only |
| On-device AI OCR | Robust private OCR for ornate documents | Hardware still catching up (see [ocr-limitations.md](ocr-limitations.md)) |

**What Live Verify uniquely provides:**

1. **Human-readable text as verification input** — not a secondary machine artifact
2. **Zero PII leakage** — only the hash leaves the device
3. **No keys for end users** — no wallets, no certificates, no accounts
4. **Works for both digital and printed documents** — Clip mode (browser) and Camera mode (phone)
5. **Web-native** — static file hosting, standard HTTPS, works with existing CDN infrastructure
6. **Issuer-controlled, revocable** — HTTP 200 today, 404 tomorrow

No other technology combines all six. That is why this exists.

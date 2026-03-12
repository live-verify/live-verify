# Live Verify

**Verify digital and printed claims**

![Jest and Playwright tests, then deploy to GitHub Pages](https://github.com/paul-hammant/live-verify/actions/workflows/deploy.yml/badge.svg)
![License](https://img.shields.io/badge/license-Apache--2.0-blue)

**Issuer-attested verification of on-screen and printed claims.** Select text on screen or scan it on paper — both produce instant cryptographic verification.

Anyone can verify any document presented to them — no special equipment, no credentials, no calling during business hours, no issuer relationship required.

"Verified" means the issuer's domain currently stands behind this exact text (and it's revocable). The verifier chooses whether the issuer domain is an authority for the claim.

## Privacy-First Architecture

**All processing happens on your device. No exceptions.**

| Step | What happens | Where |
|------|-------------|-------|
| Text captured | Selected (Clip) or OCR'd from camera (Camera) | On device |
| Normalized | Whitespace, Unicode, issuer-specific rules | On device |
| Hashed | SHA-256 computed | On device |
| Verified | Only the hash sent via HTTPS GET | Network |
| **PII transmitted** | **None. Ever.** | — |

This is architecturally non-negotiable. Cloud OCR services see your degree certificates, medical licenses, salary receipts, and passport photos. Live Verify never does. The verification endpoint receives a hash — a one-way fingerprint that reveals nothing about the document.

On-device AI (Apple Vision, ML Kit, NPUs) continues to improve OCR accuracy without changing the privacy model. See [docs/ocr-limitations.md](docs/ocr-limitations.md) for the trajectory.

## How It Works

The `verify:` line in a document signals that verification is available. The pipeline: **text → normalize → hash → HTTP GET**.

**Example (Clip mode):** An HR manager receives a CV claiming "MSc Computer Science, Edinburgh University" with a `verify:degrees.ed.ac.uk/c` line. They select the text, right-click "Verify this claim," and see "VERIFIED by degrees.ed.ac.uk" — instant confirmation without calling the university.

**Example (Camera mode):** A colleague pays for lunch, scans the receipt with their phone. The receipt's `verify:` line triggers on-device OCR → hash → verification. The restaurant confirms: "Yes, this receipt is authentic."

![](https://live-verify.github.io/live-verify/screenshots/hotel-receipt-scheidegg.png)

Both modes follow the same core pipeline. See [docs/how-it-works.md](docs/how-it-works.md) for detailed flowcharts and design principles (multi-page documents, nested hashes, domain transparency).

Unlike QR codes, Live Verify binds the **visible text itself** to the verification — if you change the text, the hash changes, and verification fails. See [docs/text-is-king.md](docs/text-is-king.md) for the full comparison with QR codes, blockchain, and other verification technologies.

## Platform Integration

Live Verify works today as a browser extension and mobile app. It is designed to become a **platform primitive** — recognized natively by operating systems, browsers, email clients, and document viewers.

| Platform | Integration Point | What they already ship |
|----------|-------------------|----------------------|
| **Apple** | Live Text recognizes `verify:` in rendered text and images | Vision framework, Live Text, Apple Intelligence |
| **Google** | Lens offers "Verify this document" action | ML Kit, Google Lens, Gmail smart chips |
| **Microsoft** | Edge, Outlook, and Word detect `verify:` lines | Microsoft Lens, Windows OCR API, Copilot |
| **Adobe** | Acrobat Reader shows verification panel alongside digital signatures | Acrobat, Adobe Scan, Document Cloud |

The integration is architecturally simple: detect the `verify:` pattern in text the platform already extracts, compute SHA-256 (already available in every platform's crypto library), and make one HTTPS GET. No SDK, no API key, no partnership required.

**No backend cost for platform vendors.** Issuers host their own verification endpoints. Platforms provide client-side recognition only.

See [docs/platform_integration.md](docs/platform_integration.md) for vendor-specific integration details, engineering effort estimates, and business cases.

## Reference Implementations

| Tool | Mode | Status | Source |
|------|------|--------|--------|
| **Browser extension** (Chrome, Edge, Firefox) | Clip | Reference implementation | [`apps/browser-extension/`](apps/browser-extension/) |
| **iOS app** | Camera | Reference implementation | [`apps/ios/LiveVerify/`](apps/ios/LiveVerify/) |
| **Android app** | Camera | Reference implementation | [`apps/android/`](apps/android/) |
| **Thunderbird extension** | Clip (email) | Reference implementation | [`apps/thunderbird/`](apps/thunderbird/) |
| **Examples page** | Clip (in-page) | Live demo | [Try it](https://live-verify.github.io/live-verify/examples/) |

## Use Cases

If a claim is aimed at humans reading it — whether digital or printed — it is a candidate for Live Verify.

**Full searchable catalog:** https://live-verify.github.io/live-verify/use-cases/

**Deep-dive essays:**

1. **[Education Credentials](deep-dives/Educational_Degrees.md)** — degree verification with privacy-preserving public registries
   <img src="https://live-verify.github.io/live-verify/screenshots/bachelor-thaumatology.png" width="200"> <img src="https://live-verify.github.io/live-verify/screenshots/master-applied-anthropics.png" width="200"> <img src="https://live-verify.github.io/live-verify/screenshots/doctorate-high-energy-magic.png" width="200">

2. **[B2B Product Certifications](deep-dives/Product_Labeling.md)** — Preventing supplier impersonation fraud
3. **[Receipt Verification](deep-dives/Sales_Receipts.md)** — Eliminating duplicate expense claims
   <img src="https://live-verify.github.io/live-verify/screenshots/uk-coffee-shop.png" width="150"> <img src="https://live-verify.github.io/live-verify/screenshots/us-burrito-shop.png" width="150"> <img src="https://live-verify.github.io/live-verify/screenshots/hotel-receipt-scheidegg.png" width="150"> <img src="https://live-verify.github.io/live-verify/screenshots/us-home-improvement.png" width="150">

4. **[Medical Licenses](deep-dives/Medical_License.md)** — Revocable credentials with domain-binding security
   <img src="https://live-verify.github.io/live-verify/screenshots/medical-license-revoked.png" width="200">

5. **[Government ID Verification](deep-dives/Government_IDs.md)** — Cryptographic checks for hotel check-in, traffic stops, pub entry
   <img src="https://live-verify.github.io/live-verify/screenshots/driving-license-nordia-svg.png" width="250">

6. **[Voting Ballot Proof](deep-dives/Voting_Proof.md)** — Verifiable vote counting with independent auditor confirmation

## Quick Start

**Try it now:** Visit the [examples page](https://live-verify.github.io/live-verify/examples/) and install the browser extension.

**Clip mode (browser extension):**
1. Install from `apps/browser-extension/` ([instructions](apps/browser-extension/))
2. Select claim text including the `verify:` line
3. Right-click → "Verify this claim" (or Cmd/Ctrl+Shift+V)

**Camera mode (phone):**
1. Install the iOS app (`apps/ios/LiveVerify/`) or Android app (`apps/android/`)
2. Point camera at a document with registration marks + `verify:` line

**Run locally:**
```bash
cd public && python3 -m http.server 8000
```

No `npm install` needed for the web demo — pure HTML/CSS/JS.

## For Issuers

Organizations creating verifiable documents need to:
1. Generate and normalize certification text
2. Compute SHA-256 hash
3. Host a verification endpoint returning HTTP 200 + `{"status":"verified"}` for valid hashes

Infrastructure cost: ~$5 per million verifications.

See [docs/issuer-guide.md](docs/issuer-guide.md) for the complete implementation guide, including `verification-meta.json` configuration, authority chains, retention law declarations, and a worked recruitment portal example.

## Commercialization

This isn't patent-locked, and the protocol is intentionally simple. The commercial opportunity is execution: issuer adoption, integrations, and operations.

- **Issuer Registry SaaS**: integrate with systems of record, publish hashes, support revocation, provide response-code meaning pages, meet governance/compliance expectations.
- **Verifier Ops SaaS**: managed app/SDK distribution, device management, allowlists of issuer domains, optional caching and logging/retention controls (where authorized).

## Tech Stack

All verification happens client-side — no PII ever leaves your device.

| Component | Technology |
|-----------|-----------|
| Browser extension | Manifest V3, Web Crypto API (SHA-256), chrome.scripting |
| iOS app | Swift/SwiftUI, Vision framework (OCR), CryptoKit |
| Android app | Kotlin, ML Kit (OCR), CameraX |
| Testing | Jest (59 unit tests), Playwright (16 E2E tests), XCTest |

## Documentation

| Document | Audience | Content |
|----------|----------|---------|
| [docs/platform_integration.md](docs/platform_integration.md) | Platform vendors | Apple/Google/Microsoft/Adobe integration details |
| [docs/issuer-guide.md](docs/issuer-guide.md) | Organizations | Creating verifiable documents, verification-meta.json |
| [docs/how-it-works.md](docs/how-it-works.md) | Developers | Pipeline flowcharts, multi-page docs, design principles |
| [docs/cryptographic-foundations.md](docs/cryptographic-foundations.md) | Technical | SHA-256, Merkle trees, authority chains |
| [docs/text-is-king.md](docs/text-is-king.md) | Everyone | Why text verification vs QR codes, blockchain, etc. |
| [docs/ocr-limitations.md](docs/ocr-limitations.md) | Developers | Camera mode OCR: platform differences, scripts, trajectory |
| [docs/post-verification-actions.md](docs/post-verification-actions.md) | Issuers | Accountability actions, retention headers, acknowledgment |
| [docs/faq.md](docs/faq.md) | Everyone | Common questions and answers |
| [docs/Technical_Concepts.md](docs/Technical_Concepts.md) | Developers | Normalization, domain binding, response formats |
| [docs/NORMALIZATION.md](docs/NORMALIZATION.md) | Implementers | Text normalization specification |
| [docs/Multi_Representation_Verification.md](docs/Multi_Representation_Verification.md) | Issuers | Multiple text representations of one credential |
| [docs/Verification_Charges.md](docs/Verification_Charges.md) | Issuers | Business models for free vs paid verification |
| [BUILDING.md](BUILDING.md) | Developers | Build instructions |
| [TESTING.md](TESTING.md) | Developers | Test documentation |
| [LLM.md](LLM.md) | AI assistants | Complete project context |

## Get Started

**For verifiers:** Install the [browser extension](apps/browser-extension/) or the [iOS](apps/ios/LiveVerify/)/[Android](apps/android/) app.

**For issuers:** Read the [issuer guide](docs/issuer-guide.md). Review [NORMALIZATION.md](docs/NORMALIZATION.md). Check [Verification_Charges.md](docs/Verification_Charges.md).

**For developers:** Clone the repo. Run `npm test`. Read [BUILDING.md](BUILDING.md).

**For platform vendors:** Read [platform_integration.md](docs/platform_integration.md). Try the [live demo](https://live-verify.github.io/live-verify/examples/).

## License

Apache License, Version 2.0 (Apache-2.0)

See LICENSE file for full text.

# Live Verify

**A cheap, global, easy standard for checking any document with whoever issued it.**

- **Cheap, global, easy.** A check is one web lookup against the issuer's own domain: no fees, no central registry, no integration between the two sides, and it works across borders.
- **It needs owners.** A standard like this should be held in committee, as the internet's protocols are at the IETF, by Google, Apple, Microsoft and the others who build the phones, browsers and document viewers people already use. None has taken it up yet; this repository is the working draft offered to them.
- **Each country organises its own.** Within the standard, 190+ countries and international bodies such as the UN and WHO would each arrange the hierarchy of issuers they vouch for. Nobody runs a central list.

![Deploy to GitHub Pages](https://github.com/live-verify/live-verify/actions/workflows/deploy.yml/badge.svg)
![Code License](https://img.shields.io/badge/code-Apache--2.0-blue) ![Content License](https://img.shields.io/badge/content-CC--BY--SA--4.0-lightgrey)

**Issuer-attested verification of on-screen and printed claims.** Select text on screen or scan it on paper — both produce instant cryptographic verification.

Anyone can verify any document presented to them — no special equipment, no credentials, no calling during business hours, no issuer relationship required.

"Verified" means the issuer's domain currently stands behind this exact text (and it's revocable). The verifier chooses whether the issuer domain is an authority for the claim.

## Privacy-First Architecture

**All processing happens on your device. No exceptions.**

| Step                           | What happens                                  | Where     |
|--------------------------------|-----------------------------------------------|-----------|
| Text captured                  | Selected (Clip) or OCR'd from camera (Camera) | On device |
| Normalized                     | Whitespace, Unicode, issuer-specific rules    | On device |
| Hashed                         | SHA-256 computed                              | On device |
| Verified                       | Only the hash sent via HTTPS GET              | Network   |
| Hash reversed to original text | Mathematically impossible                     | —         |
| **Document content transmitted** | **None** — only a hash crosses the wire     | —         |

This is architecturally non-negotiable. Cloud OCR services see your degree certificates, medical licenses, salary receipts, and passport photos. Live Verify never does. The verification endpoint receives a hash, and the document's text never crosses the wire.

**But be precise about what "only a hash" does and does not protect**, because the honest limit matters:

- **Content confidentiality holds unconditionally** — SHA-256 is one-way, so the document text cannot be recovered from the hash. That is not in dispute.
- **Privacy holds only for *unguessable* preimages.** SHA-256's one-wayness is irrelevant when the input is *guessable*. For a low-entropy, templated document — a coffee-shop receipt, a standard licence line, a payslip on a known template — an attacker can enumerate plausible texts, hash each, and `GET` the endpoint: a `200` confirms the guess. The issuer's endpoint becomes a **confirmation oracle**. This is a preimage-entropy problem, not a hashing problem, and "hashing is one-way" does nothing about it. The mitigation is entropy: a document that is *intrinsically high-entropy* — one whose text an attacker cannot plausibly guess because it carries enough unpredictable detail, such as a bank statement (unique account number, exact balances to the penny, specific transaction IDs, precise timestamps) or a detailed itemised receipt — or, for documents that would otherwise be guessable, one carrying a per-document **salt** (a short random string, as the [e-ink badge](public/e-ink-id-cards.md) and other use cases already specify) so its hash cannot be pre-computed or enumerated. See [docs/weaknesses_audit.md](docs/weaknesses_audit.md) for the open items (salt-spec consistency, timing enumeration, a full threat model) this connects to.
- **The lookup pattern still leaks.** Even with high entropy, the issuer learns *which* document was checked, *when*, and *from what IP* — every verification of a medical licence or a benefit letter is logged by the party with the most incentive to profile it. Live Verify does not yet blind this. The known fixes are standard and worth adopting: a **k-anonymity hash-prefix range lookup** (send a prefix, receive a bucket, disambiguate on-device — the approach *Have I Been Pwned* shipped in 2018), an **OPRF** (the issuer answers without learning the input at all), or **batching** to hide which query mattered. These are on the roadmap, not in the protocol today, and the README should not imply otherwise.

So: **no document content ever leaves the device — but "no metadata, ever" would be an over-claim.** Content confidentiality is unconditional; query-privacy depends on preimage entropy and on blinding the lookup, and the latter is future work.

The consolidated, threat-by-threat treatment — trust model, query privacy, DNS/BGP interception, issuer-supplied normalization, the 404 signal, spoofing, post-quantum, with an implemented/proposed/open status on every item — is [docs/SECURITY-CONSIDERATIONS.md](docs/SECURITY-CONSIDERATIONS.md).

On-device AI (Apple Vision, ML Kit, NPUs) continues to improve OCR accuracy without changing the privacy model. See [docs/ocr-limitations.md](docs/ocr-limitations.md) for the trajectory.

## How It Works

The `verify:` line in a document signals that verification is available. The pipeline: **text → normalize → hash → HTTP GET**.

**Example (Clip mode):** An HR manager receives a CV claiming "MSc Computer Science, Edinburgh University, Sarah Chen, 2024" with a `verify:degrees.ed.ac.uk/c` line. They select the text, right-click "Verify this claim," and see "VERIFIED by degrees.ed.ac.uk" — instant confirmation without calling the university. That was clip -> normalize -> hash -> verification (or not)

**Example (Camera mode):** A colleague pays for lunch, scans the receipt with their phone. The receipt's `verify:` line triggers on-device OCR → normalize -> hash → verification (or not). The restaurant systems confirm: "Yes, this receipt is authentic." which might be important to a expenses system, later.

![](https://live-verify.github.io/live-verify/screenshots/hotel-receipt-scheidegg.png)

Both modes follow the same core pipeline. See [docs/how-it-works.md](docs/how-it-works.md) for detailed flowcharts and design principles (multi-page documents, nested hashes, domain transparency).

Unlike QR codes, Live Verify binds the **visible text itself** to the verification — if you change the text, the hash changes, and verification fails. (More precisely: displayed text == hashed text *modulo published, meaning-preserving normalization* — e.g. folding `é→e` for OCR tolerance. That qualifier is meant to stay small; see [docs/NORMALIZATION.md](docs/NORMALIZATION.md#the-invariant--and-the-honest-limit-on-it) for where it's enforced and where it's only intended.) See [docs/text-is-king.md](docs/text-is-king.md) for the full comparison with QR codes, blockchain, and other verification technologies.

## Platform Integration

Live Verify works today as a browser extension and mobile app. It is designed to become a **platform primitive** — recognized natively by operating systems, browsers, email clients, and document viewers.

| Platform      | Integration Point                                                    | What they already ship                          |
|---------------|----------------------------------------------------------------------|-------------------------------------------------|
| **Apple**     | Live Text recognizes `verify:` in rendered text and images           | Vision framework, Live Text, Apple Intelligence |
| **Google**    | Lens offers "Verify this document" action                            | ML Kit, Google Lens, Gmail smart chips, Chome   |
| **Microsoft** | Edge, Outlook, and Word detect `verify:` lines                       | Microsoft Lens, Windows OCR API, Copilot        |
| **Adobe**     | Acrobat Reader shows verification panel alongside digital signatures | Acrobat, Adobe Scan, Document Cloud             |

The integration is architecturally simple: detect the `verify:` pattern in text the platform already extracts, compute SHA-256 (already available in every platform's crypto library), and make one HTTPS GET. No SDK, no API key, no partnership required.

**No backend cost for platform vendors.** Issuers host their own verification endpoints. Platforms provide client-side recognition only.

See [docs/platform_integration.md](docs/platform_integration.md) for vendor-specific integration details, engineering effort estimates, and business cases.

## Reference Implementations

| Tool                                         | Mode           | Status                   | Source                                                        |
|----------------------------------------------|----------------|--------------------------|---------------------------------------------------------------|
| **Browser extension** (Chrome, Edge, Firefox) | Clip           | Reference implementation | [`apps/browser-extension/`](apps/browser-extension/)          |
| **iOS app**                                  | Camera         | Reference implementation | [`apps/ios/LiveVerify/`](apps/ios/LiveVerify/)                |
| **Android app**                              | Camera         | Reference implementation | [`apps/android/`](apps/android/)                              |
| **Thunderbird extension**                    | Clip (email)   | Reference implementation | [`apps/thunderbird/`](apps/thunderbird/)                      |
| **Examples page**                            | Clip (in-page) | Live demo                | [Try it](https://live-verify.github.io/live-verify/examples/) |

iOS and Android reference apps get deleted when Apple and Google take over development (and agree on a standard).

**Conformance:** all implementations — including independent ones — prove hash agreement against the
published vector corpus in [`normalization-hashes/`](normalization-hashes/): for every vector, a
conforming implementation must produce byte-identical normalized output and the SHA-256 pinned in the
vector's filename. The three reference implementations run against it in their test suites.

## Use Cases

If a claim is aimed at humans reading it — whether digital or printed — it is a candidate for Live Verify.

**Illustrations, not announcements.** Organisations and domains named in these use cases are illustrations of who could issue or check such a document. None of them has adopted Live Verify, and no discussions with them are under way.

**Start with the flagship cases** — the five clusters where issuer-attested verification is most consequential:

1. [Bank statements](https://live-verify.github.io/live-verify/use-cases/view.html?doc=bank-statements) / [income documents](https://live-verify.github.io/live-verify/use-cases/view.html?doc=mortgage-verification-documents) — forgery-proof KYC
2. [Credential evaluations](https://live-verify.github.io/live-verify/use-cases/view.html?doc=foreign-credential-evaluations) / [letters of good standing](https://live-verify.github.io/live-verify/use-cases/view.html?doc=bar-admission-good-standing) — portable professional proof
3. [Fine art](https://live-verify.github.io/live-verify/use-cases/view.html?doc=art-authentication-documents) / [pedigree](https://live-verify.github.io/live-verify/use-cases/view.html?doc=breed-pedigree-registration) provenance — high-value trust between private silos
4. [AI-content disclosure](https://live-verify.github.io/live-verify/use-cases/view.html?doc=ai-content-provenance-disclosure) / [ad-placement provenance](https://live-verify.github.io/live-verify/use-cases/view.html?doc=ad-placement-provenance) — post-GenAI primitives
5. [Police-officer](https://live-verify.github.io/live-verify/use-cases/view.html?doc=police-officer-verification) / [utility-worker](https://live-verify.github.io/live-verify/use-cases/view.html?doc=utility-field-worker-verification) verification — trust at the door

**Full searchable catalog** (a breadth survey of everywhere the primitive applies, documented to one template): https://live-verify.github.io/live-verify/use-cases/

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

Note: Chrome-extension is not yet published to the Chrome Web Store.

**Camera mode (phone):**
1. Install the iOS app (`apps/ios/LiveVerify/`) or Android app (`apps/android/`)
2. Point camera at a document with registration marks + `verify:` line

Note: Apps are not on app-stores yet.

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

The method is not merely unencumbered — it is **unpatentable**: it was publicly disclosed in a dated blog post on 17 January 2023, so the novelty window for patenting it has closed in every jurisdiction, for everyone. Adopters can build on it freely with no risk of a later patent. See [No Patents: Defensive Publication Declaration](docs/no-patents-declaration.md).

- **Issuer Registry SaaS**: integrate with systems of record, publish hashes, support revocation, provide response-code meaning pages, meet governance/compliance expectations.
- **Verifier Ops SaaS**: managed app/SDK distribution, device management, allowlists of issuer domains, optional caching and logging/retention controls (where authorized).

## Tech Stack

All verification happens client-side — the document's content never leaves your device; only a hash is sent (see the privacy caveats above: query-privacy depends on preimage entropy and on blinding the lookup).

| Component         | Technologies                                            |
|-------------------|---------------------------------------------------------|
| Browser extension | Manifest V3, Web Crypto API (SHA-256), chrome.scripting |
| iOS app           | Swift/SwiftUI, Vision framework (OCR), CryptoKit        |
| Android app       | Kotlin, ML Kit (OCR), CameraX                           |
| Testing           | Jest (59 unit tests), Playwright (16 E2E tests), XCTest |

## Documentation

| Document | Audience | Content |
|----------|----------|---------|
| [docs/SPEC.md](docs/SPEC.md) | Implementers, standards reviewers | **The normative protocol spec** — verify-line ABNF, canonicalization algorithm, hash, lookup URL, response/affirmation rules, endorsement walk, conformance |
| [paper/](paper/) ([PDF](https://live-verify.github.io/paper/live-verify-paper.pdf)) | Researchers | Draft academic paper — design, trust model, evaluation tables generated from the conformance corpus at build time |
| [docs/SECURITY-CONSIDERATIONS.md](docs/SECURITY-CONSIDERATIONS.md) | Security reviewers | Consolidated threat model with implemented/proposed/open status per item |
| [normalization-hashes/](normalization-hashes/) | Implementers | The conformance corpus — pinned test vectors all implementations must pass |
| [docs/platform_integration.md](docs/platform_integration.md) | Platform vendors | Apple/Google/Microsoft/Adobe integration details |
| [docs/issuer-guide.md](docs/issuer-guide.md) | Organizations | Creating verifiable documents, verification-meta.json |
| [docs/verification-meta-schemas.md](docs/verification-meta-schemas.md) | Implementers | Issuer vs authority schema for verification-meta.json |
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

Two licenses, split by kind of work (see [LICENSING.md](LICENSING.md) for the full explanation):

- **Code** (the `apps/`, the canonical JavaScript, scripts, build tooling) — **Apache License 2.0** (see [LICENSE](LICENSE)).
- **Content** (use-cases in `public/use-cases/`, the docs in `docs/`, website prose) — **Creative Commons Attribution-ShareAlike 4.0** (CC BY-SA 4.0; see [LICENSE-CONTENT](LICENSE-CONTENT)). Free to copy, adapt, and build on with attribution, as long as derivatives stay under the same open license.

**Patents:** none, and none possible. The method was publicly disclosed on 17 January 2023, placing it in the public domain as prior art before any patent could be filed — see [No Patents: Defensive Publication Declaration](docs/no-patents-declaration.md).

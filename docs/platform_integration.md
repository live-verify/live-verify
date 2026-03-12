# Platform Integration: Native `verify:` Support

Live Verify works today as a browser extension and mobile app. But the technology is designed to become a **platform primitive** — recognized natively by operating systems, browsers, email clients, and document viewers, the same way `mailto:` and `tel:` links are recognized today.

This document outlines how each major platform vendor can integrate `verify:` recognition with minimal engineering effort, using capabilities they already ship.

---

## Apple

Apple is the most natural first mover. They already built the foundational pieces:

### What Apple already ships

- **Live Text (iOS 15+, macOS Monterey+):** Recognizes and extracts text from images and camera feeds in real time, across hundreds of millions of devices. Already identifies URLs, phone numbers, addresses, and tracking numbers in rendered text and images.
- **Apple Vision framework:** On-device OCR with strong accuracy across Latin, CJK, Arabic, Devanagari, and other scripts. Powers Live Text.
- **Apple Intelligence (A17 Pro+ / M-series):** On-device neural models for document understanding, layout analysis, and multi-font recognition.
- **Safari Content Blockers / Web Extensions:** Extension architecture already supports context menu actions on selected text.
- **Keychain / Secure Enclave:** On-device cryptographic operations without cloud dependency.

### What Apple would build

1. **`verify:` recognition in Live Text.** When Live Text encounters `verify:domain.com/path` in rendered text or images, it becomes tappable — just like phone numbers and URLs already are. Tapping triggers on-device hash computation of the associated text block (bounded by registration marks or paragraph context) and performs the verification lookup.

2. **`verify:` recognition in Safari.** Safari already underlines and linkifies `tel:` and `mailto:` pseudo-URLs. The same treatment for `verify:` — a subtle indicator (lock icon, checkmark) that the text above is verifiable, with a tap/hover to verify.

3. **`verify:` recognition in Mail.** Apple Mail already detects dates, flight numbers, and addresses in email bodies. Adding `verify:` detection would let users verify claims in employment letters, university notifications, and compliance documents without leaving Mail.

4. **`verify:` recognition in Preview / Quick Look.** PDF and image viewers could detect `verify:` lines and offer inline verification.

### Why Apple should care

- **Privacy alignment.** Live Verify's architecture — all processing on-device, only a hash sent over the network — is exactly the privacy model Apple markets. No PII leaves the device. No cloud OCR. No data collection.
- **Live Text ROI.** Apple invested heavily in Live Text. Today it copies text and opens URLs. `verify:` recognition gives Live Text a new capability class: **document authentication from the camera feed.** Every iPhone becomes a credential verification device.
- **Ecosystem differentiation.** "iPhone verifies your documents" is a concrete, demonstrable feature that Android cannot match at the same quality level today (see [ocr-limitations.md](ocr-limitations.md) for the iOS/Android OCR gap).
- **No backend cost.** Apple hosts nothing. Issuers host their own verification endpoints. Apple provides the client-side recognition.

### Integration effort

Low. The `verify:` pattern is a simple regex match on text that Live Text already extracts. Hash computation uses CommonCrypto (SHA-256), already available. The verification lookup is a standard HTTPS GET. The UI treatment is the same as existing Live Text actions.

---

## Google

### What Google already ships

- **Google Lens:** On-device and cloud OCR with text recognition, translation, and search. Already identifies URLs, phone numbers, and product barcodes.
- **ML Kit Text Recognition v2:** On-device OCR for Android apps. Handles Latin, Chinese, Japanese, Korean, and Devanagari scripts.
- **Chrome browser:** Dominant market share. Extension ecosystem already supports Live Verify.
- **Gmail:** Detects and linkifies tracking numbers, addresses, calendar events, and flight information in email bodies.
- **Android Camera / CameraX:** Camera APIs with real-time frame processing.

### What Google would build

1. **`verify:` recognition in Google Lens.** When Lens detects `verify:` in scanned text, offer a "Verify this document" action alongside existing Lens actions (copy, translate, search). Compute hash on-device from the text bounded by registration marks.

2. **`verify:` recognition in Chrome.** Chrome already renders `tel:` and `mailto:` as clickable. Add `verify:` as a recognized pseudo-protocol. When encountered in page text, show a subtle verification affordance. Right-click context menu: "Verify this claim."

3. **`verify:` recognition in Gmail.** Gmail already creates smart chips for dates, contacts, and files. A `verify:` line in an employment verification email or compliance document could show a verification chip — tap to verify on-device.

4. **`verify:` recognition in Google Drive / Docs.** Documents containing `verify:` lines could show verification status inline.

### Why Google should care

- **Lens differentiation.** Google Lens competes with Apple Live Text. Adding document verification gives Lens a capability that goes beyond text extraction into **trust assessment**.
- **Enterprise / Workspace.** Google Workspace serves millions of organizations. Verifiable employment letters, compliance documents, and certifications flowing through Gmail and Drive is a concrete enterprise security feature.
- **Android ecosystem.** `verify:` recognition as an Android system service would let any app benefit — not just Google's own apps.
- **No backend cost.** Same as Apple — Google provides client-side recognition, issuers host their own endpoints.

### Integration effort

Low-to-moderate. ML Kit already extracts text. SHA-256 is in `java.security.MessageDigest`. The main work is Lens UI integration and the Chrome pseudo-protocol handler.

---

## Microsoft

### What Microsoft already ships

- **Microsoft Lens (Office Lens):** Document scanning with OCR, table extraction, and PDF conversion.
- **Edge browser:** Chromium-based, supports the same extension architecture as Chrome.
- **Outlook:** Email client across desktop, web, and mobile. Already detects and linkifies tracking numbers and addresses.
- **Office 365 (Word, Excel, PowerPoint):** Document creation and viewing across billions of devices.
- **Windows OCR API:** Built-in OCR capability in Windows 10/11 via `Windows.Media.Ocr`.
- **Azure AI Document Intelligence:** Cloud OCR (not relevant for on-device, but shows Microsoft's investment in document understanding).

### What Microsoft would build

1. **`verify:` recognition in Edge.** Edge already has "Collections," "Web capture," and reading-mode features. Adding `verify:` recognition to Edge — either as a built-in feature or a first-party extension — would position Edge as the browser that authenticates what you read.

2. **`verify:` recognition in Outlook.** Outlook processes millions of employment verification letters, compliance notifications, and credential confirmations daily. Detecting `verify:` lines and showing verification status inline would be immediately valuable for HR departments, compliance teams, and legal.

3. **`verify:` recognition in Word / PDF viewer.** Documents opened in Word or the Windows PDF viewer could detect `verify:` lines and offer verification. This is particularly valuable for printed-then-scanned documents re-digitized via Microsoft Lens.

4. **Windows system-level `verify:` protocol handler.** Register `verify:` as a protocol in Windows, similar to `mailto:` and `ms-settings:`. Any application rendering text could invoke the system verification handler.

### Why Microsoft should care

- **Enterprise security.** Microsoft's customer base is enterprise-heavy. Document fraud, credential falsification, and compliance failures are real problems for IT, HR, and legal departments. Native `verify:` support in Office 365 is a security feature Microsoft can sell.
- **Edge differentiation.** Edge struggles for market share against Chrome. "Edge verifies your documents" is a concrete feature differentiator.
- **Copilot integration.** Microsoft Copilot already reads documents. A Copilot that can also verify the claims in those documents — "This employment letter is verified by acme-corp.com" — adds trust to AI-assisted document processing.
- **Government and regulated industries.** Microsoft serves government, healthcare, and financial services — sectors where document verification is a daily requirement.

---

## Adobe

### What Adobe already ships

- **Acrobat / Acrobat Reader:** The dominant PDF viewer. Already supports digital signatures (PAdES), form filling, and document security features.
- **Adobe Scan:** Mobile document scanner with OCR.
- **Adobe Document Cloud:** Cloud-based document management.

### What Adobe would build

1. **`verify:` recognition in Acrobat Reader.** When opening a PDF containing `verify:` text, Acrobat could show a verification panel — similar to the existing digital signature panel — showing which claims in the document are verifiable and their status.

2. **`verify:` recognition in Adobe Scan.** When scanning a physical document, Adobe Scan already performs OCR. If the OCR output contains `verify:`, offer to verify the document's claims before saving.

3. **PDF creation with `verify:` embedding.** Adobe could offer a "Make Verifiable" feature when creating PDFs — organizations creating certificates, letters, or compliance documents could add `verify:` lines with proper formatting as part of the PDF creation workflow.

### Why Adobe should care

- **PDF is the credential format.** Degrees, licenses, employment letters, compliance certificates — most are distributed as PDFs. Adobe owns the PDF ecosystem. Adding `verify:` support makes Acrobat the tool that not only displays credentials but authenticates them.
- **Competitive moat vs. free PDF viewers.** Chrome, Edge, Preview, and Evince all render PDFs. Adobe Reader's value proposition erodes as free viewers improve. Document verification is a premium feature that justifies Adobe's position.
- **Existing digital signature users.** Organizations already using Acrobat for digital signatures would find `verify:` complementary — it adds human-readable verification alongside the existing cryptographic signature infrastructure. The two approaches are not competing; they serve different verification moments.

---

## Thunderbird / Mozilla

### What Mozilla already ships

- **Thunderbird:** Open-source email client with extension support.
- **Firefox:** Browser with extension ecosystem.

### What Mozilla would build

A reference implementation already exists: [`apps/thunderbird/`](../apps/thunderbird/). This Thunderbird extension detects `verify:` lines in email bodies and verifies claims inline. Mozilla could:

1. **Ship `verify:` detection as a built-in Thunderbird feature** — no extension required.
2. **Add `verify:` recognition to Firefox** — context menu "Verify this claim" on selected text containing `verify:` lines.

### Why Mozilla should care

- **Open web values.** Live Verify is Apache-2.0 licensed, uses open standards (SHA-256, HTTPS, DNS), and requires no central authority. This aligns with Mozilla's mission.
- **User trust.** "Firefox verifies what you read" reinforces Mozilla's privacy and trust positioning.

---

## Integration Specification Summary

For all platforms, the integration is architecturally identical:

```
1. Detect `verify:` pattern in rendered/extracted text
2. Identify the text block (registration marks for Camera mode, selection for Clip mode)
3. Normalize text (Unicode NFC, whitespace rules per verification-meta.json)
4. Compute SHA-256 hash on-device
5. GET https://{domain}/{path}/{hash}
6. Display result: ✅ verified / ❌ failed / ⚠️ revoked
```

**What platform vendors provide:** Steps 1-4, 6 (client-side recognition, hashing, and UI).
**What issuers provide:** Step 5 (a static file or serverless function returning HTTP 200/404).

**No central authority. No vendor lock-in. No PII transmitted. No backend cost for platform vendors.**

The `verify:` scheme is intentionally simple enough that any platform can implement it independently. There is no SDK to integrate, no API key to obtain, no partnership to negotiate. The specification is the behavior: detect the pattern, hash the text, check the endpoint.

---

## Getting Started

Platform vendors interested in native integration:

1. **Try the reference implementation:** Install the [browser extension](../apps/browser-extension/) and verify claims on the [examples page](https://live-verify.github.io/live-verify/examples/)
2. **Read the technical specification:** [docs/Technical_Concepts.md](Technical_Concepts.md) covers normalization, hashing, domain binding, and response formats
3. **Review the normalization rules:** [docs/NORMALIZATION.md](../docs/NORMALIZATION.md) defines text preprocessing
4. **See the authority chain model:** [docs/Authority_Chain_Verification.md](Authority_Chain_Verification.md) explains how `verify:` domains establish trust hierarchies
5. **Examine the test suite:** 59 unit tests + 16 end-to-end tests validate the specification behavior

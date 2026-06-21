# Live Verify — Client Applications (iOS, Android, Browser Extension)

Live Verify is a system for proving that a piece of printed or on-screen text is genuinely vouched for by the domain named in it. The mechanism is uniform across every client: take the human-readable text, strip out a `verify:` (or `vfy:`) quasi-URL line, **normalize** the remaining text deterministically, compute its **SHA-256** hash, convert the quasi-URL to `https://`, and **fetch** `https://{domain}/{path}/{hash}`. A 2xx (or a JSON body whose `status` is `VERIFIED`) means the issuer affirms the claim; a 404 or other status means it does not. The same hash must be produced by every client from the same source text — otherwise verification is impossible across platforms. This document describes the three client apps and how each implements that pipeline.

There are two verification **modes**:
- **Camera mode** — point a phone camera at printed text, OCR it, then verify (iOS and Android).
- **Clip mode** — the user selects/clips already-digital text (iOS DataScanner tap, or browser text selection) and verifies it without a full document-capture step (iOS and the browser extension).

## The single most important architectural fact

**Normalization is not reimplemented per platform.** The canonical normalization rules live in one file, `public/normalize.js`, and that exact JavaScript is executed on every client:
- **iOS** runs it inside **JavaScriptCore** via `JSBridge.swift`.
- **Android** runs it inside **Mozilla Rhino** via `TextNormalizer.kt`.
- **The browser extension** uses an **auto-generated copy** in `apps/browser-extension/shared/normalize.js`, produced by `scripts/sync-shared.js` from the same canonical source (the file carries an "AUTO-GENERATED — do not edit" header).

The reason is **cross-platform hash identity**: if iOS, Android, the browser, and the issuer's own web tooling each had a hand-written normalizer, they would inevitably drift (Unicode handling, whitespace collapsing, OCR character substitutions), and the same text would hash to different values on different devices. By bundling and interpreting one JS implementation everywhere, every client is guaranteed to produce byte-identical normalized output and therefore the same SHA-256 digest. SHA-256 itself is done natively on each platform (CryptoKit on iOS, `MessageDigest` on Android, `crypto.subtle` in the browser) because hashing is a stable, standardized primitive with no drift risk — only normalization needs the shared engine.

---

## 1. iOS app (`apps/ios/LiveVerify/`)

**Platform/language:** iOS, Swift + SwiftUI. **Modes:** both Camera and Clip.

**Tech stack:** Apple **Vision** (OCR via `VNRecognizeTextRequest`, document detection via `VNDetectDocumentSegmentationRequest`/`VNDetectRectanglesRequest`), **VisionKit** `DataScannerViewController` for live text tapping, **AVFoundation** for camera capture, **CoreImage** for perspective correction, **CryptoKit** for SHA-256, and **JavaScriptCore** to run the shared normalization JS.

**Pipeline (Camera mode), orchestrated by `VerificationPipeline.swift`:**
1. **Capture** — `CameraService.swift` runs an `AVCaptureSession`, fixes image orientation (using an `OrientationTracker` backed by CoreMotion gravity so it works even when the UI is locked to portrait), and returns a `UIImage`.
2. **Document detection / crop** — `ContourDetector.swift` finds the document quadrilateral and applies `CIPerspectiveCorrection` to deskew and crop. If no document is found it fails loudly (no silent fallback to the full frame).
3. **OCR** — `TextRecognizer.swift` runs Vision text recognition, sorts observations top-to-bottom, and emits newline-separated text. It can take OCR hints (languages, recognition level, custom vocabulary) from the issuer's `verification-meta.json`.
4. **URL extraction** — `JSBridge.extractVerificationURL` scans bottom-to-top for the `verify:`/`vfy:` line and returns it plus its line index.
5. **Metadata fetch** — `VerificationClient.swift` fetches `verification-meta.json` (retrying with a `www.` prefix) for response-type interpretation, hash suffixes, and authority info.
6. **Cert-text extraction + normalize** — `JSBridge.extractCertText` takes the lines above the URL; `JSBridge.normalizeText` runs canonical `normalize.js`.
7. **Hash** — `SHA256Hasher.hashHex` (CryptoKit) produces the lowercase hex digest.
8. **Build URL + fetch** — `JSBridge.buildVerificationURL` converts the quasi-URL to HTTPS and appends the hash (plus any suffix from meta); `VerificationClient.verify` performs the GET and classifies the response as affirming/denying using `responseTypes` from meta.
9. **Authority chain** — if meta has `authorizedBy`, `VerificationClient.checkAuthorization` re-fetches and canonicalizes the issuer meta, hashes it, queries the authorizer's endpoint, and recursively walks the chain (max depth 3).

**Clip mode** uses `DataScanner.swift` (VisionKit). The user taps a recognized text region; the app captures a still, crops to the tapped region, re-runs `VNRecognizeTextRequest`, stitches words into lines, then calls `VerificationPipeline.verifyText(...)` — which skips capture/detection/OCR and enters the pipeline at step 4. There is also `reVerify(editedText:baseURL:)` for user-corrected text.

**On a result:** `ResultView.swift` / `VerificationOverlay.swift` show a green **VERIFIED** or red failure state with the issuer domain, plus an indented authority chain and any payload (e.g. headshot/message) returned by the issuer.

---

## 2. Android app (`apps/android/`)

**Platform/language:** Android, Kotlin. **Mode:** Camera mode (live tap-to-select on detected text; also debug image-file and text-paste entry points).

**Tech stack (`app/build.gradle.kts`):** **CameraX** (`camera-core`, `camera2`, `camera-lifecycle`, `camera-view`), **ML Kit** Latin text recognition (`com.google.mlkit:text-recognition`), **OkHttp** for network, Kotlin **coroutines**, **Mozilla Rhino** (`org.mozilla:rhino`) to run the shared normalization JS, and native `java.security.MessageDigest` for SHA-256.

**Pipeline, driven by `MainActivity.kt` + `VerificationLogic.kt` + `TextNormalizer.kt`:**
1. **Capture / live OCR** — CameraX `ImageAnalysis` feeds frames to ML Kit. Detected text is drawn as a tap-selectable overlay (`TextOverlayView`). The user selects blocks and taps capture; ML Kit text is reused (no re-OCR), lines are sorted into reading order and stitched into rows (handling landscape rotation by inspecting the coordinate spread of the `verify:` anchor line).
2. **URL extraction** — `VerificationLogic.extractVerificationUrl` scans bottom-to-top for the `verify:`/`vfy:` line, stripping OCR spaces from the URL.
3. **Cert-text candidates** — `extractCertTextCandidates` returns several candidate texts (smallest section above the URL first, expanding upward by blank-line boundaries). This tolerates OCR inserting spurious blank lines.
4. **Normalize** — `TextNormalizer.normalizeText` runs canonical `normalize.js` through Rhino (loaded from app assets at runtime, or the project file in unit tests).
5. **Hash + fetch** — `TextNormalizer.sha256` hashes natively; `VerificationLogic.buildVerificationUrl` builds the HTTPS URL (honoring `hashesHostedAt` / append-suffix from meta); `verifyHash` GETs it via OkHttp. The app tries each candidate from smallest to largest until the server returns 200 — letting the server confirm where the cert text really begins.
6. **Metadata + authority** — `fetchVerificationMeta` (with `www.` retry) and `checkAuthorization` mirror the iOS logic: canonicalize the issuer meta, hash it, query the authorizer, walk the chain to depth 3, threading an `X-Verification-URLs` header. (`configureClient` allows DNS overrides / trust-all TLS for local debug testing only.)

**On a result:** `MainActivity.showResult` renders a green **✓ VERIFIED** (or orange when verified-but-unauthorized), red **✗ NOT VERIFIED**, or **!** error, with the domain/reason, an indented authority chain (`✓`/`✗` per node, tap for `formalName`), any issuer payload, and diagnostic tabs showing the captured crop, raw OCR text, and the normalized candidate(s).

---

## 3. Browser extension (`apps/browser-extension/`)

**Platform/language:** **Manifest V3** browser extension (Chrome/Edge/Firefox), JavaScript. **Mode:** Clip mode — verifies digital text the user selects, and additionally auto-detects pre-marked verifiable regions in page HTML. It is explicitly a proof-of-concept/stopgap until browsers build `verify:` recognition in natively.

**Structure:** `manifest.json` declares permissions (`contextMenus`, `storage`, `notifications`, `scripting`, `activeTab`), a `background.js` service worker (ES module), a `content.js` content script injected into all pages, a `popup/` history UI, and a `settings/` options page. The `shared/` folder holds the auto-generated `normalize.js`, plus `verify.js`, `psl.js` (Public Suffix List), `domain-authority.js`, and `notification-message.js`.

**Right-click "verify" flow (`background.js`):** a context-menu item "Verify this claim" (and a `Ctrl/Cmd+Shift+V` command) grabs the selection via `chrome.scripting.executeScript` running `window.getSelection().toString()` (to preserve newlines, which `info.selectionText` strips). `verifySelection` then runs the standard pipeline using the shared modules: `extractVerificationUrl` → `extractCertText` → `fetchVerificationMeta` → `normalizeText` → `sha256` → `buildVerificationUrl` → `verifyHash`, plus PSL-based registrable-domain emphasis and `checkAuthorization` for the authority chain.

**Auto-detecting page markers (`content.js`):** on every page the content script scans for two HTML marker styles — (1) paired `verifiable-text="start"` / `verifiable-text="end"` spans keyed by `data-for`, with a `data-verify-line` span carrying the `verify:` URL; and (2) a whole element marked `verifiable-text-element="true"` containing a `data-verify-line` child. For each region it reconstructs the visible text in reading order, draws a dashed outline plus a "🔍 Verify" badge, and (per settings) either auto-scans/auto-verifies or shows a floating "Scan N verifiable regions" button. A `MutationObserver` catches regions injected late by SPA pages. Clicking a badge sends the text to the background worker; outlines turn solid green (verified) or red (failed), a panel beneath shows the authority chain and any payload, and the toolbar badge shows a verified/total count.

**Popup history & "Show me" (`popup/popup.js`):** the worker keeps up to 20 results in `chrome.storage.session` (privacy: cleared when the browser closes). The popup renders each as a card — status badge, emphasized issuer domain, authority chain, claim text, and an expandable details section (SHA-256, verification URL, normalized text, timing). Each card has **Copy** and **"Show me"** buttons; "Show me" injects `findAndHighlightOnPage`, which uses `window.find` to locate the claim text, scrolls to it, and flashes a red outline so the user can see exactly which on-page text was verified.

**On a result:** the worker either injects an in-page slide-down **banner** (`showResultBanner`) or fires an **OS notification** (`RESULT_DISPLAY` switch). Banner colors: green gradient + ✓ for VERIFIED, red + ✗ for not-verified, orange + ⚠ for errors; it shows the bolded issuer domain, authority chain, and an expandable details panel. The banner carries the disclaimer "screencaps of this are not proof of anything" — because page JavaScript could forge a banner, but only the extension can raise a real OS notification, which is the trustworthy signal. The toolbar action badge also flips to a colored ✓/✗.

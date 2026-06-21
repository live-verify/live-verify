# Live Verify — Verification Flows, Overlays & Demo Material

This document describes, in plain prose, what a person actually *sees and experiences* when they use Live Verify's interactive verification surfaces. NotebookLM cannot run the code or render the pages, so everything below is a description of the on-screen behaviour, the colours, the labels, and the wording of the overlays — drawn directly from the live demo pages, the text-selection script, the format showcase, and the training documents.

Underlying everything is one pipeline: **text → normalize → SHA-256 hash → HTTP GET to the issuer's domain**. The issuer never sees the original text, only the hash. What differs between modes is *how the text gets in* (typed selection, camera OCR, image clip) and *where the result is shown* (a trusted bar/overlay outside the page content).

---

## 1. Clip-Mode: Selection-to-Result Flow and On-Screen States

The canonical demo lives at `public/examples/index.html` ("Text Selection Verification"). It simulates what a browser could one day do natively: recognise a `verify:` URL inside selected text and offer a "Verify" action.

**What the page looks like.** A clean white card on a soft blue-grey background. A yellow "How to Use" panel (amber left border) gives four steps: (1) select a text block including its `verify:` or `vfy:` line, (2) click the green "Verify" button that appears, (3) see the result in the "browser chrome bar" at the top, (4) click that bar to expand the normalized text and hash. Below sit four monospace example "claims," each in a grey rounded box that turns its border **green with a soft green glow on hover** (a cue that the box is selectable/verifiable).

**The four worked examples and their colour-coded status labels** (a small pill above each box):
- **Example 1 — Peer Reference** (green "valid" pill, text "Should verify as OK"): a short personal reference ending `verify:paulhammant.com/refs`.
- **Example 2 — Revoked Employment Reference** (red "revoked" pill): a "MERIDIAN CONSULTING GROUP" reference for Sarah Chen ending `verify:live-verify.github.io/live-verify/c`. A floating amber "Sim caveat" note (yellow box, orange left border) sits beside it explaining that the issuer-name-vs-domain mismatch is only an artefact of the demo hosting hashes on the project's own GitHub Pages — and that in real life such a mismatch *is* a signal the verifier should notice.
- **Example 3 — Coffee Shop Receipt** (grey "not-registered" pill): a Costa receipt ending `vfy:r.costa.co.uk`, a domain that simply doesn't resolve — "the issuer has not adopted Live Verify."
- **Example 4 — Not Registered / Will Fail** (grey pill): deliberately bogus text whose hash will 404.

A green "Privacy Note" panel restates that all processing is local and only the final hash leaves the browser. A blue "Future: Native Browser Support" panel frames the green top bar as a stand-in for trusted browser chrome — the point being that a malicious page must not be able to paint its own fake "Verified" badge.

**The interaction, step by step** (driven by `public/text-selection-verify.js`):
1. The user drags to select text (mouse-up, keyboard shift-select, or right-click all trigger it). If the selection is longer than 10 characters *and* contains `verify:` or `vfy:`, a floating blue **"🔍 Verify?" button** appears next to the cursor. It's a small blue gradient pill that scales up slightly and deepens its shadow on hover.
2. Clicking it clears the selection and immediately shows a result banner in **loading state**: a blue gradient bar pinned across the very top of the window with an hourglass (⏳) icon and the word "Verifying…".
3. The script extracts the URL, isolates the certificate text above the `verify:` line, optionally fetches the issuer's `verification-meta.json` for normalization hints, normalizes, SHA-256 hashes, builds the verification URL, and does a **real** CORS `fetch`.

**The result banner and its states/colours.** The banner is a dark slate header bar fixed to the top edge — explicitly *not* injected into the page body, so the page can't fake it. It carries a big status icon, a large status word, and a domain line, plus a close (×) button. A small grey sub-line always reads "Simulation of a future first-class feature of browsers, but a single browser extension today." States:
- **VERIFIED** — green gradient header, white check (✓), status word "VERIFIED," domain line "by example.com" (the registrable part bolded). A green italic note appears: "Screencaps of this verified message are not proof of anything." A green authorization strip shows either "Self-verified by …" or the authority chain ("Verification authorized by …"). This banner auto-dismisses after 8 seconds.
- **REVOKED / other non-verified status** ("denied") — deep red gradient, white cross (✗), the status word taken from the issuer's JSON (e.g. "REVOKED"), with the issuer's message and domain on the detail line.
- **NOT FOUND / HTTP error** ("failed") — red gradient, cross icon, "NOT FOUND — example.com does not verify this claim" (the 404 case).
- **CANNOT VERIFY / error** — amber-orange gradient, warning icon (⚠), used when the endpoint can't be reached at all (issuer hasn't set up Live Verify, or a network/CORS block). The wording is deliberately honest about the ambiguity.
- An extra **amber trust-warning strip** ("Domain TLD not recognized — treat this verification with caution") appears when the domain's TLD isn't in the Public Suffix List.

Clicking the banner header expands a details drawer showing the **normalized text** and the **SHA-256 hash**, so a curious user can see exactly what was hashed.

---

## 2. The `verifiable-text` HTML Marker Conventions

On the use-case documents (rendered by `public/use-cases/view.html`) a verifiable region is delimited by invisible marker spans so the boundaries of "what gets hashed" are machine-detectable without bracket clutter in the prose:

- `<span verifiable-text="start" data-for="GROUP"></span>` opens a region and `<span verifiable-text="end" data-for="GROUP"></span>` closes it; the `data-for` value ties the pair together.
- The actual `verify:` line is wrapped in `<span data-verify-line="GROUP">verify:issuer.com/v</span>`.

**The hover effect.** The marker spans normally have `max-width: 0` and are invisible. When the user hovers over the `data-verify-line`, the line text turns **red**, and the two markers animate open to ~1em wide, briefly revealing bold red bracket-like glyphs at the start and end of the region — visually "lighting up" exactly the span of text that will be hashed. Move the mouse away and they collapse again. (Note: literal `[` `]` brackets were intentionally removed from the prose; the effect is purely this hover reveal.) Some elements instead carry `verifiable-text-element="true"` to mark a whole element as the verifiable unit.

---

## 3. The Multi-Format Showcase (Same Claim, Many Surfaces)

`public/formatShowcaseInjector.js` demonstrates that *the same claim verifies identically no matter what app it's wearing*. Any element with a `data-format-showcase` attribute (a JSON list of formats) becomes a rotating carousel: every 5 seconds it re-skins the same underlying document mockup into a different messaging/document chrome, with a thin **countdown progress bar** draining across the top of each frame and a small footer label naming the current format.

The skins it can render: **Gmail** (white email header with From/Subject/Date, blue countdown bar, "📧 Gmail Format" footer); **PDF** (document chrome reading "📄 Document.pdf — Page 1 of 1," serif body, red countdown bar); **email attachment** (an "AnnuityPricingCertification.eml" attachment chip plus an embedded certificate with an orange "▶ Verification:" callout showing the `verify:` line); **SMS** (a phone-style bubble, "📱 SMS Message"); **WhatsApp** (the beige `#ece5dd` chat background, a white message bubble, green countdown bar, "💬 WhatsApp Format"); and **Discord** (dark `#36393f` channel "#verification-alerts" with a "Verification Bot" avatar). The teaching point: a receipt or certificate forwarded as a Gmail body, a PDF, a WhatsApp message, or an SMS all normalize to the *same* text and therefore the *same* hash — so verification is independent of the transport.

---

## 4. Camera-Mode Capture Flow and Status Overlay

Camera mode is the implemented native path (iOS via Apple Vision, Android via Google ML Kit), described in `docs/VERIFICATION-MODES.md` and `docs/how-it-works.md`. Here the text isn't selected — it's *read off a physical document or screen*.

**What the user does and sees.** They hold a printed document up to the live camera. The document carries a **black square registration border** (a printed rectangle) that frames the verifiable region — on the training certificates this is a literal 3px solid black box around the certificate text and its `verify:` line. The app's job is to find that border, OCR only the text inside it, and verify.

**The status-indicator sequence** (the overlay narrates each stage so the user understands what's happening):
1. **Detecting the registration square** — the app looks for the black-border region in the viewfinder.
2. **OCR at all four rotations** — it runs on-device OCR at 0°, 90°, 180°, 270° and keeps the highest-confidence read (so a sideways or upside-down camera still works). If every rotation fails, it shows an OCR error ("could not extract text — try better lighting/focus") and the user simply re-frames.
3. **Normalizing** — strip leading/trailing spaces, collapse runs of spaces, drop the `verify:` line, apply any domain-specific rules.
4. **Generating the hash** — compute the SHA-256 of the normalized text.
5. **Verifying** — build `https://issuer.com/c/{hash}` and HTTP GET it.

**The result overlay, drawn over the camera feed,** mirrors the clip-mode colour language:
- **Green "✅ VERIFIED" overlay**, naming the authority (the design rule is emphatic: never bare "VERIFIED" but "VERIFIED by degrees.ed.ac.uk" — the full hostname must be shown so the user sees *who* is vouching).
- **Red "❌ FAILS VERIFICATION"** when the hash 404s (hash not in the issuer's database) or the issuer returns a non-verified status such as **REVOKED / suspended / expired**; the user is told to re-frame and try again on a 404.
- **Amber "⚠️ VERIFICATION ERROR"** when the server can't be reached.

The same green/red/amber triad recurs everywhere, so the meaning is consistent across camera, clip, and the future auto-claim mode (which would underline verified claims green, failed claims red, and unknown-issuer claims yellow, while keeping all status text in the browser chrome, never in the page).

---

## 5. The Training and Example Documents — What They're For

The training pages (`public/training-pages/index.html` and its children) are deliberately **fictional documents that carry real `verify:`/`vfy:` lines and real, registered SHA-256 hashes**, so the whole camera/clip pipeline can be exercised end-to-end against live endpoints. Each page also loads `text-selection-verify.js`, so the same documents double as clip-mode targets — select the text, click "Verify."

The roster:
- **Unseen University certificates** from Terry Pratchett's Discworld: a *Bachelor of Thaumatology* awarded to Ponder Stibbons by Archchancellor Mustrum Ridcully (Registrar: "Rincewind (Wizzard)"), a square-format variant with thicker borders and decoy text, a *Master of Applied Anthropics* for Esk Weatherwax, and a *Doctorate in High Energy Magic*. These print the certificate text inside a black registration box above `verify:live-verify.github.io/live-verify/c`.
- A **Medical License (REVOKED)** for "Dr. Mossy Lawn" — its endpoint intentionally returns REVOKED rather than verified, so testers can see the red overlay.
- **Receipts** spanning currencies and layouts: a Swiss *Berghotel Grosse Scheidegg* dining receipt (CHF 54.50, German-language, ending `vfy:rcpt.bergwelt-grindelwald.com`), a UK *Costa Coffee* receipt (£8.45), a UK *Currys* electronics receipt (£847.99), a US *Chipotle* burrito receipt ($15.08), and a US *Home Depot* receipt ($680.40). The receipts exercise non-English text, varied number/VAT formats, and both `verify:` and `vfy:` prefixes.
- An **interactive CV — Harold Finch** (JSON Resume format): clicking an education or work entry pops a credential **overlay** showing that entry's verifiable text framed by four corner registration marks — a clip-mode-style "verify this credential" interaction embedded in a résumé.
- A **fake driving license — "Nordia"** (`driving-license-nordia-svg.html`), rendered as an SVG ID card for the fictional Nordia Transport Authority (Licence No. DL-NL-847629), with its verify line `vfy:drv-lic.gov.nia` set in monospace on the card — a stand-in for a government credential.
- An **Elbonian Source-of-Funds Declaration** (KYC/AML test document, "USD 47M," for Mr. Bogdan Krovavyy-Oligarkh of the Elbonian National Bank).

Collectively these give the demo a spread of document *shapes* (certificate, receipt, ID card, CV, financial declaration), *languages*, *currencies*, *border styles*, and *outcomes* (valid, revoked, not-registered, 404) — everything needed to show off, and to regression-test, the green-verified / red-failed / amber-error states across both the camera OCR path and the text-selection clip path. The examples page additionally points testers at the project's simulated integration tests (police IDs, bank statements, OFSI sanctions licences, revoked references with full authority chains and fake TLS domains) for the deeper end-to-end demos.

# Camera OCR vs. Tabular Data: A Live Verify Field Report

## The Problem

Live Verify's camera mode works beautifully for **prose documents** — certificates, references, claims where text flows continuously line by line. Point your phone, tap verify, done.

But **tabular data** — receipts, invoices, anything with left-aligned descriptions and right-aligned prices — breaks the pipeline. Here's why.

## What Works: Prose

An employment reference like this verifies perfectly on iOS:

```
I, Paul Hammant, worked for Kevin Behr in
his role as CIO of HedgeServ in New York City
in 2015 and 2016
verify:paulhammant.com/refs
```

The text flows left-to-right with no gaps. The OCR engine (Apple Vision on iOS, Google ML Kit on Android) sees one contiguous block of text. One rectangle. One tap to select it. Verification succeeds.

## What Breaks: Tabular Receipts

A coffee shop receipt like this fails:

```
Flat White                £3.40
Almond Croissant          £3.25
SUBTOTAL:                 £6.65
```

The OCR engine sees the visual gap between "Flat White" and "£3.40" and splits them into **separate text rectangles**. A receipt that should be one block becomes 10+ fragments. On iOS with DataScanner, you can only tap one rectangle at a time. You can never select enough text to verify.

## The Gap Problem, Visualized

Where a human sees one line:

```
┌─────────────────────────────────┐
│ Flat White              £3.40   │
└─────────────────────────────────┘
```

The OCR engine sees two blocks:

```
┌────────────┐            ┌───────┐
│ Flat White │            │ £3.40 │
└────────────┘            └───────┘
```

This is fundamental to how text detection works. OCR engines segment text into blocks based on visual proximity. A large whitespace gap signals "these are separate regions."

## What We Tried: Pipe Anchors

We hypothesized that adding characters at both margins would create visual continuity, forcing the OCR to treat each line as one block:

```
| 8 Market Square               |
| Henley-on-Thames RG9 2AA      |
| Flat White                £3.40
| Almond Croissant          £3.25
```

The `|` characters are already stripped by Live Verify's normalization rules (they're treated as border artifacts), so the hash computation wouldn't change.

**Result: iOS Vision ignores them.** With `recognitionLanguages` set to `en-US`, the Vision framework actively suppresses characters it considers non-linguistic noise. Isolated `|` or `&` characters at line margins are exactly the kind of thing it's trained to discard. The anchors we added to help grouping are the exact characters the engine filters out.

We also tried `&` as an alternative anchor character — same result.

## The Platform Difference: Architecture, Not Just OCR

The gap between Android and iOS turns out to be deeper than OCR quality. It's an architectural difference in how each platform's camera API exposes text to the app.

**Android (CameraX + ML Kit):** The Android app uses CameraX `ImageAnalysis` to run ML Kit on every camera frame continuously. ML Kit returns **all** detected text blocks with bounding boxes — every fragment on screen, every frame. The app draws overlays on all of them. The user taps to select which blocks to include, then the app collects all lines from all selected blocks, runs `stitchLinesIntoRows()` to merge fragments by Y-coordinate, and feeds the result into the verification pipeline. This is full-frame OCR with stitching — the app has access to every text fragment simultaneously.

**iOS (Vision + DataScanner):** Apple's `DataScannerViewController` takes a fundamentally different approach. It shows live text rectangles but only allows tapping **one at a time**. Each tap selects a single recognized item. There's no API to say "give me all the text you can see right now." We tried multiple workarounds:
- `capturePhoto()` to grab a full frame — hangs indefinitely
- Tracking items via the `recognizedItems` AsyncStream — works but DataScanner's item lifecycle is unpredictable
- Bypassing DataScanner entirely with `AVCaptureSession` + `VNRecognizeTextRequest` — 7-15 second shutter delays from session queue blocking

The stitching algorithm itself is identical on both platforms and works correctly in unit tests. The bottleneck on iOS is getting all the text fragments into the stitcher in the first place.

**What this means:** Android already has "Strategy A" (full-frame OCR) working. The automated emulator test (`run-android-coffee-test.sh`) exercises the exact same code path the real app uses — ML Kit OCR on a full image, spatial stitching, candidate extraction, normalize, hash, verify. It's not a shortcut; the test and the app share the same pipeline. iOS is stuck on "pick one rectangle" until Apple opens up DataScanner or we find a reliable way to capture full frames.

## Where This Leaves Us

| Document Type | Clip Mode (Browser) | Camera (Android) | Camera (iOS) |
|:---|:---|:---|:---|
| Prose (references, certificates) | Works | Works | Works |
| Tabular (receipts, invoices) | Works | Works (stitching) | Broken (single-rectangle) |

**Clip mode** (the browser extension) handles tabular data perfectly — it operates on digital text, not pixels. No OCR, no rectangle fragmentation.

**Android camera mode** handles tabular data because the app has access to all text fragments simultaneously. ML Kit splits "Flat White" and "£3.40" into separate blocks, but `stitchLinesIntoRows()` merges them back by Y-coordinate. The candidate extraction strategy then handles any extra text (headers, logos) that got captured.

**iOS camera mode** for tabular data needs one of:
1. **Accept the limitation** — camera mode on iOS is for prose documents; receipts use clip mode or Android
2. **Full-frame OCR with stitching** — bypass DataScanner entirely, use AVCaptureSession + VNRecognizeTextRequest on the full image, stitch with TextStitcher. The stitching algorithm works; the camera capture integration needs more work to avoid the shutter delay
3. **Platform improvements** — Apple could improve DataScanner to allow multi-select or provide access to all recognized items at once. Filed as Feedback.
4. **Dot leaders** — filling gaps with `.....` instead of whitespace (e.g., `Flat White.........£3.40`) might keep OCR engines from splitting lines. Untested.

## The Candidate Strategy

When camera OCR does work, we use a **try-smallest-first candidate strategy** to handle the fact that OCR may capture extra text (headers, logos) beyond the verifiable content:

1. Stitch all OCR observations into lines using spatial coordinates
2. Find the `verify:` line
3. Split the text above it at blank lines (detected from large vertical gaps between OCR observations)
4. Try each candidate from smallest to largest against the server
5. First candidate that returns HTTP 200 is the match

This is implemented on both iOS (`JSBridge.extractCertTextCandidates`) and Android (`VerificationLogic.extractCertTextCandidates`) and is resilient to OCR picking up nearby content outside the verifiable region.

## Bottom Line

The OCR fragmentation problem — engines splitting "Flat White" and "£3.40" into separate rectangles — affects both platforms equally. The difference is what happens next. Android's CameraX + ML Kit gives the app all fragments with coordinates, so the app can stitch them back together. iOS's DataScanner gives the user one fragment at a time, so there's nothing to stitch.

This isn't really an OCR problem. It's a platform API problem. Both OCR engines fragment tabular data the same way. Android just lets the app fix it; iOS doesn't.

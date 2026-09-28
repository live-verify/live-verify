# Conformance Corpus — Normalization & Hash Vectors

This directory is the Live Verify **conformance corpus**: the published test vectors against which
any implementation — the three in this repository or an independent one — proves hash agreement.

## The contract

> For every text vector in this directory, a conforming implementation MUST produce byte-identical
> normalized output and an identical SHA-256 hash. **The filename is the pinned expected hash.**
> An implementation that fails any vector does not conform, and two implementations that both pass
> every vector will agree on the hash of any claim they both normalize.

Rules that make the corpus trustworthy as a reference:

- **Vectors are append-only.** A vector, once published, is never edited — editing one changes its
  hash and therefore its filename, which is by construction a *new* vector. If a protocol change
  (e.g. a normalization-rule change) invalidates old vectors, that is a **breaking protocol change**
  and is handled by versioning the corpus, not by silently rewriting history.
- **Vectors are discriminating by design.** Each covers a normalization behaviour an implementation
  could plausibly get wrong; a vector that every wrong implementation would still pass is not doing
  its job. Example: the NFC vector's body contains *decomposed* Unicode (base letters + combining
  accents) — an implementation that skips canonical composition produces a different hash and fails.
- **Three implementations already run against this corpus** (JS via Jest; Android and iOS via
  instrumented tests, including the OCR image vectors). Independent implementers should wire it into
  their own CI the same way.

Coverage currently includes: line/whitespace collapsing, blank-line removal, curly-quote /
en-em-dash / NBSP / ellipsis folds, Unicode NFC canonical composition (decomposed input), issuer
`charNormalization` folds, `ocrNormalizationRules`, the `lineBreaks: flow` regime (soft-wrapped
prose collapsing to one line per paragraph), and full-pipeline OCR image vectors.

## Fixture Types

### Text Fixtures
Test text normalization: `normalizeText(text) → hash`

### Image Fixtures
Test full OCR pipeline: `image → OCR → cleanOcrArtifacts → normalizeText → hash`

## File Format

**Filename:** `{expected-sha256-hash}.md` (or `PLACEHOLDER-*.md` for new fixtures)

### Text Fixture
```markdown
---
description: Brief description of what this tests
charNormalization: "éè→e" (optional)
lineBreaks: "flow" (optional; default faithful)
encodedForms: basename (optional; see Encoded-Forms Fixtures)
---
The actual text to normalize goes here.
```

### Encoded-Forms Fixtures (the decode boundary)

A text fixture may declare `encodedForms: <basename>`, naming sibling files
`encoded-forms/<basename>.<encoding>.txt` that carry **the same text in different byte
encodings** (`utf8`, `utf8bom`, `utf16le`, `utf16be`, `cp1252`). A conforming implementation
decodes each file per its declared encoding, canonicalizes, and MUST reach the **same pinned
hash** — input encoding is transport, never content. Each sibling's *raw file bytes* hash to
something else entirely: `sha256sum <file>` is the wrong tool, because it digests BOMs,
encoding, and line-ending bytes that Live Verify's decode → canonicalize → UTF-8 → SHA-256
pipeline deliberately sees through. (Aware loaders test the siblings; legacy loaders just hash
the fixture body as usual — the mechanism is backward compatible. Beware platform decoders:
some Node builds silently decode `windows-1252` with latin1 semantics; the JS suite ships its
own WHATWG 0x80–0x9F table for exactly that reason.)

### Image Fixture
```markdown
---
description: Brief description of what this tests
---
![](pics/image-filename.png)
```

Image files are stored in the `pics/` subdirectory.

## How Tests Work

### Text Fixtures
1. Parse body text from markdown
2. Call `normalizeText(body, metadata)`
3. Compute SHA-256 hash
4. Assert hash equals filename

### Image Fixtures
1. Detect `![](pics/path.png)` in body
2. Load image and run OCR (ML Kit on Android, Vision on iOS)
3. Apply `cleanOcrArtifacts()` then `normalizeText()`
4. Compute SHA-256 hash
5. Assert hash equals filename

## Platform Support

| Platform | Text Fixtures | Image Fixtures |
|----------|--------------|----------------|
| JS/Web | Unit tests | N/A (no browser OCR) |
| Android | Unit tests | Instrumented tests (ML Kit) |
| iOS | Unit tests | Instrumented tests (Vision) |

## Adding New Image Fixtures

1. Add image file to the `pics/` subdirectory
2. Create `PLACEHOLDER-{name}.md` pointing to `pics/{image}.png`
3. Run Android instrumented tests: `adb push normalization-hashes /sdcard/ && ./gradlew connectedAndroidTest`
4. Tests will log the ML Kit hash - rename the `.md` file to `{hash}.md`

## Running Android Instrumented Tests

```bash
# Push fixtures to device/emulator
adb push normalization-hashes /sdcard/

# Run instrumented tests
./gradlew connectedAndroidTest
```

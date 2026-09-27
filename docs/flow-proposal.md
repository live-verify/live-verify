# Flow Proposal: Hash the Paragraphs, Not the Line Breaks

**Status: adopted — the two-regime core shipped September 2026.** `verification-meta.json` now
carries `lineBreaks: "faithful" | "flow"` (default `faithful`, so no existing hash changed);
see [SPEC.md §4 step 6](SPEC.md), [NORMALIZATION.md](NORMALIZATION.md), and the
`lineBreaks` entry in [verification-meta-schemas.md](verification-meta-schemas.md). The
conformance corpus has a discriminating flow vector. **Still open:** a `mixed` regime for
prose-around-tables under one `verify:` line — the right shape is a per-line classifier
decidable from the line's own bytes (indent rule, or an issuer-declared row pattern), never
an ordered region list, whose boundaries would reintroduce the very nondeterminism this
proposal removes. The "residual edge case" section below and open questions 1, 3 and 4 are
that remaining work.

Written September 2026, out of a real failure found while
publishing a peer reference (`references.html` on a subject's own site, verifying against
`paulhammant.com/refs`).

## The problem

Live Verify hashes text that contains newlines, and normalization preserves them — Step 3 of
`docs/NORMALIZATION.md` joins the surviving lines with `\n`. So **line breaks are load-bearing:**
the same words with different breaks are a different hash and a different endpoint.

That is fine when line breaks are a property of the *document*. It is a problem when they are a
property of the *reader's screen*.

In Clip mode they are the reader's screen. `apps/browser-extension/content.js` (the Style 2
whole-element path) reconstructs lines from **rendered geometry**, not from markup:

```js
const items = getTextNodesWithPositions(tempDiv);
for (const item of items) {
    if (item.type === 'text') {
        const currentLineIndex = Math.floor(item.rect.top / 20);
        if (currentLineIndex !== lastLineIndex && lastLineIndex !== -1) {
            text += '\n';
        }
        ...
    } else if (item.type === 'br') {
        text += '\n';
        lastLineIndex = -1;
    }
}
```

Two independent break sources: an explicit `<br>`, *and* any text node whose `rect.top` lands in a
different 20px band than its predecessor. The clone is deliberately inserted into the document first
("Temporarily insert to get valid bounding rects") because the algorithm **needs real layout**.

So a soft wrap produces a `\n` with no markup involved. Narrow the viewport until a line re-wraps and
the hash changes — silently, on a document nobody edited.

Two secondary observations from the same reading, both worth fixing independently of this proposal:

- The `20` is a hardcoded line-height assumption. The page that surfaced this renders prose at
  `16.5px × 1.7 ≈ 28px`. It happens to work — consecutive lines still land in distinct bands — but
  the constant should derive from computed line-height.
- `getTextNodesWithPositions` returns text *nodes*, and the band comparison is between nodes. A
  single unbroken text node that soft-wraps across three visual lines contributes one `rect.top` and
  therefore no `\n`. **Soft wrap injects breaks at node boundaries, not at every wrap point** — so
  the failure is width-dependent and intermittent rather than constant. (This last point is inferred
  from how the function is used; its body was not read.)

## Why the obvious escapes don't work

**Media queries.** A media query changes rendered geometry, and geometry is the input. You get one
hash per breakpoint and no way to know which the reader's device produced.

**One endpoint per breakpoint.** Fails twice over. Breakpoints don't partition the space — wrap also
varies with font fallback, user minimum font size, zoom, and `text-size-adjust`, which is continuous,
not N buckets. And even if it did partition cleanly, N valid hashes degrades "verified" from *this
exact text* to *one of N variants the issuer pre-blessed*, while a reader on an unanticipated width
gets a red FAILS on a genuine claim — indistinguishable from tampering. **A verification system whose
false-negative rate depends on the reader's zoom level is not one you can hand someone as evidence.**

**A W3C standard.** There isn't one, and the reason is structural. The platform has serializations
that ignore layout (`textContent`) and it has geometry (`getBoundingClientRect`), but nothing that
canonically serializes *text as laid out*. `innerText` is specified to be layout-aware — wrong
direction by design, not under-specified. `Selection.toString()` is underspecified across engines.
More fundamentally, CSS is a presentation layer explicitly permitted to vary by device; a standard
pinning it down would be a standard against responsive design.

**`white-space: nowrap`.** This *does* work, and is the current stopgap in the reference page: pin
the geometry so soft wrap cannot occur, accept that long lines overflow their container. One endpoint,
identical at every width. The costs are that the claim no longer reflows on a phone, and that a
future "tidy" of the CSS silently breaks every hash. It buys correctness with fragility.

## The proposal

**Un-linebreak everything except `\n\n`.** A single newline is a soft break and collapses to a space;
a blank line is a paragraph separator and survives into the hashed text.

This is Markdown's rule, and LaTeX's, and HTML's own whitespace model. The abstraction is right
because it **draws the line where meaning actually is**: `\n\n` is authored structure, `\n` is
arrangement.

What it buys:

- **Wrap-invariance without losing structure.** Soft wrap at any viewport collapses to nothing, so
  one endpoint serves every screen and paper. Paragraph boundaries still hash, so tampering that
  merges or splits paragraphs is still caught.
- **`<br>` stops being load-bearing.** The `nowrap` hack comes out. Prose reflows on a phone again.
- **A rule people already know.** No new mental model for issuers.

### Tabular content is the exception

Bank statements, receipts, and invoices are the case where line breaks *are* the document. Row
structure is meaning, and collapsing it would let a tampered row hide.

These declare themselves in `verification-meta.json`, which is **path-scoped, not issuer-wide** —
`buildMetaUrl` in `public/app-logic.js` preserves the full base path, so:

```
verify:hsbc.co.uk/prose      → https://hsbc.co.uk/prose/verification-meta.json
verify:hsbc.co.uk/statements → https://hsbc.co.uk/statements/verification-meta.json
```

An issuer with both kinds of document publishes two base URLs with different rules. **The document
declares which regime governs it by which base URL it names on its `verify:` line — and that line is
inside the hashed text.** So the mode is not out-of-band state; repointing a claim at a different
regime changes its hash.

(An earlier draft of this argument objected that a mode switch held outside the hashed content would
silently reinterpret existing hashes. Path-scoping plus the in-text `verify:` line answers that. The
residual risk — an issuer editing the meta file at a fixed path — is a property `charNormalization`
already has today, not something this proposal introduces.)

### The residual edge case

A single page mixing prose and a table under **one** `verify:` line still needs an answer, since one
meta file governs both regions.

The structural answer, for Clip mode only: the DOM already distinguishes them. Text inside
`<tr>`/`<li>`/block-level children is hard-broken by construction — those are block boxes with their
own geometry, and a viewport change cannot flow one row into another. Text inside a paragraph is soft.
So Clip can infer the regime per region with no flag at all.

Camera mode has no DOM and cannot do this, which is precisely what `ocrNormalizationRules` is for.
Camera is where issuer hints are unavoidable regardless.

## Open questions for whoever implements this

1. **Hard-but-not-paragraph breaks.** Verse, postal addresses, signature blocks — a break that is
   meaningful but is not a paragraph boundary. Markdown's own answer (two trailing spaces) is its
   least-loved corner. `<br><br>` vs `<p>` needs a defined mapping.
2. **This re-hashes every existing claim.** It needs fixtures in `normalization-hashes/` and a
   version marker. `hashAlgorithm` is the precedent for negotiating a change of this kind, but a
   dedicated normalization-version field would be the honest place. Clients must fail loudly on an
   unrecognised version rather than falling back — per the project's no-fallback rule.
3. **Does camera mode already do some of this?** `apps/ios/LiveVerify/Pipeline/LineAssembler.swift`
   reconstructs reading-order lines from Vision observations. It may already join or split in ways
   that change the cost of this proposal. **Not read — check before implementing.**
4. **`Intl.Segmenter`** is standards-based (UAX #14) deterministic segmentation, available without
   WASM. Not needed for the collapse rule, but it is the primitive if line-independence ever needs
   defining more rigorously than "replace `\n` with a space."

## What was rejected along the way

- **A `word-wrap-allowed-therefore-ocr-will-never-work` flag.** Names the symptom, not the cause —
  word-wrap isn't what breaks OCR, unpinned line geometry is. A fixed-measure `<pre>` block wraps
  never and OCRs fine; a `<br>`-laden paragraph in a narrow viewport wraps anyway. It also documents
  the problem as unfixable rather than fixing it.
- **Canonical re-layout in a hidden iframe** (fixed width, fixed font, hash *that* geometry). Moves
  the nondeterminism to installed fonts rather than removing it.
- **HarfBuzz-in-WASM with an embedded font.** Genuinely deterministic — you replace the browser's
  layout engine with one you version. Rejected because it spends a font, a shaping library, and a
  versioning commitment to protect bytes that carry no meaning. **The break positions are not part of
  the claim; no tampering is detected by them.** The one scenario that flips this is a printed
  document needing to verify by camera against the *same* endpoint as the web page — see open
  question 3.

## Related

- [Normalization](NORMALIZATION.md) — the Step 3 `\n` join this proposal changes.
- [Page-at-a-Time Hashing](page-at-a-time-hashing.md) — the adjacent question of what the
  verifiable *unit* is; notes that DOM-based reads are strong and camera-OCR reads are fragile on
  dense pages, which is the same asymmetry this proposal leans on.
- [Point-in-Time vs Current](point-in-time-vs-current.md) — house precedent for a docs-level
  correction to an existing mental model.
- [Peer Reference Workflow](peer-reference-workflow.md) — the use case that surfaced this;
  peer references are prose, and prose is exactly where line breaks carry no meaning.
- [Weaknesses Audit](weaknesses_audit.md) — where this belongs if it is accepted as a known gap
  rather than fixed.

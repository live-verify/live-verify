# Page-at-a-Time Hashing: Verifying Multi-Row, Multi-Page Documents

## The problem with short-claim hashing for long documents

Live Verify's core is **text → normalize → SHA-256**, and it shines on a *short* claim: a balance, a
name, a licence number. But many high-value documents are not short — a bank statement, a contract, a
medical record, an insurance schedule. A KYC official scrutinising a presented bank statement does not
only care about the ending balance; they care about the **transaction rows** — the deleted gambling
withdrawal, the inserted deposit. Hashing only a summary block leaves exactly the fraud they're
looking for unverified.

The naive fixes both fail:

- **Hash the whole file (the PDF).** Live Verify is deliberately *not* a hash-the-whole-PDF system
  (see `criteria-template.md`): the same logical statement re-exported, re-OCR'd, or reflowed produces
  different file bytes, so a file hash is brittle and unreproducible across the ways a document
  actually travels.
- **Hash all the visible text of the entire multi-page document as one string.** One OCR slip or
  reflow on any page breaks the single hash for the whole document.

**Page-at-a-time hashing** is the middle path: the verifiable unit is **one rendered page's visible
text**, hashed as a block.

## What page-at-a-time means

Each page of a multi-page document is **independently hashable** — its full visible, human-readable
text (header, summary, *and* the transaction/line rows on that page) is normalized and SHA-256'd as
one unit. A four-page statement has four page hashes. A verifier checks the page(s) in front of them
against the issuer's domain.

This is already the foundation in the protocol: `Technical_Concepts.md` states *"each page is
independently hashable"* and offers an **optional** `compositeHash` manifest that binds the page
hashes together. Page-at-a-time hashing is that per-page primitive used as the *default* verifiable
unit for long documents — with the manifest as an optional add-on, not a requirement.

It catches what summary-only hashing misses: **row-level tampering on a verified page changes that
page's hash**, so a deleted or altered transaction on a page you check is detectable.

## Where it's reliable — and where it isn't (be honest about the mode)

The reliability of page-at-a-time hashing depends entirely on **how the page's text is read**, because
a full page of dense tabular text is far more fragile to capture than a short summary line.

| Mode | Page-at-a-time reliability | Why |
|---|---|---|
| **Chrome extension (clip)** | **Strong.** | Reads the actual DOM text — exact characters, no OCR. A full page of statement rows hashes deterministically. This is the strong case. |
| **PDF mode (future)** | **Strong.** | A PDF viewer extracts the page's text layer directly (like a DOM read), no OCR. The natural home for page-at-a-time. |
| **Phone camera (OCR), printed** | **Fragile on dense pages.** | Every misread row breaks the page hash. Works for a clean, low-density page; degrades fast as transaction rows pile up. A short summary line survives OCR far better than 40 rows of figures. |

**The honest rule:** page-at-a-time works wherever the text is read *digitally* (extension, PDF
viewer); it degrades with **OCR density** (camera on a printed, row-dense page). For documents whose
fraud lives in the rows *and* which are typically presented on paper, prefer the extension/PDF path,
or fall back to summary-block hashing in camera mode and tell the verifier that's what happened — never
silently imply the rows were checked when OCR couldn't reliably read them.

## The limitation of independent per-page hashes: the removed page

The chosen default is **independent per-page hashes** (each page its own claim with its own `verify:`
line), without requiring a binding manifest. This is simpler and sufficient for the common case — but
it has one honest limitation worth stating plainly:

> Independent per-page verification proves each page *you are shown* is genuine. It does **not** prove
> you were shown *all* the pages. A fraudster can present pages 1, 2, and 4 of a four-page statement —
> each verifying perfectly — while omitting page 3 (the one with the embarrassing transactions). You
> verified what you saw; you can't verify what you weren't given.

The fix when this matters is the **optional `compositeHash` manifest** (`Technical_Concepts.md`): the
verification response for any page reports `thisPage`, `totalPages`, and the composite hash of all
pages — so a verifier checking page 2 of 4 learns a page is missing if only three are presented. Use
the manifest when *completeness* matters (KYC, legal disclosure); skip it when verifying any single
page on its own is enough (a one-page proof of address). Page-at-a-time is the unit either way; the
manifest is the optional integrity wrapper around the set.

## Application: the KYC counter

A bank statement is the canonical case. The KYC official scrutinises rows, not just the balance, and
the document is most reliably presented as a **PDF or on-screen** (where page-at-a-time is strong) — so
this is squarely the extension/PDF path, not the dense-camera path. The flow:

- The customer presents the statement; the official verifies the page(s) of interest against the
  **bank's own domain** (`chase.com`, `barclays.co.uk`) — no customer password, no scraping app.
- Each page's full text (rows included) is hashed, so an inserted deposit or deleted withdrawal on a
  checked page fails to verify.
- If completeness matters, the manifest reveals a missing page — defeating the "present pages 1, 2,
  and 4" omission attack.

See [Bank Statements](../public/use-cases/bank-statements.md) for the worked use case.

## Related

- [Technical Concepts — Multi-Page Document Manifests](Technical_Concepts.md) — the `compositeHash` /
  `thisPage` / `totalPages` manifest mechanics this pattern builds on.
- [Verification Modes](VERIFICATION-MODES.md) — the Clip / Camera / future-PDF modes whose
  text-reading method determines page-at-a-time reliability.
- [Multi-Representation Verification](Multi_Representation_Verification.md) — the related idea that one
  fact can have several valid hashes (ornate vs. plain-text).
- [Bank Statements](../public/use-cases/bank-statements.md) — the canonical KYC application.

# No Patents: Defensive Publication Declaration

**Live Verify is not patented, is not patentable by anyone, and is offered as a free open standard.**

This is not a promise that could later be broken — it is a statement of fact about prior art.

## The prior-art date

The core invention — extracting text from a document (by OCR or selection), **normalizing** it by a
defined set of rules, computing a **SHA-256 hash**, and verifying authenticity by a **URL lookup
against the issuing domain** — was **publicly disclosed on 17 January 2023** in a post on a public,
dated blog:

> *"OCR-to-Hash: A Simple Audit Trail for Physical Documents"* (17 January 2023) —
> *"use OCR to extract text, normalize it, hash it, and verify authenticity through a simple URL
> lookup,"* including the literal normalization rules (remove leading/trailing spaces, collapse
> multiple spaces, preserve blank lines) that remain in the canonical `public/normalize.js` to this
> day.

That post described the mechanism that is implemented in this repository. It is a documentary,
timestamped, public disclosure of the actual invention.

## Why this means it cannot be patented

Patent law requires an invention to be **novel** at the time a patent application is filed. A public
disclosure destroys novelty:

- In the **United States** and some other jurisdictions, a public disclosure starts a **12-month grace
  period** within which only the discloser may still file. That window opened on 17 January 2023 and
  **closed on 17 January 2024.**
- In **Europe** and much of the rest of the world, public disclosure is **immediately
  novelty-destroying** — there is no grace period at all.

The disclosure is now **more than three years old.** The window to patent this invention has therefore
closed **everywhere, for everyone — including the author.** Nobody can validly obtain a patent on the
core Live Verify mechanism, because it was put into the public domain as prior art years before any
such application could succeed.

This was deliberate. Publishing the invention openly, dated, and in detail was a **defensive
publication**: it guarantees the standard can be adopted freely without the risk that a patent might
later be asserted to rug-pull adopters or toll-gate the rails.

## What this covers (and what it doesn't)

- **Covered:** the core mechanism — text → normalize → SHA-256 → domain lookup — and the variations
  elaborated openly in this repository over the years since (authority chains, salting, the
  verification-response format, and the rest of the published design). These are prior art by virtue
  of being public.
- **Not a claim about unrelated future inventions:** this declaration concerns the Live Verify
  mechanism as disclosed. It does not, and need not, speak to genuinely separate inventions someone
  might build *alongside* the standard. The point is narrow and strong: **the rails themselves are
  unpatentable prior art.**

## Relationship to the licence

This is distinct from, and additional to, the [Apache 2.0 licence](../LICENSE). The licence governs
how the **code** may be used and includes an explicit patent grant from contributors. This declaration
addresses a different question — whether the **invention** could be patent-encumbered by anyone at all
— and answers it with prior art rather than a grant. Together: the code is openly licensed, *and* the
underlying method is unpatentable.

## One-line version

> The Live Verify method was publicly disclosed in a dated blog post on 17 January 2023. The novelty
> window for patenting it has closed in every jurisdiction. It is unpatentable prior art, free for
> anyone to adopt, and that cannot be reversed.

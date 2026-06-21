# Licensing

Live Verify uses **two licenses** — one for the software, one for the content — because they are
different kinds of work with different appropriate licenses.

## Code → Apache License 2.0

All **software** is licensed under the [Apache License, Version 2.0](LICENSE):

- the applications under `apps/` (iOS, Android, browser extension)
- the canonical JavaScript and other scripts (`public/*.js`, `scripts/`, build tooling)
- any other code in the repository

Apache 2.0 is a software license: it includes an explicit patent grant from contributors and the
provisions (NOTICE files, source-modification semantics) that make sense for code. Code files carry an
Apache 2.0 header.

## Content → Creative Commons Attribution-ShareAlike 4.0 (CC BY-SA 4.0)

All **non-code content** is licensed under
[CC BY-SA 4.0](LICENSE-CONTENT) ([full text](https://creativecommons.org/licenses/by-sa/4.0/legalcode)):

- the use-case documents (`public/use-cases/`, `public/rejected-use-cases/`)
- the design and strategy documents (`docs/`)
- the website prose (the text content of `public/*.html`)

Content is prose, not software, so a software license is the wrong tool for it. CC BY-SA 4.0 lets
anyone freely copy, adapt, and build on the material — including commercially — provided they
**attribute** Paul Hammant / the Live Verify project and keep derivatives under the **same open
license** (share-alike). The share-alike term is deliberate: it lets the corpus of ideas spread
without friction while ensuring adaptations stay open and the body of work cannot be enclosed into a
proprietary product.

## Why split rather than one license

Apache 2.0 is excellent for the apps and the canonical normalization/verification code. Applied to
hundreds of prose documents it is awkward — it has no sensible story for attributing a remixed
document and confuses reusers. CC BY-SA is the standard, well-understood license for open content, and
it matches the project's goal: the ideas are meant to spread freely and stay open.

## What about patents?

Separately from both licenses, the **core Live Verify method is unpatentable prior art** — it was
publicly disclosed in a dated blog post on 17 January 2023, closing the novelty window in every
jurisdiction. This is a fact about prior art, not a license grant. See
[docs/no-patents-declaration.md](docs/no-patents-declaration.md).

## Quick reference

| What | License |
|---|---|
| `apps/`, `public/*.js`, `scripts/`, build tooling, all code | Apache 2.0 (`LICENSE`) |
| `public/use-cases/`, `public/rejected-use-cases/` | CC BY-SA 4.0 (`LICENSE-CONTENT`) |
| `docs/` | CC BY-SA 4.0 |
| Website prose (text of `public/*.html`) | CC BY-SA 4.0 |
| The core method itself (patents) | Unpatentable prior art — see no-patents declaration |

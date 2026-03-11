# Verified CV Format (`.vcv`)

## Why Not JSON Resume?

[JSON Resume](https://jsonresume.org) is an open-source initiative started in 2013 to create a JSON-based standard for resumes. It defines a schema with structured sections — `work`, `education`, `certificates`, `skills`, `references`, `projects` — and a theme ecosystem that renders the JSON into styled HTML. It's well-designed, community-maintained, and solves the problem it set out to solve: portable, machine-readable, themeable resumes.

It does not solve the problem of *trust*.

Every field in a JSON Resume is self-declared. `work[0].name: "Acme Corp"` and `work[0].position: "Senior Engineer"` sit alongside `work[0].summary: "Led the payment pipeline rebuild"` — and all three have exactly the same evidentiary weight: zero. A bot parsing 1,000 JSON Resumes can extract structured data flawlessly. It cannot tell which fields are true.

The `.vcv` format described here takes the opposite approach. The structure is looser — no fixed schema, no typed fields, mixed prose and key-value pairs. But every claim is independently verifiable against the issuer's domain. What you lose in schema cleanliness you gain in cryptographic proof.

| | JSON Resume | `.vcv` (Verified CV) |
|---|---|---|
| **Data format** | Strict JSON schema | Loose plain text with `verify:` delimiters |
| **Who writes it** | The candidate | Issuers write the claims; the candidate assembles the file and adds `commentary:` |
| **Verification** | None — all fields are self-declared | Each claim hashed and checked against the issuer's domain |
| **Rendering** | Theme ecosystem (community templates) | Web component fetches `verification-meta.json` for logos, names, authority chains |
| **Machine readability** | Excellent — typed fields, predictable paths | Good enough — any LLM extracts structured data from prose |
| **Trust signal** | "This person says they worked at Acme" | "Acme's HR domain confirms this person worked there" |
| **Commentary / narrative** | Blended into `summary` and `highlights` — same trust level as facts | Explicitly separated via `commentary:` — visually and structurally distinct from verified claims |
| **Peer references** | `references[].reference` — self-declared text, unverifiable | `[section: references]` claims verified against the referee's own domain |

In 2013, machine readability was the bottleneck. Recruiters needed structured data to feed into applicant tracking systems. JSON Resume solved that.

In 2026, extraction is trivial — LLMs parse unstructured CVs as well as structured ones. The bottleneck is now *verification*. An AI recruiter scanning thousands of candidates doesn't need cleaner JSON. It needs to know which claims are real.

The two formats are not competitors. A `.vcv` file could be *converted* to JSON Resume for systems that expect it — the structured fields are extractable. But the `verify:` lines and `commentary:` separation would be lost in translation, and with them the only thing that makes a CV more than a self-declaration.

## Overview

A `.vcv` file is a plain-text document containing a series of claims, each terminated by a `verify:` line. The terminator takes one of two forms: `verify:domain.com/path` (issuer-attested, hash checked) or `verify:not-possible` (self-declared, no issuer available). Section headers in `[section: ...]` syntax group claims by category. Between those boundaries, the content can be anything — structured `key = value` pairs, free-form prose, or a mix of both.

The format supports a natural transition from traditional CVs to fully verified ones. A candidate can adopt `.vcv` immediately with `verify:not-possible` on every claim, then replace them with `verify:domain.com/path` one at a time as issuers come online. A renderer can show progress: "4 of 7 claims verified."

The issuer decides what they hash. The CV owner decides how to present it. The format doesn't impose a schema on either. Each issuer's `verification-meta.json` provides context about who they are (formal name, registration numbers, authority chain) — the `.vcv` file doesn't need to repeat it.

This is a data format, not a site generator. A web component or aggregator renders it for humans. A bot reads it as a flat list of claims delimited by terminator lines.

## File Extension

`.vcv` (Verified CV) — or just `.txt`. The format is self-describing: the first line identifies it.

## Encoding

- **UTF-8, mandatory.** No other encoding is supported. The hash is defined as `SHA-256(UTF-8 bytes of normalised text)` — a file saved as Latin-1 or UTF-16 will produce different bytes, different hashes, and failed verification.
- **No BOM.** A UTF-8 BOM (`EF BB BF`) would become part of the first line and break parsing. Parsers SHOULD silently strip a leading BOM if encountered (common on Windows-origin files).
- **Line endings:** `\r\n` and `\r` collapse to `\n` during normalisation, so Windows line endings don't break hashes.

## Format Declaration

The first line of every `.vcv` file MUST be:

```
vcv: utf8
```

This serves as both a magic number (identifying the file as `.vcv` format) and an encoding declaration. Parsers encountering a file without this line SHOULD reject it rather than guessing.

The declaration line is not part of any claim. Parsing begins after it.

## What `.vcv` Is Not

The `key = value` pairs look like INI entries. The resemblance is cosmetic. `.vcv` files are **not** INI files:

- **No comments.** INI uses `;` or `#` for comments. In `.vcv`, every character between two `verify:` lines is part of the claim and gets hashed. A line starting with `;` is claim text, not a comment.
- **No section scoping.** INI treats `[section]` as a namespace — `port` under `[database]` becomes `database.port`. In `.vcv`, `[section: ...]` headers are rendering hints only. They don't scope anything.
- **No key-value semantics.** INI parsers split on `=` to produce a dictionary. In `.vcv`, `=` is just a character. Some issuers produce `Role = Senior Engineer`; others produce prose. The parser doesn't split on `=`.
- **No escaping or quoting.** INI interprets `\"`, `\\`, and quoted strings. In `.vcv`, a backslash is a backslash, a quote is a quote. They all go into the hash.
- **No multi-line continuation.** Some INI dialects use trailing `\` or indentation for continuation. In `.vcv`, line breaks are line breaks — normalised and hashed as-is.
- **No duplicate key merging.** INI parsers may merge or override duplicate keys. `.vcv` has no keys, so there's nothing to merge.
- **No arbitrary section names.** INI allows any `[heading]`. `.vcv` uses `[section: X]` syntax with a fixed set of seven recognised values (see Section Headers below). A line matching `[section: unknown]` is an error. A bare `[anything]` without the `section: ` prefix is ordinary content — not a header.

## The `verify:` Terminator

Every claim block ends with a `verify:` line. This is the only claim terminator in the format — one keyword, two forms:

| Form | Meaning | Renderer Treatment |
|---|---|---|
| `verify:domain.com/path` | Issuer-attested. Hash checked against the issuer's endpoint. | Green tick, issuer name from `verification-meta.json`, authority chain |
| `verify:not-possible` | Self-declared. No issuer attestation available. | Grey indicator, "self-declared" label, no tick |

Both forms work the same way structurally: they end the claim block, and a `commentary:` block may follow. The difference is what the renderer does with them.

### `verify:domain.com/path` — Issuer-Attested Claims

The core of `.vcv`. The issuer hashed the claim text; the parser normalises, hashes, and checks the endpoint. This is the only form that produces a verification badge. See Verification Flow below for the full sequence.

### `verify:not-possible` — Self-Declared Claims

For the transition period. Most issuers don't have `verify:` endpoints yet. A candidate converting a traditional CV to `.vcv` marks every claim as `verify:not-possible` and gains the format's structure, section organisation, and commentary separation — without waiting for issuers to catch up.

As issuers come online, the candidate replaces `verify:not-possible` with `verify:domain.com/path` one claim at a time. The file gets progressively more trustworthy. A renderer can show a summary: "4 of 7 employment claims verified, 2 self-declared."

`verify:not-possible` is not a failure state — it's the honest equivalent of every claim on every traditional CV ever written. The difference is that `.vcv` makes the distinction explicit. A LinkedIn profile where every field is self-declared doesn't *tell* you that. A `.vcv` file does.

### The Transition: `not-possible` → Verified

A publication starts as self-declared with a URL in the claim content:

```
"Distributed Hash Tables for Credential Verification"
Journal of Applied Cryptography, Vol 12, 2024
https://doi.org/10.1234/jac.2024.5678
verify:not-possible
```

When the publisher sets up verification endpoints, the candidate updates the claim to match what the publisher actually hashed — which will include the author's name — and replaces the terminator:

```
"Distributed Hash Tables for Credential Verification"
Co-author Paul J Hammant
Journal of Applied Cryptography, Vol 12, 2024
https://doi.org/10.1234/jac.2024.5678
verify:v.doi.org/credits
```

The publisher's hashed text **must** include the author name — otherwise anyone could claim any paper as theirs. The hash ties the publication to the person. If John Smith's `.vcv` claims co-authorship, the hash only verifies against `v.doi.org/credits` if John Smith's name is in the text the publisher signed.

The DOI link stays in the content — it's part of what the publisher hashed. A renderer can detect `https://` lines in claim content and make them clickable. That's a rendering concern, not a format concern.

This same transition applies to every section: an award starts as `verify:not-possible` with a URL to the awarding body's page, then becomes `verify:awards.acm.org/v` when they publish endpoints. Employment starts as `verify:not-possible`, then becomes `verify:hr.acmecorp.com/hashes/staff`. The pattern is always the same: self-declared today, verified when the issuer is ready.

## Format

```
vcv: utf8

[section: basics]
name = John P Smith
email = john@johnpsmith.dev
url = https://johnpsmith.dev
location = London, UK
github = github.com/jsmith
linkedin = linkedin.com/in/johnpsmith

[section: employment]

John P Smith was a Senior Engineer
from March 2019 to November 2023
verify:hr.acmecorp.com/hashes/staff

commentary: I led the **payment pipeline rebuild**,
  migrated from Oracle to Postgres, and mentored
  four junior engineers through to promotion.
  - Reduced payment processing time from 4s to 200ms
  - Zero data loss during the migration

Name = John P Smith
Role = Junior Developer
Employed from = September 2016
Employed To = February 2019
verify:not-possible

commentary: My first role out of university.
  Progressed from bug fixes to owning the
  [inventory sync service](https://github.com/jsmith/inv-sync)
  by year two. Widgets Inc hasn't set up verification
  endpoints yet — this claim will be verified when they do.

[section: qualifications]
name = John P Smith
qualification = BEng Computer Science
class = First
year = 2018
verify:registrar.imperial.ac.uk/degrees

John P Smith
qualification = A-Levels: Maths (A*), Physics (A), Computer Science (A)
year = 2015
verify:not-possible

[section: certifications]
John P Smith
name = AWS Solutions Architect Professional
awarded = January 2024
expires = January 2027
verify:certs.aws.amazon.com/

John P Smith
name = Chartered Engineer (CEng)
verify:engc.org.uk/refs

[section: references]
John P Smith
I, Paul Jones, pair-programmed with John for six months
on the payment pipeline rebuild. He writes the
clearest technical specs I've ever reviewed and
his systems thinking is exceptional.
verify:pauljones.dev/refs

I Sarah Chen.
collaborated on three open-source projects over
two years with John P Smith. He Writes documentation
that other people actually read, which in this
industry is a superpower.
verify:sarah-chen.com/v

I managed John Smith for four years. Promoted twice
on merit. Left on excellent terms. Would hire
in another company without hesitation.
verify:hr.ejazkhan.com/refs

[section: publications]

"Distributed Hash Tables for Credential Verification"
Journal of Applied Cryptography, Vol 12, 2024
https://doi.org/10.1234/jac.2024.5678
verify:not-possible

commentary: My first peer-reviewed paper. Covers the
  theoretical basis for domain-bound verification.

"On the Practical Limits of OCR-Based Document Verification"
Proceedings of ACM CCS 2025
https://doi.org/10.1145/example.2025.001
verify:not-possible

[section: awards]

ACM Distinguished Paper Award, 2024
https://awards.acm.org/2024/distinguished/example
verify:not-possible

commentary: For the "Distributed Hash Tables" paper above.
```

## What the Issuer Hashes

Each issuer hashes everything between the previous `verify:` line (or section header, or start of file) and their own `verify:` line — excluding the `verify:` line itself. The section header is not part of the hash. The content can be structured, prose, or a mix.

**For the first `[section: employment]` claim verified by `hr.acmecorp.com/hashes/staff`:**

The issuer hashed:
```
John P Smith was a Senior Engineer
from March 2019 to November 2023
```

Pure prose. Acme's HR system produced this text. The domain `hr.acmecorp.com` is their identity — `https://hr.acmecorp.com/hashes/staff/verification-meta.json` provides the formal company name, Companies House number, and authority chain. A renderer fetches this and displays "Acme Corporation Ltd" alongside the claim.

**For the second `[section: employment]` claim verified by `hr.widgets.io/v`:**

The issuer hashed:
```
Name = John P Smith
Role = Junior Developer
Employed from = September 2016
Employed To = February 2019
```

Structured key-value pairs. Widgets Inc's system produced it differently from Acme's. Both are valid. The format doesn't care.

**For the peer reference verified by `pauljones.dev/refs`:**

The issuer hashed:
```
John P Smith
I, Paul Jones, pair-programmed with John for six months
on the payment pipeline rebuild. He writes the
clearest technical specs I've ever reviewed and
his systems thinking is exceptional.
```

Free-form prose with the subject's name included. Paul hashed exactly what he wrote — including John's name, because he's attesting about a specific person. Paul's `verification-meta.json` might provide his full name and professional links, or it might not. The domain is the identity.

**Note:** Each issuer uses whatever URL path they chose — `hr.acmecorp.com/hashes/staff`, `hr.widgets.io/v`, `registrar.imperial.ac.uk/degrees`, `pauljones.dev/refs`. The path is the issuer's decision. The format doesn't impose a convention.

## The Issuer Supplies the Presentation Context

The CV file contains only claims and `verify:` lines. Everything else a renderer needs to build a presentable page comes from the issuer's `verification-meta.json`. Every issuer — employer, university, exam board, peer — provides metadata that aids the rendered experience:

```
hr.acmecorp.com/hashes/staff/verification-meta.json
  → formalName: "Acme Corporation Ltd"
  → description: "Employs staff"
  → logo: "https://hr.acmecorp.com/logo.svg"
  → authorizedBy: "companieshouse.gov.uk"
  → industry: "Aerospace Manufacturing"

registrar.imperial.ac.uk/degrees/verification-meta.json
  → formalName: "Imperial College London"
  → description: "Awards undergraduate degrees"
  → logo: "https://registrar.imperial.ac.uk/crest.svg"
  → authorizedBy: "officeforstudents.org.uk"

pauljones.dev/refs/verification-meta.json
  → formalName: "Paul Jones"
  → description: "Select peer references"
  → url: "https://pauljones.dev"
```

The renderer fetches these in parallel as it verifies each claim. The result: company names, logos, authority chains, professional context for peer endorsers — all supplied by the issuers themselves, not typed into the CV file by the candidate. The candidate can't fake "Acme Corporation Ltd" because it comes from `hr.acmecorp.com`, not from the `.vcv` file.

This means the CV file stays small and claims-only. The richness of the rendered page scales with how much metadata each issuer publishes. A university with a crest, an accreditation chain, and a formal name produces a richer rendered section than a peer endorser with just a name and a URL — and that's appropriate.

## Section Headers

Section headers use the syntax `[section: X]` where `X` is one of seven recognised values. This is a closed set — the parser knows all of them. A line matching `[section: unknown]` is an error (reject or warn). A bare `[anything]` without the `section: ` prefix is ordinary content, not a header — this avoids collisions with markdown links (`[text](url)`), checkboxes (`[x]`), and editorial annotations (`[see attached]`) that may appear in commentary blocks.

| Section | Contains | Typical Issuer |
|---|---|---|
| `[section: basics]` | Name, contact, links | None — candidate's self-declaration, no `verify:` lines |
| `[section: employment]` | All employment claims, multiple issuers | Employer HR domains |
| `[section: qualifications]` | Degrees, diplomas, academic credentials | University registrars, exam boards |
| `[section: certifications]` | Professional certs, licences, accreditations | Certification bodies, training providers |
| `[section: references]` | Peer and managerial endorsements | Individuals on their own domains |
| `[section: publications]` | Papers, books, articles | Publisher domains |
| `[section: awards]` | Professional awards, honours | Awarding body domains |

**One section per category, not per claim.** Each section groups all claims of that type. The `[section: references]` section in the example above contains three references from three different people, each terminated by their own `verify:` line. The section header groups them for presentation — the `verify:` line delimits them for parsing.

**Content within a claim can be anything.** Structured key-value pairs, free-form prose, or a mix. The first employment claim is prose ("John P Smith was a Senior Engineer from March 2019 to November 2023"). The second uses `key = value` pairs. Both are in the same `[section: employment]` section. The format doesn't force consistency — the issuer writes whatever their system produces, and the parser handles it.

**Edge cases go in the closest fit.** A patent is a `[section: publications]`. A client project is `[section: employment]` with the client's domain as issuer. Volunteering is `[section: employment]` with the charity's domain. The seven sections cover the categories a recruiter looks for — there is no need for `[section: patents]`, `[section: projects]`, or `[section: volunteering]`.

## Commentary: The Candidate's Own Words

A `commentary:` block follows the `verify:` line it pertains to, separated by a blank line for readability. It is the candidate's addition — not hashed, not verified, clearly theirs. It continues until the next claim, section header, or end of file. The content supports markdown.

```
John P Smith was a Senior Engineer
from March 2019 to November 2023
verify:hr.acmecorp.com/hashes/staff

commentary: I led the **payment pipeline rebuild**,
  mass migrated from Oracle to Postgres, and
  mentored four junior engineers through to promotion.

  Key outcomes:
  - Reduced payment processing time from 4s to 200ms
  - Zero data loss during the Oracle→Postgres migration
  - All four mentees promoted within 18 months
```

The verified text ("Senior Engineer from March 2019 to November 2023") is what the employer signed. The commentary is what the candidate wants you to know about what they actually *did* during that time. The employer's system doesn't capture "led the payment pipeline rebuild" — that's the candidate's characterisation of their own work.

**Why this is useful:**

Issuers produce terse, factual text — role, dates, qualification, grade. That's what they're willing to hash. But a CV needs narrative: what you built, what you learned, why you left. The `commentary:` block is where the candidate adds that narrative, explicitly separated from the verified claim. Markdown support means the commentary can be as rich as the candidate needs — bullet lists, bold emphasis, links to portfolio pieces.

**Why the separation matters:**

A renderer displays them differently — verified text gets a tick, commentary gets a different visual treatment (no tick, different background, labelled as the candidate's words). A bot can distinguish between what's attested and what's claimed. A recruiter's AI can compare the two and flag stretches: "The verified text says 'Junior Developer'. The commentary says 'owning the inventory sync service by year two' — plausible progression but not confirmed by the employer."

The candidate *wants* this transparency. Putting unverified claims next to verified ones, clearly labelled, signals confidence: "Here's what my employer signed. Here's what I say I did. Compare them."

**Commentary can be AI-assisted.** The candidate might use an AI to polish terse issuer text into readable prose. That's fine — the original verified text is right there for comparison. A prospective employer can use their own AI to assess how fair the restatement is. The format makes this comparison trivial because the boundary between verified and unverified is explicit.

## Privacy: Public vs Private Claims

The CV owner controls which claims appear in which version of the file:

- **Public version** (personal website): `[section: employment]`, `[section: qualifications]`, `[section: certifications]` — facts the owner is happy for the world to see and scrapers to index.
- **Full version** (sent to a specific recruiter): adds `[section: references]` — warm endorsements shared selectively.

The hashes exist at the issuer endpoints regardless — but a hash is meaningless without the plaintext. A scraper that finds `pauljones.dev/refs/{hash}` returning `OK` knows a reference exists but can't read it.

## Parsing Rules

The parser needs four rules:

1. **First line must be `vcv: utf8`.** If absent, reject the file. This line is not part of any claim.
2. **Split on `verify:` lines.** Every `verify:` line is a claim terminator. Everything between two `verify:` lines (or between a section header and a `verify:` line) is one claim. The `verify:` line itself is not part of the claim content — but what follows the colon tells the parser the claim's status: a domain path (hash-verify it) or `not-possible` (render as self-declared).
3. **`commentary:` lines are not part of any claim.** Text after a `commentary:` line belongs to the candidate, not to the issuer. It is not hashed and not verified. Commentary continues until the next claim, section header, or end of file.
4. **`[section: X]` lines are section headers**, not claim content. `X` must be one of the seven recognised values. Lines matching `[section: unknown]` are errors. Bare `[anything]` without the `section: ` prefix is ordinary content.

Section headers are grouping hints for renderers. If present, they help organise the output. If absent, the claims are still independently verifiable — just ungrouped.

**Summary of all line-level keywords:**

| Keyword | Role | Part of claim hash? |
|---|---|---|
| `vcv: utf8` | File declaration (line 1 only) | No |
| `[section: X]` | Section header (one of seven values) | No |
| `verify:domain/path` | Claim terminator — issuer-attested | No |
| `verify:not-possible` | Claim terminator — self-declared | No |
| `commentary:` | Candidate's own words | No |
| Everything else | Claim text | **Yes** |

## Rendering: The `<verified-cv>` Web Component

The intended renderer is a future web component — a single `.js` file that works in any browser and any WebKit/Chromium wrapper:

```html
<script src="verified-cv.js"></script>
<verified-cv src="john.vcv"></verified-cv>
```

The component fetches the `.vcv` file, parses it, verifies each claim in parallel, fetches `verification-meta.json` for each issuer, and renders the result. Static hosting only — no server-side logic needed beyond serving files.

### Interactive Experience

The rendered CV is not a static page — it's an interactive document:

- **Progressive verification.** Claims render immediately with a "verifying..." state. As each endpoint responds, the badge updates to verified, not found, or revoked. The user sees verification happening in real time.
- **Issuer detail on tap/hover.** Hovering on a claim's verification badge shows `{formalName} — {description}` from the issuer's `verification-meta.json` (e.g., "Acme Corporation Ltd — Employs staff"). Tapping expands to show the full authority chain, logo, and accreditation — same display as the [authority chain app display](authority-chain-app-display.md).
- **Narrative / Facts toggle.** A global toggle switches the entire CV between two views. **Narrative view** (default): commentary is shown front and centre, verified claim text appears on hover — the candidate's story leads, with proof behind it. **Facts view**: verified claim text is shown with ticks, commentary retreats to hover — the recruiter sees only what issuers signed. One click flips every claim in the CV. A hiring manager reads narrative; a compliance-focused recruiter reads facts.
- **Section navigation.** The seven `[section: ...]` headers become a navigable sidebar or tab bar. The component reads the section headers and builds the navigation automatically.
- **Collapse, expand, dismiss.** Sections and individual claims are collapsible. A recruiter scanning for certifications can collapse `[section: employment]` and `[section: qualifications]` entirely. Claims or whole sections can be dismissed — hidden from view for this reading session. The underlying data doesn't change; the reader is curating their own view of the CV. A "reset" restores everything.
- **Two-state visual distinction.** `verify:domain/path` claims get a green tick. `verify:not-possible` claims get a grey "self-declared" label. Commentary gets a different background and no badge. The reader always knows what's attested, what's self-declared, and what's the candidate's own words.
- **Copy/export.** The component can export the verified data as JSON (for applicant tracking systems) or as a printable PDF. The export preserves the verified/commentary distinction.

### Desktop App via Tauri

The same web component works inside a [Tauri](https://tauri.app/) shell for recruiters who want a desktop application rather than a browser tab. Tauri uses the OS's native WebKit (macOS/Linux) or WebView2 (Windows), so the binary is ~3-5MB — not Electron's 150MB. The component is identical; Tauri just provides the window frame and file-open dialog.

A recruiter drags a `.vcv` file onto the Tauri app. The component renders it, verifies every claim, and presents the interactive CV. No browser required, no server required, no account required. The `.vcv` file and the verification endpoints are the only dependencies.

### CORS Requirement

The web component makes cross-origin `fetch()` calls to every issuer's verification endpoint. This only works if issuers serve `Access-Control-Allow-Origin: *` on all GET responses — both hash lookups and `verification-meta.json`.

This is a **specification requirement**, not an optional nicety. Verification endpoints are public, read-only, unauthenticated GET endpoints returning a status code and a short body. There is no security reason to restrict cross-origin reads. An endpoint without CORS headers is a broken endpoint — same as one returning malformed responses.

CORS `*` does not mean unprotected. Issuers retain full control over server-side defenses: rate limiting (per-IP, per-ASN), Cloudflare or equivalent WAF, geographic restrictions, throttling. The header simply means "browsers are allowed to read the response" — it doesn't bypass any of those mechanisms.

SaaS verification providers (see [SAAS-VERIFICATION-PROVIDERS.md](SAAS-VERIFICATION-PROVIDERS.md)) handle this by default. Self-hosted issuers need one line in their nginx/caddy config.

## Verification Flow

1. A renderer (web component, aggregator, recruiter tool) reads the `.vcv` file.
2. It confirms the first line is `vcv: utf8`. If not, rejects the file.
3. It splits on `verify:` lines to extract individual claims.
4. For each claim, it checks what follows `verify:`:
   - **`verify:domain/path`** — fetch `verification-meta.json` for issuer context (including optional `verifyEndpoint` delegation and `hashSuffix`). Normalise the text (see [NORMALIZATION.md](NORMALIZATION.md)), compute SHA-256, build the lookup URL as `https://{endpoint}/{hash}{hashSuffix}` and fetch it. `200 OK` → verified. `404` → not found. `200 REVOKED` → credential withdrawn.
   - **`verify:not-possible`** — render the claim with a "self-declared" indicator. No hash, no network request.
5. It renders each claim with the appropriate visual treatment: green tick for verified, grey indicator for self-declared.

## What a Bot Sees

A bot parsing this file gets a flat list of claims, each with a `verify:` terminator. No API integration needed. No OAuth. No schema negotiation. For each claim:

- The enclosing section header (if any) hints at the claim category
- The content is the claim — prose, key-value pairs, or a mix
- The `verify:` line tells it the claim's status: a domain path (hash-verify it) or `not-possible` (self-declared)
- Any `commentary:` text is the candidate's unverified addition — useful context, but not attested

An AI recruiter bot can read 1,000 `.vcv` files and sort candidates by verification coverage — "this candidate has 6 of 7 claims verified" vs "this candidate has 7 of 7 self-declared." The bot can also compare commentary against verified claims to flag candidates who overstate their contributions, and follow `https://` URLs in claim content to assess publications.

## What a Human Sees

A web component reads the same file and renders a formatted, navigable CV:

- Employment history with company names pulled from `verification-meta.json` — verified claims get green ticks, `not-possible` claims get grey "self-declared" labels
- Qualifications with institution crests and accreditation chains
- Certifications with expiry dates and verification badges
- Publications with `https://` URLs in the claim text rendered as clickable links (DOIs, journals, conference proceedings)
- Awards with links to awarding body pages
- References (if present in this version of the file) with verification status
- Candidate commentary visually distinct from claims — no badge, different treatment, clearly labelled as the candidate's words
- A verification summary: "5 verified, 4 self-declared"

The rendering is a presentation layer over the same flat data the bot reads. The file is the single source of truth. The commentary is the candidate's voice layered on top.

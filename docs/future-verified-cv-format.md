# Verified CV Format

## Why Not JSON Resume?

[JSON Resume](https://jsonresume.org) is an open-source initiative started in 2013 to create a JSON-based standard for resumes. It defines a schema with structured sections — `work`, `education`, `certificates`, `skills`, `references`, `projects` — and a theme ecosystem that renders the JSON into styled HTML. It's well-designed, community-maintained, and solves the problem it set out to solve: portable, machine-readable, themeable resumes.

It does not solve the problem of *trust*.

Every field in a JSON Resume is self-declared. `work[0].name: "Acme Corp"` and `work[0].position: "Senior Engineer"` sit alongside `work[0].summary: "Led the payment pipeline rebuild"` — and all three have exactly the same evidentiary weight: zero. A bot parsing 1,000 JSON Resumes can extract structured data flawlessly. It cannot tell which fields are true.

The `.cvv` format described here takes the opposite approach. The structure is looser — no fixed schema, no typed fields, mixed prose and key-value pairs. But every claim is independently verifiable against the issuer's domain. What you lose in schema cleanliness you gain in cryptographic proof.

| | JSON Resume | `.cvv` (Verified CV) |
|---|---|---|
| **Data format** | Strict JSON schema | Loose plain text with `verify:` delimiters |
| **Who writes it** | The candidate | Issuers write the claims; the candidate assembles the file and adds `commentary:` |
| **Verification** | None — all fields are self-declared | Each claim hashed and checked against the issuer's domain |
| **Rendering** | Theme ecosystem (community templates) | Web component fetches `verification-meta.json` for logos, names, authority chains |
| **Machine readability** | Excellent — typed fields, predictable paths | Good enough — any LLM extracts structured data from prose |
| **Trust signal** | "This person says they worked at Acme" | "Acme's HR domain confirms this person worked there" |
| **Commentary / narrative** | Blended into `summary` and `highlights` — same trust level as facts | Explicitly separated via `commentary:` — visually and structurally distinct from verified claims |
| **Peer references** | `references[].reference` — self-declared text, unverifiable | `[peer reference]` claims verified against the referee's own domain |

In 2013, machine readability was the bottleneck. Recruiters needed structured data to feed into applicant tracking systems. JSON Resume solved that.

In 2026, extraction is trivial — LLMs parse unstructured CVs as well as structured ones. The bottleneck is now *verification*. An AI recruiter scanning thousands of candidates doesn't need cleaner JSON. It needs to know which claims are real.

The two formats are not competitors. A `.cvv` file could be *converted* to JSON Resume for systems that expect it — the structured fields are extractable. But the `verify:` lines and `commentary:` separation would be lost in translation, and with them the only thing that makes a CV more than a self-declaration.

## Overview

A verified CV is a plain-text file containing a series of claims, each independently verifiable. The format is deliberately loose: section headers in `[brackets]` group claims by type, and a `verify:` line terminates each claim. Between those two boundaries, the content can be anything — structured `key = value` pairs, free-form prose, or a mix of both.

The issuer decides what they hash. The CV owner decides how to present it. The format doesn't impose a schema on either. Each issuer's `verification-meta.json` provides context about who they are (formal name, registration numbers, authority chain) — the CV file doesn't need to repeat it.

This is a data format, not a site generator. A web component or aggregator renders it for humans. A bot reads it as a flat list of claims delimited by `verify:` lines.

## File Extension

`.cvv` (CV Verified) — or just `.txt`. The format is self-describing.

## Format

```ini
[basics]
name = John P Smith
email = john@johnpsmith.dev
url = https://johnpsmith.dev
location = London, UK
github = github.com/jsmith
linkedin = linkedin.com/in/johnpsmith

[employment]

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
verify:hr.widgets.io/v
commentary: My first role out of university.
  Progressed from bug fixes to owning the
  [inventory sync service](https://github.com/jsmith/inv-sync)
  by year two.

[education]
name = John P Smith
qualification = BEng Computer Science
class = First
year = 2018
verify:registrar.imperial.ac.uk/degrees

John P Smith
qualification = A-Levels: Maths (A*), Physics (A), Computer Science (A)
year = 2015
verify:exams.jcq.org.uk/hashes

[certification]
John P Smith
name = AWS Solutions Architect Professional
awarded = January 2024
expires = January 2027
verify:certs.aws.amazon.com/

John P Smith
name = Chartered Engineer (CEng)
verify:engc.org.uk/refs

[peer reference]
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
```

## What the Issuer Hashes

Each issuer hashes everything between the previous `verify:` line (or section header, or start of file) and their own `verify:` line — excluding the `verify:` line itself. The section header is not part of the hash. The content can be structured, prose, or a mix.

**For the first `[employment]` claim verified by `hr.acmecorp.com/hashes/staff`:**

The issuer hashed:
```
John P Smith was a Senior Engineer
from March 2019 to November 2023
```

Pure prose. Acme's HR system produced this text. The domain `hr.acmecorp.com` is their identity — `https://hr.acmecorp.com/hashes/staff/verification-meta.json` provides the formal company name, Companies House number, and authority chain. A renderer fetches this and displays "Acme Corporation Ltd" alongside the claim.

**For the second `[employment]` claim verified by `hr.widgets.io/v`:**

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

The renderer fetches these in parallel as it verifies each claim. The result: company names, logos, authority chains, professional context for peer endorsers — all supplied by the issuers themselves, not typed into the CV file by the candidate. The candidate can't fake "Acme Corporation Ltd" because it comes from `hr.acmecorp.com`, not from the `.cvv` file.

This means the CV file stays small and claims-only. The richness of the rendered page scales with how much metadata each issuer publishes. A university with a crest, an accreditation chain, and a formal name produces a richer rendered section than a peer endorser with just a name and a URL — and that's appropriate.

## Section Headers

Section headers are loose groupings for rendering, not strict schemas. Common ones:

| Section | Typical Content | Typical Issuer |
|---|---|---|
| `[basics]` | Name, email, URL, location, social links | None — candidate's self-declaration |
| `[employment]` | Role, dates, responsibilities | Employer HR domain |
| `[education]` | Qualification, class, year | University registrar, exam board |
| `[certification]` | Certificate name, dates | Certification body, training provider |
| `[peer reference]` | Free text endorsements | Individuals, former managers, colleagues |
| `[publication]` | Title, journal, year | Publisher domain |
| `[project]` | Description of work | Client domain, collaborator domain |
| `[award]` | Award name, year | Awarding body domain |

New section headers can be invented freely. A renderer that doesn't recognise a section header displays its claims generically. A bot that doesn't recognise it still finds the `verify:` lines and can verify every hash.

**A section can contain multiple claims.** The `[peer reference]` section in the example above contains three claims from three different people, each terminated by their own `verify:` line. The section header groups them for presentation — the `verify:` line delimits them for parsing.

**Content within a claim can be anything.** Structured key-value pairs, free-form prose, or a mix. The first employment claim is prose ("John P Smith was a Senior Engineer from March 2019 to November 2023"). The second uses `key = value` pairs. Both are in the same `[employment]` section. The format doesn't force consistency — the issuer writes whatever their system produces, and the parser handles it.

## Commentary: The Candidate's Own Words

A `commentary:` block always follows the `verify:` line it pertains to. It is the candidate's addition — not hashed, not verified, clearly theirs. It continues until the next claim, section header, or end of file. The content supports markdown.

```ini
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

- **Public version** (personal website): `[employment]`, `[education]`, `[certification]` — facts the owner is happy for the world to see and scrapers to index.
- **Full version** (sent to a specific recruiter): adds `[peer reference]` — warm endorsements shared selectively.

The hashes exist at the issuer endpoints regardless — but a hash is meaningless without the plaintext. A scraper that finds `pauljones.dev/refs/{hash}` returning `OK` knows a reference exists but can't read it.

## Parsing Rules

The parser needs two rules:

1. **Split on `verify:` lines.** Everything between two `verify:` lines (or between a section header and a `verify:` line) is one claim. The `verify:` line itself is not part of the claim content.
2. **`commentary:` lines are not part of any claim.** Text after a `commentary:` line belongs to the candidate, not to the issuer. It is not hashed and not verified.

Section headers (`[employment]`, `[peer reference]`) are optional grouping hints. If present, they help a renderer organise the output. If absent, the claims are still independently verifiable — just ungrouped.

## Rendering: The `<verified-cv>` Web Component

The intended renderer is a future web component — a single `.js` file that works in any browser and any WebKit/Chromium wrapper:

```html
<script src="verified-cv.js"></script>
<verified-cv src="john.cvv"></verified-cv>
```

The component fetches the `.cvv` file, parses it, verifies each claim in parallel, fetches `verification-meta.json` for each issuer, and renders the result. Static hosting only — no server-side logic needed beyond serving files.

### Interactive Experience

The rendered CV is not a static page — it's an interactive document:

- **Progressive verification.** Claims render immediately with a "verifying..." state. As each endpoint responds, the badge updates to verified, not found, or revoked. The user sees verification happening in real time.
- **Issuer detail on tap/hover.** Each verified claim shows the issuer's `formalName` and `description` from `verification-meta.json`. Tapping expands to show the authority chain, logo, and accreditation — same display as the [authority chain app display](authority-chain-app-display.md).
- **Commentary toggle.** The candidate's `commentary:` blocks can be shown inline or collapsed. A recruiter might want the verified facts only; a hiring manager might want the full narrative. The toggle lets the reader choose.
- **Section navigation.** `[basics]`, `[employment]`, `[education]`, `[certification]`, `[peer reference]` become a navigable sidebar or tab bar. The component reads the section headers and builds the navigation automatically — including sections it doesn't recognise.
- **Collapse, expand, dismiss.** Sections and individual claims are collapsible. A recruiter scanning for certifications can collapse `[employment]` and `[education]` entirely. Claims or whole sections can be dismissed — hidden from view for this reading session. The underlying data doesn't change; the reader is curating their own view of the CV. A "reset" restores everything.
- **Verified vs unverified visual distinction.** Verified claims get a tick and a coloured border. Commentary gets a different background and no tick. The reader always knows what's attested and what's the candidate's own words.
- **Copy/export.** The component can export the verified data as JSON (for applicant tracking systems) or as a printable PDF. The export preserves the verified/commentary distinction.

### Desktop App via Tauri

The same web component works inside a [Tauri](https://tauri.app/) shell for recruiters who want a desktop application rather than a browser tab. Tauri uses the OS's native WebKit (macOS/Linux) or WebView2 (Windows), so the binary is ~3-5MB — not Electron's 150MB. The component is identical; Tauri just provides the window frame and file-open dialog.

A recruiter drags a `.cvv` file onto the Tauri app. The component renders it, verifies every claim, and presents the interactive CV. No browser required, no server required, no account required. The `.cvv` file and the verification endpoints are the only dependencies.

### CORS Requirement

The web component makes cross-origin `fetch()` calls to every issuer's verification endpoint. This only works if issuers serve `Access-Control-Allow-Origin: *` on all GET responses — both hash lookups and `verification-meta.json`.

This is a **specification requirement**, not an optional nicety. Verification endpoints are public, read-only, unauthenticated GET endpoints returning a status code and a short body. There is no security reason to restrict cross-origin reads. An endpoint without CORS headers is a broken endpoint — same as one returning malformed responses.

CORS `*` does not mean unprotected. Issuers retain full control over server-side defenses: rate limiting (per-IP, per-ASN), Cloudflare or equivalent WAF, geographic restrictions, throttling. The header simply means "browsers are allowed to read the response" — it doesn't bypass any of those mechanisms.

SaaS verification providers (see [SAAS-VERIFICATION-PROVIDERS.md](SAAS-VERIFICATION-PROVIDERS.md)) handle this by default. Self-hosted issuers need one line in their nginx/caddy config.

## Verification Flow

1. A renderer (web component, aggregator, recruiter tool) reads the `.cvv` file.
2. It splits on `verify:` lines to extract individual claims.
3. For each claim, it normalises the text (see [NORMALIZATION.md](NORMALIZATION.md)).
4. It computes the SHA-256 hash.
5. It hits `https://{verify-domain}/{path}/{hash}`.
6. `200 OK` → verified. `404` → not found. `200 REVOKED` → credential withdrawn.
7. It fetches `https://{verify-domain}/{path}/verification-meta.json` for issuer context.
8. It renders the claim with the issuer's formal name, authority chain, and verification status.

## What a Bot Sees

A bot parsing this file gets a flat list of independently verifiable claims. No API integration needed. No OAuth. No schema negotiation. For each claim:

- The enclosing section header (if any) hints at the claim type
- The content is the claim — prose, key-value pairs, or a mix
- The `verify:` line tells it who issued the claim and where to check
- Hitting the verify URL confirms or denies it
- Any `commentary:` text is the candidate's unverified addition — useful context, but not attested

An AI recruiter bot can read 1,000 CVs in this format and build a candidate shortlist where every claim has been independently verified — without contacting the candidates, without calling references, without trusting self-declared LinkedIn profiles. The bot can also compare commentary against verified claims to flag candidates who overstate their contributions.

## What a Human Sees

A web component reads the same file and renders a formatted, navigable CV:

- Employment history with company names pulled from `verification-meta.json`
- Education with institution crests and accreditation chains
- Certifications with expiry dates and verification badges
- Peer endorsements with the endorser's name and domain
- References (if present in this version of the file) with verification status
- Candidate commentary visually distinct from verified claims — no tick, different treatment, clearly labelled as the candidate's words

The rendering is a presentation layer over the same flat data the bot reads. The file is the single source of truth. The commentary is the candidate's voice layered on top.

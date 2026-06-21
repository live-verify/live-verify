---
title: "Self-Attested Authorship, Bylines & Copyright (Decentralized Author Identity)"
category: "Art, Media & Publishing"
volume: "Very Large"
retention: "Work lifetime (copyright term; often life + 70 years)"
slug: "self-attested-authorship-copyright"
verificationMode: "clip"
tags: ["copyright", "authorship", "attribution", "identity-disambiguation", "creator", "self-attested", "ai-provenance", "personal-domain", "post-verification-disclosure", "byline", "journalist", "decentralized-identity", "orcid-alternative"]
furtherDerivations: 1
---

## The Problem

A copyright line is one of the most common claims on the internet — `© Name 2026`, `Portions
Copyright …`, a byline, an "all rights reserved" footer — and one of the least verifiable. It asserts
two things a reader cannot check: that **this person really claims this work**, and **which person of
that name** is meant. Both are getting harder, not easier, as authorship becomes fluid:

- **Name collisions are normal.** "Paul Hammant" might be a software author maintaining a repository,
  *and* a younger musician releasing songs on Spotify. A bare `© Paul Hammant` cannot tell them apart
  — and either could be wrongly credited or blamed for the other's work.
- **Attribution is being scraped, stripped, and re-pasted.** Works get lifted, re-bylined, bundled
  into datasets, and re-published with the original notice removed or a false one added.
- **AI muddies human authorship.** As machine-generated and human work mingle, "who made this, and do
  they stand behind it?" is a question creators increasingly need to answer affirmatively, on their
  own terms.

Official copyright **registration** (see [Copyright Registrations](copyrights.md)) answers some of
this for high-value works through a national office. But almost no one files a federal registration
for a README, a blog post, a photo, or a song demo. The everyday case is a **self-attested** notice,
and today it carries no proof and no disambiguation at all.

## What gets attested

A creator publishes a short, stable claim on a document, page, or file footer, bound by a `vfy:` (or
`verify:`) line to a domain they control:

```
Portions Copyright Paul Hammant 2026
vfy:paulhammant.com/cr/lvfy/
```

That is all that needs to appear on the work. It is deliberately minimal — a name, a year, and a
verification line — so it can sit unobtrusively in a footer. The verification does two jobs:

1. **It confirms the assertion is genuine** — the controller of `paulhammant.com` really does claim
   this notice, so a scraped copy with the notice stripped (or a forged notice pointing at a domain
   the forger doesn't control) won't verify.
2. **It discloses who the author is** — turning the ambiguous "Paul Hammant" into a specific,
   domain-anchored identity, with whatever disambiguating detail the author chooses to publish.

This combines two faces of one pattern: **the creator asserts; the domain disambiguates.**

## The byline as a decentralized author identity (an ORCID alternative)

For journalists, writers, and researchers, the same primitive does something bigger than mark a
copyright notice: a **`vfy:` byline becomes a persistent, self-sovereign author identity** — what ORCID
is for academics, but decentralized and rooted in domain control rather than a single central registry.

A piece carries `Written by Jane Doe — vfy:janedoe.com/me/v`. Resolving that line does the three things
an author-identity system exists to do:

- **Persistent identifier.** `janedoe.com` *is* the durable, resolvable ID — the role
  `orcid.org/0000-…` plays, but it's a domain the author already controls, not a record in someone
  else's database.
- **Disambiguation.** The domain is unique where the name is not (the "which Paul Hammant?" problem),
  exactly what an ORCID iD resolves.
- **Enrichment.** On verification it discloses the author's bio, affiliation, a canonical list of works
  and the outlets/bylines they stand behind — the equivalent of an ORCID profile, but published by the
  author on their own domain.

### Where the decentralized version wins — and the one place it doesn't

This is a genuine **ORCID alternative**, and for journalists in particular it is *stronger* on the
properties that matter most:

| Property | ORCID (central registry) | `vfy:` byline (decentralized) |
|---|---|---|
| **Persistent author ID** | Yes — `orcid.org/0000-…` | Yes — the author's own domain |
| **Disambiguates same names** | Yes | Yes — the domain is unique |
| **Anti-impersonation** | Weak — anyone can *type* an ORCID iD onto a paper | **Strong** — a forged byline pointing at a domain the forger doesn't control fails to verify |
| **Self-sovereign / non-revocable** | **No** — the registry (or pressure on it) can suspend, delist, or alter your record | **Yes** — nobody can delist you from your own domain. For journalists in hostile environments this is a press-freedom property, not a convenience |
| **Survives the registry going away** | No — single point of failure | Yes — no central operator to defund or capture |
| **Central discovery / aggregation** | **Yes** — one namespace everyone searches to find all of an author's work | **No** — a thousand author-domains are not a searchable index. This is the honest tradeoff |

The one thing a purely decentralized scheme **cannot** match is ORCID's central-discovery value: there
is no single place to query "everything Jane ever wrote." A domain-anchored byline gives you
**verification and anti-impersonation** (is *this* byline genuinely hers?) but not **discovery** (find
all her work). That limit is real and stated plainly rather than glossed.

**The resolution is to compose, not choose.** The domain-anchored byline is the self-sovereign *root*
of the author's identity (verification, anti-impersonation, non-revocable); ORCID/ISNI then sit as
**optional endorsers in the chain** (see "Adding weight" below) for authors who *also* want to be found
in the academic discovery graph. You get decentralized standing by default, with a bridge into the
central index where it's useful — and you never *depend* on the central registry to prove who wrote
what.

### And the registry's own path: rest *on* it, don't compete with it

There is a longer-run move available to an author-identity registry, and it is the same one incumbents
in adjacent trust markets are already making. ORCID's durable value was never "we hold the database
that *asserts* who you are" — that assertion layer is exactly what domain-anchored identity
commoditizes (anyone can verify a byline against its own domain, for free, with no registry). Its
durable value is **discovery and aggregation**: one query that finds everything an author wrote. Those
are separable. So the registry's strongest position is not to compete with self-sovereign identity but
to **rest on it** — to stop being the *root* of trust and become the *index* over roots the authors
own: ORCID iDs that resolve *to* a domain-anchored identity rather than standing in place of one.

That is the **up-stack move** the [Let's Encrypt](../../docs/lets-encrypt-precedent.md) and
[Merkle Tree Certificates](../../docs/merkle-tree-certificates-precedent.md) precedents describe — the
incumbent concedes the commodity (assertion) and keeps the durable layer (discovery/operations) — and
it is exactly the thesis of [decentralized trust graphs](../../docs/decentralized-trust-graphs.md):
*the attestations are the web; the aggregators are search engines.* An identity registry that bridges
onto domain-anchored identity early is the "find your IdenTrust" bridge for author identity. (Stated as
the path *available* to such a registry, not a prediction about any particular organization's strategy.)

### Why journalism is the sharpest case

- **Byline integrity in the AI era** — proving a human journalist wrote a piece, not a content farm or
  an LLM re-byline (complementary to platform-side
  [AI content provenance disclosure](ai-content-provenance-disclosure.md)).
- **Stripped-attribution defence** — a syndicated or scraped article that drops the byline no longer
  verifies as the journalist's; the byline can't be silently swapped without breaking the hash.
- **Portable reputation** — a freelancer's identity travels with them outlet to outlet, anchored to
  their own domain rather than locked inside any one masthead's CMS.
- **Press freedom** — an author identity no central authority can revoke is a meaningful protection for
  reporters under pressure.

## The deliberate post-verification disclosure (a named exception to the no-echo rule)

Live Verify's normal rule is firm: **verification endpoints never echo claim content.** The verifier
already holds the document, so repeating its text back would be redundant (confirming "Driver:
MICHAEL CHEN" to someone reading that exact line adds nothing).

**This use case is a deliberate, justified exception** — and it is worth stating plainly so it reads
as a principled exception, not a violation. The reason the exception holds: the claim string here is
*intentionally low-information*. "Paul Hammant" is precisely the part the verifier **cannot** resolve
from the document alone. So the post-verification disclosure is not echoing what they already
have — it is supplying **exactly what the short notice deliberately leaves out**. The disclosure *is*
the payload, not a redundant repeat.

The test for when echoing is legitimate: *does the response tell the verifier something the document
withheld?* For a driving licence, no — the licence already states everything. For a deliberately
terse authorship footer, yes — the whole point is that the name is ambiguous until the domain
resolves it. (This is the same shape as the link-style post-verification actions for bar admissions
and licences, where the endpoint adds a public-profile link the credential omits — here applied to
identity disambiguation.)

What the author chooses to disclose is theirs to decide; useful fields include:

- **Which "Paul Hammant"** — a one-line biography or role ("software author; maintainer of the
  live-verify project"), enough to distinguish from a same-named musician, writer, or other creator.
- **Canonical identity links** — the author's own site, repository, or verified profiles, anchoring
  the name to a person.
- **Scope of the claim** — what "Portions Copyright" covers (e.g. "the original prose and code in
  this repository; third-party portions retain their own notices").
- **Licence terms** — the licence the work is offered under, so a reader learns reuse terms at the
  point of checking authorship.

## Example: Authorship & Copyright Disclosure

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #1a5f2a; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <span verifiable-text="start" data-for="authorship"></span>
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;">AUTHORSHIP & COPYRIGHT DISCLOSURE
═══════════════════════════════════════════════════════════════════

Claim:        Portions Copyright Paul Hammant 2026
Asserted By:  paulhammant.com (domain-controlled)
Who:          Paul Hammant — software author; this project's maintainer
              (not the musician of the same name)
Scope:        Original prose and code in this repository
Licence:      Apache-2.0
As At:        20 Jun 2026 09:14 UTC
Salt:         Q7M3X2K9

<span data-verify-line="authorship">vfy:paulhammant.com/cr/lvfy/</span></pre>
  <span verifiable-text="end" data-for="authorship"></span>
</div>

The footer on the work stays as short as `Portions Copyright Paul Hammant 2026` + the `vfy:` line.
Everything above the salt is what the *endpoint* discloses on verification — deliberately, because
that is the information the short notice omits.

## Data Verified

That the controller of the named domain asserts this authorship/copyright notice; the asserted name
and year; the disclosed disambiguating identity, scope, and licence the author chose to publish; the
as-at timestamp; and the salt.

**What this does and does not prove.** It proves **the domain owner asserts this claim** — it is an
authenticated assertion of authorship, not an adjudication of legal ownership. Live Verify cannot and
does not decide a copyright dispute; that is a court's role, and for registered works the national
office's record (see [Copyright Registrations](copyrights.md)) is the authority. What this adds is
that a previously unverifiable, ambiguous notice becomes a checkable, domain-anchored, disambiguated
assertion.

**What is deliberately NOT included:**

- any claim of legal validity, registration, or enforceability beyond the assertion itself
- the protected work's content (the verifier already has the work; only the *authorship metadata* is
  disclosed)
- personal data the author has not chosen to publish

## Data Visible After Verification

The verifier sees the asserting domain, the disambiguated author identity, the claim scope, the
licence, and the current standing of the claim.

**Status Indications:**
- **Asserted** — The domain owner currently asserts this authorship/copyright claim.
- **Superseded** — A newer notice replaces this one (e.g. a licence change or rights transfer); the
  endpoint may point to the current claim.
- **Withdrawn** — The author has withdrawn the assertion (e.g. authorship was disputed or
  reassigned). Surfaced plainly, not hidden.
- **404 / No Claim** — No such assertion exists at this domain for this notice. Per the fail-loudly
  principle, an unverifiable authorship claim reads as unverified — never quietly as "probably the
  author."

## Second-Party Use

The **creator / author** benefits directly.

**Disambiguation from same-named others:** A short, stable footer lets the right Paul Hammant be told
apart from any other, because each anchors to a different domain and discloses different identity
detail. Neither can be credited or blamed for the other's work.

**Defence against stripped or forged attribution:** A copy with the notice removed won't verify as
the author's; a forged notice pointing at a domain the forger doesn't control won't verify either.

**Asserting human authorship in the AI era:** A creator can affirmatively stand behind a work as
theirs — complementary to platform/issuer-side
[AI content provenance disclosure](ai-content-provenance-disclosure.md), which attests AI-vs-human
origin from the platform side; this is the *author's own* assertion from the creator side.

## Third-Party Use

**Publishers, labels, and platforms (e.g. Spotify, app stores, repositories)**

**Verifying the right claimant before paying or listing:** Confirming that the "Paul Hammant"
submitting a work is the domain-anchored creator they claim to be, reducing royalty-redirection and
mis-attribution — the lightweight, self-attested complement to the registered-work check in
[Copyright Registrations](copyrights.md).

**Reusers and licensees**

**Learning reuse terms at the point of checking authorship:** The disclosure can carry the licence,
so someone confirming who made a work also learns how they may use it.

**Journalists, archivists, and dataset curators**

**Attribution integrity:** Confirming a byline or copyright notice is genuinely the asserting author's
before re-publishing or ingesting a work.

## Verification Architecture

The verifiable artifact is a short, self-attested notice bound to the author's own domain; the
endpoint returns an affirmative status plus the **deliberate disambiguating disclosure** described
above. The mechanism is the standard `text → normalize → SHA-256 → GET`; the only thing unusual is
that the response intentionally adds identity information — justified because the notice is
deliberately terse and the name is the very thing the verifier cannot otherwise resolve.

The trust anchor is **domain control**: "Paul Hammant" is ambiguous, but `paulhammant.com` is not.
This is the same domain-ownership premise the whole protocol rests on, applied to identity. Per
[Sovereign Roots](../../docs/sovereign-roots.md), a creator on a personal domain is legitimately
**unanchored** — there is no government root behind a personal copyright notice, and that is correct;
the reader judges the domain itself, exactly as they would judge a peer reference.

## Privacy Salt

The salt is required. Authorship notices are short and low-entropy (a name, a year), so without a
per-claim salt an attacker could enumerate or pre-compute likely notices. The salt — generated by the
author and present in the verifiable text — makes each claim's hash unique and unguessable, while the
disclosure exposes only the identity information the author chose to publish.

## Adding weight: who can endorse the claim

A bare self-attestation is the floor, not the ceiling. The author can layer **endorsers** into the
authority chain, each adding a *different kind* of weight — so you choose the endorser that matches
the assurance the situation actually needs. The crucial point is that different endorsers attest
different things; they are not interchangeable.

**A. Co-authorship weight — "others independently agree on who made this"**
- **Co-authors / collaborators / band members / co-maintainers** — another creator's domain endorses
  "we made this together; this person's portion is X." Two independent domains agreeing is far harder
  to forge than one asserting. For open source, the contributor/commit graph is itself a form of
  distributed co-attestation.

**B. Witnessing weight — "a neutral third party saw this, identity-checked, at a time"**
- **Notary** — attests "this identity-verified person asserted this claim on this date," adding
  identity + timestamp weight (see [Notary Services](notary-documents.md)).
- **Solicitor / witnessing firm / timestamping service** — non-repudiation and proof the claim
  existed at time T (the project's [legal-witnessing](../../docs/legal-witnessing-future-architecture.md)
  three-role model).

**C. Institutional / employment weight — "the entity that owns or sponsors the work confirms it"**
- **Employer** — attests whether the work was done in the course of employment. This decides the
  single most consequential copyright question — **work-for-hire vs. personal** — and is the sharpest
  way to disambiguate corporate from individual authorship.
- **University / research institution** — affiliation plus that the work is the author's.
- **Publisher / label / studio** — attests it holds or licensed rights from this author (ties to
  [Publishing Contracts & Royalties](publishing-contracts-royalties.md)).

**D. Stewardship / governance weight — "the project or community vouches for the contributor"**
- **Open-source foundation** (Apache, Linux Foundation, FSF) or **the project's own org** — attests
  "a recognized maintainer/contributor under our governance." For this repository, the `live-verify`
  GitHub org is the natural endorser of "Paul Hammant maintains this."
- **Standards body / working group** — for spec authorship; **collective / DAO** — for
  community-owned works.

**E. Registry / official weight — "an authority has it on record"**
- **Author-identity registries — ORCID, ISNI** — purpose-built *disambiguators*. An ORCID endorsement
  is arguably the single most natural answer to the "which Paul Hammant?" problem, because resolving
  same-name ambiguity is exactly what these registries exist to do.
- **National copyright office** (`copyright.gov`, `ipo.gov.uk`) — the strongest, but only for
  *registered* works; this is the bridge to [Copyright Registrations](copyrights.md).
- **Collective management orgs** (PRS, ASCAP, BMI) — for music rights specifically.

**F. Platform / distribution weight — "where the work lives confirms the uploader"**
- **Spotify / app store / repository host** — attests "the account that uploaded this is
  domain-linked to this author." This directly resolves the two-Paul-Hammants case: the musician's
  domain is endorsed by Spotify, this author's by the GitHub org, and the two never collide.

### Choosing — match the endorser to how contested the work is

| Assurance needed | Endorser to add |
|---|---|
| Disambiguate same-name creators | **ORCID / ISNI**, or the distribution platform |
| Shared / collaborative work | **Co-author** cross-attestation |
| Personal vs. work-for-hire | **Employer** |
| "Existed at date T, identity-checked" | **Notary / witnessing firm** |
| Community / project recognition | **Open-source foundation** or project org |
| Legal standing to sue | **National copyright office** (→ registration) |

Endorsers compose: a chain can pass through several, each adding a distinct dimension, terminating
wherever the assurance legitimately runs out (and remaining honestly *unanchored* if it stops at a
personal or community level — that is a valid state, not a failure).

## Limitations & misuse risks — read before enriching

This use case deliberately suspends Live Verify's usual "never echo content" rule: verification
*adds* identity information the terse footer withheld. That is justified (the name is exactly what the
verifier cannot resolve), but it is also the one place the project lifts its own minimal-disclosure
floor — so it carries risks the default model doesn't. Enrich with these in mind:

- **Disclosure-creep.** The footer is minimal *on the page*, but verification resolves to a richer
  bundle (bio, employer, registry IDs). Anyone who can see the work can pull it; at scale it is a
  harvesting surface. The minimalism of the visible claim is not the minimalism of what verification
  reveals.
- **Correlation.** Each endorser links the name to a *different* real-world anchor (employer, ORCID,
  project org, notary). Individually innocuous; together they triangulate. The endorsement ladder,
  viewed adversarially, is a pre-assembled identity graph — the more weight you add, the more you
  expose.
- **Stale enrichment.** Enrichment served today (employer, "works at Y") keeps circulating in copies
  of the work and caches after you've left, fallen out, or want to go quiet. Revocation updates the
  endpoint; it does **not** reach copies already in the wild — and here the stale data is *who you
  are*, not just a status string.
- **Endorsement laundering.** An endorsement granted for one work can be contextually re-used to lend
  weight to another the endorser never vetted. Pin each endorsement's scope so its credibility can't
  be borrowed onto uncovered works.
- **The endorser gains a hold.** Adding an employer or notary to your chain is durable: they now hold
  an attestation about you that can be breached, subpoenaed, or used as leverage, and that you can't
  fully retract. Treat *adding* an endorser as one-directional.

**The unfixable part:** public enrichment is permanent. Anything the endpoint serves publicly can be
cached, indexed, and used in ways you didn't intend, including after you'd want it gone. The
discipline is therefore to **disclose only the minimum that resolves the verifier's question** —
"which Paul Hammant?" needs a disambiguator, not a CV. Every extra field is a permanent, harvestable,
correlatable disclosure.

The full hazard analysis, the test for when enrichment is legitimate at all, and the mitigations
(with their limits) are in
[Verification Enrichment: hazards](../../docs/verification-enrichment-hazards.md).

## Authority Chain

**Pattern:** Personal / Self-Attested — optionally endorsed.

In its base form the claim is asserted by the creator from their own domain, with no regulatory chain
— appropriate for a personal copyright notice, judged on the credibility of the domain:

```
✓ paulhammant.com/cr/lvfy — Asserts authorship/copyright for this work
  (self-attested; legitimately unanchored — judged on the domain itself)
```

With endorsers layered in (see "Adding weight" above), the chain gains independent corroboration —
here a project org and an author-identity registry, each attesting a different thing:

```
✓ paulhammant.com/cr/lvfy — Asserts authorship/copyright for this work
  ✓ github.com/live-verify — Confirms this person maintains the project (stewardship)
  ✓ orcid.org/0000-0000-0000-0000 — Resolves "which Paul Hammant" (identity registry)
```

Each endorsement is independently verified (an endorser's 404 breaks only that link, surfaced as a
broken chain — never silently dropped). Endorsers are additive: an employer link could establish
work-for-hire scope, a notary link could add an identity-checked timestamp, and so on.

For works that *are* officially registered, the chain instead runs through the national copyright
office; see [Copyright Registrations](copyrights.md) and
[Authority Chain Specification](../../docs/authority-chain-spec.md).

## Further Derivations

None currently.

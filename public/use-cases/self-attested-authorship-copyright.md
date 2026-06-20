---
title: "Self-Attested Authorship & Copyright Claims"
category: "Art, Media & Publishing"
volume: "Very Large"
retention: "Work lifetime (copyright term; often life + 70 years)"
slug: "self-attested-authorship-copyright"
verificationMode: "clip"
tags: ["copyright", "authorship", "attribution", "identity-disambiguation", "creator", "self-attested", "ai-provenance", "personal-domain", "post-verification-disclosure"]
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

## Authority Chain

**Pattern:** Personal / Self-Attested.

The claim is asserted by the creator from their own domain. There is no regulatory chain — and that
is appropriate: a self-attested copyright notice is a personal assertion, judged on the credibility
of the domain, not endorsed by an authority.

```
✓ paulhammant.com/cr/lvfy — Asserts authorship/copyright for this work
  (self-attested; legitimately unanchored — judged on the domain itself)
```

For works that *are* officially registered, the chain instead runs through the national copyright
office; see [Copyright Registrations](copyrights.md) and
[Authority Chain Specification](../../docs/authority-chain-spec.md).

## Further Derivations

None currently.

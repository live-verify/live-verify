# Verification Enrichment: When Echoing Is Justified, and What It Risks

## The exception this doc governs

Live Verify's bedrock rule is that **endpoints never echo claim content** — the verifier already
holds the document, so repeating its text adds nothing and discloses nothing new. Minimal disclosure
is the default, and it is a privacy *feature*.

A small number of use cases deliberately suspend that rule. When a claim is **intentionally
low-information** — a terse `© Paul Hammant 2026` footer, an ambiguous name, a bare badge — the
verification step can return information the document deliberately *withheld*. We call this
**verification enrichment**: the response supplies what the verifier lacks (which person? what scope?
endorsed by whom?), not what they already have.

[Self-Attested Authorship & Copyright Claims](../public/use-cases/self-attested-authorship-copyright.md)
is the canonical example: the footer is deliberately terse, and verification discloses the
disambiguating identity plus any endorsements layered into the chain.

Enrichment is legitimate. But because it is the one place the project lifts its own minimal-disclosure
floor, it is the one place that most needs explicit guardrails. This doc names the hazard class so any
enrichment use case can be checked against it.

## The test for legitimate enrichment

Before a response echoes or enriches, ask: **does this tell the verifier something the document
deliberately withheld, or does it merely repeat what they already hold?**

- A driving licence already states everything → echoing is redundant → **don't**.
- A terse authorship footer withholds *which* person and *what* scope → the disclosure is the payload
  → **enrichment is justified**.

Passing that test makes enrichment *permissible*. It does not make it *safe*. The hazards below apply
to every enrichment, however justified.

## The five hazards

### 1. Disclosure-creep — minimal-by-design becomes a dossier

The author chose terseness *on the page*, but enrichment quietly undoes it. A claim that disclosed
one bit on the work now resolves, on demand, to a bio, employer, registry IDs, and canonical links.
Anyone who can see the work can pull the bundle. At scale, this is a harvesting surface: scrape every
work bearing the footer, hit each endpoint, collect enriched identities in bulk. **The minimalism of
the visible claim is not the minimalism of what verification reveals.**

### 2. Correlation / aggregation — the chain is a pre-built identity graph

Each endorser links the claimant to a *different* real-world anchor: an employer, an ORCID, a project
org, a notary's identity check. Individually innocuous; **together they triangulate.** The endorsement
ladder, viewed adversarially, is an identity graph the author assembled for an attacker — who no
longer has to do the linking work themselves. The more weight an author adds, the more correlation
they expose.

### 3. Stale enrichment — outliving its truth

A solid claim is enriched today (employer X, "works at Y"). The author later leaves, the relationship
sours, or they simply want to go quiet. But copies of the *work* still carry the footer, and cached
enrichment still circulates. This is the revocation-doesn't-reach-copies problem applied to
**identity** — more harmful than applied to a status string, because it is *who someone is*, served
after it stopped being true or wanted.

### 4. Endorsement laundering — borrowed credibility, misapplied scope

An endorsement legitimately granted for *work A* gets contextually associated with *work B* the
endorser never vetted. The enrichment ("endorsed by the Apache Foundation") is *true* but deployed to
lend weight to something outside its scope. The verifier sees a green chain and over-trusts — the
trust-theater risk of [sovereign-roots](sovereign-roots.md), surfacing at the enrichment layer.

### 5. Endorser-as-leak / coercion point

Once an employer, notary, or registry is in your chain, *they* hold an attestation about you that you
cannot fully retract. It can be breached, subpoenaed, or used as leverage — the
debt-collection-cudgel hazard from the [revocation-cause guidance](Verification-Response-Format.md),
generalized: you added the endorser for weight, and also handed them a hold over you.

## Mitigations — and their hard limits

| Mitigation | What it helps | The limit |
|---|---|---|
| **Tiered disclosure** (public bio vs. employer/registry released only to authenticated queriers) | Reduces casual harvesting | Anything served publicly is harvestable, full stop |
| **Revocable / mutable enrichment** (`Withdrawn` status; update the served bundle) | Lets the author retract going forward | Copies of the work and cached enrichment persist |
| **Per-claim salt + scoping** | Stops enumeration of *which* claims exist | No protection once the attacker has the work-in-hand (they have the footer) |
| **Pinned endorser scope** (endorsement A covers work A only) | Blocks laundering | Requires verifiers to actually check scope, not just chain presence |
| **Subject control node** (the subject holds a node they can restrict/revoke — see below) | Lets the subject retract stale enrichment ("I no longer work there") without the issuer's cooperation | Updates the endpoint only, not copies in the wild; must be authenticated to the real subject or it becomes a censorship vector |
| **Treat adding an endorser as durable** | Sets correct expectations | Does not undo the hold an endorser now has |

## Mode-specific binding: tie enrichment to its capture context

The hazards above are worse when enriched information can be **detached from where it was captured and
replayed elsewhere** — a screenshot of a disclosure presented as if it verified a different work, on a
different page, from a different file. The defence is for each verification mode to **bind the
enrichment to the context it was actually captured in**, and to *warn* when that binding is weak or
absent. The richer the disclosure, the more this matters — so it belongs specifically to enrichment
use cases, not just the base verify.

Each mode has a different amount of context available, and therefore a different obligation:

- **Camera mode (Live Verify - Camera) — verify with extra warnings.** Camera capture is the weakest
  context: OCR can misread, the lens sees only what is in frame, and the surrounding work cannot be
  bound. When a *camera* verification returns enriched identity disclosure, the app should surface
  **additional warnings** that the disclosure is not bound to the surrounding document — "this
  identity was confirmed for the captured text; the app cannot confirm it belongs to the rest of this
  page/object." Enrichment over camera should be treated as the lowest-assurance path and flagged as
  such, precisely because the human is often in an in-person, time-pressured setting where over-trust
  is most damaging.

- **PDF mode (future) — bind the file's SHA-256 too.** A PDF viewer holds the *entire file*, so it can
  do something camera and clip cannot: confirm that the **SHA-256 of the PDF itself matches** the file
  the enrichment was issued against, not just the selected text. When PDF mode ships, an enriched
  verification should check both the claim-text hash *and* the document-file hash, so a disclosure
  cannot be lifted from one PDF and presented inside a different file that happens to contain the same
  footer text. The whole-file hash binds the enrichment to *this* document.

- **Chrome-extension / clip mode — make the claim's URL part of the verification.** The extension
  knows the page URL the claim was selected on; that origin should be **included in the verification**
  so the disclosure is bound to where it actually appeared. A footer lifted from the author's own site
  and pasted onto an impersonating page should not silently produce the same enriched, reassuring
  result — the URL mismatch is a signal the verifier deserves to see. Binding the claim to its origin
  URL turns "this disclosure verified *somewhere*" into "this disclosure verified *on this page*."

The common principle: **enrichment should be no more portable than the context that earned it.**
Where a mode can bind more context (PDF file hash, page URL), it should; where it can bind less
(camera), it should warn. None of this is a substitute for minimal disclosure — it limits *replay*,
not *harvesting*.

## The subject as a control node

So far the chain has been read as *issuer → endorsers → root*, where the **subject** — the person a
claim is *about* — is passive. There is a distinct, useful role the subject can take: inserting
**themselves** into the chain not to *add weight*, but to retain *control* over a claim that someone
else issued or enriched about them.

The motivating case is hazard 3 directly. An employer enriched an authorship claim with "works at
X." You leave. The employer is slow to update *their* attestation — but if **you** are a node in the
chain, you can mark your own link to say *"I no longer work there"* and the stale portion stops
verifying through you, without waiting on the employer's cooperation. This gives the subject their
own handle on staleness, which the mitigations table otherwise leaves weak.

This generalizes beyond enrichment: **any claim made *about* a person can carry a subject control
node** — a consent/control point the subject holds. It is worth treating as a reusable protocol
concept, not a one-off for authorship.

### Fixed verbs, open scopes

The question "is this a fixed list of modifications?" resolves cleanly: the **verbs are a small fixed
vocabulary** (so a verifier can reason about what a subject node's status *means*), but the **scope
each verb applies to is open** (so the subject isn't boxed into pre-enumerated facets). The verbs map
onto the status codes the protocol already has:

| Subject verb | Meaning | Maps to status |
|---|---|---|
| **Affirm** | "I stand behind this claim about me." | `verified` |
| **Restrict / narrow** | "This still holds, but a scoped part no longer applies" (e.g. the employer-portion). | `suspended` (scoped) |
| **Supersede** | "A current version replaces this" — points to the live claim. | `superseded` |
| **Withdraw / revoke** | "I no longer associate myself with this claim." | `revoked` |
| **Dispute** | "I contest this claim made about me" — surfaced, not silently dropped. | `disputed` |

The verbs are closed and legible; the *scope* a verb targets ("the employer-portion", "the
2024-onward portion", "the licence terms") is free-form and per-claim. Verifiers interpret the verb;
the scope text tells them what it bites on.

### The guardrail: a control node is also a censorship surface

A subject-controlled revoke is double-edged. If anyone could insert themselves as a subject node and
revoke, a *malicious* party could suppress a **true** claim — disputing a genuine bad-conduct
attestation to bury it. So a subject control node must be **authenticated to the actual subject**:
either the subject demonstrates domain control of their node, or the issuer co-signs that this is the
subject's legitimate control point. An unauthenticated "subject" node is a censorship vector and must
not be honoured.

A second honesty: a subject control node updates the *endpoint*; it does **not** reach copies of the
work already in the wild, exactly like every other revocation. It limits what verifies *now*, not what
was cached *then*. It is a genuine improvement to the stale-enrichment hazard — the subject no longer
depends on the issuer to act — but it is not a takedown.

## The truth that does not have a mitigation

**Public enrichment is forever.** Anything a verification endpoint serves publicly can be cached,
indexed, archived, and used in ways the author never intended — including after they would want it
gone. This is the same property the project states elsewhere about any external publication: once
disclosed, assume it persists. Enrichment does not get an exception from this; it is *especially*
subject to it, because the disclosed content is identity.

The design consequence: **enrichment should disclose the minimum that resolves the verifier's actual
question, and no more.** "Which Paul Hammant?" needs a disambiguator, not a CV. The temptation of
enrichment is to keep adding weight; the discipline is to add only what the question requires, because
every extra field is a permanent, harvestable, correlatable disclosure.

## Checklist for any enrichment use case

- Does the enrichment pass the **withheld-not-redundant** test? If it merely repeats the document,
  don't enrich — fall back to the no-echo default.
- Is each disclosed field **necessary to resolve the verifier's question**, or just nice to have? Cut
  the latter.
- Is the disclosure **revocable**, and does the use case state plainly that revocation *won't reach
  cached copies*?
- Are endorsers **scope-pinned**, so their weight can't be laundered onto uncovered works?
- Does the verifying mode **bind enrichment to its capture context** — PDF file-hash in PDF mode,
  page URL in the extension, **extra warnings** in camera mode — so the disclosure can't be replayed
  out of context?
- Does the author understand that **adding an endorser is durable** and that **public enrichment is
  permanent**?

## Related

- [Self-Attested Authorship & Copyright Claims](../public/use-cases/self-attested-authorship-copyright.md)
  — the canonical enrichment use case; carries its own limitations section pointing here.
- [Sovereign Roots](sovereign-roots.md) — trust-theater and scope risks the laundering hazard echoes.
- [Verification Response Format](Verification-Response-Format.md) — the no-echo rule this doc governs
  the exceptions to, and the revocation-cause / debt-cudgel hazard generalized in hazard 5.
- [Benefits of the Merkle Endorsement Design](benefits_of_merkle_tree.md) — content pinning, the
  mechanism behind scope-pinned endorsements.
- [Verification Modes](VERIFICATION-MODES.md) — Clip, Camera, and future PDF modes; the per-mode
  context-binding obligations above attach to these.

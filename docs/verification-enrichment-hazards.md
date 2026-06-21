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
| **Treat adding an endorser as durable** | Sets correct expectations | Does not undo the hold an endorser now has |

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

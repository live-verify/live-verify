---
title: "Student Loan Debt Recovery (Degree-Revocation & Verification-Tracking)"
status: "Rejected (as Live Verify use case)"
reason: "Conflates a past-fact credential with an unrelated debt; the only technical hook — tracking a defaulter via degree-check lookups — is trivially poisoned and turns the verification surface into covert surveillance"
slug: "student-loan-debt-recovery"
---

## Why This Was Considered

Topical prompt (UK, mid-2026): reporting that large numbers of graduates leave the country after
their degree and stop repaying income-contingent student loans. The Student Loans Company (SLC)
loses track of overseas borrowers, cannot verify their foreign income, and has weak cross-border
enforcement. The losses run to hundreds of thousands of borrowers.

Because Live Verify makes degrees verifiable, two "recovery" ideas naturally suggest themselves:

1. **Conditional degree status** — gate the degree's *verification* on loan repayment. A defaulter's
   degree returns `LAPSED` / `WITHHELD` until they pay, so a foreign employer or university checking
   the credential sees it as not-current. (A soft version of the US **lien** concept: attach an
   encumbrance to an asset until a debt is cleared.)
2. **Verification-tracking** — every degree check is a moment the borrower re-surfaces. Forward
   lookup metadata (approximate location, timestamp, verifying party) to the SLC so it can locate a
   delinquent graduate and pursue enforcement where they actually are.

Both are rejected. The first is a category error; the second is a surveillance mechanism that
doesn't even work.

## Why Conditional Degree Status Is Rejected

**A degree is a statement of fact about the past.** "This person passed these examinations and was
awarded this degree in 2021" does not become *untrue* because the person later defaulted on an
unrelated loan. An issuer that flipped the credential to `LAPSED` for non-payment would be using the
protocol to assert something false — the opposite of what a verification standard is for. (Contrast
insurance: a `LAPSED` policy genuinely *is* not in force, so the administrative status is true. A
defaulted-on degree is still a true degree.)

**This is the debt-collection-cudgel hazard at its most extreme.** The
[Revocation Cause](../../docs/Verification-Response-Format.md) guidance already warns issuers off
using a live verification endpoint as dunning infrastructure over built-up debt. A permanent,
factual academic credential held hostage for an unrelated financial obligation — against the
population least able to push back — is the cleanest possible illustration of why that line exists.
The credential and the debt are about different things: *competence* versus *money owed*.

**The legitimate channel is the loan's surface, not the degree's.** If anything is verifiable here it
is the *loan record* — an SLC-issued **repayment good-standing** document a borrower could present to
a mortgage lender ("in good standing, repayments current"). That is a real and acceptable use of the
standard, and it leaves the degree untouched: the loan is verifiable; the degree is never revocable.
Recovery, where it happens, is the loan endpoint's business — never the university's.

## Why Verification-Tracking Is Rejected

Set aside the ethics for a moment and the mechanism still fails on its own terms.

**It is trivially poisoned.** The whole premise is that a degree check reveals where the defaulter is.
But the borrower controls when and from where checks happen against *their own* credential. A
defaulter who understands the scheme floods their own degree-verification endpoint with lookups
routed through VPNs and proxies in countries they are *not* in — Lagos, Mumbai, São Paulo on a
Tuesday — burying any genuine signal under noise they manufacture for free. The "tracking" data
becomes worse than useless: it actively points enforcement at the wrong jurisdictions. Any system
whose signal is **attacker-controllable at zero cost** is not a tracking system; it is a
disinformation channel the target operates.

**It poisons honest verifiers, not just the target.** Real checks come from employers, universities,
and licensing bodies who have no idea they have been conscripted into debt enforcement. Forwarding
their lookup metadata to a creditor without their knowledge or the graduate's consent turns every
legitimate degree check into covert surveillance — and degrades the verification's privacy posture
for everyone, not only defaulters.

**It inverts a core privacy property.** Live Verify is explicitly designed so that *nobody — including
the issuer or this project — learns who verifies what.* The architecture goes to deliberate lengths
to prevent exactly this kind of enumeration and location inference (see
[OIRST and the air-gapped/DMZ deployment model](../../docs/Technical_Concepts.md)). A
verification-tracking feature would require tearing out that property by design. The standard cannot
both promise "the verifier is never watched" and ship a tap on the verifier.

## On the Lien Analogy

The US lien instinct is genuinely interesting, but it points *away* from this design rather than
toward it. A lien attaches to an asset whose ownership and transfer are recorded in a registry the
creditor can reach — a house, a vehicle, a bank account. Two properties make liens work that a
degree lacks:

- **The asset is the thing of value being transacted.** You clear the lien because you cannot sell
  the house without it. A degree is not transacted; it is *asserted*, repeatedly and freely, and
  withholding the assertion doesn't block any transaction the creditor can intercept.
- **The encumbrance lives on the loan/asset record, not on an unrelated fact.** The honest analog of
  a lien here is an encumbrance on the **loan record** (which is exactly the good-standing document
  above) — not a defacement of the academic record. A lien on your mortgage does not retroactively
  make your university stop confirming you graduated.

So the lien analogy, taken seriously, *confirms* the split: encumber the loan's own verifiable
surface if you must; never the degree's.

## Qualifying Criteria Assessment

From `public/use-cases/criteria-template.md`:

- **Claim must be true and human-readable:** A degree claim is true and stays true. Conditioning its
  status on loan repayment would make the endpoint return a *false* status — a direct violation.

- **Domain-bound authority / who stands behind the claim:** The university stands behind "they
  graduated." It does not, and should not, stand behind "they have repaid their loan" — that is the
  SLC's fact to attest on the SLC's domain. Cross-wiring the two breaks the authority model.

- **Privacy model (minimal disclosure, verifier never watched):** Verification-tracking inverts this
  outright. Live Verify's privacy promise is that lookups are unobserved; a creditor-forwarding
  feature is observation by design.

- **Resistance to gaming:** The tracking signal is generated by the target and forgeable for free via
  VPN flooding. A use case whose core signal the adversary fully controls fails on robustness.

## The Split Decision

| Idea | Live Verify? | Why |
|---|---|---|
| Verifiable loan repayment good-standing document (SLC-issued) | Yes | True fact, domain-bound to the SLC, holder-presented, no surveillance |
| Verifiable degree (unconditional) | Yes (already a core use case) | True past fact; this is what Live Verify is *for* |
| Degree status conditioned on loan repayment | No | Makes the endpoint assert a falsehood; debt-cudgel over a past-fact credential |
| Forwarding degree-check metadata to the SLC to locate defaulters | No | Trivially poisoned by VPN flooding; covert surveillance of innocent verifiers; inverts the privacy model |

The degree stays verifiable and stays factual. The loan, if it wants a verifiable surface, gets its
own — on the SLC's domain, attesting its own facts, watching no one. Debt recovery is a real problem;
it is not a document-authenticity problem, and bolting it onto the verification layer would damage
the very property that makes the layer trustworthy.

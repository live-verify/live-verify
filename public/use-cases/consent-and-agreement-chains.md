---
title: "Consent & Agreement Chains"
category: "Legal & Court Documents"
volume: "Very Large"
retention: "Agreement term + statutory limitation period"
slug: "consent-and-agreement-chains"
verificationMode: "clip"
tags: ["consent", "agreement", "medical-consent", "rental-terms", "two-party", "cross-org", "attestation-chain", "dispute-resolution"]
furtherDerivations: 2
---

## What is a Verifiable Consent Chain?

"I consent to this medical procedure." "I agree to these rental terms." "I authorize this financial transaction." These are claims made by one party in response to a proposal from another. Today they're captured as signatures on PDFs, checkboxes on web forms, or verbal agreements. The problem: neither side can independently prove what was agreed, or that both sides agreed to the *exact same text*.

A verifiable consent chain is two linked claims: the proposer attests what was proposed, and the consenter attests what they agreed to. Both are human-readable, both carry `verify:` lines, and any third party can independently confirm that both sides attested the same terms.

### Proposal

<div style="max-width: 580px; margin: 24px auto; font-family: 'Courier New', monospace; background: #f9f9f9; padding: 15px; border: 1px solid #999; font-size: 0.9em; color: #000; line-height: 1.7;" verifiable-text-element="true">
PROPOSED TERMS<br>
Landlord: Greenfield Properties Ltd<br>
Tenant: Maria Santos<br>
Property: Flat 4, 12 Riverside Walk, London SE1<br>
Term: 12 months from 1 April 2026<br>
Rent: £1,450 pcm<br>
Deposit: £1,450 (held by TDS)<br>
Detailed in: Tenancy agreement emailed 20 March 2026<br>
<span data-verify-line="proposal" style="color: #667;">verify:greenfield-properties.co.uk/lettings</span>
</div>

### Consent

<div style="max-width: 580px; margin: 24px auto; font-family: 'Courier New', monospace; background: #f0f9f0; padding: 15px; border: 1px solid #999; font-size: 0.9em; color: #000; line-height: 1.7;" verifiable-text-element="true">
AGREED<br>
Tenancy: Flat 4, 12 Riverside Walk, London SE1<br>
Term: 12 months from 1 April 2026<br>
Rent: £1,450 pcm<br>
Maria Santos<br>
25 March 2026<br>
<span data-verify-line="consent" style="color: #667;">verify:mail.mariasantos.me/agreements</span>
</div>

Both claims are independently verifiable. A letting agent, guarantor, or court can confirm that both sides attested to £1,450/month for 12 months starting April 1st.

## Why Two Claims, Not One?

A single signed document (DocuSign, wet-ink PDF) captures agreement but doesn't let each party independently attest from their own domain. If the document is hosted by one party's system, the other party has to trust that system not to alter the record.

With two independent verifiable claims:
- The landlord's domain attests the proposal
- The tenant's domain attests the agreement
- Neither party controls the other's attestation
- A third party can verify both without accessing either party's system

This is stronger than DocuSign for cross-organizational agreements where one party doesn't have (or trust) the other's signing platform.

## "Detailed in" and Non-Divergence

Both claims may reference an elaborating document (the full tenancy agreement, the surgical consent form, the financial authorization). The attested summary governs on the material terms. Where the summary and elaboration diverge, the recipient of the communication may choose which interpretation applies.

## Data Verified

Proposer identity, consenter identity, subject matter, material terms (dates, amounts, scope), elaboration reference, date of proposal, date of consent.

## Verification Response

- **`{"status":"verified"}`** — This party currently attests these terms
- **SUPERSEDED** — Terms were revised; a new proposal/consent exists
- **WITHDRAWN** — Consent was retracted (where legally permitted)
- **DISPUTED** — One party has flagged a disagreement about the terms
- **404** — Claim not found

## Use Case Families

**Medical consent**

A hospital proposes a procedure; the patient agrees. The hospital's domain attests what was proposed (procedure, risks disclosed, date). The patient's domain attests what they agreed to. "I was never told about the risks" becomes a verifiable question — did both claims contain the same risk disclosure text?

**Rental and lease terms**

As shown above. Both sides attest the material terms independently. Disputes about "the rent was supposed to be £1,400 not £1,450" have a hash trail from both domains.

**Financial authorizations**

"I authorize a standing order of £500/month to Acme Corp." The bank proposes the terms; the customer agrees. Both attest independently. Useful for cross-border arrangements where the customer and the bank are in different systems.

**Contractor scope agreements**

Before work begins, both sides attest the agreed scope and price. Links directly to [Quotes & Estimates](view.html?doc=quotes-estimates) — the quote is the proposal, the acceptance is the consent.

## Second-Party Use

The **consenting party** benefits:

**Proof of what was agreed:** The consent claim is attested by their own domain. The proposer cannot later claim different terms were agreed, because the consenter's independently verified claim shows exactly what they said yes to.

**Withdrawal evidence:** If consent is withdrawn (where legally permitted), the claim status changes. The consenter has verifiable proof of when they withdrew.

## Third-Party Use

**Courts / Dispute Resolution**
Both parties' attested claims provide independent evidence of what was agreed. No need to rely on one party's copy of the document.

**Guarantors / Co-signers**
Can verify the exact terms both parties attested to before adding their own guarantee.

**Regulators**
Can verify that informed consent was obtained (medical, financial) and that both parties attested to the same disclosure text.

## Verification Architecture

**The "Different Versions" Problem**

- **Post-hoc revision:** One party claims different terms were agreed after the fact
- **Selective disclosure:** Proposer shows one version to the consenter and a different version to a third party
- **Missing consent:** Proposer claims consent was given but the consenter has no record
- **Coerced revision:** One party pressures the other to accept revised terms and claims the revision was the original

**Why two independent attestations help:** Neither party controls the other's `verify:` endpoint. Both claims are independently verifiable. If the two claims contain different terms, the divergence is visible to any third party.

## Authority Chain

**Pattern:** Commercial (self-certified on both sides)

```
✓ greenfield-properties.co.uk/lettings — Proposes tenancy terms
✓ mail.mariasantos.me/agreements — Attests tenant's agreement
```

No regulatory chain. Trust rests on each party's domain.

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Jurisdictional Witnessing (Optional)

Useful for high-value agreements or where one party is likely to dispute. A witness firm receiving both parties' hashes provides independent timestamped proof that both claims existed at the time of agreement.

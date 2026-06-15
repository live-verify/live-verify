---
title: "Civil & Administrative Approvals"
category: "Government & Civic Documents"
volume: "Large"
retention: "Decision period + appeal window / statutory record (often permanent)"
slug: "civil-administrative-approvals"
verificationMode: "clip"
tags: ["approval", "planning-consent", "grant-award", "benefit-decision", "zoning-variance", "regulatory-clearance", "administrative-decision", "government", "decision-letter", "approval-fraud"]
furtherDerivations: 1
---

## What is a Civil or Administrative Approval?

When a government body or public agency grants a *specific* application or request, it issues a **decision** — a planning consent, a grant award, a benefit-eligibility determination, a zoning variance, a regulatory clearance for a product. This is different from an ongoing **license** or **permit**: a license says you may keep practising; a permit is a standing grant tied to a site or activity. An administrative approval is a **one-off decision on a request**, recorded in a decision letter or notice, often with conditions and an appeal window.

The decision letter is the artifact people act on. A developer starts building on a planning consent. A grantee draws down funds on an award letter. A claimant relies on a benefit-eligibility decision. A manufacturer ships on a regulatory clearance. Today these letters are PDFs on agency letterhead — and agency letterhead is among the easiest things to forge. A verifiable approval lets anyone confirm the issuing authority actually made *this* decision, on *this* application, with *these* conditions, and that it has not been varied or revoked on appeal.

<div style="max-width: 600px; margin: 24px auto; font-family: 'Segoe UI', Arial, sans-serif; border: 1px solid #0b4f6c; background: #fff; padding: 0;">
  <div style="background: #0b4f6c; color: #fff; padding: 15px;">
    <div style="font-weight: bold; font-size: 1.1em;"><span verifiable-text="start" data-for="planning"></span>NOTICE OF DECISION — PLANNING PERMISSION</div>
    <div style="font-size: 0.8em;">Springfield District Council — Development Management</div>
  </div>
  <div style="padding: 20px; font-size: 0.9em; line-height: 1.6; color: #222;">
    <p><strong>Application Ref:</strong> 26/00418/FUL<br>
    <strong>Applicant:</strong> Maple Developments Ltd<br>
    <strong>Site:</strong> Land at 12 Maple Street, Springfield<br>
    <strong>Decision Date:</strong> March 18, 2026</p>
<div style="background: #eef5f8; padding: 15px; margin: 15px 0; border-left: 3px solid #0b4f6c;">
      <p style="margin: 0;"><strong>Decision:</strong> GRANTED — Full Planning Permission</p>
      <p style="margin: 8px 0 0;">Proposal: Erection of 8 dwellings with associated access</p>
      <p style="margin: 8px 0 0;"><strong>Subject to conditions:</strong> 14 conditions (see schedule). Condition 3: development to begin within 3 years.</p>
    </div>
<p style="font-size: 0.85em; color: #666;">Appeal window: 6 months from decision date<br>
    Decided under delegated authority by: Head of Planning</p>
<div data-verify-line="planning" style="border-top: 1px dashed #999; margin-top: 15px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
      title="Demo only: illustrative verification line">
      <span data-verify-line="planning">verify:springfield.gov/decisions/v</span> <span verifiable-text="end" data-for="planning"></span>
    </div>
  </div>
</div>

## The Approval Types

The same decision primitive appears across public administration:

- **Planning / development consent** — A planning authority grants permission for a specific development, with conditions and a commencement deadline. Builders, neighbours, buyers, and conveyancers rely on it. (Complements [Planning Permission Status](view.html?doc=planning-permission-status).)
- **Grant award** — A funder (government, research council, foundation) approves a specific grant to a named recipient for a stated amount and purpose. Auditors and partners rely on it.
- **Benefit / eligibility decision** — An agency determines a claimant is eligible for a benefit or scheme. Landlords, employers, or service providers may rely on the decision letter.
- **Zoning variance / special-use approval** — A board grants a specific exception. Neighbours and title examiners rely on it.
- **Regulatory product clearance** — A regulator clears a specific product/version for market (e.g., medical-device clearance). Distributors and procurers rely on it.

Each is a discrete decision on a request, recorded, conditional, and potentially appealable or revocable.

## The Approval Fraud Problem

- **Forged decision letters** — Agency letterhead is trivially copied. A "GRANTED" planning notice or a grant-award letter is fabricated to unlock financing, sales, or draw-down.
- **Condition stripping** — A genuine approval carried 14 conditions; the copy in circulation omits the inconvenient ones (affordable-housing obligation, commencement deadline).
- **Decision swap** — A "refused" or "approved with onerous conditions" decision is replaced with a cleaner forgery.
- **Lapsed / overturned approvals** — A consent that expired (commencement deadline missed) or was overturned on appeal keeps being presented as live.
- **Eligibility fraud** — A fabricated eligibility decision is used to obtain benefits, tenancies, or scheme access.

A verifiable approval binds the decision, the conditions, and the application reference to the issuing authority's domain, with a status that reflects appeal outcomes and lapse.

## Data Verified

Issuing authority, application/decision reference, applicant/recipient, the subject of the decision (site, project, claim), the decision itself (granted/refused/varied), the conditions (or a binding reference to the condition schedule), the decision date, the appeal window, and the deciding officer or committee.

## Data Visible After Verification

Shows the issuer domain (e.g., `springfield.gov`) and the current status of the decision.

**Verification Response Format:**

```json
{
  "status": "verified",
  "allowedDomains": ["springfield.gov", "*.springfield.gov"]
}
```

**Status Indications:**
- **Granted — in force** — The decision is current and matches the authority's record (including its conditions).
- **Granted — subject to appeal** — Decided, but within the appeal window; outcome may change.
- **Varied on appeal** — The decision was modified (e.g., conditions changed); request the current version.
- **Overturned / refused on appeal** — The approval no longer stands.
- **Lapsed** — A time-limited consent expired (e.g., development not commenced in time).
- **404** — No such decision exists (never issued, forged, or OCR error).

## Second-Party Use

The **applicant / recipient** benefits.

**Proving the grant cleanly:** A developer, grantee, or claimant can present a verifiable decision that proves the approval is genuine and unaltered — useful to lenders, partners, and buyers who would otherwise take a PDF on trust.

**Conveyancing and sale:** A property seller can demonstrate that the planning consent attached to the property is real, current, and carries exactly the conditions stated — reducing diligence friction.

## Third-Party Use

**Buyers, Conveyancers, and Title Examiners**

**Diligence:** Confirming that a planning consent or variance relied upon in a transaction genuinely exists, is in force, and carries the stated conditions — not a condition-stripped or lapsed copy.

**Lenders and Funders**

**Draw-down control:** A bank financing a development, or a funder co-investing alongside a grant, verifies the underlying public approval before releasing money.

**Neighbours and the Public**

**Civic transparency:** A resident can verify that a notice posted on a site genuinely reflects the authority's decision and conditions, supporting trust in the process and the right to object within the appeal window.

**Auditors and Oversight Bodies**

**Grant assurance:** Auditors confirm that claimed grant awards correspond to real decisions for the stated amount and purpose, deterring grant-award fraud.

## Verification Architecture

**The Problem:**
- Decision letters on agency letterhead are easy to forge or selectively edit
- Recipients and relying parties cannot easily confirm a decision or its conditions
- Approvals lapse or are overturned on appeal with no signal on the circulating letter
- Eligibility and grant fraud exploit the trust placed in official-looking decisions

**The Fix:** The authority publishes a verifiable decision record at its own (often `.gov`) domain. Anyone holding the decision letter clips it and confirms the decision, conditions, and live status.

**The reliance flow:**
1. The authority makes a decision on an application
2. It publishes a verifiable decision record (hash) at its domain
3. A relying party (buyer, lender, neighbour, auditor) clips the decision letter
4. Verification confirms the decision, conditions, and current status
5. If lapsed or overturned → the relying party stops and seeks the current position

## Authority Chain

**Pattern:** Regulated

Civil approvals derive authority from the statutory powers of the issuing public body.

```
✓ springfield.gov/decisions/v — Planning and administrative decisions
  ✓ springfield.gov — Local planning authority (statutory powers)
    ✓ gov.uk/verifiers — Government root namespace
```

The same shape applies to grant funders, benefit agencies, and product regulators, each rooted in its own statutory authority.

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## See Also

- [Planning Permission Status](view.html?doc=planning-permission-status) — the standing planning-status case; this doc covers the decision *event* and its conditions
- [Public Works Planning Notices](view.html?doc=public-works-planning-notices) — posted civic notices
- [Research Grants and Funding](view.html?doc=research-grants-funding) — grant-award documents in depth
- [Corporate Internal Approvals](view.html?doc=corporate-internal-approvals) and [Professional Approvals & Sign-Offs](view.html?doc=professional-approvals) — the private-sector siblings

## Jurisdictional Witnessing (Optional)

Some jurisdictions, contracts, or multi-party workflows may add an independent witness layer. When used, the witnessing firm:

- Receives all hashes from the issuer, and any subsequent changes to the payload as they happen—which may manifest as a new hash, a status change, or even a 404 (record deleted)
- Receives structured content/metadata (key identifiers and dates)
- Does **NOT** receive plaintext or sensitive personal information
- Provides an immutable, timestamped audit trail—available to the jurisdiction on demand, to document holders/third parties during disputes, or as expert witness testimony in legal proceedings

This provides:
- **Non-repudiation:** The authority cannot deny issuing the decision
- **Timestamp proof:** The decision existed at a specific time
- **Regulatory audit:** Oversight bodies can inspect the witness ledger for decision integrity
- **Resilience:** Verification works even if the issuer's systems go down

**Public Blockchain (Non-Party)**

If a witness layer exists, it may periodically commit rollups to a public blockchain as an additional timestamping mechanism. That is optional, not inherent to the use case. The verification paths would then be:

1. **Issuer domain** — Direct check against the issuer
2. **Witnessing firm** — Independent confirmation with timestamp
3. **Public blockchain** — Decentralized trust anchor via rollup inclusion

## Further Derivations

1. **Condition-schedule binding** — The full schedule of conditions is bound into the verified record, so a condition-stripped copy fails verification.
2. **Appeal-outcome tracking** — The decision record updates to reflect appeal status (upheld, varied, overturned), so a relying party always sees the current legal position.
3. **Grant-award draw-down verification** — Award records that funders and auditors verify at each draw-down stage against the approved amount and purpose.

---
title: "Independent Adjuster Field Inspection Reports"
category: "Insurance Claims & Operations"
volume: "Medium"
retention: "Claim term + 10 years"
slug: "independent-adjuster-reports"
verificationMode: "clip"
tags: ["independent-adjuster", "field-inspection", "damage-assessment", "insurance-claims", "property-claim", "auto-claim", "restoration-audit", "ia-report"]
furtherDerivations: 1
---

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 1px solid #ccc; background: #fff; padding: 0; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <div style="background: #37474f; color: #fff; padding: 20px; display: flex; justify-content: space-between; align-items: center;">
    <div>
      <div style="font-weight: bold; font-size: 1.2em;"><span verifiable-text="start" data-for="ia-report"></span>CRAWFORD & COMPANY</div>
      <div style="font-size: 0.8em; opacity: 0.8;">Independent Claims Solutions</div>
    </div>
    <div style="text-align: right;">
      <div style="font-size: 0.8em;">IA Report #: 2026-992288</div>
    </div>
  </div>
<div style="padding: 25px;">
    <h3 style="margin-top: 0; color: #37474f; border-bottom: 2px solid #37474f; padding-bottom: 5px;">FIELD INSPECTION SUMMARY</h3>
<div style="font-size: 0.9em; line-height: 1.6; color: #333;">
      <p><strong>Carrier:</strong> Liberty Mutual Insurance<br>
      <strong>Claim #:</strong> 99228877-WC<br>
      <strong>Property:</strong> 123 Industrial Way, Chicago, IL</p>
<div style="background: #fdfdfd; border: 1px solid #eee; padding: 15px; margin: 15px 0; border-radius: 4px;">
        <p><strong>Adjuster:</strong> Robert Miller (License #TX-9982)<br>
        <strong>Inspection Date:</strong> March 15, 2026</p>
        <p><strong>Damage Estimate (RCV):</strong> $ 42,500.00<br>
        <strong>Cause of Loss:</strong> Sudden & Accidental Discharge of Water</p>
      </div>
<p style="font-size: 0.85em;"><strong>Scope:</strong> Removal of 1,200 sq ft of hardwood; replacement of baseboards and insulation. No structural mold detected at time of inspection.</p>
    </div>
<div data-verify-line="ia-report" style="border-top: 1px dashed #999; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
      title="Demo only: Crawford & Co doesn't yet offer verification&#10;endpoints, so this is illustrative">
      <span data-verify-line="ia-report">verify:crawco.com/reports/v</span> <span verifiable-text="end" data-for="ia-report"></span>
    </div>
  </div>
</div>

## The Problem: Estimate Padding Fraud

- **Scope Inflation:** A contractor editing the IA's PDF to add 500 extra square feet of flooring to over-charge the carrier.
- **Cause of Loss Forgery:** Changing "Flood" (uninsured) to "Pipe Burst" (insured) on the paper report to trigger a payout.
- **License Fraud:** An unlicensed trainee performing the inspection but using a master adjuster's verified signature on the final PDF.

## What Is Checked

Adjuster name, IA (Independent Adjuster) license number, hiring carrier name, Claim ID, property address, inspection date, estimated RCV (Replacement Cost Value), cause of loss code, primary scope of work (digest), date of report issuance.

**Document Types:**
- **Field Inspection Report:** The primary narrative and estimate.
- **Photo Sheet:** (Linked hash) for every damage photo taken.
- **Narrative Report:** Adjuster's personal opinion on liability/coverage.
- **Preliminary Loss Report:** First 24-hour assessment.

## What the Checker Sees

Shows the issuer domain (`crawco.com`, `eberls.com`, `alacritysolutions.com`) and report status.

**Status Indications:**
- **Final/Closed** — Report is complete and transmitted to the carrier.
- **Preliminary** — Initial assessment; subject to supplement.
- **Amended** — A revised report exists (e.g., due to hidden damage found later).
- **Void** — Assigned to wrong claim or adjuster error.

## Who Holds It

The Hiring Insurance Carrier benefits from verification.

**Anti-Tampering:** Ensuring that the "IA Report" uploaded by a third-party firm hasn't been "Modified" by a broker or contractor before it hits the carrier's core ledger. A verified hash from the IA firm's domain provides the carrier with a "Sanitized Audit Trail" for high-value claims.

**Subrogation:** Proving the "Proximate Cause" to a third-party tortfeasor's insurer using a verified, immutable expert assessment from the field.

## Who Checks It

**Property Owners (Policyholders)**
**Transparency:** Proving to themselves that the "IA Estimate" provided by the contractor matches what the independent adjuster actually sent to the insurance company. Verification prevents "Contractor Padding" where the crew claims the adjuster authorized $50k when they only authorized $40k.

**Legal Counsel (Plaintiffs/Defense)**
**Discovery Admissibility:** Instantly verifying that a 3-year-old field report used as evidence in a bad-faith lawsuit is the original, non-altered version.

**Mortgage Lenders**
**Repair Audit:** Verifying that the $42,500 insurance payout is actually intended for the "Hardwood Floors" (the bank's collateral) and not just a cash payout for personal items.

## Who Issues It

**Issuer Types** (First Party)

**IA Firms:** (Crawford & Co, Eberl, Sedgwick, Alacrity).
**Independent Adjusters:** (Solo practitioners).
**Inspection Platforms:** (e.g., Xactimate/Verisk - hosting the underlying data hashes).

## Authority Chain

**Pattern:** Regulated

Independent adjusters are licensed professionals who investigate insurance loss claims.

```
✓ adjuster.crawco.co.uk — Issues insurance loss assessments
  ✓ cila.co.uk — Regulates UK claims professionals
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Where Each Fits: Live Verify and Claims Management Portals

Insurance carriers run claims management systems (Guidewire is one common example) where the claim is handled and the adjuster's field report is filed. Access is limited to the carrier, its adjusting firms and their staff. The portal and Live Verify answer different questions and work side by side: one is the carrier's working record, the other lets an outsider who is handed the report confirm that the adjusting firm stands behind it.

| | Carrier claims portal | Live Verify on the field report | Scanned PDF report |
| :--- | :--- | :--- | :--- |
| **Who can check** | The carrier, its adjusting firms and their authorized staff. | Anyone handed the report: the policyholder, a contractor, a mortgage lender, a lawyer. | Nobody; it can only be taken on trust. |
| **What the checker gets** | The full claim file, kept up to date as the claim moves on. | Confirmation that the adjusting firm issued this exact report, including its figures, as at its date, and whether it has been withdrawn. | A document whose figures may have been edited. |
| **What the policyholder shares** | Nothing; the data stays inside the carrier's systems. | Only the report they chose to hand over. | Only the report they chose to hand over. |
| **Reach** | One carrier's system; each carrier runs its own. | Global in principle: any adjusting firm, in any country, that publishes hashes on its own domain. | Anywhere, but untrusted. |
| **Speed and cost** | Immediate for those with access; outsiders cannot get access. | A few seconds per check: one web lookup, with no fee to the standard and no portal account. | Immediate. |
| **What it needs** | A login on that carrier's system. | The adjusting firm to publish hashes, and Live Verify-aware software on the checker's device. No adjusting firm does this yet. | Nothing. |
| **Best suited to** | Managing the claim inside the carrier and its adjusting network. | Contractors, lenders and lawyers outside the carrier who need to rely on the report's figures. | Nothing where the amount matters. |

**Where each fits:** The carrier's claims system, Guidewire or otherwise, is where the claim is actually handled, and the carrier and its adjusting firm should keep treating it as the working record. Contractors, mortgage lenders and public adjusters are never given access to it and see the field report only as a PDF passed on by the policyholder. Live Verify lets them confirm that the adjusting firm stands behind that report and its figures, without any change to how the claim is managed inside the carrier.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).

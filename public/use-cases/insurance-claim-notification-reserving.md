---
title: "Insurance Claim Notification & Reserving"
category: "Actuarial & Insurance Mathematics"
volume: "Very Large"
retention: "Policy Period + 10-20 years (Statute of Limitations)"
slug: "insurance-claim-notification-reserving"
verificationMode: "clip"
tags: ["insurance-fraud", "reserving-fraud", "actuarial-integrity", "ibnr", "claim-notification", "independent-witness", "insolvency-prevention"]
furtherDerivations: 1
---

## What is a Claim Notification Receipt?

In the insurance industry, the greatest risk to solvency isn't a lack of assets, but the under-reporting of liabilities. A "Reserving Fraud" occurs when management intentionally fails to "book" claims as they arrive, making the company appear more profitable and solvent than it actually is. This creates a Ponzi-like environment where new premiums are required to pay old, unbooked claims.

The Independent Insurance (UK, 2001) collapse is the classic example: management failed to book £62 million in claims, and auditors were unable to detect the missing liabilities because management controlled the "ground truth" data.

Live Verify with Independent Witnessing solves the "Completeness Problem." The moment a claim is first notified (the "First Notice of Loss"), a digital or printed receipt is generated and hashed. This hash is sent to an independent third-party witness (the Regulator, an Audit Firm, or a Public Ledger).

<div style="max-width: 500px; margin: 24px auto; font-family: 'Courier New', Courier, monospace; border: 2px solid #002244; background: #fff; padding: 30px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <div style="text-align: center; border-bottom: 2px solid #002244; padding-bottom: 10px; margin-bottom: 20px;">
    <div style="font-weight: bold; font-size: 1.2em; color: #002244;"><span verifiable-text="start" data-for="claim"></span>GLOBAL LIABILITY INSURERS</div>
    <div style="font-size: 0.8em;">FIRST NOTICE OF LOSS (FNOL) RECEIPT</div>
  </div>
<div style="font-size: 0.95em; line-height: 1.4;">
    <p><strong>Claim Ref:</strong> CL-2026-887766<br>
    <strong>Policy:</strong> PL-992288-XJ<br>
    <strong>Insured:</strong> Springfield Manufacturing</p>
<div style="border: 1px solid #ccc; padding: 10px; margin: 15px 0; background: #f9f9f9;">
      <strong>Event Date:</strong> JAN 02, 2026<br>
      <strong>Reported:</strong> JAN 02, 2026 14:22:10 UTC<br>
      <strong>Type:</strong> Employers' Liability (Injury)
    </div>
<p style="font-size: 0.85em;">This receipt confirms that your claim has been registered in our system. Any alteration to this record will invalidate the witnessed hash.</p>
  </div>
<div data-verify-line="claim" style="border-top: 1px dashed #999; margin-top: 20px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
      title="Demo only: Insurers don't yet offer verification&#10;endpoints, so this is illustrative">
      <span data-verify-line="claim">verify:globalliability.com/v</span> <span verifiable-text="end" data-for="claim"></span>
  </div>
  <div style="font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center; margin-top: 5px;">
      witness:regulator.gov.uk/w
  </div>
</div>

## The Problem: Management-Curated Reality

- **Unbooked Claims:** Receiving a claim notification but intentionally not entering it into the accounting system to hide liabilities.
- **Backdating:** Changing the date of a loss to fall within (or outside) a specific policy period.
- **Reserve Manipulation:** Changing the "Type" of a claim from "Total Loss" to "Partial Loss" in the database while leaving the original paper notification unchanged.

## What Is Checked

Claim reference number, policy number, name of insured, date of loss, timestamp of reporting, claim type (e.g., motor, liability), status (Registered/Reserved).

## What the Checker Sees

Shows the issuer domain (`globalliability.com`) and the claim status.

**Status Indications:**
- **In-Process** — Claim is open and being adjusted.
- **Settled** — Payment has been made and liability is closed.
- **Withdrawn** — Claimant retracted the claim.
- **Invalid** — Hash does not match any record.

## Who Holds It

The Policyholder / Claimant benefits from verification.

**Anti-Welching Protection:** In unregulated or poorly supervised markets, an insurer might attempt to "lose" a large claim notification to avoid payment. The witnessed receipt provides the claimant with an undeniable legal proof of notification that cannot be deleted from the historical record.

## Who Checks It

**Regulators (FSA, PRA, State DOI)**
**Solvency Monitoring:** Regulators can compare the total volume of witnessed hashes against the insurer's reported reserves. If the Witness service has 10,000 hashes but the insurer only reports 8,000 claims on their balance sheet, the regulator has immediate evidence of reserving fraud.

**External Actuaries (Watson Wyatt, Milliman)**
**Completeness Vetting:** Actuaries traditionally rely on "management data." With Text-to-Hash, actuaries can verify the *completeness* of the data they are auditing by reconciled the witnessed hash list against the management spreadsheet.

## Where Each Fits: Live Verify and Claims Databases

Industry claims databases, such as CUE in the UK and ISO ClaimSearch in the US, pool claims data from member insurers so that insurers can spot a claimant making the same claim twice or hiding a claims history. Other countries have their own industry databases, some share data across borders, and many have none. These databases and a witnessed notification receipt answer different questions: the databases protect insurers from dishonest claimants, while the receipt protects claimants, regulators and actuaries from an insurer that does not book what it was told. They work side by side.

| | Industry claims database | Live Verify on the notification receipt, with an independent witness |
| :--- | :--- | :--- |
| **Who can check** | Member insurers, under the database's rules. | The claimant holding the receipt; regulators and actuaries reconciling witnessed records against reported claims. |
| **What the checker gets** | Claims history across participating insurers, as those insurers reported it. | Confirmation that the insurer issued this exact receipt, as at the moment of notification, and a witness record of when the hash was first seen. |
| **What the claimant shares** | Nothing directly; insurers submit the data. | Only the receipt they chose to hand over. The witness holds the hash, never the text. |
| **Reach** | The insurers in that country's or scheme's membership. | Global in principle: any insurer, in any country, that publishes hashes on its own domain. |
| **Speed and cost** | Fast for members, once the data has been submitted; membership comes with the database's own terms. | A few seconds per check: one web lookup, with no fee to the standard. A witness service is a separate arrangement. |
| **What it needs** | Insurer membership and accurate, timely submissions by the insurers themselves. | The insurer to publish hashes at first notice of loss, a witness to record them, and Live Verify-aware software on the checker's device. No insurer does this yet. |
| **Best suited to** | Detecting claimant fraud across the market. | Proving that a claim was notified and when, so that it cannot quietly go unbooked. |

**Where each fits:** Industry databases such as CUE and ISO ClaimSearch do their job well: they help insurers catch dishonest claimants, and they should carry on doing so. They were not built to catch an insurer that leaves claims off its own books, because the insurer decides what it submits. A witnessed notification receipt addresses that narrower gap, giving the claimant proof of notification and giving regulators and actuaries a count to reconcile against reported reserves.

## Who Issues It

**Issuer Types** (First Party)

**General Insurers (Liability, Property).**
**Reinsurance Carriers.**
**Lloyd's Syndicates.**

## Authority Chain

**Pattern:** Regulated

Lloyd's of London, the world's leading insurance market, is regulated by the FCA and issues verified claim notification receipts and reserve statements.

```
✓ reserving.lloyds.com/verify — Issues verified insurance claim notification and reserving records
  ✓ fca.org.uk/register — Regulates UK general insurance firms
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Rationale

Insurance is a "Business of Promises." The value of an insurance policy is entirely dependent on the insurer's ability to pay future claims. By externalizing the "First Notice of Loss" via witnessed hashes, we move from a model of "Trusting management's data" to "Verifying the public's claims," ensuring that the book growth never hides a hollow reserve.

**Historical Context:** I worked for Independent Insurance in the UK during the mid-90s and witnessed firsthand the actions of the too-charismatic CEO Michael Bright and his management team. 
Although leaving ten years before the final 2001 collapse, the experience informed the understanding that "management-curated reality" is a primary failure mode of regulated 
financial entities. Live Verify with independent witnessing is designed to neutralize the charismatic "distortion field" by anchoring ground-truth data in a neutral, 
external service. [Some hansard minutes on Indi](https://hansard.parliament.uk/commons/2001-07-04/debates/b705a9b5-5bfc-44df-b0c8-65a6827b9e63/IndependentInsuranceCompany).

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).

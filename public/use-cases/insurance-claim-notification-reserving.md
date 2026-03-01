---
title: "Insurance Claim Notification & Reserving"
category: "Actuarial & Insurance Mathematics"
volume: "Very Large"
retention: "Policy Period + 10-20 years (Statute of Limitations)"
slug: "insurance-claim-notification-reserving"
tags: ["insurance-fraud", "reserving-fraud", "actuarial-integrity", "ibnr", "claim-notification", "independent-witness", "insolvency-prevention"]
furtherDerivations: 1
---

## What is a Claim Notification Receipt?

In the insurance industry, the greatest risk to solvency isn't a lack of assets, but the **under-reporting of liabilities**. A "Reserving Fraud" occurs when management intentionally fails to "book" claims as they arrive, making the company appear more profitable and solvent than it actually is. This creates a Ponzi-like environment where new premiums are required to pay old, unbooked claims.

The **Independent Insurance (UK, 2001)** collapse is the classic example: management failed to book £62 million in claims, and auditors were unable to detect the missing liabilities because management controlled the "ground truth" data.

Live Verify with **Independent Witnessing** solves the "Completeness Problem." The moment a claim is first notified (the "First Notice of Loss"), a digital or printed receipt is generated and hashed. This hash is sent to an independent third-party witness (the Regulator, an Audit Firm, or a Public Ledger).

<div style="max-width: 500px; margin: 24px auto; font-family: 'Courier New', Courier, monospace; border: 2px solid #002244; background: #fff; padding: 30px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <div style="text-align: center; border-bottom: 2px solid #002244; padding-bottom: 10px; margin-bottom: 20px;">
    <div style="font-weight: bold; font-size: 1.2em; color: #002244;"><span verifiable-text="start" data-for="claim">[</span>GLOBAL LIABILITY INSURERS</div>
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
      verify:globalliability.com/v <span verifiable-text="end" data-for="claim">]</span>
  </div>
  <div style="font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center; margin-top: 5px;">
      witness:regulator.gov.uk/w
  </div>
</div>

## Data Verified

Claim reference number, policy number, name of insured, date of loss, timestamp of reporting, claim type (e.g., motor, liability), status (Registered/Reserved).

## Data Visible After Verification

Shows the issuer domain (`globalliability.com`) and the claim status.

**Status Indications:**
- **In-Process** — Claim is open and being adjusted.
- **Settled** — **ALERT:** Payment has been made and liability is closed.
- **Withdrawn** — Claimant retracted the claim.
- **Invalid** — **CRITICAL:** Hash does not match any record.

## Second-Party Use

The **Policyholder / Claimant** benefits from verification.

**Anti-Welching Protection:** In unregulated or poorly supervised markets, an insurer might attempt to "lose" a large claim notification to avoid payment. The witnessed receipt provides the claimant with an undeniable legal proof of notification that cannot be deleted from the historical record.

## Third-Party Use

**Regulators (FSA, PRA, State DOI)**
**Solvency Monitoring:** Regulators can compare the total volume of witnessed hashes against the insurer's reported reserves. If the Witness service has 10,000 hashes but the insurer only reports 8,000 claims on their balance sheet, the regulator has immediate evidence of reserving fraud.

**External Actuaries (Watson Wyatt, Milliman)**
**Completeness Vetting:** Actuaries traditionally rely on "management data." With Text-to-Hash, actuaries can verify the *completeness* of the data they are auditing by reconciled the witnessed hash list against the management spreadsheet.

## Jurisdictional Witnessing

A jurisdiction may require the issuer to retain a **witnessing firm** for regulatory compliance. The witnessing firm:

- Receives all hashes from the issuer, and any subsequent changes to the payload as they happen—which may manifest as a new hash, a status change, or even a 404 (record deleted)
- Receives structured content/metadata (key identifiers and dates)
- Does **NOT** receive plaintext or sensitive personal information
- Provides an immutable, timestamped audit trail—available to the jurisdiction on demand, to document holders/third parties during disputes, or as expert witness testimony in legal proceedings

This provides:
- **Non-repudiation:** Issuer cannot deny issuing the document
- **Timestamp proof:** Document existed at a specific time
- **Regulatory audit:** Jurisdictions can inspect the witness ledger for fraud detection
- **Resilience:** Verification works even if issuer's systems go down

**Public Blockchain (Non-Party)**

Witnessing firms may periodically commit rollups to an inexpensive public blockchain, providing an ultimate immutability guarantee. The blockchain is a "non-party"—infrastructure, not a participant in the transaction. This creates multiple verification paths:

1. **Issuer domain** — Direct check against the issuer
2. **Witnessing firm** — Independent confirmation with timestamp
3. **Public blockchain** — Decentralized trust anchor via rollup inclusion


## Competition vs. National Reporting Databases

| Feature | Text-to-Hash (Witnessed) | Legacy Databases (CUE, ISO) |
| :--- | :--- | :--- |
| **Primary Goal** | **Issuer Integrity.** Prevents unbooked liabilities. | **Claimant Integrity.** Prevents double-claiming. |
| **Timing** | **Instant.** Witnessed at the second of notification. | **Laggy.** Often updated weeks after the event. |
| **Authority** | **Cryptographic.** Witness provides neutral proof. | **Administrative.** Relies on insurer data entry. |
| **Accessibility** | **Open Protocol.** Anyone with the receipt can verify. | **Closed Loop.** Only available to member insurers. |

**Why Text-to-Hash wins:** Legacy reporting systems like the UK's **CUE** or the US's **ISO ClaimSearch** are designed to help insurers catch fraudulent *policyholders*. They are virtually useless at catching fraudulent *management teams* because the insurer remains the gatekeeper of what data is uploaded. Text-to-Hash flips the script: the moment the public notifies the insurer, the "Witness" locks in the liability, making it impossible for management to hide it later.

## Verification Architecture

**The "Management-Curated Reality" Problem**

- **Unbooked Claims:** Receiving a claim notification but intentionally not entering it into the accounting system to hide liabilities.
- **Backdating:** Changing the date of a loss to fall within (or outside) a specific policy period.
- **Reserve Manipulation:** Changing the "Type" of a claim from "Total Loss" to "Partial Loss" in the database while leaving the original paper notification unchanged.

**Issuer Types** (First Party)

**General Insurers (Liability, Property).**
**Reinsurance Carriers.**
**Lloyd's Syndicates.**

## Rationale

Insurance is a "Business of Promises." The value of an insurance policy is entirely dependent on the insurer's ability to pay future claims. By externalizing the "First Notice of Loss" via witnessed hashes, we move from a model of "Trusting management's data" to "Verifying the public's claims," ensuring that the book growth never hides a hollow reserve.

**Historical Context:** I worked for Independent Insurance in the UK during the mid-90s and witnessed firsthand the actions of the too-charismatic CEO Michael Bright and his management team. 
Although leaving ten years before the final 2001 collapse, the experience informed the understanding that "management-curated reality" is a primary failure mode of regulated 
financial entities. Live Verify with independent witnessing is designed to neutralize the charismatic "distortion field" by anchoring ground-truth data in a neutral, 
external service. [Some hansard minutes on Indi](https://hansard.parliament.uk/commons/2001-07-04/debates/b705a9b5-5bfc-44df-b0c8-65a6827b9e63/IndependentInsuranceCompany).

---
title: "Proof of Loss Forms (Sworn Statements)"
category: "Insurance Claims & Operations"
volume: "Medium"
retention: "Claim term + 7-10 years (statute of limitations)"
slug: "proof-of-loss-forms"
tags: ["insurance-claims", "proof-of-loss", "sworn-statement", "adjuster-report", "insurance-fraud", "claim-payout", "legal-affidavit", "notarized-document"]
furtherDerivations: 1
---

## What is a Proof of Loss Form?

In the insurance industry, the **Sworn Statement in Proof of Loss** is the formal document where a policyholder legally declares the details of a claim. It is an affidavit stating the value of the property destroyed, the cause of the loss (e.g., Fire, Theft), and the parties who have an interest in the property (e.g., a Mortgage Bank).

This document is the "Trigger for Payout." Fraud is high-stakes: claimants often "edit" a Proof of Loss to inflate the value of their items (e.g., turning a $500 TV into a $5,000 home theater system) or to change the "Date of Loss" to bring it within the coverage period. Because these forms are often notarized, forgery of the notary seal is also common. Verified hashes bind the **Claimed Amount, Cause of Loss, and Notary ID** to the insurer's domain (e.g., `allstate.com` or `statefarm.com`).

<div style="max-width: 650px; margin: 24px auto; font-family: 'Times New Roman', Times, serif; border: 1px solid #333; background: #fff; padding: 40px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <div style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 30px;">
    <h2 style="margin: 0; font-size: 1.4em; text-transform: uppercase; letter-spacing: 1px;"><span verifiable-text="start" data-for="loss">[</span>SWORN STATEMENT IN PROOF OF LOSS</h2>
    <div style="font-size: 0.9em; font-style: italic;">Official Claim Document</div>
  </div>
<div style="font-size: 0.95em; line-height: 1.6; color: #333; text-align: justify;">
    <div style="display: flex; justify-content: space-between; margin-bottom: 20px; font-weight: bold;">
      <div>POLICY #: 99228877-XJ</div>
      <div>CLAIM #: CL-2026-8844</div>
    </div>
<p>To the <strong>GOLIATH INSURANCE COMPANY</strong> of Springfield, USA.</p>
<p>At time of loss, the total amount of insurance upon the property described was <strong>$ 250,000.00</strong>. The said loss occurred on the 15th day of March, 2026 about the hour of 02:15 PM.</p>
<div style="background: #f9f9f9; padding: 15px; border: 1px solid #ddd; margin: 20px 0;">
      <p><strong>Cause of Loss:</strong> Accidental Fire (Kitchen Electrical)<br>
      <strong>Insured:</strong> SARAH JANE DOE<br>
      <strong>Property Address:</strong> 123 Maple St, Anytown, USA</p>
<p style="border-top: 1px solid #ccc; padding-top: 10px; font-weight: bold;">
        TOTAL AMOUNT CLAIMED: <span style="font-size: 1.3em;">$ 42,250.00</span>
      </p>
    </div>
<p>The said loss did not originate by any act, design, or procurement on the part of your insured. No articles are mentioned herein but such as were destroyed or damaged at the time of said loss.</p>
  </div>
<div style="margin-top: 40px; display: flex; justify-content: space-between; align-items: flex-end;">
    <div style="width: 45%;">
      <div style="border-top: 1px solid #000; padding-top: 5px; font-size: 0.8em; font-style: italic;">Insured Signature</div>
    </div>
    <div style="text-align: right; width: 45%;">
      <div style="width: 80px; height: 80px; border: 2px solid #000; display: flex; align-items: center; justify-content: center; font-size: 0.6em; font-weight: bold; text-align: center; margin-left: auto;">NOTARY<br>SEAL</div>
    </div>
  </div>
<div style="padding: 20px; background: #fffbe6; border: 1px dashed #999; margin-top: 30px; text-align: center;">
    <div data-verify-line="loss" style="font-family: 'Courier New', monospace; font-size: 0.8em; color: #000; font-weight: bold;"
      title="Demo only: Insurers don't yet offer verification&#10;endpoints, so this is illustrative">
      verify:goliathins.com/v <span verifiable-text="end" data-for="loss">]</span>
    </div>
    <div style="font-size: 0.7em; color: #666; margin-top: 8px;">
      Scan to verify claimed amounts, cause of loss findings, and notary authority.
    </div>
  </div>
</div>

## Data Verified

Claim number, policy number, insured name, property address, date of loss, time of loss, cause of loss description, replacement cost value (RCV), actual cash value (ACV), deductible, net amount claimed, notary commission #, date of notarization.

**Document Types:**
- **Sworn Statement in Proof of Loss:** The primary legal affidavit.
- **Inventory of Loss:** (Linked hash) the multi-page list of items.
- **Adjuster's Damage Estimate:** (Linked hash) provided by the carrier.
- **Certificate of Satisfaction:** Signed after repairs are completed.

## Data Visible After Verification

Shows the issuer domain (`allstate.com`, `geico.com`, `lloyds.com`) and the claim standing.

**Status Indications:**
- **Filed / Received** — The form matches the original submission to the carrier.
- **Approved for Payout** — **ALERT:** The carrier has verified the math and authorized funds.
- **Amended** — **ALERT:** A corrected Proof of Loss has been filed (e.g., more damage found).
- **Under Investigation** — **ALERT:** Claim flagged for potential SIU (Special Investigation Unit) review.

## Second-Party Use

The **Policyholder (Insured)** benefits from verification.

**Mortgage Compliance:** If a home is damaged, the mortgage bank (Lienholder) has a legal interest in the insurance money. The policyholder provides the verified hash of their "Proof of Loss" to the bank. The bank can instantly see **"VERIFIED CLAIM: $42,250"** on their phone, ensuring the funds are used for repairs and protecting the bank's collateral.

**Tax Deduction Proof:** If a loss is not fully covered by insurance (e.g., a high deductible or excluded items), the taxpayer can use the verified "Proof of Loss" to document a "Casualty Loss" deduction on their tax return.

## Third-Party Use

**Insurance Adjusters / SIU Units**
**Fraud Detection:** Cross-referencing "Loss Inventories" with past claims. If a claimant submits a Proof of Loss for a "Rolex Watch," but the verified hash of a claim from 2 years ago shows the *exact same* serial number was already paid for, the system flags the "Double-Dipping" fraud instantly.

**Restoration Contractors**
**Payment Assurance:** Before starting a $40,000 fire clean-up, the contractor scans the verified Proof of Loss. "Verified by Goliath Insurance" ensures the contractor that the claim has been legally filed and the amount is authorized, reducing the risk of a "Mechanic's Lien" dispute.

**Courts and Legal Counsel**
**Evidence Authentication:** In a dispute over "Bad Faith" denial, the court can verify the Proof of Loss hash to see exactly what the insured declared and when the carrier received it.

## Verification Architecture

**The "Paper Padding" Fraud Problem**

- **Inventory Inflation:** Adding 5 non-existent high-end laptops to a fire claim on a PDF inventory list.
- **Cause-of-Loss Tampering:** Changing "Flood" (not covered) to "Pipe Burst" (covered) on the sworn statement.
- **Date Stretching:** Altering the fire date to 12 MAR (insured) when it actually happened on 10 MAR (policy expired).

**Issuer Types** (First Party)

**National Insurance Carriers.**
**Independent Adjusting Firms.**
**State Insurance Commissions.**

**Privacy Salt:** Highly Critical. Private loss details and personal inventories are sensitive. The hash must be salted to prevent "Home Inventory Mapping" by data scrapers or thieves.

## Rationale

Proof of Loss is the "Point of No Return" in a claim. By turning sworn statements into verifiable digital bridges, we protect the insurance pool from the $80 billion annual cost of fraud and ensure that honest policyholders are paid accurately and quickly.

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

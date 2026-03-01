---
title: "Franchise Agreements and Disclosure Documents"
category: "Business & Commerce"
volume: "Small"
retention: "Term plus 7+ years"
slug: "franchise-agreements"
tags: ["franchise-agreement", "fdd", "item-19", "business-opportunity", "corporate-compliance", "ftc-rule", "franchisor-verification"]
furtherDerivations: 1
---

## What is a Franchise Disclosure?

If you want to open a McDonald's or a 7-Eleven, you must receive a **Franchise Disclosure Document (FDD)**. This is a massive 200-page book where the brand must tell you the truth about how much money their stores actually make.

The most important part is **Item 19**, where the company lists verified profits.

Fraud is high-stakes: some "Salesmen" edit the FDD to hide lawsuits or to inflate the profits to trick people into buying a failing franchise. Verified hashes ensure the **financial claims** in your copy match the official version filed with the government.

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 1px solid #ccc; background: #fff; padding: 40px; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
  <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #000; padding-bottom: 10px;">
    <div style="font-weight: bold; font-size: 1.4em; color: #000;"><span verifiable-text="start" data-for="franchise">[</span>7-ELEVEN, INC.</div>
    <div style="font-size: 0.85em; color: #666; margin-top: 5px;">OFFICIAL FRANCHISE DISCLOSURE DOCUMENT (FDD)</div>
  </div>
<h3 style="text-align: center; text-transform: uppercase; margin-bottom: 20px; letter-spacing: 1px;">Disclosure Verification</h3>
<div style="font-size: 0.95em; line-height: 1.6; color: #333; text-align: justify;">
    <p>This document serves as a verified extract of the FDD provided to <strong>John Jacob Doe</strong> for the proposed franchise location at:</p>
<p style="text-align: center; font-weight: bold;">123 Convenience Way, Austin, TX 78701</p>
<div style="background: #f9f9f9; border: 1px solid #eee; padding: 15px; margin: 20px 0;">
      <p><strong>Item 19 (Financial Performance):</strong> 2025 Average Net Sales: $ 1,450,000.00 (Verified by Milliman Audit #992)</p>
      <p><strong>Initial Franchise Fee:</strong> $ 25,000.00<br>
      <strong>Ongoing Royalty:</strong> 5.0% of Gross Sales</p>
    </div>
<p><strong>FDD Fiscal Year:</strong> 2026 (Edition 1.0)<br>
    <strong>Receipt Date:</strong> March 15, 2026</p>
  </div>
<div style="margin-top: 40px; display: flex; justify-content: space-between; align-items: flex-end;">
    <div style="width: 45%;">
      <div style="border-top: 1px solid #000; padding-top: 5px; font-style: italic;">Sarah Miller, VP Development</div>
    </div>
    <div style="text-align: right; width: 45%;">
      <div style="width: 80px; height: 80px; border: 2px solid #000; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.6em; font-weight: bold; text-align: center; margin-left: auto;">CORP<br>SEAL</div>
    </div>
  </div>
<div data-verify-line="franchise" style="border-top: 1px dashed #999; margin-top: 40px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
      title="Demo only: 7-Eleven doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:7-eleven.com/franchise/v <span verifiable-text="end" data-for="franchise">]</span>
    </div>
</div>

## Data Verified

Franchisor legal name, Franchisee candidate name, proposed location/territory, FDD fiscal year/version, Item 19 earnings claims (numerical), initial fees, royalty rates, date of disclosure receipt (starting the 14-day clock), term length, renewal rights.

**Document Types:**
- **Franchise Disclosure Document (FDD):** The 200+ page primary disclosure.
- **Franchise Agreement:** The final signed 10-year contract.
- **Area Development Agreement:** For multi-unit investors.
- **Disclosure Receipt:** Mandatory proof of the 14-day cooling-off period.

## Data Visible After Verification

Shows the issuer domain (`7-eleven.com`, `subway.com`, `mcdonalds.com`) and current agreement status.

**Status Indications:**
- **Disclosed** — FDD has been officially provided to the candidate.
- **Under Cooling-Off** — Mandated 14-day waiting period is active.
- **Fully Executed** — Agreement is signed and binding.
- **Terminated** — Franchise rights revoked (e.g., for non-payment or brand standards).

## Second-Party Use

The **Franchisee (Investor)** benefits from verification.

**Due Diligence Defense:** Proving to their lawyers and family that the "Item 19" earnings claims aren't just verbal promises from a salesman, but are verified, audited facts from the franchisor's own domain. This stops the most common form of franchise fraud: "Earnings Misrepresentation."

**SBA Loan Approval:** Proving to a lender that the "Franchise Package" is authentic and current. Lenders often reject outdated FDDs; a verified hash from the franchisor removes this delay.

## Third-Party Use

**The Federal Trade Commission (FTC)**
**Enforcement:** Regulators can verify that the FDD version being handed to candidates matches the latest version filed with the government. Live Verify prevents "Selective Disclosure" where a franchisor hides a negative lawsuit from a prospect.

**Lenders / Banks**
**Risk Management:** Verifying the "Termination Provisions" and "Royalties" before lending $500,000 for a store build-out.

**Commercial Landlords**
**Tenant Vetting:** Ensuring that a new "Starbucks" or "7-Eleven" tenant actually has a verified franchise agreement in place before signing a 10-year commercial lease.

## Verification Architecture

**The "Item 19" Fraud Problem**

- **Earnings Inflation:** Editing the PDF to change a $100k average profit to $500k to trick a buyer into an expensive franchise.
- **Litigation Hiding:** Removing the pages from "Item 3" that list the 50 pending lawsuits against the franchisor.
- **Backdating Receipts:** Fabricating a disclosure receipt from 14 days ago to bypass the mandatory federal waiting period and force a fast closing.

**Issuer Types** (First Party)

**Franchisors:** (National brands).
**Franchise Law Firms:** (Hosting verified hashes for their clients).
**State Securities Regulators:** (In "Registration States" like NY or CA).

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


## Competition vs. State Registry Search

| Feature | Live Verify | State Registry (Online) | Scanned PDF |
| :--- | :--- | :--- | :--- |
| **Trust Anchor** | **Domain-Bound.** Bound to the Brand. | **Gov-Bound.** | **Zero.** Easily forged. |
| **Integrity** | **Binds "Item 19".** Protects the numbers. | **Data-Only.** Doesn't verify the paper doc. | **Vulnerable.** |
| **User Access** | **Instant.** Scan the paper at the meeting. | **Difficult.** Requires searching by state and paying fees. | **Instant.** |
| **Completeness** | **High.** Verifies the *specific* candidate's copy. | **Low.** Only shows the generic filing. | **Vulnerable.** |

**Why Live Verify wins here:** The "Sales Meeting" reality. Prospects decide to buy a franchise in a meeting with a development officer. They aren't going to search 50 different state databases. Live Verify turns the **Physical FDD** into a live digital checkpoint, ensuring the multi-million dollar investment decision is based on verified facts.

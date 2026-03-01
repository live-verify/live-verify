---
title: "Fidelity Bonds and Employee Dishonesty"
category: "Bonds & Sureties"
volume: "Small"
retention: "Policy term + 10 years"
slug: "fidelity-bonds"
tags: ["fidelity-bond", "employee-dishonesty", "erisa-bond", "crime-insurance", "commercial-surety", "fiduciary-responsibility", "theft-protection"]
furtherDerivations: 1
---

## What is a Fidelity Bond?

A **Fidelity Bond** is a type of insurance that protects a business from its own employees. If an employee steals money, embezzles funds, or commits forgery, the bond pays the business back.

By federal law (**ERISA**), any company with a 401(k) plan **must** have a fidelity bond to protect the employees' retirement savings.

Companies that provide in-home services (like cleaning or IT repair) use these bonds to prove to customers: "Our workers are verified bonded." Fraud happens when a firm shows a fake $1M bond paper but only actually has a $10k bond. Verified hashes prove the **true protection limit**.

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 2px solid #1a237e; background: #fff; padding: 0; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <div style="background: #1a237e; color: #fff; padding: 20px; display: flex; justify-content: space-between; align-items: center;">
    <div>
      <div style="font-weight: bold; font-size: 1.2em;"><span verifiable-text="start" data-for="fidelity">[</span>TRAVELERS CASUALTY & SURETY</div>
      <div style="font-size: 0.8em; opacity: 0.8;">Commercial Crime & Fidelity Bond</div>
    </div>
    <div style="text-align: right;">
      <div style="font-size: 0.8em;">Bond #: FB-99228877-26</div>
    </div>
  </div>
<div style="padding: 30px;">
    <h2 style="text-align: center; color: #1a237e; font-size: 1.4em; margin-bottom: 20px; text-transform: uppercase;">Certificate of Bonding</h2>
<div style="font-size: 0.9em; line-height: 1.6; color: #333;">
      <p>This certifies that the following entity is bonded against acts of Employee Dishonesty:</p>
<p style="background: #f5f5f5; padding: 10px; border-left: 4px solid #1a237e;">
        <strong>Principal:</strong> Initech Financial Services, LLC<br>
        <strong>Bond Amount:</strong> $ 1,000,000.00<br>
        <strong>Covered Class:</strong> All Employees (Blanket Bond)
      </p>
<p><strong>ERISA Compliance:</strong> YES (Meets Section 412 requirements)<br>
      <strong>Effective Date:</strong> March 15, 2026 to March 15, 2027</p>
    </div>
<div style="margin-top: 30px; border: 1px solid #ccc; padding: 10px; font-size: 0.8em; color: #555; background: #fafafa; font-style: italic; text-align: center;">
      This bond protects the assets of the company and its employee benefit plans from theft, forgery, or embezzlement.
    </div>
<div data-verify-line="fidelity" style="border-top: 1px dashed #999; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
      title="Demo only: Travelers doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:travelers.com/surety/v <span verifiable-text="end" data-for="fidelity">]</span>
    </div>
  </div>
</div>

## Data Verified

Principal name (Company), bond amount, coverage type (Blanket/Position), ERISA compliance flag, effective/expiration dates, surety company name, specific exclusions (e.g., "Owners excluded"), date of issuance.

**Document Types:**
- **Blanket Fidelity Bond:** Covering all employees.
- **ERISA Fidelity Bond:** Specifically for 401(k)/Pension plans.
- **Business Service Bond:** For companies whose staff enter client homes.
- **Janitorial Bond:** Specific to the cleaning industry.

## Data Visible After Verification

Shows the issuer domain (`travelers.com`, `libertymutual.com`) and current bond status.

**Status Indications:**
- **In Force** — Premium paid; bond active and legally binding.
- **Cancelled** — Bond terminated (often due to internal theft discovery).
- **Limit Depleted** — **ALERT:** Recent claims have reduced the available protection.
- **Expired** — Term ended; no coverage for current acts.

## Second-Party Use

The **Business Owner** benefits from verification.

**Client Trust:** Proving to a major client (e.g., a bank or hospital) that every employee entering their facility is "Verified Bonded" for $1M. This is a competitive requirement for high-security service contracts.

**ERISA Compliance:** Proving to the Department of Labor (DOL) that the company's 401(k) plan is properly bonded, avoiding heavy fines during a benefits audit.

**Financing:** Proving to a lender that the company's cash assets are protected from internal embezzlement, which de-risks the loan.

## Third-Party Use

**Enterprise Procurement Teams**
**Vendor Vetting:** Ensuring that the outsourced IT or Janitorial firm actually has the "Blanket Bond" they claim in their bid. Verification prevents the common fraud where a firm shows a $1M bond paper but actually only paid for a $10k bond.

**Pension Plan Auditors**
**Fiduciary Audit:** Instantly verifying that the "ERISA Bond" matches the plan's required 10% funding level, ensuring the participants' retirement funds are legally protected.

**Homeowners / Consumers**
**In-Home Service Safety:** Verifying that the contractor (e.g., HVAC or house-cleaner) has a verified bond before giving them a key to the house.

## Verification Architecture

**The "Employee Theft" Fraud Problem**

- **Ghost Bonds:** Creating a fake "Certificate of Bonding" to win a high-security contract, while actually having no coverage.
- **Limit Inflation:** Editing a $25,000 bond to read $250,000 to meet a client's RFP requirements.
- **Status Concealment:** Hiding that a bond was cancelled by the surety after a series of small "inventory shrinkage" claims.

**Issuer Types** (First Party)

**Commercial Surety Carriers:** (Travelers, Liberty Mutual, CNA).
**Specialist MGAs.**
**Broker Platforms:** (e.g., BondExchange, Propeller).

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


## Competition vs. Broker Letters

| Feature | Live Verify | Manual Broker Letter | Scanned PDF |
| :--- | :--- | :--- | :--- |
| **Trust Anchor** | **Domain-Bound.** Bound to the Carrier. | **Human.** Prone to social engineering or typos. | **Zero.** Easily forged. |
| **Speed** | **Instant.** 5-second scan. | **Slow.** Takes 2-3 business days. | **Instant.** |
| **Availability** | **24/7.** Works during after-hours bidding. | **Business Hours Only.** | **Universal.** |
| **Integrity** | **Cryptographic.** Binds the $ limit. | **Vague.** "They are bonded." | **Vulnerable.** |

**Why Live Verify wins here:** The "RFP Deadline" reality. Bids for big contracts are often submitted at midnight. A procurement officer needs to verify 50 vendors at once. Live Verify turns the **Physical Bond Certificate** into a live digital anchor, ensuring that only legitimately protected firms are allowed into high-security supply chains.

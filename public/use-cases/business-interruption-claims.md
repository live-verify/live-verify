---
title: "Business Interruption Insurance Claims"
category: "Commercial Lines Insurance"
volume: "Small"
retention: "Claim term + 10 years"
slug: "business-interruption-claims"
tags: ["business-interruption", "commercial-insurance", "claims", "lost-revenue", "forensic-accounting", "disaster-recovery"]
furtherDerivations: 1
---

## What is a Business Interruption Claim?

If a restaurant burns down or a factory is hit by a hurricane, the owner doesn't just lose the building; they lose the **income** they would have made while closed.

**Business Interruption (BI)** insurance pays for that lost profit. Because calculating "what could have been" is hard, specialized **Forensic Accountants** are hired to audit the company's tax returns and sales data.

The result is an **Adjustment Summary**. Because these documents often trigger multimillion-dollar insurance payouts, they are high-value targets for "PDF alteration" by unscrupulous owners or brokers.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <span verifiable-text="start" data-for="bi-claim">[</span>
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;">LIBERTY MUTUAL
Commercial Property Claims
═══════════════════════════════════════════════════════════════════

         BUSINESS INTERRUPTION ADJUSTMENT SUMMARY

Claim #: BI-99228877-26

Insured:       The Grande Cafe & Bistro, LLC
Location:      123 Main St, New Orleans, LA
Incident Date: August 29, 2025 (Hurricane Damage)

CALCULATION DETAILS
───────────────────────────────────────────────────────────────────
Calculation Element                                  Adjusted Amount
───────────────────────────────────────────────────────────────────
Lost Net Income (Period: 60 Days)                       $ 142,500.00
Continuing Normal Expenses                               $ 45,000.00
Extra Expense (Equipment Rental)                         $ 12,000.00
───────────────────────────────────────────────────────────────────
TOTAL ADJUSTED CLAIM:                                   $ 199,500.00

Forensic Accountant: Baker Tilly US, LLP
Status: FINAL ADJUDICATION

</pre>
<span data-verify-line="bi-claim">verify:libertymutual.com/claims/v</span> <span verifiable-text="end" data-for="bi-claim">]</span>
</div>

## Data Verified

Insured entity name, incident date, period of restoration (days), adjusted lost net income, adjusted continuing expenses, extra expenses authorized, total claim payout, forensic accounting firm name, Claim ID.

**Document Types:**
- **BI Adjustment Summary:** The final bill/payout calculation.
- **Forensic Accounting Report:** Detailed analysis of tax returns and receipts.
- **Proof of Loss:** Final signed release for payment.
- **Extra Expense Authorization:** Interim approval for urgent costs.

## Data Visible After Verification

Shows the issuer domain (the Insurance Carrier) and the claim status.

**Status Indications:**
- **Approved/Final** — Calculation is verified and payment authorized.
- **Supplemental** — This summary has been updated by a later adjustment.
- **In-Litigation** — Claim amount is being formally disputed.
- **Paid** — Funds have been transmitted to the insured.

## Second-Party Use

The **Business Owner** (second party) receives the adjustment summary from the insurance carrier (first party), **keeps it**, and may later hand it to third parties for various reasons, or never do so.

**Personal Record:** They have their own verified copy of the claim settlement. Most of the time, the document sits in their business records—the verification value is latent, there *if needed*.

**Peace of Mind:** They can confirm at any time that the settlement amount matches what the carrier's system recorded and hasn't been altered.

**Future Optionality:** If questions arise—whether from lenders, tax authorities, or potential buyers—they have cryptographic proof of the settlement ready without needing to contact the insurance company.

## Third-Party Use

The business owner (second party) may hand the verified document to various third parties:

**Lenders (Banks)**
**Cash Flow Analysis:** If a business is applying for a line of credit post-disaster, the bank needs to see verified proof of the insurance recovery amount to model the company's future liquidity.

**Tax Authorities (IRS)**
**Taxable Income Audit:** Business interruption payouts for "Lost Profits" are generally taxable. Verification ensures the business reports the same amount to the IRS that they received from the insurer.

**M&A Buyers**
**Due Diligence:** A buyer of a business that recently suffered a disaster needs to verify the "Insurance Recovery" claims to ensure there are no hidden liabilities or uncollected claims.

## Verification Architecture

**The "Disaster Profit" Fraud Problem**

- **Revenue Inflation:** Editing old tax returns or POS reports to make the "Lost Revenue" look higher than it was.
- **Fabricated Expenses:** Creating fake invoices for "Extra Equipment Rental" to get more cash from the insurer.
- **Report Forgery:** Shady adjusters/accountants creating fake "Adjustment Summaries" to trick lenders into thinking a massive insurance payout is coming.

**Issuer Types (First Party)**

- Commercial Insurance Carriers (Liberty Mutual, Chubb, AIG, Travelers)
- Forensic Accounting Firms (Baker Tilly, Meaden & Moore)
- Independent Adjusting Firms

**Privacy Salt:** Not required. Business interruption adjustment summaries contain many unpredictable variables: unique claim IDs, business names, specific incident dates and locations, exact calculated amounts (lost income, continuing expenses, extra expenses), forensic accountant names, and unique adjustment periods. The combination of these claim-specific details creates sufficient entropy to prevent hash enumeration attacks.

## Jurisdictional Witnessing

A jurisdiction may require insurance carriers to retain a **witnessing firm** for regulatory compliance. The witnessing firm:

- Receives all hashes from the carrier, and any subsequent changes to the claim as they happen—which may manifest as a new hash, a status change (supplemental, in-litigation, paid), or even a 404 (record deleted)
- Receives structured content/metadata (claim amounts, calculation breakdowns, incident dates, claim numbers)
- Does **NOT** receive plaintext (business financial details, forensic accountant working papers)
- Provides an immutable, timestamped audit trail—available to the jurisdiction on demand, to business owners/third parties during disputes, or as expert witness testimony in legal proceedings

This provides:
- **Non-repudiation:** Carrier cannot deny issuing the adjustment
- **Timestamp proof:** Claim settlement hash existed at a specific time
- **Regulatory audit:** State insurance departments can inspect the witness ledger for claims handling practices
- **Resilience:** Verification works even if carrier's systems go down

**Public Blockchain (Non-Party)**

Witnessing firms may periodically commit rollups to an inexpensive public blockchain, providing an ultimate immutability guarantee. The blockchain is a "non-party"—infrastructure, not a participant in the transaction. This creates multiple verification paths:

1. **Carrier domain** — Direct check against the issuer
2. **Witnessing firm** — Independent confirmation with timestamp
3. **Public blockchain** — Decentralized trust anchor via rollup inclusion

## Competition vs. Forensic Audits

| Feature | Live Verify | Manual Forensic Audit | Scanned PDF |
| :--- | :--- | :--- | :--- |
| **Trust Anchor** | **Domain-Bound.** Bound to the Insurer. | **Credential-Bound.** Trust the CPA. | **Zero.** Easily forged. |
| **Speed** | **Instant.** Scan the summary. | **Slow.** Takes weeks/months to audit books. | **Instant.** |
| **Cost** | **Low.** Standard web infra. | **High.** CPA fees can be $500+/hour. | **None.** |
| **Integrity** | **Binds Result.** Proves the final number. | **Binds Process.** Verifies the data. | **Vulnerable.** |

**Why Live Verify wins here:** The "Post-Audit Gap." A forensic accountant spends 3 months auditing a business to arrive at a $199,500 figure. Live Verify **protects that final result**. It ensures that the massive effort put into the audit isn't wasted by a fraudster changing a single digit in the final PDF before sending it to a bank or the government.

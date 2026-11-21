---
title: "Business Interruption Insurance Claims"
category: "Commercial Lines Insurance"
volume: "Small"
retention: "Claim term + 10 years"
slug: "business-interruption-claims"
verificationMode: "clip"
tags: ["business-interruption", "commercial-insurance", "claims", "lost-revenue", "forensic-accounting", "disaster-recovery"]
furtherDerivations: 1
---

## What is a Business Interruption Claim?

If a restaurant burns down or a factory is hit by a hurricane, the owner doesn't just lose the building; they lose the income they would have made while closed.

**Business Interruption (BI)** insurance pays for that lost profit. Because calculating "what could have been" is hard, specialized Forensic Accountants are hired to audit the company's tax returns and sales data.

The result is an Adjustment Summary. Because these documents often trigger multimillion-dollar insurance payouts, they are high-value targets for "PDF alteration" by unscrupulous owners or brokers.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <span verifiable-text="start" data-for="bi-claim"></span>
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
<span data-verify-line="bi-claim">verify:libertymutual.com/claims/v</span> <span verifiable-text="end" data-for="bi-claim"></span>
</div>

## The Problem: Disaster Profit Fraud

- **Revenue Inflation:** Editing old tax returns or POS reports to make the "Lost Revenue" look higher than it was.
- **Fabricated Expenses:** Creating fake invoices for "Extra Equipment Rental" to get more cash from the insurer.
- **Report Forgery:** Shady adjusters/accountants creating fake "Adjustment Summaries" to trick lenders into thinking a massive insurance payout is coming.

## What Is Checked

Insured entity name, incident date, period of restoration (days), adjusted lost net income, adjusted continuing expenses, extra expenses authorized, total claim payout, forensic accounting firm name, Claim ID.

**Document Types:**
- **BI Adjustment Summary:** The final bill/payout calculation.
- **Forensic Accounting Report:** Detailed analysis of tax returns and receipts.
- **Proof of Loss:** Final signed release for payment.
- **Extra Expense Authorization:** Interim approval for urgent costs.

## What the Checker Sees

Shows the issuer domain (the Insurance Carrier) and the claim status.

**Status Indications:**
- **Approved/Final** — Calculation is verified and payment authorized.
- **Supplemental** — This summary has been updated by a later adjustment.
- **In-Litigation** — Claim amount is being formally disputed.
- **Paid** — Funds have been transmitted to the insured.

## Who Holds It

The Business Owner (second party) receives the adjustment summary from the insurance carrier (first party), keeps it, and may later hand it to third parties for various reasons, or never do so.

**Personal Record:** They have their own verified copy of the claim settlement. Most of the time, the document sits in their business records—the verification value is latent, there *if needed*.

**Peace of Mind:** They can confirm at any time that the settlement amount matches what the carrier's system recorded and hasn't been altered.

**Future Optionality:** If questions arise—whether from lenders, tax authorities, or potential buyers—they have cryptographic proof of the settlement ready without needing to contact the insurance company.

## Who Checks It

The business owner (second party) may hand the verified document to various third parties:

**Lenders (Banks)**
**Cash Flow Analysis:** If a business is applying for a line of credit post-disaster, the bank needs to see verified proof of the insurance recovery amount to model the company's future liquidity.

**Tax Authorities (IRS)**
**Taxable Income Audit:** Business interruption payouts for "Lost Profits" are generally taxable. Verification ensures the business reports the same amount to the IRS that they received from the insurer.

**M&A Buyers**
**Due Diligence:** A buyer of a business that recently suffered a disaster needs to verify the "Insurance Recovery" claims to ensure there are no hidden liabilities or uncollected claims.

## Who Issues It

**Issuer Types (First Party)**

- Commercial Insurance Carriers (Liberty Mutual, Chubb, AIG, Travelers)
- Forensic Accounting Firms (Baker Tilly, Meaden & Moore)
- Independent Adjusting Firms

**Privacy Salt:** Not required. Business interruption adjustment summaries contain many unpredictable variables: unique claim IDs, business names, specific incident dates and locations, exact calculated amounts (lost income, continuing expenses, extra expenses), forensic accountant names, and unique adjustment periods. The combination of these claim-specific details creates sufficient entropy to prevent hash enumeration attacks.

## Authority Chain

**Pattern:** Regulated

Zurich processes business interruption insurance claims and loss calculations.

```
✓ claims.zurich.co.uk/bi/verify — Processes business interruption insurance claims
  ✓ fca.org.uk/register — Regulates UK general insurance firms
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Where Each Fits: Live Verify and Forensic Audits

A forensic accountant establishes a business interruption loss by examining the policyholder's books, and that work is how the claim figure is reached. Live Verify does not do that work; it lets the insurer's settlement summary be checked by those who later rely on it. The two answer different questions and work side by side.

| | Forensic audit | Live Verify on the settlement summary | Unverified scanned PDF |
| :--- | :--- | :--- | :--- |
| **Who can check** | The insurer, policyholder and their accountants, who commission or review the work. | Anyone handed the summary: a lender, a landlord, a government agency, an auditor. | Nobody; it can only be taken on trust. |
| **What the checker gets** | An expert, evidence-based view of what the loss actually was. | Confirmation that the insurer issued this exact summary, with this figure, as at its date. Nothing about whether the figure is right. | A document whose numbers may have been edited. |
| **What the holder shares** | Their financial records, with the accountants doing the review. | Only the summary they chose to hand over. | Only the document they chose to hand over. |
| **Reach** | Any business whose records can be examined. | Global in principle: any insurer, in any country, that publishes hashes on its own domain. | Universal, but untrusted. |
| **Speed and cost** | Weeks or months, at professional fees that scale with the complexity of the claim. | A few seconds per check: one web lookup, with no fee to the standard. | Free and immediate. |
| **What it needs** | Qualified accountants and access to the books. | The insurer to publish hashes, and Live Verify-aware software on the checker's device. No insurer does this yet. | Nothing. |
| **Best suited to** | Establishing the loss in the first place. | Third parties confirming the agreed outcome later. | Nothing where money depends on the figure. |

**Where each fits:** a forensic audit is how the loss figure is established, and there is no shortcut for that work. Live Verify does not examine the books. It lets a bank or agency that later receives the settlement summary confirm that the insurer issued it with that figure, so the result of the audit reaches third parties unaltered.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).

---
title: "Buy Now Pay Later (BNPL) Purchase Agreements"
category: "Investment & Fintech"
volume: "Medium-Large"
retention: "Purchase term + 3-7 years"
slug: "bnpl-purchase-agreements"
verificationMode: "clip"
tags: ["bnpl", "installment-loan", "klarna", "affirm", "finance", "ecommerce", "consumer-credit"]
furtherDerivations: 1
---

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <span verifiable-text="start" data-for="bnpl"></span>
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;">AFFIRM
Loan Agreement & Truth In Lending Disclosure
═══════════════════════════════════════════════════════════════════

Loan ID:   AF-99887766                         Date: March 15, 2026
Merchant:  Peloton Interactive

Borrower:  JOHN SMITH

LOAN TERMS
───────────────────────────────────────────────────────────────────
Amount Financed:                                        $ 1,445.00
APR:                                                         0.00%
Total of Payments:                                      $ 1,445.00
───────────────────────────────────────────────────────────────────
Monthly Payment (12x):                                    $ 120.42

By signing below, you agree to the terms of this installment loan.

</pre>
<span data-verify-line="bnpl">verify:affirm.com/loans/v</span> <span verifiable-text="end" data-for="bnpl"></span>
</div>

## The Problem: Ghost Debt Fraud

- **Undisclosed Liabilities:** Borrowers hiding multiple BNPL loans from a mortgage lender by editing the PDF "Balance" or "Monthly Payment."
- **Terms Manipulation:** Changing a "20% APR" agreement to read "0% APR" to qualify for a different financial product.
- **Identity Theft:** Fraudsters taking out BNPL loans in a victim's name; verification allows the victim to see the "Official" data being used for the loan.

## What Is Checked

Borrower name, merchant name, loan ID, total amount financed, Annual Percentage Rate (APR), payment schedule (e.g., 12 months), monthly payment amount, date of agreement.

**Document Types:**
- **Retail Installment Contract:** The legal loan document.
- **Truth in Lending Act (TILA) Disclosure:** Federal mandatory disclosure.
- **Payment Receipt:** Proving a specific installment was paid.

## What the Checker Sees

Shows the issuer domain (`affirm.com`, `klarna.com`) and current loan status.

**Status Indications:**
- **Active** — Loan is in good standing; payments current.
- **Paid in Full** — Debt satisfied.
- **In-Arrears** — Payment overdue (critical for credit checking).
- **Charged-Off** — Uncollectible debt.

## Who Holds It

The Borrower (second party) receives the loan agreement from the BNPL provider (first party), keeps it, and may later hand it to third parties for various reasons, or never do so.

**Personal Record:** They have their own verified copy of the loan terms. Most of the time, the document sits in their email or financial records—the verification value is latent, there *if needed*.

**Peace of Mind:** They can confirm at any time that the agreement matches what the BNPL provider's system recorded and hasn't been altered.

**Future Optionality:** If a dispute arises—whether with the merchant about the purchase or with a future lender about debt obligations—they have cryptographic proof ready without needing to contact Affirm or Klarna.

## Who Checks It

The borrower (second party) may hand the verified document to various third parties:

**Mortgage Lenders / Banks**
**Debt-to-Income (DTI) Calculation:** Many BNPL loans do not appear on traditional credit reports. Lenders can scan the applicant's verified BNPL agreements to get a true picture of their monthly debt obligations.

**Credit Bureaus**
**Data Accuracy:** Verifying that the data being reported by the BNPL provider matches the original agreement signed by the consumer.

**Legal Aid / Consumer Advocates**
**Predatory Lending Checks:** Instantly verifying the "Truth in Lending" disclosures to ensure the actual APR matches the marketing claims.

## Who Issues It

**Issuer Types (First Party)**

- BNPL Providers (Affirm, Klarna, PayPal Credit)
- Fintech Banks (Cross River Bank, Celtic Bank who originate the loans)

**Privacy Salt:** Not required. BNPL agreements contain many unpredictable variables that combine to create high entropy: unique loan IDs, borrower names, specific merchant names, exact financing amounts (down to the cent), precise dates, and unique APR calculations. The combination of these elements makes it computationally infeasible to reverse-engineer the hash through enumeration, even if some individual fields (like common APR tiers) are predictable.

## Authority Chain

**Pattern:** Regulated

Klarna issues buy-now-pay-later purchase agreements for UK consumers and merchants.

```
✓ agreement.klarna.com/verify — Issues buy-now-pay-later purchase agreements
  ✓ fca.org.uk/register — Regulates UK consumer credit firms
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Rationale

## Where Each Fits: Live Verify and Credit Bureau Reports

Credit bureaus such as Experian and TransUnion compile borrowers' credit histories from lenders' reports, and lenders base most decisions on them. Coverage depends on where you are: most developed markets have one or more bureaus, many countries have thin or no coverage, and whether buy-now-pay-later loans are reported varies by provider and country. A bureau report and Live Verify answer different questions and work side by side: the report is the broad view, while Live Verify lets a consumer show one provider's statement that the provider stands behind.

| | Credit bureau report | Live Verify on the BNPL agreement or statement | Paper disclosure |
| :--- | :--- | :--- | :--- |
| **Who can check** | Lenders and others with a permitted purpose, and the consumer. | Anyone the consumer shows it to: a mortgage lender, a landlord, a debt adviser. | Nobody; it can only be taken on trust. |
| **What the checker gets** | The broadest single view of the borrower, but only of what lenders report, and with a lag. | Confirmation that the provider issued this exact agreement or statement, as at its date. | A document that may have been edited. |
| **What the consumer shares** | Their whole file, with consent. | Only the documents they chose to show. | The document. |
| **Reach** | Lenders that report to that bureau, in that country. | Global in principle: any provider that publishes hashes on its own domain. | Universal, but untrusted. |
| **Speed and cost** | Quick for subscribers; lenders pay per report. | A few seconds per check: one web lookup, with no fee to the standard. | Free and immediate. |
| **What it needs** | Lenders reporting, and a permitted purpose. | The provider to publish hashes, and Live Verify-aware software on the checker's device. No BNPL provider does this yet. | Nothing. |
| **Best suited to** | Most lending decisions. | Showing a loan, or a clean repayment record, that the bureau file does not yet reflect. | Nothing where the amount matters. |

**Where each fits:** a credit bureau report is still the broadest single view of a borrower and the basis for most lending decisions. Some instalment loans are not reported, or appear only after a delay. Live Verify lets a consumer show a lender a statement that the provider stands behind, covering what the bureau file has not yet picked up, and equally lets them evidence a clean repayment record, wherever the lender's software honours it.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).

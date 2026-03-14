---
title: "Sales Receipts (Retail, Hospitality, Food & Beverage)"
category: "Business & Commerce"
volume: "Very Large"
retention: "Transaction + 7 years (tax/audit)"
slug: "sales-receipts"
verificationMode: "clip+camera"
tags: ["receipt", "retail", "hospitality", "expense", "duplicate-claim", "expense-fraud", "vat", "sales-tax", "point-of-sale"]
furtherDerivations: 1
---

## What are Sales Receipts?

Every retail, hospitality, and food & beverage transaction produces a receipt. These are the most common verifiable documents in existence — billions printed daily. They are also the most commonly forged documents in expense fraud.

Expense fraud costs UK businesses [£1.3 billion annually](https://www.expensein.com/blog/expense-fraud/). Common fraud types include duplicate claims (submitting the same receipt twice), receipt tampering (inflating amounts in a PDF editor), complete forgery (generating fake receipts from templates), and tax manipulation (altering VAT figures). Verified hashes bind the **receipt number, line items, amounts, and tax** to the merchant's domain — any alteration breaks the hash.

<div style="max-width: 550px; margin: 24px auto; font-family: 'Courier New', monospace; background: #f9f9f9; padding: 15px; border: 1px solid #999; font-size: 1em; color: #000; line-height: 1.6;">
Receipt: 00284719<br>
Date: 18/01/2025 09:42<br>
Flat White (Large)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;£3.65<br>
Cappuccino (Regular)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;£3.25<br>
Chocolate Twist&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;£1.55<br>
TOTAL:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;£8.45<br>
VAT @ 20%: £1.41<br>
vfy:r.costa.co.uk
</div>

## Data Verified

Receipt number, merchant name, location, date/time, itemized purchases with individual prices, subtotal, tax (VAT/sales tax rate and amount), total, payment method indicator, transaction reference.

**Document Types:**
- **Till receipt:** The primary point-of-sale printout (thermal paper or digital).
- **Hotel folio:** Itemized hotel bill covering room, F&B, and incidentals.
- **Restaurant bill:** Itemized food and beverage with service charge.
- **Online order confirmation:** E-commerce purchase receipt (digital-only).

## Data Visible After Verification

Shows the issuer domain (e.g., `r.costa.co.uk`, `receipts.hilton.com`) and the transaction standing.

**Status Indications:**
- **Verified** — Receipt matches the merchant's transaction record.
- **Refunded** — **ALERT:** Transaction was refunded; expense claim is now void.
- **Voided** — **ALERT:** Transaction was voided at point of sale; receipt is invalid.
- **Duplicate** — **ALERT:** This receipt hash has already been submitted for reimbursement (if the expense platform checks).

## Second-Party Use

The **employee / cardholder** benefits from verification.

**Expense submission:** An employee photographs a lunch receipt. The `verify:` line lets the expense system confirm instantly that the receipt is genuine, the amount hasn't been altered, and it hasn't been submitted before. No more "please provide the original receipt" delays.

**Tax records:** Self-employed individuals keep verified receipts for tax deductions. HMRC or the IRS can verify any receipt against the merchant's endpoint during an audit.

## Third-Party Use

**Expense management platforms (SAP Concur, Expensify, Dext)**
Automated receipt ingestion can verify each receipt hash at submission time. Duplicate hashes are caught immediately — the same receipt can't be claimed by two employees or submitted twice by the same person.

**Corporate finance / audit**
Internal audit can spot-check any expense receipt by re-verifying its hash. A verified receipt that now returns "Refunded" flags a fraudulent expense claim.

**Insurance claims**
Receipts submitted as proof of purchase for insurance claims can be verified against the retailer's records. Inflated or fabricated receipts are caught before payout.

## Verification Architecture

**The "Duplicate Receipt" Fraud Problem**

- **Duplicate claims:** The same receipt submitted twice (different expense reports, different months). Hash uniqueness catches this — the expense system has seen this hash before.
- **Amount inflation:** Changing £8.45 to £84.50 in a PDF editor. The hash changes; verification fails.
- **Complete forgery:** Generating a receipt from a template. The hash won't exist at the merchant's endpoint (404).
- **Receipt sharing:** Employee A gives their receipt to Employee B to claim. The hash has already been verified against Employee A's submission.

**Issuer Types** (First Party)

**Point-of-sale systems (Square, Clover, Toast, Lightspeed).**
**Hospitality PMS (Opera, Mews, Cloudbeds).**
**E-commerce platforms (Shopify, WooCommerce).**

**Privacy Salt:** Low sensitivity. Receipts are business transactions with no privacy expectation. The merchant name, items, and amounts are visible on the printed receipt.

## Authority Chain

**Pattern:** VAT-registered merchant → HMRC → gov.uk

For expense fraud prevention, the strongest chain traces back through the tax authority. HMRC's VAT register confirms the merchant is legitimately VAT-registered — so a receipt claiming VAT can be verified not just for content integrity, but for the merchant's right to charge VAT at all.

```
✓ r.the-red-lion.co.uk — The Red Lion (VAT-registered merchant)
  ✓ hmrc.gov.uk/vat — Confirms VAT registration
    ✓ gov.uk — Root authority
```

**Self-certified** receipts also work for well-known brands where the domain itself is sufficient proof of identity:

```
✓ r.costa.co.uk — Costa Coffee receipt verification
```

Costa could aggregate all franchisees under one domain (`rcpts.costa.co.uk`) or give each franchisee a unique `vfy:` endpoint. They could also use an intermediate corporate endorsement domain:

```
✓ rcpts.costa-franchise-0412.co.uk — Franchisee receipt verification
  ✓ rcpts.costa.co.uk/franchisees — Costa corporate endorses franchisee
```

## Rationale

Receipts are the lowest-value, highest-volume verifiable documents. The cost per verification is negligible (static hash lookup), but the aggregate fraud prevention across millions of expense claims is substantial. POS system vendors (Square, Clover, Toast) can add `verify:` lines to receipts with minimal engineering effort — it's a hash table lookup against their existing transaction database.

## Further Reading

[Deep dive: Sales Receipts](https://github.com/live-verify/live-verify/tree/main/deep-dives/Sales_Receipts.md)

## Jurisdictional Equivalents

| | UK | US | EU |
|---|---|---|---|
| **Tax authority** | HMRC | IRS | Member state tax authorities |
| **VAT/Sales tax** | 20% standard | State-dependent (0-10%) | 15-27% depending on member state |
| **Retention** | 6 years (HMRC) | 7 years (IRS) | 10 years (some member states) |
| **Key difference** | VAT is itemized on every receipt; MTD requires digital records | No federal requirement for receipt format; state sales tax varies | EU-wide e-invoicing directive (ViDA) will standardize from 2028 |

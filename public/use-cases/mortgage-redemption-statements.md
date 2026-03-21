---
title: "Mortgage Redemption Statements"
category: "Real Estate & Property"
volume: "Large"
retention: "Short-lived (7–28 days typical validity)"
slug: "mortgage-redemption-statements"
verificationMode: "clip"
tags: ["mortgage-redemption", "conveyancing", "property-sale", "outstanding-balance", "completion-statement", "solicitor", "redemption-figure", "daily-interest"]
furtherDerivations: 1
---

## The Problem

When a homeowner sells a property with an outstanding mortgage, the seller's solicitor needs to know the exact amount required to discharge the loan on the day of completion. Lenders issue a "redemption statement" — a time-limited figure that includes the outstanding principal, accrued interest, and any early repayment charges. The figure changes daily as interest accrues.

Currently, solicitors request redemption figures by post or through lender portals, receiving a PDF or letter that takes days to arrive and is unverifiable once forwarded. The figure is only valid for a short window (typically 7 to 28 days). If completion is delayed, a fresh figure must be requested. If the figure is stale or has been altered, the solicitor may remit the wrong amount, leaving a shortfall that blocks completion or creates a lingering debt against the property.

The redemption figure is not a single static number — it is a time-bounded calculation that depends on the completion date, daily interest accrual, any applicable fees, and the method and timing of payment. The verified statement pins these variables to a specific date and validity window. The operational question is more precisely: "what will discharge this mortgage if paid in the permitted way by this deadline?" An incorrect or fabricated redemption figure can derail a transaction chain involving multiple buyers and sellers.

This page covers the mid-term "here is what you owe as of today" statement. For the post-payoff confirmation that the mortgage is fully discharged and the lien released, see [Mortgage Satisfaction and Lien Release](view.html?doc=mortgage-satisfaction-lien-release).

## Mortgage Redemption Statement

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="redeem-stmt"></span>MORTGAGE REDEMPTION STATEMENT
Lender:         Northbridge Building Society
Account:        NBS-882199
Property:       14 Cedar Grove, York
Outstanding:    GBP 142,318.47
Daily Interest: GBP 19.22
Valid Until:     28 Mar 2026 (7-day redemption figure)
Early Repayment Charge: NONE
As At:          21 Mar 2026
<span data-verify-line="redeem-stmt">verify:northbridgebs.co.uk/redemptions/v</span> <span verifiable-text="end" data-for="redeem-stmt"></span></pre>
</div>

## Data Verified

Lender name, mortgage account number, property address, outstanding balance, daily interest rate, validity window, early repayment charge status, and the as-at date of the snapshot. The verified hash binds all of these fields together — altering any single value (e.g., reducing the outstanding balance) invalidates the hash.

## Data Visible After Verification

Shows the issuer domain (`northbridgebs.co.uk`, `nationwide.co.uk`, `hsbc.co.uk`) and confirms whether the redemption figure is still within its validity window.

**Status Indications:**
- **Valid** — The redemption figure is current and within its stated validity period.
- **Expired** — The validity window has passed; a fresh figure must be requested.
- **Superseded** — A newer redemption statement has been issued for this account, replacing this one.

## Second-Party Use

The **Seller (Borrower)** uses this to prove their mortgage balance during conveyancing. When instructing a solicitor to handle the sale, the seller clips the redemption statement and shares it. The solicitor verifies the hash against the lender's domain within seconds, confirming the exact payoff amount without waiting for a postal letter or trusting an unverifiable PDF.

## Third-Party Use

**Seller's Solicitor / Conveyancer**
The solicitor handling the sale needs the redemption figure to calculate the net proceeds payable to the seller after completion. A verified figure eliminates the risk of relying on an altered or outdated document.

**Buyer's Solicitor**
Before exchanging contracts, the buyer's solicitor may want confirmation that the seller's mortgage can be discharged from the sale proceeds. A verified redemption statement showing the outstanding balance is less than the agreed sale price provides that assurance.

**Estate Agents**
When advising sellers on pricing or confirming that a sale is financially viable, estate agents can verify the outstanding mortgage balance rather than relying on the seller's verbal estimate.

**Mortgage Brokers**
When arranging a remortgage, the broker needs the exact redemption figure from the existing lender to structure the new loan. A verified statement removes ambiguity about the amount to be refinanced.

## Verification Architecture

**The "Stale Figure" and "Altered Statement" Problems**

- **Altered Balance:** A seller edits the PDF to show a lower outstanding balance, making it appear that more equity is available than actually exists.
- **Expired Validity:** A redemption figure issued three weeks ago is presented as current. Interest has accrued, and the actual payoff amount is now higher than stated.
- **Fabricated ERC Waiver:** A borrower within an early repayment charge period edits the statement to show "NONE" where a substantial charge applies, concealing thousands of pounds in additional costs.

**Issuer Types** (First Party)

**Building Societies:** Nationwide, Yorkshire, Coventry, Leeds, Skipton.
**High Street Banks:** HSBC, Barclays, NatWest, Lloyds, Santander UK.
**Specialist Lenders:** Kensington Mortgages, Pepper Money, Together.

**Privacy Salt:** Required. Mortgage account numbers, property addresses, and outstanding balances are sensitive financial data. The hash must be salted to prevent enumeration attacks — an adversary should not be able to guess-and-check balances for known addresses or account numbers.

## Authority Chain

**Pattern:** Regulated

Northbridge Building Society, a regulated mortgage lender, is authorized by the FCA and PRA to issue verified mortgage redemption statements.

```
✓ northbridgebs.co.uk/redemptions/verify — Issues verified mortgage redemption statements
  ✓ fca.org.uk/register — Regulates UK mortgage lenders
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Competition vs. Manual Redemption Requests

| Feature | Live Verify | Postal / Portal Request | Scanned PDF |
| :--- | :--- | :--- | :--- |
| **Speed** | **Seconds.** Hash check against lender domain. | **Days.** Request, wait, receive by post or portal. | **Instant.** |
| **Trust Anchor** | **Domain-Bound.** Tied to the lender. | **Reputation.** Trust the letterhead. | **Zero.** Easily forged. |
| **Currency** | **Time-Stamped.** As-at date and validity window are hash-bound. | **Stale Risk.** Figures age from the moment of issue. | **None.** No way to confirm the date is real. |
| **Integrity** | **Cryptographic.** Binds balance, ERC status, and validity to domain. | **Paper.** Can be altered after receipt. | **Vulnerable.** Trivially edited. |

## Further Derivations

None currently identified.

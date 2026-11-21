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

**Why verification matters here:**

- **A wrong figure breaks the chain.** Property transactions in England frequently involve chains of four or more linked sales. If the redemption figure is stale, altered, or fabricated, the seller's solicitor remits the wrong amount. The lender refuses to release the charge. Completion fails. Every transaction downstream collapses on the same day, affecting families who have booked removal vans and exchanged contracts.
- **Daily interest accrual means precision matters.** At £19.22 per day, a redemption figure that is 14 days out of date is £269 short. The lender will not release the charge for a shortfall of any amount. The buyer's solicitor must obtain a fresh figure, which can take days — during which the daily interest continues to accrue.
- **Fabricated statements enable equity release fraud.** A fraudster posing as the homeowner obtains a fake redemption statement showing a low outstanding balance, uses it to demonstrate high equity, and borrows against the property. The genuine lender's charge remains, and the second lender discovers the true position only at enforcement.

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

## What Is Checked

Lender name, mortgage account number, property address, outstanding balance, daily interest rate, validity window, early repayment charge status, and the as-at date of the snapshot. The verified hash binds all of these fields together — altering any single value (e.g., reducing the outstanding balance) invalidates the hash.

## What the Checker Sees

Shows the issuer domain (`northbridgebs.co.uk`, `nationwide.co.uk`, `hsbc.co.uk`) and confirms whether the redemption figure is still within its validity window.

**Status Indications:**
- **Valid** — The redemption figure is current and within its stated validity period.
- **Expired** — The validity window has passed; a fresh figure must be requested.
- **Superseded** — A newer redemption statement has been issued for this account, replacing this one.

## Who Holds It

The Seller (Borrower) uses this to prove their mortgage balance during conveyancing. When instructing a solicitor to handle the sale, the seller clips the redemption statement and shares it. The solicitor verifies the hash against the lender's domain within seconds, confirming the exact payoff amount without waiting for a postal letter or trusting an unverifiable PDF.

## Who Checks It

**Seller's Solicitor / Conveyancer**
The solicitor handling the sale needs the redemption figure to calculate the net proceeds payable to the seller after completion. A verified figure eliminates the risk of relying on an altered or outdated document.

**Buyer's Solicitor**
Before exchanging contracts, the buyer's solicitor may want confirmation that the seller's mortgage can be discharged from the sale proceeds. A verified redemption statement showing the outstanding balance is less than the agreed sale price provides that assurance.

**Estate Agents**
When advising sellers on pricing or confirming that a sale is financially viable, estate agents can verify the outstanding mortgage balance rather than relying on the seller's verbal estimate.

**Mortgage Brokers**
When arranging a remortgage, the broker needs the exact redemption figure from the existing lender to structure the new loan. A verified statement removes ambiguity about the amount to be refinanced.

## How Verification Works Here

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

## Where Each Fits: Live Verify and Requesting Figures From the Lender

Today a solicitor obtains a redemption figure by requesting it from the lender, by post or through the lender's portal. Getting the figure straight from the lender remains the trusted route for the solicitor who asked for it. Live Verify answers a different question, for everyone further down the chain who is handed a copy: is this the statement the lender issued, with these figures and this validity window? The two work side by side.

| | Request to the lender (post or portal) | Live Verify on the statement | Forwarded scanned PDF |
| :--- | :--- | :--- | :--- |
| **Who can check** | The borrower's solicitor or someone else authorised to ask the lender. | Anyone handed the statement: the buyer's solicitor, a second lender, a conveyancer in the chain. | Nobody; it can only be taken on trust. |
| **What the checker gets** | The figure direct from the lender. | Confirmation that the lender issued this exact statement, as at its date, and whether it is still within its validity window. | A document whose balance or dates may have been edited. |
| **What the borrower shares** | Authority for the lender to deal with their solicitor. | Only the statement they chose to hand over. | Only the statement they chose to hand over. |
| **Reach** | The lender's own customers and their authorised representatives. | Global in principle: any lender, in any country, that publishes hashes on its own domain. | Universal, but untrusted. |
| **Speed and cost** | Can take days to arrive, and a fresh figure is needed if completion slips. | A few seconds per check: one web lookup, with no fee to the standard and no relationship with the lender. It does not produce a new figure. | Immediate. |
| **What it needs** | An authorised request to the lender. | The lender to publish hashes, and Live Verify-aware software on the checker's device. No lender does this yet. | Nothing. |
| **Best suited to** | Obtaining the figure in the first place, and fresh figures when dates move. | Confirming a forwarded statement is genuine and still in date. | Nothing where completion money depends on it. |

**Where each fits:** The borrower's solicitor will still request the redemption figure from the lender, and a fresh one whenever completion moves. Once issued, that statement is forwarded to others in the transaction who have no channel to the lender. Live Verify lets them confirm it is genuine and within its validity window in seconds, rather than taking the copy on trust or waiting for a reply.

## Further Derivations

None currently identified.

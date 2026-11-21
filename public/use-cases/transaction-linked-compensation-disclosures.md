---
title: "Transaction-Linked Compensation Disclosures"
category: "Professional Ethics & Compliance"
volume: "Large"
retention: "7-10 years (regulatory, tax, complaints, litigation)"
slug: "transaction-linked-compensation-disclosures"
verificationMode: "clip"
tags: ["compensation", "commission", "trail-commission", "financial-advice", "ifa", "broker", "conflict-of-interest", "referral-fee", "revenue-share", "inducement"]
furtherDerivations: 2
---

## What is a Transaction-Linked Compensation Disclosure?

When a financial adviser, broker, introducer, or intermediary recommends a transfer, policy, platform, loan, investment, or service, the natural question is:

**What is in it for you if I say yes?**

That question has two distinct answers:

1. **General position** — what kinds of compensation this professional is allowed to receive at all
2. **Transaction-specific fact** — what they actually received, or will receive, on this exact transaction

Most current disclosure systems muddle these together.

The general disclosure is buried in onboarding paperwork, and the specific transaction economics are often invisible to the client altogether. That lets intermediaries sound "independent" in the abstract while still taking product-linked commissions, trail, referral payments, or other incentive proxies on the deal in front of the customer.

This use case makes both layers portable and verifiable.

## Layer 1: General Compensation Position

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #1f4b99; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <span verifiable-text="start" data-for="compgeneral"></span>
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.84em; white-space: pre; color: #000; line-height: 1.6;">ADVISER COMPENSATION POSITION
═══════════════════════════════════════════════════════════════════

Adviser:          Michael Turner
Firm:             Turner Independent Financial Advisers Ltd
Effective Date:   20 Mar 2026

Client-Paid Fees: YES
Third-Party Commission: YES
Initial Commission Basis: Up to 3.00% of transferred or invested funds
Ongoing Trail:    YES
Trail Basis:      Up to 0.50% annually
Max Duration:     Up to 7 years from policy or account start
Revenue Share:    POSSIBLE
Referral Fees:    NONE DISCLOSED

Position Summary: COMMISSION AND ONGOING TRAIL MAY APPLY

<span data-verify-line="compgeneral">verify:disclosures.turnerifa.co.uk/position/v</span></pre>
  <span verifiable-text="end" data-for="compgeneral"></span>
</div>

## Layer 2: Transaction-Specific Compensation Fact

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #8a4b08; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <span verifiable-text="start" data-for="comptx"></span>
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.84em; white-space: pre; color: #000; line-height: 1.6;">TRANSACTION COMPENSATION RECORD
═══════════════════════════════════════════════════════════════════

Adviser:          Michael Turner
Firm:             Turner Independent Financial Advisers Ltd
Transaction Ref:  332234
Scheme Ref:       22133
Transaction Type: Pension transfer
Execution Date:   20 Mar 2026

Asset Valuation:  GBP 112,400.00
Initial Commission Paid: GBP 3,372.00
Commission Basis: 3.00% of asset valuation
Ongoing Trail:    0.50% annually
Trail Start:      20 Mar 2026
Trail End Rule:   Policy closure or 7 years, whichever is earlier
Paid By:          Northbridge Life plc

Transaction Summary: INITIAL COMMISSION PAID

<span data-verify-line="comptx">verify:disclosures.turnerifa.co.uk/tx/332234/v</span></pre>
  <span verifiable-text="end" data-for="comptx"></span>
</div>

## Why the two-layer model matters

The general position answers:

- can this person take commission at all?
- can they receive trail or revenue share?
- what kinds of inducements are in scope?

The transaction record answers:

- what did they actually get on this deal?
- from whom?
- based on what valuation or premium?
- over what duration?

Without both, the client sees only part of the conflict.

## The Problem: I Sound Independent, But...

- **Abstract independence claims:** Adviser markets themselves as independent or unbiased while still taking product-linked compensation.
- **Invisible transaction economics:** The client sees the recommendation but not the actual amount paid by the provider.
- **Trail opacity:** Initial commission may be visible, but trailing compensation quietly continues for years.
- **Proxy incentives:** Referral fees, revenue share, bonus grids, soft-dollar benefits, or volume-linked inducements substitute for obvious commission.
- **Historic amnesia:** Years later, nobody can easily prove what was paid on the original deal.

This use case does not require exact salary disclosure. It focuses on the narrower and more relevant question:

## What Is Checked

### General position

Adviser name, firm, effective date, whether client-paid fees apply, whether third-party commission is permitted, maximum commission basis, whether trail/ongoing commission applies, trail basis, maximum duration, whether revenue sharing or referral fees are possible, and a plain-language position summary.

### Transaction-specific fact

Adviser name, firm, transaction reference, scheme/product reference, transaction type, execution date, valuation or premium basis, initial commission amount, commission formula, ongoing trail rate, trail start and end rule, payer/provider, and transaction summary.

**Document Types:**
- **Standing Compensation Position Statement**
- **Transaction Compensation Record**
- **Nil-Compensation Transaction Record**
- **Referral / Introducer Payment Record**
- **Post-Transaction Compensation Amendment**

## What the Checker Sees

Shows the issuer domain and the current status.

**Status Indications:**
- **Current** — Standing position is current
- **Superseded** — A newer standing position exists
- **Commission Paid** — Initial compensation was paid on this transaction
- **No Third-Party Compensation** — None was paid or is due on this transaction
- **Trail Active** — Ongoing compensation remains active
- **Trail Ended** — Ongoing compensation has ceased
- **Amended** — Original transaction economics were corrected
- **Voided** — The record was issued in error or the transaction unwound

## Who Holds It

The client or customer benefits first.

**Point-of-decision clarity:** Before signing a transfer, investment, policy, or mortgage recommendation, the customer can verify both the adviser's general incentive model and the exact economics of this transaction.

**Complaint evidence:** If the customer later alleges undisclosed conflict, they have a portable record of what the adviser claimed generally and what they actually received specifically.

**Comparability:** Competing advisers can be compared on a like-for-like basis: fee-only, commission-based, or mixed.

**Reduced ambiguity:** The system makes it harder to answer the practical question with vague branding terms like "independent," "whole of market," or "aligned."

## Who Checks It

**Regulators and Ombudsmen**

**Complaint triage:** Investigators can see whether the transaction economics match the standing disclosure and whether the client was likely misled.

**Historic reconstruction:** Complaints often arise years later. The transaction-specific record preserves the original compensation fact pattern.

**Compliance and Supervision**

**Internal audits:** Firms can test whether advisers whose standing disclosures say "no referral fees" actually have transaction records showing referral income.

**Cross-system consistency:** CRM, product provider, and payout records should line up with the disclosure object.

**Counterparties and Referrers**

**Conflict checking:** A lender, product provider, or professional counterparty can confirm whether a claimed "fee-only" or "independent" posture actually matches the economics in play.

## How Verification Works Here

**what incentive exists, and what did this transaction pay?**

## Commission and Proxy Categories

The system should not stop at obvious commission labels. It should also cover proxies for commission:

- referral fees
- revenue sharing
- placement fees
- volume bonuses
- product-linked bonus grids
- soft-dollar benefits
- non-cash incentives above threshold
- affiliate payments linked to completion of the transaction

Otherwise the disclosure regime becomes easy to game by relabeling incentives.

<details>
<summary>UK IFA / "What's in it for you?" Context</summary>

This use case is especially natural in UK advice markets because a longstanding public intuition already exists:

- the customer wants to know whether the adviser is genuinely independent
- the customer wants a straight answer to "what is in it for you?"

The standing disclosure answers that in principle.

The transaction record answers it in fact.
</details>

## Where Each Fits: Live Verify, Terms of Business and Regulator Filings

Today an adviser's or broker's compensation is disclosed, where the rules require it, in the firm's terms of business or client agreement, in filings to the financial regulator, and in whatever the adviser says when asked. What must be disclosed, and when, depends on the country and the product. These disclosures matter and remain required. A verifiable two-layer disclosure answers a narrower question, what the firm or product provider stands behind as paid on this specific deal, and works alongside them.

| | Terms of business PDF | Regulator filing | Live Verify on the two-layer disclosure | Adviser's verbal answer |
| :--- | :--- | :--- | :--- | :--- |
| **Who can check** | The client, if they read it. | The regulator; some filings are public, in summary form. | Anyone handed the disclosure: the client, an ombudsman or regulator, a compliance team, a counterparty. | Whoever was present. |
| **What the checker gets** | The firm's general compensation model, often in standard wording among other terms. | Firm-level information, rarely tied to a single transaction. | Confirmation that the issuer stands behind this exact general position and this exact transaction record (who paid what, on what basis, for how long), as at its date. It is only as complete as what the issuer chose to record. | Whatever the adviser chooses to say. |
| **What the client shares** | Nothing; they receive it. | Nothing. | Only the disclosure they chose to hand over. | Nothing. |
| **Reach** | One firm's clients. | One regulator's jurisdiction. | Global in principle: any firm or product provider, in any country, that publishes hashes on its own domain. | One conversation. |
| **Speed and cost** | Free to read, if anyone does. | Varies; not designed for individual clients. | A few seconds per check: one web lookup, with no fee to the standard. | Immediate. |
| **What it needs** | Nothing beyond the firm's existing obligations. | Regulatory reporting. | The firm or provider to issue both layers and publish hashes, and Live Verify-aware software on the checker's device. No firm or provider does this yet. | Nothing. |
| **Best suited to** | The standing contractual and regulatory disclosure. | Supervision across the market. | Showing the client what actually happened on the deal in front of them, and reconstructing it years later in a complaint. | A first conversation. |

**Where each fits:** a standing disclosure in the terms of business, and the regulator's own reporting, remain necessary and should stay. On their own they rarely show what was paid on the deal in front of the client. A transaction-specific record complements them, giving the client, an ombudsman or a compliance team a quick, cheap check of what the firm stood behind at the time, wherever they have software that honours Live Verify.

## Relationship to Existing Use Cases

This use case is complementary to:

- [What Is In It For You? Disclosures](view.html?doc=what-is-in-it-for-you-disclosures)
- [Compensation & Conflict-of-Interest Disclosures](view.html?doc=compensation-conflict-disclosures)
- [Investment Suitability Reports](view.html?doc=investment-suitability-reports)
- [Investment Advisor Certifications (RIA, IAR)](view.html?doc=investment-advisor-certifications)

The difference is that this page focuses specifically on the two-layer compensation question:

- **what can you be paid?**
- **what were you paid on this transaction?**

## Authority Chain

**Pattern:** Regulated / Professional / Commercial depending on sector

Financial-advice example:

```
✓ disclosures.exampleadviser.co.uk/position/v — Standing compensation position
✓ disclosures.exampleadviser.co.uk/tx/332234/v — Transaction-specific compensation fact
  ✓ fca.org.uk/register — Regulates UK advisory firms
    ✓ gov.uk/verifiers — UK government root namespace
```

Equivalent chains in other professions would run through the relevant sector regulator or professional authority where one exists.

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Further Derivations

1. **Mortgage and Property Referral Chains** — Estate agent, mortgage broker, solicitor, and developer incentive disclosures in one linked record.
2. **Medical Referral and Procedure Incentives** — Referral-linked or device-linked physician compensation disclosures.
3. **Procurement Intermediary Incentive Records** — B2B sourcing, introducer, and reseller conflict disclosures tied to a specific deal.

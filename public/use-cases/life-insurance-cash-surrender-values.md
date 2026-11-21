---
title: "Cash Surrender Value Statements"
category: "Investment & Fintech"
volume: "Medium"
retention: "Policy lifetime"
slug: "life-insurance-cash-surrender-values"
verificationMode: "clip"
tags: ["life-insurance", "cash-value", "surrender-value", "whole-life", "universal-life", "estate-planning", "divorce", "collateral", "life-settlement", "financial-planning"]
furtherDerivations: 1
---

## The Problem

A whole life, universal life, or endowment policy accumulates cash value over time. The insurer periodically issues statements showing the current cash value, but these arrive as paper or PDF — formats that are trivial to alter. When the stated value matters to someone other than the policyholder (a divorce attorney splitting marital assets, a lender accepting the policy as collateral, a life settlement broker pricing a purchase), there is no way to confirm the figures are current and accurate without contacting the insurer directly. That process takes days or weeks and depends on the insurer cooperating.

The question these statements answer is straightforward: what is this policy actually worth today if the owner cashes it in? The answer involves guaranteed value, non-guaranteed value (dividends, interest credits), surrender charges, and outstanding policy loans. Getting that answer verified quickly and independently matters for estate planning, divorce proceedings, collateral valuation, life settlements, and retirement planning.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="cashsurrender"></span>CASH SURRENDER VALUE STATEMENT
Policy:             99228877-WL
Type:               Whole Life
Guaranteed Value:   $128,400.00
Non-Guaranteed:     $14,100.00
Total Cash Value:   $142,500.00
Surrender Charge:   $0.00 (past surrender period)
Net Surrender:      $142,500.00
Outstanding Loans:  $0.00
As At:              21 Mar 2026
<span data-verify-line="cashsurrender">verify:newyorklife.com/cash-value/v</span> <span verifiable-text="end" data-for="cashsurrender"></span></pre>
</div>

## What Is Checked

Policy number, policy type (Whole Life, Universal Life, Endowment), guaranteed cash value, non-guaranteed cash value, total cash value, applicable surrender charges, net surrender value, outstanding policy loans, and the as-at date of the valuation.

## What the Checker Sees

Shows the issuer domain (`newyorklife.com`, `prudential.com`, `northwesternmutual.com`) and current statement status.

**Status Indications:**
- **Current** — Values reflect the most recent calculation date.
- **Superseded** — A newer statement has been issued.
- **Policy Lapsed** — Policy has lapsed; cash value may have been applied to keep coverage in force or forfeited.
- **Loan Outstanding** — A policy loan exists that reduces the net surrender value.

## Who Holds It

The Policyholder benefits from verifiable cash surrender value statements in several contexts.

**Retirement Planning:** Demonstrating to a financial planner that the policy has a verified $142,500 accessible value, allowing accurate inclusion in a retirement income strategy without waiting for a manual letter from the insurer.

**Estate Planning:** Providing a verified current value to an estate attorney or trust officer so the policy is accurately reflected in the estate inventory.

**Borrowing Against the Policy:** Presenting a verified cash value to a lender when using the policy as collateral, accelerating underwriting.

## Who Checks It

**Divorce / Family Law Attorneys**
**Asset Valuation:** In marital dissolution, life insurance cash values are marital assets subject to division. A verified statement eliminates disputes over whether the stated value is current and unaltered. The opposing party's attorney can confirm the figure independently.

**Lenders / Private Banks**
**Collateral Verification:** When a policy is pledged as collateral for a loan, the lender needs to confirm the net surrender value (after any existing loans and surrender charges). A verified statement provides this without a weeks-long verification-of-coverage process.

**Life Settlement Brokers**
**Baseline Valuation:** A life settlement buyer needs the current cash surrender value as the floor price — the policy is worth at least this much to the owner. Verification prevents sellers from understating the cash value to create urgency, or overstating it to inflate expectations.

**Estate Executors / Probate Courts**
**Inventory Accuracy:** When settling an estate, executors must account for all assets. A verified cash surrender value statement confirms the policy's worth at a specific date, satisfying probate requirements.

## How Verification Works Here

**The Fabrication Problem**

- **Value Inflation:** Editing a PDF to show $142,500 when the actual cash value is $42,500, inflating net worth for a loan application or financial statement.
- **Value Suppression:** Understating cash value during divorce proceedings to reduce the marital estate subject to division.
- **Loan Concealment:** Hiding an outstanding policy loan of $80,000 that dramatically reduces the net surrender value.
- **Stale Statements:** Presenting a 3-year-old statement as current, ignoring surrender charges that have since changed or loans that have been taken.

**Issuer Types** (First Party)

**National Carriers:** New York Life, Prudential, Northwestern Mutual, MassMutual.
**Mutual Companies:** Where policyholders are the owners — dividends affect non-guaranteed values.
**Fraternal Benefit Societies:** Knights of Columbus, Woodmen of the World.

**Privacy Salt:** Required. Cash surrender values reveal personal wealth. The hash must be salted to prevent adversaries from guessing policy values through brute-force hash comparison. This is particularly sensitive because cash values correlate with age, health status, and financial capacity.

## Authority Chain

**Pattern:** Regulated

New York Life, a regulated life insurance carrier, is authorized by state insurance departments to issue verified cash surrender value statements.

```
✓ newyorklife.com/cash-value/v — Issues verified cash surrender value statements
  ✓ dfs.ny.gov/insurance — Regulates life insurers domiciled in New York
    ✓ ny.gov/verifiers — New York State government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Where Each Fits: Live Verify and Asking the Insurer Directly

The established way to confirm a policy's cash surrender value is to ask the insurer in writing, with the policyholder's authorization, and receive a current figure back. It is run by the insurer and gives an up-to-date answer. Asking directly and Live Verify answer different questions and work side by side: one gets today's figure, the other confirms a statement already in hand.

| | Written request to the insurer | Live Verify on the surrender value statement | Scanned PDF or paper statement |
| :--- | :--- | :--- | :--- |
| **Who can check** | The policyholder, or a third party they have authorized. | Anyone handed the statement: a lender, a divorce attorney, a life settlement broker, an executor. | Nobody; it can only be taken on trust. |
| **What the checker gets** | The value as of the insurer's response, with loans and charges if asked for. | Confirmation that the insurer issued this exact statement, outstanding loans included, as at its date, and whether it has since been superseded. | A statement whose figures, or loan lines, may have been edited or cropped. |
| **What the policyholder shares** | An authorization for the insurer to disclose to the third party. | Only the statement they chose to hand over. | Only the statement they chose to hand over. |
| **How current** | Current at the time of the response. | As at the statement date; a newer statement shows as superseded. | Unknown; it could be years old. |
| **Reach** | One insurer, by its own process. | Global in principle: any insurer, in any country, that publishes hashes on its own domain. | Anywhere, but untrusted. |
| **Speed and cost** | Can take days or longer, by letter or form. | A few seconds per check: one web lookup, with no fee to the standard. | Immediate. |
| **What it needs** | The insurer's request process and the policyholder's authorization. | The insurer to publish hashes, and Live Verify-aware software on the checker's device. No insurer does this yet. | Nothing. |
| **Best suited to** | A figure that must be current on a specific day, such as a surrender or a settlement closing. | Valuation in a divorce, an estate or a loan application, where a dated statement is enough. | Nothing where the value matters. |

**Where each fits:** Where a transaction depends on today's value, such as an actual surrender or a closing, the insurer's own current figure remains the one to rely on. For most valuation work, a dated statement is what changes hands, and the question is only whether it is genuine and complete. Live Verify answers that in seconds, including the loan lines that a doctored copy would leave out.

## Further Derivations

- [Individual Life Insurance Policies](life-insurance-policies.md) — The underlying policy that generates the cash value.

---
title: "Individual Life Insurance Policies"
category: "Investment & Fintech"
volume: "Small"
retention: "Policy lifetime (50+ years)"
slug: "life-insurance-policies"
verificationMode: "clip"
tags: ["life-insurance", "whole-life", "term-life", "beneficiary-designation", "cash-value", "financial-planning", "estate-asset", "insurance-policy"]
furtherDerivations: 1
---

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="life-pol"></span>NEW YORK LIFE
Custom Whole Life Insurance Policy
═══════════════════════════════════════════════════════════════════

                         POLICY SCHEDULE

Policy Number:  99228877-WL                    Date of Issue:
Insured:        JOHN JACOB DOE                 March 15, 2026

Description                                           Initial Amount
───────────────────────────────────────────────────────────────────
Face Amount (Death Benefit)                          $ 1,000,000.00
Cash Value (Year 10 Projection)                      $   142,500.00
Base Annual Premium                                  $     4,200.00

Primary Beneficiary:  Mary Alice Jacob (Spouse)
Riders:               Waiver of Premium, Accidental Death (2x)

_________________________
Sarah Miller, Secretary                              Est. 1845

<span data-verify-line="life-pol">verify:newyorklife.com/policy/v</span> <span verifiable-text="end" data-for="life-pol"></span></pre>
</div>

## The Problem: Phantom Policy Fraud

- **Benefit Inflation:** Editing a $100,000 policy PDF to read $1,000,000 to trick a lender or business partner.
- **Lapse Concealment:** Showing an old "In Force" paper for a policy that lapsed 2 years ago.
- **Beneficiary Tampering:** Editing the beneficiary page to change the payout from a spouse to a secret creditor or a fraudster's account.

## What Is Checked

Insured name, policy number, face amount (Death Benefit), policy type (Whole/Term/Universal), cash value accumulation (if applicable), primary/contingent beneficiaries, base premium, effective date, issuing carrier, active riders (e.g., Waiver of Premium).

**Document Types:**
- **Policy Schedule (Declarations):** The 1-page primary summary.
- **Beneficiary Designation Form:** Proving who gets the payout.
- **Collateral Assignment:** Proving the policy is pledged to a bank.
- **Annual Performance Summary:** Showing cash value growth.

## What the Checker Sees

Shows the issuer domain (`newyorklife.com`, `prudential.com`, `metlife.com`) and current policy standing.

**Status Indications:**
- **In Force** — Premium paid; coverage active.
- **Lapsed** — Coverage terminated due to non-payment.
- **Paid-Up** — No further premiums required to maintain coverage.
- **Pledged** — Policy has a verified lien from a third-party lender.

## Who Holds It

The Policyholder (Insured) benefits from verification.

**Collateralized Loans:** Proving to a bank that their "Whole Life" policy has a verified $142,000 cash value. This allows the owner to take a low-interest "Policy Loan" or use the insurance as collateral for a mortgage without waiting weeks for a manual "Verification of Coverage" form from the insurer.

**Estate Planning:** Providing a verified "Wealth Token" to an estate attorney or trust officer, ensuring the death benefit is accurately accounted for in the family's total assets.

## Who Checks It

**Mortgage Lenders / Private Banks**
**Asset Integrity:** Verifying the existence and value of permanent life insurance. Live Verify ensures the borrower hasn't "Edited" a $10,000 term policy to look like a $1M whole-life asset to inflate their net worth.

**Divorce / Settlement Attorneys**
**Valuation Proof:** Instantly verifying the "Cash Surrender Value" of a policy during asset division in a marital dissolution.

**Institutional Lenders**
**Lien Verification:** Checking if a policy being offered as collateral already has a verified "Assignment" to a different bank.

## Who Issues It

**Issuer Types** (First Party)

**National Carriers:** (New York Life, Prudential, Northwestern Mutual).
**Mutual Companies:** (Where the policyholders own the firm).
**Fraternal Benefit Societies.**

**Privacy Salt:** Highly critical. Life insurance involves family health and massive wealth. The hash MUST be salted to prevent "Guess-and-Check" searches for people with high-value policies.

## Authority Chain

**Pattern:** Regulated

Aviva, a regulated life insurance provider, is authorized by the FCA to issue verified life insurance policies and coverage confirmation.

```
✓ policy.aviva.co.uk/life/verify — Issues verified life insurance policies
  ✓ fca.org.uk/register — Regulates UK life insurance and pensions firms
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Jurisdictional Witnessing (Optional)

An independent witness layer may apply — see [Witnessing Third Parties](../../docs/WITNESSING-THIRD-PARTIES.md) for the full mechanism (what a witness receives, non-repudiation, optional public-blockchain rollups). For this use case: a witness would receive the insurer's hashes and status changes plus structured metadata (policy number, face amount, issue date, status) — never beneficiary names or cash surrender values — providing non-repudiation of the policy and an audit trail lenders and estate attorneys can inspect.


## Compared With MIB Group (Industry DB)

| Feature | Live Verify | MIB Group (Industry Exchange) | Scanned PDF |
| :--- | :--- | :--- | :--- |
| **User Access** | **Universal.** Policyholders and banks. | **Restricted.** Only for insurance companies. | **Instant.** |
| **Trust Anchor** | **Domain-Bound.** Bound to the Carrier. | **Data-Bound.** Trust the aggregator. | **Zero.** Easily forged. |
| **Retention** | **50+ Years.** Archival text. | **Ephemeral.** Records often age out. | **Durable.** |
| **Integrity** | **Cryptographic.** Binds the *Beneficiary*. | **Vague.** Often only shows "Coverage exists." | **Vulnerable.** |

**Where each fits:** MIB and similar exchanges do their job for underwriters, who need to share information between insurers at application time. They are not open to policyholders, banks or family members, and they do not confirm the wording of an individual policy. Live Verify lets someone holding a policy document, perhaps decades after it was written, confirm that the carrier stands behind it. The two serve different audiences and neither displaces the other.
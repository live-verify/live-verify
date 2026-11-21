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

## Where Each Fits: Live Verify and Industry Exchanges Such as MIB

<!-- TODO(verify): MIB's scope (US and Canada, used for underwriting) -->

MIB Group runs an information exchange for member insurers in the US and Canada, used by underwriters at application time. It is not a register of policy wording and is not open to policyholders, so it and a verified policy document answer different questions for different people. They work side by side.

| | Industry exchange (MIB) | Live Verify on the policy document | Scanned PDF |
| :--- | :--- | :--- | :--- |
| **Who can check** | Member insurers, under the exchange's rules. | Anyone handed the policy: the policyholder, a bank, a family member, an executor. | Nobody; it can only be taken on trust. |
| **What the checker gets** | Coded information other members have reported, for underwriting. It does not confirm an individual policy's terms. | Confirmation that the carrier issued this exact policy text, beneficiary included, as at its date, and whether it has since been replaced or cancelled. | A document whose beneficiary or amounts may have been edited. |
| **What the policyholder shares** | Nothing directly; insurers report to the exchange. | Only the document they chose to hand over. | Only the document they chose to hand over. |
| **Over the years** | Records are kept under the exchange's own retention rules. | Checkable for as long as the carrier, or a successor, keeps publishing the hash. | Survives, but cannot be trusted. |
| **Reach** | Member insurers in the countries the exchange serves. | Global in principle: any carrier, in any country, that publishes hashes on its own domain. | Anywhere, but untrusted. |
| **Speed and cost** | Fast for members; membership has its own terms. | A few seconds per check: one web lookup, with no fee to the standard. | Immediate. |
| **What it needs** | Insurer membership. | The carrier to publish hashes, and Live Verify-aware software on the checker's device. No carrier does this yet. | Nothing. |
| **Best suited to** | Underwriters sharing information between insurers. | A bank or family checking a policy document, perhaps decades after it was issued. | Nothing where the payout matters. |

**Where each fits:** MIB and similar exchanges do their job for underwriters, who need to share information between insurers at application time. They are not open to policyholders, banks or family members, and they do not confirm the wording of an individual policy. Live Verify lets someone holding a policy document, perhaps decades after it was written, confirm that the carrier stands behind it. The two serve different audiences and neither displaces the other.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).

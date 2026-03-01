---
title: "Individual Life Insurance Policies"
category: "Personal Lines Insurance"
volume: "Small"
retention: "Policy lifetime (50+ years)"
slug: "life-insurance-policies"
tags: ["life-insurance", "whole-life", "term-life", "beneficiary-designation", "cash-value", "financial-planning", "estate-asset", "insurance-policy"]
furtherDerivations: 1
---

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="life-pol">[</span>NEW YORK LIFE
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

<span data-verify-line="life-pol">verify:newyorklife.com/policy/v</span> <span verifiable-text="end" data-for="life-pol">]</span></pre>
</div>

## Data Verified

Insured name, policy number, face amount (Death Benefit), policy type (Whole/Term/Universal), cash value accumulation (if applicable), primary/contingent beneficiaries, base premium, effective date, issuing carrier, active riders (e.g., Waiver of Premium).

**Document Types:**
- **Policy Schedule (Declarations):** The 1-page primary summary.
- **Beneficiary Designation Form:** Proving who gets the payout.
- **Collateral Assignment:** Proving the policy is pledged to a bank.
- **Annual Performance Summary:** Showing cash value growth.

## Data Visible After Verification

Shows the issuer domain (`newyorklife.com`, `prudential.com`, `metlife.com`) and current policy standing.

**Status Indications:**
- **In Force** — Premium paid; coverage active.
- **Lapsed** — **ALERT:** Coverage terminated due to non-payment.
- **Paid-Up** — No further premiums required to maintain coverage.
- **Pledged** — Policy has a verified lien from a third-party lender.

## Second-Party Use

The **Policyholder (Insured)** benefits from verification.

**Collateralized Loans:** Proving to a bank that their "Whole Life" policy has a verified $142,000 cash value. This allows the owner to take a low-interest "Policy Loan" or use the insurance as collateral for a mortgage without waiting weeks for a manual "Verification of Coverage" form from the insurer.

**Estate Planning:** Providing a verified "Wealth Token" to an estate attorney or trust officer, ensuring the death benefit is accurately accounted for in the family's total assets.

## Third-Party Use

**Mortgage Lenders / Private Banks**
**Asset Integrity:** Verifying the existence and value of permanent life insurance. Live Verify ensures the borrower hasn't "Edited" a $10,000 term policy to look like a $1M whole-life asset to inflate their net worth.

**Divorce / Settlement Attorneys**
**Valuation Proof:** Instantly verifying the "Cash Surrender Value" of a policy during asset division in a marital dissolution.

**Institutional Lenders**
**Lien Verification:** Checking if a policy being offered as collateral already has a verified "Assignment" to a different bank.

## Verification Architecture

**The "Phantom Policy" Fraud Problem**

- **Benefit Inflation:** Editing a $100,000 policy PDF to read $1,000,000 to trick a lender or business partner.
- **Lapse Concealment:** Showing an old "In Force" paper for a policy that lapsed 2 years ago.
- **Beneficiary Tampering:** Editing the beneficiary page to change the payout from a spouse to a secret creditor or a fraudster's account.

**Issuer Types** (First Party)

**National Carriers:** (New York Life, Prudential, Northwestern Mutual).
**Mutual Companies:** (Where the policyholders own the firm).
**Fraternal Benefit Societies.**

**Privacy Salt:** Highly critical. Life insurance involves family health and massive wealth. The hash MUST be salted to prevent "Guess-and-Check" searches for people with high-value policies.

## Jurisdictional Witnessing

A jurisdiction may require the issuer to retain a **witnessing firm** for regulatory compliance. The witnessing firm:

- Receives all hashes from the issuer, and any subsequent changes to the payload as they happen—which may manifest as a new hash, a status change, or even a 404 (record deleted)
- Receives structured content/metadata (key identifiers and dates)
- Does **NOT** receive plaintext or sensitive personal information
- Provides an immutable, timestamped audit trail—available to the jurisdiction on demand, to document holders/third parties during disputes, or as expert witness testimony in legal proceedings

This provides:
- **Non-repudiation:** Issuer cannot deny issuing the document
- **Timestamp proof:** Document existed at a specific time
- **Regulatory audit:** Jurisdictions can inspect the witness ledger for fraud detection
- **Resilience:** Verification works even if issuer's systems go down

**Public Blockchain (Non-Party)**

Witnessing firms may periodically commit rollups to an inexpensive public blockchain, providing an ultimate immutability guarantee. The blockchain is a "non-party"—infrastructure, not a participant in the transaction. This creates multiple verification paths:

1. **Issuer domain** — Direct check against the issuer
2. **Witnessing firm** — Independent confirmation with timestamp
3. **Public blockchain** — Decentralized trust anchor via rollup inclusion


## Competition vs. MIB Group (Industry DB)

| Feature | Live Verify | MIB Group (Industry Exchange) | Scanned PDF |
| :--- | :--- | :--- | :--- |
| **User Access** | **Universal.** Policyholders and banks. | **Restricted.** Only for insurance companies. | **Instant.** |
| **Trust Anchor** | **Domain-Bound.** Bound to the Carrier. | **Data-Bound.** Trust the aggregator. | **Zero.** Easily forged. |
| **Retention** | **50+ Years.** Archival text. | **Ephemeral.** Records often age out. | **Durable.** |
| **Integrity** | **Cryptographic.** Binds the *Beneficiary*. | **Vague.** Often only shows "Coverage exists." | **Vulnerable.** |

**Why Live Verify wins here:** The "Lifetime" reality. Life insurance is a 50-year asset. Digital portals change every 5 years. Live Verify turns the **Static Paper Policy** (which the owner keeps in a safe) into a permanent, verifiable financial link that survives the death of IT systems and the changing of brokers.
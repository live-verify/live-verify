---
title: "Health Insurance Explanation of Benefits (EOB)"
category: "Personal Lines Insurance"
volume: "Large"
retention: "7-10 years (tax/audit)"
slug: "health-insurance-eobs"
verificationMode: "clip"
tags: ["health-insurance", "eob", "medical-billing", "hsa-fsa-compliance", "tax-deduction", "patient-responsibility", "insurance-fraud"]
furtherDerivations: 1
---

## What is an EOB?

An Explanation of Benefits (EOB) is the document your health insurance company sends you after a doctor's visit. It is NOT a bill.

It tells you:
1.  **The Discount:** How much the insurance company saved you by negotiating with the doctor.
2.  **The Payment:** Exactly how much the insurance company paid.
3.  **The Debt:** Exactly how much the doctor is legally allowed to charge you.

Verified EOBs are essential for HSA/FSA Reimbursement. Fraudsters often edit these PDFs to inflate their "Patient Responsibility" to trick their tax-free savings account into releasing cash. Verified hashes ensure the $70 charge matches the insurer's actual adjudication.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="eob-health"></span>ANTHEM BLUE CROSS                       Claim #: 99228877-BC
Explanation of Benefits (EOB)

Patient: SARAH J. DOE                   Service Date:   Feb 10, 2026
Provider: Westside Medical Clinic       Statement Date: Mar 15, 2026

Service Description          Amount Billed    Patient Owes
─────────────────────────────────────────────────────────────
Office Visit (99213)              $ 250.00        $ 25.00
Lab Work (Panel A)                $ 450.00        $ 45.00
─────────────────────────────────────────────────────────────
TOTAL PATIENT RESPONSIBILITY:                     $ 70.00

This is NOT a bill. Use this verified record for HSA/FSA reimbursement.

<span data-verify-line="eob-health">verify:anthem.com/claims/v</span> <span verifiable-text="end" data-for="eob-health"></span></pre>
</div>

## The Problem: Healthcare Fraud

- **HSA Draining:** Editing a $10 copay to look like $1,000 to trick an FSA administrator into releasing tax-free cash for personal use.
- **Balance Billing:** Clinics pretending they didn't receive an EOB showing a contracted discount, to bill the patient for the full retail amount.
- **Double Payouts:** Submitting the same EOB to two different insurance companies (e.g., work and spouse's plan) while altering the "Primary" status.

## What Is Checked

Patient name, member ID (partial), provider name, service date, CPT codes (procedures), billed amount, contracted discount, insurance payment, patient responsibility (copay/deductible), date of EOB issuance.

**Document Types:**
- **Explanation of Benefits (EOB):** The primary post-service record.
- **Predetermination of Benefits:** (Linked hash) for high-cost surgery estimates.
- **HSA/FSA Substantiation Receipt:** Proving an expense was "eligible."
- **Tax-Deduction Summary:** Annual summary of patient responsibility.

## What the Checker Sees

Shows the issuer domain (`anthem.com`, `uhc.com`) and current claim status.

**Status Indications:**
- **Processed** — Data matches the insurer's final payment decision.
- **Adjusted** — Original EOB was corrected; this version is void.
- **In-Appeal** — Patient has challenged the patient responsibility amount.
- **Denied** — Payment rejected (reason code verified).

## Who Holds It

The Patient benefits from verification.

**HSA/FSA Reimbursement:** Proving to a 3rd party administrator (e.g., WEX or WageWorks) that the $70 charge was a verified medical expense. Verification removes the "Substantiation Request" nightmare where workers have their debit cards frozen due to "Unreadable Paper."

**Tax Audit Protection:** Proving to the IRS that medical deductions claimed on a tax return are backed by verified, non-altered insurance records.

## Who Checks It

**HSA / FSA Administrators**
**Automated Approval:** Instantly verifying the "Patient Responsibility" amount from a PDF upload. Live Verify allows the administrator to skip the manual "Document Review" queue, releasing funds to the worker in seconds.

**Secondary Insurers (COB)**
**Coordination of Benefits:** Verifying exactly how much the primary insurer paid before calculating the secondary payment, stopping "Double-Dipping" fraud.

**Mortgage Lenders**
**Medical Debt Vetting:** If a borrower has high medical bills, lenders can verify the EOBs to ensure the debt isn't being exaggerated or hasn't already been settled.

## Who Issues It

**Issuer Types** (First Party)

**Health Insurance Carriers:** (Anthem, UHC, Aetna, Cigna).
**TPA Benefit Managers.**
**Medicare / Medicaid Portals.**

**Privacy Salt:** ABSOLUTELY CRITICAL. EOBs contain sensitive medical procedure data. The hash MUST be salted to prevent "Guess-and-Check" searches for specific patient conditions.

## Authority Chain

**Pattern:** Regulated

Health insurance carriers issue EOBs under federal insurance regulator authority (CMS in the US).

```
✓ eob.unitedhealthcare.com/verify — Issues explanations of benefits
  ✓ cms.gov — Administers US Medicare and Medicaid programs
    ✓ usa.gov/verifiers — US federal government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Compared With Insurance Portals

| Feature | Live Verify | Insurer Mobile App | Scanned PDF / Paper |
| :--- | :--- | :--- | :--- |
| **User Control** | **High.** Patient shares only the *Single Claim*. | **Low.** App access often reveals *full* medical history. | **Vulnerable.** |
| **Trust Anchor** | **Domain-Bound.** Bound to the Insurer. | **System-Bound.** | **Zero.** Easily forged. |
| **Interoperability** | **Universal.** Works for any HSA provider. | **Siloed.** | **Universal.** |
| **Speed** | **Instant.** 5-second scan. | **Slow.** Requires 2FA, login, and navigation. | **N/A.** |

**Where each fits:** The insurer's app is the member's complete view of claims and cover, and it is the right place to manage them. It is built for the member, not for showing one claim to someone else. Live Verify lets an HSA administrator, a second insurer or an employer benefits desk confirm that the insurer stands behind a single explanation of benefits the member chose to send, without anyone logging in to the member's account.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).

---
title: "Health Insurance Explanation of Benefits (EOB)"
category: "Personal Lines Insurance"
volume: "Large"
retention: "7-10 years (tax/audit)"
slug: "health-insurance-eobs"
tags: ["health-insurance", "eob", "medical-billing", "hsa-fsa-compliance", "tax-deduction", "patient-responsibility", "insurance-fraud"]
furtherDerivations: 1
---

## What is an EOB?

An **Explanation of Benefits (EOB)** is the document your health insurance company sends you after a doctor's visit. It is **NOT** a bill.

It tells you:
1.  **The Discount:** How much the insurance company saved you by negotiating with the doctor.
2.  **The Payment:** Exactly how much the insurance company paid.
3.  **The Debt:** Exactly how much the doctor is legally allowed to charge you.

Verified EOBs are essential for **HSA/FSA Reimbursement**. Fraudsters often edit these PDFs to inflate their "Patient Responsibility" to trick their tax-free savings account into releasing cash. Verified hashes ensure the $70 charge matches the insurer's actual adjudication.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="eob-health">[</span>ANTHEM BLUE CROSS                       Claim #: 99228877-BC
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

<span data-verify-line="eob-health">verify:anthem.com/claims/v</span> <span verifiable-text="end" data-for="eob-health">]</span></pre>
</div>

## Data Verified

Patient name, member ID (partial), provider name, service date, CPT codes (procedures), billed amount, contracted discount, insurance payment, patient responsibility (copay/deductible), date of EOB issuance.

**Document Types:**
- **Explanation of Benefits (EOB):** The primary post-service record.
- **Predetermination of Benefits:** (Linked hash) for high-cost surgery estimates.
- **HSA/FSA Substantiation Receipt:** Proving an expense was "eligible."
- **Tax-Deduction Summary:** Annual summary of patient responsibility.

## Data Visible After Verification

Shows the issuer domain (`anthem.com`, `uhc.com`) and current claim status.

**Status Indications:**
- **Processed** — Data matches the insurer's final payment decision.
- **Adjusted** — **ALERT:** Original EOB was corrected; this version is void.
- **In-Appeal** — Patient has challenged the patient responsibility amount.
- **Denied** — Payment rejected (reason code verified).

## Second-Party Use

The **Patient** benefits from verification.

**HSA/FSA Reimbursement:** Proving to a 3rd party administrator (e.g., WEX or WageWorks) that the $70 charge was a verified medical expense. Verification removes the "Substantiation Request" nightmare where workers have their debit cards frozen due to "Unreadable Paper."

**Tax Audit Protection:** Proving to the IRS that medical deductions claimed on a tax return are backed by verified, non-altered insurance records.

## Third-Party Use

**HSA / FSA Administrators**
**Automated Approval:** Instantly verifying the "Patient Responsibility" amount from a PDF upload. Live Verify allows the administrator to skip the manual "Document Review" queue, releasing funds to the worker in seconds.

**Secondary Insurers (COB)**
**Coordination of Benefits:** Verifying exactly how much the primary insurer paid before calculating the secondary payment, stopping "Double-Dipping" fraud.

**Mortgage Lenders**
**Medical Debt Vetting:** If a borrower has high medical bills, lenders can verify the EOBs to ensure the debt isn't being exaggerated or hasn't already been settled.

## Verification Architecture

**The "Healthcare Fraud" Problem**

- **HSA Draining:** Editing a $10 copay to look like $1,000 to trick an FSA administrator into releasing tax-free cash for personal use.
- **Balance Billing:** Clinics pretending they didn't receive an EOB showing a contracted discount, to bill the patient for the full retail amount.
- **Double Payouts:** Submitting the same EOB to two different insurance companies (e.g., work and spouse's plan) while altering the "Primary" status.

**Issuer Types** (First Party)

**Health Insurance Carriers:** (Anthem, UHC, Aetna, Cigna).
**TPA Benefit Managers.**
**Medicare / Medicaid Portals.**

**Privacy Salt:** ABSOLUTELY CRITICAL. EOBs contain sensitive medical procedure data. The hash MUST be salted to prevent "Guess-and-Check" searches for specific patient conditions.

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


## Competition vs. Insurance Portals

| Feature | Live Verify | Insurer Mobile App | Scanned PDF / Paper |
| :--- | :--- | :--- | :--- |
| **User Control** | **High.** Patient shares only the *Single Claim*. | **Low.** App access often reveals *full* medical history. | **Vulnerable.** |
| **Trust Anchor** | **Domain-Bound.** Bound to the Insurer. | **System-Bound.** | **Zero.** Easily forged. |
| **Interoperability** | **Universal.** Works for any HSA provider. | **Siloed.** | **Universal.** |
| **Speed** | **Instant.** 5-second scan. | **Slow.** Requires 2FA, login, and navigation. | **N/A.** |

**Why Live Verify wins here:** Selective Privacy. A patient needs to prove a $70 debt to their HSA provider without exposing that the visit was for a sensitive condition or a high-cost medication. Live Verify turns the **Static Statement** into a portable, private "Proof of Expense."

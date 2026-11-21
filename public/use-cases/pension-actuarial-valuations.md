---
title: "Pension Actuarial Valuations"
category: "Financial Compliance"
volume: "Very Small"
retention: "Permanent (pension plan lifecycle)"
slug: "pension-actuarial-valuations"
verificationMode: "clip"
tags: ["actuarial", "pension-funding", "retirement-security", "erisa-compliance", "pbgc", "benefit-verification", "financial-solvency", "audit-trail"]
furtherDerivations: 1
---

## What is a Pension Actuarial Valuation?

For a defined-benefit pension plan (e.g., for teachers, police, or corporate employees), an Actuarial Valuation is the formal certification of the plan's health. It answers the multi-billion dollar question: "Does the plan have enough assets today to pay for all promised retirements in the future?" The result is the Funded Status percentage (e.g., 85%).

These documents are the "Proof of Retirement Security." Fraud is high-stakes: corrupt trustees or managers might "edit" a valuation report to turn a 60% (dangerously underfunded) plan into a 90% (healthy) plan to avoid making mandatory "Catch-up Payments" or to hide a deficit during labor negotiations. Verified hashes bind the Total Liabilities, Net Assets, and Funded Ratio to the actuarial firm's domain (e.g., `mercer.com` or `wtwco.com`).

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="pension"></span>WILLIS TOWERS WATSON
Actuarial Valuation & Solvency Certification
═══════════════════════════════════════════════════════════════════

Plan:          METRO TEACHERS RETIREMENT FUND
Plan ID:       #992288-XJ
Valuation ID:  VAL-2026-8844
Date:          MARCH 15, 2026

This document certifies the actuarial status of the Plan
as of the measurement date of January 1, 2026.

FUNDING SUMMARY
───────────────────────────────────────────────────────────────────
Total Actuarial Accrued Liability (AAL):    $ 1,250,000,000.00
Actuarial Value of Assets (AVA):            $ 1,031,250,000.00
───────────────────────────────────────────────────────────────────
CERTIFIED FUNDED STATUS:                                   82.5 %

"Based on the assumptions stated in the full report, the Plan's
current funding level meets the requirements of ERISA and the PBGC."

                                    ───────────────────────────────
                                    Robert J. Miller, FSA, MAAA
                                    Enrolled Actuary #992288

<span data-verify-line="pension">verify:wtwco.com/v</span> <span verifiable-text="end" data-for="pension"></span></pre>
</div>

## The Problem: Asset Padding Fraud

- **Liability Shrinking:** Manually editing a "$1.2B" liability into a "$1.0B" liability on a PDF.
- **Assumption Tampering:** Changing a 7% interest-rate assumption to 9% to make the plan look artificially healthy.
- **Date Stretching:** Presenting a 2023 valuation as if it were the "Current" 2026 record.

## What Is Checked

Plan ID number, plan name, valuation date, total accrued liability, net actuarial assets, funded status percentage, discount rate (interest rate) assumption, Enrolled Actuary ID, date of signature, signing firm name.

**Document Types:**
- **Actuarial Valuation Summary:** The primary 1-page financial summary.
- **Form 5500 Schedule SB:** The federal tax filing for pensions.
- **PBGC Premium Payment Confirmation:** Proof of federal insurance.
- **Participant Benefit Statement:** (Linked hash) for individual workers.

## What the Checker Sees

Shows the issuer domain (`mercer.com`, `milliman.com`, `wtwco.com`) and the solvency standing.

**Status Indications:**
- **Verified / Funded** — The valuation matches the firm's original audit record.
- **Under-Funded Alert** — The plan has dropped below mandatory safety levels (e.g., 80%).
- **Assumption Mismatch** — The discount rate on the paper differs from the certified digital record.
- **Revoked** — The actuary has withdrawn the valuation (e.g., due to discovered accounting errors).

## Who Holds It

The Plan Trustees / CFO benefits from verification.

**Labor Negotiations:** When negotiating a new union contract, the management provides the verified hash of the pension valuation. The union can instantly see "VERIFIED 82.5% FUNDED" on their phone, removing the doubt that management is "Hiding a Deficit" or "Low-balling" the plan's health to avoid pay raises.

**Public Transparency:** A city government can post the verified "Pension Health Hash" on its public website. This provides citizens and bond-holders with the cryptographic proof that the city's long-term debts are accurately reported.

## Who Checks It

**Labor Unions / Employee Groups**
**Security Audit:** A union representative scans the valuation summary posted in the breakroom. Verification ensures the version they were given is the *exact* same text the professional actuary signed, protecting the workers' future retirement.

**Pension Benefit Guaranty Corp (PBGC / Regulators)**
**Compliance Audit:** Verifying that thousands of private-sector plans are accurately reporting their liabilities. Live Verify ensures that the "Paper Filings" in the PBGC office haven't been "Edited" to hide a funding gap.

**Municipal Bond Investors**
**Risk Due Diligence:** Before buying a city's bonds, an investor scans the verified pension hashes. This ensure the "Off-Balance-Sheet Liability" of the pension fund is an authentic fact, protecting the investor from a "Hidden Default."

## Who Issues It

**Issuer Types** (First Party)

**National Actuarial Consulting Firms.**
**State Department of Retirement Systems.**
**Independent Plan Auditors.**

**Privacy Salt:** Highly Critical. Pension plan asset details and actuarial math are sensitive financial data. The hash must be salted and access restricted to authorized plan participants and regulators.

## Authority Chain

**Pattern:** Regulated

Actuaries calculate pension fund obligations at a specific valuation date.

```
✓ actuary.example-consultants.co.uk/pension/verify — Values pension fund obligations
  ✓ frc.org.uk/actuaries — Regulates UK actuarial standards and practice
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Rationale

Pensions are the "Lifetime Promises" of the economy. By turning technical valuations into verifiable digital bridges, we protect the retirement security of millions and ensure that "Solvency" is based on the digital truth of the math, not the creative editing of a trustee.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).

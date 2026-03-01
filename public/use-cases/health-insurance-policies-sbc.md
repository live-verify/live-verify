---
title: "Health Insurance Summary of Benefits (SBC)"
category: "Personal Lines Insurance"
volume: "Medium"
retention: "Policy term + 7 years"
slug: "health-insurance-policies-sbc"
tags: ["health-insurance", "sbc", "aca-compliance", "summary-of-benefits", "coverage-verification", "healthcare-reform", "medical-policy"]
furtherDerivations: 1
---

## What is an SBC?

Under the Affordable Care Act (ACA), every health insurance plan must provide a **Summary of Benefits and Coverage (SBC)**. It is a standardized 8-page document that allows you to compare plans fairly ("Apples to Apples").

It lists your **Deductible**, your **Copay**, and what you pay for an **ER visit**.

Fraud happens during the sales process: some brokers edit the SBC PDF to show a "$500 Deductible" when the actual plan has a "$5,000 Deductible." Verified hashes turn the SBC into a live link to the insurer's official filing, ensuring you are buying the coverage you were promised.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <span verifiable-text="start" data-for="health-sbc">[</span>
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;">AETNA HEALTH
Summary of Benefits and Coverage (SBC)
═══════════════════════════════════════════════════════════════════

Form #: SBC-2026-NY-99

PLAN: BRONZE PPO 1000
Coverage for: Individual & Family
Plan Period: 01/01/26 - 12/31/26

This is only a summary. For more information, see www.aetna.com.

COVERAGE SUMMARY
───────────────────────────────────────────────────────────────────
Important Questions                                        Answers
───────────────────────────────────────────────────────────────────
Individual Deductible?        $ 1,000 In-network / $ 5,000 Out
Out-of-Pocket Limit?          $ 8,500 In-network / $ 15,000 Out
Network Provider?             Yes. See Aetna Open Access Network.

This SBC is a verified extract of the Aetna Bronze PPO policy
filed with the NY Dept of Financial Services.

</pre>
<span data-verify-line="health-sbc">verify:aetna.com/sbc/v</span> <span verifiable-text="end" data-for="health-sbc">]</span>
</div>

## Data Verified

Plan name, network ID, individual/family deductibles, out-of-pocket maximums, primary care copay, specialist copay, emergency room fees, pharmacy tiers, policy effective/expiration dates, state of filing.

**Document Types:**
- **Summary of Benefits and Coverage (SBC):** Standardized 8-page ACA disclosure.
- **Certificate of Coverage:** The full legal policy book.
- **Evidence of Coverage (EOC):** Specific to Medicare Advantage plans.
- **Glossary of Health Coverage:** Standardized federal terminology.

## Data Visible After Verification

Shows the issuer domain (`aetna.com`, `anthem.com`, `uhc.com`) and the plan status.

**Status Indications:**
- **Current** — Plan is verified and matches the federal/state filing.
- **Superseded** — **ALERT:** Plan terms were amended mid-year; view new SBC.
- **Recalled** — Plan withdrawn from the market.
- **Disputed** — Specific benefit trigger being challenged by regulators.

## Second-Party Use

The **Policyholder** (second party) receives the Summary of Benefits and Coverage from the insurer (first party), **keeps it**, and may later hand it to third parties for various reasons, or never do so.

**Personal Record:** They have their own verified copy of their coverage details. Most of the time, the SBC sits in their insurance folder—the verification value is latent, there *if needed*.

**Peace of Mind:** They can confirm at any time that the deductibles and copays match what the insurer's system recorded and what was filed with state regulators.

**Future Optionality:** If a dispute arises—whether about coverage denials, billing errors, or network status—they have cryptographic proof ready without needing to contact the insurer.

## Third-Party Use

The policyholder (second party) may hand the verified document to various third parties:

**Healthcare Providers (Hospitals)**
**Revenue Cycle Management:** Instantly verifying the "Deductible" and "Out-of-Pocket" limits before scheduling a $20,000 procedure. Live Verify connects the hospital's billing system directly to the insurer's verified plan definitions.

**HR / Benefit Platforms**
**Automated Onboarding:** Using the SBC hash to automatically populate the benefit details into a new employee's portal, ensuring zero data-entry errors.

**Mortgage Lenders**
**Expense Audit:** Verifying the "Family Deductible" amount when calculating a borrower's emergency reserve requirements.

## Verification Architecture

**The "Standardized Confusion" Fraud Problem**

- **Deductible Lowering:** Editing a $5,000 deductible PDF to read $500 to trick a hospital into providing care without an upfront deposit.
- **Network Misrepresentation:** editing the "Network" section to include a prestigious hospital system that isn't actually part of the plan.
- **Outdated SBCs:** A broker using a 2024 SBC to sell a 2026 plan that has significantly worse coverage.

**Issuer Types (First Party)**

- Health Insurers (Aetna, Blue Cross, Kaiser)
- State Insurance Commissioners (e.g., NY DFS, CA CDI - who approve the filings)
- Federal Centers for Medicare & Medicaid Services (CMS)

**Privacy Salt:** Required. While SBCs contain some unique elements, they also include enumerable values—standard deductible tiers ($500, $1000, $2500, $5000), predictable copay amounts ($20, $40, $50 for common services), and publicly known plan names (Bronze, Silver, Gold, Platinum). A competitor or data aggregator could feasibly enumerate combinations to reverse-engineer market pricing strategies, subscriber demographics by zip code, or competitive positioning. Salt protects this sensitive market intelligence.

## Jurisdictional Witnessing

A jurisdiction may require health insurers to retain a **witnessing firm** for regulatory compliance. The witnessing firm:

- Receives all hashes from the insurer, and any subsequent changes to the payload as they happen—which may manifest as a new hash, a status change (current to superseded), or even a 404 (record deleted)
- Receives structured content/metadata (plan names, deductible amounts, copay tiers, network IDs, effective dates)
- Does **NOT** receive plaintext (subscriber names, member IDs, claims history)
- Provides an immutable, timestamped audit trail—available to the jurisdiction on demand, to policyholders/third parties during disputes, or as expert witness testimony in legal proceedings

This provides:
- **Non-repudiation:** Insurer cannot deny issuing the SBC or the coverage terms
- **Timestamp proof:** Plan terms existed at a specific time (critical for coverage disputes and regulatory compliance)
- **Regulatory audit:** State insurance departments or CMS can inspect the witness ledger for consumer protection violations
- **Resilience:** Verification works even if insurer's systems go down or the company is acquired

**Public Blockchain (Non-Party)**

Witnessing firms may periodically commit rollups to an inexpensive public blockchain, providing an ultimate immutability guarantee. The blockchain is a "non-party"—infrastructure, not a participant in the transaction. This creates multiple verification paths:

1. **Insurer domain** — Direct check against the issuer
2. **Witnessing firm** — Independent confirmation with timestamp
3. **Public blockchain** — Decentralized trust anchor via rollup inclusion

## Competition vs. Healthcare.gov (Federal Registry)

| Feature | Live Verify | Healthcare.gov / CMS Search | Scanned PDF SBC |
| :--- | :--- | :--- | :--- |
| **Trust Anchor** | **Domain-Bound.** Bound to the Insurer. | **Gov-Bound.** Bound to the US Gov. | **Zero.** Easily forged. |
| **Integrity** | **Binds Details.** Protects the copay $ amounts. | **Data-Only.** Doesn't verify the paper doc. | **Vulnerable.** |
| **Speed** | **Instant.** Scan the paper in the lobby. | **Slow.** Requires finding the Plan ID and navigating Gov UI. | **Instant.** |
| **Coverage** | **Universal.** Works for private "Off-Market" plans. | **Limited.** Only for Exchange-based plans. | **Full.** |

**Why Live Verify wins here:** The "Lobby Moment." Patients decide to see a doctor while standing at the front desk. They aren't going to log into a federal government database to check a copay. Live Verify turns the **Mandatory SBC Printout** into a live, trusted clinical link, ensuring the patient and the doctor are on the same page regarding costs.
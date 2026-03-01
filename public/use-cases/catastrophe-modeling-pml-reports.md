---
title: "Catastrophe Modeling and PML Reports"
category: "Actuarial & Insurance Mathematics"
volume: "Very Small"
retention: "5-10 years (capital planning)"
slug: "catastrophe-modeling-pml-reports"
tags: ["catastrophe-modeling", "pml", "actuarial", "reinsurance", "risk-management", "solvency", "rms", "air-worldwide"]
furtherDerivations: 1
---

## What is a PML Report?

A **Probable Maximum Loss (PML)** report is a "Scientific Guess" of how much money an insurance company could lose in a disaster.

A specialized firm (like RMS) uses weather data and building locations to say: "In a 1-in-100 year hurricane, you will likely lose $142 million."

This number is the lifeblood of the insurance market. Reinsurers use it to decide how much to charge for coverage. If a broker "Games the Model" (edits the PDF) to show a lower loss, they are tricking the market into taking too much risk for too little money.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <span verifiable-text="start" data-for="pml">[</span>
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;">RMS (Risk Management Solutions)
Model Version: 21.0 (RiskLink)                           March 15, 2026
═══════════════════════════════════════════════════════════════════

              PROBABLE MAXIMUM LOSS (PML) REPORT

Insured:   Global Real Estate Trust, REIT
Portfolio: US Coastal Tier 1 (142 Properties)

PML ESTIMATES
───────────────────────────────────────────────────────────────────
Return Period                                         PML (Gross)
───────────────────────────────────────────────────────────────────
1-in-100 Year (Hurricane)                           $ 142,500,000
1-in-250 Year (Hurricane)                           $ 285,000,000
1-in-500 Year (Earthquake)                          $ 412,000,000

Certified by: Robert Miller, Senior Catastrophe Modeler

</pre>
<span data-verify-line="pml">verify:rms.com/reports/v</span> <span verifiable-text="end" data-for="pml">]</span>
</div>

## Data Verified

Modeling firm name, model version (e.g., RMS RiskLink 21), portfolio ID, number of locations, specific return period estimates (100yr, 250yr, 500yr PML), average annual loss (AAL), date of run, certification status.

**Document Types:**
- **PML Summary Report:** 1-2 page extract for underwriters.
- **Detailed Loss Analysis (DLA):** Full output file.
- **Exposure Data Audit:** Verification that the building data (COPE) is accurate.

## Data Visible After Verification

Shows the issuer domain (`rms.com`, `air-worldwide.com`) and the report status.

**Status Indications:**
- **Verified** — Model run matches the firm's official record.
- **Outdated** — Model version has been retired; new run required.
- **In-Dispute** — Exposure data (COPE) found to be inaccurate.
- **Invalid** — Serial number or parameters mismatch.

## Second-Party Use

The **Insurance Broker or REIT Manager** (second party) receives the PML report from the modeling firm (first party), **keeps it**, and may later hand it to third parties for various reasons, or never do so.

**Personal Record:** They have their own verified copy of the catastrophe model results. Most of the time, the document sits in their underwriting files—the verification value is latent, there *if needed*.

**Peace of Mind:** They can confirm at any time that the PML figures match what the modeling firm's system recorded and haven't been altered.

**Future Optionality:** If questions arise—whether from reinsurers, rating agencies, or investors—they have cryptographic proof of the model results ready without needing to contact the modeling firm.

## Third-Party Use

The broker or REIT manager (second party) may hand the verified document to various third parties:

**Reinsurers**
**Capacity Allocation:** Reinsurers rely on these numbers to decide how much "Cat Limit" to deploy to a specific client. Verification prevents "Model Gaming" where a broker might manipulate parameters to show a lower PML and get a cheaper rate.

**Rating Agencies (S&P / Moody's)**
**Solvency Analysis:** Ensuring that the PMLs used in capital adequacy models are authentic and haven't been altered.

**Mortgage Lenders (Commercial)**
**Collateral Protection:** Banks lending on coastal towers verify the PML to ensure the project has enough insurance to survive a "1-in-500" event.

## Verification Architecture

**The "Model Gaming" Fraud Problem**

- **Parameter Tampering:** Manually editing the "Demand Surge" or "Storm Surge" flags in the PDF report to lower the PML by 20%.
- **Location Omission:** Deleting the most high-risk properties (e.g., Miami beach-front) from the portfolio run to artificially lower the aggregate loss number.
- **Fabricated Certificates:** Shady boutique firms claiming to use "RMS Models" but actually providing a guess-work estimate on fake letterhead.

**Issuer Types (First Party)**

- Model Vendors (RMS, AIR Worldwide, CoreLogic)
- Actuarial Consultants (Guy Carpenter, Aon Benfield, Willis Re)
- In-House Modeling Units (For large carriers like Chubb)

**Privacy Salt:** Required. Catastrophe modeling reports often contain enumerable values—round dollar amounts for PML estimates, standard return periods (100yr, 250yr, 500yr), publicly known portfolios, and model version numbers that are industry-wide. A competitor could feasibly enumerate combinations to reverse-engineer a rival's risk profile and gain unfair market intelligence. Salt protects these strategic risk assessments.

## Jurisdictional Witnessing

A jurisdiction may require catastrophe modeling firms to retain a **witnessing firm** for regulatory compliance. The witnessing firm:

- Receives all hashes from the modeling firm, and any subsequent changes to the report as they happen—which may manifest as a new hash, a status change (outdated, in-dispute), or even a 404 (record deleted)
- Receives structured content/metadata (PML values, return periods, portfolio descriptions, model versions)
- Does **NOT** receive plaintext (detailed location data, proprietary model parameters)
- Provides an immutable, timestamped audit trail—available to the jurisdiction on demand, to brokers/third parties during disputes, or as expert witness testimony in legal proceedings

This provides:
- **Non-repudiation:** Modeling firm cannot deny issuing the PML report
- **Timestamp proof:** Model results hash existed at a specific time
- **Regulatory audit:** Insurance regulators can inspect the witness ledger for market stability
- **Resilience:** Verification works even if modeling firm's systems go down

**Public Blockchain (Non-Party)**

Witnessing firms may periodically commit rollups to an inexpensive public blockchain, providing an ultimate immutability guarantee. The blockchain is a "non-party"—infrastructure, not a participant in the transaction. This creates multiple verification paths:

1. **Modeling firm domain** — Direct check against the issuer
2. **Witnessing firm** — Independent confirmation with timestamp
3. **Public blockchain** — Decentralized trust anchor via rollup inclusion

## Competition vs. API Data Feeds

| Feature | Live Verify | API Integration | Scanned PDF Report |
| :--- | :--- | :--- | :--- |
| **User Experience** | **Universal.** Scan the report in the "Submission Pack." | **Hard.** Requires complex software integration between Broker and Reinsurer. | **Instant.** |
| **Trust Anchor** | **Domain-Bound.** Bound to the Modeler. | **System-Bound.** Trust the data feed. | **Zero.** Easily forged. |
| **Interoperability** | **High.** Works across 50+ different reinsurers. | **Low.** Every firm has a different platform (Touchstone vs RiskLink). | **Universal.** |
| **Cost** | **Low.** Standard web infra. | **Very High.** Seven-figure software licenses. | **None.** |

**Why Live Verify wins here:** The "Market Cycle." In the high-speed "Renewal Season" (e.g., Jan 1), thousands of "Submission Packs" (PDFs) are emailed across the globe. Reinsurers don't have the time or tech to link APIs with every single broker. Live Verify provides **API-level trust** for the existing PDF-based workflow.

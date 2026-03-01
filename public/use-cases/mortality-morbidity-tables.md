---
title: "Mortality and Morbidity Table Certifications"
category: "Actuarial & Insurance Mathematics"
volume: "Tiny"
retention: "Permanent (industry standards)"
slug: "mortality-morbidity-tables"
tags: ["actuarial-standards", "mortality-table", "soa", "life-insurance-pricing", "valuation-manual", "actuarial-certification", "risk-modeling"]
furtherDerivations: 1
---

<div style="max-width: 600px; margin: 24px auto; font-family: 'Georgia', serif; border: 1px solid #333; background: #fff; padding: 40px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 30px;">
    <div style="font-weight: bold; font-size: 1.1em; color: #1a237e;"><span verifiable-text="start" data-for="mortality">[</span>SOCIETY OF ACTUARIES (SOA)</div>
    <div style="text-align: right; font-size: 0.8em; color: #666;">
      Standard ID: MORT-2026-V1<br>
      March 15, 2026
    </div>
  </div>
<h3 style="text-align: center; text-transform: uppercase; letter-spacing: 1px; color: #1a237e; border-bottom: 2px solid #1a237e; padding-bottom: 10px;">Certification of Standard Table</h3>
<div style="font-size: 0.95em; line-height: 1.6; text-align: justify; color: #333; margin-top: 20px;">
    <p>The Society of Actuaries hereby certifies the following mortality table for use in life insurance valuation and pricing:</p>
<div style="background: #fdfdfd; padding: 15px; border: 1px solid #eee; margin: 20px 0;">
      <p><strong>Table Name:</strong> 2026 Commissioners Standard Ordinary (CSO)</p>
      <p><strong>Basis:</strong> U.S. General Population (2020-2024 Experience)</p>
      <p><strong>Segments:</strong> Male/Female, Smoker/Non-Smoker, Ultimate/Select</p>
    </div>
<p>This table has been verified for technical accuracy and complies with the requirements of the NAIC Valuation Manual.</p>
  </div>
<div style="margin-top: 40px; display: flex; justify-content: space-between; align-items: flex-end;">
    <div style="border-top: 1px solid #000; width: 200px; padding-top: 5px; font-style: italic;">Robert Miller, FSA</div>
    <div style="text-align: right;">
      <div style="width: 60px; height: 60px; border: 2px solid #1a237e; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.6em; color: #1a237e; font-weight: bold;">SOA<br>SEAL</div>
    </div>
  </div>
<div data-verify-line="mortality" style="border-top: 1px dashed #999; margin-top: 40px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
      title="Demo only: SOA doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:soa.org/tables/v <span verifiable-text="end" data-for="mortality">]</span>
  </div>
</div>

## Data Verified

Table name (e.g., 2026 CSO), version ID, population basis (e.g., U.S. Group Life), date of certification, lead actuary name/FSA ID, specific data segments (Age/Sex/Smoker), issuing standards body, effective date for statutory use.

**Document Types:**
- **Standard Table Certification:** The primary "Stamp of Approval."
- **Actuarial Report:** (Linked hash) explaining the underlying data set.
- **Statutory Adoption Notice:** Proving the NAIC has accepted the table.
- **Experience Study Extract:** Summary of the real-world death data used.

## Data Visible After Verification

Shows the issuer domain (`soa.org`, `actuary.org`) and the table standing.

**Status Indications:**
- **Certified/Valid** — Table is authentic and current.
- **Proposed** — Under peer review; not yet for statutory use.
- **Superseded** — **ALERT:** A newer table has been released (e.g., due to COVID-era mortality shifts).
- **Recalled** — Table found to have a calculation error.

## Second-Party Use

The **Appointed Actuary (at an Insurer)** benefits from verification.

**Solvency Audit Defense:** Proving to state regulators that the reserves for a $100B life insurance block are calculated using the **Verified CSO Table**. Verification prevents "Data Drift" where an insurer accidentally uses an old or slightly altered table that artificially lowers their liability.

**Pricing Integrity:** Proving to the product development team that the "Guaranteed Premiums" are based on a verified, industry-standard risk model.

## Third-Party Use

**State Insurance Regulators (DOI)**
**Compliance Audit:** Instantly verifying that the tables used in a carrier's annual statement match the official SOA/NAIC ledger. Live Verify prevents "Table Gaming" where a company tweaks mortality rates by 0.1% to hide financial distress.

**Rating Agencies (A.M. Best)**
**Capital Modeling:** Ensuring the risk models used to assign a "Financial Strength Rating" are built on verified, non-altered actuarial standards.

**Pension Fund Trustees**
**Fiduciary Oversight:** Verifying that the mortality assumptions used to calculate pension payouts are based on verified, peer-reviewed tables.

## Verification Architecture

**The "Risk Masking" Fraud Problem**

- **Numerical Smoothing:** Manually editing a few specific ages in a mortality table PDF to make a portfolio look "Younger" or "Healthier" than it is.
- **Outdated Table Use:** Presenting a 2010 table as if it were the 2026 version to avoid accounting for increasing life expectancies (which raises costs).
- **Fabricated Standards:** Creating a fake "Actuarial Board" to certify a biased table for a predatory insurance product.

**Issuer Types** (First Party)

**Society of Actuaries (SOA).**
**American Academy of Actuaries (AAA).**
**National Association of Insurance Commissioners (NAIC).**

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


## Competition vs. Actuarial Portals (Mort.SOA.org)

| Feature | Live Verify | SOA Mortality Table Portal | Scanned PDF Memo |
| :--- | :--- | :--- | :--- |
| **Integrity** | **Cryptographic.** Binds every digit. | **Data-Only.** Doesn't protect the specific paper doc. | **Zero.** Easily forged. |
| **Trust Anchor** | **Domain-Bound.** Bound to the SOA. | **Database.** Direct from source. | **Visual.** |
| **User Access** | **Universal.** Any regulator or auditor. | **Difficult.** Requires navigating complex XLS/XML downloads. | **Instant.** |
| **Freshness** | **Real-time.** Shows if table was restated. | **Live.** | **Static.** |

**Why Live Verify wins here:** The "Audit Artifact" reality. Actuaries work with "Static Reports" (PDFs) that are signed and archived for decades. They don't have the time to download fresh XML data for every audit check. Live Verify turns the **Signed Actuarial Opinion** into a live digital anchor, ensuring the "Risk DNA" of the insurance industry is verified at every handoff.

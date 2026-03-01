---
title: "Sponsorship Affidavits (I-864)"
category: "Immigration & Visa Documents"
volume: "Medium"
retention: "Permanent (until citizenship or 10 years of work)"
slug: "sponsorship-affidavits-i864"
tags: ["immigration", "i-864", "affidavit-of-support", "uscis", "visa-sponsorship", "public-charge", "legal-contract", "financial-sponsorship"]
furtherDerivations: 1
---

## What is an I-864 Affidavit of Support?

The **I-864 Affidavit of Support** is a legally binding contract between a US sponsor and the US government. By signing it, the sponsor agrees to financially support an immigrant so they don't become a "Public Charge" (dependent on government welfare). If the immigrant receives certain public benefits, the government can sue the sponsor for reimbursement.

These documents are high-stakes legal instruments. Fraud is common: people often "Photoshop" an I-864 to inflate their income (to meet the poverty guidelines) or to forge a signature from a wealthy relative who never actually agreed to be a sponsor. Verified hashes bind the **Sponsor Name, Income Level, and Beneficiary Name** to the `uscis.gov` domain.

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 1px solid #ccc; background: #fff; padding: 40px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #000; padding-bottom: 15px; margin-bottom: 30px;">
    <div>
      <div style="font-weight: bold; font-size: 1.2em;"><span verifiable-text="start" data-for="i864">[</span>U.S. Citizenship and Immigration Services</div>
      <div style="font-size: 0.85em;">Department of Homeland Security</div>
    </div>
    <div style="width: 50px; height: 50px; background: #eee; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 0.7em; text-align: center;">DHS<br>SEAL</div>
  </div>
<h3 style="margin-top: 0; text-align: center; text-transform: uppercase; letter-spacing: 1px;">Affidavit of Support (Form I-864)</h3>
<div style="font-size: 0.95em; line-height: 1.6; color: #333;">
    <p><strong>Part 1. Basis for Filing:</strong> I am the petitioning sponsor.</p>
<div style="background: #f9f9f9; padding: 15px; border: 1px solid #ddd; margin: 20px 0;">
      <p><strong>Sponsor:</strong> <strong>ROBERT J. MILLER</strong><br>
      <strong>Beneficiary:</strong> SARAH JANE DOE<br>
      <strong>Household Size:</strong> 3</p>
<p><strong>Most Recent Year Income:</strong> $ 78,450.00<br>
      <strong>Total Assets:</strong> $ 125,000.00</p>
    </div>
<p style="font-size: 0.85em; font-style: italic; color: #666;">
      I certify under penalty of perjury that this affidavit and all evidence submitted with it is true and correct. I authorize the release of any information from my records that USCIS determines is necessary.
    </p>
  </div>
<div style="margin-top: 40px; border-top: 1px dashed #999; padding-top: 10px; text-align: center;">
    <div data-verify-line="i864" style="font-family: 'Courier New', monospace; font-size: 0.8em; color: #000; font-weight: bold;"
      title="Demo only: USCIS doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:uscis.gov/v/i864 <span verifiable-text="end" data-for="i864">]</span>
    </div>
    <div style="font-size: 0.7em; color: #999; margin-top: 10px; font-style: italic;">
      Scan to verify sponsorship authenticity and income threshold compliance.
    </div>
  </div>
</div>

## Data Verified

Sponsor name, beneficiary name, household size, most recent tax-year income, total assets (if used for qualification), date of signature, sponsor's citizenship status, case receipt number.

**Document Types:**
- **I-864 Affidavit of Support:** The primary long-form contract.
- **I-864A Contract Between Sponsor and Household Member:** (Linked hash) for joint income.
- **I-864EZ:** Simplified version for certain sponsors.
- **IRS Tax Transcript:** (Linked hash) proving the income stated on the I-864.

## Data Visible After Verification

Shows the issuer domain (`uscis.gov`) and the contract standing.

**Status Indications:**
- **Verified / Enforceable** — Contract is on file and meets poverty guidelines.
- **Income Mismatch** — **ALERT:** The income on the paper does not match the verified tax record.
- **Revoked** — **ALERT:** The sponsor has attempted to withdraw the petition (restricted).
- **Superseded** — A newer sponsor has been added to the case.

## Second-Party Use

The **Immigrant (Beneficiary)** benefits from verification.

**Visa Interview Confidence:** At a consular interview, the beneficiary shows the verified hash of their sponsor's I-864. The officer can instantly see **"VERIFIED INCOME: $78,450"** directly from USCIS records, removing the common "Consular Suspicion" that leads to 221(g) administrative processing delays.

**Public Benefit Defense:** If an immigrant is wrongly accused of being a "Public Charge," they can provide the verified sponsorship hash to prove they have a solvent legal backer who is responsible for their support.

## Third-Party Use

**Consular Officers / Consulates**
**Fraud Detection:** Thousands of fake I-864s are submitted globally every year. Live Verify connects the officer directly to the US-based record in seconds, stopping "Immigration Consultant" scams where fake sponsors are sold to applicants.

**State Welfare Agencies**
**Asset Recovery:** If an immigrant applies for Medicaid or SNAP, the state agency scans the I-864 hash. They can identify the sponsor and initiate a reimbursement claim against them for the cost of the benefits provided.

**Attorneys / Non-Profits**
**Case Management:** Verifying that the client's sponsor actually meets the 125% Poverty Guidelines before submitting the final green card packet.

## Verification Architecture

**The "Income Padding" Fraud Problem**

- **Threshold Inflation:** Changing a $20,000 income to $45,000 on a PDF to bypass the poverty line.
- **Signature Forgery:** Using a high-end printer to place a relative's signature on an affidavit they never saw.
- **Stale Data:** Presenting a 2023 tax return as if it were the "Most Recent" 2025 record.

**Issuer Types** (First Party)

**U.S. Citizenship and Immigration Services (USCIS).**
**Department of State (DOS) Consular Posts.**

**Privacy Salt:** Highly Critical. Sponsor income and PII are protected under the Privacy Act. The hash must be salted to prevent "Income Enumeration" attacks against the US population.

## Rationale

Sponsorship is the "Financial Safety Net" of immigration. By turning the I-864 into a verifiable digital bridge, we ensure that the US government can hold sponsors accountable and that legitimate families can move through the visa process without unfair delays.

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

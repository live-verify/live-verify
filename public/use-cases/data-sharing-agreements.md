---
title: "Data Sharing Agreements (DSA)"
category: "Scientific & Research"
volume: "Very Small"
retention: "7-20 years (IP/legal)"
slug: "data-sharing-agreements"
tags: ["data-governance", "dsa", "research-agreement", "gdpr-compliance", "privacy-policy", "academic-collaboration", "legal-contract"]
furtherDerivations: 1
---

## What is a Data Sharing Agreement?

When universities or hospitals share sensitive data (like DNA sequences or patient records) for research, they sign a **Data Sharing Agreement (DSA)**.

This contract is the "Legal Firewall." It says: "You can use this data for cancer research, but you are **not** allowed to sell it or try to identify the people in it."

Ethics violations are common: researchers sometimes use data for a different purpose than they promised. Verified hashes allow compliance officers to verify the **exact authorized use** of a dataset, protecting patient privacy across international borders.

<div style="max-width: 600px; margin: 24px auto; font-family: 'Times New Roman', Georgia, serif; border: 1px solid #ccc; background: #fff; padding: 40px; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
  <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #000; padding-bottom: 10px;">
    <div style="font-weight: bold; font-size: 1.2em;"><span verifiable-text="start" data-for="dsa">[</span>DATA SHARING & USE AGREEMENT</div>
    <div style="font-size: 0.9em; margin-top: 5px;">OXFORD UNIVERSITY - RESEARCH SERVICES</div>
  </div>
<div style="font-size: 1em; line-height: 1.6; color: #333; text-align: justify;">
    <p>This Agreement governs the transfer of Data from the <strong>Provider:</strong> Oxford University to the <strong>Recipient:</strong> Stanford Medical Research Center.</p>
<p><strong>Dataset ID:</strong> OX-BIO-2026-992 (Genomic Sequences)<br>
    <strong>Authorized Use:</strong> Cancer Research Initiative only.<br>
    <strong>Restrictions:</strong> No re-identification; No third-party transfer.</p>
<p><strong>Execution Date:</strong> March 15, 2026<br>
    <strong>Termination Date:</strong> March 14, 2031</p>
  </div>
<div style="margin-top: 40px; display: flex; justify-content: space-between; align-items: flex-end;">
    <div style="width: 45%;">
      <div style="border-top: 1px solid #000; padding-top: 5px; font-style: italic;">Prof. Albus Dumbledore</div>
      <div style="font-size: 0.8em; color: #777;">Authorized Signatory (Oxford)</div>
    </div>
    <div style="width: 45%; text-align: right;">
      <div style="width: 80px; height: 80px; border: 2px solid #000; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.6em; font-weight: bold; margin-left: auto;">RESEARCH<br>OFFICE</div>
    </div>
  </div>
<div data-verify-line="dsa" style="border-top: 1px dashed #999; margin-top: 40px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
      title="Demo only: University doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:ox.ac.uk/legal/v <span verifiable-text="end" data-for="dsa">]</span>
  </div>
</div>

## Data Verified

Provider institution name, Recipient institution name, Dataset ID/Title, specific Authorized Use (Scope), execution date, termination/expiration date, data protection status (e.g., GDPR compliant), authorized signatories.

**Document Types:**
- **Data Sharing Agreement (DSA):** The primary legal contract.
- **Material Transfer Agreement (MTA):** For biological/physical samples.
- **Data Use Certification (DUC):** For individual researchers.
- **Privacy Impact Assessment (PIA):** (Linked hash) proving risk review.

## Data Visible After Verification

Shows the issuer domain (`ox.ac.uk`, `stanford.edu`) and agreement status.

**Status Indications:**
- **Active** — Agreement is fully executed and in effect.
- **Expired** — Data use period has ended; data must be destroyed.
- **Revoked** — Permission pulled due to a security breach or misuse.
- **Amended** — Replaced by a newer version (e.g., scope expanded).

## Second-Party Use

The **Data Recipient** (Researcher) benefits from verification.

**Grant Funding:** Proving to a funding agency (e.g., NIH or Wellcome Trust) that they have "Verified Legal Access" to the necessary dataset. This prevents delays in grant disbursement.

**Publication Integrity:** Providing a verified link to the DSA in a published paper, proving the research was conducted under an official, institutional agreement.

## Third-Party Use

**University Compliance Officers**
**Portfolio Audit:** Instantly verifying that all outgoing datasets are covered by active, non-expired agreements. Live Verify allows for a "Digital Census" of physical/PDF legal files.

**GDPR / Privacy Regulators**
**Chain of Custody:** If a data breach occurs, regulators can verify the "Authorized Use" and "Restrictions" of the original agreement to determine which party is liable.

**Collaborating Journals**
**Ethical Review:** Ensuring that the authors of a study had the legal right to use the data before publishing the results.

## Verification Architecture

**The "Data Misuse" Fraud Problem**

- **Scope Creep:** A researcher having a DSA for "Diabetes Research" but using the data for "Insurance Modeling" (a common ethics violation).
- **Unauthorized Transfers:** A recipient sharing the data with a third-party company without the provider's knowledge.
- **Fabricated DSAs:** Creating a fake agreement PDF to bypass institutional IRB (Ethics Board) review.

**Issuer Types** (First Party)

**Universities / Research Institutes:** (Oxford, Stanford, Max Planck).
**Medical Centers / Biobanks.**
**Tech Platforms:** (e.g., Vivli, Sage Bionetworks - who host shared data).

**Privacy Salt:** Highly critical. DSAs often involve sensitive health or genetic data labels. The hash must be salted to prevent "Guess-and-Check" searches for specific clinical trial involvements.

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


## Competition vs. CLM Systems (Ironclad)

| Feature | Live Verify | CLM (Contract Lifecycle Mgmt) | Scanned PDF |
| :--- | :--- | :--- | :--- |
| **Trust Anchor** | **Domain-Bound.** Bound to the University. | **System-Bound.** Trust the CLM vendor. | **Zero.** Easily forged. |
| **Interoperability** | **Universal.** PDFs work across institutions. | **Low.** Hard to verify if you don't use the same CLM. | **Universal.** |
| **Integrity** | **Binds Scope.** Protects the "Authorized Use" text. | **Data-Only.** | **Vulnerable.** |
| **Cost** | **Low.** Standard web infra. | **Very High.** Enterprise software fees. | **None.** |

**Why Live Verify wins here:** The "Institutional Handoff." Oxford uses one system, Stanford uses another. They don't want to grant each other access to their private legal systems. Live Verify turns the **Final Signed PDF** into a portable, verifiable artifact that works across the "Institutional Divide" without any software integration.

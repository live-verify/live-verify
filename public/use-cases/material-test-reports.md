---
title: "Material Test Reports (MTR / Mill Certs)"
category: "Product Certifications & Compliance"
volume: "Small"
retention: "10-30 years (structural integrity)"
slug: "material-test-reports"
tags: ["mtr", "mill-certificate", "steel-testing", "material-science", "structural-integrity", "asme-compliance", "metallurgy", "supply-chain-traceability"]
furtherDerivations: 1
---

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <span verifiable-text="start" data-for="mtr">[</span>
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;">SHEFFIELD STEEL FORGE, LTD.
═══════════════════════════════════════════════════════════════════

              CERTIFIED MATERIAL TEST REPORT (CMTR)

Customer:     Apex Structural Engineering   Report #: MTR-2026-042
Heat Number:  HEAT-992288-X                 Date:     15 MAR 2026

MATERIAL SPECIFICATION: ASTM A36 / ASME SA36
───────────────────────────────────────────────────────────────────
Product:  Structural Steel I-Beam (12" x 24')
Quantity: 120 Pieces

TEST RESULTS
───────────────────────────────────────────────────────────────────
Element / Test                         Result          Limit (Max)
───────────────────────────────────────────────────────────────────
Carbon (C)                              0.24%               0.26%
Yield Strength                     38,500 PSI         36,000 (Min)

We hereby certify that the material has been tested and found to
be in compliance with the above listed specifications.

</pre>
<span data-verify-line="mtr">verify:sheffield-steel.co.uk/mtr/v</span> <span verifiable-text="end" data-for="mtr">]</span>
</div>

## Data Verified

Manufacturer name (the Mill), Heat Number (unique batch ID), material grade (e.g., ASTM A36), chemical composition (% of C, Mn, P, S), mechanical properties (Yield Strength, Tensile Strength, Elongation), test date, technician name, issuing lab domain.

**Document Types:**
- **Mill Test Report (MTR):** The primary birth certificate for metal.
- **Concrete Cylinder Test:** Proving curing strength at 7/28 days.
- **Weld Inspection Report:** (Linked hash) proving joint integrity.
- **Positive Material Identification (PMI):** Field verification of alloys.

## Data Visible After Verification

Shows the issuer domain (the Mill or Testing Lab) and current batch standing.

**Status Indications:**
- **Certified** — Data matches the mill's official furnace ledger.
- **Retracted** — **ALERT:** Post-shipment testing found a structural flaw in this heat.
- **Superseded** — Corrected report issued (e.g., due to typo in chemical list).
- **Invalid** — Heat number or signature mismatch.

## Second-Party Use

The **Structural Engineer / Fabricator** (second party) receives the material test report from the mill (first party), **keeps it**, and may later hand it to third parties for various reasons, or never do so.

**Personal Record:** They have their own verified copy of what steel they purchased and its certified properties. Most of the time, the document sits in their project files—the verification value is latent, there *if needed*.

**Peace of Mind:** They can confirm at any time that the MTR matches what the mill's system recorded and hasn't been altered since they received it.

**Future Optionality:** If a structure fails 20 years later or a project inspection is challenged, they have cryptographic proof ready without needing to contact the mill.

## Third-Party Use

The structural engineer / fabricator (second party) may hand the verified document to various third parties:

**Building Inspectors / DOT Officers**
**Field Audit:** Walking through a job-site trailer, the inspector scans the MTRs. "Verified by Sheffield-Steel" ensures the contractor isn't using "Ghost MTRs" to hide the use of cheap, un-vetted imported steel in a critical load-bearing bridge.

**Banks / Inventory Lenders**
**Collateral Vetting:** Verifying the "Grade" and "Quality" of steel inventory before using it as collateral for a high-value loan.

**Aerospace / Defense Procurement**
**Traceability:** Ensuring 100% verified material origin for flight-critical components.

## Verification Architecture

**The "Ghost Steel" Fraud Problem**

- **Heat Number Forgery:** Laser-etching a "Premium" heat number onto a "Scrap" grade beam and creating a fake paper MTR to match.
- **Data Smoothing:** Editing a PDF to change a "0.28% Carbon" (Fail) to "0.24% Carbon" (Pass) to avoid scrapping a $50,000 batch of steel.
- **Mill Impersonation:** Small distributors creating fake MTRs on the letterhead of famous mills like Nucor or ArcelorMittal to sell un-vetted inventory.

**Issuer Types (First Party)**

- Steel Mills / Foundries (e.g., Nucor, Nippon Steel, ArcelorMittal)
- Independent Testing Labs (ISO 17025 accredited)
- Material Aggregators (e.g., MetalTrace, Steelpoint - hosting the hashes)

**Privacy Salt:** Required. Unlike documents with many unpredictable variables, material test reports often contain enumerable values—common alloy grades (A36, A572), round test numbers (yield strength in standard PSI increments), and publicly known heat number patterns. A competitor could feasibly enumerate combinations to reverse-engineer a mill's production batches and gain unfair market intelligence. Salt protects these trade secrets.

## Jurisdictional Witnessing

A jurisdiction may require mills and testing labs to retain a **witnessing firm** for regulatory compliance. The witnessing firm:

- Receives all hashes from the mill, and any subsequent changes to the payload as they happen—which may manifest as a new hash, a status change, or even a 404 (record deleted)
- Receives structured content/metadata (heat numbers, material grades, test results, dates)
- Does **NOT** receive plaintext (customer names, project details, proprietary alloy formulas)
- Provides an immutable, timestamped audit trail—available to the jurisdiction on demand, to fabricators/third parties during disputes, or as expert witness testimony in legal proceedings

This provides:
- **Non-repudiation:** Mill cannot deny issuing the certificate
- **Timestamp proof:** Hash existed at a specific time
- **Regulatory audit:** Building code authorities can inspect the witness ledger
- **Resilience:** Verification works even if mill's systems go down

**Public Blockchain (Non-Party)**

Witnessing firms may periodically commit rollups to an inexpensive public blockchain, providing an ultimate immutability guarantee. The blockchain is a "non-party"—infrastructure, not a participant in the transaction. This creates multiple verification paths:

1. **Mill domain** — Direct check against the issuer
2. **Witnessing firm** — Independent confirmation with timestamp
3. **Public blockchain** — Decentralized trust anchor via rollup inclusion

## Competition vs. EDI / Blockchain (MetalBlock)

| Feature | Live Verify | Metal-Specific Blockchain | Paper Mill Cert |
| :--- | :--- | :--- | :--- |
| **Field Access** | **Instant.** Scan the paper at the yard. | **Difficult.** Requires yard workers to have private node access. | **Instant.** |
| **Trust Anchor** | **Domain-Bound.** Bound to the Mill. | **Consensus-Bound.** Trust the network. | **Zero.** Easily forged. |
| **Interoperability** | **Universal.** PDFs work across all fabricators. | **Low.** Requires every link in the chain to use the same blockchain. | **Universal.** |
| **Integrity** | **Binds Content.** Protects the chemical list. | **Data-Only.** | **Vulnerable.** |

**Why Live Verify wins here:** The "Construction Yard" reality. Steel is heavy, dirty, and moves through a complex web of small fabricators and job-sites. They all work with paper and PDFs. Live Verify turns the **Mandatory Paper Certificate** into a live digital anchor, bringing "Blockchain-level" integrity to the world of heavy metal without the massive IT overhead.

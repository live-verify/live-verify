---
title: "Material Test Reports (MTR / Mill Certs)"
category: "Product Certifications & Compliance"
volume: "Small"
retention: "10-30 years (structural integrity)"
slug: "material-test-reports"
verificationMode: "clip"
tags: ["mtr", "mill-certificate", "steel-testing", "material-science", "structural-integrity", "asme-compliance", "metallurgy", "supply-chain-traceability"]
furtherDerivations: 1
---

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <span verifiable-text="start" data-for="mtr"></span>
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
<span data-verify-line="mtr">verify:sheffield-steel.co.uk/mtr/v</span> <span verifiable-text="end" data-for="mtr"></span>
</div>

## The Problem: Ghost Steel Fraud

- **Heat Number Forgery:** Laser-etching a "Premium" heat number onto a "Scrap" grade beam and creating a fake paper MTR to match.
- **Data Smoothing:** Editing a PDF to change a "0.28% Carbon" (Fail) to "0.24% Carbon" (Pass) to avoid scrapping a $50,000 batch of steel.
- **Mill Impersonation:** Small distributors creating fake MTRs on the letterhead of famous mills like Nucor or ArcelorMittal to sell un-vetted inventory.

## What Is Checked

Manufacturer name (the Mill), Heat Number (unique batch ID), material grade (e.g., ASTM A36), chemical composition (% of C, Mn, P, S), mechanical properties (Yield Strength, Tensile Strength, Elongation), test date, technician name, issuing lab domain.

**Document Types:**
- **Mill Test Report (MTR):** The primary birth certificate for metal.
- **Concrete Cylinder Test:** Proving curing strength at 7/28 days.
- **Weld Inspection Report:** (Linked hash) proving joint integrity.
- **Positive Material Identification (PMI):** Field verification of alloys.

## What the Checker Sees

Shows the issuer domain (the Mill or Testing Lab) and current batch standing.

**Status Indications:**
- **Certified** — Data matches the mill's official furnace ledger.
- **Retracted** — Post-shipment testing found a structural flaw in this heat.
- **Superseded** — Corrected report issued (e.g., due to typo in chemical list).
- **Invalid** — Heat number or signature mismatch.

### Scope enrichment: which heat, and how much of it

An MTR certifies a specific *heat* (furnace batch). A real MTR for a good heat used to cover material
from a different, cheaper one is the classic substitution fraud. An MTR carries no personal data, so on
verification the mill can safely echo the heat scope — `heat_covered`, `quantity_certified`, and
`tested_on` — so a buyer can confirm the steel in their hands falls within the certified heat and
quantity, not merely that *some* heat with that number passed. Safe enrichment: no personal data,
revealing the scope the terse claim withheld (see
[safety-certifications](safety-certifications.md) and
[verification-enrichment-hazards.md](../../docs/verification-enrichment-hazards.md)).

## Who Holds It

The Structural Engineer / Fabricator (second party) receives the material test report from the mill (first party), keeps it, and may later hand it to third parties for various reasons, or never do so.

**Personal Record:** They have their own verified copy of what steel they purchased and its certified properties. Most of the time, the document sits in their project files—the verification value is latent, there *if needed*.

**Peace of Mind:** They can confirm at any time that the MTR matches what the mill's system recorded and hasn't been altered since they received it.

**Future Optionality:** If a structure fails 20 years later or a project inspection is challenged, they have cryptographic proof ready without needing to contact the mill.

## Who Checks It

The structural engineer / fabricator (second party) may hand the verified document to various third parties:

**Building Inspectors / DOT Officers**
**Field Audit:** Walking through a job-site trailer, the inspector scans the MTRs. "Verified by Sheffield-Steel" ensures the contractor isn't using "Ghost MTRs" to hide the use of cheap, un-vetted imported steel in a critical load-bearing bridge.

**Banks / Inventory Lenders**
**Collateral Vetting:** Verifying the "Grade" and "Quality" of steel inventory before using it as collateral for a high-value loan.

**Aerospace / Defense Procurement**
**Traceability:** Ensuring 100% verified material origin for flight-critical components.

## Who Issues It

**Issuer Types (First Party)**

- Steel Mills / Foundries (e.g., Nucor, Nippon Steel, ArcelorMittal)
- Independent Testing Labs (ISO 17025 accredited)
- Material Aggregators (e.g., MetalTrace, Steelpoint - hosting the hashes)

**Privacy Salt:** Required. Unlike documents with many unpredictable variables, material test reports often contain enumerable values—common alloy grades (A36, A572), round test numbers (yield strength in standard PSI increments), and publicly known heat number patterns. A competitor could feasibly enumerate combinations to reverse-engineer a mill's production batches and gain unfair market intelligence. Salt protects these trade secrets.

## Authority Chain

**Pattern:** Regulated

Steel mills and testing labs issue material test reports certified against EN 10204 and ASTM.

```
✓ mtr.example-steelmill.com — Tests material properties and certifies test reports
  ✓ ukas.com — Accredits UK testing laboratories
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Where Each Fits: Live Verify and Mill-to-Customer Data Links

Some steel mills send test data to their major customers electronically, through EDI links or industry shared-ledger projects. These links are set up between the mill and particular customers, and they move structured data cleanly between their systems. They and Live Verify answer different questions and work side by side: one connects the mill to its direct customers, the other lets anyone further down the chain confirm the mill certificate they have been handed.

| | EDI link or shared ledger | Live Verify on the mill test report | Paper mill certificate |
| :--- | :--- | :--- | :--- |
| **Who can check** | The mill's connected customers, and participants on the ledger. | Anyone handed the certificate: a fabricator, a distributor, a site inspector, an engineer of record. | Whoever reads it. |
| **What the checker gets** | Test data in their own systems, as sent by the mill. | Confirmation that the mill issued this exact certificate, heat number and chemical and mechanical results included, as at its date, and whether it has since been withdrawn. | A certificate whose results may have been edited. |
| **What the supplier shares** | Data over the link. | Only the certificate that travels with the material. | Only the certificate that travels with the material. |
| **Reach** | Parties connected to that link or ledger. | Global in principle: any mill, in any country, that publishes hashes on its own domain. | Anywhere, but untrusted. |
| **Speed and cost** | Automatic once set up; setup takes integration on both sides. | A few seconds per check: one web lookup, with no fee to the standard. Needs a data connection at the yard. | Immediate. |
| **What it needs** | Every link in the chain on the same system. | The mill to publish hashes, and Live Verify-aware software on the checker's device. No mill does this yet. | Nothing. |
| **Best suited to** | Mills and their major customers. | Small fabricators and inspectors further down the chain. | Nothing where structural safety depends on it. |

**Where each fits:** Where a mill and its major customers have EDI or a shared ledger in place, test data moves between their systems cleanly and those links are worth keeping. Further down the chain, small fabricators and site inspectors receive the mill certificate as paper or PDF and have no access to that infrastructure. Live Verify lets them check the certificate against the mill's domain at the yard, extending the reach of the mill's data instead of competing with it.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).

---
title: "Pest Inspection Certificates (WDI)"
category: "Real Estate & Property"
volume: "Large"
retention: "3-7 years (statute of limitations / warranty period)"
slug: "pest-inspection-certificates"
tags: ["real-estate", "pest-inspection", "wdi-report", "termite-certificate", "closing-documents", "mortgage-fraud", "property-disclosure", "structural-integrity"]
furtherDerivations: 1
---

## What is a Pest Inspection Certificate?

In the real estate world, the **Wood Destroying Insect (WDI)** report (commonly called a "Termite Certificate") is a critical closing document. It is a formal certification by a licensed inspector stating whether a house has active infestations or past structural damage from termites, carpenter ants, or beetles.

Because a "Positive" finding can kill a home sale or require a $5,000 treatment, these reports are primary targets for fraud. Sellers often "edit" a report to turn "Active Infestation" into "None Found," or they "delete" a section that mentions $10,000 in hidden structural damage. Verified hashes bind the **Property Address, Inspection Findings, and Inspector's License** to the inspection firm's or the state board's domain (e.g., `orkin.com` or `pest-registry.gov`).

<div style="max-width: 650px; margin: 24px auto; font-family: 'Times New Roman', Times, serif; border: 1px solid #333; background: #fff; padding: 40px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <div style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 30px;">
    <div style="font-weight: bold; font-size: 1.4em; color: #004d40;"><span verifiable-text="start" data-for="wdi">[</span>PRECISION PEST AUDITS</div>
    <div style="font-size: 0.85em; text-transform: uppercase; letter-spacing: 1px;">Official Wood Destroying Insect (WDI) Report</div>
  </div>
<div style="font-size: 0.95em; line-height: 1.6; color: #333;">
    <div style="display: flex; justify-content: space-between; margin-bottom: 25px;">
      <div>
        <strong>Property Address:</strong><br>
        123 MAPLE STREET, SPRINGFIELD, USA
      </div>
      <div style="text-align: right;">
        <strong>Report ID:</strong> WDI-2026-8844<br>
        <strong>Date:</strong> 15 MAR 2026
      </div>
    </div>
<div style="background: #f9f9f9; padding: 20px; border: 1px solid #ddd; margin: 20px 0;">
      <h4 style="margin-top: 0; color: #004d40; border-bottom: 1px solid #ccc; padding-bottom: 5px;">VERIFIED FINDINGS</h4>
      <p style="margin: 10px 0;"><strong>Active Infestation:</strong> <span style="color: #2e7d32; font-weight: bold;">NONE OBSERVED</span></p>
      <p style="margin: 5px 0;"><strong>Previous Damage:</strong> MINOR (Garage Sill Plate)</p>
      <p style="margin: 5px 0;"><strong>Recommendations:</strong> Annual monitoring recommended. No treatment required.</p>
    </div>
<p style="font-size: 0.85em; font-style: italic; color: #666;">
      "This report is an opinion of the condition of the property on the date of inspection only. It is not a guarantee or warranty."
    </p>
  </div>
<div style="margin-top: 40px; display: flex; justify-content: space-between; align-items: flex-end;">
    <div>
      <div style="border-top: 1px solid #000; width: 200px; padding-top: 5px; font-style: italic;">Sarah J. Miller, Licensed Inspector</div>
      <div style="font-size: 0.7em; color: #777;">License: #WDI-992288-TX</div>
    </div>
    <div style="text-align: right; color: #004d40; font-weight: bold; font-size: 0.8em;">INSPECTION VERIFIED</div>
  </div>
<div style="padding: 20px; background: #fffbe6; border: 1px dashed #999; margin-top: 30px; text-align: center;">
    <div data-verify-line="wdi" style="font-family: 'Courier New', monospace; font-size: 0.85em; color: #000; font-weight: bold;"
      title="Demo only: Inspection firms don't yet offer verification&#10;endpoints, so this is illustrative">
      verify:precision-pest.com/v <span verifiable-text="end" data-for="wdi">]</span>
    </div>
    <div style="font-size: 0.7em; color: #666; margin-top: 10px;">
      Scan to verify structural findings, view high-res damage photos, and check for active service warranties.
    </div>
  </div>
</div>

## Data Verified

Report ID, property address, owner name (optional/masked), buyer name, inspection date, active infestation status (Yes/No), previous damage location/severity, treatment recommendations, inspector name/license, company name, date of signature.

**Document Types:**
- **WDI Inspection Report:** (Form NPMA-33) The industry standard.
- **Treatment Certificate:** Proof that a house was recently "Tented" or treated.
- **Termite Bond:** (Linked hash) the ongoing maintenance guarantee.
- **Wood Infestation Letter:** A simplified summary for some lenders.

## Data Visible After Verification

Shows the issuer domain (`orkin.com`, `terminix.com`, `state-ag-board.gov`) and the report standing.

**Status Indications:**
- **Verified / Clear** — Report matches the original digital record; no active bugs.
- **Treatment Required** — **ALERT:** The original report recommended immediate chemical treatment.
- **Damage Flagged** — **ALERT:** Structural issues were identified that require a contractor audit.
- **Expired** — **ALERT:** Report is more than 30 days old; re-inspection required for closing.

## Second-Party Use

The **Home Seller / Real Estate Agent** benefits from verification.

**Closing Speed:** Before a bank releases a $500,000 mortgage, the underwriter scans the seller's WDI hash. "Verified by Orkin" ensures the bank that the house isn't "Bug Infested," removing the 3-day "Manual Report Vetting" delay and allowing the deal to close on schedule.

**Disclosure Shield:** A seller can use the verified hash to prove exactly what they disclosed to the buyer at the time of sale, defending against a "Hidden Damage" lawsuit filed 2 years later.

## Third-Party Use

**Mortgage Lenders / Underwriters**
**Collateral Risk Audit:** Thousands of "Edited" PDF reports are submitted to banks every month. Live Verify connects the underwriter directly to the inspection firm's domain, stopping "Termite Fraud" at the source and protecting the bank's property lien.

**Home Buyers (The Public)**
**Due Diligence:** A potential buyer can scan the WDI hash provided in the "Listing Packet" before they even make an offer. This ensures the "Clean" report isn't a fabrication, protecting them from buying a "Money Pit" with structural rot.

**Title and Escrow Companies**
**Closing Audit:** Verifying that the WDI report in the file is the final, un-altered version required by the lender's instructions.

## Verification Architecture

**The "Finding Scrubbing" Fraud Problem**

- **Infestation Masking:** Changing an "Active" checkbox to "None" on a PDF to hide a termite problem.
- **Damage Deletion:** Removing a page of the report that shows a photo of a rotted sill plate.
- **License Mimicry:** Creating a fake report using a reputable inspector's name and license number from a public board.

**Issuer Types** (First Party)

**National Pest Control Firms.**
**Independent Licensed Inspectors.**
**State Departments of Agriculture (Licensing Boards).**

**Privacy Salt:** Essential. Specific property defect details and home addresses are sensitive. The hash must be salted to prevent "Neighborhood Blight Mapping" by data brokers or speculators.

## Rationale

Pest inspection is the "Structural Integrity" audit of a home. By turning static reports into verifiable digital bridges, we protect the buyer's investment and the lender's collateral, ensuring that "Clear" really means "No Bugs."

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

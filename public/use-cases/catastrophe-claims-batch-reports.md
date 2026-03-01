---
title: "Catastrophe Claims Batch Reports"
category: "Insurance Claims & Operations"
volume: "Small"
retention: "CAT event + 10 years"
slug: "catastrophe-claims-batch-reports"
tags: ["catastrophe", "insurance-claims", "reinsurance", "cat-code", "disaster-response", "claims-audit"]
furtherDerivations: 1
---

## What is a CAT Batch Report?

When a massive disaster (a **Catastrophe** or "CAT") like Hurricane Katrina or a California Wildfire happens, insurance companies pay out thousands of claims at once.

To get their money back from **Reinsurance** companies (the "insurers for insurers"), the primary company sends a **Batch Report**. This is a list of all claims totaling millions of dollars.

If a carrier "sneaks" a normal kitchen fire into a "Hurricane" batch, they are committing reinsurance fraud. Verified hashes allow the reinsurer to audit these multimillion-dollar lists instantly against the carrier's core database.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="cat">[</span>STATE FARM FIRE & CASUALTY
Catastrophe Operations Unit                       Batch ID: CAT-2026-FL-04
═══════════════════════════════════════════════════════════════════

                      CAT BATCH LOSS SUMMARY

Event:   Hurricane Helena (PCS Code: 42)
Region:  Florida Gulf Coast (Zip 337xx, 336xx)

Claim Metric                                            Batch Total
───────────────────────────────────────────────────────────────────
Total Claims in Batch                                         1,242
Paid Loss Total                                      $ 18,450,000.00
Outstanding Reserve                                  $  4,200,000.00
───────────────────────────────────────────────────────────────────
TOTAL INCURRED:                                      $ 22,650,000.00

Audit Date: March 15, 2026
Note: All claims verified as occurring within CAT date window.

<span data-verify-line="cat">verify:statefarm.com/claims/v</span> <span verifiable-text="end" data-for="cat">]</span></pre>
</div>

## Data Verified

Catastrophe code (PCS/ISO), regional boundaries (Zip/County), batch ID, claim count, total paid losses, total reserves, incident date range, carrier ID, audit timestamp.

**Document Types:**
- **CAT Loss Summary:** High-level totals for management/regulators.
- **Bordereau Report:** Detailed claim-by-claim list for reinsurers.
- **Quota Share Statement:** For shared risk partitions.

## Data Visible After Verification

Shows the issuer domain (the Insurance Carrier) and the report standing.

**Status Indications:**
- **Final/Audited** — Data matches the carrier's core ledger.
- **Estimated** — Initial assessment; subject to change.
- **Superseded** — Updated by a more recent batch report (e.g., as reserves develop).
- **Void** — Report retracted due to data error.

## Second-Party Use

The **Carrier Management** benefits from verification.

**Reinsurance Recovery:** Proving to a reinsurer (e.g., Munich Re or Swiss Re) that the $22M loss claim is authentic and matches the carrier's verified CAT data. This accelerates the "Cash Call" process where reinsurers reimburse the carrier.

**Internal Audit:** Ensuring that regional offices aren't "padding" CAT batches with non-CAT claims (attritional losses) to get higher reinsurance payouts or special disaster funding.

## Third-Party Use

**Reinsurers**
**Claims Verification:** Reinsurers often take weeks to audit "Bordereau" files manually. Live Verify allows them to instantly verify the high-level totals against the carrier's domain, reducing the audit friction.

**State Insurance Commissioners**
**Market Stability:** Regulators can verify the "CAT Exposure" claims made by insurers in their state to ensure the companies remain solvent and have adequate reserves post-disaster.

**Rating Agencies (A.M. Best)**
**Capital Adequacy:** Verifying the actual loss development of a major event to update the carrier's financial strength rating.

## Verification Architecture

**The "Claim Laundering" Fraud Problem**

- **Inclusion of Attritional Loss:** Sneaking a "normal" kitchen fire claim into a "Hurricane" batch to get it covered by a reinsurance treaty that only triggers for CAT events.
- **Amount Inflation:** Editing the "Total Paid" amount on a PDF report to claim more money from a reinsurer than was actually paid to policyholders.
- **Date Stretching:** Moving the date of a loss that happened *after* the storm into the "CAT Window" to get special handling.

**Issuer Types** (First Party)

**Primary Insurers:** (State Farm, Allstate, Liberty Mutual).
**Forensic Audit Firms:** (Providing 3rd party verification).
**Industry Data Bodies:** (ISO / Property Claim Services - PCS).

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

**Jurisdictional Requirements (Catastrophe Insurance/Reinsurance)**

Catastrophe claims require specialized witnessing:
- **Immediate claims (hours after event):** May use issuer-generated hashes with blockchain rollups for speed
- **Detailed claims (days later):** Independent witness firms from jurisdictions outside the primary issuer's domicile
- **Cross-border catastrophes:** Multiple witness firms from affected nations' OECD partners

**Lloyd's of London & International Reinsurance:** Expect witness firms for all catastrophe claims, especially those triggering industry-wide retrocessions.

**Public Blockchain (Non-Party)**

Witnessing firms may periodically commit rollups to an inexpensive public blockchain, providing an ultimate immutability guarantee. The blockchain is a "non-party"—infrastructure, not a participant in the transaction. This creates multiple verification paths:

1. **Issuer domain** — Direct check against the issuer
2. **Witnessing firm** — Independent confirmation with timestamp
3. **Public blockchain** — Decentralized trust anchor via rollup inclusion


## Competition vs. Blockchain (RiskStream)

| Feature | Live Verify | RiskStream / Corda | Scanned PDF Report |
| :--- | :--- | :--- | :--- |
| **Interoperability** | **Universal.** Any reinsurer can verify. | **Siloed.** Both parties must be on the specific blockchain. | **Manual.** |
| **Trust Anchor** | **Domain-Bound.** Bound to the Carrier. | **Consensus-Bound.** Trust the network. | **Zero.** Easily forged. |
| **Cost** | **Low.** Standard web infra. | **High.** Requires heavy enterprise blockchain nodes. | **None.** |
| **Privacy** | **High.** Only the specific batch is shared. | **Medium.** Shared ledger metadata. | **Vulnerable.** |

**Why Live Verify wins here:** The "Legacy Bridge." The insurance industry is moving toward blockchain (RiskStream), but 90% of the world still operates on PDF reports sent via email. Live Verify provides **ledger-level integrity** for the existing PDF-based workflow, allowing carriers to modernize without replacing their entire tech stack.

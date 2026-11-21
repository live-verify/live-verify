---
title: "Catastrophe Claims Batch Reports"
category: "Insurance Claims & Operations"
volume: "Small"
retention: "CAT event + 10 years"
slug: "catastrophe-claims-batch-reports"
verificationMode: "clip"
tags: ["catastrophe", "insurance-claims", "reinsurance", "cat-code", "disaster-response", "claims-audit"]
furtherDerivations: 1
---

## What is a CAT Batch Report?

When a massive disaster (a Catastrophe or "CAT") like Hurricane Katrina or a California Wildfire happens, insurance companies pay out thousands of claims at once.

To get their money back from Reinsurance companies (the "insurers for insurers"), the primary company sends a Batch Report. This is a list of all claims totaling millions of dollars.

If a carrier "sneaks" a normal kitchen fire into a "Hurricane" batch, they are committing reinsurance fraud. Verified hashes allow the reinsurer to audit these multimillion-dollar lists instantly against the carrier's core database.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="cat"></span>STATE FARM FIRE & CASUALTY
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

<span data-verify-line="cat">verify:statefarm.com/claims/v</span> <span verifiable-text="end" data-for="cat"></span></pre>
</div>

## The Problem: Claim Laundering Fraud

- **Inclusion of Attritional Loss:** Sneaking a "normal" kitchen fire claim into a "Hurricane" batch to get it covered by a reinsurance treaty that only triggers for CAT events.
- **Amount Inflation:** Editing the "Total Paid" amount on a PDF report to claim more money from a reinsurer than was actually paid to policyholders.
- **Date Stretching:** Moving the date of a loss that happened *after* the storm into the "CAT Window" to get special handling.

## What Is Checked

Catastrophe code (PCS/ISO), regional boundaries (Zip/County), batch ID, claim count, total paid losses, total reserves, incident date range, carrier ID, audit timestamp.

**Document Types:**
- **CAT Loss Summary:** High-level totals for management/regulators.
- **Bordereau Report:** Detailed claim-by-claim list for reinsurers.
- **Quota Share Statement:** For shared risk partitions.

## What the Checker Sees

Shows the issuer domain (the Insurance Carrier) and the report standing.

**Status Indications:**
- **Final/Audited** — Data matches the carrier's core ledger.
- **Estimated** — Initial assessment; subject to change.
- **Superseded** — Updated by a more recent batch report (e.g., as reserves develop).
- **Void** — Report retracted due to data error.

## Who Holds It

The Carrier Management benefits from verification.

**Reinsurance Recovery:** Proving to a reinsurer (e.g., Munich Re or Swiss Re) that the $22M loss claim is authentic and matches the carrier's verified CAT data. This accelerates the "Cash Call" process where reinsurers reimburse the carrier.

**Internal Audit:** Ensuring that regional offices aren't "padding" CAT batches with non-CAT claims (attritional losses) to get higher reinsurance payouts or special disaster funding.

## Who Checks It

**Reinsurers**
**Claims Verification:** Reinsurers often take weeks to audit "Bordereau" files manually. Live Verify allows them to instantly verify the high-level totals against the carrier's domain, reducing the audit friction.

**State Insurance Commissioners**
**Market Stability:** Regulators can verify the "CAT Exposure" claims made by insurers in their state to ensure the companies remain solvent and have adequate reserves post-disaster.

**Rating Agencies (A.M. Best)**
**Capital Adequacy:** Verifying the actual loss development of a major event to update the carrier's financial strength rating.

## Who Issues It

**Issuer Types** (First Party)

**Primary Insurers:** (State Farm, Allstate, Liberty Mutual).
**Forensic Audit Firms:** (Providing 3rd party verification).
**Industry Data Bodies:** (ISO / Property Claim Services - PCS).

## Authority Chain

**Pattern:** Regulated

Crawford & Company issues batch claims reports for catastrophic events and disasters.

```
✓ cat-claims.crawco.co.uk/verify — Issues batch claims reports for catastrophic events
  ✓ fca.org.uk/register — Regulates UK general insurance firms
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Where Each Fits: Live Verify and Shared Industry Ledgers

Shared ledgers such as RiskStream let member insurers and reinsurers keep a common record of claims data on a permissioned network. They work for the firms that have joined and connected. Live Verify answers a different question, whether a batch report a reinsurer has been sent is the one the carrier issued, and the two work side by side.

| | Shared industry ledger | Live Verify on the batch report | Unverified scanned PDF |
| :--- | :--- | :--- | :--- |
| **Who can check** | Member firms connected to the same network. | Anyone handed the report: a reinsurer, a broker, a regulator, an auditor. | Nobody; it can only be taken on trust. |
| **What the checker gets** | Shared, structured records that both parties see in the same form. | Confirmation that the carrier issued this exact report, as at its date. | A document whose totals may have been edited. |
| **What the carrier shares** | The records it posts to the ledger, visible to permitted members. | Only the report it sends. | Only the report it sends. |
| **Reach** | Members of that network. | Global in principle: any carrier, in any country, that publishes hashes on its own domain. | Universal, but untrusted. |
| **Speed and cost** | Fast once connected; membership, integration and running nodes come first. | A few seconds per check: one web lookup, with no fee to the standard. | Free and immediate. |
| **What it needs** | Both parties on the same network. | The carrier to publish hashes, and Live Verify-aware software on the checker's device. No carrier does this yet. | Nothing. |
| **Best suited to** | Ongoing, structured data exchange between members. | Reports sent to counterparties who are not on the same network. | Nothing where recoveries depend on the figures. |

**Where each fits:** where a carrier and its reinsurer are both members of a shared ledger such as RiskStream, that gives them a common record and there is no reason to step outside it. Many reinsurers are not on the same network and still receive batch reports as emailed PDFs. Live Verify lets them check such a report against the carrier's domain, and it can run next to a ledger for the counterparties that use one.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).

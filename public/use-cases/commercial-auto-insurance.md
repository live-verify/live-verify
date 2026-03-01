---
title: "Commercial Auto Insurance Policies"
category: "Commercial Lines Insurance"
volume: "Medium"
retention: "Policy term + 7 years"
slug: "commercial-auto-insurance"
tags: ["commercial-auto", "fleet-insurance", "logistics", "dot-compliance", "trucking", "hired-non-owned"]
furtherDerivations: 1
---

## What is Fleet Insurance?

When a company owns 100 trucks or vans, they don't buy 100 individual car insurance policies. They buy a **Commercial Auto Fleet Policy**.

Every driver carries a **Proof of Insurance** card. Unlike personal insurance, these cards must list the company's **DOT Number** and often include a federal **MCS-90** filing which guarantees the public is protected if a heavy truck causes an accident.

Fraud is common: fleet owners often "delete" expensive-to-insure trucks from their policy to save money, but keep the old paper cards in the glovebox to fool DOT inspectors. Live Verify allows an inspector to verify that **this specific VIN** is still covered today.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <span verifiable-text="start" data-for="com-auto">[</span>
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;">PROGRESSIVE COMMERCIAL
Fleet & Logistics Division
═══════════════════════════════════════════════════════════════════

                  PROOF OF COMMERCIAL INSURANCE

Policy #: CA-992288-26

Insured:    Lightning Logistics, LLC
DOT Number: 1234567

COVERED VEHICLES
───────────────────────────────────────────────────────────────────
Vehicle / VIN                                      Liability Limit
───────────────────────────────────────────────────────────────────
2024 Freightliner Cascadia                        $ 1,000,000 CSL
  VIN: 1FUJA...5544
2025 Ford F-550 Box Truck                         $ 1,000,000 CSL
  VIN: 1FDRF...9922

Coverage Includes: MCS-90 Endorsement, Hired & Non-Owned Auto

Policy Period: Jan 01, 2026 to Jan 01, 2027

</pre>
<span data-verify-line="com-auto">verify:progressive.com/commercial/v</span> <span verifiable-text="end" data-for="com-auto">]</span>
</div>

## Data Verified

Business name, DOT number, specific vehicle VINs, combined single limit (CSL), cargo liability, effective/expiration dates, MCS-90 status, hired/non-owned auto inclusion.

**Document Types:**
- **Commercial ID Card:** For the glovebox of every fleet vehicle.
- **Form MCS-90:** Federal filing for public liability (trucking).
- **Scheduled Auto List:** Detailing every covered VIN.
- **Hired/Non-Owned Certificate:** For businesses using employees' personal cars.

## Data Visible After Verification

Shows the issuer domain (`progressive.com`, `travelers.com`) and fleet status.

**Status Indications:**
- **In Force** — Fleet is fully covered.
- **Vehicle Excluded** — **ALERT:** This specific VIN was removed from the policy.
- **Cancelled** — Policy terminated (e.g., for safety score or non-payment).
- **Expired** — Term ended.

## Second-Party Use

The **Fleet Owner** (second party) receives the commercial auto insurance card from the carrier (first party), **keeps it**, and may later hand it to third parties for various reasons, or never do so.

**Personal Record:** They have their own verified copy of the fleet coverage. Most of the time, the cards sit in the vehicle gloveboxes—the verification value is latent, there *if needed*.

**Peace of Mind:** They can confirm at any time that the coverage matches what the carrier's system recorded and specific VINs haven't been excluded.

**Future Optionality:** If an inspection arises—whether DOT roadside checks or logistics network onboarding—they have cryptographic proof of coverage ready without needing to contact the carrier.

## Third-Party Use

The fleet owner (second party) may hand the verified document to various third parties:

**Roadside DOT Inspectors**
**Enforcement:** Instantly confirming that a heavy truck hasn't been "dropped" from the policy. Fleet owners often keep 100 trucks on the road while only paying for 50. Live Verify verification of the VIN-specific card stops this "Ghost Fleet" fraud.

**Logistics Brokers**
**Risk Management:** Verifying the cargo and liability insurance of a carrier before dispatching a $500,000 load.

**Shipping Hubs / Warehouses**
**Gate Access:** Ensuring that any truck entering the facility has verified liability coverage, protecting the facility owner from accidents on their property.

## Verification Architecture

**The "Ghost Fleet" Fraud Problem**

- **Selective Deletion:** Removing high-risk drivers or aging trucks from the policy to save money, but keeping the old "Policy Summary" paper to show at checkpoints.
- **VIN Tampering:** Editing a "Clean" VIN onto a card for an uninsured, damaged vehicle.
- **MCS-90 Forgery:** Fabricating the federal filing needed for interstate commerce.

**Issuer Types (First Party)**

- Commercial Carriers (Progressive, Travelers, Zurich)
- State DOTs (As the oversight body)
- Fleet Platforms (Samsara, Motive - integrating insurance verification into the ELD)

**Privacy Salt:** Not required. Commercial auto insurance cards contain many unpredictable variables: fleet company names, unique DOT numbers, specific VINs (17-character alphanumeric), unique policy numbers, exact coverage limits, effective/expiration dates, and MCS-90 filing details. The combination of these fleet-specific details creates sufficient entropy to prevent hash enumeration attacks.

## Jurisdictional Witnessing

A jurisdiction may require commercial auto insurers to retain a **witnessing firm** for regulatory compliance. The witnessing firm:

- Receives all hashes from the insurer, and any subsequent changes to the policy as they happen—which may manifest as a new hash, a status change (vehicle excluded, cancelled), or even a 404 (record deleted)
- Receives structured content/metadata (DOT numbers, VINs, coverage limits, MCS-90 status, policy dates)
- Does **NOT** receive plaintext (driver details, safety scores, claim histories)
- Provides an immutable, timestamped audit trail—available to the jurisdiction on demand, to fleet owners/third parties during disputes, or as expert witness testimony in legal proceedings

This provides:
- **Non-repudiation:** Insurer cannot deny issuing the coverage
- **Timestamp proof:** Coverage hash existed at a specific time
- **Regulatory audit:** State DOTs and FMCSA can inspect the witness ledger
- **Resilience:** Verification works even if insurer's systems go down

**Public Blockchain (Non-Party)**

Witnessing firms may periodically commit rollups to an inexpensive public blockchain, providing an ultimate immutability guarantee. The blockchain is a "non-party"—infrastructure, not a participant in the transaction. This creates multiple verification paths:

1. **Carrier domain** — Direct check against the issuer
2. **Witnessing firm** — Independent confirmation with timestamp
3. **Public blockchain** — Decentralized trust anchor via rollup inclusion

## Competition vs. FMCSA SAFER Database

| Feature | Live Verify | FMCSA SAFER (Public) | Paper Fleet List |
| :--- | :--- | :--- | :--- |
| **VIN Detail** | **High.** Verifies *this specific truck*. | **Low.** Often only shows "Policy Active" for the whole company. | **High.** But untrusted. |
| **Freshness** | **Real-time.** Queries the insurer's live fleet file. | **Laggy.** Federal records can lag by weeks. | **Static.** |
| **Accessibility** | **Open.** Any warehouse or broker can verify. | **Public.** But limited data. | **Manual.** |

**Why Live Verify wins here:** The "VIN Specificity" problem. Government databases like SAFER prove a company *has* insurance, but they rarely list the 500 individual VINs. Live Verify allows a verifier to prove that **this specific VIN** is covered *today*, closing the gap between corporate-level filings and vehicle-level reality.

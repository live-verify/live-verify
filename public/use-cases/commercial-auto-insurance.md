---
title: "Commercial Auto Insurance Policies"
category: "Commercial Lines Insurance"
volume: "Medium"
retention: "Policy term + 7 years"
slug: "commercial-auto-insurance"
verificationMode: "clip"
tags: ["commercial-auto", "fleet-insurance", "logistics", "dot-compliance", "trucking", "hired-non-owned"]
furtherDerivations: 1
---

## What is Fleet Insurance?

When a company owns 100 trucks or vans, they don't buy 100 individual car insurance policies. They buy a Commercial Auto Fleet Policy.

Every driver carries a Proof of Insurance card. Unlike personal insurance, these cards must list the company's DOT Number and often include a federal MCS-90 filing which guarantees the public is protected if a heavy truck causes an accident.

Fraud is common: fleet owners often "delete" expensive-to-insure trucks from their policy to save money, but keep the old paper cards in the glovebox to fool DOT inspectors. Live Verify allows an inspector to verify that this specific VIN is still covered today.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <span verifiable-text="start" data-for="com-auto"></span>
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
<span data-verify-line="com-auto">verify:progressive.com/commercial/v</span> <span verifiable-text="end" data-for="com-auto"></span>
</div>

## The Problem: Ghost Fleet Fraud

- **Selective Deletion:** Removing high-risk drivers or aging trucks from the policy to save money, but keeping the old "Policy Summary" paper to show at checkpoints.
- **VIN Tampering:** Editing a "Clean" VIN onto a card for an uninsured, damaged vehicle.
- **MCS-90 Forgery:** Fabricating the federal filing needed for interstate commerce.

## What Is Checked

Business name, DOT number, specific vehicle VINs, combined single limit (CSL), cargo liability, effective/expiration dates, MCS-90 status, hired/non-owned auto inclusion.

**Document Types:**
- **Commercial ID Card:** For the glovebox of every fleet vehicle.
- **Form MCS-90:** Federal filing for public liability (trucking).
- **Scheduled Auto List:** Detailing every covered VIN.
- **Hired/Non-Owned Certificate:** For businesses using employees' personal cars.

## What the Checker Sees

Shows the issuer domain (`progressive.com`, `travelers.com`) and fleet status.

**Status Indications:**
- **In Force** — Fleet is fully covered.
- **Vehicle Excluded** — This specific VIN was removed from the policy.
- **Cancelled** — Policy terminated (e.g., for safety score or non-payment).
- **Expired** — Term ended.

## Who Holds It

The Fleet Owner (second party) receives the commercial auto insurance card from the carrier (first party), keeps it, and may later hand it to third parties for various reasons, or never do so.

**Personal Record:** They have their own verified copy of the fleet coverage. Most of the time, the cards sit in the vehicle gloveboxes—the verification value is latent, there *if needed*.

**Peace of Mind:** They can confirm at any time that the coverage matches what the carrier's system recorded and specific VINs haven't been excluded.

**Future Optionality:** If an inspection arises—whether DOT roadside checks or logistics network onboarding—they have cryptographic proof of coverage ready without needing to contact the carrier.

## Who Checks It

The fleet owner (second party) may hand the verified document to various third parties:

**Roadside DOT Inspectors**
**Enforcement:** Instantly confirming that a heavy truck hasn't been "dropped" from the policy. Fleet owners often keep 100 trucks on the road while only paying for 50. Live Verify verification of the VIN-specific card stops this "Ghost Fleet" fraud.

**Logistics Brokers**
**Risk Management:** Verifying the cargo and liability insurance of a carrier before dispatching a $500,000 load.

**Shipping Hubs / Warehouses**
**Gate Access:** Ensuring that any truck entering the facility has verified liability coverage, protecting the facility owner from accidents on their property.

## Who Issues It

**Issuer Types (First Party)**

- Commercial Carriers (Progressive, Travelers, Zurich)
- State DOTs (As the oversight body)
- Fleet Platforms (Samsara, Motive - integrating insurance verification into the ELD)

**Privacy Salt:** Not required. Commercial auto insurance cards contain many unpredictable variables: fleet company names, unique DOT numbers, specific VINs (17-character alphanumeric), unique policy numbers, exact coverage limits, effective/expiration dates, and MCS-90 filing details. The combination of these fleet-specific details creates sufficient entropy to prevent hash enumeration attacks.

## Authority Chain

**Pattern:** Regulated

Aviva underwrites commercial auto fleet insurance for UK businesses.

```
✓ fleet.aviva.co.uk/verify — Underwrites commercial auto fleet insurance
  ✓ fca.org.uk/register — Regulates UK general insurance firms
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Where Each Fits: Live Verify and the FMCSA Public Record

In the US, the FMCSA's public systems, including SAFER, show whether an interstate motor carrier holds the insurance filings it is required to hold. Other countries keep their own records, and many keep none that the public can search. The federal record and Live Verify answer different questions and work side by side: one confirms a carrier's filings, the other confirms an insurer's schedule naming specific vehicles.

| | FMCSA public record | Live Verify on the policy or vehicle schedule | Unverified paper fleet list |
| :--- | :--- | :--- | :--- |
| **Who can check** | Anyone, online. | Anyone handed the schedule: a warehouse, a freight broker, a shipper. | Whoever receives it, trusting it as it stands. |
| **What the checker gets** | The carrier's operating authority and insurance filing status at company level. | Confirmation that the insurer issued this exact schedule, naming these vehicles, as at its date, and whether it has since been withdrawn. | A list that may include vehicles the policy does not cover. |
| **What the carrier shares** | Nothing; the record is public. | Only the schedule. | Only the list. |
| **Reach** | US interstate carriers. | Global in principle: any insurer, in any country, that publishes hashes on its own domain. | Universal, but untrusted. |
| **Speed and cost** | Free and quick; filings can take time to show changes. | A few seconds per check: one web lookup, with no fee to the standard. | Free and immediate. |
| **What it needs** | Nothing from the checker. | The insurer to publish hashes, and Live Verify-aware software on the checker's device. No insurer does this yet. | Nothing. |
| **Best suited to** | Confirming a carrier is authorized and has its required filings. | Confirming cover for a specific vehicle at the dock. | Nothing where liability depends on it. |

**Where each fits:** the federal database is the right place to confirm that a carrier holds the filings it is required to hold, and brokers and shippers should keep checking it. It generally does not list individual vehicles and can lag behind changes. Live Verify lets a warehouse or broker confirm the insurer stands behind a schedule naming a specific vehicle, which adds vehicle-level detail to the company-level public record.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).

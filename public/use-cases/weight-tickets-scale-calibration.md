---
title: "Weight Tickets and Scale Calibration"
category: "Warehousing & Inventory"
volume: "Large"
retention: "Shipment + 3-7 years (tax/audit/dispute)"
slug: "weight-tickets-scale-calibration"
verificationMode: "clip"
tags: ["logistics", "shipping", "weight-ticket", "scale-ticket", "dot-compliance", "freight-fraud", "trade-measurement", "bulk-commodities"]
furtherDerivations: 1
---

## What are Weight Tickets?

In the shipping and bulk commodity industries (e.g., grain, scrap metal, gravel), the Weight Ticket is the "Cash Receipt" for the cargo. It records the weight of a truck when full (Gross) and when empty (Tare) to determine the weight of the goods (Net).

Because weight determines the price of multimillion-dollar shipments, these tickets are a primary target for Weight Fraud. A dishonest driver might "edit" a 40,000 lb ticket to read 45,000 lbs to over-charge a buyer. Similarly, they might use a "Ghost Ticket" from a non-existent scale to steal cargo. Verified hashes bind the Gross/Tare Weights, Plate Number, and Timestamp to the scale operator's domain (e.g., `catscale.com` or `pilotflyingj.com`).

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <span verifiable-text="start" data-for="weight"></span>
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;">MIDWEST CERTIFIED SCALES
NIST Handbook 44 Compliant - Scale ID: #9922-A
═══════════════════════════════════════════════════════════════════

Ticket #:  WT-2026-8844                        Date: 15 MAR 2026
Plate:     ABC-1234 (IL)                       Time: 14:32:01
Unit:      TRUCK-42                        Location: JOLIET, IL

WEIGHT MEASUREMENT
───────────────────────────────────────────────────────────────────
GROSS WEIGHT:                                            78,450 LB
TARE WEIGHT:                                             32,100 LB
═══════════════════════════════════════════════════════════════════
NET WEIGHT:                                              46,350 LB

This weight is certified accurate by a licensed Weighmaster.
Verification protects trade integrity.

</pre>
<span data-verify-line="weight">verify:midwest-scales.com/v</span> <span verifiable-text="end" data-for="weight"></span>
</div>

## The Problem: Phantom Pound Fraud

- **Tare Tampering:** Weighing the truck empty with a full fuel tank, but weighing it full with an empty tank to inflate the "Net" weight.
- **PDF Inflation:** Editing a "42,000 lb" net weight to read "48,000 lb" before invoicing the buyer.
- **Facility Spoofing:** Creating a fake ticket from a reputable scale operator to hide the fact that the goods were never weighed.

## What Is Checked

Ticket number, scale ID, facility location, date/time, vehicle plate/VIN, gross weight, tare weight, net weight, weighmaster name/ID, calibration expiration date.

**Document Types:**
- **Public Weighmaster Ticket:** The primary commercial record.
- **Axle Weight Report:** For DOT axle-load compliance.
- **Scale Calibration Certificate:** (Linked hash) proving the scale is accurate.
- **Automatic Manifest:** For unattended unmanned scales.

## What the Checker Sees

Shows the issuer domain (`catscale.com`, `pilotj.com`, `loves.com`) and the ticket standing.

**Status Indications:**
- **Verified / Certified** — Weight data matches the scale's original digital log.
- **Out of Calibration** — Scale was overdue for mandatory NIST testing at the time of weighing.
- **Voided** — Ticket was cancelled (e.g., due to a re-weigh).
- **Plate Mismatch** — The physical plate on the truck doesn't match the verified hash.

## Who Holds It

The Driver (second party) receives the weight ticket from the scale operator (first party), keeps it, and may later hand it to third parties for various reasons, or never do so.

**Personal Record:** The driver has their own verified copy of the weight measurement. Most of the time, the document sits in their truck documentation—the verification value is latent, there *if needed*.

**Peace of Mind:** The driver can confirm at any time that the ticket matches what the scale operator's system recorded and hasn't been altered, ensuring they have accurate documentation of cargo weight.

**Future Optionality:** If a dispute arises—whether about DOT violations, billing disputes, or accident investigations—the driver has cryptographic proof ready without needing to contact the scale operator.

## Who Checks It

The driver (second party) may hand the verified document to various third parties:

**DOT Inspectors (Roadside Compliance)**
During a roadside inspection for "Overweight" violations, the driver provides the verified hash of their scale ticket. The Trooper can instantly see "VERIFIED 78,450 LBS" from a certified scale, proving the truck is legally under the 80,000 lb limit and preventing a $2,000 fine.

**Shippers and Receivers (Billing & Inventory)**
The carrier provides verified weight hashes with their invoices, allowing the shipper's system to perform an instant "Weight Audit." A factory receiving 100 trucks of scrap metal per day can bulk-verify all incoming tickets. If a driver attempts to "pad" a ticket with an extra 5,000 lbs, the system flags the fraud instantly, reducing payment time from 30 days to 24 hours for legitimate tickets.

**State Departments of Agriculture (Weights & Measures)**
Regulators receive verified tickets to confirm that public scales are correctly recording weights and that "Scale Tickets" aren't being fabricated to hide the sale of untaxed commodities.

**Insurance Companies (Accident Forensics)**
In a crash involving a heavy truck, the insurer receives the last verified weight ticket to determine if the vehicle was "overloaded," which can significantly impact liability and stopping-distance calculations.

## Who Issues It

**Issuer Types (First Party)**

- Certified Public Scales (CAT Scale)
- Privately Owned Industrial Scales
- Port Authority Scales

**Privacy Salt:** Required. License plates and high-value cargo weights are private business data. While each ticket contains unique combinations of ticket numbers, precise timestamps (14:32:01), specific weight measurements (78,450 lb gross, 32,100 lb tare), plate numbers, and scale IDs that provide significant entropy, the commercial sensitivity of this data—and the risk that competitors could use enumeration for "traffic mapping" to track commodity flows and undercut pricing—means salt is essential. Salt protects both driver privacy and shipper competitive intelligence.

## Authority Chain

**Pattern:** Regulated

Certified public scales are regulated by weights and measures authorities to ensure accurate weight measurements in commerce and prevent fraud in bulk commodity transactions.

```
✓ scales.npl.co.uk/verify — Issues verified weight measurement tickets
  ✓ opss.gov.uk — Enforces UK product safety standards
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Jurisdictional Witnessing (Optional)

An independent witness layer may apply — see [Witnessing Third Parties](../../docs/WITNESSING-THIRD-PARTIES.md) for the full mechanism (what a witness receives, non-repudiation, optional public-blockchain rollups). For this use case: a witness would receive the scale operator's hashes and status changes plus structured metadata (gross weights, tare weights, net weights, timestamps, scale IDs, ticket numbers) — never vehicle plates, driver names, commodity types, or shipper/receiver identities — providing non-repudiation of issuing the weight measurement.

## Rationale

Weight is the "Truth of Trade." By turning scale tickets into verifiable digital bridges, we protect the billions of dollars in commerce that rely on accurate measurement and ensure that "What You Pay For" is "What You Get."
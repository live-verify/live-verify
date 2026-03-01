---
title: "Packing Lists and Shipping Manifests"
category: "Chain of Custody & Logistics"
volume: "Very Large"
retention: "7-10 years (customs/legal)"
slug: "packing-lists-shipping-manifests"
tags: ["packing", "lists", "shipping", "manifests", "logistics", "transportation", "customs-compliance", "cargo-security"]
furtherDerivations: 1
---

## What is a Packing List?

In international trade, the Bill of Lading is the "Title" to the goods, but the **Packing List** is the "Inventory." It is the granular breakdown of every carton, SKU, and item inside a shipping container.

It is the primary document used by:
1.  **Customs Officers:** To verify that the physical cargo matches the legal declaration.
2.  **Warehouse Managers:** To ensure that what was unloaded from the truck matches what was promised.
3.  **Insurance Adjusters:** To calculate the exact value of loss if a single pallet is damaged or stolen.

**"Substitution Fraud"** is a major logistics risk. Criminals or dishonest shippers "edit" the packing list to hide high-value or illegal items (like lithium batteries or un-declared electronics) under a description of low-risk goods (like "Plastic Toys") to save on tariffs or bypass safety rules. Verified hashes bind the **line-by-line inventory and container seal numbers** to the shipper's warehouse domain.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #333; background: #fff; padding: 0; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
  <div style="padding: 20px; background: #fff;">
    <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="pack">[</span>CARGO SHIPPING MANIFEST
GLOBAL LOGISTICS SOLUTIONS, INC.
═══════════════════════════════════════════════════════════════════════
Shipper:   Shenzhen Tech Components, Ltd.    Manifest #: M-992288-XK
Consignee: Apex Robotics, LLC (Chicago, IL)  Container:  TGHU-442288-0

SKU / Description                              Qty        Weight (kg)
───────────────────────────────────────────────────────────────────────
TC-992: Servo Controllers                      420            840.00
TC-101: Precision Bearings                   1,200          1,450.00
───────────────────────────────────────────────────────────────────────
TOTAL CARGO WEIGHT:                                        2,290.00 kg

Seal Number: 000992288 (Verified Intact at Origin)

<span data-verify-line="pack">verify:sz-tech.com/cargo/v</span> <span verifiable-text="end" data-for="pack">]</span></pre>
  </div>
</div>

## Data Verified

Shipper/Consignee names, Manifest Number, Container ID, Seal Number, Line-item SKUs and quantities, Unit/Total Weights, HS Codes (Harmonized System), Origin/Destination ports, Date of loading.

**Document Types:**
- **Packing List:** Detailed inventory for warehouse/customs.
- **Shipping Manifest:** Summary of cargo for the carrier (vessel/plane).
- **Consignment Note:** Used in road transport (CMR).
- **Delivery Order:** Authorizing the release of goods at the destination.

## Data Visible After Verification

Shows the issuer domain (the Shipper or Freight Forwarder) and the current shipment standing.

**Status Indications:**
- **Shipped** — Goods have left the origin and inventory is verified.
- **In-Transit** — Location updated via carrier API.
- **Disputed/Hold** — **ALERT:** Discrepancy reported during offloading; inventory may be tampered with.
- **Void** — Manifest cancelled due to booking change.

## Second-Party Use

The **Warehouse Manager (Receiver)** benefits from verification.

**Unloading Efficiency:** Before opening the container, the manager scans the manifest. Verification confirms the "Expected SKU List" is authentic. If the hash doesn't match the paper, they can refuse the shipment *before* breaking the seal, protecting themselves from "Phantom Cargo" liability.

**Inventory Accuracy:** Instantly importing the verified packing list into their ERP (Warehouse Management System) without manual data entry errors.

## Third-Party Use

**Customs and Border Protection (CBP)**
**Smuggling Detection:** During a "tailgate" inspection, the officer scans the manifest. "Verified by sz-tech.com" ensures the paper wasn't "edited" to hide prohibited items. If the weights on the paper don't match the verified hash, the container is flagged for an X-ray scan.

**Cargo Insurers**
**Claim Adjudication:** In the event of a "Partial Loss" (theft of specific items), the insurer uses the verified manifest to prove exactly which SKUs were present at the time of loading, stopping "Claim Padding" by the receiver.

**Freight Forwarders**
**Liability Handoff:** Proving that the manifest they handed to the carrier was the exact, verified inventory received from the shipper.

## Verification Architecture

**The "Ghost SKU" Fraud Problem**

- **SKU Substitution:** Swapping 100 boxes of "Luxury Handbags" for 100 boxes of "Paper Towels" after the manifest is printed.
- **Weight Tampering:** Editing the weight on the paper to match what the truck scale says, hiding that part of the cargo was stolen during transit.
- **Seal Forgery:** Editing the "Seal Number" on the manifest to match a stolen or replacement seal.

**Issuer Types** (First Party)

**Exporting Manufacturers:** (Primary source of truth).
**NVOCCs (Non-Vessel Operating Common Carriers).**
**Customs Brokers.**

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


## Competition vs. EDI (Electronic Data Interchange)

| Feature | Live Verify | EDI (AS2/SFTP) | Scanned PDF Manifest |
| :--- | :--- | :--- | :--- |
| **Trust Anchor** | **Domain-Bound.** Bound to the Shipper. | **System-Bound.** Trust the network. | **Zero.** Easily forged. |
| **Field Access** | **Instant.** Scan the paper at the dock. | **Hard.** Requires access to secure portals. | **Instant.** |
| **Integrity** | **Binds Details.** Protects weights/SKUs. | **High.** Direct DB-to-DB. | **Vulnerable.** |
| **Cost** | **Free.** (Marginal implementation). | **High.** Requires complex integration. | **Free.** |

**Why Live Verify wins here:** The "Loading Dock" reality. Logistics is a world of paper. Trucks arrive at warehouses where drivers hand over clipboards. Dock workers don't have access to the multi-million dollar EDI systems used by headquarters. Live Verify turns the **Driver's Clipboard** into a live digital portal, ensuring that "Cargo Integrity" is a verified fact at the point of physical handoff.
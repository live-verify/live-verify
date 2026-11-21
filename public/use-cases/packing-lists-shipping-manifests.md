---
title: "Packing Lists and Shipping Manifests"
category: "Chain of Custody & Logistics"
volume: "Very Large"
retention: "7-10 years (customs/legal)"
slug: "packing-lists-shipping-manifests"
verificationMode: "clip"
tags: ["packing", "lists", "shipping", "manifests", "logistics", "transportation", "customs-compliance", "cargo-security"]
furtherDerivations: 1
---

## What is a Packing List?

In international trade, the Bill of Lading is the "Title" to the goods, but the Packing List is the "Inventory." It is the granular breakdown of every carton, SKU, and item inside a shipping container.

It is the primary document used by:
1.  **Customs Officers:** To verify that the physical cargo matches the legal declaration.
2.  **Warehouse Managers:** To ensure that what was unloaded from the truck matches what was promised.
3.  **Insurance Adjusters:** To calculate the exact value of loss if a single pallet is damaged or stolen.

**"Substitution Fraud"** is a major logistics risk. Criminals or dishonest shippers "edit" the packing list to hide high-value or illegal items (like lithium batteries or un-declared electronics) under a description of low-risk goods (like "Plastic Toys") to save on tariffs or bypass safety rules. Verified hashes bind the line-by-line inventory and container seal numbers to the shipper's warehouse domain.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #333; background: #fff; padding: 0; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
  <div style="padding: 20px; background: #fff;">
    <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="pack"></span>CARGO SHIPPING MANIFEST
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

<span data-verify-line="pack">verify:sz-tech.com/cargo/v</span> <span verifiable-text="end" data-for="pack"></span></pre>
  </div>
</div>

## The Problem: Ghost SKU Fraud

- **SKU Substitution:** Swapping 100 boxes of "Luxury Handbags" for 100 boxes of "Paper Towels" after the manifest is printed.
- **Weight Tampering:** Editing the weight on the paper to match what the truck scale says, hiding that part of the cargo was stolen during transit.
- **Seal Forgery:** Editing the "Seal Number" on the manifest to match a stolen or replacement seal.

## What Is Checked

Shipper/Consignee names, Manifest Number, Container ID, Seal Number, Line-item SKUs and quantities, Unit/Total Weights, HS Codes (Harmonized System), Origin/Destination ports, Date of loading.

**Document Types:**
- **Packing List:** Detailed inventory for warehouse/customs.
- **Shipping Manifest:** Summary of cargo for the carrier (vessel/plane).
- **Consignment Note:** Used in road transport (CMR).
- **Delivery Order:** Authorizing the release of goods at the destination.

## What the Checker Sees

Shows the issuer domain (the Shipper or Freight Forwarder) and the current shipment standing.

**Status Indications:**
- **Shipped** — Goods have left the origin and inventory is verified.
- **In-Transit** — Location updated via carrier API.
- **Disputed/Hold** — Discrepancy reported during offloading; inventory may be tampered with.
- **Void** — Manifest cancelled due to booking change.

## Who Holds It

The Warehouse Manager (Receiver) benefits from verification.

**Unloading Efficiency:** Before opening the container, the manager scans the manifest. Verification confirms the "Expected SKU List" is authentic. If the hash doesn't match the paper, they can refuse the shipment *before* breaking the seal, protecting themselves from "Phantom Cargo" liability.

**Inventory Accuracy:** Instantly importing the verified packing list into their ERP (Warehouse Management System) without manual data entry errors.

## Who Checks It

**Customs and Border Protection (CBP)**
**Smuggling Detection:** During a "tailgate" inspection, the officer scans the manifest. "Verified by sz-tech.com" ensures the paper wasn't "edited" to hide prohibited items. If the weights on the paper don't match the verified hash, the container is flagged for an X-ray scan.

**Cargo Insurers**
**Claim Adjudication:** In the event of a "Partial Loss" (theft of specific items), the insurer uses the verified manifest to prove exactly which SKUs were present at the time of loading, stopping "Claim Padding" by the receiver.

**Freight Forwarders**
**Liability Handoff:** Proving that the manifest they handed to the carrier was the exact, verified inventory received from the shipper.

## Who Issues It

**Issuer Types** (First Party)

**Exporting Manufacturers:** (Primary source of truth).
**NVOCCs (Non-Vessel Operating Common Carriers).**
**Customs Brokers.**

## Authority Chain

**Pattern:** Commercial

Shippers and freight forwarders issue packing lists and shipping manifests itemizing cargo contents. The issuer is self-authorized as the shipper responsible for accurate cargo declaration.

```
✓ manifest.ups.com/verify — Issues verified packing lists with SKU itemization and seal numbers
```

Commercial issuer — self-authorized. Trust rests on the issuer's domain reputation.

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Where Each Fits: Live Verify and EDI

Electronic Data Interchange (EDI), carried over channels such as AS2 or SFTP, is how shippers, carriers and large receivers exchange shipment data system to system. It is the authoritative channel between the systems at either end. Live Verify answers a narrower question at the dock: is this printed packing list the one the shipper issued? The two work side by side.

| | EDI (AS2, SFTP) | Live Verify on the packing list | Scanned PDF manifest |
| :--- | :--- | :--- | :--- |
| **Who can check** | Trading partners whose systems are connected. | Anyone handed the paper: a driver, a receiving clerk, a customs officer. | Nobody; it can only be taken on trust. |
| **What the checker gets** | Structured shipment data, direct from the sender's system. | Confirmation that the shipper issued this exact list, with its weights and SKUs, as at its date. | A document whose quantities may have been edited. |
| **What the shipper shares** | The data agreed with each partner. | The printed list that travels with the goods. | The list. |
| **Reach** | Partners who have set up a connection. | Global in principle: any shipper, in any country, that publishes hashes on its own domain. | Universal, but untrusted. |
| **Speed and cost** | Efficient at volume; setting up each connection takes integration work. | A few seconds per check: one web lookup, with no fee to the standard and no connection between the parties. | Immediate. |
| **What it needs** | Integrated systems at both ends, and access to them. | The shipper to publish hashes, and Live Verify-aware software on the checker's device. No shipper does this yet. | Nothing. |
| **Best suited to** | High-volume data exchange between established partners. | Checking paper at the handoff, and parties outside the EDI network. | Nothing where the count matters. |

**Where each fits:** EDI is how shippers, carriers and large receivers exchange shipment data at scale, and for the systems at either end it is the authoritative channel. At the dock, the driver and the receiving clerk are usually working from a printed packing list with no view of those messages. Live Verify lets them confirm the paper against the shipper's domain at the handoff, and the EDI exchange continues between head offices.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).

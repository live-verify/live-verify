---
title: "Container Packing Lists and Weight Certificates (VGM)"
category: "Chain of Custody & Logistics"
volume: "Large"
retention: "Shipment + 7 years"
slug: "container-packing-lists-vgm"
verificationMode: "clip"
tags: ["shipping", "logistics", "vgm", "solas", "container", "maritime-safety", "packing-list"]
furtherDerivations: 1
---

## What is a VGM Declaration?

When a massive cargo ship is loaded, the captain needs to know exactly how heavy every container is. If the ship is "top-heavy" or unbalanced, it can capsize and sink in a storm.

The Verified Gross Mass (VGM) is the official weight certificate for a container. By international law (SOLAS), no container can be put on a ship without one.

Shippers often "Guess" the weight to save the $50 fee for a certified scale. This "Guesswork" has led to several high-profile shipwrecks. Verified hashes ensure that the weight on the paper matches the official scale record at the port.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="vgm"></span>SOLAS VGM DECLARATION
Verified Gross Mass Certificate
═══════════════════════════════════════════════════════════════════

Container #:    MSKU-123456-7
Seal #:         MAE-998877
Booking #:      99228877
Date:           15 MAR 2026

VERIFIED GROSS MASS (VGM):                            24,550.00 KG

Shipper:        Global Furniture Exports, Ltd.
Method:         Method 1 (Weighing the entire container)

This declaration is made in accordance with the IMO SOLAS
Regulation VI/2. The signatory certifies that the mass has been
verified using calibrated and certified equipment.

Authorized Signatory: Robert J. Miller

<span data-verify-line="vgm">verify:global-furniture.com/vgm/v</span> <span verifiable-text="end" data-for="vgm"></span></pre>
</div>

## The Problem: Guessing Fraud

- **Weight Guessing:** Shippers writing a "Guess" on the paper to avoid the $50 cost of using a certified scale.
- **Misdeclaration:** Artificially lowering the weight on the paper to save on freight costs (since freight is often calculated by weight).
- **PDF Editing:** Changing the weight from 30,000kg to 20,000kg to meet the ship's maximum deck load limit.

## What Is Checked

Container ID, Seal ID, Booking number, Verified Gross Mass (VGM) in KG/LB, weighing method (Method 1 vs Method 2), shipper name, scale operator ID, scale certification status, date of weighing.

**Document Types:**
- **SOLAS VGM Certificate:** Required for every container loaded onto a ship.
- **Detailed Packing List:** Listing contents of the container.
- **Intermodal Equipment Provider (IEP) Log:** For chassis weight reconciliation.

## What the Checker Sees

Shows the issuer domain (the Shipper or Weighing Facility) and current weight status.

**Status Indications:**
- **VGM Confirmed** — Weight matches the official scale record.
- **Mismatch Alert** — Port scale and Shipper VGM differ by > 500kg.
- **Superseded** — Container was re-weighted (e.g., after transshipment).
- **Void** — Scale found to be out of calibration.

## Who Holds It

The Shipper (Exporter) benefits from verification.

**Vessel Loading:** Proving to the Carrier (e.g., Maersk or MSC) that the VGM is authentic. If the carrier suspects a fake weight, they will refuse to load the container, causing massive delays. A verified VGM hash prevents "Paper Rejections" at the terminal gate.

**Liability Protection:** In the event of a vessel accident (e.g., ship capsizing or losing containers), the shipper can prove they provided a cryptographically verified, accurate weight, defending against claims of "Overloading."

## Who Checks It

**Ocean Carriers (Vessel Command)**
**Vessel Stability:** The Chief Officer uses VGM data to plan the ship's stability (stowage plan). Verification ensures the data isn't "guessed" or fabricated, preventing catastrophic capsizing events.

**Port Terminal Operators**
**Gate Verification:** Automated gate systems can scan the VGM hash on the driver's tablet/paper. If it verifies, the container is allowed into the stack. If not, it is sent to the "Trouble Parking" area.

**Marine Insurers**
**Risk Management:** Ensuring that the project cargo they are insuring was accurately weighed and packed, reducing the risk of cargo shifting during storms.

## Who Issues It

**Issuer Types** (First Party)

**Exporters / Shippers:** (Using Method 2 - adding up weights).
**Public Scale Facilities:** (Using Method 1 - weighing the whole truck).
**Logistics Platforms:** (INTTRA, GTNexus - who aggregate VGM data).

## Authority Chain

**Pattern:** Commercial

Ocean carriers and port operators issue VGM declarations required by international maritime safety conventions.

```
✓ vgm.maersk.com — Declares verified container gross mass
  ✓ imo.org — Sets global maritime safety standards
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Compared With EDI Messaging (VERMAS)

| Feature | Live Verify | EDI VERMAS Message | Paper VGM Form |
| :--- | :--- | :--- | :--- |
| **Trust Anchor** | **Domain-Bound.** Bound to the Shipper. | **System-Bound.** Relies on the message not being corrupted. | **Zero.** Easily forged. |
| **Visibility** | **Visual.** The trucker can see it's verified. | **Invisible.** Happens between back-end systems. | **Visual.** |
| **Field Access** | **Instant.** Scan the paper at the gate. | **None.** Driver has no access to EDI logs. | **Manual.** |
| **Connectivity** | **Strong.** Works via simple web URL. | **Fragile.** Requires heavy B2B EDI infrastructure. | **Offline.** |

**Where each fits:** the EDI message is how the verified weight reaches the carrier and terminal systems, and that channel should stay as it is. The driver at the gate has no view of it and carries paper. Live Verify lets the gate clerk and driver check that paper against the shipper's domain, so the figure on the form can be compared with the one the carrier received electronically.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).

---
title: "Container Shipping Instructions"
category: "Chain of Custody & Logistics"
volume: "Large"
retention: "Shipment + 3-7 years"
slug: "container-shipping-instructions"
verificationMode: "clip"
tags: ["container", "shipping", "instructions", "logistics", "transportation", "booking-confirmation"]
furtherDerivations: 1
---

## What are Shipping Instructions?

Before a ship leaves, the exporter must send Shipping Instructions (SI) to the carrier (like Maersk or Hapag-Lloyd). This document tells the carrier exactly what to write on the final Bill of Lading.

It's the "Draft" of the most important paper in trade. It includes:
1.  **The Cargo:** "1,200 iPhones" vs "1,200 Books."
2.  **The Parties:** Who is sending and who is receiving.
3.  **The Route:** Which ports the ship will stop at.

Fraudsters often "mis-declare" cargo in the instructions (e.g., calling high-tax electronics "low-tax toys") to get a lower freight rate or bypass customs checks.

<div style="max-width: 600px; margin: 24px auto; font-family: 'Arial Narrow', sans-serif; border: 1px solid #000; background: #fff; padding: 0; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
  <div style="background: #002d62; color: #fff; padding: 10px; display: flex; justify-content: space-between; align-items: center;">
    <div style="font-weight: bold; font-size: 1.1em;"><span verifiable-text="start" data-for="ship"></span>MAERSK LINE</div>
    <div style="font-size: 0.8em;">SHIPPING INSTRUCTIONS (DRAFT)</div>
  </div>
<div style="padding: 20px;">
    <div style="display: flex; justify-content: space-between; font-size: 0.9em; margin-bottom: 20px;">
      <div>
        <strong>Shipper:</strong> Global Tech Exports, Inc.<br>
        <strong>Booking #:</strong> 99228877
      </div>
      <div style="text-align: right;">
        <strong>Vessel:</strong> MAERSK MC-KINNEY<br>
        <strong>Voyage:</strong> 2604W
      </div>
    </div>
<div style="font-size: 0.95em; line-height: 1.6; color: #333; border: 1px solid #000; padding: 15px; margin-bottom: 20px;">
      <p><strong>Cargo Description:</strong></p>
      <p>12 Pallets: Telecommunications Equipment<br>
      HS Code: 8517.62<br>
      Gross Weight: 4,500.00 KG</p>
    </div>
<div data-verify-line="ship" style="border-top: 1px dashed #999; margin-top: 25px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
      title="Demo only: Maersk doesn't yet offer verification&#10;endpoints, so this is illustrative">
      <span data-verify-line="ship">verify:maersk.com/si/v</span> <span verifiable-text="end" data-for="ship"></span>
    </div>
  </div>
</div>

## The Problem: Unverifiable Draft Instructions

The shipping instructions pass through several hands before the bill of lading is issued: exporter, forwarder, carrier, and later the bank and customs. Each party works from its own copy, usually a PDF, and has no simple way to confirm it matches what the carrier holds. A discrepancy that is noticed late means an amended bill of lading, a rejected letter of credit presentation, or a container held at the port.

- **Mis-declared cargo:** Goods are described as something cheaper or lower-duty to reduce freight charges or avoid customs attention.
- **Altered copies:** The version shown to a bank or customs agent differs from the instructions the carrier received.
- **Draft and final mismatch:** The bill of lading does not match the instructions, and the error is found only when documents are presented for payment.

## What Is Checked

Shipper name, Booking number, Vessel name, Voyage number, Cargo description, HS Codes, Weight, Destination port.

## What the Checker Sees

Shows the issuer domain (`maersk.com`) and current booking status.

**Status Indications:**
- **Draft Received** — Carrier has the instructions.
- **B/L Pending** — Instructions verified; final Bill of Lading being printed.
- **Mismatch Alert** — Description on SI does not match the physical scan at the port.

## Who Holds It

The Exporter (Shipper) benefits from verification.
- **Error Prevention:** Ensuring the carrier's final Bill of Lading exactly matches the verified instructions, preventing costly "Letter of Credit" rejections at the bank.
- **Draft Approval:** Instantly approving the digital draft from the carrier by verifying the hash against their own internal shipping system.

## Who Checks It

**Customs Authorities**
**Pre-manifest Screening:** Customs can verify the Shipping Instructions *before* the ship sails. If the description on the SI doesn't match the carrier's verified data, the container can be flagged for inspection at the loading port.

**Logistics Aggregators (Flexport / Freightos)**
**Data Integrity:** Automatically ingesting verified shipping data from dozens of different carriers into a single dashboard without manual data entry errors.

## Authority Chain

**Pattern:** Commercial

Ocean carriers issue shipping instructions to confirm the parameters of cargo placement. Self-authorized by their operational control of container ships and booking authority.

```
✓ si.maersk.com/verify — Issues container shipping instructions and vessel instructions
```

Commercial issuer — self-authorized. Trust rests on the issuer's domain reputation.

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Where Each Fits: Live Verify, EDI and Shared Shipping Ledgers

Shipping instructions between carriers and large shippers usually travel as EDI messages or through carrier portals, and some carriers and terminals also exchange documents on consortium ledgers such as GSBN. Both serve the parties connected to them. Live Verify answers a different question, whether the shipping instruction or draft a bank or agent outside those systems has been handed is the one the carrier or shipper issued, and the three work side by side.

| | EDI between carrier and shipper | Consortium ledger (GSBN) | Live Verify on the shipping instruction or draft |
| :--- | :--- | :--- | :--- |
| **Who can check** | The connected carrier and shipper systems. | Members of the network. | Anyone handed the document: an exporter's bank, a freight forwarder, a customs agent. |
| **What the checker gets** | Structured data, direct from the other party's system. | Shared records posted by members. | Confirmation that the carrier or shipper issued this exact text, as at its date. |
| **What the shipper shares** | Shipment data with the carrier. | Shipment data with permitted members. | Only the document. |
| **Reach** | Parties with an EDI link; well established among large carriers and shippers. | Members of that network, still a minority of the trade. | Global in principle: any carrier or shipper, in any country, that publishes hashes on its own domain. |
| **Speed and cost** | Automatic once connected; IT setup and network costs come first. | Fast between members; membership and integration come first. | A few seconds per check: one web lookup, with no fee to the standard. |
| **What it needs** | EDI capability on both sides. | Both parties on the network. | The carrier or shipper to publish hashes, and Live Verify-aware software on the checker's device. No carrier or shipper does this yet. |
| **Best suited to** | High-volume, system-to-system exchange. | Members who want a shared record. | Parties outside those systems who see only a PDF. |

**Where each fits:** EDI is the established channel between carriers and large shippers and remains the right choice for high-volume, system-to-system exchange; consortium ledgers serve their members in a similar way. Neither reaches parties outside those systems, such as the exporter's local bank or a foreign customs agent, who see only a PDF. Live Verify fills that gap by letting anyone holding the draft confirm it against the carrier's domain, alongside the EDI flow.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).

---
title: "Air Waybills"
category: "Chain of Custody & Logistics"
volume: "Large"
retention: "7-10 years (proof of shipment)"
slug: "air-waybills"
verificationMode: "clip"
tags: ["air", "air-freight", "awb", "cargo", "cargo-security", "freight", "freight-forwarding", "hawb", "iata", "logistics", "supply-chain", "trade-finance", "waybill"]
furtherDerivations: 2
---

## What is an Air Waybill?

An Air Waybill (AWB) is the legal contract between a shipper and an airline. It serves three vital roles:
1.  **Receipt:** Proof the airline received the goods.
2.  **Contract of Carriage:** The legal agreement defining where the goods are going and who pays.
3.  **Guide:** It travels with the cargo and tells ground crews how to handle it (e.g., "Keep Frozen").

Unlike a passenger ticket which is digital-first, AWBs are often physically attached to the freight pallets in a plastic pouch.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #000; background: #fff; padding: 0;">
  <div style="padding: 20px; background: #fff;">
    <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="awb"></span>016-12345678                    UNITED AIRLINES                    SFO
═══════════════════════════════════════════════════════════════════════
Shipper:                            Consignee:
Global Tech Exports, Inc.           EuroGadget GmbH
400 Silicon Valley Blvd             Flughafenstr. 1
San Jose, CA 95134                  Frankfurt, DE 60549

Pcs     Gross Wt    Chargeable    Nature of Goods
───────────────────────────────────────────────────────────────────────
10      500 kg      500 kg        Electronic Components
                                  (Lithium Ion Batteries)

Flight/Date:  UA926 / 15MAR26
Executed on:  14MAR26 at SFO by Agent: Expeditors

<span data-verify-line="awb">verify:unitedcargo.com/awb/v</span> <span verifiable-text="end" data-for="awb"></span></pre>
  </div>
</div>

## The Problem: Fake Waybill Fraud

- **Ghost Shipments:** Creating a fake AWB to claim payment from a buyer or bank (Trade Finance fraud) when no goods were shipped.
- **Weight Fraud:** Declaring low weight to airline to save freight costs, but high weight to customer to charge more.
- **Illegal Exports:** Mislabeling dangerous goods (batteries, chemicals) as "General Cargo" on the paper AWB to bypass safety checks.

## What Is Checked

AWB Number (Master or House), shipper, consignee, pieces, weight, nature of goods, flight details, execution date, carrier signature.

**Document Types:**
- **Master Air Waybill (MAWB):** Issued by airline to freight forwarder.
- **House Air Waybill (HAWB):** Issued by forwarder to actual shipper.
- **e-AWB Receipt:** Printed copy of electronic record.

## What the Checker Sees

Shows the issuer domain (Airline or Freight Forwarder) and shipment status.

**Status Indications:**
- **Booked** — Shipment registered but not yet received.
- **Received** — Cargo physically with carrier (RCS status).
- **Departed** — Cargo en route (DEP status).
- **Delivered** — Handed over to consignee (DLV status).

## Who Holds It

The Shipper or Consignee benefits from verification.

**Proof of Shipment:** Sellers need to prove to buyers (and banks for Letters of Credit) that goods were actually handed over to the airline. A verified AWB is the "Golden Key" for unlocking payment.

**Customs Clearance:** Importers in the destination country present the AWB to Customs. Verification ensures the value/weight matches what was declared to the airline, preventing "double invoicing" fraud.

## Who Checks It

**Customs Authorities**
**Risk Targeting:** Customs can verify the AWB data against the carrier's manifest *before* the plane lands. Discrepancies (e.g., AWB says "Books", manifest says "Electronics") trigger inspections.

**Insurance Companies**
**Cargo Claims:** When goods are lost/damaged, insurers verify the AWB to confirm the weight and nature of goods declared. If the shipper declared 50kg but claims for 500kg, verification catches the fraud.

**Truckers / Ground Handlers**
**Pickup Authority:** To prevent "fictitious pickup" (thieves posing as truckers), warehouses can verify the AWB presented by the driver matches the electronic release order.

## Who Issues It

**Issuer Types** (First Party)

**Airlines:** (United Cargo, Lufthansa Cargo, etc.)
**Freight Forwarders:** (DHL Global Forwarding, Kuehne+Nagel, etc.)

## Where Each Fits: Live Verify and IATA e-AWB

The electronic air waybill (e-AWB) is IATA's standard for replacing the paper master waybill with electronic messages between airlines, forwarders and handlers, often exchanged through cargo community systems. It is widely used, but adoption varies by airline, airport and country, and some lanes still need paper. e-AWB and Live Verify answer different questions and work side by side: e-AWB moves the data between connected parties, while Live Verify lets anyone holding the printed waybill check it.

| | IATA e-AWB | Live Verify on the air waybill |
| :--- | :--- | :--- |
| **Who can check** | Airlines, forwarders and handlers connected to the messaging or a cargo community system. | Anyone handed the waybill: a trucker, a bank, an insurer, a customs officer. |
| **What the checker gets** | Structured shipment data that updates as the shipment moves. | Confirmation that the issuer stands behind this exact printed waybill, as at origin. |
| **What the shipper shares** | Data with connected parties. | Only the waybill they chose to hand over. |
| **Reach** | Wherever the airline, forwarder and handler have all adopted it; some countries and lanes still require paper. | Global in principle: any carrier or forwarder that publishes hashes on its own domain. |
| **Speed and cost** | Fast between connected parties; joining needs integration and often membership of a community system. | A few seconds per check: one web lookup, with no fee to the standard and no integration with the issuer. |
| **What it needs** | All parties connected to the same messaging. | The issuer to publish hashes, and Live Verify-aware software on the checker's device. No airline or forwarder does this yet. |
| **Best suited to** | Removing paper between connected cargo parties. | Paper legs: trucking, customs, banks and insurers outside the cargo systems. |

**Where each fits:** where the airline, forwarder and handler are all connected, e-AWB is the better route, and it removes paper from most of the journey. Paper still accompanies freight on trucking legs and through customs in places that require it, and banks and insurers are generally outside the cargo community systems. Live Verify gives those parties a quick way to check the printed waybill against the issuer's domain, if their software honours it, alongside e-AWB rather than as an alternative to it.

---

_[Content merged from: house-air-waybills-hawb]_

## What is a House Air Waybill (HAWB)?

If a small business ships a box of lenses from Switzerland to the US, they don't talk to the airline directly. They talk to a Freight Forwarder (like DHL or Kuehne+Nagel).

The forwarder gives them a House Air Waybill (HAWB). It is the contract for that specific box. The forwarder then groups 100 boxes together into one "Master" shipment for the plane.

Fraud is common in the "Long Tail" of logistics: un-vetted forwarders sometimes create fake HAWBs to trick banks into releasing "Trade Financing" for goods that were never actually shipped. Verified hashes prove the forwarder's claim matches their official system.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="hawb"></span>KUEHNE+NAGEL                            HAWB No: KN-9988776655

Shipper:                            Consignee:
Precision Instruments, SA           Apex Research Lab, LLC
Geneva, Switzerland                 Cambridge, MA, USA

Airport of Dept:  GVA (Geneva)      MAWB No: 085-99228877
Airport of Dest:  BOS (Boston)

No. of Pieces    Description                      Weight (KG)
───────────────────────────────────────────────────────────────────────
4 Cartons        Scientific Optical Lenses            120.50

The carrier certifies that the goods described above were
received for carriage in apparent good order and condition.

<span data-verify-line="hawb">verify:kuehne-nagel.com/hawb/v</span> <span verifiable-text="end" data-for="hawb"></span></pre>
</div>

## What Is Checked

HAWB Number, Master Air Waybill (MAWB) number, Shipper name, Consignee name, Airport of Departure/Destination, total piece count, gross weight, cargo description (e.g., "Optical Lenses"), freight charges status (Prepaid/Collect), date of issuance, issuing forwarder ID.

**Document Types:**
- **House Air Waybill (HAWB):** Issued by the freight forwarder to the actual shipper.
- **Consolidation Manifest:** (Linked hash) grouping multiple HAWBs under one MAWB.
- **Cargo Charges Correction Advice (CCCA):** For post-flight billing changes.

## What the Checker Sees

Shows the issuer domain (the Freight Forwarder) and current shipment status.

**Status Indications:**
- **Booked** — HAWB created; space reserved.
- **Received** — Cargo in forwarder's possession.
- **Manifested** — HAWB assigned to a flight (MAWB).
- **Delivered** — HAWB cargo handed over to consignee.
- **Void** — Replaced by a corrected waybill.

## Who Holds It

The Actual Shipper (SME / Manufacturer) benefits from verification.

**Trade Finance:** Proving to a local bank that the $50,000 shipment of lenses is "Verified Manifested" on a specific flight. HAWBs are often required for payment under Letters of Credit; a verified hash prevents the bank from rejecting the document due to "Paperwork Uncertainty."

**Cargo Insurance:** Proving the exact weight and condition at the moment of handoff to the forwarder, ensuring no "Shadow Damage" is blamed on the shipper.

## Who Checks It

**Consignees (Importers)**
**Payment Release:** A buyer in Boston can verify the HAWB provided by the Swiss seller to ensure the goods are actually in the Kuehne+Nagel system before wiring the final balance.

**Customs Brokers**
**Entry Vetting:** Verifying that the HAWB data matches the commercial invoice and the manifest before filing the entry with Customs, reducing the risk of "Data Mismatch" fines.

**Air Carriers (Airlines)**
**Consolidation Integrity:** Ensuring that the HAWB data provided by the forwarder for a consolidated pallet matches the official forwarder records.

## How Verification Works Here

**The "Phantom Consolidation" Fraud Problem**

- **Fabricated HAWBs:** Small, un-vetted forwarders creating fake HAWBs for shipments that don't exist, to trick banks into providing "Trade Financing."
- **Weight Tampering:** Editing a HAWB to show 100kg instead of 1,000kg to save on high-priority air freight surcharges.
- **Description Hiding:** Changing "Hazardous Chemicals" to "Water Samples" on the HAWB to bypass airline safety restrictions.

**Issuer Types** (First Party)

**Freight Forwarders (NVOCCs):** (e.g., DHL, Kuehne+Nagel, Expeditors).
**Logistics Platforms:** (e.g., Flexport, Forto).
**Cargo Community Systems (CCS).**

## Authority Chain

**Pattern:** Commercial

```
✓ cargo.united.com/awb/verify — Carries air freight under IATA agreements
  ✓ iata.org — Sets standards for international air transport
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Where Each Fits: Live Verify and e-AWB for House Waybills

Forwarders that are set up for IATA's Cargo-XML messaging can send house waybill data electronically to airlines and other connected parties. Many smaller forwarders still issue house waybills as PDF or paper. e-AWB messaging and Live Verify answer different questions and work side by side: the messaging moves data between connected parties, while Live Verify lets a shipper or bank check the house waybill it has been handed.

| | Cargo-XML e-AWB messaging | Live Verify on the house waybill | Paper or PDF house waybill |
| :--- | :--- | :--- | :--- |
| **Who can check** | Parties connected to the same messaging network. | Anyone handed the waybill: a small shipper, a bank, an insurer. | Nobody; it can only be taken on trust. |
| **What the checker gets** | Structured data from the forwarder's system. | Confirmation that the forwarder issued this exact waybill, with those weights and piece counts, as at its date. | A document that may have been edited. |
| **What the shipper shares** | Data with connected parties. | Only the waybill they chose to hand over. | The waybill. |
| **Reach** | Forwarders and airlines that have set up the messaging. | Global in principle: any forwarder that publishes hashes on its own domain. | Universal, but untrusted. |
| **Speed and cost** | Fast once set up; the messaging setup is substantial work. | A few seconds per check: one web lookup, with no fee to the standard. | Free and immediate. |
| **What it needs** | Both parties on the network. | The forwarder to publish hashes, and Live Verify-aware software on the checker's device. No forwarder does this yet. | Nothing. |
| **Best suited to** | High-volume exchange between connected parties. | Shippers and banks outside the network. | Nothing where the weights or counts matter. |

**Where each fits:** forwarders already set up for Cargo-XML messaging have little reason to move away from e-AWB between connected parties. Many smaller forwarders still issue house waybills as PDF or paper, and the shipper or bank receiving one is not on the e-AWB network. Live Verify lets that recipient confirm the forwarder issued the document with those weights and piece counts, and it can sit on the same paperwork that larger forwarders also transmit electronically.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).

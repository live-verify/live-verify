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

## Jurisdictional Witnessing (Optional)

An independent witness layer may apply — see [Witnessing Third Parties](../../docs/WITNESSING-THIRD-PARTIES.md) for the full mechanism (what a witness receives, non-repudiation, optional public-blockchain rollups). For this use case: a witness would receive the carrier's hashes and status changes plus structured metadata (shipment number, routing, dates) — never plaintext or sensitive personal information — providing non-repudiation of the document.

## Compared With e-AWB (Electronic Air Waybill)

| Feature | Live Verify | e-AWB (IATA) |
| :--- | :--- | :--- |
| **Adoption** | **Universal.** Works even for small forwarders/airlines not fully integrated. | **High but not 100%.** Many lanes/countries still require paper. |
| **Physical Handoff** | **Strong.** Verifies the paper accompanying the freight in the truck. | **Weak.** Truckers often don't have access to the e-AWB system; they carry paper. |
| **Interoperability** | **Web-based.** Anyone (bank, insurer, customs) can verify. | **Siloed.** Cargo Community Systems (CCS) require membership/login. |
| **Data Integrity** | **Snapshot.** Proves what was printed at origin. | **Dynamic.** System data updates; audit trail of changes can be complex. |

**Where each fits:** where the airline, forwarder and handler are all connected, e-AWB is the better route, and it removes paper from most of the journey. Paper still accompanies freight on trucking legs and through customs in places that require it, and banks and insurers are generally outside the cargo community systems. Live Verify gives those parties a way to check the printed waybill against the issuer's domain, alongside e-AWB rather than as an alternative to it.


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

## Jurisdictional Witnessing (Optional)

An independent witness layer may apply — see [Witnessing Third Parties](../../docs/WITNESSING-THIRD-PARTIES.md) for the full mechanism (what a witness receives, non-repudiation, optional public-blockchain rollups). For this use case: a witness would receive the carrier's hashes and status changes plus structured metadata (shipment number, routing, dates) — never plaintext or sensitive personal information — providing non-repudiation of the document.

## Compared With IATA e-AWB

| Feature | Live Verify | IATA e-AWB (Cargo-XML) | Paper HAWB |
| :--- | :--- | :--- | :--- |
| **User Access** | **Universal.** Any small shipper/bank can verify. | **Restricted.** Requires complex IATA Cargo-XML messaging setup. | **Instant.** |
| **Trust Anchor** | **Domain-Bound.** Bound to the Forwarder. | **System-Bound.** | **Zero.** Easily forged. |
| **Interoperability** | **High.** PDFs stay verifiable across systems. | **Medium.** Requires both parties to be on the e-AWB network. | **Universal.** |
| **Integrity** | **Binds Content.** Protects the weight/count. | **Data-Only.** | **Vulnerable.** |

**Where each fits:** forwarders already set up for Cargo-XML messaging have little reason to move away from e-AWB between connected parties. Many smaller forwarders still issue house waybills as PDF or paper, and the shipper or bank receiving one is not on the e-AWB network. Live Verify lets that recipient confirm the forwarder issued the document with those weights and piece counts, and it can sit on the same paperwork that larger forwarders also transmit electronically.

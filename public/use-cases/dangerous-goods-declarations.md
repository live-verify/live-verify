---
title: "Dangerous Goods Declarations"
category: "Customs & Trade Compliance"
volume: "Small"
retention: "7-30 years (safety/liability)"
slug: "dangerous-goods-declarations"
tags: ["adr", "air-cargo", "aviation-safety", "cargo-security", "container-shipping", "dangerous-goods", "dot-hazmat", "hazmat", "hazmat-declaration", "highway-safety", "iata-dgr", "imdg-code", "imo-dgd", "logistics", "maritime-safety", "road-transport", "safety-data-sheet", "shipper-declaration"]
furtherDerivations: 3
---

## What is a DG Declaration?

You cannot just put a box of Lithium batteries or chemicals on a plane. By international law, you must file a **Dangerous Goods (DG) Declaration**.

This document tells the pilot and the ground crew: "This box is dangerous. If it leaks, use *this* specific fire extinguisher."

Shady shippers often "Mis-declare" cargo—calling dangerous batteries "Toys" on the paper form to save money or bypass safety rules. This has caused multiple plane crashes. Verified hashes ensure the safety data on the paper pallet matches the certified packer's official record.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="dgr">[</span>SHIPPER'S DECLARATION FOR DANGEROUS GOODS
In Compliance with IATA Dangerous Goods Regulations (DGR)
═══════════════════════════════════════════════════════════════════

Shipper:            Lithium-Power Tech, Ltd.
                    Shenzhen, China
Air Waybill No:     016-99228877
Page:               1 of 1

UN Number    Description                          Class    Pkg Grp
───────────────────────────────────────────────────────────────────
UN 3480      Lithium Ion Batteries (Section IA)   9        II

I declare that all of the applicable air transport requirements
have been met. The goods are in proper condition for carriage by
air according to the applicable International and National
Government Regulations.

Signatory:  Wang Wei (Certified Packer)
Date:       15 MAR 2026

<span data-verify-line="dgr">verify:iata-dgr.org/v</span> <span verifiable-text="end" data-for="dgr">]</span></pre>
</div>

## Data Verified

Shipper name, Air Waybill (AWB) number, UN Number (e.g., UN3480), Proper Shipping Name, Hazard Class (1-9), Packing Group (I, II, III), Net Quantity per package, emergency contact number, signatory name, date of declaration.

**Document Types:**
- **Shipper's Declaration (DGD):** The primary red-bordered legal form.
- **Cargo Aircraft Only (CAO) Notice:** For goods prohibited on passenger planes.
- **NOTOC (Notice to Captain):** (Linked hash) proving the pilot was informed of the hazmat on board.

## Data Visible After Verification

Shows the issuer domain (the Shipper, Airline, or IATA Validator) and current safety status.

**Status Indications:**
- **Verified** — Declaration matches the certified packer's official log.
- **Accepted for Carriage** — Airline has performed the "Acceptance Checklist" and verified the goods.
- **Suspended** — Recalled/Blocked (e.g., due to battery fire safety alert).
- **Invalid** — Signatory not authorized or details mismatch.

## Second-Party Use

The **Shipper (Manufacturer)** benefits from verification.

**Vessel Acceptance:** Proving to the Airline (e.g., Lufthansa Cargo) that the batteries were packed and declared by a "Verified Certified Professional." This prevents the cargo from being rejected at the airport warehouse due to "Paperwork Inconsistency."

**Liability Protection:** In the event of an in-flight fire, the shipper can prove they provided a cryptographically verified, accurate declaration of the hazard level, defending against "Willful Misdeclaration" criminal charges.

## Third-Party Use

**Airline Loadmasters / Pilots**
**Flight Safety:** The Captain uses the DGD data to calculate fire suppression needs and cargo placement. Verification ensures the data isn't "guessed" or fabricated, preventing catastrophic mid-air incidents.

**Ground Handlers (Swissport / Menzies)**
**Acceptance Check:** Warehouse staff scan the hash while walking the floor. "Verified by IATA System" allows them to instantly trust the paper without calling the shipper's office.

**Insurance Companies**
**Aviation Liability:** Verifying that all hazardous cargo on a lost aircraft was properly declared and met all IATA safety standards before paying out a multimillion-dollar hull claim.

## Verification Architecture

**The "Phantom Batteries" Fraud Problem**

- **Misclassification:** Declaring dangerous Lithium batteries as "General Cargo" or "Toys" on the paper form to save on freight costs and bypass safety checks.
- **Quantity Inflation:** Shipping 500kg of chemicals but only declaring 50kg on the paper to meet "Passenger Plane" limits.
- **Signature Forgery:** Forging the signature of a certified "Dangerous Goods Professional" who never actually saw the cargo.

**Issuer Types** (First Party)

**Certified Shippers.**
**Specialist Packing Firms.**
**Airlines / Carriers.**
**IATA:** (Providing the global validation framework).

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


## Competition vs. e-DGD (Electronic Data)

| Feature | Live Verify | e-DGD (IATA Digital) | Paper DGD Form |
| :--- | :--- | :--- | :--- |
| **Field Access** | **Instant.** Scan the paper on the pallet. | **Hard.** Requires warehouse staff to have tablet access to IATA's private cloud. | **Instant.** |
| **Trust Anchor** | **Domain-Bound.** Bound to the Shipper/Packer. | **Platform-Bound.** Trust the IATA central hub. | **Zero.** Easily forged. |
| **Connectivity** | **Strong.** Paper works inside lead-shielded warehouses. | **Fragile.** Requires 100% 5G/Wi-Fi coverage on the tarmac. | **Offline.** |
| **Integrity** | **Binds Content.** Proves the *UN Number* matches. | **Data-Only.** | **Vulnerable.** |

**Why Live Verify wins here:** The "Warehouse reality." Air cargo hubs are massive, metal-clad buildings where Wi-Fi is spotty and staff move fast. They rely on the "Persistent Paper" attached to the boxes. Live Verify turns that paper into a **Live Safety Link**, ensuring the person loading the plane has the same verified data as the person who packed the box.


---

_[Content merged from: dangerous-goods-declarations-imo-icao]_


## What is an IMO Declaration?

When a shipping container full of chemicals (like Acetone or Pesticides) is put on a ship, the captain needs to know exactly where to put it. Flammable items can't be next to explosive items.

The **IMO Dangerous Goods Declaration** is the "Safety Blueprint" for the container.

Fraudsters often edit these PDFs to hide that a chemical is toxic, just to get it onto a faster ship or to save on port fees. Verified hashes allow the ship's captain and port firefighters to see the **un-altered hazard class** instantly, preventing catastrophic fires at sea.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="imo-dgd">[</span>DANGEROUS GOODS DECLARATION (IMO)
In accordance with the IMDG Code and SOLAS 74
═══════════════════════════════════════════════════════════════════

1. Shipper / Exporter:      Industrial Chemicals, Gmbh.
                            Frankfurt, Germany

2. Consignee:               Global Logistics Hub, LLC
                            Houston, TX, USA

UN Number:      UN 1090
Class:          3 (Flammable)
Packing Group:  II

3. Proper Shipping Name:    ACETONE
4. Container ID:            MSKU-998877-6

I hereby declare that the contents of this consignment are fully
and accurately described above and are classified, packaged,
marked and labeled/placarded in accordance with the applicable
international and national governmental regulations.

Signatory:  Hans Muller
Date:       15 MAR 2026

<span data-verify-line="imo-dgd">verify:hapaq-lloyd.com/dgd/v</span> <span verifiable-text="end" data-for="imo-dgd">]</span></pre>
</div>

## Data Verified

Shipper name, Consignee name, UN Number, Class/Division, Packing Group, Proper Shipping Name, Flash point (for maritime), marine pollutant status, number/type of packages, container ID, signatory name, date.

**Document Types:**
- **IMO Dangerous Goods Declaration:** For ocean freight (IMDG Code).
- **Multimodal DG Form:** For shipments moving by road and sea.
- **Container Packing Certificate:** Proving the DG was properly braced inside the box.

## Data Visible After Verification

Shows the issuer domain (the Shipper or Carrier) and current safety status.

**Status Indications:**
- **Verified** — Declaration matches the shipper's official safety filing.
- **Accepted** — Port/Carrier has verified the physical labels and placards.
- **Blocked** — **ALERT:** Discrepancy found in hazard class; do not load.
- **Void** — Replaced by an amended declaration.

## Second-Party Use

The **Shipper (Manufacturer)** benefits from verification.

**Vessel Space Allocation:** Proving to the Ocean Carrier (e.g., Hapag-Lloyd) that the hazardous chemicals are "Verified Accurately Declared." Carriers are extremely risk-averse with DG; a verified hash prevents the container from being "Left on the Dock" due to paperwork suspicion.

**Liability Defense:** If a container leaks at sea, the shipper can prove they provided a cryptographically verified, accurate declaration of the chemical's flash point and class, defending against claims of "Negligent Misdeclaration."

## Third-Party Use

**Vessel Command (The Captain)**
**Stowage Safety:** The Captain uses the DGD to ensure flammable liquids (Class 3) aren't stored next to explosives or acids. Verification ensures the data isn't "guessed," preventing catastrophic ship-board fires.

**Port Terminal Operators**
**Emergency Response:** In the event of a leak in the terminal, firefighters scan the hash on the container door or paperwork. "Verified by Hapag-Lloyd" provides instant, trusted access to the emergency response codes (ERG).

**Marine Insurers**
**Risk Management:** Ensuring that all "Hazardous Loads" on a vessel were properly declared before writing high-value hull/cargo policies.

## Verification Architecture

**The "Phantom Chemical" Fraud Problem**

- **Class Downgrading:** Declaring a highly toxic chemical as a low-hazard one to get it onto a passenger-compatible vessel or to save on freight surcharges.
- **Flash-point Tampering:** Editing the "Flash Point" on the PDF to make a flammable liquid look safer than it is to bypass "Below Deck" storage restrictions.
- **Container Swapping:** Using a valid DGD for a safe container to hide an illegal or leaking one.

**Issuer Types** (First Party)

**Chemical Manufacturers.**
**Certified DG Packers.**
**Ocean Carriers / Ship Lines.**

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

**Jurisdictional Requirements (United States)**

The IRS does not mandate or recognize third-party witnessing firms for federal tax documents. The IRS maintains authoritative records within its own systems, and verification occurs via direct query to IRS endpoints.

However:
- **State tax authorities** may have different requirements (e.g., state-level charity registration requires independent witness firms)
- **International stakeholders** (foreign tax authorities, treaty partners) may demand independent verification from witness firms not located in the US
- **FATCA compliance** (Foreign Account Tax Compliance Act) may require US documents to be witnessed by non-US firms when shared across borders

**Public Blockchain (Non-Party)**

Witnessing firms may periodically commit rollups to an inexpensive public blockchain, providing an ultimate immutability guarantee. The blockchain is a "non-party"—infrastructure, not a participant in the transaction. This creates multiple verification paths:

1. **Issuer domain** — Direct check against the issuer
2. **Witnessing firm** — Independent confirmation with timestamp
3. **Public blockchain** — Decentralized trust anchor via rollup inclusion


## Competition vs. Port Community Systems (PCS)

| Feature | Live Verify | PCS / Central Hub | Paper DGD |
| :--- | :--- | :--- | :--- |
| **Field Access** | **Instant.** Scan the paper at the gate. | **Difficult.** Requires truckers/clerks to have complex portal logins. | **Instant.** |
| **Trust Anchor** | **Domain-Bound.** Trust the Shipper. | **System-Bound.** Trust the Port's IT vendor. | **Zero.** Easily forged. |
| **Connectivity** | **Strong.** Paper works at remote berths. | **Fragile.** Port IT systems often experience downtime. | **Offline.** |
| **Interoperability** | **Universal.** Works across any port/carrier. | **Siloed.** Hamburg's PCS doesn't talk to Singapore's. | **Universal.** |

**Why Live Verify wins here:** The "Intermodal Handoff." A chemical container moves from Factory (Truck) -> Port Gate -> Vessel -> Destination Port. At every step, a different entity takes responsibility. Live Verify turns the **Existing Paper Standard** into a universal digital bridge that moves *with the cargo*, providing "Single Source of Truth" trust without needing a global IT integration.

---

_[Content merged from: dangerous-goods-transport-road]_


## What is a Hazmat Manifest?

When a truck carries hazardous materials (like Gasoline or Acid), the driver must carry a **Transport Document** (called an ADR note in Europe or a Hazmat Manifest in the US).

If the truck crashes, **First Responders** (Firefighters) look for this paper first. It tells them: "Approach from upwind" or "Do not use water on this fire."

Fraudsters often "Downgrade" the hazard on the paper form to bypass tunnel restrictions or to save on insurance. Verified hashes allow firefighters to scan the paperwork at the crash site and see the **verified hazard class** from the shipper's domain instantly.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="road-dg">[</span>DANGEROUS GOODS TRANSPORT DOCUMENT
In accordance with ADR 5.4.1 / DOT 172.200
═══════════════════════════════════════════════════════════════════

1. Consignor (Shipper):     EuroChem Industrial, SA
                            Lyon, France

2. Carrier:                 Trans-Euro Freight, Ltd.
                            Berlin, Germany

HAZARDOUS MATERIALS DESCRIPTION:
───────────────────────────────────────────────────────────────────
UN 1203, GASOLINE, 3, PG II, (D/E)
Quantity: 24,000 Liters (Bulk Tanker)

3. Emergency Contact:       CHEMTREC +1 703-527-3887

The driver confirms the vehicle is equipped with mandatory
fire extinguishers and ADR/DOT placards.

<span data-verify-line="road-dg">verify:trans-euro.com/dg/v</span> <span verifiable-text="end" data-for="road-dg">]</span></pre>
</div>

## Data Verified

Consignor name, Carrier ID (DOT/MC #), UN Number (e.g., UN1203), Proper Shipping Name, Hazard Class (1-9), Packing Group (I, II, III), ADR Tunnel Code (e.g., D/E), total quantity, emergency contact information, date of transport.

**Document Types:**
- **ADR Transport Document:** Standard for European road transport.
- **DOT Hazmat Manifest:** Required for U.S. highway transport.
- **SDS (Safety Data Sheet):** (Linked hash) for technical chemical properties.
- **Driver Training Certificate:** Proving the driver is "Hazmat Endorsed."

## Data Visible After Verification

Shows the issuer domain (the Shipper or Carrier) and the safety standing.

**Status Indications:**
- **Verified** — Transport document matches the official manifest.
- **In-Transit** — Goods are currently on the road.
- **Delivered** — Shipment completed; cargo transferred.
- **Restriction Active** — **ALERT:** Recent safety restriction on this chemical/route.

## Second-Party Use

The **Truck Driver / Carrier** benefits from verification.

**Roadside Inspections:** Proving to a Highway Patrol officer or Gendarmerie that the "Gasoline" declaration is verified by the shipper. This prevents the truck from being impounded due to a suspected "Paperwork Forgery" designed to hide more dangerous chemicals.

**Tunnel/Bridge Access:** Instantly proving compliance with "Tunnel Codes" (e.g., ADR Code D/E) to tunnel authorities, ensuring the truck is allowed to enter restricted infrastructure.

## Third-Party Use

**Highway Patrol / First Responders**
**Accident Response:** If a tanker crashes, firefighters scan the hash on the paperwork or vehicle. "Verified by EuroChem" provides instant, trusted confirmation of the hazard class, potentially saving lives by ensuring the correct fire-suppression method is used.

**Facility Gate Security**
**Site Safety:** A refinery or chemical plant can scan the driver's documents before opening the gate. Verification ensures the truck isn't carrying unauthorized or "Blacklisted" materials.

**Environmental Agencies**
**Liability Tracking:** Ensuring that high-risk chemicals are being moved by carriers with the verified insurance and safety records required for hazardous transport.

## Verification Architecture

**The "High-Road" Fraud Problem**

- **UN Number Tampering:** Editing a UN number for a "Highly Toxic" chemical to look like a "Low Hazard" liquid to take a shorter route through a city or tunnel.
- **Driver Impersonation:** An un-endorsed driver using a fake "Hazmat Certificate" to drive a tanker.
- **Phantom Manifests:** Creating fake DG papers to hide the illegal transport of chemical waste.

**Issuer Types** (First Party)

**Chemical Shippers / Manufacturers.**
**Transport Carriers.**
**Hazmat Compliance Platforms:** (e.g., Labelmaster, DGOffice).

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

**Jurisdictional Requirements (United States)**

The IRS does not mandate or recognize third-party witnessing firms for federal tax documents. The IRS maintains authoritative records within its own systems, and verification occurs via direct query to IRS endpoints.

However:
- **State tax authorities** may have different requirements (e.g., state-level charity registration requires independent witness firms)
- **International stakeholders** (foreign tax authorities, treaty partners) may demand independent verification from witness firms not located in the US
- **FATCA compliance** (Foreign Account Tax Compliance Act) may require US documents to be witnessed by non-US firms when shared across borders

**Public Blockchain (Non-Party)**

Witnessing firms may periodically commit rollups to an inexpensive public blockchain, providing an ultimate immutability guarantee. The blockchain is a "non-party"—infrastructure, not a participant in the transaction. This creates multiple verification paths:

1. **Issuer domain** — Direct check against the issuer
2. **Witnessing firm** — Independent confirmation with timestamp
3. **Public blockchain** — Decentralized trust anchor via rollup inclusion


## Competition vs. Central Portals (ERMA)

| Feature | Live Verify | Gov Hazmat Portal | Paper Manifest |
| :--- | :--- | :--- | :--- |
| **Field Access** | **Instant.** Scan the paper at the crash site. | **Difficult.** Requires responders to have specific portal logins and stable internet. | **Instant.** |
| **Trust Anchor** | **Domain-Bound.** Bound to the Shipper. | **Gov-Bound.** | **Zero.** Easily forged. |
| **Connectivity** | **Strong.** Works in rural areas/dead zones. | **Fragile.** Portals often lag during emergencies. | **Offline.** |
| **Integrity** | **Binds Data.** Protects the UN Number. | **Data-Only.** | **Vulnerable.** |

**Why Live Verify wins here:** The "Emergency Response" reality. In a highway accident, seconds matter. First responders don't have time to navigate a government portal. Live Verify turns the **Paper Manifest** into a live, trusted safety link that works anywhere there is a phone, ensuring that responders know exactly what they are dealing with before they approach the flames.

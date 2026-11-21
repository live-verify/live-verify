---
title: "Dangerous Goods Declarations"
category: "Customs & Trade Compliance"
volume: "Small"
retention: "7-30 years (safety/liability)"
slug: "dangerous-goods-declarations"
verificationMode: "clip"
tags: ["adr", "air-cargo", "aviation-safety", "cargo-security", "container-shipping", "dangerous-goods", "dot-hazmat", "hazmat", "hazmat-declaration", "highway-safety", "iata-dgr", "imdg-code", "imo-dgd", "logistics", "maritime-safety", "road-transport", "safety-data-sheet", "shipper-declaration"]
furtherDerivations: 3
---

## What is a DG Declaration?

You cannot just put a box of Lithium batteries or chemicals on a plane. By international law, you must file a Dangerous Goods (DG) Declaration.

This document tells the pilot and the ground crew: "This box is dangerous. If it leaks, use *this* specific fire extinguisher."

Shady shippers often "Mis-declare" cargo—calling dangerous batteries "Toys" on the paper form to save money or bypass safety rules. This has caused multiple plane crashes. Verified hashes ensure the safety data on the paper pallet matches the certified packer's official record.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="dgr"></span>SHIPPER'S DECLARATION FOR DANGEROUS GOODS
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

<span data-verify-line="dgr">verify:iata-dgr.org/v</span> <span verifiable-text="end" data-for="dgr"></span></pre>
</div>

## The Problem: Phantom Batteries Fraud

- **Misclassification:** Declaring dangerous Lithium batteries as "General Cargo" or "Toys" on the paper form to save on freight costs and bypass safety checks.
- **Quantity Inflation:** Shipping 500kg of chemicals but only declaring 50kg on the paper to meet "Passenger Plane" limits.
- **Signature Forgery:** Forging the signature of a certified "Dangerous Goods Professional" who never actually saw the cargo.

## What Is Checked

Shipper name, Air Waybill (AWB) number, UN Number (e.g., UN3480), Proper Shipping Name, Hazard Class (1-9), Packing Group (I, II, III), Net Quantity per package, emergency contact number, signatory name, date of declaration.

**Document Types:**
- **Shipper's Declaration (DGD):** The primary red-bordered legal form.
- **Cargo Aircraft Only (CAO) Notice:** For goods prohibited on passenger planes.
- **NOTOC (Notice to Captain):** (Linked hash) proving the pilot was informed of the hazmat on board.

## What the Checker Sees

Shows the issuer domain (the Shipper, Airline, or IATA Validator) and current safety status.

**Status Indications:**
- **Verified** — Declaration matches the certified packer's official log.
- **Accepted for Carriage** — Airline has performed the "Acceptance Checklist" and verified the goods.
- **Suspended** — Recalled/Blocked (e.g., due to battery fire safety alert).
- **Invalid** — Signatory not authorized or details mismatch.

## Who Holds It

The Shipper (Manufacturer) benefits from verification.

**Vessel Acceptance:** Proving to the Airline (e.g., Lufthansa Cargo) that the batteries were packed and declared by a "Verified Certified Professional." This prevents the cargo from being rejected at the airport warehouse due to "Paperwork Inconsistency."

**Liability Protection:** In the event of an in-flight fire, the shipper can prove they provided a cryptographically verified, accurate declaration of the hazard level, defending against "Willful Misdeclaration" criminal charges.

## Who Checks It

**Airline Loadmasters / Pilots**
**Flight Safety:** The Captain uses the DGD data to calculate fire suppression needs and cargo placement. Verification ensures the data isn't "guessed" or fabricated, preventing catastrophic mid-air incidents.

**Ground Handlers (Swissport / Menzies)**
**Acceptance Check:** Warehouse staff scan the hash while walking the floor. "Verified by IATA System" allows them to instantly trust the paper without calling the shipper's office.

**Insurance Companies**
**Aviation Liability:** Verifying that all hazardous cargo on a lost aircraft was properly declared and met all IATA safety standards before paying out a multimillion-dollar hull claim.

## Who Issues It

**Issuer Types** (First Party)

**Certified Shippers.**
**Specialist Packing Firms.**
**Airlines / Carriers.**
**IATA:** (Providing the global validation framework).

## Where Each Fits: Live Verify and IATA e-DGD

IATA's electronic Dangerous Goods Declaration (e-DGD) lets shipper, forwarder, ground handler and airline exchange the declaration as structured data through connected platforms, ahead of the freight. Uptake varies by airport, airline and forwarder, and many consignments still move with a paper declaration. e-DGD and Live Verify answer different questions and work side by side: one moves the data between connected parties, the other lets whoever is holding the paper check it.

| | e-DGD | Live Verify on the paper declaration | Unverified paper declaration |
| :--- | :--- | :--- | :--- |
| **Who can check** | Parties connected to the e-DGD platforms used for that shipment. | Anyone holding the declaration: a warehouse handler, a loadmaster, an insurer. | Nobody; it can only be taken on trust. |
| **What the checker gets** | Structured declaration data, received in advance and ready for acceptance systems. | Confirmation that the issuer stands behind this exact wording, including the UN numbers and quantities, as at its date. | A form that may have been mis-declared or edited. |
| **What the shipper shares** | The declaration data, with the connected parties. | Only the declaration that travels with the freight. | Only the declaration that travels with the freight. |
| **Reach** | Where the shipper, forwarder, handler and airline are all connected. | Global in principle: any shipper or packer, in any country, that publishes hashes on its own domain. | Anywhere, but untrusted. |
| **Speed and cost** | Fast once connected; platform onboarding and devices for floor staff come first. | A few seconds per check: one web lookup over a data connection, with no fee to the standard. The paper can be read anywhere, but the check needs signal. | Free and immediate, with no connection needed. |
| **What it needs** | Every party in the chain to be on a connected platform. | The issuer to publish hashes, and Live Verify-aware software on the checker's device. No shipper or packer does this yet. | Nothing. |
| **Best suited to** | Acceptance checks and planning where the whole chain is connected. | Checking the paper on the pallet, especially where e-DGD does not reach. | Nothing where safety depends on it. |

**Where each fits:** IATA's e-DGD is the better route wherever shipper, forwarder, handler and airline are all connected to it, because the data arrives structured and ahead of the freight. Many warehouses still work from the declaration attached to the pallet, and the person loading may have no tablet or platform access. Live Verify lets that person confirm, from their own phone with Live Verify on it, that the shipper stands behind the exact wording on the form, and it can run alongside e-DGD for the same consignment.

---

_[Content merged from: dangerous-goods-declarations-imo-icao]_

## What is an IMO Declaration?

When a shipping container full of chemicals (like Acetone or Pesticides) is put on a ship, the captain needs to know exactly where to put it. Flammable items can't be next to explosive items.

The IMO Dangerous Goods Declaration is the "Safety Blueprint" for the container.

Fraudsters often edit these PDFs to hide that a chemical is toxic, just to get it onto a faster ship or to save on port fees. Verified hashes allow the ship's captain and port firefighters to see the un-altered hazard class instantly, preventing catastrophic fires at sea.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="imo-dgd"></span>DANGEROUS GOODS DECLARATION (IMO)
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

<span data-verify-line="imo-dgd">verify:hapaq-lloyd.com/dgd/v</span> <span verifiable-text="end" data-for="imo-dgd"></span></pre>
</div>

## What Is Checked

Shipper name, Consignee name, UN Number, Class/Division, Packing Group, Proper Shipping Name, Flash point (for maritime), marine pollutant status, number/type of packages, container ID, signatory name, date.

**Document Types:**
- **IMO Dangerous Goods Declaration:** For ocean freight (IMDG Code).
- **Multimodal DG Form:** For shipments moving by road and sea.
- **Container Packing Certificate:** Proving the DG was properly braced inside the box.

## What the Checker Sees

Shows the issuer domain (the Shipper or Carrier) and current safety status.

**Status Indications:**
- **Verified** — Declaration matches the shipper's official safety filing.
- **Accepted** — Port/Carrier has verified the physical labels and placards.
- **Blocked** — Discrepancy found in hazard class; do not load.
- **Void** — Replaced by an amended declaration.

## Who Holds It

The Shipper (Manufacturer) benefits from verification.

**Vessel Space Allocation:** Proving to the Ocean Carrier (e.g., Hapag-Lloyd) that the hazardous chemicals are "Verified Accurately Declared." Carriers are extremely risk-averse with DG; a verified hash prevents the container from being "Left on the Dock" due to paperwork suspicion.

**Liability Defense:** If a container leaks at sea, the shipper can prove they provided a cryptographically verified, accurate declaration of the chemical's flash point and class, defending against claims of "Negligent Misdeclaration."

## Who Checks It

**Vessel Command (The Captain)**
**Stowage Safety:** The Captain uses the DGD to ensure flammable liquids (Class 3) aren't stored next to explosives or acids. Verification ensures the data isn't "guessed," preventing catastrophic ship-board fires.

**Port Terminal Operators**
**Emergency Response:** In the event of a leak in the terminal, firefighters scan the hash on the container door or paperwork. "Verified by Hapag-Lloyd" provides instant, trusted access to the emergency response codes (ERG).

**Marine Insurers**
**Risk Management:** Ensuring that all "Hazardous Loads" on a vessel were properly declared before writing high-value hull/cargo policies.

## How Verification Works Here

**The "Phantom Chemical" Fraud Problem**

- **Class Downgrading:** Declaring a highly toxic chemical as a low-hazard one to get it onto a passenger-compatible vessel or to save on freight surcharges.
- **Flash-point Tampering:** Editing the "Flash Point" on the PDF to make a flammable liquid look safer than it is to bypass "Below Deck" storage restrictions.
- **Container Swapping:** Using a valid DGD for a safe container to hide an illegal or leaking one.

**Issuer Types** (First Party)

**Chemical Manufacturers.**
**Certified DG Packers.**
**Ocean Carriers / Ship Lines.**

## Where Each Fits: Live Verify and Port Community Systems

A port community system is a shared platform, usually run by or for a single port, through which terminals, carriers, forwarders and customs exchange data about the cargo passing through it. Coverage depends on the port: some major ports have mature systems, some countries link theirs nationally, and many smaller ports have none. A port community system and Live Verify answer different questions and work side by side: one joins up the parties inside a port, the other lets anyone holding the declaration check it as the container moves between ports and modes.

| | Port community system | Live Verify on the declaration | Unverified paper declaration |
| :--- | :--- | :--- | :--- |
| **Who can check** | Parties with accounts on that port's system. | Anyone holding the declaration: a gate clerk, a trucker, a vessel officer, a firefighter. | Nobody; it can only be taken on trust. |
| **What the checker gets** | The port's structured record for the container, shared with terminal, carrier and customs. | Confirmation that the issuer stands behind this exact declaration, including class and flash point, as at its date. | A form that may have been edited. |
| **What the shipper shares** | The declaration data, through its agents, with the port's users. | Only the declaration that travels with the container. | Only the declaration that travels with the container. |
| **Reach** | One port, or the ports linked to it; systems in different ports are separate. | Global in principle: any shipper or carrier, in any country, that publishes hashes on its own domain. | Anywhere, but untrusted. |
| **Speed and cost** | Fast for account holders; others must go through someone with access. | A few seconds per check: one web lookup over a data connection, with no fee to the standard. | Free and immediate, with no connection needed. |
| **What it needs** | An account, and the port's system to be available. | The issuer to publish hashes, and Live Verify-aware software on the checker's device. No shipper or carrier does this yet. | Nothing. |
| **Best suited to** | Coordination inside the port it serves. | The handoffs between truck, gate, vessel and destination port. | Nothing where safety depends on it. |

**Where each fits:** a port community system is the right tool inside the port it serves: terminal, customs and carrier see the same structured record. The paper declaration is what travels with the container across truck, gate, vessel and the destination port, where each party uses a different system or none. Live Verify covers those handoffs by letting anyone holding the declaration check it against the issuer's own domain, without replacing the port's system at either end.

---

_[Content merged from: dangerous-goods-transport-road]_

## What is a Hazmat Manifest?

When a truck carries hazardous materials (like Gasoline or Acid), the driver must carry a Transport Document (called an ADR note in Europe or a Hazmat Manifest in the US).

If the truck crashes, First Responders (Firefighters) look for this paper first. It tells them: "Approach from upwind" or "Do not use water on this fire."

Fraudsters often "Downgrade" the hazard on the paper form to bypass tunnel restrictions or to save on insurance. Verified hashes allow firefighters to scan the paperwork at the crash site and see the verified hazard class from the shipper's domain instantly.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="road-dg"></span>DANGEROUS GOODS TRANSPORT DOCUMENT
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

<span data-verify-line="road-dg">verify:trans-euro.com/dg/v</span> <span verifiable-text="end" data-for="road-dg"></span></pre>
</div>

## What Is Checked

Consignor name, Carrier ID (DOT/MC #), UN Number (e.g., UN1203), Proper Shipping Name, Hazard Class (1-9), Packing Group (I, II, III), ADR Tunnel Code (e.g., D/E), total quantity, emergency contact information, date of transport.

**Document Types:**
- **ADR Transport Document:** Standard for European road transport.
- **DOT Hazmat Manifest:** Required for U.S. highway transport.
- **SDS (Safety Data Sheet):** (Linked hash) for technical chemical properties.
- **Driver Training Certificate:** Proving the driver is "Hazmat Endorsed."

## What the Checker Sees

Shows the issuer domain (the Shipper or Carrier) and the safety standing.

**Status Indications:**
- **Verified** — Transport document matches the official manifest.
- **In-Transit** — Goods are currently on the road.
- **Delivered** — Shipment completed; cargo transferred.
- **Restriction Active** — Recent safety restriction on this chemical/route.

## Who Holds It

The Truck Driver / Carrier benefits from verification.

**Roadside Inspections:** Proving to a Highway Patrol officer or Gendarmerie that the "Gasoline" declaration is verified by the shipper. This prevents the truck from being impounded due to a suspected "Paperwork Forgery" designed to hide more dangerous chemicals.

**Tunnel/Bridge Access:** Instantly proving compliance with "Tunnel Codes" (e.g., ADR Code D/E) to tunnel authorities, ensuring the truck is allowed to enter restricted infrastructure.

## Who Checks It

**Highway Patrol / First Responders**
**Accident Response:** If a tanker crashes, firefighters scan the hash on the paperwork or vehicle. "Verified by EuroChem" provides instant, trusted confirmation of the hazard class, potentially saving lives by ensuring the correct fire-suppression method is used.

**Facility Gate Security**
**Site Safety:** A refinery or chemical plant can scan the driver's documents before opening the gate. Verification ensures the truck isn't carrying unauthorized or "Blacklisted" materials.

**Environmental Agencies**
**Liability Tracking:** Ensuring that high-risk chemicals are being moved by carriers with the verified insurance and safety records required for hazardous transport.

## How Verification Works Here

**The "High-Road" Fraud Problem**

- **UN Number Tampering:** Editing a UN number for a "Highly Toxic" chemical to look like a "Low Hazard" liquid to take a shorter route through a city or tunnel.
- **Driver Impersonation:** An un-endorsed driver using a fake "Hazmat Certificate" to drive a tanker.
- **Phantom Manifests:** Creating fake DG papers to hide the illegal transport of chemical waste.

**Issuer Types** (First Party)

**Chemical Shippers / Manufacturers.**
**Transport Carriers.**
**Hazmat Compliance Platforms:** (e.g., Labelmaster, DGOffice).

## Authority Chain

**Pattern:** Regulated

Dangerous goods declarations are issued by certified shippers and packers, regulated by UK civil aviation authority.

```
✓ dg.example-shipper.com/verify — Issues dangerous goods declarations and safety certifications
  ✓ caa.co.uk — Regulates UK civil aviation
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Where Each Fits: Live Verify and Government Hazmat Systems

<!-- TODO(verify): the original heading named "ERMA", which could not be identified; confirm which system was meant -->

Governments and emergency services keep their own hazmat data: carrier registrations, permits, and the reference guides and dispatch systems responders rely on. What exists depends on where you are: some countries run national systems, some follow regional agreements such as ADR in Europe, and many have little beyond the paper on the truck. These systems and Live Verify answer different questions and work side by side: the government data says what a carrier is permitted to do and how to respond to a substance, while Live Verify confirms that the manifest in the cab is the one the shipper issued.

| | Government hazmat systems | Live Verify on the manifest | Unverified paper manifest |
| :--- | :--- | :--- | :--- |
| **Who can check** | Regulators and dispatch centres with access, and responders through them. | Anyone holding the manifest: a responder at the roadside, a site gate, an inspector. | Nobody; it can only be taken on trust. |
| **What the checker gets** | Registration and permit data, and response guidance for the substance. | Confirmation that the shipper issued this exact manifest, with these UN numbers and quantities, as at its date. | A manifest that may have been edited. |
| **What the carrier shares** | Registration and permit data, filed in advance. | Only the manifest carried with the load. | Only the manifest carried with the load. |
| **Reach** | One country's or region's system. | Global in principle: any shipper, in any country, that publishes hashes on its own domain. | Anywhere, but untrusted. |
| **Speed and cost** | Depends on access and on reaching dispatch during an incident. | A few seconds per check: one web lookup over a data connection, with no fee to the standard. The paper can be read in a dead zone, but the check needs signal. | Free and immediate, with no connection needed. |
| **What it needs** | Access credentials, or a dispatch centre to relay. | The shipper to publish hashes, and Live Verify-aware software on the checker's device. No shipper does this yet. | Nothing. |
| **Best suited to** | Regulation, permits and response guidance. | Confirming, at the roadside or gate, that the paper in hand is genuine. | Nothing where safety depends on it. |

**Where each fits:** government hazmat systems hold authoritative registration and response data, and dispatch centres and regulators should keep relying on them. A first responder at a roadside incident usually has the paper manifest from the cab and a phone. Live Verify lets that responder confirm quickly, once there is signal, that the shipper issued the manifest as written, which complements the official data rather than standing in for it.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).

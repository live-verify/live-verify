---
title: "Vehicle Display Postings (Taxi, TNC, Permits)"
category: "Vehicle & Transportation"
volume: "Very Large"
retention: "License term (1-3 years)"
slug: "vehicle-display-postings"
tags: ["taxi-license", "rideshare-permit", "tlc-medallion", "vehicle-safety", "public-transport", "municipal-permit", "driver-verification", "passenger-safety"]
furtherDerivations: 1
---

## What are Vehicle Display Postings?

In the urban transport economy, **Vehicle Postings** are the "ID Cards" for cars. From the **Taxi Medallion** on the hood to the **For-Hire Vehicle (FHV) Permit** on the dashboard, these documents prove the vehicle is legally licensed, insured, and safe for passengers.

These postings are the primary defense against "Ghost Taxis"—unlicensed cars that roam city streets to prey on tourists or late-night travelers. Fraud is high-stakes: criminals often use fake dashboard cards to bypass airport security or to trick passengers into entering an un-insured vehicle. Live Verify allows a passenger or police officer to scan the displayed card through the window to verify: **"Is this vehicle currently authorized for hire, and does the driver's ID match the city's official record?"**

<div style="max-width: 400px; margin: 24px auto; font-family: sans-serif; border: 3px solid #ffcc00; border-radius: 10px; background: #fff; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
  <div style="background: #ffcc00; color: #000; padding: 15px; display: flex; align-items: center; border-bottom: 2px solid #000;">
    <div style="font-size: 1.8em; margin-right: 15px;">🚕</div>
    <div>
      <div style="font-weight: bold; font-size: 1.1em; letter-spacing: 1px;"><span verifiable-text="start" data-for="taxi">[</span>TAXI & LIMOUSINE COMM.</div>
      <div style="font-size: 0.75em; font-weight: bold; opacity: 0.8;">OFFICIAL FOR-HIRE PERMIT</div>
    </div>
  </div>
<div style="padding: 20px; display: flex; background: #fff;">
    <div style="width: 90px; margin-right: 15px;">
      <div style="width: 90px; height: 115px; background: #eee; border: 1px solid #ccc; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: #999; font-size: 0.7em; text-align: center;">[DRIVER PHOTO]</div>
    </div>
    <div style="flex-grow: 1;">
      <div style="font-size: 0.75em; color: #777; text-transform: uppercase;">Driver Name</div>
      <div style="font-size: 1.1em; font-weight: bold; margin: 0 0 10px 0; color: #333;">SARAH J. SMITH</div>
<div style="font-size: 0.75em; color: #777; text-transform: uppercase;">License #</div>
      <div style="font-size: 1.3em; font-weight: bold; margin: 0 0 10px 0; letter-spacing: 1px;">TLC-992288</div>
<div style="font-size: 0.75em; color: #777; text-transform: uppercase;">Vehicle Plate</div>
      <div style="font-size: 0.9em; font-weight: bold;">NY-ABC1234</div>
    </div>
  </div>
<div style="padding: 0 20px 20px 20px; background: #fff;">
    <div style="font-size: 0.7em; color: #555; text-align: center; margin-bottom: 10px; line-height: 1.3;">
      Scan to verify driver background clearance, vehicle insurance, and real-time active duty status.
    </div>
    <div data-verify-line="taxi" style="border-top: 1px dashed #999; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #000; text-align: center; font-weight: bold;"
      title="Demo only: Municipalities don't yet offer verification&#10;endpoints, so this is illustrative">
      verify:nyctlc.gov/v <span verifiable-text="end" data-for="taxi">]</span>
    </div>
  </div>
</div>

## Data Verified

License number, driver name, vehicle license plate (linked), vehicle VIN, photograph (via hash), expiration date, background check status, insurance policy ID, carrier/company name (e.g., Yellow Cab #42).

**Document Types:**
- **Dashboard Permit Card:** The primary ID for FHVs.
- **Exterior Medallion:** The metal plate on the vehicle exterior.
- **Airport Queue Ticket:** (Linked hash) proving authorized wait.
- **Safety Inspection Decal:** The windshield sticker for mechanical health.

## Data Visible After Verification

Shows the issuer domain (`nyctlc.gov`, `london.gov.uk`, `uber.com`) and the driver's standing.

**Status Indications:**
- **Active Duty** — Driver and vehicle are currently authorized for hire.
- **Suspended** — **CRITICAL:** Authority is revoked (e.g., due to expired insurance).
- **Expired** — Mandatory annual renewal or background check is overdue.
- **Plate Mismatch** — **ALERT:** The card is valid, but belongs to a DIFFERENT vehicle.

## Second-Party Use

The **Passenger (Rider)** benefits from verification.

**Anti-Kidnapping Safety:** A rider alone at night is about to enter a "Taxi" that looks slightly different. They scan the dashboard hash through the window. If it returns **"ACTIVE - SARAH SMITH,"** they can enter with confidence. If it returns **"UNKNOWN,"** they stay on the sidewalk and call a verified ride.

**Over-Charge Disputes:** A passenger can use the verified hash of the driver's ID to file a complaint about an illegal "flat rate" or detour, ensuring they have the cryptographic proof of exactly which driver was operating the vehicle.

## Third-Party Use

**Police / Traffic Enforcement**
**Rapid Vetting:** During a traffic stop, the officer scans the dashboard card. Verified hashes eliminate the risk of "Paper Swapping" where an unlicensed driver uses a relative's valid card.

**Airport Ground Transportation**
**Queue Integrity:** Security staff at airport terminals can scan vehicles in the "Holding Lot." If a vehicle's hash returns **"SUSPENDED,"** they can remove the vehicle from the queue, ensuring only safe, insured cars pick up travelers.

**Insurance Companies (Commercial)**
**Loss Control Audit:** Verifying that a fleet of 500 taxis is maintaining 100% verified, active dash-permits to ensure coverage remains valid.

## Verification Architecture

**The "Ghost Cab" Fraud Problem**

- **Dashboard Mimicry:** Printing realistic city permits using a high-end color printer to pose as a legitimate taxi.
- **ID Duplication:** Using one valid card for 10 different vehicles in an illegal fleet.
- **Revocation Hiding:** A driver whose license was revoked for safety violations keeping their physical card to continue working "Off-Book."

**Issuer Types** (First Party)

**Municipal Taxi & Limousine Commissions.**
**City Transportation Departments.**
**Regional Airport Authorities.**

**Privacy Salt:** Essential. Driver names and plates are private employment data. The hash must be salted to prevent "Mass Fleet Scraping" by competitors or data brokers.

## Rationale

Vehicle postings are the "Shield of the Public Road." By turning static cards into live digital bridges, we ensure that "Permission to Drive" is backed by the cryptographic truth of the city vault, protecting both passengers and the legitimate taxi industry.


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

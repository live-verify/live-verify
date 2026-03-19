---
title: "Vehicle Display Postings (Taxi, Parking, Access Permits)"
category: "Chain of Custody & Logistics"
volume: "Very Large"
retention: "License term (1-3 years)"
slug: "vehicle-display-postings"
verificationMode: "camera"
tags: ["taxi-license", "rideshare-permit", "tlc-medallion", "vehicle-safety", "public-transport", "municipal-permit", "driver-verification", "passenger-safety", "parking-placard", "vehicle-access"]
furtherDerivations: 1
---

## What are Vehicle Display Postings?

In the urban transport economy, **Vehicle Postings** are the "ID Cards" for cars. From the **Taxi Medallion** on the hood to the **For-Hire Vehicle (FHV) Permit** on the dashboard, these documents prove the vehicle is legally licensed, insured, and safe for passengers.

These postings are the primary defense against "Ghost Taxis"—unlicensed cars that roam city streets to prey on tourists or late-night travelers. Fraud is high-stakes: criminals often use fake dashboard cards to bypass airport security or to trick passengers into entering an un-insured vehicle.

More broadly, visible vehicle postings are used anywhere a person outside the back-office system needs to trust a vehicle's current authority from what is posted on or in the vehicle: taxi permits, private-hire permits, airport queue permits, accessible/disabled parking placards, loading permissions, and family-bay / parent-and-infant parking authorizations where a site chooses to police them.

The issuing registry remains the source of truth. Live Verify allows a passenger, traffic warden, parking supervisor, police officer, or site marshal to scan the displayed posting through the window to verify: **"Is this vehicle currently authorized for this use, and does the posting match the official record for this plate / permit / assignment?"**

<div style="max-width: 400px; margin: 24px auto; font-family: sans-serif; border: 3px solid #ffcc00; border-radius: 10px; background: #fff; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
  <div style="background: #ffcc00; color: #000; padding: 15px; display: flex; align-items: center; border-bottom: 2px solid #000;">
    <div style="font-size: 1.8em; margin-right: 15px;">🚕</div>
    <div>
      <div style="font-weight: bold; font-size: 1.1em; letter-spacing: 1px;"><span verifiable-text="start" data-for="taxi"></span>TAXI & LIMOUSINE COMM.</div>
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
    <div data-verify-line="taxi" style="border-top: 1px dashed #999; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #000; text-align: center; font-weight: bold;"
      title="Demo only: Municipalities don't yet offer verification&#10;endpoints, so this is illustrative">
      <span data-verify-line="taxi">verify:nyctlc.gov/v</span> <span verifiable-text="end" data-for="taxi"></span>
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
- **Accessible / Disabled Parking Placard:** Proving the right to occupy a reserved bay.
- **Site-Specific Parking Authorization:** Parent-and-infant, contractor, staff, loading, or hotel/venue pickup permissions where the operator uses visible vehicle postings.

## Data Visible After Verification

Shows the issuer domain (`nyctlc.gov`, `london.gov.uk`, `uber.com`) and the driver's standing.

**Status Indications:**
- **Active Duty** — Driver and vehicle are currently authorized for hire.
- **Suspended** — **CRITICAL:** Authority is revoked (e.g., due to expired insurance).
- **Expired** — Mandatory annual renewal or background check is overdue.
- **Plate Mismatch** — **ALERT:** The card is valid, but belongs to a DIFFERENT vehicle.
- **Zone Authorized** — Vehicle is currently entitled to occupy this reserved bay / queue / pickup area.
- **Zone Not Authorized** — Posting exists but does not grant the claimed parking / loading / waiting right.

## Second-Party Use

The **Passenger / Driver / Permit Holder** benefits from verification.

**Anti-Kidnapping Safety:** A rider alone at night is about to enter a "Taxi" that looks slightly different. They scan the dashboard hash through the window. If it returns **"ACTIVE - SARAH SMITH,"** they can enter with confidence. If it returns **"UNKNOWN,"** they stay on the sidewalk and call a verified ride.

**Over-Charge Disputes:** A passenger can use the verified hash of the driver's ID to file a complaint about an illegal "flat rate" or detour, ensuring they have the cryptographic proof of exactly which driver was operating the vehicle.

**Placard Legitimacy:** A disabled driver or permit holder can prove that a placard or reserved-bay authorization is genuine if challenged by parking staff or private enforcement.

**Reserved-Bay Disputes:** A parent with an infant, hotel guest in a pickup zone, or contractor in a loading bay can show that the visible posting really does grant access to that specific class of space.

## Third-Party Use

**Traffic Wardens / Parking Enforcement**
**Spot Integrity:** A warden scans the visible posting without waiting for the driver to return. Verification confirms whether the vehicle is legitimately occupying an accessible bay, loading area, parent-and-infant space, or other reserved zone that the site or authority actively enforces.

**Parking Supervisors / Rank Marshals**
**Queue and Bay Control:** Airport, station, hotel, stadium, and private-site staff can verify whether the vehicle is entitled to stand in a pickup lane, taxi rank, loading space, or reserved waiting area.

**Police / Traffic Enforcement**
**Rapid Vetting:** During a traffic stop, the officer scans the dashboard card. Verified hashes eliminate the risk of "Paper Swapping" where an unlicensed driver uses a relative's valid card.

**Airport Ground Transportation / Site Marshals**
**Queue Integrity:** Security staff at airport terminals, hospitals, hotels, or stadium pickup lanes can scan vehicles in holding lots or pickup zones. If a vehicle's hash returns **"SUSPENDED"** or **"ZONE NOT AUTHORIZED,"** they can remove the vehicle from the queue, ensuring only safe, insured, or currently entitled vehicles use the controlled area.

**Insurance Companies (Commercial)**
**Loss Control Audit:** Verifying that a fleet of 500 taxis is maintaining 100% verified, active dash-permits to ensure coverage remains valid.

## Verification Architecture

**The "Ghost Cab" Fraud Problem**

- **Dashboard Mimicry:** Printing realistic city permits using a high-end color printer to pose as a legitimate taxi.
- **ID Duplication:** Using one valid card for 10 different vehicles in an illegal fleet.
- **Revocation Hiding:** A driver whose license was revoked for safety violations keeping their physical card to continue working "Off-Book."
- **Placard Misuse:** Using a deceased relative's disabled placard, a borrowed permit, or a forged accessibility card to occupy reserved spaces.
- **Zone Abuse:** Displaying a posting that looks official to occupy pickup lanes, loading bays, or parent-and-infant spaces without current entitlement.

**Issuer Types** (First Party)

**Municipal Taxi & Limousine Commissions.**
**City Transportation Departments.**
**Regional Airport Authorities.**
**DMVs / Accessible Parking Authorities.**
**Private Site Operators:** Airports, hospitals, hotels, shopping centres, and venues where visible vehicle permissions are actively managed.

**Privacy Salt:** Essential. Driver names, placard numbers, and plates are private personal or employment data. The hash must be salted to prevent "Mass Fleet Scraping" or permit scraping by competitors, stalkers, or data brokers.

## Authority Chain

**Pattern:** Regulated / commercial, depending on the posting

The authority chain depends on who controls the permission being displayed.

**Municipal for-hire permit**

```
✓ tfl.gov.uk/taxi/verify — Issues taxi medallions and for-hire vehicle permits
  ✓ tfl.gov.uk — Regulates transport services in London
    ✓ gov.uk/verifiers — UK government root namespace
```

**Accessible parking placard**

```
✓ dmv.ca.gov/placards/verify — Issues disabled parking placards
  ✓ ca.gov/verifiers — California state root namespace
```

**Private-site access / pickup-zone permission**

```
✓ parking.heathrow.com/verify — Heathrow managed vehicle access and pickup permissions
  ✓ heathrow.com — Controls pickup and access policy for the site
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Rationale

Vehicle postings are visible trust surfaces used in moments of immediate decision: get in this car, issue this ticket, allow this vehicle to wait here, or clear it from the bay. By turning static postings into live digital bridges, we ensure that the visible permission on or in the vehicle is backed by the current truth of the issuing registry, protecting passengers, enforcement staff, and legitimate permit holders.


## Jurisdictional Witnessing (Optional)

Some jurisdictions, contracts, or multi-party workflows may add an independent witness layer. When used, the witnessing firm:

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

If a witness layer exists, it may periodically commit rollups to a public blockchain as an additional timestamping mechanism. That is optional, not inherent to the use case. The verification paths would then be:

1. **Issuer domain** — Direct check against the issuer
2. **Witnessing firm** — Independent confirmation with timestamp
3. **Public blockchain** — Decentralized trust anchor via rollup inclusion

---
title: "Shore Excursion Receipts and Tickets"
category: "Travel & Hospitality"
volume: "Large"
retention: "Excursion + 1-3 years (claims / liability)"
slug: "shore-excursion-receipts"
tags: ["cruise-travel", "shore-excursion", "tour-ticket", "travel-fraud", "liability-release", "vacation-planning", "maritime-hospitality"]
furtherDerivations: 1
---

## What are Shore Excursion Receipts?

When a cruise ship docks at a port (e.g., Cozumel or Santorini), thousands of passengers disembark for "Shore Excursions"—from scuba diving to bus tours. These tickets are high-value vouchers, often costing $150 to $500 per person.

Fraud is common in the "Port Market." Unlicensed tour operators create fake "Official Cruise Line" tickets to trick passengers into boarding unsafe vehicles. Similarly, passengers sometimes "edit" a receipt to claim a refund for a tour they actually attended. Verified hashes bind the **Excursion Name, Ship/Cabin Number, and Date** to the cruise line's or the operator's domain (e.g., `royalcaribbean.com` or `viator.com`).

<div style="max-width: 450px; margin: 24px auto; font-family: 'Trebuchet MS', sans-serif; border: 2px solid #0072b2; border-radius: 12px; background: #fff; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
  <div style="background: #0072b2; color: #fff; padding: 15px; display: flex; align-items: center; justify-content: space-between;">
    <div>
      <div style="font-weight: bold; font-size: 1.1em; letter-spacing: 1px;"><span verifiable-text="start" data-for="shore">[</span>CARNIVAL VOYAGER</div>
      <div style="font-size: 0.7em; opacity: 0.9;">OFFICIAL SHORE EXCURSION TICKET</div>
    </div>
    <div style="font-size: 1.5em;">🚢</div>
  </div>
<div style="padding: 20px; background: linear-gradient(135deg, #fff 0%, #f0f7ff 100%);">
    <div style="border-bottom: 1px dashed #0072b2; padding-bottom: 15px; margin-bottom: 15px;">
      <div style="font-size: 0.7em; color: #666; text-transform: uppercase;">Excursion Title</div>
      <div style="font-size: 1.2em; font-weight: bold; color: #003366;">TULUM RUINS & CENOTE SWIM</div>
<div style="display: flex; justify-content: space-between; margin-top: 10px; font-size: 0.9em;">
        <div><strong>Port:</strong> Cozumel, MX</div>
        <div><strong>Date:</strong> 15 MAR 2026</div>
      </div>
    </div>
<div style="font-size: 0.9em; line-height: 1.4; color: #333;">
      <p><strong>Guest:</strong> SARAH JANE SMITH<br>
      <strong>Cabin:</strong> 9922 (Deck 9) • <strong>Booking:</strong> L7XK9B</p>
<div style="display: flex; justify-content: space-between; align-items: center; margin-top: 15px; background: #fff; padding: 10px; border: 1px solid #cce3ff; border-radius: 4px;">
        <div>
          <div style="font-size: 0.7em; color: #888;">MEETING TIME:</div>
          <div style="font-weight: bold;">08:15 AM</div>
        </div>
        <div style="text-align: right;">
          <div style="font-size: 0.7em; color: #888;">PRICE PAID:</div>
          <div style="font-weight: bold;">$ 189.00</div>
        </div>
      </div>
    </div>
  </div>
<div style="padding: 15px; background: #fff; text-align: center;">
    <div data-verify-line="shore" style="font-family: 'Courier New', monospace; font-size: 0.8em; color: #0072b2; font-weight: bold;"
      title="Demo only: Cruise lines don't yet offer verification&#10;endpoints, so this is illustrative">
      verify:carnival.com/v <span verifiable-text="end" data-for="shore">]</span>
    </div>
    <div style="font-size: 0.65em; color: #999; margin-top: 8px; font-style: italic;">
      This ticket is non-transferable. Scan to verify booking authenticity and insurance coverage.
    </div>
  </div>
</div>

## Data Verified

Excursion name, port of call, date, guest name, cabin number, booking reference, price, meeting time, tour operator name, waiver status (linked hash).

**Document Types:**
- **Shore Excursion Ticket:** The physical pass used to board the bus/boat.
- **Booking Confirmation:** Emailed proof of purchase.
- **Refund Voucher:** Issued if a tour is cancelled due to weather.
- **Liability Waiver:** (Linked hash) signed by the guest.

## Data Visible After Verification

Shows the issuer domain (`carnival.com`, `rccl.com`, `viator.com`) and the ticket standing.

**Status Indications:**
- **Confirmed / Paid** — Ticket is valid; passenger is on the manifest.
- **Checked In** — Passenger has boarded the excursion.
- **Cancelled (Weather)** — **ALERT:** Excursion voided due to conditions; refund active.
- **Voided** — **ALERT:** Ticket reported lost or stolen.

## Second-Party Use

The **Cruise Passenger** benefits from verification.

**Anti-Scam Protection:** A passenger standing on a busy pier is approached by a "Tour Guide" claiming to be their official cruise contact. The passenger scans the guide's clipboard hash. If it returns **"VERIFIED - CARNIVAL VOYAGER,"** they can board the bus safely. If it returns **"UNKNOWN,"** they know it's an unlicensed operator.

**Refund Disputes:** If an excursion is "shortened" or doesn't deliver the promised activities (e.g., no ruins, just a gift shop), the passenger can use the verified hash of the original itinerary to prove they didn't get what they paid for when filing a claim with the ship's ShoreEx desk.

## Third-Party Use

**Port Security / Authorities**
**Crowd Control:** Verifying the identity of tour operators allowed onto the restricted "Cruise Pier" by scanning their verified manifest hashes.

**Travel Insurance Underwriters**
**Injury Claims:** If a passenger is injured on an excursion, the insurer verifies the ticket. "Verified by Carnival" ensures the tour was an authorized, insured activity and not a "rogue" tour that would void the passenger's medical coverage.

**Cruise Line Revenue Audit**
**Operator Reconciliation:** Verifying that the number of passengers who actually boarded the bus (scanned hashes) matches what the local tour operator is billing the cruise line for.

## Verification Architecture

**The "Pier-Side Pitch" Fraud Problem**

- **Logo Mimicry:** Unlicensed operators using a cruise line's logo on fake tickets to lure passengers into unsafe boats.
- **Manifest Padding:** Operators adding "Ghost Passengers" to their paper logs to over-charge the cruise line.
- **Waiver Hiding:** Editing a liability waiver to remove the "Risk Disclosure" section before a lawsuit.

**Issuer Types** (First Party)

**Cruise Line ShoreEx Departments.**
**Large Tour Aggregators (e.g., Viator, ShoreExcursionsGroup).**
**Local Port Authorities.**

**Privacy Salt:** Essential. Cabin numbers and passenger names are private travel data. The hash must be salted to prevent "Passenger Tracking" by data scrapers at the port.

## Rationale

Shore excursions are high-risk "Off-Ship" events. By turning tickets into verifiable digital bridges, we create a "Shield of Trust" that protects passengers from scams and ensures that operators are held to the safety standards of the cruise brand.

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

---
title: "OTA Booking Confirmations (Expedia, Booking.com)"
category: "Travel & Hospitality"
volume: "Very Large"
retention: "Travel + 1-3 years"
slug: "ota-booking-confirmations"
tags: ["ota", "booking-confirmation", "travel-logistics", "expedia", "booking-com", "itinerary-fraud", "travel-expense"]
furtherDerivations: 1
---

## What is an OTA Confirmation?

An **Online Travel Agency (OTA)** confirmation is the digital receipt issued when you book a flight, hotel, or car rental through a site like Expedia or Booking.com.

It is your "Central Itinerary." It proves:
1.  **Payment:** The price you paid (including taxes and fees).
2.  **Rights:** Which room type or flight class you are entitled to.
3.  **Status:** Whether the booking is "Confirmed" or "Pending."

**"Itinerary Padding"** is a common corporate fraud where employees "edit" their confirmation PDF to show a higher price (e.g., changing $150 to $250) or a "First Class" ticket when they actually flew "Economy." They then submit this to their company for reimbursement. Verified hashes bind the **Confirmation ID, Price, and Class of Service** to the OTA's domain.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <span verifiable-text="start" data-for="ota">[</span>
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;">Booking.com
Official Confirmation Receipt
═══════════════════════════════════════════════════════════════════

Guest:          SARAH JANE SMITH              Date: 15 MAR 2026
Confirmation #: 9988776655                    Status: CONFIRMED & PAID

RESERVATION DETAILS
───────────────────────────────────────────────────────────────────
HOTEL EXCELSIOR - ZURICH

Check-in:   Apr 10, 2026
Check-out:  Apr 15, 2026
Room Type:  Executive Suite (Non-Smoking)

───────────────────────────────────────────────────────────────────
Total Price (including VAT):                          CHF 1,450.00

</pre>
<span data-verify-line="ota">verify:booking.com/v</span> <span verifiable-text="end" data-for="ota">]</span>
</div>

## Data Verified

Passenger/Guest name, OTA Confirmation Number, Supplier Reference (PNR/Hotel ID), Total Price, Currency, Dates of travel, Class of Service (e.g., "Economy" vs "Business"), Cancellation policy terms, Issuing platform.

**Document Types:**
- **Booking Confirmation:** The primary PDF itinerary.
- **Payment Receipt:** Itemized tax invoice.
- **Cancellation Notice:** (Linked hash) proving a refund is due.
- **Boarding Pass:** (Linked hash) for airline segments.

## Data Visible After Verification

Shows the issuer domain (`booking.com`, `expedia.com`) and current reservation status.

**Status Indications:**
- **Confirmed/Paid** — Reservation is active and funds received.
- **Cancelled** — **ALERT:** The trip was voided (e.g., for expense fraud detection).
- **Checked-In** — Guest has arrived at the hotel/flight.
- **Refunded** — Funds returned to the original payment method.

## Second-Party Use

The **Traveler** (second party) receives the booking confirmation from the OTA (first party), **keeps it**, and may later hand it to third parties for various reasons, or never do so.

**Personal Record:** They have their own verified copy of the reservation details and price paid. Most of the time, the document sits in their email or files—the verification value is latent, there *if needed*.

**Peace of Mind:** They can confirm at any time that it matches what the OTA's system recorded and hasn't been altered.

**Future Optionality:** If an expense claim is disputed or a visa application is challenged, they have cryptographic proof ready without needing to contact the OTA.

## Third-Party Use

The traveler (second party) may hand the verified document to various third parties:

**Corporate Finance Departments**
**Automatic Audit:** Using the hash to instantly validate itinerary data against the OTA's ledger, flagging "Screenshot Fraud" or deleted cancellation notices.

**Hotel Front Desks**
**Intake Integrity:** Instantly verifying a "Third-Party Booking" if the hotel's local system is lagging. Scanning the guest's phone hash confirms they have a valid, paid-up reservation on the Booking.com domain.

**Travel Insurers**
**Claim Substantiation:** If a traveler claims their trip was cancelled due to illness, the insurer verifies the "Cancelled" status and the "Non-refundable" price directly from the OTA hash.

## Verification Architecture

**The "JPEG Itinerary" Fraud Problem**

- **Price Padding:** Changing a $100 budget hotel receipt to $300 to get a higher reimbursement.
- **Status Faking:** Showing a "Confirmed" itinerary to get a travel visa, and then immediately cancelling the booking for a full refund.
- **Class Inflation:** Editing "Premium Economy" to "Business Class" on an airline itinerary.

**Issuer Types (First Party)**

- Global OTAs (Expedia Group, Booking Holdings, Trip.com)
- Direct Suppliers (Marriott, Hilton, United, Lufthansa)
- Itinerary Aggregators (e.g., TripIt, Traxo)

**Privacy Salt:** Not required. OTA booking confirmations contain many unpredictable variables that combine to create high entropy: unique confirmation numbers (typically 8-10 alphanumeric characters), guest names, specific check-in/check-out dates, individual hotel properties, and exact price amounts (including cents/decimals and currency conversions). The combination of these unique identifiers makes brute-force enumeration infeasible without salt.

## Jurisdictional Witnessing

A jurisdiction may require OTAs to retain a **witnessing firm** for regulatory compliance. The witnessing firm:

- Receives all hashes from the OTA, and any subsequent changes to the payload as they happen—which may manifest as a new hash, a status change (cancelled, checked-in, refunded), or even a 404 (record deleted)
- Receives structured content/metadata (confirmation numbers, dates, prices, hotel IDs)
- Does **NOT** receive plaintext (guest names, payment details, loyalty program numbers)
- Provides an immutable, timestamped audit trail—available to the jurisdiction on demand, to travelers/third parties during disputes, or as expert witness testimony in legal proceedings

This provides:
- **Non-repudiation:** OTA cannot deny issuing the booking
- **Timestamp proof:** Hash existed at a specific time
- **Regulatory audit:** Tax authorities can inspect the witness ledger for expense fraud patterns
- **Resilience:** Verification works even if OTA's systems go down

**Public Blockchain (Non-Party)**

Witnessing firms may periodically commit rollups to an inexpensive public blockchain, providing an ultimate immutability guarantee. The blockchain is a "non-party"—infrastructure, not a participant in the transaction. This creates multiple verification paths:

1. **OTA domain** — Direct check against the issuer
2. **Witnessing firm** — Independent confirmation with timestamp
3. **Public blockchain** — Decentralized trust anchor via rollup inclusion

## Competition vs. API Sync (Direct)

| Feature | Live Verify | API Sync (Direct) | Scanned PDF / Image |
| :--- | :--- | :--- | :--- |
| **User Privacy** | **High.** Share only the *one* trip. | **Low.** API access often sees the *full* history. | **High.** |
| **Trust Anchor** | **Domain-Bound.** Bound to the OTA. | **System-Bound.** Trust the app. | **Zero.** Easily forged. |
| **Connectivity** | **Offline-Ready.** Proves the paper. | **None.** Requires live sync. | **Static.** |
| **Cost** | **Low.** Marginal implementation. | **High.** Requires complex API keys. | **Free.** |

**Why Live Verify wins here:** The "Hiring/Audit" reality. When a new employee joins a company, they bring their "Paper/PDF" past with them. The company doesn't want to "Sync" with the employee's private Expedia account. Live Verify allows for **discrete, high-trust verification** of a single document without invading the traveler's digital life.
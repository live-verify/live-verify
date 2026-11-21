---
title: "OTA Booking Confirmations (Expedia, Booking.com)"
category: "Travel & Hospitality"
volume: "Very Large"
retention: "Travel + 1-3 years"
slug: "ota-booking-confirmations"
verificationMode: "clip"
tags: ["ota", "booking-confirmation", "travel-logistics", "expedia", "booking-com", "itinerary-fraud", "travel-expense"]
furtherDerivations: 1
---

## What is an OTA Confirmation?

An Online Travel Agency (OTA) confirmation is the digital receipt issued when you book a flight, hotel, or car rental through a site like Expedia or Booking.com.

It is your "Central Itinerary." It proves:
1.  **Payment:** The price you paid (including taxes and fees).
2.  **Rights:** Which room type or flight class you are entitled to.
3.  **Status:** Whether the booking is "Confirmed" or "Pending."

**"Itinerary Padding"** is a common corporate fraud where employees "edit" their confirmation PDF to show a higher price (e.g., changing $150 to $250) or a "First Class" ticket when they actually flew "Economy." They then submit this to their company for reimbursement. Verified hashes bind the Confirmation ID, Price, and Class of Service to the OTA's domain.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <span verifiable-text="start" data-for="ota"></span>
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
<span data-verify-line="ota">verify:booking.com/v</span> <span verifiable-text="end" data-for="ota"></span>
</div>

## The Problem: JPEG Itinerary Fraud

- **Price Padding:** Changing a $100 budget hotel receipt to $300 to get a higher reimbursement.
- **Status Faking:** Showing a "Confirmed" itinerary to get a travel visa, and then immediately cancelling the booking for a full refund.
- **Class Inflation:** Editing "Premium Economy" to "Business Class" on an airline itinerary.

## What Is Checked

Passenger/Guest name, OTA Confirmation Number, Supplier Reference (PNR/Hotel ID), Total Price, Currency, Dates of travel, Class of Service (e.g., "Economy" vs "Business"), Cancellation policy terms, Issuing platform.

**Document Types:**
- **Booking Confirmation:** The primary PDF itinerary.
- **Payment Receipt:** Itemized tax invoice.
- **Cancellation Notice:** (Linked hash) proving a refund is due.
- **Boarding Pass:** (Linked hash) for airline segments.

## What the Checker Sees

Shows the issuer domain (`booking.com`, `expedia.com`) and current reservation status.

**Status Indications:**
- **Confirmed/Paid** — Reservation is active and funds received.
- **Cancelled** — The trip was voided (e.g., for expense fraud detection).
- **Checked-In** — Guest has arrived at the hotel/flight.
- **Refunded** — Funds returned to the original payment method.

## Who Holds It

The Traveler (second party) receives the booking confirmation from the OTA (first party), keeps it, and may later hand it to third parties for various reasons, or never do so.

**Personal Record:** They have their own verified copy of the reservation details and price paid. Most of the time, the document sits in their email or files—the verification value is latent, there *if needed*.

**Peace of Mind:** They can confirm at any time that it matches what the OTA's system recorded and hasn't been altered.

**Future Optionality:** If an expense claim is disputed or a visa application is challenged, they have cryptographic proof ready without needing to contact the OTA.

## Who Checks It

The traveler (second party) may hand the verified document to various third parties:

**Corporate Finance Departments**
**Automatic Audit:** Using the hash to instantly validate itinerary data against the OTA's ledger, flagging "Screenshot Fraud" or deleted cancellation notices.

**Hotel Front Desks**
**Intake Integrity:** Instantly verifying a "Third-Party Booking" if the hotel's local system is lagging. Scanning the guest's phone hash confirms they have a valid, paid-up reservation on the Booking.com domain.

**Travel Insurers**
**Claim Substantiation:** If a traveler claims their trip was cancelled due to illness, the insurer verifies the "Cancelled" status and the "Non-refundable" price directly from the OTA hash.

## Who Issues It

**Issuer Types (First Party)**

- Global OTAs (Expedia Group, Booking Holdings, Trip.com)
- Direct Suppliers (Marriott, Hilton, United, Lufthansa)
- Itinerary Aggregators (e.g., TripIt, Traxo)

**Privacy Salt:** Not required. OTA booking confirmations contain many unpredictable variables that combine to create high entropy: unique confirmation numbers (typically 8-10 alphanumeric characters), guest names, specific check-in/check-out dates, individual hotel properties, and exact price amounts (including cents/decimals and currency conversions). The combination of these unique identifiers makes brute-force enumeration infeasible without salt.

## Authority Chain

**Pattern:** Commercial

Online travel agencies issue booking confirmations certifying reservations, pricing, and cancellation status. The issuer is self-authorized as the booking service provider.

```
✓ confirmation.booking.com/verify — Issues verified travel booking confirmations with pricing and cancellation policy
```

Commercial issuer — self-authorized. Trust rests on the issuer's domain reputation.

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Where Each Fits: Live Verify and Direct API Integration

Online travel agencies such as Expedia and Booking.com offer direct integrations that let a company's travel or expense system receive bookings automatically. These suit an ongoing relationship. Live Verify answers a narrower question about a single confirmation someone is handed: did the agency issue it? The two work side by side.

| | Direct API integration | Live Verify on the confirmation | Scanned PDF or image |
| :--- | :--- | :--- | :--- |
| **Who can check** | A company whose systems are connected to the agency. | Anyone handed the confirmation: an expense auditor, a visa officer, an insurer. | Nobody; it can only be taken on trust. |
| **What the checker gets** | Booking data direct from the agency, often across many trips. | Confirmation that the agency issued this exact confirmation, as at its date, and whether it has since been cancelled. | A document that may have been edited. |
| **What the traveller shares** | Access to bookings through the linked account, which may cover more than one trip. | Only the confirmation they chose to hand over. | Only the confirmation they chose to hand over. |
| **Reach** | The agencies and companies that have integrated. | Global in principle: any agency, in any country, that publishes hashes on its own domain. | Universal, but untrusted. |
| **Speed and cost** | Automatic once set up; integration and credentials come first. | A few seconds per check: one web lookup, with no fee to the standard and no integration. | Free and immediate. |
| **What it needs** | An integration and an account link. | The agency to publish hashes, and Live Verify-aware software on the checker's device. No agency does this yet. | Nothing. |
| **Best suited to** | Managed corporate travel, with bookings flowing into expenses. | One-off checks on a single trip. | Nothing where money or entry depends on it. |

**Where each fits:** A direct API connection suits a company and a travel platform with an ongoing relationship, such as a corporate travel programme where bookings flow into expenses automatically. It is a poor fit for a one-off check on a single past trip, where nobody wants to link an employee's personal travel account. Live Verify lets a finance or audit team confirm one confirmation against the agency's domain, and managed travel continues through the integration.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).

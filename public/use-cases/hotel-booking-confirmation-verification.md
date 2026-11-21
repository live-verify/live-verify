---
title: "Hotel Booking Confirmation Verification"
category: "Travel & Hospitality"
volume: "Large"
retention: "Check-out + 1-3 years"
slug: "hotel-booking-confirmation-verification"
verificationMode: "clip"
tags: ["hotel-booking", "booking-confirmation", "visa-application", "accommodation-proof", "travel-fraud", "expense-verification", "embassy", "hospitality", "booking-existence"]
furtherDerivations: 2
---

## The Problem

Hotel booking confirmations are easy to fabricate. A convincing PDF showing a "confirmed" reservation at a reputable hotel takes minutes to produce and is difficult for a recipient to challenge without contacting the hotel directly.

This matters in three distinct fraud contexts:

1. **Visa applications.** Most embassies and consulates require proof of accommodation as part of a tourist or business visa application. A cottage industry exists around selling fake hotel confirmations — the applicant submits the fabricated document, obtains the visa, and either sleeps elsewhere or never travels at all. The embassy has no practical way to check each booking against the hotel's records at scale.

2. **Travel scams.** Fraudulent booking sites collect payment for reservations that do not exist. The traveler receives a professional-looking confirmation email, arrives at the hotel, and discovers there is no reservation in their name.

3. **Expense fraud.** Employees submit fabricated hotel confirmations as part of expense claims for trips that were shortened, downgraded, or never taken.

This is a canary-class fact. A single yes/no — "Does this booking actually exist in the hotel's system right now?" — resolves all three fraud patterns. The answer changes over time: a booking that was CONFIRMED yesterday may be CANCELLED today, or may have progressed to CHECKED-IN or CHECKED-OUT.

This page stays narrow: booking existence and current status. For cancellation receipts and refund verification, see [Hotel Cancellation & Refund Receipts](view.html?doc=hotel-booking-documents). For room upgrades and loyalty statements, that same page covers those as well.

## Booking Confirmation — Confirmed and Prepaid

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="booking-confirmed"></span>HOTEL BOOKING CONFIRMATION
Hotel:          Grand Hotel York
Booking Ref:    GHY-2026-441882
Guest:          J. Williams
Check-In:       15 Jun 2026
Check-Out:      18 Jun 2026
Status:         CONFIRMED — PREPAID
<span data-verify-line="booking-confirmed">verify:grandhotel-york.co.uk/bookings/v</span> <span verifiable-text="end" data-for="booking-confirmed"></span></pre>
</div>

## Booking Confirmation — Cancelled

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="booking-cancelled"></span>HOTEL BOOKING CONFIRMATION
Hotel:          Grand Hotel York
Booking Ref:    GHY-2026-441882
Guest:          J. Williams
Check-In:       15 Jun 2026
Check-Out:      18 Jun 2026
Status:         CANCELLED
<span data-verify-line="booking-cancelled">verify:grandhotel-york.co.uk/bookings/v</span> <span verifiable-text="end" data-for="booking-cancelled"></span></pre>
</div>

## What Is Checked

Hotel name, booking reference, guest name, check-in date, check-out date, and current booking status. Room type and rate are deliberately excluded — this artifact answers "does this booking exist?" not "how much did it cost?"

**Scope note:** This artifact confirms booking existence and current status. It does not confirm that the guest actually stayed, that the booking was the accommodation relied on for a visa application, or that the expense claim is otherwise legitimate. For expense and visa contexts, the booking-existence check is one input to a broader assessment, not a complete answer.

## What the Checker Sees

Shows the issuer domain (`grandhotel-york.co.uk`, `marriott.com`, `booking.com`) and confirms whether the booking status claim is current.

**Status Indications:**
- **CONFIRMED** — The reservation exists and is active in the hotel's system.
- **CANCELLED** — The reservation was cancelled. The booking reference existed but is no longer active.
- **NO-SHOW** — The guest did not arrive and the booking window has passed.
- **CHECKED-IN** — The guest has arrived and is currently staying.
- **CHECKED-OUT** — The stay is complete.

## Who Holds It

The Guest uses this to prove their booking is real.

**Visa Applications:** An applicant clips the CONFIRMED status from their booking confirmation and submits it as part of their visa package. The embassy or consulate verifies the hash against the hotel's domain, confirming the reservation exists without needing to phone the hotel. If the applicant cancels the booking after obtaining the visa, a re-check returns CANCELLED — the status is live, not a frozen snapshot.

**Employer Reimbursement:** An employee submitting a pre-trip expense approval clips the confirmation to prove the booking exists and is prepaid. The finance team verifies it against the hotel's domain rather than trusting a forwarded email.

## Who Checks It

**Embassies and Consulates**
Visa processing desks handle thousands of accommodation proofs per week. Verified booking confirmations allow batch or spot-check verification against hotel domains, replacing the current approach of trusting unverifiable PDFs. A booking that returns CANCELLED at the time of visa decision is a material change the embassy can act on.

**Employers and Corporate Travel Managers**
When processing expense claims or pre-trip approvals, a verified booking confirmation proves the trip was actually planned and the hotel was actually booked. This is particularly relevant for post-trip claims where the employee asserts a stay occurred — the status should read CHECKED-OUT, not CONFIRMED or CANCELLED.

**Travel Insurers**
Trip cancellation claims require proof that a booking existed and was subsequently cancelled. A verified confirmation that currently reads CANCELLED, combined with a prior verification that read CONFIRMED, establishes the timeline insurers need for claim adjudication.

## How Verification Works Here

**The "Phantom Booking" Problem**

- **Visa Fraud:** Fabricating a booking confirmation to satisfy embassy accommodation requirements, with no intention of staying at the hotel. This is widespread enough that some embassies maintain informal blacklists of hotels whose confirmations they distrust.
- **Booking Site Scams:** Fraudulent travel sites issue professional-looking confirmations for reservations that were never made. The traveler discovers the fraud only at check-in.
- **Expense Fabrication:** Creating a fake confirmation for a hotel stay that never occurred, or for dates that differ from the actual stay, to inflate expense claims.

**Issuer Types** (First Party)

**Hotel Chains:** Marriott, Hilton, Accor, IHG, Hyatt.
**Independent Hotels:** Properties operating their own reservation systems.
**Online Travel Agencies (OTAs):** Booking.com, Expedia, Hotels.com.
**Global Distribution Systems (GDS):** Amadeus, Sabre, Travelport.

**Privacy Salt:** Required. Booking references, guest names, and travel dates are personal data. The hash must be salted so that an adversary cannot enumerate booking references to discover whether a specific person has a reservation at a specific hotel on a given date.

## Authority Chain

**Pattern:** Commercial

Hotels and booking platforms issue confirmations as the service provider. OTAs act as authorized intermediaries — a Booking.com confirmation is verified against `booking.com`, not the hotel's domain, unless the hotel also publishes its own hash.

```
✓ grandhotel-york.co.uk/bookings/verify — Verifies booking confirmations
```

Commercial issuer — self-authorized. Trust rests on the issuer's domain reputation.

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Where Each Fits: Live Verify and Calling the Hotel

Today an embassy, employer or traveller who doubts a booking confirmation can phone the hotel or the booking site, or simply accept the email or PDF. Calling remains the authoritative check. Live Verify works side by side with it: it lets anyone handed a confirmation confirm that the hotel or booking site stands behind it, without a call.

| | Phone call to the hotel | Live Verify on the confirmation | Unverified email or PDF confirmation |
| :--- | :--- | :--- | :--- |
| **Who can check** | Anyone who can reach the hotel, in its time zone and language. | Anyone handed the confirmation: a visa officer, an expenses team, the traveller. | Nobody; it can only be taken on trust. |
| **What the checker gets** | The hotel's word on the booking now, and the chance to ask questions. | Confirmation that the hotel or booking site stands behind this exact confirmation, as at its date, and whether it has since been cancelled. | A document that may have been fabricated. |
| **What the traveller shares** | Their name and booking details, which the hotel may decline to discuss with third parties. | Only the confirmation they chose to hand over. | Only the confirmation they chose to hand over. |
| **Reach** | Any hotel that answers. | Global in principle: any hotel or booking site, in any country, that publishes hashes on its own domain. | Anywhere, but untrusted. |
| **Speed and cost** | Minutes to hours, with hold queues and time zones; one call per booking. | A few seconds per check: one web lookup, with no fee to the standard. | Free and immediate. |
| **What it needs** | A genuine phone number and someone willing to answer. | The hotel or booking site to publish hashes, and Live Verify-aware software on the checker's device. No hotel or booking site does this yet. | Nothing. |
| **Best suited to** | Individual doubts that need a conversation. | Visa and expenses teams checking many confirmations. | Nothing where a visa or reimbursement depends on it. |

**Where each fits:** A call to the hotel is still the surest check of a single booking, and it lets the caller ask questions. It does not scale to a visa section or an expenses team handling many confirmations, often across time zones, and the answer leaves no record. Live Verify lets them confirm that the hotel or booking site stands behind each confirmation, and whether it has since been cancelled, wherever the checker has software that honours it.

## Further Derivations

None currently identified.

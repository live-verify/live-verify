---
title: "Guided Tour Receipts and Activity Confirmations"
category: "Travel & Hospitality"
volume: "Large"
retention: "Tour + 1-3 years"
slug: "guided-tour-receipts"
verificationMode: "both"
tags: ["guided-tour", "booking-confirmation", "travel-expense", "activity-voucher", "tourism-logistics", "viator", "getyourguide"]
furtherDerivations: 1
---

## What is a Tour Voucher?

When you book an excursion (like a desert trek or a boat tour) through a site like Viator or TripAdvisor, you receive a Booking Confirmation or Voucher.

This is your "Ticket" to meet the guide at a specific time and place (often a remote boat dock or park entrance).

Small tour operators often don't have real-time computers in the field. They rely on looking at your paper or PDF voucher. Fraud is common: people often "Photoshop" a fake voucher to join an expensive tour for free. Verified hashes allow the guide to scan your paper and see "PAID" on the operator's domain instantly, even in remote areas.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <span verifiable-text="start" data-for="tour"></span>
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;">SAHARA EXPEDITIONS, LTD.
Official Booking Confirmation
═══════════════════════════════════════════════════════════════════

Participant: SARAH JANE SMITH            Date: 15 MAR 2026
Booking #:   SE-99228877                 Status: PAID & CONFIRMED

TOUR DETAILS
───────────────────────────────────────────────────────────────────
Activity:      Luxury Stargazing Desert Trek
Meeting Point: Merzouga Gateway, Gate 4
Time:          18:00 PM (Local Time)

PAYMENT SUMMARY
───────────────────────────────────────────────────────────────────
Adult Admission (x2):                                     $ 450.00
Private Guide Surcharge:                                  $ 150.00
───────────────────────────────────────────────────────────────────
TOTAL PAID:                                               $ 600.00

Please present this verified voucher to the lead guide at the
meeting point.

</pre>
<span data-verify-line="tour">verify:sahara-expeditions.com/v</span> <span verifiable-text="end" data-for="tour"></span>
</div>

## The Problem: Voucher Forgery Fraud

- **Duplicate Use:** Printing 10 copies of one $600 voucher and handing them to 10 different friends. Verification shows the "Checked-In" status, stopping the 2nd person at the gate.
- **Amount Tampering:** Editing a $50 "Basic Tour" receipt to read $500 to get a higher reimbursement from a company or insurer.
- **Fabricated Operators:** Creating fake tour companies with real-looking websites to sell "Vapor-Tours" to unsuspecting tourists.

## What Is Checked

Lead participant name, booking reference ID, activity title, meeting point address/coordinates, start date/time, total price paid, number of participants, operator name, liability waiver status.

**Document Types:**
- **Activity Voucher:** Handed to the guide/driver.
- **Booking Confirmation:** The primary "Proof of Purchase."
- **Liability Waiver:** (Linked hash) proving the participant signed the safety terms.
- **Tour Operator License:** (Linked hash) proving the guide is officially permitted.

## What the Checker Sees

Shows the issuer domain (`sahara-expeditions.com`, `viator.com`, `getyourguide.com`) and current booking standing.

**Status Indications:**
- **Confirmed** — Booking is paid and verified in the operator's system.
- **Cancelled/Refunded** — Voucher is void; do not provide service.
- **Checked-In** — Participant has already been scanned at the meeting point (fraud detection).
- **Delayed** — Start time has changed; click for new instructions.

## Who Holds It

The Traveler (second party) receives the tour voucher from the operator (first party), keeps it, and may later hand it to third parties for various reasons, or never do so.

**Personal Record:** They have their own verified copy of the booking confirmation. Most of the time, the voucher sits in their travel documents—the verification value is latent, there *if needed*.

**Peace of Mind:** They can confirm at any time that the booking matches what the operator's system recorded and hasn't been cancelled or altered.

**Future Optionality:** If a dispute arises—whether about cancellations, refunds, or service quality—they have cryptographic proof ready without needing to contact the operator.

## Who Checks It

The traveler (second party) may hand the verified document to various third parties:

**Tour Guides / Field Staff**
**Intake Integrity:** At a remote meeting point, the guide scans the traveler's voucher. "Verified by Sahara-Expeditions.com" ensures the traveler didn't just "Photoshop" a fake voucher to join a $600 tour for free. This is crucial for small operators who don't have expensive real-time API integrations in the field.

**Travel Insurance Companies**
**Claim Adjudication:** Verifying the authenticity of a "No-Show" or "Cancellation" certificate provided by a tour operator before paying out a travel interruption claim.

**OTA Platforms (Viator / Expedia)**
**Vendor Audit:** Ensuring that the local tour operators are issuing vouchers that match the data transmitted through the platform's API.

## Who Issues It

**Issuer Types (First Party)**

- Local Tour Operators (Hosting on their own domain)
- Global OTAs (Viator, GetYourGuide, Klook)
- Hotel Concierge Desks

**Privacy Salt:** Not required. Tour vouchers contain many unpredictable variables that combine to create sufficient entropy—booking reference ID (unique alphanumeric), participant name (non-enumerable), specific meeting point addresses, precise date/time combinations, itemized pricing with surcharges, and operator-specific lot numbers. The combination makes reverse-engineering a specific booking computationally infeasible without already knowing the details.

## Authority Chain

**Pattern:** Commercial

Tour operators and travel platforms issue guided tour receipts confirming booking details and payment. Self-authorized by their operation of the booking system and provision of travel services.

```
✓ receipt.viator.com/verify — Issues guided tour receipts and booking confirmations
```

Commercial issuer — self-authorized. Trust rests on the issuer's domain reputation.

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Compared With QR Codes

| Feature | Live Verify | Standard QR Code | Scanned PDF |
| :--- | :--- | :--- | :--- |
| **Integrity** | **Cryptographic.** Binds the *Participant Name*. | **Data-Only.** Often just a raw URL or ID string. | **Zero.** Easily forged. |
| **Interoperability** | **Ordinary smartphone.** Needs Live Verify on it (an app today). | **App-Locked.** Often requires the specific "Viator" app to decode. | **Universal.** |
| **Trust Anchor** | **Domain-Bound.** Bound to the Operator. | **Platform-Bound.** | **Visual.** |
| **Connectivity needed** | **Yes, for the check.** The printed voucher can be read without a connection; checking it takes one small web request. | **Yes.** Requires live DB access to mean anything. | **None.** |

**Where each fits:** A booking platform's own QR code, scanned in the platform's own app, is fast and ties straight into the operator's manifest, and guides who have that app should use it. A voucher may equally be presented to a subcontracted guide, a boat crew or a site gatekeeper who does not have it. Live Verify lets that person confirm, with an ordinary phone browser, that the operator stands behind the printed voucher, and the two codes can sit on the same page.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).

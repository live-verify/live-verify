---
title: "Hotel Cancellation & Refund Receipts"
category: "Travel & Hospitality"
volume: "Very Large"
retention: "Cancellation Date + 3-7 years"
slug: "hotel-booking-documents"
verificationMode: "clip"
tags: ["booking-dispute", "expense-fraud", "hilton-honors", "hospitality", "hospitality-finance", "hospitality-management", "hotel-cancellation", "hotel-loyalty", "hotel-upgrade", "loyalty-perks", "marriott-bonvoy", "point-balance", "refund-receipt", "room-upgrade", "status-match", "suite-upgrade", "travel-expense", "travel-insurance", "travel-perks", "wealth-verification"]
furtherDerivations: 3
---

## What is a Cancellation Receipt?

When you cancel a hotel room, you get a Cancellation Confirmation. This is your proof that you released the room and are no longer responsible for the bill.

For business travelers, this receipt is critical for Expense Audits. It proves that a refunded charge on their credit card was legitimate.

"Double-Dipping" fraud happens when an employee gets a refund for a room but still tries to claim the original cost from their employer. Verified hashes allow corporate finance departments to automatically flag "Ghost Refunds" where an employee provides a fake PDF to hide a credit.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="hotel-cancel"></span>THE GRAND HOTEL - PARIS
OFFICIAL CANCELLATION NOTICE

This document confirms the cancellation of your reservation.
A refund has been processed to your original payment method.

Guest:             Madame E. Dubois
Booking Ref:       GHP-47291-ED
Refund Amount:     € 1,200.00

Cancellation Date: June 28, 2025
Policy:            Free cancellation (48h prior to arrival)
Status:            REFUNDED & CLOSED

                                        ─────────────────────────
                                        Reservations Manager

<span data-verify-line="hotel-cancel">verify:grandhotelparis.com/v</span> <span verifiable-text="end" data-for="hotel-cancel"></span></pre>
</div>

## The Problem: Ghost Refund Fraud

- **Refund Inflation:** Editing a €100 refund to read €1,000 to trick an employer into believing a larger credit was applied.
- **Date Alteration:** Changing a "Late Cancellation" (with fees) to look like an "Early Cancellation" (no fees) to defraud the hotel.
- **Fabricated Confirmations:** Using a template to create a fake cancellation for a trip that was never taken, to claim "Trip Interruption" money from an insurer.

## What Is Checked

Guest name, booking reference ID, original stay dates, cancellation timestamp, refund amount, refund method, cancellation fee (if any), policy terms (Non-refundable vs Free), issuing hotel/OTA name.

**Document Types:**
- **Cancellation Confirmation:** Proving the room was released.
- **Refund Receipt:** Proving the cash was sent back to the card.
- **Voucher / Credit Note:** For non-refundable bookings.
- **No-Show Waiver:** (Linked hash) proving the hotel waived the fee.

## What the Checker Sees

Shows the issuer domain (`marriott.com`, `booking.com`) and current status.

**Status Indications:**
- **Refunded** — Funds returned to the original payment method.
- **Credit Active** — Refund issued as a travel voucher.
- **No Refund Due** — Cancellation outside the free window.
- **Disputed** — Refund currently under chargeback or litigation.

## Who Holds It

The Guest (Traveler) benefits from verification.

**Expense Reimbursement:** Proving to an employer's finance department that a €1,200 charge was actually refunded. This prevents "Double-Dipping" fraud where an employee pockets the refund while still claiming the original expense.

**Chargeback Defense:** If a bank mistakenly denies a refund, the traveler has a verified, non-alterable proof of the hotel's promise to pay.

## Who Checks It

**Corporate Finance Teams**
**Audit Integrity:** Instantly verifying thousands of cancellation receipts. Live Verify allows systems like SAP Concur to automatically flag "Ghost Refunds" where an employee provides a fake PDF to hide a personal credit.

**Travel Insurers**
**Claim Adjudication:** Verifying the "Non-Refundable" status of a booking before paying out a trip interruption claim. If the hotel already issued a verified refund, the insurer avoids an overpayment.

**Banks / Credit Card Networks**
**Fraud Investigation:** Verifying the authenticity of a refund receipt provided by a merchant during a dispute.

## Who Issues It

**Issuer Types** (First Party)

**Hotel Chains:** (Marriott, Hilton, Accor).
**Online Travel Agencies (OTAs):** (Booking.com, Expedia).
**Global Distribution Systems (GDS):** (Amadeus, Sabre).

## Jurisdictional Witnessing (Optional)

An independent witness layer may apply — see [Witnessing Third Parties](../../docs/WITNESSING-THIRD-PARTIES.md) for the full mechanism (what a witness receives, non-repudiation, optional public-blockchain rollups). For this use case: a witness would receive the issuer's hashes and status changes plus structured metadata (key identifiers and dates) — never plaintext or sensitive personal information — providing non-repudiation of the document.

## Compared With In-App Notifications

| Feature | Live Verify | App Notification | Scanned PDF / Email |
| :--- | :--- | :--- | :--- |
| **User Privacy** | **High.** Share only the *Cancellation*. | **Low.** App access reveals *full* stay history. | **Vulnerable.** |
| **Trust Anchor** | **Domain-Bound.** Bound to the Hotel. | **System-Bound.** | **Zero.** Easily forged. |
| **Interoperability** | **Universal.** Works for any insurer/employer. | **Zero.** Insurers don't have logins to your Hilton app. | **Universal.** |
| **Audit-ability** | **High.** Creates a digital audit trail. | **None.** For external parties. | **Low.** |

**Where each fits:** The hotel's app notification tells the guest promptly and reliably that a booking was cancelled, and for the guest that is enough. A travel insurer, an employer's expenses team or a card issuer handling a dispute cannot see it. Live Verify lets them confirm that the hotel stands behind the cancellation confirmation the guest forwards, so the app serves the guest and the document serves the claim.


---

_[Content merged from: hotel-upgrade-confirmations]_


## What is a Room Upgrade Notice?

High-tier travelers often get "Upgraded" from a standard room to a $1,000/night suite for free as a loyalty perk. The Upgrade Confirmation is the email or PDF proving this move.

At the front desk, clerks often claim "the system is down" or "we have no record" to avoid giving away a high-value suite.

A Verified Confirmation from the hotel's domain ends the argument instantly. More importantly, it helps corporate travelers prove to their employer that the "Presidential Suite" they stayed in was a Verified Free Perk and not an unapproved personal splurge on the company card.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="upgrade"></span>THE RITZ-CARLTON
Official Suite Upgrade Confirmation

UPGRADE SUCCESSFUL                    Reservation ID: RC-99228877

Dear Sarah Jane Smith,

We are pleased to confirm your room upgrade for your upcoming
stay at The Ritz-Carlton, Maui.

Original Room:   Deluxe Ocean View
Upgraded To:     Residential Garden View Suite
Upgrade Method:  Loyalty Perk (Ambassador Elite)
Upgrade Value:   $ 450.00 / Night (Complimentary)

Please present this verified confirmation at the front desk
upon arrival.

<span data-verify-line="upgrade">verify:ritzcarlton.com/upgrades/v</span> <span verifiable-text="end" data-for="upgrade"></span></pre>
</div>

## What Is Checked

Guest name, Reservation ID, Original room type, Upgraded room type, Upgrade fee (if paid), Upgrade method (Paid/Points/Perk), hotel property ID, effective stay dates, date of upgrade confirmation.

**Document Types:**
- **Upgrade Confirmation:** Sent via email/app pre-arrival.
- **Suite Night Award (SNA) Receipt:** Proving use of a loyalty voucher.
- **Paid Upgrade Invoice:** For business expense reimbursement.
- **Front Desk Slip:** Handed to the guest at check-in.

## What the Checker Sees

Shows the issuer domain (`ritzcarlton.com`, `marriott.com`, `hilton.com`) and current room standing.

**Status Indications:**
- **Confirmed** — Upgrade is verified and inventory is locked.
- **Subject to Availability** — Upgrade requested but not yet verified.
- **Cancelled** — Upgrade retracted (e.g., due to maintenance or overbooking).
- **Settled** — Guest has checked out of the upgraded room.

## Who Holds It

The Guest (Loyalty Member) benefits from verification.

**Check-in Defense:** If a front desk clerk claims "We have no record of your upgrade," the guest can show the verified hash. "Verified by ritzcarlton.com" is much harder for a clerk to ignore than a simple email printout, preventing the "Overbooked Suite" downgrade fight.

**Expense Reimbursement:** Proving to an employer that a $450/night upgrade was a "Verified Complimentary Perk" and not a hidden personal expense charged to the company card.

## Who Checks It

**Corporate Travel Managers**
**Policy Compliance:** Verifying that employee upgrades are actually being provided as "Verified Perks" and aren't being quietly paid for by the employee using company funds (shadow spend).

**Travel Insurance Companies**
**Claim Valuation:** If a trip is cancelled, verifying the "Total Value" of the lost booking, including the verified value of any confirmed upgrades.

**OTA Platforms (Expedia / Amex Travel)**
**Inventory Reconciliation:** Ensuring that the hotel's "Upgrade Log" matches the data provided to the premium booking platform.

## How Verification Works Here

**The "Phantom Suite" Fraud Problem**

- **Fabricated Confirmations:** Scammers creating fake Ritz or Four Seasons "Upgrade Letters" to trick spouses or business partners into believing they have VIP status.
- **Status Faking:** Editing a "Standard Room" PDF to read "Presidential Suite" to gain access to VIP lounges or events.
- **Fee Hiding:** Changing a "Paid Upgrade" to "Complimentary" on a PDF to get reimbursed by an employer for a cost the employee actually paid personally.

**Issuer Types** (First Party)

**Global Hotel Brands:** (Ritz-Carlton, Waldorf Astoria, St. Regis).
**Loyalty Programs:** (Marriott Bonvoy, Hilton Honors).
**Travel Agencies:** (Amex Fine Hotels & Resorts, Virtuoso).

## Jurisdictional Witnessing (Optional)

An independent witness layer may apply — see [Witnessing Third Parties](../../docs/WITNESSING-THIRD-PARTIES.md) for the full mechanism (what a witness receives, non-repudiation, optional public-blockchain rollups). For this use case: a witness would receive the hotel or OTA's hashes and status changes plus structured metadata (booking reference IDs, guest names, cancellation dates, refund amounts, room types, stay dates, upgrade methods, upgrade values, points balances, elite statuses) — never payment card details or personal contact information — providing non-repudiation of the cancellation, upgrade, or statement and an audit trail corporate finance teams and insurers can inspect.


## Compared With Mobile Apps

| Feature | Live Verify | Hotel Mobile App | Scanned PDF / Email |
| :--- | :--- | :--- | :--- |
| **Trust Anchor** | **Domain-Bound.** Bound to the Brand. | **System-Bound.** | **Zero.** Easily forged. |
| **User Privacy** | **High.** Share only the *Upgrade* status. | **Low.** App access reveals *full* travel history. | **Vulnerable.** |
| **Persistence** | **High.** Remains verifiable after stay. | **Low.** Past stay data is often hard to find in-app. | **Vulnerable.** |
| **Front Desk Speed** | **Instant.** 5-second scan. | **Slow.** Requires finding phone and loading app. | **N/A.** |

**Where each fits:** A reservation that shows in the hotel's own app, and in the property's own system, will normally settle any question at check-in. Difficulties arise when the two disagree, when the booking came through an agent, or when the question comes up after the stay. Live Verify gives the guest and the front desk a shared reference: the confirmation text the brand stands behind, checked against the brand's domain, used alongside the property system.


---

_[Content merged from: hotel-loyalty-program-statements]_


## What is a Points Statement?

If you stay at hotels often, your Loyalty Points (like Marriott Bonvoy or Hilton Honors) are a form of "Travel Currency." For elite travelers, their balance can be worth $20,000 or more.

The Member Statement is the proof of your "Hotel Wealth" and your Elite Status (e.g., Ambassador or Diamond).

You need this verified proof for a "Status Match"—where a rival hotel gives you free suites and breakfast just to win your business. Fraudsters often "Photoshop" their status to get free perks they didn't earn. Verified hashes allow hotel groups to see the un-altered point balance directly from the brand's domain.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="hotel-loy"></span>MARRIOTT BONVOY                          Member #: 99228877
Official Member Statement

Member:        SARAH JANE SMITH          Period: MAR 2026
Status:        AMBASSADOR ELITE

TOTAL POINTS:                               2,450,000

2026 Progress: ████████████████████░░░░ 85%
               85 of 100 Nights for Lifetime Platinum

This statement is a verified record of your point balance
and elite status. Valid for corporate housing and
status-match requests.

<span data-verify-line="hotel-loy">verify:marriott.com/loyalty/v</span> <span verifiable-text="end" data-for="hotel-loy"></span></pre>
</div>

## What Is Checked

Member name, loyalty ID number, current point balance, elite status tier (e.g., Titanium/Diamond), lifetime nights, year-to-date nights, expiration date of points, date of statement issuance.

**Document Types:**
- **Monthly Points Statement:** The primary proof of "Hotel Wealth."
- **Elite Status Card:** (Digital or physical) for priority check-in.
- **Stay History Extract:** Proving frequent travel for corporate housing.
- **Status Match Voucher:** For moving between hotel chains.

## What the Checker Sees

Shows the issuer domain (`marriott.com`, `hilton.com`, `accor.com`) and current standing.

**Status Indications:**
- **Active** — Member is in good standing; balance verified.
- **Elite Active** — Current year tier status verified.
- **Expired** — Points have lapsed due to inactivity.
- **Suspended** — Under review (e.g., for fraudulent point transfers).

## Who Holds It

The Elite Member (Traveler) benefits from verification.

**Corporate Housing:** Proving to a high-end apartment manager that they are an "Ambassador Elite" traveler who stays 100+ nights a year. This acts as a "Verified Reputation" signal that can bypass income verification or security deposits in some markets.

**Status Matching:** Proving to a rival hotel chain (e.g., Hilton) that they actually hold top-tier status at Marriott to get an instant upgrade. Verification prevents "Photoshop Tier Inflation" which costs hotel groups millions in unearned perks.

## Who Checks It

**Rival Hotel Groups**
**Marketing Vetting:** Instantly verifying the status claims of competitive switchers during a "Status Challenge" window.

**Lenders / Credit Card Issuers**
**High-Value Underwriting:** Hotel points for an elite traveler can be worth $20,000+. Verification allows lenders to count these "Liquid Points" toward an applicant's net worth or to qualify them for premium co-branded cards.

**Conference Organizers**
**VIP Logistics:** Verifying the "Elite Status" of attendees to automatically assign them to priority suites and VIP lounge access.

## How Verification Works Here

**The "Point Theft" Fraud Problem**

- **Balance Inflation:** Editing a 5,000 point statement to read 500,000 points to trade them on the black market or trick a lender.
- **Tier Faking:** Changing "Silver" to "Titanium" on a PDF to get free breakfast and suite upgrades globally.
- **Account Swapping:** Taking a high-tier statement and editing the name to match a non-traveling friend.

**Issuer Types** (First Party)

**Global Hotel Chains:** (Marriott, Hilton, IHG, Hyatt).
**Travel Management Companies (TMCs).**
**Loyalty Aggregators:** (e.g., AwardWallet, Points.com).

## Authority Chain

**Pattern:** Commercial

Hotel brands and loyalty program operators issue booking confirmations, cancellation notices, and room upgrade records. The issuer is self-authorized as the service provider.

```
✓ booking.hilton.com/receipt/verify — Verifies hotel bookings, cancellations, and loyalty rewards
```

Commercial issuer — self-authorized. Trust rests on the issuer's domain reputation.

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Jurisdictional Witnessing (Optional)

An independent witness layer may apply — see [Witnessing Third Parties](../../docs/WITNESSING-THIRD-PARTIES.md) for the full mechanism (what a witness receives, non-repudiation, optional public-blockchain rollups). For this use case: a witness would receive the hotel or OTA's hashes and status changes plus structured metadata (booking reference IDs, guest names, cancellation dates, refund amounts, room types, stay dates, upgrade methods, upgrade values, points balances, elite statuses) — never payment card details or personal contact information — providing non-repudiation of the cancellation, upgrade, or statement and an audit trail corporate finance teams and insurers can inspect.


## Compared With Mobile Apps

| Feature | Live Verify | Hotel Mobile App | Scanned PDF Statement |
| :--- | :--- | :--- | :--- |
| **Trust Anchor** | **Domain-Bound.** Bound to the Hotel. | **System-Bound.** | **Zero.** Easily forged. |
| **User Privacy** | **High.** Share only the *Balance/Status*. | **Low.** Showing the app reveals *all* past/future stays. | **Vulnerable.** |
| **Interoperability** | **High.** Verified PDF works for status-matching. | **Zero.** Hard to "link" a Marriott app to a Hilton desk. | **Universal.** |
| **Hardware** | **Ordinary smartphone.** Needs Live Verify on it (an app today). | **Technical.** Requires app install/login. | **Visual.** |

**Where each fits:** Within one hotel group, the loyalty app is all a member needs to prove status. It carries little weight at a competitor's desk, and showing it reveals the member's whole stay history. Live Verify lets a member present a single statement that the issuing chain stands behind, for a status match or a partner benefit, while the app remains their everyday account.

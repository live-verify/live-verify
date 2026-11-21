---
title: "Cruise Final Folios and Statements"
category: "Travel & Hospitality"
volume: "Large"
retention: "Voyage + 3-7 years (expense)"
slug: "cruise-final-folios"
verificationMode: "clip"
tags: ["cruise", "folio", "onboard-account", "travel-expense", "vacation-receipt", "carnival", "royal-caribbean"]
furtherDerivations: 1
---

## What is a Cruise Folio?

When you disembark from a cruise ship, you receive a Final Guest Folio. It is a detailed list of every dollar you spent onboard: from the "Business Internet Package" to the "Midnight Margaritas."

For business travelers, the "Folio" is a nightmare to expense. They must "Scrub" the personal fun (drinks/spa) from the legitimate business costs (internet/conference fees).

Fraud happens when employees edit their folio to hide personal spending or to inflate business costs. Verified hashes allow a company's finance department to see the un-altered line items, ensuring that the company only pays for the work-related parts of the trip.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="cruise"></span>ROYAL CARIBBEAN INTERNATIONAL              Folio #: 99228877-X
Final Guest Folio - Wonder of the Seas

Guest:        SARAH J. DOE              Voyage Dates: Mar 08 - Mar 15, 2026
Stateroom:    12504 (Deck 12)           Reservation:  L7XK9B

Description                                                  Amount
───────────────────────────────────────────────────────────────────
Internet Package - VOOM (Unlimited)                        $ 142.50
Onboard Gratuities (Pre-paid)                              $ 112.00
Chops Grille (Specialty Dining)                            $  55.00
───────────────────────────────────────────────────────────────────
TOTAL ONBOARD CHARGES:                                     $ 309.50

This statement reflects all settled charges as of disembarkation.

<span data-verify-line="cruise">verify:royalcaribbean.com/folios/v</span> <span verifiable-text="end" data-for="cruise"></span></pre>
</div>

## The Problem: Folio Scrubbing Fraud

- **Personal Charge Deletion:** Employees editing their cruise folio to "delete" the Casino and Bar charges before sending it to Finance for reimbursement of the Internet and Gratuities.
- **Fabricated Credits:** Adding a fake "Onboard Credit" to a receipt to get cash back from an insurance claim.
- **Reservation Theft:** Using a template to create a fake folio for a trip the traveler never actually took to claim business travel deductions.

## What Is Checked

Passenger name, reservation ID, ship name, voyage dates, stateroom number, itemized charges (Internet, Gratuities, Drinks, Excursions), total settled amount, payment method (last 4 digits).

**Document Types:**
- **Final Guest Folio:** Delivered under the door on the last morning.
- **Interim Statement:** For mid-cruise budget checks.
- **Shore Excursion Receipt:** Proving participation in a specific tour.
- **VAT / Tax Invoice:** For European cruises requiring tax documentation.

## What the Checker Sees

Shows the issuer domain (`royalcaribbean.com`, `carnival.com`) and folio status.

**Status Indications:**
- **Settled** — Account paid in full; disembarkation authorized.
- **Refunded** — A credit was issued post-cruise (e.g., for a missed port).
- **Disputed** — Passenger has formally challenged a charge.
- **Amended** — A revised folio exists (e.g., after a post-cruise correction).

## Who Holds It

The Cruise Guest benefits from verification.

**Business Expense Reimbursement:** Proving to an employer that the $142.50 charge for "Internet Package" was a verified business cost and not a series of cocktails. Verification separates "Work Expenses" from "Personal Luxury" on a complex multi-page folio.

**Tax Compliance:** Differentiating between non-deductible personal travel and deductible business components (e.g., a "Seminar at Sea" registration fee) using verified, non-alterable line items.

## Who Checks It

**Corporate Expense Platforms (SAP Concur / Expensify)**
**Automatic Audit:** The platform can scan the folio hash to instantly validate line items against the cruise line's official ledger, flagging "Photoshopped" upgrades or deleted personal charges.

**Travel Insurers**
**Claim Substantiation:** If a passenger falls ill and needs to prove they didn't consume their "Pre-paid Excursions," the verified folio provides proof of credit or lack thereof from the cruise line.

**Banks (Credit Card Disputes)**
**Resolution:** Instantly verifying the "Final Settled Amount" during a "Double-Charge" dispute, bypassing the 30-day manual evidence cycle.

## Who Issues It

**Issuer Types** (First Party)

**Cruise Lines:** (Royal Caribbean, Carnival, NCL, MSC).
**River Cruise Operators:** (Viking, AmaWaterways).
**Onboard Payment Systems:** (e.g., OceanMedallion).

## Authority Chain

**Pattern:** Commercial

Cruise lines issue final folios accounting for all onboard charges and payments. Self-authorized by their operation of the vessel and merchant contract with passengers.

```
✓ folio.pocruises.com/verify — Issues cruise final folios and onboard account statements
```

Commercial issuer — self-authorized. Trust rests on the issuer's domain reputation.

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Where Each Fits: Live Verify and Credit Card Statements

The card statement is issued by the traveller's own bank and shows what the cruise line charged, as one total. The folio is issued by the cruise line and shows what that total was made of. They are not rivals: they answer different questions, and an expense claim is often strongest with both.

| | Credit card statement | Live Verify on the folio | Unverified folio PDF |
| :--- | :--- | :--- | :--- |
| **Who can check** | Whoever the cardholder shows it to; corporate cards often feed the employer's systems directly. | Anyone handed the folio: an expense platform, a finance team, an insurer, a card-dispute handler. | Nobody; it can only be taken on trust. |
| **What the checker gets** | The total the cruise line charged to the card, from the bank. | Confirmation that the cruise line issued this exact folio, line by line, as at its date. | A breakdown that may have been edited. |
| **What the traveller shares** | The statement, which may also show unrelated spending on the card. | Only the folio, or the extract of it, that they chose to hand over. | Only the folio they chose to hand over. |
| **Reach** | Wherever the card is used; a corporate card feed reaches the employer. | Global in principle: any cruise line, in any country, that publishes hashes on its own domain. | Anywhere, but untrusted. |
| **Speed and cost** | Arrives on the bank's billing cycle. | A few seconds per check: one web lookup, with no fee to the standard. | Free and immediate. |
| **What it needs** | A card account. | The cruise line to publish hashes, and Live Verify-aware software on the checker's device. No cruise line does this yet. | Nothing. |
| **Best suited to** | Reconciling what was actually paid. | Showing which charges were business and which were personal. | Nothing where reimbursement depends on it. |

**Where each fits:** the card statement confirms the total charged and is what finance teams reconcile against. It shows a single amount with no breakdown, and sharing it can reveal unrelated spending. A verified folio supplies the itemised charges from the cruise line itself, so an employee can submit it next to the statement line.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).

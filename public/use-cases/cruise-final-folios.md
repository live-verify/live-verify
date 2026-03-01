---
title: "Cruise Final Folios and Statements"
category: "Travel & Hospitality"
volume: "Large"
retention: "Voyage + 3-7 years (expense)"
slug: "cruise-final-folios"
tags: ["cruise", "folio", "onboard-account", "travel-expense", "vacation-receipt", "carnival", "royal-caribbean"]
furtherDerivations: 1
---

## What is a Cruise Folio?

When you disembark from a cruise ship, you receive a **Final Guest Folio**. It is a detailed list of every dollar you spent onboard: from the "Business Internet Package" to the "Midnight Margaritas."

For business travelers, the "Folio" is a nightmare to expense. They must "Scrub" the personal fun (drinks/spa) from the legitimate business costs (internet/conference fees).

Fraud happens when employees edit their folio to hide personal spending or to inflate business costs. Verified hashes allow a company's finance department to see the **un-altered line items**, ensuring that the company only pays for the work-related parts of the trip.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="cruise">[</span>ROYAL CARIBBEAN INTERNATIONAL              Folio #: 99228877-X
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

<span data-verify-line="cruise">verify:royalcaribbean.com/folios/v</span> <span verifiable-text="end" data-for="cruise">]</span></pre>
</div>

## Data Verified

Passenger name, reservation ID, ship name, voyage dates, stateroom number, itemized charges (Internet, Gratuities, Drinks, Excursions), total settled amount, payment method (last 4 digits).

**Document Types:**
- **Final Guest Folio:** Delivered under the door on the last morning.
- **Interim Statement:** For mid-cruise budget checks.
- **Shore Excursion Receipt:** Proving participation in a specific tour.
- **VAT / Tax Invoice:** For European cruises requiring tax documentation.

## Data Visible After Verification

Shows the issuer domain (`royalcaribbean.com`, `carnival.com`) and folio status.

**Status Indications:**
- **Settled** — Account paid in full; disembarkation authorized.
- **Refunded** — A credit was issued post-cruise (e.g., for a missed port).
- **Disputed** — Passenger has formally challenged a charge.
- **Amended** — A revised folio exists (e.g., after a post-cruise correction).

## Second-Party Use

The **Cruise Guest** benefits from verification.

**Business Expense Reimbursement:** Proving to an employer that the $142.50 charge for "Internet Package" was a verified business cost and not a series of cocktails. Verification separates "Work Expenses" from "Personal Luxury" on a complex multi-page folio.

**Tax Compliance:** Differentiating between non-deductible personal travel and deductible business components (e.g., a "Seminar at Sea" registration fee) using verified, non-alterable line items.

## Third-Party Use

**Corporate Expense Platforms (SAP Concur / Expensify)**
**Automatic Audit:** The platform can scan the folio hash to instantly validate line items against the cruise line's official ledger, flagging "Photoshopped" upgrades or deleted personal charges.

**Travel Insurers**
**Claim Substantiation:** If a passenger falls ill and needs to prove they didn't consume their "Pre-paid Excursions," the verified folio provides proof of credit or lack thereof from the cruise line.

**Banks (Credit Card Disputes)**
**Resolution:** Instantly verifying the "Final Settled Amount" during a "Double-Charge" dispute, bypassing the 30-day manual evidence cycle.

## Verification Architecture

**The "Folio Scrubbing" Fraud Problem**

- **Personal Charge Deletion:** Employees editing their cruise folio to "delete" the Casino and Bar charges before sending it to Finance for reimbursement of the Internet and Gratuities.
- **Fabricated Credits:** Adding a fake "Onboard Credit" to a receipt to get cash back from an insurance claim.
- **Reservation Theft:** Using a template to create a fake folio for a trip the traveler never actually took to claim business travel deductions.

**Issuer Types** (First Party)

**Cruise Lines:** (Royal Caribbean, Carnival, NCL, MSC).
**River Cruise Operators:** (Viking, AmaWaterways).
**Onboard Payment Systems:** (e.g., OceanMedallion).

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


## Competition vs. Credit Card Statements

| Feature | Live Verify | Credit Card Statement | Scanned PDF Folio |
| :--- | :--- | :--- | :--- |
| **Granularity** | **High.** Shows specific items (Wifi vs Alcohol). | **Zero.** Just shows "CARNIVAL CRUISES $1,200". | **High.** But untrusted. |
| **Integrity** | **Cryptographic.** Binds every line item. | **High.** But lacks detail. | **Zero.** Easily edited. |
| **Privacy** | **Selective.** Share only the verified extract. | **Low.** Exposes all other personal spending on the card. | **Vulnerable.** |
| **Freshness** | **Instant.** Verified at disembarkation. | **Laggy.** Charges often aggregate at the end. | **Static.** |

**Why Live Verify wins here:** The "Scrubbing" problem. Corporate finance departments hate cruise folios because they are 10 pages long and full of personal "fun" spending. Live Verify allows an employee to provide a **Verified Extract** of just the business items, giving the company 100% trust without the employee needing to share their "Bar Tab" with their boss.

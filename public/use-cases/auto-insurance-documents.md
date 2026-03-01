---
title: "Auto Insurance Claims and Repair Estimates"
category: "Personal Lines Insurance"
volume: "Medium"
retention: "Claim term + 7 years"
slug: "auto-insurance-documents"
tags: ["auto", "bill-of-lading", "body-shop", "car-shipping", "card", "claim", "compliance", "damage", "dec-page", "estimate", "fraud", "inspection", "insurance", "lines", "logistics", "personal", "policies", "proof-of-insurance", "real-id", "repair", "transport"]
furtherDerivations: 4
---

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="claim">[</span>ALLSTATE INSURANCE
Claims Processing Center
REPAIR ESTIMATE SUMMARY                         Claim #: 99228877-X
═══════════════════════════════════════════════════════════════════

Date:       March 15, 2026
Insured:    MAX POWER
Vehicle:    2024 Tesla Model 3 (VIN: ...5544)
Body Shop:  Joe's Auto Body, Springfield

Category                                                     Total
───────────────────────────────────────────────────────────────────
Parts (OEM)                                              $ 4,250.00
Labor (Paint/Body)                                       $ 2,100.00
Sublet / Fees                                            $   450.00
───────────────────────────────────────────────────────────────────
ESTIMATED REPAIR TOTAL:                                  $ 6,800.00

Adjuster:   Sarah Miller (ID #992)

<span data-verify-line="claim">verify:allstate.com/claims/v</span> <span verifiable-text="end" data-for="claim">]</span></pre>
</div>

## Data Verified

Insured name, vehicle VIN, Claim ID, repair estimate total, parts/labor breakdown, body shop name, adjuster name, date of estimate.

**Document Types:**
- **Initial Appraisal:** The first field estimate.
- **Supplement Request:** For hidden damage found after tear-down.
- **Final Proof of Loss:** The final document signed by the insured to release payment.
- **Total Loss Valuation:** (Market value vs. repair cost).

## Data Visible After Verification

Shows the issuer domain (the Insurance Carrier) and the claim status.

**Status Indications:**
- **Approved** — Estimate matches the carrier's system; payment authorized.
- **Supplemented** — This estimate is outdated; a new Supplement #2 exists.
- **Paid** — Funds have been issued to the body shop/insured.
- **Closed** — Claim file completed.

## Second-Party Use

The **Insured** (Vehicle Owner) benefits from verification.

**Body Shop Oversight:** Proving to the body shop exactly what the insurance company agreed to pay for (e.g., OEM parts vs. Aftermarket). Verification prevents "part-swapping" fraud where the shop charges for OEM but installs cheap knock-offs.

**Sale of Vehicle:** Providing a "Verified Clean" repair history to a future buyer, proving that the $6,800 repair was for cosmetic damage and not structural frame issues.

## Third-Party Use

**Body Shops**
**Payment Assurance:** Before starting work, the shop scans the estimate provided by the customer. "Verified by Allstate" gives them the confidence that the funds will actually arrive upon completion.

**Used Car Buyers (CARFAX)**
**History Integrity:** If a car is repaired but never reported to CARFAX, the damage history is hidden. A "Verified Claim" from the insurance domain provides an un-erasable digital audit trail of the vehicle's damage history.

**Lienholders (Banks)**
**Collateral Protection:** Banks need to ensure that insurance payouts are actually used to fix the car (their collateral) and not just pocketed by the owner. Verifying the repair estimate and completion status protects the loan.

## Verification Architecture

**The "Padded Estimate" Fraud Problem**

- **PDF Alteration:** A shady body shop takes a $2,000 estimate from the insurer and edits the PDF to read $6,000 before showing it to the customer.
- **Prior Damage Fraud:** Claiming that old scratches from 2 years ago were part of yesterday's fender-bender.
- **Phantom Supplements:** Forging "Supplement #1" to get extra cash from the insurer for damage that doesn't exist.

**Issuer Types** (First Party)

**Insurance Carriers:** (Allstate, Geico, State Farm, etc.)
**Adjusting Firms:** (Third-party firms like Crawford & Co).
**Body Shop Management Systems:** (CCC One, Mitchell, Audatex).

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


## Competition vs. Central Databases (CARFAX)

| Feature | Live Verify | CARFAX / Autocheck | Paper Estimate |
| :--- | :--- | :--- | :--- |
| **Granularity** | **High.** Shows line-item parts/labor. | **Low.** Often just says "Accident Reported - Damage to Front." | **High.** But untrusted. |
| **Speed** | **Real-time.** Available as soon as the adjuster hits "save." | **Laggy.** Can take weeks or months for claims to appear in CARFAX. | **Instant.** |
| **Trust** | **Cryptographic.** Bound to the Insurer's domain. | **Reporting-Based.** Relies on data feeds which can be incomplete. | **Zero.** Easily forged. |

**Why Live Verify wins here:** Detail. CARFAX is great for "Did it have a crash?" but terrible for "What exactly was fixed?" Live Verify allows a buyer or bank to see the **exact scope** of the repair, verified by the source of truth (the insurer who paid for it).


---

_[Content merged from: auto-insurance-id-cards]_


## What is an Auto ID Card?

An **Auto Insurance ID Card** is the "Proof of Insurance" you keep in your glovebox or digital wallet. In almost every US state, driving without one is illegal and can lead to your car being impounded.

The card proves three things:
1.  **Who is insured:** The named driver.
2.  **What is insured:** The specific vehicle (VIN).
3.  **The Timeframe:** That the policy hasn't expired.

Because people often cancel their insurance right after printing the card, police and DMV agents need a way to verify that the policy is **live** and hasn't been terminated for non-payment.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 2px 5px rgba(0,0,0,0.2);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="ins">[</span>GEICO                                        AUTO INSURANCE ID CARD
═══════════════════════════════════════════════════════════════════

Policy Number:    9988-77-66
NAIC Code:        22063

Insured:          RICHARD "DICK" GRAYSON
Vehicle:          2025 Gotham Motors Bat-Sedan
VIN:              1G6AX57L9RJ123456

Effective Date:   JAN 01, 2026
Expiration Date:  JUL 01, 2026

This card is for information only.
Refer to your policy for actual coverage.

<span data-verify-line="ins">verify:geico.com/v</span> <span verifiable-text="end" data-for="ins">]</span></pre>
</div>

## Data Verified

Insured name, policy number, NAIC code, VIN (Full), vehicle year/make/model, effective date, expiration date, issuing carrier.

**Document Types:**
- **Standard ID Card:** Paper or digital wallet.
- **Binder:** Temporary 30-day proof for new purchases.
- **SR-22 / FR-44:** High-risk financial responsibility filings.

## Data Visible After Verification

Shows the issuer domain (`geico.com`, `statefarm.com`) and real-time coverage status.

**Status Indications:**
- **Active** — Policy is currently in force.
- **Cancelled** — Policy terminated (e.g., for non-payment) *even if the card isn't expired*.
- **Pending Renewal** — Policy about to expire but payment found.
- **Lapsed** — No coverage.

## Second-Party Use

The **Policyholder** benefits from verification.

**Roadside Verification:** When pulled over, showing a "Verified Active" status to a police officer prevents the car from being impounded if the officer suspects the paper card is fake.

**Registration / DMV:** Providing verified proof of insurance to the DMV during tag renewal, bypassing the need for manual database checks which often fail due to VIN typos.

## Third-Party Use

**Police Officers**
**Traffic Stops:** Instantly confirming that the policy wasn't cancelled yesterday. Standard paper cards are easily forged or kept after cancellation. Verification provides the "Live Status" necessary for public safety.

**Rental Car Agencies**
**Liability Transfer:** Verifying that the customer's personal policy actually covers rental cars (Collision Damage Waiver bypass).

**Car Dealerships**
**Off-Lot Authorization:** Verifying insurance before letting a buyer drive a new $50,000 car off the lot.

## Verification Architecture

**The "Ghost Policy" Fraud Problem**

- **Buy and Cancel:** The most common fraud. A driver buys a policy, prints the card, then cancels the policy for a full refund. They carry the "valid" paper card for 6 months to fool police.
- **VIN Tampering:** Changing the VIN on an old card to match a new, uninsured car.
- **Identity Swapping:** Editing the name on a friend's insurance card.

**Issuer Types** (First Party)

**Insurance Carriers:** (Geico, Progressive, State Farm, etc.)
**State DMVs:** (As the oversight body).

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

**Jurisdictional Requirements (United States)**

The IRS does not mandate or recognize third-party witnessing firms for federal tax documents. The IRS maintains authoritative records within its own systems, and verification occurs via direct query to IRS endpoints.

However:
- **State tax authorities** may have different requirements (e.g., state-level charity registration requires independent witness firms)
- **International stakeholders** (foreign tax authorities, treaty partners) may demand independent verification from witness firms not located in the US
- **FATCA compliance** (Foreign Account Tax Compliance Act) may require US documents to be witnessed by non-US firms when shared across borders

**Jurisdictional Requirements (Insurance)**

**US Domestic Insurance:** State insurance commissioners do not mandate witness firms for policy issuance. However:
- **Claims litigation:** Once insurance moves to litigation, court-appointed independent witnesses become mandatory
- **Cross-border coverage:** International policies may require witness firms from multiple jurisdictions
- **Lloyd's & International Market:** Non-US policies may require witness firms from OECD nations

**Reinsurance/Captive Insurance:** International reinsurance treaties demand witness firms when policies involve non-US insureds or cross-border claims.

**Public Blockchain (Non-Party)**

Witnessing firms may periodically commit rollups to an inexpensive public blockchain, providing an ultimate immutability guarantee. The blockchain is a "non-party"—infrastructure, not a participant in the transaction. This creates multiple verification paths:

1. **Issuer domain** — Direct check against the issuer
2. **Witnessing firm** — Independent confirmation with timestamp
3. **Public blockchain** — Decentralized trust anchor via rollup inclusion


## Competition vs. DMV Databases (ALIR/IIVS)

| Feature | Live Verify | DMV Central DB (IIVS) | Paper Card |
| :--- | :--- | :--- | :--- |
| **Freshness** | **Real-time.** Queries the insurer directly. | **Laggy.** Often 24-72 hours behind. | **Static.** |
| **Availability** | **Universal.** Works across state lines. | **Siloed.** CA police can't easily check NY DMV database. | **Manual.** |
| **Accessibility** | **Open.** Dealers and Rental agents can verify. | **Restricted.** Only Police/DMV have access. | **Zero.** |

**Why Live Verify wins here:** Portability. If a New York driver is pulled over in Florida, the Florida officer might not have access to the NY DMV's internal database. But they can *always* verify `geico.com` via the web. Live Verify turns the ID card into a cross-border, real-time "Coverage Token."


---

_[Content merged from: auto-insurance-policies]_


## What is a Declarations Page?

An insurance policy can be 50 pages of legal jargon. The **Declarations Page** (or "Dec Page") is the one-page summary that actually matters. It lists:
1.  **Limits:** How much the company will pay (e.g., $100k/$300k).
2.  **Deductibles:** How much you pay out of pocket ($500).
3.  **Drivers:** Exactly who is covered.

Lenders (for car loans) and landlords often require a copy of the Dec Page. Fraudsters often "Photoshopping" these pages to show higher coverage limits than they actually have to win contracts or satisfy loan requirements.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="autodec">[</span>PROGRESSIVE
POLICY DECLARATIONS                              Renewal: Mar 15, 2026
═══════════════════════════════════════════════════════════════════

Named Insured:  John Doe
                456 Oak Lane, Austin, TX 78701

Coverage                                                    Limits
───────────────────────────────────────────────────────────────────
Bodily Injury Liability                      $ 250,000 / $ 500,000
Property Damage                                          $ 100,000
Collision Deductible                                         $ 500

Vehicle:        2024 Ford F-150 (VIN ...9922)

<span data-verify-line="autodec">verify:progressive.com/v/dec</span> <span verifiable-text="end" data-for="autodec">]</span></pre>
</div>

## Data Verified

Named insured, policy limits, deductibles, VIN, effective dates, premium amount, lienholder name.

## Data Visible After Verification

Shows the issuer domain (`progressive.com`) and the policy status.

**Status Indications:**
- **Active** — Policy is current.
- **Cancelled** — Policy terminated.
- **Pending** — Renewal in process.

## Second-Party Use

The **Policyholder** benefits from verification.
- **Loan Compliance:** Proving to a bank that they have the required "Full Coverage" for their car loan.
- **Job Requirements:** Gig workers (Uber/DoorDash) proving they have the correct insurance tier.

## Third-Party Use

**Lenders (Auto Finance)**
**Collateral Protection:** Banks can scan the Dec Page provided by the borrower to ensure the "Loss Payee" is correctly listed and the deductibles aren't too high.

**Attorneys (Personal Injury)**
**Demand Letters:** When an accident happens, lawyers need to know the *true* policy limits. Verification prevents "Ghost Limits" fraud where a driver claims to have $1M in coverage but only has the state minimum.

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

**Jurisdictional Requirements (United States)**

The IRS does not mandate or recognize third-party witnessing firms for federal tax documents. The IRS maintains authoritative records within its own systems, and verification occurs via direct query to IRS endpoints.

However:
- **State tax authorities** may have different requirements (e.g., state-level charity registration requires independent witness firms)
- **International stakeholders** (foreign tax authorities, treaty partners) may demand independent verification from witness firms not located in the US
- **FATCA compliance** (Foreign Account Tax Compliance Act) may require US documents to be witnessed by non-US firms when shared across borders

**Jurisdictional Requirements (Insurance)**

**US Domestic Insurance:** State insurance commissioners do not mandate witness firms for policy issuance. However:
- **Claims litigation:** Once insurance moves to litigation, court-appointed independent witnesses become mandatory
- **Cross-border coverage:** International policies may require witness firms from multiple jurisdictions
- **Lloyd's & International Market:** Non-US policies may require witness firms from OECD nations

**Reinsurance/Captive Insurance:** International reinsurance treaties demand witness firms when policies involve non-US insureds or cross-border claims.

**Public Blockchain (Non-Party)**

Witnessing firms may periodically commit rollups to an inexpensive public blockchain, providing an ultimate immutability guarantee. The blockchain is a "non-party"—infrastructure, not a participant in the transaction. This creates multiple verification paths:

1. **Issuer domain** — Direct check against the issuer
2. **Witnessing firm** — Independent confirmation with timestamp
3. **Public blockchain** — Decentralized trust anchor via rollup inclusion


## Competition vs. ACORD Certificates

| Feature | Live Verify | ACORD 25 (Standard) |
| :--- | :--- | :--- |
| **Trust** | **Cryptographic.** Bound to insurer. | **Visual.** Prone to easy editing. |
| **Speed** | **Instant.** Scan and verify. | **Slow.** Requires calling the broker. |
| **Integrity** | **Binds Content.** | **Binds Nothing.** Just a template. |

**Why Live Verify wins here:**
The Dec Page is the source of truth. ACORD forms are just summaries written by brokers. Live Verify allows the **Source Document** to be verified directly against the **Carrier**, cutting out the middleman and the potential for "Summary Errors."



---

_[Content merged from: auto-transport-damage-reports]_


## What is an Auto Transport Report?

When you ship a car across the country on a truck, the driver performs a "walk-around" inspection at your driveway. They mark every existing scratch or chip on a **Bill of Lading (BOL)** or inspection report.

This document is the only thing protecting you if the car arrives at the destination with a new dent.

Fraud is common: drivers sometimes "edit" the digital report *after* they damage the car, adding a scratch to the "Origin" report so it looks like it was already there. Verified snapshots prevent this "after-the-fact" tampering.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="damage">[</span>RELIABLE CAR CARRIERS, INC.
MC #123456 | DOT #998877
VEHICLE INSPECTION REPORT (BOL)                 Order #: RCC-2026-992
═══════════════════════════════════════════════════════════════════

Vehicle:    2025 Porsche 911 GT3
VIN:        WP0AC2A9...5544
Condition:  Pre-Transport

ORIGIN                              DESTINATION
───────────────────────────────────────────────────────────────────
Los Angeles, CA                     Miami, FL
MAR 15, 2026                        MAR 20, 2026
[NO DAMAGE]                         [PENDING]

Damage Notations (Origin):
Clean - no scratches, chips, or dents noted at time of pickup.

<span data-verify-line="damage">verify:reliable-carriers.com/bol/v</span> <span verifiable-text="end" data-for="damage">]</span></pre>
</div>

## Data Verified

Carrier DOT/MC number, vehicle VIN, pickup/delivery locations, timestamps, detailed damage codes (scratches, dents, chips), driver name, customer signature.

**Document Types:**
- **Electronic Bill of Lading (eBOL):** The primary transport contract.
- **Delivery Receipt:** Final sign-off showing new damage.
- **Damage Claim Form:** Filed after delivery for hidden issues.

## Data Visible After Verification

Shows the issuer domain (the Auto Transport Carrier) and the report status.

**Status Indications:**
- **Origin Signed** — Pickup condition is locked.
- **Delivered** — Transport complete; final inspection filed.
- **Claim Active** — Customer has reported damage; under investigation.
- **Void** — Order cancelled or re-issued.

## Second-Party Use

The **Vehicle Owner** (or Dealer) benefits from verification.

**Insurance Claims:** Proving to their own insurance company that the "dent in the hood" was NOT present at pickup in LA, but IS present on the Miami delivery receipt. A verified origin report prevents the carrier from claiming "it was like that when we got it."

**Remote Purchase:** A buyer in Miami buying a car from a dealer in LA can verify the driver's pickup report to ensure the dealer didn't ship a damaged car.

## Third-Party Use

**Cargo Insurers**
**Liability Allocation:** When a $200,000 car arrives damaged, the insurer needs to know exactly when the damage occurred. Verification prevents the carrier from "editing" the pickup report after the damage happens to make it look like pre-existing condition.

**Used Car Dealers**
**Inventory Audit:** Verifying that incoming shipments match the condition reports from the transport company, ensuring no hidden transport damage is passed on to the retail customer.

**Fleet Managers**
**Driver Oversight:** Ensuring drivers are performing honest inspections and not skipping steps or fabricating "clean" reports to speed up their route.

## Verification Architecture

**The "Pre-Existing" Damage Fraud Problem**

- **Report Editing:** Drivers taking a clean car, scratching it, and then editing the "Origin" PDF to add a "Scratch" notation to avoid a claim.
- **Signature Forgery:** Using a digital image of a customer's signature from a previous move on a new, damaged shipment.
- **Photo Tampering:** Replacing inspection photos with older, cleaner photos of the same vehicle model.

**Issuer Types** (First Party)

**Auto Transport Carriers:** (Reliable Carriers, Horseless Carriage).
**Broker Platforms:** (Central Dispatch, ShipCarsNow).
**Inspection Apps:** (SuperDispatch, Car-Arrive).

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

**Jurisdictional Requirements (United States)**

The IRS does not mandate or recognize third-party witnessing firms for federal tax documents. The IRS maintains authoritative records within its own systems, and verification occurs via direct query to IRS endpoints.

However:
- **State tax authorities** may have different requirements (e.g., state-level charity registration requires independent witness firms)
- **International stakeholders** (foreign tax authorities, treaty partners) may demand independent verification from witness firms not located in the US
- **FATCA compliance** (Foreign Account Tax Compliance Act) may require US documents to be witnessed by non-US firms when shared across borders

**Jurisdictional Requirements (Insurance)**

**US Domestic Insurance:** State insurance commissioners do not mandate witness firms for policy issuance. However:
- **Claims litigation:** Once insurance moves to litigation, court-appointed independent witnesses become mandatory
- **Cross-border coverage:** International policies may require witness firms from multiple jurisdictions
- **Lloyd's & International Market:** Non-US policies may require witness firms from OECD nations

**Reinsurance/Captive Insurance:** International reinsurance treaties demand witness firms when policies involve non-US insureds or cross-border claims.

**Public Blockchain (Non-Party)**

Witnessing firms may periodically commit rollups to an inexpensive public blockchain, providing an ultimate immutability guarantee. The blockchain is a "non-party"—infrastructure, not a participant in the transaction. This creates multiple verification paths:

1. **Issuer domain** — Direct check against the issuer
2. **Witnessing firm** — Independent confirmation with timestamp
3. **Public blockchain** — Decentralized trust anchor via rollup inclusion


## Competition vs. Central Portals

| Feature | Live Verify | SuperDispatch / Carrier Portal | Paper Carbon Copy |
| :--- | :--- | :--- | :--- |
| **Field Access** | **Universal.** Scan the paper/tablet. | **Restricted.** Requires app login usually for drivers only. | **Instant.** |
| **Integrity** | **Cryptographic.** Binds the origin state. | **Database-Bound.** Relies on the portal not being "corrected" later. | **Zero.** Easily forged. |
| **Sharing** | **Easy.** Share the PDF/Link with any insurer. | **Hard.** Requires "Exporting" reports or giving portal access. | **Manual.** |

**Why Live Verify wins here:** The "Handoff Moment." Inspections happen in driveways and parking lots. The customer needs a trusted snapshot of the car's state *right now*. Live Verify turns that paper/digital sign-off into an immutable anchor that prevents "After-the-fact" editing of damage records.

---
title: "Auto Insurance Claims and Repair Estimates"
category: "Personal Lines Insurance"
volume: "Medium"
retention: "Claim term + 7 years"
slug: "auto-insurance-documents"
verificationMode: "clip"
tags: ["auto", "bill-of-lading", "body-shop", "car-shipping", "card", "claim", "compliance", "damage", "dec-page", "estimate", "fraud", "inspection", "insurance", "lines", "logistics", "personal", "policies", "proof-of-insurance", "real-id", "repair", "transport"]
furtherDerivations: 4
---

## Scope

This file actually contains two different families:

- **claims and repair documents**, where portable estimates and claim summaries move between insurer, customer, body shop, lender, and buyer
- **auto insurance ID cards**, where the real source of truth is usually the insurer or DMV-linked coverage system

Those two families are not equally strong for Live Verify. Claims and repair documents are the stronger fit because they routinely travel outside the insurer's native system. The ID-card half is more complementary and often secondary to direct insurer/DMV checks.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="claim"></span>ALLSTATE INSURANCE
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

<span data-verify-line="claim">verify:allstate.com/claims/v</span> <span verifiable-text="end" data-for="claim"></span></pre>
</div>

## The Problem: Padded Estimate Fraud

- **PDF Alteration:** A shady body shop takes a $2,000 estimate from the insurer and edits the PDF to read $6,000 before showing it to the customer.
- **Prior Damage Fraud:** Claiming that old scratches from 2 years ago were part of yesterday's fender-bender.
- **Phantom Supplements:** Forging "Supplement #1" to get extra cash from the insurer for damage that doesn't exist.

## What Is Checked

Insured name, vehicle VIN, Claim ID, repair estimate total, parts/labor breakdown, body shop name, adjuster name, date of estimate.

**Document Types:**
- **Initial Appraisal:** The first field estimate.
- **Supplement Request:** For hidden damage found after tear-down.
- **Final Proof of Loss:** The final document signed by the insured to release payment.
- **Total Loss Valuation:** (Market value vs. repair cost).

## What the Checker Sees

Shows the issuer domain (the Insurance Carrier) and the claim status.

**Status Indications:**
- **Approved** — Estimate matches the carrier's system; payment authorized.
- **Supplemented** — This estimate is outdated; a new Supplement #2 exists.
- **Paid** — Funds have been issued to the body shop/insured.
- **Closed** — Claim file completed.

## Who Holds It

The Insured (Vehicle Owner) benefits from verification.

**Body Shop Oversight:** Proving to the body shop exactly what the insurance company agreed to pay for (e.g., OEM parts vs. Aftermarket). Verification prevents "part-swapping" fraud where the shop charges for OEM but installs cheap knock-offs.

**Sale of Vehicle:** Providing a "Verified Clean" repair history to a future buyer, proving that the $6,800 repair was for cosmetic damage and not structural frame issues.

## Who Checks It

**Body Shops**
**Payment Assurance:** Before starting work, the shop scans the estimate provided by the customer. "Verified by Allstate" gives them confidence that the estimate really came from the carrier and has not been padded or superseded in transit.

**Used Car Buyers (CARFAX)**
**History Integrity:** If a car is repaired but never reported to CARFAX, the damage history is hidden. A verified claim or repair estimate is a portable, source-bound record of what the insurer actually assessed and paid.

**Lienholders (Banks)**
**Collateral Protection:** Banks need to ensure that insurance payouts are actually used to fix the car (their collateral) and not just pocketed by the owner. Verifying the repair estimate and completion status protects the loan.

## Who Issues It

**Issuer Types** (First Party)

**Insurance Carriers:** (Allstate, Geico, State Farm, etc.)
**Adjusting Firms:** (Third-party firms like Crawford & Co).
**Body Shop Management Systems:** (CCC One, Mitchell, Audatex).

## Where Each Fits: Live Verify and Vehicle History Reports

Vehicle history services such as CARFAX and AutoCheck compile accident and claim reports from insurers, police, repairers and other sources into a history for each vehicle. Similar services exist in some other countries and not in others. A history report and Live Verify answer different questions and work side by side: the history report summarises a vehicle's past across many sources, while Live Verify lets someone confirm a specific estimate or claim document the insurer issued.

| | Vehicle history report | Live Verify on the estimate or claim summary | Paper estimate |
| :--- | :--- | :--- | :--- |
| **Who can check** | Anyone who buys a report on the vehicle. | Anyone handed the document: the policyholder, a repair shop, a buyer, a lender, a lawyer. | Nobody; it can only be taken on trust. |
| **What the checker gets** | A summary across sources, often brief (for example, damage reported to the front), and only what has been reported to the service. | Confirmation that the insurer issued this exact estimate, with its line items, as at its date. | A document that may have been edited. |
| **What the holder shares** | Nothing; the report is about the vehicle. | Only the document they chose to hand over. | The estimate. |
| **Reach** | Vehicles and sources the service covers, mainly in its own country. | Global in principle: any insurer that publishes hashes on its own domain. | Universal, but untrusted. |
| **Speed and cost** | Quick to buy; claims can take a while to appear. | A few seconds per check: one web lookup, with no fee to the standard. | Free and immediate. |
| **What it needs** | Data feeds from insurers and others, and a fee per report. | The insurer to publish hashes, and Live Verify-aware software on the checker's device. No insurer does this yet. | Nothing. |
| **Best suited to** | Screening a used vehicle's history. | Settling what a specific estimate or claim said. | Nothing where the amount matters. |

**Where each fits:** vehicle history reports remain the right tool for screening a car's past across many sources. Claim documents are different: an estimate or claim summary gets emailed, printed, negotiated over, and reopened later outside the insurer's own systems. Live Verify lets whoever holds one, with software that honours it, confirm the insurer stands behind that exact version, while the insurer remains the source of truth.

---

_[Content merged from: auto-insurance-id-cards]_

## What is an Auto ID Card?

An Auto Insurance ID Card is the "Proof of Insurance" you keep in your glovebox or digital wallet. In almost every US state, driving without one is illegal and can lead to your car being impounded.

The card proves three things:
1.  **Who is insured:** The named driver.
2.  **What is insured:** The specific vehicle (VIN).
3.  **The Timeframe:** That the policy hasn't expired.

Because people often cancel their insurance right after printing the card, police and DMV agents need a way to verify that the policy is live and hasn't been terminated for non-payment.

But this is much closer to a direct insurer / DMV / central-database problem than to a portable-document-integrity problem. Where official coverage databases or insurer APIs exist, they should remain primary. Live Verify is more plausible as a convenience layer for lower-capability relying parties holding only the card.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 2px 5px rgba(0,0,0,0.2);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="ins"></span>GEICO                                        AUTO INSURANCE ID CARD
═══════════════════════════════════════════════════════════════════

Policy Number:    9988-77-66
NAIC Code:        22063

Insured:          RICHARD "DICK" MORRISON
Vehicle:          2025 Northbridge Motors Signature-Sedan
VIN:              1G6AX57L9RJ123456

Effective Date:   JAN 01, 2026
Expiration Date:  JUL 01, 2026

This card is for information only.
Refer to your policy for actual coverage.

<span data-verify-line="ins">verify:geico.com/v</span> <span verifiable-text="end" data-for="ins"></span></pre>
</div>

## What Is Checked

Insured name, policy number, NAIC code, VIN (Full), vehicle year/make/model, effective date, expiration date, issuing carrier.

**Document Types:**
- **Standard ID Card:** Paper or digital wallet.
- **Binder:** Temporary 30-day proof for new purchases.
- **SR-22 / FR-44:** High-risk financial responsibility filings.

## What the Checker Sees

Shows the issuer domain (`geico.com`, `statefarm.com`) and real-time coverage status.

**Status Indications:**
- **Active** — Policy is currently in force.
- **Cancelled** — Policy terminated (e.g., for non-payment) *even if the card isn't expired*.
- **Pending Renewal** — Policy about to expire but payment found.
- **Lapsed** — No coverage.

## Who Holds It

The Policyholder benefits from verification.

**Roadside Verification:** When pulled over, showing a "Verified Active" status to a police officer prevents the car from being impounded if the officer suspects the paper card is fake.

**Registration / DMV:** Providing verified proof of insurance to the DMV during tag renewal, bypassing the need for manual database checks which often fail due to VIN typos.

## Who Checks It

**Police Officers**
**Traffic Stops:** Official insurer or DMV-connected coverage systems should remain primary where available. Live Verify is more credible as a fallback when the officer or another relying party is forced to work from the visible card itself.

**Rental Car Agencies**
**Liability Transfer:** Verifying that the customer's personal policy actually covers rental cars (Collision Damage Waiver bypass).

**Car Dealerships**
**Off-Lot Authorization:** A dealer can use the card as a quick bridge to current insurer state before letting a buyer drive off the lot, but direct insurer confirmation remains the stronger architecture where available.

## How Verification Works Here

**The "Ghost Policy" Fraud Problem**

- **Buy and Cancel:** The most common fraud. A driver buys a policy, prints the card, then cancels the policy for a full refund. They carry the "valid" paper card for 6 months to fool police.
- **VIN Tampering:** Changing the VIN on an old card to match a new, uninsured car.
- **Identity Swapping:** Editing the name on a friend's insurance card.

**Issuer Types** (First Party)

**Insurance Carriers:** (Geico, Progressive, State Farm, etc.)
**State DMVs / Insurance Verification Networks:** (As oversight and status-distribution bodies).

## Where Each Fits: Live Verify and Insurance Verification Databases

Many US states run electronic insurance verification systems, fed by insurers, that police and motor vehicle agencies use to check whether a vehicle is insured, and some other countries keep a national motor insurance database. Coverage depends on where you are: some states and countries have such a system, some do not, and access is usually restricted to officials. These systems and Live Verify answer different questions and work side by side: the system gives officials the insurer-reported status, while Live Verify lets someone who has only the ID card check it.

| | State or national insurance verification system | Live Verify on the insurance ID card | Paper card |
| :--- | :--- | :--- | :--- |
| **Who can check** | Police and motor vehicle agencies, and sometimes other authorised users. | Anyone shown the card: a dealer, a rental agent, another driver after an accident, a parking operator. | Anyone who looks at it, on trust. |
| **What the checker gets** | The insurer-reported status for that vehicle, which may lag behind recent changes. | Confirmation that the insurer issued this exact card, as at its date, and whether the policy has since been cancelled. | A card that may be out of date or forged. |
| **What the driver shares** | Nothing; officials query the record. | Only the card they chose to show. | The card. |
| **Reach** | One state's or country's vehicles, and usually only officials. | Global in principle: any insurer that publishes hashes on its own domain. | Universal, but untrusted. |
| **Speed and cost** | Fast for those with access. | A few seconds per check: one web lookup, with no fee to the standard. | Free and immediate. |
| **What it needs** | Official access, and insurers reporting to the system. | The insurer to publish hashes, and Live Verify-aware software on the checker's device. No insurer does this yet. | Nothing. |
| **Best suited to** | Enforcement and registration. | Private parties who have only the card. | Nothing where cover matters. |

**Where each fits:** where an insurer or official verification system is available, it should remain the primary check. Its users are mostly officials, though, and a dealer, rental agent or other driver usually has only the card in front of them. Live Verify serves that party, if their software honours it, as a bridge from the visible card to the insurer.

---

_[Content merged from: auto-insurance-policies]_

## What is a Declarations Page?

An insurance policy can be 50 pages of legal jargon. The Declarations Page (or "Dec Page") is the one-page summary that actually matters. It lists:
1.  **Limits:** How much the company will pay (e.g., $100k/$300k).
2.  **Deductibles:** How much you pay out of pocket ($500).
3.  **Drivers:** Exactly who is covered.

Lenders (for car loans) and landlords often require a copy of the Dec Page. Fraudsters often "Photoshopping" these pages to show higher coverage limits than they actually have to win contracts or satisfy loan requirements.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="autodec"></span>PROGRESSIVE
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

<span data-verify-line="autodec">verify:progressive.com/v/dec</span> <span verifiable-text="end" data-for="autodec"></span></pre>
</div>

## What Is Checked

Named insured, policy limits, deductibles, VIN, effective dates, premium amount, lienholder name.

## What the Checker Sees

Shows the issuer domain (`progressive.com`) and the policy status.

**Status Indications:**
- **Active** — Policy is current.
- **Cancelled** — Policy terminated.
- **Pending** — Renewal in process.

## Who Holds It

The Policyholder benefits from verification.
- **Loan Compliance:** Proving to a bank that they have the required "Full Coverage" for their car loan.
- **Job Requirements:** Gig workers (Uber/DoorDash) proving they have the correct insurance tier.

## Who Checks It

**Lenders (Auto Finance)**
**Collateral Protection:** Banks can scan the Dec Page provided by the borrower to ensure the "Loss Payee" is correctly listed and the deductibles aren't too high.

**Attorneys (Personal Injury)**
**Demand Letters:** When an accident happens, lawyers need to know the *true* policy limits. Verification prevents "Ghost Limits" fraud where a driver claims to have $1M in coverage but only has the state minimum.

## Where Each Fits: Live Verify and ACORD Certificates

In the US, brokers commonly issue proof of cover on standard ACORD certificate forms, and counterparties check them, when in doubt, by calling the broker. An ACORD certificate and Live Verify answer different questions and work side by side: the certificate is the familiar summary format, while Live Verify lets someone with no relationship to the broker or carrier confirm a declarations page, or a certificate, against the carrier.

| | ACORD certificate | Live Verify on the declarations page |
| :--- | :--- | :--- |
| **Who can check** | Anyone who receives it, by calling the broker. | Anyone handed the page: a lender, a lessor, a landlord, a court. |
| **What the checker gets** | A standard summary on a familiar form, which can be edited and states that it confers no rights. | Confirmation that the carrier issued this exact declarations page, as at its date, and whether the policy has since been cancelled. |
| **What the policyholder shares** | The certificate. | Only the page they chose to hand over. |
| **Reach** | Widely used in the US. | Global in principle: any carrier that publishes hashes on its own domain. |
| **Speed and cost** | Quick to issue; checking means a call to a broker who may be slow to answer. | A few seconds per check: one web lookup, with no fee to the standard. |
| **What it needs** | A broker to issue it and to answer queries. | The carrier to publish hashes, and Live Verify-aware software on the checker's device. No carrier does this yet. |
| **Best suited to** | Counterparties who expect the standard form. | Checkers with no relationship to the broker or carrier. |

**Where each fits:** the ACORD certificate is the format most counterparties ask for, and where the broker is known and reachable a call to them settles any doubt. A declarations page is the carrier's own statement of the policy, and the person handed one often has no relationship with either the broker or the carrier. Live Verify lets that person, if their software honours it, check the page against the carrier's domain, and it can equally be applied to the certificate.

---

_[Content merged from: auto-transport-damage-reports]_

## What is an Auto Transport Report?

When you ship a car across the country on a truck, the driver performs a "walk-around" inspection at your driveway. They mark every existing scratch or chip on a Bill of Lading (BOL) or inspection report.

This document is the only thing protecting you if the car arrives at the destination with a new dent.

Fraud is common: drivers sometimes "edit" the digital report *after* they damage the car, adding a scratch to the "Origin" report so it looks like it was already there. Verified snapshots prevent this "after-the-fact" tampering.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="damage"></span>RELIABLE CAR CARRIERS, INC.
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

<span data-verify-line="damage">verify:reliable-carriers.com/bol/v</span> <span verifiable-text="end" data-for="damage"></span></pre>
</div>

## What Is Checked

Carrier DOT/MC number, vehicle VIN, pickup/delivery locations, timestamps, detailed damage codes (scratches, dents, chips), driver name, customer signature.

**Document Types:**
- **Electronic Bill of Lading (eBOL):** The primary transport contract.
- **Delivery Receipt:** Final sign-off showing new damage.
- **Damage Claim Form:** Filed after delivery for hidden issues.

## What the Checker Sees

Shows the issuer domain (the Auto Transport Carrier) and the report status.

**Status Indications:**
- **Origin Signed** — Pickup condition is locked.
- **Delivered** — Transport complete; final inspection filed.
- **Claim Active** — Customer has reported damage; under investigation.
- **Void** — Order cancelled or re-issued.

## Who Holds It

The Vehicle Owner (or Dealer) benefits from verification.

**Insurance Claims:** Proving to their own insurance company that the "dent in the hood" was NOT present at pickup in LA, but IS present on the Miami delivery receipt. A verified origin report prevents the carrier from claiming "it was like that when we got it."

**Remote Purchase:** A buyer in Miami buying a car from a dealer in LA can verify the driver's pickup report to ensure the dealer didn't ship a damaged car.

## Who Checks It

**Cargo Insurers**
**Liability Allocation:** When a $200,000 car arrives damaged, the insurer needs to know exactly when the damage occurred. Verification prevents the carrier from "editing" the pickup report after the damage happens to make it look like pre-existing condition.

**Used Car Dealers**
**Inventory Audit:** Verifying that incoming shipments match the condition reports from the transport company, ensuring no hidden transport damage is passed on to the retail customer.

**Fleet Managers**
**Driver Oversight:** Ensuring drivers are performing honest inspections and not skipping steps or fabricating "clean" reports to speed up their route.

## How Verification Works Here

**The "Pre-Existing" Damage Fraud Problem**

- **Report Editing:** Drivers taking a clean car, scratching it, and then editing the "Origin" PDF to add a "Scratch" notation to avoid a claim.
- **Signature Forgery:** Using a digital image of a customer's signature from a previous move on a new, damaged shipment.
- **Photo Tampering:** Replacing inspection photos with older, cleaner photos of the same vehicle model.

**Issuer Types** (First Party)

**Auto Transport Carriers:** (Reliable Carriers, Horseless Carriage).
**Broker Platforms:** (Central Dispatch, ShipCarsNow).
**Inspection Apps:** (SuperDispatch, Car-Arrive).

## Authority Chain

**Pattern:** Regulated

```
✓ motor.directline.co.uk/verify — Underwrites UK motor insurance
  ✓ fca.org.uk/register — Regulates UK general insurance firms
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Where Each Fits: Live Verify and Carrier Dispatch Portals

Vehicle transport companies run their jobs through dispatch platforms and carrier portals, such as Super Dispatch, where drivers record inspections and condition reports. A portal and Live Verify answer different questions and work side by side: the portal runs the operation and holds the job history, while Live Verify gives the customer and their insurer a condition report they can check, fixed as it was at handover.

| | Dispatch platform or carrier portal | Live Verify on the condition report | Paper carbon copy |
| :--- | :--- | :--- | :--- |
| **Who can check** | The transport company and its drivers, with logins. | Anyone handed the report: the customer, their insurer, a dealer. | Nobody; it can only be taken on trust. |
| **What the checker gets** | The full job record, which can be edited later. | Confirmation that the carrier issued this exact report, as at handover. | A copy that may have been altered. |
| **What the customer shares** | Nothing; they rarely have access. | Only the report they chose to send. | The copy. |
| **Reach** | Users of that platform. | Global in principle: any carrier that publishes hashes on its own domain. | Universal, but untrusted. |
| **Speed and cost** | Immediate for users; sharing with outsiders means exporting reports or granting access. | A few seconds per check: one web lookup, with no fee to the standard. | Free and immediate. |
| **What it needs** | A subscription and logins. | The carrier to publish hashes, and Live Verify-aware software on the checker's device. No carrier does this yet. | Nothing. |
| **Best suited to** | Running the transport operation. | Damage disputes and insurance claims after delivery. | Nothing where a claim is likely. |

**Where each fits:** a carrier or dispatch portal is the working system for the transport company and its drivers, and holds the full history of a job. The customer in the driveway, and later their insurer, has no login to it. Live Verify gives them a condition report they can check against the carrier's domain, fixed as it was at handover, with software that honours it, while the portal continues to run the operation.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).

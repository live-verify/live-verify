---
title: "Homeowners Insurance Declarations Page"
category: "Real Estate & Property"
volume: "Large"
retention: "Policy term + 7 years (claims, mortgage audits)"
slug: "homeowners-renters-insurance"
tags: ["adjuster-report", "condo-insurance", "damage-estimate", "dec-page", "dwelling-coverage", "escrow-audit", "fraud-prevention", "hazard-insurance", "homeowners-insurance", "mortgage-compliance", "property-casualty", "property-claim", "real-estate-closing", "renters-insurance", "restoration-audit", "risk-management"]
furtherDerivations: 3
---

## What is a Dec Page?

Your homeowners insurance policy is a dense book, but the **Declarations Page** (or "Dec Page") is the 1-page summary that matters most.

It proves to your bank that your house is protected against fire, wind, and theft. It lists:
1.  **The Limits:** How much the company will pay to rebuild ($450k).
2.  **The Deductible:** How much you pay out of pocket ($1,000).
3.  **The Bank:** Who gets paid first (the Mortgagee).

Fraud happens when owners "edit" the PDF to show a higher limit to satisfy a bank's loan requirements while actually paying for a cheaper, low-limit policy. Verified hashes allow lenders to see the **live coverage status** on the insurer's domain instantly.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="ho-dec">[</span>STATE FARM
Homeowners Policy Declarations                  Policy #: 99-BC-9922-8
═══════════════════════════════════════════════════════════════════

Insured:        JANE A. DOE
                123 Maple Street
                Anytown, USA 12345

Policy Period:  Jan 01, 2026 - Jan 01, 2027
Form:           HO-3 (Special)

COVERAGES & LIMITS
───────────────────────────────────────────────────────────────────
A. Dwelling                                          $ 450,000.00
C. Personal Property                                 $ 225,000.00
L. Personal Liability                                $ 300,000.00
Deductible (All Perils)                              $   1,000.00

Mortgagee: Bank of America, N.A. (ISAOA/ATIMA)
           Loan #88776655

<span data-verify-line="ho-dec">verify:statefarm.com/policy/v</span> <span verifiable-text="end" data-for="ho-dec">]</span></pre>
</div>

## Data Verified

Named insured, property address, dwelling limit (Coverage A), personal property limit (Coverage C), liability limit, deductible amount, policy form (HO-3/HO-5), effective/expiration dates, Mortgagee Clause (Lienholder info), issuing carrier.

**Document Types:**
- **Declarations Page (Dec Page):** The primary 1-2 page summary.
- **Binder:** Temporary proof for new home closings.
- **Evidence of Property Insurance:** Specifically for lenders.
- **Endorsement Schedule:** Listing specific riders (e.g., jewelry/flood).

## Verification Response

The endpoint returns a simple status code:

- **OK** — Premium paid; policy active
- **PENDING_CANCELLATION** — Notice sent for non-payment; do not rely on coverage
- **EXPIRED** — Coverage ended; no renewal found
- **SUPERSEDED** — A revised Dec Page exists (e.g., due to limit increase); request current version
- **404** — Policy not found (never issued, cancelled, or OCR error)

The issuer domain is visible from the `verify:` line on the document itself (e.g., `statefarm.com`).

## Post-Verification Actions

None typically. The verification confirms current status; that's all the verifier needs.

**Why No Further Action:**

- **Lenders/servicers** performing automated audits only need the status code—coverage is active or it isn't
- **Closing agents** need confirmation before funding, not a follow-up workflow
- **Policyholders** already know how to contact their carrier for claims or service

The verifier has the document in hand (that's how they got the hash). If they need carrier contact info, it's on the document itself.

## Second-Party Use

The **Homeowner (Insured)** benefits from verification.

**Escrow Audit Defense:** Proving to a mortgage servicer that the premium amount on the "Dec Page" is the **Verified Correct Amount**. This prevents the servicer from "Shorting" the escrow account or over-charging the homeowner based on an outdated or misread PDF.

**Claim Substantiation:** Proving the exact coverage limits at the time of a loss, ensuring the adjuster can't "Misinterpret" the paper policy to lower a payout.

## Third-Party Use

**Mortgage Lenders / Servicers**
**Force-Placed Insurance Prevention:** Lenders currently spend millions manually calling brokers to verify that a policy hasn't lapsed. Live Verify allows for **automated continuous monitoring**. If a policy is cancelled, the hash status updates instantly, allowing the lender to notify the borrower *before* force-placing expensive insurance.

**Real Estate Closing Agents**
**Clear to Close:** Instantly verifying that the buyer's new policy meets the lender's "Replacement Cost" requirements during the high-pressure 24 hours before a closing.

**Home Service Contractors**
**Liability Check:** Verifying a client's "Personal Liability" limit before performing high-risk work (e.g., large tree removal) on the property.

## Verification Architecture

**The "Mortgage Fraud" Problem**

- **Ghost Policies:** Buying a policy to get the "Dec Page" needed for a loan closing, then immediately cancelling it for a refund.
- **Limit Inflation:** Editing a $250k policy to read $500k to meet a lender's loan-to-value (LTV) requirements.
- **Mortgagee Erasure:** Removing the bank's name from the "Mortgagee Clause" to prevent the bank from receiving a claim check.

**Issuer Types** (First Party)

**Direct Carriers:** (State Farm, Allstate, Geico).
**Agency Networks:** (Hosting verified hashes for local agents).
**Insurtech Platforms:** (Lemonade, Hippo).

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


## Competition vs. Broker Portals

| Feature | Live Verify | Broker Portal | Scanned PDF / Paper |
| :--- | :--- | :--- | :--- |
| **Integrity** | **Cryptographic.** Binds the *Address* to the *Limit*. | **System-Bound.** | **Zero.** Easily forged. |
| **Interoperability** | **Universal.** Works across all carriers. | **Siloed.** Hard to aggregate 50 different logins. | **Universal.** |
| **Freshness** | **Real-time.** Shows if cancelled *today*. | **Laggy.** Often 24-48 hours behind. | **Static.** |
| **Audit-ability** | **High.** Digital trail for regulators. | **Low.** Internal only. | **Manual.** |

**Why Live Verify wins here:** The "Handoff Gap." Insurance is a private contract, but it's a **Public Requirement** for the mortgage industry. Live Verify turns the **Private Policy** into a portable, cryptographically trusted asset that can be safely shared with banks and lawyers without exposing the homeowner's full medical or financial history.


---

_[Content merged from: homeowners-renters-claims]_


## What is a Property Claim?

If your kitchen floods or a tree falls on your roof, you file a **Property Claim** with your insurance company. An adjuster visits and creates a **Repair Estimate**.

This estimate is the "Checkbook" for the repairs. It tells the contractor exactly what the insurance company has agreed to pay for (e.g., "$12,450 for the kitchen").

Fraud is common: dishonest contractors sometimes "edit" the PDF to add $5,000 in non-existent damage to get more money from the insurer. Verified hashes protect the **adjuster's original math**, ensuring that the money goes toward real repairs and not into a scammer's pocket.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="prop-claim">[</span>ALLSTATE INSURANCE
Property Claims Services
REPAIR ESTIMATE & PROOF OF LOSS               Claim #: 99228877-PROP
═══════════════════════════════════════════════════════════════════

Insured:    SARAH J. DOE
Property:   123 Maple St, Anytown, USA

Damage Category                                       Estimated RCV
───────────────────────────────────────────────────────────────────
Dwelling (Water Damage - Kitchen)                      $ 12,450.00
Personal Property (Electronics)                        $  2,100.00
───────────────────────────────────────────────────────────────────
NET CLAIM TOTAL:                                       $ 14,550.00

Adjuster:         Robert Miller (ID #992)
Restoration Firm: ServePro of Anytown (Verified)

<span data-verify-line="prop-claim">verify:allstate.com/claims/v</span> <span verifiable-text="end" data-for="prop-claim">]</span></pre>
</div>

## Data Verified

Insured name, property address, Claim ID, estimated Replacement Cost Value (RCV), Actual Cash Value (ACV), deductible amount, adjuster name/ID, restoration contractor name, date of loss, date of estimate.

**Document Types:**
- **Adjuster's Estimate:** Detailed line-items (Xactimate output).
- **Proof of Loss:** Final signed attestation of damages.
- **Certificate of Completion:** Signed by the owner post-repair.
- **Contents Inventory:** Verified list of destroyed items.

## Verification Response (Claims)

The endpoint returns a simple status code:

- **OK** — Estimate matches the carrier's system; funds authorized
- **SUPERSEDED** — A newer estimate exists; this version is void
- **PAID** — Funds have been issued to the insured/contractor
- **CLOSED** — Claim file completed and liability discharged
- **404** — Claim not found (never filed, or OCR error)

The issuer domain is visible from the `verify:` line on the estimate itself (e.g., `allstate.com`).

## Second-Party Use

The **Homeowner / Renter** benefits from verification.

**Contractor Oversight:** Proving to a restoration company (e.g., ServePro) exactly what the insurance company agreed to pay for (e.g., "Hardwood replacement" vs "Laminate"). Verification prevents "Bait and Switch" where a contractor charges the insurer for high-end materials but installs cheap ones.

**Mortgage Compliance:** Proving to a lender that the insurance funds are being used for verified repairs to protect the bank's collateral.

## Third-Party Use

**Restoration Contractors**
**Payment Assurance:** Before starting a $14,000 kitchen tear-down, the contractor scans the adjuster's estimate. "Verified by Allstate" gives them the confidence that the funds are actually authorized and they won't be left with an unpaid bill.

**Secondary Buyers (Real Estate)**
**CLUE Report Integrity:** A buyer can verify the history of past claims on a house. Live Verify ensures the seller isn't "Hiding" a $50,000 mold claim by providing a fake, low-value repair receipt.

**Special Investigative Units (SIU)**
**Fraud Detection:** Instantly identifying "Estimate Padding" where a dishonest contractor or policyholder edits the PDF to add $5,000 in non-existent damage.

## Verification Architecture

**The "Disaster Padding" Fraud Problem**

- **RCV Inflation:** Editing a $1,200 TV claim to read $12,000 on the contents list.
- **Supplement Forgery:** Creating a fake "Supplement #1" PDF to get extra cash for "Hidden Damage" that doesn't exist.
- **Photo Recycling:** Using photos of a fire from a different house to claim a loss on an insured property.

**Issuer Types** (First Party)

**Primary Insurers:** (Allstate, State Farm, USAA).
**Independent Adjusting Firms:** (e.g., Crawford & Co, Eberl).
**Estimating Software:** (e.g., Xactimate/Verisk - hosting the underlying data hashes).

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

**Public Blockchain (Non-Party)**

Witnessing firms may periodically commit rollups to an inexpensive public blockchain, providing an ultimate immutability guarantee. The blockchain is a "non-party"—infrastructure, not a participant in the transaction. This creates multiple verification paths:

1. **Issuer domain** — Direct check against the issuer
2. **Witnessing firm** — Independent confirmation with timestamp
3. **Public blockchain** — Decentralized trust anchor via rollup inclusion


## Competition vs. CLUE Reports (LexisNexis)

| Feature | Live Verify | CLUE Report (LexisNexis) | Scanned PDF Estimate |
| :--- | :--- | :--- | :--- |
| **Granularity** | **High.** Shows line-item repairs. | **Low.** Often just says "Water Loss - $14k." | **High.** But untrusted. |
| **Speed** | **Real-time.** Available as soon as approved. | **Laggy.** Updates take 30-90 days. | **Instant.** |
| **Trust Anchor** | **Domain-Bound.** Bound to the Insurer. | **Data-Bound.** Trust the aggregator. | **Zero.** Easily forged. |
| **Interoperability** | **Universal.** Works for any contractor. | **Restricted.** Requires expensive data access. | **Universal.** |

**Why Live Verify wins here:** Detail and Immediacy. A CLUE report is a historical summary. But a **Restoration Contractor** needs the specific, verified details of *this* claim *today* to start work. Live Verify turns the **Static Estimate** into a live, trusted clinical link that bridges the gap between the insurer and the construction crew.


---

_[Content merged from: homeowners-renters-insurance]_


## What is Homeowners Insurance?

For most families, their home is their biggest financial asset. **Homeowners Insurance** ensures that if the house burns down, the insurance company will pay to rebuild it.

The **Declarations Page** is the "Proof of Safety." It shows the bank that the loan is protected.

Because these papers are required for every mortgage, "Ghost Policy" fraud is a major problem: people buy a policy to get the paper for the bank closing, then cancel it the next day for a refund. Verified hashes allow lenders to perform **automated annual audits** to ensure the policy is still active today.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="ho-pol">[</span>LIBERTY MUTUAL
Home & Tenant Protection Policy
INSURANCE DECLARATIONS                       Policy #: HO-99228877-26
═══════════════════════════════════════════════════════════════════

Named Insured:  Sarah Jane Smith
Location:       4500 Skyline Blvd, Unit 12A, Austin, TX

Coverage Description                                         Limit
───────────────────────────────────────────────────────────────────
A. Dwelling                                            $ 350,000.00
C. Personal Property                                   $ 175,000.00
L. Personal Liability (Each Occurrence)                $ 500,000.00

Policy Period:  March 01, 2026 to March 01, 2027
Annual Premium: $ 1,242.00

Mortgagee: Wells Fargo Bank, N.A. (ISAOA/ATIMA)
           Loan #99887766

<span data-verify-line="ho-pol">verify:libertymutual.com/policy/v</span> <span verifiable-text="end" data-for="ho-pol">]</span></pre>
</div>

## Data Verified

Named insured, property address, dwelling limit (Cov A), personal property limit (Cov C), liability limit, deductible amount, policy form (HO-3, HO-4, HO-6), effective/expiration dates, Mortgagee/Lienholder name, issuing carrier.

**Document Types:**
- **Declarations Page:** The primary summary for lenders and owners.
- **HO-4 Tenant Policy:** Specifically for renters (no dwelling cover).
- **HO-6 Unit-Owner Policy:** Specifically for condominiums.
- **Evidence of Property Insurance:** Formal proof for bank files.

## Verification Response

The endpoint returns a simple status code:

- **OK** — Premium paid; policy is active
- **PENDING_CANCELLATION** — Notice sent due to non-payment or high risk; do not rely on coverage
- **EXPIRED** — Term ended; no active coverage found
- **SUPERSEDED** — A newer version of the Dec Page exists; request current version
- **404** — Policy not found (never issued, cancelled, or OCR error)

The issuer domain is visible from the `verify:` line on the document itself (e.g., `libertymutual.com`).

## Second-Party Use

The **Homeowner / Renter** benefits from verification.

**Escrow Management:** Proving to a mortgage servicer that the premium on the "Dec Page" is verified authentic. This prevents the servicer from "Over-collecting" for escrow or accidentally triggering "Force-placed" insurance due to a misread PDF.

**Lease Requirements:** Proving to a landlord that the renter's liability insurance meets the $500k requirement of the lease agreement.

## Third-Party Use

**Mortgage Lenders / Servicers**
**Collateral Protection:** Verifying that the $350k dwelling coverage is verified active and that the bank is correctly listed as "Mortgagee." Live Verify allows for **automated annual audits** of thousands of borrower policies without manual data entry.

**Real Estate Closing Agents**
**Clear-to-Close:** Instantly verifying the insurance status of a new homebuyer in the final 24 hours before a closing, ensuring the lender's funding requirements are met.

**Property Managers**
**Liability Tracking:** Ensuring every tenant in a large complex has verified, active insurance to cover damage to the building.

## Verification Architecture

**The "Mortgage Fraud" Problem**

- **Buy and Cancel:** Buying a policy to get the "Dec Page" for a loan closing, then immediately cancelling it for a refund. Verification shows the "Cancelled" status instantly.
- **Limit Inflation:** Editing a $100k policy PDF to read $400k to meet a lender's loan-to-value (LTV) rules.
- **Lienholder Erasure:** Removing the bank's name from the policy to prevent the bank from receiving a payout check after a fire.

**Issuer Types** (First Party)

**National Carriers:** (State Farm, Allstate, Liberty Mutual).
**Direct-to-Consumer Insurtechs:** (Lemonade, Hippo, Kin).
**State Insurance Pools:** (e.g., California FAIR Plan).

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

**Public Blockchain (Non-Party)**

Witnessing firms may periodically commit rollups to an inexpensive public blockchain, providing an ultimate immutability guarantee. The blockchain is a "non-party"—infrastructure, not a participant in the transaction. This creates multiple verification paths:

1. **Issuer domain** — Direct check against the issuer
2. **Witnessing firm** — Independent confirmation with timestamp
3. **Public blockchain** — Decentralized trust anchor via rollup inclusion


## Competition vs. ACORD Data Feeds

| Feature | Live Verify | ACORD Data Pool (IVANS) | Scanned PDF |
| :--- | :--- | :--- | :--- |
| **Integrity** | **Cryptographic.** Binds the *Address* to the *Limit*. | **Data-Only.** Doesn't verify the actual paper doc. | **Zero.** Easily forged. |
| **Interoperability** | **Universal.** Works across all carriers. | **Limited.** Only for agencies on the IVANS network. | **Universal.** |
| **Freshness** | **Real-time.** Shows if cancelled *today*. | **Laggy.** Often 24-48 hours behind. | **Static.** |
| **User Control** | **High.** Homeowner shares only what is needed. | **Low.** Lenders see the full data stream. | **High.** |

**Why Live Verify wins here:** The "Closing Table" reality. In a real estate deal, trust must move between a Buyer, a Seller, a Bank, and a Title Co. They don't all share the same API. Live Verify turns the **Paper Document** into a portable, cryptographically trusted link that bridges the gap between the insurer and the closing table.
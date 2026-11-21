---
title: "Homeowners Insurance Declarations Page"
category: "Real Estate & Property"
volume: "Large"
retention: "Policy term + 7 years (claims, mortgage audits)"
slug: "homeowners-renters-insurance"
verificationMode: "clip"
tags: ["adjuster-report", "condo-insurance", "damage-estimate", "dec-page", "dwelling-coverage", "escrow-audit", "fraud-prevention", "hazard-insurance", "homeowners-insurance", "mortgage-compliance", "property-casualty", "property-claim", "real-estate-closing", "renters-insurance", "restoration-audit", "risk-management"]
furtherDerivations: 3
---

## What is a Dec Page?

Your homeowners insurance policy is a dense book, but the Declarations Page (or "Dec Page") is the 1-page summary that matters most.

It proves to your bank that your house is protected against fire, wind, and theft. It lists:
1.  **The Limits:** How much the company will pay to rebuild ($450k).
2.  **The Deductible:** How much you pay out of pocket ($1,000).
3.  **The Bank:** Who gets paid first (the Mortgagee).

Fraud happens when owners "edit" the PDF to show a higher limit to satisfy a bank's loan requirements while actually paying for a cheaper, low-limit policy. Verified hashes allow lenders to see the live coverage status on the insurer's domain instantly.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="ho-dec"></span>STATE FARM
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

<span data-verify-line="ho-dec">verify:statefarm.com/policy/v</span> <span verifiable-text="end" data-for="ho-dec"></span></pre>
</div>

## The Problem: Mortgage Fraud

- **Ghost Policies:** Buying a policy to get the "Dec Page" needed for a loan closing, then immediately cancelling it for a refund.
- **Limit Inflation:** Editing a $250k policy to read $500k to meet a lender's loan-to-value (LTV) requirements.
- **Mortgagee Erasure:** Removing the bank's name from the "Mortgagee Clause" to prevent the bank from receiving a claim check.

## What Is Checked

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

## Who Holds It

The Homeowner (Insured) benefits from verification.

**Escrow Audit Defense:** Proving to a mortgage servicer that the premium amount on the "Dec Page" is the Verified Correct Amount. This prevents the servicer from "Shorting" the escrow account or over-charging the homeowner based on an outdated or misread PDF.

**Claim Substantiation:** Proving the exact coverage limits at the time of a loss, ensuring the adjuster can't "Misinterpret" the paper policy to lower a payout.

## Who Checks It

**Mortgage Lenders / Servicers**
**Force-Placed Insurance Prevention:** Lenders currently spend millions manually calling brokers to verify that a policy hasn't lapsed. Live Verify allows for automated continuous monitoring. If a policy is cancelled, the hash status updates instantly, allowing the lender to notify the borrower *before* force-placing expensive insurance.

**Real Estate Closing Agents**
**Clear to Close:** Instantly verifying that the buyer's new policy meets the lender's "Replacement Cost" requirements during the high-pressure 24 hours before a closing.

**Home Service Contractors**
**Liability Check:** Verifying a client's "Personal Liability" limit before performing high-risk work (e.g., large tree removal) on the property.

## Who Issues It

**Issuer Types** (First Party)

**Direct Carriers:** (State Farm, Allstate, Geico).
**Agency Networks:** (Hosting verified hashes for local agents).
**Insurtech Platforms:** (Lemonade, Hippo).

## Compared With Broker Portals

| Feature | Live Verify | Broker Portal | Scanned PDF / Paper |
| :--- | :--- | :--- | :--- |
| **Integrity** | **Cryptographic.** Binds the *Address* to the *Limit*. | **System-Bound.** | **Zero.** Easily forged. |
| **Interoperability** | **Universal.** Works across all carriers. | **Siloed.** Hard to aggregate 50 different logins. | **Universal.** |
| **Freshness** | **Real-time.** Shows if cancelled *today*. | **Laggy.** Often 24-48 hours behind. | **Static.** |
| **Audit-ability** | **High.** Digital trail for regulators. | **Low.** Internal only. | **Manual.** |

**Where each fits:** A broker or carrier portal is the right place for the policyholder and agent to manage cover, and a lender with a direct feed from the carrier will rely on that. Landlords, property managers, lawyers and smaller lenders deal with many insurers and have logins with none. Live Verify lets them confirm that the insurer stands behind the declarations page they were given, and the portal continues to serve the people who hold accounts.

---

_[Content merged from: homeowners-renters-claims]_

## What is a Property Claim?

If your kitchen floods or a tree falls on your roof, you file a Property Claim with your insurance company. An adjuster visits and creates a Repair Estimate.

This estimate is the "Checkbook" for the repairs. It tells the contractor exactly what the insurance company has agreed to pay for (e.g., "$12,450 for the kitchen").

Fraud is common: dishonest contractors sometimes "edit" the PDF to add $5,000 in non-existent damage to get more money from the insurer. Verified hashes protect the adjuster's original math, ensuring that the money goes toward real repairs and not into a scammer's pocket.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="prop-claim"></span>ALLSTATE INSURANCE
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

<span data-verify-line="prop-claim">verify:allstate.com/claims/v</span> <span verifiable-text="end" data-for="prop-claim"></span></pre>
</div>

## What Is Checked

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

## Who Holds It

The Homeowner / Renter benefits from verification.

**Contractor Oversight:** Proving to a restoration company (e.g., ServePro) exactly what the insurance company agreed to pay for (e.g., "Hardwood replacement" vs "Laminate"). Verification prevents "Bait and Switch" where a contractor charges the insurer for high-end materials but installs cheap ones.

**Mortgage Compliance:** Proving to a lender that the insurance funds are being used for verified repairs to protect the bank's collateral.

## Who Checks It

**Restoration Contractors**
**Payment Assurance:** Before starting a $14,000 kitchen tear-down, the contractor scans the adjuster's estimate. "Verified by Allstate" gives them the confidence that the funds are actually authorized and they won't be left with an unpaid bill.

**Secondary Buyers (Real Estate)**
**CLUE Report Integrity:** A buyer can verify the history of past claims on a house. Live Verify ensures the seller isn't "Hiding" a $50,000 mold claim by providing a fake, low-value repair receipt.

**Special Investigative Units (SIU)**
**Fraud Detection:** Instantly identifying "Estimate Padding" where a dishonest contractor or policyholder edits the PDF to add $5,000 in non-existent damage.

## How Verification Works Here

**The "Disaster Padding" Fraud Problem**

- **RCV Inflation:** Editing a $1,200 TV claim to read $12,000 on the contents list.
- **Supplement Forgery:** Creating a fake "Supplement #1" PDF to get extra cash for "Hidden Damage" that doesn't exist.
- **Photo Recycling:** Using photos of a fire from a different house to claim a loss on an insured property.

**Issuer Types** (First Party)

**Primary Insurers:** (Allstate, State Farm, USAA).
**Independent Adjusting Firms:** (e.g., Crawford & Co, Eberl).
**Estimating Software:** (e.g., Xactimate/Verisk - hosting the underlying data hashes).

## Compared With CLUE Reports (LexisNexis)

| Feature | Live Verify | CLUE Report (LexisNexis) | Scanned PDF Estimate |
| :--- | :--- | :--- | :--- |
| **Granularity** | **High.** Shows line-item repairs. | **Low.** Often just says "Water Loss - $14k." | **High.** But untrusted. |
| **Speed** | **Real-time.** Available as soon as approved. | **Laggy.** Updates take 30-90 days. | **Instant.** |
| **Trust Anchor** | **Domain-Bound.** Bound to the Insurer. | **Data-Bound.** Trust the aggregator. | **Zero.** Easily forged. |
| **Interoperability** | **Universal.** Works for any contractor. | **Restricted.** Requires expensive data access. | **Universal.** |

**Where each fits:** CLUE reports give underwriters a multi-year loss history across insurers, which a single document cannot provide, and they will remain part of underwriting. They summarise claims and take time to update. A restoration contractor, public adjuster or buyer who needs the approved scope of one claim can use Live Verify to confirm that the insurer issued the estimate as written. The loss-history database and the verified estimate answer different questions.

---

_[Content merged from: homeowners-renters-insurance]_

## What is Homeowners Insurance?

For most families, their home is their biggest financial asset. Homeowners Insurance ensures that if the house burns down, the insurance company will pay to rebuild it.

The Declarations Page is the "Proof of Safety." It shows the bank that the loan is protected.

Because these papers are required for every mortgage, "Ghost Policy" fraud is a major problem: people buy a policy to get the paper for the bank closing, then cancel it the next day for a refund. Verified hashes allow lenders to perform automated annual audits to ensure the policy is still active today.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="ho-pol"></span>LIBERTY MUTUAL
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

<span data-verify-line="ho-pol">verify:libertymutual.com/policy/v</span> <span verifiable-text="end" data-for="ho-pol"></span></pre>
</div>

## What Is Checked

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

## Who Holds It

The Homeowner / Renter benefits from verification.

**Escrow Management:** Proving to a mortgage servicer that the premium on the "Dec Page" is verified authentic. This prevents the servicer from "Over-collecting" for escrow or accidentally triggering "Force-placed" insurance due to a misread PDF.

**Lease Requirements:** Proving to a landlord that the renter's liability insurance meets the $500k requirement of the lease agreement.

## Who Checks It

**Mortgage Lenders / Servicers**
**Collateral Protection:** Verifying that the $350k dwelling coverage is verified active and that the bank is correctly listed as "Mortgagee." Live Verify allows for automated annual audits of thousands of borrower policies without manual data entry.

**Real Estate Closing Agents**
**Clear-to-Close:** Instantly verifying the insurance status of a new homebuyer in the final 24 hours before a closing, ensuring the lender's funding requirements are met.

**Property Managers**
**Liability Tracking:** Ensuring every tenant in a large complex has verified, active insurance to cover damage to the building.

## How Verification Works Here

**The "Mortgage Fraud" Problem**

- **Buy and Cancel:** Buying a policy to get the "Dec Page" for a loan closing, then immediately cancelling it for a refund. Verification shows the "Cancelled" status instantly.
- **Limit Inflation:** Editing a $100k policy PDF to read $400k to meet a lender's loan-to-value (LTV) rules.
- **Lienholder Erasure:** Removing the bank's name from the policy to prevent the bank from receiving a payout check after a fire.

**Issuer Types** (First Party)

**National Carriers:** (State Farm, Allstate, Liberty Mutual).
**Direct-to-Consumer Insurtechs:** (Lemonade, Hippo, Kin).
**State Insurance Pools:** (e.g., California FAIR Plan).

## Authority Chain

**Pattern:** Regulated

Aviva, a regulated home and contents insurer, is authorized by the FCA to issue verified homeowners and renters insurance policies.

```
✓ policy.aviva.co.uk/home/verify — Issues verified homeowners and renters insurance policies
  ✓ fca.org.uk/register — Regulates UK general insurance firms
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Compared With ACORD Data Feeds

| Feature | Live Verify | ACORD Data Pool (IVANS) | Scanned PDF |
| :--- | :--- | :--- | :--- |
| **Integrity** | **Cryptographic.** Binds the *Address* to the *Limit*. | **Data-Only.** Doesn't verify the actual paper doc. | **Zero.** Easily forged. |
| **Interoperability** | **Universal.** Works across all carriers. | **Limited.** Only for agencies on the IVANS network. | **Universal.** |
| **Freshness** | **Real-time.** Shows if cancelled *today*. | **Laggy.** Often 24-48 hours behind. | **Static.** |
| **User Control** | **High.** Homeowner shares only what is needed. | **Low.** Lenders see the full data stream. | **High.** |

**Where each fits:** Where agency and lender are both on a network such as IVANS, policy data moves automatically, and that is the efficient path. A closing brings together a buyer, a seller, a title company and sometimes a private lender, not all of whom are connected. Live Verify lets any of them confirm the evidence-of-insurance page against the insurer's own domain, with the industry data exchange carrying on as before.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).

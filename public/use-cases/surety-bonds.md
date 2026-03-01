---
title: "Surety Bonds and Performance Guarantees"
category: "Bonds & Sureties"
volume: "Small"
retention: "Bond term plus 10 years (claims, disputes)"
slug: "surety-bonds"
tags: ["surety", "bonds", "performance-bond", "payment-bond", "bid-bond", "contract-compliance", "construction-risk"]
furtherDerivations: 1
---

## What is a Surety Bond?

A **Surety Bond** is a three-party agreement that provides a financial guarantee that a contract will be completed. Unlike insurance (which protects the policyholder), a bond protects the **Obligee** (the project owner) from the failure of the **Principal** (the contractor).

It is the "Lifeblood of Public Works." If a contractor goes bankrupt halfway through building a bridge, the **Surety Company** must either hire a new contractor to finish the job or pay the city the "Penal Sum" of the bond.

**"Phantom Sureties"** are a major infrastructure risk. Fraudsters issue fake bonds using the names of real insurance companies (like Travelers or Liberty Mutual) but with fake phone numbers and addresses. They collect the bond premium and disappear. Verified hashes bind the **Bond Number, the Penal Sum, and the specific Project Name** to the surety carrier's domain.

<div style="max-width: 600px; margin: 24px auto; font-family: 'Times New Roman', Georgia, serif; border: 1px solid #333; background: #fff; padding: 40px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
  <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 30px;">
    <div style="font-weight: bold; font-size: 1.2em; color: #b71c1c;"><span verifiable-text="start" data-for="surety">[</span>THE TRAVELERS COMPANIES</div>
    <div style="text-align: right; font-size: 0.85em; color: #666;">
      Bond No: TR-99228877-B1<br>
      March 15, 2026
    </div>
  </div>
<h2 style="text-align: center; font-size: 1.4em; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 30px;">Performance and Payment Bond</h2>
<div style="font-size: 1em; line-height: 1.6; color: #000; text-align: justify;">
    <p>KNOW ALL MEN BY THESE PRESENTS, that <strong>SKYLINE BUILDERS GROUP, LLC</strong> (the "Principal") and <strong>TRAVELERS CASUALTY AND SURETY COMPANY</strong> (the "Surety") are held and firmly bound unto the <strong>CITY OF AUSTIN</strong> (the "Obligee") in the sum of:</p>
<div style="margin: 20px auto; width: 90%; border: 2px solid #000; padding: 15px; text-align: center; background: #f9f9f9; font-weight: bold; font-size: 1.1em;">
      TEN MILLION FIVE HUNDRED THOUSAND DOLLARS ($10,500,000.00)
    </div>
<p>For the payment of which sum, the Principal and Surety bind themselves, their heirs, executors, and successors, for the faithful performance of the <strong>Public Works Contract #2026-BLK-99</strong> (The Skyline Tunnel Project).</p>
  </div>
<div style="margin-top: 40px; display: flex; justify-content: space-between; align-items: flex-end;">
    <div style="width: 45%;">
      <div style="border-top: 1px solid #000; padding-top: 5px; font-size: 0.8em; font-style: italic;">Principal Signature</div>
    </div>
    <div style="text-align: right; width: 45%;">
      <div style="width: 80px; height: 80px; border: 2px solid #b71c1c; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.6em; color: #b71c1c; font-weight: bold; text-align: center; margin-left: auto; transform: rotate(-10deg);">SURETY<br>CORPORATE<br>SEAL</div>
    </div>
  </div>
<div data-verify-line="surety" style="border-top: 1px dashed #999; margin-top: 40px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
      title="Demo only: Travelers doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:travelers.com/surety/v <span verifiable-text="end" data-for="surety">]</span>
  </div>
</div>

## Data Verified

Principal (Contractor) name, Obligee (Owner) name, Surety Company name, Bond Number, Penal Sum (numerical and text), Project Name/Contract Number, Effective Date, Expiration/Maintenance Term, Agent name/ID.

**Document Types:**
- **Bid Bond:** Guaranteeing the contractor will sign the deal if they win.
- **Performance Bond:** Guaranteeing the work will be finished.
- **Payment Bond:** Guaranteeing sub-contractors and suppliers get paid.
- **Maintenance Bond:** Protecting against defects after completion.

## Data Visible After Verification

Shows the issuer domain (the National Surety Carrier) and the current bond status.

**Status Indications:**
- **Active/Open** — Bond is in force and fully covers the project.
- **Released/Closed** — Project finished; surety's liability has ended.
- **Claim Filed** — **ALERT:** An obligee or supplier has filed a formal claim against this bond.
- **Exhausted** — The full penal sum has already been paid out.

## Second-Party Use

The **Contractor (Principal)** benefits from verification.

**Public Bidding:** Proving to a government agency during a "Blind Bid Opening" that their Bid Bond is verified and authentic. This prevents the contractor from being disqualified due to "Paperwork Uncertainty," which is a common cause of lost government contracts.

**Supplier Trust:** Showing verified Payment Bonds to large suppliers (e.g., steel or concrete mills) to secure $1M+ in credit for project materials.

## Third-Party Use

**Government Procurement Officers**
**Bid Integrity:** Instantly verifying 50 different bid bonds during a high-speed public auction. Live Verify connects the officer directly to the surety's domain, stopping "Fake Bond" bid rigging.

**Sub-Contractors and Suppliers**
**Payment Security:** Before starting work on a site, a sub-contractor scans the "Payment Bond" posted in the job trailer. "Verified by Travelers.com" ensures they have a high-authority safety net if the general contractor fails to pay.

**Construction Lenders**
**Risk Management:** Verifying that the bonds required by the loan agreement are actually in place and haven't been "edited" to show a higher penal sum.

## Verification Architecture

**The "Ghost Bond" Fraud Problem**

- **Penal Sum Inflation:** Editing a $1M bond to read $10M to qualify for a larger infrastructure project.
- **Phantom Carriers:** Creating a fake bond on the letterhead of a "Shell Company" that has no assets to pay a claim.
- **Expired Bonds:** Presenting an old bond from a completed project as "Active" for a new, un-bonded project.

**Issuer Types** (First Party)

**National Surety Carriers:** (Travelers, Liberty Mutual, CNA, Zurich).
**Treasury-Listed Sureties:** (Meeting Circular 570 requirements).
**Bond Execution Platforms:** (e.g., SurePath, Bond-Verify).

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


## Competition vs. Corporate Seals (Gold Foil)

| Feature | Live Verify | Gold Foil Seal | Power of Attorney (POA) Paper |
| :--- | :--- | :--- | :--- |
| **Trust Anchor** | **Domain-Bound.** Bound to the Carrier. | **Physical.** Trust the sticker. | **Signature-Bound.** |
| **Integrity** | **Binds Penal Sum.** Protects the amount. | **Zero.** Doesn't protect the text. | **Vulnerable.** |
| **Freshness** | **Real-time.** Shows "Claim" status. | **Zero.** Paper is static. | **Static.** |
| **Speed** | **Instant.** 5-second scan. | **N/A.** | **Slow.** Requires reading 5 pages. |

**Why Live Verify wins here:** The "Bid Clock" reality. Government bids are often decided in minutes. There is no time to call a surety agent in another time zone to verify a signature. Live Verify turns the **Bond Face-Page** into a live digital portal, making "Financial Assurance" a transparent fact at the moment of award.
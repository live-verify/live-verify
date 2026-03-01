---
title: "Builder Warranties (New Construction)"
category: "Real Estate & Property"
volume: "Very Small"
retention: "10-20 years (warranty period)"
slug: "builder-warranties"
tags: ["real-estate", "home-warranty", "new-construction", "structural-warranty", "builder", "homeowner"]
furtherDerivations: 1
---

## What is a Builder Warranty?

When you buy a brand-new home, the builder provides a **Structural Warranty** (often called a 2-10 warranty). It is a legal promise that:
1.  **Year 1:** The craftsmanship is good.
2.  **Year 2:** The pipes and wires won't fail.
3.  **Year 10:** The foundation won't crack or collapse.

This warranty is a valuable financial asset that stays with the house for 10 years, even if you sell it. Verified warranties ensure that builders (or sellers) aren't lying about coverage to close a deal on a poorly built house.

<div style="max-width: 600px; margin: 24px auto; font-family: 'Times New Roman', Georgia, serif; border: 4px solid #1a365d; background: #fff; padding: 40px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
  <div style="text-align: center; border-bottom: 2px solid #1a365d; padding-bottom: 20px; margin-bottom: 25px;">
    <div style="font-weight: bold; font-size: 1.4em; letter-spacing: 2px; color: #1a365d;"><span verifiable-text="start" data-for="warranty">[</span>2-10 HOME BUYERS WARRANTY</div>
    <div style="font-size: 0.85em; color: #666; margin-top: 5px;">THE NATION'S LEADING STRUCTURAL WARRANTY</div>
  </div>
<h3 style="text-align: center; text-transform: uppercase; margin-bottom: 20px; color: #1a365d;">Certificate of Warranty Coverage</h3>
<div style="font-size: 0.95em; line-height: 1.6; color: #333;">
    <p>This certifies that the property located at:</p>
    <p style="text-align: center; font-size: 1.1em; font-weight: bold;">
      123 NEW HOUSE LANE, AUSTIN, TX 78701
    </p>
<div style="margin: 20px 0; border: 1px solid #ccc; padding: 15px; background: #f9f9f9;">
      <p><strong>Builder:</strong> Toll Brothers, Inc. (Reg #9922)<br>
      <strong>Warranty Number:</strong> 210-998877-TX</p>
<p><strong>Coverage Periods:</strong><br>
      1-Year: Workmanship & Materials<br>
      2-Year: Systems (Plumbing, Electrical, HVAC)<br>
      10-Year: Structural Elements</p>
    </div>
<p><strong>Warranty Effective Date:</strong> March 15, 2026</p>
  </div>
<div style="margin-top: 40px; display: flex; justify-content: space-between; align-items: flex-end;">
    <div>
      <div style="width: 80px; height: 80px; border: 2px solid #1a365d; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.6em; color: #1a365d; font-weight: bold; text-align: center;">OFFICIAL<br>COVERAGE<br>SEAL</div>
    </div>
    <div style="text-align: right; font-size: 0.8em; color: #777;">
      Administered by HBW Services, LLC
    </div>
  </div>
<div data-verify-line="warranty" style="border-top: 1px dashed #999; margin-top: 40px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
      title="Demo only: 2-10 HBW doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:2-10.com/warranty/v <span verifiable-text="end" data-for="warranty">]</span>
  </div>
</div>

## Data Verified

Property address, homeowner name (initial), builder name/registration, warranty certificate number, coverage types (Workmanship/Systems/Structural), effective date, expiration date, issuing warranty company.

**Document Types:**
- **Certificate of Warranty:** The main proof of coverage.
- **Maintenance Log:** Proving mandatory homeowner maintenance was performed (linked hash).
- **Claim Approval Notice:** Confirming a structural fix is authorized.

## Data Visible After Verification

Shows the issuer domain (`2-10.com`, `tollbrothers.com`) and current warranty standing.

**Status Indications:**
- **Active** — Property is currently under warranty.
- **Transferred** — Warranty has been moved to a second owner (Resale).
- **Expired** — Coverage period has ended.
- **In-Litigation** — Warranty disputed in court.

## Second-Party Use

The **Homeowner** benefits from verification.

**Resale Value:** When selling a 5-year-old home, the owner can provide a "Verified Structural Warranty" to the buyer. This proves that the remaining 5 years of the 10-year structural coverage is legitimate and transferable, increasing the home's value.

**Contractor Disputes:** If a pipe bursts in year 2, the homeowner can verify their "Systems Coverage" before calling a plumber, ensuring the builder is held responsible for the cost.

## Third-Party Use

**Prospective Home Buyers**
**Due Diligence:** Before signing a contract on a resale home, the buyer can scan the warranty certificate provided by the seller. Verification ensures the builder didn't quietly cancel the warranty due to a prior dispute or non-payment.

**Real Estate Agents**
**Listing Accuracy:** Ensuring that the "Warranty Included" claim in the MLS listing is backed by a verified cryptographic proof.

**Mortgage Lenders**
**Risk Management:** Lenders for new construction often require proof of a 10-year structural warranty before funding. Verification provides the "Final Truth" needed for the closing package.

## Verification Architecture

**The "Ghost Warranty" Fraud Problem**

- **Builder Insolvency:** A builder who has gone bankrupt might still provide unbacked "Warranty" papers to close a sale. Verification shows the warranty isn't active in the insurer's database.
- **Term Alteration:** Editing a "1-year" warranty PDF to read "10-years" to hide structural defects from a buyer.
- **Address Swapping:** Taking a valid warranty for a high-quality build and editing the address to cover a poor-quality "flip" house.

**Issuer Types** (First Party)

**Warranty Administrators:** (2-10 Home Buyers Warranty, Residential Warranty Company).
**National Builders:** (Toll Brothers, Lennar, D.R. Horton).
**Insurance Carriers:** (Who backstop the builder's promises).

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


## Competition vs. Home Inspection Reports

| Feature | Live Verify | Home Inspection (Visual) | Builder Website Portal |
| :--- | :--- | :--- | :--- |
| **Integrity** | **Cryptographic.** Binds the *Legal Promise*. | **Subjective.** Relies on what the inspector can *see*. | **Hard.** Requires login/password. |
| **Duration** | **10-20 Years.** Matches the legal statute. | **Snapshot.** Only valid for the day of inspection. | **Ephemeral.** Portals change. |
| **Transfer** | **Easy.** Proves transferability to next owner. | **N/A.** | **Hard.** New owner has no login. |

**Why Live Verify wins here:** Persistence. A builder warranty is a "Long-Tail" financial asset. The person who needs to verify it in year 9 (the second owner) is almost never the person who received it in year 1. Live Verify turns the persistent piece of paper in the "Homeowner's Binder" into a real-time link to the insurer, regardless of who currently owns the house.

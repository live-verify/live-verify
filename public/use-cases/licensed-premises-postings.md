---
title: "Licensed Premises Postings"
category: "Professional & Occupational Licenses"
type: "use-case"
slug: "licensed-premises-postings"
beneficiary: "Customers/Regulators"
tags: ["alcohol-license", "liquor-license", "occupancy", "operating-hours", "compliance", "public-safety"]
furtherDerivations: 1
---

## What are Licensed Premises Postings?

Bars, nightclubs, and liquor stores operate under strict "Permission to Exist" documents. From the **Liquor License** behind the bar to the **Maximum Occupancy Certificate** by the door, these documents define the legal boundaries of the business: what they can sell, who they can serve, and how many people can be inside.

The problem is that these papers are static, but the law is dynamic. A bar may have its license suspended for serving minors, but the owner will leave the "Valid" physical card on the wall to trick the public and patrol officers. Similarly, shady owners often "Photoshop" their occupancy limit from 50 to 150 to host dangerous, over-crowded parties.

Live Verify allows a patron, neighbor, or police officer to scan the posting to verify: **"Is this establishment currently authorized to operate, and are they adhering to their legal capacity and hours?"**

<div style="max-width: 500px; margin: 24px auto; font-family: 'Times New Roman', serif; border: 4px double #333; background: #fff; padding: 30px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); position: relative;">
  <div style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 15px; margin-bottom: 20px;">
    <div style="font-weight: bold; font-size: 1.2em; text-transform: uppercase;"><span verifiable-text="start" data-for="liquor">[</span>State of California</div>
    <div style="font-size: 1em; letter-spacing: 1px;">DEPARTMENT OF ALCOHOLIC BEVERAGE CONTROL</div>
  </div>
<div style="font-size: 0.9em; line-height: 1.6;">
    <p><strong>License Number:</strong> 42-992288 (Type 47)<br>
    <strong>Primary Owner:</strong> SUNSET HOSPITALITY GROUP LLC<br>
    <strong>DBA:</strong> THE NEON LOUNGE</p>
<div style="margin: 15px 0; padding: 15px; border: 1px solid #ccc; background: #f9f9f9; text-align: center;">
      <div style="font-weight: bold; text-decoration: underline; margin-bottom: 5px;">ON-SALE GENERAL</div>
      EATING PLACE (FULL SPIRITS / BEER / WINE)
    </div>
<p><strong>Premises Address:</strong> 123 SUNSET BLVD, LOS ANGELES, CA<br>
    <strong>Conditions:</strong> No amplified music after 11 PM. No service after 2 AM.</p>
<p><strong>Expires:</strong> MARCH 15, 2027</p>
  </div>
<div style="margin-top: 30px; display: flex; justify-content: space-between; align-items: flex-end;">
    <div style="width: 100px; height: 100px; border: 2px solid #000; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.6em; font-weight: bold; text-align: center; opacity: 0.5;">OFFICIAL<br>STATE SEAL</div>
    <div data-verify-line="liquor" style="flex-grow: 1; margin-left: 20px; border-top: 1px dashed #999; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
        title="Demo only: ABC Boards don't yet offer verification&#10;endpoints, so this is illustrative">
        verify:abc.ca.gov/v <span verifiable-text="end" data-for="liquor">]</span>
    </div>
  </div>
</div>

## Data Verified

License number, license type (e.g., Type 47 - Restaurant), business name, DBA name, premises address, expiration date, specific operating conditions (curfews, sound limits), maximum occupancy count, primary owner name.

**Document Types:**
- **Liquor License Card:** Posted behind the bar.
- **Certificate of Occupancy:** Posted by the main entrance.
- **Sidewalk Café Permit:** Posted in the window for outdoor seating.
- **Public Assembly Permit:** For large nightclubs and event spaces.

## Data Visible After Verification

Shows the issuer domain (`abc.ca.gov`, `nysla.ny.gov`) and the real-time status.

**Status Indications:**
- **Active** — License is valid and in good standing.
- **Suspended** — **CRITICAL:** Alcohol sales are currently prohibited due to a violation.
- **Revoked** — Establishment is no longer authorized to serve.
- **Over-Capacity Alert** — (If linked to counters) Current occupancy exceeds legal limit.

## Second-Party Use

The **Business Owner / Licensee** benefits from verification.

**Regulatory Compliance:** By displaying a "Verified" hash, the owner can prove to visiting inspectors that they are paying their fees and following their "Conditions of Approval" (e.g., noise curfews), reducing the frequency of "Shakedown" audits.

**Landlord Assurance:** Providing verified proof of an active liquor license to a commercial landlord, which is often a mandatory requirement of the lease agreement to prevent "Unlawful Detainer" actions.

## Third-Party Use

**Neighbors / Community**
**Nuisance Control:** A neighbor bothered by loud music at 1 AM scans the window license. If it returns **"CONDITION: NO AMPLIFIED SOUND AFTER 11 PM,"** they have verified evidence to file a formal complaint with the city.

**Patrons / Public**
**Safety Check:** Before entering a crowded basement club, a patron scans the occupancy card. If it returns **"MAX OCCUPANCY: 50"** but they see 200 people inside, they can choose to leave and report a fire hazard.

**Police / Patrol Officers**
**Rapid Enforcement:** During a late-night walkthrough, an officer can scan the license. If the hash returns **"SUSPENDED - SALES PROHIBITED,"** they can immediately issue a citation without needing to call dispatch to check the database.

## Verification Architecture

**The "Fake Frame" Fraud Problem**

- **Hours Tampering:** Editing a "12:00 AM" closing time to "02:00 AM" on the paper to trick local police.
- **Occupancy Inflation:** Changing a "99 Person" limit to "199" to bypass the need for expensive fire-sprinkler upgrades.
- **License Renting:** An unlicensed operator using a retired owner's physical paper license; verification reveals the entity name doesn't match the current management.

**Issuer Types** (First Party)

**State Alcoholic Beverage Control (ABC) Boards.**
**Municipal Fire Departments (Occupancy).**
**City Planning Departments (Land Use).**

**Privacy Salt:** Low. These licenses are typically public information. However, the hashes should be salted to prevent competitors from scraping the entire city's licensing schedule.

## Rationale

Licensed premises are the "Living Room" of the city. By turning static placards into live digital bridges, we create a safer, more transparent environment for patrons, neighbors, and regulators alike.

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

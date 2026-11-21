---
title: "Licensed Premises Postings"
category: "Professional & Occupational Licenses"
type: "use-case"
slug: "licensed-premises-postings"
beneficiary: "Customers/Regulators"
verificationMode: "camera"
tags: ["alcohol-license", "liquor-license", "occupancy", "operating-hours", "compliance", "public-safety"]
furtherDerivations: 1
---

## What are Licensed Premises Postings?

Bars, nightclubs, and liquor stores operate under strict "Permission to Exist" documents. From the Liquor License behind the bar to the Maximum Occupancy Certificate by the door, these documents define the legal boundaries of the business: what they can sell, who they can serve, and how many people can be inside.

The problem is that these papers are static, but the law is dynamic. A bar may have its license suspended for serving minors, but the owner will leave the "Valid" physical card on the wall to trick the public and patrol officers. Similarly, shady owners often "Photoshop" their occupancy limit from 50 to 150 to host dangerous, over-crowded parties.

Live Verify allows a patron, neighbor, or police officer to scan the posting to verify: **"Is this establishment currently authorized to operate, and are they adhering to their legal capacity and hours?"**

<div style="max-width: 500px; margin: 24px auto; font-family: 'Times New Roman', serif; border: 4px double #333; background: #fff; padding: 30px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); position: relative;">
  <div style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 15px; margin-bottom: 20px;">
    <div style="font-weight: bold; font-size: 1.2em; text-transform: uppercase;"><span verifiable-text="start" data-for="liquor"></span>State of California</div>
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
        <span data-verify-line="liquor">verify:abc.ca.gov/v</span> <span verifiable-text="end" data-for="liquor"></span>
    </div>
  </div>
</div>

## The Problem: Fake Frame Fraud

- **Hours Tampering:** Editing a "12:00 AM" closing time to "02:00 AM" on the paper to trick local police.
- **Occupancy Inflation:** Changing a "99 Person" limit to "199" to bypass the need for expensive fire-sprinkler upgrades.
- **License Renting:** An unlicensed operator using a retired owner's physical paper license; verification reveals the entity name doesn't match the current management.

## What Is Checked

License number, license type (e.g., Type 47 - Restaurant), business name, DBA name, premises address, expiration date, specific operating conditions (curfews, sound limits), maximum occupancy count, primary owner name.

**Document Types:**
- **Liquor License Card:** Posted behind the bar.
- **Certificate of Occupancy:** Posted by the main entrance.
- **Sidewalk Café Permit:** Posted in the window for outdoor seating.
- **Public Assembly Permit:** For large nightclubs and event spaces.

## What the Checker Sees

Shows the issuer domain (`abc.ca.gov`, `nysla.ny.gov`) and the real-time status.

**Status Indications:**
- **Active** — License is valid and in good standing.
- **Suspended** — Alcohol sales are currently prohibited due to a violation.
- **Revoked** — Establishment is no longer authorized to serve.
- **Over-Capacity Alert** — (If linked to counters) Current occupancy exceeds legal limit.

## Who Holds It

The Business Owner / Licensee benefits from verification.

**Regulatory Compliance:** By displaying a "Verified" hash, the owner can prove to visiting inspectors that they are paying their fees and following their "Conditions of Approval" (e.g., noise curfews), reducing the frequency of "Shakedown" audits.

**Landlord Assurance:** Providing verified proof of an active liquor license to a commercial landlord, which is often a mandatory requirement of the lease agreement to prevent "Unlawful Detainer" actions.

## Who Checks It

**Neighbors / Community**
**Nuisance Control:** A neighbor bothered by loud music at 1 AM scans the window license. If it returns "CONDITION: NO AMPLIFIED SOUND AFTER 11 PM," they have verified evidence to file a formal complaint with the city.

**Patrons / Public**
**Safety Check:** Before entering a crowded basement club, a patron scans the occupancy card. If it returns "MAX OCCUPANCY: 50" but they see 200 people inside, they can choose to leave and report a fire hazard.

**Police / Patrol Officers**
**Rapid Enforcement:** During a late-night walkthrough, an officer can scan the license. If the hash returns "SUSPENDED - SALES PROHIBITED," they can immediately issue a citation without needing to call dispatch to check the database.

## Who Issues It

**Issuer Types** (First Party)

**State Alcoholic Beverage Control (ABC) Boards.**
**Municipal Fire Departments (Occupancy).**
**City Planning Departments (Land Use).**

**Privacy Salt:** Low. These licenses are typically public information. However, the hashes should be salted to prevent competitors from scraping the entire city's licensing schedule.

## Authority Chain

**Pattern:** Regulated

Licensed premises operate under permits issued by local authorities overseeing licensing and public safety.

```
✓ licensing.localauthority.gov.uk/verify — Issues liquor licenses and occupancy permits
  ✓ localauthority.gov.uk — Administers local licensing and permits
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Rationale

Licensed premises are the "Living Room" of the city. By turning static placards into live digital bridges, we create a safer, more transparent environment for patrons, neighbors, and regulators alike.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).

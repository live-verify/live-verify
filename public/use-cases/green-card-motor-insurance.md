---
title: "International Motor Insurance (Green Card)"
category: "Personal Lines Insurance"
volume: "Small"
retention: "Trip duration + 1 year"
slug: "green-card-motor-insurance"
verificationMode: "clip"
tags: ["green-card", "international-motor-insurance", "cross-border-travel", "eu-driving", "third-party-liability", "border-control", "car-insurance"]
furtherDerivations: 1
---

## What is a Green Card?

In Europe and the Middle East, a Green Card is the "International Passport" for car insurance. It proves that your insurance policy covers you when you drive across a national border (e.g., from France into Switzerland).

Customs officers at high-security borders will not let a car enter without seeing a physical Green Card.

Because these cards are required for legal entry, scammers often sell "Fake Green Cards" to high-risk drivers who can't get real insurance. Verified hashes allow border police to scan the paper and see the verified active status on the insurer's domain in seconds, stopping uninsured drivers at the gate.

<div style="max-width: 600px; margin: 24px auto; font-family: 'Helvetica', Arial, sans-serif; border: 2px solid #388e3c; background: #e8f5e9; padding: 0; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <div style="background: #388e3c; color: #fff; padding: 15px; text-align: center;">
    <h2 style="margin: 0; text-transform: uppercase; letter-spacing: 1px;"><span verifiable-text="start" data-for="green-card"></span>INTERNATIONAL MOTOR INSURANCE CARD</h2>
    <div style="font-size: 0.8em; font-weight: bold;">CARTE INTERNATIONALE D'ASSURANCE AUTOMOBILE</div>
  </div>
<div style="padding: 25px; color: #1b5e20;">
    <div style="display: flex; justify-content: space-between; font-size: 0.9em; margin-bottom: 20px;">
      <div>
        <strong>1. Valid:</strong> From 15/03/2026 To 14/04/2026<br>
        <strong>2. Country Code:</strong> UK / 992288
      </div>
      <div style="text-align: right;">
        <strong>3. Registration No:</strong><br>
        ABC 123D (GB)
      </div>
    </div>
<div style="font-size: 0.95em; line-height: 1.4; border: 1px solid #388e3c; padding: 15px; background: #fff;">
      <p><strong>4. Category of Vehicle:</strong> A (Car)</p>
      <p><strong>5. Make of Vehicle:</strong> Land Rover Defender</p>
      <p><strong>6. Policyholder:</strong> JOHN JACOB DOE</p>
<p style="font-size: 0.85em; margin-top: 15px; border-top: 1px solid #eee; padding-top: 10px;">
        <strong>7. Insurer:</strong> ALLIANZ INSURANCE PLC (UK)<br>
        <strong>Address:</strong> 57 Ladymead, Guildford, Surrey
      </p>
    </div>
<div style="margin-top: 20px; font-size: 0.7em; text-align: justify;">
      This card is valid in all countries of the European Union and those listed in Box 8. This document is issued by the authority of the Council of Bureaux.
    </div>
<div data-verify-line="green-card" style="border-top: 1px dashed #388e3c; margin-top: 20px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #333; text-align: center;"
      title="Demo only: Allianz doesn't yet offer verification&#10;endpoints, so this is illustrative">
      <span data-verify-line="green-card">verify:allianz.co.uk/greencard/v</span> <span verifiable-text="end" data-for="green-card"></span>
    </div>
  </div>
</div>

## The Problem: Paper Road Fraud

- **Date Tampering:** Scammers buying a cheap 1-week policy and editing the PDF to read "1 Year" to avoid paying hundreds in premiums.
- **Ghost Bureaus:** Creating fake "Council of Bureaux" certificates for high-risk drivers who have been blacklisted by legitimate carriers.
- **Country Swapping:** Editing a "Limited" card to include high-risk zones like Morocco or Albania that the actual policy excludes.

## What Is Checked

Policyholder name, vehicle registration number (Plate), make/model, vehicle category, policy effective/expiration dates, country of issuance, covered countries (Green Card Bureau members), issuing carrier (NAIC/Company Code), PASSID reference.

**Document Types:**
- **International Motor Insurance Card:** (The "Green Card").
- **Frontier Insurance:** Temporary coverage for non-standard borders.
- **UK/EU Bail Bond:** (Linked hash) for legal protection after an accident.

## What the Checker Sees

Shows the issuer domain (`allianz.co.uk`, `axa.fr`) and current policy standing.

**Status Indications:**
- **Active** — Premium paid; 3rd party liability is verified active.
- **Cancelled** — Policy terminated; driver has no legal cross-border cover.
- **Expired** — The specific trip window has ended.
- **Restricted** — Valid only for specific countries (e.g., Turkey or Russia excluded).

## Who Holds It

The Driver (Traveler) benefits from verification.

**Border Crossing:** Proving to a customs officer at a high-security border (e.g., UK to France, or entering Turkey) that the "Green Card" isn't a fake document created to bypass insurance requirements. A verified hash from the insurer's domain prevents the car from being seized at the border.

**Accident Protection:** If a driver has an accident in a foreign country, they can show the "Verified Active" status to the local police. This prevents them from being arrested for "Driving without Insurance" due to a translation error or clerical mistake.

## Who Checks It

**Customs / Border Police (Frontex)**
**Enforcement:** Border agents can scan the hash while the car is in the queue. "Verified by Allianz" ensures the driver hasn't "Edited" the dates on a 15-day card to cover a 30-day trip.

**Foreign Police (Roadside)**
**Liability Verification:** Instantly confirming the 3rd party liability status after an international fender-bender, ensuring that the local victim's damages will be covered by the foreign insurer.

**Car Rental Agencies**
**Cross-Border Authorization:** Verifying that a customer's personal insurance actually covers the vehicle for the "Green Card" zone before allowing them to drive into a neighboring country.

## Who Issues It

**Issuer Types** (First Party)

**National Motor Insurers Bureaux:** (e.g., MIB in the UK).
**Global Insurance Carriers:** (Allianz, AXA, Generali).
**Frontier Insurance Vendors.**

## Authority Chain

**Pattern:** Regulated

The Motor Insurer's Bureau (MIB), regulated by the FCA, issues verified international motor insurance cards for cross-border European travel.

```
✓ greencard.mib.org.uk/verify — Issues international motor insurance green cards
  ✓ fca.org.uk/register — Regulates UK general insurance firms
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Compared With Central Databases (MID)

| Feature | Live Verify | MID / National DB (UK) | Paper Green Card |
| :--- | :--- | :--- | :--- |
| **Cross-Border** | **Universal.** Works via URL across all countries. | **Siloed.** French police can't easily check UK MID. | **Universal.** The global standard. |
| **Trust Anchor** | **Domain-Bound.** Bound to the Carrier. | **Gov-Bound.** | **Visual.** Trusted via stamp. |
| **Speed** | **Instant.** 5-second scan at the checkpoint. | **Slow.** Requires specialized terminal access. | **Instant.** |
| **Freshness** | **Real-time.** Shows if premium was paid today. | **Laggy.** Often 24-48 hours behind. | **Static.** |

**Where each fits:** National motor insurance databases such as the UK's MID are the right check for police and insurers in their own country, and they hold more than a certificate shows. Their reach generally ends at the border, and an officer abroad has no terminal for another country's database. The Green Card exists for that situation, and Live Verify lets the officer or the other driver after a collision confirm that the insurer stands behind the card presented. Each national database keeps its domestic role.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).

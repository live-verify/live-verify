---
title: "Livestock Health Certificates"
category: "Agriculture & Food"
volume: "Small"
retention: "Animal lifetime + 5-10 years"
slug: "livestock-health-certificates"
verificationMode: "clip"
tags: ["livestock-health", "cvi-certificate", "veterinary-inspection", "usda-aphis", "cattle-trade", "animal-welfare", "biosecurity"]
furtherDerivations: 1
---

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 2px solid #333; background: #fff; padding: 0; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <div style="background: #1b5e20; color: #fff; padding: 20px; display: flex; justify-content: space-between; align-items: center;">
    <div>
      <div style="font-weight: bold; font-size: 1.1em;"><span verifiable-text="start" data-for="animal"></span>VETERINARY HEALTH CERTIFICATE</div>
      <div style="font-size: 0.8em;">Certificate of Veterinary Inspection (CVI)</div>
    </div>
    <div style="width: 40px; height: 40px; background: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #1b5e20; font-weight: bold; font-size: 0.7em;">USDA</div>
  </div>
<div style="padding: 25px;">
    <div style="text-align: center; border-bottom: 2px solid #1b5e20; padding-bottom: 10px; margin-bottom: 20px;">
      <h3 style="margin: 0; color: #1b5e20;">OFFICIAL SHIPMENT AUTHORIZATION</h3>
      <div style="font-size: 1.1em; font-weight: bold; margin-top: 5px;">Serial #: CVI-2026-992288</div>
    </div>
<div style="font-size: 0.95em; line-height: 1.6; color: #333;">
      <p><strong>Consignor:</strong> Miller Quarter Horses, LLC (Texas)<br>
      <strong>Consignee:</strong> Blue Ribbon Equestrian, Inc. (Florida)</p>
<div style="background: #f1f8e9; border: 1px solid #c5e1a5; padding: 15px; margin: 15px 0; border-radius: 4px;">
        <p><strong>Animal ID:</strong> "Midnight Runner" (Microchip: 992...288)<br>
        <strong>Species:</strong> Equine / Stallion</p>
        <p><strong>Health Tests:</strong> Coggins: NEGATIVE (Lab #9982)<br>
        <strong>Vaccinations:</strong> EEE/WEE, West Nile, Rabies (Current)</p>
      </div>
<p><strong>Accredited Vet:</strong> Dr. Leslie Thompkins, DVM (Lic #9982)<br>
      <strong>Inspection Date:</strong> March 15, 2026</p>
    </div>
<div data-verify-line="animal" style="border-top: 1px dashed #999; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
      title="Demo only: State Vet Office doesn't yet offer verification&#10;endpoints, so this is illustrative">
      <span data-verify-line="animal">verify:tahc.texas.gov/cvi/v</span> <span verifiable-text="end" data-for="animal"></span>
    </div>
  </div>
</div>

## The Problem: Biosecurity Fraud

- **Certificate Forgery:** Using a color printer to create a "Clean CVI" for a sick horse to sneak it into a prestigious show or across a state line.
- **Microchip Swapping:** Claiming a health certificate belongs to a healthy animal when the person is actually shipping a sick one. Verification of the *Microchip ID Hash* prevents this.

## What Is Checked

Animal unique ID (Microchip/Tag), Consignor/Consignee names, Species/Breed, Gender, Age, specific disease test results (e.g., Coggins for horses, TB for cattle), vaccination history, accredited veterinarian name/license, date of inspection, origin/destination premises.

**Document Types:**
- **Certificate of Veterinary Inspection (CVI):** Mandatory for interstate/international move.
- **Equine Infectious Anemia (Coggins) Lab Report:** Essential for horse travel.
- **Import/Export Health Certificate:** (Form 7001 equivalent).

See also: [Breed Pedigree and Registration](breed-pedigree-registration.md) for lineage/registry verification.

## What the Checker Sees

Shows the issuer domain (`tahc.texas.gov`, `usda.gov`) and current health/legal standing.

**Status Indications:**
- **Certified** — Health certificate matches the state vet's official digital filing.
- **Quarantined** — Disease detected at origin; movement prohibited.
- **Expired** — CVIs are typically only valid for 30 days.

## Who Holds It

The Animal Owner / Shipper benefits from verification.

**Interstate Transport:** Proving to a State Police or Ag-Inspector at a roadside checkpoint that the 10 horses in the trailer have verified "Negative Coggins" and active CVIs. This prevents the truck from being impounded or the animals being forced into a 14-day mandatory quarantine.

**Auction Sales:** Proving to potential buyers at a high-value cattle or horse auction that the animal's health status isn't fabricated.

## Who Checks It

**Roadside Ag-Inspectors (CBP / State Troopers)**
**Disease Control:** Instantly verifying the health status of animals at the border. Live Verify allows the officer to focus on trucks with unverified or "Forged" paper, stopping outbreaks of Foot-and-Mouth or Avian Flu before they spread.

**Show Organizers**
**Entry Vetting:** Ensuring that all 500 horses at a national show have verified vaccinations, protecting the entire population from contagious outbreaks.

## Who Issues It

**Issuer Types** (First Party)

**State Veterinarian Offices.**
**USDA APHIS.**
**Electronic CVI Platforms:** (e.g., GlobalVetLink - hosting the hashes).

**Privacy Salt:** Critical. Livestock owner names and farm locations are sensitive. The hash must be salted to prevent "Cattle Rustling" groups from mapping high-value herds.

## Authority Chain

**Pattern:** Regulated

Veterinarians issue livestock health certificates under veterinary regulator authority (RCVS in the UK).

```
✓ vet.apha.gov.uk/health-cert/verify — Issues livestock health certificates
  ✓ rcvs.org.uk — Regulates veterinary surgeons in the UK
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Where Each Fits: Live Verify and Electronic CVI Platforms

Electronic certificate of veterinary inspection (eCVI) platforms, GlobalVetLink among them, let accredited veterinarians issue CVIs electronically and route them to state animal health officials. Other countries run their own animal movement and health certification systems, some national and some shared across borders, and many still rely on paper. eCVI platforms and Live Verify answer different questions and work side by side: one carries structured data between vets and officials who use the platform, the other lets an inspector check a certificate in hand against the issuer's domain.

| | eCVI platform | Live Verify on the health certificate | Paper CVI form |
| :--- | :--- | :--- | :--- |
| **Who can check** | Officials and vets with access to that platform. | Anyone handed the certificate: a checkpoint inspector, a sale barn, a buyer, a show official. | Whoever reads it. |
| **What the checker gets** | Structured certificate data, routed to the destination state. | Confirmation that the issuer published this exact certificate, microchip and animal details included, as at its date, and whether it has since been withdrawn. | A form whose details may have been edited. |
| **What the owner shares** | Nothing extra; the platform routes the data. | Only the certificate they chose to hand over. | Only the certificate they chose to hand over. |
| **Reach** | Vets and states that use that platform. | Global in principle: any issuing authority, in any country, that publishes hashes on its own domain. | Anywhere, but untrusted. |
| **Speed and cost** | Fast for users; vets pay for the platform. | A few seconds per check: one web lookup, with no fee to the standard. Needs a data connection at the checkpoint. | Immediate. |
| **What it needs** | The issuing vet and the checker both on the platform. | The issuer to publish hashes, and Live Verify-aware software on the inspector's phone. No issuer does this yet. | Nothing. |
| **Best suited to** | Routine interstate movement between participating vets and states. | Checkpoints and sales where the inspector has the paper and no platform login. | Nothing where disease control depends on it. |

**Where each fits:** Electronic CVI platforms work well where the issuing veterinarian and the receiving state both use them, and they give animal health officials structured data that paper cannot. An inspector at a checkpoint or a sale barn may not have a login for the particular platform a certificate came from, and plenty of certificates still travel on paper. Live Verify lets that inspector check the paper against the issuer's domain with a phone, and it can sit on top of a certificate that an eCVI platform produced.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).

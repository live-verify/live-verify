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

## Data Verified

Animal unique ID (Microchip/Tag), Consignor/Consignee names, Species/Breed, Gender, Age, specific disease test results (e.g., Coggins for horses, TB for cattle), vaccination history, accredited veterinarian name/license, date of inspection, origin/destination premises.

**Document Types:**
- **Certificate of Veterinary Inspection (CVI):** Mandatory for interstate/international move.
- **Equine Infectious Anemia (Coggins) Lab Report:** Essential for horse travel.
- **Import/Export Health Certificate:** (Form 7001 equivalent).

See also: [Breed Pedigree and Registration](breed-pedigree-registration.md) for lineage/registry verification.

## Data Visible After Verification

Shows the issuer domain (`tahc.texas.gov`, `usda.gov`) and current health/legal standing.

**Status Indications:**
- **Certified** — Health certificate matches the state vet's official digital filing.
- **Quarantined** — **ALERT:** Disease detected at origin; movement prohibited.
- **Expired** — CVIs are typically only valid for 30 days.

## Second-Party Use

The **Animal Owner / Shipper** benefits from verification.

**Interstate Transport:** Proving to a State Police or Ag-Inspector at a roadside checkpoint that the 10 horses in the trailer have verified "Negative Coggins" and active CVIs. This prevents the truck from being impounded or the animals being forced into a 14-day mandatory quarantine.

**Auction Sales:** Proving to potential buyers at a high-value cattle or horse auction that the animal's health status isn't fabricated.

## Third-Party Use

**Roadside Ag-Inspectors (CBP / State Troopers)**
**Disease Control:** Instantly verifying the health status of animals at the border. Live Verify allows the officer to focus on trucks with unverified or "Forged" paper, stopping outbreaks of Foot-and-Mouth or Avian Flu before they spread.

**Show Organizers**
**Entry Vetting:** Ensuring that all 500 horses at a national show have verified vaccinations, protecting the entire population from contagious outbreaks.

## Verification Architecture

**The "Biosecurity" Fraud Problem**

- **Certificate Forgery:** Using a color printer to create a "Clean CVI" for a sick horse to sneak it into a prestigious show or across a state line.
- **Microchip Swapping:** Claiming a health certificate belongs to a healthy animal when the person is actually shipping a sick one. Verification of the *Microchip ID Hash* prevents this.

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

## Jurisdictional Witnessing (Optional)

Some jurisdictions, contracts, or multi-party workflows may add an independent witness layer. When used, the witnessing firm:

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

If a witness layer exists, it may periodically commit rollups to a public blockchain as an additional timestamping mechanism. That is optional, not inherent to the use case. The verification paths would then be:

1. **Issuer domain** — Direct check against the issuer
2. **Witnessing firm** — Independent confirmation with timestamp
3. **Public blockchain** — Decentralized trust anchor via rollup inclusion


## Competition vs. Electronic CVI (GlobalVetLink)

| Feature | Live Verify | eCVI Platforms (GVL) | Paper CVI Form |
| :--- | :--- | :--- | :--- |
| **Trust Anchor** | **Domain-Bound.** Bound to the State Vet. | **System-Bound.** Trust the vendor. | **Zero.** Easily forged. |
| **Field Access** | **Instant.** Scan the paper at the border. | **Difficult.** Requires inspectors to have specific app logins. | **Instant.** |
| **Adoption** | **High.** Works with existing paper workflows. | **Medium.** Requires all vets to use the same software. | **Universal.** |
| **Integrity** | **Binds Microchip.** Protects the data. | **Data-Only.** | **Vulnerable.** |

**Why Live Verify wins here:** The "Roadside Realities." Border inspectors work in booths with limited time. They don't have logins to 15 different private veterinary platforms. Live Verify turns the **Mandatory Paper Certificate** into a universal digital bridge, bringing "Blockchain-level" biosecurity to the physical checkpoint.

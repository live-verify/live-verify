---
title: "Vaccination and Immunization Records"
category: "Healthcare & Medical Records"
volume: "Very Large"
retention: "Lifetime (health & public safety history)"
slug: "vaccination-immunization-records"
tags: ["healthcare", "immunization", "vaccination-card", "cdc-white-card", "public-health", "travel-requirements", "school-enrollment", "medical-fraud", "phi-security"]
furtherDerivations: 1
---

## What are Immunization Records?

An **Immunization Record** (often a wallet card like the CDC "White Card" or a state-issued certificate) is the official proof that a person has received specific vaccines. These records are the "Gates of Entry" for **K-12 Schooling**, **University Dorms**, and **International Travel** to countries with endemic diseases like Yellow Fever.

The problem is that physical cards are easy to fake. During the COVID-19 pandemic, a massive black market emerged for "Fake White Cards," where people used real lot numbers on forged paper to bypass employment and travel rules. Similarly, students sometimes "edit" their childhood MMR records to meet college requirements. Verified hashes bind the **Patient Name, Vaccine Lot Number, and Date of Administration** to the provider's or the health department's domain (e.g., `cvs.com`, `cdc.gov`, or `doh.wa.gov`).

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <span verifiable-text="start" data-for="vax">[</span>
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;">COVID-19 VACCINATION RECORD CARD                              [CDC]
═══════════════════════════════════════════════════════════════════

Patient Name:    SMITH, SARAH JANE
Date of Birth:   05/15/1985

IMMUNIZATION RECORD
───────────────────────────────────────────────────────────────────
Vaccine      Product / Lot      Date          Healthcare Professional
───────────────────────────────────────────────────────────────────
COVID-19     PFZ / 992288       15 MAR 26     CVS #042
MMR          MSD / 887766       10 JUN 25     Springfield Clinic

Please keep this record card, which includes medical information
about the vaccines you have received.

</pre>
<span data-verify-line="vax">verify:cvs.com/vax/v</span> <span verifiable-text="end" data-for="vax">]</span>
</div>

## Data Verified

Patient full name, date of birth, vaccine type/manufacturer (e.g., Pfizer/Moderna), lot number, dose number (1st/2nd/Booster), administration date, healthcare provider name/facility ID, state immunization registry ID.

**Document Types:**
- **Vaccination Card:** The physical wallet-sized record.
- **State Immunization Certificate:** Formal printout for school.
- **Yellow Card (International):** For WHO-regulated diseases.
- **Digital Health Pass:** (Linked hash) SMART Health Card equivalent.

## Verification Response

The endpoint returns a simple status code:

- **OK** — The dose matches the original provider's digital record
- **LOT_RECALLED** — The specific vaccine lot has been flagged for a safety issue; may need revaccination
- **INVALID_LOT** — The lot number on the card does not exist or was never sent to this provider; likely forged
- **SERIES_INCOMPLETE** — Additional doses are required for "fully vaccinated" status
- **404** — Record not found (forged card, wrong provider, or OCR error)

The issuer domain is visible from the `verify:` line on the card itself (e.g., `cvs.com`).

## Post-Verification Actions

None typically. The verification confirms vaccination status; that's the decision point for access.

**Why No Further Action:**

- **Schools** just need status to complete enrollment
- **Border agents** just need confirmation for entry requirements
- **Employers** just need verification for workplace health compliance

The status code is the value. If it's OK, grant access. If it's INVALID_LOT or 404, reject the card. No POST form needed.

## Second-Party Use

The **Patient** (second party) receives the immunization record from the healthcare provider (first party), **keeps it**, and may later hand it to third parties for various reasons, or never do so.

**Personal Record:** The patient has their own verified copy of their vaccination history. Most of the time, the document sits in their wallet or health records—the verification value is latent, there *if needed*.

**Peace of Mind:** The patient can confirm at any time that the record matches what the provider's system recorded and hasn't been altered, ensuring they have legitimate proof of immunization.

**Future Optionality:** If a dispute arises—whether about school enrollment, travel requirements, or employment—the patient has cryptographic proof ready without needing to contact the healthcare provider.

## Third-Party Use

The patient (second party) may hand the verified document to various third parties:

**Schools / University Registrars (Enrollment)**
A parent enrolling a child in a new school provides the verified hash of the child's immunization record. The school registrar can instantly see **"VERIFIED - MMR & POLIO"** on their phone, removing the 5-day delay of calling the pediatrician's office and protecting the student population from outbreak risk.

**Airlines / Border Security (Travel Requirements)**
Travelers provide verified hashes of "Yellow Cards" when arriving from endemic zones (e.g., Yellow Fever). Border officials can instantly verify the certificates aren't "port-side forgeries," preventing traumatic refusal of entry.

**Employers (Healthcare Safety Compliance)**
Healthcare facilities and senior care homes receive verified immunization records to ensure that 100% of staff have verified, active flu or COVID boosters to protect vulnerable patients.

**Fraud Detection Systems**
Schools and employers use verification to filter thousands of vaccine cards, instantly identifying only verified, provider-backed records and rejecting fraudulent claims that could lead to disease outbreaks.

## Verification Architecture

**The "Kitchen Table" Fraud Problem**

- **Lot Number Harvesting:** Using a real lot number from a friend's card to create a fake card for oneself.
- **Date Masking:** Changing a 2022 vaccination date to 2026 to bypass a "Recent Booster" requirement.
- **Provider Mimicry:** Using a reputable pharmacy's logo on a fake card to avoid taking a mandatory vaccine.

**Issuer Types (First Party)**

- National Health Agencies (CDC)
- State Immunization Registries (IIS)
- Pharmacy Retailers (CVS, Walgreens)

**Privacy Salt:** Required. Vaccination data is Protected Health Information (PHI). While each record contains unique combinations of patient names, dates of birth, specific lot numbers, precise administration dates, and provider IDs that provide very high entropy, the extreme sensitivity of health data—and the risk that bad actors could use enumeration to target individuals based on vaccination status or create "mass health mapping" databases—means salt is absolutely essential. Salt protects both individual medical privacy and prevents discrimination based on immunization status.

## Jurisdictional Witnessing

A jurisdiction may require healthcare providers to retain a **witnessing firm** for regulatory compliance. The witnessing firm:

- Receives all hashes from the healthcare provider, and any subsequent changes to the record as they happen—which may manifest as a new hash, a status change (lot recalled, series incomplete), or even a 404 (record deleted)
- Receives structured content/metadata (vaccine types, lot numbers, administration dates, dose numbers)
- Does **NOT** receive plaintext (patient names, dates of birth, provider identities)
- Provides an immutable, timestamped audit trail—available to the jurisdiction on demand, to patients/third parties during disputes, or as expert witness testimony in legal proceedings

This provides:
- **Non-repudiation:** Healthcare provider cannot deny administering the vaccine
- **Timestamp proof:** Immunization existed at a specific time (critical for outbreak investigations and school enrollment disputes)
- **Regulatory audit:** Public health departments can inspect the witness ledger for vaccination compliance and lot tracking
- **Resilience:** Verification works even if healthcare provider's systems go down or the provider closes

**Public Blockchain (Non-Party)**

Witnessing firms may periodically commit rollups to an inexpensive public blockchain, providing an ultimate immutability guarantee. The blockchain is a "non-party"—infrastructure, not a participant in the transaction. This creates multiple verification paths:

1. **Healthcare provider domain** — Direct check against the issuer
2. **Witnessing firm** — Independent confirmation with timestamp
3. **Public blockchain** — Decentralized trust anchor via rollup inclusion

## Jurisdictional Variation

Vaccination requirements for school enrollment, employment, and travel vary significantly by jurisdiction and change with political administrations:

- **United States:** Requirements are set at the state level and are currently being rolled back in some states; federal mandates have been challenged and withdrawn
- **European Union:** Member states maintain childhood vaccination schedules; school requirements vary by country
- **Australia:** "No Jab, No Pay" and "No Jab, No Play" policies tie vaccination to childcare benefits and school enrollment
- **International travel:** Yellow Fever vaccination remains mandatory for entry to endemic zones regardless of domestic politics

The verification system is agnostic to policy — it answers "did this person receive this vaccine?" not "should this person be required to have it?" Policy changes don't affect the technical verification; they affect what third parties choose to do with the result.

## Rationale

Immunization records are proof of medical history. By turning static cards into verifiable digital bridges, we ensure that records are authentic regardless of how jurisdictions choose to use them — whether for school enrollment, travel requirements, employment compliance, or simply personal health records.
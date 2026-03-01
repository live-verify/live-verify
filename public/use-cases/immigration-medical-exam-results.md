---
title: "Immigration Medical Exam Results (I-693)"
category: "Immigration & Visa Documents"
volume: "Medium"
retention: "Application + 7 years"
slug: "immigration-medical-exam-results"
tags: ["immigration", "medical-exam", "uscis", "i-693", "civil-surgeon", "vaccination-record", "public-health", "green-card"]
furtherDerivations: 1
---

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 1px solid #ccc; background: #fff; padding: 0; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <div style="background: #f4f4f4; padding: 15px; border-bottom: 1px solid #ccc; display: flex; align-items: center;">
    <div style="width: 40px; height: 40px; background: #002d62; border-radius: 50%; margin-right: 15px; display: flex; align-items: center; justify-content: center; font-size: 0.7em; color: #fff; font-weight: bold;"><span verifiable-text="start" data-for="im-med">[</span>DHS</div>
    <div>
      <div style="font-weight: bold; font-size: 1.1em;">U.S. CITIZENSHIP & IMMIGRATION SERVICES</div>
      <div style="font-size: 0.8em;">Form I-693, Medical Examination & Vaccination Record</div>
    </div>
  </div>
<div style="padding: 25px;">
    <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
      <div style="border: 1px solid #000; padding: 5px 10px; font-weight: bold;">SEALED MEDICAL RESULTS</div>
      <div style="text-align: right; font-family: monospace;">A-Number: A992-288-776</div>
    </div>
<div style="font-size: 0.95em; line-height: 1.6; color: #333;">
      <p><strong>Applicant:</strong> JOHN JACOB DOE<br>
      <strong>Date of Exam:</strong> March 15, 2026</p>
<div style="background: #f1f8e9; border: 1px solid #c5e1a5; padding: 15px; margin: 15px 0; border-radius: 4px;">
        <p><strong>Civil Surgeon:</strong> Dr. Leslie Thompkins (ID #9982-BC)<br>
        <strong>Clinic:</strong> Gotham Community Health Center</p>
        <p><strong>Results Summary:</strong> Class A/B Conditions: NONE DETECTED. All required vaccinations confirmed and current.</p>
      </div>
<p style="font-size: 0.85em; font-weight: bold; color: #d32f2f;">DO NOT OPEN ENVELOPE. INTERNAL RECORD VERIFICATION ONLY.</p>
    </div>
<div data-verify-line="im-med" style="border-top: 1px dashed #999; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
      title="Demo only: Civil Surgeon portal doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:gotham-health.org/uscis/v <span verifiable-text="end" data-for="im-med">]</span>
    </div>
  </div>
</div>

## Data Verified

Applicant name, Alien Registration Number (A-Number), Date of birth, Civil Surgeon name/ID, Clinic location, Date of medical examination, Vaccination status (Complete/Waiver), presence of Class A/B medical conditions, signature of surgeon, date of signature.

**Document Types:**
- **I-693 Medical Form:** The primary 14-page federal medical report.
- **Vaccination Record Extract:** For school or workplace proof.
- **Panel Physician Report:** For applicants outside the U.S. (DS-2054).
- **Communicable Disease Waiver:** (Linked hash) if required.

## Data Visible After Verification

Shows the issuer domain (the Civil Surgeon's Clinic or Health System) and current result status.

**Status Indications:**
- **Certified** — Medical exam matches the clinic's secure digital record.
- **Incomplete** — One or more vaccinations or tests (e.g., TB) are pending.
- **Expired** — **ALERT:** Results are > 2 years old; new exam required.
- **Void** — Results retracted (e.g., due to laboratory error or surgeon disciplinary action).

## Second-Party Use

The **Applicant** benefits from verification.

**Submission Confidence:** Proving to themselves (and their lawyer) that the "Sealed Envelope" they are handing to USCIS contains a "Verified Passed" exam. Verification prevents the "Dead Air" period where an applicant doesn't know if their doctor actually signed the form correctly until they get a rejection notice months later.

**Workplace Compliance:** Providing verified proof of vaccination status to an employer without needing to provide the full, private medical history.

## Third-Party Use

**USCIS Officers**
**Intake Integrity:** When an officer receives a "Sealed I-693 Envelope," they currently have to trust the physical seal hasn't been tampered with. Live Verify allows the officer to scan the hash on the form *before* opening. "Verified by Gotham Health" ensures the contents match the surgeon's original digital filing, stopping "Envelope Tampering" fraud.

**Immigration Attorneys**
**Quality Control:** Verifying that the Civil Surgeon is actually on the USCIS-approved list and that their license was active on the date of the signature.

**Airlines / Port of Entry**
**Public Health Vetting:** For international arrivals, verifying the medical clearance of a refugee or immigrant before boarding.

## Verification Architecture

**The "Dirty Seal" Fraud Problem**

- **Envelope Tampering:** Applicants carefully steaming open the "Sealed" envelope to hide a positive TB or Syphilis test result before re-sealing it.
- **Fake Surgeons:** Unlicensed individuals posing as "Civil Surgeons" and selling fake I-693 forms for cash to immigrants who fear medical results.
- **Vaccination Forgery:** Fabricating a vaccination history to avoid the $500 cost of mandatory shots.

**Issuer Types** (First Party)

**USCIS-Designated Civil Surgeons:** (Private doctors in the USA).
**Panel Physicians:** (Overseas doctors for State Dept).
**Public Health Clinics.**

**Privacy Salt:** ABSOLUTELY CRITICAL. I-693s contain highly sensitive medical diagnoses. The hash MUST be salted to prevent "Guess-and-Check" searches for people with specific diseases.

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


## Competition vs. e-Medical (State Dept)

| Feature | Live Verify | e-Medical (Electronic Filing) | Paper I-693 (Standard) |
| :--- | :--- | :--- | :--- |
| **Trust Anchor** | **Domain-Bound.** Bound to the Doctor. | **Gov-Bound.** Direct to server. | **Zero.** Trusted only via seal. |
| **User Access** | **High.** Applicant can see "Certified" status. | **Zero.** Black-box system; applicant sees nothing. | **Manual.** |
| **Interoperability** | **Universal.** Works for any clinic with a URL. | **Restricted.** Requires expensive e-Medical software. | **Universal.** |
| **Freshness** | **Real-time.** Shows if results retracted. | **High.** | **Static.** |

**Why Live Verify wins here:** The "Local Clinic" reality. Most USCIS civil surgeons are small private clinics who do not have the IT budget for complex federal "e-Filing" integrations. They still use paper. Live Verify turns that **Mandatory Paper Form** into a live digital checkpoint, bringing "Government-Level" integrity to local medical offices.

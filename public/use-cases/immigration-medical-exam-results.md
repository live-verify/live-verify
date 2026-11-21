---
title: "Immigration Medical Exam Results (I-693)"
category: "Immigration & Visa Documents"
volume: "Medium"
retention: "Application + 7 years"
slug: "immigration-medical-exam-results"
verificationMode: "clip"
tags: ["immigration", "medical-exam", "uscis", "i-693", "civil-surgeon", "vaccination-record", "public-health", "green-card"]
furtherDerivations: 1
---

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 1px solid #ccc; background: #fff; padding: 0; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <div style="background: #f4f4f4; padding: 15px; border-bottom: 1px solid #ccc; display: flex; align-items: center;">
    <div style="width: 40px; height: 40px; background: #002d62; border-radius: 50%; margin-right: 15px; display: flex; align-items: center; justify-content: center; font-size: 0.7em; color: #fff; font-weight: bold;"><span verifiable-text="start" data-for="im-med"></span>DHS</div>
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
        <strong>Clinic:</strong> Fairport Community Health Center</p>
        <p><strong>Results Summary:</strong> Class A/B Conditions: NONE DETECTED. All required vaccinations confirmed and current.</p>
      </div>
<p style="font-size: 0.85em; font-weight: bold; color: #d32f2f;">DO NOT OPEN ENVELOPE. INTERNAL RECORD VERIFICATION ONLY.</p>
    </div>
<div data-verify-line="im-med" style="border-top: 1px dashed #999; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
      title="Demo only: Civil Surgeon portal doesn't yet offer verification&#10;endpoints, so this is illustrative">
      <span data-verify-line="im-med">verify:fairport-health.org/uscis/v</span> <span verifiable-text="end" data-for="im-med"></span>
    </div>
  </div>
</div>

## Framing Insights

**"Why would you bother?" (Pattern A):** The I-693 is completed in a sealed envelope that the applicant carries — unopened — to their USCIS interview. The seal is the only tamper evidence. But fake civil surgeons and fraudulent clinics exist: they charge for an "exam" that never happens, produce a clean I-693 for applicants who would fail the real screening (communicable diseases, incomplete vaccinations), and pocket the fee. The applicant gets a sealed envelope containing a fabricated result. USCIS has no fast way to distinguish this from a legitimate exam without contacting the clinic. A `verify:` line bound to the civil surgeon's clinic domain gives the adjudicator instant confirmation that the exam was actually performed by a designated physician.

**Specific consequences (Pattern E):** The I-693 screens for communicable diseases (tuberculosis, syphilis) and required vaccinations. A fraudulent clean result means an applicant with active TB enters the general population without treatment. Public health depends on these exams being real, not just on the paperwork looking real.

## The Problem: Dirty Seal Fraud

- **Envelope Tampering:** Applicants carefully steaming open the "Sealed" envelope to hide a positive TB or Syphilis test result before re-sealing it.
- **Fake Surgeons:** Unlicensed individuals posing as "Civil Surgeons" and selling fake I-693 forms for cash to immigrants who fear medical results.
- **Vaccination Forgery:** Fabricating a vaccination history to avoid the $500 cost of mandatory shots.

## What Is Checked

Applicant name, Alien Registration Number (A-Number), Date of birth, Civil Surgeon name/ID, Clinic location, Date of medical examination, Vaccination status (Complete/Waiver), presence of Class A/B medical conditions, signature of surgeon, date of signature.

**Document Types:**
- **I-693 Medical Form:** The primary 14-page federal medical report.
- **Vaccination Record Extract:** For school or workplace proof.
- **Panel Physician Report:** For applicants outside the U.S. (DS-2054).
- **Communicable Disease Waiver:** (Linked hash) if required.

## What the Checker Sees

Shows the issuer domain (the Civil Surgeon's Clinic or Health System) and current result status.

**Status Indications:**
- **Certified** — Medical exam matches the clinic's secure digital record.
- **Incomplete** — One or more vaccinations or tests (e.g., TB) are pending.
- **Expired** — Results are > 2 years old; new exam required.
- **Void** — Results retracted (e.g., due to laboratory error or surgeon disciplinary action).

## Who Holds It

The Applicant benefits from verification.

**Submission Confidence:** Proving to themselves (and their lawyer) that the "Sealed Envelope" they are handing to USCIS contains a "Verified Passed" exam. Verification prevents the "Dead Air" period where an applicant doesn't know if their doctor actually signed the form correctly until they get a rejection notice months later.

**Workplace Compliance:** Providing verified proof of vaccination status to an employer without needing to provide the full, private medical history.

## Who Checks It

**USCIS Officers**
**Intake Integrity:** When an officer receives a "Sealed I-693 Envelope," they currently have to trust the physical seal hasn't been tampered with. Live Verify allows the officer to scan the hash on the form *before* opening. "Verified by Fairport Health" ensures the contents match the surgeon's original digital filing, stopping "Envelope Tampering" fraud.

**Immigration Attorneys**
**Quality Control:** Verifying that the Civil Surgeon is actually on the USCIS-approved list and that their license was active on the date of the signature.

**Airlines / Port of Entry**
**Public Health Vetting:** For international arrivals, verifying the medical clearance of a refugee or immigrant before boarding.

## Who Issues It

**Issuer Types** (First Party)

**USCIS-Designated Civil Surgeons:** (Private doctors in the USA).
**Panel Physicians:** (Overseas doctors for State Dept).
**Public Health Clinics.**

**Privacy Salt:** ABSOLUTELY CRITICAL. I-693s contain highly sensitive medical diagnoses. The hash MUST be salted to prevent "Guess-and-Check" searches for people with specific diseases.

## Authority Chain

**Pattern:** Regulated

Civil surgeons and panel physicians issue I-693 medical exam results under US immigration health regulator authority (CDC in the US).

```
✓ panelphysician.example.com/verify — Issues immigration medical examination results
  ✓ cdc.gov/immigrant-refugee-health — Administers US immigration health screening
    ✓ usa.gov/verifiers — US federal government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Jurisdictional Witnessing (Optional)

An independent witness layer may apply — see [Witnessing Third Parties](../../docs/WITNESSING-THIRD-PARTIES.md) for the full mechanism (what a witness receives, non-repudiation, optional public-blockchain rollups). For this use case: a witness would receive the civil surgeon's hashes and status changes plus structured metadata (applicant A-Number, date of exam, vaccination status, result status) — never sensitive personal medical information — providing non-repudiation of the medical exam results.


## Compared With e-Medical (State Dept)

| Feature | Live Verify | e-Medical (Electronic Filing) | Paper I-693 (Standard) |
| :--- | :--- | :--- | :--- |
| **Trust Anchor** | **Domain-Bound.** Bound to the Doctor. | **Gov-Bound.** Direct to server. | **Zero.** Trusted only via seal. |
| **User Access** | **High.** Applicant can see "Certified" status. | **Zero.** Black-box system; applicant sees nothing. | **Manual.** |
| **Interoperability** | **Universal.** Works for any clinic with a URL. | **Restricted.** Requires expensive e-Medical software. | **Universal.** |
| **Freshness** | **Real-time.** Shows if results retracted. | **High.** | **Static.** |

**Where each fits:** Electronic filing through eMedical-style systems sends results directly to the government and removes the paper form altogether; where a clinic and the receiving authority are both connected, it is the stronger channel. Many examinations are still recorded on a paper form handed to the applicant, and the applicant can see nothing of what an electronic system holds. Live Verify lets the applicant, their lawyer or the receiving officer confirm that the examining doctor stands behind the form, for clinics and cases that electronic filing does not cover.

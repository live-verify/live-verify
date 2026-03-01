---
title: "Discharge Summaries and Care Plans"
category: "Healthcare & Medical Records"
volume: "Small"
retention: "10-30 years (medical records)"
slug: "discharge-summaries-care-plans"
tags: ["healthcare-logistics", "patient-discharge", "care-coordination", "hospital-records", "medication-reconciliation", "continuum-of-care"]
furtherDerivations: 1
---

## What is a Discharge Summary?

When a patient leaves the hospital, they receive a **Discharge Summary**. This is the "User Manual" for their recovery.

It lists:
1.  **The Diagnosis:** "Why were you here?"
2.  **The Meds:** "What new drugs must you take starting today?"
3.  **The Plan:** "When is your next surgery?"

This paper is the #1 tool for preventing "Medical Errors" when a patient moves to a nursing home or goes back to their primary doctor. Verified summaries ensure that a patient (or a family member) doesn't accidentally "Edit" the medication list, which can be fatal.

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 1px solid #ccc; background: #fff; padding: 0; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <div style="background: #0277bd; color: #fff; padding: 20px; display: flex; justify-content: space-between; align-items: center;">
    <div>
      <div style="font-weight: bold; font-size: 1.2em;"><span verifiable-text="start" data-for="discharge">[</span>CEDARS-SINAI MEDICAL CENTER</div>
      <div style="font-size: 0.8em;">Inpatient Discharge Summary</div>
    </div>
    <div style="text-align: right;">
      <div style="font-size: 0.8em;">Patient MRN: 998877-X</div>
    </div>
  </div>
<div style="padding: 25px;">
    <h3 style="margin-top: 0; color: #0277bd; border-bottom: 2px solid #0277bd; padding-bottom: 5px;">DISCHARGE INSTRUCTIONS</h3>
<div style="font-size: 0.9em; line-height: 1.6; color: #333;">
      <p><strong>Patient:</strong> <strong>WAYNE, BRUCE</strong> (DOB: 02/19/1972)<br>
      <strong>Admission Date:</strong> March 10, 2026<br>
      <strong>Discharge Date:</strong> March 15, 2026</p>
<div style="background: #e1f5fe; padding: 15px; border: 1px solid #b3e5fc; margin: 15px 0;">
        <strong>NEW MEDICATIONS:</strong>
        <ul style="margin: 5px 0 0 20px; padding: 0;">
          <li>Lisinopril 10mg - 1 tab daily (Blood Pressure)</li>
          <li>Atorvastatin 20mg - 1 tab at bedtime (Cholesterol)</li>
        </ul>
      </div>
<p><strong>Follow-up Care:</strong> Primary Care Physician within 7 days. Physical therapy 2x weekly.</p>
    </div>
<div style="margin-top: 20px; display: flex; justify-content: space-between; align-items: flex-end;">
      <div style="border-top: 1px solid #000; width: 200px; padding-top: 5px; font-style: italic; font-size: 0.85em;">Attending: Dr. Leslie Thompkins</div>
      <div style="text-align: right; font-size: 0.8em; color: #777;">
        Verified via Epic MyChart
      </div>
    </div>
<div data-verify-line="discharge" style="border-top: 1px dashed #999; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
      title="Demo only: Cedars-Sinai doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:cedars-sinai.org/discharge/v <span verifiable-text="end" data-for="discharge">]</span>
    </div>
  </div>
</div>

## Data Verified

Patient name, MRN (Medical Record Number), admission/discharge dates, primary diagnosis, list of new medications (dose/frequency), follow-up requirements, attending physician name, facility ID.

**Document Types:**
- **Discharge Summary:** The formal medical history of the stay.
- **Discharge Instructions:** Patient-friendly "To-Do" list.
- **Medication Reconciliation:** List of what to take vs. what to stop.
- **Care Plan:** For home health or skilled nursing facilities.

## Data Visible After Verification

Shows the issuer domain (`cedars-sinai.org`, `mayoclinic.org`) and the record standing.

**Status Indications:**
- **Final** — Summary is complete and verified by the attending physician.
- **Amended** — A correction was issued (e.g., due to a medication change).
- **In-Progress** — Patient discharged but final summary pending.
- **Void** — Record assigned to wrong patient (rare safety event).

## Second-Party Use

The **Patient / Caregiver** benefits from verification.

**Safe Transitions:** Proving to a home-health nurse or a retail pharmacist that the "New Medications" on the paper aren't a typo or a misprint. A verified list reduces the chance of "Medication Errors," which are the #1 cause of hospital re-admissions.

**Personal Health Records:** Carrying a verified, cryptographically trusted "Source of Truth" about their hospital stay, which can be shared with future doctors anywhere in the world.

## Third-Party Use

**Skilled Nursing Facilities (SNFs)**
**Intake Integrity:** When a patient arrives from the hospital, the SNF nurse scans the discharge summary. "Verified by Cedars-Sinai" ensures the instructions weren't "Modified" by a family member to hide a contagious condition or a complex wound care requirement.

**Primary Care Physicians (PCPs)**
**Continuity of Care:** PCP offices often wait days for hospital faxes. Live Verify allows them to instantly trust the paper instructions brought in by the patient at the 7-day follow-up visit.

**Health Insurers**
**Outcome Audits:** Verifying that the care plan was actually followed to determine if a re-admission was "Preventable" or not.

## Verification Architecture

**The "Paper Lag" Fraud Problem**

- **Medication Forgery:** Patients editing a discharge summary to add a prescription for an opioid or to remove a "No Driving" restriction.
- **Condition Concealment:** Deleting mention of "Alcohol Abuse" or "Psychiatric Consult" from a summary before sending it to a new employer or insurer.
- **Phantom Discharges:** Creating a fake summary to justify a 2-week absence from work.

**Issuer Types** (First Party)

**Hospitals & Health Systems:** (Cedars-Sinai, Kaiser, HCA).
**EHR Vendors:** (Epic, Cerner - hosting the hashes on behalf of hospitals).
**Health Information Exchanges (HIEs).**

**Privacy Salt:** ABSOLUTELY CRITICAL. Medical data is highly sensitive (HIPAA/GDPR). The hash MUST be salted to prevent "Guess-and-Check" attacks to find specific patient diagnoses.

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


## Competition vs. Patient Portals / HIEs

| Feature | Live Verify | Patient Portal (Epic) | Health Info Exchange (HIE) |
| :--- | :--- | :--- | :--- |
| **Trust Anchor** | **Domain-Bound.** Bound to the Hospital. | **System-Bound.** Requires login. | **Network-Bound.** |
| **User Access** | **Instant.** Scan the paper in the clinic. | **Slow.** Requires patient to log in and share screen. | **Difficult.** Requires clinical integration. |
| **Integrity** | **Cryptographic.** Binds the *Text*. | **High.** Direct DB access. | **High.** |
| **Cross-System** | **Universal.** Works across any health system. | **Siloed.** Hard to share across different vendors. | **Limited.** Regional only. |

**Why Live Verify wins here:** The "Front Line" reality. Doctors in outpatient clinics don't have time to log into 10 different patient portals or wait for a regional HIE to sync. Live Verify turns the **Physical Discharge Packet** (which the patient always has) into a live, trusted clinical link.

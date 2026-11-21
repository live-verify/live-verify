---
title: "Discharge Summaries and Care Plans"
category: "Healthcare & Medical Records"
volume: "Small"
retention: "10-30 years (medical records)"
slug: "discharge-summaries-care-plans"
verificationMode: "clip"
tags: ["healthcare-logistics", "patient-discharge", "care-coordination", "hospital-records", "medication-reconciliation", "continuum-of-care"]
furtherDerivations: 1
---

## What is a Discharge Summary?

When a patient leaves the hospital, they receive a Discharge Summary. This is the "User Manual" for their recovery.

It lists:
1.  **The Diagnosis:** "Why were you here?"
2.  **The Meds:** "What new drugs must you take starting today?"
3.  **The Plan:** "When is your next surgery?"

This paper is the #1 tool for preventing "Medical Errors" when a patient moves to a nursing home or goes back to their primary doctor. Verified summaries ensure that a patient (or a family member) doesn't accidentally "Edit" the medication list, which can be fatal.

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 1px solid #ccc; background: #fff; padding: 0; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <div style="background: #0277bd; color: #fff; padding: 20px; display: flex; justify-content: space-between; align-items: center;">
    <div>
      <div style="font-weight: bold; font-size: 1.2em;"><span verifiable-text="start" data-for="discharge"></span>CEDARS-SINAI MEDICAL CENTER</div>
      <div style="font-size: 0.8em;">Inpatient Discharge Summary</div>
    </div>
    <div style="text-align: right;">
      <div style="font-size: 0.8em;">Patient MRN: 998877-X</div>
    </div>
  </div>
<div style="padding: 25px;">
    <h3 style="margin-top: 0; color: #0277bd; border-bottom: 2px solid #0277bd; padding-bottom: 5px;">DISCHARGE INSTRUCTIONS</h3>
<div style="font-size: 0.9em; line-height: 1.6; color: #333;">
      <p><strong>Patient:</strong> <strong>REEVE, MARCUS</strong> (DOB: 02/19/1972)<br>
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
    </div>
<div data-verify-line="discharge" style="border-top: 1px dashed #999; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
      title="Demo only: Cedars-Sinai doesn't yet offer verification&#10;endpoints, so this is illustrative">
      <span data-verify-line="discharge">verify:cedars-sinai.org/discharge/v</span> <span verifiable-text="end" data-for="discharge"></span>
    </div>
  </div>
</div>

## Framing Insights

**Specific consequences (Pattern E):** Medication errors during care transitions are the number one cause of preventable hospital readmissions. A patient discharged on warfarin (blood thinner) whose summary is altered — intentionally or accidentally — to omit that medication will not have it reconciled at the nursing home. They develop a blood clot. They are readmitted or they die. The discharge summary is the single document that travels with the patient across the care boundary, and it is currently an unverifiable piece of paper.

**"Why would you bother?" (Pattern A):** Patients and families edit discharge summaries more often than clinicians realize. A patient removes "Alcohol Dependency" before showing the summary to a new GP. A family member deletes "Psychiatric Consultation" before sending it to an employer. A patient adds an opioid to the medication list to obtain it from a new pharmacy. None of these edits are detectable from the paper alone.

## The Problem: Paper Lag Fraud

- **Medication Forgery:** Patients editing a discharge summary to add a prescription for an opioid or to remove a "No Driving" restriction.
- **Condition Concealment:** Deleting mention of "Alcohol Abuse" or "Psychiatric Consult" from a summary before sending it to a new employer or insurer.
- **Phantom Discharges:** Creating a fake summary to justify a 2-week absence from work.

## What Is Checked

Patient name, MRN (Medical Record Number), admission/discharge dates, primary diagnosis, list of new medications (dose/frequency), follow-up requirements, attending physician name, facility ID.

**Document Types:**
- **Discharge Summary:** The formal medical history of the stay.
- **Discharge Instructions:** Patient-friendly "To-Do" list.
- **Medication Reconciliation:** List of what to take vs. what to stop.
- **Care Plan:** For home health or skilled nursing facilities.

## What the Checker Sees

Shows the issuer domain (`cedars-sinai.org`, `mayoclinic.org`) and the record standing.

**Status Indications:**
- **Final** — Summary is complete and verified by the attending physician.
- **Amended** — A correction was issued (e.g., due to a medication change).
- **In-Progress** — Patient discharged but final summary pending.
- **Void** — Record assigned to wrong patient (rare safety event).

## Who Holds It

The Patient / Caregiver benefits from verification.

**Safe Transitions:** Proving to a home-health nurse or a retail pharmacist that the "New Medications" on the paper aren't a typo or a misprint. A verified list reduces the chance of "Medication Errors," which are the #1 cause of hospital re-admissions.

**Personal Health Records:** Carrying a verified, cryptographically trusted "Source of Truth" about their hospital stay, which can be shared with future doctors anywhere in the world.

## Who Checks It

**Skilled Nursing Facilities (SNFs)**
**Intake Integrity:** When a patient arrives from the hospital, the SNF nurse scans the discharge summary. "Verified by Cedars-Sinai" ensures the instructions weren't "Modified" by a family member to hide a contagious condition or a complex wound care requirement.

**Primary Care Physicians (PCPs)**
**Continuity of Care:** PCP offices often wait days for hospital faxes. Live Verify allows them to instantly trust the paper instructions brought in by the patient at the 7-day follow-up visit.

**Health Insurers**
**Outcome Audits:** Verifying that the care plan was actually followed to determine if a re-admission was "Preventable" or not.

## Who Issues It

**Issuer Types** (First Party)

**Hospitals & Health Systems:** (Cedars-Sinai, Kaiser, HCA).
**EHR Vendors:** (Epic, Cerner - hosting the hashes on behalf of hospitals).
**Health Information Exchanges (HIEs).**

**Privacy Salt:** ABSOLUTELY CRITICAL. Medical data is highly sensitive (HIPAA/GDPR). The hash MUST be salted to prevent "Guess-and-Check" attacks to find specific patient diagnoses.

## Authority Chain

**Pattern:** Regulated

Hospitals issue discharge summaries under healthcare regulator authority (CQC in the UK).

```
✓ discharge.nhs.uk/verify — Issues discharge summaries and care plans
  ✓ cqc.org.uk — Regulates health and social care services in England
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Where Each Fits: Live Verify and Patient Portals and Health Information Exchanges

Hospitals give patients access to their records through patient portals run on the hospital's record system, and many regions connect providers through health information exchanges or national record-sharing services. Coverage depends on where you are: some countries have national systems, some have regional exchanges, some rely on vendor networks, and many have nothing joining providers up. Portals, exchanges and Live Verify answer different questions and work side by side: the record systems carry structured data between connected parties, and Live Verify lets the person reading a printed discharge summary confirm the hospital issued it.

| | Patient portal | Health information exchange | Live Verify on the discharge summary |
| :--- | :--- | :--- | :--- |
| **Who can check** | The patient, logged in, and anyone they show their screen to. | Clinicians at organisations connected to the exchange. | Anyone handed the summary: a care home nurse, a GP, a pharmacist, an insurer. |
| **What the checker gets** | The hospital's record as the patient sees it. | Structured clinical data from connected organisations. | Confirmation that the hospital issued this exact summary, as at its date, and whether it has since been amended. |
| **What the patient shares** | Their login or their screen, which can show far more than the summary. | Data shared under the exchange's consent rules. | Only the summary they chose to hand over. |
| **Reach** | One hospital or health system's own patients. | The organisations in that region or network. | Global in principle: any hospital, in any country, that publishes hashes on its own domain. |
| **Speed and cost** | Quick for the patient; awkward to hand over at a clinic. | Fast once connected; integration comes first. | A few seconds per check: one web lookup, with no fee to the standard and no integration with the hospital. |
| **What it needs** | A portal account. | Both organisations connected to the same exchange. | The hospital to publish hashes, and Live Verify-aware software on the checker's device. No hospital does this yet. |
| **Best suited to** | The patient's own access to their records. | Clinical handover between connected organisations. | Handovers where the receiving party is on a different system, region or country, and has only the paper. |

**Where each fits:** where the receiving clinician is on the same record system, or a health information exchange links the two organisations, the structured record is the better source and should be used. Many handovers do not look like that: the patient arrives at a clinic, pharmacy or care home on a different system, or in another region or country, carrying the printed discharge packet. Live Verify lets the person reading it confirm that the hospital issued that text, and it sits alongside portals and exchanges rather than competing with them.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).

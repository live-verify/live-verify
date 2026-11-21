---
title: "Medical Imaging Reports (X-Ray, MRI, CT)"
category: "Healthcare & Medical Records"
volume: "Medium"
retention: "10-30 years (diagnostic history)"
slug: "medical-imaging-reports"
verificationMode: "clip"
tags: ["radiology-report", "mri-scan", "ct-scan", "x-ray-findings", "diagnostic-imaging", "medical-verification", "patient-safety", "radiologist-attestation"]
furtherDerivations: 1
---

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 1px solid #ccc; background: #fff; padding: 0; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <div style="background: #0d47a1; color: #fff; padding: 20px; display: flex; justify-content: space-between; align-items: center;">
    <div>
      <div style="font-weight: bold; font-size: 1.2em;"><span verifiable-text="start" data-for="imaging"></span>RADIOLOGY PARTNERS, N.A.</div>
      <div style="font-size: 0.8em; opacity: 0.8;">Diagnostic Imaging Center of Excellence</div>
    </div>
    <div style="text-align: right;">
      <div style="font-size: 0.8em;">Accession #: 26-992288</div>
    </div>
  </div>
<div style="padding: 25px;">
    <div style="border-bottom: 2px solid #0d47a1; padding-bottom: 10px; margin-bottom: 20px;">
      <h3 style="margin: 0; color: #333;">MRI BRAIN W/O CONTRAST</h3>
      <div style="font-size: 0.9em; color: #666;">Patient: <strong>REEVE, MARCUS</strong> (DOB: 02/19/1972)</div>
    </div>
<div style="font-size: 0.95em; line-height: 1.6; color: #333;">
      <p><strong>Clinical Indication:</strong> Persistent headache, post-trauma evaluation.</p>
<div style="background: #fdfdfd; border: 1px solid #eee; padding: 15px; margin: 15px 0; border-radius: 4px;">
        <p style="font-weight: bold; color: #0d47a1; margin-top: 0;">IMPRESSION:</p>
        <p style="margin-bottom: 0;">1. No evidence of acute intracranial hemorrhage or mass effect.<br>
        2. Mild chronic microvascular ischemic changes.<br>
        3. Stable 4mm arachnoid cyst in the left temporal lobe.</p>
      </div>
<p><strong>Radiologist:</strong> Dr. Leslie Thompkins, MD<br>
      <strong>Study Date:</strong> March 15, 2026</p>
    </div>
<div style="margin-top: 25px; padding: 10px; background: #f9f9f9; border: 1px solid #eee; font-size: 0.8em; color: #555; font-style: italic; text-align: center;">
      Verification confirms the radiologist's impression and clinical findings match the primary imaging archive.
    </div>
<div data-verify-line="imaging" style="border-top: 1px dashed #999; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
      title="Demo only: Radiology firm doesn't yet offer verification&#10;endpoints, so this is illustrative">
      <span data-verify-line="imaging">verify:radpartners.com/reports/v</span> <span verifiable-text="end" data-for="imaging"></span>
    </div>
  </div>
</div>

## The Problem: Medical Denial Fraud

- **Negative-to-Positive Editing:** A patient who wants to stay on disability editing a "Normal" MRI to show a "Herniated Disc."
- **Positive-to-Negative Editing:** A pilot or athlete editing a "Cardiac Abnormality" report to "Normal" to pass a physical.
- **Radiologist Impersonation:** Creating a fake report on the letterhead of a famous imaging center to justify an unauthorized surgery or treatment.

## What Is Checked

Patient name, MRN/Accession number, study type (e.g., MRI, CT), anatomical region, radiologist "Impression" (digest), clinical indication, study date, report date, radiologist credentials, facility ID.

**Document Types:**
- **Radiology Report:** The text narrative of findings.
- **DICOM Image Metadata:** (Linked hash) proving the images match the text.
- **Peer Review Letter:** Verification of a second radiologist's opinion.
- **PACS Archive Receipt:** Proving the study is legally stored.

## What the Checker Sees

Shows the issuer domain (`radpartners.com`, `mayoclinic.org`) and current report standing.

**Status Indications:**
- **Final** — Report is verified and signed by the radiologist.
- **Addendum** — A post-signing correction or update was issued.
- **Preliminary** — Unsigned draft; do not base surgery on this version.
- **Void** — Study performed on wrong patient or technically flawed.

## Who Holds It

The Patient benefits from verification.

**Specialist Consultation:** Proving to a neurosurgeon at a different hospital that the "4mm cyst" finding isn't a misprint. A verified hash from the radiology group provides the surgeon with instant trust, allowing them to proceed with a treatment plan without waiting for a 2-week manual records transfer.

**Insurance Appeals:** Providing verified, un-alterable evidence of a diagnostic finding to challenge an insurance denial for a follow-up procedure.

## Who Checks It

**Referring Physicians (PCPs)**
**Diagnostic Trust:** PCPs often receive paper or PDF reports from outside imaging centers. Live Verify ensures the patient hasn't "Self-Edited" the report to remove a mention of cancer or to hide an embarrassing finding before showing it to their family doctor.

**Life & Long-Term Care Insurers**
**Risk Underwriting:** Verifying the "Impression" section of a brain MRI or heart CT before issuing high-value policies. Verification stops the most common "Medical Fraud": removing a single sentence about a pre-existing condition.

**Disability Adjusters**
**Claim Adjudication:** Verifying the structural findings (e.g., "Degenerative Disc Disease") used to justify a long-term disability claim.

## Who Issues It

**Issuer Types** (First Party)

**Radiology Groups:** (National or local imaging centers).
**Hospital Systems.**
**PACS Vendors:** (e.g., GE Healthcare, Fuji - who host the hashes on behalf of doctors).

**Privacy Salt:** ABSOLUTELY CRITICAL. Imaging reports contain highly sensitive clinical data. The hash MUST be salted to prevent "Mass Mapping" of patients with specific neurological or cardiac conditions.

## Authority Chain

**Pattern:** Regulated

Radiology departments issue medical imaging reports under health professional regulator authority (HCPC in the UK).

```
✓ radiology.nhs.uk/imaging/verify — Issues medical imaging reports
  ✓ hcpc-uk.org — Regulates health and care professionals in the UK
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Where Each Fits: Live Verify, Patient Portals and Image Transfer

Patient portals, run by hospitals and imaging centres, let patients see their own reports, and images move between providers on CDs or through image-exchange links. Live Verify answers a narrower question about the printed report the patient hands over: did this imaging centre issue this exact text? The three work side by side.

| | Patient portal | CD-ROM or image-exchange link | Live Verify on the printed report |
| :--- | :--- | :--- | :--- |
| **Who can check** | The patient, and anyone they log in for or grant access to. | A clinician with a CD drive, a viewer, or access to the exchange. | Anyone handed the report: a specialist, an insurer, an employer's medical officer. |
| **What the checker gets** | The patient's record as the provider holds it, often much more than one report. | The images themselves, sometimes with the report. | Confirmation that the imaging centre issued this exact report text, and whether an addendum has been issued. No images. |
| **What the patient shares** | Often access to a wider record than the one report. | The study on the disc or behind the link. | Only the report they chose to hand over. |
| **Reach** | The provider's own portal; sharing across different systems is uneven. | Wherever the receiving clinic can read the disc or reach the exchange. | Global in principle: any imaging provider, in any country, that publishes hashes on its own domain. |
| **Speed and cost** | Quick for the patient once logged in; slower to share with a third party. | Can be slow: discs are posted or carried, links need setting up. | A few seconds per check: one web lookup, with no fee to the standard and no account with the imaging centre. |
| **What it needs** | An account with the provider and a login. | Compatible hardware or software, or a connection to the exchange. | The imaging centre to publish hashes, and Live Verify-aware software on the checker's device. No imaging provider does this yet. |
| **Best suited to** | Patients viewing their own results; clinicians on the same records system. | Moving the images a specialist needs to review. | Confirming a printed or PDF report from another provider, without exposing the wider record. |

**Where each fits:** A patient portal is the best way for patients to see their own records, and where two clinicians share a records system or an image exchange the specialist should use it, not least because it gives access to the images themselves. Often the specialist is in a separate practice and the patient arrives with a printed report. Live Verify lets the specialist confirm the imaging centre issued that report, without the patient opening their whole history; the images still travel by the usual routes.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).

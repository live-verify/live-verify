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

## Jurisdictional Witnessing (Optional)

An independent witness layer may apply — see [Witnessing Third Parties](../../docs/WITNESSING-THIRD-PARTIES.md) for the full mechanism (what a witness receives, non-repudiation, optional public-blockchain rollups). For this use case: a witness would receive the radiology group's hashes and status changes plus structured metadata (patient accession numbers, study types, radiologist names, study dates, report status) — never sensitive clinical details — providing non-repudiation of the imaging report.


## Compared With Patient Portals / CD-ROMs

| Feature | Live Verify | Patient Portal (MyChart) | CD-ROM / PACS Link |
| :--- | :--- | :--- | :--- |
| **User Control** | **High.** Patient shares only the *Summary*. | **Low.** App access often reveals *full* clinical history. | **Vulnerable.** |
| **Trust Anchor** | **Domain-Bound.** Bound to the Lab. | **System-Bound.** | **Zero.** Easily forged files. |
| **Interoperability** | **Universal.** Works for any specialist. | **Siloed.** Hard to share across systems. | **Hardware-Locked.** |
| **Speed** | **Instant.** 5-second scan. | **Slow.** Requires 2FA and login. | **Very Slow.** |

**Where each fits:** A patient portal is the best way for patients to see their own records, and where two clinicians share a records system or an image exchange the specialist should use it, not least because it gives access to the images themselves. Often the specialist is in a separate practice and the patient arrives with a printed report. Live Verify lets the specialist confirm the imaging centre issued that report, without the patient opening their whole history; the images still travel by the usual routes.

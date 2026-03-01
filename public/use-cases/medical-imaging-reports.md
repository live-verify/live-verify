---
title: "Medical Imaging Reports (X-Ray, MRI, CT)"
category: "Healthcare & Medical Records"
volume: "Medium"
retention: "10-30 years (diagnostic history)"
slug: "medical-imaging-reports"
tags: ["radiology-report", "mri-scan", "ct-scan", "x-ray-findings", "diagnostic-imaging", "medical-verification", "patient-safety", "radiologist-attestation"]
furtherDerivations: 1
---

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 1px solid #ccc; background: #fff; padding: 0; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <div style="background: #0d47a1; color: #fff; padding: 20px; display: flex; justify-content: space-between; align-items: center;">
    <div>
      <div style="font-weight: bold; font-size: 1.2em;"><span verifiable-text="start" data-for="imaging">[</span>RADIOLOGY PARTNERS, N.A.</div>
      <div style="font-size: 0.8em; opacity: 0.8;">Diagnostic Imaging Center of Excellence</div>
    </div>
    <div style="text-align: right;">
      <div style="font-size: 0.8em;">Accession #: 26-992288</div>
    </div>
  </div>
<div style="padding: 25px;">
    <div style="border-bottom: 2px solid #0d47a1; padding-bottom: 10px; margin-bottom: 20px;">
      <h3 style="margin: 0; color: #333;">MRI BRAIN W/O CONTRAST</h3>
      <div style="font-size: 0.9em; color: #666;">Patient: <strong>WAYNE, BRUCE</strong> (DOB: 02/19/1972)</div>
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
      verify:radpartners.com/reports/v <span verifiable-text="end" data-for="imaging">]</span>
    </div>
  </div>
</div>

## Data Verified

Patient name, MRN/Accession number, study type (e.g., MRI, CT), anatomical region, radiologist "Impression" (digest), clinical indication, study date, report date, radiologist credentials, facility ID.

**Document Types:**
- **Radiology Report:** The text narrative of findings.
- **DICOM Image Metadata:** (Linked hash) proving the images match the text.
- **Peer Review Letter:** Verification of a second radiologist's opinion.
- **PACS Archive Receipt:** Proving the study is legally stored.

## Data Visible After Verification

Shows the issuer domain (`radpartners.com`, `mayoclinic.org`) and current report standing.

**Status Indications:**
- **Final** — Report is verified and signed by the radiologist.
- **Addendum** — **ALERT:** A post-signing correction or update was issued.
- **Preliminary** — Unsigned draft; do not base surgery on this version.
- **Void** — Study performed on wrong patient or technically flawed.

## Second-Party Use

The **Patient** benefits from verification.

**Specialist Consultation:** Proving to a neurosurgeon at a different hospital that the "4mm cyst" finding isn't a misprint. A verified hash from the radiology group provides the surgeon with instant trust, allowing them to proceed with a treatment plan without waiting for a 2-week manual records transfer.

**Insurance Appeals:** Providing verified, un-alterable evidence of a diagnostic finding to challenge an insurance denial for a follow-up procedure.

## Third-Party Use

**Referring Physicians (PCPs)**
**Diagnostic Trust:** PCPs often receive paper or PDF reports from outside imaging centers. Live Verify ensures the patient hasn't "Self-Edited" the report to remove a mention of cancer or to hide an embarrassing finding before showing it to their family doctor.

**Life & Long-Term Care Insurers**
**Risk Underwriting:** Verifying the "Impression" section of a brain MRI or heart CT before issuing high-value policies. Verification stops the most common "Medical Fraud": removing a single sentence about a pre-existing condition.

**Disability Adjusters**
**Claim Adjudication:** Verifying the structural findings (e.g., "Degenerative Disc Disease") used to justify a long-term disability claim.

## Verification Architecture

**The "Medical Denial" Fraud Problem**

- **Negative-to-Positive Editing:** A patient who wants to stay on disability editing a "Normal" MRI to show a "Herniated Disc."
- **Positive-to-Negative Editing:** A pilot or athlete editing a "Cardiac Abnormality" report to "Normal" to pass a physical.
- **Radiologist Impersonation:** Creating a fake report on the letterhead of a famous imaging center to justify an unauthorized surgery or treatment.

**Issuer Types** (First Party)

**Radiology Groups:** (National or local imaging centers).
**Hospital Systems.**
**PACS Vendors:** (e.g., GE Healthcare, Fuji - who host the hashes on behalf of doctors).

**Privacy Salt:** ABSOLUTELY CRITICAL. Imaging reports contain highly sensitive clinical data. The hash MUST be salted to prevent "Mass Mapping" of patients with specific neurological or cardiac conditions.

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


## Competition vs. Patient Portals / CD-ROMs

| Feature | Live Verify | Patient Portal (MyChart) | CD-ROM / PACS Link |
| :--- | :--- | :--- | :--- |
| **User Control** | **High.** Patient shares only the *Summary*. | **Low.** App access often reveals *full* clinical history. | **Vulnerable.** |
| **Trust Anchor** | **Domain-Bound.** Bound to the Lab. | **System-Bound.** | **Zero.** Easily forged files. |
| **Interoperability** | **Universal.** Works for any specialist. | **Siloed.** Hard to share across systems. | **Hardware-Locked.** |
| **Speed** | **Instant.** 5-second scan. | **Slow.** Requires 2FA and login. | **Very Slow.** |

**Why Live Verify wins here:** The "Clinical Handoff." Specialists often work in offices separate from where the scan was taken. They meet patients who bring paper reports. They don't have time to log into 10 different hospital portals. Live Verify turns the **Physical Radiology Report** into a live, trusted clinical link that provides "Radiology-Grade" trust in seconds.

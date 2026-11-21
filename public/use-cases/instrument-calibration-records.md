---
title: "Scientific Instrument Calibration Records"
category: "Scientific & Research"
volume: "Very Small"
retention: "5-10 years (data validity)"
slug: "instrument-calibration-records"
verificationMode: "clip"
tags: ["metrology", "scientific-instruments", "laboratory-compliance", "calibration-log", "glp-compliance", "data-integrity", "research-quality"]
furtherDerivations: 1
---

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <span verifiable-text="start" data-for="sci-cal"></span>
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;">QUANTUM ANALYTICS LABS
Metrology & Calibration Services
═══════════════════════════════════════════════════════════════════

INSTRUMENT IDENTIFICATION
───────────────────────────────────────────────────────────────────
Instrument:   Mass Spectrometer (Agilent 6470B)
Serial #:     AG-99228877-X
Asset ID:     QL-402

CALIBRATION DATA
───────────────────────────────────────────────────────────────────
Calibration Date:    March 15, 2026
Calibration Result:  PASS (In-Tolerance)
Reference Standard:  NIST SRM-2210

Technician:   Dr. Aris Vrettos, Ph.D.
Environment:  21.2°C / 42% Humidity

________________________                        Log ID: CAL-9928-X
Certified Digital Signature

</pre>
<span data-verify-line="sci-cal">verify:quantum-labs.com/calibration/v</span> <span verifiable-text="end" data-for="sci-cal"></span>
</div>

## The Problem: Dry-Labbing Fraud

- **Fabricated Logs:** Lazy technicians writing "In-Tolerance" numbers in a logbook without actually running the 4-hour calibration sequence.
- **Date Alteration:** Editing a 2024 certificate to look like 2026 to avoid the $2,000 service fee.
- **Traceability Fraud:** Claiming a link to NIST or ISO standards when the lab's own gear is unverified.

## What Is Checked

Instrument model/serial number, Asset ID, calibration date, technician name/Ph.D., reference standards used (NIST traceability), environmental conditions during test, PASS/FAIL status, specific drift measurements, issuing lab domain.

**Document Types:**
- **Instrument Calibration Record:** The primary technical proof of accuracy.
- **Service Log Extract:** For routine maintenance tracking.
- **Validation Protocol (IQ/OQ/PQ):** Proving the machine is installed correctly.
- **Deviation Report:** (Linked hash) for measurements taken out-of-tolerance.

## What the Checker Sees

Shows the issuer domain (the Calibration Lab or Manufacturer) and current record status.

**Status Indications:**
- **Certified** — Data matches the lab's secure digital vault.
- **Expired** — Re-calibration is overdue; current data is unverified.
- **Adjusted** — Instrument was modified to return to spec.
- **Retracted** — Data voided due to reference standard error.

## Who Holds It

The Lab Manager (second party) receives the calibration record from the calibration lab (first party), keeps it, and may later hand it to third parties for various reasons, or never do so.

**Personal Record:** They have their own verified copy of the instrument's calibration status. Most of the time, the record sits in their lab's quality files—the verification value is latent, there *if needed*.

**Peace of Mind:** They can confirm at any time that the calibration matches what the lab's system recorded and meets NIST traceability requirements.

**Future Optionality:** If a dispute arises—whether about data quality, regulatory audits, or publication challenges—they have cryptographic proof ready without needing to contact the calibration lab.

## Who Checks It

The lab manager (second party) may hand the verified document to various third parties:

**Peer Reviewers / Journal Editors**
**Integrity Vetting:** Instantly verifying the "Equipment Section" of a manuscript. Live Verify ensures the authors didn't "Smooth" the calibration data to hide noise in their results.

**FDA / Regulatory Auditors**
**GXP Audits:** During a clinical trial audit, inspectors can scan the stickers on the lab gear. "Verified by Agilent" or "Verified by Quantum Labs" ensures the instruments were in-tolerance on the date the patient samples were run.

**Legal Expert Witnesses**
**Forensic Accuracy:** In patent or liability litigation, verifying the historical accuracy of the instruments used to generate the evidence.

## Who Issues It

**Issuer Types (First Party)**

- OEM Service Depts (Agilent, Thermo Fisher, Shimadzu)
- Independent Accredited Labs (ISO 17025 certified)
- University Metrology Units

**Privacy Salt:** Not required. Calibration records contain many unpredictable variables that combine to create sufficient entropy—instrument serial number (unique alphanumeric), specific drift measurements (continuous values with multiple decimal places), environmental conditions (temperature/humidity to precise decimals), technician credentials (non-enumerable names and IDs), reference standard batch numbers, and precise calibration dates/times. The combination makes reverse-engineering a specific calibration record computationally infeasible without already knowing all the details.

## Authority Chain

**Pattern:** Regulated

Accredited calibration labs provide NIST-traceable calibrations following ISO/IEC 17025 standards.

```
✓ calibration.npl.co.uk — Calibrates scientific instruments against NIST standards
  ✓ ukas.com — Accredits UK calibration laboratories
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Where Each Fits: Live Verify and Laboratory Information Systems

A laboratory information management system (LIMS), such as LabWare, is the database a lab uses to track samples, instruments and calibration history. It is run by the lab itself and is open only to its own staff. The LIMS and Live Verify answer different questions and work side by side: one is the lab's internal record, the other lets an outside reader confirm a calibration record the lab has issued.

| | Laboratory information system | Live Verify on the calibration record | Scanned PDF record |
| :--- | :--- | :--- | :--- |
| **Who can check** | Lab staff with a login. | Anyone handed the record or scanning the instrument's sticker: a journal, an auditor, a regulator, an expert witness. | Nobody; it can only be taken on trust. |
| **What the checker gets** | The full instrument history, as the lab currently holds it. | Confirmation that the calibration lab issued this exact record, including the serial number and results, as at its date, and whether it has been withdrawn. | A document that may have been edited. |
| **What the lab shares** | Nothing outside the lab. | Only the record it chose to hand over. | Only the record it chose to hand over. |
| **Reach** | One lab's system. | Global in principle: any calibration lab, in any country, that publishes hashes on its own domain. | Anywhere, but untrusted. |
| **Speed and cost** | Immediate for staff; outsiders do not get access. | A few seconds per check: one web lookup, with no fee to the standard and no login. | Immediate. |
| **What it needs** | The lab's own software and administration. | The calibration lab to publish hashes, and Live Verify-aware software on the checker's device. No calibration lab does this yet. | Nothing. |
| **Best suited to** | Day-to-day sample and instrument management inside the lab. | Readers outside the lab who need to rely on a specific calibration record. | Nothing where results depend on it. |

**Where each fits:** A LIMS is the right system of record inside the laboratory, and nothing here replaces it for day-to-day sample and instrument management. The gap is the reader outside the lab: a journal, an auditor or a regulator who receives a calibration PDF and will never be given a LIMS login. Live Verify lets that reader confirm the lab stands behind the exact record, while the LIMS carries on as the source it was exported from.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).

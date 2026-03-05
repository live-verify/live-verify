---
title: "Doctor's Notes / Fit Notes"
category: "Healthcare & Medical Records"
volume: "Very Large"
retention: "1-3 years (employment/education records)"
slug: "doctors-notes"
verificationMode: "clip"
tags: ["doctors-note", "sick-note", "fit-note", "medical-certificate", "absence", "school", "employer", "fitness-to-work"]
furtherDerivations: 2
---

## What is a Doctor's Note?

Your child has been off school for a week with tonsillitis. The school wants a note. Your doctor writes one. The school receives a piece of paper — or a PDF — that says the child was genuinely ill. But how does the school know it's real? They don't. They can't call the doctor (patient confidentiality). They can't check any database. They just... trust the paper.

Now scale that up. An employee misses two weeks of work. HR receives a doctor's note. Is it genuine? Was it issued by a real doctor? Does the date range match what the employee claimed? HR has no way to verify any of this. Fake doctor's notes are trivially available online — dozens of websites sell realistic templates for a few dollars, complete with letterhead, signatures, and plausible medical language.

In the UK, this document is formally called a **Fit Note** (Statement of Fitness for Work) or colloquially a **sick note**. In the US, it's a **doctor's note** or **doctor's excuse**. In Australia, a **medical certificate**. The names differ but the problem is universal: these documents are trivially forged, and the recipients have no practical way to verify them.

With Live Verify, the doctor's note carries a `verify:` line bound to the medical practice's domain. The employer, the school, or the university scans it and gets instant confirmation: real note, real doctor, correct dates, currently valid.

<div style="max-width: 500px; margin: 24px auto; font-family: sans-serif; border: 1px solid #ccc; border-radius: 8px; background: #fff; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.15);">
  <div style="background: #2c3e50; color: #fff; padding: 14px 18px;">
    <div style="font-weight: bold; font-size: 1.1em;"><span verifiable-text="start" data-for="dn1">[ </span>Riverside Family Practice</div>
    <div style="font-size: 0.8em; margin-top: 2px;">17 Thames Walk, Richmond, London TW9 1LR</div>
    <div style="font-size: 0.75em; margin-top: 2px;">Tel: 020 8940 0456</div>
  </div>
  <div style="padding: 18px; font-size: 0.9em; line-height: 1.7; color: #222;">
    <div style="text-align: center; font-weight: bold; font-size: 1.05em; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 1px;">Statement of Fitness for Work</div>
    <div style="margin-bottom: 12px;">
      <strong>Patient:</strong> SARAH JANE COLLINS<br>
      <strong>DOB:</strong> 14/03/1991
    </div>
    <div style="background: #f7f9fb; padding: 12px; border-radius: 4px; margin-bottom: 12px;">
      I assessed your case on <strong>24 February 2026</strong><br><br>
      I advise you that you are <strong>not fit for work</strong><br><br>
      <strong>From:</strong> 24 February 2026<br>
      <strong>To:</strong> 7 March 2026<br><br>
      <strong>Condition:</strong> Acute respiratory infection<br>
      <strong>Comments:</strong> Rest advised. Review if not improving by end of period.
    </div>
    <div style="margin-bottom: 12px;">
      <strong>Dr. Rajesh Patel</strong><br>
      MB BS, MRCGP<br>
      GMC No: 6189234<br>
      <em style="font-size: 0.85em; color: #555;">Signature: R. Patel (electronic)</em>
    </div>
    <div data-verify-line="dn1" style="border-top: 1px dashed #999; padding-top: 8px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;">
      verify:riversidefp.nhs.uk/fit <span verifiable-text="end" data-for="dn1">]</span>
    </div>
  </div>
</div>

<div style="max-width: 500px; margin: 24px auto; font-family: sans-serif; border: 1px solid #ccc; border-radius: 8px; background: #fff; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.15);">
  <div style="background: #1a5276; color: #fff; padding: 14px 18px;">
    <div style="font-weight: bold; font-size: 1.1em;"><span verifiable-text="start" data-for="dn2">[ </span>Maple Grove Pediatrics</div>
    <div style="font-size: 0.8em; margin-top: 2px;">2200 Maple Avenue, Suite 150, Evanston, IL 60201</div>
    <div style="font-size: 0.75em; margin-top: 2px;">Tel: (847) 555-0198</div>
  </div>
  <div style="padding: 18px; font-size: 0.9em; line-height: 1.7; color: #222;">
    <div style="text-align: center; font-weight: bold; font-size: 1.05em; margin-bottom: 12px;">Medical Excuse</div>
    <div style="margin-bottom: 12px;">
      <strong>Patient:</strong> ETHAN MICHAEL WRIGHT<br>
      <strong>DOB:</strong> 05/12/2014<br>
      <strong>Parent/Guardian:</strong> Jennifer Wright
    </div>
    <div style="background: #f7f9fb; padding: 12px; border-radius: 4px; margin-bottom: 12px;">
      Ethan was seen in this office on <strong>February 20, 2026</strong>.<br><br>
      He was diagnosed with <strong>streptococcal pharyngitis</strong> and placed on antibiotics.<br><br>
      <strong>Excused from school:</strong> February 20-24, 2026<br>
      <strong>May return to school:</strong> February 25, 2026<br>
      <strong>Restrictions:</strong> No PE for 48 hours after return
    </div>
    <div style="margin-bottom: 12px;">
      <strong>Dr. Lisa Chen, MD, FAAP</strong><br>
      IL License: 036-098234<br>
      NPI: 1234567890<br>
      <em style="font-size: 0.85em; color: #555;">Signature: L. Chen (electronic)</em>
    </div>
    <div data-verify-line="dn2" style="border-top: 1px dashed #999; padding-top: 8px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;">
      verify:maplegrovepeds.com/notes <span verifiable-text="end" data-for="dn2">]</span>
    </div>
  </div>
</div>

## Data Verified

Patient name, doctor name, doctor credentials (medical license, registration number), practice name and address, date of assessment, fitness determination (fit / not fit / may be fit with adjustments), date range of absence, return date (if specified), any workplace restrictions or adjustments.

**NOT included:** Detailed diagnosis is often included by convention but is not required for verification. The note proves the doctor *assessed the patient* and *recommended the absence* — the medical details are between doctor and patient.

## Verification Response

The endpoint returns a status code:

- **VALID** — Note is current and within its stated date range
- **EXPIRED** — The absence period has passed
- **EXTENDED** — The original note has been superseded by a longer absence period
- **CANCELLED** — Doctor withdrew the note (e.g., patient returned to work early)
- **RETURNED** — Patient has been cleared to return (useful for employers tracking fitness)
- **404** — No matching record; possible forgery

## Second-Party Use

The **Patient** (or parent/guardian) receives the note from the doctor (first party) and presents it to employers, schools, or universities.

**Proving absence to employer** — the most common use. Employee emails or hands HR a doctor's note. HR scans the `verify:` line and confirms the absence dates and the issuing practice. No phone calls to the surgery, no waiting, no ambiguity.

**School absence justification** — parent provides verified note to school office. The school confirms dates, confirming the child's absence was medically justified. Particularly important where attendance affects funding or legal compliance (truancy laws).

**University assessment deferrals** — student requests an exam deferral or assignment extension citing illness. The university scans the note and confirms it covers the relevant dates. Eliminates the suspicion that plagues self-certified absence claims during exam season.

**Insurance claims** — some travel or income protection insurance policies require proof of illness. A verified doctor's note is stronger evidence than an unverifiable photocopy.

## Third-Party Use

**Employers / HR Departments**
The primary verifier. HR receives dozens of doctor's notes per month in any large organization. Currently, every single one is accepted on trust. Verified notes let HR distinguish genuine medical absence from fraud without invading medical privacy — they confirm the note is real without needing to know the diagnosis.

**Schools and Universities**
Attendance officers and exam boards deal with a flood of medical documentation, especially around exam periods. Universities report spikes in doctor's notes during finals week — verified notes make the genuine ones stand out.

**Occupational Health**
When an employee returns from long-term sickness, occupational health may need to confirm the original absence documentation before approving a phased return.

**Courts / Tribunals**
Employment tribunals occasionally need to verify sickness absence records. A chain of verified doctor's notes provides an auditable trail.

**Childcare Providers**
Nurseries and childcare facilities may require medical clearance before accepting a child back after illness (particularly for communicable diseases).

## Verification Architecture — The Fake Doctor's Note Problem

- **Template fraud:** Websites sell realistic doctor's note templates for $10-30. Complete with letterhead, signatures, and plausible medical language. The buyer fills in their name and dates. Recipients have no way to distinguish these from genuine notes.
- **Self-authored notes:** Some patients write their own notes and forge a doctor's signature. With real letterhead obtained from a previous genuine visit, these are virtually undetectable.
- **Date manipulation:** A genuine note for one day is altered to cover a week. Photocopiers and PDF editors make this trivial.
- **Recycled notes:** A genuine note from a previous illness is presented for a current absence, with dates crudely altered.
- **Complicit providers:** Some walk-in clinics and telemedicine providers issue notes with minimal or no examination. The note is "real" in that a doctor signed it, but the assessment was perfunctory. Live Verify doesn't solve this (the note would verify as genuine), but the authority chain signals whether the issuing practice is recognized by a credible medical body.

## Privacy Salt

Recommended but less critical than for prescriptions. Doctor's notes contain the patient's name and absence dates but typically minimal clinical detail. Salt prevents an attacker from hashing known employee names with date ranges to check whether a specific person was signed off sick. For small practices where the patient pool is guessable, salt is important.

## Authority Chain

Medical practice domain (e.g., `riversidefp.nhs.uk`) &rarr; medical licensing body (GMC in UK, state medical board in US) &rarr; statute (Medical Act 1983 in UK, state medical practice acts in US). For NHS Fit Notes specifically: NHS England provides the statutory framework. See [Authority Chain Specification](/specs/authority-chain) for the full protocol.

## Competition

| Feature | Live Verify | Calling the Surgery | Employer Trusts the Paper | Telemedicine Platforms | Occupational Health Review |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Speed** | **Instant.** 5-second scan. | **Slow.** Minutes to days. Often impossible after hours. | **Instant.** Zero verification. | **Fast** (within platform). | **Slow.** Days to weeks. |
| **Scalable** | **Yes.** Works for 10 or 10,000 notes/month. | **No.** Each call is manual. | **Yes** (by accepting everything). | **Partial.** Platform-specific. | **No.** Manual review per case. |
| **Detects forgery** | **Yes.** Hash mismatch = forgery. | **Yes** (if you reach the doctor). | **No.** | **Partial.** Within their system only. | **Maybe.** Experienced reviewer. |
| **Privacy-preserving** | **Yes.** Confirms authenticity without revealing diagnosis. | **No.** Receptionist may disclose information. | **N/A.** | **Partial.** | **No.** Full medical details reviewed. |
| **Cross-border** | **Yes.** Domain-based, works internationally. | **Fails.** Time zones, language, no obligation. | **Fails.** Foreign notes are untrusted. | **Fails.** Platform lock-in. | **Fails.** Jurisdiction-specific. |

**Why Live Verify wins here:** The current system is binary — trust the paper completely or don't trust it at all. Calling the surgery is theoretically possible but practically impossible at scale. Employers accept fake notes because the alternative (challenging every note) destroys the employment relationship. Live Verify adds verification without confrontation — HR scans the note, it's confirmed or it isn't. No awkward phone calls, no accusations.

## Jurisdictional Witnessing

A jurisdiction may require the medical practice to retain a **witnessing firm** for regulatory compliance. The witnessing firm:

- Receives all hashes from the practice, and any subsequent changes to the payload as they happen — which may manifest as a new hash, a status change (EXTENDED, RETURNED, CANCELLED), or even a 404 (record deleted)
- Receives structured content/metadata (date ranges, practice identifier, note type)
- Does **NOT** receive plaintext (patient names, diagnoses, medical details)
- Provides an immutable, timestamped audit trail — available to the jurisdiction on demand, to patients/employers during disputes, or as expert witness testimony in legal proceedings

This provides:
- **Non-repudiation:** Practice cannot deny issuing the note
- **Timestamp proof:** Note existed at a specific time (critical for employment disputes)
- **Regulatory audit:** Healthcare regulators can inspect issuing patterns for anomalies
- **Resilience:** Verification works even if the practice closes or changes systems

**Public Blockchain (Non-Party)**

Witnessing firms may periodically commit rollups to an inexpensive public blockchain, providing an ultimate immutability guarantee. The blockchain is a "non-party" — infrastructure, not a participant in the transaction. This creates multiple verification paths:

1. **Practice domain** — Direct check against the issuer
2. **Witnessing firm** — Independent confirmation with timestamp
3. **Public blockchain** — Decentralized trust anchor via rollup inclusion

## Further Derivations

1. **Fit-with-adjustments notes** — The UK Fit Note allows a doctor to certify that a patient *may be fit* for work with specific adjustments (modified hours, altered duties, workplace adaptations). A verified fit-with-adjustments note lets the employer confirm both the adjustment recommendations and their source, streamlining the return-to-work process without requiring occupational health involvement for straightforward cases.

2. **Mental health crisis notes** — When a student or employee experiences a mental health crisis, the treating clinician can issue a verified note confirming incapacity without disclosing the nature of the condition. This is particularly valuable in contexts where mental health stigma prevents people from seeking documentation — the verification confirms "a real clinician assessed this person" without revealing whether the issue was physical or psychological.

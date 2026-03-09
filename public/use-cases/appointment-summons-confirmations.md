---
title: "Appointment & Summons Confirmations"
category: "Healthcare & Medical Records"
volume: "Very Large"
retention: "1-6 months (appointment); years (legal summons)"
slug: "appointment-summons-confirmations"
verificationMode: "clip"
tags: ["appointment", "summons", "jury-duty", "court-date", "hospital", "dental", "absence", "employer", "school", "obligation"]
furtherDerivations: 3
---

## What is an Appointment Confirmation?

You have a hospital appointment at 2pm on Thursday. You need the afternoon off work. You show your manager the appointment letter. They look at it, nod, and approve the absence. But did they verify it? No. Could you have made that letter in five minutes with a word processor? Yes.

Now consider the harder cases. A court summons. A jury duty notice. A probation appointment. A custody hearing. These aren't optional — attendance is legally compelled — yet the employee still has to convince their employer with a piece of paper that nobody checks.

The problem isn't that employers *want* to doubt their employees. It's that they *can't verify* even when they want to. HR receives an appointment letter on NHS letterhead, or a jury summons that looks official, and they simply trust it. Fake jury duty letters are [widely available online](https://www.google.com/search?q=fake+jury+duty+letter+template). Fake hospital appointment letters require nothing more than headed paper from a previous genuine letter.

With Live Verify, the appointment confirmation carries a `verify:` line. The employer scans it and gets instant confirmation: real appointment, real institution, correct date. No phone calls to the hospital switchboard. No awkward suspicion.

<div style="max-width: 500px; margin: 24px auto; font-family: sans-serif; border: 1px solid #ccc; border-radius: 8px; background: #fff; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.15);">
  <div style="background: #003087; color: #fff; padding: 14px 18px;">
    <div style="font-weight: bold; font-size: 1.1em;"><span verifiable-text="start" data-for="ap1">[ </span>St Thomas' Hospital</div>
    <div style="font-size: 0.8em; margin-top: 2px;">Guy's and St Thomas' NHS Foundation Trust</div>
    <div style="font-size: 0.75em; margin-top: 2px;">Westminster Bridge Road, London SE1 7EH</div>
  </div>
  <div style="padding: 18px; font-size: 0.9em; line-height: 1.7; color: #222;">
    <div style="text-align: center; font-weight: bold; font-size: 1.05em; margin-bottom: 12px;">Outpatient Appointment</div>
    <div style="margin-bottom: 12px;">
      <strong>Patient:</strong> JAMES ROBERT CHEN<br>
      <strong>NHS No:</strong> 943 826 1057<br>
      <strong>DOB:</strong> 22/07/1988
    </div>
    <div style="background: #f7f9fb; padding: 12px; border-radius: 4px; margin-bottom: 12px;">
      <strong>Department:</strong> Cardiology Outpatients<br>
      <strong>Consultant:</strong> Dr. A. Kapoor<br><br>
      <strong>Date:</strong> Thursday 12 March 2026<br>
      <strong>Time:</strong> 14:15<br>
      <strong>Location:</strong> East Wing, 4th Floor, Room 4.12<br><br>
      <em style="font-size: 0.85em;">Please allow 2 hours for this appointment including tests.</em>
    </div>
    <div data-verify-line="ap1" style="border-top: 1px dashed #999; padding-top: 8px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;">
      verify:gstt.nhs.uk/appointments <span verifiable-text="end" data-for="ap1">]</span>
    </div>
  </div>
</div>

<div style="max-width: 500px; margin: 24px auto; font-family: sans-serif; border: 1px solid #ccc; border-radius: 8px; background: #fff; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.15);">
  <div style="background: #1a1a2e; color: #fff; padding: 14px 18px;">
    <div style="font-weight: bold; font-size: 1.1em;"><span verifiable-text="start" data-for="ap2">[ </span>United States District Court</div>
    <div style="font-size: 0.8em; margin-top: 2px;">Northern District of Illinois, Eastern Division</div>
  </div>
  <div style="padding: 18px; font-size: 0.9em; line-height: 1.7; color: #222;">
    <div style="text-align: center; font-weight: bold; font-size: 1.05em; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 1px;">Jury Summons</div>
    <div style="margin-bottom: 12px;">
      <strong>To:</strong> MARIA ELENA VASQUEZ<br>
      <strong>Juror ID:</strong> ND-IL-2026-08834
    </div>
    <div style="background: #f7f9fb; padding: 12px; border-radius: 4px; margin-bottom: 12px;">
      You are hereby summoned to appear for jury service.<br><br>
      <strong>Report Date:</strong> Monday, March 16, 2026<br>
      <strong>Report Time:</strong> 8:00 AM<br>
      <strong>Location:</strong> Everett McKinley Dirksen U.S. Courthouse<br>
      219 S. Dearborn Street, Chicago, IL 60604<br><br>
      <strong>Expected Duration:</strong> Up to 2 weeks<br><br>
      <em style="font-size: 0.85em;">Failure to appear may result in contempt of court.</em>
    </div>
    <div style="margin-bottom: 12px;">
      <strong>Clerk of Court:</strong> Thomas G. Bruton<br>
      <em style="font-size: 0.85em;">Issued: February 14, 2026</em>
    </div>
    <div data-verify-line="ap2" style="border-top: 1px dashed #999; padding-top: 8px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;">
      verify:ilnd.uscourts.gov/jury <span verifiable-text="end" data-for="ap2">]</span>
    </div>
  </div>
</div>

<div style="max-width: 500px; margin: 24px auto; font-family: sans-serif; border: 1px solid #ccc; border-radius: 8px; background: #fff; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.15);">
  <div style="background: #2c3e50; color: #fff; padding: 14px 18px;">
    <div style="font-weight: bold; font-size: 1.1em;"><span verifiable-text="start" data-for="ap3">[ </span>Magistrates' Court</div>
    <div style="font-size: 0.8em; margin-top: 2px;">Thames Magistrates' Court, Bow Road, London E3 4DJ</div>
  </div>
  <div style="padding: 18px; font-size: 0.9em; line-height: 1.7; color: #222;">
    <div style="text-align: center; font-weight: bold; font-size: 1.05em; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 1px;">Witness Summons</div>
    <div style="margin-bottom: 12px;">
      <strong>To:</strong> DAVID ALAN OKONKWO<br>
      <strong>Case Reference:</strong> MC-2026-TH-04421
    </div>
    <div style="background: #f7f9fb; padding: 12px; border-radius: 4px; margin-bottom: 12px;">
      You are required to attend court to give evidence.<br><br>
      <strong>Date:</strong> Wednesday 18 March 2026<br>
      <strong>Time:</strong> 10:00 AM<br>
      <strong>Court Room:</strong> 3<br><br>
      <em style="font-size: 0.85em;">This summons is issued under Section 97 of the Magistrates' Courts Act 1980. Failure to attend without reasonable excuse is a criminal offence.</em>
    </div>
    <div data-verify-line="ap3" style="border-top: 1px dashed #999; padding-top: 8px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;">
      verify:hmcts.gov.uk/summons <span verifiable-text="end" data-for="ap3">]</span>
    </div>
  </div>
</div>

## Data Verified

Institution name and type, patient/recipient name, appointment or hearing date, appointment time, department or court (not the medical reason or legal case details), issuing officer or clerk, reference number.

**NOT included:** For medical appointments, the reason for the appointment is not verified — only that an appointment exists. For court summons, the nature of the case is not disclosed — only that attendance is required. The document proves *obligation*, not *circumstance*.

## Verification Response

The endpoint returns a status code:

- **CONFIRMED** — Appointment or summons is current and scheduled
- **COMPLETED** — The date has passed and the person attended
- **RESCHEDULED** — The original date has changed (new date may or may not be disclosed)
- **CANCELLED** — Appointment or summons has been withdrawn
- **ADJOURNED** — Court/hearing date postponed (legal proceedings)
- **EXCUSED** — Person has been excused from jury duty or witness obligation
- **404** — No matching record; possible forgery

## Second-Party Use

The **Recipient** (patient, juror, witness, defendant) receives the confirmation from the institution (first party) and presents it to their employer, school, or university.

**Medical appointment absence** — the most common scenario. Employee shows HR a hospital appointment letter. HR scans the `verify:` line and confirms a real appointment at a real hospital on the stated date. No phone calls to the hospital switchboard (which wouldn't confirm appointments anyway, citing patient confidentiality).

**Jury duty notification to employer** — employee notifies employer they've been summoned. Employer scans the summons and confirms it's genuine. Particularly important because employers are legally required to release employees for jury service (Juries Act 1974 in UK, 28 U.S.C. § 1875 in US) — but they currently have no way to verify the summons is real.

**Court attendance for school/university** — student has a court date (as witness, defendant, or juror). University scans the summons to confirm dates for exam deferrals or attendance exemptions.

**Probation or parole appointments** — individual needs time off for a mandatory appointment with their probation officer. The appointment confirmation verifies without disclosing the nature of the obligation.

## Third-Party Use

**Employers / HR Departments**
The primary verifier. Large employers handle hundreds of appointment-related absence requests per year. Currently every single one is accepted on trust. Verified confirmations let HR distinguish genuine from fabricated without interrogating the employee. This is especially valuable for employers who suspect abuse but have no mechanism to verify without damaging the employment relationship.

**Schools and Universities**
Attendance officers deal with parent-submitted appointment letters daily. Exam boards receive court summons as evidence for deferrals. Verification eliminates the uncomfortable position of questioning whether a student really does have a hospital appointment during their exam.

**Courts (Employer Compliance)**
When an employer is accused of penalizing an employee for jury service, verified records show whether the summons was genuine and whether the employer was notified. This cuts both ways — it also protects employers from fraudulent claims of jury duty.

**Insurance Companies**
Some income protection policies require proof that absence was due to a medical appointment or legal obligation. A verified appointment confirmation is stronger evidence than an unverifiable photocopy.

**Childcare Providers**
Parents occasionally need to justify a child's absence with proof of a medical appointment. Verified confirmations satisfy attendance requirements without phone calls to the GP surgery.

## Verification Architecture — The Forgery Problem

- **Fake appointment letters:** Hospital appointment letters follow predictable formats. Previous genuine letters provide the letterhead, font, and layout. Forging one requires only changing the date and department. Recipients cannot verify — hospitals won't confirm appointments over the phone.
- **Fake jury summons:** Templates are available online. The format is standardized, making forgery straightforward. Employers feel unable to challenge them because jury duty is legally protected.
- **Date manipulation:** A genuine appointment for one date is altered to cover a different date. Particularly common with recurring appointments where the patient has multiple genuine letters to use as templates.
- **Recycled documents:** A genuine appointment letter from a previous visit is presented for a current absence. The employer has no way to know the appointment already happened.
- **Strategic appointments:** Some walk-in clinics and telemedicine providers offer "appointments" with minimal medical need. Like complicit doctors' note providers, Live Verify doesn't solve this — the appointment is real — but the authority chain signals whether the institution is a recognized healthcare provider.

## Privacy Salt

Important for medical appointments. Salt prevents an attacker from hashing known employee names with likely appointment dates to check whether a specific person has a hospital appointment on a given day. Court summons are typically less sensitive (they're matters of public record in many jurisdictions), but salt is still recommended as default.

## Authority Chain

**Pattern:** Regulated

For medical appointments, the NHS or health system issues the appointment confirmation under healthcare regulator authority (CQC in the UK).

```
✓ appointments.nhs.uk/verify — Issues appointment confirmations
  ✓ cqc.org.uk — Regulates health and social care services in England
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Competition

| Feature | Live Verify | Calling the Hospital/Court | Employer Trusts the Paper | Patient Portals | HR Software Integration |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Speed** | **Instant.** 5-second scan. | **Slow/Impossible.** Hospitals won't confirm. Courts may take days. | **Instant.** Zero verification. | **Slow.** Employee must grant portal access. | **Varies.** Requires integration. |
| **Scalable** | **Yes.** Works for any volume. | **No.** Each call is manual (if they answer). | **Yes** (by accepting everything). | **No.** Per-employee setup. | **Partial.** Platform lock-in. |
| **Detects forgery** | **Yes.** Hash mismatch = forgery. | **Theoretically** (if you reach someone). | **No.** | **Yes** (within platform). | **Partial.** |
| **Privacy-preserving** | **Yes.** Confirms appointment exists without revealing reason. | **No.** Receptionist may disclose details. | **N/A.** | **No.** Portal shows medical history. | **Partial.** |
| **Works for legal summons** | **Yes.** Same mechanism. | **Possible but slow.** Court clerk offices. | **Risky.** Cannot challenge protected absence. | **No.** No patient portal equivalent. | **No.** |

**Why Live Verify wins here:** Medical appointments are the single most common reason for short-notice workplace absence. Employers currently have *zero* verification options — hospitals won't confirm, and challenging an appointment letter destroys trust. For legal summons, the stakes are even higher: employers must release employees for jury duty and court attendance, yet have no way to verify the obligation is genuine. Live Verify adds verification without confrontation.

## Jurisdictional Witnessing

A jurisdiction may require the issuing institution to retain a **witnessing firm** for regulatory compliance. The witnessing firm:

- Receives all hashes from the institution, and any subsequent changes to the payload as they happen — which may manifest as a new hash, a status change (RESCHEDULED, CANCELLED, EXCUSED), or a 404 (record deleted)
- Receives structured content/metadata (date, institution type, reference number)
- Does **NOT** receive plaintext (patient names, medical details, case details)
- Provides an immutable, timestamped audit trail — available to the jurisdiction on demand, to individuals/employers during disputes, or as expert witness testimony in legal proceedings

This provides:
- **Non-repudiation:** Institution cannot deny issuing the confirmation
- **Timestamp proof:** Confirmation existed at a specific time (critical for employment disputes about protected absence)
- **Regulatory audit:** Healthcare regulators or court administrators can inspect issuing patterns
- **Resilience:** Verification works even if the institution changes booking systems

**Public Blockchain (Non-Party)**

Witnessing firms may periodically commit rollups to an inexpensive public blockchain, providing an ultimate immutability guarantee. The blockchain is a "non-party" — infrastructure, not a participant in the transaction. This creates multiple verification paths:

1. **Institution domain** — Direct check against the issuer
2. **Witnessing firm** — Independent confirmation with timestamp
3. **Public blockchain** — Decentralized trust anchor via rollup inclusion

## Further Derivations

1. **Recurring appointment series** — Patients with chronic conditions (dialysis, chemotherapy, physiotherapy) attend regularly. A single verified appointment series document covers multiple dates, with the endpoint returning the next scheduled date and overall series status. The employer verifies once and knows the pattern is genuine, rather than receiving a new letter every week.

2. **Attendance confirmation (post-appointment)** — After the appointment or court date, the institution updates the verification status from CONFIRMED to COMPLETED. This lets the employer confirm not just that the appointment existed, but that the employee actually attended. Particularly relevant for court-ordered appointments (probation, community service) where attendance is a legal requirement.

3. **Protected absence aggregation** — Over the course of a year, an employee may have multiple verified absences across different categories: hospital appointments, jury duty, a witness summons. A privacy-preserving aggregation allows the employer to see total verified protected-absence days without re-examining individual documents — useful for workforce planning and compliance reporting.

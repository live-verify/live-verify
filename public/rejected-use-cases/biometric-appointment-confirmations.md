---
title: "Biometric Appointment Confirmations"
category: "Immigration & Visa Documents"
volume: "Medium"
retention: "Appointment + 5 years"
slug: "biometric-appointment-confirmations"
tags: ["immigration", "visa", "uscis", "biometrics", "appointment", "asc"]
furtherDerivations: 1
---

## What is a Biometric Notice?

When you apply for a US Green Card or Work Permit, you must go to a federal building to have your fingerprints and "biometrics" taken.

The **Appointment Notice (I-797C)** is your "Entry Ticket." Without this specific piece of paper, the guards at the Application Support Center (ASC) will not let you into the building.

Fraudsters often create fake notices to get into secure government facilities or to trick employers into thinking their immigration case is "moving" when it isn't.

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 1px solid #ccc; background: #fff; padding: 0;">
  <div style="background: #f4f4f4; padding: 15px; border-bottom: 1px solid #ccc; display: flex; align-items: center;">
    <div style="width: 40px; height: 40px; background: #999; border-radius: 50%; margin-right: 15px; display: flex; align-items: center; justify-content: center; font-size: 0.7em; color: #fff;"><span verifiable-text="start" data-for="bio">[</span>USCIS</div>
    <div>
      <div style="font-weight: bold; font-size: 1.1em;">Department of Homeland Security</div>
      <div style="font-size: 0.8em;">U.S. Citizenship and Immigration Services</div>
    </div>
  </div>
<div style="padding: 25px;">
    <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
      <div style="border: 1px solid #000; padding: 5px 10px; font-weight: bold;">I-797C</div>
      <div style="text-align: right; font-family: monospace;">Case #: IOE9988776655</div>
    </div>
<h2 style="text-align: center; font-size: 1.2em; margin-bottom: 20px; text-transform: uppercase;">ASC APPOINTMENT NOTICE</h2>
<div style="font-size: 0.95em; line-height: 1.5; color: #333;">
      <p><strong>Applicant:</strong> SARAH JANE SMITH</p>
<div style="background: #f9f9f9; border: 1px solid #eee; padding: 15px; margin: 15px 0;">
        <p><strong>Date of Appointment:</strong> March 15, 2026<br>
        <strong>Time of Appointment:</strong> 10:00 AM</p>
        <p><strong>Location:</strong><br>
        Application Support Center (ASC)<br>
        123 Main St, Suite 400, San Francisco, CA</p>
      </div>
<p style="font-size: 0.85em;">PLEASE BRING THIS ENTIRE NOTICE AND VALID PHOTO ID TO YOUR APPOINTMENT.</p>
    </div>
<div data-verify-line="bio" style="border-top: 1px dashed #999; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
      title="Demo only: USCIS doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:uscis.gov/asc/v <span verifiable-text="end" data-for="bio">]</span>
    </div>
  </div>
</div>

## Data Verified

Applicant name, Case Receipt Number, Appointment Date/Time, ASC (Application Support Center) location ID, form type (e.g., I-485, I-765), date of issuance.

**Document Types:**
- **I-797C Notice of Action:** The standard appointment letter.
- **Rescheduling Confirmation:** Proving a new date was authorized.
- **ASC Attendance Stamp:** (Digital equivalent) proving fingerprints were taken.

## Data Visible After Verification

Shows the issuer domain (`uscis.gov`) and the appointment standing.

**Status Indications:**
- **Scheduled** — Appointment is current and valid.
- **Completed** — Biometrics have been captured for this notice.
- **Rescheduled** — This notice is void; a new date has been set.
- **Cancelled** — The underlying application was denied or withdrawn.

## Second-Party Use

The **Applicant** benefits from verification.

**Entrance Access:** Proving to the security guard at the ASC building that the paper notice is real and the appointment is valid for *today*. Prevents being turned away due to a "suspected fake" letter or a typo in the guard's manual list.

**Work Authorization:** Proving to an employer that their "Biometrics are Scheduled," which is a key milestone in the Green Card/EAD process, showing the case is progressing.

## Third-Party Use

**ASC Security / Staff**
**Entry Control:** ASCs are high-security facilities. Guards can instantly verify notices at the door to prevent unauthorized entry or people trying to "skip the line" with fake appointments.

**Attorneys / Law Firms**
**Case Tracking:** Firms handling thousands of cases can scan the client's notice to instantly ingest the date into their practice management software, ensuring no deadlines are missed.

**Immigration Checkpoints**
**Proof of Progress:** If an applicant is stopped by ICE/CBP while their case is pending, a verified biometric notice proves they are actively following the legal process.

## Verification Architecture

**The "Notice Fraud" Problem**

- **Fabricated Notices:** People creating fake appointment letters to get inside government buildings or to trick employers into thinking their visa is "processing."
- **Date Alteration:** Changing an old appointment date to "Today" to try and get fingerprints taken ahead of schedule.
- **Impersonation:** Using a family member's notice by editing the name.

**Issuer Types** (First Party)

**USCIS:** The sole issuer for domestic appointments.
**VFS Global / TLScontact:** Third-party providers for overseas visa appointments.

**Privacy Salt:** Critical. Case numbers and names are sensitive. The hash must be salted to prevent "guessing" case statuses.

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


## Competition vs. USCIS Online Account

| Feature | OCR-to-Hash | myUSCIS Portal | Paper Notice |
| :--- | :--- | :--- | :--- |
| **Field Access** | **Instant.** Scan the paper at the door. | **Slow.** Requires login, 2FA, navigating to "Documents." | **Instant.** |
| **Guards/Staff** | **Authorized.** Can verify without seeing applicant's private portal. | **Impossible.** Guards cannot ask for applicant's login. | **Weak.** Trusted visually only. |
| **Trust** | **Cryptographic.** Bound to `uscis.gov`. | **High.** Direct from DB. | **Low.** Easily faked. |

**Why OCR wins here:** The "Security Guard Scenario." A guard at a federal building cannot and should not log into an applicant's private USCIS account. Live Verify allows the guard to verify the **authenticity of the physical paper** in front of them without accessing the applicant's private files.

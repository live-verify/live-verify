---
title: "Immigration Interview Appointment Notices"
category: "Immigration & Visa Documents"
volume: "Medium"
retention: "Appointment + 5 years"
slug: "immigration-interview-notices"
tags: ["immigration", "uscis", "interview-notice", "green-card", "naturalization", "form-i-797", "adjustment-of-status", "visa-appointment"]
furtherDerivations: 1
---

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 1px solid #ccc; background: #fff; padding: 0; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <div style="background: #f4f4f4; padding: 15px; border-bottom: 1px solid #ccc; display: flex; align-items: center;">
    <div style="width: 40px; height: 40px; background: #002d62; border-radius: 50%; margin-right: 15px; display: flex; align-items: center; justify-content: center; font-size: 0.7em; color: #fff; font-weight: bold;"><span verifiable-text="start" data-for="im-inter">[</span>DHS</div>
    <div>
      <div style="font-weight: bold; font-size: 1.1em;">U.S. CITIZENSHIP & IMMIGRATION SERVICES</div>
      <div style="font-size: 0.8em;">Form I-797C, Notice of Action</div>
    </div>
  </div>
<div style="padding: 25px;">
    <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
      <div style="border: 1px solid #000; padding: 5px 10px; font-weight: bold;">INTERVIEW NOTICE</div>
      <div style="text-align: right; font-family: monospace;">Receipt #: MSC2699887766</div>
    </div>
<div style="font-size: 0.95em; line-height: 1.6; color: #333;">
      <p><strong>Applicant:</strong> JOHN JACOB DOE<br>
      <strong>Form Type:</strong> I-485, Adjustment of Status</p>
<div style="background: #f9f9f9; border: 1px solid #eee; padding: 15px; margin: 15px 0; border-radius: 4px;">
        <p><strong>Interview Date:</strong> March 15, 2026<br>
        <strong>Interview Time:</strong> 13:00 PM</p>
        <p><strong>Location:</strong><br>
        USCIS San Francisco Field Office<br>
        444 Washington St, San Francisco, CA 94111</p>
      </div>
<p style="font-size: 0.85em; font-weight: bold;">YOU MUST BRING THIS NOTICE AND PHOTO ID TO BE ADMITTED.</p>
    </div>
<div data-verify-line="im-inter" style="border-top: 1px dashed #999; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
      title="Demo only: USCIS doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:uscis.gov/appointments/v <span verifiable-text="end" data-for="im-inter">]</span>
    </div>
  </div>
</div>

## Data Verified

Applicant name, USCIS Receipt Number, Appointment Date/Time, Field Office location, Form Type (e.g., I-485, N-400), Case Category, date of notice issuance, security access code.

**Document Types:**
- **I-797C Interview Notice:** The primary legal appointment letter.
- **Naturalization Oath Ceremony Notice:** (Form N-445).
- **Request for Evidence (RFE):** (Linked hash) proving a pending case.
- **Field Office Entry Badge:** (Digital) for building security.

## Data Visible After Verification

Shows the issuer domain (`uscis.gov`) and current appointment standing.

**Status Indications:**
- **Scheduled** — Appointment is active; entrance authorized.
- **Rescheduled** — This notice is void; a new date has been issued.
- **Completed** — Interview has already taken place for this notice.
- **Cancelled** — Interview revoked (e.g., due to case denial or closure).

## Second-Party Use

The **Applicant (Petitioner)** benefits from verification.

**Building Entrance:** Proving to the federal guards at the USCIS Field Office that the paper notice is legitimate. This prevents being turned away at the door due to a "Suspected Fake" letter or a name typo on the guard's manual list.

**Travel / Time-Off:** Proving to an employer or school why they must be absent for an official federal hearing. A verified hash from `uscis.gov` is more authoritative than a plain printout.

## Third-Party Use

**Federal Protective Service (FPS) / Guards**
**Access Control:** Field offices are high-security environments. Guards can instantly verify notices at the metal detector to ensure only authorized applicants are allowed into the restricted waiting rooms, stopping "Line Jumpers" with fake letters.

**Immigration Attorneys**
**Case Monitoring:** Instantly verifying the "Status" of a client's interview schedule. If a client provides a "Rescheduled" notice, the attorney can verify the new date against the hash to update their calendar.

**Local Law Enforcement**
**Identity Proof:** If an immigrant is stopped by police while in "Pending Status," a verified interview notice proves they are actively following the legal process for a Green Card or Citizenship.

## Verification Architecture

**The "Fake Notice" Fraud Problem**

- **Fabricated Notices:** Scammers creating fake USCIS letters to trick employers into thinking an illegal worker's case is "Processing" or to sell "Entry Spots" to people trying to get inside federal buildings.
- **Date Alteration:** Changing a 2024 date to 2026 to try and force a walk-in interview.
- **Impersonation:** Using a family member's notice by editing the name on the PDF.

**Issuer Types** (First Party)

**U.S. Citizenship and Immigration Services (USCIS).**
**Department of Homeland Security (DHS).**
**Executive Office for Immigration Review (EOIR):** (For court hearings).

**Privacy Salt:** Critical. Case numbers and names are highly sensitive PII. The hash must be salted to prevent "Guess-and-Check" searches of the entire immigration backlog.

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


## Competition vs. USCIS Case Status Online

| Feature | Live Verify | Case Status Online (Web) | Paper Notice |
| :--- | :--- | :--- | :--- |
| **Integrity** | **Binds Identity.** Proves *Who* is scheduled. | **General.** Often just says "Interview Scheduled." | **Low.** Easily faked. |
| **Speed** | **Instant.** 5-second scan at the door. | **Slow.** Requires typing 13-char receipt # and solving CAPTCHAs. | **Instant.** |
| **Field Access** | **High.** Built for security guards. | **Low.** Gov websites are hard to use on handheld devices. | **Universal.** |
| **Trust Anchor** | **Domain-Bound.** Bound to `uscis.gov`. | **High.** Direct DB access. | **Medium.** |

**Why Live Verify wins here:** The "Front Door" reality. Security guards standing at a metal detector have 10 seconds to vet a person. They cannot type 13-character receipt numbers into a website for every visitor. Live Verify turns the **Physical Appointment Letter** into a high-speed "Security Badge," ensuring safety and efficiency at federal facilities.

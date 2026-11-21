---
title: "Immigration Interview Appointment Notices"
category: "Immigration & Visa Documents"
volume: "Medium"
retention: "Appointment + 5 years"
slug: "immigration-interview-notices"
verificationMode: "clip"
tags: ["immigration", "uscis", "interview-notice", "green-card", "naturalization", "form-i-797", "adjustment-of-status", "visa-appointment"]
furtherDerivations: 1
---

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 1px solid #ccc; background: #fff; padding: 0; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <div style="background: #f4f4f4; padding: 15px; border-bottom: 1px solid #ccc; display: flex; align-items: center;">
    <div style="width: 40px; height: 40px; background: #002d62; border-radius: 50%; margin-right: 15px; display: flex; align-items: center; justify-content: center; font-size: 0.7em; color: #fff; font-weight: bold;"><span verifiable-text="start" data-for="im-inter"></span>DHS</div>
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
      <span data-verify-line="im-inter">verify:uscis.gov/appointments/v</span> <span verifiable-text="end" data-for="im-inter"></span>
    </div>
  </div>
</div>

## The Problem: Fake Notice Fraud

- **Fabricated Notices:** Scammers creating fake USCIS letters to trick employers into thinking an illegal worker's case is "Processing" or to sell "Entry Spots" to people trying to get inside federal buildings.
- **Date Alteration:** Changing a 2024 date to 2026 to try and force a walk-in interview.
- **Impersonation:** Using a family member's notice by editing the name on the PDF.

## What Is Checked

Applicant name, USCIS Receipt Number, Appointment Date/Time, Field Office location, Form Type (e.g., I-485, N-400), Case Category, date of notice issuance, security access code.

**Document Types:**
- **I-797C Interview Notice:** The primary legal appointment letter.
- **Naturalization Oath Ceremony Notice:** (Form N-445).
- **Request for Evidence (RFE):** (Linked hash) proving a pending case.
- **Field Office Entry Badge:** (Digital) for building security.

## What the Checker Sees

Shows the issuer domain (`uscis.gov`) and current appointment standing.

**Status Indications:**
- **Scheduled** — Appointment is active; entrance authorized.
- **Rescheduled** — This notice is void; a new date has been issued.
- **Completed** — Interview has already taken place for this notice.
- **Cancelled** — Interview revoked (e.g., due to case denial or closure).

## Who Holds It

The Applicant (Petitioner) benefits from verification.

**Building Entrance:** Proving to the federal guards at the USCIS Field Office that the paper notice is legitimate. This prevents being turned away at the door due to a "Suspected Fake" letter or a name typo on the guard's manual list.

**Travel / Time-Off:** Proving to an employer or school why they must be absent for an official federal hearing. A verified hash from `uscis.gov` is more authoritative than a plain printout.

## Who Checks It

**Federal Protective Service (FPS) / Guards**
**Access Control:** Field offices are high-security environments. Guards can instantly verify notices at the metal detector to ensure only authorized applicants are allowed into the restricted waiting rooms, stopping "Line Jumpers" with fake letters.

**Immigration Attorneys**
**Case Monitoring:** Instantly verifying the "Status" of a client's interview schedule. If a client provides a "Rescheduled" notice, the attorney can verify the new date against the hash to update their calendar.

**Local Law Enforcement**
**Identity Proof:** If an immigrant is stopped by police while in "Pending Status," a verified interview notice proves they are actively following the legal process for a Green Card or Citizenship.

## Who Issues It

**Issuer Types** (First Party)

**U.S. Citizenship and Immigration Services (USCIS).**
**Department of Homeland Security (DHS).**
**Executive Office for Immigration Review (EOIR):** (For court hearings).

**Privacy Salt:** Critical. Case numbers and names are highly sensitive PII. The hash must be salted to prevent "Guess-and-Check" searches of the entire immigration backlog.

## Authority Chain

**Pattern:** Sovereign

Schedules and administers USCIS immigration interviews.

```
✓ uscis.gov/interview/verify — Schedules and administers USCIS immigration interviews
  ✓ usa.gov/verifiers — US federal government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Where Each Fits: Live Verify and USCIS Case Status Online

USCIS Case Status Online lets an applicant, or anyone with their receipt number, see the current status of a case. Other countries' immigration services run their own tracking, or none. Case Status Online and Live Verify answer different questions and work side by side: one reports where a case stands, the other confirms that the agency issued a particular notice naming who is due where and when.

| | USCIS Case Status Online | Live Verify on the interview notice | Unverified paper notice |
| :--- | :--- | :--- | :--- |
| **Who can check** | Anyone with the receipt number and a browser. | Anyone handed the notice: a security guard at the field office, an employer, a school. | Anyone, by eye; it can only be taken on trust. |
| **What the checker gets** | The case's current status, often in general terms such as "interview scheduled". | Confirmation that USCIS stands behind this exact notice, including the name, date, time and place, as at its date, and whether it has since been rescheduled or cancelled. | A notice that may have been fabricated or edited. |
| **What the holder shares** | Their receipt number. | Only the notice they chose to hand over. | Only the notice they chose to hand over. |
| **Reach** | US immigration cases. | Global in principle: any immigration authority, in any country, that publishes hashes on its own domain. | Anywhere, but untrusted. |
| **Speed and cost** | Free; a minute or two of typing and verification steps, awkward on a handheld device. | A few seconds per check: one web lookup, with no fee to the standard. | Free and immediate. |
| **What it needs** | The receipt number and a browser. | USCIS to publish hashes, and Live Verify-aware software on the checker's device. USCIS does not do this yet. | Nothing. |
| **Best suited to** | Applicants and their lawyers following a case. | A guard admitting visitors, or an employer or school asked to excuse an absence. | Nothing where entry or employment depends on it. |

**Where each fits:** USCIS Case Status Online is the applicant's authoritative view of their case and should stay their first reference. It reports a status rather than who is due where and when, and entering a receipt number is impractical for a guard admitting a queue of visitors. Live Verify lets the guard, or an employer or school asked to excuse an absence, confirm the notice itself is as the agency issued it. The case-status site continues to serve applicants and their lawyers.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).

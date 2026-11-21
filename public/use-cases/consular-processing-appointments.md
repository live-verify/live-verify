---
title: "Consular Processing Appointments"
category: "Immigration & Visa Documents"
volume: "Medium"
retention: "Appointment + 5 years"
slug: "consular-processing-appointments"
verificationMode: "clip"
tags: ["immigration", "visa-interview", "nvc", "embassy", "consular-processing", "travel-logistics", "visa-appointment"]
furtherDerivations: 1
---

## What is a Visa Interview Notice?

Getting a US Green Card requires a face-to-face interview at a US Embassy (like the one in Montreal or London).

The Appointment Notice is your "Admission Ticket." Security guards at the embassy perimeter will not even let you into the queue without this specific piece of paper.

Fraudsters often create fake notices to get people into high-security zones or to trick employers into thinking their visa is "in progress." Live Verify allows guards to verify the authenticity of the paper at the gate, ensuring that only scheduled, verified applicants enter the secure zone.

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 1px solid #ccc; background: #fff; padding: 0; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <div style="background: #002d62; color: #fff; padding: 15px; display: flex; align-items: center; justify-content: space-between;">
    <div>
      <div style="font-weight: bold; font-size: 1.1em;"><span verifiable-text="start" data-for="consul-app"></span>U.S. DEPARTMENT OF STATE</div>
      <div style="font-size: 0.8em;">National Visa Center (NVC)</div>
    </div>
    <div style="width: 40px; height: 40px; background: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #002d62; font-weight: bold; font-size: 0.7em; text-align: center;">DOS</div>
  </div>
<div style="padding: 25px;">
    <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
      <div style="border: 1px solid #000; padding: 5px 10px; font-weight: bold;">DS-260</div>
      <div style="text-align: right; font-family: monospace;">NVC Case #: MTL2026998877</div>
    </div>
<h2 style="text-align: center; font-size: 1.2em; margin-bottom: 20px; text-transform: uppercase;">Visa Interview Appointment Notice</h2>
<div style="font-size: 0.95em; line-height: 1.6; color: #333;">
      <p><strong>Principal Applicant:</strong> SARAH JANE SMITH</p>
<div style="background: #f0f4f8; border: 1px solid #d1d9e6; padding: 15px; margin: 15px 0;">
        <p><strong>Interview Date:</strong> March 15, 2026<br>
        <strong>Interview Time:</strong> 08:30 AM</p>
        <p><strong>Location:</strong><br>
        U.S. Consulate General Montreal<br>
        1155 Saint-Alexandre St, Montreal, QC H3B 2J2, Canada</p>
      </div>
<p style="font-size: 0.85em; font-weight: bold;">YOU MUST BRING THIS NOTICE TO ENTER THE CONSULATE.</p>
    </div>
<div data-verify-line="consul-app" style="border-top: 1px dashed #999; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
      title="Demo only: NVC doesn't yet offer verification&#10;endpoints, so this is illustrative">
      <span data-verify-line="consul-app">verify:nvc.state.gov/appointments/v</span> <span verifiable-text="end" data-for="consul-app"></span>
    </div>
  </div>
</div>

## The Problem: Embassy Gate Fraud

- **Fabricated Notices:** Scammers creating fake appointment letters to get people into high-security zones or to sell "fake spots" in the interview queue to desperate applicants.
- **Date Swapping:** Changing an old appointment date to "Today" to try and force an interview ahead of schedule.
- **Derivative Fraud:** Adding extra "Family Members" to a real appointment letter to smuggle people into the mission.

## What Is Checked

Applicant name, NVC/Consular Case Number, Appointment Date/Time, Consulate location (City/Country), Visa Category (e.g., CR-1, IR-1, EB-3), number of derivative applicants, date of issuance.

**Document Types:**
- **NVC Appointment Letter:** The standard notice sent to the applicant.
- **Biometric Appointment Notice:** For the off-site Fingerprint Center (VAC/ASC).
- **Medical Exam Authorization:** Linked to the appointment date.

## What the Checker Sees

Shows the issuer domain (`state.gov`) and current interview standing.

**Status Indications:**
- **Scheduled** — Appointment is valid; security clearance granted.
- **Rescheduled** — This notice is void; a new date has been set.
- **Cancelled** — Interview revoked (e.g., due to document deficiency).
- **Completed** — Interview has already taken place for this notice.

## Who Holds It

The Visa Applicant benefits from verification.

**Consulate Entry:** Proving to the security guards outside the embassy/consulate that the "Interview Notice" is legitimate. This prevents being turned away at the gate due to a suspected forgery or a typo in the mission's manual guard list.

**Travel Logistics:** Proving to airlines or border agents (if traveling to a third country for the interview) that the trip is for an official, verified government appointment.

**Employer Proof:** Proving to a current employer why they need to be absent for several days for international travel.

## Who Checks It

**Consular Security / Local Guard Force**
**Access Control:** Embassies are high-target environments. Guards can instantly verify notices at the perimeter fence to ensure only legitimate applicants are allowed to queue, reducing the risk of protesters or attackers using fake letters.

**Visa Medical Clinics**
**Intake Integrity:** Authorized clinics can verify the "Interview Date" before performing the mandatory medical exam, ensuring the medical report won't expire before the actual interview takes place.

**Airlines (International)**
**Travel Authorization:** Verifying that a passenger traveling to a consulate city has a verified appointment, reducing the risk of "Refusal of Entry" at the destination.

## Who Issues It

**Issuer Types** (First Party)

**National Visa Center (NVC):** (Primary scheduler for immigrant visas).
**U.S. Embassies & Consulates:** (Post-level scheduling for non-immigrant visas).
**Third-Party Scheduling Vendors:** (e.g., USTravelDocs, AIS, CGI Federal).

**Privacy Salt:** Critical. Case numbers are unique and sensitive. The hash must be salted to prevent "Guess-and-Check" searches of the entire visa backlog.

## Authority Chain

**Pattern:** Sovereign

Schedules visa interview appointments at US embassies.

```
✓ travel.state.gov/appointment/verify — Schedules visa interview appointments at US embassies
  ✓ usa.gov/verifiers — US federal government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Where Each Fits: Live Verify and the Case Status Search

For US immigrant and nonimmigrant visas, the State Department's Consular Electronic Application Center (CEAC) offers a public status search by case number. Other countries' consulates run their own systems, or appointment services through contractors. The status search is the applicant's tool for following a case. Live Verify answers a narrower question, whether an appointment letter shown at the consulate entrance is one the department issued, and the two work side by side. <!-- TODO(verify): that CEAC covers both immigrant and nonimmigrant visa cases -->

| | Public case status search | Live Verify on the appointment letter | Unverified paper notice |
| :--- | :--- | :--- | :--- |
| **Who can check** | Anyone with the case number. | Anyone handed the letter: entrance staff, a medical examiner, an employer. | Whoever sees it, trusting it as it stands. |
| **What the checker gets** | The case's general status, such as "Ready" or "At NVC". | Confirmation that the department issued this exact letter, naming this applicant and appointment, and whether it has been cancelled or rescheduled. | A notice that may have been altered or faked. |
| **What the applicant shares** | The case number. | Only the letter. | Only the notice. |
| **Reach** | That country's consular system. | Global in principle: any consular service, in any country, that publishes hashes on its own domain. | Universal, but untrusted. |
| **Speed and cost** | Free; a minute or two per case, typing a number and passing a CAPTCHA. | A few seconds per check: one web lookup, with no fee to the standard. | Free and immediate. |
| **What it needs** | The case number. | The department to publish hashes, and Live Verify-aware software on the checker's device. No consular service does this yet. | Nothing. |
| **Best suited to** | Applicants following their own case. | Checking each person's letter quickly at the entrance. | Nothing where entry depends on it. |

**Where each fits:** the public case status search is the applicant's own tool for following a case, and it stays the reference for that. It reports general status rather than who is booked for when, and it is slow to use for each person in a queue. Live Verify lets staff at the entrance check an appointment letter against the department's domain in seconds, as a complement to the status search.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).

---
title: "Healthcare Home Visit Worker Verification"
category: "Identity & Authority Verification"
volume: "Medium"
retention: "Visit + 3-7 years (care records)"
slug: "healthcare-home-visit-verification"
verificationMode: "camera"
tags: ["home-health-care", "nurse-verification", "elder-care-safety", "personal-safety", "background-check", "caregiver-vetting", "home-security"]
furtherDerivations: 1
---

## What is a Visiting Nurse Badge?

When an elderly relative receives home health care, a nurse or aide enters their private home.

The Care Professional Badge is their "Security Token." It proves:
1.  **Identity:** The person at the door is the one the agency sent.
2.  **Licensure:** They are a verified Registered Nurse (RN) or Certified Aide.
3.  **Background:** They have passed a recent criminal background check.

"Fake Nurse" home invasions are a tragic reality. Scammers buy scrubs and fake IDs to gain entry into the homes of vulnerable seniors. But outright impersonation is not the only risk:

- **Worker substitution.** The agency schedules Nurse Williams but sends a different person — an unqualified aide, a trainee without the right registration, or someone who hasn't passed the required background check. The patient or family was told to expect one person; a different person arrives. The substitute may be well-meaning but may not hold the qualifications (RN vs. aide, specific clinical competencies) that the patient's care plan requires.
- **Expired or suspended registration.** The worker was qualified when the agency hired them, but their registration has since lapsed, or they are subject to conditions of practice that restrict what they can do. The agency's records may not be current. The patient has no way to know.
- **No background check or an outdated one.** The worker's DBS/background check was done years ago, or the agency cut corners on a new hire. The patient — often elderly, alone, and physically unable to resist — is admitting someone whose suitability hasn't been recently confirmed.

Verification at the door addresses all three: the badge carries the worker's name, photo, registration number, and current status. The photo catches substitution. The live status check catches expired or restricted registrations. The background-check status (where the agency includes it) catches the third.

Like utility and contractor doorstep checks, this is strongest because it is a threshold-decision use case: the household needs to know whether this specific worker is the qualified, background-checked professional the agency actually sent — not just whether someone from the agency turned up.

**Perspective:** This use case is written from the patient's or family member's perspective. The home visit is initiated by the care agency.

**Institutional power asymmetry:** The agency controls access to ongoing care — refusing entry or challenging a worker risks disrupting treatment for a vulnerable person who depends on it.

**Verification asymmetry:** The household is being asked to admit a stranger immediately, but lacks a fast independent way to confirm the person at the door is the licensed, background-checked professional the agency actually sent.

<div style="max-width: 400px; margin: 24px auto; font-family: sans-serif; border: 2px solid #333; border-radius: 12px; background: #fff; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.2);">
  <div style="background: #0277bd; color: #fff; padding: 15px; text-align: center; display: flex; align-items: center; justify-content: center;">
    <div style="font-size: 1.5em; margin-right: 10px;">🩺</div>
    <div>
      <h3 style="margin: 0; text-transform: uppercase; letter-spacing: 1px;"><span verifiable-text="start" data-for="nurse"></span>BAYADA HOME HEALTH</h3>
      <div style="font-size: 0.8em; opacity: 0.8;">OFFICIAL CARE PROFESSIONAL</div>
    </div>
  </div>
<div style="padding: 20px; display: flex;">
    <div style="width: 100px; margin-right: 15px;">
      <div style="width: 100px; height: 125px; background: #eee; border: 1px solid #ccc; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: #777;">[PHOTO ID]</div>
    </div>
    <div style="flex-grow: 1;">
      <h4 style="margin: 0; color: #0277bd;">REGISTERED NURSE (RN)</h4>
      <div style="font-size: 1.1em; font-weight: bold; margin: 5px 0;">SARAH J. MILLER</div>
      <div style="font-size: 0.9em; color: #333; line-height: 1.4;">
        <strong>License #:</strong> RN-992288 (TX)<br>
        <strong>Visit ID:</strong> VIS-2026-402<br>
        <strong>Status:</strong> ON-DUTY / VERIFIED
      </div>
    </div>
  </div>
<div style="padding: 0 20px 20px 20px;">
    <div data-verify-line="nurse" style="border-top: 1px dashed #999; margin-top: 10px; padding-top: 5px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
      title="Demo only: Care agency doesn't yet offer verification&#10;endpoints, so this is illustrative">
      <span data-verify-line="nurse">verify:bayada.com/verify/v</span> <span verifiable-text="end" data-for="nurse"></span>
    </div>
  </div>
</div>

## The Problem: Fake Nurse Fraud

- **Identity Theft:** Burglars buying realistic-looking "Nurse Scrubs" and fake ID lanyards to gain entry into the homes of elderly people who live alone.
- **Licensure Hiding:** A caregiver who had their license revoked for drug theft keeping their physical ID badge to continue finding work through private Craigslist ads.
- **Agency Spoofing:** Creating a fake "Home Health Agency" website to provide "Verified" IDs for un-vetted, un-insured workers.

## What Is Checked

Worker name, photo (hash), professional license type (RN, LPN, CNA), state license number, agency name, scheduled visit ID, background check clearance date, current duty status (Active/Off-Duty).

**Document Types:**
- **Healthcare ID Badge:** Carried by the visiting professional.
- **Visit Authorization Letter:** Sent to the patient pre-appointment.
- **Proof of Clearance:** Background check summary for domestic staff.
- **Skill Certification:** Specialization proof (e.g., wound care or pediatric).

## Verification Response

The endpoint returns a simple status code:

- **OK** — Worker is on-duty, licensed, and authorized
- **SUSPENDED** — Professional license or agency status has been retracted; do not admit
- **OFF_DUTY** — Shift ended; worker should not be entering private homes
- **ALERT** — Badge reported lost/stolen
- **404** — Badge not found (terminated, never issued, or OCR error)

The issuer domain is visible from the `verify:` line on the badge itself (e.g., `bayada.com`).

## Post-Verification Actions

After successful verification, the endpoint can return optional actions for the patient or family:

```
HTTP 200 OK

Status: OK

--- Optional Follow-Up ---

Are you a patient or family member?
You may record details of this health-care-worker interaction.
You will NEVER be told not to do this or that it is not needed.

POST to: https://bayada.com/verify/visit-report/VIS-2026-402

Fields:
- Your relationship: [Patient / Family member / Next of kin / Other]
- Setting: [Home visit / Hospital ward / Clinic / Care home / Other]
- Date/time of interaction
- Was identification shown?
- Quality of care: [Excellent / Good / Concerns]
- Any concerns or issues?
- Request callback from patient services? [Y/N]
```

This applies whether the interaction is a home visit, on a hospital ward, in a care home, or any other medical setting. The patient or next of kin can record their perspective regardless of location.

**Why This Matters:**

- **Write-only patient record:** Patient or family creates their own contemporaneous record of the interaction—independent of the provider's notes
- **Pattern detection:** Worker receiving frequent "concerns" across multiple patients triggers review
- **Abuse deterrent:** Workers know patients and families can easily report; reduces opportunity for mistreatment
- **Remote family visibility:** Next of kin can verify caregivers and log observations even when not physically present
- **Documentation for disputes:** "I recorded every interaction" is powerful evidence if something goes wrong later
- **Staffing evidence:** Healthcare workers benefit too—if units are understaffed, a high volume of logged patient interactions provides evidence for increasing staffing levels. Workers should *want* every interaction recorded.

**The "Never Discouraged" Principle:**

The message explicitly states recording is *always* appropriate. This prevents:
- Workers pressuring patients ("don't bother, it's just routine")
- Patients feeling they're being difficult or ungrateful
- Family members feeling they're overstepping

Every report is logged. The agency can triage later—but the patient/family is never told their input isn't wanted.

## Who Holds It

The Home Visit Worker (Nurse/Aide) benefits from verification.

**Personal Safety:** Proving to a defensive family member or a security guard at a gated community that they are a legitimate healthcare professional. Verification reduces the chance of "Suspicious Person" calls to the police.

**Credential Portability:** Proving their "Verified Active" status when picking up shifts through different staffing registries or agencies.

## Who Checks It

**Vulnerable Patients (Elderly/Alone)**
**Abuse Prevention:** Before opening the door, a patient or their remote family member (via doorbell cam) can scan the nurse's badge. "Verified by Bayada" ensures the person at the door isn't a "Fake Nurse" home-invader or a predator with a fake uniform.

**Gated Community Security**
**Access Control:** Guards can instantly verify that the "Visiting Nurse" actually has a scheduled appointment in the complex, preventing unauthorized access.

**Secondary Insurers**
**Fraud Detection:** Verifying that a "Home Health Visit" actually occurred and was performed by a verified, licensed professional before paying out a claim.

## Who Issues It

**Issuer Types** (First Party)

**Health Systems:** (Kaiser, Mayo Clinic, Cleveland Clinic).
**Specialist Care Agencies:** (Bayada, Home Instead, BrightStar Care).
**State Nursing Boards:** (Hosting the official license hashes).

**Privacy Salt:** Highly critical. Worker and patient association data is sensitive. The hash MUST be salted to prevent "Stalking" attacks where someone tries to track a nurse's daily route.

## Authority Chain

**Pattern:** Regulated

Home health agencies issue care professional badges under healthcare regulator authority (CQC in the UK).

```
✓ homevisit.nhs.uk/verify — Issues home visit worker identification
  ✓ cqc.org.uk — Regulates health and social care services in England
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Where Each Fits: Live Verify and Calling the Agency

Today a patient or relative who wants to check a visiting nurse or aide is usually told to phone the home-care agency's office. The agency's own records, and the state's nursing licence registers, remain the authority. A phone call and Live Verify work side by side: the call reaches a person who can answer questions, and Live Verify gives a quick answer at the door.

| | Calling the agency office | Live Verify on the care worker's badge | Unverified ID card |
| :--- | :--- | :--- | :--- |
| **Who can check** | Anyone who has the agency's genuine number and can get through. | Anyone at the door who can see the badge: the patient, a relative, a neighbour. | Anyone, by eye; it can only be taken on trust. |
| **What the checker gets** | A staff member's confirmation that the worker was sent, and the chance to ask more. | Confirmation that the agency stands behind this badge for this person, their role and licence, as at the time of the check, and whether it has since been withdrawn. | A card that may be forged. |
| **What the worker shares** | Their name. | Only what is on the badge. | Only what is on the card. |
| **Reach** | One agency, in its office hours. | Global in principle: any agency, in any country, that publishes hashes on its own domain. | Anywhere, but untrusted. |
| **Speed and cost** | Minutes on hold, with the visitor waiting outside; often not possible at night. | A few seconds per check: one web lookup, with no fee to the standard, at any hour. | Immediate. |
| **What it needs** | The agency's real number, not one supplied by the visitor, and someone to answer. | The agency to publish hashes, and Live Verify-aware software on the checker's phone. No home-care agency does this yet. | Nothing. |
| **Best suited to** | Questions about the visit, or anything the badge does not answer. | Deciding at the door, in seconds, whether to let someone in. | Nothing where safety depends on it. |

**Where each fits:** Agency records stay primary, and a call to the office is still the right step when there is time and someone answers. The decision to open the door is usually made in seconds, often by an elderly patient who does not want to phone while an official-looking visitor waits outside, and sometimes at night. Live Verify gives them a quick check at that moment, wherever they have software that honours it, with the phone call kept for anything that needs a person.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).

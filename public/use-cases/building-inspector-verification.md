---
title: "Building/Safety Inspector Verification"
category: "Identity & Authority Verification"
volume: "Medium"
retention: "Inspection + 3-7 years (compliance)"
slug: "building-inspector-verification"
verificationMode: "camera"
tags: ["safety", "inspector", "badge", "verification", "home-security", "municipal", "government"]
furtherDerivations: 0
---

## What is an Inspector Badge?

A Building Inspector Badge is the identification carried by city officials who enter private homes and businesses to check for safety (Electrical, Plumbing, Fire).

Because these officials have the legal right to walk into your kitchen or basement, criminals often pose as "Inspectors" to gain entry for burglary or to extort fake fines.

Live Verify allows a homeowner to scan the badge at the door and see a green "ACTIVE" status from the city's own domain, proving the person is a real employee and not a scammer.

**Perspective:** This use case is written from the homeowner's or occupier's perspective. The inspection visit is initiated by the municipal authority.

**Institutional power asymmetry:** The inspector can cite code violations, impose fines, condemn work, or require costly remediation — consequences that are difficult and expensive to challenge after the fact.

**Verification asymmetry:** The occupier is being asked to grant entry immediately, but lacks a fast independent way to confirm the person at the door is a current, authorized inspector for the claimed department.

<div style="max-width: 480px; margin: 24px auto; font-family: sans-serif; border: 2px solid #333; border-radius: 12px; background: #fff; box-shadow: 0 4px 10px rgba(0,0,0,0.2); display: flex; position: relative;">

  <div style="background: #1a237e; padding: 15px; display: flex; flex-direction: column; align-items: center; border-radius: 10px 0 0 10px;">
    <div style="font-size: 2em; color: #fff; margin-bottom: 10px;">🏛</div>
    <div style="width: 100px; height: 125px; background: #eee; display: flex; align-items: center; justify-content: center; color: #000; border: 1px solid #ccc; border-radius: 4px;">[PHOTO ID]</div>
  </div>
  <div style="padding: 15px; flex-grow: 1; display: flex; flex-direction: column;">
    <div style="flex-grow: 1;">
      <div style="color: #1a237e; font-weight: bold;"><span verifiable-text="start" data-for="inspector"></span>MIDSOMER DISTRICT COUNCIL</div>
      <div style="font-size: 0.8em; color: #666;">BUILDING CONTROL</div>
    </div>
    <div style="background: #f9f9f9; border: 1px solid #999; padding: 10px; font-size: 0.85em; color: #000; line-height: 1.4;">
      ELECTRICAL SAFETY INSPECTOR<br>
      RAYMOND STANTZ<br>
      Badge #: 992288<br>
      The bearer is authorised to enter premises<br>
      for official safety inspections.<br>
      Building Act 1984.<br>
      <span data-verify-line="inspector" style="font-family: 'Courier New', monospace;"
        title="Demo only: local authorities don't yet offer verification&#10;endpoints, so this is illustrative">verify:inspector.localauthority.gov.uk/v</span> <span verifiable-text="end" data-for="inspector"></span>
    </div>
  </div>
</div>

## The Problem: Fake Official Fraud

- **Identity Theft:** Scammers buying realistic-looking "Inspector" uniforms and fake IDs online.
- **Credential Hiding:** A terminated inspector keeping their physical badge and continuing to "inspect" businesses to demand bribes.
- **Scope Misrepresentation:** An electrical inspector pretending they have the authority to shut down a restaurant for "Health Violations."

## What Is Checked

Inspector name, photo (hash), badge number, department/division (Electrical, Plumbing, Fire), authority statute, employment status (Active/Retired/Suspended), jurisdiction.

**Document Types:**
- **Inspector ID Card (Badge):** Carried by the official.
- **Entry Authorization Letter:** For large-scale site audits.
- **Notice of Inspection:** Left at the door if owner is away.

## Verification Response

The endpoint returns a simple status code:

- **OK** — Badge is valid, bearer is authorized to inspect
- **SUSPENDED** — Employee is on leave or under disciplinary review; not authorized
- **ALERT** — Badge reported lost/stolen; do not admit, consider calling police
- **404** — Badge not found (retired, terminated, or never issued)

The issuer domain is visible from the `verify:` line on the badge itself (e.g., `inspector.localauthority.gov.uk`).

## Post-Verification Actions

After successful verification, the endpoint can return optional actions for the homeowner:

```
HTTP 200 OK

Status: OK

--- Optional Follow-Up ---

Are you a homeowner? You may report details of this inspection visit.
You will NEVER be told not to do this or that it is not needed.

POST to: https://inspector.localauthority.gov.uk/report/992288

Fields:
- Your address
- Date/time of visit
- Inspection type claimed by inspector
- Was identification shown before entry?
- Any concerns or issues?
- Request callback from department? [Y/N]
```

**Why This Matters:**

- **Audit trail:** City knows their inspector was verified at this address at this time—even if no formal inspection report is filed
- **Pattern detection:** Inspector verified at 50 addresses but only 10 inspection reports filed? Investigation triggered
- **Citizen empowerment:** Homeowner has agency; reporting is always welcomed, never discouraged
- **Complaint channel:** "Inspector demanded cash" or "Inspector was rude" goes directly to HR with verified badge number attached
- **Bribery deterrent:** Inspectors know homeowners can easily report; reduces corruption opportunity

**The "Never Discouraged" Principle:**

The message explicitly states reporting is *always* appropriate. This prevents:
- Inspectors intimidating homeowners ("don't bother reporting, it's routine")
- Homeowners feeling they're wasting the city's time
- Gatekeeping by department staff who might dismiss reports

Every report is logged. The city can triage later—but the citizen is never told their input isn't wanted.

## Who Holds It

The Property Owner (Homeowner or Business) benefits from verification.

**Anti-Scam Protection:** Criminals often pose as "Gas Inspectors" or "Building Officials" to gain entry to a home to case it for burglary or to extort "On-the-spot fines" from elderly residents. Scanning the badge instantly proves the person at the door is a legitimate city official.

**Corporate Security:** Large industrial sites can integrate the inspector's verified hash into their visitor management logs, creating a digital record of exactly who from the city accessed the facility.

## Who Checks It

**Police Departments**
**Impersonation Calls:** When a suspicious homeowner calls the police about a "Fake Inspector," the dispatcher can ask the homeowner to scan the badge. If it verifies against the city domain, the police response can be downgraded from "Trespassing" to "Routine."

**City Human Resources**
**Liability Control:** Ensuring that only active, background-checked employees are using their badges to enter private properties.

**Utility Companies**
**Joint Inspections:** Verifying the credentials of municipal partners during joint safety sweeps.

## Who Issues It

**Issuer Types** (First Party)

**Municipal Governments:** (Building Dept, Fire Dept, Health Dept).
**State Agencies:** (OSHA, Environmental Protection).
**Federal Agencies:** (FBI, EPA, DEA).

## Authority Chain

**Pattern:** Sovereign

Local authorities employ building inspectors authorized by the Building Act 1984 and Building Regulations 2010.

```
✓ inspector.localauthority.gov.uk/verify — Local authority building safety inspector badges
  ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Where Each Fits: Live Verify, Badges and Calling the Office

Today a resident at the door has two options: look at the inspector's badge, or ring the council or department and ask whether the person is one of theirs. Both are run by the authority that employs the inspector, and both work side by side with a badge that can also be checked against the council's own domain.

| | Holographic badge | Calling the office | Live Verify on the badge |
| :--- | :--- | :--- | :--- |
| **Who can check** | Anyone who can see the badge, though few people know what a genuine one looks like. | Anyone who can find the real number (not the one printed on the badge) and get through. | Anyone at the door with Live Verify on their phone. |
| **What the checker gets** | A physical card with a photo, hard to copy well but impossible to check by eye. | A person at the council confirming, if they can, that the named inspector works there and is expected at that address. | Confirmation from the council's domain that this badge text is current, or that it has been suspended or withdrawn. The resident still compares the face with the photo. |
| **What the inspector shares** | The badge. | Their name and badge number, for the resident to read out. | The badge, held up for a scan. |
| **Reach** | Wherever badges are issued; no standard design across councils. | Any council with a staffed phone line, during office hours. | Global in principle: any council or inspection body, in any country, that publishes hashes on its own domain. |
| **Speed and cost** | Immediate and free, and tells the resident little. | Several minutes or more, often on hold, while the inspector waits outside. | A few seconds per check: one web lookup, with no fee to the standard. Needs a data connection at the door. |
| **What it needs** | Nothing beyond the badge. | A correct, independently found phone number and someone available to answer. | The council to publish hashes for its badges, and Live Verify-aware software on the resident's phone. No council does this yet. |
| **Revocation** | A lost or withdrawn badge still looks genuine. | Reflects what the person answering knows. | A suspended or reported-stolen badge returns a non-valid status as soon as the council updates it. |
| **Best suited to** | A first look, and for officials whose visit was booked in advance. | Unexpected visits where the resident has time and wants to talk to someone, and anything the badge cannot answer, such as why the inspector is there. | A quick, non-confrontational check before opening the door. |

**Where each fits:** calling the office remains the fullest check, because a person can say whether this visit was planned, and an inspector should never discourage it. The doorstep is where it struggles: residents feel pressured and may not want to keep an official waiting while they sit on hold. A badge that can be checked against the council's domain in a few seconds gives them a quick first answer, with the phone call still there for anything that looks wrong.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).

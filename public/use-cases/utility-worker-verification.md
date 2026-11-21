---
title: "Utility Worker Verification"
category: "Identity & Authority Verification"
volume: "Large"
retention: "Service + 1-3 years (access records)"
slug: "utility-worker-verification"
verificationMode: "camera"
tags: ["utility-worker", "meter-reader", "gas-engineer", "personal-safety", "home-security", "vulnerable-homeowners", "bogus-caller"]
furtherDerivations: 0
---

## What is a Utility Worker Badge?

When a utility worker arrives at your door claiming to read the meter or inspect the gas line, you are faced with a critical decision: do you open the door to a stranger?

The Verified Badge is the worker's digital or physical ID. It proves:
1.  **Identity:** They are a real employee of the utility company, not an impostor.
2.  **Employment Status:** They are currently on shift and assigned to your area.
3.  **Safety:** They have passed a Disclosure and Barring Service (DBS) check for public-facing work.

"Bogus Caller" fraud—criminals posing as utility workers to gain access to homes for burglary—is one of the most common crimes targeting elderly and vulnerable people in the UK. Police forces issue regular warnings. Live Verify allows the homeowner to scan the badge through the window before opening the door and instantly confirm the worker's legitimate employment status.

This is a strong Live Verify fit because the decision is immediate, physical, and safety-critical: a resident must decide whether to open the door to a stranger who claims a current right to be there.

**Perspective:** This use case is written from the homeowner's perspective. The visit is initiated by the utility company.

**Institutional power asymmetry:** The utility can disconnect supply, charge for missed appointments, or escalate access demands — consequences that are costly and disruptive to challenge.

**Verification asymmetry:** The homeowner is being asked to open the door immediately, but lacks a fast independent way to confirm the person outside is a current employee of the claimed utility with a valid reason to be there.

**Why would you bother checking?** Because they need to enter your home. If the meter is external and they stay outside, the risk is low. But when they need interior access — to read an internal meter, inspect gas appliances, or work on wiring — you are letting a stranger into private space where you and your family are present. The person at the door may not be the person the company sent: a terminated worker keeps their badge, or the company subcontracts the job to an unvetted individual. The verification response includes a `photo_url` field — the badge verifies as "ON_DUTY" but the face doesn't match, and the substitution is caught before the door opens.

<div style="max-width: 480px; margin: 24px auto; font-family: sans-serif; border: 2px solid #333; border-radius: 12px; background: #fff; box-shadow: 0 4px 10px rgba(0,0,0,0.2); position: relative;">

  <div style="background: #1a237e; color: #fff; padding: 15px; text-align: center; display: flex; align-items: center; justify-content: center;">
    <div style="font-size: 1.5em; margin-right: 10px;">⚡</div>
    <div>
      <h3 style="margin: 0; text-transform: uppercase; letter-spacing: 1px;">VERIFIED UTILITY WORKER</h3>
      <div style="font-size: 0.8em; opacity: 0.8;">OFFICIAL EMPLOYMENT & DBS CLEARANCE</div>
    </div>
  </div>
  <div style="padding: 20px; display: flex;">
    <div style="width: 100px; margin-right: 15px;">
      <div style="width: 100px; height: 125px; background: #eee; display: flex; align-items: center; justify-content: center; color: #777; border: 1px solid #ccc; border-radius: 4px;">[PHOTO ID]</div>
    </div>
    <div style="flex-grow: 1; background: #f9f9f9; border: 1px solid #999; padding: 12px; font-size: 0.9em; color: #000; line-height: 1.5;">
      <span verifiable-text="start" data-for="utility"></span>SERVICE ENGINEER<br>
      JAMES T<br>
      Employee ID: BG-992288<br>
      Company: British Gas<br>
      Role: Meter Reader<br>
      DBS check: 12 JAN 2026<br>
      Service area: Reading RG1-RG6<br>
      Salt: 9f3k7m2x<br>
      <span data-verify-line="utility" style="font-family: 'Courier New', monospace;"
        title="Demo only: utilities don't yet offer verification&#10;endpoints, so this is illustrative">verify:staff.britishgas.co.uk/v</span> <span verifiable-text="end" data-for="utility"></span>
    </div>
  </div>
</div>

## The Problem: Bogus Caller Fraud

- **Home Invasion Burglary:** Criminals posing as meter readers, gas engineers, or water inspectors to gain entry to homes for theft or assessment before a planned burglary.
- **Identity Theft:** Predators using fake utility company credentials to target vulnerable, elderly residents.
- **Casing:** Fake utility workers mapping properties, entry points, and resident schedules as part of organized burglary operations.

## What Is Checked

Worker name, photo (hash), employee ID, company name, role (meter reader/engineer/installer), DBS check date, service area, current shift status.

**Document Types:**
- **Employee ID Badge:** Carried by the individual worker.
- **Service Authorization Slip:** Confirming assigned visit to the specific address and date.
- **DBS Clearance Certificate:** Proving the worker has passed a Disclosure and Barring Service check.
- **Shift Schedule:** Confirming the worker is currently on duty.

## Verification Response

The endpoint returns a simple status code:

- **ON_DUTY** — Worker is currently on shift, assigned to this service area, and authorized for today
- **OFF_DUTY** — Worker is employed but not currently working
- **SUSPENDED** — Employment suspended pending review; do not grant access
- **TERMINATED** — Worker no longer employed by the company; do not grant access
- **404** — Employee ID not found (forged badge, incorrect ID, or data entry error)

The issuer domain is visible from the `verify:` line on the badge itself (e.g., `staff.britishgas.co.uk`).

## Post-Verification Actions

After successful verification, homeowners may optionally record the service visit:

```
HTTP 200 OK
Status: ON_DUTY

--- Optional Follow-Up ---

You may record details of this service visit.
You will NEVER be told not to do this or that it is not needed.

POST to: https://staff.britishgas.co.uk/visit-log

Fields:
- Date of visit: [Auto-filled]
- Service type: [Meter Reading / Gas Inspection / Installation / Repair / Other]
- Work completed: [Yes / Partially / No]
- Worker conduct: [Professional / Concerns]
- Property access: [No issues / Concerns about boundary or permissions]
- Any safety observations?
- Would you grant access again? [Y/N]
```

**Why This Matters:**

- **Pattern detection:** Worker receiving frequent "concerns" or access denials triggers company review
- **Consumer protection:** Creates contemporaneous record if access dispute or theft occurs
- **Quality accountability:** Utility companies see which workers handle customer interactions professionally
- **Fraud prevention:** Companies know homeowners can easily report imposters; reduces bogus caller risk
- **Area mapping:** Utility companies identify geographic clusters of legitimate service requests versus suspicious activity

**The "Never Discouraged" Principle:**

Utility workers should never tell homeowners "don't bother" or "that's not necessary." Every report is logged. The company can triage later—but the homeowner is never made to feel their input isn't wanted.

## Who Holds It

The Utility Worker (Meter Reader/Engineer) benefits from verification.

**Customer Trust:** Proving to a homeowner at the door that they are a genuine employee of the utility company, verified and vetted. This removes the "Bogus Caller" threat perception and allows the worker to gain access faster, reducing refused entries and repeat visits.

**Shift Authorization:** Workers benefit from the credibility that comes from being verified as currently on duty in the assigned area, which shortcuts the verification conversation and builds confidence.

## Who Checks It

**Vulnerable Homeowners (Elderly Residents)**
**Safety at the Door:** Before opening the door, a resident (or their remote family via doorbell cam) can scan the badge. Instant verification as "ON_DUTY" ensures the person at the door isn't a "Bogus Caller" predator with a stolen uniform or forged credentials. This is especially critical for elderly and vulnerable people targeted by criminals.

**Landlords**
**Tenant Access Authorization:** When a utility company needs access to a tenanted property, landlords can verify the worker's legitimacy without relying solely on the tenant's judgment. This protects both the property and the tenant from unauthorized access.

**Property Managers (Commercial/Residential)**
**Building Access Control:** Property managers can verify utility workers before granting access to secure buildings, substations, or service corridors. Instant "ON_DUTY" confirmation allows fast-tracked building entry without extensive phone verification.

## Who Issues It

**Issuer Types** (First Party)

**Utility Companies:** (e.g., British Gas, EDF Energy, Thames Water, United Utilities).
**Network Operators:** (e.g., National Grid, Cadent Gas, UK Power Networks).
**Regulated Service Providers:** Companies contracted to deliver utility services on behalf of major operators.

**Privacy Salt:** Highly critical. Worker location data and service area assignments are sensitive. The hash MUST be salted to prevent "Mass Scraping" of worker routes and residential patterns.

## Authority Chain

**Pattern:** Regulated

A regulated utility company or network operator issues worker credentials. The issuer is bound by regulatory oversight (Ofgem for energy, Ofwat for water) to maintain accurate employee records and DBS status.

```
✓ staff.britishgas.co.uk/verify — British Gas field engineer credentials
  ✓ ofgem.gov.uk — Regulates UK energy markets
    ✓ gov.uk/verifiers — UK government root namespace
```

The regulatory chain anchors trust: the utility company is accountable to regulators who audit employment and DBS compliance.

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Where Each Fits: Live Verify, Phone Checks and ID Cards

In the UK, utilities and police advise residents to check a caller by ringing the company on a number from their bill, never one the caller gives them, and energy and water companies offer a password scheme for customers on the Priority Services Register, so a genuine worker can quote an agreed password. Workers also carry a photo ID card. Those checks reach the utility's own records and remain the advice to follow. A verifiable badge answers the same question at the door without a phone call, and works alongside them. <!-- TODO(verify): the UK Priority Services Register password scheme -->

| | Phone check with the utility | Live Verify on the worker's badge | Physical ID card |
| :--- | :--- | :--- | :--- |
| **Who can check** | Any resident who calls a number they already trust. | The resident at the door, or a family member watching through a doorbell camera; also landlords and property managers. | The resident, by looking. |
| **What the checker gets** | The utility's answer from its own records, or a password match where the customer has set one. | Confirmation that the utility stands behind this badge, as at the moment of the check, including whether the worker is on duty and the vetting status the utility records, plus a photo to compare. | A card that may be forged, stolen or out of date. |
| **What the worker shares** | Their name or ID number for the call. | Only the badge they chose to show. | The card. |
| **Reach** | One utility. | Global in principle: any utility, network operator or contractor, in any country, that publishes hashes on its own domain. | Anywhere, but unverifiable on sight. |
| **Speed and cost** | A phone call and a conversation, with the worker waiting outside. | A few seconds per check: one web lookup, with no fee to the standard. Needs a data connection at the door. | Immediate. |
| **What it needs** | A trusted number, or a password set in advance. | The utility to publish hashes, and Live Verify-aware software on the checker's phone. No utility does this yet. | Nothing. |
| **Best suited to** | Residents without a smartphone, and any doubt that needs a conversation. | The resident deciding in seconds whether to open the door. | Matching a name to a face. |

**Where each fits:** utility systems remain primary in the background, and a call on a trusted number, or the Priority Services Register password, is still sound advice. The threshold moment is the real workflow: vulnerable homeowners decide whether to open the door in seconds and often do not want to stay on the phone while a stranger stands on the porch. A verifiable badge lets them, or a family member, check at that moment, wherever their phone has software that honours Live Verify.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).

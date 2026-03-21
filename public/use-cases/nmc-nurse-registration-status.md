---
title: "Nurse and Midwife Registration Status"
category: "Identity & Authority Verification"
volume: "Large"
retention: "Registration period + annual renewal"
slug: "nmc-nurse-registration-status"
verificationMode: "clip"
tags: ["nmc", "nursing", "midwifery", "nurse-registration", "healthcare-regulation", "nhs", "cqc", "ahpra", "nursing-agency", "patient-safety"]
furtherDerivations: 2
---

## What is Nurse and Midwife Registration Status?

Every jurisdiction requires nurses and midwives to be registered with a regulatory body before they can practise. The regulator maintains a register, and anyone employing or receiving care from a nurse is expected to confirm that the nurse's registration is current. In practice, verification at the point of care relies on self-assertion — an ID badge, an agency booking confirmation, or a clinic website states the nurse's name and registration number, but none of these are verifiable in place.

The examples below use the UK's Nursing and Midwifery Council (NMC) as the primary illustration, but the pattern applies to any nursing regulator worldwide.

### Nursing Regulators by Jurisdiction

| Jurisdiction | Regulator | Notes |
| :--- | :--- | :--- |
| **UK** | Nursing and Midwifery Council (NMC) | Single register for nurses, midwives, and nursing associates. Searchable at `nmc.org.uk`. |
| **US** | State boards of nursing | 50+ separate boards. Each state issues its own licence. The NCSBN maintains the Nursys verification system. |
| **Australia** | AHPRA / Nursing and Midwifery Board of Australia | Single national register. Searchable at `ahpra.gov.au`. |
| **EU** | National nursing councils (varies) | Each member state has its own regulator. Cross-border recognition under the Professional Qualifications Directive. |
| **Canada** | Provincial nursing regulatory bodies | Each province and territory has its own college of nursing (e.g., CNO in Ontario, BCCNM in British Columbia). |

### The Problem

In the UK, every practising nurse and midwife must be on the NMC register and pay an annual fee to maintain registration. The register is publicly available, but in practice, a patient, ward manager, or care home operator would need to navigate to the NMC register and look up the PIN separately. The same gap exists in every jurisdiction — the register is available, but it is not consulted at the point of care.

Nursing agencies are a particular fraud vector. An agency under pressure to fill shifts may send staff whose registration has lapsed, who are subject to conditions of practice, or — in the worst cases — who have been struck off the register. The agency booking confirmation states the nurse is registered, and the receiving ward has limited time to check before the shift begins.

A verifiable registration claim is text issued by the regulator (the NMC in the UK examples below), embedded on an agency website, printed on an ID badge, or displayed on a ward posting. The recipient verifies it in place by clipping the text. See also [Pharmacy GPhC Registration](/use-cases/pharmacy-gphc-registration) for the same pattern applied to pharmacy premises.

## Example: Agency Website Booking Confirmation

The nursing agency displays a verifiable claim for each nurse on their staff list or booking confirmation. The NMC issues the claim; the agency embeds it.

<div style="max-width: 480px; margin: 24px auto; background: #fff; border: 2px solid #005eb8; border-radius: 8px; padding: 24px; box-shadow: 0 4px 12px rgba(0,94,184,0.15); font-family: 'Segoe UI', Arial, sans-serif;">
  <div style="display: flex; align-items: center; margin-bottom: 16px;">
    <div style="width: 40px; height: 40px; background: #005eb8; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 0.55em; color: #fff; margin-right: 12px;">NMC</div>
    <div style="font-size: 0.75em; color: #000; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">Registered Nurse</div>
  </div>
  <span verifiable-text="start" data-for="nmc-web"></span>
  <div style="color: #333; font-size: 0.95em; line-height: 1.7;">
    <span style="color: #000; font-weight: 600;">Riverside Nursing Agency</span> <span style="color: #999;">(riversidenursing.co.uk)</span><br>
    confirms that Nurse J. Williams <span style="color: #666;">(NMC PIN 21A4418)</span><br>
    is registered with the Nursing and Midwifery Council on
  </div>
  <div style="margin-top: 12px; padding-top: 10px; border-top: 1px solid #ddd; font-family: 'Courier New', monospace; font-size: 0.78em; color: #000;">
    <span data-verify-line="nmc-web">verify:nmc.org.uk/registration/v</span>
  </div>
  <span verifiable-text="end" data-for="nmc-web"></span>
</div>

The text that clip mode sees and hashes:

```
Riverside Nursing Agency (riversidenursing.co.uk)
confirms that Nurse J. Williams (NMC PIN 21A4418)
is registered with the Nursing and Midwifery Council on
verify:nmc.org.uk/registration/v
```

The NMC controls the claim text. The agency embeds it. If the nurse's registration lapses or is suspended, the NMC endpoint returns the current status.

## Example: Physical ID Badge or Ward Posting

The same registration can be displayed on a nurse's ID badge or a printed ward posting. The recipient photographs it and clips the text.

<div style="max-width: 380px; margin: 24px auto; background: #fff; border: 2px solid #000; border-radius: 8px; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); font-family: 'Segoe UI', Arial, sans-serif;">
  <div style="display: flex; align-items: center; margin-bottom: 14px;">
    <div style="width: 36px; height: 36px; background: #005eb8; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 0.55em; color: #fff; margin-right: 10px;">NMC</div>
    <div style="font-size: 0.7em; color: #666; text-transform: uppercase; letter-spacing: 1px;">Registered Nurse</div>
  </div>
  <span verifiable-text="start" data-for="nmc-badge"></span>
  <div style="color: #000; font-size: 0.95em; line-height: 1.8; font-weight: 500;">
    Nurse J. Williams
  </div>
  <div style="color: #333; font-size: 0.9em; line-height: 1.6;">
    NMC PIN: 21A4418<br>
    Status: Registered (Adult Nursing)
  </div>
  <div style="margin-top: 10px; padding-top: 8px; border-top: 1px solid #ccc; font-family: 'Courier New', monospace; font-size: 0.78em; color: #000;">
    <span data-verify-line="nmc-badge">verify:nmc.org.uk/registration/v</span>
  </div>
  <span verifiable-text="end" data-for="nmc-badge"></span>
</div>

The text from the badge:

```
Nurse J. Williams
NMC PIN: 21A4418
Status: Registered (Adult Nursing)
verify:nmc.org.uk/registration/v
```

## Example: Struck-Off Nurse Still Working via Agency

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #7a1f1f; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;">Verification Result
═══════════════════════════════════════════════════════════════════

Status:           STRUCK OFF
Date:             2025-09-12
Result:           This nurse has been removed from the NMC register

verify:nmc.org.uk/registration/v
</pre>
</div>

A nurse struck off the register following a Fitness to Practise hearing may continue to seek work through agencies. If the agency has not updated its records, the nurse may be booked onto shifts. The verification endpoint returns the current status — not the status when the claim was first issued. A ward manager clipping the claim before or during a shift receives an immediate answer.

## Data Verified

Nurse or midwife name, registration number (NMC PIN in the UK, licence number elsewhere), field of practice, and current registration status.

**Document Types:**
- **NMC Registration** — Confirmation that the named nurse, midwife, or nursing associate is on the NMC register and their current status.

**Privacy Salt:** May be appropriate. While the NMC register is publicly searchable, a nurse's registration status combined with their name and workplace is personal professional data. A privacy salt would allow the nurse to control who can verify their claim by sharing the salt selectively. The NMC would decide whether to apply this.

## Data Visible After Verification

Shows the issuer domain (`nmc.org.uk`) and the nurse's current registration status.

**Verification Response Format:**

```json
{
  "status": "verified",
  "allowedDomains": ["riversidenursing.co.uk"]
}
```

**Status Indications:**
- **Registered** — Current registration is active. The nurse is authorised to practise.
- **Suspended** — Registration suspended following a Fitness to Practise decision. The nurse must not practise.
- **Struck Off** — Removed from the register. The nurse is not authorised to practise.
- **Conditions of Practice** — Registered, but subject to conditions imposed by a Fitness to Practise panel.
- **Caution** — Registered, with a caution order in effect. The nurse may continue to practise.
- **Lapsed** — Registration not renewed. The nurse is not currently authorised to practise.
- **404** — No such PIN exists on the NMC register.

## Second-Party Use

The **nurse or midwife** benefits by proving their registration status without relying on their employer's word or their own assertion.

**Agency worker credibility:** A nurse working through agencies has no permanent employer to vouch for them. The verifiable claim, issued by the NMC, provides direct proof of registration that the nurse can point to on the agency's site or on their own badge.

**Career mobility:** Nurses moving between trusts, agencies, or care settings can present a verifiable claim rather than waiting for manual register checks during onboarding.

## Third-Party Use

**Hospitals and NHS Trusts**

**Agency staff verification:** A hospital receiving agency nurses for a shift can clip the claim from the agency's booking confirmation or the nurse's badge. This is faster than a manual NMC register lookup and happens at the point of care — when the nurse arrives on the ward — rather than during a back-office process that may lag behind.

**Nursing Agencies**

**Staff roster compliance:** Agencies can monitor verifiable claims for their entire staff pool. A claim that returns "suspended" or "struck off" is an immediate signal to remove the nurse from active bookings. This complements periodic bulk register checks with continuous, claim-level verification.

**Care Homes**

**Staff vetting:** Care homes, particularly smaller operators without dedicated HR compliance teams, can verify nursing staff registration at the point of engagement. The CQC expects care homes to confirm registration status; a verifiable claim makes this a single-action check rather than a manual register lookup.

**Patients**

**Point-of-care check:** A patient or family member can clip the claim from a nurse's badge or a ward posting. This is a secondary use — most patients trust the institution — but it provides a direct check for anyone who wants one.

**CQC (Care Quality Commission)**

**Inspection evidence:** During inspections, CQC inspectors can verify nursing registration claims displayed on badges or agency documentation. A care home or agency displaying verifiable claims demonstrates active compliance with registration checking requirements.

## Verification Architecture

**The Agency Fraud Problem**

Nursing agency fraud involving unregistered or struck-off staff is a documented patient safety risk:

- **Lapsed registration** — A nurse fails to renew their annual registration (missed payment, incomplete revalidation) but continues to work through an agency that has not re-checked.
- **Struck-off staff** — A nurse removed from the register after a Fitness to Practise hearing registers with a new agency that does not check, or the original agency fails to update its records.
- **Conditions of practice** — A nurse is subject to conditions (e.g., must be supervised, must not administer certain medications) but the receiving ward is not informed because the agency booking does not mention the conditions.
- **Identity fraud** — A person uses another nurse's NMC PIN to gain agency work. The PIN checks out on the register, but the person is not the registered nurse.

The verifiable claim addresses these because:

1. The NMC issues the claim — it is not self-asserted by the nurse or the agency
2. The endpoint returns the current status, including suspension, striking off, and conditions
3. For web claims, `allowedDomains` ties the claim to the specific agency website
4. Status changes are reflected immediately — the endpoint does not cache a historical "good" status

## Competition vs. Current Practice

| Feature | Live Verify | NMC Register Lookup | Employer Confirmation | Agency Booking Sheet |
| :--- | :--- | :--- | :--- | :--- |
| **Issuer-controlled** | **Yes.** NMC issues the claim. | **Yes.** But requires the recipient to navigate there. | **No.** Employer asserts. | **No.** Agency asserts. |
| **Verifiable at point of care** | **Yes.** Clip from badge or agency site. | **No.** Requires navigating to nmc.org.uk. | **No.** Requires contacting the employer. | **No.** Requires trusting the agency. |
| **Shows current status** | **Yes.** Live response from NMC. | **Yes.** If checked at that moment. | **No.** May be outdated. | **No.** Reflects status at time of booking. |
| **Detects struck-off nurse** | **Yes.** Endpoint returns STRUCK OFF. | **Yes.** If checked. | **Possibly.** If employer is informed. | **No.** Agency may not have updated. |
| **Works at shift start** | **Yes.** Single clip action. | **Possible.** If ward staff have time. | **No.** | **No.** Already on the ward. |

## Authority Chain

**Pattern:** Regulated

Each jurisdiction's nursing regulator is the issuing authority. The authority chain varies by country.

<details>
<summary>UK — NMC</summary>

The NMC operates under the Nursing and Midwifery Order 2001 as the independent regulator for nurses, midwives, and nursing associates in the United Kingdom.

```
✓ nmc.org.uk/registration/v — Nurse/midwife registration
  ✓ nmc.org.uk — Nursing and Midwifery Council
    ✓ gov.uk/verifiers — UK government root namespace
```
</details>

<details>
<summary>Australia — AHPRA</summary>

AHPRA and the Nursing and Midwifery Board of Australia regulate nursing and midwifery under the Health Practitioner Regulation National Law.

```
✓ ahpra.gov.au/registration/v — Nurse/midwife registration
  ✓ ahpra.gov.au — Australian Health Practitioner Regulation Agency
    ✓ gov.au/verifiers — Australian government root namespace
```
</details>

<details>
<summary>US — State boards of nursing</summary>

Each US state board of nursing is the issuing authority for that state. The NCSBN provides the Nursys interstate verification system but is not itself the regulator.

```
✓ [state-board-domain]/registration/v — Nurse registration
  ✓ [state-board-domain] — State board of nursing
    ✓ [state].gov/verifiers — State government root namespace
```
</details>

## Further Derivations

1. **Midwife Registration** — Same NMC register, but the claim specifies midwifery as the field of practice. The verification architecture is identical; the claim text and status indications are the same.
2. **Nursing Associate Registration** — Nursing associates were added to the NMC register in 2019. A verifiable claim confirms their registered status and scope of practice.
3. **Conditions of Practice Detail** — A supplementary claim that discloses specific conditions imposed on a nurse's practice (e.g., supervision requirements, medication restrictions), verifiable by the receiving ward before the shift begins.

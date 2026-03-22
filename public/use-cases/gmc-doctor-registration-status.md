---
title: "Doctor Registration Status"
category: "Identity & Authority Verification"
volume: "Large"
retention: "Registration period + revalidation cycle"
slug: "gmc-doctor-registration-status"
verificationMode: "clip"
tags: ["gmc", "doctor", "medical-register", "licence-to-practise", "patient-safety", "nhs", "healthcare-regulation", "cqc", "ahpra", "state-medical-board", "fsmb"]
furtherDerivations: 2
---

## What is a Doctor Registration Status?

Every country requires doctors to be registered with a regulatory authority before they can practise medicine. The authority maintains a register, grants or revokes licences, and publishes the doctor's current status. The specific body varies by jurisdiction, but the verification problem is universal: patients, employers, and agencies encounter a doctor's registration claim far from the register itself — on clinic websites, hospital ID badges, locum booking systems, telemedicine platforms, and ward rosters — and currently must either trust a self-assertion or perform a separate manual lookup.

| Jurisdiction | Regulatory Authority | Notes |
| :--- | :--- | :--- |
| **UK** | General Medical Council (GMC) | Single national register; publicly searchable at `gmc-uk.org` |
| **US** | State medical boards (50+ separate boards) | Licensing is per-state; FSMB maintains a central database but authority rests with each state board |
| **Australia** | AHPRA / Medical Board of Australia | Single national register covering all health practitioners |
| **EU** | National medical councils (varies) | BÄK in Germany, CNOM in France, etc.; cross-border recognition under Directive 2005/36/EC |
| **Canada** | Provincial medical regulatory authorities | Each province licenses independently (e.g., CPSO in Ontario, CPSBC in British Columbia) |

A verifiable registration claim is text issued by the relevant regulatory authority that can appear in any of these contexts: on a clinic's website, on a physical premises notice, on an ID badge, in an agency booking confirmation, or in a hospital's staff directory. The verifier checks it in place — by clipping, photographing, or scanning — without navigating to the register separately. The website-embedding pattern applies to private practices and clinics; for staff who work across multiple hospitals, agencies, and shifts, the badge/booking/roster form is more natural than a single website.

The examples below use the UK's GMC as the primary illustration, but the pattern applies identically to any jurisdiction's medical register.

This is the first of a cluster of health professional registration use cases. The same pattern applies to nursing and midwifery registers (e.g., NMC in the UK, state boards of nursing in the US) and allied health professional registers (e.g., HCPC in the UK, AHPRA disciplines in Australia).

**"Why would you bother?"** For NHS patients in a hospital, the institutional context provides trust — the hospital employs the doctor. But for private healthcare, the patient chooses and pays directly, often finding the doctor through a website or a recommendation. A private clinic website that states "Dr Smith is GMC registered" is a self-assertion. A suspended or erased doctor may continue operating a private practice for weeks before enforcement catches up. The consequences are direct: a doctor erased from the register after a Fitness to Practise hearing may have been found guilty of serious clinical failures — misdiagnosis, surgical errors, prescribing dangerous drug combinations. Patients of private clinics and telemedicine platforms have the weakest institutional protection and the strongest reason to verify independently.

## Example: Clinic Website

The GMC supplies the doctor (or the clinic) with an HTML snippet to embed on the clinic's website. The styling is ignored by clip mode — only the text content matters for hashing.

<div style="max-width: 480px; margin: 24px auto; background: #fff; border: 2px solid #00539b; border-radius: 8px; padding: 24px; box-shadow: 0 4px 12px rgba(0,83,155,0.15); font-family: 'Segoe UI', Arial, sans-serif;">
  <div style="display: flex; align-items: center; margin-bottom: 16px;">
    <div style="width: 40px; height: 40px; background: #00539b; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 0.55em; color: #fff; margin-right: 12px;">GMC</div>
    <div style="font-size: 0.75em; color: #000; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">Registered Doctor</div>
  </div>
  <span verifiable-text="start" data-for="gmc-web"></span>
  <div style="color: #333; font-size: 0.95em; line-height: 1.7;">
    <span style="color: #000; font-weight: 600;">Dr Sarah Chen</span> <span style="color: #999;">(chenmedical.co.uk)</span><br>
    is registered with the General Medical Council<br>
    <span style="color: #666;">(GMC 7441882, licence to practise)</span> on
  </div>
  <div style="margin-top: 12px; padding-top: 10px; border-top: 1px solid #ddd; font-family: 'Courier New', monospace; font-size: 0.78em; color: #000;">
    <span data-verify-line="gmc-web">verify:gmc-uk.org/doctors/v</span>
  </div>
  <span verifiable-text="end" data-for="gmc-web"></span>
</div>

The text that clip mode sees and hashes:

```
Dr Sarah Chen (chenmedical.co.uk)
is registered with the General Medical Council
(GMC 7441882, licence to practise) on
verify:gmc-uk.org/doctors/v
```

The GMC controls the claim text. The clinic embeds it. The hash is unaffected by styling changes the clinic makes to match their site design.

## Example: Physical Premises

The same registration is displayed at the clinic, hospital, or private practice — printed signage in the waiting room, consulting room, or reception area. The patient can photograph it and clip the text from the photo.

<div style="max-width: 380px; margin: 24px auto; background: #fff; border: 2px solid #000; border-radius: 8px; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); font-family: 'Segoe UI', Arial, sans-serif;">
  <div style="display: flex; align-items: center; margin-bottom: 14px;">
    <div style="width: 36px; height: 36px; background: #00539b; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 0.55em; color: #fff; margin-right: 10px;">GMC</div>
    <div style="font-size: 0.7em; color: #666; text-transform: uppercase; letter-spacing: 1px;">Registered Doctor</div>
  </div>
  <span verifiable-text="start" data-for="gmc-premises"></span>
  <div style="color: #000; font-size: 0.95em; line-height: 1.8; font-weight: 500;">
    Dr Sarah Chen
  </div>
  <div style="color: #333; font-size: 0.9em; line-height: 1.6;">
    GMC Registration: 7441882<br>
    Status: Registered with licence to practise
  </div>
  <div style="margin-top: 10px; padding-top: 8px; border-top: 1px solid #ccc; font-family: 'Courier New', monospace; font-size: 0.78em; color: #000;">
    <span data-verify-line="gmc-premises">verify:gmc-uk.org/doctors/v</span>
  </div>
  <span verifiable-text="end" data-for="gmc-premises"></span>
</div>

The text from the premises signage:

```
Dr Sarah Chen
GMC Registration: 7441882
Status: Registered with licence to practise
verify:gmc-uk.org/doctors/v
```

The primary verification path for private practice is clip from the clinic's website. For hospital doctors, the premises signage is the primary path — patients rarely encounter the hospital's internal staff directory online.

## Example: Fake Clinic Copies the Claim

If a fraudulent clinic copies the website claim onto their own site at `londonpremierhealth.com`, the hash still verifies — the text is identical. But the browser extension detects the mismatch:

1. The claim text contains `(chenmedical.co.uk)` — the extension extracts the domain
2. The verification response includes `"allowedDomains": ["chenmedical.co.uk", "*.chenmedical.co.uk"]`
3. The current page is `londonpremierhealth.com`, which matches neither

The extension shows an amber warning:

> "This registration verified, but it names chenmedical.co.uk and you are on londonpremierhealth.com."

## Example: Registration Statuses

The GMC register records several distinct statuses. Each has different implications for whether the doctor can practise.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #7a1f1f; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;">Verification Result
═══════════════════════════════════════════════════════════════════

Status:           SUSPENDED
Reason:           Fitness to Practise panel — interim suspension order
Result:           This doctor is not currently permitted to practise

verify:gmc-uk.org/doctors/v
</pre>
</div>

A doctor whose registration has been suspended may continue to appear on a clinic's website or premises signage. The verification endpoint returns the current status — not the status when the claim was first issued.

**Key statuses:**
- **Registered with licence to practise** — The doctor holds full registration and a licence. They are permitted to practise medicine in the UK.
- **Registered without licence to practise** — The doctor is on the register but does not hold a licence. They cannot practise medicine, prescribe, or sign certain certificates. Some doctors retain registration without a licence after retirement.
- **Suspended** — Registration suspended by a Fitness to Practise panel or interim orders tribunal. The doctor must not practise during the suspension period.
- **Erased** — Removed from the register. The doctor is not permitted to practise and cannot use the title "doctor" in a medical context.
- **Conditions on practice** — Registered with licence, but subject to conditions imposed by a Fitness to Practise panel (e.g., restricted to supervised practice, prohibited from prescribing certain drugs).
- **404** — No such registration exists on the GMC register.

## Data Verified

Doctor's name, GMC registration number, registration status, licence to practise status, and any conditions or restrictions on practice.

**Document Types:**
- **GMC Registration with Licence** — Confirmation that the doctor is registered with the General Medical Council and holds a licence to practise medicine in the United Kingdom.

**Privacy Salt:** Generally not required. GMC registrations are public information. The GMC register is publicly searchable by name or registration number. Doctors practising medicine are expected to be identifiable.

## Data Visible After Verification

Shows the issuer domain (`gmc-uk.org`) and the doctor's current registration status.

**Verification Response Format:**

```json
{
  "status": "verified",
  "allowedDomains": ["chenmedical.co.uk", "*.chenmedical.co.uk"]
}
```

**Status Indications:**
- **Registered with licence** — Current registration and licence are active. The doctor is permitted to practise.
- **Registered without licence** — On the register but not licensed to practise.
- **Suspended** — Registration suspended following Fitness to Practise proceedings.
- **Erased** — Removed from the register.
- **Conditions** — Registered with licence, but conditions apply. The response includes a summary of the conditions.
- **404** — No such registration exists on the GMC register.

## Second-Party Use

The **doctor** benefits directly by proving their registration status.

**Private practice credibility:** A doctor operating a private clinic embeds the GMC-issued claim on their website. Patients clip the claim before booking. For private practice — where there is no NHS organisational layer providing implicit trust — this is a direct trust signal from the regulator.

**Locum work:** A locum doctor starting at a new hospital or GP practice can present the verifiable claim as immediate proof of registration. The receiving organisation verifies it rather than manually checking the GMC register.

**Telemedicine:** Online consultation platforms list doctors who may be unfamiliar to the patient. A verifiable registration claim attached to the doctor's profile on the platform provides regulator-confirmed status at the point of booking.

## Third-Party Use

**Patients**

**Pre-appointment check:** The patient finds a private clinic online and is considering booking. They clip the registration claim on the clinic's website. The response confirms the doctor is registered with a licence to practise. This is most relevant for private healthcare, where the patient chooses and pays for the doctor directly.

**Hospital HR and Medical Staffing**

**Recruitment and onboarding:** Hospital HR departments verify GMC registration for every doctor they employ. Currently this is a manual check against the register. A verifiable claim embedded in the doctor's application or professional profile streamlines this to a clip action.

**Revalidation monitoring:** Doctors must revalidate with the GMC every five years. Hospital responsible officers can monitor verified claims for doctors on their designated list to confirm ongoing registration.

**Locum Agencies**

**Agency vetting:** Locum agencies place doctors in temporary positions at short notice. Verifiable registration claims provide immediate confirmation of GMC status when matching a doctor to an assignment. A suspended doctor would be flagged at the point of booking, not discovered after they have already started work.

**Medical Indemnity Insurers**

**Policy issuance:** Medical defence organisations and insurers verify GMC registration before issuing or renewing indemnity cover. A verifiable claim provides a current, regulator-issued confirmation rather than relying on the doctor's self-declaration.

**CQC (Care Quality Commission)**

**Provider inspections:** The CQC inspects healthcare providers and checks that employed doctors are properly registered. Verifiable claims displayed at premises or on provider websites provide an auditable trail of registration status.

## Verification Architecture

**The Registration Status Problem**

The GMC register is comprehensive and publicly searchable. The problem is not the absence of information — it is the gap between where the information lives and where the patient encounters the doctor:

- **Self-asserted claims** — A clinic website states "Dr Smith is GMC registered" but this is the clinic's own assertion. There is no link between the claim and the register.
- **Stale information** — A doctor is suspended after a Fitness to Practise hearing. The clinic's website still lists them as GMC registered. The suspension may take days or weeks to propagate through NHS systems, and private clinics have no automated notification.
- **Impersonation** — A person uses a genuine doctor's name and GMC number. The number checks out on the register, but the person presenting it is not the registered doctor. The verifiable claim does not solve identity theft on its own, but it does establish a chain from the GMC to a specific website domain or premises.
- **Multiple practice locations** — A doctor may work at several locations. Each location can embed the claim, but the `allowedDomains` in the verification response confirm which websites the GMC has authorised to display it.

The verifiable claim addresses these because:

1. The GMC issues the claim — it is not self-asserted by the clinic
2. The claim names the specific website domain where it applies
3. Status changes (suspension, erasure, conditions) are reflected immediately at the verification endpoint
4. The browser extension detects domain mismatches when claims are copied to unauthorised sites
5. Physical premises claims provide in-person verification without requiring internet access to the GMC register

## Competition vs. Current Practice

| Feature | Live Verify | GMC Register Lookup | NHS Profile Page | Clinic Self-Assertion |
| :--- | :--- | :--- | :--- | :--- |
| **Issuer-controlled** | **Yes.** GMC issues the claim. | **Yes.** But requires the patient to navigate there. | **Partially.** NHS sources data from GMC but is a separate system. | **No.** The clinic writes it. |
| **Verifiable at point of encounter** | **Yes.** On the clinic's own website or premises. | **No.** Requires leaving the site. | **No.** Requires finding the NHS profile. | **No.** No verification mechanism. |
| **Shows current status** | **Yes.** Live response from GMC. | **Yes.** If the patient checks. | **Yes.** If the patient finds the profile. | **No.** Static text on website. |
| **Detects suspension** | **Yes.** Endpoint returns SUSPENDED. | **Yes.** If checked. | **Yes.** If the patient checks. | **No.** Text remains unchanged. |
| **Detects copied claims** | **Yes.** Domain mismatch warning. | **N/A.** | **N/A.** | **N/A.** Not verifiable. |
| **Works for private practice** | **Yes.** Any website or premises. | **Yes.** But patient must know to check. | **Not always.** NHS profiles may not cover private-only doctors. | **No.** |

**Practical conclusion:** The GMC register is authoritative and publicly available. The problem is that patients do not use it. They see a doctor's name on a clinic website, read "GMC registered," and accept it. A verifiable claim embedded at the point of encounter turns the clinic's assertion into a regulator-issued, checkable statement.

## Authority Chain

**Pattern:** Regulated

The GMC operates under the Medical Act 1983 as the independent regulator of doctors in the United Kingdom.

```
✓ gmc-uk.org/doctors/v — Doctor registration status
  ✓ gmc-uk.org — General Medical Council
    ✓ gov.uk/verifiers — UK government root namespace
```

<details>
<summary>Other Jurisdictions</summary>

**United States — State Medical Boards**

In the US, medical licensing is at state level. Each state has a Medical Board that licenses physicians to practise within its jurisdiction. The Federation of State Medical Boards (FSMB) maintains a central database, but licensing authority rests with each state board.

```
✓ [state-board]/physicians/v — State physician licence verification
  ✓ [state-board] — State Medical Board (e.g., Medical Board of California, New York OPMC)
```

**European Union — National Medical Registers**

EU member states maintain national registers of medical practitioners. Recognition of qualifications across member states is governed by Directive 2005/36/EC on the recognition of professional qualifications. Each member state's competent authority maintains its own register.

```
✓ [national-authority]/doctors/v — National doctor registration
  ✓ [national-authority] — National competent authority (e.g., Bundesärztekammer for Germany, Ordre des Médecins for France)
```

**Australia — AHPRA**

The Australian Health Practitioner Regulation Agency (AHPRA) maintains a single national register for all registered health practitioners, including medical practitioners. The Medical Board of Australia sets registration standards.

```
✓ ahpra.gov.au/practitioners/v — Practitioner registration
  ✓ ahpra.gov.au — Australian Health Practitioner Regulation Agency
```

**Canada — Provincial Medical Regulatory Authorities**

Each Canadian province and territory has its own medical regulatory authority (e.g., College of Physicians and Surgeons of Ontario, College of Physicians and Surgeons of British Columbia). There is no single national register; licensing authority rests with each province.

```
✓ [provincial-college]/physicians/v — Provincial physician licence verification
  ✓ [provincial-college] — Provincial medical regulatory authority (e.g., CPSO, CPSBC)
```

</details>

## Further Derivations

1. **Specialist Registration** — Verification that the doctor is on the GMC Specialist Register in a named specialty (e.g., cardiology, orthopaedic surgery). Relevant for patients choosing a specialist and for hospitals confirming specialist credentials.
2. **GP Register Entry** — Verification that the doctor is on the GMC GP Register, required to work as a general practitioner in the NHS. Distinct from general registration.
3. **NMC Nurse Registration** — The same pattern applied to nurses and midwives registered with the Nursing and Midwifery Council. Part of the health professional registration cluster alongside this use case and HCPC registration.

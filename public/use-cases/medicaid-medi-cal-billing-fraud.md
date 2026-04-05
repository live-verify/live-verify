---
title: "Medicaid / Medi-Cal Billing Fraud Prevention"
category: "Healthcare & Medical Records"
volume: "Very Large"
retention: "10 years (federal False Claims Act statute of limitations + audit)"
slug: "medicaid-medi-cal-billing-fraud"
verificationMode: "clip"
tags: ["medicaid", "medi-cal", "billing-fraud", "false-claims", "upcoding", "phantom-billing", "kickbacks", "provider-verification", "beneficiary-verification", "healthcare-fraud", "cms", "dhcs", "npi", "cpt-codes"]
furtherDerivations: 3
---

## The Problem

Medi-Cal fraud — California's Medicaid program — costs the state billions of dollars annually. The Division of Medi-Cal Fraud and Elder Abuse recovers hundreds of millions per year, but the recoveries are a fraction of the total. The fraud falls into well-documented patterns:

- **Services not performed.** A provider bills Medi-Cal for an office visit, lab panel, or procedure that never happened. The patient was never seen. The claim is pure fabrication.
- **Unnecessary services.** A provider performs and bills for tests, imaging, or procedures that no reasonable clinician would order for the patient's condition. The service happened, but it was medically unnecessary — performed to generate revenue.
- **Upcoding.** A provider performs a simple office visit (CPT 99213, ~$110) but bills it as a complex visit (CPT 99215, ~$250). The service happened, but the billed code is more expensive than what was actually done.
- **Kickbacks.** A provider pays patients, recruiters, or other providers to steer Medi-Cal beneficiaries to their clinic. The referral is bought, not earned. The kickback is hidden in the billing as legitimate services.
- **Stolen billing privileges.** Identity thieves obtain a registered provider's NPI (National Provider Identifier) and bill Medi-Cal using stolen credentials. The real provider may not know their NPI is being exploited.
- **Beneficiary identity fraud.** A person's Medi-Cal identity is sold or shared. Someone presents at a clinic using another person's Medi-Cal card and receives services billed to the victim's account.
- **Unqualified staff.** A clinic assigns unlicensed or unqualified staff to perform procedures, then bills as if a licensed physician performed the work.
- **Supply reuse.** Single-use supplies (syringes, catheters, test kits) are reused across patients but billed to Medi-Cal as new for each patient. This is both fraud and a direct public health hazard.

Current detection is reactive: the Division of Medi-Cal Fraud and Elder Abuse investigates after claims are paid, often years later. Between fiscal years 2015-2020, criminal filings ranged from 84 to 185 per year, with criminal restitution ranging from $4.5M to $37M and civil recoveries from $17M to $109M. These are the cases that are caught. The true cost is estimated in the billions.

The fundamental problem: **Medi-Cal claims are unverifiable at the point of submission.** A claim arrives as data — CPT codes, NPI numbers, beneficiary IDs, dates of service — and DHCS (Department of Health Care Services) has limited ability to confirm in real time that the service was actually performed, by the billed provider, on the named patient, at the stated level of complexity.

## How Live Verify Addresses Each Fraud Pattern

### 1. Services Not Performed (Phantom Billing)

The most brazen fraud: billing for services that never happened. A provider submits claims for patients who never visited the clinic, or for procedures that were never performed.

**The verification approach:** Each service encounter generates a verifiable claim at the point of care — not after billing, at the time the patient is in the room.

<div style="max-width: 580px; margin: 24px auto; font-family: 'Courier New', monospace; font-size: 0.82em; border: 2px solid #1a1a1a; background: #fafafa; padding: 20px; line-height: 1.7;">
  <span verifiable-text="start" data-for="encounter1"></span>MEDI-CAL SERVICE ENCOUNTER<br>
  Provider: Westside Community Health Center<br>
  NPI: 1234567890<br>
  <br>
  Beneficiary: [ID ending 4417]<br>
  Date of Service: April 4, 2026<br>
  <br>
  Services Rendered:<br>
  1. Office Visit — Established Patient, Moderate (99214)<br>
  2. Complete Blood Count (85025)<br>
  <br>
  Rendering Provider: Dr. Maria Santos, MD<br>
  NPI: 1987654321<br>
  CA License: A-112847<br>
  <div style="margin-top: 12px; padding-top: 8px; border-top: 1px dashed #999;">
    <span data-verify-line="encounter1">verify:westsidechc.org/medi-cal/v</span> <span verifiable-text="end" data-for="encounter1"></span>
  </div>
</div>

The claim is generated at the point of care — the provider's EHR system creates the verifiable text when the encounter is documented. The hash is published to the provider's verification endpoint immediately. When the corresponding Medi-Cal billing claim arrives at DHCS, the system can cross-reference: does a verified encounter exist at this provider's endpoint for this beneficiary on this date with these CPT codes?

**What changes:** A provider billing for phantom visits would need to also publish fake encounter hashes at their verification endpoint. This is detectable — the encounter hashes can be audited against appointment logs, badge-in records, and the beneficiary's own verification history (if the beneficiary receives a copy of the encounter claim and can independently verify it).

**The beneficiary's copy:** The patient receives the encounter claim text (on paper, via the patient portal, or as a message). The patient can clip and verify it. If a patient receives an encounter claim for a visit they never made, they have evidence of phantom billing. This is the "EOB for the encounter" — the patient sees what was documented before it becomes a billing claim.

### 2. Unnecessary Services

A provider orders tests, imaging, or procedures that serve no clinical purpose — purely to generate billable events. The services are real, but they shouldn't have happened.

**The verification approach:** The referral chain. Every specialist service, imaging study, or lab panel requires a referral or prior authorization. That referral is itself a verifiable claim.

<div style="max-width: 580px; margin: 24px auto; font-family: 'Courier New', monospace; font-size: 0.82em; border: 2px solid #1a1a1a; background: #fafafa; padding: 20px; line-height: 1.7;">
  <span verifiable-text="start" data-for="referral1"></span>MEDI-CAL PRIOR AUTHORIZATION<br>
  Requesting Provider: Dr. Maria Santos, MD (NPI: 1987654321)<br>
  Rendering Provider: Valley Imaging Center (NPI: 1567890123)<br>
  <br>
  Beneficiary: [ID ending 4417]<br>
  Authorization #: PA-2026-0447832<br>
  Date: April 4, 2026<br>
  <br>
  Authorized Service: MRI Lumbar Spine without Contrast (72148)<br>
  Clinical Indication: Chronic low back pain, 6 months,<br>
  unresponsive to conservative treatment<br>
  <br>
  Status: APPROVED<br>
  Valid Through: May 4, 2026<br>
  <div style="margin-top: 12px; padding-top: 8px; border-top: 1px dashed #999;">
    <span data-verify-line="referral1">verify:dhcs.ca.gov/auth/v</span> <span verifiable-text="end" data-for="referral1"></span>
  </div>
</div>

**What changes:** The authorization is verifiable against DHCS's own endpoint — not the provider's. The provider cannot fabricate authorizations. When the imaging center bills Medi-Cal for the MRI, the system confirms the authorization exists, hasn't been revoked, and matches the billed service. A provider who orders unnecessary services would need DHCS to approve the authorization — and DHCS's utilization review algorithms can flag patterns (provider X requests 5x more MRIs per patient than peers).

See also: [Medical Referral Letters](medical-referral-letters.md) for the broader referral verification pattern.

### 3. Upcoding

The provider performs a 15-minute routine visit but bills a 40-minute complex visit. The CPT code in the claim is more expensive than the service delivered.

**The verification approach:** The encounter claim (section 1 above) documents the CPT codes at the point of care, before billing. The patient receives a copy. If the patient's encounter claim says "99213 — Established Patient, Low Complexity" but the Medi-Cal billing claim says "99215 — Established Patient, High Complexity," there is a discrepancy.

**What changes:** The encounter claim is a contemporaneous record — published to the provider's endpoint at the time of the visit. The provider would need to change it after the fact to match an upcoded bill, which would either require publishing a new hash (detectable — the original is already on record) or altering the endpoint (detectable — if a witnessing service is present, the original hash is independently recorded).

**Systematic detection:** DHCS can programmatically compare encounter claim hashes against billing claims. If 80% of a provider's encounter claims show 99213 but 80% of their billing claims show 99215, the pattern is visible without reviewing a single medical record.

### 4. Kickbacks and Fraudulent Referrals

A provider pays patients, recruiters ("cappers"), or other providers to direct Medi-Cal beneficiaries to their clinic. The referrals are bought, generating billing volume that wouldn't exist otherwise.

**The verification approach:** Every referral in the chain is verifiable. If a patient shows up at a specialist clinic, the clinic should have a verified referral from a primary care provider. That referral is verifiable against the referring provider's endpoint.

**What changes:** A kickback scheme requires a cooperating referring provider to generate referrals. Those referrals are now verifiable claims with a trail: which provider referred, when, for what service, for which patient. DHCS can analyze referral patterns — if Provider A refers 95% of their Medi-Cal patients to Provider B (and Provider B is paying Provider A a fee per referral), the referral pattern is visible in the verification data. The referrals are real, but the concentration is anomalous.

### 5. Stolen Billing Privileges (NPI Fraud)

An identity thief obtains a registered provider's NPI and bills Medi-Cal from a different location using the stolen credentials.

**The verification approach:** The encounter claim is published to the legitimate provider's verification endpoint — a domain they control. An identity thief billing under a stolen NPI cannot publish encounter hashes to the real provider's domain. When DHCS checks the encounter endpoint for the billing claim, the hash isn't there.

<div style="max-width: 580px; margin: 24px auto; font-family: 'Courier New', monospace; font-size: 0.82em; border: 2px solid #1a1a1a; background: #fafafa; padding: 20px; line-height: 1.7;">
  DHCS Automated Check:<br>
  <br>
  Billing claim received: NPI 1234567890, DOS 04/04/2026, 99214<br>
  <br>
  Check: verify:westsidechc.org/medi-cal/v/{hash}<br>
  Result: 404 — No matching encounter at this provider's endpoint<br>
  <br>
  Flag: Billing claim has no corresponding verified encounter.<br>
  Action: Hold payment pending investigation.
</div>

**What changes:** Domain binding is the key. The NPI alone is just a number — anyone can type it on a claim form. But the verification endpoint is bound to the provider's domain. A thief who steals NPI 1234567890 cannot publish encounter hashes to `westsidechc.org` unless they also compromise the provider's web infrastructure. The domain is the authentication layer that the NPI number alone cannot provide.

### 6. Beneficiary Identity Fraud

A person sells or shares their Medi-Cal card. Someone else presents at a clinic using the victim's identity and receives services billed to the victim's account.

**The verification approach:** The beneficiary's eligibility is itself a verifiable claim. The clinic verifies the patient's Medi-Cal status at the point of care, and the beneficiary receives a notification.

<div style="max-width: 580px; margin: 24px auto; font-family: 'Courier New', monospace; font-size: 0.82em; border: 2px solid #1a1a1a; background: #fafafa; padding: 20px; line-height: 1.7;">
  <span verifiable-text="start" data-for="elig1"></span>MEDI-CAL BENEFICIARY ELIGIBILITY<br>
  Department of Health Care Services<br>
  <br>
  Beneficiary ID: [ending 4417]<br>
  Aid Code: 1H (Medi-Cal, no share of cost)<br>
  Managed Care Plan: LA Care Health Plan<br>
  PCP: Westside Community Health Center<br>
  Status: ELIGIBLE<br>
  As of: April 4, 2026<br>
  <div style="margin-top: 12px; padding-top: 8px; border-top: 1px dashed #999;">
    <span data-verify-line="elig1">verify:dhcs.ca.gov/elig/v</span> <span verifiable-text="end" data-for="elig1"></span>
  </div>
</div>

**What changes:** The eligibility check is verifiable against DHCS's domain, not the provider's. The PIN pattern applies here — the beneficiary controls a PIN that gates eligibility verification, preventing unauthorized eligibility checks. When someone presents at a clinic using a stolen Medi-Cal card, the clinic requests the PIN. The person using the stolen card doesn't have it.

For clinics that don't use PIN verification, the encounter claim sent to the real beneficiary acts as a detection mechanism: "You visited Westside CHC on April 4" — if the real beneficiary never went there, they have immediate evidence of identity fraud.

See also: [Health Insurance Cards](health-insurance-cards.md) for insurance card verification patterns.

### 7. Unqualified Staff

A clinic assigns unlicensed or underqualified staff to perform procedures but bills as if a licensed physician performed the work.

**The verification approach:** The encounter claim names the rendering provider — the individual who actually performed the service — with their license number and NPI. That individual's credentials are separately verifiable against the state licensing board.

**What changes:** The encounter claim states "Dr. Maria Santos, MD, CA License A-112847" performed the service. The licensing board's endpoint confirms Dr. Santos is a currently licensed physician. If the encounter claim instead names "John Doe, Medical Assistant" but the billing claim says "Dr. Santos," the discrepancy is visible. If the clinic fabricates the encounter claim to name Dr. Santos when she wasn't present, Dr. Santos's own verification history doesn't corroborate — she has no record of being at that clinic on that date (badge verification, if used, or her own professional log).

See also: [Professional Licenses](professional-licenses.md), [GMC Doctor Registration Status](gmc-doctor-registration-status.md), [HCPC Allied Health Registration](hcpc-allied-health-registration.md).

### 8. Single-Use Supply Reuse

Single-use medical supplies — syringes, catheters, IV sets, test kits — are reused across patients but billed as new for each patient. This is fraud (billing for supplies not consumed) and a public health hazard (infection risk from reused supplies).

**The verification approach:** Each single-use supply has a UDI (Unique Device Identifier) or lot/serial number. The supply manufacturer publishes each unit as a VCRS (Verification-Consumed Re-Salting) claim — a single-use verification. When the supply is used on a patient and billed to Medi-Cal, the verification is consumed. Attempting to bill the same supply unit for a second patient fails — the hash has been burned.

**What changes:** A clinic billing Medi-Cal for 100 syringes per day needs 100 verified, unconsumed supply units. Reusing a syringe and billing it as new requires a second verification — which fails because the first verification consumed the hash. The supply chain becomes verifiable from manufacturer to patient, with each unit's single-use status enforced cryptographically.

See also: [Medical Device Implant Cards](medical-device-implant-cards.md) for UDI verification, [Chain of Custody Forms](chain-of-custody-forms.md) for supply chain verification.

## The Compound Effect

Each fraud pattern addressed individually is valuable. But the compound effect of addressing all eight simultaneously is transformative:

**A phantom billing scheme** requires the provider to: (1) publish fake encounter hashes at their endpoint, (2) generate fake referrals that verify against the referring provider's endpoint, (3) use real beneficiary IDs that trigger notifications to real patients who never visited, and (4) bill supply UDIs that have already been consumed or never existed. Each layer makes the fraud harder. All layers together make it operationally impractical.

**A kickback scheme** requires: (1) real encounter claims at both the referring and receiving providers, (2) referrals that verify and create an auditable pattern, (3) real patients who receive encounter notifications and don't report fraud. The verification trail makes the referral concentration visible to DHCS analytics.

**An upcoding scheme** requires: (1) encounter claims that match the billed codes (published before billing, visible to the patient), or (2) changing encounter claims after the fact (detectable if a witness service is present). The contemporaneous encounter record is the check.

## Data Verified

Provider identity (NPI, name, license number, domain), beneficiary identity (Medi-Cal ID, managed care plan, PCP assignment), date of service, CPT/HCPCS codes for services rendered, rendering provider credentials, referral/prior authorization chain, supply UDI/lot numbers (for single-use supplies).

**Document Types:**
- **Service Encounter Claim** — Point-of-care record of services rendered, generated by the provider's EHR.
- **Prior Authorization** — DHCS-issued authorization for specific services.
- **Beneficiary Eligibility Confirmation** — DHCS-issued current eligibility status.
- **Supply Consumption Record** — VCRS single-use verification of medical supplies.
- **Provider Credential Verification** — State licensing board confirmation of provider status.

**Privacy Salt:** Required for beneficiary-identifying information. Encounter claims use partial beneficiary IDs (last 4 digits). Full beneficiary details are accessible only through DHCS's systems with appropriate authorization. The hash covers the full text (including the partial ID), but the verification response reveals only status.

## Data Visible After Verification

Shows the issuer domain (`westsidechc.org` for encounter claims, `dhcs.ca.gov` for authorizations and eligibility) and current status.

**Status Indications:**
- **Verified** — Encounter/authorization/eligibility is current and matches the provider's record.
- **Superseded** — Encounter claim has been amended (e.g., correction to CPT code). Original remains as historical record.
- **Voided** — Encounter claim retracted by provider (e.g., entered in error).
- **Expired** — Prior authorization has passed its validity window.
- **Suspended** — Under investigation; payment should be held.
- **404** — No matching record. For encounter claims, this means no service was documented at this provider for this hash.

## Second-Party Use

The **Medi-Cal provider** benefits from verification.

**Proof of service delivery:** Legitimate providers can demonstrate that every billed service has a corresponding verified encounter claim. During an audit, the provider can show that their encounter hashes match their billing claims one-to-one.

**Protection against stolen NPI:** If a provider's NPI is stolen and used for fraudulent billing, the provider can demonstrate that the fraudulent claims have no corresponding encounter hashes at their endpoint. The domain binding proves the claims didn't originate from their practice.

**Referral legitimacy:** A specialist can demonstrate that every patient they treated arrived through a verified referral chain, not through a kickback arrangement.

## Third-Party Use

**DHCS (Department of Health Care Services)**

**Real-time claim validation:** Before paying a claim, DHCS can check whether a corresponding encounter hash exists at the provider's endpoint. Claims without encounter hashes are flagged for review before payment — shifting from pay-and-chase to verify-before-pay.

**Pattern analytics:** Verification data reveals patterns invisible in billing data alone: referral concentrations (kickbacks), encounter-to-billing code discrepancies (upcoding), providers with high claim volumes but no encounter hashes (phantom billing), and supply consumption rates inconsistent with patient volume (supply reuse).

**Beneficiaries / Patients**

**Fraud detection by the victim:** Patients who receive encounter notifications for visits they never made are the first line of detection for phantom billing and identity fraud. The patient doesn't need to understand CPT codes — they just need to know whether they actually visited that clinic on that date.

**Division of Medi-Cal Fraud and Elder Abuse**

**Prosecution evidence:** Verified encounter claims (or their absence) are evidence. "The provider's endpoint has no encounter hash for this date and patient" is stronger than "the provider's paper records don't mention this visit" — paper records can be fabricated after the fact; encounter hashes are published contemporaneously.

**Managed Care Plans (LA Care, Health Net, etc.)**

**Delegated verification:** Managed care plans processing Medi-Cal claims can use the same verification infrastructure. The encounter hash check works identically whether the claim is processed by DHCS fee-for-service or by a managed care plan.

**CMS (Centers for Medicare & Medicaid Services)**

**Federal oversight:** The pattern is not California-specific. CMS could mandate encounter verification for all state Medicaid programs. The infrastructure is the same — only the state DHCS domains change.

## Verification Architecture

**The "Unverifiable Claim" Problem**

- **Claims are data, not documents.** A Medi-Cal claim is a set of fields submitted electronically. There is no physical document to examine. The claim data can be fabricated, altered, or submitted by anyone with access to a provider's NPI and the billing system.
- **Post-payment detection.** Current fraud detection is primarily retrospective — statistical analysis of paid claims, whistleblower tips, patient complaints. By the time fraud is detected, the money is gone.
- **Provider self-reporting.** Providers document their own encounters and submit their own claims. There is no independent confirmation that the encounter happened as documented.
- **Scale.** Medi-Cal serves over 15 million beneficiaries with hundreds of thousands of providers. Manual verification of individual claims is impossible.

The verifiable encounter claim addresses these because:

1. The encounter claim is published contemporaneously — at the time of service, not at the time of billing
2. Domain binding ties the encounter to the provider's infrastructure — stolen NPIs cannot publish to someone else's domain
3. The patient receives a copy — phantom billing is detectable by the alleged patient
4. DHCS can cross-reference claims against encounters programmatically — at scale, before payment
5. Single-use supply verification (VCRS) prevents billing reused supplies as new
6. The referral chain is verifiable end-to-end — kickback patterns are visible

**Issuer Types** (First Party)

- **DHCS** — Prior authorizations, beneficiary eligibility, program-level attestations. Domain: `dhcs.ca.gov`
- **Medi-Cal Providers** — Encounter claims, published on their own domains. Domain: provider's own (e.g., `westsidechc.org`)
- **State Licensing Boards** — Provider credential verification. Domain: `mbc.ca.gov` (Medical Board of California), `pharmacy.ca.gov` (Board of Pharmacy), etc.
- **Supply Manufacturers** — Single-use supply UDI verification (VCRS). Domain: manufacturer's own (e.g., `bd.com` for Becton Dickinson syringes)

## Authority Chain

**Pattern:** Regulated (federal/state)

Medi-Cal providers operate under DHCS oversight, which operates under CMS federal authority.

```
✓ westsidechc.org/medi-cal/v — Provider encounter claims
  ✓ dhcs.ca.gov/providers — DHCS registered Medi-Cal provider
    ✓ cms.gov/verifiers — CMS federal Medicaid authority
```

```
✓ dhcs.ca.gov/auth/v — Prior authorizations
  ✓ cms.gov/verifiers — CMS federal Medicaid authority
```

```
✓ mbc.ca.gov/v — Medical Board of California provider licensing
  ✓ ca.gov/verifiers — State of California root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Competition vs. Current Practice

| Feature | Live Verify | Current Medi-Cal Billing | DHCS Post-Payment Review | Commercial Fraud Analytics |
| :--- | :--- | :--- | :--- | :--- |
| **When fraud is detected** | **Before payment.** Encounter hash check at claim submission. | **Never (by design).** Claims are trusted at submission. | **Months/years later.** Statistical analysis of paid claims. | **Weeks/months later.** Pattern detection on paid data. |
| **Phantom billing detection** | **Immediate.** No encounter hash = no payment. | **Undetectable at submission.** | **Retrospective.** Requires investigation. | **Probabilistic.** Flagged for review. |
| **Upcoding detection** | **Contemporaneous.** Encounter code ≠ billing code is visible. | **Undetectable.** Provider controls both records. | **Statistical.** Provider outlier analysis. | **Statistical.** Same approach. |
| **Beneficiary awareness** | **Yes.** Patient receives encounter notification. | **No.** Patient may never see the claim. | **Sometimes.** If patient is contacted during investigation. | **No.** |
| **Cost** | **Low.** Standard web infrastructure per provider. | **Zero.** (but fraud costs billions) | **High.** Investigators, auditors, prosecutors. | **Very high.** Licensed analytics platforms. |

**Why Live Verify wins here:** The shift from pay-and-chase to verify-before-pay. Current Medi-Cal fraud detection is forensic — it analyzes claims after payment and tries to recover money from fraudsters who have already spent it. Live Verify makes the encounter itself the first check: no verified encounter, no payment. The fraud is prevented, not detected after the fact.

## Broader Applicability

The pattern described here for Medi-Cal applies to every state Medicaid program and to Medicare. The fraud vectors are identical nationwide — phantom billing, upcoding, kickbacks, stolen NPIs, beneficiary identity fraud, supply reuse. The verification infrastructure is the same. Only the state agency domains change.

If CMS mandated encounter verification as a condition of Medicaid participation, the compound effect would scale nationally. The estimated $100+ billion in annual healthcare fraud across Medicare and Medicaid would face a verification layer that didn't exist before.

<details>
<summary><strong>Other US States</strong></summary>

Every state Medicaid program faces the same fraud patterns. The infrastructure maps directly:

- **New York (Medicaid):** `health.ny.gov/elig/v`, `health.ny.gov/auth/v`
- **Texas (Medicaid):** `hhs.texas.gov/elig/v`, `hhs.texas.gov/auth/v`
- **Florida (Medicaid):** `ahca.myflorida.com/elig/v`, `ahca.myflorida.com/auth/v`
- **Illinois (Medicaid):** `hfs.illinois.gov/elig/v`, `hfs.illinois.gov/auth/v`

Provider encounter claims are always on the provider's own domain. State agency endpoints handle eligibility and authorizations.

</details>

<details>
<summary><strong>Medicare (Federal)</strong></summary>

Medicare fraud follows identical patterns. CMS could operate:

- `cms.gov/elig/v` — Beneficiary eligibility verification
- `cms.gov/auth/v` — Prior authorization verification
- Provider encounter claims on provider domains, with authority chain to `cms.gov`

The Medicare Advantage plans (UnitedHealthcare, Humana, etc.) would operate their own encounter endpoints with authority chains to CMS.

</details>

<details>
<summary><strong>UK NHS</strong></summary>

The NHS faces similar fraud patterns. NHS Counter Fraud Authority (NHSCFA) investigates. The infrastructure maps to:

- `nhs.uk/elig/v` — Patient eligibility (NHS number verification)
- Provider encounter claims on trust/practice domains (e.g., `royalfree.nhs.uk/encounters/v`)
- Authority chain through `nhs.uk` to `gov.uk`

</details>

## Further Derivations

1. **Medi-Cal Encounter Audit Trail** — A witnessing service that receives encounter hashes from providers in real time, creating an independent record that providers cannot alter after the fact. DHCS auditors can compare the witnessed record against the provider's current endpoint, detecting retroactive changes.
2. **Beneficiary Fraud Reporting** — A patient-facing app where Medi-Cal beneficiaries review encounter notifications and flag visits they didn't make. Each flagged encounter links directly to the encounter hash for investigation.
3. **Supply Chain UDI Verification** — End-to-end VCRS verification for single-use medical supplies from manufacturer through distributor to point of care, with each consumption event burning the hash and preventing rebilling.
4. **Cross-State Medicaid Fraud Correlation** — Federated verification where states share encounter hash patterns (not patient data) to detect providers billing multiple state Medicaid programs for the same patient on the same date.
5. **Managed Care Encounter Reconciliation** — Automated reconciliation between managed care plan encounter data and provider encounter hashes, detecting discrepancies before capitation payments are adjusted.

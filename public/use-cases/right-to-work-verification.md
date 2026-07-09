---
title: "Right to Work Verification"
category: "Identity & Authority Verification"
volume: "Very Large"
retention: "Hours (privacy-preserving confirmation window)"
slug: "right-to-work-verification"
verificationMode: "clip"
tags: ["right-to-work", "immigration", "employment", "home-office", "privacy", "time-limited", "salted-proof", "uk", "hiring"]
furtherDerivations: 2
---

## What is Right to Work Verification?

Before hiring, UK employers are legally required to confirm that a prospective employee has the right to work. Currently this means photocopying a passport or Biometric Residence Permit, or using the Home Office online checking service.

The underlying immigration status — visa grant, settlement, citizenship — is the permanent record. But for the hiring check, the employer only needs to know one thing:

**does this person have the right to work as of now?**

A **Right to Work Confirmation** is a short-lived, salted derivative proof issued from the Home Office immigration record. It answers that narrow question for a specific checking occasion and then expires.

## Gated Workplace Check

In a workplace visit, an immigration officer, police officer, or labour inspector should not start with an accusation such as "are you abusing a Skilled Worker visa?" The neutral challenge is:

> Which applies to your right to work here: British or Irish citizen, unrestricted right to work, or permission tied to a visa, sponsor, employer, role, or work condition?

The answer routes the check; it does not decide the outcome. The worker may be unsure, may not know the legal category, or may have been misled by an employer or adviser. The official's obligation is to use the official status path and to ask only for the minimum information needed for the enforcement purpose.

**Official paths after the challenge:**

- **British or Irish citizen** — verify identity and citizenship/right-to-work evidence through the ordinary route. The verification should not reveal birthplace, immigration history, or unnecessary nationality detail.
- **Unrestricted right to work** — verify a short-lived unrestricted right-to-work confirmation. No sponsor, role, or visa-route detail is needed.
- **Restricted work permission** — verify the current restriction, such as permitted hours or prohibited work types, and compare it with the observed work.
- **Sponsored work permission** — verify the sponsor, sponsor licence, Certificate of Sponsorship or equivalent record, permitted role, occupation code, worksite, and validity. The official must then compare those fields with the live workplace facts.
- **Unsure or no document available** — use the Home Office status-check route rather than relying on the worker's description.

For sponsored work, the machine check can show whether the record is internally consistent. It cannot prove that the sponsored role is genuinely being performed. That requires observation, worker interview, rota, payroll, job description, sponsor records, and, where relevant, a sponsor compliance review.

## Why expiry matters

This is primarily a privacy use case.

Immigration status is highly sensitive. A portable proof of right to work should not circulate indefinitely or be replayable.

A short-lived confirmation:

- reduces scraping value
- reduces replay value
- prevents stale photocopies accumulating in HR filing cabinets
- narrows the verification to the immediate hiring check
- allows the Home Office to return `404` or `EXPIRED` after the validity window

## Example: Citizen Right to Work

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #1a5f2a; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <span verifiable-text="start" data-for="rtwcitizen"></span>
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;">RIGHT TO WORK CONFIRMATION
═══════════════════════════════════════════════════════════════════

Subject Ref:   RTW-116420
Status:        RIGHT TO WORK CONFIRMED
Work Type:     CITIZEN
Valid Until:    22 Mar 2026 (24-hour confirmation)
Salt:          J8R4M6T2

<span data-verify-line="rtwcitizen">verify:gov.uk/right-to-work/v</span></pre>
  <span verifiable-text="end" data-for="rtwcitizen"></span>
</div>

## Example: Unrestricted Right to Work

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #1a5f2a; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <span verifiable-text="start" data-for="rtwunrestricted"></span>
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;">RIGHT TO WORK CONFIRMATION
═══════════════════════════════════════════════════════════════════

Subject Ref:   RTW-882199
Status:        RIGHT TO WORK CONFIRMED
Work Type:     UNRESTRICTED
Valid Until:    22 Mar 2026 (24-hour confirmation)
Salt:          M7K4P2R9

<span data-verify-line="rtwunrestricted">verify:gov.uk/right-to-work/v</span></pre>
  <span verifiable-text="end" data-for="rtwunrestricted"></span>
</div>

## Example: Restricted Right to Work

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #8a4b08; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <span verifiable-text="start" data-for="rtwrestricted"></span>
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;">RIGHT TO WORK CONFIRMATION
═══════════════════════════════════════════════════════════════════

Subject Ref:   RTW-441882
Status:        RIGHT TO WORK CONFIRMED
Work Type:     RESTRICTED (max 20 hours/week during term)
Restriction:   Student visa — Tier 4
Valid Until:    22 Mar 2026 (24-hour confirmation)
Salt:          Q2P8M1K7

<span data-verify-line="rtwrestricted">verify:gov.uk/right-to-work/v</span></pre>
  <span verifiable-text="end" data-for="rtwrestricted"></span>
</div>

## Example: Sponsored Right to Work

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #8a4b08; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <span verifiable-text="start" data-for="rtwsponsored"></span>
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;">RIGHT TO WORK CONFIRMATION
═══════════════════════════════════════════════════════════════════

Subject Ref:        RTW-773914
Status:             RIGHT TO WORK CONFIRMED
Work Type:          SPONSORED
Route:              Skilled Worker
Sponsor Ref:        SPL-449201
Permitted Sponsor:  Kent Retail Foods Ltd
Permitted Role:     Retail Manager
Occupation Code:    1190
Permitted Worksite: 14 High Street, Maidstone
Valid Until:         15 May 2028
Salt:               P6N2V9C4

<span data-verify-line="rtwsponsored">verify:gov.uk/right-to-work/v</span></pre>
  <span verifiable-text="end" data-for="rtwsponsored"></span>
</div>

This confirmation gives an official enough structured fields to decide the next check. If the person is observed doing ordinary shop-floor duties, the result is not "abuse proven"; it is a reason to compare the sponsored role with interviews, rota, payroll, job description, and sponsor compliance records.

## Example: No Longer Valid

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #7a1f1f; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;">Verification Result
═══════════════════════════════════════════════════════════════════

Status:           EXPIRED
Original Validity: 24 hours
Result:           A fresh right to work confirmation must be issued by the Home Office

verify:gov.uk/right-to-work/v
</pre>
</div>

## Data Verified

Subject reference, right to work status, work type (citizen, unrestricted, restricted, or sponsored), confirmation timestamp, expiry timestamp, and salt. For sponsored or restricted work, the proof may also include the minimum necessary condition fields: sponsor reference, permitted employer, permitted role, occupation code, worksite, hours, or prohibited work types.

**Document Types:**
- **24-Hour Right to Work Confirmation**
- **Citizen / Unrestricted Right to Work Confirmation**
- **Restricted Work Confirmation (with conditions)**
- **Sponsored Work Confirmation (with sponsor, role, and worksite conditions)**

**What is deliberately NOT included:**

- the person's name
- birthplace, nationality, or country of origin unless a legal route explicitly requires that detail
- visa history or immigration history
- passport or BRP number
- date of birth or photograph

The person's name is not in the verifiable text. Only a reference and the status appear, plus condition fields when those fields are necessary for a restricted or sponsored compliance check. The employer or official sees identity documents separately. The verifiable claim confirms the status, not the identity. This mirrors the hashed-party-references pattern used in property deed verification.

## Data Visible After Verification

Shows the issuer domain and the current right-to-work result.

**Important:** this confirmation answers the narrow question of **current right to work only**. It does not carry identity, immigration history, or visa details — those belong to the underlying Home Office record.

**Status Indications:**
- **Right to Work Confirmed (Citizen)** — Current right to work confirmed through the citizen route
- **Right to Work Confirmed** — Current right to work confirmed within validity window
- **Right to Work Confirmed (Restricted)** — Confirmed with stated conditions
- **Right to Work Confirmed (Sponsored)** — Confirmed with sponsor, role, worksite, or equivalent conditions
- **Expired** — Confirmation window ended; new confirmation required
- **Not Confirmed** — Current Home Office records do not support the claim
- **404** — No matching short-lived confirmation exists

## Second-Party Use

The **worker** benefits directly.

**Privacy-preserving proof:** The worker can demonstrate right to work without handing over passport photocopies or revealing immigration history.

**Task-specific sharing:** The worker generates a fresh confirmation for the specific employer and hiring occasion that needs it.

**Reduced document spread:** Instead of passport photocopies and BRP scans circulating through HR departments and recruitment agencies, the shared proof naturally expires.

## Third-Party Use

**Employers**

**Status confirmation:** Verifying that a person's right to work is current, using a cryptographically verifiable, time-limited confirmation rather than a photocopy of uncertain age and authenticity.

**Important limitation:** This confirmation answers "does the holder of subject reference RTW-882199 have the right to work?" It does not by itself satisfy the employer's full legal obligation, which requires the employer to verify that the person standing in front of them *is* the holder of that reference — through identity document checks, comparison with the person, and recording of the check. The verifiable confirmation is one component of the compliance process, not a replacement for the identity-matching step. Employers who rely solely on the status confirmation without performing the identity check have not satisfied their statutory duty.

**Recruitment Agencies**

**Pre-screening:** Confirming right to work status for candidates before placing them with client employers. Each placement occasion generates its own short-lived proof.

**Auditors and Enforcement**

**Spot checks:** Verifying that employers hold valid (or appropriately dated) right-to-work confirmations, without needing access to workers' immigration records.

**Workplace enforcement:** Using the gated challenge to route the check without assuming immigration status. For unrestricted workers, the official records that right to work is confirmed and stops there unless another issue exists. For sponsored workers, the official compares sponsor, role, worksite, and restrictions with what is observed and with employer records. The officer must treat a mismatch as a compliance lead, not as automatic proof of worker wrongdoing.

## Verification Architecture

**The "Too Many Photocopies" Problem**

- Employers photocopy passports and BRP cards as evidence of the check.
- These copies sit in filing cabinets and HR systems indefinitely.
- Stale photocopies cannot reflect changes in immigration status.
- The copies themselves become a data protection liability.
- The Home Office online checking service is an improvement but produces screenshots, not verifiable claims.

This use case provides a narrower object than a passport photocopy or a full immigration status record:

- not identity verification
- not immigration history
- but short-lived proof of **current right to work**

## Privacy Salt

Required. Immigration status is highly sensitive. The salt ensures each confirmation instance produces a unique hash, preventing cross-correlation between different checking occasions for the same individual.

## Competition vs. Current Practice

| Feature | Short-Lived RTW Confirmation | Passport Photocopy | Home Office Online Check | Employer Checking Service |
| :--- | :--- | :--- | :--- | :--- |
| **Proves current right to work** | **Yes.** | **At time of copy only.** | **Yes.** | **Yes.** |
| **Privacy-preserving** | **High.** | **Low.** | **Medium.** | **Medium.** |
| **Replay-resistant** | **Yes.** Expires fast. | **No.** | **No.** Screenshot persists. | **No.** |
| **Excludes identity details** | **Yes.** Reference only. | **No.** Full passport page. | **No.** Shows name, DOB, photo. | **No.** |
| **Machine-verifiable** | **Yes.** | **No.** | **No.** | **Partially.** |

**Practical conclusion:** the Home Office online checking service is the current best practice. A short-lived verifiable confirmation would strengthen it by making the result cryptographically verifiable, replay-resistant, and free of unnecessary identity detail.

## Authority Chain

**Pattern:** Sovereign / Government Agency

```
✓ gov.uk/right-to-work/v — Short-lived right to work confirmation
  ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Further Derivations

None yet.

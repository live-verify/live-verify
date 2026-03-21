---
title: "DBS Update Service Status Confirmation"
category: "Identity & Authority Verification"
volume: "Large"
retention: "Hours (24-hour confirmation window)"
slug: "dbs-update-service-status"
verificationMode: "clip"
tags: ["dbs", "disclosure-and-barring", "update-service", "safeguarding", "criminal-record", "uk", "privacy", "time-limited", "salted-proof", "employment"]
furtherDerivations: 1
---

## What is a DBS Update Service Status Confirmation?

The DBS Update Service is a subscription service (£13/year) that lets holders of DBS certificates keep their certificate up to date. Employers can check the service online to see whether a certificate is still current — meaning no new information has come to light since it was issued.

The service answers a narrow question: **has anything changed since this certificate was issued?**

Currently, the result of that check is a screen on a government website. The employer sees it as part of their safeguarding duty. The worker has no portable, verifiable proof of the result.

A **DBS Update Service Status Confirmation** is a short-lived, salted derivative proof of that status check. It confirms the certificate reference, the check level, and the result — and then expires after 24 hours.

**Important:** This is a convenience proof layered on top of the employer's own safeguarding duty, not a substitute for it. The employer remains responsible for performing their own DBS check through proper channels. A worker sharing a verifiable status confirmation can speed up onboarding and reduce friction when moving between roles, but it does not relieve the employer of their statutory obligation to conduct the check themselves. The confirmation helps the worker demonstrate readiness; the employer's own verification is what satisfies the legal requirement.

This is distinct from the [DBS certificate itself](criminal-background-check-results.md), which is the underlying disclosure document containing the person's name, date of birth, and disclosure results. This page covers only the live-status "is it still current?" check.

## Why expiry matters

Criminal record status is among the most sensitive categories of personal data under UK GDPR (Article 10). A portable proof of DBS status should not circulate indefinitely.

A short-lived confirmation:

- expires before it can be stockpiled or replayed
- limits the window during which the proof is useful to an attacker
- prevents accumulation of status results in filing cabinets and email inboxes
- narrows the verification to the immediate checking occasion
- allows the DBS to return `404` or `EXPIRED` after the validity window

## DBS Status Confirmation

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #1a5f2a; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <span verifiable-text="start" data-for="dbsstatus"></span>
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;">DBS STATUS CONFIRMATION
═══════════════════════════════════════════════════════════════════

Certificate Ref: 001234567890
Check Level:     Enhanced with Barred Lists
Status:          NO CHANGE TO CERTIFICATE
As At:           21 Mar 2026 10:15 UTC
Valid Until:     22 Mar 2026 10:15 UTC
Salt:            P8K2M4Q7

<span data-verify-line="dbsstatus">verify:gov.uk/dbs-status/v</span></pre>
  <span verifiable-text="end" data-for="dbsstatus"></span>
</div>

## Expired Confirmation

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #7a1f1f; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;">Verification Result
═══════════════════════════════════════════════════════════════════

Status:            EXPIRED
Original Validity: 24 hours
Result:            A fresh DBS status confirmation must be generated

verify:gov.uk/dbs-status/v
</pre>
</div>

## Data Verified

Certificate reference number, check level (Basic, Standard, Enhanced, Enhanced with Barred Lists), status result, confirmation timestamp, expiry timestamp, and salt.

**Document Types:**
- **24-Hour DBS Status Confirmation**

**What is deliberately NOT included:**

- the person's name
- date of birth
- address
- disclosure results or conviction details
- the name of the registered body (employer) that requested the original check
- the position the check was for

The person's name is not in the verifiable text. Only the certificate reference and status appear. The employer sees the person's identity documents separately. The verifiable claim confirms the status, not the identity.

## Data Visible After Verification

Shows the issuer domain and the current DBS Update Service status result.

**Status Indications:**
- **No Change to Certificate** — The certificate remains current; no new information since issue
- **Changed** — New information has been added since the certificate was issued; a new DBS check is required
- **Expired** — Confirmation window ended; new confirmation required
- **404** — No matching short-lived confirmation exists

## Second-Party Use

The **worker** benefits directly.

**Proactive sharing:** The worker can demonstrate that their DBS is current without waiting for a prospective employer to run the check themselves. This is useful when approaching multiple employers, volunteer organisations, or agencies simultaneously.

**Privacy-preserving proof:** The confirmation contains no personal details — only the certificate reference and the status result. The worker controls when to generate a fresh confirmation and who to share it with.

**Faster onboarding:** For roles requiring DBS checks (teaching, care work, NHS, volunteering with children), the delay between applying and starting work is often driven by DBS processing. A worker who already holds a current certificate and subscribes to the Update Service can share a verified status confirmation on day one.

## Third-Party Use

**Employers**

**Status confirmation:** Verifying that a candidate's DBS certificate is still current using a cryptographically verifiable, time-limited confirmation rather than asking the candidate to wait while the employer navigates the DBS Update Service website.

**Important limitation:** This confirmation answers "is certificate 001234567890 still current?" It does not confirm that the person presenting it is the person named on the certificate. The employer must still verify the person's identity against the original certificate and their identity documents. The status confirmation is one component of the safeguarding process, not a replacement for identity checks.

**Volunteer Organisations**

**Screening:** Schools, churches, sports clubs, and youth organisations that require DBS checks for volunteers. A verified status confirmation lets the organisation confirm a volunteer's DBS is current before they begin working with children or vulnerable adults.

**Recruitment Agencies**

**Placement:** Agencies placing workers into schools, care homes, and NHS trusts can verify DBS status for each placement occasion. Each placement generates its own short-lived proof.

**Schools and Care Homes**

**Supply staff:** Supply teachers and agency care workers move between settings frequently. Each setting needs to confirm DBS status. A fresh 24-hour confirmation for each assignment avoids the current practice of photocopying certificates and hoping they're still valid.

## Verification Architecture

**The Gap Between Certificate and Status**

The DBS system currently has two components:

1. **The certificate** — a paper document posted to the applicant, containing their name, date of birth, disclosure results, and a certificate number. It is a point-in-time snapshot.
2. **The Update Service** — an online service where employers can enter the certificate number and the applicant's date of birth to check whether the certificate is still current.

The problem is that these two components don't connect in a verifiable way for the worker:

- The certificate is a piece of paper with no security features beyond a watermark.
- The Update Service produces a screen result that the employer sees but the worker cannot share.
- A worker moving between settings (supply teacher, agency carer, locum nurse) must rely on each new employer running the check themselves.
- The worker has no way to proactively demonstrate their status is clean.

This use case provides the missing piece: a short-lived, verifiable proof of the Update Service status check, bound to the certificate reference and timestamped, that the worker can share.

## Privacy Salt

Required. Criminal record status is classified as special category data under UK GDPR. The salt ensures each confirmation instance produces a unique hash, preventing cross-correlation between different checking occasions. Without the salt, an observer collecting hashes could determine that the same certificate was checked on multiple dates and correlate those checks with job applications.

## Competition vs. Current Practice

| Feature | Short-Lived Status Confirmation | DBS Update Service (Current) | Paper DBS Certificate | Photocopy of Certificate |
| :--- | :--- | :--- | :--- | :--- |
| **Proves certificate is current** | **Yes.** | **Yes.** | **No.** Point-in-time only. | **No.** |
| **Worker can share proactively** | **Yes.** | **No.** Employer must check. | **Yes.** But unverifiable. | **Yes.** But unverifiable. |
| **Privacy-preserving** | **High.** Reference and status only. | **Medium.** Requires DOB to check. | **Low.** Full personal details. | **Low.** Full personal details. |
| **Replay-resistant** | **Yes.** Expires in 24 hours. | **N/A.** Live check. | **No.** | **No.** |
| **Machine-verifiable** | **Yes.** | **No.** Screen scraping only. | **No.** | **No.** |

**Practical conclusion:** the DBS Update Service is the current best practice for confirming certificate status. A short-lived verifiable confirmation would complement it by giving workers a portable, privacy-preserving proof they can share proactively — without requiring the receiving party to have Update Service access or the applicant's date of birth.

## Authority Chain

**Pattern:** Sovereign / Government Agency

```
✓ gov.uk/dbs-status/v — Short-lived DBS Update Service status confirmation
  ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Further Derivations

None yet.

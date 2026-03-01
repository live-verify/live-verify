---
title: "No Convictions Declarations & Good Standing Certificates"
category: "Legal & Court Documents"
volume: "Large"
retention: "1-3 years (application cycles)"
slug: "no-convictions-declarations"
tags: ["no-convictions", "good-standing", "character-certificate", "police-check", "clearance"]
---

## What is a No Convictions Declaration?

A no convictions declaration (also called a certificate of good standing, good character certificate, or police clearance) is an affirmative statement that an individual has no criminal convictions, or no relevant convictions within a specified scope. Unlike background check results that report findings, these are declarative certificates used for licensing, immigration, and employment.

These certificates are high-value fraud targets. A fake "no convictions" certificate can enable someone with disqualifying convictions to obtain licenses, visas, or positions they're ineligible for.

<div style="font-family: 'Courier New', monospace; background: #f9f9f9; padding: 15px; border: 1px solid #999; font-size: 1em; color: #000; line-height: 1.6; max-width: 550px; margin: 24px auto;">
  <span verifiable-text="start" data-for="driver">[</span>CDL DRIVER CERTIFICATION<br>
  California Department of Motor Vehicles<br>
  Driver: Robert Martinez<br>
  CDL: C1234567<br>
  I certify: No disqualifying offenses<br>
  No DUI/DWI in past 10 years<br>
  No drug-related license suspension<br>
  Certification Date: January 5, 2026<br>
  <span data-verify-line="driver">verify:dmv.ca.gov/cdl</span> <span verifiable-text="end" data-for="driver">]</span>
</div>

<div style="font-family: 'Courier New', monospace; background: #f9f9f9; padding: 15px; border: 1px solid #999; font-size: 1em; color: #000; line-height: 1.6; max-width: 550px; margin: 24px auto;">
  <span verifiable-text="start" data-for="childcare">[</span>CHILDCARE WORKER CLEARANCE<br>
  Pennsylvania Department of Human Services<br>
  Applicant: Jennifer Williams<br>
  Clearance #PA-CC-2026-88412<br>
  Result: No Prohibiting Offenses<br>
  Scope: Child Protective Services<br>
  State Police Criminal History<br>
  FBI Fingerprint Check<br>
  Valid Through: January 5, 2027<br>
  <span data-verify-line="childcare">verify:dhs.pa.gov/clearance</span> <span verifiable-text="end" data-for="childcare">]</span>
</div>

<div style="font-family: 'Courier New', monospace; background: #f9f9f9; padding: 15px; border: 1px solid #999; font-size: 1em; color: #000; line-height: 1.6; max-width: 550px; margin: 24px auto;">
  <span verifiable-text="start" data-for="security">[</span>SECURITY INDUSTRY AUTHORITY<br>
  United Kingdom<br>
  License Check<br>
  Holder: David Thompson<br>
  License: SIA-1234-5678-9012<br>
  Type: Door Supervisor<br>
  Status: No Objection to Employment<br>
  Verified: January 7, 2026<br>
  <span data-verify-line="security">verify:sia.homeoffice.gov.uk</span> <span verifiable-text="end" data-for="security">]</span>
</div>

<div style="font-family: 'Courier New', monospace; background: #f9f9f9; padding: 15px; border: 1px solid #999; font-size: 1em; color: #000; line-height: 1.6; max-width: 550px; margin: 24px auto;">
  <span verifiable-text="start" data-for="fin">[</span>FINRA DISCLOSURE CHECK<br>
  Financial Industry Regulatory Authority<br>
  Representative: Marcus Chen<br>
  CRD #7741892<br>
  Disclosure Events: None<br>
  Regulatory Actions: None<br>
  Customer Complaints: None<br>
  As of: January 6, 2026<br>
  <span data-verify-line="fin">verify:finra.org/brokercheck</span> <span verifiable-text="end" data-for="fin">]</span>
</div>

## Data Verified

Issuing authority, applicant/holder name, certificate/license number, scope of certification, specific disqualifying categories checked, certification date, validity period.

**Document Types:**
- **Driving Certification:** No disqualifying driving offenses.
- **Childcare Clearance:** No prohibiting offenses for working with children.
- **Security License:** No objection to security industry employment.
- **Financial Industry Check:** No regulatory disclosures or complaints.
- **Healthcare Worker Clearance:** No patient abuse or professional misconduct.

## Data Visible After Verification

Shows the issuer domain (`dmv.ca.gov`, `finra.org`) and certification status.

**Status Indications:**
- **Clear** — No disqualifying conditions found.
- **Conditional** — Cleared with limitations or conditions.
- **Expired** — Validity period has passed.
- **Revoked** — Clearance withdrawn due to new information.
- **Under Review** — Status being reassessed.

## Second-Party Use

The **Applicant/Worker** benefits from verification.

**Job Applications:** Workers in regulated industries (childcare, healthcare, finance, security) need verified clearances to prove eligibility.

**License Renewals:** Professionals renewing licenses can provide verified clearances to expedite processing.

**Immigration:** Some visa categories require character certificates. Verified declarations satisfy consular requirements.

**Volunteer Positions:** Youth organizations require verified clearances for volunteers.

## Third-Party Use

**Employers**
**Hiring Compliance:** Employers in regulated industries must verify worker clearances. Verified declarations provide documentary proof for compliance audits.

**Licensing Boards**
**Application Processing:** Boards verify that applicant-submitted clearances are genuine before issuing licenses.

**Regulatory Agencies**
**Supervision:** Agencies supervising regulated industries verify ongoing clearance status of licensees.

**Schools / Youth Organizations**
**Volunteer Screening:** Verify that volunteer-submitted clearances are authentic.

**Insurance Companies**
**Underwriting:** Verify clearances before issuing professional liability coverage.

## Verification Architecture

**The No Convictions Fraud Problem**

- **Fabricated Certificates:** Entirely fake clearance documents.
- **Scope Misrepresentation:** Narrow clearances presented as comprehensive.
- **Expired Clearances:** Old certificates presented as current.
- **Identity Fraud:** Someone else's clearance used with altered name.

**Issuer Types** (First Party)

**State Agencies:** (DMV, DHS, licensing boards) issue specialized clearances.
**Federal Agencies:** (FBI, TSA, FINRA) federal-level clearances.
**Professional Regulators:** Industry-specific regulatory bodies.
**International:** National police services issuing character certificates.

**Continuous Monitoring**

Some clearances (e.g., FINRA, TSA PreCheck) involve continuous monitoring. The verification hash represents status as of a point in time; verifiers should note the date and understand that status can change.

**Scope Clarity**

Different clearances check different things. A childcare clearance checks specific offenses related to child welfare. A driving certification checks driving-related offenses. Verified clearances should clearly indicate their scope so verifiers understand what was and wasn't checked.


## Jurisdictional Witnessing

A jurisdiction may require the issuer to retain a **witnessing firm** for regulatory compliance. The witnessing firm:

- Receives all hashes from the issuer, and any subsequent changes to the payload as they happen—which may manifest as a new hash, a status change, or even a 404 (record deleted)
- Receives structured content/metadata (key identifiers and dates)
- Does **NOT** receive plaintext or sensitive personal information
- Provides an immutable, timestamped audit trail—available to the jurisdiction on demand, to document holders/third parties during disputes, or as expert witness testimony in legal proceedings

This provides:
- **Non-repudiation:** Issuer cannot deny issuing the document
- **Timestamp proof:** Document existed at a specific time
- **Regulatory audit:** Jurisdictions can inspect the witness ledger for fraud detection
- **Resilience:** Verification works even if issuer's systems go down

**Public Blockchain (Non-Party)**

Witnessing firms may periodically commit rollups to an inexpensive public blockchain, providing an ultimate immutability guarantee. The blockchain is a "non-party"—infrastructure, not a participant in the transaction. This creates multiple verification paths:

1. **Issuer domain** — Direct check against the issuer
2. **Witnessing firm** — Independent confirmation with timestamp
3. **Public blockchain** — Decentralized trust anchor via rollup inclusion

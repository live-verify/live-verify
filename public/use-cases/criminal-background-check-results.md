---
title: "Criminal Background Check Results"
category: "Legal & Court Documents"
volume: "Very Large"
retention: "1-7 years (varies by use)"
slug: "criminal-background-check-results"
tags: ["background-check", "criminal-history", "clearance", "NCIC", "fingerprint", "police-check"]
---

## What is a Criminal Background Check Result?

A criminal background check result is an official report from a law enforcement agency, court system, or authorized provider stating what criminal records exist (or don't exist) for an individual. This includes police clearance letters, FBI fingerprint checks, state criminal history records, and jurisdiction-specific checks.

Background check fraud is extensive: fake "no record found" letters, altered results hiding convictions, and fraudulent clearance documents from non-existent agencies.

<div style="font-family: 'Courier New', monospace; background: #f9f9f9; padding: 15px; border: 1px solid #999; font-size: 1em; color: #000; line-height: 1.6; max-width: 550px; margin: 24px auto;">
  <span verifiable-text="start" data-for="fbi">[</span>FBI IDENTITY HISTORY SUMMARY<br>
  Federal Bureau of Investigation<br>
  Request #FBI-2025-8841772<br>
  Subject: Sarah Johnson<br>
  DOB: March 15, 1990<br>
  SSN: ***-**-4892<br>
  Result: No Criminal History Found<br>
  Search Date: January 5, 2026<br>
  <span data-verify-line="fbi">verify:fbi.gov/background</span> <span verifiable-text="end" data-for="fbi">]</span>
</div>

<div style="font-family: 'Courier New', monospace; background: #f9f9f9; padding: 15px; border: 1px solid #999; font-size: 1em; color: #000; line-height: 1.6; max-width: 550px; margin: 24px auto;">
  <span verifiable-text="start" data-for="state">[</span>STATE CRIMINAL HISTORY RECORD<br>
  Texas Department of Public Safety<br>
  Request #TX-BCK-2026-00441<br>
  Subject: Michael Torres<br>
  DL: 12345678<br>
  Records Found: None<br>
  Search Scope: Texas Statewide<br>
  Valid Through: April 5, 2026<br>
  <span data-verify-line="state">verify:dps.texas.gov/crimhist</span> <span verifiable-text="end" data-for="state">]</span>
</div>

<div style="font-family: 'Courier New', monospace; background: #f9f9f9; padding: 15px; border: 1px solid #999; font-size: 1em; color: #000; line-height: 1.6; max-width: 550px; margin: 24px auto;">
  <span verifiable-text="start" data-for="police">[</span>POLICE CLEARANCE CERTIFICATE<br>
  Metropolitan Police Service<br>
  London, United Kingdom<br>
  Reference: ACRO/2026/884112<br>
  Subject: James Chen<br>
  DOB: July 22, 1985<br>
  Result: No Trace<br>
  Purpose: Overseas Employment<br>
  Issue Date: January 6, 2026<br>
  <span data-verify-line="police">verify:acro.police.uk/cert</span> <span verifiable-text="end" data-for="police">]</span>
</div>

<div style="font-family: 'Courier New', monospace; background: #f9f9f9; padding: 15px; border: 1px solid #999; font-size: 1em; color: #000; line-height: 1.6; max-width: 550px; margin: 24px auto;">
  <span verifiable-text="start" data-for="muni">[</span>MUNICIPAL COURT RECORDS CHECK<br>
  City of Phoenix Municipal Court<br>
  Search #MC-2026-7741<br>
  Subject: Lisa Martinez<br>
  Result: No Open Cases<br>
  No Warrants<br>
  No Unpaid Fines<br>
  Search Date: January 7, 2026<br>
  <span data-verify-line="muni">verify:phoenix.gov/courts</span> <span verifiable-text="end" data-for="muni">]</span>
</div>

## Data Verified

Issuing agency, request/reference number, subject name, date of birth (or other identifiers), search scope, result (no record/records found), search date, validity period.

**Document Types:**
- **FBI Identity History Summary:** Federal fingerprint-based check.
- **State Criminal History:** State-level record search.
- **Police Clearance Certificate:** Local or national police check (often for immigration).
- **Municipal Court Check:** City/county court record search.
- **Name-Based Background Check:** Non-fingerprint database search.

## Data Visible After Verification

Shows the issuer domain (`fbi.gov`, `dps.texas.gov`, `acro.police.uk`) and check status.

**Status Indications:**
- **No Record Found** — No criminal history in searched databases.
- **Records Found** — Criminal history exists (details may be separate document).
- **Pending** — Search in progress or awaiting fingerprint processing.
- **Expired** — Validity period has passed, new check required.
- **Superseded** — Newer check has been issued.

## Second-Party Use

The **Subject** benefits from verification.

**Employment Applications:** Job applicants provide background checks to employers. Verified results prove authenticity and prevent employers from questioning document legitimacy.

**Immigration/Visa:** Many countries require police clearance certificates. Verified results are accepted by consulates without additional authentication.

**Professional Licensing:** Licensing boards require background checks. Verified results expedite processing.

**Volunteer Organizations:** Schools, churches, and youth organizations require checks. Verified results simplify onboarding.

## Third-Party Use

**Employers / HR Departments**
**Hiring Decisions:** Employers receiving background check results from applicants can verify authenticity before extending offers.

**Immigration Authorities**
**Visa Processing:** Consulates and immigration agencies verify police clearances submitted with visa applications.

**Licensing Boards**
**Credential Issuance:** Professional boards verify background check results before issuing licenses.

**Background Check Companies**
**Source Verification:** (Checkr, Sterling, HireRight) can verify that documents provided by subjects match official records.

**Schools / Child-Serving Organizations**
**Volunteer Screening:** Verify that volunteer-provided background checks are genuine.

## Verification Architecture

**The Background Check Fraud Problem**

- **Fake Clearances:** Entirely fabricated "no record" letters from real or fake agencies.
- **Altered Results:** Genuine results modified to hide convictions.
- **Expired Results:** Old clearances presented as current.
- **Jurisdiction Gaps:** Results from limited searches presented as comprehensive.

**Issuer Types** (First Party)

**Federal:** FBI (fingerprint-based Identity History Summary).
**State Police/DPS:** State criminal history records.
**Local Police:** Municipal and county police clearances.
**International:** (ACRO UK, RCMP Canada, AFP Australia) national police checks.
**Courts:** Court-specific record searches.

**Verification Timing**

Background check results are point-in-time. New offenses after the search date won't appear. Verifiers should note the search date and request updated checks if significant time has passed.

**Scope Limitations**

No single background check covers all jurisdictions. FBI checks only include fingerprint-submitted records. State checks only cover that state. Verified results should clearly indicate their scope so verifiers understand what was and wasn't searched.

**Privacy Considerations**

Background check results contain sensitive information. The verification hash confirms the document is genuine without requiring the verifier to transmit the contents to the issuing agency.


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

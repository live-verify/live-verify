---
title: "Conviction Expungement & Record Sealing Certificates"
category: "Legal & Court Documents"
volume: "Medium"
retention: "Permanent (legal status)"
slug: "conviction-expungement-certificates"
tags: ["expungement", "sealing", "conviction", "criminal-record", "court-order", "clean-slate"]
---

## What is a Conviction Expungement Certificate?

An expungement certificate confirms that a criminal conviction has been legally erased, sealed, or set aside. The person can legally answer "no" to conviction questions on most applications. Different jurisdictions use different terms: expungement, sealing, set-aside, dismissal, or pardon.

This is life-changing documentation. Fraud includes fake expungements to pass background checks, or criminals misrepresenting the scope of what was actually expunged.

<div style="font-family: 'Courier New', monospace; background: #f9f9f9; padding: 15px; border: 1px solid #999; font-size: 1em; color: #000; line-height: 1.6; max-width: 550px; margin: 24px auto;">
  <span verifiable-text="start" data-for="exp">[</span>ORDER OF EXPUNGEMENT<br>
  Superior Court of California<br>
  County of Los Angeles<br>
  Case #BA-2019-44782<br>
  Petitioner: Michael Rodriguez<br>
  Original Conviction: PC 459 (Burglary)<br>
  Conviction Date: March 15, 2019<br>
  Expungement Granted: January 3, 2026<br>
  Judge: Hon. Sandra Martinez<br>
  <span data-verify-line="exp">verify:courts.ca.gov/expungement</span> <span verifiable-text="end" data-for="exp">]</span>
</div>

<div style="font-family: 'Courier New', monospace; background: #f9f9f9; padding: 15px; border: 1px solid #999; font-size: 1em; color: #000; line-height: 1.6; max-width: 550px; margin: 24px auto;">
  <span verifiable-text="start" data-for="seal">[</span>CERTIFICATE OF RECORD SEALING<br>
  Commonwealth of Pennsylvania<br>
  Court of Common Pleas - Philadelphia<br>
  Case #CP-51-CR-2018-003321<br>
  Defendant: David Williams<br>
  Sealed Offenses: All charges in above case<br>
  Sealing Type: Clean Slate Act Automatic<br>
  Effective: December 15, 2025<br>
  <span data-verify-line="seal">verify:courts.pa.gov/sealed</span> <span verifiable-text="end" data-for="seal">]</span>
</div>

<div style="font-family: 'Courier New', monospace; background: #f9f9f9; padding: 15px; border: 1px solid #999; font-size: 1em; color: #000; line-height: 1.6; max-width: 550px; margin: 24px auto;">
  <span verifiable-text="start" data-for="pardon">[</span>PARDON CERTIFICATE<br>
  Office of the Governor<br>
  State of Virginia<br>
  Pardon #2025-0041<br>
  Recipient: James Thompson<br>
  Original Offense: Felony Drug Possession<br>
  Conviction Date: September 2010<br>
  Type: Full and Unconditional Pardon<br>
  Granted: January 7, 2026<br>
  <span data-verify-line="pardon">verify:governor.virginia.gov/pardons</span> <span verifiable-text="end" data-for="pardon">]</span>
</div>

## Data Verified

Court/issuing authority, case number, petitioner/defendant name, original offense(s), conviction date, type of relief (expungement/sealing/pardon), grant date, scope of relief, any exceptions or limitations.

**Document Types:**
- **Expungement Order:** Court order erasing conviction from record.
- **Sealing Certificate:** Record sealed from public view but not destroyed.
- **Set-Aside Order:** Conviction set aside, plea withdrawn.
- **Pardon Certificate:** Executive clemency forgiving the offense.
- **Certificate of Relief:** Removes collateral consequences without expunging.

## Data Visible After Verification

Shows the issuer domain (`courts.ca.gov`, `governor.virginia.gov`) and record status.

**Status Indications:**
- **Expunged** — Conviction legally erased.
- **Sealed** — Record exists but not publicly accessible.
- **Set Aside** — Conviction vacated, case dismissed.
- **Pardoned** — Offense forgiven by executive authority.
- **Pending Appeal** — Expungement granted but under appeal by prosecution.
- **Reversed** — Expungement reversed due to new offense or fraud.

## Second-Party Use

The **Petitioner (Expungee)** benefits from verification.

**Employment Applications:** Many applications ask about convictions. A verified expungement proves the person can legally answer "no" and provides documentation if the record still appears in background checks.

**Professional Licensing:** Licensing boards often disqualify applicants with certain convictions. Verified expungement proves eligibility.

**Housing Applications:** Landlords conducting background checks. Verified expungement explains why the record shouldn't disqualify the applicant.

**Firearm Rights Restoration:** Some expungements restore firearm rights. Verified documentation proves eligibility to pass NICS checks.

## Third-Party Use

**Employers**
**Background Check Interpretation:** When background checks return expunged records (some databases lag), employers need verified expungement orders to know the record is legally irrelevant.

**Background Check Companies**
**Database Updates:** (Checkr, Sterling, HireRight) use verified expungement orders to update their databases and stop reporting expunged records.

**Professional Licensing Boards**
**Eligibility Determination:** Boards verify that convictions claimed as expunged are actually expunged before granting licenses.

**Immigration Attorneys**
**Visa Applications:** Some expungements affect immigration consequences. Verified orders clarify the applicant's legal status.

**Public Defenders / Legal Aid**
**Verification Services:** Helping clients prove their expungements are valid when encountering stale records.

## Verification Architecture

**The Expungement Fraud Problem**

- **Fake Expungements:** Forged court orders claiming convictions were expunged.
- **Scope Inflation:** Claiming all convictions expunged when only one was.
- **Jurisdiction Shopping:** Using expungement from one state to claim clean record in another.
- **Stale Records:** Legitimate expungements not reflected in background check databases.

**Issuer Types** (First Party)

**State Courts:** Issue expungement and sealing orders.
**Governor's Offices:** Issue pardons and executive clemency.
**Pardon Boards:** (Federal, state) formal pardon review bodies.
**Federal Courts:** Federal conviction expungements (rare, limited cases).

**Background Check Integration**

Background check companies could query court verification endpoints when records appear in searches. If the court returns "Expunged" status, the record would be automatically suppressed from reports.

**Clean Slate Act Compliance**

States with automatic sealing laws (Pennsylvania, Michigan, etc.) could issue verification hashes for automatically sealed records, allowing subjects to prove their eligibility.

**Multi-State Challenges**

Expungement in one state doesn't automatically clear records in other states' databases. Verified expungement orders help individuals prove their status across jurisdictions.


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

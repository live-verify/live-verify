---
title: "Election Results & Certifications"
category: "Government & Civic Documents"
volume: "Medium"
retention: "Permanent (historical record)"
slug: "election-results-certifications"
tags: ["election", "voting", "results", "certification", "canvass", "democracy", "tally"]
---

## What are Election Result Certifications?

Election result certifications are the official documents that declare the outcome of an election. They include precinct-level tallies, county canvass reports, state certifications, and the final certified results that determine winners.

Election result fraud includes altering vote counts, fabricating precinct reports, and misrepresenting certified outcomes. Verified result documents create an immutable audit trail from precinct to final certification.

<div style="font-family: 'Courier New', monospace; background: #f9f9f9; padding: 15px; border: 1px solid #999; font-size: 1em; color: #000; line-height: 1.6; max-width: 550px; margin: 24px auto;">
  <span verifiable-text="start" data-for="precinct">[</span>PRECINCT RESULTS<br>
  Maricopa County Elections<br>
  Precinct: 402 - North High School<br>
  Election: November 5, 2026 General<br>
  <br>
  President:<br>
  Candidate A: 1,247<br>
  Candidate B: 1,089<br>
  Write-in: 23<br>
  <br>
  Total Ballots Cast: 2,359<br>
  Registered Voters: 4,127<br>
  Turnout: 57.2%<br>
  <br>
  Certified by: Precinct Inspector<br>
  Time: Nov 5, 2026 10:42 PM<br>
  <span data-verify-line="precinct">verify:elections.maricopa.gov/results</span> <span verifiable-text="end" data-for="precinct">]</span>
</div>

<div style="font-family: 'Courier New', monospace; background: #f9f9f9; padding: 15px; border: 1px solid #999; font-size: 1em; color: #000; line-height: 1.6; max-width: 550px; margin: 24px auto;">
  <span verifiable-text="start" data-for="county">[</span>COUNTY CANVASS REPORT<br>
  Maricopa County Board of Supervisors<br>
  Election: November 5, 2026 General<br>
  Canvass Date: November 18, 2026<br>
  <br>
  President - County Totals:<br>
  Candidate A: 1,247,892<br>
  Candidate B: 1,189,441<br>
  Write-in: 12,847<br>
  <br>
  Total Ballots: 2,450,180<br>
  Precincts Reporting: 748/748 (100%)<br>
  <br>
  Certified by Board Vote: 4-1<br>
  Chair: William Thompson<br>
  <span data-verify-line="county">verify:elections.maricopa.gov/canvass</span> <span verifiable-text="end" data-for="county">]</span>
</div>

<div style="font-family: 'Courier New', monospace; background: #f9f9f9; padding: 15px; border: 1px solid #999; font-size: 1em; color: #000; line-height: 1.6; max-width: 550px; margin: 24px auto;">
  <span verifiable-text="start" data-for="state">[</span>STATE CERTIFICATION<br>
  Arizona Secretary of State<br>
  Official Canvass<br>
  Election: November 5, 2026 General<br>
  Certification Date: December 2, 2026<br>
  <br>
  President - State of Arizona:<br>
  Candidate A: 1,892,447<br>
  Candidate B: 1,847,221<br>
  Margin: 45,226 (1.2%)<br>
  <br>
  CERTIFIED WINNER: Candidate A<br>
  Electoral Votes: 11<br>
  <br>
  Secretary of State: Maria Santos<br>
  Governor: James Wilson<br>
  <span data-verify-line="state">verify:azsos.gov/elections/certified</span> <span verifiable-text="end" data-for="state">]</span>
</div>

## Data Verified

Election date and type, jurisdiction, office/contest, candidate names, vote counts, total ballots, turnout percentage, certification date, certifying officials, any recount/audit notes.

**Document Types:**
- **Precinct Results:** Initial count from individual polling places.
- **Absentee/Mail Ballot Tally:** Separate count of mail-in votes.
- **Provisional Ballot Report:** Adjudicated provisional ballots.
- **County Canvass:** Aggregated county results certified by board.
- **State Certification:** Final state-level certified results.
- **Recount Report:** Results after official recount.

## Data Visible After Verification

Shows the issuer domain (`elections.maricopa.gov`, `azsos.gov`) and result status.

**Status Indications:**
- **Unofficial** — Preliminary results, not yet certified.
- **Certified** — Officially certified by appropriate authority.
- **Under Recount** — Recount in progress.
- **Amended** — Corrected after error discovery.
- **Contested** — Legal challenge pending.
- **Final** — All challenges resolved, result is permanent.

## Second-Party Use

The **Candidates / Campaigns** benefit from verification.

**Result Confirmation:** Candidates can verify that official results match what was publicly announced.

**Legal Proceedings:** In election contests, verified result documents provide authenticated evidence.

**Historical Record:** Winners can prove their certified election results for biographical purposes.

## Third-Party Use

**Media / Journalists**
**Result Verification:** News organizations can verify that numbers they're reporting match official certified results.

**Courts**
**Election Contests:** Verified result documents serve as authenticated evidence in election lawsuits.

**Academic Researchers**
**Election Studies:** Political scientists can verify historical election data for research.

**International Observers**
**Election Monitoring:** Foreign election observers can independently verify results against official certifications.

**Opposing Campaigns**
**Audit Trail:** Losing candidates can verify the chain of results from precinct to state certification.

## Verification Architecture

**The Election Result Fraud Problem**

- **Count Manipulation:** Altering vote totals in result reports.
- **Precinct Fabrication:** Creating fake precinct-level results.
- **Certification Forgery:** Fake certification documents claiming different winners.
- **Historical Revisionism:** Altering archived results after the fact.

**Issuer Types** (First Party)

**Precinct Officials:** Initial precinct-level results.
**County Election Boards:** County canvass and certification.
**State Secretaries of State:** State-level certification.
**Federal Agencies:** (FEC, EAC) federal election data.

**Chain of Results**

Results flow upward: Precinct → County → State → Federal. Each level's certification should reference the hashes of the lower-level documents it aggregates, creating a verifiable chain.

**Public Transparency**

Unlike many use cases, election results are inherently public. Verification doesn't protect privacy - it ensures that public results haven't been altered after publication.

**Recount Integration**

When recounts occur, the recount report should reference the original certified result hash and explain any changes, creating an auditable correction trail.


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

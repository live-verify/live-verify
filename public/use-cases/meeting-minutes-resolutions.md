---
title: "Meeting Minutes & Resolutions"
category: "Corporate & Legal Documents"
volume: "Very Large"
retention: "Permanent (corporate records)"
slug: "meeting-minutes-resolutions"
tags: ["minutes", "resolutions", "board", "shareholders", "AGM", "corporate-governance", "multi-page"]
---

## What are Meeting Minutes?

Meeting minutes are the official record of what was discussed, decided, and voted upon at corporate meetings. They include board meetings, shareholder meetings, committee meetings, and annual general meetings (AGMs). Minutes serve as legal evidence of corporate decisions and are often required by law.

Meeting minutes fraud includes fabricating votes that never occurred, altering attendance records, and backdating resolutions. Multi-page minutes require per-page verification to prevent page substitution attacks.

**Note:** Due to multi-page complexity and formatting, meeting minutes verification is typically **browser-extension only** rather than camera-based OCR.

## Per-Page Verification

Each page carries its own verification line, with the final page containing a rollup hash of all prior pages.

<div style="font-family: 'Courier New', monospace; background: #f9f9f9; padding: 15px; border: 1px solid #999; font-size: 1em; color: #000; line-height: 1.6; max-width: 550px; margin: 24px auto;">
  <span verifiable-text="start" data-for="min1">[</span>BOARD MEETING MINUTES<br>
  Acme Corporation<br>
  Date: January 5, 2026<br>
  Location: 123 Main Street, Conference Room A<br>
  <br>
  PRESENT: J. Smith (Chair), M. Johnson, R. Williams<br>
  ABSENT: P. Davis (excused)<br>
  QUORUM: Achieved<br>
  <br>
  Call to Order: 10:00 AM<br>
  <br>
  1. Approval of Previous Minutes<br>
  Motion by M. Johnson, seconded by R. Williams<br>
  RESOLVED: Minutes of December 1, 2025 approved<br>
  Vote: 3-0 in favor<br>
  <br>
  Page 1 of 3<br>
  <span data-verify-line="min1">verify:acme-corp.com/governance</span> <span verifiable-text="end" data-for="min1">]</span>
</div>

<div style="font-family: 'Courier New', monospace; background: #f9f9f9; padding: 15px; border: 1px solid #999; font-size: 1em; color: #000; line-height: 1.6; max-width: 550px; margin: 24px auto;">
  <span verifiable-text="start" data-for="min2">[</span>2. Financial Report<br>
  CFO presented Q4 2025 results<br>
  Revenue: $12.4M (up 15% YoY)<br>
  Discussion of 2026 budget allocation<br>
  <br>
  3. New Business<br>
  Motion by J. Smith to authorize $500,000<br>
  capital expenditure for equipment upgrade<br>
  Seconded by M. Johnson<br>
  RESOLVED: Capital expenditure authorized<br>
  Vote: 3-0 in favor<br>
  <br>
  Page 2 of 3<br>
  <span data-verify-line="min2">verify:acme-corp.com/governance</span> <span verifiable-text="end" data-for="min2">]</span>
</div>

<div style="font-family: 'Courier New', monospace; background: #f9f9f9; padding: 15px; border: 1px solid #999; font-size: 1em; color: #000; line-height: 1.6; max-width: 550px; margin: 24px auto;">
  <span verifiable-text="start" data-for="min3">[</span>4. Adjournment<br>
  Motion to adjourn by R. Williams<br>
  Seconded by M. Johnson<br>
  Meeting adjourned: 11:45 AM<br>
  <br>
  Signed: _________________<br>
  J. Smith, Chair<br>
  <br>
  Signed: _________________<br>
  Corporate Secretary<br>
  <br>
  Page 3 of 3<br>
  Prior Page Hashes:<br>
  P1: 8a4f2c...<br>
  P2: 3b7e1d...<br>
  <span data-verify-line="min3">verify:acme-corp.com/governance</span> <span verifiable-text="end" data-for="min3">]</span>
</div>

## Data Verified

Meeting date/time/location, attendees (present/absent), quorum status, agenda items, motions and seconds, resolutions passed, vote counts, signatures, page sequence integrity.

**Document Types:**
- **Board Minutes:** Directors' meeting records.
- **Shareholder Minutes:** Annual/special meeting records.
- **Committee Minutes:** Audit, compensation, governance committees.
- **Written Consent:** Action by written consent in lieu of meeting.
- **AGM Minutes:** Annual general meeting records.

## Data Visible After Verification

Shows the issuer domain (`acme-corp.com`, `companysec.com`) and document status.

**Status Indications:**
- **Approved** — Minutes approved by subsequent meeting.
- **Draft** — Minutes pending approval.
- **Amended** — Corrections made and approved.
- **Superseded** — Replaced by corrected version.

## Second-Party Use

The **Corporation / Directors** benefit from verification.

**Regulatory Filings:** Proving board authorization for SEC filings, loan agreements, or major transactions.

**Litigation Defense:** Verified minutes prove proper corporate process was followed.

**Due Diligence:** M&A buyers verify that target company followed proper governance.

## Third-Party Use

**Regulators**
**Compliance Verification:** SEC, banking regulators verify that required approvals were properly obtained.

**Banks / Lenders**
**Loan Authorization:** Verify board resolution authorizing borrowing before funding.

**Auditors**
**Governance Audit:** Verify that significant transactions had proper board approval.

**Courts**
**Shareholder Disputes:** Verified minutes prove (or disprove) what was actually decided.

**M&A Advisors**
**Due Diligence:** Verify governance history of acquisition targets.

## Verification Architecture

**The Meeting Minutes Fraud Problem**

- **Fabricated Resolutions:** Creating minutes for meetings that never occurred.
- **Vote Manipulation:** Altering vote counts or adding non-existent approvals.
- **Backdating:** Creating minutes after the fact to justify prior actions.
- **Page Substitution:** Replacing pages to change what was "decided."
- **Attendance Fraud:** Adding or removing attendees to affect quorum.

**Issuer Types** (First Party)

**Corporate Secretaries:** In-house governance officers.
**Registered Agents:** (CSC, CT Corporation) corporate service providers.
**Law Firms:** Acting as corporate secretary.
**Board Portal Providers:** (Diligent, BoardEffect) governance platforms.

**Per-Page Integrity**

Multi-page minutes require per-page hashes to prevent page substitution. The final page includes hashes of all prior pages, creating a chain that detects any page modifications.

**Browser Extension Only**

Camera-based OCR is impractical for multi-page meeting minutes due to:
- Document length (often 5-20+ pages)
- Complex formatting (tables, indentation)
- Need to verify page sequence integrity
- Signature verification requirements

Browser extension verification allows page-by-page scanning of digital documents with automatic rollup verification.


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

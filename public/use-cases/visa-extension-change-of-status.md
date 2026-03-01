---
title: "Visa Extensions and Change of Status approvals"
category: "Immigration & Visa Documents"
volume: "Medium"
retention: "New status validity + 7 years"
slug: "visa-extension-change-of-status"
tags: ["immigration", "visa-extension", "change-of-status", "i-797", "uscis", "h1b-extension", "work-authorization", "legal-stay"]
furtherDerivations: 1
---

## What is a Visa Extension Approval?

When a person in the US on a temporary visa (e.g., H-1B, F-1, or B-2) wants to stay longer or switch to a different visa type, they file a **Change of Status (COS)** or **Extension of Stay (EOS)**. The approval arrives as an **I-797A Notice of Action**, often with a new paper I-94 attached at the bottom.

These documents are the "Proof of Legal Presence." Fraud is rampant: people whose extensions were denied often "edit" a 2024 approval into a 2026 approval to hide their illegal overstay and trick employers or landlords into believing they are still in status. Verified hashes bind the **Receipt Number, New Expiration Date, and Visa Class** to the `uscis.gov` domain.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="extension">[</span>I-797A | NOTICE OF ACTION
DEPARTMENT OF HOMELAND SECURITY
U.S. CITIZENSHIP AND IMMIGRATION SERVICES
═══════════════════════════════════════════════════════════════════

Receipt Number:  WAC-26-992-28877         Notice Date: MARCH 15, 2026
Petitioner:      GOLIATH TECH SOLUTIONS   Class:       H-1B1
Beneficiary:     JOHN JACOB DOE           Case Type:   I-129 Extension

APPROVAL NOTICE
───────────────────────────────────────────────────────────────────
The above petition for an extension of stay has been approved.
The beneficiary's status is extended from 03/15/2026 to 03/14/2029.

         [ NEW DETACHABLE I-94 RECORD ATTACHED BELOW ]

<span data-verify-line="extension">verify:uscis.gov/v/i797</span> <span verifiable-text="end" data-for="extension">]</span></pre>
</div>

## Data Verified

Receipt number (e.g., WAC/LIN/EAC), petitioner/employer name, beneficiary name, case type (I-129/I-539), notice date, approval dates (start/end), new visa class (e.g., H-1B, O-1, L-1), I-94 number (linked), issuing office ID.

**Document Types:**
- **I-797A Notice of Action:** (With I-94) The primary approval for those in the US.
- **I-797B Notice of Action:** (Without I-94) Approval for those abroad.
- **Form I-94 Arrival/Departure Record:** (Linked hash) the underlying stay record.
- **SEVIS Form I-20:** (Linked hash) for students extending their program.

## Data Visible After Verification

Shows the issuer domain (`uscis.gov`) and the real-time case standing.

**Status Indications:**
- **Approved / Active** — The extension is valid and the subject is in legal status.
- **Case Reopened** — **ALERT:** The approval is under post-decision review.
- **Revoked** — **CRITICAL:** The approval has been cancelled (e.g., due to job loss or fraud).
- **Unknown** — **CRITICAL:** Hash not found; high risk of a "Synthetic Notice" forgery.

## Second-Party Use

The **Employee (Beneficiary)** benefits from verification.

**Employment Onboarding (I-9):** An H-1B worker switching jobs can show the verified hash of their "Transfer Approval." The new employer's HR manager can instantly see **"APPROVED - H-1B"** on their phone, allowing the worker to start immediately without the fear of a $10,000 "Illegal Hiring" fine.

**Driver's License Renewal:** DMVs require proof of legal stay to renew a Real ID. Providing a verified hash of the I-797A allows the DMV clerk to bypass the 10-day "SAVE" database delay and issue the license on the spot.

## Third-Party Use

**Employers / HR Managers**
**Zero-Trust Vetting:** Thousands of fake I-797s are sold globally every year. Live Verify connects the manager directly to the USCIS record in seconds, stopping "Status Hiding" where a terminated employee tries to get a new job using an edited notice.

**Landlords / Leasing Agents**
**Eligibility Check:** Verifying that a non-citizen applicant has the verified legal status to remain in the US for the duration of a 12-month lease.

**International Travel Checkpoints**
**Boarding Prep:** Verifying that a traveler who has an expired visa in their passport actually has a verified, active extension notice before allowing them to board a flight back to the US.

## Verification Architecture

**The "Date Stretch" Fraud Problem**

- **Validity Inflation:** Changing a 2024 expiration date to 2027 on a PDF to hide an overstay.
- **Class Swapping:** Editing a "B-2" (Tourist - No Work) notice into an "H-1B" (Worker) notice.
- **Notice Fabrication:** Creating a fake "Approval Notice" for a case that was actually denied.

**Issuer Types** (First Party)

**U.S. Citizenship and Immigration Services (USCIS).**
**DHS SAVE System (Backend Source).**

**Privacy Salt:** Highly Critical. Case numbers and names are protected under the Privacy Act. The hash must be salted to prevent "Case Scraping" by unauthorized data brokers.

## Rationale

Visa extensions are the "Oxygen of Legal Presence." By turning notices into verifiable digital bridges, we protect the US labor market from fraud and ensure that legal residents can live and work without unfair administrative delays.

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

**Jurisdictional Requirements (International/USCIS)**

USCIS documents require independent witnessing firms located outside the US for cross-border verification, particularly when:
- The applicant is in a non-treaty jurisdiction
- The application involves multiple countries
- The document is shared with foreign governments or international organizations

**Geographic Separation Rule:** Witnessing firms must not be located in the applicant's destination country, preventing local collusion while ensuring neutral verification.

**Public Blockchain (Non-Party)**

Witnessing firms may periodically commit rollups to an inexpensive public blockchain, providing an ultimate immutability guarantee. The blockchain is a "non-party"—infrastructure, not a participant in the transaction. This creates multiple verification paths:

1. **Issuer domain** — Direct check against the issuer
2. **Witnessing firm** — Independent confirmation with timestamp
3. **Public blockchain** — Decentralized trust anchor via rollup inclusion

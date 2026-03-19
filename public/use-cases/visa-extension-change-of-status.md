---
title: "Visa Extensions and Change of Status approvals"
category: "Immigration & Visa Documents"
volume: "Medium"
retention: "New status validity + 7 years"
slug: "visa-extension-change-of-status"
verificationMode: "clip"
tags: ["immigration", "visa-extension", "change-of-status", "i-797", "uscis", "h1b-extension", "work-authorization", "legal-stay"]
furtherDerivations: 1
---

## What is a Visa Extension Approval?

When a person in the US on a temporary visa (e.g., H-1B, F-1, or B-2) wants to stay longer or switch to a different visa type, they file a **Change of Status (COS)** or **Extension of Stay (EOS)**. The approval arrives as an **I-797A Notice of Action**, often with a new paper I-94 attached at the bottom.

These documents are the "Proof of Legal Presence." Fraud is rampant: people whose extensions were denied often "edit" a 2024 approval into a 2026 approval to hide their illegal overstay and trick employers or landlords into believing they are still in status. But the strongest answer is still the official USCIS/CBP/SAVE workflow where available. Live Verify is only credible as a bridge when a relying party is holding the paper notice or PDF outside that native government system.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="extension"></span>I-797A | NOTICE OF ACTION
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

<span data-verify-line="extension">verify:uscis.gov/v/i797</span> <span verifiable-text="end" data-for="extension"></span></pre>
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

**Employment Onboarding (I-9):** The strongest production path is still the official employer-verification workflow. Live Verify is more plausible when HR is holding only the approval notice or PDF and needs a lighter bridge back to current government status.

**Driver's License Renewal:** DMVs require proof of legal stay to renew a Real ID. A bridge from the notice to current status may help when staff are working from the notice itself, but SAVE or other direct government checks should remain primary.

## Third-Party Use

**Employers / HR Managers**
**Zero-Trust Vetting:** Thousands of fake I-797s are sold globally every year. The official government workflow should remain primary; Live Verify is only the portability layer when the document itself is what is circulating.

**Landlords / Leasing Agents**
**Eligibility Check:** Verifying that a non-citizen applicant has the verified legal status to remain in the US for the duration of a 12-month lease.

**International Travel Checkpoints**
**Boarding Prep:** This is only defensible as an edge-case bridge from the paper notice to current status. Carrier-facing government document systems should remain dominant.

## Verification Architecture

**The "Date Stretch" Fraud Problem**

- **Validity Inflation:** Changing a 2024 expiration date to 2027 on a PDF to hide an overstay.
- **Class Swapping:** Editing a "B-2" (Tourist - No Work) notice into an "H-1B" (Worker) notice.
- **Notice Fabrication:** Creating a fake "Approval Notice" for a case that was actually denied.

**Issuer Types** (First Party)

**U.S. Citizenship and Immigration Services (USCIS).**
**DHS SAVE System (Backend Source).**

**Privacy Salt:** Highly Critical. Case numbers and names are protected under the Privacy Act. The hash must be salted to prevent "Case Scraping" by unauthorized data brokers.

## Authority Chain

**Pattern:** Sovereign

Approves visa extensions and changes of immigration status.

```
✓ uscis.gov/extension/verify — Approves visa extensions and changes of immigration status
  ✓ usa.gov/verifiers — US federal government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Rationale

Visa extensions are important status artifacts, but they should not displace official USCIS/CBP/SAVE channels. The narrower claim is that when a notice or PDF is already traveling outside those systems, a direct bridge back to issuer status is better than trusting the paper alone.

## Jurisdictional Witnessing (Optional)

Some jurisdictions, contracts, or multi-party workflows may add an independent witness layer. When used, the witnessing firm:

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

If a witness layer exists, it may periodically commit rollups to a public blockchain as an additional timestamping mechanism. That is optional, not inherent to the use case. The verification paths would then be:

1. **Issuer domain** — Direct check against the issuer
2. **Witnessing firm** — Independent confirmation with timestamp
3. **Public blockchain** — Decentralized trust anchor via rollup inclusion

## See Also

- [Employment Authorization Documents (EAD)](view.html?slug=employment-authorization-ead) — Similar “artifact bridge, official workflow primary” pattern
- [Border Crossing Receipts (I-94)](view.html?slug=border-crossing-receipts-i94) — Direct DHS/CBP systems should remain the main current-status path
- [Advance Parole and Re-Entry Permits](view.html?slug=advance-parole-reentry-permits) — Another immigration-status edge-case bridge

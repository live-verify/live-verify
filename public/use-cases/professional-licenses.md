---
title: "Professional Licenses"
category: "Professional & Educational Qualifications"
volume: "Very Large"
retention: "Permanent (license lifecycle)"
slug: "professional-licenses"
verificationMode: "both"
tags: ["professional-licensing", "medical-license", "legal-bar", "occupational-license", "practitioner-vetting", "credentialing", "public-safety", "consumer-protection"]
furtherDerivations: 1
---

## What is a Professional License?

A **Professional License** is the legal authorization to practice in a high-stakes field like medicine, law, engineering, or teaching. These licenses are the primary defense against "Unlicensed Practice," which can lead to medical malpractice, legal incompetence, or structural failures.

The licensing board's registry remains the source of truth. Live Verify is strongest here as a **complementary bridge** when professional-status claims travel outside that registry in human workflows:

- a patient scans a wall certificate in a waiting room before the consultation starts
- a hospital receives a portable letter of good standing in a credential packet
- a staffing firm or insurer receives a temporary-authority or status excerpt before opening the board lookup page

That is a better fit than treating the pocket card or framed certificate as the core artifact of trust.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="prof"></span>MEDICAL BOARD
STATE OF NEW YORK
═══════════════════════════════════════════════════════════════════

Practitioner Name:    DR. SARAH J. DOE
License #:            NY-992288-X
Profession:           Physician & Surgeon

Authorized to practice medicine in the State of New York.

<span data-verify-line="prof">verify:nysed.gov/v/med</span> <span verifiable-text="end" data-for="prof"></span></pre>
</div>

## Data Verified

Licensee name, license number, profession (e.g., Physician, Attorney, PE), primary specialty, issuing jurisdiction (State/Board), date of initial licensure, expiration date, photograph (via hash), disciplinary status (Clear/Flagged), background check timestamp.

**Document Types:**
- **Letter of Good Standing:** The strongest portable status document for reciprocity and credential packets.
- **Temporary Permit / Temporary Authority Letter:** For locum tenens, supervised practice, or emergency deployment.
- **Wall Certificate:** A visible surface in offices and waiting rooms that can bridge to current standing.
- **License Pocket Card:** A lightweight in-person credential, but usually not the strongest substantive artifact.

## Verification Response

The endpoint returns a simple status code:

- **OK** — License is valid and the practitioner is in good standing
- **PROBATIONARY** — License valid but under board supervision; verifier should inquire further
- **SUSPENDED** — Practice authority temporarily revoked; do not engage
- **REVOKED** — Permanent termination of practice authority; do not engage
- **EXPIRED** — Mandatory renewal or fees overdue; practitioner may not legally practice
- **404** — License not found (never issued, OCR error, or practitioner deceased)

The issuer domain is visible from the `verify:` line on the credential itself (e.g., `nysed.gov`).

## Post-Verification Actions

After successful verification, the response includes a link to the licensing board's public profile:

```
HTTP 200 OK
Status: OK

More: https://nysed.gov/professions/lookup/992288
```

**What the Public Profile Provides:**

- **Disciplinary history** — Past actions, settlements, or complaints
- **Specialty certifications** — Board certifications beyond basic licensure
- **Practice restrictions** — Any limitations on scope of practice
- **Complaint channel** — How to report concerns to the board

**Why a Link, Not a POST Form:**

Professional licensing boards already have robust complaint mechanisms—adding duplicate infrastructure would be wasteful. The verification confirms current status; the board's existing public profile and complaint system handles everything else.

This mirrors the bar-admission pattern: verification proves standing, existing infrastructure handles deeper inquiries.

## Second-Party Use

The **Professional (Practitioner)** benefits from verification.

**Credentialing Speed:** When a doctor applies for hospital privileges at a new facility, they can provide a portable good-standing or temporary-authority document with a verification line. The Medical Staff Office can pre-screen it immediately while formal primary-source verification continues through the board and the hospital's normal process.

**Reciprocity Claims:** An engineer licensed in Ohio can show a verified hash to a client in Indiana to prove they meet the requirements for "Temporary Practice" without needing to mail physical documents.

## Third-Party Use

**Patients and Clients**
**Discreet Waiting-Room Verification:** Before undergoing a private procedure or signing a legal retainer, a patient or client can discreetly scan the visible wall certificate in a waiting room or reception area. The certificate works as a visible surface that bridges to current board status without interrupting the consultation itself.

**Employers (Hospitals / Law Firms)**
**Continuous Monitoring:** Instead of checking licenses once a year, HR software can automatically scan the hashes of all 500 staff members. If a nurse's license returns **"SUSPENDED"** on a random Tuesday, the system can instantly alert the shift manager to pull them from duty.

**Insurance Companies (Malpractice)**
**Risk Underwriting:** Verifying the current standing of all insured practitioners before renewing a professional liability policy.

## Verification Architecture

**The "Ghost Practitioner" Fraud Problem**

- **Status Hiding:** Continuing to practice using a physical "Valid" card after the board revoked the license for drug abuse or theft.
- **Specialty Inflation:** Claiming to be "Board Certified" in Neurosurgery when only licensed as a General Practitioner.
- **Credential Mimicry:** Using a stolen license number and name to open a "pill mill" or fraudulent law clinic.

**Issuer Types** (First Party)

**State Professional Boards.**
**National Specialty Boards (e.g., ABMS).**
**Consortium Registries (e.g., FSMB, Nursys).**

**Privacy Salt:** Critical. License numbers and disciplinary data are sensitive. The hash must be salted to prevent "Mass Roster Scraping" of the state's professional workforce.

## Authority Chain

**Pattern:** Regulated

```
✓ license.example-board.texas.gov/verify — Licenses professionals in the state of Texas
  ✓ texas.gov — Texas state government
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Rationale

Professional licensing is about public protection. The registry remains primary. Live Verify adds value when visible display artifacts or portable status documents need to bridge back to current board standing without assuming that the framed certificate itself is the thing being trusted.

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

## Further Reading

[Deep dive: Medical Licenses and Professional Licensing](https://github.com/live-verify/live-verify/tree/main/deep-dives/Medical_License.md)

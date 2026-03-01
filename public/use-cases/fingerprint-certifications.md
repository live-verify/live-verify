---
title: "Fingerprint Certifications"
category: "Notary Services"
volume: "Large"
retention: "Background check + 3-7 years"
slug: "fingerprint-certifications"
tags: ["fingerprint-background-check", "fbi-background-check", "notary-certification", "identity-verification", "employment-vetting", "livescan", "biometric-verification"]
furtherDerivations: 1
---

## What is a Fingerprint Certificate?

For high-security jobs (like working at a bank or a nuclear plant), a simple background check isn't enough. You must have your fingerprints "rolled" onto an FBI FD-258 card.

The **Certificate of Fingerprinting** is the paper signed by a Notary Public or Police Officer swearing: "I verified this person's ID and I watched them roll these specific prints."

"Identity Swapping" is a common fraud: a person with a criminal record sends a "clean" friend to the fingerprinting appointment to get a clear background check. Verified hashes (including a photo of the person being printed) stop this "Biometric Fraud" at the source.

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 1px solid #ccc; background: #fff; padding: 40px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); position: relative;">
  <div style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 25px;">
    <h2 style="margin: 0; text-transform: uppercase; letter-spacing: 1px;"><span verifiable-text="start" data-for="finger">[</span>CERTIFICATE OF FINGERPRINTING</h2>
  </div>
<div style="font-size: 1em; line-height: 1.6; color: #333; text-align: justify;">
    <p>I, the undersigned Notary Public, hereby certify that <strong>JOHN JACOB DOE</strong> (DOB: 05/15/1985) appeared before me this day and was fingerprinted using the standard FBI FD-258 card format.</p>
<div style="display: flex; justify-content: space-around; margin: 20px 0;">
      <div style="width: 80px; height: 100px; border: 1px solid #999; background: #eee; display: flex; align-items: center; justify-content: center; font-size: 0.6em; color: #777;">[R THUMB]</div>
      <div style="width: 80px; height: 100px; border: 1px solid #999; background: #eee; display: flex; align-items: center; justify-content: center; font-size: 0.6em; color: #777;">[L THUMB]</div>
    </div>
<p><strong>Purpose:</strong> FINRA Registration / Federal Employment<br>
    <strong>Card Serial #:</strong> 99228877-X</p>
  </div>
<div style="margin-top: 40px; display: flex; justify-content: space-between; align-items: flex-end;">
    <div style="width: 45%;">
      <div style="border-top: 1px solid #000; padding-top: 5px; font-style: italic;">John Hancock, Notary</div>
      <div style="font-size: 0.8em; color: #777;">Commission Exp: 04/01/2028</div>
    </div>
    <div style="text-align: right; width: 45%;">
      <div style="width: 80px; height: 80px; border: 2px solid #000; display: flex; align-items: center; justify-content: center; font-size: 0.6em; font-weight: bold; text-align: center; margin-left: auto;">OFFICIAL<br>NOTARY<br>SEAL</div>
    </div>
  </div>
<div data-verify-line="finger" style="border-top: 1px dashed #999; margin-top: 40px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
      title="Demo only: Notary platform doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:notary-check.gov/biometrics/v <span verifiable-text="end" data-for="finger">]</span>
  </div>
</div>

## Data Verified

Applicant name, date of birth, fingerprint card serial number (e.g., FD-258 ID), purpose of check (FBI, FINRA, State), date of fingerprinting, notary name/commission number, jurisdiction (State/County), LiveScan reference ID (if applicable).

**Document Types:**
- **Fingerprint Certification Letter:** Attached to the physical card.
- **LiveScan Receipt:** Digital proof of submission to DOJ/FBI.
- **Identity Verification Form:** (I-9 equivalent) for high-security roles.

## Data Visible After Verification

Shows the issuer domain (the Notary Platform or Police Agency) and the submission standing.

**Status Indications:**
- **Certified** — Notary has verified the identity and prints match the record.
- **Submitted to FBI** — Digital transmission to the federal database confirmed.
- **Rejected** — **ALERT:** Prints found to be unreadable or smudged.
- **Expired** — Certification date is > 90 days old (most backgrounds require fresh prints).

## Second-Party Use

The **Applicant** benefits from verification.

**Anti-Fraud:** Proving to an employer or licensing board that they *actually* attended the fingerprinting appointment and the person who took the prints was a verified notary. This prevents "Identity Swapping" accusations.

**Case Tracking:** Instantly verifying the "Submission Status" of their prints to the FBI without waiting for a snail-mail response.

## Third-Party Use

**Employers (High-Security)**
**Intake Integrity:** Before giving a new hire access to a nuclear plant or a bank vault, the HR manager scans the fingerprint certification. "Verified by Notary-Check" ensures the candidate didn't just "Sign their own card" and use fake fingerprints.

**State Licensing Boards (Nursing / Law)**
**Credential Vetting:** Verifying that the mandatory background check prints were taken in accordance with state laws.

**Federal Agencies (FBI / DHS)**
**Channeler Oversight:** Verifying that private "Fingerprint Channelers" are accurately reporting the identity of the people they are processing.

## Verification Architecture

**The "Dirty Hands" Fraud Problem**

- **Identity Swapping:** Sending a "Clean" friend to the fingerprint appointment to hide a criminal record. Verification of the *photo hash* on the certificate stops this.
- **Date Alteration:** Editing a 2-year-old certification PDF to read "2026" to avoid the $100 fee for a new background check.
- **Notary Forgery:** Using a fake rubber stamp to "certify" a card that was actually filled out in a basement.

**Issuer Types** (First Party)

**Police Departments:** (Primary issuers for ink-and-roll).
**LiveScan Vendors:** (e.g., IdentoGO, UPS Store).
**Online Notary Platforms:** (DocuSign, Notarize).

**Privacy Salt:** Highly critical. Biometric association data is the most sensitive PII. The hash MUST be salted to prevent "Guess-and-Check" searches for criminal background checks.

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


## Competition vs. FBI Portal (CJIS)

| Feature | Live Verify | FBI CJIS Portal | Scanned PDF Receipt |
| :--- | :--- | :--- | :--- |
| **Trust Anchor** | **Domain-Bound.** Bound to the Notary/Firm. | **Gov-Bound.** | **Zero.** Easily forged. |
| **Speed** | **Instant.** 5-second scan. | **Slow.** Takes 3-7 days for "Background Result." | **Instant.** |
| **Accessibility** | **Open.** Any employer can verify the *event*. | **Restricted.** Only authorized entities can see results. | **Universal.** |
| **Integrity** | **Binds Identity.** Protects the Card ID. | **Data-Only.** | **Vulnerable.** |

**Why Live Verify wins here:** The "Handoff Gap." The FBI takes weeks to return a background check result. But an employer needs to know **today** if the candidate actually went to the appointment. Live Verify turns the **Fingerprint Receipt** into a live, trusted "Proof of Action" that bridges the gap during the long federal waiting period.

---
title: "Employment Authorization Documents (EAD)"
category: "Immigration & Visa Documents"
volume: "Medium"
retention: "1-2 years (renewal cycle)"
slug: "employment-authorization-ead"
verificationMode: "clip"
tags: ["immigration", "ead", "form-i-766", "work-authorization", "uscis", "i-9-compliance", "employment-eligibility"]
furtherDerivations: 1
---

*This is the US-specific deep dive. See [Work Permits & Work Visas](work-permits) for the international overview.*

## What is a Work Permit (EAD)?

An **Employment Authorization Document (EAD)** is the ID card issued by the US government giving a non-citizen the legal right to work.

For a business owner, this card is high-stakes. If they hire someone with a fake card, they can be fined thousands of dollars. The problem? High-quality fakes are everywhere.

Live Verify turns the **Physical Card** into a live link to the USCIS database. This allows a small business owner to see if the card has been "Revoked" (e.g., if the person's visa was cancelled) in seconds, without needing expensive government software.

<div style="max-width: 400px; margin: 24px auto; font-family: sans-serif; border: 1px solid #ccc; border-radius: 12px; background: #fff; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.2);">
  <div style="background: #002d62; color: #fff; padding: 15px; display: flex; align-items: center; justify-content: space-between;">
    <div>
      <div style="font-weight: bold; font-size: 1.1em;"><span verifiable-text="start" data-for="ead">[</span>U.S. CITIZENSHIP & IMMIGRATION</div>
      <div style="font-size: 0.8em;">Employment Authorization Card</div>
    </div>
    <div style="width: 40px; height: 40px; background: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #002d62; font-weight: bold; font-size: 0.7em; text-align: center;">DHS</div>
  </div>
<div style="padding: 20px; display: flex;">
    <div style="width: 100px; margin-right: 15px;">
      <div style="width: 100px; height: 125px; background: #eee; border: 1px solid #ccc; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: #777;">[PHOTO]</div>
    </div>
    <div style="flex-grow: 1;">
      <div style="font-size: 1.1em; font-weight: bold; margin: 0 0 5px 0;">DOE, JOHN JACOB</div>
      <div style="font-size: 0.85em; color: #333; line-height: 1.4;">
        <strong>USCIS #:</strong> 992-288-776<br>
        <strong>Category:</strong> C08 (Asylum)<br>
        <strong>Card #:</strong> SRC2699887766<br>
        <strong>Expires:</strong> 05/15/2028
      </div>
    </div>
  </div>
<div style="padding: 0 20px 20px 20px;">
    <div style="font-size: 0.8em; font-weight: bold; color: #002d62; text-align: center; margin-bottom: 5px;">UNITED STATES OF AMERICA</div>
    <div data-verify-line="ead" style="border-top: 1px dashed #999; padding-top: 5px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
      title="Demo only: USCIS doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:uscis.gov/ead/v <span verifiable-text="end" data-for="ead">]</span>
    </div>
  </div>
</div>

## Data Verified

Full name, USCIS number (A-Number), Category code (e.g., C03, C08, C09), Card serial number, effective date, expiration date, photograph (via hash), fingerprint status (hash), issuing office.

**Document Types:**
- **Employment Authorization Document (EAD):** (Form I-766).
- **Extension Notice (I-797):** Proving the 180/540-day automatic extension.
- **Grant of Asylum / Withholding:** (Linked document hash).

## Verification Response

The endpoint returns a simple status code:

- **OK** — Bearer is legally eligible to work in the U.S.
- **PENDING_RENEWAL** — Application filed; automatic extension active; eligible to work
- **REVOKED** — Authorization terminated (e.g., underlying case denied); do not hire
- **EXPIRED** — No longer eligible; renewal required; do not hire until renewed
- **404** — Card not found (forged document, wrong number, or OCR error)

The issuer domain is visible from the `verify:` line on the card itself (e.g., `uscis.gov`).

## Post-Verification Actions

None typically. The verification confirms work authorization status; that's the decision point for hiring.

**Why No Further Action:**

- **Employers** just need status to complete I-9 and proceed with hiring
- **Banks** just need confirmation for KYC compliance
- **DMVs** just need to confirm legal presence for Real ID

The status code is the value. If it's OK or PENDING_RENEWAL, proceed. If it's REVOKED, EXPIRED, or 404, don't. No POST form needed.

## Second-Party Use

The **Employee (Authorized Worker)** benefits from verification.

**Hiring Efficiency:** Proving to an HR manager that their "Category C08" card is legitimate and hasn't been "Revoked" by the government. A verified card removes the employer's fear of "I-9 Audit" fines, making the worker much more hireable.

**Bank Account Opening:** Proving legal status to a bank to comply with "Know Your Customer" (KYC) rules for individuals without a Green Card or Social Security Number.

## Third-Party Use

**Employers (HR Managers)**
**I-9 Compliance:** Instantly confirming that the EAD isn't a "High-Quality Forgery." Standard cards are easily bought on the black market; Live Verify connects the manager directly to the USCIS record in seconds.

**Social Security Administration**
**SSN Issuance:** Verifying the work authorization before assigning an SSN.

**State DMVs**
**Driver's Licensing:** Verifying legal presence for non-immigrant driver's licenses (Real ID).

## Verification Architecture

**The "High-End Forgery" Fraud Problem**

- **Ghost Documents:** Fraudsters using high-end printers to create EAD cards for people who never applied for status.
- **Revocation Hiding:** A worker whose asylum claim was denied (revoking their EAD) keeping the physical card to trick a new employer.
- **Category Tampering:** Changing a "Student" (Restricted) category to an "Asylum" (Unrestricted) category.

**Issuer Types** (First Party)

**U.S. Citizenship and Immigration Services (USCIS):** The sole issuer.
**DHS SAVE System:** (The backend source of truth).

**Privacy Salt:** ABSOLUTELY CRITICAL. Immigration data is a high-value target for identity theft. The hash MUST be salted to prevent "Guess-and-Check" attacks to find specific immigrants.

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


## Competition vs. E-Verify / SAVE

| Feature | Live Verify | E-Verify (Employer System) | Physical EAD Card |
| :--- | :--- | :--- | :--- |
| **Trust Anchor** | **Domain-Bound.** Bound to `uscis.gov`. | **Direct DB Access.** High trust. | **Mechanical.** Prone to forgery. |
| **User Access** | **Open.** Small businesses can verify. | **Restricted.** Requires federal registration and training. | **Manual.** |
| **Speed** | **Instant.** 5-second scan. | **Slow.** Often flags for "Manual Review" taking days. | **Instant.** |
| **Privacy** | **High.** Verified at the point of use. | **Low.** Data resides in a federal monitoring system. | **N/A.** |

**Why Live Verify wins here:** The "Small Employer" reality. Millions of small businesses (landscapers, restaurants, households) do not use E-Verify because it is complex and invasive. They rely on "Looking at the card." Live Verify allows **every employer** to have "E-Verify Level" trust using only their phone camera, stopping EAD fraud at the scale of the entire economy.

---
title: "Marriage and Divorce Documents"
category: "Government & Civic Documents"
volume: "Small"
retention: "Permanent (legal status)"
slug: "marriage-divorce-documents"
tags: ["marriage-certificate", "divorce-decree", "civil-status", "family-law", "vital-records", "name-change", "probate-documents", "immigration-proof"]
furtherDerivations: 1
---

<div style="max-width: 600px; margin: 24px auto; font-family: 'Times New Roman', Georgia, serif; border: 3px double #1a365d; background: #fdfcf0; padding: 40px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); border-radius: 4px;">
  <div style="text-align: center; border-bottom: 2px solid #1a365d; padding-bottom: 15px; margin-bottom: 25px;">
    <div style="font-weight: bold; font-size: 1.3em; letter-spacing: 2px; color: #1a365d;"><span verifiable-text="start" data-for="marriage">[</span>STATE OF NEVADA</div>
    <div style="font-size: 0.9em; text-transform: uppercase; color: #2c5282;">Clark County • Marriage Bureau</div>
  </div>
<h2 style="text-align: center; font-size: 1.5em; color: #1a365d; margin-bottom: 25px;">CERTIFICATE OF MARRIAGE</h2>
<div style="font-size: 1em; line-height: 1.8; color: #333;">
    <p>This certifies that on the 15th day of March, 2026, the following parties were joined in Holy Matrimony:</p>
<div style="display: flex; justify-content: space-around; margin: 20px 0; background: #f9f9f9; padding: 15px; border: 1px solid #ccc;">
      <div style="text-align: center;">
        <strong>SPOUSE A</strong><br>
        John Jacob Doe<br>
        <small>DOB: 05/15/1985</small>
      </div>
      <div style="font-size: 1.5em; align-self: center;">&</div>
      <div style="text-align: center;">
        <strong>SPOUSE B</strong><br>
        Mary Alice Jacob<br>
        <small>DOB: 02/19/1992</small>
      </div>
    </div>
<p><strong>Officiant:</strong> Rev. Marcus Miller<br>
    <strong>License #:</strong> CLK-2026-992288<br>
    <strong>Certificate #:</strong> 998877665</p>
  </div>
<div style="margin-top: 40px; display: flex; justify-content: space-between; align-items: flex-end;">
    <div>
      <div style="width: 90px; height: 90px; border: 2px dashed #1a365d; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.6em; color: #1a365d; font-weight: bold; text-align: center;">COUNTY<br>CLERK<br>SEAL</div>
    </div>
    <div style="text-align: right;">
      <div style="border-top: 1px solid #000; width: 200px; padding-top: 5px; font-style: italic;">Lynn Marie Goya</div>
      <div style="font-size: 0.8em; color: #777;">County Clerk</div>
    </div>
  </div>
<div data-verify-line="marriage" style="border-top: 1px dashed #999; margin-top: 40px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
      title="Demo only: Clark County doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:clarkcountynv.gov/marriage/v <span verifiable-text="end" data-for="marriage">]</span>
  </div>
</div>

## Data Verified

Spouse full names, dates of birth, marriage date, license number, certificate serial number, officiant name, location of ceremony, county of issuance, date of recording.

**Document Types:**
- **Marriage Certificate:** Official proof of union (post-ceremony).
- **Divorce Decree:** Final court order dissolving a marriage.
- **Domestic Partnership:** For non-marriage legal unions.
- **Annulment Order:** (Linked hash) proving the union was voided.

## Data Visible After Verification

Shows the issuer domain (`clarkcountynv.gov`, `nycourts.gov`) and current status.

**Status Indications:**
- **Valid/Recorded** — Record exists and matches the official registry.
- **Dissolved** — **ALERT:** Marriage was subsequently ended by divorce or annulment.
- **Amended** — Original record corrected (e.g., due to name spelling error).
- **Void** — Assigned to wrong parties or found to be fraudulent.

## Second-Party Use

The **Named Spouse(s)** benefit from verification.

**Name Change:** Proving to the Social Security Administration (SSA) or a bank that the "Marriage Certificate" isn't a fake PDF created to commit identity fraud. Verification against the county domain allows for instant, automated name-change processing.

**Immigration / Green Card:** Proving a "Bona Fide Marriage" to USCIS. A verified certificate from the county is the ultimate defense against "Fake Marriage" accusations during a visa interview.

**Insurance Enrollment:** Proving marital status to an employer's HR department to add a spouse to a health insurance plan.

## Third-Party Use

**Government Agencies (SSA / USCIS)**
**Identity Integrity:** Instantly verifying the foundational civil status of an applicant. Live Verify connects the agency directly to the county registrar, stopping "Paperwork Scams" where people use fake certificates to steal survivor benefits.

**Mortgage Lenders**
**Title Vetting:** Verifying marital status during a property purchase to ensure "Spousal Consent" or "Homestead Rights" are properly addressed in the deed.

**Attorneys / Probate Courts**
**Heir Verification:** Confirming the legal status of a surviving spouse before distributing multimillion-dollar estate assets.

## Verification Architecture

**The "Paper Bride" Fraud Problem**

- **Fabricated Certificates:** Using a template to create a fake "Marriage Certificate" for a non-existent union to get a Green Card or military benefits.
- **Bigamy Concealment:** Presenting a "Valid" marriage paper while hiding that a "Divorce Decree" has already been issued for that union. Verification shows the *latest* status (Dissolved).
- **Name Tampering:** Editing a PDF to change the name of one spouse to gain access to their bank accounts or inheritance.

**Issuer Types** (First Party)

**County Clerks / Registrars:** (Primary issuers for marriage).
**Superior / Family Courts:** (Issuers for divorce decrees).
**State Departments of Health:** (Managing long-term vital records).

**Privacy Salt:** ABSOLUTELY CRITICAL. Marital status is highly private. The hash MUST be salted to prevent "Mass Scraping" of a county's marriage history by data brokers or stalkers.

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


## Competition vs. Certified Copies (Raised Seals)

| Feature | Live Verify | Certified Copy (Physical Seal) | Public Portal (Online Search) |
| :--- | :--- | :--- | :--- |
| **Integrity** | **Cryptographic.** Protects every name/date. | **Binds Paper.** Doesn't prevent "Name Edits." | **Data-Only.** |
| **Speed** | **Instant.** 5-second scan. | **Manual.** Requires physical inspection. | **Slow.** Requires search & CAPTCHAs. |
| **Trust Anchor** | **Domain-Bound.** Bound to the County. | **Signature-Bound.** | **Gov-Bound.** |
| **Cost** | **Low.** Standard web infra. | **High.** Fees of $20-$50 per copy are common. | **Medium.** Per-search fees. |

**Why Live Verify wins here:** Reach. Many counties do not have public-facing "Search Portals" for marriage records due to privacy laws. Live Verify allows the **Individual** to carry a portable, verifiable proof of their status that only reveals data when the physical document is presented, respecting privacy while providing absolute trust.


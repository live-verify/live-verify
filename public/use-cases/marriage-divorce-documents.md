---
title: "Marriage and Divorce Documents"
category: "Government & Civic Documents"
volume: "Small"
retention: "Permanent (legal status)"
slug: "marriage-divorce-documents"
verificationMode: "clip"
tags: ["marriage-certificate", "divorce-decree", "civil-status", "family-law", "vital-records", "name-change", "probate-documents", "immigration-proof"]
furtherDerivations: 1
---

<div style="max-width: 600px; margin: 24px auto; font-family: 'Times New Roman', Georgia, serif; border: 3px double #1a365d; background: #fdfcf0; padding: 40px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); border-radius: 4px;">
  <div style="text-align: center; border-bottom: 2px solid #1a365d; padding-bottom: 15px; margin-bottom: 25px;">
    <div style="font-weight: bold; font-size: 1.3em; letter-spacing: 2px; color: #1a365d;"><span verifiable-text="start" data-for="marriage"></span>STATE OF NEVADA</div>
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
      <span data-verify-line="marriage">verify:clarkcountynv.gov/marriage/v</span> <span verifiable-text="end" data-for="marriage"></span>
  </div>
</div>

## The Problem: Paper Bride Fraud

- **Fabricated Certificates:** Using a template to create a fake "Marriage Certificate" for a non-existent union to get a Green Card or military benefits.
- **Bigamy Concealment:** Presenting a "Valid" marriage paper while hiding that a "Divorce Decree" has already been issued for that union. Verification shows the *latest* status (Dissolved).
- **Name Tampering:** Editing a PDF to change the name of one spouse to gain access to their bank accounts or inheritance.

## What Is Checked

Spouse full names, dates of birth, marriage date, license number, certificate serial number, officiant name, location of ceremony, county of issuance, date of recording.

**Document Types:**
- **Marriage Certificate:** Official proof of union (post-ceremony).
- **Divorce Decree:** Final court order dissolving a marriage.
- **Domestic Partnership:** For non-marriage legal unions.
- **Annulment Order:** (Linked hash) proving the union was voided.

## What the Checker Sees

Shows the issuer domain (`clarkcountynv.gov`, `nycourts.gov`) and current status.

**Status Indications:**
- **Valid/Recorded** — Record exists and matches the official registry.
- **Dissolved** — Marriage was subsequently ended by divorce or annulment.
- **Amended** — Original record corrected (e.g., due to name spelling error).
- **Void** — Assigned to wrong parties or found to be fraudulent.

## Who Holds It

The Named Spouse(s) benefit from verification.

**Name Change:** Proving to the Social Security Administration (SSA) or a bank that the "Marriage Certificate" isn't a fake PDF created to commit identity fraud. Verification against the county domain allows for instant, automated name-change processing.

**Immigration / Green Card:** Proving a "Bona Fide Marriage" to USCIS. A verified certificate from the county is the ultimate defense against "Fake Marriage" accusations during a visa interview.

**Insurance Enrollment:** Proving marital status to an employer's HR department to add a spouse to a health insurance plan.

## Who Checks It

**Government Agencies (SSA / USCIS)**
**Identity Integrity:** Instantly verifying the foundational civil status of an applicant. Live Verify connects the agency directly to the county registrar, stopping "Paperwork Scams" where people use fake certificates to steal survivor benefits.

**Mortgage Lenders**
**Title Vetting:** Verifying marital status during a property purchase to ensure "Spousal Consent" or "Homestead Rights" are properly addressed in the deed.

**Attorneys / Probate Courts**
**Heir Verification:** Confirming the legal status of a surviving spouse before distributing multimillion-dollar estate assets.

## Who Issues It

**Issuer Types** (First Party)

**County Clerks / Registrars:** (Primary issuers for marriage).
**Superior / Family Courts:** (Issuers for divorce decrees).
**State Departments of Health:** (Managing long-term vital records).

**Privacy Salt:** ABSOLUTELY CRITICAL. Marital status is highly private. The hash MUST be salted to prevent "Mass Scraping" of a county's marriage history by data brokers or stalkers.

## Authority Chain

**Pattern:** Sovereign

The General Register Office issues marriage and divorce certificates under the Marriage Act 1949 and Matrimonial Causes Act 1973.

```
✓ gro.gov.uk/marriage/verify — UK General Register Office marriage and divorce certificates
  ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Compared With Certified Copies (Raised Seals)

| Feature | Live Verify | Certified Copy (Physical Seal) | Public Portal (Online Search) |
| :--- | :--- | :--- | :--- |
| **Integrity** | **Cryptographic.** Protects every name/date. | **Binds Paper.** Doesn't prevent "Name Edits." | **Data-Only.** |
| **Speed** | **Instant.** 5-second scan. | **Manual.** Requires physical inspection. | **Slow.** Requires search & CAPTCHAs. |
| **Trust Anchor** | **Domain-Bound.** Bound to the County. | **Signature-Bound.** | **Gov-Bound.** |
| **Cost** | **Low.** Standard web infra. | **High.** Fees of $20-$50 per copy are common. | **Medium.** Per-search fees. |

**Where each fits:** A certified copy with the registrar's seal is what many agencies and courts require, and where that is the rule it remains the document to obtain. Where a county offers an online record search, that is a useful independent check too. Live Verify helps in the many situations where a copy is presented to someone who cannot assess a seal and has no search portal to consult, such as an employer, a bank or an authority abroad. It confirms the names and dates match what the county issued, and discloses nothing until the holder presents the document.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).

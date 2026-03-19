---
title: "Permanent Residence Cards (Green Card)"
category: "Immigration & Visa Documents"
volume: "Very Large"
retention: "Permanent (license lifecycle)"
slug: "permanent-residence-cards"
verificationMode: "clip"
tags: ["immigration", "green-card", "i-551", "uscis", "permanent-residence", "work-authorization", "identity-verification", "border-security", "i-9-compliance"]
furtherDerivations: 1
---

## What is a Green Card?

The **Permanent Resident Card (Form I-551)**, commonly known as a **Green Card**, is the most high-value identity document in the United States. It proves that a non-citizen is authorized to live and work in the country indefinitely. It is the "Master Key" to employment, social security benefits, and international travel.

Because it grants broad rights, Green Cards are a major target for high-end forgery. But the strongest verification paths are still the official ones: USCIS, DHS-backed systems, employer workflows like I-9/E-Verify, and carrier or border systems where available. Live Verify is therefore a **complementary** bridge for copy-based or lower-capability relying parties, not the dominant architecture.

<div style="max-width: 450px; margin: 24px auto; font-family: sans-serif; border: 1px solid #ccc; border-radius: 15px; background: linear-gradient(135deg, #e8f5e9 0%, #fff 100%); overflow: hidden; box-shadow: 0 6px 20px rgba(0,0,0,0.2); position: relative;">
  <div style="background: #002d62; color: #fff; padding: 15px; display: flex; align-items: center; justify-content: space-between; border-bottom: 3px solid #ce9e00;">
    <div>
      <div style="font-weight: bold; font-size: 1em; letter-spacing: 1px;"><span verifiable-text="start" data-for="pr"></span>UNITED STATES OF AMERICA</div>
      <div style="font-size: 0.7em; opacity: 0.9;">PERMANENT RESIDENT</div>
    </div>
    <div style="width: 40px; height: 40px; background: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #002d62; font-weight: bold; font-size: 0.6em; text-align: center;">DHS</div>
  </div>
<div style="padding: 20px; display: flex;">
    <div style="width: 110px; margin-right: 15px;">
      <div style="width: 110px; height: 140px; background: #eee; border: 1px solid #ccc; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: #777; font-size: 0.7em; text-align: center;">[HOLDER PHOTO]</div>
    </div>
    <div style="flex-grow: 1; font-size: 0.85em; line-height: 1.4;">
      <div style="font-weight: bold; font-size: 1.1em; margin-bottom: 5px; color: #333;">DOE, JOHN JACOB</div>
      <div style="color: #555;">
        <strong>USCIS #:</strong> 992-288-776<br>
        <strong>Category:</strong> RE8 (Refugee)<br>
        <strong>Country of Birth:</strong> COLOMBIA<br>
        <strong>Date of Birth:</strong> 05/15/1985<br>
        <strong>Card Expires:</strong> 03/15/2036
      </div>
    </div>
  </div>
<div style="padding: 0 20px 20px 20px; text-align: center;">
    <div data-verify-line="pr" style="border-top: 1px dashed #999; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #002d62; font-weight: bold;"
      title="Demo only: USCIS doesn't yet offer verification&#10;endpoints, so this is illustrative">
      <span data-verify-line="pr">verify:uscis.gov/v/pr</span> <span verifiable-text="end" data-for="pr"></span>
    </div>
    <div style="font-size: 0.6em; color: #888; margin-top: 10px; font-style: italic;">
      Scan to verify residency status and work authorization. Responses include authoritative photo return.
    </div>
  </div>
</div>

## Data Verified

USCIS Alien Registration Number (A-Number), full name, category code (e.g., CR1, E11, RE8), card serial number, date of birth, country of birth, resident-since date, card expiration date, photograph (via hash), fingerprint status (hash), issuing office.

**Document Types:**
- **Permanent Resident Card:** (Form I-551) The plastic card.
- **ADIT Stamp (I-551):** (Temporary) placed in a passport.
- **I-797 Extension Notice:** (Linked hash) extending an expired card.
- **Transportation Letter:** (Linked hash) for boarding if the card is lost abroad.

## Data Visible After Verification

Shows the issuer domain (`uscis.gov`) and the real-time status.

**Status Indications:**
- **Authorized / Permanent** — Holder is in good standing and authorized to work.
- **Conditional** — **ALERT:** Subject must file to remove conditions by [Date].
- **Revoked** — **CRITICAL:** Status terminated (e.g., due to criminal acts or fraud).
- **Reported Stolen** — **CRITICAL:** The card number has been flagged by the owner.

## Second-Party Use

The **Permanent Resident (Holder)** benefits from verification.

**Copy-Based Employment Prep:** Before formal I-9 completion, a worker may send a copy-based credential packet to HR or a recruiter. Live Verify can help the employer treat that copy more safely, while understanding that formal work-authorization systems remain primary.

**Record Confidence:** A resident can check whether a card copy or linked extension notice still maps to a current USCIS record, while understanding that border and carrier systems remain authoritative.

## Third-Party Use

**Employers / Federal Contractors**
For formal work authorization, official employment-verification workflows remain primary. Live Verify is more plausible as a bridge on copied card images or pre-hire packets before those formal checks run.

**Mortgage Lenders / Banks**
**Status Vetting:** Verifying that a borrower is a "Permanent Resident" before granting a 30-year mortgage, as non-resident loans carry significantly higher risk and different interest rates.

**Airlines / Carrier Security**
Official carrier and border systems should remain primary. A verified card copy is only a secondary convenience surface.

## Verification Architecture

**The "Super-Clone" Fraud Problem**

- **Photo Return:** The verification response should include the **USCIS Authoritative Photo**. If the face on the phone doesn't match the face on the plastic card, the card is a clone.
- **Geo-Anomaly Detection:** If a card hash is scanned in New York at 9 AM and Los Angeles at 10 AM, the system flags a "Cloned Identity" in circulation.
- **Category Tampering:** Changing a "Student" visa class to a "Permanent Resident" class on a fake card.

**Issuer Types** (First Party)

**U.S. Citizenship and Immigration Services (USCIS).**
**DHS SAVE System (Backend Source).**

**Privacy Salt:** Highly Critical. Green Card data is subject to the Privacy Act. The hash must be salted to prevent "Enumeration" of the US non-citizen population.

## Authority Chain

**Pattern:** Sovereign

Issues permanent resident cards for non-citizens authorized to live.

```
✓ uscis.gov/greencard/verify — Issues permanent resident cards for non-citizens authorized to live
  ✓ usa.gov/verifiers — US federal government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Rationale

The Green Card is a gold-standard identity artifact, but official immigration and employment systems still sit above any portable copy. Live Verify helps most when a human-readable or copied card needs to bridge back to current USCIS status outside those native systems.

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

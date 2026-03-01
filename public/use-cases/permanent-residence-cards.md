---
title: "Permanent Residence Cards (Green Card)"
category: "Immigration & Visa Documents"
volume: "Very Large"
retention: "Permanent (license lifecycle)"
slug: "permanent-residence-cards"
tags: ["immigration", "green-card", "i-551", "uscis", "permanent-residence", "work-authorization", "identity-verification", "border-security", "i-9-compliance"]
furtherDerivations: 1
---

## What is a Green Card?

The **Permanent Resident Card (Form I-551)**, commonly known as a **Green Card**, is the most high-value identity document in the United States. It proves that a non-citizen is authorized to live and work in the country indefinitely. It is the "Master Key" to employment, social security benefits, and international travel.

Because it grants broad rights, Green Cards are the #1 target for **High-End Forgery**. Black-market "Super-Clones" can look pixel-perfect even to trained eyes. Live Verify turns the **Physical Card** into a live digital bridge to the USCIS vault. This allows an employer or a bank to see if the card has been **Revoked, Expired, or Reported Stolen** in real-time. Verified hashes bind the **USCIS Number, Category Code, and Resident Name** to the `uscis.gov` domain.

<div style="max-width: 450px; margin: 24px auto; font-family: sans-serif; border: 1px solid #ccc; border-radius: 15px; background: linear-gradient(135deg, #e8f5e9 0%, #fff 100%); overflow: hidden; box-shadow: 0 6px 20px rgba(0,0,0,0.2); position: relative;">
  <div style="background: #002d62; color: #fff; padding: 15px; display: flex; align-items: center; justify-content: space-between; border-bottom: 3px solid #ce9e00;">
    <div>
      <div style="font-weight: bold; font-size: 1em; letter-spacing: 1px;"><span verifiable-text="start" data-for="pr">[</span>UNITED STATES OF AMERICA</div>
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
      verify:uscis.gov/v/pr <span verifiable-text="end" data-for="pr">]</span>
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

**Secure Employment (I-9):** When starting a new job, the resident provides the verified hash of their Green Card. The HR manager can instantly see **"AUTHORIZED - USCIS"** on their phone, removing the fear of a "High-Grade Forgery" and getting the worker on the payroll immediately.

**Re-Entry Confidence:** A resident traveling abroad scans their own card before boarding a flight back to the US. "Verified by USCIS" ensures the traveler that their card hasn't been "administratively cancelled" while they were away, preventing a traumatic detention at the border.

## Third-Party Use

**Employers / Federal Contractors**
**Zero-Trust Compliance:** Verifying that a worker's "RE8" category is authentic. Live Verify connects the company directly to the DHS record, stopping "Social Security Card" fraud where stolen IDs are used to hide illegal hiring.

**Mortgage Lenders / Banks**
**Status Vetting:** Verifying that a borrower is a "Permanent Resident" before granting a 30-year mortgage, as non-resident loans carry significantly higher risk and different interest rates.

**Airlines / Carrier Security**
**Boarding Prep:** Instantly verifying the authenticity of a Green Card for a passenger boarding an international flight to the US, protecting the airline from a $5,000+ per-passenger "Inadmissible" fine.

## Verification Architecture

**The "Super-Clone" Fraud Problem**

- **Photo Return:** The verification response should include the **USCIS Authoritative Photo**. If the face on the phone doesn't match the face on the plastic card, the card is a clone.
- **Geo-Anomaly Detection:** If a card hash is scanned in New York at 9 AM and Los Angeles at 10 AM, the system flags a "Cloned Identity" in circulation.
- **Category Tampering:** Changing a "Student" visa class to a "Permanent Resident" class on a fake card.

**Issuer Types** (First Party)

**U.S. Citizenship and Immigration Services (USCIS).**
**DHS SAVE System (Backend Source).**

**Privacy Salt:** Highly Critical. Green Card data is subject to the Privacy Act. The hash must be salted to prevent "Enumeration" of the US non-citizen population.

## Rationale

The Green Card is the "Gold Standard" of identity. By turning it into a verifiable digital bridge, we protect the US labor market and the banking system from the multi-billion dollar cost of high-grade identity fraud.

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

---
title: "UK Driving Licence Check Codes"
category: "Government & Civic Documents"
volume: "Large"
retention: "21 days (DVLA expiry)"
slug: "uk-driving-licence-check-codes"
verificationMode: "both"
tags: ["dvla", "driving-licence", "car-hire", "insurance-repair", "share-code", "government"]
furtherDerivations: 1
---

## What is a Driving Licence Check Code?

In the UK, the "Share Driving Licence" service allows drivers to provide a one-time **Check Code** to third parties (car hire companies, employers, or insurance repair centers). This code allows the third party to view the driver's eligibility, points, and bans without the driver needing to hand over their physical paper counterpart (which was abolished in 2015).

Currently, these codes (e.g., `aB123dEf`) are often dictated over the phone or sent via SMS. This is error-prone due to case sensitivity and "Is that a B or a D?" confusion.

A **Verifiable Check Code Attestation** turns the share code into a cryptographic bridge. The third party verifies the code against the DVLA's domain instantly, ensuring the code is current and authentic.

<div style="max-width: 500px; margin: 24px auto; font-family: 'Courier New', monospace; background: #f4f4f4; border: 1px solid #ccc; padding: 20px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
  <span verifiable-text="start" data-for="dvla">[</span>
  <strong>DVLA SHARE DRIVING LICENCE</strong><br>
  ═══════════════════════════════════════<br>
  <br>
  <strong>SHARE CODE:</strong> aB123dEf<br>
  <strong>Driver:</strong> ****7766 (Last 8 of Licence)<br>
  <br>
  <strong>Generated:</strong> 05 MAR 2026 14:30 UTC<br>
  <strong>Expires:</strong> 26 MAR 2026 (21 days)<br>
  <br>
  <span data-verify-line="dvla">verify:view-driving-licence.service.gov.uk/v</span> <span verifiable-text="end" data-for="dvla">]</span>
</div>

## Data Verified

The 8-character case-sensitive share code, the last 8 digits of the driving licence number (to bind the code to the specific driver), generation timestamp, and expiry date.

**Document Types:**
- **Share Code Attestation:** The standard 21-day code.
- **Licence Summary Extract:** A verified proof of "No Points" or "Full Licence" status.
- **Employer Check Record:** Proof that a company performed its annual driver audit.

## Data Visible After Verification

Shows the issuer domain (`service.gov.uk`) and the code status.

**Status Indications:**
- **Active** — Code is valid and can be used to view the licence.
- **Used** — **ALERT:** This code has already been redeemed.
- **Expired** — **ALERT:** The 21-day window has passed; a new code is required.
- **Revoked** — The driver has cancelled this specific share code.

## Second-Party Use

The **Driver** benefits from verification.

**Seamless Sharing:** Instead of dictating complex codes over the phone to a busy repair center or hire desk, the driver sends a **Live Verify Link**. This link contains the encoded text, ensuring it survives SMS formatting or carriage return issues.

**Privacy Control:** The driver knows that the repair center is only getting the specific code they authorized, and they can see exactly when it was verified.

## Third-Party Use

**Car Hire Companies**
**Desk Efficiency:** Instantly verifying the share code provided by a customer at the front desk (Camera mode) or during an online booking (Clip mode), reducing the risk of "Invalid Code" delays.

**Insurance Repair Centers**
**Accident Management:** When an insurer organizes a courtesy car, the repair center must verify the driver's licence. A verified link received via SMS allows the center to process the driver without dictation errors.

**Fleet Managers / Employers**
**Annual Audits:** Verifying the "Check Codes" of hundreds of employees as part of corporate insurance compliance.

## Verification Architecture

**The "Dictation Error" Problem**

- **Case Sensitivity:** `aB123dEf` vs `AB123DEF`. Dictating these over a crackly phone line is the primary source of failure in the current system.
- **Transcription Errors:** The repair center clerk typing the code incorrectly into the gov.uk portal.
- **SMS Corruption:** Copying the code into a messaging app can sometimes insert spaces or carriage returns that make the code look invalid.

**Issuer Types** (First Party)

**DVLA (Driver and Vehicle Licensing Agency).**
**DVA (Northern Ireland).**

**The "Verifiable Link" Solution:**
To solve the "Phone/SMS" problem, the DVLA site provides a URL-encoded link:
`https://service.gov.uk/v#t=SHARE%20CODE%3AaB123dEf%0ADriver%3A****7766%0Averify%3Aservice.gov.uk/v`
The recipient taps the link, and the browser/app handles the hashing and verification silently, displaying the **Correct Plain-Text Code** once verified.

## Rationale

The UK "Share Licence" service is a high-volume, high-friction ritual. By turning these ephemeral codes into verifiable digital bridges, we eliminate the "Dictation Gap" and ensure that hire cars and repairs are processed without case-sensitive frustration.

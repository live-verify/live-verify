---
title: "Number Portability Authorizations (LOA)"
category: "Business & Commerce"
volume: "Very Large"
retention: "3-7 years (regulatory compliance / dispute resolution)"
slug: "number-portability-authorizations"
tags: ["telecom", "number-porting", "loa", "sim-swap-fraud", "identity-verification", "porting-authority", "consumer-protection"]
furtherDerivations: 1
---

## What is a Porting Authorization?

When you switch your phone number from one carrier to another (e.g., AT&T to T-Mobile), you must sign a **Letter of Agency (LOA)**. This document is the legal "Key" to your digital identity. In the era of 2FA (Two-Factor Authentication), your phone number is often the only thing standing between a hacker and your bank account.

**SIM Swapping** is a major global crime where hackers forge these authorizations to steal a victim's phone number. Once they control the number, they reset passwords and drain accounts. Verified hashes bind the **Account Number, Zip Code, and Intent to Port** to the losing carrier's domain (e.g., `att.com` or `verizon.com`), ensuring that a "Porting Request" is a verified action from the real owner.

<div style="max-width: 500px; margin: 24px auto; font-family: sans-serif; border: 2px solid #333; background: #fff; padding: 0; box-shadow: 0 4px 12px rgba(0,0,0,0.15); overflow: hidden;">
  <div style="background: #000; color: #fff; padding: 20px; text-align: center; border-bottom: 3px solid #000;">
    <div style="font-weight: bold; font-size: 1.2em; letter-spacing: 1px;"><span verifiable-text="start" data-for="port">[</span>LETTER OF AGENCY (LOA)</div>
    <div style="font-size: 0.75em; opacity: 0.8; text-transform: uppercase; margin-top: 5px;">Authorization for Number Portability</div>
  </div>
<div style="padding: 30px; font-size: 0.95em; line-height: 1.6; color: #333;">
    <p>I, <strong>JOHN JACOB DOE</strong>, authorize the porting of the following telephone number(s) from my current provider (Losing Carrier) to the New Provider (Winning Carrier).</p>
<div style="background: #f9f9f9; padding: 15px; border: 1px solid #ddd; margin: 20px 0; border-radius: 4px;">
      <p><strong>Telephone Number:</strong> (555) 123-4567<br>
      <strong>Current Carrier:</strong> AT&T Mobility<br>
      <strong>Account #:</strong> 9922-8877-6655<br>
      <strong>Service Zip Code:</strong> 62704</p>
    </div>
<p style="font-size: 0.85em; font-style: italic; color: #666;">
      "I certify that I am the authorized account holder for the number(s) listed above. I understand that this authorization will result in a change of service provider."
    </p>
  </div>
<div style="padding: 20px; background: #fdfdfd; border-top: 1px solid #eee; text-align: center;">
    <div data-verify-line="port" style="font-family: 'Courier New', monospace; font-size: 0.8em; color: #000; font-weight: bold;"
      title="Demo only: Carriers don't yet offer verification&#10;endpoints, so this is illustrative">
      verify:att.com/porting/v <span verifiable-text="end" data-for="port">]</span>
    </div>
    <div style="font-size: 0.7em; color: #999; margin-top: 10px;">
      Scan to verify porting intent, account standing, and anti-fraud status.
    </div>
  </div>
</div>

## Data Verified

Authorized signer name, telephone number(s) to be ported, losing carrier name, winning carrier name, account number (masked), service address zip code, date of authorization, porting PIN status, internal fraud-score hash.

**Document Types:**
- **Letter of Agency (LOA):** The primary customer authorization.
- **Porting Request Summary:** The digital data sent between carriers.
- **CSR (Customer Service Record):** (Linked hash) proving account ownership.
- **Identity Verification Receipt:** Proof the customer passed a biometric check.

## Data Visible After Verification

Shows the issuer domain (`att.com`, `t-mobile.com`, `verizon.com`) and the porting standing.

**Status Indications:**
- **Authorized / Pending** — The porting request is valid and awaiting execution.
- **Port Completed** — **ALERT:** The number has already been moved; this paper is historic.
- **Fraud Alert** — **CRITICAL:** The account holder has flagged this number for "No Porting."
- **Invalid PIN** — **ALERT:** The porting PIN on the paper does not match the system.

## Second-Party Use

The **Account Holder (Consumer)** benefits from verification.

**SIM Swap Defense:** An owner can place a "Verified Lock" on their number. If a hacker tries to port the number using a fake PDF, the winning carrier's automated system scans the hash. If it returns **"FRAUD ALERT"** or **"NOT AUTHORIZED,"** the port is blocked instantly, protecting the owner's bank and email accounts.

**Carrier Switching:** When arriving at a new store (e.g., T-Mobile) to switch service, the customer provides the verified hash from their old carrier (e.g., AT&T). The clerk can instantly see **"VERIFIED INTENT"** on their screen, removing the need for 30-minute "manual verification" phone calls between carriers.

## Third-Party Use

**Winning Carriers (The Receiving Provider)**
**Compliance Vetting:** FCC rules require the winning carrier to obtain a valid LOA. Live Verify allows them to bulk-verify that thousands of incoming porting requests are authentic and haven't been "Faked" by aggressive sales agents trying to meet quotas.

**Banks and Financial Institutions**
**Identity Vetting:** Before sending a high-value wire, a bank can scan the verified hash of the customer's "Porting History." If the number was ported in the last 24 hours (a major SIM-Swap red flag), the bank can block the wire and require in-person ID.

**Law Enforcement**
**Crime Investigation:** Verifying the "Chain of Authorization" for a phone number used in a fraudulent transaction to determine if the number was stolen via a fake LOA.

## Verification Architecture

**The "Phantom Port" Fraud Problem**

- **PIN Theft:** Hackers social-engineering a customer's porting PIN and then creating a fake LOA to match it.
- **Account Number Padding:** Editing a PDF to add 10 "Ghost Numbers" to a legitimate single-number porting request.
- **Identity Mimicry:** Creating a fake LOA for a victim's number using PII stolen from a data breach.

**Issuer Types** (First Party)

**National Mobile Carriers.**
**VoIP Service Providers (Twilio, Bandwidth).**
**Centralized Porting Databases (e.g., NPAC).**

**Privacy Salt:** Highly Critical. Telephone numbers and account data are the keys to a person's life. The hash MUST be salted to prevent "Mass Phone Mapping" by hackers or marketers.

## Rationale

Number porting is the "Identity Pivot" of the modern world. By turning authorizations into verifiable digital bridges, we protect the consumer's digital life from the multi-billion dollar cost of SIM-Swap fraud and ensure that "Permission to Move" is a cryptographic fact.

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

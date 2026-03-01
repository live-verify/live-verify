---
title: "Travel Vouchers and Future Credits"
category: "Travel & Hospitality"
volume: "Large"
retention: "Expiration date + 3-7 years (financial audit)"
slug: "travel-vouchers-credits"
tags: ["travel-voucher", "future-travel-credit", "airline-credit", "refund-voucher", "customer-service", "loyalty-recovery", "travel-fraud", "e-voucher"]
furtherDerivations: 1
---

## What are Travel Vouchers?

In the travel industry, **Future Travel Credits (FTC)** or vouchers are the "Liquid Debt" of airlines and hotels. They are issued in lieu of cash refunds for cancelled flights, overbooked hotels, or as "Service Recovery" after a bad experience. A single voucher can be worth $1,000 or more and is often transferable.

Because vouchers are essentially "Digital Cash," they are a primary target for **Resale Scams**. Fraudsters sell "Discounted Vouchers" on eBay or Craigslist that have already been used or have a zero balance. Similarly, travelers might "edit" a $50 voucher to look like a $500 one before presenting it to an agent. Verified hashes bind the **Voucher Code, Balance, and Expiration Date** to the issuer's domain (e.g., `delta.com`, `marriott.com`, or `amtrak.com`).

<div style="max-width: 450px; margin: 24px auto; font-family: sans-serif; border: 2px solid #ccc; border-radius: 8px; background: #fff; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <div style="background: #333; color: #fff; padding: 15px; text-align: center;">
    <div style="font-weight: bold; font-size: 1.1em; letter-spacing: 1px;"><span verifiable-text="start" data-for="voucher">[</span>AMTRAK &reg;</div>
    <div style="font-size: 0.7em; opacity: 0.8; text-transform: uppercase;">Future Travel Credit Voucher</div>
  </div>
<div style="padding: 25px; background: #fdfdfd; border-bottom: 1px solid #eee;">
    <div style="text-align: center; margin-bottom: 20px;">
      <div style="font-size: 0.7em; color: #888; text-transform: uppercase;">Voucher Code</div>
      <div style="font-size: 1.8em; font-weight: bold; color: #004a99; letter-spacing: 2px;">XJ-9922-8877</div>
    </div>
<div style="display: flex; justify-content: space-between; font-size: 0.9em; line-height: 1.5; color: #333;">
      <div>
        <strong>Original Traveler:</strong><br>
        SARAH J. SMITH
      </div>
      <div style="text-align: right;">
        <strong>Expires:</strong><br>
        MARCH 15, 2027
      </div>
    </div>
<div style="margin-top: 20px; padding: 15px; background: #e8f5e9; border: 1px solid #c8e6c9; border-radius: 4px; text-align: center;">
      <div style="font-size: 0.75em; color: #2e7d32; font-weight: bold; text-transform: uppercase;">Verified Balance (USD):</div>
      <div style="font-size: 2.2em; font-weight: bold; color: #1b5e20;">$ 450.00</div>
    </div>
  </div>
<div style="padding: 15px; background: #fff; text-align: center;">
    <div data-verify-line="voucher" style="font-family: 'Courier New', monospace; font-size: 0.8em; color: #004a99; font-weight: bold;"
      title="Demo only: Amtrak doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:amtrak.com/v <span verifiable-text="end" data-for="voucher">]</span>
    </div>
    <div style="font-size: 0.65em; color: #999; margin-top: 8px; font-style: italic;">
      Scan to verify current remaining balance and transferability status. Not redeemable for cash.
    </div>
  </div>
</div>

## Data Verified

Voucher code, issuer name, original passenger name, current remaining balance, expiration date, issuing reason (e.g., Refund), transferability flag (Yes/No), date of issuance.

**Document Types:**
- **Digital Travel Credit:** Shown in a mobile app or email.
- **Paper Voucher:** Issued at a ticket counter or airport desk.
- **Compensation Letter:** (Linked hash) proving why the credit was issued.
- **Residual Value Receipt:** Issued when a voucher is partially used.

## Data Visible After Verification

Shows the issuer domain (`delta.com`, `expedia.com`, `amtrak.com`) and the credit standing.

**Status Indications:**
- **Active / Unused** — Full balance is available for redemption.
- **Partially Used** — Some value remains (shows current balance).
- **Redeemed** — **ALERT:** Voucher has been fully spent; paper is now worthless.
- **Expired** — **ALERT:** The credit period has lapsed.
- **Voided** — **ALERT:** Voucher was cancelled (e.g., after a chargeback).

## Second-Party Use

The **Voucher Holder (Traveler)** benefits from verification.

**Secure Resale:** If a traveler wants to sell their $500 voucher to a friend, they can show the "Verified" hash. The buyer scans it and sees **"ACTIVE BALANCE: $500"** from the official airline domain, allowing the transaction to happen without the fear of a scam.

**Redemption Speed:** At a busy ticket counter, the traveler scans their own voucher. "Verified by Amtrak" ensures the agent that the credit is real and hasn't been used on another booking, bypassing the need for a manual "Voucher Lookup" in the legacy mainframe.

## Third-Party Use

**Secondary Marketplaces (e.g., SpareFellow, Raise)**
**Merchant Vetting:** Marketplaces can require sellers to provide a verified hash. This allows the platform to automatically delist vouchers that reach **"REDEEMED"** status, protecting buyers from "Double-Spend" fraud.

**Corporate Travel Desks**
**Asset Recovery:** Large companies often have thousands of "Unused Credits" from cancelled employee trips. Live Verify allows them to bulk-verify the value of their "Voucher Portfolio" for tax and accounting purposes.

**Consular Officers**
**Financial Means Proof:** Travelers applying for a visa can use verified "Future Credits" as part of their proof of financial ability to travel.

## Verification Architecture

**The "Double-Spend" Fraud Problem**

- **Balance Inflation:** Changing a "$50" voucher to read "$500" on a printed PDF to trick an agent or a buyer.
- **Zombie Redemptions:** Selling a voucher today that was actually redeemed yesterday.
- **Logo Mimicry:** Creating fake "Delta" vouchers to steal PII during a fake "Claim Your Credit" scam.

**Issuer Types** (First Party)

**Airlines.**
**Hotels.**
**Online Travel Agencies (OTAs).**

**Privacy Salt:** Essential. Voucher codes are essentially passwords to money. The hash must be salted to prevent "Code Guessing" (Brute-Force) attacks to find valid vouchers.

## Rationale

Travel vouchers are "Digital Gold." By turning them into verifiable digital bridges, we protect the secondary market from scams and ensure that travel credits retain their value as a trusted alternative to cash refunds.

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

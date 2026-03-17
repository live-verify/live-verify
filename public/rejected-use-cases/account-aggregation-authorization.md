---
title: "Account Aggregation Authorization Certificates"
category: "Banking & Payments"
volume: "Medium"
retention: "1-3 years (service duration)"
slug: "account-aggregation-authorization"
tags: ["account", "aggregation", "authorization", "banking", "open-banking", "compliance"]
furtherDerivations: 1
---

## What is a Data Authorization?

In the era of "Open Banking," you often click "Connect Bank" to let an app (like Mint, Rocket Mortgage, or Venmo) see your checking account.

This digital handshake is invisible. You don't get a receipt. If that app gets hacked 3 years later, how do you prove you *only* gave them permission to "Read Balance" and not "Move Money"?

A **Data Authorization Certificate** is a receipt for that digital handshake. It proves exactly **who** you let in, **what** they can see, and **when** the key expires.

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 1px solid #ddd; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); overflow: hidden; background: #fff;">
  <div style="background: #004d40; color: #fff; padding: 20px; text-align: center;">
    <h2 style="margin: 0; font-size: 1.4em; letter-spacing: 1px;"><span verifiable-text="start" data-for="agg"></span>DATA ACCESS AUTHORIZATION</h2>
    <div style="font-size: 0.8em; margin-top: 5px; opacity: 0.8;">FIRST NATIONAL BANK OF OMAHA</div>
  </div>
<div style="padding: 30px;">
    <div style="font-size: 0.9em; color: #555; margin-bottom: 20px;">
      <strong>Certificate ID:</strong> AA-8923-XK-2025<br>
      <strong>Issued:</strong> March 15, 2025 14:30 UTC
    </div>
<div style="font-size: 1.1em; line-height: 1.5; color: #333; margin-bottom: 20px;">
      <p>This certifies that <strong>Customer:</strong> Jane Doe (Ending in ...4421)</p>
<p>Has explicitly authorized:</p>
      <p><strong>Third Party:</strong> BudgetPlanner App (via Plaid)<br>
      <strong>Scope:</strong> Read-Only Transaction History, Balance Details<br>
      <strong>Accounts:</strong> Checking (...9988), Savings (...7766)</p>
<p><strong>Status:</strong> ACTIVE<br>
      <strong>Expiration:</strong> March 15, 2026</p>
    </div>
<div style="font-size: 0.8em; color: #777; font-style: italic;">
      This document serves as proof of consumer consent under Dodd-Frank Section 1033.
    </div>
<div data-verify-line="agg" style="border-top: 1px dashed #ccc; margin-top: 30px; padding-top: 15px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #444; text-align: center;"
      title="Demo only: Bank doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:fnbo.com/auth/v <span verifiable-text="end" data-for="agg"></span>
    </div>
  </div>
</div>

## Data Verified

Customer identity (partial/redacted), authorized third party, specific accounts included, scope of access (read-only, payments, etc.), timestamp of consent, expiration date.

**Certificate Variations:** 
- **Consumer Consent Record:** Proof for the customer.
- **Inter-bank Authorization:** Proof for the receiving bank.
- **Revocation Certificate:** Proof that access was terminated.

## Data Visible After Verification

Shows the issuer domain (the holding bank) and the current status of the token/access.

**Status Indications:**
- **Active** — Consent is current and valid.
- **Revoked** — Customer or bank terminated access.
- **Expired** — Token/consent period has lapsed.

## Second-Party Use

The **Bank Customer** benefits from verification.

**Dispute Resolution:** If a third-party app initiates an unauthorized transfer, this document proves the *exact scope* of what was authorized. "I authorized Read-Only access, not Payments."

**Privacy Auditing:** A physical or digital record of who has access to your financial life.

**Mortgage Applications:** Providing "proof of funds" access to a lender often uses these aggregators. This certificate confirms the link was established.

## Third-Party Use

**Regulators (CFPB, OCC)**

**Compliance Monitoring:** Verifying that banks are complying with Open Banking / Dodd-Frank 1033 rules regarding consumer data access.

**Fintech Apps**

**Audit Trail:** Maintaining proof that they obtained valid consent from the user before scraping/accessing data, defending against "screen scraping" lawsuits.

**Courts and Legal Professionals**

**Evidence:** In divorce or bankruptcy proceedings, proving whether specific parties had visibility into assets at specific times.

## Verification Architecture

**The Data Access Fraud Problem**

- **Scope Creep:** An app authorized for "balance checks" silently starting to scrape "transaction history."
- **Ghost Access:** Apps retaining access tokens after the user believes they cancelled the service.
- **Impersonation:** Phishing sites tricking users into granting access.

**Issuer Types** (First Party)

**Banks & Credit Unions:** The data holders.
**Aggregators (Plaid, Yodlee, Finicity):** acting as authorized intermediaries.

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

**Jurisdictional Requirements (Banking)**

Banking regulators vary widely:

**US Banks (OCC, FDIC, Federal Reserve):** Do not mandate external witnessing for domestic use; verification via bank's own systems is sufficient.

**International/EU Banks (PSD2, Banking Regulation):** Require independent witness firms for:
- Open Banking consent records (PSD2 compliance)
- Large cross-border transfers (suspicious activity reporting)
- Cryptocurrency/stablecoin gateway documents

**Cross-border use:** When documents are shared internationally, witness firms from neutral OECD jurisdictions prevent regulatory arbitrage.

**Public Blockchain (Non-Party)**

Witnessing firms may periodically commit rollups to an inexpensive public blockchain, providing an ultimate immutability guarantee. The blockchain is a "non-party"—infrastructure, not a participant in the transaction. This creates multiple verification paths:

1. **Issuer domain** — Direct check against the issuer
2. **Witnessing firm** — Independent confirmation with timestamp
3. **Public blockchain** — Decentralized trust anchor via rollup inclusion


## Competition vs. QR/NFC/APIs

| Feature | OCR-to-Hash | API (OAuth) | QR Code |
| :--- | :--- | :--- | :--- |
| **Purpose** | **Proof of Consent.** An artifact showing *that* access was granted. | **Data Transfer.** The actual mechanism of moving data. | **Quick Link.** Opening a URL. |
| **Human Readable** | **Yes.** "I authorized BudgetApp to see my Savings." | **No.** Just an access token string (opaque). | **No.** |
| **Durability** | **High.** Can be printed/saved as PDF audit trail. | **Low.** Tokens expire/rotate; logs are ephemeral. | **Medium.** |
| **Use Case** | **Compliance/Legal/Audit.** Proving the *agreement*. | **Functional.** Doing the *work*. | **Convenience.** |

**Why OCR wins here:** You don't use OCR to *move* the money or data. You use it to *audit* the permissions. APIs are invisible to the average user. A certificate saying "You granted access to X" is a tangible artifact that brings transparency to the invisible web of Open Banking connections.


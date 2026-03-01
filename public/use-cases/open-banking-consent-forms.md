---
title: "Open Banking Consent Forms (PSD2 / Dodd-Frank 1033)"
category: "Banking & Payments"
volume: "Very Large"
retention: "Consent term + 3-7 years (audit)"
slug: "open-banking-consent-forms"
tags: ["open-banking", "psd2", "consent-management", "data-privacy", "financial-data", "third-party-provider", "consumer-rights"]
furtherDerivations: 1
---

## What is an Open Banking Consent?

**Open Banking** allows you to securely share your financial data (like transaction history) with third-party apps (like Mint, Wise, or a mortgage lender). To do this, you must grant **Explicit Consent**.

The **Consent Form** is the legal receipt for this digital handshake. It proves:
1.  **Who:** Which app you let in (e.g., "Plaid" or "BudgetApp").
2.  **What:** Exactly which data they can see (e.g., "Account Balance Only" vs "Full History").
3.  **When:** When the permission expires (usually 90 days).

**"Consent Creep"** is a major privacy risk. An app authorized for a one-time "Credit Check" might continue to scrape your data for months after you've deleted the app. Verified hashes turn these invisible digital permissions into a tangible, auditable artifact. You can scan the "Consent Receipt" to see its **Live Status** (Active vs Revoked) on the bank's own domain.

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 1px solid #ddd; background: #fff; padding: 0; box-shadow: 0 4px 12px rgba(0,0,0,0.1); overflow: hidden;">
  <div style="background: #004d40; color: #fff; padding: 20px; display: flex; justify-content: space-between; align-items: center;">
    <div>
      <div style="font-weight: bold; font-size: 1.2em;"><span verifiable-text="start" data-for="ob-consent">[</span>HSBC OPEN BANKING</div>
      <div style="font-size: 0.8em; opacity: 0.8;">Secure Data Sharing Receipt</div>
    </div>
    <div style="font-size: 1.2em;">🔓</div>
  </div>
<div style="padding: 30px;">
    <h3 style="margin-top: 0; color: #004d40; border-bottom: 2px solid #004d40; padding-bottom: 5px;">AUTHORIZATION RECORD</h3>
<div style="font-size: 0.95em; line-height: 1.6; color: #333;">
      <p>This certifies that <strong>Customer:</strong> JANE M. SMITH (Ending in ...4421) has granted permission to:</p>
<div style="background: #f1f8e9; padding: 15px; border: 1px solid #c5e1a5; margin: 20px 0;">
        <p><strong>Third-Party Provider:</strong> ClearScore (via Plaid)<br>
        <strong>Access Scope:</strong> AIS (Account Information Service)<br>
        <strong>Included Data:</strong> 12 Months Transaction History, Balance</p>
      </div>
<p><strong>Authorization ID:</strong> HSBC-OB-99228877<br>
      <strong>Consent Date:</strong> March 15, 2026<br>
      <strong>Expiry Date:</strong> June 13, 2026 (90 Days)</p>
    </div>
<div style="margin-top: 30px; font-size: 0.8em; color: #777; font-style: italic; text-align: center;">
      Verified compliant with PSD2 (EU) and UK Open Banking standards. Scan to revoke access instantly.
    </div>
<div data-verify-line="ob-consent" style="border-top: 1px dashed #ccc; margin-top: 20px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #444; text-align: center;"
      title="Demo only: HSBC doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:hsbc.com/v <span verifiable-text="end" data-for="ob-consent">]</span>
    </div>
  </div>
</div>

## Data Verified

Customer ID (masked), Third-Party Provider (TPP) name, Authorization ID, Access Scope (AIS/PIS), Specific accounts shared, Transaction history depth (e.g., "90 days"), Consent timestamp, Expiry timestamp, Regulatory jurisdiction (PSD2/UK/Dodd-Frank).

**Document Types:**
- **Consent Receipt:** Issued to the consumer after authorization.
- **Revocation Certificate:** Proving the data-sharing link is dead.
- **TPP Authorization:** (Linked hash) proving the fintech app is registered.
- **Audit Log Extract:** For regulatory compliance reporting.

## Data Visible After Verification

Shows the issuer domain (the Bank) and the live status of the API link.

**Status Indications:**
- **Active** — Data is currently being shared with the third party.
- **Expired** — 90-day window has passed; link is inactive.
- **Revoked by User** — **ALERT:** Access was terminated by the customer.
- **TPP Suspended** — **ALERT:** Bank has blocked the app due to security concerns.

## Second-Party Use

The **Bank Customer** benefits from verification.

**Privacy Defense:** Proving to themselves (or their family) exactly what data is being shared. If they see "Full Transaction History" on the verified hash but only wanted "Balance Check," they can revoke access immediately.

**Dispute Resolution:** If an unauthorized payment occurs, the "Consent Receipt" is the cryptographic proof of what the bank was authorized to do. "I authorized *Inquiry* access, not *Payment* access."

## Third-Party Use

**Regulators (FCA / CFPB)**
**Consumer Protection Audit:** Verifying that banks are correctly implementing the "Right to Revoke" and "90-day Renewal" rules. Live Verify allows a regulator to audit 1,000 consumer consent records in minutes by scanning hashes.

**Mortgage Lenders**
**Data Source Vetting:** Ensuring that the transaction data they received via an aggregator (like Plaid) was indeed authorized by the verified customer, satisfying "Source of Funds" due diligence.

**Data Protection Officers (GDPR)**
**Compliance Proof:** Maintaining an immutable record of user consent to defend against "Unauthorized Processing" lawsuits.

## Verification Architecture

**The "Ghost Access" Fraud Problem**

- **Consent Tampering:** A fintech app editing the "Receipt PDF" to hide that they have access to the user's primary savings account.
- **Revocation Hiding:** Keeping a "Verified" looking paper after the user has revoked access in their banking app.
- **Impersonation:** Creating a fake "Bank Consent" screen to trick users into revealing their SSN or login details.

**Issuer Types** (First Party)

**National Banks:** (HSBC, Barclays, Chase).
**TPPs (Third Party Providers):** (Wise, Curve, Klarna).
**Consent Managers:** (e.g., Plaid, Tink, Truelayer - hosting the session hashes).

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

**Jurisdictional Requirements (PSD2/Open Banking)**

PSD2 (Payment Services Directive 2) in the EU explicitly requires:
- Independent witness firms for consent form verification
- Geographic separation from the bank to prevent collusion
- Immutable audit trails of all consent modifications

**US vs EU:** US banks may voluntarily use witness firms for international customers; EU banks must use them for cross-border transactions.

**Public Blockchain (Non-Party)**

Witnessing firms may periodically commit rollups to an inexpensive public blockchain, providing an ultimate immutability guarantee. The blockchain is a "non-party"—infrastructure, not a participant in the transaction. This creates multiple verification paths:

1. **Issuer domain** — Direct check against the issuer
2. **Witnessing firm** — Independent confirmation with timestamp
3. **Public blockchain** — Decentralized trust anchor via rollup inclusion


## Competition vs. OAuth Tokens

| Feature | Live Verify | OAuth Token (JWT) | Dashboard (Online Banking) |
| :--- | :--- | :--- | :--- |
| **Human Readable** | **Yes.** "I authorized X to see Y." | **No.** Just an opaque string of code. | **Yes.** |
| **Durability** | **High.** Survives as a PDF/Paper audit trail. | **None.** Tokens are short-lived. | **System-Locked.** |
| **Transparency** | **High.** Proof is in the user's hand. | **Low.** Only the systems see the token. | **Medium.** requires login. |
| **Offline Proof** | **Strong.** Protects the agreement text. | **Zero.** | **None.** |

**Why Live Verify wins here:** The "Transparency Gap." OAuth tokens move the data, but humans don't understand them. Live Verify turns the **Invisible Digital Agreement** into a human-readable "Data Receipt," bringing the security of the API to the world of consumer rights and legal audits.
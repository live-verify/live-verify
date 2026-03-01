---
title: "1031 Exchange Documentation"
category: "Real Estate & Property"
volume: "Very Small"
retention: "7-10 years (IRS audit)"
slug: "1031-exchange-documentation"
tags: ["1031", "exchange", "documentation", "real", "estate", "property", "tax"]
furtherDerivations: 1
---

## What is a 1031 Exchange?

In US tax law, if you sell an investment property for a profit, you usually pay capital gains tax. However, under **Section 1031**, you can defer these taxes if you reinvest the money into a new property.

The catch? strict rules:
1.  **The Intermediary:** You cannot touch the cash. A neutral third party (Qualified Intermediary or **QI**) must hold the funds.
2.  **The 45-Day Rule:** You must identify potential new properties within 45 days of selling the old one.

This document is the **Identification Form**. It acts as a timestamped "snapshot" proving the investor met the 45-day deadline.

<div style="max-width: 600px; margin: 24px auto; font-family: 'Times New Roman', Georgia, serif; border: 1px solid #999; box-shadow: 2px 2px 10px rgba(0,0,0,0.1); background: #fff; padding: 0;">
  <div style="padding: 30px 40px; text-align: left;">
    <span verifiable-text="start" data-for="1031">[</span>
    <div style="border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 20px;">
      <div style="font-size: 1.2em; font-weight: bold; text-transform: uppercase;">Equitable Exchange Services, Inc.</div>
      <div style="font-size: 0.8em; color: #555;">A Qualified Intermediary</div>
      <div style="font-size: 0.8em; margin-top: 5px;">QI License: #99-2342-CA</div>
    </div>
<h2 style="font-size: 1.4em; text-align: center; margin: 20px 0; text-decoration: underline;">IDENTIFICATION OF REPLACEMENT PROPERTY</h2>
<div style="font-size: 0.95em; line-height: 1.5; color: #333;">
      <p><strong>Exchanger:</strong> Robert & Mary Smith Trust<br>
      <strong>Relinquished Property:</strong> 123 Oak Street, Springfield, IL<br>
      <strong>Date of Transfer:</strong> January 15, 2026</p>
<p>Pursuant to Section 1031 of the Internal Revenue Code, the Exchanger hereby identifies the following replacement properties:</p>
<ol>
        <li>456 Maple Avenue, Chicago, IL (FMV: $450,000)</li>
        <li>789 Pine Lane, Evanston, IL (FMV: $525,000)</li>
        <li>101 Cedar Drive, Naperville, IL (FMV: $475,000)</li>
      </ol>
<p><strong>Identification Date:</strong> February 20, 2026 (Within 45-day period)</p>
    </div>
<div style="margin-top: 40px;">
      <div style="border-top: 1px solid #000; width: 60%; padding-top: 5px; font-size: 0.8em; margin-bottom: 20px;">Exchanger Signature</div>
      <div style="border-top: 1px solid #000; width: 60%; padding-top: 5px; font-size: 0.8em;">Qualified Intermediary Signature</div>
    </div>
<div data-verify-line="1031" style="border-top: 1px dashed #999; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
      title="Demo only: This is an illustrative example of the verification line">
      verify:equitable-exchange.com/v
    </div>
    <span verifiable-text="end" data-for="1031">]</span>
  </div>
</div>

## Data Verified

Exchanger name, relinquished property address, date of transfer, identified replacement properties (addresses and fair market values), identification date, Qualified Intermediary (QI) name and license.

**Document Types:**
- **Identification of Replacement Property** (45-day rule compliance)
- **Exchange Agreement**
- **Closing Statements** (HUD-1/ALTA) for both legs
- **Qualified Intermediary Resignation/Assignment**

## Data Visible After Verification

Shows the issuer domain (the Qualified Intermediary) and the responder text.

**Status Indications:**
- **Valid** — Document authentic, QI confirms structure is active/completed.
- **Void** — Exchange failed or was cancelled.
- **Amended** — Superseded by a later identification form (within the 45-day window).

## Second-Party Use

The **Exchanger** (second party) receives the identification form from the Qualified Intermediary (first party), **keeps it**, and may later hand it to third parties for various reasons, or never do so.

**Personal Record:** The exchanger has their own verified copy of the 45-day identification. Most of the time, the document sits in their tax files—the verification value is latent, there *if needed*.

**Peace of Mind:** The exchanger can confirm at any time that the form matches what the QI's system recorded and hasn't been altered since they received it.

**Future Optionality:** If an IRS audit arises 3 years later, the exchanger has cryptographic proof ready without needing to contact the QI, preventing the IRS from disqualifying the exchange for "backdating" documents.

## Third-Party Use

The exchanger (second party) may hand the verified document to various third parties:

**IRS and Tax Authorities**
Agents can instantly verify the authenticity and timestamp of the identification form. 1031 exchanges are high-risk audit targets; verifying that the identification list wasn't fabricated retroactively is a primary check.

**Lenders and Financial Institutions**
Underwriters need to verify that large incoming wires are non-debt funds from a property sale. Verified 1031 docs prove the source and tax-deferred status (impacting debt-to-income ratios since capital gains tax isn't due).

**Title and Escrow Companies**
Closing agents must follow strict instructions from the QI. Verifying the exchange agreement ensures they are paying the proceeds to the QI, not the seller (which would bust the exchange).

## Verification Architecture

**The 1031 Exchange Fraud Problem**

- **Backdating:** The most common fraud. Taxpayers missing the 45-day identification deadline and creating a document dated earlier.
- **Fake QIs:** Fraudsters setting up fake QI websites to steal exchange funds (which must be held by a third party).
- **Alteration:** Changing the property list after the fact to include the property actually purchased.

**Issuer Types (First Party)**

- Qualified Intermediaries (QIs) — Specialized non-bank financial institutions that hold funds
- Exchange Accommodators — Entities handling reverse exchanges

**Privacy Salt:** Required. Unlike documents with many unpredictable variables, 1031 identification forms contain enumerable values—standard property addresses, round dollar fair market values, and publicly recorded real estate transactions. A competitor or tax authority could feasibly enumerate combinations to reverse-engineer a taxpayer's investment strategy. Salt protects the privacy of the specific properties being considered.

## Jurisdictional Witnessing

A jurisdiction may require Qualified Intermediaries to retain a **witnessing firm** for regulatory compliance. The witnessing firm:

- Receives all hashes from the QI, and any subsequent changes to the payload as they happen—which may manifest as a new hash, a status change (void, amended), or even a 404 (record deleted)
- Receives structured content/metadata (exchanger name, property addresses, identification dates, fair market values)
- Does **NOT** receive plaintext (social security numbers, bank account details)
- Provides an immutable, timestamped audit trail—available to the jurisdiction on demand, to exchangers/third parties during disputes, or as expert witness testimony in legal proceedings

This provides:
- **Non-repudiation:** QI cannot deny issuing the identification form
- **Timestamp proof:** Form existed at a specific time (critical for 45-day deadline compliance)
- **Regulatory audit:** IRS can inspect the witness ledger for backdating fraud
- **Resilience:** Verification works even if QI's systems go down or the QI goes out of business

**Jurisdictional Requirements (United States / IRS)**

The IRS does not mandate or recognize third-party witnessing firms for federal tax documents. The IRS maintains authoritative records within its own systems, and verification occurs via direct query to IRS endpoints.

However:
- **State tax authorities** may have different requirements (e.g., state-level charity registration requires independent witness firms)
- **International stakeholders** (foreign tax authorities, treaty partners) may demand independent verification from witness firms not located in the US
- **FATCA compliance** (Foreign Account Tax Compliance Act) may require US documents to be witnessed by non-US firms when shared across borders

**Verification Framework Differences**

The FATCA/CRS frameworks require geographic separation (independent witness firms outside the issuer's jurisdiction) for cross-border documents originating from certain financial centers. This reflects a principle of independent external verification for documents crossing regulatory jurisdictions.

The IRS maintains its own verification infrastructure for federal tax documents (1031 determinations, EIN assignments, tax rulings). These documents are verified through direct IRS system queries rather than through independent witness firms. This represents a different verification model—issuer-maintained records for domestic purposes, with the expectation that treaty partners will conduct direct verification with the IRS.

Both models serve distinct purposes: FATCA/CRS-style geographic separation prevents collusion when documents enter non-issuing jurisdictions; issuer-maintained systems provide efficient verification for routine domestic transactions. As international document verification evolves, blockchain-based rollups and decentralized architectures may converge these models into infrastructure-neutral standards applicable across jurisdictions.

**Public Blockchain (Non-Party)**

Witnessing firms may periodically commit rollups to an inexpensive public blockchain, providing an ultimate immutability guarantee. The blockchain is a "non-party"—infrastructure, not a participant in the transaction. This creates multiple verification paths:

1. **QI domain** — Direct check against the issuer
2. **Witnessing firm** — Independent confirmation with timestamp
3. **Public blockchain** — Decentralized trust anchor via rollup inclusion

## Competition vs. QR/NFC

| Feature | Live Verify | QR Code |
| :--- | :--- | :--- |
| **Audit Trail** | **Superior.** The paper document itself is the artifact. The hash proves the *content* of the paper existed at the timestamp. | **Weak.** QR codes are often just links. They don't inherently prove the *text* surrounding them hasn't changed unless the QR contains the full text (too large). |
| **Professionalism** | **High.** A discreet `verify:` line at the bottom of a legal letter looks standard. | **Low.** A giant QR code on a formal legal designation letter looks out of place. |
| **Longevity** | **High.** Text is durable. | **Medium.** QR codes can be damaged by folding, stapling, or scanning/copying degradation. |
| **Privacy** | **High.** No data leaked until the specific hash is queried. | **Variable.** If the QR encodes the data, anyone with a camera can read it instantly without an audit trail. |

**Why Live Verify wins here:** 1031 documents are heavily scrutinized legal instruments. They need to look like contracts, not shipping labels. The primary "user" is often an IRS auditor years later, working from a scanned PDF or photocopy where a QR code might be illegible, but text is readable and re-typable if needed.

---
title: "Remittance Transfer Confirmations"
category: "Banking & Payments"
volume: "Very Large"
retention: "5-7 years (financial audit / AML lifecycle)"
slug: "remittance-transfer-confirmations"
tags: ["remittance", "western-union", "money-transfer", "cross-border-payment", "mtcn", "fintech-fraud", "money-laundering", "immigrant-services"]
furtherDerivations: 1
---

## What is a Remittance Confirmation?

In global finance, a **Remittance Confirmation** (or Receipt) is the proof that money was sent across borders—typically from a worker in a high-income nation to their family in their home country. These receipts (carrying an **MTCN** or reference number) act as "Digital Cash" that can be picked up at any participating agent location.

Because these papers are essentially vouchers for cash, they are high-stakes targets for fraud. Scammers use "Fake Receipts" to trick people into sending goods or "processing fees" for a lottery win that doesn't exist. Similarly, a dishonest person might "edit" a receipt to show a $5,000 transfer instead of $50 to trick an immigration officer or a lender. Verified hashes bind the **MTCN, Receiver Name, and Amount** to the provider's domain (e.g., `westernunion.com` or `moneygram.com`).

<div style="max-width: 400px; margin: 24px auto; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; border: 1px solid #ccc; background: #fff; padding: 0; box-shadow: 0 4px 12px rgba(0,0,0,0.1); overflow: hidden;">
  <div style="background: #ffcc00; color: #000; padding: 20px; text-align: center; border-bottom: 2px solid #000;">
    <div style="font-weight: bold; font-size: 1.4em; letter-spacing: -1px;"><span verifiable-text="start" data-for="remit">[</span>WesternUnion \/</div>
    <div style="font-size: 0.7em; font-weight: bold; text-transform: uppercase; margin-top: 5px;">Money Transfer Receipt</div>
  </div>
<div style="padding: 20px; background: #fffbe6;">
    <div style="text-align: center; margin-bottom: 20px;">
      <div style="font-size: 0.7em; color: #666; text-transform: uppercase;">Tracking Number (MTCN)</div>
      <div style="font-size: 1.8em; font-weight: bold; color: #000; letter-spacing: 2px;">992-288-7766</div>
    </div>
<div style="font-size: 0.9em; line-height: 1.5; color: #333;">
      <p><strong>Sender:</strong> JOHN JACOB DOE (USA)<br>
      <strong>Receiver:</strong> SARAH JANE SMITH (MEX)</p>
<div style="border-top: 1px solid #ddd; border-bottom: 1px solid #ddd; padding: 10px 0; margin: 15px 0;">
        <div style="display: flex; justify-content: space-between;">
          <span>Transfer Amount:</span>
          <strong>$ 1,250.00 USD</strong>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 0.8em; color: #666;">
          <span>Exchange Rate:</span>
          <span>1 USD = 17.42 MXN</span>
        </div>
        <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 1.1em; margin-top: 5px;">
          <span>Total to Receiver:</span>
          <span>21,775.00 MXN</span>
        </div>
      </div>
    </div>
  </div>
<div style="padding: 20px; background: #fff; text-align: center;">
    <div data-verify-line="remit" style="font-family: 'Courier New', monospace; font-size: 0.8em; color: #000; font-weight: bold;"
      title="Demo only: Remittance firms don't yet offer verification&#10;endpoints, so this is illustrative">
      verify:wu.com/v <span verifiable-text="end" data-for="remit">]</span>
    </div>
    <div style="font-size: 0.65em; color: #999; margin-top: 10px; font-style: italic;">
      Scan to verify transfer status and payment integrity. Protect your MTCN like cash.
    </div>
  </div>
</div>

## Data Verified

MTCN (Money Transfer Control Number), sender name, receiver name, origin country, destination country, transfer amount (USD), exchange rate, payout amount (local currency), fees paid, date/time of transfer, agent location ID.

**Document Types:**
- **Send Receipt:** Given to the person who paid the cash.
- **Payout Receipt:** Signed by the receiver at the destination.
- **Statement of History:** Aggregate report for immigration/tax purposes.
- **Refund Confirmation:** (Linked hash) proving money was returned.

## Data Visible After Verification

Shows the issuer domain (`wu.com`, `moneygram.com`, `wise.com`) and the transfer standing.

**Status Indications:**
- **Available for Pickup** — Money is waiting at an agent location.
- **Paid / Picked Up** — **ALERT:** The cash has already been collected; this paper is now worthless.
- **Refunded** — **ALERT:** The sender cancelled the transfer and took the money back.
- **Held / Fraud Alert** — **CRITICAL:** The transfer is blocked for compliance review.

## Second-Party Use

The **Sender / Receiver** benefits from verification.

**Anti-Scam Protection:** A person buying a laptop on Facebook Marketplace is sent a "Photo of a Western Union Receipt" as proof of payment. The seller scans the hash. If it returns **"PAID"** or **"REFUNDED,"** they know the buyer is trying to scam them with an old or cancelled receipt, potentially saving them from a $1,000 loss.

**Pickup Speed:** A receiver at a busy agent in Mexico City scans their own receipt. "Verified by WU" ensures the agent that the MTCN is valid and the payout amount is accurate, bypassing the 10-minute "Legacy System Search" and reducing errors in cash counting.

## Third-Party Use

**Immigration Authorities (USCIS / Consulates)**
**Proof of Support:** Immigrants often use verified remittance hashes to prove they are financially supporting their family back home, which is a key factor in many "Hardship Waiver" cases. Verified hashes ensure the support is real and not a "Photoshop Fabrication."

**Financial Intelligence Units (FIUs)**
**Money Laundering Audit:** Verifying the "Integrity of the Chain." Instead of requesting 1,000 separate records, an auditor can scan the verified hashes provided by a large agent. This ensures the "Paper Logs" match the "Digital Ledger," stopping "Smurfing" fraud.

**Banks & Lenders**
**Income Vetting:** Using verified remittance history as a "Secondary Credit Score" for unbanked individuals, allowing them to qualify for loans based on their verified payment behavior.

## Verification Architecture

**The "Z-Receipt" Fraud Problem**

- **MTCN Re-Use:** Selling the same physical receipt to multiple people as "proof" of payment.
- **Amount Inflation:** Changing a $50 transfer into a $5,000 one on a printed PDF to meet a wealth requirement.
- **Ghost Transfers:** Creating fake "MoneyGram" emails to trick people into paying a "Fee" to release a larger non-existent sum.

**Issuer Types** (First Party)

**Global Remittance Brands (Western Union, MoneyGram).**
**Fintech Apps (Wise, Remitly, Revolut).**
**Postal Banking Services.**

**Privacy Salt:** Highly Critical. Remittance data is sensitive financial PII. The hash must be salted to prevent "MTCN Harvesting" or tracking the wealth-flow of individual immigrant families.

## Rationale

Remittance is the "Invisible Economy." By turning paper receipts into verifiable digital bridges, we protect the most vulnerable participants in the global financial system from the multi-billion dollar cost of fraud and predatory scams.

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

---
title: "Mobile Money Transaction Receipts"
category: "Banking & Payments"
volume: "Large"
retention: "3-7 years (tax/disputes)"
slug: "mobile-money-receipts"
tags: ["m-pesa", "gcash", "bkash", "remittance", "mobile-money", "p2p-payment", "financial-inclusion", "unbanked-finance"]
furtherDerivations: 1
---

<div style="max-width: 400px; margin: 24px auto; font-family: 'Courier New', Courier, monospace; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
  <div style="text-align: center; border-bottom: 1px solid #000; padding-bottom: 10px; margin-bottom: 15px;">
    <strong><span verifiable-text="start" data-for="m-pesa">[</span>M-PESA SAFARICOM</strong><br>
    Transaction Confirmation Receipt<br>
    --------------------------------
  </div>
<div style="font-size: 0.9em; line-height: 1.4;">
    <p><strong>Transaction ID:</strong> RKJ42BC992</p>
    <p><strong>Confirmed:</strong> March 15, 2026 at 14:22:01</p>
<div style="background: #eee; padding: 10px; margin: 10px 0;">
      <strong>SENT TO:</strong> SAMUEL OKORO<br>
      <strong>PHONE:</strong> +254 712 345 678
    </div>
<p><strong>Amount:</strong> Ksh 12,500.00<br>
    <strong>Fee:</strong> Ksh 112.00<br>
    <strong>Balance:</strong> Ksh 42,280.00</p>
<div style="margin-top: 15px; font-size: 0.8em; font-style: italic;">
      Keep this receipt for your records. Do not share your PIN with anyone.
    </div>
<div data-verify-line="m-pesa" style="border-top: 1px dashed #999; margin-top: 15px; padding-top: 5px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
      title="Demo only: Safaricom doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:safaricom.co.ke/mpesa/v <span verifiable-text="end" data-for="m-pesa">]</span>
    </div>
  </div>
</div>

## Data Verified

Transaction ID (Reference #), Sender phone/name, Recipient phone/name, exact amount (local currency), service fees, timestamp (to the second), current account balance (optional/linked), agent ID (for cash-in/out), issuing mobile money operator.

**Document Types:**
- **P2P Transfer Receipt:** Sent between individuals.
- **Pay-Bill Receipt:** For utility or retail payments.
- **Cash-Out Confirmation:** Issued by a physical agent kiosk.
- **Micro-Loan Statement:** (Linked hash) for mobile-based credit.

## Data Visible After Verification

Shows the issuer domain (`safaricom.co.ke`, `gcash.com`, `mtn.com`) and current transaction standing.

**Status Indications:**
- **Completed** — Funds have been verified as delivered to the recipient.
- **Cancelled** — Transaction reversed; funds returned to sender.
- **Pending** — Transfer in progress or held for compliance review.
- **Void** — Transaction ID not found or details mismatch.

## Second-Party Use

The **Sender / Recipient** benefits from verification.

**Payment Proof:** Proving to a small merchant or landlord that the "Ksh 12,500" was *actually sent* and isn't just a "Fake SMS" or "Altered Screenshot." In emerging markets, "Fake SMS" fraud is a massive problem; a verified hash from the operator's domain provides instant, authoritative proof.

**Tax Compliance:** Providing verified digital receipts to a local tax authority or NGO auditor to justify business expenses in a cash-heavy environment.

## Third-Party Use

**Micro-Lenders / Fintechs**
**Credit Scoring:** Instantly verifying the "Transaction History" of an unbanked individual by scanning their paper or digital receipts. Verified volume and consistency act as a "Reputation Signal" for mobile-based loans.

**Supply Chain Distributors**
**Order Authorization:** A truck driver can verify a small shop owner's mobile payment receipt at the loading dock before handing over a case of goods.

**Law Enforcement / Anti-Money Laundering**
**Fund Tracing:** Verifying the "Source of Funds" for high-value mobile transfers without requiring full account access.

## Verification Architecture

**The "Fake SMS" Fraud Problem**

- **SMS Spoofing:** Using a computer to send a fake "M-Pesa Confirmation" message to a merchant's phone to steal goods.
- **Screenshot Alteration:** Changing the name or amount on a legitimate receipt PDF to trick a landlord.
- **Duplicate Use:** Showing the same "Completed" receipt to multiple people to "pay" for different items.

**Issuer Types** (First Party)

**Mobile Network Operators (MNOs):** (Safaricom, MTN, Orange, Vodafone).
**Super-Apps:** (GCash, GrabPay, bKash).
**Agent Networks:** (Providing the "First-Mile" verified receipts).

**Privacy Salt:** Highly critical. Mobile money data involves personal phone numbers and cash flow. The hash MUST be salted to prevent "Mass Mapping" of a community's financial activity.

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


## Competition vs. SMS Confirmation

| Feature | Live Verify | SMS Confirmation | Scanned Image / PDF |
| :--- | :--- | :--- | :--- |
| **Integrity** | **Cryptographic.** Binds the *Transaction ID*. | **Low.** Easily spoofed with PC software. | **Zero.** Easily forged. |
| **Trust Anchor** | **Domain-Bound.** Bound to the Operator. | **Network-Bound.** Prone to SIM-swapping. | **Visual.** |
| **Availability** | **Instant.** Verified via QR/Hash. | **Laggy.** SMS delivery often fails in congested areas. | **Instant.** |
| **Hardware** | **Universal.** Any smartphone camera. | **Basic.** Works on dumb-phones. | **Visual.** |

**Why Live Verify wins here:** The "Merchant's Defend." Small shop owners in Africa and Asia lose millions to "Fake SMS" scams. They need a **High-Trust, Offline-capable** way to verify that the numbers on the screen match the ledger. Live Verify turns the **Mobile Screen** into a live, trusted clinical link, ensuring the "Digital Cash" is actually in the bank.

---
title: "Mobile Money Transaction Receipts"
category: "Banking & Payments"
volume: "Large"
retention: "3-7 years (tax/disputes)"
slug: "mobile-money-receipts"
verificationMode: "clip"
tags: ["m-pesa", "gcash", "bkash", "remittance", "mobile-money", "p2p-payment", "financial-inclusion", "unbanked-finance"]
furtherDerivations: 1
---

<div style="max-width: 400px; margin: 24px auto; font-family: 'Courier New', Courier, monospace; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
  <div style="text-align: center; border-bottom: 1px solid #000; padding-bottom: 10px; margin-bottom: 15px;">
    <strong><span verifiable-text="start" data-for="m-pesa"></span>M-PESA SAFARICOM</strong><br>
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
      <span data-verify-line="m-pesa">verify:safaricom.co.ke/mpesa/v</span> <span verifiable-text="end" data-for="m-pesa"></span>
    </div>
  </div>
</div>

## The Problem: Fake SMS Fraud

- **SMS Spoofing:** Using a computer to send a fake "M-Pesa Confirmation" message to a merchant's phone to steal goods.
- **Screenshot Alteration:** Changing the name or amount on a legitimate receipt PDF to trick a landlord.
- **Duplicate Use:** Showing the same "Completed" receipt to multiple people to "pay" for different items.

## What Is Checked

Transaction ID (Reference #), Sender phone/name, Recipient phone/name, exact amount (local currency), service fees, timestamp (to the second), current account balance (optional/linked), agent ID (for cash-in/out), issuing mobile money operator.

**Document Types:**
- **P2P Transfer Receipt:** Sent between individuals.
- **Pay-Bill Receipt:** For utility or retail payments.
- **Cash-Out Confirmation:** Issued by a physical agent kiosk.
- **Micro-Loan Statement:** (Linked hash) for mobile-based credit.

## What the Checker Sees

Shows the issuer domain (`safaricom.co.ke`, `gcash.com`, `mtn.com`) and current transaction standing.

**Status Indications:**
- **Completed** — Funds have been verified as delivered to the recipient.
- **Cancelled** — Transaction reversed; funds returned to sender.
- **Pending** — Transfer in progress or held for compliance review.
- **Void** — Transaction ID not found or details mismatch.

## Who Holds It

The Sender / Recipient benefits from verification.

**Payment Proof:** Proving to a small merchant or landlord that the "Ksh 12,500" was *actually sent* and isn't just a "Fake SMS" or "Altered Screenshot." In emerging markets, "Fake SMS" fraud is a massive problem; a verified hash from the operator's domain provides instant, authoritative proof.

**Tax Compliance:** Providing verified digital receipts to a local tax authority or NGO auditor to justify business expenses in a cash-heavy environment.

## Who Checks It

**Micro-Lenders / Fintechs**
**Credit Scoring:** Instantly verifying the "Transaction History" of an unbanked individual by scanning their paper or digital receipts. Verified volume and consistency act as a "Reputation Signal" for mobile-based loans.

**Supply Chain Distributors**
**Order Authorization:** A truck driver can verify a small shop owner's mobile payment receipt at the loading dock before handing over a case of goods.

**Law Enforcement / Anti-Money Laundering**
**Fund Tracing:** Verifying the "Source of Funds" for high-value mobile transfers without requiring full account access.

## Who Issues It

**Issuer Types** (First Party)

**Mobile Network Operators (MNOs):** (Safaricom, MTN, Orange, Vodafone).
**Super-Apps:** (GCash, GrabPay, bKash).
**Agent Networks:** (Providing the "First-Mile" verified receipts).

**Privacy Salt:** Highly critical. Mobile money data involves personal phone numbers and cash flow. The hash MUST be salted to prevent "Mass Mapping" of a community's financial activity.

## Authority Chain

**Pattern:** Regulated

Mobile network operators are regulated by central banks to issue payment receipts.

```
✓ mpesa.safaricom.co.ke — Issues mobile money transaction receipts
  ✓ centralbank.go.ke — Regulates Kenyan financial services
    ✓ go.ke — Kenyan government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Where Each Fits: Live Verify and SMS Confirmations

Mobile money operators such as M-Pesa, GCash and MTN send an SMS confirmation for each transaction. Each operator runs its own service in the countries where it is licensed. The SMS tells the account holder about their own account; Live Verify lets someone else, such as a merchant or landlord, check a receipt they are shown. The two work side by side.

| | SMS confirmation | Live Verify on the receipt | Screenshot or PDF |
| :--- | :--- | :--- | :--- |
| **Who can check** | The account holder, on their own handset. | Anyone shown the receipt who has Live Verify on their phone: a merchant, a landlord, an auditor. | Nobody; it can only be taken on trust. |
| **What the checker gets** | The operator's message about their own account, if it is the recipient's own phone. A message shown on someone else's phone may be spoofed. | Confirmation that the operator issued this exact receipt, with its transaction ID and amount, and its current status, such as reversed. | An image that may have been edited. |
| **What the holder shares** | Nothing; the recipient gets their own message. | Only the receipt they chose to show. | Only the receipt they chose to show. |
| **Reach** | Customers of that operator, in the countries where it is licensed. | Global in principle: any operator, in any country, that publishes hashes on its own domain. | Universal, but untrusted. |
| **Speed and cost** | Arrives with the transaction; can be delayed when networks are busy. | A few seconds per check: one web lookup, with no fee to the standard. Needs a data connection. | Immediate. |
| **What it needs** | Any handset, including basic phones. | The operator to publish hashes, and a smartphone with Live Verify-aware software. No operator does this yet. | Nothing. |
| **Best suited to** | The recipient confirming money has arrived in their own account. | A third party checking a receipt shown to them, and later audit. | Nothing where the amount matters. |

**Where each fits:** The SMS confirmation is the operator's own notification, works on any handset, and for the account holder it remains the normal way to learn that money has arrived. A merchant being shown a message or a receipt on a customer's phone is in a different position, because they cannot tell whether it came from the operator. Live Verify lets the merchant check the receipt text against the operator's domain, in addition to watching for their own confirmation message.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).

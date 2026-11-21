---
title: "Cross-Border Payment Receipts"
category: "Banking & Payments"
volume: "Medium"
retention: "5-7 years (compliance/disputes)"
slug: "cross-border-payment-receipts"
verificationMode: "clip"
tags: ["remittance", "cross-border-payment", "wise", "remitly", "swif", "currency-exchange", "financial-transparency"]
furtherDerivations: 1
---

## What is a Remittance Receipt?

When you send money to another country (e.g., via Wise or Western Union), you get a Transfer Confirmation.

This receipt is the only proof that the money is en route. Recipient freelancers or family members need to know the money is real and the "Exchange Rate" is fair.

Fraudsters often use "Fake Screenshots" to trick sellers into shipping goods before the money actually arrives (or when it was never sent). Live Verify turns the static PDF confirmation into a live, verifiable proof-of-payment that the recipient can trust instantly.

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 1px solid #00b9ff; border-radius: 8px; background: #fff; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <div style="background: #00b9ff; color: #fff; padding: 20px; display: flex; justify-content: space-between; align-items: center;">
    <div style="font-weight: bold; font-size: 1.4em;"><span verifiable-text="start" data-for="remit"></span>Wise</div>
    <div style="font-size: 0.8em; font-weight: bold; text-transform: uppercase;">Transfer Confirmation</div>
  </div>
<div style="padding: 30px;">
    <div style="text-align: center; margin-bottom: 25px;">
      <div style="font-size: 0.9em; color: #666;">Transfer ID: #9988776655</div>
      <div style="font-size: 2.2em; font-weight: bold; color: #00b9ff; margin-top: 5px;">$ 5,000.00 USD</div>
    </div>
<div style="font-size: 0.95em; line-height: 1.6; color: #333; border-top: 1px solid #eee; padding-top: 20px;">
      <p><strong>Sender:</strong> JOHN SMITH (USA)</p>
      <p><strong>Recipient:</strong> TECH-SERVICES LTD (INDIA)<br>
      <strong>Converted To:</strong> ₹ 415,250.00 INR</p>
<p><strong>Exchange Rate:</strong> 1 USD = 83.05 INR<br>
      <strong>Fees:</strong> $ 24.50 USD</p>
<p><strong>Status:</strong> SENT & COMPLETED<br>
      <strong>Date:</strong> March 15, 2026</p>
    </div>
<div style="margin-top: 30px; padding: 10px; background: #f0faff; border: 1px solid #00b9ff; border-radius: 6px; font-size: 0.8em; color: #005a8c;">
      <strong>Consumer Notice:</strong> This receipt is a verified record of the exchange rate and fees applied to your international transfer.
    </div>
<div data-verify-line="remit" style="border-top: 1px dashed #00b9ff; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
      title="Demo only: Wise doesn't yet offer verification&#10;endpoints, so this is illustrative">
      <span data-verify-line="remit">verify:wise.com/v</span> <span verifiable-text="end" data-for="remit"></span>
    </div>
  </div>
</div>

## The Problem: Fake Screenshot Fraud

- **Screenshot Editing:** Using a browser "Inspect Element" tool to change a $100 transfer to $10,000, then taking a screenshot to trick a seller into shipping goods.
- **Rate Manipulation:** Hiding a high "FX Markup" by editing the exchange rate on the PDF to look better than it was.
- **Ghost Transfers:** Creating a fake PDF confirmation for a transfer that was never initiated to "buy time" from a creditor.

## What Is Checked

Sender name, Recipient name/Bank details, Transfer ID, amount sent (currency A), amount received (currency B), exchange rate, transaction fees, timestamp of completion, issuing money transmitter.

**Document Types:**
- **Transfer Confirmation:** The standard PDF/Email for the sender.
- **Remittance Receipt:** For cash-pickup services (e.g., Western Union).
- **SWIFT MT103 Message:** Technical confirmation for high-value B2B wires.

## What the Checker Sees

Shows the issuer domain (`wise.com`, `remitly.com`) and current fund status.

**Status Indications:**
- **Completed** — Funds have been delivered to the recipient's bank.
- **Cancelled** — Transaction voided; funds returned to sender.
- **Processing** — Funds en route; rate is locked.
- **Hold** — Under review (e.g., for compliance/AML reasons).

## Who Holds It

The Sender (Remitter) benefits from verification.

**Payment Proof:** Proving to a freelance developer or a family member abroad that the $5,000 was *actually sent* and isn't just a "Fake Screenshot." Verification prevents the "Recipient says they didn't get it" dispute.

**Expense Audit:** Providing verified proof of foreign business expenses to a company's finance department, ensuring the "Exchange Rate" and "Fees" claimed match the verified reality.

## Who Checks It

**Tax Authorities / Customs**
**Source of Funds:** Verifying large incoming international payments to comply with anti-money laundering (AML) laws. A verified receipt from `wise.com` is more authoritative than a plain paper printout.

**Mortgage Lenders**
**Downpayment Vetting:** When a homebuyer receives a "Gift" from a relative overseas, the lender must verify the source. Live Verify allows the lender to trust the international transfer receipt instantly.

**Regulators (CFPB / FCA)**
**Transparency Compliance:** Ensuring that money transmitters are correctly disclosing their "Total Cost" (Rate + Fees) as required by consumer protection laws (e.g., Dodd-Frank Section 1073).

## Who Issues It

**Issuer Types** (First Party)

**Fintech Remitters:** (Wise, Remitly, WorldRemit, Revolut).
**Legacy Banks:** (SWIFT gpi tracking).
**Cash Networks:** (Western Union, MoneyGram).

**Privacy Salt:** Highly critical. Remittance data involves PII and banking info. The hash must be salted to prevent "Guessing" transfer IDs to see who is moving money.

## Authority Chain

**Pattern:** Regulated

Wise processes cross-border payment transfers and international remittances.

```
✓ wise.com/transfer/verify — Processes cross-border payment transfers and receipts
  ✓ fca.org.uk/register — Regulates UK payment service providers
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Compared With SWIFT gpi (Tracking)

| Feature | Live Verify | SWIFT gpi (Bank Tracking) | Scanned PDF / Image |
| :--- | :--- | :--- | :--- |
| **Trust Anchor** | **Domain-Bound.** Bound to the Payer. | **Bank-Bound.** Trust the technical message. | **Zero.** Easily forged. |
| **User Access** | **Universal.** Any recipient can verify. | **Restricted.** Usually only the sending/receiving banks see the log. | **Instant.** |
| **Integrity** | **Binds FX Rates.** Protects the numbers. | **Data-Only.** | **Vulnerable.** |
| **Interoperability** | **High.** Works for non-SWIFT fintechs. | **Limited.** Only for SWIFT-member banks. | **Universal.** |

**Where each fits:** SWIFT gpi gives the banks in the chain a reliable trace of a payment, and it is the right tool between them. The person waiting for the money usually sees only a receipt sent by the payer, and some providers are outside SWIFT altogether. Live Verify lets that recipient confirm the provider issued the receipt with those amounts and rates. It does not show that funds have arrived, which the bank trace and the recipient's own account still answer.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).

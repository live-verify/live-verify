---
title: "Chargeback Documentation and Dispute Records"
category: "Banking & Payments"
volume: "Small"
retention: "3-7 years (dispute resolution)"
slug: "chargeback-documentation"
tags: ["chargeback", "payment-dispute", "visa", "mastercard", "ecommerce-fraud", "merchant-protection"]
furtherDerivations: 1
---

## What is a Chargeback Adjudication?

When a customer disputes a credit card charge (a "Chargeback"), the merchant must provide evidence (like a FedEx receipt or an IP address) to prove the sale was legitimate.

The **Adjudication Letter** is the final verdict from the payment processor (like PayPal or Stripe) stating: "Dispute Won" or "Dispute Lost."

Merchants need these verified letters to prove to lenders and business partners that their "Fraud Rate" is low. Without verification, a merchant could easily fake a "Dispute Won" letter to hide that they are being victimized by massive amounts of fraud.

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 1px solid #ccc; background: #fff; padding: 0; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <div style="background: #003087; color: #fff; padding: 20px; display: flex; justify-content: space-between; align-items: center;">
    <div style="font-weight: bold; font-size: 1.2em;"><span verifiable-text="start" data-for="chargeback">[</span>PAYPAL MERCHANT SERVICES</div>
    <div style="font-size: 0.8em;">Dispute Case: PP-D-99887766</div>
  </div>
<div style="padding: 25px;">
    <h3 style="margin-top: 0; color: #003087; border-bottom: 2px solid #003087; padding-bottom: 5px;">CHARGEBACK DISPUTE SUMMARY</h3>
<div style="font-size: 0.9em; line-height: 1.5; color: #333;">
      <p><strong>Merchant:</strong> Electronic Emporium, LLC<br>
      <strong>Transaction Date:</strong> Feb 10, 2026<br>
      <strong>Amount Disputed:</strong> $ 1,250.00</p>
<div style="background: #f5f5f5; border: 1px solid #ddd; padding: 15px; margin: 15px 0;">
        <p><strong>Reason Code:</strong> 10.4 (Other Fraud - Card-Not-Present)</p>
        <p><strong>Merchant Evidence Status:</strong> COMPELLED<br>
        <strong>Proof of Delivery:</strong> FedEx Tracking #9922887766<br>
        <strong>IP Address:</strong> 192.168.1.42 (Verified Match)</p>
      </div>
<p style="font-weight: bold; color: #2e7d32;">CURRENT STATUS: DISPUTE WON - FUNDS REVERSED TO MERCHANT</p>
    </div>
<div data-verify-line="chargeback" style="border-top: 1px dashed #999; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
      title="Demo only: PayPal doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:paypal.com/disputes/v <span verifiable-text="end" data-for="chargeback">]</span>
    </div>
  </div>
</div>

## Data Verified

Merchant name, Case ID, disputed amount, transaction date, reason code (Visa/MC standard), evidence summary (Tracking #, IP, AVS match), final resolution status, date of resolution.

**Document Types:**
- **Chargeback Notification:** Initial alert to the merchant.
- **Dispute Response Summary:** The evidence pack sent to the bank.
- **Final Adjudication Letter:** Proving the outcome (Won/Lost).
- **Pre-Arbitration Notice:** For high-value escalations.

## Data Visible After Verification

Shows the issuer domain (`paypal.com`, `stripe.com`, `chase.com`) and case standing.

**Status Indications:**
- **Resolved - Won** — Merchant kept the funds.
- **Resolved - Lost** — Funds returned to the cardholder.
- **In-Review** — Evidence submitted; waiting for bank decision.
- **Arbitration Pending** — Escalated to the card network (Visa/MC).

## Second-Party Use

The **Merchant** (Business Owner) benefits from verification.

**Collateralized Lending:** Proving to a lender that a "Reserve Fund" or "Dispute Spike" is temporary and that most recent high-value cases have been "Verified Won." This protects the merchant's credit lines.

**Vendor Trust:** Proving to a supplier that a specific large order wasn't "Fraudulent" but was a verified, settled transaction, ensuring the supplier continues to ship goods.

## Third-Party Use

**Acquiring Banks / Processors**
**Risk Monitoring:** Processors can verify the outcome of disputes across different platforms to build a "Merchant Reputation" profile. Verified wins reduce the merchant's risk score.

**Business Buyers (M&A)**
**Due Diligence:** A buyer of an e-commerce brand needs to verify the "Chargeback Rate" claims. Live Verify allows them to scan random dispute letters to ensure they haven't been "Photoshopped" to hide a 5% fraud rate.

**Credit Card Networks (Visa / Mastercard)**
**Audit Compliance:** Verifying that the evidence submitted by the merchant matches the summary provided to the issuing bank.

## Verification Architecture

**The "Friendly Fraud" Problem**

- **Fabricated Resolutions:** A merchant editing a "Lost" letter to say "Won" to avoid being kicked off a payment platform for high fraud.
- **Evidence Tampering:** Altering a FedEx tracking number on the PDF summary to make it look like a package was delivered when it wasn't.
- **Ghost Cases:** Creating fake dispute notifications to justify "withholding" payments to sub-vendors or affiliates.

**Issuer Types** (First Party)

**Payment Processors:** (PayPal, Stripe, Adyen).
**Acquiring Banks:** (Chase, Wells Fargo, Barclays).
**Dispute Management Platforms:** (Chargebacks911, Chargehound).

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


## Competition vs. Processor Portals

| Feature | Live Verify | Processor Dashboard | Scanned PDF |
| :--- | :--- | :--- | :--- |
| **User Control** | **High.** Share one specific case proof. | **Low.** Giving portal access reveals *all* financial data. | **Medium.** |
| **Trust Anchor** | **Domain-Bound.** Bound to the Processor. | **System-Bound.** | **Zero.** Easily forged. |
| **Interoperability** | **Universal.** Works for any bank with a domain. | **Siloed.** Hard to aggregate across multiple processors. | **Universal.** |
| **Permanence** | **Snapshot.** Proves the state at resolution. | **Dynamic.** Data can shift or be archived. | **Vulnerable.** |

**Why Live Verify wins here:** Selective Disclosure. A merchant needs to prove they "Won the Big Dispute" to a lender without giving that lender a password to their entire Stripe account. Live Verify turns the **Adjudication Letter** into a portable, cryptographically trusted "Victory Token."

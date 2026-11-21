---
title: "Chargeback Documentation and Dispute Records"
category: "Banking & Payments"
volume: "Small"
retention: "3-7 years (dispute resolution)"
slug: "chargeback-documentation"
verificationMode: "clip"
tags: ["chargeback", "payment-dispute", "visa", "mastercard", "ecommerce-fraud", "merchant-protection"]
furtherDerivations: 1
---

## What is a Chargeback Adjudication?

When a customer disputes a credit card charge (a "Chargeback"), the merchant must provide evidence (like a FedEx receipt or an IP address) to prove the sale was legitimate.

The Adjudication Letter is the final verdict from the payment processor (like PayPal or Stripe) stating: "Dispute Won" or "Dispute Lost."

Merchants need these verified letters to prove to lenders and business partners that their "Fraud Rate" is low. Without verification, a merchant could easily fake a "Dispute Won" letter to hide that they are being victimized by massive amounts of fraud.

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 1px solid #ccc; background: #fff; padding: 0; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <div style="background: #003087; color: #fff; padding: 20px; display: flex; justify-content: space-between; align-items: center;">
    <div style="font-weight: bold; font-size: 1.2em;"><span verifiable-text="start" data-for="chargeback"></span>PAYPAL MERCHANT SERVICES</div>
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
      <span data-verify-line="chargeback">verify:paypal.com/disputes/v</span> <span verifiable-text="end" data-for="chargeback"></span>
    </div>
  </div>
</div>

## The Problem: Friendly Fraud

- **Fabricated Resolutions:** A merchant editing a "Lost" letter to say "Won" to avoid being kicked off a payment platform for high fraud.
- **Evidence Tampering:** Altering a FedEx tracking number on the PDF summary to make it look like a package was delivered when it wasn't.
- **Ghost Cases:** Creating fake dispute notifications to justify "withholding" payments to sub-vendors or affiliates.

## What Is Checked

Merchant name, Case ID, disputed amount, transaction date, reason code (Visa/MC standard), evidence summary (Tracking #, IP, AVS match), final resolution status, date of resolution.

**Document Types:**
- **Chargeback Notification:** Initial alert to the merchant.
- **Dispute Response Summary:** The evidence pack sent to the bank.
- **Final Adjudication Letter:** Proving the outcome (Won/Lost).
- **Pre-Arbitration Notice:** For high-value escalations.

## What the Checker Sees

Shows the issuer domain (`paypal.com`, `stripe.com`, `chase.com`) and case standing.

**Status Indications:**
- **Resolved - Won** — Merchant kept the funds.
- **Resolved - Lost** — Funds returned to the cardholder.
- **In-Review** — Evidence submitted; waiting for bank decision.
- **Arbitration Pending** — Escalated to the card network (Visa/MC).

## Who Holds It

The Merchant (Business Owner) benefits from verification.

**Collateralized Lending:** Proving to a lender that a "Reserve Fund" or "Dispute Spike" is temporary and that most recent high-value cases have been "Verified Won." This protects the merchant's credit lines.

**Vendor Trust:** Proving to a supplier that a specific large order wasn't "Fraudulent" but was a verified, settled transaction, ensuring the supplier continues to ship goods.

## Who Checks It

**Acquiring Banks / Processors**
**Risk Monitoring:** Processors can verify the outcome of disputes across different platforms to build a "Merchant Reputation" profile. Verified wins reduce the merchant's risk score.

**Business Buyers (M&A)**
**Due Diligence:** A buyer of an e-commerce brand needs to verify the "Chargeback Rate" claims. Live Verify allows them to scan random dispute letters to ensure they haven't been "Photoshopped" to hide a 5% fraud rate.

**Credit Card Networks (Visa / Mastercard)**
**Audit Compliance:** Verifying that the evidence submitted by the merchant matches the summary provided to the issuing bank.

## Who Issues It

**Issuer Types** (First Party)

**Payment Processors:** (PayPal, Stripe, Adyen).
**Acquiring Banks:** (Chase, Wells Fargo, Barclays).
**Dispute Management Platforms:** (Chargebacks911, Chargehound).

## Authority Chain

**Pattern:** Regulated

Visa processes payment chargeback disputes and documentation for card networks.

```
✓ disputes.visa.com/verify — Processes payment chargeback disputes and documentation
  ✓ fca.org.uk/register — Regulates UK payment service providers
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Where Each Fits: Live Verify and Processor Dashboards

Payment processors and acquirers give merchants an online dashboard where disputes are filed, tracked and resolved. That dashboard is the merchant's working record and remains the authority on each case. Live Verify answers a different question, whether an outcome letter the merchant has handed to someone else is genuine, and the two work side by side.

| | Processor dashboard | Live Verify on the dispute outcome letter | Unverified scanned PDF |
| :--- | :--- | :--- | :--- |
| **Who can check** | The merchant and anyone they give a login to. | Anyone the merchant hands the letter to: a lender, a new acquirer, an auditor. | Nobody; it can only be taken on trust. |
| **What the checker gets** | The complete, current view of every dispute on the account. | Confirmation that the processor issued this exact outcome for this case, as at the date of resolution. | A letter whose outcome or amount may have been edited. |
| **What the merchant shares** | Access to the whole account, including unrelated financial data. | Only the letter for the case in question. | Only the document they chose to hand over. |
| **Reach** | That processor's merchants; a merchant with several processors has several dashboards. | Global in principle: any processor or bank, in any country, that publishes hashes on its own domain. | Universal, but untrusted. |
| **Speed and cost** | Immediate for the merchant; included in the processing relationship. | A few seconds per check: one web lookup, with no fee to the standard. | Free and immediate. |
| **What it needs** | An account with that processor. | The processor to publish hashes, and Live Verify-aware software on the checker's device. No processor does this yet. | Nothing. |
| **Best suited to** | Managing disputes day to day. | Showing a third party the outcome of one case without opening the whole account. | Nothing where money depends on it. |

**Where each fits:** the processor's dashboard is the complete, current view of a merchant's disputes, and the merchant will keep working from it. Giving a lender or acquirer a login would expose everything else in the account. Live Verify lets the merchant hand over the outcome letter for one case, which the recipient can check against the processor's domain as it stood at resolution.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).

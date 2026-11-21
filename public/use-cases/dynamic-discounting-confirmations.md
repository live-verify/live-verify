---
title: "Dynamic Discounting Confirmations"
category: "Trade Finance"
volume: "Small"
retention: "3-7 years (payment disputes)"
slug: "dynamic-discounting-confirmations"
verificationMode: "clip"
tags: ["trade-finance", "dynamic-discounting", "early-payment", "supply-chain-finance", "accounts-payable", "fintech", "cash-flow"]
furtherDerivations: 1
---

## What is Dynamic Discounting?

If a small supplier (like a parts maker) sells $100,000 of goods to a big buyer (like Boeing), the buyer might wait 90 days to pay the bill.

**Dynamic Discounting** is a fintech "Deal." The buyer says: "If you give me a 1.5% discount ($1,500), I will pay you *today* instead of in 90 days."

Suppliers use these Early Payment Confirmations to prove their cash flow to local banks. Verified hashes prevent "Double Financing"—where a supplier sells the same invoice to a bank *and* takes the early discount from the buyer.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <span verifiable-text="start" data-for="discount"></span>
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;">C2FO DYNAMIC DISCOUNTING
Working Capital Verification
═══════════════════════════════════════════════════════════════════

                   EARLY PAYMENT CONFIRMATION

Market ID: C2-998877

Supplier: Apex Manufacturing, Ltd.
Buyer:    Global Retail Hub, Corp.

PAYMENT DETAILS
───────────────────────────────────────────────────────────────────
Invoice Total:                                        $ 100,000.00
Early Payment Discount:                     -$ 1,500.00 (1.5%)
───────────────────────────────────────────────────────────────────
Net Payment Amount:                                    $ 98,500.00

Payment Date:      March 15, 2026 (Net 5 Days)
Original Due Date: April 30, 2026 (Net 45 Days)

This confirmation is a verified extract of the C2FO market clearing.

</pre>
<span data-verify-line="discount">verify:c2fo.com/confirm/v</span> <span verifiable-text="end" data-for="discount"></span>
</div>

## The Problem: Double Counting Fraud

- **Double Financing:** Selling an invoice to a factoring company while *simultaneously* taking an early payment discount from the buyer.
- **Amount Tampering:** Editing a 1% discount to read 5% to hide internal accounting errors.
- **Date Alteration:** Changing the "Original Due Date" to hide that the company is taking early payments on debt that was already overdue.

## What Is Checked

Supplier name, Buyer name, Invoice number, Gross amount, Discount percentage (APR equivalent), Net payment amount, Target payment date, original due date, clearing platform ID.

**Document Types:**
- **Early Payment Confirmation:** The "Receipt" showing the trade.
- **Market Clearing Report:** Summary of all accepted discounts.
- **Supplier Cash-Flow Forecast:** Proving future liquidity based on verified early payments.

## What the Checker Sees

Shows the issuer domain (`c2fo.com`, `taulia.com`, `kyriba.com`) and transaction status.

**Status Indications:**
- **Cleared** — Discount accepted by both parties; funds released.
- **Pending Settlement** — Discount agreed; bank transfer in progress.
- **Rejected** — Insufficient liquidity or error; original terms apply.
- **Void** — Transaction cancelled due to invoice dispute.

## Who Holds It

The Supplier (Vendor) (second party) receives the early payment confirmation from the discounting platform (first party), keeps it, and may later hand it to third parties for various reasons, or never do so.

**Personal Record:** They have their own verified copy of the payment terms. Most of the time, the confirmation sits in their financial records—the verification value is latent, there *if needed*.

**Peace of Mind:** They can confirm at any time that the confirmation matches what the platform's system recorded and hasn't been altered.

**Future Optionality:** If a dispute arises about payment timing, discount rates, or double-financing allegations, they have cryptographic proof ready without needing to contact the platform.

## Who Checks It

The supplier (second party) may hand the verified document to various third parties:

**Lenders (Asset-Based Lenders)**
**Collateral Vetting:** Verifying that the AR (Accounts Receivable) listed on the balance sheet hasn't already been "Discounted" or "Factored." Live Verify ensures the lender isn't lending against 100% of an invoice that the supplier already agreed to take 98% for.

**Tax Authorities**
**Revenue Verification:** Ensuring the "Gross Revenue" and "Financing Costs" are properly categorized for corporate tax purposes.

**Supply Chain Auditors**
**Financial Health Monitoring:** Tracking the discount rates being accepted by suppliers. A sudden jump from 1% to 5% discount acceptance is a verified "Distress Signal."

## Who Issues It

**Issuer Types (First Party)**

- Dynamic Discounting Platforms (C2FO, Taulia, Tradeshift)
- ERP Systems (SAP, Oracle - hosting the discounting logic)
- Supply Chain Finance Banks

**Privacy Salt:** Required. Dynamic discounting confirmations often contain enumerable values—round dollar amounts ($50K, $100K, $500K), standard discount percentages (1%, 1.5%, 2%), and publicly known buyer-supplier relationships. A competitor could feasibly enumerate combinations to reverse-engineer a supplier's cash flow strategy and discount acceptance thresholds, gaining unfair market intelligence. Salt protects these sensitive financial strategies.

## Authority Chain

**Pattern:** Commercial

Dynamic discounting platforms facilitate early payment discounts between buyers and suppliers. Self-authorized by their role as intermediary hosts of the financing arrangements.

```
✓ discount.taulia.com/verify — Issues dynamic discounting confirmations and early payment offers
```

Commercial issuer — self-authorized. Trust rests on the issuer's domain reputation.

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Where Each Fits: Live Verify and ERP and Platform Dashboards

Dynamic discounting runs inside the buyer's ERP system, such as SAP, or on a discounting platform such as C2FO or Taulia, where buyer and supplier see each early-payment offer and acceptance. Those systems are the record. Live Verify answers a different question for a different person: whether a confirmation the supplier hands to its own bank, factor or auditor is one the platform issued. The two work side by side.

| | ERP or discounting platform dashboard | Live Verify on the early-payment confirmation | Unverified PDF |
| :--- | :--- | :--- | :--- |
| **Who can check** | The buyer, the supplier and the platform, with their logins. | Anyone handed the confirmation: the supplier's lender, a factor, an auditor, a tax authority. | Nobody; it can only be taken on trust. |
| **What the checker gets** | Live, complete data on invoices, offers and payments. | Confirmation that the platform issued this exact confirmation, with this invoice, discount and payment date, as at its date. | A confirmation whose terms may have been edited. |
| **What the supplier shares** | Nothing outside the platform; outsiders get exports at best. | Only the confirmation they chose to hand over. | Only the document they chose to hand over. |
| **Reach** | The buyer's and supplier's own accounts on that system. | Global in principle: any platform or bank, in any country, that publishes hashes on its own domain. | Anywhere, but untrusted. |
| **Speed and cost** | Fast for users; sharing with outsiders means exporting and sending data. | A few seconds per check: one web lookup, with no fee to the standard and no integration. | Free and immediate. |
| **What it needs** | An account on the system. | The platform to publish hashes, and Live Verify-aware software on the checker's device. No discounting platform does this yet. | Nothing. |
| **Best suited to** | Running the programme between buyer and supplier. | A lender or factor checking that an invoice has already been discounted. | Nothing where financing depends on it. |

**Where each fits:** inside the buyer's ERP or the discounting platform itself, the data is live and complete, and the buyer, supplier and platform should keep working there. A supplier's local bank, auditor or factor is outside that loop and will not be given access to another company's ERP. Live Verify lets such a third party confirm that the platform issued the confirmation the supplier handed over, with nothing to integrate on either side.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).

---
title: "Dynamic Discounting Confirmations"
category: "Trade Finance"
volume: "Small"
retention: "3-7 years (payment disputes)"
slug: "dynamic-discounting-confirmations"
tags: ["trade-finance", "dynamic-discounting", "early-payment", "supply-chain-finance", "accounts-payable", "fintech", "cash-flow"]
furtherDerivations: 1
---

## What is Dynamic Discounting?

If a small supplier (like a parts maker) sells $100,000 of goods to a big buyer (like Boeing), the buyer might wait 90 days to pay the bill.

**Dynamic Discounting** is a fintech "Deal." The buyer says: "If you give me a 1.5% discount ($1,500), I will pay you *today* instead of in 90 days."

Suppliers use these **Early Payment Confirmations** to prove their cash flow to local banks. Verified hashes prevent "Double Financing"—where a supplier sells the same invoice to a bank *and* takes the early discount from the buyer.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <span verifiable-text="start" data-for="discount">[</span>
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
<span data-verify-line="discount">verify:c2fo.com/confirm/v</span> <span verifiable-text="end" data-for="discount">]</span>
</div>

## Data Verified

Supplier name, Buyer name, Invoice number, Gross amount, Discount percentage (APR equivalent), Net payment amount, Target payment date, original due date, clearing platform ID.

**Document Types:**
- **Early Payment Confirmation:** The "Receipt" showing the trade.
- **Market Clearing Report:** Summary of all accepted discounts.
- **Supplier Cash-Flow Forecast:** Proving future liquidity based on verified early payments.

## Data Visible After Verification

Shows the issuer domain (`c2fo.com`, `taulia.com`, `kyriba.com`) and transaction status.

**Status Indications:**
- **Cleared** — Discount accepted by both parties; funds released.
- **Pending Settlement** — Discount agreed; bank transfer in progress.
- **Rejected** — Insufficient liquidity or error; original terms apply.
- **Void** — Transaction cancelled due to invoice dispute.

## Second-Party Use

The **Supplier (Vendor)** (second party) receives the early payment confirmation from the discounting platform (first party), **keeps it**, and may later hand it to third parties for various reasons, or never do so.

**Personal Record:** They have their own verified copy of the payment terms. Most of the time, the confirmation sits in their financial records—the verification value is latent, there *if needed*.

**Peace of Mind:** They can confirm at any time that the confirmation matches what the platform's system recorded and hasn't been altered.

**Future Optionality:** If a dispute arises about payment timing, discount rates, or double-financing allegations, they have cryptographic proof ready without needing to contact the platform.

## Third-Party Use

The supplier (second party) may hand the verified document to various third parties:

**Lenders (Asset-Based Lenders)**
**Collateral Vetting:** Verifying that the AR (Accounts Receivable) listed on the balance sheet hasn't already been "Discounted" or "Factored." Live Verify ensures the lender isn't lending against 100% of an invoice that the supplier already agreed to take 98% for.

**Tax Authorities**
**Revenue Verification:** Ensuring the "Gross Revenue" and "Financing Costs" are properly categorized for corporate tax purposes.

**Supply Chain Auditors**
**Financial Health Monitoring:** Tracking the discount rates being accepted by suppliers. A sudden jump from 1% to 5% discount acceptance is a verified "Distress Signal."

## Verification Architecture

**The "Double Counting" Fraud Problem**

- **Double Financing:** Selling an invoice to a factoring company while *simultaneously* taking an early payment discount from the buyer.
- **Amount Tampering:** Editing a 1% discount to read 5% to hide internal accounting errors.
- **Date Alteration:** Changing the "Original Due Date" to hide that the company is taking early payments on debt that was already overdue.

**Issuer Types (First Party)**

- Dynamic Discounting Platforms (C2FO, Taulia, Tradeshift)
- ERP Systems (SAP, Oracle - hosting the discounting logic)
- Supply Chain Finance Banks

**Privacy Salt:** Required. Dynamic discounting confirmations often contain enumerable values—round dollar amounts ($50K, $100K, $500K), standard discount percentages (1%, 1.5%, 2%), and publicly known buyer-supplier relationships. A competitor could feasibly enumerate combinations to reverse-engineer a supplier's cash flow strategy and discount acceptance thresholds, gaining unfair market intelligence. Salt protects these sensitive financial strategies.

## Jurisdictional Witnessing

A jurisdiction may require discounting platforms to retain a **witnessing firm** for regulatory compliance. The witnessing firm:

- Receives all hashes from the platform, and any subsequent changes to the transaction as they happen—which may manifest as a new hash, a status change (cleared, voided), or even a 404 (record deleted)
- Receives structured content/metadata (invoice amounts, discount percentages, payment dates, platform IDs)
- Does **NOT** receive plaintext (supplier names, buyer names, specific invoice details)
- Provides an immutable, timestamped audit trail—available to the jurisdiction on demand, to suppliers/third parties during disputes, or as expert witness testimony in legal proceedings

This provides:
- **Non-repudiation:** Platform cannot deny processing the discount transaction
- **Timestamp proof:** Confirmation hash existed at a specific time (critical for double-financing disputes)
- **Regulatory audit:** Banking regulators can inspect the witness ledger for market manipulation
- **Resilience:** Verification works even if platform's systems go down or the company exits the market

**Public Blockchain (Non-Party)**

Witnessing firms may periodically commit rollups to an inexpensive public blockchain, providing an ultimate immutability guarantee. The blockchain is a "non-party"—infrastructure, not a participant in the transaction. This creates multiple verification paths:

1. **Platform domain** — Direct check against the issuer
2. **Witnessing firm** — Independent confirmation with timestamp
3. **Public blockchain** — Decentralized trust anchor via rollup inclusion

## Competition vs. ERP Logins

| Feature | Live Verify | ERP Dashboard (SAP) | Scanned PDF Confirmation |
| :--- | :--- | :--- | :--- |
| **Trust Anchor** | **Domain-Bound.** Bound to the Platform. | **System-Bound.** | **Zero.** Easily forged. |
| **User Access** | **Universal.** Any local lender can verify. | **Restricted.** Lenders never get access to a supplier's internal SAP. | **Instant.** |
| **Integrity** | **Binds FX/Rates.** Protects the % discount. | **High.** | **Vulnerable.** |
| **Speed** | **Instant.** 5-second scan. | **Slow.** Requires manual data export and upload. | **Instant.** |

**Why Live Verify wins here:** The "Small Bank" Problem. A small parts manufacturer in Ohio uses C2FO to get early payments from Boeing. Their local hometown bank wants to lend them money based on those Boeing receivables. The local bank doesn't have an integration with C2FO or Boeing's SAP. Live Verify turns the **Confirmation PDF** into a trusted digital artifact the local bank can rely on.

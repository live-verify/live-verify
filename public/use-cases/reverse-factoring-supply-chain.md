---
title: "Reverse Factoring (Supply Chain Finance) Documentation"
category: "Trade Finance"
volume: "Small"
retention: "7-10 years (audit trail / financial cycle)"
slug: "reverse-factoring-supply-chain"
tags: ["supply-chain-finance", "reverse-factoring", "trade-finance", "invoice-financing", "ar-audit", "corporate-treasury", "banking-fraud", "supplier-payment"]
furtherDerivations: 1
---

## What is Reverse Factoring?

In high-volume supply chains, **Reverse Factoring** (or Supply Chain Finance) allows a supplier to get paid early by a bank, based on the credit rating of their massive buyer (e.g., Apple, Walmart, or Boeing). The bank pays the supplier $98 today for a $100 invoice, and the buyer pays the bank $100 in 60 days.

These documents are the "Trade Collateral." Fraud is high-stakes: a dishonest supplier might create "Phantom Invoices" using a buyer's branding to trick a bank into releasing multimillion-dollar early payments. Similarly, they might "double-factor" the same invoice at two different banks. Verified hashes bind the **Invoice ID, Approved Amount, and Payment Date** to the funding bank's or the buyer's domain (e.g., `citidirect.com` or `hsbc.com`).

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="factor">[</span>CITI SUPPLY CHAIN FINANCE
Trade & Working Capital Solutions
═══════════════════════════════════════════════════════════════════

APPROVAL ADVICE                              Batch: SCF-2026-992288

Buyer:        GOLIATH AEROSPACE CORP.   Total Approved: $ 1,250,000.00
Supplier:     PRECISION PARTS LTD.      Early Pay Date: 15 MAR 2026
Supplier ID:  #992288-XJ                Maturity Date:  15 MAY 2026

VERIFIED APPROVED INVOICES
───────────────────────────────────────────────────────────────────
INV-9922-A (Turbine Parts)                             $ 750,000.00
INV-9922-B (Control Systems)                           $ 500,000.00
───────────────────────────────────────────────────────────────────
Total Early Payment (Verified):                      $ 1,225,000.00
                            (Total minus 2.0% Discounting Charge)

This approval advice is a verified extract of the CitiDirect SCF
portal. Any alteration of invoice amounts or dates renders this
financing void.

<span data-verify-line="factor">verify:citi.com/scf/v</span> <span verifiable-text="end" data-for="factor">]</span></pre>
</div>

## Data Verified

Batch ID, funding bank name, buyer name, supplier name, itemized invoice numbers, gross invoice amounts, early payment date, maturity date (when buyer pays), discount rate (APR/Fees), net payout amount, bank officer ID.

**Document Types:**
- **Approval Advice:** Proving the buyer has "Ok'd" the invoices for payment.
- **Supplier Financing Agreement:** The overarching legal framework.
- **Assignment of Proceeds:** (Linked hash) moving the legal debt to the bank.
- **Payoff Letter:** Proof that the buyer has settled the debt with the bank.

## Data Visible After Verification

Shows the issuer domain (`citi.com`, `jpmorgan.com`, `taulia.com`) and the financing standing.

**Status Indications:**
- **Funded / Paid** — Cash has been disbursed to the supplier.
- **Approved / Pending** — Buyer has verified the goods; bank is awaiting drawdown.
- **Matured / Settled** — **ALERT:** The buyer has already paid the bank; this paper is historic.
- **In Dispute** — **CRITICAL:** The buyer has flagged the invoices for "Quality Issues."

## Second-Party Use

The **Supplier (The Payee)** benefits from verification.

**Working Capital Speed:** When negotiating a "Material Purchase" from a raw-goods vendor (e.g., steel or plastic), the supplier shows the verified "Citi Approval" hash. The vendor can instantly see **"VERIFIED: $1.25M"** from a top-tier bank, giving them the confidence to ship materials on credit because they know the supplier's cash is coming in 48 hours.

**Audit Compliance:** Proving to their own shareholders and auditors that their "Factored Income" is based on legitimate, buyer-approved invoices, removing the risk of "Revenue Padding" accusations.

## Third-Party Use

**Bank Auditors / Regulators**
**Systemic Risk Audit:** Verifying that the bank's "Trade Finance" portfolio is backed by authentic, buyer-verified assets. Live Verify ensures the bank isn't funding "Phantom Invoices" created by a collusive supplier and employee.

**Credit Rating Agencies (Moody's / S&P)**
**Liquidity Analysis:** Verifying the "Financing Pipeline" of a corporate buyer to ensure their "Accounts Payable" are accurately reported and haven't been hidden using off-balance-sheet factoring.

**Secondary Debt Investors**
**Portfolio Due Diligence:** Before buying a "Slice" of a bank's supply chain debt, the investor scans random hashes. Verification ensures the maturity dates and amounts match the original digital approvals.

## Verification Architecture

**The "Phantom Invoice" Fraud Problem**

- **Double-Financing:** Selling the same verified invoice to Citi and then secretly trying to sell it to HSBC.
- **Amount Inflation:** Editing an approved "$100,000" advice to read "$1,000,000" to get a larger advance.
- **Return Hiding:** Getting paid early for an invoice but then secretly accepting a "Goods Return" from the buyer, leaving the bank with worthless collateral.

**Issuer Types** (First Party)

**Global Transaction Banks.**
**Supply Chain Finance Platforms (e.g., Taulia, Greensill-successors).**
**Corporate Treasury Portals.**

**Privacy Salt:** Highly Critical. Corporate trade volumes and supplier lists are extremely sensitive "Trade Secrets." The hash must be salted and access restricted to authorized financial institutions.

## Rationale

Supply Chain Finance is the "Oil" of global manufacturing. By turning approval advice into verifiable digital bridges, we protect the banks from multi-billion dollar fraud and ensure that capital flows to legitimate suppliers with cryptographic certainty.

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

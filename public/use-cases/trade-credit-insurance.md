---
title: "Trade Credit Insurance (TCI) Policies"
category: "Specialty Insurance"
volume: "Medium"
retention: "Policy term + 7 years (audit / claims lifecycle)"
slug: "trade-credit-insurance"
tags: ["trade-credit", "ar-insurance", "credit-limit", "euler-hermes", "atradius", "coface", "invoice-financing", "insolvency-protection", "b2b-fraud"]
furtherDerivations: 1
---

## What is Trade Credit Insurance?

In the B2B world, most sales happen on "Net-30" or "Net-60" terms—meaning the buyer gets the goods today but pays later. **Trade Credit Insurance (TCI)** protects the seller if the buyer goes bankrupt or simply refuses to pay. A **Credit Limit Notice** is the formal document where the insurer (e.g., Euler Hermes or Coface) approves a specific dollar amount of risk for a specific buyer.

These documents are the "Green Light" for global trade. Fraud is high-stakes: a dishonest buyer might create a fake "Atradius" limit-approval letter for $1 million to trick a supplier into shipping a massive load of electronics on credit. Similarly, a seller might "edit" an old approval to hide that the insurer has recently revoked coverage for a failing customer. Verified hashes bind the **Approved Credit Limit, Buyer Tax ID, and Expiration Date** to the insurer's domain (e.g., `allianz-trade.com` or `coface.com`).

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="credit">[</span>ALLIANZ TRADE
Credit Risk Management & TCI
═══════════════════════════════════════════════════════════════════

              CREDIT LIMIT APPROVAL NOTICE

Insured Policyholder:                       Notice ID: AZ-2026-8844
  GLOBAL COMPONENTS LTD.                    Date:      15 MAR 2026
Policy #: 99228877-TCI

BUYER INFORMATION
───────────────────────────────────────────────────────────────────
Buyer Name:      NORTH AMERICAN RETAIL CORP.
Buyer ID (DUNS): 99-887-7665

Approved Credit Limit:                             $ 1,250,000.00
Payment Terms:                                          NET 60 DAYS

Coverage is subject to the terms and conditions of the Master
Policy. Verification confirms that this specific limit is
currently authorized in the Allianz Trade system.

<span data-verify-line="credit">verify:allianz-trade.com/v</span> <span verifiable-text="end" data-for="credit">]</span></pre>
</div>

## Data Verified

Policy number, insurer name, insured name, buyer name, buyer tax ID (DUNS/EIN), approved credit limit amount, maximum payment terms (e.g., 60 days), effective date, notice expiration date, currency, credit analyst ID.

**Document Types:**
- **Credit Limit Notice:** The approval for a specific customer.
- **TCI Policy Schedule:** The overarching contract.
- **Notice of Threat of Loss:** (Linked hash) reporting a late payment.
- **Claims Settlement Advice:** Proof of payout for a bad debt.

## Data Visible After Verification

Shows the issuer domain (`allianz-trade.com`, `atradius.com`, `coface.com`) and the risk standing.

**Status Indications:**
- **Active / Approved** — The credit limit is currently in force and backed by the insurer.
- **Revoked / Zero-Limit** — **CRITICAL:** The insurer has withdrawn coverage for this buyer (indicates high insolvency risk).
- **Reduced** — **ALERT:** The approved amount has been lowered since the paper was printed.
- **Lapsed** — **ALERT:** The annual policy has expired; no new shipments are covered.

## Second-Party Use

The **Supplier (The Insured)** benefits from verification.

**Shipping Confidence:** Before loading a $250,000 container, the warehouse manager scans the "Credit Limit" hash. "Verified by Allianz" ensures them that the sale is 90% insured, allowing them to release the goods without waiting for a manual email from the finance department.

**Bank Financing:** Suppliers often borrow against their "Insured Accounts Receivable." By providing verified TCI hashes to their bank, they can prove that their "Collateral" is high-quality and backed by a top-tier insurer, potentially lowering their borrowing costs.

## Third-Party Use

**Invoice Factoring Firms / Banks**
**Risk Mitigation:** Before "Buying" an invoice from a supplier, the bank scans the verified TCI limit. Verification ensures that the invoice is actually covered by insurance, protecting the bank from a loss if the buyer fails to pay.

**Financial Auditors**
**Bad-Debt Reserve Audit:** Verifying that a company's "Insured Receivables" are actually backed by active, verified credit limits, ensuring that their balance sheet accurately reflects their risk exposure.

**Secondary Re-Insurers**
**Portfolio Vetting:** Verifying the "Granular Risk" of thousands of small credit limits within a large TCI portfolio before providing treaty re-insurance.

## Verification Architecture

**The "Phantom Limit" Fraud Problem**

- **Limit Inflation:** Changing a "$10,000" approval to "$1,000,000" on a PDF to trick a supplier into shipping a massive load of goods.
- **Status Masking:** Hiding a "Revocation Notice" from an insurer to continue shipping to a failing subsidiary.
- **DUNS Swapping:** Using an approval for a "Healthy Company" to cover for a "Zombie Company" with a similar name.

**Issuer Types** (First Party)

**Global Credit Insurance Groups.**
**National Export Credit Agencies (ECAs).**
**Specialized Credit Management Platforms.**

**Privacy Salt:** Highly Critical. Individual buyer names and their specific "Credit Limits" are sensitive business intelligence. The hash must be salted and access restricted to authorized trading partners.

## Rationale

Trade credit is the "Fuel of the B2B Economy." By turning static limit notices into verifiable digital bridges, we protect the supply chain from the "Chain Reaction" of insolvencies and ensure that "Credit Power" is backed by the digital truth of the insurer.

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

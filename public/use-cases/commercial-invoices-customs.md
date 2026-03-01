---
title: "Commercial Invoices for Customs"
category: "Customs & Trade Compliance"
volume: "Very Large"
retention: "7-10 years (customs audit cycle)"
slug: "commercial-invoices-customs"
tags: ["customs", "export-import", "commercial-invoice", "trade-compliance", "hs-codes", "tariff-valuation", "duty-evasion-prevention"]
furtherDerivations: 1
---

## What is a Customs Invoice?

When goods cross an international border, the most important document is the **Commercial Invoice**. It is the formal bill from the seller to the buyer, but it also acts as the primary "Declaration of Value" for the government.

Customs officers use this invoice to decide:
1.  **HS Classification:** What is the product? (e.g., "Integrated Circuit").
2.  **Valuation:** What is it worth? (e.g., "$50,000").
3.  **Duty/Tax:** How much tax is owed? (e.g., 5% of value).

**"Under-valuation"** is a massive global trade crime. Shady importers often have the exporter send two invoices: a "Real" one for payment, and a "Fake" one with a 90% discount to show Customs. This allows them to evade millions in import duties. **"Tariff Engineering"** is another risk, where the HS code is edited on the paper to a low-duty category. Verified hashes bind the **Exporters' ledger value and the HS Code** to the manufacturer's or the trade platform's domain.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="invoice">[</span>COMMERCIAL INVOICE
═══════════════════════════════════════════════════════════════════

Invoice #:  INV-998877-XK
Date:       March 15, 2026

EXPORTER (SELLER):              IMPORTER (BUYER):
Shenzhen Tech Components, Ltd.  EuroLink Distribution, AG
Building 4, High-Tech Park      Industriestrasse 42
Shenzhen, GD, China             Zurich, CH-8001, Switzerland

Description of Goods                      HS Code     Value (USD)
───────────────────────────────────────────────────────────────────
Solid State Drives (512GB Enterprise)     8471.70    $ 45,000.00
Microcontrollers (ARM Cortex-M4)          8542.31    $ 12,500.00
───────────────────────────────────────────────────────────────────
TOTAL INVOICE VALUE:                                 $ 57,500.00

Incoterms:         CIP Zurich (2020)
Country of Origin: CHINA
Container:         MSKU-992288-0

<span data-verify-line="invoice">verify:sz-tech.com/invoices/v</span> <span verifiable-text="end" data-for="invoice">]</span></pre>
</div>

## Data Verified

Exporter/Seller name, Importer/Buyer name, Invoice number, Line-item descriptions, HS Codes, Unit/Total values, Currency (e.g., USD), Incoterms, Country of Origin, Date of issuance, Container/Reference number.

**Document Types:**
- **Commercial Invoice:** The primary document for customs and payment.
- **Pro Forma Invoice:** For pre-shipment clearance or deposits.
- **Consular Invoice:** Verified by a destination embassy.
- **Credit Memo:** (Linked hash) proving a reduction in value for damaged goods.

## Data Visible After Verification

Shows the issuer domain (the Exporter or their ERP system) and current invoice status.

**Status Indications:**
- **Verified** — Content matches the exporter's official accounts receivable.
- **Paid** — Funds have been received (anti-money laundering proof).
- **Cancelled** — **ALERT:** Transaction voided; invoice is invalid for customs entry.
- **Amended** — A revised invoice exists (linked hash to latest price correction).

## Second-Party Use

The **Importer (Buyer)** benefits from verification.

**Customs Defense:** Proving to Swiss or US Customs that the $57,500 value isn't a "Fake Low Value" to evade taxes. A verified invoice from the exporter's domain makes it impossible for Customs to accuse the importer of "Valuation Fraud" without challenging the exporter directly.

**Trade Financing:** Providing a verified invoice to a bank to secure a Letter of Credit or to authorize a large international wire transfer.

## Third-Party Use

**Customs Authorities (CBP / HMRC / Zoll)**
**Enforcement:** Customs sees millions of invoices daily. Live Verify allows an officer to verify the invoice against the exporter's domain in 5 seconds, catching "Double Invoicing" where high-tariff goods are mislabeled or under-valued on the paper document.

**Lenders and Factoring Firms**
**Asset Verification:** Verifying the "Account Receivable" value of an invoice before lending against it, stopping "Invoicing Fraud" in trade finance.

**Tax Auditors**
**VAT / GST Reconciliation:** Ensuring that the "Export Value" reported by the shipper matches the "Import Value" reported by the buyer across international borders.

## Verification Architecture

**The "Double Invoice" Fraud Problem**

- **Value Stripping:** Editing a $100,000 invoice to read $10,000 to save $20,000 in duties.
- **Code Engineering:** Changing the HS code for "Luxury Goods" to "Basic Materials."
- **Phantom Invoices:** Creating a fake invoice to justify an international wire used for money laundering.

**Issuer Types** (First Party)

**Exporting Manufacturers:** (Primary source of truth).
**Customs Brokers:** (Managing verification for their clients).
**Trade Platforms:** (e.g., Flexport, Tradeshift, SAP Ariba).

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


## Competition vs. Customs Single Windows (ACE)

| Feature | Live Verify | ACE Portal (Gov) | Private EDI |
| :--- | :--- | :--- | :--- |
| **Trust Anchor** | **Domain-Bound.** Trust the Exporter. | **Gov-Bound.** Trust the filing. | **Network-Bound.** |
| **Integrity** | **Binds line items.** Protects prices. | **Data-Only.** Doesn't protect paper. | **High.** |
| **User Access** | **Universal.** Any trucker/bank can verify. | **Restricted.** Requires Gov credentials. | **Siloed.** |
| **Freshness** | **Real-time.** Shows "Cancelled" status. | **Laggy.** Updates take 24-48 hours. | **Live.** |

**Why Live Verify wins here:** The "Source of Truth." Government databases only know what was *filed*. If the importer files a fake document, the government database reflects the fake. Live Verify links the verifier back to the **Exporter's accounting ledger**, ensuring the data matches the actual financial transaction.
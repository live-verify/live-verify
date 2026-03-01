---
title: "Purchase Orders and Delivery Notes"
category: "Business & Commerce"
volume: "Large"
retention: "Fiscal year + 7 years (tax/audit requirements)"
slug: "purchase-orders-delivery-notes"
tags: ["procurement", "supply-chain", "purchase-order", "delivery-note", "grn", "invoice-factoring", "three-way-match", "business-fraud"]
furtherDerivations: 1
---

## What are Purchase Orders and Delivery Notes?

In B2B commerce, the **Purchase Order (PO)** is the official offer to buy, and the **Delivery Note** (or Packing Slip) is the proof that the offer was fulfilled. Together with the invoice, they form the "Three-Way Match" required for corporate payments.

These documents are high-value targets for **Invoice Factoring Fraud**. A dishonest supplier might create a fake PO from a reputable company (like Apple or Walmart) to get a multimillion-dollar "Advance" from a bank. Similarly, a buyer might "alter" a delivery note to claim they received fewer items than were actually shipped. Verified hashes bind the **Order IDs, Quantities, and Unit Prices** to the issuer's domain (e.g., `amazon.com` or `boeing.com`).

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="po">[</span>ACME MANUFACTURING CORP.
Procurement Office - 123 Factory Lane
PURCHASE ORDER                                      # PO-2026-992288
═══════════════════════════════════════════════════════════════════

Vendor:             GLOBAL COMPONENTS LTD.
                    42 TECH PARK, SHENZHEN, CN

Ship To:            ACME CENTRAL WAREHOUSE
                    DOCK 4, SPRINGFIELD, USA

Item Description                      Qty    Unit Price        Total
───────────────────────────────────────────────────────────────────
Titanium Fasteners - Grade 5          50     $ 120.00    $ 6,000.00
High-Pressure Seals (Spec #992)      200     $  45.50    $ 9,100.00
───────────────────────────────────────────────────────────────────
TOTAL ORDER VALUE (USD):                              $ 15,100.00

This PO is a legally binding offer once accepted.

<span data-verify-line="po">verify:acme-mfg.com/procure/v</span> <span verifiable-text="end" data-for="po">]</span></pre>
</div>

## Data Verified

PO/Order number, buyer name, vendor name, item descriptions (SKUs), quantities, unit prices, total order value, ship-to address, delivery date, authorization signature ID.

**Document Types:**
- **Purchase Order (PO):** The initiating contract.
- **Delivery Note / Packing Slip:** Accompanies the physical goods.
- **Goods Received Note (GRN):** Signed by the buyer upon receipt.
- **Pro-Forma Invoice:** A preliminary bill used for customs/financing.

## Data Visible After Verification

Shows the issuer domain (`acme-mfg.com`, `apple.com`, `ge.com`) and the order standing.

**Status Indications:**
- **Open / Authorized** — Order is valid and awaiting fulfillment.
- **Partially Received** — Some items have been delivered and verified.
- **Closed / Fulfilled** — Order is completed; no further deliveries allowed.
- **Cancelled** — **ALERT:** The buyer has revoked this order.

## Second-Party Use

The **Vendor (Seller)** benefits from verification.

**Production Confidence:** Before ordering $50,000 in raw materials to fulfill a big order, the vendor scans the buyer's PO. "Verified by Acme Corp" ensures they aren't working on a "Phantom Order" created by a rogue employee or a scammer.

**Speed of Payment:** By attaching a verified "Delivery Note" hash to their invoice, the vendor allows the buyer's system to perform an instant "Three-Way Match," reducing the payment cycle from 60 days to 5 days.

## Third-Party Use

**Banks and Factoring Firms**
**Financing Security:** A vendor asks for a loan against a $1M Purchase Order. The bank scans the PO. If the hash returns **"OPEN - ISSUED BY FORTUNE 500 CO,"** they can release the funds immediately. This eliminates "Fake Invoice" fraud, which costs the industry billions.

**External Auditors**
**Inventory Audit:** During a year-end audit, the accountant scans a random sample of "Goods Received Notes." Live Verify ensures the company isn't "Padding" its inventory with fake delivery paperwork.

**Customs and Tax Authorities (VAT/GST)**
**Trade Integrity:** Verifying that the value stated on the "Delivery Note" matches the price authorized on the "Purchase Order," preventing "Under-Invoicing" to evade import duties.

## Verification Architecture

**The "Paper Profit" Fraud Problem**

- **Quantity Inflation:** Changing "10 units" to "100 units" on a packing slip to get paid for goods never shipped.
- **Price Padding:** Editing a PO to show a higher price than what was agreed.
- **Ghost Orders:** Creating a fake PO from a real company to use as collateral for a bank loan.

**Issuer Types** (First Party)

**Corporate Procurement Portals (ERP).**
**EDI Gateways.**
**Government Purchasing Agencies.**

**Privacy Salt:** High. Corporate trade volumes and pricing are highly sensitive "Trade Secrets." The hash must be salted to prevent competitors from mapping a company's supply chain or pricing strategy.

## Rationale

B2B commerce relies on "Document Chains." By turning each link in the chain (PO → Delivery → Invoice) into a verifiable digital bridge, we eliminate the friction and fraud that currently plague global supply chains.

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

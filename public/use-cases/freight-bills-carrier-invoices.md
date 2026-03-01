---
title: "Freight Bills and Carrier Invoices"
category: "Chain of Custody & Logistics"
volume: "Large"
retention: "7-10 years (payment/audit)"
slug: "freight-bills-carrier-invoices"
tags: ["logistics", "transportation", "freight-bill", "carrier-invoice", "accounts-payable", "audit-trail", "supply-chain-finance"]
furtherDerivations: 1
---

## What is a Freight Bill?

A **Freight Bill** is the invoice from a trucking company to a shipper. It's the bill for moving goods from point A to point B.

It isn't just about the price; it records:
1.  **Fuel Surcharges:** Extra money for gas.
2.  **Detention Fees:** Penalties for making the driver wait too long.
3.  **The Proof:** Linking the bill to the original Bill of Lading.

"Logistics Phishing" is a billion-dollar crime. Hackers take over a trucker's email and send "Updated Invoices" with a different bank account. Verified hashes prevent this by linking the invoice to the carrier's **official domain**, ensuring the money goes to the real driver.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #000; background: #fff; padding: 0; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
  <div style="padding: 20px; background: #fff;">
    <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="freight-inv">[</span>SCHNEIDER NATIONAL                          Invoice #: INV-998877-SN
                                             Date: 15 MAR 2026
═══════════════════════════════════════════════════════════════════
Shipper:    Acme Manufacturing
Consignee:  Global Distribution Center
B/L Number: MAE-442211

Charge Description                                         Amount
───────────────────────────────────────────────────────────────────
Linehaul Freight (500 Miles)                           $ 1,250.00
Fuel Surcharge (FSC)                                   $   312.50
Detention Fee (2 Hours)                                $   150.00
───────────────────────────────────────────────────────────────────
TOTAL AMOUNT DUE:                                      $ 1,712.50

Payment Terms: Net 30 Days. Remit to: Wells Fargo Lockbox #99228.

<span data-verify-line="freight-inv">verify:schneider.com/invoices/v</span> <span verifiable-text="end" data-for="freight-inv">]</span></pre>
  </div>
</div>

## Data Verified

Invoice number, Carrier name, Shipper name, Bill of Lading (B/L) reference, total freight charge, line-item breakdown (Linehaul, Fuel, Accessorials), payment terms, date of issuance, delivery confirmation link.

**Document Types:**
- **Freight Bill:** The official demand for payment.
- **Carrier Invoice:** (Often used interchangeably with Freight Bill).
- **Pro-Forma Freight Estimate:** For pre-shipment budgeting.
- **Supplemental Invoice:** For fees found after delivery (e.g., re-weighing).

## Data Visible After Verification

Shows the issuer domain (`schneider.com`, `swifttrans.com`, `dhl.com`) and invoice status.

**Status Indications:**
- **Outstanding** — Invoice is valid and awaiting payment.
- **Paid** — Funds have been received and applied to the ledger.
- **In-Dispute** — Customer has challenged a fee (e.g., detention charge).
- **Amended** — Replaced by a corrected version (e.g., fuel surcharge adjustment).

## Second-Party Use

The **Shipper (Customer)** benefits from verification.

**Audit Compliance:** Proving to their internal finance auditors that the $1,712 freight payment wasn't a "Fake Invoice" from a spoofed email. A verified hash from the carrier's domain removes the #1 risk in Logistics Accounts Payable: **Fraudulent Change of Bank Details.**

**Dispute Resolution:** If the carrier claims the bill is $2,000 but the verified invoice says $1,712, the shipper has cryptographically solid proof of the original agreed amount.

## Third-Party Use

**Freight Audit & Payment (FAP) Firms**
**Automated Vetting:** FAP firms (e.g., Cass Information Systems, U.S. Bank) process millions of invoices. Live Verify allows them to instantly verify carrier authenticity without manual "Carrier Onboarding" or phone verification for every new small trucker.

**Factoring Companies**
**Invoice Financing:** Banks that buy carrier invoices (factoring) verify the freight bill hash to ensure the shipment is legitimate and the amount hasn't been "Padded" before they advance cash to the trucker.

**Tax Authorities**
**VAT / GST Reconciliation:** Ensuring that the tax deductions claimed for freight expenses match the verified revenue reported by the carriers.

## Verification Architecture

**The "Logistics Phishing" Fraud Problem**

- **Business Email Compromise (BEC):** Hackers taking over a trucking company's email and sending "Updated Invoices" with a different bank account. Live Verify prevents this by linking the paper to the carrier's *domain*, not an email account.
- **Detention Fee Padding:** Shady drivers adding a "2-hour wait" fee ($150) to the paper invoice that wasn't authorized in the central system.
- **Ghost Invoices:** Creating a fake invoice for a shipment that was never actually picked up or delivered.

**Issuer Types** (First Party)

**Asset-Based Carriers:** (Schneider, SwiftTrans, Old Dominion).
**3PL Brokers:** (C.H. Robinson, TQL).
**Supply Chain Platforms:** (e.g., Project44, FourKites).

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


## Competition vs. EDI (Electronic Data Interchange)

| Feature | Live Verify | EDI 210 (Invoicing) | Scanned PDF Invoice |
| :--- | :--- | :--- | :--- |
| **User Access** | **Universal.** Any small shipper/auditor. | **Restricted.** Requires heavy IT setup and VAN fees. | **Instant.** |
| **Trust Anchor** | **Domain-Bound.** Bound to the Carrier. | **System-Bound.** | **Zero.** Easily forged. |
| **Interoperability** | **High.** Works for any trucker with a URL. | **Low.** Small truckers don't use EDI. | **Universal.** |
| **Integrity** | **Binds Line Items.** Protects the FSC. | **Data-Only.** | **Vulnerable.** |

**Why Live Verify wins here:** The "Long Tail" of Trucking. While the top 100 carriers use EDI, there are 500,000 small trucking companies in the USA who only use PDF invoices. Live Verify turns those **PDFs and Paper Bills** into cryptographically trusted digital artifacts, bringing "EDI-level" trust to the entire industry without the "EDI-level" cost.

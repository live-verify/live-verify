---
title: "Proof of Delivery (POD) and Delivery Receipts"
category: "Chain of Custody & Logistics"
volume: "Very Large"
retention: "Delivery + 3-7 years (statute of limitations)"
slug: "proof-of-delivery-pod"
tags: ["logistics", "shipping", "pod", "delivery-receipt", "supply-chain", "dispute-resolution", "freight-fraud"]
furtherDerivations: 1
---

## What is a Proof of Delivery (POD)?

In the logistics industry, the **Proof of Delivery (POD)** is the legal evidence that a shipment was successfully handed over to the recipient. It acts as the "Off-Ramp" for liability: once the POD is signed, the carrier is typically no longer responsible for the goods.

Fraud is rampant in high-value shipping (electronics, pharmaceuticals). Dishonest receivers may claim **"Goods Never Received"** despite signing for them, or dishonest drivers may forge a signature to hide a theft or a late delivery. Verified hashes bind the **Tracking Number, Timestamp, and Recipient Name** to the carrier's domain, creating an indisputable audit trail.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="pod">[</span>DHL EXPRESS
DELIVERY RECEIPT - Official Record of Handoff
═══════════════════════════════════════════════════════════════════

Waybill Number:     JD-9922-8877-66
Delivery Date/Time: 15 MAR 2026 - 14:22 GMT

Consignee:          GLOBAL TECH SOLUTIONS, INC.
Address:            42 Innovation Way, London, UK

Items                              Qty              Status
───────────────────────────────────────────────────────────────────
Network Server Rack - 4U           3                INTACT

Signed By:          Sarah Jenkins
                    Security Supervisor (Emp #992)

<span data-verify-line="pod">verify:dhl.com/pod/v</span> <span verifiable-text="end" data-for="pod">]</span></pre>
</div>

## Data Verified

Waybill/Tracking number, carrier ID, consignee name, delivery address, quantity of items, condition status (Intact/Damaged), recipient signature (via hash), delivery photo (via hash), GPS coordinates of handoff, driver ID.

**Document Types:**
- **Electronic POD (ePOD):** Generated on the driver's handheld device.
- **Paper Delivery Receipt:** The traditional "Carbon Copy" signed at the dock.
- **Door-Drop Photo Proof:** For residential deliveries without signature.

## Data Visible After Verification

Shows the issuer domain (`dhl.com`, `fedex.com`, `maersk.com`) and the delivery standing.

**Status Indications:**
- **Delivered** — Goods successfully handed over and signed for.
- **Refused** — Recipient rejected the shipment (e.g., due to damage).
- **Returned** — Goods back in carrier possession.
- **Contested** — **ALERT:** Recipient has filed a claim of non-delivery.

## Second-Party Use

The **Consignee (Receiver)** benefits from verification.

**Inventory Integrity:** A warehouse manager receiving 500 pallets can scan the driver's POD to ensure the "Quantity Received" digitally recorded matches what is on the paper before the driver leaves the site.

**Payment Authorization:** Accounts Payable departments use verified PODs as the "Trigger" to pay vendor invoices. A verified hash removes the 3-day delay of waiting for a scanned paper copy to arrive in the system.

## Third-Party Use

**Shippers (The Sender)**
**Revenue Recognition:** Under accounting rules (ASC 606), a company can't book revenue until delivery occurs. Verified PODs provide the "Audit-Proof" evidence needed for quarterly financial reporting.

**Insurance Underwriters**
**Claims Adjudication:** When a $50,000 server goes missing, the insurer scans the POD. If the hash returns **"DELIVERED - SIGNATURE VERIFIED,"** they can deny the claim and focus on internal theft at the destination.

**Customs Brokers**
**Import Clearance:** Proving to tax authorities that goods entered the country and were delivered to the registered importer, preventing "Diversion Fraud."

## Verification Architecture

**The "Phantom Delivery" Fraud Problem**

- **Signature Forgery:** Drivers signing "John Doe" and keeping the goods.
- **Quantity Tampering:** A receiver changing "10 Boxes" to "8 Boxes" on the paper after the driver leaves to claim a shortage.
- **Backdating:** Changing the delivery date to avoid "Late Delivery" penalties in a service contract.

**Issuer Types** (First Party)

**Global Logistics Integrators.**
**Local Last-Mile Couriers.**
**Internal Corporate Fleets.**

**Privacy Salt:** Essential. Tracking numbers and addresses are sensitive. The hash must be salted to prevent "Tracking Number Harvesting" by data scrapers.

## Rationale

Proof of Delivery is the "Closing Link" in the global supply chain. Live Verify turns a fleeting physical event (the handoff) into a permanent, verifiable digital fact, reducing billions in "Loss and Dispute" costs annually.

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

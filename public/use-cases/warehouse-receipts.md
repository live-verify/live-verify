---
title: "Warehouse Receipts & Inventory Warrants"
category: "Warehousing & Inventory"
volume: "Medium-Small"
retention: "7-10 years (financial audit, loan lifecycle)"
slug: "warehouse-receipts"
tags: ["asset-verification", "collateral-fraud", "commodities", "fraud-prevention", "inventory-management", "logistics", "supply-chain", "trade-finance", "warehouse", "warehousing"]
furtherDerivations: 1
---

<div style="max-width: 600px; margin: 24px auto; font-family: 'Courier New', Courier, monospace; border: 4px double #000; background: #fffbe6; padding: 20px;">
  <div style="text-align: center; border-bottom: 1px solid #000; padding-bottom: 10px; margin-bottom: 15px;">
    <strong>METRO STORAGE & LOGISTICS</strong><br>
    ROTTERDAM TERMINAL • SHED 42
  </div>
  <div style="font-size: 0.9em; line-height: 1.4;">
    <p><strong>Warrant No:</strong> MSL-ROT-88429<br>
    <strong>Depositor:</strong> Global Metals Trading Corp<br>
    <strong>Date:</strong> 14-OCT-2025</p>
<table style="width: 100%; border-collapse: collapse; margin: 10px 0;">
      <tr style="border-bottom: 1px solid #000;">
        <td style="padding: 4px;"><strong>Commodity</strong></td>
        <td style="padding: 4px;"><strong>Grade</strong></td>
        <td style="padding: 4px;"><strong>Net Wgt</strong></td>
      </tr>
      <tr>
        <td style="padding: 4px;">Copper Cathodes</td>
        <td style="padding: 4px;">Grade A (LME)</td>
        <td style="padding: 4px;">498.24 MT</td>
      </tr>
    </table>
<p><strong>Location:</strong> Bay 12, Stack 4-9<br>
    <strong>Brand:</strong> Codelco<br>
    <strong>Seal Numbers:</strong> 9941A - 9982A</p>
<div style="margin-top: 15px; border: 2px solid #d00; color: #d00; padding: 5px; text-align: center; font-weight: bold; transform: rotate(-2deg);">
      NON-NEGOTIABLE COPY
    </div>
<div style="margin-top: 15px; font-size: 0.8em; text-align: center;">
      <strong>Verify authenticity and lien status:</strong><br>
      verify:warrants.metro-logistics.com/check
    </div>
  </div>
</div>

## Data Verified

**Warehouse Operator** (Issuer), **Depositor** (Current Owner), **Commodity Details** (Grade, Brand, Crop Year), **Weights** (Gross/Net), **Storage Location** (Specific Shed/Bay), **Warrant Number**, **Rent/Storage Paid To Date**.

**Document Types:**
- **Electronic Warehouse Receipt (EWR):** The legal title document.
- **Holding Certificate:** Proof of possession (often used for insurance).
- **Release Order:** Authorization to move goods out.
- **Weight Note / Assay Report:** Technical verification of quality (often attached).

**Physical vs. Digital:** While commodities markets are moving toward blockchain, paper/PDF receipts are still widely used in emerging markets and mid-tier trade. This use case bridges the gap, allowing a paper receipt to be cryptographically verified against the warehouse's digital ledger.

## Data Visible After Verification

Shows the issuer domain (The Warehouse Operator) and the responder text.

**Status Indications:**
- **Valid / Clear** - Goods are in the warehouse; no liens registered.
- **Pledged** - Goods are held, but pledged to a bank (cannot be sold/moved).
- **Released** - Goods have already left the warehouse (document is historic only).
- **Cancelled** - Receipt voided (e.g., converted to different format).
- **Warrant Blocked** - Under legal dispute or customs hold.

## Second-Party Use (The Trader/Owner)

Commodity traders benefit from instant credibility.

**Proof of Ownership:** A trader selling 500 tonnes of copper can email the PDF receipt to a buyer. The buyer scans it and sees "Verified by [Warehouse]" immediately, proving the trader actually owns the metal.
**Insurance auditing:** Traders must insure goods in storage. Verified receipts provide indisputable proof of asset location and value to underwriters.

## Third-Party Use

**Trade Finance Banks**
*The $100 Million Risk*
Banks lend massive sums against commodities inventory.
*   **Preventing Double Financing:** A fraudster might take one receipt for 100 tonnes of coffee and show it to Bank A and Bank B to get two loans. With Live Verify, if Bank A registers a "Pledge" on the hash, Bank B scans the document and sees **"Status: PLEDGED to [Bank A]"**.
*   **The "Fresh Air" Scam:** Fraudsters create PDF receipts for metal that doesn't exist. Verification checks the hash against the *Warehouse's* database. If the warehouse didn't issue it, the hash returns 404.

**Warehouse Operators**
*Liability Protection*
*   **Release Integrity:** Before releasing goods to a truck driver presenting a "Release Order," the warehouse clerk scans the order. If the hash doesn't match the internal system (e.g., the quantity was altered from 10 pallets to 50), the release is stopped.

**Inspection Agencies (SGS, Bureau Veritas)**
*Quality Control*
*   Inspectors verify that the goods described in the receipt match what is physically in the shed before issuing their own quality findings.

**Customs Authorities**
*Bonded Warehouses*
*   Customs officers verify that goods in bonded warehouses (duty unpaid) haven't been illicitly moved. The status **"Bonded: Yes"** confirms the tax liability status.

## Verification Architecture

**The "Painted Rocks" Fraud Problem**
Recent high-profile frauds (e.g., the Trafigura nickel case) involved receipts for containers that held painted stones instead of nickel.
*   **Limitations:** Live Verify verifies the *document* is authentic to the warehouse. It does not verify the *warehouse* isn't lying or incompetent.
*   **The Fix:** However, it *does* prevent **Documentary Fraud** (altering a genuine receipt to show higher weights) and **Impersonation** (creating a receipt from a fake warehouse).
*   **Domain Binding:** The `verify:` URL binds the receipt to `metro-logistics.com`. A fraudster cannot generate a valid hash for that domain without hacking the warehouse's database.

**Lien Registry Integration**
This is the "killer app" for this use case.
1.  **Issue:** Warehouse issues Receipt #123.
2.  **Pledge:** Owner pledges Receipt #123 to JPMorgan.
3.  **Update:** Warehouse updates the status of Hash(#123) to "PLEDGED - JPMorgan".
4.  **Check:** Owner tries to sell the receipt to a Buyer. Buyer scans it, sees "PLEDGED," and refuses to pay until the lien is cleared.

**Dynamic Fields vs. Static Hash**
Commodities change (shrinkage, humidity loss).
*   The paper document represents the state *at issuance*.
*   The verification response can include **"Current Status"** metadata.
    *   *Paper says:* "Weight: 1000kg"
    *   *Verification says:* "Valid. Current Weight: 998kg (evaporation loss recorded 12-Nov)."

**UCC-7 and Electronic Documents**
In the US, UCC Article 7 governs warehouse receipts. An Live Verify system helps satisfy the requirement for "control" of an electronic document of title by providing a singular, verifiable authoritative record hosted by the issuer.

---

_[Content merged from: warehouse-receipts-storage]_


## What are Warehouse Storage Receipts?

In the logistics and retail industries, a **Warehouse Receipt** is the proof that goods (e.g., 500 pallets of electronics or 10,000 lbs of grain) are physically present in a specific facility. These documents are often used as **Collateral** for bank loans (Inventory Financing).

Because they represent high-value physical assets, these receipts are a primary target for "Phantom Inventory" fraud. A dishonest business owner might "edit" a receipt to show they have 1,000 units instead of 100 to get a bigger loan. Similarly, they might use a fake receipt from a non-existent warehouse to create "paper wealth." Verified hashes bind the **SKU Quantities, Storage Location, and Total Value** to the warehouse operator's domain (e.g., `prologis.com` or `ironmountain.com`).

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="warehouse">[</span>METRO STORAGE & LOGISTICS
Global Bonded Warehousing - Facility ID: ROT-42
═══════════════════════════════════════════════════════════════════

Depositor:  GLOBAL TECH IMPORTS LLC      Receipt Number: WR-2026-8844
Account #:  ACCT-9922-88                 Date Issued:    15 MAR 2026
Address:    London, UK                   Location:       AISLE 4, BIN 12-B

INVENTORY DETAIL
───────────────────────────────────────────────────────────────────
SKU / Description                  Units    Weight    Estimated Value
───────────────────────────────────────────────────────────────────
XJ-900 Processor Units (Tray)        500  1,200 KG     $ 250,000.00
───────────────────────────────────────────────────────────────────
TOTAL VERIFIED ASSET VALUE (USD):                      $ 250,000.00

TERMS: Goods are stored subject to the Standard Warehouse Contract.
Negotiable only if endorsed. Lien active for unpaid storage fees.

<span data-verify-line="warehouse">verify:metro-logistics.com/v</span> <span verifiable-text="end" data-for="warehouse">]</span></pre>
</div>

## Data Verified

Receipt number, warehouse operator name, facility ID, depositor name, account number, itemized SKUs and quantities, total weight/volume, storage location (Aisle/Bin), estimated value, date of entry, lien status.

**Document Types:**
- **Negotiable Warehouse Receipt:** The actual document of title.
- **Non-Negotiable Storage Receipt:** For simple inventory tracking.
- **Inventory Audit Report:** Periodic verification of stock levels.
- **Release Order:** (Linked hash) authorizing the removal of goods.

## Data Visible After Verification

Shows the issuer domain (`prologis.com`, `fedex.com`, `linfox.com`) and the asset standing.

**Status Indications:**
- **Verified / In-Storage** — Goods are physically present and confirmed.
- **Pledged to Bank** — **ALERT:** The assets are collateral for a loan; cannot be moved.
- **Released** — **ALERT:** The goods have left the facility; paper is now historic.
- **Audit Flag** — **ALERT:** A discrepancy was found during the last physical count.

## Second-Party Use

The **Inventory Owner (Depositor)** benefits from verification.

**Collateral Monetization:** A startup with $1M in verified inventory can provide the hash to a bank. The bank scans it and sees **"VERIFIED - IN STORAGE"** from a reputable warehouse operator, allowing them to issue a "Working Capital Loan" in hours instead of weeks.

**Insurance Proof:** If a warehouse fire occurs, the owner can provide verified receipts to the insurer to prove exactly what was in the building at the time of the loss, ensuring a full and fair payout.

## Third-Party Use

**Trade Finance Banks**
**Double-Financing Prevention:** Before lending against a warehouse receipt, the bank scans the hash. If it returns **"PLEDGED TO JPMORGAN,"** the second bank knows the asset is already used as collateral and can deny the fraudulent loan application.

**External Audit Firms**
**Physical Verification:** During a year-end audit, the accountant scans a random sample of warehouse receipts. Live Verify ensures the company isn't "Padding" its balance sheet with phantom inventory that doesn't exist in the warehouse's digital system.

**Customs and Tax Authorities**
**Bonded Inventory Audit:** Verifying that "Duty-Unpaid" goods in a bonded warehouse haven't been illegally moved into the local market.

## Verification Architecture

**The "Empty Box" Fraud Problem**

- **Quantity Inflation:** Editing a receipt to change "10 pallets" to "100 pallets."
- **Lien Hiding:** Removing the "Pledged to Bank" stamp from a PDF before showing it to a second lender.
- **Facility Spoofing:** Creating a fake receipt from a famous warehouse operator to cover for goods stolen from a different site.

**Issuer Types** (First Party)

**Global Logistics Operators.**
**Commodity Storage Facilities.**
**State Bonded Warehouses.**

**Privacy Salt:** High. Specific inventory levels and values are sensitive business secrets. The hash must be salted to prevent "Market Mapping" by competitors.

## Rationale

Warehousing is the "Physical Bank" of the supply chain. By turning receipts into verifiable digital bridges, we create a transparent "Chain of Custody" that turns idle inventory into a trusted, bankable financial asset.

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

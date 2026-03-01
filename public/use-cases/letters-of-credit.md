---
title: "Letters of Credit (L/C)"
category: "Trade Finance"
volume: "Small (but high-value)"
retention: "7-10 years (transaction lifecycle)"
slug: "letters-of-credit"
tags: ["trade-finance", "letter-of-credit", "swift-mt700", "documentary-credit", "international-trade", "export-finance", "ucp-600"]
furtherDerivations: 1
---

<div style="max-width: 600px; margin: 24px auto; font-family: 'Courier New', Courier, monospace; border: 1px solid #000; background: #fff; padding: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
  <div style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 20px;">
    <strong><span verifiable-text="start" data-for="lc">[</span>HSBC BANK PLC - TRADE SERVICES</strong><br>
    IRREVOCABLE DOCUMENTARY CREDIT<br>
    --------------------------------
  </div>
<div style="font-size: 0.85em; line-height: 1.4;">
    <p><strong>L/C Number:</strong> HSBC-LC-99228877<br>
    <strong>Date of Issue:</strong> 15 MAR 2026<br>
    <strong>Expiry Date:</strong> 15 SEP 2026</p>
<div style="display: flex; margin-bottom: 15px;">
      <div style="width: 50%; border-right: 1px solid #000; padding-right: 10px;">
        <strong>Applicant (Buyer):</strong><br>
        Global Retail Hub, Corp.<br>
        New York, NY, USA
      </div>
      <div style="width: 50%; padding-left: 10px;">
        <strong>Beneficiary (Seller):</strong><br>
        Swiss Precision Lenses, SA<br>
        Geneva, Switzerland
      </div>
    </div>
<div style="background: #f9f9f9; border: 1px solid #ccc; padding: 10px; margin-bottom: 15px;">
      <strong>AMOUNT: USD 1,250,000.00</strong><br>
      (One Million Two Hundred Fifty Thousand US Dollars)
    </div>
<p><strong>Description of Goods:</strong><br>
    High-Precision Optical Glass (Lot #992) as per Contract #42.</p>
<p style="font-size: 0.8em;">Available with any bank by negotiation. Subject to UCP 600.</p>
<div data-verify-line="lc" style="border-top: 1px dashed #999; margin-top: 25px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.85em; color: #555; text-align: center;"
      title="Demo only: HSBC doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:hsbc.com/trade/v <span verifiable-text="end" data-for="lc">]</span>
    </div>
  </div>
</div>

## Data Verified

L/C Number, Issuing Bank name, Beneficiary name, Applicant name, Currency and exact amount (numerical/text), Expiry date, Port of Loading/Discharge, Goods description (digest), UCP version (e.g., UCP 600), date of issuance.

**Document Types:**
- **Irrevocable Letter of Credit:** The primary bank guarantee.
- **L/C Amendment:** (Linked hash) documenting changes to the credit.
- **Standby Letter of Credit (SBLC):** Used as a backup payment source.
- **Advice of Credit:** From the advising bank to the seller.

## Data Visible After Verification

Shows the issuer domain (the Issuing Bank) and current credit status.

**Status Indications:**
- **Valid/Available** — Credit is active and open for negotiation.
- **Amended** — **ALERT:** Terms have changed; view Amendment #2.
- **Drawn** — Funds have already been paid against this credit.
- **Expired** — The credit has passed its valid window.
- **Cancelled** — Retracted by mutual agreement.

## Second-Party Use

The **Beneficiary (Exporter)** benefits from verification.

**Shipping Confidence:** Before manufacturing $1.2M in custom lenses, the Swiss exporter scans the L/C hash. "Verified by HSBC" ensure the buyer hasn't "Edited" the PDF to change the payment terms from "At Sight" to "Net 90 Days" or reduced the dollar amount.

**Supply Chain Finance:** Proving the verified L/C to a local bank to get a "Pre-Export Loan" to buy raw materials. Banks only lend against L/Cs they can cryptographically trust.

## Third-Party Use

**Advising / Confirming Banks**
**Risk Transfer:** A confirming bank in Switzerland can verify the L/C against HSBC's domain before adding their own guarantee. This stops "Ghost L/Cs" from non-existent or insolvent banks.

**Logistics Carriers (Steamship Lines)**
**Title Vetting:** Verifying that the B/L they are issuing matches the verified "Goods Description" in the L/C, reducing the risk of being sued for "Misdescription."

**Customs Authorities**
**Valuation Vetting:** Verifying the actual transaction value of high-tax goods by checking the verified L/C hash.

## Verification Architecture

**The "Phantom Credit" Fraud Problem**

- **Fabricated L/Cs:** Using a template to create a fake L/C from a real bank (e.g., HSBC) to trick a supplier into shipping goods without payment.
- **Term Tampering:** Editing the "Required Documents" list to remove the need for a 3rd party inspection certificate, allowing the buyer to ship junk.
- **Amount Inflation:** Changing $100,000 to $1,000,000 to use the L/C as collateral for a fraudulent loan.

**Issuer Types** (First Party)

**Global Trade Banks:** (HSBC, Citi, BNP Paribas, Standard Chartered).
**Central Banks:** (In countries with high exchange controls).
**Trade Platforms:** (e.g., Contour, Marco Polo - hosting the hashes).

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

**Jurisdictional Requirements (International Trade/Finance)**

Letters of credit crossing borders require:
- **Issuing bank's jurisdiction:** Bank verification endpoint acceptable
- **Non-OECD beneficiary jurisdictions:** Independent witness firms from OECD nations required
- **Compliance with UCP 600:** Article 7(c) allows independent verification via blockchain or third-party witnesses

**Treaty-based trade:** US-EU, USMCA, and other trade agreements increasingly mandate witness firms from neutral jurisdictions for high-value L/Cs.

**Public Blockchain (Non-Party)**

Witnessing firms may periodically commit rollups to an inexpensive public blockchain, providing an ultimate immutability guarantee. The blockchain is a "non-party"—infrastructure, not a participant in the transaction. This creates multiple verification paths:

1. **Issuer domain** — Direct check against the issuer
2. **Witnessing firm** — Independent confirmation with timestamp
3. **Public blockchain** — Decentralized trust anchor via rollup inclusion


## Competition vs. SWIFT (Electronic)

| Feature | Live Verify | SWIFT MT700 (Electronic) | Scanned PDF L/C |
| :--- | :--- | :--- | :--- |
| **Trust Anchor** | **Domain-Bound.** Bound to the Bank. | **Network-Bound.** Trust the SWIFT keys. | **Zero.** Easily forged. |
| **Accessibility** | **Universal.** Any local agent/broker can verify. | **Restricted.** Only banks have SWIFT terminals. | **Universal.** |
| **Integrity** | **Binds Content.** Protects the text. | **Data-Only.** No "Human" document link. | **Vulnerable.** |
| **Interoperability** | **High.** Works across non-SWIFT fintechs. | **Limited.** Only for legacy banks. | **Universal.** |

**Why Live Verify wins here:** The "Non-Bank" reality. Trade finance involves non-banks (freight forwarders, insurance agents, small suppliers) who **do not have SWIFT access**. They are forced to trust a piece of paper or a PDF. Live Verify turns that **Human-Readable PDF** into a cryptographically trusted artifact that anyone can verify without a $50,000/year SWIFT terminal.

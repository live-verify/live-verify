---
title: "Letters of Credit (L/C)"
category: "Trade Finance"
volume: "Small (but high-value)"
retention: "7-10 years (transaction lifecycle)"
slug: "letters-of-credit"
verificationMode: "clip"
tags: ["trade-finance", "letter-of-credit", "swift-mt700", "documentary-credit", "international-trade", "export-finance", "ucp-600"]
furtherDerivations: 1
---

<div style="max-width: 600px; margin: 24px auto; font-family: 'Courier New', Courier, monospace; border: 1px solid #000; background: #fff; padding: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
  <div style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 20px;">
    <strong><span verifiable-text="start" data-for="lc"></span>HSBC BANK PLC - TRADE SERVICES</strong><br>
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
      <span data-verify-line="lc">verify:hsbc.com/trade/v</span> <span verifiable-text="end" data-for="lc"></span>
    </div>
  </div>
</div>

## The Problem: Phantom Credit Fraud

- **Fabricated L/Cs:** Using a template to create a fake L/C from a real bank (e.g., HSBC) to trick a supplier into shipping goods without payment.
- **Term Tampering:** Editing the "Required Documents" list to remove the need for a 3rd party inspection certificate, allowing the buyer to ship junk.
- **Amount Inflation:** Changing $100,000 to $1,000,000 to use the L/C as collateral for a fraudulent loan.

## What Is Checked

L/C Number, Issuing Bank name, Beneficiary name, Applicant name, Currency and exact amount (numerical/text), Expiry date, Port of Loading/Discharge, Goods description (digest), UCP version (e.g., UCP 600), date of issuance.

**Document Types:**
- **Irrevocable Letter of Credit:** The primary bank guarantee.
- **L/C Amendment:** (Linked hash) documenting changes to the credit.
- **Standby Letter of Credit (SBLC):** Used as a backup payment source.
- **Advice of Credit:** From the advising bank to the seller.

## What the Checker Sees

Shows the issuer domain (the Issuing Bank) and current credit status.

**Status Indications:**
- **Valid/Available** — Credit is active and open for negotiation.
- **Amended** — Terms have changed; view Amendment #2.
- **Drawn** — Funds have already been paid against this credit.
- **Expired** — The credit has passed its valid window.
- **Cancelled** — Retracted by mutual agreement.

## Who Holds It

The Beneficiary (Exporter) benefits from verification.

**Shipping Confidence:** Before manufacturing $1.2M in custom lenses, the Swiss exporter scans the L/C hash. "Verified by HSBC" ensure the buyer hasn't "Edited" the PDF to change the payment terms from "At Sight" to "Net 90 Days" or reduced the dollar amount.

**Supply Chain Finance:** Proving the verified L/C to a local bank to get a "Pre-Export Loan" to buy raw materials. Banks only lend against L/Cs they can cryptographically trust.

## Who Checks It

**Advising / Confirming Banks**
**Risk Transfer:** A confirming bank in Switzerland can verify the L/C against HSBC's domain before adding their own guarantee. This stops "Ghost L/Cs" from non-existent or insolvent banks.

**Logistics Carriers (Steamship Lines)**
**Title Vetting:** Verifying that the B/L they are issuing matches the verified "Goods Description" in the L/C, reducing the risk of being sued for "Misdescription."

**Customs Authorities**
**Valuation Vetting:** Verifying the actual transaction value of high-tax goods by checking the verified L/C hash.

## Who Issues It

**Issuer Types** (First Party)

**Global Trade Banks:** (HSBC, Citi, BNP Paribas, Standard Chartered).
**Central Banks:** (In countries with high exchange controls).
**Trade Platforms:** (e.g., Contour, Marco Polo - hosting the hashes).

## Authority Chain

**Pattern:** Regulated

HSBC Bank, a regulated international bank, is authorized by the FCA to issue verified letters of credit for international trade transactions.

```
✓ tradefinance.hsbc.co.uk/lc/verify — Issues verified letters of credit
  ✓ fca.org.uk/register — Regulates UK trade finance providers
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Jurisdictional Witnessing (Optional)

An independent witness layer may apply — see [Witnessing Third Parties](../../docs/WITNESSING-THIRD-PARTIES.md) for the full mechanism (what a witness receives, non-repudiation, optional public-blockchain rollups). For this use case: a witness would receive the issuing bank's hashes and status changes plus structured metadata (L/C numbers, beneficiary names, applicant names, currency amounts, expiry dates, port information, goods descriptions, UCP versions) — never specific contract numbers or payment routing details — providing non-repudiation of the letter of credit and an audit trail customs authorities and central banks can inspect.

## Compared With SWIFT (Electronic)

| Feature | Live Verify | SWIFT MT700 (Electronic) | Scanned PDF L/C |
| :--- | :--- | :--- | :--- |
| **Trust Anchor** | **Domain-Bound.** Bound to the Bank. | **Network-Bound.** Trust the SWIFT keys. | **Zero.** Easily forged. |
| **Accessibility** | **Universal.** Any local agent/broker can verify. | **Restricted.** Only banks have SWIFT terminals. | **Universal.** |
| **Integrity** | **Binds Content.** Protects the text. | **Data-Only.** No "Human" document link. | **Vulnerable.** |
| **Interoperability** | **High.** Works across non-SWIFT fintechs. | **Limited.** Only for legacy banks. | **Universal.** |

**Where each fits:** SWIFT is how banks authenticate a letter of credit between themselves, and for the issuing, advising and confirming banks it is the authoritative channel. Freight forwarders, insurance agents and smaller suppliers are outside that network and see only the printed or PDF credit. Live Verify lets them confirm that copy against the issuing bank's domain, alongside the interbank message that the banks continue to depend on.

### The Substitution Fraud

A letter of credit is a promise from a bank to pay the seller when the seller presents conforming documents. The fraud is not in the L/C itself — it is in the documents presented against it. A seller ships inferior goods but presents a forged inspection certificate, a fabricated bill of lading, or an altered commercial invoice that matches the L/C terms perfectly. The advising bank examines the documents "on their face" and pays out. The buyer opens the container and finds waste instead of electronics. If the inspection certificate, the bill of lading, and the commercial invoice are each independently verifiable against their respective issuers' domains, the document substitution becomes detectable before the bank releases payment — not months later in an arbitration proceeding.

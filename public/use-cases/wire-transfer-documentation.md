---
title: "Wire Transfer Confirmations (SWIFT/Fedwire)"
category: "Banking & Payments"
volume: "Medium-Small"
retention: "7-10 years (audit trail / regulatory requirement)"
slug: "wire-transfer-documentation"
tags: ["wire-transfer", "swift", "fedwire", "banking-fraud", "bec-scam", "transaction-verification", "trade-finance", "real-estate-closing"]
furtherDerivations: 1
---

## What is a Wire Transfer Confirmation?

In the banking world, a **Wire Transfer Confirmation** (often called a "Debit Advice") is the proof that a bank has executed an order to move money via a network like **SWIFT** or **Fedwire**. It contains the unique tracking number—the **IMAD/OMAD** for US domestic wires or the **TRN** for international wires.

These documents are the "Trigger for Action" in high-value commerce. A title company releases a house deed, or a supplier ships a $1M load of electronics, only *after* they see this confirmation. Fraud is rampant: **Business Email Compromise (BEC)** scammers use Photoshop to create pixel-perfect fake "Sent" confirmations to trick victims into releasing goods before the fraud is discovered. Verified hashes bind the **Reference Number, Beneficiary Account, and Amount** to the sending bank's domain (e.g., `goliathbank.com`).

<div style="max-width: 600px; margin: 24px auto; font-family: 'Courier New', Courier, monospace; border: 1px solid #333; background: #fff; padding: 30px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <div style="border-bottom: 1px dashed #333; padding-bottom: 15px; margin-bottom: 20px; text-align: center;">
    <div style="font-weight: bold; font-size: 1.3em;"><span verifiable-text="start" data-for="wire">[</span>GOLIATH NATIONAL BANK</div>
    <div style="font-size: 0.8em; opacity: 0.9;">OUTGOING WIRE TRANSFER NOTIFICATION</div>
  </div>
<div style="font-size: 0.9em; line-height: 1.4; color: #000;">
    <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
      <div>
        <strong>Reference (IMAD):</strong><br>
        20260315A88442211
      </div>
      <div style="text-align: right;">
        <strong>Value Date:</strong><br>
        15 MAR 2026
      </div>
    </div>
<div style="background: #f9f9f9; border: 1px solid #ddd; padding: 15px; margin-bottom: 20px;">
      <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 1.1em;">
        <span>WIRE AMOUNT:</span>
        <span>$ 1,250,000.00 USD</span>
      </div>
    </div>
<p><strong>Originator:</strong> MEGACORP HOLDINGS LLC<br>
    <strong>Beneficiary:</strong> GLOBAL SUPPLY PARTNERS LTD<br>
    <strong>Beneficiary Bank:</strong> HSBC LONDON (SC: 40-02-50)<br>
    <strong>Account:</strong> ************8842</p>
<div style="border: 1px solid #000; padding: 10px; text-align: center; font-weight: bold; margin-top: 20px;">
      STATUS: COMPLETED / FEDWIRE CONFIRMED
    </div>
  </div>
<div style="padding: 20px; background: #fff; border-top: 1px dashed #999; margin-top: 30px; text-align: center;">
    <div data-verify-line="wire" style="font-family: 'Courier New', monospace; font-size: 0.85em; color: #000; font-weight: bold;"
      title="Demo only: Banks don't yet offer verification&#10;endpoints, so this is illustrative">
      verify:wires.goliathbank.com/v <span verifiable-text="end" data-for="wire">]</span>
    </div>
    <div style="font-size: 0.7em; color: #666; margin-top: 10px; font-style: italic;">
      Scan to verify execution status, beneficiary account match, and real-time OFAC clearance.
    </div>
  </div>
</div>

## Data Verified

IMAD/OMAD number (Fedwire), TRN (SWIFT), UETR (Unique End-to-End Transaction Ref), originator name, beneficiary name, beneficiary bank (BIC/Swift Code), beneficiary account number (masked), transaction amount, currency, date/time of execution, status (Completed/Pending/Rejected).

**Document Types:**
- **Outgoing Wire Notification:** The primary proof for the sender.
- **SWIFT MT103 Message:** The detailed technical instructions.
- **Incoming Credit Advice:** Proof for the receiver that funds have landed.
- **OFAC Clearance Notice:** (Linked hash) proving the wire passed sanctions screening.

## Data Visible After Verification

Shows the issuer domain (`goliathbank.com`, `chase.com`, `swift.com`) and the transfer standing.

**Status Indications:**
- **Completed / Confirmed** — The bank has executed the wire and the funds have left the institution.
- **Pending / In-Review** — **ALERT:** The wire is held (e.g., for AML/fraud review); do not release goods.
- **Rejected / Cancelled** — **CRITICAL:** The transfer was stopped; the paper confirmation is a fabrication.
- **Returned** — **ALERT:** The receiving bank rejected the funds; money is back with the sender.

## Second-Party Use

The **Originator (Sender)** benefits from verification.

**Deal Closure Speed:** When buying a $10M piece of machinery, the buyer sends the wire and provides the verified hash to the seller. The seller can instantly see **"VERIFIED COMPLETED"** from a reputable bank, allowing them to load the ship immediately without waiting 24 hours for the funds to actually "show up" in their own bank account.

**Audit Protection:** Proving to corporate auditors that a specific large payout was an authentic, bank-executed transaction and not an "Internal Transfer" to a shell company controlled by a rogue employee.

## Third-Party Use

**Title Companies / Real Estate Closing Agents**
**Wire Fraud Defense:** Before releasing the keys to a house, the agent scans the buyer's wire confirmation hash. Verification ensures the "IMAD Number" isn't a random string of digits on a fake PDF, stopping the multi-billion dollar "Escrow Diversion" fraud.

**Customs Brokers / Port Authorities**
**Duty Payment Proof:** Verifying that the import duties stated on a customs declaration have actually been wired to the government's account.

**Receiving Banks**
**KYC / AML Vetting:** Verifying the "Purpose of Payment" and the "Originator Integrity" of a large incoming wire by scanning the sender's verified confirmation hash.

## Verification Architecture

**The "BEC Screenshot" Fraud Problem**

- **Reference Fabrication:** Using a real bank's template but writing a fake IMAD/TRN number.
- **Amount Inflation:** Editing a $1,250 wire into a $1,250,000 wire on a PDF to trick a seller.
- **Beneficiary Swapping:** Editing the "Account Number" on a real confirmation to hide that the money was actually sent to a scammer's account.

**Issuer Types** (First Party)

**Global Transaction Banks.**
**National Central Banks (for Fedwire).**
**Fintech Payout Hubs (e.g., Wise, Airwallex).**

**Privacy Salt:** Highly Critical. Individual wire amounts and beneficiary names are extremely sensitive financial PII. The hash must be salted and access restricted to authorized trading partners.

## Rationale

Wire transfers are the "Hard Currency" of global trade. By turning static confirmations into verifiable digital bridges, we protect the entire commercial system from the devastating cost of BEC scams and ensure that "Sent" means "Spent" with cryptographic certainty.

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

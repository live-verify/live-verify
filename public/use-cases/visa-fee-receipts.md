---
title: "Visa Fee Receipts (MRV)"
category: "Immigration & Visa Documents"
volume: "Very Large"
retention: "Appointment Date + 1-2 years (financial audit)"
slug: "visa-fee-receipts"
tags: ["immigration", "visa-fee", "mrv-receipt", "consular-fees", "travel-fraud", "expense-reimbursement", "appointment-booking", "identity-theft"]
furtherDerivations: 1
---

## What is a Visa Fee Receipt?

A **Machine Readable Visa (MRV) Fee Receipt** is the proof that an applicant has paid the mandatory government fee (e.g., $185) to apply for a visa. This receipt—carrying a unique "CGI Reference" or bank transaction ID—is the "Key" needed to book an interview at an embassy or consulate.

These receipts are "Digital Currency." Fraud is high-stakes in the "Visa Consultant" market: shady agents often sell the same "Used Receipt" to multiple applicants or create "Phantom Receipts" to trick people into paying for "Express Appointments" that don't exist. Similarly, employees often "edit" a receipt to turn a $15 personal fee into a $185 business fee for reimbursement. Verified hashes bind the **Receipt Number, Amount, and Payer Name** to the bank's or the payment portal's domain (e.g., `usvisa-info.com` or `ustraveldocs.com`).

<div style="max-width: 400px; margin: 24px auto; font-family: 'Courier New', monospace; border: 1px solid #999; background: #fff; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
  <div style="text-align: center; border-bottom: 1px dashed #333; padding-bottom: 15px; margin-bottom: 15px;">
    <strong><span verifiable-text="start" data-for="fee">[</span>CGI FEDERAL / MRV FEE</strong><br>
    OFFICIAL PAYMENT RECEIPT<br>
    ---------------------------------
  </div>
<div style="font-size: 0.9em; line-height: 1.4;">
    <p><strong>Merchant:</strong> U.S. DEPARTMENT OF STATE<br>
    <strong>Ref #:</strong> CGI-9922-8877-XJ<br>
    <strong>Date:</strong> 15 MAR 2026 10:42:01</p>
<div style="margin: 15px 0; border-top: 1px solid #000; border-bottom: 1px solid #000; padding: 5px 0; display: flex; justify-content: space-between; font-weight: bold;">
      <span>FEE AMOUNT (USD):</span>
      <span>$ 185.00</span>
    </div>
<p><strong>Applicant:</strong> JOHN JACOB DOE<br>
    <strong>Passport:</strong> ********1234<br>
    <strong>Location:</strong> NEW DELHI, INDIA</p>
<p><strong>Status:</strong> COMPLETED / APPLIED</p>
  </div>
<div data-verify-line="fee" style="margin-top: 20px; padding-top: 10px; border-top: 1px dashed #999; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
      title="Demo only: Visa portals don't yet offer verification&#10;endpoints, so this is illustrative">
      verify:usvisa-info.com/v <span verifiable-text="end" data-for="fee">]</span>
    </div>
</div>

## Data Verified

Receipt number (CGI Ref), applicant name, passport number (masked), fee amount (USD), equivalent in local currency, payment date/time, consular post location, visa type (e.g., B1/B2), payment method (Cash/EFT/Credit).

**Document Types:**
- **MRV Fee Receipt:** The primary booking voucher.
- **SEVIS Fee Receipt (I-901):** Specifically for student visas.
- **Reciprocity Fee Receipt:** (Linked hash) issued after interview.
- **Biometrics Receipt:** Proving the fingerprint fee was paid.

## Data Visible After Verification

Shows the issuer domain (`usvisa-info.com`, `vfs-global.com`, `ustraveldocs.com`) and the receipt standing.

**Status Indications:**
- **Available / Valid** — Receipt is paid and hasn't been used to book an appointment yet.
- **Used / Booked** — **ALERT:** This receipt is already tied to an interview (prevents resale).
- **Refunded** — **ALERT:** The fee was credited back; receipt is void.
- **Unknown** — **CRITICAL:** Hash not found; high risk of a "Phantom Receipt" forgery.

## Second-Party Use

The **Visa Applicant** benefits from verification.

**Appointment Booking Speed:** If a technical glitch occurs on the visa portal, the applicant can provide the verified hash of their payment. Consular tech support can instantly see **"VERIFIED PAID - $185"** on their end, allowing them to manually override the system and grant the interview slot without a 3-day bank-reconciliation wait.

**Expense Reimbursement:** A business traveler can provide the verified hash to their company's finance department. "Verified by CGI Federal" ensures the company that the $185 charge was an actual federal fee and not a manual edit to a different bank receipt.

## Third-Party Use

**Consulate Entrance Security**
**Access Control:** Before allowing an applicant into the building, the guard scans the receipt. Verification ensures the person isn't "Gate-Crashing" with a fake or reused receipt from another applicant.

**Immigration Agencies / Non-Profits**
**Anti-Scam Protection:** An agency helping refugees can scan receipts provided by sub-agents. Verified hashes ensure the agency's funding isn't being siphoned off by middlemen buying "Fake Receipts" for their clients.

**Auditors (State Dept)**
**Financial Audit:** Verifying the "Chain of Payout" from local banks in foreign countries to the US Treasury, ensuring that the volume of "Verified Receipts" matches the volume of cash received.

## Verification Architecture

**The "Vulture Agent" Fraud Problem**

- **Receipt Recycling:** Selling the same valid receipt to 5 different people (verification reveals the "Used" or "Booked" alert).
- **Amount Padding:** Changing a "$15" local courier fee into a "$185" MRV fee on a PDF.
- **Ghost Portals:** Creating fake "Official Visa" websites that issue fake receipts to steal credit card info and PII.

**Issuer Types** (First Party)

**National Visa Booking Portals.**
**Large Transaction Banks (e.g., Bank of America, HDFC).**
**Visa Processors (VFS Global).**

**Privacy Salt:** Critical. Passport numbers and payment times are private. The hash must be salted to prevent "Passport Harvesting" by data scrapers.

## Rationale

Visa fees are the "Front Door" of international travel. By turning receipts into verifiable digital bridges, we protect the public from predatory agents and ensure that "Permission to Apply" is based on the digital truth of the ledger, not the creative editing of a scammer.

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

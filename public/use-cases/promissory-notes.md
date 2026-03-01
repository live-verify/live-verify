---
title: "Promissory Notes and Loan Documents"
category: "Financial & Legal Documents"
volume: "Medium"
retention: "Loan term + 7-10 years (statute of limitations)"
slug: "promissory-notes"
tags: ["finance", "lending", "promissory-note", "negotiable-instrument", "loan-agreement", "ucc-article-3", "debt-verification", "secondary-market"]
furtherDerivations: 1
---

## What is a Promissory Note?

A **Promissory Note** is a legal "Promise to Pay." It is a financial instrument that contains a written promise by one party (the maker or borrower) to pay a specific sum of money to another party (the payee or lender), either on demand or at a specified future date.

These documents are the "Paper Gold" of the lending industry. In the **Secondary Market**, promissory notes are bought and sold for millions of dollars. Fraud is high-stakes: a dishonest person might "edit" a note to change a 5% interest rate to 15%, or to increase the principal amount. Similarly, a borrower might use a fake "Satisfied" stamp to hide a debt. Verified hashes bind the **Principal, Interest Rate, and Maturity Date** to the lender's or the servicing agent's domain (e.g., `chase.com` or `fanniemae.com`).

<div style="max-width: 650px; margin: 24px auto; font-family: 'Times New Roman', Times, serif; border: 1px solid #000; background: #fff; padding: 40px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <div style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 30px;">
    <h2 style="margin: 0; font-size: 1.4em; text-transform: uppercase; letter-spacing: 1px;"><span verifiable-text="start" data-for="note">[</span>PROMISSORY NOTE</h2>
    <div style="font-size: 0.9em; font-style: italic;">Fixed Rate - Installment</div>
  </div>
<div style="font-size: 1em; line-height: 1.6; color: #000; text-align: justify;">
    <div style="display: flex; justify-content: space-between; margin-bottom: 20px; font-weight: bold;">
      <div>$ 125,000.00</div>
      <div>MARCH 15, 2026</div>
    </div>
<p>FOR VALUE RECEIVED, the undersigned <strong>ROBERT J. MILLER</strong> (the "Borrower"), promises to pay to the order of <strong>GOLIATH NATIONAL BANK</strong> (the "Lender"), the principal sum of <strong>One Hundred Twenty-Five Thousand Dollars</strong> ($125,000.00) with interest at the rate of <strong>6.5%</strong> per annum.</p>
<div style="background: #f9f9f9; padding: 15px; border: 1px solid #ccc; margin: 20px 0;">
      <strong>Payment Terms:</strong> Monthly installments of $790.00 commencing May 1, 2026. Final payment due March 1, 2041 (Maturity).
    </div>
<p>This Note is secured by a Security Agreement of even date covering certain collateral described therein.</p>
  </div>
<div style="margin-top: 40px; border-top: 1px solid #000; width: 200px; padding-top: 5px; font-style: italic;">
    Borrower Signature
  </div>
<div style="padding: 20px; background: #fffbe6; border: 1px dashed #999; margin-top: 30px; text-align: center;">
    <div data-verify-line="note" style="font-family: 'Courier New', monospace; font-size: 0.85em; color: #000; font-weight: bold;"
      title="Demo only: Banks don't yet offer verification&#10;endpoints, so this is illustrative">
      verify:goliathbank.com/v <span verifiable-text="end" data-for="note">]</span>
    </div>
    <div style="font-size: 0.7em; color: #666; margin-top: 8px;">
      Scan to verify principal amount, interest rate, and current lien holder status.
    </div>
  </div>
</div>

## Data Verified

Principal amount (numerical and text), interest rate (fixed/variable), borrower name, lender name, payment frequency, installment amount, maturity date, collateral reference, late fee terms, date of execution, loan ID.

**Document Types:**
- **Unsecured Promissory Note:** A simple "I Owe You."
- **Mortgage Note:** Secured by real estate (the "Title").
- **Commercial Term Note:** For business equipment or capital.
- **Convertible Note:** For startup seed investments.

## Data Visible After Verification

Shows the issuer domain (`chase.com`, `quickenloans.com`, `circleup.com`) and the note standing.

**Status Indications:**
- **Active / Current** — Borrower is making payments as agreed.
- **Satisfied / Paid** — **ALERT:** The debt is fully cleared; this paper is no longer a liability.
- **In Default** — **CRITICAL:** Borrower has missed payments; legal action active.
- **Assigned / Sold** — **ALERT:** The note was sold to a different lender (shows new holder).

## Second-Party Use

The **Borrower (Maker)** benefits from verification.

**Payoff Protection:** When a borrower makes their final payment, the lender updates the hash status to **"PAID IN FULL."** The borrower can then use this verified hash to prove to future lenders or credit bureaus that the debt is gone, even if they lost the original "Satisfied" paper letter.

**Dispute Defense:** If a lender's system has a glitch and claims a 10% interest rate, the borrower can scan the verified note to prove the original agreed-upon rate of 6.5% with cryptographic certainty.

## Third-Party Use

**Note Buyers (Secondary Market)**
**Due Diligence:** Before buying a portfolio of 1,000 notes, an investor scans the hashes. Verification ensures the "Principal Balances" and "Maturity Dates" haven't been inflated by the seller to make the portfolio look more valuable than it is.

**Civil Courts / Judges**
**Standing Verification:** In a foreclosure case, the "Plaintiff" must prove they actually own the note. Live Verify allows the court to verify the "Chain of Assignment" directly from the original lender's domain, stopping the common "Lost Note" fraud.

**Attorneys / Estate Executors**
**Asset Reconciliation:** Verifying the true value and terms of notes held by a deceased person to ensure the estate is accurately valued for tax and distribution.

## Verification Architecture

**The "Paper Profit" Fraud Problem**

- **Rate Padding:** Editing a PDF note to turn a 4% low-interest loan into a 12% high-yield asset to sell to an investor.
- **Zombie Notes:** Trying to collect on a note that was already "Paid in Full" years ago.
- **Double-Selling:** Selling the same physical note to two different investors (verification reveals the "Assigned to [Buyer A]" alert).

**Issuer Types** (First Party)

**Retail & Commercial Banks.**
**Peer-to-Peer (P2P) Platforms.**
**Private Mortgage Servicers.**

**Privacy Salt:** Highly Critical. Loan amounts and borrower identities are private financial data. The hash must be salted to prevent "Wealth Mapping" of the population.

## Rationale

Promissory notes are the "Currency of the Credit Market." By turning them into verifiable digital bridges, we ensure that the multi-trillion dollar market for debt is based on the digital truth of the contract, not the creative editing of a PDF.

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

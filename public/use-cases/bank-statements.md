---
title: "Bank Statements"
category: "Banking & Payments"
volume: "Medium"
retention: "7-10 years (loan term + disputes)"
slug: "bank-statements"
tags: ["bank", "statement", "finance", "mortgage", "kyc", "aml"]
furtherDerivations: 1
---

## What is a Bank Statement?

A **Bank Statement** is the ultimate proof of wealth. It shows exactly how much money you have and where it came from.

Lenders use them to approve mortgages. Governments use them to approve Visas. Fraudsters use "Inspect Element" or Photoshop to turn a $500 balance into $50,000 in seconds.

Verifying a bank statement directly against the bank's domain ensures that the balance on the page is the **truth**, without forcing the user to give their bank password to a risky "data scraping" app.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="bank">[</span>CHASE                                              Page 1 of 4
JPMorgan Chase Bank, N.A.

Account Holder:                         Account Number:
WAYNE ENTERPRISES, INC.                 ****-****-9982
1007 Mountain Drive                     Period: Mar 01 - Mar 31, 2026
Gotham City, NY 10001

ACCOUNT SUMMARY
───────────────────────────────────────────────────────────
Beginning Balance                            $ 1,250,000.42
Deposits and Additions                       $   450,000.00
Withdrawals and Debits                      -$   200,000.00
───────────────────────────────────────────────────────────
ENDING BALANCE                               $ 1,500,000.42

Verification protects every line of this statement.
Alteration of balances is a federal crime.

<span data-verify-line="bank">verify:chase.com/statements/v</span> <span verifiable-text="end" data-for="bank">]</span></pre>
</div>

## Data Verified

Account holder name, account number (masked), ending balance, total deposits, total withdrawals, statement date range, issuing branch/entity.

**Document Types:**
- **Monthly Account Statement:** Standard retail/commercial proof.
- **Verification of Deposit (VOD):** 1-page summary for lenders.
- **Transaction Receipt:** For high-value wires or transfers.

## Data Visible After Verification

Shows the issuer domain (`chase.com`, `wellsfargo.com`) and the account standing.

**Status Indications:**
- **Verified** — Statement content matches the bank's snapshot.
- **Amended** — A correction was issued for this period.
- **Inactive** — Account has been closed since this statement was issued.

## Second-Party Use

The **Bank Customer** benefits from verification.

**Mortgage Applications:** Proving to a lender that the $1.5M balance isn't a "Photoshopped PDF" but is a verified asset. This speeds up the "Pre-Approval" process significantly.

**Business Partnerships:** Proving financial liquidity to a new supplier or partner without giving them direct login access to the bank account.

**Dispute Resolution:** If a transaction is "missing" from the bank's internal record later, the verified statement serves as cryptographic proof of what the bank previously attested to.

## Third-Party Use

**Mortgage Lenders / Underwriters**
**Asset Verification:** Lenders currently use manual "bank login" scrapers (like Plaid) which many users find invasive. Live Verify allows the user to simply send a PDF/Paper statement that the lender can trust without needing the user's password.

**Regulators (The Fed / FDIC)**
**Systemic Audit:** Regulators receiving a feed of statement hashes can verify that the bank isn't "running two sets of books" (i.e., telling the customer they have $1M but telling the regulator they only have $100k).

**M&A Due Diligence**
**Liquidity Verification:** Buyers in a corporate acquisition can instantly verify the target company's cash-on-hand claims by scanning recent statements.

## Verification Architecture

**The "Photoshopped Balance" Fraud Problem**

- **Balance Inflation:** Changing a $5,000 balance to $50,000 to qualify for a loan.
- **Transaction Deletion:** Removing a large "Gambling Withdrawal" or "IRS Penalty" from the statement before sending it to a landlord.
- **Fabricated Statements:** Using a realistic-looking template to create a statement for a non-existent account at a real bank.

**Issuer Types** (First Party)

**Retail Banks:** (Chase, BofA, HSBC).
**Neobanks:** (Revolut, Monzo, Chime).
**Brokerage Firms:** (Schwab, Fidelity).

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

**Jurisdictional Requirements (Banking)**

**US Banks:** Do not mandate witnessing firms for domestic statements. However:
- **International stakeholders** receiving US bank statements may demand independent verification
- **FATCA/CRS compliance:** Cross-border sharing may require witness firms not located in the US
- **Litigation:** Court proceedings require certified witness statements, superseding bank verification

**EU Banks:** May require witness firms for cross-border statements under GDPR and banking regulations.

**Public Blockchain (Non-Party)**

Witnessing firms may periodically commit rollups to an inexpensive public blockchain, providing an ultimate immutability guarantee. The blockchain is a "non-party"—infrastructure, not a participant in the transaction. This creates multiple verification paths:

1. **Issuer domain** — Direct check against the issuer
2. **Witnessing firm** — Independent confirmation with timestamp
3. **Public blockchain** — Decentralized trust anchor via rollup inclusion


## Competition vs. Open Banking (Plaid/Finicity)

| Feature | Live Verify | Open Banking (Plaid) | Paper / Scanned PDF |
| :--- | :--- | :--- | :--- |
| **Privacy** | **High.** No passwords shared. No data scraping. | **Low.** Requires bank password; scrapes full history. | **Medium.** But untrusted. |
| **Integrity** | **Cryptographic.** Every line is protected. | **High.** Direct API access. | **Zero.** Easily edited. |
| **User Control** | **High.** User chooses which statement to share. | **Low.** Once linked, the app has continuous access. | **High.** |
| **Interoperability** | **Universal.** Works for any bank with a domain. | **Limited.** Only works for banks on the Plaid network. | **Manual.** |

**Why Live Verify wins here:** Trust without Intrusion. Many high-net-worth individuals and privacy-conscious users refuse to give their bank passwords to third-party "scrapers." Live Verify provides the **same level of trust** as an API, but preserves the user's security and privacy.

---
title: "Bank Statements"
category: "Banking & Payments"
volume: "Medium"
retention: "7-10 years (loan term + disputes)"
slug: "bank-statements"
verificationMode: "clip"
tags: ["bank", "statement", "finance", "mortgage", "kyc", "aml"]
furtherDerivations: 1
---

## What is a Bank Statement?

A Bank Statement is the ultimate proof of wealth. It shows exactly how much money you have and where it came from.

Lenders use them to approve mortgages. Governments use them to approve Visas. Fraudsters use "Inspect Element" or Photoshop to turn a $500 balance into $50,000 in seconds.

Verifying a bank statement directly against the bank's domain confirms that the bank issued this exact page, with every figure as shown, as at the statement date, without the person checking needing any access to the account itself.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="bank"></span>CHASE                                              Page 1 of 4
JPMorgan Chase Bank, N.A.

Account Holder:                         Account Number:
NORTHBRIDGE INDUSTRIES, INC.             **-**-9982
1007 Mountain Drive                     Period: Mar 01 - Mar 31, 2026
Fairport, NY 10001

ACCOUNT SUMMARY
───────────────────────────────────────────────────────────
Beginning Balance                            $ 1,250,000.42
Deposits and Additions                       $   450,000.00
Withdrawals and Debits                      -$   200,000.00
───────────────────────────────────────────────────────────
ENDING BALANCE                               $ 1,500,000.42

Verification protects every line of this statement.
Alteration of balances is a federal crime.

<span data-verify-line="bank">verify:chase.com/statements/v</span> <span verifiable-text="end" data-for="bank"></span></pre>
</div>

## The Problem: Photoshopped Balance Fraud

- **Balance Inflation:** Changing a $5,000 balance to $50,000 to qualify for a loan.
- **Transaction Deletion:** Removing a large "Gambling Withdrawal" or "IRS Penalty" from the statement before sending it to a landlord.
- **Fabricated Statements:** Using a realistic-looking template to create a statement for a non-existent account at a real bank.

## What Is Checked

The full visible text of the verified page — account holder name, account number (masked), the summary block (balances, deposits, withdrawals, statement date range, issuing entity), and the transaction rows on that page. This is [page-at-a-time hashing](../../docs/page-at-a-time-hashing.md): the verifiable unit is one rendered page, so a deleted withdrawal or inserted deposit *on a page you check* changes that page's hash and fails to verify — not just the summary balance. A multi-page statement has one hash per page.

**Reliability depends on how the page is read.** In Chrome-extension mode (DOM text, no OCR) and future PDF mode (text-layer extraction), a full page of dense rows hashes deterministically — this is the strong path, and the one to prefer for a presented statement. Camera-OCR on a *printed* dense page is more fragile: every misread row breaks the page hash, so on paper the reliable unit may fall back to the summary block. The app should tell the verifier which was checked, never imply the rows were verified when OCR couldn't read them.

**The "removed page" caveat.** Verifying the pages you are *shown* does not prove you were shown *all* of them — a fraudster could present pages 1, 2, and 4 and omit page 3. Where completeness matters (as in KYC), the optional `compositeHash` manifest reports `thisPage` / `totalPages`, so a missing page is detectable. See [page-at-a-time hashing](../../docs/page-at-a-time-hashing.md).

**Document Types:**
- **Monthly Account Statement:** Standard retail/commercial proof.
- **Verification of Deposit (VOD):** 1-page summary for lenders.
- **Transaction Receipt:** For high-value wires or transfers.

## What the Checker Sees

Shows the issuer domain (`chase.com`, `wellsfargo.com`) and the account standing.

**Status Indications:**
- **Verified** — Statement content matches the bank's snapshot.
- **Amended** — A correction was issued for this period.
- **Inactive** — Account has been closed since this statement was issued.

## Who Holds It

The Bank Customer benefits from verification.

**Mortgage Applications:** Proving to a lender that the $1.5M balance isn't a "Photoshopped PDF" but is a verified asset. This speeds up the "Pre-Approval" process significantly.

**Business Partnerships:** Proving financial liquidity to a new supplier or partner without giving them direct login access to the bank account.

**Dispute Resolution:** If a transaction is "missing" from the bank's internal record later, the verified statement serves as cryptographic proof of what the bank previously attested to.

## Who Checks It

**Mortgage Lenders / Underwriters**
**Asset Verification:** A lender outside an open-banking scheme, or dealing with a foreign bank, can trust a PDF or paper statement the applicant sends, without asking for access to the account.

**Regulators (The Fed / FDIC)**
**Systemic Audit:** Regulators receiving a feed of statement hashes can verify that the bank isn't "running two sets of books" (i.e., telling the customer they have $1M but telling the regulator they only have $100k).

**M&A Due Diligence**
**Liquidity Verification:** Buyers in a corporate acquisition can instantly verify the target company's cash-on-hand claims by scanning recent statements.

## Who Issues It

**Issuer Types** (First Party)

**Retail Banks:** (Chase, BofA, HSBC).
**Neobanks:** (Revolut, Monzo, Chime).
**Brokerage Firms:** (Schwab, Fidelity).

## Authority Chain

**Pattern:** Regulated

```
✓ chase.com/statements/v — Provides retail and commercial banking in the US
  ✓ occ.gov/verify — Regulates national banks and federal savings associations
    ✓ treasury.gov/verifiers — US Treasury Department root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Where Each Fits: Live Verify and Open Banking

Open-banking data sharing (the UK and EU schemes, India's Account Aggregator, aggregators such as Plaid in the US) and Live Verify answer different questions and work side by side. Open banking is a data feed between a bank and a registered, integrated firm. Live Verify makes the statement itself checkable by whoever is handed it.

| | Open-banking data feed | Live Verify on the statement | Unverified PDF or paper |
| :--- | :--- | :--- | :--- |
| **Who can check** | A registered firm that has integrated with the scheme or an aggregator. | Anyone handed the statement: a landlord, a visa officer, a court, a supplier. | Nobody; it can only be taken on trust. |
| **What the checker gets** | Live account data, often ongoing, for as long as consent lasts. | Confirmation that the bank issued this exact page, as at the statement date. | A document that may have been edited. |
| **What the customer shares** | Consented access to account data. | Only the statement they chose to hand over. | Only the statement they chose to hand over. |
| **Reach** | Banks and countries inside the scheme. | Any bank that publishes hashes on its own domain, in any country. | Universal, but untrusted. |
| **Best suited to** | Continuous affordability checks and onboarding by lenders and fintechs. | One-off proof to a party outside the scheme, or across borders. | Nothing where the amount matters. |

**Where each fits:** a lender already connected to an open-banking scheme will often prefer the live feed, and should. A statement is still what changes hands everywhere else: tenancy applications, visa and immigration files, court bundles, supplier due diligence, and any case where the bank and the checker are in different countries. Live Verify covers those, and gives a customer who would rather not grant account access a way to prove a balance with a single page.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).

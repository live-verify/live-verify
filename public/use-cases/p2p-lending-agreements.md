---
title: "Peer-to-Peer (P2P) Lending Agreements"
category: "Investment & Fintech"
volume: "Small"
retention: "Loan term + 7-10 years"
slug: "p2p-lending-agreements"
verificationMode: "clip"
tags: ["p2p-lending", "promissory-note", "fintech", "lendingclub", "prosper", "loan-agreement", "alternative-finance", "private-credit"]
furtherDerivations: 1
---

## What is a P2P Lending Agreement?

**Peer-to-Peer (P2P) Lending** allows individuals or small businesses to borrow money directly from other individuals through platforms like LendingClub or Prosper.

The Lending Agreement (or Promissory Note) is the legal contract that says: "Investor Group A lent Person B $10,000 at 8% interest."

**"Loan Padding"** is a common financial fraud where a borrower "edits" a P2P agreement to show a smaller debt than they actually have, or a higher "verified income" stream, to trick a traditional bank into giving them a mortgage. "Duplicate Financing" occurs when a borrower uses the same set of un-verified paper documents to take out three different loans from three different platforms at once. Live Verify binds the Loan ID, Amount, and APR to the fintech platform's domain.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <span verifiable-text="start" data-for="p2p"></span>
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;">LENDINGCLUB
═══════════════════════════════════════════════════════════════════

                      BORROWER PROMISSORY NOTE

Loan ID: LC-99228877-XK                            Date: 15 MAR 2026

This certifies a valid lending agreement exists for:
Borrower: John Jacob Doe

LOAN TERMS
───────────────────────────────────────────────────────────────────
Principal Amount:                                       $ 10,000.00
Interest Rate (Fixed):                                    8.42% APR
Monthly Payment:                                           $ 315.42
Term:                                                      36 Months

Origination Date:                                      March 1, 2026
Maturity Date:                                         March 1, 2029

───────────────────────────────────────────────────────────────────
This electronic record is cryptographically bound to the LendingClub
private ledger. Alteration is a violation of federal lending laws.

</pre>
<span data-verify-line="p2p">verify:lendingclub.com/v</span> <span verifiable-text="end" data-for="p2p"></span>
</div>

## The Problem: FinTech Forgery Fraud

- **Balance Deflation:** A borrower editing their P2P dashboard or PDF to hide a large debt from a mortgage underwriter.
- **APR Tampering:** Editing a 25% "Bad Credit" interest rate to look like a 7% "Prime" rate.
- **Phantom Origination:** Creating a fake loan agreement from a real platform to "wash" stolen money or commit identity theft.

## What Is Checked

Borrower name, Loan ID, Principal amount, Fixed/Variable APR, Monthly payment amount, Loan Term (months), Origination date, Maturity date, Platform ID.

**Document Types:**
- **Promissory Note:** The primary legal contract.
- **Loan Disclosure Statement:** Summarizing fees and TILA (Truth in Lending) math.
- **Payment History Report:** (Linked hash) proving on-time performance.
- **Payoff Letter:** Proving the debt is satisfied.

## What the Checker Sees

Shows the issuer domain (the P2P platform) and the current loan standing.

**Status Indications:**
- **Current** — Payments are up to date; loan is in good standing.
- **Paid in Full** — Debt is satisfied; note is void.
- **Delinquent** — Payments are > 30 days overdue.
- **Charged Off** — Loan has defaulted; legal collection in progress.

## Who Holds It

The Borrower (second party) receives the promissory note from the P2P platform (first party), keeps it, and may later hand it to third parties for various reasons, or never do so.

**Personal Record:** They have their own verified copy of the loan terms. Most of the time, the document sits in their files—the verification value is latent, there *if needed*.

**Peace of Mind:** They can confirm at any time that the note matches what the platform's system recorded and hasn't been altered.

**Future Optionality:** If a dispute arises about payment terms or if they apply for additional financing, they have cryptographic proof ready without needing to contact the platform.

## Who Checks It

The borrower (second party) may hand the verified document to various third parties:

**Traditional Banks (Mortgage Lenders)**
**Debt Verification:** Before approving a home loan, the bank scans the P2P agreement. "Verified by LendingClub.com" ensures the borrower hasn't "photoshopped" a $50,000 debt down to $5,000 to hide their true leverage.

**Credit Score Providers (FICO / Vantage)**
**Data Accuracy:** Verifying the granular terms of alternative credit data to ensure the borrower's score accurately reflects their non-bank debt performance.

**Asset-Backed Security (ABS) Investors**
**Portfolio Audit:** Investors buying "bundles" of P2P loans can verify the underlying promissory notes at scale by scanning hashes, ensuring the "Pool" hasn't been corrupted with fake or inflated loans.

## Who Issues It

**Issuer Types (First Party)**

- P2P Marketplaces (LendingClub, Prosper, Upstart)
- Private Credit Funds
- B2B Lending Platforms (e.g., Funding Circle)

**Privacy Salt:** Required. Unlike documents with many unpredictable variables, P2P lending agreements often contain enumerable values—round dollar amounts ($5k, $10k, $25k), standard APR tiers (6.99%, 8.42%, 12.99%), and common loan terms (36, 60 months). A competitor could feasibly enumerate combinations to reverse-engineer platform lending patterns and borrower risk profiles. Salt protects this sensitive financial intelligence.

## Authority Chain

**Pattern:** Regulated

Funding Circle, a regulated P2P lending platform, is authorized by the FCA to issue verified peer-to-peer lending agreements and loan confirmations.

```
✓ loans.fundingcircle.com/verify — Issues verified peer-to-peer lending agreements
  ✓ fca.org.uk/register — Regulates UK consumer credit firms
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Jurisdictional Witnessing (Optional)

An independent witness layer may apply — see [Witnessing Third Parties](../../docs/WITNESSING-THIRD-PARTIES.md) for the full mechanism (what a witness receives, non-repudiation, optional public-blockchain rollups). For this use case: a witness would receive the P2P lending platform's hashes and status changes plus structured metadata (loan IDs, principal amounts, APRs, payment terms, origination dates) — never plaintext such as borrower names — providing non-repudiation of issuing the lending agreement.

## Compared With API (Aggregators)

| Feature | Live Verify | Plaid / Yodlee (API) | Scanned PDF |
| :--- | :--- | :--- | :--- |
| **Trust Anchor** | **Domain-Bound.** Bound to the Platform. | **System-Bound.** Trust the aggregator. | **Zero.** Easily forged. |
| **Privacy** | **High.** Share only the *Summary*. | **Low.** Aggregators often scrape full history. | **High.** |
| **Connectivity** | **Needed for the check.** One small web request per document. | **Needed.** Requires live API sync. | **Static.** |
| **Speed** | **Instant.** 5-second scan. | **Slow.** Requires login/MFA. | **Manual.** |

**Where each fits:** Account aggregators are useful where a lender wants an ongoing or broad view of an applicant's finances and the applicant is willing to connect their accounts. Sometimes a single document is all that is needed, such as a loan note or statement placed in a mortgage file. Live Verify lets the lender confirm that the platform issued that document, without requiring credentials or wider access, and aggregation remains available for cases that call for the fuller picture.
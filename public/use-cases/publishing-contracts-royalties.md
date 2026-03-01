---
title: "Publishing Contracts and Royalty Statements"
category: "Art, Media & Publishing"
volume: "Very Small"
retention: "7-20 years (contract term + disputes)"
slug: "publishing-contracts-royalties"
tags: ["publishing", "royalties", "intellectual-property", "author-rights", "contract-compliance", "book-deals", "audit-trail"]
furtherDerivations: 1
---

## What are Royalty Statements?

In the media and publishing world, an author's or artist's income is typically a percentage of sales, tracked in a **Royalty Statement**. These documents arrive semi-annually and detail how many books, songs, or licenses were sold and at what price.

Because these statements determine the distribution of millions of dollars, they are a primary source of "Creative Accounting" and outright fraud. A publisher might "edit" a statement to show 10,000 sales instead of 100,000 to avoid paying the creator. Similarly, an author might "alter" a past statement to prove a higher historical income when negotiating a new "Advance" with a different publisher. Verified hashes bind the **Sales Quantities, Unit Prices, and Total Payout** to the publisher's domain (e.g., `penguinrandomhouse.com` or `universalmusic.com`).

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="royalty">[</span>PENGUIN RANDOM HOUSE
Global Royalty & Accounting Office
═══════════════════════════════════════════════════════════════════

                      ROYALTY STATEMENT
                    Period: JUL - DEC 2025

Author:      KILGORE TROUT                Statement ID:  RS-2026-0042
Project ID:  99228877-KT                  Issue Date:    MARCH 15, 2026
Title:       Venus on the Half-Shell

EARNINGS DETAIL
───────────────────────────────────────────────────────────────────
Format / Territory                   Units     Rate        Earnings
───────────────────────────────────────────────────────────────────
Hardcover - North America           42,500      15%    $ 159,375.00
E-Book - International              12,200      25%    $  30,500.00
───────────────────────────────────────────────────────────────────
TOTAL NET EARNINGS (USD):                              $ 189,875.00

Verification confirms financial integrity against publisher's
general ledger.

<span data-verify-line="royalty">verify:prh.com/royalties/v</span> <span verifiable-text="end" data-for="royalty">]</span></pre>
</div>

## Data Verified

Author/Artist name, publisher name, project title (ISBN/ISRC), royalty period, itemized sales units (by format), royalty rates (percentages), gross earnings, net payout, statement ID, issue date.

**Document Types:**
- **Royalty Statement:** The periodic financial report.
- **Publishing Contract (Long-Form):** The primary legal agreement.
- **Deal Memo / Term Sheet:** The summary of an upcoming "Advance."
- **Subsidiary Rights Notice:** Proof of sale for film/foreign rights.

## Data Visible After Verification

Shows the issuer domain (`prh.com`, `sony.com`, `spotify.com`) and the payment standing.

**Status Indications:**
- **Paid / Cleared** — Funds have been disbursed to the author/agent.
- **Accrued** — Earnings verified but held (e.g., against an unearned advance).
- **Amended** — **ALERT:** A corrected statement exists; this version is void.
- **In Dispute** — **ALERT:** An audit or legal challenge is active for this period.

## Second-Party Use

The **Author / Artist / Creator** benefits from verification.

**Mortgage / Loan Applications:** Many authors have volatile incomes. Providing verified "Royalty Statements" to a bank allows the lender to trust the income data without requiring 3 years of complex tax returns, potentially securing a mortgage for a "Freelancer" faster.

**Agent Audits:** An author can scan their own statement to ensure that the version they received from their "Agency" matches what the "Publisher" actually sent, preventing unscrupulous agents from "skimming" off the top.

## Third-Party Use

**Literary / Talent Agents**
**Negotiation Power:** Before moving an author to a new publisher, the agent provides verified statements of past performance. "Verified by Random House" ensures the new publisher that the sales figures aren't inflated, leading to higher advances.

**Tax Authorities (IRS / HMRC)**
**Income Audit:** Verifying that the "Royalty Income" reported on a tax return matches the verified payouts from the publisher, reducing the need for manual paperwork requests.

**Divorce & Estate Lawyers**
**Asset Valuation:** Intellectual property is a lifelong asset. Verified hashes allow for the accurate valuation of a "Backlist" during asset division or probate.

## Verification Architecture

**The "Ghost Sales" Fraud Problem**

- **Sales Under-Reporting:** Publishers hiding sales from authors to keep royalty payments low.
- **Advance Inflation:** Creating a fake "Past Deal Memo" to trick a new publisher into paying a larger advance.
- **Contract Edit:** Tampering with a PDF contract to change a 10% royalty rate into 15% before a dispute.

**Issuer Types** (First Party)

**Global Publishing Houses.**
**Music Labels / Streaming Platforms.**
**Literary Agencies (Sub-issuers).**

**Privacy Salt:** High. Royalty earnings and specific sales volumes are highly sensitive private financial data. The hash must be salted to prevent competitors from mapping a rival's entire bestseller list.

## Rationale

Royalty accounting is famously opaque. By turning statements into verifiable digital bridges, we create a transparent "Chain of Value" that ensures creators are paid exactly what they are owed according to the agreed-upon contract.

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

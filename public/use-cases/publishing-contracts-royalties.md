---
title: "Publishing Contracts and Royalty Statements"
category: "Art, Media & Publishing"
volume: "Very Small"
retention: "7-20 years (contract term + disputes)"
slug: "publishing-contracts-royalties"
verificationMode: "clip"
tags: ["publishing", "royalties", "intellectual-property", "author-rights", "contract-compliance", "book-deals", "audit-trail"]
furtherDerivations: 1
---

## What are Royalty Statements?

In the media and publishing world, an author's or artist's income is typically a percentage of sales, tracked in a Royalty Statement. These documents arrive semi-annually and detail how many books, songs, or licenses were sold and at what price.

Because these statements determine the distribution of millions of dollars, they are a primary source of "Creative Accounting" and outright fraud. A publisher might "edit" a statement to show 10,000 sales instead of 100,000 to avoid paying the creator. Similarly, an author might "alter" a past statement to prove a higher historical income when negotiating a new "Advance" with a different publisher. Verified hashes bind the Sales Quantities, Unit Prices, and Total Payout to the publisher's domain (e.g., `penguinrandomhouse.com` or `universalmusic.com`).

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="royalty"></span>PENGUIN RANDOM HOUSE
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

<span data-verify-line="royalty">verify:prh.com/royalties/v</span> <span verifiable-text="end" data-for="royalty"></span></pre>
</div>

## The Problem: Ghost Sales Fraud

- **Sales Under-Reporting:** Publishers hiding sales from authors to keep royalty payments low.
- **Advance Inflation:** Creating a fake "Past Deal Memo" to trick a new publisher into paying a larger advance.
- **Contract Edit:** Tampering with a PDF contract to change a 10% royalty rate into 15% before a dispute.

## What Is Checked

Author/Artist name, publisher name, project title (ISBN/ISRC), royalty period, itemized sales units (by format), royalty rates (percentages), gross earnings, net payout, statement ID, issue date.

**Document Types:**
- **Royalty Statement:** The periodic financial report.
- **Publishing Contract (Long-Form):** The primary legal agreement.
- **Deal Memo / Term Sheet:** The summary of an upcoming "Advance."
- **Subsidiary Rights Notice:** Proof of sale for film/foreign rights.

## What the Checker Sees

Shows the issuer domain (`prh.com`, `sony.com`, `spotify.com`) and the payment standing.

**Status Indications:**
- **Paid / Cleared** — Funds have been disbursed to the author/agent.
- **Accrued** — Earnings verified but held (e.g., against an unearned advance).
- **Amended** — A corrected statement exists; this version is void.
- **In Dispute** — An audit or legal challenge is active for this period.

## Who Holds It

The Author / Artist / Creator benefits from verification.

**Mortgage / Loan Applications:** Many authors have volatile incomes. Providing verified "Royalty Statements" to a bank allows the lender to trust the income data without requiring 3 years of complex tax returns, potentially securing a mortgage for a "Freelancer" faster.

**Agent Audits:** An author can scan their own statement to ensure that the version they received from their "Agency" matches what the "Publisher" actually sent, preventing unscrupulous agents from "skimming" off the top.

## Who Checks It

**Literary / Talent Agents**
**Negotiation Power:** Before moving an author to a new publisher, the agent provides verified statements of past performance. "Verified by Random House" ensures the new publisher that the sales figures aren't inflated, leading to higher advances.

**Tax Authorities (IRS / HMRC)**
**Income Audit:** Verifying that the "Royalty Income" reported on a tax return matches the verified payouts from the publisher, reducing the need for manual paperwork requests.

**Divorce & Estate Lawyers**
**Asset Valuation:** Intellectual property is a lifelong asset. Verified hashes allow for the accurate valuation of a "Backlist" during asset division or probate.

## Who Issues It

**Issuer Types** (First Party)

**Global Publishing Houses.**
**Music Labels / Streaming Platforms.**
**Literary Agencies (Sub-issuers).**

**Privacy Salt:** High. Royalty earnings and specific sales volumes are highly sensitive private financial data. The hash must be salted to prevent competitors from mapping a rival's entire bestseller list.

## Authority Chain

**Pattern:** Commercial

Issues publishing contracts and royalty statements

```
✓ royalties.penguinrandomhouse.co.uk/verify — Issues publishing contracts and royalty statements
```

Commercial issuer — self-authorized. Trust rests on the issuer's domain reputation.

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Rationale

Royalty accounting is famously opaque. By turning statements into verifiable digital bridges, we create a transparent "Chain of Value" that ensures creators are paid exactly what they are owed according to the agreed-upon contract.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).

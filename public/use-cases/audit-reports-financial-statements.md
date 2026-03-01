---
title: "Audit Reports and Financial Statements"
category: "Financial & Legal Documents"
volume: "Small"
retention: "7-10 years (regulatory requirements)"
slug: "audit-reports-financial-statements"
tags: ["audit", "financial-statements", "opinion", "cpa", "pcaob", "compliance", "fraud-prevention", "accounting"]
furtherDerivations: 1
---

## What is an Audited Financial Statement?

An **Audit Report** is the official opinion of a Certified Public Accountant (CPA) on the financial health of a company. It is the "Truth Stamp" for the business world.

It is used for high-stakes financial decisions:
1.  **Bank Loans:** Lenders won't give multimillion-dollar loans without an audit.
2.  **M&A Deals:** Buyers verify the target's revenue before purchasing.
3.  **Public Trust:** Investors rely on audits to buy stocks.

**"Phantom Audits"** are a major corporate crime. Fraudulent companies create fake "Unqualified Opinions" on stolen accounting firm letterhead (like PwC or EY) to hide insolvency or to trick lenders into funding a failing business. In other cases, executives "Scrub" a real audit to remove a **"Going Concern"** warning—the paragraph where the auditor warns that the company might go bankrupt. Live Verify binds the **Company name, Net Income, and Opinion Type** to the audit firm's domain.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <span verifiable-text="start" data-for="audit">[</span>
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;">PRICEWATERHOUSECOOPERS LLP
300 Madison Avenue, New York, NY 10017
═══════════════════════════════════════════════════════════════════

       REPORT OF INDEPENDENT REGISTERED PUBLIC ACCOUNTING FIRM

To the Board of Directors and Shareholders of WAYSTAR ROYCO CORP.

OPINIONS ON THE FINANCIAL STATEMENTS

We have audited the accompanying consolidated balance sheets of
Waystar Royco Corp. as of December 31, 2025. In our opinion, the
consolidated financial statements present fairly, in all material
respects, the financial position of the Company.

CONSOLIDATED TOTALS
───────────────────────────────────────────────────────────────────
Total Revenue:                                    $ 14,250,420,000
Net Income:                                        $ 1,200,500,000

BASIS FOR OPINION

We are a public accounting firm registered with the PCAOB. Our
responsibility is to express an opinion on the Company's financial
statements based on our audits.

                    ________________________
                    PricewaterhouseCoopers LLP
                    February 24, 2026

</pre>
  <span data-verify-line="audit">verify:pwc.com/audit/v</span> <span verifiable-text="end" data-for="audit">]</span>
</div>

## Data Verified

Company name, fiscal year-end date, audit opinion type (Unqualified, Qualified, Adverse, Disclaimer), Lead Partner name, audit firm office, material findings summary, consolidated totals (Revenue, Net Income), PCAOB registration status.

**Document Types:**
- **Audited Financial Statements (10-K):** For public companies.
- **Single Audit Report:** For non-profits receiving federal grants.
- **Review Engagement Letter:** For mid-sized private companies (lower assurance than audit).
- **Compilation Report:** Most basic form of accounting service.

## Data Visible After Verification

Shows the issuer domain (the Audit Firm) and the current opinion status.

**Status Indications:**
- **Final** — Audit completed and opinion is active.
- **Withdrawn** — **ALERT:** Firm has retracted the opinion (e.g., due to discovery of management fraud).
- **Superseded** — Restated financials have been issued (linked hash).
- **Subject to Internal Review** — Opinion under internal quality control review.

## Second-Party Use

The **Audited Company** (second party) receives the audit report from the CPA firm (first party), **keeps it**, and may later hand it to third parties for various reasons, or never do so.

**Personal Record:** The company has their own verified copy of the audit opinion. Most of the time, the document sits in their financial records—the verification value is latent, there *if needed*.

**Peace of Mind:** The company can confirm at any time that the report matches what the auditor's system recorded and hasn't been altered since they received it.

**Future Optionality:** If a loan application arises, an M&A transaction occurs, or regulatory filing is needed, the company has cryptographic proof ready without needing to contact the auditor.

## Third-Party Use

The audited company (second party) may hand the verified document to various third parties:

**Lenders / Banks**
Banks require audited financials to ensure loan covenants (e.g., Debt-to-Equity ratios) are met. Verification prevents companies from "window dressing" the financials before sending them to the bank.

**Stock Exchanges (NYSE/NASDAQ)**
Ensuring that filed reports match the auditor's official records, preventing "Wirecard-style" fabricated audit letters.

**Government Grantors**
Agencies (e.g., USAID, NIH) verify that non-profits have passed their mandatory "Single Audit" before releasing grant funds.

## Verification Architecture

**The "Audit Scrubbing" Fraud Problem**

- **Footnote Removal:** Deleting a "Going Concern" warning or a "Related Party Transaction" footnote from the final PDF to hide financial distress from lenders.
- **Number Inflation:** Editing a $1M net income to read $10M to meet a loan requirement.
- **Fabricated Opinion Letters:** Creating fake auditor letterhead to justify a "Vapor-Business."

**Issuer Types (First Party)**

- The Big Four (Deloitte, EY, KPMG, PwC)
- Mid-Tier Firms (BDO, Grant Thornton, RSM)
- CPA Firms (Small/Local auditors)

**Privacy Salt:** Not required. Audit reports contain highly unpredictable variables—unique company names, specific fiscal year-end dates, precise revenue and net income figures with many digits, partner names, engagement numbers, and PCAOB registration details. These elements combined provide sufficient entropy that enumeration attacks are infeasible. Adding salt would provide no additional security benefit.

## Jurisdictional Witnessing

A jurisdiction may require audit firms to retain a **witnessing firm** for regulatory compliance. The witnessing firm:

- Receives all hashes from the audit firm, and any subsequent changes to the payload as they happen—which may manifest as a new hash, a status change (withdrawn, superseded), or even a 404 (record deleted)
- Receives structured content/metadata (company name, fiscal year, opinion type, consolidated totals)
- Does **NOT** receive plaintext (detailed financial footnotes, management discussions, proprietary business information)
- Provides an immutable, timestamped audit trail—available to the jurisdiction on demand, to companies/third parties during disputes, or as expert witness testimony in legal proceedings

This provides:
- **Non-repudiation:** Audit firm cannot deny issuing the opinion
- **Timestamp proof:** Opinion existed at a specific time
- **Regulatory audit:** PCAOB can inspect the witness ledger for audit quality issues
- **Resilience:** Verification works even if audit firm's systems go down or the firm is dissolved

**Public Blockchain (Non-Party)**

Witnessing firms may periodically commit rollups to an inexpensive public blockchain, providing an ultimate immutability guarantee. The blockchain is a "non-party"—infrastructure, not a participant in the transaction. This creates multiple verification paths:

1. **Audit firm domain** — Direct check against the issuer
2. **Witnessing firm** — Independent confirmation with timestamp
3. **Public blockchain** — Decentralized trust anchor via rollup inclusion

## Competition vs. SEC EDGAR Database

| Feature | Live Verify | SEC EDGAR (Public) | Private PDF |
| :--- | :--- | :--- | :--- |
| **Trust Anchor** | **Domain-Bound.** Bound to the Auditor. | **Gov-Bound.** Bound to the filing. | **Zero.** Easily forged. |
| **Coverage** | **Universal.** Works for private company audits. | **Limited.** Only for public companies. | **Full.** |
| **Integrity** | **Binds Content.** Proves every word matches. | **Data-Only.** Doesn't protect the paper. | **Vulnerable.** |
| **Freshness** | **Real-time.** Shows "Withdrawn" status. | **Laggy.** Re-filings take time. | **Static.** |

**Why Live Verify wins here:** Reach. Private companies and non-profits do not file with the SEC. Their audits are "Private Documents" shared with specific lenders and donors. Live Verify allows these private documents to be cryptographically verified without making them public on a government database.
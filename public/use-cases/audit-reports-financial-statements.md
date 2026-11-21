---
title: "Audit Reports and Financial Statements"
category: "Financial Compliance"
volume: "Small"
retention: "7-10 years (regulatory requirements)"
slug: "audit-reports-financial-statements"
verificationMode: "clip"
tags: ["audit", "financial-statements", "opinion", "cpa", "pcaob", "compliance", "fraud-prevention", "accounting"]
furtherDerivations: 1
---

## What is an Audited Financial Statement?

An Audit Report is the official opinion of a Certified Public Accountant (CPA) on the financial health of a company. It is the "Truth Stamp" for the business world.

It is used for high-stakes financial decisions:
1.  **Bank Loans:** Lenders won't give multimillion-dollar loans without an audit.
2.  **M&A Deals:** Buyers verify the target's revenue before purchasing.
3.  **Public Trust:** Investors rely on audits to buy stocks.

**"Phantom Audits"** are a major corporate crime. Fraudulent companies create fake "Unqualified Opinions" on stolen accounting firm letterhead (like PwC or EY) to hide insolvency or to trick lenders into funding a failing business. In other cases, executives "Scrub" a real audit to remove a "Going Concern" warning—the paragraph where the auditor warns that the company might go bankrupt. Live Verify binds the Company name, Net Income, and Opinion Type to the audit firm's domain.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <span verifiable-text="start" data-for="audit"></span>
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
  <span data-verify-line="audit">verify:pwc.com/audit/v</span> <span verifiable-text="end" data-for="audit"></span>
</div>

## The Problem: Audit Scrubbing Fraud

- **Footnote Removal:** Deleting a "Going Concern" warning or a "Related Party Transaction" footnote from the final PDF to hide financial distress from lenders.
- **Number Inflation:** Editing a $1M net income to read $10M to meet a loan requirement.
- **Fabricated Opinion Letters:** Creating fake auditor letterhead to justify a "Vapor-Business."

## What Is Checked

Company name, fiscal year-end date, audit opinion type (Unqualified, Qualified, Adverse, Disclaimer), Lead Partner name, audit firm office, material findings summary, consolidated totals (Revenue, Net Income), PCAOB registration status.

**Document Types:**
- **Audited Financial Statements (10-K):** For public companies.
- **Single Audit Report:** For non-profits receiving federal grants.
- **Review Engagement Letter:** For mid-sized private companies (lower assurance than audit).
- **Compilation Report:** Most basic form of accounting service.

## What the Checker Sees

Shows the issuer domain (the Audit Firm) and the current opinion status.

**Status Indications:**
- **Final** — Audit completed and opinion is active.
- **Withdrawn** — Firm has retracted the opinion (e.g., due to discovery of management fraud).
- **Superseded** — Restated financials have been issued (linked hash).
- **Subject to Internal Review** — Opinion under internal quality control review.

## Who Holds It

The Audited Company (second party) receives the audit report from the CPA firm (first party), keeps it, and may later hand it to third parties for various reasons, or never do so.

**Personal Record:** The company has their own verified copy of the audit opinion. Most of the time, the document sits in their financial records—the verification value is latent, there *if needed*.

**Peace of Mind:** The company can confirm at any time that the report matches what the auditor's system recorded and hasn't been altered since they received it.

**Future Optionality:** If a loan application arises, an M&A transaction occurs, or regulatory filing is needed, the company has cryptographic proof ready without needing to contact the auditor.

## Who Checks It

The audited company (second party) may hand the verified document to various third parties:

**Lenders / Banks**
Banks require audited financials to ensure loan covenants (e.g., Debt-to-Equity ratios) are met. Verification prevents companies from "window dressing" the financials before sending them to the bank.

**Stock Exchanges (NYSE/NASDAQ)**
Ensuring that filed reports match the auditor's official records, preventing "Wirecard-style" fabricated audit letters.

**Government Grantors**
Agencies (e.g., USAID, NIH) verify that non-profits have passed their mandatory "Single Audit" before releasing grant funds.

## Who Issues It

**Issuer Types (First Party)**

- The Big Four (Deloitte, EY, KPMG, PwC)
- Mid-Tier Firms (BDO, Grant Thornton, RSM)
- CPA Firms (Small/Local auditors)

**Privacy Salt:** Not required. Audit reports contain highly unpredictable variables—unique company names, specific fiscal year-end dates, precise revenue and net income figures with many digits, partner names, engagement numbers, and PCAOB registration details. These elements combined provide sufficient entropy that enumeration attacks are infeasible. Adding salt would provide no additional security benefit.

## Authority Chain

**Pattern:** Regulated

CPAs certify that financial statements accurately represent a company's financial position.

```
✓ audit.deloitte.co.uk/verify — Issues audit opinions on financial statements
  ✓ frc.org.uk/auditors — Regulates UK audit and accounting standards
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Where Each Fits: Live Verify and Public Filing Systems such as SEC EDGAR

Listed companies in the US file their audited financial statements with the SEC, which publishes them free on EDGAR. Other countries have their own filing systems, and what is filed publicly varies: some require private companies to file accounts, many do not. A public filing and Live Verify answer different questions and work side by side: the filing is the official public copy, while Live Verify lets the reader of any copy, including a private company's report, confirm the audit firm issued it.

| | SEC EDGAR or other public filing | Live Verify on the audit report | Audit report as PDF |
| :--- | :--- | :--- | :--- |
| **Who can check** | Anyone, for companies that file. | Anyone handed the report: a lender, a donor, a buyer, a landlord. | Nobody; it can only be taken on trust. |
| **What the checker gets** | The filed statements and report, as submitted to the regulator. | Confirmation that the audit firm issued this exact report, as at its date, and whether it has since withdrawn it. | A document that may have been edited. |
| **What the company shares** | Everything in the filing, publicly. | Only the report it chose to hand over. | The PDF. |
| **Reach** | Companies required to file in that jurisdiction; in the US, SEC registrants only. | Global in principle: any audit firm that publishes hashes on its own domain, for private and public companies alike. | Universal, but untrusted. |
| **Speed and cost** | Free; finding the right filing takes a few minutes. | A few seconds per check: one web lookup, with no fee to the standard. | Free and immediate. |
| **What it needs** | A filing obligation. | The audit firm to publish hashes, and Live Verify-aware software on the checker's device. No audit firm does this yet. | Nothing. |
| **Best suited to** | Listed companies and public scrutiny. | Private companies and non-profits whose reports are shared privately, and copies circulating away from the filing. | Nothing where the figures matter. |

**Where each fits:** for a listed company, the filing on EDGAR is the authoritative copy and the natural place to check. Private companies and non-profits do not file there, and their audit reports reach lenders and donors as PDFs. Live Verify lets those readers, with software that honours it, confirm the audit firm issued the report and has not withdrawn it, without the report having to be made public. A listed company's report can carry a verify line as well, for copies that circulate away from the filing.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).

---
title: "SAFE Agreements (Simple Agreement for Future Equity)"
category: "Investment & Fintech"
volume: "Small"
retention: "Permanent (convertible security lifecycle)"
slug: "safe-agreements"
tags: ["venture-capital", "startup-funding", "safe-agreement", "y-combinator", "convertible-equity", "cap-table-integrity", "investment-fraud", "equity-financing"]
furtherDerivations: 1
---

## What is a SAFE Agreement?

A **Simple Agreement for Future Equity (SAFE)** is the standard contract used by Silicon Valley startups to raise "Seed" capital. An investor gives the company cash now (e.g., $500,000) in exchange for the right to receive shares later, when the company raises a "Priced Round" (Series A). It is a convertible security governed by a **Valuation Cap** and a **Discount Rate**.

These documents are the "Keys to the Cap Table." Fraud is high-stakes: a founder might "edit" a SAFE to change a $10M valuation cap to a $20M cap before showing it to a new investor, effectively stealing equity from the original backer. Similarly, a founder might "hide" an existing SAFE to make the company look more attractive to a buyer. Verified hashes bind the **Valuation Cap, Purchase Amount, and Investor Name** to the startup's or the law firm's domain (e.g., `stripeatlas.com` or `ycombinator.com`).

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <span verifiable-text="start" data-for="safe">[</span>
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;">SIMPLE AGREEMENT FOR FUTURE EQUITY
(Post-Money Valuation Cap)
═══════════════════════════════════════════════════════════════════

THIS CERTIFIES THAT in exchange for the payment by SEQUOIA CAPITAL
(the "Investor") of $ 1,000,000.00 (the "Purchase Amount") on
March 15, 2026,

VERIFIC INC. (the "Company"), a Delaware corporation, hereby issues
to the Investor the right to certain shares of the Company's
Capital Stock, subject to the terms set forth below.

KEY TERMS
───────────────────────────────────────────────────────────────────
Post-Money Valuation Cap:                           $ 20,000,000.00
Discount Rate:                                                20.0 %

"This SAFE is one of a series of SAFEs issued by the Company. Any
unauthorized alteration of the Valuation Cap or Discount Rate
renders this instrument void."

───────────────────────────────────────────────────────────────────
_________________________              _________________________
Founder Signature                      Investor Signature

</pre>
<span data-verify-line="safe">verify:verific.io/safe/v</span> <span verifiable-text="end" data-for="safe">]</span>
</div>

## Data Verified

Purchase amount, valuation cap (post-money or pre-money), discount rate, investor name, company name (jurisdiction), date of issuance, series ID, side letter status (Yes/No), board authorization ID, law firm file reference.

**Document Types:**
- **Post-Money SAFE:** The modern YC standard.
- **Pre-Money SAFE:** Used in older or specialized rounds.
- **Convertible Note:** (Linked hash) debt that converts to equity.
- **Pro-Rata Side Letter:** Proving the investor's right to maintain ownership.

## Data Visible After Verification

Shows the issuer domain (`verific.io`, `ycombinator.com`, `stripe.com`) and the security standing.

**Status Indications:**
- **Outstanding / Valid** — The SAFE is authentic and awaiting conversion.
- **Converted** — **ALERT:** This SAFE has already been converted into Series A Preferred stock.
- **Amended** — **ALERT:** Terms have been changed via a subsequent agreement.
- **Rescinded** — **CRITICAL:** The investment was returned or cancelled due to breach.

## Second-Party Use

The **Investor** (second party) receives the SAFE from the startup (first party), **keeps it**, and may later hand it to third parties for various reasons, or never do so.

**Personal Record:** The investor has their own verified copy of the investment terms. Most of the time, the document sits in their portfolio files—the verification value is latent, there *if needed*.

**Peace of Mind:** The investor can confirm at any time that the SAFE matches what the startup's system recorded and hasn't been altered since issuance.

**Future Optionality:** If a dispute arises—whether about valuation caps, conversion terms, or side letters—the investor has cryptographic proof ready without needing to contact the startup or law firm.

## Third-Party Use

The investor (second party) may hand the verified document to various third parties:

**M&A Law Firms (Due Diligence)**
During the acquisition of a startup, the buyer's lawyers receive verified hashes from all SAFE holders. This ensures that there are no "Hidden SAFEs" that will "pop up" and dilute the buyer after the deal closes.

**Secondary Markets (e.g., Forge / EquityZen)**
When trading a SAFE on a secondary platform, the seller provides the verified hash to the buyer. "Verified by Y Combinator" or "Verified by Wilson Sonsini" ensures the buyer that the terms of conversion are authentic and haven't been altered.

**Portfolio Auditors / Limited Partners (LPs)**
A VC fund's LPs receive verified hashes of all SAFEs in the portfolio during annual audits. Verification ensures that the startups haven't "quietly edited" the valuation caps in their internal files, protecting the fund's investment thesis.

**Banking Compliance (Source of Funds)**
When a startup opens a bank account after a $5M seed raise, they provide verified SAFE hashes to prove the legitimate venture capital source, preventing an AML (Anti-Money Laundering) account freeze.

## Verification Architecture

**The "Cap Table Padding" Fraud Problem**

- **Valuation Cap Inflation:** Changing a "$5M cap" to a "$15M cap" on a PDF to trick a new investor into accepting a higher price.
- **Side Letter Hiding:** Removing a "Pro-Rata Right" or a "Most Favored Nation" (MFN) clause from a PDF before showing it to a buyer.
- **Duplicate Issuance:** Selling the same 10% of the company to two different investors using two separate SAFE documents.

**Issuer Types (First Party)**

- Startup ERPs (Carta, Pulley, AngelList)
- Startup Law Firms
- Venture Accelerators (Y Combinator, Techstars)

**Privacy Salt:** Required. Investment amounts and valuation caps are sensitive "Trade Secrets." While each SAFE contains unique combinations of dollar amounts, valuation caps, and investor names that provide some entropy, the strategic importance of these terms—and the risk that competitors could use enumeration to reverse-engineer funding rounds—means salt is essential. Salt protects both the startup's capital structure from market intelligence gathering and the investor's portfolio strategy from competitive analysis.

## Jurisdictional Witnessing

A jurisdiction may require startups raising capital to retain a **witnessing firm** for regulatory compliance. The witnessing firm:

- Receives all hashes from the startup, and any subsequent changes to the SAFE as they happen—which may manifest as a new hash, a status change (converted, amended, rescinded), or even a 404 (record deleted)
- Receives structured content/metadata (amounts, valuation caps, discount rates, investor classes)
- Does **NOT** receive plaintext (investor names, board resolutions, side letter details)
- Provides an immutable, timestamped audit trail—available to the jurisdiction on demand, to investors/third parties during disputes, or as expert witness testimony in legal proceedings

This provides:
- **Non-repudiation:** Startup cannot deny issuing the SAFE terms
- **Timestamp proof:** SAFE hash existed at a specific time (critical for cap table priority disputes)
- **Regulatory audit:** State securities commissions can inspect the witness ledger for compliance with exemptions (Reg D, Reg CF)
- **Resilience:** Verification works even if startup's systems go down or the company dissolves

**Public Blockchain (Non-Party)**

Witnessing firms may periodically commit rollups to an inexpensive public blockchain, providing an ultimate immutability guarantee. The blockchain is a "non-party"—infrastructure, not a participant in the transaction. This creates multiple verification paths:

1. **Startup domain** — Direct check against the issuer
2. **Witnessing firm** — Independent confirmation with timestamp
3. **Public blockchain** — Decentralized trust anchor via rollup inclusion

## Rationale

SAFEs are the "Digital Contracts" of the innovation economy. By turning them into verifiable digital bridges, we protect the integrity of the cap table and ensure that "Ownership" is based on the digital truth of the deal, not the creative editing of a founder.
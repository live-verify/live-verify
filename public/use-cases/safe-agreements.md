---
title: "SAFE Agreements (Simple Agreement for Future Equity)"
category: "Investment & Fintech"
volume: "Small"
retention: "Permanent (convertible security lifecycle)"
slug: "safe-agreements"
verificationMode: "clip"
tags: ["venture-capital", "startup-funding", "safe-agreement", "y-combinator", "convertible-equity", "cap-table-integrity", "investment-fraud", "equity-financing"]
furtherDerivations: 1
---

## What is a SAFE Agreement?

A Simple Agreement for Future Equity (SAFE) is the standard contract used by Silicon Valley startups to raise "Seed" capital. An investor gives the company cash now (e.g., $500,000) in exchange for the right to receive shares later, when the company raises a "Priced Round" (Series A). It is a convertible security governed by a Valuation Cap and a Discount Rate.

These documents are the "Keys to the Cap Table." Fraud is high-stakes: a founder might "edit" a SAFE to change a $10M valuation cap to a $20M cap before showing it to a new investor, effectively stealing equity from the original backer. Similarly, a founder might "hide" an existing SAFE to make the company look more attractive to a buyer. Verified hashes bind the Valuation Cap, Purchase Amount, and Investor Name to the startup's or the law firm's domain (e.g., `stripeatlas.com` or `ycombinator.com`).

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <span verifiable-text="start" data-for="safe"></span>
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
<span data-verify-line="safe">verify:verific.io/safe/v</span> <span verifiable-text="end" data-for="safe"></span>
</div>

## The Problem: Cap Table Padding Fraud

- **Valuation Cap Inflation:** Changing a "$5M cap" to a "$15M cap" on a PDF to trick a new investor into accepting a higher price.
- **Side Letter Hiding:** Removing a "Pro-Rata Right" or a "Most Favored Nation" (MFN) clause from a PDF before showing it to a buyer.
- **Duplicate Issuance:** Selling the same 10% of the company to two different investors using two separate SAFE documents.

## What Is Checked

Purchase amount, valuation cap (post-money or pre-money), discount rate, investor name, company name (jurisdiction), date of issuance, series ID, side letter status (Yes/No), board authorization ID, law firm file reference.

**Document Types:**
- **Post-Money SAFE:** The modern YC standard.
- **Pre-Money SAFE:** Used in older or specialized rounds.
- **Convertible Note:** (Linked hash) debt that converts to equity.
- **Pro-Rata Side Letter:** Proving the investor's right to maintain ownership.

## What the Checker Sees

Shows the issuer domain (`verific.io`, `ycombinator.com`, `stripe.com`) and the security standing.

**Status Indications:**
- **Outstanding / Valid** — The SAFE is authentic and awaiting conversion.
- **Converted** — This SAFE has already been converted into Series A Preferred stock.
- **Amended** — Terms have been changed via a subsequent agreement.
- **Rescinded** — The investment was returned or cancelled due to breach.

## Who Holds It

The Investor (second party) receives the SAFE from the startup (first party), keeps it, and may later hand it to third parties for various reasons, or never do so.

**Personal Record:** The investor has their own verified copy of the investment terms. Most of the time, the document sits in their portfolio files—the verification value is latent, there *if needed*.

**Peace of Mind:** The investor can confirm at any time that the SAFE matches what the startup's system recorded and hasn't been altered since issuance.

**Future Optionality:** If a dispute arises—whether about valuation caps, conversion terms, or side letters—the investor has cryptographic proof ready without needing to contact the startup or law firm.

## Who Checks It

The investor (second party) may hand the verified document to various third parties:

**M&A Law Firms (Due Diligence)**
During the acquisition of a startup, the buyer's lawyers receive verified hashes from all SAFE holders. This ensures that there are no "Hidden SAFEs" that will "pop up" and dilute the buyer after the deal closes.

**Secondary Markets (e.g., Forge / EquityZen)**
When trading a SAFE on a secondary platform, the seller provides the verified hash to the buyer. "Verified by Y Combinator" or "Verified by Wilson Sonsini" ensures the buyer that the terms of conversion are authentic and haven't been altered.

**Portfolio Auditors / Limited Partners (LPs)**
A VC fund's LPs receive verified hashes of all SAFEs in the portfolio during annual audits. Verification ensures that the startups haven't "quietly edited" the valuation caps in their internal files, protecting the fund's investment thesis.

**Banking Compliance (Source of Funds)**
When a startup opens a bank account after a $5M seed raise, they provide verified SAFE hashes to prove the legitimate venture capital source, preventing an AML (Anti-Money Laundering) account freeze.

## Who Issues It

**Issuer Types (First Party)**

- Startup ERPs (Carta, Pulley, AngelList)
- Startup Law Firms
- Venture Accelerators (Y Combinator, Techstars)

**Privacy Salt:** Required. Investment amounts and valuation caps are sensitive "Trade Secrets." While each SAFE contains unique combinations of dollar amounts, valuation caps, and investor names that provide some entropy, the strategic importance of these terms—and the risk that competitors could use enumeration to reverse-engineer funding rounds—means salt is essential. Salt protects both the startup's capital structure from market intelligence gathering and the investor's portfolio strategy from competitive analysis.

## Authority Chain

**Pattern:** Commercial

Issues SAFE investment documents

```
✓ legal.example-startup.com/safe/verify — Issues SAFE investment documents
```

Commercial issuer — self-authorized. Trust rests on the issuer's domain reputation.

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Jurisdictional Witnessing (Optional)

An independent witness layer may apply — see [Witnessing Third Parties](../../docs/WITNESSING-THIRD-PARTIES.md) for the full mechanism (what a witness receives, non-repudiation, optional public-blockchain rollups). For this use case: a witness would receive the startup's hashes and status changes plus structured metadata (amounts, valuation caps, discount rates, investor classes) — never plaintext (investor names, board resolutions, side letter details) — providing non-repudiation of the SAFE terms and an audit trail securities commissions can inspect.

## Rationale

SAFEs are the "Digital Contracts" of the innovation economy. By turning them into verifiable digital bridges, we protect the integrity of the cap table and ensure that "Ownership" is based on the digital truth of the deal, not the creative editing of a founder.
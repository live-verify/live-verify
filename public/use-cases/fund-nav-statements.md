---
title: "Fund NAV and Capital Account Statements"
category: "Investment & Fintech"
volume: "Medium"
retention: "7-10 years (tax, audit, dispute resolution)"
slug: "fund-nav-statements"
tags: ["hedge-fund", "private-equity", "nav-statement", "fund-administration", "wealth-management", "madoff-prevention", "asset-valuation", "reit", "pension", "endowment", "variable-annuity", "interval-fund", "bdc"]
furtherDerivations: 1
---

## What is an NAV Statement?

When you invest in a pooled vehicle that doesn't trade on a public exchange, you can't look up your balance on Yahoo Finance. Instead, you receive periodic **Net Asset Value (NAV)** statements telling you what your stake is worth.

This applies far beyond hedge funds:
- **Private equity and venture capital** — Quarterly capital account statements
- **Private REITs** — Non-traded real estate fund valuations
- **Pension funds** — Defined benefit plan asset reports
- **Endowments** — University and foundation consolidated valuations
- **Variable annuities** — Insurance subaccount statements
- **Interval funds and BDCs** — Semi-liquid alternative vehicles
- **401(k) plans** — Daily participant account statements

The common thread: **someone other than you is calculating what your money is worth**. If that someone is dishonest or incompetent, you won't know until it's too late.

In the **Bernie Madoff** scandal, the fraud was possible because Madoff wrote his own statements. A **Verified NAV Statement** must be issued by an independent administrator, custodian, or recordkeeper. Verified hashes ensure the numbers haven't been fabricated or altered.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <span verifiable-text="start" data-for="nav">[</span>
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;">CITCO FUND SERVICES
Independent Fund Administrator
═══════════════════════════════════════════════════════════════════

                MONTHLY CAPITAL ACCOUNT STATEMENT

Statement ID: NAV-992288-26

Fund:     Titan Alpha Hedge Fund, LP
Investor: Wayne Family Foundation

ACCOUNT SUMMARY
───────────────────────────────────────────────────────────────────
Period Ending:                                      March 31, 2026
NAV per Share:                                          $ 1,242.50
Ending Balance:                                    $ 12,500,000.00

Performance (MTD): +4.2%
Performance (YTD): +12.8%

This statement is issued by Citco as an independent third party.
Verification confirms the NAV and performance match the
administrator's official books and records.

</pre>
<span data-verify-line="nav">verify:citco.com/statements/v</span> <span verifiable-text="end" data-for="nav">]</span>
</div>

## Data Verified

Fund name, investor name, account ID, period end date, Net Asset Value (NAV) per share, total units/shares held, ending capital balance, management/performance fees deducted, monthly/yearly performance %, issuing administrator name.

**Document Types:**
- **Monthly Capital Account Statement:** For hedge funds/private equity.
- **NAV Notice:** Daily/weekly updates for liquid alts.
- **Audit Confirmation:** (Linked hash) for year-end verification.
- **K-1 Tax Statement:** Proving the reported income to the IRS.

## Data Visible After Verification

Shows the issuer domain (`citco.com`, `ssctech.com`, `apexgroup.com`) and the statement standing.

**Status Indications:**
- **Final** — Statement matches the administrator's official month-end close.
- **Preliminary** — Subject to final pricing of illiquid assets.
- **Audited** — Figures match the year-end report from a Big 4 auditor.
- **Restated** — **ALERT:** A prior error was found; this statement is outdated.

## Second-Party Use

The **Investor** (second party) receives the NAV statement from the fund administrator (first party), **keeps it**, and may later hand it to third parties for various reasons, or never do so.

**Personal Record:** They have their own verified copy of their fund valuation and performance. Most of the time, the statement sits in their investment files—the verification value is latent, there *if needed*.

**Peace of Mind:** They can confirm at any time that it matches what the independent administrator's system recorded and hasn't been altered—the key Madoff prevention mechanism.

**Future Optionality:** If a dispute arises—whether about performance calculations, fee deductions, or withdrawal rights—they have cryptographic proof ready without needing to contact the administrator.

## Third-Party Use

The investor (second party) may hand the verified document to various third parties:

**Prime Brokers / Lenders**
**Margin Calculation:** Instantly verifying the NAV of a fund's shares when those shares are pledged as collateral for a margin loan. Live Verify ensures the borrower hasn't "Edited" the PDF to show a 20% higher value.

**External Auditors**
**Portfolio Confirmation:** During a multi-family office audit, scanning the hashes of 50 different fund investments to ensure the consolidated wealth statement is accurate.

**Tax Authorities (IRS)**
**Wealth Audit:** Verifying the "Cost Basis" and "Fair Market Value" of private holdings during a high-value estate or income tax audit.

## Verification Architecture

**The "Phantom Fund" Fraud Problem**

- **Self-Administration Fraud:** Fund managers writing their own "Statements" on fake administrator letterhead to hide massive losses or theft (The Bernie Madoff Pattern).
- **Valuation Padding:** Editing a PDF to change an "Estimated" value of a private company into a "Final" verified high value.
- **Fee Hiding:** Removing the line item for "Performance Fees" to make the net return look higher to potential new investors.

**Issuer Types (First Party)**

- Third-Party Administrators (TPAs) — Citco, SS&C, Northern Trust, Apex
- Custodian Banks — BNY Mellon, State Street
- Big 4 Auditors — For the annual "Audited NAV" hash

**Privacy Salt:** Required. Unlike documents with many unpredictable variables, NAV statements often contain enumerable values—round dollar amounts, standard fund names, predictable quarterly reporting dates, and publicly known performance tiers. A competitor or malicious actor could feasibly enumerate combinations to reverse-engineer investor positions, fund sizes, or institutional allocations. Salt protects this sensitive financial intelligence from systematic discovery.

## Jurisdictional Witnessing

A jurisdiction may require fund administrators to retain a **witnessing firm** for regulatory compliance. The witnessing firm:

- Receives all hashes from the administrator, and any subsequent changes to the payload as they happen—which may manifest as a new hash, a status change (preliminary to final, or restated), or even a 404 (record deleted)
- Receives structured content/metadata (NAV per share, total balance, performance percentages, fee amounts, period dates)
- Does **NOT** receive plaintext (investor names, account numbers, detailed holdings)
- Provides an immutable, timestamped audit trail—available to the jurisdiction on demand, to investors/third parties during disputes, or as expert witness testimony in legal proceedings

This provides:
- **Non-repudiation:** Administrator cannot deny issuing the NAV or performance figures
- **Timestamp proof:** NAV existed at a specific time (critical for tax reporting and audits)
- **Regulatory audit:** SEC, state securities regulators, or foreign financial authorities can inspect the witness ledger for Madoff-style fraud detection
- **Resilience:** Verification works even if administrator's systems go down or the fund is liquidated

**Public Blockchain (Non-Party)**

Witnessing firms may periodically commit rollups to an inexpensive public blockchain, providing an ultimate immutability guarantee. The blockchain is a "non-party"—infrastructure, not a participant in the transaction. This creates multiple verification paths:

1. **Administrator domain** — Direct check against the issuer
2. **Witnessing firm** — Independent confirmation with timestamp
3. **Public blockchain** — Decentralized trust anchor via rollup inclusion

## Competition vs. Investor Portals

| Feature | Live Verify | Investor Portal (CitcoOne) | Scanned PDF Statement |
| :--- | :--- | :--- | :--- |
| **Trust Anchor** | **Domain-Bound.** Bound to the Administrator. | **System-Bound.** Trust the portal vendor. | **Zero.** Easily forged. |
| **Integrity** | **Cryptographic.** Binds every digit. | **High.** Direct DB access. | **Vulnerable.** |
| **User Access** | **Universal.** Share with any bank/auditor. | **Restricted.** Lenders never get portal access. | **Universal.** |
| **Madoff Protection** | **High.** Separates Manager from Admin. | **Medium.** Manager might control the portal. | **Zero.** |

**Why Live Verify wins here:** The "External Leverage" reality. High-end investors move their money based on paper/PDF statements shared with banks and lawyers. These third parties **do not have logins** to the fund's private administrator portal. Live Verify turns the **Private Statement** into a portable, cryptographically trusted asset that carries its own proof of truth.

---

## Beyond Hedge Funds: Other NAV-Dependent Vehicles

### Private REITs (Non-Traded Real Estate)

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 1px solid #ccc; background: #fff; padding: 0; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <div style="background: #1a472a; color: #fff; padding: 15px;">
    <div style="font-weight: bold; font-size: 1.1em;">BLACKSTONE REAL ESTATE INCOME TRUST</div>
    <div style="font-size: 0.8em; opacity: 0.8;">Quarterly Valuation Statement</div>
  </div>
  <div style="padding: 20px; font-size: 0.9em; line-height: 1.6;">
    <p><strong>Investor:</strong> Thompson Family Trust<br>
    <strong>Shares Held:</strong> 42,500<br>
    <strong>NAV per Share:</strong> $14.82<br>
    <strong>Total Value:</strong> $629,850.00<br>
    <strong>As of:</strong> December 31, 2025</p>
    <div style="margin-top: 15px; font-size: 0.8em; font-family: monospace; text-align: center; color: #666; border-top: 1px dashed #ccc; padding-top: 10px;">
      verify:breit.com/nav
    </div>
  </div>
</div>

**The Problem:** Non-traded REITs don't have market prices. The sponsor calculates NAV based on property appraisals—which they commission. Investors have seen NAVs suddenly drop 30% when independent auditors finally look at the books.

**Who Issues:** REIT sponsors, third-party valuation agents, independent appraisers.

---

### Pension Fund Valuations

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 1px solid #333; background: #fff; padding: 0;">
  <div style="background: #333; color: #fff; padding: 15px;">
    <div style="font-weight: bold;">CALPERS</div>
    <div style="font-size: 0.8em;">California Public Employees' Retirement System</div>
  </div>
  <div style="padding: 20px; font-size: 0.9em; line-height: 1.6;">
    <p><strong>Plan:</strong> Miscellaneous Tier 2<br>
    <strong>Employer:</strong> City of Sacramento<br>
    <strong>Funded Status:</strong> 78.4%<br>
    <strong>Actuarial Value of Assets:</strong> $4.2B<br>
    <strong>Valuation Date:</strong> June 30, 2025</p>
    <div style="margin-top: 15px; font-size: 0.8em; font-family: monospace; text-align: center; color: #666; border-top: 1px dashed #ccc; padding-top: 10px;">
      verify:calpers.ca.gov/valuations
    </div>
  </div>
</div>

**The Problem:** Pension funding ratios determine contribution requirements, benefit security, and municipal bond ratings. Actuarial assumptions (discount rates, mortality tables) can be manipulated to hide underfunding. Verification confirms the numbers came from the actual actuary of record.

**Who Issues:** Plan actuaries, pension administrators, state retirement systems.

**Third-Party Use:** Municipal bond analysts, union negotiators, legislators, retirees concerned about benefit security.

---

### University Endowments

<div style="max-width: 600px; margin: 24px auto; font-family: serif; border: 2px solid #8B0000; background: #fffef5; padding: 0;">
  <div style="background: #8B0000; color: #fff; padding: 15px; text-align: center;">
    <div style="font-weight: bold; font-size: 1.2em;">HARVARD MANAGEMENT COMPANY</div>
    <div style="font-size: 0.85em;">Endowment Valuation Report</div>
  </div>
  <div style="padding: 20px; font-size: 0.9em; line-height: 1.6;">
    <p><strong>Fiscal Year End:</strong> June 30, 2025<br>
    <strong>Total Endowment:</strong> $53.2 billion<br>
    <strong>Annual Return:</strong> +9.6%<br>
    <strong>Distribution to University:</strong> $2.1 billion</p>
    <div style="margin-top: 15px; font-size: 0.8em; font-family: monospace; text-align: center; color: #666; border-top: 1px dashed #ccc; padding-top: 10px;">
      verify:hmc.harvard.edu/annual
    </div>
  </div>
</div>

**The Problem:** Endowments hold illiquid alternatives (PE, VC, real assets) that are hard to value. Performance can be smoothed or inflated. Donors want to know their gifts are being managed honestly; regulators (especially for tax-exempt status) want accurate reporting.

**Who Issues:** University investment offices, outsourced CIOs (like TIFF, Commonfund), external auditors.

**Third-Party Use:** Major donors, accreditation bodies, state attorneys general (for charitable oversight), prospective faculty (endowment size signals institutional stability).

---

### Variable Annuities & Unit-Linked Insurance

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 1px solid #0066cc; background: #fff; padding: 0;">
  <div style="background: #0066cc; color: #fff; padding: 15px;">
    <div style="font-weight: bold;">PRUDENTIAL ANNUITIES</div>
    <div style="font-size: 0.8em;">Quarterly Contract Statement</div>
  </div>
  <div style="padding: 20px; font-size: 0.9em; line-height: 1.6;">
    <p><strong>Contract Owner:</strong> Margaret Chen<br>
    <strong>Contract #:</strong> VA-8827744<br>
    <strong>Subaccount:</strong> Balanced Growth Portfolio<br>
    <strong>Accumulation Value:</strong> $387,500.00<br>
    <strong>Death Benefit:</strong> $425,000.00<br>
    <strong>As of:</strong> March 31, 2026</p>
    <div style="margin-top: 15px; font-size: 0.8em; font-family: monospace; text-align: center; color: #666; border-top: 1px dashed #ccc; padding-top: 10px;">
      verify:prudential.com/annuity
    </div>
  </div>
</div>

**The Problem:** Variable annuity values depend on subaccount performance, rider guarantees, and complex fee structures. Policyholders often don't understand what they own. Verification confirms the insurer's official valuation—critical when claiming death benefits or exercising guaranteed withdrawal rights.

**Who Issues:** Insurance companies, separate account administrators.

**Third-Party Use:** Estate executors (claiming death benefits), divorce attorneys (valuing marital assets), elder law attorneys (Medicaid planning).

---

### Interval Funds & Business Development Companies (BDCs)

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 1px solid #555; background: #fff; padding: 0;">
  <div style="background: #555; color: #fff; padding: 15px;">
    <div style="font-weight: bold;">ARES CAPITAL CORPORATION</div>
    <div style="font-size: 0.8em;">Quarterly NAV Statement</div>
  </div>
  <div style="padding: 20px; font-size: 0.9em; line-height: 1.6;">
    <p><strong>Shareholder:</strong> Riverside Wealth Advisors (FBO clients)<br>
    <strong>Shares:</strong> 15,000<br>
    <strong>NAV per Share:</strong> $19.42<br>
    <strong>Total Value:</strong> $291,300.00<br>
    <strong>Repurchase Offer:</strong> 5% at NAV, Q2 2026</p>
    <div style="margin-top: 15px; font-size: 0.8em; font-family: monospace; text-align: center; color: #666; border-top: 1px dashed #ccc; padding-top: 10px;">
      verify:arescapitalcorp.com/nav
    </div>
  </div>
</div>

**The Problem:** Interval funds and BDCs offer limited liquidity (quarterly repurchase offers at NAV). Investors need verified NAV to know their true exit price. Managers have incentive to inflate NAV before repurchase windows.

**Who Issues:** Fund administrators, BDC management companies, board-appointed valuation committees.

---

### 401(k) and Defined Contribution Plans

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 1px solid #2e7d32; background: #fff; padding: 0;">
  <div style="background: #2e7d32; color: #fff; padding: 15px;">
    <div style="font-weight: bold;">FIDELITY INVESTMENTS</div>
    <div style="font-size: 0.8em;">Quarterly Retirement Account Statement</div>
  </div>
  <div style="padding: 20px; font-size: 0.9em; line-height: 1.6;">
    <p><strong>Participant:</strong> James Rodriguez<br>
    <strong>Employer Plan:</strong> Acme Corp 401(k)<br>
    <strong>Total Balance:</strong> $284,500.00<br>
    <strong>Vested Balance:</strong> $267,200.00<br>
    <strong>YTD Contributions:</strong> $15,500.00<br>
    <strong>As of:</strong> March 31, 2026</p>
    <div style="margin-top: 15px; font-size: 0.8em; font-family: monospace; text-align: center; color: #666; border-top: 1px dashed #ccc; padding-top: 10px;">
      verify:netbenefits.fidelity.com/stmt
    </div>
  </div>
</div>

**The Problem:** 401(k) statements are used for loan applications, divorce proceedings, and retirement planning. Fabricated statements can overstate wealth for credit purposes or hide assets in divorce. Verification confirms the recordkeeper's actual data.

**Who Issues:** Plan recordkeepers (Fidelity, Vanguard, Empower, TIAA).

**Third-Party Use:** Mortgage lenders (verifying retirement assets), divorce attorneys, QDRO administrators, DOL auditors.

---

### Venture Capital & Growth Equity

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 1px solid #6a1b9a; background: #fff; padding: 0;">
  <div style="background: #6a1b9a; color: #fff; padding: 15px;">
    <div style="font-weight: bold;">SEQUOIA CAPITAL FUND XVII</div>
    <div style="font-size: 0.8em;">Limited Partner Capital Account Statement</div>
  </div>
  <div style="padding: 20px; font-size: 0.9em; line-height: 1.6;">
    <p><strong>Limited Partner:</strong> Yale Investments Office<br>
    <strong>Commitment:</strong> $100,000,000<br>
    <strong>Contributed:</strong> $78,500,000<br>
    <strong>Distributed:</strong> $42,000,000<br>
    <strong>Remaining Value:</strong> $156,000,000<br>
    <strong>Net IRR:</strong> 28.4%<br>
    <strong>As of:</strong> December 31, 2025</p>
    <div style="margin-top: 15px; font-size: 0.8em; font-family: monospace; text-align: center; color: #666; border-top: 1px dashed #ccc; padding-top: 10px;">
      verify:sequoiacap.com/lp
    </div>
  </div>
</div>

**The Problem:** VC fund valuations rely on "marks" of private companies—often based on the last funding round, which may be stale or inflated. LPs use these valuations for their own reporting (endowments, pensions, fund-of-funds). Verification confirms the GP's official marks, even if the underlying valuations are debatable.

**Who Issues:** GP fund administrators, third-party administrators (Juniper Square, Carta).

**Third-Party Use:** LP internal auditors, secondary market buyers (pricing LP stakes), regulatory filings.

---

### Commodity Pools & Managed Futures (CTAs)

<div style="max-width: 600px; margin: 24px auto; font-family: 'Courier New', monospace; border: 1px solid #bf360c; background: #fff; padding: 0;">
  <div style="background: #bf360c; color: #fff; padding: 15px;">
    <div style="font-weight: bold;">WINTON GROUP</div>
    <div style="font-size: 0.8em;">Monthly Performance Statement</div>
  </div>
  <div style="padding: 20px; font-size: 0.85em; line-height: 1.6;">
    <p><strong>Account:</strong> Diversified Trend Strategy<br>
    <strong>Investor:</strong> Meridian Family Office<br>
    <strong>NAV:</strong> $5,284,000.00<br>
    <strong>MTD Return:</strong> +2.8%<br>
    <strong>YTD Return:</strong> +11.4%<br>
    <strong>Period:</strong> March 2026</p>
    <div style="margin-top: 15px; font-size: 0.8em; text-align: center; color: #666; border-top: 1px dashed #ccc; padding-top: 10px;">
      verify:winton.com/statements
    </div>
  </div>
</div>

**The Problem:** CTAs trade futures and derivatives with high leverage. Performance can swing wildly, and historical track records are used to market to new investors. Verification confirms statements match the administrator's books—critical given the history of CTA performance fabrication.

**Who Issues:** Commodity pool operators, NFA-registered administrators, FCMs (futures commission merchants).

---

### Fund of Funds & Multi-Manager Platforms

These vehicles add a layer of complexity: the fund-of-funds NAV depends on underlying fund NAVs, which may themselves be estimated or delayed.

**The Problem:** A fund-of-funds reports a consolidated NAV, but the underlying hedge funds report with lags (some monthly, some quarterly). Verification confirms the FoF's reported number matches its administrator's calculation—even if underlying values are "best available."

**Who Issues:** FoF administrators, multi-family offices, OCIO (outsourced CIO) providers.

---

## The Common Pattern

| Vehicle Type | Valuation Frequency | Who Calculates | Why Verification Matters |
|--------------|--------------------|--------------------|--------------------------|
| Hedge funds | Monthly/Quarterly | Third-party admin | Madoff prevention |
| Private equity/VC | Quarterly | GP or admin | LP secondary sales, reporting |
| Private REITs | Quarterly | Sponsor/appraiser | Illiquid, sponsor conflicts |
| Pension funds | Annual | Actuary | Funding requirements, benefits |
| Endowments | Annual | Investment office | Donor confidence, oversight |
| Variable annuities | Daily/Quarterly | Insurer | Death benefits, guarantees |
| Interval funds/BDCs | Quarterly | Fund admin | Repurchase pricing |
| 401(k) plans | Daily | Recordkeeper | Loans, divorce, portability |
| CTAs/Commodity pools | Monthly | FCM/Admin | Track record verification |
| Fund of funds | Monthly/Quarterly | FoF admin | Aggregation accuracy |

In every case, the investor depends on **someone else's math**. Verified NAV statements let them prove that math came from the right source and hasn't been altered.

---

## Privacy Note: What Verification Does NOT Return

Unlike ID cards (where photo return defeats cloning), NAV verification **must not return the actual valuation**. The response confirms authenticity, not contents:

| Verification Returns | Verification Does NOT Return |
|---------------------|------------------------------|
| "Valid" / "Superseded" / "Restated" | The dollar amount |
| Document issue date | Account holder name |
| Statement status | Fund positions or allocations |

**Why:** Financial privacy. If anyone who scans a statement could query the administrator and receive "$12.5 million NAV," it would create a target list for criminals, let competitors map fund sizes, and violate basic confidentiality.

The document holder already has the numbers — verification just proves those numbers came from the administrator and haven't been altered. The verifier (bank, auditor, attorney) sees the document; verification confirms it's real.

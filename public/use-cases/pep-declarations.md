---
title: "PEP Declarations (Politically Exposed Persons)"
category: "Professional Ethics & Compliance"
volume: "Medium"
retention: "5-10 years post-relationship (AML requirement)"
slug: "pep-declarations"
verificationMode: "clip"
tags: ["aml", "kyc", "pep", "politically-exposed", "enhanced-due-diligence", "corruption-prevention", "onboarding-compliance", "financial-crime"]
furtherDerivations: 1
---

## What is a PEP Declaration?

In the banking and wealth management industries, a **Politically Exposed Person (PEP)** is an individual who holds (or has held) a high-profile public position, such as a Minister, Judge, or Senior Military Officer. Because PEPs have access to public funds, they are considered "High Risk" for money laundering and bribery. A **PEP Declaration** is the formal document where a client swears their status.

These declarations are the "Compliance Shield" for a bank. Fraud is common in the "Private Banking" sector: high-risk individuals often "falsely deny" their PEP status on a PDF form to bypass **Enhanced Due Diligence (EDD)** and hide their wealth from regulators. Verified hashes bind the **Subject Name, Official Role, and Source of Wealth Summary** to the institution's or the compliance agency's domain (e.g., `refinitiv.com` or `privatebank.com`).

<div style="max-width: 650px; margin: 24px auto; font-family: sans-serif; border: 2px solid #8B0000; background: #fff; padding: 0; box-shadow: 0 4px 12px rgba(0,0,0,0.1); overflow: hidden;">
  <div style="background: #8B0000; color: #fff; padding: 20px; display: flex; justify-content: space-between; align-items: center;">
    <div>
      <div style="font-weight: bold; font-size: 1.2em;"><span verifiable-text="start" data-for="pep"></span>PEP / EDD DECLARATION</div>
      <div style="font-size: 0.8em; opacity: 0.9; text-transform: uppercase; letter-spacing: 1px;">Compliance Risk Management</div>
    </div>
    <div style="font-size: 2em;">🏦</div>
  </div>
<div style="padding: 25px; font-size: 0.95em; line-height: 1.6; color: #333;">
    <div style="display: flex; justify-content: space-between; margin-bottom: 25px; border-bottom: 1px solid #eee; padding-bottom: 15px;">
      <div>
        <strong>Individual:</strong> ALEXANDER VOLKOV<br>
        <strong>Nationality:</strong> [Redacted]<br>
        <strong>DOB:</strong> [Verified/Redacted]
      </div>
      <div style="text-align: right;">
        <strong>Ref:</strong> PEP-2026-042-XJ<br>
        <strong>Date:</strong> 15 MAR 2026
      </div>
    </div>
<div style="background: #fff5f5; border: 1px solid #ffcdd2; padding: 15px; border-radius: 4px; margin-bottom: 20px;">
      <p style="margin: 0; font-weight: bold; color: #8B0000;">THE UNDERSIGNED HEREBY DECLARES:</p>
      <p style="margin: 10px 0 0;">☑ I AM a Politically Exposed Person (PEP)</p>
      <p style="margin: 10px 0 0;"><strong>Official Role:</strong> Deputy Minister of Transport, [Country]</p>
      <p style="margin: 5px 0 0;"><strong>Period:</strong> 2018 – Present</p>
      <p style="margin: 5px 0 0;"><strong>Primary Source of Wealth:</strong> Declared Family Inheritance</p>
    </div>
<p style="font-size: 0.85em; font-style: italic; color: #666; text-align: center;">
      "I confirm this information is true and complete. I will notify the firm of any material changes to my PEP status."
    </p>
  </div>
<div style="padding: 20px; background: #f9f9f9; border-top: 1px dashed #8B0000; text-align: center;">
    <div data-verify-line="pep" style="font-family: 'Courier New', monospace; font-size: 0.85em; color: #000; font-weight: bold;"
      title="Demo only: Banks don't yet offer verification&#10;endpoints, so this is illustrative">
      verify:privatbank-kyc.com/v <span verifiable-text="end" data-for="pep"></span>
    </div>
    <div style="font-size: 0.7em; color: #777; margin-top: 10px;">
      Scan to verify declaration integrity, role classification, and Enhanced Due Diligence (EDD) status. Access restricted to authorized compliance officers.
    </div>
  </div>
</div>

## Data Verified

Individual name, date of birth (masked), PEP classification (Yes/No), specific public role/title, country of influence, relationship type (e.g., Self, Family, Close Associate), source of wealth summary, date of declaration, compliance officer ID, institution name.

**Document Types:**
- **PEP Self-Declaration:** The primary client disclosure.
- **Enhanced Due Diligence (EDD) Report:** The bank's internal verification.
- **Source of Wealth Attestation:** Proof of where the money originated.
- **Close Associate Disclosure:** (Linked hash) listing business partners.

## Data Visible After Verification

Shows the issuer domain (`privatebank.com`, `world-check.com`, `dowjones.com`) and the risk standing.

**Status Indications:**
- **Confirmed / Filed** — The declaration matches the institution's official AML audit trail.
- **Updated Status** — **ALERT:** The subject's PEP status has changed (e.g., new government appointment).
- **Under Review** — **ALERT:** The reported source of wealth is being audited by the bank.
- **Relationship Ended** — **ALERT:** The firm has exited this relationship due to risk.

## Second-Party Use

The **Client / Declarant** benefits from verification.

**Portability of Trust:** When opening a second account at a global bank (e.g., HSBC in London after having an account in New York), the client can provide the verified "PEP Hash" from their first institution. The new bank can instantly see **"VERIFIED PEP - CLEAR SOURCE OF WEALTH"** on their phone, allowing the onboarding to proceed without 3 months of redundant manual investigation.

**Liability Defense:** If a client is later accused of "hiding" their status, they can use the verified, timestamped hash to prove they made a full and honest disclosure to the bank years earlier.

## Third-Party Use

**Intermediate Correspondent Banks**
**Transaction Monitoring:** When a $5M wire moves through a correspondent bank, the bank scans the verified PEP hashes attached to the file. Verification ensures that the "EDD Check" was actually performed by a reputable institution and hasn't been "Faked" to bypass sanctions.

**Regulatory Auditors (e.g., FCA / FinCEN)**
**Thematic Review:** During a surprise audit, the regulator can scan random PEP declarations. Live Verify ensures the bank isn't "Providing higher-quality declarations to the regulator" than they are "Actually collecting from clients," stopping "Backdated Disclosure" fraud.

**Venture Capital / M&A**
**Board Vetting:** Verifying the "Political Risk" of a target company's founders or board members before a major acquisition.

## Verification Architecture

**The "Self-Denial" Fraud Problem**

- **Status Masking:** Manually editing a "YES" to a "NO" on a PDF declaration to avoid the "High-Risk" label.
- **Role Omission:** Removing a line that mentions being a "Family Member" of a sanctioned official.
- **Source-of-Wealth Padding:** Changing "Casino Earnings" to "Family Inheritance" on a PDF before showing it to a second bank.

**Issuer Types** (First Party)

**Global Transaction Banks.**
**Specialized KYC Providers (Refinitiv, Dow Jones).**
**National Financial Intelligence Units (FIUs).**

**Privacy Salt:** Highly Critical. PEP status and wealth data are extremely sensitive legal data. The hash must be salted and access restricted to authorized compliance and regulatory IP ranges.

## Authority Chain

**Pattern:** Regulated

Regulated financial institutions maintain verified PEP declarations under FCA oversight for anti-money laundering compliance and enhanced due diligence.

```
✓ compliance.example-bank.co.uk/pep/verify — Issues verified PEP declarations
  ✓ fca.org.uk/register — Regulates UK financial crime prevention
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Rationale

PEP compliance is the "First Line of Defense" against global corruption. By turning declarations into verifiable digital bridges, we ensure that the "Gatekeepers of Wealth" are held to the digital truth of the disclosure, protecting the financial system from the multi-billion dollar cost of hidden political risk.

## Jurisdictional Equivalents

| | UK | US | EU |
|---|---|---|---|
| **Authority** | FCA (Financial Conduct Authority) | FinCEN / federal banking regulators | National competent authority (e.g., BaFin, AMF, Banca d'Italia) |
| **Document** | PEP declaration under MLR 2017; includes domestic PEPs | No statutory PEP declaration; guidance-based screening (FFIEC BSA/AML Manual) | PEP declaration per 4MLD/5MLD; includes domestic PEPs |
| **Legal basis** | Money Laundering Regulations 2017 (MLR 2017); FCA Handbook | Bank Secrecy Act; FinCEN CDD Rule (31 CFR 1010.230); FFIEC guidance | 4th/5th Anti-Money Laundering Directives (4MLD/5MLD); FATF Recommendations |
| **Potential verify: domain** | `pep.fca.org.uk/v` | `fincen.gov/pep/v` | `bafin.de/pep/v` (varies by state) |
| **Key difference** | Statutory definition covering domestic and foreign PEPs; regulated firms must apply EDD | No single statutory PEP definition — screening relies on regulatory guidance and commercial databases | Harmonised definition across member states via directives; domestic PEPs included since 4MLD |

**Further Jurisdictional Peers**

- **Australia:** AUSTRAC AML/CTF Rules; PEP = "foreign PEP" or "domestic PEP" since 2016
- **Canada:** PCMLTFA — PEP includes foreign and domestic since 2014 amendments
- **Singapore:** MAS Notice 626 (banks) — PEP screening required for all customers
- **Japan:** JAFIC guidelines; PEP screening required under Act on Prevention of Transfer of Criminal Proceeds
- **Switzerland:** FINMA Anti-Money Laundering Ordinance — PEPs treated as higher-risk
- **Hong Kong:** HKMA/SFC guidelines — PEP screening required; FATF aligned

**Bribery & Corruption**

PEP screening exists primarily as an anti-corruption control — identifying individuals whose public positions create bribery risk.

- **UK:** Bribery Act 2010 — s.6 specifically criminalises bribery of foreign public officials; s.7 creates corporate "failure to prevent" liability. PEP screening is the frontline control that operationalises the Act's intent
- **US:** Foreign Corrupt Practices Act 1977 (FCPA) — extraterritorial reach covering any company with US nexus; DOJ and SEC jointly enforce. PEP screening in US financial institutions is largely driven by FCPA compliance, not just BSA/AML
- **OECD:** Anti-Bribery Convention (1997) — 44 signatory countries commit to criminalising bribery of foreign public officials; compliance monitored via peer review by the OECD Working Group on Bribery
- **France:** Sapin II Law (2016) — created the Agence Française Anticorruption (AFA); mandates anti-corruption compliance programs for companies with 500+ employees or €100M+ revenue, including PEP and bribery risk mapping
- **Germany:** No standalone bribery act — anti-bribery provisions sit within Criminal Code §§299, 331–335; limited extraterritorial reach compared to UK Bribery Act or US FCPA, though EU Anti-Corruption Directive proposals may change this
- **Australia:** Criminal Code Act 1995 Division 70 (foreign bribery); National Anti-Corruption Commission (NACC, est. 2023) provides federal-level anti-corruption oversight for the first time
- **Canada:** Corruption of Foreign Public Officials Act 1999 (CFPOA) — RCMP enforcement; amended 2013 to remove "facilitation payments" exception
- **Singapore:** Prevention of Corruption Act (PCA) — enforced by the Corrupt Practices Investigation Bureau (CPIB); extremely strict enforcement with criminal penalties for both giver and receiver of bribes
- **Japan:** Unfair Competition Prevention Law (UCPL) covers foreign bribery; relatively few prosecutions historically, though enforcement is increasing under OECD peer review pressure
- **Switzerland:** Swiss Criminal Code Art. 322ter–322octies; prosecution of bribery of foreign officials since 2000; Switzerland's financial centre role makes its anti-corruption enforcement globally significant
- **Note:** Transparency International's Corruption Perceptions Index (CPI) provides a different lens from AML risk rankings — countries perceived as least corrupt (Denmark, Finland, New Zealand, Singapore) typically maintain the strongest anti-corruption frameworks, and their PEP screening regimes reflect this

**Unexplained Wealth & Asset Recovery**

PEPs are the primary targets of unexplained wealth orders and kleptocracy enforcement — public officials and their associates who accumulate disproportionate wealth are subject to asset recovery mechanisms that reverse the burden of proof.

- **Asset recovery nexus:** PEP declarations identify the individuals most likely to be subject to unexplained wealth investigations — public officials and their associates who accumulate disproportionate wealth are the primary targets of UWOs, civil forfeiture, and kleptocracy enforcement
- **UK:** UWOs are specifically designed for PEPs — Criminal Finances Act 2017 s.362A(3)(b) allows UWOs against anyone who is a PEP or connected to a PEP; PEP declarations in banks directly inform UWO investigations
- **US:** DOJ Kleptocracy Initiative targets foreign PEPs who acquire US assets with corrupt proceeds; FCPA enforcement against companies that facilitated PEP corruption
- **EU:** Proposed Asset Recovery Directive would allow non-conviction-based confiscation of PEP assets across all member states
- **Australia:** Foreign PEPs are a specific category under AML/CTF Rules; ACIC unexplained wealth referrals increasingly target foreign PEP-linked assets in Australian real estate
- **International:** UNCAC Art. 52 requires enhanced scrutiny of PEP financial activities; Mutual Legal Assistance Treaties (MLATs) enable cross-border PEP asset freezing

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

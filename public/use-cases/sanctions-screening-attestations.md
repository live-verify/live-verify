---
title: "Sanctions and Restricted Party Screening Attestations"
category: "Financial Compliance"
volume: "Very Large"
retention: "5-7 years (OFAC / AML regulatory requirement)"
slug: "sanctions-screening-attestations"
verificationMode: "clip"
tags: ["sanctions-screening", "ofac-compliance", "kyc", "aml", "restricted-party", "export-compliance", "trade-integrity", "compliance-audit"]
furtherDerivations: 1
---

## What is a Sanctions Attestation?

In global finance and trade, every transaction must be checked against **Sanctions Lists** (e.g., OFAC SDN, UN Security Council, EU Consolidated List). A **Sanctions Screening Attestation** is the formal document where a bank, exporter, or payment processor proves they checked a specific person or company and found "No Matches."

These documents are the "Legal Safe Harbor" for high-value trade. Fraud is high-stakes: a company might "edit" a screening report to hide that their customer is actually a sanctioned oligarch or a prohibited defense entity. Similarly, a bank might use an outdated "Snapshot" from 2023 to hide a sanction designated in 2025. Verified hashes bind the **Subject Name, Lists Searched, and Dataset Timestamp** to the screening provider's domain (e.g., `dowjones.com` or `refinitiv.com`).

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="sanc"></span>DOW JONES RISK & COMPLIANCE
Official Screening Attestation
═══════════════════════════════════════════════════════════════════

Subject:       GLOBAL PETROLEUM TRADING LTD.
Jurisdiction:  Dubai, UAE               Screening ID: DJ-2026-8844-XJ
Entity ID:     AE-99228877              Date/Time:    15 MAR 2026 14:32:01

                      Result: NO MATCH FOUND

DATASETS VERIFIED
───────────────────────────────────────────────────────────────────
- US OFAC: Specially Designated Nationals (SDN) - Verified 15-MAR
- UN Security Council: Consolidated Sanctions List - Verified 15-MAR
- EU FS: Consolidated List of Persons & Entities - Verified 15-MAR
- UK HMT: Consolidated List of Financial Sanctions - Verified 15-MAR

This attestation confirms that the subject was screened against
the datasets above with 100% fuzzy-match threshold. Verification
confirms report integrity at the timestamp of issuance.

<span data-verify-line="sanc">verify:dowjones.com/v</span> <span verifiable-text="end" data-for="sanc"></span></pre>
</div>

## Data Verified

Screening ID, subject name (individual or entity), aliases checked, date of birth / registration #, datasets searched (e.g., OFAC, UN), match threshold (percentage), screening date/timestamp, dataset version ID, result status (No Match / True Match / False Positive), screening officer name.

**Document Types:**
- **Sanctions Attestation:** The 1-page "Clear" certificate.
- **Enhanced Due Diligence (EDD) Report:** The deep-dive investigation.
- **KYC Compliance Packet:** (Linked hash) the full onboarding file.
- **Exclusion Clearance:** Specifically for health/government programs.

## Data Visible After Verification

Shows the issuer domain (`dowjones.com`, `refinitiv.com`, `lexisnexis.com`) and the compliance standing.

**Status Indications:**
- **Verified / Clear** — Report matches the original screening event; no matches found.
- **True Match Detected** — **CRITICAL:** A subsequent list update has flagged this subject as sanctioned.
- **Stale Data** — **ALERT:** The datasets used for this screening are more than 24 hours old.
- **Amended Report** — **ALERT:** The result has been updated (e.g., from No-Match to False-Positive).

## Second-Party Use

The **Compliance Department / Exporter** benefits from verification.

**Bank Account Approval:** When a global company opens a new branch office, they provide verified "Sanctions Hashes" for their directors to the local bank. "Verified by Dow Jones" allows the bank to trust the Director's "Clean History" instantly, bypassing the 30-day "Onboarding Delay."

**Export Clearance:** Before shipping high-end hardware, an exporter provides verified hashes of the buyer's screening to US Customs (BIS). Verification ensures that the buyer isn't a "Restricted Party," protecting the exporter from multi-million dollar fines and criminal charges.

## Third-Party Use

**Intermediate Correspondent Banks**
**Transaction Clearing:** When a $10M wire moves through a bank, they scan the verified sanctions hashes attached to the payment. Verification ensures that the "Director Check" was actually performed by a reputable provider and hasn't been "Faked" to hide a money-laundering source.

**Government Regulators (OFAC / Treasury)**
**Thematic Review:** During a compliance audit, the regulator can scan random attestation hashes. Live Verify ensures the institution isn't "Cherry-Picking" lists or using older, "Cleaner" datasets to hide problematic customers.

**Venture Capital Investors**
**Investment Vetting:** Verifying the "Sanctions Health" of a target startup's cap table before making a major equity investment.

## Verification Architecture

**The "List Trimming" Fraud Problem**

- **List Omission:** Manually removing the "UK Sanctions" list from a PDF report because the subject *is* on that list but not on the US list.
- **Dataset Manipulation:** Changing a 2024 timestamp to 2026 to hide that the screening is 2 years out of date.
- **Name Spoofing:** Screening a "lookalike" name (e.g., removing a middle initial) to avoid a "True Match" trigger.

**Issuer Types** (First Party)

**Compliance Data Providers (Dow Jones, World-Check).**
**Reg-Tech Platforms (ComplyAdvantage).**
**Internal Corporate Compliance Portals.**

**Privacy Salt:** Highly Critical. Sanctions screening involves highly sensitive PII and "Negative List" data. The hash must be salted and access restricted to authorized compliance personnel.

## Authority Chain

**Pattern:** Regulated

Banks and compliance officers issue sanctions screening attestations and are regulated by the UK Financial Conduct Authority under the UK sanctions and anti-money laundering framework.

```
✓ compliance.example-bank.co.uk/sanctions-attest/verify — Bank compliance department issuing sanctions screening confirmations
  ✓ fca.org.uk/register — Regulates UK financial crime prevention
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Rationale

Sanctions compliance is the "First Line of Financial Defense." By turning attestations into verifiable digital bridges, we ensure that global trade is transparent and that "Clean Status" is backed by the real-time cryptographic truth of the world's most critical risk databases.

## Jurisdictional Equivalents

| | UK | US | EU |
|---|---|---|---|
| **Authority** | OFSI (HM Treasury) | OFAC (US Treasury) | EU Council / member state competent authorities |
| **Document** | Sanctions screening attestation | Sanctions screening attestation | Sanctions screening attestation |
| **Legal basis** | SAMLA 2018; Sanctions and Anti-Money Laundering Act | IEEPA; various Executive Orders | EU Council Regulations (e.g., Reg 269/2014 for Russia) |
| **Primary list** | OFSI Consolidated List | OFAC SDN List | EU Consolidated List of Persons, Groups and Entities |
| **Key difference** | Single consolidated list maintained by HM Treasury; screening required for all UK persons | Extraterritorial reach — non-US firms dealing in USD also need OFAC compliance | Implemented via EU Council Regulations; each member state enforces domestically |

**Further Jurisdictional Peers**

- **Australia:** DFAT Consolidated List under the Autonomous Sanctions Act 2011 + UN sanctions implemented domestically. AUSTRAC oversees AML/CTF compliance.
- **Canada:** OSFI Consolidated List under SEMA (Special Economic Measures Act), UNA (United Nations Act), and JVCFOA (Justice for Victims of Corrupt Foreign Officials Act).
- **Singapore:** MAS sanctions lists; UN sanctions implemented via domestic regulations under the Monetary Authority of Singapore Act.
- **Japan:** METI/MOF/FSA sanctions lists under FEFTA (Foreign Exchange and Foreign Trade Act). Screening obligations enforced across financial institutions.
- **Switzerland:** SECO sanctions list under the Embargo Act. Swiss financial institutions must screen against both SECO and international lists.
- **Hong Kong:** UNSO (United Nations Sanctions Ordinance) implemented lists. HKMA supervises screening compliance for authorized institutions.

**Counter-Terrorist Financing (CTF)**

Screening against terrorist designation lists differs fundamentally from general sanctions screening — terrorist designations use lower evidentiary thresholds, require alias and associate coverage, and trigger distinct legal liabilities.

- **Evidentiary threshold:** Terrorist designations are made on intelligence grounds (often classified), not criminal conviction. Screening must therefore cover aliases, associated entities, and geographic risk indicators more aggressively than for general sanctions — a near-miss on a terrorist list demands more investigation than a near-miss on a trade sanctions list.
- **US:** SDN list terrorist entries carry "material support" liability under *18 USC §2339B* — this is strict liability, meaning even inadvertent support is criminal. This is a fundamentally higher risk than general sanctions violations.
- **UK:** The Home Office *Proscribed Organisations List* (terrorist groups) is separate from the OFSI financial sanctions list. Screening must cover both lists independently — a firm could be compliant with OFSI but in breach of the *Terrorism Act 2000* if it only screens one.
- **EU:** *CP 931* (the political terrorist designation list) and EU Sanctions Regulations (the legal enforcement instrument) operate as two parallel systems — firms must understand which list triggered a match because the legal consequences and challenge mechanisms differ.
- **FATF:** The original *Special Recommendations on Terrorist Financing (SR.I-IX)*, now integrated into the main FATF Recommendations, set the global standard for CTF screening obligations — jurisdictions that fail FATF mutual evaluation on CTF face greylisting regardless of AML compliance.

**Sanctions Evasion**

Screening attestations are only as effective as their ability to detect evasion — sanctions evaders actively work to defeat screening systems through name manipulation, ownership obfuscation, and intermediary use.

- **Screening challenges for evasion detection:** Name variations and transliterations (Cyrillic, Arabic, Chinese romanisation), complex ownership chains designed to obscure ultimate beneficial ownership, vessel re-flagging to evade maritime sanctions, and use of intermediaries and front companies that are not themselves designated.
- **OFAC 50% rule implications:** Effective screening must trace ultimate beneficial ownership, not just direct counterparties. A clean screening result against an entity name is meaningless if that entity is 50%+ owned by a designated person — screening systems must integrate ownership data, not just name-matching.
- **Dual-use goods screening:** The BIS Entity List (US) and EU Dual-Use Regulation impose export control screening obligations that run parallel to financial sanctions screening. Firms must screen against both financial sanctions lists and export control lists — a gap in either creates evasion opportunities, particularly for technology and industrial goods.
- **Consolidated screening complexity:** Many firms screen against 50+ lists simultaneously (OFAC SDN, OFAC non-SDN, UK OFSI, EU Consolidated, UN, plus country-specific lists). The key challenge is currency — some lists update daily, others weekly or quarterly. A screening attestation must specify dataset versions to be meaningful.
- **AI/ML-based evasion detection:** Transaction monitoring systems increasingly look for circumvention typologies (unusual routing, structured payments below thresholds, rapid counterparty changes) rather than relying solely on name matches. This emerging capability moves screening from static list-checking toward behavioural pattern detection — but verified attestations must still anchor results to specific list versions and timestamps.

**Fraud Prevention**

Fabricated screening attestations are a specific fraud type distinct from sanctions evasion — the problem is not evading the sanctions themselves, but presenting fake "clear" results to facilitate prohibited trade or onboard sanctioned entities. This is outright document fabrication, not the suspicious-pattern detection that AML systems address.

- **Document fraud distinction:** Unlike AML (which deals with suspicious transaction patterns), sanctions screening fraud is often outright document fabrication — forged screening provider letterheads, altered screening dates, removed list entries from results, or entirely fictitious "No Match" attestations for entities that would produce matches. Verified hashes eliminate this class of fraud entirely.
- **US:** False statements to federal agencies under 18 USC 1001 — presenting a fabricated OFAC screening result to a correspondent bank or regulator is a federal crime independent of the underlying sanctions violation itself. This means even if the screened entity turns out not to be sanctioned, the act of presenting a fake attestation is separately prosecutable.
- **UK:** Fraud Act 2006 s.2 (fraud by false representation) covers fabricated OFSI screening documents. This is distinct from the sanctions breach under SAMLA 2018 — a firm could face both fraud charges for the fake document and sanctions charges for the underlying prohibited transaction.

**Market Abuse & Insider Trading**

Trading in sanctioned securities or sovereign debt is both a sanctions violation and a potential market abuse issue — false screening attestations may be used to disguise prohibited securities trading.

- **UK:** FCA market abuse powers cover trading in securities subject to sanctions; OFSI financial sanctions interact with FCA market integrity rules
- **US:** OFAC sanctions on sovereign debt (Russia, Venezuela) create a sanctions/securities law intersection; SEC enforcement for trading in prohibited securities
- **EU:** EU sanctions on Russian sovereign debt and securities — intersection with MAR creates dual enforcement risk for firms

**Trade-Based Money Laundering (TBML)**

TBML is the largest channel for illicit financial flows globally (~$2 trillion/year estimated), and sanctions screening of trade counterparties is the primary control point. It operates through over/under-invoicing, phantom shipments, and multiple invoicing to move value across borders — enforced by customs authorities rather than financial regulators.

- **Over/under-invoicing nexus:** Goods shipped at inflated or deflated prices to move value across borders; effective screening must cover not just entity names but also goods descriptions and pricing anomalies against fair market value
- **US:** BIS (Bureau of Industry and Security) Entity List screening required for exports; CBP (Customs and Border Protection) Trade Transparency Units analyse trade data for TBML patterns; FinCEN advisories on TBML red flags link sanctions screening to trade compliance
- **UK:** HMRC is the primary TBML enforcement agency; OFSI sanctions interact with trade controls; Joint Maritime Security Centre monitors maritime trade for sanctions evasion and TBML
- **FATF:** TBML is specifically addressed in FATF guidance (2006, updated 2020); identified as one of three main money laundering methods alongside financial system laundering and cash smuggling — sanctions screening without trade data analysis leaves the largest laundering channel uncovered
- **Multilateral:** Australia (AUSTRAC/ABF partnership on trade-based laundering), Canada (CBSA + FINTRAC data sharing; Project PROTECT), Singapore (Singapore Customs + MAS coordination — critical given Singapore's transhipment hub status), EU (Customs Union harmonised trade data; Europol EFIPPP addresses TBML)

**Proliferation Financing**

Sanctions screening for proliferation financing requires different capabilities than standard AML/CTF screening — screening must cover not just entity names but also goods descriptions, end-use indicators, and technical specifications that signal WMD-related procurement.

- **Dual-use screening:** Export control lists (Wassenaar Arrangement, Nuclear Suppliers Group, Missile Technology Control Regime, Australia Group) require goods classification screening alongside entity screening — most AML screening tools do not cover this.
- **US:** BIS Entity List, Denied Persons List, Unverified List — separate from OFAC SDN; "deemed exports" (technology transfers to foreign nationals) require screening; Export Control Reform Act 2018 (ECRA).
- **UK:** Export Control Joint Unit (ECJU) administers strategic export controls; separate from OFSI financial sanctions; UK Strategic Export Control Lists.
- **EU:** *EU Dual-Use Regulation (2021/821)* — recast regulation expanded controls on cyber-surveillance technology; national licensing authorities in each member state.
- **FATF:** 2020 guidance on counter-proliferation financing specifically addresses screening requirements — institutions must go beyond name matching to identify proliferation-indicative trade patterns.

## Jurisdictional Witnessing (Optional)

Some jurisdictions, contracts, or multi-party workflows may add an independent witness layer. When used, the witnessing firm:

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

If a witness layer exists, it may periodically commit rollups to a public blockchain as an additional timestamping mechanism. That is optional, not inherent to the use case. The verification paths would then be:

1. **Issuer domain** — Direct check against the issuer
2. **Witnessing firm** — Independent confirmation with timestamp
3. **Public blockchain** — Decentralized trust anchor via rollup inclusion

---
title: "Suspicious Activity Reports (SARs) - Internal Records"
category: "Financial Compliance"
volume: "Very Small"
retention: "5-7 years (BSA/AML regulatory requirement)"
slug: "suspicious-activity-reports-internal"
verificationMode: "clip"
tags: ["aml", "kyc", "sar", "bsa-compliance", "financial-crime", "internal-audit", "regulatory-exam", "anti-money-laundering"]
furtherDerivations: 1
---

## What are Internal SAR Records?

In the banking industry, a **Suspicious Activity Report (SAR)** is a highly confidential document filed with FinCEN (in the US) when a bank detects potential money laundering or fraud. While the filed SAR itself is secret, the bank must maintain **Internal Filing Records** to prove to regulators that they are actually monitoring and reporting suspicious behavior.

These internal records are "Compliance Insurance." During a regulatory exam (e.g., by the OCC or Fed), the bank must prove that "Account #9922" was indeed flagged and reported. Fraud is an "Omission" risk: a corrupt branch manager might "edit" internal logs to hide that they failed to report a high-value client's suspicious wires. Verified hashes bind the **Filing Date, Subject Name, and Internal Tracking ID** to the bank's compliance domain (e.g., `chase.com` or `hsbc.com`).

<div style="max-width: 650px; margin: 24px auto; font-family: sans-serif; border: 2px solid #d32f2f; background: #fff; padding: 0; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <div style="background: #d32f2f; color: #fff; padding: 20px; display: flex; justify-content: space-between; align-items: center;">
    <div>
      <div style="font-weight: bold; font-size: 1.2em;"><span verifiable-text="start" data-for="sar"></span>INTERNAL COMPLIANCE RECORD</div>
      <div style="font-size: 0.8em; opacity: 0.9;">BSA/AML Monitoring Unit</div>
    </div>
    <div style="text-align: right;">
      <div style="font-weight: bold; font-size: 0.9em;">CONFIDENTIAL</div>
      <div style="font-size: 0.7em;">SAR-Ref: 9922-8877-XJ</div>
    </div>
  </div>
<div style="padding: 25px; font-size: 0.9em; line-height: 1.6; color: #333;">
    <div style="background: #fffbe6; border: 1px solid #ffe58f; padding: 15px; margin-bottom: 20px; border-radius: 4px;">
      <strong style="color: #856404;">WARNING:</strong> This document contains sensitive AML information. Unauthorized disclosure is a federal crime.
    </div>
<p><strong>Filing Date:</strong> MARCH 15, 2026<br>
    <strong>Primary Subject:</strong> GLOBAL SHELL HOLDINGS LLC<br>
    <strong>Institution:</strong> GOLIATH NATIONAL BANK (Main Hub)</p>
<div style="border-top: 1px solid #eee; margin-top: 15px; padding-top: 15px;">
      <strong>Summary of Suspicion:</strong><br>
      Rapid movement of funds (Structure: $9,900 x 5) from high-risk jurisdiction. No apparent business purpose. FinCEN E-Filing ID: #88442211.
    </div>
<div style="margin-top: 25px; display: flex; justify-content: space-between; align-items: flex-end;">
      <div>
        <div style="border-top: 1px solid #000; width: 200px; padding-top: 5px; font-style: italic;">Sarah Jenkins, AML Director</div>
        <div style="font-size: 0.8em; color: #777;">ID: #AML-992288</div>
      </div>
      <div style="text-align: right; color: #d32f2f; font-weight: bold; font-size: 0.8em;">FILED WITH FINCEN</div>
    </div>
  </div>
<div style="padding: 20px; background: #f9f9f9; border-top: 1px dashed #d32f2f; text-align: center;">
    <div data-verify-line="sar" style="font-family: 'Courier New', monospace; font-size: 0.8em; color: #000; font-weight: bold;"
      title="Demo only: Banks don't yet offer verification&#10;endpoints, so this is illustrative">
      <span data-verify-line="sar">verify:goliathbank.com/aml/v</span> <span verifiable-text="end" data-for="sar"></span>
    </div>
    <div style="font-size: 0.7em; color: #666; margin-top: 10px;">
      Scan to verify internal filing integrity and FinCEN confirmation status. Access restricted to authorized regulators.
    </div>
  </div>
</div>

## Data Verified

Internal SAR tracking ID, FinCEN E-Filing ID, filing date, institution name, branch ID, primary subject name (or account hash), summary of suspicion (hash), filing officer ID, regulatory agency ID.

**Document Types:**
- **Internal SAR Filing Record:** The 1-page proof of submission.
- **Alert Disposition Report:** Proving why a "Suspicious Alert" was *not* filed (essential for audit).
- **FinCEN Acknowledgment Receipt:** (Linked hash) the government's confirmation.
- **EDD (Enhanced Due Diligence) Summary:** The deep-dive investigation file.

## Data Visible After Verification

Shows the issuer domain (`chase.com`, `wellsfargo.com`) and the filing standing.

**Status Indications:**
- **Filed / Confirmed** — Record matches the institution's official AML audit trail.
- **Alert Suppressed** — **ALERT:** An alert was generated but investigation closed it as "Clear."
- **Superseded** — An amended/updated SAR was filed for this subject.
- **Incomplete** — **ALERT:** Record exists but mandatory FinCEN acknowledgment is missing.

## Second-Party Use

The **Internal Compliance Department** benefits from verification.

**Regulatory Exams:** During a surprise audit by the Fed or OCC, the compliance team provides a verified manifest of all SARs filed. The examiners can instantly scan the paper files to ensure they match the digital portal, removing the suspicion of "Post-Dated Filings" or "Log Doctoring."

**Liability Protection:** If a bank is sued for "Failing to Monitor" a specific criminal, the AML team can use verified, timestamped hashes to prove they actually detected and reported the activity years earlier, defending against billion-dollar fines.

## Third-Party Use

**Federal Regulators (Fed, OCC, FDIC)**
**Systemic Audit:** Verifying the "Integrity of the Log." Examiners scan random internal SAR records. Live Verify ensures that the bank's internal "Proof of Filing" isn't a fabrication designed to hide a lack of monitoring.

**FinCEN Investigators**
**Cross-Reference:** If FinCEN is missing a specific report, they can scan the bank's internal verified hash to find the missing E-Filing ID and reconcile their own database.

**Internal Audit Committees**
**Board Oversight:** Providing the Board of Directors with a verified summary of AML activity, ensuring that management isn't hiding the true volume of suspicious activity from the board.

## Verification Architecture

**The "Clean-Up" Fraud Problem**

- **Log Tampering:** Deleting a record from the internal log before an exam to hide that a high-value client was involved in a crime.
- **Back-Dating:** Adding a record today but dating it "2024" to satisfy a regulator's finding of a "Monitoring Gap."
- **Subject Masking:** Editing the name on an internal report to hide the identity of a politically-exposed person (PEP).

**Issuer Types** (First Party)

**Retail Banks.**
**Broker-Dealers.**
**Casino Compliance Units.**

**Privacy Salt:** EXTREMELY CRITICAL. SAR data is governed by strict non-disclosure laws (Tipping Off). The hash must be salted and the verification URL restricted to authorized regulatory IP ranges.

## Authority Chain

**Pattern:** Regulated

Banks issue internal suspicious activity reports and are regulated by the UK Financial Conduct Authority under the UK anti-money laundering and proceeds of crime framework.

```
✓ compliance.example-bank.co.uk/sar/verify — Bank compliance unit maintaining internal SAR filing records
  ✓ fca.org.uk/register — Regulates UK financial crime prevention
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Rationale

SARs are the "Police Reports" of the financial system. By turning internal records into verifiable digital bridges, we ensure that the "Chain of Compliance" is unbreakable, making it impossible for banks to hide dirty money from their regulators.

## Jurisdictional Equivalents

| | US | UK | EU |
|---|---|---|---|
| **Authority** | FinCEN (Financial Crimes Enforcement Network) | NCA (National Crime Agency) | Member state FIUs (Financial Intelligence Units) |
| **Document** | Suspicious Activity Report (FinCEN Form 111) | SAR filed with NCA; separate DAML (Defence Against Money Laundering) consent requests | Suspicious Transaction Reports to national FIUs |
| **Legal basis** | Bank Secrecy Act (BSA); 31 USC 5318(g); OCC/Fed guidance | POCA 2002 ss.330-332; Terrorism Act 2000 s.21A; MLR 2017 | 4th/5th Anti-Money Laundering Directives (4MLD/5MLD); national transpositions |
| **Potential verify: domain** | `goliathbank.com/aml/v` (issuing bank) | `compliance.example-bank.co.uk/sar/verify` (issuing bank) | Varies by member state and institution |
| **Key difference** | ~4 million SARs filed annually; strict tipping-off prohibition; $5,000 threshold for insider abuse, $25,000 for others | DAML consent regime unique to UK — must get NCA consent before proceeding with suspicious transaction; no monetary threshold | Each member state transposes directives differently; reporting thresholds and tipping-off rules vary; 6AMLD introduced criminal liability for legal persons |

**Further Jurisdictional Peers**

- **Australia:** Suspicious Matter Reports (SMRs) filed with AUSTRAC under AML/CTF Act 2006. Reporting entities must file within 24 hours for terrorism-related matters, 3 business days otherwise.
- **Canada:** Suspicious Transaction Reports (STRs) filed with FINTRAC under PCMLTFA (Proceeds of Crime (Money Laundering) and Terrorist Financing Act). No monetary threshold; 30-day filing deadline.
- **Singapore:** Suspicious Transaction Reports (STRs) filed with STRO (Suspicious Transaction Reporting Office) under CDSA (Corruption, Drug Trafficking and Other Serious Crimes Act). MAS supervises financial institution compliance.
- **Japan:** Suspicious Transaction Reports filed with JAFIC (Japan Financial Intelligence Center) under the Act on Prevention of Transfer of Criminal Proceeds. FSA (Financial Services Agency) supervises compliance.
- **Switzerland:** SARs filed with MROS (Money Laundering Reporting Office Switzerland) under AMLA (Anti-Money Laundering Act). FINMA supervises financial intermediaries. Unique obligation: reporting entity must freeze assets for 5 business days upon filing.
- **Hong Kong:** Suspicious Transaction Reports filed with JFIU (Joint Financial Intelligence Unit, a joint HKPF/C&ED operation) under OSCO (Organized and Serious Crimes Ordinance) and DTROP (Drug Trafficking (Recovery of Proceeds) Ordinance). SFC and HKMA supervise regulated entities.

**Counter-Terrorist Financing (CTF)**

Terrorist financing SARs operate under separate legal obligations from AML SARs, with different downstream recipients, urgency, and detection patterns.

- **UK:** The *Terrorism Act 2000 s.21A* imposes a separate terrorist financing SAR obligation — these are filed to the same NCA portal as POCA SARs but are processed with higher priority and disseminated to counter-terrorism policing (SO15/CTU).
- **US:** FinCEN SAR filings include a terrorism financing checkbox; SARs tagged for terrorism are routed to FBI and NCTC (National Counterterrorism Center) rather than standard law enforcement channels.
- **Australia:** AUSTRAC suspicious matter reports include terrorism financing; ASIO (Australian Security Intelligence Organisation) receives intelligence from terrorism-flagged reports, distinct from the police-oriented AML pathway.
- **Canada:** FINTRAC STRs for terrorism financing are shared with CSIS (Canadian Security Intelligence Service) — a national security intelligence agency, not a law enforcement body — reflecting the fundamentally different downstream use.
- **Key distinction:** Terrorist financing amounts are often very small — operational costs can be under $1,000. Pattern detection differs fundamentally from AML: instead of looking for large structured deposits, CTF monitoring looks for small transfers to high-risk regions, crowdfunding patterns, and rapid dispersal of modest sums.

**Cybercrime-Enabled Financial Crime**

A growing proportion of SARs relate to cyber-enabled financial crime — ransomware payments, BEC (Business Email Compromise) funds, crypto-laundering, and mule account networks.

- **UK:** NCA National Cyber Crime Unit receives cyber-flagged SARs; NCSC/NCA partnership on ransomware payment reporting
- **US:** FinCEN issued specific ransomware SAR guidance (2021) — financial institutions must file SARs for suspected ransomware-related transactions; FBI IC3 provides indicators of compromise for SAR correlation
- **Australia:** AUSTRAC 2020 guidance on cyber-enabled crime indicators in SMRs; AFP-led Joint Policing Cybercrime Coordination Centre (JPC3)
- **Ransomware payments:** Controversial policy question — UK/US discourage but don't prohibit ransom payments; reporting obligations vary; some jurisdictions (e.g., Australia) have considered mandatory reporting of ransom payments
- **Mule accounts:** Cyber-enabled fraud relies on "money mule" networks to launder proceeds; SAR systems must flag rapid account turnover and mule indicators

**Trade-Based Money Laundering (TBML)**

Banks are expected to file SARs when they detect TBML indicators — unusual trade financing patterns, letters of credit for commodities inconsistent with the customer's business, and payments to/from high-risk trade corridors. TBML is enforced by customs authorities rather than financial regulators, making it a distinct enforcement domain.

- **Red flags:** FinCEN/FATF TBML red flags include significant discrepancies between goods described and goods shipped, unusual shipping routes, repeated transactions just below reporting thresholds, and counterparties in free trade zones
- **US:** FinCEN 2020 advisory on TBML — updated SAR filing guidance for trade-based patterns; emphasis on correspondent banking and trade finance as key TBML channels
- **UK:** NCA/HMRC TBML intelligence sharing; JMLIT (Joint Money Laundering Intelligence Taskforce) has published TBML typologies linking trade finance SARs to customs enforcement
- **Singapore:** STRO has flagged Singapore's role as a major trade hub making TBML detection a priority; MAS guidance on trade finance AML controls requires banks to monitor for over/under-invoicing patterns

**Market Abuse & Insider Trading**

Financial institutions must report suspected market abuse separately from AML-related SARs — in many jurisdictions these are separate reporting obligations to different authorities.

- **UK:** Suspicious Transaction and Order Reports (STORs) under UK MAR Art. 16 — filed to FCA, NOT to NCA; separate obligation from POCA SARs; firms must maintain both SAR and STOR systems
- **EU:** MAR Art. 16 STORs to national competent authorities (separate from FIU SARs under 4MLD)
- **US:** SEC and FINRA Suspicious Activity Reports — broker-dealers file SARs to FinCEN but also have separate obligations under SEC/FINRA rules for suspicious securities transactions
- **Australia:** ASIC receives market integrity reports; separate from AUSTRAC SMRs; ASX market surveillance also detects suspicious trading patterns
- **Key distinction:** AML SARs focus on source/movement of funds; market abuse STORs focus on trading behaviour (timing, size, counterparty, information advantage)

**Proliferation Financing**

Financial institutions must be able to detect proliferation financing indicators in transactions — these differ from standard money laundering red flags. PF often involves legitimate-looking trade transactions for dual-use goods.

- **FATF:** 2020 guidance on PF risk assessment identifies specific PF indicators — unusual end-users for controlled goods, payments routed through multiple jurisdictions inconsistent with trade routes, front companies in free trade zones purchasing sensitive technology.
- **UK:** NCA receives proliferation-related SARs; OFSI/HMRC/ECJU coordination on trade-based PF intelligence.
- **US:** FinCEN advisories on North Korea and Iran PF typologies; Treasury has issued specific guidance on proliferation trade finance red flags.
- **Singapore:** MAS has issued PF-specific guidance given Singapore's role as a technology trade hub; *Strategic Goods (Control) Act* violations trigger both criminal prosecution and MAS enforcement.

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

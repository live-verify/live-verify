---
title: "Currency Transaction Reports (CTR) - Customer Records"
category: "Financial Compliance"
volume: "Small"
retention: "5 years (IRS/FinCEN requirement)"
slug: "currency-transaction-reports-customer"
verificationMode: "clip"
tags: ["aml", "ctr", "fincen-form-112", "bank-secrecy-act", "cash-transaction", "financial-compliance", "kyc"]
furtherDerivations: 1
---

## What is a CTR?

In the USA, if you walk into a bank and deposit more than $10,000 in cash, the bank **must** file a **Currency Transaction Report (CTR)** with the federal government (FinCEN).

This is the law's way of tracking money laundering and drug profits. The **Customer Receipt** is your proof that you followed the law.

Lenders and tax auditors use these verified receipts to prove that a large "Gift" or "Cash Income" is legitimate and was properly reported to the government. Verified hashes prevent people from "Editing" these receipts to hide the true scale of their cash business.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="ctr">[</span>CURRENCY TRANSACTION REPORT
FinCEN Form 112 - Official Customer Receipt
═══════════════════════════════════════════════════════════════════

Financial Institution:  BANK OF AMERICA, N.A.
Branch:                 402 Market St, San Francisco, CA
Date of Filing:         March 15, 2026

PART I: PERSON CONDUCTING TRANSACTION
───────────────────────────────────────────────────────────────────
Name:                   JOHN JACOB DOE
SSN/ITIN:               ***-**-1234
ID:                     CA Driver License #*******

PART II: TRANSACTION DETAILS
───────────────────────────────────────────────────────────────────
Cash-In (Deposit):                                    $ 12,500.00
Account Number:                                     ****-****-9982

This report is filed in accordance with the Bank Secrecy Act.
Submission ID: 9988776655

<span data-verify-line="ctr">verify:bankofamerica.com/compliance/v</span> <span verifiable-text="end" data-for="ctr">]</span></pre>
</div>

## Data Verified

Customer name, SSN/TIN (redacted), identifying document number, financial institution name/branch, cash-in/cash-out amount, account number (masked), date of transaction, FinCEN filing reference ID.

**Document Types:**
- **CTR Receipt:** Issued to the customer for their records.
- **FinCEN Form 112:** The official federal filing.
- **Exempt Person Filing:** For businesses that don't require regular CTRs.

## Data Visible After Verification

Shows the issuer domain (the Bank) and the filing status.

**Status Indications:**
- **Filed** — Report has been successfully transmitted to FinCEN.
- **Corrected** — Original filing was amended (e.g., due to amount correction).
- **Rejected** — Filing was returned by FinCEN for errors.
- **Void** — Transaction reversed; filing withdrawn.

## Second-Party Use

The **Bank Customer** benefits from verification.

**Tax Audit Defense:** If the IRS questions a large $12,500 cash deposit 3 years later, the customer can provide the verified CTR receipt. This proves they followed federal "Anti-Money Laundering" laws at the time of the transaction, separating legitimate cash income from "unreported" income.

**Source of Funds:** Proving to a real estate attorney or title company that a large cash downpayment was properly reported to the government, avoiding delays in closing.

## Third-Party Use

**The IRS / FinCEN**
**Audit Integrity:** During a bank examination, federal auditors can scan random customer-held CTR receipts. Verification ensures the bank isn't "Deleting" reports from their internal database while still giving receipts to customers.

**Real Estate Attorneys**
**Compliance Vetting:** Verifying the "Source of Funds" for cash buyers to ensure the money isn't being "Laundered" through un-reported cash deposits.

**Commercial Lenders**
**Risk Management:** For cash-intensive businesses (e.g., restaurants or laundromats), lenders can verify that the company is properly reporting its cash receipts to the government, reducing the bank's regulatory risk.

## Verification Architecture

**The "Structuring" Fraud Problem**

- **Report Deletion:** A corrupt bank employee taking a bribe to "Delete" a CTR from the federal system after the customer leaves the branch. Live Verify prevents this by making the customer's paper receipt a verified link to the bank's domain record.
- **Amount Tampering:** A customer editing their $50,000 CTR receipt to read $5,000 to hide the true scale of a cash transaction from their spouse or an auditor.
- **Fake Receipts:** Fraudsters creating fake "CTR Filed" papers to trick a landlord or lender into thinking their illegal cash has been "cleansed" by government reporting.

**Issuer Types** (First Party)

**Retail Banks & Credit Unions.**
**Casinos:** (Who must file CTRCs for large wins/losses).
**Money Service Businesses (MSBs).**

**Privacy Salt:** ABSOLUTELY CRITICAL. CTRs contain SSNs and large dollar amounts. The hash must be salted to prevent "Guess-and-Check" searches for people making large cash moves.

## Authority Chain

**Pattern:** Regulated

Barclays issues currency transaction reports for regulatory and compliance purposes.

```
✓ compliance.barclays.co.uk/ctr/verify — Issues currency transaction reports for compliance
  ✓ fca.org.uk/register — Regulates UK financial crime prevention
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Jurisdictional Equivalents

| | US | UK | EU |
|---|---|---|---|
| **Authority** | FinCEN (Financial Crimes Enforcement Network) | NCA (National Crime Agency); FCA-supervised firms | Member state FIUs under 4MLD/5MLD |
| **Document** | Currency Transaction Report (FinCEN Form 112) | No direct CTR equivalent; SARs cover large cash transactions | Varies by member state; cash threshold reporting where mandated |
| **Legal basis** | Bank Secrecy Act (BSA); 31 USC 5313; 31 CFR 1010.311 | POCA 2002; Money Laundering Regulations 2017 | 4th/5th Anti-Money Laundering Directives (4MLD/5MLD) |
| **Potential verify: domain** | `bankofamerica.com/compliance/v` (issuing bank) | N/A (no automatic CTR regime) | Varies by member state |
| **Key difference** | Automatic filing at >$10,000 cash threshold; ~15 million CTRs filed annually | No automatic cash threshold reporting; all suspicious activity reported via SARs to NCA regardless of amount | Cash thresholds vary by member state; some have no automatic reporting; EU framework mandates suspicious transaction reporting |

**Further Jurisdictional Peers**

- **Australia:** AUSTRAC Threshold Transaction Reports (TTR) for cash transactions >AUD 10,000. Filed by reporting entities under AML/CTF Act 2006. Closest direct equivalent to US CTRs.
- **Canada:** FINTRAC Large Cash Transaction Reports (LCTR) for cash transactions >CAD 10,000. Filed under PCMLTFA (Proceeds of Crime (Money Laundering) and Terrorist Financing Act).
- **Singapore:** Cash Transaction Reports filed with STRO (Suspicious Transaction Reporting Office) under MAS supervision. Reporting thresholds set by CDSA (Corruption, Drug Trafficking and Other Serious Crimes Act).
- **Japan:** JAFIC (Japan Financial Intelligence Center) receives suspicious transaction reports from financial institutions under the Act on Prevention of Transfer of Criminal Proceeds. No automatic cash threshold equivalent to the US $10,000 rule.
- **Switzerland:** MROS (Money Laundering Reporting Office Switzerland) under FINMA supervision. No automatic CTR threshold; SARs required for suspicious transactions under AMLA (Anti-Money Laundering Act).
- **Hong Kong:** JFIU (Joint Financial Intelligence Unit) receives suspicious transaction reports. No automatic cash threshold reporting; STRs filed under OSCO (Organized and Serious Crimes Ordinance) and DTROP (Drug Trafficking (Recovery of Proceeds) Ordinance).

**Tax Evasion & Transparency**

CTR data is a primary tax evasion detection tool. "Structuring" (breaking deposits into sub-threshold amounts to avoid reporting) is both a BSA violation and often indicative of tax evasion:

- **Tax nexus:** CTR data is shared with IRS-CI for tax fraud investigations; structuring is both a federal crime (31 USC 5324) and frequently indicative of unreported taxable income
- **US:** IRS receives CTR data directly from FinCEN; CTRs are a primary tool for detecting unreported cash income in tax investigations
- **Australia:** AUSTRAC TTRs are shared with ATO for tax compliance; significant use in cash economy enforcement (restaurants, tradies, etc.)
- **Canada:** FINTRAC LCTRs shared with CRA; used in underground economy enforcement
- **EU:** Cash payment limits (varying by country — France EUR 1,000, Italy EUR 1,000, Spain EUR 1,000, Germany EUR 10,000) are a parallel anti-tax-evasion measure alongside transaction reporting

**Fraud Prevention**

"Structuring" (breaking transactions to avoid CTR thresholds) is itself a federal crime, but it is also commonly a technique within broader fraud schemes — tax fraud, insurance fraud, payroll fraud, and embezzlement. The fraud dimension is distinct from the AML dimension: structuring may involve entirely legitimate funds being moved in ways designed to evade reporting obligations.

- **US:** Structuring is a federal crime under 31 USC 5324, prosecuted by DOJ even when the underlying funds are legitimate. This has been controversial — IRS-CI civil asset forfeiture of structured but lawful deposits drew significant criticism, leading to IRS policy reforms in 2014-2015 restricting seizures of legal-source structured funds. The fraud charge attaches to the evasion of reporting, not the source of money.
- **UK:** No fixed CTR threshold, but structuring deposits to avoid triggering SARs is indicative of fraud and may constitute a money laundering offence under POCA s.327-329. The Fraud Act 2006 may also apply where structuring is part of a scheme involving false representation to financial institutions.
- **Australia:** AUSTRAC has prosecuted "smurfing" (structuring via multiple persons or accounts to stay below the AUD 10,000 TTR threshold). The Tabcorp $45M penalty (2017) was partly for TTR failures that enabled structuring. ACCC involvement where structuring relates to consumer fraud schemes.
- **Canada:** FINTRAC — structuring to avoid Large Cash Transaction Reports (LCTR) is an offence under PCMLTFA s.75. CAFC (Canadian Anti-Fraud Centre) tracks structuring as a fraud typology when it appears in broader fraud schemes such as romance fraud cash-outs or investment scam laundering.

**Cybercrime-Enabled Financial Crime**

Crypto exchanges are now required to file CTRs in many jurisdictions; cash-to-crypto transactions at Bitcoin ATMs are a growing laundering channel.

- **US:** FinCEN 2019 guidance confirmed virtual currency businesses are MSBs and must file CTRs; IRS-CI has a dedicated cryptocurrency unit
- **Australia:** AUSTRAC — digital currency exchanges must register and file TTRs; Binance Australia lost its banking relationships over compliance concerns
- **Canada:** FINTRAC — virtual currency dealers classified as MSBs since 2020; CTR/LCTR requirements apply
- **UK:** FCA registration requirement for crypto firms under MLR 2017; no CTR equivalent but crypto SARs to NCA

**Trade-Based Money Laundering (TBML)**

Cash generated from trade-based laundering enters the banking system via deposits that trigger CTRs — making the CTR often the first detection point for TBML schemes. TBML is enforced by customs authorities rather than financial regulators, creating a distinct enforcement domain.

- **TBML nexus:** Proceeds from over-invoiced goods sold domestically are deposited as cash, triggering CTRs; the CTR creates an auditable link between trade fraud and the banking system
- **Black Market Peso Exchange (BMPE):** Classic TBML typology where drug cash in the US is used to buy goods exported to Colombia at inflated invoices; CTRs on the cash deposits are key intelligence for connecting seemingly legitimate trade to illicit proceeds
- **US:** FinCEN has issued specific advisories linking CTR patterns to TBML (FIN-2006-A003, updated 2020); CBP Trade Transparency Units cross-reference CTR data with customs declarations to identify pricing anomalies
- **Emerging:** Trade finance digitisation (blockchain-based letters of credit, e-bills of lading) may provide new verification points — Live Verify could authenticate trade documents that are currently vulnerable to TBML manipulation

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


## Competition vs. Internal Bank Logs

| Feature | Live Verify | Bank Internal Log | Paper Receipt |
| :--- | :--- | :--- | :--- |
| **User Access** | **Universal.** Customer can show anyone. | **Zero.** Customers can't see the bank's AML logs. | **Instant.** |
| **Trust Anchor** | **Domain-Bound.** Bound to the Bank. | **System-Bound.** | **Zero.** Easily forged. |
| **Integrity** | **Cryptographic.** Binds Name + Amount. | **High.** Direct DB. | **Vulnerable.** |
| **Portability** | **High.** Verified PDF works for any 3rd party. | **None.** Requires bank intervention. | **High.** |

**Why Live Verify wins here:** The "External Proof." A bank's internal log is useless to a customer who needs to prove their legitimacy to a third party (like an IRS auditor or a lawyer). Live Verify turns the **Bank's Internal Truth** into a **Portable Legal Artifact** that the customer can use for their own protection.
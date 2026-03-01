---
title: "Sanctions and Restricted Party Screening Attestations"
category: "Financial Compliance"
volume: "Very Large"
retention: "5-7 years (OFAC / AML regulatory requirement)"
slug: "sanctions-screening-attestations"
tags: ["sanctions-screening", "ofac-compliance", "kyc", "aml", "restricted-party", "export-compliance", "trade-integrity", "compliance-audit"]
furtherDerivations: 1
---

## What is a Sanctions Attestation?

In global finance and trade, every transaction must be checked against **Sanctions Lists** (e.g., OFAC SDN, UN Security Council, EU Consolidated List). A **Sanctions Screening Attestation** is the formal document where a bank, exporter, or payment processor proves they checked a specific person or company and found "No Matches."

These documents are the "Legal Safe Harbor" for high-value trade. Fraud is high-stakes: a company might "edit" a screening report to hide that their customer is actually a sanctioned oligarch or a prohibited defense entity. Similarly, a bank might use an outdated "Snapshot" from 2023 to hide a sanction designated in 2025. Verified hashes bind the **Subject Name, Lists Searched, and Dataset Timestamp** to the screening provider's domain (e.g., `dowjones.com` or `refinitiv.com`).

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="sanc">[</span>DOW JONES RISK & COMPLIANCE
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

<span data-verify-line="sanc">verify:dowjones.com/v</span> <span verifiable-text="end" data-for="sanc">]</span></pre>
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

## Rationale

Sanctions compliance is the "First Line of Financial Defense." By turning attestations into verifiable digital bridges, we ensure that global trade is transparent and that "Clean Status" is backed by the real-time cryptographic truth of the world's most critical risk databases.

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

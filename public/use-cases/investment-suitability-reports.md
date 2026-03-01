---
title: "Investment Suitability Reports"
category: "Professional Ethics & Compliance"
volume: "Large"
retention: "7-10 years (regulatory, litigation)"
slug: "investment-suitability-reports"
tags: ["suitability", "investment-advice", "mifid", "reg-bi", "financial-advice", "know-your-client"]
furtherDerivations: 0
---

## What is a Suitability Report?

When a financial advisor recommends an investment, they must ensure it's suitable for you — considering your financial situation, investment objectives, risk tolerance, and knowledge. The **suitability report** documents this assessment and the rationale for the recommendation.

If things go wrong, this report is critical evidence. Did the advisor understand your circumstances? Did they recommend something appropriate? Disputes often hinge on what was documented at the time.

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 1px solid #4a4a4a; background: #fff; padding: 0;">
  <div style="background: #4a4a4a; color: #fff; padding: 15px;">
    <div style="font-weight: bold; font-size: 1.1em;"><span verifiable-text="start" data-for="investmentsuitabilit">[</span>SUITABILITY REPORT</div>
    <div style="font-size: 0.8em;">Investment Recommendation Assessment</div>
  </div>
  <div style="padding: 20px; font-size: 0.9em; line-height: 1.6;">
    <p><strong>Client:</strong> Margaret Chen<br>
    <strong>Advisor:</strong> James Wilson, CFA (FCA Approved CF30)<br>
    <strong>Firm:</strong> Hartley Wealth Management<br>
    <strong>Date:</strong> February 15, 2026</p>
<div style="background: #f5f5f5; padding: 15px; margin: 15px 0;">
      <p style="margin: 0;"><strong>Client Profile Summary:</strong></p>
      <p style="margin: 10px 0 0;">Risk Tolerance: Moderate | Time Horizon: 10+ years</p>
      <p style="margin: 5px 0 0;">Investment Objective: Growth with income</p>
      <p style="margin: 5px 0 0;">Experience Level: Intermediate</p>
    </div>
<div style="background: #fff; padding: 15px; margin: 15px 0; border: 1px solid #ddd;">
      <p style="margin: 0;"><strong>Recommendation:</strong></p>
      <p style="margin: 10px 0 0;">Balanced Multi-Asset Fund (60% equity / 40% bonds)</p>
      <p style="margin: 10px 0 0;"><strong>Suitability Rationale:</strong> Aligns with moderate risk tolerance, provides growth potential with income, appropriate for 10+ year horizon.</p>
    </div>
<p style="font-size: 0.85em; color: #666;">This report should be read alongside the Key Information Document (KID) provided separately.</p>
<div style="margin-top: 15px; font-size: 0.8em; font-family: monospace; text-align: center; color: #666; border-top: 1px dashed #ccc; padding-top: 10px;">
      <div data-verify-line="investmentsuitabilit" style="border-top: 1px dashed #999; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
        title="Demo only: This is an illustrative example of the verification line">
        verify:hartley-wealth.com/advice <span verifiable-text="end" data-for="investmentsuitabilit">]</span>
      </div>
    </div>
  </div>
</div>

## Data Verified

**Client name**, **advisor name/credentials**, **firm name**, **report date**, **client profile summary** (risk tolerance, objectives, experience), **recommendation details**, **suitability rationale**.

## Data Visible After Verification

**Status Indications:**
- **On Record** — Suitability report is authenticated as issued
- **Superseded** — Updated advice has been provided
- **Under Review** — Firm is reviewing the advice (possible complaint)
- **Complaint Upheld** — Regulator/ombudsman found the advice unsuitable

## Why This Matters

**Mis-selling scandals:** PPI, endowment mortgages, pension transfers — all involved advice that was documented one way but may have been delivered differently, or was simply unsuitable.

**He-said-she-said:** Without verifiable records, disputes become one party's word against another. Client says "they told me it was low risk"; advisor says "I explained the risks clearly."

Verification proves: this exact suitability assessment existed at this time.

## Jurisdiction Differences

| Jurisdiction | Regulator | Framework | Key Requirements |
|--------------|-----------|-----------|------------------|
| **UK** | FCA | COBS 9 (suitability), Consumer Duty | Suitability report required for personal recommendations |
| **US** | SEC, FINRA | Regulation Best Interest (Reg BI) | "Best interest" standard, Form CRS disclosure |
| **EU** | National + ESMA | MiFID II Article 25 | Suitability assessment, appropriateness test |

US Reg BI is newer (2020) and weaker than UK/EU fiduciary-style requirements, but all require documented rationale.

## Third-Party Use

**Clients** — Verify the advice record matches what they received
**Financial Ombudsman / FINRA arbitration** — Evidence in disputes
**Successor advisors** — Understanding prior advice when taking over a client
**Regulators** — Thematic reviews of advice quality

## Verification Architecture

**The Problem:** Firms may:
- Provide altered suitability reports after complaints arise
- Claim reports existed that were never actually given to clients
- Backdate or modify rationale after investments perform poorly

**The Fix:** Report is hashed at time of delivery. Client receives copy with verification line. If disputed later, both parties can verify the report is exactly what was issued — no alterations, no backdating.


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

**Jurisdictional Requirements (Insurance)**

Insurance regulation is heavily fragmented:

**US Domestic Insurance:** State insurance commissioners do not mandate witness firms; companies maintain independent records via NAIC databases and state filings.

**Cross-Border Insurance / Reinsurance:** International reinsurance treaties increasingly demand independent witness firms:
- **Lloyd's of London & London Market:** Expect independent verification for catastrophe claims and high-value policies
- **EU Insurance Directive (Solvency II):** May require witness firms for cross-border policy documents
- **Bermuda (Captive Insurance):** Non-US witness firms required for policies involving US insureds to satisfy double-trigger documentation rules

**Litigation/Claims:** Once insurance moves to litigation phase, court-appointed independent witnesses become mandatory, superseding issuer verification entirely.

**Public Blockchain (Non-Party)**

Witnessing firms may periodically commit rollups to an inexpensive public blockchain, providing an ultimate immutability guarantee. The blockchain is a "non-party"—infrastructure, not a participant in the transaction. This creates multiple verification paths:

1. **Issuer domain** — Direct check against the issuer
2. **Witnessing firm** — Independent confirmation with timestamp
3. **Public blockchain** — Decentralized trust anchor via rollup inclusion

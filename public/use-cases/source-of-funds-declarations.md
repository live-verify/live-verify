---
title: "Source of Funds/Wealth Declarations"
category: "Professional Ethics & Compliance"
volume: "Medium"
retention: "5-10 years post-relationship"
slug: "source-of-funds-declarations"
tags: ["source-of-funds", "source-of-wealth", "aml", "kyc", "due-diligence", "onboarding"]
furtherDerivations: 0
---

## What is a Source of Funds Declaration?

When opening a high-value account or making a significant investment, financial institutions must understand where your money comes from. The **source of funds declaration** documents:

- **Source of Funds:** Where did this specific transaction money come from? (e.g., sale of property, salary, inheritance)
- **Source of Wealth:** How did you accumulate your overall wealth? (e.g., business ownership, investments, inheritance)

This is core AML (anti-money laundering) compliance. If you can't explain where money came from, the institution can't accept it.

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 1px solid #2e5090; background: #fff; padding: 0;">
  <div style="background: #2e5090; color: #fff; padding: 15px;">
    <div style="font-weight: bold; font-size: 1.1em;"><span verifiable-text="start" data-for="sourceoffundsdeclara">[</span>SOURCE OF FUNDS DECLARATION</div>
    <div style="font-size: 0.8em;">Anti-Money Laundering Compliance</div>
  </div>
  <div style="padding: 20px; font-size: 0.9em; line-height: 1.6;">
    <p><strong>Client:</strong> Richard Thornton<br>
    <strong>Account/Transaction:</strong> Initial Investment - £500,000<br>
    <strong>Declaration Date:</strong> February 1, 2026</p>
<div style="background: #f0f4f8; padding: 15px; margin: 15px 0; border-left: 3px solid #2e5090;">
      <p style="margin: 0;"><strong>Source of Funds for this transaction:</strong></p>
      <p style="margin: 10px 0 0;">Sale of residential property at 42 Kensington Gardens, London W8</p>
      <p style="margin: 5px 0 0;">Net proceeds: £525,000 (after mortgage redemption)</p>
      <p style="margin: 5px 0 0;">Completion date: January 15, 2026</p>
      <p style="margin: 10px 0 0;"><strong>Supporting documentation:</strong></p>
      <p style="margin: 5px 0 0;">• Solicitor completion statement (attached)</p>
      <p style="margin: 5px 0 0;">• Bank statement showing receipt of funds</p>
    </div>
<p style="font-size: 0.85em; color: #666;">I confirm this information is true and complete. I will notify the firm of any material changes.</p>
<div style="margin-top: 15px; font-size: 0.8em; font-family: monospace; text-align: center; color: #666; border-top: 1px dashed #ccc; padding-top: 10px;">
      <div data-verify-line="sourceoffundsdeclara" style="border-top: 1px dashed #999; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
        title="Demo only: This is an illustrative example of the verification line">
        verify:hartley-wealth.com/kyc <span verifiable-text="end" data-for="sourceoffundsdeclara">]</span>
      </div>
    </div>
  </div>
</div>

## Data Verified

**Client name**, **transaction/account reference**, **declaration date**, **source description**, **amount**, **supporting document references**, **signatory confirmation**.

## Data Visible After Verification

**Status Indications:**
- **Accepted** — Declaration reviewed and accepted by firm
- **Under Review** — Additional documentation requested
- **Superseded** — Updated declaration provided (e.g., source changed)
- **Rejected** — Declaration not accepted (serious — may trigger SAR)

## Why This Matters

**Money laundering basics:** Criminals need to "explain" dirty money. Fake source of funds declarations — claiming money came from property sales, business profits, or inheritance when it didn't — are a primary laundering technique.

**Red flags:**
- Funds that don't match stated occupation/income
- Vague explanations ("savings", "investments" without detail)
- Supporting documents that don't verify
- Multiple declarations with changing stories

## Jurisdiction Differences

| Jurisdiction | Regulator | Framework | Key Requirements |
|--------------|-----------|-----------|------------------|
| **UK** | FCA | MLR 2017, JMLSG Guidance | SOF required for high-value transactions; SOW for ongoing relationship |
| **US** | FinCEN | BSA, CDD Rule | Beneficial ownership + source of funds for high-risk customers |
| **EU** | National FIUs | AMLD 4/5/6 | SOF/SOW for enhanced due diligence cases |
| **Offshore** | Various | FATF standards | Often stricter than onshore (reputational pressure) |

UK wealth managers typically require SOW for all private banking clients; US has less prescriptive rules but similar practical requirements.

## Third-Party Use

**Banks/investment firms** — Onboarding decisions, ongoing monitoring
**Compliance officers** — Risk assessment, EDD file building
**Auditors** — Testing AML program effectiveness
**Regulators** — Thematic reviews, enforcement investigations
**Law enforcement** — SAR follow-up, criminal investigations

## Verification Architecture

**The Problem:**
- Clients provide forged supporting documents (fake solicitor letters, altered bank statements)
- Declarations are altered after acceptance to change the story
- Firms claim they obtained declarations that don't exist
- Clients deny making declarations that they did make

**The Fix:** Declaration hashed at signing, with references to supporting documents (which may have their own hashes). If story changes later, original declaration is verifiable. Supporting documents from third parties (solicitors, employers) can also be verified against their domains.

**The chain:** Client declares source → Supporting doc from third party (e.g., employer's salary confirmation) verified against employer's domain → Firm's acceptance of declaration verified against firm's domain. Multiple verification points make fabrication much harder.


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

**Jurisdictional Requirements (Offshore Jurisdictions)**

Documents issued from offshore financial centers (Cayman Islands, Jersey, Guernsey, Sark, BVI, Panama, etc.) face heightened regulatory scrutiny due to international anti-money laundering (AML) and FATCA compliance frameworks.

**US Foreign Policy Requirement:**
When documents from these jurisdictions are shared internationally or used in US transactions, US foreign policy strongly recommends independent witnessing firms that are:
- **NOT located in the same jurisdiction** as the issuer
- Preferably located in neutral OECD jurisdictions (UK, Switzerland, EU member states)
- Maintaining separate custody of audit trails to prevent collusion with the primary issuer

This creates an independent verification chain that satisfies the OECD's Common Reporting Standard (CRS) and US FATCA requirements for cross-border financial transparency.

**Public Blockchain (Non-Party)**

Witnessing firms may periodically commit rollups to an inexpensive public blockchain, providing an ultimate immutability guarantee. The blockchain is a "non-party"—infrastructure, not a participant in the transaction. This creates multiple verification paths:

1. **Issuer domain** — Direct check against the issuer
2. **Witnessing firm** — Independent confirmation with timestamp
3. **Public blockchain** — Decentralized trust anchor via rollup inclusion

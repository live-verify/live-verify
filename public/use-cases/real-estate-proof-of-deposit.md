---
title: "Real Estate Proof of Deposit"
category: "Real Estate & Property"
volume: "Medium"
retention: "7 years (transaction records)"
slug: "real-estate-proof-of-deposit"
verificationMode: "clip"
tags: ["real-estate", "aml", "source-of-funds", "kyc", "property-fraud", "money-laundering", "financial-crime"]
furtherDerivations: 1
---

## What is Real Estate Proof of Deposit?

Real estate is a primary vector for global money laundering. High-value property transactions are often used to "wash" illicit funds. Sellers, closing banks, and title companies struggle to verify the "clean" origin of large deposits.

A **Source of Funds Attestation (SOFA)** is a document issued by the buyer's primary bank to the closing entity. It attests to the *origin* of a specific deposit — where the money came from (e.g., the sale of another property, years of savings, or a verified inheritance) and how long the bank has held it. The bank is not certifying the funds are "clean" — that's a compliance judgement no bank will put its name to. It is confirming provenance: this money entered through this channel, on this date, from this source. By making this attestation verifiable, we provide an "AML Bridge" that lets closing entities trace fund origins without relying on easily-forged paper statements.

<div style="max-width: 650px; margin: 24px auto; font-family: sans-serif; border: 2px solid #0d47a1; background: #fff; padding: 0; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <div style="background: #0d47a1; color: #fff; padding: 20px; display: flex; justify-content: space-between; align-items: center;">
    <div>
      <div style="font-weight: bold; font-size: 1.2em;"><span verifiable-text="start" data-for="sofa">[</span>SOURCE OF FUNDS ATTESTATION</div>
      <div style="font-size: 0.8em; opacity: 0.9;">Compliance & Anti-Money Laundering</div>
    </div>
    <div style="text-align: right;">
      <div style="font-weight: bold; font-size: 0.9em;">CERTIFIED AML RECORD</div>
      <div style="font-size: 0.7em;">Ref: AML-RE-2026-08</div>
    </div>
  </div>
<div style="padding: 25px; font-size: 0.9em; line-height: 1.6; color: #333;">
    <p><strong>Issuing Bank:</strong> BARCLAYS BANK PLC<br>
    <strong>Certified Buyer:</strong> SAMANTHA L. ROBERTS<br>
    <strong>Deposit Amount:</strong> $250,000.00</p>
<div style="background: #e3f2fd; border: 1px solid #0d47a1; padding: 15px; margin: 15px 0; border-radius: 4px;">
      <p style="margin: 0;"><strong>Attested Fund Origin:</strong></p>
      <p style="margin: 5px 0 0; font-weight: bold;">Proceeds from Sale of Property (Ref: #1428 Elm St)</p>
      <p style="margin: 5px 0 0;"><strong>Holding Period:</strong> 5 Years (since 2021)</p>
    </div>
<p style="font-size: 0.8em; color: #666; font-style: italic;">
      This bank-certified attestation confirms the origin and holding history of the funds listed above.
    </p>
  </div>
<div style="padding: 20px; background: #f9f9f9; border-top: 1px dashed #0d47a1; text-align: center;">
    <div data-verify-line="sofa" style="font-family: 'Courier New', monospace; font-size: 0.8em; color: #000; font-weight: bold;">
      verify:barclays.com/aml/v <span verifiable-text="end" data-for="sofa">]</span>
    </div>
  </div>
</div>

## Data Verified

Issuing bank name, buyer name, deposit amount, verified source (e.g., sale, savings, inheritance), holding period, AML compliance officer ID, reference number.

**Document Types:**
- **Source of Funds Attestation:** The standard proof for real estate closings.
- **Fund Origin Certificate:** Summary of deposit source and holding period.
- **Transaction Origin Record:** Specific details on a single high-value wire.

## Data Visible After Verification

Shows the issuer domain (`barclays.com`, `hsbc.com`) and the attestation status.

**Status Indications:**
- **Attested / Current** — Record matches the bank's fund origin records.
- **Under Review** — **ALERT:** The bank is re-examining the provenance of these funds.
- **Referred** — **ALERT:** Funds have been referred for enhanced due diligence.
- **Withdrawn** — **ALERT:** Attestation rescinded by the issuing bank.

## Second-Party Use

The **Property Buyer** benefits from verification.

**Closing Speed:** By providing a bank-attested fund origin record, the buyer prevents the "2-week delay" while the title company or closing bank manually investigates the origins of their money.

**Financial Privacy:** Proving fund provenance without giving the title company full access to their private bank statements or years of tax returns.

## Third-Party Use

**Title Companies / Closing Agents**
**AML Compliance:** Instantly verifying a buyer's fund origin by linking directly to the bank's domain record, meeting their regulatory obligation to establish provenance under AML laws.

**Mortgage Lenders**
**Underwriting:** Confirming the source of a buyer's down payment without relying on easily-photoshopped paper statements.

**Real Estate Regulators (FINTRAC, FinCEN)**
**Market Integrity:** Auditing fund origin attestations across transactions to detect patterns consistent with layering or structuring.

## Verification Architecture

**The "Dirty Money" Fraud Problem**

- **Layering:** Depositing small amounts over time through multiple channels to obscure the trail, then presenting a large balance as "savings."
- **Fake Origin Documents:** Scammers creating fake "Inheritance Letters" or "Sale Documents" to fabricate a provenance narrative.
- **Identity Proxy:** Using an unconnected person to buy property for a sanctioned individual.

**Issuer Types** (First Party)

**Major Retail Banks.**
**High-Net-Worth Private Banks.**
**Specialized AML Compliance Firms.**

**Privacy Salt:** Highly critical. Wealth data is extremely sensitive. The hash must be salted to prevent "guessing" wealth levels or sources.

## Authority Chain

**Pattern:** Regulated

Regulated issuers are institutions like banks or universities that operate under a government-issued license.

**Primary issuer example:**

| Field | Value |
|---|---|
| Issuer domain | `example-bank.com/v` |
| `authorizedBy` | `fca.org.uk/register` |
| `authorityBasis` | FCA-authorised deposit taker, FRN 123456 |


## Rationale

Property is the ultimate destination for laundered money. By turning fund origin attestations into verifiable digital bridges, we close the gap between the bank's private records and the real estate closing process — not by asking banks to certify cleanliness (they won't), but by letting them confirm provenance (they already do this internally).

---
title: "HMRC AML Supervision Registrations"
category: "Financial Compliance"
volume: "Medium"
retention: "Duration of registration + 5 years"
slug: "hmrc-aml-supervision-registrations"
verificationMode: "clip"
tags: ["hmrc", "aml", "supervision", "mlr-2017", "money-service-business", "tcsp", "high-value-dealer", "compliance", "due-diligence"]
furtherDerivations: 0
---

## What is an HMRC AML Supervision Registration?

Not all UK businesses that handle money are supervised by the FCA. HMRC is the AML supervisor for:
- **Money Service Businesses (MSBs)** — currency exchanges, money transmitters, cheque cashers
- **Trust or Company Service Providers (TCSPs)** — firms that create and manage companies, trusts, and nominee arrangements
- **High Value Dealers (HVDs)** — businesses that accept cash payments of €10,000 or more
- **Estate agents** — property sales and lettings
- **Accountancy Service Providers (ASPs)** — not supervised by a professional body

When these businesses register with HMRC for AML supervision, HMRC issues a **registration confirmation** with a supervision reference number. This confirmation is their proof of legitimacy — and it matters enormously to fund managers who deal with these firms as counterparties.

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 1px solid #0d47a1; background: #fff; padding: 0;">
  <div style="background: #0d47a1; color: #fff; padding: 15px;">
    <div style="font-weight: bold; font-size: 1.1em;"><span verifiable-text="start" data-for="hmrcaml"></span>HM REVENUE & CUSTOMS</div>
    <div style="font-size: 0.8em;">Anti-Money Laundering Supervision — Registration Confirmation</div>
  </div>
  <div style="padding: 20px; font-size: 0.9em; line-height: 1.6;">
    <p><strong>Business Name:</strong> Pinnacle Corporate Services Ltd<br>
    <strong>HMRC Supervision Reference:</strong> XDML00000174829<br>
    <strong>Companies House No:</strong> 11447291<br>
    <strong>Supervised Activity:</strong> Trust or Company Service Provider<br>
    <strong>Registration Date:</strong> 12 May 2021</p>
    <div style="background: #e3f2fd; padding: 15px; margin: 15px 0; border: 1px solid #1976d2;">
      <p style="margin: 0; color: #0d47a1; font-weight: bold;">REGISTRATION ACTIVE</p>
      <p style="margin: 10px 0 0;">This business is registered with HMRC for AML supervision under the Money Laundering, Terrorist Financing and Transfer of Funds (Information on the Payer) Regulations 2017.</p>
    </div>
    <p style="font-size: 0.85em; color: #666;">Fit and proper test: Passed<br>
    Last compliance visit: 8 November 2025</p>
    <div style="margin-top: 15px; font-size: 0.8em; font-family: monospace; text-align: center; color: #666; border-top: 1px dashed #ccc; padding-top: 10px;">
      <div data-verify-line="hmrcaml" style="font-family: 'Courier New', monospace; font-size: 0.85em; color: #555;">
        <span data-verify-line="hmrcaml">verify:hmrc.gov.uk/aml-register</span> <span verifiable-text="end" data-for="hmrcaml"></span>
      </div>
    </div>
  </div>
</div>

## Data Verified

Business name, HMRC supervision reference number, Companies House number, supervised activity type, registration date, registration status, fit and proper test status.

## Data Visible After Verification

**Status Indications:**
- **Active** — Business is currently registered and supervised
- **Suspended** — Registration suspended pending compliance action
- **Cancelled** — HMRC has cancelled the registration (serious compliance failures)
- **Refused** — Application for registration was refused (fit and proper test failed)
- **Lapsed** — Registration expired and was not renewed
- **Appealing** — Business is appealing a cancellation or refusal

## Why This Matters for Fund Managers

Fund managers encounter HMRC-supervised businesses as **counterparties and service providers**:

1. **TCSPs forming offshore structures:** A fund manager's investor invests through a BVI company set up by a UK TCSP. Is that TCSP legitimately supervised? An unsupervised TCSP is a major AML red flag — they may be creating shell structures without proper CDD on the underlying beneficial owners.

2. **MSBs processing investor funds:** Some fund subscriptions pass through money service businesses, particularly for international investors. The fund manager must verify the MSB is HMRC-supervised.

3. **Estate agents in property funds:** Property funds deal with estate agents constantly. Under MLR 2017, estate agents must be HMRC-supervised. An unregistered agent handling high-value property transactions is a sanctions and money laundering risk.

**The "supervision shopping" problem:** Unscrupulous TCSPs that have been refused or cancelled by HMRC may continue operating, presenting forged or expired registration confirmations to clients. A verified check against `hmrc.gov.uk` catches this instantly.

## Second-Party Use

**HMRC-supervised businesses** — Proving their legitimacy to clients, banks, and counterparties. A verified registration confirmation is more credible than a printout from HMRC's website.

**Fund managers** — CDD evidence that their service providers are properly supervised. Presented during FCA audits as part of counterparty due diligence.

## Third-Party Use

**Banks** — Account opening for MSBs and TCSPs requires proof of HMRC supervision. Banks increasingly de-risk these sectors; a verified registration helps maintain banking access.

**FCA supervisors** — Checking that fund managers verify the supervision status of their counterparties, particularly TCSPs used to set up investor structures.

**Other regulators** — Jersey, Guernsey, and Isle of Man financial regulators checking that UK TCSPs managing structures in their jurisdictions are properly supervised.

**Investors** — Due diligence on the corporate service providers managing their offshore structures.

## Verification Architecture

**The Problem:**
- TCSPs operating without HMRC supervision, creating shell structures for money laundering
- Cancelled or refused registrations concealed from clients
- Forged HMRC registration confirmations presented during bank account opening
- "Supervision shopping" — firms refused by one supervisor attempting to register elsewhere
- Expired registrations presented as current

**The Fix:** HMRC hashes each registration confirmation with a status field. Cancellation, suspension, or refusal is reflected immediately. Banks and fund managers can verify the registration is current and genuine in real-time.

## Authority Chain

**Pattern:** Government Direct

HMRC operates AML supervision under the Money Laundering Regulations 2017.

```
✓ hmrc.gov.uk/aml-register — Supervises MSBs, TCSPs, HVDs, and ASPs under MLR 2017
  ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Jurisdictional Equivalents

| | UK | US | EU |
|---|---|---|---|
| **Authority** | HMRC | FinCEN | Member state AML supervisory authority |
| **Document** | AML supervision registration confirmation | FinCEN MSB registration confirmation | AML registration/authorisation from national authority |
| **Legal basis** | MLR 2017 | Bank Secrecy Act; 31 CFR 1022.380 (MSB registration) | 4MLD/5MLD; national implementing legislation |
| **Potential verify: domain** | `hmrc.gov.uk/aml-register` | `fincen.gov/msb-register` | Varies (e.g., `afm.nl/aml-register`, `bafin.de/geldwaescheaufsicht`) |
| **Key difference** | HMRC supervises MSBs, TCSPs, HVDs, estate agents, and some ASPs — all under one authority | FinCEN registers MSBs federally but state-level money transmitter licences also required; no federal TCSP registration | Each member state supervises its own obliged entities; no EU-wide AML registration (AMLA, the new EU AML Authority, may centralise this from 2026) |

**Further Jurisdictional Peers**

- **Australia (AUSTRAC)** — Reporting entities (remittance service providers, digital currency exchanges, gambling services) must register with AUSTRAC under the *Anti-Money Laundering and Counter-Terrorism Financing Act 2006*. AUSTRAC maintains a public register of remittance providers. Key difference: Australia's registration regime is activity-based rather than entity-type-based; all "designated services" providers must enrol, with AUSTRAC serving as both the registration body and the FIU.
- **Canada (FINTRAC)** — Money services businesses (MSBs) and foreign money services businesses (FMSBs) must register with FINTRAC under the *Proceeds of Crime (Money Laundering) and Terrorist Financing Act (PCMLTFA)*. Key difference: Canada requires registration of both domestic and foreign MSBs operating in Canada; FINTRAC publishes a searchable MSB registry, and failure to register is a criminal offence.
- **Singapore (MAS)** — Payment service providers must be licensed under the *Payment Services Act 2019*. MAS issues three licence types: money-changing, standard payment institution, and major payment institution. Key difference: Singapore's regime is licence-based (not registration-based), with more rigorous entry requirements including minimum capital and security deposits; MAS also supervises digital payment token services.
- **Switzerland (VQF/SROs)** — Financial intermediaries not supervised by FINMA must affiliate with a self-regulatory organisation (SRO) such as the VQF (Verein zur Qualitätssicherung von Finanzdienstleistungen) under the *Anti-Money Laundering Act (AMLA)*. Key difference: Switzerland uses a delegated supervision model — SROs conduct the day-to-day AML supervision under FINMA oversight, creating a two-tier structure that differs from the UK's direct HMRC supervision.
- **Hong Kong (CCE)** — Money service operators must be licensed by the Commissioner of Customs and Excise (CCE) under the *Anti-Money Laundering and Counter-Terrorist Financing Ordinance (AMLO)*. Key difference: Hong Kong maintains a publicly searchable register of licensed money service operators; the licensing regime is enforced by Customs and Excise rather than the financial regulator (unlike Singapore's MAS-led approach).

## Jurisdictional Witnessing

A jurisdiction may require the issuer to retain a **witnessing firm** for regulatory compliance. The witnessing firm:

- Receives all hashes from the issuer, and any subsequent changes to the payload as they happen—which may manifest as a new hash, a status change, or even a 404 (record deleted)
- Receives structured content/metadata (key identifiers and dates)
- Does **NOT** receive plaintext or sensitive personal information
- Provides an immutable, timestamped audit trail—available to the jurisdiction on demand, to document holders/third parties during disputes, or as expert witness testimony in legal proceedings

This provides:
- **Non-repudiation:** HMRC cannot deny issuing the registration
- **Timestamp proof:** Registration was active at a specific time
- **Regulatory audit:** Jurisdictions can inspect the witness ledger for supervision integrity
- **Resilience:** Verification works even if issuer's systems go down

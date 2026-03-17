---
title: "NCA SAR Receipt Acknowledgments"
category: "Financial Compliance"
volume: "Very Large"
retention: "5-6 years (MLR 2017 / POCA 2002)"
slug: "nca-sar-receipt-acknowledgments"
verificationMode: "clip"
tags: ["nca", "ukfiu", "sar", "suspicious-activity", "aml", "poca", "financial-crime", "compliance", "money-laundering"]
furtherDerivations: 0
---

## What is an NCA SAR Receipt Acknowledgment?

When a UK fund manager, bank, or other regulated firm suspects money laundering or terrorist financing, they must file a **Suspicious Activity Report (SAR)** with the National Crime Agency's UK Financial Intelligence Unit (UKFIU). This is a legal obligation under the Proceeds of Crime Act 2002 (POCA) and the Terrorism Act 2000.

The NCA issues a **receipt acknowledgment** confirming the SAR was received. This receipt is the firm's proof of compliance. During FCA supervision visits, the fund manager must demonstrate they have a functioning SAR regime — and the receipts prove it.

The existing use case (`suspicious-activity-reports-internal.md`) covers the firm's *internal* filing records. This use case covers the **NCA's acknowledgment** — the external confirmation that the report actually reached the UKFIU.

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 1px solid #2e7d32; background: #fff; padding: 0;">
  <div style="background: #2e7d32; color: #fff; padding: 15px;">
    <div style="font-weight: bold; font-size: 1.1em;"><span verifiable-text="start" data-for="ncasar"></span>NATIONAL CRIME AGENCY</div>
    <div style="font-size: 0.8em;">UK Financial Intelligence Unit — SAR Acknowledgment</div>
  </div>
  <div style="padding: 20px; font-size: 0.9em; line-height: 1.6;">
    <p><strong>SAR Reference:</strong> SAR/2026/UK/0284719<br>
    <strong>Date Received:</strong> 10 March 2026 14:22 UTC<br>
    <strong>Reporting Entity:</strong> Hartington Asset Management LLP<br>
    <strong>FCA Firm Reference:</strong> 558301<br>
    <strong>Report Type:</strong> Suspicious Activity Report (POCA s.338)</p>
    <div style="background: #f0fff4; padding: 15px; margin: 15px 0; border: 1px solid #4caf50;">
      <p style="margin: 0; color: #2e7d32; font-weight: bold;">REPORT RECEIVED</p>
      <p style="margin: 10px 0 0;">Your suspicious activity report has been received by the UKFIU and logged for analysis.</p>
    </div>
    <p style="font-size: 0.85em; color: #666;">This acknowledgment confirms receipt only. The NCA will contact you if further information is required. You must not disclose the existence of this SAR to the subject (POCA s.333A — tipping off).</p>
    <div style="margin-top: 15px; font-size: 0.8em; font-family: monospace; text-align: center; color: #666; border-top: 1px dashed #ccc; padding-top: 10px;">
      <div data-verify-line="ncasar" style="font-family: 'Courier New', monospace; font-size: 0.85em; color: #555;">
        verify:nca.gov.uk/sar-receipts <span verifiable-text="end" data-for="ncasar"></span>
      </div>
    </div>
  </div>
</div>

## Data Verified

SAR reference number, date and time received, reporting entity name, FCA firm reference number, report type (SAR under POCA s.338, or terrorism SAR under TA 2000 s.21A).

**Critical privacy constraint:** The acknowledgment contains NO information about the subject of the SAR, the nature of the suspicion, or the amount involved. Only the fact and timing of the filing are verifiable. This preserves the "tipping off" protections under POCA s.333A.

## Data Visible After Verification

**Status Indications:**
- **Received** — SAR logged by UKFIU
- **Under Analysis** — UKFIU is actively reviewing (not typically disclosed to the reporter)
- **Actioned** — UKFIU has disseminated the intelligence or taken action
- **Closed** — Matter concluded

**Note:** In practice, OFSI may only expose "Received" status to the reporting firm. Internal NCA workflow status would not be visible to the reporter.

## Why This Matters

The UK SAR regime processes over **900,000 SARs per year** (2023/24 figures). The volume creates three problems that verification addresses:

1. **"We filed it" disputes:** During FCA examinations, firms claim they filed a SAR but can't locate the acknowledgment. Did they actually file, or are they covering for a compliance failure? A verified receipt is definitive.

2. **Timing disputes:** A firm discovers a money laundering scheme in January but doesn't file until March (after an FCA visit is announced). The internal records might be backdated, but the NCA receipt timestamp is immutable.

3. **Fabricated receipts:** A corrupt MLRO could fabricate an NCA acknowledgment to hide the fact that they suppressed a SAR to protect a high-value client. Verification against `nca.gov.uk` eliminates this.

## Second-Party Use

**Fund managers / MLROs** — Proving to FCA that their SAR regime is functioning. The MLRO's personal liability under POCA s.331-332 makes this existentially important.

**Compliance committees** — Board-level oversight of AML reporting. Verified receipt counts prove the firm isn't suppressing SARs.

## Third-Party Use

**FCA supervisors** — During thematic reviews of AML systems and controls, verifying that the firm's claimed SAR volume matches actual NCA receipts.

**External auditors** — Annual AML audits require evidence that SARs are being filed. Verified receipts provide this without exposing SAR content.

**Legal counsel** — Defence in money laundering prosecutions. "We reported the suspicion — here's the verified NCA receipt" is a key defence under POCA s.338.

**Successor MLROs** — When a new Money Laundering Reporting Officer takes over, they need to verify the outgoing MLRO's SAR filing history was genuine.

## Verification Architecture

**The Problem:**
- MLROs suppressing SARs to protect high-value clients
- Backdated SAR filings to appear compliant after the fact
- Fabricated NCA acknowledgments presented during regulatory examinations
- Disputes about filing dates when timing is legally significant (e.g., moratorium periods)

**The Fix:** NCA hashes each acknowledgment at time of issue with a cryptographic timestamp. The MLRO receives a receipt with a `verify:` line. FCA auditors can instantly confirm the SAR was genuinely received by the NCA on the claimed date.

**Volume consideration:** With 900,000+ SARs per year, the NCA's hash storage would need to be efficient. Static hosting (the simplest Live Verify deployment) could handle this easily — each hash is just a 64-character hex directory containing a small JSON response.

## Authority Chain

**Pattern:** Government Direct

The NCA is a statutory law enforcement agency operating under the Crime and Courts Act 2013.

```
✓ nca.gov.uk/sar-receipts — Acknowledges suspicious activity reports under POCA 2002
  ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Jurisdictional Equivalents

| | UK | US | EU |
|---|---|---|---|
| **Authority** | NCA (UKFIU) | FinCEN (US Treasury) | Member state FIU (e.g., FIU-NL, Tracfin, BaFin-FIU) |
| **Document** | SAR receipt acknowledgment | FinCEN BSA E-Filing acknowledgment | Filing confirmation from national FIU |
| **Legal basis** | POCA 2002 s.330-332, s.338; Terrorism Act 2000 s.21A | Bank Secrecy Act; 31 CFR 1020.320 | EU Directive 2015/849 (4MLD/5MLD); national implementing legislation |
| **Potential verify: domain** | `nca.gov.uk/sar-receipts` | `fincen.gov/bsa-filings` | Varies by member state (e.g., `fiu.belastingdienst.nl/receipts`) |
| **Key difference** | ~900,000 SARs/year; single national FIU; tipping off is criminal offence (POCA s.333A) | ~4 million SARs/year filed via BSA E-Filing system; FinCEN also receives CTRs, CMIRs, FBARs | Each member state operates its own FIU; no single EU-wide filing system; Europol FIU.net enables cross-border sharing |

**Further Jurisdictional Peers**

- **Australia (AUSTRAC)** — AUSTRAC receives suspicious matter reports (SMRs) under the *Anti-Money Laundering and Counter-Terrorism Financing Act 2006*. AUSTRAC issues electronic acknowledgments via its online reporting portal (AUSTRAC Online). Key difference: Australia uses "suspicious matter reports" (not SARs) with a lower threshold — reports are required where there are "reasonable grounds to suspect" — and AUSTRAC processes approximately 350,000 SMRs per year.
- **Canada (FINTRAC)** — The Financial Transactions and Reports Analysis Centre of Canada receives suspicious transaction reports (STRs) under the *Proceeds of Crime (Money Laundering) and Terrorist Financing Act (PCMLTFA)*. Filing acknowledgments are issued electronically via FINTRAC's F2R system. Key difference: Canada requires STRs within 30 days of the suspicion forming; tipping off is a criminal offence under PCMLTFA s.8.
- **Singapore (STRO)** — The Suspicious Transaction Reporting Office receives STRs under the *Corruption, Drug Trafficking and Other Serious Crimes (Confiscation of Benefits) Act (CDSA)*. Acknowledgments are issued via the STRO Online Notices and Reporting (SONAR) platform. Key difference: Singapore's FIU is part of the Commercial Affairs Department of the Singapore Police Force, giving it direct law enforcement capabilities.
- **Switzerland (MROS)** — The Money Laundering Reporting Office Switzerland receives reports under the *Anti-Money Laundering Act (AMLA)* via the goAML platform. MROS issues acknowledgments electronically. Key difference: Swiss reporting triggers an automatic five-day asset freeze (AMLA Art. 10), making the acknowledgment timestamp particularly significant as it starts the freeze clock.
- **Japan (JAFIC)** — The Japan Financial Intelligence Center receives suspicious transaction reports (STRs) under the *Act on Prevention of Transfer of Criminal Proceeds*. Key difference: JAFIC is part of the National Police Agency; Japan's SAR volume has increased significantly since FATF's 2021 mutual evaluation, with enhanced reporting requirements for virtual asset service providers.

**Counter-Terrorist Financing (CTF)**

The NCA receives terrorism-related SARs through the same portal but processes them through a distinct intelligence pathway with different urgency and downstream recipients.

- **UK:** *Terrorism Act 2000 s.21A* SARs are filed to the same NCA SAR Online portal as POCA SARs and receive the same receipt acknowledgment format. However, downstream processing is fundamentally different — terrorism SARs are disseminated to counter-terrorism policing (SO15 Metropolitan Police Counter Terrorism Command / regional CTUs) rather than standard financial investigation teams.
- **Same receipt, different urgency:** The receipt acknowledgment mechanism is identical, but the verification timestamp is especially significant for terrorism SARs because counter-terrorism moratorium periods and intervention timelines are shorter than for proceeds-of-crime matters.
- **Distinction from POCA SARs:** A firm's SAR filing history may include both POCA and TA 2000 reports. Verified receipts allow FCA supervisors to confirm that the firm is correctly categorising reports — filing a terrorism suspicion as a POCA SAR (rather than under s.21A) could delay critical intelligence reaching counter-terrorism agencies.

**Cybercrime-Enabled Financial Crime**

NCA's National Cyber Crime Unit is a key consumer of cyber-flagged SARs, with growing overlap between financial intelligence and cyber threat intelligence.

- **UK:** NCSC and NCA collaborate on ransomware payment intelligence; SARs flagged as cyber-related are prioritised differently from traditional financial crime SARs
- **Volume trend:** Cyber-enabled financial crime SARs are growing faster than any other category — mule account SARs alone have driven significant volume increases

**Unexplained Wealth & Asset Recovery**

- **Asset recovery nexus:** SARs filed with the NCA feed directly into civil recovery investigations under POCA Part 5; the SAR is often the starting point for unexplained wealth investigations.
- **UK:** NCA's Proceeds of Crime Centre uses SAR intelligence to identify assets for UWO applications and civil recovery; DAML consent refusals can lead directly to restraint orders and confiscation.
- **Volume:** Of ~900,000 SARs/year, a small fraction lead to asset recovery — but those cases involve significant values; NCA recovered £345M in 2022/23 via POCA.

## Jurisdictional Witnessing

A jurisdiction may require the issuer to retain a **witnessing firm** for regulatory compliance. The witnessing firm:

- Receives all hashes from the issuer, and any subsequent changes to the payload as they happen—which may manifest as a new hash, a status change, or even a 404 (record deleted)
- Receives structured content/metadata (key identifiers and dates)
- Does **NOT** receive plaintext or sensitive personal information
- Provides an immutable, timestamped audit trail—available to the jurisdiction on demand, to document holders/third parties during disputes, or as expert witness testimony in legal proceedings

This provides:
- **Non-repudiation:** NCA cannot deny receiving the report; firm cannot deny failing to report
- **Timestamp proof:** Report receipt documented at a specific time
- **Regulatory audit:** Jurisdictions can inspect the witness ledger for filing completeness
- **Resilience:** Verification works even if issuer's systems go down

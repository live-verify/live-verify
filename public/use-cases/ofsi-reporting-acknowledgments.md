---
title: "OFSI Reporting Acknowledgments"
category: "Financial Compliance"
volume: "Medium"
retention: "6 years minimum (SAMLA 2018)"
slug: "ofsi-reporting-acknowledgments"
verificationMode: "clip"
tags: ["ofsi", "sanctions", "reporting", "frozen-funds", "hm-treasury", "compliance", "uk-sanctions", "designated-persons"]
furtherDerivations: 0
---

## What is an OFSI Reporting Acknowledgment?

Under Section 64 of the Sanctions and Anti-Money Laundering Act 2018 (SAMLA), any person who knows or has reasonable cause to suspect that they hold funds or economic resources belonging to a **designated person** must report this to OFSI as soon as practicable. Failure to report is a criminal offence.

When a firm files this report, OFSI sends an **acknowledgment** confirming receipt. This acknowledgment is the firm's proof that they complied with their reporting obligation. During an FCA audit, the fund manager must demonstrate: "We discovered we held these sanctioned assets, and we reported it to OFSI on date X."

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 1px solid #1a237e; background: #fff; padding: 0;">
  <div style="background: #1a237e; color: #fff; padding: 15px;">
    <div style="font-weight: bold; font-size: 1.1em;"><span verifiable-text="start" data-for="ofsireport"></span>HM TREASURY — OFSI</div>
    <div style="font-size: 0.8em;">Reporting Acknowledgment</div>
  </div>
  <div style="padding: 20px; font-size: 0.9em; line-height: 1.6;">
    <p><strong>Report Reference:</strong> RPT/2026/0093841<br>
    <strong>Date Received:</strong> 11 March 2026<br>
    <strong>Reporting Entity:</strong> Breckenridge Fund Management Ltd<br>
    <strong>FCA Firm Reference:</strong> 447291</p>
    <div style="background: #f0f4ff; padding: 15px; margin: 15px 0; border: 1px solid #3949ab;">
      <p style="margin: 0; font-weight: bold;">ACKNOWLEDGMENT OF REPORT</p>
      <p style="margin: 10px 0 0;">Your report under s.64 SAMLA 2018 regarding funds held in relation to a designated person has been received and logged.</p>
      <p style="margin: 10px 0 0;">You must continue to freeze the relevant funds pending further instruction from OFSI.</p>
    </div>
    <p style="font-size: 0.85em; color: #666;">This acknowledgment confirms receipt only. It does not constitute approval to release or deal with the reported funds.</p>
    <div style="margin-top: 15px; font-size: 0.8em; font-family: monospace; text-align: center; color: #666; border-top: 1px dashed #ccc; padding-top: 10px;">
      <div data-verify-line="ofsireport" style="font-family: 'Courier New', monospace; font-size: 0.85em; color: #555;">
        <span data-verify-line="ofsireport">verify:ofsi.hm-treasury.gov.uk/reports</span> <span verifiable-text="end" data-for="ofsireport"></span>
      </div>
    </div>
  </div>
</div>

## Data Verified

Report reference number, date received by OFSI, reporting entity name, FCA firm reference number, regulation under which the report was made, acknowledgment date.

**Note:** The acknowledgment does NOT contain the designated person's identity or the amount of frozen funds — that information remains in the confidential report itself. Only the fact and timing of the report are verifiable.

## Data Visible After Verification

**Status Indications:**
- **Received** — OFSI has received and logged the report
- **Under Review** — OFSI is actively assessing the report
- **Action Taken** — OFSI has issued instructions (e.g., licence, direction to maintain freeze)
- **Closed** — Matter resolved (e.g., designation lifted, funds released under licence)

## Why This Matters

The reporting obligation under SAMLA s.64 carries criminal penalties for non-compliance. During FCA supervision visits, the auditor needs to verify:

1. **Did the firm report at all?** — Some firms discover sanctioned assets and quietly release them without reporting, hoping nobody notices.
2. **Did the firm report promptly?** — "As soon as practicable" means days, not months. A verified timestamp proves the report date.
3. **Is the acknowledgment genuine?** — A firm could fabricate an OFSI acknowledgment to cover up a late or missing report.

## Second-Party Use

**Fund managers** — Proving to FCA that they fulfilled their SAMLA s.64 obligation promptly.

**Compliance officers** — Personal liability protection. If the firm is prosecuted for late reporting, the compliance officer's verified acknowledgment proves they personally ensured the report was filed.

## Third-Party Use

**FCA supervisors** — Cross-referencing OFSI acknowledgments against the firm's internal sanctions hit logs. If the firm's system flagged a designated person in January but the OFSI acknowledgment is dated March, that's a compliance failure.

**External auditors** — Verifying the completeness of a firm's sanctions reporting during annual AML audits.

**Legal counsel** — Defence evidence if the firm is prosecuted for sanctions breaches. "We reported immediately — here's the verified acknowledgment."

## Verification Architecture

**The Problem:**
- Firms failing to report frozen funds and hiding the omission
- Backdating reports to appear compliant after the fact
- Fabricating OFSI acknowledgments during regulatory examinations
- Delaying reports to buy time for fund restructuring

**The Fix:** OFSI hashes each acknowledgment at time of issue with a timestamp. The hash cannot be backdated. FCA auditors can instantly confirm the report was genuinely received by OFSI on the claimed date.

## Authority Chain

**Pattern:** Government Direct

OFSI is part of HM Treasury and issues reporting acknowledgments under statutory authority.

```
✓ ofsi.hm-treasury.gov.uk/reports — Acknowledges sanctions reports under SAMLA 2018
  ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Jurisdictional Equivalents

| | UK | US | EU |
|---|---|---|---|
| **Authority** | OFSI (HM Treasury) | OFAC (US Treasury) | Member state competent authority |
| **Document** | s.64 SAMLA reporting acknowledgment | OFAC Blocked Property Report acknowledgment (annual + 10-day initial) | Reporting confirmation from national authority |
| **Legal basis** | SAMLA 2018 s.64 | IEEPA; 31 CFR 501.603(b) | EU Council Regulations; national implementing legislation |
| **Potential verify: domain** | `ofsi.hm-treasury.gov.uk/reports` | `ofac.treasury.gov/blocked-property` | Varies by member state |
| **Key difference** | Must report "as soon as practicable" | Annual blocked property report due by 30 September; initial report within 10 business days of blocking | Varies — most member states require "without delay" reporting |

**Further Jurisdictional Peers**

- **Australia (DFAT)** — Under the *Autonomous Sanctions Act 2011* s.33 and the *Charter of the United Nations Act 1945*, holders of frozen assets must report to DFAT. Reports are made via the DFAT sanctions contact point. Key difference: Australia's reporting obligation covers both asset holdings and attempted transactions; there is no separate "blocked property report" — a single report covers both.
- **Canada (OSFI/FINTRAC)** — Financial institutions must report frozen assets to the Office of the Superintendent of Financial Institutions (OSFI) under the *Special Economic Measures Act (SEMA)* and to FINTRAC for related suspicious transaction reports. Key difference: dual reporting is required — OSFI for the asset freeze itself, and FINTRAC if the circumstances also constitute a suspicious transaction.
- **Singapore (MAS)** — Financial institutions must report to MAS under the *Monetary Authority of Singapore (Sanctions and Freezing of Assets of Persons)* Regulations. MAS requires reporting to the Suspicious Transaction Reporting Office (STRO) when sanctions-related suspicious activity is detected. Key difference: MAS integrates sanctions reporting with STR reporting via STRO, creating a unified intelligence pipeline rather than separate sanctions and AML streams.
- **Switzerland (SECO)** — Under the *Embargo Act (EmbA)* and specific embargo ordinances, financial intermediaries must report frozen assets to SECO immediately. The Swiss Financial Market Supervisory Authority (FINMA) also requires reporting through its supervisory channels. Key difference: Switzerland's role as a major global financial centre means SECO receives a disproportionately high volume of frozen asset reports relative to its population; reporting is immediate with no grace period.

**Sanctions Evasion**

Reporting suspected sanctions breaches is distinct from SAR reporting — sanctions breach reports concern specific prohibited transactions rather than patterns of suspicion, and the reporting obligations for evasion carry their own legal framework.

- **UK (SAMLA 2018 s.51):** Mandatory reporting of known or suspected sanctions breaches — failure to report is a criminal offence. OFSI receives approximately 400 breach reports per year, compared to over 900,000 SARs filed with the NCA. The low volume reflects the binary nature of sanctions reporting: did you deal with a designated person, yes or no.
- **US (OFAC VSD):** OFAC's Voluntary Self-Disclosure (VSD) program incentivises firms to report their own breaches — voluntary disclosure significantly reduces penalties (typically by 50% or more). Unlike the UK, there is no mandatory reporting obligation for sanctions breaches, creating a different incentive structure that relies on self-interest rather than criminal liability.
- **EU:** Most member states impose mandatory sanctions breach reporting. New EU-wide reporting requirements under the sanctions circumvention regulation (Regulation 2022/576) extend the obligation to report not just breaches but suspected circumvention attempts — a broader net than traditional breach reporting.
- **Signal-to-noise contrast:** Sanctions breach reports number in hundreds per year per jurisdiction, versus millions of SARs. This dramatically higher signal-to-noise ratio means sanctions reports receive individual attention from enforcement agencies — unlike SARs, which are processed algorithmically. Verified reporting acknowledgments therefore carry substantial evidentiary weight.
- **Evasion-specific reporting:** Post-2022, reporting obligations increasingly cover circumvention indicators — unusual ownership restructuring, sudden changes in vessel registration, routing payments through newly established intermediaries — not just completed breaches. This shifts the reporting model from reactive (breach occurred) to proactive (evasion attempted).

**Proliferation Financing**

Breach reports under proliferation sanctions regimes (Iran, DPRK) carry heightened national security significance — a breach may indicate active WMD procurement, not just a compliance failure.

- **UK:** OFSI breach reports related to Iran/DPRK sanctions are shared with intelligence agencies and ECJU, not just treated as regulatory compliance matters.
- **US:** OFAC voluntary self-disclosures for Iran/DPRK violations are treated more seriously than general sanctions breaches; DOJ criminal prosecution is more likely for proliferation-related violations.
- **Key distinction:** General sanctions breaches are primarily regulatory; proliferation sanctions breaches have national security and intelligence dimensions.

## Jurisdictional Witnessing

A jurisdiction may require the issuer to retain a **witnessing firm** for regulatory compliance. The witnessing firm:

- Receives all hashes from the issuer, and any subsequent changes to the payload as they happen—which may manifest as a new hash, a status change, or even a 404 (record deleted)
- Receives structured content/metadata (key identifiers and dates)
- Does **NOT** receive plaintext or sensitive personal information
- Provides an immutable, timestamped audit trail—available to the jurisdiction on demand, to document holders/third parties during disputes, or as expert witness testimony in legal proceedings

This provides:
- **Non-repudiation:** OFSI cannot deny receiving the report; firm cannot deny failing to report
- **Timestamp proof:** Report receipt documented at a specific time
- **Regulatory audit:** Jurisdictions can inspect the witness ledger for fraud detection
- **Resilience:** Verification works even if issuer's systems go down

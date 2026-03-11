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
    <div style="font-weight: bold; font-size: 1.1em;"><span verifiable-text="start" data-for="ofsireport">[</span>HM TREASURY — OFSI</div>
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
        verify:ofsi.hm-treasury.gov.uk/reports <span verifiable-text="end" data-for="ofsireport">]</span>
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

---
title: "OFSI Licence Authorisations"
category: "Financial Compliance"
volume: "Small"
retention: "6 years minimum (SAMLA 2018 / MLR 2017)"
slug: "ofsi-licence-authorisations"
verificationMode: "clip"
tags: ["ofsi", "sanctions", "licence", "frozen-funds", "hm-treasury", "financial-crime", "compliance", "uk-sanctions"]
furtherDerivations: 0
---

## What is an OFSI Licence Authorisation?

When a firm holds funds belonging to a **designated person** (someone on the UK sanctions list), those funds are frozen by law. But sometimes there are legitimate reasons to release some of those funds — paying legal fees, meeting basic living expenses, or winding down a position. The firm must apply to **OFSI** (Office of Financial Sanctions Implementation, part of HM Treasury) for a **licence** authorising the specific transaction.

OFSI issues a licence letter specifying exactly what's permitted: the amount, the purpose, the conditions, and the expiry date. This licence is critical evidence during FCA audits — it proves the firm didn't just unilaterally release sanctioned funds. Currently it's a PDF letter with no verification mechanism. A fund manager could fabricate or alter a licence to justify an unauthorised release.

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 1px solid #1a237e; background: #fff; padding: 0;">
  <div style="background: #1a237e; color: #fff; padding: 15px;">
    <div style="font-weight: bold; font-size: 1.1em;"><span verifiable-text="start" data-for="ofsilicence">[</span>HM TREASURY — OFSI</div>
    <div style="font-size: 0.8em;">Office of Financial Sanctions Implementation</div>
  </div>
  <div style="padding: 20px; font-size: 0.9em; line-height: 1.6;">
    <p><strong>LICENCE UNDER THE RUSSIA (SANCTIONS) (EU EXIT) REGULATIONS 2019</strong></p>
    <p><strong>Licence Reference:</strong> INT/2026/1847293<br>
    <strong>Date of Issue:</strong> 14 March 2026<br>
    <strong>Licence Holder:</strong> Albion Capital Management LLP<br>
    <strong>Designated Person:</strong> [Name redacted — see restricted annex]</p>
    <div style="background: #f5f5ff; padding: 15px; margin: 15px 0; border: 1px solid #3949ab;">
      <p style="margin: 0;"><strong>Authorised Activity:</strong></p>
      <p style="margin: 5px 0 0;">Payment of legal fees to Clifford Chance LLP</p>
      <p style="margin: 5px 0 0;"><strong>Maximum Amount:</strong> GBP 75,000.00</p>
      <p style="margin: 5px 0 0;"><strong>Expiry:</strong> 14 June 2026</p>
    </div>
    <p style="font-size: 0.85em; color: #666;">Subject to conditions in the attached annex.<br>
    Issued by: Financial Sanctions Officer, OFSI</p>
    <div style="margin-top: 15px; font-size: 0.8em; font-family: monospace; text-align: center; color: #666; border-top: 1px dashed #ccc; padding-top: 10px;">
      <div data-verify-line="ofsilicence" style="font-family: 'Courier New', monospace; font-size: 0.85em; color: #555;">
        verify:ofsi.hm-treasury.gov.uk/licences <span verifiable-text="end" data-for="ofsilicence">]</span>
      </div>
    </div>
  </div>
</div>

## Data Verified

Licence reference number, date of issue, licence holder name, designated person reference (redacted or hashed), regulation under which licence is granted, authorised activity description, maximum amount and currency, expiry date, issuing officer.

## Data Visible After Verification

**Status Indications:**
- **Active** — Licence is current and the authorised activity may proceed
- **Expired** — Licence has passed its expiry date
- **Revoked** — OFSI has withdrawn the licence (e.g., conditions breached)
- **Superseded** — A new licence has replaced this one (e.g., amended conditions)
- **Exhausted** — The maximum authorised amount has been fully drawn

## Why This Matters

During an FCA informal audit, the supervisor asks: "You released £75,000 from a frozen account — show me the OFSI licence." The fund manager produces the licence letter. Currently the FCA auditor must phone OFSI or email to confirm it's genuine. With a `verify:` line, the auditor scans the letter and gets instant confirmation from `ofsi.hm-treasury.gov.uk`.

**The fabrication risk is real:** A corrupt compliance officer could forge an OFSI licence to justify releasing sanctioned funds to themselves or an associate. The amounts involved are often substantial (legal fees, wind-down costs for entire portfolios). Verified hashes eliminate this vector entirely.

## Second-Party Use

**Fund managers / banks** — Proving to FCA that their release of frozen funds was authorised. The licence is their legal shield.

**Solicitors** — Law firms receiving payment from frozen funds need to confirm the licence is genuine before accepting the money (or they risk handling proceeds of sanctions evasion).

## Third-Party Use

**FCA supervisors** — During thematic reviews of sanctions compliance, scanning licence letters across multiple firms to confirm all releases were genuinely authorised.

**Correspondent banks** — When processing a payment that touches frozen funds, the correspondent bank needs to see a verified OFSI licence before allowing the wire.

**Auditors** — External auditors reviewing sanctions compliance can verify licence authenticity without contacting OFSI directly.

## Verification Architecture

**The Problem:**
- Forged licences justifying unauthorised release of frozen funds
- Altered conditions (changing the amount, extending the expiry, widening the permitted activity)
- Using an expired or revoked licence as if it were still active
- Fabricating a licence retrospectively after an unauthorised release

**The Fix:** OFSI hashes each licence at time of issue. Any alteration to the reference number, amount, conditions, or expiry produces a different hash that won't verify. Revocation is reflected by changing the status to "Revoked." The FCA auditor gets real-time confirmation without phoning OFSI.

## Authority Chain

**Pattern:** Government Direct

OFSI is part of HM Treasury and issues licences under statutory authority.

```
✓ ofsi.hm-treasury.gov.uk/licences — Issues sanctions licences under SAMLA 2018
  ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Jurisdictional Equivalents

| | UK | US | EU |
|---|---|---|---|
| **Authority** | OFSI (HM Treasury) | OFAC (US Treasury) | Member state competent authority (e.g., BaFin, Direction du Trésor, Banca d'Italia) |
| **Document** | OFSI Licence | OFAC Specific Licence | National exemption/authorisation |
| **Legal basis** | SAMLA 2018; regime-specific regulations | IEEPA; regime-specific Executive Orders | EU Council Regulations (e.g., Reg 269/2014 for Russia) |
| **Potential verify: domain** | `ofsi.hm-treasury.gov.uk/licences` | `ofac.treasury.gov/licences` | `sanctions.bafin.de/licences` (varies by state) |
| **Key difference** | Single UK-wide authority | OFAC has extraterritorial reach — non-US firms dealing in USD need OFAC licences too | Each member state issues its own licences; no single EU-wide licensing body (though the EU Sanctions Coordinator may evolve this role) |

## Jurisdictional Witnessing

A jurisdiction may require the issuer to retain a **witnessing firm** for regulatory compliance. The witnessing firm:

- Receives all hashes from the issuer, and any subsequent changes to the payload as they happen—which may manifest as a new hash, a status change, or even a 404 (record deleted)
- Receives structured content/metadata (key identifiers and dates)
- Does **NOT** receive plaintext or sensitive personal information
- Provides an immutable, timestamped audit trail—available to the jurisdiction on demand, to document holders/third parties during disputes, or as expert witness testimony in legal proceedings

This provides:
- **Non-repudiation:** Issuer cannot deny issuing the licence
- **Timestamp proof:** Licence existed at a specific time
- **Regulatory audit:** Jurisdictions can inspect the witness ledger for fraud detection
- **Resilience:** Verification works even if issuer's systems go down

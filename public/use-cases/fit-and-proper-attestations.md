---
title: "Fit and Proper Attestations"
category: "Professional Ethics & Compliance"
volume: "Medium"
retention: "Duration of employment + 7 years"
slug: "fit-and-proper-attestations"
tags: ["fit-proper", "smcr", "certification", "conduct", "regulatory", "hr", "compliance"]
furtherDerivations: 0
---

## What is a Fit and Proper Attestation?

Individuals in certain financial services roles must be "fit and proper" — meaning they have the competence, character, and financial soundness to do their job honestly and effectively.

Under regimes like SM&CR (UK) or FINRA (US), firms must annually attest that staff in certified roles remain fit and proper. This isn't just a checkbox — firms must actively assess honesty, integrity, reputation, competence, and financial soundness.

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 1px solid #003366; background: #fff; padding: 0;">
  <div style="background: #003366; color: #fff; padding: 15px;">
    <div style="font-weight: bold; font-size: 1.1em;"><span verifiable-text="start" data-for="fitandproperattestat">[</span>ANNUAL FIT AND PROPER ATTESTATION</div>
    <div style="font-size: 0.8em;">SM&CR Certification Regime</div>
  </div>
  <div style="padding: 20px; font-size: 0.9em; line-height: 1.6;">
    <p><strong>Employee:</strong> Sarah Mitchell<br>
    <strong>Role:</strong> Portfolio Manager (Certification Function CF30)<br>
    <strong>Firm:</strong> Albion Asset Management<br>
    <strong>Assessment Date:</strong> March 1, 2026</p>
<div style="background: #f0f4f8; padding: 15px; margin: 15px 0; border-left: 3px solid #003366;">
      <p style="margin: 0;"><strong>The firm certifies that this individual:</strong></p>
      <p style="margin: 10px 0 0;">✓ Meets the requirements for honesty, integrity, and reputation</p>
      <p style="margin: 5px 0 0;">✓ Has the competence and capability for their role</p>
      <p style="margin: 5px 0 0;">✓ Is financially sound (no undisclosed insolvency issues)</p>
      <p style="margin: 5px 0 0;">✓ Has completed required training and CPD</p>
    </div>
<p style="font-size: 0.85em; color: #666;">Certified by: HR Director & Compliance Officer<br>
    Valid until: February 28, 2027 (annual renewal required)</p>
<div style="margin-top: 15px; font-size: 0.8em; font-family: monospace; text-align: center; color: #666; border-top: 1px dashed #ccc; padding-top: 10px;">
      <div data-verify-line="fitandproperattestat" style="border-top: 1px dashed #999; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
        title="Demo only: This is an illustrative example of the verification line">
        verify:albion-am.com/smcr <span verifiable-text="end" data-for="fitandproperattestat">]</span>
      </div>
    </div>
  </div>
</div>

## Data Verified

**Employee name**, **role/function**, **firm name**, **assessment date**, **certification period**, **competencies confirmed**, **certifying officers**, **next renewal date**.

## Data Visible After Verification

**Status Indications:**
- **Certified** — Current attestation valid
- **Expired** — Renewal overdue
- **Suspended** — Certification withdrawn pending investigation
- **Revoked** — Individual no longer meets fit and proper standards
- **Not Certified** — Role does not require certification

## Why No Public Registry?

The FCA Register shows Senior Managers (SMF) who require individual FCA approval. But **Certification Function** staff (the much larger population) are certified by firms, not the FCA. There's no public registry of certified staff — only the firm knows who they've certified.

When hiring, a new employer must conduct their own fit and proper assessment. Verification of prior attestations helps — but there's currently no standard way to prove someone was certified at their previous firm.

## Jurisdiction Differences

| Jurisdiction | Regulator | Framework | Who's Covered |
|--------------|-----------|-----------|---------------|
| **UK** | FCA/PRA | SM&CR (Senior Managers & Certification Regime) | Senior Managers (FCA-approved) + Certified Staff (firm-certified) |
| **US** | FINRA, SEC | Form U4, Continuing Ed | Registered representatives, investment advisers |
| **EU** | National | MiFID II suitability, Fit & Proper Directive | Senior management, key function holders |

UK SM&CR is the most developed regime; US has fragmented oversight across FINRA/SEC/state; EU varies by country.

## Third-Party Use

**Recruiting firms** — Verify candidate was certified at prior employer
**Regulators** — Thematic reviews of certification practices
**Employment lawyers** — Evidence in wrongful dismissal cases ("you revoked certification without basis")
**Background check services** — Employment verification with certification status

## Verification Architecture

**The Problem:**
- Former employers may refuse to confirm certification status
- Candidates may claim certifications they never held
- Firms may backdate revocations after misconduct emerges

**The Fix:** Annual attestation hashed at issuance. Employee receives copy. When moving jobs, candidate can prove: "I was certified for CF30 at Firm X from 2020-2026" — with cryptographic proof the attestation is authentic.

**Revocation visibility:** If certification is revoked mid-year, verification status changes. New employer querying an old attestation sees "Revoked" status — critical for preventing bad actors from moving between firms.


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

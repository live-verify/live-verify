---
title: "Sanctions Screening Confirmations"
category: "Professional Ethics & Compliance"
volume: "Large"
retention: "7-10 years (regulatory audit)"
slug: "sanctions-screening-confirmations"
verificationMode: "clip"
tags: ["sanctions", "ofac", "screening", "aml", "compliance", "financial-crime"]
furtherDerivations: 1
---

## What is a Sanctions Screening Confirmation?

Before doing business with someone — opening an account, processing a payment, entering a contract — firms must check they're not on a sanctions list. The screening confirmation documents that this check was performed, when, against which lists, and the result.

If you do business with a sanctioned party, even accidentally, the penalties are severe (fines, criminal prosecution, reputational destruction). The screening confirmation proves you did your due diligence.

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 1px solid #8B0000; background: #fff; padding: 0;">
  <div style="background: #8B0000; color: #fff; padding: 15px;">
    <div style="font-weight: bold; font-size: 1.1em;"><span verifiable-text="start" data-for="sanctionsscreeningco"></span>SANCTIONS SCREENING CONFIRMATION</div>
    <div style="font-size: 0.8em;">Financial Crime Compliance</div>
  </div>
  <div style="padding: 20px; font-size: 0.9em; line-height: 1.6;">
    <p><strong>Screened Party:</strong> Meridian Trading GmbH<br>
    <strong>Screening Date:</strong> February 15, 2026 14:32:01 UTC<br>
    <strong>Reference:</strong> SCR-2026-00442871</p>
<div style="background: #f5fff5; padding: 15px; margin: 15px 0; border: 1px solid #228B22;">
      <p style="margin: 0; color: #228B22; font-weight: bold;">✓ NO MATCHES FOUND</p>
      <p style="margin: 10px 0 0;"><strong>Lists Screened:</strong></p>
      <p style="margin: 5px 0 0;">• OFAC SDN List (v. 2026-02-15)</p>
      <p style="margin: 5px 0 0;">• EU Consolidated Sanctions List</p>
      <p style="margin: 5px 0 0;">• UN Security Council Sanctions</p>
      <p style="margin: 5px 0 0;">• HMT UK Sanctions List</p>
    </div>
<p style="font-size: 0.85em; color: #666;">Screening Provider: World-Check (Refinitiv)<br>
    Compliance Officer: J. Martinez</p>
<div style="margin-top: 15px; font-size: 0.8em; font-family: monospace; text-align: center; color: #666; border-top: 1px dashed #ccc; padding-top: 10px;">
      <div data-verify-line="sanctionsscreeningco" style="border-top: 1px dashed #999; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
        title="Demo only: This is an illustrative example of the verification line">
        <span data-verify-line="sanctionsscreeningco">verify:sterling-bank.com/sanctions</span> <span verifiable-text="end" data-for="sanctionsscreeningco"></span>
      </div>
    </div>
  </div>
</div>

## The Problem

- Firms claim they screened when they didn't
- Screening results are backdated after problems emerge
- Fabricated confirmations to satisfy audit requirements
- Disputes about what lists were checked and when

**The Fix:** Screening confirmation hashed at time of screening, with timestamp and list versions. Auditor or regulator can verify: this exact screening occurred at this exact time against these exact list versions. Can't be fabricated after the fact.

**Rescreening visibility:** When a party is re-screened, previous confirmations remain valid but show "Superseded" — the audit trail is preserved. If a re-screening reveals a match, the timeline is clear.

## What Is Checked

**Screened party name**, screening timestamp, reference number, lists checked (with versions), result (no match / potential match / confirmed match), screening provider, compliance officer sign-off.

## What the Checker Sees

**Status Indications:**
- **Clear** — No matches at time of screening
- **Potential Match** — Review required (false positive evaluation)
- **Confirmed Match** — Party is on sanctions list (do not proceed)
- **Expired** — Screening too old, re-screening required
- **Superseded** — Party re-screened with updated result

## Why Continuous Screening Matters

Sanctions lists change constantly. Someone cleared today might be sanctioned tomorrow. Firms must:
- Screen at onboarding
- Re-screen periodically (daily for payments, quarterly for dormant relationships)
- Re-screen when lists update

A confirmation is a point-in-time snapshot. It proves you checked — but doesn't guarantee the party is still clear.

## Jurisdiction Differences

| Jurisdiction | Regulator | Primary Lists | Penalties |
|--------------|-----------|---------------|-----------|
| **US** | OFAC (Treasury) | SDN, Sectoral Sanctions, CAPTA | Up to $1M per violation, criminal prosecution |
| **UK** | HMT, OFSI | UK Sanctions List, consolidated list | Unlimited fines, criminal liability |
| **EU** | European Commission | EU Consolidated List | National enforcement varies |
| **UN** | Security Council | UN Sanctions Lists | Member states must implement |

US OFAC applies extraterritorially — even non-US firms processing USD transactions must comply.

## Who Checks It

**Correspondent banks** — Before processing payments through your institution
**Auditors** — Testing AML/sanctions program effectiveness
**Regulators** — Examinations, enforcement investigations
**Counterparties** — Due diligence before entering contracts
**Insurers** — Trade credit, political risk (sanctions compliance warranties)

## Authority Chain

**Pattern:** Regulated

Authorized financial firms issue sanctions screening confirmations proving they checked clients against official sanctions lists.

```
✓ compliance.example-bank.co.uk/sanctions/verify — Authorized financial firm's compliance office
  ✓ fca.org.uk/register — Regulates UK financial crime prevention
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## The False Positive Problem

Most "matches" are false positives — common names, similar spellings. The confirmation should document:
- Initial match result
- Review performed (who, when, rationale)
- Final determination (true match vs. false positive)

This review documentation is also verifiable — proving the firm didn't just ignore potential matches.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).

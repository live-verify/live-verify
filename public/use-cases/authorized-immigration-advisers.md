---
title: "Authorized Immigration Advisers"
category: "Professional & Occupational Licenses"
volume: "Medium"
retention: "Registration period + 2-5 years (complaints, disciplinary records, client redress)"
slug: "authorized-immigration-advisers"
verificationMode: "clip"
tags: ["immigration", "adviser", "OISC", "MARA", "IAA", "professional-license", "consumer-protection", "regulatory", "domain-mismatch"]
furtherDerivations: 1
---

## What is an Authorized Immigration Adviser?

In several jurisdictions, providing immigration advice is a regulated activity. Only advisers registered with the relevant regulatory body may lawfully advise on visa applications, asylum claims, or citizenship matters. In the UK, the Office of the Immigration Services Commissioner (OISC) maintains a register of authorized advisers. In Australia, the Migration Agents Registration Authority (MARA) performs the same role. In New Zealand, it is the Immigration Advisers Authority (IAA).

An adviser displays a claim on their website that they are registered. A prospective client has no practical way to verify that claim without leaving the site and searching the regulator's register — assuming they know which register to search, and that the register is up to date.

This matters because:

- providing immigration advice without registration is a criminal offence in the UK, Australia, and New Zealand
- victims of unlicensed advisers often lose their fees, their visa applications, and sometimes their immigration status entirely
- advisers may claim a higher competence level than they hold (OISC registers advisers at Levels 1, 2, and 3, each permitting progressively more complex work)
- suspended or struck-off advisers may continue advertising as registered for months after enforcement action
- "immigration consultants" operating with no registration at all use professional-looking websites to appear legitimate

**Why would you bother verifying?** Immigration advice is one of the highest-stakes professional relationships a person can enter. A botched visa application does not just waste the fee — it can trigger a refusal that must be declared on all future applications, create an overstay record, or lead to removal from the country. The client may lose their job, their housing, and their right to remain. For asylum seekers, the consequences are even more severe: a poorly prepared claim can result in deportation to the country they fled. Unlicensed advisers are disproportionately active in communities with limited English, where clients are least able to verify credentials independently. Verification protects both sides: the legitimate adviser proves their registration to prospective clients, and the client avoids handing their immigration future to someone who was never authorized — or who was struck off last month and is still advertising.

A verifiable registration claim is a short statement, issued by the regulatory body, naming the adviser and the site where the claim is displayed. The client can verify it in place — on the adviser's own website — without searching the regulator's register separately.

## Example: OISC Registration Claim

The regulatory body supplies the adviser with an HTML snippet to embed on their site. The inline styling is ignored by clip mode — only the text content matters for hashing.

<div style="max-width: 480px; margin: 24px auto; background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%); border: 1px solid #1d70b8; border-radius: 8px; padding: 24px; box-shadow: 0 4px 12px rgba(29,112,184,0.15); font-family: 'Segoe UI', Arial, sans-serif;">
  <div style="display: flex; align-items: center; margin-bottom: 16px;">
    <div style="width: 40px; height: 40px; background: #1d70b8; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 0.65em; color: #fff; margin-right: 12px;">OISC</div>
    <div style="font-size: 0.75em; color: #1d70b8; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">Registered Immigration Adviser</div>
  </div>
  <span verifiable-text="start" data-for="adviser1"></span>
  <div style="color: #333; font-size: 0.95em; line-height: 1.7;">
    <span style="color: #000; font-weight: 600;">Global Migration Partners Ltd</span> <span style="color: #666;">(globalmigration.co.uk)</span><br>
    is an OISC registered immigration adviser<br>
    at <span style="color: #1d70b8; font-weight: 600;">Level 3</span> (full competence) on
  </div>
  <div style="margin-top: 12px; padding-top: 10px; border-top: 1px solid #ccc; font-family: 'Courier New', monospace; font-size: 0.78em; color: #1d70b8;">
    <span data-verify-line="adviser1">verify:oisc.gov.uk/advisers</span>
  </div>
  <span verifiable-text="end" data-for="adviser1"></span>
</div>

The text that clip mode sees and hashes is simply:

```
Global Migration Partners Ltd (globalmigration.co.uk)
is an OISC registered immigration adviser
at Level 3 (full competence) on
verify:oisc.gov.uk/advisers
```

The regulator controls the content. The adviser just embeds the snippet. The hash is unaffected by any styling changes.

## Example: Unauthorized Site Copies the Claim

If a scam site copies this text verbatim onto `cheapvisas247.com`, the hash still verifies — the text is identical. But the browser extension can detect the mismatch:

1. The claim text contains `(globalmigration.co.uk)` — the extension extracts the domain in parentheses
2. The verification response includes `"allowedDomains": ["globalmigration.co.uk", "*.globalmigration.co.uk"]`
3. The current page is `cheapvisas247.com`, which matches neither

The extension shows an amber warning:

> "This adviser registration verified, but it names globalmigration.co.uk and you are on cheapvisas247.com."

The domain in the claim text also serves as a human-readable check — a careful client can see the mismatch even without the extension.

## Example: Suspended Registration

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #7a1f1f; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;">Verification Result
═══════════════════════════════════════════════════════════════════

Status:           SUSPENDED
Reason:           Registration suspended by OISC
Result:           This adviser is not currently authorized to provide
                  immigration advice

verify:oisc.gov.uk/advisers
</pre>
</div>

## Data Verified

Adviser or firm legal name, registered site domain, regulatory body, registration level or category, registration period, and current status.

**Document Types:**
- **Registration Confirmation** — The primary claim: this adviser is registered at a specific level to provide immigration advice.
- **Level Change Notice** — Amendment when an adviser moves between competence levels (e.g., OISC Level 1 to Level 2).
- **Scope Restriction** — Where registration is limited to specific categories of immigration work.

**Privacy Salt:** Generally not required. Immigration adviser registrations are public-register information that the adviser wants clients to see. The regulator may salt if enforcement-sensitive detail is attached to the claim.

## Data Visible After Verification

Shows the issuer domain (e.g., `oisc.gov.uk`, `mara.gov.au`, `iaa.govt.nz`) and the current registration status.

**Verification Response Format:**

```json
{
  "status": "verified",
  "allowedDomains": ["globalmigration.co.uk", "*.globalmigration.co.uk"]
}
```

The `allowedDomains` field enables browser extensions to detect domain mismatches — where a valid claim has been copied onto an unregistered adviser's site.

**Status Indications:**
- **Registered** — Current registration is active at the stated level.
- **Expired** — Registration period ended; renewal required before the adviser may lawfully practise.
- **Suspended** — Registration suspended pending investigation or disciplinary proceedings.
- **Cancelled** — Registration permanently removed by the regulatory body.
- **Level Downgraded** — Adviser remains registered but at a lower competence level than the claim states.
- **404** — No such registration was issued by the claimed regulatory body.

## Second-Party Use

The **visa applicant** benefits directly.

**Pre-engagement confidence:** Before sharing personal documents and paying fees, the applicant can verify that the adviser is genuinely registered at the claimed level, not merely asserting it.

**Competence-level check:** OISC levels matter. A Level 1 adviser cannot represent clients at tribunal. A client needing tribunal representation can verify that the adviser holds Level 2 or Level 3 registration before instructing them.

**Domain-mismatch protection:** Even without the extension, the site domain in the claim text is a visible check. With the extension, domain mismatches produce an automatic warning — relevant when a scam site clones a legitimate adviser's branding.

## Third-Party Use

**Home Office and Immigration Authorities**

**Enforcement support:** Immigration authorities can check whether an adviser who submitted an application was registered at the time. A claim that verified at submission time but now returns SUSPENDED or CANCELLED provides a clear enforcement trail.

**Solicitors Referring Clients**

**Referral due diligence:** Solicitors who refer immigration work to OISC-registered advisers (rather than handling it themselves) can verify the adviser's current registration before making the referral, satisfying their own professional obligations.

**Employers Sponsoring Visas**

**Adviser vetting:** Employers using immigration advisers to handle sponsored worker visas can verify the adviser's registration before engaging them. A failed or mismatched verification is a reason to choose a different adviser.

## Verification Architecture

**The "Registered Adviser" Trust Problem**

- **Badge copying:** Any website can display "OISC Registered" or "MARA Agent" — these are just images or text with no binding to the regulator.
- **Level inflation:** An adviser registered at Level 1 (basic advice only) may advertise as Level 3 (full competence including tribunal representation).
- **Stale registers:** Regulatory registers are accurate but require the client to know the register exists, find it, and search it correctly — steps many vulnerable clients do not take.
- **Post-suspension persistence:** An adviser suspended or struck off may continue operating their website unchanged for months, taking on new clients who have no idea.
- **No-registration fraud:** Individuals with no registration at all set up professional-looking websites offering immigration services. The absence of a registration number is not obvious to someone unfamiliar with the regulatory framework.

The verifiable claim addresses these because:

1. The regulator issues the claim — it is not self-asserted by the adviser
2. The claim names the specific site where it applies
3. The claim states the competence level, verified against the regulator's own data
4. Suspension or cancellation is immediate — the endpoint returns SUSPENDED or CANCELLED
5. The browser extension can detect domain mismatches automatically

## Competition vs. Current Practice

| Feature | Live Verify | OISC Register Search | Adviser's Own Website Claim |
| :--- | :--- | :--- | :--- |
| **Issuer-controlled** | **Yes.** Regulator issues the claim. | **Yes.** Regulator maintains the register. | **No.** Adviser self-asserts. |
| **Domain-bound** | **Yes.** Claim names the authorized site. | **No.** | **No.** |
| **Revocable** | **Immediate.** Endpoint returns SUSPENDED or CANCELLED. | **Updated periodically.** Register reflects current status but client must re-check. | **No.** Website claim persists after suspension. |
| **Verifiable in place** | **Yes.** On the adviser's own page. | **No.** Requires leaving to search a separate site. | **No.** Self-assertion only. |
| **Detects site copying** | **Yes.** Domain mismatch warning. | **No.** | **No.** |

**Practical conclusion:** regulatory registers remain the authoritative source and are complementary to this approach. The verifiable claim brings the register's answer to the point where the client is making their decision — the adviser's own website — rather than requiring the client to find and search the register independently.

## Authority Chain

**Pattern:** Regulatory / Government-backed

```
✓ oisc.gov.uk/advisers — Registered immigration adviser verification
  ✓ gov.uk/government/organisations/home-office — Home Office oversight of immigration services regulation
    ✓ gov.uk — UK Government
```

<details>
<summary>Australia — MARA</summary>

```
✓ mara.gov.au/advisers — Registered migration agent verification
  ✓ homeaffairs.gov.au — Department of Home Affairs oversight
    ✓ gov.au — Australian Government
```

</details>

<details>
<summary>New Zealand — IAA</summary>

```
✓ iaa.govt.nz/advisers — Licensed immigration adviser verification
  ✓ justice.govt.nz — Ministry of Justice oversight
    ✓ govt.nz — New Zealand Government
```

</details>

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Further Derivations

1. **Firm-Level Staff Roster Verification** — A registered firm embeds a verifiable list of its individual advisers and their competence levels, so clients can confirm both the firm and the specific adviser handling their case.
2. **Continuing Professional Development Records** — Verification that an adviser has completed mandatory CPD requirements for their current registration period, relevant when competence is challenged in a complaint.

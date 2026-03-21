---
title: "Professional Indemnity Insurance Live Status"
category: "Professional & Occupational Licenses"
volume: "Large"
retention: "Policy period + 6 years (statute of limitations for negligence claims)"
slug: "professional-indemnity-live-status"
verificationMode: "clip"
tags: ["professional-indemnity", "PI-insurance", "solicitor", "architect", "surveyor", "accountant", "SRA", "RICS", "ICAEW", "live-status", "domain-mismatch", "insurer-issued-claim"]
furtherDerivations: 1
---

## What is Professional Indemnity Live Status?

Solicitors, architects, surveyors, accountants, and other regulated professionals are required to carry professional indemnity (PI) insurance. Their clients are routinely told — by regulators, by guidance notes, by conveyancing checklists — to check that the professional they are instructing has current PI cover. In practice, there is no convenient way to do this.

The client can ask the professional for a copy of their certificate of insurance. The professional produces a PDF or a scanned document. That document may be current, or it may be from a previous policy year. It may show the correct limits, or it may have been edited. The client has no way to check without phoning the insurer, who will usually decline to confirm details to a third party.

This use case covers the live-status claim — a short statement issued by the insurer, embedded on the professional's website, that the client can verify in place. It is distinct from the policy document itself (covered in [Professional Liability / E&O Insurance](professional-liability-eo.md)), which verifies the full certificate with limits, retroactive dates, and deductibles.

**What this claim answers:** the insurer says a current policy exists for this firm at this stated level. **What it does not answer:** whether the cover applies to the specific instruction the client is considering, whether the limit meets the relevant regulatory minimum, whether the policy is on a claims-made or occurrence basis, or whether any exclusions or conditions affect the client's particular risk. It is a useful signal — stronger than a self-asserted website statement or a stale PDF certificate — but it is not a guarantee of coverage for a specific matter.

**Insurer participation:** This model assumes insurers are willing to publish client-facing live-status endpoints. Some insurers may have consent, confidentiality, or duty-of-care concerns about exposing policy existence to third parties. The professional's consent to display the claim on their own site may address some of these, but insurer adoption is not guaranteed and may require industry or regulatory encouragement.

This follows the same "authority-issued claim on a third-party site" pattern as [Licensed Reseller Authorizations](licensed-reseller-authorizations.md) and [Insurance Panel Membership](insurance-panel-membership.md). The insurer issues the claim. The professional embeds it. The client verifies it against the insurer's domain.

## Example: Solicitor's Website

The insurer supplies the firm with an HTML snippet to embed on their website. The inline styling is ignored by clip mode — only the text content matters for hashing.

<div style="max-width: 480px; margin: 24px auto; background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%); border: 1px solid #003366; border-radius: 8px; padding: 24px; box-shadow: 0 4px 12px rgba(0,51,102,0.15); font-family: 'Segoe UI', Arial, sans-serif;">
  <div style="display: flex; align-items: center; margin-bottom: 16px;">
    <div style="width: 40px; height: 40px; background: #003366; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 0.65em; color: #fff; margin-right: 12px;">Hx</div>
    <div style="font-size: 0.75em; color: #003366; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">Insured Professional</div>
  </div>
  <span verifiable-text="start" data-for="pistatus1"></span>
  <div style="color: #333; font-size: 0.95em; line-height: 1.7;">
    <span style="color: #000; font-weight: 600;">Turner & Associates Solicitors</span> <span style="color: #777;">(turnerassociates.co.uk)</span><br>
    holds professional indemnity insurance<br>
    of <span style="color: #003366; font-weight: 600;">GBP 2,000,000</span> with <span style="color: #003366; font-weight: 600;">Hiscox</span> (policy current) on
  </div>
  <div style="margin-top: 12px; padding-top: 10px; border-top: 1px solid #ddd; font-family: 'Courier New', monospace; font-size: 0.78em; color: #003366;">
    <span data-verify-line="pistatus1">verify:hiscox.co.uk/pi-status/v</span>
  </div>
  <span verifiable-text="end" data-for="pistatus1"></span>
</div>

The text that clip mode sees and hashes is simply:

```
Turner & Associates Solicitors (turnerassociates.co.uk)
holds professional indemnity insurance
of GBP 2,000,000 with Hiscox (policy current) on
verify:hiscox.co.uk/pi-status/v
```

The insurer controls the content. The professional just embeds the snippet. The hash is unaffected by any styling changes the firm makes to match its site design.

## Example: Unauthorized Site Copies the Claim

If a fraudulent site copies this claim text verbatim onto `fakesolicitors.co.uk`, the hash still verifies — the text is identical. But the browser extension can detect the mismatch:

1. The claim text contains `(turnerassociates.co.uk)` — the extension extracts the domain in parentheses
2. The verification response includes `"allowedDomains": ["turnerassociates.co.uk", "*.turnerassociates.co.uk"]`
3. The current page is `fakesolicitors.co.uk`, which matches neither

The extension shows an amber warning:

> "This PI status claim verified, but it names turnerassociates.co.uk and you are on fakesolicitors.co.uk."

The domain in the claim text also serves as a human-readable check — a careful client can see the mismatch even without the extension.

## Example: Policy Lapsed or Cancelled

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #7a1f1f; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;">Verification Result
═══════════════════════════════════════════════════════════════════

Status:           REVOKED
Reason:           Policy cancelled — premium non-payment
Result:           This firm no longer holds current PI cover

verify:hiscox.co.uk/pi-status/v
</pre>
</div>

The claim snippet remains on the firm's website, but verification now returns REVOKED. A client checking before instructing the firm sees the failure immediately.

## Data Verified

Firm name, firm website domain, insurer, coverage limit, and current policy status.

**Document Types:**
- **PI Live Status Claim** — The primary claim: this firm holds current professional indemnity insurance with the named insurer at the stated level.
- **Status Update** — Amended claim reflecting a change in cover level, insurer, or policy status.

**Privacy Salt:** Generally not required. PI cover is a commercial and regulatory expectation that the professional wants to be public — it builds client confidence. The insurer may salt if the specific cover level is commercially sensitive in a particular market segment.

## Data Visible After Verification

Shows the issuer domain (e.g., `hiscox.co.uk`, `aviva.co.uk`, `travelers.com`) and current policy status.

**Verification Response Format:**

```json
{
  "status": "verified",
  "allowedDomains": ["turnerassociates.co.uk", "*.turnerassociates.co.uk"]
}
```

The `allowedDomains` field enables browser extensions to detect domain mismatches — where a valid claim has been copied onto another firm's site or a fraudulent site.

**Status Indications:**
- **Current** — PI policy is active and the firm is insured at the stated level.
- **Expired** — Policy period ended; renewal required.
- **Revoked** — Policy cancelled by insurer (non-payment, material misrepresentation, or other cause).
- **Suspended** — Cover paused pending review (e.g., claims investigation, underwriting query).
- **Limit Reduced** — Cover is active but the stated limit no longer applies; a new claim with the correct limit will be issued.
- **404** — No such PI status claim was issued by the claimed insurer.

## Second-Party Use

The **client** benefits directly.

**Pre-instruction confidence:** Before engaging a solicitor, architect, or surveyor, the client can verify that the firm has current PI cover without relying on the firm's own assertion or requesting a certificate.

**Transaction due diligence:** In property transactions, the buyer's solicitor and the seller's solicitor each rely on the other having PI cover. A verifiable claim on the counterparty firm's website provides immediate confirmation without a phone call or email exchange.

**Domain-mismatch protection:** Even without the extension, the firm's domain in the claim text is a visible check. With the extension, domain mismatches produce an automatic warning — relevant when a client has arrived at a firm's site via a search engine and wants to confirm they are on the genuine site.

## Third-Party Use

**Regulatory Bodies (SRA, RICS, ICAEW, ARB)**

**Compliance monitoring:** The Solicitors Regulation Authority, the Royal Institution of Chartered Surveyors, the Institute of Chartered Accountants, and similar bodies require their members to maintain PI cover. Verification-endpoint analytics allow regulators to detect where PI status claims are active, where they have lapsed, and where firms are displaying stale claims.

**Intervention triggers:** A REVOKED status on a solicitor's website is an early signal that the firm may be practising without cover — a serious regulatory matter that may warrant intervention.

**Other Professionals in a Transaction**

**Counterparty cover reliance:** In property, construction, and corporate transactions, multiple professionals rely on each other's PI cover. A surveyor instructed by a lender needs to know the solicitor acting for the borrower is insured. A verifiable claim replaces the current practice of exchanging PDF certificates by email.

**Clients Evaluating Professionals**

**Comparison shopping:** When a client is choosing between firms, the presence and status of a verifiable PI claim is one signal of operational credibility. A firm that embeds a live insurer-issued claim is demonstrating that its cover is current and that it is willing to let clients verify this independently.

## Verification Architecture

**The "We Have PI Cover" Trust Problem**

- **Self-assertion:** Any firm can state "We carry full professional indemnity insurance" on its website or in its engagement letter. This is just text.
- **Stale certificates:** A firm may produce a certificate from a previous policy year, whether through negligence or intent. The certificate looks identical to a current one.
- **Fabricated certificates:** PI certificates are simple documents — a firm name, a policy number, a limit, and a date range. They are straightforward to fabricate or alter in a PDF editor.
- **Insurer non-disclosure:** If a client phones the insurer to check, the insurer will typically decline to confirm or deny cover for a third party, citing data protection and commercial confidentiality.
- **Regulatory lag:** The SRA, RICS, and ICAEW maintain registers, but these are updated periodically, not in real time. A firm's cover may lapse weeks before the register reflects this.

The verifiable claim addresses these because:

1. The insurer issues the claim — it is not self-asserted by the professional
2. The claim names the specific website where it applies
3. Revocation is immediate — the endpoint returns REVOKED the moment the policy is cancelled or lapses
4. The browser extension can detect domain mismatches automatically

## Competition vs. Current Practice

| Feature | Live Verify | PDF Certificate | Firm's Website Statement | Regulator's Register | Phone Call to Insurer |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Issuer-controlled** | **Yes.** Insurer issues the claim. | **Initially.** But editable after issue. | **No.** Firm self-asserts. | **Yes.** But updated periodically. | **Refused.** Insurer won't confirm to third parties. |
| **Domain-bound** | **Yes.** Claim names the firm's site. | **No.** | **No.** | **No.** | **No.** |
| **Revocable** | **Immediate.** Endpoint returns REVOKED. | **No.** PDF persists indefinitely. | **No.** Text persists. | **Delayed.** Days to weeks. | **N/A.** |
| **Verifiable pre-instruction** | **Yes.** On the firm's website. | **Requires requesting it.** | **No.** | **Requires visiting the register.** | **Usually refused.** |
| **Detects stale claims** | **Yes.** Revoked status is immediate. | **No.** | **No.** | **Partially.** If the register is current. | **N/A.** |

**Practical conclusion:** regulator registers remain necessary for disciplinary records, practising certificates, and other regulatory functions. They answer a different question from the one the client is asking on a firm's website ("does this firm actually have current PI cover right now?"). The verifiable claim answers that question in place, at the moment the client is deciding whether to instruct the firm.

## Authority Chain

**Pattern:** Regulated / Insurer

```
✓ hiscox.co.uk/pi-status/v — Professional indemnity status verification
  ✓ fca.org.uk/register — Regulates UK general insurance firms
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Further Derivations

1. **Run-Off Cover Status** — When a firm closes or a sole practitioner retires, run-off PI cover continues for claims arising from past work. A live-status variant for run-off cover, hosted on the insurer's own site rather than the defunct firm's site, allows clients with historic claims to verify that run-off cover is in place.
2. **Project-Specific PI Confirmation** — For large construction or infrastructure projects, the client or project manager needs to verify that each professional on the project carries PI cover at a level specified in their appointment. A project-specific claim could name the project and the required minimum, not just the firm's general cover level.

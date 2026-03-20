---
title: "Software Licensing and Reseller Authorizations"
category: "Business & Commerce"
volume: "Large"
retention: "Authorization period + 1-3 years (audit defence, compliance records)"
slug: "software-licensing-reseller-authorizations"
verificationMode: "clip"
tags: ["software-licensing", "reseller", "authorized-partner", "volume-licensing", "grey-market", "compliance-audit", "enterprise-software", "domain-mismatch"]
furtherDerivations: 1
---

## What is a Software Licensing Reseller Authorization?

A software vendor authorizes specific partners to resell its products — typically volume licenses, subscriptions, and enterprise agreements. The partner displays a claim on its website that it is an authorized reseller of that vendor's product line.

The buyer — usually an IT department or procurement team — has no practical way to verify that claim at the point of purchase. Vendor partner directories exist, but they are often incomplete, display stale tier statuses, or require navigating through multiple pages to confirm a specific partner's authorization for a specific product line.

This matters because:

- enterprise software purchases routinely involve five- and six-figure commitments
- grey-market license keys are resold outside the vendor's authorized channel, often violating the license terms and exposing the buyer to compliance liability
- fraudulent volume licensing — keys that appear valid at activation but are later flagged as stolen, MSDN/dev-use-only, or geographically restricted — is a documented problem across all major software vendors
- compliance audits by organizations such as the BSA (Business Software Alliance) can result in penalties many times the original license cost
- unauthorized sellers claim "Gold Partner" or "Cloud Solution Provider" status with nothing more than a logo on a webpage

A verifiable reseller authorization is a short claim, issued by the software vendor, naming the partner and the site where the authorization applies. The buyer can verify it on the partner's site without navigating to the vendor's partner portal.

## Example: Cloud Software Reseller Authorization

The vendor supplies the partner with an HTML snippet to embed on their site. The inline styling is ignored by clip mode — only the text content matters for hashing.

<div style="max-width: 480px; margin: 24px auto; background: linear-gradient(135deg, #0a2540 0%, #1a3a5c 100%); border: 1px solid #0078d4; border-radius: 8px; padding: 24px; box-shadow: 0 4px 12px rgba(0,120,212,0.2); font-family: 'Segoe UI', Arial, sans-serif;">
  <div style="display: flex; align-items: center; margin-bottom: 16px;">
    <div style="width: 40px; height: 40px; background: #0078d4; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 0.7em; color: #fff; margin-right: 12px;">MS</div>
    <div style="font-size: 0.75em; color: #0078d4; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">Authorized Partner</div>
  </div>
  <span verifiable-text="start" data-for="reseller1"></span>
  <div style="color: #e0e0e0; font-size: 0.95em; line-height: 1.7;">
    <span style="color: #fff; font-weight: 600;">CloudTech Solutions Ltd</span> <span style="color: #999;">(cloudtech.io)</span><br>
    is a licensed reseller of <span style="color: #0078d4; font-weight: 600;">Microsoft 365</span><br>
    <span style="color: #0078d4; font-weight: 600;">Business and Enterprise</span> products on
  </div>
  <div style="margin-top: 12px; padding-top: 10px; border-top: 1px solid #2a4a6c; font-family: 'Courier New', monospace; font-size: 0.78em; color: #0078d4;">
    <span data-verify-line="reseller1">verify:microsoft.com/partners</span>
  </div>
  <span verifiable-text="end" data-for="reseller1"></span>
</div>

The text that clip mode sees and hashes is simply:

```
CloudTech Solutions Ltd (cloudtech.io)
is a licensed reseller of Microsoft 365
Business and Enterprise products on
verify:microsoft.com/partners
```

The vendor controls the branding. The partner just embeds the snippet. The hash is unaffected by any styling changes.

## Example: Unauthorized Site Copies the Claim

If a scam site copies this text verbatim onto `cheapo365licenses.com`, the hash still verifies — the text is identical. But the browser extension can detect the mismatch:

1. The claim text contains `(cloudtech.io)` — the extension extracts the domain in parentheses
2. The verification response includes `"allowedDomains": ["cloudtech.io", "*.cloudtech.io"]`
3. The current page is `cheapo365licenses.com`, which matches neither

The extension shows an amber warning:

> "This reseller authorization verified, but it names cloudtech.io and you are on cheapo365licenses.com."

The domain in the claim text also serves as a human-readable check — a careful buyer can see the mismatch even without the extension.

## Example: Revoked Authorization

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #7a1f1f; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;">Verification Result
═══════════════════════════════════════════════════════════════════

Status:           REVOKED
Reason:           Partner agreement terminated by vendor
Result:           This reseller is no longer authorized for this product line

verify:microsoft.com/partners
</pre>
</div>

## Data Verified

Partner legal name, authorized site domain, software vendor, product line or licensing programme, authorization period, and current status.

**Document Types:**
- **Reseller Authorization Certificate** — The primary claim: this partner is authorized to resell this product line on this site.
- **Licensing Programme Enrollment** — Confirmation that the partner is enrolled in a specific licensing programme (e.g., CSP, EA, MPSA).
- **Product-Line Addition / Removal** — Amendment to an existing authorization when the partner gains or loses access to a product category.

**Privacy Salt:** Generally not required. Partner authorizations are commercial claims that the partner wants to be public. The vendor may salt if the authorization tier or specific programme enrollment is commercially sensitive.

## Data Visible After Verification

Shows the issuer domain (e.g., `microsoft.com`, `salesforce.com`, `oracle.com`) and the current authorization status.

**Verification Response Format:**

```json
{
  "status": "verified",
  "allowedDomains": ["cloudtech.io", "*.cloudtech.io"]
}
```

The `allowedDomains` field enables browser extensions to detect domain mismatches — where a valid claim has been copied onto an unauthorized site.

**Status Indications:**
- **Authorized** — Current partner authorization is active for this product line and site.
- **Expired** — Authorization period ended; renewal or re-enrollment required.
- **Revoked** — Vendor has terminated the partner agreement.
- **Suspended** — Authorization paused pending review (e.g., compliance investigation, licensing violation).
- **Product Line Removed** — Partner is still authorized for other products but not this one.
- **404** — No such authorization was issued by the claimed vendor.

## Second-Party Use

The **purchasing company** (typically its IT department or procurement team) benefits directly.

**Pre-purchase licence confidence:** Before committing to a volume licence agreement, the buyer can verify that the reseller is genuinely authorized by the vendor, not a grey-market intermediary selling keys of uncertain provenance.

**Compliance audit defence:** If the BSA or a vendor's own audit team later questions the legitimacy of a company's licences, a verified reseller authorization provides evidence that the purchase was made through an authorized channel. This matters because compliance penalties are calculated based on retail pricing, not the discount the company actually paid.

**Domain-mismatch protection:** Even without the extension, the site domain in the claim text is a visible check. With the extension, domain mismatches produce an automatic warning — relevant when a procurement officer is evaluating an unfamiliar reseller found through a search engine.

## Third-Party Use

**Software Vendors and Channel Teams**

**Channel monitoring:** The vendor can detect where its authorization claims are being displayed — and where they are being copied to unauthorized sites — through verification-endpoint analytics.

**Revocation enforcement:** When a partner is dropped from the authorized channel, the verification endpoint returns REVOKED. The claim still exists on the partner's site but now fails verification. This is faster and more reliable than asking the former partner to remove badges.

**Compliance Auditors and the BSA**

**Audit evidence:** When investigating a company's software estate, auditors can check whether each reseller the company purchased from was authorized at the time of sale. A REVOKED or 404 result for a reseller that sold volume licences raises an immediate question about the legitimacy of those licences.

**Procurement and Vendor Management Teams**

**Vendor vetting:** Large enterprises that maintain approved-supplier lists can use verified authorizations as part of the onboarding check for a new software reseller, rather than relying on the reseller's self-reported partner status.

## Verification Architecture

**The "Authorized Partner" Trust Problem**

- **Badge copying:** Any website can display "Microsoft Gold Partner" or "Salesforce Consulting Partner" — these are images or text with no cryptographic binding to the vendor.
- **Stale directories:** Vendor partner portals are often difficult to search, show outdated tier information, or require the buyer to know the partner's exact legal name.
- **Grey-market licence keys:** Keys purchased in lower-cost regions, harvested from MSDN or developer subscriptions, or obtained through stolen credit cards, then resold as legitimate volume licences.
- **Fraudulent volume licensing:** Sellers that issue fake licence confirmations or forge vendor correspondence to make grey-market keys appear legitimate.
- **Post-revocation persistence:** A partner dropped from a vendor's programme may continue displaying authorization badges and selling from existing key stock for months.
- **Compliance liability transfer:** The purchasing company — not the unauthorized reseller — bears the compliance risk when audited. The reseller has often disappeared by the time the audit occurs.

The verifiable claim addresses these because:

1. The vendor issues the claim — it is not self-asserted by the reseller
2. The claim names the specific site where it applies
3. Revocation is immediate — the endpoint returns REVOKED
4. The browser extension can detect domain mismatches automatically

## Competition vs. Current Practice

| Feature | Live Verify | "Partner" Badge | Vendor Partner Portal | Invoice Only |
| :--- | :--- | :--- | :--- | :--- |
| **Issuer-controlled** | **Yes.** Vendor issues the claim. | **No.** Reseller self-asserts. | **Yes.** But often stale. | **Yes.** But post-purchase. |
| **Domain-bound** | **Yes.** Claim names the authorized site. | **No.** | **Partially.** Links to partner page. | **No.** |
| **Revocable** | **Immediate.** Endpoint returns REVOKED. | **No.** Badge persists. | **Slow.** Portal updates lag. | **No.** |
| **Verifiable pre-purchase** | **Yes.** On the reseller's page. | **No.** | **Requires navigating the vendor portal.** | **No.** |
| **Detects site copying** | **Yes.** Domain mismatch warning. | **No.** | **No.** | **No.** |

**Practical conclusion:** vendor partner portals remain useful for discovering resellers, but they answer a different question ("who sells this?") from the one the buyer is actually asking on a reseller's website ("is this seller actually authorized to sell me this?"). The verifiable claim answers the second question in place.

## Authority Chain

**Pattern:** Commercial / Software Vendor

```
✓ microsoft.com/partners — Authorized software reseller verification
```

For licensing programmes with regulatory oversight (e.g., government procurement frameworks, defence-sector software), the chain would extend upward:

```
✓ vendor.com/partners — Authorized reseller verification
  ✓ procurement-authority.gov/approved-suppliers — Government procurement framework oversight
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Further Derivations

1. **Per-Licence Provenance Records** — Verification that a specific licence key or subscription was issued through the authorized channel, carried on the licence confirmation or invoice.
2. **Licensing Programme Tier Verification** — Variant where the claim includes the partner's programme tier (e.g., Gold, Silver, CSP Direct), allowing buyers to verify not just authorization but capability level.

---
title: "Licensed Reseller Authorizations"
category: "Business & Commerce"
volume: "Large"
retention: "Authorization period + 1-3 years (warranty, complaints, channel audit)"
slug: "licensed-reseller-authorizations"
verificationMode: "clip"
tags: ["reseller", "authorized-dealer", "channel-partner", "counterfeit", "grey-market", "warranty", "consumer-protection", "manufacturer", "retail", "domain-mismatch"]
furtherDerivations: 1
---

## What is a Licensed Reseller Authorization?

A manufacturer authorizes specific retailers to sell its products. The retailer displays a claim — on its website, storefront, or invoice — that it is a licensed or authorized reseller of a particular product line.

The buyer has no practical way to verify that claim. The manufacturer's "where to buy" page may exist, but it is often incomplete, out of date, or hard to find. Meanwhile, the retailer's own assertion — "Authorized NVIDIA Partner" or "Official Apple Reseller" — is trivially easy to copy onto an unauthorized site.

This matters because:

- warranty coverage often depends on purchasing from an authorized channel
- counterfeit and grey-market products are common in high-demand categories (GPUs, phones, luxury goods, auto parts, medical devices)
- consumers lose money and recourse when the reseller turns out to be unauthorized
- manufacturers lose brand control and face warranty fraud from units sold outside the authorized chain

A verifiable reseller authorization is a short claim, issued by the manufacturer, naming the reseller and the site where the authorization applies. The buyer can verify it in place — on the retailer's product page — without leaving the site or searching the manufacturer's directory.

## Example: GPU Reseller Authorization

The manufacturer supplies the retailer with an HTML snippet to embed on their site. The inline styling is ignored by clip mode — only the text content matters for hashing.

<div style="max-width: 480px; margin: 24px auto; background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); border: 1px solid #76b900; border-radius: 8px; padding: 24px; box-shadow: 0 4px 12px rgba(118,185,0,0.2); font-family: 'Segoe UI', Arial, sans-serif;">
  <div style="display: flex; align-items: center; margin-bottom: 16px;">
    <div style="width: 40px; height: 40px; background: #76b900; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 0.7em; color: #000; margin-right: 12px;">NV</div>
    <div style="font-size: 0.75em; color: #76b900; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">Authorized Partner</div>
  </div>
  <span verifiable-text="start" data-for="reseller1"></span>
  <div style="color: #e0e0e0; font-size: 0.95em; line-height: 1.7;">
    <span style="color: #fff; font-weight: 600;">FooBar Electronics Ltd</span> <span style="color: #999;">(foobar50xx.com)</span><br>
    is a licensed reseller of <span style="color: #76b900; font-weight: 600;">NVIDIA GeForce</span><br>
    <span style="color: #76b900; font-weight: 600;">RTX 50 Series</span> products on
  </div>
  <div style="margin-top: 12px; padding-top: 10px; border-top: 1px solid #444; font-family: 'Courier New', monospace; font-size: 0.78em; color: #76b900;">
    <span data-verify-line="reseller1">verify:nvidia.com/resellers</span>
  </div>
  <span verifiable-text="end" data-for="reseller1"></span>
</div>

The text that clip mode sees and hashes is simply:

```
FooBar Electronics Ltd (foobar50xx.com)
is a licensed reseller of NVIDIA GeForce
RTX 50 Series products on
verify:nvidia.com/resellers
```

The manufacturer controls the branding. The retailer just embeds the snippet. The hash is unaffected by any styling changes.

## Example: Unauthorized Site Copies the Claim

If a scam site copies this text verbatim onto `scamgpus.com`, the hash still verifies — the text is identical. But the browser extension can detect the mismatch:

1. The claim text contains `(foobar50xx.com)` — the extension extracts the domain in parentheses
2. The verification response includes `"allowedDomains": ["foobar50xx.com", "*.foobar50xx.com"]`
3. The current page is `scamgpus.com`, which matches neither

The extension shows an amber warning:

> "This reseller authorization verified, but it names foobar50xx.com and you are on scamgpus.com."

The domain in the claim text also serves as a human-readable check — a careful buyer can see the mismatch even without the extension.

## Example: Revoked Authorization

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #7a1f1f; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;">Verification Result
═══════════════════════════════════════════════════════════════════

Status:           REVOKED
Reason:           Authorization terminated by manufacturer
Result:           This retailer is no longer an authorized reseller

verify:nvidia.com/resellers
</pre>
</div>

## Data Verified

Reseller legal name, authorized site domain, manufacturer or brand, product line or category, authorization period, and current status.

**Document Types:**
- **Reseller Authorization Certificate** — The primary claim: this retailer is authorized to sell this product line on this site.
- **Channel Partner Confirmation** — Broader authorization covering multiple product lines or territories.
- **Product-Line Addition / Removal** — Amendment to an existing authorization.

**Privacy Salt:** Generally not required. Reseller authorizations are commercial claims that the reseller wants to be public. The manufacturer may salt if the authorization structure itself is commercially sensitive.

## Data Visible After Verification

Shows the issuer domain (e.g., `nvidia.com`, `apple.com`, `bosch.com`) and the current authorization status.

**Verification Response Format:**

```json
{
  "status": "verified",
  "allowedDomains": ["foobar50xx.com", "*.foobar50xx.com"]
}
```

The `allowedDomains` field enables browser extensions to detect domain mismatches — where a valid claim has been copied onto an unauthorized site.

**Status Indications:**
- **Authorized** — Current reseller authorization is active for this product line and site.
- **Expired** — Authorization period ended; renewal required.
- **Revoked** — Manufacturer has terminated the authorization.
- **Suspended** — Authorization paused pending review (e.g., compliance investigation, pricing violation).
- **Product Line Removed** — Reseller is still authorized for other products but not this one.
- **404** — No such authorization was issued by the claimed manufacturer.

## Second-Party Use

The **buyer** benefits directly.

**Pre-purchase confidence:** Before committing to a high-value purchase, the buyer can verify that the retailer is genuinely authorized by the manufacturer, not just claiming to be.

**Warranty assurance:** Many manufacturers void warranty for products purchased outside the authorized channel. A verified authorization gives the buyer evidence that the purchase qualifies.

**Domain-mismatch protection:** Even without the extension, the site domain in the claim text is a visible check. With the extension, domain mismatches produce an automatic warning.

## Third-Party Use

**Manufacturers and Brand Protection Teams**

**Channel monitoring:** The manufacturer can detect where its authorization claims are being displayed — and where they are being copied to unauthorized sites — through verification-endpoint analytics.

**Revocation enforcement:** When a reseller is dropped from the authorized channel, the verification endpoint returns REVOKED. The claim still exists on the reseller's site but now fails verification.

**Payment Processors and Marketplaces**

**Merchant vetting:** A payment processor or marketplace can require verified reseller authorization before allowing a merchant to list high-value branded products.

**Consumer Protection and Trading Standards**

**Complaint triage:** When a consumer complains about counterfeit goods, the investigator can check whether the seller was ever authorized by the manufacturer.

## Verification Architecture

**The "Authorized Dealer" Trust Problem**

- **Badge copying:** Any website can display "Authorized NVIDIA Partner" or "Official Apple Reseller" — these are just images or text.
- **Stale directories:** Manufacturer "where to buy" pages are often incomplete, slow to update, and don't cover online-only retailers.
- **Grey-market laundering:** Goods purchased in one market and resold in another, outside the manufacturer's authorized channel, with no warranty coverage.
- **Counterfeit cover:** Unauthorized sellers mix genuine and counterfeit stock, using the "authorized" badge to build trust.
- **Post-revocation persistence:** A retailer dropped from the authorized channel may continue displaying authorization badges for months or years.

The verifiable claim addresses these because:

1. The manufacturer issues the claim — it is not self-asserted by the retailer
2. The claim names the specific site where it applies
3. Revocation is immediate — the endpoint returns REVOKED
4. The browser extension can detect domain mismatches automatically

## Attack Resistance: Text-Swap on a Scam Site

The most sophisticated attack against this model is not copying the claim (which the domain-mismatch check catches) but **intercepting the verification flow on a hostile page.**

**The attack:** A scam site displays "ScamGPUs Ltd" visually, but when the buyer right-clicks to verify, page JavaScript attempts to swap the selected text or clipboard content for a genuine authorized reseller's claim. The hash verifies. The buyer sees green "VERIFIED" and may not notice the verified detail names a different reseller and domain.

**Layered defences:**

1. **Content script isolation:** The browser extension reads from the DOM selection within its own content script context, not from the page's JavaScript or the clipboard. The page's scripts cannot directly intercept or modify what the extension reads. This is the primary defence.
2. **`allowedDomains` response field:** Even if a text swap succeeded, the verification response says `allowedDomains: ["foobar50xx.com"]` and the current page is `scamgpus.com`. The extension fires an amber domain-mismatch warning regardless.
3. **Domain in the claim text:** The human-readable `(foobar50xx.com)` in the verified result is visible to the buyer even without automated checking.
4. **Browser vendor patching:** Chrome, Firefox, and Edge actively close content script isolation bypasses, selection manipulation vectors, and clipboard API abuse. Discovered techniques are patched in browser updates. The scammer is fighting the extension's design and the browser vendor's ongoing security work simultaneously.

**Honest assessment:** Content script isolation provides strong but not absolute protection against page-level manipulation. The domain-mismatch check is the backstop — it works even if the text swap somehow succeeds. The weakest link is the buyer not reading the verified detail, which is why the domain-mismatch warning should be prominent and unmissable.

## Competition vs. Current Practice

| Feature | Live Verify | "Authorized Dealer" Badge | Manufacturer Directory | Invoice Only |
| :--- | :--- | :--- | :--- | :--- |
| **Issuer-controlled** | **Yes.** Manufacturer issues the claim. | **No.** Retailer self-asserts. | **Yes.** But often stale. | **Yes.** But post-purchase. |
| **Domain-bound** | **Yes.** Claim names the authorized site. | **No.** | **Partially.** Links to retailer. | **No.** |
| **Revocable** | **Immediate.** Endpoint returns REVOKED. | **No.** Badge persists. | **Slow.** Directory updates lag. | **No.** |
| **Verifiable pre-purchase** | **Yes.** On the product page. | **No.** | **Requires leaving the site.** | **No.** |
| **Detects site copying** | **Yes.** Domain mismatch warning. | **No.** | **No.** | **No.** |

**Practical conclusion:** manufacturer directories and "where to buy" pages remain useful, but they answer a different question ("where can I buy?") from the one the buyer is actually asking on a retailer's product page ("is this seller actually authorized?"). The verifiable claim answers the second question in place.

## Authority Chain

**Pattern:** Commercial / Manufacturer

```
✓ nvidia.com/resellers — Authorized reseller verification
```

For product lines where a regulatory body oversees distribution (medical devices, pharmaceuticals, firearms), the chain would extend upward:

```
✓ manufacturer.com/resellers — Authorized reseller verification
  ✓ regulator.gov/licensed-distributors — Regulatory oversight of distribution channel
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Further Derivations

1. **Product-Unit Provenance Records** — Per-unit verification that a specific serial number came through the authorized channel, carried on the invoice or packing slip.
2. **Marketplace Seller Authorization** — Variant for third-party sellers on platforms like Amazon, eBay, or Newegg, where the manufacturer authorizes specific seller accounts rather than domains.

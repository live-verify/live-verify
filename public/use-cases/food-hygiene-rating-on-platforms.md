---
title: "Food Hygiene Rating on Delivery Platforms"
category: "Identity & Authority Verification"
volume: "Large"
retention: "Rating period + 1 year (re-inspection cycle)"
slug: "food-hygiene-rating-on-platforms"
verificationMode: "clip"
tags: ["food-safety", "hygiene", "ratings", "delivery-platforms", "restaurants", "public-health", "allowed-domains", "third-party-site", "fsa"]
furtherDerivations: 1
---

## What is a Food Hygiene Rating on a Delivery Platform?

When a consumer orders food through Deliveroo, Just Eat, or Uber Eats, the platform may display a food hygiene rating for the restaurant. That rating is the platform's own data — scraped, cached, or manually entered. It can be stale, wrong, or missing entirely. A restaurant inspected in 2024 may have been re-inspected and downgraded in 2025, but the platform still shows the old rating because nobody updated it.

The Food Standards Agency (FSA) already publishes hygiene ratings. The gap is that those ratings do not travel as verifiable claims. The restaurant cannot prove its rating on a third-party site, and the consumer cannot verify it in place — on the ordering page where the decision happens.

A verifiable hygiene rating claim works like this: the FSA issues the claim, naming the restaurant and its domain. The restaurant embeds it on its own website. The delivery platforms also display it on their listing pages. The consumer clips the claim text from whichever page they are on and verifies it against the FSA's domain.

This is distinct from the physical hygiene sticker in the restaurant window (covered in [Food Hygiene Postings](food-hygiene-postings.md)). This use case addresses the digital channel — where the rating must travel to third-party sites that the FSA does not control.

## Example: Hygiene Rating on a Delivery Platform Listing

The FSA supplies a text claim that the restaurant and platforms can embed in their listing pages. The inline styling is ignored by clip mode — only the text content matters for hashing.

<div style="max-width: 480px; margin: 24px auto; background: #fff; border: 2px solid #2e7d32; border-radius: 8px; padding: 24px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); font-family: 'Segoe UI', Arial, sans-serif;">
  <div style="display: flex; align-items: center; margin-bottom: 16px;">
    <div style="width: 44px; height: 44px; background: #2e7d32; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 1.4em; color: #fff; margin-right: 12px;">5</div>
    <div style="font-size: 0.75em; color: #2e7d32; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">Food Hygiene Rating</div>
  </div>
  <span verifiable-text="start" data-for="hygiene1"></span>
  <div style="color: #333; font-size: 0.95em; line-height: 1.7;">
    <span style="font-weight: 600;">Jade Garden Restaurant</span> <span style="color: #777;">(jadegarden-york.co.uk)</span><br>
    has a Food Hygiene Rating of <span style="color: #2e7d32; font-weight: 600;">5</span><br>
    (inspected Nov 2025) on
  </div>
  <div style="margin-top: 12px; padding-top: 10px; border-top: 1px solid #ccc; font-family: 'Courier New', monospace; font-size: 0.78em; color: #2e7d32;">
    <span data-verify-line="hygiene1">verify:food.gov.uk/hygiene-ratings/v</span>
  </div>
  <span verifiable-text="end" data-for="hygiene1"></span>
</div>

The text that clip mode sees and hashes is simply:

```
Jade Garden Restaurant (jadegarden-york.co.uk)
has a Food Hygiene Rating of 5
(inspected Nov 2025) on
verify:food.gov.uk/hygiene-ratings/v
```

This same text appears identically on the restaurant's own site, on Deliveroo, on Just Eat, and on Uber Eats. The hash is the same everywhere because the text is the same everywhere.

## The allowedDomains Pattern: Multiple Third-Party Sites

The key difference from a single-site claim is the `allowedDomains` list. The FSA authorizes the claim to appear on the restaurant's own domain AND on every delivery platform the restaurant is listed on:

```json
{
  "status": "verified",
  "allowedDomains": ["jadegarden-york.co.uk", "*.deliveroo.co.uk", "*.just-eat.co.uk", "*.ubereats.com"]
}
```

When a consumer clips the claim on `www.deliveroo.co.uk/menu/jade-garden`, the browser extension checks whether the current page domain matches any entry in `allowedDomains`. It does — `*.deliveroo.co.uk` covers it. The verification passes without a domain-mismatch warning.

If someone copies the same claim text onto `dodgy-takeaways.com`, the hash still verifies (the text is identical), but the extension sees that `dodgy-takeaways.com` is not in the allowed list and fires an amber warning:

> "This hygiene rating verified, but it names jadegarden-york.co.uk and the allowed platforms, and you are on dodgy-takeaways.com."

## Example: Rating Downgraded After Re-Inspection

A restaurant is re-inspected and drops from 5 to 2. The FSA updates the verification endpoint. The old claim — "has a Food Hygiene Rating of 5" — now returns:

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #7a1f1f; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;">Verification Result
═══════════════════════════════════════════════════════════════════

Status:           SUPERSEDED
Reason:           New inspection completed — rating changed
Result:           This rating is no longer current

verify:food.gov.uk/hygiene-ratings/v
</pre>
</div>

The platform still shows "5" because it has not updated its data. But the consumer who clips and verifies sees SUPERSEDED. The platform cannot claim ignorance — the verification endpoint is public.

## Data Verified

Restaurant name, registered business domain, hygiene rating (0–5), inspection date, local authority that conducted the inspection, and current status.

**Document Types:**
- **Hygiene Rating Claim** — The primary claim: this restaurant received this rating on this date.
- **Rating Update** — Issued after re-inspection, superseding the previous claim.

**Privacy Salt:** Not required. Food hygiene ratings are public record under the Food Hygiene Rating Act 2013 (mandatory display in Wales and Northern Ireland, voluntary but near-universal in England).

## Data Visible After Verification

Shows the issuer domain (`food.gov.uk`) and the current official rating status.

**Verification Response Format:**

```json
{
  "status": "verified",
  "allowedDomains": ["jadegarden-york.co.uk", "*.deliveroo.co.uk", "*.just-eat.co.uk", "*.ubereats.com"]
}
```

The `allowedDomains` field enables browser extensions to detect domain mismatches — where a valid claim has been copied onto a site that is neither the restaurant's own domain nor an authorized delivery platform.

**Status Indications:**
- **Current** — Rating matches the most recent inspection on file.
- **Superseded** — A new inspection has been completed; the displayed rating is out of date.
- **Closed** — Facility has been ordered to shut down for safety violations.
- **Awaiting Inspection** — New business; not yet inspected.
- **404** — No such rating was issued by the FSA for this establishment.

## Second-Party Use

The **restaurant owner** benefits from verification.

**Proving the rating on third-party platforms:** A restaurant with a genuine rating of 5 currently has no way to prove that on Deliveroo or Just Eat — the platform's data is just a number in a database. A verifiable claim lets the restaurant demonstrate its rating directly to consumers, regardless of which platform they are browsing.

**Competitive differentiation:** Restaurants that maintain high standards can distinguish themselves from competitors whose displayed ratings may be stale or incorrect. The verified claim is evidence, not assertion.

## Third-Party Use

**Consumers on Delivery Platforms**

**Pre-order confidence:** Before ordering, a consumer can verify that the hygiene rating shown on the platform is current and matches the FSA's records. This matters most for consumers who cannot visit the physical premises — the entire relationship is mediated by the platform.

**Delivery Platforms (Deliveroo, Just Eat, Uber Eats)**

**Automated compliance:** Platforms can verify claims programmatically. If a restaurant's rating is superseded or the establishment is closed, the platform can flag or delist the listing without waiting for a manual data update. This reduces the platform's liability for displaying inaccurate safety information.

**Data freshness:** Instead of scraping or manually syncing FSA data, the platform can rely on the verification endpoint as the source of truth. The claim either verifies or it does not.

**Local Authority Environmental Health Officers**

**Enforcement monitoring:** Officers can check whether restaurants are displaying outdated or incorrect ratings on delivery platforms — a form of misleading advertising under existing food safety legislation. The verification endpoint provides the evidence.

## Verification Architecture

**The "Stale Rating on Platforms" Problem**

- **Data lag:** Platforms update hygiene data on their own schedule, which may be months behind the FSA's records.
- **No verification path:** A consumer seeing "Hygiene Rating: 5" on a Deliveroo listing has no way to check whether that number is current, correct, or even real.
- **Incentive mismatch:** The platform has no commercial incentive to display a lower rating — it might reduce orders. The restaurant has no incentive to report a downgrade. Only the FSA and the consumer care about accuracy.
- **Multi-platform fragmentation:** A restaurant may be listed on three or four platforms simultaneously, each with its own (potentially different) copy of the rating data.

The verifiable claim addresses these because:

1. The FSA issues the claim — it is not self-asserted by the restaurant or entered by the platform
2. The claim names the restaurant's domain, providing a human-readable identity check
3. The `allowedDomains` list explicitly authorizes which platforms may display the claim
4. Supersession is immediate — the endpoint returns SUPERSEDED when a new inspection changes the rating
5. The same claim text and hash work identically across all authorized sites

## Competition vs. Current Practice

| Feature | Live Verify | Platform-Displayed Rating | FSA Website Lookup | Physical Window Sticker |
| :--- | :--- | :--- | :--- | :--- |
| **FSA-issued** | **Yes.** Claim originates from the FSA. | **No.** Platform's own data. | **Yes.** But requires leaving the platform. | **Yes.** But physical only. |
| **Verifiable on platform** | **Yes.** In place, on the ordering page. | **No.** Trust the platform's data. | **No.** Separate site. | **No.** Not digital. |
| **Real-time status** | **Yes.** Endpoint reflects current rating. | **No.** Updated on platform's schedule. | **Yes.** But manual lookup. | **No.** Sticker persists. |
| **Multi-platform** | **Yes.** Same claim on all platforms. | **No.** Each platform has its own copy. | **N/A.** | **N/A.** |
| **Detects stale data** | **Yes.** SUPERSEDED status. | **No.** | **Requires comparison.** | **No.** |

**Practical conclusion:** the FSA website remains the authoritative source, but consumers ordering on delivery platforms do not visit it. The verifiable claim brings the FSA's authority to the page where the ordering decision actually happens.

## Authority Chain

**Pattern:** Sovereign

The Food Standards Agency oversees hygiene ratings issued by local authorities across England, Wales, and Northern Ireland.

```
✓ food.gov.uk/hygiene-ratings/v — FSA food hygiene rating verification
  ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Further Derivations

1. **Platform Compliance Dashboards** — Aggregated verification status across all restaurants listed on a platform, enabling automated delisting when ratings are superseded or establishments closed.
2. **Multi-Rating Claims** — Combined claim covering hygiene rating and allergen management certification, verified against separate endpoints but displayed as a single embedded block.

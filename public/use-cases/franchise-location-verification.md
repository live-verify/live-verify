---
title: "Franchise Location Verification"
category: "Business & Commerce"
volume: "Large"
retention: "License period + 1-2 years (brand protection, trading standards complaints)"
slug: "franchise-location-verification"
verificationMode: "clip"
tags: ["franchise", "consumer-facing", "brand-protection", "licensed-location", "trading-standards", "delivery-platform", "terminated-franchisee", "counterfeit-location"]
furtherDerivations: 2
---

## What is a Franchise Location Verification?

A franchisor authorizes specific locations to trade under its brand. The location displays a claim — on its premises, website, or delivery platform listing — that it is a current, licensed franchise of a particular brand.

The customer has no practical way to verify that claim. The brand's "find a store" page may exist, but it is often incomplete, slow to update after terminations, and irrelevant when the customer is already standing in the shop or browsing a delivery app. Meanwhile, the signage or listing — "Costa Coffee" or "Subway" — is trivially easy to reproduce.

This matters because:

- terminated franchisees sometimes continue operating under the brand after their license expires or is revoked, with no ongoing quality oversight
- fake branded locations exist — rare, but documented in fast food, coffee, and convenience store categories
- delivery and ordering platforms list restaurants under brand names without independent verification of the franchise relationship
- customers assume brand standards (hygiene, sourcing, insurance, complaint handling) apply at every location bearing the brand name

A verifiable franchise location claim is a short statement, issued by the franchisor, naming the operator and the location where the license applies. The customer can verify it in place — on the premises or on the ordering page — without searching the brand's store locator.

This document covers the **consumer-facing** angle: "Is this actually a real Costa / Subway / McDonald's?" For the **investor-facing** angle — franchise disclosure documents, Item 19 earnings claims, and FDD integrity — see [Franchise Agreements and Disclosure Documents](franchise-agreements.md).

## Example: Physical Premises (Printed or Displayed)

The franchisor supplies the franchisee with a printed claim to display at the location — typically near the entrance, on a counter card, or alongside existing licensing notices.

<div style="max-width: 480px; margin: 24px auto; background: #fff; border: 1px solid #6b1f3e; border-radius: 8px; padding: 24px; box-shadow: 0 4px 12px rgba(107,31,62,0.15); font-family: 'Segoe UI', Arial, sans-serif;">
  <div style="display: flex; align-items: center; margin-bottom: 16px;">
    <div style="width: 40px; height: 40px; background: #6b1f3e; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 0.65em; color: #fff; margin-right: 12px;">CC</div>
    <div style="font-size: 0.75em; color: #6b1f3e; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">Licensed Franchise</div>
  </div>
  <span verifiable-text="start" data-for="premises1"></span>
  <div style="color: #333; font-size: 0.95em; line-height: 1.7;">
    This location at <span style="font-weight: 600;">42 High Street, York</span><br>
    is a licensed <span style="color: #6b1f3e; font-weight: 600;">Costa Coffee</span> franchise<br>
    operated by <span style="font-weight: 600;">Highgate Catering Ltd</span> on
  </div>
  <div style="margin-top: 12px; padding-top: 10px; border-top: 1px solid #ddd; font-family: 'Courier New', monospace; font-size: 0.78em; color: #6b1f3e;">
    <span data-verify-line="premises1">verify:costa.co.uk/locations</span>
  </div>
  <span verifiable-text="end" data-for="premises1"></span>
</div>

The text that clip mode sees and hashes is simply:

```
This location at 42 High Street, York
is a licensed Costa Coffee franchise
operated by Highgate Catering Ltd on
verify:costa.co.uk/locations
```

The franchisor controls the claim content. The franchisee displays it. The hash is unaffected by the surrounding signage or decor.

## Example: Web Claim for Delivery and Ordering Platforms

When a franchise location is listed on a delivery platform or the operator's own website, the claim includes the operator's domain so that domain-mismatch detection works.

<div style="max-width: 480px; margin: 24px auto; background: #fff; border: 1px solid #008c15; border-radius: 8px; padding: 24px; box-shadow: 0 4px 12px rgba(0,140,21,0.15); font-family: 'Segoe UI', Arial, sans-serif;">
  <div style="display: flex; align-items: center; margin-bottom: 16px;">
    <div style="width: 40px; height: 40px; background: #008c15; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 0.65em; color: #fff; margin-right: 12px;">SW</div>
    <div style="font-size: 0.75em; color: #008c15; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">Licensed Franchise</div>
  </div>
  <span verifiable-text="start" data-for="web1"></span>
  <div style="color: #333; font-size: 0.95em; line-height: 1.7;">
    <span style="font-weight: 600;">Highgate Catering Ltd</span> <span style="color: #999;">(highgatecatering.com)</span><br>
    operates a licensed <span style="color: #008c15; font-weight: 600;">Subway</span> franchise<br>
    at <span style="font-weight: 600;">42 High Street, York</span> on
  </div>
  <div style="margin-top: 12px; padding-top: 10px; border-top: 1px solid #ddd; font-family: 'Courier New', monospace; font-size: 0.78em; color: #008c15;">
    <span data-verify-line="web1">verify:subway.com/locations</span>
  </div>
  <span verifiable-text="end" data-for="web1"></span>
</div>

The text that clip mode sees and hashes:

```
Highgate Catering Ltd (highgatecatering.com)
operates a licensed Subway franchise
at 42 High Street, York on
verify:subway.com/locations
```

The parenthesized domain serves the same purpose as in [Licensed Reseller Authorizations](licensed-reseller-authorizations.md) — it enables both human-readable and automated domain-mismatch detection.

## Data Verified

Franchisor brand, franchisee operator legal name, licensed location address, operator domain (for web claims), and current license status.

**Document Types:**
- **Franchise Location Claim** — The primary claim: this location is a current, licensed franchise operated by this entity.
- **Multi-Location Operator Confirmation** — For operators running several locations under the same brand, listing each address.

**Privacy Salt:** Generally not required. Franchise location claims are commercial claims that both the franchisor and franchisee want to be public.

## Data Visible After Verification

Shows the issuer domain (e.g., `costa.co.uk`, `subway.com`, `mcdonalds.com`) and the current license status.

**Verification Response Format:**

```json
{
  "status": "verified",
  "allowedDomains": ["highgatecatering.com", "*.highgatecatering.com"]
}
```

The `allowedDomains` field enables browser extensions to detect domain mismatches — where a valid claim has been embedded on a site that does not belong to the named operator. For physical premises claims (printed/displayed), `allowedDomains` is omitted.

**Status Indications:**
- **Licensed** — Current franchise license is active for this location.
- **Expired** — License period ended; renewal required.
- **Terminated** — Franchisor has revoked the franchise license.
- **Suspended** — License paused pending review (e.g., brand standards investigation, health and safety issue).
- **404** — No such franchise license was issued by the claimed brand.

## Fraud Patterns

**Terminated Franchisee Continuing to Trade**

The most common pattern. A franchisee loses their license — for non-payment of royalties, failed brand standards inspections, or contractual breach — but continues trading under the brand name. The signage stays up. The delivery platform listing remains active. Customers assume the location is still part of the brand network and that brand standards still apply.

With a verifiable claim, the franchisor's endpoint returns TERMINATED. The claim still exists on the premises or listing, but it now fails verification.

**Fake Branded Locations**

Rare but documented. An operator fits out a location to look like a known brand — signage, menu boards, packaging — without ever holding a franchise license. This is more common in markets where the brand has limited direct presence and enforcement capacity.

A fake location has no claim to display (the franchisor never issued one). The absence of a verifiable claim is itself a signal, particularly for delivery platforms that could require one.

**Delivery Platform Misrepresentation**

A restaurant lists itself on a delivery platform under a franchise brand name without being a licensed franchisee. The platform has no practical way to verify the franchise relationship at onboarding, and brands struggle to monitor listings across multiple platforms.

A verifiable claim — required at listing time — gives the platform an automated check: does this operator have a current, verified franchise license for this location from this brand?

## Second-Party Use

The **customer** benefits directly.

**On-premises confidence:** Before ordering, the customer can verify that the location is a current, licensed franchise — not a terminated operator still trading under the brand, and not a fake.

**Delivery platform trust:** When ordering online, the customer can check that the restaurant listed as "Subway — High Street, York" is genuinely a licensed Subway franchise, not an unrelated kitchen using the brand name.

**Complaint and refund routing:** If something goes wrong, the verification status confirms whether the customer's complaint should go to the brand (licensed) or only to the operator (terminated/fake). This matters for food safety incidents in particular.

## Third-Party Use

**Franchisor Brand Protection Teams**

**Termination enforcement:** When a franchise license is revoked, the verification endpoint returns TERMINATED. The franchisor has an immediate, visible mechanism beyond sending cease-and-desist letters — the claim on the premises or listing now fails verification.

**Network monitoring:** Verification-endpoint analytics show which locations are being checked and how often, giving the franchisor visibility into its live network.

**Delivery Platforms**

**Onboarding verification:** A delivery platform can require a verified franchise location claim before allowing a restaurant to list under a brand name. This reduces the platform's exposure to trademark complaints and consumer protection issues.

**Ongoing status checks:** Periodic re-verification catches franchise terminations that would otherwise leave stale listings active.

**Local Authority Trading Standards**

**Complaint investigation:** When a consumer reports a food safety or trading standards issue at a branded location, the investigator can check whether the location is (or was) a licensed franchise. This affects which entity is responsible and what enforcement powers apply.

## Verification Architecture

**The "Is This Really a [Brand]?" Problem**

- **Signage persistence:** Franchise signage is expensive. Terminated franchisees often leave it up for months or longer, because removing it signals the business is failing.
- **Platform listing inertia:** Delivery platforms rarely verify franchise status at onboarding and almost never re-check it. A terminated franchisee can continue receiving orders under the brand name indefinitely.
- **Store locator lag:** Brand "find a store" pages are updated periodically, not in real time. A terminated location may appear on the locator for weeks after termination.
- **Consumer assumption:** Customers assume that any location bearing a brand's name and livery is a current, quality-controlled franchise. This assumption is usually correct, but when it is wrong, the consequences (food safety, insurance, complaint handling) fall on the customer.

The verifiable claim addresses these because:

1. The franchisor issues the claim — it is not self-asserted by the operator
2. The claim names the specific location and operator
3. Termination is immediate — the endpoint returns TERMINATED
4. For web claims, the browser extension can detect domain mismatches automatically

## Competition vs. Current Practice

| Feature | Live Verify | Brand Store Locator | Delivery Platform Listing | Signage Alone |
| :--- | :--- | :--- | :--- | :--- |
| **Issuer-controlled** | **Yes.** Franchisor issues the claim. | **Yes.** But updated periodically. | **No.** Operator self-lists. | **No.** Operator self-asserts. |
| **Location-specific** | **Yes.** Claim names the address and operator. | **Yes.** But no per-location status. | **Partially.** Address listed, status unknown. | **No.** |
| **Revocable** | **Immediate.** Endpoint returns TERMINATED. | **Slow.** Locator updates lag. | **Very slow.** Platform rarely re-checks. | **No.** Signage persists. |
| **Verifiable on-site** | **Yes.** On the premises or listing. | **Requires leaving the site/location.** | **No.** | **No.** |
| **Detects fake locations** | **Yes.** No claim exists to verify. | **Partially.** If locator is current. | **No.** | **No.** |

**Practical conclusion:** brand store locators answer "where is my nearest [brand]?" — a different question from the one the customer is asking at the counter or on the ordering page: "is this actually a real [brand]?" The verifiable claim answers the second question in place.

## Authority Chain

**Pattern:** Commercial / Franchisor

```
✓ costa.co.uk/locations — Licensed franchise location verification
```

For franchise sectors with regulatory oversight (e.g., financial services franchises, childcare franchises), the chain extends upward:

```
✓ franchisor.com/locations — Licensed franchise location verification
  ✓ regulator.gov/licensed-operators — Regulatory oversight of franchised operations
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Further Derivations

1. **Franchise Supply Chain Verification** — Per-location verification that a franchise is sourcing from approved suppliers, displayed on the premises or provided to inspectors.
2. **Franchise Employee Credential Verification** — Verification that staff at a franchise location hold required certifications (food hygiene, first aid), issued by the training provider and linked to the franchise location claim.

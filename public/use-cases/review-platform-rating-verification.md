---
title: "Review Platform Rating Verification"
category: "Business & Commerce"
volume: "Very Large"
retention: "Rating validity period (typically 30-90 days, re-issued on each recalculation)"
slug: "review-platform-rating-verification"
verificationMode: "clip"
tags: ["reviews", "ratings", "trustpilot", "google-reviews", "consumer-trust", "business-reputation", "domain-mismatch", "allowedDomains", "time-limited"]
furtherDerivations: 1
---

## What is Review Platform Rating Verification?

A business displays its review rating on its own website — "4.2 stars on Trustpilot" or "4.8 on Google Reviews." This is typically shown as a badge image, an embedded widget, or plain text. None of these are difficult to fabricate. A badge is a static image anyone can copy. A widget can be injected into a page that has no relationship with the business it claims to represent. Even a live widget can be screenshotted and placed on a completely different site.

The review platform already has the data. It knows which business holds which rating, how many reviews contributed, and when the rating was last recalculated. A verifiable claim turns that knowledge into a short, hashable text statement that the business embeds on its site and that anyone can verify against the platform's domain.

This matters because:

- fake review badges are trivial to create and widespread
- consumers make purchasing decisions based on displayed ratings
- comparison sites and marketplaces aggregate ratings with no way to confirm they are genuine
- advertising standards bodies investigate misleading rating claims but have no efficient verification mechanism
- ratings change over time, so a claim from six months ago may no longer reflect reality

## Example: Trustpilot Rating Claim

The review platform supplies the business with an HTML snippet to embed on its site. The inline styling is ignored by clip mode — only the text content matters for hashing.

<div style="max-width: 480px; margin: 24px auto; background: #fff; border: 1px solid #00b67a; border-radius: 8px; padding: 24px; box-shadow: 0 4px 12px rgba(0,182,122,0.15); font-family: 'Segoe UI', Arial, sans-serif;">
  <div style="display: flex; align-items: center; margin-bottom: 16px;">
    <div style="width: 40px; height: 40px; background: #00b67a; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 0.7em; color: #fff; margin-right: 12px;">TP</div>
    <div style="font-size: 0.75em; color: #00b67a; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">Verified Rating</div>
  </div>
  <span verifiable-text="start" data-for="rating1"></span>
  <div style="color: #333; font-size: 0.95em; line-height: 1.7;">
    <span style="color: #000; font-weight: 600;">Northbridge Plumbing Ltd</span> <span style="color: #999;">(northbridgeplumbing.co.uk)</span><br>
    has a <span style="color: #00b67a; font-weight: 600;">4.2</span> rating from <span style="color: #00b67a; font-weight: 600;">1,842</span> reviews<br>
    on Trustpilot as of 21 Mar 2026 on
  </div>
  <div style="margin-top: 12px; padding-top: 10px; border-top: 1px solid #ddd; font-family: 'Courier New', monospace; font-size: 0.78em; color: #00b67a;">
    <span data-verify-line="rating1">verify:trustpilot.com/verified-ratings</span>
  </div>
  <span verifiable-text="end" data-for="rating1"></span>
</div>

The text that clip mode sees and hashes is simply:

```
Northbridge Plumbing Ltd (northbridgeplumbing.co.uk)
has a 4.2 rating from 1,842 reviews
on Trustpilot as of 21 Mar 2026 on
verify:trustpilot.com/verified-ratings
```

The review platform controls the branding. The business just embeds the snippet. The hash is unaffected by any styling changes.

## The "As Of" Date

Ratings change. A business that was 4.2 stars in March may be 3.6 by June. The "as of" date in the claim text is load-bearing — it pins the rating to a specific recalculation. When the platform recalculates, it issues a new claim with a new date, and the old hash stops verifying (the endpoint returns EXPIRED or 404).

This means the business must periodically update its embedded snippet — typically by an automated integration or by re-fetching the snippet from the platform's dashboard. A stale snippet that still displays "4.2 stars" but whose hash no longer verifies is a signal, not a failure: the rating has changed since the claim was issued.

## Example: Copied to a Different Site

If a site copies the snippet text, the hash still verifies — the text is identical. But the browser extension detects the domain mismatch:

1. The claim text contains `(northbridgeplumbing.co.uk)` — the extension extracts the domain in parentheses
2. The verification response includes `"allowedDomains": ["northbridgeplumbing.co.uk", "*.northbridgeplumbing.co.uk"]`
3. The current page doesn't match either

The extension shows an amber warning:

> "This rating claim verified, but it names northbridgeplumbing.co.uk and you are on [current site]."

**Domain management note:** Many businesses legitimately operate multiple domains, landing pages, and campaign microsites. A domain mismatch is not necessarily evidence of fraud or copying — it may indicate that the business's `allowedDomains` list hasn't been updated to include a new domain. The platform should make it straightforward for businesses to register additional authorized domains. The mismatch warning is a prompt to check, not an accusation.

## Data Verified

Business legal name, business site domain, review platform name, aggregate star rating, review count, recalculation date ("as of" date), and current claim status.

**Document Types:**
- **Rating Claim** — The primary claim: this business has this rating on this platform as of this date.
- **Rating History Summary** — Optional extended claim covering rating trajectory over a defined period.

**Privacy Salt:** Not required. Review ratings are public data that the business wants to display.

## Data Visible After Verification

Shows the issuer domain (e.g., `trustpilot.com`, `google.com/maps`, `yelp.com`) and the current claim status.

**Verification Response Format:**

```json
{
  "status": "verified",
  "allowedDomains": ["northbridgeplumbing.co.uk", "*.northbridgeplumbing.co.uk"]
}
```

The `allowedDomains` field enables browser extensions to detect domain mismatches — where a valid claim has been copied onto a site other than the one named in the claim.

**Status Indications:**
- **Current** — The rating claim matches the platform's latest recalculation for this business.
- **Expired** — The rating has been recalculated since this claim was issued. The business should fetch a new snippet.
- **Revoked** — The business's profile has been removed from the platform (e.g., for review manipulation).
- **404** — No such rating claim was issued by the claimed platform.

## Second-Party Use

The **business** benefits directly.

**Customer trust:** A plumber, solicitor, or restaurant can show prospective customers that its displayed rating is genuine and current, not a screenshot from two years ago or a fabricated badge.

**Advertising compliance:** When a business uses its rating in advertising ("Rated 4.5 on Trustpilot"), the verifiable claim provides evidence that the rating was accurate at the time the advertisement was produced.

**Dispute resolution:** If a customer or competitor alleges that a displayed rating is fake, the business can point to a cryptographically verified claim tied to the platform's own data.

## Third-Party Use

**Consumers**

**Pre-purchase confidence:** Before hiring a tradesperson or choosing a restaurant, a consumer can verify that the displayed rating is genuine and current — not a stale or fabricated number.

**Comparison Sites and Marketplaces**

**Seller vetting:** A marketplace that displays seller ratings from external platforms can require verified claims rather than self-reported numbers, reducing the risk of inflated ratings in seller profiles.

**Advertising Standards Authorities**

**Investigation efficiency:** When investigating a complaint about misleading rating claims in advertising, the authority can check whether a verified claim existed at the relevant date, rather than relying on screenshots or the business's own records.

**Competitors**

**Fair competition:** A competitor that suspects a rival is displaying a fabricated rating can check the rival's claim. If it does not verify, that is useful evidence for a complaint.

## Verification Architecture

**The Fake Rating Badge Problem**

- **Badge copying:** Any website can display "Rated 4.8 on Google" with a star image. There is no technical barrier.
- **Stale ratings:** A business that was once highly rated may continue displaying an old badge long after its rating has dropped.
- **Widget injection:** A Trustpilot widget for Business A can be embedded on Business B's site by changing the widget parameters.
- **Screenshot fraud:** A screenshot of a high rating is commonly used in social media advertising with no link back to the source.
- **Review manipulation:** Even genuine ratings can be gamed, but that is the platform's problem to detect. The verifiable claim addresses a different question: is the displayed rating actually what the platform says it is right now?

The verifiable claim addresses these because:

1. The review platform issues the claim — it is not self-asserted by the business
2. The claim names the specific site where it applies
3. The "as of" date pins the rating to a point in time; expiry is automatic when the rating is recalculated
4. The browser extension can detect domain mismatches automatically

## Competition vs. Current Practice

| Feature | Live Verify | Badge Image | Embedded Widget | Screenshot in Ad |
| :--- | :--- | :--- | :--- | :--- |
| **Issuer-controlled** | **Yes.** Platform issues the claim. | **No.** Anyone can copy the image. | **Partially.** Widget loads from platform but can be misconfigured. | **No.** Static image. |
| **Domain-bound** | **Yes.** Claim names the business site. | **No.** | **No.** Widget can be embedded anywhere. | **No.** |
| **Time-bound** | **Yes.** "As of" date with automatic expiry. | **No.** Badge shows no date. | **Partially.** Widget shows live data but has no integrity proof. | **No.** Screenshot is frozen. |
| **Verifiable offline** | **Yes.** Claim text is hashable. | **No.** | **No.** Requires live API call. | **No.** |
| **Detects site copying** | **Yes.** Domain mismatch warning. | **No.** | **No.** | **No.** |

**Practical conclusion:** embedded widgets from review platforms remain useful for showing live data, but they do not answer the question "is this rating claim genuine and intended for this site?" The verifiable claim answers that question and complements the widget rather than replacing it.

## Authority Chain

**Pattern:** Commercial

```
✓ trustpilot.com/verified-ratings — Review platform rating verification
```

Commercial issuer — self-authorized. Trust rests on the review platform's domain reputation. No regulatory oversight is required because the claim is about the platform's own data.

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Further Derivations

1. **Individual Review Verification** — Per-review claims allowing a business to highlight specific verified reviews on its site, with the same domain-binding and time-limiting properties.
2. **Rating Threshold Compliance** — A marketplace or procurement system requiring suppliers to maintain a minimum verified rating, with automatic alerts when a claim expires or the rating drops below threshold.

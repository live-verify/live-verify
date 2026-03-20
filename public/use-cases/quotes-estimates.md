---
title: "Quotes & Estimates"
category: "Business & Commerce"
volume: "Very Large"
retention: "Quote validity period + dispute window"
slug: "quotes-estimates"
verificationMode: "clip"
tags: ["quote", "estimate", "proposal", "contractor", "pricing", "scope", "acceptance", "cross-org", "home-repair", "freelance", "small-business"]
furtherDerivations: 2
---

## What is a Verifiable Quote?

A contractor emails you a quote for roof repair. You forward it to your spouse, your insurer, and a competing contractor for a second opinion. The quote is a PDF or plain-text email. Anyone in that chain could edit it. The contractor could later claim "that wasn't the final price." You could claim "they promised to include guttering." There is no anchor.

A verifiable quote is a short, human-readable summary of the commercial terms with a `verify:` line. The contractor's domain attests the exact text. If anyone changes the price, scope, or deadline, the hash breaks.

<div style="max-width: 550px; margin: 24px auto; font-family: 'Courier New', monospace; background: #f9f9f9; padding: 15px; border: 1px solid #999; font-size: 0.9em; color: #000; line-height: 1.7;" verifiable-text-element="true">
Roof repair: HeresJonnie Roofing LLC<br>
Customer: Paul J. Hammant<br>
14 Oak Street, Oakville, Oakshire<br>
Scope: Strip and re-felt flat roof over kitchen extension<br>
Materials: EPDM rubber membrane, 20-year warranty<br>
Detailed in: Email of 24 March 2026 / 4 pm<br>
Price: £4,200 including materials and labor and VAT<br>
Valid until: 15 April 2026<br>
<span data-verify-line="quote" style="color: #667;">verify:heresjonnie.com/quotes</span>
</div>

### Acceptance

<div style="max-width: 550px; margin: 24px auto; font-family: 'Courier New', monospace; background: #f0f9f0; padding: 15px; border: 1px solid #999; font-size: 0.9em; color: #000; line-height: 1.7;" verifiable-text-element="true">
ACCEPTED<br>
Roof repair: HeresJonnie Roofing LLC<br>
Price: £4,200 including materials and labor and VAT<br>
Paul J. Hammant<br>
28 March 2026<br>
<span data-verify-line="quote-accept" style="color: #667;">verify:mail.hammant.org/contracts</span>
</div>

The contractor attests the offer. The customer attests the acceptance. Both are independently verifiable by any third party (insurer, solicitor, court).

## "Detailed in" and Non-Divergence

The claim text may reference an elaborating document — an email, a PDF spec, a site survey — using a `Detailed in:` line. The elaboration can add specifics (materials brand, prep work schedule, access requirements) but the verifiable claim text governs on price, scope, parties, and dates.

**The legal principle:** where a verifiable claim references an elaborating document and the two diverge, the recipient of the communication may choose which interpretation applies. This means divergence always hurts the issuer — a strong incentive to keep the elaboration consistent with the attested summary.

This mirrors the existing *contra proferentem* rule (ambiguity construed against the drafter) but is more specific: it applies to divergence between an attested summary and an unattested elaboration, not just ambiguity.

## Data Verified

Contractor/company name, customer name, service address, scope summary, materials summary, price (including tax treatment), validity period, elaboration reference.

## Verification Response

- **`{"status":"verified"}`** — The contractor currently stands behind this quote at this price
- **SUPERSEDED** — Quote was revised (new scope, price, or dates). A new quote exists
- **EXPIRED** — Validity period has passed. The contractor may or may not honor the original terms
- **WITHDRAWN** — Quote withdrawn by the contractor before acceptance
- **404** — Quote not found (forged or wrong domain)

## Second-Party Use

The **customer** benefits from verification:

**Forwarding to spouse/partner:** "The roofer quoted £4,200" — the recipient can verify this is what the contractor actually attested, not an edited version.

**Insurance claim support:** After storm damage, the customer forwards verified quotes to their insurer. The insurer sees the contractor's domain attesting the scope and price — stronger than an unverified PDF.

**Comparing quotes:** Three contractors quote for the same job. Each quote is independently verifiable against its issuer's domain. The customer (or their insurer) can confirm all three are genuine.

## Third-Party Use

**Insurers**
Evaluating repair quotes after a claim. A verified quote from a licensed contractor is harder to inflate than an unverified PDF.

**Courts / Small Claims**
"They quoted £4,200 and then charged £6,800." The verified quote is timestamped evidence of what the contractor's domain attested.

**Mortgage Lenders**
Evaluating renovation costs during purchase. Verified contractor quotes support the valuation.

## Verification Architecture

**The "Edited Quote" Problem**

- **Price inflation:** Customer edits the PDF to show a higher price for an insurance claim
- **Scope shrinkage:** Contractor claims the quoted scope was narrower than what the customer remembers
- **Stale quotes:** Presenting an expired or superseded quote as current
- **Fabricated quotes:** Creating a quote from a contractor who never visited the property

**Issuer Types** (First Party)

- Contractors, tradespeople, freelancers (sole traders to large firms)
- Service companies (cleaning, landscaping, IT support)
- Professional firms (solicitors, accountants, architects)

**Infrastructure reality:** Small contractors are not running enterprise systems. A `verify:` endpoint for quotes could be as simple as a static JSON file on their existing website, generated by the same `generate-hash.js` tool used for peer references. The barrier to entry is deliberately low.

## Authority Chain

**Pattern:** Commercial (self-certified)

```
✓ heresjonnie.com/quotes — Issues quotes for roofing services
```

No regulatory chain. Trust rests on the contractor's domain. The customer decides whether `heresjonnie.com` is the contractor they actually engaged.

For trades that require licensing (electrical, gas, plumbing), the contractor's license is a separate verifiable claim with its own authority chain to the licensing board. The quote doesn't need to carry that chain — it just needs to be attested by the contractor's domain.

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Jurisdictional Witnessing (Optional)

Not typically needed for quotes and estimates. The issuer endpoint is the source of truth. Witnessing would only add value in high-value commercial tenders where independent timestamping of bid submission matters.

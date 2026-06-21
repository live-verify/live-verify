---
title: "Shelf-Edge Price Verification (Truth in Pricing)"
category: "Business & Commerce"
volume: "Very Large"
retention: "Price validity window (short-lived; re-published on change)"
slug: "shelf-edge-price-verification"
verificationMode: "camera"
tags: ["retail", "pricing", "price-switch-fraud", "shelf-edge", "trading-standards", "consumer-protection", "point-in-time", "sku"]
furtherDerivations: 1
---

## The Problem

The shelf-edge label is the price the shopper trusts. It is also the easiest thing in the store to falsify. A customer can peel a £3.99 label off one shelf and stick it over a £12.99 item — "sticky-tape fraud" — then ring it through self-checkout at the lower price. Unscrupulous staff or third parties can run the reverse: display a tempting "SALE £4.00" on the shelf-edge while the till is set to charge £6.50, banking on the fact that most shoppers never reconcile the receipt against the label.

Either way, the shelf price and the system price diverge, and nobody can tell by looking. The printed label is just ink on cardboard. There is no way for a shopper standing in the aisle — or for a trading-standards officer doing a sweep — to confirm that the displayed price, the SKU it claims to cover, and the promotional end-date are genuinely the retailer's current published figures.

A verifiable shelf-edge label closes that gap. The label carries a `verify:` line. The shopper points a phone camera at it, the text is read, normalized, hashed, and checked against the retailer's own domain. If the label has been swapped, overlaid, or edited, the hash does not match and the verification fails loudly.

## What gets verified

The claim binds three things to the retailer's domain:

- **The price** — the exact figure on the shelf-edge.
- **The SKU / product identity** — so a label cannot be lifted off a cheap item and stuck over an expensive one.
- **The promotional "sale ends" date** — so an expired promotion cannot be left up to keep luring shoppers.

Because all three are inside the hashed text and the hash is checked against `retailer.example`, the label cannot be altered without breaking the hash, and the shelf price provably matches the system price. The retailer publishes the hash when it sets the price; the shopper's phone confirms it in the aisle.

## Example

The label is short, high-contrast, structured text — close to ideal for a phone camera to read.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #1a5f2a; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <span verifiable-text="start" data-for="pricetag"></span>
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;">SHELF PRICE
═══════════════════════════════════════════
Product:    Organic Whole Milk 2L
SKU:        4088600291745
Price:      £1.85
Was:        £2.30
Sale Ends:  28 JUN 2026
Retailer:   FreshMart Stores
As At:      21 JUN 2026
Ref:        7K2Q-9XJ4-W3MP
<span data-verify-line="pricetag">verify:retailer.example/price/v</span></pre>
  <span verifiable-text="end" data-for="pricetag"></span>
</div>

The shopper scans this in the dairy aisle. The camera reads the block, the hash is computed, and the retailer's endpoint either confirms it as the current price or tells the shopper plainly that it does not match.

## Data Verified

Product description, SKU (the canonical product identity), the displayed price, the previous ("was") price where a promotion applies, the promotional end-date, the issuing retailer, the as-at date the price was published, and an issuer-generated reference line for entropy.

**Document Types:**
- **Shelf-Edge Label** — The primary printed claim on the shelf strip.
- **Promotional / Multibuy Label** — Carries the offer terms and the sale-ends date.
- **Reduced-to-Clear Label** — A short-lived markdown price, re-published per item or per batch.

## Data Visible After Verification

Shows the issuer domain (`retailer.example`) and whether the scanned price is the retailer's current published price.

**Status Indications:**
- **Verified / Current Price** — The label matches the retailer's current published price for this SKU. The shelf price equals the system price.
- **Price Changed** — The hash is no longer current; the retailer has published a different price. The label is stale and must not be read as the price now in force.
- **Expired** — The "sale ends" date has passed; the promotional price the label asserts is no longer valid.
- **404** — The retailer never published this exact price/SKU/date combination. The label is fabricated or has been altered. This is the swapped-tag and overlay case, and it is reported plainly as a failure — never silently as a valid price.

## Why these claims are short-lived

Retail prices change constantly — daily promotions, end-of-day markdowns, supplier cost moves. A shelf-edge label is therefore a **point-in-time snapshot**, not a standing fact. It asserts "this was the price, as at 21 JUN 2026," and the retailer must re-publish the hash whenever the price changes.

This is the point-in-time-versus-current distinction in its sharpest form. A label printed for a price that has since changed should verify as **Price Changed** or surface its **As At** date — it must never resolve silently as the current price, because that would re-create the exact "shelf price ≠ till price" harm the system exists to prevent. The retailer's endpoint is the arbiter of "current"; the label only ever carries "as at." See [Point-in-Time vs. Current](../../docs/point-in-time-vs-current.md) for the general treatment.

In practice this means the retention window is the price-validity window: short, and re-issued on every change. That is a feature, not a limitation — a price tag that could "verify forever" would be a price tag that lies the moment the price moves.

## Second-Party Use

The **shopper** is the second party at the point of scanning. They benefit directly:

**Confirm before the register:** Standing in the aisle, the shopper verifies that the shelf price is genuinely the retailer's current published price for that exact SKU — before they reach the checkout and the surprise. No more "it scanned higher than the shelf said."

**Grounds for a dispute:** If the label says **Price Changed**, **Expired**, or **404**, the shopper has concrete, retailer-anchored evidence to challenge the till price or claim the lower advertised price under existing advertised-price rules — rather than a he-said-she-said argument with a cashier.

**Trust in self-checkout:** At unattended tills, where there is no staff member to query, the scan is the shopper's only independent check that the price they are being charged is the price the retailer actually set.

## Third-Party Use

**Retailer Self-Checkout / Loss Prevention**

**Defeat tag-swap fraud:** At self-checkout, the system can require that the SKU rung up matches the SKU bound into the scanned shelf-edge hash. A label peeled off a cheap item and stuck over an expensive one fails verification because the SKU inside the hash does not match the item, and the price/SKU binding breaks. This attacks ticket-switching at the exact moment of the scam.

**Trading Standards / Weights and Measures Regulators**

**Advertised-price compliance:** An officer doing a pricing-accuracy sweep can scan shelf-edge labels across a store and confirm each one matches the retailer's published system price. Mismatches — a stale promotion left up, a shelf price below the till price — are surfaced as verifiable evidence rather than a manual price-book comparison. The retailer cannot claim the discrepancy was a one-off keying error when the endpoint shows what was published and when.

**Price-Comparison and Aggregators**

**Provable in-store prices:** A comparison service photographing or sourcing shelf-edge prices can verify that a quoted price is genuinely the retailer's published figure, as at a stated date — not a guess, a scrape, or a planted decoy.

## Verification Architecture

This is camera mode — a phone reading a printed label. The usual OCR caveat (dense pages read poorly) barely applies here: a shelf-edge label is **short, structured, high-contrast text** in a fixed layout — product, SKU, price, date — which is close to the best case for camera reading. Reliability is high precisely because the claim is small and regular, the opposite of trying to OCR a paragraph of fine print.

The architecture defeats the two fraud directions symmetrically:

1. **Customer-swapped tag (pay less):** Moving a genuine cheap-item label onto an expensive item breaks the SKU binding — the hash is for a different product than the one being bought, so self-checkout rejects it.
2. **Staff/third-party planted price (charge more):** A shelf-edge showing a sale price that rings up higher cannot verify, because the retailer never published that price for that SKU as current — the shopper's scan returns **Price Changed** or **404**, and the discrepancy is evidenced.

The freshness model carries the weight: the hash is only meaningful as "the price as at this date." The endpoint, not the cardboard, decides whether that price is still current.

## Privacy Salt

Required, and present as the **Ref** line. Shelf prices are low-entropy: a small set of round figures (£1.85, £2.30), common SKUs, and predictable dates. Without a salt, an attacker could enumerate price/SKU/date combinations and pre-compute hashes to forge a "valid" label for an arbitrary price. The retailer-generated reference line (`7K2Q-9XJ4-W3MP` in the example) adds unpredictability so that only the retailer's own published label produces a matching hash. The salt is not secret — it is printed on the label — it exists solely to defeat guess-and-hash enumeration.

## Authority Chain

**Pattern:** Commercial / Self-Attested

The retailer is the authority for its own prices. There is no higher body that publishes a given store's shelf prices — the retailer sets them and operates the verification endpoint on its own domain. Trading-standards regulators are consumers of the verification, not issuers of the price.

```
✓ retailer.example/price/v — Retailer publishes and verifies its own shelf prices
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Further Derivations

None currently.

---
title: "Product Recall Status"
category: "Product Certifications & Compliance"
volume: "Very Large"
retention: "Product lifetime (recalls can issue years after sale)"
slug: "product-recall-status"
verificationMode: "both"
tags: ["product-recall", "safety", "consumer-protection", "vin", "batch-number", "serial-number", "recall-status", "traceability", "live-status"]
furtherDerivations: 1
---

## The Problem

A safety recall is the moment a product becomes dangerous in the eyes of the people who made it. A car seat batch with a faulty buckle, a model of e-bike battery that overheats, a baby formula lot with bacterial contamination, a brake line component that corrodes early — the manufacturer (or a regulator) issues a recall naming the affected items by identifier and a remedy.

The catch is matching a *specific* item in your hands to that recall. The information exists — NHTSA, the CPSC, the MHRA, the EU Safety Gate (RAPEX) all publish recall notices — but checking is a manual trawl. A parent who bought a used car seat has to know the model, find the right database, read through notices, and interpret whether *their* batch is affected. A retailer with a pallet of stock has to cross-reference every GTIN. A mechanic with a VIN has to log into a portal. Most people never check at all.

The other failure mode is staleness. A "no open recalls" sheet printed at the point of sale is true for exactly as long as no recall is issued. The day after, it is a dangerous fiction — it reassures precisely the people who should be alarmed. Recalls are issued *after* the product is in the world, often years after sale. A printed clearance is the wrong tool for a moving target.

Live Verify binds the **recall status of a specific item** to an authoritative domain. The identifier on the product — VIN, batch/lot, model+serial, or GTIN — normalizes to a hash, and a GET against the manufacturer's (or regulator's) domain returns today's status for that exact item. Instant, item-specific, and live.

## Why live status matters here

This is a status use case, not a one-time attestation. The same item legitimately moves between states over its life:

- **CLEAR today, RECALLED tomorrow.** A recall is issued; every affected identifier flips. A check that was green last month is red this morning.
- **RECALLED, then REMEDIED.** Once the fix is applied — the buckle replaced, the battery swapped, the software updated — that specific item flips to REMEDIED. The remedied item is safe; an un-remedied sibling in the same batch is not.
- **SUPERSEDED.** An expanded or replaced recall reference moves the item to a newer notice.

A printed document cannot represent any of this. It captures one instant. The whole value is that the check reflects the recall list *as it stands at query time* — which is the only version that keeps a child safe.

This complements the official databases rather than replacing them. NHTSA, CPSC, MHRA, and RAPEX remain the authoritative public record of *what* was recalled and *why*. Live Verify answers the narrower, sharper question the databases make laborious: **is this exact item, in my hands right now, under an active recall?**

## What gets checked (identifiers)

The verifiable claim is the product's durable identifier — whatever uniquely names the item or its production run:

- **VIN** — Vehicle Identification Number. Item-level. A mechanic or a used-car buyer checks one vehicle against open recalls for that VIN.
- **Batch / Lot number** — Production-run level. Common for consumables, child products, food, pharmaceuticals, and components. A car seat, a tin of formula, a charger from a known bad batch.
- **Model + Serial** — Item-level for durable goods: appliances, power tools, e-bikes, medical devices. The serial distinguishes affected units within a model.
- **GTIN (barcode)** — SKU/packaging level. A retailer scans stock at the shelf or in the stockroom before sale.

The identifier is printed, etched, or barcoded on the product itself, so the check works on a used or unboxed item with no paperwork. Identifier granularity matters: a VIN or serial answers for one item; a batch or GTIN answers for a run, which is exactly how recalls are usually scoped.

## Example: Recall Status Check

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #7a1f1f; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <span verifiable-text="start" data-for="recall"></span>
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;">PRODUCT RECALL STATUS

Product:      Infant Car Seat — "SafeRide 360"
Identifier:   Batch LOT-2024-K7733
Manufacturer: Meridian Juvenile Products
Status:       ACTIVE RECALL
Recall Ref:   NHTSA 24C-118 / CPSC 24-771
Remedy:       Free replacement chest-clip kit
As At:        2026-06-15
Salt:         9f2c-7a18-bd04
<span data-verify-line="recall">verify:manufacturer.example/recall/v</span></pre>
  <span verifiable-text="end" data-for="recall"></span>
</div>

The red border signals what the status says: this batch is under an active recall. Scanning a different identifier — a remedied unit, or a batch that was never affected — returns a different status from the same endpoint. The page on the product never changes; the live response does.

## Data Verified

Product name/description, identifier (VIN, batch/lot, model+serial, or GTIN), manufacturer name, recall status, recall reference(s) (the official NHTSA/CPSC/MHRA/RAPEX notice numbers), the remedy, the "as at" date, and a salt line where the identifier alone is low-entropy.

The identifier is the load-bearing field. Everything else is context the response can confirm but the check is anchored on matching the specific item.

## Data Visible After Verification

Shows the issuer's domain (`manufacturer.example`, or a regulator's domain where the regulator operates the endpoint) and the item's current recall status.

**Status Indications:**
- **CLEAR / NO_RECALL** — No active recall affects this identifier as of the query time. **Not a permanent clearance** — a recall could issue tomorrow. Re-checkable, always.
- **RECALLED** — This identifier is named in an active safety recall. The response carries the recall reference and the remedy. Do not use / do not sell / arrange the fix.
- **REMEDIED** — This specific item was under recall and the remedy has been recorded as applied. Safe to use. (An un-remedied item in the same batch will still return RECALLED.)
- **SUPERSEDED** — The recall covering this item has been replaced or expanded by a newer notice; the response points to the current reference.
- **404** — No record found for this identifier at this domain. **This is not a clearance.** It may mean a wrong identifier, an OCR error, the wrong domain, or an item this issuer does not track. For a safety check, an unanswered query is unresolved, not safe — see the Verification Architecture note.

## Second-Party Use

The **consumer / owner** of the product benefits directly.

**Used-goods safety check:** A parent buys a second-hand car seat at a yard sale. There is no warranty card and no receipt — but there is a batch number moulded into the shell. A single scan against the manufacturer's domain returns RECALLED with the chest-clip remedy, or REMEDIED, or CLEAR. No knowing which database to search, no interpreting notices.

**Mechanic / VIN check:** A workshop scans the VIN of a car coming in for service and sees every open recall for that exact vehicle, with current status. Outstanding safety work is surfaced before the car leaves.

**Owner re-check:** Because recalls issue years after sale, the owner can re-scan the same product periodically. The item that was CLEAR at purchase may be RECALLED a year on — and the same printed identifier surfaces that change with no new document needed.

## Third-Party Use

**Retailers (pre-sale stock screening)**
A retailer scans GTINs or batch codes across incoming stock and shelf inventory before sale. A RECALLED hit pulls the affected SKU before it reaches a customer — the single highest-leverage moment to stop a dangerous product, and one that manual database trawling makes impractical at scale.

**Inspectors & enforcement**
A market-surveillance officer or customs inspector scans items in a consignment and gets item-specific status against the manufacturer's or regulator's domain — far faster than cross-referencing a paper manifest against published notices.

**Resale & recommerce platforms**
Marketplaces for used goods (cars, children's products, electronics) can screen listings: a seller's batch or VIN is checked at listing time, and an active recall is flagged to buyer and platform.

**Repairers & service networks**
A service centre confirms whether the unit in front of them is RECALLED and, after the fix, that it now reads REMEDIED — closing the loop on whether a remedy was actually applied to *this* item.

This pairs with the safety-critical tracing in [Aircraft & Safety-Critical Parts Traceability](aircraft-parts-traceability.md), where the same identity-on-the-item pattern carries airworthiness and recall status for individual components.

## Verification Architecture

**Fail loudly — an unconfirmed safety check is not "safe."**

The single most important rule here is that the absence of a confirmation must never read as a clearance. If the network is down, the domain is unreachable, the identifier was mis-read, or the endpoint returns 404, the result is **unresolved** — explicitly, in those words. The app must not silently degrade an error or a not-found into "no recalls." For a safety check, treating "couldn't confirm" as "safe" is the exact failure that gets someone hurt. CLEAR/NO_RECALL is a positive answer from the issuer's domain at query time; everything else, including 404 and any network failure, is "not confirmed clear — check again / check the official database."

**Complementary to official databases.** The authoritative record of recalls is the regulators': NHTSA (vehicles, US), CPSC (consumer products, US), MHRA (medical/pharma, UK), the EU Safety Gate / RAPEX (EU). Live Verify does not duplicate or supersede them — it carries the recall *reference* in every RECALLED response, pointing back to the official notice. The contribution is binding a *specific item's* current status to an authoritative domain so the check is instant and item-level, rather than a model-level manual search a consumer is unlikely to perform.

**Who issues.** Two issuer shapes:
- **Manufacturer domain** — the OEM operates the endpoint for its own products. Item- and batch-level resolution comes from its production and remedy records (e.g. which serials have had the fix applied).
- **Safety regulator domain** — where a regulator runs the endpoint, the same identifier resolves against the official recall register directly. Useful for categories with many small manufacturers or where a maker has gone out of business but the recall persists.

Both can coexist: the verify line names whichever domain attests.

## Privacy Salt

Recall identifiers are often **low-entropy**. A VIN follows a structured 17-character format; batch and lot numbers and GTINs are short and frequently sequential or guessable. With a public endpoint, that invites enumeration — an attacker could hash identifier after identifier to map which items are recalled, or to confirm a guessed identifier exists.

The honest position: a salt line printed on the product (as in the mockup) defeats guess-and-hash by making the verifiable text depend on a value the attacker cannot predict from the identifier alone. That is the standard mitigation and it works.

**But recall status is frequently *meant* to be public.** Regulators publish recalls precisely so anyone can look them up; NHTSA's VIN recall lookup is openly queryable by VIN with no secret. For those flows, enumeration resistance is not a goal — the data is deliberately open, and adding a salt would *break* the very property that lets a stranger check a used product with only the identifier moulded into it. Requiring a printed salt would defeat the "scan a second-hand item with no paperwork" case that is the whole point.

So salt here is **optional and context-dependent**, not a blanket requirement:
- **Salt it** when the issuer treats the existence or status of a recall as sensitive, or where enumeration of who-owns-what is a real concern, or where the endpoint also exposes data beyond bare status.
- **Skip the salt** when the recall register is deliberately public and the value is exactly that any identifier resolves without a secret — which is the common case for consumer-safety recalls.

We are not claiming salt solves a problem that, for public recall data, does not exist. Where status is meant to be open, the low entropy is acceptable by design; where it is not, salt is the tool. The issuer chooses per category.

## Authority Chain

**Pattern:** Regulated

```
✓ recall.manufacturer.example/recall/verify — Manufactures the product and records recall/remedy status per item
  ✓ nhtsa.gov — US regulator for motor-vehicle safety recalls (CPSC / MHRA / EU Safety Gate for other categories)
    ✓ regulator root namespace — National safety-regulator verifier registry
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Further Derivations

None currently.

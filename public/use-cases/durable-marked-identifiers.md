---
title: "Durable Marked Identifiers (Rating Plates, VINs, Hallmarks, Monuments)"
category: "Product Certifications & Compliance"
volume: "Very Large"
retention: "Life of the object (often decades to permanent)"
slug: "durable-marked-identifiers"
verificationMode: "camera"
tags: ["durable-marking", "laser-etching", "rating-plate", "data-plate", "vin", "firearm-serial", "hallmark", "monument", "text-is-king", "physical-medium"]
furtherDerivations: 1
---

## The Problem

Some claims do not live on paper or a screen — they are **marked into the object itself**, to last as
long as the object does: the rating plate riveted to a machine, the VIN stamped into a car's chassis,
the serial engraved on a firearm receiver, the hallmark struck into a ring, the plaque on a monument.
These markings are meant to be permanent and authoritative, and yet they are **unverifiable**: a rating
plate can be swapped to overstate a machine's capacity, a VIN re-stamped to disguise a stolen or
written-off vehicle, a hallmark forged, a memorial plaque quietly altered. The mark says "this is
genuine, rated, registered, hallmarked" — and the reader has no way to ask the authority that supposedly
stands behind it.

A printed sticker or QR code is the wrong fix here, because the whole point of these surfaces is
**durability**. A sticker peels; a QR code that loses a few squares to wear, heat, or weathering becomes
unreadable as a cliff-edge failure. Human-readable text marked into the surface **degrades gracefully** —
a partially worn character is still legible to a camera and a human eye. (See
[Why Human-Readable Text Is the Right Verification Primitive](../../docs/text-is-king.md) for the general
durability argument, and [Aircraft Parts Traceability](aircraft-parts-traceability.md) for the worked
aerospace/industrial version with full laser-etching specifications — this use case is its civilian and
civic counterpart.)

## What gets verified

A short verification line is **marked into the durable surface** alongside the identifier — etched,
laser-annealed, stamped, embossed, or cast — using the short `vfy:` prefix to save surface area where it
is scarce. Pointing a camera at the object hashes the marked human-readable text and checks it against
the issuing authority's domain.

The family of durable markings this covers:

- **Machinery rating / data plates** — the plate on electrical equipment, pressure vessels, lifting gear,
  cranes, and HVAC units stating voltage, pressure class, safe working load, certification. A verified
  plate confirms the rating is the manufacturer's, not a swapped plate overstating capacity.
- **VIN / chassis numbers** — a `vfy:` line accompanying the VIN lets a buyer or inspector confirm the
  vehicle identity against the manufacturer's record, surfacing re-stamped VINs that mask stolen,
  cloned, or written-off vehicles.
- **Firearm receiver serials** — the serial marked on a receiver, verifiable against the maker's or a
  registry's domain, distinguishing a genuine serialised firearm from one with an obliterated or forged
  number.
- **Jewellery and precious-metal hallmarks** — a hallmark or assay mark with a verification line, so a
  buyer confirms the fineness claim ("750", "925") and the assay office that struck it, rather than
  trusting a stamp anyone can counterfeit.
- **Monuments, foundation stones, and provenance plaques** — a plaque on a sculpture, building, or
  memorial whose marked verification line ties it to the commissioning body or estate, defeating altered
  or fabricated commemorative and provenance claims.

## Example: Rating Plate

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #1a5f2a; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <span verifiable-text="start" data-for="rateplate"></span>
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;">RATING PLATE — LIFTING EQUIPMENT
═══════════════════════════════════════════════════════════════════

Manufacturer:  (crane / hoist maker)
Model / Serial: HX-900 / SN-4471829
Safe Working Load: 9,000 kg
Cert Standard: BS EN 14492-2
Salt:          K2M7R4X8

<span data-verify-line="rateplate">vfy:maker.example/plate/v</span></pre>
  <span verifiable-text="end" data-for="rateplate"></span>
</div>

The same shape applies to a VIN, a hallmark, or a monument plaque — a short marked line resolving to the
authority that stands behind the marking.

## Data Verified

The marked identifier and the claim it carries (rating, identity, fineness, registration, provenance),
the issuing authority, and the salt — bound to the authority's domain. The verifiable text is whatever is
marked into the surface; nothing depends on a separate document.

**What this does and does not prove.** It proves the **authority attests this marking** — the rating
plate, VIN, hallmark, or plaque is the genuine one the authority recorded. It does not, by itself, prove
the marking is still *physically attached to the original object* (a genuine plate can be moved to a
different machine); for high-stakes cases that risk is addressed by binding the marking to other
on-object identifiers, as the [aerospace version](aircraft-parts-traceability.md) does.

## Data Visible After Verification

**Status Indications:**
- **Verified** — The authority confirms this marked identifier and its claim.
- **Superseded** — The rating/registration was re-issued (e.g. a re-rated machine, a re-registered
  vehicle); the current record differs.
- **Revoked / Withdrawn** — The marking is no longer valid (e.g. a recalled product, a de-registered
  firearm).
- **404 / Not Found** — No such marking on record. Per the fail-loudly principle this means *unverified* —
  a possible forged plate, re-stamped VIN, or counterfeit hallmark — never silently treated as genuine.

## Second-Party Use

The **owner / holder** of the object benefits: a marked, verifiable rating plate or hallmark lets them
prove the object is genuinely what it claims when they sell, insure, or present it for inspection.

## Third-Party Use

- **Inspectors and safety regulators** — confirm a machine's rating plate is the manufacturer's before
  certifying it for use; catch swapped plates that overstate safe working load.
- **Buyers and dealers** — verify a VIN, a hallmark, or a provenance plaque at the point of sale, where
  social pressure and time discourage manual lookups.
- **Law enforcement** — distinguish a genuine firearm serial or VIN from an obliterated or re-stamped one
  in the field.
- **Auction houses, estates, and heritage bodies** — confirm a monument or provenance plaque is the one
  they commissioned.

## Verification Architecture

Mechanically this is camera mode (`text → normalize → SHA-256 → GET`) pointed at a permanently marked
surface. Two properties make it reliable here:

- **Short, structured marked text is OCR-friendly** — a rating plate or hallmark is a few fields, far
  easier to read than a dense page, so capture is robust even on a worn surface.
- **Graceful degradation** — because the verifiable unit is human-readable text, partial wear still reads,
  where a geometry-dependent code would fail outright. The `vfy:` short prefix keeps the marked footprint
  small on surfaces where space is scarce.

This is the civilian/civic application of the durable-marking pattern; the
[aerospace/industrial version](aircraft-parts-traceability.md) carries the full marking specifications
(laser annealing on titanium, MIL-STD-130, character heights) for safety-critical parts.

## Privacy Salt

The salt is required: marked identifiers are short and often structured (a serial, a rating), so without a
per-marking salt an attacker could enumerate or pre-compute likely values. The salt — marked into the
surface alongside the identifier — makes each marking's hash unique and unguessable.

## Authority Chain

**Pattern:** Commercial or Regulated, depending on the marking.

A manufacturer's rating plate is commercial (the maker attests it); a VIN or firearm serial may chain to
a national registry; a hallmark chains to an assay office.

```
✓ maker.example/plate/v — Manufacturer attests this rating plate
  (or → national vehicle/firearm registry, or → assay office, per marking type)
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the protocol and
[Aircraft Parts Traceability](aircraft-parts-traceability.md) for the safety-critical sibling.

## Further Derivations

None currently.

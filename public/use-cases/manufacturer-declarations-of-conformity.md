---
title: "Manufacturer Declarations of Conformity (DoC)"
category: "Product Certifications & Compliance"
volume: "Medium"
retention: "Product lifecycle (5-15 years)"
slug: "manufacturer-declarations-of-conformity"
verificationMode: "clip"
tags: ["ce-marking", "fcc-compliance", "declaration-of-conformity", "product-safety", "iso-standards", "manufacturing-compliance", "european-union-doc"]
furtherDerivations: 1
---

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 1px solid #333; background: #fff; padding: 0; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <div style="background: #333; color: #fff; padding: 20px; display: flex; justify-content: space-between; align-items: center;">
    <div>
      <div style="font-weight: bold; font-size: 1.2em;"><span verifiable-text="start" data-for="doc"></span>EU DECLARATION OF CONFORMITY</div>
      <div style="font-size: 0.8em; opacity: 0.8;">In accordance with EN ISO/IEC 17050-1</div>
    </div>
    <div style="font-size: 1.5em; font-weight: bold;">CE</div>
  </div>
<div style="padding: 30px;">
    <div style="border-bottom: 2px solid #333; padding-bottom: 10px; margin-bottom: 20px;">
      <h3 style="margin: 0; color: #333;">PRODUCT IDENTIFICATION</h3>
      <div style="font-size: 1.1em; font-weight: bold; margin-top: 5px;">Model: S-SERIES ROBOTIC HUB (V4.2)</div>
    </div>
<div style="font-size: 0.95em; line-height: 1.6; color: #333;">
      <p><strong>Manufacturer:</strong> Cyberdyne Systems, SA<br>
      <strong>Address:</strong> Rue de la Loi 42, Brussels, Belgium</p>
<p>This declaration is issued under the sole responsibility of the manufacturer. The object of the declaration described above is in conformity with the following relevant Union harmonization legislation:</p>
<div style="background: #f5f5f5; border: 1px solid #ddd; padding: 10px; margin: 15px 0; border-radius: 4px; font-family: monospace; font-size: 0.85em;">
        ✅ 2014/35/EU (Low Voltage Directive)<br>
        ✅ 2014/30/EU (EMC Directive)<br>
        ✅ 2011/65/EU (RoHS 2 Directive)
      </div>
<p><strong>Signed for and on behalf of:</strong> Dr. Elena Rossi, CTO<br>
      <strong>Date:</strong> March 15, 2026</p>
    </div>
<div data-verify-line="doc" style="border-top: 1px dashed #999; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
      title="Demo only: Manufacturer doesn't yet offer verification&#10;endpoints, so this is illustrative">
      <span data-verify-line="doc">verify:cyberdyne.be/compliance/v</span> <span verifiable-text="end" data-for="doc"></span>
    </div>
  </div>
</div>

## The Problem: Fake CE Fraud

- **China Export Scam:** Using a logo that looks like "CE" but actually means "China Export," and providing a fake paper DoC to trick customs.
- **Standard Padding:** Claiming a product meets "Medical Device" standards on the paper form when it was actually only tested for "General Consumer" use.
- **Date Alteration:** Changing a 2020 DoC to read 2026 to avoid re-testing against new, stricter safety laws.

## What Is Checked

Manufacturer name, premises address, product model/part number, serial number range, list of applicable EU Directives/Standards (e.g., LVD, EMC, RoHS), authorized signatory name/title, date of issuance, location of signature.

**Document Types:**
- **EU Declaration of Conformity (DoC):** Required for the CE mark.
- **FCC Declaration:** For radio frequency equipment in the USA.
- **UKCA Declaration:** Post-Brexit standard for the UK market.
- **Certificate of Origin:** (Linked hash) proving where it was built.

## What the Checker Sees

Shows the issuer domain (`apple.com`, `bosch.de`, `cyberdyne.be`) and current compliance standing.

**Status Indications:**
- **Valid** — Product meets all listed standards and is authorized for sale.
- **Recalled** — Safety issue found; product must be removed from market.
- **Superseded** — New hardware version or standard update has invalidated this DoC.
- **Invalid** — Model number or directive mismatch.

### Scope enrichment: which standard was actually met

The characteristic DoC fraud is *standard padding* — claiming a stricter standard (e.g. "Medical
Device") than the product was actually tested against ("General Consumer"). A DoC carries no personal
data, so on verification the issuer can safely **echo the exact standards and directives the product
was assessed under**, plus `assessed_on`/`retest_due`. A buyer then sees the *actual* scope of the
declaration rather than a padded label, and cannot read a general-consumer DoC as a medical-grade one.
Safe enrichment — no personal data, revealing the scope the terse claim withheld (see
[safety-certifications](safety-certifications.md) and
[verification-enrichment-hazards.md](../../docs/verification-enrichment-hazards.md)).

## Who Holds It

The Importer / Distributor benefits from verification.

**Customs Clearance:** Proving to an EU Customs officer that the 10,000 robotic hubs being imported have a "Verified DoC" from the manufacturer. Verification prevents the entire shipment from being seized at the port due to a "Suspected Fake CE Certificate."

**Retailer Onboarding:** Proving to a major retailer (e.g., MediaMarkt or Amazon) that the product meets all verified safety laws, reducing the retailer's liability risk.

## Who Checks It

**Customs & Market Surveillance (EU/HMRC)**
**Enforcement:** Market surveillance officers walking through a store can scan the hash on the product manual. "Verified by Bosch.de" ensures the company hasn't just "Slapped a CE logo" on an un-tested, dangerous electronic product.

**Insurance Companies**
**Product Liability:** Verifying the DoC before writing a policy for a high-risk product (e.g., electric scooters or medical lasers).

**Corporate Procurement**
**Sourcing Compliance:** Ensuring that all hardware being installed in a new office building has verified safety certifications.

## Who Issues It

**Issuer Types** (First Party)

**Global Manufacturers:** (Hosting on their own `/compliance` domain).
**Testing Houses:** (e.g., TUV, SGS, UL - hosting the verified test reports).
**Authorized Representatives:** (For companies outside the EU/UK).

## Authority Chain

**Pattern:** Regulated

Manufacturers must declare that products meet applicable safety standards and directives, with declarations subject to product safety authority oversight to prevent unsafe products from reaching markets.

```
✓ doc.siemens.com/verify — Issues verified Declarations of Conformity
  ✓ opss.gov.uk — Enforces UK product safety standards
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Where Each Fits: Live Verify and QR Codes on Products

Many manufacturers print a QR code on the product or its packaging that leads to their support or documentation pages, sometimes including the declaration of conformity. The QR code is the manufacturer's own convenience link. It and Live Verify answer different questions and work side by side: one takes the reader to a web page, the other lets the reader confirm that the printed declaration in the manual is one the manufacturer stands behind.

| | QR code redirect | Live Verify on the declaration of conformity | Scanned PDF declaration |
| :--- | :--- | :--- | :--- |
| **Who can check** | Anyone who scans the code. | Anyone holding the declaration: an importer, a market surveillance inspector, a buyer, a distributor. | Nobody; it can only be taken on trust. |
| **What the checker gets** | Whatever page the code points to, which may be a general help page, and which can itself be changed or point somewhere false. | Confirmation that the manufacturer issued this exact declaration, including the directives and standards listed, as at its date, and whether it has since been withdrawn. | A declaration whose directives or standards may have been edited. |
| **What the manufacturer shares** | A link of its choosing. | Only the declaration it printed or supplied. | Only the declaration it supplied. |
| **Over the product's life** | As long as the sticker survives and the link still works. | Checkable for as long as the manufacturer keeps publishing the hash. | Survives, but cannot be trusted. |
| **Reach** | Products carrying a code. | Global in principle: any manufacturer, in any country, that publishes hashes on its own domain. | Anywhere, but untrusted. |
| **Speed and cost** | A scan and a page load. | A few seconds per check: one web lookup, with no fee to the standard. | Immediate. |
| **What it needs** | A code on the product, and a destination the manufacturer maintains. | The manufacturer to publish hashes, and Live Verify-aware software on the checker's device. No manufacturer does this yet. | Nothing. |
| **Best suited to** | Reaching support, manuals and product information quickly. | Confirming that a specific version of the declaration is genuine. | Nothing where compliance is checked. |

**Where each fits:** A QR code on the product is convenient and is often the fastest way to reach a manufacturer's support or documentation pages. It says little about the declaration itself, and a sticker may not last as long as the product does. Live Verify works from the printed text of the declaration in the manual, letting an importer, inspector or buyer confirm that the manufacturer stands behind that version. A manual can carry both without conflict.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).

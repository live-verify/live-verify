---
title: "Manufacturer Declarations of Conformity (DoC)"
category: "Product Certifications & Compliance"
volume: "Medium"
retention: "Product lifecycle (5-15 years)"
slug: "manufacturer-declarations-of-conformity"
tags: ["ce-marking", "fcc-compliance", "declaration-of-conformity", "product-safety", "iso-standards", "manufacturing-compliance", "european-union-doc"]
furtherDerivations: 1
---

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 1px solid #333; background: #fff; padding: 0; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <div style="background: #333; color: #fff; padding: 20px; display: flex; justify-content: space-between; align-items: center;">
    <div>
      <div style="font-weight: bold; font-size: 1.2em;"><span verifiable-text="start" data-for="doc">[</span>EU DECLARATION OF CONFORMITY</div>
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
      verify:cyberdyne.be/compliance/v <span verifiable-text="end" data-for="doc">]</span>
    </div>
  </div>
</div>

## Data Verified

Manufacturer name, premises address, product model/part number, serial number range, list of applicable EU Directives/Standards (e.g., LVD, EMC, RoHS), authorized signatory name/title, date of issuance, location of signature.

**Document Types:**
- **EU Declaration of Conformity (DoC):** Required for the CE mark.
- **FCC Declaration:** For radio frequency equipment in the USA.
- **UKCA Declaration:** Post-Brexit standard for the UK market.
- **Certificate of Origin:** (Linked hash) proving where it was built.

## Data Visible After Verification

Shows the issuer domain (`apple.com`, `bosch.de`, `cyberdyne.be`) and current compliance standing.

**Status Indications:**
- **Valid** — Product meets all listed standards and is authorized for sale.
- **Recalled** — **ALERT:** Safety issue found; product must be removed from market.
- **Superseded** — New hardware version or standard update has invalidated this DoC.
- **Invalid** — Model number or directive mismatch.

## Second-Party Use

The **Importer / Distributor** benefits from verification.

**Customs Clearance:** Proving to an EU Customs officer that the 10,000 robotic hubs being imported have a "Verified DoC" from the manufacturer. Verification prevents the entire shipment from being seized at the port due to a "Suspected Fake CE Certificate."

**Retailer Onboarding:** Proving to a major retailer (e.g., MediaMarkt or Amazon) that the product meets all verified safety laws, reducing the retailer's liability risk.

## Third-Party Use

**Customs & Market Surveillance (EU/HMRC)**
**Enforcement:** Market surveillance officers walking through a store can scan the hash on the product manual. "Verified by Bosch.de" ensures the company hasn't just "Slapped a CE logo" on an un-tested, dangerous electronic product.

**Insurance Companies**
**Product Liability:** Verifying the DoC before writing a policy for a high-risk product (e.g., electric scooters or medical lasers).

**Corporate Procurement**
**Sourcing Compliance:** Ensuring that all hardware being installed in a new office building has verified safety certifications.

## Verification Architecture

**The "Fake CE" Fraud Problem**

- **China Export Scam:** Using a logo that looks like "CE" but actually means "China Export," and providing a fake paper DoC to trick customs.
- **Standard Padding:** Claiming a product meets "Medical Device" standards on the paper form when it was actually only tested for "General Consumer" use.
- **Date Alteration:** Changing a 2020 DoC to read 2026 to avoid re-testing against new, stricter safety laws.

**Issuer Types** (First Party)

**Global Manufacturers:** (Hosting on their own `/compliance` domain).
**Testing Houses:** (e.g., TUV, SGS, UL - hosting the verified test reports).
**Authorized Representatives:** (For companies outside the EU/UK).

## Jurisdictional Witnessing

A jurisdiction may require the issuer to retain a **witnessing firm** for regulatory compliance. The witnessing firm:

- Receives all hashes from the issuer, and any subsequent changes to the payload as they happen—which may manifest as a new hash, a status change, or even a 404 (record deleted)
- Receives structured content/metadata (key identifiers and dates)
- Does **NOT** receive plaintext or sensitive personal information
- Provides an immutable, timestamped audit trail—available to the jurisdiction on demand, to document holders/third parties during disputes, or as expert witness testimony in legal proceedings

This provides:
- **Non-repudiation:** Issuer cannot deny issuing the document
- **Timestamp proof:** Document existed at a specific time
- **Regulatory audit:** Jurisdictions can inspect the witness ledger for fraud detection
- **Resilience:** Verification works even if issuer's systems go down

**Public Blockchain (Non-Party)**

Witnessing firms may periodically commit rollups to an inexpensive public blockchain, providing an ultimate immutability guarantee. The blockchain is a "non-party"—infrastructure, not a participant in the transaction. This creates multiple verification paths:

1. **Issuer domain** — Direct check against the issuer
2. **Witnessing firm** — Independent confirmation with timestamp
3. **Public blockchain** — Decentralized trust anchor via rollup inclusion


## Competition vs. QR Redirects

| Feature | Live Verify | Standard QR Code Redirect | Scanned PDF DoC |
| :--- | :--- | :--- | :--- |
| **Trust Anchor** | **Domain-Bound.** Bound to the Manufacturer. | **Data-Only.** QR can redirect to any fake URL. | **Zero.** Easily forged. |
| **Integrity** | **Cryptographic.** Binds the *Directives*. | **Vulnerable.** The landing page can be edited. | **Vulnerable.** |
| **Persistence** | **High.** Text remains verifiable for 15 years. | **Low.** QR stickers get scratched or fade. | **Vulnerable.** |
| **User Control** | **Targeted.** Verifies the *Exact Version*. | **General.** Often links to a generic "Help" page. | **Full.** But untrusted. |

**Why Live Verify wins here:** The "Product Manual" reality. DoCs are usually buried at the back of a printed manual. QR codes on stickers often don't last the 10-year life of a product. Live Verify turns the **Printed Text of the Manual** into a live, high-authority digital anchor, ensuring that safety trust is as durable as the product itself.

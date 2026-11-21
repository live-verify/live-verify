---
title: "Food Safety and Dietary Certifications"
category: "Product Certifications & Compliance"
volume: "Small"
retention: "2-7 years (audit cycles)"
slug: "food-safety-certifications"
verificationMode: "clip"
tags: ["food-safety", "haccp", "sqf", "brcgs", "organic-certification", "kosher-halal", "supply-chain-transparency", "gfsi"]
furtherDerivations: 1
---

## What is a Food Safety Audit?

Before a company like Costco or Walmart will buy frozen pizza or canned soup from a factory, they require an independent Food Safety Audit (like SQF or BRCGS).

An auditor visits the factory to verify that the floors are clean, the machines are sanitized, and the workers follow hygiene rules. The result is a Certificate of Registration.

This certificate is the "License to Sell" to big retailers. Shady factories that fail their audit sometimes "Photoshop" a passing certificate to trick buyers. Verified hashes allow a retail buyer to see the un-altered audit score on the standard body's domain.

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 2px solid #333; background: #fff; padding: 0; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <div style="background: #000; color: #fff; padding: 20px; display: flex; justify-content: space-between; align-items: center;">
    <div>
      <div style="font-weight: bold; font-size: 1.2em;"><span verifiable-text="start" data-for="food-safe"></span>SQF INSTITUTE</div>
      <div style="font-size: 0.8em; opacity: 0.8;">Food Safety Code for Manufacturing</div>
    </div>
    <div style="text-align: right;">
      <div style="font-size: 0.8em;">Edition 9.0</div>
    </div>
  </div>
<div style="padding: 30px; text-align: center;">
    <h2 style="margin: 0; color: #333; font-size: 1.4em;">CERTIFICATE OF REGISTRATION</h2>
<div style="font-size: 1.1em; line-height: 1.6; color: #333; margin: 25px 0;">
      This is to certify that<br>
      <strong>APEX FOOD PROCESSING, LLC</strong><br>
      123 Industrial Way, Chicago, IL 60601
    </div>
<div style="background: #f9f9f9; padding: 15px; border: 1px solid #eee; margin-bottom: 25px; text-align: left; font-size: 0.9em;">
      <strong>Scope:</strong> Processing of Perishable Prepared Foods (Ready-to-Eat).<br>
      <strong>Audit Rating:</strong> EXCELLENT (98/100)<br>
      <strong>Certification Body:</strong> SCS Global Services
    </div>
<div style="font-size: 0.8em; color: #777;">
      <strong>Certificate #:</strong> SQF-99228877<br>
      <strong>Valid Until:</strong> March 15, 2027
    </div>
<div data-verify-line="food-safe" style="border-top: 1px dashed #999; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
      title="Demo only: SQF doesn't yet offer verification&#10;endpoints, so this is illustrative">
      <span data-verify-line="food-safe">verify:sqfi.com/v</span> <span verifiable-text="end" data-for="food-safe"></span>
    </div>
  </div>
</div>

## The Problem: Dirty Secret Fraud

- **Certificate Forgery:** A facility that failed its audit creating a fake "Passing" PDF to keep their contract with a major retailer.
- **Scope Misrepresentation:** Taking a certificate for "Dry Legumes" and using it to sell "High-Risk Prepared Salads" to trick a buyer.
- **Status Concealment:** Hiding that a certificate was "Suspended" yesterday after an E. coli outbreak.

## What Is Checked

Facility name, premises address, certification standard (e.g., SQF, BRCGS, HACCP), audit score/rating, scope of certification (e.g., "Dairy" vs "Dry Goods"), certification body name, issuance date, expiration date, serial number.

### Scope enrichment: what the certificate actually covers

The headline fraud here is *scope misrepresentation* — using a certificate for "Dry Legumes" to sell
"High-Risk Prepared Salads." A food-safety certificate carries no personal data, so on verification the
certification body can safely echo the certified scope and freshness — the exact
`certified_scope` (e.g. "Processing of Perishable Prepared Foods (Ready-to-Eat)"), the `audit_date`,
and the `recertification_due`. A buyer then sees the *actual* scope of the certificate rather than a
broadened label, and cannot read a dry-goods certificate as covering high-risk prepared foods; and a
certificate past its audit window reads as stale. Safe enrichment — no personal data, revealing the
scope and freshness the terse claim withheld (see
[safety-certifications](safety-certifications.md) and
[verification-enrichment-hazards.md](../../docs/verification-enrichment-hazards.md)).

**Document Types:**
- **GFSI Audit Certificate:** The gold standard for global manufacturing.
- **Organic Integrity Certificate:** Proving USDA/EU Organic status.
- **Kosher / Halal Certification:** Proving religious dietary compliance.
- **Pesticide-Free Attestation:** (Linked hash) from a 3rd party lab.

## Verification Response

The endpoint returns a simple status code:

- **OK** — Facility passed audit and is in good standing
- **SUSPENDED** — Critical safety failure detected; certification paused; do not source from this facility
- **REVOKED** — Certificate voided due to fraud or systemic contamination
- **EXPIRED** — Re-audit overdue; certification no longer valid
- **404** — Certificate not found (never issued, wrong facility, or OCR error)

The issuer domain is visible from the `verify:` line on the certificate itself (e.g., `sqfi.com`).

## Post-Verification Actions

None typically. The verification confirms the facility's certification status; that's the value for procurement teams and supply chain audits.

**Why No Further Action:**

- **Retail procurement** just needs the status code to approve or flag a supplier
- **Insurance underwriters** just need to confirm the audit rating for pricing
- **Supply chain platforms** just need pass/fail for automated compliance checks

If there's a problem (SUSPENDED, REVOKED), the action is clear: don't source from the facility, find an alternative supplier. No POST form needed.

**For Food Safety Incidents:**

If a verifier discovers contamination or suspects certificate fraud, the report goes to:
- The certification body (SQF, BRCGS)
- FDA or local health authority
- Not through a verification endpoint — these are regulatory enforcement matters

## Who Holds It

The Manufacturer / Processor benefits from verification.

**Retailer Onboarding:** Proving to a major retailer (e.g., Costco or Whole Foods) that the facility meets their "Tier 1 Food Safety" requirements. A verified hash from the standard body domain prevents the 2-week delay of manual audit verification.

**Brand Protection:** Displaying the "Verified SQF" badge on B2B marketing materials, ensuring that potential partners trust the facility's hygiene standards without needing a physical site-visit.

## Who Checks It

**Retail Procurement Teams**
**Supply Chain Integrity:** Instantly verifying the safety certificates of 500+ suppliers. Live Verify allows procurement platforms to automatically flag suppliers with "Suspended" or "Expired" certificates, preventing contaminated food from reaching store shelves.

**Consumers (Labels)**
**Trust Check:** Scanning a QR code on a pack of "Verified Halal" or "Verified Organic" food. "Verified by OU Kosher" provides instant, cryptographic assurance that the label isn't just a marketing fabrication.

**Insurance Companies**
**Recall Coverage:** Underwriters verify food safety scores to price "Product Recall" policies. A verified 98/100 rating leads to lower premiums than an unverified "Pass."

## Who Issues It

**Issuer Types** (First Party)

**Scheme Owners:** (SQF Institute, BRCGS, FSSC 22000).
**Certification Bodies:** (SCS Global, NSF International).
**National Agriculture Depts:** (USDA, EU Commissions).

## Authority Chain

**Pattern:** Regulated

```
✓ hygiene.example-restaurant.co.uk/verify — Prepares and serves food to the public
  ✓ food.gov.uk — Regulates food safety and hygiene standards in the UK
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Where Each Fits: Live Verify and Supplier Compliance Portals

Supplier compliance portals such as ReposiTrak are commercial services where retailers collect and track their suppliers' certificates, including food safety audits under schemes such as SQF and BRCGS. A portal and Live Verify answer different questions and work side by side: one manages a retailer's whole supply base, the other lets any recipient confirm that the certification body stands behind a particular certificate.

| | Supplier compliance portal | Live Verify on the certificate | Unverified scan or PDF |
| :--- | :--- | :--- | :--- |
| **Who can check** | Retailers and suppliers subscribed to the same portal. | Anyone handed the certificate: a retail buyer, a distributor, an importer, a portal itself. | Nobody; it can only be taken on trust. |
| **What the checker gets** | Uploaded certificates, with expiry tracking, renewal reminders and a view across all suppliers. | Confirmation that the certification body stands behind this exact certificate, including its grade, as at its date, and whether it has since been suspended. | A document that may have been edited. |
| **What the supplier shares** | Its documents, uploaded to each portal its customers use. | Only the certificate it chose to hand over. | Only the certificate it chose to hand over. |
| **Reach** | Members of that portal. | Global in principle: any certification body, in any country, that publishes hashes on its own domain. | Anywhere, but untrusted. |
| **Speed and cost** | Fast once both sides are on it; subscription fees apply. | A few seconds per check: one web lookup, with no fee to the standard and no subscription. | Free and immediate. |
| **What it needs** | Both parties on the same portal. | The certification body to publish hashes, and Live Verify-aware software on the checker's device. No certification body does this yet. | Nothing. |
| **Best suited to** | Ongoing supplier management by a large retailer. | Checking a certificate from a supplier outside the portal, or across borders. | Nothing where food safety depends on it. |

**Where each fits:** Supplier compliance portals such as ReposiTrak do much more than hold a certificate: they track expiries, chase renewals and give a retailer one view of its supply base. Retailers and suppliers who are on the same portal should keep using it. A supplier with customers on several portals, or a buyer on none, still passes the certificate around as a PDF. Live Verify lets any recipient confirm the certification body stands behind it, and a portal can run the same check on documents uploaded to it.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).

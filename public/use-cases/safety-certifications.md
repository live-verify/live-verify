---
title: "Product Safety Certifications (UL, CE, Intertek)"
category: "Product Certifications & Compliance"
volume: "Very Large"
retention: "Product lifetime (10-30 years / liability lifecycle)"
slug: "safety-certifications"
verificationMode: "clip"
tags: ["product-safety", "ul-listing", "ce-mark", "electrical-safety", "intertek-etl", "manufacturing-compliance", "safety-fraud", "customs-vetting", "consumer-protection"]
furtherDerivations: 1
---

## What are Safety Certifications?

For any manufactured product—especially electronics, toys, and building materials—a Safety Certification (like a UL Listing or a CE Mark) is the proof that the item won't catch fire, explode, or leach toxins. These certifications are issued by independent labs after rigorous testing against thousands of pages of safety codes.

These documents are the "Entry Permit" for global commerce. US Customs, Amazon, and Walmart will not sell or import a product unless it has a verified Certificate of Compliance (CoC). Fraud is a massive global issue: factories in unregulated regions often place fake "UL" or "CE" labels on un-tested, dangerous products to save on testing costs. Verified hashes bind the Product Model, Testing Standard, and Lab ID to the certifying body's domain (e.g., `ul.com` or `intertek.com`).

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="safety"></span>UL SOLUTIONS
Certificate of Compliance
═══════════════════════════════════════════════════════════════════

Manufacturer:  GLOBAL POWER TECH LLC      Certificate #: UL-2026-992288
Model:         XJ-9922 High-Output Charger Issue Date:   15 MAR 2026
Batch #:       LOT-2026-8844              Lab ID:        #9922-CH

VERIFIED SAFETY STANDARDS
───────────────────────────────────────────────────────────────────
- UL 62368-1: Audio/Video, IT and Communication Tech
- CAN/CSA C22.2: Canadian Electrical Code Compliance
- IEC 60950-1: International IT Safety Standard

Representative samples tested and found to meet requirements.

<span data-verify-line="safety">verify:ul.com/v</span> <span verifiable-text="end" data-for="safety"></span></pre>
</div>

## The Problem: Fake Label Fraud

- **Standard Padding:** Printing a "UL Listed" logo on a product that was never tested by UL.
- **Model Masking:** Using a valid certificate for a "Safe" model to cover for a "Cheaper, Dangerous" model.
- **Lab Spoofing:** Creating a fake "CoC" from a non-existent testing lab with a fraudulent website.

## What Is Checked

Certificate number, manufacturer name, factory location ID, product model name/number, specific safety standards met (e.g., UL 60950), date of issuance, expiration date (if applicable), testing lab ID, follow-up service (FUS) status, signing engineer name.

**Document Types:**
- **Certificate of Compliance (CoC):** The summary for retailers/customs.
- **Listing Report (Full):** The multi-page technical test data.
- **Factory Inspection Report:** Proof the factory itself is audited.
- **Mark Authorization:** Permission to print the "UL" or "CE" logo.

## What the Checker Sees

Shows the issuer domain (`ul.com`, `intertek.com`, `tuv.com`) and the listing standing.

**Status Indications:**
- **Listed / Verified** — Product is current and in full safety compliance.
- **Withdrawn** — The listing has been cancelled (e.g., due to failed factory audit).
- **Recalled** — Product has a safety defect; stop use immediately.
- **Expired** — The certification period has passed; re-testing required.

### Scope enrichment: what the certificate actually covers

A certificate is authentic and yet still be *over-applied* — a genuine cert for a small tested run
waved through a far larger untested production run, or a cert for one model reused for a variant it
never covered. Binding the model and standard into the hash defeats *editing* the certificate; it does
not, on its own, tell a buyer whether the unit in their hands falls within what the cert covers.

Because a safety certificate carries no personal data, the certifying body can safely **echo the scope
of the certificate on verification** — the accountability facts the terse label had no room for. On a
successful lookup, `ul.com`/`intertek.com` may return:

```json
{
  "status": "verified",
  "certificate": "UL-2026-992288",
  "model": "XJ-9922",
  "standards": ["UL 62368-1", "CAN/CSA C22.2", "IEC 60950-1"],
  "run_covered": "LOT-2026-8844",
  "run_size_certified": "up to 500,000 units",
  "run_scope_note": "certification covers this production run; units beyond the certified quantity, or after retest_due, are not covered by this certificate",
  "tested_on": "2026-03-15",
  "retest_due": "2027-03-15",
  "labs": ["verify:labtest-shenzhen.example/reports"],
  "more": "https://ul.com/v/UL-2026-992288"
}
```

This lets the buyer answer the questions that matter and the label could not carry:

- **Is my unit in scope?** `run_covered` + `run_size_certified` make the covered run and quantity
  explicit — so a buyer can see that unit 800,000 of a run certified "up to 500,000" is *outside* the
  certificate, even though the certificate itself verifies.
- **Is the PASS still current?** `tested_on` + `retest_due` surface the point-in-time nature of the
  result — a certificate past its retest date is stale even when it looks fine (see
  [point-in-time vs current](../../docs/point-in-time-vs-current.md)).
- **What was actually tested?** The exact standards the samples met — so a cert for one standard cannot
  be read as covering a stricter one it never addressed.

This is a **model case of safe enrichment**: no personal data, and every field *reveals scope the terse
claim withheld* rather than repeating it (see
[verification-enrichment-hazards.md](../../docs/verification-enrichment-hazards.md) for when enrichment
is legitimate). The certifier discloses only accountability facts it is entitled to publish; the effect
is to stop a genuine, narrow certificate being over-read as a blanket guarantee — which is the core
mechanism of certificate-scope fraud.

## Who Holds It

The Manufacturer / Importer benefits from verification.

**Retailer Approval:** To get a product onto Amazon or Target, the importer provides the verified hash of their safety certificate. The retailer's "Automated Compliance Bot" scans the hash and instantly confirms the listing is real, removing the 2-week delay of manual lab-record checks.

**Insurance Underwriting:** Manufacturers can use verified hashes of their "Low-Risk" safety history to negotiate lower product liability premiums, proving their commitment to engineering standards with cryptographic certainty.

## Who Checks It

**Customs & Border Protection (CBP)**
**Anti-Counterfeit Vetting:** In a busy port, an officer scans the label on a crate of lithium batteries. If the hash returns "NOT FOUND" or "DOMAIN MISMATCH," they can seize the shipment immediately, stopping dangerous un-tested electronics from entering the market.

**Fire Marshals / Safety Inspectors**
**Field Integrity:** During a building inspection, the marshal scans the "Verified" stickers on the electrical panels or commercial kitchen equipment. Live Verify ensures the equipment hasn't been "Fake Labeled" to hide a lack of certification.

**Amazon / E-commerce Platforms**
**Merchant Accountability:** Automatically de-listing any seller whose verified safety hash returns a "RECALLED" or "WITHDRAWN" status, protecting customers from exploding chargers or toxic toys.

## Who Issues It

**Issuer Types** (First Party)

**Nationally Recognized Testing Laboratories (NRTLs) like UL, Intertek.**
**European Notified Bodies (for CE Marks).**
**National Standards Bureaus (e.g., NIST, ANSI).**

**Privacy Salt:** Low. Safety certifications are public safety data by necessity. However, individual factory IDs and production batch volumes should be salted to protect manufacturing trade secrets.

## Authority Chain

**Pattern:** Regulated

Safety testing laboratories are accredited by product safety authorities to verify that manufactured products meet rigorous safety standards before entering commerce.

```
✓ certs.ul.com/verify — Issues verified product safety certifications
  ✓ opss.gov.uk — Enforces UK product safety standards
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Rationale

Product safety is the "Invisible Foundation" of modern life. By turning static labels into verifiable digital bridges, we ensure that the "Protection" on the box is backed by the professional truth of the lab, preventing fires and saving lives.

## Jurisdictional Witnessing (Optional)

An independent witness layer may apply — see [Witnessing Third Parties](../../docs/WITNESSING-THIRD-PARTIES.md) for the full mechanism (what a witness receives, non-repudiation, optional public-blockchain rollups). For this use case: a witness would receive the testing laboratory's hashes and status changes plus structured metadata (certificate number, model, issue date, standards tested) — never plaintext or sensitive personal information — providing non-repudiation of the certificate and an audit trail regulators can inspect.

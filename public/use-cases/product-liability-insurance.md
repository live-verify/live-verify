---
title: "Product Liability Insurance Policies"
category: "Commercial Lines Insurance"
volume: "Small"
retention: "Policy term + 20-30 years (long-tail claims lifecycle)"
slug: "product-liability-insurance"
verificationMode: "clip"
tags: ["commercial-insurance", "product-liability", "manufacturing-risk", "claims-made", "retroactive-date", "supply-chain-insurance", "retailer-compliance", "product-recall"]
furtherDerivations: 1
---

## What is Product Liability Insurance?

For manufacturers and distributors, Product Liability Insurance is the safety net that protects them if a product they made or sold causes injury or property damage. For high-risk items (e.g., car seats, medical devices, or power tools), these policies carry limits of $5 million or more.

These documents are the "Proof of Solvency" for the supply chain. Large retailers (e.g., Target, Amazon) will not carry a product unless the manufacturer provides a verified Certificate of Insurance (COI). Fraud is high-stakes: a manufacturer might "edit" a policy to add a dangerous product that the insurer actually excluded, or change a "Claims-Made" date to hide a gap in coverage. Verified hashes bind the Covered Product List, Policy Limits, and Retroactive Dates to the insurer's domain (e.g., `chubb.com` or `travelers.com`).

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="liab"></span>CHUBB SPECIALTY
Commercial General & Product Liability
═══════════════════════════════════════════════════════════════════
POLICY SUMMARY                                     Ref: PL-99228877

Insured:  PRECISION POWER TOOLS INC.      Total Aggregate: $ 5,000,000
Address:  123 Industrial Rd, Ohio, USA    Per Occurrence:  $ 1,000,000
                                          Retroactive:     01 JAN 2015

VERIFIED COVERED PRODUCTS
───────────────────────────────────────────────────────────────────
- Lithium-Ion Powered Hand Drills (All Models)
- Electric Table Saws (v2.0 and later)
- Industrial Grinding Attachments (Verified)
- EXCLUDED: Chainsaw Components

Coverage expires: 15 MAR 2027

<span data-verify-line="liab">verify:chubb.com/liab/v</span> <span verifiable-text="end" data-for="liab"></span></pre>
</div>

## The Problem: Phantom Policy Fraud

- **Product Injection:** Editing a PDF to add "Chainsaws" to a policy that was only written for "Hand Drills."
- **Limit Padding:** Changing a $1M limit to $5M to meet a retailer's minimum requirements.
- **Date Stretching:** Using a 2024 policy for a 2026 shipment by changing the expiration year.

## What Is Checked

Policy number, insurer name (NAIC code), insured name, address, per-occurrence limit, general aggregate limit, products/completed operations aggregate, covered product category list, retroactive date (for claims-made policies), deductible amount, primary/excess status, broker ID.

**Document Types:**
- **Certificate of Liability Insurance:** (COI) The 1-page summary for retailers.
- **Policy Declarations Page:** The detailed financial summary.
- **Schedule of Forms & Endorsements:** Listing all technical add-ons.
- **Vendor's Endorsement (CG 20 15):** Proof the retailer is also protected.

## What the Checker Sees

Shows the issuer domain (`chubb.com`, `travelers.com`, `aig.com`) and the policy standing.

**Status Indications:**
- **Active / Verified** — Policy is current and premium-paid.
- **Cancelled** — Coverage was terminated (e.g., for non-payment or high claims).
- **Product Alert** — A specific product has been excluded from coverage mid-term.
- **Retro-Date Gap** — There is an un-insured period between the retro-date and today.

## Who Holds It

The Manufacturer / Distributor benefits from verification.

**Retailer Onboarding:** To get a product onto the shelves of Walmart or Home Depot, the manufacturer must provide a verified COI. A verified hash allows the retailer's "Compliance Software" to instantly approve the vendor, reducing the time-to-market by several weeks.

**Recall Coordination:** If a product is recalled, the manufacturer can use the verified policy hash to prove to regulators (e.g., CPSC) that they have the financial backing to handle the recall and potential liability claims.

## Who Checks It

**Retailer Procurement Teams**
**Continuous Monitoring:** Retailers can automatically scan the hashes of all 10,000 vendors in their system. If a vendor's policy hash returns "CANCELLED," the system can instantly block further orders and remove the product from the website to protect the retailer's brand.

**Plaintiff Attorneys (Injury Cases)**
**Discovery Verification:** In a lawsuit over a faulty tool, the attorney scans the manufacturer's COI. "Verified by Chubb" ensures that there is a real multi-million dollar policy available to pay for the victim's medical bills, preventing a "Ghost Policy" defense.

**Wholesale Distributors**
**Liability Transfer:** Ensuring that the sub-manufacturers they buy from are properly insured, protecting the distributor from "un-reimbursed" liability claims.

## Who Issues It

**Issuer Types** (First Party)

**Global Commercial Insurers.**
**Surplus Lines Carriers (e.g., Lloyd's).**
**Specialized Insurance Brokers.**

**Privacy Salt:** Essential. Client lists and specific coverage limits are sensitive competitive data. The hash must be salted to prevent "Policy Harvesting" by rivals.

## Authority Chain

**Pattern:** Regulated

Zurich issues product liability insurance and is regulated by the UK Financial Conduct Authority under the UK insurance framework and consumer protection laws.

```
✓ product-liability.zurich.co.uk/verify — Commercial general and product liability insurer
  ✓ fca.org.uk/register — Regulates UK general insurance firms
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Rationale

Product liability is the "Long-Tail Risk" of the global economy. By turning static COIs into verifiable digital bridges, we ensure that the "Chain of Accountability" from factory to shelf is backed by cryptographic proof, protecting both consumers and commerce.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).

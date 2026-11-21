---
title: "Loss Reserve Opinions (Property & Casualty)"
category: "Actuarial & Insurance Mathematics"
volume: "Very Small"
retention: "7-15 years (claims settlement)"
slug: "loss-reserve-opinions"
verificationMode: "clip"
tags: ["actuarial-opinion", "loss-reserves", "property-casualty", "solvency-audit", "naic-compliance", "cas-actuary", "casualty-insurance"]
furtherDerivations: 1
---

<div style="max-width: 600px; margin: 24px auto; font-family: 'Georgia', serif; border: 1px solid #333; background: #fff; padding: 40px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 30px;">
    <div style="font-weight: bold; font-size: 1.1em; color: #d32f2f;"><span verifiable-text="start" data-for="loss-res"></span>STATE FARM FIRE & CASUALTY</div>
    <div style="text-align: right; font-size: 0.8em; color: #666;">
      Statutory Filing: LOSS-2026-FL<br>
      March 15, 2026
    </div>
  </div>
<h3 style="text-align: center; text-transform: uppercase; letter-spacing: 1px; color: #d32f2f; border-bottom: 2px solid #d32f2f; padding-bottom: 10px;">Statement of Actuarial Opinion (SAO)</h3>
<div style="font-size: 0.95em; line-height: 1.6; text-align: justify; color: #333; margin-top: 20px;">
    <p>I, <strong>Robert Miller, FCAS, MAAA</strong>, Appointed Actuary, do hereby certify that the loss and loss adjustment expense reserves for the <strong>Florida Homeowners Portfolio</strong> as of Dec 31, 2025:</p>
<ul>
      <li>Are developed using standard actuarial methodologies (Chain Ladder, Bornhuetter-Ferguson).</li>
      <li>Meet the requirements of the National Association of Insurance Commissioners (NAIC).</li>
      <li>Are within a reasonable range of the central estimate.</li>
    </ul>
<p><strong>Total Certified Loss Reserves:</strong> $ 4,250,000,000.00</p>
  </div>
<div style="margin-top: 40px; display: flex; justify-content: space-between; align-items: flex-end;">
    <div style="border-top: 1px solid #000; width: 200px; padding-top: 5px; font-style: italic;">Robert Miller, FCAS</div>
    <div style="text-align: right;">
      <div style="border: 1px solid #d32f2f; display: inline-block; padding: 5px 10px; font-size: 0.8em; color: #d32f2f; font-weight: bold;">FILED & VERIFIED</div>
    </div>
  </div>
<div data-verify-line="loss-res" style="border-top: 1px dashed #999; margin-top: 40px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
      title="Demo only: State Farm doesn't yet offer verification&#10;endpoints, so this is illustrative">
      <span data-verify-line="loss-res">verify:statefarm.com/actuarial/v</span> <span verifiable-text="end" data-for="loss-res"></span>
  </div>
</div>

## The Problem: Reserve Smoothing Fraud

- **Liability Deflation:** Manually editing a $5B reserve to $4B in the PDF to make the company look more profitable or to avoid a "Capital Call" from regulators.
- **Hiding Qualifications:** Deleting the actuary's warning about "Inadequate Data" or "Adverse Deviation" to appear safer than the reality.
- **Actuary Impersonation:** Creating a fake SAO using the name of a famous CAS Fellow who never actually saw the data.

## What Is Checked

Certifying actuary name/qualifications (FCAS/ACAS), insurer name, specific line of business (e.g., Workers Comp, Auto, GL), total reserve amount (USD), valuation date, NAIC Annual Statement reference, actuarial range (high/low), date of opinion issuance.

**Document Types:**
- **Statement of Actuarial Opinion (SAO):** The primary 1-page compliance filing.
- **Actuarial Report (Long Form):** Detailed technical backing (linked hash).
- **Schedule P Summary:** Showing historical loss development.
- **Qualified Opinion Letter:** (ALERT) if actuary has reservations about data.

## What the Checker Sees

Shows the issuer domain (the Insurance Carrier or the Actuarial Audit Firm) and the filing status.

**Status Indications:**
- **Filed & Verified** — Opinion matches the official regulatory filing.
- **Under Correction** — Firm has noted a post-filing error in loss triangles.
- **Superseded** — Replaced by a newer audit or restatement.
- **In-Litigation** — Reserves challenged by state regulators or a receiver.

## Who Holds It

The Insurer's Board of Directors benefits from verification.

**Solvency Assurance:** Proving to the Board that the $4.2B reserve figure is verified and vetted by an external or appointed actuary. This protects directors from "Breach of Duty" lawsuits if the company later goes into insolvency due to "Under-reserving."

**Reinsurance Recovery:** Providing verified hashes of loss opinions to reinsurers to trigger "Loss Portfolio Transfers" or to prove that the primary carrier is maintaining the "Skin in the Game" required by treaties.

## Who Checks It

**State Insurance Commissioners (DOI)**
**Market Oversight:** Regulators can verify the authenticity of the actuarial signature and the specific reserve figures. Live Verify prevents a carrier from submitting a "Realistic" version to their reinsurer and a "Rosy" version to the state.

**Rating Agencies (A.M. Best / Moody's)**
**Capital Adequacy:** Verifying the actuarial opinion underlying the carrier's credit rating. A verified "Reasonable Range" check allows for more accurate rating actions.

**Investment Analysts**
**Equity Valuation:** Ensuring the "Reserve Releases" reported in earnings calls match the verified actuarial opinions filed with regulators.

## Who Issues It

**Issuer Types** (First Party)

**P&C Insurance Carriers.**
**Actuarial Audit Firms:** (Milliman, Willis Towers Watson, KPMG).
**State Departments of Insurance.**

## Authority Chain

**Pattern:** Regulated

Actuaries assess the adequacy of insurance loss reserves for accounting and solvency.

```
✓ lro.milliman.com/verify — Issues loss reserve opinions for insurers
  ✓ frc.org.uk/actuaries — Regulates UK actuarial standards and practice
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Compared With SERFF Public Search

| Feature | Live Verify | SERFF / State Public Search | Scanned PDF Memo |
| :--- | :--- | :--- | :--- |
| **Trust Anchor** | **Domain-Bound.** Bound to the Actuary/Insurer. | **Gov-Bound.** | **Zero.** Easily forged. |
| **Speed** | **Instant.** Scan the paper in the boardroom. | **Slow.** Requires finding the NAIC # and navigating Gov UI. | **Instant.** |
| **Immediacy** | **Real-time.** Shows if firm retracted opinion. | **Laggy.** Depends on annual filing cycles. | **Static.** |
| **Detail** | **High.** Shows specific line-of-business limits. | **Low.** Often only shows aggregated totals. | **Vulnerable.** |

**Where each fits:** State filing searches are the official source for what an insurer has filed and are where a regulator or analyst should look for the company's overall position. In a reserve review or a negotiation, people are working from the opinion and memos handed across the table, which the public search does not reproduce page for page. Live Verify lets a reader confirm the actuary or insurer stands behind the document in hand, and the filed record remains the reference for everything else.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).

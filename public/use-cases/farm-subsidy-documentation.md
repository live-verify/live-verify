---
title: "Farm Subsidy Documentation"
category: "Agriculture & Food"
volume: "Small"
retention: "7-10 years (government audit)"
slug: "farm-subsidy-documentation"
verificationMode: "clip"
tags: ["agriculture", "farm-subsidy", "usda-fsa", "payment-eligibility", "conservation-program", "rural-finance", "audit-trail"]
furtherDerivations: 1
---

## What is a Farm Subsidy?

A Farm Subsidy is a payment from the government (USDA) to help farmers manage the risk of low crop prices or bad weather.

Because these payments reach billions of dollars annually, they are highly regulated. To get one, a farmer must prove they are "Actively Engaged in Farming" and that their personal income isn't too high (the AGI rule).

Farmers use these verified eligibility letters to get "Operating Loans" from banks to buy seeds and fertilizer. Fraudsters often edit these letters to look eligible for higher payments than they actually are. Verified hashes link the bank directly to the USDA's official approval record.

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 1px solid #ccc; background: #fff; padding: 0; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <div style="background: #1b5e20; color: #fff; padding: 20px; display: flex; justify-content: space-between; align-items: center;">
    <div>
      <div style="font-weight: bold; font-size: 1.1em;"><span verifiable-text="start" data-for="subsidy"></span>U.S. DEPARTMENT OF AGRICULTURE</div>
      <div style="font-size: 0.8em;">Farm Service Agency (FSA)</div>
    </div>
    <div style="width: 40px; height: 40px; background: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #1b5e20; font-weight: bold; font-size: 0.7em;">USDA</div>
  </div>
<div style="padding: 25px;">
    <h3 style="margin-top: 0; color: #1b5e20; border-bottom: 2px solid #1b5e20; padding-bottom: 5px;">NOTICE OF PAYMENT ELIGIBILITY</h3>
<div style="font-size: 0.9em; line-height: 1.6; color: #333;">
      <p><strong>Producer:</strong> Miller Family Farms, Inc.<br>
      <strong>Business Type:</strong> Corporation (EIN: **-***5544)</p>
<div style="background: #f1f8e9; padding: 15px; border: 1px solid #c5e1a5; margin: 15px 0;">
        <p><strong>Program:</strong> Agriculture Risk Coverage (ARC-CO)<br>
        <strong>Plan Year:</strong> 2026<br>
        <strong>Payment Status:</strong> ELIGIBLE / APPROVED</p>
        <p><strong>Total Program Limit:</strong> $ 125,000.00</p>
      </div>
<p><strong>County Office:</strong> Story County, Iowa<br>
      <strong>Approval Date:</strong> March 15, 2026</p>
    </div>
<div style="margin-top: 25px; border: 1px solid #ccc; padding: 10px; font-size: 0.8em; color: #555; background: #fafafa; font-style: italic;">
      Verification confirms compliance with Adjusted Gross Income (AGI) and "Actively Engaged in Farming" requirements.
    </div>
<div data-verify-line="subsidy" style="border-top: 1px dashed #999; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
      title="Demo only: USDA doesn't yet offer verification&#10;endpoints, so this is illustrative">
      <span data-verify-line="subsidy">verify:fsa.usda.gov/compliance/v</span> <span verifiable-text="end" data-for="subsidy"></span>
    </div>
  </div>
</div>

## The Problem: Urban Farmer Fraud

- **Active Engagement Fraud:** Claiming to be "Actively Engaged" in a farm (which triggers a higher subsidy limit) while actually living in a city and performing no labor.
- **Entity Splitting:** Creating 10 shell companies to bypass the $125,000 annual payment limit. Verification of the "Ultimate Beneficial Owner" hash stops this.
- **AGI Padding:** Editing a "Failed" AGI disclosure to read "Pass" to qualify for subsidies while earning over $900,000 in non-farm income.

## What Is Checked

Producer name, business TIN (redacted), program type (ARC, PLC, CRP), plan year, eligibility status, total payment limit, AGI (Adjusted Gross Income) compliance status, county office ID, date of approval.

**Document Types:**
- **Notice of Payment Eligibility:** Proving the farmer is "Actively Engaged."
- **Conservation Reserve Program (CRP) Contract:** Proving land is in a verified environmental program.
- **Subsidy Payment Receipt:** Formal proof of funds received from the government.

## What the Checker Sees

Shows the issuer domain (`fsa.usda.gov`, `nrcs.usda.gov`) and current compliance standing.

**Status Indications:**
- **Eligible** — Producer meets all statutory requirements for payment.
- **Ineligible** — AGI limit exceeded or "Active Engagement" rules failed.
- **Suspended** — Under investigation for fraud or data error.
- **Lapsed** — Re-certification required for current plan year.

## Who Holds It

The Farmer (Producer) benefits from verification.

**Operating Loans:** Proving to a local ag-bank (e.g., John Deere Financial or Rabobank) that their 2026 "ARC Payment" is verified and approved. This allows the farmer to use the expected government subsidy as collateral for a short-term loan to buy seeds and fuel.

**Land Leases:** Proving to a landowner that the tenant is eligible for government programs, ensuring the farm's financial stability.

## Who Checks It

**Ag-Lenders (Banks)**
**Collateral Vetting:** Verifying the "Payment Limit" listed on the producer's summary. If the paper says "$125,000" but the hash says "$50,000," the bank avoids an under-collateralized loan.

**Internal Revenue Service (IRS)**
**Tax Audit Reconciliation:** Ensuring that the "Government Income" reported on the farm's tax return matches the verified payments issued by the USDA.

**Sustainability Auditors**
**Conservation Verification:** Verifying that a farm is actually enrolled in the "Conservation Reserve Program" (CRP) before assigning a higher "Sustainability Rating" to their products.

## Who Issues It

**Issuer Types** (First Party)

**USDA Farm Service Agency (FSA).**
**Natural Resources Conservation Service (NRCS).**
**State Departments of Agriculture.**

## Authority Chain

**Pattern:** Sovereign

The RPA administers UK farm subsidy payments and eligibility certifications under the Agriculture Act 2020.

```
✓ rpa.defra.gov.uk/subsidy/verify — RPA farm subsidy and payment eligibility service
  ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Compared With USDA Portals (Farmers.gov)

| Feature | Live Verify | Farmers.gov Portal | Paper Eligibility Notice |
| :--- | :--- | :--- | :--- |
| **User Access** | **Open.** Any bank or landlord can verify. | **Restricted.** Requires secure USDA eAuthentication Level 2. | **Instant.** |
| **Trust Anchor** | **Domain-Bound.** Bound to the USDA. | **Gov-Bound.** | **Zero.** Easily forged. |
| **Integrity** | **Binds Content.** Protects the $ limit. | **Data-Only.** Doesn't protect the paper. | **Vulnerable.** |
| **Hardware** | **Ordinary smartphone.** Needs Live Verify on it (an app today). | **Technical.** Requires laptop/dedicated app. | **Visual.** |

**Where each fits:** Farmers.gov is where a producer manages their own USDA business, and its strict authentication is appropriate for that. The producer's bank, landlord or equipment dealer has no such access and sees only the eligibility notice the farmer brings in. Live Verify lets that third party confirm the notice is as the agency issued it, while the farmer goes on using the portal for everything else.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).

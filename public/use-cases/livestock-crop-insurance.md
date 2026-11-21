---
title: "Livestock and Crop Insurance Policies"
category: "Specialty Insurance"
volume: "Small"
retention: "Policy term + 7-10 years"
slug: "livestock-crop-insurance"
verificationMode: "clip"
tags: ["agriculture", "crop-insurance", "livestock-insurance", "rma", "usda", "risk-management", "rural-finance", "agribusiness"]
furtherDerivations: 1
---

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="ag-pol"></span>NAU COUNTRY INSURANCE
Multi-Peril Crop Insurance (MPCI)             Policy #: MPCI-99228877-26
═══════════════════════════════════════════════════════════════════

                        SUMMARY OF COVERAGE

Insured:       Miller Family Farms, Inc.
State/County:  Iowa / Story (FIPS 19169)

Asset Class                                                 Liability
───────────────────────────────────────────────────────────────────
Corn (Yellow) - 1,200 Acres                             $ 950,000.00
Swine (Breeding) - 500 Head                             $ 250,000.00
───────────────────────────────────────────────────────────────────
TOTAL POLICY LIABILITY:                               $ 1,200,000.00

Covered Perils:  Drought, Flood, Hail, Disease, Revenue Loss (85%)
Period:          March 01, 2026 to February 28, 2027

Underwritten in accordance with USDA Risk Management Agency (RMA).

<span data-verify-line="ag-pol">verify:naucountry.com/policy/v</span> <span verifiable-text="end" data-for="ag-pol"></span></pre>
</div>

## The Problem: Phantom Acre Fraud

- **Acreage Padding:** Claiming to have 1,200 insured acres on the paper summary shown to the bank, while only paying for 500 acres at the insurance company.
- **Status Faking:** Showing an old "Active" paper for a policy that was cancelled for non-payment mid-season.
- **Entity Fraud:** Using a shell company name to bypass federal subsidy limits while using a verified looking PDF to get a loan.

## What Is Checked

Insured name, FIPS county code, specific crop types/livestock categories, total acreage/head count, coverage level % (e.g., 85%), total policy liability, effective/expiration dates, underwriter ID, RMA plan code (e.g., RP - Revenue Protection).

**Document Types:**
- **Summary of Coverage:** The primary multi-million dollar asset proof.
- **Livestock Risk Protection (LRP) Certificate:** For price-floor protection.
- **Acreage Report:** (Linked hash) proving exactly what was planted.
- **Actual Production History (APH) Report:** Verified 5-year yield data.

## What the Checker Sees

Shows the issuer domain (`naucountry.com`, `fmh.com`, `rainhail.com`) and current policy status.

**Status Indications:**
- **In Force** — Premium paid; crops/herd are verified covered.
- **Adjusted** — Field report finalized; limits locked.
- **Claim Pending** — Notice of loss filed (e.g., for drought).
- **Lapsed/Cancelled** — Policy not current; rural bank collateral is unprotected.

## Who Holds It

The Farmer (Producer) benefits from verification.

**Operating Loans:** Proving to an ag-lender (e.g., Rabobank or Farm Credit) that the $1.2M in "Revenue Liability" is verified. This allows the farmer to use the insurance as collateral for high-value loans to buy fertilizer and feed.

**Landlord Assurance:** Proving to a major landowner that their share of the "Crop Share" lease is verified protected against natural disasters.

## Who Checks It

**Ag-Lenders (Banks)**
**Collateral Protection:** Banks require crop insurance to protect their loans against weather risk. Verification ensures the farmer hasn't "Edited" the paper summary to show 85% coverage when they only paid for 50%.

**USDA Risk Management Agency (RMA)**
**Compliance Audit:** Ensuring that private insurance companies (AIPs) are issuing policies that match the federal government's data standards.

**Grain Elevators**
**Forward Contracts:** Verifying that a farmer has the revenue protection insurance to back up a forward-delivery contract for 100,000 bushels.

## Who Issues It

**Issuer Types** (First Party)

**Approved Insurance Providers (AIPs):** (NAU Country, Rain & Hail, FMH).
**USDA Risk Management Agency.**
**Ag-Fintech Platforms:** (e.g., Indigo, Farmers Business Network - hosting the hashes).

## Authority Chain

**Pattern:** Regulated

NFU Mutual, a regulated agricultural insurer, is authorized by the FCA to issue verified livestock and crop insurance policies.

```
✓ livestock.nfu-mutual.co.uk/verify — Issues verified livestock and crop insurance policies
  ✓ fca.org.uk/register — Regulates UK general insurance firms
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Compared With USDA Portals

| Feature | Live Verify | USDA / RMA Public Search | Scanned PDF Summary |
| :--- | :--- | :--- | :--- |
| **User Access** | **Open.** Any bank or landlord can verify. | **Restricted.** Requires secure eAuth Level 2 logins. | **Instant.** |
| **Trust Anchor** | **Domain-Bound.** Bound to the Carrier. | **Gov-Bound.** | **Zero.** Easily forged. |
| **Detail** | **High.** Shows specific fields and head count. | **Low.** Often only shows aggregated county data. | **Full.** |
| **Speed** | **Instant.** Scan at the farm gate. | **Slow.** Requires multiple Gov-ID hoops. | **Instant.** |

**Where each fits:** USDA and RMA systems are the official record for federal crop insurance, and producers and approved insurance providers will continue to work through them. A local bank officer or landlord reviewing a loan or a lease usually has no access to those systems and is handed the coverage summary instead. Live Verify lets them confirm the carrier issued that summary, as a companion to the federal record.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).

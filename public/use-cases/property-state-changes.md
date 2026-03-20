---
title: "Property State Changes"
category: "Real Estate & Property"
volume: "Large"
retention: "Life of loan / policy / regulatory relationship"
slug: "property-state-changes"
verificationMode: "clip"
tags: ["property-state", "mortgage-monitoring", "owner-occupier", "tenanted", "vacant", "for-sale", "collateral-risk", "registry", "insurance", "occupancy"]
furtherDerivations: 3
---

## What is a Property State Change Record?

A property has more than one kind of state.

The title register tells you who has the legal interest and how the parcel sits in the cadastral chain. But lenders, insurers, local authorities, and counterparties often care about other changes too:

- is the property owner-occupied or tenanted?
- is it vacant?
- is it for sale?
- has it been subdivided or merged?
- was it damaged, burned down, condemned, or lost to erosion?

Those are not all title changes. But they are often economically or legally material.

A **Property State Change Record** is a verifiable status object that separates the main dimensions of property state so that relying parties do not misuse the deed layer for questions it was never designed to answer.

## The Four-Dimension Model

Property state should usually be modeled across four separate dimensions:

### 1. Title Status

- `CURRENT TITLE`
- `SUPERSEDED`
- `PENDING REGISTRATION`
- `DISPUTED`
- `VOIDED`

### 2. Occupancy / Use Status

- `OWNER-OCCUPIED`
- `TENANTED`
- `VACANT`
- `SECOND HOME`
- `SHORT-TERM LET`
- `MIXED USE`
- `UNKNOWN / NOT ATTESTED`

### 3. Market Status

- `NOT LISTED`
- `FOR SALE`
- `UNDER OFFER`
- `SALE AGREED`
- `TRANSFER PENDING`
- `WITHDRAWN FROM MARKET`

### 4. Parcel / Physical Status

- `UNCHANGED`
- `MERGED`
- `SUBDIVIDED`
- `BOUNDARY AMENDED`
- `DAMAGED`
- `DESTROYED BY FIRE`
- `DEMOLISHED`
- `CONDEMNED`
- `PARTIALLY LOST TO COASTAL EROSION`
- `NO LONGER SEPARATELY CADASTRAL`

This is much cleaner than trying to make one flat status field do four jobs at once.

## Example: Mortgage Servicer View

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #1f4b99; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <span verifiable-text="start" data-for="propertystate1"></span>
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;">PROPERTY STATE RECORD
═══════════════════════════════════════════════════════════════════

Property:          14 Cedar Grove, York
Title Ref:         YK-221133
Title Status:      CURRENT TITLE
Occupancy Status:  TENANTED
Market Status:     NOT LISTED
Parcel Status:     UNCHANGED
Effective From:    20 Mar 2026

<span data-verify-line="propertystate1">verify:landregistry.gov.uk/property-state/v</span></pre>
  <span verifiable-text="end" data-for="propertystate1"></span>
</div>

## Example: Sale and Transfer Pending

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #8a4b08; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <span verifiable-text="start" data-for="propertystate2"></span>
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;">PROPERTY STATE RECORD
═══════════════════════════════════════════════════════════════════

Property:          Flat 8, 29 North Street, Bristol
Title Ref:         BR-882199
Title Status:      CURRENT TITLE
Occupancy Status:  OWNER-OCCUPIED
Market Status:     FOR SALE
Parcel Status:     UNCHANGED
Effective From:    20 Mar 2026

<span data-verify-line="propertystate2">verify:landregistry.gov.uk/property-state/v</span></pre>
  <span verifiable-text="end" data-for="propertystate2"></span>
</div>

## Example: Physical Loss / Parcel Change

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #7a1f1f; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <span verifiable-text="start" data-for="propertystate3"></span>
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;">PROPERTY STATE RECORD
═══════════════════════════════════════════════════════════════════

Property:          Coast Cottage, West Bay
Title Ref:         WB-114920
Title Status:      CURRENT TITLE
Occupancy Status:  VACANT
Market Status:     NOT LISTED
Parcel Status:     PARTIALLY LOST TO COASTAL EROSION
Effective From:    20 Mar 2026

<span data-verify-line="propertystate3">verify:landregistry.gov.uk/property-state/v</span></pre>
  <span verifiable-text="end" data-for="propertystate3"></span>
</div>

## Data Verified

Property address or title reference, effective date, title status, occupancy/use status, market status, parcel/physical status, and optionally the source class for each status (registry filing, owner attestation, lender inspection, insurer report, local authority action).

**Document Types:**
- **Mortgage Servicer Property State Record**
- **Owner Occupancy Confirmation**
- **Rental / Letting Status Record**
- **Parcel Change Record**
- **Physical Damage / Destruction Status Record**

## Data Visible After Verification

Shows the issuer domain and the four status dimensions.

**Status Indications:**
- Title state
- Occupancy/use state
- Market state
- Parcel/physical state

The point is that these should not be collapsed into one overloaded status field.

## Second-Party Use

The **property owner** benefits from clarity.

**Correct treatment:** A homeowner should not be treated as having a title defect merely because the property is for sale, or as lacking ownership merely because the building burned down.

**Reduced over-disclosure:** Counterparties can ask for the specific state they need, rather than demanding the full deed or title pack.

## Third-Party Use

**Mortgage Lenders and Servicers**

**Collateral monitoring:** Lenders care about occupancy shifts, vacancy, sale status, major physical destruction, parcel restructuring, and title dispute. These are servicing and risk events even when legal ownership remains unchanged.

**Insurance Carriers**

**Risk classification:** Owner-occupied, tenanted, vacant, and short-term-let properties often fall into different underwriting classes.

**Local Authorities and Courts**

**Administrative treatment:** Condemnation, compulsory purchase, merger, boundary revision, or erosion may matter independently of title continuity.

**Utilities, Platforms, and Contractors**

**Authority and use checks:** The person requesting a service may need only proof of current ownership plus whether the property is owner-occupied or tenanted.

## Verification Architecture

**The "Wrong Layer" Problem**

- people use deeds to answer occupancy questions
- people use utility bills to answer ownership questions
- lenders use listing status as a proxy for title risk
- insurers use title documents to infer use class

That produces too much paper and the wrong answers.

The cleaner property model is:

- [Property Title Deeds](view.html?doc=property-deeds) for permanent chain-of-title and recorded instruments
- [Proof of Home Ownership](view.html?doc=proof-of-home-ownership) for short-lived private proof of current ownership
- this page for multidimensional state monitoring relevant to lenders, insurers, and other relying parties

## Competition vs. Current Practice

| Feature | Property State Record | Full Deed / Title Pack | Utility Bill / Council Tax Bill |
| :--- | :--- | :--- | :--- |
| **Answers occupancy question** | **Yes.** | **Poorly.** | **Sometimes.** |
| **Answers title question** | **Partly.** | **Yes.** | **No.** |
| **Answers market question** | **Yes.** | **No.** | **No.** |
| **Answers parcel/physical question** | **Yes.** | **Partly.** | **No.** |

**Practical conclusion:** the property-state record should be the monitoring layer. It avoids overloading deeds and avoids using weak proxies for occupancy or risk.

## Authority Chain

**Pattern:** Sovereign / Registry / Regulated reporting

```
✓ landregistry.gov.uk/property-state/v — Property-state verification service
  ✓ gov.uk/verifiers — UK government root namespace
```

In practice, some state dimensions may be sourced from linked regulated reporters rather than the registry alone. The important point is that the verification object separates the dimensions instead of collapsing them.

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Further Derivations

1. **Mortgage Covenant Breach Monitoring** — Narrower lender-facing subset focused on owner-occupier vs tenancy, vacancy, and sale activity.
2. **Insurance Occupancy Classification Records** — Occupancy and physical-risk subset for underwriting and claims.
3. **Commercial Property Control and Use Records** — Business-premises analogue of the same multidimensional state model.

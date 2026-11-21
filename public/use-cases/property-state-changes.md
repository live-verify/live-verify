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

A Property State Change Record is a verifiable status object that separates the main dimensions of property state so that relying parties do not misuse the deed layer for questions it was never designed to answer.

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
Title Status:      CURRENT TITLE           [source: land registry]
Occupancy Status:  TENANTED                [source: owner attestation]
Market Status:     NOT LISTED              [source: owner attestation]
Parcel Status:     UNCHANGED               [source: land registry]
Effective From:    20 Mar 2026

<span data-verify-line="propertystate1">verify:landregistry.gov.uk/property-state/v</span></pre>
  <span verifiable-text="end" data-for="propertystate1"></span>
</div>

## Example: Property Listed for Sale

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #8a4b08; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <span verifiable-text="start" data-for="propertystate2"></span>
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;">PROPERTY STATE RECORD
═══════════════════════════════════════════════════════════════════

Property:          Flat 8, 29 North Street, Bristol
Title Ref:         BR-882199
Title Status:      CURRENT TITLE           [source: land registry]
Occupancy Status:  OWNER-OCCUPIED          [source: owner attestation]
Market Status:     FOR SALE                [source: listing agent]
Parcel Status:     UNCHANGED               [source: land registry]
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
Title Status:      CURRENT TITLE           [source: land registry]
Occupancy Status:  VACANT                  [source: insurer report]
Market Status:     NOT LISTED              [source: owner attestation]
Parcel Status:     PARTIALLY LOST TO COASTAL EROSION [source: local authority]
Effective From:    20 Mar 2026

<span data-verify-line="propertystate3">verify:landregistry.gov.uk/property-state/v</span></pre>
  <span verifiable-text="end" data-for="propertystate3"></span>
</div>

## The Problem: Wrong Layer

- people use deeds to answer occupancy questions
- people use utility bills to answer ownership questions
- lenders use listing status as a proxy for title risk
- insurers use title documents to infer use class

That produces too much paper and the wrong answers.

The cleaner property model is:

- [Property Title Deeds](view.html?doc=property-deeds) for permanent chain-of-title and recorded instruments
- [Proof of Home Ownership](view.html?doc=proof-of-home-ownership) for short-lived private proof of current ownership
- this page for multidimensional state monitoring relevant to lenders, insurers, and other relying parties

## What Is Checked

Property address or title reference, effective date, title status, occupancy/use status, market status, parcel/physical status, and optionally the source class for each status (registry filing, owner attestation, lender inspection, insurer report, local authority action).

**Document Types:**
- **Mortgage Servicer Property State Record**
- **Owner Occupancy Confirmation**
- **Rental / Letting Status Record**
- **Parcel Change Record**
- **Physical Damage / Destruction Status Record**

## What the Checker Sees

Shows the issuer domain and the four status dimensions.

**Status Indications:**
- Title state
- Occupancy/use state
- Market state
- Parcel/physical state

The point is that these should not be collapsed into one overloaded status field.

## Who Holds It

The property owner benefits from clarity.

**Correct treatment:** A homeowner should not be treated as having a title defect merely because the property is for sale, or as lacking ownership merely because the building burned down.

**Reduced over-disclosure:** Counterparties can ask for the specific state they need, rather than demanding the full deed or title pack.

## Who Checks It

**Mortgage Lenders and Servicers**

**Collateral monitoring:** Lenders care about occupancy shifts, vacancy, sale status, major physical destruction, parcel restructuring, and title dispute. These are servicing and risk events even when legal ownership remains unchanged.

**Insurance Carriers**

**Risk classification:** Owner-occupied, tenanted, vacant, and short-term-let properties often fall into different underwriting classes.

**Local Authorities and Courts**

**Administrative treatment:** Condemnation, compulsory purchase, merger, boundary revision, or erosion may matter independently of title continuity.

**Utilities, Platforms, and Contractors**

**Authority and use checks:** The person requesting a service may need only proof of current ownership plus whether the property is owner-occupied or tenanted.

## Where Each Fits: Live Verify, Title Packs and Utility Bills

Today a lender, insurer or authority wanting to know a property's state usually asks for a full deed or title pack from the land registry, or for a utility or council tax bill as a proxy for who lives there. Those documents answer the questions they were designed for, and a state record would sit alongside them rather than replace them: the title pack remains the authority on ownership, and a state record answers the occupancy, market and physical questions that the title pack was never meant to cover.

| | Full deed or title pack | Utility or council tax bill | Live Verify on a property state record |
| :--- | :--- | :--- | :--- |
| **Who can check** | Anyone who can search the land registry, or who is handed an official copy. | Anyone handed the bill; it is usually taken on trust. | Anyone handed the record: a lender, insurer, local authority or contractor. |
| **What the checker gets** | The authoritative picture of title, and some physical detail through plans and boundaries. Little or nothing on occupancy or market status. | An indication that someone at the address receives bills. It says nothing on title or whether the property is for sale. | Confirmation that the issuer stands behind this record's title, occupancy, market and parcel statuses, as at its effective date, with each source shown. |
| **What the holder shares** | The full title, including charges and history the checker may not need. | Name, address and account details. | Only the state record they chose to hand over. |
| **Reach** | Wherever a land registry exists; each country has its own, with different access rules. | Anywhere bills are issued, but untrusted. | Global in principle: any registry, lender or authority, in any country, that publishes hashes on its own domain. |
| **Speed and cost** | Registry searches are usually quick, with a fee per copy in many countries. | Free and immediate. | A few seconds per check: one web lookup, with no fee to the standard. |
| **What it needs** | A registry the checker can reach. | Nothing. | The issuer to publish hashes, and Live Verify-aware software on the checker's device. No registry or lender does this yet. |
| **Best suited to** | Conveyancing, lending against title, and any question about legal ownership or charges. | Low-stakes proof of address. | Ongoing monitoring of occupancy, sale status and physical change, where the deed is the wrong tool. |

**Where each fits:** the title pack stays the right document for ownership and charges, and should keep that job. A property state record is a monitoring layer beside it, for lenders, insurers and authorities who need to know whether a property is tenanted, for sale or damaged, and who would otherwise lean on title documents or bills to guess. Live Verify lets that record be checked quickly and cheaply by whoever is handed it, wherever the checker has software that honours it.

## Authority Chain

**Pattern:** Sovereign / Registry / Regulated reporting

```
✓ landregistry.gov.uk/property-state/v — Title and parcel status (authoritative)
  ✓ gov.uk/verifiers — UK government root namespace

✓ landregistry.gov.uk/property-state/v — Occupancy and market status (aggregated)
  Sources: owner attestation, lender inspection, listing agent, insurer report, local authority
```

Each dimension carries its own source class. The registry may aggregate and publish the composite record, but it is not the original authority for every dimension. Title and parcel status come from the registry itself. Occupancy and market status come from attesting parties whose reports the registry collates.

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Further Derivations

1. **Mortgage Covenant Breach Monitoring** — Narrower lender-facing subset focused on owner-occupier vs tenancy, vacancy, and sale activity.
2. **Insurance Occupancy Classification Records** — Occupancy and physical-risk subset for underwriting and claims.
3. **Commercial Property Control and Use Records** — Business-premises analogue of the same multidimensional state model.

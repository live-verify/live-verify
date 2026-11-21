---
title: "Tenant References from Landlords"
category: "Real Estate & Property"
volume: "Very Large"
retention: "3-7 years"
slug: "tenant-references"
verificationMode: "clip"
tags: ["tenant-reference", "landlord", "rental-history", "letting-agent", "background-check", "housing", "tenancy", "rental-fraud"]
furtherDerivations: 2
---

## What is a Tenant Reference?

A tenant reference is a statement from a previous landlord or letting agent confirming that a person rented a property, paid rent on time, and left in good standing. It is the housing equivalent of an employment reference.

Fraud is rampant. Prospective tenants fabricate references from fictional landlords, use friends' phone numbers as "landlord contacts," or edit PDFs to hide eviction history. Landlords accepting these at face value lose thousands in unpaid rent and property damage. Live Verify binds the tenant name, property address, tenancy dates, and departure status to the landlord's or letting agent's domain.

**Why you should care — from both sides:**

- **Landlords lose real money.** A tenant with fabricated references who stops paying rent can cost the landlord £5,000–£15,000 in lost rent, legal fees, and property damage before eviction completes — a process that takes 6–12 months in England. In the US, the timeline and costs are comparable or worse depending on the state.
- **Good tenants benefit too.** In competitive rental markets, a verifiable reference from a recognised letting agent's domain is a genuine advantage. It separates applicants with real track records from those relying on unverifiable PDFs. The tenant who paid rent on time for three years deserves a credential that proves it.
- **The reference is only as trustworthy as the source.** Current practice asks the new landlord to call a phone number *provided by the applicant*. The applicant's friend confirms everything. A domain-bound hash removes the applicant from the verification loop — the check goes to the letting agent's actual domain, not to whoever answers a mobile number.

<div style="max-width: 550px; margin: 24px auto; font-family: sans-serif; border: 1px solid #ccc; background: #fff; padding: 20px; position: relative;">
  <div style="font-size: 0.85em; color: #555; border-bottom: 1px solid #ddd; padding-bottom: 10px; margin-bottom: 15px;">
    <strong>From:</strong> sarah.jones@gmail.com<br>
    <strong>To:</strong> lettings@oakwood-properties.co.uk<br>
    <strong>Subject:</strong> Tenancy application — 14 Elm Street
  </div>
  <div style="font-size: 0.95em; color: #333; margin-bottom: 15px;">
    Dear Oakwood Properties,<br><br>
    Here is my reference from my current landlord:
  </div>
  <div style="font-family: 'Courier New', monospace; background: #f9f9f9; padding: 15px; border: 1px solid #999; font-size: 1em; color: #000; line-height: 1.6;">
    <span verifiable-text="start" data-for="ref"></span>Riverside Lettings Ltd<br>
    Sarah A. Jones<br>
    Flat 3, 27 Canal Road, Bristol BS1 5AH<br>
    September 2022 &nbsp;&ndash;&nbsp; Present<br>
    Rent: &pound;1,150 pcm &nbsp;&ndash;&nbsp; No arrears<br>
    Condition: Good<br>
    Would let to again: Yes<span verifiable-text="end" data-for="ref"></span><br>
    <span data-verify-line="ref">verify:riverside-lettings.co.uk/tenants</span>
  </div>
  <div style="font-size: 0.95em; color: #333; margin-top: 15px;">
    Happy to provide anything else you need.<br><br>
    Best,<br>
    Sarah
  </div>
</div>

<div style="max-width: 550px; margin: 24px auto; font-family: 'Courier New', monospace; background: #f9f9f9; padding: 15px; border: 1px solid #999; font-size: 1em; color: #000; line-height: 1.6; position: relative;">
  Foxtons Property Management<br>
  Sarah A. Jones<br>
  Studio 12, Harbour View, London SE8 3BN<br>
  January 2019 &ndash; August 2022<br>
  Rent: &pound;950 pcm &ndash; No arrears<br>
  Deposit returned in full<br>
  <span data-verify-line="bare23">verify:foxtons.co.uk/references</span>
</div>

## The Problem: Phantom Landlords

A landlord or letting agent deciding on an applicant relies on a reference from the previous landlord, usually reached through contact details the applicant supplied. If the reference is invented or edited, the cost arrives later as unpaid rent, property damage and a slow eviction.

- **Invented landlords:** The applicant provides a friend's phone number as their "previous landlord." The friend confirms everything.
- **Self-referencing:** The applicant owns a second property and writes their own reference from a fake letting agency.
- **Edited PDFs:** A genuine reference with "rent arrears" changed to "no arrears" or an eviction removed.
- **Date stretching:** A 6-month tenancy extended to 3 years on paper.

Live Verify addresses these by resolving the hash against the letting agent's own domain rather than a phone number, PDF or email address supplied by the applicant.

## What Is Checked

Tenant full name, property address, tenancy start date, tenancy end date (or "Present"), monthly rent amount, arrears status, property condition at departure, deposit return status, "would let to again" recommendation, letting agent reference ID.

**Document Types:**
- **Landlord Reference Letter:** Free-form or structured statement from the property owner.
- **Letting Agent Reference:** Formal reference from a licensed letting agent or property manager.
- **Tenancy Confirmation:** Minimal proof of tenancy dates and address only (no behavioural assessment).
- **Deposit Protection Certificate:** (Linked hash) confirming deposit was protected in a government scheme.

## What the Checker Sees

Shows the issuer domain (`riverside-lettings.co.uk`, `foxtons.co.uk`, `openrent.com`) and current tenancy standing.

**Status Indications:**
- **Verified** — Record matches the landlord's or agent's file.
- **Revoked** — Reference withdrawn (e.g., discovery of undisclosed subletting or property damage after departure).
- **Superseded** — Replaced by a corrected version (e.g., updated end date after early termination).
- **Dispute** — Tenant or landlord has flagged the reference as contested.

## Who Holds It

The Tenant (Applicant) benefits from verification.

**Faster Applications:** Proving rental history instantly to a new landlord or letting agent. Instead of waiting days for a phone call between agents, the prospective landlord scans the reference and gets cryptographic confirmation in seconds.

**Competing for Properties:** In hot rental markets (London, New York, Sydney), landlords choose between dozens of applicants. A verifiable reference from a known letting agent's domain is a strong differentiator over a PDF that could be fabricated.

**Mortgage Applications:** Some lenders accept consistent rent payment history as evidence of affordability. A verified tenancy reference from a letting agent's domain carries more weight than a self-declared rental history.

## Who Checks It

**Letting Agents / Property Managers**
**Fraud Prevention:** "Phantom landlord" scams are common — someone claims to have rented from a landlord who doesn't exist, or provides a friend's mobile number. Live Verify connects the new agent directly to the previous agent's domain.

**Referencing Services (Homelet / Goodlord / OpenRent)**
**Automation:** Tenant referencing platforms can verify rental history hashes automatically, reducing manual calls and speeding up the referencing pipeline from days to minutes.

**Local Authorities / Housing Associations**
**Social Housing Allocation:** Councils verifying an applicant's prior tenancy history to assess housing need and confirm they haven't been evicted for antisocial behaviour.

**Guarantors**
**Risk Assessment:** A parent or employer acting as guarantor can verify the tenant's rental track record before signing a guarantee worth thousands.

## Who Issues It

**Issuer Types** (First Party)

**Letting Agents:** (Foxtons, Savills, Countrywide, local independents).
**Property Management Platforms:** (OpenRent, Goodlord, Arthur Online).
**Individual Landlords:** Using a personal domain or a platform that provides verification hosting.

**Privacy Salt:** Important. Tenancy data is sensitive (address, rent amount, departure reasons). The hash must be salted to prevent enumeration — you shouldn't be able to guess tenant names against a landlord's endpoint to discover who lives where.

## Authority Chain

**Pattern:** Personal

```
✓ landlord.example.com/refs — Provides tenant references from personal experience as landlord
```

No regulatory chain. Trust rests on the individual's domain.

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## International Equivalents

| Country | Issuer | Notes |
|---------|--------|-------|
| **UK** | Letting agents, individual landlords | Tenant Fees Act 2019 regulates referencing costs; deposit protection schemes (DPS, MyDeposits, TDS) |
| **USA** | Property managers, landlord directly | Fair Housing Act limits what can be asked; some states ban credit checks for housing |
| **Canada** | Provincial landlord-tenant boards | Landlord references commonly required in Toronto/Vancouver markets |
| **Australia** | Real estate agents | National Tenancy Database (NTD) and TICA track rental history centrally |
| **Germany** | Previous landlord (Mietschuldenfreiheitsbescheinigung) | Formal "no rent debt" certificate is standard practice |
| **France** | Previous landlord or agent | Dossier de location requires 3 months of rent receipts + prior landlord reference |
| **Ireland** | Letting agents, landlords | RTB (Residential Tenancies Board) registration provides some verification |
| **New Zealand** | Property managers | Tenancy Tribunal records are public but references are informal |

## Where Each Fits: Live Verify and Referencing Services

In the UK, letting agents commonly use referencing services such as Homelet and Goodlord, which contact the previous landlord and combine that reference with credit, income and identity checks; other countries have their own practices, from central tenancy databases in Australia to the formal no-rent-debt certificate in Germany. Many landlords simply phone the previous landlord. A referencing service and a verifiable reference answer different questions: the service assesses the applicant as a whole, while Live Verify confirms where a particular reference came from. They work side by side.

| | Referencing service (e.g. Homelet, Goodlord) | Phone call to the previous landlord | Live Verify on the reference |
| :--- | :--- | :--- | :--- |
| **Who can check** | Agents and landlords who commission the service. | Anyone with the number, usually supplied by the applicant. | Anyone handed the reference: a new landlord, a letting agent, a referencing service. |
| **What the checker gets** | A combined assessment, including the previous landlord's response, credit and affordability checks. | Whatever the person answering says; it may be a friend of the applicant. | Confirmation that the issuing agent or landlord's domain stands behind this exact reference, including dates, rent and arrears, as at its date. The checker still judges whether that domain is a genuine agent; a fraudster can set up a domain too. |
| **What the tenant shares** | Consent for credit, income and reference checks. | The previous landlord's contact details. | Only the reference they chose to hand over. |
| **Reach** | Agents who use that service, mainly in the UK. | Wherever the landlord can be reached; awkward across borders. | Global in principle: any letting agent, platform or landlord, in any country, that publishes hashes on its own domain. |
| **Speed and cost** | Often a few days, waiting for the previous landlord to reply; a fee per reference, which in England the agent or landlord must bear. | Free, but can take days of phone tag. | A few seconds per check: one web lookup, with no fee to the standard. |
| **What it needs** | A subscription or per-reference payment. | A reachable, honest referee. | The issuer to publish hashes, and Live Verify-aware software on the checker's device. No letting agent or platform does this yet. |
| **Best suited to** | The full applicant assessment. | Informal questions a form does not ask. | Confirming that a landlord reference genuinely came from the agent it names, including across borders. |

**Where each fits:** referencing services combine the landlord reference with the wider assessment of an applicant, and remain the right choice for that fuller picture; a phone call is still useful for the informal questions a form does not ask. Their weak point is that the previous landlord's contact details usually come from the applicant. Live Verify fills that gap by resolving the reference against the issuing agent's own domain, quickly and cheaply, wherever the checker has software that honours it: the referencing service does the assessment, and the check confirms where the reference came from.

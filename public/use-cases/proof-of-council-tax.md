---
title: "Proof of Council Tax (Address & Payment Standing)"
category: "Identity & Authority Verification"
volume: "Very Large"
retention: "Tax year + 6 years"
slug: "proof-of-council-tax"
verificationMode: "clip"
tags: ["council-tax", "proof-of-address", "local-authority", "mandate", "kyc", "address-verification", "benefits", "electoral-roll", "single-person-discount", "payment-standing"]
furtherDerivations: 2
---

## What is Proof of Council Tax?

Council tax bills are the gold standard proof of address in the UK — more trusted than utility bills because they come from a local authority, not a commercial company. Banks, solicitors, employers, and government agencies all accept them. And yet the "verification" is identical to every other proof-of-address check: a human eyeballing a PDF.

Council tax is uniquely valuable because it proves three things simultaneously: **address**, **name**, and **local authority residency**. This matters for voter registration, school catchment, social housing allocation, and benefits eligibility. It also proves payment standing — whether the person is current, in arrears, or exempt.

The mandate model: local authorities are required to let council tax payers generate time-limited, hash-based confirmations of their council tax status. The council bears the hosting cost as a core local government digital service. Given that most councils already have online council tax portals, the marginal cost is minimal.

<div style="max-width: 550px; margin: 24px auto; font-family: sans-serif; border: 1px solid #ccc; background: #fff; padding: 20px; position: relative;">
  <div style="font-size: 0.85em; color: #555; border-bottom: 1px solid #ddd; padding-bottom: 10px; margin-bottom: 15px;">
    <strong>From:</strong> council.tax@camden.gov.uk<br>
    <strong>To:</strong> d.okonkwo@gmail.com<br>
    <strong>Subject:</strong> Your council tax confirmation — 2025/26
  </div>
  <div style="font-size: 0.95em; color: #333; margin-bottom: 15px;">
    Dear Mr Okonkwo,<br><br>
    Here is your council tax confirmation as requested:
  </div>
  <div style="font-family: 'Courier New', monospace; background: #f9f9f9; padding: 15px; border: 1px solid #999; font-size: 1em; color: #000; line-height: 1.6;">
    <span verifiable-text="start" data-for="ct"></span>London Borough of Camden<br>
    Daniel A. Okonkwo<br>
    Flat 8, 19 Kentish Town Road, London NW1 8NH<br>
    Band D — Account current<br>
    Tax year: 2025/26<span verifiable-text="end" data-for="ct"></span><br>
    <span data-verify-line="ct">verify:camden.gov.uk/council-tax</span>
  </div>
</div>

<div style="max-width: 550px; margin: 24px auto; font-family: 'Courier New', monospace; background: #f9f9f9; padding: 15px; border: 1px solid #999; font-size: 1em; color: #000; line-height: 1.6; position: relative;">
  Birmingham City Council<br>
  Rebecca L. Hussain<br>
  12 Moseley Road, Birmingham B12 9AH<br>
  Band C — Single person discount applied<br>
  Tax year: 2025/26<br>
  <span data-verify-line="bare27">verify:birmingham.gov.uk/council-tax</span>
</div>

## Data Verified

Local authority name, account holder full name, full property address, council tax band, payment status (current / arrears / exempt), applicable discounts or exemptions, tax year.

**Document Types:**
- **Annual Council Tax Bill:** The standard annual bill issued each April.
- **Council Tax Confirmation Letter:** On-demand letter confirming address and payment status.
- **Single Person Discount Confirmation:** Confirming that single person discount is applied (implies sole adult occupancy).
- **Council Tax Exemption Certificate:** For exempt properties (students, diplomatic, etc.).

**Privacy Salt:** Required. Name + address + council is guessable. Time-limited salt (e.g., 30 days) generated through the council's online portal.

## Data Visible After Verification

Shows the council domain (`camden.gov.uk`, `birmingham.gov.uk`) and account status.

**Status Indications:**
- **Current** — Account up to date, no arrears.
- **In Arrears** — Payments overdue. May include arrears band (e.g., "1-3 months").
- **Exempt** — Property exempt from council tax (student property, diplomatic, etc.).
- **Discount Applied** — Single person discount, disability reduction, or other discount in effect.
- **Summons Issued** — Liability order proceedings have begun (serious arrears).
- **Closed** — Account closed (person moved away).

## Second-Party Use

The **Council Tax Payer** benefits from verification.

**Premium Proof of Address:** Council tax bills carry more weight than utility bills for KYC purposes because the issuer is a government body. A verifiable council tax confirmation from a `.gov.uk` domain is the strongest proof of address available outside of a passport.

**Mortgage Applications:** Lenders require proof of address. A council tax confirmation verifiable against the council's domain accelerates the process and removes doubt about document authenticity.

**Benefits Applications:** Many benefits require proof of address and local authority area. A single verifiable council tax confirmation satisfies both requirements simultaneously.

**School Admissions:** Proving you live within a school's catchment area is critical — and contentious. Families have been prosecuted for using false addresses to secure school places. A verifiable council tax confirmation from the council's domain is definitive proof of the address the family is registered at.

## Third-Party Use

**Banks & Financial Institutions**
**KYC Address Verification:** Council tax confirmations from `.gov.uk` domains would be the highest-trust address verification available. Banks could set policy: "council tax confirmation from issuing authority = no further address verification required."

**Solicitors & Conveyancers**
**Property Transactions:** Verifying the seller lives at the property being sold. Council tax fraud in property transactions is a real vector for identity theft and property fraud (selling someone else's house).

**Schools & Local Education Authorities**
**Catchment Area Verification:** Cross-referencing school applications against verifiable council tax records. Eliminates the "borrow grandma's address" fraud that plagues oversubscribed schools.

**DWP & HMRC**
**Benefits & Tax Administration:** Verifying claimant addresses for Universal Credit, Housing Benefit, Pension Credit, and tax assessments. Currently relies on data sharing agreements between councils and central government — which are slow and incomplete. Hash-based verification provides a real-time alternative.

**Electoral Registration Officers**
**Voter Registration Cross-Check:** Verifying that people registering to vote actually live at the claimed address. The council already holds both datasets but they're managed by different teams.

**Landlords & Letting Agents**
**Tenant Address History:** When a prospective tenant claims to have lived at a previous address, the council tax record for that period is definitive proof. A verifiable confirmation covering a specific tax year is stronger than any utility bill.

## The Council Tax Fraud Problem

- **PDF forgery:** Council tax bill templates vary by council but are all plain text layouts easily replicated in any document editor.
- **Address fraud for school places:** Families using relatives' or friends' addresses to gain admission to oversubscribed schools. This is prosecuted but hard to detect when the proof is a PDF.
- **Benefits fraud:** Claiming to live alone (single person discount) while a partner is resident. Claiming to live in a different local authority area for benefits purposes.
- **Identity fraud:** Using a forged council tax bill as foundational ID to open bank accounts, obtain credit, or register for services.
- **Property fraud:** Forging council tax bills to impersonate the owner/occupier of a property as part of a property theft scheme.

Live Verify stops most of these because the hash resolves against the council's `.gov.uk` domain. A forged bill won't match. A claim of single person discount can be verified against what the council actually has on record. An address used for school admission can be cross-checked in real time.

## Verification Architecture

**Issuer Types** (First Party)

**Local Authorities (England):** 309 billing authorities — metropolitan boroughs, London boroughs, unitary authorities, district councils.
**Local Authorities (Scotland):** 32 councils administering Council Tax.
**Local Authorities (Wales):** 22 principal councils.

**Mandate Justification:** Councils are public bodies funded by the tax they're issuing confirmations for. They already maintain online portals for council tax management. Adding a hash-based verification endpoint is a marginal cost on existing infrastructure. Many councils already participate in the "Tell Us Once" and "Verify" digital identity programmes — this extends that principle.

**Implementation Path:** The Local Government Association (LGA) or DLUHC could provide a shared platform for smaller councils, similar to how GOV.UK Notify provides shared notification infrastructure. Larger councils (Camden, Birmingham, Manchester) could run their own endpoints.

## Authority Chain

**Pattern:** Institutional (Government)

```
✓ camden.gov.uk/council-tax — London Borough of Camden confirming council tax status
✓ birmingham.gov.uk/council-tax — Birmingham City Council confirming council tax status
✓ edinburgh.gov.uk/council-tax — City of Edinburgh Council confirming council tax status
```

Trust derives from the `.gov.uk` domain. Council tax is a government function; the council's domain is the authoritative source.

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## International Equivalents

| Country | Equivalent Tax/Charge | Notes |
|---------|----------------------|-------|
| **UK** | Council Tax | 363 billing authorities across England, Scotland, Wales |
| **USA** | Property Tax | County-level; tax bills widely used as proof of address/ownership |
| **Canada** | Municipal Property Tax | City/municipality-level; accepted for address verification |
| **France** | Taxe d'habitation / Taxe foncière | Being phased out for primary residences; still relevant for second homes |
| **Germany** | Grundsteuer (property tax) | Municipal-level; Meldebescheinigung is primary address proof but property tax is supplementary |
| **Australia** | Council Rates | Local council rates notices used for address verification |
| **Ireland** | Local Property Tax (LPT) | Administered by Revenue; relatively new (2013) |
| **Netherlands** | OZB (Onroerendezaakbelasting) | Municipal property tax; combined with GBA (population register) for address proof |

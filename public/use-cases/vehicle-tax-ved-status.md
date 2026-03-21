---
title: "Vehicle Road Tax / Registration Status"
category: "Identity & Authority Verification"
volume: "Very Large"
retention: "Until expiry"
slug: "vehicle-tax-ved-status"
verificationMode: "clip"
tags: ["vehicle-tax", "ved", "dvla", "road-tax", "sorn", "used-car", "fleet-management", "listing-platform", "kfz-steuer", "carte-grise", "dmv", "rego"]
furtherDerivations: 2
---

## The Problem

Almost every jurisdiction requires vehicles to be taxed or registered before they can legally use public roads. The specific mechanism varies — an annual excise duty, a registration renewal, a circulation tax — but the core problem is universal: "I checked and it was current" is not a verifiable claim. It is a screenshot or a verbal assurance, both trivially fabricated.

When a seller lists a used car on a marketplace, buyers want to know the vehicle's road-tax or registration status is current. A lapsed registration may mean the vehicle cannot legally be driven, complicating test drives and collection. Today, the buyer checks the relevant government portal independently. A verifiable claim from the issuing authority lets the seller embed proof directly in the listing, and lets the platform itself confirm the status without scraping government sites.

Fleet managers face a related problem at scale. An employer providing vehicles to staff needs to confirm tax or registration status across hundreds or thousands of vehicles. A verifiable claim per vehicle, refreshed at renewal, replaces manual checks or bulk API integrations.

### Jurisdictions

| Jurisdiction | Name | Issuing Authority | Notes |
| :--- | :--- | :--- | :--- |
| **UK** | Vehicle Excise Duty (VED) | DVLA via GOV.UK | Includes SORN (Statutory Off Road Notification) status |
| **Germany** | Kfz-Steuer | Zulassungsstelle (local registration office) | Tied to vehicle registration certificate |
| **France** | Certificat d'immatriculation (carte grise) | ANTS / Prefectures | Registration document doubles as tax proof |
| **United States** | Annual registration renewal | State DMV / equivalent | Not a "road tax" per se, but serves the same gating function |
| **Japan** | Automobile tax (自動車税) | Prefectural tax office | Required for biennial shaken inspection |
| **Australia** | Vehicle registration (rego) | State/territory transport authorities | Includes CTP insurance in most states |

The examples below use UK VED, but the verification pattern applies to any jurisdiction where the authority publishes vehicle tax or registration status digitally.

## Vehicle Tax Status — Taxed (UK Example)

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="ved-taxed"></span>VEHICLE TAX STATUS
Registration:  AB12 CDE
Status:        TAXED
Tax Due:       01 Oct 2026
Tax Class:     Private Light Goods (PLG)
SORN:          NO
<span data-verify-line="ved-taxed">verify:gov.uk/vehicle-tax/v</span> <span verifiable-text="end" data-for="ved-taxed"></span></pre>
</div>

## Vehicle Tax Status — SORN (UK Example)

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="ved-sorn"></span>VEHICLE TAX STATUS
Registration:  AB12 CDE
Status:        SORN
Tax Due:       —
Tax Class:     Private Light Goods (PLG)
SORN:          YES (since 15 Jan 2026)
<span data-verify-line="ved-sorn">verify:gov.uk/vehicle-tax/v</span> <span verifiable-text="end" data-for="ved-sorn"></span></pre>
</div>

## Data Verified

Vehicle registration, road-tax or registration status (current, expired, or declared off-road), expiry/renewal date, and tax class where applicable. Vehicle condition, mileage, inspection history, finance status, and ownership chain are excluded — this is strictly about whether the vehicle is taxed or registered for road use.

## Data Visible After Verification

Shows the issuer domain (e.g. `gov.uk` for UK) and confirms whether the road-tax or registration status claim is current.

**Status Indications (UK VED example):**
- **TAXED** — The vehicle has valid VED and can legally be driven on the road (subject to MOT and insurance).
- **SORN** — The vehicle is declared off-road. It cannot legally be driven on public roads.

Other jurisdictions have equivalent statuses: registered/unregistered, current/expired, etc.

## Second-Party Use

The **Seller** clips the vehicle tax or registration status from the relevant government portal and includes it in a vehicle listing. This is particularly useful on platforms where buyers filter for road-legal vehicles. A verified current-status saves the buyer a separate lookup and confirms the seller is not misrepresenting a lapsed or off-road vehicle as road-ready.

**Note on `allowedDomains`:** Vehicle tax/registration status is a government-public fact already accessible by registration number. Restricting which domains can display it adds little trust value — the fact is the same wherever it appears. For public-state artifacts, freshness and source binding matter more than publisher authorization. The `allowedDomains` field is omitted here.

## Third-Party Use

**Private Buyers**
A buyer considering a vehicle listed for private sale can confirm tax/registration status before arranging a viewing. An unregistered or off-road-declared vehicle may require trailering or temporary registration before it can be driven — knowing this upfront avoids wasted journeys.

**Fleet Managers**
Companies operating vehicle fleets need to track tax/registration status across all vehicles. A verifiable claim per vehicle, issued by the relevant authority at each renewal, provides a machine-readable compliance record without relying on government API access or manual checks.

**Employer-Provided Vehicles**
Where an employer provides a vehicle as a benefit, the employer may need to confirm the vehicle is taxed or registered as a condition of their duty of care. A verifiable status claim gives HR or fleet operations a lightweight proof without accessing the employee's government account.

**Insurers**
A vehicle declared off-road or with lapsed registration being driven on public roads is a red flag. Insurers settling claims may use tax/registration status as one signal in fraud detection.

## Verification Architecture

**Issuer Type** (First Party)

Each jurisdiction's vehicle registration or taxation authority is the sole issuer for its vehicles. In the UK, **DVLA** publishes VED status via GOV.UK; the addition is publishing a verifiable hash alongside the existing lookup. Other authorities (state DMVs, Zulassungsstellen, prefectural offices, etc.) would follow the same pattern for their own registrations.

**Privacy Salt:** Required. Registration numbers are semi-public (visible on the vehicle), but linking them to tax status in a bulk-enumerable way would enable nuisance queries. The hash must be salted so that an adversary cannot enumerate registrations to build a database of lapsed or off-road vehicles.

## Authority Chain

**Pattern:** Government Direct

Each jurisdiction's vehicle authority is the sole issuer. UK example:

```
✓ gov.uk/vehicle-tax/verify — Issues verified VED status
  ✓ gov.uk/dvla — Driver and Vehicle Licensing Agency
    ✓ gov.uk/verifiers — UK government root namespace
```

Other jurisdictions would follow an equivalent chain rooted in their own government domain (e.g. `service-public.fr`, `dmv.ca.gov`, `service.bund.de`).

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Competition vs. Government Portal Lookup

| Feature | Live Verify | Government Portal Lookup | Seller's Word |
| :--- | :--- | :--- | :--- |
| **Speed** | **Seconds.** Hash check against issuing authority. | **Minutes.** Manual entry per vehicle. | **Instant.** |
| **Trust Anchor** | **Domain-Bound.** Tied to government domain. | **Direct.** Same source, but not portable. | **Zero.** No backing. |
| **Embeddable** | **Yes.** Clip into listings, emails, fleet dashboards. | **No.** Result stays on government site. | **No.** Just a claim. |
| **Bulk Use** | **Scalable.** One hash per vehicle, verifiable programmatically. | **Manual.** One lookup at a time. | **N/A.** |
| **Cost to Buyer** | **Free.** Verification is a hash check. | **Free.** But requires manual effort. | **Free.** |
| **Integrity** | **Cryptographic.** Binds status to government domain. | **Ephemeral.** Screenshot can be fabricated. | **Vulnerable.** Easily fabricated. |

## Further Derivations

See [Vehicle Lien Status](vehicle-lien-status.md) for finance-related verification on the same vehicle. VED status and lien status are independent claims that a seller may bundle when listing a vehicle for sale.

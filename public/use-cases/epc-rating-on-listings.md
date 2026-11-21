---
title: "Energy Performance Rating on Listings"
category: "Real Estate & Property"
volume: "Very Large"
retention: "Certificate validity period (10 years)"
slug: "epc-rating-on-listings"
verificationMode: "clip"
tags: ["property", "energy", "epc", "real-estate", "listings", "allowed-domains", "third-party-site", "rightmove", "zoopla"]
furtherDerivations: 1
---

## The Problem

Many jurisdictions now require an energy performance rating to be disclosed when a property is marketed for sale or rent. The EU's Energy Performance of Buildings Directive (EPBD) mandates certificates across all member states. The UK's EPC scheme covers England and Wales. Australia's NatHERS provides a national rating framework. In the US, voluntary schemes like HERS and ENERGY STAR certifications are increasingly referenced in listings. The trend is global — and in every case, the rating displayed on a listing portal is self-asserted by the agent or seller, with no link back to the issuing authority.

The UK's EPC register illustrates the problem clearly. Estate agents are legally required to display a property's Energy Performance Certificate (EPC) rating on marketing materials, including online listings. In practice, the agent types a letter grade into Rightmove, Zoopla, or OnTheMarket. That letter is self-asserted. Nobody verifies it against the EPC register at the point of listing, and nobody checks whether the certificate is still valid.

EPCs last ten years. A property listed with "EPC: C" may have had that certificate expire, or may have been re-assessed at a lower rating after building work. The listing platforms have no mechanism to detect this. The EPC register is publicly searchable, but a consumer browsing Rightmove is not going to leave the listing page to look up the certificate on a separate government site.

The same pattern applies everywhere a rating exists: an authoritative register holds the data, but the listing platform displays an unverified copy. What is missing is a way to issue that data as a verifiable claim that travels to the listing page — on the agent's own site and on every portal the property appears on — and that the consumer can verify in place.

### Jurisdictional Landscape

| Jurisdiction | Scheme | Authority / Framework |
| :--- | :--- | :--- |
| **UK** | EPC (Energy Performance Certificate) | EPC Register (gov.uk) |
| **EU** | Energy Performance Certificates (varies by member state) | Required under EPBD (Energy Performance of Buildings Directive) |
| **US** | No mandatory equivalent; HERS (Home Energy Rating System) ratings, ENERGY STAR certifications | RESNET (HERS), EPA (ENERGY STAR) |
| **Australia** | NatHERS (Nationwide House Energy Rating Scheme) | Varies by state; NatHERS administered federally |

The examples below use the UK's EPC register as the primary illustration, but the verification architecture applies identically to any jurisdiction where an authoritative register exists.

## Example: EPC Rating on a Property Listing

The EPC register supplies a text claim that the estate agent and property portals can embed in their listing pages. The inline styling is ignored by clip mode — only the text content matters for hashing.

<div style="max-width: 480px; margin: 24px auto; background: #fff; border: 2px solid #2e7d32; border-radius: 8px; padding: 24px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); font-family: 'Segoe UI', Arial, sans-serif;">
  <div style="display: flex; align-items: center; margin-bottom: 16px;">
    <div style="width: 44px; height: 44px; background: #2e7d32; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 1.4em; color: #fff; margin-right: 12px;">C</div>
    <div style="font-size: 0.75em; color: #2e7d32; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">Energy Performance Certificate</div>
  </div>
  <span verifiable-text="start" data-for="epc1"></span>
  <div style="color: #333; font-size: 0.95em; line-height: 1.7;">
    <span style="font-weight: 600;">14 Cedar Grove, York</span><br>
    has an Energy Performance Certificate<br>
    Rating: <span style="color: #2e7d32; font-weight: 600;">C</span> (score 72) valid until Nov 2033 on
  </div>
  <div style="margin-top: 12px; padding-top: 10px; border-top: 1px solid #ccc; font-family: 'Courier New', monospace; font-size: 0.78em; color: #2e7d32;">
    <span data-verify-line="epc1">verify:epcregister.com/ratings/v</span>
  </div>
  <span verifiable-text="end" data-for="epc1"></span>
</div>

The text that clip mode sees and hashes is simply:

```
14 Cedar Grove, York
has an Energy Performance Certificate
Rating: C (score 72) valid until Nov 2033 on
verify:epcregister.com/ratings/v
```

This same text appears identically on the estate agent's own site, on Rightmove, on Zoopla, and on OnTheMarket. The hash is the same everywhere because the text is the same everywhere.

## The allowedDomains Pattern: Multiple Listing Platforms

The key difference from a single-site claim is the `allowedDomains` list. The EPC register authorizes the claim to appear on the agent's own domain AND on every property portal the listing appears on:

```json
{
  "status": "verified",
  "allowedDomains": ["*.rightmove.co.uk", "*.zoopla.co.uk", "*.onthemarket.com", "cedarproperties.co.uk"]
}
```

When a consumer clips the claim on `www.rightmove.co.uk/properties/12345`, the browser extension checks whether the current page domain matches any entry in `allowedDomains`. It does — `*.rightmove.co.uk` covers it. The verification passes without a domain-mismatch warning.

If someone copies the same claim text onto an unauthorized site, the hash still verifies (the text is identical), but the extension sees that the current domain is not in the allowed list and fires an amber warning:

> "This EPC rating verified, but the allowed domains are cedarproperties.co.uk and the listed property portals, and you are on a different site."

## Example: Certificate Expired or Superseded

A property's EPC expires in 2025 but the listing still shows "EPC: C". The consumer clips the claim and the verification endpoint returns:

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #7a1f1f; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;">Verification Result
═══════════════════════════════════════════════════════════════════

Status:           SUPERSEDED
Reason:           Certificate expired — new assessment required
Result:           This EPC rating is no longer current

verify:epcregister.com/ratings/v
</pre>
</div>

The listing platform still shows "EPC: C" because it has not updated its data. But the consumer who clips and verifies sees SUPERSEDED. The agent cannot claim the rating is current — the verification endpoint is public.

## What Is Checked

Property address, EPC rating band (A–G), energy efficiency score, certificate validity dates, and current status.

**Document Types:**
- **EPC Rating Claim** — The primary claim: this property has this rating, valid until this date.
- **Rating Update** — Issued after a new assessment, superseding the previous claim.

**Privacy Salt:** Not required. EPC ratings are public record, searchable on the government's EPC register.

## What the Checker Sees

Shows the issuer domain (`epcregister.com`) and the current official certificate status.

**Verification Response Format:**

```json
{
  "status": "verified",
  "allowedDomains": ["*.rightmove.co.uk", "*.zoopla.co.uk", "*.onthemarket.com", "cedarproperties.co.uk"]
}
```

The `allowedDomains` field enables browser extensions to detect domain mismatches — where a valid claim has been copied onto a site that is neither the agent's own domain nor an authorized property portal.

**Status Indications:**
- **Current** — Certificate is within its 10-year validity period and matches the register.
- **Superseded** — A new assessment has been lodged, replacing the previous certificate.
- **Expired** — The 10-year validity period has passed; a new assessment is required before the property can be marketed.
- **404** — No such certificate was issued for this property address.

## Who Holds It

The seller or landlord benefits from verification.

**Proving the EPC is current:** A seller or landlord whose property has a valid, high-rated EPC currently has no way to prove that on a listing platform — the displayed letter grade is just a field in a database. A verifiable claim lets them demonstrate the rating directly to prospective buyers or tenants, on whichever platform they are browsing.

**Letting compliance:** It is illegal in England and Wales to let a property with an EPC rating below E (with limited exemptions). A landlord with a valid certificate at E or above can use the verifiable claim as evidence of compliance when questioned by a prospective tenant or local authority.

## Who Checks It

**Buyers and Tenants**

**Pre-viewing confidence:** Before arranging a viewing, a buyer or tenant can verify that the EPC rating shown on the listing is current and matches the register. Energy costs are a material factor in affordability, and an incorrect rating misrepresents the property's running costs.

**Estate Agents**

**Listing accuracy:** Agents can verify claims at the point of listing creation rather than relying on what the seller tells them. If a certificate has expired or been superseded, the agent knows before publishing the listing — avoiding a breach of the Energy Performance of Buildings regulations.

**Mortgage Lenders**

**Affordability assessment:** EPC ratings affect estimated energy costs, which feed into affordability calculations. A lender can verify the claimed rating rather than relying on the agent's listing data. This matters most for properties near the boundary between rating bands, where energy cost estimates shift materially.

**Local Authority Enforcement**

**Minimum energy efficiency monitoring:** Local authorities enforce the Minimum Energy Efficiency Standard (MEES) for rental properties. A verifiable claim from the EPC register provides direct evidence of a property's rating, simplifying enforcement against landlords marketing properties below the legal minimum.

## How Verification Works Here

**The "Self-Asserted Rating on Portals" Problem**

- **No verification path:** A consumer seeing "EPC: C" on a Rightmove listing has no way to check whether that letter is current, correct, or matches the register — without leaving the page and searching separately.
- **Stale data:** Property portals do not automatically sync with the EPC register. A property re-assessed from C to D after insulation removal will continue to show C on every portal until someone manually updates it.
- **Agent error:** The agent types the rating into each portal manually. Transposition errors happen. A property rated D may be listed as C on one portal and correctly as D on another.
- **Expired certificates:** A 10-year-old EPC may have expired, but the rating letter persists on the listing because the portal has no expiry-checking mechanism.
- **Multi-portal fragmentation:** A property listed on Rightmove, Zoopla, OnTheMarket, and the agent's own site has four separate copies of the rating, each entered independently.

The verifiable claim addresses these because:

1. The EPC register issues the claim — it is not self-asserted by the agent or entered by the portal
2. The claim includes the property address and validity period, providing a human-readable identity check
3. The `allowedDomains` list explicitly authorizes which platforms may display the claim
4. Expiry and supersession are immediate — the endpoint returns SUPERSEDED or EXPIRED when the certificate status changes
5. The same claim text and hash work identically across all authorized sites

## Where Each Fits: Live Verify and the EPC Register

In the UK, energy performance certificates are lodged on a public government register, and anyone can look a property up there. Elsewhere it depends on where you are: EU member states each run their own certificate schemes under the EPBD, Australia has NatHERS, the US relies on voluntary ratings, and many countries have nothing. The register and Live Verify answer different questions and work side by side: the register is the authoritative record, and Live Verify brings its answer to the listing page where buyers and tenants actually look.

| | EPC register lookup | Rating typed onto the listing | Live Verify on the listing | Paper certificate |
| :--- | :--- | :--- | :--- | :--- |
| **Who can check** | Anyone who leaves the listing and searches the register. | Nobody; it is the agent's entry. | Anyone viewing the listing: a buyer, a tenant, an agent, a lender, a council officer. | Whoever is shown it. |
| **What the checker gets** | The register's current record for the property. | A letter grade entered by the agent, which may be wrong or out of date. | Confirmation that the register stands behind this exact rating claim for this address, and whether the certificate has since expired or been superseded. | The rating on the date of assessment. |
| **What the seller or landlord shares** | Nothing; the register is public. | Nothing beyond the listing. | Only the claim shown on the listing. | The certificate. |
| **Reach** | One country's or region's register. | Every portal, each with its own copy. | Global in principle: any rating register, in any country, that publishes hashes on its own domain, shown on whichever portals it allows. | Wherever it is shown. |
| **Speed and cost** | Free, but a separate search on a separate site. | Immediate. | A few seconds per check: one web lookup, with no fee to the standard. | Immediate. |
| **What it needs** | The register, and a checker who thinks to use it. | The agent to type it correctly and keep it current. | The register to publish hashes, and Live Verify-aware software on the checker's device. No EPC register does this yet. | Nothing. |
| **Best suited to** | Authoritative checks by agents, lenders and councils. | Nothing on its own. | Checking the rating in place, on the listing, across every portal. | The owner's own record. |

**Where each fits:** the EPC register remains the authoritative source, and agents, lenders and councils who check it directly should carry on. Consumers browsing property listings rarely visit it. A verifiable claim issued by the register brings its answer to the page where the property decision actually happens, for any viewer whose software honours it.

## Authority Chain

**Pattern:** Sovereign

The EPC register holds certificate data for all domestic and non-domestic properties in England and Wales.

```
✓ epcregister.com/ratings/v — EPC register rating verification
  ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Further Derivations

1. **Portfolio Compliance Dashboards** — Aggregated verification status across a landlord's entire property portfolio, enabling automated flagging when certificates approach expiry or fall below MEES thresholds.
2. **Conveyancing Packs** — Combined verifiable claims covering EPC rating, planning permission status, and title information, each verified against separate endpoints but assembled into a single conveyancing document set.

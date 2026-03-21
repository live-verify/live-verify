---
title: "Vehicle Safety Inspection Status"
category: "Identity & Authority Verification"
volume: "Very Large"
retention: "Until expiry date"
slug: "mot-status-confirmation"
verificationMode: "clip"
tags: ["mot", "tuv", "controle-technique", "shaken", "vehicle-inspection", "roadworthiness", "used-car", "time-limited", "government"]
furtherDerivations: 2
---

## What is a Vehicle Safety Inspection Status?

Most countries require periodic roadworthiness inspections for vehicles. The inspection regimes vary but the verification problem is the same: a seller claims the vehicle has a current inspection certificate, and the buyer has no way to verify that claim at the point of decision without leaving the listing and searching the relevant government system.

**Inspection regimes by jurisdiction:**

| Country | Name | Authority | Frequency |
|:---|:---|:---|:---|
| **UK** | MOT (Ministry of Transport test) | DVSA | Annual (vehicles 3+ years) |
| **Germany** | HU / TÜV (Hauptuntersuchung) | TÜV, DEKRA, GTÜ, KÜS | Every 2 years |
| **France** | Contrôle technique | Approved centres (OTC) | Every 2 years |
| **Spain** | ITV (Inspección Técnica de Vehículos) | Regional ITV stations | Every 2 years (age-dependent) |
| **Netherlands** | APK (Algemene Periodieke Keuring) | RDW-approved garages | Annual (vehicles 4+ years) |
| **Japan** | Shaken (車検) | MLIT | Every 2 years |
| **Australia** | Varies by state (RWC, Pink Slip, Safety Certificate) | State transport authorities | Varies |
| **US** | Varies by state (safety inspection, emissions, or none) | State DMV / environmental agencies | Annual where required; many states have no inspection |
| **Canada** | Varies by province (Safety Standards Certificate, etc.) | Provincial transport ministries | Varies |

The verification pattern is the same in every case: the inspection authority issues a verifiable claim stating whether the vehicle has a current certificate, when it expires, and what was found. The claim travels to the listing page where the buyer encounters it.

The examples below use the UK's MOT as the primary illustration. The pattern applies identically to TÜV, contrôle technique, ITV, APK, shaken, and any other periodic inspection regime.

## MOT Status — Valid

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="mot-valid"></span>MOT STATUS
Registration:  AB12 CDE
Status:        MOT VALID
Expiry:        15 Sep 2026
Last Test:     15 Sep 2025
Mileage at Test: 42,118
Advisory Items: 2
<span data-verify-line="mot-valid">verify:gov.uk/mot-status/v</span> <span verifiable-text="end" data-for="mot-valid"></span></pre>
</div>

## MOT Status — Expired

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="mot-expired"></span>MOT STATUS
Registration:  AB12 CDE
Status:        MOT EXPIRED
Expired:       15 Sep 2025
Last Test:     15 Sep 2024
Mileage at Test: 38,402
Advisory Items: 4
<span data-verify-line="mot-expired">verify:gov.uk/mot-status/v</span> <span verifiable-text="end" data-for="mot-expired"></span></pre>
</div>

## Data Verified

Vehicle registration, MOT status (valid or expired), expiry or expiration date, date of last test, recorded mileage at the time of the last test, and the number of advisory items. The specific advisory item descriptions are not included in the verifiable snippet — they are available via the full gov.uk lookup. Vehicle ownership, finance status, insurance, and tax status are deliberately excluded.

## Data Visible After Verification

Shows the issuer domain (`gov.uk/mot-status`) and confirms whether the MOT status claim is current.

**Verification Response Format:**

```json
{
  "status": "verified"
}
```

**Note on `allowedDomains`:** MOT status is a government-public fact already accessible by registration number. Restricting which domains can display it via `allowedDomains` adds little trust value — the fact is the same wherever it appears. For public-state artifacts like this, freshness (is the claim still within its validity window?) and source binding (does it verify against `gov.uk`?) matter more than publisher authorization. The `allowedDomains` field is omitted here, unlike the reseller and insurance-panel patterns where the claim's provenance depends on which site displays it.

**Status Indications:**
- **Valid** — The MOT status matches DVSA records. The vehicle has a current MOT certificate.
- **Expired** — The MOT has expired since this claim was issued, or the claim itself has passed its expiry date.
- **Superseded** — A new MOT test has been recorded since this claim was issued. The seller should fetch a fresh snippet.

## Second-Party Use

The **Seller** generates a verifiable MOT status snippet from gov.uk and includes it in their vehicle listing. On AutoTrader, eBay Motors, Facebook Marketplace, or any other listing platform, the snippet sits alongside the vehicle description. The buyer's browser extension verifies the hash against the DVSA domain without the buyer needing to navigate away from the listing.

For private sellers, this removes the "trust me, it has a long MOT" problem. For dealers listing large numbers of vehicles, the snippets can be generated in bulk and embedded programmatically.

## Third-Party Use

**Private Buyers**
The primary beneficiary. A buyer scanning used car listings can verify MOT status inline, at no cost, in seconds. The advisory item count provides a signal about the vehicle's condition — a high count may warrant requesting the full advisory detail before arranging a viewing.

**Dealers and Auction Houses**
Dealers accepting trade-ins and auction houses processing consignment vehicles can verify MOT status as part of intake without running separate lookups. At volume, this saves meaningful time.

**Insurers**
Some motor insurance policies require the vehicle to hold a valid MOT. A verifiable MOT status claim provides a fast confirmation at the point of policy issuance or renewal, without manual verification against DVSA records.

**Fleet Operators**
Companies managing vehicle fleets need to track MOT status across hundreds or thousands of vehicles. Verifiable claims provide a machine-readable, trustworthy signal that integrates into fleet management systems.

## Verification Architecture

**The "Expired MOT" Problem**

- **Misrepresented Expiry:** A seller lists a vehicle as "MOT until September 2026" when it actually expired in September 2025. The buyer only discovers this after purchase, and the vehicle cannot legally be driven on public roads.
- **Stale Listings:** A vehicle is listed for sale with a valid MOT. Weeks pass. The MOT expires while the listing is still live. Without a time-bound verifiable claim, the listing continues to imply a valid MOT.
- **Hidden Advisories:** A vehicle passes its MOT but with five advisory items, some of which suggest imminent failure points (e.g., "brake disc worn close to legal limit"). The seller omits this from the listing. The advisory count in the verifiable snippet signals that further investigation is warranted.

**Issuer** (First Party)

**DVSA (Driver and Vehicle Standards Agency):** The UK government agency responsible for MOT testing standards and the MOT database. DVSA already operates the public MOT history lookup and holds the authoritative data. Issuing verifiable clips is a natural extension of their existing digital service.

**Privacy Salt:** Required. Although MOT status is already public via the gov.uk lookup, salting prevents bulk enumeration. Without a salt, an adversary could hash every possible registration number and build a shadow database of MOT statuses, advisory counts, and mileage progressions — useful for targeted scams (e.g., contacting owners of vehicles with expired MOTs to offer "urgent" repair services).

## Authority Chain

**Pattern:** Government Direct (or Government-Delegated)

The inspection authority varies by jurisdiction. In some countries the government operates the inspection database directly; in others, approved private organisations (TÜV, DEKRA, approved garages) conduct the inspections and report to a government registry.

UK:
```
✓ gov.uk/mot-status/verify — DVSA-issued MOT status claims
  ✓ dvsa.gov.uk — Operates the MOT testing scheme and database
    ✓ gov.uk/verifiers — UK government root namespace
```

Germany:
```
✓ tuv.com/hu-status/verify — TÜV-issued HU status claims
  ✓ kba.de — Federal Motor Transport Authority (Kraftfahrt-Bundesamt)
```

France:
```
✓ utac-otc.com/ct-status/verify — Contrôle technique status claims
  ✓ ecologie.gouv.fr — Ministry of Ecological Transition
```

Japan:
```
✓ mlit.go.jp/shaken-status/verify — Shaken status claims
  ✓ mlit.go.jp — Ministry of Land, Infrastructure, Transport and Tourism
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Competition vs. Government Lookup

| Feature | Live Verify | Government portal (gov.uk, KBA, etc.) | Seller's Word |
| :--- | :--- | :--- | :--- |
| **Speed** | **Seconds.** Inline verification without leaving the listing. | **Minutes.** Separate site, manual lookup. | **Instant.** |
| **Trust Anchor** | **Domain-Bound.** Tied to the inspection authority's domain. | **Government.** Same data source, different delivery. | **Zero.** No backing. |
| **Context** | **In-place.** Verified where the buyer is already looking. | **Out-of-band.** Requires leaving the listing page. | **Embedded.** But unverified. |
| **Cost** | **Free.** Hash verification. | **Free or low-cost.** Varies by country. | **Free.** |
| **Currency** | **Snapshot.** As of issue date, with expiry. | **Live.** Always current. | **Unknown.** No date guarantee. |
| **Integrity** | **Cryptographic.** Tamper-evident. | **Trusted source.** But not portable. | **Vulnerable.** Easily fabricated. |

## Further Derivations

None currently identified.

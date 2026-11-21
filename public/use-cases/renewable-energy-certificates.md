---
title: "Renewable Energy Certificates (RECs)"
category: "Environmental Permits & Compliance"
volume: "Medium"
retention: "3-7 years (compliance / carbon audit)"
slug: "renewable-energy-certificates"
verificationMode: "clip"
tags: ["renewable-energy", "rec", "green-power", "carbon-offset", "esg-reporting", "energy-trading", "sustainability-audit", "greenwashing-prevention"]
furtherDerivations: 1
---

## What is a Renewable Energy Certificate?

In the energy market, a Renewable Energy Certificate (REC) is the proof that 1 Megawatt-hour (MWh) of electricity was generated from a renewable source (Solar, Wind, Hydro) and delivered to the grid. These certificates are the "Currency of Green Power." Companies buy RECs to prove they are using "100% Renewable Energy" for their factories or data centers.

The problem is that a REC can only be used once. "Double-Counting" is a massive fraud where a solar farm sells the same MWh of energy to two different companies. Similarly, shady firms create fake "Green Certificates" to greenwash their carbon footprint. Verified hashes bind the Generator ID, MWh Amount, and Vintage Year to the tracking registry's domain (e.g., `mirecs.org` or `wregis.org`).

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="rec"></span>NORTH AMERICAN RENEWABLE REGISTRY
Official Certificate of Generation
═══════════════════════════════════════════════════════════════════

Generator:    SUNNY-RIDGE SOLAR ARRAY     Certificate ID: REC-2026-8844
Facility ID:  #992288-XJ                  Vintage:        2026-Q1
Location:     Kern County, CA             Status:         ACTIVE

              RENEWABLE ENERGY QUANTITY:
                    1,000.00 MWh
              (One Thousand Megawatt-Hours)

Fuel Type: Solar Photovoltaic
CAISO balancing authority area.

<span data-verify-line="rec">verify:wregis.org/v</span> <span verifiable-text="end" data-for="rec"></span></pre>
</div>

## The Problem: Ghost MWh Fraud

- **Double-Counting:** Selling the same 1 MWh of solar energy to two different buyers using two separate paper certificates.
- **Vintage Inflation:** Editing a 2023 REC to read "2026" because newer vintage years are more valuable.
- **Fuel Type Masking:** Describing "Dirty" energy as "Renewable" on a fake certificate.

## What Is Checked

Certificate ID, facility name, facility ID, fuel type (Solar/Wind/etc.), balancing authority (e.g., CAISO), vintage month/year, total MWh quantity, purchaser name (if retired), date of generation, date of registry entry.

**Document Types:**
- **REC Certificate:** The primary asset for trading or compliance.
- **Retirement Report:** Proof that the MWh was "consumed" and can't be re-sold.
- **Generation Summary:** The aggregate output of a facility for a month.
- **PPA (Power Purchase Agreement) Extract:** (Linked hash) proving the long-term deal.

## What the Checker Sees

Shows the issuer domain (`wregis.org`, `mirecs.org`, `apx.com`) and the asset standing.

**Status Indications:**
- **Active / Tradable** — Certificate is valid and can be sold to a buyer.
- **Retired** — The green attributes have been "used" by a buyer (shows owner name).
- **Cancelled** — The generation was found to be erroneous or fraudulent.
- **Pledged** — The REC is held as collateral for a trade-finance loan.

## Who Holds It

The Energy Buyer (Corporation) benefits from verification.

**ESG Reporting Speed:** When a company like Google or Amazon files its annual "Sustainability Report," they include the verified hashes of their REC portfolio. Auditors can instantly see "VERIFIED RETIRED - 1,000 MWh" on their phone, removing the need for a 2-week manual audit of registry portal logins.

**Greenwashing Defense:** If a competitor accuses a brand of "Fake Green Claims," the company can point to the verified REC hashes on its public website. This provides the cryptographic proof needed to stop a PR crisis instantly.

## Who Checks It

**Carbon and ESG Auditors**
**Inventory Audit:** During a "Net Zero" audit, the accountant scans a random sample of the client's RECs. Live Verify ensures the company isn't "Double-Counting" RECs or using "Phantom Credits" from a non-existent solar farm.

**Energy Traders / Banks**
**Transaction Security:** Before buying 50,000 RECs from a broker, the trader scans the hash. Verification ensures the seller actually owns the RECs and that they haven't already been "Retired" by someone else.

**Regulators (FTC / State Boards)**
**Consumer Protection:** Verifying that "Green Energy" retail plans sold to homeowners are actually backed by verified, retired RECs as required by law.

## Who Issues It

**Issuer Types** (First Party)

**Regional Energy Registries (WREGIS, NEPOOL).**
**National Tracking Systems.**
**Independent Verification Bodies (e.g., Green-e).**

**Privacy Salt:** Essential. Specific trade volumes and prices are sensitive business data. The hash must be salted to prevent "Market-Volume Mapping" by competitors.

## Authority Chain

**Pattern:** Regulated

Renewable energy certificates are issued by accredited generators and tracked by the UK energy regulator.

```
✓ recs.ofgem.gov.uk/verify — Issues and tracks renewable energy certificates
  ✓ ofgem.gov.uk — Regulates UK energy markets
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Rationale

RECs are the "Digital Integrity" of the green economy. By turning static certificates into verifiable digital bridges, we protect the multibilion-dollar transition to clean power and ensure that "100% Green" is a cryptographic fact, not a marketing gimmick.

## Jurisdictional Witnessing (Optional)

An independent witness layer may apply — see [Witnessing Third Parties](../../docs/WITNESSING-THIRD-PARTIES.md) for the full mechanism (what a witness receives, non-repudiation, optional public-blockchain rollups). For this use case: a witness would receive the registry's hashes and status changes plus structured metadata (certificate ID, generator ID, MWh quantity, vintage year, facility location, status) — never plaintext or sensitive personal information — providing non-repudiation of the renewable energy certificate and MWh generation.

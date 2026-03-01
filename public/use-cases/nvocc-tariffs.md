---
title: "NVOCC (Non-Vessel Operating Common Carrier) Tariffs"
category: "Chain of Custody & Logistics"
volume: "Medium"
retention: "Tariff validity + 7 years (FMC compliance)"
slug: "nvocc-tariffs"
tags: ["shipping", "logistics", "nvocc", "fmc-compliance", "freight-rates", "tariff-filing", "maritime-regulation", "trade-integrity"]
furtherDerivations: 1
---

## What is an NVOCC Tariff?

A **Non-Vessel Operating Common Carrier (NVOCC)** is a freight forwarder that buys space on ships and resells it to shippers. By US law (**FMC Regulations**), NVOCCs must publish their **Tariffs**—the official prices they charge for shipping. These rates must be filed publicly and applied equally to all similarly situated customers.

The problem is that freight rates are volatile. To win business, some NVOCCs "edit" their tariff sheets to show a lower "filed" rate than they actually reported to the government, or they add "hidden surcharges" that aren't in the legal tariff. Verified hashes bind the **Route, Rate, and Surcharge Codes** to the carrier's official tariff domain (e.g., `expeditors.com` or `flexport.com`), ensuring that the price on the paper matches the price filed with the regulator.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="tariff">[</span>GLOBAL FREIGHT LOGISTICS
FMC OTI License: #0992288N                     Public Tariff #042
═══════════════════════════════════════════════════════════════════
RATE FILING                                    Ref: GFL-SHA-LAX-2026

Origin:       Shanghai, China (CNSHA)     Effective:   MARCH 15, 2026
Destination:  Los Angeles, USA (USLAX)    Expires:     APRIL 14, 2026
Commodity:    General Cargo (NOS)         Service:     Port-to-Port

Cost Component                           Basis           Amount
───────────────────────────────────────────────────────────────────
Ocean Freight (All-In)                   Per 40' HC    $ 3,250.00
Bunker Adjustment (BAF)                  Per 40' HC    $   420.00
───────────────────────────────────────────────────────────────────
TOTAL FILED RATE:                                      $ 3,670.00

FMC Compliance: Filed with Federal Maritime Commission.

<span data-verify-line="tariff">verify:gfreight.com/tariffs/v</span> <span verifiable-text="end" data-for="tariff">]</span></pre>
</div>

## Data Verified

Tariff number, FMC license number, route (Origin/Destination ports), container type (e.g., 40' HC), commodity description, effective date, expiration date, base freight rate, individual surcharge amounts (BAF, CAF, PSS), total filed value, filing timestamp.

**Document Types:**
- **Tariff Rate Filing:** The primary public pricing record.
- **Service Contract Addendum:** Negotiated rates for large shippers.
- **Booking Confirmation:** (Linked hash) proving the rate was applied.
- **Invoice:** Final bill reflecting the filed tariff.

## Data Visible After Verification

Shows the issuer domain (`gfreight.com`, `expeditors.com`, `flexport.com`) and the filing standing.

**Status Indications:**
- **Current / Filed** — Rate is active and matches the official FMC filing.
- **Expired** — The validity period for this specific rate has passed.
- **Amended** — **ALERT:** A corrected or updated rate filing exists.
- **Disputed** — **ALERT:** The regulator has flagged this tariff for investigation.

## Second-Party Use

The **Shipper (Exporters / Importers)** benefits from verification.

**Billing Protection:** Before paying a $50,000 ocean freight invoice, the shipper scans the original tariff hash. "Verified by Global Freight" ensures that the NVOCC isn't "Padding" the bill with surcharges that were never filed with the government, preventing over-payment.

**Audit Compliance:** Large shippers can maintain a verified library of all rates used. During a corporate audit, they can prove that their logistics spending was transparent and met all US Shipping Act requirements.

## Third-Party Use

**Federal Maritime Commission (FMC) Inspectors**
**Rapid Vetting:** During an audit of an NVOCC's records, the inspector can scan random invoices. Live Verify ensures the invoice prices match the public tariff filings, stopping "Secret Rebates" or "Off-Book Deals" that distort market competition.

**Trade Finance Banks**
**Valuation Integrity:** Banks lending against "Goods in Transit" scan the verified tariffs to ensure that the "Shipping Costs" (which impact the collateral value) are accurate and legally defensible.

**Customs Brokers**
**Valuation Proof:** Providing verified tariff hashes to customs to prove the "Landings Cost" of goods for accurate duty calculation.

## Verification Architecture

**The "Invisible Fee" Fraud Problem**

- **Surcharge Padding:** Manually adding a "$200 Congestion Surcharge" to a PDF that wasn't in the filed tariff.
- **Backdating Filings:** Editing a tariff to change the "Effective Date" to hide an illegal over-charge from a prior month.
- **Rebate Hiding:** Showing a high rate on the public tariff while secretly giving a lower, un-filed rate to a preferred customer.

**Issuer Types** (First Party)

**Global NVOCCs.**
**Tariff Publishing Services (e.g., Descartes, Catapult).**
**National Maritime Regulators.**

**Privacy Salt:** Essential. Specific customer names and trade volumes are sensitive business secrets. The hash must be salted to prevent competitors from mapping a rival's cargo flow.

## Rationale

NVOCC tariffs are the "Rules of the Road" for global trade. By turning static price sheets into verifiable digital bridges, we ensure that the transparency required by law is backed by cryptographic proof, protecting shippers and fair competition.

## Jurisdictional Witnessing

A jurisdiction may require the issuer to retain a **witnessing firm** for regulatory compliance. The witnessing firm:

- Receives all hashes from the issuer, and any subsequent changes to the payload as they happen—which may manifest as a new hash, a status change, or even a 404 (record deleted)
- Receives structured content/metadata (key identifiers and dates)
- Does **NOT** receive plaintext or sensitive personal information
- Provides an immutable, timestamped audit trail—available to the jurisdiction on demand, to document holders/third parties during disputes, or as expert witness testimony in legal proceedings

This provides:
- **Non-repudiation:** Issuer cannot deny issuing the document
- **Timestamp proof:** Document existed at a specific time
- **Regulatory audit:** Jurisdictions can inspect the witness ledger for fraud detection
- **Resilience:** Verification works even if issuer's systems go down

**Public Blockchain (Non-Party)**

Witnessing firms may periodically commit rollups to an inexpensive public blockchain, providing an ultimate immutability guarantee. The blockchain is a "non-party"—infrastructure, not a participant in the transaction. This creates multiple verification paths:

1. **Issuer domain** — Direct check against the issuer
2. **Witnessing firm** — Independent confirmation with timestamp
3. **Public blockchain** — Decentralized trust anchor via rollup inclusion

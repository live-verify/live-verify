---
title: "CMR Consignment Notes (Road Freight)"
category: "Chain of Custody & Logistics"
volume: "Large"
retention: "7-10 years (carrier liability)"
slug: "cmr-consignment-notes"
verificationMode: "clip"
tags: ["logistics", "trucking", "cmr", "road-freight", "cargo", "international-trade", "bill-of-lading"]
furtherDerivations: 1
---

## What is a CMR Waybill?

In European and Asian trucking, the CMR Consignment Note is the standard contract for road freight. It follows the truck from the factory in Berlin to the store in Paris.

It is the "Proof of Handoff." It records:
1.  **What is on the truck:** (e.g., 12 pallets of electronics).
2.  **The condition:** Did the driver note any broken boxes at pickup?
3.  **The Delivery:** The customer signs it when the truck arrives.

Trucking is a fragmented industry. Verified CMRs prevent "Weight Fraud" (lying about how heavy the truck is to avoid tolls) and "Phantom Shipments" (faking deliveries to get paid for work never done).

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="cmr"></span>CMR - INTERNATIONAL CONSIGNMENT NOTE              No. 99887766
═══════════════════════════════════════════════════════════════════

1. Sender:              Deutsche Elektro GmbH
                        Industriestr. 42, Berlin, DE

2. Consignee:           Paris Retail Group, SA
                        Rue de Rivoli, Paris, FR

3. Place of Delivery:   Paris, FR
4. Place of Taking Over: Berlin, DE (Date: 15.03.2026)

5. Description of Goods:
   High-Value Consumer Electronics (12 Pallets)
   Total Weight: 4,500 KG

───────────────────────────────────────────────────────────────────
Sender Signature       Carrier Signature       Consignee Signature

<span data-verify-line="cmr">verify:dhl-logistics.com/cmr/v</span> <span verifiable-text="end" data-for="cmr"></span></pre>
</div>

## The Problem: Tailgate Fraud

- **Weight Fraud:** Declaring 1,000kg on the CMR but actually carrying 5,000kg to avoid "Overweight" fines or tolls.
- **Phantom Shipments:** Creating fake CMRs to get cash from a factoring bank for work never performed.
- **Damage Concealment:** Drivers altering the "Taking Over" note to add a damage remark after they accidentally dropped a pallet.

## What Is Checked

Consignment number, Sender name, Consignee name, Pickup/Delivery locations, cargo description, number of packages, gross weight, Carrier ID, date of taking over, specialized instructions (e.g., "Keep Dry").

**Document Types:**
- **Standard CMR Note:** For international road transport (CMR Convention).
- **Domestic Waybill:** For within-country trucking.
- **Delivery Receipt (POD):** Signed by the receiver.

## What the Checker Sees

Shows the issuer domain (the Carrier or Freight Forwarder) and current cargo status.

**Status Indications:**
- **Collected** — Goods are on the truck; driver has signed.
- **In-Transit** — Moving through hubs or across borders.
- **Delivered** — Handed over to consignee; signed POD uploaded.
- **Exception** — Damage or shortage reported at delivery.

## Who Holds It

The Sender (Shipper) benefits from verification.

**Payment Trigger:** Proving to a customer that the goods were "Verified Taken Over" by a reputable carrier (e.g., DHL or Kuehne+Nagel). This allows the shipper to issue their invoice with confidence.

**Dispute Defense:** If the receiver claims the goods arrived damaged, the shipper can point to the "Verified Clean" taking-over note to prove the carrier accepted the goods in good condition.

## Who Checks It

**Customs Authorities (Cross-Border)**
**Security Check:** Border agents can scan the CMR while the truck is in the queue. "Verified by Carrier" ensures the paper doesn't hide "Phantom Cargo" or mislabeled hazardous goods.

**Insurance Companies**
**Liability Claims:** When a truck crashes, the insurer needs to know exactly what was on board. Verification prevents the shipper and carrier from "colluding" to change the cargo description to a more expensive item after the accident.

**Factoring Companies**
**Invoice Financing:** Banks that buy trucking invoices (factoring) verify the CMR to ensure the shipment is real before advancing cash to the trucking company.

## Who Issues It

**Issuer Types** (First Party)

**National Trucking Carriers:** (DHL, DB Schenker, DSV).
**Logistics Marketplaces:** (Sennder, Uber Freight).
**National Road Transport Assocs:** (e.g., IRU - International Road Transport Union).

## Authority Chain

**Pattern:** Commercial

Freight carriers issue CMR consignment notes as the primary shipper-carrier contract. Self-authorized by their legal status as international road transport operators under CMR convention.

```
✓ transport.dhl.com/cmr/verify — Issues CMR consignment notes and freight documentation
```

Commercial issuer — self-authorized. Trust rests on the issuer's domain reputation.

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Jurisdictional Witnessing (Optional)

An independent witness layer may apply — see [Witnessing Third Parties](../../docs/WITNESSING-THIRD-PARTIES.md) for the full mechanism (what a witness receives, non-repudiation, optional public-blockchain rollups). For this use case: a witness would receive the transport operator's hashes and status changes plus structured metadata (shipment number, routing, dates) — never plaintext or sensitive personal information — providing non-repudiation of the document.

## Compared With e-CMR (Digital Convention)

| Feature | Live Verify | e-CMR (Standard) | Paper Carbon Copy |
| :--- | :--- | :--- | :--- |
| **Connectivity** | **Needed for the check.** The paper note travels through mountains and tunnels; checking it takes one small web request, which can wait until there is signal. | **Needed.** Requires the app and a data connection at every handoff. | **Offline.** |
| **Trust Anchor** | **Domain-Bound.** Trust the Carrier. | **Protocol-Bound.** Trust the UN convention system. | **Visual.** Trusted only via stamp. |
| **Interoperability** | **Universal.** Works for any trucker with a URL. | **Low.** Requires all countries to ratify the e-Protocol. | **Universal.** |
| **Integrity** | **Binds Data.** Protects the Weight/Count. | **Digital Only.** | **Zero.** |

**Where each fits:** where the carrier, the consignee and the countries on the route all support e-CMR, the electronic note is the better record. A great deal of road freight still moves on paper notes carried by independent drivers, through places with poor signal. Live Verify lets anyone handed the paper note check it against the carrier's domain, and it can serve as a step toward e-CMR adoption rather than a rival to it.

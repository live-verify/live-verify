---
title: "Delivery Orders and Cargo Release"
category: "Chain of Custody & Logistics"
volume: "Large"
retention: "Delivery + 3-7 years"
slug: "delivery-orders-cargo-release"
tags: ["logistics", "shipping", "port-authority", "cargo-release", "delivery-order", "warehousing", "terminal-operations"]
furtherDerivations: 1
---

## What is a Delivery Order?

When a shipping container arrives at a port, the terminal operator won't just give it to any trucker. They need a **Delivery Order (DO)**.

This is the "Golden Ticket" that authorizes the release of the cargo. It proves:
1.  **Freight is Paid:** The ship line has been settled.
2.  **Customs is Cleared:** The government has released the goods.
3.  **The Bearer is Right:** The trucker has the authority to take it.

Cargo theft via "Fictitious Pickup" is a huge problem. Thieves use forged paper DOs to trick port clerks into giving them $200,000 containers. Verified hashes allow the port to check the DO against the broker's domain in seconds, stopping theft at the gate.

<div style="max-width: 600px; margin: 24px auto; font-family: 'Arial Narrow', sans-serif; border: 1px solid #000; background: #fff; padding: 0; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
  <div style="background: #002d62; color: #fff; padding: 10px; display: flex; justify-content: space-between; align-items: center;">
    <div style="font-weight: bold; font-size: 1.2em;"><span verifiable-text="start" data-for="cargo">[</span>EXPEDITORS INTERNATIONAL</div>
    <div style="font-size: 0.8em; text-align: right;">Ref #: DO-2026-992288</div>
  </div>
<div style="padding: 15px; font-size: 0.85em;">
    <h2 style="text-align: center; margin: 0 0 15px 0; font-size: 1.3em; text-decoration: underline;">DELIVERY ORDER</h2>
<div style="display: flex; border-bottom: 1px solid #000; padding-bottom: 10px; margin-bottom: 15px;">
      <div style="width: 50%; border-right: 1px solid #000; padding-right: 10px;">
        <strong>To: Terminal Operator</strong><br>
        Port of Long Beach, Pier J<br>
        Long Beach, CA
      </div>
      <div style="width: 50%; padding-left: 10px;">
        <strong>Consignee / Deliver to:</strong><br>
        Global Retail distribution, LLC<br>
        Ontario, CA
      </div>
    </div>
<div style="background: #f9f9f9; padding: 10px; border: 1px solid #ccc; margin-bottom: 15px;">
      <p>Please deliver the following goods to the bearer of this order:</p>
      <strong>Container #:</strong> MSKU-998877-6<br>
      <strong>B/L No:</strong> MAE-44221100<br>
      <strong>Cargo:</strong> 42 Pallets: Consumer Electronics
    </div>
<div style="display: flex; justify-content: space-between; align-items: flex-end;">
      <div>
        <strong>Carrier / Broker Signature:</strong><br>
        <em>Jane Q. Broker</em><br>
        March 15, 2026
      </div>
      <div style="text-align: right;">
        <div style="border: 2px solid #002d62; display: inline-block; padding: 5px; font-weight: bold; color: #002d62;">FREIGHT PREPAID<br>CUSTOMS CLEARED</div>
      </div>
    </div>
<div data-verify-line="cargo" style="border-top: 1px dashed #999; margin-top: 25px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.85em; color: #555; text-align: center;"
      title="Demo only: Broker/Carrier doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:expeditors.com/do/v <span verifiable-text="end" data-for="cargo">]</span>
    </div>
  </div>
</div>

## Data Verified

Delivery Order (DO) number, Consignee name, Trucking company (if specified), Container ID, Bill of Lading (B/L) number, Port Terminal ID, freight payment status, customs clearance status, expiration date (Last Free Day), issuing broker/carrier.

**Document Types:**
- **Delivery Order (DO):** Authorization to release cargo from the terminal.
- **Steamship Line Release:** Proving the ocean freight is paid.
- **Customs Release:** (Form 3461) Proving the government has released the goods.
- **Gate Pass:** Handed to the driver for physical exit.

## Data Visible After Verification

Shows the issuer domain (the Customs Broker or Carrier) and the release standing.

**Status Indications:**
- **Released** — All holds cleared; cargo authorized for pickup.
- **Freight Hold** — **ALERT:** Ocean freight not yet paid; do not release.
- **Customs Hold** — Government has blocked the release.
- **Picked Up** — Cargo has already left the terminal (fraud detection).

## Second-Party Use

**The Trucker (Driver)** benefits from verification.

**Terminal Access:** Proving to the gate clerk that the "Delivery Order" on their tablet is 100% authentic and that all freight/customs hurdles are cleared. This prevents the driver from being "Turned Away" at the gate, which saves hours of idling and fuel.

**Liability Protection:** Confirming the "Last Free Day" is verified, ensuring the trucker won't be hit with unexpected "Demurrage" charges at the gate.

## Third-Party Use

**Terminal Operators (Stevedores)**
**Anti-Theft:** Cargo theft via "Fictitious Pickup" is a billion-dollar problem. Thieves use forged paper DOs to trick gate clerks into releasing containers. Live Verify allows the clerk to verify the order against the broker's domain, stopping the theft at the gate.

**Customs Brokers**
**Supply Chain Visibility:** Remotely monitoring the "Verified Status" of their issued DOs to see exactly when the cargo was picked up by the trucker.

**Marine Insurers**
**Risk Mitigation:** Ensuring that high-value cargo is only released to verified, authorized carriers.

## Verification Architecture

**The "Fake Release" Fraud Problem**

- **Ghost Pickups:** Thieves creating a fake "Delivery Order" for a $200,000 container of electronics, posing as a legitimate trucking company.
- **Hold Removal:** Editing a PDF to remove a "Freight Hold" or "Customs Hold" notation to trick the terminal into releasing cargo before payment.
- **Date Alteration:** Changing the "Last Free Day" to avoid paying storage fees to the terminal.

**Issuer Types** (First Party)

**Customs Brokers:** (e.g., Expeditors, Flexport, K+N).
**Steamship Lines:** (e.g., Maersk, MSC).
**Terminal Operating Systems (TOS).**

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


## Competition vs. Port Community Systems (PCS)

| Feature | Live Verify | Port Portal / PCS | Paper Delivery Order |
| :--- | :--- | :--- | :--- |
| **Trust Anchor** | **Domain-Bound.** Bound to the Broker. | **System-Bound.** Trust the Port's IT. | **Zero.** Easily forged. |
| **User Access** | **Universal.** Any trucker with a phone. | **Restricted.** Requires complex EDI/Portal logins. | **Instant.** |
| **Integrity** | **Binds Content.** Proves the *Container #*. | **Data-Only.** Doesn't protect the paper. | **Vulnerable.** |
| **Offline Proof** | **Strong.** The paper is the anchor. | **None.** Requires server access. | **Medium.** |

**Why Live Verify wins here:** The "Gate Clerk" reality. Gate operations are high-pressure and fast. Clerks often handle hundreds of trucks an hour. They don't have time to cross-reference multiple slow portals. Live Verify turns the **Trucker's Document** into a live, high-speed trust token that provides "Port-Grade" security in seconds.

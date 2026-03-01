---
title: "Intermodal Equipment Interchange Receipts (EIR)"
category: "Chain of Custody & Logistics"
volume: "Very Large"
retention: "Equipment return + 7 years"
slug: "intermodal-equipment-receipts"
tags: ["logistics", "intermodal", "chassis-inspection", "container-damage", "terminal-operations", "eir", "liability-transfer", "port-logistics"]
furtherDerivations: 1
---

<div style="max-width: 600px; margin: 24px auto; font-family: 'Courier New', Courier, monospace; border: 1px solid #000; background: #fff; padding: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
  <div style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 20px;">
    <strong><span verifiable-text="start" data-for="eir">[</span>GLOBAL TERMINAL OPERATORS</strong><br>
    EQUIPMENT INTERCHANGE RECEIPT (EIR)<br>
    -------------------------------------
  </div>
<div style="font-size: 0.85em; line-height: 1.4;">
    <div style="display: flex; justify-content: space-between;">
      <div>
        <strong>Container ID:</strong> MSKU-998877-6<br>
        <strong>Chassis ID:</strong> GTO-4228
      </div>
      <div style="text-align: right;">
        <strong>Transaction #:</strong> 99228877<br>
        <strong>Date:</strong> 15 MAR 2026 09:14 AM
      </div>
    </div>
<div style="margin: 15px 0; border: 1px solid #000; padding: 10px; background: #f9f9f9;">
      <strong>DAMAGE NOTATIONS (OUTGATE):</strong><br>
      [ ] NO DAMAGE FOUND (CLEAN)<br>
      [X] SC-1: 12" Scratch, Left Side Panel<br>
      [X] DT-4: Minor Dent, Rear Door sill
    </div>
<p><strong>Trucking Co:</strong> Quick-Haul Transport, Inc.<br>
    <strong>Driver ID:</strong> Miller, R. (Verified)<br>
    <strong>Terminal:</strong> LBCT Pier E, Long Beach, CA</p>
<div style="margin-top: 20px; font-size: 0.8em; font-style: italic; color: #555;">
      Signatory confirms receipt of equipment in the condition noted above.
    </div>
<div data-verify-line="eir" style="border-top: 1px dashed #999; margin-top: 25px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
      title="Demo only: Terminal doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:global-terminals.com/eir/v <span verifiable-text="end" data-for="eir">]</span>
    </div>
  </div>
</div>

## Data Verified

Container ID, Chassis ID, Trucking company name, Driver ID (hash), Outgate/Ingate status, detailed damage codes (e.g., SC-1, DT-4), seal integrity status, terminal location ID, precise timestamp, issuing terminal operator.

**Document Types:**
- **Inbound EIR:** When a trucker brings a container *into* the port.
- **Outbound EIR:** When a trucker picks up a container *from* the port.
- **Street Turn Receipt:** When equipment is transferred between truckers outside the port.
- **Chassis Inspection Report:** Specifically for the road-worthiness of the trailer.

## Data Visible After Verification

Shows the issuer domain (the Terminal Operator or Port Authority) and current asset status.

**Status Indications:**
- **Outgated** — Equipment is currently in the possession of the trucker.
- **Returned/Ingated** — Equipment has been verified back at the terminal.
- **Damage Claim Active** — Terminal has flagged the asset for repair billing.
- **Lost/Stolen** — Asset reported missing from the fleet.

## Second-Party Use

The **Trucking Company / Driver** benefits from verification.

**Liability Defense:** Proving to the Steamship Line (e.g., Maersk) that the "12-inch scratch" was already noted on the verified EIR at the moment of pickup. Verification prevents the carrier from charging the trucker $500 for a repair they didn't cause.

**Billing Disputes:** Providing verified "Outgate vs Ingate" timestamps to a customer to justify "Demurrage" or "Detention" charges based on actual terminal data.

## Third-Party Use

**Ocean Carriers (Steamship Lines)**
**Maintenance Audit:** Instantly verifying the condition reports from 100+ different global terminals. Live Verify allows the carrier to build a digital history of every asset's damage, identifying "Repeat Offender" truckers who consistently damage containers.

**Marine Insurers**
**Claim Adjudication:** Verifying the "Point of Damage." If a container is reported damaged at the warehouse, the insurer checks the verified EIR from the port. If the EIR was "Clean," the liability falls on the trucker.

**Chassis Pool Managers**
**Inventory Control:** Verifying the "Road-Worthiness" status of thousands of chassis moving across multiple port complexes.

## Verification Architecture

**The "Scratch and Dent" Fraud Problem**

- **Damage Erasure:** A trucker editing the PDF EIR to remove a "Dent" notation before returning the container, to avoid a $1,000 repair fee.
- **Timestamp Tampering:** Changing the "Outgate Time" to hide that a truck sat at the gate for 4 hours (which triggers a penalty for the terminal).
- **Identity Theft:** Using a "Clean" driver's ID on a paper EIR while an unauthorized or uninsured driver actually takes the load.

**Issuer Types** (First Party)

**Terminal Operators:** (e.g., APM Terminals, DP World, SSA Marine).
**Port Authorities.**
**Intermodal Platforms:** (e.g., Advent eModal, IAS).

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


## Competition vs. EDI Messaging (322)

| Feature | Live Verify | EDI 322 (Gate Event) | Paper EIR |
| :--- | :--- | :--- | :--- |
| **User Access** | **Universal.** Any driver or local shop. | **Restricted.** Requires complex B2B IT setup. | **Instant.** |
| **Trust Anchor** | **Domain-Bound.** Bound to the Terminal. | **System-Bound.** | **Zero.** Easily forged. |
| **Integrity** | **Binds Damage Codes.** Protects the text. | **Data-Only.** | **Vulnerable.** |
| **Offline Proof** | **Strong.** The paper is the anchor. | **None.** Requires server access. | **Medium.** |

**Why Live Verify wins here:** The "Gate Moment." Terminals are high-pressure bottlenecks. When a driver disputes a damage code with a gate clerk, they are looking at a piece of paper or a handheld screen. They don't have access to the back-end EDI logs. Live Verify turns the **Trucker's Receipt** into a live, trusted safety link that provides "Port-Grade" security in seconds.

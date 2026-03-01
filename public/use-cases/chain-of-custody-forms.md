---
title: "Chain of Custody Forms & Evidence Logs"
category: "Chain of Custody & Logistics"
volume: "Medium"
retention: "Variable (Case duration to Permanent)"
slug: "chain-of-custody-forms"
tags: ["forensics", "evidence", "legal-authority", "logistics", "audit-trail", "criminal-justice"]
furtherDerivations: 1
---

## What is an Evidence Log?

In a criminal case, if a blood sample or a bag of cash is found at a crime scene, it must be tracked every second until it reaches the courtroom. This is the **Chain of Custody**.

The **Evidence Log** is the paper that records every handoff: "Officer A handed Item #4 to Lab Tech B on Tuesday at 9:14 AM."

If there is a gap in the log (a "Broken Chain"), the evidence might be thrown out of court. Fraudsters or negligent officials sometimes "Backdate" these logs to hide that evidence was left in an unsecure location. Verified hashes make this backdating impossible.

<div style="max-width: 600px; margin: 24px auto; font-family: 'Courier New', Courier, monospace; border: 2px solid #555; background: #fdfdfd; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <div style="text-align: center; border-bottom: 2px dashed #555; padding-bottom: 10px; margin-bottom: 20px;">
    <strong><span verifiable-text="start" data-for="custody">[</span>EVIDENCE TRANSFER RECORD</strong><br>
    STATE FORENSIC LABORATORY
  </div>
<div style="font-size: 0.85em; line-height: 1.6;">
    <p><strong>Case Number:</strong> CR-2025-84921<br>
    <strong>Item ID:</strong> EV-004 (Blood Sample)<br>
    <strong>Seal Number:</strong> 99482-A</p>
<div style="background: #eee; padding: 10px; margin: 10px 0; border: 1px solid #999;">
      <strong>TRANSFER #3</strong><br>
      <strong>Released By:</strong> Ofc. J. Miller (Evidence Room)<br>
      <strong>Received By:</strong> Dr. S. Gupta (Toxicology)<br>
      <strong>Date/Time:</strong> 2025-11-04 09:14:22<br>
      <strong>Purpose:</strong> Analysis
    </div>
<p style="font-size: 0.8em; font-style: italic; color: #555;">
      The recipient confirms the physical seal was intact upon receipt.
    </p>
<div data-verify-line="custody" style="border-top: 1px dashed #999; margin-top: 20px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
      title="Demo only: State Lab doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:statelab.gov/custody/v <span verifiable-text="end" data-for="custody">]</span>
    </div>
  </div>
</div>

## Data Verified

Case number, item ID/description, container seal number (unique ID), relinquishing party name/ID, receiving party name/ID, handoff timestamp (to the second), physical location, purpose of transfer.

**Document Types:**
- **Evidence Transfer Log:** For police/court evidence.
- **Specimen Control Form:** For medical/toxicology labs.
- **High-Value Manifest:** For armored transport (Fine Art / Cash).
- **Pharma Batch Record:** Tracking ingredients through manufacturing.

## Data Visible After Verification

Shows the issuer domain (e.g., `nypd.gov`, `labcorp.com`) and current log status.

**Status Indications:**
- **Verified** — Transfer recorded exactly as stated in the official chain.
- **Seal Compromised** — **ALERT:** Recipient reported broken seal at this step.
- **Gap Detected** — Unaccounted time found between transfers.
- **Superseded** — The item has moved again; see Transfer #4.

## Second-Party Use

The **Receiver** (e.g., Lab Tech or Court Clerk) benefits from verification.

**Liability Shield:** Before signing for a bag of cash or a forensic sample, the receiver scans the sender's verification hash. This proves exactly what was handed over *before* they took legal responsibility for it.

**Integrity Check:** Instantly verifying that the "Seal Number" printed on the paper matches the digital record, preventing "bag switching" or sample tampering during transit.

## Third-Party Use

**Defense Attorneys / Prosecutors**
**Admissibility Audit:** In criminal law, a "Broken Chain" makes evidence inadmissible (Fruit of the Poisonous Tree). Attorneys scan custody logs to find gaps. Live Verify prevents "Gap Filling" where officers backdate paperwork weeks later to cover up negligence.

**FDA / Pharma Auditors**
**Batch Integrity:** Verifying that a biological drug component was handed off between approved, temperature-controlled couriers at the exact times claimed.

**Anti-Doping Agencies (WADA)**
**Sample Protection:** Protecting the integrity of athlete samples from collection site to the testing lab.

## Verification Architecture

**The "Paper Gap" Fraud Problem**

- **Backdating:** Filling in a logbook entry today but dating it "Last Tuesday" to hide that evidence was left in an unlocked car.
- **Sample Swapping:** Replacing a positive drug test with a clean one and forging the paper signature to match.
- **Page Deletion:** Removing a page from a physical logbook to hide an unauthorized access event.

**Issuer Types** (First Party)

**Law Enforcement Agencies:** (Police, Sheriff, FBI).
**Forensic Laboratories.**
**Logistics Providers:** (Brinks, FedEx Custom Critical).

**Privacy Salt:** Critical. Evidence logs contain sensitive case/medical data. The hash must be salted to prevent "Guessing" case involvement.

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


## Competition vs. Blockchain (Vechain / Hyperledger)

| Feature | Live Verify | Enterprise Blockchain | Paper Logbook |
| :--- | :--- | :--- | :--- |
| **Field Access** | **Universal.** Any lawyer or clerk with a phone. | **Restricted.** Requires expensive "Node" access and memberships. | **Instant.** |
| **Trust Anchor** | **Domain-Bound.** Trust the Lab domain. | **Consensus-Bound.** Trust the network protocol. | **Visual.** Trusted only via signatures. |
| **Connectivity** | **Strong.** Works even if the global chain is down. | **Fragile.** Requires high-speed data at the crime scene. | **Offline.** |
| **Auditability** | **High.** Creates a digital audit trail of scans. | **Very High.** Immutable ledger. | **Low.** Prone to "lost" books. |

**Why Live Verify wins here:** The "Disconnected Edge." Police and couriers often operate in basements, warehouses, or rural areas without reliable 5G. Live Verify turns the **Paper Log** (which is always there) into an immutable digital anchor that can be verified as soon as signal returns, providing "Blockchain Integrity" without the "Blockchain Infrastructure."
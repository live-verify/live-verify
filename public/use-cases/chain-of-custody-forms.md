---
title: "Chain of Custody Forms & Evidence Logs"
category: "Chain of Custody & Logistics"
volume: "Medium"
retention: "Variable (Case duration to Permanent)"
slug: "chain-of-custody-forms"
verificationMode: "clip"
tags: ["forensics", "evidence", "legal-authority", "logistics", "audit-trail", "criminal-justice"]
furtherDerivations: 1
---

## What is an Evidence Log?

In a criminal case, if a blood sample or a bag of cash is found at a crime scene, it must be tracked every second until it reaches the courtroom. This is the Chain of Custody.

The Evidence Log is the paper that records every handoff: "Officer A handed Item #4 to Lab Tech B on Tuesday at 9:14 AM."

If there is a gap in the log (a "Broken Chain"), the evidence might be thrown out of court. Fraudsters or negligent officials sometimes "Backdate" these logs to hide that evidence was left in an unsecure location. Verified hashes make this backdating impossible.

<div style="max-width: 600px; margin: 24px auto; font-family: 'Courier New', Courier, monospace; border: 2px solid #555; background: #fdfdfd; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <div style="text-align: center; border-bottom: 2px dashed #555; padding-bottom: 10px; margin-bottom: 20px;">
    <strong><span verifiable-text="start" data-for="custody"></span>EVIDENCE TRANSFER RECORD</strong><br>
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
      <span data-verify-line="custody">verify:statelab.gov/custody/v</span> <span verifiable-text="end" data-for="custody"></span>
    </div>
  </div>
</div>

## The Problem: Paper Gap Fraud

- **Backdating:** Filling in a logbook entry today but dating it "Last Tuesday" to hide that evidence was left in an unlocked car.
- **Sample Swapping:** Replacing a positive drug test with a clean one and forging the paper signature to match.
- **Page Deletion:** Removing a page from a physical logbook to hide an unauthorized access event.

## What Is Checked

Case number, item ID/description, container seal number (unique ID), relinquishing party name/ID, receiving party name/ID, handoff timestamp (to the second), physical location, purpose of transfer.

**Document Types:**
- **Evidence Transfer Log:** For police/court evidence.
- **Specimen Control Form:** For medical/toxicology labs.
- **High-Value Manifest:** For armored transport (Fine Art / Cash).
- **Pharma Batch Record:** Tracking ingredients through manufacturing.

## What the Checker Sees

Shows the issuer domain (e.g., `nypd.gov`, `labcorp.com`) and current log status.

**Status Indications:**
- **Verified** — Transfer recorded exactly as stated in the official chain.
- **Seal Compromised** — Recipient reported broken seal at this step.
- **Gap Detected** — Unaccounted time found between transfers.
- **Superseded** — The item has moved again; see Transfer #4.

## Who Holds It

The Receiver (e.g., Lab Tech or Court Clerk) benefits from verification.

**Liability Shield:** Before signing for a bag of cash or a forensic sample, the receiver scans the sender's verification hash. This proves exactly what was handed over *before* they took legal responsibility for it.

**Integrity Check:** Instantly verifying that the "Seal Number" printed on the paper matches the digital record, preventing "bag switching" or sample tampering during transit.

## Who Checks It

**Defense Attorneys / Prosecutors**
**Admissibility Audit:** In criminal law, a "Broken Chain" makes evidence inadmissible (Fruit of the Poisonous Tree). Attorneys scan custody logs to find gaps. Live Verify prevents "Gap Filling" where officers backdate paperwork weeks later to cover up negligence.

**FDA / Pharma Auditors**
**Batch Integrity:** Verifying that a biological drug component was handed off between approved, temperature-controlled couriers at the exact times claimed.

**Anti-Doping Agencies (WADA)**
**Sample Protection:** Protecting the integrity of athlete samples from collection site to the testing lab.

## Who Issues It

**Issuer Types** (First Party)

**Law Enforcement Agencies:** (Police, Sheriff, FBI).
**Forensic Laboratories.**
**Logistics Providers:** (Brinks, FedEx Custom Critical).

**Privacy Salt:** Critical. Evidence logs contain sensitive case/medical data. The hash must be salted to prevent "Guessing" case involvement.

## Authority Chain

**Pattern:** Sovereign

Law enforcement and forensic laboratories are statutory bodies with direct authority under evidence legislation to issue chain of custody confirmations.

```
✓ evidence.police.uk/chain/verify — Issues and verifies evidence transfer logs
```

Self-authorized — this is a sovereign body whose authority derives from statute.

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Compared With Blockchain (Vechain / Hyperledger)

| Feature | Live Verify | Enterprise Blockchain | Paper Logbook |
| :--- | :--- | :--- | :--- |
| **Field Access** | **Universal.** Any lawyer or clerk with a phone. | **Restricted.** Requires expensive "Node" access and memberships. | **Instant.** |
| **Trust Anchor** | **Domain-Bound.** Trust the Lab domain. | **Consensus-Bound.** Trust the network protocol. | **Visual.** Trusted only via signatures. |
| **Connectivity** | **Strong.** Works even if the global chain is down. | **Needed.** Requires a data connection at the scene, as a Live Verify check also does. | **Offline.** |
| **Auditability** | **High.** Creates a digital audit trail of scans. | **Very High.** Immutable ledger. | **Low.** Prone to "lost" books. |

**Where each fits:** an enterprise ledger gives the strongest audit trail where every party handling the evidence is a participant and connectivity is reliable. Custody often passes through places and people outside any such system, with a paper log that is always to hand. Live Verify lets a lawyer or clerk check a custody form against the laboratory's or agency's domain with a phone, and it can be used with a ledger where one is in place.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).

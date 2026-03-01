---
title: "Ballot Chain-of-Custody Transfer Forms"
category: "Government & Civic Documents"
volume: "Small"
retention: "Election cycle + 2-4 years"
slug: "ballot-chain-of-custody"
tags: ["election", "voting", "ballots", "chain-of-custody", "integrity", "democracy"]
furtherDerivations: 1
---

## What is a Ballot Transfer Form?

In an election, ballots are often driven from a local school (polling place) to a central counting facility. During that drive, the ballots are in a "Black Box" of risk.

The **Chain-of-Custody Form** is the paper that follows the box. It lists:
1.  **The Count:** "There are exactly 1,242 ballots in this box."
2.  **The Seal:** "The box is locked with Seal #AZ-009988."
3.  **The Witnesses:** Two people (one from each party) must sign it.

If a box arrives at the counting center with a different count or seal than what is on the verified form, the alarm is raised immediately.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <span verifiable-text="start" data-for="ballot">[</span>
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;">MARICOPA COUNTY ELECTIONS
Transfer Form #99228
═══════════════════════════════════════════════════════════════════

                   BALLOT CONTAINER TRANSFER

Origin:       Precinct 402 - North High School
Destination:  Central Tabulation Center

CONTAINER DETAILS
───────────────────────────────────────────────────────────────────
Container ID:                                           BOX-A-123
Seal Number:                                          AZ-00998877
Ballot Count:                                        1,242 Ballots

CUSTODIAN HANDOFF
───────────────────────────────────────────────────────────────────
Relinquished by:  John Miller (Poll Worker)
Received by:      Sarah Connor (Transport Deputy)
Timestamp:        Nov 3, 2026 - 8:15 PM MST

</pre>
  <span data-verify-line="ballot">verify:elections.maricopa.gov/custody/v</span> <span verifiable-text="end" data-for="ballot">]</span>
</div>

## Data Verified

Precinct number, Container ID, Seal Number (unique plastic/wire seal), ballot count (from machine or hand count), names of two bipartisan witnesses/custodians, precise timestamp, transfer location.

**Document Types:**
- **Transfer Log:** Used during transport from precinct to tabulation.
- **Drop Box Retrieval Form:** Documenting the 2-person pickup from ballot drop boxes.
- **Tabulation Intake Form:** Final receipt at the central counting facility.

## Data Visible After Verification

Shows the issuer domain (`maricopa.gov`, `miamidade.gov`) and the transfer status.

**Status Indications:**
- **Logged** — Origin precinct has recorded the transfer.
- **In-Transit** — Transport team has confirmed possession.
- **Received** — Central counting has verified the seal and count.
- **Seal Mismatch** — **ALERT:** Intake count or seal number does not match origin record.

## Second-Party Use

The **Election Official/Poll Worker** (second party) receives the transfer form from the county election department (first party), **keeps it**, and may later hand it to third parties for various reasons, or never do so.

**Personal Record:** The poll worker has their own verified copy of the ballot transfer. Most of the time, the document sits in election records—the verification value is latent, there *if needed*.

**Peace of Mind:** The poll worker can confirm at any time that the form matches what the county's system recorded and hasn't been altered since they completed it.

**Future Optionality:** If a recount occurs, an election challenge arises, or a legal dispute emerges about chain-of-custody, the poll worker has cryptographic proof ready without needing to contact the county election office.

## Third-Party Use

The election official/poll worker (second party) may hand the verified document to various third parties:

**Election Observers / Challengers**
Political party observers can scan the transfer forms as containers arrive at the central facility. Verification ensures the forms weren't "swapped" or "re-written" during the drive.

**Media / Journalists**
Fact-checking claims of "mysterious boxes appearing." Verified chain-of-custody proves where every box came from and when it was logged.

**The Courts**
In an election contest, verified custody forms provide a cryptographically solid audit trail that is harder to challenge than mere photocopies.

## Verification Architecture

**The "Ballot Box" Fraud Problem**

- **Box Substitution:** Swapping a box of real ballots for a box of fake ballots during transport. The seal numbers won't match the verified origin record.
- **Count Inflation:** Changing the count on the paper form from 1,000 to 1,200 to hide extra ballots.
- **Fabricated Transfers:** Creating a fake transfer form for a non-existent precinct.

**Issuer Types (First Party)**

- County Election Departments — The primary authorities
- Secretary of State — Overseeing the state-wide standards

**Privacy Salt:** Required. Ballot transfer forms contain enumerable values—predictable precinct numbers, sequential container IDs, standard seal number formats, and round ballot counts. A malicious actor could feasibly enumerate combinations to monitor or reverse-engineer ballot movement patterns across a jurisdiction. Salt protects the integrity and privacy of election logistics.

## Jurisdictional Witnessing

A jurisdiction may require county election departments to retain a **witnessing firm** for regulatory compliance. The witnessing firm:

- Receives all hashes from the county, and any subsequent changes to the payload as they happen—which may manifest as a new hash, a status change (in-transit, received, seal mismatch), or even a 404 (record deleted)
- Receives structured content/metadata (precinct numbers, container IDs, seal numbers, ballot counts, timestamps)
- Does **NOT** receive plaintext (poll worker names, specific addresses beyond public precinct locations)
- Provides an immutable, timestamped audit trail—available to the jurisdiction on demand, to poll workers/third parties during disputes, or as expert witness testimony in legal proceedings

This provides:
- **Non-repudiation:** County cannot deny issuing the transfer form
- **Timestamp proof:** Transfer occurred at a specific time
- **Regulatory audit:** State election oversight can inspect the witness ledger for chain-of-custody violations
- **Resilience:** Verification works even if county's election systems go down

**Public Blockchain (Non-Party)**

Witnessing firms may periodically commit rollups to an inexpensive public blockchain, providing an ultimate immutability guarantee. The blockchain is a "non-party"—infrastructure, not a participant in the transaction. This creates multiple verification paths:

1. **County election domain** — Direct check against the issuer
2. **Witnessing firm** — Independent confirmation with timestamp
3. **Public blockchain** — Decentralized trust anchor via rollup inclusion

## Competition vs. Central Portals / GPS

| Feature | Live Verify | Internal Election Portal | GPS Tracking on Trucks |
| :--- | :--- | :--- | :--- |
| **Observer Access** | **High.** External parties can verify without system access. | **Zero.** Observers are never given logins to sensitive gov systems. | **None.** Proves where the truck went, not what's in the box. |
| **Integrity** | **Binds Content.** Proves the *count* and *seal* numbers. | **Vulnerable.** Internal DB can be edited by admins. | **N/A.** |
| **Offline Proof** | **Strong.** Paper form works if the counting center Wi-Fi is jammed. | **None.** | **Weak.** Requires cell signal. |

**Why Live Verify wins here:** Trust through Decentralization. In a polarized election, the "Opposition" does not trust the government's internal database. Live Verify allows the opposition to verify the paper records against a public-facing domain without needing "Super-User" access to the voting system, creating a bipartisan trust bridge.

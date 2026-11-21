---
title: "Ballot Chain-of-Custody Transfer Forms"
category: "Government & Civic Documents"
volume: "Small"
retention: "Election cycle + 2-4 years"
slug: "ballot-chain-of-custody"
verificationMode: "clip"
tags: ["election", "voting", "ballots", "chain-of-custody", "integrity", "democracy"]
furtherDerivations: 1
---

## What is a Ballot Transfer Form?

In an election, ballots are often driven from a local school (polling place) to a central counting facility. During that drive, the ballots are in a "Black Box" of risk.

The Chain-of-Custody Form is the paper that follows the box. It lists:
1.  **The Count:** "There are exactly 1,242 ballots in this box."
2.  **The Seal:** "The box is locked with Seal #AZ-009988."
3.  **The Witnesses:** Two people (one from each party) must sign it.

If a box arrives at the counting center with a different count or seal than what is on the verified form, the alarm is raised immediately.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <span verifiable-text="start" data-for="ballot"></span>
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
  <span data-verify-line="ballot">verify:elections.maricopa.gov/custody/v</span> <span verifiable-text="end" data-for="ballot"></span>
</div>

## The Problem: Ballot Box Fraud

- **Box Substitution:** Swapping a box of real ballots for a box of fake ballots during transport. The seal numbers won't match the verified origin record.
- **Count Inflation:** Changing the count on the paper form from 1,000 to 1,200 to hide extra ballots.
- **Fabricated Transfers:** Creating a fake transfer form for a non-existent precinct.

## What Is Checked

Precinct number, Container ID, Seal Number (unique plastic/wire seal), ballot count (from machine or hand count), names of two bipartisan witnesses/custodians, precise timestamp, transfer location.

**Document Types:**
- **Transfer Log:** Used during transport from precinct to tabulation.
- **Drop Box Retrieval Form:** Documenting the 2-person pickup from ballot drop boxes.
- **Tabulation Intake Form:** Final receipt at the central counting facility.

## What the Checker Sees

Shows the issuer domain (`maricopa.gov`, `miamidade.gov`) and the transfer status.

**Status Indications:**
- **Logged** — Origin precinct has recorded the transfer.
- **In-Transit** — Transport team has confirmed possession.
- **Received** — Central counting has verified the seal and count.
- **Seal Mismatch** — Intake count or seal number does not match origin record.

## Who Holds It

The Election Official/Poll Worker (second party) receives the transfer form from the county election department (first party), keeps it, and may later hand it to third parties for various reasons, or never do so.

**Personal Record:** The poll worker has their own verified copy of the ballot transfer. Most of the time, the document sits in election records—the verification value is latent, there *if needed*.

**Peace of Mind:** The poll worker can confirm at any time that the form matches what the county's system recorded and hasn't been altered since they completed it.

**Future Optionality:** If a recount occurs, an election challenge arises, or a legal dispute emerges about chain-of-custody, the poll worker has cryptographic proof ready without needing to contact the county election office.

## Who Checks It

The election official/poll worker (second party) may hand the verified document to various third parties:

**Election Observers / Challengers**
Political party observers can scan the transfer forms as containers arrive at the central facility. Verification ensures the forms weren't "swapped" or "re-written" during the drive.

**Media / Journalists**
Fact-checking claims of "mysterious boxes appearing." Verified chain-of-custody proves where every box came from and when it was logged.

**The Courts**
In an election contest, verified custody forms provide a cryptographically solid audit trail that is harder to challenge than mere photocopies.

## Who Issues It

**Issuer Types (First Party)**

- County Election Departments — The primary authorities
- Secretary of State — Overseeing the state-wide standards

**Privacy Salt:** Required. Ballot transfer forms contain enumerable values—predictable precinct numbers, sequential container IDs, standard seal number formats, and round ballot counts. A malicious actor could feasibly enumerate combinations to monitor or reverse-engineer ballot movement patterns across a jurisdiction. Salt protects the integrity and privacy of election logistics.

## Authority Chain

**Pattern:** Sovereign

Administers election ballot custody and transfer records.

```
✓ elections.maryland.gov/verify — Administers election ballot custody and transfer records
  ✓ usa.gov/verifiers — US federal government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Compared With Central Portals / GPS

| Feature | Live Verify | Internal Election Portal | GPS Tracking on Trucks |
| :--- | :--- | :--- | :--- |
| **Observer Access** | **High.** External parties can verify without system access. | **Zero.** Observers are never given logins to sensitive gov systems. | **None.** Proves where the truck went, not what's in the box. |
| **Integrity** | **Binds Content.** Proves the *count* and *seal* numbers. | **Vulnerable.** Internal DB can be edited by admins. | **N/A.** |
| **Connectivity needed** | **Yes, for the check.** The paper form can be read without a connection; checking it takes one small web request over any data connection, at the time or later. | **Yes.** | **Yes.** Requires cell signal. |

**Where each fits:** the election office's internal system is the operational record, and GPS tracking tells officials where a vehicle went; both stay in place. Observers and party representatives are not given access to either, and should not need it. Live Verify lets them check the seal numbers and counts on a custody form against what the election office has published on its own domain. That confirms the office stands behind the form as written, and leaves the internal controls to the people responsible for them.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).

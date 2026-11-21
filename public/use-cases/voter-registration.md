---
title: "Voter Registration Confirmations"
category: "Government & Civic Documents"
volume: "Very Large"
retention: "Election cycle + 4 years"
slug: "voter-registration"
verificationMode: "clip"
tags: ["elections", "voter-id", "registration-card", "civic-duty", "voter-integrity", "government-records", "poll-worker-vetting", "democracy"]
furtherDerivations: 1
---

## What is a Voter Registration Card?

A Voter Registration Card (or Confirmation) is the official proof that a citizen is registered to vote in a specific jurisdiction. It lists the voter's name, address, party affiliation, and—crucially—their Precinct and Polling Place.

These cards are the "Ticket to the Ballot Box." Fraud is high-stakes: partisan actors or fraudsters might "edit" a registration card to show a fake address to illegally vote in a "swing" precinct, or they might create fake cards for non-citizens to bypass election security. Verified hashes bind the Voter Name, Precinct ID, and Home Address to the state's or the county's election domain (e.g., `sos.ca.gov` or `vote.county.org`).

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="vote"></span>VOTER REGISTRATION
STATE OF ILLINOIS - BOARD OF ELECTIONS
═══════════════════════════════════════════════════════════════════

Registered Voter:  SARAH JANE SMITH
                   123 MAPLE STREET, SPRINGFIELD, IL 62704

Voter ID:   99228877                     Precinct:   #42 (WARD 7)
Party:      INDEPENDENT                  Reg Date:   15 MAR 2026

POLLING PLACE: Springfield Library, 1st Ave Entrance

<span data-verify-line="vote">verify:elections.il.gov/v</span> <span verifiable-text="end" data-for="vote"></span></pre>
</div>

## The Problem: Phantom Voter Fraud

- **Address Swapping:** Changing a residence to a "Swing Precinct" on a PDF card to influence a local election.
- **Registration Fabrication:** Creating fake cards for non-existent people to "Stuff the Rolls."
- **Status Masking:** Presenting a "Cancelled" registration as if it were still "Active" to bypass ID requirements.

## What Is Checked

Voter ID number, voter name, residential address, party affiliation, precinct/ward ID, polling place location, registration date, status (Active/Inactive), date of last ballot cast (hash), issuing board name.

**Document Types:**
- **Voter Registration Card:** The wallet card for polling use.
- **Confirmation of Registration:** The letter sent to new voters.
- **Voter Information Pamphlet:** (Linked hash) specifically for the voter's precinct.
- **Absentee Ballot Application:** Proof of authorized request.

## What the Checker Sees

Shows the issuer domain (`sos.state.gov`, `vote.county.org`) and the voter standing.

**Status Indications:**
- **Active / Registered** — Voter is currently authorized to cast a ballot in this precinct.
- **Inactive** — Address needs verification; voter must re-confirm status.
- **Cancelled** — Registration has been terminated (e.g., moved out of state).
- **Unknown** — Hash not found; high risk of "Synthetic Voter" fraud.

## Who Holds It

The Voter (Citizen) benefits from verification.

**Polling Place Speed:** On Election Day, the voter scans their own card for the poll worker. "Verified by State Board" ensures the worker that the voter is in the correct precinct and has an active registration, removing the 10-minute "manual lookup" in the paper books.

**Address Proof:** A citizen can use their verified voter registration as a "Secondary Proof of Residency" when applying for local benefits, parking permits, or library cards, providing a higher level of trust than a utility bill.

## Who Checks It

**Poll Workers / Chief Judges**
**Integrity Vetting:** Before issuing a ballot, the worker scans the registration card. Verified hashes eliminate the risk of "Precinct Jumping" where a voter tries to use a fake card to vote in a different ward.

**State DMVs**
**Motor-Voter Audit:** Automatically verifying that "Voter Registration" data collected at the DMV matches the official Secretary of State record, ensuring the "Motor-Voter" process is accurate.

**Political Campaigns**
**Canvassing Integrity:** Campaigns can scan the "Voter List" provided by the state to ensure the people they are contacting are verified, active voters, improving the accuracy of their outreach.

## Who Issues It

**Issuer Types** (First Party)

**State Secretaries of State.**
**County Boards of Elections.**
**National Voter Registries (in some nations).**

**Privacy Salt:** Highly Critical. Voter PII and party affiliation are sensitive democratic data. The hash must be salted to prevent "Mass Roster Scraping" or political targeting by bad actors.

## Authority Chain

**Pattern:** Sovereign

Electoral commissions and boards hold statutory authority under election law to maintain voter registries and issue registration confirmations.

```
✓ electoralcommission.org.uk/registration/verify — Issues voter registration confirmations
```

Self-authorized — this is a sovereign body whose authority derives from statute.

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Rationale

Voter registration is the "Trust Link" of democracy. By turning registration cards into verifiable digital bridges, we ensure that "One Person, One Vote" is backed by cryptographic proof, protecting the integrity of the ballot box and building public trust in elections.

## Further Reading

[Deep dive: Voting Proof](https://github.com/live-verify/live-verify/tree/main/deep-dives/Voting_Proof.md)

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).

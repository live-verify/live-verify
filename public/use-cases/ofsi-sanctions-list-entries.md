---
title: "OFSI Sanctions List Entries"
category: "Financial Compliance"
volume: "Large"
retention: "Indefinite (public record, continuously updated)"
slug: "ofsi-sanctions-list-entries"
verificationMode: "clip"
tags: ["ofsi", "sanctions", "designated-persons", "hm-treasury", "consolidated-list", "screening", "compliance", "uk-sanctions"]
furtherDerivations: 0
---

## What is an OFSI Sanctions List Entry?

OFSI maintains the **UK Sanctions List** — the authoritative register of designated persons (individuals and entities) subject to financial sanctions. Fund managers, banks, and payment processors must screen all clients and counterparties against this list. The list is published as a downloadable dataset (CSV/XML) and as individual entries on the OFSI website.

Currently, screening tools download the list in bulk and run matches locally. But the list entries themselves have no individual verification mechanism. A screening provider could use a stale or modified version of the list. A corrupt compliance officer could delete entries from the local copy before running a screen. Individual verifiable list entries would allow anyone to confirm that a specific designation is current and authentic.

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 1px solid #1a237e; background: #fff; padding: 0;">
  <div style="background: #1a237e; color: #fff; padding: 15px;">
    <div style="font-weight: bold; font-size: 1.1em;"><span verifiable-text="start" data-for="ofsilst">[</span>UK SANCTIONS LIST — OFSI</div>
    <div style="font-size: 0.8em;">Consolidated List Entry</div>
  </div>
  <div style="padding: 20px; font-size: 0.9em; line-height: 1.6;">
    <p><strong>List Entry ID:</strong> UKS-IND-2024-08847<br>
    <strong>Last Updated:</strong> 22 February 2026<br>
    <strong>Regime:</strong> Russia (Sanctions) (EU Exit) Regulations 2019</p>
    <div style="background: #fff5f5; padding: 15px; margin: 15px 0; border: 1px solid #e53935;">
      <p style="margin: 0; font-weight: bold;">DESIGNATED PERSON</p>
      <p style="margin: 10px 0 0;"><strong>Name:</strong> PETROV, Dmitri Arkadyevich</p>
      <p style="margin: 5px 0 0;"><strong>DOB:</strong> 14 July 1968</p>
      <p style="margin: 5px 0 0;"><strong>Nationality:</strong> Russian</p>
      <p style="margin: 5px 0 0;"><strong>Position:</strong> Board member, Russkiy Kapital Bank</p>
      <p style="margin: 5px 0 0;"><strong>Designation Date:</strong> 15 March 2024</p>
    </div>
    <p style="font-size: 0.85em; color: #666;">Asset freeze and travel ban in effect.<br>
    Statement of reasons: Involved in destabilising Ukraine.</p>
    <div style="margin-top: 15px; font-size: 0.8em; font-family: monospace; text-align: center; color: #666; border-top: 1px dashed #ccc; padding-top: 10px;">
      <div data-verify-line="ofsilst" style="font-family: 'Courier New', monospace; font-size: 0.85em; color: #555;">
        verify:ofsi.hm-treasury.gov.uk/sanctions-list <span verifiable-text="end" data-for="ofsilst">]</span>
      </div>
    </div>
  </div>
</div>

## Data Verified

List entry ID, designated person name and aliases, date of birth, nationality, designation regime, designation date, last update date, statement of reasons summary, sanctions measures in effect (asset freeze, travel ban, arms embargo, etc.).

## Data Visible After Verification

**Status Indications:**
- **Designated** — Person/entity is currently subject to sanctions
- **Varied** — Designation has been amended (e.g., additional aliases, updated information)
- **Suspended** — Designation temporarily suspended (rare)
- **Delisted** — Person/entity has been removed from the sanctions list
- **Under Review** — Designation is being reviewed following a challenge

## Why This Matters

**List integrity is the foundation of sanctions compliance.** Every screening operation assumes the list is authentic and current. Three attack vectors exist:

1. **Stale lists:** A screening provider runs against a list that's weeks old. A person designated yesterday clears the screen today.
2. **Tampered lists:** A corrupt compliance officer removes an entry from the local list copy before screening a client they want to onboard.
3. **List version disputes:** After a sanctions breach, the firm claims "that person wasn't on the list when we screened them." Without verifiable timestamps on individual entries, this is hard to disprove.

Individual verifiable list entries solve all three: the screening tool can confirm each entry against OFSI's live endpoint, with a timestamp proving the designation was active at the time of screening.

## Second-Party Use

**Screening providers** (World-Check, Dow Jones, ComplyAdvantage) — Proving their list mirrors OFSI's authoritative data. Each entry hash in their local copy can be verified against OFSI's endpoint.

**Fund managers** — Supplementing batch screening with spot-checks. If a client's name is close to a designated person, the fund manager can verify the specific list entry directly.

## Third-Party Use

**FCA supervisors** — During thematic reviews, verifying that the screening tools firms use contain the complete, current list.

**Correspondent banks** — When processing a payment flagged by screening, verifying the specific list entry that triggered the match.

**Legal counsel** — In sanctions breach litigation, proving the designation was (or was not) in effect at a specific point in time.

**Designated persons themselves** — Challenging their designation with evidence of delisting or variation.

## Verification Architecture

**The Problem:**
- Stale local copies of the sanctions list missing recent designations
- Tampered lists with entries removed to enable compliance fraud
- Disputes about whether a person was designated at the time of a transaction
- Screening providers with inconsistent or incomplete list coverage

**The Fix:** Each list entry is individually hashable with a version timestamp. Screening tools can verify entries in real-time or in batch. The timestamp in the verification response proves the entry was current at a specific moment.

**Batch verification:** A screening provider could verify their entire local list nightly by hashing each entry and checking against OFSI's endpoint. Any mismatches indicate stale or tampered data.

## Authority Chain

**Pattern:** Government Direct

OFSI publishes the UK Sanctions List under statutory authority.

```
✓ ofsi.hm-treasury.gov.uk/sanctions-list — Maintains the UK Consolidated Sanctions List
  ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Jurisdictional Equivalents

| | UK | US | EU |
|---|---|---|---|
| **Authority** | OFSI (HM Treasury) | OFAC (US Treasury) | European Commission / Council |
| **Document** | UK Sanctions List (Consolidated List) entry | Specially Designated Nationals (SDN) List entry | EU Consolidated Financial Sanctions List entry |
| **Legal basis** | SAMLA 2018; regime-specific regulations | IEEPA; regime-specific Executive Orders | EU Council Regulations (e.g., Reg 269/2014) |
| **Potential verify: domain** | `ofsi.hm-treasury.gov.uk/sanctions-list` | `ofac.treasury.gov/sdn-list` | `sanctions.europa.eu/list` |
| **Key difference** | ~3,800 entries; UK-specific post-Brexit list diverging from EU | ~12,000 SDN entries; extraterritorial reach via USD transactions; includes secondary sanctions | Single EU-wide list but each member state responsible for enforcement; ~2,000 entries |

## Jurisdictional Witnessing

A jurisdiction may require the issuer to retain a **witnessing firm** for regulatory compliance. The witnessing firm:

- Receives all hashes from the issuer, and any subsequent changes to the payload as they happen—which may manifest as a new hash, a status change, or even a 404 (record deleted)
- Receives structured content/metadata (key identifiers and dates)
- Does **NOT** receive plaintext or sensitive personal information
- Provides an immutable, timestamped audit trail—available to the jurisdiction on demand, to document holders/third parties during disputes, or as expert witness testimony in legal proceedings

This provides:
- **Non-repudiation:** OFSI cannot deny publishing the designation
- **Timestamp proof:** Entry existed on the list at a specific time
- **Regulatory audit:** Jurisdictions can inspect the witness ledger for list completeness
- **Resilience:** Verification works even if issuer's systems go down

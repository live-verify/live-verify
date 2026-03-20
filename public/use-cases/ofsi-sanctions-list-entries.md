---
title: "OFSI Sanctions List Entries"
category: "Financial Compliance"
volume: "Large"
retention: "Indefinite (public record, continuously updated)"
slug: "ofsi-sanctions-list-entries"
verificationMode: "clip"
tags: ["ofsi", "sanctions", "designated-persons", "hm-treasury", "consolidated-list", "screening", "compliance", "uk-sanctions"]
furtherDerivations: 1
---

## What is an OFSI Sanctions List Entry?

OFSI maintains the **UK Sanctions List** — the authoritative register of designated persons (individuals and entities) subject to financial sanctions. Fund managers, banks, and payment processors must screen all clients and counterparties against this list. The list is published as a downloadable dataset (CSV/XML) and as individual entries on the OFSI website.

Currently, screening tools download the list in bulk and run matches locally. But the list entries themselves have no individual verification mechanism. A screening provider could use a stale or modified version of the list. A corrupt compliance officer could delete entries from the local copy before running a screen. Individual verifiable list entries would allow anyone to confirm that a specific designation is current and authentic.

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 1px solid #1a237e; background: #fff; padding: 0;">
  <div style="background: #1a237e; color: #fff; padding: 15px;">
    <div style="font-weight: bold; font-size: 1.1em;"><span verifiable-text="start" data-for="ofsilst"></span>UK SANCTIONS LIST — OFSI</div>
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
        <span data-verify-line="ofsilst">verify:ofsi.hm-treasury.gov.uk/sanctions-list</span> <span verifiable-text="end" data-for="ofsilst"></span>
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

**Further Jurisdictional Peers**

- **Australia (DFAT)** — DFAT maintains the *Consolidated List* of persons and entities subject to sanctions under the *Autonomous Sanctions Act 2011* and the *Charter of the United Nations Act 1945*. The list includes both UN-mandated designations and Australia's autonomous sanctions. Key difference: Australia's autonomous sanctions list is smaller than the UK's, but uniquely includes "Magnitsky-style" thematic sanctions under the *Autonomous Sanctions (Thematic Sanctions) Amendment Act 2021*.
- **Canada (OSFI)** — The Office of the Superintendent of Financial Institutions publishes the *Consolidated Canadian Autonomous Sanctions List* under the *Special Economic Measures Act (SEMA)*, the *Justice for Victims of Corrupt Foreign Officials Act*, and the *United Nations Act*. Key difference: Canada's list includes both autonomous and UN-mandated designations in a single consolidated format; OSFI requires financial institutions to report matches within a specific timeframe.
- **Singapore (MAS)** — MAS implements UN Security Council sanctions designations through the *Monetary Authority of Singapore (Sanctions and Freezing of Assets of Persons)* Regulations. Singapore does not maintain a significant autonomous sanctions list. Key difference: Singapore's list is almost entirely UN-derived — it has limited autonomous sanctions powers, relying instead on its position as a FATF member and regional financial hub to enforce compliance.
- **Switzerland (SECO)** — SECO maintains a *Consolidated List* under the *Embargo Act (EmbA)* and specific country ordinances. Switzerland generally aligns with EU sanctions but implements them through its own legal framework. Key difference: as a non-EU state, Switzerland's list diverges slightly from the EU's — there are timing gaps when EU sanctions are adopted and Swiss-specific exceptions for humanitarian purposes and ongoing contracts.
- **Japan (MOF/METI)** — The Ministry of Finance and the Ministry of Economy, Trade and Industry maintain the *FEFTA (Foreign Exchange and Foreign Trade Act) Lists* of designated persons subject to asset freezes and trade controls. Key difference: Japan's lists are published by two separate ministries (MOF for financial, METI for trade), creating a split-list structure that requires screening against both; Japan has increased its autonomous designations significantly since 2022.

**Counter-Terrorist Financing (CTF)**

Sanctions designations are a primary CTF tool — terrorist designation lists operate under separate legal frameworks from general sanctions, with different evidentiary thresholds and enforcement agencies.

- **UK:** Proscription of terrorist organisations under the *Terrorism Act 2000* is separate from OFSI financial sanctions. Asset freezing under the *Anti-Terrorism, Crime and Security Act 2001 (ATCSA)* and the *Counter-Terrorism Act 2008* targets terrorist financing specifically — HM Treasury freezes assets while the Home Office manages proscription.
- **US:** *Executive Order 13224* blocks terrorist property under a distinct regime from country-based sanctions. Material support statutes (*18 USC §2339A/B*) criminalise any resources to designated terrorist organisations. OFAC's SDN list includes terrorist designations alongside other sanctions, but terrorist entries carry strict liability.
- **EU:** The *EU Terrorist List (Common Position 931/2001)* operates as a parallel designation system to EU sanctions regulations — CP 931 is a political instrument updated by the Council, while asset freezing is implemented through separate EU regulations.
- **Australia:** *Criminal Code Act 1995 Division 102* provides for listing terrorist organisations (separate from DFAT autonomous sanctions). AUSTRAC has specific terrorism financing reporting obligations under the *AML/CTF Act 2006*.
- **Singapore/Japan/Switzerland:** Singapore's *Terrorism (Suppression of Financing) Act 2002* and MAS terrorism financing notices; Japan's *Act on Punishment of Financing of Offences of Public Intimidation (2002)* with PSC (Public Security Commission) terrorist lists; Switzerland's *Federal Act on the Freezing of Assets* and Taliban/ISIL-specific ordinances with MROS terrorism financing reports.

**Sanctions Evasion**

Sanctions designations are only effective if evasion is detected — designated persons and entities employ sophisticated techniques to circumvent list-based controls that go well beyond simple name changes.

- **Common evasion techniques:** Nominee structures (hiding beneficial ownership behind associates and family members), complex corporate layering across multiple jurisdictions, flag-hopping (vessels changing registry to obscure ownership), trade-based laundering through mispriced goods, and cryptocurrency as an emerging circumvention channel.
- **US (OFAC 50% rule):** Entities owned 50% or more by designated persons are themselves blocked property — even without separate designation. Evasion commonly involves restructuring ownership to fall just below the 50% threshold on paper while retaining de facto control through side agreements or trusted intermediaries.
- **UK (OFSI):** OFSI published sanctions evasion typologies in its 2023 guidance, identifying patterns similar to OFAC's experience — but the UK has been slower to bring enforcement actions for evasion, creating an expectations gap between designation policy and enforcement reality.
- **EU (Freeze and Seize Task Force):** Established in 2022 to coordinate sanctions enforcement across 27 member states. The proposed Centralised Register of Beneficial Ownership aims to close corporate layering loopholes, but implementation varies significantly across member states.
- **Ship-to-ship transfers:** A key evasion method for oil sanctions targeting Russia, Iran, and North Korea. Vessels disable AIS transponders, transfer cargo at sea, and use forged bills of lading — detection requires maritime tracking, port state enforcement, and coordination between naval and financial authorities.
- **Crypto sanctions evasion:** OFAC designated cryptocurrency addresses (notably Tornado Cash, 2022) and wallet identifiers linked to designated persons. This is an emerging enforcement frontier — blockchain analytics firms now provide screening tools, but the speed and pseudonymity of crypto transactions outpace traditional list-based controls.

**Unexplained Wealth & Asset Recovery**

- **Asset recovery nexus:** Sanctions designations freeze assets as a first step — but asset recovery (permanent confiscation and return) requires separate legal proceedings. The gap between freezing and recovery is a major policy challenge.
- **UK:** Sanctions and Anti-Money Laundering Act 2018 (SAMLA) freezing + Proceeds of Crime Act 2002 civil recovery — two separate legal tracks; OFSI freezes, NCA pursues recovery.
- **US:** OFAC freezing + DOJ civil forfeiture (18 USC §981). Recent innovation: using sanctions violations as predicate offences for criminal forfeiture. Russia-related Kleptocapture Task Force (est. 2022).
- **EU:** Freeze and Seize Task Force (est. 2022) — first EU-wide coordination of sanctions asset freezing. Proposed directive would allow confiscation of frozen Russian state assets (controversial under international law).
- **Canada:** Special Economic Measures Act (SEMA) freezing + proposed IRFAA (International Repurposing and Forfeiture of Assets Act) — would allow seized assets to be repurposed for reconstruction (Ukraine-focused).
- **Switzerland:** Over CHF 7.5B in Russian assets frozen; Federal Council can freeze but confiscation requires criminal proceedings — legal debate ongoing.
- **International:** REPO (Russian Elites, Proxies and Oligarchs) Task Force — multilateral coordination between G7+ on sanctions-related asset freezing and recovery.

**Proliferation Financing**

A significant proportion of sanctions designations relate to WMD proliferation — Iran (nuclear program) and North Korea (nuclear/missile programs) are the primary proliferation sanctions regimes. Proliferation-related designations require different risk indicators than general financial sanctions.

- **FATF:** Recommendation 7 (targeted financial sanctions related to proliferation) + updated 2020 guidance on counter-proliferation financing; mutual evaluations now assess PF controls separately from AML/CTF.
- **UK:** SAMLA 2018 implements UN proliferation sanctions; OFSI administers Iran and DPRK sanctions regimes separately from counter-terrorism designations; Export Control Order 2008 covers dual-use goods.
- **US:** OFAC administers Iran/DPRK sanctions (IEEPA-based); BIS (Bureau of Industry and Security) Entity List covers proliferation-related export controls; separate from SDN terrorism designations; Iran Freedom Support Act, CISADA, CAATSA.
- **EU:** EU Council Regulations implement UNSCR 1718 (DPRK) and UNSCR 2231 (Iran); EU adds autonomous proliferation designations beyond UN requirements.
- **Australia:** *Weapons of Mass Destruction (Prevention of Proliferation) Act 1995*; DFAT administers UN proliferation sanctions; AUSTRAC guidance on PF indicators.
- **Japan:** *Foreign Exchange and Foreign Trade Act (FEFTA)* — Japan's proximity to North Korea makes PF enforcement a national security priority; METI administers export controls on dual-use goods; Japan is a founding member of all major export control regimes (NSG, MTCR, Wassenaar, Australia Group).
- **Singapore:** *Strategic Goods (Control) Act 2002* — Singapore as a major trade hub has robust dual-use goods controls; Singapore Customs enforces; MAS PF screening requirements.
- **Switzerland:** *Goods Control Act (GKG)*; SECO administers proliferation sanctions; Swiss financial institutions must screen against proliferation-specific lists.
- **South Korea:** *Foreign Trade Act* + Strategic Trade Controls; Korea Strategic Trade Institute (KOSTI) — proximity to DPRK drives extensive PF controls; unique position as both enforcer and potential target.

## Jurisdictional Witnessing (Optional)

Some jurisdictions, contracts, or multi-party workflows may add an independent witness layer. When used, the witnessing firm:

- Receives all hashes from the issuer, and any subsequent changes to the payload as they happen—which may manifest as a new hash, a status change, or even a 404 (record deleted)
- Receives structured content/metadata (key identifiers and dates)
- Does **NOT** receive plaintext or sensitive personal information
- Provides an immutable, timestamped audit trail—available to the jurisdiction on demand, to document holders/third parties during disputes, or as expert witness testimony in legal proceedings

This provides:
- **Non-repudiation:** OFSI cannot deny publishing the designation
- **Timestamp proof:** Entry existed on the list at a specific time
- **Regulatory audit:** Jurisdictions can inspect the witness ledger for list completeness
- **Resilience:** Verification works even if issuer's systems go down

---
title: "OFSI Licence Authorisations"
category: "Financial Compliance"
volume: "Small"
retention: "6 years minimum (SAMLA 2018 / MLR 2017)"
slug: "ofsi-licence-authorisations"
verificationMode: "clip"
tags: ["ofsi", "sanctions", "licence", "frozen-funds", "hm-treasury", "financial-crime", "compliance", "uk-sanctions"]
furtherDerivations: 1
---

## What is an OFSI Licence Authorisation?

When a firm holds funds belonging to a **designated person** (someone on the UK sanctions list), those funds are frozen by law. But sometimes there are legitimate reasons to release some of those funds — paying legal fees, meeting basic living expenses, or winding down a position. The firm must apply to **OFSI** (Office of Financial Sanctions Implementation, part of HM Treasury) for a **licence** authorising the specific transaction.

OFSI issues a licence letter specifying exactly what's permitted: the amount, the purpose, the conditions, and the expiry date. This licence is critical evidence during FCA audits — it proves the firm didn't just unilaterally release sanctioned funds. Currently it's a PDF letter with no verification mechanism. A fund manager could fabricate or alter a licence to justify an unauthorised release.

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 1px solid #1a237e; background: #fff; padding: 0;">
  <div style="background: #1a237e; color: #fff; padding: 15px;">
    <div style="font-weight: bold; font-size: 1.1em;"><span verifiable-text="start" data-for="ofsilicence"></span>HM TREASURY — OFSI</div>
    <div style="font-size: 0.8em;">Office of Financial Sanctions Implementation</div>
  </div>
  <div style="padding: 20px; font-size: 0.9em; line-height: 1.6;">
    <p><strong>LICENCE UNDER THE RUSSIA (SANCTIONS) (EU EXIT) REGULATIONS 2019</strong></p>
    <p><strong>Licence Reference:</strong> INT/2026/1847293<br>
    <strong>Date of Issue:</strong> 14 March 2026<br>
    <strong>Licence Holder:</strong> Albion Capital Management LLP<br>
    <strong>Designated Person:</strong> [Name redacted — see restricted annex]</p>
    <div style="background: #f5f5ff; padding: 15px; margin: 15px 0; border: 1px solid #3949ab;">
      <p style="margin: 0;"><strong>Authorised Activity:</strong></p>
      <p style="margin: 5px 0 0;">Payment of legal fees to Clifford Chance LLP</p>
      <p style="margin: 5px 0 0;"><strong>Maximum Amount:</strong> GBP 75,000.00</p>
      <p style="margin: 5px 0 0;"><strong>Expiry:</strong> 14 June 2026</p>
    </div>
    <p style="font-size: 0.85em; color: #666;">Subject to conditions in the attached annex.<br>
    Issued by: Financial Sanctions Officer, OFSI</p>
    <div style="margin-top: 15px; font-size: 0.8em; font-family: monospace; text-align: center; color: #666; border-top: 1px dashed #ccc; padding-top: 10px;">
      <div data-verify-line="ofsilicence" style="font-family: 'Courier New', monospace; font-size: 0.85em; color: #555;">
        <span data-verify-line="ofsilicence">verify:ofsi.hm-treasury.gov.uk/licences</span> <span verifiable-text="end" data-for="ofsilicence"></span>
      </div>
    </div>
  </div>
</div>

## Data Verified

Licence reference number, date of issue, licence holder name, designated person reference (redacted or hashed), regulation under which licence is granted, authorised activity description, maximum amount and currency, expiry date, issuing officer.

## Data Visible After Verification

**Status Indications:**
- **Active** — Licence is current and the authorised activity may proceed
- **Expired** — Licence has passed its expiry date
- **Revoked** — OFSI has withdrawn the licence (e.g., conditions breached)
- **Superseded** — A new licence has replaced this one (e.g., amended conditions)
- **Exhausted** — The maximum authorised amount has been fully drawn

## Why This Matters

During an FCA informal audit, the supervisor asks: "You released £75,000 from a frozen account — show me the OFSI licence." The fund manager produces the licence letter. Currently the FCA auditor must phone OFSI or email to confirm it's genuine. With a `verify:` line, the auditor scans the letter and gets instant confirmation from `ofsi.hm-treasury.gov.uk`.

**The fabrication risk is real:** A corrupt compliance officer could forge an OFSI licence to justify releasing sanctioned funds to themselves or an associate. The amounts involved are often substantial (legal fees, wind-down costs for entire portfolios). Verified hashes eliminate this vector entirely.

## Second-Party Use

**Fund managers / banks** — Proving to FCA that their release of frozen funds was authorised. The licence is their legal shield.

**Solicitors** — Law firms receiving payment from frozen funds need to confirm the licence is genuine before accepting the money (or they risk handling proceeds of sanctions evasion).

## Third-Party Use

**FCA supervisors** — During thematic reviews of sanctions compliance, scanning licence letters across multiple firms to confirm all releases were genuinely authorised.

**Correspondent banks** — When processing a payment that touches frozen funds, the correspondent bank needs to see a verified OFSI licence before allowing the wire.

**Auditors** — External auditors reviewing sanctions compliance can verify licence authenticity without contacting OFSI directly.

## Verification Architecture

**The Problem:**
- Forged licences justifying unauthorised release of frozen funds
- Altered conditions (changing the amount, extending the expiry, widening the permitted activity)
- Using an expired or revoked licence as if it were still active
- Fabricating a licence retrospectively after an unauthorised release

**The Fix:** OFSI hashes each licence at time of issue. Any alteration to the reference number, amount, conditions, or expiry produces a different hash that won't verify. Revocation is reflected by changing the status to "Revoked." The FCA auditor gets real-time confirmation without phoning OFSI.

## Authority Chain

**Pattern:** Government Direct

OFSI is part of HM Treasury and issues licences under statutory authority.

```
✓ ofsi.hm-treasury.gov.uk/licences — Issues sanctions licences under SAMLA 2018
  ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Jurisdictional Equivalents

| | UK | US | EU |
|---|---|---|---|
| **Authority** | OFSI (HM Treasury) | OFAC (US Treasury) | Member state competent authority (e.g., BaFin, Direction du Trésor, Banca d'Italia) |
| **Document** | OFSI Licence | OFAC Specific Licence | National exemption/authorisation |
| **Legal basis** | SAMLA 2018; regime-specific regulations | IEEPA; regime-specific Executive Orders | EU Council Regulations (e.g., Reg 269/2014 for Russia) |
| **Potential verify: domain** | `ofsi.hm-treasury.gov.uk/licences` | `ofac.treasury.gov/licences` | `sanctions.bafin.de/licences` (varies by state) |
| **Key difference** | Single UK-wide authority | OFAC has extraterritorial reach — non-US firms dealing in USD need OFAC licences too | Each member state issues its own licences; no single EU-wide licensing body (though the EU Sanctions Coordinator may evolve this role) |

**Further Jurisdictional Peers**

- **Australia (DFAT)** — The Department of Foreign Affairs and Trade administers sanctions licensing under the *Autonomous Sanctions Act 2011* and *Charter of the United Nations Act 1945*. Permit applications are made to the Minister for Foreign Affairs. Key difference: Australia's regime is smaller in scope than the UK's, with fewer designated persons, and licences are called "sanctions permits."
- **Canada (GAC)** — Global Affairs Canada issues permits under the *Special Economic Measures Act (SEMA)* and the *Justice for Victims of Corrupt Foreign Officials Act (Sergei Magnitsky Law)*. Permits are granted by the Minister of Foreign Affairs. Key difference: Canada's regime closely mirrors the UK/US model but with lower volume; permits are published in the *Canada Gazette*.
- **Singapore (MAS)** — The Monetary Authority of Singapore may grant exemptions from asset-freezing requirements under the *Monetary Authority of Singapore (Sanctions and Freezing of Assets of Persons — DPRK/Iran/etc.) Regulations*. Key difference: exemptions are narrower in scope, typically limited to basic expenses and legal fees; MAS coordinates with the Ministry of Foreign Affairs.
- **Switzerland (SECO)** — The State Secretariat for Economic Affairs issues licences under the *Embargo Act (EmbA)* and specific annexes to the *Ordinance on Measures against [Country]*. Key difference: Switzerland's neutral status creates unique dynamics — Swiss banks hold significant sanctioned assets, making the licensing regime particularly active despite Switzerland not being an EU member.
- **Japan (METI/MOF)** — The Ministry of Economy, Trade and Industry (METI) and Ministry of Finance (MOF) administer export and asset-freeze licences under the *Foreign Exchange and Foreign Trade Act (FEFTA)*. Key difference: Japan's sanctions licensing is split between METI (trade/export) and MOF (financial), requiring coordination between two ministries for complex cases.

**Counter-Terrorist Financing (CTF)**

Licensing the release of terrorist-frozen funds operates under distinct legal frameworks from general sanctions licensing, with additional national security oversight and stricter conditions.

- **UK:** Licences to release funds frozen under *ATCSA 2001* (terrorist asset freezing) are legally distinct from SAMLA sanctions licences. The *Terrorism Act 2000 ss.16-18* criminalises use of terrorist property — even licensed releases require coordination with counter-terrorism policing.
- **US:** OFAC licences under *Executive Order 13224* for terrorism-designated regions face acute tension with humanitarian access. Humanitarian exemptions for terrorism-designated areas (Syria, Afghanistan, Yemen) are a major live policy debate — far more contested than general sanctions licensing.
- **EU:** Post-2022 reforms introduced humanitarian carve-outs for EU terrorist asset freezing regulations, partly in response to the Afghanistan and Syria crises. These exemptions are narrower and more politically sensitive than general sanctions licensing.
- **Humanitarian carve-outs** are the defining CTF licensing challenge: unlike general sanctions (where licensing is routine for wind-down, legal fees, etc.), CTF licensing must balance national security concerns against humanitarian law obligations — a policy area still actively evolving across all major jurisdictions.

**Sanctions Evasion**

Sanctions evasion through licensing abuse is a distinct threat from money laundering — it involves exploiting the licensing mechanism itself to circumvent asset freezes and trade restrictions.

- **Licensing fraud typologies:** Fraudulent licence applications with fabricated supporting documents, altered licence conditions (inflating amounts, extending expiry dates, widening permitted activities), presenting expired or revoked licences as current, and using a licence granted for one purpose (e.g., legal fees) to justify a broader release of funds.
- **US (OFAC):** OFAC has extraterritorial reach — non-US firms dealing in USD require OFAC specific licences in addition to domestic authorisations. Secondary sanctions risk means firms that transact with licensed entities in one jurisdiction may still face OFAC penalties if USD clears through US correspondent banks.
- **EU:** Circumvention reporting obligation under EU Regulation 2022/576 requires firms to report attempts to circumvent sanctions, including through licensing abuse. This creates a positive duty to flag suspicious licence usage, not merely to comply with one's own licence conditions.
- **Trade-based evasion:** Goods and technology sanctions (dual-use items under the Wassenaar Arrangement) require export licences — a parallel but distinct licensing ecosystem. Firms may exploit gaps between financial sanctions licences (OFSI/OFAC) and export control licences (ECJU/BIS) to move restricted goods under the guise of licensed financial activity.
- **Humanitarian exemptions:** UN Security Council Resolution 2664 (2022) created a standing humanitarian carve-out for UN-listed persons. Licensing frameworks must now distinguish humanitarian from commercial transactions — evasion actors exploit this ambiguity by routing commercial flows through humanitarian channels.

**Unexplained Wealth & Asset Recovery**

- **Asset recovery nexus:** Sanctions licences authorise limited release of frozen assets — the licensing decision is a gatekeeper between asset freezing and potential asset dissipation. Fraudulent licences undermine the entire asset recovery framework.
- **UK:** OFSI licences must be reconciled with any parallel NCA civil recovery proceedings — releasing assets to a designated person may conflict with a recovery order.
- **US:** OFAC licences + DOJ forfeiture — complex interaction when frozen assets are subject to both sanctions licensing and civil forfeiture proceedings.
- **Repurposing debate:** G7 discussions on using frozen Russian sovereign assets (or their income) for Ukraine reconstruction — licensing frameworks may need to evolve to enable "repurposing" as a new category distinct from release.

**Proliferation Financing**

Licences under proliferation sanctions regimes (Iran, DPRK) carry additional conditions not present in general sanctions licences — end-use monitoring, inspection rights, and catch-all controls on unlisted goods that could contribute to WMD programs.

- **UK:** OFSI issues licences under *Iran (Sanctions) (EU Exit) Regulations 2019* and North Korea sanctions regulations; separate from general SAMLA licensing; requires coordination with ECJU for goods/technology components.
- **US:** OFAC Iran/DPRK licences have specific conditions; BIS export licences for dual-use goods to proliferation-concern countries require end-use certificates and may include post-shipment verification.
- **UN:** UNSCR 1718 Committee (DPRK) and JCPOA procurement channel (Iran, though currently suspended) — international licensing/approval mechanisms for specific proliferation-sensitive goods.
- **Key distinction:** Proliferation licensing requires technical assessment of goods/technology — not just financial controls; licensing decisions involve export control experts, intelligence agencies, and sometimes international bodies (IAEA).

## Jurisdictional Witnessing (Optional)

Some jurisdictions, contracts, or multi-party workflows may add an independent witness layer. When used, the witnessing firm:

- Receives all hashes from the issuer, and any subsequent changes to the payload as they happen—which may manifest as a new hash, a status change, or even a 404 (record deleted)
- Receives structured content/metadata (key identifiers and dates)
- Does **NOT** receive plaintext or sensitive personal information
- Provides an immutable, timestamped audit trail—available to the jurisdiction on demand, to document holders/third parties during disputes, or as expert witness testimony in legal proceedings

This provides:
- **Non-repudiation:** Issuer cannot deny issuing the licence
- **Timestamp proof:** Licence existed at a specific time
- **Regulatory audit:** Jurisdictions can inspect the witness ledger for fraud detection
- **Resilience:** Verification works even if issuer's systems go down

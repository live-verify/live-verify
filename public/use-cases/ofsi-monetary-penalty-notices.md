---
title: "OFSI Monetary Penalty Notices"
category: "Financial Compliance"
volume: "Very Small"
retention: "Indefinite (public record)"
slug: "ofsi-monetary-penalty-notices"
verificationMode: "clip"
tags: ["ofsi", "sanctions", "penalty", "enforcement", "hm-treasury", "compliance", "uk-sanctions", "due-diligence"]
furtherDerivations: 0
---

## What is an OFSI Monetary Penalty Notice?

When a firm breaches financial sanctions — even inadvertently — OFSI can impose a **civil monetary penalty** without criminal prosecution. Since 2017, OFSI has operated a strict liability regime: you don't need to know you were dealing with a sanctioned person to be penalised. Penalties can run into millions of pounds.

OFSI publishes penalty notices on its website, but they're static PDFs. A verified penalty notice would allow counterparties, correspondents, and investors to instantly confirm whether a firm has been penalised for sanctions breaches — critical information for due diligence on business partners.

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 2px solid #b71c1c; background: #fff; padding: 0;">
  <div style="background: #b71c1c; color: #fff; padding: 15px;">
    <div style="font-weight: bold; font-size: 1.1em;"><span verifiable-text="start" data-for="ofspenalty"></span>HM TREASURY — OFSI</div>
    <div style="font-size: 0.8em;">Monetary Penalty Notice</div>
  </div>
  <div style="padding: 20px; font-size: 0.9em; line-height: 1.6;">
    <p><strong>Case Reference:</strong> OFSI/ENF/2026/0042<br>
    <strong>Date of Notice:</strong> 7 March 2026<br>
    <strong>Person Penalised:</strong> TransGlobe Payments Ltd<br>
    <strong>Companies House No:</strong> 08447291</p>
    <div style="background: #fff5f5; padding: 15px; margin: 15px 0; border: 1px solid #e53935;">
      <p style="margin: 0; color: #b71c1c; font-weight: bold;">PENALTY IMPOSED: £146,000</p>
      <p style="margin: 10px 0 0;"><strong>Regulation Breached:</strong> The Russia (Sanctions) (EU Exit) Regulations 2019, Regulation 11</p>
      <p style="margin: 5px 0 0;"><strong>Nature of Breach:</strong> Making funds available to a designated person by processing 3 wire transfers totalling £292,000</p>
    </div>
    <p style="font-size: 0.85em; color: #666;">Published under s.148 Policing and Crime Act 2017.<br>
    Appeal period: 28 days from date of notice.</p>
    <div style="margin-top: 15px; font-size: 0.8em; font-family: monospace; text-align: center; color: #666; border-top: 1px dashed #ccc; padding-top: 10px;">
      <div data-verify-line="ofspenalty" style="font-family: 'Courier New', monospace; font-size: 0.85em; color: #555;">
        <span data-verify-line="ofspenalty">verify:ofsi.hm-treasury.gov.uk/penalties</span> <span verifiable-text="end" data-for="ofspenalty"></span>
      </div>
    </div>
  </div>
</div>

## Data Verified

Case reference, date of notice, person/entity penalised, company registration number, penalty amount, regulation breached, nature of breach summary, appeal status.

## Data Visible After Verification

**Status Indications:**
- **Penalty Imposed** — Final penalty, no appeal pending
- **Under Appeal** — Penalised party has appealed to the Upper Tribunal
- **Upheld on Appeal** — Tribunal confirmed the penalty
- **Overturned** — Tribunal quashed the penalty
- **Reduced** — Penalty amount reduced on review or appeal
- **Paid** — Penalty has been discharged

## Why This Matters

**Counterparty due diligence:** Before entering a correspondent banking relationship, investment partnership, or supply chain arrangement, firms must check whether the counterparty has been sanctioned or penalised. An OFSI penalty notice is a serious red flag. Currently, due diligence teams search OFSI's website manually — there's no machine-verifiable proof that a specific penalty notice is genuine or current.

**The fabrication risk works both ways:**
- A firm could claim "we've never been penalised" when they have been
- A competitor could fabricate a penalty notice to damage a rival's reputation
- A penalty that was overturned on appeal could still circulate as if it were current

## Second-Party Use

**Penalised firms** — Ironically, the penalised firm benefits too. If the penalty was overturned on appeal or the amount reduced, a verified status showing "Overturned" or "Reduced" prevents reputational damage from outdated information.

## Third-Party Use

**Correspondent banks** — Checking whether a potential partner has sanctions compliance problems before establishing a relationship.

**Investors** — Due diligence on fund managers. An OFSI penalty suggests systemic compliance failures.

**Insurance underwriters** — Pricing sanctions liability insurance. Verified penalty history feeds directly into risk models.

**Regulators in other jurisdictions** — SEC, FinCEN, BaFin, and other regulators checking UK enforcement actions against firms operating in their jurisdictions.

## Verification Architecture

**The Problem:**
- Outdated penalty notices circulating after appeals succeed
- Firms concealing penalty history from counterparties and investors
- Fabricated penalty notices used for market manipulation or competitive sabotage
- Confusion about whether a penalty is final or still under appeal

**The Fix:** OFSI hashes each penalty notice with a status field that reflects the current state (imposed, appealed, upheld, overturned, paid). The status updates as the case progresses. Anyone can verify the current state of any penalty instantly.

## Authority Chain

**Pattern:** Government Direct

OFSI is part of HM Treasury and publishes penalty notices under statutory authority.

```
✓ ofsi.hm-treasury.gov.uk/penalties — Publishes sanctions penalty notices under PCA 2017
  ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Jurisdictional Equivalents

| | UK | US | EU |
|---|---|---|---|
| **Authority** | OFSI (HM Treasury) | OFAC (US Treasury) | Member state competent authority |
| **Document** | Monetary Penalty Notice | Civil Monetary Penalty (CMP) | Administrative penalty notice (varies by member state) |
| **Legal basis** | Policing and Crime Act 2017 s.146; SAMLA 2018 | IEEPA; Trading with the Enemy Act; 31 CFR 501.701 | EU Council Regulations; national implementing legislation |
| **Potential verify: domain** | `ofsi.hm-treasury.gov.uk/penalties` | `ofac.treasury.gov/enforcement` | `sanctions.bafin.de/enforcement` (varies by state) |
| **Key difference** | Strict liability since 2017 — no intent required | OFAC publishes penalty details including transaction narratives; penalties can reach hundreds of millions USD | No single EU-wide enforcement body; each member state imposes its own penalties, leading to inconsistent enforcement |

**Further Jurisdictional Peers**

- **Australia (DFAT/AFP)** — Sanctions breaches are criminal offences under the *Autonomous Sanctions Act 2011* and the *Charter of the United Nations Act 1945*, enforced by the Australian Federal Police (AFP). DFAT refers cases to the AFP and Commonwealth Director of Public Prosecutions. Key difference: Australia relies primarily on criminal prosecution rather than civil monetary penalties — there is no equivalent of OFSI's strict-liability civil penalty regime.
- **Canada (OSFI/RCMP)** — Sanctions enforcement falls under the *Special Economic Measures Act (SEMA)* and the *United Nations Act*. The Office of the Superintendent of Financial Institutions (OSFI) supervises compliance for financial institutions; criminal enforcement is handled by the RCMP. Key difference: Canada introduced administrative monetary penalties for sanctions breaches in 2024, moving closer to the UK/US civil penalty model.
- **Singapore (MAS)** — The Monetary Authority of Singapore enforces sanctions compliance under the *Monetary Authority of Singapore Act* and *United Nations Act*. MAS can impose civil penalties, revoke licences, and refer criminal cases to the Attorney-General's Chambers. Key difference: Singapore's enforcement has intensified since 2023, with penalties for inadequate sanctions screening systems, not just substantive breaches.
- **Switzerland (SECO)** — The State Secretariat for Economic Affairs enforces sanctions under the *Embargo Act (EmbA)*. Breaches are criminal offences prosecuted by the Office of the Attorney General. Key difference: Swiss enforcement historically focused on criminal proceedings with relatively few prosecutions; SECO has increased its supervisory activity since 2022 in response to Russia-related sanctions.
- **Japan (MOF/METI)** — Sanctions enforcement under the *Foreign Exchange and Foreign Trade Act (FEFTA)* can result in criminal penalties (imprisonment and fines) and administrative sanctions (licence revocation, business suspension). Key difference: enforcement is split between MOF (financial sanctions) and METI (trade controls), with historically low prosecution rates but increasing scrutiny since 2022.

**Sanctions Evasion**

Penalties for sanctions evasion differ materially from general AML fines — evasion carries national security implications and increasingly attracts criminal rather than civil liability.

- **UK (OFSI):** Civil monetary penalties up to £1M or 50% of the breach value (whichever is greater) under SAMLA 2018, applied on a strict liability standard — no intent to evade is required. Criminal prosecution for deliberate evasion carries unlimited fines and up to 7 years' imprisonment under the regime-specific regulations.
- **US (OFAC):** Penalties can reach $20M+ per violation under IEEPA, with criminal prosecution carrying up to 20 years' imprisonment. OFAC's extraterritorial enforcement means non-US firms face penalties for USD-denominated transactions even when no US person is involved.
- **EU enforcement asymmetry:** Sanctions enforcement varies dramatically by member state — the Netherlands, Germany, and Belgium are active enforcers, while several member states have never imposed a sanctions penalty. This creates an enforcement gap that incentivises routing evasion through less active jurisdictions.
- **AML vs. sanctions penalty scale:** Unlike AML fines (which can run to billions — HSBC's $1.9B, Danske Bank's $2B), sanctions penalties have historically been more modest outside the US. This enforcement asymmetry has encouraged evasion through non-US channels, though the gap is narrowing post-2022.
- **Post-2022 enforcement surge:** The Russia sanctions regime has dramatically increased enforcement activity globally. OFSI issued more penalties in 2022-2024 than in all prior years combined. OFAC's Russia-related designations and enforcement actions have similarly accelerated, with secondary sanctions targeting third-country firms facilitating evasion.

**Unexplained Wealth & Asset Recovery**

- **Asset recovery nexus:** Sanctions penalties often coexist with confiscation proceedings — the penalty punishes the breach while confiscation recovers the proceeds or the frozen assets that were improperly released.
- **UK:** OFSI monetary penalties (civil) can be accompanied by NCA civil recovery proceedings under POCA Part 5; criminal prosecution under SAMLA can include criminal confiscation orders.
- **US:** OFAC penalties + DOJ criminal forfeiture are often pursued in parallel; plea agreements frequently include forfeiture of breach proceeds.
- **EU:** Sanctions circumvention is now a criminal offence across all member states (Directive 2024/xxx); confiscation of circumvention proceeds is a new enforcement tool.

## Jurisdictional Witnessing (Optional)

Some jurisdictions, contracts, or multi-party workflows may add an independent witness layer. When used, the witnessing firm:

- Receives all hashes from the issuer, and any subsequent changes to the payload as they happen—which may manifest as a new hash, a status change, or even a 404 (record deleted)
- Receives structured content/metadata (key identifiers and dates)
- Does **NOT** receive plaintext or sensitive personal information
- Provides an immutable, timestamped audit trail—available to the jurisdiction on demand, to document holders/third parties during disputes, or as expert witness testimony in legal proceedings

This provides:
- **Non-repudiation:** OFSI cannot deny issuing the penalty
- **Timestamp proof:** Penalty existed at a specific time
- **Regulatory audit:** Jurisdictions can inspect the witness ledger for fraud detection
- **Resilience:** Verification works even if issuer's systems go down

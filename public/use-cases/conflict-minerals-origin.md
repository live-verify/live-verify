---
title: "Conflict Minerals & Responsible Sourcing Origin"
category: "Customs & Trade Compliance"
volume: "Large"
retention: "Audit lifecycle + 5-7 years (due-diligence record retention)"
slug: "conflict-minerals-origin"
verificationMode: "clip"
tags: ["conflict-minerals", "3tg", "responsible-sourcing", "oecd-due-diligence", "rmi-rmap", "dodd-frank-1502", "eu-conflict-minerals", "cobalt", "supply-chain", "chain-of-custody"]
furtherDerivations: 1
---

## The Problem

The four "3TG" metals — **tin, tungsten, tantalum, and gold** — plus **cobalt** are the highest-risk commodities in global trade. Mined in conflict zones (the DRC and its neighbours, among others), they fund armed groups and finance forced and child labour. The metal then flows through smelters and refiners into laptops, phones, EV batteries, jewellery, and aerospace parts. By the time it reaches a finished product, the atoms are physically untraceable — tantalum from a "clean" mine and tantalum from a militia-controlled pit are chemically identical.

The world's answer is **due diligence**: the OECD Due Diligence Guidance, the Responsible Minerals Initiative's RMAP audit programme, US Dodd-Frank Section 1502, and the EU Conflict Minerals Regulation all require companies to document and audit where their metal came from. The result is a paper trail of **conformance claims** — "this smelter is RMAP-conformant," "this lot was sourced responsibly" — that travels with the metal as PDFs, certificates, and spreadsheet rows.

That paper trail is exactly what gets forged. A non-conformant smelter copies a conformant peer's certificate. A laundered batch is relabelled with a clean lot reference. A smelter that was **suspended** last week keeps presenting the certificate it held last year.

**Be clear about what Live Verify does and does not do here.** It binds a smelter's or refiner's **conformance claim** and **chain-of-custody assertion** to that issuer's domain, and makes both checkable and revocable. It does **not** physically trace the metal atom-by-atom, and it does **not** replace an RMAP audit or on-the-ground due diligence — it complements them. A fraudulent or mistaken smelter can still mis-attest a batch. What changes is that the claim is now verifiable against the issuer's live record and can be revoked the moment the smelter is suspended. Live Verify makes the claim **checkable and revocable, not infallible.**

## What gets attested (the scheme + smelter conformance + batch)

A single attestation bundles three things, all bound to the issuer's domain:

- **The scheme** — which recognized framework the claim rests on (e.g. OECD Due Diligence Guidance, RMAP-conformant smelter status, Dodd-Frank 1502 reporting, EU Conflict Minerals Regulation).
- **Smelter / refiner conformance** — that this named facility holds current conformant status under the named audit programme (typically RMI's RMAP), with a stated valid-until date.
- **The batch / lot** — the specific shipment of metal: the metal type, the lot reference, the declared country-of-origin basis, and an issuer-generated salt so two physically similar batches never collide on the same hash.

The downstream party — a buyer, an OEM compliance team, an auditor, or a regulator — reads the printed attestation, normalizes the text, hashes it, and queries the smelter's domain. The endpoint confirms **status and authenticity**; it never echoes the content back.

## Example: Smelter Conformance Attestation

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #1a5f2a; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <span verifiable-text="start" data-for="conflictmin"></span>
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;">RESPONSIBLE SOURCING CONFORMANCE

Metal              Tantalum (Ta2O5 concentrate)
Smelter/Refiner    Mabanga Refining Ltd
Facility ID        RMI-CID-002841
Scheme             RMAP Conformant (OECD DDG aligned)
Audit Body         Responsible Minerals Initiative
Batch/Lot Ref      LOT-2026-TA-00731
Country of Origin  Rwanda (basis: validated CoC upstream)
Conformance        CONFORMANT
Valid Until        2027-03-31
Issued             2026-06-15
Salt               7QF3-K29D-MXR8

<span data-verify-line="conflictmin">verify:smelter.example/rmap/v</span></pre>
  <span verifiable-text="end" data-for="conflictmin"></span>
</div>

The verification line points at the smelter's own domain. The country-of-origin field states a **basis** ("validated chain-of-custody upstream"), not a physical guarantee — it asserts what the smelter's due-diligence records claim, which is precisely the claim Live Verify makes checkable.

## Data Verified

Metal type, smelter / refiner name and facility ID (e.g. an RMI CID number), the scheme and audit body the claim rests on, batch/lot reference, declared country-of-origin basis, conformance status, valid-until date, issue date, and an issuer-generated salt. The salt matters: batch attestations are otherwise low-entropy and predictable (metal + lot number), so a random per-batch salt blocks guess-and-hash attacks.

## Data Visible After Verification

Shows the issuer domain (e.g. `smelter.example`, `refiner.example`) and the current standing of the named facility and batch.

**Status Indications:**
- **CONFORMANT** — The facility holds current conformant status under the named scheme and this batch is covered.
- **BATCH_VERIFIED** — This specific lot reference is recorded by the issuer and tied to a conformant facility.
- **SUSPENDED** — **ALERT:** The facility's conformant status is paused (e.g. mid-audit finding, sourcing concern); the claim is no longer good standing.
- **EXPIRED** — The valid-until date has passed; re-audit is overdue.
- **404** — No such record. **Told plainly:** the issuer does not vouch for this batch or facility. This is a fail-loud outcome — a 404 means do not trust the claim, not "try again later."

## Second-Party Use

The **smelter or refiner** (the issuer's direct counterparty) benefits.

**Market access:** Major OEMs and their tier-1 suppliers will only buy from RMAP-conformant smelters. A verifiable conformance attestation lets a refiner prove, at the point of sale, that its status is current and bound to its own domain — not a stale PDF copied from a peer.

**Premium and continuity:** Responsibly-sourced 3TG and cobalt command preferential purchasing inside large electronics and automotive supply chains. Live verification keeps the refiner inside those programmes without waiting on a manual document-chase each shipment.

## Third-Party Use

**OEM and Brand Compliance Teams**
**Supply-chain mapping:** A company filing under Dodd-Frank 1502 or the EU Conflict Minerals Regulation must list every smelter in its supply chain. Verifying each smelter's conformance hash against that smelter's domain confirms the claim is live, not a screenshot — and surfaces a SUSPENDED or EXPIRED status before it ends up in a regulatory filing.

**Independent Auditors (RMAP and others)**
**Evidence integrity:** Auditors verify that the conformance certificates a facility presents actually resolve to that facility's live record, catching forged or recycled certificates during the audit itself. Live Verify is a complement to the audit, not a substitute for it.

**Regulators (SEC, EU Competent Authorities)**
**Filing assurance:** A regulator reviewing a conflict-minerals report can verify the smelter attestations cited in it without trusting the filer's own paperwork, checking the claim against the issuer's domain directly.

**Downstream Buyers and Procurement**
**Sourcing risk:** A buyer purchasing intermediate metal can verify the batch attestation before accepting the shipment, refusing lots whose conformance has lapsed or been revoked.

## Verification Architecture

**The fraud and error problem**

- **Certificate copying:** A non-conformant smelter presents a conformant peer's certificate or a forged RMI CID.
- **Batch laundering:** Metal of unknown origin is relabelled under a clean lot reference attached to a real conformant facility.
- **Stale status:** A facility that was suspended or whose conformance expired keeps circulating the certificate it held while in good standing.
- **Fabricated schemes:** Fake "audit body" letterheads and look-alike domains used to manufacture conformance.

**What binding to the domain fixes — and what it doesn't.** Binding the attestation to the smelter's domain means the conformance and chain-of-custody claim can be checked against the issuer's live record and **revoked the instant the facility is suspended**. A copied or stale certificate fails to resolve, or resolves to SUSPENDED / EXPIRED / 404.

It does **not** make the underlying claim true. Live Verify cannot detect a smelter that is itself lying or mistaken about where its metal came from — that is the job of the RMAP on-site audit and upstream chain-of-custody due diligence. Live Verify confirms **that the issuer stands behind this exact claim right now**, and lets that standing be withdrawn. It is the verifiable, revocable layer on top of the schemes — never a replacement for them. Fail-loud is deliberate: an unrecognized hash returns 404 and the verifier is told plainly that the issuer does not vouch for the claim.

**Issuer Types** (First Party)

- **Smelters and refiners:** The primary issuers, attesting their own conformant status and batch records on their own domains.
- **Manufacturers / processors:** Downstream facilities attesting responsibly-sourced input lots.
- **Audit / scheme operators:** RMI and equivalent programmes, which may publish facility conformance status under their own domain as a second, independent path.

## Privacy Salt

Batch attestations are low-entropy: metal type plus a sequential lot number is guessable, and an attacker could otherwise hash candidate batch strings until one matches a live record. Each attestation therefore carries an **issuer-generated random salt** (e.g. `7QF3-K29D-MXR8`) printed in the verifiable region. The salt has no meaning of its own — it exists purely to give each batch enough entropy that the hash cannot be reproduced without the printed document. The endpoint still only confirms status; the salt is never used to look up or reveal commercial detail.

## Authority Chain

**Pattern:** Regulated or Commercial-with-accreditation

A smelter or refiner attests its own conformance; that conformance is granted under an audit programme (RMI's RMAP); the audit programme is itself anchored in the OECD Due Diligence Guidance and the regulatory regimes that mandate it (Dodd-Frank 1502, EU Conflict Minerals Regulation).

```
✓ smelter.example — Smelter/refiner attests batch conformance & chain-of-custody
  ✓ responsiblemineralsinitiative.org — Operates RMAP; grants conformant status
    ✓ oecd.org — Due Diligence Guidance for Responsible Supply Chains of Minerals
```

For facilities whose conformance derives from regulatory accreditation rather than a voluntary scheme, the upstream anchor is the relevant authority instead (e.g. an EU Competent Authority under the Conflict Minerals Regulation, or SEC oversight of Dodd-Frank 1502 filings).

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Further Derivations

None currently.

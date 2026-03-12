---
title: "NCA DAML Consent Responses"
category: "Financial Compliance"
volume: "Large"
retention: "6 years minimum (MLR 2017 / POCA 2002)"
slug: "nca-daml-consent-responses"
verificationMode: "clip"
tags: ["nca", "ukfiu", "daml", "consent", "aml", "poca", "financial-crime", "compliance", "money-laundering", "defence"]
furtherDerivations: 0
---

## What is a DAML Consent Response?

When a UK firm suspects a transaction involves criminal property but needs to proceed with it (e.g., a client wants to withdraw funds, or a payment is due), the firm faces a dilemma: proceeding might constitute money laundering under POCA s.327-329, but refusing to act might "tip off" the client. The solution is a **Defence Against Money Laundering (DAML)** consent request to the NCA.

The firm files a SAR with the NCA requesting **consent** to proceed with the specific transaction. The NCA then either:
- **Grants consent** (the firm may proceed — this provides a statutory defence under POCA s.335)
- **Refuses consent** (the firm must not proceed for 31 days, during which the NCA can apply for a restraint order)
- **Allows the moratorium to expire** (consent is deemed granted after 31 days if no refusal is issued)

The NCA's consent response is one of the most critical compliance documents a fund manager can hold. It's the firm's legal defence if the transaction later turns out to involve criminal property.

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 1px solid #2e7d32; background: #fff; padding: 0;">
  <div style="background: #2e7d32; color: #fff; padding: 15px;">
    <div style="font-weight: bold; font-size: 1.1em;"><span verifiable-text="start" data-for="daml">[</span>NATIONAL CRIME AGENCY</div>
    <div style="font-size: 0.8em;">Defence Against Money Laundering — Consent Decision</div>
  </div>
  <div style="padding: 20px; font-size: 0.9em; line-height: 1.6;">
    <p><strong>DAML Reference:</strong> DAML/2026/UK/0047832<br>
    <strong>SAR Reference:</strong> SAR/2026/UK/0284612<br>
    <strong>Date of Decision:</strong> 8 March 2026<br>
    <strong>Reporting Entity:</strong> Hartington Asset Management LLP<br>
    <strong>FCA Firm Reference:</strong> 558301</p>
    <div style="background: #f0fff4; padding: 15px; margin: 15px 0; border: 1px solid #4caf50;">
      <p style="margin: 0; color: #2e7d32; font-weight: bold;">CONSENT GRANTED</p>
      <p style="margin: 10px 0 0;">The NCA does not object to the transaction described in the above SAR proceeding.</p>
      <p style="margin: 10px 0 0;">This consent provides a defence under s.335 of the Proceeds of Crime Act 2002.</p>
    </div>
    <p style="font-size: 0.85em; color: #666;">This consent relates only to the specific transaction described in the SAR. It does not constitute a determination that the funds are not criminal property.</p>
    <div style="margin-top: 15px; font-size: 0.8em; font-family: monospace; text-align: center; color: #666; border-top: 1px dashed #ccc; padding-top: 10px;">
      <div data-verify-line="daml" style="font-family: 'Courier New', monospace; font-size: 0.85em; color: #555;">
        verify:nca.gov.uk/daml-consent <span verifiable-text="end" data-for="daml">]</span>
      </div>
    </div>
  </div>
</div>

## Data Verified

DAML reference number, linked SAR reference, date of decision, reporting entity name, FCA firm reference, consent decision (granted / refused / deemed granted by expiry of moratorium).

**Privacy constraint:** The response does NOT contain the client's identity, the transaction amount, or the nature of the suspicion. Only the consent decision and its administrative references are verifiable.

## Data Visible After Verification

**Status Indications:**
- **Consent Granted** — NCA does not object; firm has s.335 defence
- **Consent Refused** — Firm must NOT proceed; 31-day moratorium begins
- **Moratorium Extended** — Court has extended the moratorium beyond 31 days (up to 186 days further)
- **Deemed Consent** — 31-day moratorium expired without NCA refusal; consent is implied
- **Restraint Order Obtained** — NCA has obtained a court order; funds must remain frozen

## Why This Matters

DAML consent is the fund manager's **statutory shield**. Without it, processing a suspicious transaction is a criminal offence punishable by up to 14 years' imprisonment. The consent letter is existential evidence.

**The timing problem:** POCA s.335(1) requires consent to be obtained **before** the transaction proceeds. If a firm processes the transaction and then seeks consent retrospectively, the defence fails. A verified timestamp on the NCA response proves the consent was in place before the transaction occurred.

**The fabrication risk:** A fund manager who processed a suspicious transaction without seeking consent could fabricate a DAML response to create a retrospective defence. The amounts at stake (and the prison sentences) create strong incentives for forgery.

**The "deemed consent" problem:** When the NCA doesn't respond within 31 days, consent is deemed granted. But proving this requires proving a negative — that no refusal was issued. A verified status of "Deemed Consent" with a timestamp resolves this cleanly.

## Second-Party Use

**Fund managers / MLROs** — The primary beneficiary. The DAML consent letter is their personal defence against criminal prosecution. Verification makes it unimpeachable.

**Transaction processing teams** — Before executing a flagged transaction, the operations team can verify the DAML consent is genuine and current, rather than relying on an email from the MLRO.

## Third-Party Use

**FCA supervisors** — Reviewing the firm's DAML consent regime. Are they seeking consent when they should? Are they acting on refusals? Verified responses provide the complete picture.

**External auditors** — Annual AML audits must review the DAML consent log. Verified NCA responses confirm the log is genuine.

**Legal counsel** — Defence in criminal proceedings. "We obtained NCA consent before proceeding — here's the verified response" is a complete s.335 defence.

**Crown Prosecution Service** — In money laundering prosecutions, verifying whether a valid DAML consent existed at the time of the transaction.

## Verification Architecture

**The Problem:**
- Fabricated DAML consent responses to create retrospective defences
- Transactions processed before consent was actually obtained
- Confusion about "deemed consent" timing and whether a refusal was issued
- MLROs claiming they sought consent when they didn't

**The Fix:** NCA hashes each consent decision at time of issue. The timestamp is cryptographically bound. A fund manager cannot fabricate a pre-dated consent, and the "deemed consent" status is recorded with the exact moratorium expiry date. FCA auditors and prosecutors can verify the consent was genuine and pre-dated the transaction.

## Authority Chain

**Pattern:** Government Direct

The NCA is a statutory law enforcement agency operating under the Crime and Courts Act 2013.

```
✓ nca.gov.uk/daml-consent — Issues DAML consent decisions under POCA 2002 s.335
  ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Related Use Cases

- **[NCA SAR Receipt Acknowledgments](nca-sar-receipt-acknowledgments.md)** — The initial SAR that triggers the DAML process
- **[Suspicious Activity Reports (Internal)](suspicious-activity-reports-internal.md)** — The firm's internal SAR filing records
- **[OFSI Licence Authorisations](ofsi-licence-authorisations.md)** — Similar concept for sanctions (OFSI grants permission to deal with frozen funds; NCA grants consent to proceed with suspicious transactions)

## Jurisdictional Equivalents

| | UK | US | EU |
|---|---|---|---|
| **Authority** | NCA (UKFIU) | No direct equivalent | Varies by member state FIU |
| **Document** | DAML consent response | N/A — US firms file SARs but do not need pre-transaction consent to proceed | Some FIUs offer informal "comfort letters" but no standardised consent mechanism |
| **Legal basis** | POCA 2002 s.335 (defence for authorised disclosure) | BSA requires filing but not consent; firms proceed and report simultaneously | 4MLD Art. 32(7) allows member states to require consent; implementation varies |
| **Potential verify: domain** | `nca.gov.uk/daml-consent` | N/A | Varies (e.g., `fiu.belastingdienst.nl/consent` in NL) |
| **Key difference** | Unique UK mechanism — firms MUST obtain consent before proceeding with suspicious transactions or face criminal liability | US has no consent requirement; firms file SARs but are not blocked from processing | Some EU states (Netherlands, Belgium) have consent-like regimes; most do not. The UK's DAML system is unusually strict and well-defined |

**Further Jurisdictional Peers**

The UK's DAML consent mechanism is largely unique. Most peer jurisdictions operate a "file and proceed" model where firms report suspicious activity but are not required to obtain pre-transaction consent from the FIU. Notable comparisons:

- **Australia (AUSTRAC)** — Under the *Anti-Money Laundering and Counter-Terrorism Financing Act 2006*, reporting entities file suspicious matter reports (SMRs) with AUSTRAC. There is no pre-transaction consent mechanism — firms file and proceed. Key difference: Australia's regime has no equivalent of the UK's 31-day moratorium; transactions continue unless a separate law enforcement restraining order is obtained.
- **Canada (FINTRAC)** — Under the *Proceeds of Crime (Money Laundering) and Terrorist Financing Act (PCMLTFA)*, firms file suspicious transaction reports (STRs) with FINTRAC. There is no pre-transaction consent requirement. Key difference: Canadian firms face no criminal liability for processing a transaction after filing an STR — the act of filing is the compliance obligation, not obtaining consent.
- **Switzerland (MROS)** — The Money Laundering Reporting Office Switzerland (MROS) operates under the *Anti-Money Laundering Act (AMLA)*. When a financial intermediary files a suspicious activity report, assets are automatically frozen for five working days under AMLA Art. 10, extendable if MROS refers the case to prosecution. Key difference: Switzerland's regime is the closest peer to the UK's — it imposes an automatic asset freeze upon filing (rather than requiring pre-consent), giving MROS time to assess before the intermediary can proceed.
- **Singapore (STRO)** — The Suspicious Transaction Reporting Office receives STRs under the *Corruption, Drug Trafficking and Other Serious Crimes (Confiscation of Benefits) Act (CDSA)*. There is no formal consent mechanism. Key difference: Singapore's FIU can issue restraint orders through the courts, but the reporting entity is not blocked from proceeding with the transaction upon filing.

**Unexplained Wealth & Asset Recovery**

- **Asset recovery nexus:** When the NCA refuses DAML consent, the 31-day moratorium period is specifically designed to allow law enforcement to apply for a restraint order under POCA s.41 — DAML refusal is the trigger for asset freezing and potential confiscation.
- **UK:** DAML refusal → restraint order → criminal confiscation or civil recovery is a defined enforcement pathway; the verified DAML response timestamp is critical evidence for the restraint order application.
- **Key distinction:** This is unique to the UK — no other jurisdiction has a pre-transaction consent mechanism that directly triggers asset restraint proceedings.
- **Ireland:** Criminal Assets Bureau (CAB) model is different — CAB can seek interim orders without a SAR/DAML trigger, based on its own intelligence.

## Jurisdictional Witnessing

A jurisdiction may require the issuer to retain a **witnessing firm** for regulatory compliance. The witnessing firm:

- Receives all hashes from the issuer, and any subsequent changes to the payload as they happen—which may manifest as a new hash, a status change, or even a 404 (record deleted)
- Receives structured content/metadata (key identifiers and dates)
- Does **NOT** receive plaintext or sensitive personal information
- Provides an immutable, timestamped audit trail—available to the jurisdiction on demand, to document holders/third parties during disputes, or as expert witness testimony in legal proceedings

This provides:
- **Non-repudiation:** NCA cannot deny issuing consent; firm cannot deny lacking consent
- **Timestamp proof:** Consent decision existed at a specific time (critical for s.335 defence)
- **Regulatory audit:** Jurisdictions can inspect the witness ledger for consent integrity
- **Resilience:** Verification works even if issuer's systems go down

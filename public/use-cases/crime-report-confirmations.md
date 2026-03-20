---
title: "Crime Report Confirmations and Progress"
category: "Government & Civic Documents"
volume: "Very Large"
retention: "Indefinite (report exists as long as case file exists)"
slug: "crime-report-confirmations-and-progress"
verificationMode: "clip"
tags: ["crime-report", "police-report", "fraud-report", "insurance-claim", "action-fraud", "crime-reference-number", "law-enforcement", "victim-receipt"]
furtherDerivations: 1
---

## What is a Crime Report Confirmation (and Progress)?

When you report a crime — a stolen laptop, a burglary, a fraud — the reporting body gives you a confirmation with a reference number. That confirmation has two purposes: it proves you reported the crime, and it gives insurers and other institutions something to check against.

In the UK, there are two channels: **Report Fraud** (formerly Action Fraud) handles fraud and cybercrime centrally, while the **43 territorial police forces** handle criminal cases — theft, burglary, assault, criminal damage — directly. Both issue crime reference numbers. Both are required by insurers.

In practice, the confirmation is primarily a **bureaucratic receipt**. Report Fraud received over 300,000 reports per year. Roughly 4% resulted in anyone being charged. The rest sat in a queue. Local police forces have better investigation rates for criminal cases, but their confirmations are equally unverifiable — a PDF with a plausible reference number is all it takes. Insurers still *require* the crime reference number before they'll process a theft or fraud claim. The reference number's value is as proof-of-reporting, not as evidence of investigation.

The problem: these confirmations are trivially forgeable. A PDF with a plausible reference number and a convincing header is all it takes. Insurers have no practical way to verify that a crime reference number is real without phoning the reporting body — which, in the case of a system processing hundreds of thousands of reports, rarely answers.

With Live Verify, the reporting body issues a confirmation carrying a verify line. The insurer's claims handler scans it and gets an instant cryptographic confirmation that this exact document was issued by the reporting body. No phone calls. No waiting. No trusting a PDF.

<div style="max-width: 580px; margin: 24px auto; font-family: sans-serif; border: 1px solid #999; background: #fff; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.15);">
  <div style="background: #003078; color: #fff; padding: 18px 20px; display: flex; align-items: center; justify-content: space-between;">
    <div>
      <div style="font-weight: bold; font-size: 1.1em; letter-spacing: 0.5px;"><span verifiable-text="start" data-for="crn">&#91;</span>REPORT FRAUD</div>
      <div style="font-size: 0.8em; opacity: 0.85; margin-top: 2px;">Crime Report Confirmation</div>
    </div>
    <div style="width: 46px; height: 46px; background: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #003078; font-weight: bold; font-size: 0.55em; text-align: center; line-height: 1.2;">UK<br>POLICE</div>
  </div>
  <div style="padding: 20px; font-size: 0.9em; line-height: 1.6; color: #222;">
    <div style="margin-bottom: 12px;">
      <strong>Reference:</strong> NFRC-2026-0312-7891<br>
      <strong>Date Reported:</strong> 6 March 2026<br>
      <strong>Reported By:</strong> OWEN R. DAVIES
    </div>
    <div style="margin-bottom: 12px;">
      <strong>Category:</strong> Theft from person<br>
      <strong>Location:</strong> Cardiff, Wales
    </div>
    <div style="padding: 10px; background: #f0f4f8; border: 1px solid #b1c4de; text-align: center; font-weight: bold; color: #003078; margin-bottom: 12px;">
      Your crime report has been recorded
    </div>
    <div style="font-size: 0.8em; color: #555;">
      This confirmation proves you reported this crime. It does not
      guarantee investigation. Your report has been assessed and
      may be referred to a local police force.
    </div>
  </div>
  <div style="padding: 0 20px 20px 20px;">
    <div style="border-top: 1px dashed #999; padding-top: 5px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
      title="Demo only: Report Fraud doesn't yet offer verification endpoints">
      <span data-verify-line="crn">verify:reportfraud.police.uk/reports/v</span> <span verifiable-text="end" data-for="crn">&#93;</span>
    </div>
  </div>
</div>

## The Insurance Problem

Insurers require a crime reference number before processing claims for theft, burglary, criminal damage, and fraud losses. This creates a perverse incentive structure:

1. Victim reports crime to get a reference number
2. Reporting body issues a reference number (and probably doesn't investigate)
3. Victim gives the reference number to their insurer
4. Insurer has no way to verify the reference number is genuine
5. Fraudulent claimants fabricate reference numbers on forged confirmations

Fake crime reports are a known vector for insurance fraud. A claimant invents a theft, creates a convincing-looking PDF with a made-up reference number, and submits it with their claim. The insurer's only recourse is to phone the reporting body — a process that can take days and often yields no answer.

Live Verify eliminates this entirely. The insurer scans the confirmation. Either it verifies against the reporting body's domain, or it doesn't. Five seconds.

## Verification Response

| Payload | Class | Meaning |
|---|---|---|
| `OK` | affirming | Crime report confirmation is valid and current |
| `PENDING_INVESTIGATION` | affirming | Report valid, queued but not yet assigned |
| `UNDER_INVESTIGATION` | affirming | Report valid, active investigation underway |
| `NO_FURTHER_ACTION` | affirming | Report valid, case closed without further action |
| `REFERRED_TO_CPS` | affirming | Referred to Crown Prosecution Service (England & Wales) |
| `REFERRED_TO_COPFS` | affirming | Referred to Crown Office & Procurator Fiscal Service (Scotland) |
| `SUPERSEDED` | denying | Report replaced — a newer reference exists |
| `REVOKED` | denying | Report withdrawn (e.g. found to be fabricated) |

All statuses from `OK` through `REFERRED_TO_CPS`/`REFERRED_TO_COPFS` are **affirming** — the crime report genuinely exists. The insurer can proceed with the claim. The status gives additional context about where things stand in the justice system, but the insurer's core question ("did this person actually report a crime?") is answered by any affirming status.

`SUPERSEDED` is non-accusatory — it simply means the report has been replaced (duplicate merged, category reclassified, amended reference issued). The insurer asks the claimant for the current reference.

`REVOKED` is the serious one — the report itself has been withdrawn, typically because it was fabricated. This is a red flag for the insurer.

The typical lifecycle: `OK` → `PENDING_INVESTIGATION` → `UNDER_INVESTIGATION` → one of `NO_FURTHER_ACTION` / `REFERRED_TO_CPS` / `REFERRED_TO_COPFS`.

In practice, the vast majority of reports will sit at `PENDING_INVESTIGATION` indefinitely. That's honest — and it still satisfies the insurer's requirement.

## Data Verified

Reporting person's name, crime reference number, date reported, crime category, reporting body. The hash does NOT contain the details of the crime itself — only the confirmation receipt.

**Document Types:**
- **Online Report Confirmation** — PDF/email received after filing online.
- **101/Non-Emergency Report Receipt** — Confirmation from telephone reporting.
- **In-Station Report Receipt** — Paper confirmation from a police station visit.

## Second-Party Use

The **Victim** (reporter) benefits from verification.

**Insurance Claims:** The primary use. Proving to an insurer that a crime was genuinely reported, without waiting for the insurer to phone the reporting body. Particularly valuable for travel insurance (theft abroad), contents insurance (burglary), and motor insurance (vehicle theft/damage).

**Bank Disputes:** Some banks require a crime reference number before reversing fraudulent transactions. A verified confirmation speeds up the dispute process.

**Landlord/Employer Notification:** Proving that a break-in or theft at a rented property or workplace was formally reported.

## Third-Party Use

**Insurers (Primary Verifier)**
The highest-volume use. Every theft, burglary, and criminal damage claim requires a crime reference number. Insurers process millions of these annually. Automated verification at point of claim submission eliminates a manual verification step and catches fabricated references immediately.

**Banks and Financial Institutions**
Fraud departments require crime reports before reversing unauthorized transactions or issuing replacement cards. Verified confirmations prevent social engineering attacks where a fraudster claims to have reported the crime but provides a fake reference.

**Employers**
HR departments may require a crime report confirmation when an employee claims theft of company property (laptop, phone, vehicle).

**Solicitors**
Personal injury and criminal defence solicitors need to confirm that incidents were formally reported. A verified confirmation is stronger evidence than a photocopy.

## Verification Architecture

**The Fake Crime Reference Problem**

- **Fabricated PDFs** — A convincing header, a plausible reference number format, and a crime category that matches the insurance claim. Without verification, the insurer has no way to distinguish this from a genuine confirmation.
- **Reference number recycling** — Using a genuine reference number from a different crime (or someone else's crime) on a forged confirmation with altered details.
- **Inflated claims** — Reporting a minor incident and altering the confirmation to describe a more serious crime to support a larger insurance claim.
- **Serial reporting** — Filing multiple reports for the same incident to different bodies, then claiming against multiple insurance policies using different reference numbers.

**Issuer Types** (First Party)

The issuer is always a law enforcement or statutory reporting body. In the UK there are two distinct channels:

- **Report Fraud** (UK — fraud and cybercrime only, England, Wales, Northern Ireland) — reportfraud.police.uk
- **Local police forces** (UK — criminal cases: theft, burglary, assault, criminal damage, etc.) — e.g. met.police.uk, south-wales.police.uk, west-midlands.police.uk
- **Police Scotland** (all crime types in Scotland) — scotland.police.uk
- **PSNI** (all crime types in Northern Ireland) — psni.police.uk
- **Federal and state equivalents worldwide** — see below

**Privacy Salt:** Important. Crime reports contain sensitive information about victims and alleged perpetrators. The hash must be salted to prevent enumeration of who has reported crimes. Without salt, an attacker who knows a person's name and approximate date could guess-and-check to determine whether they have an active crime report — potentially useful for witness intimidation or stalking.

## Authority Chain

**Pattern:** Sovereign

Police forces and crime reporting bodies hold statutory authority to issue crime reference numbers and confirmations under police and evidence legislation.

```
✓ police.uk/reference/verify — Issues crime report confirmations and reference numbers
```

Self-authorized — this is a sovereign body whose authority derives from statute.

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Jurisdictional Witnessing (Optional)

Some jurisdictions, contracts, or multi-party workflows may add an independent witness layer. When used, the witnessing firm:

- Receives all hashes from the issuer, and any subsequent changes to the payload as they happen — which may manifest as a new hash, a status change, or even a 404 (record deleted)
- Receives structured content/metadata (reference number, dates, crime category)
- Does **NOT** receive plaintext or sensitive personal information (no victim addresses, no crime details)
- Provides an immutable, timestamped audit trail — available to the jurisdiction on demand, to document holders/third parties during disputes, or as expert witness testimony in legal proceedings

This provides:
- **Non-repudiation:** Reporting body cannot deny issuing the confirmation
- **Timestamp proof:** Report existed at a specific time
- **Regulatory audit:** Oversight bodies can inspect the witness ledger
- **Resilience:** Verification works even if the reporting body's systems go down

**Public Blockchain (Non-Party)**

If a witness layer exists, it may periodically commit rollups to a public blockchain as an additional timestamping mechanism. That is optional, not inherent to the use case. The verification paths would then be:

1. **Issuer domain** — Direct check against the reporting body
2. **Witnessing firm** — Independent confirmation with timestamp
3. **Public blockchain** — Decentralized trust anchor via rollup inclusion

## Competition vs. Phone Verification

| Feature | Live Verify | Phone Verification | Trusting the PDF |
| :--- | :--- | :--- | :--- |
| **Speed** | **5 seconds.** Scan and verify. | **Days to weeks.** If they answer at all. | **Instant.** But no verification. |
| **Scalability** | **Unlimited.** Hash lookup. | **Doesn't scale.** Call centres are overwhelmed. | **N/A.** |
| **Fraud Detection** | **Immediate.** Fake reference fails verification. | **Possible.** If the operator checks. | **None.** Visual inspection only. |
| **Automation** | **Yes.** Insurer can verify at point of submission. | **No.** Manual phone call per claim. | **No.** |
| **24/7** | **Yes.** Hash lookup is always available. | **No.** Office hours, often with long queues. | **N/A.** |

**Why Live Verify wins here:** The current system is broken by design. Reporting bodies issue hundreds of thousands of confirmations per year but have no scalable way for third parties to verify them. Insurers either trust the paper (enabling fraud) or spend hours on the phone (costing money and time). Live Verify makes verification instant, automatic, and unforgeable.

## International Equivalents

The pattern of "centralised crime reporting body issues a reference number that insurers require" exists worldwide. Each would benefit from issuing verifiable confirmations.

| Country | Reporting System | Reference Number | Online | Investigates? |
|---|---|---|---|---|
| **UK (fraud)** | Report Fraud (was Action Fraud) | Crime Reference Number (CRN) | Yes | No — passes to local police/NCA |
| **UK (criminal)** | Local police forces (43 territorial forces) | Crime Reference Number (CRN) | Yes (101 online) | Yes |
| **UK (Scotland)** | Police Scotland | Crime Reference Number | Yes | Yes |
| **UK (N. Ireland)** | PSNI | Crime Reference Number | Yes | Yes |
| **USA (federal)** | FTC ReportFraud / FBI IC3 | FTC Reference / IC3 Complaint ID | Yes | No — aggregate data / referral only |
| **USA (state)** | State Police / Highway Patrol (e.g. NYSP, CHP, Texas DPS) | Case / Incident Number | Varies | Yes |
| **USA (local)** | City / County Police, Sheriff's Dept | Police Report Number | Varies | Yes |
| **Canada** | Canadian Anti-Fraud Centre (CAFC) | CAFC Report Number | Yes | No — shares with police |
| **Australia** | ReportCyber (ACSC) / Scamwatch (ACCC) | Report Reference Number | Yes | Refers to state police |
| **France** | THESEE (internet fraud) | Numero de plainte | Yes | Yes (validated by officer) |
| **Germany** | Onlinewache (per Land) | Aktenzeichen | Yes (13/16 states) | Yes |
| **Netherlands** | Politie Aangifte | Dossiernummer | Yes (DigiD) | Yes |
| **Ireland** | An Garda Siochana | PULSE Number | Limited | Yes (under-resourced) |
| **New Zealand** | NZ Police 105 | Police Report Number | Yes | Yes |
| **India** | NCRP (cybercrime.gov.in) | Complaint Reference Number | Yes | ~2% become formal FIRs |
| **Singapore** | Singapore Police Force | Police Report Number | Yes | Yes |
| **Hong Kong** | HK Police e-Report | e-Report Number | Yes | Yes |
| **South Africa** | SAPS | CAS Number | No (in-person) | Yes (resource-constrained) |
| **UAE (Dubai)** | eCrime (ecrime.ae) | Case Number | Yes | Yes |

A common pattern: many of these systems are **intake and triage** mechanisms rather than investigative bodies. The actual investigation is delegated to local or specialist police units. This is the structural issue behind the "Inaction Fraud" criticism — and variants of the same complaint exist in India (~2% of cybercrime complaints become formal FIRs), Canada (CAFC explicitly does not investigate), and Australia (Scamwatch reports are not police reports).

Regardless of whether investigation happens, the **receipt** is what the insurer needs. Live Verify makes that receipt trustworthy.

## Further Derivations

1. **Anti-social behaviour reports** — Similar pattern: victim reports ASB, receives a reference number, may need it for housing applications, council complaints, or civil proceedings. Verifiable confirmations prove the report exists without requiring the council or police to answer verification calls.
2. **CIFAS fraud markers** — When a person is flagged in the UK's CIFAS fraud prevention database, they receive notification. A verifiable confirmation could prove the marker exists (or has been removed) without requiring CIFAS to field verification calls from lenders and employers. See also [CIFAS fraud prevention markers](/use-cases/cifas-fraud-prevention-markers).

---
title: "Proof of GP / Primary Care Registration"
category: "Healthcare & Medical"
volume: "Large"
retention: "Registration period + 10 years"
slug: "proof-of-gp-registration"
verificationMode: "clip"
tags: ["gp", "primary-care", "nhs", "registration", "proof-of-address", "mandate", "healthcare", "medical-registration", "patient", "benefits", "school-admission"]
furtherDerivations: 2
---

## What is Proof of GP Registration?

You need a letter from your GP confirming you're registered at their practice. Maybe it's for a school admission form. Maybe it's for a benefits application. Maybe you're applying for a mortgage and the lender wants a second form of address proof. Maybe you need it for a visa application.

You call the surgery. You're on hold for 20 minutes. The receptionist says they can do a letter — it'll be ready in 5-7 working days and costs £25. For a letter that says: "This person is registered at our practice."

This is the pattern across the NHS and most primary care systems worldwide. GPs hold authoritative data about patient registration — name, address, date of registration — but extracting a verifiable confirmation from that data is slow, expensive, and produces an unverifiable document.

Live Verify makes the GP practice (or the NHS system behind it) the direct confirmation source. A salted hash confirms: **"This person is registered at this practice, registered since [date]."** The patient generates a time-limited proof. The requesting party verifies it against the practice's domain (or an NHS-operated endpoint). No phone calls. No letters. No £25 fee.

The mandate model: NHS England (or equivalent national health bodies) requires GP practices to offer free, time-limited, hash-based registration confirmations via the NHS App or practice systems. The infrastructure cost is borne by the NHS centrally, not by individual practices.

<div style="max-width: 550px; margin: 24px auto; font-family: sans-serif; border: 1px solid #ccc; background: #fff; padding: 20px; position: relative;">
  <div style="font-size: 0.85em; color: #555; border-bottom: 1px solid #ddd; padding-bottom: 10px; margin-bottom: 15px;">
    <strong>From:</strong> noreply@nhs.uk<br>
    <strong>To:</strong> james.kowalski@gmail.com<br>
    <strong>Subject:</strong> Your GP registration confirmation
  </div>
  <div style="font-size: 0.95em; color: #333; margin-bottom: 15px;">
    Dear James,<br><br>
    Here is your GP registration confirmation as requested via the NHS App:
  </div>
  <div style="font-family: 'Courier New', monospace; background: #f9f9f9; padding: 15px; border: 1px solid #999; font-size: 1em; color: #000; line-height: 1.6;">
    <span verifiable-text="start" data-for="gp"></span>Parkview Medical Centre<br>
    NHS: B81042<br>
    James M. Kowalski<br>
    Registered since: March 2019<br>
    Address held: 7 Willow Lane, Oxford OX2 6DP<span verifiable-text="end" data-for="gp"></span><br>
    <span data-verify-line="gp">verify:nhs.uk/gp-registration</span>
  </div>
</div>

<div style="max-width: 550px; margin: 24px auto; font-family: 'Courier New', monospace; background: #f9f9f9; padding: 15px; border: 1px solid #999; font-size: 1em; color: #000; line-height: 1.6; position: relative;">
  The Limes Surgery<br>
  NHS: Y02345<br>
  Fatima A. Hassan<br>
  Registered since: November 2021<br>
  Address held: 24 Park Avenue, Manchester M14 5QH<br>
  <span data-verify-line="bare28">verify:nhs.uk/gp-registration</span>
</div>

## Data Verified

GP practice name, NHS practice code, patient full name, registration date, address held on record.

**Document Types:**
- **GP Registration Confirmation:** Core proof of registration at a named practice with address.
- **Registration History Summary:** Multiple practices over time (for immigration/visa purposes requiring address history).

Note: this use case does NOT verify medical records, conditions, prescriptions, or any clinical information. It is purely administrative: "this person is registered at this practice with this address."

**Privacy Salt:** Essential. Patient name + practice name is low entropy. NHS number must NOT appear in the verifiable text (it is a sensitive identifier). The salt is time-limited (e.g., 30 days) and generated via the NHS App or practice portal.

## Data Visible After Verification

Shows the verification domain (`nhs.uk`) and registration status.

**Status Indications:**
- **Registered** — Patient is currently registered and active.
- **Deregistered** — Patient has left the practice (moved, deceased, or removed from list).
- **Temporarily Registered** — Patient is registered as a temporary resident (e.g., students, visitors).

## Second-Party Use

The **Patient** benefits from verification.

**Free Proof of Address:** GP registration letters are currently charged at £15-30 by most practices. A mandated free verification endpoint eliminates this cost. For patients on low incomes, this is a meaningful saving — especially when multiple address proofs are required simultaneously (bank, letting agent, employer).

**Visa & Immigration Applications:** The Home Office and UKVI accept GP registration as proof of UK address and length of residence. A verifiable confirmation from `nhs.uk` is stronger than a letter the applicant provides, and removes the multi-week delay in obtaining it.

**School Admissions:** Some local authorities request proof of GP registration to corroborate catchment area residence. Verifiable confirmation eliminates suspicion of forged letters.

**Benefits Applications:** DWP, local authorities, and pension providers often request a "letter from your GP" as secondary address proof. A hash-based confirmation is instant and free.

## Third-Party Use

**Banks & Financial Institutions**
**Supplementary KYC:** GP registration from an `nhs.uk` domain serves as government-backed address verification. Particularly valuable for customers who don't have utility bills in their name (students, house-sharers, people who've just moved to the UK).

**Home Office / UKVI**
**Immigration & Settlement Applications:** Indefinite Leave to Remain (ILR), naturalisation, and visa extension applications require proof of UK residence over time. GP registration history — verified against NHS systems — provides a longitudinal address record that's extremely difficult to fabricate.

**Local Authorities**
**School Admissions & Social Services:** Corroborating catchment area residence for school places. Confirming address for social care assessments, housing applications, and benefits administration.

**Employers**
**Right-to-Work & Address Verification:** Some employers (especially in regulated sectors) require proof of address as part of onboarding. GP registration is universally available — unlike utility bills, everyone registered with the NHS has one.

**Solicitors**
**Identity Verification for Anti-Money-Laundering:** Solicitors performing AML checks on clients need two forms of address verification. A verifiable GP registration from `nhs.uk` is a strong second source alongside a council tax or utility confirmation.

## The GP Letter Fraud Problem

- **Fake letterhead:** GP practice letterheads are easily replicated. A forged letter on "Parkview Medical Centre" headed paper is hard to distinguish from a genuine one without calling the practice.
- **Edited PDF letters:** Genuine letters with altered names, addresses, or dates.
- **Practice impersonation:** Fake practices that don't exist, or real practice names used with fabricated details.
- **Out-of-date registrations:** Letters from practices where the patient is no longer registered, presented as current proof.
- **Charging barrier creates perverse incentive:** Because practices charge £15-30 for letters, patients are incentivised to reuse old letters or forge new ones rather than pay repeatedly.

Live Verify eliminates all of these. The hash resolves against `nhs.uk` (not the practice's own website). The NHS practice code in the verification block can be cross-referenced against the public NHS register. Deregistered patients get a "Deregistered" status. And it's free — removing the financial incentive to forge.

## Verification Architecture

**Issuer Types** (First Party)

This use case is unusual: the issuer is **centralised** rather than per-practice. The NHS already maintains patient registration data in the Personal Demographics Service (PDS). Individual GP practices don't need to run their own endpoints — NHS England operates a single verification endpoint at `nhs.uk`, backed by PDS data.

**NHS England (via PDS):** Central endpoint serving all GP registrations in England.
**NHS Scotland (via CHI):** Community Health Index, equivalent centralised system.
**NHS Wales (via WDS):** Welsh Demographic Service.
**HSC Northern Ireland:** Health and Social Care registration systems.

**Mandate Justification:** The NHS already holds this data centrally. The NHS App already allows patients to view their GP registration. Adding a hash-based verification export is a feature addition to an existing platform, not a new system. The marginal cost is near zero. The benefit is eliminating millions of GP letter requests per year — freeing up practice admin time (a resource the NHS is desperate to protect) and saving patients money.

## Authority Chain

**Pattern:** Institutional (Government / NHS)

```
✓ nhs.uk/gp-registration — NHS confirming patient registration at named practice
```

Single centralised endpoint. Trust derives from the `nhs.uk` domain, which is controlled by NHS England. This is the strongest possible authority chain — a government health service confirming its own administrative records.

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## International Equivalents

| Country | Primary Care System | Notes |
|---------|-------------------|-------|
| **UK** | NHS (England, Scotland, Wales, NI) | Centralised patient registration via PDS/CHI/WDS. NHS App already exists |
| **Canada** | Provincial health cards (OHIP, RAMQ, etc.) | Registration with a family doctor is tracked provincially |
| **Australia** | Medicare | GP registration not centralised but Medicare enrolment serves similar purpose |
| **Netherlands** | Huisarts (GP) registration | All residents must register with a GP; municipal health records (GBA) linked |
| **France** | Médecin traitant (declared GP) | Patients declare a treating physician to Assurance Maladie |
| **Germany** | Hausarzt (family doctor) | No mandatory registration; Krankenkasse (health insurance) is the anchor instead |
| **Ireland** | GP registration | Medical card holders have assigned GP; private patients choose freely |
| **New Zealand** | PHO (Primary Health Organisation) enrolment | Patients enrolled with a PHO through their chosen GP |

## Why This Matters Beyond Address Proof

GP registration is one of the few universal registrations in the UK. Almost everyone has one, regardless of:
- Whether they own or rent (unlike council tax)
- Whether they have utility bills in their name (unlike proof of address via energy/telco)
- Whether they're employed (unlike payslips)
- Their immigration status (unlike electoral roll)

For people who are hard to identify — newly arrived migrants, people leaving domestic abuse, homeless people registered at a GP via a "care of" address, young people who've never had a bill in their name — GP registration may be their **only** verifiable link to an address. Making it free and instant isn't just convenient; it's an equity issue.

---
title: "Health Insurance Cards"
category: "Personal Lines Insurance"
volume: "Very Large"
retention: "Policy term (typically 1 year, renewed)"
slug: "health-insurance-cards"
verificationMode: "both"
tags: ["health-insurance", "insurance-card", "member-id", "group-number", "copay", "deductible", "provider-network", "eligibility"]
furtherDerivations: 1
---

## What is a Health Insurance Card?

Every visit to a doctor, dentist, urgent care, or emergency room in the US starts the same way: "Can I see your insurance card?" The front desk photocopies it, enters the member ID and group number, and bills your insurer. The problem: insurance cards are trivially faked. A card showing Blue Cross member ID and group number proves nothing — the person could be uninsured, their coverage could have lapsed, or the card could belong to someone else entirely.

The payer's eligibility system remains the source of truth. Live Verify is strongest here as a **bridge into live payer status**, not as a claim that the plastic card itself is the important artifact.

There are really three artifacts in this family:

- **Wallet card:** coarse in-person claim, "this person has cover"
- **Portable coverage excerpt:** detailed human-readable claim, "this cover applies through this end date unless renewed"
- **Wallet/app credential:** stronger in-person presentation, but less useful for email-forwarding and pre-visit planning

The best Live Verify fit is the **portable coverage excerpt** used outside payer tooling for planned care, scheduling, estimates, and provider negotiation. That stronger case now has its own document: [Health Insurance Coverage Excerpts](view.html?doc=health-insurance-coverage-excerpts).

This file is therefore focused on the **wallet card** use case: the thin, in-person claim that a person currently has cover.

<div style="max-width: 420px; margin: 24px auto; font-family: sans-serif; border: 1px solid #005a9c; border-radius: 12px; background: #fff; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
  <div style="background: linear-gradient(135deg, #005a9c 0%, #003d6b 100%); color: #fff; padding: 15px 20px; display: flex; align-items: center; justify-content: space-between;">
    <div>
      <div style="font-weight: bold; font-size: 1.1em;"><span verifiable-text="start" data-for="healthins"></span>Blue Cross Blue Shield</div>
      <div style="font-size: 0.8em; opacity: 0.9;">of Illinois</div>
    </div>
    <div style="width: 45px; height: 45px; background: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #005a9c; font-weight: bold; font-size: 0.6em; text-align: center;">BCBS</div>
  </div>
  <div style="padding: 15px 20px;">
    <div style="font-size: 0.7em; color: #888; text-transform: uppercase; margin-bottom: 2px;">Plan</div>
    <div style="font-weight: bold; margin-bottom: 10px;">BlueChoice Preferred PPO</div>
    <div style="font-size: 0.7em; color: #888; text-transform: uppercase; margin-bottom: 2px;">Member</div>
    <div style="font-weight: bold; margin-bottom: 10px;">MARTINEZ, ELENA R.</div>
    <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
      <div>
        <div style="font-size: 0.7em; color: #888; text-transform: uppercase;">Member ID</div>
        <div style="font-weight: bold; font-family: 'Courier New', monospace;">XGH882741003</div>
      </div>
      <div style="text-align: right;">
        <div style="font-size: 0.7em; color: #888; text-transform: uppercase;">Group #</div>
        <div style="font-weight: bold; font-family: 'Courier New', monospace;">774401</div>
      </div>
    </div>
    <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
      <div>
        <div style="font-size: 0.7em; color: #888; text-transform: uppercase;">Plan Type</div>
        <div style="font-weight: bold;">PPO</div>
      </div>
      <div style="text-align: center;">
        <div style="font-size: 0.7em; color: #888; text-transform: uppercase;">Effective</div>
        <div style="font-weight: bold;">01/01/2026</div>
      </div>
      <div style="text-align: right;">
        <div style="font-size: 0.7em; color: #888; text-transform: uppercase;">Copay</div>
        <div style="font-weight: bold;">$25 / $50 / $250</div>
      </div>
    </div>
    <div style="font-size: 0.75em; color: #555; margin-bottom: 8px;">
      OV $25 &nbsp;|&nbsp; Specialist $50 &nbsp;|&nbsp; ER $250 &nbsp;|&nbsp; Urgent $75
    </div>
    <div style="display: flex; justify-content: space-between; font-size: 0.75em; color: #555; padding: 8px; background: #f5f7fa; border-radius: 6px; margin-bottom: 12px;">
      <div><strong>RxBIN:</strong> 004336</div>
      <div><strong>RxPCN:</strong> ADV</div>
      <div><strong>RxGrp:</strong> RX7741</div>
    </div>
    <div data-verify-line="healthins" style="border-top: 1px dashed #999; padding-top: 8px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
      title="Demo only: BCBS doesn't yet offer verification endpoints">
      <span data-verify-line="healthins">verify:bcbsil.com/member/v</span> <span verifiable-text="end" data-for="healthins"></span>
    </div>
  </div>
</div>

## Data Verified

Member name, member ID, group number, plan type (PPO/HMO/EPO), effective date, insurer name. NOT included in the hash: deductible amounts, out-of-pocket maximums, specific coverage details (those live in the Summary of Benefits and Coverage, a separate document).

**Artifact roles:**
- **Wallet card:** member ID, group number, plan family, coarse active/inactive status
- **Coverage excerpt:** service class, effective period, renewal/end date, network notes, plan context for planned care

## Verification Response

The endpoint returns a simple status code:

- **ACTIVE** — Coverage is current and active
- **INACTIVE** — Coverage has lapsed or been terminated
- **PENDING** — Coverage is enrolled but not yet effective (waiting period)
- **COBRA** — Former employee on COBRA continuation coverage
- **SUSPENDED** — Premium non-payment; grace period
- **DEPENDENT_ONLY** — This card is valid for a dependent, not the primary member presenting it
- **404** — No matching record (forged card, wrong insurer, or OCR error)

The issuer domain is visible from the `verify:` line on the card itself (e.g., `bcbsil.com`).

## Second-Party Use

The **Insured Member** (second party) receives the insurance card from the insurer (first party), **keeps it**, and presents it whenever they access healthcare.

**New Provider:** Moving to a new city, seeing a new doctor. The front desk scans the card and gets coarse confirmation that coverage exists and is active, then uses the payer system only if deeper questions arise.

**Emergency Treatment While Traveling:** At an ER in another state. The triage desk scans the card. Coverage confirmed in seconds, not hours. Treatment starts immediately instead of after billing department phone calls.

**Job Change Verification:** You left your old job two weeks ago. Is your new employer's coverage active yet? Scan your own card and find out, instead of calling HR and being told "it takes 2-4 weeks to show up in the system."

**Dependent Children (Custody Situations):** Parent with insurance needs to prove coarse active coverage for a child at the other parent's doctor's office. A verified card settles the immediate question while the fuller excerpt can carry the detailed planning context.

## Third-Party Use

**Healthcare Providers (Front Desk, ER Triage, Urgent Care)**
The primary verifier. Front desk staff scan the card before the patient is seen. ACTIVE means proceed with check-in. INACTIVE or 404 means discuss self-pay options before services are rendered, not after a $3,000 bill goes to collections.

**Pharmacies**
Verifying prescription drug coverage before dispensing. The RxBIN/RxPCN/RxGrp on the card routes the claim, but a verified card confirms the member is eligible before the pharmacist fills a $400 specialty medication.

**Dental Offices**
Dental coverage is often separate from medical. Verifying the dental plan is active before a $2,000 crown procedure.

**Vision Providers**
Same pattern — separate coverage, separate verification.

**Mental Health Providers**
Therapists and psychiatrists verifying coverage before intake, particularly important given the complexity of mental health parity requirements.

**Ambulance / EMS**
Verifying coverage for transport billing. Ambulance bills routinely exceed $1,000; knowing coverage status before transport helps with billing decisions and patient communication.

**Hospitals and Specialist Practices (Elective Procedures)**
The wallet card is only the opening move here. For the stronger planned-care use case, see [Health Insurance Coverage Excerpts](view.html?doc=health-insurance-coverage-excerpts).

**Employer HR Departments**
Verifying that an employee has actually activated their coverage after open enrollment. HR sees "enrolled" in their system but needs to confirm the insurer has processed it.

## Verification Architecture

**The Insurance Card Fraud Problem**

- **Borrowed cards:** Using a family member's or friend's card. The most casual form of insurance fraud — "just use my card, they never check."
- **Lapsed coverage presented as active:** The most common fraud. Person lost their job three months ago, kept the card, and presents it at the doctor's office as if nothing changed.
- **Fabricated cards:** Fake insurer names or fake member IDs on convincing-looking cards. Easy to produce — insurance cards have no security features beyond printed text.
- **Identity theft via stolen insurance identity:** Someone else's member ID and group number used to obtain medical services, creating a billing nightmare and corrupting the victim's medical records.
- **"Ghost patients":** Entirely fabricated patients paired with real insurance details. Used for billing fraud by corrupt providers — not card fraud per se, but verified cards make it harder to submit claims for nonexistent visits.
- **Duplicate cards across states:** Person insured in Illinois uses the card in Texas where coverage doesn't apply (out-of-network, out-of-area plan restrictions). The card looks valid but the coverage isn't.

**Issuer Types** (First Party)

**Private Health Insurers:** (Blue Cross Blue Shield, UnitedHealthcare, Aetna, Cigna, Humana, Kaiser Permanente) — the vast majority of US health insurance cards.
**Self-Insured Employers via TPAs:** Large employers who self-insure but use third-party administrators to process claims. The TPA issues the card.
**State Medicaid Programs:** (See Further Derivations.)
**Federal Medicare:** (See Further Derivations.)

## Privacy Salt

**Critical.** Health insurance membership reveals that a person has (or lacks) health coverage, which insurer they use, and their group number (which identifies their employer). In the US, health insurance status is tied to employment, income, and potentially medical conditions (certain plan types suggest chronic conditions). The hash must be salted to prevent enumeration of members by employer group number — an attacker who knows the group number format could otherwise attempt to enumerate all employees at a target company and determine their insurance status.

## Authority Chain

**Pattern:** Regulated

Bupa, a regulated health insurer, is authorized by the FCA to issue verified health insurance cards and membership eligibility confirmation.

```
✓ membercard.bupa.co.uk/verify — Issues verified health insurance membership cards
  ✓ fca.org.uk/register — Regulates UK life insurance and pensions firms
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Competition

| Feature | Live Verify | EDI 270/271 Eligibility Check | Insurer Phone Verification | Insurer Portal Login | Trust the Card |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Verifiable** | **Yes.** Domain-bound to the insurer. | **Yes.** Direct electronic query. | **Yes.** But slow. | **Yes.** But requires credentialing. | **No.** Card is a piece of plastic. |
| **Who Can Use It** | **Anyone.** Front desk staff with a phone. | **Back office only.** Requires clearinghouse enrollment, EDI software, NPI. | **Anyone.** But requires hold time. | **Credentialed providers only.** Portal login, NPI verification. | **Anyone.** But no verification occurs. |
| **Speed** | **Instant.** 5-second scan. | **Minutes to hours.** Batch processing common; real-time available but complex. | **10-45 minutes.** Hold times, IVR menus, transferred between departments. | **Minutes.** Login, navigate, search by member ID. | **Instant.** But meaningless. |
| **Cost** | **Free.** GET request. | **$0.10-0.50** per transaction via clearinghouse. | **Free.** But staff time is expensive. | **Free.** But setup and maintenance costs. | **Free.** And worthless. |
| **Point of Use** | **Front desk.** Before patient is seen. | **Back office.** After patient is seen. | **Anywhere.** But nobody has 30 minutes. | **Desktop only.** Not mobile-friendly. | **Front desk.** No verification. |
| **Real-Time** | **Yes.** Current status at moment of scan. | **Mostly.** Some payers batch responses. | **Yes.** But 30 minutes later. | **Yes.** When portal is up. | **No.** Card could be months old. |

**Why Live Verify helps here:** The 270/271 system exists but is locked behind clearinghouse enrollment, EDI software, and NPI credentialing. Live Verify is valuable when it exposes that live payer status through a simpler human workflow:

- a front desk checking a wallet card for coarse status
- a provider reviewing a portable coverage excerpt before planned care
- a patient sending detailed cover information outside the payer portal

The strongest claim is not "trust the card." It is "bridge human-readable coverage artifacts back to live payer status." The card remains the coarse in-person layer; the excerpt is the stronger portable layer.

## Jurisdictional Witnessing (Optional)

Some jurisdictions, contracts, or multi-party workflows may add an independent witness layer. When used, the witnessing firm:

- Receives all hashes from the issuer, and any subsequent changes to the payload as they happen—which may manifest as a new hash, a status change, or even a 404 (record deleted)
- Receives structured content/metadata (member ID, group number, effective dates, plan type)
- Does **NOT** receive plaintext or sensitive personal information
- Provides an immutable, timestamped audit trail—available to the jurisdiction on demand, to members/third parties during disputes, or as expert witness testimony in legal proceedings

This provides:
- **Non-repudiation:** Insurer cannot deny issuing the card or the coverage it represents
- **Timestamp proof:** Coverage status existed at a specific time (critical for billing disputes)
- **Regulatory audit:** State insurance commissioners can inspect the witness ledger for fraud detection and compliance monitoring
- **Resilience:** Verification works even if insurer's systems go down

**Public Blockchain (Non-Party)**

If a witness layer exists, it may periodically commit rollups to a public blockchain as an additional timestamping mechanism. That is optional, not inherent to the use case. The verification paths would then be:

1. **Insurer domain** — Direct check against the issuer
2. **Witnessing firm** — Independent confirmation with timestamp
3. **Public blockchain** — Decentralized trust anchor via rollup inclusion

## Further Derivations

1. **Dental and vision insurance cards** — Separate coverage, separate cards, separate verification. Same architecture but different insurers (Delta Dental, VSP, EyeMed) and different eligibility statuses. Often bundled with medical but administered independently.
2. **Medicare/Medicaid cards** — Government-issued, different verification infrastructure. Medicare uses CMS systems; Medicaid varies by state. The verification pattern is identical but the issuer is a government agency, not a private insurer, and the authority chain runs through CMS or state Medicaid offices rather than state insurance commissioners.

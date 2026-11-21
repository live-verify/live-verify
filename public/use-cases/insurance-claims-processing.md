---
title: "Claims Correspondence and EOBs"
category: "Insurance Claims & Operations"
volume: "Large"
retention: "Claim term + 7-10 years"
slug: "insurance-claims-processing"
verificationMode: "clip"
tags: ["adjuster-notes", "audit-trail", "bad-faith", "claims", "claims-diary", "compliance", "eob", "full-and-final", "healthcare-billing", "insurance", "insurance-claims", "legal-contract", "liability", "loss-reserves", "provider-dispute", "reinsurance-audit", "release", "settlement"]
furtherDerivations: 3
---

## What is an EOB?

An Explanation of Benefits (EOB) is the document your health insurance company sends you after you visit a doctor. It is NOT a bill.

It is a detailed breakdown showing:
1.  **The Discount:** How much the insurance company forced the doctor to lower their price.
2.  **The Payment:** Exactly how much the insurance company paid.
3.  **The Debt:** Exactly how much you (the patient) are still allowed to be billed.

Verified EOBs are critical for stopping "Balance Billing"—when a hospital tries to charge a patient for the "Discount" amount that the insurance company already negotiated away.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="eob"></span>UNITEDHEALTHCARE                         Claim #: 99228877-EOB
Explanation of Benefits (EOB)

Patient:  SARAH J. DOE                Service Date:   Feb 10, 2026
Provider: Mercy General Hospital      Statement Date: Mar 15, 2026

Description                                              Amount
───────────────────────────────────────────────────────────────────
Billed Amount                                        $ 1,200.00
Plan Discount (Contracted)                          -$   400.00
Your Plan Paid                                      -$   640.00
───────────────────────────────────────────────────────────────────
YOU OWE (Patient Responsibility):                    $   160.00

This is NOT a bill. This is your record of how the claim
was processed.

<span data-verify-line="eob">verify:uhc.com/claims/v</span> <span verifiable-text="end" data-for="eob"></span></pre>
</div>

## The Problem: Phantom Bill Fraud

- **Balance Billing:** Hospitals pretending they didn't receive an EOB or that the "Allowed Amount" was higher to collect more from the patient.
- **PDF Alteration:** Patients editing a $100 copay to read $1,000 to drain their HSA/FSA for cash.
- **Duplicate Claims:** Using an old EOB to claim reimbursement from two different insurance companies (e.g., personal and work policies).

## What Is Checked

Patient name, member ID (partial), provider name, service date, claim number, billed amount, allowed amount, plan paid amount, patient responsibility (deductible/copay), adjustment reason codes.

**Document Types:**
- **Explanation of Benefits (EOB):** Post-service summary.
- **Predetermination Letter:** Pre-service cost estimate.
- **Appeal Decision Letter:** Proving a denied claim was overturned.
- **Subrogation Questionnaire:** Investigating 3rd party liability.

## What the Checker Sees

Shows the issuer domain (`uhc.com`, `aetna.com`) and claim status.

**Status Indications:**
- **Processed** — Data matches the carrier's final adjudication.
- **In-Appeal** — Patient has formally challenged the calculation.
- **Reversed** — Claim was re-processed; this EOB is void.
- **Denied** — Payment rejected (reason provided).

## Who Holds It

The Patient benefits from verification.

**Billing Disputes:** Proving to a hospital's billing department that the insurance company *actually* allowed a 40% discount, preventing the hospital from "Balance Billing" the patient for the full amount. A verified EOB is much harder for a hospital to ignore than a standard PDF.

**Flexible Spending Accounts (FSA/HSA):** Providing verified proof of "Patient Responsibility" to an HSA administrator to release tax-free funds without manual review.

## Who Checks It

**Healthcare Providers (Clinics)**
**Reconciliation:** Verifying that the EOB provided by the patient matches what the insurer claims to have paid, spotting "Paper Check" vs "Electronic" discrepancies.

**Secondary Insurers**
**COB (Coordination of Benefits):** When a patient has two insurance plans, the secondary plan needs to see the "Verified Primary EOB" to calculate their share accurately.

**Mortgage Lenders**
**Medical Debt Audit:** If a borrower has large medical bills, lenders can verify the "Patient Responsibility" EOBs to ensure the debt isn't being exaggerated or hasn't already been paid by insurance.

## Who Issues It

**Issuer Types** (First Party)

**Health Insurers:** (UHC, Anthem, Aetna, Cigna).
**TPA Administrators:** (For self-insured employer plans).
**Government Payers:** (Medicare / Medicaid).

**Privacy Salt:** Highly critical. EOBs contain sensitive clinical and financial data. The hash must be salted to prevent "Guess-and-Check" attacks.

## Compared With Patient Portals

| Feature | Live Verify | Insurance Portal (Login) | Paper EOB |
| :--- | :--- | :--- | :--- |
| **User Control** | **High.** Share one specific EOB. | **Low.** Giving portal access reveals *full* medical history. | **Medium.** |
| **Trust Anchor** | **Domain-Bound.** Bound to the Insurer. | **System-Bound.** | **Zero.** Easily forged. |
| **Interoperability** | **Universal.** Works across all carriers. | **Siloed.** | **Universal.** |
| **Speed** | **Instant.** 5-second scan. | **Slow.** Requires 2FA, login, navigation. | **N/A.** |

**Where each fits:** The insurer's portal remains the best place for a member to see every claim and statement in one view, and providers already connected to the insurer will keep using their own channels. When a patient needs to show a single explanation of benefits to a hospital billing office or a lender, handing over portal access would expose far more than that one statement. Live Verify lets them share the one page and lets the recipient confirm the insurer issued it.

---

_[Content merged from: claims-diary-reserve-changes]_

## What is a Claims Diary?

When an insurance adjuster handles a claim, they keep a "Diary"—a minute-by-minute log of every phone call, every medical report, and every financial change.

A Reserve Change is when the adjuster says: "Wait, this injury is worse than we thought; we need to set aside $100,000 more to pay for it."

In lawsuits, these diaries are "Evidence Item #1." If an insurance company is accused of "Bad Faith" (ignoring a claim), the diary is the only way to prove they were actually working on it. Verified hashes prevent companies from "Backdating" diary notes after a lawsuit is filed to make themselves look better.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #555; background: #fff; padding: 0; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
  <div style="padding: 20px; background: #fff;">
    <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="diary"></span>ACE INDEMNITY GROUP
INTERNAL CLAIMS DIARY & RESERVE LOG
═══════════════════════════════════════════════════════════════════
Claim #:   99228877-WC
Adjuster:  MIKE MILLER (ID #992)

RESERVE CHANGE #04
───────────────────────────────────────────────────────────────────
Date:                  15 MAR 2026 14:22:01
Old Indemnity Reserve: $ 50,000.00
New Indemnity Reserve: $ 125,000.00
Change:                +$ 75,000.00

ADJUSTER DIARY NOTE:
Received surgery estimate from claimant's physician. Injury
significantly more severe than initially reported. Case now
exceeds $100k threshold; escalated to supervisor for Large
Loss Review.

<span data-verify-line="diary">verify:ace-insurance.com/claims/v</span> <span verifiable-text="end" data-for="diary"></span></pre>
  </div>
</div>

## What Is Checked

Claim ID, adjuster name/ID, reserve category (Indemnity/Medical/Expense), change amount, previous balance, new balance, timestamp (to the second), diary note text (digest), supervisor authorization status.

**Document Types:**
- **Reserve History Log:** Summary of all financial changes.
- **Adjuster Diary Extract:** The narrative "Daily Log" of actions.
- **Large Loss Notification:** Form sent to reinsurers for big spikes.

## What the Checker Sees

Shows the issuer domain (the Insurance Carrier) and the log standing.

**Status Indications:**
- **Verified** — Change matches the carrier's core ledger and timestamp.
- **Backdated** — Log entry was created after the effective date.
- **Unauthorized** — Change was made but lacks mandatory supervisor sign-off.
- **Void** — Reserve change was reversed due to data entry error.

## Who Holds It

The Claims Adjuster benefits from verification.

**Defensive Documentation:** Proving that they raised the reserve *immediately* upon receiving new medical data, defending against accusations of "Bad Faith" or "Late Reporting" during a subsequent audit or litigation.

**Escalation Proof:** Proving to a supervisor that the Large Loss Review was triggered on the exact date mandated by company policy.

## Who Checks It

**Reinsurers**
**Reserve Audit:** Reinsurers conduct periodic "Reserve Reviews" to ensure the primary carrier isn't hiding losses by keeping reserves artificially low. Live Verify allows the auditor to instantly verify the history of every reserve change without trusting a manually compiled Excel file.

**State Market Conduct Examiners**
**Claims Handling Integrity:** Verifying that the carrier isn't "Backdating" diary notes to make it look like they contacted claimants within the 14-day statutory limit when they actually waited 30 days.

**Forensic Accountants**
**Loss Development Analysis:** Verifying the "Age" of reserves to build accurate actuarial models of how long it takes for a typical claim to reach its final value.

## How Verification Works Here

**The "Diary Tampering" Fraud Problem**

- **Post-Loss Engineering:** Editing a diary note from "Claimant seems fine" to "Claimant reported severe pain" after a lawsuit is filed to make the file look better.
- **Reserve Smoothing:** Hiding a $1M spike by splitting it into 10 smaller $100k changes spread across different dates.
- **Backdating:** Creating a diary entry today but dating it last month to hide a failure to respond to a legal notice.

**Issuer Types** (First Party)

**Primary Insurers:** (Chubb, Zurich, AIG).
**TPAs (Third Party Administrators):** (Sedgwick, ESIS, CorVel).
**Claims Management Systems:** (Guidewire, Duck Creek).

**Privacy Salt:** Highly critical. Internal notes contain sensitive medical/legal opinions. The hash must be salted to prevent unauthorized access to claim narratives.

## Compared With Guidewire Audit Logs

| Feature | Live Verify | System Audit Log (Guidewire) | PDF Export |
| :--- | :--- | :--- | :--- |
| **Trust Anchor** | **Domain-Bound.** Bound to the Carrier. | **Admin-Bound.** Can be edited by DB admins. | **Zero.** Easily forged. |
| **Auditor Access** | **Universal.** Reinsurer can verify any PDF. | **Restricted.** Requires expensive licenses/login. | **Manual.** |
| **Tamper Proof** | **Cryptographic.** Proves the *Text* of the note. | **Vulnerable.** Internal logs can be "cleaned up." | **Vulnerable.** |
| **Immutability** | **High.** Once hashed, the note is fixed. | **Medium.** Database changes can be hidden. | **Zero.** |

**Where each fits:** The claims system and its audit log are where the carrier's own staff and internal auditors should work, and they hold far more detail than any exported file. Reinsurers and state regulators usually sit outside that system and review the PDFs sent to them. Live Verify gives those outside reviewers a way to confirm that a file note is the text the carrier published at the time, alongside whatever system access the carrier chooses to grant.

---

_[Content merged from: claims-settlement-agreements]_

## What is a Settlement Agreement?

A Settlement Agreement (or Release) is the final contract that ends a legal dispute. It says: "The insurance company pays you $25,000, and in exchange, you promise never to sue them again for this accident."

These documents are the "Finish Line" of the legal system.

Because they trigger large payments, they are targets for "PDF alteration." A dishonest person might edit a $10,000 agreement to read $50,000 to trick their partners or a bank. Verified hashes ensure that the final dollar amount and the release terms cannot be changed after the signatures are dry.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #999; background: #fff; padding: 0; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
  <div style="padding: 25px; background: #fff;">
    <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="settle"></span>SETTLEMENT AGREEMENT AND RELEASE
═══════════════════════════════════════════════════════════════════

This Settlement Agreement and Release (the "Agreement") is
entered into as of March 15, 2026, by and between:

RELEASOR:  SARAH J. DOE
RELEASEE:  ACME INDEMNITY INSURANCE CO.

In consideration of the sum of TWENTY-FIVE THOUSAND DOLLARS
($25,000.00), the Releasor hereby releases and forever
discharges the Releasee from any and all claims arising out
of the incident occurring on or about June 1, 2025.

This Agreement represents a full and final settlement of the
disputed claims. No further liability exists on the part of
the Releasee.

─────────────────────────        ─────────────────────────
Sarah J. Doe                     Michael Miller, Adjuster
Releasor                         For Acme Indemnity

<span data-verify-line="settle">verify:acme-insurance.com/legal/v</span> <span verifiable-text="end" data-for="settle"></span></pre>
  </div>
</div>

## What Is Checked

Releasor name, Releasee name, settlement amount (numerical and text), incident date, Claim ID, effective date of agreement, signature status of both parties.

**Document Types:**
- **Full and Final Release:** Ending all current and future liability.
- **Partial Release:** For specific segments (e.g., Property Damage only).
- **Structure Settlement Annuity:** For long-term payouts.
- **Stipulation of Discontinuance:** To close a court case.

## What the Checker Sees

Shows the issuer domain (the Insurance Carrier or Law Firm) and current legal status.

**Status Indications:**
- **Fully Executed** — Signed by all parties and funds authorized.
- **Payment Pending** — Agreement valid; check en route.
- **Void** — Superseded by a new agreement or retracted.
- **In-Litigation** — Release being challenged in court (e.g., for "Bad Faith").

## Who Holds It

The Claimant (Releasor) benefits from verification.

**Anti-Tampering:** Ensuring that the "Release Terms" or "Settlement Amount" aren't altered by a third party (like an unscrupulous broker or attorney) after the claimant has signed the paper.

**Mortgage / Loan Approval:** Proving to a lender that a "Legal Dispute" listed on their credit report has been "Verified Settled" and the funds have been received, improving their debt-to-income profile.

## Who Checks It

**Reinsurers**
**Claim Closure Audit:** Reinsurers verify that the primary carrier actually secured a "Verified Release" before paying out their share of a multimillion-dollar loss. This prevents "Leaky Settlements" where the carrier pays but forgets to get a signed release.

**Banks / Lienholders**
**Lien Satisfaction:** Verifying that the settlement amount includes the mandatory payment to the lienholder (e.g., the auto lender or medical provider).

**The Courts**
**Case Dismissal:** A judge can scan the verification hash on a "Stipulation of Discontinuance" to ensure it matches the insurer's records before officially closing the court docket.

## How Verification Works Here

**The "PDF Alteration" Fraud Problem**

- **Amount Inflation:** An attorney taking a $10,000 settlement agreement and editing the PDF to read $50,000 to show their partners (while only paying the client $10k).
- **Date Forgery:** Editing an old 2023 release to appear as if it covers a 2026 incident.
- **Scope Erasure:** Deleting "Future Medicals" exclusions from the release text to keep the door open for more claims.

**Issuer Types** (First Party)

**Insurance Carriers:** (Allstate, Zurich, Chubb).
**Defense Law Firms:** (Hosting on behalf of their carrier clients).
**Structured Settlement Firms.**

## Authority Chain

**Pattern:** Regulated

Aviva, a regulated insurance claims processor, is authorized by the FCA to issue verified explanation of benefits and claims settlement documents.

```
✓ claims.aviva.co.uk/eob/verify — Issues verified claims correspondence and EOBs
  ✓ fca.org.uk/register — Regulates UK general insurance firms
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Compared With Court Dockets (PACER)

| Feature | Live Verify | Court Docket (PACER) | Scanned PDF Release |
| :--- | :--- | :--- | :--- |
| **Privacy** | **High.** Private settlements stay private. | **Low.** Everything is public record (if filed). | **Medium.** |
| **Granularity** | **High.** Shows exact dollar amounts. | **Low.** Many settlements are "Confidential" in court. | **Vulnerable.** |
| **Trust Anchor** | **Domain-Bound.** Bound to the Payer. | **Gov-Bound.** | **Zero.** Easily forged. |
| **Interoperability** | **Universal.** PDFs stay verifiable. | **Siloed.** Requires PACER login/fees. | **Manual.** |

**Where each fits:** Where a settlement is filed with a court, the docket is the authoritative public record and should be consulted. Most insurance settlements are private agreements that never reach a docket, so there is nothing public to look up. Live Verify serves those cases: a party handed the release can confirm the payer stands behind its exact text, and the terms stay between the people who hold the document.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).

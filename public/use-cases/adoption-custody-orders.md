---
title: "Adoption Papers and Custody Orders"
category: "Government & Civic Documents"
volume: "Very Small"
retention: "Permanent (legal guardianship)"
slug: "adoption-custody-orders"
tags: ["adoption", "custody", "orders", "court", "family", "law"]
furtherDerivations: 1
---

## What is a Custody Order?

A **Custody Order** (or Allocation Judgment) is a court decree defining who is responsible for a child. It answers critical questions:
1.  **Who decides?** (School, Doctor, Religion)
2.  **Who has the child when?** (Weekends, Holidays)
3.  **Are there restrictions?** (No leaving the state, supervised visits only)

These documents are presented to schools, police, doctors, and passport agents. The problem is that parents often present **outdated orders** to authorities to override the other parent's rights.

<div style="max-width: 600px; margin: 24px auto; font-family: 'Times New Roman', serif; border: 1px solid #ccc; background: #fff; padding: 40px; box-shadow: 2px 2px 10px rgba(0,0,0,0.1);">
  <div style="text-align: center; margin-bottom: 30px;">
    <div style="font-weight: bold; font-size: 1.2em; text-transform: uppercase;"><span verifiable-text="start" data-for="custody">[</span>In the Circuit Court of Cook County, Illinois</div>
    <div style="font-size: 1em; margin-top: 5px;">County Department, Domestic Relations Division</div>
  </div>
<div style="display: flex; justify-content: space-between; margin-bottom: 30px;">
    <div>
      <strong>In re the Marriage of:</strong><br><br>
      JANE DOE, Petitioner,<br>
      and<br>
      JOHN DOE, Respondent.
    </div>
    <div style="text-align: right;">
      <br>
      <strong>Case No.</strong> 2025-D-092341<br>
      <strong>Calendar:</strong> 42<br>
    </div>
  </div>
<h3 style="text-align: center; text-decoration: underline; text-transform: uppercase;">Final Allocation Judgment of Parental Responsibilities</h3>
<div style="font-size: 0.95em; line-height: 1.6; text-align: justify;">
    <p>This cause coming to be heard for entry of a Final Allocation Judgment, the Court finds:</p>
    <p>1. The parties have agreed to a Parenting Plan regarding the minor child, <strong>MICHAEL DOE (DOB: 05/12/2018)</strong>.</p>
    <p>2. <strong>Decision-Making:</strong> The Petitioner (Mother) shall have sole decision-making responsibility for education and healthcare.</p>
    <p>3. <strong>Parenting Time:</strong> The Respondent (Father) shall have parenting time every other weekend from Friday 5:00 PM to Sunday 5:00 PM.</p>
<p><strong>IT IS ORDERED</strong> that the Parenting Plan attached hereto is incorporated by reference.</p>
  </div>
<div style="margin-top: 50px; display: flex; justify-content: space-between; align-items: flex-end;">
    <div style="border-top: 1px solid #000; width: 40%; text-align: center; padding-top: 5px;">
      Hon. Judge Susan Miller<br>
      <span style="font-size: 0.8em;">OCT 12 2025</span>
    </div>
    <div style="width: 40%; text-align: right;">
      <div style="border: 2px solid #000; display: inline-block; padding: 10px; transform: rotate(-10deg); color: #000; font-weight: bold; opacity: 0.7;">
        ENTERED<br>
        CLERK OF COURT
      </div>
    </div>
  </div>
<div data-verify-line="custody" style="border-top: 1px dashed #999; margin-top: 40px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
      title="Demo only: Court doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:cookcountycourt.org/orders/v <span verifiable-text="end" data-for="custody">]</span>
  </div>
</div>

## Data Verified

Child's name, parents' names, court jurisdiction, case number, judge name, order type (custody, adoption, visitation), effective date, key restrictions (e.g., "no international travel").

**Document Types:**
- **Adoption Decree:** Finalizing legal parentage.
- **Allocation Judgment:** Modern term for "custody order" detailing decision-making and parenting time.
- **Order of Protection:** Restraining orders affecting custody.
- **Letters of Guardianship:** For non-parent legal guardians.

**Privacy and Salt:** Given the extreme sensitivity of child records, the hash MUST use a high-entropy random salt (printed on the document) to prevent "brute force guessing" of hashes to find children's names.

## Data Visible After Verification

Shows the issuer domain (e.g., `cookcountycourt.org`) and the order status.

**Status Indications:**
- **Valid** — Order is current and the latest on file.
- **Modified** — Superseded by a more recent court order (critical for custody disputes).
- **Vacated** — Order is no longer in effect.

## Second-Party Use

The **Custodial Parent** or **Adoptive Parent** benefits from verification.

**School Enrollment:** Proving to a school registrar that they have the sole authority to enroll the child and designate emergency contacts.

**International Travel:** Proving to border agents (CBP) that they have the sole right to travel with the child, or that the other parent has consented (preventing international abduction accusations).

**Healthcare Decisions:** Proving to a hospital that they have decision-making power for the child's surgery.

## Third-Party Use

**Schools**
**Enrollment Integrity:** Schools often face "parent wars" where one parent tries to override the other's instructions. A verified, current court order definitively settles who has decision-making power.

**Doctors and Hospitals**
**Consent Validity:** Before performing non-emergency procedures, doctors need to know if the presenting parent actually has the legal right to consent, especially in divorced families.

**Police**
**Domestic Disputes:** When called to a "custody dispute" at a handover location, police are often shown conflicting paper orders by shouting parents. Scanning the QR/text to see "Status: MODIFIED - See Order dated Nov 2025" allows officers to enforce the *current* order instantly.

**Passport Agencies**
**Passport Issuance:** The State Department requires proof of sole custody or two-parent consent. Verification prevents one parent from fraudulently obtaining a passport for a child.

## Verification Architecture

**The Custody Fraud Problem**

- **Outdated Orders:** The most common issue. A parent presents the 2023 order giving them full custody, hiding the 2025 order that switched custody to the other parent.
- **Forgery:** Photoshop is easily used to remove "Supervised Visitation Only" restrictions.
- **Jurisdiction Shopping:** Presenting an order from another state that has been superseded by the home state's court.

**Issuer Types** (First Party)

**Circuit/Family Courts:** The primary issuers.
**Probate Courts:** For guardianships.

## Jurisdictional Witnessing

A jurisdiction may require the issuer to retain a **witnessing firm** for regulatory compliance. The witnessing firm:

- Receives all hashes from the issuer, and any subsequent changes to the payload as they happen—which may manifest as a new hash, a status change, or even a 404 (record deleted)
- Receives structured content/metadata (key identifiers and dates)
- Does **NOT** receive plaintext or sensitive personal information
- Provides an immutable, timestamped audit trail—available to the jurisdiction on demand, to document holders/third parties during disputes, or as expert witness testimony in legal proceedings

This provides:
- **Non-repudiation:** Issuer cannot deny issuing the document
- **Timestamp proof:** Document existed at a specific time
- **Regulatory audit:** Jurisdictions can inspect the witness ledger for fraud detection
- **Resilience:** Verification works even if issuer's systems go down

**Public Blockchain (Non-Party)**

Witnessing firms may periodically commit rollups to an inexpensive public blockchain, providing an ultimate immutability guarantee. The blockchain is a "non-party"—infrastructure, not a participant in the transaction. This creates multiple verification paths:

1. **Issuer domain** — Direct check against the issuer
2. **Witnessing firm** — Independent confirmation with timestamp
3. **Public blockchain** — Decentralized trust anchor via rollup inclusion


## Critical Freshness Warning

**⚠️ Custody orders change frequently.** Unlike most verified documents, custody orders can be modified, superseded, or vacated by subsequent court rulings — sometimes within days of the original order.

**The freshness problem:**
- A "VALID" status means the hash matches *and* the order hasn't been superseded
- Courts must update verification status in real-time when new orders are entered
- Stale data is dangerous — a parent could present a verified order that was modified yesterday

**Live Verify is a bridge technology here.** The ideal solution is live court integration where police, schools, and hospitals can query the case number directly for the *current* order. Until courts build those APIs, Live Verify provides a partial solution — but only if:
1. Courts commit to updating verification status immediately when orders change
2. Verifiers understand "VALID" means "as of this moment" — not "forever"
3. The `MODIFIED` status is treated as "do not enforce; obtain current order"

**If a court cannot guarantee real-time status updates, this use case may create false confidence.**

## Competition vs. Certified Copies

| Feature | Live Verify | Certified Copy (Raised Seal) |
| :--- | :--- | :--- |
| **Freshness** | **Real-time.** Can indicate if the order was modified yesterday. | **Static.** Only proves the order existed *on the day the copy was printed*. |
| **Accessibility** | **Instant.** Police/Schools can verify on the spot. | **Slow.** Requires calling the court clerk (often impossible) to check validity. |
| **Cost** | **Low.** Self-service. | **High.** Certified copies cost money and require trips to the courthouse. |
| **Tamper Proofing** | **Cryptographic.** Hash breaks if text changes. | **Physical.** Raised seals are hard to forge but not impossible; colored paper can be photocopied. |

**Why OCR is a bridge solution:** The "freshness" problem is massive in family law. A paper "Certified Copy" from 6 months ago is dangerous because it doesn't show that the judge stripped custody last week. A live verification link to the court record prevents the enforcement of stale/dangerous orders — *but only if the court maintains real-time status updates*. Long-term, direct court API integration is the better answer.

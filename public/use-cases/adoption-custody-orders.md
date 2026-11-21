---
title: "Adoption Papers and Custody Orders"
category: "Government & Civic Documents"
volume: "Very Small"
retention: "Permanent (legal guardianship)"
slug: "adoption-custody-orders"
verificationMode: "clip"
tags: ["adoption", "custody", "orders", "court", "family", "law"]
furtherDerivations: 1
---

## What is a Custody Order?

A Custody Order (or Allocation Judgment) is a court decree defining who is responsible for a child. It answers critical questions:
1.  **Who decides?** (School, Doctor, Religion)
2.  **Who has the child when?** (Weekends, Holidays)
3.  **Are there restrictions?** (No leaving the state, supervised visits only)

These documents are presented to schools, police, doctors, and passport agents. The problem is that parents often present outdated orders to authorities to override the other parent's rights.

<div style="max-width: 600px; margin: 24px auto; font-family: 'Times New Roman', serif; border: 1px solid #ccc; background: #fff; padding: 40px; box-shadow: 2px 2px 10px rgba(0,0,0,0.1);">
  <div style="text-align: center; margin-bottom: 30px;">
    <div style="font-weight: bold; font-size: 1.2em; text-transform: uppercase;"><span verifiable-text="start" data-for="custody"></span>In the Circuit Court of Cook County, Illinois</div>
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
      <span data-verify-line="custody">verify:cookcountycourt.org/orders/v</span> <span verifiable-text="end" data-for="custody"></span>
  </div>
</div>

## The Problem: Custody Fraud

- **Outdated Orders:** The most common issue. A parent presents the 2023 order giving them full custody, hiding the 2025 order that switched custody to the other parent.
- **Forgery:** Photoshop is easily used to remove "Supervised Visitation Only" restrictions.
- **Jurisdiction Shopping:** Presenting an order from another state that has been superseded by the home state's court.

## What Is Checked

Child's name, parents' names, court jurisdiction, case number, judge name, order type (custody, adoption, visitation), effective date, key restrictions (e.g., "no international travel").

**Document Types:**
- **Adoption Decree:** Finalizing legal parentage.
- **Allocation Judgment:** Modern term for "custody order" detailing decision-making and parenting time.
- **Order of Protection:** Restraining orders affecting custody.
- **Letters of Guardianship:** For non-parent legal guardians.

**Privacy and Salt:** Given the extreme sensitivity of child records, the hash MUST use a high-entropy random salt (printed on the document) to prevent "brute force guessing" of hashes to find children's names.

## What the Checker Sees

Shows the issuer domain (e.g., `cookcountycourt.org`) and the order status.

**Status Indications:**
- **Valid** — Order is current and the latest on file.
- **Modified** — Superseded by a more recent court order (critical for custody disputes).
- **Vacated** — Order is no longer in effect.

## Who Holds It

The Custodial Parent or Adoptive Parent benefits from verification.

**School Enrollment:** Proving to a school registrar that they have the sole authority to enroll the child and designate emergency contacts.

**International Travel:** Proving to border agents (CBP) that they have the sole right to travel with the child, or that the other parent has consented (preventing international abduction accusations).

**Healthcare Decisions:** Proving to a hospital that they have decision-making power for the child's surgery.

## Who Checks It

**Schools**
**Enrollment Integrity:** Schools often face "parent wars" where one parent tries to override the other's instructions. A verified, current court order definitively settles who has decision-making power.

**Doctors and Hospitals**
**Consent Validity:** Before performing non-emergency procedures, doctors need to know if the presenting parent actually has the legal right to consent, especially in divorced families.

**Police**
**Domestic Disputes:** When called to a "custody dispute" at a handover location, police are often shown conflicting paper orders by shouting parents. Scanning the QR/text to see "Status: MODIFIED - See Order dated Nov 2025" allows officers to enforce the *current* order instantly.

**Passport Agencies**
**Passport Issuance:** The State Department requires proof of sole custody or two-parent consent. Verification prevents one parent from fraudulently obtaining a passport for a child.

## Who Issues It

**Issuer Types** (First Party)

**Circuit/Family Courts:** The primary issuers.
**Probate Courts:** For guardianships.

## Authority Chain

**Pattern:** Sovereign

Example authority chains by jurisdiction:

**US example (matching the sample artifact above):**

```
✓ cookcountycourt.org/orders/v — Issues Cook County family court orders
  ✓ illinoiscourts.gov — Illinois judicial authority
    ✓ illinois.gov — Illinois state government root namespace
```

**UK variant:**

```
✓ courts.gov.uk/family/verify — Issues UK custody and adoption orders
  ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Critical Freshness Warning

**⚠️ Custody orders change frequently.** Unlike most verified documents, custody orders can be modified, superseded, or vacated by subsequent court rulings — sometimes within days of the original order.

**The freshness problem:**
- A "VALID" status means the hash matches *and* the order hasn't been superseded
- Courts must update verification status in real-time when new orders are entered
- Stale data is dangerous — a parent could present a verified order that was modified yesterday

**Live Verify is a bridge technology here.** This is only a strong use case where the court can maintain real-time status. The ideal solution is live court integration where police, schools, and hospitals can query the case number directly for the *current* order. Until courts build those APIs, Live Verify provides a partial solution — but only if:
1. Courts commit to updating verification status immediately when orders change
2. Verifiers understand "VALID" means "as of this moment" — not "forever"
3. The `MODIFIED` status is treated as "do not enforce; obtain current order"

**If a court cannot guarantee real-time status updates, this use case may create false confidence.**

## Where Each Fits: Live Verify and Certified Copies

A certified copy is issued by the court clerk, usually with a raised seal or stamp, to show that it matches the order on file. Certified copies are how courts in most countries already let orders travel to schools, police and other agencies. A certified copy and Live Verify answer different questions and work side by side: the copy says what the order said on the day it was certified, while Live Verify can also tell the checker whether the court still stands behind it.

| | Certified copy with seal | Live Verify on the order |
| :--- | :--- | :--- |
| **Who can check** | Anyone handed the copy, by looking at the seal; confirming it further means contacting the clerk's office. | Anyone handed the order: a school, a police officer, a doctor, an airline, another court. |
| **What the checker gets** | A copy that matched the court record on the day it was certified. | Confirmation that the court issued this exact text, and whether it has since been modified or vacated, if the court keeps its status up to date. |
| **What the parent shares** | The certified copy. | Only the order they chose to hand over. |
| **Reach** | Recognised widely, though a seal from one court is hard for an agency elsewhere to judge, especially across borders. | Global in principle: any court, in any country, that publishes hashes on its own domain. |
| **Speed and cost** | Copies carry a clerk's fee and often a trip to the courthouse; checking one by phone can be slow, especially out of hours. | A few seconds per check: one web lookup, with no fee to the standard. |
| **What it needs** | A clerk's office to certify copies. | The court to publish hashes and keep the status current, and Live Verify-aware software on the checker's device. No court does this yet. |
| **Best suited to** | Formal filings and agencies that require a certified copy. | On-the-spot checks where an outdated order could do harm. |

**Where each fits:** certified copies remain what courts, registries and many agencies formally require, and Live Verify does not change that. Their weakness is that a copy from six months ago cannot show that custody was changed last week. Live Verify lets a school or police officer check the order against the court in a few seconds, provided the court keeps its status up to date and the checker has software that honours it; direct links between court systems and agencies would serve those that have them better still.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).

---
title: "Probate Documents and Estate Proceedings"
category: "Legal & Court Documents"
volume: "Small"
retention: "Permanent (estate records)"
slug: "probate-documents"
verificationMode: "clip"
tags: ["probate", "documents", "financial", "legal", "estate-settlement", "letters-testamentary", "executor", "inheritance-fraud"]
furtherDerivations: 1
---

## What is a Probate Document?

**Probate** is the court-supervised process of identifying a deceased person's assets, paying their debts, and distributing the remaining property to their heirs.

The most critical document in this process is Letters Testamentary (or Letters of Administration). This is the "Key to the Kingdom"—it gives the Executor the legal power to:
1.  **Empty Bank Accounts:** Transfer funds out of the deceased's name.
2.  **Sell Property:** Sign deeds for the deceased's home.
3.  **Access Data:** Take control of email and social media accounts.

**"Estate Hijacking"** is a high-value fraud. Criminals monitor obituaries, create a fake Will, and forge a "Letters Testamentary" document with a fake court seal. They then take this paper to a bank and drain the estate before the real heirs even know probate has started. Live Verify binds the Executor's name and Case ID to the Superior Court's domain, allowing banks to instantly verify the legal authority of the person standing at the counter.

<div style="max-width: 600px; margin: 24px auto; font-family: 'Georgia', serif; border: 1px solid #333; background: #fff; padding: 40px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
  <div style="text-align: center; margin-bottom: 30px;">
    <div style="font-size: 1.3em; font-weight: bold; text-transform: uppercase;"><span verifiable-text="start" data-for="probate"></span>Superior Court of California</div>
    <div style="font-size: 0.9em; letter-spacing: 1px;">COUNTY OF LOS ANGELES</div>
  </div>
<h2 style="text-align: center; font-size: 1.4em; text-decoration: underline; margin-bottom: 25px;">LETTERS TESTAMENTARY</h2>
<div style="font-size: 1em; line-height: 1.6; color: #000; text-align: justify;">
    <p>The Will of <strong>JOHN JACOB DOE</strong>, Deceased, having been admitted to probate in Case No. <strong>26PR992288</strong>, the Court hereby appoints:</p>
<div style="margin: 20px auto; width: 80%; border: 2px solid #000; padding: 15px; text-align: center; background: #f9f9f9;">
      <strong>MARY ALICE JACOB</strong><br>
      as Executor of the Estate.
    </div>
<p>The Executor is authorized to perform all acts required by law to settle the estate, including the power to sell real property and manage financial accounts.</p>
  </div>
<div style="margin-top: 40px; display: flex; justify-content: space-between; align-items: flex-end;">
    <div style="width: 45%;">
      <div style="border-top: 1px solid #000; padding-top: 5px; font-size: 0.9em;">Hon. Michael J. Miller<br>Judge of the Superior Court</div>
    </div>
    <div style="text-align: right; width: 45%;">
      <div style="width: 90px; height: 90px; border: 2px solid #000; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.6em; font-weight: bold; text-align: center; margin-left: auto; transform: rotate(-5deg);">CERTIFIED<br>COURT<br>SEAL</div>
    </div>
  </div>
<div data-verify-line="probate" style="border-top: 1px dashed #999; margin-top: 40px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
      title="Demo only: LA Superior Court doesn't yet offer verification&#10;endpoints, so this is illustrative">
      <span data-verify-line="probate">verify:lacourt.org/probate/v</span> <span verifiable-text="end" data-for="probate"></span>
  </div>
</div>

## The Problem: Phantom Executor Fraud

- **Letter Forgery:** Creating a fake "Letters Testamentary" document to trick a bank into giving a criminal access to a deceased person's accounts.
- **Revocation Hiding:** An executor who was removed by a judge for "stealing from heirs" continuing to use their physical paper appointment to drain other accounts before the institutions find out.
- **Will Contests:** Presenting a "Verified" order that has actually been stayed or vacated by a higher court due to a Will dispute.

## What Is Checked

Deceased name, Case ID number, Executor/Administrator name, Court Jurisdiction (County/State), Date of Appointment, Expiration Date (if applicable), Judge name, Clerk ID, specific limitations (e.g., "No sale of real property").

**Document Types:**
- **Letters Testamentary:** For estates with a valid Will.
- **Letters of Administration:** For estates without a Will (intestate).
- **Small Estate Affidavit:** Simplified version for lower-value estates.
- **Certificate of Discharge:** Proving the executor's work is finished.

## What the Checker Sees

Shows the issuer domain (the State Court system) and the current authority status.

**Status Indications:**
- **Active** — Executor has full current authority to act.
- **Revoked** — The court has removed this executor (e.g., for misconduct).
- **Discharged** — Estate is closed; authority has ended.
- **Expired** — Some jurisdictions require annual renewal of "Letters."

## Who Holds It

The Executor (Personal Representative) benefits from verification.

**Bank Access:** Proving to a branch manager that the "Letters Testamentary" paper is verified and active. This stops the common "Compliance Hold" where banks freeze accounts for days while their legal team calls the court clerk to verify the judge's signature.

**Property Sales:** Providing a verified authority hash to a title company during a real estate closing, ensuring they can sign the deed on behalf of the deceased without title gaps.

## Who Checks It

**Banks and Brokerages**
**Asset Security:** Before allowing an executor to liquidate a $500,000 stock portfolio, the brokerage scans the court's hash. "Verified by lacourt.org" ensures the person isn't an impostor using a "Photoshopped" appointment letter.

**Title Companies**
**Title Integrity:** Verifying that the "Letters" presented at a closing are the latest version and haven't been revoked by a subsequent court order, preventing "Unauthorized Sale" lawsuits from other heirs.

**Life Insurance Companies**
**Payout Accuracy:** Ensuring the person claiming the "Estate" portion of a policy is the Verified Legal Representative authorized to receive the funds.

## Who Issues It

**Issuer Types** (First Party)

**State Court Systems:** (e.g., LA Superior Court, NY Surrogate's Court).
**Clerks of the Court.**
**Estate Planning Software:** (e.g., WealthCounsel - hosting mirror hashes).

## Authority Chain

**Pattern:** Sovereign

UK probate courts issue grant of probate and letters testamentary under the Administration of Estates Act 1925.

```
✓ courts.gov.uk/probate/verify — UK probate court grants and testamentary letters
  ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Where Each Fits: Live Verify, Certified Copies and the Court Docket

Probate courts issue certified copies of grants and orders, and many publish an online docket or index of cases. Procedures differ by country and, in the US, by state and county. Banks and registrars are accustomed to accepting certified copies, and the docket is the authoritative record of the case. Live Verify answers a narrower question about the copy in hand: does the court stand behind it as worded, and is it still in force? They work side by side.

| | Certified copy (ink and seal) | Online court docket | Live Verify on the order |
| :--- | :--- | :--- | :--- |
| **Who can check** | Anyone handed the copy, by eye. | Anyone who has the case number and can search the court's system. | Anyone handed the order: a bank, a registrar, a buyer of estate property. |
| **What the checker gets** | A document bearing the court's seal; seals can be forged. | The court's record of the case and its filings. | Confirmation that the court issued this exact order, as at its date, and its current status, such as revoked. |
| **What the executor shares** | The certified copy. | Nothing; the docket is public where available. | Only the order they chose to hand over. |
| **Reach** | Anywhere the copy is accepted. | One court's system at a time. | Global in principle: any court, in any country, that publishes hashes on its own domain. |
| **Speed and cost** | Obtaining copies takes time and a fee; checking one is a visual inspection. | Free or low cost, but needs the case number and a search. | A few seconds per check: one web lookup, with no fee to the standard. |
| **What it needs** | Familiarity with what genuine seals look like. | Online access to that court's records. | The court to publish hashes, and Live Verify-aware software on the checker's device. No court does this yet. |
| **Revocation** | Not shown; the paper stays the same. | Shown on the docket, if checked. | The court can mark the order revoked. |
| **Best suited to** | Formal acceptance by banks and registrars. | The authoritative record of the case. | A quick first check before releasing funds or transferring property. |

**Where each fits:** A certified copy from the court is what banks and registrars are accustomed to accepting, and the court's docket remains the authoritative record of the case. Both take time to check, and a certified copy does not change if the grant is later revoked. Live Verify lets the person about to release funds confirm that the court stands behind the order as presented and see its current status, as a quick first check beside the certified copy.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).

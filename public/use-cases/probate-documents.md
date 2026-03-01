---
title: "Probate Documents and Estate Proceedings"
category: "Financial & Legal Documents"
volume: "Small"
retention: "Permanent (estate records)"
slug: "probate-documents"
tags: ["probate", "documents", "financial", "legal", "estate-settlement", "letters-testamentary", "executor", "inheritance-fraud"]
furtherDerivations: 1
---

## What is a Probate Document?

**Probate** is the court-supervised process of identifying a deceased person's assets, paying their debts, and distributing the remaining property to their heirs.

The most critical document in this process is **Letters Testamentary** (or Letters of Administration). This is the "Key to the Kingdom"—it gives the Executor the legal power to:
1.  **Empty Bank Accounts:** Transfer funds out of the deceased's name.
2.  **Sell Property:** Sign deeds for the deceased's home.
3.  **Access Data:** Take control of email and social media accounts.

**"Estate Hijacking"** is a high-value fraud. Criminals monitor obituaries, create a fake Will, and forge a "Letters Testamentary" document with a fake court seal. They then take this paper to a bank and drain the estate before the real heirs even know probate has started. Live Verify binds the **Executor's name and Case ID** to the Superior Court's domain, allowing banks to instantly verify the legal authority of the person standing at the counter.

<div style="max-width: 600px; margin: 24px auto; font-family: 'Georgia', serif; border: 1px solid #333; background: #fff; padding: 40px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
  <div style="text-align: center; margin-bottom: 30px;">
    <div style="font-size: 1.3em; font-weight: bold; text-transform: uppercase;"><span verifiable-text="start" data-for="probate">[</span>Superior Court of California</div>
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
      verify:lacourt.org/probate/v <span verifiable-text="end" data-for="probate">]</span>
  </div>
</div>

## Data Verified

Deceased name, Case ID number, Executor/Administrator name, Court Jurisdiction (County/State), Date of Appointment, Expiration Date (if applicable), Judge name, Clerk ID, specific limitations (e.g., "No sale of real property").

**Document Types:**
- **Letters Testamentary:** For estates with a valid Will.
- **Letters of Administration:** For estates without a Will (intestate).
- **Small Estate Affidavit:** Simplified version for lower-value estates.
- **Certificate of Discharge:** Proving the executor's work is finished.

## Data Visible After Verification

Shows the issuer domain (the State Court system) and the current authority status.

**Status Indications:**
- **Active** — Executor has full current authority to act.
- **Revoked** — **ALERT:** The court has removed this executor (e.g., for misconduct).
- **Discharged** — Estate is closed; authority has ended.
- **Expired** — Some jurisdictions require annual renewal of "Letters."

## Second-Party Use

The **Executor (Personal Representative)** benefits from verification.

**Bank Access:** Proving to a branch manager that the "Letters Testamentary" paper is verified and active. This stops the common "Compliance Hold" where banks freeze accounts for days while their legal team calls the court clerk to verify the judge's signature.

**Property Sales:** Providing a verified authority hash to a title company during a real estate closing, ensuring they can sign the deed on behalf of the deceased without title gaps.

## Third-Party Use

**Banks and Brokerages**
**Asset Security:** Before allowing an executor to liquidate a $500,000 stock portfolio, the brokerage scans the court's hash. "Verified by lacourt.org" ensures the person isn't an impostor using a "Photoshopped" appointment letter.

**Title Companies**
**Title Integrity:** Verifying that the "Letters" presented at a closing are the latest version and haven't been revoked by a subsequent court order, preventing "Unauthorized Sale" lawsuits from other heirs.

**Life Insurance Companies**
**Payout Accuracy:** Ensuring the person claiming the "Estate" portion of a policy is the **Verified Legal Representative** authorized to receive the funds.

## Verification Architecture

**The "Phantom Executor" Fraud Problem**

- **Letter Forgery:** Creating a fake "Letters Testamentary" document to trick a bank into giving a criminal access to a deceased person's accounts.
- **Revocation Hiding:** An executor who was removed by a judge for "stealing from heirs" continuing to use their physical paper appointment to drain other accounts before the institutions find out.
- **Will Contests:** Presenting a "Verified" order that has actually been stayed or vacated by a higher court due to a Will dispute.

**Issuer Types** (First Party)

**State Court Systems:** (e.g., LA Superior Court, NY Surrogate's Court).
**Clerks of the Court.**
**Estate Planning Software:** (e.g., WealthCounsel - hosting mirror hashes).

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


## Competition vs. Certified Copies (Purple Ink)

| Feature | Live Verify | Certified Copy (Ink/Seal) | Online Docket (Public) |
| :--- | :--- | :--- | :--- |
| **Tamper Proof** | **High.** Binds text to status. | **Low.** Seals are easy to forge. | **High.** |
| **Trust Anchor** | **Domain-Bound.** Bound to the Court. | **Physical.** Trust the paper. | **System-Bound.** |
| **Speed** | **Instant.** 5-second scan. | **Manual.** requires visual audit. | **Slow.** Requires Case # and search. |
| **Revocation** | **Real-time.** Shows "REVOKED." | **Zero.** The paper stays the same. | **Manual.** |

**Why Live Verify wins here:** The "Saturday Morning" reality. Executors often try to handle estate business on weekends when court clerks are unreachable. Live Verify turns the **Judge's Order** into a live digital checkpoint, ensuring that "Legal Authority" is a cryptographically verified fact at the exact moment the money moves.
---
title: "Specific Transaction Power of Attorney (ST-POA)"
category: "Legal & Court Documents"
volume: "Medium"
retention: "Permanent (transaction record)"
slug: "specific-transaction-poa"
verificationMode: "clip"
tags: ["poa", "power-of-attorney", "elder-abuse", "legal", "limited-poa", "financial-crime", "least-privilege"]
furtherDerivations: 1
---

## What is a Specific Transaction POA?

A "Power of Attorney" (POA) is a dangerous document. In its broad form, it gives someone complete control over your life and finances. This is a primary vector for "Elder Financial Abuse," where a caretaker uses a broad POA to perform unauthorized personal gain.

A **Specific Transaction Power of Attorney (ST-POA)** is a "Composable Primitive" (Criteria §11). It authorizes **one specific action only** (e.g., *"Authorize withdrawal of $1,000 for medical surgery on March 15"*). By making this document verifiable, a bank or hospital can instantly confirm that the person presenting the document only has authority for *that* specific transaction.

<div style="max-width: 650px; margin: 24px auto; font-family: sans-serif; border: 2px solid #311b92; background: #fff; padding: 0; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <div style="background: #311b92; color: #fff; padding: 20px; display: flex; justify-content: space-between; align-items: center;">
    <div>
      <div style="font-weight: bold; font-size: 1.2em;"><span verifiable-text="start" data-for="stpoa">[</span>SPECIFIC TRANSACTION AUTHORIZATION</div>
      <div style="font-size: 0.8em; opacity: 0.9;">Limited Power of Attorney</div>
    </div>
    <div style="text-align: right;">
      <div style="font-weight: bold; font-size: 0.9em;">CERTIFIED LEGAL RECORD</div>
      <div style="font-size: 0.7em;">Ref: ST-POA-2026-992</div>
    </div>
  </div>
<div style="padding: 25px; font-size: 0.9em; line-height: 1.6; color: #333;">
    <p><strong>Principal:</strong> MARGARET E. THOMPSON<br>
    <strong>Agent:</strong> DAVID R. THOMPSON (Relationship: Son)<br>
    <strong>Issuing Notary:</strong> SAMANTHA B. GREEN (ID: #NOT-992288)</p>
<div style="background: #ede7f6; border: 1px solid #311b92; padding: 15px; margin: 15px 0; border-radius: 4px;">
      <p style="margin: 0;"><strong>Authorized Transaction:</strong></p>
      <p style="margin: 5px 0 0; font-weight: bold;">Withdrawal of exactly $1,250.00 from Account ****4421</p>
      <p style="margin: 5px 0 0;"><strong>Purpose:</strong> Pre-payment for Surgery (General Hospital)</p>
      <p style="margin: 5px 0 0;"><strong>Valid Date:</strong> MARCH 15, 2026 Only</p>
    </div>
<p style="font-size: 0.8em; color: #666; font-style: italic;">
      This authority is limited strictly to the transaction described above. It does not grant broad control over the principal's estate.
    </p>
  </div>
<div style="padding: 20px; background: #f9f9f9; border-top: 1px dashed #311b92; text-align: center;">
    <div data-verify-line="stpoa" style="font-family: 'Courier New', monospace; font-size: 0.8em; color: #000; font-weight: bold;">
      verify:notary.gov/v <span verifiable-text="end" data-for="stpoa">]</span>
    </div>
  </div>
</div>

## Data Verified

Principal name, agent name, specific transaction description, dollar amount (if applicable), valid date/time, purpose, issuing notary/lawyer ID, reference number.

**Document Types:**
- **Specific Transaction POA:** Single-action authority.
- **Limited Medical Authorization:** Permission for one specific procedure.
- **Temporary Real Estate Authority:** Permission to sign *one* specific deed.

## Data Visible After Verification

Shows the issuer domain (`notary.gov`, `attorney-at-law.com`) and the authority status.

**Status Indications:**
- **Active / Valid** — Record matches the latest authorized claim.
- **Consumed / Used** — **ALERT:** This authority was for a single use and has been processed.
- **Revoked** — **ALERT:** The principal has withdrawn this specific authority.
- **Expired** — **ALERT:** The valid date for this transaction has passed.

## Second-Party Use

The **Principal (Individual Granting Authority)** benefits from verification.

**Abuse Prevention:** By only granting "Least Privilege" access, the principal ensures their caretaker cannot drain their entire bank account using a single piece of paper.

**Independent Audit:** The principal can review a history of all specific transaction hashes issued in their name to catch unauthorized activity by the notary or the agent.

## Third-Party Use

**Banks / Tellers**
**Transaction Verification:** Tellers can instantly verify that the POA presented only authorizes the specific dollar amount and purpose requested, preventing "Mission Creep" by the agent.

**Hospitals / Medical Staff**
**Consent Verification:** Ensuring that a family member's authorization for a procedure is backed by a verified, limited legal claim.

**Real Estate Closing Agents**
**Signature Authority:** Confirming that an agent has the specific legal power to sign for the principal in a single property transaction.

## Verification Architecture

**The "Broad POA" Fraud Problem**

- **Identity Hijacking:** A caretaker uses a broad POA to change the principal's home ownership or beneficiary designations.
- **Account Draining:** Withdrawing large sums of cash "for the principal's benefit" that are actually embezzled.
- **Forgery:** Editing a limited POA to make it look broad, or changing the authorized dollar amount.

**Issuer Types** (First Party)

**Notary Publics.**
**Law Firms.**
**Court Clerks.**

**Privacy Salt:** Highly critical. Legal and financial details are sensitive. The hash must be salted to prevent "guessing" the names or transaction amounts.

## Rationale

Power of Attorney is currently "Binary": you either have none or you have it all. By turning specific authorities into verifiable digital bridges, we bring the security principle of "Least Privilege" to the legal system, protecting the vulnerable from financial exploitation.

---
title: "Court Orders and Judgments"
category: "Government & Civic Documents"
volume: "Small"
retention: "Permanent (legal precedent, enforcement)"
slug: "court-orders-judgments"
verificationMode: "clip"
tags: ["court-order", "judgment", "legal-enforcement", "clerk-of-court", "civil-litigation", "criminal-justice", "divorce-decree"]
furtherDerivations: 1
---

## What is a Court Order?

A Court Order is a legal command issued by a judge that compels a person or entity to take a specific action (or stop doing something). It is the "Voice of the Law."

It is used for life-altering events:
1.  **Divorce Decrees:** Dividing assets and ending a marriage.
2.  **Child Support:** Mandating monthly payments.
3.  **Restraining Orders:** Prohibiting contact for safety.
4.  **Writs of Execution:** Authorizing the seizure of property to pay a debt.

**"Judgment Fraud"** is a high-stakes crime. Fraudsters edit "Final Judgments" to change dollar amounts from $5,000 to $50,000, or they create fake "Eviction Orders" to illegally remove tenants. In some cases, criminals forge "Name Change" orders to steal identities.

Live Verify binds the Judge's name, the Case ID, and the exact verdict text to the court's official domain. A bank or a police officer can instantly verify that the paper order they are holding matches the final, un-altered ruling in the clerk's database.

<div style="max-width: 600px; margin: 24px auto; font-family: 'Georgia', serif; border: 1px solid #333; background: #fff; padding: 40px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
  <div style="text-align: center; margin-bottom: 30px;">
    <div style="font-size: 1.4em; font-weight: bold; text-transform: uppercase;"><span verifiable-text="start" data-for="court"></span>In the Superior Court of the State of Delaware</div>
    <div style="font-size: 0.9em; letter-spacing: 1px;">IN AND FOR NEW CASTLE COUNTY</div>
  </div>
<div style="display: flex; justify-content: space-between; margin-bottom: 20px; font-size: 0.95em;">
    <div style="width: 45%;">
      <strong>ABC CORP,</strong><br>
      <em>Plaintiff,</em><br><br>
      v.<br><br>
      <strong>XYZ VENTURES, LLC,</strong><br>
      <em>Defendant.</em>
    </div>
    <div style="width: 45%; text-align: right;">
      <strong>Case No:</strong> <strong>CV-2026-992288</strong>
    </div>
  </div>
<h2 style="font-size: 1.3em; text-align: center; text-decoration: underline; margin: 30px 0;">FINAL JUDGMENT</h2>
<div style="font-size: 1em; line-height: 1.6; text-align: justify; color: #000;">
    <p>IT IS HEREBY ORDERED AND ADJUDGED that the Plaintiff, ABC CORP, shall recover from the Defendant, XYZ VENTURES, LLC, the principal sum of <strong>Forty-Two Thousand Five Hundred Dollars ($42,500.00)</strong>, with post-judgment interest at the legal rate.</p>
  </div>
<div style="margin-top: 40px; display: flex; justify-content: space-between; align-items: flex-end;">
    <div style="border-top: 1px solid #000; width: 200px; padding-top: 5px; font-size: 0.9em;">Hon. Michael J. Miller</div>
    <div style="text-align: right; border: 2px solid #000; padding: 5px; font-family: sans-serif; font-size: 0.7em;">
      <strong>FILED & RECORDED</strong><br>
      03/15/2026 09:14 AM<br>
      Clerk of Court
    </div>
  </div>
<div data-verify-line="court" style="border-top: 1px dashed #999; margin-top: 40px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
    title="Demo only: Delaware Courts don't yet offer verification&#10;endpoints, so this is illustrative">
    <span data-verify-line="court">verify:courts.delaware.gov/v</span> <span verifiable-text="end" data-for="court"></span>
  </div>
</div>

## The Problem: Fake Order Fraud

- **Amount Inflation:** Editing a $1,000 small claims judgment to $10,000 to trick a collections agency.
- **Status Faking:** Presenting a "Temporary Order" as a "Final Order" to hide that a trial is still ongoing.
- **Clerk Seal Forgery:** Creating fake "Raised Seals" using a digital template to make a fraudulent order look official.

## What Is Checked

Case Number, Court Jurisdiction, Judge Name, Names of Parties, Verdict/Amount (numerical and text), Date of Filing, Clerk ID, specific conditions (e.g., "Effective Immediately").

**Document Types:**
- **Final Judgment:** Resolving a civil lawsuit.
- **Divorce Decree:** Proving marital status and custody.
- **Probate Order:** Authorizing the executor of an estate.
- **Restraining Order:** Law enforcement directive for protection.

## Verification Response

The endpoint returns a simple status code:

- **OK** — The order is authentic and in full force
- **UNDER_APPEAL** — The order may be stayed or subject to change; proceed with caution
- **VACATED** — A later court action has cancelled this order; do not enforce
- **SUPERSEDED** — An amended order has been issued; this version is outdated
- **404** — Order not found (wrong case number, forged document, or OCR error)

The issuer domain is visible from the `verify:` line on the order itself (e.g., `courts.delaware.gov`).

## Post-Verification Actions

None typically. The verification confirms the order's status; that's the decision point for enforcement.

**Why No Further Action:**

- **Sheriffs/marshals** just need status to decide whether to proceed with enforcement
- **Banks** just need confirmation before obeying a garnishment order
- **Police officers** just need to know if a restraining order is active before making an arrest

The status code is the value. If it's OK, enforce. If it's VACATED or 404, don't. No POST form or additional workflow needed.

## Who Holds It

The Winning Party (Plaintiff/Creditor) benefits from verification.

**Asset Seizure:** Proving to a bank or a sheriff that the "Writ of Execution" is verified and authentic. This prevents the "Verification Call" to the court clerk that often delays the freezing of funds by 24-48 hours, giving the debtor time to hide assets.

**Identity Updates:** Providing a verified "Name Change Order" to the DMV or Social Security office to update records instantly.

## Who Checks It

**Banks and Financial Institutions**
**Compliance Vetting:** Before obeying a "Garnishment Order," the bank scans the hash. "Verified by Courts.gov" ensures the bank isn't participating in a "Fake Debt" scam designed to drain a customer's account.

**Police Officers**
**Enforcement Decisions:** During a domestic dispute, an officer scans a "Restraining Order" paper. Verification confirms the order is Active and Not Vacated, allowing the officer to make an arrest with confidence.

**Landlords and Employers**
**Background Integrity:** Verifying that a "Dismissal Order" provided by a candidate is authentic and not a "Photoshopped" document designed to hide a criminal conviction.

## Who Issues It

**Issuer Types** (First Party)

**State Court Systems:** (e.g., Delaware Courts, NY Unified Court System).
**Federal Courts:** (PACER integration).
**Clerks of Court.**

## Authority Chain

**Pattern:** Sovereign

UK courts issue court orders and judgments authorized by the Courts Act 2003 and Senior Courts Act 1981.

```
✓ courtsni.gov.uk/verify — UK courts issuing orders and judicial judgments
  ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Where Each Fits: Live Verify and Court Dockets

Courts keep their own dockets: in the US federal courts, PACER; state courts each have their own systems, and other countries run theirs. Some are open to the public, some need an account and fees, and many have no online access at all. The docket remains the record for judges, clerks and lawyers. Live Verify answers a narrower question for those who are handed an order, whether it is one the court issued and still stands, and the two work side by side.

| | Online court docket (PACER and similar) | Live Verify on the order | Paper order with a seal |
| :--- | :--- | :--- | :--- |
| **Who can check** | Account holders who know how to search the right court. | Anyone handed the order: a police officer, a bank teller, a landlord, an employer. | Whoever receives it, trusting the seal. |
| **What the checker gets** | The full case record, including later filings. | Confirmation that the court issued this exact order, as at its date, and whether it has since been vacated, stayed or modified. | A document whose terms or seal may have been forged. |
| **What the holder shares** | The case number. | Only the order. | Only the order. |
| **Reach** | That court system. | Global in principle: any court, in any country, that publishes hashes on its own domain. | Universal, but untrusted. |
| **Speed and cost** | Minutes, with a login, a case search and, for PACER, per-page fees. | A few seconds per check: one web lookup, with no fee to the standard. | Immediate. |
| **What it needs** | An account and some knowledge of the system. | The court to publish hashes, and Live Verify-aware software on the checker's device. No court does this yet. | Nothing. |
| **Best suited to** | Legal professionals working on the case. | People who must act on an order without access to the docket. | Nothing where someone's liberty or money depends on it. |

**Where each fits:** court dockets remain primary for judges, clerks and lawyers who can use them directly. The gap is the front line: police officers, bank tellers, landlords, employers and other recipients of court orders often cannot practically search those systems at the moment they need to act. Live Verify lets them check the order in front of them against the court's domain, without replacing the docket itself.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).

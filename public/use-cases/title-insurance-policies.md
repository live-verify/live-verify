---
title: "Title Insurance Policies"
category: "Real Estate & Property"
volume: "Very Small"
retention: "Permanent (chain of title)"
slug: "title-insurance-policies"
verificationMode: "clip"
tags: ["title", "insurance", "policies", "real", "estate", "property", "title-clearance", "closing-docs"]
furtherDerivations: 1
---

## What is a Title Insurance Policy?

A Title Insurance Policy is a specialized contract that protects a property owner (or lender) against financial loss from defects in title—things like hidden liens, forged deeds, or "Missing Heirs" who might claim they own your house.

Unlike other insurance that covers *future* events (like fire), title insurance covers *past* errors. It is the "Warranty of Ownership."

**"Policy Scrubbing"** is a sophisticated fraud where a seller or shady developer "edits" a title policy PDF to remove Schedule B Exceptions. For example, they might delete a line showing a $50,000 IRS tax lien or a "Shared Driveway" easement. They then present this "Clean" policy to a buyer or a bank to close a sale illegally. Live Verify binds the Policy Number and the specific list of Exceptions to the underwriter's domain.

**Why verification matters here:**

- **Hidden liens become the buyer's problem.** A $50,000 IRS tax lien or a $30,000 contractor's lien removed from the Schedule B exceptions means the buyer discovers — after closing — that the property has debts attached to it that must be satisfied before it can be resold or refinanced.
- **Easement surprises block construction.** A removed "shared driveway" easement or utility right-of-way means the buyer discovers they cannot build the extension, fence, or pool they planned — after they have already paid for architectural drawings and permits.
- **Title insurance is supposed to be the safety net.** The entire point of the policy is to enumerate the exceptions. If the exceptions list has been tampered with, the buyer's understanding of what is covered and what is excluded is wrong. A verified hash of the policy confirms the underwriter's actual exceptions, not an edited version.

<div style="max-width: 600px; margin: 24px auto; font-family: 'Times New Roman', Georgia, serif; border: 1px solid #ccc; background: #fff; padding: 40px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
  <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 30px;">
    <div style="font-weight: bold; font-size: 1.2em; color: #1a365d;"><span verifiable-text="start" data-for="title-ins"></span>FIRST AMERICAN TITLE</div>
    <div style="text-align: right; font-size: 0.85em; color: #666;">
      Policy No: FA-99228877-TX<br>
      March 15, 2026
    </div>
  </div>
<h2 style="text-align: center; font-size: 1.4em; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 30px;">Owner's Policy of Title Insurance</h2>
<div style="font-size: 1em; line-height: 1.6; color: #000; text-align: justify;">
    <p><strong>SUBJECT TO THE EXCLUSIONS FROM COVERAGE</strong>, FIRST AMERICAN TITLE INSURANCE COMPANY (the "Company") insures <strong>ROBERT J. MILLER</strong> (the "Insured") against loss or damage sustained by reason of any defect in title.</p>
<div style="background: #f9f9f9; padding: 15px; border: 1px solid #eee; margin: 20px 0;">
      <p><strong>Amount of Insurance:</strong> $ 525,000.00</p>
      <p><strong>Property:</strong> Lot 42, Block 7, Skyline Heights Addition, Austin, TX</p>
      <p><strong>Schedule B - Exceptions:</strong> 1. Current taxes; 2. Utility easement per Vol 12, Pg 88; 3. [None].</p>
    </div>
  </div>
<div style="margin-top: 40px; border-top: 1px solid #000; padding-top: 5px; font-size: 0.8em; text-align: center;">
    This policy is not valid unless Schedule A and Schedule B are attached.
  </div>
<div data-verify-line="title-ins" style="border-top: 1px dashed #999; margin-top: 40px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
      title="Demo only: First American doesn't yet offer verification&#10;endpoints, so this is illustrative">
      <span data-verify-line="title-ins">verify:firstam.com/v</span> <span verifiable-text="end" data-for="title-ins"></span>
  </div>
</div>

## The Problem: Clean Schedule Fraud

- **Exception Deletion:** Removing a line from Schedule B that mentions a "Shared Well" or a "Right of First Refusal" to make the property more attractive to a buyer.
- **Coverage Inflation:** Editing a $100,000 policy to read $1,000,000 to trick a lender into an over-leveraged mortgage.
- **Phantom Agencies:** Fraudsters setting up a fake "Local Title Agency" and issuing fake policies on stolen letterhead.

## What Is Checked

Policy Number, Named Insured (Owner/Lender), Amount of Insurance, Property Address/Parcel ID, Effective Date, Specific Schedule B Exceptions (e.g., "Easement 14"), Underwriter ID, Issuing Agency.

**Document Types:**
- **Owner's Policy:** Protecting the person buying the home.
- **Lender's Policy:** Protecting the bank's mortgage interest.
- **Title Commitment:** The "Promise to Insure" issued before closing.
- **Endorsement:** (Linked hash) for specific changes (e.g., adding an ADU).

## What the Checker Sees

Shows the issuer domain (the National Underwriter) and current policy standing.

**Status Indications:**
- **Active/Enforceable** — Policy is verified and matches the underwriter's master record.
- **Endorsed** — Policy has been modified (linked hash to latest endorsement).
- **Claim Pending** — A title claim has been filed against this policy.
- **Void/Cancelled** — Policy was retracted due to non-payment or fraud.

## Who Holds It

The Property Owner benefits from verification.

**Future Resale:** Proving to a future buyer's attorney that you have a "Verified Clean" title policy from 10 years ago. This speeds up the new title search and may reduce the "Reissue Rate" cost for the next policy.

**Mortgage Refinance:** Providing a verified hash to a new lender to prove the property is already fully insured, fulfilling a mandatory requirement for funding the new loan.

## Who Checks It

**Buyer's Attorneys**
**Integrity Checks:** Before closing, the buyer's lawyer scans the seller's existing policy. "Verified by FirstAm.com" ensures the seller hasn't "Photoshopped" out a major boundary dispute or a recorded lien.

**Lenders and Underwriters**
**Liability Handoff:** Ensuring that the "Lender's Policy" provided at closing is 100% authentic and hasn't been tampered with by a shady title agent.

**Real Estate Appraisers**
**Marketability Assessment:** Verifying that a property has a standard, un-restricted title policy, ensuring there are no "Hidden Defects" that would lower its appraised value.

## Who Issues It

**Issuer Types** (First Party)

**National Title Underwriters:** (e.g., First American, Stewart, Fidelity National).
**State Title Guaranty Funds:** (In jurisdictions like Iowa).
**Real Estate Data Mirror Sites:** (e.g., DataTrace - hosting verified policy hashes).

## Authority Chain

**Pattern:** Regulated

Title underwriters must be licensed by state insurance regulators to issue title insurance policies.

```
✓ title.firstam.com/verify — Issues title insurance policies
  ✓ insurance.ca.gov — Regulates insurance companies in California
    ✓ california.gov — California state government
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Where Each Fits: Live Verify, Public Records and the Policy Jacket

Title insurance is issued mainly in the US, by underwriters and their local agents, and a policy arrives as a jacket containing the schedules. Public land records, kept by each county or equivalent, show what is recorded against a property. Neither is a check on the policy itself: the records show the state of title, and the jacket is the contract. A verifiable policy answers a narrower question, whether the underwriter issued these exact schedule pages, and works alongside both.

| | Online public land records | Physical policy jacket | Live Verify on the policy schedules |
| :--- | :--- | :--- | :--- |
| **Who can check** | Anyone who can search the county records, sometimes for a fee. | Anyone holding the jacket, by reading it. | Anyone handed the policy: a buyer's attorney, a lender, an appraiser. |
| **What the checker gets** | What has been recorded against the property: deeds, mortgages, liens, easements. Nothing about what the policy covers or excludes. | The full contract, including terms, conditions and exceptions, as printed. Pages could be swapped and the checker would not know. | Confirmation that the underwriter stands behind this exact text, including the amount of insurance and the Schedule B exceptions, as at its date, and the policy's current standing (active, endorsed, claim pending, void). |
| **What the owner shares** | Nothing; the records are public. | The whole policy. | Only the policy pages they chose to hand over. |
| **Reach** | One county or recording office at a time. | Wherever the paper goes. | Global in principle: any underwriter, in any country, that publishes hashes on its own domain. |
| **Speed and cost** | Varies by county; often quick online, sometimes slow. | Free; takes careful reading. | A few seconds per check: one web lookup, with no fee to the standard. |
| **What it needs** | Access to the recording office's search. | Nothing. | The underwriter to publish hashes, and Live Verify-aware software on the checker's device. No title underwriter does this yet. |
| **Best suited to** | Title searches and understanding what is recorded. | Understanding the coverage in full. | Confirming at closing, refinance or resale that the schedules have not been altered and the policy is still in force. |

**Where each fits:** public land records remain the source for what is recorded against a property, and the policy jacket is the complete contract that anyone relying on coverage should read. Neither tells a lender or buyer whether the schedule pages in front of them are the ones the underwriter issued. Live Verify adds that confirmation quickly at closing, wherever the checker has software that honours it, with the full policy and the public record still there to be consulted.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).

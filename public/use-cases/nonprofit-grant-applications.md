---
title: "Grant Award Letters"
category: "Charitable & Non-Profit"
volume: "Small"
retention: "7 years (IRS audit)"
slug: "nonprofit-grant-applications"
verificationMode: "clip"
tags: ["nonprofit", "grant", "award", "charity", "foundation", "philanthropy"]
furtherDerivations: 1
---

## What is a Grant Award Letter?

A Grant Award Letter is the official notification from a foundation or government agency that a non-profit has won funding. It details:
1.  **Amount:** The specific sum awarded.
2.  **Purpose:** Restricted use (e.g., "For the Literacy Program only").
3.  **Conditions:** Reporting requirements.

This letter is the "proof of income" for non-profits. They show it to other donors ("See, Ford Foundation supports us!") and to banks to get bridge loans before the cash arrives.

<div style="max-width: 600px; margin: 24px auto; font-family: 'Georgia', serif; border: none; background: #fff; padding: 40px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
  <div style="border-bottom: 2px solid #2c3e50; padding-bottom: 20px; margin-bottom: 30px;">
    <h2 style="margin: 0; color: #2c3e50;"><span verifiable-text="start" data-for="grant"></span>THE GATES-BUFFETT ALLIANCE</h2>
    <div style="font-style: italic; color: #7f8c8d;">Investing in the Future</div>
  </div>
<p>March 10, 2026</p>
<p>To: Community Health Initiative<br>
  Attn: Executive Director</p>
<p>Dear Partners,</p>
<p>We are pleased to inform you that the Alliance has approved a grant in the amount of <strong>$500,000.00</strong> to support your mobile vaccination clinic expansion.</p>
<p>This grant is subject to the Terms and Conditions attached.</p>
<div style="margin-top: 40px;">
    Sincerely,<br>
    <img src="placeholder-signature.png" alt="(Signature)" style="height: 40px; opacity: 0.5;"><br>
    <em>Director of Global Health</em>
  </div>
<div data-verify-line="grant" style="border-top: 1px dashed #ccc; margin-top: 40px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;">
    <span data-verify-line="grant">verify:alliance.org/grants/v</span> <span verifiable-text="end" data-for="grant"></span>
  </div>
</div>

## The Problem: Fake Funding Fraud

- **Inflated Assets:** Non-profits struggling with cash flow might forge award letters to secure loans or stave off insolvency.
- **Prestige Fraud:** Claiming support from prestigious foundations to lure smaller donors.
- **Diverted Funds:** A corrupt director altering the "Purpose" line from "Restricted to building repair" to "General Operating Support" to justify spending it on salaries.

## What Is Checked

Recipient organization, grant amount, grant purpose (restricted vs. unrestricted), award date, authorized signatory.

**Document Types:**
- **Award Letter:** The "Happy News" document.
- **Grant Agreement:** The full contract signed by both parties.
- **Disbursement Notice:** Proof that funds were sent.

## What the Checker Sees

Shows the issuer domain (the Foundation) and the status.

**Status Indications:**
- **Awarded** — Active grant.
- **Paid** — Funds have been fully disbursed.
- **Rescinded** — Grant cancelled (e.g., due to non-compliance).

## Who Holds It

The Non-Profit (Grantee) benefits heavily.
- **Bridge Financing:** Banks often lend money against "receivables." A verified Award Letter is rock-solid proof of a receivable, allowing the non-profit to start work before the check clears.
- **Matching Grants:** "We have $500k from Foundation A, will you match it?" Foundation B can verify the claim instantly without calling Foundation A.

## Who Checks It

**Auditors (IRS / Independent)**
**Compliance:** Auditors check if restricted funds were used correctly. Verifying the original letter ensures the auditor knows exactly what restrictions were placed on the money.

**Media / Watchdogs**
**Transparency:** If a non-profit claims "Supported by the Gates Foundation," journalists can verify the claim directly from the document.

## Who Issues It

**Issuer Types** (First Party)
- **Private Foundations:** (Ford, Rockefeller, Gates).
- **Government Agencies:** (NIH, NEA, local arts councils).
- **Corporate Giving Programs:** (Google.org, Target Foundation).

## Authority Chain

**Pattern:** Regulated

Grant-giving agencies approve and document lottery funding for nonprofit organizations.

```
✓ grants.lottery.culture.gov.uk/verify — Issues national lottery grant awards
  ✓ charitycommission.gov.uk — Regulates charities in England and Wales
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Where Each Fits: Live Verify, Grant Portals and Email

Funders manage grants through portals such as Fluxx and SmartSimple, and much correspondence still goes by email. These serve the relationship between funder and grantee well. Live Verify answers a narrower question for someone outside that relationship, such as a bank or another donor: did this funder issue this award letter? They work side by side.

| | Grant portal (Fluxx, SmartSimple) | Email | Live Verify on the award letter |
| :--- | :--- | :--- | :--- |
| **Who can check** | The funder and the grantee's users with a login. | Whoever received the message. | Anyone handed the letter: a bank, another donor, an auditor. |
| **What the checker gets** | The grant record and its history, inside the portal. | A forwarded message, which may be spoofed or edited. | Confirmation that the funder issued this exact award letter, as at its date, and whether it has been amended or withdrawn. |
| **What the holder shares** | Access is not normally shared with third parties. | The message they choose to forward. | Only the letter they chose to hand over. |
| **Reach** | Users of that funder's portal. | Anyone with email. | Global in principle: any funder, in any country, that publishes hashes on its own domain. |
| **Speed and cost** | Part of the funder's grant system; access depends on keeping a login. | Free and immediate. | A few seconds per check: one web lookup, with no fee to the standard and no portal login. |
| **What it needs** | A portal account. | Nothing. | The funder to publish hashes, and Live Verify-aware software on the checker's device. No funder does this yet. |
| **Best suited to** | Managing the application, reporting and correspondence. | Routine exchanges. | Showing the award to a third party such as a bank or co-funder. |

**Where each fits:** Grant portals are well suited to managing an application, with its forms, reporting deadlines and correspondence with the funder, and email is fine for routine exchanges. Neither helps much when a nonprofit needs to show the award to someone outside that relationship, such as a bank or another donor, who will not be given a portal login. A verified award letter can be passed to them and checked against the funder's domain, while the portal carries on handling the grant itself.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).

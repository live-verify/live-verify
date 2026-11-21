---
title: "ERISA Compliance and Audit Reports"
category: "Actuarial & Insurance Mathematics"
volume: "Very Small"
retention: "7-10 years (DOL audit)"
slug: "erisa-compliance-audit-reports"
verificationMode: "clip"
tags: ["erisa", "pension-audit", "dol-compliance", "form-5500", "actuarial-audit", "fiduciary-responsibility", "employee-benefits"]
furtherDerivations: 1
---

## What is an ERISA Audit?

If a company has a 401(k) or pension plan with more than 100 people, the government (Department of Labor) requires an independent audit to ensure the money is actually there. This is governed by a law called ERISA.

The Compliance Audit Report is the auditor's "Clean Bill of Health." It states that the company isn't "borrowing" from the pension fund and that all employees are getting the matches they were promised.

If a company is in financial trouble, they might "Edit" this report to hide a funding shortfall from their workers and the government. Verified hashes ensure the auditor's true findings match the federal filing.

<div style="max-width: 600px; margin: 24px auto; font-family: 'Times New Roman', Georgia, serif; border: 1px solid #333; background: #fff; padding: 40px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <div style="text-align: right; margin-bottom: 30px;">
    <div style="font-weight: bold; font-size: 1.2em;"><span verifiable-text="start" data-for="erisa"></span>MILLIMAN ACTUARIAL CONSULTING</div>
    <div style="font-size: 0.85em; color: #666;">Certified ERISA Audit Group</div>
  </div>
<h3 style="text-align: center; text-transform: uppercase; letter-spacing: 1px; color: #000; border-bottom: 2px solid #000; padding-bottom: 10px;">ERISA Compliance Audit Report</h3>
<div style="font-size: 0.95em; line-height: 1.6; color: #333; margin-top: 20px;">
    <p><strong>Plan Sponsor:</strong> Initech Employees' 401(k) Plan<br>
    <strong>Plan Year Ending:</strong> December 31, 2025</p>
<div style="background: #fdfdfd; padding: 15px; border: 1px solid #eee; margin: 20px 0;">
      <p><strong>Compliance Result:</strong> <span style="color: #2e7d32; font-weight: bold;">UNQUALIFIED OPINION</span></p>
      <p><strong>Funding Status:</strong> 102.4% (Fully Funded)<br>
      <strong>Audit Scope:</strong> Form 5500 Schedule H Compliance</p>
    </div>
<p style="text-align: justify;">We have audited the financial statements of the Plan. In our opinion, the Plan was administered in accordance with the Employee Retirement Income Security Act of 1974 (ERISA).</p>
  </div>
<div style="margin-top: 40px; display: flex; justify-content: space-between; align-items: flex-end;">
    <div style="width: 45%;">
      <div style="border-top: 1px solid #000; padding-top: 5px; font-style: italic;">Robert Miller, EA, MSPA</div>
      <div style="font-size: 0.8em; color: #777;">Enrolled Actuary #26-9982</div>
    </div>
    <div style="text-align: right; font-size: 0.8em; color: #777;">
      Audit Ref: ERISA-2026-042
    </div>
  </div>
<div data-verify-line="erisa" style="border-top: 1px dashed #999; margin-top: 40px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
      title="Demo only: Milliman doesn't yet offer verification&#10;endpoints, so this is illustrative">
      <span data-verify-line="erisa">verify:milliman.com/erisa/v</span> <span verifiable-text="end" data-for="erisa"></span>
  </div>
</div>

## The Problem: Funding Smoothing Fraud

- **Percent Tampering:** Editing a "92% Funded" status to read "102% Funded" to avoid mandatory federal catch-up payments.
- **Opinion Editing:** Removing a "Significant Deficiency" footnote from the audit report before sending it to the DOL.
- **Actuary Impersonation:** Creating a fake audit report on the letterhead of a reputable firm using the license number of an actuary who didn't actually perform the work.

## What Is Checked

Plan sponsor name, plan year, audit opinion type (Unqualified/Qualified/Adverse), funding percentage, Enrolled Actuary (EA) name/license, Form 5500 filing date, material findings summary, date of audit completion.

**Document Types:**
- **ERISA Audit Report:** Mandatory for large plans (>100 participants).
- **Form 5500 Schedule SB/MB:** Signed by the Enrolled Actuary.
- **Summary Annual Report (SAR):** Proving the plan is healthy to participants.
- **Fiduciary Compliance Letter:** For trustee protection.

## What the Checker Sees

Shows the issuer domain (`milliman.com`, `mercer.com`) and current audit standing.

**Status Indications:**
- **Verified** — Audit matches the firm's official record and peer-review.
- **Superseded** — Replaced by a corrected filing (e.g., due to data error).
- **In-Litigation** — Audit findings are being formally disputed by the sponsor.
- **Invalid** — Signatory not authorized or license inactive at time of audit.

## Who Holds It

The Plan Sponsor (Employer) benefits from verification.

**DOL/IRS Audit Defense:** Proving to the Department of Labor (DOL) that the "Unqualified Opinion" on the 401(k) isn't a fake PDF created to hide a funding shortfall. A verified hash from a top actuarial firm provides instant "Zero-Fault" trust to federal auditors.

**Employee Trust:** Displaying the "Verified Healthy" status on the employee benefit portal to reassure workers that their retirement savings are being managed responsibly.

## Who Checks It

**Department of Labor (EBSA)**
**Enforcement:** Regulators can verify the authenticity of Form 5500 attachments across millions of plans. Live Verify prevents "Opinion Shopping" where a company hides a "Qualified" audit and submits a "Fake Unqualified" one.

**Investment Fiduciaries**
**Risk Monitoring:** Verifying the funding status of pension plans before making large-scale investment or acquisition decisions.

**Plan Participants (Employees)**
**Governance Transparency:** Ensuring that the annual "Healthy Plan" notice they receive in the mail is actually what the external auditor signed.

## Who Issues It

**Issuer Types** (First Party)

**Actuarial Consulting Firms:** (Milliman, Mercer, WTW).
**Specialist CPA Firms:** (ERISA audit specialists).
**Department of Labor:** (Hosting the official filing hashes).

## Authority Chain

**Pattern:** Regulated

Independent auditors conduct ERISA compliance audits required by the US Department of Labor.

```
✓ erisa.example-auditors.com — Audits ERISA pension plan compliance
  ✓ dol.gov — Enforces US pension and labor regulations
    ✓ usa.gov/verifiers — US federal government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Where Each Fits: Live Verify and EFAST2

In the US, employee benefit plans file their annual Form 5500, with the auditor's report attached where an audit is required, through the Department of Labor's EFAST2 system, and the filings are publicly searchable. Other countries have their own pension regulators and disclosure rules. EFAST2 and Live Verify answer different questions and work side by side: EFAST2 records what the plan filed, and Live Verify confirms that the audit firm stands behind the report someone is holding.

| | EFAST2 public search | Live Verify on the audit report | Unverified PDF |
| :--- | :--- | :--- | :--- |
| **Who can check** | Anyone who searches by plan or sponsor. | Anyone handed the report: a trustee, a participant, an acquirer, a regulator. | Nobody; it can only be taken on trust. |
| **What the checker gets** | The filing as submitted by the plan, with its attachments. | Confirmation that the audit firm issued this exact report and opinion, as at its date, and whether it has since withdrawn or reissued it. | A report whose opinion or figures may have been edited. |
| **What the plan sponsor shares** | What the filing rules require; the filing is public. | Only the report it chose to hand over. | Whatever it sends. |
| **Reach** | US plans that file Form 5500. | Global in principle: any audit firm, in any country, that publishes hashes on its own domain. | Anywhere, but untrusted. |
| **Speed and cost** | Free; finding the right filing and attachment takes some searching, and filings follow the annual cycle. | A few seconds per check: one web lookup, with no fee to the standard. | Free and immediate. |
| **What it needs** | The plan to have filed. | The audit firm to publish hashes, and Live Verify-aware software on the checker's device. No audit firm does this yet. | Nothing. |
| **Best suited to** | Filing history, and comparison across plans. | Confirming that the auditor stands behind the report in hand. | Nothing where retirement savings depend on it. |

**Where each fits:** EFAST2 is the official public record of what a plan filed with the Department of Labor, and it is the right source for filing history and for comparison across plans. It records what was submitted and follows the annual filing cycle. Live Verify adds a different check: a trustee, participant or acquirer holding the audit report can confirm that the audit firm itself stands behind that text. The federal filing and the auditor's own confirmation are best read together.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).

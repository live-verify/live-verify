---
title: "Corporate Internal Approvals"
category: "Business & Commerce"
volume: "Very Large"
retention: "Duration of commitment + 6-7 years (audit)"
slug: "corporate-internal-approvals"
verificationMode: "clip"
tags: ["approval", "purchase-order", "spend-approval", "expense-sign-off", "credit-limit", "change-approval", "deployment-approval", "internal-controls", "segregation-of-duties", "corporate-governance", "approval-fraud"]
furtherDerivations: 3
---

## What is a Corporate Internal Approval?

A **license** says a person is permitted to do a kind of work. **Signing authority** says a person may commit the company in general. An **approval** is narrower and more specific: *this particular request was authorized by a person with the authority to authorize it.* A purchase order was approved. An expense claim was signed off. A customer's credit limit was raised. A change was approved for deployment. A new hire's offer was approved at the agreed band.

An approval is a **discrete decision event**: it has an approver, a scope (what was approved), often an amount or condition, a timestamp, and a status that can later change — it can be **rescinded, superseded, or expire**. That distinguishes it from the standing delegations covered in [Corporate Signing Authority and Delegation Limits](view.html?doc=contract-signing-authority): that document proves a person *can* approve; this one proves a specific thing *was* approved, by whom, and that the approval is still in force.

The recipient of an internal approval — a supplier holding a PO, a colleague acting on a sign-off, an auditor reviewing a control — encounters the approval as a line in an email, a PDF, or an ERP screenshot. Today they trust it on its face. A verifiable approval lets them confirm the issuing company actually recorded that approval, at that scope, and has not withdrawn it.

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 1px solid #003366; background: #fff; padding: 0;">
  <div style="background: #003366; color: #fff; padding: 15px;">
    <div style="font-weight: bold; font-size: 1.1em;"><span verifiable-text="start" data-for="poapproval"></span>PURCHASE ORDER APPROVAL</div>
    <div style="font-size: 0.8em;">Internal Authorization Record</div>
  </div>
  <div style="padding: 20px; font-size: 0.9em; line-height: 1.6;">
    <p><strong>Company:</strong> Northbridge Services Ltd<br>
    <strong>PO Number:</strong> PO-2026-04417<br>
    <strong>Supplier:</strong> Meridian Components Ltd<br>
    <strong>Amount:</strong> GBP 184,500.00<br>
    <strong>Approved:</strong> March 18, 2026</p>
<div style="background: #f0f4f8; padding: 15px; margin: 15px 0; border-left: 3px solid #003366;">
      <p style="margin: 0;"><strong>Approved by:</strong> Priya Nair, Finance Director</p>
      <p style="margin: 10px 0 0;">Within delegated spend authority (≤ GBP 250,000)</p>
      <p style="margin: 5px 0 0;">Budget line: Operations / Capital Equipment FY26</p>
      <p style="margin: 5px 0 0;">Second approver: not required below GBP 250,000</p>
    </div>
<p style="font-size: 0.85em; color: #666;">Status valid until: goods received &amp; invoice matched<br>
    Company Reg: 09876543</p>
<div data-verify-line="poapproval" style="border-top: 1px dashed #999; margin-top: 15px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
      title="Demo only: illustrative verification line">
      <span data-verify-line="poapproval">verify:northbridge.com/approvals/v</span> <span verifiable-text="end" data-for="poapproval"></span>
    </div>
  </div>
</div>

## The Approval Types

Internal approvals share a structure but apply across the organization:

- **Spend / purchase-order approval** — A PO above a threshold was authorized by someone with the spend authority for that amount. The supplier relying on the PO is the third party who benefits.
- **Expense sign-off** — A manager approved an employee's expense claim or travel. Finance and audit rely on the sign-off.
- **Credit-limit approval** — A customer's trade-credit limit was set or raised by credit control. Sales and the customer rely on it.
- **Change / deployment approval** — A change-advisory board or release manager approved a production change. Operations and auditors rely on it (SOX/ITGC controls).
- **Hiring / offer approval** — A requisition and offer were approved at a band by HR and the budget holder. The candidate and recruiters rely on it.

Each is the same primitive: *a named approver authorized a specific request within their authority, and the record can be checked.*

## The Approval Fraud Problem

Approvals are a prime target because they sit between *wanting* something and *getting paid for it*:

- **Forged sign-off** — An employee fabricates a manager's approval on a PO or expense to push spend through. The email looks real; the approval never happened.
- **Self-approval / circumvention** — A requester approves their own request, or routes it to a colleague who lacks the authority, defeating segregation of duties.
- **Amount tampering** — A genuinely approved PO for £18,450 is edited to £184,500 before it reaches the supplier or the ledger.
- **Stale approval** — An approval that was later rescinded (budget cut, supplier blacklisted, project cancelled) continues to circulate and gets acted upon.
- **Approver impersonation** — A vendor-impersonation or BEC fraud presents a fake "CFO approved" instruction to release payment.

A verifiable approval addresses these: the company — not the requester — issues and hosts the record; the hash binds the amount and approver so tampering breaks verification; and the status reflects rescission immediately.

## Data Verified

Company name and registration, approval type, reference number (PO/expense/change ID), the item or counterparty, the amount or scope, the named approver and their role, the date of approval, any second-approver requirement, the controlling budget line or policy, and the validity condition.

## Data Visible After Verification

Shows the issuer domain (e.g., `northbridge.com`) and the current status of the approval.

**Verification Response Format:**

```json
{
  "status": "verified",
  "allowedDomains": ["northbridge.com", "*.northbridge.com"]
}
```

**Status Indications:**
- **Approved — in force** — The approval is current and matches the company's record.
- **Pending second approver** — Approved at first level; awaiting a required co-approval before it is effective.
- **Rescinded** — Withdrawn after issue (budget cut, cancellation, supplier issue). Do not act on it.
- **Superseded** — Replaced by a revised approval (e.g., new amount); request the current record.
- **Fulfilled / closed** — The approval was consumed (goods received, expense paid); no longer actionable.
- **404** — No such approval exists on the company's record (never issued, forged, or OCR error).

## Second-Party Use

The **approving company** benefits.

**Disownment of forgeries:** A company can declare that all material approvals carry verifiable records at its domain, and that anything presented without one is not recognised — the same pre-emptive-disownment pattern used for signing authority. A forged "CFO approved" instruction has no verifiable record, so it fails at the door.

**Audit evidence:** The company's own internal audit and external auditors can confirm that approvals in the ledger correspond to real, in-force authorizations — turning a manual controls-testing exercise into a clip check.

## Third-Party Use

**Suppliers**

**PO reliance:** Before shipping against a £184,500 PO, the supplier verifies the approval is real, at that amount, by an authorized approver, and not rescinded. This blunts the BEC/vendor-impersonation pattern where a fake large PO or a fake "expedite and we'll pay" instruction is pushed onto a trusting supplier.

**Auditors (Internal and External)**

**Controls testing:** SOX/ITGC and procurement audits sample approvals and check segregation of duties. Verifiable approvals let auditors confirm the named approver had authority and that self-approval did not occur, without chasing email trails.

**Banks and Payment Operations**

**Payment release:** A finance team about to release a high-value payment can verify the underlying approval before acting — a direct control against business-email-compromise payment fraud.

**Counterparties and Candidates**

**Offer reliance:** A candidate (or their recruiter) can confirm that a job offer was genuinely approved at the stated band by the budget holder, not informally promised by a line manager who can't authorize it.

## Verification Architecture

**The Problem:**
- Approvals are asserted in emails and PDFs that are trivial to forge or alter
- Recipients (suppliers, finance, auditors) cannot independently confirm an approval happened
- Rescinded approvals keep circulating with no signal that they are dead
- BEC and self-approval fraud exploit the gap between "looks approved" and "is approved"

**The Fix:** The company issues a verifiable approval record at its own domain for each material approval. The recipient clips the approval text and verifies the hash, amount, approver, and live status before acting.

**The reliance flow:**
1. An approval is granted in the company's ERP/workflow system
2. The system publishes a verifiable approval record (hash) at the company domain
3. The recipient (supplier, finance, auditor) receives the approval and clips it
4. Verification confirms the amount, the approver, and that it is in force
5. If rescinded or superseded → the recipient stops and escalates

**Integration with ERP / workflow:** Procure-to-pay and change-management systems (e.g., SAP Ariba, Coupa, ServiceNow) could emit a verifiable approval record at the point of approval, with no change to how approvers work.

## Authority Chain

**Pattern:** Commercial

Companies issue internal approval records under their own governance and internal-control framework. Self-authorized; trust rests on the issuer's domain.

```
✓ northbridge.com/approvals/v — Issues internal approval records
```

Commercial issuer — self-authorized. Trust rests on the issuer's domain reputation.

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## See Also

- [Corporate Signing Authority and Delegation Limits](view.html?doc=contract-signing-authority) — proves a person *can* commit the company; this doc proves a specific thing *was* approved
- [Board Resolutions and Written Consents](view.html?doc=board-resolutions-written-consents) — the highest-level corporate approvals (reserved matters)
- [B2B Credit Control](view.html?doc=b2b-credit-control) — credit-limit approvals and trade references
- [Professional Approvals & Sign-Offs](view.html?doc=professional-approvals) — approvals where a qualified professional signs off a work product

## Jurisdictional Witnessing (Optional)

Some jurisdictions, contracts, or multi-party workflows may add an independent witness layer. When used, the witnessing firm:

- Receives all hashes from the issuer, and any subsequent changes to the payload as they happen—which may manifest as a new hash, a status change, or even a 404 (record deleted)
- Receives structured content/metadata (key identifiers and dates)
- Does **NOT** receive plaintext or sensitive personal information
- Provides an immutable, timestamped audit trail—available to the jurisdiction on demand, to document holders/third parties during disputes, or as expert witness testimony in legal proceedings

This provides:
- **Non-repudiation:** Issuer cannot deny issuing the approval
- **Timestamp proof:** The approval existed at a specific time
- **Regulatory audit:** Auditors can inspect the witness ledger for control failures
- **Resilience:** Verification works even if the issuer's systems go down

**Public Blockchain (Non-Party)**

If a witness layer exists, it may periodically commit rollups to a public blockchain as an additional timestamping mechanism. That is optional, not inherent to the use case. The verification paths would then be:

1. **Issuer domain** — Direct check against the issuer
2. **Witnessing firm** — Independent confirmation with timestamp
3. **Public blockchain** — Decentralized trust anchor via rollup inclusion

## Further Derivations

1. **Dual-control / four-eyes approvals** — Records that bind *both* required approvers, so a recipient can confirm a high-value item carried a genuine second signature and was not single-approved in breach of policy.
2. **Capital-expenditure approvals** — Capex authorizations with committee references and phased release conditions, verifiable by the vendor at each release gate.
3. **Change-advisory-board (CAB) approvals** — Production-change/deployment approvals tied to a change ticket, verifiable by auditors and operations as part of ITGC evidence.

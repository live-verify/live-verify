---
title: "Master Service Agreements (MSA) and SOWs"
category: "Business & Commerce"
volume: "Medium"
retention: "Contract term + 7-10 years"
slug: "master-service-agreements-sows"
verificationMode: "clip"
tags: ["msa", "sow", "corporate-contract", "legal-operations", "procurement", "service-agreement", "change-order", "liability-limit"]
furtherDerivations: 1
---

<div style="max-width: 600px; margin: 24px auto; font-family: 'Times New Roman', Georgia, serif; border: 1px solid #ccc; background: #fff; padding: 40px; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
  <div style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 25px;">
    <div style="font-weight: bold; font-size: 1.2em;"><span verifiable-text="start" data-for="msa"></span>MASTER SERVICE AGREEMENT</div>
    <div style="font-size: 0.9em; margin-top: 5px;">BETWEEN THE PARTIES NAMED HEREIN</div>
  </div>
<div style="font-size: 1em; line-height: 1.6; color: #333; text-align: justify;">
    <p>This Master Service Agreement (the "Agreement") is entered into as of March 15, 2026, by and between:</p>
<p><strong>CLIENT:</strong> Globochem Worldwide, Inc.<br>
    <strong>PROVIDER:</strong> Apex Cloud Solutions, LLC</p>
<div style="margin: 20px 0; background: #f9f9f9; padding: 15px; border: 1px solid #eee;">
      <p><strong>Section 4.2: Liability Limit:</strong> Provider's total aggregate liability under this Agreement shall not exceed <strong>$ 1,000,000.00</strong>.</p>
      <p><strong>Section 7.1: Termination:</strong> Either party may terminate with 30 days written notice.</p>
    </div>
<p>This Agreement governs all future Statements of Work (SOWs) executed between the parties.</p>
  </div>
<div style="margin-top: 40px; display: flex; justify-content: space-between; align-items: flex-end;">
    <div style="width: 45%;">
      <div style="border-top: 1px solid #000; padding-top: 5px; font-style: italic;">Sarah Miller, CEO (Apex)</div>
    </div>
    <div style="width: 45%; text-align: right;">
      <div style="border-top: 1px solid #000; padding-top: 5px; font-style: italic;">Bill Lumbergh, VP (Globochem)</div>
    </div>
  </div>
<div data-verify-line="msa" style="border-top: 1px dashed #999; margin-top: 40px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
      title="Demo only: Legal department doesn't yet offer verification&#10;endpoints, so this is illustrative">
      <span data-verify-line="msa">verify:apexcloud.com/legal/v</span> <span verifiable-text="end" data-for="msa"></span>
  </div>
</div>

## The Problem: PDF Redline Fraud

- **Liability Cap Removal:** A client editing the PDF to remove the "$1M cap," making the provider potentially liable for the entire value of a data breach.
- **Termination Backdating:** Fabricating a "Notice of Termination" from 3 months ago to avoid paying a current invoice.
- **Unauthorized SOWs:** Creating a fake Statement of Work that looks like it's covered by a real MSA to trick a department head into approving a project.

## What Is Checked

Client name, Provider name, Agreement ID, execution date, specific liability limit amount, termination notice period, governing law jurisdiction, authorized signatories, page count of full contract.

**Document Types:**
- **Master Service Agreement (MSA):** The primary legal framework.
- **Statement of Work (SOW):** (Linked hash) for specific project details.
- **Change Order:** Documenting verified modifications to a project.
- **Mutual NDA:** (Linked hash) protecting trade secrets.

## What the Checker Sees

Shows the issuer domain (e.g., the Provider's or Client's Legal Dept) and current status.

**Status Indications:**
- **Active/Executed** — Agreement is signed and in effect.
- **Terminated** — Contract has ended; no new SOWs authorized.
- **Amended** — A newer version of the MSA exists (view Amendment #3).
- **In-Dispute** — Contract terms are being formally litigated.

## Who Holds It

The Procurement / Legal Team benefits from verification.

**Anti-Tampering:** Ensuring that a "Last Minute Change" wasn't snuck into the PDF by a negotiator after the final version was agreed upon. Live Verify turn every page of the 50-page MSA into an immutable digital anchor, protecting the "Liability Caps" and "IP Rights" from silent editing.

**Internal Audit:** Proving to the CFO that the contract being paid against is the Verified Official Version approved by General Counsel.

## Who Checks It

**Insurance Underwriters (E&O)**
**Risk Assessment:** Verifying the "Liability Limits" in a client's major MSAs before writing a professional liability policy. If the paper says "$1M cap" but the verified hash says "$10M," the insurer avoids an under-priced risk.

**M&A Due Diligence**
**Revenue Audit:** A buyer of a company can instantly verify the "Change-of-Control" and "Termination" clauses across 1,000+ client MSAs by scanning their hashes, reducing the time for manual legal review.

**Banks / Factorers**
**Contract Integrity:** Verifying the existence of an MSA before advancing cash against an SOW invoice.

## Who Issues It

**Issuer Types** (First Party)

**Corporate Legal Depts:** (Hosting on their own `/legal` domain).
**Law Firms:** (e.g., Wilson Sonsini, Cooley - hosting for clients).
**Contract Platforms:** (e.g., Ironclad, Icertis, DocuSign - hosting the hashes).

## Authority Chain

**Pattern:** Commercial

Corporate legal departments and contract platforms issue MSA and SOW verifications. The issuer is self-authorized as the contracting party responsible for agreement custody.

```
✓ contracts.example-corp.com/msa/verify — Certifies master service agreements and statements of work with liability terms
```

Commercial issuer — self-authorized. Trust rests on the issuer's domain reputation.

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Where Each Fits: Live Verify and Contract Lifecycle Management Systems

Contract lifecycle management (CLM) systems, Ironclad among them, are where a company drafts, approves, signs, stores and tracks its own contracts. They are run by the company, or by a vendor on its behalf, and open to its own staff. A CLM system and Live Verify answer different questions and work side by side: one is the company's system of record, the other lets an outsider handed a signed agreement or statement of work confirm that the party stands behind its text.

| | CLM system | Live Verify on the signed agreement | Scanned PDF or email |
| :--- | :--- | :--- | :--- |
| **Who can check** | The company's own staff, and counterparties only if both use the same system. | Anyone handed the agreement: an acquirer, an insurer, an auditor, a subcontractor. | Nobody; it can only be taken on trust. |
| **What the checker gets** | The full contract record, with versions, approvals and renewal dates. | Confirmation that the party published this exact agreement text, fine print included, as at its date, and whether it has since been superseded or terminated. | A document whose terms may have been edited. |
| **What the company shares** | Nothing outside its own users. | Only the agreements it chose to hand over. | Only the agreements it chose to hand over. |
| **Reach** | One company's system. | Global in principle: any company, in any country, that publishes hashes on its own domain. | Anywhere, but untrusted. |
| **Speed and cost** | Immediate for users; enterprise license fees. | A few seconds per check: one web lookup, with no fee to the standard. | Immediate. |
| **What it needs** | A license and a login. | The party to publish hashes, and Live Verify-aware software on the checker's device. No company does this yet. | Nothing. |
| **Best suited to** | Managing the company's own contracts from draft to renewal. | Due diligence, audits and disputes, where an outsider must rely on a signed copy. | Nothing where the terms matter. |

**Where each fits:** A contract lifecycle management system is the right home for a company's own contracts: drafting, approvals, renewals and search all belong there. It is not built for showing a signed agreement to an outsider, such as an acquirer, insurer or auditor, who will not be given a login. Live Verify lets that outsider confirm the PDF they received is the text the party published, and the contract system remains the system of record.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).

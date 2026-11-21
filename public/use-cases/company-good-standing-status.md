---
title: "Company Good Standing / No Winding-Up Petition"
category: "Business & Commerce"
volume: "Large"
retention: "Snapshot"
slug: "company-good-standing-status"
verificationMode: "clip"
tags: ["company-status", "good-standing", "winding-up", "ccj", "administration", "companies-house", "secretary-of-state", "due-diligence"]
furtherDerivations: 2
---

## The Problem

Before entering a contract, extending credit, or signing a commercial lease, a counterparty needs to know whether the company they are dealing with is active and in good standing. The underlying records are public but fragmented across multiple systems with different authorities:

- **Company incorporation and filing status** — Companies House (UK), Secretary of State (US)
- **County Court Judgments (CCJs)** — Registry Trust / court systems (UK), county courts (US)
- **Winding-up petitions** — Courts / Insolvency Service (UK), bankruptcy courts (US)
- **Administration / insolvency** — Insolvency Service (UK), bankruptcy courts (US)

No single authority holds all of these. Companies House can authoritatively confirm incorporation status, filing compliance, and registered office — but CCJs, winding-up petitions, and administration status sit with courts and insolvency authorities.

This means a comprehensive company status snapshot requires either:

1. **A composite view** — an aggregator (such as a credit reference agency) that draws from multiple authoritative sources and issues a single verifiable claim covering all dimensions, or
2. **Multiple verifiable claims** — separate claims from each authority (Companies House for filing status, Registry Trust for CCJs, Insolvency Service for administration), each verified against its own domain

The composite approach is more convenient for the counterparty; the multiple-claim approach is more precise about provenance. Either way, each fact should be traceable to the authority that actually holds it.

## Company Status — Good Standing

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="status-good"></span>COMPANY STATUS
Company:       Northbridge Services Ltd
Company No:    12345678
Status:        ACTIVE                    [source: Companies House]
Filed Accounts: UP TO DATE               [source: Companies House]
CCJs:          NONE ON RECORD            [source: Registry Trust]
Winding-Up:    NO PETITION FILED         [source: Insolvency Service]
Administration: NOT IN ADMINISTRATION    [source: Insolvency Service]
As At:         21 Mar 2026
<span data-verify-line="status-good">verify:companieshouse.gov.uk/status/v</span> <span verifiable-text="end" data-for="status-good"></span></pre>
</div>

## Company Status — Distressed

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="status-distressed"></span>COMPANY STATUS
Company:       Riverside Trading Ltd
Company No:    87654321
Status:        ACTIVE — ACCOUNTS OVERDUE [source: Companies House]
Filed Accounts: OVERDUE (last filed: Mar 2024) [source: Companies House]
CCJs:          2 ON RECORD               [source: Registry Trust]
Winding-Up:    PETITION FILED 15 Feb 2026 [source: Insolvency Service]
Administration: NOT IN ADMINISTRATION    [source: Insolvency Service]
As At:         21 Mar 2026
<span data-verify-line="status-distressed">verify:companieshouse.gov.uk/status/v</span> <span verifiable-text="end" data-for="status-distressed"></span></pre>
</div>

## What Is Checked

Company name, company number, active/inactive status, filed accounts status, CCJ count, winding-up petition status, administration status, source authority for each dimension, and the as-at date of the snapshot. Companies House can authoritatively attest to incorporation and filing status; CCJ and insolvency dimensions are sourced from courts and the Insolvency Service respectively. The composite view aggregates these, but each fact is traceable to its originating authority.

## What the Checker Sees

Shows the issuing authority domain (`companieshouse.gov.uk`, `sos.ca.gov`, etc.) and confirms whether the company status claim is current.

**Status Indications:**
- **ACTIVE — GOOD STANDING** — No adverse filings, accounts up to date.
- **ACTIVE — ACCOUNTS OVERDUE** — Company is active but has failed to file accounts on time.
- **CCJs ON RECORD** — One or more County Court Judgments registered against the company.
- **PETITION FILED** — A winding-up petition has been filed with the court.
- **IN ADMINISTRATION** — An administrator has been appointed.

## Who Holds It

The company itself uses this to prove its good standing when bidding for contracts, onboarding with a new supplier, or applying for credit facilities. The company clips the verified status and shares it with the counterparty, who checks the hash against the Companies House domain. This replaces emailing a PDF company search that the recipient has no way to authenticate.

## Who Checks It

**Procurement Teams**
Before awarding a contract, a procurement team needs assurance that the winning bidder is not subject to a winding-up petition or in administration. A verified status snapshot provides that assurance without relying on a credit agency's stale report.

**Lenders and Credit Providers**
Banks and invoice finance providers evaluating a company for a credit facility can confirm good standing and the absence of CCJs as part of their due diligence, with a cryptographic link to the issuing authority rather than a self-reported PDF.

**Landlords Considering a Commercial Lease**
A landlord letting commercial premises needs to know the prospective tenant is solvent. A verified snapshot from Companies House showing no adverse filings is more trustworthy than a tenant-supplied reference letter.

**Counterparties in Supply Chains**
A manufacturer extending 60-day payment terms to a distributor can verify the distributor's company status before shipping goods on credit.

## How Verification Works Here

**The "Hidden Distress" Problem**

- **Stale Data:** A company shares a PDF company search from three months ago. Since then, a winding-up petition has been filed, but the counterparty has no way to know.
- **Selective Disclosure:** A company provides its Companies House filing but omits the CCJ register, which shows two outstanding judgments.
- **Forgery:** PDF company searches and "certificate of good standing" documents are trivially editable. There is no cryptographic binding between the document and the issuing authority.

**Issuer Types** (First Party)

**UK:** Companies House (`companieshouse.gov.uk`) — the statutory registrar for England, Wales, and Scotland.
**US:** State Secretaries of State — each state maintains its own business entity register (e.g., Delaware Division of Corporations, California Secretary of State).

**Privacy Salt:** Not required. Company registration data is public record by design. Company numbers, names, and filing status are openly searchable on the relevant registers.

## Authority Chain

**Pattern:** Government

Companies House, the UK's statutory registrar of companies, is authorized to issue verified company status confirmations.

```
✓ companieshouse.gov.uk/status/verify — Issues verified company status
  ✓ gov.uk/government/organisations/companies-house — UK government registrar
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Where Each Fits: Live Verify and Credit Reports

The records behind a company's good standing are held by several authorities: the company registry (Companies House in the UK, a Secretary of State in the US) for filing status, and the courts and insolvency authorities for judgments, petitions and insolvency. Commercial credit agencies gather these into a credit report for subscribers. Credit reports and Live Verify answer different questions and work side by side: one is an agency's assessment drawn from many sources, the other lets a status statement from each authority be checked against that authority's own domain.

| | Commercial credit report | Live Verify on the status statement | Downloaded registry PDF |
| :--- | :--- | :--- | :--- |
| **Who can check** | Subscribers to the credit agency. | Anyone handed the statement: a landlord, a supplier, a lender. | Whoever receives it, trusting it as it stands. |
| **What the checker gets** | An assessment drawing on many sources, including a credit score and payment history, as current as the agency's last update. | Confirmation that the named authority issued this exact status statement, as at its stated date, and whether it has since changed. Each statement covers only what that authority holds. | A file reflecting the status when it was downloaded, which may have been edited. |
| **What the company shares** | Nothing; the agency compiles the report. | Only the statement. | Only the file. |
| **Reach** | Companies the agency covers, mostly in its own markets. | Global in principle: any registry, court or insolvency authority, in any country, that publishes hashes on its own domain. | Universal, but untrusted. |
| **Speed and cost** | Minutes, on a paid subscription or per-report fee. | A few seconds per check: one web lookup, with no fee to the standard. | Free and immediate. |
| **What it needs** | A subscription. | Each authority to publish hashes, and Live Verify-aware software on the checker's device. No registry or court does this yet. | Nothing. |
| **Best suited to** | Credit decisions that need a broad picture and a score. | Confirming a specific status, such as no winding-up petition, directly from the authority that holds it. | Nothing where credit or a lease depends on it. |

**Where each fits:** a credit report remains the right tool for a credit decision, since it brings many sources together and adds the agency's own judgement. It costs a subscription and is only as current as the agency's last update. Live Verify lets a counterparty confirm a specific status, at a stated date, directly against the authority that holds it, which suits a one-off check by a landlord or supplier who has no subscription.

## Further Derivations

None currently identified.

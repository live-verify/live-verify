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

## Data Verified

Company name, company number, active/inactive status, filed accounts status, CCJ count, winding-up petition status, administration status, source authority for each dimension, and the as-at date of the snapshot. Companies House can authoritatively attest to incorporation and filing status; CCJ and insolvency dimensions are sourced from courts and the Insolvency Service respectively. The composite view aggregates these, but each fact is traceable to its originating authority.

## Data Visible After Verification

Shows the issuing authority domain (`companieshouse.gov.uk`, `sos.ca.gov`, etc.) and confirms whether the company status claim is current.

**Status Indications:**
- **ACTIVE — GOOD STANDING** — No adverse filings, accounts up to date.
- **ACTIVE — ACCOUNTS OVERDUE** — Company is active but has failed to file accounts on time.
- **CCJs ON RECORD** — One or more County Court Judgments registered against the company.
- **PETITION FILED** — A winding-up petition has been filed with the court.
- **IN ADMINISTRATION** — An administrator has been appointed.

## Second-Party Use

The **company itself** uses this to prove its good standing when bidding for contracts, onboarding with a new supplier, or applying for credit facilities. The company clips the verified status and shares it with the counterparty, who checks the hash against the Companies House domain. This replaces emailing a PDF company search that the recipient has no way to authenticate.

## Third-Party Use

**Procurement Teams**
Before awarding a contract, a procurement team needs assurance that the winning bidder is not subject to a winding-up petition or in administration. A verified status snapshot provides that assurance without relying on a credit agency's stale report.

**Lenders and Credit Providers**
Banks and invoice finance providers evaluating a company for a credit facility can confirm good standing and the absence of CCJs as part of their due diligence, with a cryptographic link to the issuing authority rather than a self-reported PDF.

**Landlords Considering a Commercial Lease**
A landlord letting commercial premises needs to know the prospective tenant is solvent. A verified snapshot from Companies House showing no adverse filings is more trustworthy than a tenant-supplied reference letter.

**Counterparties in Supply Chains**
A manufacturer extending 60-day payment terms to a distributor can verify the distributor's company status before shipping goods on credit.

## Verification Architecture

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

## Competition vs. Manual Verification

| Feature | Live Verify | PDF Company Search | Credit Report |
| :--- | :--- | :--- | :--- |
| **Speed** | **Seconds.** Hash check against issuer domain. | **Instant.** But no integrity guarantee. | **Minutes.** API call to credit agency. |
| **Trust Anchor** | **Domain-Bound.** Tied to Companies House. | **Zero.** Trivially editable PDF. | **Reputation.** Trust the credit agency. |
| **Currency** | **Real-time.** Current as of the as-at date. | **Stale.** Reflects status at download time. | **Delayed.** Depends on agency update cycle. |
| **Integrity** | **Cryptographic.** Binds status to domain. | **None.** No tamper detection. | **API-bound.** Requires paid subscription. |

## Further Derivations

None currently identified.

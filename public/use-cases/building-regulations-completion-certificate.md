---
title: "Building Regulations Completion Certificate"
category: "Real Estate & Property"
volume: "Large"
retention: "Transaction lifetime"
slug: "building-regulations-completion-certificate"
verificationMode: "clip"
tags: ["property", "building-control", "conveyancing", "completion-certificate", "real-estate", "construction", "building-regulations"]
furtherDerivations: 2
---

## The Problem

Building regulations are separate from planning permission. Planning permission controls what you can build and where; building regulations control how the work is constructed — structural integrity, fire safety, drainage, insulation, ventilation, electrical safety, and other technical standards. A completion certificate confirms that a building control body has inspected the finished work and is satisfied it meets the applicable regulations.

During conveyancing, the buyer's solicitor needs evidence that any building work at the property was signed off under building regulations. Work carried out without building control sign-off — or where inspections were started but a completion certificate was never issued — creates problems. Mortgage lenders may refuse to lend against a property with uninspected work. The buyer inherits the liability: the local authority retains enforcement powers indefinitely for work that does not comply with building regulations, and there is no statutory time limit on enforcement action for dangerous work.

Sellers may assert that their extension or conversion "passed building control" but the buyer's solicitor must verify this independently, typically through an indemnity policy or by obtaining confirmation from the relevant building control body. There is no standardised, verifiable format for this confirmation. A verifiable completion certificate status issued by the building control body would surface the issue early in the transaction, before survey fees and mortgage application costs are committed.

## Building Regulations Completion Certificate — Issued

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="bc-completion-issued"></span>BUILDING REGULATIONS COMPLETION
Property:       14 Cedar Grove, York
Application:    BC/2024/441882
Description:    Single-storey rear extension
Status:         COMPLETION CERTIFICATE ISSUED
Issued:         15 Nov 2024
Building Control: York City Council
<span data-verify-line="bc-completion-issued">verify:york.gov.uk/building-control/v</span> <span verifiable-text="end" data-for="bc-completion-issued"></span></pre>
</div>

## Building Regulations Status — No Completion Certificate

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="bc-no-certificate"></span>BUILDING REGULATIONS STATUS
Property:       14 Cedar Grove, York
Application:    BC/2024/441882
Description:    Single-storey rear extension
Status:         NO COMPLETION CERTIFICATE
Note:           Work may be uninspected or incomplete
<span data-verify-line="bc-no-certificate">verify:york.gov.uk/building-control/v</span> <span verifiable-text="end" data-for="bc-no-certificate"></span></pre>
</div>

**The "no completion certificate" status is a flag, not a conclusion.** There are several reasons a completion certificate may not exist: the work may never have been notified to building control, inspections may have started but the builder never requested a final inspection, the work may have failed a final inspection, or the application may still be open. A solicitor seeing this flag would investigate further — typically by requesting the building control file from the council or arranging a regularisation application.

## What Is Checked

Property address, building control application reference, description of work, completion certificate status, date of issue (where a certificate exists), and the building control body that issued or would issue the certificate.

## What the Checker Sees

Shows the issuer domain (`york.gov.uk`) and confirms whether the completion certificate claim is current.

**Status Indications:**
- **COMPLETION CERTIFICATE ISSUED** — The building control body has inspected the completed work and is satisfied it complies with the building regulations. The certificate date confirms when sign-off occurred.
- **NO COMPLETION CERTIFICATE** — No completion certificate exists for this application. This could mean the work was never notified, inspections are incomplete, or the work did not pass final inspection.

## Who Holds It

The property owner or builder uses this to demonstrate that building work has been signed off under building regulations. When a buyer or their solicitor asks whether the extension or conversion was inspected, the seller clips the completion certificate snapshot and shares it. The recipient verifies the hash against the council's domain within seconds.

Builders and contractors can share the verified completion certificate with the property owner as evidence of sign-off, and with future clients as evidence of compliant work.

## Who Checks It

**Buyer's Solicitors**
The primary consumer during conveyancing. A solicitor acting for a buyer needs both planning permission confirmation and building regulations sign-off for any significant building work. These are separate regimes — having planning permission does not mean the work was inspected under building regulations, and vice versa. See also [Planning Permission Status](planning-permission-status.md), which covers the planning side. A solicitor would typically need to verify both for any building work at the property.

**Mortgage Lenders**
Lenders require evidence that building work complies with building regulations. Uninspected work affects the property's value and its suitability as security. Where no completion certificate exists, lenders may require a regularisation certificate or an indemnity policy before proceeding.

**Insurers**
Building insurers and warranty providers need to confirm that work was carried out to the required technical standards. A completion certificate from building control provides evidence of this. Work without sign-off may affect cover.

## How Verification Works Here

**The "Was It Signed Off?" Problem**

- **Missing Certificates:** A seller claims building work "passed building control" but no completion certificate was ever issued. The buyer discovers this during conveyancing, delaying or collapsing the transaction.
- **Partial Inspections:** Building control may have carried out some inspections during construction, but the builder never called for the final inspection. The work appears in the council's records as an open application with no certificate.
- **Indemnity Masking:** Where a completion certificate is missing, sellers sometimes obtain an indemnity policy instead of resolving the underlying issue. A verifiable status from building control makes the position transparent before the indemnity question arises.
- **Local Authority vs. Approved Inspector:** In England and Wales, building control can be carried out by the local authority or by a private Approved Inspector. A standardised verifiable output would work for either route.

**Issuer Types** (First Party)

**Local Authority Building Control:** District councils, unitary authorities, metropolitan boroughs, London boroughs — each operating a building control service within their area.

**Approved Inspectors (England and Wales):** Private sector building control bodies registered with the Building Safety Regulator. They carry out the same inspection and certification function as local authority building control.

**Privacy Salt:** Required. Property addresses and building control references are semi-public, but the combination of address, application number, and certificate status could be enumerated. The hash must be salted to prevent an adversary from constructing lookups against known addresses.

## Authority Chain

**Pattern:** Government

The local authority building control service (here, City of York Council) is the authoritative source for completion certificates within its area.

```
✓ york.gov.uk/building-control/verify — Issues verified building regulations status
  ✓ york.gov.uk — Local authority building control
    ✓ gov.uk/verifiers — UK government root namespace
```

Private sector (Registered Building Control Approver):

```
✓ approvedinspector.example.com/completion/v — Completion certificate
  ✓ bsr.gov.uk — Building Safety Regulator (registers building control approvers)
    ✓ gov.uk/verifiers — UK government root namespace
```

In England and Wales, building control may be provided by the local authority or by a registered building control approver (formerly Approved Inspector). Both routes produce completion certificates with equal legal standing. The authority chain reflects whichever body conducted the inspection.

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Where Each Fits: Live Verify, Building Control Records and Indemnity Policies

In England and Wales the authoritative record of a completion certificate is held by whichever building control body signed the work off: the local authority, or a registered building control approver. Conveyancers confirm a certificate by asking that body, and where no certificate can be found, sellers often buy an indemnity policy instead. An indemnity policy does not verify anything; it insures the buyer against the cost of enforcement action. The three answer different questions and work side by side. <!-- TODO(verify): that indemnity cover is typically voided by contacting the council -->

| | Asking building control | Indemnity policy | Live Verify on the certificate |
| :--- | :--- | :--- | :--- |
| **Who can check** | The buyer's solicitor or anyone who makes a request to the right building control body. | Not a check; the buyer receives an insurance policy. | Anyone handed the certificate: buyer, solicitor, lender or surveyor. |
| **What the checker gets** | The body's own record of the application, which can show partial inspections or open applications as well as completed ones. | Cover against the financial cost of certain enforcement action, with no finding on whether the work complied. | Confirmation that the named building control body issued this exact certificate, as at its date, and whether it still stands. |
| **What the seller shares** | Enough detail about the property and works for the request. | Nothing about the work; the policy is bought instead. | Only the certificate they hand over. |
| **Reach** | The area of that council, or the approver's own records. | Wherever such policies are sold. | Global in principle: any building control body, council or approver, in any country, that publishes hashes on its own domain. |
| **Speed and cost** | Days to weeks, depending on the council and how its records are kept; some charge for searches. | Usually quick to arrange, for a premium. | A few seconds per check: one web lookup, with no fee to the standard. |
| **What it needs** | A body that can find and answer for its own records. | An insurer willing to cover the risk, and the buyer not having contacted the council in a way that voids cover. | The building control body to publish hashes, and Live Verify-aware software on the checker's device. No building control body does this yet. |
| **Best suited to** | Settling the full history where the certificate is missing or the record is unclear. | Closing a transaction where the risk is judged small and the history cannot be resolved in time. | Confirming quickly that a certificate the seller has produced is genuine and current. |

**Where each fits:** where a certificate is missing or the history is unclear, the building control body's own records remain the place to go, and an indemnity policy remains a commercial way to manage the risk. Where the seller does produce a certificate, Live Verify lets the buyer's side confirm it in seconds rather than waiting on a written request, provided the body that issued it publishes hashes and the checker has software that honours them.

## Jurisdictional Notes

<details>
<summary>United Kingdom</summary>

In England and Wales, building regulations approval can be obtained through a local authority building control service or through a private Approved Inspector. Both routes lead to a completion certificate (or "final certificate" from an Approved Inspector). Scotland has a separate building standards system administered by local authorities, with a "completion certificate" and "acceptance" process. Northern Ireland has its own building regulations regime administered by district councils.

</details>

<details>
<summary>United States</summary>

Local building departments (city or county) issue permits for construction work and conduct inspections. The equivalent of a completion certificate is typically a Certificate of Occupancy (CO) or a final inspection sign-off. Requirements vary by jurisdiction, but mortgage lenders and title companies routinely require evidence that permits were closed and final inspections passed.

</details>

<details>
<summary>Australia</summary>

Building surveyors (private or municipal) issue occupancy permits or certificates of final inspection once construction work is complete and compliant. The terminology and process vary by state and territory. In Victoria, a building surveyor issues an occupancy permit; in New South Wales, a principal certifier issues an occupation certificate.

</details>

## Further Derivations

None currently identified.

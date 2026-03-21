---
title: "Planning Permission Status"
category: "Real Estate & Property"
volume: "Large"
retention: "Transaction lifetime"
slug: "planning-permission-status"
verificationMode: "clip"
tags: ["property", "planning", "conveyancing", "council", "building-work", "real-estate", "permission"]
furtherDerivations: 2
---

## The Problem

During a property purchase, the buyer's solicitor needs to establish whether any building work carried out at the property had proper planning permission and whether any conditions attached to that permission have been discharged. This information is held by local planning authorities, each with their own portal and search interface. There is no standard format, no consistent URL structure, and no way to get a verifiable snapshot of the planning position.

Sellers may claim their extension or conversion was "fully approved" but the buyer's solicitor must independently verify this through the council's planning portal, cross-referencing application numbers, checking condition discharge notices, and confirming implementation deadlines have not expired. If building work was done without permission, or conditions remain outstanding, the buyer inherits the enforcement risk.

A verifiable planning permission status issued directly by the local planning authority would give buyers, solicitors, and mortgage lenders a current, tamper-evident snapshot of the permission position for a specific application. It would not replace the formal local authority search, but it would surface planning issues early in the transaction before survey fees and other due diligence costs are committed.

## Planning Permission Status — Conditions Discharged

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="planning-discharged"></span>PLANNING PERMISSION STATUS
Property:       14 Cedar Grove, York
Application:    2024/0882/FUL
Description:    Single-storey rear extension
Status:         APPROVED (12 Aug 2024)
Conditions:     3 of 3 DISCHARGED
Expiry:         12 Aug 2027 (3-year implementation)
As At:          21 Mar 2026
<span data-verify-line="planning-discharged">verify:york.gov.uk/planning/v</span> <span verifiable-text="end" data-for="planning-discharged"></span></pre>
</div>

## Planning Permission Status — Conditions Outstanding

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="planning-outstanding"></span>PLANNING PERMISSION STATUS
Property:       14 Cedar Grove, York
Application:    2024/0882/FUL
Description:    Single-storey rear extension
Status:         APPROVED (12 Aug 2024)
Conditions:     1 of 3 OUTSTANDING
Expiry:         12 Aug 2027 (3-year implementation)
As At:          21 Mar 2026
<span data-verify-line="planning-outstanding">verify:york.gov.uk/planning/v</span> <span verifiable-text="end" data-for="planning-outstanding"></span></pre>
</div>

**Condition detail is excluded from the verifiable text.** The snapshot confirms how many conditions exist and how many remain outstanding, but does not enumerate the individual conditions (e.g., materials samples, drainage scheme, landscaping). A solicitor who sees outstanding conditions would request the full condition discharge history from the council through the normal channels. The verifiable snapshot flags the issue; the detail follows through established processes.

## Data Verified

Property address, application reference number, description of development, permission status and date of decision, number of conditions and how many are discharged or outstanding, implementation expiry date, and the as-at date of the snapshot.

## Data Visible After Verification

Shows the issuer domain (`york.gov.uk`) and confirms whether the planning permission status claim is current.

**Status Indications:**
- **APPROVED, all conditions DISCHARGED** — Permission was granted and all attached conditions have been formally discharged by the council.
- **APPROVED, conditions OUTSTANDING** — Permission was granted but one or more conditions remain undischarged. This is a flag, not a legal conclusion — some outstanding conditions are serious (pre-commencement conditions that may affect validity), some are regularisable, and some are immaterial to the current risk. A solicitor seeing this flag would investigate the specific conditions through established channels.
- **REFUSED / WITHDRAWN / EXPIRED** — Other statuses that may appear for applications that did not proceed or where the implementation window has passed.

## Second-Party Use

The **property owner** (or the seller's solicitor) uses this to demonstrate that building work was properly permitted and that conditions have been met. When a buyer asks about the rear extension or loft conversion, the seller clips the planning permission snapshot and shares it. The recipient verifies the hash against the council's domain within seconds, confirming the permission status without navigating the council's planning portal.

Builders and contractors can also use this to show prospective clients or building control that planning permission is in place before work begins.

## Third-Party Use

**Buyer's Solicitors**
The primary consumer during conveyancing. A solicitor acting for a buyer needs to confirm that any building work visible at the property was carried out with proper planning permission and that conditions were discharged. Outstanding conditions are a flag for further investigation. Some may be serious (pre-commencement conditions that could affect validity), others may be regularisable or immaterial. Because the snapshot deliberately omits condition detail, it should be read as a prompt to investigate, not as a legal conclusion about the permission's validity.

**Mortgage Lenders**
Lenders require confirmation that the property complies with planning requirements. Unauthorised building work or outstanding conditions can affect the property's value and its suitability as security for a mortgage. A verified planning status snapshot provides direct evidence from the planning authority.

**Neighbours**
A neighbour who was notified of a planning application can verify what was actually approved — the description, conditions, and current status. This is useful when a neighbour suspects the work being carried out does not match the approved plans.

**Building Control**
Building control officers can confirm that planning permission exists before issuing a building control completion certificate. The two regimes (planning and building control) are separate but related, and a verified planning snapshot reduces the risk of work proceeding under building regulations alone without the necessary planning consent.

## Verification Architecture

**The "Was It Approved?" Problem**

- **Undisclosed Refusals:** A seller claims an extension was approved when the application was actually refused or withdrawn. The buyer discovers this only during the local authority search, weeks into the transaction.
- **Outstanding Conditions:** Permission was granted subject to conditions, but the seller never applied to discharge them. Pre-commencement conditions that were not discharged before work started can invalidate the entire permission.
- **Expired Permissions:** Planning permission typically expires after three years if not implemented. A seller may present an approval that has lapsed, requiring a fresh application.
- **Portal Inconsistency:** Each of the 300+ local planning authorities in England has its own portal with different interfaces, search mechanisms, and URL structures. A standardised verifiable output would cut through this fragmentation.

**Issuer Types** (First Party)

**Local Planning Authorities:** District councils, unitary authorities, metropolitan boroughs, London boroughs, and national park authorities — each responsible for planning decisions within their area.

**Privacy Salt:** Required. Property addresses and planning application references are semi-public, but the combination of address, application number, and condition status could be enumerated. The hash must be salted to prevent an adversary from constructing lookups against known addresses.

## Authority Chain

**Pattern:** Government

The local planning authority (here, City of York Council) is the authoritative source for planning decisions and condition discharge within its area.

```
✓ york.gov.uk/planning/verify — Issues verified planning permission status
  ✓ york.gov.uk — Local planning authority
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Competition vs. Manual Verification

| Feature | Live Verify | Council Planning Portal | Local Authority Search (CON29) |
| :--- | :--- | :--- | :--- |
| **Speed** | **Seconds.** Hash check against council domain. | **Minutes to hours.** Navigate portal, find application, read conditions. | **Days to weeks.** Submitted as part of formal search pack. |
| **Trust Anchor** | **Domain-Bound.** Tied to the planning authority. | **Institutional.** Trust the portal content is current. | **Institutional.** Trust the council's search response. |
| **Standardisation** | **Uniform format.** Same structure regardless of council. | **None.** Each council has different portal design and data presentation. | **Standard form.** But free-text answers vary by council. |
| **Integrity** | **Cryptographic.** Binds planning status to domain. | **None.** Portal content can change without notice. | **Institutional.** Paper/PDF response from council. |

## Further Derivations

None currently identified.

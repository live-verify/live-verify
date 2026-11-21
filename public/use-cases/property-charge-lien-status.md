---
title: "Property Charge/Lien Status"
category: "Real Estate & Property"
volume: "Large"
retention: "Transaction lifetime"
slug: "property-charge-lien-status"
verificationMode: "clip"
tags: ["property", "conveyancing", "land-registry", "charges", "lien", "mortgage", "title-search", "real-estate"]
furtherDerivations: 2
---

## The Problem

During property conveyancing, solicitors conduct official searches against the land registry to establish what charges are registered against a title. A charge is a legal interest secured against the property — typically a mortgage, but also second charges, restrictions, and other encumbrances. Buyers and their solicitors need to know exactly what will need to be discharged at completion.

Today this is a manual process. The solicitor submits a search request to the land registry, waits for the result, and relies on the search being current at the point it was issued. Between the search date and completion, new charges can be registered. The buyer's solicitor has no way to get a real-time, independently verifiable snapshot of the charge position. They rely on the seller's solicitor to disclose everything, backed by professional obligations rather than cryptographic proof.

A verifiable charge status snapshot issued directly by the land registry would give buyers and their solicitors a current, tamper-evident picture of registered charges. It would not replace the formal search process, but it would provide early confidence during the transaction and flag discrepancies before they become costly.

## Property Charge Status — First Mortgage Only

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="charge-clear"></span>PROPERTY CHARGE STATUS
Title Ref:     YK-221133
Charges:       1 REGISTERED CHARGE
Charge 1:      First legal mortgage (residential lender)
Status:        NO ADDITIONAL CHARGES
As At:         21 Mar 2026
<span data-verify-line="charge-clear">verify:landregistry.gov.uk/charges/v</span> <span verifiable-text="end" data-for="charge-clear"></span></pre>
</div>

## Property Charge Status — Multiple Charges

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="charge-multiple"></span>PROPERTY CHARGE STATUS
Title Ref:     YK-221133
Charges:       3 REGISTERED CHARGES
Charge 1:      First legal mortgage (residential lender)
Charge 2:      Second charge (secured loan provider)
Charge 3:      Restriction — proceeds of sale subject to order
Status:        MULTIPLE CHARGES REGISTERED
As At:         21 Mar 2026
<span data-verify-line="charge-multiple">verify:landregistry.gov.uk/charges/v</span> <span verifiable-text="end" data-for="charge-multiple"></span></pre>
</div>

**Privacy and operational tension:** The chargee names (the specific lender or creditor behind each charge) are excluded from the public-facing verifiable text to protect commercial relationships and borrower privacy. However, this creates a gap: a prospective buyer's solicitor knows charges exist but cannot determine from the public verification alone which lenders hold them or whether those charges will be discharged on completion.

For this use case to be fully operational, the verification response should support an **authorized-expanded view**: a solicitor acting for a buyer in an active transaction could receive an expanded response from the land registry that includes chargee identities. This is analogous to how the current official search process provides full details to parties with legitimate interest. The protocol for authorized-expanded responses is an open design question.

## What Is Checked

Title reference number, number of registered charges, charge type for each entry (first legal mortgage, second charge, restriction, etc.), chargee category (residential lender, secured loan provider, etc.), overall status (no additional charges or multiple charges registered), and the as-at date of the snapshot.

## What the Checker Sees

Shows the issuer domain (`landregistry.gov.uk`) and confirms whether the charge status claim is current.

**Status Indications:**
- **NO ADDITIONAL CHARGES** — Only the expected first mortgage is registered against the title.
- **MULTIPLE CHARGES REGISTERED** — More than one charge exists. The number and type of each charge are listed.

## Who Holds It

The Seller (or the seller's solicitor) uses this to demonstrate the charge position on the property early in the transaction. When a buyer's solicitor requests evidence of the title's encumbrance status, the seller clips the charge status snapshot and shares it. The buyer's solicitor verifies the hash against the land registry's domain within seconds, confirming how many charges are registered and their types — without waiting for the formal search to complete.

## Who Checks It

**Buyer's Solicitors**
The primary consumer. A solicitor acting for a buyer needs to know what charges must be discharged at completion and whether the sale proceeds will be sufficient to clear them. A verified charge status snapshot provides early warning if the title carries unexpected second charges or restrictions, before the solicitor commits time and the buyer commits funds to surveys and other due diligence.

**Mortgage Lenders**
A lender advancing funds for a purchase needs confidence that their charge will be registered as a first legal mortgage. If the title already carries charges that the seller has not disclosed, the lender's security position is compromised. Verified charge status confirms the current position directly from the registry.

**Property Chains**
In a chain of transactions, delays cascade. If a buyer's solicitor discovers undisclosed charges late in the process, the entire chain can collapse. Early verified charge status reduces the risk of late-stage surprises.

**Auction Buyers**
Property auctions require completion within a fixed period (typically 28 days). Auction buyers and their solicitors have limited time for due diligence. A verified charge snapshot gives immediate confidence about the encumbrance position before bidding.

## How Verification Works Here

**The "Undisclosed Charge" Problem**

- **Hidden Second Charges:** A seller presents the property as having only a first mortgage when a second charge is registered. The buyer's solicitor discovers this only during the formal search, delaying the transaction.
- **Restrictions on Title:** A restriction (such as proceeds of sale being subject to a court order) may not be volunteered by the seller's solicitor. A verified snapshot from the registry surfaces it immediately.
- **Stale Searches:** A formal search conducted weeks before completion may not reflect charges registered in the interim. A fresher verified snapshot narrows the window of uncertainty.

**Issuer Types** (First Party)

**National Land Registries:** HM Land Registry (England and Wales), Registers of Scotland, Land Registry of Northern Ireland.
**Equivalent Registries in Other Jurisdictions:** State-level recording offices (US), Grundbuchamt (Germany), Service de la publicité foncière (France).

**Privacy Salt:** Required. Title reference numbers and charge details are sensitive. The hash must be salted to prevent enumeration attacks — an adversary should not be able to guess-and-check whether a known title reference has additional charges registered.

## Authority Chain

**Pattern:** Government

HM Land Registry, a government agency, is the authoritative source for registered charges against property titles in England and Wales.

```
✓ landregistry.gov.uk/charges/verify — Issues verified property charge status
  ✓ gov.uk/land-registry — Government agency for land registration
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Where Each Fits: Live Verify and Land Registry Official Searches

In England and Wales, a buyer's solicitor confirms registered charges by an official search of the register at HM Land Registry (forms OS1 and OS2), which also gives a priority period protecting the buyer while the purchase completes; the seller's solicitor also discloses charges. Other countries have their own land registers and search procedures. The official search does something Live Verify cannot: it protects the buyer's priority. Live Verify answers a narrower question, quickly: does the registry stand behind this charge status, as at its date? They work side by side. <!-- TODO(verify): that OS1/OS2 official searches give a priority period -->

| | Official search (OS1/OS2) | Seller's solicitor disclosure | Live Verify on the charge status |
| :--- | :--- | :--- | :--- |
| **Who can check** | Conveyancers, through the registry's portal. | The buyer's solicitor, receiving it. | Anyone handed the status: a buyer, a lender, a solicitor early in a transaction. |
| **What the checker gets** | The registry's formal search result, with a priority period protecting the application. | The solicitor's statement, backed by professional duty. | Confirmation that the registry issued this exact charge status, as at its date. No priority protection. |
| **What the seller shares** | Nothing; the search is about the title. | Whatever disclosure requires. | Only the status they chose to hand over. |
| **Reach** | Registered land in England and Wales. | The transaction at hand. | Global in principle: any land registry, in any country, that publishes hashes on its own domain. |
| **Speed and cost** | Hours to days, with a fee. | Depends on the solicitor's responsiveness. | A few seconds per check: one web lookup, with no fee to the standard. |
| **What it needs** | A conveyancer with registry access. | A responsive solicitor. | The registry to publish hashes, and Live Verify-aware software on the checker's device. No land registry does this yet. |
| **Best suited to** | The formal pre-completion check, with priority. | Disclosure within the transaction. | An early, quick snapshot of charges, before the formal search. |

**Where each fits:** The official search remains essential before completion, because it gives the buyer a priority period that nothing else does. Earlier in a transaction, a buyer, lender or solicitor may simply want to know what charges stand against the property. Live Verify lets them check a registry-issued status in seconds, so problems surface early, without replacing the formal search.

## Further Derivations

None currently identified.

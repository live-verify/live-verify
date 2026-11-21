---
title: "Tenancy Deposit Protection Status"
category: "Real Estate & Property"
volume: "Large"
retention: "Tenancy lifetime"
slug: "tenancy-deposit-protection-status"
verificationMode: "clip"
tags: ["tenancy-deposit", "deposit-protection", "DPS", "MyDeposits", "TDS", "landlord", "tenant", "renting", "UK-housing"]
furtherDerivations: 2
---

## The Problem

UK law requires landlords to protect tenancy deposits in one of three government-backed schemes: the Deposit Protection Service (DPS), MyDeposits, or the Tenancy Deposit Scheme (TDS). Within 30 days of receiving a deposit, the landlord must place it in a scheme and provide the tenant with prescribed information about where it is held.

The trouble is that tenants have no fast way to confirm this actually happened. Each scheme has its own lookup tool, and a tenant would need to search all three to confirm protection — or to confirm that their deposit is unprotected. Many landlords fail to protect deposits at all. Under the Housing Act 2004, tenants whose deposits are not protected can claim compensation of one to three times the deposit amount, and landlords cannot serve a Section 21 "no fault" eviction notice until the deposit is properly protected. But tenants can only exercise these rights if they know their deposit is unprotected.

**Why verification matters — for both sides:**

- **Tenants can claim 1-3x the deposit in compensation.** A £1,200 deposit that was never protected can result in a tribunal award of £1,200–£3,600, plus the return of the deposit itself. But the tenant must first prove the deposit was unprotected — which currently requires searching three separate scheme websites.
- **Compliant landlords benefit from proof.** A landlord who has protected the deposit within 30 days and served the prescribed information has met their legal obligation. A verifiable claim from the scheme's domain proves this — protecting the landlord from spurious claims that the deposit was never protected, and preserving their ability to serve a Section 21 notice.
- **The prescribed information requirement is often missed.** Protecting the deposit is only half the obligation. The landlord must also serve the tenant with prescribed information about the scheme within 30 days. A verifiable claim that includes the scheme details and protection date provides evidence of compliance with both requirements.

**Scope limitation:** A single-scheme verifiable claim can only say "protected here" or "not found here." It does not answer the broader question "is my deposit protected anywhere?" — that would require either a cross-scheme aggregator that queries all three schemes and issues a composite response, or the tenant checking each scheme individually. This page models the single-scheme artifact: deposit status at DPS, MyDeposits, or TDS. A "NOT FOUND" result from one scheme means the deposit is not held at that scheme — the tenant would need to check the other two before concluding it is unprotected.

## Deposit Status — Protected

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="deposit-protected"></span>TENANCY DEPOSIT STATUS
Scheme:        Deposit Protection Service (DPS)
Deposit Ref:   DPS-2026-882199
Amount:        GBP 1,200.00
Property:      Flat 8, 29 North Street, Bristol
Status:        PROTECTED
Protected On:  15 Jan 2026
<span data-verify-line="deposit-protected">verify:depositprotection.com/status/v</span> <span verifiable-text="end" data-for="deposit-protected"></span></pre>
</div>

## Deposit Status — Not Found

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="deposit-notfound"></span>TENANCY DEPOSIT STATUS
Status:        NOT FOUND IN THIS SCHEME
Result:        This deposit reference does not exist at DPS.
               Try MyDeposits or TDS.
<span data-verify-line="deposit-notfound">verify:depositprotection.com/status/v</span> <span verifiable-text="end" data-for="deposit-notfound"></span></pre>
</div>

## What Is Checked

Scheme name, deposit reference number, deposit amount, property address, protection status, and date of protection. For a "not found" result, only the negative status and the scheme searched are confirmed.

## What the Checker Sees

Shows the scheme domain (`depositprotection.com`, `mydeposits.co.uk`, `tenancydepositscheme.com`) and confirms whether the deposit protection claim is current.

**Status Indications:**
- **PROTECTED** — The deposit is held in a government-backed scheme.
- **NOT FOUND IN THIS SCHEME** — The deposit reference does not exist at the scheme searched. The tenant should check the other two schemes before concluding the deposit is unprotected.

## Who Holds It

The Tenant uses this to confirm their deposit is protected. After moving into a new rental, the tenant clips the "PROTECTED" status from their scheme's portal and keeps it as verified evidence. If a dispute arises later about whether the deposit was ever protected, the tenant has a timestamped, hash-verified record rather than relying on memory or email threads.

## Who Checks It

**Citizens Advice Advisors**
When a tenant seeks help with a deposit dispute, the advisor needs to establish whether the deposit was protected and when. A verified status confirmation provides an immediate factual basis for advising the tenant on their legal options under the Housing Act 2004.

**Solicitors in Deposit Disputes**
A solicitor pursuing a deposit protection penalty claim needs evidence that the deposit was not protected (or was protected late). A verified "NOT FOUND" result from all three schemes, each with a timestamp, establishes the factual basis for a compensation claim of one to three times the deposit amount.

**Council Housing Enforcement**
Local authority enforcement officers investigating rogue landlords can use verified deposit protection statuses across multiple properties to identify systematic non-compliance, supporting enforcement action without needing to contact each scheme individually.

**Letting Agents**
When taking over management of an existing tenancy, a letting agent needs to confirm the deposit is already protected before assuming responsibility. A verified status removes reliance on the previous agent's or landlord's word.

## How Verification Works Here

**The "Trust Me, It's Protected" Problem**

- **Fabricated Protection:** A landlord tells the tenant the deposit is protected and provides a plausible-looking reference number, but never actually registered it with any scheme. The tenant has no reason to doubt this until they try to get their deposit back.
- **Lapsed Protection:** The deposit was protected at the start of the tenancy but the landlord allowed it to lapse (for example, by failing to re-protect after a tenancy renewal). The tenant believes they are still covered.
- **Wrong Scheme Cited:** The landlord names one scheme but actually used another — or none. The tenant searches the wrong scheme, finds nothing, and is unsure whether this means unprotected or simply misfiled.

**Issuer Types** (First Party)

**Government-Backed Custodial Scheme:** Deposit Protection Service (DPS) — holds the deposit directly.
**Government-Backed Insurance Schemes:** MyDeposits, Tenancy Deposit Scheme (TDS) — the landlord or agent holds the deposit, insured by the scheme.

**Privacy Salt:** Required. Deposit references combined with property addresses constitute personal data. The hash must be salted to prevent an adversary from enumerating deposit statuses for known addresses.

## Authority Chain

**Pattern:** Regulated

The Deposit Protection Service, a government-backed tenancy deposit scheme, is authorized by DLUHC to issue verified deposit protection confirmations.

```
✓ depositprotection.com/status/verify — Issues verified deposit protection status
  ✓ gov.uk/dluhc — Department for Levelling Up, Housing and Communities
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Where Each Fits: Live Verify and Scheme Website Lookups

In England and Wales, deposits must be protected in one of three government-backed schemes (DPS, MyDeposits and TDS), each of which runs its own online lookup; Scotland and Northern Ireland have their own schemes, and many countries have no such requirement. The scheme lookups are the authoritative check and a tenant can use them today. A verifiable status record answers a narrower question, whether a scheme stood behind this protection status at a given time, in a form the tenant can keep and show to an adviser, solicitor or council later. The two work side by side.

| | Scheme website lookup | Live Verify on the scheme's status record | Landlord's word |
| :--- | :--- | :--- | :--- |
| **Who can check** | Anyone with the details the lookup asks for. | Anyone handed the status record: the tenant, a Citizens Advice adviser, a solicitor, a council officer, a new letting agent. | Nobody; it can only be taken on trust. |
| **What the checker gets** | The scheme's live answer at that moment, on screen; a screenshot of it proves little later. | Confirmation that the scheme stands behind this exact status (protected, or not found in this scheme), as at its date. Each scheme answers only for itself. | A reference number that may not exist. |
| **What the tenant shares** | Nothing; they search for themselves. | Only the status record they chose to hand over. | Nothing. |
| **Reach** | One scheme per search; the tenant may need to try all three. | Global in principle: any deposit scheme, in any country, that publishes hashes on its own domain; still one scheme per record. | Anywhere, but untrusted. |
| **Speed and cost** | Free; a few minutes, longer if several schemes must be searched. | A few seconds per check: one web lookup, with no fee to the standard. | Immediate. |
| **What it needs** | The tenant's deposit details. | The scheme to publish hashes, and Live Verify-aware software on the checker's device. No deposit scheme does this yet. | Nothing. |
| **Best suited to** | The tenant checking their own deposit now. | Evidence kept for later: disputes, advice, enforcement and handovers between agents. | Nothing where the deposit matters. |

**Where each fits:** the schemes' own lookups remain the right first check, and a tenant should use them. What they do not give is a record that someone else can rely on later. A verifiable status from the scheme's domain gives advisers, solicitors and enforcement officers a quick, cheap way to confirm what the scheme said and when, wherever they have software that honours Live Verify; it does not by itself answer whether a deposit is protected in some other scheme.

## Further Derivations

None currently identified.

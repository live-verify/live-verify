---
title: "Pre-Authorizations & Holds"
category: "Banking & Payments"
volume: "Very Large"
retention: "Authorization window + transaction record (varies; 7 years typical)"
slug: "pre-authorizations-and-holds"
verificationMode: "clip"
tags: ["approval", "pre-authorization", "prior-authorization", "payment-hold", "single-use", "vcrs", "expiry", "rma-approval", "medical-pre-auth", "approval-fraud"]
furtherDerivations: 1
---

## What is a Pre-Authorization or Hold?

Most approvals are open-ended: once granted, they stand until rescinded. A **pre-authorization** is different — it is *conditional, time-boxed, and often single-use*. It says: *this is approved in advance, up to this limit, for this purpose, until this moment.* A health insurer pre-authorizes a procedure. A card network places a pre-auth hold for a hotel or fuel purchase. A retailer approves a return (RMA) before goods are sent back. A lender pre-approves a borrower up to a ceiling. A travel authorization clears entry for a window.

This is the **"other dynamic"** of approvals — the one whose defining features are *expiry* and *consumption*. A pre-authorization is meant to be used once (or within a window) and then to stop being valid. That makes it a natural fit for Live Verify's re-salting mechanisms: [burn-on-verify](../../docs/Technical_Concepts.md#burn-on-verify) (the salt is consumed the moment it's verified) for single-use approvals that should not be replayable, and [owner-issued expiring links](../../docs/Technical_Concepts.md#owner-issued-expiring-links) for holder-controlled, time-limited validity.

The fraud surface is precisely the time-and-use dimension: a pre-authorization that was already used, has expired, or never existed, presented as live to obtain treatment, goods, money, or a refund.

<div style="max-width: 600px; margin: 24px auto; font-family: 'Segoe UI', Arial, sans-serif; border: 1px solid #6a1b4d; background: #fff; padding: 0;">
  <div style="background: #6a1b4d; color: #fff; padding: 15px;">
    <div style="font-weight: bold; font-size: 1.1em;"><span verifiable-text="start" data-for="preauth"></span>PRIOR AUTHORIZATION — APPROVED</div>
    <div style="font-size: 0.8em;">Meridian Health Plan — Utilization Management</div>
  </div>
  <div style="padding: 20px; font-size: 0.9em; line-height: 1.6; color: #222;">
    <p><strong>Authorization #:</strong> PA-2026-77310<br>
    <strong>Member:</strong> [name on file]<br>
    <strong>Service:</strong> MRI, lumbar spine (CPT 72148)<br>
    <strong>Provider:</strong> Springfield Imaging Center<br>
    <strong>Approved:</strong> March 18, 2026</p>
<div style="background: #f7eef3; padding: 15px; margin: 15px 0; border-left: 3px solid #6a1b4d;">
      <p style="margin: 0;"><strong>Approved by:</strong> Meridian UM, ref. clinical criteria MED-72</p>
      <p style="margin: 8px 0 0;"><strong>Valid:</strong> Mar 18 – Jun 16, 2026 (90 days)</p>
      <p style="margin: 5px 0 0;"><strong>Units:</strong> 1 study — single use</p>
    </div>
<p style="font-size: 0.85em; color: #666;">This authorization is not a guarantee of payment if eligibility lapses.</p>
<div data-verify-line="preauth" style="border-top: 1px dashed #999; margin-top: 15px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
      title="Demo only: illustrative verification line">
      <span data-verify-line="preauth">verify:meridianhealth.com/auth/v</span> <span verifiable-text="end" data-for="preauth"></span>
    </div>
  </div>
</div>

## The Approval Types

The conditional/time-boxed pattern recurs across sectors:

- **Medical / insurance prior authorization** — A health plan approves a procedure, drug, or referral in advance, for a window and a unit count. Providers and patients rely on it.
- **Payment pre-authorization hold** — A card network or bank reserves funds (hotel, car rental, fuel) that expire if not captured. Merchants and cardholders rely on it.
- **Return / RMA approval** — A retailer or manufacturer approves a specific return before goods ship back, valid for a window. Warehouses and carriers rely on it.
- **Lending pre-approval** — A lender pre-approves a borrower up to a ceiling, valid for a period subject to conditions. Sellers and brokers rely on it.
- **Travel / entry authorization** — An advance clearance valid for a window (the standing version is covered by [ESTA Travel Authorizations](view.html?doc=esta-travel-authorization); here the focus is the time-boxed, consume-on-use dynamic).

Each shares the structure: approved in advance, capped, time-limited, and frequently single-use.

## The Approval Fraud Problem

- **Replay** — A genuine, already-used authorization is presented again to obtain a second service, capture, or refund. **Burn-on-verify** defeats this: the link is consumed on first successful verification and re-salts, so a replayed copy fails.
- **Expired-as-live** — An authorization whose window has closed is presented as current. The endpoint returns EXPIRED rather than verifying.
- **Limit / scope inflation** — A pre-auth for one MRI or a £400 hold is edited to cover more units or a higher amount. Binding units and limits into the hash breaks the tampered copy.
- **Phantom authorization** — A fabricated "approved" letter or hold confirmation with no real record behind it.
- **Eligibility drift** — A real authorization where the underlying eligibility (insurance coverage, account funding) has since lapsed; the status reflects this.

## Data Verified

Issuer, authorization number, the approved service/purpose, the approved limit (amount and/or units), the validity window, single-use vs. multi-use, the provider/merchant it applies to, and the date approved. Personal data is minimized — the member/cardholder may appear as "on file" with a salt (see Privacy Salt).

## Privacy Salt

Pre-authorizations frequently concern sensitive matters (a named person's medical procedure, a cardholder's spending). Where the verifiable text would otherwise let an interceptor enumerate or reconstruct sensitive facts, the issuer salts the record and minimizes plaintext (e.g., "[name on file]"). For single-use authorizations, **burn-on-verify** additionally rotates the salt on each successful verification, so an intercepted link cannot be replayed or used to probe.

## Data Visible After Verification

Shows the issuer domain (e.g., `meridianhealth.com`) and the current status of the authorization.

**Verification Response Format:**

```json
{
  "status": "verified",
  "allowedDomains": ["springfieldimaging.com", "*.springfieldimaging.com"]
}
```

**Status Indications:**
- **Approved — valid** — Within the window, not yet consumed; safe to act on.
- **Pending capture / not yet used** — A hold is in place but not finalized.
- **Consumed / captured** — The single-use authorization has already been used; further use is invalid (burn-on-verify returns this on replay).
- **Expired** — The validity window has closed.
- **Revoked** — Withdrawn before use (eligibility lapse, fraud flag, cancellation).
- **404** — No such authorization exists (never issued, forged, or OCR error).

## Second-Party Use

The **holder** (patient, cardholder, borrower, returning customer) benefits.

**Proof at the point of service:** A patient arriving for a procedure can show the provider a verifiable, in-window authorization rather than a screenshot the front desk must phone to confirm. A pre-approved borrower can prove their ceiling to a seller on the spot.

**Holder-controlled exposure (owner-issued expiring links):** For high-value or sensitive pre-approvals, the holder can use a timed, holder-initiated link so the authorization is only verifiable when they choose, and only for a short window — preventing standing exposure of a sensitive approval.

## Third-Party Use

**Providers and Merchants**

**Service / capture decision:** A provider verifies the prior authorization is genuine, in-window, and not already consumed before delivering a service that may not otherwise be paid for. A merchant confirms a hold before releasing goods.

**Warehouses and Carriers**

**Return intake:** A warehouse confirms an RMA approval is valid and unconsumed before accepting returned goods — blunting "return without authorization" and double-return fraud.

**Payment Operations and Claims**

**Replay defence:** Finance and claims teams reject already-consumed or expired authorizations automatically, because the verification status — not a human reading a date — is authoritative.

**Sellers and Brokers**

**Pre-approval reliance:** A seller accepting an offer "subject to pre-approval" verifies the lender's pre-approval is real, current, and within its ceiling.

## Verification Architecture

**The Problem:**
- Pre-authorizations are meant to expire and to be used once, but a static PDF or screenshot does neither
- Already-used or expired authorizations are replayed to obtain duplicate services, captures, or refunds
- Limits and units are edited to inflate what was approved
- Sensitive pre-auths (medical, financial) risk exposure if left as standing, enumerable links

**The Fix:** The issuer publishes a verifiable authorization record at its domain with an explicit window and single-use flag. **Burn-on-verify** consumes and re-salts single-use authorizations on first verification; **owner-issued expiring links** give holders timed, on-demand validity for sensitive cases. The relying party's decision is driven by the live status, not by reading a printed date.

**The reliance flow:**
1. The issuer approves a request in advance, with a limit and window
2. It publishes a verifiable authorization record (hash), single-use or time-boxed
3. The provider/merchant clips the authorization at the point of service
4. Verification returns valid / consumed / expired — and consumes the link if single-use
5. A replayed or expired authorization fails; the relying party declines or escalates

## Authority Chain

**Pattern:** Commercial / Regulated (sector-dependent)

The issuer is the approving party — an insurer, card network, lender, or retailer — operating under its sector's rules.

```
✓ meridianhealth.com/auth/v — Prior authorization records
  ✓ meridianhealth.com — Health plan (issuer)
```

For payment holds the chain runs through the issuing bank and card network; for lending pre-approvals, through the regulated lender.

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## See Also

- [High-Value In-Person Authorization](view.html?doc=high-value-in-person-authorization) — single-use, intent-proof authorization for in-person high-value payments
- [Patient Consent Forms & HIPAA Authorizations](view.html?doc=patient-consent-hipaa) — the consent sibling in healthcare
- [Corporate Internal Approvals](view.html?doc=corporate-internal-approvals), [Professional Approvals & Sign-Offs](view.html?doc=professional-approvals), [Civil & Administrative Approvals](view.html?doc=civil-administrative-approvals) — the other approval dynamics
- [Refund Confirmations](view.html?doc=refund-confirmations) — adjacent transactional confirmation

## Jurisdictional Witnessing (Optional)

Some jurisdictions, contracts, or multi-party workflows may add an independent witness layer. When used, the witnessing firm:

- Receives all hashes from the issuer, and any subsequent changes to the payload as they happen—which may manifest as a new hash, a status change, or even a 404 (record deleted)
- Receives structured content/metadata (key identifiers and dates)
- Does **NOT** receive plaintext or sensitive personal information
- Provides an immutable, timestamped audit trail—available to the jurisdiction on demand, to document holders/third parties during disputes, or as expert witness testimony in legal proceedings

This provides:
- **Non-repudiation:** The issuer cannot deny issuing the authorization
- **Timestamp proof:** The authorization existed at a specific time, with its window
- **Regulatory audit:** Regulators can inspect the witness ledger for replay/expiry integrity
- **Resilience:** Verification works even if the issuer's systems go down

**Public Blockchain (Non-Party)**

If a witness layer exists, it may periodically commit rollups to a public blockchain as an additional timestamping mechanism. That is optional, not inherent to the use case. The verification paths would then be:

1. **Issuer domain** — Direct check against the issuer
2. **Witnessing firm** — Independent confirmation with timestamp
3. **Public blockchain** — Decentralized trust anchor via rollup inclusion

## Further Derivations

1. **Single-use medical prior authorizations (burn-on-verify)** — Procedure/drug authorizations consumed on first verification at the point of service, so they cannot be replayed for a second claim.
2. **Payment pre-auth hold confirmations** — Time-boxed hold records that merchants verify before capture and that expire automatically with the hold.
3. **RMA / return-authorization verification** — Single-use return approvals that warehouses verify on intake, defeating unauthorized and double returns.

---
title: "Credit Card Chargeback Status"
category: "Banking & Payments"
volume: "Medium"
retention: "6 years (dispute records)"
slug: "credit-card-chargeback-status"
verificationMode: "clip"
tags: ["chargeback", "credit-card", "card-issuer", "dispute-status", "refund", "consumer-protection", "small-claims"]
furtherDerivations: 2
---

## The Problem

When a cardholder disputes a credit card charge, the card issuer investigates and eventually reaches a decision: upheld (refund issued), rejected, or still in progress. The cardholder receives a letter or email with the outcome.

That letter is unverifiable. A consumer taking a merchant to small claims court cannot prove the chargeback was upheld without the court contacting the issuer directly. A solicitor acting on behalf of the consumer has no fast way to confirm the status. Equally, a merchant disputing the chargeback outcome has no way to verify whether the consumer's claimed status is genuine — they must request confirmation from the card network or issuer, a process that takes days or weeks.

This is a canary-class fact. A single status field — "upheld", "rejected", or "in progress" — determines whether a refund has been issued, whether further dispute is warranted, and whether the matter is settled. The card issuer already holds this status; it just lacks a verifiable channel to share it.

This page stays narrow: chargeback status only. Not the underlying transaction details, not the full dispute evidence pack, and not the merchant's representment documentation. For the merchant's side of chargebacks, see [Chargeback Documentation and Dispute Records](view.html?doc=chargeback-documentation).

## Chargeback Status — Upheld

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="cb-upheld"></span>CHARGEBACK STATUS
Card Issuer:   Barclaycard
Reference:     CB-2026-441882
Amount:        GBP 342.00
Merchant:      ScamElectronics.com
Reason:        Goods not received
Status:        UPHELD — REFUND ISSUED
Resolved:      15 Mar 2026
<span data-verify-line="cb-upheld">verify:barclaycard.co.uk/chargebacks/v</span> <span verifiable-text="end" data-for="cb-upheld"></span></pre>
</div>

## Chargeback Status — Rejected

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="cb-rejected"></span>CHARGEBACK STATUS
Card Issuer:   Barclaycard
Reference:     CB-2026-448901
Amount:        GBP 189.50
Merchant:      MegaFurnish Ltd
Reason:        Not as described
Status:        REJECTED — MERCHANT EVIDENCE ACCEPTED
Resolved:      18 Mar 2026
<span data-verify-line="cb-rejected">verify:barclaycard.co.uk/chargebacks/v</span> <span verifiable-text="end" data-for="cb-rejected"></span></pre>
</div>

## Data Verified

Card issuer name, chargeback reference number, disputed amount and currency, merchant name, dispute reason category, status (upheld/rejected/in progress), and resolution date. The cardholder's name, full card number, and underlying transaction details are deliberately excluded.

## Data Visible After Verification

Shows the issuer domain (`barclaycard.co.uk`, `americanexpress.com`, `chase.com`) and confirms whether the chargeback status claim is current.

**Status Indications:**
- **UPHELD — REFUND ISSUED** — The issuer found in the cardholder's favour and has credited the account.
- **REJECTED — MERCHANT EVIDENCE ACCEPTED** — The issuer found the merchant's representment convincing; the charge stands.
- **IN PROGRESS** — The dispute is still under investigation.

## Second-Party Use

The **Cardholder** uses this to prove a chargeback outcome. In a small claims hearing against a merchant who failed to deliver goods, the consumer clips the "UPHELD — REFUND ISSUED" status and presents it to the court. The court verifies the hash against the issuer's domain, confirming the chargeback was genuinely upheld without needing to contact the issuer directly.

A cardholder whose chargeback was rejected can equally share the verified status with a solicitor, who can then advise on whether to escalate to the Financial Ombudsman Service or pursue other remedies.

## Third-Party Use

**Merchants Disputing Chargeback Outcomes**
A merchant who believes a chargeback was wrongly upheld may request evidence from the consumer. A verified status artifact confirms the issuer's actual decision, preventing a consumer from misrepresenting the outcome during negotiation.

**Solicitors and Legal Representatives**
When preparing a small claims case or consumer complaint, a solicitor needs to confirm the chargeback status without relying on a screenshot of an email. The verified artifact is independently confirmable.

**Trading Standards Officers**
When investigating a pattern of complaints against a merchant, trading standards can accept verified chargeback status artifacts from multiple consumers as evidence that chargebacks were upheld, without contacting each card issuer individually.

## Verification Architecture

**The Unverifiable Outcome Problem**

- **Fabricated Status:** A consumer claims their chargeback was upheld to pressure a merchant into a refund, when in fact the chargeback was rejected.
- **Status Misrepresentation in Court:** A party presents a screenshot of an email or letter showing a chargeback outcome. Screenshots and photocopies are trivially editable.
- **Stale Status:** A chargeback initially marked "in progress" may have been resolved weeks ago. Without a current verified status, outdated claims persist.

**Issuer Types** (First Party)

**UK Issuers:** Barclaycard, HSBC, Lloyds, NatWest, Nationwide.
**US Issuers:** Chase, Citi, Capital One, Bank of America, American Express.
**Card Networks (as Arbitrators):** Visa, Mastercard — in cases escalated to network arbitration.

**Privacy Salt:** Required. Chargeback reference numbers, amounts, and merchant names are sensitive. The hash must be salted to prevent enumeration attacks — an adversary should not be able to guess-and-check whether a known reference number corresponds to a particular outcome.

## Authority Chain

**Pattern:** Regulated

Barclaycard, a regulated card issuer, is authorized by the Financial Conduct Authority to issue verified chargeback status confirmations.

```
✓ barclaycard.co.uk/chargebacks/verify — Issues verified chargeback status
  ✓ fca.org.uk/payments — Regulates payment services in the UK
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Competition vs. Manual Verification

| Feature | Live Verify | Letter / Email from Issuer | Screenshot of Online Portal |
| :--- | :--- | :--- | :--- |
| **Speed** | **Seconds.** Hash check against issuer domain. | **Days.** Request and postal delivery. | **Instant.** |
| **Trust Anchor** | **Domain-Bound.** Tied to the card issuer. | **Reputation.** Trust the letterhead. | **Zero.** Trivially editable. |
| **Currency** | **Current.** Status as at the resolution date. | **Stale.** Reflects status at time of writing. | **None.** No timestamp guarantee. |
| **Integrity** | **Cryptographic.** Binds status to issuer domain. | **Paper.** Can be altered after receipt. | **Vulnerable.** Screenshot manipulation is trivial. |

## Further Derivations

None currently identified.

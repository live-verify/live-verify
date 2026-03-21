---
title: "Direct Debit Guarantee Confirmation"
category: "Banking & Payments"
volume: "Very Large"
retention: "Mandate lifetime"
slug: "direct-debit-guarantee-confirmation"
verificationMode: "clip"
tags: ["direct-debit", "guarantee", "bacs", "mandate", "consumer-protection", "recurring-payments", "uk-banking"]
furtherDerivations: 1
---

## The Problem

Every direct debit instruction set up through the Bacs scheme in the UK is covered by the Direct Debit Guarantee. The guarantee is a scheme-wide feature, not an instruction-specific status — if the instruction is a valid Bacs direct debit, the guarantee applies.

The interesting dispute question is not usually "is this protected?" (it almost always is), but rather: **should my refund claim under the guarantee be honoured for this specific collection?** The consumer says the amount was wrong, the date was wrong, or the collection happened after cancellation. The originator may dispute this. The bank adjudicates.

What the consumer lacks during this dispute is a verifiable record of the instruction's state: that it was active, what the originator's ID was, and — critically — whether and when it was cancelled. If the consumer cancelled the direct debit but the originator continued collecting, the consumer's verifiable instruction record is stronger evidence than a phone call to the bank.

## Direct Debit Guarantee Confirmation

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="dd-guarantee"></span>DIRECT DEBIT GUARANTEE
Bank:          Barclays
Sort Code:     20-44-18
Originator:    Northbridge Energy (ID: 441882)
Status:        PROTECTED BY DIRECT DEBIT GUARANTEE
Instruction:   ACTIVE
<span data-verify-line="dd-guarantee">verify:barclays.co.uk/dd-guarantee/v</span> <span verifiable-text="end" data-for="dd-guarantee"></span></pre>
</div>

## Data Verified

Bank name, sort code, originator name and ID, guarantee protection status, and instruction status (active, cancelled, or suspended).

## Data Visible After Verification

Shows the paying bank's domain (`barclays.co.uk`, `hsbc.co.uk`, `nationwide.co.uk`) and confirms the direct debit instruction is currently covered by the Direct Debit Guarantee.

**Status Indications:**
- **ACTIVE** — The instruction is active. Collections are expected.
- **CANCELLED** — The mandate has been cancelled. No further collections should occur. This is the strongest evidence in a wrongful-collection dispute.
- **CANCELLED BY BANK** — The bank cancelled the instruction (e.g., account closure, fraud investigation).
- **SUSPENDED** — The instruction is temporarily paused.

## Second-Party Use

The **Payer** uses this to confirm their direct debit is protected before or during a dispute. When an originator collects the wrong amount, the payer clips the guarantee confirmation and shares it with the originator as evidence that a refund is owed under the guarantee — not as a goodwill gesture, but as a scheme obligation.

## Third-Party Use

**Debt Advisers and Citizens Advice**
When helping a consumer who has been overcharged via direct debit, an adviser can verify that the instruction is covered by the guarantee and that the payer is entitled to an immediate refund from their bank, without needing to contact the bank directly.

**Small Business Accountants**
A business querying a supplier's direct debit collection can verify the mandate is active and protected, confirming the correct dispute route before escalating.

**Regulatory Complainants**
When raising a complaint with the Financial Ombudsman Service about a bank that refused a guarantee refund, a verified confirmation of the instruction's protected status is stronger evidence than a screenshot of the bank's generic guarantee wording.

## Verification Architecture

**The "Invisible Guarantee" Problem**

- **Refund Denial:** A bank adviser incorrectly tells the customer that the Direct Debit Guarantee does not apply to their payment. The customer has no independent confirmation to challenge this.
- **Originator Deflection:** The billing company claims the payment was authorized and refuses a refund, hoping the customer does not know about the guarantee or cannot prove it applies to their specific instruction.
- **Cancelled Mandate, Continued Collection:** An originator continues to collect after the consumer cancelled the mandate. Without a verified record showing the instruction status, the consumer's word is weighed against the originator's records.

**Issuer Types** (First Party)

**High Street Banks:** Barclays, HSBC, Lloyds, NatWest, Santander UK.
**Building Societies:** Nationwide, Yorkshire, Coventry.
**Digital Banks:** Monzo, Starling, Revolut (UK).
**Bacs Payment Schemes Limited** could also issue confirmations directly as the scheme operator.

**Privacy Salt:** Required. Sort codes and originator IDs in combination could reveal a consumer's banking relationships and supplier choices. The hash must be salted to prevent enumeration.

## Authority Chain

**Pattern:** Regulated

Barclays, a Bacs scheme participant regulated by the FCA, is authorized to issue verified Direct Debit Guarantee confirmations for mandates held on its accounts.

```
✓ barclays.co.uk/dd-guarantee/verify — Issues verified DD Guarantee confirmations
  ✓ fca.org.uk/firms — Regulates Barclays as an authorized firm
    ✓ gov.uk/government/organisations/financial-conduct-authority — UK financial regulator
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Competition vs. Manual Verification

| Feature | Live Verify | Phone the Bank | Screenshot of Guarantee Text |
| :--- | :--- | :--- | :--- |
| **Speed** | **Seconds.** Hash check against bank domain. | **Minutes to hours.** Call queue and hold. | **Instant.** |
| **Trust Anchor** | **Domain-Bound.** Tied to the paying bank. | **Verbal.** Trust the adviser's statement. | **Zero.** Generic text, not instruction-specific. |
| **Specificity** | **Per-Instruction.** Confirms this mandate is covered. | **Verbal.** Adviser confirms for one call. | **None.** Same wording for every direct debit. |
| **Integrity** | **Cryptographic.** Binds status to domain. | **Ephemeral.** No written record unless requested. | **Vulnerable.** Trivially fabricated. |

## Further Derivations

None currently identified.

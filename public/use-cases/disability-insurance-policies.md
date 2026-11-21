---
title: "Individual Disability Insurance Policies"
category: "Personal Lines Insurance"
volume: "Small"
retention: "Policy lifetime + 10 years"
slug: "disability-insurance-policies"
verificationMode: "clip"
tags: ["disability-insurance", "income-protection", "own-occupation", "financial-planning", "risk-management", "insurance-policy"]
furtherDerivations: 1
---

## What is Disability Insurance?

Your most valuable asset isn't your house; it's your ability to earn an income. If a surgeon breaks their hand, they lose millions in future earnings. Disability Insurance protects that future cash flow.

High-earners keep these Policy Schedules for 30+ years. They use them to prove their financial stability to lenders and business partners.

Fraud is high-stakes here: scammers often edit a cheap "Any Occupation" policy to look like a premium "Own Occupation" policy to look more credit-worthy. Verified hashes turn the policy folder into a live, trusted financial link that lasts a lifetime.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <span verifiable-text="start" data-for="dis-pol"></span>
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;">UNUM PROVIDENT
Individual Income Protection
═══════════════════════════════════════════════════════════════════

                        POLICY SCHEDULE

Policy #: DI-998877-26

Insured:          DR. STEPHEN STRANGE
Occupation Class: 6M (Neurosurgeon - Own Occupation)

BENEFIT SUMMARY
───────────────────────────────────────────────────────────────────
Benefit Description                                         Amount
───────────────────────────────────────────────────────────────────
Monthly Income Benefit                                 $ 15,000.00
Elimination Period                                         90 Days
Benefit Period                                          To Age 67

Effective Date: January 1, 2026
Premium: $ 450.00 / Monthly

OWN-OCCUPATION DEFINITION: Benefits are payable if you are unable
to perform the material and substantial duties of your specific
specialty.

</pre>
<span data-verify-line="dis-pol">verify:unum.com/v</span> <span verifiable-text="end" data-for="dis-pol"></span>
</div>

## The Problem: Phantom Policy Fraud

- **Benefit Inflation:** Editing a $2,000 policy to read $20,000 to trick a bank or an ex-spouse into believing the person has higher insured wealth.
- **Definition Tampering:** Changing "Any Occupation" (cheap) to "Own Occupation" (expensive) on the paper policy to look more credit-worthy.
- **Status Faking:** Showing an old "Active" policy paper for a policy that lapsed 3 years ago.

## What Is Checked

Insured name, specific occupation class, monthly benefit amount, elimination period (waiting time), benefit period (duration), COLA (Cost of Living Adjustment) riders, effective date, issuing carrier.

**Document Types:**
- **Policy Schedule (Declarations):** The 1-page executive summary.
- **Verification of Insurance (VOI):** 1-page proof for lenders or employers.
- **Rider Activation Notice:** Proving an increase in coverage was purchased.

## What the Checker Sees

Shows the issuer domain (`unum.com`, `northwesternmutual.com`, `guardianlife.com`) and policy status.

**Status Indications:**
- **Active** — Premium paid; coverage in force.
- **Lapsed** — Coverage terminated due to non-payment.
- **Reduced** — Benefit amount lowered (e.g., due to salary change).
- **In-Claim** — Policyholder is currently receiving benefits.

## Who Holds It

The Policyholder (Professional) (second party) receives the policy from the insurer (first party), keeps it, and may later hand it to third parties for various reasons, or never do so.

**Personal Record:** They have their own verified copy of the income protection policy. Most of the time, the policy sits in their financial records—the verification value is latent, there *if needed*.

**Peace of Mind:** They can confirm at any time that the policy matches what the insurer's system recorded, including the critical "Own Occupation" definition, and hasn't been altered.

**Future Optionality:** If they become disabled or a dispute arises about benefits, they have cryptographic proof of the policy terms ready without needing to contact the insurer.

## Who Checks It

The policyholder (second party) may hand the verified document to various third parties:

**Mortgage Underwriters**
**Risk De-risking:** Lenders often ignore disability insurance because it's too hard to verify the "Fine Print" (e.g., Own-Occ vs. Any-Occ). Live Verify turns the policy schedule into a verified digital artifact that proves the quality of the insurance.

**Divorce / Legal Settlements**
**Asset Integrity:** Verifying the existence and value of disability policies during asset division to ensure future income potential is accurately accounted for.

**Business Partners**
**Buy-Sell Agreements:** Ensuring that a partner's "Disability Buy-Out" policy is verified active and sufficient to fund the purchase of their shares if they become incapacitated.

## Who Issues It

**Issuer Types (First Party)**

- Individual Carriers (Unum, Guardian, MassMutual, Ameritas)
- Specialist Brokers (providing VOI certificates)

**Privacy Salt:** Required. Disability insurance policies contain a mix of enumerable and unique values—round dollar benefit amounts ($5K, $10K, $15K per month), standard occupation classes, and publicly known professions. A competitor or adversary in divorce proceedings could feasibly enumerate combinations to reverse-engineer a professional's income protection strategy. More critically, salt prevents unauthorized parties from discovering someone's disability insurance status, which could be used for discrimination or targeting. Salt protects both financial privacy and personal medical information.

## Authority Chain

**Pattern:** Regulated

Unum underwrites disability income insurance policies for UK individuals and employers.

```
✓ disability.unum.co.uk/verify — Underwrites disability income insurance policies
  ✓ fca.org.uk/register — Regulates UK life insurance and pensions firms
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Where Each Fits: Live Verify and Broker Confirmation

Today a lender, lawyer or business partner who wants to confirm an individual disability policy usually asks the policyholder's broker or the insurer to confirm it, by phone or letter. The broker and Live Verify answer different questions and work side by side: the broker can explain the policy and advise on it, while Live Verify confirms that the policy schedule in hand is exactly what the carrier issued.

| | Asking the broker | Live Verify on the policy schedule | Unverified PDF |
| :--- | :--- | :--- | :--- |
| **Who can check** | Whoever the broker agrees to speak to, with the policyholder's consent. | Anyone handed the schedule: a mortgage underwriter, a divorce lawyer, a business partner. | Nobody; it can only be taken on trust. |
| **What the checker gets** | The broker's account of the cover, often brief, with the chance to ask questions. | Confirmation that the carrier issued this exact schedule, including the occupation definition and benefit terms, as at its date, and its current status as the carrier publishes it. | A schedule whose terms may have been edited. |
| **What the policyholder shares** | Consent for the broker to discuss their policy. | Only the schedule they chose to hand over. | Only the schedule they chose to hand over. |
| **Reach** | Wherever the broker is still involved; long-running policies can outlast several brokers. | Global in principle: any insurer, in any country, that publishes hashes on its own domain. | Anywhere, but untrusted. |
| **Speed and cost** | Often days, during office hours. | A few seconds per check: one web lookup, with no fee to the standard. | Free and immediate. |
| **What it needs** | A broker who still holds the account. | The carrier to publish hashes, and Live Verify-aware software on the checker's device. No carrier does this yet. | Nothing. |
| **Best suited to** | Advice, explanation of terms, and questions the document does not answer. | Confirming that the carrier stands behind this policy page. | Nothing where a loan or settlement depends on it. |

**Where each fits:** a call to the broker remains the way to get advice, an explanation of terms, or an answer about something the document does not cover. It is slower, tied to office hours and depends on the broker still holding the account. Live Verify handles the narrower task of confirming that the carrier stands behind this policy page, which is useful to a lender or lawyer with no line to the broker, and to a policyholder decades into a policy that has outlasted several brokers.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).

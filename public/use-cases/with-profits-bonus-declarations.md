---
title: "With-Profits Bonus Declarations"
category: "Investment & Fintech"
volume: "Medium"
retention: "Policy lifetime (25-40 years)"
slug: "with-profits-bonus-declarations"
verificationMode: "clip"
tags: ["with-profits", "reversionary-bonus", "terminal-bonus", "life-assurance", "endowment", "pension", "fund-value", "bonus-declaration", "uk-insurance"]
furtherDerivations: 1
---

## The Problem

With-profits policies are among the most opaque financial products still in force. The insurer declares a headline reversionary bonus rate each year, but the amount actually applied to an individual policy varies by series, start date, and underlying fund. The policyholder receives an annual bonus notice — typically on paper — stating what was added and the new guaranteed value.

There is no practical way for the policyholder to independently confirm that the declared bonus was correctly applied to their specific policy. Bonus notices are easy to misfile. Years later, when the policy matures or a claim is made, disputes arise over what was promised and what was delivered. The terminal bonus — often the largest single component of the final payout — is declared only at maturity or claim, with no prior verifiable commitment.

This opacity creates real problems. A policyholder approaching retirement cannot reliably confirm their guaranteed fund value. An IFA advising on surrender versus retention must rely on the insurer's own figures. A divorce settlement involving a with-profits endowment depends entirely on the insurer's stated valuation, with no independent anchor.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="wp-bonus"></span>WITH-PROFITS BONUS DECLARATION
Policy:             WP-441882-SR
Provider:           Prudential Assurance
Year:               2025
Reversionary Bonus: 1.25%
Value Added:        GBP 1,562.50
Total Guaranteed:   GBP 126,562.50
Terminal Bonus:     Not yet declared (payable at maturity/claim)
<span data-verify-line="wp-bonus">verify:prudential.co.uk/with-profits/v</span> <span verifiable-text="end" data-for="wp-bonus"></span></pre>
</div>

## What Is Checked

Policy number, provider name, declaration year, reversionary bonus rate, value added (GBP), total guaranteed fund value, terminal bonus status, policy series identifier.

**Document Types:**
- **Annual Bonus Declaration:** The yearly notice confirming the reversionary bonus applied.
- **Annual Policy Statement:** Broader summary including bonus history and projected maturity value.

Maturity statements (final payout with terminal bonus) are covered separately in [Endowment Maturity Statements](view.html?doc=endowment-maturity-statements). This page focuses on the rolling annual declarations and the guaranteed-value history that accumulates over the policy's life.

## What the Checker Sees

Shows the issuer domain (`prudential.co.uk`, `aviva.co.uk`, `standardlife.co.uk`) and the declaration status.

**Status Indications:**
- **Verified / In Force** — Bonus declaration matches the insurer's records for this policy.
- **MVR Applied** — A Market Value Reduction is currently in effect on this policy.
- **Matured** — Policy has reached maturity; see [Endowment Maturity Statements](view.html?doc=endowment-maturity-statements) for the maturity artifact.
- **Surrendered** — Policy was surrendered prior to maturity.

## Who Holds It

The Policyholder benefits from verification.

**Tracking Guaranteed Value:** Each year's bonus declaration becomes a verifiable record. Over a 25-year policy, the policyholder accumulates a chain of verified bonus notices rather than a shoebox of paper letters. At maturity, they can demonstrate the full history of what was declared and when.

**Surrender Decisions:** When considering early exit, the policyholder can share verified bonus history with an IFA to get informed advice on whether the accumulated guaranteed value justifies holding to maturity or surrendering now.

## Who Checks It

**Independent Financial Advisers (IFAs)**
**Surrender vs. Retention Analysis:** An IFA advising a client on whether to surrender a with-profits endowment can verify the actual guaranteed fund value rather than relying on the client's recollection or a photocopy of their last bonus notice.

**Divorce and Settlement Attorneys**
**Policy Valuation:** With-profits endowments are common marital assets. During financial proceedings, a verified bonus declaration provides a reliable anchor for the guaranteed value of the policy, reducing scope for dispute over what the policy is actually worth.

**Financial Ombudsman Service (FOS)**
**Complaint Resolution:** When a policyholder complains that their bonus was reduced or that the terminal bonus fell short of projections, verified historical declarations provide a factual record of what was actually communicated each year.

## How Verification Works Here

**The "Opaque Fund" Problem**

- **Bonus Misrepresentation:** A policyholder inflating their guaranteed value when using the policy as collateral or during financial disclosure.
- **Historical Dispute:** Years after the fact, disagreements over what bonus rate was applied in a given year, with the original paper notice lost.
- **Terminal Bonus Expectation:** Policyholders claiming they were promised a specific terminal bonus based on projections, with no verifiable record of what was actually declared.

**Issuer Types** (First Party)

**Life Assurance Companies:** (Prudential, Aviva, Standard Life, Royal London).
**Mutual Insurers:** (Where the with-profits fund is owned by policyholders collectively).
**Friendly Societies.**

**Privacy Salt:** Required. With-profits policy values reveal long-term savings and wealth accumulation. The hash must be salted to prevent inference of individual fund values from bonus rate announcements.

## Authority Chain

**Pattern:** Regulated

Prudential Assurance, a regulated life assurance provider, is authorized by the PRA and regulated by the FCA to issue with-profits policies and bonus declarations.

```
✓ prudential.co.uk/with-profits/v — Issues verified with-profits bonus declarations
  ✓ fca.org.uk/register — Regulates UK life assurance and with-profits funds
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Where Each Fits: Live Verify, Insurer Portals and Paper Bonus Notices

Insurers send each with-profits policyholder an annual bonus notice or statement, and many also offer an online portal where current values can be seen; a policyholder can also ask the insurer for a statement of their bonus history. The insurer's own records are the authority, and the policyholder or their adviser can ask for them. A verifiable bonus declaration answers a narrower question for whoever is handed a notice years later, whether the insurer stands behind this exact declaration for this policy and year, and works alongside the insurer's statements.

| | Insurer online portal | Live Verify on the bonus declaration | Paper bonus notice |
| :--- | :--- | :--- | :--- |
| **Who can check** | The policyholder, with their login. | Anyone handed the declaration: an adviser, a solicitor, the Financial Ombudsman Service. | Anyone handed it, with no way to confirm it. |
| **What the checker gets** | The insurer's current view of the policy; how far back the history goes varies. | Confirmation that the insurer stands behind this exact declaration, including the bonus rate, value added and total guaranteed value, as at its date, and the policy's current status (in force, MVR applied, matured, surrendered). It confirms what the insurer declared, not that the bonus was calculated correctly. | A letter anyone could reproduce or alter. |
| **What the policyholder shares** | Nothing; third parties need the policyholder's login or a formal request to the insurer. | Only the declarations they chose to hand over. | The notice. |
| **Reach** | One insurer's policyholders. | Global in principle: any insurer, in any country, that publishes hashes on its own domain. | Universal, but untrusted. |
| **Speed and cost** | Quick for the policyholder; requests for older history can take weeks. | A few seconds per check: one web lookup, with no fee to the standard. | Free, but older notices are easily lost. |
| **What it needs** | An account with the insurer. | The insurer to publish hashes and keep them available for the life of the policy, and Live Verify-aware software on the checker's device. No insurer does this yet. | Nothing. |
| **Best suited to** | The policyholder checking their current position. | Building a year-by-year record that advisers, courts and the ombudsman can rely on. | Nothing where the value matters. |

**Where each fits:** the insurer's portal and statements remain the authority on a policy's current value, and a policyholder or adviser should still ask the insurer for a full history when it matters. Each year's notice is still what gets filed, lost and produced years later in a surrender decision, a divorce or a complaint. Live Verify lets whoever is handed one confirm quickly that the insurer stands behind it, wherever they have software that honours it.

## Further Derivations

None yet identified.

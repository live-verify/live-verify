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

## Data Verified

Policy number, provider name, declaration year, reversionary bonus rate, value added (GBP), total guaranteed fund value, terminal bonus status, policy series identifier.

**Document Types:**
- **Annual Bonus Declaration:** The yearly notice confirming the reversionary bonus applied.
- **Annual Policy Statement:** Broader summary including bonus history and projected maturity value.

Maturity statements (final payout with terminal bonus) are covered separately in [Endowment Maturity Statements](view.html?doc=endowment-maturity-statements). This page focuses on the rolling annual declarations and the guaranteed-value history that accumulates over the policy's life.

## Data Visible After Verification

Shows the issuer domain (`prudential.co.uk`, `aviva.co.uk`, `standardlife.co.uk`) and the declaration status.

**Status Indications:**
- **Verified / In Force** — Bonus declaration matches the insurer's records for this policy.
- **MVR Applied** — **ALERT:** A Market Value Reduction is currently in effect on this policy.
- **Matured** — Policy has reached maturity; see [Endowment Maturity Statements](view.html?doc=endowment-maturity-statements) for the maturity artifact.
- **Surrendered** — **ALERT:** Policy was surrendered prior to maturity.

## Second-Party Use

The **Policyholder** benefits from verification.

**Tracking Guaranteed Value:** Each year's bonus declaration becomes a verifiable record. Over a 25-year policy, the policyholder accumulates a chain of verified bonus notices rather than a shoebox of paper letters. At maturity, they can demonstrate the full history of what was declared and when.

**Surrender Decisions:** When considering early exit, the policyholder can share verified bonus history with an IFA to get informed advice on whether the accumulated guaranteed value justifies holding to maturity or surrendering now.

## Third-Party Use

**Independent Financial Advisers (IFAs)**
**Surrender vs. Retention Analysis:** An IFA advising a client on whether to surrender a with-profits endowment can verify the actual guaranteed fund value rather than relying on the client's recollection or a photocopy of their last bonus notice.

**Divorce and Settlement Attorneys**
**Policy Valuation:** With-profits endowments are common marital assets. During financial proceedings, a verified bonus declaration provides a reliable anchor for the guaranteed value of the policy, reducing scope for dispute over what the policy is actually worth.

**Financial Ombudsman Service (FOS)**
**Complaint Resolution:** When a policyholder complains that their bonus was reduced or that the terminal bonus fell short of projections, verified historical declarations provide a factual record of what was actually communicated each year.

## Verification Architecture

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

## Competition vs. Annual Bonus Notice (Paper)

| Feature | Live Verify | Paper Bonus Notice | Insurer Online Portal |
| :--- | :--- | :--- | :--- |
| **Durability** | **Archival.** Verified record persists for the policy lifetime. | **Fragile.** Paper lost, misfiled, or damaged over decades. | **Ephemeral.** Portal redesigns lose historical data. |
| **Trust Anchor** | **Domain-Bound.** Tied to the insurer's verified domain. | **Zero.** A letter anyone could reproduce. | **Session-Bound.** Screenshot proves nothing. |
| **Third-Party Sharing** | **Instant.** IFA or solicitor verifies in seconds. | **Slow.** Requires posting or scanning original documents. | **Restricted.** Requires login credentials or a Subject Access Request. |
| **Historical Record** | **Cumulative.** Every year's declaration independently verifiable. | **Scattered.** Depends on the policyholder's filing discipline. | **Incomplete.** Older years often unavailable. |

## Further Derivations

None yet identified.

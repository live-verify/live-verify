---
title: "Payment Behaviour Attestations"
category: "Business & Commerce"
volume: "Large"
retention: "Rolling (current + 3 years history)"
slug: "payment-behaviour-attestations"
verificationMode: "clip"
tags: ["payment", "net-30", "trade-credit", "b2b", "supplier", "attestation", "credit-risk", "peer-to-peer", "non-sovereign"]
furtherDerivations: 2
---

## What is a Payment Behaviour Attestation?

A business that pays its suppliers on time wants the world to know. Today, the only way to signal this is through credit agency scores — Dun & Bradstreet, Experian Business, Creditsafe — which are opaque, expensive to access, and based on data the business doesn't control. A D&B rating is a black box: you don't know what went in, you can't challenge what comes out, and you pay every time someone looks.

With Live Verify, payment behaviour becomes attestable by the people who actually experience it: the suppliers who send invoices and either get paid on time or don't.

Two complementary attestation types make this work:

### The Self-Attestation: Policy Commitment

The business stakes its own domain on a public commitment:

<div style="max-width: 600px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="policy1"></span>MERIDIAN COMPONENTS LTD
PAYMENT TERMS COMMITMENT
═══════════════════════════════════════════

Standard payment terms: Net-30
Policy effective: 01 JAN 2026
Companies House: 08471923

We commit to paying all supplier invoices
within 30 days of receipt unless a written
dispute is raised within 14 days of invoice.

Active suppliers may attest to our payment
behaviour at their discretion.

<span data-verify-line="policy1">verify:accounts.meridiancomponents.co.uk/v</span> <span verifiable-text="end" data-for="policy1"></span></pre>
</div>

This doesn't prove they actually pay in 30 days. It's a public, domain-bound commitment — a stake in the ground. If they routinely pay in 90 while their domain says 30, that's a verifiable lie published on their own infrastructure. The reputational cost of being caught is borne by the business, not by a credit agency.

### The Supplier Attestation: Corroboration

Suppliers who trade with the business confirm the reality:

<div style="max-width: 600px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="supplier1"></span>SUPPLIER PAYMENT ATTESTATION
═══════════════════════════════════════════

Attesting supplier: Precision Fasteners Ltd
Attesting about: Meridian Components Ltd

Trading relationship: Since March 2021
Invoices in past 12 months: 47
Average payment time: 27 days
Longest payment time: 34 days
Invoices paid within 30 days: 43 of 47 (91%)

This attestation covers the period
01 MAR 2025 to 28 FEB 2026.

<span data-verify-line="supplier1">verify:accounts.precisionfasteners.co.uk/v</span> <span verifiable-text="end" data-for="supplier1"></span></pre>
</div>

The supplier's domain stands behind these numbers. Precision Fasteners is saying, publicly and verifiably: "Meridian pays us on time." That attestation lives on Precision Fasteners' domain, not on Meridian's and not on a platform's.

### The Combination

Neither attestation is sufficient alone. Together they're powerful:

| Scenario | Credibility |
|---|---|
| Policy claim, zero supplier attestations | Words are cheap |
| Policy claim, 15 supplier attestations averaging 27 days | Credible — policy matches reality |
| No policy claim, 15 supplier attestations | They pay on time but haven't committed publicly |
| Policy claim says net-30, supplier attestations average 58 days | Verifiable lie — the discrepancy is visible |

A potential new supplier evaluating Meridian sees the self-attestation, checks the corroborating supplier attestations, and makes a credit decision based on verified data from the actual counterparties — not from a black-box credit score.

## Who Participates (And Who Doesn't)

This system works for the vast middle market. It does not work for everyone.

**Will participate — businesses that want to signal creditworthiness:**
- SMEs seeking new suppliers or better credit terms
- Growing companies whose credit agency score lags their actual behaviour
- Businesses in industries where supplier relationships are roughly equal in power (professional services, tech, manufacturing at similar scale)
- Any business whose payment behaviour is genuinely good and wants credit for it

**Will participate — suppliers happy to corroborate:**
- Suppliers in healthy, balanced trading relationships
- Suppliers whose client actively wants attestations (the client may even ask for them)
- Suppliers who benefit from the reciprocal: "You attest for us, we attest for you"

**Won't participate — and that's fine:**
- Large corporates with contractual restrictions on supplier disclosure (NDAs, data-sharing clauses)
- Businesses with poor payment behaviour who'd rather stay opaque
- Suppliers afraid of retaliation from powerful buyers

The system doesn't need universal coverage. It's a **positive signal.** Presence of attestations with sufficient breadth is credible proof of good behaviour. Absence of attestations is ambiguous — it might mean poor payment behaviour, or it might mean the business hasn't adopted the system yet, or its suppliers haven't. The ambiguity is honest: "we don't have data" is better than a fabricated score.

## What This Replaces

**Dun & Bradstreet PAYDEX scores** — a proprietary index from 1 to 100 based on payment data reported to D&B by participating suppliers. The score is opaque (you can't see the underlying data), lagging (updated monthly at best), and pay-to-access ($100+ per report). A verified attestation graph is transparent (you see each supplier's attestation), current (suppliers update when they choose), and the underlying data is free to verify.

**Trade references on paper.** Today, a new supplier asks for "three trade references" — names and phone numbers of existing suppliers. The new supplier calls, gets a vague "yeah, they pay okay," and that's the credit decision. Verified attestations with specific numbers (47 invoices, 91% within 30 days, longest was 34 days) are more useful than a phone call.

**Credit insurance underwriting data.** Trade credit insurers (Euler Hermes, Atradius, Coface) assess whether to insure a buyer's invoices based on limited data. Verified supplier attestations are a richer, more current signal — and the insurer can verify each one independently.

## Data Verified

Company name, Companies House number (or equivalent), stated payment terms, policy effective date. For supplier attestations: attesting supplier name, trading relationship duration, invoice count, payment timing statistics, attestation period.

## Verification Response

- **OK** — Attestation is current and the attesting party confirms it.
- **UPDATED** — A newer attestation period is available (e.g., the supplier has published Q1 2026 data replacing the Q4 2025 attestation).
- **WITHDRAWN** — The attesting supplier has withdrawn their attestation. This is itself a signal — a supplier who previously attested and then withdraws is saying something without saying it.
- **404** — Attestation not found.

## Second-Party Use

The **attested business** (subject) benefits:

**Better credit terms from new suppliers.** "Here are 15 verified attestations from our existing suppliers confirming we pay within 30 days" is more persuasive than "here are three phone numbers, call them."

**Faster supplier onboarding.** Credit checks delay new trading relationships by days or weeks. A portfolio of verified attestations provides an instant, verifiable credit signal.

**Lower cost than credit agencies.** A D&B credit monitoring subscription costs thousands per year. Publishing a self-attestation costs nothing beyond the domain and verification endpoint.

## Third-Party Use

**Potential new suppliers**
The primary beneficiary. Before extending credit to a new customer, check their attestation profile: self-declared terms, corroborating supplier attestations, the breadth and recency of attestations.

**Trade credit insurers**
Underwriting trade credit insurance requires payment behaviour data. Verified supplier attestations are a richer signal than the insurer's own claims history — they show the buyer's behaviour across their entire supply base, not just the insured invoices.

**Aggregators / "Net30Club" platforms**
A platform that indexes payment behaviour attestations from across the web, providing search and analytics. Multiple such platforms can coexist because the underlying attestations are public and independently verifiable. They compete on UX, analytics depth, and industry specialisation — not on data monopoly. See [decentralized-trust-graphs.md](../../docs/decentralized-trust-graphs.md).

**Procurement teams at larger companies**
Before selecting a new supplier, check the supplier's own payment attestations — are *they* paying *their* suppliers on time? A supplier who pays their sub-suppliers late is a supply chain risk.

## Verification Architecture

**No government chain needed.** This is a purely commercial attestation pattern. The trust comes from the attesting domains — recognisable businesses staking their reputations on specific payment behaviour claims.

```
✓ accounts.precisionfasteners.co.uk/verify — Supplier payment attestation
```

```
✓ accounts.meridiancomponents.co.uk/verify — Payment terms self-commitment
```

No regulator. No government root. The authority chain is one node deep. Trust comes from breadth (how many independent suppliers attest) and reputation (whether the attesting domains are recognisable businesses).

See [non-sovereign-verification-patterns.md](../../docs/non-sovereign-verification-patterns.md) for the broader pattern.

**Privacy Salt:** Low. Payment behaviour attestations contain no personal data — they're about business-to-business trading relationships. Aggregate statistics (invoice count, average payment time) don't disclose individual invoice amounts or dates.

## Authority Chain

**Pattern:** Commercial (bilateral)

Both parties are commercial entities attesting on their own domains. No regulator or government in the chain.

```
✓ accounts.meridiancomponents.co.uk/verify — Meridian Components payment terms commitment
```

```
✓ accounts.precisionfasteners.co.uk/verify — Precision Fasteners attesting Meridian's payment behaviour
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## The Selection Bias Problem

An honest assessment: this system sees the good cases. Suppliers who get stiffed rarely attest publicly — the power dynamics of the trading relationship discourage it. A small supplier who publicly attests that a major client pays 90 days late risks losing the client entirely.

This means the attestation graph has a positive selection bias. Businesses with attestations are credibly good payers. Businesses *without* attestations are unknown — they might be bad payers, or they might simply not have adopted the system.

**Mitigations:**

- **Withdrawal as a signal.** A supplier who previously attested and then withdraws (status changes to `WITHDRAWN`) is communicating without making a specific negative claim. The withdrawal is visible to anyone checking the profile.
- **Coverage ratio.** If a business claims 30 active suppliers but only 5 have attested, the gap is visible. Why are 25 suppliers silent?
- **UK statutory data.** Large UK companies must report payment practices under the Reporting on Payment Practices and Performance Regulations 2017. This self-reported data is public (via gov.uk) and can be cross-referenced with the attestation graph.
- **Reciprocal attestation.** "You attest for us, we attest for you" creates mutual accountability. A business that asks its suppliers for attestations implicitly invites scrutiny of its own behaviour.

The system is not a fraud detector. It's a **positive credibility signal** — and an honest one, because the limitations are transparent rather than hidden behind a proprietary score.

## Implementation Note: Data Feed vs Plain Text

The use cases elsewhere in this project are documents *shown to a person* — a credential scanned at a door, a receipt checked by a customer, a reference sent to a recruiter. Payment behaviour data is different. The specific numbers (invoice counts, payment timings, trading relationship details) are **commercially sensitive intelligence.** Published as plain text on the open web, they reveal supply chain structure, purchasing volume, and cash flow position to competitors.

This use case may be better implemented as a **permissioned data feed** — structured API access with explicit consent from both parties — rather than as a `verify:` line on a public webpage. The trust dynamics, the selection bias problem, and the aggregator model described above all still apply. But the implementation might be a commercial platform (the "Net30Club") with access controls, rather than SHA-256 hashes of plain-text postings.

The self-attestation (policy commitment) works fine as a public `verify:` posting — "we pay net-30" is a marketing statement, not sensitive data. It's the supplier corroboration that contains the commercially sensitive detail, and that's where a data-feed model may be more appropriate.

See [payment-behaviour-portals](../rejected-use-cases/payment-behaviour-portals.md) for the full analysis of why the aggregated portal ("Net30Club") is rejected as a Live Verify use case while the self-attestation layer is retained.

## Further Derivations

1. **Reciprocal attestation networks.** A cluster of businesses that all trade with each other and all attest to each other's payment behaviour. The network is self-reinforcing: each business has an incentive to pay on time because their attestation profile is publicly visible, and their suppliers are publicly visible too. A late-paying business in a reciprocal network is conspicuous — everyone else has attestations from their trading partners, and this one doesn't.

2. **Industry-specific payment benchmarks.** An aggregator collects payment behaviour attestations across an industry (construction, hospitality, manufacturing) and publishes anonymised benchmarks: "Average payment time in UK construction: 47 days. Top quartile: under 28 days." Individual businesses can see where they stand relative to their industry — and their attestation profile shows potential suppliers the same thing.

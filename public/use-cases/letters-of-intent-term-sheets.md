---
title: "Letters of Intent & Term Sheets"
category: "Financial & Legal Documents"
volume: "Medium"
retention: "Transaction completion + dispute window"
slug: "letters-of-intent-term-sheets"
verificationMode: "clip"
tags: ["loi", "term-sheet", "acquisition", "investment", "negotiation", "revision-chain", "cross-org", "m-and-a", "venture-capital"]
furtherDerivations: 0
---

## What is a Verifiable Term Sheet?

"We intend to acquire WidgetCo for $50M subject to due diligence." This claim travels by email between lawyers, boards, advisors, and investors. It's unsigned until the final contract — sometimes for weeks or months. During that period, terms shift: the price changes, conditions are added, exclusivity periods are extended. Each revision is a new email or PDF, and nobody has a reliable record of which version was current when.

A verifiable term sheet is a short summary of the current agreed terms with a `verify:` line. The proposing party's domain attests the exact text. When terms change, the old hash returns `SUPERSEDED` and a new claim is issued. The result is a verifiable revision chain — not just "what did we agree?" but "what did we agree *on March 15th*?"

<div style="max-width: 600px; margin: 24px auto; font-family: 'Courier New', monospace; background: #f9f9f9; padding: 15px; border: 1px solid #999; font-size: 0.9em; color: #000; line-height: 1.7;" verifiable-text-element="true">
LETTER OF INTENT — NON-BINDING<br>
Acquirer: Meridian Capital Partners<br>
Target: WidgetCo Inc.<br>
Transaction: 100% share acquisition<br>
Indicative price: $50,000,000<br>
Exclusivity: 45 days from 15 March 2026<br>
Conditions: Due diligence, board approval, regulatory clearance<br>
Detailed in: LOI document emailed 15 March 2026 / 10:30 am<br>
<span data-verify-line="loi" style="color: #667;">verify:meridiancapital.com/transactions</span>
</div>

### Counter / Revision

<div style="max-width: 600px; margin: 24px auto; font-family: 'Courier New', monospace; background: #fff9f0; padding: 15px; border: 1px solid #999; font-size: 0.9em; color: #000; line-height: 1.7;" verifiable-text-element="true">
COUNTER-PROPOSAL<br>
Re: Meridian Capital / WidgetCo acquisition<br>
Indicative price: $55,000,000<br>
Exclusivity: 30 days (reduced from 45)<br>
Additional condition: Key-person retention agreements<br>
WidgetCo Inc., Board of Directors<br>
18 March 2026<br>
<span data-verify-line="loi-counter" style="color: #667;">verify:widgetco.com/corporate</span>
</div>

Each revision is a new verifiable claim. The previous claim returns `SUPERSEDED`. The chain of hashes records the negotiation history — who proposed what, when, and whether the other side's domain attested agreement.

## "Detailed in" and Non-Divergence

Term sheets routinely reference fuller LOI documents with legal language, representations, and conditions. The `Detailed in:` line points to the full document. The attested summary governs on price, structure, exclusivity, and key conditions. Where the summary and the full LOI diverge, the recipient may choose which interpretation applies.

## Data Verified

Parties (acquirer/investor, target/company), transaction type, indicative price or valuation, key conditions, exclusivity period, elaboration reference, date.

## Verification Response

- **`{"status":"verified"}`** — This party currently stands behind these terms
- **SUPERSEDED** — Terms were revised; a newer version exists
- **WITHDRAWN** — LOI withdrawn before agreement
- **EXPIRED** — Exclusivity or validity period has passed
- **404** — Term sheet not found

## Second-Party Use

**Target company board:** Can verify that the acquirer's domain actually attests to the $50M price and 45-day exclusivity, before entering exclusive negotiations and turning away other potential buyers.

**Investors in the target:** Can verify the terms being presented to the board match what the acquirer actually proposed.

## Third-Party Use

**Legal advisors**
Both sides' lawyers can independently verify the current terms without relying on their client's copy.

**Regulators (antitrust review)**
Can verify the transaction terms that were attested at each stage of the review process.

**Lenders / Financing parties**
Can verify the acquisition terms that underpin the financing request.

## Verification Architecture

**The "Moving Target" Problem**

- **Selective versioning:** One party presents an older, more favorable version as current
- **Oral amendments:** "We agreed to change the price on the phone" — unverifiable
- **Advisor discrepancy:** Different advisors holding different versions of the terms
- **Exclusivity disputes:** "The exclusivity period started on the 12th, not the 15th"

**Why a revision chain helps:** Each version is independently verifiable with a timestamp. `SUPERSEDED` status on old hashes makes it clear which version is current. The chain is visible to both parties and their advisors.

## Authority Chain

**Pattern:** Commercial (self-certified on both sides)

```
✓ meridiancapital.com/transactions — Issues LOIs and term sheets for Meridian Capital Partners
✓ widgetco.com/corporate — Issues counter-proposals and acceptances for WidgetCo Inc.
```

No regulatory chain. Trust rests on each party's corporate domain.

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Jurisdictional Witnessing (Optional)

More relevant here than for most commercial cases. M&A transactions are high-value, multi-party, and frequently disputed. Independent timestamping of each party's attested terms provides non-repudiation that neither party's system alone can offer.

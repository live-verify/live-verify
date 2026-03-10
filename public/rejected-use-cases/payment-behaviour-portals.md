---
title: "Payment Behaviour Portals (Net30Club)"
status: "Rejected (as Live Verify use case)"
reason: "Commercially sensitive data unsuitable for plain-text publication; better served by permissioned data feed"
slug: "payment-behaviour-portals"
---

## Why This Was Considered

Businesses that pay suppliers on time want to signal creditworthiness. Suppliers could attest to payment behaviour on their own domains: "47 invoices, 91% paid within 30 days, average 27 days." A platform ("Net30Club") aggregates these attestations into a decentralized alternative to Dun & Bradstreet PAYDEX scores.

The idea has two layers:

1. **Self-attestation:** A business publishes "We pay net-30 by policy" with a `verify:` line on its own domain. A public commitment.
2. **Supplier corroboration:** Suppliers publish attestations with specific payment statistics — invoice counts, average payment times, longest delays.

## Why the Portal Was Rejected (As a Live Verify Use Case)

Live Verify publishes plain text with a SHA-256 hash. The text is readable by anyone who can see it — and scrapeable by anyone who can crawl the web.

**The supplier corroboration data is commercially sensitive.** "Meridian pays 47 invoices per year to Precision Fasteners, averaging 27 days" reveals:

- **Supply chain structure** — who supplies whom, which competitors can map
- **Purchasing volume** — invoice frequency implies spend level
- **Cash flow position** — payment timing reveals working capital health
- **Trading relationship strength** — duration and consistency are competitive intelligence

A competitor scraping these attestations builds a detailed picture of another company's supply chain, procurement patterns, and financial health — for free, without the target's knowledge or consent. This is exactly the intelligence that procurement consultants charge thousands to compile.

**Businesses would refuse to participate.** Not because they pay late, but because they don't want their supply chain details published on the open web. The sensitivity isn't about payment behaviour — it's about the metadata that payment attestations inevitably contain.

## What Stays In (As a Live Verify Use Case)

The **self-attestation layer** works fine as a `verify:` posting. "We pay net-30 by policy" is a marketing statement, not sensitive data. A business publishing this on its own domain with a `verify:` line is making a public commitment — equivalent to putting "We value our suppliers" on the About page, except cryptographically bound and verifiable.

This is captured in [payment-behaviour-attestations.md](../use-cases/payment-behaviour-attestations.md) with an implementation note distinguishing the two layers.

## What Should Exist Instead

The supplier corroboration layer belongs in a **permissioned data feed** — a commercial platform with:

- **Explicit consent** from both parties before any data is shared
- **Access controls** — only authorised parties (credit insurers, potential suppliers, the business itself) see the detailed attestation data
- **Aggregation without exposure** — the platform can report "15 suppliers attest to on-time payment" without revealing which 15 suppliers or their specific invoice data
- **API access, not public text** — structured data queried with authentication, not plain text on a webpage

This is a legitimate business — a "Net30Club" — but it's a data platform, not a document verification system. The trust dynamics described in the use case analysis (selection bias, the silence problem, the power asymmetry that suppresses negative attestations) all still apply. The business model is real. It's just not Live Verify's transport mechanism.

## Qualifying Criteria Assessment

From `public/use-cases/qualifying_criteria.md`:

- **§1 Claim must be human-readable text:** Supplier payment statistics *can* be rendered as text, but they're really structured data — invoice counts, averages, percentages. They're better served by an API than by OCR.

- **§3 Domain-bound authority:** Works perfectly for self-attestation ("we pay net-30" on the business's domain). Doesn't work for supplier corroboration because the supplier may not want the attestation public.

- **§5 Privacy model:** Live Verify's privacy model is "minimal disclosure" — but payment attestations in plain text disclose maximum commercial intelligence. The privacy model is inverted: publication is the risk, not the solution.

## The Split Decision

| Layer | Live Verify? | Why |
|---|---|---|
| Self-attestation: "We pay net-30 by policy" | Yes | Public commitment, not sensitive, domain-bound |
| Supplier corroboration: specific payment data | No | Commercially sensitive, needs permissioned access |
| Aggregated platform: "15 suppliers attest on-time" | No | Data platform business, not document verification |

The self-attestation survives as a legitimate use case. The rest is a good business idea that needs a different technical foundation.

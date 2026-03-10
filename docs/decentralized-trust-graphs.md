# Decentralized Trust Graphs

## The Pattern

Every centralized trust platform follows the same business model: collect attestations from many parties, lock them into a proprietary database, charge for access. The platform's value is not the attestations — it's the lock-in. The data can't leave. The network effect compounds. Competitors can't start because they have no data.

Live Verify breaks this model at the root. Attestations live on the attester's domain, verified by the attester's endpoint, chained to whatever authority the attester claims. No platform owns the data. Any aggregator can index it. The attestations are the web; the aggregators are search engines.

This document describes the centralized platforms that could become vulnerable — and applies an honest viability test to each one. Not every monopoly is displaceable. The question for each is: **would the attesting parties actually publish this data?**

See [decentralized-professional-graph.md](decentralized-professional-graph.md) for the LinkedIn-specific analysis.

## The Viability Test

An appealing decentralized alternative isn't enough. Each candidate must pass three tests:

1. **Would the attester publish?** Does the attesting party have an incentive to make this data public on their own domain? Or does publication expose commercially sensitive information, create legal risk, or invite retaliation?
2. **Is the data sensitive to the *subject*?** Even if the attester is willing, does the attestation reveal information the subject would rather control — supply chain details, financial health, personal circumstances?
3. **Is there a power asymmetry that suppresses honest attestation?** If a negative attestation could cost the attester a business relationship, the graph will have positive selection bias — only the good news gets published.

The Net30Club analysis (see [payment-behaviour-portals rejection](../public/rejected-use-cases/payment-behaviour-portals.md)) demonstrated this clearly: supplier payment data is commercially sensitive, power asymmetries suppress negative attestations, and the resulting graph shows only the happy cases. The same test must be applied to every candidate.

## Viable: Reviews — Trustpilot, Yelp, TripAdvisor, Google Reviews

**Viability: Strong.** Passes all three tests.

### The Monopoly

Trustpilot owns 250 million reviews. TripAdvisor owns over a billion. Google Reviews dominates local search. Yelp built a $2B company on restaurant reviews. All share the same structural flaw: **reviews are platform-owned, not reviewer-owned.**

A business can't move its Trustpilot reviews to Google. A reviewer can't prove they wrote a review on Yelp without linking to Yelp. TripAdvisor's "World's Largest Travel Platform" tagline is really "World's Largest Collection of Reviews You Can't Take Anywhere Else." The platform mediates every interaction and extracts rent at every step — businesses pay to respond, pay to advertise, pay to suppress.

Worse: **fake reviews are an industry.** You can buy 100 five-star Trustpilot reviews for under £500. TripAdvisor has acknowledged removing millions of fake reviews annually — but the incentives are misaligned. The platforms profit from volume, and every fake review is still a review that drives engagement.

### Why It's Viable

Reviews pass the viability test cleanly:

1. **Would the attester publish?** Yes. Reviewers *want* their reviews public — that's the entire point. A customer who writes a hotel review wants travellers to read it. There's no commercial sensitivity, no NDA, no reason to stay quiet.
2. **Is the data sensitive to the subject?** No. "The breakfast was mediocre" isn't commercially sensitive intelligence. It's a consumer opinion. The business may not *like* it, but there's no supply-chain-structure or cash-flow-position leaking from a hotel review.
3. **Power asymmetry?** Minimal. A hotel can't retaliate against a guest who left a bad review. There's no ongoing trading relationship to threaten. The reviewer is a one-time customer, not a dependent supplier.

This is the cleanest case for decentralization. The data wants to be public. The attesters want to publish. Nobody is suppressed.

### The Decentralized Alternative

A customer publishes a review on their own domain with a `verify:` line:

```
[REVIEW — THE GRAND HOTEL, BRIGHTON
═══════════════════════════════════════════

Stayed: 14-16 March 2026, Room 412
Booking ref: GH-2026-04418

Clean rooms, helpful staff, good location.
Breakfast buffet disappointing — limited hot
options, coffee was instant not brewed.

Overall: 7/10. Would stay again.

verify:reviews.janedoe.com/v]
```

**What this changes:**

- **Fake reviews become uneconomic at scale.** Each review is bound to a domain the reviewer controls. Buying 100 fake reviews means registering 100 domains, maintaining 100 verification endpoints, and building 100 credible domain histories. The cost/benefit ratio inverts. Today, a fake TripAdvisor review costs £5. A fake domain-verified review costs the ongoing maintenance of a credible web presence.
- **The reviewer owns the review.** It lives on their domain. No platform can remove it, bury it in search results, or hold it hostage.
- **The business can't suppress it.** They can respond (on their own domain), but they can't make the review disappear. TripAdvisor and Yelp have both faced accusations of suppressing negative reviews for paying advertisers. A domain-verified review is immune to this.
- **Reviews are portable.** A reviewer who publishes 50 restaurant reviews on their own domain has a portable reputation. Aggregators can see: "This person has 50 verified reviews across 3 years, with consistent and detailed feedback." That reviewer's opinion carries more weight than an anonymous Yelp account with two reviews.
- **Aggregators compete to index.** Multiple "Decentralized TripAdvisors" scrape verified reviews from across the web, rank them by domain reputation, and present them to travellers. Each aggregator uses different ranking algorithms. The reviews are the same; the curation differs.

**The trust signal shifts** from "this platform says 4.2 stars" to "these 47 independent domains each published a verified review, and 38 of them have other verified activity (professional credentials, other reviews, personal sites) suggesting they're real people."

### What Market Cap Erodes

Trustpilot (LSE: TRST) has a market cap of ~£1B. TripAdvisor (NASDAQ: TRIP) around $3B. These valuations represent the capitalised value of owning the review graph. If verified reviews live on reviewer domains and any aggregator can index them, these platforms become one aggregator among many — competing on UX and brand, not on data monopoly. The value migrates from the platform to the edges.

## Viable: Professional Identity — LinkedIn

**Viability: Strong.** See [decentralized-professional-graph.md](decentralized-professional-graph.md) for the full analysis.

The summary: employers *want* to attest (it's an HR function they already perform). Individuals *want* to publish credentials (it's career marketing). Peer endorsers have *skin in the game* (their domain is on the line). No attestation reveals commercially sensitive data. No power asymmetry suppresses honest attestation.

LinkedIn's $26B acquisition price (2016) was the capitalised value of lock-in. The tech community exits first, then professional services, then healthcare, then the trades.

## Viable with Limits: Charity Ratings — Charity Navigator, GuideStar

**Viability: Partial.** Three of four attester types pass the test. One has safeguarding concerns.

### The Monopoly

Charity Navigator rates US nonprofits. GuideStar (now Candid) collects their financial data. A charity's rating on these platforms significantly affects donations. The rating methodology is opaque, controlled by a single organisation, and based primarily on financial ratios (overhead percentage, CEO salary) rather than on impact.

### Why It's Partially Viable

| Attester Type | Would They Publish? | Sensitive? | Viable? |
|---|---|---|---|
| **Funders** (Wellcome, Gates Foundation) | Yes — they already publish grant recipients and outcomes | No — grant-making is public by design | Yes |
| **Auditors** (KPMG, BDO) | Yes — audit opinions are already public documents | No — the opinion is about the charity's finances, not the auditor's | Yes |
| **Donors** | Yes — "I gave and saw the impact" is positive social signalling | No — the donor chooses to disclose | Yes |
| **Beneficiaries** | Problematic — vulnerable people publicly linked to charities serving their needs | Yes — "I use the food bank" or "I received addiction counselling" | No |

The donor/funder/auditor layers work. The beneficiary layer raises safeguarding concerns — a verified attestation from `beneficiary.example.com` saying "This charity helped me with my housing crisis" publicly links a vulnerable person to their circumstances. This layer should not be published as open attestations.

### The Decentralized Alternative (Within Limits)

```
✓ grants.wellcometrust.org — "Funded £250K research programme, milestones met on schedule"
✓ audit.kpmg.co.uk — "Clean audit opinion, FY2025, no material findings"
✓ jane.dev — "Donated £1,000, received detailed impact report, 94% went to programmes"
```

Three perspectives, three domains, none controlled by a single rating agency. An aggregator assembles a charity profile from these attestations. Different aggregators weight them differently — one prioritises financial efficiency, another donor satisfaction. The underlying attestations are the same; the interpretation varies.

Beneficiary impact is better measured through the charity's own reporting (attested on their domain) and independent evaluations (attested on the evaluator's domain) — not through individual beneficiary testimonials.

## Not Viable: Supplier Directories — Alibaba, ThomasNet

**Viability: Fails.** Same problem as Net30Club.

### Why It Fails

The concept is appealing: a supplier's quality attested by actual customers rather than a paid directory badge. But:

1. **Would the attester publish?** Rarely. "We use Meridian Components for 847 orders a year" reveals procurement strategy, supply chain structure, and purchasing volume. Most procurement teams treat supplier relationships as confidential. Publishing attestations broadcasts sourcing intelligence to competitors.
2. **Is the data sensitive to the subject?** Yes, to both parties. The supplier's customer list is commercially sensitive. The customer's supplier list is equally sensitive. Neither wants this public.
3. **Power asymmetry?** Severe. A large buyer who publicly attests a small supplier's quality is also publicly revealing they depend on that supplier. Competitors now know where to apply pressure — or where to poach.

The Alibaba "Gold Supplier" badge costs $2,000-6,000/year. It's pay-to-play, but it works commercially because it doesn't require buyers to expose their procurement decisions. A decentralized alternative that demands public attestation from buyers asks too much.

### What Might Work Instead

A **permissioned attestation model** — buyers attest to supplier quality, but the attestations are only visible to authorised parties (other potential buyers, trade credit insurers) with explicit consent from both sides. This is a commercial data platform, not a public verification graph. The trust dynamics are real; the transport mechanism is wrong for Live Verify's public plain-text model.

## Not Viable: Vehicle History — Carfax, HPI Check

**Viability: Weak.** The key data sources won't publish.

### Why It Fails

The concept: every event in a vehicle's life is attested by the party that performed it — garages, insurers, the MOT system, dealers.

| Data Source | Would They Publish? | Why / Why Not |
|---|---|---|
| **MOT (DVSA)** | Already public | gov.uk publishes full MOT history for any vehicle — this data is already decentralized from Carfax/HPI |
| **Garages** (service records) | Unlikely | No incentive. A garage's business model doesn't benefit from publishing service records. Some franchise dealers might, for marketing — but independent garages won't build verification infrastructure for no return. |
| **Insurers** (accident/claims data) | No | Claims data is policyholder-confidential. An insurer publishing "Minor rear bumper damage, claim settled, Cat N" against a VIN is disclosing claims information without the policyholder's explicit consent. Data protection law (GDPR, DPA 2018) prevents this. |
| **Dealers** (sale records) | Maybe | Franchise dealers might attest to certified pre-owned sales as a marketing differentiator. Independent dealers have no incentive. |
| **DVLA** (ownership, registration) | Partially public | Some data available via gov.uk vehicle enquiry service, but ownership details are restricted. |

The valuable data that makes Carfax/HPI worth paying for — accident history, insurance write-offs, stolen vehicle flags — comes from insurers and police. Neither will publish this as open attestations. Carfax/HPI have this data because they have **commercial data-sharing agreements** with insurers, not because the data is public.

A decentralized vehicle history built only from MOT records and optional garage attestations is less useful than the existing free gov.uk MOT checker. It doesn't displace Carfax/HPI because it doesn't have the data that makes them valuable.

### What Already Works

The UK government's free MOT history checker (`gov.uk/check-mot-history`) already decentralized the MOT portion. The remaining data (insurance, police, finance liens) requires commercial relationships or government mandates — not a verification protocol.

## Viability Summary

| Graph | Displaces | Viable? | Key Factor |
|---|---|---|---|
| **Professional identity** | LinkedIn | **Yes** | Individuals and employers both want to publish; no sensitive data |
| **Consumer reviews** | Trustpilot, TripAdvisor, Yelp, Google Reviews | **Yes** | Reviewers want publicity; no power asymmetry; fake reviews become uneconomic |
| **Charity ratings** | Charity Navigator, GuideStar | **Partial** | Donor/funder/auditor layers work; beneficiary layer has safeguarding concerns |
| **Supplier directories** | Alibaba, ThomasNet | **No** | Procurement intelligence is commercially sensitive; buyers won't publish |
| **Vehicle history** | Carfax, HPI Check | **No** | Key data (insurance claims) is confidential; garages have no incentive |
| **Payment behaviour** | Dun & Bradstreet, Experian Business | **Partial** | Self-attestation works; supplier corroboration is sensitive (see [rejection](../public/rejected-use-cases/payment-behaviour-portals.md)) |

The honest conclusion: **two graphs are clearly viable** (professional identity and consumer reviews), **two are partially viable** (charity ratings and payment self-attestation), and **two are not viable** as open verification graphs (supplier directories and vehicle history). The non-viable ones may work as permissioned data platforms — but that's a different business model with different infrastructure.

## Aggregator Economics

For the viable graphs, the aggregator business model is real but modest:

**Revenue sources:**
- Search fees (recruiters pay to search professional graphs; travellers pay for curated review aggregation)
- Premium profiles (individuals or businesses pay for enhanced presentation)
- Analytics (anonymised trend data — "average rating for Brighton hotels this quarter")
- API access (other services integrating the aggregated data)

**What aggregators cannot charge for:**
- The underlying data (it's public)
- Exclusivity (competitors index the same data)
- Lock-in (subjects can revoke permissions and switch)

This is a services margin, not a monopoly margin. Healthy, sustainable, but never going to command a LinkedIn-scale or TripAdvisor-scale valuation — because the value has been redistributed to the participants who created it.

## What Has To Happen First

The viable decentralized graphs don't require anyone to build them. They assemble themselves as adoption grows. But some things accelerate it:

1. **SaaS verification providers** lower the barrier for non-technical attesters (see [SAAS-VERIFICATION-PROVIDERS.md](SAAS-VERIFICATION-PROVIDERS.md) and [non-sovereign-verification-patterns.md](non-sovereign-verification-patterns.md))
2. **One aggregator** proves the model — indexes public attestations, provides search, demonstrates that the data is there and useful. Others follow.
3. **One industry vertical** exits the centralized platform — probably tech professionals leaving LinkedIn, or independent hotels leaving Trustpilot/TripAdvisor. Demonstrates the pattern for other verticals.
4. **Issuers discover the cost savings.** A university currently pays a verification service (like Hedd or the National Student Clearinghouse) to confirm degrees on their behalf. Publishing hashes on their own domain costs approximately nothing. The first major university to do this triggers a wave.

The protocol exists. The backend is simple. The question is adoption tempo, not technical feasibility — and the honest answer is that only some of the imagined decentralized graphs will actually materialise.

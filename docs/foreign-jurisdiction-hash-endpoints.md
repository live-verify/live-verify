# Foreign Jurisdiction Hash Endpoints

## The Problem

A London fund manager receives a "tax return" from a Kazakh tax authority, presented by a foreign investor as source-of-wealth evidence. The fund manager cannot verify it. The document might be genuine, forged, altered, or issued by a compromised authority. There is no phone number to call, no website to check, no verification mechanism of any kind.

This is the hardest gap in AML compliance: **foreign-origin documents from jurisdictions with weak institutions.** The UK, US, and EU have built sophisticated verification infrastructure for their own documents (FCA registers, OFSI licences, NCA DAML consents, IRS transcripts), but none of that helps when the evidence originates abroad.

Tax information exchange agreements (CRS, FATCA) exist but solve a different problem — they exchange *data* between governments. That's slow, bilateral, requires formal requests, and reveals private information. Verifying a single document shouldn't require a treaty-level data exchange.

## The Proposal

Every tax authority, corporate registry, and financial regulator worldwide publishes **hash endpoints** for documents they issue. No data exchange. No new treaties. Just confirmation that a document someone already holds is genuine.

```
Fund manager receives Kazakh tax return
  → Hashes the document text
  → GETs https://tax.gov.kz/returns/{hash}
  → Gets {"status":"verified"} or 404
  → Done
```

This asks jurisdictions to do one thing: **stand behind documents they themselves issued.** No discovery (you can't enumerate documents via hashes), no privacy exposure (hashes are one-way), no sovereignty concern (the jurisdiction is confirming its own output to its own citizen's agent).

## Why Jurisdictions Cannot Reasonably Refuse

### 1. No Discovery

The endpoint only confirms documents the holder already possesses and has voluntarily presented to a third party. You cannot:
- Enumerate taxpayers (hash is one-way — you'd need the original text)
- Fish for tax returns (no search, no index, no query interface)
- Learn anything not already in the document you hold

This is strictly weaker than CRS/FATCA, which requires jurisdictions to proactively *push* taxpayer data to foreign governments.

### 2. No Sovereignty Concern

The jurisdiction is not sharing data with a foreign power. It is confirming to its own citizen (or their authorised agent) that a document the jurisdiction itself issued is authentic. This is a service *to* the jurisdiction's own taxpayers — it protects them from having their legitimate documents rejected as suspected forgeries.

### 3. Trivial Cost

Static file hosting. One SHA-256 hash per document issued. A jurisdiction issuing 10 million tax returns per year needs ~640MB of hash storage. Hosting cost: effectively zero.

### 4. The Alternative Is Worse

Without hash endpoints, foreign documents are treated with suspicion. Enhanced due diligence is applied. Transactions are delayed or rejected. The jurisdiction's own citizens and businesses suffer friction in international finance — not because of anything they did wrong, but because their government won't confirm their documents are real.

## The Enforcement Lever: Financial Exclusion

### Existing Precedent: FATCA

In 2010, the US passed the Foreign Account Tax Compliance Act. It required every financial institution on earth to report US persons' accounts to the IRS. The penalty for non-compliance: 30% withholding on all US-source income flowing through non-compliant institutions.

Within five years, over 100 jurisdictions had signed FATCA intergovernmental agreements. Not because they wanted to — because the cost of exclusion from USD clearing was existential.

### Existing Precedent: FATF Greylisting

The Financial Action Task Force maintains a greylist (officially "Jurisdictions under Increased Monitoring") and a blacklist ("High-Risk Jurisdictions subject to a Call for Action"). Greylisted countries face:

- Enhanced due diligence on all transactions from their jurisdiction
- Higher compliance costs for their financial institutions
- Reduced correspondent banking access
- Reputational damage that deters foreign investment

Countries will do almost anything to get off the greylist. Pakistan, the Philippines, and Turkey all implemented major AML reforms specifically to achieve FATF delisting.

### The Hash Endpoint Requirement

Adding "does your jurisdiction publish verification hash endpoints for government-issued documents" to the FATF mutual evaluation methodology is a minor extension. It requires:

- No new international treaty
- No data sharing agreement
- No bilateral negotiation
- Just a technical requirement: publish hashes for documents you issue

The enforcement gradient is the same as existing FATF practice:

| Tier | Behaviour | Consequence |
|------|-----------|-------------|
| **Compliant** | Publishes hash endpoints, keeps them current | Full access to global correspondent banking |
| **Committed** | Building infrastructure, not yet live | Grace period (12-24 months), technical assistance available |
| **Non-cooperative** | Refuses, ignores, or lets endpoints go stale | FATF greylist — enhanced due diligence on all transactions |
| **Hostile** | Actively obstructs document verification | FATF blacklist — correspondent banking severed |

## Who Can Demand This

Not just the US and UK. Any jurisdiction whose banking system others depend on:

| Jurisdiction | Leverage | Reach |
|---|---|---|
| **United States** | USD clearing, CHIPS, Fedwire | Global — USD is ~88% of forex transactions |
| **European Union** | EUR clearing, TARGET2, SEPA | Europe, Africa, Middle East |
| **United Kingdom** | GBP clearing, London correspondent banking | Commonwealth, offshore centres |
| **Japan** | JPY clearing, Asian development banking | Asia-Pacific |
| **Switzerland** | CHF, private banking hub | Wealth management globally |
| **Singapore** | SGD, Asian financial hub | Southeast Asia |
| **Australia** | AUD, Pacific banking | Oceania, Southeast Asia |
| **Canada** | CAD, Five Eyes coordination | North America, Caribbean |

Through the FATF (39 members plus 2 regional bodies covering 200+ jurisdictions), these countries already coordinate AML standards. Adding hash endpoint requirements to the existing evaluation framework doesn't require new institutional machinery — the machinery already exists.

## What Gets Hash Endpoints

The requirement applies to any government-issued document routinely used in cross-border financial due diligence:

| Document Type | Issuing Authority | Example `verify:` Domain |
|---|---|---|
| **Tax returns / tax residence certificates** | National tax authority | `tax.gov.kz/returns` |
| **Corporate registry extracts** | Companies registrar | `egov.kz/companies` |
| **Bank statements** | Regulated banks (supervised by central bank) | `halykbank.kz/statements` |
| **Court judgments** | National judiciary | `courts.gov.kz/judgments` |
| **Professional licences** | Regulatory bodies | `finreg.gov.kz/licences` |
| **Property title records** | Land registry | `land.gov.kz/titles` |
| **Sanctions clearance letters** | National sanctions authority | `sanctions.gov.kz/clearance` |

For private-sector documents (bank statements, legal opinions), the requirement flows through supervision: "Your banking licence requires you to publish hash endpoints for statements you issue." The central bank enforces this as a condition of the banking licence, just as it enforces other AML requirements.

## The Beautiful Asymmetry

This proposal asks **dramatically less** than existing international frameworks:

| Framework | What jurisdictions must do | Privacy exposure | Implementation cost |
|---|---|---|---|
| **CRS** (Common Reporting Standard) | Proactively report all non-resident account holders' balances and income to foreign tax authorities | High — full financial data shared | High — requires account-holder screening, reporting systems, bilateral agreements |
| **FATCA** | Report all US persons' accounts to the IRS | High — account details shared | High — same as CRS plus 30% withholding infrastructure |
| **FATF Recommendations** | Implement full AML/CFT framework: CDD, STR filing, beneficial ownership registers | Medium — domestic data collection | Very high — institutional, legal, and technical reforms |
| **Hash endpoints** | Publish SHA-256 hashes for documents you already issue | **None** — hashes are one-way, no data shared | **Trivial** — static file hosting |

A jurisdiction that has implemented CRS, FATCA, and the FATF Recommendations but refuses to publish hash endpoints has no credible justification. They've already accepted far greater obligations.

## Addressing Objections

### "Our documents are confidential"

The hash reveals nothing about the document's contents. It confirms only that a specific document exists and was issued. The person presenting the document already has the full contents — the hash endpoint tells the verifier nothing they don't already know.

### "We don't have the technical capacity"

Static file hosting. A single server running nginx with a directory of 64-character filenames. The FATF and World Bank already provide technical assistance for AML infrastructure far more complex than this.

### "This enables foreign surveillance"

It does the opposite. Under CRS, foreign governments receive your citizens' financial data whether the citizens consent or not. Under hash endpoints, foreign parties can only verify documents your citizens have *voluntarily chosen to present*. The citizen controls what gets verified by controlling what they share.

### "What about revocation?"

The same mechanism that handles revocation in every other Live Verify use case: the hash endpoint returns `{"status":"revoked"}` instead of `{"status":"verified"}`. If a tax return is amended, the original hash returns revoked and the amended return gets a new hash.

## The North Korea Problem

Some jurisdictions will never comply. North Korea, Iran under maximum sanctions, and a handful of others have no correspondent banking access already. For these jurisdictions, the hash endpoint requirement changes nothing — their documents are already treated as unverifiable, and their financial exclusion is already complete.

The interesting cases are the **grey zone** — jurisdictions that are technically cooperative but practically obstructive. Countries where the tax authority *exists* but issues documents on demand to connected individuals. Countries where the corporate registry *publishes* data but the data is fabricated.

Hash endpoints don't solve corruption at the issuing authority — if the Kazakh tax authority issues a genuine hash for a fabricated tax return, the endpoint will return "verified." But they do eliminate one layer of fraud: the fund manager no longer has to wonder "is this document even real?" The question narrows to "is the issuing authority trustworthy?" — which is a judgement call that regulators and compliance officers are already equipped to make.

## Relationship to Existing Use Cases

Several existing use cases already contemplate foreign jurisdiction equivalents:

- [OFSI Licence Authorisations](../public/use-cases/ofsi-licence-authorisations.md) — includes US (OFAC) and EU equivalents
- [NCA SAR Receipt Acknowledgments](../public/use-cases/nca-sar-receipt-acknowledgments.md) — includes FinCEN and EU FIU equivalents
- [HMRC Trust Registration Confirmations](../public/use-cases/hmrc-trust-registration-confirmations.md) — includes FinCEN BOI and EU central registers
- [HMRC AML Supervision Registrations](../public/use-cases/hmrc-aml-supervision-registrations.md) — includes FinCEN MSB and EU AML registrations

These are all documents issued by *cooperative* jurisdictions with existing verification infrastructure. The hash endpoint requirement extends this to jurisdictions that currently have no verification mechanism at all — which is where the actual fraud risk concentrates.

## Implementation Timeline

### Phase 1: FATF Endorsement (Year 1)

- FATF plenary adopts hash endpoint publication as a recommended practice
- Added to the methodology for the next round of mutual evaluations
- Technical guidance published (endpoint specifications, hosting requirements, example implementations)

### Phase 2: Major Jurisdiction Adoption (Years 1-2)

- G7 + EU + Australia + Singapore publish hash endpoints for their own tax and corporate documents
- Lead by example — demonstrate the cost is trivial and the privacy impact is nil
- Bilateral pressure on key financial centres (UAE, Cayman, BVI, Jersey, Guernsey)

### Phase 3: FATF Evaluation Integration (Years 2-4)

- Hash endpoint availability becomes a scored element in mutual evaluations
- Jurisdictions without endpoints face downgrade risk
- Technical assistance programmes for developing countries (World Bank, IMF, FATF-style regional bodies)

### Phase 4: Correspondent Banking Condition (Years 3-5)

- Major correspondent banks (JPMorgan, HSBC, Standard Chartered, Deutsche Bank) require hash endpoint availability as a condition for maintaining correspondent relationships with foreign banks
- Mirrors the FATCA enforcement model — private-sector enforcement of a public-sector requirement
- Non-compliant jurisdictions' banks lose access to USD/EUR/GBP clearing

### Phase 5: Steady State (Year 5+)

- Hash endpoints are as routine as CRS reporting
- Fund managers verify foreign documents in real-time during onboarding
- FCA batch audit tool checks every foreign document against its jurisdiction's endpoint
- The "unverifiable foreign document" problem is largely eliminated for cooperative jurisdictions

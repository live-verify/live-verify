# Case study: Live Verify and the ABI 2025 insurance fraud figures

The Association of British Insurers (ABI) published [its insurance fraud press release](https://www.abi.org.uk/media-hub/news-post/fraudsters-target-bigger-payouts-as-insurers-detect-134-billion-of-bogus-claims) on **6 October 2026**, reporting figures for **2025**. This case study considers where Live Verify could help with the documentary evidence behind those claims and where its limits apply.

## The figures

The ABI reports:

- **£1.34bn** of fraudulent claims detected, up 14% from £1.18bn the year before
- **93,900** detected cases, down 2.7%. Fewer cases, but bigger ones: the average was **£14,300**, the second-highest on record
- **Motor**: 51,900 cases worth £625m, 55% of all detected cases
- **Property**: 17,700 cases, down 6.2%, worth £201m, up 3.4%. The average was a record £11,400
- **Travel**: 4,500 cases, up 85% in volume, worth £8.6m, up 16%
- **Exaggerated loss**: 26,900 cases, the most common type
- **Contrived incident and loss**: about 5,600 cases, up 30%, the fastest-growing type
- **Application fraud**: £1.8bn prevented, with case numbers up 24%

The same release gives three case studies:

1. **Property**: false home-insurance claims for "stolen" Lego sets. The fraudster was jailed for 28 months.
2. **Motor**: staged "crash for cash" collisions.
3. **Travel**: a £300,000 scam that used fake identities, fabricated medical documents and fabricated websites.

## Short answer

Live Verify helps against fraud that depends on **forged or altered documents**. It does little against fraud that depends on **staged events**, and contrived incident and loss is the fastest-growing fraud type in these figures. Travel has the largest volume increase among the insurance lines reported.

A matching hash at the issuer's endpoint establishes that the checked text is what that issuer published. It cannot prove the document's contents are true. It also cannot prove that an incident wasn't arranged so that genuine documents would be issued about it.

## Where it fits

| Claim area | Documentary fraud Live Verify could address | Relevant use cases |
|---|---|---|
| Exaggerated loss (26,900, the largest) | Fabricated receipts, altered repair estimates or inflated valuations. Genuine documents can also support a false claim, as discussed below. | [sales-receipts](../public/use-cases/sales-receipts.md), [auto-insurance-documents](../public/use-cases/auto-insurance-documents.md) (repair estimates), [property-appraisals-valuations](../public/use-cases/property-appraisals-valuations.md), [warranty-documents](../public/use-cases/warranty-documents.md) |
| Theft and burglary claims | A crime reference number shown on a forged confirmation | [crime-report-confirmations](../public/use-cases/crime-report-confirmations.md), which has its own "The Insurance Problem" section |
| Travel claims (+85% volume overall) | Fabricated fit notes, medical letters and treatment invoices | [doctors-notes](../public/use-cases/doctors-notes.md), [medical-referral-letters](../public/use-cases/medical-referral-letters.md), [travel-insurance-claims](../public/use-cases/travel-insurance-claims.md) (which also covers double-dipping across insurers) |
| Application fraud (£1.8bn) | Inflated no-claims years, undisclosed convictions, fronting | [insurance-no-claims-certificates](../public/use-cases/insurance-no-claims-certificates.md), [driving-records](../public/use-cases/driving-records.md), [additional-driver-endorsements](../public/use-cases/additional-driver-endorsements.md), [cifas-fraud-prevention-markers](../public/use-cases/cifas-fraud-prevention-markers.md) |

Where the issuer publishes hashes, a claims handler can check the supplied text against that issuer's endpoint. This can reduce manual calls to confirm document authenticity. Forged or altered text will normally produce no matching entry (404); that result alone does not distinguish fraud from an issuer that has not published the document or an extraction error.

Application fraud is a promising starting point for adoption. The documents involved, such as no-claims certificates and driving records, come from a small number of large, identifiable issuers. That makes coordinated adoption more plausible, although document checks alone cannot establish who actually drives a vehicle or detect every omission.

## Where it doesn't fit, or fits only weakly

### 1. Contrived or staged incidents (+30%)

In a crash-for-cash scheme, the collision really happens. The police report, repair estimate and medical notes that follow may be genuine. If their issuers publish hashes, those genuine documents can verify even though the collision was staged. Detecting staged incidents takes network and behavioural analysis across claims, like the work the Insurance Fraud Bureau (IFB) does. Live Verify does not do this and should not claim to.

### 2. Exaggeration using genuine documents

A real receipt for a real item still verifies when the item was never actually stolen. Live Verify removes **forged** proof of ownership. It does not remove **false claims** backed by genuine paperwork. The ABI summary does not say whether receipts in the Lego case were fabricated. Live Verify would help with forged or altered supporting documents, but would not establish whether the sets were stolen.

### 3. Fabricated websites: a fraudster-controlled domain

The travel case mentions fabricated **websites** as well as fabricated documents. This bears directly on the trust model. If the fraudster registers a domain for a made-up clinic and publishes hashes on it, the documents will verify against that domain.

Two checks matter here:

- **The human check.** The verifier sees the domain and judges whether it really belongs to a hospital. See [dual-channel-trust](dual-channel-trust.md).
- **The machine check.** The [authority chain and sovereign roots design](sovereign-roots.md) would allow a client to check whether a recognised health regulator endorses the clinic's domain. The proposed **amber "unanchored"** state distinguishes an authentic claim on an unanchored domain from one with a recognised authority chain. This depends on regulator participation and client implementation.

An unanchored medical document warrants further checks on the provider; it is not proof of fraud. The travel example illustrates why document authenticity and issuer legitimacy need separate checks.

### 4. Adoption by issuers

Every row in the table above works only once the **issuer** publishes hashes: the retailer, police force, GP practice, overseas hospital or previous insurer. The insurer is the party that benefits, but it cannot turn this on by itself. A possible order of adoption is:

1. Insurers' own documents: no-claims certificates and settlement advices
2. Crime reference confirmations from police forces and relevant reporting services
3. Large retailers' receipts
4. Medical providers, which are the slowest and most fragmented group

### 5. Genuine but outdated documents

An authentic document may no longer reflect current circumstances: a no-claims certificate can predate a later claim, and an estimate can have been superseded. Claims handlers still need the document date, any expiry and the issuer's current status. See [point-in-time vs current](point-in-time-vs-current.md).

## How it fits alongside existing controls

Live Verify complements the industry's existing tools: CIFAS, the IFB, the Claims and Underwriting Exchange (CUE) and insurers' own analytics. It does not replace them. Its specific contribution is to make the **documentary evidence** in a claim cheap to check. Investigators can then spend their time on what documents can't show, which is whether the incident really happened as described.

## Possible follow-up

A rollup use case could bring the existing document-specific examples together from the insurer's perspective, as the party checking a claim's evidence pack. It would take a claim's typical evidence pack (crime reference, proof of purchase, repair estimate, medical evidence, no-claims history) and mark each item as verifiable or not, stating the staged-incident limit plainly.

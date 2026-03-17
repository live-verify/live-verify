# Legislative Patterns for Mandated Verification

This document describes six legislative patterns that governments could enact to require regulated organisations to make their data verifiable via Live Verify. Each pattern liberates a different class of verifiable claims — some benefiting individuals (1:1), others benefiting the public (1:many).

The common principle: **organisations that already hold authoritative data, as a byproduct of their regulated activity, should be required to make that data verifiable — free, hash-based, and bound to their domain.**

The cost is marginal (hash hosting on existing infrastructure). The benefit is systemic (eliminates entire categories of document fraud, reduces verification delays from days to seconds, and removes rent-seeking intermediaries who charge for access to data that should be freely verifiable).

---

## Pattern 1: Right to a Portable Proof (1:1)

**The law:** Any regulated entity that holds data about an individual must, on request, provide a verifiable attestation the individual can share with third parties. Free, time-limited, hash-based.

This is analogous to GDPR's right to data portability — but for **attestations** rather than raw data dumps. The individual doesn't want their bank's entire database export. They want: "this person has an account with us in good standing." The difference is between receiving *your data* and receiving a *verifiable claim about your data* that you can present to others.

**Time-limited salt model:** The individual generates a proof via the organisation's portal or app. The proof contains a salt that expires after N days (configurable: 7, 14, 30). After expiry, the hash stops resolving — forcing a fresh proof for ongoing engagements. This prevents stale proofs circulating after circumstances change, and keeps the individual in control of when their data is verifiable.

### Entities this applies to

| Regulated Entity | What they'd confirm | Current alternative | Use case doc |
|---|---|---|---|
| **Utility / telco provider** | Name, address, active account | PDF bill (trivially forged) | [proof-of-address](../public/use-cases/proof-of-address.md) |
| **Insurer** | Active policy, cover type, cover amount | Broker certificate PDF | [proof-of-insurance-status](../public/use-cases/proof-of-insurance-status.md) |
| **Employer** | Current employment, role, start date | HR letter (days to obtain, easily forged) | [proof-of-employment](../public/use-cases/proof-of-employment.md) |
| **Childcare provider** | Child enrolled, hours/week, since date | Provider letter (forged for benefit claims) | [proof-of-childcare-enrolment](../public/use-cases/proof-of-childcare-enrolment.md) |
| **Local authority** | Council tax payer, address, payment standing | Council tax bill PDF | [proof-of-council-tax](../public/use-cases/proof-of-council-tax.md) |
| **NHS / GP practice** | Patient registered, address held, since date | GP letter (£15-30, 5-7 day wait) | [proof-of-gp-registration](../public/use-cases/proof-of-gp-registration.md) |
| **Bank** | Account exists, in good standing, opened date | Bank statement PDF | — |
| **Pension provider** | Active pension, projected value band | Annual statement letter | — |
| **Landlord / letting agent** | Person is tenant at address, rent current | Tenancy agreement PDF | [tenant-references](../public/use-cases/tenant-references.md) |
| **School** | Child enrolled, year group, since date | School letter | — |

### Why one statute covers all of these

Every entity in the table above shares the same properties:

1. Already regulated (FCA, Ofgem, Ofcom, Ofsted, CQC, HMRC, etc.)
2. Already holds the data as a byproduct of primary service
3. Already has digital systems (billing, CRM, HRIS) containing the data
4. Current alternative is an unverifiable document (PDF, letter, screenshot)
5. Marginal cost of hash hosting is near zero on existing infrastructure

A single "Right to Verifiable Proof" statute could mandate that any entity regulated by a named list of regulators must offer hash-based verification on request. The regulators would set implementation timelines and standards for their sectors. The effect is that every regulated relationship a person has becomes a source of verifiable claims they control.

### What this replaces

The current system forces individuals to collect unverifiable documents from multiple organisations and present them to third parties who eyeball them. The "Right to a Portable Proof" replaces this with a system where the individual generates proofs on demand and the third party verifies them cryptographically against the issuer's domain. The individual is in control. The documents are unforgeable. The process takes seconds instead of days.

---

## Pattern 2: Publish What You Certify (1:many)

**The law:** If you certify, licence, inspect, rate, or approve something as a public or regulatory function, you must publish verifiable hashes — not just a searchable database, but hashes that bind claims to your domain so that anyone encountering the claim can verify it.

This targets a specific gap: regulators already publish their decisions (food hygiene ratings, school Ofsted ratings, care home CQC ratings, premises licences), but the published data lives on the regulator's website. When the *subject* of the rating reproduces it in their own marketing, brochures, signage, or communications, there's no way for a member of the public to verify that the claimed rating matches what the regulator actually issued — without going to the regulator's website and searching manually.

Live Verify closes this gap. The rating or certification carries a `verify:` line bound to the regulator's domain. Anyone who encounters the claim — on a restaurant window, in a care home brochure, on a builder's quote — can verify it instantly.

### What this liberates

**Food hygiene ratings**
The FSA already requires display of hygiene ratings. But the sticker on the window could be outdated or forged. A verifiable claim from `food.gov.uk` makes the rating scannable and unforgeable wherever it appears — on the window, on Deliveroo, on the restaurant's own website, in a Google Maps listing.

**Care home ratings (CQC)**
Families choosing care homes see ratings on the CQC website. But care homes reproduce ratings in their own brochures, emails, and advertisements. A verifiable claim bound to `cqc.org.uk` means the rating in the brochure is provably current — not a screenshot from when they were rated "Good" three years ago before dropping to "Requires Improvement."

**School ratings (Ofsted)**
Schools display Ofsted ratings prominently in marketing materials and on entrance signs. A verifiable claim bound to `ofsted.gov.uk` prevents schools from displaying outdated ratings or selectively quoting from reports.

**Building safety certificates**
Post-Grenfell, leaseholders and prospective buyers need to know if a building has a valid safety certificate. A verifiable claim from the assessor's domain — chained to the Building Safety Regulator — would be bindable to property listings, leasehold information packs, and building management communications.

**Planning permission**
"Does this extension have planning approval?" Currently requires searching the council's planning portal. A verifiable claim on the builder's quote or estate agent's listing would confirm that planning permission was granted, is current, and matches the described works — verifiable against the council's domain.

**Premises licences**
Pubs, clubs, late-night venues, off-licences. The licence on the wall could be expired, for a different premises, or for a different licence holder. A verifiable claim bound to the licensing authority's domain confirms the licence is current and matches the premises.

**Professional registrations**
The GMC, SRA, NMC, GDC, RICS, and hundreds of other professional regulators maintain public registers. A mandate to publish verifiable hashes would let professionals carry proof that resolves against the regulator's domain — not just a search result on a website that a client may not think to check.

### The principle

If a certification, rating, or approval is meaningful enough to influence public decisions (where to eat, where to send children, where to live, who to hire), it should be verifiable wherever it appears — not only on the regulator's own website.

---

## Pattern 3: Verify What You Claim (1:many)

**The law:** If you make a regulated public claim about a product or service — organic, Fairtrade, carbon-neutral, halal, kosher, allergen-free, cruelty-free, recycled, sustainably sourced — you must publish a verifiable hash from the certifying body's domain. The logo alone is not sufficient.

This is a **greenwashing, fraud-labelling, and false-certification killer.** Currently, certification logos on packaging are unverifiable at point of encounter. A consumer in a supermarket aisle has no way to confirm that the "Soil Association Organic" logo on a product corresponds to a current, valid certification. They trust the logo. The logo is trivially reproducible.

### What this liberates

**Organic certification**
Soil Association (UK), USDA Organic (US), EU organic logo. Anyone can print the logo. With a mandate: the certifying body's domain confirms the product or producer is currently certified. A `verify:` line on the packaging (or in the product's online listing) resolves against `soilassociation.org` or equivalent.

**Fairtrade / Rainforest Alliance / UTZ**
Same pattern. The certifier's domain confirms the product is currently within a valid certification cycle. Prevents "certified once, logo forever" abuse.

**Carbon-neutral / net-zero claims**
The most abused category. Companies claim carbon neutrality based on offsets of dubious quality. A verifiable hash from the offset verifier's or auditor's domain would bind the claim to an actual, current certification — not a press release.

**Halal / kosher certification**
Certifying bodies (e.g., HMC, IFANCA, OU, OK) confirm the establishment or product is currently certified. Critical for religious communities that rely on these certifications and are harmed by fraud. Fake halal/kosher labels are a real problem — particularly in online food delivery where the consumer can't inspect the premises.

**Allergen declarations**
A restaurant's allergen menu or a product's allergen statement, verifiable against the testing laboratory's or environmental health office's domain. This is a life-and-death accuracy issue. Natasha's Law (UK, 2021) already requires pre-packed food to carry full allergen labelling — extending this to verifiable claims from the testing authority would add a trust layer.

**Country of origin**
"Made in Italy," "British beef," "Scottish salmon," "Champagne" — verifiable against the trade body, inspection authority, or protected designation of origin (PDO) registry. Currently enforced by Trading Standards reactively; verifiable claims would enable proactive consumer verification.

**Recycled content / sustainability claims**
"Made from 80% recycled plastic" — verifiable against the auditor's domain. The EU Green Claims Directive (expected ~2026) already moves in this direction by requiring substantiation of environmental claims; hash-based verification would be a natural implementation mechanism.

### The principle

If a claim on a product or service is regulated (i.e., it's illegal to make the claim falsely), then the certification behind the claim should be verifiable by anyone — not just by a Trading Standards officer after a complaint. The logo is the claim; the hash is the proof.

---

## Pattern 4: Receipts for Decisions (1:1)

**The law:** When you make a consequential decision about someone — approve, deny, revoke, penalise, or restrict — you must give them a verifiable record of that decision they can present to others.

This creates accountability and portability for decisions that currently vanish into internal systems. The individual receives not just a notification of the decision, but a **verifiable attestation** they can show to anyone — an ombudsman, another provider, a court, an advisor — without the recipient having to trust a PDF or call the original decision-maker.

### What this liberates

**Credit decisions**
"We declined your mortgage application because [reason category]." Currently a letter you can't prove is genuine. Verifiable against the lender's domain, so you can show it to a broker, an ombudsman, or another lender. The Financial Ombudsman Service would benefit enormously — currently they receive disputed decision letters that may or may not be genuine.

**Insurance claim decisions**
"Claim approved/denied, amount £X, reason Y." Verifiable against the insurer's domain. Useful for disputes, legal proceedings, switching insurers, or proving to a repairer that a claim was approved.

**Planning decisions**
"Permission granted/refused for [works] at [address]." Verifiable against the council's domain. Useful for property transactions (buyer verifying what the seller claims was approved), appeals, and disputes with neighbours.

**DBS / background check results**
"Enhanced DBS check completed [date], no findings." Currently a paper certificate that the subject carries between jobs. It's easily forged, has no expiry date (but employers are advised to refresh periodically), and employers photocopy it into filing cabinets with no way to verify authenticity. A verifiable hash from `dbs.gov.uk` would let the subject prove their clean record to multiple employers without each one requesting a fresh check (which costs £23-44 and takes weeks).

**Right-to-rent checks**
"This person has the right to rent in the UK, valid until [date/indefinite]." The Home Office already provides an online checking service, but the result is ephemeral — it's a webpage the landlord views once, not a portable proof the tenant carries. A verifiable hash from `gov.uk` would make the result portable and re-verifiable.

**Benefit entitlement decisions**
"This person is entitled to PIP at enhanced rate / UC at £X/month." Verifiable against DWP's domain. Useful when proving entitlement to linked services: council tax discount, blue badge, free prescriptions, Warm Home Discount, social tariffs. Currently, each linked service requires the individual to separately prove their benefit status — often by posting a photocopy of a DWP letter.

**Tribunal and court decisions**
"Employment tribunal found in favour of claimant, award £X." Verifiable against the tribunal service's domain. Useful for enforcement, credit applications (proving expected income from an award), and subsequent legal proceedings.

**University admissions decisions**
"Unconditional offer for [course] starting [date]." Verifiable against the university's domain. Useful for student loan applications, visa applications, accommodation booking — all of which currently rely on forwarded offer letters that could be edited.

### The principle

Consequential decisions about individuals should be **portable and verifiable**, not locked in the decision-maker's internal systems. The individual is the subject of the decision; they should be able to prove what was decided, by whom, and when — without relying on the decision-maker's willingness to confirm by phone or letter.

---

## Pattern 5: Confirm What You Report (1:many)

**The law:** Data you are already required to file with regulators must also be verifiable by the public or affected parties — not locked in a regulatory silo where the only access is a website search.

The distinction from Pattern 2 ("Publish What You Certify") is that Pattern 5 applies to **filings by the regulated entity**, not ratings/certifications *of* the entity. The entity is making claims in its regulatory filings; those claims should be verifiable when the entity reproduces them elsewhere.

### What this liberates

**Company accounts**
Filed at Companies House. But the accounts a company shows to investors, lenders, or potential acquirers might differ from what was actually filed. A verifiable hash from `companieshouse.gov.uk` bound to the specific filing would let anyone confirm that the accounts they're reviewing match the statutory filing.

**Gender pay gap reports**
Already published on `gov.uk`. A verifiable hash means a company can't show one version to job candidates ("we're nearly at parity") and file a different version with the government.

**Emissions / environmental reports**
SECR (Streamlined Energy and Carbon Reporting) and ESOS (Energy Savings Opportunity Scheme) filings. If a company claims low emissions in marketing or ESG reports, the claim should be verifiable against the regulatory filing. This directly supports the anti-greenwashing agenda.

**Directors' and PSC declarations**
"I am a director of X" or "Y is a person of significant control of Z" — verifiable against Companies House. Stops impersonation in business fraud (a common vector where someone claims to be a director to authorise transactions or sign contracts).

**Charity accounts and annual returns**
Filed with the Charity Commission. Verifiable against `charitycommission.gov.uk` so donors can confirm that the accounts and activity reports they're shown by a charity match what was actually filed with the regulator.

**Clinical trial registrations**
Registered on public databases (ClinicalTrials.gov, EU Clinical Trials Register). A verifiable hash would let patients confirm that the trial they're being recruited for is actually registered — preventing participation in unregistered or fraudulent trials.

**Lobbying register entries**
Entries on lobbying registers (UK Office of the Registrar of Consultant Lobbyists, EU Transparency Register). A verifiable hash would let journalists or the public confirm that a lobbyist's claimed registration matches the actual filing.

### The principle

If an organisation is legally required to file data with a regulator, the filed data should be verifiable by anyone the organisation shows it to. This prevents the "two sets of books" problem — one for the regulator, one for the public.

---

## Pattern 6: Right to Prove Absence (1:1)

**The law:** Individuals have the right to prove that something does *not* apply to them — no criminal record, no outstanding debt, no sanctions match, no regulatory action — via a verifiable, time-limited attestation.

This is the most novel pattern because it verifies a **negative**. The individual is proving the absence of a record, not the presence of one. The hash confirms: "as of [date], we have no record of [X] for this person."

### What this liberates

**Criminal record certificates**
DBS already issues these, but the certificate is paper, easily forged, and each check costs £23-44 with a multi-week turnaround. A verifiable hash from `dbs.gov.uk` would let the subject prove their clean record to multiple employers, landlords, or volunteer organisations without paying for and waiting for a fresh check each time. The time-limited salt ensures the proof expires and must be refreshed — so a subsequent conviction invalidates circulating proofs.

**No outstanding CCJs (County Court Judgments)**
Currently requires paying the Registry Trust for a certificate or obtaining a credit report. A verifiable "no CCJs registered" attestation from `registry-trust.org.uk` would be useful for rental applications, business credit, and personal finance.

**No sanctions match**
"This person is not on OFAC/EU/UK sanctions lists." Verifiable against the sanctions authority's domain. Currently, financial institutions run sanctions screening internally using commercial data feeds. A verifiable "no match" attestation from `ofsi.gov.uk` (UK) or `treasury.gov` (US) would streamline customer onboarding for banks, insurers, and professional service firms.

**Tax clearance**
"This person/company has no outstanding tax liabilities." Verifiable against HMRC. Common requirement for government contracting and some professional licensing. Currently: a letter from HMRC that takes weeks and is unverifiable by the recipient.

**No outstanding warrants**
Primarily relevant for immigration and employment in sensitive sectors. A verifiable "no outstanding warrants" attestation from a law enforcement domain. Politically sensitive but technically straightforward.

**No regulatory actions / no fitness-to-practice concerns**
For regulated professionals (doctors, lawyers, accountants, financial advisors): "No current fitness-to-practice proceedings, no conditions on registration." Verifiable against the regulator's domain (GMC, SRA, FCA). This is already publicly searchable for most professions, but a portable verifiable proof is more useful than "go search the GMC website."

**No disqualifications**
Company directors: "Not currently disqualified." Verifiable against `companieshouse.gov.uk`. Insolvency practitioners, charity trustees — same pattern via their respective registries.

### Why absence proofs need time-limited salts

Absence proofs are uniquely sensitive to staleness. A "no criminal record" proof from six months ago is meaningless if the person was convicted last week. The time-limited salt is not optional for this pattern — it's essential. The proof must expire quickly (7-14 days is reasonable) to prevent circulation of outdated clean-record attestations.

### The principle

If a regulatory or public body maintains a register of adverse records (convictions, judgments, sanctions, disqualifications), individuals who are *not* on that register should be able to prove it — without paying intermediaries, without waiting weeks, and without the proof being forgeable.

---

## Implementation: One Statute or Many?

These six patterns could be enacted as:

**One overarching statute** — a "Verifiable Attestations Act" that establishes the general principle (regulated entities must offer hash-based verification) and delegates sector-specific implementation timelines to individual regulators. This is the cleanest approach and prevents fragmentation.

**Amendments to existing sector legislation** — adding verification obligations to the Financial Services and Markets Act (insurers, banks), the Energy Act (utilities), the Education Act (schools, universities), the Health and Social Care Act (NHS, CQC), etc. This is slower but may be politically easier — each amendment rides on the back of legislation that's already understood by the relevant parliamentary committees.

**A regulatory standard, not a statute** — a government-endorsed technical standard (like the GOV.UK Design System or the Open Banking Standard) that regulators adopt voluntarily or by ministerial direction. This avoids primary legislation entirely but depends on regulatory will.

The most likely path is a combination: a short enabling statute establishing the general right and technical framework, followed by sector-specific statutory instruments setting implementation timelines. This mirrors how Open Banking was implemented — the CMA order established the principle; the OBIE developed the technical standards; individual banks implemented on a phased timeline.

---

## Cost Model

The recurring theme across all six patterns is that the **marginal cost to the regulated entity is near zero**:

- The data already exists in the entity's systems
- Hash computation is trivial (SHA-256 of normalised text)
- Hash storage is minimal (a few hundred bytes per attestation)
- Hosting is static (a GET endpoint returning a status code — no authentication, no session management, no database queries beyond key-value lookup)
- Salt generation and expiry are standard cryptographic operations

The entities that would bear the largest implementation costs are those with the oldest IT systems (some NHS trusts, small local authorities, legacy insurers). For these, a shared platform model — analogous to GOV.UK Notify or Open Banking's managed API — would amortise infrastructure costs across many issuers.

For every other entity, the cost is smaller than their annual spend on answering phone calls and processing letter requests from third parties verifying the same information manually. The mandate doesn't create new work — it automates existing work that's currently done by humans, badly, at great expense, with forgeable results.

# Use Case Data Sensitivity Categorization

## Why This Matters

Every Live Verify use case involves plaintext being hashed. That plaintext ranges from a public company rating (already on a government register) to a restraining order (disclosure could endanger safety). The sensitivity of what's in the hash input should drive:

- **Privacy salt requirements** -- Public docs need minimal salting; medical and shielded docs need aggressive salting
- **Verification response verbosity** -- Public status can echo details; sensitive docs should return only status codes
- **Enumeration resistance** -- Financial and PII docs contain guessable field values; salting must prevent brute-force reconstruction
- **Data retention guidance** -- How long verification apps should hold captured text, if at all
- **`verification-meta.json` compliance rules** -- Issuer-specified retention and handling requirements

## The Classification Tree

```
Personal
├── PII              Identity documents
├── Medical          Health and disability data
├── Financial        Income, balances, credit — your financial position
├── Transactional    Receipts, bookings — named/linked to a person
├── Transactional-Anon  Receipts, tickets — no person in the plaintext
├── Adjudicated      Court-imposed records
├── Dependent        Minors and adults under guardianship
└── Shielded         Anonymity-is-the-point

Occupational         Role credentials and working IDs

Public               Public register data
```

### Personal -> PII

**What:** Core identity documents where the plaintext contains enough to impersonate or steal an identity. Passports, driving licenses, national/state/province ID cards, birth certificates, permanent residence cards.

**Key property:** The data fields themselves enable identity theft. Name + date of birth + document number is sufficient to open accounts in many jurisdictions.

**Salt requirement:** High. Document numbers are sequential or semi-predictable; without strong salting, an attacker who knows the issuer's endpoint could enumerate valid document numbers.

**Response verbosity:** Minimal. Status only (OK / EXPIRED / REVOKED / 404). The verification response must not echo back any PII fields.

### Personal -> Medical

**What:** Health data, prescriptions, lab results, discharge summaries, disability certifications, vaccination records, medical imaging reports, clinical trial documents, immigration medical exam results.

**Key property:** The data content itself is sensitive. A diagnosis, medication name, or test result carries stigma and discrimination risk independent of who the person is.

**Salt requirement:** Very high. Medical data is a GDPR/HIPAA special category. The hash must not allow inference of condition or treatment even if the attacker knows the patient's name.

**Response verbosity:** Minimal. Status only. Some medical documents (e.g., vaccination records for border crossing) may need a narrow "confirmed: COVID-19 vaccination complete" but never diagnosis or treatment details.

### Personal -> Financial

**What:** Income, account balances, transaction amounts, credit scores, pension values, tax forms, pay stubs, bank statements, fund NAV statements, insurance claim amounts.

**Key property:** Financial figures are often guessable within a range (salary bands, round deposit amounts). Without strong salting, enumeration attacks could reconstruct approximate values.

**Salt requirement:** High. Income and balance figures have low entropy -- someone who knows "the salary is between $70k and $90k" can try every thousand-dollar increment.

**Response verbosity:** Varies. Some financial documents are designed to be shown (proof of funds for a property purchase) while others are private (credit scores). The issuer's `verification-meta.json` should specify which fields, if any, appear in the response.

### Personal -> Transactional

**What:** Purchase receipts, booking confirmations, ride-sharing receipts, hotel folios, cruise final folios, toll road receipts, travel agency invoices, gift card redemptions, refund confirmations -- where the plaintext includes something that links the transaction to a person. That link could be a card last-four (Visa ****4821), a loyalty number, a named booking, or a membership ID.

**Key property:** Individual transactions are low sensitivity. Nobody cares that you bought a latte. But the plaintext contains a person-linkable identifier (card number fragment, name, loyalty ID), and **aggregation is the real threat** -- 200 receipts reveal habits, routines, locations, dietary patterns, and movements. The location + timestamp alone places a specific person at a specific place and time, which matters for alibis, custody disputes, or surveillance.

**Salt requirement:** Moderate. Card last-four digits are guessable (only 10,000 combinations per BIN), so salting should prevent an attacker from enumerating "did card ****XXXX transact at this Starbucks today?"

**Response verbosity:** Can be moderate. Confirming "yes, this receipt is genuine" is the point -- useful for expense claims, warranty returns, tax deductions. But the response should not echo back the card fragment or loyalty number.

### Personal -> Transactional-Anon

**What:** The same transaction documents -- cash receipts, unnamed tickets, bearer vouchers -- but where the plaintext contains **no person-linkable identifier**. A cash-paid Starbucks receipt, an anonymous parking ticket, an unnumbered entry stub. The hash proves "this receipt was really issued by this merchant at this time for this amount" but cannot be tied to any individual from the plaintext alone.

**Example plaintext:**
```
Starbucks #12345
Grande Oat Milk Latte    $5.75
Date: 2026-04-12 09:14
Payment: Cash
```

**Key property:** The document is bearer-anonymous. No name, no card, no loyalty ID. Verification proves authenticity (not photoshopped, actually issued) without identifying who holds it. Useful for expense claims ("I'm claiming this $5.75 -- here's proof the receipt is real"), warranty returns, and tax deductions.

**Salt requirement:** Low. There's no person in the plaintext to protect. The transaction details (store number, amount, timestamp) are low-value individually.

**Enumeration risk:** Low. Knowing "someone bought a latte at store #12345 at 09:14" is worthless without a person to attach it to.

**Response verbosity:** Can be generous. The whole point is proving the receipt is real.

**Key warning -- verification event linkage:** The document is anonymous but the **act of verifying it** may not be. If the verification app logs "Paul's device verified Starbucks receipt #X at 09:20," the app has linked an anonymous document to a person. The spec should recommend that verification apps treat Transactional-Anon documents with the same event-logging caution as Shielded documents: don't log who verified what, only that a verification occurred.

### Personal -> Adjudicated

**What:** Records imposed by courts or tribunals, not generated by the subject. Restraining orders, protective orders, court judgments, conviction certificates, expungement records, bail bonds, custody orders, child support orders, search warrants.

**Key property:** The subject did not choose to create this data and may actively not want it known. Disclosure can have safety consequences (restraining order addresses) or reputational consequences (conviction records, especially post-expungement).

**Salt requirement:** Very high. The combination of a person's name + court jurisdiction is often enough context for a targeted enumeration attempt.

**Response verbosity:** Context-dependent. Law enforcement verification of a restraining order needs detail. Public-facing verification of an expungement certificate should confirm only that the record exists and is valid.

### Personal -> Dependent

**What:** Documents involving minors or adults who cannot consent for themselves. School pickup authorization, childcare enrollment, adoption orders, child support, guardianship orders, power of attorney over incapacitated adults, advance healthcare directives.

**Key property:** The subject cannot consent to how their data is used. Extra caution applies regardless of what the data fields contain -- a child's school enrollment is not inherently sensitive data, but it becomes sensitive because the subject is a minor.

**Salt requirement:** High. The combination of child name + school or care provider is a safeguarding concern.

**Response verbosity:** Minimal. Status only. Never echo the minor's or dependent's name or identifying details in the verification response.

### Personal -> Shielded

**What:** Use cases where the identity link itself is the secret. Anonymous accountable communications, identity escrow for personal safety, pseudonymous professional relationships, marketplace pseudonymous reputation, whistleblower protections.

**Key property:** The data fields may be mundane (a message, a rating, a report). The sensitive element is *who authored it*. The hash must never enable de-anonymization.

**Salt requirement:** Critical. Standard salting is insufficient -- the system must ensure that even the issuer's verification endpoint cannot be used to correlate a pseudonymous identity with a real one by a third party.

**Response verbosity:** Must not contain any field that could narrow down the author's identity. Status only, and the status itself should not leak timing or sequence information that enables correlation.

### Occupational

**What:** Role credentials, working IDs, trade cards, professional licenses. Gas Safe cards, taxi badges, building inspector IDs, healthcare facility staff badges, proof of employment letters, coaching certifications, security guard licenses.

**Key property:** The data is intentionally partial. The document proves a role (plumber, nurse, taxi driver) and may show a name, but deliberately omits home address, national insurance number, date of birth. The hash covers what's shown on the document, but must not enable reconstruction of the redacted identity fields the issuer holds internally.

**Salt requirement:** Moderate. The visible fields (name + license number + trade) are somewhat guessable, but the attack surface is smaller than PII because the document is designed for public-facing use.

**Response verbosity:** Can be moderate. Confirming "yes, this person holds a valid gas safe registration" is the whole point. The response should confirm the role and status but not leak fields that were deliberately omitted from the physical document.

### Public

**What:** Data already on public registers or designed for unrestricted disclosure. Company good standing certificates, food hygiene ratings, school Ofsted ratings, MOT status, planning permission status, EPC ratings, charity commission registrations, election results.

**Key property:** The data is already freely available. Anyone can look up a company on Companies House or a restaurant's food hygiene score. Enumeration resistance is moot because the register itself is public.

**Salt requirement:** Low or none. The data is public. Salting protects against nothing that isn't already available through the public register.

**Response verbosity:** Can be generous. Echoing the rating, status, and date is fine -- the point is convenience and tamper-detection, not confidentiality.

## Implications for Use Case Frontmatter

Each use case `.md` file would gain a `dataSensitivity` field:

```yaml
---
title: "Proof of Employment"
category: "Professional & Educational Qualifications"
dataSensitivity: "occupational"
slug: "proof-of-employment"
---
```

Valid values: `pii`, `medical`, `financial`, `transactional`, `transactional-anon`, `adjudicated`, `dependent`, `shielded`, `occupational`, `public`.

For documents that span multiple categories (e.g., I-864 is PII + Financial), use the **most sensitive** classification as the primary value. See Open Question 2.

## Implications for Verification Architecture

| Category | Salt | Response Detail | Retention | Enumeration Risk |
| :--- | :--- | :--- | :--- | :--- |
| **PII** | High | Status only | Minimal | High (sequential doc numbers) |
| **Medical** | Very high | Status only | None or minimal | Medium (condition + name) |
| **Financial** | High | Issuer-configured | Short | High (guessable amounts) |
| **Transactional** | Moderate | Moderate (no card/loyalty echo) | Short | Moderate (card last-four guessable) |
| **Transactional-Anon** | Low | Generous | Flexible | Low (no person in plaintext) |
| **Adjudicated** | Very high | Context-dependent | Minimal | Medium (name + jurisdiction) |
| **Dependent** | High | Status only | None | Medium (name + provider) |
| **Shielded** | Critical | Status only, no timing leaks | None | Critical (any leak de-anonymizes) |
| **Occupational** | Moderate | Role + status | Short | Low-moderate |
| **Public** | Low/none | Full detail | Flexible | Moot (public register) |

---

## Open Questions

### 1. Multi-category documents

The I-864 Affidavit of Support contains PII (names, citizenship status), Financial (income, assets), and is immigration-adjacent. Pay stubs are Financial + Occupational. Medical referral letters are Medical + PII. Should we:

- **(a)** Force a single primary classification (highest sensitivity wins)?
- **(b)** Allow a list (e.g., `dataSensitivity: ["pii", "financial"]`) and apply the union of all constraints?
- **(c)** Classify by the *hash input* specifically, not the full document? (If the hashed plaintext only contains name + employer + status, that's Occupational even if the full document also contains salary.)

Option (c) is the most precise but requires auditing what's actually inside the `verifiable-text` regions of each use case.

### 2. Occupational as a sensitivity level vs. a context

"Proof of employment" is occupational (role credential) but the hash input includes a full name, which is PII. Most occupational documents contain *some* PII by definition -- you can't prove "Jane works at HSBC" without revealing that Jane exists at HSBC. Is Occupational really a sensitivity level, or is it a *usage context* layered on top of a PII classification? If the latter, the tree should collapse to just the Personal subtree plus Public, with Occupational as a separate axis.

### 3. Public data with private consequences

A food hygiene rating of "1 -- Major improvement necessary" is public data, but it's commercially devastating to a restaurant owner. An MOT failure is public, but reveals that a specific person's vehicle is unroadworthy. Is "public" a statement about *data availability* (it's already on a register, so enumeration resistance is moot) or about *impact* (it doesn't matter if people see it)? These are different claims. We currently treat it as the former -- the data is already public, so Live Verify adds no new exposure. But should the classification acknowledge the impact dimension?

### 4. Temporal sensitivity shifts

Some documents change sensitivity over time. A restraining order is Adjudicated (very high sensitivity) while active but may become a public court record after expiration. A conviction certificate is Adjudicated until expungement, at which point its *existence* becomes the sensitive fact. An employment letter is Occupational while active but becomes stale personal data after termination. Should the classification be static per use case, or should the spec acknowledge that sensitivity can shift and recommend that issuers update salt/response behavior accordingly?

### 5. Jurisdiction-dependent classification

Health data is a GDPR special category in the EU/UK but has different (sometimes weaker) protections in other jurisdictions. A document classified as Medical in the UK might be treated with less restriction in a jurisdiction without HIPAA-equivalent law. Should the classification be jurisdiction-neutral (always apply the highest standard) or should it allow per-jurisdiction overrides?

### 6. The "workplace but obscured" pattern

Some occupational documents deliberately show partial identity -- a first name and badge number but no surname, or a photo but no name. These are designed so the *document holder* can prove their role while limiting what a bystander can learn. The hash covers exactly what's shown. But does the hash itself (a fixed string tied to a specific person's partial identity) become a persistent tracking identifier? If the same badge is scanned at multiple locations, the hash is the same each time. Should time-limited or location-salted hashes be recommended for this pattern?

### 7. Where do consent and agreement documents land?

Consent records, NDAs, data sharing agreements, and HIPAA consent forms are *about* sensitive topics but may not themselves contain sensitive data fields. An NDA's hashed text might just be "Company A and Company B agree to the following terms, signed on [date]." The sensitivity isn't in the plaintext -- it's in the *existence* of the agreement (revealing that two parties are in a commercial relationship). Is this a distinct category, or does it fall under the most sensitive topic the agreement covers?

### 8. Transactional-Anon: document anonymity vs. verification event linkage

A cash receipt contains no person. But when someone verifies it, the verification *event* can link the anonymous document to a person -- the app knows who scanned it, when, and from what device/location. This is the same tension as Shielded (anonymity-is-the-point), but for a different reason: the document wasn't *designed* to protect identity, it just happens not to contain one. Should Transactional-Anon inherit Shielded's verification-event hygiene rules (no logging who verified, no verification history)? Or is that overkill for a coffee receipt -- and if so, where's the line?

### 9. Should the classification drive UI behavior?

Beyond salt and response verbosity, should the sensitivity category influence how verification *apps* behave? For example:
- **Medical/Shielded:** App should not cache the plaintext or hash, not log the verification attempt, clear the clipboard after verification
- **Public:** App can cache freely, show in verification history, allow sharing
- **Dependent:** App should prompt for confirmation before verifying (safeguarding check)

This would require the category to be available to the client app, either via `verification-meta.json` or inferred from the response headers.

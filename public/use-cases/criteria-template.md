# Use Case Criteria and Template

This document defines the criteria for Live Verify verification use cases and the standard template for documenting them.

## What Makes a Good Use Case

A document type is a good candidate for Live Verify verification when:

1. **Paper or printable origin** - The document exists as a physical artifact or is routinely printed from digital systems. Pure-digital documents with native cryptographic verification (blockchain records, digitally-signed PDFs with intact signatures) don't need this bridge.

2. **Goldilocks claim size** - The claim is short-to-medium human-readable text that can be captured by a camera, OCR'd, normalized, and hashed. This is NOT a "hash a whole PDF" system—proof-of-existence/timestamping is valid but requires different tooling (public logs, blockchains).

3. **Sufficient entropy** - If the claim text is predictable or low-entropy, attackers can guess-and-hash to find matches. Low-entropy claims require an issuer-generated random line printed on the document.

4. **Authoritative issuer** - There's a clear issuing authority who can operate a verification endpoint bound to their domain.

5. **Non-consuming verification** - Many unconnected parties can check the same claim at different times. Verification doesn't "use up" or transfer value—it's read-only attestation. (Value-bearing instruments use statuses like REDEEMED or USED.)

6. **Revocability value** - The document's validity can legitimately change over time. Licenses get suspended, IDs get reported stolen, warranties expire, recalls evolve. Live verification shines when status matters.

7. **Fraud risk** - Forgery, alteration, or misrepresentation of the document causes real harm.

8. **Retention period** - The document has meaningful shelf life (days to permanent).

## The Parties

### Issuer (First Party)
The authority that creates and signs the document. They:
- Generate the document with verification line
- Maintain the hash database
- Operate the verification endpoint at their domain
- May submit hashes systematically to regulators or oversight bodies

Examples: banks, hospitals, universities, courts, notaries, insurers, government agencies.

### Second Party
The subject and/or first recipient of the document. They:
- Receive the original document from the issuer
- Are typically the subject of the document (their name, their data)
- Are often, but not always, the legal beneficiary
- May verify their own document to confirm it's genuine
- May pass the document onward (printed or scanned) to third parties

The second party is the person the claim was originally passed to. They verify "Is this document about me actually what the issuer sent?" Or at least "mine" somehow.

Examples: the employee (reference letter), the patient (lab results), the property owner (deed), the policyholder (insurance policy), the borrower (loan documents).

Note: "Beneficiary" is often inaccurate. A borrower is the subject of loan documents but is an obligor. A judgment debtor receives the court order against them—they're the second party but decidedly not the beneficiary. The second party is defined by receipt and subject matter, not by whether the document is favorable to them.

### Third Parties
Anyone who receives the document after the second party, or who receives hashes systematically. Third-party verification happens in two modes:

**Ad-hoc verification:** Someone presents a document, the third party scans and verifies.
- Employer verifying a job applicant's degree
- Landlord verifying a tenant's pay stubs
- Bank verifying a customer's identity document (KYC)
- Court verifying an expert witness report

**Systematic hash receipt:** By statute, regulation, or contract, issuers submit hashes in bulk to oversight bodies. These third parties may never see original documents—they maintain verification capability for audits, compliance, or future disputes.
- Banks submit statement hashes to regulators (Fed, OCC, FDIC)
- Insurers submit policy hashes to state insurance commissioners
- Clinical trial sponsors submit consent hashes to FDA
- Pharmaceutical companies submit batch record hashes to regulators
- Professional licensing boards share credential hashes

Systematic recipients often receive hashes in merkle trees or batch submissions, enabling efficient verification of large document populations.  Maybe a blockchain or maybe something that merkle tree-like but without distributed byzantine concensus features.

## Trust Model

**"Verified" means issuer attestation, not universal truth.** The verification confirms what that issuer stands behind *now*—issuers can be wrong, out-of-date, or compromised.

- The issuer chooses a domain name (their web identity). The `verify:` line binds the claim to that domain.
- The verifier decides whether that domain is an authority for the kind of claim being checked. This decision is often encoded as organizational policy or allowlists.
- The UI should always show the full domain clearly so humans can spot lookalikes or typosquats.

**Privacy by design:** OCR, normalization, and hashing happen on the verifier's device. The network call is a minimal GET for hash lookup—no "upload scans to a portal" pattern. Verification responses should use short status codes rather than person-specific plaintext.

## Template Structure

Each use case document includes YAML frontmatter with these fields:

```yaml
---
title: "Document Type Name"
category: "Category Name"
volume: "Medium"
retention: "7-10 years (reason)"
slug: "document-type-name"
verificationMode: "clip"
tags: ["tag1", "tag2"]
furtherDerivations: 0
---
```

### verificationMode

How the *verifier* typically encounters the document — far from the portal that originated it:

- **`"clip"`** — The verifier has the document on screen (a forwarded PDF, an emailed attachment, a screenshot) and selects the verification text. This is the default for most use cases.
- **`"camera"`** — The verifier is looking at a physical document in front of them (a badge, a posted sign, a card, a printed receipt) and uses the device camera with OCR.
- **`"both"`** — The document surfaces both ways depending on context (e.g., professional licenses: wallet card shown in person = camera, PDF forwarded from a state registry = clip).

Each use case document should include:

```markdown
# [Document Type]

**Category:** [Category name]
**Volume:** [Very Small / Small / Medium / Large / Very Large]
**Retention:** [Typical retention period and why]

## Data Verified

[List the data elements captured in the verification line. These are the text elements that become part of the hash—NOT visual elements like seals, watermarks, or photos.]

**Document Types:** [If multiple subtypes exist, list them]

[Any special considerations: multi-page handling, privacy salt, OCR challenges]

## Data Visible After Verification

Shows the issuer domain and the responder text.

**Status Indications:**
- **[Status]** - [What it means]
[List all relevant statuses: Valid, Expired, Revoked, Superseded, etc.]

[Any additional information the verification response might include]

## Second-Party Use

[How does the document subject/recipient benefit from verification?]

**[Use case]:** [Description]
[List 3-5 key second-party verification scenarios]

## Third-Party Use

[Organize by stakeholder type. For each:]

**[Stakeholder Category]**

[Context for this stakeholder type]

**[Specific use]:** [Description]
[List 3-5 verification scenarios for this stakeholder]

[Repeat for all relevant third-party categories]

## Verification Architecture

**The [Document Type] Fraud Problem**

[Describe the specific fraud patterns this verification addresses:
- Fabrication (entirely fake documents)
- Alteration (genuine documents with modified content)
- Impersonation (documents falsely attributed to legitimate issuers)
- Expired/revoked presented as current
- Page substitution (for multi-page documents)
- Other document-specific fraud patterns]

**[Issuer Type] as Issuers**

[Who issues these documents and operates verification endpoints?]

[List major issuer categories with examples]

**[Integration/Compliance Topic]**

[Relevant standards, regulations, or system integrations]

[Additional architecture sections as needed for the document type]
```

## Special Considerations

### Multi-Page Documents
For documents routinely exceeding a few pages (contracts, reports, policies), note that per-page verification prevents page substitution attacks. Each page carries its own verification line. A final page would list all the hashes of the prior pages and its own verification link. Or a maybe not the last page.

### Privacy Salt
For documents containing sensitive personal information where hash enumeration attacks are a concern (identity documents, medical records, immigration documents), note that issuers should add random salt lines to raise entropy.

### OCR Challenges
For documents with decorative typography, handwriting, or complex layouts (art certificates, historical documents), note any special considerations for OCR-optimized design. Screens can introduce moiré artifacts; platform-native camera stacks typically outperform browser-based OCR demos. For ornate certificates, consider publishing an OCR-friendly representation (short-form claim on a letter, wallet card, or transcript extract).

### Seals, Stamps, and Visual Elements
Physical security features (embossed seals, ink stamps, holograms, photos) are NOT part of the OCR verification. These remain as anti-forgery features on the physical document. Only text elements appear in the verification line.

### Privacy-Preserving Credentials for High-Volume Workers

For workers with frequent, brief public interactions (50+ per day), full name exposure on badges creates unnecessary privacy risk. Their credentials are visible to every customer, passerby, and doorbell camera.

**Use "First Name + Last Initial + ID" format when:**
- Interaction duration is brief (under 2 minutes)
- Worker completes 50+ interactions daily
- Badge is visible to many strangers, not just the person being served
- Full accountability can be maintained via employer records

**Examples fitting this pattern:**
- Delivery drivers (100-300 stops/day, 10-30 seconds each)
- Meter readers (50+ properties/day, 30-60 seconds each)
- Parking enforcement (dozens of citations/day, often confrontational)
- Courier workers (100+ deliveries/day)
- Food delivery (gig workers with high volume)

**Badge shows:** `Marcus M 1847` (first name, last initial, ID number)

**Verification returns:** Photo, current duty status, current task context (e.g., "Currently delivering to 221B Baker St"), employer domain

**Why this works:**
- Recipient gets what they need: photo match + confirmation worker is legitimate
- Worker privacy protected: full name not broadcast to hundreds of strangers daily
- Accountability preserved: employer maintains full identity records
- Audit trail intact: all verifications logged with hash, timestamp, IP
- Law enforcement access: full identity available when needed

**This pattern applies broadly** — even for longer interactions (tour guides, healthcare visitors, childcare providers, social services workers), the photo return + current assignment context provides the trust. The surname adds little value but increases privacy exposure.

**Full names only when legally required:**
- Police officers (public accountability statutes in many jurisdictions)
- Elected officials, court officers, notaries (legal identity requirements)
- Situations where the person's full legal name is itself the verified claim

The principle: photo match + verified current assignment + employer domain is what builds trust. Surnames are rarely necessary and create unnecessary exposure.

### Photo in Verification Responses

Some use cases return a photo of the subject in the 200 response — worker badges, ID cards, professional licences verified in person. The photo is central to trust: the verifier compares the face in front of them to the face on screen. But whose photo is it, and who controls when it appears?

#### Why server-authoritative photos

A photo printed or displayed on a physical card can be forged. Print a fake card with a stranger's photo but a real verification code, and the verifier sees a "valid" result next to a face that matches the card — but not the real holder. The card is lying; the server is not.

When the photo comes back in the verification response, it is controlled by the issuer. The verifier trusts the server, not the artifact. This is the difference between card-authoritative and server-authoritative identity binding: the card says "this is what the holder looks like", but only the server can prove it.

#### Four photo availability models

**1. Always-on** — every successful hash lookup returns the photo. Simplest to implement, no coordination required. Appropriate for worker credentials where the employer controls the endpoint and the worker is on duty. Risk: a stolen card or leaked hash allows unlimited photo lookups until the credential is revoked.

**2. Consent-gated** — the photo is only available during a short window that the subject explicitly opens. Two mechanisms achieve this:

- **Phone-app gating:** the subject opens the issuer's app and presses "allow verification", making the photo available for a short window (e.g. 2 minutes). Requires the subject to have a working phone. Works with any card — even static plastic.
- **Rotating-salt gating:** the card has an active display (e-Ink or screen) showing a salt that rotates periodically or per-session. The hash changes with the salt, so only the currently-displayed code resolves to a photo. The subject doesn't need to tap an app — but the display's microcontroller still needs to learn the current salt, either via its own cellular/NFC radio or by Bluetooth-syncing from the subject's phone. The phone interaction moves from "press allow" to "be nearby with Bluetooth on", which is less friction but not zero dependency.

Both achieve the same goal: the photo is only retrievable when the subject is present and has initiated the verification. Outside that window, the endpoint returns status but no photo. Appropriate for personal ID where the subject should control when their face is exposed.

**3. Guardian-gated** — the subject cannot self-authorise (children, dependants), so a guardian provides the consent action. The child carries a physical card with a hashable code; verification requires a parent or teacher to approve.

Two flows depending on context:

- **Device enrolment:** a child gets a new device (Mac, Chromebook, tablet). The child presents their card to the OS account-setup wizard, which reads the verification line (via camera OCR or typed input), computes the hash locally, and calls the school's live-verify endpoint. The parent receives a push notification or approval prompt and hits "approve" — the photo and status are released to the setup flow, binding the device account to the verified child. The parent is the consent gate, not the child.
- **In-person check-in:** the child presents their card at a school gate, library terminal, or activity check-in. The system reads the verification text, hashes it, and sends an approval request to the parent's or teacher's device. Photo is released only after the guardian approves. The consent action stays with the adult.

The key distinction from model 2: the person carrying the card and the person authorising photo release are different people. The child's card is always hashable, but the photo is gated behind a guardian's device, not the child's.

**4. Hybrid** — status is always returned (VALID / EXPIRED / REVOKED), but the photo only appears during a consent window (phone-app, rotating-salt, or guardian approval). The verifier always learns whether the card is genuine; they only see the face match when the holder (or their guardian) has activated it. This separates document authenticity from identity binding.

#### When each model fits

| Model | Fits when | Examples |
|-------|-----------|----------|
| Always-on | Employer is the issuer, worker is on duty, verifier is a member of the public | Delivery drivers, hotel staff, field workers, meter readers |
| Consent-gated (phone) | Subject is a private individual, has a phone, card is static plastic | Age verification at venues, professional licences shown in person |
| Consent-gated (rotating salt) | Subject is a private individual, card has active display (e-Ink/screen) with connectivity or phone sync | Personal ID cards with e-Ink, next-gen professional credentials |
| Guardian-gated | Subject cannot self-authorise (child, dependant), guardian provides consent | School credentials, child device enrolment, youth activity check-in |
| Hybrid | Status matters independently of identity binding | Any case where "is this card genuine?" and "does this person match?" are separable questions |

#### Screenshot prevention

A verification app that displays a photo response should prevent screenshots and screen recording. Without this, a verifier (e.g. a bouncer carding 500 people per night) could systematically harvest photos — creating a face database the subjects never consented to.

Platform APIs: iOS `UIScreen.isCaptured` (detect and hide content), Android `FLAG_SECURE` (block capture at the window level). These are not bulletproof — a second camera defeats any software measure — but they raise the bar from trivial to deliberate, which matters for policy enforcement.

#### When photo responses are appropriate

Photo responses belong in **camera-mode** verification, where a human is comparing the face in front of them to the face on screen. They are not appropriate for:

- **Clip-mode** verification — the verifier is looking at a document on screen, not a person. There is no face to compare.
- **Batch / systematic** verification — regulators checking hashes against a list don't need photos. Returning photos in bulk would be a privacy violation with no security benefit.

### Real-Time vs. Batch Verification
Some use cases require real-time verification (insurance at point of claim, credentials at security checkpoint). Others can tolerate batch processing (regulatory audits, periodic compliance checks). Note timing requirements where relevant.

### Systematic Hash Submission
Where issuers routinely submit hashes to regulators or oversight bodies (by statute or contract), describe:
- Who receives the hashes
- In what format (raw list, merkle tree, blockchain - public or not)
- For what purpose (audit, compliance, dispute resolution)
- Any third-party witnesses or attestation requirements
- When audits apply, what is the nature of those?

### Infrastructure Requirements
Hash lookups can be served from static web hosting—no login required to answer "does this hash exist?". The commercial value is typically in integrations, governance, uptime, and tooling around publication/revocation, not the HTTP pattern itself.

## Volume Guidelines

- **Very Small:** Hundreds to low thousands per year globally
- **Small:** Thousands to tens of thousands per year
- **Medium:** Tens of thousands to hundreds of thousands per year
- **Large:** Hundreds of thousands to millions per year
- **Very Large:** Millions to billions per year

## Retention Guidelines

Document why the retention period matters:
- Regulatory requirement (cite regulation if known)
- Statute of limitations
- Business/audit cycle
- Permanent records (vital records, property, credentials)

## Writing Effective Use Case Descriptions

### Second-Party Use Section

Focus on how the document **subject** (the person named in the document) benefits from verification. Examples:

- **Self-verification:** "I received this diploma, is it genuine?" (student/graduate)
- **Proof of status:** "I need to prove my license is valid" (professional holding credential)
- **Insurance/liability:** "I want verified records of this transaction for my protection" (transaction party)
- **Estate/financial planning:** "I need to verify my ownership documents are authentic" (property/asset owner)
- **Dispute resolution:** "I'm disputing a claim and need to verify my original documents" (contract party)

**Key insight:** The second party often wants verification for their own peace of mind, legal protection, or to support their own claims to third parties.

### Third-Party Use Section

Organize stakeholders by **decision-making function**, not just title. Common categories:

**Financial/Lending Decisions**
- Banks, mortgage lenders, credit institutions
- Insurers, underwriters
- Investment platforms, crowdfunding platforms
- Verify creditworthiness, fraud risk, asset valuation

**Regulatory/Compliance**
- Government agencies, regulators
- Tax authorities, customs
- Professional licensing boards
- Verify legal compliance, tax liability, credential validity

**Employment/Credential Verification**
- Employers, HR departments
- Educational institutions, credentialing bodies
- Security clearance authorities
- Verify qualifications, background, authorization

**Professional Services**
- Lawyers, accountants, advisors
- Real estate professionals, title companies
- Insurance professionals, claims adjusters
- Verify facts, authenticity, damage, claims basis

**Commerce/Transaction**
- Buyers, sellers, auction houses
- Freight forwarders, customs brokers
- Retailers, e-commerce platforms
- Verify ownership, condition, compliance, authenticity

**Healthcare/Insurance**
- Hospitals, clinics, insurance companies
- Clinical trial sponsors, pharmaceutical companies
- Health departments, public health authorities
- Verify medical facts, treatment authorization, trial compliance

### Fraud Pattern Categories

When describing "The [Document Type] Fraud Problem," consider these patterns:

**Structural Fraud**
- **Fabrication:** Entirely fake documents created from scratch
- **Alteration:** Genuine documents with modified text, dates, amounts, names
- **Page substitution:** In multi-page documents, swapping pages from different documents
- **Partial forgery:** Genuine document template with forged signatures or certifications

**Attribution Fraud**
- **Impersonation:** Fake document falsely claiming to be from legitimate issuer
- **Authority misrepresentation:** Document falsely claiming higher authority or broader scope
- **Counterfeit authority:** Fake credentials, licenses, or authority documents
- **Delegated fraud:** Unauthorized person signing in official capacity

**Temporal Fraud**
- **Expired/revoked documents:** Presenting invalid documents as current
- **Backdating:** Antedating documents to appear created earlier
- **Forward dating:** Postdating to appear newer or avoid expiration
- **Sequence violations:** Violating required timing (e.g., expiration before renewal)

**Value/Scope Fraud**
- **Quantity inflation:** Overstating numbers, volumes, or quantities
- **Qualification inflation:** Claiming higher credentials or certifications than issued
- **Scope expansion:** Stretching authorized uses beyond permission
- **Category misclassification:** Presenting document as different, more valuable type

**Authority/Legitimacy Fraud**
- **Fake issuer:** Document from entirely fraudulent organization
- **Rogue issuer:** Legitimate issuer acting outside authority or against regulations
- **Chain-of-custody fraud:** Documents presented by unauthorized intermediary
- **Verification endpoint fraud:** Fake verification responses from impostor domains

**Document-Specific Patterns**

Different document types face category-specific fraud:

- **Travel documents:** Fake passports, visa fraud, status misrepresentation
- **Medical records:** Fabricated diagnoses, altered prescriptions, fake test results
- **Financial/tax:** False income claims, fabricated transactions, altered amounts
- **Real estate:** Title fraud, forged deeds, false ownership claims
- **Shipping/cargo:** Fake bills of lading, cargo theft, misdeclaration
- **Insurance:** False claims, fabricated losses, agent misrepresentation
- **Professional licenses:** Credential inflation, fake education, unauthorized practice

### Status Indication Patterns

Different document categories typically support different statuses. Common patterns:

**Standard Statuses** (apply to most documents)
- **Valid** — Document verified and current
- **Expired** — Document has reached end of validity period
- **Revoked** — Document has been actively cancelled/withdrawn
- **Superseded** — A newer version issued (ownership change, renewal, update)

**Financial/Insurance Documents**
- **Paid** or **Settled** — Claim/transaction completed
- **Disputed** — Under investigation or dispute
- **Suspended** — Temporarily inactive (premium non-payment, etc.)
- **Cancelled** — Active revocation (different from natural expiration)

**Professional/Credential Documents**
- **Suspended** — Temporarily inactive (due to investigation, non-renewal, etc.)
- **Probationary** — Valid but under conditions or supervision
- **Restricted** — Valid but with limitations
- **Contested** — Authenticity or validity under dispute

**Legal/Court Documents**
- **Stayed** — Execution paused pending appeal
- **Appealed** — Under appellate review
- **Dismissed** — Vacated or overturned
- **Satisfied** — Judgment paid/fulfilled

**Medical/Healthcare Documents**
- **Updated** — Newer version available (prior version superseded)
- **Withdrawn** — Provider withdrew/disavows document
- **Amended** — Original document modified with addendum

### Merging Related Document Types

Sometimes multiple JSON files represent related subtypes of a single overarching category. Consider merging when:

1. **Same issuer:** Same authority issues both document types
2. **Same subject:** Person/entity is the beneficiary in both
3. **Same fraud risk:** Both face identical fraud patterns
4. **Same verification use case:** Third parties verify both for same decision

Example merges:
- "Car rental damage report" + "car rental agreement" → "Car rental documents"
- "Bank statement" + "Bank account opening" → "Bank account documents"
- "Airline ticket receipt" + "Airline upgrade confirmation" → "Airline booking documents"
- "Employment reference letter" + "Employment verification letter" → "Employment verification documents"

Keep separate when document types serve fundamentally different purposes or audiences.

### Writing Clear Use Case Scenarios

Good use case scenario format:

```markdown
**[Scenario Title - Action Verb + Object]:** [1-2 sentence description]
```

**Strong examples:**
- "**Account Opening Verification:** Bank verifies employment history on mortgage application."
- "**Credential Verification at Checkpoint:** Security officer scans professional license during background check."
- "**Insurance Claims Investigation:** Claims adjuster verifies damage report matches original inspection."

**Weak examples:**
- "Verify documents" (too vague)
- "Uses for third parties" (not a use case)
- "Could be used in business" (not specific)

Each scenario should answer: **Who** (stakeholder) **does what** (action) **with** (document) **for why** (business purpose).

### Domain-Specific Structuring

Organize Third-Party stakeholders based on **document domain**:

**Legal/Compliance Domains:**
- Law enforcement / prosecutors
- Courts / judges
- Government regulators
- Compliance officers / risk management

**Financial/Business Domains:**
- Lenders / underwriters / investors
- Insurers / claims adjusters
- Accountants / auditors
- Tax authorities

**Healthcare Domains:**
- Hospitals / clinics / providers
- Insurance companies (health)
- Regulatory bodies (FDA, DEA, etc.)
- Public health authorities

**Travel/Immigration Domains:**
- Immigration authorities
- Border agents / customs
- Airlines / travel providers
- Visa sponsors / employers

**Real Estate Domains:**
- Real estate agents / brokers
- Title companies / escrow
- Lenders / appraisers
- County recorders / assessors

**Supply Chain Domains:**
- Freight forwarders / carriers
- Customs brokers
- Insurers / loss adjusters
- Port authorities / customs

**Education Domains:**
- Employers / HR
- Graduate schools / universities
- Licensing boards
- Credential verification services

## Common Objections

**"Why not QR codes?"** — QR is great when machine reading is primary. Live Verify is for documents that must stay human-readable first, without adding visual clutter or requiring proprietary apps.

**"Isn't this just a hash in public?"** — Yes: a one-way fingerprint. Safe when the input has enough entropy or includes an issuer-generated random line.

**"Doesn't this prove truth?"** — No. It proves issuer attestation at a domain. The verifier still decides whether that domain is an authority for the claim.

**"Couldn't someone just copy the text?"** — Copying text only helps if the issuer still attests to that exact normalized hash. Revocation and random-line hardening are the defenses against replay/guessing attacks. Note: the hash is not personal data, but the plaintext claim may be. In jurisdictions with GDPR-like legislation, anyone storing copied plaintext containing PII must meet those requirements—the hash-based approach means verifiers can check and discard without retaining PII. Caveat: not all jurisdictions have such legislation, and some entities (notably governments) won't honor DSAR or right-to-be-forgotten requests regardless of the requester's home jurisdiction.


## Jurisdictional Witnessing (Optional)

Include this section only when the use case genuinely benefits from an independent witness layer, or when a jurisdiction, contract, or regulator specifically requires one. Do **not** include it by default.

When this section is present, keep the claims narrow:
- State who would receive hashes and why
- Explain what the witness adds beyond direct issuer-domain verification
- Avoid asserting regulator requirements unless they are specific to the use case
- Treat public-blockchain rollups as an optional implementation detail, not the default architecture

Good fits:
- High-dispute records where independent timestamping matters
- Multi-party workflows where the issuer is not trusted to be the sole historian
- Cross-border or cross-regulator settings where an external audit trail adds real value

Poor fits:
- Straightforward issuer-attestation documents where the issuer endpoint is already the source of truth
- Use cases where the witness layer is speculative and not needed to explain the trust model

---

> **A note on competing technologies:** This system is built on text-to-hash — human-readable text, captured by camera or clipped, normalised and hashed. NFC and QR codes may be better solutions for many of these use cases, and are at the least competitive. We don't integrate with either; we operate in the low-fi layer where the credential is printable text and the verifier needs nothing more than a camera or a keyboard.

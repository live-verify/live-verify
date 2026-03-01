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


## Jurisdictional Witnessing

A jurisdiction may require the issuer to retain a **witnessing firm** for regulatory compliance. The witnessing firm:

- Receives all hashes from the issuer, and any subsequent changes to the payload as they happen—which may manifest as a new hash, a status change, or even a 404 (record deleted)
- Receives structured content/metadata (key identifiers and dates)
- Does **NOT** receive plaintext or sensitive personal information
- Provides an immutable, timestamped audit trail—available to the jurisdiction on demand, to document holders/third parties during disputes, or as expert witness testimony in legal proceedings

This provides:
- **Non-repudiation:** Issuer cannot deny issuing the document
- **Timestamp proof:** Document existed at a specific time
- **Regulatory audit:** Jurisdictions can inspect the witness ledger for fraud detection
- **Resilience:** Verification works even if issuer's systems go down

**Public Blockchain (Non-Party)**

Witnessing firms may periodically commit rollups to an inexpensive public blockchain, providing an ultimate immutability guarantee. The blockchain is a "non-party"—infrastructure, not a participant in the transaction. This creates multiple verification paths:

1. **Issuer domain** — Direct check against the issuer
2. **Witnessing firm** — Independent confirmation with timestamp
3. **Public blockchain** — Decentralized trust anchor via rollup inclusion

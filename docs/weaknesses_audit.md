# Weaknesses Audit

A critical review of Live Verify's documentation, protocol specification, and use case library. Organized by severity. Written to anticipate what a skeptical technical reviewer, investor, or standards-body representative would push back on.

---

## Tier 1: Structural / Protocol-Level

### 1. Normalization is the Achilles' heel

The entire protocol depends on independent parties computing identical hashes from the same document text. [NORMALIZATION.md](NORMALIZATION.md) specifies rules for whitespace, Unicode quotes, dashes, and border artifacts — but:

- **No collision analysis.** Can two meaningfully different documents produce the same hash after normalization? The spec doesn't address this.
- **Ligatures, diacritics, and Unicode edge cases.** `é` has multiple Unicode representations (precomposed U+00E9 vs. decomposed U+0065 U+0301). NFC normalization handles this, but many scripts have ambiguities NFC doesn't resolve (e.g., Turkish İ/I, German ß/ss, Japanese fullwidth/halfwidth).
- **OCR misreads are invisible.** If OCR reads "B" as "8" or "rn" as "m", normalization can't fix it — the hash won't match. The user sees a 404 indistinguishable from a forgery. No retry guidance beyond "reposition and scan again."
- **Issuer-side normalization must match exactly.** The spec says "organizations must document their normalization rules" but provides no conformance test suite. An issuer who normalizes slightly differently from the client will produce hashes that never verify.

**What's needed:** A conformance test corpus — 50+ text samples with expected normalized output — that issuers and client developers can test against. Possibly a reference implementation in multiple languages.

### 2. OCR fragility undermines the "anyone can verify" claim

The README says: *"Anyone can verify any document presented to them — no special equipment, no credentials."* But Camera mode has known bugs (Tesseract.js WASM issue #1), fails on ornate typography, fails on screens (moiré), and has no fallback when it fails.

A 404 from OCR error is indistinguishable from a forgery. The person holding a genuine document sees "NOT FOUND" and has no recourse except to reposition and retry — which doesn't help if the problem is a font the OCR engine can't read.

Clip mode (select text digitally) works reliably. Camera mode is presented alongside it as if they're equivalent, but they're not.

### 3. 404 is ambiguous

A `404` hash lookup could mean any of:

1. **Forged document** — never hashed by any issuer
2. **OCR error** — correct document, wrong hash computed
3. **Issuer deleted the record** — was valid, now removed
4. **Issuer's server is down** — returning 404 for all requests
5. **Normalization mismatch** — issuer and client normalized differently

The spec says "some 404s will happen after OCR errors in the camera apps, and people will get used to trying again after repositioning the phone." This conflates a serious security signal (forgery) with a routine UX hiccup (OCR noise). A verifier who dismisses a 404 because "OCR is flaky" may accept a forged document.

### 4. Cold-start / adoption has no strategy

The spec assumes issuers will stand up verification endpoints. But:

- **No incentive analysis.** Why would a small employer, a local court, or a landlord implement this? They face no consequences for issuing unverifiable documents today.
- **Chicken-and-egg.** Users need verified documents to benefit. Issuers need demand before investing. No bootstrap strategy is described.
- **Deployment burden.** The spec assumes every issuer can maintain a high-availability endpoint that handles traffic, implements rate limiting, manages a hash database, and complies with relevant data regulations. Most issuers can't.

The SaaS verification provider model ([SAAS-VERIFICATION-PROVIDERS.md](SAAS-VERIFICATION-PROVIDERS.md)) partially addresses this — an issuer can delegate to a provider — but the bootstrap problem remains: why would the first issuers adopt?

### 5. Issuer availability is a single point of failure

If an issuer's verification endpoint goes down, all their documents become unverifiable. The witnessing firm provides a secondary path, but the witnessing spec is incomplete (see Tier 2, item 10).

For high-stakes scenarios (search warrants at 3 AM, restraining orders verified by police, EAD cards at immigration), "endpoint is temporarily unavailable" is not an acceptable answer.

### 6. The lying issuer problem

The authority chain confirms that an issuer is *a legitimate entity* (e.g., HSBC is a registered PAYE employer). It does not confirm that the *specific claim* is true. If HSBC hashes a document saying "Jane Worthington, VP Global Markets" but Jane actually left six months ago, the authority chain still shows green.

The protocol assumes issuers will revoke stale claims. There is no mechanism to detect an issuer who simply doesn't bother revoking, or who issues claims about people who never worked there.

---

## Tier 2: Specification Gaps

### 7. Authority chain termination is underspecified

The spec says clients should "hard-code two lists" — sovereign jurisdictions (~190–195) and treaty-based international organizations (~20–30). But:

- **No canonical list is provided.** The spec describes the concept but doesn't ship the data.
- **No implementation guidance** for what happens when a chain exceeds three levels (error? truncate? accept?).
- **Chain spoofing mitigation** relies on the verifier recognizing that `hmrc.scammer.com` is not `hmrc.gov.uk`. This is correct but not explicitly spelled out — a developer implementing this might not realize domain validation is the defense.

### 8. Privacy salt is inconsistent across use cases

Different use cases describe salting with different levels of urgency and different mechanics:

- EAD: *"ABSOLUTELY CRITICAL. Immigration data is a high-value target"*
- Biometric Likeness Claims: *"The single-use salt IS the privacy mechanism"*

But no use case specifies: minimum salt entropy, salt generation method, whether salts are per-user or per-request, or what "single-use" means operationally (who generates, who stores, when does it expire?).

### 9. Retention headers have no client implementation path

The retention headers system (`X-Verify-Retain-Until`, `X-Verify-Retain-Reason`, etc.) is well-specified on the server side. But:

- **How do clients "preserve" results?** iOS, Android, and browsers have completely different storage models. No guidance is given.
- **Legal weight is asserted but not tested.** The spec says the GET request is "strong presumption" of receipt but provides no legal analysis or case law.
- **Auto-verification muddies the evidence.** If software auto-verifies on a schedule (as described in the subjects taxonomy), the GET proves a *system* contacted the endpoint, not that a *person* engaged with the document.

### 10. Jurisdictional witnessing is vaporware

Nearly every use case (422 of 437 files) includes an identical "Jurisdictional Witnessing" section — word-for-word boilerplate. It describes:

- A witnessing firm receiving hashes
- Periodic rollups to a public blockchain
- Three verification paths (issuer, witness, blockchain)

But none of this is specified:

- **Which blockchain?** Not named.
- **Who pays?** Issuers? Witnesses? Users? Not addressed.
- **How are rollups verified by clients?** No spec.
- **What SLA does the witness provide?** Real-time? End-of-day? Not stated.
- **What happens if issuer and witness disagree?** No dispute resolution mechanism.
- **Why is a blockchain needed if the witness is trusted?** Not explained.

The witnessing concept is promising, but it reads as aspirational rather than implementable. The [WITNESSING-THIRD-PARTIES.md](WITNESSING-THIRD-PARTIES.md) document adds party-model context but doesn't resolve these gaps.

### 11. Multi-page contract verification is underspecified

Contracts use per-page verification with a "rollup hash of all prior pages on the signature page." But:

- No specification of the rollup mechanism (Merkle tree? concatenation? hash-of-hashes?)
- No handling for out-of-order pages
- No collision analysis for the rollup
- Amendment handling says amendments "reference the original" but doesn't specify the linking mechanism

### 12. No threat model document exists

The project has no dedicated threat model. These attacks are unanalyzed:

- **Replay attacks** — captured verification URLs replayed later
- **DNS/BGP hijacking** — intercepting verification requests at the network level
- **Issuer infrastructure compromise** — hacked endpoint serves fake verifications
- **Insider threats** — issuer employees issuing unauthorized hashes
- **Enumeration via timing** — response time differences between "hash exists" and "hash not found"
- **Key management** — the spec implies cryptographic proof but specifies no key infrastructure

### 13. No liability framework

If verification produces a wrong result and someone is hired/evicted/denied service/searched illegally:

- Is the issuer liable?
- Is the verifier app developer liable?
- Is the witnessing firm liable?
- Is the relying party liable for trusting a verification?

The spec is silent.

---

## Tier 3: Consistency and Presentation

### 14. Status codes are wildly inconsistent across use cases

Each use case invents its own status vocabulary with minimal overlap:

| Use Case | Statuses |
|----------|----------|
| EAD | `verified`, `PENDING_RENEWAL`, `revoked`, `EXPIRED`, `404` |
| Absence certificates | `Clear`, `Expired`, `Superseded`, `Partial` |
| Contracts | `Executed`, `Pending Signature`, `Amended`, `Terminated`, `Expired`, `Disputed` |
| Consent records | `Active`, `Withdrawn`, `Expired`, `Superseded`, `Partial` |
| B2B credit | `Active`, `Expired`, `Revoked`, `Suspended`, `Superseded` |
| Delivery workers | `On Duty`, `Verified`, `Inactive`, `Fraud Alert` |

The Verification Response Format doc defines universal statuses (`verified`, `EXPIRED`, `revoked`, `SUPERSEDED`) and sector-specific extensions, but many use cases don't follow this convention — using `Active` vs `verified`, `Clear` vs `verified`, `Verified` vs `verified`.

No client guidance exists for handling unknown status codes.

### 15. `verify:` vs `vfy:` prefix inconsistency

Three different URL prefix conventions appear across the codebase:

- `verify:domain.com/path` — most common, used in majority of use cases
- `vfy:domain.com/path` — used in e-ink badge use cases (police, hotel staff, delivery workers, etc.)
- `verify://domain.com/path` — appears in delivery-courier-verification.md

The docs/NORMALIZATION.md spec mentions both `verify:` and `vfy:` as valid. But the coexistence is never explained — when should an issuer use which? Is `verify://` (with `//`) valid?

### 16. Jurisdictional witnessing boilerplate across 422 files

The identical witnessing section is pasted into 422 of 437 use case files. It is never tailored to the specific use case. A bail bond and a restaurant hygiene rating have the same witnessing requirements — which is implausible.

This should either be extracted into a single referenced document (which [WITNESSING-THIRD-PARTIES.md](WITNESSING-THIRD-PARTIES.md) partially is) or each use case should have a sentence explaining what witnessing means for *that specific* scenario.

### 17. Aspirational features presented as current

Several features are described in the present tense as if they exist, but have no implementation:

| Feature | Described In | Implementation Status |
|---------|-------------|----------------------|
| E-ink ID cards with rotating salts | Technical_Concepts.md, e-ink-id-cards.md | No prototype, no hardware spec |
| Authority chain verification | Verification-Response-Format.md | Concept only; no root authority lists shipped |
| Blockchain witnessing rollups | 422 use case files | No blockchain named, no rollup spec |
| SaaS verification providers | SAAS-VERIFICATION-PROVIDERS.md | Market analysis, not a working service |
| Biometric liveness detection | biometric-likeness-claims.md | Mentioned, not specified |

The README does state "Proof of concept" and "Prototype" — but deeper in the docs, the aspirational language blurs with specification language.

### 18. README doing too many jobs

The README serves as pitch document, technical specification, tutorial, FAQ, comparison matrix, and use case overview. It's very long and mixes audiences. An investor, a developer implementing an endpoint, and a user trying the browser extension all read the same document.

### 19. Copy-paste drift in use cases

Beyond the witnessing boilerplate, many use cases share near-identical structures with minor variations that suggest template expansion without review:

- "Privacy Salt" sections range from "ABSOLUTELY CRITICAL" to a few sentences, with no consistent format
- "Competition" tables sometimes compare to specific existing systems, sometimes list generic alternatives
- HTML mockups vary in quality from detailed multi-field documents to minimal sketches

### 20. `photo_url` has a double-brace typo

In `docs/Verification-Response-Format.md` line 79:

```json
"photo_url": "/photos/{hash}}.jpg"
```

There's an extra `}` — should be `/photos/{hash}.jpg`.

---

## Tier 4: Regulatory and Legal Gaps

### 21. No eIDAS / eSignature regulation alignment

The EU's eIDAS regulation defines what constitutes admissible electronic evidence. Live Verify's verification model doesn't map to any eIDAS trust level (simple, advanced, qualified electronic signature). The spec doesn't explain whether it's complementary to eIDAS, an alternative, or orthogonal.

### 22. GDPR/HIPAA compliance claimed but not proven

Several use cases reference GDPR (consent records, data sharing agreements) and HIPAA (patient consent, discharge summaries). But:

- No mention of Data Processing Agreements (DPAs) between issuers and any service components
- No mention of HIPAA Business Associate Agreements (BAAs)
- No analysis of whether hashed personal data constitutes "personal data" under GDPR (it can, depending on whether the hash is reversible in context)

### 23. Service of process is legally questionable as framed

The retention headers section describes serving court summons via Live Verify. The spec now correctly calls the GET request "a point of evidence" rather than "proof" — but the framing still implies it could substitute for formal service of process. In most jurisdictions, service of process has strict requirements (personal delivery, certified mail, publication) that a GET request to a verification endpoint does not satisfy.

### 24. No comparison to existing standards

Live Verify is never compared to:

- **W3C Verifiable Credentials** — the W3C standard for cryptographically verifiable claims
- **X.509 certificates** — the existing infrastructure for domain/identity verification
- **OpenID Connect / OAuth** — existing authentication/authorization protocols
- **ICAO 9303** — international passport/travel document standards
- **Certificate Transparency logs** — Google's approach to making certificate issuance auditable

A reader familiar with any of these will immediately ask "how does this differ?" and find no answer.

### 25. No migration path from existing verification systems

For domains where verification systems already exist:

- **US employment:** E-Verify (government portal)
- **UK right-to-work:** Share Code system
- **Australia immigration:** VEVO
- **Financial:** Various KYC/AML platforms

The spec doesn't explain how Live Verify coexists with, complements, or eventually replaces these systems.

---

## Tier 5: Minor / Cosmetic

### 26. Financial amounts aren't verified

Several use cases (proof of funds, bank statements, deposits) confirm document *status* but not *amounts*. The spec says "confirms existence and status, NOT amounts." This is a deliberate design choice (never echo claim content), but it means a proof-of-funds letter showing $100K verifies as "OK" even if the issuer's current records show $500. The verifier must trust the printed amount — which is exactly the problem verification is supposed to solve.

### 27. Photo URL enumeration prevention is incomplete

The spec recommends hash-based filenames and no-cache headers. But:

- If the same person's photo always produces the same hash-based URL, the URL is stable and trackable
- Time-limited tokens are mentioned but not specified (how short? what algorithm?)
- `Cache-Control: no-store` is a browser hint, not enforceable at the network level

### 28. Rate limiting is mentioned but not specified

The spec includes a `429 Too Many Requests` error response but doesn't specify:

- Recommended rate limits (per second? per IP? per hash?)
- Whether small issuers are expected to implement this
- DDoS mitigation strategy for verification endpoints

### 29. "Not ground truth" contradicts "verified"

The README says verification *"is not 'ground truth'"* but the entire system is called "Live **Verify**" and returns "VERIFIED." This framing tension is acknowledged ("the verifier chooses whether the issuer domain is an authority for the claim") but could confuse users who equate "verified" with "true."

### 30. Domain changes break all verification links

If an issuer changes domains (`old.acme.com` → `new.acme.com`), all documents printed with the old `verify:` line become unverifiable. No migration mechanism is specified (redirects? DNS aliases? domain-change announcements?).

---

## Recommended Actions (Priority Order)

1. **Write a normalization conformance test suite** — the single most impactful improvement. If normalization is wrong, nothing else matters.
2. **Write a threat model** — address the real attacks (DNS hijacking, issuer compromise, enumeration, replay).
3. **Fix the 404 ambiguity** — distinguish "hash not found" from "server error" from "OCR likely failed." Even a simple heuristic (multiple retries with slightly different normalization?) would help.
4. **Label aspirational vs. implemented features** — e-ink badges, blockchain witnessing, authority chains, biometric liveness. Be explicit about what exists today and what is future work.
5. **Standardize status codes** — define a base set (`OK`, `EXPIRED`, `REVOKED`, `SUPERSEDED`, `SUSPENDED`) that all use cases share, with documented sector-specific extensions.
6. **Extract witnessing boilerplate** — replace 422 identical sections with a reference to a single witnessing document, plus a per-use-case sentence on what witnessing means for that scenario.
7. **Fix the `photo_url` double-brace typo** in Verification-Response-Format.md line 79.
8. **Settle `verify:` vs `vfy:` vs `verify://`** — document when each is appropriate, or pick one.

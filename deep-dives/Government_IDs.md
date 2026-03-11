> Use case catalog: https://live-verify.github.io/live-verify/use-cases/  
> Demo: https://live-verify.github.io/live-verify/examples/

## Government ID Verification: Bridging the Non-Government Gap

Non-digital IDs, that is.

Government-to-government passport control works well (machine-readable zones, biometric chips, shared databases). But **non-government entities have no cryptographic way to verify ID authenticity** - they're stuck with visual inspection, which can't detect sophisticated forgeries or stolen documents.

Key criteria: Government-issued credential with photo. Needs verification by non-government parties (hotels, police, bars). Can be SUSPENDED, REVOKED, or STOLEN. Privacy-preserving (no public enumeration of who has what ID).

### Driver's Licenses and Passports: Real-World Verification Gap

Both driver's licenses and passports share the same verification workflow and challenges. Here's how Live Verify solves the non-government verification gap:

**Driver's License Example:**

```
┌─────────────────────────────────┐
│                                 │
│  STATE OF CALIFORNIA            │
│  DRIVER LICENSE                 │
│                                 │
│  <PHOTO     DL A1234567         │
│   NOT PA    Jane Smith          │
│   -RT OF    123 Main St         │
│   OCR TXT>  Los Angeles, CA     │
│                                 │
│  DOB: 03/15/1990                │
│  ISS: 01/20/2022                │
│  EXP: 03/15/2027                │
│                                 │
│  verify:dmv.ca.gov/dl           │
│                                 │
└─────────────────────────────────┘
```

**Passport Example (SHA-512 for international security):**

```
┌─────────────────────────────────┐
│                                 │
│  UNITED KINGDOM OF              │
│  GREAT BRITAIN AND              │
│  NORTHERN IRELAND               │
│                                 │
│  <PHOTO not part of OCR text>   │
│                                 │
│  Type: P                        │
│  Surname: SMITH                 │
│  Given names: JANE ELIZABETH    │
│  Nationality: BRITISH CITIZEN   │
│  Date of birth: 15 MAR 1990     │
│  Passport No.: 123456789        │
│  Date of issue: 20 JAN 2020     │
│  Date of expiry: 20 JAN 2030    │
│                                 │
│  verify:passports.gov.uk        │
│                                 │
└─────────────────────────────────┘
   [Machine-readable zone .....]
```

**Critical details:**

- The hash is NOT printed on the ID. Only the base URL appears. Hash inside the OCR'd text would change the hash anyway.
- Passports likely use SHA-512 (64 hex chars) to make brute-force photo enumeration utterly futile
- Photo not part of hashed text (enables photo opt-out during transition period)

**Hotel check-in workflow (same for both):**

1. Guest presents ID (driver's license or passport) at front desk
2. Clerk opens phone app, scans registration-marked section (see [Technical_Concepts.md: Registration Marks](../docs/Technical_Concepts.md#registration-marks-computer-vision-for-document-boundaries))
3. App OCRs text: Name, DOB, ID number, dates, etc (not the machine-readable zone)
4. App normalizes text (see [Technical_Concepts.md: Text Normalization](../docs/Technical_Concepts.md#text-normalization)), computes hash (SHA-512 for passports, see [Technical_Concepts.md: Hash Algorithms](../docs/Technical_Concepts.md#hash-algorithms))
5. App builds URL: `https://dmv.ca.gov/dl/{hash}` or `https://passports.gov.uk/{hash}` (domain determined by text, see [Technical_Concepts.md: Domain Binding](../docs/Technical_Concepts.md#domain-binding-text-determines-verification-authority))
6. Government responds with JSON including status and base64-encoded photo (see [Technical_Concepts.md: Photo Encoding](../docs/Technical_Concepts.md#photo-encoding-preventing-enumeration-attacks) and [Technical_Concepts.md: Response Formats](../docs/Technical_Concepts.md#response-formats))
7. App displays verification result + photo match confirmation
8. Clerk compares displayed photo to guest's face and physical ID photo

**Verification scenarios:**

**Scenario 1: Valid license**
```json
{
  "status": "verified",
  "photo": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...",
  "issued_date": "2022-01-20",
  "expiry_date": "2027-03-15"
}
```
→ Clerk sees green "VERIFIED" + photo matches guest

**Scenario 2: Suspended license (DUI, unpaid tickets)**
```json
{
  "status": "SUSPENDED",
  "photo": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...",
  "reason": "Pending dangerous driving court case"
}
```
→ Clerk sees orange "SUSPENDED" warning (hotel may still allow check-in, but flags for manager review)

**Scenario 3: Stolen license**
```json
{
  "status": "STOLEN",
  "reported_stolen": "2025-01-15",
  "instructions": "Cut ID in half and mail to: DMV Lost/Stolen Unit, PO Box 12345, Sacramento CA 95814. Also call local police"
}
```
→ Clerk sees red "STOLEN" - holder should not possess this document (potential identity theft)
→ **Photo removed from response** - prevents misuse of stolen ID holder's photo
→ Clerk advised to confiscate, cut in half, and return to DMV

**Scenario 4: Forged license (text doesn't match any DMV record)**
```
GET https://dmv.ca.gov/dl/{computed_hash}
→ 404 Not Found
```
→ Clerk sees red "FAILS VERIFICATION" - license is fake or text was tampered with

**Scenario 5: Valid license with photo opt-out (transition period)**
```json
{
  "status": "verified",
  "photo": "opted out"
}
```
→ Clerk sees green "VERIFIED (no photo)" - license is valid but holder chose privacy
→ Clerk compares physical ID photo to person (traditional visual verification)

**Why this solves the verification gap:**

- **Hotels:** Can detect stolen IDs and forgeries at check-in (reduces fraud, liability)
- **Police:** Traffic stops can verify license authenticity instantly (detects fake IDs, suspended licenses)
- **Bars/clubs:** Age verification with confidence (no fake IDs accepted)
- **Rental agencies:** Verify driver's license before handing over $50K vehicle
- **Banks:** Account opening with cryptographic ID verification
- **Privacy-conscious citizens:** Can opt out of photo sharing during transition period (first 20-30 years)

**Why QR codes FAIL for government IDs:**

**1. Photo enumeration risk**
- QR code might contain: `https://dmv.ca.gov/verify?id=A1234567`
- Anyone can try sequential IDs: `A1234566`, `A1234567`, `A1234568`...
- Scraper could download entire DMV photo database
- With Live Verify: Only someone with physical license can compute hash → no enumeration vector

**2. Cloning attack**
- Thief steals license, makes photocopy with their own photo
- Copies the QR code from real license
- QR verifies "OK" because it points to real license record
- No cryptographic binding between printed text/photo and QR code
- With Live Verify: Changing photo changes the hash → verification fails

**3. Domain spoofing**
- Fake license prints QR pointing to `https://dmv-california.com/verify` (lookalike domain)
- Clerk scans QR, sees "Valid" on attacker's server
- Hard to spot domain spoofing in quick interaction
- With Live Verify: Text determines domain ("STATE OF CALIFORNIA" → `dmv.ca.gov`)

**4. Doesn't solve government-to-non-government gap**
- Machine-readable zone on passports works for border control (government-to-government)
- But hotel clerk has no access to government passport database
- QR code alone doesn't provide cryptographic verification
- Live Verify enables non-government entities to verify authentically

**Coexistence with machine-readable zones (passports):**
- **Machine-readable zone:** For government border control (biometric chips, facial recognition at automated gates)
- **Live Verify verification:** For non-government entities (hotels, car rentals, banks)
- **Both use same document:** MRZ at bottom, verification URL at top
- **Complementary, not competing:** Different use cases, different verifiers
- **GeoIP possibilities:** "Our citizen is elsewhere, call local police" if someone tries to use a passport that's simultaneously being used in another country

---

## Pricing Model: Who Pays for Verification?

**Core principle:** Government IDs are issued for public benefit (security, identification). Non-government verifiers (hotels, police, bars) derive value from verification. Cost should be minimal, with freemium model. See [Verification_Charges.md](../docs/Verification_Charges.md) for ethical framework.

### Infrastructure Costs

**Marginal cost per verification:** ~$0.000005 (half a cent per thousand verifications)

**Example for California DMV:**
- 27 million licensed drivers
- Each license verified 5-20 times over 5-year validity (hotels, police, rentals, bars)
- Total verifications: 135M-540M over 5 years = 27M-108M/year
- Infrastructure cost: $135-540/year (Cloudflare Workers, serverless hosting)
- **Negligible** compared to DMV IT budget ($100M+/year)

### Tier 1: Government Agencies (Issuers)

**Cost to government:** Near-zero infrastructure cost (~$500-5,000/year per state DMV or passport agency)

**Why government should host verification:**
- **Already compensated:** Driver's license fees ($35-100), passport fees ($130-190) cover issuance costs
- **Public safety:** Reducing identity fraud and fake IDs is government mission
- **Fraud deterrence:** Makes fake licenses/passports harder to use (protects government reputation)
- **Law enforcement benefit:** Police can verify IDs instantly (reduces crime)
- **No additional revenue needed:** Verification is extension of issuance (same as maintaining license database)

**California DMV perspective:**
- 27M licenses issued
- Infrastructure: $5,000/year (serverless endpoints, database)
- Benefit: Reduces fake IDs, helps law enforcement, protects citizens from identity theft
- **ROI:** Preventing even 100 identity fraud cases/year = $millions in economic/social benefit

**Implementation:**
- DMV generates hash when printing new license
- Hash stored in database: `{hash, license_number, status, issue_date, expiry_date, photo}`
- Verification endpoint: `https://dmv.ca.gov/dl/{hash}` → JSON response
- Marginal cost per verification: $0.000005 (negligible)

### Tier 2: ID Holders (Citizens)

**Cost to citizen:** FREE for self-verification (1-10 checks/month)

**Why free for citizens:**
- Already paid license/passport fees ($35-$190)
- Verification benefits society (fraud prevention), not just individual
- Charging citizens creates access barrier (some can't afford verification)
- Public interest in secure IDs (reduces identity theft, fraud)

**Citizen value:**
- Verify own ID status (check for errors, suspensions)
- Peace of mind (know ID is valid before travel/transaction)
- Report lost/stolen instantly (status changes to STOLEN immediately)
- No risk of ID enumeration (privacy-preserving)

### Tier 3: Commercial Verifiers (Hotels, Bars, Rental Agencies)

**Free tier (small businesses):**
- **Cost:** FREE for 1-100 verifications/month
- **Use case:** Small hotels, local bars, independent rental agencies
- **Access:** Web app or mobile app (scan ID, verify against government)

**Paid tier (high-volume commercial users):**
- **Cost:** $50-500/month for unlimited verifications
- **Use case:** Hotel chains (Marriott, Hilton), major rental agencies (Hertz, Enterprise), large bars/clubs
- **Features:**
  - API access for bulk verification
  - Integration with property management systems (Opera, Maestro)
  - SLA guarantees (99.9% uptime)
  - Audit trail for compliance (AML, KYC regulations)
  - Priority support

**Why charge high-volume verifiers:**
- Hotels/rentals derive commercial value (fraud prevention, liability protection)
- Cost per verification ($0.01-0.10) far lower than manual inspection + fraud risk
- Legal liability protection worth far more than $0.50/verification
- Freemium model subsidizes small businesses and citizens

**Marriott Hotels perspective:**
- 8,000 properties worldwide
- 500M guest check-ins/year
- Traditional ID verification: Visual inspection (90% accuracy, no fraud detection)
- Live Verify verification: $500,000/year (unlimited API access across all properties)
- **Benefit:** Detects stolen passports, fake IDs, reduces identity fraud ($millions in prevented losses)
- **ROI:** Preventing 100 fraud cases/year at $10K average loss = $1M saved = 200x ROI

### Tier 4: Law Enforcement (Public Benefit)

**Cost to police:** FREE (government-funded public service)

**Why free for law enforcement:**
- Police are government entity (same as DMV)
- Public safety benefit (detects fake IDs, stolen documents, suspended licenses)
- Reduces dispatch burden (no radio calls to check license status)
- Faster traffic stops (10 seconds vs 5 minutes)

**Police workflow:**
- Officer pulls over driver for speeding
- Officer scans license with phone app or in-car terminal
- App verifies: License valid, not suspended, not stolen
- Response time: 10 seconds (vs 5 minutes radio call to dispatch)
- **Result:** Faster traffic stops, safer roadside interactions, fewer fake ID arrests needed

**UK Metropolitan Police perspective:**
- 30,000 officers
- 1M+ traffic stops/year
- Traditional: Radio call to dispatch (5 min/stop) = 83,000 staff hours/year
- Live Verify: 10 seconds/stop = 2,800 staff hours/year
- **Savings:** 80,000 staff hours/year at £30/hour = £2.4M/year
- Plus: Detect stolen IDs instantly (reduces identity theft crime)

### Tier 5: Banks & Financial Institutions (KYC/AML Compliance)

**Paid tier (regulatory compliance):**
- **Cost:** $1,000-$10,000/year for unlimited verifications
- **Use case:** Banks, fintech companies, cryptocurrency exchanges (KYC/AML compliance)
- **Features:**
  - API access for account opening workflows
  - Audit trail for regulatory compliance (FDIC, FinCEN, FCA)
  - SLA guarantees (99.99% uptime)
  - Integration with identity verification platforms (Jumio, Onfido)

**Why banks pay:**
- Regulatory requirement (Know Your Customer, Anti-Money Laundering)
- Account opening fraud prevention ($billions in fraud annually)
- Cost per verification ($0.10-1.00) negligible compared to fraud risk
- Legal liability protection (cryptographic proof of ID verification)

**JPMorgan Chase perspective:**
- 66 million customers
- 5M new accounts opened/year
- Traditional KYC: Manual document upload + review ($10-20 per customer)
- Live Verify: $10,000/year unlimited API access = $0.002 per verification
- **Savings:** $50M-100M/year in KYC costs
- Plus: Faster account opening (minutes vs days), better customer experience

### Cost Comparison: Live Verify vs Traditional ID Verification

| Verification Method | Time | Cost | Accuracy |
|---------------------|------|------|----------|
| **Visual inspection** | 30 sec | $0 | 70% (trained staff) / 40% (untrained) |
| **ID scanner device** | 10 sec | $5,000 device + $1/scan | 85% (detects some fake IDs, not stolen) |
| **Phone call to DMV** | 5-10 min | $20-50 (staff time) | 95% (but slow, not real-time) |
| **Live Verify (this system)** | 10 sec | $0 (free tier) / $0.10 (paid tier) | 99%+ (cryptographic + photo match) |

**Hotel front desk perspective:**
- 200 check-ins/day
- Visual inspection: 0% fraud detection (fake IDs look real)
- Live Verify: Detects stolen passports, fake IDs, expired documents
- Cost: FREE (under 100 verifications/month threshold)
- **ROI:** Preventing one $5K identity fraud case pays for... nothing (it's free)

### Revenue Model for Governments

**Option A: Free for all (public service model)**
- Government absorbs infrastructure cost ($500-5,000/year)
- Funded by existing license/passport fees
- Treated as public safety measure (like maintaining license databases)
- **Most likely for law enforcement and citizen self-checks**

**Option B: Freemium (recommended)**
- Free for citizens (1-10/month), police, small businesses (1-100/month)
- Paid for high-volume commercial users ($50-500/month)
- Revenue offsets infrastructure costs (break-even, not profit center)
- **Most likely for hotels, rental agencies, large bars/clubs**

**Option C: Cost-recovery pricing**
- Government charges all commercial verifiers (not police/citizens)
- Small businesses: $10-50/month
- Large enterprises: $500-5,000/year
- Revenue funds DMV/passport agency IT infrastructure
- **Alternative if government budget-constrained**

**Most likely outcome:** Option B (freemium) - free for citizens and law enforcement, paid for high-volume commercial users. Similar to how DMV charges for bulk data access but not individual license lookups.

### Real-World Adoption Timeline

**Phase 1: New Licenses/Passports (Years 1-5)**
- New driver's licenses printed with `verify:dmv.ca.gov/dl` URL
- New passports printed with `verify:passports.gov.uk` URL
- Hash generated when ID issued, stored in government database
- Early adopters: Tech-savvy hotels, rental agencies, bars
- Coverage: 20-30% of licenses/passports (renewal rate)

**Phase 2: Widespread Adoption (Years 5-10)**
- 60-80% of licenses/passports have verification URLs
- Hotel chains, major rental agencies integrate API
- Law enforcement trains officers on ID verification app
- Banks adopt for account opening KYC
- Coverage: Near-universal for recent IDs

**Phase 3: Legacy Phase-Out (Years 10-20)**
- 90%+ of IDs have verification capability
- Old IDs without verification still accepted (visual inspection fallback)
- Fake ID market collapses (too easy to detect)
- Insurance companies require verified ID for account opening
- Coverage: Universal for active IDs

### Privacy & Cultural Considerations

**Photo opt-out (transition period):**
- First 20-30 years: ID holders can opt out of photo in verification response
- Addresses privacy concerns during cultural transition
- After 20-30 years: Photo inclusion becomes standard (normalized)
- Similar to fingerprinting: controversial at first, normalized over decades

**International travel:**
- No international coordination needed (each country hosts own endpoints)
- Hotels verify any nationality: British passport → `passports.gov.uk`, US passport → `state.gov`
- GeoIP fraud detection: "Our citizen is elsewhere" (passport used in two countries simultaneously)
- Privacy-preserving: No central global database, just hash lookups per country

---

### Who Benefits from Government ID Verification

**Hotels & Accommodations:**
- Detect stolen passports/licenses before check-in - could be the guest would trash a room an not pay on exit.
- Reduce identity theft and credit card fraud
- Liability protection (verified guest identity)
- Insurance discounts for verified ID check-in

**Police & Law Enforcement:**
- Instant verification during traffic stops
- Detect fake IDs, suspended licenses, stolen documents
- Faster processing (no radio call to dispatch to check records)
- Works even with poor network (cache recent verifications)

**Bars & Age-Restricted Venues:**
- Eliminate fake IDs (no more visual inspection guesswork)
- Legal protection (cryptographic proof of age verification)
- Faster entry (scan + verify in 10 seconds)
- Reduce underage drinking liability

**Car Rental Agencies:**
- Verify driver's license before handing over vehicle
- Check for suspensions/revocations (DUI, unpaid tickets)
- Reduce fraud (stolen identity rentals)
- Insurance claims protection (driver was verified)

**Banks & Financial Institutions:**
- Account opening with cryptographic ID verification
- Know Your Customer (KYC) compliance
- Reduce identity theft in account applications
- Regulatory compliance (verified ID required for accounts)

**ID Holders (Citizens):**
- Faster verification at hotels, bars, rentals ?
- Reduced risk of identity theft (no ID enumeration)
- Privacy-preserving (no public registry of who has what ID), notwithstanding the fact tha each country you visit stores a lot about you already.
- Can verify own ID status likely "free tier" eternally

### Privacy & Security Properties

**Privacy-preserving:**
- Hash never printed on ID (unlike QR code with embedded ID number)
- No public enumeration of IDs (can't scrape all licenses by trying sequential numbers)
- Only someone with physical ID can compute hash and verify
- Photo returned in base64 (not via URL that could be enumerated)

**Domain binding:**
- Text determines which government agency gets queried
- Can't print "STATE OF CALIFORNIA" and have it verify against attacker's domain
- Cryptographic binding between printed text and verification endpoint

**Revocation capability:**
- IDs can return SUSPENDED, REVOKED, STOLEN status
- Enables real-time status checks beyond expiration date
- Lost/stolen IDs can be flagged immediately after reported

**Photo verification:**
- Base64-encoded photo returned in verification response (for OK and SUSPENDED status)
- Photo **removed from response** for STOLEN status (prevents misuse of victim's photo)
- Verifier compares returned photo to: (a) person presenting ID, (b) photo on physical ID
- Prevents someone from using stolen ID with their own photo printed on it
- SHA-512 would make the attempt to brute-force URLs in order to get photos utterly futile (64 hex chars)

**Photo opt-out (transition period):**
- During first few decades of rollout, ID holder can specify "no photo in verification response"
- Allows privacy-conscious individuals to adopt Live Verify verification without photo sharing
- Response includes `"photo_included": false` flag to indicate holder's preference
- Verifier relies on physical ID photo comparison only (traditional visual verification)
- After widespread adoption (20-30 years), photo inclusion becomes mandatory for security
- Gradual cultural shift: privacy concerns addressed through opt-out, then normalized over time

### Deployment Considerations

**Government infrastructure:**
- DMV/passport agencies host verification endpoints
- Store hash → (status + photo) mapping in database
- Likely free for citizens checking own IDs (1-10 verifications/month)
- May charge commercial users (hotels, rental agencies) for high-volume verification

**International travel:**
- Each country hosts their own passport verification endpoints
- `verify:gov.uk/passports`, `verify:state.gov/passports` (US), etc.
- No international coordination needed (each sovereign nation controls own data)
- Hotels can verify any nationality's passport (same Live Verify workflow)

**Backwards compatibility:**
- New IDs printed with `verify:` URL + registration marks
- Old IDs without verification still valid (visual inspection as fallback)
- Gradual rollout over 5-10 year renewal cycle
- No infrastructure shock (existing systems continue working)

**Status reporting:**
- Citizens can report lost/stolen IDs online → status changes to STOLEN immediately
- Photo **automatically removed** from STOLEN responses to protect victim
- Response includes instructions: "Cut ID in half and mail to [issuing agency address]"
- Finder/clerk advised to confiscate and return to issuing agency
- DUI/traffic violations → status changes to SUSPENDED automatically
- Expiration date tampering detected (hash doesn't match → 404)

**Photo opt-out management:**
- ID holders can opt out of photo inclusion during transition period (first 20-30 years)
- Opt-out managed through DMV/passport agency website or in-person
- Response returns `"photo": "opted out"` instead of base64 photo data
- Verifiers fall back to traditional visual verification (compare physical photo to person)
- After transition period, photo inclusion becomes mandatory for security
- Encourages adoption: privacy-conscious individuals can verify authenticity without photo sharing

---

## Related Documentation

**Technical implementation details:**
- [Technical_Concepts.md](../docs/Technical_Concepts.md) - Registration marks (computer vision), text normalization (consistent hashing), domain binding (prevents issuer impersonation), hash algorithms (SHA-512 for passports), response formats (JSON with status codes), photo encoding (base64 prevents enumeration)
- [NORMALIZATION.md](../docs/NORMALIZATION.md) - Detailed text normalization rules for consistent hashing across different OCR engines

**Business model & pricing:**
- [Verification_Charges.md](../docs/Verification_Charges.md) - Ethical framework for who pays (government public service vs. freemium for commercial users)

**Related use cases:**
- [Use_Case-Medical_License.md](Use_Case-Medical_License.md) - Similar government-issued credential with SUSPENDED/REVOKED status codes
- [Use_Case-Product_Labeling.md](Use_Case-Product_Labeling.md) - Domain binding example (Intertek vs. fake certifiers)
- [Use_Case-Voting_Proof.md](Use_Case-Voting_Proof.md) - Similar independent auditor model (E&Y verifies ballots, not government)
- [Use_Case-Sales_Receipts.md](Use_Case-Sales_Receipts.md) - Commercial verification (employers verify receipts, similar to hotels verifying IDs)

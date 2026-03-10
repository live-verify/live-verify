> Use case catalog: https://live-verify.github.io/live-verify/use-cases/  
> Demo (camera app prototype): https://live-verify.github.io/live-verify/camera-app/

## Voting Ballot Proof: Verifiable Vote Counting

Election integrity depends on voters being able to confirm their vote was counted. Live Verify enables individual vote verification through independent auditors without compromising ballot secrecy.

Key criteria: Democratic process requiring voter confidence. One-off transaction per election. Needs verification by voter and independent auditors. Privacy-preserving (no public registry of who voted what). Tamper-evident audit trail.

### The Ballot Proof Chit: Where Live Verify Enables Trust

**What's printed on the proof chit (given to voter after casting ballot):**

```
┌─────────────────────────────────┐
│                                 │
│  2028 Presidential Election     │
│  Polling Station: PS-CA-SF-042  │
│  Date: November 5, 2028         │
│  Time: 14:32:17 PST             │
│                                 │
│  Ballot ID: B7F3E2A19C4D        │
│  Transaction: TX-94881-2028     │
│                                 │
│  Vote cast for: Newsome/AOC     │
│                                 │
│  Your vote has been recorded    │
│                                 │
│  verify:election-50.ey.com      │
│                                 │
└─────────────────────────────────┘
```

**Critical details:**
- As for all, the hash is NOT printed on the chit. Only the base URL appears.
- Ballot contents ARE included (voter's choices printed on their proof chit)
- Transaction ID and timestamp make the hash unique
- Voter can verify their specific ballot was counted exactly as cast
- Independent auditor (Ernst & Young in this example) hosts verification endpoint
- Voter keeps chit private (like a receipt) to maintain ballot secrecy

**Voter verification workflow:**

1. Voter casts ballot electronically or paper ballot is scanned
2. System prints proof chit with ballot ID, transaction details, AND voter's choices
4. **Later (hours/days after polls close)**, voter scans chit with phone app
5. App OCRs text: Election name, polling station, date, time, ballot ID, transaction ID, vote choices
6. App normalizes text (see [Technical_Concepts.md: Text Normalization](Technical_Concepts.md#text-normalization)), computes hash using SHA-256 (see [Technical_Concepts.md: Hash Algorithms](Technical_Concepts.md#hash-algorithms))
7. App builds URL: `https://election-50.ey.com/{computed_hash}`
8. Independent auditor (E&Y) responds with verification status "✓ YOUR VOTE WAS COUNTED" (see [Technical_Concepts.md: Response Formats](Technical_Concepts.md#response-formats))
9. Voter sees that in Live Verify app.

→ Voter sees red "404 not found - please flatten your vote chit and scan again"

1. Voter tries again and again.
2. At some point, they might have to get the state election board involved.

**Why this solves some election integrity concerns:**

- **Voter confidence:** Each voter can verify their vote was counted
- **Independent auditor:** Verification hosted by third-party firm (E&Y, Deloitte, PwC), not government
- **Ballot secrecy preserved:** Chit proves vote was counted
- **Public auditability:** Statistical reconciliation possible (total verified votes = total counted votes)
- **No blockchain needed:** Simple hash verification sufficient for individual voter confirmation

The software that does the tallying that isn't the auditors might still need to be verified as good. Perhaps
that's E&Y again.

### Why QR Codes FAIL for Voting Proof Chits

#### 1. Voter Cannot Verify Human-Readable Content

**Problem with QR codes:**
- QR code is machine-only encoding (voter can't read "2028 Presidential Election, November 5" by looking at it)
- Requires text BESIDE QR code + scanning QR code + comparing both
- Voter must manually check: printed text matches scanned URL destination
- Easy to overlook domain spoofing (`election-verify-ey.com` vs `ey.com`) during verification
- Voter cannot verify chit authenticity without smartphone (QR is meaningless without device)

**Live Verify solution:**
- Chit is human-readable first (voter reads: election name, date, polling station, vote cast)
- Text IS the verification (no separate machine-only encoding)
- Verification is secondary (optional check confirms vote counted)
- Domain displayed prominently in app: **"VERIFIED by election-50.ey.com"**
- Voter can read chit content without any device (proves what they voted for)

#### 2. Ballot Stuffing Attack (Duplicate Chit Generation)

**Problem with QR codes:**
- Election official prints extra chit with QR: `https://election-50.ey.com/verify?ballot=B7F3E2A19C4D`
- QR encodes ballot reference `B7F3E2A19C4D`
- Official changes "Newsome/AOC" to "Trump/Vance" on printed text beside QR
- Hands fake chit to colluding voter (or uses for mail-in ballot fraud)
- QR still verifies as valid (points to real ballot B7F3E2A19C4D)
- Auditor sees: one ballot, one verification (no red flag)
- **No cryptographic binding between printed vote choice and QR code**

**Live Verify solution:**
- Printed text includes vote cast: "Vote cast for: Newsome/AOC"
- Changing text to "Trump/Vance" changes hash
- New hash → verification fails (404 from auditor)
- Cryptographic binding between vote choice and verification
- **Ballot stuffing detected immediately** (fake chit fails verification)

#### 3. Domain Spoofing (Fake Auditor)

**Problem with QR codes:**
- Corrupt official prints chit with QR pointing to `https://election-verification-ey.com/verify` (lookalike domain)
- Voter scans QR, sees "Your vote was counted ✓"
- Attacker-controlled server always responds `{"status":"verified"}`
- Hard to spot domain spoofing in quick scan (voter expects verification, gets fake confirmation)
- Voter believes vote was counted, but it wasn't (or was changed)

**Live Verify solution:**
- Text determines domain: "verify:election-50.ey.com" printed on chit
- App displays: **"VERIFIED by election-50.ey.com"** (shows actual verifying domain)
- Voter sees immediately which auditor verified (E&Y, not fake domain)
- Domain binding (see [Technical_Concepts.md: Domain Binding](Technical_Concepts.md#domain-binding))
- Can't print "Ernst & Young" and have it verify against attacker domain

#### 4. Vote Tampering Undetected

**Problem with QR codes:**
- Voter casts ballot for "Newsome/AOC"
- Corrupt poll worker prints chit with QR + text saying "Newsome/AOC"
- But QR actually points to ballot that counted "Trump/Vance"
- Voter keeps chit, thinks vote was counted correctly
- QR verifies as valid (ballot exists in system)
- **Voter never discovers vote was changed** (text on chit doesn't match actual counted ballot)

**Live Verify solution:**
- Chit text includes: "Vote cast for: Newsome/AOC"
- Hash computed from: election + polling station + timestamp + ballot ID + **vote choices**
- If actual counted vote was "Trump/Vance", hash would be different
- Voter verifies chit → 404 (hash doesn't match any ballot in auditor database)
- **Voter discovers vote tampering immediately** (verification fails)

**Note:** Live Verify ballot proof chit reveals vote choices to the voter (printed on chit). Ballot secrecy is maintained by voter keeping chit private (like a receipt). This differs from anonymous voting systems where voter never sees proof of their vote - Live Verify optimizes for voter confidence and verifiability over perfect anonymity.

#### Other Benefits

**Voters:**
- Confirm their vote was counted in the official tally
- Peace of mind that their democratic participation mattered
- Can report discrepancies if verification fails
- Ballot secrecy preserved (chit doesn't reveal voting choices)

**Election Officials:**
- Increased public confidence in election integrity
- Reduced unfounded fraud claims (voters can verify themselves)
- Tamper-evident audit trail
- Automatic statistical reconciliation (verified ballots = counted ballots)

**Independent Auditors (E&Y, Deloitte, PwC, etc.):**
- Provide trusted third-party verification separate from government
- Maintain voter confidence through brand reputation
- Can cross-check totals against official results
- Flag discrepancies for investigation

**Political Campaigns:**
- Higher voter confidence → higher turnout
- Reduced post-election disputes
- Transparent process reduces legitimacy challenges
- Can encourage supporters to verify their votes were counted

**Democracy:**
- Strengthens electoral integrity through verifiable voting
- Reduces effectiveness of fraud (voters will notice missing ballots)
- Increases trust in democratic institutions
- Tamper-evident without blockchain complexity

### Deployment Considerations

**Infrastructure:**
- Independent auditor (E&Y, Deloitte, PwC) hosts verification endpoints
- Store hash → (ballot_id + timestamp + status) mapping
- Free for voters to verify their own ballot (unlimited checks)
- Government contracts with auditor for election verification services

**Ballot secrecy protection:**
- Chit includes: election name, polling station, date/time, ballot ID, transaction ID, AND voter's choices
- Hash computed from all chit content (including vote cast)
- Voter can verify their exact ballot was counted correctly
- Ballot secrecy maintained by voter keeping chit private (like a receipt)
- No public database of who voted for whom (only voter + auditor can verify individual ballot)

**Timeline:**
- Chits printed immediately after ballot cast
- Verification available after polls close (prevents real-time vote buying)
- Auditor updates status: PROCESSING → COUNTED (within hours of polls closing)
- Verification remains available for 7-10 years (election record retention)

**Security:**
- Transaction IDs include timestamp + random nonce (prevents duplicate chits)
- Polling station ID prevents ballot-box stuffing from other locations
- Auditor endpoint rate-limited to prevent scraping
- Statistical reconciliation: sum of verified ballots = official tally

**Transparency:**
- Auditor publishes aggregate statistics (total ballots verified per polling station)
- Does NOT publish individual ballot hashes (prevents enumeration)
- Government publishes official tally + number of chits issued per station
- Discrepancies flagged for investigation

**Why independent auditor (not government) hosts verification:**
- Separates ballot counting (government) from verification (third party)
- Reduces trust requirements (voters don't need to trust single entity)
- Brand reputation incentivizes accuracy (E&Y wouldn't risk credibility)
- Enables multiple auditors (different auditors for different jurisdictions)

---

## Pricing Model: Who Pays for Verification?

**Core principle:** Election verification is a public good funded by government/taxpayers. Independent auditor (E&Y, Deloitte, PwC) provides trusted third-party verification service. See [Verification_Charges.md](Verification_Charges.md) for ethical framework.

### Infrastructure Costs

**Marginal cost per verification:** ~$0.000005 (half a cent per thousand verifications)

**Example for US Presidential Election:**
- 150 million voters cast ballots
- Each voter verifies 1-5 times (after voting, recounts, election challenges)
- Total verifications: 150M-750M
- Infrastructure cost: $750-3,750/election (Cloudflare Workers, serverless hosting)
- **Negligible** compared to election administration ($billions)

### Tier 1: Voters (Verifiers)

**Cost to voter:** FREE (unlimited verifications)

**Why free for voters:**
- Public good (democratic confidence in elections)
- Voters already "paid" via taxes (elections publicly funded)
- Charging voters creates disenfranchisement risk (access barrier)
- Universal verification needed for statistical reconciliation (all voters should verify)

**Voter value:**
- Confirms vote was counted as cast (peace of mind)
- Detects vote tampering immediately (404 if chit fake)
- Enables voter to report discrepancies (election integrity)
- Reduces effectiveness of voter fraud (voters will notice missing/changed ballots)

### Tier 2: Government Election Authorities (Purchasers)

**Cost to government:** $1M-$10M per election cycle (national election)

**What government pays for:**
1. **Independent auditor contract:** E&Y, Deloitte, or PwC provides verification service
   - US Presidential election: $5M-10M contract (covers all states)
   - State/local elections: $100K-$1M per state
   - Includes: infrastructure, 24/7 support, statistical reconciliation, fraud investigation

2. **Chit printing integration:** POS-style printers at polling stations
   - Hardware: $500-$1,000 per polling station × 100,000 stations = $50M-100M (one-time)
   - Software integration: $5M-10M (connect voting machines to chit printers)
   - Amortized over 10+ years: $5M-10M/year

**Total government cost per election:**
- **National election (US):** $10M-20M/election (every 2-4 years)
- **Per voter cost:** $0.07-0.13 per voter (150M voters)
- **Compared to election administration:** $billions spent on polling stations, staff, security, recounts
- **ROI:** Preventing one contested election (e.g., Florida 2000) = $priceless (legitimacy of government)

**Why government pays:**
- Public trust in elections is foundational to democracy
- Cost is negligible compared to election administration budget
- Reduces post-election disputes (fewer recounts, challenges, lawsuits)
- Increases voter turnout (confidence in integrity)
- Protects against foreign interference (cryptographic audit trail)

### Tier 3: Independent Auditor (Service Provider)

**Revenue model (E&Y perspective):**
- **Contract value:** $5M-10M per US Presidential election
- **Cost structure:**
  - Infrastructure: $10K-50K (serverless endpoints, databases)
  - Staff: 50-100 auditors × $100K/year × 6 months = $2.5M-5M (election cycle)
  - Brand risk management: Reputation protection (priceless)
  - Profit margin: 20-40% ($1M-4M profit per election)

**Why E&Y accepts this work:**
- **Brand differentiation:** "E&Y: Trusted Election Auditor" (marketing value)
- **Government contracts:** Recurring revenue every election cycle
- **Public service:** Enhances corporate reputation (ESG, civic duty)
- **Low technical risk:** Hash verification is straightforward (proven technology)
- **High reputational risk:** Must be accurate (95%+ voter verification rate expected)

**Competitive bidding:**
- Government issues RFP (Request for Proposal) for election verification services
- E&Y, Deloitte, PwC, KPMG bid on contracts
- Selection criteria: reputation, technical competence, cost, independence
- Typical contract: 4-year cycle (Presidential election + midterms)

### Tier 4: Political Campaigns (Indirect Beneficiaries)

**Cost to campaigns:** $0 (government-funded service)

**Value to campaigns:**
- Higher voter confidence → higher turnout (benefits all candidates)
- Reduced post-election disputes (saves legal fees)
- Transparent process (reduces legitimacy challenges)
- Can encourage supporters to verify votes (grassroots mobilization)

**Example: 2020 US Election:**
- $14 billion spent on campaigns (Presidential + Congressional)
- Post-election legal challenges: $100M+ (Trump lawsuits, recounts)
- With Live Verify verification: Voters verify → disputes reduced → legal costs saved
- **Campaign ROI:** Even saving $10M in legal fees = 100x government investment

### Cost Comparison: Live Verify vs Traditional Election Auditing

| Audit Method | Coverage | Cost | Voter Confidence |
|--------------|----------|------|------------------|
| **Hand recount** | 1-5% of ballots | $1M-5M per state | Low (only samples audited) |
| **Risk-limiting audit** | Statistical sample | $500K-2M per state | Medium (requires statistical literacy) |
| **No audit (trust official tally)** | 0% | $0 | Very low (post-2020 US) |
| **Live Verify (this system)** | 100% (voters verify individually) | $10M-20M national | High (every voter can verify) |

**Voter perspective:**
- Traditional audit: "Experts say election was secure" (trust required)
- Live Verify: "I personally verified my vote was counted" (direct confirmation)
- **Result:** Dramatically higher voter confidence in election integrity

### Real-World Precedents

**Estonia: I-Voting System**
- Online voting with individual verification (since 2005)
- 50%+ of voters use i-voting (2023)
- Independent audits by OSCE, EU observers
- Cost: €1-2 per voter (funded by government)
- **Result:** World-leading digital democracy, high voter confidence

**Switzerland: E-Voting Trials**
- Postal voting with verification codes
- Individual vote verification via SMS/letter
- Cost: CHF 5-10 per voter
- **Result:** High trust, but technical complexity limited adoption

**US: Paper Ballot Audits**
- Risk-limiting audits (statistical sampling)
- Cost: $500K-2M per state
- Coverage: 1-5% of ballots
- **Result:** Expert-verified, but limited public understanding/confidence

**Live Verify advantage over existing systems:**
1. **Lower cost:** $0.07-0.13 per voter vs $1-10 for i-voting
2. **Universal verification:** Every voter verifies vs statistical samples
3. **Simpler:** Scan paper chit vs complex cryptographic protocols
4. **Higher confidence:** Direct voter confirmation vs expert assurance

### Government ROI Calculation

**US Presidential Election scenario:**
- **Investment:** $10M-20M for Live Verify verification infrastructure
- **Benefits:**
  1. **Reduced recounts:** Fewer disputed results = $50M-100M saved (Florida 2000 recount cost $10M)
  2. **Higher turnout:** 2-5% increase = 3M-7.5M additional voters (legitimacy boost)
  3. **Reduced foreign interference:** Cryptographic audit trail deters tampering
  4. **Public trust:** Prevents legitimacy crises ($billions in economic/social costs)
  5. **Legal costs avoided:** Post-election lawsuits reduced by 50%+ ($50M-100M saved)

**Total ROI:** $100M-200M in cost savings + intangible legitimacy benefits = 10-20x return on investment

**Comparison to election administration budget:**
- US federal elections: $3-5 billion per cycle (FEC, state/local costs)
- Live Verify verification: $10M-20M (0.2-0.4% of total election budget)
- **Decision:** Near-zero marginal cost for massive legitimacy improvement

### Deployment Timeline

**Phase 1: Pilot (Single State) - Year 1**
- Select state (e.g., Colorado, Oregon - mail-in voting infrastructure)
- 2-3 million voters
- E&Y contracted as independent auditor
- Chit printers installed at 1,000 polling stations
- Cost: $5M (infrastructure + auditor contract)
- Metrics: 60-80% voter verification rate, 99%+ accuracy

**Phase 2: Multi-State Rollout - Years 2-3**
- 10-15 states adopt Live Verify verification
- 50 million voters
- Multiple auditors (E&Y, Deloitte, PwC for different states)
- Cost: $50M (amortized infrastructure + auditor contracts)
- Metrics: 70-85% voter verification rate, improved voter confidence polling

**Phase 3: Federal Elections - Year 4**
- Federal mandate for Presidential elections
- All 50 states + territories
- 150 million voters
- Cost: $100M (national infrastructure) + $10M-20M per election (auditor contracts)
- **Result:** Near-universal voter verification, dramatically reduced post-election disputes

### Privacy & Security Considerations

**Ballot secrecy:**
- Chit includes vote choices (printed on chit given to voter)
- Voter keeps chit private (like a receipt)
- No public database of who voted for whom
- Only voter + auditor can verify individual ballot
- Statistical reconciliation possible without revealing individual votes

**Vote buying prevention:**
- Verification available only after polls close (prevents real-time vote buying)
- Chit proves vote was counted, but not who voter is (no identity on chit)
- Coercion detection: Voter can verify vote wasn't changed (detects voter intimidation)

**Foreign interference deterrence:**
- Cryptographic audit trail makes ballot tampering detectable
- Each voter verifies individually (no central point of failure)
- Statistical reconciliation: sum of verified ballots = official tally
- Discrepancies trigger investigation (automatic fraud detection)

---

## OCR Challenges for Ballot Proof Chits

### Challenge 1: Folded or Crumpled Chits

**Problem:** Voters fold chit to fit in wallet/pocket (like cash receipts)

**Impact on OCR:**
- Fold lines create shadows that confuse OCR (letter "l" becomes "i")
- Crumpled paper distorts text geometry (perspective correction needed)
- Multi-line folds may obscure entire lines of text

**Solutions:**
1. **User instruction:** App prompts "Flatten chit before scanning" (visual guide)
2. **Perspective correction:** Computer vision detects fold lines, applies geometric transformation
3. **Multi-angle scanning:** App prompts voter to scan from different angles if first attempt fails
4. **Manual entry fallback:** If OCR fails after 3 attempts, voter can manually type ballot ID + election name

**Design mitigation:**
- Print chit on tear-resistant paper (not thermal receipts)
- Size chit to fit standard wallet (credit card size: 3.4" × 2.1")
- Mark fold lines explicitly: "DO NOT FOLD" or perforated edges

### Challenge 2: Smudged or Stained Chits

**Problem:** Voters carry chit in pocket with keys, coins, or spill coffee on it

**Impact on OCR:**
- Ink smudges obscure characters ("B7F3E2A19C4D" becomes "B7F E2A1 C D")
- Stains create false OCR artifacts (coffee stain looks like letter "O")
- Watermarks interfere with text recognition

**Solutions:**
1. **High-contrast printing:** Black text on white background (not gray)
2. **Waterproof paper:** Synthetic paper (Tyvek, Teslin) resists liquid damage
3. **Redundant information:** Print ballot ID twice (top and bottom of chit)
4. **Image preprocessing:** App applies contrast enhancement before OCR
5. **Partial OCR:** If only 80% readable, app can still compute hash (with human verification of uncertain characters)

**Design mitigation:**
- Laminate chit (like driver's license) for high-value elections (Presidential)
- Use UV-resistant ink (prevents fading over time)
- Provide protective sleeve at polling station

### Challenge 3: Thermal Paper Fading

**Problem:** Some polling stations use thermal printers (like receipts) - text fades in 3-12 months

**Impact on verification:**
- Voter tries to verify 6 months after election → chit unreadable
- Recount scenarios (Florida 2000) require verification 6-12 months later
- Historical audits (7-10 year retention) impossible with faded thermal chits

**Solutions:**
1. **Avoid thermal printing for ballot chits:** Use laser/inkjet printers at polling stations
2. **Immediate scanning encouraged:** App prompts voter to scan chit before leaving polling station
3. **Photograph archival:** App saves high-resolution photo of chit (backup if thermal text fades)
4. **QR code hybrid:** Print QR code alongside Live Verify text (QR contains ballot ID for long-term access)
5. **Government database:** Auditor stores ballot ID mapping (voter can look up by ballot ID if chit fades)

**Cost comparison:**
- **Thermal printers:** $200-$300 per polling station (cheap, but chits fade)
- **Laser printers:** $500-$1,000 per polling station (permanent chits)
- **Decision:** Spend extra $300 per station for permanent verification (worth it for election integrity)

### Challenge 4: Low-Light or Angled Scanning

**Problem:** Voter scans chit in dim lighting (parking lot at night) or holds phone at wrong angle

**Impact on OCR:**
- Low-light photos lack contrast (Tesseract.js accuracy drops from 95% to 60%)
- Angled scanning creates perspective distortion (rectangular chit looks trapezoidal)
- Flash glare creates white hot spots that obscure text

**Solutions:**
1. **App guidance:** Real-time feedback ("Move closer", "Avoid glare", "Increase brightness")
2. **Automatic flash control:** App detects low light, enables flash (but warns about glare)
3. **Registration mark detection:** OpenCV finds chit boundaries, corrects perspective automatically
4. **Multi-frame capture:** App takes 3-5 photos, selects best quality frame for OCR
5. **Scan later option:** App allows voter to save chit photo, verify when home (better lighting)

**Real-world scenario:**
- Voter exits polling station at 8 PM (dark), scans chit in parking lot
- App detects low light, prompts: "Scan now or wait for better lighting?"
- Voter chooses "Scan now" → app takes 5 photos, selects clearest, applies OCR
- If OCR confidence <90%, app prompts: "Try again indoors" or "Verify at home"

### Challenge 5: Registration Mark Interference

**Problem:** Ballot chit has security watermarks, official seals, or decorative borders that interfere with registration mark detection

**Impact on OCR:**
- OpenCV detects wrong contours (seal outline instead of text boundary)
- OCR extracts decorative text outside scannable area
- Hash computation includes wrong text → verification fails

**Solutions:**
1. **Simple chit design:** Minimal decoration, clear text area, prominent registration marks
2. **Color coding:** Registration marks in specific color (e.g., blue borders) that OpenCV filters for
3. **Unique pattern:** Registration marks use distinctive shapes (e.g., QR-like corners) vs generic rectangles
4. **User-guided framing:** If automatic detection fails, app shows targeting reticle for manual framing
5. **Text-only fallback:** If CV fails, app OCRs entire photo, uses "verify:" keyword to identify text region

**Example design (good vs bad):**
- **Bad:** Decorative eagles, 10 security watermarks, script font for "Official Ballot Proof"
- **Good:** Plain text, 3px black border (registration marks), "verify:election-50.ey.com" clearly visible

### Challenge 6: Multi-Language Support

**Problem:** US has non-English speaking voters (Spanish, Chinese, Vietnamese, etc.) - chit text may include non-Latin characters

**Impact on OCR:**
- Tesseract.js requires specific language models for non-Latin scripts
- Mixed-language chits (English + Spanish) confuse OCR (switches language mid-text)
- Diacritical marks (á, é, í, ñ) may be misrecognized

**Solutions:**
1. **Language detection:** App detects voter's phone language, loads appropriate Tesseract model
2. **Multi-language training:** Tesseract trained on mixed-language ballot chits
3. **ASCII-only hashing:** Core verification data (ballot ID, transaction ID) uses ASCII only (no accents)
4. **Manual entry option:** Voter can manually select language if auto-detection fails

**Example chit (bilingual):**
```
2028 Presidential Election / Elección Presidencial 2028
Polling Station: PS-CA-SF-042
Date: November 5, 2028
Ballot ID: B7F3E2A19C4D
Vote cast for: Newsome/AOC
verify:election-50.ey.com
```

OCR handles English + Spanish hybrid text (Tesseract multilanguage mode).

---

## Related Documentation

**Technical implementation details:**
- [Technical_Concepts.md](Technical_Concepts.md) - Text normalization, hash algorithms, response formats, OCR challenges (critical for ballot chit handling)
- [NORMALIZATION.md](NORMALIZATION.md) - Detailed text normalization rules for consistent hashing

**Business model & pricing:**
- [Verification_Charges.md](Verification_Charges.md) - Ethical framework for who pays (public good funded by government)

**Related use cases:**
- [Use_Case-Sales_Receipts.md](Use_Case-Sales_Receipts.md) - Similar clearinghouse/auditor model (independent third-party verification)
- [Use_Case-Educational_Degrees.md](Use_Case-Educational_Degrees.md) - Privacy-preserving verification (ballot secrecy vs credential verification)
- [Use_Case-Government_IDs.md](Use_Case-Government_IDs.md) - Government-issued documents with verification (similar trust model)


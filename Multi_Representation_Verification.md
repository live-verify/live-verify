# Multi-Representation Verification: One Legal Claim, Many Valid Hashes

## Core Concept

**One legal claim can have multiple equally-valid text representations, each with its own SHA-256 hash, all verifying the same underlying fact.**

- **One legal fact**: "Jane has a BSc in Computer Science from Edinburgh University, awarded June 2018"
- **Multiple valid representations**: Ornate wall certificate, CV summary, LinkedIn profile text, conference bio
- **Multiple valid hashes**: Each representation produces a different SHA-256 hash
- **All verify successfully**: The issuer stores all hashes, all return `{"status":"verified"}`

This applies to degrees, licenses, certifications, receipts, contracts - any credential that can be legitimately represented in different formats.

## The Problem: Ornate Credentials vs OCR

Traditional credentials are often designed for **human prestige**, not machine readability:

```
╔═══════════════════════════════════════════════════════════╗
║  🎓                                                       ║
║         𝓤𝓷𝓲𝓿𝓮𝓻𝓼𝓲𝓽𝔂 𝓸𝓯 𝓔𝓭𝓲𝓷𝓫𝓾𝓻𝓰𝓱                     ║
║                                                           ║
║    [Embossed Seal]  Bachelor of Science  [Gold Foil]     ║
║                                                           ║
║           First Class Honours                            ║
║           Computer Science                               ║
║                                                           ║
║    Awarded to: Jane Elizabeth Smith                      ║
║    Date: Twenty-third of June, 2018                      ║
║                                                           ║
║    [Signature: Principal]  [Signature: Registrar]        ║
║                                                           ║
║    [University Crest]      [Security Watermark]          ║
╚═══════════════════════════════════════════════════════════╝
```

**OCR nightmare elements:**
- Gothic/blackletter fonts (𝓤𝓷𝓲𝓿𝓮𝓻𝓼𝓲𝓽𝔂)
- Cursive signatures
- Embossed seals (raised ink)
- Gold foil and decorative borders
- Security watermarks
- Multiple font sizes and styles
- Ornamental spacing and layout

**Tesseract.js OCR accuracy:** <50% on ornate certificates (vs 95%+ on plain text)

## The Solution: Multi-Representation Approach

**The same credential, same person, but MULTIPLE different valid hashes - as many as needed:**

### Example: University Degree

**One legal fact:** Jane Elizabeth Smith earned a BSc (First Class Honours) in Computer Science from University of Edinburgh on 23 June 2018.

**Multiple valid text representations:**

#### Representation 1: Long Form (Ornate Certificate)

The beautiful certificate that hangs on the wall:

```
┌─────────────────────────────────────────────────────────┐
│ University of Edinburgh                                 │
│ Bachelor of Science (First Class Honours)               │
│ Computer Science                                        │
│ Awarded to: Jane Elizabeth Smith                       │
│ Date: 23 June 2018                                      │
│ Principal: Professor Peter Mathieson                    │
│ Registrar: Dr. Sarah Cunningham-Burley                  │
│                                                         │
│ verify:degrees.ed.ac.uk/c                               │
└─────────────────────────────────────────────────────────┘
```

**Normalized text:**
```
University of Edinburgh
Bachelor of Science (First Class Honours)
Computer Science
Awarded to: Jane Elizabeth Smith
Date: 23 June 2018
Principal: Professor Peter Mathieson
Registrar: Dr. Sarah Cunningham-Burley
```

**SHA-256 hash:** `abc123def456...` (Hash A)

**Verification URL:** `https://degrees.ed.ac.uk/c/abc123def456...`

#### Representation 2: Medium Form (CV/Resume Claim)

Plain-text claim on a CV/resume - easy to OCR:

```
┌────────────────────────────────────────┐
│ BSc Computer Science (First Class)    │
│ University of Edinburgh, 2018          │
│ Jane Elizabeth Smith                   │
│                                        │
│ verify:degrees.ed.ac.uk/c              │
└────────────────────────────────────────┘
```

**Normalized text:**
```
BSc Computer Science (First Class)
University of Edinburgh, 2018
Jane Elizabeth Smith
```

**SHA-256 hash:** `789ghi012jkl...` (Hash B)

**Verification URL:** `https://degrees.ed.ac.uk/c/789ghi012jkl...`

#### Representation 3: Short Form (LinkedIn/Social Media Profile)

Ultra-brief claim for space-constrained contexts:

```
┌────────────────────────────────┐
│ BSc (Hons) CS, Edinburgh 2018 │
│ Jane Smith                     │
│ verify:degrees.ed.ac.uk/c      │
└────────────────────────────────┘
```

**Normalized text:**
```
BSc (Hons) CS, Edinburgh 2018
Jane Smith
```

**SHA-256 hash:** `def456mno789...` (Hash C)

**Verification URL:** `https://degrees.ed.ac.uk/c/def456mno789...`

#### Additional representations are possible

The university could generate and store hashes for **as many representations as needed**:
- Conference bio version
- Badge/ID card text
- Press release announcement
- Alumni directory listing
- Each with different abbreviations, formatting, level of detail

**All verify the same underlying fact:** Jane earned this degree on this date.

## All Hashes Are Valid

The university's verification database stores **ALL** hashes for Jane's degree:

```json
{
  "hashes": {
    "abc123def456...": {
      "status": "verified",
      "claimType": "degree-long-form",
      "graduate": "Jane Elizabeth Smith",
      "degree": "BSc Computer Science",
      "honours": "First Class",
      "date": "2018-06-23",
      "issued": "2018-06-23T10:00:00Z"
    },
    "789ghi012jkl...": {
      "status": "verified",
      "claimType": "degree-medium-form",
      "graduate": "Jane Elizabeth Smith",
      "degree": "BSc Computer Science",
      "honours": "First Class",
      "date": "2018-06-23",
      "issued": "2024-03-15T14:30:00Z"
    },
    "def456mno789...": {
      "status": "verified",
      "claimType": "degree-short-form",
      "graduate": "Jane Elizabeth Smith",
      "degree": "BSc Computer Science",
      "honours": "First Class",
      "date": "2018-06-23",
      "issued": "2024-03-15T14:35:00Z"
    }
  }
}
```

**All three return HTTP 200 + `{"status":"verified"}`** when verified.

## Why This Works

**Same credential, different representations:**
- The university awarded **ONE** degree to Jane
- That degree can be represented as:
  - Long-form ornate certificate (prestige, frameable, wall display)
  - Medium-form plain text (practical, CV/resume, OCR-friendly)
  - Short-form ultra-brief (LinkedIn, social media profiles, business cards)
  - ...and as many additional representations as needed
- All representations verify the **same underlying fact**: "Jane has a BSc in Computer Science from Edinburgh"

**No conceptual problem:**
- Medical records have summary reports, visit notes, AND detailed charts - same patient, different views
- Financial statements have 10-K filings, earnings calls, AND press releases - same data, different formats
- Degree credentials have ornate certificates, CV claims, AND social profiles - same achievement, different presentations

## Practical Workflow

### Scenario: Job Application

1. **Jane applies for a software engineering job**
2. **She includes on her CV:**
   ```
   BSc Computer Science (First Class)
   University of Edinburgh, 2018
   verify:degrees.ed.ac.uk/c
   ```

3. **HR manager scans the CV claim with Live Verify app:**
   - Phone camera OCR extracts plain text easily (95%+ accuracy)
   - App normalizes text: `"BSc Computer Science (First Class)\nUniversity of Edinburgh, 2018\nJane Elizabeth Smith"`
   - Computes SHA-256: `789ghi012jkl...`
   - Fetches `https://degrees.ed.ac.uk/c/789ghi012jkl...`
   - Response: HTTP 200 + `{"status":"verified"}`
   - **✅ VERIFIED by degrees.ed.ac.uk**

4. **No need to scan the ornate certificate** - it's hanging on Jane's wall at home

### Scenario: Official Verification Request

1. **Employer needs official confirmation for government clearance**
2. **Jane submits scanned copy of ornate certificate**
3. **Security officer manually types the text** (OCR would fail on decorative fonts):
   ```
   University of Edinburgh
   Bachelor of Science (First Class Honours)
   Computer Science
   Awarded to: Jane Elizabeth Smith
   Date: 23 June 2018
   Principal: Professor Peter Mathieson
   Registrar: Dr. Sarah Cunningham-Burley
   ```

4. **Live Verify app:**
   - User types text manually (no OCR)
   - App normalizes text
   - Computes SHA-256: `abc123def456...`
   - Fetches `https://degrees.ed.ac.uk/c/abc123def456...`
   - Response: HTTP 200 + `{"status":"verified"}`
   - **✅ VERIFIED by degrees.ed.ac.uk**

## University Adoption Path

### Phase 1: Support Short-Form Claims (Now)

Universities can start **TODAY** without changing certificate printing:

1. **Create web portal** where graduates can generate short-form claims:
   - Graduate logs in with credentials
   - Portal shows: "BSc Computer Science (First Class), University of Edinburgh, 2018, [Your Name]"
   - Portal generates normalized text and SHA-256 hash
   - Hash stored in verification database
   - Graduate copies plain text to CV, adds `verify:degrees.ed.ac.uk/c`

2. **Cost:** Near zero - static hosting or serverless API

3. **Benefit:** Graduates can immediately add verifiable credentials to CVs

### Phase 2: OCR-Optimized Certificate Design (Future)

When printing new certificates, universities could add **plain-text verification box**:

```
╔═══════════════════════════════════════════════════════════╗
║  🎓                                                       ║
║         𝓤𝓷𝓲𝓿𝓮𝓻𝓼𝓲𝓽𝔂 𝓸𝓯 𝓔𝓭𝓲𝓷𝓫𝓾𝓻𝓰𝓱                     ║
║                                                           ║
║    [Embossed Seal]  Bachelor of Science  [Gold Foil]     ║
║                                                           ║
║           First Class Honours                            ║
║           Computer Science                               ║
║                                                           ║
║    Awarded to: Jane Elizabeth Smith                      ║
║    Date: Twenty-third of June, 2018                      ║
║                                                           ║
║    [Signature: Principal]  [Signature: Registrar]        ║
║                                                           ║
║  ┌─────────────────────────────────────────────────────┐ ║
║  │ VERIFICATION (Machine Readable)                     │ ║
║  │ University of Edinburgh                             │ ║
║  │ BSc Computer Science (First Class Honours)          │ ║
║  │ Jane Elizabeth Smith, 23 June 2018                  │ ║
║  │ verify:degrees.ed.ac.uk/c                           │ ║
║  └─────────────────────────────────────────────────────┘ ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
```

**Design principle:** Decorative elements OUTSIDE the scannable box, plain text INSIDE.

Similar to [bachelor-thaumatology-square.html](public/training-pages/bachelor-thaumatology-square.html) training page - decoy text on left, scannable content within registration marks.

### Phase 3: Retroactive Hash Generation (Graduated Already)

Universities could offer **"Generate Verification Hash"** service for alumni:

1. **Alumni portal** - graduates log in
2. **Select degree** - "BSc Computer Science, 2018"
3. **Portal generates both:**
   - Long-form hash (if they want to verify the ornate certificate via manual entry)
   - Short-form hash (for CV claims)
4. **Hashes added to database** - verification URLs become active

**No need to reprint certificates** - just activate verification for existing degrees.

## Key Insights

**Why employers accept short-form claims:**

The employer doesn't care about the **ornate certificate** - they care about the **fact**:
- Did Jane graduate from Edinburgh?
- What degree?
- What honors?
- When?

**Short-form claim answers all questions.** The ornate certificate is for Jane's wall, not HR's verification system.

**Analogy to medical records:**
- Hospital keeps detailed charts (long-form)
- Doctor writes summary for referral (short-form)
- Both are valid medical records
- Insurance company verifies the summary, not the full chart

**Analogy to financial statements:**
- Company files detailed 10-K with SEC (long-form)
- Company issues earnings press release (short-form)
- Both are valid representations of financial performance
- Investors verify the press release, auditors verify the 10-K

**Degree credentials work the same way:**
- Ornate certificate = prestige, wall display, personal keepsake
- Short-form claim = practical verification for employment, admissions, licensing
- Both valid, both verifiable, different purposes

## Technical Notes

### Normalization Differences

The long-form and short-form have **different normalization rules** (see NORMALIZATION.md), but both follow the same **process**:

1. Unicode NFC normalization
2. Trim leading/trailing whitespace
3. Collapse multiple spaces to single space
4. Remove leading/trailing pipe characters (OCR artifacts from borders)
5. SHA-256 hash

**Result:** Different input text → different hashes → both stored in database → both verify successfully.

### Database Storage

University stores a **list of valid hashes per graduate**:

```sql
CREATE TABLE degree_verifications (
  hash VARCHAR(64) PRIMARY KEY,
  graduate_id INTEGER REFERENCES graduates(id),
  degree_type VARCHAR(100),
  degree_field VARCHAR(100),
  honours VARCHAR(50),
  award_date DATE,
  claim_format ENUM('long-form', 'short-form'),
  issued_date TIMESTAMP,
  status ENUM('verified', 'revoked', 'SUPERSEDED')
);
```

**Same graduate can have multiple valid hashes:**
- Long-form certificate: `abc123...`
- Medium-form CV claim: `def456...`
- Short-form LinkedIn profile: `ghi789...`
- Conference bio variant: `jkl012...`
- Badge text with middle name: `mno345...`
- ...unlimited additional representations

All return `{"status":"verified"}` because they represent the **same underlying credential**.

### Privacy Considerations

**Short-form claims are privacy-preserving:**
- Hash is NOT printed on CV (only `verify:` base URL)
- Only someone with the physical CV can compute the hash
- No public directory of "who graduated where"

**Long-form certificates:**
- If hash IS printed on certificate, anyone seeing certificate can verify
- If hash is NOT printed, requires manual text entry to verify
- University decides privacy policy

## Comparison: Other Credentials

This multi-representation approach works for **any credential that appears in different contexts**:

| Credential Type | Long Form | Medium Form | Short Form | Additional Forms |
|-----------------|-----------|-------------|------------|------------------|
| University degree | Embossed certificate on wall | CV claim | LinkedIn profile | Conference bio, badge text |
| Medical license | Framed wall certificate | Wallet card | Business card | Hospital directory listing |
| Professional certification | Award plaque | Resume claim | Email signature | Online profile badge |
| Art authenticity | Gallery certificate with branding | Auction catalog entry | Museum label text | Provenance summary |
| Property deed | Notarized legal document | Title search summary | Address verification | Tax record entry |
| Utility bill (KYC) | Full PDF statement | Extracted text for KYC | Address verification claim | Customer portal display |

**Same pattern everywhere:** One legal fact, many valid representations for different contexts.

## Conclusion

**Multi-representation approach solves the ornate certificate problem:**

1. **Universities don't need to redesign certificates** - keep the prestige format
2. **Graduates get OCR-friendly verification** - multiple representations for different contexts
3. **Employers get easy verification** - scan CV text, LinkedIn profile, or whatever format fits their workflow
4. **All forms verify the same credential** - no conflict, no ambiguity, unlimited flexibility
5. **Adoption path is clear** - start with basic portal, add more representations as needed

**Bottom line:** You can have beautiful ornate certificates AND practical OCR verification. The credential is the **fact** (Jane has a degree), not the **format** (ornate vs plain vs ultra-brief). Any number of representations can cryptographically verify the same underlying truth.

For implementation details, see [Educational_Degrees.md](deep-dives/Educational_Degrees.md) which focuses on the CV medium-form approach.

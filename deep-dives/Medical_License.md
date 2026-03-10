> Use case catalog: https://live-verify.github.io/live-verify/use-cases/  
> Demo (camera app prototype): https://live-verify.github.io/live-verify/camera-app/

# Medical License Verification: Revocable Credentials with Domain Binding

**Key criteria:** Professional credential with photo. Needs verification by hospitals, staffing agencies, patients. Can be SUSPENDED or REVOKED (malpractice, disciplinary action). Privacy-preserving but enables real-time status checks.

**Real-world context:** The Federation of State Medical Boards reports thousands of disciplinary actions annually. Hospitals hiring locum tenens (traveling physicians) or conducting background checks need instant verification of license status - calling state boards during business hours is slow and doesn't scale.

## Overview

Medical licenses share similar properties to government IDs ([Government_IDs.md](Government_IDs.md)) but with **critical differences**:

1. **Revocation is common** - Malpractice, disciplinary actions, substance abuse violations
2. **Multiple verifier types** - Hospitals (hiring), staffing agencies (placement), patients (peace of mind)
3. **No privacy expectation** - Licensed professionals accept public verification as part of practice
4. **Wallet card format** - Plain text, standard government fonts, OCR-friendly

---

## The Document: Medical License Wallet Card

**California Medical Board License Example:**

```
┌─────────────────────────────────┐
│                                 │
│  CALIFORNIA MEDICAL BOARD       │
│  PHYSICIAN LICENSE              │
│                                 │
│  <PHOTO     License: A123456    │
│   NOT PA    Jane E. Smith, MD   │
│   -RT OF    DOB: 03/15/1985     │
│   OCR TXT>  Specialty: Cardio   │
│                                 │
│  Issued: 01/20/2018             │
│  Expires: 03/15/2026            │
│                                 │
│  verify:mbc.ca.gov/licenses     │
│                                 │
└─────────────────────────────────┘
```

**Critical details:**
- **Hash not printed** - Only base verification URL appears
- **Photo not part of hashed text** - Enables photo updates without changing hash
- **Registration marks** - Black border helps computer vision detection
- **Standard fonts** - Government standard fonts work well with Tesseract.js OCR
- **Wallet-sized** - 3.5" × 2.5" (standard credit card dimensions)

---

## Verification Workflow

**Hospital HR Department verifying physician credentials:**

1. **Physician presents license card** during onboarding/credentialing
2. **HR manager opens verification app** on phone
3. **Scans registration-marked section** with camera
4. **App performs OCR:** Extracts name, license number, specialization, dates
5. **App normalizes text** and computes SHA-256 hash
6. **App constructs URL:** `https://mbc.ca.gov/licenses/{hash}`
7. **State medical board responds** with JSON including status and photo
8. **App displays result:** ✅ Green "VERIFIED by mbc.ca.gov" + photo comparison
9. **HR manager verifies:**
   - Returned photo matches physician's face
   - Returned photo matches physical license card photo
   - Status is "verified" (not REVOKED or SUSPENDED)

**Verification time:** 10-15 seconds (vs 30+ minute phone call to state board)

---

## Verification Scenarios

### Scenario 1: Valid, Active License

**Request:**
```
GET https://mbc.ca.gov/licenses/abc123def456...
```

**Response:**
```json
{
  "status": "verified",
  "photo": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...",
  "issued_date": "2018-01-20",
  "expiry_date": "2026-03-15",
  "specialties": ["Cardiology", "Internal Medicine"],
  "board_certifications": ["ABIM Cardiology (2019)"]
}
```

**App displays:** ✅ Green **VERIFIED by mbc.ca.gov**
**HR action:** Approve hire, proceed with credentialing

### Scenario 2: Suspended License (Pending Investigation)

**Response:**
```json
{
  "status": "SUSPENDED",
  "photo": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...",
  "reason": "Pending malpractice investigation",
  "suspended_date": "2024-11-15",
  "link": "https://mbc.ca.gov/disciplinary-actions/A123456"
}
```

**App displays:** ⚠️ Orange **SUSPENDED by mbc.ca.gov** + reason
**HR action:** Do not hire, contact legal department

### Scenario 3: Revoked License (Permanent Revocation)

**Response:**
```json
{
  "status": "revoked",
  "photo": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...",
  "reason": "Gross negligence resulting in patient death",
  "revoked_date": "2023-06-10",
  "link": "https://mbc.ca.gov/disciplinary-actions/A123456"
}
```

**App displays:** ❌ Red **REVOKED by mbc.ca.gov** + reason
**HR action:** Reject immediately, flag profile in system

### Scenario 4: Forged License (Hash Not Found)

**Request:**
```
GET https://mbc.ca.gov/licenses/fake_hash_value...
→ 404 Not Found
```

**App displays:** ❌ Red **FAILS VERIFICATION**
**HR action:** Reject, report to authorities for investigation

### Scenario 5: Expired License (Needs Renewal)

**Response:**
```json
{
  "status": "EXPIRED",
  "photo": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...",
  "expiry_date": "2024-03-15",
  "renewal_link": "https://mbc.ca.gov/license-renewal"
}
```

**App displays:** ⚠️ Yellow **EXPIRED on 2024-03-15 - verify renewal**
**HR action:** Request proof of renewal before hiring

---

## Why This Solves Medical Credential Verification

**Hospitals & Healthcare Systems:**
- Instant verification during credentialing (no 30-minute phone calls to state boards)
- Detect revoked/suspended licenses before hiring (liability protection)
- Verify locum tenens (traveling physicians) credentials in real-time
- Reduce credentialing fraud (fake licenses, diploma mills)

**Staffing Agencies (Locum Tenens Firms):**
- Verify physician credentials before placement
- Real-time status checks (detect suspensions between placements)
- Faster placement (no waiting for state board phone verification)
- Liability protection (cryptographic proof of verification)

**Patients:**
- Verify their doctor's credentials before appointment (peace of mind)
- Free tier (1-10 verifications/year) for consumer verification
- Check for disciplinary actions, suspensions, revocations
- Transparency into physician qualifications and specialties

**State Medical Boards:**
- Reduce phone call volume (currently handle thousands of verification calls/month)
- Real-time status updates (suspend/revoke licenses instantly visible)
- Fraud deterrence (cryptographic verification harder to fake than phone calls)
- Modernization of verification infrastructure

---

## Why QR Codes FAIL for Medical Licenses

### 1. License Number Enumeration

**Problem with QR codes:**
- QR might encode: `https://mbc.ca.gov/verify?license=A123456`
- Anyone can try sequential numbers: `A123455`, `A123456`, `A123457`...
- Scraper could download entire state's physician database with photos
- HIPAA violation risk (bulk access to physician personal data)

**Live Verify solution:**
- Only someone with physical license can compute hash
- No enumeration vector (hash is not sequential or guessable)
- Privacy-preserving for physicians

### 2. Cloning Attack

**Problem with QR codes:**
- Forger steals real license, photocopies with different photo
- Copies QR code from real license onto fake
- QR verifies "OK" because it points to real physician's record
- No cryptographic binding between text/photo and QR code

**Live Verify solution:**
- Changing photo changes the text ("Jane Smith" → "John Doe")
- Different text → different hash → verification fails
- Cryptographic binding between printed text and verification endpoint

### 3. Domain Spoofing

**Problem with QR codes:**
- Fake license prints QR pointing to `https://medical-board-california.com` (lookalike)
- HR manager scans QR, sees "License Valid" on attacker's server
- Hard to spot domain spoofing during quick verification

**Live Verify solution:**
- Text determines domain ("CALIFORNIA MEDICAL BOARD" → `mbc.ca.gov`)
- App displays: "VERIFIED by mbc.ca.gov" (not fake domain)
- User sees immediately which authority verified the claim

### 4. Visual Clutter on Wallet Card

**Problem with QR codes:**
- Wallet card already has photo, text, holograms, state seal
- Adding QR code clutters small format (3.5" × 2.5")
- Unprofessional appearance for medical credential

**Live Verify solution:**
- Just one small line: `verify:mbc.ca.gov/licenses`
- Clean, professional appearance
- Text is the verification (no machine-only QR code)

---

## Technical Implementation

**Response format** (see [Technical_Concepts.md](Technical_Concepts.md#response-formats) for details):

```json
{
  "status": "verified",
  "photo": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...",
  "issued_date": "2018-01-20",
  "expiry_date": "2026-03-15",
  "specialties": ["Cardiology", "Internal Medicine"],
  "board_certifications": ["ABIM Cardiology (2019)"],
  "disciplinary_actions": []
}
```

**Status codes:**
- `"verified"` - License valid and in good standing
- `"SUSPENDED"` - Temporarily suspended (pending investigation)
- `"REVOKED"` - Permanently revoked (malpractice, fraud, criminal conviction)
- `"EXPIRED"` - Past expiration date (needs renewal)
- `"PROBATION"` - Active but restricted practice (e.g., supervision required)

**Photo encoding:** Base64-encoded JPEG embedded in response (not URL). Prevents enumeration attacks. See [Technical_Concepts.md: Photo Encoding](Technical_Concepts.md#photo-encoding).

**OCR challenges:** Medical license wallet cards use standard government fonts and plain layout - works reliably with Tesseract.js. No ornate decorations or seals that would confuse OCR.

---

## Deployment Considerations

**Infrastructure:**
- State medical boards host verification endpoints (e.g., `https://mbc.ca.gov/licenses/{hash}`)
- Store hash → (status + photo + metadata) mapping in database
- Marginal cost: ~$0.000005 per verification (Cloudflare Workers example)
- Total infrastructure: ~$5 per million verifications

**Pricing Models:**

**Tier 1: High-Volume Commercial (Hospitals, Staffing Agencies)**
- **$500-$1,000/month** unlimited verifications
- API access for bulk credentialing systems
- SLA guarantees (99.9% uptime)
- Priority support

**Tier 2: Background Check Companies**
- **Annual enterprise license** ($5,000-$10,000/year)
- Integration with existing background check platforms
- Bulk verification API
- Audit trail for compliance

**Tier 3: Free Tier (Patients, Individual Verifications)**
- **Free** for 1-10 verifications/year
- Consumer-facing app for peace of mind
- Educational institutions verifying faculty credentials
- Small clinics with low verification volume

**Cost justification:**
- Legal liability protection worth far more than $0.50/verification
- Reduces credentialing department workload (30-minute phone calls eliminated)
- Prevents hiring physicians with revoked licenses (malpractice lawsuit prevention)
- Insurance premium reductions (verified credential checks reduce risk)

**Revenue model:** Similar to [Verification_Charges.md](Verification_Charges.md) freemium approach - free for consumers, paid for commercial high-volume users.

**Rollout timeline:**
- **Year 1:** State medical boards implement verification endpoints
- **Year 2-3:** New licenses printed with `verify:` URLs
- **Year 4-10:** Gradual adoption as licenses renew (typical 2-8 year renewal cycles)
- **Year 10+:** Near-universal coverage as old licenses expire

**Backwards compatibility:**
- Old licenses without `verify:` URLs still valid (phone verification as fallback)
- No infrastructure shock (existing credentialing processes continue)
- Gradual transition over natural license renewal cycle

**Real-time status updates:**
- Medical board suspends license → database status changes to "SUSPENDED" immediately
- All future verifications return SUSPENDED status (no lag time)
- Hospitals can re-verify existing staff periodically (detect suspensions after hire)
- Push notifications possible (alert hospital if employed physician's license status changes)

---

## Privacy & Security Properties

**Domain binding:**
- Text determines which state medical board gets queried
- Can't print "CALIFORNIA MEDICAL BOARD" and have it verify against fake domain
- Cryptographic binding between printed text and verification endpoint

**Revocation capability:**
- Real-time status beyond expiration date (SUSPENDED, REVOKED, PROBATION)
- Immediate visibility of disciplinary actions
- Enables proactive credential monitoring (re-verify employed physicians monthly)

**Photo verification:**
- Base64-encoded photo in response (prevents enumeration)
- Compare returned photo to: (a) physician's face, (b) physical license photo
- Detects stolen licenses with different photos
- SHA-256 sufficient (medical licenses not high-value theft targets like passports)

**No public enumeration:**
- Hash not printed on license (only base URL)
- Can't scrape all physicians by trying sequential license numbers
- Privacy-preserving for physicians (no public database exposure)

**Audit trail:**
- State boards can log verification requests (who verified which license when)
- Fraud detection (unusual verification patterns)
- Compliance reporting (HIPAA, state medical privacy laws)

---

## Comparison to Related Use Cases

**Similar to:**
- **Government IDs** ([Use_Case-Government_IDs.md](Use_Case-Government_IDs.md)) - Same wallet card format, photo verification, revocation capability
- **Educational Degrees** ([Use_Case-Educational_Degrees.md](Use_Case-Educational_Degrees.md)) - Professional credentials, but medical licenses can be revoked

**Different from:**
- **Receipts** ([Use_Case-Sales_Receipts.md](Use_Case-Sales_Receipts.md)) - No revocation, no photo, high-volume
- **Product Certifications** ([Use_Case-Product_Labeling.md](Use_Case-Product_Labeling.md)) - B2B verification, no photo, anti-impersonation focus

**Key distinction:** Medical licenses require **real-time status checks** (suspensions happen mid-career) unlike static credentials (degrees don't get "revoked" retroactively).

---

**Related Documentation:**
- [Technical_Concepts.md](Technical_Concepts.md) - Shared technical explanations (registration marks, domain binding, photo encoding)
- [Use_Case-Government_IDs.md](Use_Case-Government_IDs.md) - Similar wallet card format and verification workflow
- [Verification_Charges.md](Verification_Charges.md) - Business models for free vs paid verification
- [NORMALIZATION.md](../docs/NORMALIZATION.md) - Text normalization rules for consistent hashing

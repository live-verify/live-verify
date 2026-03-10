> Use case catalog: https://live-verify.github.io/live-verify/use-cases/  
> Demo (camera app prototype): https://live-verify.github.io/live-verify/camera-app/

## Point-of-Sale Receipt Case: Preventing Expense Fraud

Expense fraud costs UK businesses [£1.3 billion annually](https://www.expensein.com/blog/expense-fraud/). Common fraud types include duplicate claims, receipt tampering (amount inflation), complete forgery, and tax manipulation. Live Verify prevents all these by making each receipt's text cryptographically verifiable, tamper-evident, and uniquely identifiable.

Key criteria: Business transaction with no privacy expectation. One-off transaction. Needs verifiable for tax/audit period (7 years). Hash must be unique to prevent duplicate claims.

### Example Receipts (HTML Mockups)

You can test the verification system with these example receipt mockups (HTML representations of paper receipts):

**UK Receipts:**
- [UK Coffee Shop](https://live-verify.github.io/live-verify/training-pages/uk-coffee-shop.html) - £8.45 coffee and pastry receipt
- [UK Corner Shop](https://live-verify.github.io/live-verify/training-pages/uk-corner-shop.html) - £4.85 convenience store receipt (compact format)
- [UK Electronics Store](https://live-verify.github.io/live-verify/training-pages/uk-electronics-store.html) - £847.99 laptop purchase

**US Receipts:**
- [US Burrito Shop](https://live-verify.github.io/live-verify/training-pages/us-burrito-shop.html) - $15.08 burrito meal
- [US Home Improvement](https://live-verify.github.io/live-verify/training-pages/us-home-improvement.html) - $680.40 building supplies

**Hotel Receipt:**
- [Hotel Scheidegg (Switzerland)](https://live-verify.github.io/live-verify/training-pages/hotel-receipt-scheidegg.html) - CHF 54.50 restaurant/bar charges

**Note:** These are HTML mockups designed to look like printed receipts. They demonstrate the Live Verify verification system with working `verify:` URLs. You can scan these with the [Live Verify web app](https://live-verify.github.io/live-verify/) by displaying them on one device and scanning with another, or by printing them.

**Example receipt screenshots:**

<div style="display: flex; flex-wrap: wrap; gap: 20px; margin: 20px 0;">
  <div>
    <img src="https://live-verify.github.io/live-verify/screenshots/uk-coffee-shop.png" alt="UK Coffee Shop receipt" width="250">
    <p><em>UK Coffee Shop - £8.45</em></p>
  </div>
  <div>
    <img src="https://live-verify.github.io/live-verify/screenshots/us-burrito-shop.png" alt="US Burrito Shop receipt" width="250">
    <p><em>US Burrito Shop - $15.08</em></p>
  </div>
  <div>
    <img src="https://live-verify.github.io/live-verify/screenshots/hotel-receipt-scheidegg.png" alt="Hotel Scheidegg receipt" width="250">
    <p><em>Hotel Scheidegg - CHF 54.50</em></p>
  </div>
</div>

<div style="display: flex; flex-wrap: wrap; gap: 20px; margin: 20px 0;">
  <div>
    <img src="https://live-verify.github.io/live-verify/screenshots/uk-electronics-store.png" alt="UK Electronics Store receipt" width="250">
    <p><em>UK Electronics Store - £847.99</em></p>
  </div>
  <div>
    <img src="https://live-verify.github.io/live-verify/screenshots/us-home-improvement.png" alt="US Home Improvement receipt" width="250">
    <p><em>US Home Improvement - $680.40</em></p>
  </div>
  <div>
    <img src="https://live-verify.github.io/live-verify/screenshots/uk-corner-shop.png" alt="UK Corner Shop receipt" width="250">
    <p><em>UK Corner Shop - £4.85</em></p>
  </div>
</div>

### The Receipt: Where Live Verify Prevents Fraud

**What's printed on a receipt (typical elements):**
- Merchant name, location, date/time
- Itemized purchases with prices
- Subtotal, tax (VAT/sales tax), total
- Transaction ID or receipt number
- **verify:domain.com/path** URL (Live Verify verification line)

All these elements (except the verify: line itself) contribute to the hash, making each receipt cryptographically unique.

**Critical details:**
- The **transaction details make the hash unique**: Date, time, items, total, VAT/sales tax, transaction ID all contribute to the hash
- **VAT (or sales tax) must be in the hash**: Prevents tampering with tax amounts and enables government audit trail

**Note for US readers:** Value-Added-Tax (VAT) is Sales tax

**Expense workflow (read-only verification):**

1. Employee scans receipt with phone app
2. App OCRs full receipt text (items, subtotal, VAT/sales tax, total, date, transaction ID)
3. App normalizes text (see [Technical_Concepts.md: Text Normalization](Technical_Concepts.md#text-normalization)), computes hash: `a7f3e92b...` using SHA-256 (see [Technical_Concepts.md: Hash Algorithms](Technical_Concepts.md#hash-algorithms))
4. App verifies receipt exists: `GET https://rx.starbucks.com/a7f3e92b...`
5. Starbucks server responds: **200 OK + `{"status":"verified"}`** (receipt is valid) - see [Technical_Concepts.md: Response Formats](Technical_Concepts.md#response-formats)
6. Employee submits expense claim with verified hash
7. Finance department sees "✓ Verified against Starbucks"

**Duplicate claim detection (requires additional infrastructure):**

The simple GET verification above only confirms the receipt exists. To prevent double-expensing, one of these deployment models is needed:

**Option A: Employer tracks claims internally**
- Expense system maintains database of claimed receipt hashes
- Second claim of same hash → flagged as duplicate
- No mutation needed on merchant's server
- Simple, but each employer tracks independently

**Option B: Third-party clearinghouse (recommended)**
- ExpenseClear.com receives hash from POS systems
- First employee to claim registers with clearinghouse
- Second attempt → clearinghouse returns "Already claimed"
- See "Deployment Models" section below for details

**Types of expense fraud prevented:**

**1. Receipt Tampering / Amount Inflation**
- Change "£7.50" to "£75.00" → different hash → verification fails
- Alter item quantities, add extra items → hash mismatch
- Cannot modify any text within registration marks without detection

**2. Complete Forgery / Fake Receipts**
- Create entirely fake receipt → hash won't verify against real merchant domain
- Even if fake receipt includes verify: URL, merchant won't have that hash in database
- Domain binding ensures receipt must verify against claimed merchant's actual domain

**3. Duplicate Claims (Photocopying)**
- Same text → same hash → duplicate claim caught (if using clearinghouse or internal tracking)
- Employee can't submit same receipt to multiple employers (Model B clearinghouse)
- Consultancies can't bill multiple clients for same expense (Model B/C needed)

**4. Tax Fraud / VAT Tampering**
- Tax amount is in the hash → can't under-report VAT/sales tax
- Government can verify all VAT was correctly reported
- Prevents tax evasion through receipt manipulation

**5. Receipt Substitution**
- Can't claim personal expense as business expense → hash won't match business transaction
- Timestamp + transaction ID ensure each receipt is uniquely tied to specific purchase
- Cannot swap receipts between transactions

### Why QR Codes FAIL for Receipt Verification

**1. Static QR Enables Duplicate Claims**

- Receipt printed with QR: `https://starbucks.com/verify?ref=STB-45829`
- Employee expenses receipt → QR verifies as valid
- Employee photocopies receipt + QR → **QR still verifies as valid**
- No cryptographic binding prevents duplicate expense claims
- Merchant would need to track ref codes, but employee could claim at different times/companies

**2. Reference ID Privacy Leak**

- QR encodes transaction ref `STB-EDI-45829`
- Anyone scanning QR can query: items purchased, location, time
- Employee's purchase history potentially accessible
- With Live Verify: hash reveals nothing about transaction content

**3. Forgery Risk**

- Print fake receipt + QR pointing to attacker-controlled server
- Server responds "Valid receipt ✓"
- Finance department fooled unless they manually check domain
- Live Verify: receipt text must verify against claimed merchant's domain

**4. Receipt Tampering Undetected**

- Change "£7.50" to "£75.00" on printed receipt
- QR still points to original transaction verification
- QR still verifies as valid despite altered amount
- Live Verify: altered text → different hash → verification fails

### The Thermal Receipt Problem: QR as Supplement

**Challenge:** Thermal receipts fade over time (3-6 months)

**Hybrid approach:**
```
┌─────────────────────────────┐
│ Starbucks Coffee            │
│ [transaction details]       │
│                             │
│ verify:starbucks.com/tx     │
│                             │
│ [QR code to PDF archive]    │
└─────────────────────────────┘
```

- **Live Verify section:** Verify immediately after purchase (while text readable)
- **QR code:** Links to permanent PDF archive of receipt (for warranty/returns)
- **Best practice:** Employee scans for expense verification before receipt fades
- **QR benefit:** Long-term proof of purchase even after thermal text degrades

### Who Benefits from Receipt Verification

**Employees:**
- Prove expenses are authentic without keeping paper receipts
- Can't be accused of duplicate claiming (verification proves first claim)

**Employers:**
- Eliminate duplicate expense fraud (saves UK businesses £1.3bn/year)
- No need to maintain internal receipt database
- Automated verification reduces manual audit effort

**Merchants:**
- Reduce disputes ("I never bought this!")
- Build trust with business customers
- Minimal infrastructure cost (just host hashes)

### Deployment Models for Receipt Verification

The basic Live Verify verification (GET request confirms receipt exists) is straightforward, but **preventing duplicate expense claims** requires additional infrastructure. Three practical deployment models:

**Model A: Employer-Only Tracking**
- Employer's expense system maintains internal database of claimed receipt hashes
- Merchant hosts verification: `GET https://rx.starbucks.com/{hash}` → 200 OK
- First claim: Hash stored in employer's database
- Second claim from same employee: Rejected immediately (duplicate)
- **Pros:** Simple, no third-party dependencies, employer controls data
- **Cons:** Only prevents duplicates within single employer (consultancy can bill multiple clients for same receipt)
- **Use case:** Small/medium businesses with in-house expense systems

**Model B: Third-Party Clearinghouse (Recommended)**
- ExpenseClear.com receives hash from POS systems when transaction occurs
- First employee to claim hash registers with clearinghouse
- Second attempt from any company: Clearinghouse returns "Already claimed"
- **Pros:** Prevents cross-company fraud (consultancies billing multiple clients), no employer infrastructure needed
- **Cons:** Third-party dependency, clearinghouse must be trusted
- **Use case:** Large enterprises, consultancies, expense management platforms (Expensify, Concur)

**Model C: Government Tax Registry**
- POS systems submit receipt hashes to tax authority (HMRC, IRS) in real-time
- Government tracks all VAT/sales tax collected (audit trail)
- Government flags duplicate expense claims across all companies
- **Pros:** Tax fraud prevention, long-term archive beyond company bankruptcy, universal coverage
- **Cons:** Government surveillance, privacy concerns, regulatory requirement needed
- **Existing examples:** Sweden's digital cash registers (2010), Italy's electronic invoicing, Estonia's KSI blockchain
- **Use case:** Countries with strong tax compliance infrastructure

**Consultancy fraud scenario (Model B or C needed):**
- WorksThought Inc. bills Google £9 for receipt (hash `a7f3e92b...`)
- WorksThought bills Amazon £9 for same receipt (hash `a7f3e92b...`)
- Without clearinghouse/government: Fraud undetected (each client sees one claim)
- With clearinghouse/government: Second claim flagged, fraud detected immediately
- **Impact:** Prevents cross-client double-expensing (£1.3bn annual UK fraud)

**Bankruptcy handling:**
- Merchant goes bankrupt → verification endpoint dies
- Government archive takes over: `https://archived-receipts.hmrc.gov.uk/starbucks.com/{hash}`
- Retention: 7 years (tax audit statute of limitations)

---

## Pricing Model: Who Pays for Verification?

**Core principle:** Receipt verification benefits multiple parties (employers, merchants, tax authorities). Cost should be distributed across beneficiaries, with ultra-low marginal cost. See [Verification_Charges.md](Verification_Charges.md) for ethical framework.

### Infrastructure Costs

**Marginal cost per verification:** ~$0.000001 (one cent per 10,000 verifications)

**Example for Starbucks (20,000 stores globally):**
- 100M receipts/year globally
- Each receipt verified 0-2 times (employees expense, employers audit, tax authorities check)
- Total verifications: 50M-200M/year
- Infrastructure cost: $50-200/year (Cloudflare Workers, serverless hosting)
- **Rounding error** compared to POS infrastructure ($millions/year)

### Tier 1: Merchants (Issuers)

**Cost to merchant:** Near-zero infrastructure cost (~$100-500/year)

**Why merchants should host verification:**
- **Already compensated:** Transaction fees (2-3% credit card fees) cover all costs
- **Reduces disputes:** "I never bought this" claims resolved instantly
- **B2B customer value:** Business customers prefer merchants with verifiable receipts
- **Tax compliance:** Required for VAT/sales tax audit trail (may become mandatory)
- **Competitive advantage:** Early adopters attract corporate customers

**Starbucks perspective:**
- Serves 100M customers/year, many are business travelers/employees
- Infrastructure: $500/year (serverless endpoint)
- Benefit: Reduces receipt disputes, builds trust with corporate accounts
- **ROI:** Even preventing 10 disputes/year at $50 staff time each = $500 saved

**Implementation:**
- POS system generates hash when printing receipt
- Hash stored in cloud database (DynamoDB, PostgreSQL)
- Verification endpoint: `https://rx.starbucks.com/{hash}` → 200 OK
- Marginal cost per transaction: $0.000001 (negligible)

### Tier 2: Employees (Claimants)

**Cost to employee:** FREE

**Why free for employees:**
- Employees already paid for goods/services (transaction complete)
- Verification benefits employer (fraud prevention), not employee
- Charging employees creates friction (reduces adoption)
- Public interest in reducing expense fraud (£1.3bn annual UK fraud)

**Employee value:**
- Proves expenses are legitimate (can't be falsely accused)
- No need to keep paper receipts (digital verification sufficient)
- Faster expense reimbursement (automated verification, no manual audit)

### Tier 3: Employers (Verifiers)

**Free tier (small businesses, individuals):**
- **Cost:** FREE for 1-100 verifications/month
- **Use case:** Small businesses, individual expense verification
- **Access:** Web app (scan receipt, verify against merchant)

**Paid tier (medium/large employers):**
- **Cost:** $50-500/month for unlimited verifications
- **Use case:** Companies with 50+ employees, expense management platforms (Expensify, Concur)
- **Features:**
  - API access for bulk verification
  - Integration with expense management systems
  - Duplicate claim detection (internal database)
  - Audit trail for compliance (SOX, HMRC, IRS)
  - SLA guarantees (99.9% uptime)

**Why charge employers:**
- Employers derive huge value (prevents £1.3bn annual UK fraud)
- Cost per verification ($0.01-0.10) far lower than manual audit ($15-30 staff time)
- Legal liability protection (cryptographic proof of verification)
- Reduces fraud losses (typical company loses 5% of revenue to expense fraud)

**ROI calculation (500-person company):**
- 500 employees × 10 receipts/month = 5,000 receipts/month
- Traditional manual audit: 10% spot-check × $15 labor = $7,500/month
- Live Verify paid tier: $500/month unlimited verifications
- **Savings:** $7,000/month ($84,000/year)
- Plus: Detects duplicate claims that manual audit misses (additional savings)

### Tier 4: Third-Party Clearinghouses

**Business model:** Clearinghouse (ExpenseClear.com) prevents cross-company duplicate claiming

**Revenue sources:**
1. **Employer subscriptions:** $500-$5,000/year per company
   - Large enterprises: $5,000/year (unlimited employees, API access)
   - Medium businesses: $1,000/year (up to 500 employees)
   - Small businesses: FREE (up to 50 employees, supported by large customer revenue)

2. **POS integration fees:** $1,000-$10,000 one-time per merchant chain
   - Starbucks pays $10,000 to integrate POS → clearinghouse
   - One-time engineering cost, amortized over years
   - Clearinghouse provides SDK/API for easy integration

**Clearinghouse value proposition:**
- Prevents consultancy fraud (billing multiple clients for same receipt)
- No infrastructure burden on individual employers
- Universal coverage (detects duplicates across all participating companies)
- Audit trail for tax authorities (HMRC, IRS can query clearinghouse)

**Cost justification (large enterprise):**
- 10,000 employees
- 5% expense fraud rate (industry average) × $50M annual expenses = $2.5M fraud/year
- Clearinghouse subscription: $5,000/year
- **ROI:** Even reducing fraud by 1% = $500K saved = 100x ROI

### Tier 5: Government Tax Authorities (Model C)

**Cost to government:** $1M-10M initial infrastructure, $100K-1M/year operations

**Why government might fund this:**
- **Tax fraud prevention:** Ensures all VAT/sales tax properly reported ($10bn+ annual UK tax gap)
- **Audit efficiency:** Instant verification vs manual audit (thousands of staff hours saved)
- **Long-term archive:** Maintains receipt records beyond company bankruptcy
- **Economic benefit:** Reduces expense fraud across entire economy (£1.3bn/year UK)

**Revenue model (if government charges):**
- **Merchants:** $500-$5,000/year per chain (sliding scale by transaction volume)
- **Employers:** FREE for individuals/small businesses, $100-1,000/year for large enterprises
- **Goal:** Cost recovery, not profit (public service)

**Real-world examples:**
- **Sweden:** Government-mandated digital cash registers (2010) - funded by tax revenue
- **Italy:** Electronic invoicing system - free for businesses, government-funded
- **Estonia:** KSI blockchain verification - government public service

**UK Government ROI:**
- £10bn annual tax gap (underreported VAT/sales tax)
- Receipt verification infrastructure: £10M initial + £1M/year
- Even recovering 1% of tax gap (£100M/year) = 100x ROI
- Plus: Reduces expense fraud (£1.3bn/year) across UK economy

### Cost Comparison: Live Verify vs Traditional Methods

| Verification Method | Time | Cost (Employer) | Fraud Detection Rate |
|---------------------|------|-----------------|----------------------|
| **Manual spot check (10%)** | 5 min/receipt | $15-30 (staff time) | 60% (only checks sampled receipts) |
| **Full manual audit** | 5 min/receipt | $15-30 per receipt | 85% (time-consuming, misses duplicates across employees) |
| **No verification (trust employees)** | 0 sec | $0 | 0% (expense fraud = £1.3bn/year UK) |
| **Live Verify (this system)** | 10 sec/receipt | $0 (free tier) / $0.01 (paid tier) | 99%+ (cryptographic, detects duplicates instantly) |

**Employer perspective:**
- 500 employees × 10 receipts/month = 5,000 receipts/month
- Manual audit cost: 10% × 500 receipts × $20 = $10,000/month
- Live Verify cost: $500/month (paid tier) = **$9,500/month savings**
- Plus: Detects cross-employee duplicate claims that manual audit misses

### Revenue Model Options for Clearinghouses

**Option A: Freemium (Recommended)**
- Free for small businesses (1-50 employees)
- Paid for medium/large enterprises ($500-$5,000/year)
- POS integration fees from merchants ($1,000-$10,000 one-time)
- **Outcome:** Wide adoption, revenue from those deriving most value

**Option B: Employer-Only Fees**
- Merchants integrate for free (public good, anti-fraud)
- Employers pay per verification ($0.10-0.50 per receipt)
- Large enterprises negotiate unlimited plans
- **Outcome:** Merchants adopt easily, employers pay for fraud prevention

**Option C: Government-Funded (Model C)**
- Government mandates clearinghouse or runs it directly
- Free for all participants (merchants, employers, employees)
- Funded by tax revenue (justification: reduces £1.3bn fraud + £10bn tax gap)
- **Outcome:** Universal coverage, no adoption friction

**Most likely:** Hybrid of A + C - Private clearinghouses (freemium) in countries without government systems, government-funded in countries with strong tax compliance infrastructure (Sweden, Italy, Estonia model).

---

## Related Documentation

**Technical implementation details:**
- [Technical_Concepts.md](Technical_Concepts.md) - Text normalization (critical for thermal receipts with varied OCR), hash algorithms, response formats
- [NORMALIZATION.md](NORMALIZATION.md) - Detailed text normalization rules for consistent hashing across different OCR engines

**Business model & pricing:**
- [Verification_Charges.md](Verification_Charges.md) - Ethical framework for who pays (multi-party beneficiary model)

**Related use cases:**
- [Use_Case-Voting_Proof.md](Use_Case-Voting_Proof.md) - Similar clearinghouse model (independent auditor)
- [Use_Case-Product_Labeling.md](Use_Case-Product_Labeling.md) - B2B verification with tax compliance angle
- [Use_Case-Educational_Degrees.md](Use_Case-Educational_Degrees.md) - Anti-double-dipping principle (different from receipt verification where multiple parties benefit)

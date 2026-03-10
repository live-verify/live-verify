# Verification Charges: Free vs Paid Models

Organizations hosting verification endpoints must decide whether to offer verification as a free public service or implement a revenue-generating business model. This document explores both approaches, their trade-offs, and implementation details.

## Overview

The marginal cost of serving hash verification requests is extremely low (≈$0.000005 per verification using serverless infrastructure), but organizations face strategic decisions about pricing that go beyond pure infrastructure costs.

**Reality check:** Most credentials will offer **free verification** because:
- Universities, governments, medical boards already collected payment for issuance (charging again = "double-dipping")
- Infrastructure cost is trivial ($0.27/year for a typical university with 50K verifications)
- Public mission, brand reputation, and stakeholder relations outweigh minimal potential revenue
- Ethical principle: **If you charged for the credential, don't charge again for proving it exists**

**Paid verification** makes sense for a **minority of cases**:
- Commercial verification services (no credential issued)
- B2B certifications where verifier (not subject) gets value
- High-volume commercial users willing to pay for convenience

The choice depends on:

- Organizational mission (public service vs commercial entity)
- User base (individuals vs commercial verifiers)
- Whether payment was already collected for credential issuance
- Verification volume and abuse risk
- Revenue needs and business model
- Legal and regulatory context

## The Free Verification Case

Many organizations choose to offer **free, unlimited verification** for several compelling reasons.

### Why Organizations Offer Free Verification

**1. Public Mission Alignment**
- Universities: Degree verification helps graduates secure employment
- Government agencies: Public records should be publicly verifiable
- Medical boards: Patient safety requires easy license verification
- Standards bodies: Product safety benefits from transparent certification

**2. Brand Reputation**
- "We stand behind our degrees/certifications"
- Demonstrates confidence in issued credentials
- Builds trust with stakeholders
- Positive public relations value

**3. Marginal Cost is Trivial**
- Infrastructure cost: ≈$5.37 per million verifications (see cost breakdown below)
- For a university issuing 10,000 degrees/year with 50,000 verifications/year: **$0.27 annual cost**
- Rounding error in IT budget for most institutions

**4. Alumni/Stakeholder Relations**
- Universities: Alumni appreciate easy verification, [often donate back](https://wonkhe.com/blogs/what-alumni-donations-can-tell-us-about-the-relationship-between-students-and-their-universities/)
- Professional associations: Member benefit increases retention
- Certification bodies: Easier verification increases certification value

**5. Already Funded Through Other Channels**
- Universities: Tuition, endowments, government funding
- Government agencies: Tax revenue
- Professional boards: License fees, membership dues

### Examples of Free Verification

- **Universities verifying degrees** - Public mission, helps alumni
- **Government IDs** - State/national agencies verifying licenses, birth certificates, permits
- **Medical boards** - Active license status (public safety concern)
- **Open standards bodies** - Product certifications (promotes adoption)
- **Voting authorities** - Ballot verification (transparency requirement)

### Free Verification with Rate Limiting

Even free services typically implement **abuse prevention**:

```json
{
  "rate_limit": "100 verifications per IP per day",
  "bulk_access": "Contact us for API key",
  "abuse_policy": "Systematic scraping will be blocked"
}
```

**Why rate limiting matters:**
- Prevents bulk scraping of verification databases
- Deters rainbow table attacks (systematic hash guessing)
- Protects infrastructure from DoS attacks
- Identifies legitimate high-volume users who should contact directly

## The Paid Verification Case

Other organizations choose to **charge for verification lookups**, creating a sustainable revenue stream.

### Why Organizations Charge for Verification

**1. Revenue Generation**
- Certification bodies: Verification fees fund ongoing operations
- Commercial document services: Core business model
- Testing/inspection agencies: Additional revenue stream

**2. High-Value Legal Attestation**
- Employment verification: Prevents hiring fraud ($50,000+ liability per incident)
- Financial document authentication: Prevents loan fraud
- Product certifications: Prevents supply chain fraud (MedPro/Intertek case)
- Medical credentials: Prevents practitioner fraud

**3. Commercial User Base**
- Recruitment agencies verifying thousands of candidates monthly
- Insurance companies verifying claims
- Financial institutions verifying loan documents
- Retailers verifying supplier certifications

**4. Abuse Prevention Through Economics**
- Charging deters bulk scraping and frivolous lookups
- Creates audit trail of verification activity
- Self-selects serious verifiers

**5. Service Quality Differentiation**
- Free tier: Basic verification, rate-limited
- Paid tier: Faster response, SLA guarantees, bulk API, priority support

### Examples of Paid Verification

- **B2B product certifications** - Intertek, UL, testing labs charging for lookup
- **Employment verification services** - Background check companies pay per verification
- **Financial document authentication** - Banks, lenders verifying contracts
- **Professional certifications** - IT certifications, financial credentials
- **Medical license verification** - Hospitals, staffing agencies verify credentials

## The Bloomberg Model: Pay-Per-Verification with Non-Caching

Organizations can implement a **recurring revenue model** similar to how Bloomberg charges for financial data queries. This prevents verifiers from caching results and only paying once.

### How It Works

**Traditional caching breaks the model:**
- Verifier caches "hash X = OK" response locally
- They only pay once, then verify internally forever
- Issuing organization loses recurring revenue
- No incentive to maintain infrastructure long-term

**Bloomberg-style non-caching enforcement:**
- Each verification lookup is a fresh API call to issuer
- Issuer tracks usage and charges accordingly
- Verifiers cannot rely on cached data (certificates may be revoked)
- Creates sustainable recurring revenue model

### Why Non-Caching Makes Sense

**1. Revocation requires fresh lookups:**
- Medical licenses can be SUSPENDED or REVOKED
- Certifications can be SUPERSEDED by newer versions
- Credentials can be retroactively invalidated
- Cached "OK" becomes stale and misleading

**2. Legal liability for verifiers:**
- Hiring someone whose license was revoked → Lawsuit
- Using expired certification → Compliance violation
- Relying on cached data = accepting stale verification

**3. Value aligns with usage:**
- High-volume verifiers (recruitment agencies) get more value, pay more
- Occasional verifiers (one-off background checks) pay less
- Fair pricing based on actual usage

### Technical Implementation

**Rate limiting and authentication:**
```
GET https://university.edu/verify/{HASH}
Headers:
  Authorization: Bearer {API_KEY}
  X-Verifier-ID: RecruitCorp-12345
```

**Pricing models:**
- **Per-verification**: $0.10 - $0.50 per hash lookup (varies by credential type)
- **Monthly subscription**: Unlimited verifications for $500-$5,000/month
- **Volume tiers**: Bulk discounts for high-volume verifiers (e.g., 10,000+ verifications/month)

**Anti-caching measures:**

Response includes explicit cache control headers and usage tracking:

```json
{
  "hash": "09d1e6765c2dbd833e5a1f4770d9f0c9...",
  "status": "verified",
  "verified_at": "2025-01-26T14:30:00Z",
  "cache_control": "no-store, no-cache, must-revalidate",
  "pricing": {
    "cost": 0.10,
    "currency": "USD",
    "remaining_quota": 950
  }
}
```

**Why organizations may pay:**

1. **Legal liability protection** - Cost of verification ($0.10) << Cost of hiring fraud ($50,000+ settlement)
2. **Competitive advantage** - "All candidates verified ✓" becomes selling point
3. **Required by regulation** - Healthcare, finance, education must verify credentials
4. **Insurance discounts** - EPLI premiums reduced with verified hiring practices

## The Freemium Model: Hybrid Approach

Many organizations adopt a **hybrid free/paid model** that balances public access with commercial revenue.

### Structure

**Free Tier (for individuals):**
- Rate limit: 10 verifications per month per IP address
- Purpose: Let individuals verify their own credentials
- Use case: Job applicant checking their own degree verification works

**Paid Tier (for commercial use):**
- No rate limits (or much higher limits)
- Bulk API access
- SLA guarantees (99.9% uptime)
- Priority support
- Usage analytics

### Example Pricing

```json
{
  "issuer": "Unseen University",
  "verification_pricing": {
    "public_free_tier": {
      "rate_limit": "10 per month per IP address",
      "description": "Free for individuals verifying their own credentials"
    },
    "commercial_tier": {
      "cost": 0.10,
      "currency": "USD",
      "token-setup": "https://unseen-university.api-gateways.salesforce.com",
      "description": "Volume discounts available",
      "sla": "99.9% uptime, <100ms response time"
    }
  }
}
```

### Why Freemium Works

**1. Supports public access** - Individuals can verify credentials without paying
**2. Monetizes commercial use** - Companies get value, can afford to pay
**3. Abuse prevention** - Free tier rate limits prevent bulk scraping
**4. Fair value exchange** - Heavy users pay, light users don't
**5. GDPR compliance** - Individuals have free access to verify their own data

Perhaps resource not found (404) is always free, even if rate limit and anti-abuse technologies are always activated.

## Server-Side Implementation Costs

Organizations can use **serverless infrastructure** to minimize costs while charging for verifications. The marginal cost per verification is extremely low.

### Example: Cloudflare-based Architecture

A typical implementation using Cloudflare's edge platform:

**Architecture:**
1. **Cloudflare Workers** - Edge compute to handle incoming GET requests for `/{HASH}`
2. **Cloudflare R2** - Object storage containing the hash → status mapping (e.g., `09d1e6765c2d...` → `OK`)
3. **Stripe** (optional) - Usage metering and billing for commercial API users

**Cost breakdown per million verifications:**

| Component                                            | Cost per million GETs | Notes                                    |
|------------------------------------------------------|-----------------------|------------------------------------------|
| [R2](https://developers.cloudflare.com/r2/) read ops | $0.36                 | Object storage lookups (negligible)      |
| [Worker](https://workers.cloudflare.com/) exec       | $5.00                 | Edge compute execution (main cost)       |
| [Stripe](https://stripe.com/) usage reporting        | ≈ $0.01               | Metering API calls (if batched)          |
| **Total infrastructure cost**                        | **≈ $5.37 / million** | **~$0.0000054 per verification**         |

**Margin analysis:**

If charging **$0.10 per verification**:
- Infrastructure cost: $0.0000054
- Revenue: $0.10
- **Margin: ~99.99%** ($0.09999946 profit per verification)

If charging **$0.50 per verification** (medical licenses):
- Infrastructure cost: $0.0000054
- Revenue: $0.50
- **Margin: ~99.999%** ($0.49999946 profit per verification)

### Implications

1. **Premium entities can charge substantially** - Infrastructure costs are negligible compared to the value of legal attestation
2. **Many organizations will offer free verification** - Marginal cost is so low that free public verification is sustainable
3. **Tiered pricing makes sense** - Free tier for individuals (10/month), paid tier for commercial bulk verification
4. **Cost of doing business** - For public institutions (universities, medical boards), free verification is a rounding error in IT budget

### Why Organizations Might Still Charge

Even with trivial infrastructure costs:

- **Revenue generation** - Even at $0.10/verification, 1 million lookups = $100,000 revenue vs $5.37 costs
- **Abuse prevention** - Charging deters bulk scraping and frivolous lookups
- **Service quality** - Paid tiers get faster response times, SLA guarantees, bulk APIs
- **Regulatory funding** - Medical boards and licensing agencies can use verification fees to fund operations

### Free vs Paid Decision Factors

Organizations like universities may offer **free verification** because:
- Brand reputation ("We stand behind our degrees")
- Alumni relations (helps graduates get jobs)
- Marginal cost is trivial ($5.37 per million accesses)
- Public mission alignment

Organizations like medical boards may **charge** because:
- Legal liability protection is worth paying for
- High-frequency commercial users (hospitals, staffing agencies) can afford it
- Revenue helps fund regulatory oversight

## Integration with verification-meta.json

Organizations can publish their pricing information in the metadata file at `https://example.com/c/verification-meta.json`:

```json
{
  "issuer": "Unseen University",
  "claimType": "Academic degree",
  "verification_pricing": {
    "public_free_tier": {
      "rate_limit": "10 per month per IP address",
      "description": "Free for individuals verifying their own credentials"
    },
    "commercial_tier": {
      "cost": 0.10,
      "currency": "USD",
      "volume_discounts": [
        {"min": 1000, "max": 9999, "cost": 0.08},
        {"min": 10000, "max": 99999, "cost": 0.05},
        {"min": 100000, "max": null, "cost": 0.03}
      ],
      "token-setup": "https://unseen-university.api-gateways.salesforce.com",
      "description": "Contact sales for enterprise contracts",
      "sla": "99.9% uptime, <100ms response time"
    }
  },
  "responseTypes": {
    "verified": {
      "class": "affirming",
      "text": "This degree is verified and authentic"
    },
    "revoked": {
      "class": "denying",
      "text": "This degree has been revoked due to academic misconduct"
    }
  }
}
```

This transparency allows verifiers to:
- Understand pricing before implementing integration
- See volume discount tiers
- Contact sales for enterprise contracts
- Know the free tier limits

## Ethical Framework: Avoiding Double-Dipping

Organizations that **already collected payment** for issuing the credential should offer **free verification** to avoid charging twice for the same value.

### The Principle

**If you were paid to issue the credential, verification should be free.**

This prevents "double-dipping" - charging both for issuance AND for verification of the same credential.

### Examples

**Should be FREE (already paid for issuance):**

✅ **University degrees** - Student paid tuition (£9,000-50,000/year for 3-4 years)
- The degree was the product purchased
- Verification is just confirming what was already paid for
- **Charging for verification = double-dipping**

✅ **Driver's licenses** - Citizen paid license fee ($50-200)
- The license itself was purchased
- Verification should be free public service
- **Charging for verification = double-dipping**

✅ **Professional certifications** - Individual paid exam/certification fee ($200-1,500)
- The certification was the product
- Verification confirms the credential that was already paid for
- **Charging for verification = double-dipping**

✅ **Product safety certifications** - Manufacturer paid testing fee ($5,000-50,000)
- The manufacturer paid for testing and certification
- Retailers/consumers shouldn't pay again to verify it
- **Charging for verification = double-dipping**

**May charge (no payment for issuance):**

💰 **Birth certificates (ongoing verification)** - One-time issuance was free or nominal
- Original certificate issued by government at birth (free or $20)
- Decades of ongoing verification infrastructure has ongoing cost
- Could charge for bulk commercial use (background checks, fraud prevention)
- **Not double-dipping if verification cost > issuance cost over time**

💰 **Employment verification letters** - Letter itself was free
- Employer issued letter at no cost to employee
- Third-party verification service aggregates and verifies
- Commercial verifiers (recruitment agencies) pay for convenience
- **Not double-dipping if original was free**

💰 **Renewable certifications with no sustaining payment** - Certification expires if not renewed
- Original certification paid once, but requires renewal to stay valid
- If no renewal fee collected, ongoing verification infrastructure needs funding
- Could charge for verification lookups
- **Not double-dipping if no sustaining revenue stream**

### Time-Limited Free Verification

For credentials with an **expected useful lifetime**, free verification should last at least that long:

- **University degree**: Lifetime free verification (degree never expires)
- **Driver's license**: Free verification until expiration date (5-10 years)
- **Product certification**: Free verification for product lifecycle (warranty period)
- **Professional license**: Free verification until renewal period
- **Medical license**: Free verification while active (with REVOKED status if needed)

After the credential expires naturally, charging for historical verification may be acceptable:

- Verifying an expired 1995 driver's license in 2025 (30 years later) - May charge
- Verifying a current active license - Should be free (citizen paid for it)

### Exceptions: Freemium for Abuse Prevention

Even when verification "should" be free based on payment principle, organizations may implement **freemium with rate limiting**:

**Free tier:**
- Individuals verifying their own credentials (10/month)
- Legitimate one-off verifications

**Paid tier:**
- Bulk commercial use (recruitment agencies doing thousands/month)
- Prevents systematic scraping and abuse
- Commercial users get value, can afford modest fee

This is **not double-dipping** if:
- Individual free tier exists (original payer has free access)
- Paid tier is for convenience/volume, not basic access
- Fees fund abuse prevention infrastructure, not profit

### The Collectivist Ideal

In an ideal system, **all verification would be free** as a public good:

- Organizations already collected payment for issuance
- Marginal cost of verification is trivial ($0.000005 per lookup)
- Public benefit of transparent verification outweighs revenue potential
- Prevents "verification tax" on education, employment, commerce
- Information wants to be free (once you've paid for the credential)

However, pragmatic considerations include:
- Preventing abuse (bulk scraping, rainbow tables)
- Funding long-term infrastructure (decades of verification)
- Monetizing commercial convenience (bulk APIs, SLAs)
- Supporting organizations with no other revenue (certification bodies)

The ethical line: **If you charged for the credential, don't charge again for proving it exists.**

## Decision Framework for Issuers

### Choose FREE Verification When:

✅ **Public institution with mission-driven mandate**
- Universities, government agencies, medical boards
- Verification supports core public service mission
- Already funded through tuition, taxes, or dues

✅ **Verification supports core service value**
- Degree verification helps graduates (university's mission)
- License verification ensures patient safety (medical board's mission)
- Product certification promotes safety standards (standards body's mission)

✅ **Cost is negligible relative to budget**
- Infrastructure cost: $5-$10/year for typical university
- IT operations budget: $5-50 million/year
- Verification cost: 0.0001% of budget (rounding error)

✅ **Brand reputation benefits outweigh revenue**
- "We stand behind our degrees" messaging
- Alumni goodwill and donor relations
- Public trust and transparency

### Choose PAID Verification When:

💰 **Commercial entity with profit motive**
- Testing labs, certification bodies, verification services
- Verification is a product, not a public service
- Revenue funds operations

💰 **High-value verifications with legal implications**
- Employment verification prevents hiring fraud
- Product certifications prevent supply chain fraud
- Financial document verification prevents loan fraud

💰 **Commercial users are primary verifiers**
- Recruitment agencies, background check companies
- Insurance companies, financial institutions
- Retailers verifying supplier certifications

💰 **Need to fund ongoing operations**
- Certification body needs revenue for inspections
- Testing lab needs to maintain accreditation
- Verification service is the core business

### Choose FREEMIUM When:

🔀 **Want to support individuals while monetizing commercial use**
- Individuals verify their own credentials for free
- Companies pay for bulk verification services
- Fair value exchange based on usage

🔀 **Need abuse prevention without excluding public access**
- Free tier with rate limits prevents scraping
- Paid tier removes limits for legitimate commercial use
- Balances accessibility and sustainability

🔀 **Different user segments have different value propositions**
- Job applicants: Low volume, high personal value, can't afford to pay
- Recruitment agencies: High volume, commercial value, can afford to pay
- Pricing reflects value received

## Economic Sustainability

**Why charging works:**

1. **Issuers get recurring revenue** for maintaining verification infrastructure
2. **Verifiers get legal protection** and competitive advantage
3. **Subjects (graduates, license holders) get free lookups** to verify their own credentials (GDPR compliance)
4. **Public good maintained** while preventing tragedy of the commons

**Example: University degree verification**
- University maintains verification endpoint: $50,000/year (servers, staff, security)
- 10,000 verifications/year × $0.50 = $5,000 revenue
- Break-even requires: Higher volume OR higher per-verification price OR enterprise contracts
- Solution: Tiered pricing + enterprise contracts with major employers (LinkedIn, Indeed, etc.)

**Example: Medical license verification**
- Medical board maintains endpoint: $100,000/year (servers, legal compliance, revocation tracking)
- 500,000 verifications/year × $0.25 = $125,000 revenue
- Profitable at scale with commercial users (hospitals, staffing agencies)
- Free tier for public (10/month) ensures patient safety transparency

## Conclusion

**Most credentials will be verified for free.** The combination of trivial infrastructure costs ($0.000005 per verification), ethical concerns about "double-dipping," and public mission alignment means that universities, governments, medical boards, and most credential issuers will offer free verification.

**The majority case: FREE**
- Universities (already paid via tuition)
- Government IDs (public service mission)
- Medical/professional licenses (public safety, already paid license fees)
- Product certifications (manufacturer already paid testing fees)
- Cost is negligible ($0.27/year for typical university)

**The minority case: PAID**
- Commercial verification services (The Work Number, HireRight)
- B2B certifications where commercial verifiers get the value
- Freemium models for abuse prevention (free for individuals, paid for bulk commercial use)

The extremely low marginal cost means both models are technically viable, but **ethical and practical considerations strongly favor free verification** for the vast majority of credentials. Organizations that charged for credential issuance should not charge again for verification—that's double-dipping.

Paid models make sense primarily when:
1. No payment was collected for issuance (employment letters, birth certificates)
2. Commercial users (not credential holders) are the verifiers
3. Verification service itself is the product being sold

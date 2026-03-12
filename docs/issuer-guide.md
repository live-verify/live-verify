# Issuer Guide: Creating Verifiable Documents

This guide is for organizations that want to issue verifiable documents — degrees, receipts, licenses, certificates, employment letters, or any claim that should be cryptographically verifiable.

## Quick Start

1. Generate certification text
2. Normalize it (Unicode normalization + whitespace rules — see [NORMALIZATION.md](../docs/NORMALIZATION.md))
3. Compute SHA-256 hash
4. Print text within registration marks + base URL: `verify:your-org.com/c` (use Courier New font)
5. Host verification endpoint at `https://your-org.com/c/{HASH}` returning HTTP 200 + `{"status":"verified"}` for valid hashes
6. Optional: Host `verification-meta.json` at `https://your-org.com/c/verification-meta.json` with text normalization rules and OCR optimization settings

Infrastructure cost: ~$5 per million verifications (Cloudflare Workers example).

## verification-meta.json

The `verification-meta.json` file can provide document-specific normalization rules, custom response types, and OCR optimization:

```json
{
  "issuer": "Your Organization Name",
  "claimType": "Employment verification",
  "charNormalization": "éèêë→e àáâä→a ìíîï→i òóôö→o ùúûü→u ñ→n ç→c",
  "ocrNormalizationRules": [
    {
      "pattern": "CHF\\s+(\\d)",
      "replacement": "CHF$1",
      "description": "Remove space between CHF currency code and amount"
    }
  ],
  "parentAuthorities": [
    "https://accreditation-body.org/members/your-org",
    "https://regulatory-agency.gov/licensed/your-org"
  ],
  "responseTypes": {
    "verified": {
      "class": "affirming",
      "text": "This claim is verified and authentic",
      "link": "https://your-org.com/verification-info"
    },
    "revoked": {
      "class": "denying",
      "text": "This credential has been revoked",
      "link": "https://your-org.com/revocation-policy.html"
    },
    "SUPERSEDED": {
      "class": "denying",
      "text": "This document has been replaced by a newer version",
      "link": "https://your-org.com/verification-updates.html"
    }
  },
  "retentionLaws": [
    {
      "jurisdiction": "European Union",
      "law": "GDPR Article 5(1)(e)",
      "link": "https://gdpr-info.eu/art-5-gdpr/",
      "summary": "Personal data kept no longer than necessary; verification data retained only if strictly necessary for legal compliance"
    },
    {
      "jurisdiction": "United States",
      "law": "Your State Privacy Act",
      "link": "https://state.gov/privacy-act",
      "summary": "Verification records retained for 7 years for audit purposes; may be disclosed to government agencies under subpoena"
    }
  ]
}
```

"SUPERSEDED" would not link to a replacement SHA-256 URL that'd have `{"status":"verified"}`, nor would HTTP's 302 do the same. The point is the requester should already know the plain-text that would culminate in a verification lookup.

### Fields

- `issuer` (optional) — Name of the issuing organization
- `claimType` (optional) — Type of claim (e.g., "degree", "license", "certification")
- `parentAuthorities` (optional) — Array of URLs linking to parent/accrediting organizations that authorize this issuer
- `responseTypes` (optional) — Dictionary defining possible response statuses beyond "verified", each with:
  - `class` — Either "affirming" or "denying" (determines UI color/icon)
  - `text` — Human-readable explanation of what this status means
  - `link` — URL to a page with more information about this status
- `retentionLaws` (optional) — Array of governing laws/regulations for data retention and sharing, each with:
  - `jurisdiction` — Geographic region or legal system (e.g., "European Union", "California", "Japan")
  - `law` — Name/citation of the specific law or regulation
  - `link` — URL to the official text or authoritative explanation
  - `summary` — Plain-language explanation of retention period and sharing constraints

### Parent Authorities Examples

The `parentAuthorities` field establishes a chain of trust through simple URL links (no PKI required):

- **University degree** → Accreditation body (e.g., regional accreditor's member list)
- **Medical license** → State medical board registry
- **Professional certification** → Certifying organization's approved training providers list
- **Food safety cert** → Health department's licensed facilities page
- **Product certification** → Standards body's certified labs directory

Example for a university: See [public/c/verification-meta.json](https://github.com/paul-hammant/live-verify/blob/main/public/c/verification-meta.json)

## Retention Laws and Legal Implications

### Why retentionLaws matters

Europe's GDPR has a vague "if strictly necessary" clause, but many jurisdictions have specific, concrete retention periods and explicit rules about:

- **Retention duration**: How long the issuer must/may keep the data (e.g., 4 years, 7 years, 10 years, indefinitely)
- **Mandatory sharing**: Who the data **must** be shared with (government agencies, regulators, auditors)
- **Permissible sharing**: Who the data **may** be shared with (background check companies, other employers, researchers)
- **Prohibited sharing**: What the data **cannot** be used for (e.g., "will not be sold to marketers and alike")

The `retentionLaws` field makes these rules transparent to the person whose data is being verified.

### Hash Storage vs Full-Text Storage

Companies storing aspects of the data behind verifications.

**Storing the SHA-256 hash alone** (without the underlying text) is technically easy but **practically useless**:

- The hash proves nothing without the ability to verify it (i.e., without storing the original text).
- You cannot reconstruct the original claim from the hash. Well, not without literal magic.
- There is no value in a database of orphaned hashes

**Storing the claim text** (with or without the hash) is what organizations actually do, and **retention/sharing laws apply to this stored text**, not the hash. The laws existed and applied before this idea to verify claims using a SHA-256 system.

### Worked Example: Recruitment Portal

**Scenario:** A candidate submits their CV/resume to a recruitment portal, which includes:

- Degree certificate from Edinburgh University (First-class honours) - verified via Live Verify
- Employment letter from Microsoft - verified via Live Verify

**What the recruitment portal stores:**

1. The full CV/resume text (including qualification and employment claims)
2. Maybe the SHA-256 hashes from the verified documents
3. The verification base URLs that proved the claims are authentic. At least with the SHA-256 they do. The text to verification sequence could be redone at any stage of course.

**Legal permissions — What the portal CAN do:**
- Store the CV/resume (candidate gave consent when submitting)
- Share the CV/resume with specific clients (the hiring company) because the applicant was applying for a job through the portal — their entire purpose for uploading their CV/resume.
- Show verified status: "Degree verified" and "Employment verified" — both back to the candidate and to the prospective employer.

**Legal constraints — What the portal CANNOT do:**
- Share the CV/resume with Palantir Technologies (for example) — no consent/legitimate interest.
- Sell the CV data to marketing companies
- Keep the CV indefinitely after the candidate withdraws consent (GDPR Article 17)

**Initial client conversation:**

Portal: "We have a matching candidate who graduated Edinburgh University
         with First-class honours (verified) and is currently working
         at Microsoft (verified). Are you interested in seeing their
         full CV?"

Client: "Yes, send over their details."

Portal: Shares the full CV. With or without verification proof — the client could or perhaps should redo the same verifications.

**What "verified" means:**

- The candidate submitted physical documents (degree certificate, employment letter), OR scans thereof OR the already-extracted and normalized text from the same.
- If physical scans, the portal scanned them using Live Verify `{"status":"verified"}` vs 404 response, etc
- The issuing organizations (Edinburgh University, Microsoft) confirmed authenticity via HTTP 200 + `{"status":"verified"}` and that gets noted "claims made in CV all verified"

**Key insight:** The retention laws govern **the underlying text** (the CV, the degree claim, the employment history, the financial services contract/transaction), not the hash. The hash is merely a cryptographic proof that helps verify authenticity, but the legal obligations attach to the personal data being stored and shared.

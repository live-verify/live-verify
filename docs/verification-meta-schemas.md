# verification-meta.json Schemas

The `verification-meta.json` file serves two distinct roles in the Live Verify protocol. The filename is always `verification-meta.json`, but the schema differs depending on whether the domain is an **issuer** (the origin of verifiable claims) or an **authority** (an endorser or root in the authorization chain).

## Schema 1: Issuer

Hosted at the `verify:` domain — the organization that creates and verifies claims.

**Example:** `https://midsomer.police.uk/id/verification-meta.json`

```json
{
  "issuer": "Midsomer Constabulary",
  "description": "Police force for the county of Midsomer",
  "claimType": "PoliceWarrant",
  "authorizedBy": "policing.gov.uk/v1",
  "authorizedFrom": "2023-01-01",
  "authorizedTo": "2028-12-31",
  "authorityBasis": "Home Office licensed constabulary under the Police Act 1996",
  "charNormalization": "éèêë→e àáâä→a",
  "ocrNormalizationRules": [
    {
      "pattern": "CHF\\s+(\\d)",
      "replacement": "CHF$1",
      "description": "Remove space between CHF currency code and amount"
    }
  ],
  "responseTypes": {
    "verified": {
      "class": "affirming",
      "text": "This credential is verified and current",
      "link": "https://midsomer.police.uk/verification-info"
    },
    "REVOKED": {
      "class": "denying",
      "text": "This credential has been revoked",
      "link": "https://midsomer.police.uk/revocation-policy"
    }
  },
  "retentionLaws": [
    {
      "jurisdiction": "United Kingdom",
      "law": "UK GDPR / Data Protection Act 2018",
      "link": "https://www.legislation.gov.uk/ukpga/2018/12/contents",
      "summary": "Credential data retained for the duration of service plus 7 years"
    }
  ],
  "parentAuthorities": [
    "https://www.gov.uk/government/organisations/hm-inspectorate-of-constabulary"
  ]
}
```

### Issuer Fields

| Field | Required | Description |
|-------|----------|-------------|
| `issuer` | Recommended | Organization name |
| `description` | Recommended | What this organization does |
| `claimType` | Recommended | Type of claim issued (e.g., "PoliceWarrant", "BankStatement", "AcademicDegree") |
| `authorizedBy` | Optional | Authority chain — `verify:` URL of the endorsing organization |
| `authorizedFrom` | Optional | ISO date: endorsement start (e.g., "2023-01-01") |
| `authorizedTo` | Optional | ISO date: endorsement end (e.g., "2028-12-31") |
| `authorityBasis` | Optional | Short statement of what authority backs this issuer |
| `charNormalization` | Optional | Character mappings for OCR error tolerance (e.g., accented → ASCII) |
| `ocrNormalizationRules` | Optional | Array of regex pattern/replacement rules for OCR cleanup |
| `responseTypes` | Optional | Custom verification statuses beyond "verified" |
| `retentionLaws` | Optional | Applicable data retention laws for transparency |
| `parentAuthorities` | Optional | Human-browsable URLs to accrediting/licensing bodies |
| `schemaVersion` | Optional | Schema version number |
| `successor` | Optional | URL of successor authority if this endorsement expires |

---

## Schema 2: Authority

Hosted at endorser and root-authority domains in the authorization chain. These domains do not issue verifiable claims themselves — they authorize issuers (or other endorsers).

The `role` field distinguishes authority files from issuer files:
- `"role": "endorser"` — an intermediate authority that endorses issuers or other endorsers, and is itself endorsed by a parent
- `"role": "root-authority"` — a terminal trust anchor with no parent (the chain stops here)

### Endorser Example

`https://policing.gov.uk/v1/verification-meta.json`

```json
{
  "role": "endorser",
  "issuer": "HMICFRS",
  "description": "Oversees standards for all police forces in England and Wales",
  "authorizedBy": "gov.uk/v1"
}
```

### Root Authority Example

`https://gov.uk/v1/verification-meta.json`

```json
{
  "role": "root-authority",
  "issuer": "HM Government",
  "description": "Oversees all official verification chains in the United Kingdom",
  "hidePathInDisplay": true
}
```

With `hidePathInDisplay: true`, the chain UI shows `gov.uk` instead of `gov.uk/v1`. The `/v1` path is an internal versioning detail — the verifier only needs to see the domain to assess trust.

### Authority Fields

| Field | Required | Description |
|-------|----------|-------------|
| `role` | Required | Either `"endorser"` or `"root-authority"` |
| `issuer` | Required | Organization name (displayed in the authority chain UI) |
| `description` | Required | **Contextual purpose statement** — not just "this is a root authority" but what the authority oversees and why it matters. This text is displayed to verifiers in the chain UI. |
| `authorizedBy` | Endorser only | `verify:` URL of the parent authority. Absent for root authorities. |
| `hidePathInDisplay` | Optional | Boolean. When `true`, the chain UI shows only the domain (e.g., `fca.org.uk`) rather than the full path (`fca.org.uk/verified`). Useful when the path component is an implementation detail (e.g., `/verified/`, `/v1/`) that adds noise to the display without helping the verifier assess trust. |

Authority files deliberately omit issuer-only fields: no `claimType`, `charNormalization`, `ocrNormalizationRules`, `responseTypes`, `retentionLaws`, or `parentAuthorities`. These fields only make sense for domains that issue and verify claims.

---

## How the Schemas Interact

An authority chain walks from issuer → endorser(s) → root authority:

```
midsomer.police.uk/id/verification-meta.json     (issuer, claimType: "PoliceWarrant")
    └── authorizedBy: policing.gov.uk/v1
        policing.gov.uk/v1/verification-meta.json (endorser)
            └── authorizedBy: gov.uk/v1
                gov.uk/v1/verification-meta.json  (root-authority, chain terminates)
```

At each level, the client:
1. Fetches the `verification-meta.json`
2. Reads `description` and `issuer` for display in the chain UI
3. If `authorizedBy` exists, recurses (max 3 levels deep)
4. The chain is displayed to the verifier: "Verified by midsomer.police.uk, endorsed by HMICFRS, endorsed by HM Government"

### Hash Commitment

The issuer's `authorizedBy` endorsement works via hash commitment: the endorser hashes the issuer's **entire** `verification-meta.json` (canonicalized via `JSON.stringify(JSON.parse(...))`). Any change to the issuer's file — including `claimType`, `description`, `responseTypes`, everything — invalidates the hash and breaks the endorsement. The endorser has implicitly endorsed the issuer's complete self-description.

### Description Guidelines

The `description` field in authority files should communicate **contextual purpose**, not just classification:

| Avoid (dry classification) | Prefer (contextual purpose) |
|---------------------------|----------------------------|
| "Root authority for Switzerland" | "Oversees all official verification chains in Switzerland" |
| "Intermediate authority" | "Oversees standards for all police forces in England and Wales" |
| "Federal banking regulator" | "Regulates and insures all nationally chartered banks in the United States" |
| "State credential authority" | "Authorizes all state-issued professional licenses and identity credentials in New York" |

The description is shown to verifiers in the chain UI. It should answer: *"Why should I trust this organization's endorsement?"*

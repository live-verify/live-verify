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
  "lineBreaks": "faithful",
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
  "dataHandling": {
    "summary": "Personal data in the verified plaintext is processed on behalf of the subject. Handlers must delete the plaintext within 30 days of verification unless a listed legal basis requires longer retention.",
    "deletePlaintextWithinDays": 30,
    "legalBases": [
      {
        "jurisdiction": "EU / UK",
        "law": "GDPR Art. 5(1)(e) — storage limitation",
        "link": "https://gdpr-info.eu/art-5-gdpr/",
        "summary": "Personal data kept no longer than necessary for the purpose it was verified for."
      },
      {
        "jurisdiction": "United Kingdom",
        "law": "Statutory 7-year retention (where it applies to the handler)",
        "link": "https://www.legislation.gov.uk/ukpga/2018/12/contents",
        "summary": "Where a handler is itself under a 7-year record-keeping duty, that duty overrides the 30-day default for the fields it covers."
      }
    ],
    "issuerPolicy": "The issuer, on behalf of the subject, requests that verifiers and their processors retain only a record that verification occurred (issuer, claimType, timestamp, result) and not the underlying personal plaintext beyond the window above.",
    "policyLink": "https://midsomer.police.uk/data-handling-policy"
  },
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
| `endorsementLabel` | Optional | Locale-map overriding the displayed verb for this endorsement relationship (e.g. `{"en-GB": "Endorsed by", "en-US": "Authorized by"}`). The `endorsedBy`/`authorizedBy` **field name** never changes; only the human word shown does. See below. |
| `charNormalization` | Optional | Character mappings for OCR error tolerance (e.g., accented → ASCII) |
| `ocrNormalizationRules` | Optional | Array of regex pattern/replacement rules for OCR cleanup |
| `lineBreaks` | Optional | Line-break regime for claims under this path: `"faithful"` (default — every line break is load-bearing; right for tabular documents where row structure is meaning) or `"flow"` (a single newline is a soft break and collapses to a space; only a blank line separates paragraphs; right for prose, where viewport soft-wrap must not change the hash). **Hash-affecting.** Clients MUST fail loudly on an unrecognised value, never silently default. The meta file is path-scoped and the path is named on the in-text `verify:` line, so the regime is committed to by the hashed text itself — see [flow-proposal](flow-proposal.md). |
| `responseTypes` | Optional | Custom verification statuses beyond "verified" |
| `retentionLaws` | Optional | Laws governing the **issuer's own** retention of the source record, for transparency |
| `dataHandling` | Optional | Laws and issuer policy that apply to the **verifier/handler** once they read the plaintext — including a requested delete-within-N-days obligation on behalf of the subject. See below. |
| `parentAuthorities` | Optional | Human-browsable URLs to accrediting/licensing bodies |
| `schemaVersion` | Optional | Schema version number |
| `successor` | Optional | URL of successor authority if this endorsement expires |

### `retentionLaws` vs. `dataHandling` — two different subjects

These are easy to confuse and must be kept distinct:

- **`retentionLaws`** describes how long **the issuer** keeps its *own* source record. It is transparency
  about the issuer's back office.
- **`dataHandling`** describes the laws and issuer policy that bind **whoever reads the verified
  plaintext** — the verifier and any downstream processor (e.g. a background-screening supplier). It is
  the issuer stating, *on behalf of the subject*, how the personal data on the credential should be
  treated once it has left the issuer's control.

The second is the one that carries the subject's privacy interest into the hands of third parties. It
exists because the plaintext of a high-value credential (a degree, a warrant card, a bank statement)
contains personal data the subject did not consent to have retained indefinitely by every party who
ever verifies it.

#### `dataHandling` fields

| Field | Description |
|-------|-------------|
| `summary` | One-line human-readable statement of the handling obligation, shown to verifiers. |
| `deletePlaintextWithinDays` | Integer. The issuer's requested maximum retention of the personal plaintext by a handler, in days after verification. `0` means "do not retain the plaintext at all beyond the check." |
| `legalBases` | Array of `{ jurisdiction, law, link, summary }` — the laws that apply to the handler (GDPR storage limitation, statutory 7-year rules where they apply, sectoral rules). Same shape as `retentionLaws` entries. |
| `issuerPolicy` | Free text: the issuer's own policy, made on the subject's behalf — typically "keep only a record *that* verification happened (issuer, claimType, timestamp, result), not the underlying plaintext, beyond the window." |
| `policyLink` | URL to the issuer's full data-handling policy. |

#### The honest limit — this is declarative, not enforceable

`dataHandling` is a **published expectation, not a technical control.** The protocol cannot force a
verifier to delete anything; a handler who chooses to keep the plaintext (or a processor who quietly
caches it, or an attacker who exfiltrates it) is unaffected by a JSON field. State this plainly wherever
the field is surfaced, in keeping with the project's honest-limit posture.

What it *does* provide is real but narrow:

- **A clear, machine-readable obligation** a verifier can honour and build tooling around (auto-purge
  after N days), and that an auditor or regulator can hold a handler to.
- **A stated legal basis and issuer policy** that turns "please be careful with my data" into a
  specific, cited expectation — useful precisely because GDPR's storage-limitation principle is otherwise
  vague about *how long is too long* for this particular claim.
- **Evidence of the subject's expressed preference**, carried by the issuer, which strengthens a
  subject's later complaint or erasure request against a handler who ignored it.

It is the *policy* counterpart to [holder-controlled availability](holder-controlled-availability.md):
that feature stops the issuer being a continuous re-broadcast channel; `dataHandling` asks handlers not
to *become* one. Neither can retrieve plaintext already copied or stolen — that exposure is no greater
here than under any prior system — and both should be described that way.

### `endorsementLabel` — one relationship, locally-worded

The chain relationship is a single, stable thing: an authority above **vouches for** the issuer below.
But the right English *word* for that act is regionally contested, and other languages need their own
word entirely. The design separates the two cleanly:

- **The field name is protocol, and never localised.** `endorsedBy` (with `authorizedBy` honoured as
  its legacy alias) is a JSON key, like `status` or `claimType` — fixed, English-derived, not a word a
  reader ever sees. It uses "endorse" because that is the linguistically accurate verb for *vouching
  for legitimacy* (as opposed to "authorize", which implies the parent *granted the power* — in this
  model the power comes from statute, and the parent merely attests the issuer is genuine).
- **The displayed verb is a localisation concern, resolved at display time.**

Two layers can supply the displayed word, in this precedence:

1. **Issuer-declared `endorsementLabel`** (optional) — a locale-map in the issuer's
   `verification-meta.json`, letting a jurisdiction choose the word that matches its own legal usage:

   ```json
   "endorsementLabel": {
     "en-GB": "Endorsed by",
     "en-US": "Authorized by",
     "en": "Endorsed by"
   }
   ```

2. **The client's own locale string** (the default) — every client already localises this: the browser
   extension's `_locales/en` says "Endorsed by", `_locales/de` says "Befürwortet durch", and so on. The
   **verifier's** language should normally win, because the reader should see their own language.

3. **Fallback:** if neither resolves for the active locale, the client falls back to `en` ("Endorsed
   by") — a correct word, never a raw field name.

**Resolution rule (recommended):** use the issuer's `endorsementLabel` for the verifier's locale when
present and the issuer explicitly wants to fix the wording (e.g. a US body that means "authorized" in
the statutory sense); otherwise use the client's own locale string. Clients should treat this purely as
a **label swap** — it never changes the verdict, the chain, or which field is read.

**Honest-limit note — it is hash-committed issuer text.** Like `authorityBasis`, `endorsementLabel`
lives inside the meta file the endorser hashes in full, so the endorser has implicitly signed off on
the wording. An issuer therefore cannot unilaterally relabel its relationship in a way its endorser
never sanctioned — changing the label changes the meta hash and requires re-endorsement. The label
rides the same trust rail as the rest of the file; it is not a free-text field the issuer can quietly
edit after the fact.

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

Authority files deliberately omit issuer-only fields: no `claimType`, `charNormalization`, `ocrNormalizationRules`, `responseTypes`, `retentionLaws`, `dataHandling`, or `parentAuthorities`. These fields only make sense for domains that issue and verify claims.

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

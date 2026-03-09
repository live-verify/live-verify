# Authority Chain: App Display

## What the User Sees

When a consumer app (iOS, Android, Chrome extension) verifies a document, it walks the authority chain and displays each node. The user sees domains and context-sensitive descriptions — not technical headers or registration numbers.

### Single-Jurisdiction Example

A UK employment reference letter:

```
✓ hr.example-corp.co.uk — Lists currently employed UK staff
  ✓ hmrc.gov.uk — Governs UK salary/wage tax collection
    ✓ gov.uk — UK government root namespace
```

### Multi-Jurisdiction Example

A candidate who worked in both the UK and the US. Has "worked at" verifiable text that would yield 
multiple independent chains, one per prior employment, and in this case two countries:

```
UK employment (ignoring the detail of the claim):
✓ hr.example-uk.co.uk — Lists currently employed UK staff
  ✓ hmrc.gov.uk — Governs UK salary/wage tax collection
    ✓ gov.uk — UK government root namespace

US employment (ignoring the detail of the claim):
✓ hr.example-us.com — Lists currently employed US staff
  ✓ irs.gov — Governs US federal payroll tax collection
    ✓ usa.gov — US federal government root namespace
```

Both chains terminate at their government's root namespace.

### Medical Prescription Example

A paper prescription verified by a pharmacist:

```
✓ elmstreetmedical.nhs.uk — Prescribes medication in England
  ✓ gmc-uk.org — Registers and regulates UK medical doctors
    ✓ gov.uk — UK government root namespace
```

## Where the Descriptions Come From

Each node in the chain publishes a `verification-meta.json` with a `description` field. The description says what this node *does* — not its formal legal title:

```json
{
  "description": "Governs UK salary/wage tax collection"
}
```

The description is set by the domain operator and should be **specific to what the domain actually does** in the context of verification. This aids trust — a user seeing "Practises divorce law in Texas" can judge relevance more easily than "Hendricks & Associates, Attorneys at Law."

### Per-Path Descriptions

A domain can serve different descriptions for different verification paths. A law firm might issue several types of verified document:

```json
{
  "descriptions": {
    "/notarized/": "Notarises documents in Texas",
    "/contracts/": "Drafts commercial contracts in Texas",
    "/filings/": "Files court documents in Texas"
  },
  "description": "Practises law in Texas"
}
```

The `descriptions` object maps path prefixes to context-specific descriptions. The top-level `description` is the fallback. The app matches the verification path against the most specific prefix and displays that description.

This means the same firm shows different descriptions depending on what document was verified:

```
Notarised affidavit:
✓ hendricks-law.com — Notarises documents in Texas
  ✓ txcourts.gov — Admits and regulates Texas attorneys
    ✓ texas.gov — Texas state government

Divorce decree filing:
✓ hendricks-law.com — Practises divorce law in Texas
  ✓ txcourts.gov — Admits and regulates Texas attorneys
    ✓ texas.gov — Texas state government
```

The chain above the firm is identical — the state bar vouches for the firm regardless of document type. But the description tells the user *what specific claim this firm is making*.

## The Hover-Over (Tap-for-Detail)

The `description` field is a short, contextual phrase. But each node's `verification-meta.json` can also include a `formalName` field — the stuffy official title:

| Domain | `description` (shown inline) | `formalName` (shown on hover/tap) |
|---|---|---|
| `hmrc.gov.uk` | Governs UK salary/wage tax collection | HM Revenue & Customs |
| `gmc-uk.org` | Registers and regulates UK medical doctors | General Medical Council |
| `fca.org.uk` | Regulates UK financial services firms | Financial Conduct Authority |
| `gov.uk` | UK government root namespace | Government Digital Service, Cabinet Office |
| `irs.gov` | Governs US federal payroll tax collection | Internal Revenue Service |
| `usa.gov` | US federal government root namespace | General Services Administration |
| `texas.gov` | Texas state government | Office of the Governor of Texas |
| `bayern.de` | Bavarian state government | Bayerische Staatskanzlei |
| `officeforstudents.org.uk` | Regulates English higher education providers | Office for Students |

The user taps a node to see the formal name. But the inline description is what does the work — it tells the user *why this node is in the chain*, not just *what it's called*.

## Trust Is Domain-Based

The app does **not** tell the user to trust a domain. It displays the chain; the user brings their own knowledge:

- `.gov.uk` → "that's UK government"
- `hmrc.gov.uk` → "that's the tax people"
- `irs.gov` → "that's the American tax people"
- `gmc-uk.org` → might not recognise this — tap for detail → "General Medical Council" → "oh, the doctor regulator that is sometimes slow to expel bad MDs"

This is the same trust model as the primary verification. Live Verify piggybacks on the trust humans already place in domain names. The chain makes visible *which* domains vouch for *which* claims.

## Federal vs. State Authority

Not everything chains to the national root. In federal countries, some professions are regulated at the state level — the state is the sovereign authority, not the national government.

### US: State Bar Admission

A lawyer in the US is admitted by their **state's court system**, not by a federal body. There is no US equivalent of the SRA. A notarised document from a Texas attorney:

```
✓ hendricks-law.com — Practises law in Texas
  ✓ txcourts.gov — Admits and regulates Texas attorneys
    ✓ texas.gov — Texas state government
```

The chain terminates at `texas.gov`, not `usa.gov`. Texas regulates its own lawyers — that's the Tenth Amendment. The same applies to medical licensing (state medical boards), real estate licenses (state commissions), teaching certificates (state departments of education), driver's licenses (state DMVs), and insurance regulation (state departments of insurance).

The app hardcodes US state roots (`texas.gov`, `ny.gov`, `california.gov`, etc.) alongside the federal root. In practice, since CISA controls the entire `.gov` TLD, the app can treat **any `.gov` domain** as a trust anchor.

### Germany: Rechtsanwaltskammer

Germany has the same federal structure. Lawyers are admitted by their Rechtsanwaltskammer (regional bar association) at the Bundesland level, not federally. A notarised document from a Bavarian lawyer:

```
✓ kanzlei-weber.de — Praktiziert Familienrecht in Bayern (practises family law in Bavaria)
  ✓ rak-muenchen.de — Zulassung und Aufsicht der Münchner Anwälte (admits and regulates Munich-region lawyers)
    ✓ bayern.de — Bayerische Landesregierung (Bavarian state government)
```

The descriptions are in German because each domain's `verification-meta.json` serves text in its own language. The English glosses in parentheses are for this document only — the app would not show them.

The chain terminates at `bayern.de`, not `bund.de`. Bavaria regulates its own legal profession through the RAK München, just as Texas does through `txcourts.gov`. Germany has 28 regional bar associations across 16 Bundesländer.

### The UK Is Different

The UK is **not** federal for professional regulation. The GMC registers all doctors in England, Scotland, Wales, and Northern Ireland. The SRA regulates all solicitors in England and Wales. Professional licensing chains always terminate at `gov.uk`, not at devolved government roots (`gov.scot`, `gov.wales`).

(Devolved governments do have their own authority for some matters — NHS Scotland operates under the Scottish Government — but professional licensing is UK-wide.)

## Language

The description text is set by the domain operator in their `verification-meta.json`. The app displays whatever it's given — it does not translate.

### India: The Hard Case

India has Hindi as the official language of the Union, English as the subsidiary official language, and 22 scheduled languages used as official languages by individual states. Tamil Nadu uses Tamil. Karnataka uses Kannada. Kerala uses Malayalam.

A farmer in Tamil Nadu scanning a land record:

```
✓ registrar.tn.gov.in — நிலப் பதிவுகளை பராமரிக்கிறது (maintains land records)
  ✓ tn.gov.in — தமிழ்நாடு அரசு (Tamil Nadu state government)
```

A taxpayer scanning a central government document:

```
✓ incometax.gov.in — आयकर संग्रह का प्रबंधन करता है (administers income tax collection)
  ✓ india.gov.in — भारत सरकार (Government of India)
```

Tamil from the state government, Hindi from the central government. Each domain serves its own language. The app doesn't choose.

### Multi-Language Claims

The claim payload itself (the verified text) is in one language — whatever language the document was written in. But a publishing entity can issue the **same claim in multiple languages** as separate hashes. A Tamil Nadu land record might exist as:

- Tamil original → hash₁ → `registrar.tn.gov.in/{hash₁}` → OK
- English translation → hash₂ → `registrar.tn.gov.in/{hash₂}` → OK

Both are valid verified documents. The chain descriptions come from `registrar.tn.gov.in`'s `verification-meta.json` and are in whatever language the registrar chooses — likely Tamil, since that's their official language.

### The Rule

**The domain operator owns the language choice.** The app displays what the `verification-meta.json` serves. No `Accept-Language` negotiation, no app-side translation. If `tn.gov.in` wants to serve descriptions in Tamil, English, and Hindi, they can use a `descriptions_i18n` field:

```json
{
  "description": "தமிழ்நாடு அரசு",
  "descriptions_i18n": {
    "en": "Tamil Nadu state government",
    "hi": "तमिलनाडु राज्य सरकार"
  }
}
```

But the primary `description` is always the canonical version in the operator's chosen language. The i18n variants are optional courtesy.

## Unconfirmed Chains

If any node in the chain returns 404, the app shows it clearly:

```
✓ hr.dodgy-corp.com — Lists currently employed UK staff
  ✗ hmrc.gov.uk — NOT CONFIRMED
```

The issuer *claimed* endorsement by HMRC, but HMRC's endpoint returned 404 — this employer is not in HMRC's registry. The user sees the broken chain and makes their own decision.

This is not an error. It's the system working as designed. A fraudulent issuer can claim `authorizedBy: hmrc.gov.uk` in their `verification-meta.json`, but they can't make HMRC's endpoint return 200.

## What the Consumer App Does vs. Doesn't Do

**Does:**
- Walk the chain (max 3 levels)
- Display each node: domain + description
- Show hover/tap detail: formal name
- Show broken chains (404 at any node)

**Doesn't:**
- Follow [secondary verification lookups](secondary_verification_actions.md) (prescriber registration, employer PAYE status as structured data) — that's for specialist software
- Tell the user *whether* to trust a domain — that's the user's judgement
- Cache aggressively — authority chain status changes rarely, so results are cached for hours or days

## Hardcoded Root Trust Anchors

Apps ship with a hardcoded list of root trust anchors — analogous to the root certificate store in a browser. When the chain walk hits a known root, it stops. No need to fetch the root's `verification-meta.json` or walk further.

**Government root namespaces:**

| Root | Jurisdiction | Description (hardcoded in app) |
|---|---|---|
| `gov.uk/verifiers` | UK | UK government root namespace |
| `usa.gov/verifiers` | US (federal) | US federal government root namespace |
| `gov.au` | Australia | Australian government root namespace |
| `gouv.fr` | France | French government root namespace |
| `bund.de` | Germany (federal) | German federal government root namespace |
| `india.gov.in` | India (central) | Indian central government root namespace |

In the UK, all government services chain to `gov.uk`. In the US and Germany, both federal *and* state-level roots exist — a Texas medical license chains to `texas.gov`, not `usa.gov`. Since CISA controls the entire `.gov` TLD, the app can treat **any `.gov` domain** as a trust anchor without enumerating all 50 states. Germany's state domains (`bayern.de`, `sachsen.de`, etc.) must be individually listed.

**Treaty-based international organisations:**

| Root | Description (hardcoded in app) |
|---|---|
| `who.int` | World Health Organization |
| `un.org` | United Nations |
| `worldbank.org` | World Bank |

This list is small (~10-15 national/federal government roots, US `.gov` TLD as a wildcard, ~16 German Bundesland domains, ~28 Indian state/UT domains, ~20-30 treaty-based organisations). Updated annually at most via app updates.

**Why hardcode?** The root is the one node in the chain that *cannot* prove itself by reference to something higher. Its legitimacy is axiomatic — `gov.uk` is the UK Government because it is. The app doesn't discover this; it knows it. Everything else in the chain is verified by walking upward to the root.

## Implementation Notes

The chain is built from `verification-meta.json` at each node:

1. Primary verification: app fetches issuer's `verification-meta.json`, reads `authorizedBy` (a base URL)
2. If `authorizedBy` matches a hardcoded root → display the root with its hardcoded description, chain complete
3. Otherwise, fetch the endorser's `verification-meta.json`, read its `description` and check for its own `authorizedBy`
4. Recurse until hitting a hardcoded root or max depth (3)
5. Display the chain top-down

**Backend concern:** Each node's `verification-meta.json` must serve `description` and optionally `formalName`. These are static fields set by the domain operator — HMRC decides its own description is "Governs UK salary/wage tax collection", not the app and not the issuer below it in the chain.

See [Verification Response Format](Verification-Response-Format.md#endorsement-via-verification-metajson-authorizedby) for the `authorizedBy` protocol and [Authority Chain Specification](authority-chain-spec.md) for the four authority patterns.

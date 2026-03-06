# authorityBasis and authorizedBy Patterns for Use Cases

## Purpose

Every `verification-meta.json` can declare:
- **`authorizedBy`** — who endorses this issuer (the authorization chain)
- **`authorityBasis`** — a short statement of what kind of authority backs this verification

Since the authorizer hashes the issuer's entire `verification-meta.json`, they implicitly endorse the `authorityBasis` text. The authorizer can require specific wording as a condition of endorsement.

Client apps display `authorityBasis` in the verification result so the verifier understands the weight of the attestation — sovereign authority vs. personal opinion.

## Task: Adding Authority Chain Sections to Use Cases

Each use case file in `public/use-cases/*.md` needs an `## Authority Chain` section added. This section should appear **after** the `## Verification Architecture` section (or after `## Third-Party Use` if there's no Verification Architecture section).

### What to Add

For each use case, add a section like this:

```markdown
## Authority Chain

**Pattern:** [Sovereign | Regulated | Commercial | Personal]

[One sentence explaining why this pattern applies to this use case.]

**Primary issuer example:**

| Field | Value |
|---|---|
| Issuer domain | `example-issuer.gov.uk/verify` |
| `authorizedBy` | `parent-authority.gov.uk/register` |
| `authorityBasis` | Short factual statement of authority |

[If the use case lists multiple issuer types, add a row or separate table for each distinct type.]
```

### How to Determine the Pattern

Read the existing `## Verification Architecture` section in each use case. It lists **Issuer Types (First Party)**. Use those to determine the pattern:

1. **If issuers are government bodies** (police, tax, immigration, courts, registrars) → **Sovereign**
2. **If issuers are institutions regulated by government** (banks, insurers, universities, hospitals, solicitors) → **Regulated**
3. **If issuers are businesses or platforms with no government regulator** (HRIS platforms, background check firms, ticketing companies, manufacturers) → **Commercial**
4. **If issuers are individuals** (peer references, personal attestations) → **Personal**

Some use cases have **multiple issuer types** spanning different patterns. For example, `employment-references.md` has:
- Corporations (Commercial)
- HRIS Platforms like Workday (Commercial)
- Verification Utilities like The Work Number (Commercial)
- Individual peer referees (Personal)

In these cases, list all applicable patterns with an example for each.

### How to Choose `authorizedBy`

The `authorizedBy` value is a domain + path pointing to whoever regulates or endorses the issuer. Use real, plausible domains:

**Sovereign issuers** — either self-authorized (omit `authorizedBy`) or point to a parent government department:
- UK police forces → `policing.gov.uk/forces`
- UK government agencies → `gov.uk/{department}`
- US federal agencies → self-authorized (they are the root)
- US state agencies → self-authorized or point to federal equivalent

**Regulated issuers** — point to the regulator:
- UK banks/insurers → `fca.org.uk/register`
- UK solicitors → `sra.org.uk/solicitors`
- UK universities → `officeforstudents.org.uk/register`
- UK healthcare → `cqc.org.uk/providers`
- US banks → `occ.gov/institutions` or `fdic.gov/institutions`
- US insurers → state department of insurance (e.g. `insurance.ca.gov/licensed`)
- US hospitals → `jointcommission.org/accredited`
- EU banks → national financial regulator

**Commercial issuers** — point to an industry body if one exists, otherwise self-authorized:
- Background check firms → `napbs.org/accreditation`
- Certification bodies → `ukas.com/accredited` (UK) or `anab.org/accredited` (US)
- No industry body → omit `authorizedBy` (self-authorized)

**Personal issuers** — point to a commercial platform if using one, otherwise self-authorized:
- Via peer referral platform → `refs.peerreferrals.com/v1`
- Self-hosted → omit `authorizedBy`

### How to Write `authorityBasis`

The `authorityBasis` is a **single short line** (under 80 characters ideally) that a verifier sees in the app. Rules:

1. **State the role, not the name.** The name is already visible from the domain. Say what they *are*.
2. **Include registration/licence numbers** for regulated issuers.
3. **Be honest about the authority level.** Don't say "certified" when you mean "self-declared."
4. **Personal attestations must include "Individual" or "personal"** so client apps can visually distinguish them.

**Good examples:**
- `UK tax authority` (sovereign, factual)
- `FCA-authorised deposit taker, FRN 122702` (regulated, includes reg number)
- `NAPBS-accredited background screening provider` (commercial, states accreditation)
- `Individual's personal peer references` (personal, clearly labelled)
- `State-licensed insurance carrier, CA License #1234` (regulated, US state)
- `Territorial police force, England & Wales` (sovereign, states jurisdiction)
- `Accredited degree-granting institution, OfS #10007774` (regulated, includes reg number)

**Bad examples:**
- `Barclays Bank` (that's the name, not the authority — use the domain for the name)
- `Trusted provider of verification services` (marketing fluff)
- `We are an official organisation` (vague, unverifiable claim)
- `Government-backed` (by whom? which government? be specific)

---

## The Four Patterns (Full Reference)

### Pattern 1: Sovereign

The issuer *is* the government or a statutory body. The chain is short — often just one level — because there's no higher authority to appeal to. The government is the root.

**Examples:**

| Use Case | Issuer | authorizedBy | authorityBasis |
|---|---|---|---|
| Crime report confirmations | Report Fraud | *(self-authorized)* | UK national fraud reporting service, City of London Police |
| Crime report confirmations | Metropolitan Police | policing.gov.uk/forces | Territorial police force, England & Wales |
| Police clearance certificates | ACRO | policing.gov.uk/forces | UK criminal records authority |
| Birth/death certificates | GRO | gov.uk/registrars | General Register Office, England & Wales |
| Tax forms | HMRC | *(self-authorized)* | UK tax authority |
| Passports | HMPO | gov.uk/identity | HM Passport Office |
| Driving licences | DVLA | gov.uk/transport | Driver and Vehicle Licensing Agency |
| Court orders | HM Courts & Tribunals | *(self-authorized)* | HM Courts & Tribunals Service |
| Voter registration | Electoral Commission | *(self-authorized)* | UK electoral registration authority |
| US tax forms | IRS | *(self-authorized)* | US federal tax authority |
| US passports | US Dept of State | *(self-authorized)* | US passport-issuing authority |
| Canadian tax | CRA | *(self-authorized)* | Canada Revenue Agency |
| Australian police clearance | Australian Federal Police | *(self-authorized)* | Australian federal law enforcement |

**Chain shape:** Issuer → government department (or self-authorized if the issuer *is* the top-level body).

**`authorityBasis` wording:** States the statutory role. Short and factual.

**How to recognise this pattern in a use case file:** The "Issuer Types (First Party)" section lists government agencies, police forces, courts, tax authorities, or registrars.

**Full worked example — crime report confirmation from Metropolitan Police:**

```json
{
  "issuer": "Metropolitan Police Service",
  "authorityBasis": "Territorial police force, England & Wales",
  "claimType": "Crime report confirmation",
  "authorizedBy": "policing.gov.uk/forces",
  "responseTypes": {
    "OK": { "class": "affirming", "text": "Crime report confirmation is valid" },
    "PENDING_INVESTIGATION": { "class": "affirming", "text": "Report valid, pending investigation" },
    "REVOKED": { "class": "denying", "text": "Report withdrawn" }
  }
}
```

The corresponding `## Authority Chain` section in the use case file:

```markdown
## Authority Chain

**Pattern:** Sovereign

Crime report confirmations are issued by law enforcement bodies — either centralised
reporting services (Report Fraud) or territorial police forces. These are statutory
bodies with no higher commercial or institutional authority; the chain terminates at
the government.

**Primary issuer examples:**

| Field | Value |
|---|---|
| Issuer domain | `met.police.uk/reports/v` |
| `authorizedBy` | `policing.gov.uk/forces` |
| `authorityBasis` | Territorial police force, England & Wales |

| Field | Value |
|---|---|
| Issuer domain | `reportfraud.police.uk/reports/v` |
| `authorizedBy` | *(self-authorized — national statutory service)* |
| `authorityBasis` | UK national fraud reporting service, City of London Police |
```

---

### Pattern 2: Regulated

The issuer is an institution regulated by a government body. The chain goes: institution → regulator → government. The regulator's endorsement carries real weight because they have statutory power to grant and revoke authority.

**Examples:**

| Use Case | Issuer | authorizedBy | authorityBasis |
|---|---|---|---|
| University degrees | University of Oxford | officeforstudents.org.uk/register | Registered higher education provider, OfS #10007774 |
| Bank statements | Barclays | fca.org.uk/register | FCA-authorised deposit taker, FRN 122702 |
| Insurance claims | Aviva | fca.org.uk/register | FCA-authorised insurer, FRN 202153 |
| Medical prescriptions | NHS Trust | cqc.org.uk/providers | CQC-registered healthcare provider |
| Professional licences | Law Society member | sra.org.uk/solicitors | SRA-regulated solicitor practice |
| Building inspections | Approved Inspector | gov.uk/building-control | Registered building control approver |
| US bank statements | JPMorgan Chase | occ.gov/institutions | OCC-chartered national bank, Charter #8 |
| US hospital records | Mayo Clinic | jointcommission.org/accredited | Joint Commission-accredited healthcare organisation |
| US insurance | State Farm | insurance.il.gov/licensed | State-licensed insurance carrier, IL License #1234 |
| EU bank statements | Deutsche Bank | bafin.de/register | BaFin-regulated credit institution |
| Notary documents | Commissioned notary | sos.state.xx.us/notaries | State-commissioned notary public, Commission #12345 |

**Chain shape:** Issuer → regulator → government (2-3 levels).

**`authorityBasis` wording:** States the regulatory status and registration number. The regulator may dictate exact wording as a condition of endorsement.

**How to recognise this pattern in a use case file:** The "Issuer Types (First Party)" section lists banks, insurers, universities, hospitals, licensed professionals, or other entities that operate under a government-issued licence or registration.

**Full worked example — university degree from Oxford:**

```json
{
  "issuer": "University of Oxford",
  "authorityBasis": "Registered higher education provider, OfS #10007774",
  "claimType": "Academic degree",
  "authorizedBy": "officeforstudents.org.uk/register",
  "responseTypes": {
    "OK": { "class": "affirming", "text": "Degree verified" },
    "REVOKED": { "class": "denying", "text": "Degree revoked" }
  }
}
```

The corresponding `## Authority Chain` section:

```markdown
## Authority Chain

**Pattern:** Regulated

Universities are regulated by government bodies that have statutory power to grant
and revoke degree-awarding authority. In England, this is the Office for Students
(OfS). The chain goes: university → OfS → UK government.

**Primary issuer examples:**

| Field | Value |
|---|---|
| Issuer domain | `ox.ac.uk/verify` |
| `authorizedBy` | `officeforstudents.org.uk/register` |
| `authorityBasis` | Registered higher education provider, OfS #10007774 |

| Field | Value |
|---|---|
| Issuer domain | `mit.edu/verify` |
| `authorizedBy` | `neche.org/accredited` |
| `authorityBasis` | NECHE-accredited degree-granting institution |
```

---

### Pattern 3: Commercial

The issuer is a business or platform with no sovereign authority. They may be endorsed by an industry body, a standards organisation, or another commercial entity — but the chain never reaches a government root. The `authorityBasis` should make this clear without being apologetic — commercial authority is legitimate, just different from sovereign authority.

**Examples:**

| Use Case | Issuer | authorizedBy | authorityBasis |
|---|---|---|---|
| Employment references (HRIS) | Workday | *(self-authorized)* | HR information system platform, SOC 2 Type II certified |
| Background checks | Checkr | napbs.org/accreditation | NAPBS-accredited background screening provider |
| Product certifications | BSI Group | *(self-authorized)* | National standards body, Royal Charter |
| Food safety | Restaurant chain | food.gov.uk/ratings | Food hygiene rated premises |
| Warranty documents | Samsung | *(self-authorized)* | Product manufacturer |
| Event tickets | Ticketmaster | *(self-authorized)* | Ticketing platform |
| Delivery confirmation | FedEx | *(self-authorized)* | Logistics carrier |
| Hotel booking | Hilton | *(self-authorized)* | Hotel operator |
| Carbon credits | Verra | *(self-authorized)* | Carbon credit registry and standards body |

**Chain shape:** Issuer → industry body (or self-authorized). No government root.

**`authorityBasis` wording:** States what the business does and any relevant accreditation.

**How to recognise this pattern in a use case file:** The "Issuer Types (First Party)" section lists private companies, platforms, manufacturers, or industry bodies that are not operating under a government licence.

**Note:** Some issuers straddle the line between Regulated and Commercial. A food business has a government food hygiene rating (Regulated) but is itself a commercial entity. Use the pattern that best describes the *issuer's* relationship to the authority chain. If the government *requires* the activity to be licensed, it's Regulated. If the business is voluntarily accredited, it's Commercial.

**Full worked example — background check from Checkr:**

```json
{
  "issuer": "Checkr Inc.",
  "authorityBasis": "NAPBS-accredited background screening provider",
  "claimType": "Employment background check",
  "authorizedBy": "napbs.org/accreditation"
}
```

The corresponding `## Authority Chain` section:

```markdown
## Authority Chain

**Pattern:** Commercial

Background check firms are accredited by the National Association of Professional
Background Screeners (NAPBS) but are not government-regulated. The authority chain
goes: screening firm → NAPBS. There is no sovereign root.

**Primary issuer examples:**

| Field | Value |
|---|---|
| Issuer domain | `checkr.com/verify` |
| `authorizedBy` | `napbs.org/accreditation` |
| `authorityBasis` | NAPBS-accredited background screening provider |

| Field | Value |
|---|---|
| Issuer domain | `sterling.com/verify` |
| `authorizedBy` | `napbs.org/accreditation` |
| `authorityBasis` | NAPBS-accredited background screening provider |
```

---

### Pattern 4: Personal

The issuer is an individual. There is no institutional backing. The `authorityBasis` must make it clear that this is a personal attestation. A commercial platform (e.g. a peer referral service) may endorse the individual, but the platform itself is also self-authorized — the chain never reaches sovereign or regulated authority.

**Examples:**

| Use Case | Issuer | authorizedBy | authorityBasis |
|---|---|---|---|
| Peer employment reference | paulhammant.com/refs | refs.peerreferrals.com/v1 | Individual's personal peer references |
| Freelance project attestation | jane-dev.com/work | refs.peerreferrals.com/v1 | Individual's personal project attestations |
| Personal recommendation | supervisor.com/recs | *(self-authorized)* | Individual's personal professional recommendations |
| Volunteer hours | volunteer.me/hours | charitycheckout.org/volunteers | Individual volunteer hour log |
| Coaching certification | coach-jane.com/certs | icf-coaching.org/members | ICF-credentialed individual coach |

**Chain shape:** Individual → commercial platform (or self-authorized). Never reaches government.

**`authorityBasis` wording:** Must include "Individual" or "personal" to signal that this is not institutional.

**How to recognise this pattern in a use case file:** The "Issuer Types (First Party)" or "Second-Party Use" section describes individuals acting on their own behalf — peer references, personal attestations, freelancers, volunteers, or individual professionals without institutional backing.

**Full worked example — peer employment reference:**

```json
{
  "issuer": "Paul Hammant",
  "authorityBasis": "Individual's personal peer references",
  "claimType": "Peer employment reference",
  "authorizedBy": "refs.peerreferrals.com/v1"
}
```

The corresponding `## Authority Chain` section:

```markdown
## Authority Chain

**Pattern:** Personal

Peer references are individual attestations — one person vouching for another. The
verify line points to the referee's domain, not an employer's. There is no
institutional or sovereign authority behind the claim.

**Primary issuer example:**

| Field | Value |
|---|---|
| Issuer domain | `paulhammant.com/refs` |
| `authorizedBy` | `refs.peerreferrals.com/v1` |
| `authorityBasis` | Individual's personal peer references |

If the individual is self-hosting without a platform endorsement, `authorizedBy` is
omitted and the trust rests entirely on the individual's domain.
```

---

## Mixed-Pattern Use Cases

Some use cases have multiple issuer types spanning different patterns. When this happens, the `## Authority Chain` section should list all applicable patterns.

**Example: employment-references.md** has four issuer types:

```markdown
## Authority Chain

**Patterns:** Regulated, Commercial, Personal

Employment references span multiple authority levels depending on the issuer.

**Regulated — Corporation issuing directly:**

| Field | Value |
|---|---|
| Issuer domain | `acme-corp.com/staff` |
| `authorizedBy` | *(self-authorized — the employer is the root for their own employment records)* |
| `authorityBasis` | Direct employer verification |

**Commercial — HRIS platform issuing on behalf of employer:**

| Field | Value |
|---|---|
| Issuer domain | `workday.com/verify` |
| `authorizedBy` | *(self-authorized)* |
| `authorityBasis` | HR information system platform, SOC 2 Type II certified |

**Commercial — Background check utility:**

| Field | Value |
|---|---|
| Issuer domain | `theworknumber.com/verify` |
| `authorizedBy` | `napbs.org/accreditation` |
| `authorityBasis` | NAPBS-accredited employment verification utility |

**Personal — Peer reference:**

| Field | Value |
|---|---|
| Issuer domain | `paulhammant.com/refs` |
| `authorizedBy` | `refs.peerreferrals.com/v1` |
| `authorityBasis` | Individual's personal peer references |
```

---

## Common Regulators and Industry Bodies (Reference)

When writing `authorizedBy` values, use these real domains as a reference:

### UK Regulators
| Regulator | Domain for authorizedBy | What they regulate |
|---|---|---|
| Financial Conduct Authority | `fca.org.uk/register` | Banks, insurers, investment firms |
| Office for Students | `officeforstudents.org.uk/register` | Universities (England) |
| Care Quality Commission | `cqc.org.uk/providers` | Healthcare providers (England) |
| Solicitors Regulation Authority | `sra.org.uk/solicitors` | Solicitors (England & Wales) |
| General Medical Council | `gmc-uk.org/register` | Doctors (UK) |
| Nursing & Midwifery Council | `nmc.org.uk/register` | Nurses (UK) |
| Ofsted | `ofsted.gov.uk/provider` | Schools, childcare (England) |
| UK Policing | `policing.gov.uk/forces` | Police forces (England & Wales) |

### US Regulators
| Regulator | Domain for authorizedBy | What they regulate |
|---|---|---|
| OCC | `occ.gov/institutions` | National banks |
| FDIC | `fdic.gov/institutions` | Deposit-insured institutions |
| SEC | `sec.gov/cgi-bin/browse-edgar` | Securities firms |
| State insurance depts | `insurance.{state}.gov/licensed` | Insurance carriers (per state) |
| State bar associations | `{state}bar.org/members` | Attorneys (per state) |
| Joint Commission | `jointcommission.org/accredited` | Healthcare organisations |

### International Regulators
| Regulator | Domain for authorizedBy | Country | What they regulate |
|---|---|---|---|
| BaFin | `bafin.de/register` | Germany | Banks, insurers |
| AMF | `amf-france.org/en/professionals` | France | Financial markets |
| ASIC | `asic.gov.au/online-services` | Australia | Financial services |
| OSFI | `osfi-bsif.gc.ca/institutions` | Canada | Banks, insurers |
| MAS | `mas.gov.sg/financial-institutions` | Singapore | Financial institutions |

### Industry Bodies (Commercial)
| Body | Domain for authorizedBy | What they accredit |
|---|---|---|
| NAPBS | `napbs.org/accreditation` | Background screening providers |
| UKAS | `ukas.com/accredited` | Certification bodies (UK) |
| ANAB | `anab.org/accredited` | Certification bodies (US) |
| ISO (via accreditation bodies) | *(use national accreditation body)* | Standards compliance |

---

## How Client Apps Should Use This

The `authorityBasis` field is short (one line) and appears in the authorization chain display. Example renderings:

**Sovereign/Regulated (high trust):**
> Verified by **met.police.uk**
> Authorized by **policing.gov.uk** — Territorial police force, England & Wales

**Commercial (medium trust):**
> Verified by **checkr.com**
> Authorized by **napbs.org** — NAPBS-accredited background screening provider

**Personal (lighter trust):**
> Verified by **paulhammant.com**
> Authorized by **refs.peerreferrals.com** — Individual's personal peer references

The verifier sees at a glance whether they're looking at a government-backed document, a commercially certified one, or a personal attestation. All three are valid verifications — the hash is real, the attestation exists — but they carry different weight.

## Authorizer Requirements

An authorizer can require specific `authorityBasis` wording before endorsing an issuer's `verification-meta.json`. This is enforced by the hash: if the issuer changes any field (including `authorityBasis`), the hash changes, and the authorizer's endorsement breaks until they re-hash.

Examples of authorizer-dictated wording:

- **FCA:** "You must state 'FCA-authorised' and include your Firm Reference Number"
- **OfS:** "You must state 'Registered higher education provider' and your OfS registration number"
- **PeerReferrals:** "You must include the word 'Individual' in your authorityBasis"

This means the authorizer controls not just *whether* they endorse, but *how the issuer describes themselves* to verifiers. The issuer cannot claim to be something the authorizer hasn't endorsed.

## When authorizedBy is Absent

If a `verification-meta.json` has no `authorizedBy` field, the issuer is self-authorized. The client app shows only the issuer's domain. The `authorityBasis` field (if present) still appears, but without an endorser — it's the issuer's own claim about themselves, unendorsed.

This is the appropriate state for:
- Top-level government bodies (HMRC, IRS — they *are* the root)
- Individuals hosting on their personal domain without platform endorsement
- New issuers who haven't yet obtained endorsement
- Direct employers issuing their own employment references (the employer is the root for their own records)

The absence of `authorizedBy` is not inherently suspicious — it just means the trust rests entirely on the domain itself.

# Secondary Verification Actions

## The Split of Interests

When a document is verified, two different audiences care about different things:

**Consumer apps** (phone camera, browser extension) care about one thing: is this document genuine? They scan the `verify:` line, check the hash, show a green tick or a red cross. Done.

**Specialist software** (pharmacy systems, procurement platforms, regulatory audit tools) care about more: is the *named professional* still licensed? Is the *employer* genuinely registered? Is the *institution* still accredited? These are secondary lookups that the consumer app ignores entirely.

The primary verification endpoint serves the document holder. The secondary verification chain serves the industry.

## How It Works

### Step 1 — Primary Verification (Consumer)

The `verify:` line on the document resolves a hash against the issuer's domain. The response is `OK`, `REVOKED`, or a richer status. This is all the consumer app does.

### Step 2 — Secondary Lookup (Specialist Software)

The verified payload contains named entities (a prescriber, an employer, an inspector). Specialist software extracts these and follows structured paths advertised in the issuer's `verification-meta.json`:

```json
{
  "secondaryLookups": {
    "prescriber": {
      "pathPattern": "/prescriber/{name}",
      "contentType": "text/plain",
      "authorizedBy": "register.gmc-uk.org"
    }
  }
}
```

The secondary endpoint serves **plain text** (not HTML). The specialist software hashes this payload and takes the hash to the `authorizedBy` domain for confirmation.

### Step 3 — Authority Confirmation

The regulator's endpoint confirms or denies the hash. If `register.gmc-uk.org/{hash}` returns 200, the regulator has confirmed that the issuer's claim about the named professional matches their records.

## Worked Example: Paper Prescription

This concerns **printed prescriptions** — the ones a patient carries to a pharmacy in person. Electronic prescriptions sent via EPS (Electronic Prescription Service) in the UK or e-prescribing systems in the US are transmitted as structured XML/JSON directly between prescriber and pharmacy. Those don't need Live Verify — the electronic channel is already authenticated.

Paper prescriptions persist because:
- Private prescriptions (UK) are often still handwritten or printed
- Controlled substance prescriptions in some US states require paper (DEA Form 222)
- Cross-border prescriptions (EU Cross-Border Healthcare Directive) are paper
- Veterinary prescriptions are almost universally paper
- System outages force fallback to paper

### The Flow

**What the patient sees:**

A printed prescription with `verify:elmstreetmedical.nhs.uk/rx/v` at the bottom.

**What the pharmacist's consumer app does:**

Scans → hash matches → green tick. The prescription is genuine, issued by Elm Street Medical Centre. Dispense.

**What the pharmacy management system does (in addition):**

1. The verified prescription text includes: `Prescribed by: Stephen Milligan MD (GMC 7654321)`
2. The system hits `elmstreetmedical.nhs.uk/prescriber/stephen-milligan-md` → gets a plain text payload:
   ```
   Stephen Milligan
   GMC 7654321
   Prescriber type: Independent
   Controlled substances: Yes
   Status at practice: Active
   ```
3. The system hashes this payload → `register.gmc-uk.org/{hash}` → 200 OK
4. The GMC has confirmed: Elm Street Medical's claim about Dr. Milligan's registration and prescribing authority is accurate

**What this catches:**

- A surgery claims a doctor works there after they've left → the GMC hash won't match because the surgery's payload says "Active" but the GMC's record has changed
- A struck-off doctor's name appears on a prescription → the GMC endpoint returns 404 or REVOKED
- A surgery invents a fictitious doctor → no hash exists at the GMC

## Other Examples

### Employment Reference

**Consumer:** Landlord scans a reference letter → verified, this employer issued it.

**Specialist (immigration case worker):**
- Extracts employer identity from verified text
- Hits `hr.example-corp.com/employer-status` → plain text payload of PAYE registration
- Hashes → takes to `hmrc.gov.uk/paye/{hash}` → confirms this is a registered employer

### University Transcript

**Consumer:** Hiring manager scans a degree certificate → verified, UCL issued it.

**Specialist (professional body admissions):**
- Extracts institution from verified text
- Hits `registrar.ucl.ac.uk/accreditation` → plain text payload of OfS registration
- Hashes → takes to `officeforstudents.org.uk/{hash}` → confirms UCL is a registered provider

### Building Inspection Report

**Consumer:** Homebuyer scans an inspection report → verified, issued by the local authority.

**Specialist (insurance underwriter):**
- Extracts inspector name from verified text
- Hits `inspections.localauthority.gov.uk/inspector/jane-doe` → plain text payload
- Hashes → takes to `rics.org/{hash}` → confirms the inspector is RICS-chartered

## Content Type Convention

| Endpoint | Audience | Content-Type | Purpose |
|---|---|---|---|
| Primary `verify:` | Consumer apps | `text/plain` or `application/json` | Document status (OK, REVOKED, etc.) |
| Secondary lookup | Specialist software | `text/plain` | Entity payload for hashing |
| Authority confirmation | Specialist software | `text/plain` or `application/json` | Hash confirmation (200/404) |

Secondary lookup endpoints always serve `text/plain` because their content must be deterministically hashable. HTML would introduce formatting variations that break hash reproducibility.

## Action Suggestions (Consumer-Facing)

Secondary lookups serve specialist software. But there's a lighter-weight mechanism for consumer apps: **action suggestions** in the issuer's `verification-meta.json`. These are optional prompts the app can offer after a successful primary verification — no secondary lookup needed.

### Schema

```json
{
  "actionSuggestions": [
    {
      "action": "notify",
      "text": "Share this driver's details with your emergency contact",
      "description": "Sends driver name, licence, vehicle, and your pickup location to a trusted contact"
    },
    {
      "action": "store",
      "text": "Save these credentials for your records",
      "description": "Store verified credentials locally for future reference or dispute resolution"
    },
    {
      "action": "register",
      "text": "Register this care visit",
      "description": "Log this visit with the care coordinator for safeguarding records",
      "redirectUrl": "https://provider.example.com/log-visit",
      "redirectParams": {
        "worker": "{worker_name}",
        "credential": "{credential_id}",
        "date": "{verification_timestamp}"
      }
    }
  ]
}
```

### Fields

| Field | Required | Description |
|---|---|---|
| `action` | Yes | Action type: `notify`, `store`, or `register` |
| `text` | Yes | Short prompt shown to the user (one line) |
| `description` | Yes | Explanation of what will happen if the user taps |
| `redirectUrl` | No | URL to open if the user accepts. Absent for local-only actions like `store` |
| `redirectParams` | No | Template parameters substituted from the verification context before redirect |

### Action Types

**`notify`** — Send the verified credential details to a trusted contact. The app composes a message (SMS, email, or platform-specific) containing the verified person's name, credential, photo hash, and the user's current location. Primary use: personal safety (taxi rides, care visits, tradesperson visits). The recipient is chosen by the user, not by the issuer.

**`store`** — Save the verified credential locally on the user's device. No data leaves the phone. Useful for keeping a record of who performed work (insurance claims, warranty disputes), who visited (care logs), or who was verified (incident records).

**`register`** — Open a URL to register the interaction with a third party. The `redirectUrl` is provided by the issuer's `verification-meta.json`; the app substitutes `redirectParams` from the verification context before opening it. Use cases:

- Tradesperson visits: register with HMRC for tax purposes, or with an insurance company for warranty/claims documentation
- Care visits: log with the care coordinator for safeguarding records
- Taxi rides: register with the licensing authority's safety database

### Privacy Constraints

Action suggestions are **optional for the user.** The app shows them; the user decides whether to act. The verification itself is complete regardless.

The `redirectUrl` is controlled by the issuer — the app should display the destination domain clearly before redirecting. The user must consent to the redirect; the app never silently opens URLs.

`redirectParams` are populated from the verification response, not from the user's device. The app does not send device identifiers, location, or personal data unless the user explicitly includes it (e.g., by choosing to share location with an emergency contact via `notify`).

### Relationship to Secondary Lookups

Action suggestions and secondary lookups serve different audiences:

| | Secondary Lookups | Action Suggestions |
|---|---|---|
| **Audience** | Specialist software | Consumer apps |
| **Trigger** | Automatic (software follows `secondaryLookups` paths) | User-initiated (taps a prompt) |
| **Purpose** | Verify named entities against regulator | Record, share, or register the interaction |
| **Protocol** | Hash-based chain verification | URL redirect or local storage |
| **Defined in** | `verification-meta.json` → `secondaryLookups` | `verification-meta.json` → `actionSuggestions` |

Both live in the issuer's `verification-meta.json` but operate independently. A pharmacy system follows `secondaryLookups` to verify a prescriber; it ignores `actionSuggestions`. A consumer app shows `actionSuggestions` to the user; it ignores `secondaryLookups`.

See [Trust Assessments](trust-assessments.md) for when action suggestions matter most — safety-critical verifications where logging the interaction protects the vulnerable party.

## What This Is Not

- **Not a directory lookup.** The specialist software is not querying "tell me about Dr. Milligan." It is asking "does your record match what Elm Street Medical claims about Dr. Milligan?"
- **Not the consumer's concern.** The phone app never follows secondary lookups. It shows the green tick and stops.
- **Not a replacement for electronic channels.** EPS, e-prescribing, and HESA returns already handle machine-to-machine verification in their respective industries. Secondary lookups serve the paper/printed document use case where those electronic channels don't apply.

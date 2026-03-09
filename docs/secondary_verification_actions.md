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

## What This Is Not

- **Not a directory lookup.** The specialist software is not querying "tell me about Dr. Milligan." It is asking "does your record match what Elm Street Medical claims about Dr. Milligan?"
- **Not the consumer's concern.** The phone app never follows secondary lookups. It shows the green tick and stops.
- **Not a replacement for electronic channels.** EPS, e-prescribing, and HESA returns already handle machine-to-machine verification in their respective industries. Secondary lookups serve the paper/printed document use case where those electronic channels don't apply.

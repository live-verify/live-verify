# Verification Response Format

This document defines the standard response format for Live Verify endpoints.

## Core Principle: Never Echo Claim Content

**Verification endpoints NEVER echo back the document's content.**

The verifier already has the document—they just scanned or selected it. They can see the name, license number, employer, amounts, dates, etc. The endpoint's job is to confirm authenticity, not repeat what's already visible.

| Wrong | Right |
|-------|-------|
| Return `"subject_name": "Jennifer Hughes"` | Verifier already sees the name on the document |
| Return `"license_number": "SOL-2019-44821"` | Verifier already sees the license number |
| Return `"amount": "USD 1,250,000"` | Verifier already sees the amount |

**What endpoints SHOULD return:**
- **Status** — Is this document authentic and current? (`verified`, `revoked`, `expired`)
- **Actionable context** — Information the verifier needs but doesn't have (see below)

## Standard JSON Response

All verification responses use JSON. The simplest possible response:

```json
{
  "status": "verified"
}
```

That's it for most cases. The document itself contains all the content; the endpoint just confirms it's authentic.

The verifier app parses the JSON and checks: `json.status === "verified"` → show green "VERIFIED".

### Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `status` | string | **Required.** The verification result. See [Status Codes](#status-codes). |

### Schema Versioning

Both `verification-meta.json` and verify response payloads include a `schemaVersion` field to support safe evolution over time:

```json
{
  "schemaVersion": 1,
  "status": "verified"
}
```

Clients should ignore unknown fields (forward compatibility) and use `schemaVersion` to handle breaking changes. The current schema version is **1**. The field is optional for now — its absence implies version 1 — but new deployments should include it.

### Actionable Context (Not Content Echo)

Some scenarios benefit from **actionable context**—information the verifier needs but doesn't have from the document itself:

| Field | When Appropriate | Why It's Not Echo |
|-------|------------------|-------------------|
| `photo_url` | Identity credentials (badges) | Verifier compares to person in front of them |
| `current_destination` | Delivery workers | Dynamic; confirms driver is at right address |
| `allowedDomains` | Third-party site claims (reseller authorizations, panel membership, contractor registrations) | Enables domain-mismatch detection — see [Allowed Domains](#allowed-domains) |
| `message` | Any failure status | Human-readable explanation of why verification failed |

### Photo URL Security

If returning a `photo_url`, it should:

1. **Use hash-based filenames** — Not `/photos/1332.jpg` (enumerable), but `/photos/a3f2b8c9d4e5...jpg` (requires knowing the hash)
2. **Include no-cache headers** — Prevent browsers/proxies from retaining photos after the credential is revoked
3. **Optionally be time-limited** — URL could include a short-lived token, expiring after the verification session

**Examples:**
```json
{
  "status": "verified",
  "photo_url": "/photos/{hash}.jpg"
}
```

```json
{
  "status": "verified",
  "photo_url": "/{hash}.jpg"
}
```

Relative paths are preferred—the client already knows the issuer domain from the verification URL. The client resolves `/photos/{hash}.jpg` against the same domain it just queried.

Full URLs are also valid if the photo is hosted elsewhere:
```json
{
  "status": "verified",
  "photo_url": "https://cdn.officers.police.uk/5bae46076bc23bb356231b60075c1304996289797c9351cbde641f8af116bfce.jpg"
}
```

The photo endpoint should return:
```
Cache-Control: no-store, no-cache, must-revalidate
Pragma: no-cache
Expires: 0
```

This prevents:
- **Enumeration attacks** — Can't iterate through `/photos/1.jpg`, `/photos/2.jpg`
- **Stale photo caching** — Revoked credentials don't leave cached photos behind
- **Dynamic photo serving** — if the e-ink ID for the holder has a salt that is changing on some basis, then the photos with the same hash appear/disappear on the same basis (or last only seconds longer)
- **Roster building** — Can't scrape all employee photos by guessing URLs

### Screen Capture Prevention

Photos returned by verification endpoints are sensitive — they exist for momentary visual comparison ("does this person match this photo?"), not for collection or redistribution. All clients should treat photos as screen-capture-protected by default.

| Client | Capability | Mechanism |
|--------|-----------|-----------|
| **iOS app** | Can block | `UIScreen.isCaptured` / secure content API — OS blanks the view in screenshots and screen recordings |
| **Android app** | Can block | `FLAG_SECURE` on the window — OS prevents screenshots and excludes the window from screen recording |
| **Browser extension** | Cannot block (today) | Best effort: show photo briefly, remove from DOM after display, never persist to local storage |
| **Web component** | Cannot block (today) | Same best-effort approach as browser extension |

This is not a protocol concern — the response format doesn't need a field signalling screenshot policy. Every client treats every photo as sensitive. The limitation is the OS/browser sandbox, not the spec.

Browser-based clients are the gap. Neither macOS, Windows, nor Linux currently expose screen-capture-suppression APIs to browser extensions or web content. As OS vendors extend content protection capabilities (Apple and Microsoft are both moving in this direction for DRM and enterprise data protection), browser-based verifiers will gain parity with native apps. When that happens, clients adopt the new OS APIs — the protocol doesn't change.

A determined person can always photograph their screen with another device. The goal is to make casual capture and bulk scraping difficult, not to achieve absolute prevention.

**Example: Delivery Worker (actionable context)**
```json
{
  "status": "verified",
  "photo_url": "https://associates.dpd.co.uk/photos/2621.jpg",
  "current_destination": "221B Baker St, London NW1 6XE"
}
```

The homeowner at 221B Baker St can:
1. Compare the photo to the person at their door
2. Confirm the destination matches their address

This is actionable—it helps them decide whether to open the door. It's not echoing the badge content.

**Example: Police Officer (minimal response)**
```json
{
  "status": "verified",
  "photo_url": "https://officers.police.uk/photos/7b6aa80ef223f4da8fc00f81b77ff0afa7686f6454836a6bd9489f62e8e3a1fa.jpg"
}
```

The citizen can compare the photo to the officer. They don't need the endpoint to tell them the officer's name or badge number—that's on the warrant card they just scanned.

**Example: Financial Document (status only)**
```json
{
  "status": "verified"
}
```

The bank confirms the proof-of-funds letter is authentic. The verifier already has the letter with the amount, date, and account holder name.

**Example: Success with guidance**
```json
{
  "status": "verified",
  "message": "Licensed MD in Texas — compare photo to confirm identity",
  "photo_url": "/photo/a3f2b8c9d4e5f6a7"
}
```

`status: "verified"` is the machine-readable verdict. The `message` provides human-readable guidance—what the verifier should do next.

**Example: Failure with explanation**
```json
{
  "status": "suspended",
  "message": "License suspended pending disciplinary hearing"
}
```

For failures, `message` explains *why* verification failed—context the verifier wouldn't otherwise have.

## Allowed Domains

Some verifiable claims are designed to be displayed on a third party's website — for example, a manufacturer's reseller authorization embedded on a retailer's product page, or an insurer's panel membership badge on a healthcare provider's site.

The risk is that a scam site copies the claim verbatim. The hash still verifies (the text is identical), but the buyer is not on the authorized site.

The `allowedDomains` response field addresses this:

```json
{
  "status": "verified",
  "allowedDomains": ["foobar50xx.com", "*.foobar50xx.com"]
}
```

### How it works

1. The claim text typically includes the authorized domain in human-readable form — e.g., `FooBar Electronics Ltd (foobar50xx.com) is a licensed reseller of...`
2. The verification response includes `allowedDomains` as a machine-readable confirmation
3. The browser extension compares `window.location.hostname` against the allowed domains list
4. **Match** → standard green "VERIFIED" result
5. **Mismatch** → amber warning: "This claim verified, but it names foobar50xx.com and you are on scamgpus.com"

### Field specification

| Field | Type | Description |
|-------|------|-------------|
| `allowedDomains` | `string[]` | Optional. Array of domain patterns where this claim is authorized to appear. Supports exact match (`foobar50xx.com`) and wildcard subdomains (`*.foobar50xx.com`). |

### When to use

- **Reseller / dealer authorizations** — manufacturer authorizes a retailer for a specific site
- **Insurance panel membership** — insurer confirms a provider's web presence
- **Certified repair center** — manufacturer authorizes a service center's site
- **Software partner authorizations** — vendor confirms a reseller's domain
- **Approved contractor registrations** — registry confirms a contractor's site
- **Any claim where the issuer and the displayer are different entities**

### When NOT to use

- **Self-issued claims** — a company verifying its own documents on its own site doesn't need domain binding
- **Physical/camera-mode claims** — a printed badge or certificate has no "current page" to check against. `allowedDomains` is a clip-mode / browser-extension feature only.

### Domain in the claim text

The `allowedDomains` response field is the machine-readable check. But the claim text itself should also include the authorized domain in human-readable form — typically in parentheses after the entity name:

```
FooBar Electronics Ltd (foobar50xx.com)
is a licensed reseller of NVIDIA GeForce
RTX 50 Series products on
verify:nvidia.com/resellers
```

This serves as a fallback for:
- Users without the browser extension
- Users who read the verified detail
- Camera-mode or screenshot scenarios where `allowedDomains` isn't available

## Status Codes

### Universal Statuses

| Status       | Meaning                                           | Verifier Action                                     |
|--------------|---------------------------------------------------|-----------------------------------------------------|
| `verified`   | Document is authentic and current                 | Show green "VERIFIED"                               |
| `expired`    | Document was valid but has passed its expiry date | Show amber warning; request fresh document          |
| `revoked`    | Document was explicitly invalidated by issuer     | Show red "REVOKED"; do not trust                    |
| `superseded` | A newer version of this document exists           | Show amber; request updated document                |
| `404`        | Hash not found                                    | Show red "NOT FOUND"; possible forgery or OCR error |

### Domain-Specific Statuses

Endpoints may return statuses specific to their document type. These should be self-explanatory and actionable:

| Domain                | Example Statuses                                                   |
|-----------------------|--------------------------------------------------------------------|
| **Employment**        | `TERMINATED`, `ON_LEAVE`, `CONTRACTOR_ENDED`                       |
| **Licensing**         | `SUSPENDED`, `DISBARRED`, `UNDER_INVESTIGATION`, `EXPIRED_LICENSE` |
| **Insurance**         | `LAPSED`, `AUDIT_PENDING`, `SEGMENT_LAPSED`                        |
| **Identity/Access**   | `NOT_SCHEDULED`, `INVALID_UNIT`, `OFF_DUTY`, `SUSPENDED`           |
| **Background Checks** | `ALERT`, `REVIEW_REQUIRED`                                         |

### Status Code Design Principles

1. **Self-documenting:** A verifier unfamiliar with the domain should understand the implication
2. **Actionable:** Each status implies a clear next step
3. **Conservative:** When in doubt, return a more cautious status
4. **No false positives:** Never return `verified` unless the document is genuinely valid

## Error Responses

For errors (as opposed to negative verification results), return appropriate HTTP status codes:

```json
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
  "error": "MALFORMED_HASH",
  "message": "Hash must be 64 hexadecimal characters"
}
```

```json
HTTP/1.1 429 Too Many Requests
Content-Type: application/json

{
  "error": "RATE_LIMITED",
  "message": "Too many verification requests",
  "retry_after": 60
}
```

```json
HTTP/1.1 503 Service Unavailable
Content-Type: application/json

{
  "error": "ISSUER_UNAVAILABLE",
  "message": "Upstream issuer system is temporarily unavailable"
}
```

| HTTP Status   | Use Case                                           |
|---------------|----------------------------------------------------|
| `200`         | Verification completed (even if result is REVOKED) |
| `400`         | Malformed request (bad hash format)                |
| `404`         | Hash not found in database                         |
| `429`         | Rate limit exceeded                                |
| `500`         | Internal server error                              |
| `503`         | Upstream dependency unavailable                    |

**Note:** A `404` for a hash lookup is a verification result (document not found), not an error.
It should return HTTP 404 with optional JSON body explaining the result. Some 404s will happen after OCR
errors in the camera apps, and people will get used to trying again after repositioning the phone.

## When Records Are Created vs Never Created

**Key principle:** A hash only appears in the verification database if the claim was **issued/approved**. Post-issuance status changes (revoked, suspended) return 200 OK with status. Pre-issuance denials never create a database record.

### Example: Medical License Application

**Scenario 1: License granted, then later revoked**
1. Doctor applies for medical license
2. Background check passes, license **granted** (2023-01-15)
3. Database record created: `hash → OK`
4. Doctor can verify license: `GET /verify/hash` → `200 OK` + `"OK"`
5. Later: Malpractice finding, license **revoked** (2024-06-15)
6. Database record updated: `hash → REVOKED`
7. Doctor's document still exists, but verification shows: `200 OK` + `{"status": "REVOKED"}`

**Scenario 2: License denied during initial application**
1. Applicant applies for medical license
2. Background check **fails** - criminal record found
3. Application **denied** - license never issued
4. **NO database record created** - hash never enters the system
5. Applicant has no document to share (license was never printed)
6. If applicant somehow fabricated a document: `GET /verify/hash` → `404 Not Found`

**Why this matters:**
- **404 means:** Hash not found - either document is fake, OCR failed, or document was never issued
- **200 + REVOKED means:** Document was real and issued, but issuer has revoked it
- **Denied applications don't get hashes** - you can't verify something that was never created
- **Privacy protection:** Applicant's denial isn't publicly queryable (404 looks the same as fake document)

## Post-Verification Actions

Some use cases benefit from **post-verification actions**—optional follow-up the verifier can take after confirming authenticity. These are returned as part of the response.

### Pattern 1: Follow-Up Form for Recording

For scenarios with power dynamics or accountability needs, the response can include a URL for the verifier to optionally record the interaction:

```json
{
  "status": "verified",
  "message": "Licensed building inspector — City of Chicago",
  "follow_up_url": "/inspect/report/992288",
  "follow_up_prompt": "Optionally record details of this inspection visit or interaction"
}
```

The app offers to open this URL (embedded WebView or external browser). The issuer's web app handles the actual form—could be a simple single page or a multi-step flow. When complete, the page tells the user they can close the tab and return to the app.

**The "never discouraged" principle:** The badge holder should never tell the verifier "you don't need to do that" or "that's only for complaints." The option to record is always appropriate, even for routine visits. The existence of the option is itself a deterrent.

**Use cases with follow-up forms:**
- **Building inspectors** — Homeowner records visit; bribery deterrent
- **Healthcare workers** — Patient/family records interaction; staffing evidence
- **Hotel staff** — Guest records room entry; harassment deterrent
- **Residential contractors** — Resident records service visit; theft deterrent
- **Home service providers** — Homeowner records work quality

### Pattern 2: Verification ID for Accountability

For high-stakes interactions (especially law enforcement), the response includes a verification ID that creates mutual accountability:

```json
{
  "status": "verified",
  "message": "Active Metropolitan Police officer",
  "verification_id": "VRF-2026-01-12-14:32:07-7k3m9x2p",
  "complaint_url": "/complaints?ref=VRF-2026-01-12-14:32:07-7k3m9x2p"
}
```

**What this enables:**

| Party | Benefit |
|-------|---------|
| **Citizen** | One-click complaint path; timestamp proof; no badge number to remember |
| **Officer** | Exoneration evidence; harassment pattern detection; frivolous complaint filtering |
| **Department** | Correlation analytics; abuse detection; audit trail |

The verification event IS the record—the department already has it. The ID lets the citizen reference it later.

### Pattern 3: Link to Existing Infrastructure

For professions with established public registries, return a link rather than a POST form:

```json
{
  "status": "verified",
  "more_info": "https://lawsociety.org.uk/public/solicitor/SOL-2019-44821"
}
```

**Use cases with link only:**
- **Bar admission** — Link to bar association profile (disciplinary history, complaint channel)
- **Professional licenses** — Link to licensing board's public registry
- **Medical licenses** — Link to state medical board lookup

### Pattern 4: Verification-as-Acknowledgment (Retention Headers)

For use cases where the **act of verifying** itself carries legal or business meaning — providing evidence that a device in the recipient's possession engaged with the claim — the response includes retention headers instructing the recipient's device to preserve the verification result.

```json
{
  "status": "active_call",
  "message": "Court Summons — Case CV-2026-03892",
  "headers": {
    "X-Verify-Retain-Until": "2031-02-28T00:00:00Z",
    "X-Verify-Retain-Reason": "service-of-process",
    "X-Verify-Case-Ref": "CV-2026-03892"
  }
}
```

**How it works:** The recipient's device performs a GET request against the issuer's verification endpoint. That GET is itself the provable event — the issuer's server logs record the hash was looked up at a specific timestamp, meaning someone in possession of the exact claim text actively verified it. The retention headers tell the recipient's device (or app) to preserve the verification result for the legally relevant period.

**The GET request as evidence:** The hash looked up in the GET could only have been computed by a device possessing the exact claim text. The claim text could only have come from the issuer's delivery (RCS/SMS, email, document). The chain is: issuer delivered claim → recipient's device computed hash → recipient's device performed GET → issuer logged the lookup. This chain constitutes a **point of evidence** of receipt — strong, timestamped, and cryptographically linked to the exact document text — but not irrefutable proof that the named recipient personally read or understood it. A flatmate could have opened the RCS. Software could have auto-verified. The recipient could have been incapacitated. It is analogous to a signed-for delivery receipt: strong presumption, rebuttable in court.

**Retention headers:**

| Header | Purpose | Example |
|--------|---------|---------|
| `X-Verify-Retain-Until` | How long the recipient's device should preserve the verification result | `2031-02-28T00:00:00Z` (5 years) |
| `X-Verify-Retain-Reason` | Machine-readable reason code for retention | `service-of-process`, `loan-disclosure`, `safety-recall`, `informed-consent` |
| `X-Verify-Retain-Reason-Further-Details` | URL to a human-readable page explaining *why* retention is requested, the legal basis, and the recipient's rights | `https://loandepot.com/verify/retain/tila-respa` |
| `X-Verify-Case-Ref` | Reference identifier linking to the underlying matter | `CV-2026-03892` |

The `X-Verify-Retain-Reason` stays short and machine-readable — apps and devices can act on it programmatically (e.g., filing the result in a "Legal" folder, setting a calendar reminder for expiry). The `X-Verify-Retain-Reason-Further-Details` URL provides the human context: what law or regulation requires this, what the retention period means, what happens at expiry, and what the recipient's rights are. The issuer hosts this page at their own domain.

**Example: Loan Closing Disclosure**

```
HTTP/1.1 200 OK
X-Verify-Status: verified
X-Verify-Retain-Until: 2056-02-28T00:00:00Z
X-Verify-Retain-Reason: loan-disclosure
X-Verify-Retain-Reason-Further-Details: https://loandepot.com/verify/retain/tila-respa
X-Verify-Case-Ref: LOAN-2026-448891
```

The URL at `loandepot.com/verify/retain/tila-respa` explains:

> *Federal law (TILA-RESPA Integrated Disclosure Rule) requires you to receive your Closing Disclosure at least 3 business days before your closing date. Your verification of this document provides timestamped evidence of receipt. We recommend retaining this verification result for the life of your loan. [Learn more about your rights under TILA-RESPA...]*

**Example: Service of Process**

```
HTTP/1.1 200 OK
X-Verify-Status: active_call
X-Verify-Retain-Until: 2031-02-28T00:00:00Z
X-Verify-Retain-Reason: service-of-process
X-Verify-Retain-Reason-Further-Details: https://courts.maricopa.gov/verify/retain/service-info
X-Verify-Case-Ref: CV-2026-03892
```

The URL at `courts.maricopa.gov/verify/retain/service-info` explains:

> *You have been formally served with a court summons. Your verification of this notice provides timestamped evidence of delivery under Arizona Rules of Civil Procedure. You have [X] days to respond. Failure to respond may result in a default judgment. [Learn more about responding to a summons...]*

This pattern lets issuers provide as much or as little context as appropriate, without bloating the HTTP response itself. The recipient's app can display the further-details link as a "Why am I being asked to keep this?" tap target.

**Use cases where the verification GET carries legal/business meaning:**

| Use Case | What the GET Evidences | Retention Period |
|----------|----------------------|-----------------|
| **Service of process** | Document was delivered to recipient's device | Case life + appeals (5-20 years) |
| **Eviction notice** | Notice was delivered; supports the statutory clock | Notice period + dispute window |
| **Loan disclosure (TILA/RESPA)** | Disclosure was delivered to and engaged with on borrower's device | Life of loan + 3 years |
| **Insurance policy delivery** | Policy was delivered to policyholder's device | Policy term + claims tail |
| **Employment policy acknowledgment** | Policy was delivered to employee's device | Employment + retention period |
| **Informed consent** | Consent information was delivered to and engaged with on patient's device | Statute of limitations for malpractice |
| **Product recall notification** | Recall notice was delivered to consumer's device | Product lifetime + liability window |
| **Data breach notification** | Breach notification was delivered to individual's device | Regulatory retention period |
| **Restraining order notification** | Order terms were delivered to subject's device | Order duration + enforcement window |
| **Rate/price lock confirmation** | Lock terms were delivered to customer's device | Transaction completion + dispute window |
| **Non-compete/NDA delivery** | Restrictive covenant was delivered to employee's device | Covenant term + enforcement window |
| **Safety violation notice** | Violation notice was delivered to business's system | Compliance period + audit window |
| **Termination notice** | Termination notice was delivered to employee's device | Employment law retention period |
| **HOA/lease violation notice** | Violation notice was delivered to homeowner/tenant's device | Dispute/cure period |
| **Fraud alert acknowledgment** | Fraud alert was delivered to customer's device | Investigation period |

**Dual-record architecture:** Both sides retain independent evidence. The issuer has the server-side verification log (timestamp, hash, IP). The recipient has the retained claim text (in their RCS/SMS history or document) plus the cached verification result with retention headers. Years later, either party can independently demonstrate that delivery occurred and that a device in the recipient's possession engaged with the claim.

**What this evidences vs. what it doesn't:** The GET proves a device possessing the exact document text contacted the verification endpoint at a specific time. It does not prove the named recipient personally read, understood, or acted on the document. This is a strong point of evidence — analogous to signed-for postal delivery or a read receipt — but it is rebuttable. Courts will weigh it alongside other evidence.

**Relationship to witnessing:** The witnessing firm (if retained) also receives the verification event, creating a third independent record. For service of process, this means the court, the recipient, and the witness all have timestamped evidence of the delivery event.

### Pattern 5: Transaction Reference (Donate, Pay, Tip)

For use cases where verification naturally leads to an occasional one-off transaction — charitable donations, service payments, tips. Not designed for recurring payments, salaries, wages, or subscriptions.

The issuer's response provides only a **reference identifier**. The app constructs the payment URL from the authority chain's domain and payment path (declared in the authority's `verification-meta.json`), never from the issuer's response. This prevents a compromised issuer from redirecting payments.

```json
{
  "status": "verified",
  "donation_ref": "DAVE_SMITH_2026",
  "donation_prompt": "Donate to this charity?"
}
```

The payment flows through or via the regulator (Charity Commission, professional body, licensing authority), not the charity or service provider directly. This means the regulator controls the trust anchor — if registration is revoked, the authority chain breaks and no payment option is offered.

**Transaction types:**

| Type | Ref field | Routed via | Example |
|---|---|---|---|
| `donate` | `donation_ref` | Charity regulator (Charity Commission, IRS) | Street collection, sponsored event |
| `pay` | `payment_ref` | Professional body or trade regulator | Tradesperson invoice, one-off service |
| `tip` | `tip_ref` | Licensing authority (local council, tourism board) | Busker, tour guide, delivery worker |

See [Post-Verification Actions](post-verification-actions.md) for the full charitable donations flow (including Gift Aid), payment for services, and tips.

### When to Use Each Pattern

| Pattern | When Appropriate |
|---------|------------------|
| **POST form** | Power dynamic exists; verifier is alone; accountability matters (inspector at door, staff in hotel room) |
| **Verification ID** | High-stakes interaction; mutual accountability needed (law enforcement, government officials) |
| **Link only** | Robust complaint/information channels already exist (bar associations, licensing boards) |
| **Retention headers** | The act of verifying itself is the legally meaningful event; proof of receipt/acknowledgment required |
| **Transaction reference** | Occasional one-off transaction (donate, pay, tip) — app constructs URL from authority chain, not issuer |
| **None** | Simple document verification; no ongoing relationship (proof of funds, employment reference) |

## Authority Chain Verification

When an endpoint confirms a claim — "Jane Worthington works at HSBC" — the relying party knows that HSBC says so. But how does the relying party know that HSBC is a legitimate employer authorized to make that claim? The answer is an **authority chain**: the verification response includes a secondary verification link allowing the relying party to confirm that the issuer is itself a recognized authority for the type of claim being made.

### Authority Chain Headers

The issuer's verification response includes three headers that link to a higher authority:

| Header | Purpose | Example |
|--------|---------|---------|
| `X-Verify-Authority-For` | The type of claim the issuer is attesting | `employment-attestation`, `legal-practice`, `medical-practice` |
| `X-Verify-Authority-Attested-By` | URL of a secondary verification endpoint where a higher authority confirms the issuer's legitimacy | `https://employers.hmrc.gov.uk/v/{hash}` |
| `X-Verify-Authority-Scope` | The specific capacity in which the issuer is recognized by the higher authority | `paye-registered-employer`, `sra-regulated-firm`, `gmc-registered-practitioner` |

**Example response with authority chain:**

```
HTTP/1.1 200 OK
Content-Type: application/json
X-Verify-Status: verified
X-Verify-Authority-For: employment-attestation
X-Verify-Authority-Attested-By: https://employers.hmrc.gov.uk/v/{hash}
X-Verify-Authority-Scope: paye-registered-employer

{
  "status": "verified"
}
```

The relying party's system can optionally follow the chain by performing a GET against the `X-Verify-Authority-Attested-By` URL. That secondary endpoint confirms that the primary issuer is a recognized authority — and may itself include authority chain headers pointing to a tertiary authority.

### Chain Traversal

Each link in the chain is a standard Live Verify GET request. The secondary endpoint responds with its own status and may include its own authority chain headers:

**Step 1 — Primary verification:**
```
GET https://hr.hsbc.co.uk/v/a3f2b8c9...
→ 200 OK
→ X-Verify-Authority-Attested-By: https://employers.hmrc.gov.uk/v/b4c5d6e7...
```
HSBC confirms the employment claim.

**Step 2 — Secondary verification:**
```
GET https://employers.hmrc.gov.uk/v/b4c5d6e7...
→ 200 OK
→ X-Verify-Authority-Scope: paye-registered-employer
```
HMRC confirms HSBC is a registered PAYE employer. No further `X-Verify-Authority-Attested-By` header — the chain terminates here because HMRC is a statutory authority established by act of Parliament.

### Chain Termination: The Three-Level Maximum

Authority chains have a **maximum depth of three levels**:

| Level | Role | Example |
|-------|------|---------|
| **Primary** | Issuer attests the claim | HSBC says Jane works here |
| **Secondary** | Regulator attests the issuer | FCA says HSBC is authorized |
| **Tertiary** | Sovereign jurisdiction | UK Parliament established the FCA |

The chain always terminates at a **root authority** — an entity whose legitimacy is axiomatic rather than attested by another verification endpoint. There are two types of root authority:

**Sovereign legislative jurisdictions** — the ~190-195 nations whose authority derives from sovereignty itself. The Bank of England does not need a supranational body to confirm it is a legitimate central bank — Parliament says so. The IRS does not need external confirmation that it collects taxes — Congress says so.

**Treaty-based international organizations** — a finite set of organizations whose authority derives from multilateral treaty rather than from any single national legislature. A WHO staffer deployed to a regional office is not acting on behalf of Switzerland (WHO's host country) — they act under the WHO Constitution, ratified by 194 member states. A UN peacekeeper does not represent the US or France — they represent the Security Council under the UN Charter. These organizations are root authorities in their own right.

| Root Type | Examples | Basis |
|-----------|---------|-------|
| **Sovereign** | UK Parliament, US Congress, Bundestag | National sovereignty |
| **Treaty-based** | UN (Charter, 1945), WHO (Constitution, 1948), World Bank / IMF (Bretton Woods, 1944), ICC (Rome Statute, 1998), IAEA (Statute, 1957) | Multilateral treaty ratified by member states |

**Why three, not four?** Every chain traces back to either a national legislature or an international treaty — and that is where it stops. There is no authority above sovereignty or above the treaty system that established the organization. The three-level model accommodates both:

- **National chain:** Issuer → national regulator → sovereign legislature
- **International chain:** Field office/mission → organization HQ → founding treaty

**Client implementation:** Clients should traverse a maximum of 3 levels. If a fourth `X-Verify-Authority-Attested-By` header appears, it is an error or misconfiguration — not a deeper chain to follow. The tertiary level must resolve to a recognized root authority.

**Root authority list:** Verifier apps should hard-code two lists:

1. **Sovereign jurisdictions** (~190-195) — UN member states plus a small number of others with independent legal systems
2. **Treaty-based international organizations** (~20-30) — organizations established by multilateral treaty with operational authority over personnel and missions

These lists are the trust anchors — analogous to browser root certificate stores, but for legislative and treaty authority rather than cryptographic identity. Updated annually at most.

Common root authorities by type:

| Type | Root Authorities | Basis |
|------|-----------------|-------|
| **UK** | HMRC (tax/employment), GMC (medical), Legal Services Board (legal), FCA (financial) | Acts of Parliament |
| **US** | IRS (tax/employment), state licensing boards, SEC, FDIC, state regulators | Federal/state statute |
| **EU member states** | National tax authorities, national professional regulators | National law (and EU directives transposed into national law) |
| **Australia** | ATO (tax), AHPRA (health), ASIC (corporate) | Acts of Parliament |
| **Canada** | CRA (tax), provincial law societies (legal), provincial colleges (medical) | Federal/provincial statute |
| **Treaty-based** | UN Secretariat, WHO, World Bank, IMF, ICC, IAEA, UNHCR, ICRC | Founding treaties / Geneva Conventions |

### Worked Examples

Most chains are **two levels** — the secondary authority is itself a statutory body (HMRC, GMC, IRS), so the chain terminates there. Three-level chains occur when there is a delegated regulatory structure (e.g., the SRA is regulated by the Legal Services Board, which is established by statute).

**UK Employer → HMRC (two levels):**

| Step | Endpoint | Confirms | Authority Header |
| :--- | :--- | :--- | :--- |
| Primary | `hr.hsbc.co.uk/v` | Jane Worthington is VP, Global Markets | `X-Verify-Authority-Attested-By: https://employers.hmrc.gov.uk/v/{hash}` |
| Secondary | `employers.hmrc.gov.uk/v/{hash}` | HSBC Holdings plc is a registered PAYE employer | *(statutory root — chain terminates)* |

**UK Solicitor → SRA → Legal Services Board (three levels — delegated regulation):**

| Step | Endpoint | Confirms | Authority Header |
| :--- | :--- | :--- | :--- |
| Primary | `members.smithandco.co.uk/v` | Sarah Chen is a practising solicitor | `X-Verify-Authority-Attested-By: https://sra.org.uk/v/{hash}` |
| Secondary | `sra.org.uk/v/{hash}` | Smith & Co is SRA-regulated; Sarah Chen holds a current practising certificate | `X-Verify-Authority-Attested-By: https://legalservicesboard.org.uk/v/{hash}` |
| Tertiary | `legalservicesboard.org.uk/v/{hash}` | The SRA is an approved regulator under the Legal Services Act 2007 | *(statutory root — chain terminates)* |

**Doctor → GMC (two levels):**

| Step | Endpoint | Confirms | Authority Header |
| :--- | :--- | :--- | :--- |
| Primary | `staff.royalfree.nhs.uk/v` | Dr. Patel is a Consultant Cardiologist | `X-Verify-Authority-Attested-By: https://gmc-uk.org/v/{hash}` |
| Secondary | `gmc-uk.org/v/{hash}` | Dr. Patel holds GMC registration, licence to practise, specialist register entry | *(statutory root — GMC established by Medical Act 1983)* |

**US Bank Employee → IRS (two levels):**

| Step | Endpoint | Confirms | Authority Header |
| :--- | :--- | :--- | :--- |
| Primary | `hr.jpmorgan.com/v` | John Smith, Associate, Investment Banking | `X-Verify-Authority-Attested-By: https://employers.irs.gov/v/{hash}` |
| Secondary | `employers.irs.gov/v/{hash}` | JPMorgan Chase & Co is a registered employer, EIN 13-2624428 | *(statutory root — IRS)* |

**WHO Staffer → WHO HQ (two levels, treaty-based root):**

| Step | Endpoint | Confirms | Authority Header |
| :--- | :--- | :--- | :--- |
| Primary | `afro.who.int/v` | Dr. Amara Diallo, Health Policy Adviser, WHO AFRO Regional Office | `X-Verify-Authority-Attested-By: https://who.int/v/{hash}` |
| Secondary | `who.int/v/{hash}` | WHO confirms Dr. Diallo is current staff | *(treaty root — WHO Constitution, 1948)* |

**UN Peacekeeper → UN DPKO (two levels, treaty-based root):**

| Step | Endpoint | Confirms | Authority Header |
| :--- | :--- | :--- | :--- |
| Primary | `minusma.unmissions.org/v` | Major Carlos Reyes, Military Observer, MINUSMA | `X-Verify-Authority-Attested-By: https://peacekeeping.un.org/v/{hash}` |
| Secondary | `peacekeeping.un.org/v/{hash}` | UN Department of Peace Operations confirms deployment under Security Council Resolution 2640 | *(treaty root — UN Charter, 1945)* |

### Absence of Authority Chain

If a verification response includes no `X-Verify-Authority-Attested-By` header and the issuer is not a recognized root authority, the claim is **self-attested only** — no government or regulatory body has confirmed the issuer's legitimacy for the type of claim being made.

The claim may still be genuine. A newly registered company, a foreign employer not yet in the local registry, or an issuer in a jurisdiction that hasn't adopted authority chain verification would all produce valid primary verifications with no secondary attestation.

**What the absence signals:**

| Scenario | Authority Chain Present? | Interpretation |
|----------|------------------------|----------------|
| `hr.hsbc.co.uk` confirms employment | Yes — HMRC attests | High confidence: employer is real, government-verified |
| `hr.acme-corp.example.com` confirms employment | No | Self-attested only: may be genuine, but warrants additional scrutiny |
| `gmc-uk.org` confirms medical registration | No (root authority) | Highest confidence: statutory authority, chain terminates by design |

**Client handling:** Verifier apps should display the authority chain status clearly — e.g., a "verified by [authority]" badge when the chain is present, or an "issuer self-attested" indicator when it's absent. The absence is not an error; it's a signal for the relying party to calibrate their trust accordingly.

### Client Traversal Behavior

Authority chain traversal is **optional and progressive**. The relying party chooses how deep to verify based on their risk tolerance, up to the three-level maximum:

| Use Case | Typical Depth | Rationale |
|----------|--------------|-----------|
| Immigration counter | Primary + secondary | Officer needs to know the employer is real |
| Landlord tenant check | Primary only | Low-stakes; employment confirmation is sufficient |
| Court accepting solicitor credentials | Full chain (all 3 levels) | High-stakes; court needs to know the firm is regulated |
| Bank KYC | Primary + secondary | Regulatory obligation to verify source of funds |

Clients should cache secondary/tertiary verification results aggressively — an employer's registration status with HMRC changes far less frequently than an individual employee's status. In practice, the sovereign jurisdiction list is static (updated annually at most), secondary authority statuses change on the order of months or years, and only primary claims change frequently.

### Security Considerations

**Chain spoofing:** An issuer could include a fake `X-Verify-Authority-Attested-By` URL pointing to a server they control. The relying party mitigates this by checking that the secondary authority's domain is a known, trusted authority for the claimed scope. A fake HMRC endpoint at `hmrc.scammer.com` is not `hmrc.gov.uk`. Domain authenticity is verified by TLS certificates, the same trust model as the rest of the web.

**Chain availability:** If the secondary authority's endpoint is temporarily unavailable, the primary verification still stands — the relying party simply cannot confirm the issuer's authority at that moment. This is a degradation, not a failure. The relying party may choose to accept the primary verification with a note that authority chain verification was unavailable.

**Hash independence:** The hash in the `X-Verify-Authority-Attested-By` URL is distinct from the primary claim's hash. It represents the secondary authority's attestation of the issuer (e.g., "HSBC is a PAYE employer"), not the individual claim (e.g., "Jane works at HSBC"). This means one secondary verification can cover all claims from that issuer, and the secondary authority doesn't need to know about individual employees.

### Endorsement via verification-meta.json (`authorizedBy`)

The Authority Chain Headers above are **dynamic** — returned in the HTTP response from the verification endpoint. For simpler deployments (especially static-file hosting where custom headers aren't possible), issuers can declare their endorsing authority **statically** in `verification-meta.json` using the `authorizedBy` field.

The key difference from `parentAuthorities` (which are passive URL links for human browsing): `authorizedBy` is itself a **verifiable claim** — the endorser's attestation of the issuer can be checked via the same `verify:` protocol.

`authorizedBy` is a **base URL string** — just like the domain in a `verify:` line. The endorser's identity IS the domain; no human-readable name is provided (a trickster could fake that). The verifier reads the domain and decides whether to trust it, exactly as they do for the primary verification.

#### Merkle Commitment

The endorser hashes the issuer's **entire** `verification-meta.json` file, not just the domain. This is a merkle commitment — the endorser attests to the exact content of the issuer's self-description (description, claimType, date bounds, everything). Any change to the issuer's file invalidates the hash and requires re-endorsement.

**Canonicalization:** The client canonicalizes the JSON via `JSON.stringify(JSON.parse(raw))`. JavaScript preserves insertion order for string keys, so parse+re-stringify eliminates whitespace/formatting differences while keeping key order stable. This is simpler than RFC 8785 (JCS) and sufficient since the issuer controls their own JSON.

#### Date Bounds

`authorizedFrom` and `authorizedTo` fields in the issuer's `verification-meta.json` define the endorsement validity period. These dates are pinned by the merkle hash — the issuer cannot change them without breaking the endorsement.

#### Successor Mechanism

When an endorser is sunsetting, the issuer declares a `successor` field pointing to the replacement endorser. Clients display the successor to guide users when an endorsement has expired.

```json
{
  "issuer": "Unseen University",
  "claimType": "Academic certification",
  "authorizedBy": "gov.uk/verifiers",
  "authorizedFrom": "2023-01-01",
  "authorizedTo": "2028-12-31"
}
```

**How it works:**

1. Client fetches `verification-meta.json` and finds `authorizedBy` (a base URL string, e.g., `"gov.uk/verifiers"`)
2. Client checks date bounds (`authorizedFrom`/`authorizedTo`) — if outside bounds, show expired (with `successor` if available)
3. Client fetches the raw `verification-meta.json` bytes and canonicalizes: `JSON.stringify(JSON.parse(raw))`
4. Client computes SHA-256 hash of the canonical JSON
5. Client performs a `verify:` lookup: `https://gov.uk/verifiers/{meta-hash}`
6. If the endorser's endpoint returns `{"status":"verified"}`, the endorsement is confirmed — display "Endorsed by **gov.uk**"
7. If the endorser's endpoint returns `404`, the endorsement is **unconfirmed** — display "Endorsement by gov.uk — not confirmed"

#### Chain Walking

After confirming the primary endorsement, the client fetches the endorser's own `verification-meta.json` to read its `description` field (e.g., "Architects Registration Board") and check whether it declares its own `authorizedBy`. If so, the client recurses (max depth 3 levels), building a chain:

```
Endorsed by arb.org.uk (Architects Registration Board)
  Endorsed by gov.uk (UK Government)
```

The endorser's identity is the domain from the URL (e.g., `gov.uk`). The verifier decides whether `gov.uk` is a trustworthy endorser for this type of claim — just as they decide whether the primary issuer's domain is trustworthy.

**Relationship to Authority Chain Headers:**

| Mechanism | Where Declared | When Available | Use Case |
|-----------|---------------|----------------|----------|
| `parentAuthorities` | `verification-meta.json` | Before verification | Passive URL links for human browsing (e.g., Wikipedia, accreditor website) |
| `authorizedBy` | `verification-meta.json` | Before verification | Verifiable endorsement — base URL, checkable via `verify:` protocol, merkle-committed |
| `X-Verify-Authority-*` | HTTP response headers | After verification | Dynamic authority chain from the verification endpoint itself |

All three can coexist. `parentAuthorities` provides context, `authorizedBy` provides a checkable pre-declared endorsement (pinned by merkle hash), and `X-Verify-Authority-*` headers provide the strongest proof (returned by the verification endpoint itself).

**Example: Missing endorsement (demo)**

The Live Verify demo uses `"authorizedBy": "gov.uk/verifiers"` for the fictional Unseen University. The endorsement lookup returns `404` — `gov.uk` does not recognize this issuer's verification-meta.json hash. Client apps display: "Endorsement by **gov.uk** — not confirmed".

This demonstrates the designed behavior: an issuer can *claim* endorsement by any domain, but the verifier independently checks. A fraudulent issuer claiming `"authorizedBy": "gov.uk/verifiers"` would be caught when `gov.uk`'s endpoint returns `404`.

## Privacy Tiers in Responses

For identity credentials (badges), endpoints may vary what **actionable context** they return:

| Privacy Level  | Response Contains      | Example Use Case                        |
|----------------|------------------------|-----------------------------------------|
| **Minimal**    | `status` only          | Undercover officers, witness protection |
| **Standard**   | `status` + `photo_url` | Most identity credentials               |

Note: Even "full disclosure" scenarios don't echo document content—the verifier already has that. The question is whether to include a photo URL for visual confirmation.

See [E-Ink ID Cards: Privacy Tiers](../public/use-cases/e-ink-id-cards.md#privacy-tiers-stakes-and-risk) for guidance on when each tier is appropriate.

## Client Response Handling

All verification responses are JSON.

```
HTTP/1.1 200 OK
Content-Type: application/json

{ "status": "verified", ... }
```

Client handling:

1. Parse JSON
2. Check `status` field
3. If `status === "verified"` → show localized-to-user "Verified" + any additional fields
4. If `status !== "verified"` → show the status value (and optional `message` field if present)

### Client Pseudocode

```javascript
const body = await response.text();
const json = JSON.parse(body);

if (json.status === "verified") {
  showVerified(json);  // Green + localized "Verified" + actionable context
} else {
  showFailed(json.status, json.message);  // Red + status string
}
```

### Response Decision Tree

```
HTTP 200 OK received
└─> Read body as text
    └─> Trim whitespace
        ├─> Exact match "OK"? → ✅ VERIFIED
        ├─> Try parse as JSON
        │   ├─> JSON valid?
        │   │   ├─> status === "OK" or "VERIFIED"? → ✅ VERIFIED
        │   │   └─> Other status → ❌ Show status (use message if available)
        │   └─> JSON parse failed
        │       └─> Treat as plain text status → ❌ Show status
        └─> Empty body → ❌ FAILS VERIFICATION (no status)
```

### Internationalization

Success localization is handled by the client — `"verified"` is a machine-readable status, and the client translates it to the user's language ("Verified", "Vérifié", "Verificado", etc.). Failure messages may include a human-readable `message` field from the issuer, which may be in the issuer's local language.

## CORS and Security

Verification endpoints **must** serve open CORS headers on all GET and OPTIONS responses:

```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, OPTIONS
```

This is a **specification requirement**. Without these headers, browser-based verifiers — including the `<verified-cv>` web component and any web-hosted verification tool — silently fail on cross-origin requests. An endpoint without CORS headers is a broken endpoint.

CORS `*` does not weaken server-side defenses. Rate limiting (per-IP, per-ASN), WAF/Cloudflare, geographic restrictions, and throttling all operate independently of the CORS header. The header means "browsers are allowed to read the response" — nothing more.

### Why Open CORS Is Required

**Not all clients need CORS:**

| Client Type              | CORS Needed?                             |
|--------------------------|------------------------------------------|
| Native mobile app        | No                                       |
| Browser extension        | No (uses `host_permissions` in manifest) |
| PWA / web-based verifier | Yes                                      |
| Server-side proxy        | No                                       |

However, enabling open CORS ensures **anyone can build a verification tool**—no gatekeeping on who can verify documents.

**The hash is the access control:**

To query a verification endpoint, you need the SHA-256 hash. To have the hash, you must have:
- The original electronic document, or
- A photograph/scan/print of it

If someone already has the document (or photographed it), returning `verified` or `revoked` doesn't leak new information. 
The hash itself is the credential—CORS doesn't expand the attack surface, 
nor can the original document be reverse engineered from the hash.

**Enumeration attacks:**

Could an attacker brute-force hashes via browser? Theoretically, but:
- SHA-256 has 2^256 possible values—random guessing is futile
- Rate limiting (see below) blocks automated enumeration
- The attacker gains nothing without knowing what document a hash represents

### Static Hosting CORS Defaults

Not all static hosts serve CORS headers by default:

| Host | CORS by default? | Configuration needed |
|------|-------------------|---------------------|
| **GitHub Pages** | Yes | None — serves `Access-Control-Allow-Origin: *` on all responses |
| **Netlify** | No | Add a `_headers` file with `Access-Control-Allow-Origin: *` or configure in `netlify.toml` |
| **Cloudflare Pages** | No | Add a `_headers` file |
| **Vercel** | No | Add a `vercel.json` with headers config |

For Netlify, the simplest fix is a `_headers` file in the site root:

```
/*
  Access-Control-Allow-Origin: *
```

One line of config. But issuers who skip it will have broken endpoints for browser-based verifiers.

### When Issuers Might Restrict CORS

Some issuers may have legitimate reasons to limit which apps can verify:

- **Corporate control:** "Only our official app verifies our documents" - still very hard to get right.
- **Audit requirements:** "We need to know who is verifying"
- **Contractual obligations:** "Verification is part of a paid service"

This is an issuer choice. However, restricting CORS reduces the public good value of verification—a document that can only be verified by one app is less trustworthy than one anyone can verify.

### Requirement

Open CORS is the specification default. Issuers who restrict it are opting out of browser-based verification — their endpoints will only work with native apps, browser extensions, and server-side proxies. This reduces the public good value of verification and is strongly discouraged.

## Caching

Responses may include cache headers, but verifiers should generally make fresh requests:

```
Cache-Control: no-cache, must-revalidate
```

For rotating-salt credentials (e-ink badges), responses are inherently non-cacheable as the salt changes frequently.

For static credentials, short caching (e.g., 60 seconds) may be acceptable but risks serving stale revocation status.

## Consolidated Field Reference

Every field that may appear in a verification response body (JSON) or HTTP headers, in one table.

### JSON Body Fields

| Field | Type | Required | Pattern | Description |
|-------|------|----------|---------|-------------|
| `schemaVersion` | integer | No (implies 1) | All | Schema version for forward compatibility |
| `status` | string | **Yes** | All | Verification result: `verified`, `revoked`, `expired`, `suspended`, `superseded`, or domain-specific |
| `message` | string | No | All | Human-readable explanation — guidance on success, reason on failure |
| `photo_url` | string (URL) | No | Identity credentials | Photo for visual confirmation; relative or absolute URL; hash-based filenames, no-cache headers |
| `current_destination` | string | No | Delivery workers | Dynamic location the worker should be at — verifier compares to their own address |
| `follow_up_url` | string (URL) | No | Accountability (Pattern 1) | URL for verifier to optionally record the interaction |
| `follow_up_prompt` | string | No | Accountability (Pattern 1) | Human-readable prompt explaining what the follow-up form is for |
| `verification_id` | string | No | Accountability (Pattern 2) | Unique ID for the verification event — creates mutual accountability |
| `complaint_url` | string (URL) | No | Accountability (Pattern 2) | One-click complaint path pre-filled with verification ID |
| `more_info` | string (URL) | No | Registry link (Pattern 3) | Link to existing public registry profile (bar association, licensing board) |
| `donation_ref` | string | No | Transaction (Pattern 5) | Reference passed to the regulator's payment URL — ties the payment to a campaign or individual |
| `donation_prefix` | string (URL path) | No | Transaction (Pattern 5) | Path on the authority domain for the payment flow (e.g., `/donate`) |
| `donation_prompt` | string | No | Transaction (Pattern 5) | Human-readable prompt (e.g., "Donate to this charity?") |
| `payment_url` | string (URL) | No | Transaction (Pattern 5) | Direct payment URL for service payments and tips — routed via tax authority or licensing body |
| `payment_prompt` | string | No | Transaction (Pattern 5) | Human-readable prompt (e.g., "Pay this invoice?") |
| `payment_amount` | string | No | Transaction (Pattern 5) | Pre-filled amount (e.g., "840.00") |
| `payment_currency` | string | No | Transaction (Pattern 5) | ISO 4217 currency code (e.g., "GBP", "USD") |
| `tip_url` | string (URL) | No | Transaction (Pattern 5) | Tip/gratuity URL — routed via licensing authority |
| `tip_prompt` | string | No | Transaction (Pattern 5) | Human-readable prompt (e.g., "Tip this performer?") |
| `error` | string | No | Error responses | Machine-readable error code (`MALFORMED_HASH`, `RATE_LIMITED`, `ISSUER_UNAVAILABLE`) |
| `retry_after` | integer | No | 429 responses | Seconds to wait before retrying |

### HTTP Response Headers

| Header | Required | Pattern | Description |
|--------|----------|---------|-------------|
| `Access-Control-Allow-Origin: *` | **Yes** | All | CORS — specification requirement for browser-based verifiers |
| `Access-Control-Allow-Methods: GET, OPTIONS` | **Yes** | All | CORS methods |
| `X-Verify-Authority-For` | No | Authority chain | Claim type the issuer is authorized to make |
| `X-Verify-Authority-Attested-By` | No | Authority chain | URL of higher authority's verification endpoint |
| `X-Verify-Authority-Scope` | No | Authority chain | Specific capacity in which the issuer is recognized |
| `X-Verify-Retain-Until` | No | Retention (Pattern 4) | ISO 8601 datetime — how long the recipient should preserve the result |
| `X-Verify-Retain-Reason` | No | Retention (Pattern 4) | Machine-readable reason code (`service-of-process`, `loan-disclosure`, `informed-consent`) |
| `X-Verify-Retain-Reason-Further-Details` | No | Retention (Pattern 4) | URL to human-readable explanation of why retention is requested |
| `X-Verify-Case-Ref` | No | Retention (Pattern 4) | Reference identifier linking to the underlying legal/business matter |
| `Cache-Control` | No | All | Caching guidance; `no-cache, must-revalidate` for most use cases |

### `verification-meta.json` Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `schemaVersion` | integer | No (implies 1) | Schema version for forward compatibility |
| `issuer` | string | No | Human-readable issuer name (legacy; prefer `formalName`) |
| `formalName` | string | No | Official legal name — shown on hover/tap in authority chain display |
| `description` | string | No | What this domain does — shown inline in authority chain display and CV rendering |
| `descriptions` | object | No | Per-path descriptions: `{"/refs/": "Select peer references"}` — most specific prefix wins |
| `logo` | string (URL) | No | Issuer's logo for rendered display |
| `url` | string (URL) | No | Issuer's website (for personal domains, peer references) |
| `industry` | string | No | Issuer's industry sector |
| `claimType` | string | No | Type of claims this endpoint verifies |
| `authorityBasis` | string | No | Statute, license, or accreditation underpinning the issuer's authority |
| `authorizedBy` | string (base URL) | No | Endorsing authority — verifiable via the `verify:` protocol (merkle-committed) |
| `authorizedFrom` | string (date) | No | Start of endorsement validity period |
| `authorizedTo` | string (date) | No | End of endorsement validity period |
| `parentAuthorities` | array of URLs | No | Passive links for human browsing (Wikipedia, accreditor website) |
| `responseTypes` | object | No | Maps status strings to `{class, text, link}` for client display |
| `retentionLaws` | array of objects | No | Jurisdiction-specific data retention rules: `{jurisdiction, law, link, summary}` |
| `delegateTo` | string (base URL) | No | SaaS provider handling verification on behalf of this domain |
| `successor` | string (base URL) | No | Replacement endorser when current endorsement is sunsetting |

## Best Practices

1. **Keep it simple:** Plain text `"OK"` is sufficient for most use cases
2. **Minimal responses:** Just return the status - avoid including detailed metadata (dates, reasons, case numbers)
3. **Privacy first:** Don't disclose sensitive information in public verification responses
4. **Short status codes:** Keep statuses ≤50 chars for mobile display
5. **CORS headers:** Enable CORS for verification endpoints (public data)
6. **Cache headers:** Use appropriate cache headers (immutable hashes can be cached forever)
7. **Response time:** Aim for <100ms response time (static files are ideal)

## Anti-Patterns

❌ **Don't use HTTP status codes for verification status:**
```
200 OK → Verified
403 Forbidden → Revoked
410 Gone → Expired
```
Use 200 OK with body content instead. 404 is reserved for "hash not found".

❌ **Don't include hash in response body:**
```json
{
  "status": "OK",
  "hash": "1cddfbb2..."  // Redundant - hash is in URL
}
```

❌ **Don't use `contains()` check for "OK":**
```
// Bad: "REVOKED" contains "OK" substring
body.includes("OK")  // ❌

// Good: Exact match
body.trim() === "OK"  // ✅
```

❌ **Don't include detailed revocation information:**
```json
{
  "status": "REVOKED",
  "revokedDate": "2024-06-15",
  "reason": "Malpractice finding",
  "caseNumber": "2024-ML-4291",
  "boardDecisionUrl": "https://medicalboard.gov/decisions/2024-ML-4291"
}
```
This exposes private disciplinary details. Just return `{"status": "REVOKED"}` and direct inquiries to official channels.

## Character Encoding

Always use `UTF-8` encoding. The SHA-256 hash is computed from UTF-8 bytes of the normalized text.

## Example: Full Response Lifecycle

**Request:**
```
GET https://lawsociety.org.uk/v/a3f2b8c9d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1
```

**Success Response:**
```json
HTTP/1.1 200 OK
Content-Type: application/json

{
  "status": "verified"
}
```

The verifier already has the solicitor's certificate showing name, license number, firm, admission date. The endpoint just confirms it's authentic.

**Failure Response:**
```json
HTTP/1.1 200 OK
Content-Type: application/json

{
  "status": "suspended",
  "message": "License suspended pending disciplinary hearing"
}
```

The `message` explains *why* verification failed—information the verifier wouldn't otherwise have.

**Not Found Response:**
```json
HTTP/1.1 404 Not Found
Content-Type: application/json

{
  "status": "not_found",
  "message": "No document matches this hash"
}
```

Of course, 404 responses from a web server/app may have no content/payload at all, and that's valid too.

### Note: Static File Hosting (GitHub Pages)

On GitHub Pages, a verification hash like `https://live-verify.github.io/live-verify/c/1cddfbb2adfa13e4562d274b59e56b946f174a0feb566622dd67a4880cf0b223` is really served from an `index.html` file at that path with a `text/html` MIME type — but the body content is just plain text `OK`. This works because the client reads the body as text regardless of MIME type.
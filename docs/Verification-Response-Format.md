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
- **Status** — Is this document authentic and current? (`OK`, `REVOKED`, `EXPIRED`)
- **Actionable context** — Information the verifier needs but doesn't have (see below)

## The Simple Case: Plain Text OK

For the simplest verification scenarios, an endpoint may return:

```
HTTP/1.1 200 OK
Content-Type: text/plain

OK
```

This is sufficient when:
- The verifier only needs to know "is this authentic?"
- No additional context improves the verification
- The document type doesn't have meaningful status variations

The verifier app checks: `status === 200 && body.includes('OK')` → show green "VERIFIED".

## Standard JSON Response

For verification scenarios that need more than `OK`, endpoints return JSON:

```json
{
  "status": "OK"
}
```

That's it for most cases. The document itself contains all the content; the endpoint just confirms it's authentic.

### Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `status` | string | **Required.** The verification result. See [Status Codes](#status-codes). |

### Actionable Context (Not Content Echo)

Some scenarios benefit from **actionable context**—information the verifier needs but doesn't have from the document itself:

| Field | When Appropriate | Why It's Not Echo |
|-------|------------------|-------------------|
| `photo_url` | Identity credentials (badges) | Verifier compares to person in front of them |
| `current_destination` | Delivery workers | Dynamic; confirms driver is at right address |
| `message` | Any failure status | Human-readable explanation of why verification failed |

### Photo URL Security

If returning a `photo_url`, it should:

1. **Use hash-based filenames** — Not `/photos/1332.jpg` (enumerable), but `/photos/a3f2b8c9d4e5...jpg` (requires knowing the hash)
2. **Include no-cache headers** — Prevent browsers/proxies from retaining photos after the credential is revoked
3. **Optionally be time-limited** — URL could include a short-lived token, expiring after the verification session

**Examples:**
```json
{
  "status": "OK",
  "photo_url": "/photos/{hash}}.jpg"
}
```

```json
{
  "status": "OK",
  "photo_url": "/{hash}.jpg"
}
```

Relative paths are preferred—the client already knows the issuer domain from the verification URL. The client resolves `/photos/{hash}.jpg` against the same domain it just queried.

Full URLs are also valid if the photo is hosted elsewhere:
```json
{
  "status": "OK",
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

**Example: Delivery Worker (actionable context)**
```json
{
  "status": "OK",
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
  "status": "OK",
  "photo_url": "https://officers.police.uk/photos/7b6aa80ef223f4da8fc00f81b77ff0afa7686f6454836a6bd9489f62e8e3a1fa.jpg"
}
```

The citizen can compare the photo to the officer. They don't need the endpoint to tell them the officer's name or badge number—that's on the warrant card they just scanned.

**Example: Financial Document (status only)**
```json
{
  "status": "OK"
}
```

The bank confirms the proof-of-funds letter is authentic. The verifier already has the letter with the amount, date, and account holder name.

**Example: Success with guidance**
```json
{
  "status": "OK",
  "message": "Licensed MD in Texas — compare photo to confirm identity",
  "photo_url": "/photo/a3f2b8c9d4e5f6a7"
}
```

`status: "OK"` is the machine-readable verdict. The `message` provides human-readable guidance—what the verifier should do next.

**Example: Failure with explanation**
```json
{
  "status": "SUSPENDED",
  "message": "License suspended pending disciplinary hearing"
}
```

For failures, `message` explains *why* verification failed—context the verifier wouldn't otherwise have.

## Status Codes

### Universal Statuses

| Status       | Meaning                                           | Verifier Action                                     |
|--------------|---------------------------------------------------|-----------------------------------------------------|
| `OK`         | Document is authentic and current                 | Show green "VERIFIED"                               |
| `EXPIRED`    | Document was valid but has passed its expiry date | Show amber warning; request fresh document          |
| `REVOKED`    | Document was explicitly invalidated by issuer     | Show red "REVOKED"; do not trust                    |
| `SUPERSEDED` | A newer version of this document exists           | Show amber; request updated document                |
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
4. **No false positives:** Never return `OK` unless the document is genuinely valid

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

## Post-Verification Actions

Some use cases benefit from **post-verification actions**—optional follow-up the verifier can take after confirming authenticity. These are returned as part of the response.

### Pattern 1: Follow-Up Form for Recording

For scenarios with power dynamics or accountability needs, the response can include a URL for the verifier to optionally record the interaction:

```json
{
  "status": "OK",
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
  "status": "OK",
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
  "status": "OK",
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
  "status": "ACTIVE_CALL",
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
X-Verify-Status: OK
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
X-Verify-Status: ACTIVE_CALL
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

### When to Use Each Pattern

| Pattern | When Appropriate |
|---------|------------------|
| **POST form** | Power dynamic exists; verifier is alone; accountability matters (inspector at door, staff in hotel room) |
| **Verification ID** | High-stakes interaction; mutual accountability needed (law enforcement, government officials) |
| **Link only** | Robust complaint/information channels already exist (bar associations, licensing boards) |
| **Retention headers** | The act of verifying itself is the legally meaningful event; proof of receipt/acknowledgment required |
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
X-Verify-Status: OK
X-Verify-Authority-For: employment-attestation
X-Verify-Authority-Attested-By: https://employers.hmrc.gov.uk/v/{hash}
X-Verify-Authority-Scope: paye-registered-employer

{
  "status": "OK"
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

### Endorsement via verification-meta.json (`endorsedBy`)

The Authority Chain Headers above are **dynamic** — returned in the HTTP response from the verification endpoint. For simpler deployments (especially static-file hosting where custom headers aren't possible), issuers can declare their endorsing authority **statically** in `verification-meta.json` using the `endorsedBy` field.

The key difference from `parentAuthorities` (which are passive URL links for human browsing): `endorsedBy` is itself a **verifiable claim** — the endorser's attestation of the issuer can be checked via the same `verify:` protocol.

```json
{
  "issuer": "Unseen University",
  "claimType": "Academic certification",
  "endorsedBy": {
    "endorser": "Ministry of Magic, Ankh-Morpork",
    "verifyUrl": "verify:gov.uk/verifiers",
    "claimType": "accredited-academic-institution",
    "description": "The Ministry of Magic recognizes Unseen University as an accredited degree-granting institution"
  }
}
```

**Fields:**

| Field | Type | Description |
|-------|------|-------------|
| `endorser` | string | **Required.** Human-readable name of the endorsing authority |
| `verifyUrl` | string | **Required.** A `verify:` or `vfy:` URL pointing to the endorser's verification endpoint. The client hashes the issuer's identity claim and looks it up here. |
| `claimType` | string | **Optional.** The type of endorsement (e.g., `accredited-academic-institution`, `paye-registered-employer`) |
| `description` | string | **Optional.** Human-readable description of what the endorsement means |

**How it works:**

1. Client fetches `verification-meta.json` and finds `endorsedBy`
2. Client computes a hash of the issuer's identity (e.g., the issuer's domain or a canonical issuer name — implementation-defined)
3. Client performs a `verify:` lookup against `endorsedBy.verifyUrl` with that hash
4. If the endorser's endpoint returns `OK`, the endorsement is confirmed — display "Endorsed by [endorser]"
5. If the endorser's endpoint returns `404` or is unreachable, the endorsement is **unconfirmed** — display "Endorsement not confirmed" or "Endorsement missing"

**Relationship to Authority Chain Headers:**

| Mechanism | Where Declared | When Available | Use Case |
|-----------|---------------|----------------|----------|
| `parentAuthorities` | `verification-meta.json` | Before verification | Passive URL links for human browsing (e.g., Wikipedia, accreditor website) |
| `endorsedBy` | `verification-meta.json` | Before verification | Verifiable endorsement — the endorser can be checked via `verify:` protocol |
| `X-Verify-Authority-*` | HTTP response headers | After verification | Dynamic authority chain from the verification endpoint itself |

All three can coexist. `parentAuthorities` provides context, `endorsedBy` provides a checkable pre-declared endorsement, and `X-Verify-Authority-*` headers provide the strongest proof (returned by the verification endpoint itself).

**Example: Missing endorsement (demo)**

The Live Verify demo uses Unseen University (fictional) with `endorsedBy.verifyUrl` pointing to `verify:gov.uk/verifiers`. Since this is a fictional institution, the endorsement lookup returns `404` — the endorser does not recognize the issuer. Client apps display this clearly: "Endorsed by Ministry of Magic, Ankh-Morpork — **not confirmed**".

This demonstrates the designed behavior: an issuer can *claim* endorsement, but the verifier independently checks whether the endorser actually confirms it. A fraudulent issuer claiming endorsement by a real authority would be caught when the endorser's endpoint returns `404`.

## Privacy Tiers in Responses

For identity credentials (badges), endpoints may vary what **actionable context** they return:

| Privacy Level  | Response Contains      | Example Use Case                        |
|----------------|------------------------|-----------------------------------------|
| **Minimal**    | `status` only          | Undercover officers, witness protection |
| **Standard**   | `status` + `photo_url` | Most identity credentials               |

Note: Even "full disclosure" scenarios don't echo document content—the verifier already has that. The question is whether to include a photo URL for visual confirmation.

See [E-Ink ID Cards: Privacy Tiers](../public/use-cases/e-ink-id-cards.md#privacy-tiers-stakes-and-risk) for guidance on when each tier is appropriate.

## Client Response Handling

Verification endpoints may return either plain text or JSON. Client software must handle both formats gracefully—there is no content negotiation.

### Plain Text Responses

```
HTTP/1.1 200 OK
Content-Type: text/plain

OK
```

Client handling:

| Response Body    | Client Interpretation              | Display                                                                |
|------------------|------------------------------------|------------------------------------------------------------------------|
| `""` (empty)     | Verified                           | Translate to local language: "Verified", "Vérifié", "Verificado", etc. |
| `"OK"`           | Verified                           | Translate to local language, as above                                  |
| Any other string | Not verified; string is the reason | Display the string as-is (may be non-English)                          |

**Examples of non-OK plain text:**
- `EXPIRED`
- `REVOKED`
- `Licence suspendue` (French issuer)
- `Documento scaduto` (Italian issuer)
- `Not currently employed`

The client should display these strings verbatim—they are human-readable messages from the issuer explaining why verification failed.

### JSON Responses

```
HTTP/1.1 200 OK
Content-Type: application/json

{ "status": "OK", ... }
```

Client handling:

1. Parse JSON
2. Check `status` field
3. If `status === "OK"` → show localized-to-user "Verified" + any additional fields
4. If `status !== "OK"` → show the status value (and optional `message` field if present)

### Detection Logic

Client pseudocode:

```javascript
const contentType = response.headers.get('Content-Type') || '';
const body = await response.text();

if (contentType.includes('application/json')) {
  // JSON response
  const json = JSON.parse(body);
  if (json.status === "OK") {
    showVerified(json);  // Green + localized "Verified" + actionable context
  } else {
    showFailed(json.status, json.message);  // Red + status string
  }
} else {
  // Plain text response (text/plain or missing Content-Type)
  const trimmed = body.trim();
  if (trimmed === "" || trimmed === "OK") {
    showVerified();  // Green + localized "Verified"
  } else {
    showFailed(trimmed);  // Red + the literal string
  }
}
```

### Why No Content Negotiation

1. **Simpler servers:** Issuers can return whatever format is easiest for them
2. **Graceful degradation:** A minimal issuer returns `OK`; a sophisticated issuer returns rich JSON
3. **Internationalization at the right layer:** Issuers can return failure messages in their local language; clients handle success localization

## CORS and Security

Verification endpoints should enable open CORS:

```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, OPTIONS
```

### Why Open CORS Is Recommended

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

If someone already has the document (or photographed it), returning `OK` or `REVOKED` doesn't leak new information. 
The hash itself is the credential—CORS doesn't expand the attack surface, 
nor can the original document be reverse engineered from the hash.

**Enumeration attacks:**

Could an attacker brute-force hashes via browser? Theoretically, but:
- SHA-256 has 2^256 possible values—random guessing is futile
- Rate limiting (see below) blocks automated enumeration
- The attacker gains nothing without knowing what document a hash represents

### When Issuers Might Restrict CORS

Some issuers may have legitimate reasons to limit which apps can verify:

- **Corporate control:** "Only our official app verifies our documents" - still very hard to get right.
- **Audit requirements:** "We need to know who is verifying"
- **Contractual obligations:** "Verification is part of a paid service"

This is an issuer choice. However, restricting CORS reduces the public good value of verification—a document that can only be verified by one app is less trustworthy than one anyone can verify.

### Recommendation

Enable open CORS unless you have a specific reason not to. The hash already gates access; CORS restrictions add friction without adding security.

## Caching

Responses may include cache headers, but verifiers should generally make fresh requests:

```
Cache-Control: no-cache, must-revalidate
```

For rotating-salt credentials (e-ink badges), responses are inherently non-cacheable as the salt changes frequently.

For static credentials, short caching (e.g., 60 seconds) may be acceptable but risks serving stale revocation status.

## Example: Full Response Lifecycle

**Request:**
```
GET https://lawsociety.org.uk/v/a3f2b8c9d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1
```

**Success Response:**
```
HTTP/1.1 200 OK
Content-Type: text/plain

OK
```

Or with JSON:
```json
HTTP/1.1 200 OK
Content-Type: application/json

{
  "status": "OK"
}
```

The verifier already has the solicitor's certificate showing name, license number, firm, admission date. The endpoint just confirms it's authentic.

**Failure Response:**
```json
HTTP/1.1 200 OK
Content-Type: application/json

{
  "status": "SUSPENDED",
  "message": "License suspended pending disciplinary hearing"
}
```

The `message` explains *why* verification failed—information the verifier wouldn't otherwise have.

**Not Found Response:**
```json
HTTP/1.1 404 Not Found
Content-Type: application/json

{
  "status": "NOT_FOUND",
  "message": "No document matches this hash"
}
```

Of course, 404 responses from a web server/app may have no content/payload at all, and that's valid too.
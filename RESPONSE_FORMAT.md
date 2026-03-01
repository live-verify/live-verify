# Verification Response Format Standard

This document defines the standard response formats for OCR-to-hash verification endpoints.

## Overview

When a verification URL is requested (e.g., `https://domain.com/path/hash`), the server MUST return HTTP 200 with a body indicating the verification status.

## Response Formats

### 1. Plain Text Response (Simple)

**Verified in it's simplest response**
```
OK
```

Those could be `text/plain` or whatever the static server chooses for the file. That could also be from a dynamic endpoint, in which case it would be `text/plain`

**Not Verified (various statuses that may be self explanatory to the user):**
```
REVOKED
```
```
SUSPENDED
```
```
EXPIRED
```
```
CANCELLED
```

**Rules:**
- Response body is trimmed and compared as exact string match
- `"OK"` (case-sensitive, exact match) → Verification succeeds
- Any other plain text → Verification fails, status shown to user
- Keep status messages SHORT (≤50 characters will be displayed)

### 2. JSON Response (Structured)

For more complex scenarios, servers can return JSON:

**Verified:**
```json
{
  "status": "OK"
}
```

Or:
```json
{
  "status": "VERIFIED"
}
```

**Not Verified (realistic - minimal response):**
```json
{
  "status": "REVOKED"
}
```

```json
{
  "status": "SUSPENDED"
}
```

```json
{
  "status": "EXPIRED"
}
```

**Not Verified (theoretical - with optional details):**

Organizations *could* include additional fields, but in practice they rarely would due to privacy concerns, legal liability, and simplicity:

```json
{
  "status": "REVOKED",
  "message": "License revoked - contact board for details"
}
```

**Rules:**
- Client parses JSON and checks `json.status` field
- `status: "OK"` or `status: "VERIFIED"` → Verification succeeds
- Any other status → Verification fails
- Additional fields (message, dates, URLs) are theoretically possible but unlikely in practice
- Most organizations will just return the status alone
- If JSON parsing fails, treat as plain text

### 3. Custom Status Display (verification-meta.json)

Organizations can optionally define custom display text so the camera overlay speaks the customer’s language. The `text` value can be as short as “Valid ID” or as long as “Licensed R.N in Texas and states listed on nursecompact.com”.

```json
{
  "responseTypes": {
    "VERIFIED": {
      "text": "Valid ID—government domain currently attests to the card text",
      "class": "affirming"
    },
    "AWARDED": {
      "text": "Awarded—diploma verified",
      "class": "affirming"
    },
    "LICENSED": {
      "text": "Licensed R.N in Texas and states listed on Nurse Compact website https://nursecompact.com",
      "class": "affirming",
      "link": "https://nursecompact.com"
    },
    "REVOKED": {
      "text": "License revoked—contact board for details",
      "class": "not-found"
    }
  }
}
```

**Rules:**
- `text`: Display text shown to the user when the response code matches.
- `class`: `"affirming"` (green check), `"not-found"` (red X), or `"warning"` (yellow triangle).
- `link`: Optional “Learn more” URL for longer explanations.
- Falls back to the default “Claim Verified”/“Denied” text if the response code is missing.

### Real-world example
Texas has been running Operation Nightingale against fake nursing IDs; the board publishes details at https://www.bon.texas.gov/Operation_Nightingale_Main.asp.html. Use your `verification-meta.json` to return a status like `"LICENSED"` with `"text": "Licensed R.N in Texas and Nurse Compact states (see https://www.bon.texas.gov/Operation_Nightingale_Main.asp.html)"` so frontline staff see the same warning plus the trusted domain that attests to the credential.

## Response Decision Tree

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

## Examples

### Example 1: Static File (GitHub Pages)

**File:** `https://live-verify.github.io/live-verify/c/1cddfbb2adfa13e4562d274b59e56b946f174a0feb566622dd67a4880cf0b223`

**Content:**
```
OK
```

**MIME type:** `text/plain` (any MIME type works - body content is what matters)

As it happens on GitHub-Pages, example 1 is really [https://live-verify.github.io/live-verify/c/1cddfbb2adfa13e4562d274b59e56b946f174a0feb566622dd67a4880cf0b223/index.html](https://live-verify.github.io/live-verify/c/1cddfbb2adfa13e4562d274b59e56b946f174a0feb566622dd67a4880cf0b223/index.html) in order to get served and visible in a browser by a human. That has a `text/html` mime type but is really just plain text content (a hack).

### Example 2: Serverless Function (Cloudflare Workers)

**URL:** `https://degrees.ed.ac.uk/verify/abc123...`

**Response:**
```json
{
  "status": "OK"
}
```

**Important:** In practice, most responses are just:
```json
{
  "status": "OK"
}
```

Organizations *could* include verification metadata (timestamp, count), but this is rare due to:
- Privacy concerns (who's checking and when)
- Database load (tracking every verification)
- Simplicity (static files can't track counts)

**Do NOT include the original claim data** (degree type, graduate name, honors, etc.) - that information is already in the document being verified. The hash already proves the document content is authentic. The response only indicates whether the issuer still affirms that hash.

### Example 3: Revoked Medical License

**URL:** `https://medicalboard.gov/licenses/verify/xyz789...`

**Response (realistic):**
```json
{
  "status": "REVOKED"
}
```

**Display:** `❌ REVOKED by medicalboard.gov`

**Why minimal?** Medical boards typically:
- Protect privacy of disciplinary details
- Direct inquiries to official channels (phone, mail)
- Avoid legal liability from public disclosure
- Keep responses simple and uniform

### Example 4: Suspended Driver's License

**URL:** `https://dmv.state.gov/licenses/verify/dl123...`

**Response (realistic):**
```json
{
  "status": "SUSPENDED"
}
```

**Display:** `❌ SUSPENDED by dmv.state.gov`

**Why minimal?** Government agencies:
- Cannot disclose reasons without proper authorization
- Refer details to official DMV inquiries
- Uniform responses for all suspension types

## HTTP Status Codes

| HTTP Status | Meaning | Client Display |
|-------------|---------|----------------|
| `200 OK` with body `"OK"` or JSON `status: "OK"/"VERIFIED"` | Verified successfully | ✅ VERIFIED by domain.com |
| `200 OK` with other body | Verification endpoint exists but status is not OK | ❌ Status from server (REVOKED/etc.) |
| `404 Not Found` | Hash not in database | ❌ FAILS VERIFICATION - Re-frame and try again |
| `Network Error` (CORS, timeout, etc.) | Cannot reach server | ⚠️ VERIFICATION ERROR - Cannot reach server |

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

## Content-Type Headers

The client accepts any `Content-Type` for the response. Common options:

- `text/plain` - For simple `"OK"` responses
- `application/json` - For JSON responses
- `text/html` - Works but not recommended (extra bytes)

The client reads the body as text and attempts JSON parsing if the content looks like JSON.

## Character Encoding

Always use `UTF-8` encoding. The SHA-256 hash is computed from UTF-8 bytes of the normalized text.

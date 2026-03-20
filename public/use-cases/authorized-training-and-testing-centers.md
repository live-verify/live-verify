---
title: "Training Provider / Certification Center Authorizations"
category: "Professional & Occupational Licenses"
volume: "Medium"
retention: "Authorization period + 1-3 years (candidate disputes, audit trail)"
slug: "authorized-training-and-testing-centers"
verificationMode: "clip"
tags: ["training-center", "testing-center", "certification", "professional-exam", "authorized-provider", "domain-mismatch", "fraud-prevention", "pearson-vue", "comptia", "cisco", "aws"]
furtherDerivations: 1
---

## What is a Training Provider / Certification Center Authorization?

A certification body authorizes specific testing centers and training providers to deliver its exams and courses. The center displays a claim — on its website, premises signage, or booking page — that it is an authorized venue for a particular set of professional certifications.

The candidate has no practical way to verify that claim. The certification body may publish a "find a test center" directory, but candidates often arrive at a center's own website through search results or word of mouth, not through the official directory. Meanwhile, the center's assertion — "Authorized Pearson VUE Test Center" or "Official AWS Training Partner" — is trivially easy to copy onto an unauthorized site.

This matters because:

- professional certifications cost hundreds or thousands of dollars per attempt
- a certificate issued by an unauthorized center may be worthless — unrecognized by employers and the certification body itself
- fake training providers operate "boot camps" that charge full price but cannot actually deliver proctored exams or accredited courseware
- phishing sites impersonate legitimate test centers to harvest payment details and personal information
- employers and candidates cannot easily distinguish a legitimate center from one that has lost its authorization

A verifiable authorization is a short claim, issued by the certification body, naming the center and the site where the authorization applies. The candidate can verify it in place — on the center's booking page — without leaving the site or searching the certification body's directory.

## Example: Testing Center Authorization

The certification body supplies the testing center with an HTML snippet to embed on their site. The inline styling is ignored by clip mode — only the text content matters for hashing.

<div style="max-width: 480px; margin: 24px auto; background: linear-gradient(135deg, #0a1628 0%, #1a2a4a 100%); border: 1px solid #00aaff; border-radius: 8px; padding: 24px; box-shadow: 0 4px 12px rgba(0,170,255,0.2); font-family: 'Segoe UI', Arial, sans-serif;">
  <div style="display: flex; align-items: center; margin-bottom: 16px;">
    <div style="width: 40px; height: 40px; background: #00aaff; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 0.65em; color: #000; margin-right: 12px;">PV</div>
    <div style="font-size: 0.75em; color: #00aaff; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">Authorized Test Center</div>
  </div>
  <span verifiable-text="start" data-for="testcenter1"></span>
  <div style="color: #e0e0e0; font-size: 0.95em; line-height: 1.7;">
    <span style="color: #fff; font-weight: 600;">TechAcademy Birmingham</span> <span style="color: #999;">(techacademy.co.uk)</span><br>
    is an authorized Pearson VUE testing center<br>
    for <span style="color: #00aaff; font-weight: 600;">Cisco, CompTIA, and AWS</span> exams on
  </div>
  <div style="margin-top: 12px; padding-top: 10px; border-top: 1px solid #334; font-family: 'Courier New', monospace; font-size: 0.78em; color: #00aaff;">
    <span data-verify-line="testcenter1">verify:pearsonvue.com/test-centers</span>
  </div>
  <span verifiable-text="end" data-for="testcenter1"></span>
</div>

The text that clip mode sees and hashes is simply:

```
TechAcademy Birmingham (techacademy.co.uk)
is an authorized Pearson VUE testing center
for Cisco, CompTIA, and AWS exams on
verify:pearsonvue.com/test-centers
```

The certification body controls the branding. The testing center just embeds the snippet. The hash is unaffected by any styling changes.

## Example: Unauthorized Site Copies the Claim

If a scam site copies this text verbatim onto `cheapcerts-bham.com`, the hash still verifies — the text is identical. But the browser extension can detect the mismatch:

1. The claim text contains `(techacademy.co.uk)` — the extension extracts the domain in parentheses
2. The verification response includes `"allowedDomains": ["techacademy.co.uk", "*.techacademy.co.uk"]`
3. The current page is `cheapcerts-bham.com`, which matches neither

The extension shows an amber warning:

> "This testing center authorization verified, but it names techacademy.co.uk and you are on cheapcerts-bham.com."

The domain in the claim text also serves as a human-readable check — a careful candidate can see the mismatch even without the extension.

## Example: Revoked Authorization

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #7a1f1f; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;">Verification Result
═══════════════════════════════════════════════════════════════════

Status:           REVOKED
Reason:           Authorization terminated by certification body
Result:           This center is no longer authorized to deliver these exams

verify:pearsonvue.com/test-centers
</pre>
</div>

## Data Verified

Center legal name, authorized site domain, certification body, exam programs covered, authorization period, and current status.

**Document Types:**
- **Testing Center Authorization** — The primary claim: this center is authorized to deliver proctored exams for these certification programs.
- **Training Provider Accreditation** — Authorization to deliver accredited courseware and preparatory training.
- **Exam Program Addition / Removal** — Amendment to an existing authorization adding or removing specific certification programs.

**Privacy Salt:** Generally not required. Testing center authorizations are commercial claims that the center wants to be public. The certification body may salt if the authorization structure itself is commercially sensitive.

## Data Visible After Verification

Shows the issuer domain (e.g., `pearsonvue.com`, `aws.amazon.com/training`, `cisco.com`) and the current authorization status.

**Verification Response Format:**

```json
{
  "status": "verified",
  "allowedDomains": ["techacademy.co.uk", "*.techacademy.co.uk"]
}
```

The `allowedDomains` field enables browser extensions to detect domain mismatches — where a valid claim has been copied onto an unauthorized site.

**Status Indications:**
- **Authorized** — Current testing center authorization is active for these exam programs.
- **Expired** — Authorization period ended; renewal required.
- **Revoked** — Certification body has terminated the authorization.
- **Suspended** — Authorization paused pending review (e.g., proctoring compliance investigation, security incident).
- **Program Removed** — Center is still authorized for other exam programs but not this one.
- **404** — No such authorization was issued by the claimed certification body.

## Second-Party Use

The **candidate** benefits directly.

**Pre-booking confidence:** Before paying several hundred dollars for an exam sitting, the candidate can verify that the center is genuinely authorized by the certification body, not just claiming to be.

**Certificate validity assurance:** A certificate earned at an unauthorized center may not be recognized by the certification body. Verified authorization gives the candidate evidence that the exam result will count.

**Domain-mismatch protection:** Even without the extension, the site domain in the claim text is a visible check. With the extension, domain mismatches produce an automatic warning.

## Third-Party Use

**Employers**

**Hire verification:** When a candidate claims a certification earned at a specific center, the employer can check whether that center was authorized at the time. This is relevant when the certification body's own records do not distinguish where the exam was taken.

**Certification Bodies**

**Channel monitoring:** The certification body can detect where its authorization claims are being displayed — and where they are being copied to unauthorized sites — through verification-endpoint analytics.

**Revocation enforcement:** When a center loses its authorization (security breach, proctoring violations, contract termination), the verification endpoint returns REVOKED. The claim still exists on the center's site but now fails verification.

**Corporate Training Procurement**

**Vendor vetting:** An organization purchasing bulk training or exam vouchers for its employees can verify that the provider is genuinely authorized before committing budget.

## Verification Architecture

**The "Authorized Test Center" Trust Problem**

- **Badge copying:** Any website can display "Authorized Pearson VUE Test Center" or "Official AWS Training Partner" — these are just images or text.
- **Fake boot camps:** Unlicensed providers charge full price for "certification training" that does not include actual proctored exams, or issue certificates that the certification body does not recognize.
- **Phishing sites:** Sites impersonating real test centers collect payment and personal data, then disappear. The candidate loses money and may have identity information compromised.
- **Stale directories:** Certification body "find a test center" pages are often incomplete or slow to reflect closures and revocations.
- **Post-revocation persistence:** A center dropped from the authorized network may continue displaying authorization badges and booking exams it cannot legitimately deliver.

The verifiable claim addresses these because:

1. The certification body issues the claim — it is not self-asserted by the center
2. The claim names the specific site where it applies
3. Revocation is immediate — the endpoint returns REVOKED
4. The browser extension can detect domain mismatches automatically

## Competition vs. Current Practice

| Feature | Live Verify | "Authorized Center" Badge | Certification Body Directory | Word of Mouth |
| :--- | :--- | :--- | :--- | :--- |
| **Issuer-controlled** | **Yes.** Certification body issues the claim. | **No.** Center self-asserts. | **Yes.** But often stale. | **No.** |
| **Domain-bound** | **Yes.** Claim names the authorized site. | **No.** | **Partially.** Links to center. | **No.** |
| **Revocable** | **Immediate.** Endpoint returns REVOKED. | **No.** Badge persists. | **Slow.** Directory updates lag. | **No.** |
| **Verifiable pre-booking** | **Yes.** On the booking page. | **No.** | **Requires leaving the site.** | **No.** |
| **Detects site copying** | **Yes.** Domain mismatch warning. | **No.** | **No.** | **No.** |

**Practical conclusion:** certification body directories and "find a test center" tools remain useful, but they answer a different question ("where can I take this exam?") from the one the candidate is actually asking on a center's booking page ("is this center actually authorized?"). The verifiable claim answers the second question in place.

## Authority Chain

**Pattern:** Commercial / Certification Body

```
✓ pearsonvue.com/test-centers — Authorized testing center verification
```

For exam programs where a regulatory body oversees professional certification (medical, legal, financial), the chain would extend upward:

```
✓ pearsonvue.com/test-centers — Authorized testing center verification
  ✓ regulator.gov/approved-exam-providers — Regulatory oversight of examination delivery
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Further Derivations

1. **Individual Certification Verification** — Per-candidate verification that a specific certification was earned at an authorized center, carried on the candidate's digital credential.
2. **Corporate Training Completion Records** — Bulk verification for organizations that their employees completed training through an authorized provider.

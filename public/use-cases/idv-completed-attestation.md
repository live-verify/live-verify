---
title: "Identity-Verification-Completed Attestation"
category: "Identity & Authority Verification"
volume: "Large"
retention: "Check validity window + audit period (typically 30-90 days live, 1-7 years for the audit record)"
slug: "idv-completed-attestation"
verificationMode: "clip"
tags: ["identity-verification", "idv", "liveness", "kyc", "hiring", "deepfake", "staffing", "portable-attestation", "vendor-attestation", "insider-risk"]
furtherDerivations: 0
---

## What is an Identity-Verification-Completed Attestation?

A candidate, contractor, or counterparty has just been through an identity-verification check — a
liveness selfie, a document scan, a face-match — run by an IDV vendor (Onfido, Persona, iProov, Yoti,
or an in-house equivalent). The check produces a result. But that result lives inside the vendor's or
the first relying party's system, and everyone downstream just gets *told* it happened.

An IDV-completed attestation is a short, portable statement — bound by a `verify:` line to the
vendor's (or relying party's) domain — that says: *an identity-verification check of a stated type was
performed against this reference, on this date, and passed, and is valid until this date.* A staffing
agency can hand it to an end client; an employer can hand it to a partner; the subject can carry it
between processes without re-doing the check from scratch.

The [Huntress "AI arms race in recruiting"](https://www.huntress.com/blog) article describes deepfake
candidates passing interviews and joining organisations as insider threats, and recommends "sophisticated
identity verification tools throughout the entirety of the hiring process." The gap this fills is not
*running* the check — vendors already do that — but making its result verifiable by a third party
without a portal integration or a forwarded PDF that could be fabricated.

## The honest limit — read this first

This use case is deliberately scoped, because the tempting version of it is a lie.

**Live Verify does not detect deepfakes and cannot perform liveness.** A hash-lookup protocol has no
camera, no session, no biometric. Real-time liveness detection — the "hold up three fingers" test from
the Huntress article, or an IDV vendor's presentation-attack detection — is an **in-session,
statistical / behavioural problem, and is out of scope** here in exactly the way content-level bot
detection is out of scope for [ad-placement provenance](view.html?doc=ad-placement-provenance).

What this attestation carries is one narrow, honest fact: **that a named vendor ran a check of a stated
type and recorded a pass, at a stated time, valid for a stated window.** It is only as trustworthy as
that vendor. It moves the trust question from "is this forwarded PDF real?" to "do I trust this vendor's
domain to stand behind this result?" — which is a question the verifier can actually answer, because the
domain is shown.

If the vendor's own liveness was fooled by a deepfake, this attestation will faithfully report a pass.
It removes the *forwarding/forgery* ambiguity; it does not upgrade the *quality* of the underlying check.

## What gets attested

The inline styling is ignored by clip mode — only the text content is hashed.

<div style="max-width: 560px; margin: 24px auto; font-family: 'Courier New', monospace; background: #f9f9f9; padding: 15px; border: 1px solid #999; font-size: 1em; color: #000; line-height: 1.6;">
  <span verifiable-text="start" data-for="idv"></span>
  IDENTITY VERIFICATION — COMPLETED<br>
  Verifier: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Meridian IDV Ltd<br>
  Subject Ref: &nbsp;&nbsp;MID-2026-77410<br>
  Check Type: &nbsp;&nbsp;&nbsp;Document + liveness (NIST IAL2)<br>
  Performed: &nbsp;&nbsp;&nbsp;&nbsp;18 Jun 2026 09:22 UTC<br>
  Valid Until: &nbsp;&nbsp;18 Sep 2026<br>
  Result: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;PASS<br><br>
  <span data-verify-line="idv">verify:meridian-idv.example/att/v</span>
  <span verifiable-text="end" data-for="idv"></span>
</div>

**No biometric leaves the vendor.** The verifiable text carries a reference and a check *type*, not a
face, not a document image, not a template. The subject is resolved to a person out-of-band, the same
privacy pattern as [Right to Work Verification](view.html?doc=right-to-work-verification) and
[Biometric Likeness Claims](view.html?doc=biometric-likeness-claims).

## The Problem

- **Forwarded-result forgery** — "we ran IDV and they passed" arrives as an editable PDF or an email
  line. The attestation replaces it with a domain-anchored, tamper-evident claim.
- **Stale reliance** — a check from a year ago is presented as if current. The `Valid Until` field and
  `Expired` status make ageing visible instead of silent.
- **Assurance-level laundering** — a weak document-only check is described downstream as "full identity
  verification." Pinning the *check type* at source stops the upgrade-in-retelling.

## What Is Checked

- **Verifier** — the IDV vendor or relying party that ran the check and operates the endpoint
- **Subject reference** — pseudonymous; resolved to a person separately
- **Check type and assurance level** — e.g. document-only, document+liveness, and a standard level
  (NIST 800-63 IAL, eIDAS LoA) so the verifier knows *what kind* of check passed
- **Performed timestamp** — when the check ran
- **Valid-until** — the freshness boundary; an IDV pass is a point-in-time fact that ages (see
  [point-in-time vs current](../docs/point-in-time-vs-current.md))
- **Result** — Pass, and the statuses below

## What the Checker Sees

Shows the verifier domain and the responder status. No biometric or document content is echoed.

**Status Indications:**
- **Pass (Valid)** — the check passed and is within its validity window
- **Expired** — the check passed but the validity window has closed; a fresh check is needed
- **Superseded** — a newer check replaces this one
- **Revoked** — the verifier has withdrawn the result (e.g. the check was later found fraudulent)
- **Under Review** — an integrity concern is open against this result

**Freshness is the load-bearing signal.** An expired IDV pass is worth very little; the more a decision
depends on the subject being *currently* who they claim, the shorter the validity window should be. A
stale "PASS" is not evidence of present identity — it is evidence a check happened once.

## Who Holds It

The subject benefits from carrying a check they have already passed:

- **Avoid re-verification friction:** present a valid attestation instead of repeating a liveness+document
  check for every new engagement in its validity window.
- **Prove the check to a sceptical counterparty** without the counterparty needing a portal login into
  the vendor.

## Who Checks It

**Employers / end clients**
- **Confirm a staffing agency's IDV claim:** when an agency says "we verified this contractor," the end
  client sees the *vendor's own domain* stand behind a specific check type and date — not a line in an
  agency email. Directly complements
  [Remote Worker Identity and Access Verification](view.html?doc=remote-worker-identity-and-access-verification),
  where the deepfake-insider risk is the core concern.

**Partners / counterparties in a transaction**
- **Confirm KYC was done to a stated assurance level** before extending access or credit, without
  re-collecting identity documents ([KYC Documents](view.html?doc=kyc-documents)).

**Auditors / regulators**
- **Confirm a check of the required assurance level occurred** at onboarding, as an audit artifact.

## How Verification Works Here

**What it explicitly does not address**

- **Deepfake / presentation attacks against the vendor's own liveness** — out of scope; that is the
  vendor's detection problem, not a hash problem.
- **Whether the subject reference maps to the right human** — resolved out-of-band; the attestation binds
  a *check* to a *reference*, not a face to this protocol.

**Who issues these**

- IDV vendors (Onfido, Persona, iProov, Yoti, and peers) — endpoint on the vendor's domain.
- Relying parties that run IDV in-house — endpoint on their own domain, standing behind their own check.

## Related Use Cases

- [Candidate Work-Sample & Assignment Provenance](view.html?doc=candidate-work-sample-provenance)
  — the other half of the hiring picture: *what* was submitted, vs. *who* was checked
- [Remote Worker Identity and Access Verification](view.html?doc=remote-worker-identity-and-access-verification)
  — the deepfake-insider / "who is actually doing the work" pattern this feeds into
- [Biometric Likeness Claims](view.html?doc=biometric-likeness-claims) — a live "this face matches this
  person now" claim (camera mode); the present case is the *record that a check was done*, not the check
- [KYC Documents](view.html?doc=kyc-documents) — the underlying customer-identity records
- [Right to Work Verification](view.html?doc=right-to-work-verification) — the same privacy-by-reference,
  short-validity-window design
- [Recruitment Agency Verification](view.html?doc=recruitment-agency-verification) — the agency's own membership bona fides

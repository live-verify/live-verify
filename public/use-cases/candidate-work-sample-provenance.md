---
title: "Candidate Work-Sample & Assignment Provenance"
category: "Professional & Educational Qualifications"
volume: "Large"
retention: "Hiring cycle + 1-2 years (dispute/audit window)"
slug: "candidate-work-sample-provenance"
verificationMode: "clip"
tags: ["hiring", "recruitment", "take-home-assignment", "work-sample", "portfolio", "ai-provenance", "authentic-work", "assessment", "screening", "self-attested"]
furtherDerivations: 0
---

## What is Candidate Work-Sample Provenance?

A candidate submits a take-home assignment, a code sample, a portfolio piece, or a written
exercise as part of a hiring process. The employer has to decide two separate things about it:

1. **Is this artifact genuinely what it claims to be** — produced by this candidate, at the stated
   time, under the stated conditions, and unaltered since?
2. **Is it any good** — does it demonstrate the skill the role needs?

Live Verify addresses only the first question. The second is, and remains, human judgement.

This distinction matters more than it used to. As the [Huntress "AI arms race in
recruiting"](https://www.huntress.com/blog) framing describes, candidate-side tooling can generate
flawless, technically-correct submissions for screening tests and take-home assignments in seconds.
An employer reviewing a polished artifact has no way to tell *when* it was produced, *whether it was
edited after submission*, or *whether the person who submitted it is the person who will do the job*.

A work-sample provenance claim is a short, stable statement — bound by a `verify:` line to a
domain that can actually stand behind it — that pins the artifact to a moment, an identity reference,
and a set of conditions. It does not, and cannot, prove the artifact was produced without AI
assistance. Stating that limit loudly is the whole point of the design.

## What gets attested

The verifiable text is a short header the candidate (or the platform) attaches to the submission.
The inline styling is ignored by clip mode — only the text content is hashed.

<div style="max-width: 560px; margin: 24px auto; font-family: 'Courier New', monospace; background: #f9f9f9; padding: 15px; border: 1px solid #999; font-size: 1em; color: #000; line-height: 1.6;">
  <span verifiable-text="start" data-for="worksample"></span>
  WORK-SAMPLE PROVENANCE<br>
  Issuer: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Northbank Talent Assessments<br>
  Candidate Ref: &nbsp;NT-2026-55219<br>
  Assignment: &nbsp;&nbsp;&nbsp;Backend take-home (v4)<br>
  Submitted: &nbsp;&nbsp;&nbsp;&nbsp;18 Jun 2026 14:07 UTC<br>
  Conditions: &nbsp;&nbsp;&nbsp;Unproctored, 4h window<br>
  Status: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SUBMISSION SEALED<br><br>
  <span data-verify-line="worksample">verify:northbank-assess.example/ws/v</span>
  <span verifiable-text="end" data-for="worksample"></span>
</div>

**Privacy note:** the candidate's name is not in the verifiable text — only a reference. The employer
matches the reference to the person through separate identity checks (the same privacy pattern used by
[Exam and Test Results Verification](view.html?doc=exam-test-results-verification) and
[Right to Work Verification](view.html?doc=right-to-work-verification)).

**The `Conditions` line is load-bearing and must be honest.** "Unproctored, 4h window" tells the
employer exactly what was and was not controlled. A provenance claim that implied "no AI used" when the
assignment was unproctored would be a lie the hash would faithfully preserve. See the honest-limit
section below.

## The Problem: work-sample fraud

- **Post-submission editing** — the candidate submits, then keeps improving, then presents the improved
  version as the original timed submission. The seal's timestamp defeats this.
- **Substitution** — a different, better artifact is swapped in for the one actually submitted. The hash
  fails on any change.
- **Invented portfolio** — work attributed to a candidate that they did not produce. A self-attested
  claim bound to a *controllable authoritative* domain (a bootcamp, a prior employer) is checkable;
  a bare PDF is not.
- **Ghost-writing / collusion** — someone other than the candidate produced the work. Provenance
  **cannot** catch this on its own; it can only record the declared conditions and surface an
  `Under Review` integrity flag when the issuer has independent reason to doubt.

## What Is Checked

- **Issuer** — who operates the endpoint and stands behind the seal (an assessment platform, a
  bootcamp, a prior employer, or the candidate's own domain for self-attested portfolio work)
- **Candidate reference** — a pseudonymous handle, resolved to a person out-of-band
- **Assignment identifier and version** — which exercise, which revision
- **Submission timestamp** — when the artifact was sealed
- **Conditions** — proctored / unproctored, time window, tools permitted or forbidden
- **Status** — see below

The artifact *itself* is not in the verifiable text. For a large submission (a repository, a document),
the seal covers this short header; the header should name the artifact's own content hash if
tamper-evidence over the whole artifact is required, exactly as
[Page-at-a-time hashing](../docs/page-at-a-time-hashing.md) binds a document body to a short claim.

## What the Checker Sees

Shows the issuer domain and the responder status. No claim content is echoed — the employer already
holds the submission.

**Status Indications:**
- **Submission Sealed** — the artifact was received and pinned at the stated time, unaltered since
- **Superseded** — the candidate submitted a later revision (points to the newer reference)
- **Withdrawn** — the candidate or issuer withdrew the submission
- **Under Review** — an integrity flag is open (e.g. plagiarism/collusion query); the seal stands but
  the issuer signals caution

## Who Holds It

The candidate is the second party and benefits directly:

- **Fix authorship of honest work:** a candidate who *did* produce the sample under real conditions can
  prove the timestamp and that nothing was changed afterwards — protecting them if a competing
  submission is later found to be a copy of theirs.
- **Carry it between processes:** a sealed portfolio piece bound to the candidate's own domain travels
  across multiple applications without re-attestation, the same way
  [Self-Attested Authorship](view.html?doc=self-attested-authorship-copyright) travels with a creative work.
- **Rebut a false accusation:** if an employer suspects post-submission editing, the seal settles the
  factual question of *when* and *whether-altered* — leaving only the judgement question.

## Who Checks It

**Employers / hiring managers**
- **Confirm a submission is unaltered:** the artifact under review is the one sealed at submission time,
  not a version quietly improved afterwards.
- **Confirm the conditions:** read the `Conditions` line to weight the sample appropriately —
  an unproctored take-home is evidence of *a* capability, not *the candidate's unaided* capability.

**Staffing agencies / assessment platforms**
- **Pass a sealed result to the end client:** the client sees the platform's own domain stand behind
  the submission, rather than a forwarded PDF the agency could have edited. Complements
  [Recruitment Agency Verification](view.html?doc=recruitment-agency-verification).

**Bootcamps / prior employers**
- **Attest a real project:** a training provider or previous employer confirms a portfolio piece was
  genuinely produced in their programme, closing the "invented portfolio" gap the Huntress article
  describes (a stolen LinkedIn profile used to manufacture a plausible history).

## Who Issues It

**Who issues these**

- **Assessment platforms** (coding-test and take-home vendors) — endpoint on the platform's domain.
- **Bootcamps / universities** — for portfolio and capstone work.
- **Prior employers** — for real project work a candidate may reference.
- **The candidate's own domain** — for genuinely self-attested portfolio pieces, with the honest-limit
  caveat that a self-issued seal proves *timestamp and integrity*, not independent authorship.

**Pre-hire assessment scores are a neighbouring case, not this one.** A formal screening-test *score*
issued by a testing body — HackerRank, a proctored exam vendor, College Board, a professional board —
is already covered by [Exam and Test Results Verification](view.html?doc=exam-test-results-verification),
which handles score-inflation fraud and privacy-by-reference. This page covers the *work artifact*
(the code, the document, the portfolio piece), not the graded score. When a process produces both, use
the exam page for the score and this page for the sample.

## The honest limit: provenance is not proof-of-humanity

This is the single most important section. Live Verify seals what was submitted, when, and
**that it is unaltered** — attributed to a reference under declared conditions. It does not and
**cannot** establish that:

- no LLM or AI tool was used to produce the artifact, or
- the person named by the reference is the person who actually did the work.

Those are exactly the questions the Huntress article says employers now need answered — and they are
**out of scope** for a hash-lookup protocol, in the same way content-level bot detection is out of
scope for [ad-placement provenance](view.html?doc=ad-placement-provenance) and liveness is out of
scope for a document check. Detecting AI-generated content, or proving a live human authored something,
is a statistical / behavioural / in-session problem, not a hash problem.

What provenance *does* do is remove the ambiguity around timing and tampering so that the human
reviewer can spend their judgement on the questions that actually require it. If an employer needs
assurance that a *live human* produced work in the moment, that is a proctoring / liveness concern —
see [Identity-Verification-Completed Attestation](view.html?doc=idv-completed-attestation) for the
adjacent, honestly-scoped piece, and note that neither claims to *detect deepfakes*.

## Related Use Cases

- [Exam and Test Results Verification](view.html?doc=exam-test-results-verification) — graded
  screening-test and professional-exam *scores* (the neighbouring case to this artifact-level one)
- [Identity-Verification-Completed Attestation](view.html?doc=idv-completed-attestation) — a portable
  "an IDV/liveness check was performed and passed" object; the other half of the hiring picture
- [Employment References](view.html?doc=employment-references) — proof a candidate worked somewhere
- [Recruitment Agency Verification](view.html?doc=recruitment-agency-verification) — the agency's own bona fides
- [Remote Worker Identity and Access Verification](view.html?doc=remote-worker-identity-and-access-verification)
  — the post-hire insider-risk / "who is actually doing the work" pattern
- [Self-Attested Authorship, Bylines & Copyright](view.html?doc=self-attested-authorship-copyright)
  — the general primitive: binding a work to a controllable domain, with the same "attribution, not truth" limit

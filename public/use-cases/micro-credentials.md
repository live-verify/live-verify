---
title: "Micro-Credentials / Skill Attestations"
category: "Novel Document Types"
volume: "Very Large (emerging)"
retention: "Permanent (career records)"
slug: "micro-credentials"
verificationMode: "clip"
tags: ["skills", "credentials", "training", "competency", "badges", "peer-attestation", "novel"]
furtherDerivations: 6
---

## What is a Micro-Credential?

Traditional credentials are coarse: degrees, certifications, licenses. Micro-credentials are granular—specific skills, completed modules, demonstrated competencies. They're stackable, composable, and more precise than "has a degree in X."

<div style="font-family: 'Courier New', monospace; background: #f9f9f9; padding: 15px; border: 1px solid #999; font-size: 1em; color: #000; line-height: 1.6; max-width: 550px; margin: 24px auto;">
  <span verifiable-text="start" data-for="micro1"></span>SKILL CREDENTIAL<br>
  AWS Training and Certification<br>
  <br>
  Holder: james.chen@email.com<br>
  <br>
  Credential: AWS Lambda Deep Dive<br>
  Type: Specialty Module<br>
  Level: Advanced<br>
  <br>
  Completed: January 3, 2026<br>
  Score: 94%<br>
  Time: 4.2 hours<br>
  <br>
  Expires: Never (knowledge may become outdated)<br>
  <span data-verify-line="micro1">verify:aws.training/cred</span> <span verifiable-text="end" data-for="micro1"></span>
</div>

<div style="font-family: 'Courier New', monospace; background: #f9f9f9; padding: 15px; border: 1px solid #999; font-size: 1em; color: #000; line-height: 1.6; max-width: 550px; margin: 24px auto;">
  <span verifiable-text="start" data-for="micro2"></span>PRACTICAL COMPETENCY<br>
  City & Guilds<br>
  <br>
  Candidate: Michael Torres<br>
  Registration: 7891234<br>
  <br>
  Unit: Electrical Installation - Three-Phase Systems<br>
  Code: 2365-03-Unit-308<br>
  Level: 3<br>
  <br>
  Assessment: Practical + Theory<br>
  Result: COMPETENT<br>
  Date: 12 January 2026<br>
  Assessor: R. Williams (Reg: CG-44521)<br>
  <span data-verify-line="micro2">verify:cityandguilds.com/v</span> <span verifiable-text="end" data-for="micro2"></span>
</div>

<div style="font-family: 'Courier New', monospace; background: #f9f9f9; padding: 15px; border: 1px solid #999; font-size: 1em; color: #000; line-height: 1.6; max-width: 550px; margin: 24px auto;">
  <span verifiable-text="start" data-for="micro3"></span>PEER SKILL ATTESTATION<br>
  LinkedIn Skills Verification<br>
  <br>
  Professional: Sarah Kim<br>
  Profile: linkedin.com/in/sarahkim<br>
  <br>
  Skill: Machine Learning Model Deployment<br>
  <br>
  Attested By:<br>
  - Dr. James Liu (ML Lead, TechCorp) ✓<br>
  - Maria Santos (Senior Engineer, DataCo) ✓<br>
  - Ahmed Hassan (CTO, AI Startup) ✓<br>
  <br>
  Attestation Date: January 2026<br>
  Confidence: High (3 senior practitioners)<br>
  <span data-verify-line="micro3">verify:linkedin.com/skills/v/sarahkim-mlops</span> <span verifiable-text="end" data-for="micro3"></span>
</div>

<div style="font-family: 'Courier New', monospace; background: #f9f9f9; padding: 15px; border: 1px solid #999; font-size: 1em; color: #000; line-height: 1.6; max-width: 550px; margin: 24px auto;">
  <span verifiable-text="start" data-for="micro4"></span>CONTINUING EDUCATION UNIT<br>
  American Medical Association<br>
  <br>
  Physician: Dr. Robert Chen, MD<br>
  NPI: 1234567890<br>
  <br>
  Activity: Advanced Cardiac Imaging 2026<br>
  Category: AMA PRA Category 1<br>
  Credits: 2.5 CME<br>
  <br>
  Completed: January 6, 2026<br>
  Format: Live Webinar<br>
  Provider: UCSF Medical Center<br>
  <span data-verify-line="micro4">verify:ama-assn.org/cme/v</span> <span verifiable-text="end" data-for="micro4"></span>
</div>

<div style="font-family: 'Courier New', monospace; background: #f9f9f9; padding: 15px; border: 1px solid #999; font-size: 1em; color: #000; line-height: 1.6; max-width: 550px; margin: 24px auto;">
  <span verifiable-text="start" data-for="micro5"></span>LANGUAGE PROFICIENCY<br>
  Duolingo English Test<br>
  <br>
  Test Taker: Maria Garcia<br>
  Test ID: DET-2026-4478921<br>
  <br>
  Overall Score: 125 / 160<br>
  <br>
  Subscores:<br>
  - Literacy: 120<br>
  - Conversation: 130<br>
  - Comprehension: 125<br>
  - Production: 125<br>
  <br>
  CEFR Estimate: B2-C1<br>
  Test Date: January 4, 2026<br>
  Valid Until: January 4, 2028<br>
  <span data-verify-line="micro5">verify:englishtest.duolingo.com/v</span> <span verifiable-text="end" data-for="micro5"></span>
</div>

<div style="font-family: 'Courier New', monospace; background: #f9f9f9; padding: 15px; border: 1px solid #999; font-size: 1em; color: #000; line-height: 1.6; max-width: 550px; margin: 24px auto;">
  <span verifiable-text="start" data-for="micro6"></span>OPEN BADGE<br>
  Mozilla Foundation / IMS Global<br>
  <br>
  Earner: Alex Thompson<br>
  Email Hash: a3f2...8b71<br>
  <br>
  Badge: Web Accessibility Specialist<br>
  Issuer: W3C Web Accessibility Initiative<br>
  <br>
  Criteria Met:<br>
  - WCAG 2.1 Assessment: Passed<br>
  - Practical Audit: 3 sites reviewed<br>
  - Peer Review: Approved<br>
  <br>
  Issued: January 8, 2026<br>
  <span data-verify-line="micro6">verify:openbadges.org/v</span> <span verifiable-text="end" data-for="micro6"></span>
</div>

## The Problem: Unverifiable Skill Claims

A recruiter, hiring manager or client reading a CV or profile sees a list of badges and course completions and has to decide how much weight to give them. Each comes from a different issuer with its own format, and most are shown as an image or a line of text that anyone could add. Checking them one by one with each issuer is rarely done.

- **Claimed but never earned:** A badge image or certificate is copied or edited to show a different holder.
- **Inflated level or score:** A completion-only course is presented as an assessed one, or the score is changed.
- **Expired or withdrawn credentials:** A credential that has lapsed or been revoked still appears on the profile.
- **Unknown issuers:** With so many issuers, the reader cannot easily tell which organization actually stands behind a badge.

## Why Micro-Credentials Matter

**Precision:** "Knows Python" is vague. "Completed advanced pandas data manipulation with 92% assessment score" is specific.

**Currency:** A 2015 degree doesn't prove 2025 skills. Recent micro-credentials show current competency.

**Accessibility:** Not everyone has degrees. Micro-credentials recognize skills however acquired.

**Composability:** Stack credentials to show depth. Five related micro-credentials may be more meaningful than one broad certification.

## What Is Checked

Issuing organization, holder identifier, credential name/code, level, assessment method, score/result, completion date, assessor (if applicable), expiration (if applicable).

**Document Types:**
- **Skill Module:** Specific training unit completion
- **Practical Competency:** Hands-on skill demonstration
- **Peer Attestation:** Colleagues vouching for demonstrated ability
- **Continuing Education:** Professional development credits (CME, CLE, CPE)
- **Language Proficiency:** Standardized language test scores
- **Open Badge:** Interoperable digital credentials (IMS Global standard)
- **Project Completion:** Verified contribution to specific work

## What the Checker Sees

Shows the issuer domain (training provider, professional body, peer network) and credential status.

**Status Indications:**
- **Valid** — Credential current and verified
- **Expired** — Validity period has passed (may still show historical competency)
- **Superseded** — Replaced by updated version (e.g., new technology version)
- **Revoked** — Credential withdrawn (fraud, misconduct, or issuer policy)

## Who Holds It

The Credential Holder benefits from verification.

**Job Applications:** Prove specific skills without relying on resume claims.

**Skill Stacking:** Show progression through related credentials to demonstrate depth.

**Continuous Learning:** Verified record of ongoing professional development.

## Who Checks It

**Employers**
**Hiring Decisions:** Verify claimed skills before interviews. Filter candidates by verified competencies.

**Professional Bodies**
**Membership Requirements:** Verify continuing education credits for license renewal.

**Educational Institutions**
**Credit Transfer:** Accept verified micro-credentials toward degree requirements.

**Clients**
**Contractor Vetting:** Verify specific skills relevant to the project.

## How Verification Works Here

**Issuer Diversity**

Unlike traditional credentials (few universities, few certifying bodies), micro-credentials come from:
- Training platforms (Coursera, LinkedIn Learning, AWS)
- Professional bodies (AMA, IEEE, CFA Institute)
- Employers (internal training verified externally)
- Peer networks (colleague attestations)
- Open badge issuers (anyone following the standard)

**Assessment Rigor Spectrum**

Micro-credentials vary in rigor:
- **Completion only:** Watched the video (low signal)
- **Assessment passed:** Demonstrated knowledge (medium signal)
- **Practical demonstration:** Did the thing supervised (high signal)
- **Peer attestation:** Others vouch from experience (social signal)

Verification shows the type, letting consumers weight appropriately.

**Peer Attestation Model**

Colleagues can vouch for skills:
- Attestor's own credentials are verifiable
- Relationship context (worked together at X)
- Specificity of claim ("deployed 3 production ML models together")

The attestation is only as credible as the attestor—but that's now verifiable.

**Stacking and Pathways**

Micro-credentials can compose:
```
AWS Cloud Practitioner (foundation)
  + AWS Solutions Architect - Associate
  + AWS Lambda Deep Dive
  + AWS Security Specialty
= Demonstrated cloud architecture progression
```

Verification shows the complete stack.

## Authority Chain

**Pattern:** Commercial

Training platforms, professional bodies, and employers issue micro-credentials certifying skill mastery. The issuer is self-authorized as the credential provider.

```
✓ credentials.coursera.org/verify — Certifies skill module completions with assessment scores
```

Commercial issuer — self-authorized. Trust rests on the issuer's domain reputation.

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Novel Applications

**Skills-Based Hiring**
Job requirements as credential checklists. Applicants show verified credentials; system confirms match.

**Dynamic Team Assembly**
Project needs X, Y, Z skills. Query verified credential database to find qualified people.

**Credential Decay Modeling**
Some skills get stale (last Python course was 2018). Freshness weighting in verification response.

**Learning Pathway Recommendations**
Based on verified credentials held, suggest next credentials for career goals.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).

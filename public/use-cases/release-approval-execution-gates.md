---
title: "Release Approval Execution Gates (ITIL Change Re-Verification)"
category: "Novel Document Types"
volume: "Large"
retention: "Change record lifecycle + 1-7 years (audit)"
slug: "release-approval-execution-gates"
verificationMode: "clip"
tags: ["release-approval", "itil", "change-management", "cab", "ci-cd", "deployment-gate", "as-code", "deferred-verification", "devops", "segregation-of-duties", "audit"]
furtherDerivations: 1
---

## The Problem

In ITIL change management, a release is authorized by a Change Advisory Board (CAB) or a delegated
change manager: *Change CHG-2026-0417 is approved for deployment in the Saturday 02:00 window.* But
approval and execution are **separated in time**. The CAB approves on Wednesday; the release runs on
Saturday night, often automatically, often after the humans have gone home.

Between those two moments the approval can rot:

- The CAB **reversed or paused** the change after a late-breaking incident, but the pipeline never
  heard about it.
- The approval was **for a different artifact** — approved build `1.4.2`, but `1.4.3` is what's
  queued.
- The approval was **scoped to a window** that has since passed, or to conditions (a freeze lifted, a
  dependent change landed) that no longer hold.
- Someone **pasted a stale or fabricated approval** into the deployment plan to push a change the CAB
  never actually cleared.

Today the deployment pipeline trusts a copied-in approval ID, a Jira link, or a screenshot pasted
into a runbook. None of that re-checks anything at the moment it matters. The classic control —
segregation of duties between who approves and who deploys — is defeated the instant approval becomes
a string someone copy-pastes into executable automation.

This use case closes that gap: an engineer copies an approval into an **executable release plan (as
code, with a UI presentation)**, and the plan **re-verifies the approval against the issuer's domain
at execution time** — refusing to run if the CAB's record no longer says "approved."

## What's different here: the verification is deferred and automated

Most Live Verify use cases are a human verifying a document they hold *right now*. This one is
distinct in two ways, and that distinction is the whole point:

- **The verifier is the pipeline, not a person.** The release plan itself performs the check — the
  same `text → normalize → SHA-256 → GET` pipeline, run by automation at the gate.
- **The check happens later, at execution, not at sign-off.** The approval is captured now and
  *re-verified at the deployment moment*, so a withdrawal or supersession between approval and
  release is caught precisely when it would otherwise be missed.

It complements [Corporate Internal Approvals](corporate-internal-approvals.md), which proves a human
that *a specific thing was approved*. This proves the same thing **to a machine, at the moment it is
about to act on it** — a deployment gate, not a desk check.

## How it works

1. **The CAB issues a verifiable approval.** The change-management system (ServiceNow, Jira Service
   Management, an internal CAB tool) publishes the approval as canonical text bound to the
   organization's domain, with a `verify:` line. The approval text pins the **change ID, the exact
   artifact/build hash, the approved window, and the approver**.

2. **An engineer copies the approval into the release plan.** The plan is *as code* — a pipeline
   stage, a Terraform/Ansible gate, a deployment manifest — with a human-readable UI presentation of
   the approval block so reviewers see what was pasted. The approval text travels with the plan.

3. **At execution, the gate re-verifies.** When the pipeline reaches the deploy step (Saturday
   02:00), it normalizes the embedded approval text, hashes it, and GETs the issuer endpoint —
   re-running the verification *at that moment*, against live status:
   - `verified` → the CAB record still authorizes this exact change, build, and window → the gate
     opens.
   - `revoked` / `superseded` / `expired` → the approval no longer stands → **the gate fails loudly
     and the release does not run.**

The control is no longer "an engineer pasted a plausible-looking approval ID." It is "the issuer's
own domain confirmed, at execution time, that this exact release is still approved."

## Example: Embedded Release Approval (as presented in the plan UI)

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #1a5f2a; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <span verifiable-text="start" data-for="releaseapproval"></span>
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;">CHANGE RELEASE APPROVAL
═══════════════════════════════════════════════════════════════════

Change Ref:    CHG-2026-0417
Title:         Payments service rollout 1.4.2
Artifact:      payments-svc@sha256:9f2c…a17b
Approved For:  Deploy window 21 Jun 2026 02:00–04:00 UTC
Approved By:   Change Advisory Board (chair: D. Osei)
Conditions:    Freeze lifted; CHG-2026-0410 deployed first
Salt:          B4N7Q2X9

<span data-verify-line="releaseapproval">verify:change.northbridge.example/cab/v</span></pre>
  <span verifiable-text="end" data-for="releaseapproval"></span>
</div>

## Example: Gate Refuses at Execution

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #7a1f1f; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;">Release Gate — CHG-2026-0417
═══════════════════════════════════════════════════════════════════

Re-verified at: 21 Jun 2026 02:00 UTC
Result:         SUPERSEDED
Reason:         A newer approval exists; this build is not the approved one
Action:         DEPLOYMENT HALTED — gate did not open

verify:change.northbridge.example/cab/v
</pre>
</div>

## Data Verified

Change reference, release title, the **exact artifact/build hash** approved, the approved deployment
window, the approving body/approver, stated conditions, and the salt. Because the artifact hash is
pinned in the approval text, an approval for build `1.4.2` will not verify a plan that quietly
queued `1.4.3` — the change in artifact changes the hash and the gate refuses.

**What is deliberately NOT included:**

- the release payload, code, or deployment secrets (the approval gates the release; it is not the
  release)
- internal CAB deliberation, dissent, or incident detail
- approver personal data beyond the role/name needed to evidence authority

## Data Visible After Verification

The pipeline (and any human reading the plan UI) sees the issuer domain and the live approval status.

**Status Indications:**
- **Verified** — The CAB record still approves this exact change, artifact, and window. Gate opens.
- **Revoked** — The approval was withdrawn (e.g., incident-driven freeze). Gate fails; release halts.
- **Superseded** — A newer approval exists; the pinned artifact is no longer the approved one. Gate
  fails.
- **Expired** — The approved window has passed. Gate fails; a fresh approval is required.
- **404** — No matching approval (fabricated, mistyped, or wrong change ref). Gate fails loudly.

Per the project's fail-loudly principle, **any non-`verified` result halts the release** — the gate
never "assumes approved" on a network error or ambiguous response. A gate that cannot reach the
issuer fails closed and surfaces the reason, rather than degrading to a pass.

## Second-Party Use

The **release engineer / deployment pipeline** benefits directly.

**Tamper-evident approval in the plan:** A pasted approval that was altered (to widen the window,
swap the artifact, forge the approver) produces a hash the CAB never published — it fails to verify.

**Segregation of duties restored:** The person who deploys cannot manufacture the approval; only the
CAB's domain can return `verified`. Copy-paste into automation no longer defeats the control.

**Catch late withdrawals automatically:** If the CAB reverses the change after sign-off, the gate
sees `revoked` at 02:00 and refuses — no human has to remember to re-check.

## Third-Party Use

**Auditors and compliance (SOX, ITIL, ISO 20000, SOC 2)**

A deployment that ran carries a verifiable, timestamped record that *this exact release was approved
and re-confirmed at execution*. The auditor can replay the approval text against the issuer endpoint
rather than trusting a screenshot in a change ticket.

**Security and incident response**

When investigating an unauthorized or out-of-window deployment, responders can check whether the
release actually verified against a live CAB approval — distinguishing "approved and run correctly"
from "someone bypassed the gate."

**Regulated change environments (finance, healthcare, critical infrastructure)**

Where change control is a regulatory obligation, an execution-time re-verification gate is evidence
that approval was not merely obtained but *still held* when the change went live.

## Verification Architecture

The novel property is **deferred, automated re-verification**: the same pipeline that other use
cases run once, here runs *at the deployment gate*, by the automation, against live status. The
approval text is embedded in the release plan as code (with a UI presentation for human reviewers),
travels with it, and is hashed and checked at execution.

- **Artifact binding** prevents the classic substitution attack: the approved build hash is part of
  the approval text, so approving `1.4.2` cannot wave through `1.4.3`.
- **Window and condition binding** make a stale approval self-invalidating: a passed window verifies
  as `expired`; the CAB can flip status to `revoked` the instant a freeze is reimposed.
- **Fail-closed gates** mean the control is conservative by construction — the release runs only on
  an affirmative `verified`, never on the absence of a clear refusal.

This is the camera/clip pipeline pointed at a machine actor and a deferred moment. It does not
replace the change-management system; it makes that system's decision *re-checkable at the exact
instant the decision is acted upon.*

## Privacy Salt

The salt is required. Each approval carries a unique salt so that approval texts — which are
otherwise structured and low-entropy (change IDs and dates follow predictable formats) — cannot be
guessed-and-hashed or enumerated. Without the salt, an attacker who knows the change-ID format could
probe the CAB endpoint to discover which changes exist or are approved. The salt makes each approval
hash unique and unguessable; it is generated by the change-management system and included in the
approval text.

## Competition vs. Current Practice

| Feature | Execution-Time Verification Gate | Pasted Approval ID / Jira Link | Screenshot in Runbook |
| :--- | :--- | :--- | :--- |
| **Re-checks at deploy time** | **Yes.** Against live status. | **No.** Trusted as written. | **No.** |
| **Catches post-approval withdrawal** | **Yes.** `revoked`/`superseded` halts. | **No.** | **No.** |
| **Binds the exact artifact** | **Yes.** Build hash in the approval. | **No.** | **No.** |
| **Tamper-evident** | **Yes.** Altered text fails to verify. | **No.** | **No.** |
| **Restores segregation of duties** | **Yes.** Deployer can't forge approval. | **Weak.** | **Weak.** |

**Practical conclusion:** the change-management system remains the source of truth. The execution
gate is the better object for *the deployment automation* to act on, because it re-confirms the
decision at the only moment that matters — when the release is about to run.

## Authority Chain

**Pattern:** Commercial / Corporate-internal.

The approval is issued by the organization's own change-management domain. In larger or regulated
organizations the CAB's authority may itself chain to an internal governance or risk function.

```
✓ change.northbridge.example/cab/v — Issues CAB release approvals
  ✓ northbridge.example — Corporate governance / internal controls authority
```

For most internal deployments the chain is short and terminates at the organization itself — the CAB
is the authority for what may be released. See
[Authority Chain Specification](../../docs/authority-chain-spec.md) for the protocol and
[Corporate Internal Approvals](corporate-internal-approvals.md) for the human-verified sibling of
this use case.

## Further Derivations

None currently.

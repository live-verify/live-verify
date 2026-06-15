---
title: "On-Duty Status & Lone-Worker Check-Ins"
category: "Identity & Authority Verification"
volume: "Large"
retention: "Shift duration (ephemeral) to roster-record retention"
slug: "on-duty-status-lone-worker-checkins"
verificationMode: "both"
tags: ["on-duty", "shift-status", "lone-worker", "check-in", "roster", "worker-safety", "real-time-status", "field-worker", "time-current"]
furtherDerivations: 2
---

> **See also:** [Utility & Field Worker Verification](utility-field-worker-verification.md) — proves a worker is accredited. This case adds the missing time dimension: is that accredited worker on shift *right now?* And [Release Approval Execution Gates](release-approval-execution-gates.md) — a sibling "deferred / time-current verification" pattern, where a credential that was valid at sign-off must be re-confirmed live at the moment it is acted on.

## The Problem

Existing worker-badge cases answer "is this person accredited?" — a real employee, a valid licence, an unrevoked ID. They do not answer "is this person on shift right now?"

A badge can verify perfectly and the worker still be off the clock: the technician finished their last job at 4pm and is now door-knocking for a side cash job; a terminated employee whose record is mid-removal; a genuine contractor on a day they are not rostered to your address. Accreditation is durable; presence is not. The homeowner at the door, the front-desk guard, and the site supervisor all want the *current* fact, not the standing one.

A second, separate need runs the other way. A **lone worker** — a meter reader in a remote substation, a community nurse on a home visit, a night-shift security patrol, a surveyor on a boundary alone — is expected to check in at intervals. If a check-in is missed, someone (a monitoring service, a supervisor, next-of-kin) needs to confirm, quickly and independently, whether the last check-in is within the expected window or **overdue**. Today that confirmation is a phone call to a dispatcher who may not answer.

Both needs are the same shape: a short, time-bound status that the employer holds and that a third party must read live.

## What's different: time-currency, not just accreditation

Most verification proves a fact that was true when the document was issued and is assumed true until revoked. This case proves a fact that is **only true for a window measured in minutes or hours** — the live shift state.

That changes the trust property. A photograph of an accreditation badge is dangerous because the hash stays valid for months. A photograph of an *on-duty* attestation is near-worthless: the `As At` timestamp and the salt move on, the shift ends, and the same hash returns `SHIFT_ENDED` or `404`. Time-currency is self-limiting by design.

The endpoint still confirms **status only** — it never echoes the worker's name, route, or location. It answers one question ("on duty? checked in?") and nothing more.

## The two facets (on-duty status; lone-worker check-in)

**Facet 1 — On-Duty status (someone verifies the worker).** The homeowner, guard, or supervisor reads the attestation the worker presents and confirms the live roster state: `ON_DUTY`, `OFF_DUTY`, or `SHIFT_ENDED`. This is the time-current layer on top of an existing accreditation badge — verify the badge once for "who/what," verify this for "right now."

**Facet 2 — Lone-worker check-in (the worker attests to safety).** The employer issues a rolling check-in attestation each time the worker reports in. A monitoring service or next-of-kin reads it to confirm the worker checked in inside the expected window: `CHECKED_IN` if the last report is recent enough, `OVERDUE` once the next-due time has passed. This complements — does not replace — dedicated lone-worker monitoring services; it gives them, and the family, a domain-bound second source.

Both facets are read-only. Neither GPS-tracks the worker (see Privacy Salt).

## Example: On-Duty Confirmation

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #1a5f2a; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <span verifiable-text="start" data-for="onduty"></span>
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;">ON-DUTY STATUS CONFIRMATION

Worker:        Field Tech  M-1847  (Gas Operations)
Employer:      Consolidated Edison — Field Dispatch
Shift window:  2026-06-15  08:00 – 16:00
Status:        ON DUTY
As At:         2026-06-15  13:42
Salt:          7k3m9x2p

<span data-verify-line="onduty">verify:dispatch.employer.example/onduty/v</span></pre>
  <span verifiable-text="end" data-for="onduty"></span>
</div>

The worker holds this to the window or doorbell camera alongside their accreditation badge. The badge proves "Marcus M, gas tech, real employee"; this proves "and he is on the clock at 13:42 today." If the shift had ended, the same scan would return `SHIFT_ENDED` and the resident would not admit him.

## Example: Lone-Worker Check-In

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #1a5f2a; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <span verifiable-text="start" data-for="checkin"></span>
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;">LONE-WORKER CHECK-IN ATTESTATION

Worker ref:    LW-0042
Employer:      Riverside Community Care — Dispatch
Last Check-In: 2026-06-15  13:30
Next Due:      2026-06-15  14:30
Status:        CHECKED IN
Salt:          q9m2k7x3

<span data-verify-line="checkin">verify:dispatch.employer.example/checkin/v</span></pre>
  <span verifiable-text="end" data-for="checkin"></span>
</div>

A monitoring service or next-of-kin scans (or is sent the live attestation) to confirm the worker reported in. At 13:30 with a 14:30 next-due, status reads `CHECKED_IN`. Once 14:30 passes with no new check-in, the same record turns `OVERDUE` — the plainly-stated signal to escalate, not a guess.

## Data Verified

Worker role/reference (not necessarily full name), issuing employer or dispatch domain, shift window or check-in window, the live status token, the `As At` / `Last Check-In` timestamp, and the rotating salt. No address, route, or coordinates are part of the verified claim.

## Data Visible After Verification

The endpoint confirms status; it does not echo the worker's identity or whereabouts.

**Status Indications:**

- **ON_DUTY** — Worker is currently on an active rostered shift. Safe to treat as on-the-clock now.
- **OFF_DUTY** — Worker is accredited but not on shift at this moment. Do not admit on the strength of this attestation.
- **SHIFT_ENDED** — The shift window referenced has closed. The attestation is stale; treat as off-duty.
- **CHECKED_IN** — The lone worker's last check-in is within the expected window. No action needed.
- **OVERDUE** — The next-due time has passed without a check-in. Escalate per the monitoring plan. This is stated plainly; it is never inferred from silence on the verifier's side.
- **404** — No such record (forged, expired beyond retention, or OCR error). Treat as unverified — never as on-duty.

**Fail loudly:** A network error, timeout, or `404` is shown as "could not confirm," never silently rounded up to `ON_DUTY` or `CHECKED_IN`. An unreachable endpoint means *unknown*, and unknown for a lone-worker check-in should be escalated like `OVERDUE`, not waved through.

## Second-Party Use

The **worker** benefits directly. The on-duty attestation lets a defensive homeowner or guard confirm they are legitimately on shift, smoothing access without a phone call to dispatch. The check-in attestation is, plainly, a safety net: if they are hurt or unreachable, the `OVERDUE` state is what triggers help — and it does so without broadcasting their location to anyone.

## Third-Party Use

**Homeowners, front-desk and site supervisors** read the on-duty attestation as the live layer over a badge already verified for accreditation — the substitution or side-job worker is caught when the badge says "valid" but the shift state says `OFF_DUTY` or `SHIFT_ENDED`.

**Lone-worker monitoring services** consume the check-in status as a domain-bound second source alongside their own telemetry. **Next-of-kin** can be sent the live `verify:` line so they can independently confirm "Dad checked in at 13:30, next due 14:30" without phoning a dispatcher.

## Verification Architecture

Two endpoints under the employer's dispatch domain, one per facet:

- `dispatch.employer.example/onduty/v` — returns the live roster state for the presented attestation hash.
- `dispatch.employer.example/checkin/v` — returns the live check-in state, computed from the last check-in time against the next-due window.

Each printed or screen-rendered attestation is normalized, SHA-256'd, and looked up by GET. The server compares the current clock against the shift/check-in window to return the status token; it returns no payload content. As shifts end and check-in windows roll, the employer re-issues the attestation with a fresh salt, so old hashes age out to `SHIFT_ENDED` / `OVERDUE` / `404` rather than lingering as valid.

## Privacy Salt

Critical, and load-bearing here for two reasons. First, low-entropy fields (a small worker reference, a round shift time) would otherwise be guessable; the issuer-generated salt blocks guess-and-hash enumeration of the roster. Second, the rotating salt makes the time-current property real — a captured hash is invalidated as soon as the salt rolls, so a photographed attestation cannot be replayed to fake an active shift.

**Explicitly no GPS or location tracking.** This case attests a *roster/check-in state the employer already holds* — that a shift is active, or that a check-in was received in time. It does not report, store, or expose where the worker is. `CHECKED_IN` means "reported in on schedule," not "located here." Anyone wanting a location-tracking product should look elsewhere; conflating the two would turn a safety tool into surveillance, and that is a non-goal.

## Authority Chain

**Pattern:** Commercial

The employer (or their dispatch function) is the sole authority over its own roster and check-in records. There is no external regulator of "is this person on shift" — it is a fact only the employer holds and can attest.

```
✓ dispatch.employer.example/onduty/v — Attests live on-duty / shift status from the employer's roster
✓ dispatch.employer.example/checkin/v — Attests live lone-worker check-in status from the employer's dispatch log
```

Self-authorized: a commercial entity attesting facts about its own workforce. See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Further Derivations

None currently.

---
title: "Live All-Clear / Affirmative Canary Status (Self-Attested)"
category: "Novel Document Types"
volume: "Large"
retention: "Continuous (re-attested on cadence)"
slug: "live-allclear-canary-status"
verificationMode: "clip"
tags: ["live-status", "canary", "all-clear", "freshness", "self-attested", "affirmative-canary", "liveness", "scheduled-attestation", "system-status", "operational-status"]
furtherDerivations: 1
---

## The Problem

Sometimes the useful thing to say is **"nothing is wrong."** A person wants their contacts to know
their account is genuinely theirs and behaving normally — so that an impersonator's "hey, it's
really me, send money" can be measured against the owner's own published "my account is fine, ignore
anyone claiming otherwise." An operator wants integrators to know the API is healthy *right now*, so
a transient error on the integrator's own side isn't misread as a provider outage.

But a bare "all good" is nearly worthless. Anyone can post it, it can be spoofed, and — the deeper
problem — a reassurance with no timestamp tells you nothing about *when* it was true. "All good"
written once and never touched again is exactly the reassurance you should distrust. What is missing
is an **affirmative, freshly re-attested, domain-anchored** all-clear: a positive claim the owner
keeps current, where the *recency* of the reassurance is the thing that carries weight, and where
letting it go stale is itself a visible signal rather than a silent gap.

## The affirmative canary — and how it differs from the warrant canary

Live Verify moved warrant canaries out of the active catalogue (see
[the canary discussion](../../docs/warrant_canary_discussion.md)). The reason was structural: a
warrant canary signals by **absence**. You publish "no warrant received," and observers must *infer*
trouble when the statement **stops** appearing. That inference is fragile in a way that never got
solved — did the canary stop because of a gag order, because the server went down, because the cron
job died, or because someone was on holiday? Verifying *absence* is a monitoring problem, not a
verification problem, and the project's architecture verifies **presence**.

This all-clear is the **affirmative successor** the canary doc anticipated. Its "what would change
our mind" list names exactly this: a **"scheduled attestation primitive where the *expectation* of a
future document is itself a verifiable claim."** That is precisely the shape here — the owner
publishes an affirmative "all good as of `<timestamp>`" and bakes the *expected cadence* into the
claim ("re-attested daily, next due `<timestamp>`"). The expectation of the next fresh attestation is
part of what is verified.

Two concrete improvements over the absence-based canary:

1. **It is an affirmative claim with an explicit, hashed "as of" timestamp.** The freshness is
   precise and machine-checkable — you read the **As At** field directly, rather than reconstructing
   a publishing schedule and watching for a gap in it.
2. **The expected cadence is part of the claim.** Because "re-attested daily, next due …" is inside
   the verified text, **"stale" is well-defined** — it is "past the next-due time," not a guess about
   whether the publisher *meant* to update.

**Be honest about the residual, though.** This is *better-specified*, not *immune*. A stale all-clear
is still ambiguous in one direction: if the "all good as of" timestamp goes old, you genuinely do not
know whether the owner stopped affirming because **something is wrong** or because they **got bored,
went on holiday, or let the job lapse**. The warrant canary's core wound — *silence is ambiguous* —
is **attenuated here, not closed**. What improves is that the silence is now sharply *dated and
scheduled* (you know exactly when the reassurance lapsed and exactly when it was due), so you have a
crisp prompt to go look, rather than an open-ended "has it been quiet too long?" This does **not**
fully solve the problem that benched the warrant canary; it specifies it tightly enough to act on.

## What gets attested

The owner of a thing — a person about their account, an operator about their system — publishes a
short, affirmative status claim bound by a `vfy:` line to a domain **they** control:

```
OPERATIONAL STATUS — ALL CLEAR
Status:      OPERATING NORMALLY
As At:       2026-06-27 09:00 UTC
Re-attested: daily (next due 2026-06-28 09:00 UTC)
vfy:operator.example/status/v
```

Three things make it work:

1. **It is affirmative.** It states that a condition *is good now*, a positive claim that is present
   and dated — not a thing whose disappearance you must notice.
2. **It is fresh, and the freshness is scheduled.** The **As At** timestamp is the load-bearing
   field, and the **next-due** time makes the expected freshness explicit. The whole value is
   "all good *as of a recent moment, with another attestation promised by a stated time*."
3. **It is domain-anchored to the owner.** It is bound to a domain the *owner* controls (a person's
   own site, an operator's status domain) — not to the channel being vouched for, and not to a
   third-party monitor.

## Example

A contact unsure whether `@fredf` is genuinely Fred can check Fred's own domain and find Fred
affirmatively vouching that the account is fine and freshly re-attested:

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #1a5f2a; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <span verifiable-text="start" data-for="allclear"></span>
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;">OPERATIONAL STATUS — ALL CLEAR
═══════════════════════════════════════════════════════════════════

Subject:       Fred Flintstone
Channel:       twitter/x @fredf
Status:        OPERATING NORMALLY
As At:         2026-06-27 09:00 UTC
Re-attested:   daily (next due 2026-06-28 09:00 UTC)
Salt:          K4P9X2M7

This account is operating normally and under my control. If this
all-clear is fresh, treat anyone claiming otherwise — or any
urgent money or credential request — as an impersonator.

<span data-verify-line="allclear">vfy:fredflintstone.example/status/v</span></pre>
  <span verifiable-text="end" data-for="allclear"></span>
</div>

The green border marks this as an **all-clear**, not a warning. The contact does not have to judge
the impersonator's message on its own merits — they check Fred's domain, see a fresh
OPERATING NORMALLY whose **As At** is recent and whose **next-due** has not passed, and disbelieve the
impersonator. If, instead, the all-clear were **overdue**, they would not conclude Fred was hacked —
only that Fred stopped affirming, and that they should seek a fresher signal (and the incident sibling
below).

## Beyond persons: systems

The same primitive applies to systems, not just people. An operator publishes the identical shape
about their own infrastructure:

```
OPERATIONAL STATUS — ALL CLEAR
Service: payments-api   Status: OPERATIONAL
As At: 2026-06-27 14:55 UTC   Re-attested: every 5 min (next due 2026-06-27 15:00 UTC)
vfy:status.acme.example/status/v
```

This is deliberately **elective and self-attested** — the operator chooses to publish, and it is
*their* affirmative word about *their* system, anchored to *their* domain. It is **not** a centralized
monitoring service and **not** Down Detector: there is no third party probing the API and inferring
health from the outside. The operator asserts the state and keeps the **As At** fresh on the stated
cadence. An integrator seeing failures can check it: a fresh OPERATIONAL says "the problem is probably
your side"; an **overdue** one says "the operator stopped vouching — treat with caution."

The affirmative all-clear is the positive counterpart of the
[Live Incident & Ongoing-Warning](view.html?doc=live-incident-status-attestations) form. When an
incident **resolves**, the natural next attestation is precisely this all-clear; while a system is
healthy, this is the steady-state claim, and an incident is the exception that interrupts it.

## Data Verified

That the controller of the named domain currently asserts this affirmative all-clear; the subject (a
person or a named system/service); the status; the **As At** freshness timestamp; the **re-attestation
cadence and next-due time**; and the salt.

**What this proves and does not prove.** It proves **the domain owner publicly and freshly asserts
all is well** — an authenticated, dated, affirmative reassurance, with a scheduled promise of the next
one. It does **not** independently confirm that the account is in fact uncompromised or the system in
fact healthy; that is the owner's word. But a *domain-anchored, freshly-dated owner's word* is the
useful thing here: it lets a recipient trust the owner's own channel over an impersonator, on the
strength of a reassurance an impersonator cannot forge or keep current from the outside.

## Data Visible After Verification

The verifier sees the asserting domain, the subject, the status, the cadence/next-due, and — above
all — the **As At** timestamp. **Freshness relative to the stated cadence is the load-bearing
signal.** A status string alone means little; "OPERATING NORMALLY *as of a recent moment, with the
next attestation not yet overdue*" is what carries weight.

**Status Indications:**

- **ALL_CLEAR / OPERATIONAL** — The owner affirmatively asserts all is well *as of the As At
  timestamp*, and the next-due time has **not** passed. Trustworthy to the degree the As At is recent
  and the cadence is being kept.
- **STALE / OVERDUE** — The claim still verifies and still says all-clear, but the **As At** is older
  than the stated cadence allows — the **next-due** time has passed. **This is the alarm.** Per
  fail-loudly, it is surfaced **plainly**, and read in exactly one direction: **the owner stopped
  affirming.** It is **not** a confirmed incident — it does **not** mean "definitely compromised /
  definitely down." It means "treat the all-clear as expired; the owner went quiet on schedule, so
  seek a fresher signal or the incident channel before relying on this." This is the honest residual
  ambiguity made visible, dated, and actionable.
- **SUPERSEDED-BY-INCIDENT** — The owner replaced the all-clear with an affirmative *warning*. The
  endpoint can transition from all-clear into an incident, so the same `vfy:` line later reads as a
  live warning (see the [incident sibling](view.html?doc=live-incident-status-attestations)). This is
  the clean, unambiguous case: the silence never had to be interpreted, because the owner affirmatively
  said what changed.
- **404 / No Claim** — No such all-clear exists at this domain for this text. Stated plainly: there is
  no published reassurance from this owner for this claim — never quietly softened into "probably
  fine." Absence of an all-clear is not an all-clear.

## Second-Party Use

The **owner / operator** benefits directly. A person gets an attacker-proof, freshly-dated way to say
"my account is fine, ignore impersonators" from a domain an impersonator cannot reach or keep current.
An operator gets a verifiable, spoof-resistant "we're healthy" that integrators can check on demand,
instead of an unauthenticated, undated status page that anyone could fake and that says nothing about
*when* it was last true.

## Third-Party Use

**Contacts and counterparties** — someone unsure whether a message is really from the owner checks the
owner's domain, finds a fresh all-clear, and trusts the genuine channel over the impersonator. If the
all-clear is **overdue**, they hold off and seek a fresher signal rather than assuming the worst.

**Integrators and downstream systems** — a service consuming the payments API checks the operator's
status endpoint; a fresh OPERATIONAL lets it attribute its own errors to its own side, while an
**overdue** all-clear prompts it to treat the dependency as uncertain and degrade cautiously — acting
on a *verified, dated* signal rather than guessing.

**Platforms and trust-and-safety teams** — can confirm an account's owner is affirmatively vouching
for it (and how recently) before weighing a report against it.

## Verification Architecture

The mechanism is the standard `text → normalize → SHA-256 → GET`. Two things distinguish it:

**The cadence makes "stale" well-defined.** Because the re-attestation cadence and the **next-due**
time are inside the hashed text, a verifier does not have to reconstruct an implied schedule or guess
how long is "too long." The claim itself states when the next fresh attestation is expected; **STALE /
OVERDUE** is simply "now is past next-due." This is the architectural answer to the warrant canary's
unsolved monitoring problem, applied affirmatively — the *expectation of the next attestation* is part
of the verifiable claim, exactly the "scheduled attestation primitive" the canary doc set as a
condition for moving canaries back into scope.

**Freshness re-attestation.** While the subject is healthy, the issuer keeps the **As At** current —
re-attesting on the stated cadence so the claim reads as freshly clear. The endpoint returns the
changing "as of" detail ("clear as of 09:00, next due 09:00 tomorrow"; later "clear as of tomorrow
09:00, next due …"). This is the [point-in-time vs current](../../docs/point-in-time-vs-current.md)
freshness mechanic applied to an affirmative claim: the value depends entirely on being current, so
the *recency of the As At, measured against the promised cadence*, is exactly what the verifier reads.
When the issuer stops re-attesting, the claim goes **overdue** — and that overdue state is the signal
to re-check, not a verdict of harm.

## The honest limit

This is **self-asserted, not independently confirmed.** The endpoint proves the domain owner *claims*
all is well — it does not prove the account is genuinely uncompromised or the system genuinely healthy.
A mistaken or malicious owner could publish a false all-clear.

And the residual canary ambiguity remains, in attenuated form. A **STALE / OVERDUE** all-clear is
**ambiguous in one direction**: it cannot tell you *why* the owner stopped affirming — something wrong,
or merely boredom, a holiday, a lapsed job. The improvement over the warrant canary is real but
bounded: because the claim is affirmative and the cadence is explicit, the lapse is **precise and
dated** (you know exactly when the reassurance aged out and exactly when it was due) rather than an
open-ended silence you must interpret. That converts "has it been quiet too long?" into "the all-clear
is overdue as of a known time — go look." It is a meaningfully better-specified canary. It does **not**
claim to resolve the silence-is-ambiguous problem that benched the warrant canary — only to date it,
schedule it, and surface it loudly enough to act on.

## Privacy Salt

The salt is required. All-clear claims are short and low-entropy (a name or service, a status, a
timestamp), so without a per-claim salt an attacker could enumerate or pre-compute likely claims. The
salt — generated by the owner and present in the verifiable text — makes each claim's hash unique and
unguessable, while the endpoint discloses only the status, freshness, and cadence detail the owner
chose to publish.

## Authority Chain

**Pattern:** Personal / Self-Attested (for a person); Commercial / operator-attested (for a system).

For a person vouching for their own account, the claim is asserted from their own domain with no
regulatory chain — legitimately **unanchored**, judged on the credibility of the domain itself:

```
✓ fredflintstone.example/status/v — Owner affirmatively vouches this account is operating normally,
  freshly re-attested (self-attested; legitimately unanchored — judged on the domain itself)
```

For a system all-clear, the operator's domain attests its own service status:

```
✓ status.acme.example/status/v — Operator affirmatively reports this service operational, re-attested
  on cadence (self-attested operator status; judged on the operating domain)
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md). Where a healthy state is
interrupted, the chain continues into the incident sibling at
[live-incident-status-attestations](view.html?doc=live-incident-status-attestations); when that
incident resolves, it returns here.

## Further Derivations

None currently.

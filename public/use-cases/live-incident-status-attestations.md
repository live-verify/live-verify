---
title: "Live Incident & Ongoing-Warning Status (Self-Attested)"
category: "Novel Document Types"
volume: "Large"
retention: "Incident duration (ongoing) + archival record"
slug: "live-incident-status-attestations"
verificationMode: "clip"
tags: ["live-status", "incident", "account-compromise", "ongoing-warning", "freshness", "self-attested", "affirmative-canary", "liveness", "cross-channel-trust", "system-status"]
furtherDerivations: 1
---

## The Problem

Something is wrong **right now**, and the person or system it is wrong *about* needs a way to say
so that strangers can trust. Two everyday shapes:

- **A hacked account.** Fred Flintstone's X account is sending strange DMs asking contacts to wire
  money. Fred knows he's been hacked. But the one channel his contacts are watching — the X
  account — is the channel the attacker now controls. Anything Fred posts *there* is suspect, and
  anything the attacker posts there ("ignore the previous message, this is really me") is
  indistinguishable from a genuine correction. Fred cannot warn people through the compromised pipe.
- **A degraded system.** A payments API is throwing 5xxs. Integrators are seeing failures and don't
  know whether it's their bug or the provider's outage. The provider knows, but a tweet or a status
  page is just an unverifiable assertion that anyone could spoof, and a stale page is worse than
  none.

In both cases the missing thing is the same: an **affirmative, currently-true, freshly-timestamped
warning**, bound to a domain the *owner* controls, that a recipient can check on demand — so a weird
message from a compromised channel, or an unexplained outage, can be confirmed against the owner's
own published "yes, this is happening, as of right now."

## The affirmative successor to the warrant canary

Live Verify moved warrant canaries out of the active catalogue (see
[the canary discussion](../../docs/warrant_canary_discussion.md)). The reason is structural, not
incidental: a canary signals by **absence**. You publish "no warrant received," and observers must
*infer* trouble when the statement **stops** appearing. That inference is fragile — did the canary
stop because of a gag order, because the server went down, because the cron job died, or because
someone was on holiday? Verifying *absence* is a monitoring problem, not a verification problem, and
the project's architecture verifies **presence**.

This use case is the **opposite, and stronger**. The signal is not silence — it is a live,
timestamped, **affirmative** claim that something is currently true. Instead of "infer danger when I
go quiet," it is "I am telling you, affirmatively and freshly, that this is happening now." There is
no ambiguity to resolve about *why* a thing is absent, because nothing is absent: the warning is
present, signed to a domain, and dated. The canary doc itself anticipated exactly this — its
"what would change our mind" list names a **"scheduled attestation primitive where the *expectation*
of a future document is itself a verifiable claim."** A freshly re-attested ongoing warning is that
primitive in its simplest affirmative form. The absence-based canary asks the observer to watch for
nothing; this asks the issuer to keep saying something, and lets the *freshness* of that something
carry the signal.

## What gets attested

The owner of a thing — a person about their account, an operator about their system — publishes a
short, affirmative status claim bound by a `vfy:` line to a domain **they** control:

```
ACCOUNT COMPROMISE WARNING
Status: ONGOING
As At: 2026-06-27 09:14 UTC
vfy:fredflintstone.example/status/v
```

Three things make it work:

1. **It is affirmative.** It states a condition that *is true now*, not a thing whose disappearance
   you must notice.
2. **It is fresh.** The **As At** timestamp is the load-bearing field. The endpoint keeps it
   current while the incident is live, and the value of the whole claim is "ongoing *as of a recent
   moment*."
3. **It is domain-anchored to the owner.** Critically, it is bound to a domain the *attacker does
   not control* (Fred's personal site), or the operator's own status domain — not to the
   compromised channel and not to a third-party monitor.

## Example: Person

A contact who receives a strange message from `@fredf` can check Fred's own domain and find Fred
publicly warning that the account is compromised:

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #7a1f1f; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <span verifiable-text="start" data-for="incident"></span>
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;">ACCOUNT COMPROMISE WARNING
═══════════════════════════════════════════════════════════════════

Subject:           Fred Flintstone
Channel affected:  twitter/x @fredf
Incident:          Lost control of the account after a hack
Started:           2026-02-02
Status:            ONGOING
As At:             2026-06-27 09:14 UTC
Salt:              K4P9X2M7

Do not trust messages from the affected channel until this
warning is withdrawn. Treat money or credential requests there
as fraudulent.

<span data-verify-line="incident">vfy:fredflintstone.example/status/v</span></pre>
  <span verifiable-text="end" data-for="incident"></span>
</div>

The red border marks this as a **warning**, not a clearance. The contact does not have to decide
whether to trust the suspicious DM on its own merits — they check Fred's domain, see a fresh
ONGOING warning, and disbelieve the channel.

## Beyond persons: systems

The same primitive applies to systems, not just people. An operator publishes the identical shape
about their own infrastructure:

```
SERVICE INCIDENT
Service: payments-api  Status: ONGOING (degraded)
Started: 2026-06-27 14:20 UTC   As At: 2026-06-27 14:38 UTC
vfy:status.acme.example/incident/v
```

This is deliberately **elective and self-attested** — the operator chooses to publish, and it is
*their* word about *their* system, anchored to *their* domain. It is **not** a centralized
monitoring service and **not** Down Detector: there is no third party probing the API and inferring
health from the outside. The operator affirmatively asserts the state and keeps the **As At** fresh.

The affirmative all-clear — "we checked, nothing is wrong, as of now" — is the sibling pattern;
when an incident **resolves**, the natural next attestation is an all-clear. See
[Live All-Clear / Affirmative-Canary Status](view.html?doc=live-allclear-canary-status) for that
positive-status counterpart.

## Data Verified

That the controller of the named domain currently asserts this incident/warning; the subject (a
person or a named system); the affected channel or service; the stated start time; the **As At**
freshness timestamp; the status; and the salt.

**What this proves and does not prove.** It proves **the domain owner publicly asserts this
incident is ongoing** — an authenticated, dated, affirmative warning. It does **not** independently
confirm that the hack or outage actually occurred; that is the owner's word. But a *domain-anchored
owner's word* is precisely the useful thing here: it lets a recipient stop trusting messages coming
from the owner's compromised channel, on the strength of the owner's own out-of-band, attacker-proof
declaration.

## Data Visible After Verification

The verifier sees the asserting domain, the subject, the affected channel/service, the start time,
the status, and — above all — the **As At** timestamp. **Freshness is the load-bearing signal.** A
status string alone means little; "ONGOING *as of a recent moment*" is what carries weight.

**Status Indications:**

- **ONGOING** — The owner affirmatively asserts the incident is live *as of the As At timestamp*.
  Trustworthy only to the degree the As At is recent.
- **ESCALATED / CHANGED** — Still ongoing, but the situation moved (scope widened, severity rose);
  the endpoint may carry updated post-verification detail ("now also affects @fredf.bsky").
- **RESOLVED** — The owner affirmatively withdrew the warning, with a resolution timestamp
  ("resolved as of 2026-06-27 11:30 UTC"). The endpoint can transition from ONGOING to RESOLVED in
  place, so the same `vfy:` line later reads as cleared.
- **STALE / AS-AT-OLD** — The claim still verifies and still says ONGOING, but the **As At** is no
  longer recent. Per fail-loudly, this is surfaced **plainly** and must **not** be read either as
  "definitely still ongoing" or as "definitely resolved." It means **the owner stopped updating —
  re-check.** A stale ongoing warning is a prompt to seek a fresher signal, not a conclusion.
- **404 / No Claim** — No such warning exists at this domain for this text. Stated plainly: there is
  no active warning from this owner for this claim — never quietly softened into "probably fine."

## Second-Party Use

The **owner / operator** benefits directly. A hacked person gets an attacker-proof way to warn their
contacts: they can't be trusted *through* the compromised account, but their own domain can carry
"don't trust my X account right now." An operator gets a verifiable, spoof-resistant incident notice
that integrators can check on demand, instead of an unauthenticated status page anyone could fake.

## Third-Party Use

**Recipients of suspicious messages** — a contact who gets a money request from `@fredf` checks
Fred's domain, finds a fresh ONGOING warning, and refuses the request. The warning travels on a
channel the attacker cannot reach.

**Integrators and downstream systems** — a service consuming the payments API checks the operator's
incident endpoint, confirms a fresh ONGOING degradation, and trips its own circuit-breaker or status
banner on a *verified* signal rather than guessing.

**Platforms and trust-and-safety teams** — can confirm that an account-compromise warning genuinely
originates from the domain-anchored owner before acting on it (e.g. freezing the affected account),
rather than acting on a claim that could itself be the attacker.

## Verification Architecture

The mechanism is the standard `text → normalize → SHA-256 → GET`. Two things distinguish it:

**Freshness re-attestation.** While the incident is live, the issuer keeps the **As At** current —
re-attesting on a schedule so the claim reads as freshly ongoing. The endpoint returns the changing
"as of" detail ("ongoing as of 09:14", later "ongoing as of 10:02", later "resolved as of 11:30").
This is the [point-in-time vs current](../../docs/point-in-time-vs-current.md) freshness mechanic
applied affirmatively: the value of the claim depends on being current, so the *recency of the As At*
is exactly what the verifier reads. When the issuer stops re-attesting, the claim goes **stale** —
and staleness is the signal to re-check, not a verdict either way.

**Cross-channel trust.** The whole design rests on the warning living on a *different* domain from
the compromised channel. The attacker controls `@fredf`; they do **not** control
`fredflintstone.example`. So the owner's domain can authoritatively warn about the owner's
compromised channel — the cross-channel trust the project is built on, here turned inward to let a
victim discredit their own captured account.

## The honest limit

This is **self-asserted, not independently confirmed**. The endpoint proves the domain owner
*claims* the incident — it does not prove the hack or outage happened. A malicious or mistaken owner
could publish a false warning. The honest scope is narrow and real: it converts an unverifiable,
spoofable, often out-of-reach warning into a **domain-anchored, dated, affirmative one** that an
attacker on the compromised channel cannot forge or suppress. That is enough to do the job —
discrediting a captured channel from a place the attacker can't touch — without overclaiming to be
an independent adjudication of the underlying event.

## Privacy Salt

The salt is required. Incident warnings are short and low-entropy (a name, a channel, a status), so
without a per-claim salt an attacker could enumerate or pre-compute likely warnings. The salt —
generated by the owner and present in the verifiable text — makes each claim's hash unique and
unguessable, while the endpoint discloses only the status and freshness detail the owner chose to
publish.

## Authority Chain

**Pattern:** Personal / Self-Attested (for a person); Commercial / operator-attested (for a system).

For a person warning about their own compromised account, the claim is asserted from their own
domain with no regulatory chain — legitimately **unanchored**, judged on the credibility of the
domain itself:

```
✓ fredflintstone.example/status/v — Owner affirmatively warns this channel is compromised
  (self-attested; legitimately unanchored — judged on the domain itself)
```

For a system incident, the operator's domain attests its own service status:

```
✓ status.acme.example/incident/v — Operator affirmatively reports this service incident, ongoing
  (self-attested operator status; judged on the operating domain)
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md). Where an incident later
resolves into an affirmative clearance, the chain continues into the all-clear sibling at
[live-allclear-canary-status](view.html?doc=live-allclear-canary-status).

## Further Derivations

None currently.

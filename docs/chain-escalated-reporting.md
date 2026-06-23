# Chain-Escalated Reporting: Routing a Report Past the Complicit Party

## The problem with reporting fraud to the party that committed it

When an end user sees something wrong — a malvertising ad, a scam placement, a fraudulent supply
chain — the natural "report this" action usually lands the complaint with whoever is most
proximate: the party who served the thing. In an ad supply chain that is frequently **the party
with the strongest incentive to bury the report** — a complicit re-seller or network that placed the
bad ad and would prefer no one above them ever hears about it.

The [ad-placement-provenance](../public/use-cases/ad-placement-provenance.md) chain already makes the
whole supply chain visible on demand. **Chain-escalated reporting** uses that resolved chain as the
*routing table* for a report — so the complaint flows to the honest, accountable parties **first**,
and reaches the complicit party (if any) **last**, by which point the parties who can cut them off
have already had their chance to act.

## The mechanism

A user invokes a safe-sequence "report this" gesture on the ad (or content). The report is then
escalated **root-first** down the resolved provenance chain:

1. **The report payload is the whole chain, from the browser's point of view** — the complete
   resolved provenance chain (advertiser → network → exchange → publisher proxy → …), plus the page
   URL where it appeared. This is **self-evidencing**: any recipient can re-walk and re-verify the
   exact chain the reporter saw, so the report can't be dismissed as hearsay.
2. **The root gets first dibs.** The report goes to the chain's **root** first (see *Who is the
   root?* below — crucially, **not** the publisher who served it).
3. **Consume-and-stop.** If a party **consumes** the report — acknowledges it and takes
   responsibility for acting on it — escalation stops; it does not bubble further.
4. **Otherwise it steps down the chain.** If the root doesn't consume it, the report goes to the
   next entry toward the leaf (the exchange, then the network, then the re-seller…), one step at a
   time, until someone consumes it.

### Why root-first is the whole point

The party *knowingly complicit* in fraud is typically **far from the root** — a rogue re-seller or
network deep in the chain. Root-first routing deliberately sends the report **past** them to the
honest parties above them *first*. A complicit re-seller cannot quietly swallow a complaint about
their own fraud, because:

- the report reaches the parties who hold **indemnity contracts over them** and who would want to
  **cut them off** *before* it reaches the re-seller themselves;
- by the time the report could reach the complicit party, the honest parties above have already had
  the opportunity to act on and isolate them.

It inverts who controls the complaint: today the bad actor often sees it first; here the bad actor
is **last** to see it, behind everyone with reputation and contracts to protect.

## Who is the root? — an honest, curated anchor, not the publisher

A root-first cascade is only safe if the root is honest. If the "root" were simply the publisher who
served the ad, a **complicit publisher** could take first dibs and consume-to-suppress — the very
failure root-first is meant to prevent, reintroduced at the top. So the root **must not be a party in
the chain who could be complicit.**

The answer is the same shape as [sovereign roots](sovereign-roots.md) for credential chains: a
**curated list of honest ad-placement roots**, governed neutrally. Concretely:

- A platform that operates the gesture — say **Google via Chrome** — must **not bias toward itself**
  as the root. It does not get to be the place reports terminate by virtue of running the browser.
- Instead, the browser anchors to a **curated, public, versioned list of honest ad-placement-root
  bodies** — ideally maintained by a **501(c)(3) / non-profit association** (the
  [Let's Encrypt / ISRG governance pattern](lets-encrypt-precedent.md) and the
  [PSL-style stewardship](sovereign-roots.md#governance-maintained-like-the-psl-not-by-an-anointed-authority)
  this project uses for sovereign roots). The list says *which* parties are trusted to receive
  reports first and route them honestly — vetted for exactly that.
- **Liability anchor vs. report root are two different anchors.** In the provenance use case the
  *publisher's domain* remains the **liability** anchor (the accountable party who let the ad in).
  The honest curated root is the **reporting** anchor (where the report cascade starts). The publisher
  is still *in* the chain and still gets the report — just not *first*, and not as the party who can
  terminate it.

This is why there is **no complicit root**: the root is honest by construction, vetted by a neutral
non-profit, not self-appointed by the largest platform and not the publisher who served the ad. The
complicit party is always *below* the honest anchor, and the cascade is designed to reach the honest
parties above them first.

## Consumption

"Consume" means a party formally accepts the report and responsibility for acting on it, stopping
escalation. Because the root is honest by construction, consumption is safe to treat as terminal —
the concern is no longer a bad actor swallowing it, but ensuring the act is on the record:

- The reporter receives a **receipt** (a `tx`-style verification receipt — see
  [Verification Response Format](Verification-Response-Format.md)) recording that the report was made,
  the chain it described, and which level consumed it.
- Consumption is an **act, not a black hole** — fitting the project's fail-loudly discipline, *that* a
  report was consumed at level N is a checkable fact, even where the contents stay private to the
  recipient and any regulator.

## What the report is, and is not

- **It is:** a user-initiated, self-evidencing account of *what chain served what, where* — the
  resolved provenance chain plus the URL, routed to honest parties first.
- **It is not** an adjudication of fraud. Like the provenance reveal itself, it surfaces and routes;
  it does not decide guilt. The recipients (honest roots, networks, ultimately regulators) act on it.
  Consistent with the [provenance-not-policing](../public/use-cases/ad-placement-provenance.md) stance:
  this routes accountability, it does not scan payloads.

## Relationship to the rest of the protocol

- It rides the [ad-placement-provenance](../public/use-cases/ad-placement-provenance.md) chain as its
  routing table, and is a [post-verification action](post-verification-actions.md) (the POST-report
  pattern, under the "never discouraged" principle — reporting is always welcomed).
- Its honest-root anchoring is the [sovereign-roots](sovereign-roots.md) pattern applied to ad
  placement: a curated, neutrally-governed list is what makes the chain-walk — here, the report
  cascade — trustworthy rather than theatre.
- The governance model is the [Let's Encrypt / non-profit-steward](lets-encrypt-precedent.md) one the
  project reaches for whenever a shared list must be trusted by rivals.

## Related

- [Ad Placement Provenance](../public/use-cases/ad-placement-provenance.md) — the chain this routes
  along; carries the user-facing "Reporting up the chain" section.
- [Sovereign Roots](sovereign-roots.md) — the curated-honest-anchor pattern this reuses for the
  ad-placement-roots list.
- [Post-Verification Actions](post-verification-actions.md) — the report-action framework and the
  "never discouraged" principle.
- [Safe-Sequence Platform Disclosure](safe-sequence-platform-disclosure.md) — the branch the gesture
  belongs to.

# Sovereign Roots: The Anchor List That Makes Authority Chains Mean Something

## Why this list has to exist

The [authority chain](authority-chain-spec.md) lets a verifier walk `authorizedBy` links from an
issuer upward to a root. The [app-display](authority-chain-app-display.md) doc shows how that walk
is rendered. But a chain that can terminate *anywhere* answers no question worth asking.

Consider the attack. A fraudster registers three domains and has them endorse each other:

```
✓ warrant-cards.example.com — Issues UK police warrant cards
  ✓ police-oversight.example.net — Regulates UK police credentials
    ✓ official-uk-verification-registry.org — UK government root namespace
```

Every node returns HTTP 200. Every `authorizedBy` link resolves. The chain is internally
consistent and the app would render it just as handsomely as the real
`elmstreetmedical.nhs.uk → gmc-uk.org → gov.uk` chain. The fraudster controls all three domains,
so they can make the endpoints say anything — including that the top one is "the UK government
root namespace."

**Without a known-roots list, the authority-chain UI is not neutral — it is worse than nothing,
because it manufactures trust theater.** It makes "somewhere" look official. A chain display only
means something if the app can answer one question the chain itself cannot answer: *does this chain
terminate at a root that is actually sovereign?* That answer cannot come from walking the chain —
the root is the one node that cannot prove itself by reference to anything higher (`gov.uk` is the
UK Government because it is). It has to come from a list the app already holds.

This is not optional hardening layered on top of the authority-chain feature. **It is the
precondition for shipping the authority-chain feature at all.** An app that renders chains without
anchoring them should not render them.

## The precedent: this is a root store, not an invention

The shape of this artifact is already familiar, and this project already depends on two instances
of it:

- **Browsers ship a CA root store** — roughly 150 curated trust anchors. A TLS certificate means
  "verified" only because it chains to one of them. The exact same logic applies here.
- **This repo already embeds the Public Suffix List** (see `public/domain-authority.js`) — a
  public, versioned, community-maintained list of ~10,000 entries that ships in every browser and
  in this project's apps via the same `sync-shared` path.

A sovereign-roots list is the same *kind* of artifact: public, versioned, diffable, PR-able, and
bundled into the apps. The PSL precedent also answers the governance question before it is asked —
see [Governance](#governance-maintained-like-the-psl-not-by-an-anointed-authority) below.

## It's namespace rules, not "200 domains"

The naive framing — "hardcode ~200 sovereign domains" — is wrong in a way that matters. In most
countries the root is not one domain but a **registry-controlled namespace**, and the list is a set
of *patterns plus explicit entries*, not a flat domain list. The categories:

1. **Government namespaces (wildcard).** Where a registry controls an entire suffix and admits only
   government bodies, the rule is a pattern:
   - `*.gov.uk` (GDS controls all `.gov.uk` subdomains)
   - `*.gov` (US — CISA controls the entire `.gov` TLD, so any `.gov` is an anchor without
     enumerating 50 states and thousands of municipalities)
   - `*.gc.ca`, `*.gouv.fr`, `*.bund.de`, `*.gov.au`
2. **Sub-sovereign anchors (the part that grows the list).** Federal countries regulate many
   professions at the state level — the state *is* the sovereign, not the nation (see the
   app-display doc's Federal vs. State section). These need explicit entries:
   - US states: `texas.gov`, `ny.gov`, `california.gov`, … (covered by the `*.gov` wildcard)
   - German Länder: `bayern.de`, `sachsen.de`, … (~16, individually listed — no clean suffix)
   - Australian states, `gov.scot`, `gov.wales`, Indian state/UT domains (~28)
3. **Explicit domains where there's no clean suffix.** Countries whose government domains don't sit
   under a single registry-controlled suffix need each root listed by hand.
4. **Treaty-based international organisations.** `un.org`, `who.int`, `wipo.int`, `worldbank.org`,
   `europa.eu` — a couple dozen IGOs with a sovereign-equivalent basis.

Realistically a few hundred patterns. Still tiny: the PSL is ~10,000 lines and ships everywhere.
The canonical seed for this list is the two tables already in
[authority-chain-app-display.md](authority-chain-app-display.md#hardcoded-root-trust-anchors) —
this doc is where their format, semantics, and governance are specified; that doc is where the
current contents live until the list is extracted into its own bundled file.

### List format

Each entry is a pattern (or exact domain), a jurisdiction, a type, and the hardcoded description the
app shows when the walk terminates here:

```jsonc
[
  {
    "match": "*.gov.uk",          // suffix wildcard, exact domain, or registry-suffix rule
    "jurisdiction": "GB",         // ISO 3166-1 alpha-2 (or alpha-2 + region for sub-sovereign)
    "type": "government",         // government | sub-sovereign | igo
    "description": "UK government root namespace",
    "formalName": "Government Digital Service, Cabinet Office"
  },
  {
    "match": "bayern.de",
    "jurisdiction": "DE-BY",
    "type": "sub-sovereign",
    "description": "Bavarian state government",
    "formalName": "Bayerische Staatskanzlei"
  },
  {
    "match": "who.int",
    "jurisdiction": "INT",
    "type": "igo",
    "description": "World Health Organization",
    "formalName": "World Health Organization"
  }
]
```

The `description`/`formalName` for roots are **hardcoded in the list, not fetched** — the root is
the one node whose self-description the app must not trust over its own knowledge. (A captured
`gov.uk` subdomain could otherwise relabel itself.) For every node *below* the root, descriptions
still come from that node's `verification-meta.json` as the app-display doc specifies.

## The list informs; it does not gate

Verification and anchoring are **two separate signals** and the UI must keep them separate:

- **Verification** — "the issuer's domain stands behind this hash right now" (HTTP 200 +
  `{"status":"verified"}`). This is the primary check and is unchanged by any of this.
- **Anchoring** — "that issuer's chain reaches a known sovereign root." A *secondary*, contextual
  signal.

A document can verify perfectly and be legitimately unanchored — a peer reference on
`paulhammant.com/refs` is a real, valid attestation with no government in its chain, by design (the
**Personal** authority pattern). Painting it red would be a category error and would break the
human-in-the-loop principle the homepage and app-display doc both rest on.

### Three states

| State | When | UI treatment |
|---|---|---|
| **Anchored** | Chain terminates at an entry in the list | Green. **Name the jurisdiction** — "Anchored to UK government" — not just a checkmark. The jurisdiction is the useful payload. |
| **Unanchored** | Chain terminates at a domain *not* in the list | **Amber, not red.** "This chain ends at `example.com`, which is not a known sovereign root — judge this domain yourself." Correct for personal/commercial issuers. |
| **No chain** | No `authorizedBy` header at all (self-attested) | Neutral. "Self-attested; no authority chain presented." Already covered by the app-display doc's *Absence of Chain*. |

Amber is the important one. It is the state the trust-theater attack lands in: the fraudster's
`official-uk-verification-registry.org` is *not* in the list, so the chain that looked official now
reads "ends at a domain not known to be sovereign — judge it yourself." The attack doesn't get a
green light; it gets a "you're on your own here," which is the honest answer.

### Fail loudly if the list can't load

Per the project's [fail-loudly rule](../LLM.md), if the bundled anchor list cannot be loaded the app
must display **"anchor status unavailable"** and show the chain *without* anchoring claims — never
silently skip the check and render chains as though unanchored, and never fall back to treating
everything as anchored. Absence of the list is a loud, visible condition, not a degraded-but-quiet
one. (No retry/fallback logic added on initiative — surfacing the condition is the whole behaviour.)

## The jurisdiction-mismatch heuristic

The conversation that prompted this doc raised a "geo warning" — *warn the user when they're
physically distant from the root verifier.* The instinct is right; the mechanism has to be precise.

**Compare jurisdictions, not geography.** IP-geolocating the verification endpoint is meaningless —
it resolves to a CDN, not to a ministry. The useful comparison is:

> the chain anchors to jurisdiction **X**; the verifier appears to be in jurisdiction **Y**.

And it must be phrased as **context, not alarm.** A passport at a border, a bill of lading at a
port, a tourist's foreign credentials, an overseas university transcript are all legitimately
foreign-rooted. A blanket "foreign credential!" warning would cry wolf constantly and train users to
dismiss it.

The high-value case is the **in-person power-asymmetry scenario** the
[urgent-verification doc](urgent-verification-framing.md) covers: someone at your Edinburgh door
presenting a warrant card whose chain anchors to a sovereign that **isn't the UK** deserves a
loud, specific prompt — *"This credential is anchored to [jurisdiction X]. Expected?"* — because the
mismatch is exactly the tell in that context.

### Where the "expected" jurisdiction comes from

Critically, **the expected root cannot come from the issuer's own `verification-meta.json`** — a
fraudulent issuer would simply declare itself expected. It has to come from the **verifier's side**:
their own country, inferred at **country granularity** from locale / SIM region / timezone.

- **Never GPS, never fine location.** Country-level inference from locale/SIM/timezone keeps the
  privacy posture intact — no precise-location permission, no tracking, consistent with the rest of
  the system never touching the user's location.
- The signal is "the device thinks it's in country Y," which is all the heuristic needs.
- This is a *prompt*, not a *block*. The app says "anchored to X; you appear to be in Y — expected?"
  and the human decides. It never refuses to display.

## Governance: maintained like the PSL, not by an anointed authority

Who decides what's a sovereign root? If the answer is "a central authority blesses the list," the
standard has quietly reintroduced the single gatekeeper it was designed not to have — the same
disintermediation argument that runs through the rest of this project.

The answer is the **Public Suffix List model**: a public, versioned list in the open, changed by
pull request with documented criteria, reviewed by maintainers, bundled into releases. It is
diffable and auditable; anyone can see exactly which roots an app trusts and challenge an entry.
This is the same governance the [Let's Encrypt precedent](lets-encrypt-precedent.md) identifies as
what lets rival adopters co-trust an artifact — neutrality is what makes shared infrastructure
shareable.

Entry criteria (to be refined as the list forms):

- A government namespace qualifies if a national registry demonstrably restricts it to government
  bodies (the `.gov` / `.gov.uk` property).
- A sub-sovereign entry qualifies where that level is the *actual* sovereign for some regulated
  activity (Texas for attorney admission, Bavaria for bar admission) — not merely a regional
  subdivision.
- An IGO qualifies on a treaty basis with a stable, registry-controlled domain.
- Everything else is **unanchored on purpose** — and unanchored is a fine, common, honest state, not
  a failure.

## The unsolved-but-survivable problem: root compromise and change over time

This must be stated plainly in any design that ships the list, because it is the one genuinely hard
part:

- **Roots change.** Governments rebrand and re-domain. `gov.uk` itself is only ~15 years old; a
  ministry can move, merge, or retire a domain. A compile-time-only list goes stale and starts
  showing amber for chains that are actually fine.
- **Roots can be captured.** A spoofed or compromised ministry subdomain is the exact equivalent of
  a **rogue CA** in the TLS world — a node the list vouches for that an attacker now controls. This
  is not hypothetical; it is the well-understood failure mode of every root store.

The TLS world handles both with the same mechanism: **list updates and revocations**, shipped out of
band from the compile. The implication for Live Verify is concrete:

> The anchor list needs an **update channel in the apps** — not just a compile-time bundle. A
> versioned list with a signed update feed (and the ability to *remove* a captured root quickly),
> on the same footing as how browsers push CA distrust. Build the list as data with an update path
> from day one, not as a constant baked into a release.

This is survivable precisely because it is a solved problem in an adjacent domain — but it is not
free, and a design that bundles the list without an update/revocation channel has shipped a root
store that can never be corrected.

## Scope: what this doc is and isn't

This is the **design note**. It specifies the list's format, the three-state semantics, the
jurisdiction-mismatch heuristic, PSL-style governance, and the root-compromise/update-channel
requirement.

**Wiring it into the apps is separate, later work:** extracting the seed tables from
[authority-chain-app-display.md](authority-chain-app-display.md) into a bundled data file,
distributing it via the `sync-shared` path alongside the PSL, implementing the three-state amber UI
in the iOS/Android/extension chain renderers, the country-inference heuristic, and the signed update
feed. None of that is built yet. This doc is the spec it should be built against.

## Related

- [authority-chain-spec.md](authority-chain-spec.md) — the four authority patterns and the
  `authorizedBy` walk this list anchors.
- [authority-chain-app-display.md](authority-chain-app-display.md) — how chains render; currently
  holds the seed root tables this doc governs.
- [urgent-verification-framing.md](urgent-verification-framing.md) — the power-asymmetry,
  in-person scenarios where the jurisdiction-mismatch prompt earns its keep.
- [lets-encrypt-precedent.md](lets-encrypt-precedent.md) — the CA root store as precedent and the
  neutral-steward governance argument.
- [decentralized-trust-graphs.md](decentralized-trust-graphs.md) — why the list informs rather than
  gates, in keeping with the no-central-gatekeeper posture.

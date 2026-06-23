# Web-Page Region Provenance: Who Put This Part of the Page Here?

## The general primitive under the ad work

A modern web page is not one document from one author. It is **assembled at load time** from content
the publisher wrote *plus* regions injected by third (and fourth, and fifth…) parties — and the
person reading it usually cannot tell which is which, or who is accountable for the injected parts.
Ads are the most fraud-ridden instance of this, but they are an *instance*, not the whole of it.

The underlying question is general: **for any region of a page that did not originate with the
publisher, who placed it here, and who stands behind it?** Call it **web-page region provenance**.

This generalization is not a stretch onto the ad work — it is the ad work's own premise. The
[ad-placement-provenance](../public/use-cases/ad-placement-provenance.md) use case cites the
[ad-infinitum demo](https://github.com/paul-hammant/ad-infinitum), whose stated scope is explicitly
broader than ads: *"Not just ads, but any content in a page from a third party. Or fourth or fifth
party, etc."* Ad provenance is that primitive applied where the stakes — fraud, liability, regulation
— are highest.

## What counts as an injected region

Anything the publisher's own page did not author, dropped into the page by a third party:

- **Advertisements** — the canonical case: a placement injected through a supply chain of
  exchanges, networks, and re-sellers.
- **Sponsored / native content** — a "recommended" unit, a paid article styled as editorial, a paid
  "top result." (Already written up — see *Existing instances* below.)
- **Embedded widgets** — a comment system, a chat widget, an embedded map, a social-login button, a
  payment iframe, a "share" bar.
- **Syndicated / re-hosted content** — a wire-service article republished, an embedded post or quote
  (oEmbed), a re-hosted image.
- **Page-mutating third-party scripts** — A/B-test and personalization tools, affiliate-link
  injectors, recommendation engines that reorder the page.

In every one, the structural problem is identical: *a region of the page is the responsibility of
some party other than the publisher, and that responsibility is invisible to the reader.* Region
provenance makes it surfaceable on demand.

## The shape it inherits

Web-page region provenance is a member of the [Safe-Sequence Platform Disclosure](safe-sequence-platform-disclosure.md)
branch, and inherits that branch's properties:

- **The platform/page is the subject.** The user turns verification *inward* — "what is this part of
  the page, and who put it here?" — rather than presenting a credential.
- **Invoked by a non-overridable gesture.** Right-click / long-press on the region, drawn by the
  browser, which the injected region cannot intercept or fake.
- **Absence is the finding.** A region with no provenance — no one will say who placed it — is itself
  the signal, exactly as a missing ad manifest is in ad provenance.

Where a region's provenance forms a chain of responsible parties, it can also carry
[chain-escalated reporting](chain-escalated-reporting.md): a user report routed root-first to honest
parties before the possibly-complicit injector.

## The discipline: it scales with whether there's an accountable chain — not with "importance"

This is the part that keeps the generalization honest, and it is a deliberate boundary, not a
hedge: **naming a general primitive is not a mandate to bolt the full machinery onto every region.**
But the boundary is *not* "ads matter, comment widgets don't" — that would be wrong, because
**user-generated and algorithmically-ranked regions have a very real fraud economy of their own.**

What actually varies is whether a region has an **accountability chain worth routing to** — and,
separately, what Live Verify can and cannot do about the fraud:

- **Ads** — a genuine liability chain (advertiser → network → exchange → publisher) with back-to-back
  indemnity. Warrants the full chain + escalated reporting.
- **Sponsored / native content** — a real disclosure duty (FTC/ASA) and editorial-disguise harm.
  Warrants verifiable disclosure.
- **Comment / recommendation / review / feed regions** — these are **not** low-stakes. They carry a
  large bot-driven manipulation economy: spam posted to elevate prominence, astroturf sentiment,
  manufacture consensus, plant links — *"a thousand sets of eyes for a cent."* They absolutely warrant
  the **provenance + escalated-reporting** layer (there is a clear party accountable for *operating
  the region* to report to). See the crucial limit below on what that layer does and doesn't catch.
- **Truly static / known components** — a plain embedded map tile, a payment iframe, a share bar with
  no user-generated content. At most a light *"embedded by"* disclosure; often nothing, because the
  publisher visibly included a known component and there is no manipulation economy.

### What the provenance layer catches here — and what it doesn't

For the bot-spam case, the distinction is essential and is the same one drawn for ads:

- **Region provenance answers "who is *accountable* for this region?"** — the publisher embedded the
  comment system; a platform operates it. That chain is real and verifiable, and it gives a
  user-report somewhere to go.
- **It does *not* answer "is this specific comment a bot?"** — content-level bot/spam *detection* is
  statistical, server-side, traffic-pattern analysis, the **same shape as ad/click fraud, which is
  out of scope everywhere.** Live Verify routes accountability for the region; it does not adjudicate
  whether the bytes inside it were typed by a human. Don't let the provenance layer imply otherwise.

### Each node declares its own posture — the chain surfaces the claims, it does not adjudicate them

There is a hard, important terminus for user-generated regions, and it is a *feature*: **the chain
never surfaces the individual who typed the content; the last host → human hop is gated behind a court
order.** But *which* node is that terminus is not a single tidy answer the protocol gets to decide —
because §230 is a per-node, contestable, factual matter. So the chain's job is to **surface what each
node asserts about its own liability and identity custody**, and let courts and regulators adjudicate.

§230 immunity is not one badge worn by one party. It attaches to whoever acts as an *interactive
computer service* w.r.t. the content and *not* as its *information content provider* — and it can be
**claimed by more than one node, lost by a node that materially contributes to the content's
illegality** (the amplifier edge), and never held by the author. Baking "this is *the* §230 node" into
the chain would be the protocol making a legal ruling. It must not. Instead, each node declares, on
**three axes**:

1. **Role** — host, embedder, amplifier/ranker, relay/conduit, or author.
2. **§230 posture** — claims immunity, no immunity (author), or a contested claim (e.g. an
   amplifier-for-the-economics that *also* claims to be a neutral conduit).
3. **Identity custody — do I hold the author's ID?** This is the decisive one for where the chain can
   actually terminate.

### "§230-exempt — conduit, ID upstream": a node that doesn't hold the identity must say so

A node can only be the **unmasking terminus** if it actually *holds the author's identity*. A node
that merely **received the content (and its provenance) from an upstream node and passed it on** does
**not** hold the ID — and it must declare itself **"§230-exempt — conduit, identity held upstream,"**
pointing the question further up the chain rather than absorbing it as if the buck stopped there.

This is what stops a relay from being a **false terminus**. A complicit conduit cannot say "it stops
with me, and I'm immune" to bury a report, because it is *factually* obligated to declare that it
doesn't hold the ID — and the [escalated-reporting](chain-escalated-reporting.md) cascade therefore
**keeps walking past it** until it reaches the node that genuinely holds the author's identity. Only
*that* node — the real §230-shielded host who can be **compelled by court order** to take the final
host → human step — is the unmaskable terminus.

The declarations are **self-evidencing and self-policing**, like the rest of the chain: a node that
*lies* — claiming to hold the ID when it doesn't, or claiming exempt-conduit when it actually holds
the ID to dodge a subpoena — is making a checkable assertion the upstream node either corroborates or
contradicts.

### Why this is correct

Consider a user invoking the safe sequence on a fabricated, defamatory comment — *"Nigel Farage
donates \$1m a month to immigration-welfare groups."* The provenance reveal surfaces the **chain of
nodes and what each claims**: relays declaring "exempt — ID upstream", the host that actually holds
the identity claiming §230 as the accountable operator, and any amplifier whose immunity claim is
*contested*. It **stops short of the person who typed it** in every case. This is:

- **Privacy / anti-doxxing.** A safe sequence that unmasked commenters would be a doxxing machine —
  the exact privacy inversion this project refuses elsewhere (the *papers-please* worker-status line,
  the [enrichment hazards](verification-enrichment-hazards.md)). The typist's identity stays protected
  until a court says otherwise.
- **It mirrors how the law actually works.** In a defamation action you subpoena the party that holds
  the identity to unmask a John Doe; you do not get to unmask them yourself, and you have to find the
  *right* party to subpoena. The chain hands a plaintiff or regulator exactly that map: who claims what,
  who holds the ID, and which immunity claims are contestable.
- **It exposes the contested node, which is the point.** An amplifier monetising the "thousand eyes
  for a cent" economics *while* claiming neutral-conduit immunity is precisely the node a court most
  needs surfaced — and a single "the §230 node" framing would hide exactly that. Surfacing every
  node's claims, rather than picking a winner, is what makes the contested claim legible.

So the design property is: **accountable, identity-custody-honest terminus — not anonymous-all-the-way-
down, and not a doxxing tool.** There is always a reachable map of who-claims-what; the node that holds
the ID is the court-order-gated unmasking point; relays must declare they are not it; and the
individual author is reached only by due process.

## Existing instances

These already-written use cases are instances of this primitive, at the high-stakes end:

- [Ad Placement Provenance](../public/use-cases/ad-placement-provenance.md) — who *placed* an ad
  (liability chain); carries the escalated-reporting action.
- [Sponsored Content & Native-Ad Disclosure](../public/use-cases/sponsored-content-disclosure.md) —
  whether an editorial-looking region is paid placement.
- [AI Content Provenance Disclosure](../public/use-cases/ai-content-provenance-disclosure.md) —
  whether a piece of content/media is AI-generated or camera-original (the *origin* of a region's
  content, a sibling question to *who placed it*).

## Relationship to the rest of the protocol

- It is the umbrella the ad use cases sit under; it does not replace them — they are the worked,
  high-stakes instances.
- It belongs to [Safe-Sequence Platform Disclosure](safe-sequence-platform-disclosure.md) (the
  gesture, inward verification, absence-as-finding) and reuses
  [chain-escalated reporting](chain-escalated-reporting.md) and the
  [sovereign-roots-style](sovereign-roots.md) honest-anchor pattern where a region carries a chain.
- It stays **provenance, not policing**: it surfaces *who placed what*, it does not vet payloads or
  adjudicate.

## Related

- [Ad Placement Provenance](../public/use-cases/ad-placement-provenance.md) — the flagship instance.
- [Safe-Sequence Platform Disclosure](safe-sequence-platform-disclosure.md) — the branch this belongs
  to.
- [Chain-Escalated Reporting](chain-escalated-reporting.md) — the root-first report cascade for
  regions that carry a responsibility chain.

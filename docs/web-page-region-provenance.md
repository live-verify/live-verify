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

## The discipline: the apparatus scales with the stakes

This is the part that keeps the generalization honest, and it is a deliberate boundary, not a
hedge: **naming a general primitive is not a mandate to bolt the full machinery onto every region.**

The full provenance-and-reporting apparatus earns its keep where there is a real **accountability
chain, a fraud economy, and (often) a regulatory duty**:

- **Ads** — a genuine liability chain (advertiser → network → exchange → publisher) with
  back-to-back indemnity and a large fraud economy. Warrants the full chain + escalated reporting.
- **Sponsored / native content** — a real disclosure duty (FTC/ASA) and a real harm (editorial
  disguise). Warrants verifiable disclosure.

For lower-stakes regions the right answer is *less*, not the same:

- An embedded map, a comment widget, a share bar — there is no fraud supply chain and weak
  accountability stakes. At most these warrant a **light "who embedded this" disclosure** (the
  publisher names the third party they chose to include) — and often they warrant **nothing at all**,
  because the publisher has simply, visibly, included a known component.

So region provenance is a *spectrum*: full liability-chain provenance at the ad end, a one-line
"embedded by" disclosure in the middle, and silence at the trivial end. Applying ad-grade machinery
to a comment box would be over-engineering — the same way verifying a thing nobody disputes adds
nothing. The primitive is general; the *weight* is proportional to what is actually at stake.

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

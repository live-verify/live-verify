---
title: "Ad Placement Provenance (Who Placed This?)"
category: "Novel Document Types"
volume: "Very Large"
retention: "Per-impression (ephemeral) to campaign-duration"
slug: "ad-placement-provenance"
verificationMode: "clip"
tags: ["advertising", "provenance", "ad-network", "malvertising", "accountability", "authority-chain", "browser", "liability", "supply-chain"]
furtherDerivations: 1
---

## The Problem

A web page is a single second party — the publisher whose URL you visited — but the advertisement
you see was placed by a chain of parties the page never names. A creative is sold by an advertiser,
brokered through an ad network, auctioned across one or more exchanges, and delegated through
re-sellers before something is injected into the page. Hundreds of domains may participate in the
decision to place a single ad. (For a working illustration of that recursion, see the
[ad-infinitum demo](https://github.com/paul-hammant/ad-infinitum), which simulates the chain of
advertising-service domains that can inject content into an arbitrary page.)

> Ads are the highest-stakes instance of a more general thing: **[web-page region
> provenance](../../docs/web-page-region-provenance.md)** — *who placed any third-party-injected
> region of a page here, and who stands behind it?* This use case applies that primitive where the
> fraud, liability, and regulatory stakes are greatest.

When something goes wrong — a malvertising payload, a scam creative, a deceptive "you've won"
banner — the end user has **no way to ask "who placed this?"** The publisher washes their hands ("we
didn't serve it"); the ad network is invisible; the exchange is invisible; the re-seller is
invisible. Accountability dissolves into the chain precisely because the chain is hidden from the
one person harmed by it.

This use case does **not** claim to stop malvertising or to vet ad code for safety — ad payloads are
dynamic, per-impression executable code, and verifying their *safety* is a different problem with
different tooling. What it does is make the **provenance and liability chain of a specific ad
placement visible to the end user, on demand, as a deliberate action** — turning "who placed this?"
from an unanswerable question into a right-click.

## What the user actions

The verifiable artifact is not the ad's pixels or its code — it is a short, signed **placement
manifest**: a human-readable statement of *which parties stood in the chain that put this ad here*,
each vouching for the link below it. The user surfaces it by an explicit gesture:

1. **Right-click the ad** (or long-press on mobile) and choose **"Show ad provenance."**
2. The browser/extension reads the placement manifest bound to that ad slot and **walks its
   provenance chain** — the same `authorizedBy` walk Live Verify already uses for credential
   [authority chains](../../docs/authority-chain-app-display.md), here applied to liability rather
   than credentials.
3. A panel renders the chain **top-down**, naming the **ad network actually used for this specific
   placement**, with each party's role and a one-line description it published about itself.

The user took an action; the user got an answer. Nothing ran automatically, nothing was verified
behind their back, and the result is attribution — not a safety verdict.

## Example: The Provenance Reveal

A reader on `dailyexample-news.com` right-clicks a banner and chooses "Show ad provenance." The
panel shows:

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #1a5f2a; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <span verifiable-text="start" data-for="adprovenance"></span>
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;">AD PLACEMENT PROVENANCE
═══════════════════════════════════════════════════════════════════

Placement Ref: PL-2026-0615-8841aa3c
Slot:          dailyexample-news.com / article-body-mid
As At:         15 Jun 2026 11:04 UTC

Chain (each party vouches for the one below it):

  ▸ dailyexample-news.com — Publisher of the page you are reading
    ▸ ads.dailyexample-news.com — Publisher's own ad proxy
      ▸ exchange.openbid.example — Ad exchange that ran the auction
        ▸ network.brightreach.example — Ad network that placed this creative
          ▸ acme-mattresses.example — Advertiser (creative owner)

Salt: 7H2K9P4Q

<span data-verify-line="adprovenance">verify:dailyexample-news.com/ad-provenance/v</span></pre>
  <span verifiable-text="end" data-for="adprovenance"></span>
</div>

The user now knows, for *this* impression: the publisher proxied the slot through its own ad domain,
the auction ran on `openbid.example`, the network that actually placed the creative was
`brightreach.example`, and the advertiser was `acme-mattresses.example`. If the banner had instead
been a malware dropper or a scam, the same panel names every party that handled it — the publisher
can no longer say "nothing to do with us," because their own domain anchors the chain.

## Why the Publisher Anchors the Chain

The chain **terminates at the publisher's own domain**, by design, and that is the point the
ad-infinitum complaint turns on. The premise there is that ad content should be proxied through the
content page (the second party) so that there is a liable party — someone the harmed user can hold
to account — with back-to-back indemnity contracts running down the chain. The provenance manifest
is the *visible, user-actionable surface* of exactly that arrangement:

- The publisher signs a manifest saying "for this slot, I stood up this proxy and accepted this
  auction result." That is an attestation of **liability**, not of safety.
- Each party below signs "I placed/brokered this and I carry indemnity from the party below me."
- The user's "Show ad provenance" action walks that signed chain and renders who-vouched-for-whom.

The publisher can no longer hand-wash, because the chain they signed names them at the top. Whether
the lower parties were diligent (malware-sniffed the payload, held real indemnity) is a contractual
matter between them — but the *existence and shape* of the chain is now something the end user can
see whenever they choose to ask.

## Data Verified

The placement reference, the publisher slot, the issue timestamp, the ordered provenance chain
(each party's domain and self-published role description), and the salt. The manifest binds *which
parties stood in this placement's chain* — it does **not** bind, vouch for, or verify the ad's
creative content, its executable behaviour, or its safety.

**What is deliberately NOT included:**

- the ad's payload, creative, or code (this is provenance, not content verification)
- any safety, malware, or brand-safety verdict
- the auction price, bid data, or commercial terms
- any user-identifying or targeting data about the person who saw the ad

## Data Visible After Verification

The ordered chain of parties, top-down, each with its self-published role description (e.g. "Ad
exchange that ran the auction"), exactly as the credential authority-chain display works. Tapping a
party can reveal its `formalName` (the registered company behind the domain) where published.

**Status Indications:**
- **Chain Shown** — A signed manifest was found and the chain resolved end-to-end.
- **Unconfirmed Link** — A party in the chain claimed a voucher the party above did not confirm
  (rendered like a broken credential chain: that link is shown struck, not hidden).
- **No Manifest** — This ad slot carried no provenance manifest; the user is told plainly that
  provenance is unavailable for this placement (fail-loudly — never a fabricated or partial chain
  presented as complete).
- **Expired** — The placement manifest's validity window has passed (per-impression manifests are
  short-lived; the slot must re-issue).

## Second-Party Use

The **publisher** benefits directly. Signing and surfacing a provenance manifest:

- **Converts a liability they already bear into a transparency feature.** Users increasingly blame
  the site they were on for a bad ad; a publisher that can *show* the chain demonstrates it isn't
  the originator and that it proxied responsibly.
- **Creates a documentary record for dispute and indemnity.** When a malicious creative slips
  through, the publisher has a signed, timestamped chain naming the network and advertiser it can
  pursue under the indemnity contracts.
- **Differentiates "responsible ad" publishers.** A site that proxies ads through its own domain and
  exposes provenance is making a checkable claim that ad-stuffed competitors cannot.

## Third-Party Use

**End users / readers**

The user action this whole use case is built around: right-click → "Show ad provenance" → see who
placed this. Attribution on demand, never a safety promise.

**Browser and extension makers**

A natural home for the action. The browser already mediates the ad slot; adding a context-menu
"Show ad provenance" that walks a signed manifest is the same primitive as the Live Verify
[browser extension](../../docs/authority-chain-app-display.md)'s credential chain display, pointed at
ad placements. It pairs naturally with referral-distance limiting (capping third-party recursion
depth) — provenance makes the depth *visible*, the limit makes it *enforceable*.

**Regulators and consumer-protection bodies**

When investigating a scam-ad campaign, a signed provenance manifest names the responsible chain
without the regulator having to subpoena the auction logs of every intermediary.

**Ad networks and exchanges (the honest ones)**

A network that signs its placements and carries real indemnity can *prove* it did so. Provenance
rewards the diligent intermediary and isolates the murky re-seller who refuses to sign.

## Reporting up the chain (a post-verification action)

Seeing a bad ad, a user can do more than read its provenance — they can **report it**, and the
resolved chain becomes the report's routing table. The report is a
[post-verification action](../../docs/post-verification-actions.md): the user invokes a "report this"
gesture and the complaint is escalated **root-first** down the chain.

- **The report is the whole chain plus the URL**, from the browser's point of view — self-evidencing,
  so any recipient can re-walk and re-verify exactly what the reporter saw.
- **The honest root gets first dibs**, then the report steps down toward the leaf one party at a time;
  the first party to **consume** it (accept responsibility for acting) stops the cascade.
- **Why root-first:** the party knowingly complicit in fraud is usually *far from the root* — a rogue
  re-seller deep in the chain. Routing root-first sends the report *past* them to the honest parties
  above first, the ones holding indemnity over them and able to cut them off. The bad actor is the
  **last** to see a complaint about their own conduct, not the first.
- **No complicit root.** The root is *not* the publisher who served the ad (a complicit publisher
  could otherwise consume-to-suppress). It is a **curated, neutrally-governed list of honest
  ad-placement roots** — the platform running the gesture (e.g. Chrome) must not anoint itself, and
  the list is ideally maintained by a 501(c)(3) association, the same way
  [sovereign roots](../../docs/sovereign-roots.md) anchor credential chains. The publisher remains the
  *liability* anchor of the chain; the honest curated root is the *reporting* anchor.

The full mechanism — payload, escalation order, the honest-roots list, and consumption receipts — is
specified in [Chain-Escalated Reporting](../../docs/chain-escalated-reporting.md).

## Verification Architecture

This use case is an instance of [Safe-Sequence Platform Disclosure](../../docs/safe-sequence-platform-disclosure.md):
the platform (the ad supply chain) is the subject, the user turns verification inward via a
browser-drawn gesture the ad cannot intercept, and the *absence* of a manifest is itself the finding.

The placement manifest is a small signed document bound to the ad slot at render time, carrying the
ordered chain of vouching parties. The end-user verification is a deliberate **clip-style action** —
the user invokes it; it does not run automatically. The walk reuses Live Verify's existing
machinery:

- Each party publishes a `verification-meta.json`-style record with its `description`, optional
  `formalName`, and an `authorizedBy` pointer to the party above it (here: the party that accepted
  its placement). The walk proceeds publisher → … → advertiser, or is rendered top-down for reading.
- A link is **confirmed** only if the party above it actually attests the one below — the same
  property that stops a fraudulent credential issuer from claiming an endorsement it doesn't have. A
  re-seller cannot fabricate "placed by a reputable network" unless that network signed for it.
- The architecture verifies **the shape and attestation of the chain**, never the payload. This
  boundary is deliberate and stated plainly to users: provenance ≠ safety.

This is explicitly a *provenance and accountability* mechanism, not a malware control. It does not
prevent a bad payload; it ensures that when one appears, the parties who placed it are named rather
than anonymous.

## Privacy Salt

The salt is required. Each placement manifest carries a unique salt so that:

- the same chain rendered for two impressions produces different hashes (no cross-impression
  correlation by hash)
- a manifest cannot be pre-computed or enumerated from a known publisher/slot pair
- the provenance reveal exposes the *parties*, never the *viewer* — there is no user-identifying or
  targeting data in the manifest, and nothing about who saw the ad

## Authority Chain

**Pattern:** Commercial (liability chain), anchored at the publisher.

Unlike a government-rooted credential, an ad placement chain terminates at the **publisher's own
domain** — the second party who chose to proxy the slot and is therefore the accountable anchor. The
chain expresses *liability vouching* rather than *regulatory authorization*:

```
✓ dailyexample-news.com — Publisher of the page (accountable anchor)
  ✓ exchange.openbid.example — Ran the placement auction
    ✓ network.brightreach.example — Placed this creative
      ✓ acme-mattresses.example — Advertiser / creative owner
```

Each link is a commercial attestation backed (in the ad-infinitum model) by back-to-back indemnity
contracts. There is no sovereign root because none is needed: the question is "who is liable for what
appeared here?", and the answer legitimately ends at the party who let it in.

See [Authority Chain Specification](../../docs/authority-chain-spec.md) and
[Authority Chain: App Display](../../docs/authority-chain-app-display.md) for the underlying walk and
display model this use case reuses.

## Further Derivations

1. **Political ad funding disclosure** — the sibling that answers *"who paid for this?"* (funding
   transparency, chained to the electoral regulator) rather than *"who placed this?"* (this page's
   liability chain). See [Political Ad Funding Disclosure](political-ad-funding-disclosure.md).
2. **Sponsored content & native-ad disclosure** — the platform/publisher discloses whether
   editorial-looking content is paid placement. See
   [Sponsored Content & Native-Ad Disclosure](sponsored-content-disclosure.md).

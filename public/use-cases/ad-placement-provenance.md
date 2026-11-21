---
title: "Ad Placement Provenance (Who Placed This?)"
category: "Novel Document Types"
volume: "Very Large"
retention: "Per-impression (ephemeral) to campaign-duration"
slug: "ad-placement-provenance"
verificationMode: "live"
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

This use case does not claim to stop malvertising or to vet ad code for safety — ad payloads are
dynamic, per-impression executable code, and verifying their *safety* is a different problem with
different tooling. What it does is make the **provenance and liability chain of a specific ad
placement visible to the end user, on demand, as a deliberate action** — turning "who placed this?"
from an unanswerable question into a right-click.

## What the user actions

The verifiable artifact is not the ad's pixels or its code — it is a short, signed **placement
manifest**: a human-readable statement of *which parties stood in the chain that put this ad here*,
each vouching for the link below it. The user surfaces it by an explicit gesture:

1. **Right-click the ad** (or long-press on mobile) and choose "Show ad provenance."
2. The browser/extension reads the placement manifest bound to that ad slot and **walks its
   provenance chain** — the same `authorizedBy` walk Live Verify already uses for credential
   [authority chains](../../docs/authority-chain-app-display.md), here applied to liability rather
   than credentials.
3. A panel renders the chain origin-to-page, from the advertiser (why the ad exists), through
   every ad reseller that passed the placement onward, to the ad presenter that put it on the
   page — each party's role assigned by the browser from its position in the chain, not from what the
   party calls itself.

The user took an action; the user got an answer. Nothing ran automatically, nothing was verified
behind their back, and the result is attribution — not a safety verdict.

## No clip path: ad provenance is live-only

Every other Live Verify use case has a clip / photograph / OCR path — the claim is printed on a
document, and the verifiable text (with its `verify:` line) travels with it, so a person can capture and
check it anywhere. **Ad provenance has no such path, and cannot.** It is different in kind, for two
reasons:

- **The ad carries no visible `verify:` line or metadata.** The creative the reader sees is just the
  ad — "SleepWell, 50% OFF." The provenance is bound to the *slot* out-of-band, never printed on the
  advertiser's pixels. There is nothing on the ad to clip.
- **The subject is adversarial and lives *inside the page*.** A malicious ad, or a malicious page,
  could trivially draw its own fake "provenance: all clean" overlay if the mechanism were page
  JavaScript. So the check **must not run in the DOM.** It runs from **outside the page — in browser
  chrome (or an extension operating above the page)** — which the ad and the site cannot read,
  intercept, suppress, or forge. This is the [safe-sequence](../../docs/safe-sequence-platform-disclosure.md)
  model: the user turns verification inward via a gesture the page cannot touch, and the browser draws
  the result over the page.

That is why the panel above is styled as browser chrome, not as page content: it must be visually
unmistakable that *the browser is saying this, not the page.* A page-drawn look-alike is exactly the
attack this design exists to defeat.

**The honest weakness — browsers signal chrome-vs-page poorly today.** This use case depends on the
user being able to tell a browser-drawn panel from a page-drawn imitation, and current browsers are
**weak at that distinction.** Beyond the URL-bar padlock and permission prompts, there is little
consistent, spoof-resistant chrome vocabulary a page cannot mimic pixel-for-pixel inside its own
viewport. A convincing in-page fake of this very panel is achievable today. So this use case is partly
a **proposal to browser makers**: it needs a trustworthy, page-inaccessible surface for "the browser is
telling you this" — the same gap that makes SSL-certificate details trustworthy (they live in chrome the
page cannot write) but leaves most other browser-to-user messages forgeable. Until that surface is
stronger, the mechanism is sound but its weakest link is the user's ability to know the panel is
genuine.

**This is the single thing browser makers must make much, much clearer:** a *visual, spoof-resistant
indicator* between UI a website drew (DOM-rendered) and UI the browser or an extension drew
(chrome-rendered), so a user always knows the source and trust boundary of what they are looking
at. The mockup below sketche the distinction and a concrete design pattern browsers could adopt —
a top-bar chip, a connected border tying the panel to a chrome anchor. Hopefully making it unmistakable
that the panel is *"Secure UI from the browser, not from this page."*

![DOM-rendered vs chrome/extension-rendered UI: clear visual linkage so users know the source of the overlay and
trust implications](../non-dom-chrome-prompts.png)

Today none of that is standardised, and the two that come closest (the padlock, permission prompts)
cover only a narrow set of messages. An ad-provenance panel — like any browser-to-user statement that a
malicious page has motive to fake — needs one of these treatments to be *reliably* distinguishable from
a page-drawn imitation. The mechanism in this use case is only as trustworthy as that boundary, and the
boundary is a browser-platform gap, not something a page or an extension can close on its own. On Windows 
Microsoft used to talk of "a safe sequence" to allow the user to be confident they were dealing with 
something from the operating system itself and not something from an application throwing up a plausible
looking dialog. That was Ctrl-Alt-Del and would bring up an overlay that would allow you to lock a screen
or continue doing password-entering functions. MacOS does not have such a sequence, but contrast.

## Example: The Provenance Reveal

**Step 1 — the ad, as placed.** A reader is partway through an article on `dailyexample-news.com`. An
injected banner sits mid-article — the reader has no idea which of hundreds of possible parties put it
there:

<div style="max-width: 650px; margin: 24px auto; font-family: -apple-system, sans-serif; border: 1px solid #ddd; background: #fff; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
  <div style="padding: 16px 20px; color: #222; font-size: 0.9em; line-height: 1.5;">
    …the council confirmed the roadworks would continue into September, with
    diversions in place along the High Street. Residents are advised to&nbsp;…
  </div>
  <div style="margin: 0 20px 8px; border: 1px dashed #c9a13b; background: #fffdf3; padding: 18px; text-align: center; position: relative;">
    <div style="position: absolute; top: 4px; left: 8px; font-size: 0.65em; color: #b9902f; letter-spacing: 0.05em;">ADVERTISEMENT</div>
    <div style="font-size: 1.15em; font-weight: 700; color: #1a4f8a;">🛏️ SleepWell Memory-Foam Mattresses — 50% OFF</div>
    <div style="font-size: 0.85em; color: #555; margin-top: 4px;">Ends Sunday. Free next-day delivery. → Shop now</div>
  </div>
  <div style="padding: 8px 20px 16px; color: #222; font-size: 0.9em; line-height: 1.5;">
    …use alternative routes where possible. The works are part of a wider
    resurfacing programme scheduled to complete by year end.
  </div>
</div>

**Step 2 — the right-click.** Wondering who is behind the banner (or having landed on a scam version of
it), the reader right-clicks the ad (long-press on mobile). The context menu is drawn by the
*browser*, not the page, so the ad cannot suppress or fake it — the reader chooses **"Show ad
provenance."**

<div style="max-width: 300px; margin: 24px auto; font-family: -apple-system, sans-serif; border: 1px solid #bbb; border-radius: 8px; background: #fff; box-shadow: 0 6px 20px rgba(0,0,0,0.18); overflow: hidden; font-size: 0.9em;">
  <div style="padding: 9px 16px; color: #333; border-bottom: 1px solid #eee;">Open image in new tab</div>
  <div style="padding: 9px 16px; color: #333; border-bottom: 1px solid #eee;">Copy image</div>
  <div style="padding: 9px 16px; color: #333; border-bottom: 1px solid #eee;">Save image as…</div>
  <div style="padding: 9px 16px; color: #0b57d0; background: #eef4ff; font-weight: 600;">🔎 Show ad provenance</div>
  <div style="padding: 9px 16px; color: #333; border-top: 1px solid #eee;">Inspect</div>
</div>

**Step 3 — the reveal.** The browser reads the placement manifest bound to that slot, walks its chain,
and draws the panel:

<div style="max-width: 560px; margin: 24px auto; border: 1px solid #6b7280; border-radius: 10px; background: #f3f4f6; box-shadow: 0 10px 30px rgba(0,0,0,0.28); overflow: hidden; font-family: -apple-system, 'Segoe UI', sans-serif;">
  <div style="background: #e5e7eb; border-bottom: 1px solid #cbd0d8; padding: 8px 16px; font-size: 0.8em; color: #4b5563; display: flex; align-items: center; gap: 8px;">
    <span style="font-size: 1.1em;">🛡️</span>
    <span>Drawn by your browser — not by this page. This panel cannot be altered by the site or the ad.</span>
  </div>
  <div style="padding: 16px 20px; color: #111;">
    <div style="font-size: 0.72em; letter-spacing: 0.06em; color: #6b7280; text-transform: uppercase; margin-bottom: 10px;">Ad placement provenance</div>
    <div style="font-size: 0.78em; color: #6b7280; margin-bottom: 4px;">The ad, as placed:</div>
    <div style="border: 1px solid #d8dbe0; background: #fff; border-radius: 6px; padding: 10px 12px; font-size: 0.9em; color: #222; margin-bottom: 14px;">
      🛏️ SleepWell Memory-Foam Mattresses — 50% OFF<br>
      Ends Sunday. Free next-day delivery. → Shop now
    </div>
    <div style="font-size: 0.78em; color: #6b7280; margin-bottom: 6px;">Placed on <strong>dailyexample-news.com / article-body-mid</strong>, 15 Jun 2026 11:04 UTC. Chain, origin&nbsp;→&nbsp;page (each vouched for the one below):</div>
    <pre style="margin: 0; font-family: ui-monospace, 'Courier New', monospace; font-size: 0.82em; line-height: 1.6; color: #111; white-space: pre;">  ▸ acme-mattresses.example      ADVERTISER
    ▸ brightreach.example        AD RESELLER
      ▸ getcheapclicks.example   AD RESELLER
        ▸ dailyexample-news.com  AD PRESENTER</pre>
  </div>
</div>

The panel is drawn by the browser, over the page — not by the page's own JavaScript (see
[No clip path: this use case is live-only](#no-clip-path-ad-provenance-is-live-only)). It shows **the ad
exactly as placed** (the creative text is the other half of the evidence, alongside the chain), then the
resolved chain of parties. There is no `verify:` line and nothing to clip: the browser already walked
and verified the chain out-of-band to draw this — the panel is the *result*, not a fresh claim.

**Contrast — a Google-served ad.** The same gesture on a different ad often reveals a much *shorter*
chain. When a slot is filled directly by a single, integrated ad platform — here Google Ads on a Google
property — the presenter, the ad-serving party, and the reseller are all the same operator, so the chain
collapses to two named, recognisable hops:

<div style="max-width: 560px; margin: 24px auto; border: 1px solid #6b7280; border-radius: 10px; background: #f3f4f6; box-shadow: 0 10px 30px rgba(0,0,0,0.28); overflow: hidden; font-family: -apple-system, 'Segoe UI', sans-serif;">
  <div style="background: #e5e7eb; border-bottom: 1px solid #cbd0d8; padding: 8px 16px; font-size: 0.8em; color: #4b5563; display: flex; align-items: center; gap: 8px;">
    <span style="font-size: 1.1em;">🛡️</span>
    <span>Drawn by your browser — not by this page. This panel cannot be altered by the site or the ad.</span>
  </div>
  <div style="padding: 16px 20px; color: #111;">
    <div style="font-size: 0.72em; letter-spacing: 0.06em; color: #6b7280; text-transform: uppercase; margin-bottom: 10px;">Ad placement provenance</div>
    <div style="font-size: 0.78em; color: #6b7280; margin-bottom: 4px;">The ad, as placed:</div>
    <div style="border: 1px solid #d8dbe0; background: #fff; border-radius: 6px; padding: 10px 12px; font-size: 0.9em; color: #222; margin-bottom: 14px;">
      <span style="font-size: 0.72em; color: #4b7a2b; border: 1px solid #b7d59a; border-radius: 3px; padding: 0 4px;">Ad</span>&nbsp; Northlake Running Shoes — new season trainers<br>
      northlakesports.co.uk · Free returns · Shop the range
    </div>
    <div style="font-size: 0.78em; color: #6b7280; margin-bottom: 6px;">Placed on <strong>weather-today.example / sidebar-top</strong>, 15 Jun 2026 11:06 UTC. Chain, origin&nbsp;→&nbsp;page (each vouched for the one below):</div>
    <pre style="margin: 0; font-family: ui-monospace, 'Courier New', monospace; font-size: 0.82em; line-height: 1.6; color: #111; white-space: pre;">  ▸ northlakesports.co.uk    ADVERTISER   (verified Google Ads account)
    ▸ ads.google.com         AD RESELLER  (served and presented by Google Ads)
      ▸ ads.google.com       AD PRESENTER</pre>
  </div>
</div>

Two things stand out against the SleepWell example. First, the chain is short — one advertiser, one
integrated platform that both resold and presented the ad. There are no anonymous re-sellers stacked in
the middle, and *that shortness is itself the signal*: the fewer, more recognisable the hops, the less
room for a murky party to hide. Second, **the presenter is a party the reader recognises and can hold to
account** — Google, not a throwaway domain. The panel does not say this ad is *better* or *safer*; it
says the accountability chain is short and named, which is exactly the judgement the reader wanted to be
able to make. A long chain through `getcheapclicks.example` and a short chain through `ads.google.com`
tell very different accountability stories, and the gesture surfaces both honestly.

Each role is a short label; hovering it (or tapping, on touch) shows what it means. The same
explanations are written out below so nothing depends on a hover:

<div style="max-width: 650px; margin: 8px auto 24px; font-family: -apple-system, sans-serif; font-size: 0.9em; line-height: 1.55; color: #333; border-left: 3px solid #1a5f2a; padding: 6px 16px;">
  <p style="margin: 6px 0;"><strong title="This ad exists to sell their product or service, or to entice you to click or tap for some reason.">ADVERTISER</strong> — this ad exists to sell their product or service, or to entice you to click or tap for some reason.</p>
  <p style="margin: 6px 0;"><strong title="Passed the ad's placement onward toward the page. There may be many, chained one after another; the depth is itself the signal.">AD RESELLER</strong> — passed the placement onward toward the page. There may be many, chained one after another; how deep the reselling goes is itself the signal.</p>
  <p style="margin: 6px 0;"><strong title="Put this ad on the page you are reading. The party a complaint lands on, and the one held to account.">AD PRESENTER</strong> — put this ad on the page you are reading. The party a complaint lands on, and the one held to account.</p>
</div>

The chain reads **origin to page**: the advertiser at the top is why the ad exists; each **ad
reseller passed the placement onward (there may be many — the depth is the point); and the ad
presenter** at the bottom is the party that put it on the page in front of the reader. If the banner
had instead been a malware dropper or a scam, the same panel names every party that handled it — and,
critically, names the presenter, who can no longer say "nothing to do with us."

### Three roles, and only three

The overlay deliberately uses three plain roles, not the ad-industry's dozen self-flattering job
titles:

- **Advertiser** — the origin. The ad exists to sell their product; they commissioned the creative.
  Topmost, because everything downstream serves their demand.
- **Ad reseller** — any intermediary that passed the placement onward. Exchanges, networks, DSPs,
  re-sellers-of-re-sellers — from the reader's point of view they are all the same role: *someone who
  resold this ad's placement toward the page.* There can be N of them, and how many is itself the
  signal.
- **Ad presenter** — the party that put the ad on the page the reader is on. The one a complaint lands
  on, and the one held to account (see below).

**Why not let each party name its own role?** Because they would all inflate it. Left to self-describe,
every reseller writes "Premium Exchange" or "Trusted Ad Partner" — never "reseller," let alone
"reseller number five." Self-description is structurally incapable of producing an honest rank, so the
overlay does not use it for the role at all.

### Where each line comes from

No single party authors the overlay — the whole point is to attribute actors who would deny
involvement, so none of them can be trusted to write it. The browser assembles it from separate
domains, and — crucially — assigns the roles itself from the structure of the walk, not from what
any party says about itself:

- **The chain's *shape* comes from the manifest bound to the slot**, walked upward: each party's record
  carries an `authorizedBy`-style pointer to the party it accepted its placement from — the same walk
  Live Verify uses for credential [authority chains](../../docs/authority-chain-app-display.md), here
  expressing *liability* rather than authorisation.
- **The *role* is derived by the browser from position in the confirmed walk, not self-published.** The
  leaf of the demand (the party nothing points *up* from) is the advertiser; the party whose domain
  serves the page the reader is on is the ad presenter; everything between them is an **ad
  reseller**, and the browser can label its depth ("reseller 2 of 3"). A party cannot self-declare a
  better rank — its position in the chain is a fact of who-attested-whom, which it does not control.
- **Only *identity* is self-published** — a party's `formalName` (e.g. "GetCheapClicks Media Ltd,
  company no. 08841772"), the registered company behind the domain, shown on tap. Lying about that is
  falsifiable fraud with a paper trail; lying about your *rank* is just marketing, which is why the one
  is trusted and the other is ignored.
- **A line is *confirmed* only if the party above it attests the one below.** `getcheapclicks.example`
  appears in the chain only because `brightreach.example` — the party above it — actually vouched that
  it accepted GetCheapClicks' placement. A reseller cannot insert itself unless the party above signed
  for it; an unconfirmed link renders struck, not hidden (see
  [Status Indications](#data-visible-after-verification)).

So the lines are independent GETs to independent domains, stitched by the walk: the manifest gives the
order, each domain gives only its *identity*, the browser assigns the *role* from structure, and each
upstream attestation confirms the link below it. The browser is the neutral assembler; no party writes
its own rank, and no party writes the whole overlay.

> **The functional kind of a reseller** — was hop 2 really an *auction exchange* or just a pass-through
> re-seller? — is not taken from its self-description either. It emerges from the *shape* of
> who-attests-whom across many placements (an exchange has many parties attesting up into it; a
> pass-through has one in, one out). That is a property of the whole corpus of confirmed chains, not of
> any single walk — which is exactly the kind of thing a grading layer such as
> [ISNAD](../../docs/comparison-to-isnad.md) is built to derive, and Live Verify is not.

## Why the Ad Presenter is the Accountability Endpoint

The chain terminates at the ad presenter's own domain — the party whose page the reader is on. It
anchors there not because the presenter is *trusted* (it is the party most motivated to evade), but
because it is the one the harmed reader can actually reach and complain to, and the one the signed
chain pins.

The presenter's instinct, when a scam or malware ad is reported, is the neutral-conduit defence:
*"we didn't create that ad, we just host the page — it came through an ad chain we don't control."* In
the US that is the Section 230 claim; in the EU it is the DSA hosting-provider defence; in the UK,
the Online Safety Act intermediary defences. All of them turn on the presenter being a **passive
conduit** that did not participate in placing the content.

**The signed provenance chain removes that defence.** The presenter's own domain sits in the chain,
carrying its own attestation — *"for this slot, I accepted this placement."* That is a record of
**active participation in placing the ad**, not passive hosting. A party that cryptographically vouched
for an ad appearing in its slot cannot then claim it was a neutral conduit with no hand in the
placement — the very manifest it signed is the evidence that it participated. The provenance mechanism
turns the presenter's "nothing to do with us" from an assertion into a falsifiable, self-signed claim
the chain contradicts.

- Each party in the chain signs "I accepted this placement from the party below me" — the presenter
  included. That is an attestation of participation and liability, not of safety.
- Whether the resellers were diligent (malware-sniffed the payload, held real indemnity) is a
  contractual matter between them — but the *existence and shape* of the signed chain is something the
  reader can surface at will.

**The evidentiary object is the whole chain plus the claim text.** What a reader (or a regulator, or
law enforcement) is handed is not just the presenter's name: it is the complete resolved chain
(advertiser → resellers → presenter, each link confirmed) **together with the verified text of the ad
itself — the creative or scam copy that was actually shown. This package is self-evidencing**: any
recipient can re-walk it and re-verify exactly what the reporter saw (see
[Chain-Escalated Reporting](../../docs/chain-escalated-reporting.md) and the reporting section below).
Crucially, it establishes participation — *who signed for this ad appearing where* — which is the
fact that defeats a neutral-conduit immunity, not merely *who to blame*.

**Honest limit.** Establishing participation is not establishing guilt. The chain proves *who
participated in placing this exact ad*; it does not prove the ad was unlawful, harmful, or that any
party breached a duty. That remains for a court. Provenance strips the "we weren't involved" evasion; it
does not adjudicate the wrong.

## What Is Checked

The placement reference, the publisher slot, the issue timestamp, the ordered provenance chain
(each party's domain and self-published role description), and the salt. The manifest binds *which
parties stood in this placement's chain* — it does not bind, vouch for, or verify the ad's
creative content, its executable behaviour, or its safety.

**What is deliberately NOT included:**

- the ad's payload, creative, or code (this is provenance, not content verification)
- any safety, malware, or brand-safety verdict
- the auction price, bid data, or commercial terms
- any user-identifying or targeting data about the person who saw the ad

## What the Checker Sees

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

## Who Holds It

The publisher benefits directly. Signing and surfacing a provenance manifest:

- **Converts a liability they already bear into a transparency feature.** Users increasingly blame
  the site they were on for a bad ad; a publisher that can *show* the chain demonstrates it isn't
  the originator and that it proxied responsibly.
- **Creates a documentary record for dispute and indemnity.** When a malicious creative slips
  through, the publisher has a signed, timestamped chain naming the network and advertiser it can
  pursue under the indemnity contracts.
- **Differentiates "responsible ad" publishers.** A site that proxies ads through its own domain and
  exposes provenance is making a checkable claim that ad-stuffed competitors cannot.

## Who Checks It

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

Seeing a bad ad, a user can do more than read its provenance — they can report it, and the
resolved chain becomes the report's routing table. The report is a
[post-verification action](../../docs/post-verification-actions.md): the user invokes a "report this"
gesture and the complaint is escalated root-first down the chain.

- **The report is the whole chain plus the URL**, from the browser's point of view — self-evidencing,
  so any recipient can re-walk and re-verify exactly what the reporter saw.
- **The honest root gets first dibs**, then the report steps down toward the leaf one party at a time;
  the first party to consume it (accept responsibility for acting) stops the cascade.
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

## How Verification Works Here

This use case is an instance of [Safe-Sequence Platform Disclosure](../../docs/safe-sequence-platform-disclosure.md):
the platform (the ad supply chain) is the subject, the user turns verification inward via a
browser-drawn gesture the ad cannot intercept, and the *absence* of a manifest is itself the finding.

The placement manifest is a small signed document bound to the ad slot at render time, carrying the
ordered chain of vouching parties. The end-user verification is a deliberate **live, browser-drawn
action** — the user invokes the safe sequence; the browser (not the page) walks the chain and draws the
result over the page. There is no clip, photograph, or OCR step (see
[No clip path](#no-clip-path-ad-provenance-is-live-only)). The walk reuses Live Verify's existing
machinery:

- Each party publishes a `verification-meta.json`-style record with its `formalName` (identity only —
  the *role* is assigned by the browser from chain position, not self-published) and an `authorizedBy`
  pointer to the party that accepted its placement. The walk resolves the chain from the presenter up
  to the advertiser, and is rendered origin-to-page (advertiser at top, presenter at the accountable
  bottom) for reading.
- A link is confirmed only if the party above it actually attests the one below — the same
  property that stops a fraudulent credential issuer from claiming an endorsement it doesn't have. A
  re-seller cannot fabricate "placed by a reputable network" unless that network signed for it.
- The architecture verifies the shape and attestation of the chain, never the payload. This
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

**Pattern:** Commercial (liability chain), anchored at the ad presenter.

Unlike a government-rooted credential, an ad placement chain terminates at the **ad presenter's own
domain** — the party whose page the reader is on, and therefore the accountability endpoint. The chain
expresses *liability vouching* rather than *regulatory authorization*, and reads origin-to-page:

```
✓ acme-mattresses.example    Advertiser (origin — this ad exists to sell their product)
  ✓ brightreach.example      Ad reseller (resold the placement onward)
    ✓ getcheapclicks.example Ad reseller (resold the placement onward)
      ✓ dailyexample-news.com Ad presenter (put it on the page you are reading — accountable)
```

Each link is a commercial attestation backed (in the ad-infinitum model) by back-to-back indemnity
contracts. There is no sovereign root because none is needed: the question is "who is liable for what
appeared here?", and the answer legitimately ends at the presenter who let it onto the page.

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

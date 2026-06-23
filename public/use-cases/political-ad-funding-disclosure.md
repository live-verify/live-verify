---
title: "Political Ad Funding Disclosure (Who Paid For This?)"
category: "Government & Civic Documents"
volume: "Very Large"
retention: "Campaign + statutory retention (often years for electoral records)"
slug: "political-ad-funding-disclosure"
verificationMode: "both"
tags: ["political-advertising", "funding-disclosure", "dark-money", "electoral-transparency", "disclaimer", "digital-imprint", "safe-sequence-platform-disclosure", "fec", "eu-political-ads", "sponsor-identity"]
furtherDerivations: 1
---

## The Problem

Every developed democracy now requires political advertising to carry a disclosure: the "paid for by"
disclaimer on a US broadcast or mailer, the digital imprint mandated by the UK Elections Act, the
sponsor-and-funder transparency notice required under the EU Regulation on the transparency and
targeting of political advertising. The legal premise is sound — a voter is entitled to know who
stands behind a political message before they weigh it. But the disclosure as it exists today is
**merely asserted**. "Paid for by Concerned Citizens for a Better Tomorrow" is just printed text.
Anyone can print it. A scrolling imprint at the foot of a sponsored post is typed by the same party
that wrote the ad. Nothing about the line is **checkable** by the person reading it.

This is precisely where dark money, undisclosed funding, and foreign interference disguised as
domestic operate. A shell committee with an anodyne name, a sponsor field that names a front rather
than the funder, an imprint that is simply absent on a boosted post — each defeats the *intent* of
disclosure law while nominally (or not even nominally) complying with its *letter*. The voter has no
way to ask the one question disclosure law exists to answer: **does the entity named here actually
stand behind this, and is it registered with the electoral authority that says it must be?**

This use case makes the legally-required disclosure **verifiable** rather than merely printed. It
does not replace imprint and disclaimer law — it gives that law a checkable surface, and it makes the
**absence** of a real disclosure conspicuous instead of unremarkable.

## What gets verified

The verifiable artifact is the **funding disclosure itself** — the "paid for by" imprint rendered as
a short, signed, domain-bound statement: the committee or entity that paid for the ad, its
registration identifier with the electoral regulator (e.g. its FEC committee ID), the top funders
where the regime requires them disclosed, a reference to the specific ad, and the time the disclosure
was made. The user surfaces and checks it by an explicit action — clipping the printed/broadcast
imprint, or invoking a platform/browser "Who paid for this?" gesture on a digital ad.

The hash of that normalized disclosure resolves against the **disclosing entity's own domain**, and
that domain's verification record chains **upward to the electoral regulator** — `fec.gov` in the US,
`electoralcommission.org.uk` in the UK, the registry mandated under the EU political-ads regulation.
The chain answers two things at once: that the named committee published this disclosure, and that
the committee is one the regulator recognises as registered to run political advertising.

This is distinct from [Ad Placement Provenance](ad-placement-provenance.md), which answers "who
**placed** this ad in the supply chain, and who is **liable** for it?" — a publisher-anchored
liability chain. This use case answers a different question: "who **paid for** and **sponsors** this
political message, and is that disclosure registered with the electoral authority?" — a
funding-transparency chain anchored at the regulator. The two are complementary: one names the
delivery chain, the other names the money and the mandate behind the message.

## Example

A reader sees a boosted political post (or scans the imprint on a mailer) and asks "Who paid for
this?" The disclosure resolves to:

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #1a5f2a; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <span verifiable-text="start" data-for="politicalad"></span>
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;">POLITICAL AD — FUNDING DISCLOSURE
═══════════════════════════════════════════════════════════════════

Paid For By:    Citizens for Riverside Schools (PAC)
Registered ID:  FEC C00789456 — registered, status Active
Sponsor:        Citizens for Riverside Schools
Top Funders:    Riverside Teachers Association; M. Calderon
Ad Ref:         AD-2026-0623-4471bd92
Channel:        Boosted social post / mailer run #14
As At:          23 Jun 2026 09:18 UTC

Salt: 5T8N2J6W

<span data-verify-line="politicalad">verify:citizens-riverside.example.org/imprint/v</span></pre>
  <span verifiable-text="end" data-for="politicalad"></span>
</div>

The reader now knows, for *this* ad: the paying committee is `Citizens for Riverside Schools`, it
holds FEC committee ID `C00789456`, that ID resolves as registered and active at the regulator, and
the funders the regime requires disclosed are named — all bound to the committee's own domain and
confirmed up to `fec.gov`. Had the imprint named a committee that did not resolve, or carried no
checkable disclosure at all, the reader would have been told so plainly — and for a political ad,
**that silence is the finding.**

## Data Verified

The paying committee/entity name, its electoral-regulator registration identifier, the sponsor, the
top funders where the regime mandates them, the ad reference, the channel, the disclosure timestamp,
and the salt. The hash binds *the disclosure the entity published and the entity's registration with
the regulator* — it does **not** bind the truthfulness of the ad's political claims, the targeting
applied to the viewer, or the underlying money trail.

**What is deliberately NOT included:**

- the ad's political content, claims, or messaging (this is funding disclosure, not fact-checking)
- any targeting, audience, or data about the viewer who saw the ad
- the full donor ledger or bank records (top-funder disclosure only, per the applicable regime)
- any verdict on whether the funding is "legitimate" beyond *registered and disclosed as stated*

## Data Visible After Verification

The paying entity, its registration ID and status at the regulator, the sponsor, the disclosed
funders, and the chain up to the electoral authority.

**Status Indications:**

- **VERIFIED / DISCLOSED** — A signed disclosure resolved and the committee's ID confirmed as
  registered at the electoral regulator. The "paid for by" line is real and chains to the authority.
- **AMENDED** — The disclosure was superseded (e.g. a corrected funder list or re-registered
  committee). The current version is shown, with the prior superseded.
- **WITHDRAWN** — The committee or regulator withdrew the disclosure (ad pulled, registration lapsed
  or revoked). Told plainly — a withdrawn disclosure is not a silent pass.
- **NO_DISCLOSURE / 404** — No checkable funding disclosure exists for this political ad, or the
  named committee does not resolve to a registered entity. **This is the most important outcome of
  the four.** For a political message, the absence of a verifiable sponsor is not a neutral blank and
  is never rounded up to "probably fine" — it is the conspicuous, designed signal of an undisclosed,
  dark-money, or spoofed-imprint ad. The UI renders "no checkable sponsor" as a definite, readable
  finding (fail-loudly), never as nothing.

## Second-Party Use

The **disclosing committee or entity** benefits directly. Signing and publishing a verifiable
disclosure:

- **Turns a legal obligation into a credibility signal.** A committee that can be *checked* —
  confirmed registered, with funders named — distinguishes itself from the anonymous front group that
  cannot. In an environment of distrust, a verifiable "paid for by" is an asset, not just a burden.
- **Pre-empts spoofing of its own name.** A bad actor can print "Paid for by Citizens for Riverside
  Schools" on a smear ad the real committee never ran; a verifiable disclosure lets the genuine
  committee's imprints resolve while the spoof returns NO_DISCLOSURE.
- **Creates a clean compliance record.** A signed, timestamped disclosure chained to its regulator ID
  is exactly the documentary trail an electoral filing or audit requires.

## Third-Party Use

**Voters / readers**

The action this use case is built around: "Who paid for this?" → see the committee, its registration,
and its funders, confirmed up to the electoral authority — or be told plainly that no checkable
sponsor exists. A right-click or a clip, on demand, never a behind-the-back check.

**Electoral regulators (FEC, Electoral Commission, EU registries)**

A verifiable disclosure regime gives the regulator a population of self-published, hash-bound imprints
that resolve to registered IDs — making non-compliant, unregistered, or spoofed ads detectable as the
ones that *fail to resolve*, without subpoenaing every platform's ad library.

**Platforms hosting political ads**

A platform under the EU political-ads regulation (or UK/US disclaimer duties) can require advertisers
to attach a verifiable disclosure as a placement condition, and surface "Who paid for this?" through a
gesture the ad's own iframe cannot suppress — discharging its transparency duty with a checkable
artifact rather than an unverified text field.

**Journalists and fact-checkers**

Tracing a coordinated campaign across dozens of ads, a fact-checker can cluster by which committee ID
each verifiable disclosure resolves to — and flag the ads that carry **no** resolvable sponsor as the
candidates for dark-money or foreign-interference reporting.

## Verification Architecture

This use case is an instance of
[Safe-Sequence Platform Disclosure](../../docs/safe-sequence-platform-disclosure.md): the political
ad — and the imprint the platform or sponsor attaches to it — is the **subject** under scrutiny; the
voter **turns verification inward** via a clip of the printed imprint or a platform/browser gesture
the ad cannot intercept or redraw; and the **absence** of a verifiable funding disclosure is itself
the finding, not an error to be smoothed over. A political ad that cannot produce a resolvable
"paid for by" has, by that very fact, answered the voter's question.

The disclosure is a small signed statement bound to the specific ad and published at the disclosing
entity's domain. Verification is a deliberate action (clip or invoked gesture — `verificationMode`
**both**), reusing the standard pipeline unchanged: `text → normalize → SHA-256 → GET`. The walk then
follows the `authorizedBy` chain from the committee's domain up to the electoral regulator, the same
[authority-chain](../../docs/authority-chain-app-display.md) machinery used for credentials — here
expressing *electoral registration* rather than credential authority. A committee cannot fabricate
"registered with the FEC" unless the FEC's record actually confirms the ID, exactly as a fraudulent
issuer cannot fabricate an endorsement it was never granted.

## The honest limit — disclosure, not forensic audit

This must be stated plainly. The mechanism verifies the **disclosed** funding and sponsor — that the
named committee published this imprint and that the committee is registered with the electoral
regulator. It does **not**, by itself, audit the money trail, trace funds through intermediaries, or
unmask a committee that has been *deliberately laundered* through a compliant-looking shell. If a
front group is genuinely registered and the disclosed top funders are themselves opaque pass-through
entities, the disclosure will resolve as VERIFIED while the *true* origin of the money remains a
matter for enforcement, investigative journalism, and the regulator's audit powers — not for a hash
check.

What this use case does is narrower and real: it makes the legally-required disclosure **checkable**
instead of merely asserted, so a faked or spoofed imprint fails to resolve, and it makes the
**absence** of any disclosure conspicuous, so dark-money and undisclosed ads stand out precisely
because they return NO_DISCLOSURE. It raises the floor and lights up the gaps; it does not replace the
forensic, subpoena-backed work of following the money. Claiming more than that would be dishonest.

## Privacy Salt

The salt is required. Each disclosure carries a unique salt so that:

- the same committee's disclosure across two ads produces different hashes (no cross-ad correlation by
  hash alone)
- a disclosure cannot be pre-computed or enumerated from a known committee/ID pair
- the reveal exposes the *sponsor and funders*, never the *viewer* — there is no targeting or
  user-identifying data in the disclosure, and nothing about who saw the ad

## Authority Chain

**Pattern:** Regulated / Sovereign — anchored at the electoral regulator.

Unlike the publisher-anchored liability chain of
[Ad Placement Provenance](ad-placement-provenance.md), a funding disclosure chain terminates at the
**electoral authority** that licenses political advertising. The chain expresses *electoral
registration*, not commercial liability:

```
✓ fec.gov — Electoral regulator (sovereign root)
  ✓ citizens-riverside.example.org — Registered committee C00789456 (Active)
    ▸ imprint AD-2026-0623-4471bd92 — "Paid for by" disclosure for this ad
```

In other jurisdictions the root is the equivalent sovereign authority —
`electoralcommission.org.uk` for the UK digital-imprint regime, the national registry designated
under the EU political-ads regulation. The root is genuinely sovereign because the question — "is this
the disclosure of an entity the state recognises as registered to run political advertising?" — is one
only the electoral authority can finally answer.

See [Authority Chain Specification](../../docs/authority-chain-spec.md) and
[Sovereign Roots](../../docs/sovereign-roots.md) for the chain-walk and the sovereign anchoring this
use case reuses.

## Further Derivations

None currently.

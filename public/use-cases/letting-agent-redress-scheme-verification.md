---
title: "Letting Agent & Redress-Scheme Verification"
category: "Real Estate & Property"
volume: "Very Large"
retention: "Listing life + tenancy limitation period (typically 6-7 years)"
slug: "letting-agent-redress-scheme-verification"
verificationMode: "both"
tags: ["rental", "letting-agent", "redress-scheme", "property-redress-scheme", "mydeposits", "deposit", "short-let", "airbnb", "companies-house", "domain-mismatch", "housing-fraud", "tenant", "london"]
furtherDerivations: 0
---

# Letting Agent & Redress-Scheme Verification

## The Problem

The cruel twist in the 2026 wave of London rental scams is that the fraudsters pass the exact due-diligence checks tenants are told to run. A [July 2026 London Centric investigation](https://www.londoncentric.media/p/london-rental-scammers-property-redress-scheme) followed "Callum," who paid a fake agency, "Anchor Gate Lettings," £3,500 for a Stoke Newington flat that turned out to be a Booking.com short-let rented for the weekend and dressed up as a long-term tenancy. Before paying, he did what every guide advises: he checked the agent was a member of a government-approved redress scheme carrying the royal coat of arms. Anchor Gate passed — because its membership was **real**.

For under £250 the scammers had:

- Registered **Anchor Gate Lettings Ltd** at Companies House for £50.
- Joined the **Property Redress Scheme**'s public register of letting agents for £190.
- Insured a "deposit" with the government-backed **MyDeposits** scheme for £27 — enough to generate an authentic protection link they forwarded to the victim.

They then cited "we are proud members of the Property Redress Scheme (membership PRS055369)" in their emails — and it was true. The guardrail became the con. Worse, weeks after the fraud was reported, the scam company was **still listed as an active member** on the redress scheme's public register, and the flat was never theirs to let.

A central "approved list" fails here in three ways at once: anyone can pay to join it, it is slow to revoke, and — most importantly — **membership of a scheme is not the claim the tenant actually needs verified.** None of this makes the schemes useless: they remain the complaint and compensation mechanism once something has gone wrong, and nothing here replaces that. What Live Verify adds is making their memberships — and the two other claims that actually matter — checkable *in context*, at the moment the tenant is deciding whether to pay. The tenant needs to know three specific things, each answerable only by the party with real authority over it:

1. **Is the person showing me this flat a current, accountable agent of a real agency — and how long has that agency actually existed?** (A company incorporated eight weeks ago is not a decade-old high-street brand.)
2. **Is the redress/deposit-scheme membership genuinely held by *this* agent at *this* domain** — not a real membership number copied onto a fake agency, and not a real agency's identity cloned?
3. **Is this specific property actually available as a long-term tenancy** — or is it a short-let (Airbnb / Booking.com) that someone is fraudulently re-advertising as a home to rent?

Live Verify cannot prove a stranger is honest. It replaces "do they display an approved badge?" — which the scammer defeats — with three claims bound to the domains that can actually answer them.

## Data Verified

Verifying a rental letting safely means combining **three independent verifiable claims** — about the agent, the scheme membership, and the property — each hashed and looked up against a *different* issuer domain. The tenant is never asked to trust one badge; they watch three separate authorities answer.

### Claim 1 — Agent identity, accountability, and agency longevity

Issued by the agency and chained to Companies House.

Agent name (or first-name + last-initial + ID for privacy), agency legal name, Companies House company number, **agency incorporation date**, agent photograph (via hash), agent's current authorisation status, and a `verify:` line on the agency's own domain.

The **incorporation date** is the load-bearing field the article shows was missing: it converts "looks like a real company" into "this company is eight weeks old," which — for someone about to wire a deposit — is exactly the signal a decade-old high-street agency would pass and Anchor Gate would fail.

### Claim 2 — Redress / deposit-scheme membership (bound to the agent, not floating)

Issued by the redress or deposit scheme (Property Redress Scheme, MyDeposits, DPS, TDS), and crucially **naming the member's registered domain and company number** inside the hashed text.

Scheme name, membership number, **the exact member legal name + Companies House number + registered domain the scheme issued the membership to**, membership status, and the scheme's own `verify:` line.

This is the fix for the article's core failure. A membership number like `PRS055369` is just a copyable string. When the scheme publishes the claim *including the domain and company it belongs to*, a cloned or borrowed number no longer helps: the tenant's app flags that the number belongs to a different domain than the one advertising the flat. (Same [`allowedDomains`](../../docs/authority-chain-app-display.md) discipline used for [recruitment-agency-verification](view.html?doc=recruitment-agency-verification).)

### Claim 3 — Property tenancy-use authority (long-let vs short-let)

Issued by a lettings authority — e.g. a London-wide lettings/short-let register operated by the Greater London Authority (Mayor of London) or the local borough.

**Honest label: this register does not exist yet.** Claims 1 and 2 could be issued tomorrow by bodies that already exist (any letting agency, Companies House, the redress and deposit schemes). Claim 3 names *proposed* infrastructure — the nearest real analogues today are the patchily-enforced 90-night short-let cap in London and Scotland's letting-agent registration regime. It is included because it is the claim that would have caught this specific fraud at its root, and because short-let registers are actively debated policy; but an implementer should treat it as the aspirational third of the trio, not a current capability.

Property address, listing reference, **declared use: LONG-TERM TENANCY vs SHORT-TERM LET**, the entity authorised to let it, any short-let night cap already consumed, and the register's `verify:` line.

This directly catches the Booking.com-flat-as-tenancy swap: a property flagged **SHORT-LET** on the register cannot honestly be advertised as a long-term home, and a property with no long-let authorisation from the controlling party is a red flag before any money moves.

**Privacy salt:** Recommended on applicant-specific and photo claims. Property addresses may be public, but applicant names, deposit amounts, and photo URLs can be enumerable or sensitive — issuers should add a random reference line and time-limited photo URLs.

## Example: Agent Badge at the Viewing (Claim 1, camera mode)

<div style="max-width: 400px; margin: 24px auto; font-family: sans-serif; border: 1px solid #2c5530; border-radius: 8px; background: #fff; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
  <div style="background: #2c5530; color: #fff; padding: 12px 15px; font-weight: bold; font-size: 0.95em;">HARTLEY RESIDENTIAL LETTINGS</div>
  <div style="display: flex; padding: 15px;">
    <div style="width: 100px; margin-right: 18px;">
      <div style="width: 100px; height: 125px; background: #eee; border: 2px solid #2c5530; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: #999; font-size: 0.7em; text-align: center;">AGENT PHOTO</div>
    </div>
    <div style="flex-grow: 1; color: #000; font-size: 0.9em; line-height: 1.55;">
      <span verifiable-text="start" data-for="lagent1"></span>Hartley Residential Lettings Ltd<br>
      Agent: Grace M 2417<br>
      Companies House No: 09482716<br>
      Incorporated: 03 May 2012<br>
      <span style="font-family: 'Courier New', monospace; font-size: 0.85em; color: #2c5530;"><span data-verify-line="lagent1">vfy:hartleyresidential.example/agents</span></span><span verifiable-text="end" data-for="lagent1"></span>
    </div>
  </div>
</div>

The tenant points a phone at the badge at the viewing. Verification returns the agent's photograph and current status from the agency's domain, and the app walks the authority chain — surfacing the Companies House incorporation line alongside the green, amber, or red result.

## Example: Scheme-Membership Claim on a Listing (Claim 2, clip mode)

<div style="max-width: 620px; margin: 24px auto; font-family: Arial, sans-serif; border: 1px solid #4a3f6b; background: #fff; padding: 0;">
  <div style="background: #4a3f6b; color: #fff; padding: 15px;">
    <div style="font-weight: bold; font-size: 1.1em;">Property Redress Scheme</div>
    <div style="font-size: 0.85em;">Member Attestation</div>
  </div>
  <div style="padding: 20px; font-size: 0.92em; line-height: 1.7; color: #000;">
    <span verifiable-text="start" data-for="lascheme1"></span>Member: Hartley Residential Lettings Ltd<br>
    Companies House No: 09482716<br>
    Registered domain: hartleyresidential.example<br>
    Membership: PRS041220<br>
    <div style="margin-top: 15px; font-family: 'Courier New', monospace; font-size: 0.82em; color: #4a3f6b; border-top: 1px dashed #aaa; padding-top: 10px; text-align: center;">
      <span data-verify-line="lascheme1">verify:propertyredress.example/members</span> <span verifiable-text="end" data-for="lascheme1"></span>
    </div>
  </div>
</div>

This block sits on the agency's listings and emails, but its `verify:` line points at the **scheme's** domain — the scheme, not the agent, answers. Because the member's registered domain is inside the hashed text, copying this block onto a scam site trips the app's domain-mismatch warning: the claim verifies, and simultaneously tells the verifier it belongs to somebody else.

## Data Visible After Verification

Each claim shows its own issuer domain and responder text. Claim 1 additionally returns the **agent photograph** so the tenant can confirm the person in front of them is the person the agency vouches for — the "post-verification mugshot" that makes an on-the-doorstep viewing accountable.

**Claim 1 — Agent / agency status:**

Be precise about what a green tick means here: a scammer who controls their own domain can happily self-attest — Anchor Gate could have run a verification endpoint on `anchorgate-lettings.example` and returned "Authorised" for its own fake agent. Claim 1's protective value is therefore **not** the green tick alone; it is the tick *plus* the [authority chain](../../docs/authority-chain-spec.md) and the Companies House longevity line that the tick drags into view.

- **Authorised** — Current agent of the named agency, in good standing.
- **Suspended / Revoked** — Known to the agency but not currently authorised.
- **Verified, but unanchored or newly incorporated** (amber) — The agency's own domain attests to the agent, but the machine channel finds no endorsement chain behind the domain, and/or the Companies House line shows a weeks-old company. **This is the Anchor Gate case**: the claim "verifies," and that is exactly when the [dual-channel](../../docs/dual-channel-trust.md) amber state hands the decision back to the human — *verified, by whom?*
- **NOT FOUND** — The agency's domain has no record of this agent — the pattern when a real agency's identity has been borrowed by someone it never employed.

**Claim 2 — Scheme membership:**

The scheme's endpoint returns a simple status — it does not (and cannot) know which website the tenant is looking at:

- **Active** — Membership is genuine and current.
- **Lapsed / Expelled** — No longer a member.

The **domain-mismatch check is the verifying app's job**, not the endpoint's: the member's registered domain is part of the hashed claim text, and the app compares it against the domain actually advertising the property (the same client-side `allowedDomains` mechanic cited above). *Active membership + mismatched domain* is the scam signal — a real membership number being displayed by someone it was never issued to.

**Claim 3 — Property use** (proposed register — see the label above):
- **Long-term tenancy — authorised** — The controlling party permits long lets here.
- **SHORT-LET ONLY** — Registered as an Airbnb/Booking.com-style short let; advertising it as a home to rent is fraudulent.
- **NOT FOUND** — Meaningful only once registration is mandatory in the area: then it means no lettings authority stands behind this property being available. During partial coverage it mostly means "not registered," which is a prompt for more questions, not proof of fraud — the standard 404-ambiguity caveat applies.

**Longevity line (from Claim 1):** e.g. `AGENCY INCORPORATED: 12 Nov 2025 (4 months ago) [source: Companies House]` — matching the story's own timeline (incorporated in November, showing flats by March) and using the same multi-authority, source-attributed pattern as [company-good-standing-status](view.html?doc=company-good-standing-status).

## Second-Party Use

The prospective tenant is the second party — the person being asked to hand over a deposit under time pressure.

**At the viewing (camera mode):** Scan the agent's badge. Claim 1 returns their photo, confirms they're a current agent, and shows the agency's incorporation date. A "decade-old brand" that incorporated eight weeks ago is now visible, not hidden.

**Before sending money (clip mode):** Verify Claim 2 from the scheme's own domain and check it resolves to the *same* agency and domain that is advertising the flat — not merely that a membership number exists somewhere. Verify Claim 3 to confirm the property is authorised as a long-term tenancy, not a re-advertised short-let.

**Keeping evidence:** All three verification results, with their timestamps and issuer domains, form a contemporaneous record if the tenant later needs to recover funds from their bank (as Callum did).

## Third-Party Use

**Redress and deposit schemes (as issuers, and as their own auditors)**

By issuing Claim 2 *bound to the member's domain and company number*, a scheme stops its own badge from being weaponised, and gains a fast way to detect when a membership is being displayed on a domain it was never issued to. This is the direct answer to a register that kept showing a scam agency as "active" for weeks.

**Local authorities and the GLA (as issuers of Claim 3)**

A London-wide or borough lettings/short-let register can issue the property-use claim, letting tenants and enforcement officers distinguish a genuine long-term listing from a short-let being passed off as a tenancy — the mechanism at the heart of this fraud.

**Banks and payment providers**

When a defrauded customer reports an authorised push-payment loss, the three failed/mismatched verification results are self-evidencing context for the reimbursement decision.

**Listing platforms (OpenRent, Rightmove, Zoopla, Booking.com)**

Platforms can require or display the three claims, and — critically — cross-check Claim 3 against their *own* short-let inventory, so the same flat cannot be simultaneously a weekend Booking.com let and a long-term OpenRent tenancy.

## Verification Architecture

**The letting-agent fraud problem**

- **Genuine credential, wrong holder / wrong purpose** — the defining pattern here. A real Companies House number, a real redress-scheme membership, and a real deposit-protection link are all obtained cheaply and displayed as proof of trustworthiness. Defeated by binding each claim to the domain that issued it and checking the domains agree.
- **Impersonation / cloning** — a real agency's identity or membership number copied onto a lookalike domain. Defeated by the domain-mismatch check ([dual-channel trust](../../docs/dual-channel-trust.md)).
- **Short-let re-advertised as tenancy** — a property legitimately controlled for a weekend and fraudulently offered as a home. Defeated by the property-use claim (Claim 3).
- **Newly-minted shell agency** — a company registered weeks earlier presenting as an established brand. Surfaced by the incorporation-date longevity line.
- **Stale revocation on central registers** — the scheme's own list lags reality. Live Verify's per-domain, live-lookup model revokes instantly rather than depending on a central list being cleaned.

**Who issues what**

| Claim | Issuer | Chained to |
|-------|--------|------------|
| Agent identity + photo + longevity | The letting agency's domain | Companies House (`gov.uk`) for incorporation date |
| Scheme membership (domain-bound) | Property Redress Scheme / MyDeposits / DPS / TDS domain | National Trading Standards / MHCLG |
| Property long-let vs short-let | GLA (Mayor of London) or borough lettings register | The relevant local-authority `gov.uk` chain |

**Authority chain**

**Pattern:** Sovereign (each claim resolves up to a UK-government root). The tenant's human channel reads the domains (`companieshouse.gov.uk`, a real scheme domain, `london.gov.uk`); the machine channel walks each [authority chain](../../docs/authority-chain-spec.md) to a [sovereign root](../../docs/sovereign-roots.md). A claim that resolves only to `anchorgate-lettings.example` with nothing behind it is exactly the balk case. See the [Authority Chain Specification](../../docs/authority-chain-spec.md).

## Competition

| Existing control | What it does well | The gap this fraud exploited |
|---|---|---|
| Redress-scheme registers (PRS, TPO agent-finder) | Public membership lookup; gateway to complaints and awards | Membership is purchasable for £190 with a "simple joining process"; the register was still listing the scam agency weeks after warnings; a membership number is not bound to a domain, so displaying it proves nothing about *who* is displaying it |
| Deposit-scheme lookups (MyDeposits, DPS, TDS) | Authoritative on whether a specific deposit registration exists | A £27 landlord insurance product generated an authentic-looking protection link; the schemes themselves note registration is "not designed to operate as property ownership or tenancy verification" |
| Companies House search | Free, authoritative incorporation facts including company age | A real registration costs £50; victims under time pressure rarely check, and the sole director may be a paid nominee — which is why the incorporation *date* needs to surface automatically in the verification flow, not wait to be looked up |
| Client Money Protection (CMP) schemes | Reimbursement when a legitimate member agent misappropriates client money | The scam agency was never holding client money in a protected account; a CMP badge is the same copyable string as a redress badge |
| Listing-platform checks (OpenRent, Rightmove) | Platform-level identity checks on listers; in-platform messaging | The scammers moved the conversation off-platform to email early — a step the victim noticed but that no control converted into a warning |
| "Look established, check reviews" folk advice | Catches sloppy, low-effort scams | Anchor Gate was polished — professional emails, safety paperwork, even a "calls recorded for training" message. Professionalism is precisely what the fraud invests in |

**Practical conclusion:** each existing control answers a question adjacent to the one the tenant is asking. The registers prove a membership exists somewhere; the deposit lookup proves a registration exists for something; Companies House proves a company exists. Only domain-bound claims answer the tenant's actual three questions — *this* agent, *this* membership, *this* property — at the moment the money is about to move. And where the existing controls are authoritative (Companies House on incorporation, the schemes on membership), Live Verify doesn't compete with them: it puts their answers in the tenant's hand.

## Related Use Cases

- [Rental Listing and Deposit Authority](view.html?doc=rental-listing-deposit-authority) — the base pattern for verifying listing authority and payment instructions.
- [Tenancy Deposit Protection Status](view.html?doc=tenancy-deposit-protection-status) — confirming a deposit is genuinely protected (MyDeposits/DPS/TDS), the scheme this scam abused.
- [Landlord Licensing Status](view.html?doc=landlord-licensing-status) — council licensing verification for the property itself.
- [Real Estate Agent Verification (Showings)](view.html?doc=real-estate-agent-verification) — the badge-scan + photo pattern for the person at the viewing.
- [Recruitment Agency Verification](view.html?doc=recruitment-agency-verification) — the same "genuine membership number on the wrong domain" defence in the staffing sector.
- [Company Good Standing / No Winding-Up Petition](view.html?doc=company-good-standing-status) — the Companies House longevity and multi-authority `[source: …]` pattern reused for Claim 1.

---

*Not just London.* The investigation that prompted this use case is set in the capital, but nothing about the mechanism is. The ingredients — cheap company registration, government-endorsed redress and deposit schemes that a fraudster can genuinely join, a central register that is slow to revoke, and short-let platforms whose inventory can be re-advertised as tenancies — are national. The same con runs anywhere in England and Wales (the Property Redress Scheme, MyDeposits, DPS and TDS are UK-wide), in Scotland and Northern Ireland under their own letting-agent registration regimes, and in comparable form abroad wherever an "approved-scheme badge" stands in for verifying the agent, the membership, and the property against the authorities that actually control them. Read every reference to London, the GLA, or a specific borough as the local instance of a pattern that generalises: swap `london.gov.uk` for the relevant national or municipal register, and the three-claim structure is unchanged.

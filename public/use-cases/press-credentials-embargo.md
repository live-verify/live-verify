---
title: "Press Credentials & Embargo Confirmation"
category: "Identity & Authority Verification"
volume: "Large"
retention: "Credential validity period; embargo until release time + archive"
slug: "press-credentials-embargo"
verificationMode: "both"
tags: ["press", "journalism", "credential", "embargo", "media-accreditation", "press-release", "checkpoint", "newsroom", "revocation"]
furtherDerivations: 2
---

## The Problem

Two things in journalism routinely need to be taken on trust by a gatekeeper, and both are trivially forgeable today.

The first is a **press credential**. A reporter, photographer, or stringer presents a card — issued by a press regulator, a press card authority, or their own newsroom — at a checkpoint, a protest line, a polling station, an event entrance, or a cordon. The person controlling access is expected to decide, in seconds, whether this is genuinely accredited press. The card is laminated plastic. It shows the holder's status *at the time of printing*, not today. Credentials get suspended, revoked, or lapse, and the plastic never updates. Fake press cards are cheap and convincing.

The second is an **embargo**. A comms office, government press office, or PR wire sends out a press release or briefing marked "under embargo until [time]." Recipient journalists are trusted to hold the story until then. But the recipient has no independent way to confirm that the release genuinely came from the issuer, that the embargo time is the one the issuer actually set, or whether the embargo has since been lifted or broken. A spoofed "embargoed exclusive" — or a forged early "the embargo is lifted, publish now" — can manipulate a newsroom.

**Be clear about scope.** Live Verify here authenticates the **credential** and the **release/embargo terms**. It does **not** protect journalistic sources — confidential source protection is a different problem with different tooling (secure drops, legal privilege, operational security). Nothing in this use case touches who a journalist talked to. It answers narrower questions: *is this person accredited press right now?* and *is this embargoed release genuine and still under embargo?*

This is complementary to existing press-card schemes (national press card authorities, government accreditation, newsroom-issued IDs) and to embargo conventions — it makes the cards and the releases they already issue verifiable at the point of encounter, not a replacement for any of them.

## The Two Sub-Cases

### Sub-case 1: Press Credential

A press body or newsroom issues a credential bound to its domain. A gatekeeper — police officer at a cordon, election official at a polling station, security at a venue — scans it and gets a live status from the issuing body. The card returns **accredited** or **suspended/revoked** as it is *right now*, not as it was when printed.

There is a real **power-asymmetry** angle here, handled lightly. A stringer at a hostile checkpoint, or a freelancer facing a security cordon, is in a weak position: they are being asked to justify their presence to someone who can deny access or detain. A credential that resolves instantly to a recognised press body's domain lets the journalist prove accreditation without relying on the gatekeeper recognising an obscure card layout — and lets the gatekeeper distinguish genuine press from someone using a fake card as cover.

### Sub-case 2: Embargoed Release

A comms office issues a press release with embargo terms bound to its domain. The recipient journalist or editor scans the release and the issuer confirms it is genuine and returns the embargo status: **EMBARGOED until [time]** or **RELEASED**. This authenticates the document and its terms — it does not stop anyone from breaking an embargo, but it removes the ambiguity a spoofed release exploits.

## Example: Press Credential

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #1a5f2a; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <span verifiable-text="start" data-for="presscard"></span>
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;">PRESS ACCREDITATION
════════════════════════════════════════════════════

Holder:             A. MORENO
Outlet:             The Northgate Dispatch
Accreditation body: National Press Card Authority
Valid period:       2026-01-01 to 2026-12-31
Issued:             2026-06-15
Status:             ACCREDITED
Salt:               q7m2x9p4

<span data-verify-line="presscard">verify:press-body.example/accredited/v</span></pre>
  <span verifiable-text="end" data-for="presscard"></span>
</div>

The gatekeeper scans the card. The response resolves to the press body's domain and returns the holder's current accreditation status — not the status printed on the plastic. If the credential was suspended yesterday, the scan says so today.

## Example: Embargoed Release

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #1a5f2a; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <span verifiable-text="start" data-for="embargo"></span>
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;">PRESS RELEASE — UNDER EMBARGO

Release Title:   Q2 Public Health Findings
Issuer:          Ministry of Health — Press Office
Issued:          2026-06-15 09:00
Embargo Until:   2026-06-18 06:00 GMT
Status:          EMBARGOED
Salt:            k4r8t2w6

verify the authenticity of this release and its
embargo terms against the issuing comms office:

<span data-verify-line="embargo">verify:comms-office.example/release/v</span></pre>
  <span verifiable-text="end" data-for="embargo"></span>
</div>

The recipient journalist scans the release. The issuer's comms office confirms the document is genuine and returns the embargo status. Before the embargo time it returns **EMBARGOED**; once the issuer lifts it, the same scan returns **RELEASED**. A forged "publish early" notice that didn't come from the comms office returns **404** — it isn't theirs.

## Data Verified

**Press credential:** holder name, outlet, accreditation body, validity period, issue date, current accreditation status, salt.

**Embargoed release:** release title, issuing comms office, issue timestamp, embargo-until date/time, current embargo status, salt.

**Document Types:**
- **Press Card / Accreditation Pass** — issued by a press regulator, national press card authority, or newsroom. Carried at checkpoints, protests, polling stations, and event entrances.
- **Event/Venue Accreditation** — single-event press passes (conferences, sporting events, press conferences) where the issuer is the organiser or accrediting body.
- **Embargoed Press Release** — a release marked under embargo, distributed to named recipients ahead of a publish time.
- **Embargoed Briefing Document** — background material shared under embargo (technical reports, financial results, research findings).

## Data Visible After Verification

For a press credential, the response shows the issuing body's domain (`press-body.example`) and the holder's current accreditation. For an embargoed release, it shows the comms office domain (`comms-office.example`) and the release's embargo status. The endpoint confirms authenticity and status only — it never echoes the document body or the release contents.

**Status Indications:**
- **EMBARGOED** — Release is genuine and still under embargo. Hold until the stated time. Response shows the embargo-until time as the issuer set it.
- **RELEASED** — The embargo has been lifted by the issuer; the release is now publishable. (Replaces EMBARGOED once the issuer flips it.)
- **ACCREDITED** — Press credential is genuine and currently valid for the holder shown.
- **REVOKED / SUSPENDED** — Credential exists but has been pulled or suspended by the issuing body. Do not treat as valid accreditation. (For credentials.)
- **EXPIRED** — The credential's validity period has ended, or the release's archive retention has lapsed into an expired state.
- **404 / Not Found** — No matching record at the issuer's domain. Stated plainly: this credential or release did **not** come from the claimed issuer. Treat a "press card" that 404s as unverified, and an "embargoed exclusive" or "publish-now" notice that 404s as a forgery — it is not the comms office's document.

## Second-Party Use

The **credential holder** (the journalist) and the **release recipient** (the journalist or editor) are the second parties.

**Journalist, proving accreditation:** A stringer arrives at a cordon and presents their card. The officer scans it; it resolves to the press body's domain and returns ACCREDITED. The journalist proves their standing without arguing about an unfamiliar card design — useful precisely when the encounter is tense and the gatekeeper holds the power to exclude.

**Journalist, holding the line on accuracy:** Before publishing from an embargoed release, the editor scans it. EMBARGOED with the issuer's stated time confirms both that the release is genuine and that the embargo is still in force — so the desk doesn't get burned by publishing a spoofed "embargo lifted" message.

**Confirming a suspicious release:** A reporter receives a forwarded "exclusive under embargo" with an enticing scoop. A scan returning 404 tells them, plainly, that it never came from the named comms office.

## Third-Party Use

**Checkpoint / Cordon Officers and Event Security**
**Access control:** The gatekeeper at a protest line, polling station, or venue entrance scans a press card and gets a live ACCREDITED / SUSPENDED status from the issuing body — distinguishing genuine accredited press from someone using a fake card as cover, without needing to recognise every press body's layout.

**Election Officials**
**Polling-station access:** Many jurisdictions allow accredited media inside or near polling places under rules. A live scan confirms current accreditation rather than relying on a laminated card that may have lapsed.

**Newsrooms and Wire Services (downstream recipients)**
**Embargo discipline:** A wire desk redistributing an embargoed release can confirm it is genuine and still embargoed before passing it on — and can detect when the issuer has flipped it to RELEASED.

**Press Regulators / Accreditation Bodies**
**Revocation enforcement:** When a body suspends a credential, every subsequent scan reflects it immediately. The credential the journalist carries is only ever as valid as the register says today.

## Verification Architecture

**The forgery and ambiguity problem.** Two distinct attacks: a forged or out-of-date **press card** used to gain access (or to impersonate press), and a spoofed or prematurely-"lifted" **embargoed release** used to manipulate a newsroom into publishing the wrong thing at the wrong time. Both exploit the same gap — the gatekeeper or recipient has no live link back to the issuer.

**Issuer Types (First Party)**

- **Press card authorities / regulators** — bodies that accredit working journalists (national press card schemes, professional press bodies). They operate the credential endpoint at their domain and flip status on suspension or revocation.
- **Newsrooms** — outlets issuing their own staff/freelancer credentials, bound to the outlet's domain.
- **Comms offices / government press offices / PR wires** — issuers of embargoed releases and briefings, operating the release endpoint at their domain and flipping EMBARGOED to RELEASED at lift time.

**Rotating salt for credentials.** Press cards carry a salt (and, where the card is an e-ink or app display, a rotating one) so that a photographed card cannot be reused: the scan must be verified in the moment against the salt the issuer currently honours. This also prevents using stale hashes to build a movement log of a journalist — expired hashes return 404.

**Not source protection.** This architecture authenticates credentials and release terms. It carries no information about a journalist's sources, contacts, or unpublished material, and is not a channel for confidential material.

## Privacy Salt

A press credential is moderately low-entropy: holder name, outlet, accreditation body, and dates are guessable. An issuer-generated salt printed on the card raises the entropy so an attacker cannot guess-and-hash a holder's record into existence. For e-ink or app-based credentials the salt rotates after each verification or on TTL expiry, so a photograph of the card is worthless unless verified at the instant it is taken — the same property that prevents both cloning and the "photograph and track a reporter" attack.

An embargoed release is higher-entropy (title, issuer, precise timestamps) but still carries a salt so that an attacker who knows the headline cannot pre-compute the release's hash, and so that distinct releases never collide.

## Authority Chain

**Pattern:** Regulated (press credentials) or Commercial (embargoed releases)

A press credential chains to the press regulator or accreditation body that issued it. An embargoed release chains to the comms office (or PR wire) that issued it.

```
✓ press-body.example/accredited/verify — Accredits working journalists and verifies credential status
  ✓ press-regulator.example — Recognised press regulator / accreditation authority
```

```
✓ comms-office.example/release/verify — Issues press releases and verifies embargo terms and status
```

Self-authorized for the release case — the comms office is the canonical authority for its own releases. For credentials, the issuing body's authority derives from its standing as a recognised accreditation authority or from the newsroom's standing as the issuer of its own staff credentials.

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Further Derivations

None currently.

---
title: "Platform Age-Assurance Parental Audit"
category: "Identity & Authority Verification"
volume: "Very Large"
retention: "While the account exists; re-checkable on demand"
slug: "platform-age-assurance-parental-audit"
verificationMode: "both"
tags: ["age-assurance", "online-safety-act", "parental-controls", "social-media", "child-safety", "platform-attestation", "absence-as-finding", "safe-sequence", "regulatory"]
furtherDerivations: 1
---

## The Problem

New laws make platforms responsible for the ages of their users. The UK Online Safety Act and its
"highly effective age assurance" duties, the US state statutes, the EU's online-protection rules —
all push the same obligation: a social-media or content platform must form, and act on, a belief
about how old each user is. Reddit, a video app, a game, a chat service: each is now supposed to
*know* whether a given account holder is over (or under) a threshold, and to treat them accordingly.

But that belief is **invisible to the one person with the strongest interest in checking it — the
parent.** A parent looking at their 13-year-old's phone has no way to ask the platform: *what age do
you think this account is, and on what basis?* They cannot tell whether the child sailed through
sign-up by typing a fake birth year, whether the platform did any real assurance at all, or whether
it correctly understands the account as a minor and is applying minor protections. The platform's
age belief is a private fact the platform never has to show.

This use case turns that private belief into a **parent-auditable, verifiable claim** — including,
crucially, the case where there is **no claim at all**, because the absence of any age assurance is
itself the finding a parent most needs to see.

## The inverse of age-gating

This is **not** the same as [Age-Gating Without Revealing Date of Birth](age-gating-without-dob.md),
and the difference is the whole point:

- **Age-gating** is the *subject* presenting an "over 18" token to a *gatekeeper* who controls access
  (a bar, an off-licence, a sign-up flow). The user proves their age *outward*.
- **This** is the *platform* being made to expose the age belief it *already holds* about an account,
  so a *parent* can audit it *inward*. The direction of trust is reversed: here the platform is the
  subject of scrutiny, not the relying party.

It also differs from a credential the child carries. The verifiable thing here is **the platform's
own understanding** — "Reddit believes this account is over 18 / under 16 / unverified" — bound to
the platform's domain. The parent is verifying *what the platform thinks*, and how it came to think
it.

## How a parent invokes it

The trigger has to be something a child cannot silently disable or fake, which means it belongs at
the **operating-system level**, not inside the app the child controls:

1. **The parent performs a non-overridable "safe sequence" on the app icon** — a long-press on the
   child's Reddit (or other) icon that opens an OS-level age-assurance panel, the way a long-press
   already surfaces OS app-info today. The app cannot suppress or spoof this surface because the OS,
   not the app, draws it. (Regulation is what would compel both the OS gesture and the platform's
   obligation to populate it.)
2. **The panel presents the platform's age-assurance claim** for that account as canonical text with
   a `verify:` line back to the platform's domain — *Reddit shows that it specifically understands
   this user to be over/under a certain age, and on what basis.*
3. **The parent's phone (or a second device) scans or clips the panel** and Live Verify walks the
   verification chain back to the provider of the assurance — confirming the platform genuinely
   asserts this, and surfacing **who actually did the age check** (the platform itself, a third-party
   age-verification provider, a government ID service, or *nobody*).

The result is an answer the parent can trust because it is bound to the platform's domain and
chained to whoever performed the assurance — not a screen the child could have mocked up.

## Example: Platform Age-Assurance Claim

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #1a5f2a; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <span verifiable-text="start" data-for="ageassurance"></span>
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;">PLATFORM AGE-ASSURANCE STATEMENT
═══════════════════════════════════════════════════════════════════

Platform:      Reddit
Account Ref:   (salted token — no username disclosed)
Understood As: UNDER 18 (minor protections applied)
Assurance By:  Yoti age-estimation, 11 May 2026
Method:        Facial age estimation (highly effective AA)
As At:         15 Jun 2026 10:22 UTC
Salt:          P9R2T7K4

<span data-verify-line="ageassurance">verify:reddit.com/age-assurance/v</span></pre>
  <span verifiable-text="end" data-for="ageassurance"></span>
</div>

## Example: No Assurance On Record (the finding that matters most)

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #7a1f1f; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;">Age-Assurance Audit Result
═══════════════════════════════════════════════════════════════════

Platform:      Reddit
Result:        NO AGE ASSURANCE ON RECORD
Meaning:       This account's age was self-declared and never checked
Action:        Parent may treat the account as unverified

verify:reddit.com/age-assurance/v
</pre>
</div>

A platform that did no real age assurance cannot produce a verifiable claim that it did. The
**absence** of a chain — a 404, or an explicit "self-declared, unverified" status — is exactly the
signal a parent or regulator is looking for. This is the inverse of most verification: here, *failing
to verify is the informative outcome*, not an error.

## Data Verified

The platform, a salted account token (never the username or content), the age band the platform
understands the account to fall in (e.g. UNDER 18 / OVER 18 / OVER 16), the assurance method and the
party that performed it, the assurance date, and the as-at timestamp.

**What is deliberately NOT included:**

- the child's exact date of birth, name, or username (a salted token stands in for the account)
- the account's content, activity, messages, or contacts
- any data about the parent performing the audit
- the underlying ID document or biometric used in the original assurance

The audit answers "what does the platform believe about this account's age, and who checked?" — not
"who is this child and what do they do online?"

## Data Visible After Verification

The parent (or regulator) sees the platform's domain, the age band, the assurance provider, and the
chain status.

**Status Indications:**
- **Assured — Over Threshold** — The platform asserts and can evidence the account is over the age
  threshold, via a named assurance method.
- **Assured — Under Threshold** — The platform understands the account as a minor and (per its duty)
  applies minor protections.
- **Self-Declared / Unverified** — The age was typed at sign-up and never checked. Surfaced plainly,
  not hidden.
- **No Assurance On Record (404)** — No verifiable age-assurance claim exists for this account. Per
  the fail-loudly principle this is shown as a definite finding, never silently treated as "probably
  fine."
- **Expired** — A prior assurance has lapsed and the platform has not re-checked (age estimation
  ages out as the child grows).

A network error or unreachable endpoint is reported as *"could not confirm"* — never rounded up to
"assured." For child-safety, an unconfirmable claim must read as unconfirmed.

## Second-Party Use

The **parent / guardian** benefits directly.

**Audit on demand:** The safe-sequence gesture lets a parent check, at any moment, what the platform
believes about their child's account — and whether any real assurance happened.

**Catch the silent failure:** The most common real-world case — a child who typed an adult birth year
at sign-up — surfaces as "self-declared / unverified," which is precisely what a parent cannot
discover today.

**Non-spoofable surface:** Because the gesture and panel are drawn by the OS and the claim is bound
to the platform's domain, the child cannot fake a reassuring screen.

## Third-Party Use

**Regulators (Ofcom and equivalents)**

A verifiable, account-level age-assurance claim is auditable evidence of whether a platform is
actually discharging its "highly effective age assurance" duty — sampled and checked without the
regulator ingesting children's identities.

**App-store and OS vendors**

The natural operators of the safe-sequence surface. The OS already mediates app metadata; exposing a
compelled platform age-assurance panel is the same primitive applied to a regulatory obligation, and
pairs with existing parental-control frameworks.

**Schools and safeguarding bodies**

Where a duty of care exists, a safeguarding lead can confirm whether a platform applies minor
protections to a known minor's account — without surveilling the account's content.

## Verification Architecture

The verifiable artifact is the **platform's own age-assurance statement**, published as canonical
text bound to the platform's domain, surfaced through an OS-level safe-sequence gesture the child
cannot intercept. The parent's device runs the standard `text → normalize → SHA-256 → GET` check and
walks the chain to the assurance provider.

- **The platform is the issuer and the subject.** It attests its own belief; it cannot outsource the
  claim to the child's device, which is why the OS-drawn surface matters.
- **Absence is a first-class result.** Unlike most use cases, the *lack* of a verifiable chain is the
  signal — a platform that skipped assurance cannot manufacture a passing claim.
- **Assurance provider in the chain.** When a third party (an age-estimation provider, a government ID
  service) did the check, it appears as the next link, so the parent sees not just *that* the platform
  claims an age but *who stood behind the check*.

This complements, and does not replace, the platform's own parental controls and the regulator's
oversight. It makes the platform's age belief *checkable by the family* rather than locked inside the
platform.

## Privacy Salt

The salt is required and does double duty. Each account's assurance statement carries a unique salt
so that:

- the account cannot be enumerated or correlated across audits by hash
- the statement reveals an **age band and a method, never the username, the content, or the exact
  DOB** — a salted token represents the account

This keeps a child-safety feature from becoming a child-surveillance feature: the parent learns the
platform's age belief, not a portable identifier for the child.

## Authority Chain

**Pattern:** Regulated (platform attestation under a statutory age-assurance duty).

The claim is issued by the platform from its own domain; where a third-party provider performed the
assurance, the chain names them; the platform's duty itself rests on the governing statute and its
regulator.

```
✓ reddit.com/age-assurance/v — Platform's age-assurance statement for this account
  ✓ yoti.com/assurance — Performed the age-estimation check
    ✓ ofcom.org.uk — Regulates online-safety age-assurance duties
      ✓ gov.uk — UK government root namespace
```

Where the platform self-asserts with no third-party provider, the chain is shorter and the absence of
an independent assurance link is itself visible to the parent. See
[Authority Chain Specification](../../docs/authority-chain-spec.md) and
[Age-Gating Without Revealing Date of Birth](age-gating-without-dob.md) for the outward-facing
sibling of this inward-facing audit.

## Further Derivations

None currently.

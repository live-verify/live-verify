# Safe-Sequence Platform Disclosure: Turning Verification Back on the Platform

## A new direction, not another document

Almost every Live Verify use case has the same shape: a person **holds a document** and checks that
it is genuine. The verifier presents a credential outward; an issuer's domain confirms it. Five
hundred-plus use cases are variations on *"prove this artifact is real."*

Two recent use cases break that shape, and they break it the **same way**:

- [Ad Placement Provenance](../public/use-cases/ad-placement-provenance.md) — a reader right-clicks an
  ad and asks the browser *"who placed this?"*, walking a chain that names the ad network responsible
  for that specific placement.
- [Platform Age-Assurance Parental Audit](../public/use-cases/platform-age-assurance-parental-audit.md)
  — a parent performs a non-overridable gesture on a child's app icon and asks the platform *"what age
  do you believe this account is, and who checked?"*

Neither verifies a document the user holds. In both, **the platform itself is the subject of
scrutiny**, the user *turns verification back onto the platform*, and the platform is made to disclose
something about what it is *doing to the user* rather than something the user is carrying. This is a
distinct branch of the protocol, and this note names it: **Safe-Sequence Platform Disclosure**.

## The four properties that define it

A use case belongs to this branch when all four hold. They are exactly the four assumptions the
classic "verify a document" pattern makes, inverted:

| | Classic Live Verify | Safe-Sequence Platform Disclosure |
|---|---|---|
| **What is verified** | a document the user holds | a thing the platform is *doing to the user* (placing this ad; believing this age) |
| **Who is the subject** | the credential holder | **the platform** — it is under scrutiny, not the relying party |
| **How it is invoked** | the user clips/scans a document | a **non-overridable "safe sequence"** drawn by the OS/browser, which the app cannot suppress or spoof |
| **What "no result" means** | error, OCR failure, or forgery | **the finding** — the absence of a verifiable chain is the informative outcome |

The direction of trust is reversed. Instead of "I present my credential and you check it," it is "I
compel you to show me what you are doing, and I check that against your own domain."

## The safe-sequence primitive

The defining mechanism is the **safe sequence**: a gesture that surfaces the platform's disclosure
through a surface the platform **does not control**.

- **It must be platform-drawn, not app-drawn.** If the disclosure panel were rendered by the app
  under scrutiny (Reddit, the ad's own iframe), the app could suppress it, fake a reassuring version,
  or refuse to populate it. So the surface has to belong to the **operating system or the browser** —
  the long-press on an app icon that already opens OS app-info; the browser context-menu on an ad
  element. The OS/browser draws the panel and runs the verification; the app merely supplies a
  signed, domain-bound claim into it.
- **It must be non-overridable.** A child cannot disable the safe sequence on their own phone; a
  malvertising iframe cannot intercept the browser's "show provenance." Non-overridability is what
  makes the result trustworthy — the user knows they are looking at a surface the adversary could not
  redraw.
- **Regulation is the lever.** Platforms will not volunteer these disclosures. What compels both the
  *gesture* (the OS/browser must offer it) and the *content* (the platform must populate it with a
  truthful, verifiable claim) is law — the online-safety and age-assurance duties already arriving,
  and the advertising-accountability regimes that could follow. This branch is where Live Verify
  meets *compelled* transparency, not voluntary attestation. The cryptography is the same
  `text → normalize → SHA-256 → GET`; the novelty is who is made to publish, and the surface the user
  reads it on.

## Absence is a first-class result

In the document-verification pattern, a 404 means "forgery or error." In this branch, **a 404 is
often the most important finding**, because the platform cannot manufacture a claim it never earned:

- A platform that did **no real age assurance** cannot produce a verifiable "we checked" claim — the
  absence *is* the answer the parent needs ("self-declared, never verified").
- An ad with **no provenance manifest** cannot fake a liability chain — the absence tells the user no
  one signed for this placement.
- A service claiming a "child-safe mode" with **no licence behind it** fails to verify, exactly as a
  fabricated claim does.

So the [fail-loudly principle](../LLM.md) acquires a second meaning here. It is not only "never round
a network error up to a pass." It is: **the deliberate absence of a chain is a designed, legible
signal, not an error state to be smoothed over.** A Safe-Sequence Platform Disclosure UI must render
"nothing here" as a definite, readable finding — never as blank, never as "probably fine."

## Member use cases

Two exist today; both should be read as instances of this branch rather than one-offs:

- **[Ad Placement Provenance](../public/use-cases/ad-placement-provenance.md)** — browser safe
  sequence; subject is the ad supply chain; absence = no one signed for this placement; surfaces the
  ad network actually used.
- **[Platform Age-Assurance Parental Audit](../public/use-cases/platform-age-assurance-parental-audit.md)**
  — OS safe sequence; subject is the platform's age belief; absence = no assurance was done; surfaces
  who performed the check, up to a state-sanctioned children's-tier licence.

## The frontier

The same four properties cover a wide field of *"make the platform show me what it is doing, on a
surface it can't fake"* questions. Each is a candidate member use case:

- **"What does this app currently know about my location?"** — a safe sequence surfacing the
  platform's claimed location-access state and basis, verifiable against its domain; absence = no
  honest disclosure.
- **"Is this verified-checkmark backed by anything?"** — the blue-check problem: the platform
  discloses what its "verified" badge actually attested (identity? payment? nothing?), chained to
  whatever did the verifying.
- **"What consent does this service claim I gave?"** — a user audits the data-processing or
  marketing consent a platform asserts it holds, surfaced and checkable rather than buried in a
  settings dashboard the platform controls.
- **"Is this content/recommendation sponsored?"** — the platform discloses paid-placement status for
  a specific item, bound to its domain, via the same provenance machinery as ad placement.
- **"Is this account a bot / automated?"** — the platform discloses what it knows or asserts about an
  account's automated status.

In each, the test for membership is the four properties: platform as subject, user turns verification
inward, a non-overridable safe sequence, and absence-as-finding. Anything that is really "the user
presents a credential" belongs in the classic branch, not here.

## Relationship to the rest of the protocol

This branch **reuses** existing machinery rather than replacing it:

- The verification pipeline is unchanged (`text → normalize → SHA-256 → GET`).
- The chains it walks are [authority chains](authority-chain-app-display.md) — here expressing
  *liability* or *regulatory licence* rather than *credential authority* — and they anchor to
  [sovereign roots](sovereign-roots.md) where a state licence is involved (e.g. a children's tier
  approved by a national regulator).
- What is new is the **direction** (platform as subject), the **invocation** (the safe-sequence
  primitive on a non-overridable surface), and the **semantics of absence** (a missing chain is a
  finding).

It is the natural home for Live Verify in a world of platform-accountability regulation: the same
hash-bound, domain-anchored verification, pointed not at the documents people carry but at the
behaviour of the platforms they use — surfaced through a gesture those platforms cannot intercept.

## Related

- [Ad Placement Provenance](../public/use-cases/ad-placement-provenance.md) — member use case.
- [Platform Age-Assurance Parental Audit](../public/use-cases/platform-age-assurance-parental-audit.md)
  — member use case.
- [Authority Chain: App Display](authority-chain-app-display.md) — the chain-walk and display model
  this branch reuses.
- [Sovereign Roots](sovereign-roots.md) — where a state-licence disclosure anchors.

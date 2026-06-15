---
title: "Age-Gating Without Revealing Date of Birth"
category: "Identity & Authority Verification"
volume: "Very Large"
retention: "Short-lived (per-use proof window)"
slug: "age-gating-without-dob"
verificationMode: "clip"
tags: ["age-verification", "age-gating", "privacy", "selective-disclosure", "over-18", "minimal-disclosure", "salted-proof", "single-use"]
furtherDerivations: 1
---

## The Problem

A bouncer at a bar, a cashier at an off-licence, an online platform's sign-up
flow, a cigarette vending machine — all of them need to know one thing: *is this
person old enough?* They do not need the birthdate. They do not need the name.
They do not need the document number. Yet the instrument almost everyone reaches
for — a driving licence, a passport, a national ID card — discloses all three,
plus the photo, the address, and a unique number that ties the holder to every
other place the document has been shown.

This is wildly more disclosure than the question requires. The question is
binary — *over 18?* (or over 21, or over 16) — and the honest answer is a single
bit. Handing over a full identity document to answer a one-bit question is the
privacy equivalent of giving a stranger your house keys to confirm you have an
address.

An **age-threshold confirmation** carries only the answer to the threshold
question. An issuer that *already knows* the person's age — a government ID
service, a bank or KYC provider that verified the person at onboarding, or a
dedicated age-verification provider — attests a binary claim: "the holder of
this token is over 18." The claim is bound to the issuer's domain via a hash, so
the venue, off-licence, platform, or machine can confirm the threshold is met
**without learning the birthdate, the name, or the document number**. The
endpoint confirms status only; it never echoes back who the person is.

### The bank as the natural issuer

The most under-used issuer is the one with the oldest, strongest evidence: a
person's **own bank**. A customer of thirty years, holding a credit card the bank
underwrote, has been age-verified more thoroughly than any sign-up flow could
manage — the bank *cannot* have issued that card to a minor. Asking the bank to
attest the single bit it already knows — "this customer is over 18" — is far less
disclosure than handing a passport to a website. The bank reveals **one bit, not
an identity**: not the account, not the name, not how long they've banked there,
just the threshold answer, bound to the bank's domain.

This also fixes the platform side of the privacy problem. When Reddit accepts a
bank-issued "over 18" confirmation, the only thing Reddit needs to **remember** is
that bit — *over 18: yes* — not who the user is, not which bank, not any document.
The platform stores the answer to its one question and nothing it would later have
to protect, breach-disclose, or hand to a data broker. The issuer holds the
identity (it already had it); the platform holds the bit; nobody in between learns
more than they need.

## Limitations — read before relying on this

This is a **hash-bound attestation, not a zero-knowledge proof**, and the
difference matters enormously. Read this section before treating it as
"anonymous age verification" — on its own, it is not.

- **It proves issuer-attestation, not cryptographic anonymity.** A plain
  hash-bound confirmation establishes exactly one thing: *an issuer attested that
  this subject meets the age threshold.* That is genuinely useful — it removes the
  birthdate, name, and document number from the exchange — but it is **not** a
  zero-knowledge proof. It does not mathematically guarantee that no further
  information leaks, and it does not by itself make the holder unlinkable. Anyone
  who reads "minimal disclosure" as "cryptographically anonymous" is overreading
  the instrument.
- **Without a per-use salt and single-use tokens, the same attestation is
  correlatable.** If one fixed token string is presented at the bar on Friday, the
  off-licence on Saturday, and an online platform on Sunday, those three checks
  hash to the *same* value, and a party who sees more than one of them can link
  them into a profile — "the over-18 token that also shops here and signs up
  there." The salt and single-use issuance described below are what limit this;
  they are **mandatory**, not optional polish. Even with them, a *colluding
  issuer* who logs every issuance against the subject can still correlate, because
  the issuer knows who it issued each token to. This protocol reduces correlation
  by relying parties; it does not blind the issuer.
- **Binding the token to the right *person* is out of scope.** This confirms that
  *a valid over-18 token exists and is current*. It does **not** confirm that the
  person presenting it is the subject the issuer attested. A borrowed, bought, or
  passed-along token will verify perfectly. Tying the token to the presenter — that
  this human is the human the issuer checked — requires a **separate liveness or
  photo-match step** that this attestation deliberately does not provide. Do not
  rely on this alone where presenter-binding is the real risk (e.g. an under-age
  buyer using an adult's token).
- **It complements, it does not replace, zero-knowledge age-proof schemes.**
  Where genuine unlinkability is required — a regulated online age gate that must
  not be able to build a behavioural profile, a jurisdiction mandating
  privacy-by-design — the stronger instrument is a **zero-knowledge age proof**
  (anonymous-credential / selective-disclosure schemes such as those built on
  BBS+/anonymous credentials, the EU Digital Identity Wallet's age-proof work, and
  similar). Those provide unlinkability by construction. This use case is the
  pragmatic, paper-and-camera-friendly bridge for issuers that do not yet have ZK
  tooling deployed; it should be presented as a step *toward* minimal disclosure,
  not as having solved the anonymity problem. Where the law or the threat model
  demands unlinkability, use the ZK scheme.

## What gets attested

A single binary or threshold fact, and nothing else:

- **The result** — `OVER 18` (or the relevant threshold: over 21, over 16).
- **The issuer** — the domain of the age-verification provider or ID service that
  vouches for it.
- **A validity window** — when the proof expires.
- **A single-use token reference** — distinct per issuance.
- **A salt** — making each issuance hash to a unique value.

Deliberately absent: **date of birth, name, document number, address, photo.**
The issuer holds those; it does not put them in the artifact, and the endpoint
never returns them.

## Example

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #1a5f2a; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <span verifiable-text="start" data-for="agegate"></span>
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;">AGE THRESHOLD CONFIRMATION
═══════════════════════════════════════════════════════════════════

Result:            OVER 18
Issuer:            AgeProvider (age-verification provider)
Valid Until:       15 Jun 2026 23:59 UTC
Single-Use Token:  AT-2026-0615-9F3C71
Salt:              K7Q2M9X4

<span data-verify-line="agegate">verify:age-provider.example/threshold/v</span></pre>
  <span verifiable-text="end" data-for="agegate"></span>
</div>

Note what is *not* on this artifact: no birthdate, no name, no licence or passport
number. A bouncer scanning it learns "OVER 18 — confirmed by AgeProvider, valid
right now," and nothing that would let them, or anyone they later talk to, work
out who the person is.

## Data Verified

The threshold result (`OVER 18` / `OVER 21` / `OVER 16`), the issuing provider's
domain, the validity window, the single-use token reference, and the salt.

**What is deliberately NOT included:**

- **Date of birth** — the issuer knows it; it is never placed in the artifact and
  never returned by the endpoint. The whole point is to answer the threshold
  question without it.
- **Name** — not present. The relying party confirms an age threshold, not an
  identity.
- **Document number** — not present. No licence, passport, or national-ID number,
  so the token cannot be cross-referenced against other uses of the underlying
  document.
- **Address, photo, and any other ID-document field** — absent by design.

The artifact carries one bit of answer plus the metadata needed to verify it. If
a relying party needs *more* than the threshold — say, the actual name for a
contract — that is a different question requiring a different (and more
disclosing) instrument, and it should be asked for explicitly, not smuggled in
here.

## Data Visible After Verification

Shows the issuer domain and the threshold result. The page answers the narrow
question — *is this over-threshold token currently valid?* — and nothing about the
holder's identity.

**Status Indications:**

- **OVER_THRESHOLD / CONFIRMED** — The issuer attests the subject meets the stated
  age threshold and the token is current.
- **EXPIRED** — The proof window has ended. A fresh confirmation is required;
  treat as no proof, not as "over threshold."
- **REVOKED** — The issuer has withdrawn this token (e.g. issued in error,
  superseded, or the underlying verification was found invalid). Do not accept.
- **404** — No matching token exists on the issuer's records. The artifact is
  forged or fabricated. Told plainly: a 404 is **not** a confirmation. Never assume
  over-threshold on a 404, an EXPIRED, a REVOKED, or any error or timeout —
  absence of a positive result is a refusal, and the gate must fail closed.

## Second-Party Use

The **token holder** benefits directly.

- **Minimal disclosure at the door:** Prove over-18 to a venue or cashier without
  surrendering a document that reveals birthdate, name, and address. The holder
  shows one bit, not a dossier.
- **No document to lose or photograph:** Where the current practice is "hand over
  your driving licence to be photographed by a club," an age-threshold token
  removes the licence — and its number, and its address — from that exchange
  entirely.
- **Dignity for edge cases:** Someone who looks younger than they are can answer a
  challenge with a verifiable "OVER 18" without producing identity documents and
  without explaining themselves.

## Third-Party Use

**Venues, Off-Licences, and Bars**

Confirm the threshold at point of sale or entry. "CONFIRMED" from the issuer's
domain is a fast, definitive answer that does not require inspecting, handling, or
recording an identity document. (It does **not**, on its own, confirm the
presenter *is* the subject — see Limitations; a photo-match step is needed where
that is the real risk.)

**Online Platforms and App Sign-Up Flows**

Gate access to age-restricted content or services by accepting an issuer-attested
over-threshold token instead of demanding an uploaded ID document. This reduces
the platform's data-breach surface — it never holds the birthdate or document in
the first place. Where the platform is legally required to be *unable* to profile
users by age check, this is **insufficient on its own** and a ZK scheme is the
correct instrument (see Limitations).

**Vending Machines and Unattended Retail**

A cigarette, alcohol, or other age-restricted vending machine can verify a token
locally and dispense only on `CONFIRMED`. No human inspection, no stored document,
fail-closed on any non-positive status.

## Verification Architecture

The relying party captures the threshold confirmation (clip or camera), normalizes
the bounded text, computes SHA-256, and performs a GET against the issuer's domain.
The endpoint returns a status only — `OVER_THRESHOLD`/`CONFIRMED`, `EXPIRED`,
`REVOKED`, or `404` — and **never echoes the underlying content**, because the
underlying content is precisely the identity data the protocol exists to withhold.

This solves a specific over-disclosure problem: the current age-check instruments
are full identity documents, and they answer a one-bit question with a complete
profile. An age-threshold token answers the one-bit question with one bit. What it
does *not* solve — presenter-binding and cryptographic unlinkability — is named
honestly in Limitations rather than implied away.

The gate **fails closed**: a 404, an expired token, a revoked token, a timeout, or
any inability to reach the issuer is treated as "not confirmed," never as "over
threshold."

## Privacy Salt

**Required, and load-bearing — this is what limits correlation.**

Each issuance carries a unique, issuer-generated salt **and a single-use token
reference**. Together they ensure:

- The same subject, asking for an over-18 token twice, produces two different
  hashes — so two relying parties cannot trivially recognise the same token across
  venues.
- A token is **single-use**: presenting it burns it for that proof window, so a
  captured hash cannot be replayed elsewhere as a fresh proof.
- The artifact cannot be pre-computed or rainbow-tabled, and a low-entropy string
  like "OVER 18" cannot be enumerated against the issuer.

This must be stressed: **a fixed, reusable "OVER 18" token defeats the privacy
purpose.** Without per-use salting and single-use issuance, the same value
presented across the bar, the shop, and the website hashes identically and becomes
a stable correlator — the exact profiling outcome the protocol is meant to avoid.
Even *with* salting and single-use tokens, the issuer that mints them can still
correlate its own issuances against the subject; this protocol blinds *relying
parties*, not the issuer. Where the issuer must also be unable to correlate, a
zero-knowledge scheme is required (see Limitations).

## Authority Chain

**Pattern:** Regulated

The token is issued from the age-verification provider's (or government ID
service's) own domain, operating under the relevant age-assurance / identity
framework.

Age-verification provider:

```
✓ age-provider.example/threshold/v — Issues and verifies age-threshold confirmations
  ✓ ageverification-regulator.example — Certifies age-assurance providers
    ✓ gov.example — Government root namespace
```

Government ID service (alternative issuer):

```
✓ id.gov.example/age/v — Threshold attestation from the national ID service
  ✓ gov.example — Government root namespace
```

The chain establishes that the issuer operates within the relevant age-assurance
or identity framework — not that the government department itself sits at the door.

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the
full protocol.

## Further Derivations

1. **Platform age-assurance parental audit** — the inverse direction: instead of a subject proving
   age outward to a gatekeeper, a parent audits the age belief a platform *already holds* about a
   child's account (including the case where no assurance was ever done). See
   [Platform Age-Assurance Parental Audit](platform-age-assurance-parental-audit.md).

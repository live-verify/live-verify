# Security Considerations

> The consolidated security-considerations document for the Live Verify protocol, in the genre a
> standards reviewer expects: each threat named, what the protocol does about it today, what is
> proposed but unimplemented, and what residual risk remains. Detailed treatments live in the linked
> documents; this page is the map. It fulfils the "write a threat model" action in
> [weaknesses_audit.md](weaknesses_audit.md).
>
> A status label appears on every item: **IMPLEMENTED** (shipped in the canonical clients),
> **PROPOSED** (designed in these docs, not built), or **OPEN** (acknowledged, no design yet).
> Nothing below is papered over: where the honest answer is "the protocol does not provide this,"
> the document says so.

## 1. Trust model: what a verification proves — and does not

A verification is a hash of normalized claim text sent as an HTTPS GET to the domain named in the
claim's `verify:` line, answered by a **plain, unsigned response**. Full treatment:
[cryptographic-foundations.md](cryptographic-foundations.md#what-the-base-protocol-is--and-is-not).

- **It proves:** the text is unaltered relative to a hash the domain currently publishes, and the
  party controlling that domain stands behind it *right now*. This is a **live confirmation** —
  deliberately revocable in real time, like a courier tracking lookup.
- **It does not prove:** anything durable. There is **no issuer signature**, therefore **no
  non-repudiation** (the issuer can deny a past answer), **no transferable proof** (a relying party
  cannot forward the result; every verifier must query live), and past verifications are **deniable
  by deletion** of a static hash file. The deletion property is partly deliberate — it is what makes
  revocation instant — but it means the base protocol is *not an evidence system*.
- **Mitigations — PROPOSED, unimplemented:** [third-party witnessing](WITNESSING-THIRD-PARTIES.md)
  (independent timestamped ledger of hashes and status changes) and
  [Merkle anchoring](cryptographic-foundations.md#merkle-trees-for-database-anchoring) (periodic
  public commitment of a root over all published hashes). Any document that relies on
  non-repudiation — notably the verification-as-acknowledgment pattern in
  [post-verification-actions.md](post-verification-actions.md) — is relying on these unimplemented
  layers and is annotated accordingly.

## 2. Query privacy: the lookup leaks

Only a hash crosses the wire — document *content* confidentiality is unconditional. Query *privacy*
is not. Full treatment: the privacy caveats in the [README](../README.md).

- **2a. Confirmation oracle for guessable documents — OPEN (mitigated by authoring practice).**
  SHA-256's one-wayness is irrelevant when the preimage is low-entropy: for a templated document (a
  standard licence line, a payslip) an attacker enumerates plausible texts, hashes each, and a `200`
  confirms the guess. Mitigation is entropy: intrinsically unpredictable content (a bank statement's
  balances and transaction IDs) or a per-document **salt**. Salting is specified per use case (e.g.
  [e-ink badges](../public/e-ink-id-cards.md)) but salt entropy/generation is not yet uniformly
  specified — an open item in [weaknesses_audit.md](weaknesses_audit.md).
- **2b. Lookup-pattern metadata — OPEN, mitigations PROPOSED.** The issuer learns which document was
  checked, when, and from what IP — logged by the party with the most incentive to profile it.
  Proposed fixes, none implemented: **k-anonymity hash-prefix range lookup** (client sends a prefix,
  receives a bucket, disambiguates locally — the Have I Been Pwned 2018 approach), **OPRF** (issuer
  answers without learning the input), and **batching**.
- **2c. Timing enumeration — OPEN.** Response-time differences between "hash exists" and "not found"
  can leak existence even without a `200`. No timing-equalisation guidance is currently specified
  for issuer endpoints.

## 3. Transport, DNS, and endpoint integrity

Trust reduces to "whoever controls the domain at lookup time," so everything that can put an
attacker in the answer path is in scope.

- **3a. DNS / BGP interception — OPEN (inherited WebPKI posture).** The GET resolves and routes over
  the public internet. A DNS hijack (registrar compromise, cache poisoning where DNSSEC is absent),
  a BGP prefix hijack, or a mis-issued TLS certificate lets an attacker answer as the issuer, and a
  forged `200 verified` is indistinguishable from a real one — there is no issuer signature to check
  (§1). The protocol's defence is TLS + the WebPKI, and it inherits their failure modes wholesale:
  no certificate pinning, no DNSSEC requirement, no CAA guidance for issuers. Certificate
  Transparency monitoring makes CA mis-issuance *detectable after the fact* for issuers who watch CT
  logs, but the protocol does not currently require or specify any of this. Issuer-side hardening
  guidance (DNSSEC, CAA records, CT monitoring, registrar lock) belongs in the issuer guide and is
  not yet written.
- **3b. Domain takeover, expiry re-registration, hosting compromise — OPEN, detection PROPOSED.** A
  lapsed or hijacked issuer domain answers with full authority. The
  [sovereign-roots takeover-detection proposal](sovereign-roots.md#takeover-detection-compensating-for-the-missing-signature-proposal)
  — continuity monitoring of TLS/CA, hosting ASN, meta-file hash, and DNS delegation, cross-checked
  by independent parties, with fast graph-wide revocation — would make takeover *loud* rather than
  silent. It is detection and containment, not a signature, and it is unimplemented.
- **3c. Plaintext downgrade — IMPLEMENTED (fixed).** `buildVerificationUrl`/`buildMetaUrl`
  previously chose `http://` when the string contained `localhost`/`127.0.0.1` *anywhere* — so
  `verify:attacker.example/localhost/x` was fetched over plaintext. Fixed: the scheme is now chosen
  by parsing the bare hostname (`schemeForTarget()` in `public/app-logic.js`); only exact loopback
  hosts get `http`. Lesson recorded here because it generalises: **security decisions must parse
  hostnames, never substring-match URLs.**
- **3d. Presentation replay — addressed per use case.** A GET is idempotent; there is no token to
  replay. The replay that matters is *presentation* replay: a photographed or stale claim re-shown
  later as current. This is the [point-in-time-vs-current](point-in-time-vs-current.md) discipline,
  and for high-risk in-person credentials, salt rotation with burn-on-verify
  ([e-ink badges](../public/e-ink-id-cards.md)) makes a photographed claim die on rotation —
  IMPLEMENTED as a spec for that use-case family, no hardware prototype.

## 4. Issuer-supplied normalization: the "displayed == hashed" invariant

The pitch is that what a human reads is what gets hashed. The precise invariant is *displayed ==
hashed modulo published, meaning-preserving normalization* — and one mechanism can currently violate
it. Full treatment: [NORMALIZATION.md](NORMALIZATION.md#the-invariant--and-the-honest-limit-on-it)
and [spoofing-countermeasures.md](spoofing-countermeasures.md).

- `charNormalization` — **IMPLEMENTED, safely constrained** to single-character folds (`é→e`);
  cannot rewrite meaning.
- `ocrNormalizationRules` — **OPEN risk.** Arbitrary issuer-supplied regex/replacement pairs run on
  the text before hashing: a hostile issuer could rewrite the on-screen claim into a different
  hashed string, and the same path is an unbounded-regex **ReDoS** surface in the client. Bounds
  today: the rules are hash-committed (an *endorsed* issuer cannot ship them secretly — exposure is
  confined to amber/self-verified issuers), and the exact pre-hash bytes are inspectable in every
  client's Normalized view. Clients should treat the rules as untrusted input and apply their own
  guards (rule-count caps, execution timeouts, rejecting backreferences). **PROPOSED fix:** replace
  arbitrary regex with a closed, client-owned folding table.

## 5. Unicode canonicalization

- **NFC — IMPLEMENTED (fixed).** `normalizeText()` applies `String.prototype.normalize('NFC')`
  first, so precomposed and decomposed forms of the same glyph (which render identically but hash
  differently) can no longer cause silent cross-platform verification failures. All clients run the
  same canonical `normalize.js` via a JS bridge, so the form is applied identically everywhere.
- **Residual — OPEN:** ambiguities NFC does not fold — Turkish İ/I, German ß/ss,
  fullwidth/halfwidth forms — remain documented divergence risks in
  [weaknesses_audit.md](weaknesses_audit.md).

## 6. The 404 signal

A `404` conflates "never issued / forged" with "OCR misread" and "wrong text selected" — and a
security signal users have been trained to retry past is not a security signal. Status: the
OCR-noise floor has been substantially shrunk (reading-order assembly, loud truncation, NFC, the
editable pre-hash view), and the remaining design item — **splitting retry-able read failures from
terminal clean-read failures**, so "reposition and scan again" is never offered on a clean-read
`404` — is tracked as client work. Full treatment:
[weaknesses_audit.md](weaknesses_audit.md) ("404 is ambiguous") and `apps/ios/LiveVerify/TODO.md`.
Note also that genuine revocation is *not* conflated here: a revoked claim answers `200` with a
`REVOKED` status, not `404`.

## 7. Self-verification, authority, and namespace tenancy

Verifying successfully is not the same as being trustworthy, and the display layer carries that
distinction.

- **Amber for self-verification — IMPLEMENTED.** A claim whose confirming domain is the domain
  making it renders amber with an explicit warning, never green. Green requires an independent
  [endorsement chain](authority-chain-spec.md), hash-committed so an endorser signs the issuer's
  entire self-description.
- **Registrable-domain emphasis and public-suffix collapse — IMPLEMENTED.** The display emphasises
  the registrable domain, and `*.github.io`-style tenancies collapse to the operator's suffix so a
  look-alike tenancy cannot impersonate an institution.
- **Namespace-operator disclaimer — PROPOSED.** An operator of a multi-tenant suffix disowning
  tenants' claims at the suffix apex: [public-suffix-operator-disclaimer.md](public-suffix-operator-disclaimer.md).
- **Sovereign-root anchoring — PROPOSED.** The bundled root list, its amber/anchored semantics, and
  its governance: [sovereign-roots.md](sovereign-roots.md).

## 8. In-page spoofing and the chrome-vs-page boundary

Any page can draw a fake "verified" badge. Countermeasures implemented in the extension (domain
display, banner disclaimer that screenshots prove nothing, API-set badge counts) are in
[spoofing-countermeasures.md](spoofing-countermeasures.md). The deeper limit is that **browsers are
weak at signalling browser-drawn vs page-drawn UI**, which caps every in-page trust surface — the
live-only [ad-placement-provenance](../public/use-cases/ad-placement-provenance.md) case states this
plainly and is, in part, a proposal to browser makers. The project's own front page deliberately
**does not render a verdict** (it builds the lookup URL and hands it to the user), because a page
grading itself teaches exactly the wrong habit.

## 9. Post-quantum

SHA-256 preimage resistance is weakened only quadratically by Grover's algorithm (effective 128-bit
preimage security), and the protocol uses no public-key cryptography of its own — its asymmetric
exposure is inherited from TLS, and migrates when TLS does. Treatment:
[quantum-computing-threat-assessment.md](quantum-computing-threat-assessment.md).

## 10. Status summary

| Area | Status |
|---|---|
| Content confidentiality (only a hash sent) | IMPLEMENTED — holds for honest client software; see below |
| NFC canonicalization | IMPLEMENTED |
| HTTP-downgrade fix (hostname-parsed scheme) | IMPLEMENTED |
| Amber self-verification, domain emphasis, suffix collapse | IMPLEMENTED |
| Endorsement chains (hash-committed `authorizedBy`) | IMPLEMENTED |
| Salt for guessable documents | Specified per use case; salt spec not uniform — OPEN |
| k-anonymity prefix lookup / OPRF / batching | PROPOSED |
| Witnessing / Merkle anchoring (non-repudiation) | PROPOSED |
| Sovereign-root list + takeover detection | PROPOSED |
| Closed normalization folding table (replaces issuer regex) | PROPOSED |
| Retry-vs-terminal 404 split | OPEN (client design item) |
| DNS/BGP/CA issuer-side hardening guidance | OPEN (not yet written) |
| Timing-equalisation guidance for endpoints | OPEN |
| Client-software integrity (a coerced or compromised platform shipping an eavesdropping client) | OPEN — out of the protocol's reach; mitigations named in [weaknesses_audit.md](weaknesses_audit.md) item 36, none built |

The honest headline: the protocol's *confidentiality* story is strong and simple; its *evidence*
story is deliberately absent pending witnessing/Merkle; its *endpoint-integrity* story currently
inherits the WebPKI's, no more and no less; and its *query-privacy* story is the largest known gap,
with standard fixes named but unbuilt.

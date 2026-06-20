# Merkle Tree Certificates: The Industry Validates Live Verify's Primitives

In October 2025, Cloudflare — with Chrome Security and partners at the IETF — announced
[Merkle Tree Certificates (MTCs)](https://blog.cloudflare.com/merkle-tree-certificates/), a proposed
redesign of the Web Public-Key Infrastructure (WebPKI) for the post-quantum era. The motivation is
narrow and specific to TLS, but the *primitives* they reached for are the same ones Live Verify
already uses. This page records what MTC validates about Live Verify's design, where the two systems
genuinely differ (they are complementary layers, not competitors), and how the post addresses — by
demonstrating it live — the "you're not a real CA" objection Live Verify also faces.

## What MTC is solving (and what it is not)

The post-quantum threat to web trust falls into two buckets, and MTC is about the second:

1. **Confidentiality** — "harvest now, decrypt later." An attacker stores encrypted traffic today and
   decrypts it once a quantum computer exists. Cloudflare reports ~50% of its edge traffic is already
   protected against this with post-quantum key exchange.
2. **Authentication** — a quantum computer cracks a server's TLS certificate signature and
   impersonates the server. The fix is post-quantum *signatures* (e.g. ML-DSA), but those signatures
   are ~20× larger than today's ECDSA, and a typical TLS handshake carries **5 signatures and 2 public
   keys**. Dropping in PQ signatures naively adds tens of kilobytes per handshake.

MTC's job is to shrink that to **1 signature, 1 public key, and 1 Merkle inclusion proof** by moving
the bulk of trust data out-of-band and replacing per-certificate signatures with inclusion proofs
against a batch the CA signed once.

**Crucially, all of this secures the TLS channel** — proving you are talking to the genuine server.
It says nothing about whether the *document the server hands you* is genuine. That second question is
Live Verify's entire job. (See "Two layers, not two competitors" below.)

## What MTC validates about Live Verify

Set the TLS-specific machinery aside and look at the primitives. The most credible players in web
trust — Cloudflare, Chrome, the IETF — are converging on exactly the two design choices Live Verify
already made:

### 1. Merkle inclusion proofs as the unit of trust

MTC replaces a per-certificate signature with a **Merkle tree inclusion proof**: each certificate is
a leaf, inner nodes are hashes of their children, the CA signs only the tree head, and a certificate
proves its membership with the sibling hashes along its path. Tamper one leaf and the head changes
and the signature fails.

This is the same shape as Live Verify's [Merkle endorsement design](benefits_of_merkle_tree.md). Live
Verify already uses Merkle structures for audit trails and endorsement, and the property MTC exploits
— *one signature covers a whole batch; any member proves inclusion cheaply* — is the property Live
Verify relies on too. MTC is industry confirmation that this is the right primitive for trust at
internet scale, not a niche choice.

### 2. Per-issuer transparency logs, not a central database

MTC "makes certificate transparency a first-class feature of the PKI by having **each CA run its own
log of exactly the certificates they issue**." Trust data is disseminated out-of-band and validated
offline; clients never reveal their browsing history to a central log.

That is Live Verify's architecture precisely: **each issuer publishes the hashes of exactly the
documents it stands behind, on its own domain.** There is no central registry; the verifier checks
the issuer directly; nobody — including this project — learns who verified what. The WebPKI is moving
*toward* the decentralized, issuer-hosted, transparency-by-construction model Live Verify started
from.

### 3. Quantum resilience comes from leaning on hashes, not signatures

The deepest validation is the one MTC makes by its very structure: **the expensive, urgent part of
the post-quantum migration is the signatures; hashes are cheap and safe.** MTC's whole trick is to
*minimize the signatures* and *lean on Merkle hashing* to carry the trust.

Live Verify's base mechanism is **a hash lookup, not a signature verification**. A verifier
recomputes a SHA-256 over normalized text and checks for an affirmative status — there is no
quantum-vulnerable signature in that core path. As Live Verify's
[quantum-computing threat assessment](quantum-computing-threat-assessment.md) already sets out, Shor's
algorithm breaks RSA/ECDSA signatures; Grover's only halves a hash's bits (SHA-256 → ~128-bit
post-quantum security), which is not a practical threat. MTC is a large, well-funded industry program
arriving at the same conclusion from the opposite direction: it is contorting the WebPKI precisely to
*reduce its dependence on signatures* — the dependence Live Verify's core never had.

The honest caveat: where Live Verify layers **signed authority chains** on top of the base hash
lookup (an issuer's chain to a regulator or sovereign root), those signatures inherit the same PQ
concern as any signature — and MTC-style inclusion proofs are exactly the technique to keep them
small and quantum-safe. So MTC is not only validation; it is a ready-made pattern for the one place
Live Verify does use signatures.

## Two layers, not two competitors

It is worth being precise, because the surface similarity invites confusion:

| | Merkle Tree Certificates | Live Verify |
|---|---|---|
| **Secures** | the *channel* — that you reached the genuine server | the *document* — that this artifact is genuine and current |
| **Question answered** | "Am I really talking to `bank.com`?" | "Is this letter/licence/receipt from `bank.com` real and still valid?" |
| **Where it runs** | inside the TLS handshake, automatically | when a person (or pipeline) checks a specific claim |
| **Trust anchor** | browser CA/root store | the issuer's own domain + a [sovereign-roots](sovereign-roots.md) anchor list |

A document delivered over a perfect MTC-secured TLS channel can still be a forgery — the channel was
authentic, the *content* was not. Live Verify sits a layer up. The two are complementary: MTC keeps
the pipe trustworthy and quantum-safe; Live Verify makes the thing that came through the pipe
verifiable. In fact Live Verify **benefits** from the WebPKI's PQ migration for free — it runs over
HTTPS, so it inherits whatever MTC delivers, without changing its own primitives.

## The "you're not a real CA" problem — demonstrated, and answered

The most strategically useful passage for Live Verify is how Cloudflare bootstraps trust:

> "Standing up a proper CA is no small task: it takes years to be trusted by major browsers. That's
> why Cloudflare isn't going to become a 'real' CA for this experiment... we plan to 'mock' the role
> of the MTCA... for each MTC we issue, we also publish an existing certificate from a trusted CA
> that agrees with it... Chrome is using certificate transparency to keep us honest."

Read that carefully: **even Cloudflare cannot simply declare itself trusted.** It bootstraps off an
existing trusted CA and lets transparency keep it honest. This is the same objection Live Verify
faces — *"who stands behind a random issuer's verification endpoint? you're not an accredited
authority"* — the FUD anticipated in the [Let's Encrypt precedent](lets-encrypt-precedent.md) and the
incumbent-facing `for-verifiers` page.

The post is a live demonstration that **trust-anchoring is the genuinely hard part of any trust
system** — which is double-edged, and worth saying both halves out loud:

- It **validates** Live Verify's [sovereign-roots](sovereign-roots.md) work. Live Verify does *not*
  claim a chain that terminates anywhere is trustworthy; it anchors to a curated, PSL-style roots
  list, exactly because "who vouches for the top?" is unavoidable. MTC needing a bootstrap CA proves
  that instinct correct.
- It **arms a critic**: *"Cloudflare needed a real CA to vouch for them — what vouches for a Live
  Verify endpoint?"* The answer already exists and should be stated proactively (quiet part first):
  Live Verify's anchor is **domain control** (the issuer demonstrably owns the domain the hash is
  served from — the same Domain Validation property the entire WebPKI rests on) **plus** the
  sovereign-roots anchor list for chains that claim to reach an authority. Where stronger assurance
  is needed, an issuer can do exactly what Cloudflare does here: bootstrap from an existing trusted
  attestation rather than assert trust from nothing.

## What to take from this

- **Cite MTC as validation, not threat.** The dominant player in internet trust infrastructure is
  rebuilding the WebPKI around Merkle inclusion proofs and per-issuer transparency logs — Live
  Verify's primitives. That is a credibility signal worth using with platform and standards-minded
  audiences.
- **Lead with hash-not-signature for the quantum story.** The migration scrambling the WebPKI is a
  *signature* migration. Live Verify's core is a hash lookup and largely sidesteps it; the one place
  it uses signatures (authority chains) can adopt MTC-style proofs.
- **Frame as complementary, never competing.** MTC secures the channel; Live Verify secures the
  document. Live Verify inherits the WebPKI's PQ protection for free over HTTPS.
- **Pre-empt the not-a-CA FUD.** Cloudflare itself can't self-anchor; say plainly that Live Verify's
  anchors are domain control plus the sovereign-roots list, and that bootstrapping from an existing
  trusted attestation is a legitimate, demonstrated pattern.

## Related

- [Benefits of the Merkle Endorsement Design](benefits_of_merkle_tree.md) — Live Verify's own use of
  Merkle structures for endorsement and audit.
- [Quantum Computing Threat Assessment](quantum-computing-threat-assessment.md) — why SHA-256 (hash,
  not signature) is the quantum-resilient core.
- [Sovereign Roots](sovereign-roots.md) — Live Verify's answer to "who anchors the trust?", which MTC
  independently shows is the hard part.
- [Let's Encrypt as Precedent](lets-encrypt-precedent.md) — the incumbent-FUD playbook this post
  illustrates from the inside.

## Source

Cloudflare blog, "Keeping the Internet fast and secure: introducing Merkle Tree Certificates"
(2025-10-28), Luke Valenta, Christopher Patton, Vânia Gonçalves, Bas Westerbaan.
Spot-check specifics against the original before quoting figures outward.

# Cryptographic Foundations

This technology doesn't invent new cryptography—it applies well-established computer science that predates blockchain by decades.

## Hash Functions (1970s-1990s)

Cryptographic hash functions convert arbitrary data into fixed-size fingerprints. The same input always produces the same output; any change produces a completely different output. SHA-256, used here, was published by NIST in 2001 and is a federal standard.

- [FIPS 180-4: Secure Hash Standard (SHA)](https://csrc.nist.gov/publications/detail/fips/180/4/final) (NIST, 2015)
- [RFC 6234: SHA-256 and SHA-512](https://datatracker.ietf.org/doc/html/rfc6234) (IETF, 2011)

## Merkle Trees (1979)

Ralph Merkle's 1979 invention allows efficient verification of data integrity by organizing hashes in a tree structure. Each leaf is a hash of data; each parent is a hash of its children. You can verify any piece of data by checking its path to the root—without downloading everything.

- [Merkle, R.C. "A Certified Digital Signature"](https://link.springer.com/chapter/10.1007/0-387-34805-0_21) (Crypto '89, but concept from 1979 thesis)
- [Wikipedia: Merkle tree](https://en.wikipedia.org/wiki/Merkle_tree)

## Blockchain Relationship

Blockchain (Bitcoin, 2008) uses Merkle trees and hash functions as building blocks. But these primitives are useful far beyond blockchain—and often simpler applied directly:

| Approach | What It Does | Complexity |
|----------|--------------|------------|
| **Live Verify** | Hash text → HTTP lookup → `{"status":"verified"}`/404 | Simple: static files or serverless |
| **Merkle tree** | Organize many hashes for efficient proof | Medium: tree construction, proof paths |
| **Blockchain** | Distributed consensus + Merkle trees + incentives | Complex: nodes, consensus, fees |

Live Verify uses the same cryptographic primitives (SHA-256) without requiring distributed consensus, cryptocurrency, or transaction fees. The trust anchor is the organization's domain (backed by DNS/TLS), not a blockchain.

## Endorsement (`authorizedBy`) — Merkle Commitment

While `parentAuthorities` provides passive links for humans to browse, `authorizedBy` is a **verifiable claim** — the endorser's attestation of the issuer can be independently checked via the same `verify:` protocol. The client hashes the issuer's **entire** `verification-meta.json` (canonicalized), not just the domain. This binds the endorsement to the exact content of the issuer's self-description — any change invalidates the hash and requires re-endorsement.

Date bounds (`authorizedFrom`/`authorizedTo`) define the endorsement period, pinned by the merkle hash. Chain walking: the endorser's own `verification-meta.json` can declare `authorizedBy`, forming chains (max 3 levels deep). Clients display the full chain with descriptions.

If the endorser returns `{"status":"verified"}` → "Endorsed by [endorser] (description)" (green)
If the endorser returns `404` → "Endorsement not confirmed" (amber — the issuer claims endorsement, but the endorser doesn't confirm it)
If the endorser is unreachable → "{issuerDomain} claims endorsement by {endorser} but that endorsement is missing" (grey)
If endorsement has expired → "Endorsement expired" (amber), with successor if declared

This matters because an issuer can *claim* to be endorsed, but the verifier independently checks. A fraudulent issuer claiming endorsement by a real authority (e.g., `verify:gov.uk/verifiers`) would be caught when the endorser's endpoint returns `404`.

The demo at `public/c/verification-meta.json` shows this: Unseen University claims endorsement by `gov.uk/verifiers` but the endorsement lookup fails because the institution is fictional.

## Merkle Trees for Database Anchoring

A SaaS verification provider (or any operator of a hash vault) can periodically anchor their database state to a public ledger (e.g., Hedera HCS, Ethereum) by computing a Merkle root over all stored hashes and committing that single root. This provides tamper-evidence independent of the operator — if hashes are silently added, removed, or altered, the root won't match.

This solves the same non-repudiation problem as [witnessing](./WITNESSING-THIRD-PARTIES.md) — preventing issuers from denying they published a hash — but through mathematics rather than third-party testimony. The two approaches are complementary; see the "Public Blockchain" section in that doc for how witnessing firms use Merkle rollups.

### Construction

Sort all stored SHA-256 hashes lexicographically. Pair them, hash each pair, repeat until one root remains:

```
Level 0 (leaves):  H₁   H₂   H₃   H₄   H₅   H₆   H₇   H₈
Level 1:           H(H₁‖H₂)  H(H₃‖H₄)  H(H₅‖H₆)  H(H₇‖H₈)
Level 2:           H(L1₁‖L1₂)            H(L1₃‖L1₄)
Level 3 (root):    H(L2₁‖L2₂)
```

A binary tree (branching factor 2) over N leaves has `log₂(N)` levels. For 100 million entries, that's ~27 levels.

### Inclusion Proofs

To prove a specific hash was in the database at anchor time without revealing other hashes, provide the **sibling at each level** along the path from leaf to root. The verifier recomputes upward and checks against the published root.

```
Proof for H₃:
  - Sibling at level 0: H₄
  - Sibling at level 1: H(H₁‖H₂)
  - Sibling at level 2: H(L1₃‖L1₄)
  → Recompute: H(H₃‖H₄) → H(result‖H(H₁‖H₂)) → H(result‖H(L1₃‖L1₄)) → compare to root
```

For 100M entries: 27 sibling hashes × 32 bytes = **864 bytes** per proof.

### Branching Factor Trade-offs

Higher branching factors reduce tree depth but increase proof size:

| Branching Factor | Tree Depth (100M entries) | Proof Size |
|------------------|--------------------------|------------|
| 2 (binary)       | ~27 levels               | 27 × 32B = 864B |
| 16 (hex nibbles) | ~7 levels                | 7 × 15 × 32B = 3,360B |
| 256 (byte)       | ~4 levels                | 4 × 255 × 32B = 32,640B |

Binary is the standard choice — compact proofs, simple implementation, well-understood. Ethereum's Patricia Merkle Trie uses a 16-ary structure for different reasons (key-value state lookups), but for anchoring a hash database, binary is sufficient.

### Practical Use

The anchoring workflow:

1. Operator sorts all hashes, computes binary Merkle root
2. Commits root to public ledger (one transaction, negligible cost)
3. Stores the full tree off-chain (for proof generation if challenged)
4. Repeats periodically (hourly, daily — depends on write volume)

If a dispute arises ("was this hash in the database on January 15th?"), the operator produces the inclusion proof against the root that was anchored on that date. The proof is independently verifiable by anyone with the root hash from the ledger.

## Why This Matters

This is infrastructure applying **40+ years of peer-reviewed cryptography**, not novel technology requiring new trust assumptions. Organizations already have trusted domains; hash verification is computationally trivial; the protocol is simple enough to implement in an afternoon.

The science is settled. The innovation is applying it to digital documents via text selection and to physical documents via OCR.

Read about one way hash functions on [Wikipedia](https://en.wikipedia.org/wiki/Cryptographic_hash_function).

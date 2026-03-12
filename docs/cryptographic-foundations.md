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

## Why This Matters

This is infrastructure applying **40+ years of peer-reviewed cryptography**, not novel technology requiring new trust assumptions. Organizations already have trusted domains; hash verification is computationally trivial; the protocol is simple enough to implement in an afternoon.

The science is settled. The innovation is applying it to digital documents via text selection and to physical documents via OCR.

Read about one way hash functions on [Wikipedia](https://en.wikipedia.org/wiki/Cryptographic_hash_function).

# Quantum Computing Threat Assessment for Live Verify

## Summary

SHA-256 hashing — the core of Live Verify — is not meaningfully threatened by quantum computers. The quantum threat is to public key cryptography (RSA, ECC), which affects HTTPS transport and digital signatures, not hash functions. Live Verify's hash-and-lookup model is quantum-resistant as designed.

## What quantum computers threaten

Quantum computers running **Shor's algorithm** can efficiently factor large numbers and compute discrete logarithms. This breaks:

| Cryptographic primitive | Used for | Broken by quantum? |
|:---|:---|:---|
| **RSA** | TLS key exchange, digital signatures, certificate chains | **Yes.** Shor's algorithm factors the modulus. |
| **ECC / ECDSA** | TLS key exchange, digital signatures | **Yes.** Shor's algorithm computes the discrete log. |
| **Diffie-Hellman** | TLS key exchange | **Yes.** Same discrete log attack. |

These are the primitives that protect HTTPS connections, code signing, certificate authorities, and digital signatures. Google's March 2026 announcement of a 2029 PQC migration timeline targets these specifically.

## What quantum computers do NOT meaningfully threaten

Quantum computers running **Grover's algorithm** provide a quadratic speedup for unstructured search problems. This affects hash functions — but not enough to matter:

| Hash function | Classical security | Post-quantum security (Grover) | Status |
|:---|:---|:---|:---|
| **SHA-256** | 256 bits | ~128 bits | **Safe.** 128-bit security is the same as AES-128, which NIST considers adequate. |
| **SHA-384** | 384 bits | ~192 bits | **Safe.** |
| **SHA-512** | 512 bits | ~256 bits | **Safe.** |
| **SHA-1** | 160 bits (already broken classically) | ~80 bits | **Broken regardless.** Not used by Live Verify. |

Grover's algorithm halves the effective security bits. For SHA-256, this means an attacker with a quantum computer would need ~2^128 operations to find a pre-image — roughly the same difficulty as breaking AES-128. No projected quantum hardware makes this feasible.

## Live Verify's specific exposure

### What Live Verify uses

- **SHA-256** for hashing normalised text → this is the core verification mechanism
- **HTTPS** for transporting verification requests → this uses RSA/ECC in TLS
- **DNS** for domain resolution → DNS security (DNSSEC) uses RSA/ECDSA signatures

### Risk assessment

| Component | Quantum risk | Action needed | When |
|:---|:---|:---|:---|
| **SHA-256 hashing** | Negligible. 128-bit post-quantum security. | None. | — |
| **HTTPS transport (TLS)** | High. RSA/ECC key exchange is vulnerable. | None from Live Verify. TLS libraries and browsers will migrate to PQC (ML-KEM). Live Verify gets this for free. | By 2029 (industry timeline). |
| **TLS certificate signatures** | High. RSA/ECDSA signatures on certificates are vulnerable. | None from Live Verify. Certificate authorities and browsers will migrate to PQC signatures (ML-DSA). | By 2029. |
| **DNSSEC signatures** | High. RSA/ECDSA signatures are vulnerable. | None from Live Verify. DNS infrastructure will migrate. | Timeline unclear; slower than TLS. |

### The bottom line for Live Verify

Live Verify does not need to migrate to post-quantum hashing. SHA-256 is safe. The quantum migration that matters — TLS and certificate signatures — happens at the infrastructure layer (browsers, servers, CAs) and Live Verify inherits the protection automatically because it runs over HTTPS.

## The real threat to Live Verify hashes is not quantum

The practical attack on a Live Verify hash is not quantum pre-image search. It is **classical brute-force of low-entropy plaintext**.

If the plaintext is short and predictable — say, a name, a date, and one of a small set of possible statuses — an attacker can try all plausible combinations, hash each one with SHA-256 on ordinary hardware, and check which hash matches the published endpoint. This does not require a quantum computer. A consumer GPU can compute billions of SHA-256 hashes per second.

**Defence: privacy salts.** A salt is an unpredictable value added to the plaintext before hashing. The salt appears in the verifiable text (so the legitimate verifier has it), but an attacker who doesn't have the plaintext can't guess the salt. A 64-bit salt adds 2^64 possible values to the search space — making brute-force infeasible regardless of computing technology, classical or quantum.

For Live Verify use cases:

| Scenario | Without salt | With salt |
|:---|:---|:---|
| **Short, predictable text** (name + date + status) | Vulnerable to classical brute-force | Safe |
| **Long, high-entropy text** (full document with amounts, references, timestamps) | Safe (too many combinations) | Safer still |

The salt is the defence that matters. Quantum computing is not the threat.

## Store-now-decrypt-later

The Google blog mentions "store-now-decrypt-later" — where an adversary captures encrypted traffic today and decrypts it later when quantum computers are available. This is relevant to Live Verify in one narrow sense:

An adversary who records the HTTPS traffic between a user's browser and a verification endpoint today could, in theory, decrypt it later with a quantum computer and learn:
- Which hashes were looked up (revealing which documents were verified)
- The verification responses (status, photo URLs, etc.)

This is a **metadata/surveillance** risk, not a content-integrity risk. The hash itself remains safe (SHA-256 isn't broken). But the fact that a specific hash was looked up from a specific IP at a specific time could be sensitive — especially for identity credentials or healthcare documents.

**Mitigation:** Once TLS migrates to PQC key exchange (ML-KEM), stored traffic becomes undecryptable even with a quantum computer. Google Chrome already supports PQC key exchange (hybrid X25519+ML-KEM). As server-side support rolls out, this risk closes.

Live Verify does not need to take any action here. The TLS layer handles it, and the industry migration is already underway.

## What would need to change if SHA-256 became unsafe

In the extremely unlikely event that a breakthrough made SHA-256 pre-image attacks feasible (this would require something beyond Grover's algorithm — a currently unknown quantum or mathematical advance), Live Verify would need to:

1. Migrate to a quantum-resistant hash function (SHA-384 or SHA-512 would likely suffice, since Grover's quadratic speedup still leaves them with 192-bit or 256-bit security)
2. Re-hash all existing verification endpoints with the new function
3. Update all clients (browser extension, iOS app, Android app) to use the new hash
4. Run both hash functions in parallel during a transition period

This is a significant but tractable migration. It is not currently on any roadmap because there is no credible threat to SHA-256 pre-image resistance from any known or projected quantum computing capability.

## References

- NIST Post-Quantum Cryptography Standards (FIPS 203, 204, 205) — ML-KEM, ML-DSA, SLH-DSA
- Google, "Quantum frontiers may be closer than they appear" (March 2026) — 2029 PQC migration timeline
- Grover, L. K. (1996), "A fast quantum mechanical algorithm for database search" — the quadratic speedup that affects hash functions
- NIST SP 800-131A Rev. 2 — guidance on cryptographic algorithm transitions

# Qualifying criteria for Live Verify use cases

Use this as a yes/no test for whether a document/claim is a good candidate for issuer-attested
Live Verify verification (Camera mode for physical documents, Clip mode for digital).

These criteria exist to pre-empt FUD and reflex dismissal by being explicit about what the tech is for, what it
is not for, and which design choices make it safe.

## 1) “Goldilocks” claim size and entropy

- **Not too big:** The claim must be short-to-medium human-readable text that can be captured by a camera,
  OCR’d, normalized, and hashed. Live Verify is not a “hash a whole PDF to prove I had it” system.
  Proof-of-existence/timestamping is valid, but it’s a different toolchain (public logs, blockchains, etc.).
- **Not too small / too predictable:** If the input space is tiny (or highly guessable), attackers can “guess
  and hash” to find matching public hashes. For low-entropy claims, include an issuer-generated **random line**
  printed on the document so the hashed text is unguessable.

## 2) Verification must be non-consuming (checks don't seize value)

- Most use cases allow **many unconnected parties** to check the same claim at different times. Verification
  should not "spoil" the claim or transfer value to the verifier just because they looked at it.
- **Exception: single-use claims.** Some claims are designed to be verified once, then invalidated (e.g., biometric
  likeness claims with single-use salts). The verification itself consumes the claim. This is valid when the
  design goal is unlinkability between verifications.
- If the underlying thing is instrument-like (gift cards, coupons, store credit), treat verification as "is this
  issuer-attested and current?". Actual **consumption** still happens in the issuer's system of record via
  statuses like `REDEEMED`, `USED`, `EXPIRED`, or `STOLEN` (plus instruction text).

## 3) Authority is domain-bound; trust is a verifier decision

- The issuer chooses a domain name (their web identity). The `verify:` line binds the claim to that issuer
  domain.
- The verifier decides whether that issuer domain is an authority for the kind of claim being checked. In many
  deployments that decision is encoded as organization policy/allowlists, with the UI still showing the full
  domain clearly so humans can spot lookalikes/typosquats.
- “Verified” means issuer attestation, not “universal truth”. Issuers can be wrong, out-of-date, or compromised;
  verification tells you what that issuer stands behind **now**.

## 4) Revocation is part of trust

- Strong use cases benefit from **revocability**: licenses get suspended, IDs get reported stolen, warranties
  expire, returns windows close, recalls evolve. Live Verify shines when outcomes can legitimately change over
  time.

## 5) Privacy model: minimal disclosure by default

- OCR/normalization/hashing happen on the verifier's device; the network call is a minimal `GET` for the hash
  lookup. This removes the "upload scans to a portal" default.
- **Verification endpoints never echo claim content.** The verifier already has the document—they just scanned it.
  The endpoint confirms authenticity (status: `OK`, `REVOKED`, `EXPIRED`, etc.), not content. Echoing content
  creates privacy leaks and serves no purpose.
- Avoid person-specific plaintext in verification responses; prefer short status codes with meanings described
  in `verification-meta.json`.
- Even with hash-only requests, issuers can log request metadata (time/IP). That's a deployment policy issue, not
  a hashing weakness.

## 6) Works with cheap infrastructure (including static hosting)

- At the lowest-cost end, hash lookups can be served from a static web server; no login is required to answer
  “does this hash exist?”.
- The commercial moat is typically integrations, governance, uptime, and tooling around publication/revocation,
  not the HTTP pattern itself.

## 7) OCR practicality and representation choices

- The claim must be reasonably OCR’able in the field. For ornate certificates, consider publishing an
  OCR-friendly representation (e.g., a short-form claim on a letter, wallet card, or transcript extract).
- Screens can introduce moiré; platform-grade OCR (native camera stacks) improves reliability over browser demos.

## 8) Verification mode: Camera vs. Clip

Two verification modes exist; strong use cases work well with at least one:

- **Live Verify - Clip:** Verifier selects text from a digital document (PDF, email,
  webpage) and verifies. Best for: documents that circulate digitally (contracts, certificates
  emailed or in data rooms), administrative/remote verification, audit trails. Works in browsers
  today; future integrations include email clients (Outlook, Thunderbird), PDF readers (Acrobat),
  and eventually auto-detection of `verify:` claims on page load.
- **Live Verify - Camera:** Verifier photographs a physical document or screen. Best for:
  in-person verification (doorstep, front desk, roadside), physical credentials (badges, cards,
  posted certificates), situations where the verifier doesn't have a computer.

Some use cases support both modes (membership cards: Camera at the conference desk, Clip
for HR verification). Others are mode-specific (courier badges are fundamentally doorstep/Camera;
art provenance is fundamentally digital/Clip).

When evaluating a use case, ask: **where does verification happen?** If it's always in-person
and fast-paced, prioritize Camera tooling. If it's remote/administrative, Clip may suffice.

## 9) Fraud incentive must exist

- Ask: **who benefits from faking this document, and how?** If there's no meaningful fraud incentive, verification
  is solving a problem that doesn't exist.
- Strong fraud incentives: financial gain (fake employment to get job), avoiding costs (fake insurance to drive
  uninsured), evading consequences (fake name change to hide criminal record).
- Weak/no fraud incentives: inconveniencing a restaurant (fake allergy), carrying unnecessary medication (fake
  prescription authorization). If the "fraud" has no real benefit, self-attestation is sufficient.
- If a document type has no fraud incentive, a simple bracelet/card/statement works fine. Don't add verification
  infrastructure for problems that don't exist.

## 10) Multi-party utility

- A strong use case benefits **all three parties**: the issuer (1st party), the document holder (2nd party), and
  external verifiers (3rd parties).
- **1st party (issuer):** Reduced fraud reports, fewer "is this real?" phone calls, audit trail, cross-border
  recognition without slow diplomatic channels.
- **2nd party (holder):** Portable proof, faster verification, removes social awkwardness of "just trust me",
  protection against their document being forged by others.
- **3rd parties (verifiers):** Instant authenticity check, no portal login required, no phone tag with issuer,
  works across organizational boundaries.
- Strong use cases typically have **multiple distinct 3rd party types**—not just "third parties" generically.
  Example: a driver endorsement is verified by police (roadside), rental agencies (booking), insurance adjusters
  (claims), and car owners (lending). Each has different context but uses the same verification endpoint.
- If a proposed claim only benefits one party, or has only one 3rd party type, question whether it's worth the
  implementation effort.

## 11) Claims are composable primitives

- A claim should answer **one question** well (e.g., "is this person employed here?", "is this the person in the
  photo?", "does this driver have coverage?").
- Complex verifications combine multiple claims from multiple issuers, rather than relying on monolithic
  credentials that bundle everything.
- This separation provides: minimal disclosure (show only what's needed), independent revocation (one claim's
  status doesn't affect others), multiple issuers (each authoritative for their domain), and cleaner failure
  modes (one system's outage doesn't block everything).

## 12) Ongoing verification value (not just point-in-time)

- Strong use cases have **verification value that persists over time**. The document holder (2nd party) may keep
  the document and later hand it—as text, photo, scan, or paper—to someone who wants to verify it well after the
  original transaction.
- Examples of ongoing value: a receipt verified years later by an estate executor; a cancelled booking
  confirmation verified by an insurance adjuster processing a claim; employment references verified by multiple
  prospective employers over months.
- **Terminal status doesn't mean no ongoing value.** A document with status `REFUNDED`, `CLOSED`, or `COMPLETED`
  can still be verified to prove the transaction happened as claimed. The status answers "what is the current
  standing?" not "is verification worthwhile?".
- Weak ongoing value: documents that are purely operational/ephemeral where no third party would ever want to
  verify after the immediate moment. If the only verifier is the immediate recipient and no one else would ever
  care, question whether verification infrastructure is justified.

## Quick yes/no checklist

- Is there a human-readable claim (paper/screenshot) that must remain readable first?
- Can the issuer stand behind it via a stable domain name?
- Can many unrelated verifiers check it without "consuming" it? (Or is single-use intentional for unlinkability?)
- Can outcomes legitimately change over time (revocation/expiry/recall/suspension)?
- Is the hashed text high-entropy, or can you add an issuer-generated random line?
- Can the claim be OCR'd reliably in the field (or via an OCR-friendly representation)?
- Does verification happen digitally (Clip) or in-person (Camera), or both?
- Can the issuer respond with generic statuses (not echoing claim content)?
- Can the verification endpoint be served cheaply/reliably (even static hosting)?
- Does the claim answer one question well, or is it trying to bundle too much?
- Is there a meaningful fraud incentive? (If not, self-attestation may suffice)
- Does it benefit all three parties (issuer, holder, verifiers)?
- Are there multiple distinct 3rd party types who would verify it?
- Would someone want to verify this document days, months, or years later? (Ongoing value)

## Common reflex objections (and the short answer)

- “Why not QR codes?” → QR is great when machine reading is primary; Live Verify is for documents that must stay
  human-readable first, without adding visual clutter or closed apps.
- “Isn’t this just a hash in public?” → Yes: a one-way fingerprint. Safe when the input has enough entropy or
  includes an issuer-generated random line.
- “Doesn’t this prove truth?” → No. It proves issuer attestation at a domain; the verifier still decides whether
  that domain is an authority for the claim.
- “Couldn’t someone just copy the text?” → Copying text only helps if the issuer still attests to that exact
  normalized hash; revocation and random-line hardening are the tools against replay/guessing.


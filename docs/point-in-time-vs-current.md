# Point-in-Time vs Current: Authentic Is Not the Same as True-Now

## Two questions a verifier is really asking

When someone presents a document, there are **two separate questions**, and Live Verify's core
mechanism answers only the first cleanly:

1. **Is this document authentic?** — did the issuer really produce it, unaltered? This is what the
   hash lookup proves.
2. **Does it still reflect current reality?** — has the world moved on since it was issued?

These are not the same, and conflating them is a real fraud surface. A genuine bank statement for an
account that has since been drained or closed is **fully authentic** and **no longer true**. The
fraud is not forgery — nothing was altered — it is presenting an **authentic past snapshot as if it
were the present truth.**

## Staleness is not revocation

This is the subtle part the rest of the protocol's mental model tends to miss. Live Verify's status
machinery is built around **issuer-side state changes** — the issuer affirmatively flips a status:

- `revoked` — the issuer withdrew the claim.
- `expired` — the document passed a stated expiry date.
- `superseded` / `amended` — a newer version exists.
- `lapsed` — (administrative) a renewal went unpaid.

In every one of those, **something changed on the issuer's side**, and the response reflects it.

**Staleness is the case where nothing changed at all.** The bank stood behind that statement on
March 31, and still does — *as a true statement of the balance on March 31*. It was never revoked,
never expired, never superseded. It will return `verified` forever, because as a snapshot of its
moment it is genuine. The deception lives entirely in the **verifier reading a past snapshot as
present truth**, and the account being long since emptied.

The `weaknesses_audit.md` already flags the adjacent issue — *"the protocol assumes issuers will
revoke stale claims… no mechanism to detect an issuer who simply doesn't bother."* Point-in-time
staleness is sharper still: there is **nothing for the issuer to revoke.** The snapshot is true; only
its *relevance* has aged.

## The imprecision this corrects

The universal status table defined `verified` as *"Document is authentic **and** current."* That
overclaims. A point-in-time snapshot **cannot** guarantee currency — the most it can prove is
**authentic as of its stated date.** A bank statement, a proof-of-funds letter, a six-month-old
credit report, a company-search PDF: each verifies as genuine, and each may describe a reality that no
longer holds.

The honest definition: **`verified` means the issuer attests this document is authentic. Whether it
is *current* is a separate question the verifier must ask** — by reading the as-at date, checking
whether the proof has expired, and where it matters, re-verifying live status rather than trusting a
snapshot. (The response-format `verified` definition now reflects this.)

## The three fraud archetypes

Naming this completes a clean triad a verifier can hold in mind. A presented document can be:

| Archetype | What's wrong | How Live Verify catches it |
|---|---|---|
| **Forged** | The issuer never produced it | `404` / not found — the hash isn't in the issuer's database |
| **Tampered** | Genuine document, altered (a changed balance, a deleted row) | Fails to verify — the alteration changes the hash ([page-at-a-time](page-at-a-time-hashing.md) extends this to per-page rows) |
| **Stale** | Genuine and unaltered, but no longer true | The *currency* check — as-at date, expiry, or a live re-verification — not the authenticity check |

The first two are caught by the hash. **The third is not caught by the hash at all** — it is caught
by the verifier asking the *second* question, and by the defences below. A system that only checks
authenticity would wave a stale document straight through.

## The three defences against staleness (all already in the protocol)

1. **The as-at date is part of the hashed text.** Because the snapshot's date is inside the verified
   content, it cannot be altered without breaking the hash — so a verifier can always see *as of when*
   the document is true, and judge whether that's recent enough. Several use cases already lean on this
   (`company-good-standing-status.md`, `mortgage-redemption-statements.md` use an explicit **As At**
   field).
2. **Time-limited salt / proof expiry.** For proofs whose whole value is *current-ness* (proof of
   funds, a balance confirmation), the issuer can issue a short-lived salted proof that simply stops
   resolving after its window — so an old snapshot can't be re-presented as current
   (`Technical_Concepts.md`, `legislative-patterns-for-mandated-verification.md`). This is what defeats
   the **"Snapshot Fraud"** in `proof-of-funds-letters-transactions.md` (borrow money for 24 hours,
   print a proof, return it).
3. **Live status re-verification.** Where the underlying fact moves (an account balance, a policy's
   in-force status), the verifier checks *current* status against the issuer rather than trusting the
   document's snapshot — the difference `proof-of-insurance-status.md` draws between a real-time
   status check and a "certificate date only" point-in-time proof.

The design rule that falls out: **the more a claim's value depends on being current, the shorter-lived
its proof should be — and the more a verifier should re-check live status rather than trust a
snapshot.** A degree (a permanent past fact) is fine as a long-lived snapshot; a bank balance (a
moving fact presented to prove present wealth) is not.

## Use cases that already handle this well

This concept is the cross-cutting name for a pattern several use cases already treat crisply; consult
these for worked examples:

- [Proof of Insurance Status](../public/use-cases/proof-of-insurance-status.md) — best-in-class:
  *"a genuine certificate… for a policy that has since lapsed. The document is real; the cover is
  not."*
- [Proof of Funds](../public/use-cases/proof-of-funds-letters-transactions.md) — names **Snapshot
  Fraud** and uses proof expiry to defeat it.
- [Company Good Standing](../public/use-cases/company-good-standing-status.md) — a clean
  company-search-from-three-months-ago-with-a-since-filed-winding-up-petition example.
- [Credit Reports & Scores](../public/use-cases/credit-reports-scores.md) — stale report presented as
  current; the `UPDATED` status flags a newer one exists.
- [Mortgage Redemption Statements](../public/use-cases/mortgage-redemption-statements.md) — the
  "Stale Figure" problem with an explicit As-At date.
- [Student Finance Good-Standing](../public/use-cases/student-finance-good-standing.md) — *"a
  point-in-time snapshot of a moving obligation,"* and the inference a verifier draws travelling
  further than the fact.
- [Bank Statements](../public/use-cases/bank-statements.md) — the KYC case; an `Inactive` status means
  *authentic statement, account since closed.*

## Related

- [Verification Response Format](Verification-Response-Format.md) — status semantics; the `verified`
  definition this doc corrects, and the administrative-vs-punitive revocation distinction.
- [Page-at-a-Time Hashing](page-at-a-time-hashing.md) — catches *tampered*; this doc is about *stale*,
  the archetype the hash cannot catch.
- [Technical Concepts](Technical_Concepts.md) — time-limited salt, the mechanism behind proof expiry.
- [Weaknesses Audit](weaknesses_audit.md) — the adjacent "issuers may not bother revoking" gap.

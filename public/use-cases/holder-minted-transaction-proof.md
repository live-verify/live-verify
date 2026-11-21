---
title: "Holder-Minted Proof of Purchase, Spend or Transfer"
category: "Banking & Payments"
volume: "Very Large"
retention: "Holder-set (expires after N verifications or NN days) + issuer audit record"
slug: "holder-minted-transaction-proof"
verificationMode: "clip"
tags: ["proof-of-payment", "bank-statement", "self-service", "on-demand", "holder-minted", "expiry", "cifas", "point-in-time", "chain-of-custody"]
furtherDerivations: 2
---

## What is a Holder-Minted Transaction Proof?

Someone says *"I need proof of that"* — a payment you made months ago, a transfer, a specific card
charge. Today you screenshot a statement (trivially forgeable) or ask the bank for a letter (slow,
staffed, expensive). This use case is the fast path: **you log into your own bank, card, or wallet
statements, select the one line that matters, right-click, and choose "Make Live Verify proof."** You
get back a short, self-contained plain-text claim you can email or print, which a third party can
verify against your bank's domain.

The proof is narrow by design — one transaction, not your whole statement. And it is
**holder-triggered but issuer-published**: you choose the line and request it, but the *bank's* system
produces the canonical text and publishes the matching hash on the *bank's own domain*. That split is
what makes it trustworthy — see [Trust model](#trust-model-holder-triggered-issuer-published) below.

The inline styling is ignored by clip mode — only the text content is hashed.

<div style="max-width: 660px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.82em; white-space: pre-wrap; word-break: break-word; color: #000; line-height: 1.7;"><span verifiable-text="start" data-for="proof"></span>Payment: &nbsp;&nbsp;&nbsp;&nbsp;£1,200.00 to ACME Ltd on 3 Mar 2026 from a/c ****4421
CIFAS-Status: &nbsp;No marker recorded against this account in Barclays' records as of 3 Mar 2026
Produced: &nbsp;&nbsp;&nbsp;2026-08-09 14:07 UTC at account-holder's request
Expires: &nbsp;&nbsp;&nbsp;&nbsp;after 5 verifications or on 2026-09-08, whichever is first
Holder-Note (Bank notes this text is holder-entered): re: your invoice #58

<span data-verify-line="proof">verify:proofs.barclays.co.uk/c</span><span verifiable-text="end" data-for="proof"></span></pre>
</div>

**The whole block is one verified claim.** Every line above the `verify:` line is inside the hash and
answered by the bank's domain — including the holder's note. What differs line-to-line is *what the
bank is vouching for*, made explicit by the label on each line (see
[Key:value structure](#keyvalue-structure-and-per-line-trust)).

## Trust model: holder-triggered, issuer-published

The holder does not self-host or self-certify this proof. A self-asserted bank balance backed by
nobody would be worthless. Instead:

1. The holder, logged into online banking, selects a transaction and requests a proof.
2. The bank's system generates the canonical claim text from its own system of record, computes
   the hash, and publishes it at `verify:proofs.<bank>/c`.
3. The holder receives the plain text to forward or print.

So "right-click → make proof" is a feature the bank builds into online banking, closely related to
[Retrospective Verification](../retrospective-verification-saas.md) — the difference is that this is
**holder-initiated, on-demand, and single-line**, rather than a bulk issuer backfill. The trust root
is the bank, exactly as with an ordinary [bank statement](view.html?doc=bank-statements); the holder
merely triggers the mint.

## The three dates on the proof (don't conflate them)

A minted proof carries up to three distinct dates, each answering a different question. Keeping them
separate is a fraud-and-confusion safeguard:

| Date | Answers | Example |
|---|---|---|
| **Event date** | Did it happen, and when? | Payment on 3 Mar 2026 |
| **As-of date** | When was an issuer status-line true? | No CIFAS marker as of 3 Mar 2026 |
| **Produced date** | How fresh is this document I'm holding? | Produced at holder's request 9 Aug 2026 |

The produced date is the one that gives the artifact its chain of custody. Because it is *inside*
the hash and *set by the bank*, the holder cannot back-date a proof — a different produced date is a
different hash, and the endpoint has no record of it. A verifier handed the proof months later sees
exactly how old it is, rather than trusting the sender's framing.

Phrasing matters: the bank vouches that a proof was produced on that date at the holder's request.
It does not vouch for *why* — "someone told me I needed it" is holder context, and belongs in the
optional holder note below, not in the issuer-verified text.

## Expiry: the holder sets a validity window

The distinctive control here is holder-set expiry. At mint time the holder chooses one or both:

- **After N verifications** — the endpoint answers `verified` up to N times, then returns `404`.
- **After NN days** — the endpoint returns `404` once the window closes.

After expiry the proof is a dead artifact: it returns `404` and proves nothing. This is the same
holder-controls-one-bit-of-server-state idea as
[holder-controlled availability](../docs/holder-controlled-availability.md), applied to a freshly
minted proof. It lets a holder hand someone a proof that is deliberately *good for this one purpose,
this once* — a landlord who needs to see a deposit payment once does not need a link that works
forever.

The same honest limit applies: **expiry controls only future lookups.** A verifier who already saw the
plaintext, or screenshotted it, keeps it — expiry cannot claw that back, and it is no worse than
handing over any document. Expiry stops the proof being *re-confirmable by strangers later*; it does
not un-see what was seen.

## Key:value structure, and per-line trust

Because a minted proof is far more likely to be machine-read — ingested by a finance system, parsed
by an automated verifier — than a decorative prose credential, the claim is laid out as **labelled
`Key: value` lines**. This makes it reliably parseable *and* makes the trust status of each line
explicit from its label.

The subtlety is that **not every line means the bank vouches for the same thing.** The label carries
that distinction:

| Line | What the bank vouches | Trust |
|---|---|---|
| `Payment:` | The transaction happened as stated | Bank-attested fact |
| `CIFAS-Status:` | The bank's records showed this, as of the date | Bank-attested, point-in-time |
| `Produced:` | The proof was minted at this time, at the holder's request | Bank-attested fact |
| `Expires:` | The endpoint will honour these limits | Bank-attested, enforced |
| `Holder-Note (Bank notes this text is holder-entered):` | **Only that the holder wrote this** — *not* that it is true | Bank-attested *provenance*, not content |

## Holder note: inside the hash, caveated inline

The holder may attach a short comment — *"re: your invoice #58"*, *"my half of the dinner on the
3rd"*. It is genuinely useful, and it goes inside the hashed, bank-answered text — so it is
tamper-evident and cannot be swapped in transit.

The safeguard is not to fence it *out* of the verified block, but to **caveat it inline with
bank-authored framing**:

```
Holder-Note (Bank notes this text is holder-entered): re: your invoice #58
```

What the bank hashes and vouches for here is the framing — *"this text is holder-entered"* — not
the note's content. So the bank truthfully attests *"the account-holder wrote this note,"* and never
*"this note is true."* This is the same discipline as a signed email: the signature proves the sender,
not the truth of the message. Because the caveat is itself part of the hashed text, a holder cannot
strip it to make the note look bank-endorsed — removing or altering it changes the hash and the proof
fails.

This is deliberately different from a decorative credential, where holder context might sit outside the
`verifiable-text` span. Here, machine-readability and tamper-evidence are worth more than span
separation, and the inline `Key (caveat): value` form carries the trust boundary *in the text itself*.

## Optional issuer status-line (bank-attested, `as of` a date)

Unlike the holder note, the bank *can* attach its own status assertions to the verified text, because
the bank is the party that knows them. The canonical UK example is a CIFAS-negative line:

```
No CIFAS marker recorded against this account in Barclays' records as of 3 Mar 2026
```

This is bank-vouched and lives inside the hash. Three guardrails apply, and they are load-bearing:

- **Mandatory `as of DATE`, and scoped precisely.** A negative assertion ("no marker") ages badly — a
  marker could be added the next day. It must read "no marker recorded against this account in
  **this bank's** records as of DATE", never the inflated "this person has no fraud history." This
  is the [point-in-time-vs-current](../docs/point-in-time-vs-current.md) problem in its sharpest form,
  and it argues for pairing a status-line with a short expiry.
- **Absence-of-record is weaker than presence.** "No CIFAS marker" means *this bank found none in the
  database it checked* — not that none exists anywhere, is pending, or is held by another member.
- **Only what the issuer is entitled *and legally permitted* to assert.** A bank must have the right to
  surface third-party fraud-database data (subject to the subject's own data-protection interests — see
  [dataHandling](../docs/verification-meta-schemas.md)). Some signals are deliberately
  **un-transportable**: a US SAR (suspicious activity report) is legally confidential, and surfacing
  it could be an illegal *tipping-off* — so "no SAR" must not be offered as a proof line. The
  pattern is "issuer meta is transportable when the issuer may lawfully assert it; some AML signals
  never are."

Generalises to: "account in good standing as of DATE", "account opened before DATE" (account-age proof
for lending), and similar bank-owned status facts.

## The Problem

- **Screenshot forgery** — an edited statement screenshot is trivial; a bank-domain-answered hash is not.
- **Staff-issued-letter friction** — slow, costly, human-in-the-loop for what should be self-service.
- **Over-disclosure** — sending a whole statement to prove one payment leaks every other line.
- **Stale proof presented as current** — the produced-on date and expiry make age and validity explicit.

## What Is Checked

- **Transaction line** — amount, counterparty, date, masked account — the core fact, bank-attested.
- **Produced-on timestamp** — when the proof was minted at the holder's request (inside the hash).
- **Expiry terms** — N verifications and/or NN days (inside the hash; enforced by the endpoint).
- **Optional issuer status-line** — e.g. CIFAS-negative `as of` a date (inside the hash, bank-attested).
- **Optional holder note** — free text, inside the hash, inline-caveated as holder-entered (the bank
  vouches the holder wrote it, not that it is true).

## What the Checker Sees

Shows the issuer domain (`proofs.barclays.co.uk`) and the status.

**Status Indications:**
- **Verified** — the proof is genuine, unaltered, and within its validity window
- **Expired** — the holder's validity window (N verifications or NN days) has closed; `404`
- **Withdrawn** — the holder revoked the proof before expiry
- **404** — never issued, altered text, or expired (indistinguishable by design at maximal privacy)

## Who Holds It

The account-holder is the second party and the whole point:

- **Produce proof on demand, long after the event**, without waiting on bank staff or paying for a
  letter.
- **Hand over exactly one fact**, not a whole statement full of unrelated transactions — a privacy win
  over screenshotting a statement.
- **Bound the exposure** with expiry, so the proof is good for the one purpose it was minted for.
- **Add context** via the inline-caveated holder note without implicating the bank in its truth.

## Who Checks It

**Whoever asked for the proof** (landlord, counterparty, small-claims court, an employer's finance
team) verifies against the bank's domain and sees:

- the transaction is real and unaltered (bank-attested),
- how fresh the proof is (produced-on date),
- whether it is still live (within its expiry window),
- any bank status-line (`as of` its date), and
- the holder's note — inline-caveated so it reads as holder-entered, not bank-endorsed.

**Critically, verification is not approval.** As with all Live Verify proofs, confirming the receipt
is authentic says nothing about whether the *use* of it is legitimate (whether an expense was
warranted, whether the note's framing is fair). The green tick means "this transaction really happened
and the bank stands behind these lines" — not "this claim about the transaction should be accepted."

## How Verification Works Here

**What it explicitly does not address**

- **Legitimacy of the underlying purpose** — authenticity of the transaction ≠ propriety of the claim
  it is used to support. Verification must not be read as approval.
- **The truth of the holder's note** — the bank vouches only that the holder wrote it (inline caveat),
  never that it is correct.
- **Currency of a negative status-line beyond its `as of` date** — a "no CIFAS marker" line is a
  point-in-time fact, not a standing guarantee.

**Who issues these**

- **Banks, card issuers, and wallet/payment providers** — endpoint on the provider's domain. Building
  the "make proof" control into online banking is the issuer-side work required.

## Related Use Cases

- [Bank Statements](view.html?doc=bank-statements) — the whole-statement verification this narrows to a
  single holder-selected line.
- [Proof of Funds (POF) Letters](view.html?doc=proof-of-funds-letters-transactions) — the staffed,
  bank-issued equivalent this self-service flow largely replaces.
- [Specific Transaction Power of Attorney](view.html?doc=specific-transaction-poa) — a composable
  single-transaction *authorisation*; this is the single-transaction *proof it happened*.
- [Proof of Address](view.html?doc=proof-of-address) — another narrow, holder-presented proof drawn
  from a fuller record.

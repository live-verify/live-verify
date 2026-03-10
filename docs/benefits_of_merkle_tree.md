# Benefits of the Merkle Endorsement Design

## No Two-Phase Commit Problem

A natural concern with endorsement chains:

```
Claims to be from: smithandpartners.co.uk
    Endorsed by: arb.org.uk (Architects Registration Board)
      Endorsed by: gov.uk (UK Government)
```

What happens if ARB's standing with gov.uk changes? Do we need a two-phase commit — some coordinated transaction that updates both the ARB→Smith endorsement and the gov.uk→ARB endorsement atomically?

No. And this is where the merkle design shines.

### Each Link Is Evaluated Independently at Verification Time

The chain is not a pre-computed fact stored somewhere. It's **evaluated live** when the user scans the document. Each link is checked independently:

1. Client hashes `smithandpartners.co.uk`'s `verification-meta.json` → checks against `arb.org.uk` → `{"status":"verified"}` or 404
2. Client hashes `arb.org.uk`'s `verification-meta.json` → checks against `gov.uk` → `{"status":"verified"}` or 404

Each check is a simple, independent HTTP request. No coordination between the parties is needed.

### What Happens When an Endorser's Standing Changes

**Gov.uk drops ARB's endorsement** (deletes the hash → 404):

```
Endorsed by arb.org.uk (Architects Registration Board)
  Endorsement by gov.uk — not confirmed
```

Smith & Partners' endorsement by ARB is still confirmed. ARB's endorsement by gov.uk is not. The user sees both facts and makes their own judgment. There's no inconsistency to resolve because **each link only claims what it claims**:

- ARB endorsed Smith & Partners — that's a fact, the hash proves it
- Gov.uk endorsed ARB — that *was* a fact, but now it returns 404

No transaction spans both links. No two-phase commit. No distributed coordination problem.

### Why This Works

Traditional certificate chains (like TLS/PKI) have revocation propagation problems — a revoked intermediate CA doesn't immediately invalidate all leaf certificates, leading to complex mechanisms like CRL distribution points, OCSP stapling, and grace periods.

The merkle endorsement chain avoids this entirely because:

1. **No cached state.** Each verification is a live check. There's nothing to invalidate, propagate, or synchronize.
2. **No transitive authority.** Gov.uk endorsing ARB doesn't mean gov.uk endorses Smith & Partners. Each link is a separate assertion. The client displays the full chain and the user interprets it.
3. **Partial chain is meaningful.** A chain where the first link succeeds and the second fails is not an error — it's information. "Your endorser is endorsed" and "your endorser is not endorsed" are both useful facts.

### Edge Cases

**Endorser's domain goes dark entirely.** If ARB's domain becomes unreachable, the client can't fetch ARB's `verification-meta.json` to walk the chain. Smith & Partners' endorsement check shows "smithandpartners.co.uk claims endorsement by arb.org.uk but that endorsement is missing." This is correct — if your endorser ceases to exist, your endorsement is meaningfully degraded.

**Endorser is sunsetting (planned transition).** ARB declares a `successor` field in its `verification-meta.json` pointing to `architects-board.org.uk`. Clients display: "Endorsement by arb.org.uk — expired. Successor: architects-board.org.uk". The successor is a courtesy to the user, not a transaction. Smith & Partners would need to get re-endorsed by the new body.

**Endorser changes its own `verification-meta.json`.** If ARB updates its description, adds fields, or changes anything in its file, the hash changes. Gov.uk's endorsement of the *old* hash returns 404. ARB needs to get re-endorsed by gov.uk for its new file. This is a feature — the merkle hash pins the endorsement to the *exact content* of the endorser's self-description. ARB can't silently change what it claims to be.

## Content Pinning

The merkle hash doesn't just bind the endorsement to the endorser's identity — it binds it to the endorser's **entire self-description**. This has several benefits:

### Prevents Silent Scope Creep

If ARB's `verification-meta.json` says `"claimType": "architect-registration"` and ARB later changes it to `"claimType": "architect-and-engineer-registration"`, the hash breaks. Gov.uk would need to re-endorse the new file. ARB can't expand its claimed scope without its endorser's knowledge.

### Pins Date Bounds

The `authorizedFrom` and `authorizedTo` fields live in the issuer's `verification-meta.json`, not the endorser's response. Because the endorser's hash covers the entire file, these dates are pinned — the issuer can't extend its own endorsement period without breaking the hash and requiring re-endorsement.

### Immutable Self-Description

The issuer's `description`, `claimType`, `responseTypes`, and all other metadata are covered by the hash. The endorser attested to *this specific self-description*. Any change — even a typo fix — requires re-endorsement. This is strict by design: endorsement should be a deliberate, auditable act.

## Attack Vectors for Hash Insertion

An attacker who wants to fake an endorsement needs to insert a hash into the endorser's verification endpoint. Here's what they'd have to do and why it's hard.

### Attack 1: Compromise the Endorser's Hosting

**Goal:** Insert a file containing `{"status":"verified"}` at `https://arb.org.uk/{hash-of-fake-meta}` so that a rogue issuer appears endorsed.

**What it takes:** Write access to ARB's web hosting — SSH credentials, CMS admin, CI/CD pipeline, cloud storage bucket, or DNS control. This is a standard infrastructure attack, identical to defacing any website.

**Why the merkle design helps:** Even if the attacker succeeds, they can only endorse a *specific* `verification-meta.json` — the one whose hash they inserted. They can't create a generic "endorse anything" backdoor. And because the endorser's own `verification-meta.json` is also merkle-hashed by *its* endorser (gov.uk), the attacker can't modify the endorser's self-description to cover their tracks without breaking the chain above.

**Detection:** If the endorser uses jurisdictional witnessing, the witness receives all hash changes. A hash appearing that the endorser didn't submit is visible in the witness log.

### Attack 2: Compromise the Endorser's Build/Deployment Pipeline

**Goal:** Inject a hash into the endorser's hash directory during a routine deployment.

**What it takes:** Access to the endorser's CI/CD system (GitHub Actions, Jenkins, etc.) or to the script that generates hash files. A supply chain attack.

**Why this is the most realistic threat:** Many endorsers will use automated pipelines to manage their hash directories. A compromised dependency, a malicious pull request, or a stolen deploy key could inject hashes without anyone noticing.

**Mitigation:**
- Endorsers should treat their hash directory like a certificate authority treats its signing key — restricted access, audit logging, separation of duties.
- Jurisdictional witnessing provides an independent record of every hash published. A hash that appears in the endorser's directory but not in the witness log is suspicious.
- Git-based static hosting (GitHub Pages) provides an audit trail of every commit. A hash added by an unauthorized committer is visible in the git log.

### Attack 3: DNS Hijacking / BGP Hijacking

**Goal:** Redirect requests for `arb.org.uk` to an attacker-controlled server that returns `{"status":"verified"}` for any hash.

**What it takes:** DNS cache poisoning, registrar account compromise, or BGP route hijacking.

**Why this is hard to sustain:** DNS/BGP attacks are noisy and temporary. Certificate Transparency logs will show a rogue TLS certificate issued for the domain. The attack works for minutes to hours, not months. And the attacker must intercept *verification* requests specifically — anyone browsing `arb.org.uk` normally will notice the hijack.

**Mitigation:** DNSSEC, CAA records, Certificate Transparency monitoring. These are standard web infrastructure defenses, not specific to Live Verify.

### Attack 4: Social Engineering the Endorser

**Goal:** Convince a legitimate endorser to endorse a rogue issuer's `verification-meta.json`.

**What it takes:** Present a credible-looking `verification-meta.json` to the endorser and persuade them to hash it and publish the hash. "We're a new architecture firm, here's our registration, please endorse us."

**Why the merkle design helps:** The endorser hashes the *entire* `verification-meta.json`. If the endorser reads it before hashing, they'll see the issuer's `description`, `claimType`, `authorizedFrom`, `authorizedTo`, and everything else. The endorsement is an explicit, auditable act — not a rubber stamp.

**Why this is still a risk:** If the endorser's endorsement process is sloppy — hash the file without reading it, automate endorsements without review — social engineering succeeds. This is an operational risk, not a protocol risk.

### Attack 5: Rogue Issuer Claims False `authorizedBy`

**Goal:** A rogue issuer sets `"authorizedBy": "arb.org.uk"` in their `verification-meta.json` without actually being endorsed.

**What happens:** The client hashes the rogue issuer's `verification-meta.json` and checks `https://arb.org.uk/{hash}`. ARB never endorsed this file, so the hash isn't there. The endorser returns 404. The client displays "Endorsement by arb.org.uk — not confirmed."

**This attack fails by design.** Claiming `authorizedBy` is free — anyone can write it in their JSON. But *confirming* it requires the endorser to have the hash. The rogue issuer's claim is immediately exposed as unconfirmed.

### Attack Summary

| Attack | Difficulty | Detectable | Merkle-Specific Defense |
| :--- | :--- | :--- | :--- |
| Compromise endorser hosting | High (standard infra attack) | Yes (witnessing, git logs) | Hash is content-specific, not a generic backdoor |
| Compromise build pipeline | Medium (supply chain) | Yes (witnessing, git logs) | Same as above |
| DNS/BGP hijack | High, temporary | Yes (CT logs, DNSSEC) | Standard web defenses apply |
| Social engineering endorser | Medium (operational) | Depends on endorser's process | Full file is visible before hashing |
| False `authorizedBy` claim | Trivial to attempt | **Instant** (returns 404) | Fails by design — claim without hash is meaningless |

The bottom line: the most dangerous attack is #2 (build pipeline compromise), because it's the most likely to go unnoticed. Jurisdictional witnessing is the primary defense — it creates an independent record that the endorser can audit against.

## Simplicity

### Endorser Response Is Trivial

The endorser returns `{"status":"verified"}` or `404`. No metadata, no timestamps. All the richness lives in the issuer's own `verification-meta.json`, pinned by the hash. This means:

- Endorsers can use static file hosting (a directory of hash files containing `{"status":"verified"}`)
- No API, no database, no custom software
- Adding or removing an endorsement is creating or deleting a file

### Canonicalization Is Simple

`JSON.stringify(JSON.parse(raw))` — parse the JSON then re-stringify it. This eliminates whitespace and formatting differences while preserving key order (JavaScript preserves insertion order for string keys). No need for RFC 8785 (JSON Canonicalization Scheme) or other complex standards. The issuer controls their own JSON, so key order is stable.

### Chain Depth Is Bounded

Max 3 levels (issuer → endorser → endorser's endorser → root). This prevents infinite loops, excessive network requests, and overly complex trust hierarchies. In practice, most chains will be 1-2 levels deep.

## Scope Boundaries: What Live Verify Doesn't Solve

### Sovereign Issuers Acting in Bad Faith

Live Verify confirms that an issuer attests to a document. It does not confirm that the issuer is honest.

The hardest case isn't a rogue state like North Korea — their documents are already distrusted and their citizens monitored. The hard case is a state the west mostly trusts issuing genuine documents for people who aren't who they claim to be.

**The scenario:** A nation-state — or a corrupted official within one — issues a real passport, a real credential, or a real employment record for an operative under a false identity. The `verify:` line checks out. The hash is real. The issuing domain genuinely attests to the document. The person described in the document doesn't exist — or exists but isn't who the document says they are.

This is the Peter Franks problem — from *Diamonds Are Forever*, where Bond assumes the identity of a diamond smuggler using documents that check out because the issuing authorities (or someone within them) made them real. Intelligence services have placed operatives using genuine credentials from cooperating institutions for as long as credentials have existed. The documents are authentic; the identity is the lie.

**At the point of use, Live Verify can't help.** The document verifies green. The endorsement chain is intact. The issuing state's domain confirms the hash.

**After the fact, witnessing helps narrowly.** If the issuing state's registry uses jurisdictional witnessing, there is an independent, timestamped record that this specific document was issued. When the operation is later uncovered:

- The issuing state cannot deny it issued the document — the witness log proves it
- The timing of issuance is pinned — useful for reconstructing the operation's timeline
- If the document is later revoked (status changed to REVOKED), the witness records both the original issuance and the revocation, preventing the issuing state from pretending the document never existed

But this is accountability after the fact, not prevention. No document verification system — Live Verify or otherwise — can distinguish a genuine document issued in bad faith from a genuine document issued in good faith. The document *is* genuine. The issuer *did* issue it. The lie is upstream of the document.

### What Live Verify Does Surface

Even in the bad-faith issuer scenario, the endorsement chain provides information the verifier didn't previously have:

- **Which domain issued this?** A border agent sees `verify:immigration.gov.my` — they know exactly which authority is attesting to this passport.
- **Is that authority endorsed?** If Malaysia's immigration authority is endorsed by an ICAO member body or an international treaty organization, the chain shows it. If it isn't, the absence is visible.
- **Is the endorsement current?** Date bounds (`authorizedFrom`/`authorizedTo`) show whether the endorsement was active when the document was issued.

None of this catches the Peter Franks scenario in real time. But it shifts the question from "is this document real?" (which Live Verify answers: yes) to "do I trust the issuer?" (which the verifier must answer for themselves). Making the issuer's identity and endorsement status explicit is an improvement over the current world, where a convincing forgery and a corrupt issuance look identical.

### Attribution After the Fact: Proving State Involvement

Where Live Verify + a shared ledger (e.g., Hedera) changes the game is not in *catching* the operative — immigration systems have been catching "two names, one set of fingerprints" for decades via their own biometric databases. What changes is the **attribution**.

Without Live Verify: USCIS catches a fingerprint mismatch — the same prints appeared on a French passport last year and a UK passport today. But they can't prove whether it's a lone forger who made a convincing fake, a corrupt consular official acting alone, or a state-directed intelligence operation. The French passport might be a forgery — in which case France isn't implicated at all.

With Live Verify + shared ledger: both passport hashes are on the ledger. Hash `abc123` was verified by `france.gouv.fr` — France's own domain attested to that passport. Hash `def456` was verified by `gov.uk` — the UK's own domain attested to the other. Both are witnessed and timestamped by independent third parties.

The diplomatic conversation shifts from "someone forged a French passport" to "your domain confirmed this passport was genuine, a witness recorded the confirmation, and the same fingerprints are on a UK passport that `gov.uk` also confirmed — explain."

The fingerprint correlation is each country's own sovereign capability — their own database, their own biometrics, nothing shared. Live Verify's contribution is proving that the *documents* were genuinely issued by the states whose domains attested to them. The state can no longer say "that was a forgery, nothing to do with us" when their own verification endpoint returned `{"status":"verified"}` and an independent witness recorded it on a public ledger.

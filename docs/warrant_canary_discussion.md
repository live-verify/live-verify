# Warrant Canaries, Duress Signals, and Absence-Based Verification

## Why this isn't a use case (yet)

Anti-coercion canaries — warrant canaries, duress codes, dead man's switches, safe-phrase check-ins — are intellectually compelling. They've been discussed in cryptography and civil liberties circles since at least the 1990s, and the concept of a "canary in the coal mine" signal predates digital systems entirely. But after decades of thinking, the practical track record is thin and the legal footing is uncertain. This document explains why we've moved canaries out of the active use-case catalogue and into discussion.

## The original excitement

The warrant canary idea landed in the late 1990s and early 2000s cypherpunk scene like a magic trick. The pitch was irresistible: you put up a page on your website saying "We have not received a search warrant for user data" and update it regularly. If the FBI comes knocking with a National Security Letter and a gag order, you can't *tell* anyone — but you can just... stop updating the page. You haven't disclosed anything. You've just gone quiet. Checkmate, government.

It felt like a hack against the legal system itself. Here was this elegant loophole where the First Amendment's protection against compelled speech met the crypto community's love of clever protocols. Hosting providers, Usenet operators, and later VPN companies would post their canaries with a certain pride — it signalled that you were serious about privacy, that you'd thought about the threat model, that you were the kind of operation that *would* resist a gag order rather than quietly comply. The canary was as much a marketing statement as a legal strategy.

The trouble is that clever and legally tested are different things, and the distance between them has never been closed.

## The core idea

A canary is a signal whose *absence* indicates a problem. You publish a regular statement — "We have not received any national security letters" — and if the statement stops appearing, observers infer that the situation has changed. The appeal is obvious: you can communicate without technically disclosing, because you're not saying anything new — you're just *stopping* saying something old.

This extends naturally to personal safety (traveller check-ins, journalist status signals), editorial independence attestations, and voluntary-signature duress codes.

## The fundamental problem: verifying absence

Verific's architecture is built around verifying *presence* — a document exists, was issued by a specific domain, and its content hasn't been tampered with. Canaries invert this. You need to verify that something *didn't* appear, which requires:

1. **A reliable schedule** — You must know when the next canary was expected
2. **Monitoring infrastructure** — Someone must be watching continuously
3. **Distinguishing silence from failure** — Did the canary disappear because of a gag order, or because the server went down, or because someone forgot to renew the cron job?

This is a monitoring problem, not a verification problem. It's closer to uptime alerting than to document authentication. The verification question "is this document authentic?" has a clean answer. The canary question "has this expected-but-absent document not appeared for meaningful reasons?" does not.

## Decades of ambiguity

**Legal status:** The core legal theory — that a government can compel you not to *disclose* an order but cannot compel you to *affirmatively lie* by continuing to publish a canary — has never been definitively tested in court in any major jurisdiction. That's remarkable for an idea that's been around since the Clinton administration. The US government's position has been deliberately ambiguous, which is itself a strategy: if you don't know whether removing your canary will land you in contempt, you probably won't post one in the first place. Australia's Telecommunications (Interception and Access) Act 1979, amended in 2015, explicitly prohibited canaries in some contexts and then the prohibition was partially walked back. The legal landscape is a patchwork of untested assumptions.

**Practical adoption:** The early cypherpunk enthusiasm predicted widespread adoption that never arrived. Apple included a warrant canary in its transparency reports starting in 2013 and quietly removed the relevant statement in 2014 — which was itself treated as news, proving the concept "worked" in the narrowest sense. Reddit removed its canary in 2016. But these high-profile removals are the entire highlight reel. A handful of VPN providers and small hosting companies maintain canaries. After 25+ years of discussion, adoption remains niche. The organisations with the most to gain (large cloud providers, telecoms) have generally avoided them — partly for legal caution, partly because their lawyers told them to stop being clever, and partly because the operational burden of maintaining a canary *correctly* (on schedule, with no false alarms from server outages or staff holidays) is non-trivial.

**The "constructive disclosure" risk:** If a court determines that removing a canary constitutes constructive disclosure of a sealed order, the publisher could face contempt charges. No one wants to be the test case. This chilling effect means canaries tend to exist in exactly the contexts where they're least needed (small providers with few users) and are absent where they'd matter most. The edgy, impressive gesture from 2002 turns out to carry real legal risk that most general counsel will not sign off on.

## The duress code variant

Personal duress codes — pre-registered safe phrases that prove voluntary action — are more promising than institutional warrant canaries. A traveller checking in with a code word, or a contract signer confirming a pre-registered phrase, has a cleaner verification model: the phrase either matches the pre-registered one or it doesn't.

But this is really just a specific instance of multi-factor authentication or challenge-response, and it doesn't need the canary framing. If Verific eventually supports duress codes, they'd likely appear as a feature of existing use cases (e.g., a "voluntary signature attestation" field on the Specific Transaction POA) rather than as a standalone document type.

## The dead man's switch

Dead man's switches — automated actions triggered by *failure* to check in — are a genuine product category, but they're an automation/escrow service, not a document verification problem. Companies like Google (Inactive Account Manager) and various digital estate services already offer these. Wrapping them in Verific's verification layer adds little — the value is in the automation and the escrow, not in the hash.

## What would change our mind

Canaries could move back into the active catalogue if:

1. **A court tests the legal theory** and it survives — establishing that canary removal is protected speech, not constructive disclosure
2. **A standardised canary protocol emerges** with adoption by major providers, giving the monitoring problem a conventional solution
3. **The verification-of-absence problem** gets a clean architectural answer that fits Verific's existing model — perhaps a "scheduled attestation" primitive where the *expectation* of a future document is itself a verifiable claim

Until then, canaries remain an interesting idea with a long pedigree and not enough real-world traction to justify a production use case.

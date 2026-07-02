# Promoting Live Verify: Getting Past the Soft Negative

The consistent first reaction to Live Verify is not "that's wrong" — it's "hmm, interesting" followed by nothing.
That soft negative is the promotion problem to solve, and it can't be solved by adding more argument, because it
was never produced by argument. This document diagnoses where the reflex comes from, then gives concrete moves —
most of which use assets the project already has.

---

## Part 1: Diagnosis — where the soft negative actually comes from

### 1.1 It's a category reflex, not an evaluation

Nobody who bounces off the pitch has evaluated the protocol. What they've done is pattern-match "verify documents
cryptographically, decentralized, open standard" to a graveyard category they already hold: blockchain credentials,
NFT certificates, W3C Verifiable Credentials / DIDs, QR-code diploma schemes, keybase-style identity proofs. A
decade of that category promising and not bootstrapping has trained smart people to file the *shape* of this pitch
under "won't happen," politely. The soft negative is a prior about the category, not a judgment about Live Verify.

Corollary: **you cannot argue someone out of a reflex they didn't reason into.** More paragraphs about sovereign
roots and dual-channel trust deepen the pattern-match ("this has the word-density of the graveyard projects").
The only thing that dislodges a category reflex is an *experience that doesn't fit the category* — something the
graveyard projects could never show, delivered in under a minute.

Also note the framing trap the site currently falls into: "This is not a blockchain" appears prominently on
index.html, opportunity.html, and for-platforms.html. Denying the frame invokes the frame — the visitor who wasn't
thinking "blockchain" now is. Denials belong in an FAQ for people who raise it; the front-door copy should describe
what it *is* in already-trusted terms ("a link the document carries; checking it is like checking a tracking
number") so the blockchain frame never activates.

### 1.2 The pitch demands too many simultaneous belief-updates

To accept the vision as pitched, a listener must simultaneously accept: OCR is reliable enough, normalization is
stable enough, issuers will adopt, verifiers will bother, DNS is a sufficient trust root, platforms will ship the
gesture, and the chicken-and-egg resolves. Any one of these is defensible; asked to swallow all seven at once, a
rational person defers judgment — which presents as a soft negative. **Promotion should request exactly one update
per contact**: "watch this 20-second video" or "select this text and right-click." That's the whole ask. The other
six updates happen later, one at a time, pulled rather than pushed.

### 1.3 The chicken-and-egg is visible in the first ten seconds

Technical listeners spot the two-sided-network problem instantly (the project's own weaknesses_audit.md item #4
concedes there's no cold-start story). A soft negative is often the polite form of "this needs everyone to adopt
before anyone benefits, so no one will." The counter is not a better argument — it's leading with the adoptions
that pay off **single-sided, on day one, for the adopter's own reasons**:

- **A university registrar** who publishes hashes kills their own verification call-center workload whether or not
  any other issuer on earth adopts. The network is irrelevant to their ROI.
- **A peer reference on a personal domain** works today — and one already exists in the wild, verified on real
  phones on video. One party, one domain, zero network required.
- **A certifier like Intertek** protects its own name against forgeries that already circulate. Again: value
  accrues to the single adopter.

The phrase to install in the copy: *this pays for itself at n = 1*. The network effects are upside, not
precondition. Right now the site says "global anti-fraud system" first and n=1 economics second; that ordering
manufactures the chicken-and-egg objection and then has to fight it.

### 1.4 Fraud is the wrong lead emotion for the buyer

The £122m Intertek story is excellent and should stay — but notice whose money it is: someone else's, in the past,
at pandemic scale. Fraud losses are probabilistic and psychologically distant; the listener's amygdala files it
under "unlucky other people." Meanwhile the *certain, this-quarter, on-my-budget* pain of the same buyer is
mundane: **staff answering "did you really issue this?" emails and phone calls**. for-issuers.html already lists
"a verification call centre you never wanted" as bullet #2 — it should be bullet #1, with a number attached
("if your registrar's office answers 40 verification requests a week, that's a part-time salary spent confirming
things a static file could confirm"). Fraud prevention is the story people *retell*; workload elimination is the
line item people *buy*. Lead with cost, let fraud be the kicker.

### 1.5 Grand abstractions trigger the crank detector

"Civilization-enhancing upside." "A global, decentralized anti-fraud system." "Trust primitive for the physical
world." "Under ~195 sovereign roots." Each of these is defensible in context — and each, on a first visit, raises
the listener's guard, because sweeping claims from a single-author project are exactly the signature of the
graveyard category (see 1.1). The paradox of this project's copy: **the smaller the claim, the more credible the
project.** "Select this sentence, right-click, see whether the issuer stands behind it" is a claim so small a
skeptic can't refuse it — and verifying it firsthand does more worldview-shifting than any paragraph about
sovereign roots. Keep the grand synthesis (it's real and it's earned) in `docs/` and the opportunity page for the
already-converted; strip it from every first-contact surface.

Related tell: slogan.js rotates **six different straplines** on a timer. Six value propositions displayed in
sequence reads as "we haven't decided what this is." Messaging indecision, made visible, on the front door. Pick
one. (Candidate below in 3.1.)

### 1.6 "589 use cases" is an anti-signal at first contact

To a believer, 589 documented use cases is thoroughness. To a first-time skeptic, it's the tell of a solution in
search of a problem — nothing that solves 589 problems has solved one yet, in their experience. The catalog is a
genuine asset for the *second* meeting (especially with platforms, where it's demand evidence) and for SEO. On the
front page, replace breadth-signaling with depth: **one wedge, told completely** — problem, document, four-second
verification, revocation — beats forty category tiles. The tiles can live one click deeper.

### 1.7 Bus-factor-one is legible everywhere

`paul@hammant.org` is the CTA on every page, and "begun by Paul Hammant" is on every footer. Honest — and to an
institutional adopter it reads "if this person loses interest, my footer line points at a dead standard."
Two counters, both already true and neither currently said plainly:

1. **The standard is designed to outlive its author.** Apache 2.0, publicly disclosed as unpatentable prior art,
   no trademark ambitions, verification endpoints are static files on the *issuer's* domain. If the project
   vanished tomorrow, every deployed endpoint keeps working forever and anyone can maintain the spec. Almost no
   startup can say this; say it as an adoption-risk answer, not just licensing trivia.
2. **Named co-signers.** One recognizable person or org saying "we reviewed this and run an endpoint" flips more
   soft negatives than any page of prose. Which leads to:

### 1.8 The empty founding-adopters page is currently a liability

founding-adopters.html offers twenty slots and (visibly) lists no one. An incentive page with no names yet is
fine at launch, but every month it stays empty it converts from "get in early" to "nobody came." Priority one of
all promotion: **get two or three real names on that page, at any scale.** A running club, a one-person training
provider, a parish council, a local certification body — smallness doesn't matter; *existence* does. "The Anytown
Athletics Club publishes verifiable race results" is worth more than ten hypothetical insurers, because it moves
Live Verify from the category "proposed standards" to the category "deployed standards," and the soft negative is
a category reflex (1.1). Note Paul's own peer-reference endpoint already qualifies — it's real, on a real domain,
verified on real phones on video. List it. One is greater than zero.

### 1.9 The missing comparison page actively converts curious → dismissive

The most common *engaged* skeptical response will be "how is this not W3C Verifiable Credentials / C2PA / DocuSign
/ a QR code / Certificate Transparency?" — and weaknesses_audit.md item #24 concedes no answer is published.
When a knowledgeable visitor asks that and finds silence, they conclude the author doesn't know the field, and the
soft negative hardens into a confident dismissal they'll repeat to others. A single honest page — one paragraph
per system: what it does, where it's stronger, where Live Verify differs (no signing keys to manage, works on
paper, revocable, static-hosting-cheap, no issuer coordination needed) — converts the project's most dangerous
objection into its best display of competence. The Merkle Tree Certificates precedent note in docs/ shows the
project can do this well; it needs to be on the public site, linked from the front page.

---

## Part 2: The core insight — replace persuasion with experience

Everything above converges on one principle:

> **The soft negative cannot be argued away, because it isn't an argument. It can only be replaced by a
> ten-second experience that doesn't fit the category the visitor filed you under.**

The project already possesses the single best such experience, buried in quickstart.html step 4:

> *"Now edit one character of the claim and verify again — it fails. That's the whole security model, felt
> firsthand."*

That moment — green tick, touch one character, red failure — is the entire protocol made visceral. No graveyard
project could ever demo that in ten seconds with no account, no wallet, no key ceremony. It is the conversion
event, and it currently sits behind: visit site → click quickstart → read 3 steps → create a GitHub repo. Nobody
soft-negative does any of that.

**Move the felt experience to second zero.** Put a live claim *on the front page itself* — verifiable text, one
"Verify this" button (the machinery in `text-selection-verify.js` already exists), already wired to a real
endpoint on the site's own domain. Beneath it, an "edit the text" toggle that lets the visitor change a character
and watch verification fail. No install, no extension, no repo. Ten seconds, in-page, and the visitor has now
*done* a verification rather than read about one. The extension install and the quickstart become the follow-up
CTAs for someone who has already felt it work — a warm audience, not a cold one.

The same logic ranks all existing assets by promotional value:

| Asset | Value | Why |
|---|---|---|
| Editable in-page verify/fail demo | Highest | Ten seconds, replaces the category reflex with an experience |
| Real-phone videos (peer reference, warrant cards) | High | "Real iPhone, real domain, today" defeats "vaporware" without a word |
| Fake-rejected videos | High | Catching the fake is the theatrical moment; a green tick on a true document is visually boring |
| Chrome Web Store listing | High | "Published product" is a category marker (shipped, not proposed) |
| £122m Intertek story | Good | Best as the *why*, after the *what* has been felt |
| weaknesses_audit.md | High for engineers, misfiled | See 2.1 |
| 589 use cases | Second-meeting asset | Demand evidence for platforms; anti-signal on the front door |
| Sovereign roots / dual-channel / burn-on-verify essays | Depth material | For the converted; poison for first contact |

### 2.1 The honesty arsenal is aimed at the wrong moment

This project's most unusual promotional asset is its self-criticism: weaknesses_audit.md is a better red-team of
Live Verify than any skeptic will write, and for-verifiers.html says the quiet part first, on purpose. That is
genuinely rare and genuinely disarming — **for audiences that read.** On Hacker News or lobste.rs, "here is the
case against my own project" is the single highest-credibility move available, and the launch post should link
the audit *in the first paragraph*, not hope nobody finds it. But sequence matters: hedges before the demo read
as weakness; hedges after the demo read as integrity. Demo → pain → mechanism → caveats, in that order, on every
surface and in every talk.

---

## Part 3: Concrete moves

### 3.1 Fix the first sentence

Current: "Don't just trust. Verify." + "Generative AI made forging any document free…" — a negative frame and a
threat, before the visitor knows what the thing does. Threats make people defensive; defensiveness presents as
soft negative. Lead with the capability in concrete nouns, and let the threat be context:

> **Select the text of any certificate, licence, or receipt — and ask its issuer, right now, "do you stand behind
> this?" Four seconds, no phone call, no account.**

That is also the strapline answer for slogan.js: one sentence, one gesture, one benefit. Retire the rotator.

### 3.2 Ship the in-page demo (the single highest-leverage change)

As described in Part 2: a live, editable, verifiable claim above the fold on index.html, backed by a real endpoint
on the site's own domain. Success state and failure state both experienceable in ten seconds without installing
anything. Everything else on the page moves down one screen.

### 3.3 Get names on founding-adopters.html this month

Target the smallest credible issuers first — the quickstart already proves a one-person outfit can do it in 15
minutes. Personal network, running clubs, training providers, a friendly solicitor. List Paul's own peer-reference
deployment now. Two named adopters change the project's category (1.8); everything else in this document works
better once that page isn't empty.

### 3.4 Write the comparison page

`how-is-this-different.html` (or a section on the front page): W3C VC/DIDs, C2PA, DocuSign/e-signature, QR-code
verification portals, E-Verify-style government portals, Certificate Transparency/MTC. One honest paragraph each.
Tone: "these are good at X; here is the gap we sit in" — the for-verifiers.html voice, which is already right.
This page is what the engaged skeptic shares with their team instead of their own dismissal.

### 3.5 Re-order for-issuers.html around the call-center number

Workload elimination first (with an illustrative cost figure), revocation second ("your 2019 paper certificate
still looks valid today — nothing you can do about it without this"), brand-protection/fraud third as the story
that makes it memorable. Same facts, buyer-shaped order. Keep the print-friendly forwarding hint — that's a good
mechanism (the visitor is rarely the decision-maker).

### 3.6 Segment the launch posts, don't broadcast one pitch

- **Engineers (HN/lobste.rs/newsletter):** lead with the demo link + the weaknesses audit + "static hosting is
  enough." The headline is the mechanism, not the mission: *"Verify any document against its issuer with a text
  selection and a SHA-256 GET"*. Engineers convert on smallness and honesty.
- **Registrars / fraud teams / goods-inwards (LinkedIn, trade press):** lead with the workload/cost frame and the
  Intertek story. No protocol detail; one link to the demo.
- **Platform PMs (warm intros):** the for-platforms.html story is already correctly shaped (increment on Live
  Text, demand evidence, take-it-over intent). It just needs the demand evidence to include *real adopters* — see
  3.3, again.

Do not run these simultaneously as one launch. Each audience seeing the other audience's pitch re-triggers the
category reflex ("they're pitching everyone everything").

### 3.7 Promote the gesture, not the system

Long-term, adoption looks like a verb: people don't adopt "web search," they "google it." The promotable unit here
is the reflex — *select → right-click → Verify?* — and every screenshot, video, and demo should end on that
gesture, identically framed, until it's recognizable. Systems get evaluated (and soft-negatived); gestures get
tried. All big-vision material — sovereign roots, safe-sequence, the global system — should be reachable but
should never again be the first thing a new visitor is asked to believe.

### 3.8 Measure the funnel you're actually arguing about

Instrument (privacy-respectfully — even just server logs on GitHub Pages proxies like the demo endpoint):
front-page demo attempts → demo edit-and-fail completions → extension installs → quickstart endpoint creations →
founding-adopter emails. The soft negative is a conversion problem; treat it like one. If visitors do the demo and
still bounce, the diagnosis in Part 1 is wrong somewhere, and the numbers will say where.

---

## Summary

| # | Soft-negative reflex | Root cause | Counter |
|---|---|---|---|
| 1 | "Another blockchain-adjacent credential scheme" | Category pattern-match | Ten-second in-page demo; never invoke the frame to deny it |
| 2 | "Interesting, but…" (defers judgment) | Too many belief-updates demanded at once | Ask for exactly one update per contact |
| 3 | "Chicken-and-egg, won't bootstrap" | Network pitched as precondition | Lead with n=1 economics; single-sided adopters |
| 4 | "Fraud isn't my problem this quarter" | Fear is distant; pitch aimed at wrong pain | Sell workload/cost first, fraud as kicker |
| 5 | "Grandiose — crank-adjacent" | Civilization-scale claims, first contact | Smallest possible claims up front; vision in docs |
| 6 | "589 use cases = zero use cases" | Breadth as anti-signal | One wedge told completely on the front door |
| 7 | "One-person project, risky to depend on" | Bus factor legible everywhere | 'Outlives its author' argument + named adopters |
| 8 | "How is this not W3C VC / C2PA / DocuSign?" | No published comparison | Write the comparison page |
| 9 | "Seen no one using it" | Empty adopters page | Two real names, any size, immediately |

The one-line version: **stop asking cold visitors to believe anything; let them verify something — and break
something — in their first ten seconds, then introduce the ideas in the order a buyer feels them.**

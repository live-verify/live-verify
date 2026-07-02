# Launch post — engineers (Show HN / lobste.rs / newsletter)

> **Draft for Paul to edit and post. Nothing here is auto-published.**
> Audience: engineers. They convert on smallness and honesty, not mission. Lead with the mechanism and the
> live demo; link the self-critique in the first paragraph. **Do not run this the same week as the issuer or
> platform posts** — one audience seeing another audience's pitch re-triggers the "they're pitching everyone
> everything" reflex.

---

**Title options (headline = mechanism, not mission):**

- Show HN: Verify any document against its issuer with a text selection and a SHA-256 GET
- Show HN: Live Verify — check a certificate against its issuer's domain, no account, no blockchain
- Live Verify: tamper-evident documents with `text → normalize → SHA-256 → GET` (and here's the case against it)

---

**Body:**

Live Verify is an open standard for checking whether the issuer of a document stands behind it — right now,
from your side of the counter. The whole pipeline is `text → normalize → SHA-256 → GET the issuer's domain`.

The fastest way to get it is to break it. There's a live demo on the front page: a real verifiable claim you
can verify in one click, then edit a single character and watch verification fail, because the hash no longer
matches anything the issuer published. No install, nothing leaves your device but one hash lookup.

👉 Ten-second demo: https://live-verify.github.io/live-verify/#tryIt

Because I'd rather you read my red-team than write your own, here's the honest case against it — normalization
fragility, the 404-ambiguity problem, OCR limits, the cold-start question, and more:
https://github.com/live-verify/live-verify/blob/main/docs/weaknesses_audit.md

**How it works.** A document carries a `verify:` line pointing at the issuer's own domain, e.g.
`verify:issuer.example.com/claims`. You select the text (or snap and OCR it), it's normalized and hashed
locally, and the hash is looked up at the issuer's URL. HTTP 200 + `{"status":"verified"}` means the issuer
currently attests to that exact text; 404 means they don't. Because it's a live lookup, claims are revocable —
which is the whole point, and the reason it deliberately isn't a blockchain.

**Why it might matter now.** Generative AI made a visually perfect forged certificate, bank statement, or test
report effectively free. Detection is an arms race defenders lose; issuer attestation isn't — a document either
hashes to something the issuer's domain stands behind, or it doesn't.

**What's deliberately boring / cheap.** The issuer side is static file hosting — a hash lookup is a plain HTTPS
GET, so GitHub Pages is enough (there's a 15-minute quickstart that stands up a real, revocable endpoint on free
hosting). Trust roots in DNS, the namespace everyone already agrees on. No central registry, no accounts, no
per-verification fees.

**What's real today.** Apache-2.0 reference implementations for iOS (Vision + JavaScriptCore), Android
(ML Kit + Rhino), and a Manifest V3 browser extension (published on the Chrome Web Store), all running the same
canonical normalization code with shared cross-platform hash fixtures. Plus real-phone verification videos and
Playwright runs against simulated national authority chains.

Honest about the limits: camera OCR is fragile on ornate type and screens; a 404 conflates "forged," "OCR
misread," and "issuer removed it"; and the two-sided-adoption/cold-start problem is real. All of that is in the
weaknesses audit above — I'd genuinely value the HN/lobste.rs read on the normalization and 404-disambiguation
questions specifically.

Repo (Apache-2.0): https://github.com/live-verify/live-verify

---

*Sequencing reminder for Paul: post → pin the weaknesses-audit link in the first comment too (people skim) →
be present for the normalization/404 threads, that's where the credibility is won.*

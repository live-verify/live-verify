# Promotion Action Plan (for Opus 4.8)

Execution plan derived from [promoting_live_verify.md](./promoting_live_verify.md) (the diagnosis — read it first,
Part 1 explains *why* each task below exists). This file is the *what to do*, ordered by leverage. Work top-down;
each task is independently shippable and independently valuable. Stop and ask Paul rather than guessing on
anything marked **[ASK PAUL]**.

## Required reading before any edit

1. [LLM.md](./LLM.md) — canonical project context and non-negotiable rules.
2. [promoting_live_verify.md](./promoting_live_verify.md) — the rationale behind every task here.
3. `public/quickstart.html` and `public/hash-calculator.html` — the existing patterns Task 1 builds on.

## Ground rules (from LLM.md — violations will be reverted)

- All **code** files (`.js`, `.html`) need the Apache 2.0 license header. Content `.md` files do NOT.
- **Fail loudly.** No retry/fallback/graceful-degradation logic anywhere, including the new demo. If the demo's
  network lookup fails, show an explicit error state — never fake a result or silently degrade.
- Do not touch `public/normalize.js` (canonical) unless unavoidable; if touched, run `npm run sync-shared` and
  copy to `apps/android/app/src/main/assets/`.
- `public/use-cases/index.json` is generated — never hand-edit (no task here should need it anyway).
- After changes: `npm run lint` and `npm run test:unit` must pass. Run `npm test` (incl. Playwright) before
  declaring done.
- Site style: each page is self-contained HTML with inline CSS following the shared visual language (see
  `:root` variables in `public/index.html`). Match it; don't introduce frameworks or external assets.

---

## Task 1 — In-page verify/fail demo on the front page (highest leverage)

**Why:** promoting_live_verify.md Part 2 / §3.2. The "edit one character and it fails" moment is the conversion
event; it must happen above the fold, in-page, with zero install.

**What to build, on `public/index.html`, directly under the lede:**

1. A short claim rendered as document-like text (reuse the quickstart's race-result style claim or similar —
   3 lines + a `verify:` line pointing at this site's own `/c` base, i.e.
   `verify:live-verify.github.io/live-verify/c`).
2. A **"Verify this"** button that runs the *real* pipeline in-page: extract the `verify:` line
   (`public/app-logic.js`), normalize (`public/normalize.js`), SHA-256, build the URL, `fetch`, and render the
   result state (green VERIFIED / red FAILS VERIFICATION / explicit network-error state). Copy the script-loading
   pattern from `public/hash-calculator.html` — do not re-implement normalization or hashing inline.
3. An **editable mode**: the claim text is user-editable (`contenteditable` or a textarea styled as the document).
   Prompt copy: *"Now change one character — a grade, a date, a name — and verify again."* The edited text hashes
   differently, the lookup 404s, the result goes red. That's the felt security model.
4. A one-click **"Restore original"** to get back to green.
5. Below the demo, the follow-up CTAs (extension install, quickstart) — these are now warm-audience CTAs.

**Backing endpoint:** compute the demo claim's hash and commit the static endpoint:

```bash
node -e "const {normalizeText,sha256}=require('./public/normalize.js'); console.log(sha256(normalizeText(process.argv[1])))" "$(cat /tmp/claim.txt)"
# then create public/c/{hash}/index.html containing: {"status":"verified"}
```

The claim text hashed must EXCLUDE the `verify:` line (that's the protocol — see `extractVerificationUrl` in
app-logic.js and the quickstart note "the verify: line is the pointer, not part of the claim").

**Placement:** everything currently above the fold (story card, doors) moves down one screen. Order becomes:
headline → demo → Intertek story → doors → the rest.

**Acceptance criteria:**
- On the deployed site (and via `cd public && python3 -m http.server 8000`), clicking Verify on the untouched
  claim shows green; editing any character then verifying shows red; restore → green again.
- No new normalization/hash code paths — only the canonical modules.
- Network failure produces a distinct, honest error state (not red-fail, not silent).
- Apache header on any new file; lint and unit tests pass.
- Consider a small Playwright spec in `webapp-playwright-tests/` covering green → edit → red → restore → green.

---

## Task 2 — First-sentence and strapline fix

**Why:** §3.1, §1.5. Lead with the capability, not the threat; one message, not six.

- `public/index.html`: replace headline + subhead with the capability-first line (use §3.1's candidate verbatim
  or a tightened variant): *"Select the text of any certificate, licence, or receipt — and ask its issuer, right
  now: do you stand behind this? Four seconds, no phone call, no account."* Keep the GenAI-forgery point but move
  it into the Intertek/"Forgery is now free" cards (context, not opener).
- `public/slogan.js` + `public/opportunity.html`: retire the six-strapline rotator. Either delete slogan.js usage
  and inline the single chosen strapline, or reduce the rotator's array to the one line (prefer removal — dead
  code out). Check nothing else references `data-slogan-root` (`grep -rl slogan public/`).
- "This is not a blockchain" must stop being headline-position copy (index.html note, opportunity.html,
  for-platforms.html bullet). Move the content to the comparison page (Task 3) and/or an FAQ position at the
  bottom of pages. It may remain as an *answer*, never as an *opener*. Replace front-door framing with the
  positive analogy: "the document carries a link; checking it is like checking a tracking number."

**Acceptance:** no rotating straplines anywhere; "blockchain" appears on index.html at most once, below the fold,
in Q&A framing; headline is capability-first.

---

## Task 3 — Comparison page: `public/how-is-this-different.html`

**Why:** §1.9 / §3.4. The engaged skeptic's first question currently has no published answer.

One honest section each: **W3C Verifiable Credentials / DIDs, C2PA, DocuSign & e-signatures, QR-code verification
portals, government portals (E-Verify / UK Share Code / VEVO), Certificate Transparency & Merkle Tree
Certificates**. For each: what it is, what it's genuinely good at, and where Live Verify differs (no issuer key
ceremony, works on paper via camera, revocable live, static-hosting cheap, verifier needs no account). Tone =
`for-verifiers.html` (respectful, quiet-part-first). Mine `docs/merkle-tree-certificates-precedent.md` and
`docs/weaknesses_audit.md` item #24 for substance. Also fold in the "not a blockchain" material displaced by
Task 2, as one section ("Blockchains / NFT credentials").

Link it from index.html (near the demo's follow-up CTAs) and from for-platforms.html and for-verifiers.html.

**Acceptance:** page exists in site style with Apache header, all six-plus systems covered, linked from at least
index.html; claims about competitors are accurate and hedged honestly (this page gets shared by skeptics — it
must survive expert reading).

---

## Task 4 — Re-order `public/for-issuers.html` around workload cost

**Why:** §1.4 / §3.5. Same facts, buyer-shaped order: cost this quarter → revocation → fraud story.

- "The cost you're already paying" card: reorder bullets to (1) verification call-centre workload — add an
  illustrative figure ("40 'did you really issue this?' requests a week is a part-time salary spent confirming
  what a static file could confirm" — keep it clearly illustrative, not a fabricated statistic), (2) no way to
  revoke, (3) the Intertek brand-damage story.
- Keep the print-friendly forwarding hint and the small-outfit green box exactly as they are (both are good).

---

## Task 5 — De-grandiose pass on first-contact surfaces

**Why:** §1.5, §1.6, §1.7.

- `public/opportunity.html`: retitle/soften "Civilization-enhancing upside" (the content can stay; the heading
  triggers the crank detector). Opportunity page is second-contact, so a lighter touch than index.
- `public/index.html`: the "A global anti-fraud system" card moves below the demo, story, and doors, and gets a
  humbler heading (e.g. "How this scales" / "The bigger picture"). "~195 sovereign roots" detail stays but should
  not be in the first two screens.
- Category grid / "589 use cases" stats-row: demote below the fold; front door tells ONE wedge completely (the
  demo from Task 1 + Intertek story already do this), tiles stay one screen lower or move to use-cases/ landing.
- Add a short "This standard outlives its author" note near the footer of index.html and for-issuers.html:
  Apache-2.0, unpatentable prior art (link `docs/no-patents-declaration.md`), endpoints are static files on the
  issuer's own domain — if the project disappeared, every deployed endpoint keeps working. Frame it as the
  adoption-risk answer (§1.7), two-three sentences, not a manifesto.

---

## Task 6 — Founding adopters page: first real entry **[ASK PAUL]**

**Why:** §1.8. An all-"Open" slots page is converting from "get in early" to "nobody came."

The plan says Paul's own peer-reference deployment (real domain, real-phone videos already linked on index.html)
qualifies as entry #1. **Do not invent the entry text** — ask Paul to confirm: the domain to name, the wording,
and whether he wants himself listed as adopter #1 or in a separate "live deployments" section (self-listing has
optics tradeoffs he should decide). Once confirmed, flip the first "Open" slot to the real entry and link the
existing videos as evidence.

---

## Task 7 — Funnel measurement **[ASK PAUL — do not implement without approval]**

**Why:** §3.8. But: GitHub Pages has no server logs, the site currently ships zero analytics, and
`public/privacy_declaration.html` makes privacy promises. Any instrumentation (even a privacy-respecting counter)
is a product/privacy decision, not a coding convenience — same spirit as the fail-loudly rule. Present Paul with
options (e.g. nothing; Chrome Web Store install stats only; a self-hosted count on the demo endpoint) and
implement only what he picks.

---

## Task 8 — Launch-post drafts (writing, not site changes)

**Why:** §3.6 / §2.1. Segmented, not broadcast. Create `promo/` at repo root (content, no license headers):

1. `promo/launch-post-engineers.md` — HN/lobste.rs "Show HN" style. Headline = mechanism ("Verify any document
   against its issuer with a text selection and a SHA-256 GET"). First paragraph links the live demo AND
   `docs/weaknesses_audit.md` ("here's the case against it"). Order: demo → pain → mechanism → caveats.
2. `promo/launch-post-issuers.md` — LinkedIn/trade-press draft for registrars/fraud/goods-inwards. Workload-cost
   lead, Intertek story, one demo link, zero protocol detail.
3. `promo/outreach-platform-pm.md` — short warm-intro email template for platform PMs, pointing at
   for-platforms.html; notes that real-adopter evidence is coming (Task 6).

These are drafts for Paul to edit and send — nothing gets posted by the agent. Note in each draft that the three
audiences should NOT be launched simultaneously (§3.6).

---

## Explicitly out of scope for the agent

- Recruiting actual founding adopters (human relationship work — §3.3 is Paul's).
- Posting anything externally (launch posts, social, Chrome Web Store copy changes).
- Adding analytics/telemetry without Task 7 approval.
- Renaming the project or the `verify:` scheme.

## Definition of done (whole plan)

- Tasks 1–5 shipped on the site; `npm test` and `npm run lint` green; visual check of index.html at mobile width
  (520px breakpoint) since the demo adds above-the-fold UI.
- Tasks 6–7 have answered questions from Paul or explicit deferrals.
- Task 8 drafts exist in `promo/`.
- A cold visitor on the deployed site can go green → edit → red → restore → green within ten seconds of landing,
  without installing anything. That's the metric everything else serves.

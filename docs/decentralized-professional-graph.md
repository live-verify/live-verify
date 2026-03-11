# The Decentralized Professional Graph

## LinkedIn's Lock-In

LinkedIn's value proposition is simple: it owns your professional identity. Your employment history, your endorsements, your connections, your recommendations — all of it lives on LinkedIn's servers, governed by LinkedIn's terms, visible according to LinkedIn's algorithms. You can't export your endorsements. You can't take your recommendations to a competitor. If LinkedIn suspends your account, your professional presence disappears.

Microsoft paid $26 billion for this lock-in in 2016. The valuation was not for the software — it was for the network effect. Everyone is on LinkedIn because everyone is on LinkedIn. The data monopoly is the product.

The result is a platform where:

- **Claims are self-declared.** You say you worked at Google. LinkedIn has no mechanism for Google to confirm or deny this. The "experience" section of a LinkedIn profile is an honour system.
- **Endorsements are meaningless.** "Endorsed for Java by 47 people" — most of whom clicked a button in a notification prompt and have never seen you write a line of Java. Endorsements cost nothing to give and carry no reputational risk to the endorser.
- **Recommendations are unverifiable.** A written recommendation on LinkedIn is text typed by someone claiming to be your former colleague. The recommender's identity is their LinkedIn profile — itself a set of self-declared claims. It's turtles all the way down.
- **The platform extracts rent.** Recruiters pay LinkedIn to search. Job seekers pay LinkedIn for visibility. Advertisers pay LinkedIn for targeting. The people who created the data — the professionals and their employers — pay to access their own graph.

## What Live Verify Makes Possible

Every `verify:` endpoint is a public URL. The hash is in the URL. The issuer's domain is in the authority chain. If an individual publishes verified credentials on their personal website — or includes them in a document they share — the claim is independently verifiable by anyone, without LinkedIn or any other intermediary.

This creates the raw material for a professional graph that nobody owns.

### Two Layers of Attestation

**Institutional attestations** — cold facts from employers and professional bodies:

- "Jane Smith was employed as Senior Engineer, March 2019 to November 2023" — verified by `hr.acmecorp.com`
- "Jane Smith holds BEng (Hons) Computer Science, First Class" — verified by `registrar.imperial.ac.uk`
- "Jane Smith is a Chartered Engineer (CEng)" — verified by `engc.org.uk`

These are what HR departments produce today as reference letters and employment confirmations. The difference is that the `verify:` line makes them machine-verifiable and the authority chain makes the issuer's standing visible.

**Peer attestations** — warm endorsements from individuals:

- "Jane redesigned our payment pipeline under impossible deadlines. It processed £2M on day one without a single failed transaction. She's the best systems architect I've worked with." — verified by `pauljones.dev`
- "I've collaborated with Jane on three open-source projects. She writes documentation that other people actually read, which in this industry is a superpower." — verified by `sarah-chen.com`

These carry weight precisely because someone put their own domain behind them. Not a click on a "recommend" button — a cryptographic commitment published on a domain the endorser controls. If Paul Jones writes a glowing reference for someone who turns out to be incompetent, `pauljones.dev/verify/{hash}` still returns `OK`. His reputation is on the line, permanently. This is the mechanism LinkedIn endorsements lack: **skin in the game.**

### The Privacy Layer

Not all attestations should be public. The smart practice:

**Public (on your personal website, scrapeable):**
- Credentials: degrees, professional licences, certifications
- Career summary: job titles and employers (if you choose)
- The `verify:` lines for all of the above

**Private (in a [`.vcv` file](future-verified-cv-format.md) shared with specific parties):**
- Full reference text — the warm peer endorsements, the detailed HR confirmations
- The `verify:` lines for these references
- Candidate `commentary:` alongside each verified claim — what you actually *did*, in your own words, visually distinct from what the issuer signed

The hash exists at the issuer's endpoint — it has to, for verification to work. But a hash alone is meaningless. You can't reverse a SHA-256. A scraper hitting `pauljones.dev/verify/{hash}` gets `OK` but has no idea what claim that hash covers unless it also has the plaintext.

So the individual controls disclosure: **credentials are public, references are private.** Your degree from Imperial verifies against `registrar.imperial.ac.uk` and you're happy for the world to know. Your former manager's glowing reference verifies against their personal domain, but you only share the text with the three companies you're actually applying to.

## The Aggregator Model

A decentralized graph needs no platform. But it benefits from **aggregators** — services that index, search, and permission-gate access to the graph. One aggregator could leap into being, or several. They compete on service, not on data monopoly.

### What an Aggregator Does

1. **Holds your explicit permission** to associate your name with a set of verified claims. You grant this; you can revoke it.
2. **Indexes public credentials** from personal websites, issuer endpoints, and any other public source of `verify:` lines.
3. **Ingests `.vcv` files** — when you upload your [Verified CV](future-verified-cv-format.md), the aggregator parses every claim, verifies every hash, and builds your profile from attested facts rather than self-declared fields.
4. **Surfaces your profile to authorised searchers** — recruiters you've approved, or open search if you choose.
5. **Manages reference disclosure** — when you release the plaintext of a reference to a specific recruiter, the aggregator facilitates the handoff. The recruiter verifies the hash; the aggregator logs the disclosure.
5. **Displays the authority chain** — so a recruiter sees not just "verified" but the chain: `hr.acmecorp.com → Companies House → gov.uk` for an employer, `registrar.imperial.ac.uk → officeforstudents.org.uk → gov.uk` for a degree, `pauljones.dev` (standalone, personal attestation) for a peer reference.

### What an Aggregator Cannot Do

- **Hold your data hostage.** Your credentials live on your domain and your issuers' domains. The aggregator indexes them; it doesn't store the originals.
- **Prevent you from switching.** Revoke Aggregator A's permissions, grant them to Aggregator B. Your verified credentials don't move — they never left your domain. The aggregator was a window into data it never owned.
- **Fabricate engagement metrics.** There are no "likes," no "impressions," no algorithmic feed. A credential is verified or it isn't. A reference exists or it doesn't.
- **Sell your graph to advertisers without your knowledge.** The permissions layer is explicit. The terms under which the aggregator surfaces your data are the terms you agreed to, not buried in a 40-page privacy policy.

### Competing Aggregators

Multiple aggregators coexist because they're all indexing the same public verification endpoints. They compete on:

- **UX and search quality** — how well they match candidates to roles
- **Privacy terms** — how they handle reference disclosure, what they log, how long they retain
- **Industry specialisation** — one might serve tech recruiters, another the NHS, another the trades, another financial services
- **Geographic focus** — UK employment law differs from US; a UK-focused aggregator understands DBS checks, right-to-work, and professional body registrations
- **Pricing** — some might be free for candidates, charging recruiters; others might charge candidates for premium visibility; others might be non-profit

None of them compete on data monopoly, because the data isn't theirs.

## The Economics

### LinkedIn's Four Revenue Lines

LinkedIn's revenue comes from four business segments:

1. **Talent Solutions** (~65% of revenue) — Recruiter tools, job postings, hiring analytics. Employers pay LinkedIn to find candidates; candidates pay for InMail and visibility. This is the core of LinkedIn's business: a gated marketplace where both sides of the hiring transaction pay the platform for access to a graph they collectively created.

2. **Marketing Solutions** (~20% of revenue) — Advertising, sponsored content, targeted campaigns. B2B marketers pay LinkedIn to reach professionals segmented by job title, company, industry, and seniority. This is surveillance capitalism applied to the professional graph: your self-declared career data is the targeting signal.

3. **Premium Subscriptions** (~10% of revenue) — Premium Career, Premium Business, Sales Navigator. Individuals pay for "who viewed your profile," extended search, and learning content. The value proposition is access to your own graph's metadata — LinkedIn charges you to see who looked at the data you gave LinkedIn for free.

4. **Learning** (~5% of revenue, formerly Lynda.com) — Online courses, skill assessments, certification prep. LinkedIn acquired Lynda.com for $1.5 billion in 2015 and rebranded it. The courses are real content, but the strategic value is tying learning completions to your LinkedIn profile — another lock-in mechanism.

5. **The social network** (not a revenue line, but the engagement engine). LinkedIn is one of the few major social platforms where you interact under your real name, tied to your real employer. You are not arguing with anonymous accounts. This matters: the discourse is more civil, the connections feel more consequential, and the reputational stakes of posting something stupid are real because your boss might see it. This real-name environment drives the daily engagement that keeps people opening the app — and that engagement is what makes the four revenue lines work. Recruiters pay because candidates are active. Advertisers pay because professionals scroll. Premium converts because people care about "who viewed my profile" when the viewers are identifiable colleagues and hiring managers, not anonymous handles.

### What the Decentralized Graph Disrupts (and What It Doesn't)

**Talent Solutions — directly disrupted.** This is the big one. If credentials are verified at the source (`hr.google.com`, `registrar.imperial.ac.uk`, `engc.org.uk`) and individuals control their own professional identity on their own domains, the recruiter's need for LinkedIn as the search layer collapses. Aggregators replace LinkedIn Recruiter — but they compete on service quality, not data monopoly. Recruiters get better data (verified, not self-declared) at competitive prices. The ~65% of LinkedIn's revenue that depends on being the only place to search for professionals evaporates as the graph becomes public infrastructure.

**Marketing Solutions — indirectly disrupted.** LinkedIn's ad targeting depends on self-declared profile data: job titles, company names, industries. A decentralized graph makes this data public and verified — which is *better* for advertisers, but removes LinkedIn's monopoly on it. Any aggregator with permission to index your public credentials can offer the same targeting. LinkedIn loses its exclusive ad inventory. But this disruption is indirect: someone still needs to build the ad platform, and LinkedIn's existing advertiser relationships are sticky.

**Premium Subscriptions — disrupted by irrelevance.** "Who viewed your profile" is only valuable when LinkedIn is the place people look. "InMail credits" are only valuable when LinkedIn is the only way to reach someone. As the professional graph decentralizes, the metadata LinkedIn charges for becomes either publicly available or irrelevant. Premium subscriptions don't get disrupted by a competitor — they get disrupted by the underlying data model changing.

**The social network — not disrupted.** The decentralized graph verifies credentials; it doesn't replace watercooler conversation. LinkedIn's real-name, real-employer social environment is genuinely valuable and has no analogue in the decentralized model. People will still want a place to post industry takes, congratulate colleagues on new roles, and argue about return-to-office mandates with people who can't hide behind anonymous handles. What changes is the *foundation* of that social network: today, the social layer and the credential layer are bundled — you stay on LinkedIn for the feed, and LinkedIn leverages that to monopolise your professional identity. A decentralized graph unbundles them. Your credentials live on your domain; your social networking happens wherever you choose. LinkedIn could remain a popular professional social network without being the sole custodian of your career history.

**Learning — not disrupted.** Online courses are content, not graph infrastructure. Coursera, Udemy, and LinkedIn Learning compete on course quality, instructor reputation, and employer recognition. A decentralized professional graph changes nothing about whether a React course is good. If anything, verified credentials *help* learning platforms: a completion certificate from Coursera that verifies against `coursera.org/verify/{hash}` is more valuable than a LinkedIn Learning badge that lives only on LinkedIn. Learning platforms benefit from Live Verify; they're potential issuers, not casualties.

### Where LinkedIn's Value Goes

LinkedIn's market capitalisation is the capitalised value of lock-in. Remove the lock-in and the value migrates:

- **To individuals** — who own their professional identity on their own domains
- **To issuers** — whose attestations carry the real credibility (an `hr.google.com` reference is valuable because Google is valuable, not because LinkedIn hosted it)
- **To aggregators** — who earn a margin for convenience, search, and permissions management — but not a monopoly rent for data ownership

The aggregator margin is real but modest. It's the margin of a search engine, not the margin of a monopoly. Multiple aggregators sharing the same underlying data is a competitive market, not a winner-take-all network effect.

### The Exit Sequence

The tech community exits LinkedIn first. They understand domains, hashes, and the value of decentralization. Many already have personal websites. The infrastructure cost of publishing verified credentials on a personal site is near zero.

Then professional services — lawyers, accountants, actuaries. Already regulated, already have professional body attestations, already operate in a world where credential verification is mandatory (SRA, ICAEW, IFoA).

Then healthcare — doctors, nurses, pharmacists. The GMC, NMC, and GPhC already maintain public registers. A `verify:` line on a credential letter that chains to `gmc-uk.org → gov.uk` is strictly more useful than a LinkedIn profile that says "Doctor."

Then the trades — electricians, gas engineers, plumbers. Gas Safe, NICEIC, and Competent Person Schemes already issue credentials. The doorstep verification use case (see [trust-assessments.md](trust-assessments.md)) drives adoption from the consumer side: homeowners who scan a tradesperson's badge are creating demand for verified credentials, which tradespeople then want to surface to recruiters and clients.

Each wave is an industry where verified credentials matter more than social networking.

## Relationship to Live Verify

Live Verify provides the base layer: domain-bound, hash-verified, authority-chained attestations. It is the protocol, not the platform.

The [`.vcv` format](future-verified-cv-format.md) provides the document layer: a plain-text file where each claim is terminated by a `verify:` line, parseable by any bot, renderable by a web component, and portable between aggregators. It is the CV that nobody owns — not the candidate (the issuers signed the claims), not the aggregator (the file is a flat text file on the candidate's domain), not any platform.

The decentralized professional graph is an emergent property of widespread adoption. Nobody needs to build it — it assembles itself as more issuers publish `verify:` endpoints and more individuals publish `.vcv` files on their own domains. The aggregators are optional conveniences built on top of a public, open, decentralized data layer.

The parallel is the early web itself. The web didn't need a directory to be useful — but Yahoo, then Google, made it more navigable. The directories competed. The web didn't care. The professional graph works the same way: the verified credentials are the web pages, the aggregators are the search engines, and nobody owns the web.

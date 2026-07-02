# Launch post — issuers / fraud & operations (LinkedIn / trade press)

> **Draft for Paul to edit and post. Nothing here is auto-published.**
> Audience: registrars, fraud teams, goods-inwards, procurement, compliance. Lead with the cost they carry
> *this quarter* (the verification-call workload), let the fraud story be the memorable kicker, keep protocol
> detail out, give exactly one link (the demo). **Do not run this the same week as the engineer or platform
> posts.**

---

**Title options (cost-first, not fraud-first):**

- Your team spends real hours answering "did you really issue this?" — it could be a four-second self-check
- The cheapest fraud control you're not using is a static file on your own website
- Stop being your own verification call centre

---

**Body:**

If your organisation issues documents — degrees, licences, certificates, insurance letters, test reports — you
are almost certainly running a verification call centre you never asked for. Employers, landlords, embassies,
procurement teams, and banks email and phone to ask one question: *"did you really issue this?"* It's manual, it
scales with your success, and every hour of it confirms something a static file could confirm in four seconds.

That's the mundane, this-quarter cost. There's a bigger one behind it. Generative AI has made a pixel-perfect
forged document — correct letterhead, plausible reference numbers, clean typography — free to produce in under a
minute. When one surfaces, it carries *your* name, and today nobody can check it without phoning you.

The PPE Medpro case is the version of this that reached a courtroom: goods were supplied to the NHS against a
safety test report bearing Intertek's name that Intertek never issued. The forgery rode through goods-inwards
across 72 shipments; it was established as fake only much later, and courts ordered £122m repaid — by which
point the goods were landfill. The fake was checkable in principle from day one. There was just no way to check
it.

Live Verify closes that gap. You add one line to the documents you issue and publish a hash of each document's
text on your own website. Anyone handed the document — on paper or on screen — checks it against your domain in
about four seconds, and learns whether you stand behind it *right now*. Change the status and it's revoked
everywhere, instantly (something paper never let you do). No PII leaves your systems — you publish one-way
hashes, not contents. No vendor, no per-check fees, no lock-in: it's an open standard, like email.

See it work in ten seconds (verify a real claim, then edit it and watch it fail):
👉 https://live-verify.github.io/live-verify/#tryIt

Happy to talk through what a pilot with one document type looks like — it's typically a sprint, not a migration.

---

*Sequencing reminder for Paul: this is the page to forward, not this post — for-issuers.html is print-friendly
and written for the person who actually owns the decision. Lead replies with that link.*

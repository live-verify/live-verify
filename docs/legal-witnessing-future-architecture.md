# Future Architecture: Hash-Based Legal Witnessing

## The Problem with Legal Witnessing Today

Legal witnessing follows the same pattern across every document type — wills, powers of attorney, deeds, affidavits, contracts, medical consent forms. The ceremony involves:

1. A **lawyer or notary** who has read the document and advised the parties
2. One or more **witnesses** who observe the signing
3. The **signing parties** who execute the document

The witness's attestation lives on the paper itself, in the custody of whoever holds the document. There is no independent record of the witnessing event. Years later, when the document matters — in probate, in a contract dispute, in a capacity challenge — the witness may be dead, unreachable, cognitively impaired, or have simply forgotten.

Critically, the witness has almost never read the document. They attest to the ceremony, not the contents. This is by design — testamentary privacy, commercial confidentiality, and attorney-client privilege all demand that the witness not be exposed to the substance of what they're witnessing. But it creates a vulnerability: the witness can confirm "someone signed something" but cannot confirm "what they signed is what they agreed to."

## The Three Roles in a Witnessing Ceremony

Today these roles are blurred. In the future architecture they become distinct, with each role producing its own verifiable claim.

### 1. The Lawyer or Notary — Content Attestation

The lawyer or notary has **read the document**. They prepared it, or reviewed it, or at minimum confirmed that its contents reflect the parties' instructions. Their role is to attest that the hash corresponds to the document the parties agreed to.

**What they attest:**

```
I, RICHARD MARCHETTI, Solicitor (SRA 648291), confirm that
document hash a7f3b2...c9 is the SHA-256 of the Last Will and
Testament of MARGARET A. WILLOWS, born 3 September 1941, of
Chester, prepared on her instructions dated 12 March 2026.
I have read this document in full. Its contents reflect the
testator's stated wishes as communicated to me during our
consultations on 8 March 2026 and 11 March 2026.
verify:wills.registry.gov.uk/v
```

**What this means:** The lawyer stakes their professional reputation and regulatory standing on the link between the hash and the document's substance. If the hash corresponds to a different document than the one the parties discussed, the lawyer is professionally liable and subject to regulatory sanction (SRA, state bar).

**What this does NOT mean:** The lawyer is not attesting that the parties' instructions were freely given, that the parties had capacity, or that no undue influence existed. They attest to a faithful translation of instructions into legal text — nothing more.

### 2. The Witness — Ceremony Attestation

The witness has **not read the document**. They don't know what it says and don't need to. Their role is entirely about the ceremony: who was present, what they observed about the parties' state of mind, and the link to a specific document via its hash.

**What they attest:**

```
I, DOROTHY HELEN MARSH, born 14 June 1958, of Chester,
witnessed MARGARET A. WILLOWS, born 3 September 1941,
of Chester, sign document a7f3b2...c9 on 15 March 2026
at 14:30 at the offices of Marchetti Wood & Partners,
14 Gray's Inn Square, London.

Before the signing, around 2pm on 15 March 2026, I independently
verified the identity of all parties present:
- MARGARET A. WILLOWS: UK Passport (visual inspection of
  physical document, photo matched holder)
- RICHARD MARCHETTI, Solicitor: SRA practising certificate,
  verified using my phone at sra.org.uk (status: active,
  SRA 648291, photo matched holder)

Solicitor Richard Marchetti confirmed to me and to the signatory
that hash a7f3b2...c9 is the document the parties agreed.

The signatory appeared to be of sound mind, was not under visible
duress, and signed voluntarily in my presence. No other persons
were present in the room besides those named above.

I have no personal interest in this document or its contents.
I am not a beneficiary, relative, or business associate of any
party to this document.

I took away a printed copy of this attestation on A4 paper,
handed to me at the ceremony by Solicitor Richard Marchetti.

verify:wills.registry.gov.uk/v
```

**The critical chain:** The witness independently verified everyone's identity using their own device before the signing began. The witness then heard the lawyer confirm that the hash corresponds to the agreed document. The witness attests to the ceremony — identity verification, capacity, voluntariness, presence, and their own uninvolved status — and ties all of it to a specific document hash.

The identity verifications create **server-side logs** at the issuing authorities (HMPO, SRA). Even if the witness dies before probate, the server records prove that someone verified Margaret Willows' passport and Richard Marchetti's SRA credentials shortly before the signing on 15 March 2026. The exact timestamps are in the server logs, not in the witness's attestation — the witness records what they did, the server records when. The witness isn't just saying "Margaret Willows was present" — there's independent, timestamped, third-party evidence that her identity document was verified around the time of the ceremony.

**Why the witness's own phone matters:** If the solicitor's device performs the verification, the solicitor controls the evidence. The witness using their own phone means the verification event is initiated by an independent party. The issuing authority's server log records a request from the witness's IP/device, not the solicitor's. This is a small but meaningful separation of control — the solicitor cannot fabricate or suppress a verification event that originated from someone else's device.

**What this means:** The witness's attestation is now a **specific, hash-linked, identity-verified, timestamped record** rather than a vague "I saw someone sign something." It survives the witness's death as a contemporaneous record. It names who was present, confirms their identities were independently checked, records who confirmed the document's integrity, and captures what the witness observed about the signatory's state.

**What this does NOT mean:** The witness is not a guarantor of truth. A coerced signatory can appear calm. A person in early cognitive decline can appear lucid. An influencer can be in the next room, not "present" by any observable standard. Identity verification confirms the person *is who they claim to be* — it does not confirm they are acting freely. The witness records what they saw and verified, not what was hidden from them.

### Identity verification methods and the transition period

The attestation must record **how** each identity was verified, not just **that** it was verified. The method matters because verification strength varies enormously, and will continue to vary during the transition from analogue to Live Verify adoption.

**Verification methods, weakest to strongest:**

| Method | Attestation language | Strength | Server-side evidence |
|--------|---------------------|----------|---------------------|
| **Known to me personally** | "known to me personally for 12 years" | Weakest — subjective, unverifiable, no third-party record | None |
| **Visual inspection of physical ID** | "UK Passport (visual inspection of physical document, photo matched holder)" | Moderate — the witness looked at a document and made a human judgement about the photo match | None |
| **Visual inspection + recorded document details** | "UK Passport PP123456, issued 14 March 2020, visual inspection, photo matched holder" | Better — document details allow later cross-reference with issuing authority | None (but details enable offline verification) |
| **Live Verify camera mode** | "UK Passport, verified using my phone at hmpo.gov.uk (status: valid, photo matched holder)" | Strong — cryptographic verification against issuer domain, server-side log of the verification event, photo returned for comparison | Yes — issuer's server log records the lookup (with exact timestamp) |
| **Live Verify with photo return** | Same as above, plus server-returned photo compared to person present | Strongest — the photo the witness compares is controlled by the issuer, not printed on a potentially forged card | Yes — photo served from issuer's server at verification time |

**During the transition period,** many witnesses will not have Live Verify on their phones, and many identity documents will not yet have `verify:` lines. The attestation accommodates this honestly. Compare the same witnessing ceremony before and after Live Verify adoption:

**Transition period — visual inspection only:**

```
I, DOROTHY HELEN MARSH, born 14 June 1958, of Chester,
witnessed MARGARET A. WILLOWS, born 3 September 1941,
of Chester, sign document a7f3b2...c9 on 15 March 2026
at 14:30 at the offices of Marchetti Wood & Partners,
14 Gray's Inn Square, London.

Before the signing, around 2pm on 15 March 2026, I verified
the identity of all parties present:
- MARGARET A. WILLOWS: UK Passport (visual inspection of
  physical document, photo matched holder)
- RICHARD MARCHETTI, Solicitor: SRA practising certificate
  (visual inspection of physical document, SRA 648291)

Solicitor Richard Marchetti confirmed to me and to the signatory
that hash a7f3b2...c9 is the document the parties agreed.

The signatory appeared to be of sound mind, was not under visible
duress, and signed voluntarily in my presence. No other persons
were present in the room besides those named above.

I have no personal interest in this document or its contents.
I am not a beneficiary, relative, or business associate of any
party to this document.

I took away a printed copy of this attestation on A4 paper,
handed to me at the ceremony by Solicitor Richard Marchetti.

verify:wills.registry.gov.uk/v
```

**Full adoption — Live Verify on witness's own phone:**

```
I, DOROTHY HELEN MARSH, born 14 June 1958, of Chester,
witnessed MARGARET A. WILLOWS, born 3 September 1941,
of Chester, sign document a7f3b2...c9 on 15 March 2026
at 14:30 at the offices of Marchetti Wood & Partners,
14 Gray's Inn Square, London.

Before the signing, around 2pm on 15 March 2026, I independently
verified the identity of all parties present using my own phone:
- MARGARET A. WILLOWS: UK Passport, verified using my phone
  at hmpo.gov.uk (status: valid, photo matched holder)
- RICHARD MARCHETTI, Solicitor: SRA practising certificate,
  verified using my phone at sra.org.uk (status: active,
  SRA 648291, photo matched holder)

Solicitor Richard Marchetti confirmed to me and to the signatory
that hash a7f3b2...c9 is the document the parties agreed.

The signatory appeared to be of sound mind, was not under visible
duress, and signed voluntarily in my presence. No other persons
were present in the room besides those named above.

I have no personal interest in this document or its contents.
I am not a beneficiary, relative, or business associate of any
party to this document.

I took away a printed copy of this attestation on A4 paper,
handed to me at the ceremony by Solicitor Richard Marchetti.
A copy was also sent to me by email at the ceremony to
d.marsh@btinternet.com.

verify:wills.registry.gov.uk/v
```

The transition-period version is no worse than what happens today — in fact it's better, because today the witness doesn't record *any* method of identity verification. The attestation at least captures that a visual check was performed and the photo was compared. The structure is identical in both cases; only the identity verification lines and the copy-retention lines change as adoption grows.

**The key principle:** the attestation records what actually happened, not what the system wishes had happened. A "visual inspection" attestation is honest and useful. A fabricated "verified at hmpo.gov.uk" when the witness didn't actually do that would be perjury. The format encourages the strongest verification available, but accepts the reality of where each document and each witness is in the transition.

**Courts will learn to weight these differently.** A will witnessed with Live Verify identity checks — server-side logs, photo comparison, timestamped verification events — is harder to contest than a will where the witness wrote "visual inspection of physical document." Over time, this creates natural adoption pressure: solicitors who want their wills to be contest-resistant will ensure witnesses use Live Verify. But the system works with any verification method — it just records it honestly.

### 3. The Signing Parties — Execution

The parties sign the document. In the future architecture, they also confirm the hash:

```
I, MARGARET A. WILLOWS, born 3 September 1941, of Chester,
confirm that document a7f3b2...c9 is my Last Will and
Testament, prepared on my instructions by Solicitor Richard
Marchetti. I sign this document freely and voluntarily.
verify:wills.registry.gov.uk/v
```

This is the weakest link. A coerced party will confirm whatever they're told to. An elderly testator who hasn't read the document will confirm the hash because the solicitor told them to. But the confirmation is still valuable: it is a **contemporaneous, signed record** that the party acknowledged the specific document. In a later dispute, the absence of this confirmation — or evidence that the party was confused about what they were confirming — becomes relevant.

## The Registry as Independent Custodian

In this architecture, none of these attestations should be published solely on the lawyer's domain. The lawyer is one of the parties whose conduct may later be questioned. Instead:

1. **The lawyer submits the document hash** to an independent registry (national will registry, land registry, notarial registry, contract registry)
2. **The registry publishes the hash** on its own domain
3. **The witness attestation** is published on the registry's domain, not the lawyer's
4. **The party confirmation** is published on the registry's domain

The `verify:` line on all attestations points to the registry, not the solicitor. The solicitor is the drafter and ceremony coordinator, not the trust anchor.

```
verify:wills.registry.gov.uk/v    ← registry domain, not solicitor's
```

### What the registrar sees: full text vs. hash only

Not all documents should be submitted to the registry in full. The deciding factor is whether the registrar needs to read the contents to perform its governance function, or whether the lawyer's attestation and metadata are sufficient.

**Full text to registrar:**

| Document type | Why the registrar needs the text |
|---|---|
| **Wills** | Must validate provisions against succession law (forced heirship, void bequests, statutory dependant claims) |
| **Powers of attorney** | Must validate scope against capacity law and check for provisions that exceed what the law permits |
| **Property deeds** | Already the model — the Land Registry sees and validates the full transfer |
| **Prenuptial agreements** | Courts review for fairness at enforcement time; the registrar holding the text is not a new exposure |

These are documents where a government body already sees the contents at some point in their lifecycle (probate court, Land Registry, family court). Moving that visibility earlier — to registration time rather than dispute time — enables problems to be caught while the parties are alive and can fix them.

**Hash only to registrar (plus lawyer attestation and metadata):**

| Document type | Why the registrar does NOT need the text |
|---|---|
| **Commercial contracts** | Terms are commercially sensitive; parties would not adopt a registry that reads their deal |
| **NDAs and confidentiality agreements** | The entire point of the document is secrecy |
| **M&A and licensing agreements** | Market-moving information; premature disclosure could be illegal (insider trading) |
| **Settlement agreements** | Often contain confidentiality clauses about the settlement itself |
| **Employment contracts** | Salary, equity, and non-compete terms are private |

For these, the registrar receives:
- The **document hash** — proves the document existed at the claimed time
- The **lawyer's attestation** (plain text) — names the parties, declares governing law, confirms the hash, states the document type
- The **witness attestation** (plain text) — ceremony facts, capacity observations, uninvolved status
- **Metadata** — document type, governing law, date of execution, party names and dates of birth

This is enough for the registrar to:
- Validate the jurisdictional declaration (governing law matches registry jurisdiction)
- Confirm the lawyer is regulated (SRA check, bar admission check)
- Timestamp the hash (proof of existence)
- Store the attestations (survivable witness record)
- Detect patterns (same lawyer, same beneficiary patterns, witness mortality)

The registrar **cannot** check the document's substantive provisions without seeing the text. For commercial contracts, this is an acceptable trade-off — the parties are typically sophisticated, legally advised, and not vulnerable in the way an elderly testator might be. The registry provides timestamp integrity and ceremony evidence, not content governance.

**Witness attestations are always plain text to the registrar.** They contain names, dates, locations, and observations about the ceremony — no commercial secrets. The registrar needs them in full to validate consistency: does the witness's account match the lawyer's? Do the dates and locations align? Are the same witnesses appearing across suspiciously many documents?

### What this changes

| Aspect | Today | Future |
|--------|-------|--------|
| **Who holds the canonical document** | Solicitor (or signatory's safe) | Independent registry |
| **Where witness attestation lives** | On the paper, in the solicitor's file | On the registry's domain, independently verifiable |
| **What the witness attests to** | "I saw someone sign something" | "I saw [person] sign document [hash], the solicitor confirmed the hash matched the agreed document, the signatory appeared of sound mind" |
| **Specificity** | Vague — no link to a specific document version | Exact — hash-linked to one specific document |
| **Survivability** | Dies with the witness | Timestamped record on registry domain |
| **Pattern detection** | Impossible — records scattered across solicitors' files | Possible — registry can flag statistical anomalies across practices |

## Applicable Document Types

This architecture generalises beyond wills to any document requiring witnessed execution:

### High-value, high-vulnerability (strongest case for adoption)

| Document | Current witness role | What hash-witnessing adds |
|----------|---------------------|--------------------------|
| **Wills and codicils** | Witness sees testator sign; doesn't read contents | Attestation pins to specific document; survives witness death; enables pattern detection of suspicious solicitor practices |
| **Lasting/Enduring Powers of Attorney** | Certificate provider confirms donor capacity | Pins the capacity assessment to the specific POA version; detects post-signing substitution by the attorney-in-fact |
| **Property deeds and transfers** | Witness sees grantor sign | Pins to specific deed; prevents substitution during the gap between signing and registration |
| **Settlement agreements (divorce, litigation)** | Parties sign before solicitors | Pins terms to specific document; prevents "that's not what I agreed to" disputes |

### Medium-value (clear benefit, lower adoption urgency)

| Document | Current witness role | What hash-witnessing adds |
|----------|---------------------|--------------------------|
| **Affidavits and statutory declarations** | Commissioner/notary watches declarant swear | Links the sworn statement to a specific text; prevents post-swearing alteration |
| **Corporate resolutions and board minutes** | Company secretary records votes | Pins recorded votes to specific resolution text; prevents retrospective amendment |
| **Medical consent forms** | Witness sees patient sign | Pins consent to specific procedure description; useful when "informed consent" is later disputed |
| **Commercial contracts** | Witnesses (where required) see parties sign | Pins to specific terms; relevant in jurisdictions requiring witnessed execution for certain contract types |

### Lower-value (nice-to-have, not transformative)

| Document | Why lower priority |
|----------|-------------------|
| **Marriage ceremonies** | Registrar is already an independent state official; the ceremony is public; witnesses are usually known to both parties |
| **Routine notarisations** | The notary already maintains a register; hash-witnessing adds marginal value over existing notarial record-keeping |

## The Lawyer's Verbal Confirmation as a Key Step

The most important innovation in this architecture is not the hash itself — it's the **lawyer's verbal confirmation to the witness** that the hash corresponds to the agreed document.

Today, the witness has no basis for knowing whether the document on the table is the document the parties discussed. The lawyer could have substituted a different version. The witness wouldn't know.

In the hash-witnessing ceremony, the lawyer states — in front of the witness and the signing parties — that hash `a7f3b2...c9` is the document prepared on the parties' instructions. This statement is:

- **Heard by the witness**, who records it in their attestation
- **Heard by the signing parties**, who can challenge it if the hash doesn't match what they expect (assuming they've been given the hash in advance, which the protocol should require)
- **A professional representation** by a regulated lawyer, subject to disciplinary consequences if false

This doesn't prevent a conspiracy between the lawyer and one of the parties. But it creates a **moment of accountability** that doesn't exist today. The lawyer makes an explicit, witnessed, hash-specific claim about the document's contents. If that claim is later shown to be false, the lawyer's exposure is far greater than in today's system, where the question of "which version was on the table" often degrades into irresolvable he-said-she-said.

## Limitations and Honest Boundaries

**What this architecture cannot solve:**

- **Coercion before the ceremony.** If a party is manipulated into giving instructions to the solicitor, the document faithfully reflects those coerced instructions, the hash is correct, the attestations are correct, and the fraud happened before the system was involved.
- **Collusion between lawyer and one party.** If the lawyer is actively conspiring with a beneficiary, they will make the verbal confirmation dishonestly. The witness records a lie. The registry stores a lie. The hash is technically correct for the wrong document. Mitigation: the signing parties should receive the hash in advance (e.g., by secure message from the registry, not from the lawyer) so they can independently verify it matches what they expect.
- **Witnesses who don't pay attention.** A witness who is going through the motions — signing without listening to the lawyer's confirmation, not observing the signatory's demeanour — produces a worthless attestation regardless of whether it's hash-linked.
- **Capacity assessment is still subjective.** "Appeared to be of sound mind" remains a lay observation. A hash doesn't make the witness a medical professional.

**What this architecture makes harder:**

- **Post-signing document substitution** — the hash pins the document at the moment of witnessing
- **Solicitor as single point of failure** — the registry holds an independent record
- **Disappearing witnesses** — attestations survive as verifiable records
- **Invisible patterns of abuse** — registry-level data enables statistical detection
- **Deniable ceremony** — every participant's role and observations are recorded in separate, hash-linked, timestamped claims

## Jurisdictional Governance: The Attestation Declares the Legal Framework

A critical design principle: **the witnessing plain text must state the nation-state legal nature of the contract being signed.** This is not metadata hidden in headers — it is part of the witnessed, hashed, human-readable attestation text.

This means the legal framework governing the document is:
- Visible to the witness at the time of signing
- Permanently recorded in the attestation hash
- Verifiable by any party, court, or registry after the fact
- Impossible to retroactively change without invalidating the hash

### Why this matters

Without an explicit jurisdictional declaration, a document's governing law can be ambiguous or disputed. A prenuptial agreement drafted by a London solicitor for a couple where one party is a UK national and the other is from a country with different matrimonial property rules — which law governs? Today, that question is sometimes not resolved until divorce proceedings, years later. With jurisdictional attestation, the lawyer declares the governing law at signing time, the witness hears it, and the registry records it.

More importantly, it prevents jurisdictional sleight-of-hand. A contract governed by the laws of England and Wales has specific protections — unfair terms legislation, mandatory consumer rights, family provision claims, public policy limits. A contract governed by a different legal tradition may not have those protections. The jurisdictional declaration ensures everyone in the room — and everyone who later verifies the document — knows which legal system's rules and protections apply.

### Example: Marriage Contract (Prenuptial Agreement)

**Lawyer's attestation:**

```
I, SARAH CHEN, Solicitor (SRA 712483), confirm that document
hash 8d4e1f...b3a7 is the SHA-256 of a Prenuptial Agreement
between JAMES ROBERT HARLOW, born 22 April 1989, of Islington,
London, and AMIRA NASREEN KHALID, born 9 November 1991, of
Hampstead, London.

This contract is governed by the laws of England and Wales.
It was prepared in accordance with the Matrimonial Causes
Act 1973 and the guidance in Radmacher v Granatino [2010]
UKSC 42. Both parties received independent legal advice.

I have read this document in full. Its contents reflect the
instructions of both parties as communicated in separate
consultations on 4 March 2026 (Mr Harlow) and 6 March 2026
(Ms Khalid).
verify:contracts.registry.gov.uk/v
```

**Witness's attestation:**

```
I, THOMAS EDWARD PRICE, born 7 January 1975, of Camden, London,
witnessed JAMES ROBERT HARLOW, born 22 April 1989, of Islington,
London, and AMIRA NASREEN KHALID, born 9 November 1991, of
Hampstead, London, sign document 8d4e1f...b3a7 on 15 March 2026
at 10:00 at the offices of Chen Family Law, 22 Bedford Row, London.

Before the signing, around 10am on 15 March 2026, I independently
verified the identity of all parties present using my own phone:
- JAMES ROBERT HARLOW: UK Driving Licence, verified using my
  phone at dvla.gov.uk (status: valid, photo matched holder)
- AMIRA NASREEN KHALID: UK Passport, verified using my phone
  at hmpo.gov.uk (status: valid, photo matched holder)
- SARAH CHEN, Solicitor: SRA practising certificate, verified
  using my phone at sra.org.uk (status: active, SRA 712483,
  photo matched holder)

Solicitor Sarah Chen confirmed to me and to both signatories
that hash 8d4e1f...b3a7 is the prenuptial agreement the
parties agreed, governed by the laws of England and Wales.

Both signatories appeared to be of sound mind, were not under
visible duress, and signed voluntarily in my presence. Both
confirmed they had received independent legal advice. No other
persons were present in the room besides those named above.

I have no personal interest in this document or its contents.
I am not a relative or associate of either party.

I took away a printed copy of this attestation on A4 paper,
handed to me at the ceremony by Solicitor Sarah Chen. A copy
was also sent to me by email at the ceremony to
t.price@gmail.com.

verify:contracts.registry.gov.uk/v
```

**What the jurisdictional declaration does here:**

The attestation explicitly states "governed by the laws of England and Wales." This is now part of the hashed, witnessed record. If either party later claims the agreement was intended to operate under a different legal framework — or if a court in another jurisdiction is asked to enforce it — the contemporaneous attestation is clear about what was represented at signing time.

### Registry enforcement

When a registry receives a document for registration, the jurisdictional declaration enables automated policy checks:

- **Governing law matches registry jurisdiction:** A document registered with the England and Wales registry must be governed by the laws of England and Wales (or explicitly state it's governed by foreign law with appropriate conflict-of-laws provisions)
- **Substantive compliance:** The registry can flag provisions that are void or unenforceable under the declared governing law — not to block registration, but to require the solicitor to confirm the parties received advice about enforceability
- **Mandatory protections:** Family law protections (Matrimonial Causes Act), unfair contract terms (Consumer Rights Act 2015), forced heirship rules (in civil law jurisdictions) — the registry knows which rules to check because the governing law is declared
- **Cross-border transparency:** When a document governed by foreign law is presented to an English court, the jurisdictional declaration is on the face of the attestation. The court doesn't have to investigate which law was intended — the parties and their lawyers stated it at signing time

### What this prevents

A document drafted in London by a regulated solicitor, witnessed in a standard ceremony, but silently governed by a legal framework with fewer protections than the parties expected — this becomes impossible to hide. The governing law is in the plain text of the attestation, witnessed, hashed, and published. Everyone who verifies the document sees it.

This doesn't prevent parties from choosing foreign governing law — that's a legitimate legal choice. It prevents that choice from being obscured, ambiguous, or discovered only during litigation years later.

## Relationship to Existing Live Verify Concepts

This architecture uses existing Live Verify primitives:

- **Verifiable claims** — each attestation is a standard text → normalise → hash → GET verification
- **Authority chains** — registry → regulator → government root
- **Independent witnessing service** — the registry acts as the witness of witnesses, providing non-repudiation
- **Multi-page manifests** — complex documents use `compositeHash` to bind all pages; the witness attests to the composite hash, covering the entire document
- **Status changes** — a will's status can change (Superseded, Revoked) and the registry reflects this in real time

The only genuinely new concept is the **lawyer's verbal hash confirmation** as a formal step in the witnessing ceremony — creating the chain: lawyer reads document → lawyer confirms hash to witness → witness observes ceremony and records observations → all attestations published to registry domain.

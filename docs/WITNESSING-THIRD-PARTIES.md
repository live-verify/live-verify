# Witnessing and Third Parties

## Party Model

### First Party (Issuer)
Creates and signs the document. Examples: hotel, employer, bank, insurance company.

### Second Party (Recipient)
Receives it, **keeps it**, and **may later** hand it to third parties for various reasons.

The "keeps it" is important because:

1. **Personal record** - They have their own verified copy of what was agreed
2. **Peace of mind** - They can check it themselves anytime
3. **Future optionality** - IF a dispute arises, they have proof ready

Most of the time, the document just sits in their inbox or file drawer. The verification value is latent - it's there *if needed*.

The second party benefits from verification even if they never show it to anyone:
- "I can confirm this matches what the issuer's system recorded"
- "I know this hasn't been altered since I received it"
- "If I ever need to prove something, I'm covered"

The third-party handoff is a *potential* use, not the primary one.

### Third Party (Verifier)
Receives the document from the second party and verifies authenticity. Examples: employer (expense reimbursement), regulator (complaint), credit card company (chargeback), lawyer (evidence).

The third party doesn't go to the first party directly - they receive the document **from the second party** and use the hash to verify it's authentic without needing to contact the first party.

This is the core value: **portable proof** that the second party can hand to anyone, and anyone can verify independently.

---

## The Problem: Issuers Can Delete Hashes

A verified document is only as durable as the issuer's willingness to keep the hash endpoint alive. An issuer who later regrets a claim — a bookmaker facing a large payout, an employer who issued a reference they wish they hadn't, a contractor who certified work they later want to disown — can delete the hash from their server. The endpoint returns 404. The issuer shrugs: "We never issued that."

The second party still has the plain text. They can prove the text hashes to a specific SHA-256 value. But they cannot prove the issuer ever published that hash at their endpoint. It's their word against the issuer's.

This is what witnessing solves.

---

## Witnessing

A **witnessing organization** independently fetches and records a verification endpoint's response, creating a timestamped record that the issuer cannot later deny or delete.

**Witnessing is just a timestamped HTTP GET performed by a credible third party.** The technical bar is trivially low. The value is in the organization's credibility, record-keeping, and willingness to attest later.

### Two Modes

Witnessing can be engaged from either direction:

| | Regulatory (top-down) | Voluntary (bottom-up) |
|---|---|---|
| **Who engages the witness** | The issuer (required by regulator) | The second party (by choice) |
| **Who pays** | The issuer (cost of compliance) | The second party (or their insurer/solicitor) |
| **Issuer's knowledge** | Issuer knows — they send hashes to the witness | Issuer doesn't know — witness fetches publicly |
| **What the witness receives** | Hashes + structured metadata from the issuer | HTTP response from a public GET |
| **Ongoing relationship** | Continuous — witness receives all hash changes | Point-in-time — witness records a single fetch |
| **Primary value** | Regulatory audit trail; non-repudiation at scale | Individual dispute protection; expert witness testimony |

Both modes result in the same outcome: an independent third party who can attest that a hash was verified at a specific time. The regulatory model is stronger (the witness receives ongoing updates including status changes and deletions), but the voluntary model is available to anyone, for any verified document, without the issuer's cooperation or knowledge.

### Regulatory Witnessing

A jurisdiction may require the issuer to retain a witnessing firm for regulatory compliance. The witnessing firm:

- Receives all hashes from the issuer, and any subsequent changes to the payload as they happen — which may manifest as a new hash, a status change, or even a 404 (record deleted)
- Receives structured content/metadata (amounts, dates, confirmation numbers)
- Does **NOT** receive plaintext (names, personal details)
- Provides an immutable, timestamped audit trail — available to the jurisdiction on demand, to second/third parties during disputes, or as expert witness testimony in legal proceedings

This gives:
- **Non-repudiation**: Issuer can't deny issuing the hash
- **Timestamp proof**: Hash existed at a specific time
- **Privacy**: Witness can't read personal details
- **Regulatory audit**: Jurisdiction can inspect the witness ledger
- **Resilience**: Verification works even if issuer's systems go down

### Voluntary Witnessing

A person who suspects the issuer may renege can ask a witnessing organization to independently fetch and record the verification endpoint *before* the issuer has any reason to delete it.

**What the witnessing organization does:**

1. Receives the verification URL from the second party (e.g., `https://williamhill.co.uk/slips/cda9d0c9...`)
2. Performs its own GET against that URL
3. Records the full HTTP response — status code, headers, JSON payload, timestamp
4. Stores this record in its own immutable ledger

**What the witnessing organization does NOT need:**

- The plain text. They don't need to know what the document says. They only need the URL and the response.
- Any relationship with the issuer. The issuer doesn't know (or need to know) that a witness has been engaged.
- Any special access. The verification endpoint is public — anyone can GET it.

---

## The Witnessing Interaction

**Step 1: Second party requests witnessing.**

The second party sends the witnessing organization the verification URL. Not the plain text — just the URL.

```
Please witness: https://williamhill.co.uk/slips/cda9d0c9fb692eddfe4015f2a7c93c0ef82fcbb4c5ac3be1d139220ec4a9dd16
```

**Step 2: Witnessing organization fetches the URL.**

The organization performs its own independent GET. The issuer sees the request in their logs but doesn't know it's a witness — it looks like any other verification lookup.

**Step 3: Witnessing organization records the result.**

```
Witness Record
URL: https://williamhill.co.uk/slips/cda9d0c9fb692eddfe4015f2a7c93c0ef82fcbb4c5ac3be1d139220ec4a9dd16
Fetched: 2026-03-15T14:22:07Z
HTTP Status: 200
Response Body: {"status":"verified","message":"Winning bet — Cheltenham Gold Cup — GBP 180.00","claim_ref":"WH-2026-4412-08841","claim_prompt":"Claim winnings?"}
Response Headers: [recorded]
TLS Certificate: williamhill.co.uk, issued by DigiCert, valid until 2027-01-15
```

The TLS certificate recording matters — it proves the response came from the genuine domain, not a spoofed server.

**Step 4: Nothing happens (usually).**

Most witnessed claims are never disputed. The witness record sits in the organization's ledger indefinitely. The second party paid their fee (if any) and has peace of mind.

**Step 5: Dispute arises (occasionally).**

The issuer deletes the hash. The second party contacts the witnessing organization: "I need you to attest that this endpoint returned 200 + verified on 15 March 2026."

The witnessing organization provides a signed attestation, or appears as an expert witness in court, or supplies their ledger record to the second party's solicitor.

## What the Witness Can Later Attest

If the issuer deletes the hash and denies ever issuing the document, the witnessing organization can attest:

- "On [date] at [time], I performed a GET against `https://issuer.com/path/{hash}` and received HTTP 200 with the following JSON payload: `{...}`"
- "The hash in the URL was `{hash}`"
- "The response included `"status": "verified"` and the following fields: [...]"

They cannot attest to what the plain text said — they never had it. But they can prove the issuer's endpoint confirmed the hash was valid at a specific point in time. Combined with the second party's possession of the plain text (which deterministically produces that hash), this establishes that the issuer verified the document.

## What Witnessing Does Not Prove

- **What the plain text said.** The witness never had it. They can prove the hash was verified, not what the hash represents.
- **That the second party is the rightful holder.** The witness doesn't know or care who the document belongs to.
- **That the issuer's claim was true.** A bookmaker may have verified a forged slip by mistake. Witnessing proves the endpoint responded; it doesn't validate the underlying claim.
- **That the response hasn't changed since witnessing.** The issuer could have changed the response from "verified" to "revoked" between the witness fetch and a later dispute. The witness can only attest to what they saw at the time they fetched.

---

## Who Provides Witnessing

Witnessing is not a technology problem — it's a credibility problem. The value of a witness depends on their reputation and their ability to testify. Possible providers:

| Provider type | Why credible | Example |
|---|---|---|
| **Solicitors / notaries** | Officers of the court; professional duty to maintain accurate records; existing attestation infrastructure | Any high-street solicitor |
| **Accountancy firms** | Regulated professionals; audit trail obligations; existing document retention practices | Local or national firms |
| **Specialist witnessing firms** | Purpose-built for this; may offer SLAs, API access, bulk witnessing | New market category |
| **Archival services** | Long-term record retention is their core business | Iron Mountain, national archives |
| **The second party's own solicitor** | Already retained; already trusted; already understands the context | Whoever handles their legal affairs |

## Revenue Models

Witnessing organizations may charge for the service, or derive revenue from downstream activities:

| Model | How it works |
|---|---|
| **Per-witness fee** | Flat fee per URL witnessed (e.g., £5–£50 depending on context) |
| **Subscription** | Monthly/annual plan for individuals or businesses who regularly need witnessing (e.g., contractors, freelancers) |
| **Expert witness fees** | Witnessing is cheap or free; the real revenue comes from providing expert witness testimony in court if the issuer disputes the claim. Court rates for expert witnesses are substantial. |
| **Bundled with legal services** | Solicitors add witnessing to their existing retainer — trivial marginal cost, significant added value |
| **Insurance-adjacent** | Witnessing bundled with professional indemnity or legal expenses insurance — the insurer witnesses claims that might later need defending |

The expert witness model is particularly interesting: the witnessing organization has a financial incentive to maintain impeccable records, because their testimony is their product. Sloppy record-keeping destroys their business.

---

## Timing

The witness must fetch the URL **before** the issuer has reason to delete it. Once the dispute starts, it's too late — the issuer has already removed the endpoint.

For high-stakes documents (large bets, employment references from unreliable employers, contractor certifications), the second party should engage a witness immediately upon receiving the document — ideally within hours, before the issuer even knows a dispute might arise.

For lower-stakes documents, witnessing after the fact is still useful if the endpoint is still live. A witness fetch six months after issuance still proves the endpoint was responding at that point.

## Multiple Witnesses

Nothing prevents the second party from engaging multiple witnessing organizations. Independent attestations from two or three credible witnesses are stronger than one — and make it harder for the issuer to claim the witnesses colluded.

The cost of additional witnesses is marginal (it's just another HTTP GET), and the evidential value compounds.

---

## Architecture Diagram

```
┌─────────────┐    hash + structured data    ┌──────────────────┐
│ First Party │ ────────────────────────────► │  Witnessing Firm │
│  (Issuer)   │                              │  (regulatory)    │
└──────┬──────┘                              └────────┬─────────┘
       │                                              │
       │ full document                                │ periodic rollups
       │                                              ▼
       │                                     ┌──────────────────┐
       │           public GET                │ Public Blockchain│
       │     ┌──────────────────┐            │   (non-party)    │
       │     │  Witnessing Org  │            └────────┬─────────┘
       │     │   (voluntary)    │                     │
       │     └───────┬──────────┘                     │
       │             │ fetches issuer's                │ hash verification
       │             │ public endpoint                 │ (any path)
       ▼             │                                │
┌──────────────┐     │                                │
│ Second Party │ ◄───┘  ◄─────────────────────────────┘
│ (Recipient)  │
└──────┬───────┘
       │
       │ hands document (if needed)
       ▼
┌──────────────┐
│ Third Party  │
│  (verifier)  │
└──────────────┘
```

## Verification Paths

The second party (or any third party) can verify a document hash against:

1. **First party's domain** - Direct check against issuer's published hash
2. **Witnessing firm (regulatory)** - Independent confirmation of hash existence and timestamp, received directly from issuer
3. **Witnessing organization (voluntary)** - Independent confirmation via public GET, engaged by second party
4. **Public blockchain** - Ultimate trust anchor via rollup inclusion proof

Multiple paths provide redundancy and varying levels of trust assurance.

### Public Blockchain (Non-Party)

Witnessing firms may periodically commit rollups to an inexpensive public blockchain, providing:

- Ultimate immutability guarantee
- Decentralized trust anchor
- Cross-jurisdictional verification
- Long-term archival independent of any single firm

The public blockchain is a "non-party" - it's infrastructure, not a participant in the transaction.

See [Merkle Trees for Database Anchoring](./cryptographic-foundations.md#merkle-trees-for-database-anchoring) for the construction, inclusion proofs, and branching factor trade-offs behind these rollups.

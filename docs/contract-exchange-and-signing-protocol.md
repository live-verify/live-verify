# Contract Exchange and Signing Protocol

## Problem

When two parties negotiate a contract — a car lease, a mortgage, a rental agreement, an employment contract — one party typically controls the paperwork. The other party sees versions, agrees to terms verbally, and signs. But the party who controls the paperwork can:

- Submit a different version to the financing institution than the one the other party signed
- Add, remove, or alter terms between the version shown and the version submitted
- Forge or reuse a signature on a document the signer never saw
- Claim "the system changed it" or "the bank adjusted the rates" when challenged

The signer often discovers this months later, through painstaking forensic accounting — comparing what they remember agreeing to against what the lender or counterparty funded. The Reddit post about a DC Ford dealer lease fraud (March 2026) is a representative example: the dealer submitted a second, unauthorized contract with fabricated tax lines, a lowered residual, and an uncredited payment. The buyer spent months reconstructing the fraud.

Current e-signature platforms (DocuSign, Adobe Sign, etc.) partially address this by hashing the signed document. But they only protect documents that pass through their platform. If the controlling party submits a different document to the lender outside the platform — on paper, via their own dealer management system, or through the lender's dealer portal — the e-signature platform knows nothing about it.

## Design Principle

**The signer's cloud is the system of record. The phone is the interface.**

Not the counterparty's system. The signer's own cloud provider, chosen by the signer, accessed through their phone. The contract ledger — every version, every hash, every signing receipt — lives in the signer's cloud and survives loss or replacement of the phone.

The cloud provider is **pluggable**. The signer chooses:

- **Apple iCloud** or **Google Drive** — comes free with the phone, zero friction for most consumers
- **DocuSign, Adobe Sign, or Dropbox** — the signer already has an account and trusts the provider
- **A specialist contract-custody provider** — a new market category for firms that offer append-only contract ledgers as their core service
- **Self-hosted** — for businesses or individuals who want to control their own infrastructure

The protocol defines a standard API for the append-only ledger. Any conforming provider can serve as the signer's system of record. The signer can migrate between providers (easy offboarding) by exporting their ledger — it's just PDFs, hashes, and metadata.

This is important: the signing receipt's `verify:` line points to the signer's chosen cloud provider. If the signer uses iCloud, it's `verify:icloud.com/contracts/jd`. If they use DocuSign, it's `verify:docusign.com/ledger/jd`. The counterparty and the financing institution don't care which provider the signer chose — they just verify against whatever domain the receipt names.

## Signer Identity Assurance

The cloud provider stores the contract ledger and publishes signing receipts, but storage custody is not identity proof. The protocol must separately establish that **this human** authorised the signature, not just that **this account** issued a hash.

### Enrolled devices

The signer enrols one or more trusted devices (their phone, tablet, laptop) against their signing account. Each device is identified by a hardware-bound credential (Secure Enclave key on iOS, StrongBox key on Android, TPM-backed key on desktop).

### Signing authentication

At the moment of signing, the protocol requires strong local user presence on an enrolled device:

- **Biometric** — Face ID, Touch ID, fingerprint, or equivalent
- **Device passcode** — as fallback if biometric fails
- **Both** — for high-value transactions, the provider may require biometric plus passcode

The provider records:

- Signing account identifier
- Enrolled device identifier
- Authentication method used (biometric type, passcode, both)
- Timestamp
- Document hash signed

This is stronger than current e-signature platforms, which often rely mainly on email access, a browser session, or a one-time code. In the base case, it binds the signature to a specific signing account, a specific enrolled device, and a specific moment of user-authenticated approval for a specific document hash. Whether that equals "specific person" depends on how strong account enrollment was. Where stronger personal identity proof is required, KYC, qualified witnessing, or equivalent identity-assurance layers can be added at enrollment or at signing time (see below).

That shifts a later denial from "that is not my signature" to the much narrower claim that this enrolled device on this account did not authorise this hash at that time.

### Optional: stronger identity assurance

For high-value or regulated transactions, the provider may require additional identity assurance beyond device enrollment:

- **KYC verification** at account setup — government ID scan, liveness check, address verification. This closes the gap between "account holder" and "identified person."
- **Qualified witness** at signing — a notary, solicitor, or trusted third party who attests "I confirm this person was present and authenticated"
- **Video recording** of the signing moment — similar to Remote Online Notarization (RON)

These are optional layers. The base protocol requires biometric/passcode on an enrolled device, which provides strong account-holder and device-level authorization. The additional layers are available for transactions where personal identity proof — not just account authorization — is needed.

## Protocol Overview

### 1. Session establishment

The signer walks into a negotiation (dealership, solicitor's office, letting agent, HR meeting). They generate a **session credential** on their phone: a one-time upload URL or token, scoped to this counterparty, this negotiation, this day.

The signer shows the session credential to the counterparty (QR code on their phone screen). The counterparty's system can now **append** contract versions to the signer's ledger, subject to session scope rules (see below). Append only — they cannot delete or modify previous versions.

The session credential is scoped:

- **One contract family per session.** A session covers a single negotiation (e.g., "2025 F-150 Lightning lease at Riverside Ford"). The counterparty cannot upload unrelated documents into the same session. The session credential includes a document-type field (e.g., `vehicle-lease`, `mortgage`, `rental-agreement`) that the signer's system enforces.
- **Sequence numbers with parent-hash chaining.** Each version references the hash of the previous version, forming a chain. Version 3 includes `parent: hash-of-version-2`. This prevents the counterparty from creating parallel branches — they cannot upload "version 3a" and "version 3b" and later argue the signer signed the wrong branch. If a version arrives whose parent hash doesn't match the current head, the signer's system rejects it.
- **Signer acceptance of each append.** Each upload arrives as a **pending** version. The signer's system notifies them: "New version received." The signer (or their AI agent) reviews it. The signer explicitly **accepts** or **rejects** the version before it becomes part of the canonical negotiation trail. Rejected versions are retained in the ledger (for the record) but marked as rejected and excluded from the chain.

### 2. Version accumulation

As the negotiation progresses and terms are reworked, each new version of the contract is uploaded to the signer's ledger:

```
Version 1: Initial offer (uploaded 14:02, accepted 14:04)
  parent: none (first in chain)
Version 2: Down payment adjusted (uploaded 14:18, accepted 14:20)
  parent: hash-of-v1
Version 3: Trade-in value revised (uploaded 14:31, accepted 14:33)
  parent: hash-of-v2
Version 4: Finance rate changed (uploaded 14:45, accepted 14:48)
  parent: hash-of-v3
Version 5: Final agreed terms (uploaded 15:02, accepted 15:05)
  parent: hash-of-v4
```

Each version is PDFed and hashed as it arrives. The signer's system stores every version. The counterparty's system can see what it has uploaded but cannot alter or delete previous uploads.

**Spam and flooding protection:** Because each version requires signer acceptance and must chain from the current head, the counterparty cannot flood the session with junk. If they upload dozens of versions without the signer accepting them, the pending queue grows but the canonical chain does not. The signer's AI agent can flag unusual patterns: "The counterparty has uploaded 12 versions in 10 minutes. This is unusual — review carefully before accepting any."

### 3. AI-assisted diffing

The signer's AI agent (on-device or cloud) diffs each new version against the previous one and reports changes in plain language:

> "They say only the down payment changed. Three changes detected between version 3 and version 4: (1) down payment reduced from $15,000 to $12,000, (2) a new line 'Upfront Excise Tax $7,503.62' was added, (3) residual value dropped by $800. Net effect: your monthly payment stays the same but $8,303.62 of your equity has been absorbed."

The signer can interact by voice or text:

> "Is the upfront excise tax normal for a DC lease?"

> "No. DC leases are exempt from upfront excise tax. Lessees pay a 10.25% monthly use tax instead. This line should not exist."

This replaces the months of forensic accounting the Reddit buyer did after the fact, with real-time review at the point of decision.

### 4. Signing

When the signer agrees to the final version:

**Signer's cloud provider issues a verifiable signing receipt:**

```
Contract signed by buyer
Session:       FRD-DC-2025-09-11842
Version:       5 of 5 (final)
Doc hash:      e8a4b2c9d7f3...
Prior drafts:  versions 1-4 (unsigned, superseded)
Signed:        15 Sep 2025 14:22 UTC
verify:docusign.com/ledger/jd
```

(The `verify:` domain depends on which cloud provider the signer chose — `icloud.com`, `docusign.com`, `drive.google.com`, a specialist provider, etc.)

This is a standard Live Verify plain text. It includes the hash of the final PDF and explicitly notes that all prior versions are superseded.

**Counterparty countersigns with their own verifiable receipt:**

```
Contract countersigned by dealer
Dealer:        Riverside Ford (riversideford.com)
Session:       FRD-DC-2025-09-11842
Version:       5 of 5 (final)
Doc hash:      e8a4b2c9d7f3...
Signed:        15 Sep 2025 14:23 UTC
verify:riversideford.com/contracts
```

**Exchange:** The signer shows their receipt on their phone. The counterparty camera-snaps it, or receives it via NFC, or by email. The counterparty shows theirs. The signer snaps it. Both parties now hold both signing receipts.

### 5. Witnessing by the financing institution

Both signing receipts are registered with the financing institution (Ford Credit, the mortgage lender, the insurance company). The financing institution is the natural witness because:

- They fund the deal — they have the strongest incentive to know what was actually signed
- They are not controlled by either negotiating party
- They already receive the contract from the counterparty as part of the funding process

The financing institution can now verify automatically at the point of funding:

- Do both parties' document hashes match? (Same document was signed by both)
- Does the document the counterparty submits for funding match the hash in the signing receipts?
- If the counterparty submits a different document → hash mismatch → funding refused

**Scope note:** Hash matching proves that the funded document is the same one both parties signed. It does not prove the signer understood the terms, that required disclosures were present, or that the counterparty did not pressure the signer into approving a bad version. This protocol is an **anti-substitution** control. Disclosure, informed consent, and duress are separate problems — the AI diffing layer helps with comprehension, but the protocol itself should not be read as guaranteeing a "clean deal" in the broader sense.

```
✓ docusign.com/ledger/jd — Buyer's signing receipt (buyer's chosen cloud provider)
✓ riversideford.com/contracts — Dealer's countersignature
  ✓ fordcredit.com/contracts — Witnessed by lender (both hashes match)
```

### 6. Platform provider as additional witness (optional)

The counterparty's own platform (dealer management system, CRM, HR system) can also witness:

```
✓ cdk.com/contracts — Platform confirms version 5 was the final version
                       presented through its system
```

This prevents the counterparty from claiming "the system glitched" — their own platform provider has the record.

## The Append-Only Constraint

The session credential gives the counterparty **append-only** access to the signer's ledger, subject to the session scope rules described above. The key constraints:

- The counterparty can upload new versions, but each must chain from the current head (parent-hash linking)
- Each upload is pending until the signer explicitly accepts it
- The counterparty cannot delete previous versions (including rejected ones)
- The counterparty cannot modify previous versions
- The signer's system timestamps and hashes each upload on arrival
- The version history — including rejected uploads — is immutable from the counterparty's perspective
- One contract family per session; document type is fixed at session creation

This means the counterparty cannot retroactively clean up the negotiation trail. If they uploaded a version with a suspicious tax line, then uploaded a "corrected" version without it, both versions are in the signer's ledger (the first as rejected or accepted, the second as its successor). The AI agent can flag the pattern.

## Cloud Provider Ecosystem

### Storage and infrastructure

**Storage:** A few MB of PDFs and hashes per contract negotiation. Trivial for any cloud provider.

**AI agent:** On-device or cloud-based. Uses the phone's existing AI capabilities (Apple Intelligence, Google Gemini) or a third-party agent. The diffing is a text comparison task — not computationally expensive.

**Session credential:** A URL with a one-time token, displayable as a QR code. Standard web technology.

**Signing receipt:** A Live Verify plain text, verifiable through the standard clip flow.

**Export and portability:** The contract ledger is a collection of PDFs and hashes. Exporting to a different provider is a file copy plus DNS-level redirect or dual-hosting during transition. The protocol should include an easy offboarding specification so that provider lock-in does not become a barrier.

### Why Apple and Google would offer this natively

- Storage cost is negligible
- It positions the phone as a **legal companion**, not just a communication device
- It fits Apple's privacy narrative (your contracts live in your cloud)
- Default integration means zero-friction adoption for the majority of consumers who don't have a specialist provider
- The easy-offboarding pledge is important for regulatory acceptance

### Where DocuSign fits

DocuSign's current model is: the counterparty (dealer, employer, landlord) pays DocuSign, and the signer uses DocuSign's platform to sign. The system of record is DocuSign's, not the signer's.

This protocol inverts that relationship. The signer chooses the cloud provider. But DocuSign is well-positioned to become one of the signer's choices:

- They already have the brand recognition ("I'll keep my contracts in DocuSign")
- They already have the infrastructure for document storage and hashing
- They already have relationships with counterparties and financing institutions
- They could offer a free consumer tier (append-only contract ledger, signing receipts, basic diffing) and charge for premium features (AI-assisted negotiation review, multi-party witnessing, litigation-grade export)

The difference from today's DocuSign: the signer is the customer, not the counterparty. The signer's ledger is the system of record, not DocuSign's platform as controlled by the counterparty. DocuSign's incentive shifts from "serve the entity that pays us" to "serve the individual who trusts us with their contracts."

**The signature itself changes too.** Today's e-signature platforms present a drawn squiggle or a handwriting-font rendering of your name as "your signature." Courts have upheld these as legally binding under the ESIGN Act, eIDAS, and equivalent legislation. But binding is not the same as strong. A visual e-signature is trivially reproducible — it's an image that can be copied from one document to another. When disputed, the platform's audit trail (IP address, timestamp, email confirmation) does the real evidential work, not the visual.

With Live Verify, the signature *is* the verifiable claim. The act of signing is: "I issued a verifiable hash of this document from my legal signing provider (currently Google Sign, witnessed by mySilentWitness.com), timestamped, bound to my identity, authenticated by biometric on an enrolled device." The signing receipt names the provider, the witness, the document hash, and the authentication method. No cursive font, no finger-drawn squiggle. The receipt is the signature — cryptographically stronger, independently verifiable by anyone, witnessed by a third party the signer chose, and not forgeable by dragging a PNG of someone's handwriting onto a different document.

If DocuSign cooperates with this model, they would build around Live Verify signing receipts — not around the visual-signature ceremony that currently defines their UX. The ceremony is legacy comfort. The hash is the legal act.

For how signing receipts interact with courtroom evidence procedures — including witness verification using the signer's own phone, the court clerk's role, and the procedural adaptation needed — see [Evidentiary Procedure for Signing Receipts](./evidentiary-procedure-signing-receipts.md).

Other e-signature platforms (Adobe Sign, PandaDoc, HelloSign) could make the same move. So could cloud storage providers (Dropbox, OneDrive), banks (your bank already holds your financial life — why not your contracts?), or law firms offering contract custody as a service.

The protocol doesn't pick winners. It defines a standard ledger API. Providers compete on trust, convenience, AI features, and price.

## Attack Resistance

### The counterparty submits a different document to the lender

The lender has both signing receipts (buyer's and counterparty's). The submitted document's hash doesn't match → funding refused. This is the primary attack the protocol prevents.

### The counterparty forges the signer's signing receipt

The signing receipt verifies against the signer's chosen cloud provider (e.g., `docusign.com/ledger/jd`). The counterparty cannot publish hashes to the signer's provider domain.

### The signer loses their phone

The contract ledger lives in the cloud, not on the device. A replacement phone reconnects to the same cloud provider and the full ledger is restored. This is why the cloud provider — not the phone — is the system of record.

### The counterparty claims the signer agreed to changes after signing

The append-only ledger shows no version was uploaded after version 5. The signing receipt says "Version: 5 of 5 (final)." Any post-signing changes would require a new version upload, which the signer would see and their AI agent would flag.

### The counterparty refuses to use the protocol

The signer can still photograph or PDF each version manually, and the AI diffing layer still helps them understand what changed between versions. But the core anti-substitution guarantee — both parties' receipts matching at the lender's funding gate — does not work without counterparty participation. Manual capture gives the signer a personal evidence trail for later dispute, but it does not deliver the automatic funding-gate protection that the full protocol provides. There is no reliable paper-based or photo-based fallback that achieves the same guarantee. Counterparty participation is not optional for the protocol's primary value.

## Counterparty Cooperation

The protocol works best when the counterparty participates enthusiastically, not grudgingly. This means practical requirements:

### The signing environment must work

The counterparty's premises — the dealership finance office, the solicitor's meeting room, the letting agent's desk — must support the protocol:

- **Reliable wireless connectivity at the signing desk.** The buyer's phone needs to reach their cloud provider. A finance office in a cellular dead spot, or a building that blocks WiFi, defeats the protocol. The counterparty cannot plead "the system won't work here" as a reason to fall back to paper-only signing. If the dealership has connectivity for its own DMS and card terminals, it has connectivity for the buyer's phone.
- **Willingness to upload versions to the buyer's ledger.** The counterparty's system (DMS, CRM, contract management) needs an integration that uploads each contract version to the session credential the buyer presented. This is a software change for DMS vendors (Reynolds & Reynolds, CDK Global, etc.), not a hardware change for the dealership.
- **No pressure to skip the process.** "Let's just do it the quick way" or "the system is slow today, can we just sign on paper?" must not be accepted as reasons to bypass the protocol. The buyer's right to use the protocol should be treated the same way as their right to read the contract before signing.

### Why counterparties would cooperate

The Reddit Ford dealer case is instructive: the *honest* dealers are harmed by the dishonest ones. A fraud scandal damages the brand, triggers manufacturer investigations, and erodes consumer trust across the entire dealer network. Honest counterparties benefit from the protocol because:

- **It proves they didn't substitute.** The append-only ledger and matching hashes are evidence that the funded document is the one the signer agreed to.
- **Financing institutions prefer it.** If Ford Credit requires hash-matched funding submissions, dealers who can't produce them face funding delays. This is the strongest adoption lever — the money flows through the financing institution, and the financing institution sets the rules.
- **Manufacturer pressure.** Manufacturers care about brand reputation. A franchise agreement can require participation in the signing protocol as a condition of operating the dealership.
- **Regulatory mandate.** State attorneys general and consumer protection agencies could require the protocol for high-value consumer transactions (vehicle sales, mortgages, timeshares). This is a heavier lever but may be necessary for industries with persistent fraud patterns.

### The reluctant counterparty

If a counterparty refuses to participate or creates friction ("our WiFi is down," "our system doesn't support that," "we've never had to do this before"), that reluctance is itself informative. A buyer whose counterparty won't use the protocol should treat that as a signal — the same way a buyer would be concerned if a dealer refused to provide a written quote or insisted on cash-only payment.

### The signer's cloud account is compromised

Standard cloud security applies. Two-factor authentication, device-level encryption, etc. The signing receipts are also held by the counterparty and the financing institution, so the signer's own copy is not the only record.

## Comparison with Existing Systems

| | DocuSign / Adobe Sign | Counterparty's System (DMS, CRM) | Contract Exchange Protocol |
|:---|:---|:---|:---|
| **Who controls the record?** | E-signature platform | Counterparty | Signer |
| **Can counterparty submit different doc to lender?** | Yes (outside the platform) | Yes (they control the system) | No — lender has the hash from both parties |
| **Version history** | Only the signed version | Whatever the counterparty retains | All versions, append-only, in signer's cloud |
| **Real-time diffing** | No | No | Yes — AI agent on signer's phone |
| **Counterparty bypass** | Defeats the system | N/A | Lender rejects funding on hash mismatch |
| **Vendor lock-in** | E-signature platform | DMS vendor | Signer's choice of cloud provider (with export pledge) |
| **Cost to signer** | Free (counterparty pays) | N/A | Free (comes with phone) |
| **Works for paper-heavy industries?** | Poorly — requires digital workflow | Yes (but counterparty-controlled) | Yes — photo/PDF capture, then standard flow |

## Applicable Scenarios

The protocol applies wherever one party controls the paperwork and the other party needs to trust that what they signed is what gets submitted:

- **Vehicle leases and purchases** — dealer controls the finance paperwork
- **Mortgage closings** — lender or broker controls the closing documents
- **Rental agreements** — landlord or letting agent controls the lease
- **Employment contracts** — employer controls the offer and contract documents
- **Insurance policies** — insurer controls the policy wording
- **Settlement agreements** — the party with legal representation controls the drafting
- **Construction contracts** — contractor controls the scope and variation documents
- **B2B supply agreements** — the larger party typically controls the terms

## Relationship to Live Verify

The signing receipt is a standard Live Verify verifiable claim. It uses the same normalization, hashing, and verification flow as any other Live Verify document. The innovation is not in the verification mechanism but in:

1. **Who issues the signing receipt** — the signer, via their chosen cloud provider, not the counterparty or the counterparty's platform
2. **The append-only version ledger** — giving the signer an immutable negotiation history
3. **The AI diffing layer** — making version comparison accessible to non-specialists in real time
4. **The financing institution as witness** — automatic reconciliation at the point of funding

## Relationship to Witnessing

The financing institution's role follows the witnessing model described in [Witnessing and Third Parties](./WITNESSING-THIRD-PARTIES.md). The financing institution receives both signing receipts and can attest that both parties' document hashes matched at the time of funding. If either party later disputes which document was signed, the financing institution's witness record resolves the substitution question. (It does not resolve disputes about whether the signer understood the terms or was coerced — those are separate problems.)

The counterparty's platform provider (DMS vendor, CRM vendor) can serve as an additional witness, following the same pattern.

## Design Decisions

1. **No offline signing.** The protocol requires connectivity. The append-only ledger, parent-hash chaining, signer acceptance, and signing receipt publication all depend on the signer's cloud provider being reachable. Offline operation would open replay and fork risks: two offline parties could each believe a different "final" version is version 5, then sync later with no way to resolve the conflict. Rather than design a complex offline reconciliation protocol, the simpler answer is: if there's no connectivity, don't sign. This reinforces the counterparty cooperation requirement — the signing environment must have working wireless.

2. **Anti-substitution scope.** This protocol prevents document substitution — the counterparty submitting a different document to the lender than the one the signer signed. It does not guarantee informed consent, adequate disclosure, absence of duress, or suitability of terms. The AI diffing layer helps the signer understand what they're signing, but the protocol's core guarantee is narrower: "the funded document is the one you signed."

## Open Questions

1. **Session credential standard** — What format should the one-time upload token take? A URL with a bearer token? A QR code encoding an API endpoint? An NFC payload?

2. **PDF hashing determinism** — PDFs are not always byte-identical across generators. The protocol may need to specify whether the hash covers the PDF bytes, the extracted text, or a canonical representation. Text extraction + normalization (the existing Live Verify pipeline) is the most robust approach but loses layout information.

3. **Legal standing of the signing receipt** — In jurisdictions that require specific signature forms (wet ink, qualified electronic signature), how does the signing receipt interact with existing signature law? It may complement rather than replace existing signature requirements.

4. **Counterparty adoption** — The protocol is most valuable when the counterparty cooperates (uploading versions to the signer's ledger). How to incentivize adoption? Financing institutions requiring hash-matched funding submissions would be the strongest lever.

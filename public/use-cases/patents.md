---
title: "Patent Registrations"
category: "Intellectual Property Law"
type: "use-case"
volume: "Medium"
retention: "20 years (utility/plant), 15 years (design)"
slug: "patents"
tags: ["patent", "intellectual-property", "USPTO", "EPO", "invention"]
furtherDerivations: 1
---

<div style="max-width: 600px; margin: 24px auto; font-family: 'Times New Roman', Georgia, serif; border: 3px double #1a365d; background: #fffef5; padding: 0;">
  <div style="background: linear-gradient(to bottom, #1a365d, #2c5282); color: #d4af37; padding: 16px 20px; text-align: center;">
    <div style="font-size: 1.4em; font-weight: bold; letter-spacing: 4px; text-transform: uppercase;"><span verifiable-text="start" data-for="patent">[</span>Mesopotamian Patent Office</div>
    <div style="font-size: 0.85em; margin-top: 4px; color: #e2e8f0;">Uruk • Protecting Innovation Since 4500 BC</div>
  </div>
  <div style="padding: 24px 28px; text-align: center;">
    <div style="font-size: 1.1em; color: #666; margin-bottom: 8px;">LETTERS PATENT</div>
    <h2 style="font-size: 1.5em; margin: 0 0 16px 0; line-height: 1.3; color: #1a365d;">Mechanism for Facilitating Rotational Ground Transport</h2>
    <div style="font-size: 0.95em; color: #333; margin-bottom: 20px; text-align: left; line-height: 1.6;">
      <strong>Patent No:</strong> MES-4200-0001<br>
      <strong>Inventor:</strong> Gilgamesh of Uruk<br>
      <strong>Assignee:</strong> Sumerian Transport Industries<br>
      <strong>Filed:</strong> Spring Equinox, 4201 BC<br>
      <strong>Granted:</strong> Harvest Moon, 4200 BC<br>
      <strong>Type:</strong> Utility Patent
    </div>
    <div style="background: #f7fafc; border: 1px solid #cbd5e0; padding: 12px 16px; margin: 16px 0; font-size: 0.85em; text-align: left; font-family: 'Courier New', monospace;">
      <strong>Patent PDF SHA256:</strong><br>
      <span style="word-break: break-all; color: #555;">e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855</span><span verifiable-text="end" data-for="patent">]</span>
    </div>
    <div data-verify-line="patent" style="border-top: 1px dashed #999; margin-top: 16px; padding-top: 12px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555;"
      title="Demo only: USPTO doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:uspto.gov/verify
    </div>
  </div>
</div>

The certificate includes a SHA256 hash of the complete patent PDF (specification, claims, drawings). Verifiers should separately verify that hash against the actual PDF file—the OCR verification confirms the certificate text; the embedded hash links to the underlying document.

# Patent Registrations

## Data Verified

Patent number, title of invention, inventor name(s), assignee/owner (may differ from inventor), application date, issue date, patent type (utility, design, plant), jurisdiction, expiration date, maintenance fee status.

**For the full patent document:** The certificate should include the SHA256 hash of the complete patent PDF (specification, claims, drawings), binding the registration to the exact granted document.

**Document Types:**
- **Patent Grants** — Official certificates of patent issuance
- **Assignment Records** — Ownership transfers (inventor → company, sale, etc.)
- **Maintenance Fee Receipts** — Proof of annuity/maintenance payment
- **International Patents** — PCT applications, national phase entries
- **Continuation/Divisional** — Related patent family documents

## Data Visible After Verification

**Status Lifecycle for a Filing Hash**

The same hash record progresses through states:

```
FILED → PUBLISHED BUT NOT NECESSARILY GRANTED → GRANTED → VALID → EXPIRED
                                              ↘ ABANDONED
                                              ↘ SUPERSEDED (if amended)
```

- **FILED** — Application submitted, under examination (secret period). No URL—not yet public.
- **PUBLISHED BUT NOT NECESSARILY GRANTED** — 18-month publication. Application is public but may never grant. URL: published application
- **GRANTED** — Patent issued (if claims unchanged from filing). URL: granted patent
- **SUPERSEDED** — Claims were amended during prosecution; this hash is historical. No URL, no new hash (verifier doesn't have amended plaintext anyway). Just indicates "amended version exists."
- **ABANDONED** — Applicant stopped pursuing. URL: published application (if reached 18 months)
- **VALID** — Granted patent in force, maintenance fees current. URL: granted patent
- **LAPSED** — Maintenance fees unpaid, but may be revivable. URL: granted patent
- **EXPIRED** — Term ended. URL: granted patent
- **INVALIDATED** — Struck down by court or patent office (IPR, PGR, litigation). URL: granted patent + URL to invalidation decision

**Note:** Amendments during prosecution create new hashes. The original filing hash becomes SUPERSEDED, pointing to the amended version. The granted patent hash may differ from the filing hash if claims changed.

**Why explicit warnings matter:** Inventors seeking investment sometimes misrepresent "patent pending" or "published application" as having a granted patent. The verification app should make status unmistakably clear—investors scanning a certificate should immediately see whether they're looking at a granted patent or just an application.

**Why no "Rejected" status?**

Patent applications remain secret during examination. When an examiner rejects claims, the applicant typically:
1. Amends claims and responds (iterative process)
2. Files a continuation with refined claims (new application, new hash)
3. Abandons the application (gives up)

"Rejection" is part of prosecution, not a final status. Applications either eventually grant or get abandoned. Abandoned applications become public 18 months after filing but aren't "rejected"—the applicant simply stopped pursuing them.

**Pending applications and publication timing**

Two separate publication events:

1. **Application publication (18 months):** Most utility applications publish 18 months after filing, regardless of examination status. The application is now public but not yet granted.

2. **Grant publication (issue date):** When approved, patents publish electronically on the issue date itself (since 2023, same-day electronic issuance). There's a gap between Notice of Allowance and grant while the applicant pays the issue fee.

**Exception:** Design patents remain secret until grant—no 18-month publication. They publish only when issued.

During the secret period (before 18-month publication), verification can only confirm "a hash exists with this timestamp" (via blockchain anchoring)—not the content.

## Second-Party Use

The patent holder or applicant benefits from verification.

**Inventor verification:** Confirming patent grant is genuine before licensing discussions. The certificate proves the patent office actually issued this grant with these claims.

**Assignment confirmation:** Verifying ownership transfer documents before corporate transactions. Chain of title from inventor to current owner is cryptographically verifiable.

**Portfolio valuation:** Patent holder confirming validity for M&A due diligence. Acquirers can independently verify each patent in a portfolio.

**Priority date defense:** When competitors challenge filing dates, blockchain-anchored timestamps prove the application existed at the claimed date—independent of any single nation's patent office records.

**Amendment history:** Proving claim scope wasn't altered after the fact. The timestamped audit trail shows exactly what was filed and when amendments occurred.

**Trade secret timing:** Companies establishing prior art dates for internal research without revealing details. If a competitor later patents something similar, the timestamped hash proves earlier work.

**Verifying your own patent agent**

Patent agents/attorneys represent inventors during prosecution, but inventors must trust their agent's claims:
- "I filed your application last week"
- "I responded to the office action on time"
- "I paid the maintenance fees"
- "The examiner rejected claims 3-7"

Agents can be lazy, slow, or dishonest. Inventors often discover problems only when it's too late—a lapsed patent, a missed deadline, an abandoned application.

With verification:
- **Filing confirmation:** Inventor receives timestamped proof the application was actually submitted (not just "I'll file it Monday")
- **Office action responses:** Verified receipts prove responses were submitted before deadlines
- **Fee payment proof:** Maintenance fee receipts verify the agent actually paid, not just invoiced the client
- **Prosecution history:** Inventor can independently verify what their agent submitted vs. what they claim

This shifts the trust model from "believe your agent" to "verify your agent"—particularly valuable for independent inventors without in-house IP counsel.

## Third-Party Use

**Licensing negotiations**

Potential licensees verifying patent validity before signing agreements:
- Confirm the patent actually exists and is in force
- Verify the licensor is the actual owner (assignment chain)
- Check that claims match what's being licensed

**Litigation support**

Courts and legal teams in patent disputes:
- Verify patent status in infringement cases
- Confirm filing dates in priority disputes between adversarial nations
- Audit amendment history to see if claims were narrowed during prosecution
- Access rejected applications to understand claim scope limitations

**Investment due diligence**

VCs and acquirers verifying IP portfolio claims:
- Independently verify each patent's existence and status
- Confirm ownership without relying solely on company representations
- Assess portfolio strength before acquisition

**Freedom-to-operate analysis**

Companies assessing risk before product launch:
- Verify competitor patent status and expiration dates
- Check if patents cited in cease-and-desist letters are actually valid
- Confirm claim scope matches alleged infringement

**Standards bodies**

Organizations developing technical standards:
- Verify patent encumbrances on proposed standards
- Confirm FRAND (fair, reasonable, non-discriminatory) commitment authenticity
- Track patent declarations against actual granted claims

**Academic researchers**

Studying patent systems and innovation:
- Access verified rejected applications (previously hidden)
- Analyze amendment patterns across jurisdictions
- Compare filing date claims across adversarial patent offices

## Verification Architecture

**The Patent Fraud Problem**

- Fake patent certificates claiming inventions never granted
- Altered assignee names to claim false ownership
- Expired patents presented as in-force
- Fabricated continuation chains
- Maintenance fee lapses hidden
- Claim scope disputes (which version of claims was granted?)

**Honest assessment:** Many of these can already be checked via public databases. Google Patents, USPTO's PatFT/AppFT, Espacenet, and WIPO's PatentScope allow searching by patent number, assignee, and status. A diligent party can manually verify most claims.

OCR verification adds value for:
- **Instant verification** without manual database lookup
- **Physical document authentication** (the paper you're holding matches official records)
- **Non-expert verification** (parties who don't know which databases to check)
- **Jurisdictions with less accessible databases** (not all patent offices have Google-quality search)
- **Historical records** where databases may be incomplete
- **Timestamp anchoring** (blockchain proofs that databases can't provide)

**Patent Document Binding**

The certificate should include:

```
Patent PDF SHA256: a1b2c3d4e5f6...
```

This binds to the exact granted document—specification, claims, and drawings. Prevents disputes over claim amendments during prosecution or post-grant proceedings.

**Patent Offices as Issuers**

- USPTO (United States)
- EPO (European Patent Office)
- JPO (Japan), KIPO (Korea), CNIPA (China)
- WIPO (PCT international applications)
- National patent offices worldwide

**Integration:** Patent databases (Espacenet, Google Patents) could cross-reference verification endpoints.

## Priority Date Timestamping

Patent applications remain secret during examination (typically 18 months). This creates a different problem than verification: proving when an application was filed without revealing its contents.

**The Backdating Problem**

Between adversarial patent-issuing nations, there's no trusted arbiter for filing dates. A nation could theoretically backdate applications to claim priority over foreign filings. "We filed this on January 1st" is unverifiable if their patent office controls the records.

**Blockchain Hash Anchoring**

At time of filing, the patent office publishes the SHA256 hash of the encrypted application to an energy-efficient, non-speculative public blockchain:

```
Filing Date: 2025-03-15T09:23:47Z
Application Hash: 7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069
Blockchain: [tx reference]
```

This proves:
- The application existed at that timestamp
- The contents haven't changed since filing
- No single nation controls the timestamp record

**Staged disclosure:** Applications stored encrypted; decryption keys revealed only upon final determination (approval or rejection). Both granted patents AND rejected applications become publicly verifiable—increasing transparency.

**Modification tracking:** Any amendments during prosecution create additional timestamped ledger entries, providing an immutable audit trail of claim changes.

**Requirements for the blockchain:**
- Energy-efficient (proof-of-stake or similar, not proof-of-work)
- Non-speculative (utility token, not investment vehicle)
- Immutable and publicly auditable
- Geopolitically neutral governance

**Corporate use:** Companies can also register research hashes to establish intellectual property priority without revealing proprietary details—protecting trade secrets while securing prior art claims against future patent disputes.

This is complementary to OCR verification—timestamping proves *when*, verification proves *authenticity*.

**Prior art:** [Blockchains for Patent Filing](https://paulhammant.com/2016/11/02/blockchains-for-patent-filing/) (Paul Hammant, 2016)


## Jurisdictional Witnessing

A jurisdiction may require the issuer to retain a **witnessing firm** for regulatory compliance. The witnessing firm:

- Receives all hashes from the issuer, and any subsequent changes to the payload as they happen—which may manifest as a new hash, a status change, or even a 404 (record deleted)
- Receives structured content/metadata (key identifiers and dates)
- Does **NOT** receive plaintext or sensitive personal information
- Provides an immutable, timestamped audit trail—available to the jurisdiction on demand, to document holders/third parties during disputes, or as expert witness testimony in legal proceedings

This provides:
- **Non-repudiation:** Issuer cannot deny issuing the document
- **Timestamp proof:** Document existed at a specific time
- **Regulatory audit:** Jurisdictions can inspect the witness ledger for fraud detection
- **Resilience:** Verification works even if issuer's systems go down

**Jurisdictional Requirements (International/Cross-Border)**

Documents crossing national borders require multi-jurisdictional witnessing:

**Treaty Partners:** When documents are shared between treaty partners (e.g., US-EU, Canada-US), witnessing firms must:
- Be located in neutral jurisdictions recognizable to both parties
- Comply with both nations' discovery/transparency requirements
- Maintain audit trails accessible to both tax/regulatory authorities

**Non-Treaty Jurisdictions:** For documents involving non-OECD nations or jurisdictions with weak international cooperation frameworks:
- Use witnesses from OECD member states
- Deploy blockchain rollups to public ledgers (e.g., Ethereum) for immutable proof
- Consider additional apostille/certification requirements under the Hague Apostille Convention

**Public Blockchain (Non-Party)**

Witnessing firms may periodically commit rollups to an inexpensive public blockchain, providing an ultimate immutability guarantee. The blockchain is a "non-party"—infrastructure, not a participant in the transaction. This creates multiple verification paths:

1. **Issuer domain** — Direct check against the issuer
2. **Witnessing firm** — Independent confirmation with timestamp
3. **Public blockchain** — Decentralized trust anchor via rollup inclusion

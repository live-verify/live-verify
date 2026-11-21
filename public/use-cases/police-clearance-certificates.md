---
title: "Police Clearance Certificates"
category: "Government & Civic Documents"
volume: "Large"
retention: "6-12 months (validity period) + immigration file retention"
slug: "police-clearance-certificates"
verificationMode: "clip"
tags: ["police-clearance", "criminal-record-check", "good-conduct", "immigration", "visa", "background-check", "interpol", "acro", "fbi"]
furtherDerivations: 1
---

## What is a Police Clearance Certificate?

You're a British citizen applying for permanent residence in Australia. Immigration requires a police clearance certificate from every country you've lived in for 12+ months in the past 10 years. You lived in the UK, France, and the UAE. You need three separate certificates — from ACRO (UK), the Casier Judiciaire (France), and Dubai Police. Each takes weeks to obtain, arrives in a different format, in a different language, and the Australian immigration officer has no way to verify any of them. Are they real? Are they current? Did you alter the French one to remove a conviction?

Police clearance certificates are one of the most commonly required documents in international immigration — and one of the least verifiable. They're issued by national police forces, arrive as paper or PDF, and the receiving country's immigration authority often has no practical way to confirm authenticity without bilateral law enforcement cooperation, direct issuer contact, or country-specific portals that are not built for foreign routine use.

This is therefore a stronger portability case than most government-ID documents. The certificate is routinely exchanged outside the issuing authority's native system, and the receiving authority is often in another country altogether.

<div style="max-width: 520px; margin: 24px auto; font-family: sans-serif; border: 1px solid #999; background: #fff; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.15);">
  <div style="background: #1a2744; color: #fff; padding: 18px 20px; display: flex; align-items: center; justify-content: space-between;">
    <div>
      <div style="font-weight: bold; font-size: 1.1em; letter-spacing: 0.5px;"><span verifiable-text="start" data-for="pcc"></span>ACRO CRIMINAL RECORDS OFFICE</div>
      <div style="font-size: 0.8em; opacity: 0.85; margin-top: 2px;">Police Clearance Certificate</div>
    </div>
    <div style="width: 46px; height: 46px; background: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #1a2744; font-weight: bold; font-size: 0.55em; text-align: center; line-height: 1.2;">UK<br>POLICE</div>
  </div>
  <div style="padding: 20px; font-size: 0.9em; line-height: 1.6; color: #222;">
    <div style="margin-bottom: 12px;">
      <strong>Issuing Authority:</strong> ACRO Criminal Records Office<br>
      <strong>Country:</strong> United Kingdom
    </div>
    <div style="margin-bottom: 12px;">
      <strong>Applicant:</strong> DAVIES, OWEN RHYS<br>
      <strong>Date of Birth:</strong> 14 March 1988<br>
      <strong>Nationalities:</strong> British
    </div>
    <div style="margin-bottom: 12px;">
      <strong>Reference:</strong> ACRO/2026/PCC-441827<br>
      <strong>Date Issued:</strong> 12 January 2026<br>
      <strong>Valid Until:</strong> 12 July 2026
    </div>
    <div style="padding: 10px; background: #f0f7f0; border: 1px solid #b5d8b5; text-align: center; font-weight: bold; color: #1a6b1a; margin-bottom: 12px;">
      Result: No trace of any criminal convictions
    </div>
  </div>
  <div style="padding: 0 20px 20px 20px;">
    <div style="font-size: 0.8em; font-weight: bold; color: #1a2744; text-align: center; margin-bottom: 5px;">UNITED KINGDOM</div>
    <div data-verify-line="pcc" style="border-top: 1px dashed #999; padding-top: 5px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
      title="Demo only: ACRO doesn't yet offer verification endpoints, so this is illustrative">
      <span data-verify-line="pcc">verify:acro.police.uk/pcc/v</span> <span verifiable-text="end" data-for="pcc"></span>
    </div>
  </div>
</div>

## The Problem: Police Clearance Fraud

- **Forged certificates** — The most common fraud. Fabricated certificates from countries the immigration officer can't verify. A convincing letterhead, a plausible reference number, and a stamp — that's all it takes when the officer has never seen a genuine certificate from that country.
- **Altered results** — Changing "convictions found" to "no convictions" on a genuine certificate. A single word change that's invisible without verification.
- **Certificates from countries with no verification infrastructure** — Some developing nations issue certificates that are effectively unverifiable. The receiving authority must trust the paper because there's no alternative.
- **Identity substitution** — Obtaining a certificate in someone else's name. Particularly easy in countries where identity verification at the police office is weak.
- **Expired certificates presented as current** — A conviction occurred after the certificate was issued, but the applicant presents the old certificate showing a clean record.
- **The multilingual problem** — Certificates arrive in French, Arabic, Portuguese, Mandarin. The immigration officer often can't even read them, let alone verify them. Live Verify bypasses the language barrier entirely — the hash is language-agnostic. The French certificate and the English certificate produce different hashes, but both resolve to the same issuing authority's domain. The verification response is what matters, not whether the officer can read the document.

## What Is Checked

Applicant name, date of birth, nationality/nationalities, issuing authority, country, reference number, date issued, validity period, result (no convictions / convictions found — but NOT the details of any convictions, which are in the full disclosure version).

**Document Types:**
- **Standard Police Clearance** — States whether the applicant has convictions (yes/no). Does not detail them.
- **Enhanced/Full Disclosure** — Lists actual convictions, cautions, spent/unspent (UK DBS equivalent). More sensitive, higher privacy requirements.
- **Subject Access Certificate** — Issued to the individual themselves (GDPR/data protection right).
- **Apostilled Police Clearance** — Standard certificate with Hague Apostille for international use.

## Verification Response

The endpoint returns a status code:

- **CLEAR** — No criminal record found for this person
- **CONVICTIONS** — Record found (details not returned in verification response — see full disclosure)
- **EXPIRED** — Certificate validity period has passed; a fresh one is needed
- **PENDING** — Application received, certificate not yet issued
- **404** — No matching record; possible forgery

The issuer domain is visible from the `verify:` line on the certificate itself (e.g., `acro.police.uk`).

## Who Holds It

The Applicant (second party) benefits from verification.

**Immigration Applications:** Presenting to immigration authorities is the primary use. The applicant obtains certificates from every country they've lived in and presents them as part of a visa or residency application. A verified certificate removes the receiving officer's doubt instantly — no phone calls to foreign police forces, no waiting for bilateral confirmation.

**Foreign Employment:** Presenting to foreign employers who require background checks for international hires. A verified certificate from ACRO or the FBI carries the same weight whether the employer is in London, Dubai, or Singapore.

**Adoption Applications:** International adoption requires clearance from every country the applicant has lived in. Agencies can verify each certificate against the issuing authority's domain.

**Professional Licensing:** Medical, legal, and financial professionals seeking registration in foreign countries. Licensing bodies can verify the certificate without contacting a foreign police force they have no relationship with.

**University Enrollment:** International programs requiring clearance as a condition of admission.

## Who Checks It

**Immigration Authorities (Primary Verifier)**
Every visa and residency application worldwide requires police clearance from the applicant's countries of residence. This is the highest-volume use. An Australian immigration officer processing 50 applications a day, each with 2-3 certificates from different countries, can verify all of them in seconds instead of filing them as "unable to verify" and hoping for the best.

**Foreign Employers**
Pre-employment background checks for international hires. A company in Singapore hiring a software engineer who lived in Brazil, Germany, and the UK needs three certificates — and currently has no way to verify any of them.

**Adoption Agencies**
International adoption requires clearance from every country the applicant has lived in. Agencies are currently dependent on apostilles and notarized translations, neither of which proves the content is real.

**Professional Licensing Bodies**
Medical, legal, and financial regulators in foreign countries. A doctor trained in India applying for registration in the UK must provide police clearance. The General Medical Council currently has no way to verify an Indian police certificate.

**International Schools**
Teacher hiring across borders. Schools in the UAE, Singapore, and Hong Kong hire teachers from dozens of countries — each teacher needs clearance from every country they've worked in.

**Volunteer Organizations**
Safeguarding checks for international volunteers. NGOs sending volunteers to work with children in developing countries need clearance from the volunteer's home country.

**Consulates**
Visa processing. Consular officers process police clearance certificates daily and have no practical verification mechanism for most of them.

## Who Issues It

**Issuer Types** (First Party)

National police forces and criminal records authorities are the sole issuers. Each country's authority is the root for its own criminal records:
- **ACRO** (UK) — acro.police.uk
- **FBI** (US) — fbi.gov
- **Casier Judiciaire** (France) — casier-judiciaire.justice.gouv.fr
- **BKA** (Germany) — bka.de
- **Australian Federal Police** (Australia) — afp.gov.au
- **RCMP** (Canada) — rcmp-grc.gc.ca
- **Dubai Police** (UAE) — dubaipolice.gov.ae

## Privacy Salt

Critical. Criminal record data is among the most sensitive personal data. In many jurisdictions (UK Rehabilitation of Offenders Act, EU GDPR), spent convictions have legal protections against disclosure. The hash MUST be salted to prevent enumeration of who has been checked and what the results were. Without salt, an attacker who knows a person's name and date of birth could guess-and-check to determine whether they have a criminal record — a direct violation of rehabilitation-of-offenders protections in most jurisdictions.

## Authority Chain

**Pattern:** Sovereign

Each country's police/criminal records authority is sovereign — the chain terminates at the national government. There is no supranational police clearance authority; Interpol coordinates but does not issue certificates.

UK (ACRO → Home Office → gov.uk):

```
✓ acro.police.uk/pcc/v — Issues UK police clearance certificates
  ✓ gov.uk/verifiers — UK government root namespace
```

US (FBI → usa.gov):

```
✓ fbi.gov/background-checks/v — Issues US criminal background checks
  ✓ usa.gov/verifiers — US federal government root namespace
```

France (Casier Judiciaire → gouv.fr):

```
✓ casier-judiciaire.justice.gouv.fr/v — Délivre les extraits de casier judiciaire (issues criminal record extracts)
  ✓ gouv.fr — Portail du gouvernement français (French government root namespace)
```

Germany (BKA → bund.de):

```
✓ bka.de/fuehrungszeugnis/v — Stellt polizeiliche Führungszeugnisse aus (issues police clearance certificates)
  ✓ bund.de — Bundesregierung (German federal government root namespace)
```

Australia (AFP → gov.au):

```
✓ afp.gov.au/police-checks/v — Issues Australian police clearance certificates
  ✓ gov.au — Australian government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Where Each Fits: Live Verify and Existing Ways of Checking Police Clearance

Police clearance certificates are issued by national or regional police authorities, and each country has its own. An immigration officer, employer or adoption agency abroad can today rely on bilateral law-enforcement requests, Interpol channels, an apostille, or the paper itself. Coverage depends on where you are: bilateral arrangements exist between some countries and not others, Interpol channels are open only to law enforcement, and apostilles only between countries party to the Hague Convention. These answer different questions from Live Verify and work side by side.

| | Bilateral law-enforcement request | Interpol channels | Apostille | Live Verify on the certificate | Trusting the paper |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Who can check** | Governments with an agreement. | Law enforcement only. | Any authority in a member country. | Anyone handed the certificate: an immigration officer, an employer, an adoption agency. | Anyone, by eye. |
| **What the checker gets** | A full record exchange, when it happens. | Information shared between police forces. | Confirmation that the signing official is genuine; not a check of the content. | Confirmation that the issuing authority issued this exact certificate, as at its date, and whether it has been withdrawn. | The document as presented, perhaps in a language the officer cannot read. |
| **What the applicant shares** | Consent, where required. | Nothing directly. | The certificate with its apostille. | Only the certificate they chose to hand over. | The certificate. |
| **Reach** | Only between countries with an agreement. | Interpol's member countries, for police use. | Countries party to the Hague Convention. | Global in principle: any police authority, in any country, that publishes hashes on its own domain. | Every country issues paper. |
| **Speed and cost** | Months; reserved for serious cases. | Days to weeks. | Days to obtain, with a fee. | A few seconds per check: one web lookup, with no fee to the standard. | Immediate. |
| **What it needs** | A bilateral agreement and a formal request. | Law-enforcement standing. | An application to the designated authority. | The issuing authority to publish hashes, and Live Verify-aware software on the checker's device. No police authority does this yet. | Nothing. |
| **Best suited to** | Serious cases needing the underlying record. | Police investigations. | Formal recognition where it is required. | Routine, high-volume checks of the certificate itself. | Nothing where safety matters. |

**Where each fits:** The default for most immigration authorities is still to trust the paper. Bilateral channels are too slow for routine processing, Interpol channels are closed to caseworkers, and an apostille confirms a signature, not the content. Live Verify fills the routine gap by letting the certificate itself be checked against the issuing authority's domain; the formal channels remain for serious cases and the apostille wherever it is required.

## Further Derivations

1. **Interpol notices and diffusions** — International law enforcement alerts (Red Notices, Blue Notices) — verification that a notice is real or that a claimed "Interpol clearance" is genuine. Currently, anyone can fabricate a letter claiming Interpol has cleared them. A verify line bound to `interpol.int` would settle it instantly.
2. **Safeguarding/vulnerable person checks** — DBS in the UK, Working with Children Check in Australia — enhanced background checks for people working with children or vulnerable adults. Higher sensitivity, stricter privacy requirements, but the same verification pattern: scan, hash, check against the issuing authority's domain.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).

---
title: "Service of Process & Legal Document Authenticity"
category: "Legal & Court Documents"
volume: "Large"
retention: "Life of the case + appeal periods"
slug: "service-of-process-verification"
verificationMode: "both"
tags: ["service-of-process", "summons", "subpoena", "court", "legal-document", "evidence-of-receipt", "anti-scam", "tx-receipt", "messaging-delivery"]
furtherDerivations: 1
---

## The Problem

A summons lands on your phone by RCS, or in your inbox, or face-down on your doormat. It says you are being sued, or subpoenaed, or evicted. It carries a case number, a court name, a deadline, and a threat: respond within 21 days or a default judgment will be entered against you.

Two things are wrong here at once, and they point in opposite directions.

First, the document might be **fake**. "You've been served — pay this debt now or a warrant issues" is a standard scam template. Fraudsters mimic court letterhead, invent case numbers, and spoof a clerk's signature. The frightened recipient pays, or hands over personal details, or wires money to "settle" a lawsuit that never existed. The recipient has no way to tell a genuine summons from a forged one, because every signal on the page — the seal, the font, the legalese — can be copied.

Second, the document might be **real**, and the recipient needs to know that too, because ignoring a genuine summons is how default judgments happen. The person who assumes "this is just a scam" and deletes it can lose the case by not showing up.

A recipient holding a scary legal document needs one answer before they panic, pay, or ignore it: **is this genuinely from the court that it names?**

## What Live Verify does — and the line it must not cross

Live Verify binds the summons text to the issuing court's official domain. The recipient taps **Verify**; the app normalizes the text, hashes it, and performs a GET against the court's `.gov` (or national equivalent) endpoint. A match confirms the document is genuinely the one the court issued, unaltered. A 404 means the text does not match anything the court issued — forged, altered, or mistyped.

That is the strong, defensible claim: **authenticity**. Is this summons real?

There is a second, weaker signal that is genuinely useful but must be described carefully. The verification GET is logged by the court's server: a device possessing the exact summons text contacted the endpoint at a specific time. That log — plus the `tx` receipt the recipient's device keeps — is **corroborating evidence that the document was authentic and was seen**.

It is **not** proof of legal service.

Service of process is a formal legal act with strict jurisdictional requirements — personal delivery by an authorized server, certified mail, or publication, depending on the rule and the jurisdiction. A GET request to a verification endpoint satisfies **none** of those requirements. Live Verify is an authenticity layer that *augments* existing service methods. It does not replace process servers, and verifying a summons does not constitute legal service. The honest framing is laid out in [Limitations](#limitations--not-a-substitute-for-formal-service) below, and it is the most important section in this document.

This is distinct from [Appointment & Summons Confirmations](view.html?doc=appointment-summons-confirmations), which is about an employer confirming that an appointment or jury date is real so as to grant an absence. This use case is about the **authenticity of the legal document itself** and the **evidence-of-receipt signal** that the act of verifying produces.

## What gets verified

The exact, normalized text of the served document: court name and jurisdiction, case number, named parties, the nature of the action (summons, subpoena, eviction notice, demand), any hearing or response deadline, and the issuing clerk. A low-entropy line — names and dates are guessable — is anchored by an issuer-generated random salt printed on the document, so an attacker cannot guess-and-hash their way to a match.

## Example

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #1a5f2a; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <span verifiable-text="start" data-for="summons"></span>
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;">SUMMONS — CIVIL ACTION

Superior Court of Arizona, Maricopa County
Case No:   CV-2026-03892

PLAINTIFF:  RIVERSIDE LENDING LLC
DEFENDANT:  MARCUS T. ELLISON

YOU ARE HEREBY SUMMONED and required to file
a written response within 21 calendar days.
Failure to respond may result in a DEFAULT
JUDGMENT being entered against you.

First hearing:  14 September 2026, 9:00 AM
Courtroom:      Old Courthouse, Room 412

Issued by:  T. Navarro, Clerk of the Superior Court
Issued on:  21 June 2026
Salt:       7QF2-MXK9-3RBD-1WPA
<span data-verify-line="summons">verify:courts.example.gov/v</span></pre>
  <span verifiable-text="end" data-for="summons"></span>
</div>

The recipient who got this by RCS taps Verify. The court's endpoint confirms the case number, parties, deadline, and salt all match the document the clerk issued — and the lookup is logged at the moment it happens.

## Data Verified

Court name and jurisdiction, case number, plaintiff and defendant names, document type, response deadline and hearing date, issuing clerk, and the random salt. The endpoint never echoes any of this back (the recipient already holds the document) — it returns only a status and, optionally, a `tx` receipt.

## Data Visible After Verification

The endpoint returns a status code:

- **VERIFIED / AUTHENTIC** — The document is genuinely the one the court issued, unaltered, as of its stated date. (Authentic is not the same as still-in-force — see below.)
- **AMENDED** — A corrected or superseded version of this document has been issued; the version in hand is outdated. Obtain the current one.
- **WITHDRAWN / QUASHED** — The summons or subpoena has been withdrawn by the issuing party, or quashed by the court. It no longer compels anything.
- **404** — No matching record. Told plainly: this text does not match anything the court issued. Most often a forgery or a scam letter; occasionally an OCR mistake (reposition and rescan) or a typo when transcribed from paper.

The 404 is the anti-scam payload. A "you've been sued, pay now" letter that names a real court will not produce a match at that court's domain — and the recipient sees a red NOT FOUND rather than a green VERIFIED.

## The evidence-of-receipt layer

When the recipient verifies, the court's response may include a `tx` object — a transaction record / receipt of the verification event that the recipient's device retains. See [Verification Response Format](../../docs/Verification-Response-Format.md) (the `tx` object — `id`, `timestamp`, `hashVerified`, `issuerDomain`).

```json
{
  "status": "verified",
  "tx": {
    "id": "VTX-2026-06-21-09h-4r7t2k",
    "timestamp": "2026-06-21T09:14:22Z",
    "hashVerified": "a7f3b2c9d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1",
    "issuerDomain": "courts.example.gov"
  }
}
```

This creates a **dual record**: the court's server log holds one half (the hash was looked up at this time), and the recipient's device holds the other (the `tx` receipt). The court may also set the retention headers described in [Pattern 4 of the response format](../../docs/Verification-Response-Format.md#post-verification-actions) — `X-Verify-Retain-Until`, `X-Verify-Retain-Reason: service-of-process`, `X-Verify-Case-Ref` — so the recipient's app preserves the result for the life of the case and links to a "why am I being asked to keep this?" page on the court's domain.

**What the `tx` receipt is:** corroborating evidence that a device possessing the exact summons text contacted the court's endpoint at a specific time — i.e., that an authentic document existed and was engaged with. It is analogous to a signed-for delivery receipt: a strong, timestamped, rebuttable signal.

**What the `tx` receipt is not:** it is **not** proof of legal service, and it is not proof the named recipient personally read or understood the document. A flatmate could have opened the RCS. Software could have auto-verified. The recipient could have been incapacitated. It corroborates; it does not prove service.

## Limitations — not a substitute for formal service

This section is non-negotiable, and it is the reason this use case is framed narrowly.

Service of process is governed by formal rules — the Federal Rules of Civil Procedure, state rules of civil procedure, and their equivalents in other jurisdictions. Those rules specify *how* a defendant must be served for a court to have jurisdiction over them: personal delivery by an authorized process server or officer, substituted service, certified or registered mail, or service by publication. Each carries its own proof requirement — typically an **affidavit of service** sworn by the server.

A GET request to a verification endpoint satisfies **none** of these requirements. It is not personal delivery. It is not certified mail. It is not publication. A court will not accept "the defendant's phone verified the summons" as proof that service was properly effected.

Therefore:

- Live Verify **does not replace process servers** and **does not constitute legal service**.
- Verifying a document **does not** start, satisfy, or substitute for the formal act of service.
- The `tx` receipt and the court's server log are **corroborating evidence** — a point of evidence about authenticity and receipt — **not legal proof of service**. They augment the affidavit of service; they do not replace it.

Where this evidence *does* help: a court weighing whether a defendant had actual notice (e.g., when formal service is disputed or when the defendant claims they never saw the document) may consider a verification record as one corroborating signal among many. It is rebuttable, and it is weighed alongside the affidavit and other evidence — never instead of them.

## Second-Party Use

The **recipient** is the party this use case most directly protects.

**Defeating fake-summons scams.** The recipient receives an alarming legal document — by RCS, email, or paper — demanding immediate payment or personal information. Before panicking, paying, or surrendering details, they verify. A genuine court summons returns VERIFIED against that court's own domain; a scam letter returns 404. The single most valuable moment in this entire use case is the frightened recipient discovering, in five seconds, that the "lawsuit" is fake.

**Confirming a real document is real.** The mirror case: the recipient who assumes "this must be a scam" and is about to ignore it. Verification returning VERIFIED tells them the deadline is real and they must respond — preventing a default judgment caused by mistaken dismissal.

**Checking current status.** A subpoena the recipient received last month may have been quashed. Re-verifying returns WITHDRAWN / QUASHED, so they don't comply with a document that no longer compels anything.

## Third-Party Use

**Courts (augmented, not replaced).** Courts continue to issue documents and rely on formal service. Live Verify adds an authenticity layer on top: it cuts the volume of frantic clerk's-office calls from recipients asking "is this real?", and the verification log gives the court a corroborating receipt-of-engagement signal that augments — never replaces — the affidavit of service.

**Process servers (augmented, not replaced).** The process server's affidavit remains the legal proof of service. The verification record sits alongside it as additional corroboration that the exact document delivered was authentic and was engaged with. The server's job is unchanged; their evidence file is stronger.

**Defendants disputing a matter.** A defendant who genuinely never received proper service can point to the absence of any verification record as one (rebuttable) signal supporting their position — just as a defendant who did verify cannot easily claim total ignorance of the document's contents.

## Verification Architecture

**The fake-legal-document problem**

- **Phantom-debt scams:** A letter naming a real court and a real-looking case number demands payment to "settle" a non-existent suit. Verification at the court's domain returns 404.
- **Altered deadlines or amounts:** A genuine document is edited — the response deadline shortened, the demanded sum inflated, the parties changed. The altered text no longer hashes to the issued document; 404.
- **Spoofed clerk signatures and seals:** Copied letterhead and a forged clerk signature carry no weight, because the binding is to the court's domain, not to the appearance of the page.
- **Recycled documents:** An old, since-resolved summons re-sent to apply pressure. Re-verification returns AMENDED or WITHDRAWN / QUASHED rather than VERIFIED.

**Issuer types (First Party):** State court systems, federal courts, and their clerks of court — the bodies with authority to issue summonses, subpoenas, and orders, operating verification endpoints bound to their official `.gov` (or national equivalent) domains.

## Privacy Salt

Recommended. Case numbers and party names are low-entropy and partly matters of public record, so without a salt an attacker could hash plausible name-and-case combinations to confirm whether a given person has been sued. The issuer-generated random salt printed on the document (the `Salt:` line in the mockup) blocks guess-and-hash confirmation attacks. The endpoint never echoes content, so verification confirms authenticity without disclosing the case details to anyone who merely sees the response.

## Authority Chain

**Pattern:** Sovereign

A court issues summonses and subpoenas under the authority of the jurisdiction's rules of civil and criminal procedure, established by statute. The chain terminates at the sovereign court system — no higher body attests a court's authority to issue process; the legislature establishes it.

```
✓ courts.example.gov/v — State/federal court issuing process (summons, subpoena, order)
  ✓ example.gov/verifiers — Government root namespace (sovereign)
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Further Derivations

None currently.

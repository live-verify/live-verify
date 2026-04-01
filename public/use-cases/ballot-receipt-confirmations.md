---
title: "Ballot Receipt & Voting Record Confirmations"
category: "Government & Civic Documents"
volume: "Very Large"
retention: "Election cycle + 4 years"
slug: "ballot-receipt-confirmations"
verificationMode: "clip"
tags: ["election", "voting", "ballot-receipt", "i-voted", "ballot-tracking", "democracy", "voter-confirmation", "rcs", "email"]
furtherDerivations: 2
---

## What is a Ballot Receipt Confirmation?

After a citizen casts their ballot — whether in person, by mail, or via drop box — jurisdictions increasingly send a **confirmation** that the ballot was received and counted. In the US, systems like BallotTrax ("Where's My Ballot") already push these notifications via email, SMS, and increasingly RCS.

Today these confirmations are unverifiable plaintext. A phishing email saying "Your ballot was REJECTED — click here to fix it" is indistinguishable from a real one. A verified hash ties the confirmation to the election authority's domain, making spoofed ballot-status messages instantly detectable.

This use case has **two variants**, reflecting a genuine policy tension:

### Variant 1: "I Voted" Confirmation (Participation Only)

Confirms that the voter's ballot was received and counted. Says nothing about how the voter voted. This is the default — most jurisdictions already send something like this.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="participated"></span>BALLOT RECEIPT CONFIRMATION
STATE OF COLORADO - SECRETARY OF STATE
═══════════════════════════════════════════════════════════════════

Voter:          MARIA ELENA GUTIERREZ
Voter ID:       CO-88-442917
Precinct:       Denver County #127

Election:       November 3, 2026 General Election

Ballot Status:  RECEIVED AND COUNTED
Method:         Mail-In Ballot
Received:       Oct 28, 2026 2:14 PM MDT

<span data-verify-line="participated">verify:sos.colorado.gov/ballot/v</span> <span verifiable-text="end" data-for="participated"></span></pre>
</div>

### Variant 2: "How I Voted" Personal Record (Voter's Choice)

Some voters want a verified record of their **selections** — not for the government to prove how they voted, but for themselves: a personal receipt they can keep, share, or use to confirm their ballot wasn't altered. This variant is opt-in, generated at the voter's request, and the voter controls who sees it.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="selections"></span>PERSONAL BALLOT RECORD
STATE OF COLORADO - SECRETARY OF STATE
═══════════════════════════════════════════════════════════════════

Voter:          MARIA ELENA GUTIERREZ
Voter ID:       CO-88-442917
Precinct:       Denver County #127

Election:       November 3, 2026 General Election

SELECTIONS
───────────────────────────────────────────────────────────────────
President:                                            CANDIDATE A
US Senate:                                            CANDIDATE B
Governor:                                             CANDIDATE C
Proposition 119 (School Funding):                             YES
Proposition 120 (Property Tax):                                NO

Ballot Status:  RECEIVED AND COUNTED
Method:         Mail-In Ballot
Received:       Oct 28, 2026 2:14 PM MDT

<span data-verify-line="selections">verify:sos.colorado.gov/ballot/v</span> <span verifiable-text="end" data-for="selections"></span></pre>
</div>

**The policy tension:** Variant 2 enables a voter to prove how they voted. This is exactly what ballot secrecy laws are designed to prevent — because provable votes enable vote-buying and coercion ("Show me your receipt or else"). Some jurisdictions explicitly prohibit ballot receipts that reveal selections. Others (particularly those with open-count systems like some Scandinavian countries) are more permissive. Whether to offer Variant 2 is a jurisdictional policy decision, not a technical one. Live Verify can support either variant; the question is whether the election authority chooses to issue the second one.

## Data Verified

**Variant 1 (Participation):** Voter name, voter ID, precinct, election name and date, ballot status (received/counted/rejected), voting method (in-person/mail/drop-box), receipt timestamp.

**Variant 2 (Selections):** All of Variant 1 plus the voter's contest-by-contest selections.

**Document Types:**
- **Ballot Received Confirmation:** Notification that the ballot arrived at the election office.
- **Ballot Counted Confirmation:** Notification that the ballot passed signature verification and was tabulated.
- **Ballot Rejected Notice:** Notification that the ballot had an issue (signature mismatch, late arrival) — with cure instructions.
- **Personal Ballot Record:** (Variant 2) Opt-in record of the voter's selections.

## Data Visible After Verification

Shows the issuer domain (`sos.colorado.gov`, `elections.king.gov`) and ballot status.

**Status Indications:**
- **Received** — Ballot arrived at the election office, awaiting processing.
- **Signature Verified** — Ballot signature matched voter file; proceeding to count.
- **Counted** — Ballot was tabulated in the official count.
- **Curing Required** — **ALERT:** Signature mismatch or missing information; voter must act before the cure deadline.
- **Rejected** — **CRITICAL:** Ballot was not counted (reason provided: late, duplicate, ineligible).
- **Challenged** — Ballot is under review (provisional ballot adjudication).
- **Spoofed** — **CRITICAL:** Hash not found at issuer domain; this message did not come from the election authority.

## Second-Party Use

The **Voter** benefits from verification.

**Anti-Phishing:** During election season, voters receive dozens of messages about their ballot. A verified confirmation from `sos.colorado.gov` is instantly distinguishable from a phishing email claiming "your ballot was rejected — click here." This is the primary value.

**Peace of Mind:** The voter can confirm at any time that their ballot was actually received and counted, not just that they received a message saying so.

**Cure Deadline Proof:** If a ballot is flagged for curing (signature mismatch), the verified notification with its timestamp proves the voter was notified and when — relevant if they miss the deadline and contest the rejection.

**Personal Archive:** (Variant 2) A voter who wants a verified record of their own selections for personal reference — years later, they can confirm exactly how they voted in a particular election.

## Third-Party Use

**Election Integrity Organizations**
**Systematic Monitoring:** Watchdog groups can verify that ballot-status notifications being sent to voters are genuine and consistent with official records, detecting mass phishing campaigns or misinformation attacks.

**Journalists / Fact-Checkers**
**Claim Verification:** When a voter claims "my ballot was rejected and they never told me," a journalist can verify whether a genuine notification was issued, and when.

**Courts**
**Election Contests:** In disputes about ballot rejection, verified notifications with timestamps provide authenticated evidence of the notification chain — when the voter was told, what they were told, and by which authority.

**Voter Assistance Organizations**
**Cure Support:** Organizations helping voters cure rejected ballots can verify the rejection notice is genuine before advising the voter on next steps.

## Verification Architecture

**The Ballot Notification Fraud Problem**

- **Phishing / Suppression:** Fake "ballot rejected" emails designed to discourage voters or harvest credentials. This is the dominant threat. Verified notifications make spoofed messages instantly detectable.
- **Status Fabrication:** Fake "ballot counted" messages designed to make voters complacent when their ballot was actually rejected. The voter trusts the fake confirmation and doesn't cure.
- **Notification Denial:** Election authorities claiming they notified a voter when they didn't, or vice versa. Verified notifications create a mutual audit trail.
- **Receipt Fabrication:** (Variant 2) Creating a fake "how I voted" receipt to satisfy a vote-buyer. This is the coercion risk — but it exists with or without Live Verify, since photos of marked ballots serve the same purpose.

**Issuer Types** (First Party)

**State Secretaries of State** — In states with centralized ballot tracking (Colorado, Washington, California).
**County Election Departments** — In states where ballot tracking is county-administered.
**Ballot Tracking Vendors** — BallotTrax and similar vendors operate the notification systems on behalf of election authorities; the `verify:` domain should still be the government domain, not the vendor's.

**Delivery Channels**

These confirmations arrive via email, SMS, and increasingly RCS (Rich Communication Services). RCS is particularly well-suited because:
- It supports rich formatting (the confirmation can be visually clear)
- Messages arrive in the phone's native messaging app (no app install required)
- The `verify:` line is selectable text, enabling Clip-mode verification directly from the message

**Ballot Secrecy Considerations (Variant 2)**

Variant 2 — the "how I voted" record — sits in tension with ballot secrecy principles that exist to prevent vote-buying and coercion. Jurisdictions considering this variant should weigh:

- **For:** Voter autonomy, personal record-keeping, ability to detect ballot alteration, transparency
- **Against:** Enables coercion ("prove you voted the way I told you"), vote-buying, pressure from employers/family/community

The technical implementation is identical for both variants. The policy question — whether to issue Variant 2 at all — belongs to each jurisdiction's election law. Live Verify is agnostic; it verifies whatever the election authority chooses to attest.

**Privacy Salt:** Required for both variants. Voter PII, ballot status, and (in Variant 2) political choices are highly sensitive. The hash must be salted to prevent enumeration attacks — particularly important for Variant 2, where the selections themselves are low-entropy and could be brute-forced without salt.

## Authority Chain

**Pattern:** Sovereign

Electoral commissions and secretaries of state hold statutory authority under election law to administer ballot processing and notify voters of ballot status.

```
✓ sos.colorado.gov/ballot/verify — Issues ballot receipt confirmations and status notifications
```

Self-authorized — this is a sovereign body whose authority derives from statute.

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Competition

| Feature | Live Verify | BallotTrax / Ballot Tracking Portals | Plain SMS / Email |
| :--- | :--- | :--- | :--- |
| **Anti-Phishing** | **Strong.** Hash ties message to government domain; spoofed messages fail verification. | **Weak.** Portal is legitimate, but the *notification* pointing to it can be spoofed. | **None.** No way to distinguish real from fake. |
| **Offline Proof** | **Strong.** Voter retains verified text; can re-verify later. | **Weak.** Requires portal to be online. | **None.** Message is just text. |
| **Coercion Resistance** | **Variant 1: Strong.** No selections disclosed. **Variant 2: Weak.** Provable vote. | **Strong.** Portals don't show selections. | **N/A.** |
| **Timestamp Proof** | **Strong.** Hash includes receipt timestamp. | **Medium.** Portal shows status but notification timing is not cryptographically bound. | **Weak.** SMS timestamps are carrier-dependent. |

## Jurisdictional Witnessing (Optional)

Some jurisdictions, contracts, or multi-party workflows may add an independent witness layer. When used, the witnessing firm:

- Receives all hashes from the election authority, and any subsequent changes to the payload as they happen — which may manifest as a new hash, a status change (received → counted, or received → rejected), or even a 404 (record deleted)
- Receives structured content/metadata (voter ID, election date, ballot status, timestamps)
- Does **NOT** receive plaintext (voter name, address, or — critically — selections in Variant 2)
- Provides an immutable, timestamped audit trail — available to the jurisdiction on demand, to voters during disputes, or as expert witness testimony in legal proceedings

This provides:
- **Non-repudiation:** Election authority cannot deny sending a notification
- **Timestamp proof:** Notification was sent at a specific time (critical for cure deadlines)
- **Regulatory audit:** State election oversight can inspect the witness ledger for notification failures
- **Resilience:** Verification works even if election authority's systems go down during high-traffic election periods

**Public Blockchain (Non-Party)**

If a witness layer exists, it may periodically commit rollups to a public blockchain as an additional timestamping mechanism. That is optional, not inherent to the use case. The verification paths would then be:

1. **Election authority domain** — Direct check against the issuer
2. **Witnessing firm** — Independent confirmation with timestamp
3. **Public blockchain** — Decentralized trust anchor via rollup inclusion

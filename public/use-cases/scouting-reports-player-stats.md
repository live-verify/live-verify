---
title: "Scouting Reports and Player Statistics"
category: "Sports & Athletics"
volume: "Very Small"
retention: "5-15 years (recruitment / career lifecycle)"
slug: "scouting-reports-player-stats"
tags: ["sports", "scouting", "player-stats", "athletic-recruitment", "college-sports", "pro-league", "integrity-in-sports", "scouting-combine"]
furtherDerivations: 1
---

## What is a Scouting Report?

In professional and collegiate sports (Baseball, Football, Soccer), a **Scouting Report** is the official evaluation of an athlete's physical talent and character. It lists critical "Objective Stats"—like a 40-yard dash time, a fastball velocity (MPH), or a goal-scoring record—alongside "Subjective Grades" from a professional scout.

These documents are the "Resumes" of the sports world. They determine who gets a $1M pro contract or a full-ride college scholarship. Fraud is common: parents or agents often "edit" a report to turn a 90 MPH fastball into a 95 MPH one, or to hide a "Character Red Flag" found by a scout. Verified hashes bind the **Player's Name, Core Stats, and Scout's Credentials** to the team's or the combine's domain (e.g., `mlb.com`, `nflcombine.com`, or `imgacademy.com`).

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <span verifiable-text="start" data-for="scout">[</span>
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;">NATIONAL SCOUTING BUREAU
Official Prospect Evaluation
═══════════════════════════════════════════════════════════════════

RATING: 80 - ELITE PROSPECT

ATHLETE PROFILE
───────────────────────────────────────────────────────────────────
Name:      SARAH "THE JET" SMITH
Position:  Striker (Soccer)
Class:     2026
Org:       Unseen University Academy

VERIFIED PERFORMANCE METRICS
───────────────────────────────────────────────────────────────────
40-Yard Dash:                                                 4.42s
Vertical Leap:                                                38.5"
Max Velocity:                                                92 MPH

Scout Notes: Elite explosive power. Exceptional field vision.
Character Grade: A. Recommended for Tier-1 recruitment.

</pre>
<span data-verify-line="scout">verify:nationscout.com/v</span> <span verifiable-text="end" data-for="scout">]</span>
</div>

## Data Verified

Player name, date of birth, graduation class, primary position, height/weight, physical metrics (e.g., speed, strength), performance stats (e.g., GPA, PPG), scout name/ID, scouting organization, date of evaluation.

**Document Types:**
- **Combine Result Sheet:** Data from a standardized physical test.
- **Scouting Evaluation Report:** Subjective analysis from a pro scout.
- **Academic/Athletic Transcript:** Summary for college recruitment.
- **Injury Clearance Report:** (Linked hash) proving recovery from surgery.

## Data Visible After Verification

Shows the issuer domain (`ncaa.org`, `nfl.com`, `PerfectGame.org`) and the athlete's standing.

**Status Indications:**
- **Verified Metrics** — Data matches the original combine/test record.
- **Suspended** — **ALERT:** The athlete has been flagged for disciplinary or eligibility issues.
- **Recanted** — **ALERT:** The scout has withdrawn the evaluation (e.g., due to discovered fraud).
- **Draft Eligible** — Confirms the athlete meets league age/academic rules.

## Second-Party Use

The **Athlete** (second party) receives the scouting report from the scouting bureau or combine (first party), **keeps it**, and may later hand it to third parties for various reasons, or never do so.

**Personal Record:** The athlete has their own verified copy of their performance metrics. Most of the time, the document sits in their portfolio—the verification value is latent, there *if needed*.

**Peace of Mind:** The athlete can confirm at any time that the report matches what the scouting organization's system recorded and hasn't been altered.

**Future Optionality:** If a dispute arises—whether about recruitment offers, contract negotiations, or eligibility—the athlete has cryptographic proof ready without needing to contact the scouting bureau.

## Third-Party Use

The athlete (second party) may hand the verified document to various third parties:

**College Coaches / Recruiters (Recruiting)**
A high school athlete includes a verified "Performance Hash" in their emails to college coaches. The coach can instantly see **"VERIFIED 4.4s DASH - NFL COMBINE"** on their phone, moving that player to the top of the recruitment list over players with unverified self-reported stats.

**Sports Agents / Agencies (Market Valuation)**
When negotiating endorsement deals, the agent provides verified stats to brands. "Verified by MLB Scouting Bureau" gives the brand (e.g., Nike) the proof needed to sign a high-value contract.

**Pro Team GMs / Front Offices (Draft Evaluation)**
During the draft process, teams receive verified reports to filter for authentic, professionally-scouted talent, saving thousands of hours in manual vetting compared to unverified "highlight reels" from parents.

**Anti-Doping & Integrity Units (Anomaly Detection)**
League integrity officers track verified physical growth patterns. If an athlete's "Verified Strength" jumps 50% in 2 months, it triggers an immediate investigation into PED use.

## Verification Architecture

**The "Dad-with-a-PDF" Fraud Problem**

- **Metric Inflation:** Editing a 4.8s dash to 4.4s to get onto a college radar.
- **Age Fraud:** Changing a player's birth year on a scouting report to make them appear more "Advanced" for their age.
- **Scout Impersonation:** Creating a fake report from a famous scout to trick a small pro league in a foreign country.

**Issuer Types (First Party)**

- National Scouting Bureaus
- Standardized Combines (NFL, NBA)
- Elite Athletic Academies

**Privacy Salt:** Required. Athlete health data and minor PII are sensitive. While each report contains unique combinations of player names, precise performance metrics (e.g., 4.42s dash, 38.5" vertical), and scout evaluations that provide significant entropy, the vulnerability of minors and the risk that rival teams could use enumeration for "prospect harvesting" means salt is essential. Salt protects young athletes from being tracked or targeted by data brokers and predatory agents.

## Jurisdictional Witnessing

A jurisdiction may require scouting organizations to retain a **witnessing firm** for regulatory compliance. The witnessing firm:

- Receives all hashes from the scouting bureau, and any subsequent changes to the report as they happen—which may manifest as a new hash, a status change (suspended, recanted), or even a 404 (record deleted)
- Receives structured content/metadata (performance metrics, test dates, ratings, scouting org IDs)
- Does **NOT** receive plaintext (athlete names, addresses, medical details)
- Provides an immutable, timestamped audit trail—available to the jurisdiction on demand, to athletes/third parties during disputes, or as expert witness testimony in legal proceedings

This provides:
- **Non-repudiation:** Scouting organization cannot deny issuing the evaluation
- **Timestamp proof:** Report existed at a specific time (critical for eligibility and age-fraud prevention)
- **Regulatory audit:** Athletic commissions can inspect the witness ledger for minor protection and anti-fraud compliance
- **Resilience:** Verification works even if scouting organization's systems go down or the organization dissolves

**Public Blockchain (Non-Party)**

Witnessing firms may periodically commit rollups to an inexpensive public blockchain, providing an ultimate immutability guarantee. The blockchain is a "non-party"—infrastructure, not a participant in the transaction. This creates multiple verification paths:

1. **Scouting organization domain** — Direct check against the issuer
2. **Witnessing firm** — Independent confirmation with timestamp
3. **Public blockchain** — Decentralized trust anchor via rollup inclusion

## Rationale

Sports recruitment is a multi-billion dollar industry built on "Paper Trust." By turning scouting reports into verifiable digital bridges, we protect the fairness of competition and ensure that life-changing opportunities go to the athletes who truly have the "Jet" speed they claim.
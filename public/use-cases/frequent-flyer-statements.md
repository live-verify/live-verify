---
title: "Frequent Flyer Statements and Mileage Proof"
category: "Travel & Hospitality"
volume: "Medium"
retention: "Statement period + 3-7 years"
slug: "frequent-flyer-statements"
tags: ["airline-loyalty", "mileage-balance", "frequent-flyer", "status-match", "travel-perks", "award-travel", "american-advantage", "delta-skymiles"]
furtherDerivations: 1
---

## What is a Mileage Statement?

If you fly a lot, your **Frequent Flyer Miles** are a valuable financial asset. For some "Million Milers," their balance can be worth $50,000 or more.

The **Mileage Statement** is the "Bank Statement" for your travel points.

You need this verified proof for a **"Status Match"**—where a rival airline gives you free upgrades to win your business) or to prove your net worth during a divorce or bank audit. Fraudsters often use "Inspect Element" to turn 1,000 miles into 1,000,000 to sell "fake accounts" to mileage brokers. Verified hashes stop this point-theft instantly.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <span verifiable-text="start" data-for="loyalty">[</span>
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;">AMERICAN ADMIRALS CLUB
AAdvantage Executive Statement
═══════════════════════════════════════════════════════════════════

Member #: 99228877                              Period: MAR 2026

SARAH JANE SMITH
Status: EXECUTIVE PLATINUM

                                              TOTAL MILES
                                                1,242,500

RECENT ACTIVITY
───────────────────────────────────────────────────────────────────
Mar 10 - LHR to JFK (First Class)                          +12,500
Mar 12 - Hertz Rental Bonus                                 +1,000

This statement is a verified record of your mileage balance and
tier status. Valid for status-match applications.

</pre>
<span data-verify-line="loyalty">verify:aa.com/loyalty/v</span> <span verifiable-text="end" data-for="loyalty">]</span>
</div>

## Data Verified

Member name, loyalty ID number, current mileage balance (Award Miles), status tier level (e.g., Platinum/Diamond), lifetime miles, expiration date of miles, recent high-value transaction ID, date of statement.

**Document Types:**
- **Monthly Loyalty Statement:** The primary mileage proof.
- **Status Match Certificate:** For moving between airlines.
- **Award Booking Confirmation:** Proving miles were used for a specific seat.
- **Million Miler Certificate:** Formal proof of lifetime achievement.

## Data Visible After Verification

Shows the issuer domain (`aa.com`, `delta.com`, `united.com`) and current account standing.

**Status Indications:**
- **Active** — Account is in good standing; balance verified.
- **Expired** — Miles have lapsed due to inactivity.
- **Suspended** — Under investigation (e.g., for mileage broker fraud).
- **Elite Active** — Tier status verified for priority services.

## Second-Party Use

The **AAdvantage Member** (second party) receives the mileage statement from the airline (first party), **keeps it**, and may later hand it to third parties for various reasons, or never do so.

**Personal Record:** They have their own verified copy of their mileage balance and status tier. Most of the time, the statement sits in their email or travel folder—the verification value is latent, there *if needed*.

**Peace of Mind:** They can confirm at any time that it matches what the airline's system recorded and hasn't been altered.

**Future Optionality:** If a dispute arises—whether about missing miles, tier qualification, or award availability—they have cryptographic proof ready without needing to contact the airline.

## Third-Party Use

The member (second party) may hand the verified document to various third parties:

**Rival Airlines (Loyalty Depts)**
**Status Match Vetting:** Instantly verifying the "Status Statements" uploaded by customers during marketing campaigns. Live Verify ensures that the "Elite" customers being lured away are actually who they claim to be.

**Tax Authorities / Divorce Lawyers**
**Asset Valuation:** Frequent flyer miles for a "Million Miler" can be worth $50,000+. Verification ensures that mileage assets are accurately reported during asset division or business expense audits.

**Credit Card Issuers**
**Co-branded Vetting:** Verifying that a card applicant actually holds the high-tier airline status required for specific premium card products.

## Verification Architecture

**The "Mileage Broker" Fraud Problem**

- **Balance Inflation:** Editing a 10,000 mile statement to read 1,000,000 miles to sell the "account" to a mileage broker for thousands of dollars.
- **Status Faking:** Changing "Gold" to "Diamond" on a PDF to get lounge access or free upgrades in foreign airports.
- **Activity Scrubbing:** Removing a "Miles Redeemed" line to hide that the balance is actually zero.

**Issuer Types (First Party)**

- Airlines (American, Delta, United, BA, Emirates)
- Hotel Groups (Marriott, Hilton, IHG)
- Loyalty Platforms (e.g., AwardWallet, Points.com - aggregating verified data)

**Privacy Salt:** Not required. Unlike documents with enumerable values, frequent flyer statements contain many unpredictable variables that combine to create sufficient entropy—member ID (unique), total mileage balance (varies continuously), recent transaction details (flight-specific with dates, routes, fare classes), and lifetime miles (cumulative, non-repeating). The combination of these variables makes reverse-engineering a specific member's statement computationally infeasible without already knowing all the details.

## Jurisdictional Witnessing

A jurisdiction may require airlines to retain a **witnessing firm** for regulatory compliance. The witnessing firm:

- Receives all hashes from the airline, and any subsequent changes to the payload as they happen—which may manifest as a new hash, a status change, or even a 404 (record deleted)
- Receives structured content/metadata (mileage balances, tier status, transaction dates, award redemptions)
- Does **NOT** receive plaintext (passenger names, contact details, travel itineraries)
- Provides an immutable, timestamped audit trail—available to the jurisdiction on demand, to members/third parties during disputes, or as expert witness testimony in legal proceedings

This provides:
- **Non-repudiation:** Airline cannot deny issuing the statement or the mileage balance
- **Timestamp proof:** Hash existed at a specific time (critical for status match claims and asset valuations)
- **Regulatory audit:** Aviation regulators or consumer protection agencies can inspect the witness ledger
- **Resilience:** Verification works even if airline's systems go down or the loyalty program is sold/merged

**Public Blockchain (Non-Party)**

Witnessing firms may periodically commit rollups to an inexpensive public blockchain, providing an ultimate immutability guarantee. The blockchain is a "non-party"—infrastructure, not a participant in the transaction. This creates multiple verification paths:

1. **Airline domain** — Direct check against the issuer
2. **Witnessing firm** — Independent confirmation with timestamp
3. **Public blockchain** — Decentralized trust anchor via rollup inclusion

## Competition vs. Loyalty Apps

| Feature | Live Verify | Airline Mobile App | Scanned PDF Statement |
| :--- | :--- | :--- | :--- |
| **User Privacy** | **High.** Share only the status/balance. | **Low.** Showing the app reveals full travel history. | **Vulnerable.** |
| **Trust Anchor** | **Domain-Bound.** Bound to the Airline. | **System-Bound.** | **Zero.** Easily forged. |
| **Interoperability** | **High.** Verified PDF works for status-matching. | **Zero.** Hard to "share" app data with a rival. | **Universal.** |
| **Freshness** | **Real-time.** Shows if account is suspended. | **Live.** | **Static.** |

**Why Live Verify wins here:** The "Switching Cost." Airlines want to make it hard for you to leave. Their apps are designed to keep your data in *their* walled garden. Live Verify turns the **Static Statement** into a portable, trusted "Reputation Token" that the traveler owns and can use to prove their value to any competitor or partner.

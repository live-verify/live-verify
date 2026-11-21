---
title: "Frequent Flyer Statements and Mileage Proof"
category: "Travel & Hospitality"
volume: "Medium"
retention: "Statement period + 3-7 years"
slug: "frequent-flyer-statements"
verificationMode: "clip"
tags: ["airline-loyalty", "mileage-balance", "frequent-flyer", "status-match", "travel-perks", "award-travel", "american-advantage", "delta-skymiles"]
furtherDerivations: 1
---

## What is a Mileage Statement?

If you fly a lot, your Frequent Flyer Miles are a valuable financial asset. For some "Million Milers," their balance can be worth $50,000 or more.

The Mileage Statement is the "Bank Statement" for your travel points.

You need this verified proof for a "Status Match"—where a rival airline gives you free upgrades to win your business) or to prove your net worth during a divorce or bank audit. Fraudsters often use "Inspect Element" to turn 1,000 miles into 1,000,000 to sell "fake accounts" to mileage brokers. Verified hashes stop this point-theft instantly.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <span verifiable-text="start" data-for="loyalty"></span>
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
<span data-verify-line="loyalty">verify:aa.com/loyalty/v</span> <span verifiable-text="end" data-for="loyalty"></span>
</div>

## The Problem: Mileage Broker Fraud

- **Balance Inflation:** Editing a 10,000 mile statement to read 1,000,000 miles to sell the "account" to a mileage broker for thousands of dollars.
- **Status Faking:** Changing "Gold" to "Diamond" on a PDF to get lounge access or free upgrades in foreign airports.
- **Activity Scrubbing:** Removing a "Miles Redeemed" line to hide that the balance is actually zero.

## What Is Checked

Member name, loyalty ID number, current mileage balance (Award Miles), status tier level (e.g., Platinum/Diamond), lifetime miles, expiration date of miles, recent high-value transaction ID, date of statement.

**Document Types:**
- **Monthly Loyalty Statement:** The primary mileage proof.
- **Status Match Certificate:** For moving between airlines.
- **Award Booking Confirmation:** Proving miles were used for a specific seat.
- **Million Miler Certificate:** Formal proof of lifetime achievement.

## What the Checker Sees

Shows the issuer domain (`aa.com`, `delta.com`, `united.com`) and current account standing.

**Status Indications:**
- **Active** — Account is in good standing; balance verified.
- **Expired** — Miles have lapsed due to inactivity.
- **Suspended** — Under investigation (e.g., for mileage broker fraud).
- **Elite Active** — Tier status verified for priority services.

## Who Holds It

The AAdvantage Member (second party) receives the mileage statement from the airline (first party), keeps it, and may later hand it to third parties for various reasons, or never do so.

**Personal Record:** They have their own verified copy of their mileage balance and status tier. Most of the time, the statement sits in their email or travel folder—the verification value is latent, there *if needed*.

**Peace of Mind:** They can confirm at any time that it matches what the airline's system recorded and hasn't been altered.

**Future Optionality:** If a dispute arises—whether about missing miles, tier qualification, or award availability—they have cryptographic proof ready without needing to contact the airline.

## Who Checks It

The member (second party) may hand the verified document to various third parties:

**Rival Airlines (Loyalty Depts)**
**Status Match Vetting:** Instantly verifying the "Status Statements" uploaded by customers during marketing campaigns. Live Verify ensures that the "Elite" customers being lured away are actually who they claim to be.

**Tax Authorities / Divorce Lawyers**
**Asset Valuation:** Frequent flyer miles for a "Million Miler" can be worth $50,000+. Verification ensures that mileage assets are accurately reported during asset division or business expense audits.

**Credit Card Issuers**
**Co-branded Vetting:** Verifying that a card applicant actually holds the high-tier airline status required for specific premium card products.

## Who Issues It

**Issuer Types (First Party)**

- Airlines (American, Delta, United, BA, Emirates)
- Hotel Groups (Marriott, Hilton, IHG)
- Loyalty Platforms (e.g., AwardWallet, Points.com - aggregating verified data)

**Privacy Salt:** Not required. Unlike documents with enumerable values, frequent flyer statements contain many unpredictable variables that combine to create sufficient entropy—member ID (unique), total mileage balance (varies continuously), recent transaction details (flight-specific with dates, routes, fare classes), and lifetime miles (cumulative, non-repeating). The combination of these variables makes reverse-engineering a specific member's statement computationally infeasible without already knowing all the details.

## Authority Chain

**Pattern:** Commercial

Airlines and loyalty program operators issue frequent flyer statements documenting account balances and transaction history. Self-authorized by their operation of the loyalty scheme and account holder contract.

```
✓ avios.ba.com/statement/verify — Issues frequent flyer account statements and loyalty transactions
```

Commercial issuer — self-authorized. Trust rests on the issuer's domain reputation.

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Jurisdictional Witnessing (Optional)

An independent witness layer may apply — see [Witnessing Third Parties](../../docs/WITNESSING-THIRD-PARTIES.md) for the full mechanism (what a witness receives, non-repudiation, optional public-blockchain rollups). For this use case: a witness would receive the airline's hashes and status changes plus structured metadata (loyalty IDs, mileage balances, tier statuses, transaction dates, award redemptions) — never member names or travel itineraries — providing non-repudiation of the statement and mileage balance and an audit trail regulators can inspect.

## Compared With Loyalty Apps

| Feature | Live Verify | Airline Mobile App | Scanned PDF Statement |
| :--- | :--- | :--- | :--- |
| **User Privacy** | **High.** Share only the status/balance. | **Low.** Showing the app reveals full travel history. | **Vulnerable.** |
| **Trust Anchor** | **Domain-Bound.** Bound to the Airline. | **System-Bound.** | **Zero.** Easily forged. |
| **Interoperability** | **High.** Verified PDF works for status-matching. | **Zero.** Hard to "share" app data with a rival. | **Universal.** |
| **Freshness** | **Real-time.** Shows if account is suspended. | **Live.** | **Static.** |

**Where each fits:** The airline's app is the member's live view of their account, and nothing replaces it for booking, upgrades and day-to-day use. It is not designed to be shown to someone else, and doing so exposes far more than a tier or balance. Live Verify lets another airline's status-match desk, a hotel partner or an employer confirm that the airline issued a statement the member chose to share. The app stays the member's own tool; the statement is for third parties.

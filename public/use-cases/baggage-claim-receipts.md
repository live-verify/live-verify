---
title: "Baggage Claim Receipts and Reports"
category: "Travel & Hospitality"
volume: "Large"
retention: "Claim resolution + 3-7 years"
slug: "baggage-claim-receipts"
verificationMode: "both"
tags: ["airline", "baggage", "receipt", "lost-luggage", "compensation", "travel-insurance", "expense"]
furtherDerivations: 1
---

## What is a Baggage PIR?

When your suitcase doesn't arrive at the airport, the airline agent gives you a Property Irregularity Report (PIR). This is a simple thermal-paper receipt with a reference number like `CDG-AF-998877`.

This receipt is the only "Proof of Loss" accepted by travel insurance companies.

Because these receipts are easy to forge with a basic printer, "baggage fraud" is a multi-million dollar problem. Fraudsters file fake reports for flights they took just to collect $500 from their insurance company. Verified PIRs stop this scam instantly.

<div style="max-width: 600px; margin: 24px auto; font-family: 'Courier New', monospace; border: 1px solid #999; background: #fff; padding: 20px; box-shadow: 2px 2px 5px rgba(0,0,0,0.1);">
  <div style="text-align: center; margin-bottom: 15px; border-bottom: 1px solid #000; padding-bottom: 10px;">
    <strong><span verifiable-text="start" data-for="bag"></span>AIR FRANCE - BAGGAGE SERVICES</strong><br>
    PROPERTY IRREGULARITY REPORT (PIR)<br>
    -----------------------------------
  </div>
<div style="font-size: 0.9em; line-height: 1.4;">
    <p><strong>Ref:</strong> CDG-AF-998877<br>
    <strong>Passenger:</strong> AMELIE POULAIN<br>
    <strong>Flight:</strong> AF1234 / 15MAR26</p>
<p><strong>Item Description:</strong><br>
    Large Suitcase, Samsonite, Black<br>
    Tag #: AF-123456</p>
<p><strong>Status:</strong> DELAYED / SEARCHING<br>
    <strong>Claim Category:</strong> Delayed (> 24 Hours)</p>
<div style="background: #eee; padding: 10px; margin: 15px 0;">
      <strong>EMERGENCY EXPENSE AUTHORIZATION:</strong><br>
      Up to EUR 100.00 for essential items.<br>
      Keep all receipts for reimbursement.
    </div>
<p style="font-size: 0.8em;">Note: Subject to Montreal Convention liability limits.</p>
  </div>
<div data-verify-line="bag" style="border-top: 1px dashed #999; margin-top: 20px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
      title="Demo only: Air France doesn't yet offer verification&#10;endpoints, so this is illustrative">
      <span data-verify-line="bag">verify:airfrance.com/baggage/v</span> <span verifiable-text="end" data-for="bag"></span>
  </div>
</div>

## The Problem: Fake Lost Bag Fraud

- **PIR Forgery:** Using a template to create a realistic Property Irregularity Report for a flight the traveler actually took, just to collect insurance money.
- **Amount Inflation:** Editing a $50 authorization to read $500.
- **Double-Dipping:** Claiming full value from both the airline and the private insurer.

## What Is Checked

Passenger name, Property Irregularity Report (PIR) reference, flight details, baggage tag numbers, damage description or delay status, authorization amount for expenses, date of report.

**Document Types:**
- **Property Irregularity Report (PIR):** Issued when a bag is lost or delayed.
- **Damage Report:** Issued when a bag is broken but delivered.
- **Baggage Fee Receipt:** Proving payment for excess/checked bags.

## What the Checker Sees

Shows the issuer domain (`airfrance.com`, `delta.com`) and the claim status.

**Status Indications:**
- **Open** — Bag is still missing; claim active.
- **Found** — Bag located; en route to passenger.
- **Closed** — Claim settled and paid.
- **Denied** — Claim rejected (e.g., report filed too late).

## Who Holds It

The Passenger benefits from verification.

**Travel Insurance Payout:** Insurers (e.g., Allianz, AMEX) require a PIR from the airline to pay for "Delayed Baggage" coverage. A verified PIR prevents the insurer from rejecting the claim due to "unreadable" or "suspicious" documentation.

**Emergency Purchases:** Proving to a shop that you have a verified "EUR 100 authorization" from the airline might allow for direct billing or just peace of mind when spending money you expect to get back.

## Who Checks It

**Travel Insurance Companies**
**Fraud Detection:** People often forge PIRs to claim $500 for "lost bags" that were never actually lost. Scanning the verification hash instantly proves the airline has an active PIR for that passenger/flight.

**Employers / Expense Teams**
**Reimbursement Audit:** If an employee expenses $200 for "new clothes due to lost bag," Finance can verify the PIR to ensure the bag was actually delayed and the airline didn't already pay for the clothes.

**Corporate Travel Agencies (TMCs)**
**Support:** TMCs can monitor the verified status of a client's lost bag to provide proactive updates and handle the paperwork for them.

## Who Issues It

**Issuer Types** (First Party)

**Airlines:** (Air France, BA, United, etc.)
**Ground Handlers:** (Swissport, Menzies) who often issue the PIRs on behalf of airlines.

## Authority Chain

**Pattern:** Commercial

Airlines and ground handlers issue Property Irregularity Reports (PIRs) as the sole authorized custodians of baggage claim records. Self-authorized by their operational responsibility for baggage handling.

```
✓ baggage.ba.com/claim/verify — Issues baggage claim receipts and property irregularity reports
```

Commercial issuer — self-authorized. Trust rests on the issuer's domain reputation.

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Where Each Fits: Live Verify and Airline Apps

Airlines let passengers follow a delayed or lost bag through their app or website, using the reference on the property irregularity report (PIR). The app and Live Verify answer different questions and work side by side: the app shows the passenger the bag's current status, while Live Verify lets a travel insurer confirm the report the passenger has sent it.

| | Airline app or tracing website | Live Verify on the property irregularity report | Paper or PDF report |
| :--- | :--- | :--- | :--- |
| **Who can check** | The passenger, using their reference. | Anyone sent the report: a travel insurer, a card benefits provider, an employer. | Nobody; it can only be taken on trust. |
| **What the checker gets** | The current status of the claim, which changes as it progresses. | Confirmation that the airline issued this exact report, with its details, as at its date. | A document that may have been edited. |
| **What the passenger shares** | Nothing; app access cannot easily be passed to an insurer. | Only the report they chose to send. | The report. |
| **Reach** | One airline's passengers. | Global in principle: any airline or handling agent that publishes hashes on its own domain. | Universal, but untrusted. |
| **Speed and cost** | Immediate for the passenger. | A few seconds per check: one web lookup, with no fee to the standard. | Free and immediate. |
| **What it needs** | The app and a connection. | The airline to publish hashes, and Live Verify-aware software on the checker's device. No airline does this yet. | Nothing. |
| **Best suited to** | Following the bag. | Supporting an insurance or benefits claim. | Nothing where the claim is large. |

**Where each fits:** the airline app is the best way for the passenger to follow a claim as it progresses. A travel insurer cannot be given access to the passenger's app, and needs something fixed to put on file. Live Verify lets the insurer confirm that the airline issued the property irregularity report it has been sent, if the insurer's software honours it, so the app serves the passenger and the verified report serves the claim.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).

---
title: "Event Ticket Provenance"
category: "Business & Commerce"
volume: "Very Large"
retention: "Event date + 30 days (chargebacks/disputes)"
slug: "event-ticket-provenance"
verificationMode: "clip"
tags: ["tickets", "provenance", "resale", "secondary-market", "fraud", "concerts", "sports", "stubhub", "viagogo", "consumer-protection"]
furtherDerivations: 1
---

## What is Event Ticket Provenance?

A seller on a secondary-market platform lists a ticket for a sold-out concert. The buyer has no way to confirm the ticket actually exists in the venue's or promoter's system before paying. The listing might be fraudulent — a fabricated screenshot, a ticket that was already used, or one that was cancelled after the original buyer got a refund.

This is a provenance problem, not an admission-control problem. The question is not "will this barcode scan at the gate?" — that is the ticketing platform's job. The question is: "was this ticket genuinely issued, and what is its current status?"

The distinction matters. The [rejected event-ticketing use case](../rejected-use-cases/event-ticketing.md) explored Live Verify as a ticket-validity and admission mechanism — binding tickets to holders, controlling transfers, replacing barcodes. That overlaps with what ticketing platforms already do well. Provenance verification is narrower: a read-only check against the issuer's system of record, confirming that a ticket with specific attributes was issued and has not been cancelled or already used.

## Example: Ticket Provenance Claim

The ticketing platform publishes a provenance claim for each issued ticket. The claim contains enough detail for a prospective buyer to match it against a resale listing, but it is not the ticket itself — it grants no admission rights.

<div style="max-width: 500px; margin: 24px auto; font-family: sans-serif; border: 1px solid #2a5298; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
  <div style="background: linear-gradient(135deg, #1e3a6e 0%, #2a5298 100%); color: #fff; padding: 16px 20px;">
    <div style="font-size: 0.75em; letter-spacing: 2px; text-transform: uppercase; opacity: 0.8;">Ticket Provenance</div>
  </div>
  <div style="padding: 20px; font-family: 'Courier New', monospace; font-size: 0.85em; line-height: 1.8;">
    <span verifiable-text="start" data-for="provenance1"></span>
    <div>TICKET PROVENANCE</div>
    <div>Event:         Arctic Monkeys - Sheffield Arena</div>
    <div>Date:          15 Jun 2026 19:30</div>
    <div>Section:       Block A, Row 12, Seat 8</div>
    <div>Issued By:     Ticketmaster UK</div>
    <div>Ticket Ref:    TM-2026-882199</div>
    <div>Status:        ISSUED — NOT YET USED</div>
    <div><span data-verify-line="provenance1">verify:ticketmaster.co.uk/provenance/v</span></div>
    <span verifiable-text="end" data-for="provenance1"></span>
  </div>
</div>

The text that clip mode sees and hashes:

```
TICKET PROVENANCE
Event:         Arctic Monkeys - Sheffield Arena
Date:          15 Jun 2026 19:30
Section:       Block A, Row 12, Seat 8
Issued By:     Ticketmaster UK
Ticket Ref:    TM-2026-882199
Status:        ISSUED — NOT YET USED
verify:ticketmaster.co.uk/provenance/v
```

The claim does not contain a barcode, QR code, or anything that grants entry. It is a statement of provenance: this ticket was issued, for this event, in this seat, and its current status is X.

## Example: Buyer Discovers a Used Ticket

A resale listing looks legitimate — correct event, plausible seat, reasonable price. The buyer clips the provenance claim the seller has shared. The verification response returns:

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #7a1f1f; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;">Verification Result
═══════════════════════════════════════════════════════════════════

Status:           USED
Detail:           Scanned at gate — 15 Jun 2026 19:47
Result:           This ticket has already been used for entry

verify:ticketmaster.co.uk/provenance/v
</pre>
</div>

The ticket was real, but the holder already attended the event. The seller is attempting to resell a spent ticket. The buyer avoids paying.

## Status Values

The provenance endpoint reflects the ticket's current state in the issuer's system of record:

- **ISSUED — NOT YET USED** — Ticket exists, is valid, and has not been scanned at any gate. This is what a legitimate resale buyer wants to see.
- **USED** — Ticket was scanned at the venue entrance. A resale listing for a USED ticket is fraudulent.
- **CANCELLED** — Ticket was cancelled by the issuer (refund processed, event change, fraud investigation). No longer valid.
- **TRANSFERRED** — Ownership was changed through the issuer's official transfer mechanism. The original provenance claim is superseded — a new claim exists under the new holder.
- **404** — No ticket with this reference was ever issued. The claim is fabricated.

This artifact confirms the ticket was issued and its current status (issued, used, cancelled, transferred). It does not confirm whether the ticket is transferable under the issuer's terms, or whether the person offering it for resale is the current entitled holder. A buyer on a resale platform who sees ISSUED — NOT YET USED knows the ticket exists and hasn't been scanned, but does not know whether the seller can lawfully transfer it or whether the issuer will honour the transfer at the gate. For resale contexts, transferability and holder verification are separate questions this artifact does not answer.

## Data Verified

Event name, date/time, venue, section/row/seat, issuing platform, ticket reference number, and current status.

**Document Types:**
- **Standard Provenance Claim** — Single ticket, single event. The primary use case.
- **Season Ticket Provenance** — Covers multiple events; status may vary per fixture date.
- **Group Booking Provenance** — Multiple adjacent seats under one reference, with per-seat status.

**Privacy Salt:** Required. The ticket reference and seat location are personally identifying in combination — they can be linked back to the original purchaser through the issuer's records. Salting prevents correlation between provenance checks.

## Data Visible After Verification

Shows the issuer domain (e.g., `ticketmaster.co.uk`, `axs.com`, `dice.fm`) and the current ticket status.

**Verification Response Format:**

```json
{
  "status": "verified",
  "ticketStatus": "ISSUED"
}
```

When the ticket has been used:

```json
{
  "status": "verified",
  "ticketStatus": "USED",
  "usedAt": "2026-06-15T19:47:00Z"
}
```

## Second-Party Use

The **ticket holder** benefits when reselling legitimately.

**Proving authenticity before sale:** A seller on a resale platform can share the provenance claim with a prospective buyer. The buyer verifies it independently — confirming the ticket exists, matches the listing details, and has not been used or cancelled. This builds trust without the seller needing to share the actual ticket (barcode, QR code, or mobile wallet entry).

**Dispute resolution:** If a buyer claims the ticket was fake, the seller has a timestamped provenance verification showing the ticket was ISSUED at the time of sale.

## Third-Party Use

**Buyers on Resale Platforms**

The direct beneficiary. Before paying a stranger on StubHub, Viagogo, or a peer-to-peer marketplace, the buyer can verify provenance. The check answers: does this ticket exist, and is it still valid?

**Resale Platforms (StubHub, Viagogo, Twickets, etc.)**

**Listing validation:** A resale platform could require sellers to include a verifiable provenance claim when listing. Listings where provenance does not verify — or where the status is USED, CANCELLED, or TRANSFERRED — are flagged or blocked automatically.

**Trust signal:** Listings with verified provenance can be distinguished from unverified listings, giving buyers a basis for choosing between sellers.

**Venues and Promoters**

**Secondary market visibility:** Provenance checks generate endpoint traffic that shows which tickets are circulating on secondary markets, at what volume, and how close to event date. This is market intelligence the venue currently lacks.

**Consumer Protection Bodies**

**Fraud investigation:** When consumers report ticket fraud, investigators can check whether the claimed ticket was ever issued. A fabricated reference returns 404. A USED ticket confirms the scam pattern.

## Verification Architecture

**The Secondary Market Provenance Gap**

The secondary ticket market has a structural information asymmetry:

- The seller knows whether their ticket is real (or should know)
- The buyer has no independent way to check before paying
- The resale platform may or may not have integration with the primary issuer's system
- Screenshots and PDFs of tickets are trivially fabricated

Current mitigations are platform-dependent. Some resale platforms guarantee purchases (absorbing the fraud cost), others do not. Guaranteed platforms pass the cost to buyers through fees. Unguaranteed platforms leave buyers exposed.

A provenance claim addresses the asymmetry directly: the buyer checks the issuer's system of record, not the seller's assertions.

**What This Is Not**

This is not a replacement for the ticketing platform's admission-control system. It does not replace barcodes, QR codes, mobile wallet tickets, or official transfer mechanisms. It does not make the provenance claim into a value-bearing token — possessing the claim does not grant entry.

It is a read-only verification layer. The issuer publishes provenance claims. Interested parties verify them. The ticketing platform's own systems remain the authoritative source for admission, transfer, and refund.

## Competition vs. Current Practice

| Feature | Live Verify Provenance | Platform Guarantee (StubHub) | Seller Screenshot/PDF | Official Transfer |
| :--- | :--- | :--- | :--- | :--- |
| **Pre-payment check** | **Yes.** Buyer verifies before paying. | **No.** Guarantee applies post-purchase. | **No.** Screenshot proves nothing. | **N/A.** Transfer is the mechanism, not a check. |
| **Issuer-backed** | **Yes.** Provenance from the ticketing platform. | **No.** Platform guarantee, not issuer attestation. | **No.** Seller-asserted. | **Yes.** But only within the platform. |
| **Status visibility** | **Yes.** ISSUED, USED, CANCELLED, TRANSFERRED. | **Partial.** Platform may check internally. | **No.** Static artifact. | **Yes.** Within the platform. |
| **Works across platforms** | **Yes.** Any resale channel. | **No.** Only on the guaranteeing platform. | **N/A.** | **No.** Only within the issuing platform. |
| **Cost to buyer** | **None.** | **Built into fees.** | **None.** | **Transfer fee (sometimes).** |

**Practical conclusion:** Platform guarantees protect buyers after the fact but add cost. Official transfers work within a single platform but not across the open secondary market. Provenance verification gives buyers a pre-payment check that works regardless of which resale channel they are using.

## Authority Chain

**Pattern:** Commercial

```
✓ ticketmaster.co.uk/provenance/v — Ticket provenance verification
```

No regulatory chain. Trust rests on the ticketing platform's domain reputation — the same entity that issued the ticket in the first place.

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Further Derivations

1. **Accommodation Booking Provenance** — Hotel or holiday rental bookings resold on secondary markets. The same pattern: was this booking genuinely made, and is it still active?
2. **Transport Ticket Provenance** — Train, coach, or ferry tickets resold peer-to-peer. Provenance check confirms the ticket was issued and has not been used or refunded.

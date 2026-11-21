---
title: "Contingency Insurance (Event Cancellation)"
category: "Specialty Insurance"
volume: "Small"
retention: "Event + 7 years"
slug: "contingency-insurance-events"
verificationMode: "clip"
tags: ["contingency-insurance", "event-cancellation", "non-appearance", "special-events", "lloyds", "risk-management"]
furtherDerivations: 1
---

## What is Event Insurance?

If a major music festival (like Glastonbury) or a Broadway show is cancelled due to a hurricane, a pandemic, or the lead singer losing their voice, the promoter stands to lose millions of dollars.

**Contingency Insurance** (or Event Cancellation Insurance) covers these losses.

Promoters must show this verified proof of insurance to stadium owners and lenders before any equipment moves onto the field. Fraud is common: promoters sometimes edit an old policy to "fake" coverage for a high-risk event to get a lower venue rate.

<div style="max-width: 600px; margin: 24px auto; font-family: 'Times New Roman', Georgia, serif; border: 2px solid #002366; background: #fff; padding: 0; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
  <div style="background: #002366; color: #fff; padding: 20px; display: flex; justify-content: space-between; align-items: center;">
    <div>
      <div style="font-weight: bold; font-size: 1.2em;"><span verifiable-text="start" data-for="event"></span>BEAZLEY SPECIALTY LTD</div>
      <div style="font-size: 0.8em;">Lloyd's Syndicate 2623/623</div>
    </div>
    <div style="text-align: right;">
      <div style="font-size: 0.8em;">Policy #: EV-998877-26</div>
    </div>
  </div>
<div style="padding: 35px;">
    <h2 style="text-align: center; color: #002366; font-size: 1.4em; margin-bottom: 25px; text-transform: uppercase; letter-spacing: 1px;">Evidence of Contingency Insurance</h2>
<div style="font-size: 1em; line-height: 1.6; color: #333;">
      <p><strong>Insured:</strong> Glastonbury Festival Events, Ltd.<br>
      <strong>Event:</strong> 2026 Summer Music Festival</p>
<div style="background: #f9f9f9; border: 1px solid #ddd; padding: 15px; margin: 20px 0;">
        <p><strong>Section 1: Event Cancellation / Abandonment</strong><br>
        Limit: GBP 25,000,000.00</p>
        <p><strong>Section 2: Non-Appearance</strong><br>
        Specific Artist: [REDACTED]<br>
        Limit: GBP 5,000,000.00</p>
      </div>
<p><strong>Coverage Includes:</strong> Adverse Weather, Terrorism, National Mourning, Communicable Disease (Endorsement #42).</p>
      <p><strong>Effective Date:</strong> June 24, 2026 to June 28, 2026</p>
    </div>
<div style="margin-top: 40px; border-top: 1px solid #ccc; padding-top: 10px; font-size: 0.8em; color: #666; font-style: italic; text-align: center;">
      This evidence is subject to the terms and conditions of the Master Policy.
    </div>
<div data-verify-line="event" style="border-top: 1px dashed #999; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
      title="Demo only: Beazley doesn't yet offer verification&#10;endpoints, so this is illustrative">
      <span data-verify-line="event">verify:beazley.com/v</span> <span verifiable-text="end" data-for="event"></span>
    </div>
  </div>
</div>

## The Problem: Phantom Policy Fraud

- **Photoshop Forgery:** Editing an old 2022 pandemic policy to read "2026" to trick a venue into allowing a high-risk event.
- **Limit Inflation:** Changing a $1M limit to a $10M limit to secure a more prestigious venue.
- **Endorsement Fabrications:** Adding a fake "Communicable Disease" endorsement to a policy that actually excludes it (a common post-COVID fraud).

## What Is Checked

Insured entity name, event name/ID, coverage limits (Cancellation/Abandonment/Non-Appearance), specific "Key Artist" inclusions, date range of the event, geographic territory, primary endorsements (e.g., Pandemic/Communicable Disease), issuing syndicate.

**Document Types:**
- **Evidence of Insurance:** For venues and vendors.
- **Non-Appearance Rider:** Specific to celebrity/athlete availability.
- **Prize Indemnity Certificate:** (e.g., "Hole-in-One" or "Half-Court Shot" insurance).
- **Adverse Weather Policy:** Triggered by specific rainfall/wind measurements.

## What the Checker Sees

Shows the issuer domain (`beazley.com`, `hiscox.com`) and current policy standing.

**Status Indications:**
- **Active** — Premium paid; event covered.
- **Cancelled** — Policy terminated (often due to non-payment or increased risk profile).
- **Claim Filed** — Event has been cancelled; claim in processing.
- **Closed** — Event completed; no claim filed.

## Who Holds It

The Event Promoter benefits from verification.

**Venue Booking:** Proving to a stadium or arena owner that the $25M cancellation policy is verified active. Venues often require this proof before allowing a promoter to move equipment onto the grass.

**Talent Booking:** Proving to a major artist's agent that the "Non-Appearance" deposit is backed by a verified insurance policy from a Lloyd's syndicate.

**Sponsorship Contracts:** Assuring major sponsors (e.g., Coca-Cola or Nike) that their investment is protected even if the event is cancelled due to a hurricane or pandemic.

## Who Checks It

**Venue Owners / Stadiums**
**Liability Discharge:** Ensuring the promoter has enough "Cancellation Cash" to pay the venue's staff and overhead if the concert is called off at the last minute.

**Reinsurers**
**Risk Aggregation:** Reinsurers can verify the digital hashes of all "Festival Policies" in a specific city to ensure they aren't over-exposed to a single weather event (e.g., a hurricane hitting Miami during Art Basel).

**Artists / Talent Agencies**
**Deposit Protection:** Verifying that the insurance covering the artist's non-appearance (which might trigger a refund of their guarantee) is legitimate.

## Who Issues It

**Issuer Types** (First Party)

**Specialty Insurers:** (Beazley, Hiscox, Chubb).
**Lloyd's Syndicates:** (Primary market for contingency).
**MGA Specialists:** (e.g., HCC Specialty).

## Authority Chain

**Pattern:** Regulated

Lloyd's of London underwrites contingency and event cancellation insurance globally.

```
✓ contingency.lloyds.com/verify — Underwrites contingency and event cancellation insurance
  ✓ fca.org.uk/register — Regulates UK general insurance firms
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Where Each Fits: Live Verify and Confirming Through the Placing Broker

Event cancellation and non-appearance cover is often placed in the Lloyd's market or with specialist insurers through a broker. The definitive record of a policy sits with the insurer or syndicate, and a venue or agent normally confirms cover by asking the placing broker. That remains the route for anything of substance. Live Verify answers a narrower question, whether the evidence of insurance a venue has been handed is what the insurer issued, and the two work side by side.

| | Confirming through the placing broker | Live Verify on the evidence of insurance | Unverified paper evidence |
| :--- | :--- | :--- | :--- |
| **Who can check** | Anyone who reaches the broker and gets an answer. | Anyone handed the evidence: a venue manager, an artist's agent, a lender. | Whoever receives it, trusting it as it stands. |
| **What the checker gets** | A broker's confirmation, and answers on triggers, exclusions and endorsements. | Confirmation that the insurer or broker issued this exact document, with these limits, dates and endorsements, and whether it has since been withdrawn. | A document whose dates or limits may have been edited. |
| **What the promoter shares** | Policy details, discussed with the checker by the broker. | Only the evidence of insurance for that event. | Only the document. |
| **Reach** | Any broker who answers, often in another time zone. | Global in principle: any insurer or broker, in any country, that publishes hashes on its own domain. | Universal, but untrusted. |
| **Speed and cost** | Free; depends on office hours and response times. | A few seconds per check: one web lookup, with no fee to the standard. | Free and immediate. |
| **What it needs** | An independently found contact and a broker willing to respond. | The insurer or broker to publish hashes, and Live Verify-aware software on the checker's device. No insurer or broker does this yet. | Nothing. |
| **Best suited to** | Any question about what the policy actually covers. | A quick check at booking or at the loading dock. | Nothing where an event's finances depend on it. |

**Where each fits:** the insurer's own records, reached through the placing broker, are the definitive source on a policy, and a call to that broker is the right step for any question of substance. A venue manager in the days before an event may not get an answer in time. Live Verify lets them check the evidence of insurance they hold, including its endorsements, against the issuer's domain on the spot.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).

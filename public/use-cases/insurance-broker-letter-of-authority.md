---
title: "Insurance Broker Letter of Authority"
category: "Delegated Authority"
volume: "Medium"
retention: "Authority period + 6 years (regulatory record-keeping, dispute resolution)"
slug: "insurance-broker-letter-of-authority"
verificationMode: "clip"
tags: ["insurance", "broker", "letter-of-authority", "broker-of-record", "delegated-authority", "london-market", "lloyds", "surplus-lines", "sub-brokering", "scope-of-authority"]
furtherDerivations: 1
---

## What is a Broker Letter of Authority?

When a company or individual appoints an insurance broker, the broker needs to demonstrate to insurers and underwriters that they are authorized to act on the insured's behalf. The instrument is a **letter of authority** (LoA) — sometimes called a **broker of record letter** (BoR) — confirming that the broker has been appointed to place insurance on the insured's behalf, within a defined scope.

Insurers and underwriters rely on the LoA before quoting, binding cover, or processing mid-term adjustments. If the authority is fabricated, expired, or broader than the insured actually granted, the consequences fall on everyone: the insured may be bound to cover they did not authorize, the insurer may have written risk on a submission that lacked proper instruction, and claims may be disputed years later on grounds of unauthorized placement.

## The Problem

Letters of authority are typically PDF documents or letters on the insured's headed paper. They are easy to fabricate and difficult to verify in real time:

- **No central registry.** There is no lookup service where an underwriter can check whether a broker's claimed authority is current. The underwriter trusts the document at face value.
- **Scope ambiguity.** A broker may be authorized for property insurance but present themselves as authorized for the full programme including liability, D&O, and cyber. The LoA may be vague enough to support the broader reading, or may have been edited.
- **Stale authority.** Broking relationships end — the insured appoints a new broker, the old one is terminated. But the old broker may continue approaching the market using the previous LoA, especially if renewal terms are favourable and they want to retain the account.
- **Sub-brokering without consent.** A broker delegates placement to a sub-broker. The insured appointed the original broker, not the sub-broker. The sub-broker may have no direct relationship with the insured at all.
- **Broker of record disputes.** Two brokers each claim to be the appointed broker for the same account. The insured may have appointed one and failed to formally terminate the other. Underwriters are caught in the middle, unsure whose instructions to follow.

## 1. Broker Letter of Authority

The insured issues a verifiable claim confirming the broker's appointment:

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 1px solid #1a3c5e; background: #fff; padding: 0;">
  <div style="background: #1a3c5e; color: #fff; padding: 15px;">
    <div style="font-weight: bold; font-size: 1.1em;"><span verifiable-text="start" data-for="brokerauthority"></span>BROKER LETTER OF AUTHORITY</div>
    <div style="font-size: 0.8em;">Appointment of Insurance Broker</div>
  </div>
  <div style="padding: 20px; font-size: 0.9em; line-height: 1.6;">
    <p><strong>Insured:</strong> Northbridge Services Ltd<br>
    <strong>Broker:</strong> Turner Risk Solutions (turnerrisk.co.uk)<br>
    <strong>Scope:</strong> Property and liability insurance placement<br>
    <strong>Market:</strong> London market and UK domestic<br>
    <strong>Effective:</strong> 01 Jan 2026<br>
    <strong>Expires:</strong> 31 Dec 2026<br>
    <strong>Exclusions:</strong> Directors & Officers, Cyber</p>
    <div data-verify-line="brokerauthority" style="border-top: 1px dashed #999; margin-top: 15px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
      title="Demo only: This is an illustrative example of the verification line">
      <span data-verify-line="brokerauthority">verify:northbridge.com/broker-authority/v</span> <span verifiable-text="end" data-for="brokerauthority"></span>
    </div>
  </div>
</div>

The verify line points to the **insured's** domain, not the broker's. The insured is the party granting authority; they control whether the claim remains valid. This is the same principle as [Corporate Signing Authority](view.html?slug=contract-signing-authority) — the company declares who is authorized.

## The Scope Boundary

The claim explicitly states what the broker is authorized to place and what they are not. In the example above, Turner Risk Solutions can approach insurers for property and liability cover, but cannot place Directors & Officers or Cyber insurance on Northbridge's behalf. An underwriter receiving a D&O submission from Turner for Northbridge can verify the claim and see that D&O is excluded from their authority.

This is not a soft boundary. If the broker places cover outside the stated scope, the insured has a pre-published, timestamped, verifiable record that the authority was never granted. The broker cannot argue that the scope was ambiguous — it was hashed and published before the placement was made.

## Fraud Patterns Addressed

| Pattern | How it works | How verification stops it |
|---------|-------------|--------------------------|
| **Fabricated authority** | Broker creates a fake LoA on the insured's letterhead | Underwriter verifies the hash — no matching claim at the insured's domain |
| **Exceeded scope** | Broker authorized for property only, places liability | Claim text shows the scope boundary; underwriter sees the exclusion |
| **Terminated broker** | Former broker continues acting after being replaced | Insured revokes the claim; verification returns REVOKED |
| **Broker of record dispute** | Two brokers claim the same account | Only one has a verifiable claim at the insured's domain; the other does not |
| **Unauthorized sub-brokering** | Broker delegates to a sub-broker without the insured's knowledge | The sub-broker has no verifiable claim from the insured; underwriter can see the gap |

## Verification Response

**Verification Response Format:**

```json
{
  "status": "verified",
  "allowedDomains": ["turnerrisk.co.uk", "*.turnerrisk.co.uk"]
}
```

The `allowedDomains` field allows the broker to embed the claim on their own website for insurer and underwriter reference. When an underwriter sees the claim on `turnerrisk.co.uk`, the browser extension confirms the domain is authorized by the insured to display it. If the same claim appeared on a different broker's site, the domain mismatch would be flagged.

**Status Indications:**

- **Active** — Broker is currently authorized within the stated scope
- **Expired** — Authority period has ended; renewal required
- **Revoked** — Insured has withdrawn the broker's authority before expiry
- **Superseded** — Replaced by a new claim (scope change, new broker appointment)

## Second-Party Use

The broker is the primary consumer. They use the verifiable claim to prove their appointment when:

- Approaching insurers and underwriters with new business or renewal submissions
- Responding to insurer requests for confirmation of authority
- Demonstrating to the insured's other advisers (solicitors, risk consultants) that they hold a current appointment
- Onboarding with new insurer panels or managing general agents

The broker embeds the claim on their website or includes the verification URL in placement submissions. The insured does not need to be involved each time the broker needs to prove their authority — the claim is self-service.

## Third-Party Use

**Insurers and underwriters** — Verify before quoting or binding cover. In the London market, the lead underwriter can check the broker's authority before writing the slip. Following-market underwriters can do the same.

**Lloyd's managing agents** — Confirm that the coverholder or broker presenting business to the syndicate has current authority from the insured.

**The insured's compliance team** — Monitor which claims are active for the company. If a broker's authority should have been terminated, the compliance team can revoke the claim immediately rather than relying on letter-based notification.

**Regulators** — FCA (UK), state insurance departments (US), BMA (Bermuda) — in investigations involving unauthorized placement, the verification trail provides timestamped evidence of what authority existed and when it was revoked.

**Sub-brokers** — If the insured authorizes sub-brokering, the primary broker's claim can reference the permitted arrangement. If it does not, the absence of any sub-brokering language is itself the evidence that sub-brokering was not authorized.

## Verification Architecture

**The Fix:** The insured publishes a hashed claim at their own domain confirming the broker's appointment and scope. The broker carries the claim text. Anyone receiving a submission from the broker can verify the claim against the insured's domain. Revocation is immediate — the insured updates the endpoint, and the old claim stops verifying.

**The placement flow:**

1. Insured appoints broker, issues verifiable claim
2. Broker approaches insurer with submission and claim reference
3. Underwriter verifies claim at insured's domain
4. Claim confirms scope — underwriter proceeds within those bounds
5. If scope does not cover the proposed class — underwriter requests direct confirmation from the insured or declines

**Termination flow:**

1. Insured terminates the broker's appointment
2. Insured revokes the claim at their domain
3. Former broker's claim text no longer verifies
4. New broker receives a new verifiable claim
5. Underwriters verifying the old broker's claim see REVOKED status and the absence of current authority

## Privacy Salt

The claim text contains the insured's company name, the broker's identity, and the scope of authority. None of this is sensitive — it is the same information that would appear on the letter of authority shared with insurers. No personal data is involved in the standard case (the insured is a company). Where the insured is an individual, the claim can be scoped to include only the individual's name and the broker's identity, consistent with what the broker would disclose to insurers in any case.

## Authority Chain

**Pattern:** Commercial

The insured issues broker authority claims to confirm that a named broker has been delegated insurance placement authority within a defined scope. Self-authorized by the insured as the party whose interests are being represented.

```
✓ northbridge.com/broker-authority/v — Issues broker letter of authority claims
```

Commercial issuer — self-authorized. Trust rests on the insured's domain reputation.

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Competition

| Method | Limitation |
|--------|-----------|
| **Paper letter of authority** | Easy to fabricate, no real-time status, no scope enforcement |
| **Email confirmation from insured** | Depends on the underwriter knowing the right contact; emails can be spoofed |
| **Broker management systems** | Insurer-specific; no cross-market standard; no insured-controlled revocation |
| **Lloyd's ATLAS / market systems** | Covers Lloyd's market only; does not address domestic or international placement |
| **Phone call to insured** | Slow, no audit trail, relies on reaching the right person |
| **Verifiable claim (this approach)** | Insured-controlled, real-time, scopable, revocable, cross-market |

<details>
<summary>UK — London Market and Domestic</summary>

The London market operates on a subscription basis — multiple insurers each take a share of the risk. The broker presents the slip to the lead underwriter, then to following markets. Each underwriter needs confidence that the broker has authority from the insured. In practice, lead underwriters sometimes check; following markets almost never do, relying on the lead's due diligence.

A verifiable claim changes this. Following-market underwriters can verify authority independently, at no cost, before scratching the slip. This is particularly relevant for delegated authority arrangements where coverholders place business on behalf of Lloyd's syndicates.

The FCA requires brokers to act in the client's best interests and within the scope of their appointment. A verifiable, revocable authority claim provides evidence for both the broker's compliance and the insured's control.
</details>

<details>
<summary>US — Standard and Surplus Lines</summary>

In the US, the broker of record letter (BoR) is the standard mechanism for establishing and transferring broker authority. BoR disputes are common — two agents or brokers each claiming to represent the same insured. State insurance departments receive complaints about unauthorized brokers, and carriers have internal procedures for resolving conflicting BoR submissions.

A verifiable claim issued by the insured resolves BoR disputes immediately: only the broker with a current, verified claim has authority. State insurance regulators could require or incentivize verifiable BoR claims as part of producer licensing requirements.

For surplus lines, where placement involves non-admitted carriers and sometimes multiple layers of brokering, the authority chain becomes longer and harder to verify. A verifiable claim from the insured anchors the chain at the source.
</details>

<details>
<summary>Bermuda</summary>

Bermuda's reinsurance and specialty insurance market is international and relationship-driven. Brokers place business with Bermuda carriers on behalf of insureds or cedants worldwide. Authority is typically established through broking agreements, but verification relies on trust and existing relationships.

A verifiable claim is useful where the Bermuda carrier has no prior relationship with the broker presenting business — they can verify authority with the insured directly, without phone calls or email exchanges across time zones.
</details>

<details>
<summary>European Union — Insurance Distribution Directive (IDD)</summary>

The Insurance Distribution Directive (2016/97/EU) requires intermediaries to act in the customer's best interests and disclose their capacity — whether they act for the customer, for the insurer, or independently. Broker authority documentation is part of this disclosure obligation.

EU member states implement IDD through national regulators (BaFin in Germany, ACPR in France, DNB in the Netherlands). Cross-border placement within the EU requires the broker to demonstrate authorization in their home state and notify the host state regulator. A verifiable authority claim from the insured simplifies the chain: the insurer in the host state can confirm the broker's appointment directly, complementing the regulatory passport.
</details>

## Further Derivations

- Scope amendments (insured broadens or narrows the broker's authority mid-term)
- Sub-brokering authorization (insured explicitly authorizes the broker to delegate to named sub-brokers)
- Multi-broker arrangements (insured appoints different brokers for different classes, each with a separate verifiable claim)

## See Also

Other delegated authority use cases:

- [Corporate Signing Authority](view.html?slug=contract-signing-authority) — The foundational pattern for verifiable delegation
- [Insurance Panel Membership](view.html?slug=insurance-panel-membership) — Provider-insurer network verification
- [Professional Indemnity Live Status](view.html?slug=professional-indemnity-live-status) — Insurance cover verification
- [Insurance Claims Adjuster Reports](view.html?slug=insurance-claims-adjuster-reports) — Adjuster authority and report verification

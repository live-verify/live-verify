---
title: "Certificates of Insurance (COI) for Contractors"
category: "Commercial Lines Insurance"
volume: "Large"
retention: "Contract term + 3-7 years"
slug: "certificates-of-insurance-contractors"
verificationMode: "clip"
tags: ["insurance", "coi", "acord-25", "contractor", "liability", "compliance", "construction"]
furtherDerivations: 1
---

## What is a Contractor COI?

If you hire a plumber to fix a leak or a massive construction crew to build a skyscraper, you need to see their Certificate of Insurance (COI).

This one-page paper (usually an ACORD 25 form) is the "Proof of Protection." It says: "If this contractor breaks your house or if a worker gets hurt, the insurance company will pay, not you."

COI fraud is rampant. Contractors often buy a policy for one day, print the COI, and then cancel the policy immediately. They show the "valid" paper to get hired, but they are actually uninsured. Live Verify provides a "Live Status" check to see if the policy was cancelled yesterday.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <span verifiable-text="start" data-for="coi"></span>
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;">ACORD 25               CERTIFICATE OF LIABILITY INSURANCE
═══════════════════════════════════════════════════════════════════

PRODUCER:                          INSURED:
Marsh McLennan Agency              Apex Construction Services, LLC
123 Main St, Boston, MA            400 Industrial Way
                                   Oakland, CA 94621

COVERAGE SUMMARY
───────────────────────────────────────────────────────────────────
Type of Insurance          Policy Number                    Limits
───────────────────────────────────────────────────────────────────
General Liability          GL-99887766                 $ 1,000,000
Workers Comp               WC-44221100                   Statutory

CERTIFICATE HOLDER:
The City of Oakland
1 Frank Ogawa Plaza, Oakland, CA

</pre>
<span data-verify-line="coi">verify:marsh.com/coi/v</span> <span verifiable-text="end" data-for="coi"></span>
</div>

## The Problem: Fake COI Fraud

- **Ghost Policies:** A contractor buys a policy for 1 day, prints the COI, then cancels the policy for a full refund. They carry the paper COI for 12 months.
- **Limit Inflation:** Editing a $1M policy PDF to read $10M to qualify for a larger project.
- **Date Stretching:** Changing an expired 2025 date to 2026.
- **Fabricated Endorsements:** Claiming "Additional Insured" status on the paper COI when the endorsement was never actually purchased.

## What Is Checked

Insured name, policy numbers (GL, Auto, Umbrella, WC), coverage limits, effective/expiration dates, certificate holder name, producer/broker ID, issuing carrier (NAIC code).

**Document Types:**
- **ACORD 25:** Certificate of Liability Insurance (Standard).
- **ACORD 28:** Evidence of Commercial Property Insurance.
- **Waiver of Subrogation:** Critical construction endorsement.
- **Additional Insured Endorsement:** Adding the property owner to the policy.

## What the Checker Sees

Shows the issuer domain (the Broker or Carrier) and the certificate standing.

**Status Indications:**
- **Valid** — Policies are in force and match the broker's system.
- **Cancelled** — One or more policies have been terminated.
- **Superseded** — An updated certificate has been issued (e.g., due to a limit change).
- **Expired** — The policies listed have reached their term end.

## Who Holds It

The Contractor (second party) receives the certificate of insurance from the broker or carrier (first party), keeps it, and may later hand it to third parties for various reasons, or never do so.

**Personal Record:** They have their own verified copy of the insurance coverage. Most of the time, the document sits in their business files—the verification value is latent, there *if needed*.

**Peace of Mind:** They can confirm at any time that the certificate matches what the broker's system recorded and the policies haven't been cancelled.

**Future Optionality:** If a project requires proof of insurance—whether for site access, bid submissions, or permit applications—they have cryptographic proof ready without needing to contact the broker.

## Who Checks It

The contractor (second party) may hand the verified document to various third parties:

**Project Owners / Developers**
**Liability Protection:** Ensuring that every contractor on a $100M project is fully insured. Verification prevents the common fraud where a contractor provides a COI, gets the contract, and then cancels the policy to save money.

**Compliance Platforms (Procore / Complia)**
**Automated Vetting:** These platforms can use the verification hash to instantly validate thousands of COIs, reducing the need for manual "Broker Verification Calls."

**Insurance Brokers**
**Workflow Efficiency:** Reducing the volume of "Is this COI real?" phone calls from third parties by providing a self-service verification URL.

## Who Issues It

**Issuer Types (First Party)**

- Insurance Brokers (Marsh, Aon, local agencies)
- Direct Carriers (Geico, Progressive, State Farm)
- Compliance Tech (Certificate management vendors)

**Privacy Salt:** Not required. Certificates of insurance contain many unpredictable variables: contractor company names, unique policy numbers (often alphanumeric), specific coverage limits (exact dollar amounts), effective/expiration dates, certificate holder names, producer names and locations, and multiple policy types. The combination of these certificate-specific details creates sufficient entropy to prevent hash enumeration attacks.

## Authority Chain

**Pattern:** Regulated

Zurich issues certificates of insurance for contractors and construction operations.

```
✓ coi.zurich.co.uk/verify — Issues certificates of insurance for contractors
  ✓ fca.org.uk/register — Regulates UK general insurance firms
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Where Each Fits: Live Verify and Industry Data Exchange

Insurers and brokers exchange policy data with each other through industry standards and data services built around ACORD forms, and some certificate-tracking services sit on top of those. They serve members and subscribers well. A site foreman or property owner is usually just handed a certificate of insurance by the contractor. Industry data exchange and Live Verify answer different questions and work side by side.

| | Industry data exchange | Live Verify on the certificate | Unverified paper or PDF certificate |
| :--- | :--- | :--- | :--- |
| **Who can check** | Insurers, brokers and subscribers connected to the service. | Anyone handed the certificate: a general contractor, a property manager, a homeowner. | Nobody; it can only be taken on trust. |
| **What the checker gets** | Structured policy data, as current as the last update from the carrier. | Confirmation that the broker or insurer issued this exact certificate, with these limits and dates, and whether it has been withdrawn. Not a guarantee that the policy has not since lapsed for non-payment unless the issuer updates it. | A form that may have been edited or copied from an old policy. |
| **What the contractor shares** | Nothing directly; the data passes between insurers and brokers. | Only the certificate. | Only the certificate. |
| **Reach** | Members and subscribers of that service. | Global in principle: any broker or insurer, in any country, that publishes hashes on its own domain. | Universal, but untrusted. |
| **Speed and cost** | Fast for those connected; membership or subscription comes first. | A few seconds per check: one web lookup, with no fee to the standard. | Free and immediate. |
| **What it needs** | A connection to the service and data supplied by the carrier. | The broker or insurer to publish hashes, and Live Verify-aware software on the checker's device. No broker or insurer does this yet. | Nothing. |
| **Best suited to** | Policy administration and tracking large numbers of certificates. | A one-off check by someone outside the industry before work starts. | Nothing where liability depends on it. |

**Where each fits:** industry data pools serve insurers and brokers exchanging policy data among themselves, and do that job well. A property owner or site foreman is not a member and is simply handed a certificate by the contractor. Live Verify lets them check that certificate, including its limits, against the broker's or insurer's domain, which extends the reach of the industry's data without changing how it is exchanged.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).

---
title: "Certificates of Insurance (COI) for Contractors"
category: "Commercial Lines Insurance"
volume: "Large"
retention: "Contract term + 3-7 years"
slug: "certificates-of-insurance-contractors"
tags: ["insurance", "coi", "acord-25", "contractor", "liability", "compliance", "construction"]
furtherDerivations: 1
---

## What is a Contractor COI?

If you hire a plumber to fix a leak or a massive construction crew to build a skyscraper, you need to see their **Certificate of Insurance (COI)**.

This one-page paper (usually an ACORD 25 form) is the "Proof of Protection." It says: "If this contractor breaks your house or if a worker gets hurt, the insurance company will pay, not you."

COI fraud is rampant. Contractors often buy a policy for one day, print the COI, and then cancel the policy immediately. They show the "valid" paper to get hired, but they are actually uninsured. Live Verify provides a "Live Status" check to see if the policy was cancelled yesterday.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <span verifiable-text="start" data-for="coi">[</span>
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
<span data-verify-line="coi">verify:marsh.com/coi/v</span> <span verifiable-text="end" data-for="coi">]</span>
</div>

## Data Verified

Insured name, policy numbers (GL, Auto, Umbrella, WC), coverage limits, effective/expiration dates, certificate holder name, producer/broker ID, issuing carrier (NAIC code).

**Document Types:**
- **ACORD 25:** Certificate of Liability Insurance (Standard).
- **ACORD 28:** Evidence of Commercial Property Insurance.
- **Waiver of Subrogation:** Critical construction endorsement.
- **Additional Insured Endorsement:** Adding the property owner to the policy.

## Data Visible After Verification

Shows the issuer domain (the Broker or Carrier) and the certificate standing.

**Status Indications:**
- **Valid** — Policies are in force and match the broker's system.
- **Cancelled** — One or more policies have been terminated.
- **Superseded** — An updated certificate has been issued (e.g., due to a limit change).
- **Expired** — The policies listed have reached their term end.

## Second-Party Use

The **Contractor** (second party) receives the certificate of insurance from the broker or carrier (first party), **keeps it**, and may later hand it to third parties for various reasons, or never do so.

**Personal Record:** They have their own verified copy of the insurance coverage. Most of the time, the document sits in their business files—the verification value is latent, there *if needed*.

**Peace of Mind:** They can confirm at any time that the certificate matches what the broker's system recorded and the policies haven't been cancelled.

**Future Optionality:** If a project requires proof of insurance—whether for site access, bid submissions, or permit applications—they have cryptographic proof ready without needing to contact the broker.

## Third-Party Use

The contractor (second party) may hand the verified document to various third parties:

**Project Owners / Developers**
**Liability Protection:** Ensuring that every contractor on a $100M project is fully insured. Verification prevents the common fraud where a contractor provides a COI, gets the contract, and then cancels the policy to save money.

**Compliance Platforms (Procore / Complia)**
**Automated Vetting:** These platforms can use the verification hash to instantly validate thousands of COIs, reducing the need for manual "Broker Verification Calls."

**Insurance Brokers**
**Workflow Efficiency:** Reducing the volume of "Is this COI real?" phone calls from third parties by providing a self-service verification URL.

## Verification Architecture

**The "Fake COI" Fraud Problem**

- **Ghost Policies:** A contractor buys a policy for 1 day, prints the COI, then cancels the policy for a full refund. They carry the paper COI for 12 months.
- **Limit Inflation:** Editing a $1M policy PDF to read $10M to qualify for a larger project.
- **Date Stretching:** Changing an expired 2025 date to 2026.
- **Fabricated Endorsements:** Claiming "Additional Insured" status on the paper COI when the endorsement was never actually purchased.

**Issuer Types (First Party)**

- Insurance Brokers (Marsh, Aon, local agencies)
- Direct Carriers (Geico, Progressive, State Farm)
- Compliance Tech (Certificate management vendors)

**Privacy Salt:** Not required. Certificates of insurance contain many unpredictable variables: contractor company names, unique policy numbers (often alphanumeric), specific coverage limits (exact dollar amounts), effective/expiration dates, certificate holder names, producer names and locations, and multiple policy types. The combination of these certificate-specific details creates sufficient entropy to prevent hash enumeration attacks.

## Jurisdictional Witnessing

A jurisdiction may require insurance brokers to retain a **witnessing firm** for regulatory compliance. The witnessing firm:

- Receives all hashes from the broker, and any subsequent changes to the certificate as they happen—which may manifest as a new hash, a status change (cancelled, superseded), or even a 404 (record deleted)
- Receives structured content/metadata (policy numbers, coverage limits, effective dates, carrier names)
- Does **NOT** receive plaintext (contractor financial details, proprietary risk assessments)
- Provides an immutable, timestamped audit trail—available to the jurisdiction on demand, to contractors/third parties during disputes, or as expert witness testimony in legal proceedings

This provides:
- **Non-repudiation:** Broker cannot deny issuing the certificate
- **Timestamp proof:** Certificate hash existed at a specific time
- **Regulatory audit:** State insurance departments can inspect the witness ledger
- **Resilience:** Verification works even if broker's systems go down

**Public Blockchain (Non-Party)**

Witnessing firms may periodically commit rollups to an inexpensive public blockchain, providing an ultimate immutability guarantee. The blockchain is a "non-party"—infrastructure, not a participant in the transaction. This creates multiple verification paths:

1. **Broker domain** — Direct check against the issuer
2. **Witnessing firm** — Independent confirmation with timestamp
3. **Public blockchain** — Decentralized trust anchor via rollup inclusion

## Competition vs. Central Databases (ACORD)

| Feature | Live Verify | ACORD Data Pool | Paper COI |
| :--- | :--- | :--- | :--- |
| **User Access** | **Universal.** Any site foreman/owner can verify. | **Restricted.** Requires expensive industry membership. | **Instant.** |
| **Trust Anchor** | **Domain-Bound.** Bound to the Broker/Insurer. | **Centralized.** Trust the ACORD database. | **Zero.** Easily forged. |
| **Integrity** | **Binds Content.** Proves the *Limits* match. | **Data-Only.** Doesn't verify the actual paper document. | **Vulnerable.** |
| **Freshness** | **Real-time.** Queries the broker's live file. | **Laggy.** Depends on batch uploads. | **Static.** |

**Why Live Verify wins here:** The "Handoff Gap." ACORD data pools are for insurance companies talking to each other. But in the real world, a property owner needs to trust the piece of paper they are holding from a contractor. Live Verify turns that paper into a **Live Link** to the source of truth, closing the gap between industry databases and the physical world.

---
title: "Commercial General Liability (CGL) Policies"
category: "Commercial Lines Insurance"
volume: "Large"
retention: "Policy term + 10 years"
slug: "commercial-general-liability"
tags: ["cgl", "insurance-policy", "liability", "contractor-insurance", "risk-management", "commercial-insurance"]
furtherDerivations: 1
---

## What is a CGL Policy?

**Commercial General Liability (CGL)** is the "Slip and Fall" insurance for a business. It protects a company if they are sued for bodily injury or property damage (e.g., a contractor accidentally burns down a client's garage).

The **Declarations Page** is the 1-page summary showing the "Limits" (e.g., $2,000,000 per occurrence).

Business owners must show these verified limits to win contracts. Fraudsters often "Inflate" their limits on a PDF (changing $500k to $2M) to qualify for big jobs they aren't actually insured for.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <span verifiable-text="start" data-for="cgl">[</span>
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;">THE TRAVELERS COMPANIES
Commercial General Liability
═══════════════════════════════════════════════════════════════════

                      POLICY DECLARATIONS

Policy #: CGL-99887766-26

Named Insured:        Heavy Haulers Construction, Inc.
Business Description: Structural Steel Erection

COVERAGE LIMITS
───────────────────────────────────────────────────────────────────
Coverage                                                    Amount
───────────────────────────────────────────────────────────────────
Each Occurrence                                        $ 2,000,000
General Aggregate                                      $ 4,000,000
Products-Completed Ops                                 $ 4,000,000

Policy Period: March 01, 2026 to March 01, 2027

</pre>
<span data-verify-line="cgl">verify:travelers.com/policy/v</span> <span verifiable-text="end" data-for="cgl">]</span>
</div>

## Data Verified

Named insured, business description (Class Code), coverage limits (Occurrence/Aggregate), policy number, effective/expiration dates, deductible amount, issuing carrier.

**Document Types:**
- **Policy Declarations Page:** The 1-page summary of coverage.
- **Binder:** Temporary 30-day proof of coverage.
- **Endorsement Schedule:** Listing specific changes (e.g., adding a project).

## Data Visible After Verification

Shows the issuer domain (`travelers.com`, `chubb.com`) and current policy status.

**Status Indications:**
- **In Force** — Policy is active and premiums paid.
- **Cancelled** — Coverage has been terminated (often due to non-payment or high claims).
- **Lapsed** — Renewal was not processed.
- **Pending Audit** — Coverage active but final premium subject to payroll audit.

## Second-Party Use

The **Business Owner** (second party) receives the policy declarations page from the carrier (first party), **keeps it**, and may later hand it to third parties for various reasons, or never do so.

**Personal Record:** They have their own verified copy of the liability coverage. Most of the time, the document sits in their insurance files—the verification value is latent, there *if needed*.

**Peace of Mind:** They can confirm at any time that the coverage matches what the carrier's system recorded and the policy hasn't been cancelled.

**Future Optionality:** If questions arise—whether for contract awards, lease negotiations, or compliance checks—they have cryptographic proof of coverage ready without needing to contact the carrier.

## Third-Party Use

The business owner (second party) may hand the verified document to various third parties:

**General Contractors (GCs)**
**Subcontractor Compliance:** Ensuring that every sub on the job-site is fully insured. Verification prevents the "Buy and Cancel" fraud where a sub buys a policy to get on-site and then cancels it immediately.

**Lenders / Banks**
**Risk Mitigation:** Verifying the CGL coverage of commercial borrowers to ensure they won't be bankrupted by a single lawsuit, which protects the lender's loan.

**Event Venues**
**Vendor Management:** Verifying the liability insurance of caterers, decorators, and performers before they set up on the property.

## Verification Architecture

**The "Fake Limit" Fraud Problem**

- **Ghost Policies:** Buying a policy, printing the papers, then cancelling it for a refund.
- **Limit Inflation:** Editing a $500k policy to read $2M to win a contract.
- **Class Code Fraud:** Claiming to be a "Florist" (low risk) to get a cheap rate, but showing a "Verified" looking paper to work as a "Steel Erector" (high risk).

**Issuer Types (First Party)**

- Commercial Carriers (Travelers, Chubb, Zurich, Hartford)
- Managing General Agents (MGAs)
- Self-Insured Groups

**Privacy Salt:** Not required. CGL policy declarations contain many unpredictable variables: business names, unique policy numbers, specific coverage limits (exact dollar amounts), business descriptions and class codes, effective/expiration dates, deductible amounts, and carrier identifiers. The combination of these policy-specific details creates sufficient entropy to prevent hash enumeration attacks.

## Jurisdictional Witnessing

A jurisdiction may require commercial liability insurers to retain a **witnessing firm** for regulatory compliance. The witnessing firm:

- Receives all hashes from the carrier, and any subsequent changes to the policy as they happen—which may manifest as a new hash, a status change (cancelled, lapsed, pending audit), or even a 404 (record deleted)
- Receives structured content/metadata (policy numbers, coverage limits, business descriptions, policy dates)
- Does **NOT** receive plaintext (business financial details, loss histories, underwriting notes)
- Provides an immutable, timestamped audit trail—available to the jurisdiction on demand, to business owners/third parties during disputes, or as expert witness testimony in legal proceedings

This provides:
- **Non-repudiation:** Carrier cannot deny issuing the policy
- **Timestamp proof:** Policy hash existed at a specific time
- **Regulatory audit:** State insurance departments can inspect the witness ledger
- **Resilience:** Verification works even if carrier's systems go down

**Public Blockchain (Non-Party)**

Witnessing firms may periodically commit rollups to an inexpensive public blockchain, providing an ultimate immutability guarantee. The blockchain is a "non-party"—infrastructure, not a participant in the transaction. This creates multiple verification paths:

1. **Carrier domain** — Direct check against the issuer
2. **Witnessing firm** — Independent confirmation with timestamp
3. **Public blockchain** — Decentralized trust anchor via rollup inclusion

## Competition vs. Broker Confirmation Calls

| Feature | Live Verify | Manual Broker Call | Scanned PDF |
| :--- | :--- | :--- | :--- |
| **Trust Anchor** | **Domain-Bound.** Bound to the Carrier. | **Human.** Relies on the broker's assistant answering honestly. | **Zero.** Easily forged. |
| **Speed** | **Instant.** 5-second scan. | **Slow.** Often takes 24-48 hours for a return call. | **Instant.** |
| **Availability** | **24/7.** Works on weekends/holidays. | **Business Hours Only.** | **Universal.** |
| **Integrity** | **Cryptographic.** Binds every digit. | **Vague.** "Yes, they have a policy." | **Vulnerable.** |

**Why Live Verify wins here:** The "Site Entrance" reality. A subcontractor arrives at a job-site on a Saturday morning. The GC's office is closed. The Sub's broker is closed. Live Verify allows the site foreman to verify the Sub's insurance **on the spot**, allowing work to proceed safely and legally without delays.

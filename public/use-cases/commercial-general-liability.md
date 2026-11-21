---
title: "Commercial General Liability (CGL) Policies"
category: "Commercial Lines Insurance"
volume: "Large"
retention: "Policy term + 10 years"
slug: "commercial-general-liability"
verificationMode: "clip"
tags: ["cgl", "insurance-policy", "liability", "contractor-insurance", "risk-management", "commercial-insurance"]
furtherDerivations: 1
---

## What is a CGL Policy?

**Commercial General Liability (CGL)** is the "Slip and Fall" insurance for a business. It protects a company if they are sued for bodily injury or property damage (e.g., a contractor accidentally burns down a client's garage).

The Declarations Page is the 1-page summary showing the "Limits" (e.g., $2,000,000 per occurrence).

Business owners must show these verified limits to win contracts. Fraudsters often "Inflate" their limits on a PDF (changing $500k to $2M) to qualify for big jobs they aren't actually insured for.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <span verifiable-text="start" data-for="cgl"></span>
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
<span data-verify-line="cgl">verify:travelers.com/policy/v</span> <span verifiable-text="end" data-for="cgl"></span>
</div>

## The Problem: Fake Limit Fraud

- **Ghost Policies:** Buying a policy, printing the papers, then cancelling it for a refund.
- **Limit Inflation:** Editing a $500k policy to read $2M to win a contract.
- **Class Code Fraud:** Claiming to be a "Florist" (low risk) to get a cheap rate, but showing a "Verified" looking paper to work as a "Steel Erector" (high risk).

## What Is Checked

Named insured, business description (Class Code), coverage limits (Occurrence/Aggregate), policy number, effective/expiration dates, deductible amount, issuing carrier.

**Document Types:**
- **Policy Declarations Page:** The 1-page summary of coverage.
- **Binder:** Temporary 30-day proof of coverage.
- **Endorsement Schedule:** Listing specific changes (e.g., adding a project).

## What the Checker Sees

Shows the issuer domain (`travelers.com`, `chubb.com`) and current policy status.

**Status Indications:**
- **In Force** — Policy is active and premiums paid.
- **Cancelled** — Coverage has been terminated (often due to non-payment or high claims).
- **Lapsed** — Renewal was not processed.
- **Pending Audit** — Coverage active but final premium subject to payroll audit.

## Who Holds It

The Business Owner (second party) receives the policy declarations page from the carrier (first party), keeps it, and may later hand it to third parties for various reasons, or never do so.

**Personal Record:** They have their own verified copy of the liability coverage. Most of the time, the document sits in their insurance files—the verification value is latent, there *if needed*.

**Peace of Mind:** They can confirm at any time that the coverage matches what the carrier's system recorded and the policy hasn't been cancelled.

**Future Optionality:** If questions arise—whether for contract awards, lease negotiations, or compliance checks—they have cryptographic proof of coverage ready without needing to contact the carrier.

## Who Checks It

The business owner (second party) may hand the verified document to various third parties:

**General Contractors (GCs)**
**Subcontractor Compliance:** Ensuring that every sub on the job-site is fully insured. Verification prevents the "Buy and Cancel" fraud where a sub buys a policy to get on-site and then cancels it immediately.

**Lenders / Banks**
**Risk Mitigation:** Verifying the CGL coverage of commercial borrowers to ensure they won't be bankrupted by a single lawsuit, which protects the lender's loan.

**Event Venues**
**Vendor Management:** Verifying the liability insurance of caterers, decorators, and performers before they set up on the property.

## Who Issues It

**Issuer Types (First Party)**

- Commercial Carriers (Travelers, Chubb, Zurich, Hartford)
- Managing General Agents (MGAs)
- Self-Insured Groups

**Privacy Salt:** Not required. CGL policy declarations contain many unpredictable variables: business names, unique policy numbers, specific coverage limits (exact dollar amounts), business descriptions and class codes, effective/expiration dates, deductible amounts, and carrier identifiers. The combination of these policy-specific details creates sufficient entropy to prevent hash enumeration attacks.

## Authority Chain

**Pattern:** Regulated

Carriers must be licensed by state insurance regulators to issue commercial liability policies.

```
✓ cgl.travelers.com/verify — Issues commercial general liability policies
  ✓ insurance.ca.gov — Regulates insurance companies in California
    ✓ california.gov — California state government
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Where Each Fits: Live Verify and Calling the Broker

When a contractor shows a certificate of liability insurance, the usual way to confirm it is to call or email the broker or agent who issued it. That remains the fuller check, because a person can answer questions. Live Verify answers a narrower question, whether the carrier or broker stands behind the certificate being shown, and the two work side by side.

| | Calling or emailing the broker | Live Verify on the certificate | Unverified scanned PDF |
| :--- | :--- | :--- | :--- |
| **Who can check** | Anyone who finds the broker's real contact details and gets a reply. | Anyone handed the certificate: a general contractor, a site foreman, a property manager. | Nobody; it can only be taken on trust. |
| **What the checker gets** | A person's confirmation, and answers on exclusions, endorsements and additional insureds. | Confirmation that the carrier or broker issued this exact certificate, with these limits and dates, and whether it has since been withdrawn. Nothing beyond what the certificate says. | A form whose limits or dates may have been edited. |
| **What the contractor shares** | Their policy details, discussed with the checker by the broker. | Only the certificate. | Only the certificate. |
| **Reach** | Any broker who answers. | Global in principle: any carrier or broker, in any country, that publishes hashes on its own domain. | Universal, but untrusted. |
| **Speed and cost** | Free; office hours only, and a reply can take a day or two. | A few seconds per check, at any hour: one web lookup, with no fee to the standard. | Free and immediate. |
| **What it needs** | An independently found contact and a broker willing to respond. | The carrier or broker to publish hashes, and Live Verify-aware software on the checker's device. No carrier or broker does this yet. | Nothing. |
| **Best suited to** | Questions about coverage, and anything unusual. | A quick check before a subcontractor starts work, including at weekends. | Nothing where liability depends on it. |

**Where each fits:** a call to the broker remains the fuller check, since a person can answer questions about exclusions and endorsements. It depends on office hours and can take a day or two. Live Verify covers the moment when a subcontractor turns up on a Saturday and the foreman needs to know whether the carrier stands behind the certificate being shown, leaving the broker call for anything that needs discussion.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).

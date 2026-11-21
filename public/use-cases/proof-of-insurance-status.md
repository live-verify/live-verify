---
title: "Proof of Insurance (Policyholder Confirmation)"
category: "Personal Lines Insurance"
volume: "Very Large"
retention: "Policy term + 2 years"
slug: "proof-of-insurance-status"
verificationMode: "clip"
tags: ["insurance", "proof-of-insurance", "policyholder", "liability", "landlord", "mandate", "public-liability", "employers-liability", "motor", "professional-indemnity", "gig-economy"]
furtherDerivations: 2
---

## What is Proof of Insurance?

A plumber arrives to fix your boiler. You ask: "Are you insured?" He says yes. You have no way to check. A bouncy castle company sets up at your child's party. Their invoice says "fully insured." You take their word for it. A freelancer starts a contract — the client's procurement team asks for proof of professional indemnity. The freelancer emails a PDF certificate. The procurement officer glances at it. Nobody calls the insurer.

This is the gap. Proof of insurance is demanded constantly — by landlords, clients, venue operators, event organisers, mortgage lenders, letting agents, and regulators — but the verification is almost always "look at a document the claimant provides." The document is trivially forged. Worse, even genuine certificates can be stale: the policy may have lapsed, been cancelled for non-payment, or been voided since the certificate was issued.

Existing use cases in this repository cover specific insurance *policy types* (contractor COIs, motor insurance, cyber policies, etc.) from the insurer's perspective. This use case is different: it covers the policyholder's right to generate a verifiable proof of active coverage — a mandated, free, time-limited confirmation that the policyholder can share with anyone who needs it.

This is one of the stronger portable-claim cases in the corpus. Unlike government IDs or live registry credentials, the relying party often does not have direct insurer-system access, yet still needs a current answer from the insurer rather than a broker PDF or an eye-test.

The mandate model: government requires insurers to let policyholders generate a time-limited, salted, hash-based confirmation of active coverage. The salt expires (e.g., 30 days), so stale proofs stop working. The insurer bears the hosting cost as a condition of operating under licence.

<div style="max-width: 550px; margin: 24px auto; font-family: sans-serif; border: 1px solid #ccc; background: #fff; padding: 20px; position: relative;">
  <div style="font-size: 0.85em; color: #555; border-bottom: 1px solid #ddd; padding-bottom: 10px; margin-bottom: 15px;">
    <strong>From:</strong> sarah.mcdonald@gmail.com<br>
    <strong>To:</strong> procurement@meridian-consulting.co.uk<br>
    <strong>Subject:</strong> Professional indemnity — proof of cover
  </div>
  <div style="font-size: 0.95em; color: #333; margin-bottom: 15px;">
    Hi Procurement,<br><br>
    Here's my current PI cover as requested:
  </div>
  <div style="font-family: 'Courier New', monospace; background: #f9f9f9; padding: 15px; border: 1px solid #999; font-size: 1em; color: #000; line-height: 1.6;">
    <span verifiable-text="start" data-for="ins"></span>Hiscox Ltd<br>
    Sarah J. McDonald<br>
    Professional Indemnity<br>
    Cover: £1,000,000<br>
    Valid: 15 Jan 2026 – 14 Jan 2027<br>
    Status as at: 17 Mar 2026<span verifiable-text="end" data-for="ins"></span><br>
    <span data-verify-line="ins">verify:hiscox.com/policycheck</span>
  </div>
</div>

<div style="max-width: 550px; margin: 24px auto; font-family: 'Courier New', monospace; background: #f9f9f9; padding: 15px; border: 1px solid #999; font-size: 1em; color: #000; line-height: 1.6; position: relative;">
  Aviva plc<br>
  Marcus B. Thompson<br>
  Public Liability<br>
  Cover: £5,000,000<br>
  Valid: 1 Apr 2025 – 31 Mar 2026<br>
  Status as at: 17 Mar 2026<br>
  <span data-verify-line="bare25">verify:aviva.co.uk/policycheck</span>
</div>

## The Problem: Proof of Insurance Fraud

A homeowner, client, venue or landlord asks a contractor or freelancer for proof of insurance and receives a PDF certificate. Nobody calls the insurer, so the reader cannot tell whether the certificate is genuine or whether the policy behind it is still in force. The gap shows only when something goes wrong and there is no cover to claim against.

- **PDF forgery:** Certificate of insurance templates are widely available. Change the name, dates, and cover amount — done. Most recipients cannot distinguish a forgery from a genuine certificate.
- **Stale certificates:** A genuine certificate from 6 months ago for a policy that has since lapsed. The document is real; the cover is not.
- **Cover inflation:** Editing cover amounts (£1M becomes £5M) or adding coverage types not actually held.
- **Ghost policies:** Entirely fabricated insurers with professional-looking websites. The "insurer" doesn't exist.
- **Broker fraud:** Rogue brokers issuing certificates for policies they never bound, pocketing the premiums.

Live Verify addresses these because the hash resolves against the insurer's own domain. A forged certificate produces a hash the insurer never published. A lapsed policy returns "Lapsed." A ghost insurer's domain doesn't match any recognised insurer.

## What Is Checked

Insurer name, policyholder full name, insurance type (public liability, professional indemnity, employers' liability, motor, etc.), cover amount, policy validity dates, status-as-at date.

**Document Types:**
- **Professional Indemnity Confirmation:** For freelancers, consultants, and professional service providers.
- **Public Liability Confirmation:** For tradespeople, event providers, venue hirers.
- **Employers' Liability Confirmation:** Legally required for any UK employer; must be displayed.
- **Motor Insurance Confirmation:** Active policy for a named vehicle.
- **Landlord Insurance Confirmation:** Building and liability cover for rental properties.

Motor is the weaker sub-case here, because some jurisdictions already have insurer-linked or state-linked live databases that may be better than a portable proof artifact.

**Privacy Salt:** Required. Policyholder name + insurer + cover type is guessable. The salt is time-limited (e.g., 30-day expiry) and generated by the policyholder through the insurer's portal or app. When the salt expires, the hash stops resolving — forcing the policyholder to generate a fresh proof for ongoing engagements.

## What the Checker Sees

Shows the insurer domain (`hiscox.com`, `aviva.co.uk`, `axa.co.uk`) and policy status.

**Status Indications:**
- **Active** — Policy is in force, premiums current.
- **Lapsed** — Policy expired or premiums unpaid. Cover no longer in effect.
- **Cancelled** — Policy actively cancelled by insurer or policyholder.
- **Suspended** — Temporarily inactive (e.g., pending investigation or premium dispute).
- **Claim Pending** — Policy active but an open claim exists (relevant for some third-party decisions).

## Who Holds It

The Policyholder benefits from verification.

**Winning Work:** Freelancers and tradespeople lose contracts because clients can't verify insurance quickly. A verifiable proof from the insurer's domain is instant and trustworthy — no waiting for the broker to email a certificate.

**Landlord Compliance:** Landlords must prove buildings insurance and sometimes landlord liability to mortgage lenders and letting agents. Currently: email a PDF, wait for someone to eyeball it. With Live Verify: share the hash, done.

**Gig Economy:** Delivery drivers, couriers, and platform workers need to prove insurance to multiple platforms simultaneously. A single verifiable claim works across all of them.

**Event Organisers:** Anyone hiring a venue, running a market stall, or operating a food truck needs public liability proof. Currently a manual PDF exchange; verifiable claims eliminate the back-and-forth.

## Who Checks It

**Clients & Procurement Teams**
**Contractor Onboarding:** "Does this contractor have valid PI/PL cover?" Currently relies on ACORD-25 certificates or broker-issued PDFs. A hash check against the insurer's domain confirms cover is active *right now*, not just when the certificate was issued.

**Venue Operators & Event Managers**
**Hirer Liability Check:** Venues require hirers to prove public liability. Festival and event organisers need to verify every vendor's cover. Currently a manual document collection exercise; Live Verify makes it a bulk hash check.

**Letting Agents & Mortgage Lenders**
**Landlord Insurance Verification:** Letting agents managing properties on behalf of landlords need proof that buildings insurance is active. Mortgage lenders require it as a loan condition. Currently: annual PDF chase. With verification: automated hash check.

**Regulators & Licensing Authorities**
**Licence Condition Monitoring:** Many licensed activities (taxis, construction, food service, childcare) require proof of insurance as a licence condition. Regulators could monitor compliance by checking hashes against insurer endpoints — detecting lapses in near-real-time rather than at annual renewal.

**Background Checking Organisations**
**Contractor Pre-qualification:** Firms like Avetta, ISNetworld, and CHAS verify contractor insurance as part of pre-qualification. Live Verify gives them a direct check against the insurer rather than relying on uploaded documents.

## Who Issues It

**Issuer Types** (First Party)

**Insurers:** Hiscox, Aviva, AXA, Zurich, Allianz, RSA, and all licensed insurers.
**Lloyd's Syndicates:** Via managing agents operating verification endpoints.
**Insurtechs:** Zego (gig economy motor), Dinghy (freelancer), Tapoly (on-demand).

**Mandate Justification:** Insurers are already regulated by the FCA (UK), state insurance commissioners (US), APRA (Australia), etc. Requiring them to offer free, time-limited hash-based proof of active coverage is a minimal obligation that eliminates an entire fraud category. The Motor Insurers' Database (MID) already proves the model works for motor insurance — this extends it to all policy types.

**Time-Limited Salt Model:** The policyholder logs into their insurer's portal/app and requests a verification code. The insurer generates a salt valid for N days (configurable, e.g., 7, 14, or 30 days). The salt is embedded in the verification block. After expiry, the hash stops resolving — the policyholder must generate a new one. This prevents:
- Stale proofs circulating after cancellation
- Ex-employees using old employer's liability proofs
- Divorced parties misusing joint policy confirmations

## Strong vs. Weaker Sub-Cases

**Strong**
- public liability
- professional indemnity
- employers' liability
- landlord/buildings insurance confirmations
- contractor pre-qualification and venue onboarding

These are strong because the proof is constantly exchanged outside insurer systems, and the verifier usually has no better native path than a broker PDF.

**Weaker**
- motor insurance in jurisdictions that already have MID/DMV-style live databases

That sub-case still benefits from portability, but it is more complementary than dominant.

## Authority Chain

**Pattern:** Institutional (Regulated)

```
✓ hiscox.com/policycheck — Insurer confirming active professional indemnity cover
✓ aviva.co.uk/policycheck — Insurer confirming active public liability cover
✓ zego.com/policycheck — Insurtech confirming active gig economy motor cover
```

Trust derives from the insurer's regulatory status. FCA-authorised insurers, state-licensed carriers, and Lloyd's syndicates are all identifiable by domain.

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## International Equivalents

| Country | Regulatory Body | Notes |
|---------|----------------|-------|
| **UK** | FCA, PRA | MID exists for motor; no equivalent for liability/PI. Employers' liability certificates must be displayed by law |
| **USA** | State insurance commissioners | ACORD-25 certificates are the standard; widely forged. No centralised verification for most policy types |
| **Canada** | Provincial regulators (FSRA, AMF, etc.) | Certificate of insurance required for most commercial contracts |
| **Australia** | APRA, ASIC | Public liability proof required for many licences and venue hire |
| **EU** | EIOPA + national regulators | Motor insurance databases exist in most countries; other types lack centralised verification |

## Where Each Fits: Live Verify, Broker Certificates and the Motor Insurers' Database

Proof of insurance today usually means a certificate issued by the broker, such as the ACORD 25 form in the US, and for motor cover in the UK, a check against the Motor Insurers' Database (MID). Coverage depends on where you are and the type of cover: some countries have a national database for motor insurance, few have one for anything else. These answer different questions from a policyholder confirmation checkable with Live Verify, and they work side by side. <!-- TODO(verify): the extent of public access to the Motor Insurance Database -->

| | Motor Insurers' Database (MID) | ACORD 25 or broker certificate | Live Verify on the policyholder confirmation |
| :--- | :--- | :--- | :--- |
| **Who can check** | Police and insurers fully; the public in limited circumstances. | Anyone handed the certificate. | Anyone handed the confirmation within its validity period: a landlord, a client, a platform. |
| **What the checker gets** | Whether a vehicle is recorded as insured, from a central database. | A broker's form, which may have been edited and does not show later cancellation. | Confirmation that the insurer issued this confirmation of active cover, and its current status, such as lapsed. |
| **What the policyholder shares** | The vehicle registration. | The certificate. | Only the confirmation they chose to hand over; under the time-limited model it stops working when its salt expires. |
| **Reach** | Motor insurance in the UK; other countries have their own databases or none. | All policy types, wherever the form is used. | Global in principle: any insurer, in any country, that publishes hashes on its own domain, for any type of cover. |
| **Speed and cost** | Fast for those with access. | Immediate, but unchecked. | A few seconds per check: one web lookup, with no fee to the standard; under the mandate model described above, free to the policyholder. |
| **What it needs** | Insurers reporting to the database. | Nothing beyond the broker issuing it. | The insurer to publish hashes, and Live Verify-aware software on the checker's device. No insurer does this yet. |
| **Best suited to** | Motor enforcement. | Routine paperwork, where taken on trust. | Public liability, professional indemnity, employers' liability and other cover with no central database. |

**Where each fits:** For motor cover, a national database such as the MID already gives enforcement a fast central check, and Live Verify adds little there. For public liability, professional indemnity, employers' liability and similar cover, there is usually no such database, and a portable confirmation from the insurer is the best available link between policyholder and relying party.

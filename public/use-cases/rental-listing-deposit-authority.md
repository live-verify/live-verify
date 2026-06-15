---
title: "Rental Listing and Deposit Authority"
category: "Real Estate & Property"
volume: "Very Large"
retention: "Listing life plus tenancy limitation period (typically 6-7 years)"
slug: "rental-listing-deposit-authority"
verificationMode: "both"
tags: ["rental", "letting-agent", "landlord", "tenant", "deposit", "property-listing", "client-money", "authorized-agent", "wire-fraud", "housing-fraud"]
furtherDerivations: 1
---

# Rental Listing and Deposit Authority

A common rental scam is simple: a person advertises a flat or house they do not control, collects application fees or multiple holding deposits, then disappears. The advert may use copied photos, a plausible address, a fake tenancy agreement, and bank details in the scammer's name. The victim is under time pressure because housing is scarce and the "landlord" claims other applicants are waiting.

Live Verify cannot prove that a stranger is honest. It can, however, make the critical pre-payment claims verifiable:

- This listing was issued by the named letting agent or landlord platform
- This agent is authorized to market this property
- This deposit payment instruction is the one the issuer currently stands behind
- This client-money or deposit-protection route is valid
- This holding deposit has been received and recorded

The check happens before money moves.

## Data Verified

Property address, listing reference, issuer name, agent or landlord identity, authorization basis, permitted payment recipient, deposit amount or cap, deposit scheme or client-money account reference, issue date, expiry date, and verification URL.

**Document Types:**
- **Rental Listing Authority Claim** — Confirms the listing is genuine and the named agent or platform is authorized to market the property.
- **Deposit Payment Instruction** — Confirms the correct recipient account and reference for a holding deposit, tenancy deposit, or first rent payment.
- **Holding Deposit Receipt** — Confirms funds were received and recorded against a specific applicant/listing.
- **Deposit Protection Acknowledgment** — Confirms the tenancy deposit has been protected with an approved scheme.
- **Viewing Agent Credential** — Confirms the person showing the property is currently authorized by the agency or platform.

**Privacy Salt:** Recommended. Property addresses may be public, but applicant names, payment references, viewing appointments, and deposit amounts can be enumerable or sensitive. Issuers should add a random reference line to applicant-specific claims.

## Example: Verifiable Deposit Instruction

<div style="max-width: 620px; margin: 24px auto; font-family: Arial, sans-serif; border: 1px solid #355c7d; background: #fff; padding: 0;">
  <div style="background: #355c7d; color: #fff; padding: 15px;">
    <div style="font-weight: bold; font-size: 1.1em;"><span verifiable-text="start" data-for="rentaldepositauth"></span>Cedar & Co Lettings</div>
    <div style="font-size: 0.85em;">Verified Holding Deposit Instruction</div>
  </div>
  <div style="padding: 20px; font-size: 0.92em; line-height: 1.6;">
    <p><strong>Property:</strong> Flat 3, 18 Willow Road, Bristol BS6 5AB<br>
    <strong>Listing Ref:</strong> CED-2026-48172<br>
    <strong>Applicant:</strong> Priya Nair<br>
    <strong>Holding Deposit:</strong> £346.15<br>
    <strong>Payee:</strong> Cedar & Co Lettings Client Account<br>
    <strong>Bank Ref:</strong> CED-48172-PN<br>
    <strong>Valid Until:</strong> 18 June 2026, 17:00</p>
    <p style="font-size: 0.86em; color: #555;">This payment instruction is valid only for the listed property and applicant. Do not pay a personal account.</p>
    <div style="margin-top: 15px; font-family: 'Courier New', monospace; font-size: 0.78em; color: #355c7d; border-top: 1px dashed #aaa; padding-top: 10px; text-align: center;">
      <span data-verify-line="rentaldepositauth">verify:cedarlettings.example/deposits</span> <span verifiable-text="end" data-for="rentaldepositauth"></span>
    </div>
  </div>
</div>

The prospective tenant selects or scans the whole block before sending money. If the hash verifies against the letting agent's domain, the app can show that the agent currently stands behind the exact payment instruction. If a scammer changes the bank details, applicant name, deposit amount, property address, or expiry date, the hash changes and verification fails.

## Data Visible After Verification

Shows the issuer domain and the current status of the listing or payment instruction.

**Status Indications:**
- **Active** — Listing or payment instruction is current.
- **Received** — Deposit received and recorded for the applicant/listing.
- **Protected** — Tenancy deposit registered with an approved deposit scheme.
- **Withdrawn** — Listing removed or payment instruction cancelled.
- **Expired** — Instruction or holding-deposit window has expired.
- **Superseded** — New instruction issued; old bank details must not be used.
- **Fraud Warning** — Issuer has flagged the listing, domain, agent, or payment route as compromised.

Responses should not echo full applicant identity, full bank account details, or unnecessary PII. The verifier already has the instruction text; the endpoint confirms status.

## Second-Party Use

The prospective tenant is the second party. They receive a listing, viewing confirmation, payment instruction, or deposit receipt and need to decide whether to trust it.

**Before Sending Money:** Tenant verifies that the payment instruction comes from the real agent or platform domain and has not been edited.

**After Payment:** Tenant verifies the holding deposit receipt and keeps it as evidence if the agent later claims no payment was received.

**Before Move-In:** Tenant verifies deposit protection, first-rent instructions, and final tenancy paperwork before handing over larger sums.

**During a Dispute:** Tenant sends verified payment/deposit documents to a bank, housing authority, court, or deposit adjudicator.

## Third-Party Use

**Banks and Payment Providers**

Banks can ask customers to verify rental payment instructions before authorizing high-risk first payments to new payees. The verification result gives the bank a structured risk signal: known issuer domain, active instruction, matching payee, or failure.

**Property Portals**

Portals can require agents to attach verifiable listing authority claims. A listing can display "verified by agent domain" or warn users when a payment instruction is not issuer-backed.

**Deposit Protection Schemes**

Schemes can issue verifiable deposit-protection acknowledgments. Tenants can check that the protected deposit exists without trusting a forwarded PDF or screenshot.

**Housing Authorities and Trading Standards**

Investigators can verify whether a disputed listing or payment instruction was ever issued by the claimed agent. This helps distinguish forged adverts from genuine documents later misused.

**Police and Fraud Teams**

When multiple victims report the same property advert, investigators can compare failed verification attempts, copied text, bank references, and claimed issuer domains without needing victims to upload entire document bundles.

## Verification Architecture

**The Rental Deposit Scam Problem**

- **Fake Listing:** Scammer copies photos from a real advert and creates a new advert under their own contact details.
- **Authority Fabrication:** Scammer claims to be the landlord, agent, or "property manager" but has no right to let the property.
- **Payment Instruction Swap:** Genuine-looking documents are altered to replace the client account with a personal account.
- **Multiple Deposit Collection:** Scammer collects holding deposits from many applicants for the same nonexistent or unavailable tenancy.
- **Pressure Tactics:** "Pay today or lose the flat" discourages callback verification and careful domain checking.
- **Post-Payment Denial:** A dishonest actor claims a deposit was never received or was for a different property/applicant.

**Issuer Types**

- Letting agents and property managers operating under their own domains
- Large build-to-rent operators
- Student housing providers
- Property portals with verified-landlord programs
- Deposit protection schemes
- Local authority licensing or landlord registration systems
- Banks or escrow providers offering protected rental-deposit accounts

## Authority Chain

The verifier must decide whether the issuer domain is authoritative for the claim.

Strong examples:

- `foxtons.co.uk` or another known agency domain confirming its own listing and client account
- `depositprotection.com` confirming a protected UK tenancy deposit
- A university housing office domain confirming approved student accommodation
- A local authority landlord-licensing domain confirming a registered HMO landlord
- A regulated escrow or client-money account provider confirming receipt

Weak examples:

- A personal email address sending bank details
- A brand-new domain imitating an agency name
- A generic document-signing link that only proves someone signed a PDF
- A property portal message that contains unverified off-platform payment instructions

Live Verify should make this visible: "Verified by `cedarlettings.example`" is useful only if the tenant recognizes or can assess that domain as the real agent or authorized platform.

## Platform Integration

**Listing Pages**

Property portals can embed a verifiable text block for listing authority and allowed payment routes. Browser Clip mode can verify the block in-place.

**Messages and Email**

When agents send viewing confirmations or payment instructions, the claim block travels as plain text. The recipient can select it in email, SMS, WhatsApp, or a PDF.

**In-Person Viewings**

Viewing agents can carry a verifiable credential or appointment instruction. A tenant at the door can scan the agent's phone or badge before entering a private property with a stranger.

**Bank Payment Flows**

Banks can add a "Verify rental deposit instruction" step when the payee is new and the payment resembles a holding deposit or first rent transfer.

## Limits

Live Verify does not guarantee that a property is desirable, legally compliant, fairly priced, or that the landlord will behave well. It verifies specific issuer-backed claims.

It also does not help if the tenant ignores verification and pays an unverifiable personal account. The safety gain comes from making "no verifiable instruction, no deposit" a normal consumer habit.

## Further Derivations

1. **Student Accommodation Deposit Instructions** — University-approved housing and private halls are frequent targets for international-student scams.
2. **Short-Term Let Booking Deposits** — Vacation-rental and serviced-apartment deposits before arrival.
3. **Deposit Protection Scheme Acknowledgments** — Standalone proof that a tenancy deposit is protected.
4. **Landlord Licensing Status on Listings** — Local authority HMO or landlord registration claims embedded in rental adverts.
5. **Viewing Agent Appointment Credentials** — Camera-mode credentials for people showing properties.

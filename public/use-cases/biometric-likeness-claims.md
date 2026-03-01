---
title: "Biometric Likeness Claims"
category: "Identity & Civil Records"
volume: "High (potentially every identity verification interaction)"
retention: "Ephemeral (salt expires in minutes); photo validity 1 year"
slug: "biometric-likeness-claims"
tags: ["identity", "biometric", "photo", "kyc", "face-verification", "state-issued", "ephemeral", "anti-fraud"]
furtherDerivations: 1
---

## What is a Biometric Likeness Claim?

A **Biometric Likeness Claim** is a time-limited, state-verified assertion that a photograph matches a citizen's current appearance. Unlike static ID cards that show a photo taken years ago, this system requires periodic photo renewal and generates ephemeral verification tokens.

The core insight: **identity documents prove who you are on paper; likeness claims prove the person standing in front of the verifier is that person.**

Traditional ID fraud exploits the gap between document and person. A stolen passport with a vaguely similar photo, a borrowed driver's license, a name change document belonging to someone else—all rely on the verifier squinting at a photo and thinking "close enough." Biometric likeness claims close that gap.

<div style="max-width: 340px; margin: 24px auto; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; border: 1px solid #e2e8f0; border-radius: 24px; background: linear-gradient(145deg, #1e293b 0%, #334155 100%); padding: 20px; box-shadow: 0 8px 32px rgba(0,0,0,0.3);">
  <div style="text-align: center; margin-bottom: 15px;">
    <div style="font-size: 0.7em; color: #94a3b8; letter-spacing: 1px;"><span verifiable-text="start" data-for="likeness">[</span>CALIFORNIA DMV • DIGITAL ID</div>
  </div>
  <div style="background: #f8fafc; border-radius: 12px; padding: 15px; margin-bottom: 15px;">
    <div style="width: 120px; height: 150px; background: linear-gradient(135deg, #cbd5e1 0%, #94a3b8 100%); border-radius: 8px; margin: 0 auto 10px; display: flex; align-items: center; justify-content: center; color: #475569; font-size: 0.8em;">[Photo]</div>
    <div style="text-align: center; color: #1e293b;">
      <div style="font-size: 1.2em; font-weight: 600;">JAMES R. WILSON</div>
      <div style="font-size: 0.85em; color: #64748b;">DOB: 15 Mar 1987</div>
    </div>
  </div>
  <div style="background: #0f172a; border-radius: 8px; padding: 12px; margin-bottom: 10px;">
    <div style="font-size: 0.75em; color: #94a3b8; margin-bottom: 4px;">Photo taken</div>
    <div style="font-size: 0.9em; color: #f8fafc; font-weight: 500;">12 Jan 2026</div>
  </div>
  <div data-verify-line="likeness" style="font-family: 'Courier New', monospace; font-size: 0.7em; color: #cbd5e1; text-align: center; padding: 8px; background: #0f172a; border-radius: 6px;">
    verify:dmv.ca.gov/likeness/v <span verifiable-text="end" data-for="likeness">]</span>
  </div>
</div>

## How It Works

### 1. Photo Registration

The citizen registers their photo through a state-issued app or in-person at a government office:

- **In-person:** Photo taken by government staff (like passport photo)
- **App-based:** Selfie with liveness detection (blink, turn head, etc.)

The photo is stored by the state authority and linked to the citizen's identity record.

### 2. Photo Renewal

Photos must be renewed periodically (e.g., annually). The state may use AI-assisted aging verification:

| Scenario | Outcome |
|----------|---------|
| New photo matches expected aging | Auto-approved |
| Minor discrepancy | Flagged for human review |
| Significant change (weight, surgery, etc.) | Requires in-person verification |
| Suspected fraud (different person) | Rejected; investigation triggered |

This keeps the photo current without requiring annual office visits for most citizens.

### 3. Salt and Consent

The citizen's app maintains a current salt, fetched during the last sync with the state server. The salt sits dormant until used.

**Consent model:** Showing the screen IS consent. The citizen unlocks their app, displays the verification screen, and presents it to the verifier. This deliberate act constitutes consent to this verification.

### 4. Verification

The verifier (bank teller, landlord, border agent, employer):

1. Looks at the person in front of them
2. Looks at the photo on the citizen's screen
3. Scans/OCRs the verification line
4. Receives `OK` from the state endpoint
5. Confirms the face matches

**Salt consumption:** Once the endpoint returns `OK`, that salt is **burned**—single-use, now invalid. The next time the citizen's app connects to the network, it fetches a fresh salt and the verification line updates.

The single-use salt means:
- Each verification is unlinkable to previous verifications
- A photographed verification line is useless (already consumed)
- Lost/stolen phones don't provide lasting identity theft vectors (salt burned on first fraudulent use, then dead)

## Data Verified

The claim itself contains: name, date of birth, photo, photo date, verification URL with single-use salt.

The verification endpoint confirms: the salt is valid, the photo is current, the identity record is active.

**The endpoint does NOT return:**
- The photo (verifier already sees it)
- Name or DOB (verifier already sees it)
- Any PII

## Verification Response

The endpoint returns a simple status code:

- **OK** — Salt valid, photo current, identity active (salt now burned)
- **ALREADY_USED** — Salt was already consumed in a previous verification
- **PHOTO_RENEWAL_REQUIRED** — Photo is stale; citizen must update
- **REVOKED** — Identity record suspended or revoked
- **404** — Salt not found (OCR error, or fraudulent claim)

## First-Party Use

The **State Authority** (DMV, passport office, national ID authority) benefits from verification.

**Reduced Document Fraud:** Physical ID cards are copied, altered, and borrowed. Ephemeral digital claims with live photo verification are far harder to fake—the fraudster would need to compromise the state app itself.

**Continuous Identity Assurance:** Instead of issuing a card valid for 10 years, the state maintains an ongoing relationship with the citizen. Photo renewals provide regular touchpoints to detect fraud or identity issues.

**Audit and Analytics:** The state can track verification patterns (anonymized) to detect fraud rings, identity theft clusters, or system abuse—without tracking individual citizens' movements.

## Second-Party Use

The **Citizen** benefits from verification.

**Stronger Identity Protection:** If someone steals your wallet, they have your driver's license photo for years. If someone steals your phone, the biometric lock prevents app access, and any observed verification line expires in minutes.

**No Physical Document Needed:** For routine identity checks (picking up packages, age verification, membership validation), the citizen doesn't need to carry physical ID. The phone app suffices.

**Privacy-Preserving:** Each verification uses a fresh salt. Unlike showing a driver's license (which has the same number every time), biometric likeness claims don't create a tracking trail across verifiers.

## Third-Party Use

**Banks / Financial Institutions (KYC)**
**Account Opening:** Remote account opening typically requires uploading a selfie and ID photo for comparison. Biometric likeness claims provide a state-verified alternative—the bank verifies against the state endpoint rather than running their own facial comparison.

**Employers / HR Departments**
**Right-to-Work Verification:** Verifying that the person signing employment paperwork is the person named on the work authorization. The ephemeral claim proves current likeness, not a years-old photo.

**Age-Restricted Venues / Retailers**
**Age Verification:** Bars, cannabis dispensaries, age-restricted events. The claim proves the person is who they claim to be; the DOB on screen proves age. No need to handle physical ID.

**Healthcare Providers**
**Patient Identity:** Ensuring the person receiving treatment or picking up prescriptions is the patient on record. Particularly important for controlled substances.

**Law Enforcement**
**Field Identification:** Officer requests the subject generate a likeness claim. Verification confirms identity without running plates or calling dispatch. The ephemeral nature means the interaction isn't logged against the citizen permanently.

## Why Single-Use?

The single-use salt is a deliberate design choice:

| Threat | How Single-Use Mitigates |
|--------|--------------------------|
| Screenshot/photo of verification screen | Useless—salt already burned on first use |
| Shoulder-surfing the verification line | Useless—already consumed |
| Database breach of verification logs | Logs contain burned salts, not reusable tokens |
| Coerced verification (abusive partner) | Salt burned after coerced use; victim gets fresh one on next sync |
| Mass surveillance via verification tracking | Each verification is unlinkable |

**Network timing:** The citizen's device needs connectivity to fetch a new salt *after* a verification, not *during*. The verification screen can be shown offline; the salt was pre-fetched. Only the verifier's device needs connectivity to hit the endpoint.

## Why Not Just Facial Recognition?

Some jurisdictions are deploying real-time facial recognition: camera captures face → matches against database → returns identity.

| Aspect | Biometric Likeness Claims | Real-Time Facial Recognition |
|--------|---------------------------|------------------------------|
| **Citizen consent** | Explicit (citizen generates claim) | Often none (passive capture) |
| **Citizen awareness** | Always knows when verified | May not know they were scanned |
| **Data flow** | Citizen controls what's shared | System captures and matches |
| **False positives** | Citizen presents; verifier confirms | System may misidentify |
| **Surveillance potential** | Low (ephemeral, unlinkable) | High (persistent, linkable) |
| **Civil liberties** | Preserves autonomy | Erodes autonomy |

Biometric likeness claims are **citizen-initiated identity assertion**, not **state-initiated identity capture**. The citizen decides when to prove their identity, generates the claim themselves, and controls the interaction.

## AI-Assisted Photo Renewal

Annual photo renewal could be burdensome. AI can reduce friction while maintaining security:

**How It Works:**

1. Citizen submits new selfie via app
2. AI compares to previous photo, accounting for expected aging
3. Liveness detection confirms it's a real person, not a photo of a photo
4. If within normal aging parameters → auto-approved
5. If outside parameters → flagged for human review

**Aging Model Considerations:**

- Normal aging (wrinkles, hair changes) should pass
- Weight changes within reason should pass
- Dramatic changes (surgery, significant weight loss/gain) may require in-person
- Suspected different person → reject and investigate

**Privacy of AI Processing:**

- Processing happens on state servers, not third-party AI services
- No facial data shared outside the identity authority
- Citizen can request human review if AI rejects

## Jurisdictional Adoption

Not every jurisdiction will implement this system. Adoption depends on:

- **Technical infrastructure:** Requires state-run identity app, secure backend
- **Legal framework:** Privacy laws, biometric data regulations
- **Cultural acceptance:** Some populations resist digital identity
- **Existing systems:** Countries with robust physical ID may see less need

**Early Adopters (Likely):**
- Countries with existing digital ID infrastructure (Estonia, Singapore, India)
- States/provinces with mature DMV app ecosystems
- Jurisdictions with high identity fraud rates

**Late Adopters (Likely):**
- Jurisdictions with strong privacy-first cultures (Germany, certain US states)
- Areas with low smartphone penetration
- Regions with distrust of government digital systems

The system is **opt-in for jurisdictions**—it doesn't replace physical ID, it supplements it.

## Verification Architecture

**The "Person Standing Here" Problem**

Traditional identity verification has a gap:

```
Document proves: "James Wilson exists and has these attributes"
Document does NOT prove: "The person holding this document is James Wilson"
```

Biometric likeness claims close this gap by combining:
- State-verified identity record
- Recent photo (within 1 year)
- Ephemeral salt proving the claim is fresh
- Live comparison by the verifier

**Issuer Types** (First Party)

- **National Identity Authorities:** Passport offices, national ID programs
- **State/Provincial DMVs:** Driver's license authorities
- **Digital Identity Programs:** Estonia e-Residency, India Aadhaar, Singapore Singpass

**Privacy Salt:** The single-use salt IS the privacy mechanism. Each verification uses a fresh random salt, making verifications unlinkable. No additional salting needed.

## Jurisdictional Witnessing

A jurisdiction may require the issuer to retain a **witnessing firm** for regulatory compliance. The witnessing firm:

- Receives hashes of verification events (not photos, not PII)
- Provides aggregate audit capability without individual tracking
- Enables dispute resolution ("I was verified at location X at time Y")

For ephemeral claims, witnessing is lighter-touch than for persistent documents—the goal is system integrity, not individual transaction logging.

## NFC and Other Transmission Methods

While OCR works, other transmission methods may be more practical:

| Method | Pros | Cons |
|--------|------|------|
| **OCR** | Works with any camera | Slower, OCR errors possible |
| **QR Code** | Fast scanning | Requires QR reader |
| **NFC** | Instant tap | Requires NFC hardware |
| **Bluetooth** | Works at short range | Pairing complexity |
| **Screen-to-screen** | Visual confirmation | Manual process |

The verification model is identical regardless of transmission method—only the encoding of the verification URL differs.

## Not a National Digital ID App

This document describes **one specific capability**: proving current likeness with a single-use verifiable claim. It is deliberately not a multi-service national digital identity app.

A national digital ID app bundles many capabilities into one system:

| Capability | Biometric Likeness Claim | National Digital ID App |
|------------|--------------------------|-------------------------|
| Prove current likeness | ✓ | ✓ |
| Right-to-work status | ✗ | ✓ |
| Benefits eligibility | ✗ | ✓ |
| Voting registration | ✗ | ✓ |
| Age verification | ✗ | ✓ |
| Address proof | ✗ | ✓ |
| Driving entitlement | ✗ | ✓ |
| Health service ID | ✗ | ✓ |
| Tax reference | ✗ | ✓ |

The biometric likeness claim is a **composable primitive**—it answers "is this the person?" and can be combined with other verified claims that answer "what are they entitled to?"

Each claim type has its own issuer, its own verification endpoint, its own lifecycle. The citizen assembles what they need for a given interaction, rather than presenting a monolithic credential that bundles everything.

This separation provides:
- **Minimal disclosure:** Show only what's needed (likeness + right-to-work, not likeness + everything)
- **Independent revocation:** A revoked driving entitlement doesn't affect your likeness claim
- **Multiple issuers:** Likeness from DMV, work authorization from immigration, qualifications from universities
- **Cleaner failure modes:** One system's outage doesn't block all identity verification

## Relationship to Other Identity Documents

Biometric likeness claims complement, not replace, other identity documents:

| Document Type | Proves | Biometric Likeness Adds |
|---------------|--------|-------------------------|
| Passport | Citizenship, travel authorization | "This is the passport holder" |
| Driver's License | Driving authorization, address | "This is the license holder" |
| Name Change Document | Identity continuity | "This is the person who changed their name" |
| Work Authorization | Right to work | "This is the authorized worker" |
| Age Verification | Date of birth | "This is the person with that DOB" |

The likeness claim is a **verification layer** that can be combined with any other identity document to prove current possession.

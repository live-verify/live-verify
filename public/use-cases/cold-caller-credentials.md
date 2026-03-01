---
title: "Cold-Caller Credentials"
category: "Identity & Authority Verification"
volume: "Very Large"
retention: "Employment period + badge validity"
slug: "cold-caller-credentials"
tags: ["doorstep", "cold-caller", "distraction-burglary", "utility-worker", "charity-collector", "consumer-protection", "elderly-protection"]
furtherDerivations: 2
---

## What is a Cold-Caller Credential?

Someone knocks on your door. They're wearing a high-vis jacket and holding a clipboard. "I'm from the water board — we need to check for leaks."

Do you let them in?

**Cold-callers** are people who arrive at your door without prior appointment, claiming to represent an organization. Some are legitimate (meter readers, charity collectors, council workers). Others are criminals using uniforms and fake IDs to gain entry for burglary, fraud, or intimidation.

<div style="max-width: 350px; margin: 24px auto; font-family: sans-serif; border: 2px solid #0066cc; background: #fff; padding: 0; border-radius: 8px; overflow: hidden;">
  <div style="background: #0066cc; color: #fff; padding: 12px; display: flex; align-items: center; gap: 10px;">
    <div style="font-size: 1.5em;">💧</div>
    <div>
      <div style="font-weight: bold;"><span verifiable-text="start" data-for="badge">[</span>THAMES WATER</div>
      <div style="font-size: 0.8em;">Authorized Field Representative</div>
    </div>
  </div>
<div style="padding: 15px; display: flex; gap: 15px;">
    <div style="width: 80px; height: 100px; background: #eee; border: 1px solid #ccc; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: #777; font-size: 0.7em;">[PHOTO]</div>
    <div style="flex-grow: 1;">
      <div style="font-size: 1.1em; font-weight: bold;">SARAH JENKINS</div>
      <div style="font-size: 0.85em; color: #333; line-height: 1.5;">
        <strong>Employee ID:</strong> TW-44821<br>
        <strong>Role:</strong> Meter Reader<br>
        <strong>Region:</strong> South London<br>
        <strong>Valid Until:</strong> Dec 2026
      </div>
    </div>
  </div>
<div style="padding: 0 15px 15px 15px;">
    <div data-verify-line="badge" style="border-top: 1px dashed #999; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
      title="Demo only: Thames Water doesn't yet offer verification endpoints, so this is illustrative">
      verify:thameswater.co.uk/staff/v <span verifiable-text="end" data-for="badge">]</span>
    </div>
  </div>
</div>

## The Doorstep Fraud Problem

**Distraction Burglary:**
One person engages the homeowner at the front door ("checking the water pressure") while an accomplice enters through the back. Elderly and vulnerable people are primary targets.

**Fake Charity Collectors:**
Criminals collect cash "for charity" that goes straight into their pockets. High-vis vests and clipboards cost nothing; fake charity IDs are trivial to produce.

**Rogue Traders:**
"We noticed your roof has damage" — pressures homeowner into unnecessary, overpriced, or never-completed work. Often targets elderly people.

**Bogus Officials:**
Criminals impersonating council workers, TV licensing inspectors, or utility employees to gain entry or extract payments.

| Cold-Caller Type | Legitimate Purpose | Criminal Exploitation |
|------------------|-------------------|----------------------|
| Utility worker | Meter reading, leak checks | Entry for burglary |
| Charity collector | Fundraising | Cash theft, fake charities |
| Council worker | Inspections, surveys | Casing properties |
| Roofer/builder | Genuine trade work | Scam repairs, intimidation |
| TV licensing | Licence enforcement | Fake fines, entry |
| Broadband sales | Service offers | Identity theft, pressure sales |
| Window cleaner | Service offer | Assessing security, access |
| Delivery driver | Parcel/food delivery | Entry pretext, following into buildings |

## Delivery Drivers: Privacy-Preserving Verification

Delivery drivers (Evri, DPD, Deliveroo, JustEat) present a different case: most recipients have apps with real-time tracking. But Live Verify still adds value for:

- **Non-app recipients** (neighbor collection, elderly, shared buildings)
- **Suspicious timing** (unexpected delivery, no tracking notification)
- **Building access** (verifying before buzzing someone into a multi-unit building)

**Privacy-Preserving Badge Design:**

Delivery agents carry a weatherproof lanyard ID — large print, few lines, minimal characters for OCR through a doorbell camera:

<div style="max-width: 280px; margin: 24px auto; font-family: sans-serif; border: 3px solid #DC0032; background: #fff; padding: 20px; border-radius: 8px; text-align: center;">
  <div style="font-size: 1.4em; font-weight: bold; color: #DC0032; margin-bottom: 8px;">DPD Delivery Agent</div>
  <div style="font-size: 1.6em; font-weight: bold; color: #000; margin-bottom: 12px;"><span verifiable-text="start" data-for="dpd">[</span>Henry M 2621</div>
  <div data-verify-line="dpd" style="font-family: 'Courier New', monospace; font-size: 1.1em; color: #555;"
    title="Demo only: DPD doesn't yet offer verification endpoints, so this is illustrative">
    vfy:associates.dpd.co.uk <span verifiable-text="end" data-for="dpd">]</span>
  </div>
</div>

Three lines. Large text. Minimal punctuation. Readable through a window or low-res doorbell camera.

**What the badge shows:** Role, partial name + ID, verification domain.

**Verification Flow:**

The badge text is OCR'd, normalized, and hashed (SHA-256). The app then GETs:

```
https://associates.dpd.co.uk/{sha256-hash}
```

The homeowner's app sends nothing but the hash. DPD's endpoint returns the current status:

```json
{
  "status": "OK",
  "photo_url": "https://associates.dpd.co.uk/photos/2621.jpg",
  "current_destination": "221B Baker St, London NW1 6XE",
  "tracking": "DPD-7742991",
  "active_since": "2024-03-15"
}
```

**What the Homeowner's App Displays:**

The homeowner's app sends only the computed hash (plus inevitably, their IP address). DPD returns the agent's current task; the homeowner judges whether the destination matches:

<div style="max-width: 320px; margin: 24px auto; font-family: sans-serif; border: 2px solid #22c55e; background: #f0fdf4; padding: 0; border-radius: 12px; overflow: hidden;">
  <div style="background: #22c55e; color: #fff; padding: 12px 16px; display: flex; align-items: center; gap: 10px;">
    <div style="font-size: 1.3em;">✓</div>
    <div style="font-weight: bold;">Verified DPD Agent</div>
  </div>
  <div style="padding: 16px; display: flex; gap: 12px; align-items: center;">
    <div style="width: 60px; height: 60px; background: #ddd; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.7em; color: #666;">[PHOTO]</div>
    <div>
      <div style="font-weight: bold; font-size: 1.1em;">Henry M</div>
      <div style="color: #666; font-size: 0.9em;">Agent #2621 · Since Mar 2024</div>
    </div>
  </div>
  <div style="padding: 0 16px 16px 16px;">
    <div style="background: #fff; border: 1px solid #ddd; border-radius: 8px; padding: 12px;">
      <div style="font-size: 0.85em; color: #666;">Currently delivering to:</div>
      <div style="font-weight: bold;">221B Baker St</div>
      <div style="font-size: 0.85em; color: #666; margin-top: 4px;">Is this your address or a neighbour?</div>
    </div>
  </div>
  <div style="background: #e0f2e9; padding: 10px 16px; font-size: 0.8em; color: #166534; text-align: center;">
    Tracking: DPD-7742991 · Verified 14:32
  </div>
</div>

The homeowner sees the destination address and confirms: "Yes, that's me" or "Yes, that's next door" or "No, that's nowhere near here."

**Failure Case — No Current Task:**

<div style="max-width: 320px; margin: 24px auto; font-family: sans-serif; border: 2px solid #ef4444; background: #fef2f2; padding: 0; border-radius: 12px; overflow: hidden;">
  <div style="background: #ef4444; color: #fff; padding: 12px 16px; display: flex; align-items: center; gap: 10px;">
    <div style="font-size: 1.3em;">⚠</div>
    <div style="font-weight: bold;">No Active Delivery</div>
  </div>
  <div style="padding: 16px;">
    <div style="font-size: 0.9em; margin-bottom: 8px;">This agent is verified but has no delivery assigned in your area.</div>
    <div style="font-size: 0.85em; color: #666; margin-top: 8px;">Ask why they're here.</div>
  </div>
</div>

**Why this works:**
- **Recipient sees:** Photo + confirmation this driver should be at their address *right now*
- **Driver privacy:** Full name and personal details not exposed on badge
- **Audit trail:** Platform logs all verifications — law enforcement can access full identity if crimes occur
- **Fraud detection:** Badge verified at wrong address, or 50 addresses in an hour, triggers investigation

This model lets platforms protect driver privacy while still enabling doorstep verification and maintaining accountability.

## Data Verified

Employee name, photo, employee ID, employing organization, role/job title, authorized activities, geographic region, badge validity dates, DBS/background check status (where relevant).

**Document Types:**
- **Employee ID Badge** — Photo ID with employer branding
- **Letter of Authority** — For specific visits (e.g., "authorized to inspect drainage at 42 Oak Lane")
- **Charity Collector Permit** — Licensed street/door collection authorization
- **Trading Standards Registration** — For traders offering doorstep services

## Data Visible After Verification

Shows the issuer domain (`thameswater.co.uk`, `britishgas.co.uk`, `camden.gov.uk`) and current employment status.

**Status Indications:**
- **Verified — Active Employee** — Person is currently employed in the stated role.
- **Expired** — Badge/authorization has expired.
- **Not Found** — No matching record (likely fake).
- **Suspended** — Employee under investigation or badge reported lost/stolen.
- **Role Mismatch** — Badge is real but role doesn't match claimed purpose.

## The Verification Moment

**Before Opening the Door:**

1. Cold-caller presents ID badge at window or holds it up to Ring/Nest doorbell camera
2. Homeowner (or family member viewing remotely) scans the verification line
3. Verification confirms: genuine employee of the claimed organization, or not
4. Decision to open door is informed by verified identity

**Key Insight:** You can verify *before* opening the door. The badge can be scanned through a window or captured by a video doorbell. No need to let a stranger inside to check their credentials.

**Remote Verification for Elderly:**
Adult children with access to parent's Ring doorbell can verify the cold-caller's badge remotely before advising whether to open the door.

## Second-Party Use

The **Employee** benefits from verification.

**Building Trust:** Legitimate workers face suspicion because of criminals who abuse uniforms. A verifiable badge lets them say: "Please scan my ID before you open the door — I understand you need to be careful."

**Faster Access:** Homeowners who can verify instantly are more likely to grant access promptly, improving the worker's efficiency.

**Safety:** Verified identity means the worker is accountable. Reduces risk of false accusations because interactions are logged.

## Third-Party Use

**Homeowners (Potential Victims)**

**Pre-Entry Verification:** Confirm the person at the door is who they claim to be before opening. Critical protection against distraction burglary.

**Police and Trading Standards**

**Pattern Detection:** If a "Thames Water worker" badge is being verified at 50 addresses in a day across London, but Thames Water only has 3 workers in the area, that's a cloned badge in criminal use.

**Incident Investigation:** After a doorstep crime, verification logs show whether the criminal used a fake badge or impersonated a real employee.

**Legitimate Organizations**

**Brand Protection:** When criminals impersonate British Gas workers, it damages British Gas's reputation. Verifiable badges make impersonation detectable.

**Compliance Evidence:** Proof that workers were verified at addresses they visited, useful for regulatory compliance and dispute resolution.

**Charities and Fundraising Regulators**

**Licensed Collection:** Charity Commission and local authorities can verify that collectors have valid permits. Fake charity collection is a significant fraud category.

## Verification Architecture

**The Fake ID Problem:**

- **eBay Uniforms:** High-vis jackets, lanyards, and branded clothing are freely available
- **Printed Badges:** Anyone with a color printer can create convincing-looking ID cards
- **Cloned Badges:** Copying a real employee's badge details onto a fake card
- **Expired Employees:** Using genuine credentials after leaving employment

**Issuer Types:**

**Utility Companies:** (British Gas, Thames Water, EDF, Openreach)
**Local Authorities:** (Council workers, housing inspectors, environmental health)
**Charities:** (via Charity Commission or local licensing)
**Trade Bodies:** (for verified tradespeople)

**Real-Time Status:**
Unlike a static ID card, verification checks current employment status. An employee terminated yesterday will show as "Not Found" or "Inactive" today — their physical badge is worthless.

## Existing Schemes and Integration

**Password Schemes:**
Some utilities offer password schemes where a pre-agreed password is shared with vulnerable customers. The worker must state the password to gain entry.

*Limitation:* Passwords can be overheard, guessed, or socially engineered. Live Verify verification is cryptographically bound to the employer's domain — cannot be faked or transferred.

**Nominated Neighbour:**
Some schemes allow a trusted neighbour to verify visitors.

*Enhancement:* Neighbour can scan and verify the badge before the vulnerable person opens the door.

**Police "No Cold Calling" Zones:**
Areas where cold-calling is discouraged or prohibited.

*Enhancement:* In these zones, any cold-caller should have verifiable credentials — unverified visitors are immediately suspicious.

## Implementation Considerations

**Door Camera Integration:**

Video doorbells (Ring, Nest) have limited processing power. For camera-based badge scanning:

- Doorbell captures image of badge held up by visitor
- Image transmitted to homeowner's phone
- Phone's superior CPU performs OCR and verification lookup
- Result displayed to homeowner (local or remote)

This requires tight integration between doorbell and phone apps — the doorbell is effectively a remote camera for the phone's OCR capability.

**Why Not NFC?**

While NFC from the worker's phone could theoretically automate verification, it has significant drawbacks:

- **Rollout timeline:** NFC-enabled entryways would take years to become widespread
- **Attack surface:** An NFC listener at the home perimeter is an attack vector for the home network — malicious actors could probe or exploit the listening device
- **Camera/OCR is safer:** The camera passively captures; processing happens on the homeowner's phone, not on a network-connected perimeter device

Camera-based OCR is deployable today with existing doorbell infrastructure. The worker holds up a badge; the homeowner's phone does the rest.

**Photo Return:**

Verification response should include the employer's photo of the employee — not just status. This defeats:
- Cloned badges (badge is real but photo doesn't match)
- Borrowed badges (colleague's badge used for access)

**Geographic Binding:**
Badge verification can include authorized work region. A London-region meter reader whose badge is scanned in Manchester triggers an alert.

**Visit Authorization:**
For specific appointments, verification can confirm: "Sarah Jenkins is authorized to visit 42 Oak Lane on January 15, 2026 for meter reading."

## Jurisdictional Witnessing

A jurisdiction may require the issuer to retain a **witnessing firm** for regulatory compliance. The witnessing firm:

- Receives all hashes from the issuer, and any subsequent changes to the payload as they happen—which may manifest as a new hash, a status change, or even a 404 (record deleted)
- Receives structured content/metadata (key identifiers and dates)
- Does **NOT** receive plaintext or sensitive personal information
- Provides an immutable, timestamped audit trail—available to the jurisdiction on demand, to document holders/third parties during disputes, or as expert witness testimony in legal proceedings

This provides:
- **Non-repudiation:** Issuer cannot deny issuing the document
- **Timestamp proof:** Document existed at a specific time
- **Regulatory audit:** Jurisdictions can inspect the witness ledger for fraud detection
- **Resilience:** Verification works even if issuer's systems go down

**Public Blockchain (Non-Party)**

Witnessing firms may periodically commit rollups to an inexpensive public blockchain, providing an ultimate immutability guarantee. The blockchain is a "non-party"—infrastructure, not a participant in the transaction. This creates multiple verification paths:

1. **Issuer domain** — Direct check against the issuer
2. **Witnessing firm** — Independent confirmation with timestamp
3. **Public blockchain** — Decentralized trust anchor via rollup inclusion


## Competition vs. Current Methods

| Feature | Live Verify | Password Scheme | Visual Inspection |
|---------|-------------|-----------------|-------------------|
| **Fakeable?** | No — domain-bound | Yes — overheard/shared | Yes — trivial |
| **Real-time status** | Yes — current employment | No — password unchanged | No — static badge |
| **Remote verification** | Yes — family can verify via doorbell | No — homeowner only | No |
| **Photo verification** | Yes — employer's photo returned | No | Yes — but easy to clone |
| **Works for strangers** | Yes | No — password must be pre-arranged | Partially |

## See Also

- [Property Access Rights](view.html?slug=property-access-rights) — Proving you have right to access a property (the other side of the verification)
- [Authorized Agent Confirmations](view.html?slug=authorized-agent-confirmations) — Agents with legal authority to enter/seize
- [Estate Clearance Authorizations](view.html?slug=estate-clearance-authorizations) — Authorized work at a property with posted notices

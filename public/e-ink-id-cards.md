# E-Ink Badges for Live Verification

## The Problem with Static Credentials

Traditional plastic ID badges have a fundamental vulnerability: they can be photographed and reprinted. A criminal who photographs a legitimate courier's badge can create a convincing replica to gain access to gated communities, apartment buildings, or private residences.

Even worse, static credentials enable tracking. A bad actor could log "Badge 1332 seen in Brixton at 2pm, Peckham at 3pm" to build movement profiles of workers—creating stalking risks for staff and reconnaissance opportunities for criminals.

## The E-Ink Solution

An **e-ink badge** with a **rotating salt** solves both problems:

```
┌─────────────────────────────┐
│  METROPOLITAN POLICE        │
│  DIGITAL WARRANT CARD       │
│                             │
│  PC Alex D 1332             │
│  London MET                 │
│                             │
│  Salt: 7k3m9x2p             │
│                             │
│  vfy:officers.police.uk     │
└─────────────────────────────┘
```

The salt changes:
- **Every 10 minutes** (time-based rotation)
- **After each Live Verify scan** (verification-triggered rotation)

This means a photographed badge becomes invalid almost immediately.

## Use Cases Implementing E-Ink Badges

Six peer use cases share this common pattern:

| Use Case | Issuer Domain | Privacy Concern |
|----------|---------------|-----------------|
| [Police Officer Verification](data/police-officer-verification.md) | `officers.police.uk` | Officer movement tracking |
| [Delivery Courier Verification](data/delivery-courier-verification.md) | `logistics.amazon.com` | Driver route mapping, stalking |
| [Healthcare Facility Staff](data/healthcare-facility-staff.md) | `ids.mayoclinic.org` | Staff doxing by hostile patients |
| [Hotel Staff Verification](data/hotel-staff-verification.md) | `ids.hilton.com` | Staff harassment |
| [Residential Building Staff](data/residential-building-staff.md) | `id.equityapartments.com` | Former employee badge misuse |
| [Event Venue Staff](data/event-venue-staff.md) | `staff.coachella.com` | Credential forgery for zone access |

These are **peers sharing a common pattern**, not derivatives of each other.

## When E-Ink Badges Are Needed

E-Ink badges are essential for **mobile service staff in ungated facilities**—environments where:

| Characteristic | Why It Matters |
|----------------|----------------|
| **Unscheduled entry to private spaces** | Staff knock on doors with little notice; you decide in seconds |
| **Ungated, public-access facility** | Anyone can walk in wearing a uniform; impostors blend easily |
| **High staff turnover** | Contractors, temps, shift workers change daily; you can't know everyone |
| **Mobile staff without fixed positions** | Unlike a receptionist at a desk, service staff could be anyone in a hallway |
| **Real-time status matters** | On-duty/off-duty/suspended changes hourly; yesterday's badge may be invalid |
| **One-on-one verification** | Residents/patients/guests make entry decisions alone, with no backup |

**Examples:** Hotels, hospitals, apartment buildings, event venues, delivery routes.

**Contrast with gated facilities:** A corporate office has badge readers, security desks, and a known roster. Unauthorized people stand out. A hotel hallway at 11 PM does not have these protections.

### When E-Ink Badges Are NOT Necessary

- **Gated facilities** (schools, corporate offices) — controlled entry; strangers stand out
- **Fixed-position staff** (receptionists, concierges) — visibly stationed at known locations
- **Daily-roster workplaces** — colleagues know who should be there
- **Low-turnover environments** — staff are familiar over time

## Static Badges with Live Verify

Not every scenario needs rotating salts. Many interactions are **scheduled, expected, and cordial**—but verification still adds value. These use a **static badge** (traditional plastic ID) that's still camera-verifiable via Live Verify.

### When Static Verifiable Badges Work

| Characteristic | Why Rotating Salt Isn't Needed |
|----------------|-------------------------------|
| **Scheduled visits** | You expect someone at 2pm; no ambush risk |
| **Cordial relationship** | Both parties want the interaction to succeed |
| **Low cloning incentive** | Impersonating a notary gains little vs. impersonating a delivery driver |
| **Low tracking risk** | Nobody benefits from mapping a solicitor's movements |
| **Repeated interactions** | Same person visits regularly; you recognize them |
| **Accountability, not anonymity** | Full name on badge is appropriate; no safety concern |
| **Reputation-building career** | Holder *wants* verifications linked to their name; each positive interaction strengthens their professional standing |

### Examples of Cordial, Lower-Risk Scenarios

| Role | Scenario | Why Static Badge + Live Verify Works |
|------|----------|--------------------------------------|
| **Notary public** | Document signing at your home or office | Scheduled appointment; you invited them; their license matters |
| **Solicitor / attorney** | Meeting at your premises | You hired them; professional accountability outweighs privacy |
| **Real estate agent** | Property viewing or valuation | Scheduled showing; agent wants to be identifiable |
| **Financial advisor** | Home consultation | You initiated the meeting; their credentials matter more than anonymity |
| **Estate agent / surveyor** | Property survey for purchase | Part of a transaction you're actively engaged in |
| **Utility company (scheduled)** | Pre-arranged meter reading or service upgrade | You received notice; expecting someone |
| **IT support (corporate)** | Desk visit to fix your laptop | Internal colleague with verified role |
| **Conference attendee** | Networking at professional event | Everyone wants to be identifiable; that's the point |
| **Contractor (scheduled)** | Kitchen fitter arriving for booked installation | Part of a commercial relationship you initiated |

### What Static + Live Verify Provides

Even without rotating salts, a static verifiable badge gives:

1. **Credential authenticity** — Badge is genuine, issued by claimed organization
2. **Current employment status** — Person is still employed/licensed (not fired last week)
3. **Role confirmation** — Person is actually a solicitor, not claiming to be one
4. **Photo match** — Face matches the credential holder
5. **Issuer domain trust** — Verification comes from `lawsociety.org.uk`, not a fake domain

### What You Don't Get (and Don't Need)

| Feature | E-Ink Badge | Static Badge | Why Static Is Fine Here |
|---------|-------------|--------------|------------------------|
| Anti-cloning | ✓ Salt invalidates copies | ✗ Photo could be reprinted | Low incentive to clone a notary badge |
| Anti-tracking | ✓ Old hashes return 404 | ✗ Same hash every time | Nobody is tracking your solicitor |
| Real-time revocation | ✓ Instant remote blank | ~ Slower endpoint update | Acceptable for non-adversarial contexts |
| Privacy protection | ✓ First name + initial | Full name displayed | Accountability is the priority |

### The Cordiality Test

Ask: **"Would the person showing the badge prefer to be fully identified?"**

- **Yes** → Static badge is fine. A solicitor *wants* you to know their full name, firm, and license number.
- **No** → Consider e-ink. A debt collector doesn't want their full name on social media after a hostile encounter.

### Implementation: Same Infrastructure, Simpler Badge

Static verifiable badges use the same Live Verify infrastructure:

```
┌─────────────────────────────┐
│  LAW SOCIETY                │
│  SOLICITOR                  │
│                             │
│  Jennifer M. Hughes         │
│  License: SOL-2019-44821    │
│                             │
│  verify:lawsociety.org.uk/v │
└─────────────────────────────┘
```

- No salt field (hash is stable)
- Full name displayed (privacy not a concern)
- Same `verify:` URL pattern
- Same camera-based verification flow
- Same trust model (domain-bound credential)

The verifier scans with their camera app, and the endpoint confirms:

```
HTTP 200 OK
Status: OK

Jennifer M. Hughes
Solicitor, admitted 2019
License: SOL-2019-44821
Current status: Active
Registered firm: Hughes & Partners LLP
```

More information returned because more information is appropriate in cordial contexts.

## Security Properties

### Anti-Cloning

A static badge can be photographed and reprinted in minutes. With rotating salts:

1. Attacker photographs badge at 2:00 PM (salt: `7k3m9x2p`)
2. Attacker prints replica
3. By 2:10 PM, real badge shows salt: `9m4k2x8q`
4. Replica fails verification—wrong salt

### Anti-Tracking

With static hashes, an adversary could query the verification endpoint repeatedly:

```
# Dangerous with static hashes:
GET https://police.uk/verify/{static-hash-for-officer-1332}
# Returns 200 OK every time → officer exists and is on duty
```

With rotating salts, old hashes return `404 Not Found`. You cannot:
- Build historical movement profiles
- Enumerate valid officer IDs
- Track when specific officers are on shift

### Real-Time Revocation

If a badge is stolen or an employee is suspended:
- The e-ink display can be remotely blanked
- The verification endpoint returns invalid status
- No "grace period" where a stolen credential works

## Technical Architecture

### Badge Hardware

E-ink displays are ideal for credentials:
- **Low power:** Months of battery life; image persists without power
- **High contrast:** Pure black on white for reliable OCR
- **Sunlight readable:** Works in all lighting conditions
- **Tamper-evident:** Display damage is visible

### Salt Synchronization

The badge syncs with the issuer's backend:

```
┌─────────────┐      Bluetooth/NFC       ┌─────────────┐
│  Officer's  │ ◄──────────────────────► │   E-Ink     │
│    Phone    │    Salt sync every 10m   │   Badge     │
└─────────────┘                          └─────────────┘
       │
       │ HTTPS
       ▼
┌─────────────┐
│   Issuer    │
│   Backend   │ ─── Generates salts, tracks verifications
└─────────────┘
```

### Hash Calculation

The verifiable text includes the rotating salt:

```
DIGITAL WARRANT CARD
PC Alex D 1332
London MET
Salt: 7k3m9x2p
vfy:officers.police.uk
```

Normalization and hashing proceed as usual. The salt ensures each time window produces a unique hash.

### Verification Flow

1. Citizen scans badge with camera app
2. OCR extracts text including current salt
3. App normalizes text, computes SHA-256
4. App queries `https://officers.police.uk/v/{hash}`
5. Endpoint returns `OK` (valid) or `404` (invalid/expired)

## Phone as On-Demand Display

The officer's/staff member's phone is already coupled to the e-ink badge for salt synchronization. This same phone can **on-demand display the exact same verifiable content**:

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  ┌─────────┐   METROPOLITAN POLICE                          │
│  │ [PHOTO] │   DIGITAL WARRANT CARD                         │
│  │         │                                                │
│  └─────────┘   PC Alex D 1332                               │
│                London MET                                   │
│                                                             │
│                Salt: 7k3m9x2p                               │
│                                                             │
│                vfy:officers.police.uk                       │
└─────────────────────────────────────────────────────────────┘
```

- **Same text content, same salt, same hash** as the e-ink badge
- **On-demand:** Display appears only when officer chooses to show it
- **Biometric unlock:** Requires FaceID/fingerprint—prevents use of stolen phone
- **Landscape mode:** Optimized for verifier's camera (high contrast, large text)
- **Backup role:** Works if physical badge is damaged, lost, or impractical

The phone and e-ink badge are **interchangeable**—either produces a valid hash for the current time window. For plainclothes personnel who don't wear visible badges, the phone may be the primary credential.

## Privacy Tiers: Stakes and Risk

Not all verification scenarios are equal. Some roles face significantly higher personal risk, and some interactions are inherently unwelcome. The privacy architecture must account for this.

### Unwelcome and High-Risk Interactions

Risk comes from both **who you are** and **what you're doing**. A police officer (high-risk role) conducting a traffic stop (unwelcome interaction) faces compounded threat levels.

| Role | High-Risk Interactions | Threat Profile |
|------|------------------------|----------------|
| **Police officers** | Traffic stops, arrests, raids, serving warrants | Criminals, sovereign citizens, organized crime targeting officers and families |
| **Armed forces** | Base entry checks, overseas operations, recruitment | State actors, terrorism, operational security breaches |
| **Social workers** | Home visits, custody removals, welfare checks | Hostile family members; volatile domestic situations |
| **Child protection** | Investigation interviews, emergency removals | Enraged parents/relatives; threats against workers' families |
| **Debt collectors** | Doorstep collection, asset recovery | Desperate or aggressive debtors; ambush risk |
| **Bailiffs/process servers** | Serving court papers, eviction notices, asset seizure | Hostile subjects who don't want to be found |
| **Immigration officers** | Workplace raids, home visits, deportation | Subjects facing life-altering consequences |
| **Building inspectors** | Code violation visits, condemned property notices | Owners resenting mandatory compliance; financial stakes |
| **Parking/traffic enforcement** | Ticketing, towing, clamping | Road rage; confrontation over fines |

**Common thread:** These interactions are often **unwelcome by design**. The other party didn't ask for this encounter and may view the worker as an adversary. They have every incentive to:

1. **Challenge legitimacy** ("You're not a real officer")
2. **Document the encounter** (photograph badge for later complaint or doxing)
3. **Retaliate afterward** (if they can identify the worker)

For these roles and interactions, the rotating salt isn't just about anti-cloning—it's about **survival**. A static badge that can be photographed and traced puts the worker and their family at risk.

### Privacy Gradient

Different roles warrant different levels of information disclosure:

| Privacy Level | Badge Shows | Verification Returns | Use Cases |
|---------------|-------------|---------------------|-----------|
| **Maximum** | Role only + salt + verify URL | "Valid [role] credential" | Undercover officers, witness protection |
| **High** | First initial + ID + salt | Role, status, jurisdiction | Police, social workers, armed forces |
| **Standard** | First name + last initial + ID | Role, status, employer, photo hash | Couriers, healthcare, hotel staff |
| **Low** | Full name + ID | Full profile, contact info | Internal corporate badges |

The verification endpoint can return different levels of detail based on:
- The credential type
- The verifier's own credentials (if mutual verification)
- Jurisdictional requirements

### The "Photograph and Dox" Attack

Without rotating salts, a hostile subject could:

1. Photograph the officer's badge during a traffic stop
2. Post the image online ("This cop harassed me")
3. Others query the static hash to confirm identity
4. Crowdsource the officer's patrol patterns, vehicle, home address
5. Target the officer or their family

With rotating salts:
- The photographed hash is invalid within minutes
- Old hashes return 404—no confirmation possible
- The officer's identity cannot be crowdsourced from the image

This protection is **essential** for roles where the interaction itself may generate enemies.

## Privacy-Preserving Display

Workers who interact with many strangers daily deserve privacy protection:

| Shown on Badge | NOT Shown |
|----------------|-----------|
| First name + last initial | Full legal name |
| Employee ID number | Home address |
| Current salt | Personal phone number |
| Verification URL | Full employment history |

**Example:** "Carlos R 42882" rather than "Carlos Rodriguez, 123 Main St, hired 2019"

The verification endpoint confirms:
- Photo match (via hash)
- Current employment status
- Authorized work area/role
- Issuer domain

This gives verifiers what they need while protecting staff from the privacy risks of broadcasting full names to hundreds of people daily.

## Cloning Protection Summary

| Attack Vector | Static Badge | E-Ink with Salt |
|--------------|--------------|-----------------|
| Photography + reprint | Works indefinitely | Invalid in <10 minutes |
| Badge theft | Works until reported | Remote blank + instant revocation |
| Historical tracking | Query anytime | Old hashes return 404 |
| Movement profiling | Log verifications | Each verification uses new salt |
| Credential enumeration | Brute-force possible | Salt entropy blocks enumeration |

## Implementation Notes

### Salt Entropy

Salts should be 8+ alphanumeric characters (48+ bits of entropy). This prevents:
- Rainbow table attacks on predictable salts
- Brute-force enumeration within a time window

### Rotation Timing

Two rotation triggers:
1. **Time-based:** Every 10 minutes regardless of activity
2. **Verification-triggered:** 60 seconds after each scan

The verification trigger prevents "photograph and immediately use" attacks. The time-based rotation handles badges that aren't being scanned.

### Offline Scenarios

If the badge cannot sync (no connectivity):
- Display the last known salt with a timestamp
- Verifier sees "Salt generated at [time]"
- Accept if timestamp is recent; request fresh salt if stale

### Audit Logging

All verification attempts should be logged:
- Timestamp
- Hash queried
- Result (valid/invalid/expired)
- Verifier context (if available)

This creates accountability without compromising privacy—logs show *that* verifications occurred, not *who* was tracked.

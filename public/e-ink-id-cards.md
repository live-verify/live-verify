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

**The screen and the server's accepted salt are always in lockstep.** Whenever the server rotates the salt, the new salt is pushed to the badge and the e-ink screen re-renders. There is never a state where the badge displays a salt the server has already expired.

The server rotates the salt on two triggers:
- **Verification-Consumed Re-Salting (VCRS) — primary.** A successful Live Verify scan burns the current hash after a 60-second grace period. The server issues a new salt and the screen re-renders.
- **Time-to-live (TTL) expiry — backstop.** If a salt is *never* scanned, the server expires it after a fixed window anyway. **The server MUST then rotate the salt and re-render the screen** — it does not leave a stale, server-invalid salt on display. This closes the photographed-but-never-scanned gap that VCRS alone cannot cover.

The key invariant: a salt shown on the badge is always a salt the server will currently honour. The screen does not drift ahead of the server, and the server does not silently expire something the screen still shows.

### Caveat Emptor: A Photograph Is Not a Verification

Because the screen and server move together, **photographing the e-ink display does nothing useful unless Live Verify is run immediately, in the same moment.** A stored PNG freezes one salt; by the time anyone tries to verify that captured hash, the server has almost certainly rotated — via VCRS (if the badge was scanned) or via TTL (if it wasn't) — and the badge itself has re-rendered to match. The photograph is then a picture of an expired credential: it returns `404`, proves nothing, and cannot be replayed.

The burden is on the person doing the verifying: **scan now, or don't bother.** A photo "for later" is worthless by design.

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

A static badge can be photographed and reprinted in minutes. With re-salting:

1. Attacker photographs badge at 2:00 PM (salt: `7k3m9x2p`)
2. Attacker prints replica
3. The real badge is scanned during a legitimate interaction at 2:05 PM — VCRS burns `7k3m9x2p`; the server rotates and the badge re-renders with salt `9m4k2x8q`
4. Replica fails verification — its hash is now `404`

If the badge is photographed but **never scanned**, the replica still fails: the server's TTL expires `7k3m9x2p` on its own, rotates the salt, and re-renders the screen — so the badge and the server move on together, and the replica's hash lapses just the same. Either path leaves the photograph a picture of an expired credential.

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
│    Phone    │  Salt sync after a scan  │   Badge     │
└─────────────┘                          └─────────────┘
       │
       │ HTTPS
       ▼
┌─────────────┐
│   Issuer    │
│   Backend   │ ─── Generates salts, tracks verifications
└─────────────┘
```

The badge re-renders its screen whenever the phone pushes a new salt. The phone fetches a new salt whenever the server rotates — after a successful scan (VCRS) or when a TTL expires an unscanned salt. Either way the rotation propagates to the screen, so the badge and the server stay in lockstep: the display is never ahead of, or behind, the salt the server will honour.

### Hash Calculation

The verifiable text includes the rotating salt:

```
DIGITAL WARRANT CARD
PC Alex D 1332
London MET
Salt: 7k3m9x2p
vfy:officers.police.uk
```

Normalization and hashing proceed as usual. The salt ensures each issued credential produces a unique hash, and re-salting after a scan ensures the next interaction produces a different one.

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

The phone and e-ink badge are **interchangeable**—both display the current salt and produce the same valid hash, and both re-render together when a scan consumes that salt. For plainclothes personnel who don't wear visible badges, the phone may be the primary credential.

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

With server-driven re-salting:
- The salt in the photograph is rotated out — by VCRS if the badge is scanned, by TTL if it isn't — and the screen re-renders to match. The photographed hash is dead either way
- Old hashes return 404—no confirmation possible
- The officer's identity cannot be crowdsourced from the image: a stored PNG is a picture of an expired credential unless verified the instant it was taken

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
| Photography + reprint | Works indefinitely | Useless unless verified in the moment — VCRS or TTL rotates the salt and re-renders the screen; the photo becomes a picture of an expired hash |
| Badge theft | Works until reported | Remote blank + instant revocation |
| Historical tracking | Query anytime | Old hashes return 404 |
| Movement profiling | Log verifications | Each scan consumes the salt; server rotates and screen re-renders |
| Credential enumeration | Brute-force possible | Salt entropy blocks enumeration |

## Implementation Notes

### Salt Entropy

Salts should be 8+ alphanumeric characters (48+ bits of entropy). This prevents:
- Rainbow table attacks on predictable salts
- Brute-force enumeration within a time window

### Rotation Timing

The server owns the salt. Every rotation it performs is pushed to the badge, and the e-ink screen re-renders to match. There are two triggers:

1. **Verification-Consumed Re-Salting (VCRS) — primary.** 60 seconds after each *successful* scan, the server burns the consumed hash, issues a new salt, and the badge re-renders. A photograph taken during or after the interaction is useless within the grace period.
2. **TTL expiry — backstop.** The server expires each issued salt after a fixed window even if it was never scanned. **On expiry the server MUST rotate the salt and re-render the screen** — it never leaves a server-invalid salt on display. This covers the photographed-but-never-scanned case that VCRS alone misses.

The invariant that makes this work: **the screen and the server's accepted salt are always in lockstep.** The screen never drifts ahead of the server, and the server never silently expires a salt the screen still shows. A verifier reading the badge can trust that the salt in front of them is one the server will currently honour — *if they verify it now*. The moment they walk away, both VCRS and TTL may move on.

See [Technical Concepts: VCRS](../docs/Technical_Concepts.md#verification-consumed-re-salting-vcrs) for the full specification and comparison with other salt patterns.

### Offline Scenarios

The screen/server lockstep depends on the badge being able to receive pushed rotations. **Loss of connectivity is the one case where lockstep can temporarily break:** the server may rotate a salt (VCRS or TTL) while the badge, unable to sync, keeps showing the old one.

This must fail safe and fail visibly:
- The badge displays the last known salt **alongside the time it was synced**
- The verifier's app shows "Salt synced at [time]", so a stale badge is obviously stale rather than silently wrong
- A stale salt fails verification (`404`) — a false negative, never a false positive. The verifier is told the credential could not be confirmed, not that it is valid
- As soon as the badge reaches the holder's phone again, the latest server salt is pushed and the screen re-renders, restoring lockstep

The verifier should treat a stale-sync badge the way they would treat any unverifiable credential: not confirmed. The caveat-emptor principle still holds — only a salt verified live, against a currently-synced badge, proves anything.

### Audit Logging

All verification attempts should be logged:
- Timestamp
- Hash queried
- Result (valid/invalid/expired)
- Verifier context (if available)

This creates accountability without compromising privacy—logs show *that* verifications occurred, not *who* was tracked.

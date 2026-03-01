---
title: "Delivery & Courier Verification"
category: "Identity & Authority Verification"
volume: "Very Large"
retention: "Delivery + 30 days"
slug: "delivery-courier-verification"
tags: ["logistics", "courier", "personal-safety", "amazon-delivery", "ups", "fedex", "home-security", "vulnerable-recipients", "postal", "verification", "delivery-fraud", "package-security"]
furtherDerivations: 2
---

> **See also:** [E-Ink ID Cards](../e-ink-id-cards.md) — comprehensive guide to rotating-salt badges, security properties, and privacy protection for high-volume workers.

## What is Courier Verification?

As e-commerce delivery volumes explode, "Delivery Driver" has become the most common uniform seen in residential neighborhoods. This provides a perfect cover for criminals: **"Package Theft"** (porch piracy) and **"Home Entry Scams."**

Fraudsters often wear high-visibility vests or fake corporate shirts to walk up to porches and steal packages, or knock on doors claiming a "Signature Required" or "Address Correction" to gain entry to a home.

Live Verify allows a resident or security guard to scan the driver's ID badge or a printed delivery manifest to verify: **"Is this person an authorized employee of this company, and are they assigned to this route today?"**

### ID Card (dynaamic e-ink)

<div style="max-width: 400px; margin: 24px auto; font-family: sans-serif; border: 1px solid #ccc; border-radius: 8px; background: #fff; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
  <div style="background: #ff6600; color: #fff; padding: 15px; display: flex; align-items: center;">
    <div style="font-weight: bold; font-size: 1.4em; letter-spacing: -1px; margin-right: 10px;">FedEx</div>
    <div style="font-size: 0.8em; opacity: 0.9; border-left: 1px solid rgba(255,255,255,0.5); padding-left: 10px;">Express / Ground<br>Authorized Personnel</div>
  </div>
<div style="padding: 20px; display: flex; background: linear-gradient(to bottom, #fff, #f9f9f9);">
    <div style="width: 100px; margin-right: 20px;">
      <div style="width: 100px; height: 125px; background: #eee; border: 2px solid #ff6600; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: #000; font-size: 0.7em; text-align: center;">[COURIER PHOTO]</div>
    </div>
    <div style="flex-grow: 1; color: #000">
      <div style="font-size: 0.85em;">FEDEX COURIER</div>
      <div style="font-size: 1.3em; font-weight: bold; margin: 0 0 4px 0;">Mark S 7766</div>
      <div style="font-size: 0.85em;">HUB: Memphis</div>
      <div style="font-size: 0.85em;">SALT: QJ7E3P2</div>
      <div style="font-family: 'Courier New', monospace; font-size: 0.95em">
          verify://fedex.com/id
      </div>
    </div>
  </div>
  <div style="padding: 0 20px 20px 20px;">
    <div style="border-top: 1px dashed #bbb; padding-top: 10px; font-size: 0.7em; color: #666; text-align: center; margin-bottom: 15px; line-height: 1.3;">
      Scan to verify employment status and current delivery route authorization.
    </div>
  </div>
</div>

## Data Verified

Courier name, employee ID, company division (Express/Ground/Freight), hub location, photograph (via hash), expiration date, background check status.

**Document Types:**
- **Courier ID Badge:** Worn by the driver.
- **Delivery Manifest (Door Tag):** Left on the door for missed deliveries.
- **Contractor Identification:** For third-party "Gig" delivery partners.

## Data Visible After Verification

Shows the issuer domain (`fedex.com`, `ups.com`, `dhl.com`, `usps.gov`) and the driver's current status.

**Status Indications:**
- **On Duty** — Driver is currently clocked in and assigned to a route.
- **Verified** — Person is an active employee in good standing.
- **Inactive** — Person is no longer employed (e.g., fired or resigned).
- **Fraud Alert** — **ALERT:** This ID has been reported stolen or misused.

## Second-Party Use

The **Courier / Driver** (second party) receives the ID badge from the courier company (first party), **keeps it**, and may later hand it to third parties for various reasons, or never do so.

**Personal Record:** They have their own verified credential. Most of the time, the badge sits in their pocket or lanyard—the verification value is latent, there *if needed*.

**Peace of Mind:** They can confirm at any time that their employment status is active and properly recorded in the company's system.

**Future Optionality:** If a dispute arises about their employment, delivery assignments, or an incident during a delivery, they have cryptographic proof of their authorized status ready without needing to contact the company.

## Third-Party Use

The courier (second party) may hand the verified credential to various third parties:

**Property Managers / Gated Communities**
**Access Control:** Front-desk guards can instantly verify the identity of drivers from 10 different companies (FedEx, UPS, Amazon, local couriers) using a single verification app, rather than relying on their ability to recognize 10 different fake-able badges.

**Residents / Recipients**
**Safety Verification:** Before opening the door to a stranger, a resident can scan the driver's badge to confirm they are a verified on-duty courier for a real company, preventing "Fake Courier" home invasions.

**Insurance Companies**
**Liability Verification:** Verifying that a driver involved in a parking lot accident was actually on duty for the claimed company at the time of the incident.

## Verification Architecture

**The "Delivery Camouflage" Fraud Problem**

- **Uniform Theft:** Criminals buying old uniforms on eBay to pose as drivers.
- **Stolen IDs:** Using a lost/stolen badge to gain access to high-end apartment complexes.
- **Fake Door Tags:** Leaving "Missed Delivery" tags with a fake phone number to steal PII or payment info for "Re-delivery fees."

**Issuer Types (First Party)**

- National Courier Hubs (FedEx, UPS, DHL, USPS)
- Regional Delivery Services
- Third-Party Logistics (3PL) Providers

**Privacy Salt:** Required. Courier badges combine predictable values—partial names, hub locations, and standard ID formats. More critically, the hash must be salted to prevent "Stalking" attacks where someone could enumerate driver IDs and routes, creating serious safety risks for drivers. Salt also prevents "Competitor Reconnaissance" where rival firms could map out a company's delivery density and staffing patterns.

## Jurisdictional Witnessing

A jurisdiction may require courier companies to retain a **witnessing firm** for regulatory compliance. The witnessing firm:

- Receives all hashes from the courier company, and any subsequent changes to employment status as they happen—which may manifest as a new hash, a status change (off-duty, suspended, terminated), or even a 404 (record deleted)
- Receives structured content/metadata (employee IDs, hub assignments, on-duty status, route zones)
- Does **NOT** receive plaintext (driver full names, home addresses, specific delivery routes)
- Provides an immutable, timestamped audit trail—available to the jurisdiction on demand, to drivers/third parties during disputes, or as expert witness testimony in legal proceedings

This provides:
- **Non-repudiation:** Courier company cannot deny issuing credentials or employment status
- **Timestamp proof:** Badge hash existed at a specific time (critical for incident investigations)
- **Regulatory audit:** Labor departments can inspect the witness ledger for contractor misclassification
- **Resilience:** Verification works even if courier company's systems go down

**Public Blockchain (Non-Party)**

Witnessing firms may periodically commit rollups to an inexpensive public blockchain, providing an ultimate immutability guarantee. The blockchain is a "non-party"—infrastructure, not a participant in the transaction. This creates multiple verification paths:

1. **Courier company domain** — Direct check against the issuer
2. **Witnessing firm** — Independent confirmation with timestamp
3. **Public blockchain** — Decentralized trust anchor via rollup inclusion

## Privacy-Preserving Badge Design

Courier drivers complete 100-300 stops per day. Each delivery is a 10-30 second interaction where their badge is visible to the recipient, neighbors, and any doorbell cameras recording the street. Exposing full names to this volume of strangers creates unnecessary privacy risk.

**Badge shows:** First name + last initial + ID number (e.g., "Mark S 7766")

**Verification returns:** Photo, on-duty status, assigned route area, employer domain

**Why this works:**
- **Recipient gets what they need:** Photo match + confirmation courier is on-duty for a real company
- **Driver privacy protected:** Full name not broadcast to hundreds of households and doorbell recordings daily
- **Accountability preserved:** FedEx/UPS maintains full HR records; package disputes traceable via ID and timestamp
- **Audit trail intact:** All verifications logged by the courier company

This pattern applies across the gig economy: anyone doing 50+ brief interactions daily deserves privacy-preserving credentials rather than full name exposure.

## Text-to-Hash Suitability

**Primary scenario: Physical OCR, not text-to-hash.**

This use case is fundamentally **doorstep-based**. The verification happens in person: a resident looks through a peephole, a doorman stands at a lobby desk, a security guard checks credentials at a gate. The badge is physical (lanyard, card, e-ink display), and the verification happens via camera/OCR on the spot.

**Text-to-hash applicability is limited to:**
- **Insurance claims / HR disputes:** An employee emails a photo of their badge to HR or an insurer. The recipient selects the text (employee ID, salt, verify line) from the digital image and verifies.
- **After-incident verification:** Police or investigators reviewing doorbell camera footage that captured the badge details.
- **Contractor onboarding records:** Property managers archiving digital copies of badges for compliance files.

**Why this matters:** Don't build a text-to-hash-first solution for courier verification. The primary value is real-time physical authentication. Text-to-hash is a secondary use case for after-the-fact verification.

## Rationale

Courier verification bridges the "Uniform Trust Gap." By binding the physical presence of a delivery person to the company's digital HR/Dispatch record, it protects both the public from crime and the courier companies from brand damage.


---

_[Content merged from: delivery-driver-verification]_


## What is a Driver ID Badge?

With the rise of "Gig Work" (like Amazon Flex), the person delivering your package is often driving their own personal car and wearing a simple vest.

The **Driver Badge** is their "Security Key." It proves they are an authorized worker currently on an active route.

Scammers often wear fake high-visibility vests to get inside apartment buildings or gated communities to "case" homes or steal packages. Live Verify allows a doorman or resident to scan the badge and see a green "ON-DUTY" status from the company's domain, stopping "Fake Courier" home invasions.

### ID Card (dynaamic e-ink)

<div style="max-width: 400px; margin: 24px auto; font-family: sans-serif; border: 2px solid #333; border-radius: 12px; background: #fff; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.2);">
  <div style="background: #232f3e; color: #fff; padding: 15px; text-align: center; display: flex; align-items: center; justify-content: center;">
    <div style="font-size: 1.5em; margin-right: 10px;">📦</div>
    <div>
      <h3 style="margin: 0; text-transform: uppercase; letter-spacing: 1px;">AMAZON LOGISTICS</h3>
      <div style="font-size: 0.8em; opacity: 0.8;">OFFICIAL DELIVERY PARTNER</div>
    </div>
  </div>
<div style="padding: 20px; display: flex;">
    <div style="width: 100px; margin-right: 15px;">
      <div style="width: 100px; height: 125px; background: #eee; display: flex; align-items: center; justify-content: center; color: #777; border: 1px solid #ccc; border-radius: 4px;">[PHOTO ID]</div>
    </div>
    <div style="flex-grow: 1; color: #000">
      <div style="margin: 0;">DA-1 DRIVER</div>
      <div style="font-size: 1.1em; font-weight: bold; margin: 2px 0;">Carlos R 42882</div>
      <div style="font-size: 0.9em; line-height: 1.5;">
        <strong>Region:</strong> San Francisco, CA<br>
        Salt: qj7E3p2
        verify://logistics.amazon.com
      </div>
    </div>
  </div>
<div style="padding: 0 20px 20px 20px; border-top: 1px dashed #999; margin-top: 10px; font-family: 'Courier New', monospace; font-size: 0.9em; color: #999; text-align: center;">
    <p style="font-size: 0.75em; color: #555; font-style: italic; text-align: center;">
      For verification, scan this badge, the driver will always cooperate.
    </p>
  </div>
</div>

## Data Verified

Driver name, photo (hash), route ID, vehicle type/plate (partial), employment status (Active/On-Duty), delivery company name, date of authorization.

**Document Types:**
- **Driver Lanyard ID:** Carried by the driver.
- **Vehicle Window Permit:** For independent contractors (DSP/Flex).
- **Delivery App Dashboard:** Digital proof shown on the driver's phone.

## Data Visible After Verification

Shows the issuer domain (`amazon.com`, `ups.com`, `fedex.com`) and current worker status.

**Status Indications:**
- **On-Duty** — Driver is currently assigned to a route in this area.
- **Off-Duty** — Shift has ended; badge should not be used for access.
- **Suspended** — Driver under review; access restricted.
- **Invalid** — Badge reported lost or stolen.

## Second-Party Use

The **Delivery Driver** (second party) receives the ID badge from the logistics company (first party), **keeps it**, and may later hand it to third parties for various reasons, or never do so.

**Personal Record:** They have their own verified credential proving their employment and route assignment. Most of the time, the badge sits on their lanyard—the verification value is latent, there *if needed*.

**Peace of Mind:** They can confirm at any time that their on-duty status is active and properly recorded in the company's system.

**Future Optionality:** If a dispute arises about their employment, an incident during a delivery, or access issues, they have cryptographic proof of their authorized status ready without needing to contact the company.

## Third-Party Use

The delivery driver (second party) may hand the verified credential to various third parties:

**Vulnerable Residents (Elderly/Alone)**
**Personal Safety:** Before opening the door to a stranger, a resident can ask to see the driver's badge through a window or doorbell camera. Scanning the hash confirms the person is a "Verified On-Duty" driver for a real company, preventing "Fake Courier" home invasions.

**Security Guards (Doormen)**
**Lobby Integrity:** Instantly verifying that the "Independent Contractor" (Flex driver) actually has an active route for the building, preventing unauthorized people from accessing package rooms.

**Law Enforcement**
**Impersonation Checks:** Verifying the credentials of individuals claiming to be "Delivery Drivers" during neighborhood patrols or suspicious activity stops.

## Verification Architecture

**The "Fake Courier" Fraud Problem**

- **Porch Piracy Plus:** Scammers wearing high-visibility vests and fake lanyards to gain entry into apartment buildings or homes to steal packages or case the interior.
- **Identity Theft:** Using a real driver's badge after they have been fired to maintain access to high-value buildings.
- **Route Faking:** Pretending to be on a "Rush Delivery" to bypass security controls in private communities.

**Issuer Types (First Party)**

- Logistics Giants (Amazon, UPS, FedEx, DHL)
- Food Delivery Platforms (DoorDash, UberEats, GrubHub)
- Local DSPs (Delivery Service Partners)

**Privacy Salt:** Required. Driver badges combine predictable elements—partial names, regions, and standard ID formats. More critically, salt prevents "Stalking" attacks where someone could enumerate driver IDs to track specific individuals across routes, creating serious personal safety risks. This is especially important for gig workers who interact with hundreds of strangers daily.

### E-Ink Live Card (Next Generation)

<div style="max-width: 320px; margin: 24px auto; font-family: 'Courier New', monospace; border: 3px solid #232f3e; border-radius: 8px; background: #f5f5f0; padding: 20px; text-align: center; box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
  <div style="font-size: 1em; color: #232f3e; font-weight: bold; margin-bottom: 8px;">AMAZON LOGISTICS</div>
  <div style="font-size: 1em; font-weight: bold; color: #000; margin-bottom: 8px;"><span verifiable-text="start" data-for="eink-driver">[</span>Carlos R 42882</div>
  <div style="font-size: 1em; color: #333; margin-bottom: 8px;">San Francisco Metro</div>
  <div style="font-size: 1em; color: #232f3e; margin-bottom: 12px;">
    Salt: 9m2k7x3p
  </div>
  <div data-verify-line="eink-driver" style="font-size: 1em; color: #555;"
    title="Demo only: Amazon doesn't yet offer verification endpoints">
    vfy:logistics.amazon.com <span verifiable-text="end" data-for="eink-driver">]</span>
  </div>
</div>

*Salt rotates every 10 mins or per-delivery. See [E-Ink ID Cards](../e-ink-id-cards.md) for how rotating salts prevent cloning and protect driver privacy.*

## Competition vs. In-App Notifications

| Feature | Live Verify | App Notification (Amazon App) | Uniform / Physical Badge |
| :--- | :--- | :--- | :--- |
| **Integrity** | **Cryptographic.** Binds face to duty status. | **High.** Direct from server. | **Low.** Easily bought online. |
| **Accessibility** | **Universal.** Doormen can verify without an app. | **Closed Loop.** Only the *recipient* sees the alert. | **Visual.** Trusted only via logo. |
| **Trust Anchor** | **Domain-Bound.** Bound to the Company. | **System-Bound.** | **Zero.** Easily faked. |
| **Field Access** | **Instant.** 5-second scan. | **Zero.** Doorman cannot see the customer's phone. | **Instant.** |

**Why Live Verify wins here:** The "Doorman Dilemma." In a large apartment building, the doorman doesn't know which of the 500 residents ordered an Amazon package. They cannot see the resident's private app notification. Live Verify turns the **Driver's Badge** into a public-facing trust bridge, allowing the doorman to verify the driver independently.

## Related E-Ink Scenarios

See [E-Ink ID Cards](../e-ink-id-cards.md) for the full list of use cases sharing this pattern, including police officers, healthcare staff, hotel staff, residential building maintenance, and event venue crews.

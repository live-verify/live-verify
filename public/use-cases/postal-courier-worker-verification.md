---
title: "Postal & Courier Worker Verification"
category: "Identity & Authority Verification"
volume: "Very Large"
retention: "Delivery + 30 days"
slug: "postal-courier-worker-verification"
verificationMode: "camera"
tags: ["postal-worker", "royal-mail", "usps", "courier", "personal-safety", "suspicious-packages", "doorstep-fraud", "package-security"]
furtherDerivations: 1
---

> **See also:** [E-Ink ID Cards](../e-ink-id-cards.md) — comprehensive guide to rotating-salt badges, security properties, and privacy protection for high-volume workers.

## What is Postal Worker Verification?

An unexpected knock. Someone in a Royal Mail uniform with a package requiring a signature. But you weren't expecting anything. Is this person actually a postal worker?

**Package scams and fake postal worker doorstep fraud target vulnerable people.** Fraudsters pose as postal workers to gain entry, claim fake customs fees, or steal packages. Live Verify lets you scan the worker's badge before opening the door to instantly confirm they are a verified postal worker or courier currently on duty.

### ID Card (dynamic e-ink)

<div style="max-width: 400px; margin: 24px auto; font-family: sans-serif; border: 1px solid #ccc; border-radius: 8px; background: #fff; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
  <div style="background: #DA291C; color: #fff; padding: 15px; display: flex; align-items: center;">
    <div style="font-weight: bold; font-size: 1.4em; letter-spacing: -1px; margin-right: 10px;">Royal Mail</div>
    <div style="font-size: 0.8em; opacity: 0.9; border-left: 1px solid rgba(255,255,255,0.5); padding-left: 10px;">Postal Delivery<br>Authorized Personnel</div>
  </div>
<div style="padding: 20px; display: flex; background: linear-gradient(to bottom, #fff, #f9f9f9);">
    <div style="width: 100px; margin-right: 20px;">
      <div style="width: 100px; height: 125px; background: #eee; border: 2px solid #DA291C; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: #000; font-size: 0.7em; text-align: center;">[POSTAL WORKER PHOTO]</div>
    </div>
    <div style="flex-grow: 1; color: #000">
      <div style="font-size: 0.85em;">POSTAL DELIVERY OFFICER</div>
      <div style="font-size: 1.3em; font-weight: bold; margin: 0 0 4px 0;">David P 7721</div>
      <div style="font-size: 0.85em;">Employee ID: RM-441882</div>
      <div style="font-size: 0.85em;">Depot: London EC1</div>
      <div style="font-family: 'Courier New', monospace; font-size: 0.95em">
          verify://staff.royalmail.com/v
      </div>
    </div>
  </div>
</div>

## Data Verified

Worker name, photo (hash), employee ID, company/service, depot assignment, role, current shift status.

**Document Types:**
- **Postal Worker ID Badge:** Worn by the worker during deliveries.
- **Courier Service ID:** Worn by DPD, Hermes/Evri, Yodel, and other private courier company employees.
- **Delivery Manifest (Door Tag):** Left on the door for missed deliveries or requiring signature.

## Data Visible After Verification

Shows the issuer domain (`staff.royalmail.com`, `staff.usps.gov`, courier company domain) and the worker's current status.

**Status Indications:**
- **ON_DUTY** — Worker is currently clocked in and on active delivery route.
- **OFF_DUTY** — Worker's shift has ended; not currently authorized for deliveries.
- **SUSPENDED** — Worker under investigation or disciplinary review; access restricted.
- **TERMINATED** — Worker no longer employed; credential invalid.
- **404** — Record not found; credential does not exist in issuer system.

## Second-Party Use

The **Postal/Courier Worker** (second party) receives the ID badge from the postal service or courier company (first party), **keeps it**, and may later hand it to third parties for various reasons, or never do so.

**Personal Record:** They have their own verified credential proving their employment and depot assignment. Most of the time, the badge sits in their pocket or on their uniform—the verification value is latent, there *if needed*.

**Peace of Mind:** They can confirm at any time that their employment status is active and properly recorded in the company's system.

**Trust at the Door:** Recipients are more willing to accept deliveries and sign for packages when the worker can demonstrate verified on-duty status, reducing refusals and improving delivery success rates.

**Future Optionality:** If a dispute arises about their employment, incident verification, or an allegation during a delivery, they have cryptographic proof of their authorized status ready without needing to contact their employer.

## Third-Party Use

The postal/courier worker (second party) may hand the verified credential to various third parties:

**Vulnerable Recipients (Elderly, Women Alone)**
**Personal Safety:** Before opening the door to a stranger claiming to be a postal worker, a resident can ask to see their badge through a window or doorbell camera. Scanning the hash confirms the person is a "Verified On-Duty" postal worker or courier for a legitimate service, preventing "Fake Postal Worker" home invasions and package theft.

**Building Concierges / Mailroom Staff**
**Access Control:** Mailroom staff and building concierges can instantly verify that an unfamiliar person is a legitimate postal or courier worker making a delivery, preventing unauthorized access and package theft in multi-unit buildings.

**Business Premises**
**Delivery Security:** Receptionists and security staff can verify courier access for parcels and documents, ensuring only authorized workers enter restricted areas and preventing social engineering attacks using delivery pretexts.

**Law Enforcement**
**Impersonation Checks:** Police can verify credentials of individuals claiming to be postal workers during neighborhood safety checks or suspicious activity investigations.

## Verification Architecture

**The "Doorstep Fraud" Problem**

- **Fake Postal Worker Impersonation:** Criminals wearing similar uniforms to gain entry, case homes, or steal packages.
- **Uniform Theft:** Using stolen postal service uniforms to impersonate workers and commit fraud.
- **Fake "Signature Required" Pretexts:** Claiming a package needs signature to gain entry or obtain personal information.
- **Fake "Customs Fee" Scams:** Claiming to collect customs or import duties on delivered parcels (common on international shipments).
- **Suspicious Package Targeting:** Targeting vulnerable recipients (elderly, isolated) with fake delivery claims.

**Issuer Types (First Party)**

- **UK Postal Services:** Royal Mail (state-regulated)
- **US Postal Services:** USPS (federal government)
- **Private Courier Companies:** DPD, Hermes/Evri, Yodel (UK); FedEx, UPS, DHL (also deliver parcels via postal partners)
- **National Postal Services:** International postal operators

**Privacy Salt:** Required. Postal worker badges combine predictable values—partial names, depot locations, and standard ID formats. More critically, the hash must be salted to prevent "Stalking" attacks where someone could enumerate worker IDs and home depot assignments, creating serious personal safety risks for workers. Salt also prevents "Competitor Reconnaissance" where rivals or criminals could map out a postal service's staffing and delivery density patterns.

## Authority Chain

**Pattern:** Government (UK) and Federal (US) Regulated

Postal services issue worker verification documents to confirm that employees are authorized to make deliveries. These are backed by government regulatory frameworks and sovereign authority.

**UK (Royal Mail - regulated):**

```
✓ staff.royalmail.com/verify — Royal Mail postal delivery officer
  ✓ ofcom.org.uk — Regulates UK communications services
    ✓ gov.uk/verifiers — UK government root namespace
```

Royal Mail is regulated by Ofcom under the Postal Services Act. Verification credentials chain to UK government authority.

**US (USPS - sovereign):**

```
✓ staff.usps.gov/verify — USPS mail carrier
  ✓ usa.gov/verifiers — US federal government root namespace
```

USPS is a federal agency. Credentials chain directly to US government root namespace.

**Commercial Couriers (Private):**

Private courier companies (DPD, Hermes/Evri, Yodel) are commercial issuers. Trust rests on the issuer's domain reputation and regulatory compliance with consumer protection laws.

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Text-to-Hash Suitability

**Primary scenario: Physical OCR, not text-to-hash.**

This use case is fundamentally **doorstep-based**. The verification happens in person: a resident looks through a peephole, a concierge stands at a lobby desk, a security guard checks credentials at a gate. The badge is physical (card, uniform badge, e-ink display), and the verification happens via camera/OCR on the spot.

**Text-to-hash applicability is limited to:**
- **Insurance claims / HR disputes:** An employee emails a photo of their badge to HR or an insurer. The recipient selects the text (employee ID, salt, verify line) from the digital image and verifies.
- **After-incident verification:** Police or investigators reviewing doorbell camera footage that captured badge details during a suspicious visit.
- **Employer compliance records:** Postal services and courier companies archiving digital badge copies for audit trails.
- **Customs/parcel investigation:** Customs authorities verifying parcel delivery claims in fraud investigations.

**Why this matters:** Don't build a text-to-hash-first solution for postal worker verification. The primary value is real-time physical authentication at the door. Text-to-hash is a secondary use case for after-the-fact verification.

## Further Derivations

**Customs/Import Duty Collection Agent Verification (1 derivation)**

A common variant of postal fraud: someone claims to be a customs agent or import duty collector, demanding payment for "customs clearance" or "import tax" on a delivered parcel. This is typically a scam.

Live Verify supports verification of legitimate customs representatives and import duty agents authorized to collect fees on behalf of national customs authorities. Workers would carry verified credentials showing:
- Name, photo (hash), employee ID
- Customs authority or licensed collection agency
- Current authorization status
- Depot/office assignment

Vulnerable recipients (especially those receiving international parcels) can verify legitimate customs agents before opening the door or providing payment information.

## Rationale

Postal worker verification bridges the "Doorstep Trust Gap." By binding the physical presence of a postal or courier worker to the company's or service's digital HR/Dispatch record, it protects vulnerable people from doorstep fraud, home invasion, and package theft—while protecting workers from impersonation fraud and brand damage to their employers.

---

_[Content merged from: postal-worker-verification, courier-worker-verification]_

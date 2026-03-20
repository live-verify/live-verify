---
title: "Approved Trade Contractor Registrations"
category: "Professional & Occupational Licenses"
volume: "Large"
retention: "Registration period + renewal cycle"
slug: "approved-trade-contractor-registrations"
verificationMode: "clip"
tags: ["gas-safe", "niceic", "napit", "oftec", "contractor-registration", "regulated-trade", "doorstep", "consumer-protection", "utility-work", "government-work", "competent-person-scheme"]
furtherDerivations: 2
---

## What is an Approved Trade Contractor Registration?

Regulatory and industry bodies maintain registers of contractors approved to carry out specific types of work — gas installation (Gas Safe Register), electrical work (NICEIC, NAPIT), oil heating (OFTEC), solid fuel (HETAS), and renewables (MCS). These registrations exist because the work is dangerous: a badly installed boiler leaks carbon monoxide, faulty wiring starts fires, and incompetent oil tank work contaminates groundwater.

The contractor — typically a limited company or sole trader — displays their registration status on their website, on van signage, on printed materials, and on ID badges carried by individual engineers. The homeowner encounters this claim in two contexts:

1. **Online, when booking:** The contractor's website says "Gas Safe Registered" with a registration number. The homeowner has no practical way to confirm this without navigating to the registry's own lookup tool and entering the number manually.
2. **At the door, when the engineer arrives:** The engineer presents a badge or the van displays the registration. The homeowner is about to let a stranger into their home to work on systems that can kill them if installed incorrectly.

A verifiable registration claim is text issued by the registry body, embedded on the contractor's website or printed on physical credentials. The homeowner verifies it in place — by clipping the text on the website, or by clipping text from a photo of the badge — without navigating away to the registry's lookup tool.

This use case covers the **company registration** displayed on websites and physical materials. For individual engineer ID cards verified by camera scan at the doorstep, see [Gas Safe & Regulated Trade ID Cards](gas-safe-regulated-trade-cards.md).

## Example: Website Registration Claim

The registry body supplies the contractor with an HTML snippet to embed on their website. The styling is ignored by clip mode — only the text content matters for hashing.

<div style="max-width: 480px; margin: 24px auto; background: #fff; border: 2px solid #f9a825; border-radius: 8px; padding: 24px; box-shadow: 0 4px 12px rgba(249,168,37,0.15); font-family: 'Segoe UI', Arial, sans-serif;">
  <div style="display: flex; align-items: center; margin-bottom: 16px;">
    <div style="width: 40px; height: 40px; background: #000; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 0.6em; color: #f9a825; margin-right: 12px;">GAS<br>SAFE</div>
    <div style="font-size: 0.75em; color: #000; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">Registered Installer</div>
  </div>
  <span verifiable-text="start" data-for="gassafe-web"></span>
  <div style="color: #333; font-size: 0.95em; line-height: 1.7;">
    <span style="color: #000; font-weight: 600;">SafeGas Heating Ltd</span> <span style="color: #999;">(safegasheating.co.uk)</span><br>
    is a Gas Safe registered installer<br>
    <span style="color: #666;">(registration 551842)</span> on
  </div>
  <div style="margin-top: 12px; padding-top: 10px; border-top: 1px solid #ddd; font-family: 'Courier New', monospace; font-size: 0.78em; color: #000;">
    <span data-verify-line="gassafe-web">verify:gassaferegister.co.uk/engineers</span>
  </div>
  <span verifiable-text="end" data-for="gassafe-web"></span>
</div>

The text that clip mode sees and hashes:

```
SafeGas Heating Ltd (safegasheating.co.uk)
is a Gas Safe registered installer
(registration 551842) on
verify:gassaferegister.co.uk/engineers
```

The registry body controls the claim text. The contractor embeds it. The hash is unaffected by styling changes the contractor makes to match their site design.

## Example: Physical Badge or Van Signage

The same registration is displayed on an engineer's ID badge or the side of the contractor's van. The homeowner can photograph the badge at the door and clip the text from the photo.

<div style="max-width: 380px; margin: 24px auto; background: #fff; border: 2px solid #000; border-radius: 8px; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); font-family: 'Segoe UI', Arial, sans-serif;">
  <div style="display: flex; align-items: center; margin-bottom: 14px;">
    <div style="width: 36px; height: 36px; background: #000; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 0.55em; color: #f9a825; margin-right: 10px;">GAS<br>SAFE</div>
    <div style="font-size: 0.7em; color: #666; text-transform: uppercase; letter-spacing: 1px;">Contractor Badge</div>
  </div>
  <span verifiable-text="start" data-for="gassafe-badge"></span>
  <div style="color: #000; font-size: 0.95em; line-height: 1.8; font-weight: 500;">
    SafeGas Heating Ltd
  </div>
  <div style="color: #333; font-size: 0.9em; line-height: 1.6;">
    Gas Safe registered installer<br>
    Registration: 551842
  </div>
  <div style="margin-top: 10px; padding-top: 8px; border-top: 1px solid #ccc; font-family: 'Courier New', monospace; font-size: 0.78em; color: #000;">
    <span data-verify-line="gassafe-badge">verify:gassaferegister.co.uk/engineers</span>
  </div>
  <span verifiable-text="end" data-for="gassafe-badge"></span>
</div>

The text from the badge:

```
SafeGas Heating Ltd
Gas Safe registered installer
Registration: 551842
verify:gassaferegister.co.uk/engineers
```

The primary verification path is clip from the website when the homeowner is booking the work. The badge is a secondary path — less convenient (requires photographing and extracting text) but available at the moment it matters most, when someone is standing at the door asking to come in.

## Example: Unauthorized Contractor Copies the Claim

If an unregistered contractor copies the website claim onto their own site at `dodgygas.co.uk`, the hash still verifies — the text is identical. But the browser extension detects the mismatch:

1. The claim text contains `(safegasheating.co.uk)` — the extension extracts the domain
2. The verification response includes `"allowedDomains": ["safegasheating.co.uk", "*.safegasheating.co.uk"]`
3. The current page is `dodgygas.co.uk`, which matches neither

The extension shows an amber warning:

> "This registration verified, but it names safegasheating.co.uk and you are on dodgygas.co.uk."

## Example: Expired or Revoked Registration

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #7a1f1f; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;">Verification Result
═══════════════════════════════════════════════════════════════════

Status:           EXPIRED
Reason:           Registration lapsed — not renewed
Result:           This contractor is not currently registered

verify:gassaferegister.co.uk/engineers
</pre>
</div>

A contractor whose registration has expired may continue displaying the claim on their website for months. The verification endpoint returns the current status — not the status when the claim was first issued.

## Data Verified

Contractor business name, registration number, registration body, registered site domain, scope of registered work (gas appliance categories, electrical work types, oil/solid fuel specialisms), and current registration status.

**Document Types:**
- **Gas Safe Registration** — Contractor registered to carry out gas work. Registration specifies appliance categories (boilers, cookers, fires, LPG, etc.).
- **NICEIC Approved Contractor** — Electrical contractor registered under the National Inspection Council. May cover domestic installation, commercial, or specialist scopes (EV charging, solar PV).
- **NAPIT Registration** — National Association of Professional Inspectors and Testers. Competent Person Scheme for electrical, gas, plumbing, heating, and ventilation.
- **OFTEC Registration** — Oil Firing Technical Association. Covers oil-fired heating installation and servicing.
- **HETAS Registration** — Heating Equipment Testing and Approval Scheme. Covers solid fuel appliance installation (wood burners, biomass, chimneys).
- **MCS Certification** — Microgeneration Certification Scheme. Required for installers of heat pumps, solar PV, and other renewables. Customers need an MCS-certified installer to access government incentives.

**Privacy Salt:** Generally not required. Contractor registrations are public-facing commercial claims that the contractor actively wants to display. The registry may salt if internal registration metadata is commercially sensitive.

## Data Visible After Verification

Shows the issuer domain (e.g., `gassaferegister.co.uk`, `niceic.com`, `napit.org.uk`) and the contractor's current registration status.

**Verification Response Format:**

```json
{
  "status": "verified",
  "allowedDomains": ["safegasheating.co.uk", "*.safegasheating.co.uk"]
}
```

**Status Indications:**
- **Registered** — Current registration is active for the stated scope of work.
- **Expired** — Registration has lapsed. Contractor should not be carrying out regulated work.
- **Revoked** — Registration removed by the registry body. For gas work, it is a criminal offence to continue.
- **Suspended** — Registration paused pending investigation or failed inspection.
- **Scope Restricted** — Registered, but one or more work categories removed since the claim was issued. The contractor may be registered for boiler servicing but no longer for new installations.
- **404** — No such registration exists at the claimed registry.

## Second-Party Use

The **homeowner** benefits directly.

**When booking online:** The homeowner finds a contractor's website claiming Gas Safe registration. They clip the registration claim on the page. The response confirms the contractor is currently registered and the domain matches. The homeowner books the work with confidence that the claim is not self-asserted.

**At the front door:** The engineer arrives and shows a badge. The homeowner photographs it, clips the text, and verifies. This is less convenient than the website clip but it answers the immediate question: is this person's employer actually registered to do this work? The homeowner is about to let a stranger into their home to work on gas, electrics, or plumbing — systems that can kill if installed badly.

**Scope check:** The contractor's website says "Gas Safe registered." The homeowner is booking a gas fire installation. Verification confirms the contractor is registered for boilers and cookers but not fires. The registration is genuine — just not for this job.

## Third-Party Use

**Insurers**

**Claims investigation:** After a gas leak, fire, or carbon monoxide incident, the insurer checks whether the work was done by a registered contractor. A verified registration claim on the contractor's website — captured at the time of booking — provides evidence that the homeowner exercised reasonable diligence. No verification trail may complicate the claim.

**Health and Safety Executive (HSE)**

**Enforcement:** The HSE oversees Gas Safe Register. When investigating illegal gas work, verified registration claims (or their absence) provide an evidence trail. A contractor displaying a verified Gas Safe claim that later shows as revoked creates a clear timeline of when the registration was lost relative to when work was carried out.

**Local Authority Building Control**

**Notification compliance:** Gas, electrical, and oil work must be notified to Building Control or self-certified by a contractor registered under a Competent Person Scheme. Verified registration confirms the contractor was actually qualified to self-certify at the time of the work.

**Landlords and Letting Agents**

**Contractor vetting:** Landlords must use registered contractors for gas safety checks and electrical inspections in rental properties. Verified registration claims provide an auditable record that the landlord used qualified contractors — relevant in the event of a tenant injury or death.

**Warranty and Guarantee Providers**

**Installation validation:** Boiler and appliance manufacturers (Worcester Bosch, Vaillant, Baxi) require installation by a registered contractor for warranty to apply. Verified registration at the time of installation proves the warranty condition was met.

## Verification Architecture

**The Unregistered Contractor Problem**

Hundreds of thousands of gas, electrical, and oil jobs are carried out each year by unregistered contractors in the UK. The consequences are not theoretical:

- **Carbon monoxide poisoning** from badly installed gas appliances kills 30-40 people annually in the UK and hospitalises hundreds. Many cases involve unregistered fitters.
- **Electrical fires** from non-compliant wiring. Faulty electrical installations are a leading cause of accidental house fires.
- **Fake Gas Safe ID cards** are available online for trivial cost. The hologram on the genuine card is the only anti-forgery feature.
- **Expired registrations** — a contractor fails an inspection and loses registration but continues trading on the old claim. Their website still says "Gas Safe Registered" because nobody updated the page.
- **Scope overreach** — a contractor registered for boiler servicing claims competence for full installations, or a domestic electrical installer takes on commercial work outside their registered scope.
- **CORGI confusion** — CORGI was replaced by Gas Safe in 2009, but some operators still claim "CORGI registered" to exploit residual brand recognition. CORGI now operates as a commercial home services brand unrelated to gas safety registration.

The verifiable claim addresses these because:

1. The registry body issues the claim — it is not self-asserted by the contractor
2. The claim names the specific website where it applies
3. Expiry and revocation are immediate — the endpoint returns the current status
4. The browser extension detects domain mismatches when claims are copied to other sites
5. The scope of registered work is part of the verified response, not just the printed claim

## Competition vs. Current Practice

| Feature | Live Verify | Registry Website Lookup | Plastic ID Card | Phone Call to Registry |
| :--- | :--- | :--- | :--- | :--- |
| **Issuer-controlled** | **Yes.** Registry issues the claim. | **Yes.** But requires the homeowner to navigate there. | **Yes.** But static at time of printing. | **Yes.** But slow and inconvenient. |
| **Verifiable at point of encounter** | **Yes.** On the contractor's own website. | **No.** Requires leaving the site. | **Partially.** Card shown at door, but no live status. | **Partially.** If the homeowner calls before letting them in. |
| **Shows current status** | **Yes.** Live response from registry. | **Yes.** If the homeowner knows to check. | **No.** Shows status at time of printing. | **Yes.** But requires a phone call. |
| **Detects expired registration** | **Yes.** Endpoint returns EXPIRED. | **Yes.** If checked. | **No.** Card may still look valid. | **Yes.** |
| **Detects scope overreach** | **Yes.** Response includes registered categories. | **Yes.** If the homeowner reads carefully. | **Partially.** Categories printed but may be outdated. | **Yes.** If the homeowner asks. |
| **Detects copied claims** | **Yes.** Domain mismatch warning. | **No.** | **No.** | **No.** |

**Practical conclusion:** The registry lookup tools work well for the small number of homeowners who use them. The problem is that most people do not. They see "Gas Safe Registered" on a website or a badge and take it at face value. A verifiable claim embedded on the contractor's own site turns "trust me" into "check me" at the moment the homeowner is making their decision — without requiring them to know the registry's URL, navigate to it, and enter a number.

## Authority Chain

**Pattern:** Regulated

Gas Safe Register operates under a legal monopoly from the Health and Safety Executive. NICEIC, NAPIT, and OFTEC operate as government-approved Competent Person Schemes.

```
✓ gassaferegister.co.uk/engineers — Gas contractor registration
  ✓ hse.gov.uk — Health and Safety Executive oversight
    ✓ gov.uk/verifiers — UK government root namespace
```

For electrical Competent Person Schemes:

```
✓ niceic.com/verify — Electrical contractor registration
  ✓ gov.uk/building-regulations-competent-person-schemes — DCLG oversight
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Further Derivations

1. **Installation Completion Certificates** — Per-job verification that a specific installation was carried out by a registered contractor, linked to the property address and the work type. Issued after the job, carried on the certificate itself.
2. **Landlord Gas Safety Records (CP12)** — Annual gas safety certificate for rental properties, verified as issued by a contractor who was registered at the time of the inspection.

---
title: "Landlord Licensing Status"
category: "Real Estate & Property"
volume: "Large"
retention: "Licence period + renewal cycle"
slug: "landlord-licensing-status"
verificationMode: "clip"
tags: ["landlord", "licensing", "selective-licensing", "hmo", "council", "tenant", "rental", "property", "letting-agent", "housing"]
furtherDerivations: 2
---

## The Problem

Many local authorities in England and Wales operate landlord licensing schemes. Mandatory HMO licensing applies nationally to larger houses in multiple occupation. Selective licensing and additional HMO licensing are declared by individual councils, covering specific wards or entire boroughs. The landlord (or their managing agent) must hold a valid licence before letting the property.

Tenants have no practical way to verify that their landlord is licensed. Some councils publish a register, but these are inconsistent in format, hard to find, and harder to search. A tenant would need to know which licensing scheme applies, navigate to the correct council page, and search by address or licence number. Most do not. Letting agent listings and landlord websites may claim the property is licensed, but these claims are self-asserted.

An unlicensed landlord faces penalties — including rent repayment orders where a tribunal can order the landlord to repay up to twelve months' rent — but the tenant must first establish that the property was unlicensed. A verifiable licensing claim issued by the council and displayed on the letting agent's listing or in the property itself would let tenants, agents, and enforcement officers confirm licensing status at the point it matters.

**Why verification matters — for both sides:**

- **Tenants can claim up to 12 months' rent back.** Under the Housing and Planning Act 2016, a tenant in an unlicensed property can apply to a First-tier Tribunal for a Rent Repayment Order. At £1,200/month, that is £14,400 the landlord must repay — plus the landlord cannot serve a Section 21 eviction notice while the property is unlicensed.
- **Licensed landlords benefit from proof.** A landlord who has paid the licence fee and met the conditions has an interest in being visibly compliant. Prospective tenants can see the licence is genuine and current. In enforcement actions, the licensed landlord has a verifiable record from the council's domain — not a self-asserted claim on a listing page.
- **Letting agents need to check before marketing.** An agent who markets an unlicensed property in a selective licensing area faces their own regulatory risk. A verifiable licence status check at listing time protects the agent from unknowingly facilitating an offence.

## Landlord Licensing Status — Web Version

Displayed on the letting agent's property listing or the landlord's own website. The council issues the claim text; the landlord or agent embeds it.

<div style="max-width: 520px; margin: 24px auto; background: #fff; border: 2px solid #1565c0; border-radius: 8px; padding: 24px; box-shadow: 0 4px 12px rgba(21,101,192,0.12); font-family: 'Segoe UI', Arial, sans-serif;">
  <div style="font-size: 0.75em; color: #1565c0; text-transform: uppercase; letter-spacing: 2px; font-weight: 600; margin-bottom: 16px;">Licensed Property</div>
  <span verifiable-text="start" data-for="landlord-web"></span>
  <div style="color: #333; font-size: 0.95em; line-height: 1.7;">
    <span style="color: #000; font-weight: 600;">Cedar Properties Ltd</span> <span style="color: #999;">(cedarproperties.co.uk)</span><br>
    is a licensed landlord for 14 Cedar Grove, York<br>
    <span style="color: #666;">(Selective Licence SL-2026-441882)</span> on
  </div>
  <div style="margin-top: 12px; padding-top: 10px; border-top: 1px solid #ddd; font-family: 'Courier New', monospace; font-size: 0.78em; color: #000;">
    <span data-verify-line="landlord-web">verify:york.gov.uk/landlord-licensing/v</span>
  </div>
  <span verifiable-text="end" data-for="landlord-web"></span>
</div>

The text that clip mode sees and hashes:

```
Cedar Properties Ltd (cedarproperties.co.uk)
is a licensed landlord for 14 Cedar Grove, York
(Selective Licence SL-2026-441882) on
verify:york.gov.uk/landlord-licensing/v
```

The council controls the claim text. The landlord or letting agent embeds it. The hash is unaffected by styling changes.

## Landlord Licensing Status — Physical Version

Displayed in the property — typically in a common area for HMOs, or near the meter cupboard or entrance hall for single-let properties. Printed or laminated by the landlord from a template issued by the council.

<div style="max-width: 420px; margin: 24px auto; background: #fff; border: 2px solid #333; border-radius: 8px; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); font-family: 'Segoe UI', Arial, sans-serif;">
  <span verifiable-text="start" data-for="landlord-physical"></span>
  <div style="color: #000; font-size: 0.95em; line-height: 1.8;">
    This property is licensed under<br>
    <span style="font-weight: 600;">York City Council Selective Licensing</span>
  </div>
  <div style="color: #333; font-size: 0.9em; line-height: 1.6; margin-top: 8px;">
    Licence: SL-2026-441882<br>
    Landlord: Cedar Properties Ltd
  </div>
  <div style="margin-top: 12px; padding-top: 8px; border-top: 1px solid #ccc; font-family: 'Courier New', monospace; font-size: 0.78em; color: #000;">
    <span data-verify-line="landlord-physical">verify:york.gov.uk/landlord-licensing/v</span>
  </div>
  <span verifiable-text="end" data-for="landlord-physical"></span>
</div>

The text from the physical notice:

```
This property is licensed under
York City Council Selective Licensing
Licence: SL-2026-441882
Landlord: Cedar Properties Ltd
verify:york.gov.uk/landlord-licensing/v
```

A tenant photographs the notice and clips the text from the photo to verify.

## Example: Unlicensed Landlord Copies the Claim

If an unlicensed landlord copies the web claim onto their own listing at `shadylettings.co.uk`, the hash still verifies — the text is identical. But the browser extension detects the mismatch:

1. The claim text contains `(cedarproperties.co.uk)` — the extension extracts the domain
2. The verification response includes `"allowedDomains": ["cedarproperties.co.uk", "*.cedarproperties.co.uk"]`
3. The current page is `shadylettings.co.uk`, which matches neither

The extension shows an amber warning:

> "This licence verified, but it names cedarproperties.co.uk and you are on shadylettings.co.uk."

## Example: Expired Licence

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #7a1f1f; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;">Verification Result
═══════════════════════════════════════════════════════════════════

Status:           EXPIRED
Reason:           Licence expired — not renewed
Result:           This property is not currently licensed

verify:york.gov.uk/landlord-licensing/v
</pre>
</div>

A landlord whose licence has expired may continue displaying the claim on their listing or in the property for months. The verification endpoint returns the current status.

## Example: Licence Type vs. Actual Occupancy

A property is let to multiple tenants as a shared house. The landlord holds a selective licence. The verification confirms the selective licence is genuine.

Whether mandatory HMO licensing is also required depends on the actual occupancy — number of tenants, number of households, number of storeys — which are facts about the property's current use, not facts the council's licensing endpoint necessarily knows in real time. The artifact can confirm the licence held; it cannot by itself confirm the actual occupancy state that determines whether a different licence type was required. A tenant or enforcement officer who sees "Selective Licence" for a property they believe is an HMO has a prompt for further enquiry with the council, not a conclusion.

## Data Verified

Landlord name, property address, licence type (selective, additional HMO, mandatory HMO), licence number, issuing council, and current licence status.

**Privacy Salt:** Required. Property addresses and landlord names are semi-public, but the combination of address, landlord identity, and licence status could be enumerated. The hash must be salted to prevent an adversary from constructing lookups against known addresses.

## Data Visible After Verification

Shows the issuer domain (e.g., `york.gov.uk`) and confirms whether the landlord licensing claim is current.

**Verification Response Format:**

```json
{
  "status": "verified",
  "allowedDomains": ["cedarproperties.co.uk", "*.cedarproperties.co.uk"]
}
```

**Status Indications:**
- **Licensed** — Current licence is active for the stated property and licence type.
- **Expired** — Licence has lapsed and was not renewed. The landlord should not be letting the property without a valid licence.
- **Revoked** — Licence removed by the council, typically following serious breaches of licence conditions or a "fit and proper person" failure.
- **Suspended** — Licence paused pending investigation or enforcement action.
- **Application Pending** — A licence application has been submitted but not yet determined. In some schemes, a landlord may lawfully let while a properly made application is pending.
- **404** — No such licence exists at the claimed council.

## Second-Party Use

The **landlord** benefits directly by demonstrating compliance. Landlord licensing carries obligations — fire safety standards, gas and electrical safety certificates, property condition requirements — and a verified licence confirms to tenants and agents that the landlord has met the council's threshold for issuing a licence.

**When advertising a property:** The landlord or letting agent embeds the council-issued claim on the listing. A prospective tenant clips the text and verifies before signing a tenancy agreement. The tenant confirms the property is licensed without navigating the council's register.

**When challenged by a tenant:** If a tenant questions licensing status (for example, after learning about rent repayment order rights), the landlord points to the verifiable claim displayed in the property. The tenant photographs it, clips the text, and gets a current answer from the council's domain.

## Third-Party Use

**Tenants**

The primary beneficiary. A tenant who discovers their landlord is unlicensed may apply for a rent repayment order through the First-tier Tribunal, recovering up to twelve months' rent. A verified licensing claim — or the absence of one — provides factual grounding for that decision. Tenants in licensed properties benefit from the assurance that minimum standards have been assessed.

**Letting Agents**

Letting agents have a professional interest in confirming that properties they market are properly licensed. An agent who lets an unlicensed property may face reputational damage and, depending on the scheme, potential liability. A verified licensing claim from the council removes reliance on the landlord's self-declaration.

**Council Enforcement Officers**

Enforcement officers investigating unlicensed letting can use verification status as part of their evidence trail. A property displaying a verified licensing claim that returns EXPIRED or REVOKED provides a clear timestamp of when the licence was lost relative to continued letting activity.

**Mortgage Lenders**

Some buy-to-let mortgage conditions require the landlord to comply with all applicable licensing requirements. A verified licensing claim provides direct evidence from the council that the condition is met, without requiring the lender to search the council's register manually.

## Verification Architecture

**The Unlicensed Letting Problem**

Landlord licensing non-compliance is widespread:

- **Selective licensing schemes** can cover tens of thousands of properties in a single borough. Compliance rates in early years of a scheme are often below 70%.
- **Mandatory HMO licensing** has been required nationally since 2006 (extended in 2018), yet many licensable HMOs remain unlicensed because the landlord does not recognise the property meets the threshold.
- **Licence conditions** require minimum property standards, gas and electrical safety, and management practices. An unlicensed property has had none of these assessed.
- **Rent repayment orders** create a financial incentive for tenants to establish licensing status, but the council's register is often the only source and it may be incomplete, out of date, or difficult to search.
- **Expired licences** — a five-year selective licence expires and the landlord continues letting without renewal. The property was once licensed; it no longer is.

The verifiable claim addresses these because:

1. The council issues the claim — it is not self-asserted by the landlord
2. The claim names the specific website where it applies (for web versions)
3. Expiry and revocation are immediate — the endpoint returns the current status
4. The browser extension detects domain mismatches when claims are copied to other listings
5. The licence type is part of the verified response, allowing tenants to check it matches the occupancy

## Competition vs. Current Practice

| Feature | Live Verify | Council Online Register | Phone Call to Council |
| :--- | :--- | :--- | :--- |
| **Issuer-controlled** | **Yes.** Council issues the claim. | **Yes.** But requires the tenant to find and search it. | **Yes.** But slow and limited to office hours. |
| **Verifiable at point of encounter** | **Yes.** On the listing or in the property. | **No.** Requires navigating to the council's site. | **No.** Requires a phone call. |
| **Shows current status** | **Yes.** Live response from council. | **Partially.** Register may lag behind actual licence status. | **Yes.** If the officer has access. |
| **Detects expired licence** | **Yes.** Endpoint returns EXPIRED. | **Depends.** Some registers remove expired entries. | **Yes.** |
| **Detects wrong licence type** | **Yes.** Response includes licence type. | **Partially.** If the tenant knows what to look for. | **Yes.** If the tenant asks. |
| **Detects copied claims** | **Yes.** Domain mismatch warning. | **No.** | **No.** |
| **Available 24/7** | **Yes.** | **Yes.** But search quality varies. | **No.** |

## Authority Chain

**Pattern:** Government

The local authority (here, City of York Council) is the licensing authority for landlord licensing schemes within its area, operating under Part 2 (selective licensing) and Part 3 (HMO licensing) of the Housing Act 2004.

```
✓ york.gov.uk/landlord-licensing/v — Issues verified landlord licensing status
  ✓ york.gov.uk — Local housing authority
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Further Derivations

None currently identified.

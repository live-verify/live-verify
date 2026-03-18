---
title: "Real Estate Showing Agent Verification"
category: "Identity & Authority Verification"
volume: "Medium"
retention: "Showing + 1-3 years (liability)"
slug: "real-estate-showing-agent-verification"
verificationMode: "camera"
tags: ["real-estate", "estate-agent", "property-showing", "personal-safety", "female-safety", "agent-verification", "vacant-property"]
furtherDerivations: 1
---

## What is a Real Estate Agent Verification?

When you arrange to view a property, you're meeting a stranger at a vacant location. You found the listing online. A person claims to be the agent at the door. You're about to walk into an empty property alone with someone you've never met.

The **Verified Badge** is the agent's digital credential. It proves:
1. **Identity:** They are a registered real estate professional with a current license.
2. **Agency:** They are affiliated with a legitimate agency and properly insured.
3. **Status:** Their license is active, not expired or revoked.

Documented cases in the USA, Canada, and Australia show criminals posing as agents to lure victims to empty properties for robbery or assault. Women are disproportionately targeted. Live Verify allows you to scan the agent's credential before entering the property, confirming they are a legitimate, verified professional.

<div style="max-width: 480px; margin: 24px auto; font-family: sans-serif; border: 2px solid #333; border-radius: 12px; background: #fff; box-shadow: 0 4px 10px rgba(0,0,0,0.2); position: relative;">

  <div style="background: #1a237e; color: #fff; padding: 15px; text-align: center; display: flex; align-items: center; justify-content: center;">
    <div style="font-size: 1.5em; margin-right: 10px;">🏠</div>
    <div>
      <h3 style="margin: 0; text-transform: uppercase; letter-spacing: 1px;">VERIFIED ESTATE AGENT</h3>
      <div style="font-size: 0.8em; opacity: 0.8;">OFFICIAL LICENSE & PROFESSIONAL CREDENTIALS</div>
    </div>
  </div>
  <div style="padding: 20px; display: flex;">
    <div style="width: 100px; margin-right: 15px;">
      <div style="width: 100px; height: 125px; background: #eee; display: flex; align-items: center; justify-content: center; color: #777; border: 1px solid #ccc; border-radius: 4px;">[PHOTO ID]</div>
    </div>
    <div style="flex-grow: 1; background: #f9f9f9; border: 1px solid #999; padding: 12px; font-size: 0.9em; color: #000; line-height: 1.5;">
      ESTATE AGENT<br>
      SARAH MITCHELL<br>
      License #: ARLA-22881 (UK) / DRE-01234567 (CA)<br>
      Agency: Knight Frank<br>
      Status: ACTIVE / INSURED<br>
      Verified via the Property Authority.<br>
      Includes current professional indemnity insurance<br>
      and agent credentials verification.<br>
      <span style="font-family: 'Courier New', monospace;"
        title="Verification endpoint for agent credentials">verify:propertymark.co.uk/v</span>
    </div>
  </div>
</div>

## Data Verified

Agent name, photo (hash), licence number, agency affiliation, licence status, professional indemnity insurance status, issuing regulatory body.

**Document Types:**
- **Agent ID Card:** Carried by the agent during property showings.
- **Agency Credential Confirmation:** Verifying the agent's current affiliation and authorization to represent the agency.
- **Insurance Certificate:** Proof of active professional indemnity insurance coverage.
- **License Status Report:** Confirming the agent's license is active and in good standing.

## Verification Response

The endpoint returns a simple status code:

- **ACTIVE** — License is valid and insurance is in force
- **SUSPENDED** — License removed due to disciplinary action; do not proceed with showing
- **EXPIRED** — License has expired; agent is not authorized to conduct viewings
- **REVOKED** — License revoked for serious violations; property viewing not authorized
- **404** — License not found (forged badge, wrong jurisdiction, or data entry error)

The issuer domain is visible from the `verify:` line on the badge itself (e.g., `propertymark.co.uk` or `dre.ca.gov`).

## Post-Verification Actions

After successful verification, property viewers are presented with safety options:

```
HTTP 200 OK
Status: ACTIVE

--- Safety & Verification Options ---

This agent has been verified and is licensed and insured.

Consider sharing your showing location with an emergency contact:

SHARE MY DETAILS
- Send verified agent identity + property address to emergency contact
- Automatic check-in reminder after showing
- One-touch emergency call if needed

RECORD THIS SHOWING
- Property address: [address]
- Agent verified: [name] from [agency]
- Showing date/time: [timestamp]
- My notes/observations: [optional]

POST to: https://propertymark.co.uk/viewer-feedback

Fields:
- Property address: [address]
- Agent professionalism: [Professional / Acceptable / Concerning]
- Property condition: [Well-maintained / Standard / Poor]
- Safety concerns: [None / Minor / Significant]
- Would you view another property with this agent? [Y/N]
- Additional notes: [optional]
```

**Why This Matters:**

- **Deterrent effect:** Criminals know verified agents are tracked and monitored; luring victims through fake agents becomes higher risk.
- **Safety network:** Viewers can document problematic agents; patterns trigger regulatory review.
- **Evidence trail:** Contemporaneous records help authorities investigate fraud or assault.
- **Viewer confidence:** Especially important for solo female viewers in unfamiliar areas at off-peak times.
- **Professional accountability:** Agents benefit from clean verification records; incentive to maintain credentials.

**The "Share Your Location" Principle:**

After scanning a verified agent, the app offers to share the agent's verified identity and property address with an emergency contact. This serves dual purposes:

1. **Safety:** Someone knows where you are and with whom.
2. **Deterrent:** The criminal knows the victim is broadcasting their identity and location to a third party.

## Second-Party Use

The **Estate Agent** benefits from verification.

**Customer Trust:** Proving to a property viewer at the door that they are a legitimate, licensed professional with active insurance and verified credentials. This removes friction, especially with cautious buyers and sellers who are wary of property-show scams.

**Professional Reputation:** Building a visible "Verified" status in digital property listings and agent profiles. Solo female viewers especially value confirmation of agent legitimacy before entering vacant properties.

**Competitive Advantage:** Including a "Verified License Badge" in email confirmations and property viewing invitations signals professionalism and commitment to viewer safety.

## Third-Party Use

**Property Viewers (Primary Safety Case)**
**Assault Prevention:** Before viewing a property alone, a viewer (or their emergency contact via shared location) can scan the agent's badge. "Verified by [Authority]" confirms the person isn't a criminal posing as an agent to lure the victim to a vacant property.

**Solo Female Viewers:** Women viewing properties alone are at elevated risk. Verification provides rapid confirmation of legitimacy in the threshold moment before entering an empty space.

**Landlords & Property Owners**
**Agent Vetting:** Confirming that an agent claiming to represent their property for rent or sale is actually licensed and in good standing. Protects owners from unauthorized agents conducting fraudulent viewings.

**Mortgage Lenders & Title Companies**
**Transaction Verification:** Confirming agent credentials on property transaction documents before closing. Reduces fraud risk if agent identity was misrepresented during the sale process.

## Verification Architecture

**The "Fake Agent" Fraud Problem**

- **Luring Victims:** Criminals post fake property listings, then pose as agents to lure viewers to empty properties for robbery or assault.
- **Unregistered Operators:** Individuals conducting property viewings without licenses, lacking professional indemnity insurance, and operating outside regulatory oversight.
- **Case Casing:** Using fake viewings to case residential or commercial properties for future burglary or fraud.
- **Sex Trafficking:** In rare cases, fake agent schemes are used to isolate and exploit victims.

**Issuer Types** (First Party)

**UK Regulatory Bodies:**
- **Propertymark:** Sets standards and maintains registry of accredited estate agents.
- **ARLA Propertymark:** Association of Residential Letting Agents; maintains agent license registry.

**US State Regulatory Bodies:**
- **California DRE:** Department of Real Estate; licenses and regulates real estate professionals.
- **State Real Estate Commissions:** Each US state maintains its own licensing authority.

**International Bodies:**
- **Royal Institution of Chartered Surveyors (RICS):** UK-based; maintains international property professional credentials.

**Privacy Salt:** Critical consideration. Agent location data and property showing routes are sensitive. The photo hash MUST be salted to prevent "Mass Scraping" of agent schedules and property workflows.

## Authority Chain

**UK Pattern: Commercial Issuer — Self-Authorized**

A regulatory body (Propertymark or ARLA) issues agent credentials and maintains the authoritative registry. The issuer is self-authorized to confirm license status.

```
✓ agents.propertymark.co.uk/verify — Propertymark-accredited estate agent
  ✓ propertymark.co.uk — Sets standards for UK property professionals
```

Commercial issuer — self-authorized. Trust rests on the issuer's domain reputation and regulatory mandate.

**US Pattern: Government Issuer — State Authority**

State-level real estate licensing authorities (e.g., California DRE) are government bodies authorized to issue and revoke licenses. Verification flows directly to state endpoints.

```
✓ dre.ca.gov/verify — California licensed real estate agent
  ✓ california.gov — California state government
```

Government issuer — authorized by state statute. Trust is rooted in government legitimacy.

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Jurisdictional Witnessing

A jurisdiction may require the issuer to retain a **witnessing firm** for regulatory compliance. The witnessing firm:

- Receives all hashes from the issuer, and any subsequent changes to the payload as they happen—which may manifest as a new hash, a status change, or even a 404 (record deleted)
- Receives structured content/metadata (key identifiers and dates)
- Does **NOT** receive plaintext or sensitive personal information
- Provides an immutable, timestamped audit trail—available to the jurisdiction on demand, to document holders/third parties during disputes, or as expert witness testimony in legal proceedings

This provides:
- **Non-repudiation:** Issuer cannot deny issuing the license
- **Timestamp proof:** License existed and was valid at a specific time
- **Regulatory audit:** Jurisdictions can inspect the witness ledger for fraud detection
- **Resilience:** Verification works even if issuer's systems are temporarily unavailable

**Public Blockchain (Non-Party)**

Witnessing firms may periodically commit rollups to an inexpensive public blockchain, providing an ultimate immutability guarantee. The blockchain is a "non-party"—infrastructure, not a participant in the transaction. This creates multiple verification paths:

1. **Issuer domain** — Direct check against the regulatory authority
2. **Witnessing firm** — Independent confirmation with timestamp
3. **Public blockchain** — Decentralized trust anchor via rollup inclusion


## Competition vs. Review Sites (Google Reviews)

| Feature | Live Verify | Review Sites (Google/Glassdoor) | Physical License Card |
| :--- | :--- | :--- | :--- |
| **Trust Anchor** | **Domain-Bound.** Bound to the Gov/Board. | **Social-Bound.** Trusted only via crowd opinion. | **Zero.** Easily forged. |
| **Integrity** | **Cryptographic.** Binds face to license. | **Vulnerable.** Reviews can be faked/bought. | **None.** Forged cards circulate freely. |
| **Speed** | **Instant.** 5-second scan. | **Slow.** Requires reading multiple reviews. | **Instant.** No way to verify authenticity. |
| **Safety Data** | **High.** Shows license status and regulatory history. | **Subjective.** Only shows customer satisfaction. | **N/A.** No way to check current status. |

**Why Live Verify wins here:** The "Threshold Moment." Property viewers make the decision to enter a vacant building in seconds. They don't want to read 50 Google reviews while a stranger stands at the door. Live Verify turns the **Agent Badge** into a live, non-confrontational safety tool that provides instant, high-authority confirmation and creates a documented deterrent.

---
title: "Real Estate Showing Agent Verification"
category: "Identity & Authority Verification"
volume: "Medium"
retention: "Showing + 1-3 years (liability)"
slug: "real-estate-showing-agent-verification"
verificationMode: "camera"
tags: ["real-estate", "estate-agent", "property-showing", "personal-safety", "female-safety", "agent-verification", "vacant-property"]
furtherDerivations: 0
---

## What is a Real Estate Agent Verification?

When you arrange to view a property, you're meeting a stranger at a vacant location. You found the listing online. A person claims to be the agent at the door. You're about to walk into an empty property alone with someone you've never met.

The Verified Badge is the agent's digital credential. It proves:
1. **Identity:** They are a registered real estate professional with a current license.
2. **Agency:** They are affiliated with a legitimate agency and properly insured.
3. **Status:** Their license is active, not expired or revoked.

Documented cases in the USA, Canada, and Australia show criminals posing as agents to lure victims to empty properties for robbery or assault. Women are disproportionately targeted. Live Verify allows you to scan the agent's credential before entering the property, confirming they are a legitimate, verified professional.

**Perspective:** This use case is written from the prospective buyer's or renter's perspective. The showing is at a vacant property with a stranger claiming to be the agent.

**Institutional power asymmetry:** The agent controls access to the property and sets the terms of the viewing — the viewer has travelled to an unfamiliar, often empty location on the agent's invitation.

**Verification asymmetry:** The viewer is being asked to enter a vacant property with a stranger immediately, but lacks a fast independent way to confirm the person is a currently licensed agent affiliated with the agency that listed the property.

**Why would you bother checking?** Because this is a personal safety issue, not just a fraud issue. You are meeting a stranger you found on the internet, at an empty property, often alone. There are no witnesses, no staff, no CCTV in most residential showings. Documented cases in the US, Canada, and Australia involve victims lured to vacant properties by people posing as agents for robbery, sexual assault, or worse. A 5-second scan before stepping inside is the lowest-friction safety check available in that moment.

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
      <span verifiable-text="start" data-for="agent"></span>ESTATE AGENT<br>
      SARAH MITCHELL<br>
      Licence #: ARLA-22881<br>
      Agency: Causton Estates<br>
      Issued by: ARLA Propertymark<br>
      Salt: 2b7j5d8g<br>
      <span data-verify-line="agent" style="font-family: 'Courier New', monospace;"
        title="Demo only: the register doesn't yet offer verification&#10;endpoints, so this is illustrative">verify:agents.propertymark.co.uk/v</span> <span verifiable-text="end" data-for="agent"></span>
    </div>
  </div>
</div>

## The Problem: Fake Agent Fraud

- **Luring Victims:** Criminals post fake property listings, then pose as agents to lure viewers to empty properties for robbery or assault.
- **Unregistered Operators:** Individuals conducting property viewings without licenses, lacking professional indemnity insurance, and operating outside regulatory oversight.
- **Case Casing:** Using fake viewings to case residential or commercial properties for future burglary or fraud.
- **Sex Trafficking:** In rare cases, fake agent schemes are used to isolate and exploit victims.

## What Is Checked

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

The issuer domain is visible from the `verify:` line on the badge itself (e.g., `agents.propertymark.co.uk`).

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

POST to: https://agents.propertymark.co.uk/viewer-feedback

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

## Who Holds It

The Estate Agent benefits from verification.

**Customer Trust:** Proving to a property viewer at the door that they are a legitimate, licensed professional with active insurance and verified credentials. This removes friction, especially with cautious buyers and sellers who are wary of property-show scams.

**Professional Reputation:** Building a visible "Verified" status in digital property listings and agent profiles. Solo female viewers especially value confirmation of agent legitimacy before entering vacant properties.

**Competitive Advantage:** Including a "Verified License Badge" in email confirmations and property viewing invitations signals professionalism and commitment to viewer safety.

## Who Checks It

**Property Viewers (Primary Safety Case)**
**Assault Prevention:** Before viewing a property alone, a viewer (or their emergency contact via shared location) can scan the agent's badge. "Verified by [Authority]" confirms the person isn't a criminal posing as an agent to lure the victim to a vacant property.

**Solo Female Viewers:** Women viewing properties alone are at elevated risk. Verification provides rapid confirmation of legitimacy in the threshold moment before entering an empty space.

**Landlords & Property Owners**
**Agent Vetting:** Confirming that an agent claiming to represent their property for rent or sale is actually licensed and in good standing. Protects owners from unauthorized agents conducting fraudulent viewings.

**Mortgage Lenders & Title Companies**
**Transaction Verification:** Confirming agent credentials on property transaction documents before closing. Reduces fraud risk if agent identity was misrepresented during the sale process.

## Who Issues It

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

## Where Each Fits: Live Verify, Review Sites and Licence Cards

Review sites such as Google Reviews are run by the platforms and collect opinions from past clients; licence cards and registers are run by licensing bodies, which differ by country and, in the US, by state. Reviews and a licence check answer different questions: reviews say how an agency has treated people, while a licence check says whether this person is currently registered. Both are worth having, and they work side by side.

| | Review sites | Physical licence card | Live Verify on the agent's badge |
| :--- | :--- | :--- | :--- |
| **Who can check** | Anyone, before the viewing. | Anyone shown the card; where the licensing body runs a public register, the number can be looked up. | Anyone shown the badge, including at the door of the property. |
| **What the checker gets** | Past clients' opinions of the agency or agent, which may include fake or bought reviews. | A card naming the agent and licence number, which on sight alone could be forged. | Confirmation that the licensing body or agency stands behind this badge, as at its date, including whether the licence is active. |
| **What the agent shares** | Nothing directly; reviews are public. | The card. | Only the badge they chose to show. |
| **Reach** | Wherever the platform operates and has enough reviews. | The card is recognised locally; register look-ups exist only where the body publishes one. | Global in principle: any licensing body or agency, in any country, that publishes hashes on its own domain. |
| **Speed and cost** | Free; takes time to read and weigh. | Instant to look at; a register search takes a few minutes where available. | A few seconds per check: one web lookup, with no fee to the standard. Needs a data connection at the property. |
| **What it needs** | Enough genuine reviews. | Nothing to look at it; a public register to check it. | The issuer to publish hashes, and Live Verify-aware software on the viewer's device. No licensing body or agency does this yet. |
| **Best suited to** | Choosing an agency in the first place. | The agent's everyday identification. | Confirming, at a vacant property, that the person present currently holds the licence they claim. |

**Where each fits:** reviews are useful when choosing an agency, since they reflect how past clients were treated, and the licence card remains the agent's everyday identification. What neither offers is a quick check, at the door of a vacant property, that this particular person currently holds the licence they claim. Live Verify covers that moment wherever the viewer has software that honours it, alongside whatever research they did beforehand.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).

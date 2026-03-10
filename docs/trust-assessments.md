# Trust Assessments

## The Two Questions

When someone scans a `verify:` line, two separate questions are being asked:

1. **Is this hash genuine?** — Does the issuer domain confirm it?
2. **Do I trust this issuer domain?** — Should I care that it confirmed?

Live Verify answers question 1. The authority chain helps with question 2 — but ultimately it's a human judgement. This document describes when that judgement matters most, and how apps can help users make it.

## The Pre-Scan Trust Assessment

For most verifications the stakes are low. A concert ticket, a delivery receipt, a hotel booking — if the hash checks out, you're done. The authority chain is informative but not critical.

For some verifications the stakes are high. A stranger is at your door. A driver is about to take you home at 2am. A carer is about to be alone with your elderly parent. In these cases, **the user must assess the issuing domain before trusting the result.**

A technically valid verification from an unrecognised domain is worthless for safety:

```
✓ freds-trusted-carers.com — Vetted care professionals
```

Anyone can register a domain and host a verification endpoint. Fred's site will return `OK` for every hash Fred uploads. The verification is technically correct and practically meaningless. There is no chain above Fred. No regulator attests to Fred's vetting process. No government stands behind it.

Compare:

```
✓ providers.cqc.org.uk — Registered adult social care provider
  ✓ cqc.org.uk — Regulates health and social care services in England
    ✓ gov.uk/verifiers — UK government root namespace
```

The Care Quality Commission inspects care homes, publishes ratings, and can shut providers down. Parliament created it by statute. The chain terminates at government. When a care worker's credentials verify against a CQC-registered provider's domain, the user isn't just trusting a hash — they're trusting the regulatory apparatus of the UK health system.

The difference between these two chains isn't technical. The protocol is identical. The difference is what stands behind the domain.

## Safety-Critical Use Cases

The pre-scan trust assessment matters most when someone is about to be physically vulnerable:

**Letting a stranger into your home**
- Tradesperson (plumber, electrician, locksmith)
- Care worker or home health aide
- Utility meter reader
- Building inspector
- Social services worker

**Getting into a stranger's vehicle**
- Taxi or private hire driver (late night, alone)
- Ride-share driver
- Tour guide in an unfamiliar city

**Being alone with a stranger in an unfamiliar place**
- Real estate agent showing a vacant property
- Personal trainer in a private gym session
- Hotel maintenance staff entering your room

In every case, the person making the safety decision needs to know not just "did this credential verify?" but "who is standing behind this credential, and do I recognise them?"

## Domain Trust Tiers

Not all verified credentials carry the same weight. The authority chain makes this visible:

### Government licensing authority — strongest

```
✓ drivers.tfl.gov.uk — Licensed private hire driver in London
  ✓ tfl.gov.uk — Regulates London transport services
    ✓ gov.uk/verifiers — UK government root namespace
```

Transport for London licenses every private hire driver in the capital. They run background checks, check driving records, require medical fitness, and can revoke a licence. The chain terminates at government. A passenger scanning this at 2am knows that a statutory body with enforcement powers vouches for this driver.

### Regulated professional body — strong

```
✓ staff.sunrisecaregroup.co.uk — Employed care worker
  ✓ cqc.org.uk — Regulates health and social care services in England
    ✓ gov.uk/verifiers — UK government root namespace
```

The care home is regulated by CQC. The individual worker's credentials are issued by the care home, but the care home itself is inspected, rated, and can be closed down. An elderly resident's family scanning a care worker's badge knows the employing organisation is under regulatory oversight.

### Established marketplace or accreditation body — moderate

```
✓ pro.checkatrade.com — Checkatrade-verified tradesperson
```

No government chain. But Checkatrade is a well-known brand with public accountability, customer reviews, a complaints process, and a financial guarantee scheme. A homeowner recognises the name. The trust is reputational, not regulatory — weaker than a government licence but far stronger than an unknown domain.

### Unknown private domain — no safety value

```
✓ verified-staff.example-agency.com — Vetted professional
```

Technically valid. Practically useless for safety decisions. The user has never heard of this domain. Nobody regulates it. There's no public accountability. The verification proves only that whoever runs this domain uploaded a hash — which is exactly what a criminal impersonating a care worker would do too.

## Pre-Declaration: "I Am About to Trust This Domain"

For high-stakes verifications, the app can offer a **pre-declaration** step before the user acts on the result. This doesn't change the protocol — it's a UX pattern that makes the trust assessment explicit.

### How it works

When a verification result includes safety-relevant metadata (care worker, driver, tradesperson, etc.), the app can show:

```
This credential was issued by:

  tfl.gov.uk — Regulates London transport services
    gov.uk — UK government root namespace

You are about to trust Transport for London's
licensing of this driver.

  [I recognise this authority — show me the result]
  [I don't recognise this — tell me more]
```

The user explicitly acknowledges the issuing authority before seeing the verification result. This prevents the failure mode where someone sees a green tick, assumes everything is fine, and never notices the domain was `freds-taxi-service.biz`.

### When to show it

Pre-declaration should appear when:

1. The `verification-meta.json` indicates a safety-relevant document type (care credentials, driver licence, tradesperson ID, law enforcement badge)
2. The issuing domain is **not** a hardcoded root trust anchor (government domains don't need a pre-declaration — the user already trusts `gov.uk`)
3. The authority chain is short (one or two nodes — no regulator in the chain)

For a three-level chain terminating at a government root, the chain itself provides sufficient assurance. Pre-declaration is most valuable when the chain is *short* — when there's no regulator between the issuer and thin air.

### The care home scenario

Mrs Henderson is 83 and lives alone. A woman arrives at her door saying "I'm from Sunrise Care Group, I'm here for your morning check."

**Without pre-declaration:** Mrs Henderson scans the badge. Green tick. She opens the door. She never noticed the badge verified against `sunrise-care.biz` — a domain registered yesterday by someone who has no connection to any care agency.

**With pre-declaration:** Mrs Henderson scans the badge. The app shows:

```
This credential was issued by:

  sunrise-care.biz

No recognised authority vouches for this domain.

  [I recognise this organisation]
  [I don't recognise this — do not proceed]
```

Mrs Henderson doesn't recognise `sunrise-care.biz`. She doesn't open the door. She calls her daughter. Her daughter calls the real care agency and confirms no visit was scheduled.

The pre-declaration didn't prevent the scan from working. It prevented Mrs Henderson from conflating "technically verified" with "safe to trust."

### The taxi scenario

Sarah is leaving a bar alone at midnight. A car pulls up claiming to be her pre-booked minicab. The driver holds up a badge.

**Strong chain — no pre-declaration needed:**

```
✓ drivers.tfl.gov.uk — Licensed private hire driver in London
  ✓ tfl.gov.uk — Regulates London transport services
    ✓ gov.uk/verifiers — UK government root namespace

Driver: Mohammed Al-Rashid
Licence: PCO-992288
Vehicle: Toyota Prius, LG73 XYZ
```

Sarah sees `gov.uk` in the chain. She recognises TfL. The photo matches. She gets in.

**Weak chain — pre-declaration shown:**

```
This credential was issued by:

  fast-cabs-london.com

No recognised authority vouches for this domain.

  [I recognise this company]
  [I don't recognise this — do not proceed]
```

Sarah doesn't recognise the domain. She waits for the next black cab. The pre-declaration bought her the three seconds of conscious thought that might otherwise have been skipped at midnight after four drinks.

### The tradesperson scenario

A man in a high-vis vest rings the doorbell: "British Gas, here to read the meter."

**With pre-declaration, strong chain:**

```
This credential was issued by:

  staff.britishgas.co.uk — British Gas field engineer
    ofgem.gov.uk — Regulates UK energy markets
      gov.uk/verifiers — UK government root namespace

  [Show result]
```

Recognised energy company, regulated by Ofgem, chain to government. The homeowner proceeds.

**With pre-declaration, no chain:**

```
This credential was issued by:

  meters-uk.com

No recognised authority vouches for this domain.

  [I recognise this organisation]
  [I don't recognise this — do not proceed]
```

The homeowner doesn't recognise it. They ask the man to wait while they call British Gas directly. The man leaves.

## Privacy Asymmetry: Workers vs. Citizens

Verification of credentials is not symmetric. The direction matters.

**Verifying someone in a working capacity** — photo display and visit logging are appropriate:

- Taxi driver → passenger sees driver's photo, licence number, vehicle details
- Care worker → family sees worker's photo, employer, DBS check date
- Tradesperson → homeowner sees photo, licence, company affiliation
- Police officer → citizen sees photo, badge number, precinct

These people are exercising professional authority or entering someone's personal space. The person being served has a legitimate safety interest in verifying identity and logging the interaction.

**Verifying a citizen in their private capacity** — minimal retention, no tracking:

- Hotel guest at check-in → ID confirmed, but guest's photo should not be cached
- Passenger in a taxi → identity confirmed for the trip record, but not retained beyond it
- Person at a traffic stop → officer confirms ID, but the citizen is not a "service provider" to be logged
- Customer at an age-restricted purchase → age confirmed, identity not retained

The asymmetry is this: **the person who is more vulnerable sets the terms.** A woman alone at midnight is more vulnerable than the taxi driver — she gets to see his photo, licence, and vehicle, and log the ride. A hotel guest is more vulnerable than the front desk — they should not have their biometric data cached by every hotel they stay at.

### Design principle

When the verification is of someone **in a working capacity** for **safety purposes**: photo display, credential detail, and interaction logging are appropriate and expected.

When the verification is of someone **in their private capacity**: the verification confirms legitimacy (valid ID, valid ticket, of legal age) without creating a surveillance trail. Confirm, then forget.

## Action Suggestions

For safety-critical verifications, the `verification-meta.json` response can include `actionSuggestions` — prompts the app can offer after a successful verification:

```json
{
  "actionSuggestions": [
    {
      "action": "notify",
      "text": "Share this driver's details with your emergency contact",
      "description": "Sends driver name, licence, vehicle, and your pickup location to a trusted contact"
    },
    {
      "action": "store",
      "text": "Save these credentials for your records",
      "description": "Store verified credentials locally for future reference or dispute resolution"
    },
    {
      "action": "register",
      "text": "Register this care visit",
      "description": "Log this visit with the care coordinator for safeguarding records"
    }
  ]
}
```

The actions are **suggestions, not requirements.** The user chooses whether to act on them. The verification itself is complete regardless.

### Safety notifications

For taxi/private hire drivers, care workers, and similar roles, the most valuable action suggestion is **"share with emergency contact"** — sending the verified credentials and current location to a trusted person. This is a deterrent as well as a safety measure: the driver or worker knows the passenger or client has shared their verified identity with someone else.

### Accountability paper trails

For tradespeople, the action suggestion can include **"register this visit"** — creating a record of the service visit that serves multiple purposes:

- **Insurance claims:** Documented record of who performed work, when, and under what credentials
- **Warranty trail:** Evidence that work was done by a licensed professional
- **Tax compliance:** A documented visit is harder to pay cash-in-hand and omit from tax returns — the tradesperson knows the interaction is logged
- **Dispute resolution:** If work is faulty, the homeowner has a verified record of the tradesperson's identity and licence

The tradesperson benefits too: a verified, documented visit history builds their professional reputation and provides evidence of completed work.

## Relationship to the Authority Chain

The authority chain (see [authority-chain-spec.md](authority-chain-spec.md)) classifies issuers into four patterns: Sovereign, Regulated, Commercial, Personal. Trust assessments build on this:

| Pattern | Chain depth | Pre-declaration needed? | Typical safety value |
|---|---|---|---|
| Sovereign | 1-2 nodes to government root | No — government domains are inherently recognised | Highest |
| Regulated | 2-3 nodes through regulator to government root | Rarely — the regulator adds a recognisable intermediate | High |
| Commercial | 1 node, self-authorized | Yes, unless the brand is widely recognised | Depends on brand recognition |
| Personal | 1 node, individual attestation | Always — no institutional backing | None for safety purposes |

The pre-declaration is the app's way of surfacing this classification at the moment it matters most — when someone is about to open their door, get into a vehicle, or leave their child with a stranger.

See [authority-chain-app-display.md](authority-chain-app-display.md) for how chains are rendered, and [authority-chain-spec.md](authority-chain-spec.md) for the chain-walking protocol.

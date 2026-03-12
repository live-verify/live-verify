# Post-Verification Actions

Verification doesn't end at `{"status":"verified"}` or `{"status":"revoked"}`. Endpoints can return optional follow-up actions appropriate to the context.

## Accountability-Focused Actions (Strong)

For use cases with power dynamics—where someone with authority enters private spaces or interacts with vulnerable people—the verification response can include a POST form for reporting:

```
HTTP 200 OK
Status: OK

--- Optional Follow-Up ---
Are you a homeowner? You may record details of this inspection visit.
You will NEVER be told not to do this or that it is not needed.

POST to: https://cityofchicago.org/inspect/report/992288
Fields: address, date/time, inspection type, concerns
```

**The "Never Discouraged" Principle:** The message explicitly states reporting is *always* appropriate. This prevents officials from intimidating people ("don't bother, it's routine") and empowers verifiers to document interactions without feeling like they're wasting anyone's time.

**Use cases:**
- **Building inspectors** — Homeowner records visit; creates audit trail; bribery deterrent
- **Healthcare workers** — Patient/family records interaction; abuse deterrent; also provides staffing evidence (workers benefit from logged interactions when advocating for more staff)
- **Clinical trial participants** — Emergency room can report encounter, medications given, adverse events

## Information-Focused Actions (Light)

For use cases where robust infrastructure already exists, a simple link suffices:

```
HTTP 200 OK
Status: OK
More: https://nycourts.gov/attorneys/profile/saul-goodman
```

**Use cases:**
- **Bar admission** — Link to bar association's public profile (disciplinary history, CLE status, existing complaint channels)
- **Professional licenses** — Link to licensing board registry

## Verification-as-Acknowledgment (Retention Headers)

For use cases where the **act of verifying** itself carries legal meaning — proving the recipient received and engaged with the claim — the response includes retention headers:

```
X-Verify-Retain-Until: 2031-02-28T00:00:00Z
X-Verify-Retain-Reason: service-of-process
X-Verify-Retain-Reason-Further-Details: https://courts.maricopa.gov/verify/retain/service-info
```

The recipient's GET request against the verification endpoint *is* the provable event. The issuer's server logs the lookup; the recipient's device retains the result for the specified period. Both sides have independent proof of delivery and acknowledgment.

**Use cases:** Service of process (court summons), loan disclosure acknowledgment, eviction notices, informed consent, product recall notifications, data breach notifications, employment policy acknowledgments. See [Verification Response Format](Verification-Response-Format.md) for the full pattern and header specification.

## Chariatble Donations

For use cases where verification naturally leads to a financial transaction — most obviously charitable donations at street collections.

**What the donor sees** (on a collection tin, banner, or leaflet):

```
Tees Valley Mind Matters
DAVE SMITH'S PULL UPS (2026)
Registered Charity No. 1198234
Charity Commission for England and Wales
verify:tees-valley-mind-matters.org.uk/c
```

The donor scans or selects that text. The app normalizes, hashes, and GETs `tees-valley-mind-matters.org.uk/c/{hash}`. The charity's `verification-meta.json` declares `"authorizedBy": "charitycommission.gov.uk/v1"` — so the app walks the authority chain to confirm the Charity Commission recognises this entity.

**What tees-valley-mind-matter.org/c endpoint returns:**

```json
{
  "status": "verified",
  "donation_ref": "DAVE_SMITH_2026",
  "donation_prefix": "/donate",
  "donation_prompt": "Donate to this charity?"
}
```

The phone owner is asked if they want to donate (a post verification action), and they tap "yes", so a 
request it made to https://charitiescommission.gov.uk/donate?ref=DAVE_SMITH_2026 which redirects to Apple Wallet (or Google Wallet) with pertinent information for a donation that would credit "Dave Smith 2026" so that the charity can work out why money is coming in.  UK allows for tax clawback coupled to charitable donations, so maybe that kicks in here too.

The critical point: **the payment is made via the country's charities overseer and not the charity's own materials**. Nor A QR code on a collection tin is controlled by whoever printed it and stuck it on. A donate capability started by the charity's verified endpoint — with an authority chain back to `charitycommission.gov.uk` — is bound to a registration the Commission currently recognises. If the Commission revokes or suspends the charity's registration, the authority chain breaks and the verifier sees the failure. No green badge, no donate button.

This replaces untraceable cash-in-tin with card/tap payments through the charity's legitimate payment page — creating an auditable financial record.

**Use cases:**
- **Street charity collections** — Verify registration, donate via the charity's payment page
- **Sponsored events** — Verify the fundraiser's affiliation, sponsor via the charity's page

Live Verify never handles money. The app opens the link; payment processing is the charity's responsibility via their existing infrastructure (JustGiving, GoFundMe, Stripe, etc.) .. or more likely the phone's wallet apps as outlined.

See [Verification Response Format](Verification-Response-Format.md) for the full field specification.

## Payments for services

(subject to income tax)

TODO - as above but HMRC deducts tax at higher rate - to be settled up later - but forwards net amounts there and then.
This would have to sit within IR35 (UK) but could be a streamlining for "I worked a week for XyZ Ltd in Sunderland"

## Tips

Less likely perhaps as means for tipping comes with ordinal service (food, etc)
(subject to income tax)

## Why This Matters

Post-verification actions transform verification from a yes/no check into an accountability and transparency tool:

- **Pattern detection:** Inspector verified at 50 addresses but only 10 reports filed? Investigation triggered
- **Citizen empowerment:** Reporting is never discouraged; every report is logged
- **Deterrent effect:** Officials know interactions can be easily documented
- **Evidence creation:** "I recorded every visit" is powerful in disputes
- **Evidence of receipt:** Verification GET = timestamped evidence that a device in the recipient's possession engaged with a notice (a strong point of evidence, analogous to signed-for delivery — not irrefutable proof of personal receipt)
- **Trusted transactions:** Donate links from the regulator's verification response, not from the charity's own print materials — eliminates payment redirection fraud

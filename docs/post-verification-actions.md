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

## Charitable Donations

*UK "charity" = US "non-profit" / "501(c)(3)." The concepts are equivalent: an organisation registered with a government regulator, entitled to receive tax-advantaged donations. The UK regulator is the Charity Commission; the US equivalent is the IRS (for federal tax-exempt status) plus state attorneys general.*

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

**What the `tees-valley-mind-matters.org.uk/c` endpoint returns:**

```json
{
  "status": "verified",
  "donation_ref": "DAVE_SMITH_2026",
  "donation_prefix": "/donate",
  "donation_prompt": "Donate to this charity?"
}
```

The donor is asked if they want to donate (a post-verification action). They tap "yes," and the app opens `https://charitycommission.gov.uk/donate?ref=DAVE_SMITH_2026`, which presents an Apple Pay / Google Pay sheet with the charity's name and the campaign reference pre-filled. The donor taps to confirm. Money flows through the Charity Commission's payment infrastructure, credited to Tees Valley Mind Matters with "DAVE_SMITH_2026" as the reference — so the charity knows which campaign generated the donation.

### Gift Aid (UK)

The Charity Commission already knows the charity's Gift Aid status. During the Apple Pay / Google Pay flow, the donor is asked: *"Are you a UK taxpayer? Tick to add Gift Aid — the charity receives an extra 25p for every £1 you donate, at no cost to you."* The Commission can attach the Gift Aid declaration to the payment automatically, because it already holds the charity's registration and can validate the claim. No paper declaration form, no envelope, no "we'll claim it back later and hope the donor was actually a taxpayer." The declaration is digital, timestamped, and bound to a specific verified donation.

For higher-rate taxpayers, the flow can prompt: *"You may be able to claim the difference between higher-rate and basic-rate tax on your Self Assessment."* The donation receipt — itself a verifiable document with a `verify:` line — provides the evidence HMRC needs.

**US equivalent:** The IRS doesn't process charitable donations, but the same pattern applies. The verification response from a US non-profit's endpoint (authority chain to `irs.gov`) could include a payment link. The donation receipt issued afterwards carries its own `verify:` line, giving the donor audit-proof evidence of their tax-deductible contribution.

### Payment Routing

The Charity Commission doesn't need to process every donation itself. Two models:

| Charity size | Payment route | How it works |
|---|---|---|
| **Small charities** (no payment infrastructure) | Commission handles payment | Commission receives funds via Apple Pay / Google Pay, forwards to the charity's registered bank account, retains the donation reference |
| **Large charities** (existing donation platforms) | Commission redirects | Commission redirects to the charity's own donation page (JustGiving, CAF Donate, own website), passing the `donation_ref` as a query parameter so the charity can attribute it |

Either way, the Commission is the trust anchor. The donor knows their money is going to a registered charity because the payment flow started from the Commission's domain, not from a QR code someone stuck on a collection tin.

### Why This Kills Collection Tin Fraud

The critical point: **the payment flows through or via the country's charities regulator, not the charity's own materials.** A QR code on a collection tin is controlled by whoever printed it and stuck it on. A donate flow initiated from the charity's verified endpoint — with an authority chain back to `charitycommission.gov.uk` — is bound to a registration the Commission currently recognises. If the Commission revokes or suspends the charity's registration, the authority chain breaks and the verifier sees the failure. No green badge, no donate button.

This replaces untraceable cash-in-tin with card/tap payments through regulated infrastructure — creating an auditable financial record. Every donation is traceable, attributable to a campaign, and linked to a registered charity that the regulator can inspect.

**Use cases:**
- **Street charity collections** — Verify registration, donate via regulated payment flow
- **Sponsored events** — Verify the fundraiser's affiliation, sponsor via the charity's verified page
- **Charity shop counters** — "Round up your purchase" with verified donation receipt
- **Workplace giving** — Verify the charity, donate with payroll giving reference attached

Live Verify never handles money. The app opens the Commission's donate URL (or the charity's own page for large charities); payment processing uses existing infrastructure (Apple Pay, Google Pay, bank transfers). The `donation_ref` ties the payment back to the specific campaign or fundraiser.

See [Verification Response Format](Verification-Response-Format.md) for the full field specification.

## Payments for Services

*Subject to income tax in all jurisdictions.*

The same verify → pay pattern applies to services rendered by verified individuals. A tradesperson, contractor, or gig worker whose credentials have been verified can receive payment through a flow that starts from the verification response.

**What the customer sees** (on an invoice or completion certificate):

```
Joinery completed: kitchen cabinets fitted
J. Robson, Gas Safe Reg. 548291
3 days at £280/day = £840.00
verify:jrobson-joinery.co.uk/jobs
```

The customer verifies the claim (authority chain to the relevant trade body or HMRC). The verification response includes a payment link:

```json
{
  "status": "verified",
  "payment_url": "https://hmrc.gov.uk/pay-tradesperson?ref=JROBSON-2026-0447",
  "payment_prompt": "Pay this invoice?",
  "payment_amount": "840.00",
  "payment_currency": "GBP"
}
```

The customer taps to pay. HMRC deducts tax at the basic rate (20%), forwards the net amount (£672) to the tradesperson immediately, and holds the tax. At year-end, the tradesperson's Self Assessment reconciles the actual liability — if they're on a higher rate they owe more; if they have allowable expenses they get a refund. This is similar to the Construction Industry Scheme (CIS) that already operates in UK construction, but generalised to all verified service providers.

### IR35 and Off-Payroll Working (UK)

For contractors working through intermediaries (personal service companies), the payment-via-HMRC model sidesteps one of the thorniest problems in UK tax: **who decides IR35 status?** If the payment flows through HMRC with tax deducted at source, the contractor is taxed similarly to an employee regardless of the corporate structure. The IR35 determination becomes less consequential because tax is collected either way. This doesn't solve IR35 — it reduces the incentive for avoidance by making the tax outcome comparable.

### US Equivalent

The IRS doesn't currently act as a payment intermediary, but the pattern maps to **1099 reporting with withholding.** A verified service provider's payment link could route through a payment processor that withholds estimated federal tax and issues a 1099-NEC automatically. The verification chain (authority back to `irs.gov` or a state licensing board) provides the trust anchor.

## Tips and Gratuities

*Subject to income tax in most jurisdictions, though enforcement is historically weak.*

Tips are a narrower case — the tipping opportunity usually arrives with the service itself (restaurant bill, ride-share app, hotel checkout). But there are scenarios where a verified identity creates a natural tipping moment:

**Street performers / buskers:** A licensed busker displays their council permit with a `verify:` line. A passerby verifies the licence and sees a tip option in the response. The payment goes through the licensing authority (or directly to the performer's registered payment link), creating a taxable record.

```json
{
  "status": "verified",
  "message": "Licensed street performer — Camden Council",
  "tip_url": "https://camden.gov.uk/busking/tip?ref=PERF-2026-0891",
  "tip_prompt": "Tip this performer?"
}
```

**Tour guides:** A verified tour guide (authority chain to a tourism board or professional body) receives tips through the verification flow rather than an awkward cash handoff at the end.

**Delivery workers:** After verifying a delivery worker's identity, the recipient can tip through the verification response rather than fumbling for cash at the door.

### Tax Implications

Tips routed through verification create a tax record that currently doesn't exist for cash tips. This is arguably fairer — salaried workers pay tax on every penny, while cash-tipped workers have historically under-reported. The verification flow doesn't change the tax obligation; it just makes the income visible.

In the UK, tips are subject to income tax and (above the threshold) National Insurance. In the US, tips are subject to federal income tax, FICA, and state tax. Routing tips through a verified payment link creates the paper trail that both HMRC and the IRS already require but rarely enforce for small cash amounts.

## Why This Matters

Post-verification actions transform verification from a yes/no check into an accountability and transparency tool:

- **Pattern detection:** Inspector verified at 50 addresses but only 10 reports filed? Investigation triggered
- **Citizen empowerment:** Reporting is never discouraged; every report is logged
- **Deterrent effect:** Officials know interactions can be easily documented
- **Evidence creation:** "I recorded every visit" is powerful in disputes
- **Evidence of receipt:** Verification GET = timestamped evidence that a device in the recipient's possession engaged with a notice (a strong point of evidence, analogous to signed-for delivery — not irrefutable proof of personal receipt)
- **Trusted transactions:** Donate links from the regulator's verification response, not from the charity's own print materials — eliminates payment redirection fraud

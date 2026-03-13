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
  "donation_prompt": "Donate to this charity?"
}
```

**Critical: the app constructs the donate URL from the authority chain, not from the issuer's response.** The issuer provides only the `donation_ref` (a reference string). The donate URL domain and path come from the regulator's own `verification-meta.json` (e.g., `charitycommission.gov.uk` declares a `donationPath` in its metadata). A compromised charity endpoint cannot redirect donations to a different domain — the app ignores any URL the issuer provides and builds the payment URL exclusively from the verified authority chain.

The donor is asked if they want to donate (a post-verification action). They tap "yes," and the app opens `https://charitycommission.gov.uk/donate?ref=DAVE_SMITH_2026`, which presents a payment option (bank transfer, open banking, or platform wallet — see [Platform Commission Risk](#platform-commission-risk)) with the charity's name and the campaign reference pre-filled. The donor taps to confirm. Money flows through the Charity Commission's payment infrastructure, credited to Tees Valley Mind Matters with "DAVE_SMITH_2026" as the reference — so the charity knows which campaign generated the donation.

### Gift Aid (UK)

The Charity Commission already knows the charity's Gift Aid status. During the payment flow, the donor is asked: *"Are you a UK taxpayer? Tick to add Gift Aid — the charity receives an extra 25p for every £1 you donate, at no cost to you."* The Commission can attach the Gift Aid declaration to the payment automatically, because it already holds the charity's registration and can validate the claim. No paper declaration form, no envelope, no "we'll claim it back later and hope the donor was actually a taxpayer." The declaration is digital, timestamped, and bound to a specific verified donation.

For higher-rate taxpayers, the flow can prompt: *"You may be able to claim the difference between higher-rate and basic-rate tax on your Self Assessment."* The donation receipt — itself a verifiable document with a `verify:` line — provides the evidence HMRC needs.

**US equivalent:** The IRS doesn't process charitable donations, but the same pattern applies. The verification response from a US non-profit's endpoint (authority chain to `irs.gov`) could include a payment link. The donation receipt issued afterwards carries its own `verify:` line, giving the donor audit-proof evidence of their tax-deductible contribution.

### Payment Routing

The Charity Commission doesn't need to process every donation itself. Two models:

| Charity size | Payment route | How it works |
|---|---|---|
| **Small charities** (no payment infrastructure) | Commission handles payment | Commission receives funds (via open banking, bank transfer, or platform wallet), forwards to the charity's registered bank account, retains the donation reference |
| **Large charities** (existing donation platforms) | Commission redirects | Commission redirects to the charity's own donation page (JustGiving, CAF Donate, own website), passing the `donation_ref` as a query parameter so the charity can attribute it |

**Caveat on redirects:** The redirect model re-introduces trust in the charity's own infrastructure. Once the Commission redirects to `justgiving.com/some-charity`, the Commission no longer controls where the money goes — the charity controls its JustGiving configuration. A charity that changes its JustGiving slug, or a compromised JustGiving account, could divert funds after the redirect. The Commission-handled model is strictly stronger for fraud prevention; redirects are a pragmatic concession for charities that already have established donation platforms.

Either way, the Commission is the trust anchor. The donor knows their money is going to a registered charity because the payment flow started from the Commission's domain, not from a QR code someone stuck on a collection tin.

**Note on `donation_ref`:** The reference string is advisory — it tells the charity which campaign generated the donation, but the charity controls how (or whether) it uses it. A charity could ignore the ref, attribute it to a different campaign, or use it for donor tracking across campaigns. The ref enables attribution; it does not enforce it.

### How This Reduces Collection Tin Fraud

The critical point: **the payment flows through or via the country's charities regulator, not the charity's own materials.** A QR code on a collection tin is controlled by whoever printed it and stuck it on. A donate flow initiated from the charity's verified endpoint — with an authority chain back to `charitycommission.gov.uk` — is bound to a registration the Commission currently recognises. If the Commission revokes or suspends the charity's registration, the authority chain breaks and the verifier sees the failure. No green badge, no donate button.

This replaces untraceable cash-in-tin with card/tap payments through regulated infrastructure — creating an auditable financial record. Every donation is traceable, attributable to a campaign, and linked to a registered charity that the regulator can inspect.

**What this doesn't catch:** A fraudster who registers a genuine charity, passes all regulatory checks, and then diverts funds internally is not caught by verification. Live Verify confirms that the charity is registered and currently recognised — it cannot detect embezzlement or misuse of funds within a legitimately registered entity. That remains the regulator's audit and enforcement responsibility.

**Use cases:**
- **Street charity collections** — Verify registration, donate via regulated payment flow
- **Sponsored events** — Verify the fundraiser's affiliation, sponsor via the charity's verified page
- **Charity shop counters** — "Round up your purchase" with verified donation receipt
- **Workplace giving** — Verify the charity, donate with payroll giving reference attached

Live Verify never handles money. The app opens the Commission's donate URL (or the charity's own page for large charities); payment processing uses existing infrastructure (open banking, bank transfers, or platform wallets — see [Platform Commission Risk](#platform-commission-risk)). The `donation_ref` ties the payment back to the specific campaign or fundraiser.

See [Verification Response Format](Verification-Response-Format.md) for the full field specification.

## Platform Commission Risk

*This section applies to all payment types: donations, service payments, and tips.*

If payment flows through Apple Pay or Google Pay, the platform owner takes a commission. Apple's in-app purchase commission is 15–30%; even Apple Pay (the NFC/web payment method, not the App Store) involves interchange fees that flow partly to Apple. Google Pay has similar economics. This means a charitable donation, a tax-related service payment, or a tip to a busker could lose a percentage to a platform company that contributed nothing to the transaction.

This is not hypothetical. Apple already faced regulatory action over App Store commissions on digital goods. If verification-triggered payments become common, platform companies could position themselves as mandatory intermediaries — extracting rent from charitable giving, from tax-related payments, or from tips to street performers. A £10 donation to a street charity shouldn't lose £1.50–£3.00 to Apple.

**The risk for nation-states:** If governments build payment infrastructure that routes through Apple Pay / Google Pay by default, they create a dependency on platform companies for what is essentially public financial infrastructure. The platform becomes a toll booth on charitable giving and tax collection. Governments that fought to remove platform commissions from app distribution (EU Digital Markets Act, US antitrust cases) would be re-creating the same problem in a new domain.

### Mitigations

Nation-states and regulators designing payment flows for verified transactions should consider:

| Approach | How it works | Trade-off |
|---|---|---|
| **Open Banking / PSD2 (EU/UK)** | Direct bank-to-bank payment via open banking APIs, bypassing card networks and platform wallets entirely | Best for government-run flows; requires bank API integration; user experience varies |
| **Account-to-account (A2A)** | Faster Payments (UK), SEPA Instant (EU), FedNow (US) — direct bank transfer initiated from the regulator's web page | Zero platform commission; user enters sort code / IBAN or selects bank; less slick UX than tap-to-pay |
| **Platform-negotiated zero-commission** | Governments negotiate exemptions for charitable and tax-related payments, as Apple already offers for some non-profit categories | Depends on platform goodwill; can be revoked; creates ongoing dependency |
| **QR-to-bank** | Regulator's payment page shows a QR code that opens the user's banking app directly | Common in India (UPI), Brazil (Pix), parts of Asia; zero platform commission; infrastructure exists |

The strongest position for nation-states: **own the payment rails for public-interest transactions.** Open Banking in the UK/EU already provides the technical capability for direct bank-to-bank payments without platform intermediation. The regulator's donate/pay page can offer Apple Pay / Google Pay as a convenience option alongside a zero-commission direct bank payment — letting the user choose, rather than forcing all transactions through a platform toll booth.

**This is a policy question, not a protocol question.** Live Verify's role ends at providing the verified payment reference and the authority chain. How the actual money moves — and whether a platform company takes a cut — is determined by the payment infrastructure the regulator chooses to build. The protocol should not assume or prefer any particular payment rail.

## Payments for Services

*Subject to income tax in all jurisdictions. This section describes occasional one-off payments — a tradesperson invoice, a completed job, a one-time service. It is not designed for recurring payments, salaries, wages, subscriptions, or any high-frequency payment relationship. Those have their own infrastructure (payroll, direct debit, standing orders) and verification adds nothing to an already-established payment channel.*

### The Problem: Infrastructure Overhead Kills Occasional Work

The friction for occasional service providers isn't the tax — it's the *infrastructure overhead* of being tax-compliant. A specialist consultant who flies in for three days of coaching, a tradesperson who does a one-off kitchen fit, a freelance translator who takes a single job — today, getting paid compliantly in the UK means: incorporate a Ltd company (or register as sole trader), register for Self Assessment, potentially register for VAT, file quarterly returns, retain an accountant. For someone who does this a few times a year, the administrative burden dwarfs the actual work. Many simply don't bother, or work through opaque umbrella companies that take a cut for handling the paperwork.

The result: skilled people who would happily do occasional paid work don't, because the compliance setup isn't worth it for sporadic income. The tax system is designed for ongoing businesses, not for the person who flies somewhere twice a year to coach a team.

### Aggressive Collection, Settle Up Later

The model that would unlock occasional paid work: **tax aggressively at the point of payment, settle up to a fairer rate later.** The payment intermediary (whoever it is — see below) deducts a deliberately aggressive flat rate at source — 40% or even higher — and forwards the net amount immediately. The service provider gets paid the same day, no invoicing infrastructure needed. The rate is intentionally high: the person being paid accepts the over-deduction because the alternative (incorporating, filing quarterly, retaining an accountant) costs more in time and hassle than the temporary over-payment costs in cash. At year-end, the provider goes online, furnishes details of their actual tax situation (allowable expenses, other income, tax band), and the intermediary or tax authority reconciles — refunding the over-deduction or billing for any under-deduction.

This is how CIS (Construction Industry Scheme) already works in UK construction, but only for construction. Generalising it to all occasional service work would let anyone accept verified payment without incorporating for it.

### What the Customer Sees

On an invoice or completion certificate:

```
Joinery completed: kitchen cabinets fitted
J. Robson, Gas Safe Reg. 548291
3 days at £280/day = £840.00
verify:jrobson-joinery.co.uk/jobs
```

The customer verifies the claim (authority chain to the relevant trade body). The verification response includes a payment reference:

```json
{
  "status": "verified",
  "payment_ref": "JROBSON-2026-0447",
  "payment_prompt": "Pay this invoice?",
  "payment_amount": "840.00",
  "payment_currency": "GBP"
}
```

**Critical: as with donations, the app constructs the payment URL from the authority chain, not from the issuer's response.** The issuer provides only a `payment_ref`. The payment domain and path come from the authority chain's `verification-meta.json`. A compromised tradesperson endpoint cannot redirect payments to a different domain — the app builds the payment URL exclusively from the verified authority chain.

### Who Acts as Payment Intermediary?

This is an open question. Several models are possible:

| Intermediary | Precedent | Status |
|---|---|---|
| **Tax authority (HMRC, IRS)** | CIS in UK construction | Hypothetical — no tax authority currently offers this as a general service, and governments may decide never to do so |
| **Professional/trade body** | Some trade bodies already handle member payments | Possible today for bodies with payment infrastructure |
| **Regulated payment processor** | Umbrella companies, payroll providers | Exists today but with high overhead and opacity |
| **None (reference only)** | Customer pays via bank transfer using the verified ref | Works today — verification confirms the work, payment uses existing channels |

This document does not assume or design for any particular intermediary. The Live Verify protocol provides the verified payment reference and the authority chain; what infrastructure processes the actual money is outside the protocol's scope. The "aggressive collection, settle up later" model is attractive but depends on a willing intermediary — which may or may not emerge.

### IR35 and Off-Payroll Working (UK)

*Speculative policy observation, not a protocol design.* If a payment intermediary did deduct tax at source for all occasional service work, it would reduce the consequences of IR35 status determinations — contractors would be taxed similarly regardless of corporate structure. The IR35 question ("are you really an employee?") matters less when tax is collected either way. This is a policy observation that may or may not appeal to any government. The Live Verify protocol does not depend on it and should not be designed toward it.

### US Equivalent

The IRS doesn't currently act as a payment intermediary. The pattern maps to **1099 reporting with withholding** — a verified service provider's payment reference could be used with a payment processor that withholds estimated federal tax and issues a 1099-NEC automatically. The verification chain (authority back to a state licensing board or professional body) provides the trust anchor. Whether the IRS or any other body would ever offer direct payment intermediation for occasional work is a policy question outside this protocol's scope.

## Tips and Gratuities

*Subject to income tax in most jurisdictions, though enforcement is historically weak. Like payments for services, this covers occasional one-off tips — not recurring tipping relationships or high-frequency scenarios like restaurant bills (which have their own payment infrastructure).*

Tips are a narrower case — the tipping opportunity usually arrives with the service itself (restaurant bill, ride-share app, hotel checkout). But there are scenarios where a verified identity creates a natural tipping moment:

**Street performers / buskers:** A licensed busker displays their council permit with a `verify:` line. A passerby verifies the licence and sees a tip option in the response.

```json
{
  "status": "verified",
  "message": "Licensed street performer — Camden Council",
  "tip_ref": "PERF-2026-0891",
  "tip_prompt": "Tip this performer?"
}
```

**Critical: as with donations and payments, the app constructs the tip URL from the authority chain, not from the issuer's response.** The issuer provides only a `tip_ref`. The tip payment domain and path come from the licensing authority's `verification-meta.json` (e.g., `camden.gov.uk` declares a `tipPath` in its metadata). A compromised performer endpoint cannot redirect tips to a different domain.

**Tour guides:** A verified tour guide (authority chain to a tourism board or professional body) receives tips through the verification flow rather than an awkward cash handoff at the end.

**Delivery workers:** After verifying a delivery worker's identity, the recipient can tip through the verification response rather than fumbling for cash at the door.

### Tax Implications

Tips routed through verification create a tax record that currently doesn't exist for cash tips. This is arguably fairer — salaried workers pay tax on every penny, while cash-tipped workers have historically under-reported. The verification flow doesn't change the tax obligation; it just makes the income visible.

In the UK, tips are subject to income tax and (above the threshold) National Insurance. In the US, tips are subject to federal income tax, FICA, and state tax. Routing tips through a verified payment link creates the paper trail that both HMRC and the IRS already require but rarely enforce for small cash amounts.

## Verification-Triggered Releases

The patterns above (donate, pay, tip) are all *outgoing* payments — money flows from the verifier to the verified party. A different class of post-verification action is the **release** — money already held by a third party is released because the verification event proves a qualifying condition has been met. The verification is the missing piece that unlocks funds that are already committed.

These are all occasional, one-off events — not recurring or subscription-like.

### Deposit and Escrow Release

Money held by a third party — tenancy deposit scheme, solicitor, escrow company, platform — is released when a qualifying condition is met. Today this involves paperwork, disputes, and delay. If the completion or inspection report is a verified document, the holder can offer release directly from the verification response. See the worked example below.

### Escrow Release

For higher-value transactions where payment is held in escrow pending completion — building work, property transactions, commissioned goods — the verification of a completion certificate or inspection report can trigger escrow release.

**Example: Rent deposit release — full lifecycle.** The inspection report doesn't appear from nowhere. The flow begins weeks earlier, and multiple steps in the chain are verified documents:

| Step | What happens | Verified document? |
|---|---|---|
| **1. Tenant gives notice** | Tenant emails landlord: "I'd like March to be my last month." | No — informal communication |
| **2. Landlord acknowledges via TDS** | Landlord logs the notice with TDS. TDS issues a verified notice acknowledgment to both parties with retention headers — starting the legal clock on the notice period. | **Yes** — verification-as-acknowledgment. Both parties' GETs are logged. The tenant has proof the landlord received notice; the landlord has proof the tenant gave it. |
| **3. Move-out date agreed** | Tenancy ends 28 February 2026, per the notice period. | No — follows from step 2 |
| **4. Inspection arranged** | TDS (or landlord, or agent) arranges an inspection for 1 March. | No — scheduling |
| **5. Inspector conducts inspection** | D. Hargreaves inspects the property, records condition. | No — fieldwork |
| **6. TDS issues inspection report** | TDS creates the verified inspection report and deploys the hash endpoint. Both parties receive the plain text by email. | **Yes** — this is the document below |
| **7. Both parties verify** | Tenant and landlord each verify the inspection report. Different post-verification actions per role (see below). | **Yes** — GETs logged, dispute clock starts for landlord |
| **8. Dispute window elapses** | Landlord has 10–14 days to dispute. Silence = consent. | No — waiting period |
| **9. Deposit released** | TDS releases deposit to tenant's registered bank account. | No — internal transfer by TDS |

Steps 2 and 6 are the verified documents. Everything else is either informal communication, fieldwork, or internal processing by TDS. The verified documents don't replace the tenancy process — they're waypoints in it. Each one captures a state change ("notice given," "inspection done, no deductions") and the post-verification action nudges the right person toward the next step ("dispute this?" / "release deposit?").

**Step 6 in detail.** The tenant or landlord selects the claim text from the inspection report email:

```
End of Tenancy Inspection
14 Blossom Avenue, Flat 2, Bristol BS3 4QT
Tenant: Sarah Okonkwo
Landlord: Meridian Properties Ltd
Tenancy ended: 28 February 2026
Inspection date: 1 March 2026
Inspector: D. Hargreaves, AIIC Certified
Condition: Satisfactory - no deductions
Deposit scheme: TDS ref TDS-2026-881924
verify:tds.gov.uk/inspections
```

The app normalizes, hashes (SHA-256: `216839b8...`), and GETs `https://tds.gov.uk/inspections/216839b8e05b6990b164b54667b93d5aa811b72a7ec8a1201251cffd64500e65`. The response:

```json
{
  "status": "verified",
  "message": "End-of-tenancy inspection — no deductions",
  "release_ref": "TDS-2026-881924",
  "release_prompt": "Release deposit to tenant?"
}
```

The deposit scheme (`tds.gov.uk`) is both the issuer and the holder — they issued the inspection report, they deployed the verification endpoint, and they hold the deposit. TDS does not need to re-verify their own document; they already know it's authentic. Each party's GET against the endpoint serves a different purpose: it is a logged event proving that a device in that party's possession engaged with the inspection result (the same verification-as-acknowledgment pattern described earlier). TDS sees both lookups in their server logs.

**The landlord's view:** The landlord also receives the inspection report plain text by email. They verify it — same text, same hash, same green badge. But the landlord's verification response is different from the tenant's:

```json
{
  "status": "verified",
  "message": "End-of-tenancy inspection — no deductions",
  "headers": {
    "X-Verify-Retain-Until": "2026-04-15T00:00:00Z",
    "X-Verify-Retain-Reason": "deposit-release-notice",
    "X-Verify-Retain-Reason-Further-Details": "https://tds.gov.uk/disputes/info"
  },
  "follow_up_url": "/disputes/TDS-2026-881924",
  "follow_up_prompt": "Dispute this inspection result?"
}
```

The landlord's GET starts a clock. TDS now has logged proof that the landlord's device engaged with the inspection result. If the landlord agrees with "no deductions," they do nothing — the deposit is released to the tenant after the dispute window expires (typically 10–14 days). If the landlord disagrees, they tap "Dispute this inspection result?" which takes them to TDS's existing dispute resolution process, authenticated as the landlord.

**How TDS distinguishes the two parties:** The same hash produces different responses because TDS knows who is asking. The verification endpoint can use session context, authentication tokens, or simply serve the base verification to unauthenticated requests (green badge, document is real) while offering party-specific actions only on the authenticated release/dispute pages. The verification itself is identical — the document is authentic regardless of who checks — but the post-verification actions differ by role.

**The tenant's view:** The tenant verifies the same text and sees the release prompt. Verification of the inspection report is the trigger for *initiating* the release — not for completing it. The release page on `tds.gov.uk` requires the tenant to authenticate (log in, confirm identity) before funds are returned to the bank account registered during the original tenancy setup. Release is held until the landlord's dispute window has elapsed. Anyone can verify the inspection report — it's a genuine document — but only the authenticated tenant can action the release, and only after the dispute window closes without objection. Verification proves the document is real; the deposit scheme proves you're the right person and that the conditions for release are met. Those are separate checks.

The same authority-chain rule applies: the app constructs the release URL from the deposit scheme's domain, not from the inspector's or landlord's endpoint.

**Other escrow scenarios:** Building work completion (Certificate of Occupancy), property transactions, commissioned goods, vehicle hire return inspections, equipment rental returns, event venue bonds.

### Delay Compensation

Transport operators owe compensation for delays (UK Delay Repay, EU rail passenger rights EC 1371/2007, EU flight compensation EC 261/2004). The bottleneck is proving the delay happened and that you were on the affected service. A verified delay certificate — issued by the operator, with authority chain to the transport regulator — can link directly to the compensation claim:

```json
{
  "status": "verified",
  "message": "Service GR1845 — 47 min delay — Delay Repay eligible",
  "claim_ref": "DR-2026-GR1845-0291",
  "claim_prompt": "Claim delay compensation?"
}
```

The transport regulator's domain (e.g., `railombudsman.org` or the operator's own verified infrastructure) provides the claim URL. The verification of the delay certificate is what initiates the claim — no separate form-filling, no uploading photos of departure boards.

### Bounties and Rewards

For structured reward programmes — bug bounties, lost-and-found rewards, whistleblower rewards, academic prizes — verification of the qualifying event can trigger the payout flow:

```json
{
  "status": "verified",
  "message": "Bug bounty — critical vulnerability confirmed",
  "bounty_ref": "BB-2026-CVE-4891",
  "bounty_prompt": "Claim bounty?"
}
```

The programme operator is the authority. Verification confirms the qualifying event (vulnerability confirmed, lost item returned, information validated); the payment follows through the programme's existing infrastructure.

### Insurance Claim Initiation

A damage assessment, incident report, or loss adjuster's report — verified with an authority chain to the insurer or a regulatory body — can link directly to the claims process:

```
Storm Damage Assessment
14 Blossom Avenue, Bristol BS3 4QT
Policyholder: Sarah Okonkwo
Policy: AV-HOME-2024-881924
Date of loss: 8 March 2026
Assessed: 10 March 2026
Assessor: R. Knowles, CILA Certified
Damage: Roof tiles displaced, guttering detached
Estimated repair: GBP 4,200
verify:aviva.co.uk/claims
```

The app normalizes, hashes (SHA-256: `b517f61d...`), and GETs `https://aviva.co.uk/claims/b517f61d077fc6ac516b1595006ab3af82018d93d70ad9abd073eae0b1b682b2`. The response:

```json
{
  "status": "verified",
  "message": "Storm damage assessment — roof and guttering",
  "claim_ref": "AV-2026-STORM-44891",
  "claim_prompt": "File insurance claim?"
}
```

The insurer already knows the policy (from the original setup). The verified assessment is the evidence that a covered event occurred. The claim URL comes from the insurer's domain in the authority chain. This is different from delay compensation because the payout amount isn't predetermined — the claim initiates a process, not an immediate payment.

### Warranty Claim

Verification of a purchase receipt or product registration, combined with a product failure, can trigger a warranty claim:

```
Purchase Receipt
Dyson V15 Detect Absolute
Serial: DY-V15-2025-00284
Purchased: 14 March 2025
Retailer: John Lewis, Bristol
Amount paid: GBP 599.99
Warranty expires: 14 March 2027
verify:dyson.co.uk/warranty
```

The app normalizes, hashes (SHA-256: `e6730634...`), and GETs `https://dyson.co.uk/warranty/e6730634a0666fa0c56b5e6d2f78a54039bec266f626362f972edff93559e8fb`. The response:

```json
{
  "status": "verified",
  "message": "Dyson V15 — purchased 14 March 2025 — warranty valid until 14 March 2027",
  "claim_ref": "DY-2026-WRN-00284",
  "claim_prompt": "Claim warranty repair/replacement?"
}
```

The manufacturer is the authority. Verification proves you bought it and when; the warranty claim flow is the next step. The bottleneck today is finding the receipt and proving the purchase date — verification removes that friction.

### Product Recall Refund

A product recall notice — issued by the manufacturer or a safety regulator (e.g., CPSC in the US, OPSS in the UK) — verified with an authority chain to the regulator:

```
Product Safety Recall
Acme Model X Convector Heater
Serial range: MX-2024-00001 to MX-2024-08500
Hazard: Internal wiring fault - fire risk
Remedy: Full refund or replacement
OPSS ref: OPSS-2026-RCL-0047
verify:product-recalls.gov.uk/notices
```

The app normalizes, hashes (SHA-256: `e5127c7d...`), and GETs `https://product-recalls.gov.uk/notices/e5127c7dc573bf4fca9d5003909f5f0cf729bd4e9674e9689598dee169ab2a9b`. The response:

```json
{
  "status": "verified",
  "message": "Safety recall — Acme Model X Heater — fire risk",
  "recall_ref": "OPSS-2026-RCL-0047",
  "recall_prompt": "Claim recall refund/replacement?"
}
```

Verification proves the recall is genuine (authority chain to the safety regulator). The recall refund or replacement flow follows through the regulator's or manufacturer's existing infrastructure.

### Fines and Penalty Payment

A different direction: the verifier *owes* money rather than receiving it. A parking ticket, speeding fine, regulatory penalty, or court-ordered fine — verified with an authority chain to the issuing body:

```
Parking Contravention Notice
PCN: WCC-PCN-2026-881204
Location: Praed Street, Westminster W2
Date: 12 March 2026 at 14:47
Contravention: Parked on single yellow line
Penalty: GBP 130.00 (GBP 65.00 if paid within 14 days)
verify:westminster.gov.uk/pcn
```

The app normalizes, hashes (SHA-256: `5bb37c99...`), and GETs `https://westminster.gov.uk/pcn/5bb37c99e14f5542010b0ffdba0354898dedc325817e4787af1075a6684955ed`. The response:

```json
{
  "status": "verified",
  "message": "Parking contravention — Westminster — 12 March 2026",
  "payment_ref": "WCC-PCN-2026-881204",
  "payment_prompt": "Pay this fine?",
  "payment_amount": "65.00",
  "payment_currency": "GBP"
}
```

The issuing authority's domain provides the payment URL (same authority-chain rule). The verified document creates the obligation; the post-verification action offers a direct path to discharge it. This also serves as verification-as-acknowledgment — your GET proves you were notified of the fine, which matters if it later escalates to enforcement.

**Early payment discounts** are common for fines (UK parking penalties halve if paid within 14 days). The verified document's retention headers can encode the discount deadline, and the payment prompt can reflect the discounted amount.

### Gambling: Self-Exclusion and Winnings

Gambling intersects with verification in two distinct ways — one financial, one deliberately not.

**Self-exclusion verification (non-financial).** In the UK, GAMSTOP is the national self-exclusion scheme. Licensed operators are legally required to refuse custom from self-excluded individuals. Today this is a database lookup performed by the operator. But a self-excluded person could also verify their own exclusion status — verification that protects the verifier from themselves:

```
GAMSTOP Self-Exclusion Confirmation
Name: James Whitfield
Scheme: National Online Self-Exclusion
Exclusion period: 12 March 2025 to 12 March 2030
All licensed UK gambling operators are legally
required to refuse your custom during this period
verify:gamstop.co.uk/exclusions
```

The app normalizes, hashes (SHA-256: `c553860b...`), and GETs `https://gamstop.co.uk/exclusions/c553860b0cfae8a24a4884b26be55f24d15376fc890e7a043f753635f63a05c7`. The response:

```json
{
  "status": "verified",
  "message": "Self-exclusion active until 12 March 2030",
  "more_info": "https://gamstop.co.uk/support"
}
```

This is the only post-verification action in this document that is **deliberately not a financial transaction.** The post-verification action is a link to support resources, not a payment. The verification itself is the point — a recovering addict can confirm their exclusion is active, and the `more_info` link provides help rather than a next financial step.

**Operators can also use this.** A physical casino or betting shop could verify a customer's self-exclusion status at the door or counter — the customer presents their GAMSTOP confirmation, the operator verifies it, and refuses entry. Today this relies on database lookups and photo matching; a verified document adds a second check.

**Limitations: self-exclusion is not enforceable against a determined addict.** A committed gambling addict can evade self-exclusion with or without verification — by gambling under someone else's identity, using unlicensed/offshore operators, having someone else place bets for them, or seeking out venues that don't check. Verification doesn't close these routes. The primary value of a verified self-exclusion document is for the person who *wants* to be reminded they're excluded — a self-help tool, not an enforcement mechanism. When a recovering addict reaches for their phone at a weak moment and sees "Self-exclusion active until 2030" with a link to support resources, that's the use case. Preventing a determined evader from gambling is beyond what any verification system can do.

**Winnings verification (financial).** A betting slip or winnings certificate, verified against the operator's endpoint, with a post-verification action to claim the payout:

```
Betting Slip Receipt
William Hill, Shop 4412, Leeds
Placed: 15 March 2026 at 13:20
Bet: Cheltenham Gold Cup - Desert Crown to win
Stake: GBP 20.00
Payment: Debit card (contactless)
Odds: 8/1
Result: Won
Payout: GBP 180.00
Slip ref: WH-2026-4412-08841
verify:williamhill.co.uk/slips
```

The receipt records the payment method — proof the stake was funded by debit card, not credit. The UK Gambling Commission banned credit card gambling in 2020; a verified receipt proving "debit card" or "cash" is evidence the bet was placed legally. In disputes (debt recovery, divorce proceedings, responsible gambling audits), the payment method matters as much as the amount.

The app normalizes, hashes (SHA-256: `cda9d0c9...`), and GETs `https://williamhill.co.uk/slips/cda9d0c9fb692eddfe4015f2a7c93c0ef82fcbb4c5ac3be1d139220ec4a9dd16`. The response:

```json
{
  "status": "verified",
  "message": "Winning bet — Cheltenham Gold Cup — GBP 180.00",
  "claim_ref": "WH-2026-4412-08841",
  "claim_prompt": "Claim winnings?"
}
```

This is the release pattern: money owed by the operator, verification proves the qualifying condition (bet won), authentication required to claim (same as deposit release — the operator needs to confirm you're the person who placed the bet). The operator's domain provides the claim URL via the authority chain.

**Tax implications vary by jurisdiction.** UK gambling winnings are not taxed. In the US, the IRS requires a W-2G for winnings over $1,200 — a verified winnings certificate could streamline that reporting. The verified document becomes the tax evidence, whether the jurisdiction taxes winnings or not.

**Welching deterrent.** Welching (refusing to honour a winning bet) is usually a civil matter, not criminal. The bookmaker says "we never took that bet," "the slip is forged," or simply doesn't pay. A verified betting slip changes this:

- **The bet existed** — the bookmaker issued the receipt and deployed the hash endpoint. They cannot later deny it.
- **The terms were agreed** — odds, stake, and bet description are in the hashed plain text. Cannot be revised.
- **The result is recorded** — "Result: Won" in the verified document, issued by the bookmaker themselves.
- **The payout is specified** — GBP 180.00, baked into the hash. Cannot be revised downward.

If the bookmaker welches, the punter has a document — verified against the bookmaker's own domain — stating they owe £180. The bookmaker can take the endpoint down (return 404), but the punter already verified it and has the cached result with timestamp. If a [witnessing organization](WITNESSING-THIRD-PARTIES.md) received the hash when the bet was placed, the bookmaker cannot even deny the bet existed — the witness has an independent, timestamped record.

This doesn't make welching criminal. It makes it *documentable* — which changes the calculus for an operator weighing whether to honour a large payout. Today, refusing to pay a cash bet is the punter's word against the bookmaker's. With a verified receipt, it's the bookmaker's own verified document against them.

**Could verification create new gambling problems?** Verified betting slips make it easier to prove gambling activity — for tax deductions (US allows gambling losses against gambling income), for insurance claims, or for divorce proceedings. This isn't a new risk — bookmakers already keep records — but verifiable documents make those records more portable and harder to dispute.

### What These Have in Common

In every case: money is already committed, owed, or obligated, and **the verification event proves that the condition for the next financial step has been met** — whether that's releasing held funds, initiating a claim, or discharging an obligation. The verification doesn't create the obligation — it proves the obligation exists and should now be acted on. Live Verify provides the verified reference; the actual payment or release uses the holder's existing infrastructure.

**Verification is not authorisation.** Anyone can verify the document — it's genuine regardless of who checks it. But actioning a release (deposit return, compensation claim, bounty payout) or making a payment (fine, penalty) requires the relevant party to authenticate with the holder or issuer. The holder already knows who the money belongs to from the original setup (tenancy registration, ticket purchase, bounty programme enrolment, penalty notice). Verification streamlines the flow by proving the qualifying condition is met; it does not bypass identity checks.

## Why This Matters

Post-verification actions transform verification from a yes/no check into an accountability and transparency tool:

- **Pattern detection:** Inspector verified at 50 addresses but only 10 reports filed? Investigation triggered
- **Citizen empowerment:** Reporting is never discouraged; every report is logged
- **Deterrent effect:** Officials know interactions can be easily documented
- **Evidence creation:** "I recorded every visit" is powerful in disputes
- **Evidence of receipt:** Verification GET = timestamped evidence that a device in the recipient's possession engaged with a notice (a strong point of evidence, analogous to signed-for delivery — not irrefutable proof of personal receipt)
- **Trusted occasional transactions:** Donate/pay/tip URLs constructed from the authority chain, not from the issuer's response — reduces payment redirection fraud for one-off transactions (not designed for recurring payments, salaries, or subscriptions)
- **Verification-triggered releases:** Deposits, escrow, delay compensation, bounties — money already held or owed is released when verification proves the qualifying condition is met
- **Claim initiation:** Insurance, warranty, product recall — verification proves the qualifying event or purchase, removing the friction of finding receipts or proving coverage
- **Obligation discharge:** Fines, penalties — verification proves the obligation exists and offers a direct path to pay, doubling as proof of notification
- **Protective verification:** Self-exclusion (gambling) — verification that deliberately blocks a transaction rather than enabling one

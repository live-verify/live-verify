---
title: "Disability, Aged Care & Social Care Funding Fraud"
category: "Government & Civic Documents"
type: "use-case"
volume: "Large"
retention: "Plan duration + 7 years (audit/prosecution window)"
slug: "disability-social-care-funding-fraud"
verificationMode: "both"
tags: ["ndis", "disability", "aged-care", "nursing-home", "social-care", "medicaid-hcbs", "medicare", "personal-budgets", "provider-fraud", "phantom-services", "price-gouging", "assistive-technology", "plan-management", "organised-crime", "invoice-fraud", "service-agreement", "care-minutes", "dementia"]
furtherDerivations: 4
---

## The Problem

Governments fund disability and aged care through markets of private providers. A person with disability receives a funding plan; an older person is assessed for a care level; providers deliver supports; invoices flow to a government payer. Every link in that chain is a fraud vector — and the people at the centre of it are often the least able to monitor what's being claimed in their name.

The fraud patterns are strikingly similar across countries and sectors:

- **Phantom services** — claiming for supports never delivered (sometimes for people who don't exist)
- **Invoice padding** — billing 4 hours for 2 hours of support, or duplicating claims
- **Price gouging** — charging government-funded participants far more than retail for identical goods
- **Fake providers** — entities created solely to submit claims, with no capacity to deliver services
- **Upcoding** — classifying a person as higher-acuity than they are to trigger higher funding
- **Kickbacks** — cash or goods offered to participants to sign up with a provider who then bills for phantom services
- **Collusion** — provider and participant split the proceeds of fraudulent claims
- **Credential fraud** — unqualified individuals delivering clinical services under fabricated qualifications
- **Clipping** — arriving late, leaving early, logging full hours

Live Verify can address the document-level verification gaps that make these frauds possible. It can't fix market design or pricing policy, but it can make the documents in the chain — service delivery receipts, provider credentials, service agreements, clinical assessments, equipment quotes — independently verifiable by every party in real time.

<details>
<summary><strong>Scale by country</strong></summary>

- **Australia:** NDIS ($42B/year) estimates $2–6B annually in fraud and misuse. Aged care ($36B/year) faces similar patterns; the Royal Commission into Aged Care Quality and Safety (2021) found systemic oversight failures.
- **United States:** Medicaid HCBS waivers — 257 active programs, $961M in criminal fraud recoveries in FY 2024. Medicare nursing home fraud generates hundreds of millions in DOJ recoveries annually.
- **United Kingdom:** Personal budgets and direct payments under the Care Act 2014 — estimated £11M/year in fraud. Care homes funded by local authorities face billing fraud and clipping.
- **New Zealand:** Individualised Funding (disability, via Whaikaha) and aged residential care (via Te Whatu Ora) face analogous risks.
</details>

---

## 1. Provider Registration Certificates

### The Document

Every country with funded disability or aged care requires providers to register with a government body. The registration certificate confirms the provider's identity, the service categories they're approved for, their registration period, and any conditions.

The problem: registering a business entity is often trivially easy. Government websites allow manual registration checks, but participants — especially those with cognitive disability or dementia — don't typically look up their provider online before a support worker arrives at their door.

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 1px solid #ccc; background: #fff; padding: 0; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <div style="background: #1565c0; color: #fff; padding: 16px 24px;">
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <div>
        <div style="font-size: 1.2em; font-weight: bold;"><span verifiable-text="start" data-for="provider"></span>Department of Health and Social Care</div>
        <div style="font-size: 0.8em; opacity: 0.9;">Care Quality Commission — Registered Provider</div>
      </div>
    </div>
  </div>
  <div style="padding: 24px;">
    <div style="text-align: center; font-weight: bold; font-size: 1.1em; color: #1565c0; margin-bottom: 16px;">CERTIFICATE OF REGISTRATION</div>
    <div style="font-size: 0.9em; line-height: 1.8; color: #333;">
      <p style="margin: 0;"><strong>Provider:</strong> Meadowbrook Home Care Ltd</p>
      <p style="margin: 0;"><strong>CQC Provider ID:</strong> 1-2847193652</p>
      <p style="margin: 0;"><strong>Registered Manager:</strong> Helen R.</p>
      <p style="margin: 0;"><strong>Registration Date:</strong> 14 September 2023</p>
    </div>
    <div style="margin: 16px 0; padding: 12px; background: #e3f2fd; border-left: 3px solid #1565c0; font-size: 0.85em;">
      <strong>Regulated Activities:</strong><br>
      Personal care<br>
      Treatment of disease, disorder or injury
    </div>
    <div style="font-size: 0.82em; color: #555; margin-bottom: 12px;">
      This registration is subject to conditions. CQC may vary, suspend, or cancel registration at any time.
    </div>
    <hr style="border: none; border-top: 1px dashed #999; margin: 15px 0 8px 0;">
    <div data-verify-line="provider" style="font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
      title="Demo only: CQC doesn't yet offer verification&#10;endpoints, so this is illustrative">
      <span data-verify-line="provider">verify:cqc.org.uk/provider/v</span> <span verifiable-text="end" data-for="provider"></span>
    </div>
  </div>
</div>

### Verification Response

- **REGISTERED** — Provider is currently registered for the listed service categories
- **SUSPENDED** — Registration suspended pending investigation
- **REVOKED** — Registration cancelled (enforcement action, safeguarding breach)
- **EXPIRED** — Registration period ended without renewal
- **404** — No matching registration (fake provider, fabricated certificate)

### Why This Matters

The **doorstep verification** pattern maps directly here. A support worker arrives at a participant's home. The participant (or their carer, family member, or representative) scans the provider's certificate. It verifies — or it doesn't. Combined with post-verification reporting (logging the visit), this creates evidence of who actually attended and when.

<details>
<summary><strong>Country details</strong></summary>

- **Australia:** NDIS Quality and Safeguards Commission issues registration certificates with ABN, support categories (800+ line item codes), and registration period. Aged Care Quality and Safety Commission separately registers aged care providers. Shell companies can obtain an ABN through the ATO website in minutes.
- **United States:** States enrol providers in Medicaid; CMS certifies Medicare skilled nursing facilities. Provider numbers are issued by state Medicaid agencies. Medicare provider enrolment is through PECOS.
- **United Kingdom:** CQC registers providers of regulated activities (as in the mockup above). Local authorities also maintain approved provider lists for direct payment recipients.
- **New Zealand:** Whaikaha (Ministry of Disabled People) registers disability providers. Te Whatu Ora registers aged residential care providers.
</details>

---

## 2. Service Delivery Receipts

### The Document

This is the document that doesn't currently exist in a verifiable form — and its absence is the single biggest fraud enabler across every country.

When a provider delivers a support (2 hours of personal care, a therapy session, a community access outing, an aged care visit), the participant should receive a receipt at the time of service — not days later, not as part of a monthly statement. The receipt states what was delivered, for how long, by whom, and at what rate.

Today, the provider submits an invoice to the funding body. The participant may never see it. The invoice says "4 hours of personal care" — but only 2 hours were delivered. Or zero. The participant has no document to compare against. In aged care, the resident may have dementia and no capacity to track what's being billed in their name — making family members the critical second party.

<div style="max-width: 580px; margin: 24px auto; font-family: sans-serif; border: 1px solid #ccc; background: #fff; padding: 0; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <div style="background: #2e7d32; color: #fff; padding: 14px 20px;">
    <div style="font-size: 1.1em; font-weight: bold;"><span verifiable-text="start" data-for="receipt"></span>Meadowbrook Home Care</div>
    <div style="font-size: 0.75em; opacity: 0.9;">CQC Provider ID: 1-2847193652</div>
  </div>
  <div style="padding: 20px;">
    <div style="text-align: center; font-size: 1em; font-weight: bold; color: #2e7d32; margin-bottom: 12px;">SERVICE DELIVERY RECEIPT</div>
    <div style="font-size: 0.88em; line-height: 1.8; color: #333;">
      <p style="margin: 0;"><strong>Service User:</strong> Margaret W. (Ref: MHC-2025-0441)</p>
      <p style="margin: 0;"><strong>Date:</strong> 12 March 2026</p>
      <p style="margin: 0;"><strong>Care Worker:</strong> Priya S. (Staff ID: MHC-087)</p>
    </div>
    <div style="margin: 14px 0; padding: 10px; background: #f5f5f5; border-radius: 4px; font-size: 0.85em;">
      <table style="width: 100%; border-collapse: collapse;">
        <tr style="border-bottom: 1px solid #ddd;">
          <td style="padding: 4px 0;"><strong>Service:</strong></td>
          <td>Personal care — morning routine</td>
        </tr>
        <tr style="border-bottom: 1px solid #ddd;">
          <td style="padding: 4px 0;"><strong>Duration:</strong></td>
          <td>1.5 hours (07:30 – 09:00)</td>
        </tr>
        <tr style="border-bottom: 1px solid #ddd;">
          <td style="padding: 4px 0;"><strong>Rate:</strong></td>
          <td>£22.50/hr (weekday standard)</td>
        </tr>
        <tr>
          <td style="padding: 4px 0;"><strong>Total:</strong></td>
          <td><strong>£33.75</strong></td>
        </tr>
      </table>
    </div>
    <hr style="border: none; border-top: 1px dashed #999; margin: 15px 0 8px 0;">
    <div data-verify-line="receipt" style="font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
      title="Demo only: this provider doesn't yet offer verification&#10;endpoints, so this is illustrative">
      <span data-verify-line="receipt">verify:meadowbrookhomecare.co.uk/receipts/v</span> <span verifiable-text="end" data-for="receipt"></span>
    </div>
  </div>
</div>

### Verification Response

- **VERIFIED** — Receipt matches the provider's records for this service delivery
- **CLAIMED** — Receipt verified AND a corresponding claim has been submitted to the funding body
- **MISMATCH** — A claim was submitted but the hours, rate, or service type differs from this receipt
- **404** — No matching record

### How This Stops Invoice Padding

The bilateral verification model works like this:

1. **At time of service:** Provider generates a receipt, the service user or their family member scans it. The verification GET is logged with timestamp.
2. **Provider submits invoice:** The invoice goes to the funding body. If the invoice amount exceeds the receipt amount, the hash won't match.
3. **Funding body cross-checks:** Before paying, the funder can verify: "does a receipt exist for this service delivery, and does it match the invoice?"

This doesn't require the service user to be a forensic auditor. It requires the provider to commit to a specific claim at the point of delivery — before they have time to inflate it.

<details>
<summary><strong>Country details</strong></summary>

- **Australia (NDIS):** Receipts would reference NDIS line item codes (e.g., 01_011_0107_1_1). Invoices go to plan managers or the NDIA. NDIS participant numbers would appear on receipts.
- **Australia (aged care):** Under the care minutes mandate (200 minutes/day since October 2022), receipts would document actual care delivered against the mandated minimum. AN-ACC funding classification determines the rate.
- **United States:** Receipts would reference Medicaid procedure codes (HCBS) or Medicare billing codes (skilled nursing). Claims go to state Medicaid agencies or CMS.
- **United Kingdom:** Receipts for domiciliary care funded by local authority personal budgets or direct payments. Clipping (arriving late, leaving early, logging full hours) is a known pattern that bilateral verification directly addresses.
- **New Zealand:** Receipts for Individualised Funding (disability) or aged residential care supports.
</details>

---

## 3. Service Agreements

### The Document

A service agreement between provider and service user sets out what supports will be delivered, how often, at what cost, and under what terms. Funding bodies in most countries require these agreements, but audits have found providers keeping agreements on file with no evidence the service user understood or consented to them.

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 1px solid #ccc; background: #fff; padding: 24px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <div style="font-weight: bold; font-size: 1.1em; color: #1a365d; margin-bottom: 16px;"><span verifiable-text="start" data-for="agreement"></span>SERVICE AGREEMENT</div>
  <div style="font-size: 0.88em; line-height: 1.8; color: #333; margin-bottom: 12px;">
    <p style="margin: 0;"><strong>Provider:</strong> Sunshine Community Services Inc.</p>
    <p style="margin: 0;"><strong>Provider ID:</strong> FL-HCBS-2024-08812</p>
    <p style="margin: 0;"><strong>Participant:</strong> Robert D. (Medicaid ID: 9012-4478-FL)</p>
    <p style="margin: 0;"><strong>Waiver Program:</strong> iBudget Florida</p>
    <p style="margin: 0;"><strong>Agreement Period:</strong> 1 January 2026 – 31 December 2026</p>
  </div>
  <div style="padding: 12px; background: #f7f7f7; border-left: 3px solid #1a365d; font-size: 0.85em; margin-bottom: 12px;">
    <strong>Agreed Services:</strong><br>
    Personal care — 3× weekly, 2 hrs each<br>
    Community integration — 1× weekly, 4 hrs<br>
    <strong>Estimated annual cost:</strong> $28,440.00
  </div>
  <div style="font-size: 0.82em; color: #555; margin-bottom: 12px;">
    Cancellation requires 14 days written notice. Disputes handled per Agency for Persons with Disabilities complaint process.
  </div>
  <hr style="border: none; border-top: 1px dashed #999; margin: 15px 0 8px 0;">
  <div data-verify-line="agreement" style="font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
    title="Demo only: this provider doesn't yet offer verification&#10;endpoints, so this is illustrative">
    <span data-verify-line="agreement">verify:sunshineservices.org/agreements/v</span> <span verifiable-text="end" data-for="agreement"></span>
  </div>
</div>

### Verification Response

- **ACTIVE** — Agreement is current and both parties have verified
- **PARTICIPANT_UNVERIFIED** — Provider issued the agreement but no verification GET from the service user's device has been recorded
- **TERMINATED** — Agreement ended (cancellation, provider deregistration, plan change)
- **SUPERSEDED** — Replaced by a newer agreement
- **404** — No matching record

The **PARTICIPANT_UNVERIFIED** status is the innovation. If a provider files a service agreement but the service user has never scanned it — never engaged with it on any device — that's a red flag for the funding body. It doesn't prove fraud (some participants need Easy Read versions, interpreter assistance, or family involvement), but it does trigger a check.

<details>
<summary><strong>Country details</strong></summary>

- **Australia (NDIS):** Service agreements reference NDIS line item codes and estimated plan budget. The NDIS requires these agreements but enforcement is inconsistent.
- **Australia (aged care):** Resident agreements in aged care facilities cover accommodation, care, and additional services. Residents or their representatives must sign, but capacity to understand can be limited.
- **United States:** HCBS service plans are part of the Medicaid waiver process. The individual or their guardian signs. The state Medicaid agency approves.
- **United Kingdom:** Care plans under the Care Act 2014. Personal budget holders agree support plans with their local authority.
- **New Zealand:** Individualised Funding agreements with Whaikaha-approved providers.
</details>

---

## 4. Assistive Technology and Equipment Quotes

### The Document

Assistive technology and care equipment ranges from shower stools to powered wheelchairs to hospital beds. Government schemes typically require written evidence for items above a threshold and formal quotes for higher-value items.

Price gouging is most visible here. Suppliers routinely charge government-funded participants far more than retail for identical items — a practice so widespread it has its own informal names ("NDIS tax" in Australia, "Medicaid markup" in the US). Consumer protection bodies have flagged it, but enforcement requires catching the overcharge — which requires knowing the retail price.

<div style="max-width: 580px; margin: 24px auto; font-family: sans-serif; border: 1px solid #ccc; background: #fff; padding: 0; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <div style="background: #5c6bc0; color: #fff; padding: 14px 20px;">
    <div style="font-size: 1.1em; font-weight: bold;"><span verifiable-text="start" data-for="atquote"></span>Allied Medical Supplies</div>
    <div style="font-size: 0.75em; opacity: 0.9;">Medicaid-enrolled supplier — NPI: 1234567890</div>
  </div>
  <div style="padding: 20px;">
    <div style="text-align: center; font-size: 1em; font-weight: bold; color: #5c6bc0; margin-bottom: 12px;">EQUIPMENT QUOTATION</div>
    <div style="font-size: 0.88em; line-height: 1.8; color: #333; margin-bottom: 12px;">
      <p style="margin: 0;"><strong>Quote Ref:</strong> AMS-Q-2026-07231</p>
      <p style="margin: 0;"><strong>Date:</strong> 5 March 2026</p>
      <p style="margin: 0;"><strong>Recipient:</strong> Robert D.</p>
    </div>
    <div style="font-size: 0.85em; margin-bottom: 12px;">
      <table style="width: 100%; border-collapse: collapse;">
        <tr style="border-bottom: 1px solid #ddd; background: #f5f5f5;">
          <th style="text-align: left; padding: 6px;">Item</th>
          <th style="text-align: right; padding: 6px;">Qty</th>
          <th style="text-align: right; padding: 6px;">Unit</th>
          <th style="text-align: right; padding: 6px;">Total</th>
        </tr>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 6px;">Drive Medical Shower Chair</td>
          <td style="text-align: right; padding: 6px;">1</td>
          <td style="text-align: right; padding: 6px;">$189.00</td>
          <td style="text-align: right; padding: 6px;">$189.00</td>
        </tr>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 6px;">Delivery & setup</td>
          <td style="text-align: right; padding: 6px;">1</td>
          <td style="text-align: right; padding: 6px;">$65.00</td>
          <td style="text-align: right; padding: 6px;">$65.00</td>
        </tr>
        <tr>
          <td style="padding: 6px; font-weight: bold;">Total</td>
          <td colspan="3" style="text-align: right; padding: 6px; font-weight: bold;">$254.00</td>
        </tr>
      </table>
    </div>
    <div style="font-size: 0.78em; color: #666; margin-bottom: 12px;">Valid for 30 days. Standard retail price for this item: $189.00.</div>
    <hr style="border: none; border-top: 1px dashed #999; margin: 15px 0 8px 0;">
    <div data-verify-line="atquote" style="font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
      title="Demo only: this supplier doesn't yet offer verification&#10;endpoints, so this is illustrative">
      <span data-verify-line="atquote">verify:alliedmedicalsupplies.com/quotes/v</span> <span verifiable-text="end" data-for="atquote"></span>
    </div>
  </div>
</div>

### Verification Response

- **VALID** — Quote is genuine and current
- **EXPIRED** — Quote validity period has passed
- **FULFILLED** — Item has been ordered/delivered against this quote
- **WITHDRAWN** — Supplier withdrew the quote (pricing error, stock unavailable)
- **404** — Supplier has no record of this quote

### Why Retail Price Disclosure Matters

The quote mockup above includes "Standard retail price for this item: $189.00." If suppliers were required to include their non-government retail price in the verifiable text, the markup becomes instantly visible. A funding body scanning the quote sees: "$189 retail, $189 government" — or "$189 retail, $340 government" — and can act accordingly.

This doesn't require government price regulation. It requires transparency: the supplier commits to a retail price in a verified document. If a participant (or a journalist, or a consumer protection agency) later buys the same item from the same supplier's website for $189 while the government was charged $340, the verified quote is evidence of unjustified price differentiation.

<details>
<summary><strong>Country details</strong></summary>

- **Australia (NDIS):** Written evidence required for AT over $1,500, formal quotes for AT over $15,000. The ACCC has flagged unjustified price differentiation, and the NDIS Code of Conduct was amended in late 2024 to prohibit it.
- **Australia (aged care):** Equipment supplied under aged care packages or Commonwealth Home Support Programme. Similar markup patterns for mobility aids, continence products, and wound dressings.
- **United States:** Durable medical equipment (DME) under Medicare Part B. CMS sets fee schedule amounts, but suppliers can and do charge more for items bundled with services. DME fraud is one of Medicare's largest fraud categories.
- **United Kingdom:** Equipment provided through NHS wheelchair services, community equipment services, or purchased via direct payments. NHS Supply Chain sets benchmark prices for common items.
- **New Zealand:** Equipment funded through Enable New Zealand or Whaikaha equipment grants.
</details>

---

## 5. Clinical Reports and Care Assessments

### The Document

Clinicians produce reports that determine a person's funding level — how much support they're entitled to, at what intensity, for how long. These assessments are the gateway to funding: a higher-assessed need means a bigger budget.

**Disability:** Occupational therapists, speech pathologists, psychologists, and physiotherapists assess functional capacity and recommend support levels.

**Aged care:** Geriatricians, registered nurses, and allied health professionals assess care needs, cognitive decline, and acuity levels that determine daily funding rates.

The fraud pattern is the same in both sectors: assessments fabricated or exaggerated to inflate funding. In some cases, the clinician and the provider collude — the clinician writes a report recommending more support, the provider delivers (and bills for) those hours, and they split the proceeds. In aged care, upcoding — classifying residents as higher-acuity than they are — is a persistent problem because higher acuity means higher daily funding.

A clinical report with a `verify:` line, authority-chained through the clinician's professional registration body, binds the document to a specific registered clinician. If the registration body suspends the clinician's registration — for falsifying reports, for example — the authority chain breaks, and any report verified against that clinician's endpoint returns a warning.

### Data Verified

Clinician name and registration number, professional body, service user name (may be redacted in the verifiable region), assessment date, findings, recommended service category and level, report reference number.

### Verification Response

- **VERIFIED** — Report was issued by this clinician, who is currently registered
- **CLINICIAN_SUSPENDED** — Report exists but the clinician's registration is suspended
- **SUPERSEDED** — A newer assessment has replaced this report
- **404** — No matching report

<details>
<summary><strong>Country details</strong></summary>

- **Australia:** Clinicians registered with AHPRA (Australian Health Practitioner Regulation Agency). NDIS therapy reports submitted to the NDIA for plan reviews. Aged care uses AN-ACC (Australian National Aged Care Classification) assessments for funding.
- **United States:** Clinicians licensed by state boards. MDS (Minimum Data Set) assessments classify nursing home residents into payment groups (RUG-IV or PDPM). Therapy evaluations trigger higher reimbursement — creating incentives for phantom therapy sessions.
- **United Kingdom:** Clinicians registered with relevant bodies (GMC, NMC, HCPC). Local authority needs assessments under the Care Act determine eligibility and funding.
- **New Zealand:** Clinicians registered with relevant authorities (Medical Council, Nursing Council). Needs assessments by Needs Assessment and Service Coordination (NASC) organisations.
</details>

---

## Verification Works Both Ways — Protecting Legitimate Providers

The examples above focus on catching fraud. But the vast majority of disability and aged care providers are legitimate, and they are often the ones who suffer most when fraud scandals erupt.

When fraud is discovered in a sector, the policy response tends to be blunt: funding freezes, blanket audits, tighter regulation applied to everyone. Providers who were delivering real services to real people find themselves under suspicion, facing delayed payments, increased compliance burdens, and — in some cases — public harassment driven by media coverage that doesn't distinguish between accused and innocent.

Legitimate providers currently have no fast way to prove they are delivering real services. Their evidence — licensing records, attendance logs, client testimonials — is scattered across different systems, slow to produce, and hard to communicate to a sceptical public or an overwhelmed regulator.

### How Verified Documents Help

A provider with verified service delivery receipts has a continuous, independently confirmable trail:

- **Every receipt was confirmed by a service user's device** (or their family member's device) at the time of service. The provider didn't just claim they delivered 200 hours of support last month — 200 separate verification events, each triggered by a different person's device, confirm it.

- **The trail is always current.** A regulator doesn't need to audit retrospectively. The verification endpoint shows the provider's status right now — registered, active, with a consistent pattern of bilateral verification.

- **Targeted enforcement becomes possible.** Instead of freezing payments to an entire sector or region, a funding body can ask a precise question: which providers have a pattern of unverified receipts? Which providers have claims that no service user's device ever confirmed? Investigate those — not the providers whose records are clean.

- **Evidence that doesn't depend on narrative.** When public trust in a sector collapses, the providers who suffer most are often those serving communities that are already targets of suspicion. Verified documents provide evidence that is cryptographic, not testimonial. The records either verify or they don't, regardless of who is telling the story.

### The Principle

Verification is symmetric. The same `GET /v/{hash}` that exposes a phantom service provider — returning 404 for a receipt that should exist — also vindicates a legitimate one — returning VERIFIED for every receipt a service user's device confirmed. The same authority chain that flags a deregistered provider also confirms a properly licensed one.

---

## Second-Party Use

The **service user** (second party) — or, critically, their **family member, power of attorney holder, or appointed representative** — benefits from verification across all document types. In aged care, the person themselves may have dementia or cognitive decline that prevents them from engaging with verification directly. The second party is often an adult child or spouse.

**Confirming provider legitimacy:** Before engaging a new provider — especially one who approached them unsolicited (a red flag for kickback schemes) — the service user or their family scans the registration certificate. Registered, for the right service categories, not suspended? Proceed.

**Keeping their own records:** Service delivery receipts create a trail held by the service user or their family of what was actually delivered. When a plan review or care assessment comes, they have verified evidence — not just the provider's word.

**Detecting representative fraud:** If a power of attorney holder, nominee, or appointed representative is managing the person's finances, the person themselves (or another family member) can independently verify what receipts and invoices exist. If claims appear for services the person doesn't recognise, that's evidence of abuse. Financial abuse by family members is a known risk in both disability and aged care.

**Comparing equipment quotes:** Two verified quotes from two suppliers — with retail prices disclosed — let the service user or their family make informed choices and flag unjustified markups to the funding body.

## Third-Party Use

**Funding Body / Plan Manager**
Funding bodies and plan managers pay invoices on behalf of service users. Today they have no bilateral verification. With verified service delivery receipts, they have an independent check: does the invoice match a receipt the service user's device verified? Unmatched invoices get flagged before payment, not months later during audit.

**Fraud Investigation Bodies**
Pattern detection across verified documents. If a provider issues 200 service delivery receipts in a month but only 50 are verified by service user devices — 150 phantom services? If a provider's registration hash changes from REGISTERED to SUSPENDED, all their pending claims are automatically flagged.

**Registration and Quality Bodies**
Registration verification in real time. When a sanction is applied, the provider's hash endpoint returns REVOKED or SUSPENDED. Every service user or family member who subsequently attempts to verify that provider gets an immediate warning — not a letter weeks later. In aged care, where residents may not be able to leave a facility easily, family members verifying from a distance is especially important.

**Consumer Protection Agencies**
Verified equipment quotes with disclosed retail prices create evidence for enforcement. If a supplier's verified quote says "retail $189, government $340" for the same item, the consumer protection agency has a documented case of price differentiation — signed by the supplier's own domain.

## Verification Architecture

**Why These Frauds Succeed Today**

The fundamental problem is **asymmetric information with delayed verification**:

1. The provider knows what they delivered (or didn't deliver). The service user may have cognitive disability or dementia and can't easily track services. The payer only sees invoices.
2. Invoices are typically paid within days. Fraud detection is retrospective — auditing claims months or years later. The money is gone.
3. Provider registration is a point-in-time check. Between audits, a provider can be deregistered, suspended, or sanctioned, and continue submitting claims until the system catches up.

**What Verified Documents Change**

Real-time, bilateral verification at each stage:

```
Provider Registration (registration body domain)
    ↓ authority chain
Service Agreement (provider domain, service user or family verified)
    ↓ matched to
Service Delivery Receipt (provider domain, service user or family verified at time of service)
    ↓ matched to
Invoice (submitted to funding body)
    ↓ cross-checked against
Equipment Quote (supplier domain, retail price disclosed)
    ↓ supported by
Clinical Report / Care Assessment (clinician domain, professional body authority chain)
```

Each document is independently verifiable. Mismatches between layers — receipt says 2 hours, invoice says 4 hours — surface automatically. Provider deregistration propagates instantly via the authority chain.

**Issuer Types (First Party)**

- **Provider registration certificates:** Government registration/quality bodies
- **Service delivery receipts:** Individual providers (authority chain to registration body)
- **Service agreements:** Individual providers (authority chain to registration body)
- **Equipment quotes:** Suppliers and manufacturers
- **Clinical reports / care assessments:** Registered health practitioners (authority chain to professional registration body)

## Privacy Salt

Highly Critical. Service user identifiers, disability types, dementia diagnoses, care needs, and funding amounts are among the most sensitive personal information imaginable. The hash must be heavily salted to prevent:
- Enumeration of who is a disability or aged care participant
- Discovery of specific disability types, care needs, or cognitive decline from service delivery receipts
- Correlation of participant identity with provider or service type
- Targeting of vulnerable people by organised crime networks seeking to recruit them for fraud schemes

Salt must be per-person, per-document, and non-deterministic. Even the existence of a hash at an endpoint must not reveal whether a specific person is a disability or aged care participant.

## Authority Chain

**Pattern:** Regulated (Australia — Disability)

```
✓ provider.example.com.au/receipts/v — Registered NDIS provider
  ✓ ndiscommission.gov.au/registration/v — NDIS Quality and Safeguards Commission
    ✓ dss.gov.au/verifiers — Department of Social Services
      ✓ gov.au/verifiers — Australian Government root namespace
```

**Pattern:** Regulated (Australia — Aged Care)

```
✓ provider.example.com.au/receipts/v — Approved aged care provider
  ✓ agedcarequality.gov.au/v — Aged Care Quality and Safety Commission
    ✓ health.gov.au/verifiers — Department of Health and Aged Care
      ✓ gov.au/verifiers — Australian Government root namespace
```

**Pattern:** Regulated (United States — Medicaid/Medicare)

```
✓ provider.example.com/v — Enrolled Medicaid/Medicare provider
  ✓ medicaid.state.example.us/v — State Medicaid agency
    ✓ cms.gov/verifiers — Centers for Medicare & Medicaid Services
      ✓ usa.gov/verifiers — US federal government root namespace
```

**Pattern:** Regulated (United Kingdom)

```
✓ provider.example.co.uk/v — Registered social care provider
  ✓ cqc.org.uk/v — Care Quality Commission
    ✓ gov.uk/verifiers — UK government root namespace
```

**Pattern:** Regulated (New Zealand — Disability)

```
✓ provider.example.co.nz/v — Registered disability provider
  ✓ whaikaha.govt.nz/v — Whaikaha (Ministry of Disabled People)
    ✓ govt.nz/verifiers — New Zealand government root namespace
```

**Pattern:** Regulated (New Zealand — Aged Care)

```
✓ provider.example.co.nz/v — Registered aged residential care provider
  ✓ tewhatuora.govt.nz/v — Te Whatu Ora (Health New Zealand)
    ✓ govt.nz/verifiers — New Zealand government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Competition vs. Existing Verification

| Feature | Live Verify | Government Portals | Retrospective Audit | Manual Provider Lookup |
| :--- | :--- | :--- | :--- | :--- |
| **Speed** | **Instant.** 5-second scan at point of service. | **N/A for service users.** Portals are for providers and administrators. | **Months to years.** Fraud detected long after payment. | **Minutes.** Manual website lookup. |
| **Bilateral verification** | **Yes.** Both provider and service user verify the same document. | **No.** Provider submits; service user doesn't see the claim. | **Retrospective.** Compares claims against records after payment. | **No.** Only confirms registration exists. |
| **Fraud detection timing** | **At point of service / claim.** Before money moves. | **At claim.** Basic automated checks but no bilateral verification. | **After payment.** Money already gone. | **Before engagement.** But only checks registration, not service delivery. |
| **Organised crime resistance** | **High.** Every phantom service needs a receipt that a real person's device verified. | **Low.** Phantom services pass automated checks. | **Medium.** Catches patterns eventually. | **Low.** Shell entities pass registration checks. |
| **Accessibility** | **Phone scan.** Family member can verify. | **Portal login.** Requires provider credentials. | **N/A.** Not service user-facing. | **Website.** Requires internet search skills. |

## Jurisdictional Witnessing

A jurisdiction may require the issuer to retain a **witnessing firm** for regulatory compliance. The witnessing firm:

- Receives all hashes from the issuer, and any subsequent changes to the payload as they happen — which may manifest as a new hash, a status change, or even a 404 (record deleted)
- Receives structured content/metadata (key identifiers and dates)
- Does **NOT** receive plaintext or sensitive personal information
- Provides an immutable, timestamped audit trail — available to the jurisdiction on demand, to document holders/third parties during disputes, or as expert witness testimony in legal proceedings

This provides:
- **Non-repudiation:** Provider cannot deny issuing a service delivery receipt
- **Timestamp proof:** Service was claimed at a specific time
- **Regulatory audit:** Fraud investigation bodies can inspect the witness ledger for pattern detection — providers with high volumes of unverified receipts, providers whose receipts cluster at suspicious times
- **Resilience:** Verification works even if the provider's systems go down (or are deliberately taken offline to destroy evidence)

**Public Blockchain (Non-Party)**

Witnessing firms may periodically commit rollups to an inexpensive public blockchain, providing an ultimate immutability guarantee. The blockchain is a "non-party" — infrastructure, not a participant in the transaction. This creates multiple verification paths:

1. **Issuer domain** — Direct check against the provider
2. **Witnessing firm** — Independent confirmation with timestamp
3. **Public blockchain** — Decentralized trust anchor via rollup inclusion

## Further Derivations

1. **Funding reconciliation statements** — Monthly statements from plan managers or funding bodies showing all claims paid against a person's plan, with hashes that the service user can verify against their own service delivery receipts. Creates a comprehensive audit trail without requiring the person to manually track every invoice.
2. **Care worker screening certificates** — Worker screening checks confirm a worker has been assessed as not posing a risk. Verified certificates with real-time status (CLEARED, REVOKED, BARRED) would catch workers who lose their clearance between screening cycles.
3. **Conflict-of-interest declarations** — Support coordinators and care managers recommend providers to service users. If the coordinator has a financial relationship with the provider they're recommending, that's a conflict. A verified declaration — "I have no financial interest in this provider" — creates accountability.
4. **Funding decision notices** — Government decisions on care budgets, plan access, and reviews, issued as verified documents. Cases of government employees manipulating decisions for personal gain demonstrate the need for verified decision notices with a witnessing trail.

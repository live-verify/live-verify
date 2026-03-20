---
title: "School & Childcare Attendance and Handover Records"
category: "Identity & Authority Verification"
type: "use-case"
volume: "Very Large"
retention: "Academic year + 7 years (funding audit / safeguarding review)"
slug: "school-childcare-attendance-handover"
verificationMode: "both"
tags: ["school", "childcare", "daycare", "attendance", "handover", "sign-in", "sign-out", "safeguarding", "custody", "funding", "subsidy", "child-safety", "autonomy", "kindergarten", "preschool"]
furtherDerivations: 4
---

## The Problem

Every school day, tens of millions of children are handed from one responsible adult to another — parent to teacher, teacher to grandparent, childcare worker to bus driver. Each handover is a moment of legal responsibility transfer. And yet the records of these handovers are overwhelmingly paper sign-in sheets, closed-ecosystem apps, or nothing at all.

This creates three distinct problems:

**Safeguarding:** When something goes wrong — a child goes missing, a custody violation occurs, an injury happens — the first question is always: *who had the child, and when?* Paper sign-in sheets are easily falsified after the fact. App-based records belong to the provider, not the parent.

**Attendance and education:** Schools have a legal duty to monitor attendance. Persistent absence is one of the strongest predictors of poor educational outcomes, safeguarding risk, and exploitation. Verified attendance records give parents, schools, and education authorities a shared, tamper-resistant picture of whether a child is actually in school. This doesn't solve truancy — a child determined not to attend won't be stopped by a verification system — but it ensures the *records* of attendance are honest. No one can claim a child was present when they weren't, or absent when they were.

**Funding accountability:** Government-subsidised childcare (US CCDF, Australia's CCS, UK's Tax-Free Childcare, Canada's $10-a-day) pays per attendance. If attendance records aren't independently verifiable, providers can inflate hours, claim for absent children, or fabricate attendance entirely.

### The Autonomy Transition

Not every child needs an adult at both ends of the handover. The pattern shifts with age:

- **Under ~5 (daycare/preschool):** Adult-to-adult handover at both ends. Parent or authorised person physically hands the child to a named carer, and collects them the same way. The child has no verification role.
- **~5–12 (primary/elementary):** Adult delivers; collection may be by an authorised adult or — increasingly toward the upper end — the child walks home. Schools typically require explicit parental opt-in for independent departure.
- **~12–14 (early secondary):** Many jurisdictions treat this as the autonomy threshold. The child can sign themselves in and out. A parent's blanket authorisation ("my child may leave independently") replaces per-event adult handover.
- **~14+ (secondary):** The student is the primary party. They sign in on arrival; they sign out when they leave. Parental visibility may continue (parents receive a notification) but the student's own device is the verification instrument.

The exact age varies by jurisdiction, school policy, and individual family choice. The verification system must accommodate the full range — from infant daycare where a named adult must be at both ends, to a 16-year-old who swipes in on their own phone.

---

## 1. Childcare Attendance Records (Under-5s)

### The Document

A daily attendance record confirming that a specific child was present at a licensed childcare facility, recording arrival time, departure time, the adult who delivered the child, and the adult who collected them.

Today these are paper sign-in sheets (easily backdated), provider-controlled app entries (no independent verification), or nothing. The provider submits attendance to the funding body — the parent has no verified counter-record.

The parent or guardian receives **two separate plain-text messages per day** — one at entry, one at exit — each independently verifiable:

<div style="max-width: 560px; margin: 24px auto; font-family: sans-serif; border: 1px solid #ccc; background: #fff; padding: 0; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <div style="background: #e91e63; color: #fff; padding: 14px 20px;">
    <div style="font-size: 1.1em; font-weight: bold;"><span verifiable-text="start" data-for="entry"></span>Little Gum Tree Early Learning</div>
    <div style="font-size: 0.75em; opacity: 0.9;">Provider Approval No: SE-00412 | ABN 55 903 118 442</div>
  </div>
  <div style="padding: 20px;">
    <div style="text-align: center; font-size: 1em; font-weight: bold; color: #e91e63; margin-bottom: 12px;">ARRIVAL RECORD</div>
    <div style="font-size: 0.88em; line-height: 1.8; color: #333;">
      <p style="margin: 0;"><strong>Child:</strong> Amara K. (Enrolment: LGT-2025-0093)</p>
      <p style="margin: 0;"><strong>Room:</strong> Possums (3–4 years)</p>
      <p style="margin: 0;"><strong>Arrived:</strong> 08:12, Wednesday 11 March 2026</p>
      <p style="margin: 0;"><strong>Delivered by:</strong> Fatima K. (Mother)</p>
      <p style="margin: 0;"><strong>Received by:</strong> Karen L. (Room Educator)</p>
    </div>
    <hr style="border: none; border-top: 1px dashed #999; margin: 15px 0 8px 0;">
    <div data-verify-line="entry" style="font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
      title="Demo only: this provider doesn't yet offer verification&#10;endpoints, so this is illustrative">
      <span data-verify-line="entry">verify:littlegumtree.com.au/attendance/v</span> <span verifiable-text="end" data-for="entry"></span>
    </div>
  </div>
</div>

<div style="max-width: 560px; margin: 24px auto; font-family: sans-serif; border: 1px solid #ccc; background: #fff; padding: 0; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <div style="background: #ad1457; color: #fff; padding: 14px 20px;">
    <div style="font-size: 1.1em; font-weight: bold;"><span verifiable-text="start" data-for="exit"></span>Little Gum Tree Early Learning</div>
    <div style="font-size: 0.75em; opacity: 0.9;">Provider Approval No: SE-00412 | ABN 55 903 118 442</div>
  </div>
  <div style="padding: 20px;">
    <div style="text-align: center; font-size: 1em; font-weight: bold; color: #ad1457; margin-bottom: 12px;">DEPARTURE RECORD</div>
    <div style="font-size: 0.88em; line-height: 1.8; color: #333;">
      <p style="margin: 0;"><strong>Child:</strong> Amara K. (Enrolment: LGT-2025-0093)</p>
      <p style="margin: 0;"><strong>Room:</strong> Possums (3–4 years)</p>
      <p style="margin: 0;"><strong>Departed:</strong> 17:45, Wednesday 11 March 2026</p>
      <p style="margin: 0;"><strong>Collected by:</strong> Yusuf K. (Father)</p>
      <p style="margin: 0;"><strong>Released by:</strong> Karen L. (Room Educator)</p>
      <p style="margin: 0;"><strong>Total hours:</strong> 9.55 (CCS-eligible: 9.55)</p>
    </div>
    <hr style="border: none; border-top: 1px dashed #999; margin: 15px 0 8px 0;">
    <div data-verify-line="exit" style="font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
      title="Demo only: this provider doesn't yet offer verification&#10;endpoints, so this is illustrative">
      <span data-verify-line="exit">verify:littlegumtree.com.au/attendance/v</span> <span verifiable-text="end" data-for="exit"></span>
    </div>
  </div>
</div>

Each message is a separate verified document with its own hash. The arrival record and the departure record are independently verifiable — different plain text, different hash, different verification event.

### Verification Response

- **VERIFIED** — Record matches the provider's system; handover confirmed by authorised person's device
- **CLAIMED** — Record verified AND corresponding attendance submitted to the funding body
- **MISMATCH** — Hours claimed to funding body differ from the arrival/departure records
- **404** — No matching record

### Two Documents, Two Commits

The provider can't game the times because each record is committed separately, in real time:

1. **At drop-off (08:12):** Fatima hands Amara to Karen. The provider's system generates the arrival record. Fatima's phone verifies it — or she receives it as a push notification / SMS and can verify it later. The provider has now committed to "08:12" as the arrival time. Changing it later changes the hash — and Fatima holds the original.

2. **At pickup (17:45):** Yusuf collects Amara. The departure record is generated as a separate document. Yusuf's phone verifies it. The provider has now committed to "17:45" as the departure time.

If the provider later claims 6:30am–6:30pm to the funding body (12 hours, more subsidy), but the verified records say 08:12–17:45 (9.55 hours), the MISMATCH status surfaces automatically.

The parent doesn't need to be a forensic auditor. They just receive two plain-text messages per day and their phone verifies each one. The provider has every incentive to facilitate this — because the same records that prevent them from inflating hours also protect them from false accusations. A provider with hundreds of verified arrival/departure records, each confirmed by a different parent's device, has instant proof that children were present and services were delivered.

---

## 2. School Attendance Registers

### The Document

A student's daily attendance record at a school — arrival time, any absences, and departure time (where applicable). Schools are legally required to maintain attendance registers in most jurisdictions. These records underpin truancy enforcement, safeguarding referrals, and (for younger children) funding.

<div style="max-width: 560px; margin: 24px auto; font-family: sans-serif; border: 1px solid #ccc; background: #fff; padding: 0; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <div style="background: #1565c0; color: #fff; padding: 14px 20px;">
    <div style="font-size: 1.1em; font-weight: bold;"><span verifiable-text="start" data-for="school"></span>Westfield Community College</div>
    <div style="font-size: 0.75em; opacity: 0.9;">DfE URN: 137294</div>
  </div>
  <div style="padding: 20px;">
    <div style="text-align: center; font-size: 1em; font-weight: bold; color: #1565c0; margin-bottom: 12px;">ATTENDANCE RECORD</div>
    <div style="font-size: 0.88em; line-height: 1.8; color: #333;">
      <p style="margin: 0;"><strong>Student:</strong> James W. (Year 9, Form 9T)</p>
      <p style="margin: 0;"><strong>Date:</strong> Tuesday 10 March 2026</p>
    </div>
    <div style="margin: 14px 0; padding: 10px; background: #e3f2fd; border-radius: 4px; font-size: 0.85em;">
      <table style="width: 100%; border-collapse: collapse;">
        <tr style="border-bottom: 1px solid #bbdefb;">
          <td style="padding: 4px 0;"><strong>AM Registration:</strong></td>
          <td>08:47 — Present (self-registered)</td>
        </tr>
        <tr style="border-bottom: 1px solid #bbdefb;">
          <td style="padding: 4px 0;"><strong>PM Registration:</strong></td>
          <td>13:15 — Present (self-registered)</td>
        </tr>
        <tr>
          <td style="padding: 4px 0;"><strong>Departure:</strong></td>
          <td>15:30 — Independent (parental authorisation on file)</td>
        </tr>
      </table>
    </div>
    <hr style="border: none; border-top: 1px dashed #999; margin: 15px 0 8px 0;">
    <div data-verify-line="school" style="font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
      title="Demo only: this school doesn't yet offer verification&#10;endpoints, so this is illustrative">
      <span data-verify-line="school">verify:westfield.school.uk/attendance/v</span> <span verifiable-text="end" data-for="school"></span>
    </div>
  </div>
</div>

### Verification Response

- **PRESENT** — Student was marked present for all registered sessions
- **ABSENT_AUTHORISED** — Student absent with parental/medical authorisation
- **ABSENT_UNAUTHORISED** — Student absent without authorisation (truancy)
- **LATE** — Student arrived after registration closed
- **404** — No matching record

### NFC Is Already the Input Layer

Many schools already use NFC for attendance. Students carry an NFC card, fob, or wristband and tap a reader at the gate or classroom door. Some use NFC-enabled school IDs. The tap event logs arrival and departure. This is established infrastructure — Live Verify doesn't replace it.

What's missing is **what happens to the record after the tap**. Today, the NFC event feeds into the school's management system (SIMS, Arbor, Compass, etc.) and the record belongs to the school. The parent sees a summary — if they have a parent portal login — but has no independently verifiable copy. The funding body sees whatever the school reports, not the raw tap data.

Live Verify sits downstream of the NFC tap. The student taps in → the school system generates an attendance record → the record gets a `verify:` line → the parent can verify it → the funding body can verify it → the school can't quietly edit it after the fact. The NFC reader is the input device. The verified attendance record is the output.

### The Autonomy Model

For the Year 9 student above, there's no adult handover. James taps his NFC card at the gate — or registers on his own phone. His parents can verify the same attendance record from their devices — confirming "the school says my child was present today" — without being physically present.

For a Reception-age child (4–5), the model looks more like the childcare pattern: a parent or authorised adult delivers and collects, and the handover is verified bilaterally. Some nurseries use NFC wristbands for toddlers — the wristband confirms the child is on-premises, but the handover verification requires the adult's device.

The school sets the autonomy policy per year group. The verification system doesn't enforce age thresholds — it reflects whatever the school's policy is. A school that allows Year 7 students to leave independently issues attendance records with "Independent (parental authorisation on file)." A school that requires adult collection until Year 9 issues records naming the collecting adult.

---

## 3. Handover Receipts (Custody-Sensitive)

### The Document

A specific record of who delivered and who collected a child, designed for situations where custody is contested, shared, or court-ordered. This goes beyond attendance — it's evidence of which parent or authorised person had physical custody of the child at which times.

<div style="max-width: 560px; margin: 24px auto; font-family: sans-serif; border: 1px solid #ccc; background: #fff; padding: 0; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <div style="background: #6a1b9a; color: #fff; padding: 14px 20px;">
    <div style="font-size: 1.1em; font-weight: bold;"><span verifiable-text="start" data-for="handover"></span>Sunnybank State School</div>
    <div style="font-size: 0.75em; opacity: 0.9;">Queensland Department of Education</div>
  </div>
  <div style="padding: 20px;">
    <div style="text-align: center; font-size: 1em; font-weight: bold; color: #6a1b9a; margin-bottom: 12px;">HANDOVER RECEIPT</div>
    <div style="font-size: 0.88em; line-height: 1.8; color: #333;">
      <p style="margin: 0;"><strong>Child:</strong> Olivia M. (Year 2)</p>
      <p style="margin: 0;"><strong>Date:</strong> Friday 13 March 2026</p>
    </div>
    <div style="margin: 14px 0; padding: 10px; background: #f3e5f5; border-radius: 4px; font-size: 0.85em;">
      <table style="width: 100%; border-collapse: collapse;">
        <tr style="border-bottom: 1px solid #e1bee7;">
          <td style="padding: 4px 0;"><strong>Delivered by:</strong></td>
          <td>Rachel M. (Mother) at 08:25</td>
        </tr>
        <tr style="border-bottom: 1px solid #e1bee7;">
          <td style="padding: 4px 0;"><strong>Collected by:</strong></td>
          <td>David M. (Father) at 15:15</td>
        </tr>
        <tr>
          <td style="padding: 4px 0;"><strong>Custody note:</strong></td>
          <td>Father's weekend per Family Court Order FC-2024-BNE-0841</td>
        </tr>
      </table>
    </div>
    <div style="font-size: 0.78em; color: #666; margin-bottom: 12px;">
      Both handovers confirmed by respective parent's device.
    </div>
    <hr style="border: none; border-top: 1px dashed #999; margin: 15px 0 8px 0;">
    <div data-verify-line="handover" style="font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
      title="Demo only: this school doesn't yet offer verification&#10;endpoints, so this is illustrative">
      <span data-verify-line="handover">verify:sunnybank-ss.eq.edu.au/handover/v</span> <span verifiable-text="end" data-for="handover"></span>
    </div>
  </div>
</div>

### Verification Response

- **CONFIRMED** — Handover completed; both delivering and collecting parties verified by their devices
- **DELIVERY_ONLY** — Child delivered but not yet collected
- **CUSTODY_ALERT** — Collecting person is not authorised under the current custody order
- **OVERRIDE** — School released child under emergency protocol (documented reason on file)
- **404** — No matching record

### Why This Matters for Custody Disputes

In contested custody cases, the school is often the handover point. "He didn't return her on time." "She picked her up on my day." These disputes land in family court, and the evidence is typically: he-said, she-said.

A verified handover receipt — with timestamps confirmed by both parents' devices, authority-chained through the school to the education department — is contemporaneous, cryptographic evidence of who had the child and when. It doesn't replace a custody order, but it provides the factual record that courts need to enforce one.

Cross-reference: [Adoption Papers and Custody Orders](view.html?doc=adoption-custody-orders) for the legal authority documents; [School Pickup Authorization](view.html?doc=school-pickup-authorization) for the authorised-person credential.

---

## Second-Party Use

The **parent or guardian** (second party) benefits across all three document types:

**Own verified record of attendance.** Today, parents trust the childcare provider or school to maintain accurate attendance records. If a dispute arises — "you said my child was here but they weren't" or "you're claiming hours my child didn't attend" — the parent has no independent evidence. Verified attendance records give parents their own cryptographic trail.

**Subsidy protection.** In countries with means-tested childcare subsidies (Australia's CCS, US CCDF, UK Tax-Free Childcare), the parent's subsidy depends on actual attendance. If a provider inflates hours and the funding body audits, the parent may be asked to repay. Verified records — confirmed by the parent's device at drop-off and pickup — protect the parent from liability for provider fraud.

**Custody evidence.** For separated parents sharing custody, the handover receipt trail provides neutral, timestamped evidence that doesn't depend on either parent's account. "I dropped her at school at 8:25 on my day, as verified by my device and the school's endpoint."

**The autonomous teenager.** For older students who sign themselves in and out, the attendance record is verified by the student's own device. Parents receive visibility — they can verify the same record — but the student is the primary verifying party. This respects the student's growing autonomy while maintaining the safeguarding trail.

## Third-Party Use

**Childcare Subsidy Agencies**
Australia's Department of Education (CCS), the US Office of Child Care (CCDF block grants), and the UK's HMRC (Tax-Free Childcare) all pay providers based on attendance. Verified attendance records — bilaterally confirmed by parent and provider — give subsidy agencies an independent check before payment, not a retrospective audit months later.

**Child Protection Services**
When a child is on a safeguarding plan, attendance is a key monitoring metric. Unexplained absences trigger welfare checks. Verified attendance records provide contemporaneous evidence — "the child was marked present, confirmed by the carer's device" — rather than relying on the school's retrospective reporting.

**Family Courts**
Custody disputes frequently turn on who had the child and when. Verified handover receipts, authority-chained through the school or childcare provider, provide admissible evidence that doesn't depend on either party's testimony.

**Education Regulators**
Ofsted (UK), state education departments (Australia), and school districts (US) inspect attendance record-keeping. Verified records with witnessing trails provide a higher standard of evidence than paper registers.

**Insurers**
Childcare providers carry public liability insurance. In injury claims, the insurer needs to establish whether the child was actually in the provider's care at the time. A verified attendance record with bilateral handover confirmation settles this question.

## Verification Architecture

**The Attendance Record Problem**

Attendance records serve multiple masters — safeguarding, education monitoring, and (for childcare) funding claims — but they all share the same weakness: the record is one-sided. The school or provider marks the child present or absent, and everyone else trusts that record. Parents may not see it. Funding bodies audit retrospectively, if at all. Education authorities rely on school self-reporting.

Verified attendance records make the record bilateral. The parent's device confirms what the school's system claims. This doesn't prevent truancy — a child can NFC in at the gate and then leave the premises, and a child who doesn't attend at all won't generate a verification event. Truancy is a pastoral and welfare problem, not a document verification problem.

Most schools manage attendance records honestly and have no issues with record integrity. But where problems do occur — hours inflated for funding claims, absences hidden to avoid safeguarding scrutiny, attendance fabricated for children who were never enrolled — bilateral verification may help surface them earlier.

**Issuer Types** (First Party)

- **Childcare attendance records:** Licensed childcare providers (authority chain to licensing body)
- **School attendance registers:** Schools (authority chain to education department / district)
- **Handover receipts:** Schools and childcare providers (same authority chains)

**Privacy Salt:** Highly Critical. Children's names, attendance patterns, custody arrangements, and disability/additional-needs status are extremely sensitive. Salt must be per-child, per-record, and non-deterministic. The existence of a record at an endpoint must not reveal whether a specific child attends a specific facility.

## Authority Chain

**Pattern:** Regulated (Australia — Childcare)

```
✓ littlegumtree.com.au/attendance/v — Licensed early childhood provider
  ✓ acecqa.gov.au/v — Australian Children's Education & Care Quality Authority
    ✓ education.gov.au/verifiers — Department of Education
      ✓ gov.au/verifiers — Australian Government root namespace
```

**Pattern:** Regulated (United Kingdom — Schools)

```
✓ westfield.school.uk/attendance/v — State-funded secondary school
  ✓ education.gov.uk/v — Department for Education
    ✓ gov.uk/verifiers — UK government root namespace
```

**Pattern:** Regulated (United States — Subsidised Childcare)

```
✓ sunshinelearning.com/attendance/v — Licensed childcare provider
  ✓ dcf.state.fl.us/v — State childcare licensing agency
    ✓ acf.hhs.gov/occ/v — Office of Child Care
      ✓ usa.gov/verifiers — US federal government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Jurisdictional Witnessing (Optional)

Some jurisdictions, contracts, or multi-party workflows may add an independent witness layer. When used, the witnessing firm:

- Receives all hashes from the issuer, and any subsequent changes to the payload as they happen — which may manifest as a new hash, a status change, or even a 404 (record deleted)
- Receives structured content/metadata (key identifiers and dates)
- Does **NOT** receive plaintext or sensitive personal information
- Provides an immutable, timestamped audit trail — available to the jurisdiction on demand, to document holders/third parties during disputes, or as expert witness testimony in legal proceedings

This provides:
- **Non-repudiation:** Provider cannot deny recording the attendance / handover
- **Timestamp proof:** Child was delivered / collected at a specific time
- **Regulatory audit:** Funding bodies can inspect the witness ledger — providers with claimed attendance but no bilateral verification events are immediately flagged
- **Resilience:** Verification works even if the provider's systems go down
- **Custody evidence:** Immutable record of which parent had the child, available to family courts

**Public Blockchain (Non-Party)**

If a witness layer exists, it may periodically commit rollups to a public blockchain as an additional timestamping mechanism. That is optional, not inherent to the use case. The verification paths would then be:

1. **Provider domain** — Direct check against the childcare provider or school
2. **Witnessing firm** — Independent confirmation with timestamp
3. **Public blockchain** — Decentralized trust anchor via rollup inclusion

## Competition vs. Existing Solutions

| Feature | Live Verify | School/Childcare App | Paper Sign-In Sheet | Funding Body Audit |
| :--- | :--- | :--- | :--- | :--- |
| **Bilateral verification** | **Yes.** Both parent/guardian and provider confirm the same record. | **Sometimes.** Some apps notify parents; few require confirmation. | **No.** Provider controls the sheet. | **Retrospective.** Compares claims against records months later. |
| **Fraud detection timing** | **Real-time.** Before funding claim is submitted. | **Varies.** Depends on app design. | **Never.** Sheet says whatever the provider wrote. | **Months to years.** Money already gone. |
| **Custody evidence** | **Cryptographic.** Timestamped, authority-chained, independently verifiable. | **App-dependent.** Records in vendor database; may not be admissible. | **Weak.** Handwriting on paper, easily disputed. | **N/A.** Not designed for custody. |
| **Cross-system** | **Yes.** Works across any provider/school with a domain. | **No.** Locked to vendor ecosystem. | **N/A.** | **N/A.** |
| **Parent portability** | **Yes.** Parent keeps verified records across providers. | **No.** Records stay with the app/provider. | **No.** Provider keeps the sheet. | **No.** |
| **Autonomy transition** | **Built-in.** Student's own device becomes the verifying instrument. | **Varies.** Some apps support student accounts. | **N/A.** | **N/A.** |

## Further Derivations

1. **Excursion and off-site activity attendance** — Verified attendance for school excursions, sports carnivals, and camp stays. Parent consents (see [Consent Records](view.html?doc=consent-records)) and the child's attendance at the off-site location are verified separately. If a child is injured on an excursion, the verified attendance record proves they were in the school's care.
2. **Before/after school care handover** — Many children attend before-school or after-school care operated by a different provider on school grounds. The handover between school and OSHC provider is a second daily transfer of responsibility that currently has no verified record.
3. **Transport handover (school bus / shuttle)** — Child boards a bus at stop A, exits at stop B. The driver or attendant confirms. For younger children, the receiving adult at the destination confirms. Creates a chain: parent → bus → school → bus → parent, with each link verified.

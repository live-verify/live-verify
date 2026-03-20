---
title: "Bedside Care Interaction Records"
category: "Healthcare & Medical Records"
type: "use-case"
volume: "Very Large"
retention: "Interaction + 7–10 years (clinical negligence limitation)"
slug: "bedside-care-interaction-records"
verificationMode: "both"
tags: ["hospital", "care-home", "nursing", "bedside", "patient", "procedure", "ward", "interaction", "lidar", "voice-ai", "care-log", "staffing", "nhs", "medicare", "worker-protection", "blockchain"]
furtherDerivations: 2
---

## The Capability

Healthcare workers spend a significant fraction of their shift on documentation — typing into EHR systems, filling in paper charts, logging what they did and when. This takes time away from patients, and the resulting records belong to the institution, not the patient.

Three converging technologies make something new possible: **a hands-free, privacy-compliant care interaction log that generates verified records at the bedside without the worker touching a keyboard**.

Live Verify's role here is narrow: it is the **output format**, not the system. The system is LiDAR + voice + AI. Live Verify is the mechanism that makes each log entry a human-centric record that is independently, machine-verifiable later — plain text, SHA-256 hash, `GET /v/{hash}` against the institution's domain. The larger system captures what happened; Live Verify ensures the record can't be quietly rewritten afterwards.

This only works inside a culture of **owning your mistakes**. If a wound dressing took 8 minutes instead of 25, the honest response might be "we need more staff on this shift" — not "discipline that nurse." If a worker was short with a patient's family, the log may also show they'd been verbally abused three times that shift. Honest records serve everyone when the institution uses them honestly — for learning, for staffing decisions, for systemic improvement. A system that generates verified records and then uses them punitively will be resisted and gamed. A system that uses them to understand what's actually happening on the ward will be valued by the workers who generate them.

### LiDAR — Who Is Where, Without Cameras

Ceiling-mounted LiDAR sensors — the same technology deployed at London Waterloo and Euston stations for anonymous crowd monitoring (Createc, funded by DASA) — track person-shaped forms moving through a ward. No cameras, no faces, no biometrics. Just position, movement, and dwell time. The system knows that a person moved to bed 4 at 10:14 and is still there at 10:41.

LiDAR is already proven in busy public spaces. A hospital ward is a simpler environment — fixed bed positions, known layout, fewer people. The sensor infrastructure is low-cost and ceiling-mounted, requiring no interaction from patients or staff.

### Voice + AI — Procedure Capture Without Saying the Patient's Name

The worker wears an earpiece. When they begin a procedure, the flow is:

> **Worker** (speaks aloud): *"Starting wound dressing"*
>
> **AI** (in earpiece, private — only the worker hears): *"Looks like you're with Joan at bed 4"*
>
> **Worker** (speaks aloud): *"Yep"*

The system generates a START record. When the worker finishes:

> **Worker**: *"Done"*

The system generates an END record with the calculated duration.

The privacy design is deliberate: **the worker never says the patient's name**. The AI infers the patient from the bed assignment system and the worker's LiDAR-tracked position, then proposes the match privately through the earpiece. The only words spoken aloud are the procedure type and a confirmation — neither is individually identifiable. This is HIPAA/GDPR-compliant by architecture, not by policy.

**Correction flow:** If the AI gets it wrong — "No, bed 5" — the worker corrects through the earpiece. The system re-proposes. No patient name is ever spoken on the ward.

### Cross-Corroboration

The earpiece is assigned to a specific worker at the start of shift — the system knows *who* is speaking. LiDAR confirms *where* they are and *how long* they stay. Voice confirms *what* they're doing. The two inputs independently corroborate each other: LiDAR confirms a person was at bed 4 for 27 minutes, and the voice from that person's earpiece confirms the procedure was a wound dressing. Neither input can be faked without contradicting the other.

---

## The Patient's Care Log

The output of this system is a **continuous, verified log of every care interaction** a patient receives during their stay. Each interaction produces two verified records — start and end — committed at the time they happen, held by the patient.

<div style="max-width: 560px; margin: 24px auto; font-family: sans-serif; border: 1px solid #ccc; background: #fff; padding: 0; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <div style="background: #00695c; color: #fff; padding: 14px 20px;">
    <div style="font-size: 1.1em; font-weight: bold;"><span verifiable-text="start" data-for="start"></span>Royal Devon University Healthcare</div>
    <div style="font-size: 0.75em; opacity: 0.9;">NHS Foundation Trust</div>
  </div>
  <div style="padding: 20px;">
    <div style="text-align: center; font-size: 1em; font-weight: bold; color: #00695c; margin-bottom: 12px;">CARE INTERACTION — START</div>
    <div style="font-size: 0.88em; line-height: 1.8; color: #333;">
      <p style="margin: 0;"><strong>Patient:</strong> Joan W. (Ward: Bramble, Bed 4)</p>
      <p style="margin: 0;"><strong>Interaction:</strong> Wound dressing — right lower leg</p>
      <p style="margin: 0;"><strong>Clinician:</strong> Nurse Alicia M. (NMC Pin: 22A1234E)</p>
      <p style="margin: 0;"><strong>Started:</strong> 10:14, Wednesday 11 March 2026</p>
    </div>
    <hr style="border: none; border-top: 1px dashed #999; margin: 15px 0 8px 0;">
    <div data-verify-line="start" style="font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
      title="Demo only: this trust doesn't yet offer verification&#10;endpoints, so this is illustrative">
      <span data-verify-line="start">verify:rduh.nhs.uk/care/v</span> <span verifiable-text="end" data-for="start"></span>
    </div>
  </div>
</div>

<div style="max-width: 560px; margin: 24px auto; font-family: sans-serif; border: 1px solid #ccc; background: #fff; padding: 0; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <div style="background: #004d40; color: #fff; padding: 14px 20px;">
    <div style="font-size: 1.1em; font-weight: bold;"><span verifiable-text="start" data-for="end"></span>Royal Devon University Healthcare</div>
    <div style="font-size: 0.75em; opacity: 0.9;">NHS Foundation Trust</div>
  </div>
  <div style="padding: 20px;">
    <div style="text-align: center; font-size: 1em; font-weight: bold; color: #004d40; margin-bottom: 12px;">CARE INTERACTION — END</div>
    <div style="font-size: 0.88em; line-height: 1.8; color: #333;">
      <p style="margin: 0;"><strong>Patient:</strong> Joan W. (Ward: Bramble, Bed 4)</p>
      <p style="margin: 0;"><strong>Interaction:</strong> Wound dressing — right lower leg</p>
      <p style="margin: 0;"><strong>Clinician:</strong> Nurse Alicia M. (NMC Pin: 22A1234E)</p>
      <p style="margin: 0;"><strong>Ended:</strong> 10:41, Wednesday 11 March 2026</p>
      <p style="margin: 0;"><strong>Duration:</strong> 27 minutes</p>
    </div>
    <hr style="border: none; border-top: 1px dashed #999; margin: 15px 0 8px 0;">
    <div data-verify-line="end" style="font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
      title="Demo only: this trust doesn't yet offer verification&#10;endpoints, so this is illustrative">
      <span data-verify-line="end">verify:rduh.nhs.uk/care/v</span> <span verifiable-text="end" data-for="end"></span>
    </div>
  </div>
</div>

### Verification Response

- **VERIFIED** — Interaction record matches the trust/facility's system
- **IN_PROGRESS** — Start record verified but no end record yet (interaction ongoing)
- **AMENDED** — Duration was corrected after the fact (original duration preserved in chain)
- **404** — No matching record

### Delivery to the Patient

The log can reach the patient and their representatives in several ways:

- **Bedside terminal / tablet** — the patient sees each interaction in real time as it's recorded
- **Patient's phone** — push notifications or a ward app showing the rolling log
- **Family / power of attorney** — the same log is accessible to authorised family members remotely. A daughter in another city can see that her mother's wound dressing happened at 10:14 and took 27 minutes
- **Post-discharge summary** — the complete interaction log is provided to the patient on discharge, as a verified document they keep permanently
- **Legal / litigation** — in clinical negligence proceedings, the patient's solicitor can verify every interaction record against the trust's endpoint. The records are contemporaneous and cryptographic — not retrospective nursing notes written hours later

The log is the patient's document. The institution issues it, but once issued and verified, the patient holds an independent copy that the institution cannot alter.

---

## What the Log Reveals

### Real-Time Ward Visibility

For the first time, ward managers and clinical leads can see — in real time — what is actually happening on the ward:

- Which patients have been seen this shift, and which are still waiting
- How long each interaction is taking, against the expected duration for that procedure type
- Which staff are at which bedsides, and how their workload is distributed
- Where bottlenecks are forming — a complex wound dressing running long, delaying the rest of the round

This is operational data that ward managers currently don't have until shift handover. Having it live changes how care is coordinated.

### Staffing Evidence

Aggregated interaction data across a ward provides hard evidence for staffing decisions:

- **Average interaction duration by procedure type** — establishing realistic baselines for how long procedures actually take, not how long they're scheduled for
- **Worker loading per shift** — if a single nurse is generating 40 interaction records per shift, the staffing model is wrong
- **Time-of-day patterns** — if evening interactions are consistently shorter than morning ones, that may indicate understaffing on night shifts
- **Duration trends over time** — if average interaction times change after a staffing restructure, that's measurable

In state-run systems under budget pressure, this data is valuable precisely because it makes the case for resources: "our verified interaction records show we cannot deliver safe care in the time we're staffed for."

### Continuity Across Transfers

When a patient moves from one ward to another, or from hospital to care home, or from care home to community care, their interaction log travels with them. The receiving team can see the pattern of care — what was being done, how often, for how long. The patient or their family can compare: "Mum was getting 25-minute wound dressings in hospital; the care home is doing them in 8 minutes."

### The Worker's Own Record

The interaction log is also the **worker's record** of what they actually did. Over time, a worker's records form a pattern — a personal portfolio of care delivery. This is useful for:

- **Professional development** — understanding how time is spent across procedure types
- **Revalidation** — demonstrating clinical activity for professional registration renewal
- **Defence** — if a patient is harmed and the institution or a regulator investigates, the worker's verified interaction records show exactly how much time they had. The records are theirs as much as the patient's

### Worker Safety

NHS staff reported over 77,000 physical assaults in 2022-23. A significant proportion involve family members — people who are frightened, frustrated, or desperate for a specific outcome for their relative, and who don't have the clinical context the worker has. The same LiDAR + voice system that logs care interactions also provides a safety layer for healthcare workers.

**Logging family interactions.** A worker can speak into their earpiece: *"Family member interaction, bed 4."* The system logs it — timestamped, LiDAR-corroborated (confirming multiple people at that bedside), blockchain-anchored. If the interaction becomes threatening or abusive, the worker has a contemporaneous record. If it escalates to a formal complaint, assault charge, or disciplinary hearing, the log shows when the family member was present, for how long, and that the worker flagged it at the time.

**Proximity detection.** The same LiDAR crowd-safety technology trialled at railway stations (Createc/DASA, deployed at Waterloo and Euston) can detect threatening behaviour patterns — unusual proximity, rapid approach, agitated movement. In a ward setting, the system could flag when a non-staff person-shape is unusually close to a worker for an extended period, or when movement patterns suggest confrontation rather than conversation. This doesn't replace security staff, but it provides an alert layer and — critically — a verified record of what happened spatially, independent of anyone's testimony.

**The worker's evidence.** Today, when a healthcare worker reports abuse from a family member, it's their word against the family's. The institution may not back the worker — especially if the family is threatening legal action. A verified, blockchain-anchored log showing the family member's presence at the bedside, the worker's contemporaneous "family member interaction" voice log, and the LiDAR spatial record provides evidence that doesn't depend on institutional support.

> **Note:** The LiDAR + voice + verified log pattern described here is not unique to healthcare. The same system — anonymous spatial tracking, hands-free voice logging, blockchain-anchored records — applies to any workplace where staff interact with the public in situations that may need documenting: social workers on home visits, teachers in classrooms, retail staff facing aggressive customers, council housing officers, probation workers, benefits assessors, police custody suites, immigration interview rooms, care home staff, airline and airport ground staff, hotel front desk workers, rail staff, lone workers in any setting. Travel and hospitality workers are routinely subjected to abuse from frustrated passengers and guests — and employers too often dismiss this as "part of the job." A verified interaction log shifts that: the abuse is documented, timestamped, and held by the worker, not just noted in a shift report the employer controls. The input layer (LiDAR placement, voice prompts) varies; the output — a verified, non-repudiable interaction log held by the worker — is the same.

### The Mixed-Economy Hospital

Some private hospitals operate in two modes: generous time per interaction for private/insured patients, and very different economics for NHS-contracted or publicly-funded patients. Same clinician, same facility, same procedure — but the time allocation changes when the payer changes. The interaction log makes the actual time visible regardless of funding source, and patients in both modes hold the same quality of verified record.

---

## Blockchain Anchoring

The standard Live Verify model uses a witnessing firm for non-repudiation. For bedside care interaction records, there is a stronger case for **direct blockchain anchoring** — writing interaction hashes to a low-cost public blockchain (or a healthcare-specific permissioned chain) as they are generated.

### Why Blockchain Is More Appropriate Here

In most Live Verify use cases, the issuer is a willing participant — a university issuing a transcript, a regulator issuing a licence. The witnessing firm provides a backup, but the issuer has no incentive to repudiate their own documents.

Hospital care interactions are different. The institution issuing the record is also the party whose practices the record may later scrutinise. In litigation, an institution has an incentive to argue that records were inaccurate, incomplete, or tampered with. A witnessing firm provides non-repudiation — but a blockchain provides it in a way that requires no trust in any single third party.

### How It Works

Each interaction hash — START and END — is written to the blockchain at the time of the event. The cost per write on a low-cost chain (Polygon, Arbitrum, or a healthcare-specific chain) is fractions of a cent. A busy hospital ward generating 200 interactions per day would cost a few dollars per month in blockchain fees.

The blockchain entry contains:
- The SHA-256 hash of the interaction record (no patient data, no plaintext)
- A timestamp
- The issuing institution's identifier

**What this adds beyond standard witnessing:**
- **No single point of trust.** Neither the institution, nor a witnessing firm, nor any single party can alter or deny the record
- **Permanent availability.** The hash exists on-chain regardless of whether the institution's systems are online, or whether the institution itself still exists (relevant for long-tail litigation)
- **Cryptographic proof of timing.** The blockchain timestamp is consensus-based, not institution-reported. The institution cannot claim an interaction happened at a different time
- **Litigation-grade evidence.** Courts are increasingly familiar with blockchain evidence. A hash on-chain, matched to a patient-held plaintext record, is a strong evidential package

### Verification Paths

With blockchain anchoring, three independent verification paths exist:

1. **Institution domain** — `GET /v/{hash}` against the hospital's endpoint. The standard Live Verify check.
2. **Blockchain** — the hash exists on-chain with a consensus timestamp. Works even if the institution's endpoint is down or has been modified.
3. **Patient-held record** — the patient holds the plaintext. SHA-256 hash of the plaintext matches what's on-chain. The institution cannot deny issuing it.

---

## Second-Party Use

The **patient** (second party) — or their family member, power of attorney holder, or advocate — holds the interaction log:

**During the stay.** Real-time visibility of care delivery. A family member who can't be at the bedside sees each interaction as it happens. Particularly important for elderly or cognitively impaired patients whose family may live far away.

**At discharge.** The complete interaction log is a verified document the patient takes home — a comprehensive record of every care interaction during their stay, with durations, clinician names, and procedure types.

**In complaints.** "The nurse was only in the room for 8 minutes" moves from hearsay to verified evidence: START 10:14, END 10:22, duration 8 minutes, blockchain-anchored at both timestamps.

**In litigation.** A patient's solicitor receives the interaction log. Every record can be verified against the institution's endpoint AND independently against the blockchain. The institution cannot claim the records are fabricated, because the hashes were on-chain at the time of the events.

## Third-Party Use

**Healthcare Regulators (CQC, state health departments, Joint Commission)**
Aggregated interaction data across facilities provides a new inspection evidence base. Instead of relying on self-reported staffing data and scheduled inspections, regulators can see actual care delivery patterns — which facilities are consistently delivering shorter interactions than clinical guidelines recommend.

**Commissioners / Funders (NHS commissioners, Medicare, Medicaid, insurers)**
Interaction records provide evidence of what was actually delivered. In state-run systems, the data helps commissioners understand whether funded time is reaching patients. In for-profit settings, it provides a cross-check between billed time and actual interaction time.

**Coroners and Inquests**
When a patient death triggers an inquest, the interaction log provides a contemporaneous, cryptographic, blockchain-anchored timeline of care. "How long did the nurse spend with the patient before the fall?" is answered by the verified record, not by retrospective documentation.

**Trade Unions and Professional Bodies (RCN, ANA, NMC)**
Aggregated and anonymised worker interaction data provides evidence for staffing campaigns. "Our members are averaging 11-minute wound dressings when the clinical guideline is 25 minutes" — backed by verified data, not surveys.

**Workers and Their Representatives**
The interaction records are the worker's contemporaneous evidence of what they actually did. In disciplinary proceedings, in regulatory investigations, or in any situation where the institution's account of events differs from the worker's, the verified records are an independent source of truth that the employer does not control.

## Verification Architecture

**Issuer Types (First Party)**

- **Interaction records:** The hospital, trust, or care facility
- The institution is the issuer — it generates the record from the LiDAR/voice system. This creates a natural tension: the institution issues records that may later be used to scrutinise its own practices. The mitigation is threefold: (1) records are committed at time of interaction, not retrospectively; (2) the patient holds a verified copy; (3) blockchain anchoring provides non-repudiation that doesn't depend on the institution's cooperation.

## Privacy Salt

Highly Critical. Patient names, ward locations, diagnoses (implied by procedure type), and clinician identifiers are extremely sensitive. The hash must be heavily salted to prevent:
- Enumeration of who is a patient at a specific facility
- Discovery of specific conditions or procedures from interaction records
- Correlation of patient identity with clinician or ward
- Identification of individual workers' patterns by external parties without authorisation

Salt must be per-patient, per-interaction, and non-deterministic.

## Authority Chain

**Pattern:** Regulated (United Kingdom — NHS)

```
✓ rduh.nhs.uk/care/v — NHS Foundation Trust issuing care interaction records
  ✓ cqc.org.uk/v — Care Quality Commission
    ✓ gov.uk/verifiers — UK government root namespace
```

**Pattern:** Regulated (United Kingdom — Private Hospital, NHS-contracted)

```
✓ spirehealthcare.com/care/v — Private hospital delivering NHS-contracted care
  ✓ cqc.org.uk/v — Care Quality Commission
    ✓ gov.uk/verifiers — UK government root namespace
```

**Pattern:** Regulated (United States — Medicare/Medicaid Hospital)

```
✓ provider.example.com/care/v — Hospital issuing care interaction records
  ✓ cms.gov/v — Centers for Medicare & Medicaid Services
    ✓ usa.gov/verifiers — US federal government root namespace
```

**Pattern:** Regulated (Australia — Public Hospital)

```
✓ hospital.example.health.nsw.gov.au/care/v — Public hospital
  ✓ safetyandquality.gov.au/v — Australian Commission on Safety and Quality in Health Care
    ✓ gov.au/verifiers — Australian Government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Competition vs. Existing Solutions

| Feature | This System | Electronic Health Record (EHR) | Paper Nursing Notes | Periodic Inspection |
| :--- | :--- | :--- | :--- | :--- |
| **Record generation** | **Hands-free.** Voice + LiDAR. | **Manual.** Worker types into system. | **Manual.** Worker writes notes. | **N/A.** |
| **Record holder** | **Patient.** Verified copy held independently. | **Institution.** Patient may request access. | **Institution.** Filed in nursing station. | **Regulator.** Snapshot at inspection. |
| **Timestamp integrity** | **Blockchain-anchored.** Consensus timestamp at time of event. | **System-logged.** Institution controls the system. | **Self-reported.** Often retrospective. | **N/A.** |
| **Worker burden** | **Near-zero.** Speak procedure, confirm patient, say "done". | **Significant.** Typing, clicking, navigating menus. | **Significant.** Handwriting, filing. | **N/A.** |
| **Privacy compliance** | **By architecture.** Patient name never spoken aloud. | **By policy.** Depends on screen positioning, verbal handovers. | **By policy.** Paper visible to passers-by. | **N/A.** |
| **Real-time ward visibility** | **Yes.** Live view of who is where, doing what. | **Delayed.** Data available after entry. | **No.** Data available after shift. | **No.** |
| **Non-repudiation** | **Blockchain + patient copy.** Institution cannot deny or alter. | **Audit log.** But institution controls the system. | **None.** | **None.** |

## Further Derivations

1. **Medication administration records (MARs)** — Verified records of each medication administered to a patient, with timestamp, dose, route, and administering clinician. The same voice + LiDAR system captures "giving 500mg paracetamol oral" without the worker touching a screen. The patient or family can verify that medications were given as prescribed — particularly important for controlled substances and time-critical medications.
2. **Shift handover records** — Verified summaries passed from outgoing to incoming clinical staff at shift change. Patient-verifiable to ensure continuity — "the night nurse was told about my pain management plan" is confirmed by the verified handover document.
3. **Procedure consent confirmations** — Verified record that the patient (or their representative) was informed of and consented to a specific procedure, with duration of the consent discussion. A blockchain-anchored record of a 3-minute consent conversation for a major procedure is more honest than a retrospective note claiming "risks and benefits were fully explained."

---
title: "Prescriptions"
category: "Healthcare & Medical Records"
volume: "Very Large"
retention: "2-7 years (varies by jurisdiction and substance schedule)"
slug: "prescriptions"
verificationMode: "both"
tags: ["prescription", "medication", "pharmacy", "controlled-substance", "opioid", "prescriber", "dea", "gmc", "travel", "schedule-ii"]
furtherDerivations: 1
---

## What is a Prescription?

You're traveling from London to New York with a month's supply of codeine — legally prescribed by your GP for chronic pain. At US customs, the officer sees the medication. In the UK, codeine is a common prescription painkiller. In the US, it's a controlled substance. The officer asks for proof. You have a crumpled paper prescription from your GP. The officer has no way to verify it. Is this a real prescription from a real doctor? Was it actually prescribed to you? Is the quantity legitimate? Or did you buy a pad of blank prescriptions online?

Prescription fraud is a public health crisis. The opioid epidemic was fueled in part by forged, altered, and doctor-shopped prescriptions. Pharmacies use PDMP databases and e-prescribing systems internally, but the patient — and crucially, anyone outside the healthcare system (border agents, school administrators, sports officials) — has no way to verify a prescription is real.

Inside the healthcare system, PDMP and e-prescribing should remain primary. The strong Live Verify case is outside that system: the customs officer, school nurse, sports official, or emergency responder who only has the paper, PDF, or phone snapshot in front of them.

<div style="max-width: 500px; margin: 24px auto; font-family: sans-serif; border: 1px solid #ccc; border-radius: 8px; background: #fff; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.15);">
  <div style="background: #1a5276; color: #fff; padding: 14px 18px;">
    <div style="font-weight: bold; font-size: 1.1em;"><span verifiable-text="start" data-for="rx"> </span>Elm Street Medical Practice</div>
    <div style="font-size: 0.8em; margin-top: 2px;">42 Elm Street, Islington, London N1 8QJ</div>
    <div style="font-size: 0.75em; margin-top: 2px;">Tel: 020 7946 0123</div>
  </div>
  <div style="padding: 18px; font-size: 0.9em; line-height: 1.7; color: #222;">
    <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
      <div><strong>Dr. Eleanor Whitfield</strong><br>MB ChB, MRCGP<br>GMC No: 7204881<br>NHS Prescriber Code: G84021</div>
      <div style="text-align: right;"><strong>Date:</strong> 15 Feb 2026<br><strong>Rx #:</strong> ELM-2026-004417</div>
    </div>
    <div style="border-top: 1px solid #ddd; padding-top: 10px; margin-bottom: 10px;">
      <strong>Patient:</strong> JAMES MICHAEL TAYLOR<br>
      <strong>DOB:</strong> 22/09/1978<br>
      <strong>NHS #:</strong> 943 228 7761
    </div>
    <div style="background: #f7f9fb; padding: 12px; border-radius: 4px; margin-bottom: 10px;">
      <strong>Medication:</strong> Codeine Phosphate 30mg Tablets<br>
      <strong>Dosage:</strong> Take ONE tablet every 4-6 hours as required<br>
      <strong>Quantity:</strong> 56 tablets<br>
      <strong>Refills:</strong> 0 (zero)<br>
      <strong>Schedule:</strong> Class B / Schedule 5 (UK); Schedule II (US equivalent)<br>
      <strong>Instructions:</strong> Do not exceed 8 tablets in 24 hours. Do not drive or operate heavy machinery. Take with food.
    </div>
    <div style="margin-bottom: 12px;">
      <strong>DEA #:</strong> N/A (UK prescriber)<br>
      <em style="font-size: 0.85em; color: #555;">Signature: E. Whitfield (electronic)</em>
    </div>
    <div data-verify-line="rx" style="border-top: 1px dashed #999; padding-top: 8px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;">
      <span data-verify-line="rx">verify:elmstreetmedical.nhs.uk/rx/v</span> <span verifiable-text="end" data-for="rx"></span>
    </div>
  </div>
</div>

## The Problem: Prescription Fraud

Pharmacists have monitoring databases and e-prescribing to lean on, but a customs officer, school nurse, sports official or police officer has only the paper or a phone snapshot. They must decide on the spot whether the medication in front of them was really prescribed to this person, by a real prescriber, in this quantity. Guess wrong one way and a legitimate patient is detained or loses their medication; guess wrong the other way and diverted drugs pass.

- **Forged prescriptions:** Blank pads bought online or fake letterhead printed at home; paper prescriptions carry no built-in means of checking.
- **Altered prescriptions:** Changing the quantity from 20 to 200, switching hydrocodone to oxycodone, or adding refills with a pen, a photocopier or a PDF editor.
- **Prescriber impersonation:** A real doctor's name and DEA number, which is often printed on legitimate prescriptions and easily copied, used on a fake prescription.
- **Stolen prescription pads:** Pads taken from surgeries and clinics produce prescriptions that look authentic because the stationery is, though no doctor wrote them.
- **Reuse and doctor shopping:** One prescription presented at several pharmacies, or several prescriptions for the same controlled substance obtained from different prescribers; each paper looks fine on its own.
- **Pharmacy fraud:** Fake pharmacies filling fake prescriptions for insurance billing, where both the prescription and the dispensing are fabricated.
- **Foreign prescriptions:** Forged prescriptions naming overseas doctors, which the receiving country has no practical way to check.

## What Is Checked

Patient name, prescriber name, prescriber credentials (medical degree, board certification), prescribing organization, medication name, dosage, quantity, date prescribed, number of refills authorized, controlled substance schedule (if applicable), prescriber registration number (GMC, NPI), DEA number (US controlled substances only).

**NOT included:** Diagnosis, medical history, reason for prescribing. The prescription proves *what* was prescribed and *by whom* — never *why*.

## Verification Response

The endpoint returns a status code:

- **VALID** — Active prescription, unfilled or partially filled
- **FILLED** — Prescription has been dispensed (returns fill date)
- **PARTIALLY_FILLED** — Some refills remain
- **EXPIRED** — Prescription validity period has passed
- **CANCELLED** — Prescriber cancelled the prescription
- **FLAGGED** — Prescription is under review (possible fraud, interaction alert)
- **404** — No matching record; possible forgery

The issuer domain is visible from the `verify:` line on the prescription itself (e.g., `elmstreetmedical.nhs.uk`).

## Who Holds It

The Patient (second party) receives the prescription from the prescriber (first party), keeps it, and may later hand it to third parties for various reasons, or never do so.

**Traveling internationally with controlled medications** — the primary non-pharmacy use case. The patient crossing a border with codeine, diazepam, or methylphenidate can present a verified prescription to customs. The officer scans it, sees VALID or FILLED, and knows this isn't a trafficker.

**Proving legitimate prescription to a new pharmacy** — patient moves, goes on holiday, or their usual pharmacy is closed. A verified prescription from the original prescriber is accepted without the new pharmacy needing to call the surgery.

**Proving prescription to school administrators** — a child takes methylphenidate (Ritalin) for ADHD. The school requires documentation. A verified prescription eliminates the back-and-forth with the pediatrician's office.

**Presenting to sports anti-doping officials** — an athlete prescribed testosterone for hypogonadism or a beta-blocker for a heart condition. A verified prescription supports a Therapeutic Use Exemption claim.

**Emergency situations** — the patient is found unconscious or incoherent. Emergency medical teams can scan the prescription to verify the patient's medication claims without waiting to reach the prescriber.

## Who Checks It

**Pharmacies**
PDMP and e-prescribing remain the primary production systems. A document-to-status bridge is more useful when pharmacies are forced to work from a paper or external prescription artifact outside the usual closed loop.

**Border / Customs Agents**
Controlled substances in luggage. This is where existing systems completely fail. No customs officer has access to PDMP. No customs officer can call a GP surgery in another country at 2am. A `verify:` line gives them an answer in seconds.

**School Nurses / Administrators**
Students carrying medication. Schools need proof that the medication a child brings in was actually prescribed. Verified prescriptions replace the pile of faxed doctor's notes that nobody can authenticate.

**Sports Organizations**
Anti-doping and Therapeutic Use Exemption (TUE) verification. WADA, USADA, and national anti-doping agencies need to distinguish between athletes using banned substances with a legitimate prescription and athletes doping.

**Insurance Companies**
Claims verification. Insurers paying for medication want proof that the prescription is real and was issued by a licensed prescriber.

**Law Enforcement**
Distinguishing legitimate possession from illegal possession. An officer finds oxycodone in a car during a traffic stop. A verified prescription on the patient's phone is the difference between "have a nice day" and an arrest.

**Emergency Medical Teams**
Verifying a patient's medication claims in emergencies. Paramedics treating an unconscious patient can scan prescriptions found in their wallet or phone.

**Care Homes / Nursing Facilities**
Verifying prescriptions for residents. Care homes administer medication daily to dozens of residents and need to know every prescription is current and legitimate.

## How Verification Works Here

The FILLED status matters most here. It prevents a single prescription from being presented to multiple pharmacies. Once dispensed, the status changes, turning a reusable piece of paper into a one-time token.

## Privacy Salt

Critical. Medical prescriptions are among the most sensitive documents in existence. The medication name alone reveals health conditions — antipsychotics reveal mental illness, antiretrovirals reveal HIV status, methadone reveals opioid dependency. Salt is essential to prevent enumeration attacks. Without salt, an attacker who knows a patient's name could hash common medication combinations and check them against the endpoint, effectively building a medical profile without ever seeing the prescription. The salt makes this computationally infeasible.

## Authority Chain

**Pattern:** Regulated

The prescribing practice is regulated by the medical licensing body, which chains to the government root.

UK chain (practice → GMC → Medical Act 1983):

```
✓ elmstreetmedical.nhs.uk/rx/v — Prescribes medication in England
  ✓ gmc-uk.org/register — Registers and regulates UK medical doctors
    ✓ gov.uk/verifiers — UK government root namespace
```

US chain (practice → state medical board → state government):

```
✓ maplegrovepeds.com/rx/v — Prescribes medication in Illinois
  ✓ idfpr.illinois.gov/medical — Licenses physicians in Illinois
    ✓ illinois.gov — Illinois state government
```

For controlled substances, an additional chain applies: DEA registration (US) or Home Office licensing (UK).

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Compared With the Alternatives

| Feature | Live Verify | PDMP (Prescription Drug Monitoring Program) | Calling the Prescriber | E-Prescribing (EPCS) | Trusting the Paper |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Who can access** | **Anyone with the document.** Patient, pharmacist, customs officer, school nurse. | **Pharmacy-only.** Not accessible to patients, border agents, or schools. | **Anyone.** But requires phone access and cooperation. | **Pharmacy-only.** Closed-loop, pharmacy-to-prescriber. | **Anyone.** No verification at all. |
| **Speed** | **Instant.** 5-second scan. | **Fast** (for pharmacists). Seconds within the system. | **Slow.** Minutes to hours. After-hours impossible. | **Fast** (within the loop). Seconds. | **Instant.** Zero-second "verification." |
| **International use** | **Works.** Domain-based, no system integration needed. | **Fails.** US-only, state-by-state. | **Fails.** Time zones, language barriers, no obligation to respond. | **Fails.** No cross-border interop. | **Fails.** No way to authenticate foreign prescriptions. |
| **Detects forgery** | **Yes.** Hash mismatch = forgery. | **Partial.** Detects doctor shopping but not forged paper. | **Yes** (if you reach the doctor). | **Yes** (within the loop). | **No.** |
| **Detects "FILLED" status** | **Yes.** Status changes on fill. | **Yes.** Core function. | **No.** Doctor may not know. | **Yes.** | **No.** |

**Why this remains strong:** PDMP is powerful but walled off. It exists inside the healthcare system for healthcare professionals. The people who most need to verify prescriptions outside that system — customs officers holding a bag of codeine, school administrators looking at a bottle of Ritalin, sports officials reviewing a TUE claim — have zero access to PDMP. That makes prescriptions a strong complementary case outside the native clinical systems.

## Jurisdictional Witnessing (Optional)

An independent witness layer may apply — see [Witnessing Third Parties](../../docs/WITNESSING-THIRD-PARTIES.md) for the full mechanism (what a witness receives, non-repudiation, optional public-blockchain rollups). For this use case: a witness would receive the prescriber's hashes and status changes plus structured metadata (medication type, schedule classification, prescriber ID, fill dates) — never plaintext such as patient names — providing non-repudiation of writing the prescription.

## Further Derivations

1. **Veterinary prescriptions** — Controlled substances for animals carry the same fraud risks as human prescriptions. Ketamine, tramadol, and gabapentin are all diverted from veterinary channels. A verified veterinary prescription bound to the practice domain (e.g., `parkviewvets.co.uk/rx/v`) confirms the animal, the medication, the dosage, and the prescribing veterinarian.

2. **Therapeutic Use Exemptions (TUE) for athletes** — A TUE is the formal permission for an athlete to use a medication that would otherwise violate anti-doping rules. It's issued by a sport's anti-doping authority based on a verified prescription. A Live Verify chain runs from the prescriber's practice domain through to the anti-doping authority's domain (e.g., `ukad.org.uk/tue/v`), binding the underlying prescription to the exemption. Forged TUEs are a known problem in elite sport — this closes that gap.

## See Also

- [Proof of Insurance (Policyholder Confirmation)](view.html?doc=proof-of-insurance-status) — Another strong portable-claim case for relying parties outside the source system

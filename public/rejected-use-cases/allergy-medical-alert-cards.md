---
title: "Allergy and Medical Alert Cards"
status: "Rejected"
reason: "No fraud incentive; self-attestation sufficient"
slug: "allergy-medical-alert-cards"
---

## Why This Was Considered

Medical alert bracelets/cards communicate critical information to paramedics: allergies, conditions, medications. The idea was to add a `verify:` line so paramedics could confirm the information is authentic.

## Why It Was Rejected

**No fraud incentive.** Who benefits from faking an allergy?

| "Fraud" Scenario | Supposed Benefit | Reality |
|------------------|------------------|---------|
| Fake peanut allergy | Restaurant cooks separately | Mild kitchen inconvenience; no financial gain |
| Fake diabetes | ...? | Why would anyone fake this? |
| Fake penicillin allergy | Doctor prescribes alternative | Patient gets different antibiotic; no gain |

Compare to strong fraud cases where verification matters:

| Use Case | Fraud Incentive |
|----------|-----------------|
| Employment reference | Get job you're not qualified for |
| Insurance endorsement | Drive uninsured, avoid premiums |
| Academic transcript | Fake credentials for job/admission |
| Name change document | Evade debts, criminal record |

**Self-attestation is sufficient.** A bracelet that says "ALLERGIC TO PEANUTS - FIND MY EPIPEN" works. The paramedic doesn't pause to verify—they act. Nobody questions whether the bracelet is "authentic" because there's no benefit to lying.

**No privacy sensitivity.** People share allergy information freely—they tell every waiter, caterer, host, and flight attendant. "I'm allergic to peanuts" is socially equivalent to "I'm vegan." There's no stigma, no discrimination risk, no reason to protect this information. Compare to genuinely sensitive medical information (HIV status, mental health diagnoses) which people disclose selectively and which has legal protections.

**Verification adds nothing:**

| What Paramedic Needs | Bracelet Alone | With OCR-to-Hash |
|---------------------|----------------|------------------|
| Know the allergy | ✓ | ✓ |
| Act immediately | ✓ | Slower (must scan) |
| Trust the info | Yes (why lie?) | Yes (but why verify?) |

**If full medical records are needed**, that's a patient portal, hospital lookup, or MedicAlert phone line—not hash verification. Our endpoints don't echo content back, so verification wouldn't provide additional data anyway.

## Qualifying Criteria Failed

From `public/use-cases/qualifying_criteria.md`:

- **§8 Fraud incentive must exist:** "If there's no meaningful fraud incentive, verification is solving a problem that doesn't exist."

  Nobody benefits from faking an allergy. Self-attestation works.

- **§9 Multi-party utility:** "If a proposed claim only benefits one party, or has only one 3rd party type, question whether it's worth the implementation effort."

  The 3rd party (paramedic) gains nothing from *verification* specifically. They already trust the bracelet because there's no fraud incentive.

- **§4 Revocation is part of trust:** "Strong use cases benefit from revocability."

  Allergies rarely change. There's no meaningful revocation scenario.

- **§5 Privacy model:** The privacy protections of Live Verify (minimal disclosure, no content echo) are irrelevant here—people share allergy information freely. There's nothing to protect.

## The Right Solution

A bracelet. Engraved or printed. No verification needed.

For detailed medical records beyond what fits on a bracelet, use existing systems: patient portals, MedicAlert memberships with phone lookup, hospital EHR access. These are data retrieval systems, not document verification.

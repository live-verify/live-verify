---
title: "Advance Healthcare Directives"
category: "Notary Services"
volume: "Small"
retention: "Permanent (end-of-life care)"
slug: "advance-healthcare-directives"
verificationMode: "clip"
tags: ["advance", "healthcare", "directives", "living", "will", "medical", "power", "attorney"]
furtherDerivations: 1
---

## What is an Advance Directive?

An Advance Healthcare Directive (or Living Will) is a legal document where you tell doctors what to do if you can't speak for yourself (e.g., you are in a coma).

It typically covers:
1.  **The Agent:** "Who decides for me?" (Medical Power of Attorney).
2.  **The Wishes:** "Do I want a ventilator? CPR? Artificial feeding?"

Doctors in the ER need to see this *immediately* to know whether to resuscitate. Paper copies are often lost, locked away, or outdated, leading to unwanted treatments or agonizing delays.

<div style="max-width: 600px; margin: 24px auto; font-family: 'Arial', sans-serif; border: 2px solid #000; background: #fff; padding: 30px;">
  <div style="text-align: center; border-bottom: 2px solid #000; margin-bottom: 20px;">
    <h2 style="margin: 0;"><span verifiable-text="start" data-for="directive"></span>ADVANCE HEALTH CARE DIRECTIVE</h2>
    <div style="font-size: 0.9em; margin-bottom: 10px;">(California Probate Code §4701)</div>
  </div>
<div style="font-size: 0.95em; line-height: 1.5; color: #333;">
    <p><strong>1. POWER OF ATTORNEY FOR HEALTH CARE</strong></p>
    <p>I, <strong>ELEANOR RIGBY</strong> (DOB: 02/14/1950), designate the following individual as my agent to make health care decisions for me:</p>
<p style="margin-left: 20px;"><strong>Agent:</strong> FATHER MCKENZIE<br>
    <strong>Phone:</strong> (555) 867-5309<br>
    <strong>Authority:</strong> Effective immediately upon my incapacity.</p>
<p><strong>2. INSTRUCTIONS FOR HEALTH CARE</strong></p>
    <p>If I am in an irreversible coma or persistent vegetative state:</p>
    <ul style="list-style-type: square;">
      <li>I <strong>DO NOT</strong> want life-sustaining treatment (ventilator, etc.).</li>
      <li>I <strong>DO NOT</strong> want artificial nutrition and hydration.</li>
      <li>I <strong>DO</strong> want treatment for pain relief.</li>
    </ul>
<p><strong>3. SIGNATURES</strong></p>
    <div style="display: flex; justify-content: space-between; margin-top: 20px;">
      <div>
        Executed: <strong>June 15, 2026</strong><br>
        Signature: <em>Eleanor Rigby</em>
      </div>
      <div style="text-align: right;">
        Notary Public: <strong>John Hancock</strong><br>
        Comm #: 1234567
      </div>
    </div>
  </div>
<div data-verify-line="directive" style="border-top: 1px dashed #999; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
      title="Demo only: Registry doesn't yet offer verification&#10;endpoints, so this is illustrative">
      <span data-verify-line="directive">verify:uslivingwillregistry.com/v</span> <span verifiable-text="end" data-for="directive"></span>
  </div>
</div>

## Framing Insights

**Specific consequences (Pattern E):** An ER doctor who ignores a valid DNR and resuscitates a patient subjects them to exactly the suffering they legally chose to avoid — broken ribs from chest compressions, ventilator dependence, prolonged dying in an ICU. An ER doctor who honors a forged or outdated directive and withholds treatment lets a patient die who wanted to live. Both outcomes are catastrophic and both happen because the doctor has no fast way to verify the paper in front of them. The stakes are binary and irreversible: there is no "undo" for either decision.

**"Why would you bother?" (Pattern A):** Family disputes drive directive fraud. An estranged sibling presents an old directive naming themselves as agent, hiding the current one that names someone else. A family member who disagrees with the patient's wishes produces a "revised" directive with different instructions. These are not hypothetical — probate courts see these cases routinely. The question is whether the ER doctor, under time pressure, can distinguish the real directive from the fraudulent one.

## The Problem: Lost Directive

- **Inaccessibility:** The Directive is in a safety deposit box when the patient is in the ER at 2 AM.
- **Outdated Versions:** A family member presents an old directive appointing themselves as agent, hiding the new one that appointed the estranged sibling.
- **Interoperability:** The directive is in the Kaiser Permanente system, but the patient is in a Banner Health ER. The systems don't talk.

## What Is Checked

Patient name, date of birth, designated healthcare agent (proxy) and alternates, specific life-sustaining treatment wishes (DNR/DNI), organ donation preference, notary/witness attestation, date of execution.

**Document Types:**
- **Living Will:** Instructions for end-of-life care.
- **Medical Power of Attorney:** Appointing a decision-maker.
- **POLST/MOLST:** Physician Orders for Life-Sustaining Treatment (bright pink/green forms).
- **DNR Order:** Do Not Resuscitate.

**Privacy Note:** While the directive contains sensitive data, the *hash* reveals nothing until the document is presented. A "Privacy Salt" line should be added to prevent enumeration attacks (guessing patient names).

## What the Checker Sees

Shows the issuer domain (e.g., `uslivingwillregistry.com` or a hospital system) and current status.

**Status Indications:**
- **Active** — This is the latest known directive.
- **Revoked** — The patient cancelled this directive (e.g., made a new one).
- **Superseded** — A newer directive exists (date provided).

## Who Holds It

The Patient benefits from verification.

**Emergency Access:** Carrying a wallet card with the verification URL/hash allows ER doctors to instantly verify and retrieve the directive details, even if the patient is unconscious and the paper document is at home.

**Family Clarity:** Resolving disputes between family members about "what Mom wanted." A verified document provides definitive proof of her wishes.

**Portability:** Ensuring wishes are honored even if the patient falls ill while traveling in another state (portability of directives).

## Who Checks It

**Emergency Room Doctors**
**Immediate Decisions:** In critical moments (stroke/trauma), doctors hesitate to withhold care based on a crumpled photocopy or a family member's word. A verified "Active" status gives them the legal confidence to honor a DNR/DNI order immediately.

**Hospitals and Surgery Centers**
**Admission Compliance:** Hospitals must ask about advance directives (Patient Self-Determination Act). Verification simplifies this workflow.

**Estate Attorneys**
**Drafting Integrity:** Ensuring the directive they drafted is the one being used, and that no "home-made" modifications were added later.

## Who Issues It

**Issuer Types** (First Party)

**National Registries:** (e.g., U.S. Living Will Registry)
**Healthcare Systems:** (Epic MyChart, etc.)
**Secretary of State Offices:** (Some states maintain directive registries)

## Authority Chain
    
**Pattern:** Regulated

Solicitors draft and certify healthcare directives under mental capacity law.

```
✓ solicitors.example-firm.co.uk/ahd/verify — Drafts and certifies healthcare decisions
  ✓ sra.org.uk/solicitors — Regulates solicitors in England and Wales
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Where Each Fits: Live Verify and Health Information Exchanges

A health information exchange (HIE) shares patient records, which can include advance directives, between hospitals and providers that belong to it. Coverage depends on where the patient is: some regions and health systems share records well, others only within one vendor's network, and many places have no exchange at all. An exchange and Live Verify answer different questions and work side by side: the exchange brings the directive into the clinical record, while Live Verify lets staff check a paper copy or card that arrives with the patient.

| | Health information exchange | Live Verify on the directive | Wallet card or USB stick |
| :--- | :--- | :--- | :--- |
| **Who can check** | Clinicians at hospitals connected to the same exchange or network. | Anyone handed the directive: emergency staff, a care home, a hospital in another state or country. | Whoever finds the card or stick. |
| **What the checker gets** | The directive inside the patient's clinical record, alongside other trusted data. | Confirmation that the registry or notary stands behind this exact text, and whether it has since been revoked. | A card or file that may be out of date or not genuine. |
| **What the patient shares** | Records available across the network, subject to its consent rules. | Only the directive they or their family chose to hand over. | The card or file. |
| **Reach** | Only within the exchange's network; it can fail across state lines or between vendors. | Global in principle: any registry or notary that publishes hashes on its own domain. | Wherever the patient carries it, though hospitals often block USB sticks. |
| **Speed and cost** | Fast once connected; querying outside records can take time, and joining an exchange takes integration work. | A few seconds per check: one web lookup, with no fee to the standard and no integration with the issuer. | Immediate. |
| **What it needs** | Both hospitals on the same exchange, and the directive uploaded to it. | The registry or notary to publish hashes, and Live Verify-aware software on the checker's device. No registry does this yet. | The patient to carry it. |
| **Best suited to** | Hospitals inside the patient's usual care network. | Paper directives brought in by family, and hospitals outside the network. | A reminder that a directive exists. |

**Where each fits:** where the treating hospital and the patient's usual provider share a health information exchange, the exchange is the better source, because it delivers the directive inside the clinical record. Directives also arrive as paper carried by family, or as a wallet card, at hospitals outside that network or in another state. Live Verify lets staff there check the paper against the registry or notary that issued it, including whether it has since been revoked, without any integration, provided they have software that honours it. It complements the exchange rather than replacing it.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).

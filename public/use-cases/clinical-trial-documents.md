---
title: "Clinical Trial Enrollment and Consent Documents"
category: "Scientific & Research"
volume: "Very Small (per trial, thousands globally)"
retention: "25-30 years (FDA regulatory requirement)"
slug: "clinical-trial-documents"
verificationMode: "clip"
tags: ["clinical-trial", "informed-consent", "fda", "research-ethics", "patient-privacy", "gcp-compliance"]
furtherDerivations: 1
---

## What is an Informed Consent Form?

Before a patient can participate in a high-stakes clinical trial (like testing a new cancer drug), they must sign an Informed Consent Form (ICF).

This isn't just a signature; it's a legal and ethical requirement that proves the patient understands the risks.

In pharmaceutical research, "Consent Fraud" is a serious crime. Sites sometimes "Backdate" these forms to hide that they started testing before the patient signed, or they use an outdated version of the form that lacks new safety warnings. Verified hashes ensure the patient and the FDA are looking at the exact, current version of the truth.

<div style="max-width: 600px; margin: 24px auto; font-family: 'Helvetica', Arial, sans-serif; border: 1px solid #ccc; background: #fff; padding: 40px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <div style="text-align: left; margin-bottom: 30px; border-bottom: 2px solid #004d40; padding-bottom: 10px;">
    <div style="font-weight: bold; font-size: 1.2em; color: #004d40;"><span verifiable-text="start" data-for="clinic"></span>MAYO CLINIC - DEPARTMENT OF ONCOLOGY</div>
    <div style="font-size: 0.85em; color: #666;">Institutional Review Board Approved (v.4.2)</div>
  </div>
<h2 style="text-align: center; text-transform: uppercase; letter-spacing: 1px; color: #004d40;">Informed Consent Form</h2>
<div style="font-size: 0.95em; line-height: 1.6; color: #333; text-align: justify;">
    <p><strong>Trial Title:</strong> Phase III Study of Compound X in Metastatic Melanoma<br>
    <strong>NCT Number:</strong> NCT09988776<br>
    <strong>Protocol ID:</strong> MC-2026-0492</p>
<p>I, <strong>PARTICIPANT ID: 9988-SJ</strong>, have been informed of the risks and benefits of this study. I voluntarily agree to participate and understand that I may withdraw at any time.</p>
<div style="margin: 20px 0; border: 1px solid #004d40; padding: 15px; background: #f1f8e9;">
      <strong>CONSENT SIGNATURE:</strong><br>
      Date: March 15, 2026<br>
      Investigator: Dr. Stephen Strange
    </div>
  </div>
<div data-verify-line="clinic" style="border-top: 1px dashed #999; margin-top: 40px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
      title="Demo only: Mayo Clinic doesn't yet offer verification&#10;endpoints, so this is illustrative">
      <span data-verify-line="clinic">verify:mayoclinic.org/research/v</span> <span verifiable-text="end" data-for="clinic"></span>
  </div>
</div>

## The Problem: Paper Integrity

- **Backdating Consent:** Sites "dating" a consent form to yesterday to cover up that they started trial procedures before the patient actually signed.
- **Wrong Versioning:** Using a 2024 consent form in 2026, missing critical new safety warnings.
- **Fabricated Participants:** Creating "Ghost Participants" to collect site fees from the sponsor.

## What Is Checked

Participant ID (coded/pseudonymized), trial NCT/Protocol number, Informed Consent Form (ICF) version number, date of consent, investigator name, site location, HIPAA authorization status, withdrawal status.

**Document Types:**
- **Informed Consent Form (ICF):** The primary legal/ethical contract.
- **Assent Form:** For pediatric participants.
- **Re-Consent Notice:** For protocol amendments.
- **Participant ID Card:** For emergency medical reference.

## What the Checker Sees

Shows the issuer domain (`mayoclinic.org`, `pfizer.com`) and current enrollment status.

**Status Indications:**
- **Enrolled** — Consent is active and verified.
- **Superseded** — A newer ICF version has been released; participant needs re-consent.
- **Withdrawn** — Participant has exited the study.
- **Screen Failed** — Participant consented but was ineligible.

## Participant ID Card Design

The Participant ID Card is distinct from the Informed Consent Form. While the ICF is a multi-page legal document kept in files, the ID card is a portable token the participant carries for emergencies.

**Physical Form Factor:**
- Laminated card or molded plastic on a lanyard
- Worn under clothing for privacy (not visible like a medical alert bracelet)
- Written once at enrollment, valid for trial duration (potentially 3+ years)
- No battery, no app required to carry
- Survives pocket wear, washing machines, and daily life

**Privacy Salt:** The card text includes a salt (the participant ID itself, or a random string) so the hash cannot be reversed. Rainbow tables cannot enumerate "who is in the Compound X trial" from observed hashes.

**Why Not QR Code?**

A QR code seems faster to scan, but consider the real-world scenario: a trial run by UC (California) and a participant who ends up in a South Carolina ER with zero system integration between the two.

| QR Contains | What SC Hospital Can Do |
|-------------|------------------------|
| URL to UC's internal system | Nothing—no login credentials, access denied |
| Static embedded data (NCT#, drug name) | Read it, but cannot verify authenticity |
| Cryptographically signed token | Nothing—no shared PKI, can't verify signature |
| Public verification URL | Works—but this is just Live Verify with a different barcode |
| Phone number | Call someone and wait on hold |

**The uncomfortable truth:** QR codes assume system integration that doesn't exist in the fragmented US healthcare landscape. A QR pointing to UC's clinical trial management system is useless to a South Carolina hospital with no federation agreement.

Live Verify with a public verification endpoint (`verify:ucsf.edu/trials/v`) handles this correctly:
- No integration required between health systems
- The domain (ucsf.edu) is the trust anchor
- Anyone with internet access can verify
- Works across state lines, EHR vendors, and health system boundaries

QR could encode that same public URL—but then it's just Live Verify with a different encoding. The verification model is identical; only the scanning speed differs.

## Who Holds It

The Trial Participant benefits from verification.

**Emergency Care and EMTALA Context**

In the US, EMTALA (Emergency Medical Treatment and Labor Act) requires hospitals to provide stabilizing treatment regardless of ability to pay. Financial discussions happen *after* treatment. So clinical trial verification in an ER is not about billing—it's about patient safety.

When a trial participant is rushed to an out-of-network ER, the medical team needs to know:
- Is this person in a clinical trial?
- What experimental compound are they receiving?
- What drug-drug interactions must we avoid?
- Should we contact the trial investigator before administering certain treatments?

This is genuinely urgent. The "pressure" to contact the trial team isn't financial—it's clinical. "Is this experimental immunotherapy contraindicated with the sedative I'm about to give?"

The Participant ID card enables this: scan → verify → see trial details → contact investigator if needed.

**Personal Portability:** Allowing the participant to carry a "Verified Proof of Enrollment" to other specialist visits, ensuring their full care team is aware of their experimental status.

## Who Checks It

**FDA / Regulatory Auditors**
**GCP Compliance:** During a "Good Clinical Practice" (GCP) audit, inspectors can instantly verify that the paper consent forms in the Trial Master File match the digital logs at the sponsor. This prevents "Post-Hoc Consent" where sites fabricate paperwork after an audit is announced.

**Hospitals / ER Staff**
**Concomitant Meds:** Verifying the "Safety Exclusion List" for a trial participant before prescribing emergency medications.

**Trial Sponsors (Big Pharma)**
**Site Monitoring:** Remote monitors can verify that sites are using the correct, latest version of the ICF by scanning the verification hashes of uploaded site documents.

## Who Issues It

**Issuer Types** (First Party)

**Medical Centers:** (Mayo Clinic, Johns Hopkins).
**Pharma Sponsors:** (Pfizer, Moderna, Merck).
**CROs:** (IQVIA, PPD).

**Privacy Salt:** ABSOLUTELY CRITICAL. Patient data is highly protected (GDPR/HIPAA). The hash MUST use a high-entropy salt to prevent re-identification of participants.

## Authority Chain

**Pattern:** Regulated

Clinical trial sponsors and research institutions issue consent forms under healthcare regulator authority (MHRA in the UK).

```
✓ trials.nihr.ac.uk/consent/verify — Issues informed consent forms for clinical trials
  ✓ mhra.gov.uk — Regulates UK medicines and medical devices
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Interaction Reporting (POST-Only Form)

After successful verification, the endpoint can return a POST-only form for the verifying party to report the interaction. This enables the trial team to track encounters without exposing participant data.

**Example Response:**
```
HTTP 200 OK

Status: ENROLLED
Trial: Phase III Study of Compound X (NCT09988776)
Compound: Investigational immunotherapy
Emergency Contact: 415-555-0199 (24hr trial hotline)

--- Report This Encounter (Optional) ---
POST to: https://ucsf.edu/trials/report/9988-SJ

Fields requested by trial team:
- Your institution name
- Contact phone/email
- Medications administered
- Procedures performed
- Adverse events observed (if any)
- Request callback from investigator? [Y/N]
```

**Design Principles:**
- **POST only:** No GET endpoint to enumerate participants or retrieve medical histories
- **No patient list exposed:** The form URL includes only this participant's pseudonymized ID
- **Voluntary:** Reporting is optional but encouraged for safety signal detection
- **Trial-specific fields:** Each trial customizes what information they need

**What This Enables:**
- **Drug-drug interaction tracking:** Trial team learns what concomitant medications were given
- **Safety signal aggregation:** If multiple participants report similar adverse events at outside hospitals, trial team can detect patterns
- **Chargeback/reimbursement initiation:** Many trial sponsors agree to cover costs of emergency care related to trial participation; the POST form begins that documentation
- **Protocol deviation awareness:** Trial team knows when participants received off-protocol treatments

**The Authentication Gap**

This architecture has an inherent weakness: anyone who sees the card can submit a report. The system authenticates the *document*, not the *reporter*.

| Actor | Can Scan Card | Can Submit Report | Legitimate? |
|-------|---------------|-------------------|-------------|
| SC ER physician | Yes | Yes | Yes |
| Participant's spouse | Yes | Yes | Probably |
| Drunk roommate | Yes | Yes | No |
| Curious coworker | Yes | Yes | No |
| Malicious actor | Yes | Yes | No |

**Why This Tradeoff Exists:** In an emergency, you want the barrier to reporting to be *low*. Requiring complex authentication would slow down legitimate reports. But low barriers mean abuse is possible.

**Mitigations (All Imperfect):**

| Approach | Limitation |
|----------|------------|
| Require NPI/DEA number | Can be guessed, stolen, or found online |
| IP geolocation filtering | Hospital WiFi isn't magic; VPNs exist |
| CAPTCHA | Stops bots, not determined humans |
| Rate limiting | Legitimate ER might need multiple reports |
| Callback verification | Adds delay to urgent scenarios |
| SMS confirmation to participant | They might be unconscious |

**Practical Defenses:**
1. **Audit trail visibility:** Every POST is logged with metadata. Patterns emerge. "47 reports from same IP, all gibberish" → flag and block.
2. **Human triage:** Reports go to trial coordinators who assess plausibility before escalating. "Report from 'Deez Hospital' claiming 47 liters of saline" → discard.
3. **Chargeback requires real documentation:** The POST form *initiates* a claim, but actual reimbursement requires billing codes, provider credentials, and institutional verification.
4. **Social cost:** If a roommate submits junk reports, the *participant* gets calls from the trial team asking about their "emergency." They'll secure their card.

The system accepts some noise in exchange for low friction on legitimate safety-critical reports.

## Merkleized Interaction History

For trial investors (pharma sponsors, VCs) and regulatory adjudicators (FDA, IRBs), a cryptographic audit trail of participant interactions provides stronger guarantees than logs alone.

**The Problem:** Trial sites have historically hidden adverse events, backdated reports, or "lost" inconvenient documentation. Simple database logs can be edited.

**The Solution:** A Merkle tree of interaction hashes, periodically anchored to an immutable timestamp.

```
Interaction #1 (hash) ─┐
                       ├─ Combined hash ─┐
Interaction #2 (hash) ─┘                 │
                                         ├─ Root hash → Anchored March 15, 2026
Interaction #3 (hash) ─┐                 │
                       ├─ Combined hash ─┘
Interaction #4 (hash) ─┘
```

**What This Proves:**
- "This interaction hash is provably included in the root that was anchored on March 15, 2026"
- "Therefore this interaction existed *before* March 15, 2026"
- "The trial site cannot claim this adverse event 'wasn't reported until later'"

**Anchoring Options:**
- **Witnessing firm ledger:** Third-party timestamp authority
- **Public blockchain:** Periodic rollup commitment (cheap, immutable)
- **Newspaper publication:** Old-school but legally recognized

**Value for Stakeholders:**
- **FDA auditors:** Can verify that adverse event reports weren't backdated after an inspection was announced
- **Trial sponsors:** Can prove to regulators that their safety monitoring was timely
- **Investors:** Can verify trial integrity before committing capital
- **Plaintiffs' attorneys:** Can prove (or disprove) that safety signals were known before a drug went to market

This extends the witnessing model from *consent documents* to *the entire interaction history* of the trial.

## Where Each Fits: Live Verify and eConsent Platforms

eConsent platforms, such as Medidata's, let sponsors and trial sites present, sign and store consent forms electronically, with version control and an audit trail held in the vendor's system. Many sites still consent on paper, and some put a QR code on the form. These answer different questions from Live Verify and work side by side with it.

| | eConsent platform | QR code on the form | Live Verify on the consent form or card | Paper consent form |
| :--- | :--- | :--- | :--- | :--- |
| **Who can check** | Sponsor, site and monitor staff with access to the vendor's system. | Anyone who scans it, though a link into the issuer's system usually needs a login. | Anyone handed the form or card: the participant, a monitor, an emergency department in another health system. | Whoever holds it, trusting it as it stands. |
| **What the checker gets** | The full consent record, versions and signatures, with an audit trail. | Whatever the code holds: static data that cannot be checked, or a link that may not open for outsiders. | Confirmation that the hospital or sponsor stands behind this exact text and version, as at its date, and whether that version has been superseded. | Readable text with no way to confirm which version it is. |
| **What the participant shares** | Their data, held in the vendor's cloud. | Only the form. | Only the form or card they choose to show. | Only the form. |
| **Reach** | Sites and sponsors using that platform. | Depends on what the code points to. | Global in principle: any hospital or sponsor, in any country, that publishes hashes on its own domain. | Universal, but untrusted. |
| **Speed and cost** | Fast for authorized users; licenses and site setup come first. | Quick to scan. | A few seconds per check: one web lookup, with no fee to the standard. Needs a data connection at the moment of the check. | Free and immediate. |
| **What it needs** | A platform license and trained site staff. | A code generator and, for links, a system that outsiders can reach. | The hospital or sponsor to publish hashes, and Live Verify-aware software on the checker's device. No hospital or sponsor does this yet. | Nothing. |
| **Best suited to** | Sites that run consent electronically end to end. | Pointing to further information. | Paper sites, and checks by people outside the trial's own systems. | Sites with no other option. |

**Where each fits:** eConsent platforms give sponsors and sites an integrated record, and where a site uses one it remains the system of record. Many sites still consent on paper, because of local rules or limited infrastructure, and a participant or monitor may have no access to the vendor's system. Live Verify lets them confirm that the hospital or sponsor stands behind that version of the form, so paper sites and eConsent sites can be audited to a similar standard.

**The No-Integration Reality:** US healthcare is fragmented. A QR code pointing to UC San Francisco's clinical trial system is useless to a South Carolina ER with no federation agreement, no login credentials, and no shared PKI. Live Verify with a *public* verification endpoint works across health system boundaries because the trust anchor is the domain itself, not a shared backend.

### This Protects Both Sides

The participant needs to know they signed the current version of the consent form — the one that includes the newly discovered cardiac side effect, not the version from three months ago that omitted it. The research institution needs proof that the participant received the correct version, because if an adverse event occurs and the consent form version is disputed, the institution faces regulatory sanctions, litigation, and reputational damage. Both sides benefit from an independently verifiable record. The participant can scan their copy and confirm it matches what the institution filed with the IRB. The institution can demonstrate, years later during an FDA audit, that the consent form the participant held was genuinely version 4.2 and not a printout of version 3.1.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).

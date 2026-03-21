---
title: "First Aid Certificate Status"
category: "Professional & Educational Qualifications"
volume: "Large"
retention: "Duration of certificate validity (typically 3 years)"
slug: "first-aid-certificate-status"
verificationMode: "clip"
tags: ["first-aid", "workplace-safety", "childcare", "sports-coaching", "outdoor-activities", "qualification-currency", "expiry", "training-provider", "st-john-ambulance", "red-cross"]
furtherDerivations: 1
---

## What is a First Aid Certificate Status Confirmation?

First aid certificates are time-limited qualifications, typically valid for three years from the date of assessment. They are required across a wide range of settings: workplaces (where legislation mandates appointed first aiders), childcare and early years settings, sports coaching, outdoor activity centres, schools, and events.

The core question is narrow: **is this person's first aid qualification current?**

Currently, first aid qualifications are evidenced by a paper certificate or a PDF issued by the training provider. These are trivially fabricated. An employer, event organiser, or regulator wanting to confirm that a first aider's qualification is genuine and current has no standardised verification channel. They must either trust the document at face value or contact the training provider directly.

A **First Aid Certificate Status Confirmation** is a verifiable claim issued by the training provider confirming that a specific certificate is current. It contains the certificate reference, qualification type, status, issue date, and expiry date.

### Training Providers by Jurisdiction

| Jurisdiction | Major Providers |
| :--- | :--- |
| **UK** | St John Ambulance, British Red Cross, various HSE-approved providers |
| **Australia** | St John Ambulance Australia, Australian Red Cross, various RTOs |
| **New Zealand** | St John New Zealand, New Zealand Red Cross |
| **Canada** | St John Ambulance Canada, Canadian Red Cross |
| **US** | American Red Cross, American Heart Association, National Safety Council |
| **International** | Red Cross / Red Crescent national societies operate in most countries |

The example below uses St John Ambulance (UK) as the primary illustration. The pattern applies identically to any training provider that issues first aid certificates.

## First Aid Certificate Status

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #1a5f2a; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <span verifiable-text="start" data-for="firstaidstatus"></span>
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;">FIRST AID CERTIFICATE STATUS
═══════════════════════════════════════════════════════════════════

Provider:      St John Ambulance
Certificate:   SJA-2026-441882
Qualification: First Aid at Work (3-day)
Status:        CURRENT
Issued:        15 Mar 2024
Expires:       15 Mar 2027

<span data-verify-line="firstaidstatus">verify:sja.org.uk/certificates/v</span></pre>
  <span verifiable-text="end" data-for="firstaidstatus"></span>
</div>

## Expired Certificate

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #7a1f1f; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;">FIRST AID CERTIFICATE STATUS
═══════════════════════════════════════════════════════════════════

Provider:      St John Ambulance
Certificate:   SJA-2026-441882
Qualification: First Aid at Work (3-day)
Status:        EXPIRED
Issued:        15 Mar 2021
Expired:       15 Mar 2024

verify:sja.org.uk/certificates/v
</pre>
</div>

## Data Verified

Certificate reference, training provider, qualification type, status (current or expired), issue date, and expiry date.

**Document Types:**
- **First Aid Certificate Status Confirmation**

**What is deliberately NOT included:**

- the certificate holder's name
- date of birth
- home address
- assessment scores or grades
- the employer or organisation that funded the training
- medical information

The certificate holder's identity is established separately. The verifiable claim confirms the qualification status, not the identity.

This artifact confirms that a certificate reference is current with the training provider. It does not by itself confirm that the person presenting it is the certificate holder — the holder's name is deliberately excluded for privacy. The employer or inspector must separately verify identity (by checking the person's ID against the certificate holder's name on record with the provider). The artifact proves currency; the identity-matching step proves attribution.

## Data Visible After Verification

Shows the training provider's domain and the current certificate status.

**Status Indications:**
- **Current** — The certificate is within its validity period
- **Expired** — The certificate has passed its expiry date; requalification is required
- **Revoked** — The training provider has withdrawn the certificate
- **404** — No matching certificate record exists

## Second-Party Use

The **certificate holder** benefits directly.

**Proactive sharing:** A first aider can demonstrate that their qualification is current without waiting for an employer or event organiser to contact the training provider. This is useful when applying to multiple employers, registering with agencies, or volunteering at events.

**Portability between roles:** Many first aiders hold qualifications across multiple settings — their day job, a sports coaching role, and occasional event volunteering. A verifiable status confirmation lets them prove currency in each setting without carrying the original certificate.

**Faster onboarding:** For roles where first aid qualification is a legal or contractual requirement, the delay between offer and start can be driven by credential verification. A verifiable status confirmation removes that friction.

## Third-Party Use

**Employers**

**Legal compliance:** Workplace health and safety legislation in most jurisdictions requires employers to ensure their appointed first aiders hold current qualifications. A verifiable status confirmation provides evidence that the employer checked, and that the qualification was current at the time of checking.

**Childcare and Care Settings**

**Regulatory requirements:** Ofsted (UK), state licensing bodies (US/AU), and equivalent regulators require childcare settings and care homes to maintain staff with current first aid qualifications. Inspectors can verify status directly rather than relying on photocopies of certificates.

**Sports Governing Bodies**

**Coaching requirements:** Many sports governing bodies require coaches to hold current first aid qualifications as a condition of their coaching licence. A verifiable status confirmation integrates with existing licence renewal processes.

**Outdoor Activity Centres**

**Activity licensing:** Centres offering adventure activities (climbing, kayaking, hillwalking) are often required to demonstrate that staff hold current first aid qualifications. Licensing inspectors can verify status directly.

**Event Organisers**

**Duty of care:** Events requiring on-site first aid cover need to confirm that volunteer or contracted first aiders are currently qualified. A verifiable status confirmation is more reliable than requesting certificate scans by email.

**Recruitment Agencies**

**Placement verification:** Agencies placing workers into roles requiring first aid qualifications (schools, care homes, construction sites) can verify status for each placement without contacting training providers individually.

## Verification Architecture

**The Gap Between Certificate and Status**

First aid training providers currently issue certificates as paper documents or PDFs. Some providers offer online lookup tools, but these vary in quality and availability. There is no standardised, machine-verifiable way for a third party to confirm that a specific certificate is current.

The gap is straightforward:

- The certificate is a document that can be photocopied, edited, or fabricated.
- Online lookup tools, where they exist, are provider-specific and require manual navigation.
- An employer collecting certificate scans has no way to confirm authenticity without contacting the provider.
- A first aider moving between roles must repeatedly produce the same document with no way to prove it is still valid.

This use case provides a verifiable, provider-issued status confirmation that closes the gap between holding a certificate and proving it is current.

## Privacy Salt

Not required. First aid certificate status is not sensitive personal data in the way that criminal record status or medical records are. The verifiable claim contains only a certificate reference and its status. No personal details appear in the claim. A salt could be added if the training provider or certificate holder preferred it, but it is not necessary for the basic use case.

## Competition vs. Current Practice

| Feature | Verifiable Status Confirmation | Paper/PDF Certificate | Provider Online Lookup | Phone/Email to Provider |
| :--- | :--- | :--- | :--- | :--- |
| **Proves qualification is current** | **Yes.** | **No.** Point-in-time only. | **Yes.** Where available. | **Yes.** But slow. |
| **Holder can share proactively** | **Yes.** | **Yes.** But unverifiable. | **No.** Third party must check. | **No.** Third party must contact. |
| **Machine-verifiable** | **Yes.** | **No.** | **No.** Manual web lookup. | **No.** |
| **Works across providers** | **Yes.** Each provider issues via their own domain. | **No.** Format varies. | **Partial.** Provider-specific. | **Yes.** But no standard process. |
| **Resistant to fabrication** | **Yes.** | **No.** Trivially fabricated. | **Yes.** | **Yes.** |

**Practical conclusion:** most first aid certificate verification today relies on trusting a paper or PDF document, or on manual contact with the training provider. A verifiable status confirmation would give training providers a standardised way to let their certificate holders prove currency, and give employers and regulators a reliable way to check it.

## Authority Chain

**Pattern:** Training Provider / Accredited Organisation

```
✓ sja.org.uk/certificates/v — St John Ambulance certificate status
  ✓ sja.org.uk/verifiers — St John Ambulance root namespace
```

Other providers would operate their own verification endpoints:

```
✓ redcross.org.uk/certificates/v — British Red Cross
✓ stjohn.org.au/certificates/v — St John Ambulance Australia
✓ redcross.org/certificates/v — American Red Cross
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Further Derivations

None yet.

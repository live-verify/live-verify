---
title: "H-1B Visa Fraud Documents"
category: "Immigration & Visa Documents"
type: "use-case"
volume: "Large"
retention: "Petition validity + 7 years (USCIS retention schedule)"
slug: "h1b-visa-fraud-documents"
verificationMode: "clip"
tags: ["h1b", "visa-fraud", "body-shop", "bench-company", "client-letter", "lca", "labor-condition-application", "experience-letter", "it-certification", "immigration", "uscis", "dol", "staffing"]
furtherDerivations: 3
---

## The H-1B Fraud Problem

The H-1B visa program is built on paper. Every stage — the employer's petition, the worker's credentials, the client's engagement confirmation — rests on documents that anyone with a PDF editor can fabricate. The fraud isn't hypothetical: USCIS refers thousands of cases annually to DOJ, and entire business models (bench companies, body shops) exist primarily to exploit verification gaps in the process.

Live Verify can't fix immigration policy. But it can make four categories of H-1B document fraud detectable at the point of submission, rather than years later during an investigation.

This page covers the document types most commonly forged in H-1B fraud. For government-issued H-1B documents (I-797 approval notices, EAD cards, visa stamps), see the existing use cases: [Visa Extensions](visa-extension-change-of-status), [Employment Authorization](employment-authorization-ead), [Passports & Visas](passports-visa-documents). For foreign degree verification, see [Foreign Credential Evaluations](foreign-credential-evaluations).

---

## 1. Client Engagement Letters

### What is a Client Engagement Letter?

You run a staffing company. You file an H-1B petition for a software engineer, claiming they'll work at JPMorgan Chase in Manhattan at $140,000/year. USCIS requires a letter from JPMorgan confirming the engagement — the role, the duration, the worksite. You produce one on JPMorgan letterhead.

JPMorgan never wrote that letter. They've never heard of your company. The letterhead was downloaded from a Google image search. The "VP of Technology" who signed it doesn't exist.

This is the linchpin of body-shop fraud. Bench companies file hundreds of H-1B petitions backed by fabricated client letters, then "bench" workers without pay until a real client materializes. The end-client has every reason to participate in verification — they don't want their name on forged letters, and they don't want USCIS investigators showing up asking about engagements that never existed.

<div style="max-width: 620px; margin: 24px auto; font-family: 'Georgia', serif; border: 1px solid #ccc; background: #fff; padding: 40px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px;">
    <div>
      <div style="font-family: sans-serif; font-weight: bold; font-size: 1.4em; color: #003a70;"><span verifiable-text="start" data-for="clientletter"></span>JPMorgan Chase</div>
      <div style="font-family: sans-serif; font-size: 0.75em; color: #666;">Corporate & Investment Bank</div>
    </div>
    <div style="font-family: sans-serif; font-size: 0.8em; color: #555; text-align: right;">
      383 Madison Avenue<br>
      New York, NY 10179
    </div>
  </div>

  <div style="font-size: 0.9em; color: #555; margin-bottom: 20px;">March 3, 2026</div>

  <div style="font-size: 0.95em; line-height: 1.8; color: #333; margin-bottom: 20px;">
    <p style="margin: 0 0 15px 0;">To Whom It May Concern,</p>
    <p style="margin: 0 0 15px 0;">This letter confirms that JPMorgan Chase & Co. has engaged <strong>Pinnacle IT Solutions LLC</strong> to provide technology consulting services under Master Service Agreement <strong>MSA-2025-4891</strong>.</p>
  </div>

  <div style="font-family: sans-serif; font-size: 0.9em; line-height: 1.9; color: #333; margin-bottom: 20px; padding: 15px; background: #f5f7fa; border-radius: 4px;">
    <p style="margin: 0;"><strong>Consultant:</strong> Rajesh Kumar Patel</p>
    <p style="margin: 0;"><strong>Role:</strong> Senior Java Developer</p>
    <p style="margin: 0;"><strong>Engagement Period:</strong> April 1, 2026 – March 31, 2029</p>
    <p style="margin: 0;"><strong>Work Location:</strong> 383 Madison Avenue, New York, NY 10179</p>
    <p style="margin: 0;"><strong>Reporting To:</strong> Michael Torres, VP Technology</p>
  </div>

  <div style="font-size: 0.9em; line-height: 1.7; color: #333; margin-bottom: 20px;">
    <p style="margin: 0;">This engagement requires specialized knowledge in distributed systems architecture and is consistent with a specialty occupation under USCIS guidelines.</p>
  </div>

  <div style="margin-bottom: 20px;">
    <div style="font-style: italic; color: #555; font-size: 1em;">Sarah Mitchell</div>
    <div style="font-family: sans-serif; font-size: 0.8em; color: #666;">Sarah Mitchell<br>VP, Vendor Management<br>JPMorgan Chase & Co.</div>
  </div>

  <hr style="border: none; border-top: 1px dashed #999; margin: 15px 0 8px 0;">
  <div data-verify-line="clientletter" style="font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
    title="Demo only: JPMorgan doesn't yet offer verification&#10;endpoints, so this is illustrative">
    <span data-verify-line="clientletter">verify:procurement.jpmorgan.com/engagements</span> <span verifiable-text="end" data-for="clientletter"></span>
  </div>
</div>

### Data Verified

Client company name, MSA/SOW reference number, staffing company name, consultant name, role title, engagement period (start/end), work location, reporting manager, specialty occupation statement.

NOT included: billing rates, contract value, internal project codes.

### Verification Response

- **CONFIRMED** — JPMorgan issued this engagement confirmation for this consultant
- **ENDED** — Engagement concluded (early termination or project completion)
- **SUSPENDED** — Engagement paused (e.g., project hold, performance issue)
- **404** — No matching record. JPMorgan never issued this letter.

The 404 is the whole point. A bench company filing a petition with a fabricated JPMorgan letter gets caught at submission, not during a site visit months later.

### Why End-Clients Would Participate

The end-client isn't doing charity. They participate because:
- **Liability protection:** Forged letters in their name create legal exposure. If USCIS investigates a fraudulent petition citing "JPMorgan," JPMorgan gets pulled into it.
- **Vendor management:** They already track which staffing firms and consultants are engaged. Hashing the engagement letter is a trivial addition to existing procurement workflows.
- **Regulatory pressure:** Under a verification regime, USCIS could require client letters to carry a `verify:` line — making non-participation a red flag.

---

## 2. Certified Labor Condition Applications (LCA)

### What is an LCA?

Before filing an H-1B petition, the employer must file a **Labor Condition Application (ETA-9035)** with the Department of Labor. The LCA states the job title, worksite, prevailing wage, and the wage the employer will actually pay. DOL certifies the LCA — usually within 7 days — and the certified LCA is then included in the H-1B petition filed with USCIS.

The fraud: employers file an LCA stating $140,000/year for a "Senior Software Engineer" in Manhattan, then actually pay the worker $80,000 and pocket the difference. Or they file the LCA listing their own office as the worksite, then deploy the worker to a client site in a different metro area with a different (higher) prevailing wage. The worker can't easily verify what the employer filed, and USCIS can't easily verify that the LCA matches reality.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.82em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="lca"></span>U.S. DEPARTMENT OF LABOR
EMPLOYMENT AND TRAINING ADMINISTRATION
═══════════════════════════════════════════════════════════════════
CERTIFIED LABOR CONDITION APPLICATION (ETA-9035)

Case Number:      I-200-26055-382991
Certified Date:   February 28, 2026
Employer:         PINNACLE IT SOLUTIONS LLC
EIN:              82-4419337

Job Title:        Senior Java Developer
SOC Code:         15-1252 (Software Developers)
Full-Time:        YES

Worksite:         383 Madison Avenue, New York, NY 10179
Wage:             $142,000/year
Prevailing Wage:  $138,500/year (Level 2, NYC metro)
Wage Source:      OES/OFLC Online Data Center

Period:           04/01/2026 – 03/31/2029

<span data-verify-line="lca">verify:lcaverify.dol.gov/v</span> <span verifiable-text="end" data-for="lca"></span></pre>
</div>

### Data Verified

Case number, certified date, employer name, EIN, job title, SOC code, full/part-time, worksite address, offered wage, prevailing wage level, wage source, validity period.

### Verification Response

- **CERTIFIED** — DOL certified this LCA with these terms
- **WITHDRAWN** — Employer withdrew the LCA (e.g., petition not filed, position cancelled)
- **REVOKED** — DOL revoked certification (fraud finding, investigation outcome)
- **EXPIRED** — Validity period ended
- **404** — No matching record (fabricated LCA number, or OCR error)

### Why This Matters for Workers

H-1B workers are structurally vulnerable. Their immigration status is tied to their employer, which creates a power imbalance that dishonest employers exploit. If the worker could scan their own LCA and confirm "my employer actually filed for $142,000 at this worksite" — and compare that against their paycheck — wage fraud becomes immediately detectable rather than discovered years later during a DOL investigation.

### Cross-Verification with Client Letters

An LCA stating "worksite: 383 Madison Avenue, New York" should match a client engagement letter from JPMorgan at 383 Madison Avenue. If the LCA says "worksite: 100 Main Street, Edison, NJ" (the staffing company's strip-mall office) but the worker is actually deployed to JPMorgan in Manhattan, the mismatch is visible to anyone who scans both documents.

---

## 3. Experience Letters from Overseas Employers

### What is an Experience Letter?

The H-1B requires a "specialty occupation" — typically meaning a bachelor's degree plus relevant experience. To prove experience, applicants submit letters from prior employers stating their job title, responsibilities, and dates of employment. When the prior employer is in India, China, the Philippines, or elsewhere abroad, USCIS has almost no way to verify the letter is genuine.

The letters are trivially forged. Company letterhead is downloadable. Phone numbers on the letters ring through to the applicant's friend. The "HR Manager" who signed the letter is the applicant's cousin. Entire cottage industries exist overseas to produce convincing experience letters for companies that may or may not exist.

<div style="max-width: 600px; margin: 24px auto; font-family: 'Georgia', serif; border: 1px solid #ccc; background: #fff; padding: 35px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <div style="margin-bottom: 20px;">
    <div style="font-family: sans-serif; font-weight: bold; font-size: 1.2em; color: #1a237e;"><span verifiable-text="start" data-for="expletter"></span>Infosys Limited</div>
    <div style="font-family: sans-serif; font-size: 0.8em; color: #666;">Electronics City, Hosur Road, Bangalore 560 100, India</div>
  </div>

  <div style="font-size: 0.9em; color: #555; margin-bottom: 15px;">January 15, 2026</div>

  <div style="font-size: 0.9em; line-height: 1.7; color: #333; margin-bottom: 15px;">
    <p style="margin: 0 0 12px 0;">To Whom It May Concern,</p>
    <p style="margin: 0 0 12px 0;">This is to certify that <strong>Rajesh Kumar Patel</strong> (Employee ID: INF-118429) was employed at Infosys Limited from <strong>June 12, 2019</strong> to <strong>December 20, 2025</strong>.</p>
  </div>

  <div style="font-family: sans-serif; font-size: 0.88em; line-height: 1.8; color: #333; margin-bottom: 15px; padding: 12px; background: #f5f5ff; border-left: 3px solid #1a237e;">
    <p style="margin: 0;"><strong>Designation:</strong> Senior Systems Engineer</p>
    <p style="margin: 0;"><strong>Department:</strong> Digital Experience & Cloud Services</p>
    <p style="margin: 0;"><strong>Technologies:</strong> Java, Spring Boot, AWS, Kubernetes, Oracle</p>
    <p style="margin: 0;"><strong>Last CTC:</strong> ₹24,50,000 per annum</p>
    <p style="margin: 0;"><strong>Reason for Leaving:</strong> Voluntary resignation</p>
  </div>

  <div style="font-size: 0.88em; line-height: 1.6; color: #333; margin-bottom: 20px;">
    <p style="margin: 0;">During his tenure, Mr. Patel was responsible for designing and implementing microservices architecture for enterprise banking clients, leading a team of 6 developers, and managing production deployments across AWS regions.</p>
  </div>

  <div style="margin-bottom: 20px;">
    <div style="font-style: italic; color: #555;">Priya Venkataraman</div>
    <div style="font-family: sans-serif; font-size: 0.78em; color: #666;">Priya Venkataraman<br>Senior HR Manager<br>Infosys Limited</div>
  </div>

  <hr style="border: none; border-top: 1px dashed #999; margin: 15px 0 8px 0;">
  <div data-verify-line="expletter" style="font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
    title="Demo only: Infosys doesn't yet offer verification&#10;endpoints, so this is illustrative">
    <span data-verify-line="expletter">verify:hr.infosys.com/employment/v</span> <span verifiable-text="end" data-for="expletter"></span>
  </div>
</div>

### Data Verified

Employee name, employee ID, employer name, employment dates (start/end), designation/title, department, key responsibilities, reason for leaving.

NOT included: compensation details (salary may be omitted from the verifiable text for privacy; the employer decides what to hash).

### Verification Response

- **VERIFIED** — Infosys issued this experience letter for this employee
- **SUPERSEDED** — A corrected letter was issued (e.g., title correction, date adjustment)
- **RETRACTED** — Employer discovered the original letter was issued in error or fraudulently (e.g., by a rogue HR employee)
- **404** — Infosys has no record of issuing this letter

### The Adoption Problem

Unlike client engagement letters (where the end-client has a clear incentive), overseas employers have weak incentives to participate. They've already separated from the employee — why spend engineering effort hashing old experience letters?

Three forces could drive adoption:

1. **Large employers first:** Companies like Infosys, TCS, Wipro, and Cognizant process tens of thousands of separations annually. They already issue experience letters as standard practice. Adding a `verify:` line and hashing the letter is a trivial addition to their existing HRMS workflows — and these companies are sophisticated enough to implement it. Once the major employers participate, a forged letter claiming employment at "Infosys" would 404 instantly.

2. **Immigration incentive:** USCIS could give expedited processing or reduced RFEs (Requests for Evidence) to petitions backed by verified experience letters. This creates a market incentive: employers whose letters are verifiable produce workers with smoother immigration outcomes, making those employers more attractive.

3. **Worker-initiated:** At separation, the departing employee could request a verified letter — just as they request a relieving letter today. The employer hashes it as part of the standard exit process.

---

## 4. IT Certifications

### What is an IT Certification?

H-1B petitions for technology roles routinely include professional certifications — AWS Solutions Architect, Cisco CCNP, Microsoft Azure, Google Cloud Professional, Oracle Certified Professional. These certifications bolster a thin resume and support the "specialty occupation" argument.

The certifications are forged routinely. Fake AWS certificates with plausible-looking certification IDs circulate freely. The issuing vendors (Amazon, Cisco, Microsoft, Google, Oracle) already have verification portals, but they're designed for individual lookups — an immigration officer processing hundreds of petitions can't manually check each certification on five different vendor websites.

<div style="max-width: 580px; margin: 24px auto; font-family: sans-serif; border: 1px solid #ccc; background: #fff; padding: 0; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <div style="background: #232f3e; color: #ff9900; padding: 16px 24px; display: flex; justify-content: space-between; align-items: center;">
    <div>
      <div style="font-size: 1.3em; font-weight: bold;"><span verifiable-text="start" data-for="cert"></span>aws</div>
      <div style="font-size: 0.75em; color: #ddd; margin-top: 2px;">Amazon Web Services</div>
    </div>
    <div style="font-size: 0.85em; color: #ff9900; font-weight: bold;">CERTIFIED</div>
  </div>
  <div style="padding: 24px;">
    <div style="text-align: center; font-size: 1.1em; color: #232f3e; font-weight: bold; margin-bottom: 15px;">AWS Certified Solutions Architect – Professional</div>
    <div style="font-size: 0.9em; line-height: 1.8; color: #333; padding: 12px; background: #f7f7f7; border-radius: 4px; margin-bottom: 15px;">
      <p style="margin: 0;"><strong>Name:</strong> Rajesh Kumar Patel</p>
      <p style="margin: 0;"><strong>Certification ID:</strong> AWS-SAP-2024-RKP-8827</p>
      <p style="margin: 0;"><strong>Issued:</strong> September 14, 2024</p>
      <p style="margin: 0;"><strong>Expires:</strong> September 14, 2027</p>
      <p style="margin: 0;"><strong>Validation:</strong> Active</p>
    </div>
    <hr style="border: none; border-top: 1px dashed #999; margin: 15px 0 8px 0;">
    <div data-verify-line="cert" style="font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
      title="Demo only: AWS doesn't yet offer hash-based verification&#10;endpoints, so this is illustrative">
      <span data-verify-line="cert">verify:aws.amazon.com/certification/v</span> <span verifiable-text="end" data-for="cert"></span>
    </div>
  </div>
</div>

### Data Verified

Candidate name, certification name and level, certification ID, issue date, expiration date, validation status.

### Verification Response

- **VALID** — Certification is authentic and current
- **EXPIRED** — Certification was genuine but has lapsed (holder didn't recertify)
- **REVOKED** — Certification revoked (cheating detected, terms violation)
- **404** — No matching certification record (fabricated ID)

### Why Vendors Would Participate

Unlike overseas employers, certification vendors have strong existing incentives:

- **Brand protection:** Fake AWS certifications devalue the real ones. Amazon already operates a verification portal ([aws.amazon.com/verification](https://aws.amazon.com/verification)) — adding hash-based verification is an incremental step.
- **Already digital:** The entire certification lifecycle is digital. There's no paper origination step. Hashing the certificate at issuance is trivial.
- **Competitive advantage:** The first major vendor to offer hash-verified certificates creates pressure on competitors. If AWS certificates are instantly verifiable and Oracle's aren't, the market notices.

---

## Second-Party Use

The **H-1B worker** (second party) benefits from verification across all four document types:

**Confirming their own petition is legitimate:** A worker who suspects their employer filed a fraudulent petition (fake client letter, wrong worksite on the LCA, inflated job description) can verify each document independently. This shifts the power dynamic from "trust your employer" to "verify your employer."

**Portable verified credentials:** When changing H-1B employers (portability), the new employer needs to confirm the worker's experience and certifications. Verified documents accelerate the transfer process.

**Protection against employer retaliation:** If a worker reports wage fraud or LCA violations, the employer sometimes retaliates by revoking the petition. A verified paper trail — the original LCA, the client letter, the experience letters — provides documentary evidence for DOL complaints and whistleblower protections.

## Third-Party Use

**USCIS Adjudicators**
The primary beneficiary. An adjudicator reviewing an H-1B petition scans each document — the client engagement letter, the LCA, the experience letters, the certifications — and gets instant confirmation or a 404. The volume of Requests for Evidence (RFEs) drops because the adjudicator can verify claims at first review rather than requesting additional documentation weeks later.

**Department of Labor Investigators**
WHD investigators pursuing wage fraud cases can cross-verify: the LCA states $142,000 at 383 Madison Avenue; the client letter confirms the engagement at that address; the payroll records (see [Pay Stubs](pay-stubs-payslips)) show actual compensation. Mismatches between verified documents become evidence.

**End-Client Companies**
Large enterprises that engage staffing firms can verify that the staffing firm's H-1B petition accurately represents the engagement. If JPMorgan's verified letter says "Senior Java Developer, April 2026 – March 2029" but the staffing company's petition describes a "Data Scientist" role — the discrepancy is visible.

**Immigration Attorneys**
Attorneys representing workers in petition challenges, RFE responses, or appeals can present verified documents as evidence. A verified client letter from JPMorgan carries more weight than an unverified PDF.

**Competing Workers / Whistleblowers**
Workers who suspect their employer is running a bench operation — filing H-1B petitions with fabricated client letters for workers who have no actual engagement — can check whether the client engagement letters in their co-workers' petitions verify. A pattern of 404s from "client" companies is evidence of systematic fraud.

## Verification Architecture

**The Body-Shop / Bench Company Fraud Model**

The H-1B fraud ecosystem works because no single party can see the full picture:

1. **Staffing company** files an H-1B petition claiming a specific role at a specific client
2. **USCIS** sees the petition documents but can't verify client letters or overseas experience
3. **End-client** may not know their name is being used in a petition
4. **Worker** may not know the exact terms of the LCA or whether the client letter is real
5. **DOL** certifies the LCA based on employer attestation, with minimal verification

Live Verify creates cross-verification points:

```
Client Letter  ←→  LCA Worksite     ←→  Actual Deployment
  (client domain)    (DOL domain)       (verifiable via proof-of-employment)

Experience Letter ←→  Degree/Credential ←→  Specialty Occupation Claim
  (prior employer)     (university/WES)      (petition description)

IT Certification  ←→  Role Requirements
  (vendor domain)       (petition + LCA)
```

Each document is independently verifiable against its issuer's domain. Inconsistencies between verified documents — different worksites, different job titles, different dates — surface automatically.

**Issuer Types (First Party)**

- **Client engagement letters:** End-client companies (JPMorgan, Google, Meta, etc.) via procurement/vendor management domains
- **LCAs:** U.S. Department of Labor, Employment and Training Administration
- **Experience letters:** Prior employers (Infosys, TCS, Wipro, individual companies worldwide)
- **IT certifications:** AWS, Microsoft, Cisco, Google, Oracle, CompTIA, and others

## Privacy Salt

Highly Critical. H-1B petition details — names, employers, worksites, wages — are sensitive employment information protected under the Privacy Act. Salting prevents enumeration of who has H-1B petitions filed by which employers, which would enable discrimination and immigration-status profiling. The LCA is particularly sensitive: DOL already publishes LCA data publicly, but the hash should not be reversible to identify specific individuals from the wage and worksite combination alone.

## Authority Chain

**Pattern:** Mixed (varies by document type)

Each document type has its own authority chain:

**Client Engagement Letters — Commercial (self-authorized)**
```
✓ procurement.jpmorgan.com/engagements — Issues engagement confirmations for consulting staff
```

**Certified LCAs — Sovereign**
```
✓ lcaverify.dol.gov/v — Department of Labor, Employment and Training Administration
  ✓ usa.gov/verifiers — US federal government root namespace
```

**Experience Letters — Commercial (self-authorized)**
```
✓ hr.infosys.com/employment/v — Issues employment verification for former staff
```

**IT Certifications — Commercial (self-authorized)**
```
✓ aws.amazon.com/certification/v — Issues professional cloud certifications
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Competition vs. Existing Verification

| Feature | Live Verify | USCIS Site Visits | Manual Phone/Email Verification | E-Verify |
| :--- | :--- | :--- | :--- | :--- |
| **Speed** | **Instant.** 5-second scan per document. | **Months.** FDNS visits are scheduled weeks to months after approval. | **Days to weeks.** Phone calls to overseas employers may never connect. | **Real-time.** But limited to employment authorization only. |
| **Scope** | **Full petition.** Client letter, LCA, experience, certifications — all verifiable. | **Partial.** Confirms current employment; can't verify historical experience or original client letter. | **One document at a time.** Each verification is a separate inquiry. | **Narrow.** Only confirms work authorization, not job details, wages, or credentials. |
| **Scale** | **Unlimited.** Every petition, every document, every time. | **Tiny fraction.** FDNS visits fewer than 5% of approved petitions. | **Doesn't scale.** Individual inquiries by individual adjudicators. | **Universal.** But narrow scope. |
| **Fraud Detection** | **At submission.** Fake documents 404 before the petition is approved. | **Post-approval.** Fraud discovered after the worker is already in the US. | **Inconsistent.** Depends on whether the contacted party responds honestly. | **Different fraud type.** Catches identity fraud, not petition fraud. |
| **Worker Protection** | **Yes.** Worker can verify their own LCA and client letter. | **Limited.** Worker is interviewed but can't independently verify documents. | **No.** Worker rarely has access to verify employer claims. | **No.** Worker can't use E-Verify to check their own petition terms. |

## Jurisdictional Witnessing

A jurisdiction may require the issuer to retain a **witnessing firm** for regulatory compliance. The witnessing firm:

- Receives all hashes from the issuer, and any subsequent changes to the payload as they happen — which may manifest as a new hash, a status change, or even a 404 (record deleted)
- Receives structured content/metadata (key identifiers and dates)
- Does **NOT** receive plaintext or sensitive personal information
- Provides an immutable, timestamped audit trail — available to the jurisdiction on demand, to document holders/third parties during disputes, or as expert witness testimony in legal proceedings

This provides:
- **Non-repudiation:** Issuer cannot deny issuing the document
- **Timestamp proof:** Document existed at a specific time
- **Regulatory audit:** Jurisdictions can inspect the witness ledger for fraud detection
- **Resilience:** Verification works even if issuer's systems go down

**Public Blockchain (Non-Party)**

Witnessing firms may periodically commit rollups to an inexpensive public blockchain, providing an ultimate immutability guarantee. The blockchain is a "non-party" — infrastructure, not a participant in the transaction. This creates multiple verification paths:

1. **Issuer domain** — Direct check against the issuer
2. **Witnessing firm** — Independent confirmation with timestamp
3. **Public blockchain** — Decentralized trust anchor via rollup inclusion

## Further Derivations

1. **Prevailing wage determination letters** — DOL's National Prevailing Wage Center issues wage determinations that employers use for PERM labor certifications (green card pathway). Same forge-and-submit risk as LCAs, same verification model.
2. **I-140 approval notices** — The employer-sponsored green card petition approval. Workers who change employers under AC21 portability need to prove their I-140 was approved and not revoked — same verification need as I-797 notices but for the immigrant petition.
3. **STEM OPT employer training plans (Form I-983)** — Signed by both the employer and the STEM OPT student, these plans attest that the training is genuinely educational. Fraudulent training plans from body shops let students work in non-training roles while maintaining F-1 status.

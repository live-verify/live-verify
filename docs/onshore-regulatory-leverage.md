# Onshore Regulatory Leverage

How onshore governments — the OECD/G20 members, EU, and FATF — could mandate machine-verifiable registry documents from offshore jurisdictions, and why Live Verify is the path of least resistance for compliance.

## The Problem

Offshore registries issue documents — certificates of good standing, substance declarations, compliance audit reports, registered agent letters — that onshore institutions must trust but cannot verify. A bank in Frankfurt receives a PDF from the BVI Financial Services Commission. Is it genuine? The bank has no practical way to check. It either trusts the PDF or closes the account.

This verification gap is the root cause of two expensive problems:

1. **Fraud succeeds.** Forged registry documents are used to open bank accounts, claim treaty benefits, and sustain shell company structures that facilitate money laundering, tax evasion, and sanctions evasion.

2. **De-risking overreacts.** Because banks can't verify documents cheaply, they close accounts for entire categories of offshore entities — including legitimate ones. The IMF estimates that de-risking has cut off significant portions of the Caribbean and Pacific from the global financial system.

Machine-verifiable registry documents solve both problems simultaneously.

## Who Has Leverage

The leverage sits with **onshore governments** — jurisdictions where the money ultimately flows, where the beneficial owners reside, and where the correspondent banks operate. Offshore jurisdictions need access to onshore financial systems far more than onshore systems need them.

### OECD / G20

The OECD's Base Erosion and Profit Shifting (BEPS) framework already forced offshore jurisdictions to enact economic substance legislation. The same mechanism — "adopt this standard or face consequences" — could require machine-verifiable filings.

**Relevant BEPS Actions:**
- Action 5 (Harmful Tax Practices) — already requires substance; could require verifiable substance declarations
- Action 6 (Treaty Abuse) — could require verifiable tax residency certificates for treaty benefit claims
- Action 13 (Transfer Pricing Documentation) — could require verifiable country-by-country reports

### EU (Blacklist Mechanism)

The EU maintains a [list of non-cooperative jurisdictions for tax purposes](https://www.consilium.europa.eu/en/policies/eu-list-of-non-cooperative-jurisdictions/). Jurisdictions stay off the blacklist by meeting EU criteria. Adding "machine-verifiable registry filings" to the criteria would force every listed jurisdiction to adopt verification endpoints or face blacklisting.

**Current EU criteria include:**
- Tax transparency and exchange of information
- Fair taxation (no harmful tax practices)
- Implementation of BEPS minimum standards

A fourth criterion — **document verifiability** — would be a natural extension.

### FATF (Financial Action Task Force)

The FATF sets global AML/CFT standards. Jurisdictions that fail FATF evaluations are "greylisted" — which triggers enhanced due diligence requirements from every bank in the world, effectively cutting off financial access.

**FATF Recommendation 24** (Transparency of Legal Persons) already requires countries to ensure that beneficial ownership information is available. Requiring that this information be **machine-verifiable** is a natural tightening of the standard.

FATF mutual evaluations could assess whether a jurisdiction's registry provides verification endpoints for the documents it issues.

### United States

The US has unique leverage through the dollar clearing system. Every offshore entity that transacts in dollars needs access to US correspondent banks, which are regulated by FinCEN, the OCC, and the Federal Reserve.

**Mechanisms:**
- **FinCEN guidance:** Could require that US banks verify offshore entity documents against the issuing registry's domain before establishing correspondent banking relationships.
- **FATCA extension:** The US already forces every foreign financial institution to report US account holders or face 30% withholding. The same infrastructure could require that FATCA-reporting institutions verify offshore entity documents.
- **Corporate Transparency Act (CTA) reciprocity:** The CTA requires US companies to report beneficial owners to FinCEN. Implementing regulations could require that foreign entities doing business in the US demonstrate their home jurisdiction offers machine-verifiable registry documents.
- **SEC requirements:** Offshore fund vehicles registered with the SEC (or whose managers are) could be required to provide machine-verifiable registry documents from their domicile.
- **Bank examiner procedures:** OCC, Fed, and FDIC examiners could add "verification of offshore entity documentation" to examination checklists — creating bottom-up pressure on banks to demand verified documents.

### United Kingdom

The UK has direct constitutional authority over many key offshore jurisdictions:

**Crown Dependencies:** Jersey, Guernsey, Isle of Man — the UK can legislate for them on matters of international obligation.

**Overseas Territories:** BVI, Cayman Islands, Bermuda, Turks and Caicos, Gibraltar, Anguilla — the UK Parliament can (and has) imposed legislation on them. In 2018, the UK forced the Overseas Territories to adopt public beneficial ownership registers via the Sanctions and Anti-Money Laundering Act.

The same mechanism — an Order in Council or primary legislation — could require that OT and CD registries provide machine-verifiable documents.

### Australia, Canada, Japan, Germany, France

Each has its own offshore entity documentation requirements for tax and AML purposes. Coordinated action through the OECD or FATF amplifies individual country leverage.

## What "Machine-Verifiable" Means in Practice

The mandate doesn't need to name Live Verify. It sets a standard:

> Registry documents issued by the jurisdiction must be verifiable by any third party, without requiring an account or prior relationship with the registry, by means of a cryptographic hash of the document's text content checked against a verification endpoint operated by or on behalf of the issuing registry.

This is technology-neutral but specific enough that compliance requires:
1. A hash of the document content
2. A public endpoint that confirms or denies the hash
3. No authentication required (any party can verify)
4. Real-time status (revoked/expired/struck off documents return non-OK status)

Live Verify meets all four requirements. A jurisdiction could build something else, but Live Verify is the simplest path — especially since it works with static file hosting (GitHub Pages, S3) and doesn't require a database or API infrastructure.

## Which Documents

The mandate would apply to documents that onshore institutions routinely receive from offshore entities:

| Document | Use Case | Current Verification |
| :--- | :--- | :--- |
| Certificate of Good Standing | Bank account opening, counterparty due diligence | None (trust the PDF) |
| Economic Substance Declaration | Proving genuine operations in jurisdiction | Annual exchange only (12-18 month lag) |
| Registered Agent Letter | KYC, director/shareholder confirmation | Phone the agent (days, often refused) |
| Compliance Audit Report | AML compliance evidence | Phone the auditor (days, confidentiality barriers) |
| Beneficial Ownership Filing | UBO identification | Inter-governmental request (months) |
| Tax Residency Certificate | Treaty benefit claims | Inter-governmental request (months) |
| Certificate of Incumbency | Director/shareholder confirmation | Phone the agent (days) |

See individual use cases:
- [Offshore Good Standing Certificates](../public/use-cases/offshore-good-standing-certificates.md)
- [Tax Haven Economic Substance Declarations](../public/use-cases/tax-haven-substance-declarations.md)
- [Registered Agent Letters](../public/use-cases/registered-agent-letters.md)
- [Offshore Compliance Audit Reports](../public/use-cases/offshore-compliance-audit-reports.md)
- [Beneficial Ownership Declarations](../public/use-cases/beneficial-ownership-declarations.md)
- [Tax Residency Certificates](../public/use-cases/tax-residency-certificates.md)

## Implementation Path

### Phase 1: Voluntary Adoption

Onshore regulators issue **guidance** (not rules) encouraging banks to prefer machine-verifiable offshore documents. Forward-looking jurisdictions (Jersey, Singapore, Ireland) adopt voluntarily to differentiate themselves as "transparent" offshore centres.

### Phase 2: Enhanced Due Diligence Trigger

Regulators declare that offshore documents from jurisdictions **without** verification endpoints require **enhanced due diligence** — meaning more cost and friction for the bank. This creates market pressure: entities domiciled in non-verifying jurisdictions become more expensive to bank, driving migration to verifying jurisdictions.

### Phase 3: Mandatory Standard

FATF, OECD, or EU formally adds document verifiability to its assessment criteria. Jurisdictions have 2-3 years to comply. Non-compliant jurisdictions face greylisting (FATF), blacklisting (EU), or enhanced reporting requirements (OECD).

### Phase 4: Bilateral Enforcement

Individual countries (US, UK, Australia) incorporate document verifiability into bilateral tax treaties and tax information exchange agreements (TIEAs). Treaty benefits become conditional on the source jurisdiction providing verifiable documents.

## Objections and Responses

**"This is sovereignty interference."**
The same objection was raised against FATCA, CRS, BEPS, and economic substance requirements. Offshore jurisdictions accepted all of them because the alternative — losing access to onshore financial systems — was worse. Document verifiability is a lighter lift than any of those.

**"Registries don't have the technical capacity."**
Live Verify works with static file hosting. A jurisdiction can serve verification files from GitHub Pages or an S3 bucket. No database, no API, no custom software. If a registry can maintain a website, it can serve verification hashes.

**"This exposes private information."**
The verification endpoint reveals nothing that isn't already in the document. It confirms "yes, we issued a document with this hash" or returns 404. No personal data is exposed. The privacy salt prevents enumeration.

**"What about corruption at the registrar level?"**
If the registrar itself is complicit — issuing genuine certificates for entities that shouldn't have them — Live Verify doesn't solve the underlying corruption. But it does create an auditable trail. Jurisdictional witnessing means a third-party witness has a timestamped record of every hash the registrar published. When an investigation reveals the registrar was issuing certificates improperly, the witnessing record shows exactly which certificates were issued and when — making it harder for the registrar to cover its tracks retroactively.

## The Leverage Asymmetry

The core dynamic: offshore jurisdictions derive their revenue from fees paid by entities that need access to onshore financial systems. If onshore governments make that access conditional on document verifiability, offshore jurisdictions will comply — just as they complied with substance requirements, beneficial ownership registers, and automatic exchange of information.

The question is not whether this will happen, but when and which onshore actor moves first.

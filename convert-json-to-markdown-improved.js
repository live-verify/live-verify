#!/usr/bin/env node

/**
 * Improved JSON-to-markdown converter
 * Generates comprehensive markdown with intelligent domain-specific content
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Helper function to extract base filename without extension
function getBaseName(filePath) {
  return path.basename(filePath, path.extname(filePath));
}

// Map volume values to consistent format
function normalizeVolume(vol) {
  const map = {
    'very small': 'Very Small',
    'small': 'Small',
    'medium': 'Medium',
    'large': 'Large',
    'very large': 'Very Large',
    'medium-small': 'Small',
    'very small (niche)': 'Very Small',
  };
  return map[vol.toLowerCase()] || vol;
}

// Categorization helpers
const CATEGORIES = {
  realEstate: ['real estate', 'property', 'construction', 'permits'],
  financial: ['financial', 'banking', 'investment', 'insurance', 'tax'],
  healthcare: ['health', 'medical', 'lab', 'clinical', 'vaccination'],
  immigration: ['immigration', 'visa', 'passport', 'travel authorization'],
  legal: ['legal', 'court', 'notary', 'affidavit', 'judgment'],
  education: ['education', 'university', 'degree', 'transcript', 'certification'],
  transportation: ['shipping', 'cargo', 'freight', 'transport', 'logistics', 'airline', 'travel'],
  professional: ['license', 'professional', 'certification', 'credential'],
  art: ['art', 'collectible', 'appraisal', 'provenance', 'certificate of authenticity'],
  permits: ['permit', 'license', 'approval', 'authorization'],
  employment: ['employment', 'reference', 'verification', 'worker'],
};

function categorizeDocument(category, title) {
  const searchText = `${category} ${title}`.toLowerCase();

  for (const [key, keywords] of Object.entries(CATEGORIES)) {
    if (keywords.some(kw => searchText.includes(kw))) {
      return key;
    }
  }
  return 'general';
}

// Document type analysis
function analyzeDocumentType(title) {
  const lowerTitle = title.toLowerCase();

  return {
    isPermit: lowerTitle.includes('permit') || lowerTitle.includes('license'),
    isInsurance: lowerTitle.includes('insurance') || lowerTitle.includes('coverage'),
    isCertificate: lowerTitle.includes('certificate') || lowerTitle.includes('certification'),
    isReport: lowerTitle.includes('report') || lowerTitle.includes('assessment'),
    isAgreement: lowerTitle.includes('agreement') || lowerTitle.includes('contract'),
    isReceipt: lowerTitle.includes('receipt') || lowerTitle.includes('confirmation'),
    isShipping: lowerTitle.includes('bill of lading') || lowerTitle.includes('waybill') ||
                lowerTitle.includes('shipping') || lowerTitle.includes('cargo'),
  };
}

// Get specific stakeholders for well-known document types
function getSpecificStakeholders(title) {
  const lowerTitle = title.toLowerCase();

  // 1031 Exchange
  if (lowerTitle.includes('1031') && lowerTitle.includes('exchange')) {
    return [
      {
        category: 'IRS and Tax Authorities',
        context: 'Tax compliance and audit:',
        scenarios: [
          `**Audit Verification:** IRS verifies 1031 exchange documentation during tax audits.`,
          `**Compliance Monitoring:** Systematic review of like-kind exchange claims.`,
          `**Fraud Investigation:** Detection of fraudulent exchange claims.`,
          `**Revenue Protection:** Ensuring proper tax deferral requirements met.`,
          `**Qualified Intermediary Oversight:** Monitoring QI compliance and legitimacy.`
        ]
      },
      {
        category: 'Qualified Intermediaries',
        context: 'Exchange facilitation and verification:',
        scenarios: [
          `**Exchange Documentation:** QIs verify their own issued documentation.`,
          `**Escrow Management:** Confirm documentation for funds held in escrow.`,
          `**Timeline Compliance:** Verify 45-day identification and 180-day completion periods.`,
          `**Related Party Transactions:** Monitor for prohibited related party exchanges.`,
          `**Professional Liability:** Maintain verified records for E&O insurance and disputes.`
        ]
      },
      {
        category: 'Lenders and Financial Institutions',
        context: 'Exchange financing and underwriting:',
        scenarios: [
          `**Replacement Property Financing:** Verify exchange documentation when financing replacement property.`,
          `**Tax Basis Verification:** Confirm deferred gain for loan underwriting.`,
          `**Relinquished Property Payoff:** Validate exchange structure for loan payoff.`,
          `**Exchange Loan Products:** Specialized lending for exchange transactions.`,
          `**Title Insurance Coordination:** Verify exchange documentation for title clearance.`
        ]
      },
      {
        category: 'Tax Advisors and CPAs',
        context: 'Tax planning and compliance:',
        scenarios: [
          `**Client Advisory:** Verify exchange documentation for tax planning.`,
          `**Tax Return Preparation:** Validate Form 8824 supporting documentation.`,
          `**Basis Calculations:** Confirm exchange details for carryover basis calculations.`,
          `**State Tax Compliance:** Verify documentation for state-specific exchange rules.`,
          `**Audit Support:** Provide verified documentation in IRS audits.`
        ]
      },
      {
        category: 'Title and Escrow Companies',
        context: 'Real estate closing and coordination:',
        scenarios: [
          `**Exchange Coordination:** Verify QI and exchange structure at closing.`,
          `**Funds Flow:** Coordinate with QI for proper funds handling.`,
          `**Title Clearance:** Ensure exchange structure doesn't cloud title.`,
          `**1099-S Reporting:** Proper tax reporting for exchange transactions.`,
          `**Closing Documentation:** Integrate exchange documents in closing packages.`
        ]
      }
    ];
  }

  // Bank statements
  if (lowerTitle.includes('bank statement')) {
    return [
      {
        category: 'Lenders and Mortgage Companies',
        context: 'Income and asset verification:',
        scenarios: [
          `**Mortgage Applications:** Verify assets and deposits for loan qualification.`,
          `**Income Verification:** Validate deposit patterns for income documentation.`,
          `**Down Payment Source:** Confirm source of down payment funds.`,
          `**Reserves Verification:** Verify liquid reserves for loan approval.`,
          `**Fraud Detection:** Detect digitally altered or fabricated statements.`
        ]
      },
      {
        category: 'Landlords and Property Managers',
        context: 'Tenant screening and qualification:',
        scenarios: [
          `**Rental Applications:** Verify financial capacity to pay rent.`,
          `**Deposit Verification:** Confirm applicant can pay security deposits.`,
          `**Income Stability:** Review deposit history for income reliability.`,
          `**Eviction Prevention:** Screen for financial stability.`,
          `**Commercial Leasing:** Verify business account statements for commercial tenants.`
        ]
      }
    ];
  }

  // Professional licenses
  if (lowerTitle.includes('professional') && lowerTitle.includes('license')) {
    return [
      {
        category: 'Employers',
        context: 'Credential verification for hiring and compliance:',
        scenarios: [
          `**Pre-Employment Verification:** Confirm professional licenses before hiring.`,
          `**Credentialing:** Hospital and healthcare facility credentialing processes.`,
          `**Compliance Monitoring:** Ongoing verification of employee licenses.`,
          `**Scope of Practice:** Verify license type matches job responsibilities.`,
          `**Multi-State Practice:** Verify reciprocal and compact licenses.`
        ]
      },
      {
        category: 'Professional Liability Insurers',
        context: 'Malpractice insurance underwriting:',
        scenarios: [
          `**Policy Underwriting:** Verify active license status for coverage.`,
          `**Claims Investigation:** Confirm license status at time of incident.`,
          `**Disciplinary History:** Cross-reference with board disciplinary actions.`,
          `**Specialty Verification:** Confirm board certifications and specialties.`,
          `**Multi-State Coverage:** Verify licenses in all practice jurisdictions.`
        ]
      }
    ];
  }

  // University degrees
  if (lowerTitle.includes('degree') || lowerTitle.includes('diploma') || lowerTitle.includes('transcript')) {
    return [
      {
        category: 'Employers',
        context: 'Educational credential verification:',
        scenarios: [
          `**Pre-Employment Screening:** Verify degree claims during hiring.`,
          `**Credential Requirements:** Confirm candidates meet educational requirements.`,
          `**Professional Positions:** Verify advanced degrees for specialized roles.`,
          `**Background Checks:** Integrate verification into background screening.`,
          `**Global Hiring:** Verify international degrees and credentials.`
        ]
      },
      {
        category: 'Graduate Schools and Universities',
        context: 'Admissions and transfer credit evaluation:',
        scenarios: [
          `**Graduate Admissions:** Verify undergraduate degrees for graduate programs.`,
          `**Transfer Credit:** Validate transcripts for transfer credit evaluation.`,
          `**Professional Programs:** Confirm prerequisites for law, medical, MBA programs.`,
          `**International Admissions:** Verify foreign credentials for U.S. programs.`,
          `**Consortium Agreements:** Cross-institutional degree verification.`
        ]
      },
      {
        category: 'Professional Licensing Boards',
        context: 'License application review:',
        scenarios: [
          `**Initial Licensure:** Verify educational requirements for license applications.`,
          `**Continuing Education:** Validate CE credit from accredited programs.`,
          `**Specialization Certification:** Confirm educational prerequisites for specialties.`,
          `**Foreign Credential Evaluation:** Verify international degrees for U.S. licensing.`,
          `**Degree Equivalency:** Assess non-traditional or online degrees.`
        ]
      }
    ];
  }

  // Lab results
  if (lowerTitle.includes('lab') && (lowerTitle.includes('test') || lowerTitle.includes('result') || lowerTitle.includes('report'))) {
    return [
      {
        category: 'Healthcare Providers',
        context: 'Clinical decision-making and patient care:',
        scenarios: [
          `**Diagnosis Support:** Verify lab results for diagnostic decisions.`,
          `**Treatment Planning:** Confirm test results for treatment protocols.`,
          `**Specialist Referrals:** Validate labs when coordinating specialist care.`,
          `**Medication Management:** Verify therapeutic drug levels and monitoring labs.`,
          `**Emergency Care:** Rapidly verify critical lab results in emergency settings.`
        ]
      },
      {
        category: 'Insurance Companies',
        context: 'Coverage and claims processing:',
        scenarios: [
          `**Pre-Authorization:** Verify labs supporting prior authorization requests.`,
          `**Claims Processing:** Validate lab results supporting claims.`,
          `**Medical Necessity:** Confirm test results justify billed services.`,
          `**Fraud Prevention:** Detect fraudulent or altered lab results.`,
          `**Case Management:** Verify labs for utilization management.`
        ]
      },
      {
        category: 'Clinical Trial Sponsors',
        context: 'Research protocol compliance:',
        scenarios: [
          `**Eligibility Screening:** Verify lab results for trial enrollment criteria.`,
          `**Safety Monitoring:** Validate ongoing lab monitoring results.`,
          `**Endpoint Assessment:** Verify lab-based efficacy endpoints.`,
          `**Protocol Compliance:** Confirm required labs were performed.`,
          `**Regulatory Submissions:** Verified labs for FDA submissions.`
        ]
      }
    ];
  }

  return null; // No specific stakeholders, use generic logic
}

// Generate Second-Party use cases
function generateSecondPartyUse(category, title, docType) {
  const docCategory = categorizeDocument(category, title);
  const analysis = analyzeDocumentType(title);

  let content = `The document holder (subject/recipient) benefits from verification.\n\n`;

  // Common second-party scenarios
  const scenarios = [];

  if (analysis.isInsurance) {
    scenarios.push(
      `**Proof of Coverage:** Verify coverage is active when needed for compliance or access.`,
      `**Claims Support:** Confirm policy details when filing claims.`,
      `**Coverage Confirmation:** Verify coverage terms match expectations after purchase.`,
      `**Third-Party Presentation:** Provide verified proof to landlords, lenders, or employers.`,
      `**Renewal Verification:** Confirm renewal was processed and coverage continues.`
    );
  } else if (analysis.isPermit) {
    scenarios.push(
      `**Legitimacy Confirmation:** After obtaining permit, verify it was properly issued and recorded.`,
      `**Compliance Display:** Maintain verified permit for posting requirements.`,
      `**Scope Verification:** Confirm permitted activities match intended use.`,
      `**Expiration Tracking:** Monitor permit status to avoid lapses.`,
      `**Record Keeping:** Maintain verified documentation for audits and compliance.`
    );
  } else if (analysis.isCertificate) {
    scenarios.push(
      `**Authenticity Confirmation:** Verify certificate after receipt to confirm it's genuine.`,
      `**Credential Display:** Present verified credentials to employers or clients.`,
      `**Professional Development:** Track verified certifications for career advancement.`,
      `**Compliance Documentation:** Maintain verified certificates for regulatory requirements.`,
      `**Renewal Planning:** Monitor certification status to avoid expiration.`
    );
  } else if (analysis.isShipping) {
    scenarios.push(
      `**Shipment Tracking:** Verify documentation matches actual shipment.`,
      `**Customs Clearance:** Present verified documents to customs authorities.`,
      `**Payment Verification:** Confirm charges match agreed terms.`,
      `**Dispute Prevention:** Maintain verified records for potential disputes.`,
      `**Insurance Claims:** Provide verified documentation for cargo claims.`
    );
  } else if (docCategory === 'realEstate') {
    scenarios.push(
      `**Ownership Verification:** Confirm property documents are authentic.`,
      `**Transaction Support:** Provide verified documents for sales, refinancing, or transfers.`,
      `**Title Insurance:** Supply verified documentation for title insurance requirements.`,
      `**Legal Protection:** Maintain verified records for potential disputes.`,
      `**Record Accuracy:** Verify recorded information matches expectations.`
    );
  } else if (docCategory === 'healthcare') {
    scenarios.push(
      `**Medical Records:** Verify health documents for personal medical records.`,
      `**Provider Presentation:** Share verified results with other healthcare providers.`,
      `**Insurance Claims:** Support health insurance claims with verified documentation.`,
      `**Compliance Requirements:** Meet employer or school health documentation requirements.`,
      `**Legal Matters:** Provide verified health records for disability, litigation, or family matters.`
    );
  } else if (docCategory === 'immigration') {
    scenarios.push(
      `**Status Confirmation:** Verify immigration documents after receipt from authorities.`,
      `**Employment Authorization:** Confirm work authorization for I-9 compliance.`,
      `**Travel Planning:** Verify travel document validity before international trips.`,
      `**Status Changes:** Confirm application outcomes and new status.`,
      `**Family Petitions:** Provide verified status for dependent applications.`
    );
  } else if (docCategory === 'financial') {
    scenarios.push(
      `**Record Verification:** Confirm financial documents match expectations.`,
      `**Tax Preparation:** Provide verified documentation for tax filing.`,
      `**Audit Support:** Maintain verified records for potential audits.`,
      `**Dispute Resolution:** Use verified documents to resolve discrepancies.`,
      `**Loan Applications:** Present verified financial documentation to lenders.`
    );
  } else if (docCategory === 'education') {
    scenarios.push(
      `**Credential Verification:** Confirm educational credentials after issuance.`,
      `**Job Applications:** Present verified credentials to prospective employers.`,
      `**Further Education:** Provide verified transcripts for graduate school applications.`,
      `**Professional Licensing:** Submit verified credentials for license applications.`,
      `**Immigration Applications:** Verify educational credentials for visa applications.`
    );
  } else {
    scenarios.push(
      `**Document Authenticity:** Verify received documents are genuine and properly issued.`,
      `**Third-Party Presentation:** Provide verified documentation when required.`,
      `**Compliance Requirements:** Meet regulatory or contractual documentation requirements.`,
      `**Record Keeping:** Maintain verified records for future reference or audits.`,
      `**Dispute Prevention:** Establish authenticity to prevent future challenges.`
    );
  }

  return content + scenarios.join('\n\n');
}

// Generate Third-Party stakeholders and use cases
function generateThirdPartyUse(category, title, docType) {
  const docCategory = categorizeDocument(category, title);
  const analysis = analyzeDocumentType(title);

  // Check for document-specific stakeholders first
  const specificStakeholders = getSpecificStakeholders(title);
  if (specificStakeholders) {
    let content = '';
    specificStakeholders.forEach(stakeholder => {
      content += `**${stakeholder.category}**\n\n`;
      content += `${stakeholder.context}\n\n`;
      content += stakeholder.scenarios.join('\n\n');
      content += '\n\n';
    });
    return content.trim();
  }

  const stakeholders = [];

  // Regulators (common for many document types)
  if (docCategory === 'financial' || analysis.isInsurance || docCategory === 'healthcare') {
    stakeholders.push({
      category: 'Regulators and Oversight Bodies',
      context: 'Regulatory compliance and oversight:',
      scenarios: [
        `**Systematic Hash Receipt:** Receive hashes in bulk for regulatory oversight.`,
        `**Audit Verification:** Verify documents during routine or targeted audits.`,
        `**Compliance Monitoring:** Monitor issuer compliance with documentation requirements.`,
        `**Investigation Support:** Verify documents during fraud or compliance investigations.`,
        `**Consumer Protection:** Verify consumer-facing documents for protection enforcement.`
      ]
    });
  }

  // Employers (common for credentials, health, immigration)
  if (docCategory === 'education' || docCategory === 'professional' ||
      docCategory === 'healthcare' || docCategory === 'immigration') {
    stakeholders.push({
      category: 'Employers',
      context: 'Hiring and compliance verification:',
      scenarios: [
        `**Pre-Employment Screening:** Verify credentials during hiring process.`,
        `**I-9 Compliance:** Verify work authorization and identity documents.`,
        `**Credential Verification:** Confirm professional licenses and certifications.`,
        `**Health Requirements:** Verify health-related documentation for workplace safety.`,
        `**Background Checks:** Integrate verification into background check processes.`
      ]
    });
  }

  // Lenders (real estate, financial)
  if (docCategory === 'realEstate' || docCategory === 'financial' || analysis.isInsurance) {
    stakeholders.push({
      category: 'Lenders and Financial Institutions',
      context: 'Credit underwriting and risk assessment:',
      scenarios: [
        `**Loan Underwriting:** Verify financial and property documents during loan applications.`,
        `**Collateral Verification:** Confirm documentation for secured lending.`,
        `**Credit Decisions:** Validate income, employment, and asset documentation.`,
        `**Insurance Requirements:** Verify insurance coverage for loan requirements.`,
        `**Fraud Prevention:** Detect fraudulent documentation in loan applications.`
      ]
    });
  }

  // Insurance companies
  if (analysis.isPermit || docCategory === 'realEstate' || docCategory === 'healthcare' ||
      docCategory === 'transportation') {
    stakeholders.push({
      category: 'Insurance Companies',
      context: 'Underwriting and claims processing:',
      scenarios: [
        `**Policy Underwriting:** Verify supporting documents during policy issuance.`,
        `**Claims Verification:** Validate documentation during claims processing.`,
        `**Risk Assessment:** Confirm permits, licenses, and certifications for risk evaluation.`,
        `**Fraud Detection:** Identify fraudulent documentation in claims or applications.`,
        `**Coverage Disputes:** Reference verified documents in coverage determination.`
      ]
    });
  }

  // Courts and legal professionals
  if (docCategory === 'legal' || docCategory === 'realEstate' || docCategory === 'financial') {
    stakeholders.push({
      category: 'Courts and Legal Professionals',
      context: 'Litigation and legal proceedings:',
      scenarios: [
        `**Evidence Authentication:** Verify documents submitted as evidence.`,
        `**Discovery Verification:** Confirm authenticity of documents in discovery.`,
        `**Dispute Resolution:** Validate contested documents in litigation.`,
        `**Due Diligence:** Verify documentation in transactions and investigations.`,
        `**Expert Testimony:** Support expert opinions with verified documentation.`
      ]
    });
  }

  // Government agencies
  if (analysis.isPermit || docCategory === 'immigration' || docCategory === 'realEstate') {
    stakeholders.push({
      category: 'Government Agencies',
      context: 'Compliance enforcement and administration:',
      scenarios: [
        `**Inspection Verification:** Field agents verify permits and licenses at sites.`,
        `**Enforcement Actions:** Confirm documentation before enforcement.`,
        `**Benefit Eligibility:** Verify supporting documents for benefits administration.`,
        `**Compliance Audits:** Audit documentation for regulatory compliance.`,
        `**Interagency Coordination:** Share verified documents across agencies.`
      ]
    });
  }

  // Healthcare providers
  if (docCategory === 'healthcare' || docCategory === 'immigration') {
    stakeholders.push({
      category: 'Healthcare Providers',
      context: 'Medical care and coordination:',
      scenarios: [
        `**Medical History:** Verify patient-provided medical records and test results.`,
        `**Treatment Planning:** Confirm diagnostic results for treatment decisions.`,
        `**Specialist Referrals:** Validate records when coordinating care.`,
        `**Insurance Authorization:** Verify coverage and authorization documents.`,
        `**Compliance Requirements:** Confirm vaccination and health screening records.`
      ]
    });
  }

  // Educational institutions
  if (docCategory === 'education' || docCategory === 'immigration') {
    stakeholders.push({
      category: 'Educational Institutions',
      context: 'Admissions and enrollment:',
      scenarios: [
        `**Transfer Credits:** Verify transcripts for transfer credit evaluation.`,
        `**Graduate Admissions:** Validate undergraduate credentials for graduate programs.`,
        `**Professional Programs:** Confirm prerequisite credentials for professional schools.`,
        `**International Students:** Verify foreign credentials for admissions and visa support.`,
        `**Scholarship Awards:** Validate academic credentials for scholarship eligibility.`
      ]
    });
  }

  // Real estate professionals
  if (docCategory === 'realEstate' || analysis.isPermit) {
    stakeholders.push({
      category: 'Real Estate Professionals',
      context: 'Property transactions and due diligence:',
      scenarios: [
        `**Purchase Due Diligence:** Verify property documents during transactions.`,
        `**Listing Preparation:** Confirm permits and documentation for listings.`,
        `**Disclosure Compliance:** Validate required disclosures and permits.`,
        `**Title Research:** Verify property documents for title clearance.`,
        `**Appraisal Support:** Confirm documented improvements and permits.`
      ]
    });
  }

  // Shipping and logistics
  if (analysis.isShipping || docCategory === 'transportation') {
    stakeholders.push({
      category: 'Customs and Border Authorities',
      context: 'International trade compliance:',
      scenarios: [
        `**Import Clearance:** Verify shipping documents for customs clearance.`,
        `**Duty Assessment:** Validate commercial invoices and declarations.`,
        `**Trade Compliance:** Confirm certificates of origin and trade documents.`,
        `**Security Screening:** Verify cargo documentation for security.`,
        `**Export Controls:** Validate export documentation and licenses.`
      ]
    });

    stakeholders.push({
      category: 'Freight Forwarders and Carriers',
      context: 'Logistics and transportation:',
      scenarios: [
        `**Shipment Acceptance:** Verify documents before accepting cargo.`,
        `**Carrier Handoffs:** Validate documentation at transfer points.`,
        `**Liability Determination:** Reference verified documents for claims.`,
        `**Route Planning:** Confirm documentation for transit requirements.`,
        `**Delivery Confirmation:** Verify documents at final delivery.`
      ]
    });
  }

  // Professional licensing boards
  if (docCategory === 'professional' || docCategory === 'education') {
    stakeholders.push({
      category: 'Professional Licensing Boards',
      context: 'Licensing and credentialing:',
      scenarios: [
        `**License Applications:** Verify educational and training credentials.`,
        `**Continuing Education:** Validate CE credits for license renewal.`,
        `**Reciprocity Requests:** Verify out-of-state licenses for reciprocal licensing.`,
        `**Disciplinary Proceedings:** Confirm credential claims in investigations.`,
        `**Specialization Certification:** Verify prerequisites for specialty certification.`
      ]
    });
  }

  // Add generic stakeholders if we don't have enough
  if (stakeholders.length < 3) {
    stakeholders.push({
      category: 'Auditors and Compliance Officers',
      context: 'Internal and external audits:',
      scenarios: [
        `**Financial Audits:** Verify documents during financial statement audits.`,
        `**Compliance Audits:** Validate documentation for regulatory compliance.`,
        `**Internal Controls:** Test document authenticity in control assessments.`,
        `**Fraud Investigations:** Verify documents in fraud examinations.`,
        `**Third-Party Audits:** Validate vendor and partner documentation.`
      ]
    });
  }

  // Format stakeholder sections
  let content = '';
  stakeholders.forEach(stakeholder => {
    content += `**${stakeholder.category}**\n\n`;
    content += `${stakeholder.context}\n\n`;
    content += stakeholder.scenarios.join('\n\n');
    content += '\n\n';
  });

  return content.trim();
}

// Generate Verification Architecture
function generateVerificationArchitecture(category, title, docType) {
  const docCategory = categorizeDocument(category, title);
  const analysis = analyzeDocumentType(title);
  const lowerTitle = title.toLowerCase();

  let content = `**The ${title} Fraud Problem**\n\n`;
  content += `Document fraud creates significant risks:\n\n`;

  // Common fraud patterns
  const fraudPatterns = [
    `- **Fabrication:** Entirely fake documents created from scratch`,
    `- **Alteration:** Genuine documents with modified content (dates, amounts, names)`,
    `- **Impersonation:** Documents falsely claiming to be from legitimate issuers`,
    `- **Expired/Revoked Documents:** Presenting invalid documents as current`,
  ];

  // Document-specific fraud patterns
  if (lowerTitle.includes('1031') && lowerTitle.includes('exchange')) {
    fraudPatterns.splice(4, 0,
      `- **Fake Qualified Intermediaries:** Fraudulent QIs or documents from non-existent QIs`,
      `- **Timeline Fraud:** Altered dates to meet 45-day identification or 180-day completion`,
      `- **Related Party Violations:** Concealing prohibited related party transactions`,
      `- **Basis Inflation:** Overstating relinquished property basis to inflate tax benefits`
    );
  } else if (lowerTitle.includes('bank statement')) {
    fraudPatterns.splice(4, 0,
      `- **Photoshop Fraud:** Digital manipulation of balances and transactions`,
      `- **PDF Editing:** Modified PDFs with altered amounts and dates`,
      `- **Fake Deposits:** Fabricated large deposits to inflate assets`,
      `- **Balance Inflation:** Altered ending balances for loan applications`
    );
  } else if (lowerTitle.includes('degree') || lowerTitle.includes('diploma') || lowerTitle.includes('transcript')) {
    fraudPatterns.splice(4, 0,
      `- **Diploma Mills:** Fake credentials from unaccredited institutions`,
      `- **Grade Alteration:** Modified GPAs and course grades`,
      `- **Degree Fabrication:** Fake degrees from legitimate institutions`,
      `- **Credential Mills:** Online services selling fake transcripts`
    );
  } else if (lowerTitle.includes('lab') && (lowerTitle.includes('test') || lowerTitle.includes('result'))) {
    fraudPatterns.splice(4, 0,
      `- **Result Manipulation:** Altered test values for fraud or insurance`,
      `- **Negative to Positive:** Changing drug test or disease results`,
      `- **Date Alteration:** Backdating results for compliance or coverage`,
      `- **Copy/Paste Fraud:** Using someone else's results with name changed`
    );
  }

  // Add document-specific fraud patterns
  if (analysis.isInsurance) {
    fraudPatterns.push(
      `- **Coverage Inflation:** Inflating coverage limits or adding non-existent coverage`,
      `- **Backdating:** Creating policies with false effective dates`,
      `- **Ghost Policies:** Fabricated policies from non-existent insurers`
    );
  } else if (analysis.isPermit) {
    fraudPatterns.push(
      `- **Permit Sharing:** Using one property's permit for work at another location`,
      `- **Scope Expansion:** Expanding permitted activities beyond authorization`,
      `- **Contractor Fraud:** Claiming permits that were never obtained`
    );
  } else if (analysis.isShipping) {
    fraudPatterns.push(
      `- **Cargo Misrepresentation:** False descriptions of goods being shipped`,
      `- **Duplicate Bills:** Creating multiple originals for fraud`,
      `- **Document Mismatch:** Documents that don't match actual cargo`
    );
  } else if (docCategory === 'financial') {
    fraudPatterns.push(
      `- **Income Inflation:** Inflating income or assets on financial documents`,
      `- **Photoshop Fraud:** Digital manipulation of statements and documents`,
      `- **Shell Company Documents:** Documents from fake or shell entities`
    );
  } else if (docCategory === 'education') {
    fraudPatterns.push(
      `- **Diploma Mills:** Fake credentials from non-accredited institutions`,
      `- **Grade Alteration:** Modified transcripts with inflated grades`,
      `- **Degree Fabrication:** Completely fabricated degrees from real institutions`
    );
  }

  content += fraudPatterns.join('\n') + '\n\n';
  content += `OCR-to-hash verification addresses fake and altered documents. Domain binding confirms the claimed issuer actually issued the document.\n\n`;

  // Issuer section
  content += `**Issuer Types**\n\n`;
  content += `Who issues these documents and operates verification endpoints?\n\n`;

  const issuers = [];
  if (docCategory === 'realEstate') {
    issuers.push(
      `**Government Entities:** Counties, cities, and special districts maintain property records.`,
      `**Title Companies:** Title insurers and escrow companies for transaction documents.`,
      `**Lending Institutions:** Banks and mortgage companies for loan documents.`,
      `**Appraisal Firms:** Licensed appraisers for property valuations.`
    );
  } else if (docCategory === 'healthcare') {
    issuers.push(
      `**Hospitals and Health Systems:** Major healthcare providers and hospital networks.`,
      `**Clinical Laboratories:** Reference labs and hospital-based laboratories.`,
      `**Medical Clinics:** Physician practices and specialty clinics.`,
      `**Public Health Departments:** Government health agencies for certifications.`
    );
  } else if (docCategory === 'financial') {
    issuers.push(
      `**Banks and Credit Unions:** Depository institutions for account documents.`,
      `**Investment Firms:** Brokerage and investment management firms.`,
      `**Insurance Companies:** Insurers for policy and claims documents.`,
      `**Accounting Firms:** CPAs and audit firms for financial statements.`
    );
  } else if (docCategory === 'immigration') {
    issuers.push(
      `**USCIS:** U.S. Citizenship and Immigration Services for immigration documents.`,
      `**DOS:** Department of State for passports and consular documents.`,
      `**CBP:** Customs and Border Protection for entry/exit documentation.`,
      `**Foreign Governments:** International authorities for foreign-issued documents.`
    );
  } else if (analysis.isPermit) {
    issuers.push(
      `**Municipal Authorities:** City and county agencies issuing local permits.`,
      `**State Agencies:** State-level licensing and permitting bodies.`,
      `**Federal Regulators:** Federal agencies for specialized permits.`,
      `**Professional Boards:** State licensing boards for professional credentials.`
    );
  } else if (docCategory === 'education') {
    issuers.push(
      `**Universities and Colleges:** Accredited degree-granting institutions.`,
      `**Registrars:** Academic records offices at educational institutions.`,
      `**Accreditation Bodies:** Regional and professional accreditors.`,
      `**Testing Organizations:** Standardized testing and certification providers.`
    );
  } else if (analysis.isShipping) {
    issuers.push(
      `**Carriers:** Shipping lines, airlines, trucking companies, and railroads.`,
      `**Freight Forwarders:** International freight forwarders and NVOCCs.`,
      `**Customs Brokers:** Licensed customs brokers for trade documentation.`,
      `**Port Authorities:** Port operators for terminal and cargo documents.`
    );
  } else {
    issuers.push(
      `**Primary Issuers:** Organizations with direct authority to issue these documents.`,
      `**Licensed Professionals:** Professionals authorized to create and certify documents.`,
      `**Government Agencies:** Federal, state, or local agencies with jurisdiction.`,
      `**Industry Bodies:** Trade associations and professional organizations.`
    );
  }

  content += issuers.join('\n\n') + '\n\n';

  // Integration considerations
  content += `**System Integration**\n\n`;

  if (analysis.isInsurance) {
    content += `Insurance verification integrates with industry systems:\n\n`;
    content += `**Policy Administration Systems:** Core insurance systems generate verification hashes at policy issuance.\n\n`;
    content += `**ACORD Standards:** Insurance industry data standards could include verification fields.\n\n`;
    content += `**State Insurance Databases:** Regulators maintain databases for systematic hash receipt.\n\n`;
    content += `**Agent Portals:** Insurance agents access verification for client service.\n\n`;
  } else if (docCategory === 'realEstate') {
    content += `Real estate verification connects to property systems:\n\n`;
    content += `**Recording Systems:** County recorder systems for property document registration.\n\n`;
    content += `**MLS Integration:** Multiple listing services for property documentation.\n\n`;
    content += `**Title Plants:** Title companies maintain verification for title searches.\n\n`;
    content += `**E-Recording:** Electronic recording systems generate verification at recording.\n\n`;
  } else if (analysis.isShipping) {
    content += `Shipping verification integrates with trade systems:\n\n`;
    content += `**EDI Standards:** Electronic data interchange for trade documents (EDIFACT, X12).\n\n`;
    content += `**Port Community Systems:** Port system integration for cargo documentation.\n\n`;
    content += `**Customs Systems:** Integration with ACE, ABI, and customs clearance platforms.\n\n`;
    content += `**Carrier Systems:** Shipping line and freight forwarder system integration.\n\n`;
  } else if (docCategory === 'healthcare') {
    content += `Healthcare verification connects to clinical systems:\n\n`;
    content += `**EHR Systems:** Electronic health record systems generate verification hashes.\n\n`;
    content += `**Lab Information Systems:** Laboratory systems create verification for results.\n\n`;
    content += `**Health Information Exchanges:** Regional HIEs facilitate verification.\n\n`;
    content += `**FHIR Standards:** HL7 FHIR could incorporate verification endpoints.\n\n`;
  } else {
    content += `Verification integrates with relevant systems:\n\n`;
    content += `**Issuer Systems:** Core operational systems generate verification hashes at document creation.\n\n`;
    content += `**Industry Standards:** Existing data standards extended to include verification.\n\n`;
    content += `**Regulatory Systems:** Government databases for systematic hash receipt and oversight.\n\n`;
    content += `**Third-Party Platforms:** Industry portals and platforms enable verification access.\n\n`;
  }

  // Privacy and security considerations (if health or sensitive)
  if (docCategory === 'healthcare' || docCategory === 'immigration' ||
      title.toLowerCase().includes('medical') || title.toLowerCase().includes('health')) {
    content += `**Privacy Considerations**\n\n`;
    content += `Sensitive personal information requires special handling:\n\n`;
    content += `**Privacy Salt:** Random salt added to verification lines prevents hash enumeration attacks.\n\n`;
    content += `**Minimum Disclosure:** Verification response reveals only necessary information.\n\n`;
    content += `**Access Controls:** Verification endpoints implement appropriate access restrictions.\n\n`;
    content += `**Audit Logging:** Verification attempts logged for security and compliance.\n\n`;
  }

  return content.trim();
}

// Generate comprehensive markdown content
function generateMarkdownContent(jsonData) {
  const doc = jsonData[0] || jsonData;

  const title = doc.title || 'Use Case';
  const category = doc.category || 'Uncategorized';
  const volume = normalizeVolume(doc.volume || 'Small');
  const retention = doc.retention || 'As required';
  const dataVerified = doc.dataVerified || 'Document content';
  const dataVisibleAfter = doc.dataVisibleAfterVerification || 'Verification status';
  const rationale = doc.rationale || '';

  const docType = analyzeDocumentType(title);
  const docCategory = categorizeDocument(category, title);

  // Build document types section
  let documentTypesSection = '';
  if (docType.isPermit) {
    documentTypesSection = `**Permit Types:** Various permit subtypes may exist depending on jurisdiction and specific use.\n\n`;
  } else if (docType.isInsurance) {
    documentTypesSection = `**Policy Forms:** Different policy forms and endorsements may apply.\n\n`;
  } else if (docType.isCertificate) {
    documentTypesSection = `**Certificate Variations:** Multiple certificate types or levels may exist.\n\n`;
  }

  // Special considerations
  let specialConsiderations = '';
  if (title.toLowerCase().includes('multi-page') || docType.isAgreement || docType.isReport) {
    specialConsiderations += `**Multi-Page Handling:** Documents may span multiple pages. Per-page verification prevents page substitution attacks.\n\n`;
  }

  if (docCategory === 'healthcare' || title.toLowerCase().includes('medical') ||
      title.toLowerCase().includes('health') || docCategory === 'immigration') {
    specialConsiderations += `**Privacy Salt:** Sensitive personal information requires random salt in verification lines to prevent hash enumeration.\n\n`;
  }

  // Status indications
  let statusIndications = `**Status Indications:**
- **Valid** - Document verified and current
- **Expired** - Document has reached expiration
- **Revoked** - Document has been revoked or cancelled
- **Superseded** - A newer version exists`;

  if (docType.isInsurance) {
    statusIndications += `
- **Cancelled** - Policy cancelled before expiration
- **Non-Renewed** - Policy expired and not renewed`;
  } else if (docType.isPermit) {
    statusIndications += `
- **Suspended** - Permit temporarily suspended
- **Pending** - Permit application pending approval`;
  }

  statusIndications += `\n\n`;

  let markdown = `# ${title}

**Category:** ${category}
**Volume:** ${volume}
**Retention:** ${retention}

## Data Verified

${dataVerified}

${documentTypesSection}${specialConsiderations}`;

  markdown += `## Data Visible After Verification

${dataVisibleAfter}

${statusIndications}`;

  // Verification response may include additional context
  markdown += `The verification response may include additional context such as issue date, expiration date, or document serial numbers.\n\n`;

  // Second-Party Use
  markdown += `## Second-Party Use\n\n`;
  markdown += generateSecondPartyUse(category, title, docType);
  markdown += `\n\n`;

  // Third-Party Use
  markdown += `## Third-Party Use\n\n`;
  markdown += generateThirdPartyUse(category, title, docType);
  markdown += `\n\n`;

  // Verification Architecture
  markdown += `## Verification Architecture\n\n`;
  markdown += generateVerificationArchitecture(category, title, docType);

  if (rationale) {
    markdown += `\n\n## Rationale\n\n${rationale}`;
  }

  markdown += '\n';

  return markdown;
}

// Convert a single JSON file to markdown
function convertFile(jsonPath, forceOverwrite = false) {
  try {
    const baseName = getBaseName(jsonPath);
    const mdPath = jsonPath.replace('.json', '.md');

    // Skip if markdown already exists (unless force overwrite)
    if (!forceOverwrite && fs.existsSync(mdPath)) {
      console.log(`⏭  ${baseName}.md already exists, skipping (use --force to overwrite)`);
      return false;
    }

    // Read JSON file
    const jsonContent = fs.readFileSync(jsonPath, 'utf8');
    const jsonData = JSON.parse(jsonContent);

    // Generate markdown
    const markdown = generateMarkdownContent(jsonData);

    // Write markdown file
    fs.writeFileSync(mdPath, markdown, 'utf8');

    // Count lines for reporting
    const lineCount = markdown.split('\n').length;
    console.log(`✓ ${baseName}.md created (${lineCount} lines)`);
    return true;
  } catch (error) {
    console.error(`✗ Error processing ${jsonPath}: ${error.message}`);
    return false;
  }
}

// Main conversion process
function main() {
  const args = process.argv.slice(2);
  const forceOverwrite = args.includes('--force') || args.includes('-f');

  const dataDir = path.join(process.cwd(), 'public/use-cases');

  // Filter out special files
  const jsonFiles = glob.sync(path.join(dataDir, '*.json'))
    .filter(f => !f.includes('categories-summary.json') && !f.includes('verification-meta.json'));

  if (jsonFiles.length === 0) {
    console.error('No JSON files found in public/use-cases/');
    process.exit(1);
  }

  console.log(`Found ${jsonFiles.length} JSON files to process`);
  if (forceOverwrite) {
    console.log(`Force overwrite enabled - will regenerate all files\n`);
  } else {
    console.log(`Use --force to overwrite existing files\n`);
  }

  let converted = 0;
  let skipped = 0;

  for (const jsonFile of jsonFiles) {
    const result = convertFile(jsonFile, forceOverwrite);
    if (result) {
      converted++;
    } else {
      skipped++;
    }
  }

  console.log(`\n✓ Conversion complete!`);
  console.log(`  Created: ${converted} markdown files`);
  console.log(`  Skipped: ${skipped} (already exist)`);
  console.log(`  Total: ${jsonFiles.length}`);
}

main();

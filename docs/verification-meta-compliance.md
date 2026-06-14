# verification-meta.json: Compliance Metadata

Issuers can specify legal/regulatory requirements for how verification apps must handle captured data, via an optional `compliance` block in `verification-meta.json` (hosted at the issuer's verification base URL). This covers data retention, audit logging, applicable laws, abuse protection, and progressive guidance.

This is most relevant for high-security credentials (healthcare, law enforcement, government IDs) and multi-jurisdictional deployments needing GDPR, HIPAA, or CCPA compliance. Most issuers will omit the block entirely.

## Full example (healthcare worker badge)

```json
{
  "compliance": {
    "dataRetention": {
      "capturedImage": "DELETE_IMMEDIATELY",
      "ocrText": "DELETE_AFTER_VERIFICATION",
      "verificationHash": "NONE",
      "verificationResult": "RETAIN_7_DAYS",
      "auditLog": "RETAIN_1_YEAR"
    },
    "auditLogging": {
      "description": "Context-aware audit logging for healthcare verification. Hospitals are high-stress environments where verification can happen at any time—not just key treatment moments. Family members may challenge credentials during adversarial care disputes, safety concerns, or general distrust.",
      "logStructure": {
        "timestamp": "ISO 8601 format",
        "verificationResult": "VALID, SUSPENDED, EXPIRED, or UNKNOWN",
        "verifierRole": "Staff member / Family member / Visitor",
        "patientContext": "Patient identifier (hash or MRN, NOT plain name)",
        "treatmentContext": "Unit/area (ICU/OR/etc), NOT detailed medical info",
        "verifiedPersonRole": "Doctor title, specialty (e.g., 'Cardiologist'), NOT name/license number",
        "verificationContext": "Routine check / Pre-procedure consent / Care dispute / Safety concern / Unscheduled visit / Distrust/adversarial encounter",
        "purposeOfVerification": "Why verification was sought at this moment"
      },
      "examples": [
        {
          "timestamp": "2025-01-03T08:30:00Z",
          "scenario": "Routine pre-procedure verification",
          "verificationResult": "VALID",
          "verifierRole": "Family member",
          "patientContext": "Patient_8847",
          "treatmentContext": "OR preparation, pre-operative",
          "verifiedPersonRole": "Cardiologist (Arizona-licensed, on-duty)",
          "verificationContext": "Pre-procedure consent",
          "purposeOfVerification": "Family member confirming surgeon credentials before cardiothoracic procedure"
        },
        {
          "timestamp": "2025-01-03T14:45:00Z",
          "scenario": "Adversarial encounter during care dispute",
          "verificationResult": "VALID",
          "verifierRole": "Family member",
          "patientContext": "Patient_8847",
          "treatmentContext": "CCU",
          "verifiedPersonRole": "Cardiologist (Arizona-licensed, on-duty)",
          "verificationContext": "Care dispute/distrust",
          "purposeOfVerification": "Family member challenges physician credentials during disagreement over treatment plan"
        },
        {
          "timestamp": "2025-01-03T23:15:00Z",
          "scenario": "Safety concern, unscheduled visit",
          "verificationResult": "VALID",
          "verifierRole": "Family member",
          "patientContext": "Patient_8847",
          "treatmentContext": "CCU night shift",
          "verifiedPersonRole": "Nurse (RN, on-duty)",
          "verificationContext": "Unscheduled visit/safety check",
          "purposeOfVerification": "Family member verifies aide credentials during unexpected 11 PM entry to verify legitimacy of unannounced care"
        }
      ],
      "retention": "1 year (HIPAA medical record retention). Audit logs may document adversarial encounters—this is expected and appropriate when family members exercise verification rights during disputes over care."
    },
    "applicableLaws": [
      {
        "name": "HIPAA Privacy Rule",
        "condition": "if patient data visible in capture",
        "regulation": "45 CFR §164.500",
        "canonical": "https://www.hhs.gov/hipaa/for-professionals/privacy/index.html",
        "impact": "Captured badge images containing patient information must be deleted immediately. Audit logs retained for 1 year per medical record requirements."
      },
      {
        "name": "GDPR",
        "condition": "if EU user or data processed in EU",
        "articles": "Articles 5-6 (Processing Principles), Article 35 (Data Protection Impact Assessment)",
        "canonical": "https://gdpr-info.eu/",
        "impact": "Data minimization required. Only non-identifiable role/specialty verified, no provider names. User consent required before processing."
      },
      {
        "name": "CCPA",
        "condition": "if California resident",
        "statute": "California Consumer Privacy Act §1798.100+",
        "canonical": "https://oag.ca.gov/privacy/ccpa",
        "impact": "Consumer right to know/delete. Audit logs tied to patient encounter (not provider-identifiable). No sale of verification data."
      }
    ],
    "purposeLimitation": "Verification only. Cannot use captured data for ML training, analytics, or secondary purposes. Audit logs tied to specific patient encounters for treatment/compliance purposes only.",
    "dataMinimization": "App should not transmit captured image to issuer. Only hash and verification result. Audit logs must not include provider names, license numbers, or provider-specific identifiers—only role/specialty and verification status.",
    "userConsent": "App must notify user that verification data is being processed and retained per this policy. For family members: 'Your verification of this provider will be logged in patient's medical record as: [family member] verified [provider role] at [timestamp] '",
    "incidentReporting": "If verification app is compromised, issuer domain operator must be notified within 24 hours.",
    "contextualAwareness": "Verification audit logs should distinguish between: staff member verifying peer (internal audit), family member verifying provider (patient safety), visitor verification (security). Each has different retention and privacy implications.",
    "abuseProtection": {
      "description": "Protections against 'First Amendment auditors' and bad-faith verification abuse. Verification is legitimate, but systematic harassment via verification is not.",
      "reasonableVerification": [
        "Family member verifying provider once before treatment",
        "Citizen verifying officer legitimacy during traffic stop",
        "Patient verifying nurse during unexpected room entry",
        "Staff member verifying peer credentials occasionally"
      ],
      "harassmentPatterns": [
        "Same person verifying same staff member 5+ times in one shift (tracking)",
        "Repeated verification attempts with incrementally delayed times (movement mapping)",
        "Systematic attempts to verify all staff at facility (roster enumeration attack)",
        "Verification requests targeting specific individuals based on name/identity (targeted harassment)",
        "Flood verification attempts to probe endpoint vulnerabilities"
      ],
      "rateLimiting": {
        "perUser": "Maximum 3 verification requests per user per staff member per 24 hours (app-level user consent)",
        "perStaff": "CRITICAL: Monitor badge verification frequency at facility level. Alert security if same staff member receives 5+ verification attempts in 5 minutes (real-time targeting detection). This is NOT app-level rate limiting—this is facility monitoring triggering immediate security response.",
        "perIPAddress": "NOT EFFECTIVE in practice (all facility staff behind NAT share same public IP). Do NOT rely on IP-based rate limiting.",
        "escalation": "Upon detection of rapid verification attempts on a staff member: (1) Consider alerting facility security to conduct welfare check on staff member's location, (2) Notify staff member and management, (3) Document incident for potential harassment/stalking report to law enforcement if pattern continues."
      },
      "legalFramework": {
        "description": "Emerging laws protect staff from verification-based harassment. Issuers should document abuse prevention in compliance metadata.",
        "applicableStatutes": [
          {
            "law": "Harassment/Cyberstalking Statutes",
            "applies": "Repeated verification attempts targeting specific person may constitute harassment or stalking under state law (varies by jurisdiction)"
          },
          {
            "law": "Workplace Violence Prevention Laws",
            "applies": "Healthcare facilities, law enforcement can restrict verification in abusive/confrontational contexts under workplace safety rules"
          },
          {
            "law": "Interference with Public Employees",
            "applies": "Some jurisdictions: deliberately provoking confrontations via verification scanning may constitute interference with officer/employee duties"
          },
          {
            "law": "Computer Fraud & Abuse Act (CFAA)",
            "applies": "US law: automated verification scraping or flood attacks may constitute 'unauthorized access' under CFAA §1030"
          }
        ]
      },
      "appGuidance": [
        "Apps should display rate-limit warnings: 'You've verified this person 3 times today. Additional requests may be flagged as suspicious.'",
        "Apps should NOT enable batch verification or allow scripts to automate verification requests",
        "Apps should warn users if verification pattern resembles stalking/tracking (same person multiple times, different times)",
        "Apps should provide 'report abuse' button if user believes verification is being weaponized against staff member"
      ],
      "issuerGuidance": [
        "Facility-level monitoring: Issuers (hospitals, police departments) must actively monitor verification endpoint for rapid-fire attempts on single staff members. Set alerts at 5+ attempts in 5 minutes.",
        "Real-time dispatch: Upon alert, consider automatic notification of facility security to conduct welfare check on staff member's location. Do NOT wait for staff to self-report harassment—treat rapid verification as potential active targeting and escalate accordingly.",
        "App-level guidance: Transparent rate limiting in verification-meta.json for user consent (3 per day), but do NOT rely on app to stop abuse—facility monitoring is primary defense.",
        "Documentation: Log all verification patterns (who verified whom, when, from where if available). Correlate with any harassment/threat reports. This becomes evidence if legal escalation needed.",
        "Policy clarification: Document that 'legitimate verification for lawful purpose' (one scan before treatment, one check during traffic stop) is protected. Systematic targeting (20+ attempts, movement tracking, roster enumeration) is not."
      ]
    },
    "progressiveGuidance": {
      "description": "Context-sensitive guidance URLs triggered at verification frequency thresholds. Allows issuers to provide educational, warning, and legal framework resources at escalating frequency levels. Apps track verification attempts per staff member and offer corresponding guidance URLs.",
      "implementation": "App tracks cumulative verification attempts for same staff member and presents guidance URL (as modal, banner, or link) when threshold is reached. Frequency counter resets per 24-hour period.",
      "thresholds": [
        {
          "requestNumber": 1,
          "guidanceUrl": "https://issuer-domain.org/guidance/first-verification",
          "purpose": "Educational: explain legitimate verification use cases and appropriate contexts",
          "exampleContent": "What is verification? When is it appropriate? This badge proves this person is authorized to be here. You can verify them for lawful purposes like confirming credentials before treatment, checking during security incident, or during care discussions."
        },
        {
          "requestNumber": 3,
          "guidanceUrl": "https://issuer-domain.org/guidance/repeated-verification",
          "purpose": "Warning: notify user that repeated verification may indicate concerning pattern",
          "exampleContent": "You've verified this person 3 times in the last 24 hours. If you're verifying the same person repeatedly without a specific new reason, this may be flagged by facility security as a potential targeting or stalking pattern."
        },
        {
          "requestNumber": 10,
          "guidanceUrl": "https://issuer-domain.org/guidance/harassment-law",
          "purpose": "Legal framework: explain harassment/stalking statutes and escalation procedures",
          "exampleContent": "Repeated verification attempts may constitute harassment or stalking under state law. Facility security monitors for patterns like 5+ attempts in 5 minutes (real-time targeting). If you believe someone is using verification to harass staff, report to facility security or law enforcement."
        }
      ],
      "exampleImplementation": {
        "scenario": "User verifies same staff member multiple times",
        "firstRequest": {
          "requestCount": 1,
          "action": "Show educational guidance: display banner or modal linking to first guidance URL",
          "userExperience": "'This badge is verified. Learn when verification is appropriate.' [Learn more]"
        },
        "thirdRequest": {
          "requestCount": 3,
          "action": "Show warning guidance: display banner or modal linking to repeated verification guidance",
          "userExperience": "'You've verified this person 3 times. Repeated verification without new reason may be flagged.' [Learn more]"
        },
        "tenthRequest": {
          "requestCount": 10,
          "action": "Show legal guidance: display prominent notice with escalation procedures",
          "userExperience": "'Repeated verification attempts may violate harassment or stalking laws. See facility security.' [Legal Framework]"
        }
      },
      "designNotes": "Progressive guidance avoids hard-coded warnings in app code. Instead, issuers customize guidance URLs for their jurisdiction, organization, and context. URLs can link to facility-specific policies, legal frameworks, abuse reporting forms, or educational materials. This approach provides flexibility while maintaining consistent user experience across different issuer domains.",
      "adoptionNote": "Progressive guidance is optional and best suited for jurisdictions with specific legal frameworks around verification rights or organizations with documented verification abuse patterns. Most issuers will omit these URLs entirely to keep verification flows streamlined and user-friendly. The primary abuse defense is facility-level monitoring (detecting rapid-fire attempts and triggering security welfare checks), not user-facing warnings. Don't enable progressive guidance unless you have a specific reason."
    },
    "notes": "Healthcare credentials: Captured badge image must not be stored if it contains patient-visible information. Audit logs MUST be contextualized to patient encounter, not provider-centric. Police credentials: Do not retain verification requests or movement tracking. All contexts: Verification is legitimate for authorized purposes, but systematic harassment via verification is not and may violate harassment/stalking laws. Progressive guidance is optional—most issuers will omit it to keep flows clean."
  }
}
```

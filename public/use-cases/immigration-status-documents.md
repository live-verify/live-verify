---
title: "Immigration Status Documents"
category: "Immigration & Visa Documents"
volume: "Medium (aggregate)"
retention: "Varies (visa validity to permanent)"
slug: "immigration-status-documents"
verificationMode: "clip"
tags: ["green-card", "i-551", "naturalization-certificate", "visa-status", "uscis", "immigration-verification", "i-9-compliance"]
furtherDerivations: 1
---

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 1px solid #ccc; background: #fff; padding: 0; box-shadow: 0 4px 10px rgba(0,0,0,0.1); overflow: hidden;">
  <div style="background: #002d62; color: #fff; padding: 20px; display: flex; align-items: center; justify-content: space-between;">
    <div>
      <div style="font-weight: bold; font-size: 1.1em;"><span verifiable-text="start" data-for="im-status"></span>U.S. CITIZENSHIP & IMMIGRATION</div>
      <div style="font-size: 0.8em;">Permanent Resident Card (I-551)</div>
    </div>
    <div style="font-size: 1.5em;">🦅</div>
  </div>
<div style="padding: 20px; display: flex;">
    <div style="width: 120px; margin-right: 20px;">
      <div style="width: 120px; height: 150px; background: #eee; border: 1px solid #ccc; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: #777;">[PHOTO]</div>
    </div>
    <div style="flex-grow: 1;">
      <div style="font-size: 1.2em; font-weight: bold; margin: 0 0 5px 0;">DOE, JOHN JACOB</div>
      <div style="font-size: 0.9em; color: #333; line-height: 1.5;">
        <strong>USCIS #:</strong> 992-288-776<br>
        <strong>Birth Date:</strong> 05/15/1985<br>
        <strong>Resident Since:</strong> 01/01/2020<br>
        <strong>Expires:</strong> 01/01/2030
      </div>
    </div>
  </div>
<div style="padding: 0 20px 20px 20px;">
    <div style="font-size: 0.8em; font-weight: bold; color: #002d62; text-align: center; margin-bottom: 5px;">UNITED STATES OF AMERICA</div>
    <div data-verify-line="im-status" style="border-top: 1px dashed #999; padding-top: 5px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
      title="Demo only: USCIS doesn't yet offer verification&#10;endpoints, so this is illustrative">
      <span data-verify-line="im-status">verify:uscis.gov/status/v</span> <span verifiable-text="end" data-for="im-status"></span>
    </div>
  </div>
</div>

## The Problem: Black Market Fraud

- **Novice Fakes:** Realistic-looking plastic cards sold online for $200. These lack the cryptographic link to `uscis.gov`.
- **Identity Swapping:** Using a "Clean" person's A-number and editing the photo on the card.
- **Revocation Hiding:** A person who was deported last month keeping their physical Green Card to return to the U.S. and find work.

## What Is Checked

Full name, Alien Registration Number (A-Number), Date of birth, Country of birth, Resident Since date, Card expiration date, Visa Category (e.g., IR1, EB2), Photo (via hash), Fingerprint status (hash), Issuing USCIS office.

**Document Types:**
- **Green Card (I-551):** Proof of permanent residency.
- **Naturalization Certificate (N-550):** Proof of citizenship.
- **I-797 Approval Notice:** Proving a pending or approved petition.
- **Advance Parole (I-512L):** Travel authorization for pending applicants.

## What the Checker Sees

Shows the issuer domain (`uscis.gov`) and real-time legal standing.

**Status Indications:**
- **Active** — Bearer has valid legal status in the U.S.
- **Terminated** — Status has been revoked (e.g., due to criminal conviction).
- **In-Removal** — Bearer is currently in deportation proceedings.
- **Expired** — Card is no longer valid; renewal or status proof required.

## Who Holds It

The Named Individual benefits from verification.

**Identity Protection:** Proving their status to a landlord, bank, or employer without handing over the high-value physical card (which costs $540+ to replace if lost). A verified digital hash allows the holder to keep the original in a safe deposit box.

**Domestic Travel:** Proving legal residency to TSA or local police during domestic travel, especially in "Border Zones" where proof of status is legally required.

## Who Checks It

**Employers (I-9 Compliance)**
**Zero-Trust Onboarding:** Instantly verifying that a candidate's Green Card isn't a "High-Quality Forgery." Black-market cards look perfect to the eye; Live Verify connects the manager directly to the USCIS record in seconds.

**Mortgage Lenders**
**Loan Eligibility:** Verifying that a borrower is a "Lawful Permanent Resident," which is a mandatory requirement for most Fannie Mae/Freddie Mac conforming loans.

**Local Police (Traffic Stops)**
**Status Verification:** Confirming the legal status of an individual during a stop in jurisdictions that coordinate with federal immigration authorities.

## Who Issues It

**Issuer Types** (First Party)

**U.S. Citizenship and Immigration Services (USCIS).**
**DHS SAVE System:** (The backend data source).
**National Registries:** (In other countries, e.g., UK Home Office).

**Privacy Salt:** ABSOLUTELY CRITICAL. Immigration data is a high-value target for hackers and activists. The hash MUST be salted to prevent "Guess-and-Check" attacks to map the entire immigrant population.

## Authority Chain

**Pattern:** Sovereign

```
✓ uscis.gov/status/verify — Administers US immigration and naturalization
  ✓ usa.gov/verifiers — US federal government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Where Each Fits: Live Verify and E-Verify / SAVE

E-Verify and SAVE are US federal systems run by USCIS: E-Verify lets enrolled employers confirm work eligibility, and SAVE lets registered government agencies, such as benefit offices and DMVs, confirm immigration status. Other countries run their own status checks, some online and some not, and many offer third parties nothing at all. The official systems and Live Verify answer different questions and work side by side: one queries the government's record directly, the other lets whoever is handed a card or letter confirm that the issuing authority stands behind it.

| | E-Verify / SAVE | Live Verify on the status document | Physical card alone |
| :--- | :--- | :--- | :--- |
| **Who can check** | Employers enrolled in E-Verify; agencies registered with SAVE. | Anyone handed the document: a landlord, a bank, a lawyer, a small employer. | Whoever is looking at it, by eye. |
| **What the checker gets** | A result from the government's own record, which reflects the person's current status. Some cases are referred for further review before a final answer. | Confirmation that the authority issued this exact document, as at its date, and whether it has since been revoked. | A card that may be a high-quality forgery. |
| **What the holder shares** | Personal details entered by the employer or agency into the federal system. | Only the document they chose to hand over. | The card itself. |
| **Reach** | The United States only, and only to enrolled or registered parties. | Global in principle: any immigration authority, in any country, that publishes hashes on its own domain. | Anywhere, but untrusted. |
| **Speed and cost** | Many checks return quickly once enrolled; cases needing manual review can take days. | A few seconds per check: one web lookup, with no fee to the standard and no account with the authority. | Immediate. |
| **What it needs** | Enrollment or a registration agreement with the federal program. | The authority to publish hashes, and Live Verify-aware software on the checker's device. No immigration authority does this yet. | Nothing. |
| **Best suited to** | Form I-9 work-eligibility checks and benefit eligibility decisions, where the law expects them. | Landlords, lenders, lawyers and others outside the federal programs who only have the document in hand. | Nothing where status matters. |

**Where each fits:** USCIS, SAVE and other official status systems should remain primary where they are directly available and legally appropriate. Live Verify is a complementary bridge for copy and card workflows, where banks, landlords, DMV clerks or other third parties only have the immigration document in hand and would otherwise fall back to visual inspection. It confirms what the authority issued, as at its date; it is not a substitute for a current-status query where the law requires one.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).

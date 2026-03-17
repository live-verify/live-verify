---
title: "Work Permits & Work Visas"
category: "Immigration & Visa Documents"
volume: "Very Large"
retention: "1-5 years (renewal cycle, varies by jurisdiction)"
slug: "work-permits"
verificationMode: "clip"
tags: ["work-permit", "work-visa", "employment-authorization", "immigration", "labor-mobility", "employer-sponsorship"]
furtherDerivations: 1
---

## What is a Work Permit?

A **work permit** is the document a country issues to a non-citizen authorizing them to take paid employment. Nearly every nation on earth requires one in some form—visa sticker, plastic card, digital grant notice, or stamped labour card. The ILO estimates roughly 170 million international migrant workers worldwide; each one holds (or should hold) a document proving their right to work.

The core question is always the same: **is this person legally allowed to work here, right now?**

That question is asked thousands of times a day—by employers making hiring decisions, by labour inspectors visiting job sites, by banks opening accounts, by landlords signing leases. And in most countries, the answer still depends on staring at a physical card or printout and hoping it's genuine.

Live Verify turns any work permit into a live link to the issuing authority's database. Scan the `verify:` line, get a real-time status. No government portal login, no phone calls, no guesswork.

<div style="max-width: 420px; margin: 24px auto; font-family: sans-serif; border: 1px solid #ccc; border-radius: 12px; background: #fff; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.2);">
  <div style="background: #1a5276; color: #fff; padding: 15px; display: flex; align-items: center; justify-content: space-between;">
    <div>
      <div style="font-weight: bold; font-size: 1.1em;"><span verifiable-text="start" data-for="wp"></span>REPUBLIC OF NORDIA</div>
      <div style="font-size: 0.8em;">Employment Authorisation Permit</div>
    </div>
    <div style="width: 44px; height: 44px; background: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #1a5276; font-weight: bold; font-size: 0.65em; text-align: center;">MoL</div>
  </div>
  <div style="padding: 20px; display: flex;">
    <div style="width: 100px; margin-right: 15px;">
      <div style="width: 100px; height: 125px; background: #eee; border: 1px solid #ccc; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: #777;">[PHOTO]</div>
    </div>
    <div style="flex-grow: 1;">
      <div style="font-size: 1.1em; font-weight: bold; margin: 0 0 5px 0;">JANSEN, MARTA ELENA</div>
      <div style="font-size: 0.85em; color: #333; line-height: 1.4;">
        <strong>Permit #:</strong> NWP-2025-448291<br>
        <strong>Employer:</strong> Nordian Logistics AG<br>
        <strong>Occupation:</strong> Supply Chain Analyst<br>
        <strong>Expires:</strong> 30/11/2027
      </div>
    </div>
  </div>
  <div style="padding: 0 20px 20px 20px;">
    <div style="font-size: 0.8em; font-weight: bold; color: #1a5276; text-align: center; margin-bottom: 5px;">MINISTRY OF LABOUR — NORDIA</div>
    <div data-verify-line="wp" style="border-top: 1px dashed #999; padding-top: 5px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;">
      <span data-verify-line="wp">verify:labour.gov.nd/wp/v</span> <span verifiable-text="end" data-for="wp"></span>
    </div>
  </div>
</div>

## International Landscape

Work authorization systems vary enormously, but they share the same verification problem: employers and officials need to trust what a piece of paper (or plastic) says.

**United States**
Employment Authorization Document (EAD / Form I-766), H-1B approval notices, OPT cards, Permanent Resident Cards. Verification via E-Verify (employer portal) and SAVE (government-to-government). See the deep-dive: [Employment Authorization Documents (EAD) — United States](employment-authorization-ead).

**United Kingdom**
Biometric Residence Permit (BRP), now transitioning to eVisas. Employers use the Home Office "Share Code" online right-to-work check. Physical BRPs are being phased out by 2025, but millions remain in circulation.

**European Union**
EU Blue Card (high-skilled), national work permits per member state, Single Permit Directive combining residence and work authorization in one document. Each member state issues its own card, creating 27 different document formats for the same conceptual permit.

**Canada**
Work Permit issued by IRCC, often tied to a Labour Market Impact Assessment (LMIA). Open work permits (not employer-tied) vs. employer-specific permits. No centralized employer-facing verification portal.

**Australia**
Visa grant notification letters (subclass 482 Temporary Skill Shortage, 494 Skilled Employer Sponsored Regional, 189/190 skilled migration). Verification via VEVO (Visa Entitlement Verification Online) — one of the more advanced government systems.

**Gulf States (UAE, Saudi Arabia, Qatar)**
Work permits under the kafala (sponsorship) system. Labour cards, residence-work permits tied to a specific sponsor-employer. Workers often cannot verify their own status independently—a systemic power imbalance the kafala system creates.

**Singapore**
Employment Pass (professionals), S Pass (mid-skilled), Work Permit (semi-skilled). Ministry of Manpower operates an online verification portal. Employers can check pass status; workers can check their own.

## Data Verified

Common elements across jurisdictions: full name, permit/visa number, employer name (if tied), job title or occupation code, validity start date, expiration date, issuing authority and office, nationality, restrictions or conditions.

**Document Types:**
- **Plastic cards:** EAD (US), BRP (UK), national ID-format permits (EU, Singapore)
- **Paper/letter grants:** Visa grant notifications (Australia), LMIA-based permits (Canada)
- **Labour cards:** Gulf states, some Asian jurisdictions
- **Digital-only:** eVisas (UK transition), online grant records (increasingly common)

**Privacy Salt:** Critical for all work permit verification. Immigration status is highly sensitive personal data. The hash MUST be salted to prevent enumeration attacks that could expose undocumented workers or reveal employer-employee relationships.

## Verification Response

The endpoint returns a status code:

- **OK** — Permit is valid; bearer is authorized to work
- **EXPIRED** — Permit has passed its expiration date; renewal required
- **REVOKED** — Authorization terminated (visa cancelled, deportation order, employer fraud)
- **SUSPENDED** — Temporarily inactive (under review, investigation, or administrative hold)
- **EMPLOYER_CHANGED** — Permit was employer-tied and bearer is no longer with that employer; may not be valid for current employment
- **RESTRICTED** — Valid but with conditions (specific employer, specific occupation, geographic area, hours)
- **404** — Permit not found (forged document, wrong number, or OCR error)

The issuer domain is visible from the `verify:` line on the permit itself (e.g., `labour.gov.nd`).

## Post-Verification Actions

None typically. The verification confirms work authorization status; that's the decision point.

Some jurisdictions may link to employer obligation pages (e.g., "You are now required to retain a copy of this check for 2 years" under UK right-to-work rules), but these are informational—the status code is the value.

## Second-Party Use

The **Worker** benefits from verification.

**Proving Right to Work:** A worker presenting their permit to a new employer can demonstrate it's genuine and current—not expired, not revoked, not tied to a previous employer. This removes the employer's hesitation and speeds up hiring.

**Bank Account Opening:** In many countries, opening a bank account requires proof of legal status. A verified work permit satisfies KYC requirements without handing over the physical card or leaving photocopies in a file.

**Renting a Home:** Landlords in the UK, EU, and Gulf states routinely ask for proof of immigration status. A verified permit lets the worker prove their status without surrendering the document itself.

**Avoiding Document Surrender:** Under kafala systems and in some other jurisdictions, employers illegally confiscate workers' passports and permits. A digital verification link means the worker can prove status to third parties (banks, hospitals, police) even without the physical document.

## Third-Party Use

**Employers (HR / Hiring Managers)**
**Right-to-Work Compliance:** The primary use case globally. Employers face fines—sometimes criminal liability—for hiring unauthorized workers. In the UK, penalties reach £45,000 per illegal worker. In the US, I-9 violations can cost thousands per employee. Live Verify gives any employer instant, phone-based verification without needing access to government portals.

**Banks and Financial Institutions**
**KYC / Account Opening:** Verifying that a non-citizen customer holds valid work authorization, as required by anti-money laundering regulations. Many banks currently accept photocopies—easily forged.

**Landlords and Letting Agents**
**Tenancy Right-to-Rent Checks:** In the UK (Immigration Act 2014), landlords must verify a tenant's right to rent. Similar obligations exist in other jurisdictions. Currently relies on the Share Code system or physical document inspection.

**Labour Inspectorates**
**Workplace Audits:** Government inspectors visiting construction sites, farms, factories, and restaurants can verify worker permits on-site in seconds, rather than collecting documents for later review.

**Law Enforcement**
**Identity and Status Checks:** During routine encounters or investigations, officers can verify work authorization status without contacting immigration authorities by phone.

## Verification Architecture

**The Work Permit Fraud Problem**

Work permit fraud is a global industry. Common patterns:

- **High-quality forgeries:** Professional-grade fake EADs, BRPs, and labour cards. Some are visually indistinguishable from genuine documents. A cottage industry in every country with significant immigration.
- **Expired permits presented as current:** The most common form of fraud. A worker whose visa expired continues using the physical card, which still "looks" valid.
- **Employer-tied permits used after changing jobs:** In systems where the permit is tied to a specific employer (kafala, many H-1B situations), the worker changes jobs but continues presenting the old permit.
- **Borrowed or shared permits:** A worker with no authorization uses someone else's permit, relying on the employer not checking the photo carefully.
- **Category tampering:** Altering a restricted permit (e.g., "student, 20 hours/week") to appear unrestricted.
- **Kafala system abuse:** Sponsors cancelling permits without the worker's knowledge, leaving them undocumented. Or workers fleeing abusive sponsors and working on cancelled permits because they have no alternative.

**Issuer Types**

Work permits are issued exclusively by government authorities:
- **Immigration ministries:** USCIS (US), Home Office (UK), IRCC (Canada), DHA (Australia)
- **Labour ministries:** Ministry of Manpower (Singapore), Ministry of Human Resources (UAE, Saudi)
- **Combined authorities:** Many EU states combine residence and work permits under a single agency

**Privacy Salt:** Absolutely critical. Immigration data is among the most sensitive personal information. Hash enumeration attacks could be used to identify undocumented workers, map employer-employee relationships, or target vulnerable populations. All work permit hashes must include issuer-generated random salt.

## Authority Chain

**Pattern:** Sovereign

Immigration and labour authorities hold statutory power to grant work permits and employment authorizations.

```
✓ gov.uk/check-work-permit/verify — Issues work permits and employment authorizations
```

Self-authorized — this is a sovereign body whose authority derives from statute.

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Competition vs. Existing Systems

| Feature | Live Verify | Government Portals (E-Verify, VEVO, Share Code) | Physical Document Inspection |
| :--- | :--- | :--- | :--- |
| **Access** | **Open.** Anyone with a phone camera. | **Restricted.** Requires employer registration, login credentials, training. | **Open.** Anyone can look at a card. |
| **Trust** | **Domain-bound.** Cryptographically tied to issuing authority's domain. | **High.** Direct database access. | **Low.** Visual inspection only; forgeries pass. |
| **Speed** | **Instant.** 5-second scan. | **Minutes to days.** Portal login, data entry, sometimes "manual review" queues. | **Instant.** But unreliable. |
| **Coverage** | **International.** Any issuer in any country can publish. | **Single-country.** Each portal serves one jurisdiction. | **International.** But no verification. |
| **Worker Privacy** | **High.** Hash-based; no data upload. | **Low.** Full personal data entered into government systems. | **Medium.** Photocopies often retained. |
| **Small Business Access** | **Yes.** No registration needed. | **Often no.** Many small employers don't register for government portals. | **Yes.** But no fraud protection. |

**Why Live Verify wins here:** The problem isn't that verification systems don't exist—it's that they're siloed, complex, and inaccessible. A restaurant owner in London can't use Australia's VEVO. A Canadian farmer can't access E-Verify. A UAE construction foreman has no portal at all. Live Verify creates a universal pattern: scan the card, check the domain, get the status. Every country, every employer, every phone.

## Country-Specific Deep Dives

- [Employment Authorization Documents (EAD) — United States](employment-authorization-ead)

---
title: "Workplace Postings"
category: "Professional & Occupational Licenses"
type: "use-case"
slug: "workplace-postings"
beneficiary: "Employees"
verificationMode: "camera"
tags: ["workplace", "labor-law", "safety", "mandatory", "employees", "osha", "fmla", "eeoc", "nlra"]
furtherDerivations: 1
---

## What are Workplace Postings?

Mandatory workplace postings are government-required notices that inform workers of their rights regarding safety, wages, discrimination, and leave. These must be posted in conspicuous locations accessible to all employees, typically employee breakrooms, hallways, or near time clocks.

The problem is that these posters are often outdated or even fraudulent. Employers may fail to update posters when laws change, or private vendors may sell expensive poster bundles that are actually free from the government.

This is therefore primarily a publication-distribution problem. The best fix is usually a direct official URL, QR code, or stable agency PDF page. Live Verify is only a secondary fit if the goal is to make the physical poster itself a human-readable bridge to the official source without relying on an opaque code.

<div style="max-width: 500px; margin: 24px auto; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; border: 2px solid #003366; background: #fff; padding: 0; box-shadow: 0 4px 12px rgba(0,0,0,0.1); overflow: hidden;">
  <div style="background: #003366; color: #fff; padding: 15px; text-align: center;">
    <h2 style="margin: 0; text-transform: uppercase; font-size: 1.2em; letter-spacing: 1px;"><span verifiable-text="start" data-for="osha"></span>JOB SAFETY AND HEALTH</h2>
    <div style="font-size: 0.9em; font-weight: bold; margin-top: 5px;">IT'S THE LAW!</div>
  </div>
<div style="padding: 20px; font-size: 0.85em; line-height: 1.4; color: #333;">
    <div style="display: flex; align-items: flex-start; margin-bottom: 15px;">
      <div style="font-size: 2em; margin-right: 15px;">⚠️</div>
      <div>
        <strong>All workers have the right to:</strong>
        <ul style="margin: 5px 0; padding-left: 20px;">
          <li>A safe workplace.</li>
          <li>Raise a safety or health concern with your employer or OSHA.</li>
          <li>Receive information and training on job hazards.</li>
        </ul>
      </div>
    </div>
<div style="background: #f9f9f9; border: 1px solid #eee; padding: 10px; border-radius: 4px; margin-bottom: 15px;">
      <strong>Employers must:</strong> Provide a workplace free from recognized hazards. It is illegal to retaliate against an employee for using any of their rights under the law.
    </div>
<div style="text-align: center; font-size: 0.8em; color: #666; border-top: 1px solid #eee; padding-top: 10px;">
      For more information, contact OSHA at 1-800-321-OSHA (6742).
    </div>
  </div>
<div style="padding: 15px; background: #fff; border-top: 1px dashed #999; text-align: center;">
    <div data-verify-line="osha" style="font-family: 'Courier New', monospace; font-size: 0.85em; color: #003366; font-weight: bold;"
      title="Demo only: OSHA doesn't yet offer verification&#10;endpoints, so this is illustrative">
      <span data-verify-line="osha">verify:osha.gov/posters/v</span> <span verifiable-text="end" data-for="osha"></span>
    </div>
  </div>
</div>

## The Problem: Outdated or Altered Posters

A worker reading the breakroom wall, or a labor inspector walking through, has no quick way to tell whether a posted notice is the agency's current text. Employers leave old posters up when the law changes, and some buy poster bundles from private vendors without knowing whether the content is official. Workers then rely on a wrong wage figure or never learn of a right the poster should have told them about. The simplest remedy is usually a direct link to the agency's current poster; checking the printed text against the agency's domain is a secondary aid for the physical copy.

- **Outdated information:** A 2022 minimum wage poster still on the wall in 2026.
- **Selective deletion:** A section, such as the statement of union rights, removed from a required poster.
- **Compliance scams:** Vendors pressing businesses to buy "certified" posters that are home-printed copies of notices the government provides free.

## Key Examples

### Health & Safety (OSHA)
*   **Purpose:** Inform workers of their right to a safe workplace and how to report hazards.
*   **Risk:** Fake posters might omit the right to request an inspection or list an internal HR number instead of the official hotline.

### Wages & Hours (FLSA)
*   **Purpose:** Display current federal/state minimum wage and overtime rules.
*   **Risk:** "Wage theft" via altered posters that misstate the "Tip Credit" or overtime eligibility.

### Employee Rights & Leave (FMLA, PUMP Act)
*   **Purpose:** Detail rights to unpaid, job-protected leave or lactation accommodations.
*   **Risk:** Employers inflating eligibility requirements to discourage leave.

## Who Issues It

**Issuer Types** (First Party)

**Federal Agencies (DOL, OSHA, EEOC).**
**State Departments of Labor.**
**Municipal Labor Standards Offices.**

## Authority Chain

**Pattern:** Sovereign

In the United States, the Occupational Safety and Health Administration, part of the Department of Labor, publishes the official workplace safety poster that employers must display.

```
✓ osha.gov/posters/v — OSHA official workplace poster service
  ✓ dol.gov — US Department of Labor
    ✓ usa.gov/verifiers — US federal government root namespace
```

Other countries differ. In Great Britain, the Health and Safety Executive issues the health and safety law poster under the Health and Safety at Work etc. Act 1974, and the chain would run from `hse.gov.uk` to `gov.uk/verifiers`.

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Rationale

Workplace postings are the "Bill of Rights" for the breakroom. But the main product here is still the agency's current poster page. A verification layer is only secondary to that simpler direct-link distribution model.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).

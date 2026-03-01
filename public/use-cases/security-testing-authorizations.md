---
title: "Security Testing Authorizations"
category: "Delegated Authority"
volume: "Medium"
retention: "Duration of engagement + 6 years"
slug: "security-testing-authorizations"
tags: ["pentest", "penetration-testing", "bug-bounty", "red-team", "security-research", "authorization"]
furtherDerivations: 0
---

## What is a Security Testing Authorization?

Penetration testers, bug bounty hunters, and red team operators do things that would otherwise be illegal — probing systems, exploiting vulnerabilities, accessing data without permission. The **authorization letter** is their legal protection: proof they had permission to attack.

Without it, they're committing computer crimes. With it, they're performing a legitimate security service.

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 1px solid #8B0000; background: #fff; padding: 0;">
  <div style="background: #8B0000; color: #fff; padding: 15px;">
    <div style="font-weight: bold; font-size: 1.1em;"><span verifiable-text="start" data-for="securitytestingautho">[</span>PENETRATION TEST AUTHORIZATION</div>
    <div style="font-size: 0.8em;">Security Testing Scope & Permission</div>
  </div>
  <div style="padding: 20px; font-size: 0.9em; line-height: 1.6;">
    <p><strong>Client:</strong> Meridian Financial Services Ltd<br>
    <strong>Tester:</strong> SecureProbe Ltd (Claire Watson, Lead Tester)<br>
    <strong>Engagement ID:</strong> PT-2026-0042<br>
    <strong>Authorization Date:</strong> February 1, 2026</p>
<div style="background: #fff5f5; padding: 15px; margin: 15px 0; border: 1px solid #8B0000;">
      <p style="margin: 0;"><strong>Scope of Authorization:</strong></p>
      <p style="margin: 10px 0 0;"><strong>In scope:</strong></p>
      <p style="margin: 5px 0 0;">• app.meridian-fs.com (production web application)</p>
      <p style="margin: 5px 0 0;">• api.meridian-fs.com (REST API endpoints)</p>
      <p style="margin: 5px 0 0;">• 192.168.1.0/24 (internal network segment)</p>
      <p style="margin: 10px 0 0;"><strong>Out of scope:</strong></p>
      <p style="margin: 5px 0 0;">• Third-party payment processor integrations</p>
      <p style="margin: 5px 0 0;">• Physical security testing</p>
      <p style="margin: 5px 0 0;">• Social engineering of staff</p>
      <p style="margin: 10px 0 0;"><strong>Testing window:</strong> February 15-28, 2026, 09:00-18:00 GMT</p>
    </div>
<p style="font-size: 0.85em; color: #666;">Authorized by: James Morton, CISO<br>
    On behalf of: Meridian Financial Services Ltd</p>
<div style="margin-top: 15px; font-size: 0.8em; font-family: monospace; text-align: center; color: #666; border-top: 1px dashed #ccc; padding-top: 10px;">
      <div data-verify-line="securitytestingautho" style="border-top: 1px dashed #999; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
        title="Demo only: This is an illustrative example of the verification line">
        verify:meridian-fs.com/security <span verifiable-text="end" data-for="securitytestingautho">]</span>
      </div>
    </div>
  </div>
</div>

## Why External Verification Matters

**The tester's problem:**
- Client's security team detects "attack" and calls police
- Hosting provider sees suspicious traffic, suspends access
- Third-party (cloud provider, CDN) blocks tester's IP
- Months later, client denies authorizing the test

**Without verification:** Tester has a PDF that could be forged. Police must investigate. Tester's reputation at risk.

**With verification:** Third party scans authorization → confirms on client's domain → "carry on, this is legitimate."

## Data Verified

**Client name**, **tester/firm name**, **engagement ID**, **scope** (in-scope systems, out-of-scope exclusions), **testing window** (dates and times), **authorizing officer**, **authorization date**.

## Data Visible After Verification

**Status Indications:**
- **Active** — Testing currently authorized within window
- **Scheduled** — Authorization valid but testing window hasn't started
- **Completed** — Testing window has passed
- **Suspended** — Authorization paused (incident, scope change)
- **Revoked** — Authorization withdrawn

## Bug Bounty Programs

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 1px solid #228B22; background: #fff; padding: 0;">
  <div style="background: #228B22; color: #fff; padding: 15px;">
    <div style="font-weight: bold; font-size: 1.1em;">BUG BOUNTY SCOPE CONFIRMATION</div>
    <div style="font-size: 0.8em;">Vulnerability Disclosure Program</div>
  </div>
  <div style="padding: 20px; font-size: 0.9em; line-height: 1.6;">
    <p><strong>Program:</strong> Nexus Technologies Bug Bounty<br>
    <strong>Researcher:</strong> @security_jane (registered researcher)<br>
    <strong>Researcher ID:</strong> BB-7742<br>
    <strong>Registration Date:</strong> January 10, 2026</p>
<div style="background: #f5fff5; padding: 15px; margin: 15px 0; border: 1px solid #228B22;">
      <p style="margin: 0;"><strong>In-scope targets:</strong></p>
      <p style="margin: 10px 0 0;">• *.nexus-tech.com (all subdomains)</p>
      <p style="margin: 5px 0 0;">• Nexus Mobile App (iOS/Android)</p>
      <p style="margin: 5px 0 0;">• Public API endpoints</p>
      <p style="margin: 10px 0 0;"><strong>Rules of engagement:</strong></p>
      <p style="margin: 5px 0 0;">• No denial of service testing</p>
      <p style="margin: 5px 0 0;">• No accessing other users' data</p>
      <p style="margin: 5px 0 0;">• Report within 72 hours of discovery</p>
    </div>
<p style="font-size: 0.85em; color: #666;">Program managed via: HackerOne<br>
    Safe harbor: Yes (no legal action for good-faith research)</p>
<div style="margin-top: 15px; font-size: 0.8em; font-family: monospace; text-align: center; color: #666; border-top: 1px dashed #ccc; padding-top: 10px;">
      <div data-verify-line="securitytestingautho" style="border-top: 1px dashed #999; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
        title="Demo only: This is an illustrative example of the verification line">
        verify:nexus-tech.com/bounty <span verifiable-text="end" data-for="securitytestingautho">]</span>
      </div>
    </div>
  </div>
</div>

**Bug bounty difference from pentest:**
- Pentests: Known firm, defined window, specific scope
- Bug bounty: Unknown researchers emerge later, ongoing program, broader scope

Verification confirms: "Yes, this researcher is registered in our program and these targets are in scope."

## Red Team Engagements

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 1px solid #ff6600; background: #fff; padding: 0;">
  <div style="background: #ff6600; color: #fff; padding: 15px;">
    <div style="font-weight: bold; font-size: 1.1em;">RED TEAM AUTHORIZATION</div>
    <div style="font-size: 0.8em;">Adversary Simulation Exercise</div>
  </div>
  <div style="padding: 20px; font-size: 0.9em; line-height: 1.6;">
    <p><strong>Client:</strong> National Grid Infrastructure<br>
    <strong>Red Team:</strong> Crimson Cell Security Ltd<br>
    <strong>Exercise Code:</strong> THUNDERSTRIKE-26<br>
    <strong>Authorization Date:</strong> January 15, 2026</p>
<div style="background: #fff8f0; padding: 15px; margin: 15px 0; border: 1px solid #ff6600;">
      <p style="margin: 0;"><strong>Authorized activities:</strong></p>
      <p style="margin: 10px 0 0;">• Physical intrusion attempts (non-destructive)</p>
      <p style="margin: 5px 0 0;">• Social engineering (specified targets only)</p>
      <p style="margin: 5px 0 0;">• Network penetration (isolated test segment)</p>
      <p style="margin: 5px 0 0;">• Phishing simulation (pre-approved list)</p>
      <p style="margin: 10px 0 0;"><strong>Exercise window:</strong> March 1-31, 2026</p>
      <p style="margin: 5px 0 0;"><strong>Code word (if challenged):</strong> [Sealed]</p>
    </div>
<p style="font-size: 0.85em; color: #666;">Authorized by: CEO + CISO + General Counsel<br>
    Board notification: Yes</p>
<div style="margin-top: 15px; font-size: 0.8em; font-family: monospace; text-align: center; color: #666; border-top: 1px dashed #ccc; padding-top: 10px;">
      <div data-verify-line="securitytestingautho" style="border-top: 1px dashed #999; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
        title="Demo only: This is an illustrative example of the verification line">
        verify:nationalgrid.com/security <span verifiable-text="end" data-for="securitytestingautho">]</span>
      </div>
    </div>
  </div>
</div>

**Red team challenges:**
- Physical security guards may detain operators
- Police may be called for "suspicious persons"
- Social engineering targets may report to HR/security

Verification (or sealed code word) confirms: "This is an authorized exercise, not a real attack."

## Third-Party Use

**Police** — Verify authorization before deciding whether to investigate "hacking"
**Hosting providers** — Verify before suspending accounts for "malicious traffic"
**Cloud providers** — AWS/Azure/GCP policies require proof of authorization
**Security operations centers** — Distinguish authorized testing from real attacks
**Legal counsel** — Evidence in disputes about scope and authorization

## Jurisdiction Differences

| Jurisdiction | Framework | Key Points |
|--------------|-----------|------------|
| **UK** | Computer Misuse Act 1990 | Authorization is complete defense; must be from system owner |
| **US** | CFAA + state laws | Authorization defense; scope matters (exceeding scope can be crime) |
| **EU** | National implementations of Budapest Convention | Varies; some countries have safe harbor for good-faith research |

**CFAA risk (US):** Even authorized testers can face liability if they exceed scope. Verification of exact scope matters.

## Verification Architecture

**The Problem:**
- Testers need proof of authorization that third parties will accept
- Authorizations can be forged or fabricated
- Scope disputes arise after testing ("you weren't authorized for that system")
- Time-limited authorizations need real-time verification

**The Fix:** Authorization documents hashed at signing, stored on client's domain. Tester carries verification URL. Any third party (police, hosting provider, cloud platform) can verify in real-time:
- Is this authorization genuine?
- Is it currently active?
- Is the specific system in scope?

**The incident flow:**
1. Security team detects "attack"
2. Before escalating to police, check for authorization
3. Tester provides verification URL
4. Verification confirms: authorized, in scope, within window
5. No police involvement, testing continues

## See Also

Other delegated authority confirmations:
- [B2B Credit Control](view.html?slug=b2b-credit-control) — Purchasing authority, trade credit, trade references
- [Contract Signing Authority](view.html?slug=contract-signing-authority) — Who can sign contracts binding the company
- [Employment Authority](view.html?slug=employment-authority-confirmations) — Job offers, terminations, salary decisions
- [Operational Authority](view.html?slug=operational-authority-confirmations) — Vendor selection, project approvals, SLA commitments
- [Regulatory Filing Authority](view.html?slug=regulatory-filing-authority) — Companies House, tax filings, audit letters


## Jurisdictional Witnessing

A jurisdiction may require the issuer to retain a **witnessing firm** for regulatory compliance. The witnessing firm:

- Receives all hashes from the issuer, and any subsequent changes to the payload as they happen—which may manifest as a new hash, a status change, or even a 404 (record deleted)
- Receives structured content/metadata (key identifiers and dates)
- Does **NOT** receive plaintext or sensitive personal information
- Provides an immutable, timestamped audit trail—available to the jurisdiction on demand, to document holders/third parties during disputes, or as expert witness testimony in legal proceedings

This provides:
- **Non-repudiation:** Issuer cannot deny issuing the document
- **Timestamp proof:** Document existed at a specific time
- **Regulatory audit:** Jurisdictions can inspect the witness ledger for fraud detection
- **Resilience:** Verification works even if issuer's systems go down

**Public Blockchain (Non-Party)**

Witnessing firms may periodically commit rollups to an inexpensive public blockchain, providing an ultimate immutability guarantee. The blockchain is a "non-party"—infrastructure, not a participant in the transaction. This creates multiple verification paths:

1. **Issuer domain** — Direct check against the issuer
2. **Witnessing firm** — Independent confirmation with timestamp
3. **Public blockchain** — Decentralized trust anchor via rollup inclusion

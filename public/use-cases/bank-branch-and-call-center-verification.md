---
title: "Bank Branch and Call Center Verification"
category: "Banking & Payments"
volume: "Very Large"
retention: "Ongoing (updated as branches open/close, numbers change)"
slug: "bank-branch-and-call-center-verification"
verificationMode: "clip"
tags: ["vishing", "impersonation", "bank-fraud", "call-center", "branch", "phishing", "scam-calls", "vulnerable-customers", "anti-fraud", "correspondence"]
furtherDerivations: 2
---

## What is Bank Branch and Call Center Verification?

Criminals impersonate banks. They call customers claiming to be from the fraud department. They send letters on convincing headed paper. They spoof caller ID so the number appears genuine. The UK term for this is "vishing" — voice phishing — and it accounts for hundreds of millions of pounds in losses annually. Action Fraud reported over 40,000 impersonation scam cases in the UK in 2024, with banks being the most commonly impersonated organization type.

The problem is structural. When a bank genuinely calls a customer, the customer has no way to confirm it is real. The bank tells the customer "never give your PIN to anyone who calls you" — but then calls the customer and asks for identity verification. The customer is trained to be suspicious but given no tool to resolve that suspicion.

With Live Verify, the bank publishes verifiable claims for its genuine branches, call centers, and correspondence references. A customer who receives a suspicious call can hang up, look at the reference they were given, and verify it against the bank's own domain. A customer who receives a letter can check the reference number before calling back on the number provided.

This is defensive. The bank is not verifying something about the customer — it is proving something about itself.

This artifact proves that a branch or call center reference belongs to the bank. It does not prove that a specific inbound call was genuinely initiated by the bank — a scammer who knows the branch reference could quote it.

**Perspective:** This page covers static bank contact points and references from the customer's perspective, not full live-call authentication.

**Verification asymmetry:** The customer can see a branch, letter, number, or callback reference, but still lacks a reliable way to tell whether it genuinely belongs to the bank unless it verifies against the bank's domain.

The stronger anti-vishing control is **real-time call verification via RCS** (see below and [Anti-Vishing: Real-Time Call Verification](../../docs/anti-vishing-real-time-call-verification.md)), where the bank sends a verified RCS message simultaneously with the call, containing a Live Verify claim that the customer's phone checks automatically. The branch/correspondence verification is a foundation layer for letters, in-branch, and static contacts; the RCS-delivered per-call verification is the full solution for live phone calls.

## Example: Branch Verification (In-Branch Signage or Card)

A card handed to customers at the branch, or signage displayed at the counter:

<div style="max-width: 480px; margin: 24px auto; background: #fff; border: 1px solid #00aeef; border-radius: 8px; padding: 0; box-shadow: 0 4px 10px rgba(0,0,0,0.1); font-family: 'Segoe UI', Arial, sans-serif; overflow: hidden;">
  <div style="background: #00aeef; color: #fff; padding: 16px 20px; font-weight: bold; font-size: 1.1em;">
    Barclays
  </div>
  <div style="padding: 20px;">
    <span verifiable-text="start" data-for="branch1"></span>
    <div style="font-size: 0.95em; line-height: 1.7; color: #333;">
      <span style="font-weight: 600;">This is a genuine Barclays branch</span><br>
      42 High Street, York<br>
      Branch Code: 20-44-18
    </div>
    <div style="margin-top: 14px; padding-top: 10px; border-top: 1px solid #ddd; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555;">
      <span data-verify-line="branch1">verify:barclays.co.uk/branches/v</span>
    </div>
    <span verifiable-text="end" data-for="branch1"></span>
  </div>
</div>

The text that clip mode hashes:

```
This is a genuine Barclays branch
42 High Street, York
Branch Code: 20-44-18
verify:barclays.co.uk/branches/v
```

## Example: Correspondence Verification (Official Letters)

Printed at the foot of genuine bank letters:

<div style="max-width: 480px; margin: 24px auto; background: #fff; border: 1px solid #ccc; border-radius: 4px; padding: 0; box-shadow: 0 4px 10px rgba(0,0,0,0.1); font-family: 'Segoe UI', Arial, sans-serif; overflow: hidden;">
  <div style="background: #00395d; color: #fff; padding: 16px 20px; font-weight: bold; font-size: 1.1em;">
    Barclays
  </div>
  <div style="padding: 20px;">
    <span verifiable-text="start" data-for="letter1"></span>
    <div style="font-size: 0.95em; line-height: 1.7; color: #333;">
      <span style="font-weight: 600;">Barclays Customer Service</span><br>
      Reference: CS-2026-441882<br>
      Contact: 0345 734 5345
    </div>
    <div style="margin-top: 14px; padding-top: 10px; border-top: 1px solid #ddd; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555;">
      <span data-verify-line="letter1">verify:barclays.co.uk/correspondence/v</span>
    </div>
    <span verifiable-text="end" data-for="letter1"></span>
  </div>
</div>

The text that clip mode hashes:

```
Barclays Customer Service
Reference: CS-2026-441882
Contact: 0345 734 5345
verify:barclays.co.uk/correspondence/v
```

## The Vishing Problem

A typical vishing call follows a pattern:

1. The caller claims to be from the bank's fraud department
2. They reference a "suspicious transaction" to create urgency
3. They ask the customer to "verify their identity" — extracting PINs, passwords, or one-time codes
4. They instruct the customer to move money to a "safe account" controlled by the criminal

The customer's dilemma is real. If the call is genuine and they hang up, they risk ignoring a real fraud alert. If the call is fake and they stay on the line, they risk losing their savings. Banks tell customers to "hang up and call back on the number on the back of your card" — but many customers do not, especially under the pressure of a convincing caller.

For static contacts (letters, in-branch signage), a verifiable branch reference changes the dynamic — the customer can check a reference at their own pace. But for live phone calls, "hang up and verify" is a failing workflow. Most customers do not hang up, especially under social pressure from a convincing caller.

The stronger model for live calls is **simultaneous RCS verification**:

1. The bank initiates an outbound call to the customer
2. Simultaneously, the bank sends a verified RCS (Rich Communication Services) business message to the customer's phone
3. The RCS message arrives during the call as an overlay or notification on the same device
4. The message contains a Live Verify plain text with a `verify:` line and a call-specific, time-limited reference
5. The customer's phone (or a Live Verify integration in the messaging app) automatically verifies the claim against the bank's domain
6. Green = the bank's own endpoint confirms this specific call was initiated right now. 404 = the bank knows nothing about it.

The RCS is the **delivery mechanism** — it gets the verifiable claim onto the customer's screen during the call without requiring them to hang up. The Live Verify check against the bank's domain is the **trust mechanism** — it's what actually proves the call is genuine.

A call that arrives without an accompanying RCS verification becomes suspicious by default. The customer learns to expect the verification, and its absence is the signal.

See [Anti-Vishing: Real-Time Call Verification](../../docs/anti-vishing-real-time-call-verification.md) for the full technical design.

## Verification Response

| Payload | Class | Meaning |
|---|---|---|
| `ACTIVE` | affirming | This is a current, genuine branch or call center |
| `CLOSED` | denying | This branch has permanently closed |
| `TEMPORARILY_CLOSED` | cautionary | Branch closed temporarily (refurbishment, etc.) |
| `RELOCATED` | cautionary | Branch has moved to a new address |
| `NO_MATCH` | denying | No branch or call center matches this reference |

For correspondence verification:

| Payload | Class | Meaning |
|---|---|---|
| `GENUINE` | affirming | This correspondence reference was issued by the bank |
| `NO_MATCH` | denying | This reference was not issued by the bank |
| `SUPERSEDED` | cautionary | A newer version of this correspondence has been sent |

The `NO_MATCH` response is the one that matters most. A criminal who fabricates a reference number will hit a 404 or `NO_MATCH`. That is the signal the customer needs.

## Data Verified

Branch name or call center name, address, branch/sort code, phone number(s), and current operational status. For correspondence: reference number, contact number, and issuing department.

**Document Types:**
- **Branch Verification Card** — Physical or digital card confirming a specific branch's identity and location.
- **Call Center Reference** — Verification that a specific phone number and reference belong to the bank's genuine call center.
- **Correspondence Verification** — Confirmation that a letter reference number was genuinely issued by the bank.

**Privacy Salt:** Not required. Branch locations, sort codes, and customer service numbers are public information. The bank is verifying facts it already publishes — the value is in the cryptographic binding to the bank's domain, not in the secrecy of the content.

## Second-Party Use

The **customer** benefits directly.

**During suspicious calls:** A customer who receives a call claiming to be from their bank can ask for a verifiable reference, hang up, and check it. This is faster and more reliable than the current advice of "call back on the number on the back of your card," which many customers do not follow.

**When receiving letters:** Scam letters impersonating banks are common, especially targeting elderly customers. A verifiable reference on genuine letters gives the recipient a way to distinguish real correspondence from forgeries before acting on any instructions.

**After the fact:** A customer who has already engaged with a suspicious caller can check the branch code or reference they were given. If it does not verify, they know to contact their bank immediately to report potential fraud.

## Third-Party Use

**Action Fraud / Police**

When investigating vishing reports, police can verify whether the branch code or reference number given to the victim was genuine. If it was not, that is direct evidence of impersonation. If it was, the investigation shifts to how the criminal obtained a genuine reference (insider threat, social engineering of bank staff, etc.).

**Vulnerable Customer Advocates**

Organizations supporting elderly or vulnerable people — Age UK, Citizens Advice, local authority adult safeguarding teams — can teach a simple verification step. "Before you do anything the caller asks, check the reference." This is more practical than the current advice, which requires the customer to find a phone number, make a separate call, navigate an IVR system, and explain the situation to a new agent.

**Other Banks and Industry Bodies**

UK Finance and its member banks coordinate on fraud prevention. Verified branch and call center claims create a cross-industry norm: every genuine bank contact carries a verifiable reference. A customer trained to expect verification from one bank will expect it from all banks. Criminals who target banks without verification become more conspicuous.

**Telecommunications Regulators**

Ofcom and equivalent regulators investigating caller ID spoofing can use verification data to distinguish cases where the caller gave a genuine bank reference (suggesting an insider or compromised system) from cases where the reference was fabricated (pure impersonation).

## Verification Architecture

**The Impersonation Asymmetry**

Banks spend heavily on anti-fraud measures that protect the bank's systems — transaction monitoring, two-factor authentication, device fingerprinting. But the vishing attack bypasses all of these by targeting the customer directly. The customer is the weakest link, and the bank gives them almost no tools to verify inbound contacts.

Current defences and their limitations:

- **"Call back on the number on your card"** — Requires the customer to hang up (losing the caller), find their card, call the bank, wait in a queue, and explain the situation. Many do not complete this process.
- **Caller ID** — Trivially spoofed. Criminals routinely display the bank's genuine number on the victim's phone.
- **Bank apps with "verify this call" features** — Some banks have introduced in-app call verification. These work for app-literate customers but exclude those who do not use mobile banking — often the same elderly customers most targeted by vishing.
- **"We will never ask for your PIN"** — True, but criminals have adapted. Modern vishing scripts avoid asking for PINs directly, instead instructing the customer to "move money to a safe account" or "authorise a payment to reverse a fraudulent transaction."

Verifiable branch and call center claims address the root problem: the customer cannot currently distinguish a genuine bank contact from a fake one. The verification is:

1. Issued by the bank — the customer checks against the bank's own domain
2. Specific — it names a particular branch, address, and sort code, not just "Barclays"
3. Instant — a single check, not a phone call to the bank
4. Accessible — works for anyone who can type a URL or use a QR code, not just app users

## Competition vs. Current Practice

| Feature | Live Verify | "Call Back" Advice | In-App Call Verify | Caller ID |
| :--- | :--- | :--- | :--- | :--- |
| **Customer action required** | **Check one reference.** | **Hang up, find number, call, wait, explain.** | **Open app, check notification.** | **None (passive).** |
| **Works for non-app users** | **Yes.** | **Yes.** | **No.** | **Yes.** |
| **Resistant to spoofing** | **Yes.** Criminal cannot forge bank domain response. | **Yes** (if customer actually calls back). | **Yes.** | **No.** Trivially spoofed. |
| **Covers letters/post** | **Yes.** Reference on correspondence. | **No.** | **No.** | **N/A.** |
| **Covers in-branch** | **Yes.** Branch verification card/signage. | **N/A.** | **No.** | **N/A.** |
| **Completion rate** | **Higher.** Single, fast step. | **Low.** Multi-step, high abandonment. | **Moderate.** App-dependent. | **N/A.** |

**Practical conclusion:** in-app call verification is effective for digitally engaged customers and Live Verify does not replace it. For customers who do not use mobile banking apps, for letters and physical correspondence, and for in-branch confidence, verifiable claims fill a gap that current anti-vishing measures do not cover.

## Authority Chain

**Pattern:** Regulated

Banks issue branch and call center verifications as part of their customer-facing fraud prevention.

UK chain (banks → FCA → statute):

```
✓ barclays.co.uk/branches/v — Genuine branch and call center verification
  ✓ fca.org.uk/register — Regulates UK banks and payment service providers
    ✓ gov.uk/verifiers — UK government root namespace
```

US chain (national banks → OCC → federal law):

```
✓ chase.com/branches/v — Genuine branch and call center verification
  ✓ occ.gov/verify — Regulates national banks and federal savings associations
    ✓ treasury.gov/verifiers — US Treasury Department root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Further Derivations

1. **SMS and Email Sender Verification** — Extending the same RCS pattern to text messages and emails that claim to be from the bank. Each genuine message carries a reference verifiable against the bank's domain.
2. **Utility and Government Call Verification** — The same RCS-delivered verification model applied to other high-impersonation targets: energy companies, HMRC/IRS, telecoms providers, police.

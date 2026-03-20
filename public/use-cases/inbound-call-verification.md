---
title: "Inbound Call Verification (Government & Commercial)"
category: "Identity & Authority Verification"
volume: "Very Large"
retention: "Call record + 1-3 years (accountability)"
slug: "inbound-call-verification"
verificationMode: "clip"
tags: ["phone-scam", "caller-verification", "sms-verification", "government-call", "commercial-call", "vishing", "impersonation", "real-time-verification", "bank-fraud-call", "debt-collection", "utility-scam"]
furtherDerivations: 1
---

## What is Inbound Call Verification?

Your phone rings. The caller says: "This is Deputy Martinez from the Maricopa County Sheriff's Office. You have an outstanding court summons for failure to appear. If you don't resolve this today, a warrant will be issued for your arrest."

Is it real?

**You have no way to know.** Caller ID is trivially spoofed — criminals routinely display legitimate government numbers. The caller sounds official, uses legal terminology, and knows your name. They may even recite a plausible case number.

This is **vishing** (voice phishing), and it is one of the most common fraud patterns in existence. The FBI's Internet Crime Complaint Center received over 12,000 government impersonation complaints in a single year, with losses exceeding $394 million. Fake sheriff's calls about missed jury duty, fake IRS calls about tax debts, fake immigration calls about visa problems — the pattern is always the same: urgency, authority, fear.

The problem is that **legitimate government calls use the exact same pattern.** A real deputy calling about a real summons sounds identical to a scammer. The citizen cannot tell the difference.

Live Verify solves this with an **officer-triggered SMS verification**. When a citizen picks up a legitimate government call and expresses skepticism — as they should — the officer presses a button in their call management system. An SMS arrives on the citizen's phone *while they're on the line*, in present tense: "You are currently speaking to Deputy R. Martinez concerning court summons CV-2026-03892." The citizen taps the verify line, confirms the call is genuine, and the conversation proceeds with trust established.

**Why officer-triggered, not automatic?** If the SMS fires automatically when the call connects, every unanswered call and voicemail dumps a cryptic verification text on the citizen's phone with no context. Wasted verifications, confused recipients, noise. The officer presses the button only after a human picks up and the conversation has started — no voicemail pollution, no wasted hashes.

### The Conversation Flow

1. Phone rings. Citizen picks up.
2. "Hello, this is Deputy Martinez from the Maricopa County Sheriff's Office. I'm calling about a court summons, case number CV-2026-03892."
3. Citizen is skeptical: "How do I know this is real?"
4. "I understand. I'm going to send you a verification text right now — check your messages."
5. Deputy presses the **"Send Verification"** button in the call management system.
6. SMS/RCS arrives 2-3 seconds later:

<div style="max-width: 380px; margin: 24px auto; font-family: sans-serif; background: #e8f5e9; border: 1px solid #a5d6a7; border-radius: 16px; padding: 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
  <div style="font-size: 0.8em; color: #555; margin-bottom: 8px; text-align: center;">SMS from 602-876-1011 (MCSO)</div>
  <div style="background: #fff; border-radius: 12px; padding: 16px; font-size: 0.95em; line-height: 1.5;">
    <div style="font-weight: bold; margin-bottom: 8px;"><span verifiable-text="start" data-for="sms-call"></span>Maricopa County Sheriff's Office</div>
    <div>You are currently speaking to:</div>
    <div>Deputy R. Martinez, Badge MCSO-4417</div>
    <div>Concerning: Court Summons — Case CV-2026-03892</div>
    <div>Sent: 2:47 PM Feb 28 2026</div>
    <div>Expires: 3:17 PM</div>
    <div style="margin-top: 12px; font-family: 'Courier New', monospace; font-size: 0.85em; color: #555; border-top: 1px dashed #ccc; padding-top: 8px;">
      <span data-verify-line="sms-call">verify:calls.mcso.maricopa.gov/v</span> <span verifiable-text="end" data-for="sms-call"></span>
    </div>
  </div>
</div>

The citizen taps the verify line. The response confirms: yes, Deputy Martinez (badge MCSO-4417) is currently authorized to make this call about case CV-2026-03892. The hash includes the deputy's identifier, case reference, and a time-limited salt valid for 30 minutes.

The **synchronicity is itself a trust signal** — the citizen hears the deputy say "I'll send it now," and 2-3 seconds later their phone buzzes. That causal link between the voice on the phone and the text arriving is very hard for a scammer to fake, because the SMS comes from the agency's system (short code or official number), not from the caller's personal phone.

**No SMS when you ask for one? Not real.** That's the rule. A legitimate officer will always be able to press the button and send verification. A scammer will make excuses: "our system is down," "we don't use that yet," "just give me your information and we'll sort it out." The inability to produce a verification SMS on demand is the red flag.

### What the Citizen Sees After Verification

<div style="max-width: 340px; margin: 24px auto; font-family: sans-serif; border: 2px solid #22c55e; background: #f0fdf4; padding: 0; border-radius: 12px; overflow: hidden;">
  <div style="background: #22c55e; color: #fff; padding: 12px 16px; display: flex; align-items: center; gap: 10px;">
    <div style="font-size: 1.3em;">&#10003;</div>
    <div style="font-weight: bold;">Verified Government Call</div>
  </div>
  <div style="padding: 16px;">
    <div style="font-weight: bold; font-size: 1.1em; margin-bottom: 4px;">Maricopa County Sheriff's Office</div>
    <div style="color: #666; font-size: 0.9em; margin-bottom: 12px;">mcso.maricopa.gov</div>
    <div style="background: #fff; border: 1px solid #ddd; border-radius: 8px; padding: 12px; font-size: 0.9em; line-height: 1.6;">
      <strong>Caller:</strong> Deputy R. Martinez<br>
      <strong>Regarding:</strong> Court Summons<br>
      <strong>Case:</strong> CV-2026-03892<br>
      <strong>Call authorized:</strong> 2:47 PM<br>
      <strong>Valid until:</strong> 3:17 PM
    </div>
  </div>
  <div style="background: #e0f2e9; padding: 10px 16px; font-size: 0.8em; color: #166534; text-align: center;">
    Verified at 2:48 PM · calls.mcso.maricopa.gov
  </div>
</div>

### What the Citizen Sees If Verification Fails

<div style="max-width: 340px; margin: 24px auto; font-family: sans-serif; border: 2px solid #ef4444; background: #fef2f2; padding: 0; border-radius: 12px; overflow: hidden;">
  <div style="background: #ef4444; color: #fff; padding: 12px 16px; display: flex; align-items: center; gap: 10px;">
    <div style="font-size: 1.3em;">&#9888;</div>
    <div style="font-weight: bold;">Not Verified</div>
  </div>
  <div style="padding: 16px; font-size: 0.9em; line-height: 1.6;">
    <div style="margin-bottom: 8px;">No matching record found at <strong>mcso.maricopa.gov</strong>.</div>
    <div style="margin-bottom: 8px;">This call may not be from the Maricopa County Sheriff's Office.</div>
    <div style="background: #fff; border: 1px solid #fca5a5; border-radius: 8px; padding: 12px; margin-top: 8px;">
      <strong>If you're unsure:</strong> Hang up and call the Sheriff's Office directly at their published number.
    </div>
  </div>
</div>

## Data Verified

Calling agency, caller name/badge number, subject matter of the call (category, not details), case or reference number (if applicable), date and time of authorization, expiration time, calling phone number (to match against the actual incoming call).

**Document Types:**
- **Court Summons Call** — Sheriff or process server notifying of a pending court date
- **Law Enforcement Follow-Up** — Detective or officer calling about an ongoing case (witness contact, victim follow-up)
- **Tax Authority Contact** — State or local tax office calling about a filing, audit, or balance due
- **Regulatory Inspection Notice** — Government inspector scheduling or confirming an inspection
- **Benefits/Services Call** — Government agency calling about an application, eligibility, or required action

## Verification Response

The endpoint returns a status reflecting the call's authorization:

- **ACTIVE_CALL** — This call is currently authorized. The named caller from the named agency is cleared to contact you about the stated subject. Valid until the stated expiration time.
- **EXPIRED** — A call was authorized but the time window has passed. The caller should request a new authorization if still on the line.
- **COMPLETED** — The call was authorized and has been marked complete by the caller. Prevents replay.
- **CANCELLED** — The authorization was withdrawn before the call was made.
- **404** — No matching authorization found. The SMS is forged, or the call is not from this agency.

## How It Works (Technical Flow)

1. **Deputy Martinez** sits down to make outbound calls for the day. The sheriff's office call management system has a queue of contacts with case details pre-loaded.
2. **Deputy dials.** The call connects. A human picks up.
3. **Deputy introduces themselves** and states the purpose of the call.
4. **Citizen asks for verification** (or the deputy proactively offers it).
5. **Deputy presses "Send Verification"** — a single button in their call management interface. The system generates a verification claim (caller identity + case reference + time-limited salt), hashes it, publishes the hash to the agency's verification endpoint, and sends the SMS/RCS to the citizen's phone number — all in one action.
6. **The citizen's phone buzzes** 2-3 seconds later. They see the SMS arrive while still on the line with the deputy.
7. **The citizen taps the verify line** in the SMS. The verification endpoint confirms the hash matches and the authorization hasn't expired.
8. **The call proceeds** with trust established. The citizen knows who they're talking to and what it's about.

**Key design points:**
- **Human-triggered:** The SMS only fires when the deputy presses the button. No voicemail pollution, no wasted verifications on unanswered calls.
- **System-sent:** The SMS comes from the agency's system (short code or official number), not the deputy's personal phone. The deputy cannot forge an SMS from the agency — only the system can.
- **Present tense:** "You are currently speaking to" — unmistakably *right now*, not a replayed or stale message.
- **One button:** The deputy's workflow is minimal. Press button, tell the citizen to check their texts. No forms to fill out mid-call.

## The "Ask for Verification" Rule

This system works by establishing a new social norm:

> **If someone calls claiming to be from a government agency, ask them to send you a verification text. A legitimate caller will send one immediately. A scammer can't.**

This is simpler and more robust than "no SMS = hang up" because it's **on-demand**. The citizen doesn't need to know in advance which agencies use the system. They just ask. A real deputy presses a button and the text arrives in seconds. A scammer stammers, makes excuses, or hangs up.

This is analogous to the browser padlock for HTTPS. Before HTTPS was universal, users couldn't tell secure from insecure sites. Once it became the norm, the *absence* of the padlock became the warning signal. The same principle applies: once citizens learn to ask "can you send me a verification text?", the inability to produce one becomes the red flag.

**Transition period:** During adoption, agencies should announce the program publicly: "Starting [date], all outbound calls from the Maricopa County Sheriff's Office support instant verification. If you receive a call claiming to be from us, ask the caller to send a verification text. If they can't, it's not us."

## Platform Requirements & Transport Mechanisms

Four transport mechanisms can deliver the verification claim to the citizen's phone, each with different tradeoffs. The critical distinction: **SMS/RCS is silent and can be sent unilaterally**; the audio burst is audible and requires both parties' cooperation.

### 1. SMS (Side-Channel — Available Today)

The caller's system sends a verification SMS while the call is in progress. Silent, invisible to the call audio. The citizen's phone buzzes with a notification.

**Can be sent unilaterally:** The officer can press the button without warning, without asking permission, without interrupting the conversation. The citizen sees the text arrive and can check it at their own pace — or the officer can prompt: "Check your texts, I just sent verification."

**Can also be sent on connection:** For organizations that want automatic verification on every outbound call, the system can fire the SMS the moment a human picks up (with voicemail detection to avoid spam). No button press needed.

**Limitation:** The citizen must switch to their messages app mid-call (speakerphone or earbuds) — clunky but functional. POTS landline users with no mobile phone cannot receive SMS.

### 2. RCS (Side-Channel — Near-Term Ideal)

Same silent side-channel as SMS, but with rich cards, branded sender verification, and read receipts. The verification message renders as a branded card from "Maricopa County Sheriff's Office" with a tap-to-verify button. Google Messages and Apple Messages both support RCS as of 2024.

**Same unilateral advantage as SMS:** Silent, no interruption to the call, can fire automatically or on button press.

**Superior UX:** With OS-level integration, the RCS card could surface as an overlay on the active call screen — no app-switching needed. The citizen sees a banner appear mid-call:

<div style="max-width: 380px; margin: 24px auto; font-family: sans-serif; background: #fff; border: 2px solid #1a73e8; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.15);">
  <div style="background: #1a73e8; color: #fff; padding: 10px 16px; font-size: 0.85em; display: flex; align-items: center; gap: 8px;">
    <span style="font-size: 1.2em;">&#128274;</span>
    <span>Caller Verification Received</span>
  </div>
  <div style="padding: 16px; font-size: 0.9em; line-height: 1.6;">
    <div style="font-weight: bold;">Maricopa County Sheriff's Office</div>
    <div style="color: #555;">Deputy R. Martinez, Badge MCSO-4417</div>
    <div style="color: #555;">Re: Court Summons — CV-2026-03892</div>
  </div>
  <div style="padding: 0 16px 16px 16px; display: flex; gap: 12px;">
    <div style="flex: 1; background: #1a73e8; color: #fff; text-align: center; padding: 10px; border-radius: 8px; font-weight: bold; font-size: 0.9em; cursor: pointer;">Verify This</div>
    <div style="flex: 1; background: #eee; color: #333; text-align: center; padding: 10px; border-radius: 8px; font-size: 0.9em; cursor: pointer;">Dismiss</div>
  </div>
</div>

**Limitation:** Same as SMS — requires a separate messaging channel. POTS-only users are out of scope.

### 3. In-Band Audio Burst (Voice Channel — Consensual Fallback)

A short data burst transmitted over the voice call itself, decoded by the citizen's phone OS. Unlike SMS/RCS, the audio burst is **audible** — both parties hear a brief tone — and therefore **cannot be sent unilaterally**. Both parties must agree to the interruption.

**When to use this:** As a fallback when SMS/RCS is unavailable — POTS landline calls, calls with no cell signal, international calls where SMS routing is unreliable, satellite phones. Anything that carries voice audio can carry the burst.

**How it works:**
1. Deputy says: "I'm going to send an audio verification — you'll hear a brief tone."
2. Citizen agrees. Both parties go silent.
3. Deputy presses "Send Verification" — system injects a 1-2 second data burst into the audio stream
4. Citizen's phone OS recognizes the burst, decodes the claim, overlays a verification banner
5. Citizen taps "Verify This" — hash lookup runs — result appears
6. Conversation resumes

**Precedents for in-band data over voice:**
- **DTMF** — Touch-tones carrying data over voice channels since the 1960s
- **Caller ID (FSK)** — Caller name/number transmitted as modulated tones between the first and second ring
- **Fax negotiation** — CNG/CED handshake tones establishing a data connection over a voice line
- **V.92 modem-on-hold** — Modems that could pause data transmission to accept a voice call, then resume

**Key advantage:** No second channel needed. POTS-compatible if the receiving phone has a software update. The data travels on the voice path itself — works on WiFi calling, VoIP, satellite, anything that carries audio. Also: unforgeable synchronicity — the burst arrives on the call the citizen is already on; a scammer on a different line cannot inject tones.

**Key disadvantages:**
- **Audible and interruptive** — Cannot be sent silently. Many people would find unexpected tones on a phone call alarming or annoying. Requires verbal consent before sending.
- **Requires OS updates** — Both Android and iOS need to recognize and decode the burst format.
- **Codec sensitivity** — Modern voice codecs (AMR, EVS, Opus) are optimized for speech and may distort non-speech audio. The encoding must survive lossy compression.
- **No persistent record** — Unlike SMS, the burst is ephemeral unless the OS logs the result.
- **Standardization required** — A new encoding standard needs adoption across carriers and OS vendors. Multi-year effort.

### 4. SIP Header (VoIP Only — Silent, No Second Channel)

For VoIP calls (which increasingly includes all mobile calls via VoLTE/VoNR), the verification claim could be transmitted as structured data in SIP signaling — similar to how STIR/SHAKEN attestation tokens are carried today. The phone OS receives the claim data in the signaling layer (not the audio layer) and presents the overlay.

**Advantage:** Silent (no audio interruption), no second channel needed, no codec sensitivity. Can be sent unilaterally like SMS/RCS.
**Limitation:** VoIP-only. Not available on legacy circuit-switched POTS. Requires carrier cooperation for SIP header passthrough.

### Transport Comparison

| | SMS | RCS | In-Band Audio | SIP Header |
| :--- | :--- | :--- | :--- | :--- |
| **Works today** | Yes | Yes | No (needs standard + OS) | No (needs carrier + OS) |
| **Silent / unilateral** | **Yes** | **Yes** | **No** — audible, needs consent | **Yes** |
| **Second channel needed** | Yes | Yes | No | No |
| **POTS compatible** | No | No | **Yes** (if phone upgraded) | No |
| **Persistent record** | Yes (SMS history) | Yes | No (ephemeral) | No (unless OS stores) |
| **Codec survival** | N/A | N/A | Needs engineering | N/A |
| **OS integration needed** | Minimal | Moderate | Significant | Significant |
| **Best for** | Immediate deployment | Near-term ideal | POTS/satellite fallback | Long-term VoIP future |

**Recommended approach:** Deploy SMS today (works immediately, silent, unilateral). Push for RCS integration (better UX, call-screen overlay). Develop SIP header support for the VoIP future. Reserve the in-band audio burst for edge cases where no other transport is available — it's the only option that reaches POTS, but its audible, consensual nature makes it a fallback, not the primary mechanism.

### The Citizen Can Ask Too

Regardless of transport mechanism, the citizen can initiate: "Can you send me verification?" The officer doesn't have to offer first. This is strictly better than today's best practice of "Can you give me a callback number?" — because the callback number comes from the caller (who might be a scammer providing a scammer's number), whereas the verification claim comes from the agency's system and is verifiable against the agency's domain.

## Second-Party Use

The **citizen receiving the call** is the primary beneficiary.

**Scam detection:** The most immediate value. Before engaging with any caller claiming government authority, the citizen checks for the verification SMS. Present and verified = safe to proceed. Absent or 404 = hang up.

**Scope confirmation:** The SMS states the subject of the call. "Re: Court Summons — Case CV-2026-03892" means the deputy is authorized to discuss that case. If the conversation veers into "and we also need your Social Security number for an unrelated matter," the citizen knows that's outside the verified scope.

**Record of contact:** The verified SMS serves as a timestamped record that the agency actually called. Useful if the citizen later needs to prove they were contacted (or not contacted) about a legal matter.

**Reduced anxiety:** Government calls are inherently stressful. A verified SMS reduces the uncertainty: "This is real, this is what it's about, this is who's calling." The citizen can engage constructively instead of spending the first five minutes wondering if they're being scammed.

## Third-Party Use

**Courts and Legal System**

**Evidence of service:** For court summons delivered by phone, the verified SMS + verification log provides strong evidence that a device at the citizen's phone number received and engaged with the claim. This is a point of evidence that notice was given — not irrefutable proof of personal receipt, but stronger than a process server's affidavit alone.

**Electronic service of process ("You have been served"):** Service of process — the legal act of formally notifying someone of proceedings — is one of the most archaic rituals in law. It currently requires physical delivery of paper documents, often by a process server who must locate the person, hand them the papers, and swear an affidavit of service. Hollywood dramatizes this for good reason: the entire system depends on one person's testimony that they handed paper to the right person.

A verified call with verified SMS/RCS fundamentally changes this. The citizen receives:
1. A phone call from an authorized deputy (verified via the SMS mechanism)
2. A verified RCS/SMS containing the full claim text: "Court Summons — Case CV-2026-03892" bound to the court's domain
3. The citizen taps "Verify"
4. **The citizen's device performs a GET request** against the court's verification endpoint with the SHA-256 hash of the claim

**That GET request is a point of evidence of service.** The court's server logs record: this hash was looked up at this timestamp from this IP. The hash could only have been computed by a device in possession of the exact claim text — which could only have come from the RCS/SMS that the court's system sent to the citizen's phone number. The chain is: court issued claim → claim delivered to citizen's device → citizen's device verified it → court's server logged the verification. This evidences delivery to the device — it does not prove the named individual personally read or understood it, but that is the same limitation as signed-for postal delivery.

The RCS message containing the full claim text remains in the citizen's message history — the served document itself, retained on the recipient's device.

**Recipient retention headers:** The court's verification endpoint can include HTTP response headers instructing the recipient's device (or app) how long to retain the verification result:

```
HTTP/1.1 200 OK
X-Verify-Status: ACTIVE_CALL
X-Verify-Retain-Until: 2031-02-28T00:00:00Z
X-Verify-Retain-Reason: service-of-process
X-Verify-Retain-Reason-Further-Details: https://courts.maricopa.gov/verify/retain/service-info
X-Verify-Case-Ref: CV-2026-03892
```

`X-Verify-Retain-Until` tells the device to preserve the result for the legally relevant period (five years, covering case lifecycle plus appeals). `X-Verify-Retain-Reason` is a machine-readable code that apps can act on programmatically. `X-Verify-Retain-Reason-Further-Details` links to a human-readable page at the court's domain explaining what was served, the recipient's rights, response deadlines, and consequences of non-response. The device (or a Live Verify app) stores the result in a tamper-evident local log and can display the further-details link as a "Why am I being asked to keep this?" tap target. See [Verification Response Format](../../docs/Verification-Response-Format.md) for the full retention header specification.

This provides **stronger evidence of service** than physical paper delivery — timestamped, cryptographically verified, engaged with by the recipient's device, logged by both the court's system and the witnessing firm. It is still a point of evidence rather than irrefutable proof (a flatmate could have opened the message; software could have auto-verified), but the evidentiary chain is stronger than a process server's sworn affidavit about handing paper to someone who may or may not have been the right person.

**Law reform opportunity:** Several jurisdictions already permit electronic service in limited circumstances (US federal courts allow email service; England & Wales permit service via email and social media under CPR 6.15). A verified, timestamped delivery via Live Verify would produce stronger evidence of service than any existing method — and could enable statutory reform allowing phone-based service as valid legal execution of the act. The evidentiary record is superior to a process server's affidavit in timing (exact timestamp vs. "approximately 3 PM"), delivery confirmation (cryptographic vs. sworn statement), and tamper-resistance (hash-based vs. paper-based). It remains a point of evidence, not absolute proof — but it is a better point of evidence than anything currently available.

**Law Enforcement Agencies**

**Operational efficiency:** Deputies and detectives spend significant time establishing credibility on calls. "I really am from the sheriff's office, you can call us back at..." wastes minutes per call, dozens of calls per day. Verified SMS eliminates this overhead.

**Complaint reduction:** Citizens who verify calls don't file "I think someone impersonated your office" reports, reducing administrative burden.

**Telecom Companies**

**Scam call ecosystem disruption:** If legitimate government calls carry verification, telecom companies can more confidently flag or block unverified calls claiming government origin. This complements existing STIR/SHAKEN caller ID authentication.

**Elderly and Vulnerable Person Advocates**

**Family-assisted verification:** Adult children can explain the rule to elderly parents: "If someone calls claiming to be from the government and there's no verification text, hang up and call me." The SMS is concrete and checkable — easier than teaching someone to evaluate caller credibility by ear.

**Insurance and Financial Institutions**

**Fraud investigation support:** When a customer reports they were "told by law enforcement" to wire money or buy gift cards, the institution can ask: "Did you receive a verification SMS?" This creates a clear bright line between legitimate contact and scams.

## Verification Architecture

**The Phone Impersonation Problem**

Phone calls are the highest-pressure impersonation channel. The voice creates urgency, the conversation is real-time, and the target must decide instantly whether to engage. Specific phone-based attack patterns:

- **Vishing (voice phishing)** — Criminals call claiming to be from the sheriff's office, IRS, a bank, or other organization. They use urgency and fear to extract payments, personal information, or compliance with illegal demands.
- **Caller ID spoofing** — Trivial to display any phone number. A scammer can show the actual sheriff's office number on the citizen's caller ID. This is why "check the caller ID" is useless advice.
- **Callback number manipulation** — Scammers provide a callback number that connects to an accomplice posing as the agency's main line. "Don't believe me? Hang up and call this number." This is why "call them back" is insufficient without an independently verified number.
- **Authority escalation** — "This is your final notice before a warrant is issued." Scammers exploit the citizen's fear of legal consequences to override their better judgment.
- **Commercial impersonation** — "This is your bank's fraud department" is the perfect phone scam because the legitimate call sounds identical to the fake one. Banks, insurers, utilities, and tech companies all make outbound calls that scammers mimic precisely.
- **State-actor impersonation** — Foreign intelligence operatives impersonating domestic officials by phone to intimidate dissidents and diaspora communities.

For the broader taxonomy of impersonation scams across all channels (phone, email, SMS, messaging apps, social media, in-person), see: **[Impersonation Scam Verification](view.html?doc=impersonation-scam-verification)**.

**Why Caller ID Authentication (STIR/SHAKEN) Isn't Enough**

STIR/SHAKEN verifies that the calling number hasn't been spoofed. But it doesn't verify:
- **Who** at the agency is calling
- **Why** they're calling
- **Whether they're authorized** to contact you about a specific matter
- **The scope** of the call

A legitimate sheriff's office number can be used by an unauthorized person within the office, or the call can be socially engineered even with authentic caller ID. Live Verify SMS adds the claim layer: not just "this call is from the sheriff's office number" but "Deputy Martinez, badge 4417, is authorized to call you about case CV-2026-03892 right now."

**Issuer Types** (First Party)

*Government:*
- **Sheriff's Offices / Police Departments** — Court summons, witness contact, case follow-up, victim notification
- **State and Local Tax Authorities** — Audit notices, payment arrangements, filing issues
- **Courts** — Jury duty notifications, hearing schedule changes, compliance calls
- **Regulatory Agencies** — Inspection scheduling, licensing issues, compliance follow-up
- **Federal Agencies** — IRS, Social Security, Veterans Affairs, Medicare — for legitimate outbound contact

*Commercial:*
- **Banks and Credit Card Companies** — Fraud alerts, account issues, loan servicing
- **Insurance Companies** — Claims adjusters, coverage changes, renewal notices
- **Utilities** — Billing, service appointments, outage notifications
- **Healthcare Providers** — Test results, appointment changes, billing
- **Brokerages and Financial Advisors** — Account activity, margin calls, required actions
- **Debt Collection Agencies** — Legitimate collection activity (heavily impersonated by scammers)

## Authority Chain

**Pattern:** Commercial

Government agencies and organizations issue SMS verification to confirm incoming calls are from authorized representatives. The issuer is self-authorized to confirm its own employees.

```
✓ callback.hmrc.gov.uk/verify — Verifies government calls claiming to be from HMRC; confirms caller identity and case reference
```

Commercial issuer — self-authorized. Trust rests on the issuer's domain reputation.

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Privacy Salt

The SMS claim includes a time-limited salt generated by the agency's system. This prevents:

- **Replay attacks** — A scammer who intercepts or screenshots a verification SMS cannot reuse it; the authorization expires (typically 30 minutes)
- **Enumeration attacks** — Without the salt, an attacker who knows the case number could pre-compute the hash. The salt makes this impossible.
- **Historical correlation** — Expired verifications return 404. No one can build a database of "this citizen was contacted about case X on date Y" by querying old hashes.

## Competition

| Feature | Live Verify SMS | Caller ID (STIR/SHAKEN) | "Call Us Back" | Trust the Voice |
| :--- | :--- | :--- | :--- | :--- |
| **Verifies caller identity** | **Yes.** Named individual + badge. | **No.** Verifies the phone number only. | **Partial.** You reach the agency, not necessarily the right person. | **No.** |
| **Verifies authorization** | **Yes.** Specific case, specific time window. | **No.** | **No.** | **No.** |
| **Spoofable** | **No.** Bound to agency domain. | **Partially.** Not all carriers participate. | **Yes.** Scammers give fake callback numbers. | **Yes.** Trivially. |
| **Real-time** | **Yes.** Officer sends SMS mid-call on demand. | **Yes.** | **No.** Requires hanging up, looking up number, calling back, navigating phone tree, re-explaining. | **N/A.** |
| **Works for elderly** | **Yes.** Concrete rule: no text = hang up. | **No.** Invisible to the user. | **Difficult.** Requires phone navigation. | **No.** Elderly are the primary targets. |

**Why Live Verify wins here:** STIR/SHAKEN is plumbing — it happens invisibly between carriers. The citizen never sees it. "Call them back" requires the citizen to independently find the correct number (not the one the caller provides), navigate a phone tree, and re-explain their situation. Live Verify SMS puts a concrete, verifiable artifact on the citizen's screen at the exact moment they need it.

## Applicability: Who Calls People and Can't Prove Who They Are?

The sheriff's office court summons is the primary example in this document, but the pattern applies to **every legitimate outbound call where the recipient didn't initiate contact**. The mechanism is identical every time — only the caller, subject matter, and domain change.

### Government — Federal

| Caller | Scam Pattern It Kills | Verify Domain (Illustrative) |
| :--- | :--- | :--- |
| **IRS / State Tax Authority** | "You owe back taxes, pay now with gift cards or face arrest" — the single largest phone scam category in the US. | `calls.irs.gov` |
| **Social Security Administration** | "Your Social Security number has been suspended due to suspicious activity." | `calls.ssa.gov` |
| **Veterans Affairs** | Calls about benefits, appointments, eligibility changes. Scammers target veterans with fake VA calls. | `calls.va.gov` |
| **Federal Student Aid** | "Your student loans qualify for immediate forgiveness — we just need your bank details." | `calls.studentaid.gov` |
| **Medicare / Medicaid** | "Your Medicare number has been compromised" or fake enrollment calls. Elderly are the primary targets. | `calls.cms.gov` |

### Government — State & Local

| Caller | Scam Pattern It Kills | Verify Domain (Illustrative) |
| :--- | :--- | :--- |
| **Sheriff's Office** | Fake jury duty / court summons / warrant threats. **The primary example in this document.** | `calls.mcso.maricopa.gov` |
| **Local Police Department** | Detective calling a witness or victim for case follow-up. Impersonated by criminals casing targets. | `calls.police.phoenix.gov` |
| **State Tax Authority** | State-level equivalent of the IRS scam. "You owe state taxes, pay immediately." | `calls.tax.state.az.us` |
| **Courts** | Hearing schedule changes, compliance calls, jury duty notifications. | `calls.courts.maricopa.gov` |
| **Code Enforcement / Building Inspection** | Scheduling inspections, violation notices. Scammers impersonate inspectors to demand immediate "fines." | `calls.permits.phoenix.gov` |
| **Child Protective Services** | Calls about cases, welfare checks. Extraordinarily sensitive — impersonation causes real terror. | `calls.dcs.az.gov` |
| **Probation / Parole** | Check-in calls, compliance verification. Impersonated to extract information or payments from families. | `calls.corrections.az.gov` |

### Commercial — Financial Services

| Caller | Scam Pattern It Kills | Verify Domain (Illustrative) |
| :--- | :--- | :--- |
| **Bank Fraud Department** | "We've detected unauthorized activity on your account." The supreme irony: the scam perfectly mimics the legitimate call. Victims "verify" their account details to the scammer thinking they're protecting themselves. | `calls.chase.com` |
| **Credit Card Company** | "Suspicious charge on your card — is this you?" Same irony as bank fraud calls. | `calls.amex.com` |
| **Debt Collectors** | Fake debt collection is a massive industry. Scammers call about debts that don't exist, demanding immediate payment. Legitimate collectors also struggle with credibility. | `calls.collections.wellsfargo.com` |
| **Mortgage Servicer** | "Your escrow account is short / your rate can be lowered / your payment is late." Impersonated to extract bank details. | `calls.loandepot.com` |
| **Investment / Brokerage** | Calls about account activity, margin calls, required actions. | `calls.fidelity.com` |

### Commercial — Insurance

| Caller | Scam Pattern It Kills | Verify Domain (Illustrative) |
| :--- | :--- | :--- |
| **Auto Insurance Claims** | Adjuster calling about an accident claim. Impersonated by staged-accident rings seeking settlement information. | `calls.claims.geico.com` |
| **Health Insurance** | "Your coverage is about to lapse" or fake enrollment calls. Targets elderly during open enrollment. | `calls.bluecross.com` |
| **Home Insurance** | Adjuster calling after a storm/disaster. Impersonated by roofing scam operations. | `calls.claims.statefarm.com` |

### Commercial — Utilities & Services

| Caller | Scam Pattern It Kills | Verify Domain (Illustrative) |
| :--- | :--- | :--- |
| **Electric / Gas Utility** | "Your power will be shut off in 2 hours unless you pay now." One of the most common utility scams. | `calls.aps.com` |
| **Water Company** | "We need to schedule a meter inspection" — doorstep fraud begins with a phone call. | `calls.phoenix.gov/water` |
| **Internet / Telecom** | "We're upgrading your area, need to verify your account." | `calls.cox.com` |
| **Tech Support** | "This is Microsoft / Apple / your ISP — your device has been compromised." | `calls.support.microsoft.com` |

### Commercial — Healthcare

| Caller | Scam Pattern It Kills | Verify Domain (Illustrative) |
| :--- | :--- | :--- |
| **Hospital / Doctor's Office** | Calling with test results, appointment changes, billing questions. Impersonated to extract insurance details. | `calls.mayoclinic.org` |
| **Pharmacy** | Prescription ready, refill reminders, insurance issues. | `calls.cvs.com` |
| **Lab / Diagnostic Center** | Results notification, scheduling follow-ups. | `calls.quest.com` |

### Broader Scam Landscape

Phone calls are one channel among many. The same scams — pig-butchering, authority chains, phishing, romance fraud, tech support scams — operate across phone, SMS, email, WhatsApp, social media, and in-person visits. The scam type matters more than the channel.

For the full channel-agnostic taxonomy of impersonation scams and how Live Verify applies to each, see: **[Impersonation Scam Verification](view.html?doc=impersonation-scam-verification)**.

## Jurisdictional Witnessing (Optional)

Some jurisdictions, contracts, or multi-party workflows may add an independent witness layer. When used, the witnessing firm:

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

If a witness layer exists, it may periodically commit rollups to a public blockchain as an additional timestamping mechanism. That is optional, not inherent to the use case. The verification paths would then be:

1. **Issuer domain** — Direct check against the issuer
2. **Witnessing firm** — Independent confirmation with timestamp
3. **Public blockchain** — Decentralized trust anchor via rollup inclusion

## Further Derivations

1. **Video call verification** — For government video appointments (immigration interviews, remote court appearances) or commercial video calls (telehealth, financial advisor), an SMS verification confirming the video link is genuine and who will be on the other end.
2. **Automated call verification** — Robocalls and automated calls from government systems (prescription refill notifications, appointment reminders, emergency alerts) or commercial systems (bank fraud alerts, utility outage notifications) that carry a verify line confirming the call is from the stated organization.
3. **Inbound text/chat verification** — The same pattern applied to SMS, WhatsApp, or chat messages claiming to be from an organization. "This is your bank — reply with your PIN to unlock your account." A verification link in the message, bound to the bank's domain, proves (or disproves) it's real.

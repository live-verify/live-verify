# Anti-Vishing: Real-Time Call Verification

The defence: make the claimed authority produce a verifiable object during the call. See [Channel Impersonation Fraud Controls](channel-impersonation-fraud-controls.md) for the family overview.

## The Problem

Vishing (voice phishing) is one of the most effective fraud techniques because it exploits a structural asymmetry: when a bank genuinely calls a customer, the customer has no way to confirm the call is real. Banks tell customers "never give your PIN to anyone who calls you" and then call customers and ask for identity verification. The customer is trained to be suspicious but given no tool to resolve that suspicion in the moment.

Current defences all fail at the point of decision:

- **"Hang up and call back on the number on your card"** — requires the customer to end the call, find their card, navigate an IVR, wait in a queue, and explain the situation. Most customers do not complete this. It is a guaranteed failing workflow for real humans under social pressure.
- **Caller ID** — trivially spoofed. Criminals routinely display the bank's genuine number.
- **In-app call verification** — some banks push a notification to their app during genuine calls. Works for app-literate customers; excludes elderly and non-app users who are the primary vishing targets.
- **"We will never ask for your PIN"** — true, but modern vishing scripts don't ask for PINs. They instruct the customer to "move money to a safe account" or "authorise a payment to reverse a fraudulent transaction."

## The Design: RCS-Delivered Live Verify Claim with One-Time Code Words

The solution has two components:

1. **RCS (Rich Communication Services)** as the delivery mechanism — gets a verifiable claim onto the customer's phone screen during the call, without requiring the customer to hang up or switch apps
2. **Live Verify** as the trust mechanism — the claim verifies against the bank's own domain, not against carrier infrastructure or a third-party platform
3. **One-time code words** as the call-binding mechanism — the caller must speak the same short-lived code words that appear in the verified claim

### Flow

1. Bank's dialling system initiates an outbound call to the customer
2. Simultaneously, the bank's system sends a verified RCS business message to the customer's phone number
3. The customer's phone displays the RCS message as a notification or overlay during the active call — on the same device
4. The RCS message contains a Live Verify plain text:

```text
Barclays call verification
Call Ref:    CV-2026-0321-441882
Team:        Fraud Team
Code Words:  BLUE HARBOUR
Initiated:   21 Mar 2026 14:22 UTC
Expires:     21 Mar 2026 14:32 UTC
verify:barclays.co.uk/calls/v
```

5. The caller says: "Before we continue, your code words are BLUE HARBOUR."
6. The customer's phone (or a Live Verify integration in the messaging/RCS app) verifies the hash against `barclays.co.uk/calls/v`
7. **Verified + spoken code words match** → the bank generated a live call object, and the person on the line knows the one-time words bound to it. This is strong evidence that the call is genuine, though not absolute proof in the mathematical sense — it proves the caller has access to the code words the bank generated for this call at this moment.
8. **404 / wrong code words / no RCS received** → treat the call as suspicious and end it.

### What the customer sees

During the call, a notification appears:

```
┌─────────────────────────────────────┐
│ 🏦 Barclays — Verified Call         │
│                                     │
│ Call Ref: CV-2026-0321-441882       │
│ Team: Fraud Team                    │
│ Code Words: BLUE HARBOUR            │
│ Initiated: 2 minutes ago            │
│                                     │
│ ✓ Verified against barclays.co.uk   │
│                                     │
│         [Details]  [Dismiss]        │
└─────────────────────────────────────┘
```

The customer does not need to hang up, open a separate app, type a URL, or make a phone call. They glance at their screen and listen for the same code words from the caller.

### What the customer learns to expect

Over time, customers are trained to expect the verification notification during genuine bank calls and to expect the caller to read out the code words shown in it. A call that claims to be from the bank but arrives without the RCS verification, or where the caller cannot state the matching code words, is suspicious by default.

## Why RCS

### Verified sender branding

RCS Business Messaging already supports verified sender profiles. Carriers authenticate the business before granting access to the verified channel. The bank's logo, name, and verification checkmark are controlled by the carrier, not by the caller. A scammer cannot send an RCS message that displays as "Barclays" with the Barclays logo — that requires carrier-level registration.

### Same device, same moment

The RCS arrives on the same phone that is receiving the call. No switching to a laptop, no opening a different app, no finding a QR code. The verification is simultaneous and co-located with the call.

### Not app-dependent

RCS works in the phone's native messaging app (Google Messages on Android, Messages on iOS since Apple adopted RCS in 2024). The customer does not need to have the bank's app installed, or to have mobile banking set up, or to remember a password. This matters because the customers most targeted by vishing — elderly, non-technical, non-app users — are also the ones least likely to have the bank's app.

## Why Live Verify is the Trust Mechanism (Not RCS Alone)

RCS verified sender branding is a useful signal but it is **carrier infrastructure trust**. The carrier says "this message came from a verified Barclays business account." That is necessary but not sufficient.

Live Verify is the **issuer trust** layer. The claim in the RCS message verifies against `barclays.co.uk/calls/v` — the bank's own domain. The one-time code words tie the voice call to that specific claim. Together they prove something stronger than either layer alone:

- The RCS branding says "the carrier believes this is Barclays"
- The Live Verify check says "Barclays' own domain confirms this specific call reference exists and was initiated right now"
- The spoken code words say "the person on the line knows the one-time secret bound to that live call reference"

The team/reason field ("Fraud Team," "Mortgage Review") is useful orientation metadata — it helps the customer understand the context before engaging. But it is not a security factor in the same way as the code words. It reduces the social-engineering window (the caller's script has to match what the customer already sees) but it should be read as context, not as part of the proof stack.

If the carrier's RCS infrastructure were compromised, the Live Verify check would still fail (the hash wouldn't exist at the bank's endpoint). If the bank's endpoint were compromised, the RCS branding would still be correct (carrier-authenticated). Both layers need to pass.

## Time-Limiting

The call verification claim is **extremely short-lived** — valid for minutes, not hours or days.

```
Initiated:   21 Mar 2026 14:22 UTC
Expires:     21 Mar 2026 14:32 UTC
```

After 10 minutes, the bank's endpoint returns EXPIRED. This prevents:

- **Replay attacks** — a scammer who obtains a genuine verification from a previous call cannot reuse it
- **Screenshot fraud** — a photo of a previous verification notification is worthless because the endpoint no longer confirms it
- **Credential harvesting** — even if the call reference leaks, it expires before it can be exploited

## Attack Resistance

### Scammer calls without RCS

The customer sees no verification notification. This is the primary defence signal. Over time, banks can make "no verification + no matching code words = not us" an explicit customer education message.

### Scammer tries to send a fake RCS

RCS Business Messaging requires carrier-level registration. The scammer cannot send an RCS message that displays as "Barclays" without being registered as Barclays with the carrier. This is a carrier-enforcement problem, not a Live Verify problem.

### Scammer sends a regular SMS that mimics the notification

The customer sees an SMS, not an RCS. On most modern phones, RCS and SMS are visually distinguishable (RCS shows the verified business profile; SMS does not). The Live Verify claim in the SMS can still be verified, but the absence of the RCS verified branding is itself a warning. If the caller also cannot state the matching code words, the fraud signal is stronger still.

### Scammer obtains a genuine call reference from a previous call

The reference has expired. The bank's endpoint returns EXPIRED. The scammer cannot extend the validity window.

### Scammer knows a real branch or department but not the live code words

This is the main improvement over static branch verification. A scammer may know the bank's real branch name, switchboard number, or fraud-team script. But unless they also know the one-time code words generated for this specific outbound call, they cannot satisfy the live check.

### Scammer compromises the bank's RCS sending infrastructure

This is an infrastructure security problem. The Live Verify check still provides a second layer — the scammer would also need to publish hashes at the bank's verification endpoint. Even then, they would need the voice caller to speak the matching code words in real time.

### Customer's phone does not support RCS

Fallback to the branch/correspondence verification model: the customer verifies static references after the call. This is weaker but still better than no verification. Over time, RCS coverage will increase as carriers and phone manufacturers converge on the standard.

## Relationship to Branch/Correspondence Verification

The [Bank Branch and Call Center Verification](../public/use-cases/bank-branch-and-call-center-verification.md) use case covers three layers:

1. **Branch verification** (static) — proves a branch exists and belongs to the bank. Useful for in-branch signage, cards, and "is this a real branch?" questions.
2. **Correspondence verification** (static) — proves a letter reference was issued by the bank. Useful for postal correspondence.
3. **Real-time call verification via RCS with code words** (dynamic) — proves the bank generated a live call object and the caller knows the one-time words bound to it. This is the anti-vishing control.

Layers 1 and 2 are **fallback only** for the vishing problem. They verify static facts about the bank's infrastructure — that a branch or reference exists — but they do not authenticate a specific live call. A scammer who knows a real branch code can quote it. The dynamic RCS layer with code words is qualitatively different: it binds a live, expiring, one-time secret to a specific call at a specific moment. For anti-vishing purposes, layers 1 and 2 should not be treated as near-equivalents of layer 3.

Layers 1 and 2 are foundation layers — they verify static facts about the bank's infrastructure. Layer 3 is the per-interaction authentication that addresses the vishing problem directly.

## Implementation Requirements

### Bank side

- Integration between the outbound dialling system and an RCS Business Messaging API
- Generation of a call-specific reference and Live Verify hash at call initiation
- Publication of the hash to the bank's verification endpoint (short-lived, auto-expiring)
- Registration as a verified RCS business sender with each carrier

### Carrier side

- Support for RCS Business Messaging with verified sender profiles
- Timely delivery of RCS messages (the message must arrive within seconds of the call initiating, not minutes later)

### Customer side

- A phone that supports RCS (most modern Android and iOS devices since 2024)
- No app installation required
- No account setup required
- The customer learns to expect the notification and to treat its absence as suspicious

## Scope Limitations

- **Does not prevent all social engineering.** A sufficiently convincing criminal who calls before the genuine bank and tells the customer to "ignore any verification messages from scammers pretending to be your bank" could undermine the system. Customer education must emphasise that the verification notification and matching code words are the bank, not the caller's unsupported words.
- **Does not cover inbound calls to the bank.** This model verifies outbound bank-to-customer calls. When the customer calls the bank, the IVR and agent authentication are separate problems.
- **Carrier RCS coverage is not yet universal.** Some customers, some carriers, some regions still have gaps in RCS support. The static branch/correspondence verification is the fallback.
- **Does not prevent data breaches.** If a criminal has already obtained the customer's account details through other means, real-time call verification does not help with the underlying data compromise.
- **Absence is suspicious, not mathematically conclusive.** Delayed delivery, handset settings, or lack of RCS support can cause a genuine bank call not to display the notification in time. The safe operational rule is: matching verified code words are a strong positive; absence of verification means stop and use another channel.

## Broader Application

The same RCS + Live Verify model applies to any organisation that makes outbound calls and is commonly impersonated:

- **Utility companies** — energy providers, water companies, telecoms
- **Tax authorities** — HMRC (UK), IRS (US), ATO (Australia)
- **Police and law enforcement** — "you have an outstanding warrant" scams
- **Healthcare providers** — hospital appointment calls, GP surgery calls
- **Delivery companies** — "your parcel is held, pay a fee" scams

Each organisation registers as a verified RCS sender, generates per-call Live Verify claims, and publishes them to its own domain. The customer experience is the same regardless of who is calling: a verified notification arrives during the call, or it doesn't.

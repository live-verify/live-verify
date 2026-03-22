# Anti-Smishing: SMS and Messaging Verification

The defence: make the claimed authority produce a verifiable object inside the message. See [Channel Impersonation Fraud Controls](channel-impersonation-fraud-controls.md) for the family overview.

## The Problem

Smishing (SMS phishing) is the messaging equivalent of vishing, and by volume it is the dominant fraud vector in most countries. A text message arrives on the recipient's phone claiming to be from a trusted institution — a bank, a delivery company, a tax authority — and the recipient has no way to verify the claim at the point of reading.

SMS feels personal and urgent. It arrives on the same device the recipient uses for banking, in the same thread where genuine messages from the same sender have appeared before. Unlike email, there is no "junk" folder, no spam filter, no formatting cues to distinguish real from fake. The message is short, direct, and demands immediate action.

Common smishing patterns:

- **Bank alerts:** "Unusual activity on your account. Verify your identity immediately" — with a link to a credential-harvesting site
- **Delivery scams:** "Your parcel is held at the depot. Pay £1.99 to rearrange delivery" — the most common SMS scam in the UK and Europe
- **Tax refund scams:** "HMRC: You are owed a tax refund of £847.20. Claim now" — impersonating a tax authority to harvest bank details
- **"Hi Mum" scams:** "Hi Mum, I've lost my phone, this is my new number, can you send £200 to this account" — family impersonation (Live Verify cannot help here; see Scope Limitations)
- **Toll road / parking scams:** "Unpaid toll of $4.15. Pay now to avoid a $50 late fee" — exploiting small amounts to seem plausible
- **Account suspension:** "Your mobile account will be suspended in 24 hours. Call this number" — carrier impersonation

Every one of these works because the recipient cannot distinguish a genuine institutional message from a fake one. The phone number may be spoofed. The sender name may look identical to the real institution. The link may use a URL shortener that hides the destination.

## The Design

Legitimate SMS and messaging notifications from institutions that adopt Live Verify include a `verify:` line. The recipient selects the message text and verifies it — by pasting it into a Live Verify client, using the browser extension, or using the Android share-to-verify flow. The hash is checked against the institution's own domain.

A scammer cannot produce a hash that resolves against the real institution's domain. That is the entire mechanism.

### Example: Bank Transaction Alert

```
Barclays: Payment of £2,340.00 to HMRC↲received 08/03/2026 14:22↲Ref: FP-882991↲Salt: 3j7k
verify:alerts.barclays.co.uk/tx
```

The `↲` characters are the arrow-character convention for SMS line breaks (see [Verification in Messaging Systems](verification-in-messaging-systems.md) for details). The `verify:` line itself sits on a real newline.

### Example: Delivery Notification

```
Royal Mail: Your item arriving tomorrow↲Ref: RR123456789GB↲Salt: 4m2n
verify:tracking.royalmail.com/v
```

### Example: Tax Notification

```
HMRC: Your Self Assessment for 2024-25↲is due by 31 January 2026↲UTR: 1234567890↲Salt: 9p3r
verify:notifications.tax.service.gov.uk/v
```

In each case, the recipient copies or selects the text, and the Live Verify client computes a SHA-256 hash and checks it against the domain in the `verify:` line. A match means the institution published that exact content. A miss means it did not.

## Why This is Different from Link Checking

Smishing works precisely because it includes links. "Click here to verify your identity." "Pay the fee at this link." "Track your parcel here." The entire attack depends on the recipient clicking a link in the message.

The `verify:` line is not a link. The recipient does not click it, tap it, or follow it. The Live Verify client reads the domain from the `verify:` line and performs a hash lookup against it. There is no URL to visit, no page to load, no form to fill in. The verification happens against the institution's own domain via a hash endpoint, not via a web page the message directs the recipient to.

This is a structural difference. Link-checking tools (Safe Browsing, carrier-level URL scanning) try to determine whether a link in a message is dangerous. Live Verify does not evaluate links at all. It verifies whether the content of the message was published by the claimed institution.

## The Absence Signal

When an institution adopts Live Verify for its SMS notifications, recipients learn to expect the `verify:` line. Over time, the absence of verification becomes a signal.

A message claiming to be from Barclays that includes a valid `verify:` line resolving against `alerts.barclays.co.uk` is strongly trustworthy. A message claiming to be from Barclays with no `verify:` line is not automatically fraudulent — Barclays might send unverified messages for some purposes — but it is a reason to be cautious.

The absence signal strengthens with adoption. If every genuine Barclays SMS carries a `verify:` line, then a Barclays-branded SMS without one is suspicious by default. This is the same dynamic as HTTPS: a padlock doesn't prove a site is safe, but the absence of a padlock on a banking site is a clear warning.

## Attack Resistance

### Scammer sends a fake SMS without a verify: line

This is the most common case today. The message arrives without verification. As adoption grows, recipients learn that genuine messages from that institution always carry a `verify:` line. The absence is the signal.

### Scammer includes a fake verify: line pointing to their own domain

The message says `verify:alerts-barclays-secure.com/v` — a domain the scammer controls. The scammer can publish a valid hash there. But the domain is not `barclays.co.uk`. The Live Verify client displays the domain prominently. The recipient sees verification against an unfamiliar domain, not the bank's real domain. This is visible and unambiguous.

### Scammer copies a genuine verify: line from a previous message

The hash is bound to the exact content of the message. Changing any character — the amount, the reference, the date, the salt — produces a different hash. The scammer would need to send the exact same message content as a previous genuine message, including the salt, and hope the institution has not expired the hash. Institutions should expire SMS verification hashes after a short window (hours, not days). Replaying an old message verbatim is also suspicious on its face — the reference, date, and details will not match the recipient's current situation.

### Scammer intercepts the message in transit (SS7 attacks)

If an attacker intercepts a genuine SMS via SS7 vulnerabilities, they see the real `verify:` line and could forward it. But SS7 interception gives the attacker the genuine message — they do not need to forge it. Live Verify does not defend against message interception; it defends against message fabrication. SS7 security is a carrier infrastructure problem.

## Platform Differences

SMS is the hardest channel for Live Verify because of line-break unreliability and character limits. The arrow-character convention (`↲`) addresses the line-break problem. The character cost is real — the `verify:` line, salt, and arrow characters force Unicode encoding (70 chars/segment instead of 160), increasing message cost.

RCS, iMessage, WhatsApp, Telegram, Signal, and other IP-based messaging platforms all preserve real newlines and support longer messages. On these platforms, the `verify:` line works naturally without the arrow-character workaround. See [Verification in Messaging Systems](verification-in-messaging-systems.md) for channel-by-channel details.

RCS deserves special mention: it supports verified sender branding (the carrier authenticates the business), which adds a sender-identity layer on top of Live Verify's content-verification layer. The combination — carrier-verified sender plus content-verified message — is stronger than either alone.

## Relationship to Vishing

Smishing and vishing are the same attack pattern on different channels. Vishing exploits voice calls; smishing exploits text messages. Both impersonate trusted institutions and pressure the recipient into immediate action.

The [Anti-Vishing: Real-Time Call Verification](anti-vishing-real-time-call-verification.md) document describes a more complex design involving RCS-delivered verification with one-time code words during a live phone call. That design is necessarily more elaborate because voice calls are synchronous — the caller and recipient are in conversation, and the verification must happen in real time.

Smishing verification is simpler. The message is asynchronous. The recipient reads it, selects the text, and verifies at their own pace. There is no live caller applying social pressure. This makes the `verify:` line approach more straightforward for messaging than for voice — the recipient has time to check.

Both channels benefit from the same absence signal: institutions that adopt verified messaging train recipients to expect it, and messages without verification from those institutions become suspicious.

## Scope Limitations

- **Does not help with personal impersonation.** "Hi Mum" scams, romance scams, and other attacks that impersonate individuals rather than institutions are outside Live Verify's scope. There is no institutional domain to verify against.
- **Does not evaluate links.** If a verified message contains a link, Live Verify confirms the message content was published by the institution — but it does not assess whether the link is safe. Link safety is a separate problem.
- **Absence is not proof of fraud.** Many legitimate institutional messages do not yet carry `verify:` lines. The absence signal only becomes useful once an institution has adopted Live Verify consistently enough that recipients expect it.
- **SMS character cost is real.** The `verify:` line, salt, and arrow characters consume space and force Unicode encoding, increasing per-message cost. For high-volume senders (banks sending millions of alerts), this is a non-trivial cost consideration.
- **Does not prevent a recipient from acting before verifying.** If a recipient reads a smishing message and clicks the link before checking for a `verify:` line, the verification mechanism was never engaged. Customer education matters.
- **Carrier-level SMS spoofing is a separate problem.** Live Verify does not authenticate the sender — it authenticates the content. Sender-ID spoofing (making a message appear to come from "Barclays" in the sender field) is a carrier infrastructure and regulation problem.

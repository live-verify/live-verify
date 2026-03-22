# Channel Impersonation Fraud Controls

How Live Verify addresses impersonation fraud across communication channels.

## The Core Principle

The idea behind every control in this family is the same:

**Make the claimed authority produce a verifiable object inside the channel.**

Not "detect scams generically." Not "warn users to be careful." The authority itself — the bank, the government agency, the delivery company — publishes a verifiable claim in the communication, and the recipient checks it against the authority's own domain. If the claim is absent or fails verification, the communication is suspect.

## The Impersonation Attack Family

Impersonation fraud goes by different names depending on the channel — vishing (voice), smishing (SMS), phishing (email), quishing (QR codes) — but the structure is identical:

1. An attacker impersonates a trusted entity
2. Through a communication channel the recipient trusts
3. Creating urgency or authority pressure
4. To extract credentials, money, or compliance

The channel varies. The defence is the same: the legitimate entity's communication carries a verifiable claim that the attacker cannot forge.

## Channel-by-Channel Summary

| Attack | Channel | How it works | Live Verify defence | Design doc |
|:---|:---|:---|:---|:---|
| **Vishing** | Phone calls | Caller claims to be from bank/government | RCS-delivered verification with code words during the call | [anti-vishing-real-time-call-verification.md](anti-vishing-real-time-call-verification.md) |
| **Smishing** | SMS/messaging | Text claims to be from bank/delivery co | `verify:` line in the message body | [anti-smishing-sms-verification.md](anti-smishing-sms-verification.md) |
| **Phishing** | Email | Email claims to be from bank/employer/vendor | `verify:` block in email body, complementing DMARC | [anti-phishing-email-verification.md](anti-phishing-email-verification.md) |
| **Quishing** | QR codes | Fake QR code overlaid on legitimate sign | `verify:` text line resistant to overlay; QR code is the vulnerable element, not the text | [anti-quishing-qr-code-fraud.md](anti-quishing-qr-code-fraud.md) |

## The Common Defence Pattern

Across all channels, Live Verify's defence is structurally the same:

1. The legitimate entity publishes a hash of the communication content at its own domain
2. The communication carries a `verify:` line pointing to that domain
3. The recipient (or their device) checks the hash
4. Match = genuine. No match / 404 = fraudulent or tampered

The attacker's problem is the same in every channel: they cannot publish hashes at the legitimate entity's domain.

## The Absence Signal

The most powerful long-term defence is not the verification itself but its expected presence. Once recipients learn that their bank's genuine communications always carry a `verify:` line:

- A phone call without the RCS verification is suspicious
- A text without the `verify:` line is suspicious
- An email without the `verify:` block is suspicious
- A sign with a QR code but no `verify:` line may have been tampered with

This is the HTTPS padlock effect applied to communications. The padlock itself does not make a website trustworthy, but its absence on a site that should have one is a warning. The same dynamic applies here: once an institution adopts Live Verify, the absence of verification in a message claiming to be from that institution becomes a fraud signal in its own right.

## What Live Verify Does NOT Do

- **Does not authenticate the sender.** DMARC does that for email; caller ID / STIR-SHAKEN does that for phone; RCS verified sender branding does that for messaging. Live Verify verifies *content*, not *identity*. The two are complementary.
- **Does not prevent social engineering if the recipient ignores the verification.** A sufficiently convincing caller who tells the customer to "ignore that automated message" can still succeed. Customer education is essential.
- **Does not work for channels where the recipient cannot clip or scan text.** Voice-only calls without a parallel messaging channel are the gap that the RCS design addresses.
- **Does not help if the attacker compromises the entity's verification endpoint.** If someone can publish hashes at `barclays.co.uk/calls/v`, the problem is infrastructure security, not verification design.
- **Does not address personal impersonation.** "Hi Mum" scams, romance scams, and other attacks that impersonate individuals rather than institutions have no domain to verify against. These are social engineering problems, not verification problems.

## Document Roles

This family of documents serves different purposes. To keep them disciplined:

| Role | What it covers | Examples |
|:---|:---|:---|
| **Use case** | A specific document or credential type, with mockups, issuer/recipient/third-party analysis, authority chain | `inbound-call-verification`, `bank-branch-and-call-center-verification` |
| **Technical design** | How a specific defence works end-to-end — the flow, the trust model, the attack resistance | `anti-vishing-real-time-call-verification`, `anti-phishing-email-verification` |
| **Mechanics / transport** | How verification text travels across messaging platforms — line breaks, character limits, encoding | `verification-in-messaging-systems` |
| **Client-side enforcement** | How the browser extension or device app protects against spoofing, DOM manipulation, invisible characters | `spoofing-countermeasures` |
| **This document** | The overview — maps the attack family to the defence family, explains the common pattern, links to the specifics | — |

If a new channel or attack variant emerges, it should be clear which role the new document fills. A design doc should not duplicate use-case mockups. A use case should not re-derive the technical flow. The mechanics doc should not make trust-model claims. Each stays in its lane.

## Relationship Between the Docs

This document is the map. The individual docs are the territory:

- **This document** -- overview of the impersonation attack family and how Live Verify's common defence pattern applies to each channel.
- **[anti-vishing-real-time-call-verification.md](anti-vishing-real-time-call-verification.md)** -- deep-dive for phone calls. The most developed design: RCS delivery, one-time code words, time-limited claims. The strongest case because vishing is the hardest to defend against without a parallel verified channel.
- **[anti-smishing-sms-verification.md](anti-smishing-sms-verification.md)** -- the messaging companion. Covers SMS-specific constraints (character limits, carrier line-break mangling, the arrow character solution).
- **[anti-phishing-email-verification.md](anti-phishing-email-verification.md)** -- the email companion. Explains how Live Verify complements DMARC: DMARC authenticates the sender domain; Live Verify authenticates the content.
- **[anti-quishing-qr-code-fraud.md](anti-quishing-qr-code-fraud.md)** -- the physical-world companion. The key insight: QR codes are the vulnerable element (easily overlaid with a sticker), but a `verify:` text line next to the QR code is resistant to overlay because tampering with printed text is visible.
- **[verification-in-messaging-systems.md](verification-in-messaging-systems.md)** -- the technical mechanics of verification across messaging platforms (SMS, RCS, WhatsApp, email, Slack, Teams, etc.). Covers the carriage return problem, channel-specific guidance, and a comprehensive scam taxonomy.
- **[spoofing-countermeasures.md](spoofing-countermeasures.md)** -- the browser extension defence layer. Covers CSS mimicry, DOM mutation, invisible character attacks, homoglyph substitution, and the `allowedDomains` response field. Relevant to all channels where verification happens in a browser.

# Verification in Messaging Systems

Live Verify was designed for printed documents scanned by a camera. But a huge volume of
fraudulent claims arrive via messaging systems — SMS, RCS, WhatsApp, Telegram, Signal,
iMessage, email, Slack, Teams, Discord, and others. This document covers how verification
works (and what breaks) across these channels.

## The Problem

Messaging-based scams are the dominant fraud vector globally:

- **Smishing** (SMS phishing): fake bank alerts, fake delivery notifications, fake tax refunds
- **WhatsApp impersonation**: "Hi Mum, I've lost my phone, can you send money to this account"
- **Business email compromise**: fake invoices, fake CEO wire transfer requests
- **Telegram/Discord scams**: fake airdrops, fake customer support, fake moderation alerts
- **RCS brand spoofing**: messages that look like they come from a brand but don't

In every case, the recipient receives a message claiming to be from a trusted entity
(bank, employer, government, family member, delivery company) and has no way to verify
the claim at the point of reading.

## How Verification Would Work

A legitimate message includes a verifiable block. On platforms with reliable newlines
(WhatsApp, email, RCS, etc.):

```
HSBC: Your direct debit to British Gas
of £127.50 has been processed.
Ref: DD-2026-03-441928
Salt: 7k3m
verify:alerts.hsbc.co.uk/tx
```

On SMS, where internal newlines may be mangled, use `↲` for line breaks within the
claim text (see "The Arrow Character Solution" below):

```
HSBC: Direct debit to British Gas↲£127.50↲Ref: DD-2026-03-441928↲Salt: 7k3m
verify:alerts.hsbc.co.uk/tx
```

The recipient selects the text (or copies it), and the Live Verify client computes the
hash and checks it against `alerts.hsbc.co.uk`. A scammer sending a fake "HSBC" message
cannot produce a hash that resolves against HSBC's domain.

The **absence** of a verify line doesn't prove a message is fraudulent — most legitimate
messages don't include one yet. But for issuers who adopt it (banks, government, delivery
companies), the presence of a valid verify line becomes a trust signal, and recipients
learn to be suspicious of messages claiming to be from that issuer without one.

## The Carriage Return Problem

The core challenge for messaging systems: Live Verify computes hashes over multi-line
text, where line breaks are semantically significant. But messaging systems handle line
breaks inconsistently:

| System | Line break behaviour |
|--------|---------------------|
| **SMS (GSM-7)** | `\n` supported but some carriers strip or convert to spaces |
| **SMS (Unicode)** | `\n` generally preserved but reduces segment to 70 chars |
| **RCS** | Real formatting; line breaks preserved |
| **iMessage** | Line breaks preserved |
| **WhatsApp** | Line breaks preserved; Shift+Enter for newlines |
| **Telegram** | Line breaks preserved |
| **Signal** | Line breaks preserved |
| **Slack** | Line breaks preserved; Shift+Enter for newlines |
| **Teams** | Line breaks preserved; Shift+Enter for newlines |
| **Discord** | Line breaks preserved; Shift+Enter for newlines |
| **Email (plain text)** | Line breaks preserved; some clients re-wrap at 72/76 chars |
| **Email (HTML)** | `<br>` and `<p>` tags; plain text part may re-wrap |
| **WeChat** | Line breaks preserved |
| **LINE** | Line breaks preserved |
| **KakaoTalk** | Line breaks preserved |
| **Viber** | Line breaks preserved |

SMS is the only major system where line breaks are unreliable. Every IP-based messaging
platform preserves them.

## The Arrow Character Solution (SMS Only)

For SMS, where actual `\n` characters may be mangled by carriers, we support two Unicode
arrow characters as **semantic line break markers**:

- **U+21B2** `↲` (Downwards Arrow with Tip Leftwards)
- **U+21A9** `↩` (Leftwards Arrow with Hook)

Either character, when encountered in the input text, is treated as a newline during
normalisation — before the hash is computed.

### SMS Example

The `verify:` line itself **must be on a genuine newline** — this is how the client
identifies it. The `↲` characters are used for line breaks *within the claim text above
it* that might be mangled by carriers.

What the sender transmits:

```
HSBC: Direct debit to British Gas↲£127.50↲Ref: DD-2026-03-441928↲Salt: 7k3m
verify:alerts.hsbc.co.uk/tx
```

The `verify:` line is separated by a real `\n` (which SMS does support — carrier
unreliability is mainly with multiple consecutive newlines being collapsed, not single
ones). The `↲` characters within the claim body survive any carrier transformation
because they're regular Unicode characters, not control characters.

What the Live Verify client normalises to (before hashing):

```
HSBC: Direct debit to British Gas
£127.50
Ref: DD-2026-03-441928
Salt: 7k3m
```

The `↲` glyphs are visually intuitive — they look like "line continues below" — and
the `verify:` line is excluded from the hash input as usual.

### Trade-offs

- SMS switches from GSM-7 (160 chars/segment) to Unicode (70 chars/segment) when any
  non-ASCII character is present. The `↲` character forces Unicode encoding, so the
  message will cost 2-3 segments instead of 1-2.
- RCS, iMessage, WhatsApp, and all IP-based platforms don't need this — they preserve
  real newlines. The arrow convention is **SMS-only**.
- Both `↲` and `↩` are treated identically. Issuers should pick one and be consistent;
  clients accept both.

### Implementation

The normalisation layer (`normalize.js`, `TextNormalizer.kt`, iOS `JSBridge`) must
convert `↲` and `↩` to `\n` **before** all other normalisation steps. This ensures the
rest of the pipeline (line splitting, trimming, blank line removal) works identically
whether the input came from SMS, camera OCR, or copy-paste.

```javascript
// In normalizeText(), before existing normalization:
text = text.replace(/[\u21B2\u21A9]/g, '\n');
```

## Channel-Specific Guidance

### SMS / RCS

**SMS** is the most important channel for scam prevention and the hardest for Live Verify.
Constraints:
- No formatting (bold, links, images)
- Character limits (70 Unicode or 160 GSM-7 per segment)
- The verify line + salt consumes ~40 characters
- Use `↲` for line breaks to survive carrier mangling

**RCS** (Rich Communication Services) supports formatted text, images, and verified
sender identity (Google's Verified SMS). RCS already has a brand verification mechanism,
but it's carrier-dependent and doesn't cover the *content* of the message. Live Verify
adds content verification on top: "this specific transaction detail was issued by the
bank, not just the sender ID."

### WhatsApp / Telegram / Signal

These platforms preserve formatting and support long messages. The verify line works
naturally:

```
Your appointment is confirmed.

NHS Dental Practice
Patient: Sarah Williams
Date: Tuesday 12 March 2026, 10:30am
Dentist: Dr. Patel
Salt: 8n4w
verify:appointments.nhsdental.co.uk/v
```

**WhatsApp Business API** already supports verified business accounts (green tick), but
this only proves the *sender* is legitimate — not that the *content* is accurate. A
compromised WhatsApp Business account could send false appointment details. The verify
line ties the specific content to the issuer's domain.

### Email

Email is the original phishing vector. DKIM/SPF/DMARC verify the *sender domain* but
not the *content*. A legitimate-looking email from a compromised account, or a
well-spoofed email that passes SPF, can contain fabricated content.

The browser extension already handles email — the user selects text in their email client
(Gmail, Outlook web) and verifies via right-click. No special adaptations needed.

For the Thunderbird extension (`apps/thunderbird-extension/`), verification works natively
within the email client.

### Slack / Teams / Discord

Workplace messaging. The primary fraud vector isn't external scams but **internal
impersonation** and **business email compromise** patterns moving to chat:

- "This is the CEO, I need you to wire $50,000 to this account immediately"
- "IT department here, we need your credentials for a security update"
- Fake HR messages about policy changes or termination

A verify line in official corporate communications (payroll notifications, policy updates,
IT security alerts) lets employees distinguish genuine messages from impersonation.

## Use Cases by Message Type

### Bank & Financial Alerts

The highest-value SMS verification target. Scam messages impersonate banks to steal
credentials or redirect payments.

**Legitimate (with verification):**
```
Barclays: Payment of £2,340.00 to HMRC↲received 08/03/2026 14:22↲Ref: FP-882991↲Salt: 3j7k
verify:alerts.barclays.co.uk/tx
```

**Scam (no verification possible):**
```
Barclays: Unusual activity detected on your account.
Verify your identity: bit.ly/barc-verify
```

### Delivery Notifications

"Your parcel is held at customs, pay £1.20 to release it" — one of the most common
SMS scams globally.

**Legitimate:**
```
Royal Mail: Your item arriving tomorrow↲Ref: RR123456789GB↲Salt: 4m2n
verify:tracking.royalmail.com/v
```

### Government / Tax

"You are owed a tax refund of £847.20, click here to claim" — HMRC, IRS, and equivalents
are heavily impersonated.

**Legitimate:**
```
HMRC: Your Self Assessment for 2024-25↲is due by 31 January 2026↲UTR: 1234567890↲Salt: 9p3r
verify:notifications.tax.service.gov.uk/v
```

### Appointment Confirmations

NHS, GP surgeries, hospitals, dental practices — patients receive SMS confirmations and
reminders. Scammers send fake "your appointment has been cancelled, call this number to
rebook" messages.

### Two-Factor Authentication Codes

2FA codes are already authenticated by the act of being expected — the user just triggered
a login. Adding verification would add friction to a time-sensitive flow. **Not a good
fit for Live Verify.**

### "Hi Mum" / Family Impersonation

"I've lost my phone, this is my new number, can you send £200 to this account." The
scammer impersonates a family member. Live Verify can't help here — the claimed issuer
is a person, not an organisation with a domain. This is a social engineering problem,
not a verification problem.

## Adoption Strategy

Verification in messaging works best with **institutional senders** who send at high
volume and are frequently impersonated:

**Tier 1 — Highest impact, easiest adoption:**
- Banks (transaction alerts, fraud warnings)
- Delivery companies (tracking updates, delivery confirmations)
- Government (tax notifications, benefit confirmations, appointment reminders)
- Utilities (billing confirmations, meter reading confirmations)

**Tier 2 — Medium impact:**
- Healthcare (appointment confirmations, prescription reminders)
- Insurance (policy confirmations, claims updates)
- Employers (payroll notifications, HR communications)
- Educational institutions (enrolment confirmations, exam results)

**Tier 3 — Niche but valuable:**
- Legal (court dates, solicitor communications)
- Property (tenancy confirmations, maintenance notifications)
- Travel (booking confirmations, gate changes)

The adoption path is issuer-led: banks and delivery companies add verify lines to their
existing SMS templates. Recipients don't need to do anything differently until they want
to check — then they copy the text and verify.

## Scam Taxonomy: What Messages Claim and Who They Impersonate

The following is a comprehensive enumeration of messaging-based scam types, grouped by
the institutional identity being impersonated. For each category, we note whether Live
Verify could help (i.e., whether the real institution could issue verifiable messages).

### Banking & Financial

| Scam | Example Message | Could LV Help? |
|------|----------------|----------------|
| Suspicious activity alert | "Unusual login detected on your account. Verify now" | Yes — bank hashes the real alert |
| Card blocked / frozen | "Your Visa card has been suspended. Call this number" | Yes |
| Wire transfer confirmation | "You sent £3,200 to J. Smith. If this wasn't you, click here" | Yes |
| Direct debit notification | "Your direct debit to British Gas of £127.50 processed" | Yes |
| Loan pre-approval | "You've been pre-approved for a £25,000 loan at 3.9%" | Yes — real lender can verify |
| OTP / verification code theft | "Reply with the 6-digit code to cancel your transaction" | No — 2FA codes are time-sensitive, not hashable |
| Investment opportunity | "Exclusive crypto opportunity, 300% returns guaranteed" | No — no legitimate institution to verify against |
| Fake fraud department | "This is your bank's fraud team. We need to move your money to a safe account" | Yes — real fraud alerts carry verifiable hashes |

### Delivery & Postal

| Scam | Example Message | Could LV Help? |
|------|----------------|----------------|
| Failed delivery / pay to redeliver | "We couldn't deliver your parcel. Pay £1.50 to rearrange" | Yes — Royal Mail / FedEx hash real notifications |
| Customs fee required | "Your package is held at customs. Pay duty to release" | Yes |
| Tracking update | "Your Amazon order has shipped. Track: [link]" | Yes |
| Address confirmation | "We need to confirm your delivery address" | Yes |

### Government & Tax

| Scam | Example Message | Could LV Help? |
|------|----------------|----------------|
| Tax refund | "You are owed a refund of £847.20. Claim now" | Yes — HMRC / IRS hash real notifications |
| Toll road unpaid fee | "Unpaid toll of $4.15. Pay now to avoid $50 late fee" | Yes |
| Jury duty / court summons | "You failed to appear for jury service. Call immediately" | Yes |
| Benefits / welfare notification | "Your Universal Credit payment has been suspended" | Yes |
| Census / survey | "Complete the mandatory census or face a £1,000 fine" | Yes |
| Voter registration | "Your voter registration is about to expire" | Yes |
| Immigration status | "Your visa application requires additional documents" | Yes |
| Driving licence / vehicle | "Your vehicle tax is due. Pay now to avoid clamping" | Yes |

### Healthcare

| Scam | Example Message | Could LV Help? |
|------|----------------|----------------|
| Appointment confirmation | "Your appointment has been cancelled. Call to rebook" | Yes — NHS / clinic hashes real confirmations |
| Prescription ready | "Your prescription is ready at Boots. Collect by Friday" | Yes |
| Test results available | "Your blood test results are available. Log in to view" | Yes |
| Vaccination reminder | "You are due for your COVID booster. Book now" | Yes |
| Insurance claim | "Your health insurance claim has been denied. Appeal here" | Yes |

### Employment & Recruitment

| Scam | Example Message | Could LV Help? |
|------|----------------|----------------|
| Job offer | "Work from home, earn £300/day reviewing products" | Partially — real employers could verify offers, but scam jobs have no real employer |
| Task / click scam | "Like these videos for £5 each. Sign up here" | No — no institution to verify |
| Payroll notification | "Your payslip for March is available. Download here" | Yes — employer hashes real notifications |
| HR policy change | "New expenses policy effective immediately. Read here" | Yes |

### Telecommunications & Utilities

| Scam | Example Message | Could LV Help? |
|------|----------------|----------------|
| Account suspension | "Your mobile account will be suspended in 24 hours" | Yes — carrier hashes real alerts |
| Bill overdue | "Your electricity bill of £234 is overdue. Pay now" | Yes |
| Broadband upgrade | "Free broadband upgrade available. Claim here" | Partially |
| Number porting warning | "Someone is trying to transfer your number" | Yes |

### E-Commerce & Retail

| Scam | Example Message | Could LV Help? |
|------|----------------|----------------|
| Order confirmation (fake) | "Your Apple order of £999 has been confirmed" | Yes — real retailer hashes orders |
| Refund notification | "Your refund of £149.99 is pending. Verify your bank details" | Yes |
| Prize / gift card | "You've won a £500 Amazon gift card. Claim now" | No — no legitimate prize to verify |
| Subscription renewal | "Your Netflix subscription will renew at £49.99/month" | Yes |
| Loyalty points expiring | "Your Tesco Clubcard points expire tomorrow" | Yes |

### Social / Personal

| Scam | Example Message | Could LV Help? |
|------|----------------|----------------|
| "Hi Mum" / family emergency | "Hi Mum, lost my phone, can you send £200 to this account" | No — personal, not institutional |
| Romance scam | "I'm stuck abroad and need money for a flight home" | No — personal relationship |
| Charity appeal | "Donate to earthquake relief. Every £5 saves a life" | Partially — real charities could verify appeals |
| Celebrity endorsement | "Elon Musk is giving away Bitcoin. Send 0.1 BTC to receive 1 BTC" | No |
| Wrong number / "pig butchering" | "Hi, is this Sarah? Oh sorry, wrong number... but since we're chatting" | No — social engineering, not impersonation |

### Corporate / Workplace (Slack, Teams, Discord)

| Scam | Example Message | Could LV Help? |
|------|----------------|----------------|
| CEO wire transfer | "This is urgent. Wire £50,000 to this account for the acquisition" | No — wire instructions via chat should never happen; verification would legitimise a broken process |
| IT credentials phishing | "IT here. We need your password for a security update" | No — legitimate IT should never request passwords via messaging; verification would normalise the practice |
| Fake HR announcement | "New remote work policy. Sign the attached document" | Partially — real HR announcements could be verifiable, but policy documents belong on the intranet, not in chat |
| Vendor invoice redirect | "Our bank details have changed. Please update your records" | No — bank detail changes must go through formal procurement channels, not messaging; see [vendor bank account verification](../public/use-cases/vendor-bank-account-verification.md) |
| Fake moderation alert (Discord) | "Your account will be banned. Verify here" | Partially — platform could issue real alerts, but moderation actions happen in-platform, not via DM |

### Property & Housing

| Scam | Example Message | Could LV Help? |
|------|----------------|----------------|
| Rental deposit | "Deposit this apartment now before someone else does" | Partially — letting agent could verify listings |
| Conveyancing fraud | "Your solicitor's bank details have changed for completion" | Yes — critical; see [settlement statements](../public/use-cases/settlement-statements.md) |
| Council tax | "Your council tax band has been reassessed. Pay the difference" | Yes |
| Energy supplier switch | "Your energy supplier has gone bust. Sign up with us now" | Partially |

### Legal & Enforcement

| Scam | Example Message | Could LV Help? |
|------|----------------|----------------|
| Fine / penalty notice | "You have an unpaid parking fine of £70. Pay within 14 days" | Yes — issuing authority hashes real notices |
| Warrant / arrest threat | "A warrant has been issued for your arrest. Call to resolve" | Yes — courts hash real notices |
| Solicitor impersonation | "Your case requires immediate payment of legal fees" | Yes — law firm verifies real communications |
| Debt collection | "This is your final notice. Pay £1,240 or face court action" | Yes — real debt correspondence is verifiable |

### Summary

Of the ~50 scam types above:
- **~30 are preventable** with Live Verify (the real institution could issue verifiable messages)
- **~8 are partially addressable** (depends on adoption by the impersonated entity)
- **~7 are not addressable** (personal/social engineering with no institution to verify against, or time-sensitive codes)
- **~5 should not be addressed** — the underlying request (wire transfers via chat, passwords via messaging, bank detail changes via DM) is itself illegitimate. Verification would normalise a broken process. The correct answer is "this should never arrive via this channel," not "let's make it verifiable."

The pattern is clear: **scams that impersonate institutions sending routine notifications
are preventable; scams that exploit personal relationships are not; and scams that mimic
requests which should never happen via messaging should be rejected at the process level,
not verified.**

---

## What Live Verify Does NOT Solve

- **Sender identity:** DKIM, SPF, DMARC (email), Verified SMS (RCS), WhatsApp Business
  verification. These prove *who sent the message*. Live Verify proves *what the message
  says is true*.
- **Link safety:** URL scanning, Safe Browsing, phishing filters. Live Verify doesn't
  evaluate links.
- **Social engineering:** "Hi Mum" scams, romance scams, and other attacks that don't
  impersonate an institution.
- **Spam filtering:** Volume-based detection is a different problem.

Live Verify is complementary to these — it adds **content verification** where existing
tools only provide sender verification or link scanning.

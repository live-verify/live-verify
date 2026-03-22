# Anti-Phishing: Email Verification with Live Verify

The defence: make the claimed authority produce a verifiable object inside the email. See [Channel Impersonation Fraud Controls](channel-impersonation-fraud-controls.md) for the family overview.

## The Problem

Business email compromise (BEC) and consumer phishing are the largest fraud categories by financial value. The FBI's Internet Crime Complaint Center reported $2.9 billion in BEC losses in 2023 alone — more than any other cybercrime category. Consumer phishing (credential harvesting, fake invoices, fake account alerts) adds billions more globally.

Email already has authentication infrastructure: SPF, DKIM, and DMARC. Together, these prove that an email was sent from an authorised server for a given domain. They work. But they have three structural limitations that BEC and phishing exploit:

1. **Invisible to the recipient.** No mainstream email client shows "this email passed DMARC" in a way that a normal user sees, reads, and acts on. The authentication happens in the background. The user sees the email and either trusts it or doesn't, with no visible trust signal derived from the authentication result.

2. **Compromised accounts pass them.** BEC works by compromising a legitimate email account — the CFO's mailbox, the supplier's accounts-payable address, the solicitor's conveyancing account. Emails sent from a compromised account pass DMARC, because they genuinely originate from the correct domain. The sending infrastructure is authentic. The content is not.

3. **No content integrity.** DMARC proves the sending domain. It says nothing about the content of the email body. An attacker who gains access to a legitimate account can send an email with modified invoice details, changed bank account numbers, or false payment instructions. DMARC passes. The content is fraudulent.

The gap between "this email is from the right domain" and "this email says what the sender intended" is where BEC lives.

## The Design

A legitimate email includes a `verify:` block at the bottom of the body. The content above the verify line — the invoice details, payment instructions, account change notification — is hashed and published to the sender's domain. The recipient (or their email client, or a Live Verify browser extension) clips the text, computes the hash, and checks it against the sender's endpoint.

### Invoice Email

```
From: accounts@supplier.com
Subject: Invoice #INV-2026-0847 — March services

Payment due for March consulting services.

Supplier:     Acme Consulting Ltd
Invoice:      INV-2026-0847
Amount:       £12,400.00
Due date:     15 April 2026
Bank:         Lloyds Bank
Sort code:    30-92-17
Account:      48291056
Reference:    ACM-0847
Salt: 4k7m
verify:invoices.acmeconsulting.co.uk/v
```

The recipient's email client (or browser extension) verifies the hash against `invoices.acmeconsulting.co.uk`. If the invoice amount, bank details, or any other field has been modified, the hash doesn't match.

### Payment Instruction Email

```
From: completions@smithandpartners.co.uk
Subject: Completion funds — 14 Elm Road

Completion is scheduled for 28 March 2026.
Please transfer the balance to:

Property:     14 Elm Road, Bristol BS1 4QT
Amount:       £327,500.00
Bank:         HSBC UK
Sort code:    40-11-60
Account:      72938145
Reference:    ELM14-COMPLETION
Salt: 9n3p
verify:completions.smithandpartners.co.uk/v
```

Conveyancing fraud — where criminals intercept solicitor emails and substitute bank details — is one of the highest-value email fraud types. The verify line makes the substitution detectable: the original bank details are hashed, the modified ones produce a different hash.

### Account Change Notification

```
From: security@chase.com
Subject: Your email address has been updated

Your account email address has been changed.

Account:      ****4821
Previous:     j.smith@gmail.com
New:          j.smith@protonmail.com
Changed:      22 March 2026, 09:14 EST
Salt: 2r8f
verify:alerts.chase.com/v
```

If this is a genuine change, the hash verifies. If an attacker has modified the notification to make a fraudulent change look routine, the hash fails.

## What DMARC Does vs What Live Verify Does

DMARC and Live Verify operate at different layers. Neither replaces the other.

**DMARC proves the sending domain.** It answers: "did this email come from an authorised server for chase.com?" If yes, the domain is authenticated. If no, the email can be rejected or quarantined. DMARC is infrastructure-level authentication — it happens before the recipient sees the email.

**Live Verify proves the content.** It answers: "does the content of this email — the invoice amount, the bank details, the account change — match what the sender's domain published?" This is content-level authentication — it happens when the recipient reads the email.

The two are complementary:

| Scenario | DMARC | Live Verify | Outcome |
|----------|-------|-------------|---------|
| Legitimate email, unmodified | Pass | Pass | Trusted |
| Spoofed email from a fake domain | Fail | N/A | Rejected by DMARC before it arrives |
| Compromised account, modified content | Pass | Fail | DMARC passes (legitimate domain), Live Verify catches the content change |
| Legitimate email forwarded through a different domain | Fail or softfail | Pass | Content is genuine but routing is unusual — recipient can verify content even if DMARC alignment breaks |
| Spoofed email with fabricated verify line | Fail | Fail | Both layers catch it |

The critical row is the third one: compromised account, modified content. This is BEC. DMARC cannot help because the email genuinely originates from the correct domain. Live Verify catches the modification because the content doesn't match what was published.

## The BEC-Specific Angle

A typical BEC attack:

1. Attacker compromises the CFO's email account (via credential phishing, session hijacking, or malware)
2. Attacker monitors email for an upcoming payment or invoice
3. Attacker sends an email from the CFO's genuine account to accounts payable: "The bank details for the supplier payment have changed. Use these new details."
4. The email passes DMARC — it IS from the CFO's domain
5. Accounts payable processes the payment to the attacker's account

With Live Verify:

1. The CFO's organisation publishes hashes for all payment instructions and invoice approvals
2. The attacker sends the modified payment instruction from the compromised account
3. DMARC passes — the domain is correct
4. Accounts payable's email client checks the verify line — the hash doesn't match, because the bank details were changed by the attacker
5. The payment is flagged and held

The attacker cannot publish a matching hash to the CFO's domain without also compromising the verification endpoint — which is a separate system from the email account. Compromising one system (email) no longer gives full control over payment instructions.

## Email Client Integration

A Live Verify plugin for email clients could automatically detect `verify:` blocks in incoming emails and verify them in the background, showing a visible indicator:

### Gmail / Outlook Web

The browser extension already handles this — the user selects text in the email and verifies via right-click or the extension popup. A deeper integration could detect verify blocks automatically and show an inline indicator.

### Outlook Desktop / Apple Mail / Thunderbird

A native plugin detects the `verify:` line pattern, extracts the text above it, computes the hash, and checks the endpoint. The result appears as a banner or icon in the email header area — similar to how email clients already show encryption status or external-sender warnings.

```
┌─────────────────────────────────────────────────┐
│ ✓ Content verified against invoices.acme...     │
│   Hash checked: 22 Mar 2026 09:31               │
│   Endpoint: invoices.acmeconsulting.co.uk/v     │
└─────────────────────────────────────────────────┘
```

Or, if the hash doesn't match:

```
┌─────────────────────────────────────────────────┐
│ ✗ Content verification FAILED                   │
│   The content of this email does not match      │
│   what the sender's domain published.           │
│   Do not act on payment instructions in this    │
│   email without independent confirmation.       │
└─────────────────────────────────────────────────┘
```

For organisations handling high-value transactions (law firms, finance departments, property conveyancers), the failed-verification banner is the critical output. It turns an invisible content modification into a visible, actionable warning.

### Mobile Email Clients

Mobile integration is harder — iOS Mail and Android Gmail don't support plugins in the same way. The fallback is copy-paste: the user copies the email text and verifies via the Live Verify app or web tool. Over time, if email providers build Live Verify checking into their clients natively, mobile coverage improves.

## Attack Resistance

### Attacker sends email from a spoofed domain

DMARC catches this before Live Verify is relevant. The email is rejected or quarantined at the infrastructure level. Live Verify is not needed for this case — DMARC already handles it.

### Attacker compromises a legitimate account and modifies content

This is the core BEC scenario. DMARC passes. Live Verify fails because the modified content doesn't match the published hash. The attacker would need to also compromise the verification endpoint to publish a matching hash — a separate system with separate credentials.

### Attacker strips the verify line from the email

The email arrives without a verify line. For organisations that always include verify lines in payment-related emails, the absence is itself suspicious. Over time, "invoice email from this supplier without a verify line" becomes a flag for accounts payable to check via another channel.

### Attacker fabricates a verify line pointing to their own domain

The verify line says `verify:evil-domain.com/v` instead of `verify:acmeconsulting.co.uk/v`. The recipient (or their email client) sees that the verification domain doesn't match the sender's domain — a clear warning signal. A well-configured email client plugin could flag this automatically: "verification domain does not match sender domain."

### Attacker intercepts the email in transit and modifies content

If the attacker modifies the email body after it leaves the sender's mail server, the content no longer matches the published hash. Live Verify catches the modification regardless of where in the delivery chain it happened.

### Man-in-the-middle replaces the entire email including a new verify line

The new verify line points to the attacker's domain (not the sender's), which is detectable. Or the attacker tries to use the sender's domain, but cannot publish a hash there. Either way, the modification is caught.

## Relationship to DMARC/SPF/DKIM

Live Verify is not a replacement for email authentication infrastructure. It is a different layer.

| Layer | What it proves | Who operates it | What it stops |
|-------|---------------|-----------------|---------------|
| **SPF** | The sending IP is authorised for this domain | Domain owner (DNS record) | Email from unauthorised servers |
| **DKIM** | The email headers/body were signed by the domain's key | Domain owner (DNS record + mail server) | Tampering with headers after sending |
| **DMARC** | SPF and DKIM align with the From: domain | Domain owner (DNS record) | Domain spoofing |
| **Live Verify** | The email body content matches what the domain published | Domain owner (verification endpoint) | Content modification after account compromise |

SPF, DKIM, and DMARC are infrastructure layers — they authenticate the envelope and the sending chain. Live Verify is a content layer — it authenticates what the email says. A complete defence uses both: the infrastructure layers reject emails from the wrong domain, and the content layer catches modifications from within the right domain.

## Scope Limitations

- **Does not authenticate the sender.** Live Verify proves the content matches what a domain published. It does not prove who sent the email. DMARC does that. An email with a valid verify line but failing DMARC should still be treated with suspicion.
- **Does not help if the attacker sends from a different domain.** If the attacker registers `acme-consulting.co.uk` (note the hyphen) and sends an invoice from there, Live Verify would verify against the attacker's domain. But DMARC would also fail for the real domain, and the From: address is visibly different. This is a sender-authentication problem, not a content-authentication problem.
- **Does not protect against a fully compromised organisation.** If the attacker controls both the email account and the verification endpoint, they can publish matching hashes for fraudulent content. But compromising two separate systems is substantially harder than compromising one.
- **Requires issuer adoption.** The sender must generate and publish hashes. Until a supplier, bank, or solicitor adopts Live Verify, their emails have no verify line. This is the standard adoption constraint — it improves as more issuers participate.
- **Email formatting may affect hashing.** HTML emails, rich-text formatting, quoted-printable encoding, and email client re-wrapping can alter the visible text. The verify block should be in the plain-text part of the email, and the Live Verify client should normalise whitespace before hashing (as it already does for other input sources). Issuers generating verify lines should base their hash on the normalised plain-text version.
- **Does not replace out-of-band confirmation for high-value transactions.** For wire transfers above a certain threshold, organisations should still confirm payment details by phone or in person. Live Verify reduces the number of fraudulent instructions that reach this stage, but it does not eliminate the need for procedural controls on high-value payments.

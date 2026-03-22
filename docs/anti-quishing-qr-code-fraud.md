# Anti-Quishing: QR Code Fraud and Live Verify

The defence: make the claimed authority produce a verifiable text object alongside the QR code. See [Channel Impersonation Fraud Controls](channel-impersonation-fraud-controls.md) for the family overview.

## The Problem

Quishing (QR code phishing) exploits the fact that a QR code is opaque: the user cannot see where it leads before scanning it. Criminals print fake QR codes and stick them over legitimate ones. The victim scans, expects a payment page or information site, and lands on a phishing site that harvests credentials or payment details.

Common targets:

- **Parking meters** — a sticker over the council's payment QR code redirects to a fake payment page that collects card details
- **Restaurant menus** — a replacement QR code sends diners to a phishing site styled as the restaurant's ordering system
- **EV charging stations** — a fake QR code overlay redirects to a payment page that mimics the charging network
- **Bus stops and council notices** — fake QR codes on public information posters lead to credential-harvesting sites
- **Concert and event posters** — a QR code stuck over a legitimate poster redirects to a fake ticketing site

The attack is growing because QR codes became ubiquitous post-COVID. Restaurants, parking operators, transit authorities, and event venues trained the public to scan QR codes without hesitation. The codes are small, cheap to print, and trivial to stick over a legitimate one. The user has no way to distinguish a genuine QR code from a fake one by looking at it.

## How Live Verify Is Different from a QR Code

A QR code encodes a URL. When scanned, the phone opens that URL. The QR code tells the user **where to go** — and that is the attack vector. A fake QR code sends the user to the attacker's site.

A Live Verify `verify:` line works differently. It is plain text, printed in human-readable characters:

```
verify:bristol.gov.uk/parking/v
```

The `verify:` line tells the user **where to check**, not where to go. The domain in the line (`bristol.gov.uk`) is where the hash of the surrounding text is looked up. The user's device computes a hash of the printed text and asks the domain whether that hash exists. If it does, the text is genuine. If it does not, the text has been altered or was never issued by that domain.

This is a fundamental structural difference:

- **QR code**: scan it, go where it says, hope it is legitimate
- **verify: line**: read the domain, hash the text, check the hash against the domain

The QR code is the thing you trust. The `verify:` line is the thing that lets you check trust.

## How Live Verify Could Detect Quishing

Consider a legitimate parking sign issued by a council. It carries both a QR code (for payment) and a `verify:` line (for text verification). A criminal sticks a fake QR code over the payment QR code.

The `verify:` line still points to `bristol.gov.uk`. The user can verify the sign's text — location, tariff, zone number — against the council's domain. If the text verifies, the sign is genuine. The fake QR code is an addition to a genuine sign, not a replacement of it.

This does not tell the user that the QR code is fake. But it tells them that the sign is real, and that the real institution behind the sign is `bristol.gov.uk`. If the QR code leads somewhere other than `bristol.gov.uk`, the user has a reason to be suspicious.

The `verify:` line is the anchor. The QR code is the thing that might have been tampered with.

## The Overlay Attack

A more targeted attack: the criminal sticks a QR code directly **over** the `verify:` line on a poster, covering it. The camera cannot read the text underneath. The user sees only the QR code and has no `verify:` line to check.

Defences:

- **Position the verify: line where it is hard to cover** — print it at the top and bottom of the sign, not adjacent to the QR code
- **Print it in multiple places** — a single `verify:` line is a single point of failure; two or three on the same sign means the attacker must cover all of them
- **Use a different visual zone** — the QR code occupies a defined area. The `verify:` line should be in a separate area of the sign, ideally integrated into the body text rather than isolated in a corner

None of these are perfect, but they raise the cost and visibility of the attack. A QR code sticker that also covers three separate lines of printed text is conspicuous.

## Attack Resistance

**Fake QR codes cannot produce matching hashes.** A criminal can print any QR code they want, but they cannot produce a `verify:` line whose hash matches the institution's domain. The hash is computed from the full text of the sign. To fake the `verify:` line, the attacker would need to either compromise the institution's verification endpoint or replace the entire sign — not just stick a QR code over part of it.

**Legitimate verify: lines cannot be replaced without changing the hash.** Altering any character in the signed text changes the SHA-256 hash. A sticker that covers and replaces the `verify:` line with a different one pointing to the attacker's domain would verify against the attacker's domain, not the institution's. The user sees `verify:evil.com` instead of `verify:bristol.gov.uk` — the domain mismatch is visible in plain text.

## Scope Limitations

- **Live Verify does not scan QR codes.** It scans text. It cannot tell the user whether a QR code is genuine or fake. It can only verify the printed text around the QR code.
- **Full sign replacement defeats this.** If the attacker replaces the entire sign — not just the QR code, but all the text and the `verify:` line — they control the whole surface. The defence described here is for **partial tampering** (a QR code sticker on an otherwise genuine sign), not for full sign replacement. Full replacement is a different threat model closer to counterfeiting, and is addressed by physical security measures (tamper-evident materials, mounting hardware, regular inspections).
- **The user must actually check the verify: line.** If the user scans the QR code without looking at the rest of the sign, the `verify:` line provides no protection. The value is for users who have learned to verify text before trusting a QR code — or who use Live Verify's camera mode to scan the sign and notice that the text verifies against a known institution.
- **Not all signs carry verify: lines today.** This defence only works for institutions that adopt Live Verify on their physical signage. Until adoption is widespread, most signs will have QR codes without `verify:` lines, and quishing will remain effective against them.

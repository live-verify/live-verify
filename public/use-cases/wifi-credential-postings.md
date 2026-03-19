---
title: "Wi-Fi Credential Postings"
category: "Novel Document Types"
volume: "Large"
retention: "Ephemeral (rotates with passphrase)"
slug: "wifi-credential-postings"
verificationMode: "camera"
tags: ["wifi", "credentials", "captive-portal", "eink", "access-control", "post-verification-action", "network", "hospitality", "anti-phishing"]
furtherDerivations: 3
---

## What is a Wi-Fi Credential Posting?

This use case is less about verifying a document and more about what happens *after* verification. The posting on the wall — SSID, password, `verify:` line — is trivially simple. Verifying it proves the café printed it. So what?

The value is in the **post-verification action**: the venue's endpoint issues a network access token, and the access point's walled garden opens up. Before verification, you can reach exactly one domain. After verification, you have full internet access. The verification is the authentication step. The network access is the product.

This makes Wi-Fi credential postings a **Live Verify Action** use case — the verification itself is a means to an end, not the end. It is also a reminder that the hard problem here is product and platform integration: captive portals, OS onboarding, access-point token handling, and router setup flows. Without that integration, the verification layer alone does not solve much.

### The Problem It Solves

You're in a café. You want the Wi-Fi. The barista points at a chalkboard: `FlatWhite2024` / `coffee123`. You type it in. You're online.

But what are you actually connected to? The SSID says "The Roastery Guest" but anyone in the room could have set up a hotspot with the same name. You're now routing all your traffic — banking app, email, password resets — through a network you've taken on faith. The chalkboard told you *how* to connect. It told you nothing about *who you're connecting to*.

This is an "evil twin" attack, and it's trivial. A £30 pocket router, an identical SSID, a stronger signal than the café's actual access point — and every customer who connects is sending their traffic through the attacker's device. The café's chalkboard is, inadvertently, the lure. It gave everyone the SSID to look for, and the attacker provided it first.

With Live Verify, the Wi-Fi credentials are a verifiable posting. The `verify:` line confirms that the credentials came from the business's own domain — and the post-verification action gates internet access through the legitimate access point.

<div style="max-width: 550px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="wifi1"></span>THE ROASTERY — FREE WI-FI
═══════════════════════════════════════════

Network:   TheRoastery-Guest
Password:  march-latte-9X4k

<span data-verify-line="wifi1">verify:wifi.theroastery.co.uk/v</span> <span verifiable-text="end" data-for="wifi1"></span></pre>
</div>

## The Problem with Today's Wi-Fi Credentials

Every café, hotel, co-working space, airport lounge, and hospital waiting room distributes Wi-Fi credentials the same way: print them on a card, write them on a board, stick them on a table tent. The credentials are correct. But they answer the wrong question.

The customer asks: "What's the Wi-Fi password?" The credentials answer this. The customer should be asking: "Is this network operated by who I think it is?" Nobody does. Nobody can.

**Evil twin attacks** exploit this gap. The attacker doesn't need to crack any password — they *are* the network. They broadcast the same SSID, accept the same password, and transparently proxy traffic to the real internet so the victim notices nothing. Meanwhile the attacker captures unencrypted traffic, intercepts DNS queries, injects content, and performs SSL stripping on poorly-configured sites.

**Captive portal phishing** is the subtler variant. The attacker's network presents a login page that looks like the venue's branding: "Enter your email to access The Roastery Wi-Fi." The customer enters their email — and now the attacker has it, along with any password the customer helpfully types into the "password" field (thinking it's the Wi-Fi password, not realising they're on a phishing page).

Both attacks are undetectable by the customer using today's credential distribution methods. A chalkboard can't authenticate itself.

## How It Works: Verify Once, Connect Securely

The flow has three steps, but the weight is on the last one. Steps 1 and 2 are standard Live Verify — scan, check hash, green tick. Step 3 is the action that makes the whole thing worthwhile.

### Step 1 — Scan the Posting

The customer scans the posting with their phone camera. The `verify:` line resolves against the venue's domain. The hash covers the SSID and password text — if someone peels off the real posting and replaces it with one pointing to a rogue network, the hash won't match the venue's endpoint.

### Step 2 — Connect to the Network

The customer connects using the SSID and password from the verified posting. They're now on the venue's network — but in a **walled garden**. They can reach the venue's verification domain and nothing else. No internet. No email. No banking app. Just the one domain they need for Step 3.

### Step 3 — The Action: Token Exchange Opens the Internet

This is the point of the whole use case. The verification response includes a **network access token** — and the customer's device presents it to the access point to unlock full internet access.

```
HTTP 200 OK
Status: OK

Network credentials verified.
SSID: TheRoastery-Guest
Password: march-latte-9X4k
Issued: 10 MAR 2026 06:00

--- Access Token ---

Your device has been issued a temporary access token.
Until you verified, only this domain (wifi.theroastery.co.uk)
was reachable from the network.

Token: eyJhbGciOiJFUzI1NiJ9.café-token.dGhpcyBpcyBub3Q
Expires: 10 MAR 2026 23:59
Scope: Full internet access

Optional: provide an email address to extend access
to 7 days and receive the next passphrase rotation.

  [Connect now — no email]
  [Enter email for extended access]
```

### How the Walled Garden Works

The access point runs a **walled garden** — the industry term for a captive portal's DNS/IP allow-list. Before the token exchange, a connected device can reach exactly one destination: the venue's verification endpoint. Every other DNS query resolves to the captive portal page. Every other IP is blocked.

This is infrastructure that already exists. Hotel Wi-Fi and airport Wi-Fi work this way today. But the deployment burden is the point: the use case only works if the venue controls the captive portal, token validation, and OS onboarding flow. This is why the problem is primarily integration, not document integrity.

The access point checks the token (a signed JWT or similar) against the venue's auth endpoint. Valid token → full DNS and routing opens up. No token → walled garden persists. The token is scoped to the device's MAC address and expires at the end of the credential rotation period.

### Why This Defeats Evil Twins

An evil twin can broadcast the same SSID and accept the same password. But it cannot:

1. **Serve a valid verification response** for the venue's domain. The `verify:` line points to `wifi.theroastery.co.uk`. The attacker doesn't control that domain. The verification fails.
2. **Issue a valid access token.** The token is signed by the venue's key. The attacker can't forge it.
3. **Run the correct walled garden.** A customer who connects to the evil twin and tries to verify will reach the attacker's endpoint (or nothing) — not the venue's domain. The mismatch is visible.

The posting on the wall authenticates the network. Today, nothing does.

## The eInk Variant: Rotating Passphrases

A printed card with a static password is fine for a café that changes it monthly. But for venues with higher security requirements — co-working spaces, corporate visitor networks, hospital staff Wi-Fi — the passphrase should rotate regularly.

An **eInk display** mounted on the wall replaces the printed card. The venue's system rotates the WPA passphrase — hourly, daily, weekly — and the eInk display updates to show the new credentials. The `verify:` hash updates simultaneously at the endpoint.

<div style="max-width: 550px; margin: 24px auto; border: 2px solid #333; background: #f5f5f0; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="wifi2"></span>WEWORK MOORGATE — MEMBER WI-FI
═══════════════════════════════════════════

Network:   WeWork-Members-4F
Password:  prism-chalk-8827

Rotates daily at 03:00 UTC
Current until: 11 MAR 2026 03:00

<span data-verify-line="wifi2">verify:net.wework.com/wifi/v</span> <span verifiable-text="end" data-for="wifi2"></span></pre>
</div>

**Why eInk:**
- **Zero power draw** between updates. A daily rotation needs one screen refresh per day — years of battery life.
- **Sunlight readable.** Works in bright lobbies and outdoor terraces where LCD screens wash out.
- **Looks like a printed sign.** Customers don't treat it as a screen; they treat it as a notice. This matters for adoption — people already know how to read a sign.
- **Tamper-evident.** The display is a sealed unit connected to the venue's network. Replacing it with a fake requires physically removing a mounted device, which is conspicuous. Compare: replacing a paper card takes three seconds and nobody notices.

### The Rotation Flow

1. At 03:00, the venue's network controller generates a new WPA passphrase.
2. The access point is reconfigured with the new passphrase (existing connected devices get a graceful re-auth window).
3. The eInk display receives the new credentials over its wired or BLE connection and refreshes.
4. The verification endpoint publishes the new hash. The old hash returns `EXPIRED` with a pointer to the current one.
5. A customer who scans the sign at 09:00 gets the current credentials, verified against the venue's domain, with a token valid until the next rotation.

### Email for Extended Access

The post-verification action offers an optional email exchange: provide an email address, receive an access token that survives the next passphrase rotation. The venue pushes the new credentials to the email address at each rotation.

This serves two purposes:
- **Convenience:** Regular customers (daily café visitors, co-working members) don't need to rescan after every rotation.
- **Venue analytics:** The venue knows how many unique users connect, how often they return, and when they visit — without tracking browsing behaviour. The email is optional; anonymous single-session access always works without it.

The email is exchanged directly with the venue's domain (shown clearly in the verification response). It never passes through Live Verify's infrastructure. The venue's privacy policy governs its use.

## Router and Access Point Initial Setup

Every consumer router ships with default credentials printed on a sticker on the underside: SSID, password, admin URL. You flip the router over, squint at `xR4m-92kT-pLn7` in 6pt type, and peck it into your phone one character at a time. Capital X or lowercase? Is that a zero or an O? You get it wrong twice. The whole thing takes three minutes and feels like 1997.

A `verify:` line on the router sticker turns this into a single camera scan:

<div style="max-width: 550px; margin: 24px auto; border: 1px solid #ccc; background: #f9f9f9; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="router1"></span>TP-Link Archer AX73 — Quick Connect
═══════════════════════════════════════════

Network:   TP-Link_A73_5G
Password:  xR4m-92kT-pLn7

Serial:    2648A-00391-UK

<span data-verify-line="router1">verify:devices.tp-link.com/v</span> <span verifiable-text="end" data-for="router1"></span></pre>
</div>

You scan the sticker. The verification confirms the credentials. The post-verification action offers:

- **Connect now** — auto-fill the Wi-Fi credentials (on platforms that support it). No typing.
- **Change default password** — redirect to the router's admin interface with a prompt to set a new WPA passphrase (the single most important security step most users skip, and the one the setup flow can now nudge them toward)
- **Check for firmware updates** — the verification response includes the shipped firmware version and a flag if an update is available

This turns the router sticker from a squint-and-type chore into a scan-and-connect flow. The verification is incidental — the action is the point. You wanted to get online, and now you are.

**ISP-provided routers** are the largest volume case. When BT, Sky, Virgin Media, Comcast, or AT&T ship a router to a customer, the sticker credentials verify against the ISP's domain (`devices.bt.com`, `setup.xfinity.com`). Scan, connect, done — no phone call to the ISP helpline because you misread a character on the sticker.

### Both Patterns in One Home

A homeowner buys a router. They scan the manufacturer's sticker on the underside — `devices.tp-link.com` verifies, the post-verification action auto-connects their phone and nudges them to change the default password. That's the **router setup** use of this pattern.

Then they print a card for the kitchen — `wifi: OakHouse-Guest / welcome2025` with a `verify:` line — and stick it on the fridge. When friends visit, parents come to stay, or a plumber needs to look something up, they scan the card instead of asking "what's the Wi-Fi password?" and watching someone dictate it character by character.

An Airbnb host does the same thing but at higher volume. So does a pub, a café, a barber shop, a dentist's waiting room, a B&B, a church hall. The pattern scales from a card on your fridge to the chalkboard behind the bar — same scan, same flow.

Same technology, two moments. The router sticker got the owner online. The kitchen card gets everyone else online.

## Data Verified

SSID, passphrase, issuing venue or manufacturer name, credential validity period, rotation schedule (if applicable), access point identifier, device serial and MAC (for router stickers).

**Document Types:**
- **Printed cards / table tents:** Static credentials in cafés, restaurants, waiting rooms.
- **Chalkboards / whiteboards:** Same credentials, less permanent mounting.
- **eInk displays:** Rotating credentials in co-working spaces, hotels, corporate visitor areas.
- **Hotel room cards:** Per-room or per-floor credentials included on the room key folder.
- **Conference badge inserts:** Event Wi-Fi credentials printed on the back of a name badge — verified against the event organiser's domain.
- **Router and access point stickers:** Factory-printed credentials on the device itself — verified against the manufacturer's or ISP's domain.

## Verification Response

- **OK** — Credentials are current and active on the venue's access point.
- **EXPIRED** — Passphrase has rotated. Response includes the new credentials (the customer rescans the updated display, or uses the new credentials directly from the response if they trust the domain).
- **REVOKED** — Network has been taken offline (venue closed, security incident).
- **404** — Credentials not recognised. Possible evil twin — the posting the customer scanned doesn't match any credential set published by this venue.

## Second-Party Use

The **venue operator** (issuer) benefits:

**Evil twin protection for customers.** Venues currently have no way to assure customers their network is legitimate. A verified Wi-Fi posting is the first credible answer to "how do I know this is really your network?"

**Managed access without a captive portal form.** Traditional captive portals require the customer to interact with a web form — accept terms, enter a room number, provide an email. These forms are fragile (they break on iOS, they timeout on Android, they don't work on laptops with aggressive DNS caching). The verification-and-token flow replaces the form with a camera scan of a physical posting.

**Passphrase rotation without customer friction.** With eInk displays and email-based credential push, the venue can rotate passphrases as frequently as needed without customers phoning reception to ask for the new password.

**Visitor analytics.** Scan counts per hour, email opt-in rates, session durations — all without inspecting traffic. The access token provides aggregate usage data; the walled garden means no device connects without a verified scan.

## Third-Party Use

**Customers / Guests**
The primary beneficiary. A business traveller connecting to hotel Wi-Fi with banking credentials on their device. A journalist at a conference who can't afford to have their traffic intercepted. A parent whose child's tablet auto-connects to any open network with a familiar SSID.

**IT Security Teams**
Corporate travel policies can mandate: "Only connect to Wi-Fi networks that verify against a known domain." The Live Verify app logs which networks were verified and by whom — an auditable record that the employee connected to the venue's real network, not an evil twin.

**Event Organisers**
Conferences, trade shows, festivals. Hundreds of attendees connecting to a temporary network. The credential posting on the badge or on stage banners verifies against the event's domain. An attacker setting up a rogue "TechConf2026-WiFi" hotspot in the hall is defeated because their SSID won't verify.

**Hotel Chains**
A Marriott guest in any city scans the room card and sees `wifi.marriott.com` in the chain. They know it's Marriott's network, not a rogue hotspot set up by a guest in the next room. The chain's domain is the trust anchor across all properties.

## Verification Architecture

**The Trust Gap in Wireless Networking**

WPA2/WPA3 encryption protects traffic *on* the network. It does nothing to prove *which* network you're on. The passphrase authenticates the client to the access point — it does not authenticate the access point to the client. This is the fundamental asymmetry that evil twin attacks exploit.

802.1X enterprise authentication (RADIUS, certificates) solves this for corporate networks. But it requires per-device certificate provisioning, an IT department, and a RADIUS server. No café, hotel, or conference is going to deploy 802.1X for guest Wi-Fi.

Live Verify provides access-point-to-client authentication using infrastructure that already exists: a printed sign, a phone camera, and a domain the venue already controls.

**Issuer Types** (First Party)

**Hospitality venues:** Cafés, hotels, restaurants, pubs. The verification endpoint is under the venue's domain or the chain's domain (`wifi.marriott.com`, `net.wework.com`).
**Corporate visitor networks:** The guest Wi-Fi segment of a corporate office. Credentials rotate daily; the eInk display in the lobby updates automatically.
**Event organisers:** Temporary networks for conferences, exhibitions, festivals. Credentials valid for the duration of the event.
**Healthcare facilities:** Hospital and clinic visitor Wi-Fi. The `.nhs.uk` domain provides the trust anchor.
**Educational institutions:** University guest Wi-Fi for visitors, conference attendees, and prospective students on campus tours.
**Router manufacturers:** TP-Link, Netgear, ASUS, Ubiquiti — scan the sticker, skip the typing.
**ISPs:** BT, Sky, Virgin Media, Comcast, AT&T — scan the sticker on the ISP-provided hub and connect in seconds instead of squinting at 6pt type.

**Privacy Salt:** Low to moderate. The Wi-Fi credentials themselves contain no personal data. If the email-for-extended-access option is used, the email is held by the venue under their privacy policy. Scan counts and token issuance create aggregate analytics but not individual tracking (unless the customer opts in with an email).

## Authority Chain

**Pattern:** Commercial (typical) / Sovereign (healthcare, education)

Most venues are commercial entities. The trust comes from brand recognition — you recognise `wifi.marriott.com` or `net.wework.com` the same way you recognise the physical venue you're standing in.

```
✓ wifi.theroastery.co.uk/verify — The Roastery guest Wi-Fi credentials
```

For healthcare and education, the chain reaches government:

```
✓ wifi.addenbrookes.nhs.uk/verify — Addenbrooke's Hospital visitor Wi-Fi
  ✓ gov.uk/verifiers — UK government root namespace
```

For hotel chains, the brand domain is the trust anchor across all properties:

```
✓ wifi.marriott.com/verify — Marriott guest Wi-Fi credentials
```

For router manufacturers and ISPs, the brand domain is the quick-connect trust anchor:

```
✓ devices.tp-link.com/verify — TP-Link device credentials
```

```
✓ devices.bt.com/verify — BT Home Hub credentials
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Jurisdictional Witnessing (Optional)

Not typically required for Wi-Fi credential postings. The credentials are ephemeral (they rotate), non-personal (the SSID and password are the same for all guests), and the security value is in the real-time verification, not in a historical audit trail.

However, for **corporate visitor networks** subject to compliance requirements (financial services, healthcare), the witnessing firm could attest that credential rotation occurred on schedule and that the walled garden was enforced — providing evidence for regulatory audits of network security practices.

## Implementation Reality

This use case describes a future direction. None of it works today.

**What you can do now:** pin a sheet of paper on the wall with an SSID, password, and `verify:` line. A customer with mobile data (4G/5G) can scan it and verify the credentials against the venue's domain. That's useful — it confirms the credentials came from the venue, not an attacker. But the phone simply displays "verified" and the customer still types the password manually. No Wi-Fi device registration happens. No walled garden opens. No token is exchanged.

**What doesn't work now:**

- **No network, no verification.** A customer who is offline (no mobile data, no existing Wi-Fi) cannot reach the `verify:` endpoint at all. The phone apps would fail on the GET. This is the chicken-and-egg problem: you need a network to verify credentials for a network you don't yet have. Mobile data is the escape hatch for phones, but laptops without a cellular connection are stuck.

- **No access point supports the token exchange.** The walled garden flow — verify, receive token, present token to AP, garden opens — requires access point firmware that does not exist in any consumer or enterprise product today. Router manufacturers (TP-Link, Netgear, Ubiquiti), enterprise AP vendors (Cisco Meraki, Aruba), and captive portal providers would need to build this integration. It's a firmware and/or captive portal standards problem.

- **No OS-level scan-and-connect.** The "scan the sticker and auto-fill Wi-Fi credentials" flow for router setup requires OS support from Apple (iOS) and Google (Android) to parse a verification response and populate the Wi-Fi settings screen. Neither supports this today. Both have QR-code-to-Wi-Fi flows, but not verification-gated ones.

**Who would need to move:**

| Party | What they'd build |
|-------|-------------------|
| **Apple / Google** | OS-level support for scan-verify-connect flow; Wi-Fi credential auto-fill from verification response |
| **Router manufacturers** | Firmware support for token-gated walled gardens; `verify:` lines on factory stickers |
| **Enterprise AP vendors** | Captive portal integration with Live Verify token exchange |
| **Captive portal providers** | Integration with Live Verify endpoints as an authentication method |

The protocol is ready. The infrastructure is not. This use case is a design for where Wi-Fi authentication should go, not a description of what's available today.

## Further Derivations

1. **Conference badge Wi-Fi credentials.** The back of a conference name badge includes the event Wi-Fi credentials with a `verify:` line against the organiser's domain. Every attendee gets verified credentials in their hand. An attacker running a rogue "ConfName-WiFi" hotspot is defeated because their SSID won't match the hash published by the event organiser. The badge credentials can rotate mid-conference (day 1 vs day 2 passwords) with an EXPIRED response pointing to the current ones.

2. **IoT device onboarding.** A smart home device needs Wi-Fi credentials during setup. Instead of typing the password into a tiny screen or using WPS (which has known vulnerabilities), the device's camera reads a verified credential posting — confirming it's connecting to the owner's network, not a neighbour's identically-named SSID. The verification response includes the PSK and a device-specific access token scoped to IoT traffic.

3. **Municipal public Wi-Fi.** City-operated free Wi-Fi in parks, libraries, and public squares. The posting verifies against `wifi.cityname.gov.uk` (or `.gov` in the US), and the walled garden ensures users pass through the council's acceptable-use acknowledgement before gaining access. The sovereign chain (`gov.uk`) provides the trust anchor — distinguishing the council's legitimate free Wi-Fi from a criminal's identically-named honeypot in the same park.

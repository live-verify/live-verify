# Voice-Call Transport

How a Live Verify claim travels with a phone call — VoIP, VoLTE/VoNR, and SIP-signalled calls — so a
recipient can see "this call is from a domain that stands behind this content" before or during the
call. Sibling to [Messaging Transport](messaging-transport.md), which covers SMS/RCS/WhatsApp/iMessage.

## What this is for, and what it is not

The use cases this serves already exist: defeating [vishing / inbound impersonation calls](../public/use-cases/inbound-call-verification.md)
and the [anti-vishing real-time call defence](anti-vishing-real-time-call-verification.md). What was
missing is the *channel* underneath them on a voice call. This doc fills that.

**A boundary that must not be blurred.** SIP-carried Live Verify and STIR/SHAKEN do **different jobs**,
and the difference is the same one this project draws everywhere:

- **STIR/SHAKEN authenticates the caller's *identity*** — "this call genuinely originates from the
  number it claims." It says nothing about *what the call is about*.
- **Live Verify verifies *content*** — "the claim made on this call ('your account is compromised, move
  your money') is one the named domain published and stands behind."

They are complementary, exactly as [Channel Impersonation Fraud Controls](channel-impersonation-fraud-controls.md)
already states. SIP transport is **not** a replacement for STIR/SHAKEN, not a new caller-ID-authentication
scheme, and not a substitute for the spoken code-word binding in the anti-vishing design. It is a way to
get a verifiable *content* claim onto the call path.

## The two voice-call paths

### 1. SIP signaling headers (silent, automatic)

Modern calls — VoIP, VoLTE, VoNR — set up via **SIP (Session Initiation Protocol)**. The call's
INVITE/handshake carries structured headers *before the audio stream begins*. A Live Verify claim can
ride in that signaling layer as structured metadata: a `verify:`-style claim line plus the issuer
domain, carried in a SIP header (e.g. a `Call-Info` header or a registered `X-` header per the
deployment's profile).

**The experience:** silent and unilateral. The recipient's phone receives the claim during call setup
and the OS can render a verification status — *"Verified call: claim from chase.com"* — on the incoming-
call screen, **before the user answers and before any audio plays**. The phone has already done the
`text → normalize → SHA-256 → GET` against the issuer's domain by the time it rings.

This is the **strong path** where it is available, because it requires nothing of the user (no app
switch, no reading a separate message) and resolves the "who is this, really?" question at the exact
moment the call arrives — the [dual-channel](dual-channel-trust.md) "human judges the caller-screen
domain, machine has already walked the lookup" pattern, applied to a ringing phone.

### 2. RCS side-channel (the messaging path, for PSTN/legacy)

Where SIP-header injection is not available — a plain PSTN/landline leg, a carrier or handset that
doesn't surface the header, an interop gap — the fallback is the existing
[anti-vishing](anti-vishing-real-time-call-verification.md) design: deliver the claim out-of-band over
**RCS** as a verified business message arriving on the screen during the call, bound to the spoken call
by **one-time code words** the caller must say aloud. This path is documented in full there; it is the
robust lowest-common-denominator that works without any signaling-layer support.

## Why not an in-band audio data-burst?

A tempting third idea is to inject the claim as a short data tone *into the audio stream itself*
(DTMF-style), so the proof rides the voice path. **This is the wrong approach and should not be built.**
Modern voice codecs (AMR, Opus, and lossy cellular codecs especially) are *designed* to discard anything
that is not speech — a data-burst would be degraded or stripped, would not survive transcoding across
network legs, and would be audible and intrusive to both parties. The signaling layer (path 1) carries
data cleanly and silently, which is precisely why SIP exists; the RCS side-channel (path 2) carries it
out-of-band. There is no need to fight the codec, and fighting it does not reliably work.

## What gets verified, and the limits

- **What it carries:** a content claim bound to the issuer's domain — the same hash-and-lookup as every
  other channel. The recipient's device verifies it against the domain, not against carrier
  infrastructure.
- **It rides the call; it does not *prove* the call's audio.** A SIP-delivered claim establishes that
  the named domain published this content claim for this call. Binding it to the *actual human voice*
  the recipient then hears is the job of the spoken **one-time code words** (path 2's mechanism), which
  remains the recommendation for high-stakes calls regardless of how the claim was delivered. SIP gets
  the verifiable claim onto the screen; the code-word readback ties it to the voice.
- **Interop is the hard part.** SIP-header conventions vary across carriers, SBCs (session border
  controllers), and handsets, and headers can be stripped at network boundaries — the same ossification
  problem the messaging-transport doc faces with SMS. Per the project's fail-loudly rule, absence of the
  header means "no verified claim on this call," shown plainly — never assumed-verified.

## Relationship to the messaging-transport doc

| | Messaging Transport | Voice-Call Transport (this doc) |
|---|---|---|
| **Channel** | SMS, RCS, WhatsApp, iMessage | SIP signaling (VoIP/VoLTE/VoNR); RCS side-channel for legacy |
| **Hard problem** | line-endings mangled by transport | header interop / stripping across carriers and SBCs |
| **Delivery** | the message *is* the artifact (or links to it) | claim rides call setup, silently, before audio |
| **Pairs with** | calendar invites, notifications | inbound-call / anti-vishing use cases + spoken code words |

## Related

- [Messaging Transport](messaging-transport.md) — the sibling channel doc (SMS/RCS/etc.).
- [Anti-Vishing: Real-Time Call Verification](anti-vishing-real-time-call-verification.md) — the RCS +
  code-word design that is path 2 here, and the use case both paths serve.
- [Inbound Call Verification](../public/use-cases/inbound-call-verification.md) — the recipient-facing
  use case.
- [Channel Impersonation Fraud Controls](channel-impersonation-fraud-controls.md) — the
  Live-Verify-verifies-content vs. STIR/SHAKEN-authenticates-identity distinction this doc rests on.
- [Dual-Channel Trust](dual-channel-trust.md) — the human-judges-domain / machine-walks-lookup pattern,
  here applied to a ringing phone.

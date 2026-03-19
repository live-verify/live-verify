# Messaging Transport

How Live Verify claims behave when sent over SMS, RCS, WhatsApp, iMessage, and similar messaging systems.

## The Line-Ending Question

`normalizeText()` handles `\r\n` vs `\n` vs `\r` identically — all three normalize the same way. It also strips leading/trailing whitespace per line, collapses multiple spaces, and removes blank lines. So a claim that arrives with different line endings than it was authored with will still produce the same hash.

The harder problem is **line breaks inserted or removed by the transport**. SMS has no formal concept of `\n` — it's a flat character stream, and carriers and phones can reformat however they like. RCS is richer but implementations vary across manufacturers. WhatsApp and iMessage preserve newlines in practice, but there's no protocol-level guarantee.

If a carrier wraps a long line at a word boundary (inserting a `\n` where the author didn't have one), the hash changes. If a carrier strips a `\n` and joins two lines (replacing it with a space), the hash changes. Normalization can't fix this because it doesn't know whether a newline was intentional or injected.

## Single-Line Claims: The Safe Path

A claim with no newlines at all is immune to line-break transport problems:

```
I worked with Charlie four times - once in ThoughtWorks (2010), later in HedgeServ (2016), then in two startups he was CTO of, Tuesday Company (2019) and Cupola Software (2022). Charlie was a great colleague for all of those - a CI/CD and test automation expert.
verify:paulhammant.com/refs
```

The phone may word-wrap this for display, but `window.getSelection().toString()` or an SMS-aware client will return the original unwrapped text. Normalization produces the same hash regardless of where the screen wraps.

For SMS and RCS, single-line claims are the practical recommendation today.

## Multi-Line Claims

Structured multi-line claims (like calendar events or certificates with explicit line breaks) need more care:

```
INVITATION
Team standup
Wednesday 19 March 2026 09:30-09:45 GMT
Room: 3B
Organizer: Sarah Chen
verify:calendar.acme-corp.com/events
```

Over WhatsApp or iMessage, this likely survives intact. Over SMS, it may not. The line breaks between fields are semantically meaningful — the hash depends on them.

Options for multi-line over SMS:

1. **Delimiter character instead of newlines.** Use a visible separator (e.g. ` | ` or ` / `) and keep the claim single-line. The issuer hashes the delimited form. Readable but ugly.

2. **Client-side reconstruction.** The messaging app understands the `verify:` protocol and knows the expected structure. It reconstructs the canonical form before hashing, regardless of how the transport mangled the whitespace. This requires the "built into the messaging app" vision — it doesn't work for plain-text SMS today.

3. **Treat SMS as a notification, not the artifact.** The SMS says "You have a verified calendar invitation — tap to view" with a link to the full claim hosted on the organizer's domain. The verification happens on the web page, not in the SMS body.

## The ⏎ Character in SMS/RCS

Some phones render `⏎` (U+23CE, Return Symbol) as a visible glyph. Could it serve as an explicit "there is a line break here" marker in SMS, similar to how `⌝` marks the upper-right corner for camera mode?

The idea: the issuer hashes the multi-line text with real `\n` characters. The SMS body uses `⏎` at each line break as a visual hint. The receiving client (if Live Verify-aware) replaces `⏎` with `\n` before normalizing and hashing.

```
INVITATION⏎Team standup⏎Wednesday 19 March 2026 09:30-09:45 GMT⏎Room: 3B⏎Organizer: Sarah Chen⏎verify:calendar.acme-corp.com/events
```

Advantages:
- Single-line in the transport (no carrier line-break injection)
- Human-readable: the `⏎` symbols show where the structure is
- Deterministic reconstruction: replace `⏎` with `\n`, normalize, hash

Open questions:
- Does every SMS carrier pass `⏎` (U+23CE) through unmodified? Unicode support in SMS depends on the encoding (GSM-7 vs UCS-2). U+23CE requires UCS-2, which halves the message length limit from 160 to 70 characters.
- Should `⏎` be stripped or converted before normalization? If converted to `\n`, normalization handles the rest. If stripped, the claim becomes single-line and needs a different hash.
- Is this better than just linking to a web page? For short claims, maybe. For anything longer than a few fields, probably not.

No conclusion here. This needs real-world testing across carriers and devices before committing to a convention.

## Platform Integration Summary

| Transport | Newline safety | Recommendation |
|---|---|---|
| Email (HTML) | Safe | Multi-line claims work. Use `<br>` or block elements. |
| Email (plain text) | Safe | `\n` preserved by all major providers. |
| WhatsApp / iMessage | Mostly safe | `\n` preserved in practice. Multi-line claims work. |
| RCS | Varies | Test per carrier/device. Prefer single-line for safety. |
| SMS | Unsafe | Single-line claims only, or link to hosted claim. |
| Slack / Discord / Teams | Safe | `\n` preserved. Multi-line claims work. |

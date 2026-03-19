---
title: "Verifiable Calendar Events"
category: "Novel Document Types"
volume: "Very Large"
retention: "Event + dispute window"
slug: "verifiable-calendar-events"
verificationMode: "clip"
tags: ["calendar", "scheduling", "ical", "caldav", "meeting", "invitation", "acceptance", "rejection", "cross-org", "deposition", "custody", "appointment"]
furtherDerivations: 0
---

## What is a Verifiable Calendar Event?

Calendar events are claims that travel by email and SMS: "The meeting is at 3pm Tuesday in Room 4B." "Your surgery is scheduled for April 2nd at 7am, NPO after midnight." "Pickup: Friday 5pm, Dropoff: Sunday 6pm."

Today these claims travel as unsigned `.ics` blobs. Anyone can craft a file that says "Board Meeting, 2pm, Goldman Sachs HQ" and email it. Your calendar app adds it without question. There is no way to know whether the organizer's system actually issued that event, or whether it was modified in transit — time changed, location swapped, attendees added.

A verifiable calendar event is human-readable structured text with a `verify:` line. The organizer's domain attests the details. Attendees respond with their own verifiable acceptances, attested by their own domains. The result is a portable, cross-organizational chain of scheduling commitments — not just "Paul clicked Accept in Outlook" (invisible outside Outlook) but a record any party can independently verify.

### Invitation

<div style="max-width: 550px; margin: 24px auto; font-family: 'Courier New', monospace; background: #f9f9f9; padding: 15px; border: 1px solid #999; font-size: 0.9em; color: #000; line-height: 1.7;" verifiable-text-element="true">
INVITATION<br>
Team standup<br>
Wednesday 19 March 2026 09:30-09:45 GMT<br>
Room: 3B / Zoom: https://zoom.us/j/123456<br>
Organizer: Sarah Chen<br>
Required: Paul Hammant, Charlie Austin, Lex Luthor<br>
Optional: Gina Dallimore<br>
<span data-verify-line="cal-invite" style="color: #667;">verify:calendar.acme-corp.com/events</span>
</div>

### Acceptance

<div style="max-width: 550px; margin: 24px auto; font-family: 'Courier New', monospace; background: #f0f9f0; padding: 15px; border: 1px solid #999; font-size: 0.9em; color: #000; line-height: 1.7;" verifiable-text-element="true">
ACCEPTED<br>
Team standup, Wed 19 Mar 2026 09:30 GMT<br>
Paul Hammant<br>
<span data-verify-line="cal-accept" style="color: #667;">verify:mail.hammant.org/events</span>
</div>

### Rejection with counter-proposal

<div style="max-width: 550px; margin: 24px auto; font-family: 'Courier New', monospace; background: #fdf0f0; padding: 15px; border: 1px solid #999; font-size: 0.9em; color: #000; line-height: 1.7;" verifiable-text-element="true">
DECLINED<br>
Team standup, Wed 19 Mar 2026 09:30 GMT<br>
Charlie Austin<br>
Propose: Thursday 20 Mar 2026 09:30-09:45 GMT<br>
<span data-verify-line="cal-decline" style="color: #667;">verify:calendar.cupola-software.com/events</span>
</div>

The text is strictly structured but fully human-readable. A calendar app parses it into a calendar entry. A human reads it in a plain-text email. Both can verify it.

## Where the Verify Domain Comes From

The verification domain follows the organizer's or responder's email domain:

- **Internal events** (both parties inside `acme-corp.com`): no Live Verify needed — the company's calendar system is already the shared source of truth
- **Cross-org events**: the organizer's domain attests the invitation, each external attendee's domain attests their response
- **Individual responding to an organization** (e.g. interview candidate): the candidate's email provider hosts the verification endpoint — `mail.hammant.org/events` for a custom domain, or `calendar.gmail.com/events` for a Gmail user

The email provider (Google Workspace, Microsoft 365, or a self-hosted server) manages the hash endpoints, just as it manages the mailbox.

## Data Verified

Event type (invitation/acceptance/rejection/counter), event title, date, time, timezone, duration, location (physical and/or virtual), organizer name, attendee names, response status.

**What the hash covers:** the exact text of the event claim. If anyone changes the time, adds an attendee, or alters the location, the hash breaks.

**What the hash does NOT cover:** attendee availability, room booking confirmation, or whether the Zoom link works. Those are operational concerns outside the claim.

## Verification Response

- **`{"status":"verified"}`** — The organizer's (or responder's) system currently attests these exact event details
- **SUPERSEDED** — Event was updated (new time, location, or attendees). The verifier should request the current version
- **CANCELLED** — Event was cancelled by the organizer
- **WITHDRAWN** — Acceptance or rejection was retracted by the attendee
- **404** — Event not found (forged, expired, or wrong domain)

## Second-Party Use

Attendees benefit from verification:

**Cross-org meeting trust:** You receive a meeting invitation from a company you're interviewing with. The `verify:` line lets you confirm the invitation actually came from their calendar system, not a phishing email with a spoofed Zoom link.

**Proof of notification:** "I was never told the deposition was moved to 10am" — the verifiable chain shows the organizer's domain attested the updated time, and the attendee's domain attested receipt.

**Custody scheduling:** Both parents' domains attest the agreed schedule. Disputes about "that wasn't the arrangement" have a hash trail.

## Third-Party Use

**Employers**
An employee claims they have a medical appointment on Thursday afternoon. The appointment confirmation carries a `verify:` line from the hospital's domain. The manager doesn't need to call the hospital — the hash confirms the appointment exists and the details match. (See also: [Appointment & Summons Confirmations](view.html?doc=appointment-summons-confirmations).)

**Courts / Legal**
Deposition notices, hearing dates, filing deadlines — the court's domain attests the schedule, the party's domain attests acknowledgment. "I didn't receive notice" becomes a verifiable question rather than a he-said-she-said.

**Contractors / Service scheduling**
"Electrician visit, Thursday 2-4pm, 14 Oak Street" — the dispatching company's domain attests the appointment. Ties directly into doorstep verification: the homeowner can verify both the worker's badge and the scheduled visit.

## Verification Architecture

**The "Forwarded Event" Problem**

- **Phishing via calendar:** Fake meeting invitations with malicious Zoom/Teams links disguised as legitimate corporate meetings
- **Time tampering:** Forwarding an event with the time changed to cause a no-show or create a scheduling conflict
- **Attendee injection:** Adding attendees to a forwarded invitation who were not on the original
- **Stale events:** Forwarding a cancelled or superseded event as if it were still current

**No post-verification actions:** Calendar event endpoints deliberately do not return Accept/Decline links or any other clickable actions. Responses (acceptance, rejection, counter-proposal) travel as separate verifiable emails from the attendee's own domain. Embedding action links in the verification response would be a phishing target — an attacker who compromised an endpoint could redirect Accept clicks to a credential-harvesting page. Keeping the response channel (email) separate from the verification channel (hash lookup) avoids this.

**Why Live Verify fits:**

Calendar events are the canonical "claim that travels outside the source system." They are emailed, forwarded, screenshot, printed, and pasted into other tools. The organizer's calendar system is the source of truth, but the recipient may be in a completely different system (or no system — just reading email). Live Verify bridges that gap without requiring both parties to share a calendar platform.

**Relationship to iCal / CalDAV:**

iCal is a format. CalDAV is a sync protocol. Neither is a trust system. Live Verify does not replace them for storage or sync — your calendar app still keeps events. It adds the layer that says "the organizer's domain currently stands behind these exact details."

**Email transport — piggybacking on what's already there:**

Calendar invitation emails are already multipart MIME: a `text/plain` part (human-readable summary), a `text/html` part (rich layout with Accept/Decline buttons), and a `text/calendar` attachment (the `.ics` file). The verifiable claim text and `verify:` line go unobtrusively into the existing `text/plain` part — no new MIME parts, no new attachment types. The `text/html` part gets `verifiable-text-element` markup for browser extension auto-detection. The `.ics` attachment stays unchanged for backward compatibility.

This means:
- Calendar apps that understand iCal still process the `.ics` as before
- Email clients with Live Verify also verify the plain-text claim against the organizer's domain
- Plain-text email readers (or anyone who views source) see the `verify:` line and can verify manually
- Eventually, the verified plain text becomes the authoritative event and the `.ics` becomes redundant

No flag day required. The transition is invisible to existing calendar apps.

## Authority Chain

**Pattern:** Organizational / Email Provider

```
calendar.acme-corp.com/events — Issues calendar event invitations and acceptances for acme-corp.com staff
```

No regulatory chain. Trust rests on the organizer's domain — the same domain that hosts their email.

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Competition

| Feature | Live Verify | iCal / CalDAV | Shared Platform (Google/Outlook) |
| :--- | :--- | :--- | :--- |
| **Cross-org trust** | Domain-attested by each party | Unsigned blob | Only if both on same platform |
| **Tamper detection** | Hash breaks on any change | None | Platform-internal only |
| **Portable proof** | Works in any email/SMS client | Requires calendar app | Requires platform access |
| **Response verification** | Each party attests independently | Accept/Decline invisible outside app | Platform-internal only |
| **Phishing resistance** | Verify organizer domain before clicking links | None | Platform-level spam filtering |
{: .table .table-striped}

**Where Live Verify is strongest:** cross-organizational scheduling where the parties do not share a calendar platform, and where the event details have legal or operational significance beyond "put it in my diary."

**Where it adds little:** internal meetings within a single organization's calendar system.

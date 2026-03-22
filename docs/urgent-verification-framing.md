# Power and Directionality for Urgent or Interruptive Situations

## Why this note exists

Some of the strongest Live Verify use cases happen in situations where a person is interrupted, pressured, or put on the spot:

- a bank calls about suspected fraud
- a sheriff or court officer calls about a summons
- a utility calls about disconnection
- a hospital calls about an appointment or urgent result
- an employer calls about payroll, access, or disciplinary action
- a tax authority calls about a filing, debt, or enforcement step

These situations are easy to understand in real life and hard to describe cleanly in a design corpus, because several kinds of asymmetry overlap:

- who initiated the contact
- who holds institutional authority
- who controls time pressure
- who has independent access to the source of truth

There are also adjacent cases using email, text, or direct message rather than a live call. The pressure profile changes, and bad actors use different playbooks, but the underlying verification problem is often similar.

This note is a working simplification for use-case writing.


## Keep the actor model small 

Where possible, use only these actors:

- **Authority** — the organization with the formal or practical power to act, for example a bank
- **Agent** — the staff member, officer, or system acting on the authority's behalf
- **Recipient** — the person receiving the demand, instruction, warning, or request, for example an account holder
- **Verifier** — the recipient-side software or process that checks the claim against the authority domain, whether user-triggered or automatic

That is usually enough.

Do not add more actors unless they do real work in the flow. In many pages, "carrier", "platform", "browser extension", "call routing provider", or "outsourced contact center" are implementation details, not primary actors.

## Two different asymmetries

It helps to separate two ideas that are easy to blur together.

### 1. Institutional power asymmetry

This is the ordinary power difference between the parties.

Examples:

- bank vs account holder
- tax authority vs taxpayer
- court officer vs citizen
- employer vs worker
- landlord vs tenant

The authority can:

- freeze access
- start enforcement
- delay a payment
- require information
- escalate consequences

The recipient often cannot ignore the interaction safely, even if they are suspicious.

This asymmetry matters for framing because it explains why the recipient stays engaged.

### 2. Verification asymmetry under interruption

This is the asymmetry fraudsters exploit.

The authority or impersonator can create a live, urgent, disruptive interaction:

- a phone call
- a text message demanding action
- a pop-up in a workflow
- an in-person interruption at a counter or door (almost never a bank-account-agent, more often a utilities worker)

The recipient is asked to respond immediately, but lacks a fast, independent, trusted way to verify what is happening.

This is not exactly a pressure asymmetry and not exactly an information asymmetry. It is both, but in a specific operational form: one side can create urgent conversational pressure while the other side lacks a fast, independent way to verify what is being claimed.

Useful working phrases:

- **verification asymmetry**
- **urgent-context verification asymmetry**
- **interruptive verification asymmetry**

Of these, **verification asymmetry** is probably the cleanest default term.

It means:

> one side can demand, request, or conversationally pressure for urgent action, while the other side cannot independently
> or quickly verify the legitimacy, scope, or currentness of the demand in the same moment

That is the core anti-fraud problem.

## Directionality: whose perspective?

Directionality is perspective-dependent.

If a bank phones a customer:

- from the bank's perspective, the call is outbound, and the bank wants confidence it has reached the right person
- from the customer's perspective, the call is inbound, and the customer wants confidence that it really is the bank

Neither is wrong in ordinary language.

To avoid confusion in use cases, state the perspective explicitly near the top:

> This use case is written from the recipient's perspective. The call is inbound to them, even though it is outbound from the authority's point of view.

> Example: This use case is written from the bank account holder's perspective. The call is inbound to them, even though it is outbound from the bank's point of view.

That is usually enough. Renaming everything is less important than anchoring perspective early.

## What Live Verify does in these situations

Live Verify does not remove the authority's power.

It does something narrower and more important:

- it reduces verification asymmetry
- it gives the recipient a fast trust check inside the interruption
- it constrains what the agent can claim in the moment
- it narrows later disputes about what was said, requested, or authorized

In good urgent-use-case design, the recipient should not need to:

- hang up and start over
- search the web
- trust caller ID
- trust a logo
- trust a PDF
- trust a voice alone

The check has to happen inside the real interaction window.

Before Live Verify, the safest available practice was usually to ask for a callback number or reference, end the call, find the published number independently, compare it with what the caller gave, call back through the official route, identify yourself again, and try to get routed back to the right team. That was safer than trusting the original interruption, but it was slow, fragile, and often abandoned before completion. A scammer could still provide a fake number or fabricated reference, or simply drop the call if the target turned out not to be easy to pressure.

Live Verify changes the safety model: the goal is no longer "reverse the direction of contact to be safe," but "continue only through a verified next step." In that model, "call back on the published number" becomes a fallback rather than the primary trust pattern.

## Six core urgent or interruptive situations

These are the clearest family to iterate on first.

### 1. Bank or payment provider calls account holder about a pressing need

This includes suspected fraud, payment reversal, account lock, and unusual transfer patterns. The bank can freeze, delay, reverse, or scrutinize transactions, while the customer is under pressure to act before they can safely tell whether the caller is real. The best Live Verify shape is a short-lived real-time call-verification object with visible reason or team metadata and one-time code words spoken on the call.

### 2. Government or law-enforcement body calls citizen about a legal or administrative matter

This includes court summons, warrant, missed jury duty, tax debt, and immigration patterns. The authority can impose legal or administrative consequences, while the citizen cannot tell in the moment whether the threat is genuine. The best Live Verify shape is a short-lived live-call verification object carrying officer or desk identity and a case or reference category.

### 3. Utility or telecom provider interrupts service holder over disconnection, debt, or urgent access

This includes meter access, overdue balance, service shutoff, and engineering-visit patterns. The provider can disconnect or limit service, while the customer is asked to pay or cooperate quickly without an in-channel proof that the contact is genuine. The best Live Verify shape is a live call or text verification object, often paired with payment-demand or appointment verification.

### 4. Employer or HR/security function interrupts worker over payroll, access, or compliance

This includes payroll correction, urgent account reset, disciplinary meeting, and building-access suspension patterns. The employer controls pay, access, scheduling, and employment consequences, while the worker may be pressured into revealing credentials or acting quickly without a trustworthy internal verification path. The best Live Verify shape is a staff-initiated, scope-limited verification object, with no secrets disclosed until verification completes.

### 5. Healthcare provider contacts patient about a clinically or administratively urgent issue

This includes appointment change, referral slot, test-result follow-up, and prescription-issue patterns. The provider controls access to care and records, while the patient may disclose sensitive identity or health information to someone they cannot verify in real time. The best Live Verify shape is a verified callback or live-call object with minimal metadata and strong privacy protections.

### 6. In-person interruption by someone claiming operational authority

This includes field engineers at the door, enforcement officers on site, branch or counter staff requesting action, and delivery or recovery agents seeking payment or access. The claimed authority can create immediate pressure, embarrassment, or fear of non-compliance, while the recipient must decide in the moment whether the person really has the role and scope they claim. The best Live Verify shape is a short-lived staff or visit authorization with site-specific scope, visible badge or role confirmation, and expiry after the interaction window.

## Draft framing block for use cases

For this family of pages, a short block like this is often enough:

```text
Participants

Authority:
The organization with power to act in this situation.

Agent:
The staff member, officer, or system acting for the authority.

Recipient:
The person receiving the interruption, demand, warning, or request.

Verifier:
The recipient-side device or software checking the claim against the authority domain.

Perspective:
This use case is written from the recipient's perspective.

Institutional Power Asymmetry:
The authority can impose or threaten consequences that the recipient cannot safely ignore.

Verification Asymmetry:
The recipient is being asked to respond now, but lacks an independent real-time way to confirm legitimacy without the verification object.
```

## Working writing rule

When writing use cases in this family:

1. Name the authority and recipient early.
2. State the perspective explicitly if directionality could be ambiguous.
3. Distinguish institutional power from verification asymmetry.
4. Keep the actor list small.
5. Describe the exact moment where the recipient would otherwise have to trust without being able to verify.

That is usually enough to keep the framing clear without overloading the reader with theory.

# Post-Verification Actions

Verification doesn't end at `{"status":"verified"}` or `{"status":"revoked"}`. Endpoints can return optional follow-up actions appropriate to the context.

## Accountability-Focused Actions (Strong)

For use cases with power dynamics—where someone with authority enters private spaces or interacts with vulnerable people—the verification response can include a POST form for reporting:

```
HTTP 200 OK
Status: OK

--- Optional Follow-Up ---
Are you a homeowner? You may record details of this inspection visit.
You will NEVER be told not to do this or that it is not needed.

POST to: https://cityofchicago.org/inspect/report/992288
Fields: address, date/time, inspection type, concerns
```

**The "Never Discouraged" Principle:** The message explicitly states reporting is *always* appropriate. This prevents officials from intimidating people ("don't bother, it's routine") and empowers verifiers to document interactions without feeling like they're wasting anyone's time.

**Use cases:**
- **Building inspectors** — Homeowner records visit; creates audit trail; bribery deterrent
- **Healthcare workers** — Patient/family records interaction; abuse deterrent; also provides staffing evidence (workers benefit from logged interactions when advocating for more staff)
- **Clinical trial participants** — Emergency room can report encounter, medications given, adverse events

## Information-Focused Actions (Light)

For use cases where robust infrastructure already exists, a simple link suffices:

```
HTTP 200 OK
Status: OK
More: https://nycourts.gov/attorneys/profile/saul-goodman
```

**Use cases:**
- **Bar admission** — Link to bar association's public profile (disciplinary history, CLE status, existing complaint channels)
- **Professional licenses** — Link to licensing board registry

## Verification-as-Acknowledgment (Retention Headers)

For use cases where the **act of verifying** itself carries legal meaning — proving the recipient received and engaged with the claim — the response includes retention headers:

```
X-Verify-Retain-Until: 2031-02-28T00:00:00Z
X-Verify-Retain-Reason: service-of-process
X-Verify-Retain-Reason-Further-Details: https://courts.maricopa.gov/verify/retain/service-info
```

The recipient's GET request against the verification endpoint *is* the provable event. The issuer's server logs the lookup; the recipient's device retains the result for the specified period. Both sides have independent proof of delivery and acknowledgment.

**Use cases:** Service of process (court summons), loan disclosure acknowledgment, eviction notices, informed consent, product recall notifications, data breach notifications, employment policy acknowledgments. See [Verification Response Format](Verification-Response-Format.md) for the full pattern and header specification.

## Why This Matters

Post-verification actions transform verification from a yes/no check into an accountability and transparency tool:

- **Pattern detection:** Inspector verified at 50 addresses but only 10 reports filed? Investigation triggered
- **Citizen empowerment:** Reporting is never discouraged; every report is logged
- **Deterrent effect:** Officials know interactions can be easily documented
- **Evidence creation:** "I recorded every visit" is powerful in disputes
- **Evidence of receipt:** Verification GET = timestamped evidence that a device in the recipient's possession engaged with a notice (a strong point of evidence, analogous to signed-for delivery — not irrefutable proof of personal receipt)

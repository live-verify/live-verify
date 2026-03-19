# Trades and Home-Visit Cluster

Scope: use cases where a person at home, at a unit door, or at a site threshold has to decide whether to admit, trust, or transact with a stranger based on what is visibly presented at the moment.

This family is materially stronger than wall-certificate professionalism because the badge or posting is not decorative. It is part of a safety-critical encounter.

## Core Pattern

The repeated question is:

- is this person genuinely authorized to be here now?

Not:

- do they belong to a profession in the abstract?

That makes the important claims:

- current assignment
- current employer or contracting principal
- which company is actually standing at the door, so the resident can detect bait-and-switch or subcontractor substitution
- current address / unit / route / zone entitlement
- current time window
- current right to enter or work
- current scope of license or trade authorization for the claimed task

## Strong Existing Files

- `public/use-cases/utility-worker-verification.md`
- `public/use-cases/residential-building-staff.md`
- `public/use-cases/delivery-courier-verification.md`
- `public/use-cases/healthcare-home-visit-verification.md`
- `public/use-cases/waste-carrier-licences.md`

## Why These Are Strong

- The verifier is often alone.
- The decision is immediate.
- A phone call is awkward, slow, or unsafe.
- The visible badge or posting is all the verifier has.
- The risk is not abstract credential inflation. It is entry, theft, assault, impersonation, casing, or misassignment.

This is the opposite of a decorative certificate use case. The credential is a threshold object.

## Sub-Buckets

### 1. Doorstep Utility and Service Access

Examples:
- utility workers
- gas engineers
- meter readers
- broadband / telecom field staff

Strong because:
- the resident must decide whether to open the door
- bogus-caller fraud is already a known pattern
- the key claim is on-duty and assigned now

### 2. Residential Contractor Entry

Examples:
- building maintenance
- plumbers
- electricians
- HVAC
- appliance repair

Strong because:
- unit-specific authorization matters
- the resident needs "this worker, this unit, this time"
- fake uniforms and fake work-order claims are common enough to matter

### 3. Delivery and Route Presence

Examples:
- parcel couriers
- food delivery
- grocery delivery

Strong because:
- account-sharing, impersonation, and fake door-tag scams exist
- the verifier wants route/assignment legitimacy, not a professional status claim

### 4. Care and Home-Visit Staff

Examples:
- visiting nurses
- carers
- aides
- social-care workers

Strong because:
- patient vulnerability is high
- the household needs assignment-plus-clearance confidence now
- the worker also benefits from reduced confrontation

### 5. Waste and Disposal Rights

Examples:
- waste carriers
- rubble clearance
- garden-waste pickup

Strong because:
- the householder can be legally liable later
- the check happens once, at the doorstep or van side
- the key claim is right to carry this waste now, not abstract business legitimacy

## Weaker Adjacent Cases

These may still fit, but need tighter framing:

- cold callers
- general home-service-provider verification
- locksmiths
- pest control operators
- tour guides and itinerant service workers

They become stronger when the verification is about:

- current assignment
- current company relationship
- current authority to be at this address
- scope-of-license questions tied to the actual task: for example, not just "gas engineer" but "can legally service gas boilers in the UK"

They become weaker when they drift into:

- generic professionalism
- decorative certificates
- abstract licensure without a live visit context

## Design Rule

For this cluster, the best artifact is usually:

- a visible badge
- a van/window posting
- a service authorization slip
- a work-order-linked credential

The strongest response is usually narrow:

- `AUTHORIZED`
- `NOT_SCHEDULED`
- `WRONG_ADDRESS`
- `OFF_DUTY`
- `SUSPENDED`
- `EXPIRED_LICENSE`

The point is not to dump a full profile. The point is to answer the threshold question fast enough to affect the decision.

## Relationship to Professional Licenses

Trades should not be treated as a weaker copy of professions.

Professional-license verification often cares about:

- good standing
- disciplinary history
- specialty
- registry lookup

Trades and home visits often care more about:

- right to be here now
- assignment to this property
- employer or principal relationship
- immediate trust and personal safety

That is why many trades/home-visit cases are a stronger Live Verify fit than wall certificates for highly regulated professions.

## Next Candidates to Tighten

- `public/use-cases/home-service-provider-verification.md`
- `public/use-cases/cold-caller-credentials.md`
- `public/use-cases/locksmith-licenses.md`
- `public/use-cases/pest-control-operator-licenses.md`
- `public/use-cases/private-security-guard-licenses.md`

These should cross-link back here so the cluster remains visible as those files are tightened.

The test for each should be:

- is this really a threshold-decision case?
- or is it drifting back into generic license display?

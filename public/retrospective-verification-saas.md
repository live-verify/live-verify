# Retrospective Verification SaaS: Backfilling Live Verify for Existing Documents

Live Verify is not limited to documents issued after an organization adopts the protocol. Existing degrees, licences, certificates, receipts, letters, and records can become verifiable later if the issuer can reconstruct the exact claim text and publish the matching hash.

This creates a natural SaaS category: **retrospective verification providers** that help issuers turn legacy records into Live Verify endpoints.

## The Basic Pattern

An issuer already has a system of record:

- A university has student records and graduation data
- A regulator has licence registers and status history
- An employer has HR records and employment dates
- A retailer has receipts and order histories
- A court has orders, filings, and judgment records

The provider connects to that issuer-controlled source, generates canonical claim text, normalizes it, computes the hash, and publishes a verification endpoint:

```text
legacy record -> canonical claim text -> normalize -> SHA-256 -> /c/{hash}
```

The plaintext record can remain in the issuer's private systems. The public verification tier only needs the hash and status.

## Example: A 2024 Graduate

Someone who graduated in 2024 may still want online verification in 2026. They may be applying for jobs, visas, professional registration, rented housing, insurance, or further study. Their original certificate was valid when issued, but third parties still need a quick way to check it.

A retrospective Live Verify flow could look like this:

1. The graduate requests verification from the university.
2. The university checks its internal student record.
3. The university or its delegated provider creates a canonical claim:

```text
Sarah Chen was awarded MSc Computer Science by the University of Edinburgh on 28 June 2024.
verify:degrees.ed.ac.uk/c
```

4. The claim text is normalized and hashed.
5. The university publishes the hash endpoint under its own domain, or under a clearly delegated verification domain.
6. Sarah can put the verifiable claim on a CV, personal website, recruitment profile, immigration pack, or credential wallet.

The value is not that the SaaS company "believes" Sarah. The value is that the university's domain now stands behind the exact text.

## What These Firms Would Sell

Retrospective verification is mostly integration and operations work, not cryptographic novelty.

Potential products:

- Bulk hash generation from student records, HR databases, receipt archives, licence registers, or document management systems
- Canonical text templates for each document type
- Normalization testing and fixture generation
- Static endpoint publication at scale
- Status management: verified, revoked, expired, replaced, suspended, withdrawn
- Delegated-domain setup and metadata
- Audit logs for issuer-side publication events
- Retention and deletion policy tooling
- Helpdesk workflows for holder-requested verification
- Batch migration for historic document classes
- APIs for new issuance after the backfill is complete

The commercial model could be per million lookups, per million active hashes, per issuer, per document class, or per managed integration.

## Trust Boundary

A backfill provider cannot create authority by itself.

Weak:

```text
verify:random-verification-saas.example/c
```

Stronger:

```text
verify:degrees.ed.ac.uk/c
```

Also plausible:

```text
verify:ed-ac-uk.delegated-provider.example/c
```

But only if the response metadata and authority chain make the delegation clear enough for verifiers to understand.

The strongest adoption path is issuer-controlled domains with SaaS providers operating behind the scenes:

```text
degrees.ed.ac.uk -> managed by verification provider
```

The verifier should see the issuer's domain, not the vendor's brand, unless the vendor is itself the recognized authority for that claim type.

## Why Retrospective Backfill Matters

Most valuable documents already exist. Adoption cannot wait for every issuer to change its future issuance pipeline first.

Backfill lets issuers start with high-value legacy records:

- Recent graduates
- Currently licensed professionals
- Active safety certificates
- Current employees and alumni employment letters
- Active insurance certificates
- Historic receipts above an expense threshold
- Court orders still in force
- Regulatory permissions still active

This creates immediate value for holders and verifiers while giving issuers a practical migration path.

## Document Holder Value

The holder gets a portable issuer-backed claim without needing a full document reissue.

Examples:

- A graduate adds a verified degree claim to a CV
- A former employee requests a verified employment dates claim
- A doctor gets a verified licence status line for private hospital onboarding
- A tradesperson gets a verified competency claim for doorstep presentation
- A supplier gets a verified insurance certificate for procurement portals

The important shift is that verification becomes self-service for third parties. The holder no longer depends on phone calls, PDF uploads, postal copies, or slow manual checks.

## Issuer Value

Issuers get fewer manual verification requests and less reputational damage from forged documents.

For many organizations, the first useful deployment is not "make every future document verifiable." It is:

```text
take the 100,000 records people keep asking us to verify
and publish privacy-preserving hash endpoints for them
```

The issuer can start narrow, prove demand, and then move verification into future document issuance.

## Risks and Constraints

Retrospective verification only works when the issuer can define exactly what text it is willing to stand behind.

Common issues:

- Old document layouts may differ from current records
- Names may have changed
- Historical dates or honours may have ambiguous formatting
- Some documents may include fields the issuer no longer wants to publish
- Low-entropy claims may need an issuer-generated random line or salt
- Revoked or corrected records need clear status behavior
- Delegated providers must not become confusing fake authorities

The provider's job is to make these choices explicit, testable, and governed by issuer policy.

## Strategic Insight

Lookup-endpoint SaaS is one half of the market. Retrospective hash creation is the other half.

The first sells availability:

```text
we host fast verification endpoints by the million
```

The second sells adoption:

```text
we turn your legacy records into verifiable claims
```

Together, they let Live Verify spread through existing document ecosystems instead of waiting for new issuance cycles.

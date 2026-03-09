# Authority Chain Specification

## Four Patterns

**Sovereign** -- Government bodies or statutory authorities; chain terminates at statute/law. In jurisdictions with a unified government domain (e.g., `gov.uk`), sovereign issuers are `authorizedBy` the root namespace (`gov.uk/verifiers`). In fragmented namespaces (e.g., US `.gov`), each agency is self-authorized.

**Regulated** -- Licensed institutions (banks, hospitals, universities); chain goes issuer -> regulator -> statute (e.g., HSBC -> FCA -> Financial Services and Markets Act 2000).

**Commercial** -- Private businesses; chain goes issuer -> industry body/accreditation (optional) -> self-authorized (e.g., FedEx -> self-authorized, or a background screener -> NAPBS accreditation).

**Personal** -- Individuals making attestations; no regulatory chain, the relying party judges credibility directly (e.g., `paulhammant.com/refs`).

## The `authorizedBy` Chain

A relying party walks the chain from issuer to root by following `authorizedBy` links. Each verification response includes an `X-Verify-Authority-Attested-By` header pointing to the next authority up.

### Worked Example: HSBC -> HMRC -> Parliament

**Step 1 -- Primary verification.** The relying party verifies the document against `hr.hsbc.co.uk`. The response confirms the claim and includes:

```
X-Verify-Authority-For: employment-attestation
X-Verify-Authority-Attested-By: https://employers.hmrc.gov.uk/v/{hash}
X-Verify-Authority-Scope: paye-registered-employer
```

**Step 2 -- Secondary verification.** The relying party follows the `Attested-By` URL. HMRC confirms HSBC is a registered PAYE employer. HMRC is a statutory body -- no further `Attested-By` header.

**Step 3 -- Root.** HMRC's authority is statutory (Commissioners for Revenue and Customs Act 2005). HMRC itself is `authorizedBy: gov.uk/verifiers` — the root namespace confirms it is a genuine UK government service. The chain terminates at `gov.uk`.

What this proves:
1. Jane works at HSBC (employer attests)
2. HSBC is a real, registered employer (HMRC attests)
3. HMRC is a statutory tax authority (the law)
4. HMRC is a genuine `gov.uk` service (the root namespace attests)

### Sovereign Domain Namespaces

Some jurisdictions have a unified government domain that acts as the root of trust:

| Jurisdiction | Root namespace | Role |
|---|---|---|
| **UK** | `gov.uk/verifiers` | GDS controls all `*.gov.uk` subdomains; only government bodies qualify |
| **Australia** | `gov.au` | Similar unified namespace |
| **EU members** | varies (`gouv.fr`, `bund.de`) | Per-country government domains |

The **US** has a unified `.gov` TLD controlled by CISA (Cybersecurity and Infrastructure Security Agency). `usa.gov/verifiers` serves as the root, with `irs.gov`, `uscis.gov`, `fbi.gov` etc. all chaining up to it.

## HTTP Response Headers

| Header | Purpose | Example |
|---|---|---|
| `X-Verify-Authority-For` | Type of claim the issuer is authorized to make | `employment-attestation` |
| `X-Verify-Authority-Attested-By` | URL of the regulator's verification endpoint | `https://employers.hmrc.gov.uk/v/{hash}` |
| `X-Verify-Authority-Scope` | Specific license or registration type | `paye-registered-employer` |

All three headers are optional. Their absence means the issuer is self-authorized (see below).

## Chain Termination

| Pattern | Terminates at | Mechanism |
|---|---|---|
| Sovereign | Root namespace or statute | `authorizedBy` the government root namespace (e.g., `gov.uk/verifiers`) where one exists; otherwise self-authorized with statutory basis. |
| Regulated | Sovereign regulator | Regulator is the last link; regulator's own authority is statutory. |
| Commercial | Industry body or self | Industry body (e.g., NAPBS) is the last link, or issuer is self-authorized if no accreditation exists. |
| Personal | No chain | No `Attested-By` header. Trust rests on the individual's domain. |

## Absence of Chain

If a verification response includes no `X-Verify-Authority-Attested-By` header, the claim is **self-attested only**. This means no external body has confirmed the issuer is a legitimate authority for the claim type.

Self-attestation is not necessarily invalid. It is the correct state for:
- Top-level government bodies (they are the root)
- New issuers not yet registered with a regulator
- Foreign issuers outside the local regulatory framework
- Individuals on personal domains

It is a signal that warrants additional scrutiny from the relying party, not an automatic rejection.

## Table Format for Use Case Files

Each use case file includes an `## Authority Chain` section with a table per issuer type:

```
| Field | Value |
|---|---|
| Issuer domain | `{domain}` |
| `authorizedBy` | `{regulator-domain}` or *(self-authorized)* |
| `authorityBasis` | {statute, license type, or accreditation} |
```

The `authorityBasis` value is a single short line (under 80 characters) stating the issuer's authority. It must be factual, not marketing. For regulated issuers, include the registration number. For personal issuers, include the word "Individual".

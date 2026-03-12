# Delegation

## The Problem

A verifier fetches `tesco.com/receipts/store/verification-meta.json` and learns who the issuer is, what they claim, and who authorized them. But where does the actual hash lookup go?

By default, the hash URL is built from the same domain and path as the `verify:` URL. This works when the issuer runs their own verification infrastructure. But there are two reasons an issuer might want hash lookups to go elsewhere:

1. **Outsourced infrastructure** — the issuer doesn't want to run a hash database. A SaaS verification provider handles it.
2. **Clean domain presentation** — the issuer runs everything in-house but wants the verifier-facing domain to be clean (`tesco.com`) rather than exposing internal subdomains (`hash-store-3.internal.tesco.com` or `receipts-fuel-verify.tesco.co.uk`).

In both cases, the issuer wants to control their identity and authority chain while directing hash lookups somewhere else.

## The Mechanism

A `delegateTo` field in `verification-meta.json`:

```json
{
  "description": "Tesco PLC fuel station receipts",
  "authorizedBy": "ofgem.gov.uk/retailers",
  "delegateTo": "uk.foobar-verification.com/tesco/fuel"
}
```

When a verifier encounters `delegateTo`:

1. Fetch `verification-meta.json` from the issuer's domain as normal — this establishes identity, description, and authority chain
2. Build the hash lookup URL against the delegate instead of the issuer's path
3. The hash URL becomes `https://uk.foobar-verification.com/tesco/fuel/{hash}` rather than `https://tesco.com/receipts/fuel/{hash}`

This is not an HTTP redirect. The verifier resolves the delegation at the application layer before making the hash request. The meta stays on the issuer's domain; only the hash lookup goes to the delegate.

## Analogy: MX Records

Email works the same way. Your address is `you@tesco.com` but the mail server is `mail.google.com` or `outlook.office365.com`. The domain is yours; the infrastructure is elsewhere. Nobody sees the MX record — they see the `@tesco.com` address.

Delegation for verification is the same principle applied at the application layer rather than DNS.

## Use Case 1: SaaS Verification Provider

A small business doesn't want to run hash infrastructure:

```json
// paulhammant.com/refs/verification-meta.json
{
  "description": "Professional peer references",
  "delegateTo": "certchain.com/clients/paulhammant"
}
```

Paul controls his domain and his meta. The SaaS provider (`certchain.com`) stores and serves the hashes. Paul manages his hashes through the provider's dashboard or API.

The verifier sees "Self-verified by paulhammant.com" — the delegate is invisible.

## Use Case 2: In-House Infrastructure Hiding

A large retailer runs everything internally but has messy internal domains:

```json
// tesco.com/receipts/fuel/verification-meta.json
{
  "description": "Tesco PLC fuel station receipts",
  "authorizedBy": "ofgem.gov.uk/retailers",
  "delegateTo": "verify-internal.tesco.net/fuel-receipts"
}
```

```json
// tesco.com/receipts/pharmacy/verification-meta.json
{
  "description": "Tesco Pharmacy prescription records",
  "authorizedBy": "gphc.org.uk/premises",
  "delegateTo": "pharma-compliance.tesco-health.co.uk/rx-verify"
}
```

Different internal teams, different infrastructure, different subdomains — but the verifier always sees `tesco.com`. The internal plumbing stays internal.

## Use Case 3: Path-Specific Delegation

Different business units can delegate to different providers:

```
tesco.com/receipts/store  → delegateTo: uk.provider-a.com/tesco/store
tesco.com/receipts/fuel   → delegateTo: uk.provider-b.com/tesco/fuel
tesco.com/receipts/pharmacy → (no delegation — runs in-house)
```

Each `verification-meta.json` is independent. Some delegate, some don't. The verifier doesn't need to know or care.

## What the Verifier Sees

Nothing about the delegation. The display is:

```
✓ tesco.com — Tesco PLC fuel station receipts
  ✓ ofgem.gov.uk — Licensed fuel retailer
    ✓ gov.uk — Oversees all official verification chains in the United Kingdom
```

Not `uk.foobar-verification.com`. The delegate is infrastructure, not a trust anchor. The trust question is answered entirely by the issuer's meta and authority chain.

## What the Delegate Is

The delegate is a hash lookup service. It:

- Stores hashes and their status (OK, REVOKED, etc.)
- Responds to GET requests with status
- May store rich payloads (headshot, message, etc.)
- Has no authority chain of its own
- Has no `verification-meta.json` of its own (at the delegated path)
- Is not shown in the verification display

The delegate is to verification what an SMTP server is to email — essential infrastructure, invisible to the end user.

## Comparison with DNS CNAME Approach

The [SaaS Verification Providers](SAAS-VERIFICATION-PROVIDERS.md) doc describes a CNAME model where the issuer points a subdomain's DNS to the provider. Delegation via `verification-meta.json` is more flexible:

| | DNS CNAME | `delegateTo` |
|---|---|---|
| **DNS changes required** | Yes — CNAME record | No |
| **Issuer controls meta** | No — provider serves everything | Yes — meta stays on issuer's domain |
| **Switch providers** | DNS propagation (minutes to hours) | Update one JSON field |
| **Granularity** | Per-subdomain | Per-path |
| **Mixed deployment** | Awkward — some paths local, some remote | Natural — each path decides independently |
| **Issuer domain appearance** | Requires dedicated subdomain | Uses existing domain paths |

Both approaches are valid. CNAME is simpler when the provider handles everything including identity. Delegation is better when the issuer wants to maintain control of their meta and present a clean domain.

## Security Considerations

The delegate can lie about hash status — returning OK for a hash that was never registered, or 404 for a valid one. This is the same trust relationship as the CNAME model: you're trusting the provider's infrastructure to faithfully serve the data.

Mitigations:
- **Witnessing firms** can independently confirm hash existence (see [Witnessing Third Parties](WITNESSING-THIRD-PARTIES.md))
- **Multiple delegates** could provide redundancy and cross-checking
- **Audit logs** at the provider level create accountability
- **The issuer can revoke delegation** by removing or changing the `delegateTo` field

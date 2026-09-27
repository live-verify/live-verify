# Live Verify Protocol Specification

> **Status: draft.** This is the normative specification of the Live Verify protocol as implemented
> by the reference clients in this repository. Where this document and the reference implementations
> disagree, that is a bug in one of them and MUST be resolved — the conformance corpus
> ([`normalization-hashes/`](../normalization-hashes/)) is the arbiter for canonicalization and
> hashing.
>
> The key words MUST, MUST NOT, SHOULD, SHOULD NOT, and MAY are to be interpreted as described in
> RFC 2119. ABNF is per RFC 5234; URI terms (`host`, `segment`) are per RFC 3986.

## 1. Terminology

- **Claim** — a short, human-readable text whose authenticity is to be verified, carrying a verify
  line naming the issuer's domain.
- **Verify line** — the line of the claim naming the lookup target (`verify:example.com/path`).
- **Issuer** — the party operating the domain named on the verify line, which publishes hashes it
  stands behind.
- **Authority domain** — the domain named on the verify line. This — and never the host that happens
  to serve the bytes — is the domain displayed to the verifier.
- **Canonical text** — the claim text after the canonicalization algorithm (§4). The hash is
  computed over the canonical text only.
- **Verifier** — the person (via a client) checking a claim.

## 2. The verify line

### 2.1 Written form (ABNF)

```abnf
verify-line   = scheme ":" verify-target
scheme        = "verify" / "vfy"           ; recognised case-insensitively
verify-target = host *( "/" segment )      ; host, segment per RFC 3986
```

The verify line is the **last content line** of the claim: it MUST appear below the claim text it
covers. `verify:` and `vfy:` are equivalent; `vfy:` exists for space-constrained artifacts.

### 2.2 Recognition (tolerant parsing)

Clients recognise the verify line with tolerance for OCR noise: optional whitespace is accepted
around the colon (`verify :`, `vfy: `), recognition is case-insensitive, and clients scan the
captured text **bottom-up**, treating the lowest matching line as the verify line. The target is
the maximal non-whitespace run following the colon.

Camera-path clients MUST surface any non-whitespace content found on the verify line after the
target, or on lines below it, as an error state rather than silently discarding it — stranded
content there indicates OCR mis-ordering, and silently truncating it changes what is hashed.

### 2.3 Quoted (inert) verify lines

A verify line whose `verify:`/`vfy:` token is immediately preceded by `>` with no intervening space
(`>verify:example.com/path`) is **quoted/embedded**: it denotes a claim reproduced inside another
claim and MUST NOT be treated as a live lookup instruction. The absence of the space is load-bearing:
OCR artifact cleanup (§4 step 1) deliberately does not strip `>`, so quoted verify lines survive the
camera path as inert text.

## 3. What is hashed

The hash covers the claim's content lines **excluding the verify line itself** in camera-path
extraction, and, in clip mode, exactly the text the verifier selected (which by convention includes
the verify line; issuers publish the hash of whatever span they designate — the conformance corpus
pins the behaviour). In both modes the bytes hashed are the canonical text of §4.

## 4. Canonicalization

Given input text, a conforming implementation MUST apply the following steps **in this order**. The
result is the canonical text.

**Step 1 — OCR artifact cleanup (camera path only).** For OCR-captured text only, per line:
remove leading and trailing runs of the border-artifact characters `| ~ ` ^ * # + = / \ _ [ ] { }`;
remove a trailing registration mark U+231D; remove a trailing single lowercase ASCII letter preceded
by whitespace. Clip-mode (digitally selected) text MUST NOT receive this step. The character `>` is
deliberately NOT in the strip set (§2.3).

**Step 2 — Unicode canonical composition.** Apply Unicode Normalization Form C (NFC) to the entire
text. (Precomposed and decomposed encodings of the same glyph otherwise hash differently; different
text sources emit different forms.)

**Step 3 — Issuer character folds (`charNormalization`).** If the issuer's `verification-meta.json`
declares `charNormalization`, apply each fold. Folds are single-character → single-character
mappings only (e.g. `é→e`); implementations MUST NOT accept multi-character replacements here.

**Step 4 — Issuer OCR rules (`ocrNormalizationRules`).** If declared, apply each regex
pattern/replacement pair in order. Implementations MUST treat these as untrusted input and SHOULD
apply their own guards (rule-count limits, execution timeouts, pattern restrictions) — see
[SECURITY-CONSIDERATIONS.md §4](SECURITY-CONSIDERATIONS.md) for why this mechanism is a known risk
to the displayed-equals-hashed invariant, and
[NORMALIZATION.md](NORMALIZATION.md#the-invariant--and-the-honest-limit-on-it) for the
meaning-preservation requirement on issuers.

**Step 5 — Punctuation folds.** Apply, in order:

| Input code points | Replacement |
|---|---|
| U+201C U+201D U+201E (curly/low double quotes) | `"` U+0022 |
| U+2018 U+2019 (curly single quotes) | `'` U+0027 |
| U+00AB U+00BB (angle quotes) | `"` U+0022 |
| U+2013 U+2014 (en/em dash) | `-` U+002D |
| U+00A0 (no-break space) | space U+0020 |
| U+2026 (ellipsis) | `...` (three U+002E) |

**Step 6 — Line processing.** Split on LF (U+000A). For each line: remove leading whitespace,
remove trailing whitespace (this also removes any CR from CRLF input), collapse each internal
whitespace run to a single space. Then apply the issuer's declared line-break regime
(`lineBreaks` in `verification-meta.json`, default `faithful`):

- **`faithful`** (default): discard lines that are empty after trimming; rejoin the remaining
  lines with single LFs. Every line break in the source is load-bearing — the regime for tabular
  documents, where row structure is meaning.
- **`flow`**: one or more blank lines separate paragraphs; within a paragraph, lines are joined
  with a single space (a lone newline is rendering arrangement, not authored structure). Paragraphs
  are rejoined with single LFs — one canonical line per paragraph. The regime for prose, where a
  soft wrap at the reader's viewport width must not change the hash.

Implementations MUST reject an unrecognised `lineBreaks` value as an error; silently falling back
to either regime hashes under the wrong rules and misreports the claim. In both regimes the
canonical text has **no trailing newline**.

## 5. Hash

The hash is **SHA-256** over the **UTF-8 encoding** of the canonical text, rendered as **64
lowercase hexadecimal characters**.

## 6. Lookup URL construction

From a verify line with target `host[/path]` and hash `H`:

1. **Scheme.** `https`, unconditionally — except that if the *parsed hostname* (the target up to the
   first `/`, excluding any `:port`) is exactly `localhost` or `127.0.0.1`, `http` MAY be used for
   local development. Implementations MUST parse the hostname for this test; substring matching
   against the whole target is a known downgrade vulnerability
   ([SECURITY-CONSIDERATIONS.md §3c](SECURITY-CONSIDERATIONS.md)).
2. **URL.** `scheme://host[/path]/H[suffix]`, where `suffix` is the issuer's
   `appendToHashResourceName` from `verification-meta.json` if declared (legacy alias:
   `appendToHashFileName`), enabling static-file hosting that requires extensions (e.g. `.json`).
3. **Hosting override.** If the issuer's meta declares `hashesHostedAt`, the lookup URL is
   `hashesHostedAt/H[suffix]` instead. This is a **hosting hint, not a delegation of authority**:
   the authority domain shown to the verifier remains the domain from the verify line, never the
   serving host.

## 7. Verification response

### 7.1 Affirmation rule

A claim is **verified** if and only if the lookup returns HTTP 200 and either:

- the body parses as JSON with a `status` field equal to `verified` (case-insensitive); or
- the body's status (JSON `status` field, or the whole trimmed body for plain text) matches a key in
  the issuer's `responseTypes` (from `verification-meta.json`) whose `class` is `"affirming"`.

Everything else — HTTP 404, other HTTP errors, network failure, an unrecognised body, an empty 200
body — is **not verified**. (Endorsement lookups differ: see §9.)

A plain-text body such as `OK` therefore affirms only if the issuer declares it via
`responseTypes`. Static-file issuers SHOULD either serve the JSON form or declare their plain-text
status.

### 7.2 The no-echo principle

The response MUST NOT echo the claim's content — the verifier already holds the document, and a
public endpoint that repeats claim content becomes a data leak. Responses carry *status and
context* (a `More:` link, actionable fields per
[Verification-Response-Format.md](Verification-Response-Format.md)), never the text that was hashed.
Narrow, documented exceptions (disambiguating enrichment) are governed by
[verification-enrichment-hazards.md](verification-enrichment-hazards.md).

### 7.3 Status registry

Universal statuses (full semantics in
[Verification-Response-Format.md](Verification-Response-Format.md)):

| Status | Meaning | Class |
|---|---|---|
| `verified` | Issuer stands behind this exact text, as of its stated date | affirming |
| `expired` | Was valid; validity window has passed | denying |
| `revoked` | Issuer affirmatively withdrew the claim | denying |
| `superseded` | A newer version exists | denying |
| *(HTTP 404)* | Hash unknown to this issuer | denying |

Issuers MAY define domain-specific statuses via `responseTypes`; each carries a `class` of
`affirming` or `denying` so clients need no per-domain knowledge. `PENDING` (known to the issuer,
checks incomplete, rendered amber, never auto-promoting) is **proposed, not yet part of this
specification**.

`verified` attests authenticity **as of the claim's stated date** — it is not a claim that the
document reflects current reality ([point-in-time-vs-current.md](point-in-time-vs-current.md)).

## 8. Issuer metadata (`verification-meta.json`)

An issuer MAY publish `verification-meta.json` adjacent to its verification path
(`scheme://host[/path]/verification-meta.json`). Clients SHOULD fetch it before hashing (it can
carry canonicalization inputs, §4 steps 3–4) and MUST proceed with defaults if it is absent or
unreachable. The field registry — issuer identity, `authorizedBy` and endorsement fields,
`responseTypes`, normalization fields, hosting fields, data-handling declarations — is specified in
[verification-meta-schemas.md](verification-meta-schemas.md).

## 9. Endorsement (`authorizedBy`) walk

An issuer's meta MAY name an endorser via `authorizedBy`. The endorsement commitment is a hash over
the issuer's **entire** `verification-meta.json`, canonicalized as `JSON.stringify(JSON.parse(bytes))`
— so any change to the issuer's self-description invalidates the endorsement. The client:

1. fetches the issuer's meta bytes, canonicalizes, hashes;
2. looks the meta-hash up at the endorser's verify target;
3. treats HTTP 200 with an empty body, or JSON `status:"verified"`, as **endorsement confirmed**
   (note: looser than §7.1 — an empty 200 confirms an endorsement but does not verify a claim);
4. recurses up the endorser's own `authorizedBy`, to a maximum depth of 3;
5. respects `authorizedFrom`/`authorizedTo` date bounds.

Display: the primary domain is rendered as **"Verified by …"**; chain links as **"Endorsed by …"**
(locale-appropriate wording per `endorsementLabel` in the meta schemas). A claim whose confirming
domain has no confirmed endorsement chain MUST be rendered as **self-verified (amber)** with an
explicit caution, never with the styling of an endorsed verification.

## 10. Conformance

An implementation conforms to this specification if and only if, for every text vector in the
[conformance corpus](../normalization-hashes/), it produces byte-identical canonical text and the
SHA-256 pinned in the vector's filename. The corpus is append-only; a canonicalization change that
invalidates existing vectors is a breaking protocol change and requires corpus versioning.

## 11. Security considerations

See [SECURITY-CONSIDERATIONS.md](SECURITY-CONSIDERATIONS.md) — the consolidated threat-by-threat
treatment, including: the trust model's limits (live confirmation, not cryptographic evidence — no
signature, no non-repudiation, no transferable proof), query privacy (confirmation oracle for
guessable preimages; lookup-pattern metadata), transport/DNS/BGP posture, issuer-supplied
normalization risks, the 404 signal, and spoofing.

## 12. Explicitly out of scope (proposed, unimplemented)

The following are designed in this repository's documents but are **not part of this
specification**: third-party witnessing, Merkle anchoring of issuer databases, k-anonymity
hash-prefix range lookups, OPRF lookups, the sovereign-roots anchor list and takeover detection, the
`PENDING` status, and per-claim `authorizedBy` in hash responses. Each is labelled as proposed where
described.

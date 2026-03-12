# Batch Audit Verification Tool

A forensic-grade, headless verification tool designed for regulatory audits. Entirely separate from the browser extension — different trust model, different threat model, different output.

## The Operational Model

An FCA supervisor arrives at a fund manager's office for an informal audit. They bring:

1. **A NUC or small-form-factor PC that boots from USB** — no SSD, no persistent storage. The FCA brings this. The case has a finger-removable lid (GMKtec NUCs and similar have tool-free lids) so the supervisor can pop it open and show the fund manager at the start of the audit: no internal drive, nothing to exfiltrate data to, nothing pre-loaded. The fund manager supplies a monitor (HDMI) and keyboard — or the FCA has a portable screen ready if the firm can't or won't provide one. The OS, verification tool, and trusted root certificates are all on the FCA's boot USB. The FCA controls the hardware; the fund manager can inspect it but hasn't touched it before audit day.

2. The fund manager's compliance team brings **a USB stick containing all evidence** — OFSI licence PDFs, NCA DAML consent responses, SAR receipt acknowledgments, HMRC trust registration confirmations, bank statements, KYC packages.

Before the evidence USB is plugged in, the fund manager's compliance officer signs a declaration:

> *"The evidence provided on this device contains no steganographic content, zero-width Unicode characters, homoglyph substitutions, or any other technique intended to interfere with automated verification. We understand that the presence of such content constitutes a separate regulatory breach regardless of the status of the underlying documents."*

This is critical. It transforms Unicode evasion from a technical cat-and-mouse game into a **compliance offence**. The batch tool still detects anomalies — but their meaning changes from "possible evasion" to "breach of audit declaration," which is an enforcement matter in its own right.

The FCA plugs the evidence USB into the audit laptop. The batch tool runs headlessly, processing every document:

```
$ verify-batch /mnt/evidence/ --report /tmp/audit-report.html

Processing 847 documents...

[  1/847] OFSI-licence-INT-2026-1847293.pdf
          verify:ofsi.hm-treasury.gov.uk/licences
          Chain: ofsi.hm-treasury.gov.uk → gov.uk
          Status: VERIFIED

[  2/847] DAML-consent-2026-0047832.pdf
          verify:nca.gov.uk/daml-consent
          Chain: nca.gov.uk → gov.uk
          Status: VERIFIED

[  3/847] investor-bank-statement-petrov.pdf
          verify:sberbank.ru/statements
          Chain: sberbank.ru → ??? (no authority chain found)
          Status: VERIFIED (chain incomplete)
          WARNING: Issuer domain is not in any recognised authority chain

[  4/847] trust-registration-ashworth.pdf
          verify:hmrc.gov.uk/trust-register
          Chain: hmrc.gov.uk → gov.uk
          Status: NOT FOUND (404)
          WARNING: Claim hash not recognised by issuer

[  5/847] ofsi-licence-forged-attempt.pdf
          verify:ofsi.hm-treasury.gov.uk/licences
          ALERT: Document contains 14 zero-width Unicode characters (U+200B, U+FEFF)
          Status: SUSPICIOUS — invisible characters detected

...

Report: /tmp/audit-report.html
  847 documents processed
  812 VERIFIED (full chain)
   23 VERIFIED (no/partial chain)
    9 NOT FOUND
    3 SUSPICIOUS (unicode anomalies)
```

## Post-Audit: Merkle Tree and Evidence Preservation

When verification is complete, the tool doesn't stop. It performs a second pass:

### Merkle Tree Construction

The tool walks every file on the evidence USB (not just PDFs — everything) and builds a Merkle tree:

```
                    ROOT HASH
                   /          \
              H(AB)            H(CD)
             /     \          /     \
          H(A)    H(B)    H(C)    H(D)
           |       |       |       |
    OFSI-  DAML-  bank-   trust-
    licence consent stmt   reg
    .pdf    .pdf   .pdf   .pdf
```

The root hash is a single SHA-256 that commits to the **exact contents of every file** on the drive. Change one byte in one document, and the root hash changes.

The tool writes the Merkle tree (all intermediate hashes) back onto the evidence USB alongside the verification report. The USB is no longer read-only — it now contains proof of its own contents at the moment of audit.

### The Biro Moment

The FCA supervisor captures the root SHA-256. Two options, both witnessed by the fund manager's compliance officer:

- **Biro on paper** — deliberately low-tech. Cannot be digitally altered after the fact. The compliance officer countersigns. The paper goes into the FCA's audit file.
- **Phone camera with Live Text** — the supervisor points their phone at the screen displaying the root hash. iOS Live Text or Android Lens captures the 64-character hex string directly from the display. Faster than writing, eliminates transcription errors, and the photo includes a timestamp and the visible context of the audit room.

This 64-character hex string is the cryptographic anchor for the entire evidence set. Seven years later, if there's a dispute about what was presented during the audit, anyone can recompute the Merkle root from the preserved USB and compare it to the biro note.

### Three Copies, Three Locations

The fund manager produces two duplicates of the evidence USB (SD cards work well — small, durable, cheap):

| Copy | Held By | Encryption | Purpose |
|------|---------|------------|---------|
| **Copy 1** | Fund manager (compliance safe) | None (the firm's own evidence) | Firm's record of what they presented |
| **Copy 2** | Fund manager (off-site / disaster recovery) | None | Business continuity |
| **Copy 3** | FCA | **PKI-encrypted by the fund manager** | Regulator's tamper-evident copy |

**Why the FCA's copy is encrypted by the fund manager:**

The FCA doesn't want to hold plaintext copies of every firm's compliance evidence — that's a data protection liability and a target for breach. The fund manager encrypts copy 3 with their own PKI key before handing it over. The FCA holds an opaque blob.

If a dispute arises later:
1. FCA produces their encrypted copy
2. Fund manager provides the decryption key
3. Decrypted contents are Merkle-hashed
4. Root hash is compared to the biro note from audit day
5. If they match, the evidence is exactly what was presented — no substitution possible

If the fund manager claims they've "lost" the decryption key, that's its own problem — the FCA's encrypted copy proves *something* was handed over, and the firm's inability to decrypt it is suspicious.

If the fund manager substitutes different evidence on their own copies, the Merkle root won't match the biro note. The FCA's encrypted copy (which the fund manager can't alter without the FCA's knowledge) serves as the tiebreaker.

### Destruction of the FCA Boot USB

After the Merkle tree is built and the root hash written down, the FCA's own boot USB is physically destroyed on-site — pliers, shears, or an anvil. This is witnessed by both parties.

The boot USB contains no evidence (it's a read-only OS image), but destroying it eliminates any possibility that the fund manager's data leaked onto the FCA's hardware. It also prevents the fund manager from later claiming the FCA's tool was tampered with post-audit — the tool no longer exists. The biro note and the three evidence copies are the only artefacts that survive the meeting.

Boot USBs are cheap and stamped from a master image. Each audit gets a fresh one.

### Retention: 7 Years

SAMLA 2018 and MLR 2017 require 6-year retention minimums for most AML/sanctions evidence. A 7-year retention on the Merkle-sealed evidence copies provides margin and aligns with standard financial record-keeping periods.

The Merkle tree structure means that even partial corruption of a USB over 7 years is detectable — any damaged file will cause its branch of the tree to fail verification, while the remaining documents remain provably intact.

## Why This Exists Separately

The browser extension is a consumer tool. It verifies one claim at a time, interactively, with a visual result badge. It's designed for a fund manager checking a single document at their desk.

The batch audit tool is a forensic instrument. It:

- Processes hundreds or thousands of documents unattended
- Produces a structured, machine-readable report
- Runs headless — no GUI, no browser, no extension APIs
- Applies stricter validation (zero-width character detection, chain completeness)
- Is controlled by the regulator, not the regulated firm
- Runs on hardware the regulated firm has never touched

## What Changes: Sample to Census

Previously, an FCA supervisor might sample 5 out of 200 OFSI licences during a visit. The fund manager knew this and could gamble — forge 1 or 2, knowing the odds of being caught were low.

With batch verification, the FCA runs **all 200**. The cost of one forged licence is now certain detection, not a 2.5% chance.

This shifts the compliance calculus entirely. "Will they check this one?" becomes "They will check every one."

## The Unicode Evasion Threat

A sophisticated adversary knows the tool extracts text, normalizes, hashes, and checks. Their attack: craft a PDF where the visible text looks correct but the underlying text stream contains invisible Unicode characters that alter the hash.

### Attack Vector 1: Hash Poisoning (Cause Verification to Fail)

Insert zero-width characters into a *genuine* document's text stream. The visible text is unchanged, but the hash differs from what the issuer registered. Verification fails. The fund manager claims "your tool is broken" and the audit stalls.

Characters used:
- `U+200B` Zero Width Space
- `U+200C` Zero Width Non-Joiner
- `U+200D` Zero Width Joiner
- `U+FEFF` Zero Width No-Break Space (BOM)
- `U+00AD` Soft Hyphen
- `U+2060` Word Joiner
- `U+180E` Mongolian Vowel Separator
- Various characters from Unicode category Cf (Format)

### Attack Vector 2: Domain Spoofing

Insert zero-width characters within the `verify:` domain to cause DNS resolution to a different host:

```
verify:ofsi.hm-treasury.gov[U+200B].uk/licences
```

The visible text shows `ofsi.hm-treasury.gov.uk` but the tool might resolve a different domain or fail entirely.

### Attack Vector 3: Homoglyph Substitution

Replace Latin characters with visually identical characters from other Unicode blocks:

```
verify:ofsi.hm-treasury.gov.uk/licences    (Latin 'o')
verify:оfsi.hm-treasury.gov.uk/licences    (Cyrillic 'о', U+043E)
```

These look identical in most fonts but produce different hashes and resolve to different domains.

### Defence: Declaration + Detection

Because the fund manager has signed the anti-evasion declaration, the tool's job is not to silently defend against these attacks — it's to **detect and report** them. Detection of any anomaly is itself evidence of a breach.

The batch tool:

1. **Strips all Unicode category Cf** (format characters) during normalization — same as the browser extension, ensuring verification works correctly.

2. **Flags any document where characters were stripped** — if zero-width characters were present, the tool records exactly which characters, at which positions, in which document. This is evidence of a declaration breach even if verification succeeds after stripping.

3. **Flags homoglyph substitutions in `verify:` domains** — any non-ASCII character in what appears to be an ASCII domain. A Cyrillic 'o' in `ofsi.hm-treasury.gov.uk` is prima facie evidence of intent to deceive.

4. **Preserves the raw extracted text alongside the normalized text** — the delta between raw and normalized is part of the audit record. The auditor (or a forensic specialist reviewing the report later) can see exactly what was embedded and where.

5. **Produces a separate "Declaration Integrity" section** in the report — documents clean of anomalies are listed as "consistent with declaration." Documents with anomalies are listed as "inconsistent with declaration" with byte-level evidence. This section is designed to be read by enforcement, not just the supervising team.

The fund manager cannot claim "your tool is broken" because they have already declared the evidence is clean. If the tool finds something, the fund manager lied — and that's a regulatory matter independent of whatever the OFSI licence or SAR receipt was about.

## Tool Architecture

```
┌─────────────────────────────────────────────────────┐
│  FCA Boot USB                                       │
│                                                     │
│  Minimal Linux (read-only squashfs)                 │
│  ├── verify-batch          CLI tool                 │
│  ├── pdftotext             PDF text extraction       │
│  ├── trusted-roots.json    Known authority chains    │
│  ├── ca-certificates       TLS root CAs              │
│  └── report-template.html  Audit report template    │
│                                                     │
│  Phase 1 — Verify:                                  │
│  1. Walks /mnt/evidence/**/*.pdf                    │
│  2. Extracts text (pdftotext)                       │
│  3. Finds verify: lines                             │
│  4. Checks for Unicode anomalies (flag if found)    │
│  5. Normalizes text (strip Cf, whitespace rules)    │
│  6. Computes SHA-256                                │
│  7. GETs https://{domain}/{path}/{hash}             │
│  8. Walks authority chain (verification-meta.json)  │
│  9. Writes verification report to evidence USB      │
│                                                     │
│  Phase 2 — Seal:                                    │
│  10. Walks ALL files on evidence USB (incl. report) │
│  11. Builds Merkle tree (SHA-256 at every node)     │
│  12. Writes merkle-tree.json to evidence USB        │
│  13. Displays root hash on screen for biro copy     │
└─────────────────────────────────────────────────────┘
```

### Network Requirements

The audit NUC needs internet access during the verification phase to reach issuer endpoints (`ofsi.hm-treasury.gov.uk`, `nca.gov.uk`, `hmrc.gov.uk`, etc.).

**The fund manager provides the wifi.** This is deliberate — it's their network, their evidence, their endpoints. There's no DNS spoofing concern because:

1. **Pre-declared endpoints** — before the audit, the fund manager declares the full list of `verify:` domains their evidence will reference. The FCA pre-fetches the TLS certificates for each endpoint and pins them on the boot USB. During the audit, the tool validates each connection against the pinned certificate. A MITM or DNS redirect would fail certificate validation.

2. **Transparency** — the fund manager can monitor all TCP/IP traffic from the NUC on their own network. They can see every HTTPS connection the tool makes — only GETs to the declared verification endpoints. There are no exfiltration concerns because the fund manager controls the network and can audit it in real-time. This is a feature, not a risk.

3. **The tool logs every connection** — the verification report includes the full list of endpoints contacted, TLS certificate fingerprints observed, and response codes. This log is part of the evidence USB and sealed into the Merkle tree. Both parties can review it.

### Report Format

The audit report should include:

- **Summary** — total documents, verified/failed/suspicious counts
- **Per-document detail** — file path, verify domain, chain walk result, status, any warnings
- **Anomaly section** — documents flagged for Unicode tricks, with byte-level evidence
- **Chain completeness** — which authority chains were verified to root, which were partial
- **Timestamp** — when verification was performed (matters for time-sensitive documents like OFSI licences that may have been revoked)

## Relationship to the Browser Extension

| | Browser Extension | Batch Audit Tool |
|---|---|---|
| **User** | Fund manager, solicitor, bank clerk | FCA supervisor, auditor |
| **Mode** | Interactive, one document at a time | Headless, hundreds of documents |
| **Hardware** | User's own machine | Regulator's controlled hardware |
| **Trust** | User trusts the extension | Regulator trusts the boot image |
| **Unicode handling** | Strip silently (normalise) | Strip AND flag (forensic) |
| **Output** | Visual badge on page | Structured audit report |
| **Chain walk** | Informational (shown in popup) | Required (incomplete = warning) |
| **Network** | User's network | Regulator's hotspot |

## What This Doesn't Solve

- **Complicit issuers** — if a foreign bank registers a hash for a fabricated statement, the tool will show "verified" with a green tick. The tool verifies the *issuer stands behind the claim*, not that the claim is true. The auditor must still assess whether the issuer domain is trustworthy.
- **Missing documents** — the tool verifies what's on the USB stick. If the fund manager omits a document, the tool can't know. Cross-referencing against expected document sets (e.g., "every foreign investor must have an OFSI report") is a separate workflow.
- **Non-PDF evidence** — the initial version handles PDFs. Extending to email (.eml), HTML exports, and scanned images would broaden coverage.

---
title: "ISO 26262 Functional-Safety Evidence Traceability"
category: "Product Certifications & Compliance"
volume: "Medium"
retention: "15+ years (vehicle production lifecycle + liability tail)"
slug: "iso-26262-safety-evidence-traceability"
verificationMode: "clip"
tags: ["iso-26262", "functional-safety", "asil", "automotive", "tier-1", "oem", "test-evidence", "traceability", "safety-case", "polarion", "polyspace", "canoe", "qtest", "safety-critical", "merkle-tree"]
furtherDerivations: 1
---

## What is ISO 26262 Evidence Traceability?

ISO 26262 is the functional-safety standard for road-vehicle electronics. Every safety requirement — from the hazard analysis down to a single line of code in an instrument cluster — must be traceable to the test evidence that proves it was satisfied. A Tier-1 supplier shipping a cluster, an IVI head unit, or an HVAC controller to an OEM hands over not just the part but a **safety case**: the requirements, the static-analysis runs, the bench results, the test-management records, and the narrative that links each requirement to the evidence that closes it.

Assembling that package is where the time goes. A compliance lead recently put real numbers on a release cycle: **187 engineering hours running the tests** (cluster, IVI, HVAC) against **312 hours assembling the ISO 26262 traceability documentation** around those runs. The same 60/40 doc-to-testing ratio held for four cycles, and AI codegen made it worse — more code per release means more evidence to assemble. The tooling is fragmented and none of it generates the compliance package: Polarion for requirements traceability, Polyspace for static analysis, Vector CANoe for bench runs, qTest for test management, in-house Python for aggregation. A human still stitches it together.

**Live Verify does not assemble that package, and this use case does not claim it can.** Authoring the safety case — correlating requirements to tests to results, writing the coverage narrative, closing the gaps — is an ALM/aggregation problem that belongs to Polarion, Codebeamer, qTest and their kin. What Live Verify addresses is the *next* problem: once the package exists, every artifact in it should be **independently verifiable and tamper-evident** — by the OEM at incoming inspection, by a TÜV assessor, by a litigator seven years after a field incident — without a portal login, a shared database, or a sampling shortcut.

The unit of verification is the finished evidence artifact. Each test report, Polyspace run summary, CANoe log digest, or the traceability matrix itself carries a verification line bound to the issuer's domain:

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <span verifiable-text="start" data-for="iso26262"></span>
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;">CONTITECH SAFETY ENGINEERING
═══════════════════════════════════════════════════════════════════

         ISO 26262 VERIFICATION EVIDENCE SUMMARY

Item:        Instrument Cluster ECU (IC-7)   Release:  R4.2.0
Safety Goal: SG-03 Display of tell-tales     ASIL:     B
Supplier:    ContiTech (Tier-1)              OEM:      Vehicle Mfr

REQUIREMENT COVERAGE
───────────────────────────────────────────────────────────────────
Safety Requirements (Polarion):     482 / 482 traced
Static Analysis (Polyspace):        0 red, 0 orange unresolved
Bench Test Runs (CANoe):            1,140 executed, 1,140 pass
Test Management (qTest):            run-set RS-4420, all passed

We certify this evidence summary reflects the verification campaign
for release R4.2.0 and has not been altered since issue.

</pre>
<span data-verify-line="iso26262">verify:contitech.com/fusa/v</span> <span verifiable-text="end" data-for="iso26262"></span>
</div>

## Data Verified

Item/ECU identifier, software release, safety goal and ASIL level, supplier and OEM identity, the coverage counts (requirements traced, static-analysis findings resolved, bench runs executed and passed, test-management run-set), issue date, issuing domain. The verification binds these claims to the Tier-1's domain — a scrubbed coverage count or a downgraded ASIL changes the hash.

**Artifact Types (each separately verifiable):**
- **Verification Evidence Summary:** The top-level digest shown above — the auditor's entry point.
- **Requirements Traceability Matrix (Polarion export):** Each safety requirement linked to its verifying test.
- **Static Analysis Report (Polyspace):** Findings and their resolution status for a code baseline.
- **Bench Test Report (CANoe):** Pass/fail for a named run-set against a hardware/software configuration.
- **Test Management Run Record (qTest):** The execution record tying test cases to results.
- **Software Configuration Identity:** The exact source baseline (e.g. a Git commit SHA) the evidence pertains to — see Verification Architecture.

## Data Visible After Verification

Shows the issuing Tier-1's domain (`contitech.com`, `bosch.com`, `aptiv.com`) and the standing of this evidence release. The endpoint confirms authenticity and currency — it does not echo the coverage figures back, because the verifier already holds the document.

**Status Indications:**
- **Current** — Evidence matches the supplier's release ledger for this item and software version.
- **Superseded** — A later evidence release exists (e.g. R4.2.1 after a defect fix). The newer hash is the one to rely on.
- **Withdrawn** — **ALERT:** The supplier has retracted this evidence (e.g. a post-release field finding invalidated the campaign). Do not rely on it for a safety case.
- **Not Found** — No evidence with this identity exists in the supplier's records. Possible forgery or wrong version.

## Second-Party Use

The **OEM** (second party) receives the evidence package from the Tier-1 (first party), **keeps it**, and folds it into the vehicle-level safety case.

**Incoming evidence inspection:** The OEM's functional-safety team runs a headless batch verifier over the delivered package before accepting it into the vehicle safety case. Not a sample of five artifacts out of two hundred — *all of them*. Each verifies against the Tier-1's domain as Current, or the package is rejected and returned. This replaces the manual spot-check that today scales badly across dozens of suppliers.

**Re-verification across cycles:** Where the 312-hour cost compounds is in the churn between releases — "is this the matrix you signed off, or the one before the HVAC fix?" A scan answers it: Current vs. Superseded vs. Withdrawn, against the issuer's domain, in seconds. Live Verify does not shrink the *initial* assembly cost; it removes the *re-confirmation* cost that recurs every cycle and every audit.

## Third-Party Use

The OEM (second party) hands the verified package onward:

**Assessors (TÜV, SGS, exida)**
**Safety Assessment:** An ISO 26262 assessor reviewing the safety case verifies each evidence artifact against the originating supplier's domain rather than trusting a PDF that arrived through three forwarded emails. "Verified by contitech.com — Current" anchors the assessment to the issuer, not the courier.

**Type-Approval & Regulators (KBA, UNECE WP.29)**
**Homologation Evidence:** Where functional-safety evidence feeds vehicle type-approval, the regulator can confirm the supplied artifacts are the supplier's genuine, current records — and that none have been silently superseded since submission.

**Litigators & Investigators (post-incident)**
**Liability Tail:** After a field failure, plaintiff and defence experts both need to know which exact evidence release covered the software in the vehicle, and that it hasn't been edited since. The verification record — and, where present, an independent witness timestamp — establishes what was true at release time. This is the same argument as the [2018 software-audit model](https://paulhammant.com/2018/05/30/better-practices-for-audits/): "show me the evidence for this baseline, and prove it hasn't been tampered with."

## Verification Architecture

**The "Scrubbed Evidence" Problem**

ISO 26262 evidence is high-stakes and editable:

- **Coverage smoothing:** A matrix shows 478/482 requirements traced. Four are open and the ship date is tomorrow. The export is edited to read 482/482. The hash changes; the scrub is detectable.
- **ASIL downgrade:** Re-labelling an ASIL B item as ASIL A to dodge the stricter evidence burden. The ASIL level is in the bound text.
- **Orange-finding burial:** A Polyspace report with unresolved orange checks is edited to claim clean resolution. Binding the report content catches it.
- **Version confusion:** Evidence for R4.1 attached to R4.2 binaries — the most common honest mistake, and the most dangerous. The software-identity artifact binds evidence to a specific baseline.

**Binding evidence to the code baseline (the Git/Merkle link)**

ISO 26262 evidence is only meaningful against a specific software baseline. Where the Tier-1 develops in Git, the source baseline already has a tamper-evident identity — the commit SHA is the root of Git's internal Merkle tree over every source file. The evidence summary names that commit; verifying the summary binds the campaign to an immutable source state. This is the original [2018 audit argument](https://paulhammant.com/2018/05/30/better-practices-for-audits/) — *"roll the tree back to this commit and the build reproduces the same outcome"* — applied to automotive functional safety rather than generic CI.

**Merkle root over the whole evidence package**

A delivered safety-case package is a directory of files. A headless tool can verify each artifact against its issuer's domain *and* build a single Merkle root (SHA-256) over the entire package — the same structure Git uses. One 64-character hex string commits to the exact contents of every artifact delivered. The OEM records the root at acceptance; an assessor or litigator recomputes it years later from the preserved package and compares. Change one byte in one report and the root changes. This mirrors the [financial-compliance evidence-USB model](https://paulhammant.com/2018/05/30/better-practices-for-audits/): verify all of it, then anchor the set with one root hash.

**Issuer Types (First Party)**
- Tier-1 suppliers (Bosch, Continental/ContiTech, Aptiv, ZF, Denso) issuing evidence for their delivered items
- Approved test houses and ISO 17025 labs issuing bench-test evidence
- Tool-output aggregators hosting hashes on behalf of the supplier's safety org

**Privacy Salt:** Required. Coverage counts, ASIL levels, and release identifiers are enumerable — a competitor or adversary could probe combinations to infer a supplier's defect rates or release cadence. Salt protects the supplier's quality metrics and roadmap. See [Owner-Initiated Re-Salting with Timeout](../../docs/Technical_Concepts.md) for inventory-enumeration resistance.

## Authority Chain

**Pattern:** Regulated

```
✓ contitech.com/fusa/verify — Issues functional-safety evidence for delivered items
  ✓ tuv-sud.com — Assesses ISO 26262 conformance
    ✓ unece.org/wp29 — International vehicle-regulation root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Jurisdictional Witnessing (Optional)

A safety case carries a long liability tail, which makes an independent witness layer genuinely useful here. When used, the witnessing firm:

- Receives all hashes from the supplier, and any subsequent changes — a new hash (revised evidence), a status change (Superseded/Withdrawn), or a 404 (record deleted)
- Receives structured metadata (item ID, release, ASIL, issue date)
- Does **NOT** receive plaintext (proprietary coverage data, source identifiers, customer-specific detail)
- Provides an immutable, timestamped trail — available to the OEM and regulator on demand, and as expert-witness evidence in product-liability proceedings

This provides:
- **Non-repudiation:** Supplier cannot deny issuing the evidence it shipped
- **Timestamp proof:** Evidence existed in this exact form at release time
- **Regulatory audit:** Assessors and type-approval bodies can inspect the witness ledger
- **Resilience:** Verification survives the supplier reorganising or retiring systems years later

**Public Blockchain (Non-Party)**

If a witness layer exists, it may periodically commit rollups to a public blockchain as an additional timestamping mechanism — optional, not inherent. Verification paths would then be:

1. **Supplier domain** — Direct check against the issuer
2. **Witnessing firm** — Independent confirmation with timestamp
3. **Public blockchain** — Decentralized trust anchor via rollup inclusion

## Competition vs. ALM Suites and Blockchain

| Feature | Live Verify | ALM Suite (Polarion / Codebeamer / qTest) | Evidence-Chain Blockchain | Hand-Assembled PDF Pack |
| :--- | :--- | :--- | :--- | :--- |
| **Assembles the safety case** | **No — out of scope.** | **Yes — this is its job.** | Partial. | Yes (manually, 312h). |
| **Independent verify at OEM/assessor** | **Instant.** Scan/clip any artifact, no portal login. | Requires shared instance / federated access. | Requires node access. | None — trust the PDF. |
| **Tamper-evidence** | **Binds content to issuer domain.** | Inside the tool's DB; not portable. | Data-only, chain-bound. | Vulnerable. |
| **Whole-package anchor** | **Merkle root over all artifacts.** | Tool-specific export hash. | Yes, but heavyweight. | None. |
| **Cross-org, cross-tool** | **Universal** — PDFs/exports work everywhere. | Low — both sides need the same suite. | Low — whole chain on one chain. | Universal but unverifiable. |

**Why Live Verify is complementary here, not competitive:** The ALM suite does the 312 hours of authoring — and should keep doing it. Live Verify sits downstream of the package the suite produces, turning each finished artifact into a domain-bound, tamper-evident object and the whole delivery into a single Merkle-rooted set. It removes the *re-confirmation and handoff* cost that recurs every cycle and every audit, without pretending to remove the assembly cost that is the supplier's real complaint.

## Further Derivations

- **Aerospace DO-178C / DO-254 evidence:** The same evidence-package-and-Merkle-root model for airborne software and complex hardware assurance.
- **Medical IEC 62304 software lifecycle evidence:** Verifiable V&V records for medical-device software submitted to notified bodies.
- **Rail EN 50128 safety evidence:** Software safety integrity evidence for signalling and rolling-stock control.
- **Machinery IEC 61508 SIL evidence:** Functional-safety evidence for industrial control and process safety.

---
title: "Software Release Announcements & Package Provenance"
category: "Product Certifications & Compliance"
volume: "Very Large"
retention: "Release lifecycle + 5 years"
slug: "software-release-announcements"
verificationMode: "clip"
tags: ["software", "release", "provenance", "supply-chain", "open-source", "npm", "maven", "pypi", "sigstore", "slsa", "gpg", "tarball"]
furtherDerivations: 3
---

## What is a Software Release Announcement?

When a project ships a new version — curl 8.12.0, React 19.1, Spring Boot 3.5 — the release announcement is the **human-readable document** that tells the world what changed, where to get it, and how to verify it. It appears as a blog post, a GitHub release page, a mailing list message, a changelog entry, or a package registry page.

These announcements are the bridge between cryptographic provenance (GPG signatures, Sigstore attestations, SLSA provenance) and the humans who actually decide whether to upgrade. The problem: they're trivially forgeable. A compromised mirror, a spoofed blog post, a phishing email pretending to be a release notice, or a tampered package registry page can redirect thousands of developers to a malicious download — and the human reader has no way to tell.

Daniel Stenberg (curl's maintainer) put it plainly: *"If even just a few users verify that they got a curl release signed by the curl release manager and they verify that the release contents is untainted, then we are in a pretty good state."* The gap is that most humans don't verify GPG signatures. They read the announcement and click the link.

### Variant 1: Project Release Announcement

The blog post, mailing list message, or GitHub release page announcing a new version. This is what gets copy-pasted, forwarded, screenshotted, and linked from "please upgrade" Slack messages.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="release"></span>curl 8.12.0 RELEASE
════════════════════════════════════════════════════

Release Date:   2026-03-20
Git Tag:        curl-8_12_0
Commit:         a1b2c3d4e5f6 (signed: Daniel Stenberg)

Source Tarball SHA-256:
  7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069

Changes:   14 bug fixes, 3 new features, 0 known vulnerabilities
CVEs Fixed: CVE-2026-1234 (HTTP/2 header overflow)
Full Changelog: curl.se/changes.html#8_12_0

<span data-verify-line="release">verify:curl.se/releases/v</span> <span verifiable-text="end" data-for="release"></span></pre>
</div>

### Variant 2: Package Registry Provenance

The page you see on npmjs.com, central.sonatype.com, or pypi.org when you look up a package version. npm already shows a "Provenance" badge linking to the source commit — but the page itself (version, tarball hash, build source) is not verifiable as a unit. A compromised or spoofed registry page could show the right badge while pointing to a wrong tarball.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="npm"></span>@anthropic-ai/sdk 1.4.0
npmjs.com
════════════════════════════════════════════════════

Published:      2026-03-18T14:22:07Z
Tarball SHA-512:
  a9b8c7d6e5f4...  (integrity: sha512-a9b8c7...)

Source Repo:    github.com/anthropics/anthropic-sdk-node
Source Commit:  f1e2d3c4b5a6
Build:          github.com/anthropics/anthropic-sdk-node/
                actions/runs/12345678

Sigstore:       VERIFIED (Rekor log entry #44781209)
SLSA Level:     Build L3

<span data-verify-line="npm">verify:npmjs.com/provenance/v</span> <span verifiable-text="end" data-for="npm"></span></pre>
</div>

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="maven"></span>org.springframework:spring-core:6.2.1
Maven Central
════════════════════════════════════════════════════

Published:      2026-02-10
Group:          org.springframework
Artifact:       spring-core
Version:        6.2.1

JAR SHA-256:
  3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f
POM SHA-256:
  1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b

GPG Signed:     YES (key: 0xABCD1234 — Spring Release Team)
Source Tag:     github.com/spring-projects/spring-framework/
                releases/tag/v6.2.1

<span data-verify-line="maven">verify:central.sonatype.com/provenance/v</span> <span verifiable-text="end" data-for="maven"></span></pre>
</div>

## Data Verified

**Variant 1 (Release Announcement):** Project name, version, release date, git commit/tag, release manager name, tarball SHA-256, CVE fixes, changelog reference.

**Variant 2 (Package Registry):** Registry name, package coordinates (name/group/version), publication timestamp, tarball integrity hash, source repository, source commit, build workflow reference, Sigstore/GPG status, SLSA level.

**Document Types:**
- **Release Blog Post / Mailing List Announcement:** The narrative "what's new" post.
- **GitHub/GitLab Release Page:** Structured release with assets and notes.
- **Package Registry Page:** The npmjs.com / pypi.org / central.sonatype.com version page.
- **Mirror Download Page:** Third-party mirrors or CDNs serving the tarball.
- **Security Advisory / CVE Fix Announcement:** Urgent "please upgrade" notices for vulnerability fixes.

## Data Visible After Verification

Shows the issuer domain (`curl.se`, `npmjs.com`, `central.sonatype.com`, `pypi.org`) and release status.

**Status Indications:**
- **Current** — This is the latest release; no known issues.
- **Superseded** — A newer version has been released; consider upgrading.
- **Security Update Available** — **ALERT:** A vulnerability was found after this release; a patched version exists.
- **Recalled** — **CRITICAL:** This release was pulled (build compromise, critical bug, supply chain incident). Do not use.
- **Yanked** — Registry-specific term (npm `unpublish`, PyPI yank, Maven Central cannot yank — but the status could reflect the project's recommendation).
- **Spoofed** — **CRITICAL:** Hash not found at issuer domain. This announcement did not come from the project or registry.

## Second-Party Use

The **Developer / DevOps Engineer** benefits from verification.

**Copy-Paste Confidence:** When someone pastes a release announcement in Slack saying "we need to upgrade to curl 8.12.0, here's the SHA," verification confirms that announcement actually came from `curl.se` and hasn't been tampered with in transit.

**Mirror Trust:** Developers in regions with restricted internet access often use mirrors. Verifying the release announcement against the project's domain confirms the mirror is serving the genuine artifact, even if the developer can't reach the primary site.

**Incident Response:** When a CVE drops and the security team sends an urgent "upgrade now" email, verification distinguishes the real advisory from a phishing email pointing to a malicious "patched" version.

**Audit Trail:** Enterprise developers can keep verified release announcements as evidence of what they deployed and when — useful for compliance audits and incident forensics.

## Third-Party Use

**Enterprise Security / CISO Teams**
**Supply Chain Governance:** Before approving a dependency upgrade, the security team verifies that the release announcement and package provenance are genuine and attested by the expected domain. This is the human-readable complement to automated tools like `npm audit signatures` or `cosign verify`.

**CI/CD Pipeline Operators**
**Build Input Verification:** Before a pipeline pulls a new dependency, a pre-build step can verify the package registry page against the registry's domain. If the page has been tampered with (e.g., a compromised CDN), verification fails before the malicious code enters the build.

**Security Researchers / Auditors**
**Incident Investigation:** After a supply chain attack (à la event-stream, ua-parser-js, xz-utils), investigators can verify whether the release announcement that was circulated at the time matched what the registry or project actually published.

**Open Source Foundations / Package Registries**
**Trust Amplification:** Registries like npm, PyPI, and Maven Central already invest in provenance (Sigstore, GPG). A verified human-readable summary gives that provenance a form that humans actually check — complementing the machine-readable attestations that most developers never inspect.

**Downstream Distributors**
**Repackaging Confidence:** Linux distributions (Debian, Fedora, Homebrew) repackage upstream releases. Verifying the upstream announcement confirms the distributor is working from the genuine source, not a compromised mirror.

## Verification Architecture

**The Software Release Fraud Problem**

Daniel Stenberg's curl blog post enumerates the threats well. The core patterns:

- **Compromised Mirror / CDN:** The tarball or package at the download URL is not the one the project released. The announcement (SHA, version, changelog) looks right, but the actual bytes are malicious. This is the XZ Utils attack pattern.
- **Spoofed Announcement:** A fake blog post, email, or social media post claims a new release is available. Links point to a malicious download. Deepfake video of a project maintainer endorsing the release adds credibility.
- **Registry Compromise:** A package registry page is altered (via stolen credentials, compromised CI, or registry vulnerability) to point to a malicious tarball while showing legitimate-looking metadata.
- **Typosquat / Impersonation:** A package with a similar name (`cur1` instead of `curl`, `react-native-community` instead of `@react-native-community`) publishes a release announcement designed to look like the real project.
- **Stale Announcement Replay:** An old, legitimate release announcement is re-circulated to trick users into downgrading to a version with known vulnerabilities.
- **Build System Compromise:** The CI/CD system that builds the release is infiltrated. The source code in git is clean, but the published binary/tarball contains injected code. The announcement truthfully reflects the git state but not the binary.

**Issuer Types** (First Party)

**Open Source Projects:** Maintainers publish release announcements on project domains (`curl.se`, `nodejs.org`, `spring.io`). They are the canonical source for "what did we release?"

**Package Registries:** npm, PyPI, Maven Central, crates.io, NuGet publish package pages with provenance metadata. They attest "this package was published by this identity at this time."

**Distribution Vendors:** Homebrew, Debian, Red Hat, Nix publish repackaged versions. They attest "we built this from that upstream source."

**The Provenance Landscape (2026)**

The ecosystem is uneven:

| Registry | Signatures | Build Provenance | Human-Readable Provenance |
| :--- | :--- | :--- | :--- |
| **npm** | Registry signatures | Sigstore + SLSA (opt-in, CI-only) | Green badge on npmjs.com |
| **PyPI** | Sigstore attestations (PEP 740) | Trusted Publishers (OIDC) | Badge on pypi.org |
| **Maven Central** | GPG signatures (required) | None (no source/build linking) | None |
| **crates.io** | None | None | None |
| **NuGet** | Author + repo signatures | None | "Signed" indicator |
| **RubyGems** | Gem signing (low adoption) | None | None |

npm and PyPI lead with Sigstore-based provenance. Maven Central requires GPG but has no build provenance. crates.io and RubyGems have effectively nothing. Live Verify's value is uniform across all of them: a verifiable human-readable summary, regardless of whether the registry has its own provenance tooling.

**Complementary, Not Replacement**

Live Verify does not replace GPG, Sigstore, SLSA, or `npm audit signatures`. Those tools verify the cryptographic chain from source to binary. Live Verify verifies the **announcement** — the human-readable text that tells developers what to download and why. The two work together:

- Sigstore proves the binary came from the CI pipeline
- GPG proves the tarball was signed by the release manager
- Live Verify proves the blog post / registry page / Slack message telling you to download it is the one the project actually published

**Privacy Salt:** Not required. Release announcements are public information. The content has high entropy (SHA-256 hashes, version strings, timestamps, commit SHAs) and is not sensitive.

## Authority Chain

**Pattern:** Commercial (registries) / Community (open source projects)

Software projects and package registries publish release announcements and provenance metadata as the authoritative source for what was released.

```
✓ curl.se/releases/verify — Publishes curl release announcements and tarball attestations
```

```
✓ npmjs.com/provenance/verify — Publishes package provenance and release metadata
  ✓ github.com/verifiers — Source repository and CI build provenance
```

Self-authorized — the project or registry is the canonical authority for its own releases.

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Competition

| Feature | Live Verify | GPG / Sigstore | Package Registry UI | `npm audit signatures` / CLI tools |
| :--- | :--- | :--- | :--- | :--- |
| **Human-Readable** | **Yes.** Text on screen, copy-pasteable. | **No.** Binary signatures, opaque to humans. | **Partial.** Badge on website, but page itself unverified. | **No.** CLI output. |
| **Copy-Paste Safe** | **Yes.** Forwarded announcement retains verifiability. | **No.** Signature is on the artifact, not the announcement. | **No.** Screenshot or paste loses provenance context. | **N/A.** |
| **Anti-Phishing** | **Strong.** Fake "urgent upgrade" emails fail verification. | **None.** GPG doesn't cover the announcement. | **Weak.** If the registry itself is compromised, the UI lies. | **Medium.** Checks registry signatures but not the message telling you to upgrade. |
| **Works Across Registries** | **Yes.** Same mechanism for npm, Maven, PyPI, curl, anything. | **Fragmented.** GPG, Sigstore, and nothing (crates.io) are three different worlds. | **Per-registry.** Each has its own UI. | **Per-registry.** Different CLI tools. |
| **Cryptographic Proof of Binary** | **No.** Proves the announcement, not the binary. | **Yes.** This is their job. | **Indirect.** Shows the hash but doesn't prove the page wasn't altered. | **Yes.** |

**Why both matter:** Sigstore and GPG answer "is this binary authentic?" Live Verify answers "is this message telling me to download it authentic?" The XZ Utils attack worked not because GPG failed, but because a trusted human (Jia Tan) was the one signing. The next attack might not compromise the signing key — it might compromise the announcement.

## Further Derivations

- [SBOM Attestation Pages](sbom-attestation-pages.md) — what's *inside* the software (ingredient list)
- [Open Source Compliance Notices](open-source-license-notices.md) — license obligations for embedded OSS

---
title: "Open Source Compliance Notices"
category: "Business & Commerce"
volume: "Huge"
retention: "Lifetime of product"
slug: "open-source-license-notices"
tags: ["open-source", "license", "gpl", "mit", "compliance", "supply-chain", "sbom"]
furtherDerivations: 1
---

## What is a Compliance Notice?

When you buy a Smart TV, a car, or a router, it usually comes with a dense booklet (or a text file on a CD) listing all the Open Source Software (OSS) used in the device. This is a legal requirement of licenses like the **GPL** (General Public License).

A **Verified Compliance Notice** takes this static text and binds it to the manufacturer's domain. It proves that the manufacturer *knows* what code is in the box and stands behind the license offer (e.g., "Written Offer" to provide source code).

<div style="max-width: 600px; margin: 24px auto; font-family: 'Courier New', monospace; border: 1px solid #333; background: #f4f4f4; padding: 20px;">
  <div style="text-align: center; font-weight: bold; margin-bottom: 15px;"><span verifiable-text="start" data-for="oss">[</span>OPEN SOURCE SOFTWARE NOTICE</div>
<p>Product: SmartRouter X1000<br>
  Firmware: v2.4.1-stable<br>
  Manufacturer: NetGearLink Corp</p>
<p>This product contains software licensed under the GNU General Public License v2 (GPLv2). The following packages are included:</p>
<ul style="list-style-type: none; padding-left: 0;">
    <li>- Linux Kernel 5.10 (GPLv2)</li>
    <li>- BusyBox 1.35 (GPLv2)</li>
    <li>- OpenSSL 3.0 (Apache 2.0)</li>
  </ul>
<p>Written Offer: NetGearLink Corp will provide the source code for the GPL components upon request for a period of 3 years.</p>
<div data-verify-line="oss" style="border-top: 1px dashed #666; margin-top: 20px; padding-top: 10px; font-size: 0.9em; text-align: center;">
    verify:netgearlink.com/oss/v <span verifiable-text="end" data-for="oss">]</span>
  </div>
</div>

## Data Verified

Product model, firmware version, list of included packages/licenses, validity of the "Written Offer".

**Document Types:**
- **Product Box Insert:** The physical paper found in the box.
- **User Manual Appendix:** The "Legal" section of the manual.
- **E-Label:** The "About" screen in the device settings.

## Data Visible After Verification

Shows the issuer domain (the Manufacturer) and potentially links to the **Software Bill of Materials (SBOM)** or the source code download.

**Status Indications:**
- **Compliant** — This notice is current for the shipping firmware.
- **Vulnerable** — The software listed has known CVEs (security vulnerabilities).
- **Revoked** — This firmware was pulled due to bugs.

## Second-Party Use

The **Consumer / End User** benefits (somewhat).
- **Security:** "Does this router really run the secure version of OpenSSL?"
- **Freedom:** Verifying the GPL offer is genuine ensures they can actually get the source code to modify their device.

## Third-Party Use

**Import Authorities / Customs**
**IP Checks:** Customs can verify that the imported electronics have valid license declarations, preventing the import of "pirate" devices that violate GPL/copyright law.

**Enterprise IT Security**
**Supply Chain Security:** Before deploying 1,000 routers, the IT security team scans the notice. If the verification link flags "Vulnerable" (due to a new Log4j exploit found in that firmware), they block the deployment.

**Open Source Foundations (FSF / SFC)**
**Enforcement:** Organizations that enforce GPL compliance can verify that the "Written Offer" to provide source code is backed by the manufacturer's actual domain, not just a throwaway email address printed on a shady manual.

## Verification Architecture

**The "Ghost Code" Fraud Problem**
- **Non-Compliance:** Manufacturers using Linux but hiding it to avoid sharing source code.
- **Fake Notices:** Printing a generic "We use open source" statement without listing the actual components or version numbers.
- **Supply Chain Attacks:** A middleman flashing malicious firmware onto routers but keeping the original legitimate manual in the box. Verification would fail because the hash of the *installed* software wouldn't match the *printed* notice (if the verification system is linked to device attestation).

**Issuer Types** (First Party)
- **Hardware OEMs:** (Samsung, Cisco, Sony).
- **Device Manufacturers:** (IoT makers, automotive).

## Jurisdictional Witnessing

A jurisdiction may require the issuer to retain a **witnessing firm** for regulatory compliance. The witnessing firm:

- Receives all hashes from the issuer, and any subsequent changes to the payload as they happen—which may manifest as a new hash, a status change, or even a 404 (record deleted)
- Receives structured content/metadata (key identifiers and dates)
- Does **NOT** receive plaintext or sensitive personal information
- Provides an immutable, timestamped audit trail—available to the jurisdiction on demand, to document holders/third parties during disputes, or as expert witness testimony in legal proceedings

This provides:
- **Non-repudiation:** Issuer cannot deny issuing the document
- **Timestamp proof:** Document existed at a specific time
- **Regulatory audit:** Jurisdictions can inspect the witness ledger for fraud detection
- **Resilience:** Verification works even if issuer's systems go down

**Public Blockchain (Non-Party)**

Witnessing firms may periodically commit rollups to an inexpensive public blockchain, providing an ultimate immutability guarantee. The blockchain is a "non-party"—infrastructure, not a participant in the transaction. This creates multiple verification paths:

1. **Issuer domain** — Direct check against the issuer
2. **Witnessing firm** — Independent confirmation with timestamp
3. **Public blockchain** — Decentralized trust anchor via rollup inclusion


## Competition vs. Digital SBOMs (SPDX/CycloneDX)

| Feature | Live Verify | Digital SBOM (JSON/XML) |
| :--- | :--- | :--- |
| **Human Readable** | **Yes.** It's text on paper/screen. | **No.** It's a machine-readable data file. |
| **Accessibility** | **Universal.** Any camera can read it. | **Specialized.** Needs SBOM analysis tools. |
| **Physical Link** | **Strong.** Ties the physical box to the digital record. | **Weak.** Usually a file sitting on a server somewhere. |
| **Completeness** | **Summary.** Lists key licenses/packages. | **Exhaustive.** Lists every dependency of a dependency. |

**Why Live Verify wins here:**
Digital SBOMs are the gold standard for *automated* security, but they are invisible to the human inspector at a customs checkpoint or a sysadmin unboxing a device. Live Verify acts as the **human-readable cover sheet** for the complex digital SBOM.


---
title: "Crane and Hoist Inspection Certificates"
category: "Site & Equipment Safety"
volume: "Small"
retention: "1 year (annual inspection)"
slug: "crane-hoist-inspection-certificates"
verificationMode: "clip"
tags: ["crane-safety", "hoist-inspection", "construction-safety", "osha-compliance", "lifting-equipment", "heavy-machinery"]
furtherDerivations: 1
---

## What is a Crane Inspection?

A massive construction crane can lift 1,000 tons. If a cable snaps or a bolt shears off, it can destroy an entire city block and kill dozens of people.

Because the stakes are so high, every crane must be professionally inspected every year (under standards like OSHA in the US or LOLER 1998 in the UK). The Annual Inspection Certificate is the "Safety Sticker" found in the crane cab.

"Pencil Whipping" is a common industry fraud where an operator fakes an inspection to keep working during a busy season. Verified hashes allow a site foreman or an OSHA inspector to scan the certificate and prove the crane actually passed a load test yesterday.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <span verifiable-text="start" data-for="crane"></span>
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;">HEAVY LIFT INSPECTION SERVICES
Certified Accredited Crane Inspector
═══════════════════════════════════════════════════════════════════

                  ANNUAL INSPECTION CERTIFICATE

Certificate #: C-992288-26

EQUIPMENT IDENTIFICATION
───────────────────────────────────────────────────────────────────
Equipment:      Liebherr LTM 11200-9.1 (Mobile Crane)
Serial Number:  LTM-99887766
Owner:          Mega-Lift Construction, LLC

SPECIFICATIONS
───────────────────────────────────────────────────────────────────
Max Capacity:   1,200 Metric Tons
Boom Length:    100 Meters
Inspector:      D. Miller (NCCCO #9982)

INSPECTION DATE: March 15, 2026
NEXT DUE DATE:   March 15, 2027

                [NCCCO] "SAFETY FIRST - LIFTING EXCELLENCE"

</pre>
<span data-verify-line="crane">verify:heavylift-inspections.com/v</span> <span verifiable-text="end" data-for="crane"></span>
</div>

## The Problem: Fake Pass Fraud

- **Certificate Forgery:** Using a high-quality template to create a "Passing" certificate for a crane that failed its load test due to structural cracks.
- **Serial Number Swapping:** Taking a valid certificate from a new crane and taping it to an old, dangerous machine. Verification shows the "Serial Number" which won't match the physical machine.
- **Date Stretching:** Editing a 2024 certificate to read 2026 to avoid the $2,000 cost of a professional inspection.

## What Is Checked

Equipment serial number, manufacturer/model, owner name, maximum lift capacity, boom/jib configuration, load test results, inspector name/NCCCO number, date of inspection, expiration date.

**Document Types:**
- **Annual Comprehensive Certificate:** Required for site entry.
- **Monthly Frequent Inspection Log:** Ongoing safety checks.
- **Critical Lift Plan Verification:** For high-risk, multi-crane lifts.
- **Wire Rope Inspection Report:** Detailed cable integrity check.

## What the Checker Sees

Shows the issuer domain (the Inspection Firm or Crane Owner) and current safety standing.

**Status Indications:**
- **Pass/Active** — Equipment is verified safe for operation.
- **Red Tagged** — Critical safety failure detected; operation prohibited.
- **Conditional** — Minor repairs required; 30-day window allowed.
- **Expired** — Annual inspection overdue.

## Who Holds It

The Crane Owner / Operator (second party) receives the inspection certificate from the inspection firm (first party), keeps it, and may later hand it to third parties for various reasons, or never do so.

**Personal Record:** They have their own verified copy of the inspection results. Most of the time, the certificate sits in the crane cab or the office—the verification value is latent, there *if needed*.

**Peace of Mind:** They can confirm at any time that the inspection matches what the inspector's system recorded and hasn't been altered.

**Future Optionality:** If an accident occurs or a dispute arises about equipment safety, they have cryptographic proof of the inspection ready without needing to contact the inspection firm.

## Who Checks It

The crane owner (second party) may hand the verified document to various third parties:

**General Contractors / Project Managers**
**Liability Shield:** Scanning the sticker on every crane arriving at the project. "Verified by Independent Inspector" ensures the GC isn't taking on the liability of an uninspected, potentially deadly piece of heavy machinery.

**OSHA Inspectors**
**Field Enforcement:** During a surprise job-site visit, the OSHA officer can scan the certificate in the crane cab. Live Verify prevents "Pencil Whipping" where operators forge inspection dates.

**Public Safety Officials**
**Event Monitoring:** Verifying the safety of cranes used near crowds (e.g., during parades or in dense urban areas).

## Who Issues It

**Issuer Types (First Party)**

- Third-Party Inspection Firms (e.g., Crane Inspection & Certification Bureau - CICB)
- Insurance Loss Control Units
- National Commission for the Certification of Crane Operators (NCCCO)

**Privacy Salt:** Not required. Inspection certificates contain many unpredictable variables—unique serial numbers, specific equipment models, inspector certification numbers, precise inspection dates, and load test results. The combination of these variables creates sufficient entropy that reverse-engineering a hash to discover inspection details is computationally infeasible without prior knowledge of the exact values.

## Authority Chain

**Pattern:** Regulated

Accredited inspection firms issue certificates for crane safety compliance under UK lifting regulations.

```
✓ crane.example-inspection.co.uk — Inspects lifting equipment annually under LOLER
  ✓ ukas.com — Accredits UK inspection bodies
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Where Each Fits: Live Verify and QR Inspection Stickers

Many crane inspection firms already put a QR sticker on each machine, linking to their own inspection platform. That is quick and convenient. Live Verify answers a slightly different question, whether the text on the certificate or tag, including the serial number and status, is what the inspection firm issued, and the two can be printed on the same tag.

| | QR sticker linking to the inspector's platform | Live Verify on the inspection certificate or tag | Paper inspection log |
| :--- | :--- | :--- | :--- |
| **Who can check** | Anyone who scans it, if the link is open to them. | Anyone looking at the tag or holding the certificate: a site manager, an operator, a safety inspector. | Whoever finds the binder. |
| **What the checker gets** | Whatever the linked page shows, which depends on the platform. | Confirmation that the inspection firm issued this exact text, tying this serial number to this status and date, and whether it has since been withdrawn. | Handwritten entries that may be out of date or faked. |
| **What the owner shares** | The sticker on the machine. | The tag or certificate. | The log. |
| **Reach** | That inspection firm's platform. | Global in principle: any inspection firm, in any country, that publishes hashes on its own domain. | Wherever the binder is. |
| **Speed and cost** | Immediate to scan; the platform is the firm's own cost. | A few seconds per check: one web lookup, with no fee to the standard. Needs a data connection on site. | Slow to find and read. |
| **What it needs** | A readable sticker on the right machine; a sticker can be moved or worn unreadable. | The inspection firm to publish hashes, and Live Verify-aware software on the checker's device. No inspection firm does this yet. | Someone to keep it. |
| **Best suited to** | Quick access to the firm's own records. | Confirming that the serial number on the machine matches a current inspection the firm stands behind. | A local record where nothing else exists. |

**Where each fits:** a QR sticker on the machine is quick and convenient, and many inspection firms already use them. A sticker can be moved to another machine or worn unreadable on site. Live Verify ties the serial number and inspection status together in text that the inspection firm stands behind, and the two can be printed on the same tag so that either will do.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).

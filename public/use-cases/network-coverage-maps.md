---
title: "Network Coverage Guarantees"
category: "Business & Commerce"
volume: "Small"
retention: "3-5 years (contract term)"
slug: "network-coverage-maps"
verificationMode: "clip"
tags: ["network", "coverage", "maps", "telecommunications", "SLA", "5G"]
furtherDerivations: 1
---

## What is a Verified Coverage Guarantee?

Telecommunication providers often sell services based on coverage maps ("We have the best 5G in your area"). However, these maps are often generic marketing materials.

A Verified Coverage Guarantee is a specific, timestamped attestation by the carrier that a specific address or coordinate had reliable signal strength at the time of contract signing. It converts a marketing claim into a verifiable service level guarantee.

<div style="max-width: 600px; margin: 24px auto; font-family: 'Arial', sans-serif; border: 2px solid #000; background: #fff; padding: 20px;">
  <div style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 20px;">
    <h2 style="margin: 0;"><span verifiable-text="start" data-for="net"></span>VERIZONIA WIRELESS</h2>
    <div style="font-size: 0.9em; color: #555;">Coverage Certification</div>
  </div>
<div style="font-family: 'Courier New', monospace; font-size: 0.95em;">
    <p><strong>Customer:</strong> Enterprise Logistics Corp</p>
    <p><strong>Location:</strong> Site B, 4500 Warehouse Dr, Austin, TX</p>
<p><strong>Guaranteed Service Level:</strong><br>
    Band: 5G Ultra Wideband (mmWave)<br>
    Min Downlink: 450 Mbps<br>
    Signal Strength: -85 dBm or better<br>
    Date Verified: 2026-01-15</p>
<div style="border: 1px solid #999; padding: 10px; margin: 15px 0; text-align: center; background: #f9f9f9;">
      [Coverage Map Visualization Placeholder]<br>
      (Coordinates: 30.2672° N, 97.7431° W)
    </div>
<div data-verify-line="net" style="border-top: 1px dashed #999; margin-top: 20px; padding-top: 10px; text-align: center; font-size: 0.85em;">
      <span data-verify-line="net">verify:verizonia.com/sla/v</span> <span verifiable-text="end" data-for="net"></span>
    </div>
  </div>
</div>

## The Problem: Phantom Bars Fraud

- **Sales Puffery:** Sales reps promising "great coverage" via email, which the engineering team later denies.
- **Map Manipulation:** Showing a generic "covered" blob on a website that doesn't reflect the reality of local terrain/buildings.

## What Is Checked

Location coordinates, guaranteed signal metrics (dBm, throughput tier), timestamp, provider commitment.

**Document Types:**
- **Service Level Agreement (SLA) Addendum:** Attaches to the main contract.
- **Site Survey Report:** Generated after a field technician tests the site.
- **Coverage Map Snapshot:** A static, verified image of the coverage database at a point in time.

## What the Checker Sees

Shows the issuer domain (e.g., `verizon.com`, `t-mobile.com`) and the technical signal data.

**Status Indications:**
- **Valid** — The guarantee was issued by the carrier.
- **Void** — The tower configuration has changed (superseded by new survey).
- **Historical** — Valid for the past date, but not current.

## Who Holds It

The Enterprise Customer benefits from verification.

**Contract Termination:** If the carrier fails to deliver the promised speed, the customer can produce the *verified* guarantee to exit the contract without penalty. "You guaranteed -85dBm here, and I'm getting -110dBm."

**Warranty Claims:** For IoT device manufacturers, proving that a device failure wasn't due to "poor network" but rather device malfunction (or vice versa).

## Who Checks It

**Regulators (FCC/Ofcom)**
**Truth in Advertising:** Regulators can spot-check these verified guarantees against actual performance to punish carriers for lying about coverage.

**Insurance Companies**
**Business Interruption:** If a business claims loss due to internet outage, the insurer can verify if the carrier *actually* guaranteed service at that location.

## Who Issues It

**Issuer Types** (First Party)
- **Mobile Network Operators (MNOs):** AT&T, Verizon, T-Mobile, Vodafone.
- **Satellite Providers:** Starlink, Iridium (guaranteeing view of sky).
- **IoT Network Providers:** Sigfox, LoRaWAN operators.

## Authority Chain

**Pattern:** Regulated

Network coverage guarantees are issued by telecom providers and regulated by the UK communications authority.

```
✓ coverage.ee.co.uk/verify — Issues verified network coverage and SLA certifications
  ✓ ofcom.org.uk — Regulates UK communications services
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Compared With Speedtest Apps

| Feature | Live Verify | Speedtest App (Ookla/Fast) |
| :--- | :--- | :--- |
| **Time** | **Past.** Proves what was promised *at contract signing*. | **Present.** Measures what is happening *now*. |
| **Legal Weight** | **High.** It's a contract document. | **Low.** "Your phone might be broken." |
| **Granularity** | **Site Specific.** Can cover a whole warehouse campus. | **Point Specific.** Measures one device's location. |
| **Integration** | **Paper/PDF Contract.** Lives with the legal docs. | **App.** Requires active testing. |

**Where each fits:** A speed test is the right way to measure what the network is delivering now, and that measurement is what shows whether a service level is being met. It cannot show what the carrier committed to when the contract was signed. A verified coverage document records that commitment as the carrier issued it, so in a dispute the two are read together: one for the promise, the other for the performance.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).

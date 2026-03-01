---
title: "Machine Attestations / IoT Sensor Records"
category: "Novel Document Types"
volume: "Very Large (emerging)"
retention: "Varies by application"
slug: "machine-attestations"
tags: ["iot", "sensors", "telemetry", "cold-chain", "smart-meter", "vehicle", "novel", "machine-generated"]
---

## What is a Machine Attestation?

Machines generate data continuously—temperatures, locations, energy readings, operational metrics. A **Machine Attestation** is a snapshot of that data, signed by the device or its managing system, made human-readable and verifiable through OCR.

The machine doesn't lie. The question is whether the reading was tampered with between generation and verification.

<div style="font-family: 'Courier New', monospace; background: #f9f9f9; padding: 15px; border: 1px solid #999; font-size: 1em; color: #000; line-height: 1.6; max-width: 550px; margin: 24px auto;">
  <span verifiable-text="start" data-for="cold1">[</span>COLD CHAIN ATTESTATION<br>
  ColdTrack Systems<br>
  <br>
  Shipment: VAC-2026-00847<br>
  Product: Pfizer COVID-19 Vaccine (BNT162b2)<br>
  Quantity: 1,000 doses<br>
  <br>
  Route: Memphis TN → Chicago IL<br>
  Departed: 2026-01-05 08:14 CST<br>
  Arrived: 2026-01-05 19:47 CST<br>
  <br>
  Temperature Range: -72.1°C to -68.4°C<br>
  Required Range: -80°C to -60°C<br>
  Excursions: NONE<br>
  <br>
  Sensor ID: CT-44782-A<br>
  Readings: 847 (every 30 seconds)<br>
  <span data-verify-line="cold1">verify:coldtrack.com/chain</span> <span verifiable-text="end" data-for="cold1">]</span>
</div>

<div style="font-family: 'Courier New', monospace; background: #f9f9f9; padding: 15px; border: 1px solid #999; font-size: 1em; color: #000; line-height: 1.6; max-width: 550px; margin: 24px auto;">
  <span verifiable-text="start" data-for="meter1">[</span>SMART METER EXPORT CERTIFICATE<br>
  National Grid ESO<br>
  <br>
  Installation: 42 Oak Lane, Bristol BS8 1QU<br>
  MPAN: 1200023305967<br>
  Meter ID: E6S12345678901<br>
  <br>
  Period: Q4 2025 (Oct-Dec)<br>
  Solar Export: 1,247.3 kWh<br>
  Grid Import: 892.1 kWh<br>
  Net Position: +355.2 kWh (net exporter)<br>
  <br>
  Feed-in Tariff Due: £187.09<br>
  <span data-verify-line="meter1">verify:nationalgrid.com/meter</span> <span verifiable-text="end" data-for="meter1">]</span>
</div>

<div style="font-family: 'Courier New', monospace; background: #f9f9f9; padding: 15px; border: 1px solid #999; font-size: 1em; color: #000; line-height: 1.6; max-width: 550px; margin: 24px auto;">
  <span verifiable-text="start" data-for="odo1">[</span>ODOMETER ATTESTATION<br>
  MOT Testing Service (DVSA)<br>
  <br>
  Vehicle: AB12 CDE<br>
  VIN: WVWZZZ3CZWE123456<br>
  Make/Model: Volkswagen Golf<br>
  <br>
  MOT Date: 15 January 2026<br>
  Odometer Reading: 47,221 miles<br>
  Previous MOT (Jan 2025): 38,445 miles<br>
  Annual Mileage: 8,776 miles<br>
  <br>
  Discrepancy Check: CONSISTENT<br>
  <span data-verify-line="odo1">verify:mot.service.gov.uk/v</span> <span verifiable-text="end" data-for="odo1">]</span>
</div>

<div style="font-family: 'Courier New', monospace; background: #f9f9f9; padding: 15px; border: 1px solid #999; font-size: 1em; color: #000; line-height: 1.6; max-width: 550px; margin: 24px auto;">
  <span verifiable-text="start" data-for="air1">[</span>AIR QUALITY ATTESTATION<br>
  EPA AirNow<br>
  <br>
  Station: Los Angeles - North Main Street<br>
  Station ID: 060371103<br>
  <br>
  Date: January 8, 2026<br>
  PM2.5: 12.3 µg/m³ (Good)<br>
  Ozone: 0.045 ppm (Good)<br>
  AQI: 51 (Moderate)<br>
  <br>
  Reading Time: 14:00 PST<br>
  <span data-verify-line="air1">verify:airnow.gov/station</span> <span verifiable-text="end" data-for="air1">]</span>
</div>

<div style="font-family: 'Courier New', monospace; background: #f9f9f9; padding: 15px; border: 1px solid #999; font-size: 1em; color: #000; line-height: 1.6; max-width: 550px; margin: 24px auto;">
  <span verifiable-text="start" data-for="fleet1">[</span>FLEET TELEMETRY SNAPSHOT<br>
  Geotab Fleet Management<br>
  <br>
  Vehicle: Unit 2847 (Ford Transit)<br>
  VIN: 1FTBW2CM5JKA12345<br>
  <br>
  Snapshot: 2026-01-08 09:15:32 EST<br>
  Location: 40.7128°N, 74.0060°W<br>
  Speed: 0 mph (stationary)<br>
  Engine: Running (idle)<br>
  Fuel Level: 67%<br>
  <br>
  Driver: Badge #4421 (J. Martinez)<br>
  <span data-verify-line="fleet1">verify:geotab.com/snap</span> <span verifiable-text="end" data-for="fleet1">]</span>
</div>

<div style="font-family: 'Courier New', monospace; background: #f9f9f9; padding: 15px; border: 1px solid #999; font-size: 1em; color: #000; line-height: 1.6; max-width: 550px; margin: 24px auto;">
  <span verifiable-text="start" data-for="ev1">[</span>EV CHARGING SESSION<br>
  ChargePoint Network<br>
  <br>
  Station: CP-SFO-TERM1-04<br>
  Location: SFO Airport Terminal 1<br>
  <br>
  Vehicle: California 8ABC123<br>
  Session Start: 2026-01-07 11:23 PST<br>
  Session End: 2026-01-07 14:47 PST<br>
  <br>
  Energy Delivered: 62.4 kWh<br>
  Peak Rate: 150 kW<br>
  Cost: $18.72<br>
  <br>
  Carbon Offset: 28.1 kg CO2e<br>
  <span data-verify-line="ev1">verify:chargepoint.com/session</span> <span verifiable-text="end" data-for="ev1">]</span>
</div>

## Why Machine Attestations Matter

**Continuous vs. Point-in-Time**
Machines record continuously. Attestations capture specific moments or periods, making them auditable.

**Tamper Evidence**
Sensor data flows through systems. Each attestation hash includes the chain of custody from sensor to document.

**Human-Readable Summaries**
Raw telemetry is incomprehensible. Attestations summarize: "Temperature stayed within range" rather than 847 individual readings.

## Data Verified

Sensor/device ID, reading timestamp, measurement values, units, acceptable ranges, excursion flags, chain of custody identifiers.

**Document Types:**
- **Cold Chain Certificate:** Temperature-sensitive shipments (vaccines, food, biologics)
- **Energy Meter Reading:** Solar export, consumption, net metering
- **Odometer Attestation:** Vehicle mileage at inspection points
- **Environmental Reading:** Air quality, water quality, noise levels
- **Fleet Telemetry:** Vehicle location, speed, driver assignment
- **Charging Session:** EV energy delivery and carbon calculations
- **Industrial Sensor:** Manufacturing tolerances, pressure, vibration

## Data Visible After Verification

Shows the issuer domain (sensor network operator) and reading timestamp.

**Status Indications:**
- **Verified** — Attestation matches recorded sensor data
- **Excursion** — Readings went outside acceptable range (attestation still valid, but flags issue)
- **Gap** — Missing sensor data during attested period
- **Calibration Due** — Sensor requires recalibration (readings may be less accurate)

## Second-Party Use

The **Operator** (fleet owner, shipper, property owner) benefits from verification.

**Compliance Proof:** "Our cold chain never broke" is verifiable, not just claimed.

**Dispute Resolution:** When cargo arrives damaged, verified temperature logs establish liability.

**Incentive Claims:** Solar feed-in tariffs, carbon credits, and efficiency rebates require verified readings.

## Third-Party Use

**Insurers**
**Claims Processing:** Verified sensor data establishes what happened (temperature excursion, vehicle location at time of incident).

**Regulators**
**Compliance Monitoring:** FDA, EPA, OSHA can verify continuous compliance from attestations.

**Buyers**
**Product Integrity:** Verify that goods were properly handled throughout supply chain.

**Finance**
**Asset Valuation:** Verified mileage affects vehicle residual value. Verified energy production supports solar asset financing.

## Verification Architecture

**Sensor Trust Chain**

```
Physical Sensor → Gateway/Collector → Cloud Platform → Attestation Generator → Verifiable Document
```

Each step can be audited. The hash commits to the entire chain.

**Calibration Tracking**

Sensors drift. Attestations can include calibration status:
- Last calibration date
- Calibration certificate reference
- Whether reading is within calibration validity

**Aggregation Rules**

Raw data (847 temperature readings) is summarized (min/max/mean, excursion count). Attestations specify aggregation method so verifiers understand what they're confirming.

**Multi-Sensor Correlation**

Some attestations combine multiple sensors:
- GPS + accelerometer = verified delivery (arrived at location, no drops)
- Temperature + humidity + door sensor = cold chain integrity

## Novel Applications

**Predictive Maintenance Proof**
"This equipment has been serviced per manufacturer schedule" with sensor-verified operating hours.

**Carbon Accounting**
Verified energy readings feed into carbon calculations. The attestation proves the input data.

**Usage-Based Insurance**
Pay-per-mile insurance requires verified odometer readings. Telematics attestations enable fair pricing.

**Supply Chain Transparency**
Each handler adds their attestation. Final recipient sees complete verified journey.


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

**Jurisdictional Requirements (International/Cross-Border)**

Documents crossing national borders require multi-jurisdictional witnessing:

**Treaty Partners:** When documents are shared between treaty partners (e.g., US-EU, Canada-US), witnessing firms must:
- Be located in neutral jurisdictions recognizable to both parties
- Comply with both nations' discovery/transparency requirements
- Maintain audit trails accessible to both tax/regulatory authorities

**Non-Treaty Jurisdictions:** For documents involving non-OECD nations or jurisdictions with weak international cooperation frameworks:
- Use witnesses from OECD member states
- Deploy blockchain rollups to public ledgers (e.g., Ethereum) for immutable proof
- Consider additional apostille/certification requirements under the Hague Apostille Convention

**Public Blockchain (Non-Party)**

Witnessing firms may periodically commit rollups to an inexpensive public blockchain, providing an ultimate immutability guarantee. The blockchain is a "non-party"—infrastructure, not a participant in the transaction. This creates multiple verification paths:

1. **Issuer domain** — Direct check against the issuer
2. **Witnessing firm** — Independent confirmation with timestamp
3. **Public blockchain** — Decentralized trust anchor via rollup inclusion

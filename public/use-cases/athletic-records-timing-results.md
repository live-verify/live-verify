---
title: "Athletic Records and Timing Results"
category: "Sports & Athletics"
volume: "Small"
retention: "Permanent (sports history and records)"
slug: "athletic-records-timing-results"
verificationMode: "clip"
tags: ["sports", "athletics", "timing", "records", "ratification", "olympics"]
furtherDerivations: 1
---

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 5px solid #003366; background: #fff; padding: 0; position: relative;">
  <div style="background: #003366; color: #fff; padding: 20px; text-align: center;">
    <h2 style="margin: 0; letter-spacing: 2px;"><span verifiable-text="start" data-for="record"></span>WORLD ATHLETICS</h2>
    <div style="font-size: 0.9em; margin-top: 5px;">OFFICIAL RECORD RATIFICATION</div>
  </div>
<div style="padding: 40px; text-align: center;">
    <div style="font-size: 1.1em; color: #666; margin-bottom: 10px;">This is to certify that</div>
    <div style="font-size: 2em; font-weight: bold; color: #003366; margin-bottom: 20px;">USAIN BOLT</div>
    <div style="font-size: 1.1em; color: #666; margin-bottom: 10px;">achieved a new World Record in the</div>
    <div style="font-size: 1.5em; font-weight: bold; margin-bottom: 20px;">MEN'S 100 METRES</div>
<div style="background: #f0f4f8; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <div style="font-size: 3em; font-weight: bold; color: #d32f2f;">9.58s</div>
      <div style="font-size: 0.9em; color: #555; margin-top: 5px;">Wind: +0.9 m/s | Reaction: 0.146s</div>
    </div>
<div style="font-size: 0.95em; color: #333; line-height: 1.6;">
      <strong>Competition:</strong> 12th IAAF World Championships<br>
      <strong>Location:</strong> Berlin, Germany<br>
      <strong>Date:</strong> 16 August 2009
    </div>
<div style="margin-top: 40px; display: flex; justify-content: space-around;">
      <div style="width: 45%; border-top: 1px solid #000; padding-top: 5px; font-size: 0.8em;">Technical Delegate</div>
      <div style="width: 45%; border-top: 1px solid #000; padding-top: 5px; font-size: 0.8em;">Chief Timing Official</div>
    </div>
<div data-verify-line="record" style="border-top: 1px dashed #999; margin-top: 40px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
      title="Demo only: World Athletics doesn't yet offer verification&#10;endpoints, so this is illustrative">
      <span data-verify-line="record">verify:worldathletics.org/records/v</span> <span verifiable-text="end" data-for="record"></span>
    </div>
  </div>
</div>

## The Problem: Fake Fast Fraud

- **Hand-Timing Fraud:** Claiming a 10.2s 100m time (hand-timed) as if it were a 10.2s FAT (Fully Automatic Timing) time.
- **Course Cutting:** In marathons, cutting corners or using a relay runner but claiming the full distance.
- **Wind-Aided Records:** Presenting a record set with +4.0 m/s wind (illegal) as a "Wind-Legal" record.
- **Age-Class Fraud:** Adults competing in youth categories to win scholarships.

## What Is Checked

Athlete name, event discipline (e.g., 100m, Marathon), time/distance achieved (to 1/1000th precision), wind speed, reaction time, venue, date of performance, timing system used (FAT vs Chip), ratification status.

**Document Types:**
- **Record Ratification Certificate:** Final legal proof of a world/national record.
- **Timing Slip:** Printed instantly at the finish line for local meets.
- **Doping Control Receipt:** Linking the performance to a clean test (hash-binding).
- **Course Certification:** Proving a marathon route was actually the claimed distance.

## What the Checker Sees

Shows the issuer domain (`worldathletics.org`, `ncaa.org`) and the current standing.

**Status Indications:**
- **Ratified** — Performance is official and in the record books.
- **Pending** — Waiting for doping control clearance or technical review.
- **Invalidated** — Disqualified (e.g., doping violation found later).
- **Former Record** — Performance was a record but has since been broken.

## Who Holds It

The Athlete benefits from verification.

**Sponsorship Contracts:** Proving to Nike or Adidas that a claimed "Personal Best" or "World Ranking" is official, triggering performance bonuses in their contract.

**College Recruiting:** High school athletes providing verified "Verified by State Federation" times to college coaches, distinguishing them from unverified "hand-timed" claims.

**Olympic Entry:** Proving they have met the "Olympic Qualifying Standard" at a sanctioned meet.

## Who Checks It

**College Coaches / Scouts**
**Talent Identification:** Coaches scan thousands of athlete profiles. Verification allows them to instantly trust times from remote, unknown competitions without calling meet directors.

**Anti-Doping Agencies (WADA)**
**Performance Analysis:** Linking "sudden performance spikes" to verified timing data to target testing more effectively.

**Sports Media / Broadcasters**
**Fact Checking:** Instantly verifying "World Lead" claims during a live broadcast by scanning the official results sheet.

## Who Issues It

**Issuer Types** (First Party)

**Governing Bodies:** (World Athletics, FINA, FIFA).
**Timing Companies:** (Omega, Seiko, Swiss Timing).
**Race Platforms:** (Athletic.net, RunSignUp).

## Authority Chain

**Pattern:** Commercial

World Athletics and other sport governing bodies are the sole custodians of official records. Their authority to ratify results derives from universal adoption of their competition rules and timing standards.

```
✓ results.worldathletics.org/verify — Ratifies official athletic records and timing results
```

Commercial issuer — self-authorized. Trust rests on the issuer's domain reputation.

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Scope and Limitations

**Where Live Verify adds value:**
- **Legacy meets** without digital infrastructure — small schools, rural areas, developing countries
- **Paper certificates** issued by federations that don't have searchable online databases
- **Cross-border verification** where a foreign federation's results aren't accessible to domestic recruiters

**Where digital platforms already solve this:**
- **Athletic.net, RunSignUp, MileSplit** — Major platforms already provide verified results with direct API access
- **World Athletics, USATF** — Governing bodies maintain authoritative databases for elite/ratified performances
- **Chip timing companies (Omega, Swiss Timing)** — Results are digitally signed and database-accessible

**Realistic scope:** Live Verify is a bridge technology for the long tail of athletic events that haven't digitized. For elite sports and well-funded programs, digital-native verification is already dominant. This use case targets the gap — the rural high school meet timed by a volunteer with a stopwatch and a printed certificate.

## Where Each Fits: Live Verify, Online Results Databases and Photo-Finish Images

Meet results are published online by timing companies, federations and results sites such as Athletic.net, and important finishes are settled from photo-finish images. These differ by sport and country, and many small meets publish results late or not at all. They answer different questions from Live Verify and work side by side: a results database lists everyone's performances, a photo-finish image settles the order at the line, and Live Verify lets an athlete show a single result certificate that the timing company or federation stands behind.

| | Online results database | Photo-finish image | Live Verify on the result certificate |
| :--- | :--- | :--- | :--- |
| **Who can check** | Anyone who searches the site. | Officials and those with the timing software. | Anyone handed the certificate: a college recruiter, a selection panel, a meet entry system. |
| **What the checker gets** | Results as uploaded by the meet, which can contain entry errors. | The raw evidence of the finish, which takes expertise to read. | Confirmation that the timing company or federation issued this exact result, for this athlete, as at its date. |
| **What the athlete shares** | Nothing; results are public. | Nothing. | Only the certificate they chose to show. |
| **Reach** | Meets that upload to that site. | Meets with photo-finish equipment. | Global in principle: any timing company or federation that publishes hashes on its own domain. |
| **Speed and cost** | Free; uploads can take days. | Needs specialist software and training. | A few seconds per check: one web lookup, with no fee to the standard. |
| **What it needs** | The meet to upload results. | Photo-finish equipment and an operator. | The timing company or federation to publish hashes, and Live Verify-aware software on the checker's device. No timing company does this yet. |
| **Best suited to** | Browsing and comparing performances. | Settling close finishes. | An athlete proving one result to someone who was not there. |

**Where each fits:** results databases remain the place to browse and compare performances, and photo-finish images remain how close finishes are decided. Many local meets, though, are never well recorded online. Live Verify would let an athlete from such a meet carry a result certificate from the local timing company that a recruiter can check in a few seconds, with software that honours it, bridging the gap between the field and the people deciding on places.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).

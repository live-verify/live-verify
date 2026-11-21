---
title: "Drug Testing and Anti-Doping Certificates"
category: "Sports & Athletics"
volume: "Very Small"
retention: "10-20 years (WADA requirements)"
slug: "drug-testing-anti-doping"
verificationMode: "clip"
tags: ["anti-doping", "wada", "drug-test", "clean-sport", "athlete-integrity", "doping-control", "forensic-lab"]
furtherDerivations: 1
---

## What is a Doping Record?

In professional sports, athletes are constantly tested for performance-enhancing drugs.

The Doping Control Record is the proof of a clean test. It is the "Moral Passport" for an athlete.

Because a "Positive Test" can end a multimillion-dollar career, fraud is a high risk. Shady labs or athletes sometimes "Swap" samples or forge "Negative" certificates to keep competing. Verified hashes allow sports federations and sponsors to see the un-altered result directly from the WADA-accredited lab's domain.

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 2px solid #333; background: #fff; padding: 0; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <div style="background: #000; color: #fff; padding: 20px; text-align: center; display: flex; align-items: center; justify-content: center;">
    <div style="width: 40px; height: 40px; background: #fff; color: #000; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 15px;"><span verifiable-text="start" data-for="doping"></span>WADA</div>
    <div>
      <h2 style="margin: 0; text-transform: uppercase; letter-spacing: 1px;">DOPING CONTROL RECORD</h2>
      <div style="font-size: 0.8em; opacity: 0.8;">OFFICIAL SAMPLE COLLECTION SUMMARY</div>
    </div>
  </div>
<div style="padding: 25px;">
    <div style="display: flex; justify-content: space-between; margin-bottom: 20px; font-size: 0.9em; color: #555;">
      <div>
        <strong>Sample ID:</strong> 998877-A (Urine)<br>
        <strong>Event:</strong> 2026 World Championships
      </div>
      <div style="text-align: right;">
        <strong>Date:</strong> 15 MAR 2026<br>
        <strong>Time:</strong> 14:30 PM
      </div>
    </div>
<div style="font-size: 0.95em; line-height: 1.6; color: #333; border: 1px solid #ccc; padding: 15px; background: #f9f9f9;">
      <p><strong>Athlete:</strong> [REDACTED - See Athlete ID]</p>
      <p><strong>Doping Control Officer:</strong> Sarah Connor (ID #992)</p>
<div style="border-top: 1px solid #ddd; padding-top: 10px; margin-top: 10px;">
        <strong>Result:</strong> <span style="color: #2e7d32; font-weight: bold;">NEGATIVE (NO PROHIBITED SUBSTANCES DETECTED)</span><br>
        <strong>Lab:</strong> UCLA Olympic Analytical Laboratory (WADA Accredited)
      </div>
    </div>
<p style="font-size: 0.75em; color: #777; font-style: italic; margin-top: 20px; text-align: center;">
      This summary is a verified extract of the Doping Control Form (DCF). The full record is held in the ADAMS database.
    </p>
<div data-verify-line="doping" style="border-top: 1px dashed #999; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
      title="Demo only: WADA doesn't yet offer verification&#10;endpoints, so this is illustrative">
      <span data-verify-line="doping">verify:wada-ama.org/adams/v</span> <span verifiable-text="end" data-for="doping"></span>
    </div>
  </div>
</div>

## The Problem: Fake Clean Fraud

- **Certificate Forgery:** Using a high-quality template to create a "Clean Test" letter from a famous lab like UCLA or Seibersdorf.
- **Sample ID Swapping:** Taking a clean result for Sample #123 and editing the name/date to match a dirty Sample #456.
- **Chain of Custody Erasure:** Editing a "Chain of Custody Exception" report to hide that a sample was left unrefrigerated.

## What Is Checked

Athlete identifier (masked), Sample ID number, type of sample (Urine/Blood), date/time of collection, test result (Negative/Adverse Finding), testing lab accreditation, Doping Control Officer (DCO) ID, event name.

**Document Types:**
- **Doping Control Form (DCF):** The 3-copy carbon paper signed at collection.
- **Laboratory Result Certificate:** Formal proof of a "Clean" test.
- **TUE (Therapeutic Use Exemption):** Proving a medication was authorized.
- **Whereabouts Confirmation:** Proving an athlete was where they claimed to be.

## What the Checker Sees

Shows the issuer domain (`wada-ama.org`, `usada.org`) and current sample status.

**Status Indications:**
- **Negative** — No banned substances found.
- **Adverse Analytical Finding (AAF)** — Banned substance detected.
- **Pending** — Sample in transit or undergoing analysis.
- **Void** — Chain of custody broken; sample inadmissible.

## Who Holds It

The Athlete benefits from verification.

**Sponsorship Integrity:** Proving to a major sponsor (e.g., Nike or Red Bull) that a recent "Drug Test" claim is verified by a WADA-accredited lab. This is crucial for maintaining endorsement income after a scandal or a rival's accusation.

**League Eligibility:** Providing verified proof of a clean test to a new professional league or international team during a transfer.

**Public Reputation:** Athletes accused of doping can use verified, timestamped "Negative" hashes to defend their reputation in the media.

## Who Checks It

**Sports Federations (NGBs)**
**Eligibility Vetting:** Instantly verifying the "Clean History" of an athlete before they are allowed to compete in a championship event.

**Sports Media / Journalists**
**Fact Checking:** Verifying the authenticity of "Clean Certificates" posted by athletes on social media during a doping controversy.

**Event Organizers**
**Mass Participation Safety:** For major marathons (e.g., Boston/London), verifying the drug testing status of elite entries.

## Who Issues It

**Issuer Types** (First Party)

**World Anti-Doping Agency (WADA).**
**National Anti-Doping Orgs:** (USADA, UKAD, ASADA).
**Accredited Laboratories.**

**Privacy Salt:** ABSOLUTELY CRITICAL. Doping data is highly sensitive health info. The hash MUST be salted to prevent "Guess-and-Check" searches for famous athletes to see their test results.

## Authority Chain

**Pattern:** Regulated

WADA-accredited laboratories conduct drug tests according to international anti-doping protocols.

```
✓ testing.ukad.org.uk — Conducts WADA-accredited doping tests
  ✓ wada-ama.org — Sets global anti-doping standards
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Where Each Fits: Live Verify and ADAMS

ADAMS is the World Anti-Doping Agency's system in which anti-doping organisations, laboratories and athletes record whereabouts, tests and results. Access is restricted by design, because the data is sensitive. ADAMS and Live Verify answer different questions and work side by side: ADAMS is where results are managed, while Live Verify lets an outsider check a certificate the athlete chose to share.

| | ADAMS | Live Verify on the test certificate | Unverified PDF or image |
| :--- | :--- | :--- | :--- |
| **Who can check** | Anti-doping organisations, laboratories and federations with credentials, and the athlete for their own record. | Anyone the athlete hands the certificate to: a sponsor, a club abroad, an event organiser, a journalist. | Nobody; it can only be taken on trust. |
| **What the checker gets** | The full record, including whereabouts and results management. | Confirmation that the issuing body or laboratory stands behind this exact certificate and result, as at its date, and whether it has since been withdrawn. | A certificate that may have been edited or invented. |
| **What the athlete shares** | Their whereabouts and test data, with authorised bodies. | Only the certificate they chose to hand over. | Only the document they chose to share. |
| **Reach** | The anti-doping system worldwide, for authorised users. | Global in principle: any anti-doping body or laboratory, in any country, that publishes hashes on its own domain. | Anywhere, but untrusted. |
| **Speed and cost** | Quick for credentialed users; closed to everyone else. | A few seconds per check: one web lookup, with no fee to the standard. | Free and immediate. |
| **What it needs** | Credentials from the anti-doping system. | The issuer to publish hashes, and Live Verify-aware software on the checker's device. No anti-doping body or laboratory does this yet. | Nothing. |
| **Best suited to** | Testing, results management and sanctions. | Letting outsiders check a result the athlete has chosen to share. | Nothing where a reputation depends on it. |

**Where each fits:** ADAMS is the authoritative system for anti-doping organisations, and its restricted access is deliberate: whereabouts and test data are sensitive and results management belongs there. An athlete who wants to show a result or certificate to a sponsor, a club in another country or a journalist cannot give them an ADAMS login. Live Verify lets those outsiders confirm that the issuing body stands behind the document the athlete chose to share, leaving the database closed and the official process untouched.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).

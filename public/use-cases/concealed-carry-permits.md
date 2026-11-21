---
title: "Concealed Carry Permits (CCW)"
category: "Professional & Occupational Licenses"
volume: "Medium"
retention: "Permit validity (1-5 years)"
slug: "concealed-carry-permits"
verificationMode: "camera"
tags: ["ccw", "firearms-permit", "public-safety", "second-amendment", "law-enforcement", "concealed-carry", "identity-verification"]
furtherDerivations: 1
---

## What is a CCW Permit?

A Concealed Carry Weapon (CCW) permit is a license issued by a local Sheriff or State Police allowing a citizen to carry a hidden firearm in public.

It proves the person has:
1.  **Passed a Background Check:** No felony convictions or domestic violence history.
2.  **Completed Training:** Knowledge of safety laws and marksmanship.

Police officers at a traffic stop need to verify these permits in seconds. If a permit has been "Revoked" (e.g., after a recent arrest), but the person still has the physical card, it is a major public safety risk. Live Verify provides the "Live Status" check that saves lives.

**Why would you bother verifying?** Because a revoked permit holder carrying a concealed weapon is committing a felony, and the officer has no way to know from the plastic card alone. Permits are revoked for reasons that directly affect safety: domestic violence protective orders, felony charges, mental health commitments. The gap between revocation and physical card surrender can be days, weeks, or indefinite — some jurisdictions have no mechanism to recover the card at all. For the legitimate permit holder, fast verification also matters: it shortens a tense roadside encounter and confirms to the officer that the armed citizen in the vehicle is exactly who they claim to be.

<div style="max-width: 400px; margin: 24px auto; font-family: sans-serif; border: 2px solid #333; border-radius: 12px; background: #fff; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.2);">
  <div style="background: #1a237e; color: #fff; padding: 15px; text-align: center; display: flex; align-items: center; justify-content: center;">
    <div style="font-size: 1.5em; margin-right: 10px;">⭐</div>
    <div>
      <h3 style="margin: 0; text-transform: uppercase; letter-spacing: 1px;"><span verifiable-text="start" data-for="ccw"></span>STATE OF NEVADA</h3>
      <div style="font-size: 0.8em;">CONCEALED FIREARMS PERMIT</div>
    </div>
  </div>
<div style="padding: 20px; display: flex;">
    <div style="width: 100px; margin-right: 15px;">
      <div style="width: 100px; height: 125px; background: #eee; display: flex; align-items: center; justify-content: center; color: #777; border: 1px solid #ccc; border-radius: 4px;">[PHOTO ID]</div>
    </div>
    <div style="flex-grow: 1;">
      <div style="font-size: 1.1em; font-weight: bold; margin: 0 0 5px 0;">DOE, JOHN JACOB</div>
      <div style="font-size: 0.85em; color: #333; line-height: 1.4;">
        <strong>Permit #:</strong> NV-99228877<br>
        <strong>DOB:</strong> 05/15/1985<br>
        <strong>Sex:</strong> M  |  <strong>Ht:</strong> 6'0"  |  <strong>Wt:</strong> 180<br>
        <strong>Expires:</strong> 05/15/2030
      </div>
    </div>
  </div>
<div style="padding: 0 20px 20px 20px;">
    <div style="font-size: 0.8em; font-weight: bold; color: #1a237e; text-align: center; margin-bottom: 5px;">WASHOE COUNTY SHERIFF</div>
    <div data-verify-line="ccw" style="border-top: 1px dashed #999; padding-top: 5px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
      title="Demo only: Washoe Sheriff doesn't yet offer verification&#10;endpoints, so this is illustrative">
      <span data-verify-line="ccw">verify:washoesheriff.com/ccw/v</span> <span verifiable-text="end" data-for="ccw"></span>
    </div>
  </div>
</div>

## The Problem: Fake Permit Fraud

- **Identity Swapping:** A person with a criminal record using a "Clean" person's ID and editing the photo.
- **Revocation Hiding:** A permit holder who has had their rights revoked (e.g., after a domestic violence incident) keeping their physical card to show police.
- **Fabricated Permits:** Criminals creating fake "Permits" to carry illegal weapons in public without being arrested if stopped.

## What Is Checked

Permit holder name, photo (hash), date of birth, physical descriptors (height/weight), permit number, issuing county/agency, expiration date, restrictions (e.g., "Handgun only"), training completion status.

**Document Types:**
- **Standard CCW Card:** The pocket ID.
- **Interim Permit:** Temporary 30-day paper proof while card is mailed.
- **Training Certificate:** Proof of passing the mandatory safety class.

## What the Checker Sees

Shows the issuer domain (`washoesheriff.com`, `lasvegasnevada.gov`) and current permit status.

**Status Indications:**
- **Active** — Permit is valid and bearer is eligible to carry.
- **Suspended** — Temporary restriction (e.g., pending legal outcome).
- **Revoked** — Permanently barred from concealed carry (e.g., after felony conviction).
- **Expired** — Renewal required.

## Who Holds It

The Permit Holder benefits from verification.

**Interstate Reciprocity:** When carrying in a "Reciprocal" state (e.g., a Nevada resident in Idaho), the holder can scan their own badge to show local Idaho police that their home-state permit is "Verified Active" on the Nevada Sheriff's domain.

**Firearms Purchase:** Speeding up the background check (NICS) process in states where a verified CCW permit acts as an exemption for the waiting period.

## Who Checks It

**Law Enforcement (Roadside)**
**Officer Safety:** During a traffic stop, if a driver declares they have a weapon, the officer can scan the CCW card. Instant verification against the Sheriff's domain confirms the driver is a "Verified Safe" law-abiding citizen and not an impostor with a fake ID.

**Private Property Owners (Businesses)**
**Policy Enforcement:** A business owner who allows concealed carry can verify that guests are actually licensed professionals and not just un-vetted individuals.

**Gun Range Safety Officers**
**Insurance Compliance:** Ensuring all shooters on the line with concealed holsters have verified, current safety training and permits.

## Who Issues It

**Issuer Types** (First Party)

**County Sheriffs:** (In most "Shall-Issue" states).
**State Police:** (In "State-Issue" jurisdictions).
**Department of Public Safety (DPS).**

**Privacy Salt:** ABSOLUTELY CRITICAL. Firearms data is highly sensitive and politicized. The hash MUST be salted to prevent "Guess-and-Check" searches of the entire county population to see who owns a gun.

## Authority Chain

**Pattern:** Sovereign

Issues concealed carry weapons permits after background checks.

```
✓ sheriff.county.gov/ccw/verify — Issues concealed carry weapons permits after background checks
  ✓ usa.gov/verifiers — US federal government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Compared With Police Database (NCIC)

| Feature | Live Verify | NCIC / NLETS (Police DB) | Physical Card |
| :--- | :--- | :--- | :--- |
| **User Access** | **Open.** Citizens and businesses can verify. | **Zero.** Only police have access. | **Manual.** Just looking. |
| **Integrity** | **Cryptographic.** Binds photo to status. | **High.** Direct DB access. | **Low.** Easily faked. |
| **Speed** | **Instant.** 5-second scan. | **Slow.** Requires dispatcher or laptop query. | **Instant.** |
| **Cross-State** | **Seamless.** Works via URL. | **Complex.** State-to-state data sharing is often laggy. | **Hard.** Officers can't recognize 50 different state cards. |

**Narrower conclusion:** Police and licensing databases should remain primary for official enforcement and adjudication. Live Verify is more credible as a complementary bridge when an officer, dealer, or range staff member only has the physical permit in hand and lacks a practical direct path into the issuing state's system.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).

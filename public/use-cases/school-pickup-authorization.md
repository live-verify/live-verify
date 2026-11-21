---
title: "School Pickup Authorization"
category: "Identity & Authority Verification"
volume: "Very Large"
retention: "School year + 1 year"
slug: "school-pickup-authorization"
verificationMode: "clip"
tags: ["school", "pickup", "child-safety", "custody", "authorization", "guardianship", "parental-consent", "education"]
furtherDerivations: 1
---

## What is a Pickup Authorization?

Every school day, millions of children are released to adults who aren't their parents — grandparents, nannies, aunts, family friends, carpool parents. For school staff, this creates a daily high-stakes verification problem: **release to the wrong person and a child could be harmed or abducted.**

Schools maintain "authorized pickup lists" — but these are often paper binders, outdated spreadsheets, or closed-ecosystem apps. When Grandma shows up and the front desk doesn't recognize her, the 30-second interaction becomes tense for everyone.

A Pickup Authorization is a verifiable document proving: "Parent X has authorized Person Y to pick up Child Z from this school until Date D."

**Perspective:** This use case is written from the school staff's perspective. An adult arrives claiming authorization to collect a child.

**Institutional power asymmetry:** The school is legally responsible for the child's safety — releasing to the wrong person can result in harm, abduction, or custody violation.

**Verification asymmetry:** Staff are being asked to release a child in a busy 30-second interaction, but lack a fast independent way to confirm the adult's current authorization beyond checking a paper list or recognizing a face.

**Substitution is the fundamental danger.** The credential may be valid — Grandma is on the authorized list — but the person presenting it may not be Grandma. In a busy dismissal line, staff who don't recognize the adult are making a high-stakes identity judgment in seconds. The verification response includes a `photo_url` field, and staff must compare the face at the door to the photo on record. This is not a nice-to-have: releasing a child to the wrong person can constitute a safeguarding failure, triggering regulatory investigation (Ofsted, state licensing boards), potential criminal liability for the school, and — in custody-dispute cases — contempt of court proceedings.

<div style="max-width: 500px; margin: 24px auto; font-family: sans-serif; border: 2px solid #2e7d32; border-radius: 12px; background: #fff; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
  <div style="background: #2e7d32; color: #fff; padding: 15px; text-align: center;">
    <div style="font-size: 1.2em; font-weight: bold;"><span verifiable-text="start" data-for="pickup"></span>LINCOLN ELEMENTARY SCHOOL</div>
    <div style="font-size: 0.85em; opacity: 0.9;">Authorized Pickup Credential</div>
  </div>
  <div style="padding: 20px; display: flex;">
    <div style="width: 90px; margin-right: 15px;">
      <div style="width: 90px; height: 110px; background: #eee; display: flex; align-items: center; justify-content: center; color: #777; border: 1px solid #ccc; border-radius: 4px; font-size: 0.7em;">[PHOTO]</div>
    </div>
    <div style="flex-grow: 1; color: #333; font-size: 0.9em; line-height: 1.5;">
      <div style="font-weight: bold; font-size: 1.1em;">Margaret Chen</div>
      <div><strong>Relationship:</strong> Grandmother</div>
      <div><strong>Authorized for:</strong> Lily Chen (Grade 2)</div>
      <div><strong>Valid:</strong> Sep 2025 – Jun 2026</div>
      <div><strong>Auth #:</strong> LES-2025-4471</div>
    </div>
  </div>
  <div style="padding: 0 20px 20px 20px;">
    <div style="background: #e8f5e9; border: 1px solid #c8e6c9; padding: 10px; border-radius: 4px; font-size: 0.8em; text-align: center;">
      <strong>Designated by:</strong> Jennifer Chen (Mother) on Aug 15, 2025
    </div>
    <div data-verify-line="pickup" style="border-top: 1px dashed #999; margin-top: 15px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
      title="Demo only: School doesn't yet offer verification endpoints">
      <span data-verify-line="pickup">verify:lincoln-elementary.edu/pickup/v</span> <span verifiable-text="end" data-for="pickup"></span>
    </div>
  </div>
</div>

## The Problem: Wrong Adult

- **Outdated lists:** Paper binder says Grandma is authorized, but Parent revoked that two months ago after a family dispute.
- **Custody violations:** Non-custodial parent shows up on the wrong day, claims they're authorized.
- **Identity confusion:** "I'm the nanny" — but is this the current nanny or the one who was fired last month?
- **Social engineering:** Adult claims emergency ("Mom was in an accident, she sent me") to extract child.

## What Is Checked

Authorized person's name, photo (hash), relationship to child, child's name/grade, designating parent's name, authorization date, expiration date, any restrictions (e.g., "Fridays only," "after 3pm only"), school-issued authorization ID.

**Document Types:**
- **Standing Authorization:** Valid for the school year (grandparents, regular caregivers).
- **Temporary Authorization:** Single-day or short-term (neighbor helping during parent travel).
- **Emergency Contact Upgrade:** Elevating an emergency contact to pickup-authorized.
- **Restricted Authorization:** Court-ordered limitations (e.g., "supervised pickup only").

## Verification Response

The endpoint returns a simple status code:

- **OK** — Person is currently authorized to pick up the named child
- **EXPIRED** — Authorization has lapsed; contact the designating parent
- **REVOKED** — Authorization was explicitly cancelled; do not release
- **RESTRICTED** — Authorization has conditions; see details (e.g., "Fridays only")
- **404** — Authorization not found (forged document, wrong school, or OCR error)

The issuer domain is visible from the `verify:` line on the document itself (e.g., `lincoln-elementary.edu`).

## Who Holds It

The Authorized Pickup Person (second party) receives the authorization credential from the school (first party), keeps it, and presents it when picking up.

**Confidence at the Door:** Grandma doesn't have to argue with skeptical staff or wait while they flip through binders. She presents the credential, staff verifies, child is released.

**Multiple Schools:** A grandparent authorized at three grandchildren's schools carries three credentials — each verified against the respective school's domain.

**Proof of Legitimacy:** If challenged by another parent or bystander ("Who are you taking that child?"), the authorized person has verifiable proof of their status.

## Who Checks It

**School Front Desk Staff**
The primary use case. Staff member sees unfamiliar adult claiming authorization. Instead of calling the parent (who may be in a meeting), flipping through paper lists (outdated), or trusting a verbal claim (dangerous), they verify the credential in seconds.

**After-School Programs / Day Camps**
Programs operating on school grounds or receiving children from schools need the same authorization chain. A credential issued by the school extends to affiliated programs.

**Carpool Coordinators**
Parent-organized carpools where multiple adults pick up each other's children. Each driver carries credentials for all children they're authorized to transport.

## The High-Conflict Divorce Scenario

The most dangerous pickup moments occur in custody disputes:

- **Non-custodial parent** shows up during the other parent's custody time
- **Estranged relative** (grandparent cut off after family conflict) attempts pickup
- **Abduction risk** — one parent fears the other will take the child and flee

In these cases, the custody order (see [Adoption Papers and Custody Orders](view.html?doc=adoption-custody-orders)) defines who has legal authority. The school's pickup authorization must align with the custody order — but it's a separate operational document.

**Critical integration:**
- Schools should require custody documentation before issuing pickup authorizations
- `RESTRICTED` status can flag court-ordered limitations ("Father may pick up only on designated weekends per Cook County Case 2025-D-092341")
- Changes to custody orders should trigger immediate review of pickup authorizations

## Scope and Limitations

**Where Live Verify fits:**
- **Paper-based schools** without digital systems — rural areas, developing countries, under-resourced districts
- **Cross-system portability** — credential works even if the verifier doesn't have the school's app
- **Archival/dispute resolution** — proving after the fact that authorization existed on a specific date
- **Backup verification** — when the school's app is down or the pickup person's phone is dead

**Where app-based solutions are often better:**

Many schools already use pickup management apps (Pikmykid, SchoolPass, Brightwheel, etc.) that provide:

- **Real-time parent control** — Parent can authorize a neighbor for today's pickup in 30 seconds from their phone
- **QR code at pickup** — Authorized person shows QR on their phone; staff scans; photo and authorization appear instantly
- **Geofencing** — App notifies school when authorized person is approaching
- **Photo matching** — Staff sees the mugshot on their tablet, matches to person in front of them
- **Instant revocation** — Parent can cancel authorization while the person is en route

**Honest assessment:** For schools with functioning digital infrastructure, a well-implemented app with QR codes is often faster and safer than Live Verify. The QR workflow is:

1. Authorized person opens app, shows QR
2. Staff scans QR
3. Photo + authorization details appear on staff tablet
4. Visual match → release child

This is faster than text selection and provides the critical photo-matching step in-line.

**Live Verify value proposition:**
- Schools that can't or won't adopt apps
- Interoperability across districts/systems
- A check that needs Live Verify and a data connection, not a vendor's app or account
- Audit trail that doesn't depend on a vendor's database

## Who Issues It

**Issuer Types** (First Party)

**Schools / Districts** — The school is the trust anchor. Parents designate; schools issue.

**Why not parent-issued?** Parents don't have well-known domains. A credential from `jenniferchen.com` means nothing to school staff. The school acts as trusted intermediary — it knows the parent, verifies the designation, and issues against its own domain.

**Privacy Salt:** Critical. Child names + school names are highly sensitive. Hash must be salted to prevent enumeration attacks ("Which children attend Lincoln Elementary?").

## Authority Chain

**Pattern:** Commercial

Issues pupil pickup authorization records

```
✓ pickup.example-school.co.uk/verify — Issues pupil pickup authorization records
```

Commercial issuer — self-authorized. Trust rests on the issuer's domain reputation.

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Where Each Fits: Live Verify, Pickup Apps and Paper Lists

Many schools already use commercial pickup-management apps, in which the parent authorises a collector and staff scan a QR code to see the authorisation and a photo; others keep a paper binder or call the parent. Where a school has a working app, it is usually the better tool for the busy dismissal moment. A verifiable authorisation answers the same question in a form that does not depend on any one vendor, and works alongside an app or in place of a paper list.

| | Pickup app with QR code | Phone call to the parent | Live Verify on the pickup authorisation | Paper binder |
| :--- | :--- | :--- | :--- | :--- |
| **Who can check** | Staff at a school using that app. | Staff who can reach the parent. | Staff at any school, or anyone shown the authorisation. | Staff at the front desk. |
| **What the checker gets** | The app's live authorisation and the collector's photo, on screen as the QR is scanned. | The parent's word, if they answer. | Confirmation that the school stands behind this authorisation, for this collector, child and period, as at the moment of the check, or that it has been revoked. Photo matching is a separate step. | The list as it was last updated. |
| **What the parent shares** | Collector details entered in the app. | A phone conversation. | Only the authorisation the school issued for the collector to carry. | A paper form. |
| **Reach** | Schools on that vendor's platform. | Anywhere the parent can be reached. | Global in principle: any school or district, in any country, that publishes hashes on its own domain. | One school. |
| **Speed and cost** | Fast: scan, see photo, release. A subscription for the school. | Slow, and the parent may not answer. | Slower than a QR scan at the gate, since staff must select or scan the text; one web lookup, with no fee to the standard. Needs a data connection. | Slow: flip pages. Works with no connection. |
| **What it needs** | The school and parent both on the app. | A reachable parent. | The school to publish hashes, and Live Verify-aware software on the staff device. No school does this yet. | Someone to keep it up to date. |
| **Best suited to** | High-volume daily dismissal at schools that have it. | Unusual cases and last-minute changes. | Schools without an app, collections across districts or systems, a backup when the app is down, and proof afterwards that an authorisation existed. | Small settings with few changes. |

**Where each fits:** the pickup moment is fast-paced and high-volume, and for schools with a working app, scanning a QR code and matching the photo is often the faster and safer workflow. Live Verify fits schools that cannot or will not adopt an app, collections that cross districts or systems, a backup when the app is unavailable, and an audit trail that does not depend on a vendor's database, wherever staff have software that honours it.

## Related Use Cases

- [Adoption Papers and Custody Orders](view.html?doc=adoption-custody-orders) — The legal framework that constrains who *can* be authorized
- [Childcare Provider Verification](view.html?doc=childcare-provider-verification) — Verifying the caregiver's identity and background
- [Consent Records](view.html?doc=consent-records) — Parental consent for activities, medical treatment, etc.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).

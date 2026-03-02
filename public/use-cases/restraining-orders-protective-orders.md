---
title: "Restraining Orders and Protective Orders"
category: "Legal & Court Documents"
volume: "Large"
retention: "Order duration + enforcement window (1-10 years)"
slug: "restraining-orders-protective-orders"
verificationMode: "clip"
tags: ["restraining-order", "protective-order", "domestic-violence", "stalking", "harassment", "court-order", "law-enforcement", "victim-safety"]
furtherDerivations: 2
---

## What is a Restraining Order?

A restraining order is a court order that says: stay away from this person. It is the legal system's most direct tool for protecting someone from violence, stalking, or harassment. The problem is enforcement. When a victim calls police to report a violation, the responding officer needs to verify the order is real and current. When a victim shows the order to a school administrator, a workplace security guard, or a building manager, those people have no way to verify it. And critically -- a person subject to a restraining order may claim the order was dismissed, expired, or never existed.

On the flip side, fake restraining orders are used as weapons. Fabricated orders are presented to schools, employers, or landlords to harass the supposed "respondent" who never appeared in court because the order doesn't exist.

With Live Verify, the restraining order carries a verify line bound to the issuing court's domain. Anyone who needs to enforce or respect the order scans it and gets real-time status: active, modified, expired, or dismissed.

<div style="max-width: 600px; margin: 24px auto; font-family: 'Times New Roman', serif; border: 1px solid #ccc; background: #fff; padding: 40px; box-shadow: 2px 2px 10px rgba(0,0,0,0.1);">
  <div style="text-align: center; margin-bottom: 30px;">
    <div style="font-weight: bold; font-size: 1.2em; text-transform: uppercase;"><span verifiable-text="start" data-for="ro">[</span>Superior Court of California</div>
    <div style="font-size: 1em;">County of Los Angeles</div>
    <div style="font-size: 0.9em; margin-top: 5px;">Family Law Division</div>
  </div>
  <h3 style="text-align: center; text-decoration: underline; text-transform: uppercase; font-size: 1.1em;">Domestic Violence Restraining Order</h3>
  <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
    <div>
      <strong>Petitioner (Protected):</strong> Maria Santos<br>
      <strong>Respondent:</strong> David Garza
    </div>
    <div style="text-align: right;">
      <strong>Case No.</strong> 25STRO-08841<br>
      <strong>Order Type:</strong> DVRO
    </div>
  </div>
  <div style="font-size: 0.95em; line-height: 1.6; text-align: justify;">
    <p><strong>Date Issued:</strong> September 14, 2025<br>
    <strong>Expiration Date:</strong> September 14, 2030</p>
    <p><strong>THE COURT ORDERS the Respondent:</strong></p>
    <p>1. Stay at least <strong>100 yards</strong> away from the Petitioner at all times.</p>
    <p>2. Stay away from the following protected locations:<br>
    &nbsp;&nbsp;&nbsp;(a) Petitioner's residence: [ADDRESS REDACTED]<br>
    &nbsp;&nbsp;&nbsp;(b) Petitioner's workplace: [ADDRESS REDACTED]<br>
    &nbsp;&nbsp;&nbsp;(c) Children's school: Westwood Elementary</p>
    <p>3. No contact with Petitioner, directly or through any third party, by phone, email, text, social media, or any other means.</p>
    <p>4. Respondent shall not own, possess, or attempt to purchase firearms or ammunition.</p>
    <p>5. Temporary custody of minor children granted to Petitioner pending further hearing.</p>
  </div>
  <div style="margin-top: 40px; display: flex; justify-content: space-between; align-items: flex-end;">
    <div style="border-top: 1px solid #000; width: 45%; text-align: center; padding-top: 5px;">
      Hon. Judge Patricia Navarro<br>
      <span style="font-size: 0.8em;">SEP 14 2025</span>
    </div>
    <div style="width: 40%; text-align: right;">
      <div style="border: 2px solid #000; display: inline-block; padding: 10px; transform: rotate(-10deg); color: #000; font-weight: bold; opacity: 0.7;">
        ENTERED<br>
        CLERK OF COURT
      </div>
    </div>
  </div>
  <div data-verify-line="ro" style="border-top: 1px dashed #999; margin-top: 40px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
      title="Demo only: Court doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:courts.ca.gov/restraining-order/v <span verifiable-text="end" data-for="ro">]</span>
  </div>
</div>

## Data Verified

Court name, case number, order type (DVRO, civil harassment, stalking, elder abuse), petitioner name, respondent name, date issued, expiration date, conditions summary (stay-away distance, protected locations, no-contact provisions, firearms prohibition), issuing judge.

**NOT included:** Underlying allegations, evidence, testimony, or declarations filed in support of the order.

**Document Types:**
- **Domestic Violence Restraining Order (DVRO):** Protecting against abuse by a spouse, partner, or close family member.
- **Civil Harassment Restraining Order (CHRO):** Non-domestic -- neighbor disputes, workplace harassment, stranger stalking.
- **Elder/Dependent Adult Abuse Restraining Order:** Protecting vulnerable adults.
- **Gun Violence Restraining Order (GVRO):** Restricting firearm access based on threat assessment.

## Verification Response

The endpoint returns a status code:

- **ACTIVE** -- Order is in effect. Returns expiration date.
- **MODIFIED** -- Order has been amended (e.g., conditions changed, stay-away distance increased). Active but different from the paper version.
- **EXPIRED** -- Order has reached its expiration date and was not renewed.
- **DISMISSED** -- Order was vacated or dismissed by the court.
- **MUTUAL** -- Mutual restraining order; both parties are restrained. Important for law enforcement to know -- both sides have obligations and protections.
- **VIOLATED** -- A violation has been reported and is under investigation. Critical for escalation.
- **SEALED** -- Order exists but details are sealed (e.g., minor involved). Confirms existence without revealing details.
- **404** -- No matching record. The order is forged or the details don't match.

## Second-Party Use

The **Protected Person (Petitioner)** benefits from verification.

**Law Enforcement During a Violation:** The petitioner calls 911 and says "he's outside my house." The responding officer scans the order and instantly confirms it is ACTIVE with a 100-yard stay-away distance. No calling the court clerk. No trusting the paper at face value.

**School Administrators:** Presenting the order to a school principal to keep the respondent away from the children's school. The administrator scans, confirms ACTIVE, and knows the order is real and current -- not something forged to manipulate a custody dispute.

**Workplace Security:** Providing the order to workplace security so they know the respondent is not permitted on the premises. Security can verify independently rather than taking the petitioner's word.

**Landlords and Building Managers:** Presenting to a landlord or property manager, particularly in shared housing situations where the respondent must vacate.

**New Jurisdictions (Interstate Enforcement):** When the petitioner moves to a different state, the order must be enforced under the Violence Against Women Act (VAWA). A verifiable order eliminates the "I need to call California and check" delay for Texas police.

## Third-Party Use

**Law Enforcement (Primary Enforcement Verifier)**
The most critical third-party user. Officers responding to violation calls, conducting traffic stops where the respondent is near a protected location, or encountering either party during unrelated incidents. Instant verification means the officer acts on confirmed information, not a piece of paper that could be expired, modified, or fake.

**School Administrators**
Keeping the respondent away from children. Schools are frequently caught in custody-adjacent restraining order disputes. Verified orders let administrators enforce with confidence.

**Employers and Workplace Security**
When a respondent approaches the petitioner's workplace. HR and security teams can verify the order without involving the petitioner, who may not want to disclose the situation to coworkers.

**Landlords and Property Managers**
Eviction of the respondent from shared housing, or denying the respondent access to a building where the petitioner lives.

**Firearms Dealers**
Federal law (18 U.S.C. 922(g)(8)) prohibits firearms possession for subjects of active domestic violence restraining orders. A gun dealer verifying a restraining order is a life-safety check. Currently this goes through NICS, but a verifiable order provides an additional, real-time confirmation that the order is active -- not expired, not dismissed.

**Other Courts**
When the petitioner files in a new jurisdiction or the respondent challenges the order in another state.

**Victim Advocates and Shelters**
Verifying order status for safety planning. A shelter intake worker confirming that the order covering a new resident is still active.

**Hospitals and Emergency Rooms**
When both parties arrive separately after an incident. ER staff need to know a restraining order exists to keep the parties separated and to coordinate with law enforcement.

## Verification Architecture -- Restraining Order Fraud

**The Restraining Order Fraud Problem**

- **Fabricated Orders Used to Harass Respondents:** A fake restraining order is presented to an employer or school to get someone fired, expelled, or evicted. The "respondent" never appeared in court because the order doesn't exist.
- **Dismissed or Expired Orders Presented as Active:** The respondent claims the order was lifted, and it wasn't. Or the petitioner claims the order is active, and it was dismissed last month. Both directions are dangerous.
- **Modified Orders with Old Paper Circulating:** The court changed the conditions -- reduced the stay-away distance, removed a protected location -- but the old paper version is still being enforced.
- **Interstate Enforcement Gaps:** Order issued in California, respondent moves to Texas. Texas police pull over the respondent near the petitioner's new address and have no fast way to verify a California order.
- **The Firearms Angle:** A gun dealer must verify if the buyer is subject to a restraining order. Currently this goes through NICS, which has known gaps and delays. A verifiable order would provide an additional, real-time check at the point of sale.
- **Mutual Orders Misrepresented as One-Sided:** A mutual restraining order means both parties have obligations. One party presents only their protective side to authorities, omitting that they are also restrained.

**Issuer Types** (First Party)

**State Courts:** Superior courts, family courts, district courts -- the primary issuers.
**Tribal Courts:** Tribal courts issue protective orders enforceable under VAWA.
**Military Courts:** Military protective orders (MPOs) issued by commanding officers.

## Privacy Salt

Critical. The existence of a restraining order reveals domestic violence, stalking, or harassment. Salt prevents enumeration of who has orders against whom. However, for public safety, law enforcement access must be prioritized -- the privacy model must balance victim safety against respondent privacy. A high-entropy random salt printed on the document ensures that the hash cannot be reverse-engineered or brute-forced to discover whether a specific individual has an order against them.

## Authority Chain

Issuing court (state superior/family court, tribal court) --> state judicial system --> statute (state domestic violence statutes, VAWA for interstate enforcement). Courts are root authorities in most models, but the specific court must be verifiable -- a fabricated "court" issuing orders from a nonexistent jurisdiction should not be trusted. The authority chain spec defines how verifiers confirm the issuing domain maps to a legitimate court. See [Authority Chain Spec](/specs/authority-chain).

## Competition

| Feature | Live Verify | NCIC/CJIS (Law Enforcement Databases) | Calling the Court Clerk | Trusting the Paper |
| :--- | :--- | :--- | :--- | :--- |
| **Access** | **Open.** Anyone with the document can verify. | **Restricted.** Law enforcement only. Schools, employers, landlords, firearms dealers have no access. | **Business hours only.** Often unhelpful or unable to confirm. | **None.** No verification at all. |
| **Speed** | **Instant.** 5-second scan. | **Minutes.** Requires dispatch to run the query, often during a chaotic scene. | **Slow.** Hold times, transfers, clerk may not have the file. | **Instant but unverified.** |
| **Availability** | **24/7.** | **24/7** but requires law enforcement credentials. | **Business hours.** Court clerks don't work nights, weekends, or holidays -- when most violations occur. | **Always available, always unverified.** |
| **Freshness** | **Real-time.** Shows MODIFIED, DISMISSED, EXPIRED status. | **Good** but depends on court reporting speed to NCIC. | **Real-time** if the clerk checks the file. | **Frozen in time.** Paper shows the order as it was on the day it was printed. |
| **Civilian Access** | **Yes.** Schools, employers, landlords, shelters, firearms dealers. | **No.** | **Theoretically.** In practice, clerks often refuse to confirm to non-parties. | **Yes, but meaningless.** |

**Why Live Verify wins here:** The gap is civilian verification. Police can (eventually) verify through NCIC. But schools, employers, landlords, firearms dealers, victim shelters, and building managers cannot. These are exactly the people who encounter restraining orders in daily life and have no way to check if the paper in front of them is real, current, or fake. Live Verify closes that gap.

## Jurisdictional Witnessing

A jurisdiction may require the issuer to retain a **witnessing firm** for regulatory compliance. The witnessing firm:

- Receives all hashes from the issuer, and any subsequent changes to the payload as they happen -- which may manifest as a new hash, a status change, or even a 404 (record deleted)
- Receives structured content/metadata (key identifiers and dates)
- Does **NOT** receive plaintext or sensitive personal information
- Provides an immutable, timestamped audit trail -- available to the jurisdiction on demand, to document holders/third parties during disputes, or as expert witness testimony in legal proceedings

This provides:
- **Non-repudiation:** Issuer cannot deny issuing the document
- **Timestamp proof:** Document existed at a specific time
- **Regulatory audit:** Jurisdictions can inspect the witness ledger for fraud detection
- **Resilience:** Verification works even if issuer's systems go down

Restraining orders have particular witnessing value because the respondent may later claim they were never served or never knew about the order. A timestamped witness record proves the order existed and was verifiable as of a specific date -- independent of service of process.

**Public Blockchain (Non-Party)**

Witnessing firms may periodically commit rollups to an inexpensive public blockchain, providing an ultimate immutability guarantee. The blockchain is a "non-party" -- infrastructure, not a participant in the transaction. This creates multiple verification paths:

1. **Issuer domain** -- Direct check against the issuer
2. **Witnessing firm** -- Independent confirmation with timestamp
3. **Public blockchain** -- Decentralized trust anchor via rollup inclusion

## Further Derivations

1. **Emergency/Temporary Protective Orders (EPOs/TPOs):** Ex parte orders issued without the respondent present, often by police or judges after hours. Shorter duration (5-21 days), even more urgent verification need -- the respondent hasn't been to court yet and may not even know the order exists. Verification is critical because these orders expire fast and are frequently replaced by longer-term orders.
2. **Civil Harassment Restraining Orders:** Non-domestic restraining orders covering neighbor disputes, workplace harassment, and stalking by strangers. Same verification architecture, different legal standard (no intimate relationship required). Growing category as courts handle more workplace and online stalking cases.

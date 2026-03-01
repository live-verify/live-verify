---
title: "Resort Fees and Mandatory Hotel Disclosures"
category: "Travel & Hospitality"
volume: "Large"
retention: "Stay + 3-7 years (statute of limitations / tax)"
slug: "resort-fees-mandatory-charges"
tags: ["hospitality", "hotel", "resort-fee", "consumer-protection", "ftc-compliance", "drip-pricing", "travel-fraud"]
furtherDerivations: 1
---

## What are Mandatory Resort Fee Disclosures?

In the hospitality industry, "Drip Pricing" is a major consumer protection issue. This occurs when a hotel advertises a $150 room rate, but then forces the guest to pay a mandatory $45 "Resort Fee" at check-in that was hidden or poorly disclosed.

Government regulators (like the FTC) now require these fees to be clearly disclosed at the time of booking. At check-in, the hotel emails the guest a disclosure receipt confirming the mandatory fees for their stay. This email is the primary artifact—the guest keeps it in their inbox as a verified record of what was agreed.

Verified hashes bind the **Mandatory Fee Amounts and Included Services** to the hotel brand's domain (e.g., `mgmresorts.com` or `hilton.com`), providing an immutable record of the price agreement. If the fees charged differ from what was disclosed at booking, the guest has cryptographic evidence of the discrepancy.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <span verifiable-text="start" data-for="resort">[</span>
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;">THE GRAND AZURE RESORT
Mandatory Fee Disclosure & Receipt
═══════════════════════════════════════════════════════════════════

Guest:   JOHN DOE                              Dates: 15-18 MAR 2026
Conf #:  AZ-99228877                           Room:  1242 (King)

In accordance with consumer protection laws, the following mandatory
daily charges are included in your stay:

MANDATORY CHARGES
───────────────────────────────────────────────────────────────────
Charge Description                                     Daily Amount
───────────────────────────────────────────────────────────────────
Mandatory Resort Fee (Wi-Fi, Pool, Gym)                     $ 45.00
Local Tourism Assessment Tax                                $ 12.50
───────────────────────────────────────────────────────────────────
TOTAL MANDATORY DAILY FEES:                                 $ 57.50

Total mandatory fees for 3 nights:                         $ 172.50

</pre>
<span data-verify-line="resort">verify:grandazure.com/fees/v</span> <span verifiable-text="end" data-for="resort">]</span>
</div>

## Data Verified

Guest name, confirmation number, room type, stay dates, itemized mandatory fee amounts, total mandatory charge, disclosure timestamp, hotel ID.

**Document Types:**
- **Guest Folio (Bill):** The final receipt showing all charges.
- **Pre-Arrival Disclosure:** Emailed or on-screen proof of price.
- **Check-in Acknowledgment:** The paper signed at the front desk.

## Data Visible After Verification

Shows the issuer domain (`marriott.com`, `expedia.com`, `caesars.com`) and the pricing standing.

**Status Indications:**
- **Verified Disclosure** — Pricing matches the hotel's official rate-file.
- **Refunded** — **ALERT:** The resort fee was waived/refunded (important for expense claims).
- **Rate Mismatch** — **ALERT:** The paper bill does not match the online disclosure.
- **Void** — Reservation cancelled.

## Second-Party Use

The **Hotel Guest** (second party) receives the disclosure receipt from the hotel (first party), **keeps it**, and may later hand it to third parties for various reasons, or never do so.

**Personal Record:** The guest has their own verified copy of what was agreed. Most of the time, the document just sits in their inbox—the verification value is latent, there *if needed*.

**Peace of Mind:** The guest can confirm at any time that the receipt matches what the hotel's system recorded and hasn't been altered since they received it.

**Future Optionality:** If a dispute arises—whether days or years later—the guest has cryptographic proof ready. They don't need to contact the hotel or hope the hotel kept records. 

## Third-Party Use

The guest (second party) may hand the verified document to various third parties:

**Employer (Expense Reimbursement)**
The guest forwards the verified receipt to prove the "Resort Fee" was a mandatory condition of the stay, not an optional purchase. The employer's expense system can verify authenticity without contacting the hotel. Maybe expenses don't pivot on paperwork talking about a resort/hotel's mandatory fees though. 

**Credit Card Issuer (Chargeback Dispute)**
When disputing a charge for undisclosed fees, the guest provides the verified disclosure as evidence. The bank can instantly confirm whether the fees were properly disclosed by checking the hash against the hotel's domain.

**Consumer Protection Regulators (FTC / State AG)**
The guest submits the verified receipt as part of a regulatory complaint. This provides cryptographic evidence of the hotel's pricing practices—the hotel cannot claim "we never sent that" because the hash verifies against their domain, and made honest by a wintnessing third party. Regulators can aggregate verified complaints to identify patterns of deceptive pricing across hotel chains.

**Tax Accountant (Business Travel Deduction)**
For business travelers, the verified receipt substantiates travel expense deductions with tamper-proof evidence. Again, maybe not on paperwork talking about a resort/hotel's mandatory fees.

**Lawyer (Litigation Evidence)**
In consumer protection lawsuits, verified receipts serve as admissible evidence of what the hotel disclosed.

## Verification Architecture

**The "Drip Pricing" Fraud Problem**

- **Hidden Fee Insertion:** Adding a mandatory fee at the last step of checkout that wasn't in the initial quote.
- **Folio Alteration:** Changing a "Gym Fee" (optional) to a "Resort Fee" (mandatory) on the final bill to hide a policy violation.
- **Bait and Switch:** Offering a low rate on a third-party site but refusing to honor it without a "mandatory supplement" at check-in.

**Issuer Types (First Party)**

- Hotel Property Management Systems (PMS)
- Online Travel Agencies (OTAs) like Expedia/Booking
- Corporate Travel Portals

**Privacy Salt:** Not required. Unlike documents with only one or two variable fields, a resort fee disclosure contains multiple unpredictable values—confirmation number, guest name, stay dates, room number—that together provide sufficient entropy to prevent brute-force hash matching. An attacker cannot feasibly enumerate all combinations to "reverse" the hash.

## Jurisdictional Witnessing

A jurisdiction may require hotels to retain a **witnessing firm** for regulatory compliance. The witnessing firm:

- Receives all hashes from the hotel, and any subsequent changes to the payload as they happen—which may manifest as a new hash, a status change, or even a 404 (record deleted)
- Receives structured content/metadata (fee amounts, dates, confirmation numbers)
- Does **NOT** receive plaintext (guest names, personal details)
- Provides an immutable, timestamped audit trail—available to the jurisdiction on demand, to guests/third parties during disputes, or as expert witness testimony in legal proceedings

This provides:
- **Non-repudiation:** Hotel cannot deny issuing the disclosure
- **Timestamp proof:** Hash existed at a specific time
- **Regulatory audit:** Jurisdiction can inspect the witness ledger
- **Resilience:** Verification works even if hotel's systems go down

**Public Blockchain (Non-Party)**

Witnessing firms may periodically commit rollups to an inexpensive public blockchain, providing an ultimate immutability guarantee. The blockchain is a "non-party"—infrastructure, not a participant in the transaction. This creates multiple verification paths:

1. **Hotel domain** — Direct check against the issuer
2. **Witnessing firm** — Independent confirmation with timestamp
3. **Public blockchain** — Decentralized trust anchor via rollup inclusion

## Rationale

Resort fee verification brings "Price Transparency" to the final mile of travel. By turning the hotel bill into a verifiable digital bridge, it protects consumers from hidden charges, enables regulatory enforcement at scale, and gives every guest portable proof they can hand to anyone who needs to verify it.
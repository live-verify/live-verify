---
title: "National and State ID Cards"
category: "Government & Civic Documents"
volume: "Very Large"
retention: "5-10 years (renewal cycles)"
slug: "national-state-province-id-cards"
verificationMode: "camera"
tags: ["national-id", "state-id", "provincial-id", "identity-verification", "kyc", "fraud-prevention", "government-id", "real-id"]
furtherDerivations: 1
---

## What is a National or State ID Card?

These cards are the core government identity credential for non-drivers, and in many countries they already sit inside a broader machine-readable ecosystem: barcode, chip, NFC, wallet, or issuer-operated identity apps.

That makes Live Verify a complementary tool here, not the dominant one. Its best case is when a human-readable card image or copy is being checked outside the native infrastructure. If a verifier already has NFC, a structured code, or direct access to the issuer's system, those remain the primary path.

<div style="max-width: 400px; margin: 24px auto; font-family: sans-serif; border: 2px solid #333; border-radius: 12px; background: #fff; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.2);">
  <div style="background: #002d62; color: #fff; padding: 15px; display: flex; align-items: center; justify-content: space-between;">
    <div>
      <div style="font-weight: bold; font-size: 1.1em;"><span verifiable-text="start" data-for="nat-id"></span>PROVINCE OF ONTARIO</div>
      <div style="font-size: 0.8em;">PHOTO IDENTIFICATION CARD</div>
    </div>
    <div style="font-size: 1.5em;">🏛️</div>
  </div>
<div style="padding: 20px; display: flex;">
    <div style="width: 100px; margin-right: 15px;">
      <div style="width: 100px; height: 125px; background: #eee; border: 1px solid #ccc; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: #777;">[PHOTO]</div>
    </div>
    <div style="flex-grow: 1;">
      <div style="font-size: 1.1em; font-weight: bold; margin: 0 0 5px 0;">SMITH, JANE M.</div>
      <div style="font-size: 0.85em; color: #333; line-height: 1.4;">
        <strong>ID #:</strong> 9988-7766-5544<br>
        <strong>DOB:</strong> 1985-07-20<br>
        <strong>Sex:</strong> F  |  <strong>Ht:</strong> 5'07"<br>
        <strong>Expires:</strong> 2028-07-20
      </div>
    </div>
  </div>
<div style="padding: 0 20px 20px 20px;">
    <div style="font-size: 0.8em; font-weight: bold; color: #002d62; text-align: center; margin-bottom: 5px;">MINISTRY OF TRANSPORTATION</div>
    <div data-verify-line="nat-id" style="border-top: 1px dashed #999; padding-top: 5px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
      title="Demo only: Ontario MTO doesn't yet offer verification&#10;endpoints, so this is illustrative">
      <span data-verify-line="nat-id">verify:mto.gov.on.ca/v</span> <span verifiable-text="end" data-for="nat-id"></span>
    </div>
  </div>
</div>

## The Problem: Fake ID Fraud

- **Birthdate Tampering:** Minors using high-end printers to change their birth year on a valid ID to buy alcohol or enter venues.
- **Identity Theft:** Using a stolen ID but editing the name or photo on the card.
- **Status Faking:** Presenting a "Valid" paper ID for an identity that has been "Revoked" or "Flagged" by the government for fraud.

## What Is Checked

Full name, date of birth, residential address, unique ID number, sex, physical descriptors (Height/Eye Color), photo (via hash), document serial number, issuing authority, effective/expiration dates.

**Document Types:**
- **State/Provincial ID:** For non-drivers.
- **National ID Card:** Standard in many countries (e.g., EU, Singapore).
- **Public Service Card:** Proving eligibility for welfare/health services.
- **Tribal ID:** Issued by sovereign indigenous nations.

## What the Checker Sees

Shows the issuer domain (`mto.gov.on.ca`, `gov.uk`, `singpass.gov.sg`) and current identity standing.

**Status Indications:**
- **Valid** — Identity is verified and current in the government registry.
- **Stolen/Lost** — Bearer has reported this physical card missing.
- **Superseded** — A newer ID card version exists for this person.
- **Revoked** — Identity credentials terminated (e.g., due to fraud discovery).

## Who Holds It

The Named Individual benefits from verification.

**Age Verification:** Proving to a bouncer or retailer that their "July 20, 1985" birthdate isn't a "Fake ID" modification. Verification against the government domain removes the merchant's fear of "Underage Sales" fines.

**KYC Onboarding:** Proving their identity to an online bank or crypto exchange without needing to wait for a 24-hour "Manual Review" of a high-res photo. A verified hash allows for instant, cryptographic trust.

## Who Checks It

**Hospitality / Alcohol Retailers**
**Bouncer Efficiency:** Instantly confirming that a "Novice Fake" ID isn't authentic. Standard fakes look perfect to the eye; Live Verify connects the bouncer directly to the government source in seconds.

**Landlords / Property Managers**
**Identity Vetting:** Ensuring that a rental applicant is exactly who they claim to be, reducing "Synthetic Identity" fraud in the housing market.

**Financial Institutions**
**Digital KYC:** Verifying the authenticity of a government ID during remote account opening, satisfying AML/CDD requirements without hardware scanners.

## Who Issues It

**Issuer Types** (First Party)

**National Ministries of Interior:** (e.g., in Germany, Spain, Singapore).
**State/Provincial Governments:** (e.g., Ontario, California, Texas).
**Tribal Authorities.**

**Privacy Salt:** ABSOLUTELY CRITICAL. National identity data is the most sensitive data a government holds. The hash MUST be salted to prevent "Mass Mapping" of the population by hackers or foreign intelligence.

## Authority Chain

**Pattern:** Sovereign

National and state governments hold statutory authority under identity legislation to issue identity cards and verify citizen identity.

```
✓ gov.uk/identity/verify — Issues and verifies national identity cards
```

Self-authorized — this is a sovereign body whose authority derives from statute.

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Photo Return: Defeating Sibling Lending and High-Grade Clones

Verification responses can include the issuer's authoritative photo of the credential holder — not just "valid/invalid" but the actual face on file.

**Why This Matters:**

| Attack | Without Photo Return | With Photo Return |
|--------|---------------------|-------------------|
| **Sibling lending** | Bouncer squints at blurry card photo, waves through | Verification returns DMV's crisp photo — clear mismatch to person presenting |
| **High-grade clone** | Fake card with swapped photo, text hashes correctly | Text verifies, but returned photo doesn't match the face on the cloned card |

The cloner can perfectly replicate the card's text and even its holographic features. But they cannot forge what the server sends back. When the bouncer's phone displays the government's photo and it doesn't match the person in front of them, the fraud is exposed.

**The Doppelganger Attack (The "Woman in Cabin 10" Problem)**

Sophisticated fraudsters don't just clone cards — they search social media for facial lookalikes, recruit a doppelganger, then steal the victim's card details. The clone card shows the doppelganger's (similar) face, and when verified, the returned photo is "close enough" to pass casual inspection.

*This attack — finding lookalikes via social media facial matching — was dramatized in "The Woman in Cabin 10" (2025), where antagonists recruited a doppelganger to impersonate a billionaire.*

**Countermeasure: Geo-Anomaly Detection**

States can monitor verification request patterns:
- Card verified in London at 10am, then Los Angeles at 11am? Flagged.
- Card verified 50 times in one day across different venues? Flagged.
- Card verified in a jurisdiction 1,000 miles from holder's registered address repeatedly? Flagged.

Geo-checking won't stop a single clone use, but it detects systematic abuse and can trigger card revocation and investigation before major fraud occurs.

## Where Each Fits: Live Verify and NFC Chip Reading

Many national ID cards carry a chip that a reader or NFC phone can check against the issuing government's keys. Coverage depends on where you are: many countries, including EU member states, issue chipped cards, while many cards, including most US state and Canadian provincial IDs, have no chip. Where the chip exists it is the stronger check of the physical card. Live Verify answers a different question, mainly for a card image or copy, and the two work side by side. <!-- TODO(verify): that most US state and Canadian provincial IDs carry no chip while EU national ID cards do -->

| | NFC chip reading | Live Verify on the card | Scanned PDF or image |
| :--- | :--- | :--- | :--- |
| **Who can check** | Anyone with an NFC reader or phone and software that supports that country's card. | Anyone shown the card or a copy of it, with Live Verify on their device. | Nobody; it can only be taken on trust. |
| **What the checker gets** | Signed data from the chip, including the photo, that proves the card is genuine and unaltered. | Confirmation that the issuing authority stands behind this exact card text, and its current status, such as revoked or flagged. | An image that may have been edited. |
| **What the holder shares** | The physical card, held to the reader. | Only the card or copy they chose to show. | Only the image they chose to send. |
| **Reach** | Countries that issue chipped cards, where the checker's software supports them. | Global in principle: any issuing authority, in any country, that publishes hashes on its own domain. | Universal, but untrusted. |
| **Speed and cost** | Seconds with the card in hand; needs NFC hardware and supporting software. | A few seconds per check: one web lookup, with no fee to the standard. Needs a data connection. | Immediate. |
| **What it needs** | A chipped card, the physical card present, and a compatible reader. | The issuing authority to publish hashes, and Live Verify-aware software on the checker's device. No issuing authority does this yet. | Nothing. |
| **Best suited to** | In-person checks of chipped cards. | Cards without chips, and copies or images checked remotely. | Nothing where identity matters. |

**Where each fits:** Where NFC or official digital-ID infrastructure exists, it should be the first choice. Live Verify is more defensible in the gaps, where the verifier has only a visible card without a chip, or an image or copy, and needs a lightweight way to confirm the issuer's current status.

## Further Reading

[Deep dive: Government IDs](https://github.com/live-verify/live-verify/tree/main/deep-dives/Government_IDs.md)

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).

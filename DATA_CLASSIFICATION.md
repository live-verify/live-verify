# Data Classification for Use Cases

This document explains how to classify information when documenting Live Verify use cases.

Some use cases are personal, some professional, and some are not about an individual at all.

## The Three Fields

### 1. Data that is Verified - THESE ARE MERE CLAIMS UNTIL VERIFIED

**What it is:** The specific fields printed on the physical document that are OCR'd and cryptographically hashed.

**Rule:** If it is text written on the original document and is part of a claim, it goes here.

**Examples:**

1. US Green card: "Name, Sex, A-number, DOB, date valid from and to"
2. Proof of funds letter: "Account holder name, issuing bank, letter date, expiration date, reference number, account balance range (if disclosed in letter)"
3. Medical device cert: "Manufacturer name, facility location, certification body, certificate number, expiration date"

### 2. Data Visible AFTER Verification

If concerning a person, this might be classified as personal informatiom, but likely not personally identifying (PII). 

A number of people (or a number of non-personal uses) might have the exact same data here.

Remembering that verification is a yes/no in its simplest sense and that a missing hash is a "No".

It could be that the document is revoked ahead of its original expiry date/time and that is a fact that can be disclosed in the verification. 
Revocation has other names depending on the document type.

Some document issuers might differentiate on what is visible to different people. 

**Green Card**

Say a Green Card is shown to a prospective employer toward a right to work decision, or a bouncer at a nightclub toward a "is over 21" decision, all they get to 
see is ✅/❌. And if the former, a photo that matches the one of the card itself. 

But, if the person the Green Card was presented was a US govement employee (or contractor) authorized to see more, there could be a link to another website. One they would 
have to log in to and then be authorized to the data within it. The prospective employer and the bouncer may see then link but they can't successfully navigate to it.

It could be the US govenment official has a different app for Live Verify and they get the extra information straight away. It could be they don't use
Live Verify at all, and have a QR code or NFC chip to get to the same.

Say the green card is shown to a prospective employer or bouncer, it might show revoked date, a surrendered date, or a date it was stolen. Maybe a superseded date, 
but no link to the superseding document would be provided.

**Medical Device Cert**

- Buyer scanning cert at delivery, or member of the public looking at the cert: ✅/❌

Provided afer verification: A Medical Device Certificate: revoked date, recalled date. Perhaps a link to a public FDA press release

- FDA inspector → Link to audit system (requires login), shows recalled date if applicable

** Proof of Funds Letter **

- Seller verifying buyer funds: ✅/❌ only
- Bank officer (with holder consent): Link to internal system they would have to log in to, showing letter revocation status

# Evidentiary Procedure for Signing Receipts

This document describes how Live Verify signing receipts (from the [Contract Exchange and Signing Protocol](./contract-exchange-and-signing-protocol.md)) could be used as evidence in court proceedings, and the procedural adaptations needed.

## The contrast with current e-signatures

Today's e-signature platforms present a drawn squiggle or a handwriting-font rendering of the signer's name. Courts have upheld these as legally binding under the ESIGN Act, eIDAS, and equivalent legislation. But binding is not the same as strong. A visual e-signature is trivially reproducible — it's an image that can be copied from one document to another. When disputed, the platform's audit trail (IP address, timestamp, email confirmation) does the real evidential work, not the visual.

Imagine a witness on a stand, shown a printed contract from DocuSign with their e-signature squiggle on it. They would legitimately hesitate: "That looks like my signature, but I can't be certain this is the document I signed." The squiggle could have been placed on a different version.

Now imagine the same witness shown a Live Verify signing receipt. They can check — on their phone, right there — whether the document hash in the receipt matches the contract being presented. "Yes, that hash matches what my signing provider recorded. That is the document I signed." The confidence is qualitatively different: not "that looks like my mark" but "the mathematics confirm this is the exact document."

## Why the witness's own phone is the strongest direct form

The signing receipt verifies against the witness's own signing provider — their iCloud, Google Sign, DocuSign, or other chosen cloud. The witness checking on their own enrolled device, in real time, in view of the court, is the strongest direct form of verification. Alternatives exist (see below) but are weaker or less immediate.

## Proposed courtroom procedure

Courts would need to permit the witness to use their own phone to verify items presented to them. Current courtroom procedure typically does not allow witnesses to consult their own devices while giving evidence. This is a procedural adaptation, not a technical one.

### The court clerk's role

The **court clerk** — who already manages evidence, marks exhibits, and administers oaths — is the natural supervising officer. The procedure:

1. The witness's phone is kept in a signal-blocking (Faraday) box at the witness stand
2. When verification is needed, counsel requests it and the judge permits
3. The clerk watches the witness take the phone from the box
4. The witness opens their signing app, performs the verification
5. The clerk observes the screen throughout and confirms what was displayed
6. Both counsel watch
7. The result is read into the record: "The witness's signing provider confirms / does not confirm that the document hash matches the signing receipt"
8. The phone goes back in the box

### Why the clerk is the right role

The clerk is already the person who handles "is this document what it claims to be?" procedures. The verification is procedurally analogous to the clerk handing a physical document to a witness and asking "is this your signature?" — except the verification is mathematical rather than visual. The clerk's role is ministerial: they watch the operation happen, they don't perform a judgment call. The verification result is deterministic, not interpretive, which makes it cleaner than asking a witness to visually identify a handwriting sample.

### Time cost

The entire process takes about a minute: clerk watches the witness retrieve the phone, witness opens the app, hash is checked, witness confirms "yes, that's the document I signed" or "no, the hash doesn't match — that's not the version I agreed to." Phone goes back in the box.

Compare this to the current alternative when a signature is disputed: a handwriting expert may testify for hours, opposing counsel cross-examines, and the result is still a professional opinion, not a fact. The Live Verify check is binary — the hash matches or it doesn't. No expert disagreement, no "well it looks similar but I can't be certain."

## Jurisdictional considerations

- **US federal courts:** Federal Rules of Evidence govern. Rule 901(b) covers authentication; a signing receipt verified on the witness's own device would likely satisfy the "testimony of a witness with knowledge" standard, but case law would need to develop.
- **US state courts:** Vary by state. States that have adopted the Uniform Electronic Transactions Act (UETA) already recognise electronic records; the procedural question is specifically about device use on the witness stand.
- **England and Wales:** The Civil Evidence Act 1995 and Criminal Justice Act 2003 govern admissibility of electronic evidence. The procedural question of device use by a witness would be at the judge's discretion.
- **EU member states:** eIDAS Regulation provides a framework for electronic signatures and their evidential weight. Qualified electronic signatures carry a presumption of validity, but require qualified certificates, qualified trust service providers, and qualified signature creation devices — none of which this protocol currently defines. A Live Verify signing receipt with biometric authentication on an enrolled device could be adapted toward the qualified signature standard if integrated with a qualified trust service provider, but it does not meet that standard as described here.

## Alternatives to the witness using their own phone

If a jurisdiction is not ready to allow witnesses to use their own devices, alternatives include:

- **Court officer performs the verification** — using the witness's account credentials on a court-controlled device. This has privacy and security concerns (entering credentials on an unfamiliar device).
- **Pre-trial verification** — the signing provider produces a signed attestation before trial, submitted as documentary evidence. This loses the courtroom drama of live verification but achieves the same evidential outcome.
- **Expert witness from the signing provider** — a representative of the cloud provider testifies that their records show the hash was registered at the claimed time. Similar to how DocuSign currently provides audit trail evidence.

The live-in-court phone verification is the strongest form (the witness personally confirms in real time), but the protocol's evidential value does not depend on it. The signing receipt, the provider's records, and the witnessing institution's records all exist independently of whether the witness checks their phone on the stand.

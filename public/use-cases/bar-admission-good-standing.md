---
title: "Bar Admission and Good-Standing Letters"
category: "Professional & Educational Qualifications"
volume: "Very Small"
retention: "Current + 2-5 years"
slug: "bar-admission-good-standing"
verificationMode: "clip"
tags: ["legal", "attorney", "bar-association", "good-standing", "license", "professional"]
furtherDerivations: 1
---

## What is a Good-Standing Letter?

Just because someone has a law degree doesn't mean they are allowed to practice law today. They might have been suspended for stealing client money or disbarred for ethics violations.

A Certificate of Good Standing is the "Live License" for a lawyer. It is issued by the Supreme Court of their state and proves they are active and compliant.

**Why would you bother verifying?** Because the consequences of engaging a suspended or disbarred lawyer are severe and often irreversible. Contracts drafted by an unauthorized practitioner may be voidable. Court filings made by someone not in good standing can be struck, causing missed deadlines that cannot be recovered. A client who discovers their lawyer was suspended only after losing a case or a property transaction has limited recourse — malpractice insurance typically does not cover unauthorized practice, and the disciplinary system is designed to protect future clients, not to compensate past ones. The harm compounds: the client loses the case, loses the fees paid, and may face costs awarded to the other side — all because the person standing in court was not actually permitted to be there.

The strongest architecture is still the court or bar's own public status page or registry where one exists. Live Verify is more credible as a bridge when the good-standing letter itself is the portable artifact being filed, emailed, or shown in court.

<div style="max-width: 600px; margin: 24px auto; font-family: 'Times New Roman', Georgia, serif; border: 1px solid #999; background: #fff; padding: 40px; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
  <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #000; padding-bottom: 20px;">
    <div style="font-weight: bold; font-size: 1.4em; letter-spacing: 1px;"><span verifiable-text="start" data-for="bar"></span>SUPREME COURT OF THE STATE OF NEW YORK</div>
    <div style="font-size: 0.9em; margin-top: 5px;">APPELLATE DIVISION, FIRST JUDICIAL DEPARTMENT</div>
  </div>
<div style="font-size: 1em; line-height: 1.8; color: #000; text-align: justify;">
    <p>I, Susanna Rojas, Clerk of the Appellate Division of the Supreme Court of the State of New York, First Judicial Department, do hereby certify that</p>
<p style="text-align: center; font-size: 1.3em; font-weight: bold; margin: 20px 0;">SAUL GOODMAN</p>
<p>was duly licensed and admitted to practice as an Attorney and Counselor-at-Law in all the courts of this State on <strong>May 15, 2010</strong>, has duly taken and subscribed the statutory oath of office, and has been enrolled in the Roll of Attorneys and Counselors-at-Law on file in my office, is currently in <strong>GOOD STANDING</strong>, and is registered with the Office of Court Administration.</p>
  </div>
<div style="margin-top: 40px; display: flex; justify-content: space-between; align-items: flex-end;">
    <div>
      <div style="width: 100px; height: 100px; border: 2px double #ccc; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.7em; color: #999; font-weight: bold;">OFFICIAL<br>SEAL</div>
    </div>
    <div style="text-align: right;">
      <div style="border-top: 1px solid #000; width: 200px; padding-top: 5px;">Susanna Rojas, Clerk</div>
      <div style="font-size: 0.8em; color: #777;">March 15, 2026</div>
    </div>
  </div>
<div data-verify-line="bar" style="border-top: 1px dashed #999; margin-top: 40px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
      title="Demo only: State Bar doesn't yet offer verification&#10;endpoints, so this is illustrative">
      <span data-verify-line="bar">verify:nycourts.gov/attorneys/v</span> <span verifiable-text="end" data-for="bar"></span>
  </div>
</div>

## The Problem: Fake Lawyer Fraud

- **Identity Theft:** A non-lawyer using the name and bar number of a real, perhaps retired, attorney to open a fake firm and steal client deposits.
- **Suspension Concealment:** An attorney who was suspended last month presenting a "Good Standing" letter they printed three months ago.
- **Fabricated Credentials:** Using a high-quality template to create a bar admission certificate for a non-existent lawyer.

## What Is Checked

Attorney name, bar registration number, admission date, current status (Good Standing, Suspended, Disbarred), disciplinary history summary, issuing court/department, date of letter.

**Document Types:**
- **Certificate of Good Standing:** For out-of-state admission (Pro Hac Vice).
- **Attorney Registration Card:** Pocket ID.
- **Disciplinary History Extract:** For judicial appointments.

## Verification Response

The endpoint returns a simple status code:

- **OK** — Attorney is in good standing
- **SUSPENDED** — Temporarily barred (non-payment, ethics investigation)
- **DISBARRED** — Permanently removed from practice
- **404** — Not found (deceased, never admitted, or OCR error)

The issuer domain is visible from the `verify:` line on the document itself (e.g., `nycourts.gov`).

**More Information:**

The response includes a link to the bar association's public profile:

```
HTTP 200 OK

Status: OK
More: https://nycourts.gov/attorneys/profile/saul-goodman
```

This page shows admission date, disciplinary history, CLE compliance, and contact details for the bar association if you have concerns. The existing complaint infrastructure handles reporting—no need to duplicate it here.

## Who Holds It

The Attorney benefits from verification.

**Pro Hac Vice Admission:** When an attorney needs to practice in a foreign state for one specific case, the foreign court requires a "Good Standing" letter from their home state. A verified letter prevents the 2-week delay of mailing physical paper between court clerks.

**Job Applications:** Proving to a law firm or corporate legal department that their license is active and they have no hidden disciplinary history.

## Who Checks It

**Courts and Judges**
**Authority to Practice:** A judge can scan the attorney's ID or standing letter in the courtroom to ensure the person standing before them is actually a member of the bar and hasn't been quietly suspended.

**Banks and Lenders**
**Escrow Account Verification:** Ensuring that an attorney opening an IOLA/IOLTA (trust) account is in good standing and authorized to hold client funds.

**Clients**
**Consumer Protection:** A client can verify their lawyer's status before signing a retainer or handing over a large deposit.

## Who Issues It

**Issuer Types** (First Party)

**State Supreme Courts:** (The ultimate authority in most US states).
**State Bar Associations:** (Acting as the administrative arm).
**National Registries:** (e.g., ABA National Lawyer Regulatory Data Bank).

## Authority Chain

**Pattern:** Regulated

US attorneys are admitted by their state's court system, not a federal body. The chain terminates at the state government — Tenth Amendment sovereignty.

```
✓ nycourts.gov/attorneys/v — Admits and regulates New York attorneys
  ✓ ny.gov — New York state government
```

UK solicitors are regulated by the SRA under the Legal Services Act:

```
✓ sra.org.uk/solicitors/verify — Regulates solicitors in England and Wales
  ✓ legalservicesboard.org.uk — Oversees approved legal regulators
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Where Each Fits: Live Verify and Public Attorney Search

Most US state bars and court systems, and many bar associations and law societies elsewhere, offer a free public search of admitted lawyers and their current standing. Coverage depends on the jurisdiction: some publish detailed status, some only names, and some offer nothing online. A public search and Live Verify answer different questions and work side by side: the search shows standing today, while Live Verify confirms that a specific good-standing letter is one the court or bar issued, as at its date.

| | Public attorney search | Live Verify on the good-standing letter | Paper certificate |
| :--- | :--- | :--- | :--- |
| **Who can check** | Anyone who finds the right jurisdiction's search. | Anyone handed the letter: another state's bar, a court for admission pro hac vice, a law firm, an employer. | Anyone comparing seals and signatures by eye. |
| **What the checker gets** | Current standing, though a common name can lead to the wrong lawyer. | Confirmation that the issuing court or bar stands behind this exact letter, for this lawyer, as at its date. | A certificate that may have been forged or be out of date. |
| **What the lawyer shares** | Nothing; the register is public. | Only the letter they chose to hand over. | The certificate. |
| **Reach** | One jurisdiction's lawyers. | Global in principle: any court or bar that publishes hashes on its own domain. | Universal, but untrusted. |
| **Speed and cost** | Free and quick, once the right site is found. | A few seconds per check: one web lookup, with no fee to the standard. | No lookup needed. |
| **What it needs** | The checker to find the right search and the right person. | The issuer to publish hashes, and Live Verify-aware software on the checker's device. No court or bar does this yet. | Nothing. |
| **Best suited to** | Checking current standing. | Admissions and applications where the letter itself is what is submitted. | Nothing where standing matters. |

**Where each fits:** public attorney search should remain the primary check where it is practical, because it shows standing today. Live Verify is complementary when the good-standing letter is already the document being passed around and the checker wants to tie that specific letter to the right lawyer without the ambiguity of a name search, provided their software honours it.

## See Also

- [Professional Licenses](view.html?doc=professional-licenses) — Broader registry-primary framing
- [University Degrees and Transcripts](view.html?doc=university-degrees) — Another credential family where the portable artifact is useful but not dominant

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).

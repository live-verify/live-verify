---
title: "Charity Commission Registration Confirmation"
category: "Charitable & Non-Profit"
volume: "Medium"
retention: "Registration period (ongoing while charity is active)"
slug: "charity-commission-registration"
verificationMode: "clip"
tags: ["charity", "non-profit", "charity-commission", "registration", "donor-trust", "fundraising", "fraud-prevention", "regulator"]
furtherDerivations: 2
---

## What is a Charity Commission Registration Confirmation?

The Charity Commission for England and Wales maintains the register of charities. A charity must be registered if its annual income exceeds £5,000. The registration number is a public fact — anyone can look it up on the Commission's search tool. But the gap is the same as with any registry: the lookup exists, and almost nobody uses it at the moment it matters.

The moment it matters is when someone is about to donate. The donor encounters the charity's claim — "Registered Charity No. 1188442" — on the charity's website, on a crowdfunding page, on a collection tin, or in a letter through the door. The claim is self-asserted. The donor has no practical way to check it without navigating to the Charity Commission's website, entering the number, and reading the result.

A verifiable registration claim is text issued by the Charity Commission, embedded on the charity's website or printed on physical fundraising materials. The donor verifies it in place — by clipping the text on the website, or by clipping text from a photo of a collection tin or letter — without navigating away to the Commission's own search tool.

This use case covers the binary fact of registration: "This organisation is a registered charity." For effectiveness ratings and impact assessments issued by watchdog organisations (Charity Navigator, GiveWell), see [Charity Rating Certificates](charity-rating-certificates.md).

## Example: Website Registration Claim

The Charity Commission supplies the charity with an HTML snippet to embed on their website. The styling is ignored by clip mode — only the text content matters for hashing.

<div style="max-width: 480px; margin: 24px auto; background: #fff; border: 2px solid #1d70b8; border-radius: 8px; padding: 24px; box-shadow: 0 4px 12px rgba(29,112,184,0.15); font-family: 'Segoe UI', Arial, sans-serif;">
  <div style="display: flex; align-items: center; margin-bottom: 16px;">
    <div style="width: 40px; height: 40px; background: #1d70b8; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 0.55em; color: #fff; margin-right: 12px;">CC</div>
    <div style="font-size: 0.75em; color: #000; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">Registered Charity</div>
  </div>
  <span verifiable-text="start" data-for="charity-web"></span>
  <div style="color: #333; font-size: 0.95em; line-height: 1.7;">
    <span style="color: #000; font-weight: 600;">Hope for Homes Foundation</span> <span style="color: #999;">(hopehomes.org.uk)</span><br>
    is a registered charity with the<br>
    <span style="color: #666;">Charity Commission (No. 1188442)</span> on
  </div>
  <div style="margin-top: 12px; padding-top: 10px; border-top: 1px solid #ddd; font-family: 'Courier New', monospace; font-size: 0.78em; color: #000;">
    <span data-verify-line="charity-web">verify:charitycommission.gov.uk/charities/v</span>
  </div>
  <span verifiable-text="end" data-for="charity-web"></span>
</div>

The text that clip mode sees and hashes:

```
Hope for Homes Foundation (hopehomes.org.uk)
is a registered charity with the
Charity Commission (No. 1188442) on
verify:charitycommission.gov.uk/charities/v
```

The Charity Commission controls the claim text. The charity embeds it. The hash is unaffected by styling changes the charity makes to match their site design.

## Example: Physical Materials (Collection Tins, Mail Appeals)

The same registration is displayed on collection tins, postal fundraising letters, and printed leaflets. The donor can photograph the material and clip the text from the photo.

<div style="max-width: 380px; margin: 24px auto; background: #fff; border: 2px solid #000; border-radius: 8px; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); font-family: 'Segoe UI', Arial, sans-serif;">
  <div style="display: flex; align-items: center; margin-bottom: 14px;">
    <div style="width: 36px; height: 36px; background: #1d70b8; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 0.55em; color: #fff; margin-right: 10px;">CC</div>
    <div style="font-size: 0.7em; color: #666; text-transform: uppercase; letter-spacing: 1px;">Registered Charity</div>
  </div>
  <span verifiable-text="start" data-for="charity-tin"></span>
  <div style="color: #000; font-size: 0.95em; line-height: 1.8; font-weight: 500;">
    Hope for Homes Foundation
  </div>
  <div style="color: #333; font-size: 0.9em; line-height: 1.6;">
    Charity Commission Registration: 1188442
  </div>
  <div style="margin-top: 10px; padding-top: 8px; border-top: 1px solid #ccc; font-family: 'Courier New', monospace; font-size: 0.78em; color: #000;">
    <span data-verify-line="charity-tin">verify:charitycommission.gov.uk/charities/v</span>
  </div>
  <span verifiable-text="end" data-for="charity-tin"></span>
</div>

The text from the physical material:

```
Hope for Homes Foundation
Charity Commission Registration: 1188442
verify:charitycommission.gov.uk/charities/v
```

The primary verification path is clip from the website when the donor is considering a donation online. The physical path — photographing a collection tin or letter — is less convenient but available at the moment a donor encounters a street collector or mail appeal.

## Example: Fake Charity Copies the Claim

If a fraudulent organisation copies the website claim onto their own site at `hope4homes-donate.com`, the hash still verifies — the text is identical. But the browser extension detects the mismatch:

1. The claim text contains `(hopehomes.org.uk)` — the extension extracts the domain
2. The verification response includes `"allowedDomains": ["hopehomes.org.uk", "*.hopehomes.org.uk"]`
3. The current page is `hope4homes-donate.com`, which matches neither

The extension shows an amber warning:

> "This registration verified, but it names hopehomes.org.uk and you are on hope4homes-donate.com."

## Example: Deregistered or Under-Investigation Charity

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #7a1f1f; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;">Verification Result
═══════════════════════════════════════════════════════════════════

Status:           REMOVED
Reason:           Charity removed from register
Result:           This organisation is not a registered charity

verify:charitycommission.gov.uk/charities/v
</pre>
</div>

A charity that has been removed from the register — whether voluntarily or by the Commission — may continue displaying "Registered Charity" on its website and fundraising materials for months or years. The verification endpoint returns the current status, not the status when the claim was first issued.

## Data Verified

Charity name, registration number, registration body, registered website domain, and current registration status.

**Document Types:**
- **Registration Confirmation** — The charity is registered with the Charity Commission for England and Wales. The registration number, charity name, and registered purposes are part of the verified claim.
- **CIO Registration** — Charitable Incorporated Organisation registration. Same verification pattern but the charity has a specific legal form with limited liability for trustees.
- **Excepted/Exempt Charity Registration** — Some charities (e.g., certain religious charities, armed forces charities) are excepted or exempt from registration but may still appear on the register voluntarily.

**Privacy Salt:** Not required. Charity registration is a matter of public record. The register is fully public by design — the Charities Act requires it.

## Data Visible After Verification

Shows the issuer domain (`charitycommission.gov.uk`) and the charity's current registration status.

**Verification Response Format:**

```json
{
  "status": "verified",
  "allowedDomains": ["hopehomes.org.uk", "*.hopehomes.org.uk"]
}
```

**Status Indications:**
- **Registered** — Charity is currently on the register and in good standing.
- **Removed** — Charity has been removed from the register. May have been voluntary (charity wound up) or compulsory (Commission action).
- **Under Investigation** — The Commission has opened a statutory inquiry. The charity is still registered but the inquiry is a matter of public record.
- **Registration Suspended** — The Commission has frozen the charity's bank accounts or suspended trustees. Still technically registered but unable to operate normally.
- **404** — No charity with this registration number exists on the register.

## Second-Party Use

The **donor** benefits directly.

**When donating online:** The donor visits a charity's website and sees "Registered Charity No. 1188442." They clip the registration claim on the page. The response confirms the charity is currently registered and the domain matches. The donor gives with confidence that the organisation is genuinely regulated.

**When encountering a street collector:** A collector shakes a tin displaying the charity name and registration number. The donor photographs the tin, clips the text, and verifies. This confirms the collection is for a real charity — not a person with a printed label and a bucket.

**When receiving a mail appeal:** A letter arrives asking for donations to a charity the recipient has not heard of. The letter includes the registration claim. The recipient clips the text from a photo of the letter before deciding whether to respond.

## Third-Party Use

**Crowdfunding and Donation Platforms**

**Onboarding verification:** Platforms like JustGiving, GoFundMe, and Virgin Money Giving require charities to prove registration before listing them. A verified registration claim provides automated, real-time confirmation directly from the Commission rather than relying on uploaded PDFs of registration letters.

**Grant-Making Bodies**

**Application screening:** Foundations and lottery distributors (e.g., National Lottery Community Fund) verify that grant applicants are registered charities. A verified claim embedded in the application provides instant confirmation without manual lookup.

**HMRC**

**Gift Aid compliance:** Gift Aid tax relief is available only to registered charities. HMRC can verify registration status programmatically when processing Gift Aid claims, ensuring that tax relief is not paid on donations to organisations that have been removed from the register.

**Corporate Partners**

**Charity of the Year selection:** Companies choosing a charity partner for employee fundraising verify that the charity is registered and not under investigation. The verification response surfaces the current status, including any open statutory inquiry.

## Verification Architecture

**The Fake Charity Problem**

Charity fraud takes several forms, all of which exploit the gap between the claim and its verification:

- **Fabricated charities** — An organisation claims to be a registered charity but has never been registered. The registration number is invented. This is common in doorstep and street collection fraud, where the collector relies on the donor not checking.
- **Deregistered charities still fundraising** — A charity has been removed from the register (for failing to file accounts, for mismanagement, or voluntarily) but continues to solicit donations. The website still says "Registered Charity" because nobody updated it.
- **Charities under statutory inquiry** — The Commission has opened a formal investigation into misconduct or mismanagement. The charity is still registered and still fundraising, but donors might want to know about the inquiry before giving.
- **Lookalike charities** — A fraudulent organisation registers a name very similar to a well-known charity (e.g., "Cancer Research" vs. "Cancer Research UK") and copies the branding. The registration number in the claim text resolves to the real charity's record, and the domain mismatch catches the impersonation.
- **Collection tin fraud** — Physical collection tins with printed labels claiming a charity registration number. The number may be real (belonging to a different charity) or invented entirely.

The verifiable claim addresses these because:

1. The Charity Commission issues the claim — it is not self-asserted by the charity
2. The claim names the specific website where it applies
3. Removal and inquiry status are immediate — the endpoint returns the current state
4. The browser extension detects domain mismatches when claims are copied to other sites
5. Physical materials carry the same verifiable text, checkable by photographing and clipping

<details>
<summary>Other Jurisdictions</summary>

**United States — IRS 501(c)(3) Status**

In the US, tax-exempt status under section 501(c)(3) of the Internal Revenue Code is the equivalent of charity registration. The IRS maintains the Tax Exempt Organization Search tool. Donors check 501(c)(3) status to confirm their donation is tax-deductible. The same pattern applies: the IRS issues a verifiable claim that the organisation embeds on its website. The verification endpoint would be operated by the IRS (e.g., `verify:irs.gov/tax-exempt/v`). Revocation of tax-exempt status — which can happen for failure to file Form 990 for three consecutive years — would be reflected immediately in the verification response.

**Scotland — OSCR (Office of the Scottish Charity Regulator)**

Charities operating in Scotland must register with OSCR, which maintains its own register independently of the Charity Commission for England and Wales. A charity operating across the UK may be registered with both bodies. The claim pattern is the same: `verify:oscr.org.uk/charities/v` with the Scottish charity number (prefixed SC) in the claim text.

**Northern Ireland — CCNI (Charity Commission for Northern Ireland)**

The Charity Commission for Northern Ireland maintains a separate register. Registration has been phased in since 2013 and is now mandatory for charities operating in Northern Ireland. The claim pattern: `verify:charitycommissionni.org.uk/charities/v` with the NIC registration number.

**Republic of Ireland — Charities Regulator**

The Charities Regulator maintains the Register of Charities for the Republic of Ireland. All charities operating in Ireland must register. The claim pattern: `verify:charitiesregulator.ie/charities/v` with the RCN (Registered Charity Number).

**Australia — ACNC (Australian Charities and Not-for-profits Commission)**

The ACNC maintains the national charity register. Registration is required for charities to access tax concessions. The claim pattern: `verify:acnc.gov.au/charities/v` with the ABN (Australian Business Number) used as the charity identifier.

</details>

## Competition vs. Current Practice

| Feature | Live Verify | Charity Commission Search | Registration Number on Website | Phone Call to Commission |
| :--- | :--- | :--- | :--- | :--- |
| **Issuer-controlled** | **Yes.** Commission issues the claim. | **Yes.** But requires the donor to navigate there. | **No.** Self-asserted by the charity. | **Yes.** But slow. |
| **Verifiable at point of donation** | **Yes.** On the charity's own website or from physical materials. | **No.** Requires leaving the page. | **No.** Number could be fabricated. | **No.** Requires a phone call. |
| **Shows current status** | **Yes.** Live response from Commission. | **Yes.** If the donor checks. | **No.** Static text. | **Yes.** If the donor calls. |
| **Detects removal from register** | **Yes.** Endpoint returns REMOVED. | **Yes.** If checked. | **No.** Text remains on the page. | **Yes.** |
| **Detects open inquiry** | **Yes.** Response includes investigation status. | **Yes.** If the donor reads the full entry. | **No.** | **Yes.** If the donor asks. |
| **Detects copied claims** | **Yes.** Domain mismatch warning. | **No.** | **No.** | **No.** |

**Practical conclusion:** The Charity Commission's search tool works for donors who use it. The problem is that most people do not. They see "Registered Charity No. 1188442" on a website or a collection tin and take it at face value. A verifiable claim embedded on the charity's own site — or printed on physical materials — turns a self-asserted number into a checkable one at the moment the donor is deciding whether to give.

## Authority Chain

**Pattern:** Regulated

The Charity Commission for England and Wales is a non-ministerial government department established by the Charities Act 2011. It is the sole registrar and regulator of charities in England and Wales.

```
✓ charitycommission.gov.uk/charities/v — Charity registration confirmation
  ✓ gov.uk — UK government oversight
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Further Derivations

None currently identified.

---
title: "Solicitor Bank Details Verification"
category: "Real Estate & Property"
type: "credential"
volume: "Large"
retention: "6 years (SRA record-keeping requirements, transaction completion + dispute period)"
slug: "solicitor-bank-details-verification"
verificationMode: "clip"
tags: ["conveyancing", "solicitor", "bank-details", "friday-afternoon-fraud", "property-purchase", "email-interception", "payment-redirection", "real-estate", "anti-fraud"]
furtherDerivations: 1
---

## What is Solicitor Bank Details Verification?

During a property purchase in England and Wales, the buyer must transfer a large sum — often the entire deposit or completion funds — to their solicitor's client account. The solicitor emails the bank details: sort code, account number, and a payment reference.

Criminals intercept this email and replace the bank details with their own. The buyer transfers the funds to the fraudulent account. The money is moved within minutes and is rarely recovered. This is known in the UK as "Friday afternoon fraud" because property completions frequently happen on Fridays, giving criminals the weekend before the fraud is detected.

The amounts involved are substantial — typically between £30,000 and £500,000 or more. For many buyers, this is their life savings.

The attack works because the buyer has no independent way to verify that the bank details in the email are genuinely those of the solicitor's client account. The email looks authentic. The sort code and account number are plausible. The buyer has no reference point.

A verifiable claim of the solicitor's genuine bank details, issued by the solicitor's firm and hosted on their domain, gives the buyer a way to check before transferring.

## Example: Solicitor Client Account Details

The solicitor's firm publishes a verifiable claim of the bank details for a specific matter. The claim is sent to the client by email. The inline styling is ignored by clip mode — only the text content matters for hashing.

<div style="max-width: 520px; margin: 24px auto; background: #fff; border: 2px solid #1a3c6e; border-radius: 8px; padding: 24px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); font-family: 'Segoe UI', Arial, sans-serif;">
  <div style="display: flex; align-items: center; margin-bottom: 16px;">
    <div style="width: 40px; height: 40px; background: #1a3c6e; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 0.65em; color: #fff; margin-right: 12px;">T&A</div>
    <div style="font-size: 0.75em; color: #1a3c6e; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">Client Account Details</div>
  </div>
  <span verifiable-text="start" data-for="bankdetails1"></span>
  <div style="color: #333; font-size: 0.95em; line-height: 1.8;">
    <span style="color: #1a3c6e; font-weight: 600;">Turner & Associates Solicitors</span><br>
    Client Account for Property Transactions<br>
    Sort Code: <span style="font-family: 'Courier New', monospace; font-weight: 600;">20-44-18</span><br>
    Account: <span style="font-family: 'Courier New', monospace; font-weight: 600;">41188299</span><br>
    Reference: <span style="font-family: 'Courier New', monospace; font-weight: 600;">TA/2026/CEDAR-GROVE</span>
  </div>
  <div style="margin-top: 12px; padding-top: 10px; border-top: 1px solid #ccc; font-family: 'Courier New', monospace; font-size: 0.78em; color: #1a3c6e;">
    <span data-verify-line="bankdetails1">verify:turnerassociates.co.uk/bank-details/v</span>
  </div>
  <span verifiable-text="end" data-for="bankdetails1"></span>
</div>

The text that clip mode sees and hashes is:

```
Turner & Associates Solicitors
Client Account for Property Transactions
Sort Code: 20-44-18
Account: 41188299
Reference: TA/2026/CEDAR-GROVE
verify:turnerassociates.co.uk/bank-details/v
```

## How the Attack Fails

1. The solicitor creates the verifiable claim and publishes the hash at `turnerassociates.co.uk/bank-details/v`.
2. The solicitor emails the bank details to the buyer, including the verify line.
3. A criminal intercepts the email and changes the sort code and account number.
4. The buyer selects the bank details text and verifies it.
5. The hash of the modified text does not match the hash published at the solicitor's domain.
6. Verification fails. The buyer contacts the solicitor by phone to confirm the correct details before transferring.

The criminal cannot update the hash on the solicitor's domain because they do not control it. They can only change the email contents, which breaks the hash.

## Example: Intercepted Email with Substituted Details

If a criminal changes the sort code from `20-44-18` to `30-92-71` and the account from `41188299` to `55029183`, the buyer's verification attempt produces:

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #7a1f1f; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;">Verification Result
═══════════════════════════════════════════════════════════════════

Status:           FAILED
Result:           The text does not match any claim published at
                  turnerassociates.co.uk

verify:turnerassociates.co.uk/bank-details/v
</pre>
</div>

The mismatch is unambiguous. The buyer knows not to transfer.

## Data Verified

Solicitor firm name, client account sort code, client account number, and matter-specific payment reference.

**Document Types:**
- **Client Account Bank Details** — The primary claim: these are the genuine bank details for a specific matter or transaction.
- **Updated Bank Details** — A replacement claim if the firm changes its banking arrangements, with the previous claim revoked.

**Privacy Salt:** Required. Bank account details are sensitive. The salt prevents brute-force reconstruction of sort code and account number combinations from the published hash. Without a salt, the relatively small keyspace of UK sort codes (6 digits) and account numbers (8 digits) would be vulnerable to enumeration.

## Data Visible After Verification

Shows the issuer domain (e.g., `turnerassociates.co.uk`) and whether the claim is current.

**Verification Response Format:**

```json
{
  "status": "verified",
  "issuedAt": "2026-03-18T14:22:00Z",
  "expiresAt": "2026-04-18T23:59:59Z"
}
```

The response deliberately does not echo the bank details back. The buyer already has the details in the email — the verification confirms they are genuine. Short expiry periods are appropriate because bank details for a specific transaction are time-limited.

**Status Indications:**
- **Verified** — The bank details match the solicitor's published claim and are current.
- **Expired** — The claim has passed its expiry date. The buyer should contact the solicitor to obtain fresh details.
- **Revoked** — The solicitor has revoked this claim, likely because the matter has completed or the details have changed.
- **404** — No such claim exists at the solicitor's domain. The bank details may be fraudulent.

## Second-Party Use

The **solicitor's firm** benefits directly.

**Fraud prevention for clients:** The firm can demonstrate it has taken active steps to protect clients from payment redirection fraud during conveyancing. This is a professional obligation under SRA guidance.

**Reduced liability:** If a client falls victim to email interception despite the firm providing verifiable bank details, the firm's position is stronger — they provided a verification mechanism that the client could have used.

**Professional reputation:** Conveyancing fraud damages the reputation of the entire profession. Firms that adopt verifiable bank details distinguish themselves from those that rely on email alone.

## Third-Party Use

**Property Buyers**

**Pre-transfer verification:** The buyer checks the bank details against the solicitor's domain before initiating a transfer. This is the core use case. The check takes seconds and can prevent a loss of tens or hundreds of thousands of pounds.

**Buyer's Bank**

**Transfer validation:** A bank could refuse to process large transfers to accounts that do not match a verified claim from the recipient's domain. This would require integration with the verification protocol, but the incentive is strong — banks currently bear significant costs from authorised push payment (APP) fraud reimbursement.

**Solicitors Regulation Authority (SRA)**

**Compliance monitoring:** The SRA could require firms to publish verifiable bank details as part of anti-fraud compliance, and audit whether firms are doing so.

**Conveyancing Insurers**

**Risk assessment:** Insurers providing professional indemnity cover for conveyancing firms could factor verifiable bank details into their risk models, potentially reducing premiums for firms that adopt the practice.

## Verification Architecture

**The Email Interception Problem**

- **Email is insecure by default:** Standard email (SMTP) can be intercepted, modified, or spoofed. Even with TLS in transit, emails are stored in plaintext on mail servers. Compromised mailboxes are common.
- **Bank details are high-value targets:** A single intercepted email containing bank details for a property completion can yield £100,000+ for the attacker.
- **No verification channel exists:** The buyer receives bank details by email and has no independent channel to verify them. Calling the solicitor is advised but rarely done — and the phone number in the email may also be compromised.
- **Time pressure:** Completions are time-sensitive. The buyer is told to transfer "today" or risk losing the property. This pressure discourages careful verification.

The verifiable claim addresses these because:

1. The hash is published on the solicitor's domain, which the criminal does not control
2. Modifying the bank details in the email breaks the hash — the tampering is detectable
3. The verification is fast — it does not delay the transaction
4. The verify line in the email is a clear prompt to check before transferring

## Competition vs. Current Practice

| Feature | Live Verify | Phone Callback | Confirmation of Payee (CoP) | PDF Letterhead |
| :--- | :--- | :--- | :--- | :--- |
| **Independent of email** | **Yes.** Hash on solicitor's domain. | **Yes.** But phone number may be compromised. | **Yes.** Bank-side check. | **No.** Attached to email. |
| **Tamper-evident** | **Yes.** Modified details break the hash. | **No.** Verbal confirmation only. | **Partial.** Checks name vs account. | **No.** PDF can be edited. |
| **Instant** | **Yes.** Seconds. | **No.** Requires reaching the right person. | **Yes.** But only checks name match. | **No.** |
| **Works before transfer** | **Yes.** | **Yes.** | **Yes.** | **No verification step.** |
| **Covers sort code + account** | **Yes.** Full details verified. | **Yes.** If callback reaches genuine solicitor. | **Partial.** Name match only; not sort code or account. | **No.** |
| **Revocable** | **Yes.** Immediate. | **No.** | **No.** | **No.** |

**Practical conclusion:** Confirmation of Payee (CoP), introduced by UK banks, checks whether the account name matches the payee name. This catches some fraud but not cases where the criminal has set up an account under a similar name. Phone callbacks work but rely on the buyer having a genuine phone number and the solicitor being available. Verifiable bank details complement both — they provide a cryptographic check of the actual sort code and account number against the solicitor's published claim. CoP and verifiable claims used together provide stronger protection than either alone.

## Authority Chain

**Pattern:** Professional / Regulated

```
✓ turnerassociates.co.uk/bank-details/v — Client account details verification
```

For firms that want to demonstrate SRA registration as part of the chain:

```
✓ turnerassociates.co.uk/bank-details/v — Client account details verification
  ✓ sra.org.uk/solicitors/firm/v — SRA firm registration and authorisation
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Further Derivations

1. **Matter-Specific Completion Statements** — Verifiable completion statements including the exact amount due, bank details, and completion date, providing a single verified document for the entire transfer.
2. **Solicitor Identity Verification** — Verifiable claim that the individual solicitor handling the matter is a named, practising solicitor at the firm, preventing impersonation of specific fee earners.

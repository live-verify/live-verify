---
title: "Vendor Bank Account Verification"
category: "Financial Compliance"
volume: "Large"
retention: "7 years (audit trail)"
slug: "vendor-bank-account-verification"
verificationMode: "clip"
tags: ["invoice-fraud", "bec", "business-email-compromise", "vendor-management", "bank-account-verification", "financial-crime"]
furtherDerivations: 1
---

## What is Vendor Bank Account Verification?

"Invoice Redirection" fraud (a form of Business Email Compromise, or BEC) is a massive financial crime. Scammers intercept a legitimate invoice and change the "Remit To" bank details to their own. The customer pays the invoice, the funds disappear, and the legitimate vendor is left unpaid.

A **Verifiable Account Ownership Certificate (VAOC)** is a document issued by a bank to its corporate client. It proves that a specific account number belongs to a specific entity. The vendor includes this verified claim on their invoices or in their vendor onboarding package.

**Why verification matters here:**

- **A single altered invoice can drain six figures.** The attacker intercepts or spoofs an email from a legitimate vendor and changes the bank details. The accounts payable team processes the invoice, wires $150,000 to the fraudulent account, and discovers the error only when the real vendor calls asking why they have not been paid. The money is gone within hours.
- **The legitimate vendor suffers too.** The vendor did the work, delivered the goods, and sent the invoice. They are now unpaid — and the customer may dispute liability, arguing the invoice was "from" the vendor's email address. The vendor is caught between chasing payment and preserving the commercial relationship.
- **Manual verification does not scale.** Calling the vendor to confirm bank details before every payment is impractical for companies processing thousands of invoices monthly. A VAOC verified against the vendor's bank domain provides automated, scalable confirmation that the account number on the invoice matches the vendor's actual account.

<div style="max-width: 650px; margin: 24px auto; font-family: sans-serif; border: 1px solid #004d40; background: #fff; padding: 0; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <div style="background: #004d40; color: #fff; padding: 20px; display: flex; justify-content: space-between; align-items: center;">
    <div>
      <div style="font-weight: bold; font-size: 1.2em;"><span verifiable-text="start" data-for="vaoc"></span>ACCOUNT OWNERSHIP CERTIFICATE</div>
      <div style="font-size: 0.8em; opacity: 0.9;">Global Treasury Services</div>
    </div>
    <div style="text-align: right;">
      <div style="font-weight: bold; font-size: 0.9em;">CERTIFIED RECORD</div>
      <div style="font-size: 0.7em;">Ref: GTS-9982-AX</div>
    </div>
  </div>
<div style="padding: 25px; font-size: 0.9em; line-height: 1.6; color: #333;">
    <p><strong>Issuing Bank:</strong> CHASE BANK (Main Hub)<br>
    <strong>Certified Entity:</strong> ACME INDUSTRIAL SOLUTIONS, INC.<br>
    <strong>Tax ID:</strong> 12-3456789</p>
<div style="background: #f1f8f6; border: 1px solid #004d40; padding: 15px; margin: 15px 0; border-radius: 4px;">
      <p style="margin: 0;"><strong>Primary Operating Account:</strong></p>
      <p style="margin: 5px 0 0; font-size: 1.2em; font-family: monospace;">CHASE US 1234567890 (Checking)</p>
      <p style="margin: 5px 0 0;"><strong>Status:</strong> VERIFIED OWNER (Since 2018)</p>
    </div>
<p style="font-size: 0.8em; color: #666; font-style: italic;">
      This certificate confirms that the account listed above is held by the certified entity. Use this to verify remittance instructions.
    </p>
  </div>
<div style="padding: 20px; background: #f9f9f9; border-top: 1px dashed #004d40; text-align: center;">
    <div data-verify-line="vaoc" style="font-family: 'Courier New', monospace; font-size: 0.8em; color: #000; font-weight: bold;">
      <span data-verify-line="vaoc">verify:chase.com/gts/v</span> <span verifiable-text="end" data-for="vaoc"></span>
    </div>
  </div>
</div>

## Data Verified

Issuing bank name, certified entity name, account number (full or masked), account type, owner Tax ID/EIN, certificate issuance date, reference number.

**Document Types:**
- **Account Ownership Certificate:** The standard proof for vendor files.
- **Remittance Instruction Attestation:** Direct binding of an invoice to an account.
- **Bank Reference Letter:** General standing plus account verification.

## Data Visible After Verification

Shows the issuer domain (`chase.com`, `hsbc.com`) and the account status.

**Status Indications:**
- **Active / Verified** — Record matches the bank's current ownership file.
- **Account Closed** — **ALERT:** Remittance should not be sent to this account.
- **Ownership Dispute** — **ALERT:** Bank is reviewing account control.
- **Sanctioned** — **ALERT:** Account is restricted.

## Second-Party Use

The **Vendor (Business Entity)** benefits from verification.

**Invoice Trust:** Vendors ensure their customers can instantly verify that the payment instructions on an invoice are legitimate. This prevents the "2-day delay" when a customer calls the vendor's office to manually confirm bank details.

**Onboarding Speed:** During vendor onboarding, providing a verified certificate from their bank speeds up the "Vendor Verification" phase by procurement teams.

## Third-Party Use

**Customers / Accounts Payable Teams**
**Fraud Prevention:** Before making a high-value payment, the AP team scans the hash to confirm the account really belongs to the vendor. If a "new invoice" arrives with a different hash (or no hash), it triggers immediate investigation.

**Auditors**
**Internal Control:** Verifying that the company's vendor master file only contains verified bank accounts.

**Financial Institutions**
**KYB (Know Your Business):** Banks can verify the identity and account ownership of business partners during transaction monitoring.

## Verification Architecture

**The "Invoice Redirection" Fraud Problem**

- **Inbound PDF Modification:** Scammers intercept a legitimate PDF invoice and use an editor to change the bank details before it reaches the customer.
- **Social Engineering:** Scammers email the customer's AP department posing as the vendor: "We've changed banks; please update our records."
- **Internal Collusion:** A corrupt employee in the customer's office changes vendor bank details to their own.

**Issuer Types** (First Party)

**Commercial Banks.**
**Treasury Management Platforms.**

**Privacy Salt:** Critical. Account numbers are sensitive. The hash must include a random salt to prevent enumeration.

## Authority Chain

**Pattern:** Regulated

Banks issue vendor account ownership certificates and are regulated by the UK Financial Conduct Authority under the Payment Services Regulations 2017 and Confirmation of Payee scheme.

```
✓ payments.example-corp.com/vendor/verify — Bank issuing account ownership verification certificates
  ✓ fca.org.uk/register — Regulates UK payment service providers
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Rationale

Invoice fraud relies on the customer's inability to verify a "remit to" instruction in real time. By binding the account number to the bank's domain, we turn a passive PDF line into a verifiable cryptographic bridge.

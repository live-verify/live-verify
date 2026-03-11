# Non-Sovereign Verification Patterns

## Beyond Government Chains

Most Live Verify use cases follow a familiar pattern: issuer → regulator → government. A prescription verifies against a GP surgery, which chains to the GMC, which chains to `gov.uk`. A driver's badge verifies against TfL, which chains to `gov.uk`. The government root is the ultimate trust anchor.

But government is not the only source of trust. Many valuable attestations have no regulator in the chain and no government at the end. The trust comes from somewhere else: from commercial reputation, from bilateral relationships, from the accumulated weight of multiple independent attestations pointing at the same claim.

These are the patterns that a SaaS verification provider (see [SAAS-VERIFICATION-PROVIDERS.md](SAAS-VERIFICATION-PROVIDERS.md)) enables at near-zero cost. The backend is small (see [`backend/`](../backend/)). The barrier to entry is a domain and a subscription.

## The Four Non-Sovereign Patterns

### B2B — Businesses Attesting to Each Other

**Trade references.** The commercial equivalent of employment references. "Meridian Components Ltd has supplied our manufacturing line since 2019. They have fulfilled 847 orders with a 99.6% on-time delivery rate and zero quality rejections in the past 12 months." Verified by `procurement.rolls-royce.com`.

No regulator is involved. Rolls-Royce's domain *is* the trust anchor — because if you're a potential customer evaluating Meridian Components, a trade reference from Rolls-Royce's procurement department carries more weight than any certification body. The attestation is valuable because the attester's reputation is at stake.

**Supplier quality attestations.** "We have audited this factory and it meets our quality standards." Verified by the auditing company's domain. This is what ISO 9001 certificates do today, but ISO certification is expensive, slow, and binary (pass/fail). A domain-verified attestation from an actual customer is more granular and more current: "Passed our audit on 15 Feb 2026. Next audit due Aug 2026. Previous non-conformances: 1 minor (resolved)."

**Supply chain provenance.** A chain of attestations, each from a different party:

```
✓ farm.fincaelalto.co — "These beans are Caturra variety, grown at 1,800m, Huila, Colombia"
✓ import.volcancoffee.co.uk — "Imported by us, cupping score 87, arrived 14 Feb 2026"
✓ roast.squaremilecoffee.com — "Roasted 18 Feb 2026, batch 4471"
```

No government in the chain. No regulator. Each party attests to their segment. The café customer scanning a bag of beans sees three independent commercial domains, each confirming their part of the story. Fraud requires compromising three separate businesses — or the customer noticing that `farm.totallylegit.biz` has replaced `farm.fincaelalto.co`.

**Payment behaviour attestations.** "This company pays invoices within terms." Verified by a counterparty's domain. This is trade credit intelligence currently monopolised by Dun & Bradstreet and Experian Business. A decentralized version where your actual suppliers confirm your payment behaviour on their own domains is more current, more granular, and owned by nobody.

### P2P — Individuals Attesting to Each Other

**Professional peer endorsements.** Covered in detail in [decentralized-professional-graph.md](decentralized-professional-graph.md). The key insight: a cryptographic commitment on your personal domain has skin in the game that a LinkedIn endorsement click does not.

**Community trust networks.** A plumber and an electrician who regularly work together on renovations, each attesting to the other's reliability on their own domains. A childminder attested by six parents whose personal domains each confirm "This person looked after my children for two years and I trust them completely." No Ofsted rating — but six independent personal attestations from named individuals is a different kind of trust signal.

**Skill attestations between practitioners.** "I pair-programmed with this person for six months. They understand distributed systems at a level I rarely see." Verified by `sarah-chen.com`. More credible than a certification exam because the attester has direct experience and is staking their name.

**Lending and borrowing trust.** "I lent this person £500 and they repaid it on time." Verified by `mike.dev`. Repeated attestations from multiple lenders build a credit profile without a credit bureau. This is how trust worked in small communities before Experian existed — except now the attestations are cryptographically bound to named domains rather than verbal reputation.

### P2B — Individuals Attesting to Businesses

**Verified customer reviews.** "I stayed at the Grand Hotel, Room 412, 14-16 March 2026. The room was clean, the staff were helpful, breakfast was mediocre." Verified by `jane.dev`.

The hotel cannot fake this review because they don't control Jane's domain. Jane cannot deny this review because her domain confirms the hash. The review cannot be removed by a platform because it doesn't live on a platform — it lives on Jane's domain and is independently verifiable.

This is what Trustpilot and Google Reviews claim to provide but can't: verified-purchase reviews that neither the business nor the platform can manipulate.

**Verified complaint records.** The inverse of a positive review. "I hired this builder and they abandoned the job half-finished." Verified by the homeowner's domain. The builder can't get it taken down. The homeowner can't post it anonymously — their domain is attached. Both parties have skin in the game.

**Donor attestations for charities.** "I donated £1,000 to this charity and received a detailed impact report showing how it was spent." Verified by the donor's domain. Accumulated donor attestations build a trust profile for the charity that no single rating agency (Charity Navigator, GuideStar) controls.

**Whistleblower attestations.** "I worked at this company and witnessed systematic overcharging of NHS contracts." Verified by a pseudonymous domain, with identity escrowed (see [identity escrow use case](../public/use-cases/conditional-identity-disclosure.md)) for legal proceedings. The attestation is public and verifiable; the attester's identity is sealed until a court orders disclosure.

### B2P — Businesses Attesting to Individuals

**Employment references.** Already the core use case (see [employment references](../public/use-cases/employment-references.md)). "Jane Smith was employed here as Senior Engineer, March 2019 to November 2023."

**Customer loyalty attestations.** "This person has been a customer since 2014, with zero disputes and no late payments." Verified by `accounts.nationwide.co.uk`. Useful for credit decisions, tenancy applications, and insurance underwriting — without sharing detailed financial data. The attestation confirms the relationship and its quality without exposing the balance.

**Skill certifications from commercial providers.** "Completed Advanced Kubernetes Administration, scored 94%." Verified by `training.hashicorp.com`. No government accreditation, no university. The brand is the trust anchor. In tech, a HashiCorp certification verified against HashiCorp's domain carries more weight with hiring managers than a university module, because the issuer is the authority in that specific domain.

**Platform reputation portability.** "This seller completed 2,847 transactions on our platform with a 99.2% satisfaction rating." Verified by `sellers.ebay.com` or `marketplace.amazon.co.uk`. Currently, your eBay reputation is locked to eBay. A verified attestation from eBay's domain is portable — you can present it to any other marketplace, any wholesale supplier, any business partner. The reputation travels with you because the attestation is on eBay's domain, not eBay's platform.

## The SaaS Enablement Layer

None of these patterns require technical sophistication from the attester. A coffee farm in Huila, Colombia does not need to understand SHA-256 or run a verification server. They need a SaaS provider that:

1. Gives them a dashboard where they type the attestation text
2. Publishes the hash on infrastructure that resolves under the farm's domain (via `delegateTo` in the farm's `verification-meta.json` — see [delegation.md](delegation.md))
3. Charges them a few dollars a month

The SaaS provider is infrastructure, not a platform. The attestation resolves against `farm.fincaelalto.co`, not against `saas-verify.com`. The farm's domain is the trust anchor. The SaaS provider is plumbing.

Multiple SaaS providers can compete on price, UX, reliability, and geographic specialisation. Switching providers means updating the `delegateTo` pointer — the hashes and the domain don't change.

## What Makes These Different from Sovereign Chains

| | Sovereign Chain | Non-Sovereign Chain |
|---|---|---|
| **Trust source** | Government statute | Commercial reputation, bilateral relationship, accumulated attestations |
| **Chain depth** | 2-3 nodes to government root | 1 node (self-attested) or multiple parallel attestations |
| **Revocation authority** | Regulator can revoke | Attester can revoke their own attestation; no central authority |
| **Fraud signal** | Absent chain = suspicious | Absent chain = normal; quality comes from *who* attested, not chain depth |
| **Value accrual** | To the regulatory system | To the attesters' reputations and the subject's portable profile |

The key difference: sovereign chains derive trust from *depth* (how many regulators stand behind the claim). Non-sovereign chains derive trust from *breadth* (how many independent parties attest to the same claim) and *reputation* (how well-known and credible the attesting domains are).

A single attestation from `procurement.rolls-royce.com` might be enough. Or a supplier might accumulate attestations from ten customers, none of them individually decisive but collectively overwhelming. The trust model is closer to academic citation than to government licensing.

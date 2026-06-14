# Let's Encrypt: The Historical Precedent for the Disintermediation Play

Live Verify proposes to give away, as an open standard, something an existing industry sells:
attestation that a thing is genuine. That has happened before, recently, in an adjacent trust
market — TLS certificates — and the episode is well documented. This page summarizes what
Let's Encrypt did, who paid for it and why, how incumbents reacted, and what the precedent
does and does not predict for Live Verify.

## The market before

Until 2015, an HTTPS certificate was a paid product. The bottom tier — Domain Validation (DV),
which proves only "this party controls this domain" — was sold for roughly $10–$100/year by
certificate authorities (CAs) such as Symantec/VeriSign, Comodo, GoDaddy, and GeoTrust, despite
near-zero marginal cost. The result was predictable: most of the web didn't bother. In 2015,
under half of page loads were encrypted. The paid-verification toll booth didn't just extract
margin from those who paid; it priced out a vastly larger population who simply went unserved.

That last point is the structural heart of the precedent: **the toll booth's biggest casualty
was not the people paying the toll — it was everyone who stayed off the road.**

## What Let's Encrypt did

- **Free.** Certificates at zero cost, forever, as policy.
- **Automated.** The ACME protocol let a server request, validate, and renew certificates with
  no human in the loop. ACME later became an open IETF standard (RFC 8555, 2019) — the
  protocol, not the organization, is the standard.
- **Neutral.** Operated by the Internet Security Research Group (ISRG), a California 501(c)(3)
  nonprofit founded in 2013 expressly so that no browser vendor, CA, or hosting company owned it.

Announced November 2014; public beta December 2015; out of beta April 2016. By February 2020 it
had issued its billionth certificate. Encrypted page loads went from under half in 2015 to
above 90% on major platforms within a decade. Annual operating budget through the high-growth
years: low single-digit millions of dollars — famously less than incumbent CAs spent on
marketing — with a staff in the tens, not hundreds.

## Who backed it, and why each backer wanted the toll booth gone

This is the instructive part. Every founding sponsor had a commercial or mission reason to want
certificates commoditized. Nobody backed it out of charity toward the CA industry's customers.

| Backer | What they were | Why commoditized certs served them |
|---|---|---|
| **Mozilla** | Browser vendor | A more-encrypted web is a safer product to ship; Firefox's competitiveness improves when security is ambient rather than a luxury. Two Mozilla engineers, Josh Aas and Eric Rescorla, conceived the project; Aas became ISRG's executive director. |
| **EFF** | Civil-liberties nonprofit | Mission alignment: ubiquitous encryption as a civil-liberties goal. Peter Eckersley's EFF team (with J. Alex Halderman at the University of Michigan) had a parallel effort that merged into the project. |
| **University of Michigan** | Research institution | Halderman's group built measurement and protocol work; academic credibility and authorship. |
| **Akamai** | CDN | More TLS traffic means more demand for the TLS-termination infrastructure CDNs sell. Free certs grew Akamai's market. |
| **Cisco** | Network equipment | Same logic at the hardware layer: an encrypted-by-default internet sells more capable network gear. |
| **IdenTrust** | An incumbent CA | The pivotal, counterintuitive one: IdenTrust **cross-signed** Let's Encrypt's intermediate certificate, making its certs trusted by every browser years before ISRG's own root was embedded in trust stores. An incumbent provided the bootstrap bridge for its own industry's disruptor. |

Later sponsors included Chrome, Facebook/Meta, OVH, Automattic, and others, plus philanthropic
grants (the Ford Foundation among them) and individual donations. The pattern held throughout:
infrastructure companies whose business grows when the verified population grows, platform
vendors who want safety to be ambient, and mission organizations — never the toll-booth
operators themselves, with the IdenTrust bootstrap exception.

The other backer worth naming is a **demand-side forcing function**: Google Chrome began marking
plain-HTTP pages "Not secure" in July 2018. Once the dominant browser made the *absence* of
verification visible, getting a certificate stopped being optional. Supply (free certs) and
demand (visible shaming of the unverified) arrived as a pincer.

## How incumbents reacted

The playbook, observable in public record:

1. **FUD.** "Free DV certificates help phishers"; "no liability framework"; "automation is
   reckless." Let's Encrypt's response — a CA attests domain control, not virtue; encryption is
   not endorsement — held, and the FUD aged badly.
2. **The trademark grab.** In late 2015 Comodo, then the largest CA by volume, filed trademark
   applications for "Let's Encrypt" and variants. After public outcry in June 2016, it abandoned
   them. An incumbent literally attempted to own the disruptor's name.
3. **Up-stack retreat.** The paid market conceded the bottom tier and moved to OV/EV
   certificates, enterprise certificate *management*, and PKI-as-a-service. Even that ground
   shifted: browsers removed the EV visual indicator around 2019, erasing much of the premium
   tier's visible value. Durable value concentrated in fleet management and operations — DigiCert
   thrives today selling certificate lifecycle management, not certificates.
4. **Consolidation under private equity.** The incumbents were substantially PE-owned through
   the disruption: Thoma Bravo took DigiCert in 2015 (later Clearlake and TA Associates);
   Francisco Partners bought Comodo's CA business in 2017 and rebranded it Sectigo; Symantec's
   CA unit — after browser vendors distrusted it over mis-issuance — sold to DigiCert in 2017
   for $950M. PE did not stop the open standard; it rolled up and repositioned the survivors
   around the up-stack services.

None of these reactions killed the project. What would have killed it was indifference — and
the unserved long tail made indifference impossible, because the first hundred million adopters
were people the incumbents had never served at all.

## What the precedent predicts for Live Verify

- **Serve the unserved first.** Most documents have no verification economy to disrupt — the
  fraud just happens. The Scottish gas fitter's certificate and the small council's permit are
  the equivalent of the 2015 unencrypted web: the beachhead incumbents can't defend because they
  were never there.
- **Recruit backers whose business grows when verification is ubiquitous**, not incumbents whose
  business *is* verification. The analogs: browser/OS/camera vendors (safety as ambient product
  feature — the Mozilla seat), CDNs and static-hosting platforms (hash endpoints are traffic —
  the Akamai seat), document-emitting SaaS (a feature, not a threat), insurers and banks who
  *bear* fraud losses (in the UK, banks now reimburse authorized-push-payment fraud — they have
  direct P&L motive), and civil-society organizations who prefer privacy-preserving verification
  to centralized digital-identity schemes (the EFF seat).
- **Watch for an IdenTrust.** One incumbent verification or certification body lending early
  legitimacy — endorsing the spec, anchoring an authority chain, or backfilling its own
  records — is worth more than ten neutral endorsements. The Medpro case makes Intertek itself
  the poetic candidate.
- **The demand-side forcing function is the platforms.** "Not secure" did for HTTPS what a
  camera or browser overlay reading "Unverified document" could do here. This is why the
  platform-adoption track matters beyond distribution: it makes non-verification *visible*.
- **Expect the playbook.** FUD ("unaudited", "no liability framework", "who stands behind
  this?"), name/standard capture attempts, lobbying for accredited-provider verification schemes,
  and up-stack repositioning. Pre-empt in writing — saying the quiet part first is the cheapest
  defense.
- **A neutral steward matters.** ISRG's nonprofit neutrality is what let competitors co-fund it.
  If Live Verify reaches the stage of a maintained sovereign-roots list or conformance fixtures
  with multiple corporate adopters, a comparable neutral home (even a lightweight one, in the
  mold of the Public Suffix List's stewardship) will be the structure that lets rivals share it.

## Where the analogy breaks (read before quoting this page)

Honesty about the limits:

- **TLS had a choke point; documents don't.** Two browser vendors could force the entire web's
  hand. No equivalent pair of gatekeepers can mandate document verification across hospitals,
  councils, insurers, and universities. Adoption here is many small decisions, not two big ones.
- **Let's Encrypt runs infrastructure; Live Verify runs none.** ISRG operates a CA — a single
  operator with real annual costs, which is precisely what attracted and required sponsors.
  Live Verify's full decentralization means there is no equivalent cost center to fund — but
  also no single organization accumulating sponsorship gravity, staff, and institutional voice.
  The standard is cheaper to run and harder to champion. ISRG's budget bought full-time
  advocates; an open standard with no operator must find its advocates another way.
- **Certificates were already a standardized commodity** with one universal verifier (the
  browser). Document verification has heterogeneous documents, issuers, and verifying contexts;
  normalization and authority chains carry complexity TLS adoption never faced.
- **The CA market's collapse had a second cause**: Symantec's mis-issuance scandal and
  subsequent browser distrust. The incumbents wounded themselves; Live Verify's incumbents may
  not be so obliging.

## One-line summary

Let's Encrypt proved that a free, automated, neutrally-stewarded open standard can commoditize
a paid trust product within a decade — funded not by charity but by companies whose businesses
grow when verification becomes ambient, bootstrapped by one defecting incumbent, and propelled
by platforms making the *absence* of verification visible. Live Verify's job is to find its
Mozilla, its Akamai, its IdenTrust, and its "Not secure" moment — while serving the enormous
population the toll booths never reached.

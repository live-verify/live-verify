# Pitch Materials: Safety Fraud Examples

Real-world fraud cases that Live Verify prevents. Each example illustrates a specific attack vector where a criminal exploits the trust gap between "looks legitimate" and "is legitimate."

These are for pitch decks, landing pages, investor presentations, and media coverage. They're grouped by the victim's vulnerability at the moment of the fraud.

## At Your Front Door

**Fake tradesperson home invasion.** Criminals in high-vis vests and tool belts ring the doorbell: "British Gas, here about a leak." The homeowner opens the door. There is no leak. There is a burglary — or worse. This is one of the most common frauds targeting elderly people living alone in the UK and USA. Police forces across England issue "bogus caller" warnings monthly.

With Live Verify, the homeowner scans the badge through the window before opening the door. If the badge verifies against `staff.britishgas.co.uk` with a chain to `ofgem.gov.uk`, it's real. If it verifies against an unknown domain — or doesn't verify at all — the door stays shut.

**Fake utility worker burglary.** A man in a hard hat says he needs to read the meter. He's actually casing the house for a later break-in, or stealing valuables while the homeowner shows him to the meter cupboard. Common fraud targeting elderly homeowners who grew up trusting anyone in a uniform.

**Fake building inspector extortion.** Someone presents a clipboard and a badge: "Code enforcement — you've got violations. Pay the fine now or we condemn the property." They demand payment in cash or gift cards. Real inspectors never demand on-the-spot payment. But a frightened small business owner or elderly homeowner doesn't know that. Scanning the badge and seeing no government domain in the chain would stop this instantly.

**Fake social worker child abduction.** The most terrifying variant. Someone claiming to be from child protective services demands access to a home, sometimes presenting forged paperwork. Documented cases in the USA and Europe of attempted child abduction using this pretext. A verifiable credential bound to `social-services.gov` or the local authority's domain would let a parent confirm or deny the claim in seconds.

**Fake delivery driver package theft and home invasion.** With hundreds of millions of packages delivered annually, "delivery driver" is the most common stranger at a residential door. Criminals in Amazon vests or DoorDash t-shirts (bought on eBay for under $20) use the pretence to steal packages from porches or gain entry for burglary. The victim assumes the uniform is proof of legitimacy.

## In a Stranger's Vehicle

**Fake taxi driver assault.** A woman leaves a bar alone at midnight. A car pulls up claiming to be her pre-booked minicab. The driver shows a badge. She gets in. The driver is not licensed. The badge is fake. The car is not registered with any private hire operator. This is a documented attack pattern in London, Manchester, and major US cities. TfL and police run regular campaigns warning against unlicensed drivers.

With Live Verify, the passenger scans the driver's badge before getting in. A chain terminating at `tfl.gov.uk → gov.uk` means a government licensing authority vouches for this driver. A badge from an unknown domain — or no verification at all — means walk away and call a real cab.

**Fake ride-share driver identity fraud.** A subtler variant: the driver *is* on a real platform (Uber, Lyft) but is using someone else's account. Person A passed the background check; Person B (who wouldn't) drives under Person A's credentials. The passenger's app shows Person A's photo, but Person B is behind the wheel. A verified badge with a rotating salt and photo hash makes account-sharing detectable — the photo doesn't match.

## Alone with a Stranger

**Fake real estate agent assault.** Criminals pose as estate agents to lure victims — often women — to vacant properties for robbery or assault. Documented cases in the USA, Canada, and Australia. The victim responds to a listing, meets the "agent" at an empty house, and is alone in an unfamiliar location with a stranger. Scanning an agent's credentials before entering the property — and sharing the verified identity with an emergency contact — changes the risk calculus entirely.

**Fake personal trainer in a private setting.** A client meets a "trainer" for a one-on-one session in a private gym, park, or home. The trainer claims certifications they don't have. Beyond the fraud (paying for unqualified instruction), the vulnerability is physical: the client is alone in a private space with someone whose identity and qualifications are unverified.

**Fake hotel staff room invasion.** Someone knocks on a hotel room door: "Maintenance — we need to check the fire alarm." The guest opens the door. The person is not hotel staff. Hotel impersonation theft is a recognised fraud pattern in the hospitality industry, targeting solo travellers and women travelling alone.

**Fake tour guide in an unfamiliar city.** A solo traveller — often a woman in an unfamiliar country — accepts a "tour" from someone claiming to be a licensed guide. The guide leads them to isolated locations, abandons them, steals their belongings, or worse. Licensed tourism authorities exist in most countries; a verified credential bound to the authority's domain would let the traveller check before departing.

## Exploiting Authority

**Fake police officer robbery.** A criminal impersonates a police officer during a traffic stop — especially on rural roads, at night, or using an unmarked vehicle. The victim complies because they believe they're interacting with law enforcement. Documented cases worldwide of robbery, assault, and kidnapping using this pretext. A citizen scanning an officer's credential and seeing a chain to `police.gov` or `met.police.uk` would confirm legitimacy. Absence of a verifiable credential is itself a red flag.

**Fake immigration officer extortion.** Criminals impersonate ICE or CBP officers to extort money from immigrants, threatening deportation unless "fines" are paid immediately. This targets immigrant communities, exploiting fear of enforcement to extract cash payments. The 100-mile US border zone (where CBP claims jurisdiction) covers roughly two-thirds of the US population. A verifiable federal credential bound to `cbp.gov` or `ice.gov` would let anyone confirm — or deny — an officer's identity.

**Fake parking enforcement cash scams.** Criminals pose as parking wardens in tourist areas and city centres, issuing fraudulent "on-the-spot fines" payable in cash. Tourists unfamiliar with local parking laws pay because the "warden" looks official. A badge that verifies against the local authority's parking domain would instantly distinguish real enforcement from fraud.

## Vulnerable Populations

**Unlicensed care worker elder abuse.** Fake home health aides exploit elderly patients — financial exploitation, physical abuse, and neglect. Elder fraud costs billions annually. The victim is often cognitively impaired and cannot verify credentials independently. A family member setting up pre-approved care provider domains (CQC-registered agencies whose credentials will show a government chain) creates a safety net: any unrecognised credential triggers an alert to the family.

**Unlicensed childcare provider endangerment.** A parent hires a nanny or babysitter through informal channels. The provider claims qualifications, DBS clearance, and first aid certification. None of it is verified. The parent leaves their child with a stranger whose credentials exist only as claims on a CV. A verified credential from an Ofsted-registered agency or an established childcare platform provides real assurance; absence of any verifiable credential is a clear warning.

## Regulatory Frameworks

These aren't hypothetical scenarios. Every jurisdiction has regulatory infrastructure designed to prevent them:

**UK:**
- TfL private hire licensing (Private Hire Vehicles (London) Act 1998)
- CQC care worker regulation (Health and Social Care Act 2008)
- Ofsted childcare registration (Childcare Act 2006)
- Competent Person Schemes for tradespeople (Building Regulations 2010)
- Police identification requirements (Police and Criminal Evidence Act 1984)
- Local authority inspector credentials (various licensing statutes)

**USA:**
- State professional licensing boards (nursing, childcare, real estate, trades)
- Background check requirements (Fair Credit Reporting Act)
- Law enforcement identification standards (department policies)
- Federal credentials (USPS, CBP, ICE — 100-mile border zone enforcement)
- Building code enforcement credentials (International Building Code adoption)

**EU:**
- Professional Qualifications Directive (2005/36/EC)
- Childcare regulations (member state level)
- Tourism licensing (member state level)
- Border agency credentials (Frontex, national border police)

The regulatory infrastructure exists. What's missing is a way for the person at the door, in the vehicle, or alone in a room to **verify in real time** that the credential is genuine and backed by the authority it claims. That's what Live Verify provides.

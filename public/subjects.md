# Verification Subjects: People, Things, and Both

Live Verify doesn't just verify claims about people. Roughly a third of all use cases have a **thing** as their primary subject — a vehicle, a building, a shipment, a product, a work of art, or a legal instrument. Another 8% are **mixed** — the claim is about a person *and* a thing together ("this person is insured for this vehicle").

The verification model is identical in every case. An issuer publishes a hash. A relying party GETs the hash. The subject — person, car, building, cargo container, patent — doesn't need to be present.

## The Three Subject Types

### Person-Subject (~59% of use cases)

The claim is about a specific human: their employment, credentials, identity, medical status, criminal record, insurance coverage, financial standing, or legal obligations.

**Examples:** proof of employment, professional licenses, prescriptions, pay stubs, credit reports, police clearance certificates, restraining orders, bail documents, disability certifications, immigration status.

**Key characteristic:** The person typically presents or sends the document themselves — but not always. A restraining order is verified by police at 3 AM when the petitioner is asleep. A pay stub is re-verified by a property management system months after the tenant submitted it. The person is the subject of the claim, not a required participant in verification.

### Thing-Subject (~33% of use cases)

The claim is about a non-person entity. No human needs to be the subject for the claim to be meaningful.

| Cluster | Count | Examples |
|---------|-------|---------|
| **Property / building / site** | ~33 | Deeds, home inspections, flood certificates, building safety postings, LEED certifications, food hygiene ratings, lead paint disclosures |
| **Shipment / cargo** | ~22 | Bills of lading, air waybills, customs certificates, warehouse receipts, dangerous goods declarations, cold chain records |
| **Product certifications** | ~16 | UL/CE safety marks, medical device certifications, material test reports, calibration certificates, SDS sheets, SBOM attestations |
| **Insurance on things** | ~15 | Marine cargo, satellite, aviation, fine art, builders risk, war risk, political risk, film completion bonds |
| **Agriculture / animals** | ~8 | Livestock health certificates, harvest records, soil tests, crop insurance, seed certification, pesticide logs |
| **IP / legal instruments** | ~7 | Patents, trademarks, copyrights, letters of credit, stock certificates, surety bonds |
| **Events** | ~5 | Election results, event permits, tournament standings, event cancellation insurance |
| **Environmental / energy** | ~5 | Carbon credits, renewable energy certificates, stormwater discharge permits, endangered species permits |
| **Vehicles** | ~4 | Vehicle titles, MOT/DOT inspections, vehicle display postings, total loss valuations |
| **Machines / devices** | ~2 | IoT sensor attestations, scientific instrument calibration |
| **Organizations** | ~5 | 501(c)(3) status, commercial registry filings, accreditation of institutions, charity ratings, merchant verification |
| **Artwork / creative works** | ~7 | Art appraisals, conservation reports, auction records, fine art insurance, photo licensing |
| **Construction projects** | ~7 | Site permits, concealed work witnessing, infrastructure witnessing, builders risk insurance |

**Key characteristic:** The thing can't present itself. A building doesn't walk into a meeting with its flood certificate. The document exists independently of any person — posted on a wall, filed in a data room, attached to a cargo manifest, stamped on a product. Verification happens when someone encounters the thing and wants to confirm a claim about it.

### Mixed — Person + Thing (~8% of use cases)

The claim is about a person's relationship to a thing: ownership, coverage, authorization, responsibility.

**Examples:**
- "This person is insured for this vehicle" — additional driver endorsements, named driver certificates
- "This person owns this property" — deeds, title insurance
- "This person is authorized for this project" — certificates of insurance for contractors, builders risk
- "This patient has this implant" — medical device implant cards
- "This person holds this ticket for this event" — event ticketing
- "This buyer and seller traded this item" — peer-to-peer sale witnessing

**Key characteristic:** Neither the person nor the thing alone is sufficient — the claim is about the *relationship* between them. Verifying the claim confirms the binding: yes, this driver is covered on this policy; yes, this contractor is insured for this project.

## Verification Participants

The subject type doesn't change how verification works, but it does affect who participates.

### The Subject (Person-A or Thing-A)

The entity the claim is about. May or may not be present at verification.

| Subject present | Subject absent | Example |
|----------------|----------------|---------|
| Employee shows pay stub to landlord | Landlord's system re-verifies monthly | Pay stub |
| Homeowner shows flood certificate to buyer | Buyer's lender re-verifies at closing | Flood certificate |
| Car seller hands title to buyer in a parking lot | Lender verifies title remotely before financing | Vehicle title |
| Doctor shows credentials to hospital | Hospital's credentialing system re-verifies quarterly | Medical license |
| — | Food hygiene rating posted on restaurant wall; anyone walks in and scans it | Food hygiene posting |
| — | Product safety certification printed on packaging; consumer scans in a shop | UL/CE mark |
| — | Disabled parking placard on dashboard; enforcement officer scans it | Parking permit |

The bottom three have no "presenting" moment at all. The document is permanently displayed. Verification is initiated entirely by the relying party.

### The Relying Party (Person-B)

The entity making a decision based on the claim. May be a human or software. May verify once or repeatedly.

| First verification | Subsequent verifications | Example |
|-------------------|------------------------|---------|
| Landlord scans pay stub | Property management software re-verifies monthly | Rental application |
| Immigration officer scans police clearance | Immigration system re-verifies during processing | Visa application |
| Buyer scans vehicle title in parking lot | — (one-time transaction) | Private car sale |
| Front desk scans insurance card | Hospital billing system re-verifies before procedure | Healthcare visit |
| — | Bank's overnight batch re-verifies all active COIs | Certificate of insurance |
| — | Employer payroll system re-verifies garnishment order quarterly | Child support order |

**Person-B is often not a person.** It's a payroll system processing a garnishment. A bank's KYC pipeline. An immigration system batch-processing applications overnight. A compliance engine re-verifying certificates of insurance across a portfolio of contractors. The human made the initial decision to trust; the software maintains that trust over time.

**Person-B may be an organization, not an individual.** "The bank" verifies a credit report. "The court" verifies a restraining order. "HMRC" verifies a tax residency certificate. The organization is the relying party; the specific human who presses the button is incidental.

## The Document Stands Alone

The unifying principle across all three subject types: **the document is the claim, not the person.** The hash is the credential. The domain is the authority. The subject — human, car, building, shipment — is secondary to the verification act.

This means:
- A vehicle title is verifiable whether the owner is present or not
- A building's safety posting is verifiable by anyone who walks past it
- A pay stub is verifiable by software at 3 AM with no humans involved
- A cargo manifest is verifiable at every port it passes through, by different parties, in different countries
- A restraining order is verifiable by any law enforcement officer in any state, years after it was issued

The issuer published a hash. The hash is looked up. The status comes back. That's the entire model — regardless of what the claim is about.

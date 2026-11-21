---
title: "Support Letters"
category: "Professional & Educational Qualifications"
volume: "Large"
retention: "5-10 years (the life of the application and any later review)"
slug: "support-letters"
verificationMode: "clip"
tags: ["support-letter", "recommendation-letter", "letter-of-support", "expert-letter", "character-reference", "immigration", "national-interest-waiver", "grant-application", "first-hand-knowledge"]
furtherDerivations: 0
---

## What is a Support Letter?

A support letter is one person's statement, in their own name, about another person or their work, written for someone who has a decision to make: an immigration officer, a grant panel, an awards committee, a tenure board, a court. It differs from an employment reference in that the author usually has no records to rely on. Its whole value is that a named person, who knows something at first hand, is willing to say so.

That is also its weakness. The decision-maker receives a stack of letters and has no practical way to tell which authors know what they describe, which signed a draft someone else wrote, and which are repeating what the applicant told them.

<div style="max-width: 620px; margin: 24px auto; font-family: Georgia, 'Times New Roman', serif; border: 1px solid #bbb; background: #fff; padding: 32px 36px; box-shadow: 0 2px 6px rgba(0,0,0,0.08);">
  <div style="font-size: 0.95em; line-height: 1.65; color: #222;">
    <span verifiable-text="start" data-for="support"></span>Letter in support of Dr. Anneke Voss<br>
    From: Prof. Tobias Lindqvist, Department of Hydrology, Halden Technical University<br>
    Date: 14 September 2026<br><br>
    Basis of my knowledge<br>
    I supervised Dr. Voss's doctoral research from 2019 to 2023 and have co-authored four papers with her. Everything in this letter is from my own direct knowledge unless I say otherwise.<br><br>
    What I can attest to<br>
    Dr. Voss designed and built the sediment-transport model described in our 2022 paper. The design was hers. I reviewed it and did not contribute to it.<br>
    The model has been used in my own group's teaching and research since 2023.<br><br>
    What I cannot attest to<br>
    I am told the model has been adopted by two national water agencies. I have no direct knowledge of this and do not vouch for it.<br><br>
    Drafting<br>
    I wrote this letter myself. I was asked for it by Dr. Voss's legal representatives.<br><br>
    <span data-verify-line="support"
      title="Demo only: no university offers verification endpoints for staff letters, so this is illustrative">verify:halden-tu.example/staff/lindqvist/letters</span> <span verifiable-text="end" data-for="support"></span>
  </div>
</div>

## The Problem: Vouching Without Knowing

A decision-maker reading support letters is weighing testimony, and testimony is only worth what the witness actually knows. Several things undermine that today, and none of them is visible on the page.

- **Second-hand vouching:** The author is asked to state, as if from their own knowledge, something they have only been told by the applicant or the applicant's advisers. This is not a legitimate kind of support letter. It is a first-hand letter in appearance only.
- **Ghost-drafted letters:** The letter is written by the applicant or their advisers and signed by someone who changed little or nothing. The signature is real; the testimony is not the signer's.
- **Strangers as referees:** A person with a suitable title is approached cold and asked to sign in support of someone they have never met or worked with.
- **Edits after signing:** A sentence is strengthened, or a caveat removed, between the author approving the text and the letter being filed.
- **Fabricated or inflated authors:** A letter is attributed to someone who never wrote it, or the author's standing is overstated.
- **Volume in place of substance:** Where letters are counted more readily than they are checked, the incentive is to collect many, not good ones.

## What Is Checked

The full visible text of the letter, including four parts that a verifiable support letter always carries:

- **Basis of knowledge:** how the author knows the subject, in what capacity, and over what period.
- **What the author attests to:** each statement the author makes from direct knowledge.
- **What the author does not attest to:** anything the author has been told but does not know. If the letter mentions such a claim at all, it says so plainly and does not vouch for it.
- **Drafting:** who wrote the letter, and who asked for it.

Because all four are inside the hashed text, none can be removed or reworded after the author publishes the hash. A caveat that has been deleted, or a "cannot attest" turned into a "can", fails to verify.

A claim the author cannot vouch for should be supported at its own source, not by the letter. In the example above, a water agency that had adopted the model could say so on its own domain, with its own `verify:` line, and the application would cite that. A support letter is not a way to launder someone else's claim into testimony.

## What the Checker Sees

The issuer domain (the author's institution, or the author's own domain) and the current status of the letter.

**Status Indications:**
- **Verified** — The author stands behind this exact text.
- **Recanted** — The author has withdrawn the letter entirely.
- **Restricted** — The author has withdrawn part of it, with a stated reason (for example, a statement later found to be wrong).
- **Not found** — This domain does not stand behind this text. The letter may have been altered, or never issued.

## Who Holds It

The **subject of the letter**, and anyone preparing an application on their behalf.

- **A letter that carries its own proof:** the subject can file it knowing the decision-maker can confirm who wrote it and that it is unaltered.
- **Protection against their own advisers:** the subject can see that what was filed is what the author approved.

The **author** also keeps a copy, and benefits directly:

- **Protection against misuse:** a letter with their name on it that they did not write, or that has been changed, does not verify.
- **A way to withdraw:** if the author later learns something in the letter was untrue, they can recant or restrict it, and a later check shows that.
- **A reason to decline:** an author asked to vouch for what they do not know can point to the "basis of knowledge" section as something they cannot honestly complete.

## Who Checks It

**Immigration adjudicators**
- **Expert and recommendation letters in petitions:** confirming that each letter comes from its named author, unaltered, and reading what the author says about how they know the applicant.

**Grant panels and funding bodies**
- **Letters of support and collaboration:** confirming that a named partner has in fact committed to what the application says.

**Awards, fellowship and tenure committees**
- **Nomination and reference letters:** confirming authorship and that the text is as the referee wrote it.

**Courts and tribunals**
- **Character references:** confirming who wrote the reference and in what capacity they know the person.

## Immigration Support Letters

Petitions that turn on a person's ability or the importance of their work, such as the US EB-2 national interest waiver, commonly include letters from people in the applicant's field. <!-- TODO(verify): how US adjudication guidance describes the weight given to expert and recommendation letters in EB-2 NIW and similar petitions, and whether it distinguishes authors with first-hand knowledge --> They are a sub-category of support letter with pressures of their own:

- The applicant's legal representatives usually coordinate the letters and often supply a draft.
- Authors are sometimes approached who have no prior connection to the applicant, because independence from the applicant is thought to carry weight.
- The adjudicator has many petitions to decide and little means of testing any one letter.

An author with no prior connection can still write a legitimate letter, limited to what they can assess at first hand: published work they have read, software they have used, results they have reproduced. The "basis of knowledge" section then says exactly that. What they cannot legitimately do is restate the applicant's claims about adoption, impact or commercial use as though they knew them to be true.

No immigration authority accepts or checks verifiable support letters today.

## Who Issues It

**Issuer Types** (First Party)

- **The author's institution.** A university, employer or professional body publishes the hash under a path for that member of staff, which also shows that the author holds the position they claim.
- **The author personally.** An author with their own domain publishes the hash there. The checker then judges what that domain is worth, as with any [peer reference](../../docs/peer-reference-workflow.md).

**Privacy Salt:** Advisable. A support letter names a private individual and describes their career, so the text carries a salt and the hash alone is published.

**What this does not establish:** that the author's statements are true, or that the author is the expert the letter implies. It establishes who said it, that the wording is theirs and unchanged, what they say about how they know, and whether they still stand behind it.

## Authority Chain

**Pattern:** Commercial or Personal

Where the author's institution issues the letter, the chain runs through the institution:

```
✓ halden-tu.example/staff/lindqvist/letters — Letters issued by a named member of academic staff
  ✓ halden-tu.example — The university
```

Where the author issues it personally:

```
✓ lindqvist.example/letters — Letters issued by the author
```

Personal issuer — individual attestation, no regulatory chain.

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Where Each Fits: Live Verify and Signed Letters

Support letters today are signed, on letterhead where the author has one, and sometimes notarised or accompanied by the author's CV. These do real work and nothing here replaces them: a signature commits the author, and a decision-maker who doubts a letter can write to its author. Live Verify adds a check that needs no correspondence.

| | Signed letter on letterhead | Notarised letter | Live Verify on the letter |
| :--- | :--- | :--- | :--- |
| **Who can check** | Anyone willing to contact the author and wait for a reply. | Anyone who can confirm the notary's commission. | Anyone handed the letter. |
| **What the checker gets** | The author's confirmation, if they answer. | Confirmation that the named person signed in front of a notary. Nothing about the wording's accuracy or who drafted it. | Confirmation that the author's institution or own domain stands behind this exact text, including its statement of what the author does and does not know at first hand. |
| **What the holder shares** | The letter. | The letter. | The letter. |
| **Reach** | Wherever the author can be reached. | Varies by country; notarial practice and recognition differ widely, and some countries have no close equivalent. | Global in principle: any author or institution, in any country, that publishes hashes on its own domain. |
| **Speed and cost** | Days or weeks; free apart from the time. | A fee and an appointment for the author. | A few seconds per check: one web lookup, with no fee to the standard. |
| **What it needs** | An author who replies. | A notary, and the author present. | The author or their institution to publish hashes, and Live Verify-aware software on the checker's device. No institution does this for staff letters yet. |
| **If the author changes their mind** | They must write to everyone who holds the letter. | The same. | They recant or restrict, and the next check shows it. |
| **Best suited to** | Low volumes, where the decision-maker has time to follow up. | Jurisdictions and procedures that require it. | High volumes of letters from many countries, where nobody has time to write to each author. |

**Where each fits:** a signature, and a notary where one is required, remain the formal acts that commit the author. Live Verify does not replace either, and it does not make a letter true. What it changes is that a decision-maker with a stack of letters from several countries can confirm in seconds who wrote each one, that the wording is the author's, and what the author says about the limits of their own knowledge.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).

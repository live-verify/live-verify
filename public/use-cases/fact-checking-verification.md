---
title: "Fact-Checking Verification and Sources"
category: "Art, Media & Publishing"
volume: "Very Small"
retention: "3-10 years (journalistic integrity)"
slug: "fact-checking-verification"
verificationMode: "clip"
tags: ["fact-checking", "journalism", "misinformation", "trust-in-media", "news-integrity", "source-verification", "editorial-standards"]
furtherDerivations: 1
---

## What is a Verified Fact-Check?

In the era of "Fake News" and AI-generated text, it is trivial to create a realistic-looking news article or quote from a politician that is 100% false.

A Verified Fact-Check adds a cryptographic anchor to a news story.

It allows a reader to scan the text and see a green "VERIFIED" status from an independent watchdog (like Snopes or PolitiFact). More importantly, it stops the "Archival Erasure" problem: a newspaper cannot "Silently Edit" its old articles to change history if the original text is already hashed and verified on an external domain.

<div style="max-width: 600px; margin: 24px auto; font-family: 'Times New Roman', Georgia, serif; border: 1px solid #ccc; background: #fffef8; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <div style="background: #1a1a2e; color: white; padding: 15px 20px; text-align: center;">
    <div style="font-size: 2.2em; font-weight: bold; letter-spacing: 3px;"><span verifiable-text="start" data-for="fact"></span>THE DAILY LEDGER</div>
    <div style="font-size: 0.85em; margin-top: 4px; opacity: 0.8;">FAIRPORT • TRUTH, JUSTICE, AND VERIFIED FACTS</div>
  </div>
  <div style="padding: 25px;">
    <h2 style="font-size: 1.6em; margin: 0 0 10px 0; line-height: 1.2; color: #1a1a2e;">Northbridge Tower Fire: 47 Rescued, No Casualties</h2>
    <div style="font-size: 0.9em; color: #666; margin-bottom: 16px;">
      By <strong>Lois Lane</strong> | Metro Desk | March 15, 2026
    </div>
    <div style="font-size: 1em; line-height: 1.6; color: #333; text-align: justify;">
      <p>A fire broke out on the 38th floor of Northbridge Tower yesterday evening, prompting the evacuation of 47 employees. Fairport Fire Department responded within 4 minutes of the initial alarm.</p>
      <p>"All personnel were evacuated safely," said Fire Chief Marcus Stone. "The sprinkler system contained the blaze until our units arrived."</p>
    </div>
<div style="margin-top: 25px; padding: 10px; border: 1px solid #1a1a2e; background: #f0f0f5; font-size: 0.8em; color: #1a1a2e; font-style: italic; text-align: center;">
      This article has been independently fact-checked for accuracy. Select the text to verify sources and integrity.
    </div>
<div data-verify-line="fact" style="border-top: 1px dashed #999; margin-top: 20px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
      title="Demo only: Fact-checker network doesn't yet offer verification&#10;endpoints, so this is illustrative">
      <span data-verify-line="fact">verify:fctchkrs.org/d-planet/v</span> <span verifiable-text="end" data-for="fact"></span>
    </div>
  </div>
</div>

## The Problem: Memory Hole Fraud

- **Silent Editing:** A publication quietly changing a quote or a number in an old article after a scandal breaks, to pretend they "were right all along."
- **Screenshot Forgery:** Scammers creating fake news "Screenshots" that look like they come from the NY Times or Daily Ledger to manipulate stock prices or elections.
- **Deepfake Quotes:** Attributing fabricated statements to real public figures using realistic-looking web templates.

## What Is Checked

Full published text (digest), author name, date of publication, fact-checker organization, list of verified sources (anonymized or linked), presence of corrections/retractions, primary source timestamps.

**Document Types:**
- **Verified News Article:** The "Persistent Truth" version of a story.
- **Academic Citation Extract:** Proving a quote matches the original paper.
- **Political Statement Audit:** Independent review of campaign claims.
- **Corporate Disclosure:** Proving earnings data matches the auditor's review.

## What the Checker Sees

Shows the issuer domain (the independent Fact-Checking Org) and the current story status.

**Status Indications:**
- **Verified** — The text matches the version reviewed by the fact-checker.
- **Correction Active** — A factual error was found; click for the updated version.
- **Disputed** — Conflict between sources; review the "Discussion" page.
- **Retracted** — The publication has withdrawn this story due to integrity failure.

## Who Holds It

The News Organization / Journalist benefits from verification.

**Defamation Defense:** Proving in court that the paper performed a verified, timestamped fact-check *before* publication. This demonstrates "Good Faith" and absence of "Actual Malice," which is the primary defense in high-stakes libel lawsuits.

**Brand Trust:** Displaying the "Verified by Snopes/IFCN" badge on a controversial investigation to reassure readers that the claims aren't "Fake News."

## Who Checks It

**Social Media Platforms (X / Meta)**
**Algorithmic Trust:** Platforms can use the verification hash to prioritize "Verified Facts" in the feed, reducing the reach of unverified or altered screenshots of news stories.

**Historians / Researchers**
**Archival Integrity:** Ensuring that a digitized article from 20 years ago hasn't been "Silently Edited" to change political history (e.g., the "Orwellian" disappearance of inconvenient facts).

**Legal Teams**
**Discovery Proof:** Verifying that a published statement used as evidence in a trial matches the exact text at the time of publication.

## Who Issues It

**Issuer Types** (First Party)

**Independent Fact-Checkers:** (Snopes, PolitiFact, Full Fact).
**Global Media Outlets.**
**Academic Integrity Boards.**

**Privacy Salt:** Critical for "Anonymous Source" protection. The hash must be salted to ensure that searching for a source doesn't inadvertently reveal their identity through pattern matching.

## Authority Chain

**Pattern:** Commercial

Fact-checking organizations and editorial outlets issue fact-check verdicts and corrections. Self-authorized by their journalistic standards and editorial independence.

```
✓ factcheck.reuters.com/verify — Issues fact-checking verdicts and editorial corrections
```

Commercial issuer — self-authorized. Trust rests on the issuer's domain reputation.

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Where Each Fits: Live Verify, Community Notes and Provenance Ledgers

Community Notes, on X, lets contributors attach context to posts, shown once raters with differing views agree it is helpful. Content-provenance ledgers, such as Numbers Protocol, record where a piece of media came from on a blockchain. Neither competes with Live Verify: each answers a different question, and they work side by side.

| | Community Notes | Provenance ledger | Live Verify on the fact-check |
| :--- | :--- | :--- | :--- |
| **Question it answers** | Do contributors from different viewpoints think this post needs context? | Where and when was this media first registered? | Did this fact-checking organisation publish exactly this text? |
| **Who can check** | Anyone reading the post on that platform. | Anyone using that network's tools. | Anyone shown the fact-check, as a screenshot, quote or printout. |
| **What the checker gets** | A note alongside the post, written by the crowd. | A registration record for the media. | Confirmation that the named organisation stands behind this exact text, as at its date, and whether it has since been withdrawn. It says nothing about whether the verdict is right. |
| **Reach** | One platform. | Media registered on that ledger. | Global in principle: any publisher or fact-checker, in any country, that publishes hashes on its own domain. |
| **Speed and cost** | Free to readers; a note can take hours or days to appear. | Varies with the network. | A few seconds per check: one web lookup, with no fee to the standard. |
| **What it needs** | Enough contributors and raters to reach agreement. | The media to be registered, and the network's tools to read it. | The fact-checker to publish hashes, and Live Verify-aware software on the reader's device. No fact-checker does this yet. |
| **Best suited to** | Adding context to a viral post where people are reading it. | Tracing the origin of photos and video. | Showing that a quoted or screenshotted fact-check is genuine, and that the publisher has not silently changed it. |

**Where each fits:** Community Notes adds context from many contributors, directly where a post is being read, and that is something a published fact-check cannot do. Content-provenance ledgers likewise answer a separate question about where a piece of media originated. Live Verify addresses a narrower point: a reader who meets a quoted or screenshotted fact-check can confirm that the named organisation published exactly that text. It says nothing about whether the verdict is right, and it sits comfortably beside crowd notes and provenance tools.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).

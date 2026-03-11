# Peer Reference Workflow

## Overview

A peer reference in Live Verify is a verified attestation from one person about another, hosted on the attestor's domain. The attestor's domain is their identity — `martinfowler.com/refs` carries weight because Martin Fowler controls `martinfowler.com`.

The challenge: how does the attestation get created? The attestor is busy. They're not going to set up infrastructure, write prose unprompted, or learn a new protocol. The workflow needs to be something they already know.

**The answer: a GitHub Pull Request.**

The subject (the person being referenced) opens a PR into the attestor's repo. The attestor reviews and merges — or doesn't. The merge is the attestation. GitHub's existing infrastructure handles identity, review, audit trail, and deployment.

## Prerequisites

The attestor (Martin Fowler in this example) has:

- A GitHub repo (e.g., `martinfowler/refs`) deployed to GitHub Pages at `refs.martinfowler.com`
- A GPG public key published in the repo as `public-key.asc`
- A `verification-meta.json` on his main site at `martinfowler.com/refs/verification-meta.json` that delegates hash lookups to the GitHub Pages subdomain:

```json
{
  "formalName": "Martin Fowler",
  "description": "Peer references",
  "url": "https://martinfowler.com",
  "verifyEndpoint": "https://refs.martinfowler.com"
}
```

The `verify:` anywhere else I use it references `martinfowler.com/refs` — the authoritative path on Martin's main domain. A renderer fetches `verification-meta.json` from there, discovers the `verifyEndpoint` delegation, and sends hash lookups to `refs.martinfowler.com/{hash}`.

## Worked Example

Paul Hammant wants Martin Fowler to attest:

> Martin cites Paul J Hammant's expertise on
> trunk-based development from time to time.

1. Paul Clones Martin's refs repo
2. Paul takes the bulk of the drafting work here
* types up the appropriate claim martin might agree with
* Generates the SHA256 for
* saves the SHA256 with it's `{status:verified}` payload into the repo
* Uses Martin's declared GPG to make a file with the same hash prefix but with a .claim.gpg suffix 
* git-add's both
* git-commits that with a minimal commit message "I humbly ask you to verify a claim about me - a peer reference"
* makes a PR with the same minimal message.
3. Martin decides whether to put his name behind it, needing his GPG private key to read the plain text 
and deciding it was appropriate (no over claimed, was respectful, right tone, etc).  Decide in favor is merge of PR. Decide against somehow, could be an email back to me, or something approriate (and non embarassing) in the PR comments.

Maybe there's an editor tool that makes all that easy for Paul. And the same tool can be uses for review for Martin. Maybe as a Chrome-extension so he can do it all in the GitHub web experience.

### Paul's steps (the subject does the work)

```bash
# 1. Fork and clone
gh repo fork martinfowler/refs --clone
cd refs

# 2. Import Martin's public GPG key
gpg --import public-key.asc

# 3. Write the claim text
cat > claim.txt << 'EOF'
Paul J Hammant
Martin cites Paul J Hammant's expertise on
trunk-based development from time to time.
EOF

# 4. Normalise and hash
HASH=$(node -e "
  const {normalizeText, sha256} = require('./normalize.js');
  const fs = require('fs');
  const text = fs.readFileSync('claim.txt', 'utf8');
  console.log(sha256(normalizeText(text)));
")

# 5. Create the verification endpoint
mkdir -p $HASH
echo '{"status":"verified"}' > $HASH/index.html

# 6. Encrypt the plaintext with Martin's public key
gpg --encrypt --recipient martin@martinfowler.com \
    --output $HASH.claim.gpg claim.txt

# 7. Delete the plaintext — it must not appear in the commit
rm claim.txt

# 8. Commit and PR
git checkout -b ref/paul-hammant
git add $HASH/index.html $HASH.claim.gpg
git commit -m "I humbly ask you to verify a claim about me - a peer reference"
git push origin ref/paul-hammant

gh pr create \
  --title "I humbly ask you to verify a claim about me - a peer reference" \
  --body "Encrypted with your public key."
```

The PR says nothing about what the claim contains. The commit message says nothing. The plaintext never appears in the GitHub UI — it's only in the `.claim.gpg` blob, readable only by Martin.

**Why the humble, minimal message matters:** PR descriptions are public. If the subject writes an inflated description — "Please verify that I'm the world's foremost expert on X" — that's visible in the repo's PR history forever, even if Martin closes it. A minimal message protects both parties: if Martin declines, there's nothing embarrassing on record for either side. The encrypted `.claim.gpg` is where the actual claim lives, visible only to Martin. Keep the public surface humble; put the substance in the encryption.

### Martin's steps (the attestor reviews)

Martin receives the PR notification. He decrypts locally to read what Paul is asking him to attest:

```bash
gh pr checkout 42
gpg --decrypt a1b2c3d4...f0.claim.gpg
```

He reads the plaintext and decides: is this appropriate? Not over-claimed? Respectful? Right tone?

- **Merge** — he's happy with the words. GitHub Pages deploys the hash endpoint. The reference is live.
- **Request changes** — he'd prefer different wording. He can email Paul, or comment on the PR without quoting the plaintext. Paul updates the text, re-hashes, re-encrypts, force-pushes.
- **Close** — he doesn't want to attest this. No explanation needed — or a brief, non-embarrassing note in the PR comments.

**Martin's merge is the attestation.** His GitHub identity is the provenance. The Git history records when he approved it.

### The reference in Paul's `.vcv`

```
[section: references]

Paul J Hammant
Martin cites Paul J Hammant's expertise on
trunk-based development from time to time.
verify:martinfowler.com/refs
```

A renderer fetches `martinfowler.com/refs/verification-meta.json`, discovers the `verifyEndpoint` delegation to `refs.martinfowler.com`, normalises the text, hashes it, hits `https://refs.martinfowler.com/{hash}`, gets `200 OK` with `{"status":"verified"}`, and displays a green tick with "Martin Fowler" next to it.

## Why GPG

The encrypted `.claim.gpg` file serves one purpose: Martin's private record of what he attested. In three years, when he has dozens of references in his repo, he can decrypt any `.claim.gpg` file to remind himself what he said about whom.

**Why not just store the plaintext?** Because the reference text contains the subject's name and the attestation content. Making that public in a Git repo means scrapers, search engines, and anyone browsing the repo can read every reference Martin has ever given. The hash is public (it has to be, for verification). The content is private — only the subject (who wrote the PR) and the attestor (who can decrypt) know what it says.

**Why GPG specifically:**

- Asymmetric encryption of small text blobs is exactly what GPG was built for.
- Developers already have GPG keys (GitHub commit signing, package signing).
- GPG supports multiple recipients if both parties want to retain decrypt access.
- The alternative (age) is simpler but less widely adopted in the developer community.

**Why encrypt with Martin's key, not Paul's?** Paul already knows the plaintext — he wrote the PR. Martin needs the private record because he's the attestor with dozens of references to track. If Paul also wants decrypt access, the GPG command adds a second recipient:

```bash
gpg --encrypt \
    --recipient martin@martinfowler.com \
    --recipient paul@pauljhammant.dev \
    --output $HASH.claim.gpg claim.txt
```

## Why Pull Requests

**Identity:** Martin's GitHub account is his identity. A merged PR from `martinfowler` is as strong an identity signal as the domain `martinfowler.com` itself — in practice, stronger, because GitHub accounts have 2FA, SSH keys, and audit logs.

**Review workflow:** Developers already review PRs daily. There's no new tool, no new account, no new protocol. The cognitive overhead is near zero.

**Audit trail:** The PR captures who opened it, when, what was discussed (without revealing the reference content), and when it was merged. This is a complete provenance chain.

**Anti-spam:** GitHub's existing protections — account age, contribution history, rate limits, repo settings to restrict PRs from first-time contributors — handle unsolicited or spam reference requests. Martin can also set branch protection rules requiring his explicit approval.

**Deployment:** GitHub Pages deploys on merge to `refs.martinfowler.com`. The hash endpoint goes live automatically. No manual deployment step.

## Repo Structure

The repo deploys to `refs.martinfowler.com` via GitHub Pages. Hash directories sit at the repo root so they resolve to `refs.martinfowler.com/{hash}`:

```
martinfowler/refs/          (GitHub repo, deployed to refs.martinfowler.com)
├── CNAME                   # refs.martinfowler.com
├── public-key.asc          # Martin's GPG public key
├── normalize.js            # Normalization script (or npm dependency)
├── a1b2c3d4...f0/
│   └── index.html              # {"status":"verified"}
├── a1b2c3d4...f0.claim.gpg     # Encrypted plaintext (Martin can decrypt)
├── e5f6a7b8...d2/
│   └── index.html
├── e5f6a7b8...d2.claim.gpg
└── ...
```

GitHub Pages serves `{hash}/index.html` at `https://refs.martinfowler.com/{hash}` (GitHub's 302 redirect handles the bare path).

Note: `verification-meta.json` is **not** in this repo — it lives on Martin's main site at `martinfowler.com/refs/verification-meta.json`, where it provides his formal name and delegates hash lookups to `refs.martinfowler.com`. No `hashSuffix` is needed — GitHub Pages serves bare hash paths via its directory index convention.

## Revoking a Reference

Martin changes his mind, or the subject's conduct warrants withdrawal. Martin updates the endpoint:

```json
{"status":"revoked"}
```

The hash still resolves (200 OK), but the status is `revoked`. Any `.vcv` renderer checking this endpoint shows a revocation indicator instead of a green tick. The `.claim.gpg` file stays — Martin may need it for records. The Git history shows when and why the revocation happened.

## Relationship to `.vcv`

The `.vcv` format doesn't care how the verification endpoint was created. It only cares that `verify:martinfowler.com/refs` resolves to a hash endpoint that returns a status. The PR workflow is one way to populate that endpoint — the simplest way for developers, because it uses tools they already have.

Non-developers won't use this workflow. A SaaS verification provider (see [SAAS-VERIFICATION-PROVIDERS.md](SAAS-VERIFICATION-PROVIDERS.md)) would offer a web UI for the same flow: "Write a reference, encrypt, submit for approval." The underlying mechanics are identical — the UX is different.

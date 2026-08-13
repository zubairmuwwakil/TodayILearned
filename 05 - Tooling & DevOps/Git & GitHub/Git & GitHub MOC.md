---
type: moc
topic: git
aliases:
  - Git MOC
  - Git & GitHub MOC
  - Git Map
  - GitHub MOC
tags:
  - git
  - github
  - tooling
  - moc
---

# Git & GitHub MOC

> [!info] What this map is for
> This folder mixes two different *kinds* of note, and reviewing them the same way is a mistake. One is **discipline you reason about** (when to branch, what is safe to rewrite); the rest are **recipes you look up** (the exact commands to sync a fork). This map separates them and holds **links only** — every fact still lives in exactly one note.

## The mental model

Git tracks three places, and almost every confusing Git moment is really the question **"which of the three did that command move?"**

**Working tree** (your files) → **index / staging area** (what the next commit will contain) → **repository** (committed history) → and separately, **the remote**.

Read the folder through that lens:

- `add` moves working tree → index. `commit` moves index → repository. `push` moves repository → remote.
- `reset` is the *only* command that moves the pointer backwards, and its three flags differ **solely** in how many of the three they touch — `--soft` one, `--mixed` two, `--hard` all three (and only `--hard` destroys work).
- `fetch` updates your *view* of the remote and touches **no** local branch. `pull` is `fetch` + integrate, which is why `pull` can conflict and `fetch` never can.
- `.gitignore` only governs the **untracked** set — it has no opinion about a file already committed.

**The through-line: Git rarely deletes your work, but it will happily hide it.** Reflog remembers what reset forgot. The genuinely destructive operations are a short list — `--hard`, force-push, and rewriting anything already shared — and knowing that list is most of what makes Git feel safe.

## Concepts — reason about these

- [[Git Project Workflow]] — branching, pull requests, review, and the team discipline around merging

## Recipes — look these up, don't memorise

These are *doing* notes. Per the boundary in [[AI Operating Manual (READ ME)]], command sequences live where they're used; don't graduate them into concept notes.

- [[Setting Up New Proj]] — `init` → first commit → `remote add` → `push -u`, both directions (local-first and clone-first)
- [[Forked Branches]] — adding an `upstream` remote and the fetch/checkout/merge/push sync routine
- [[Git Helpful Reminders]] — `.gitignore` patterns, including the "already tracked" trap

## Where this connects outward

- [[Continuous Integration and Continuous Delivery]] — what happens *after* the push; Git is where code lives, CI/CD is what runs when it moves
- [[GitHub Actions]] — the workflow file that reacts to a push to `main`
- [[Apache Maven]] — what the pipeline actually builds

## Backlog — not yet graduated

Deliberate calls, not oversights:

- **`reset --soft/--mixed/--hard`** — the single highest-value unwritten note in this folder. It's on the domain checklist, it's summarised in the mental model above, and it has **no note that owns it**. Write this one next.
- **merge vs rebase** — partially covered inside [[Git Project Workflow]]; promote to its own note if it keeps coming up
- **reflog / recovering lost commits** — the reason "Git doesn't delete your work" is true; currently undocumented
- Forward-links awaiting notes: `Git Reset Modes` · `Merge vs Rebase` · `Git Reflog` · `Detached HEAD`

## Interleave check (mix these, don't study in a block)

Answer without peeking, then open the note that owns each one:

1. You ran `git reset --hard HEAD~1` and lost an hour of work. Is it actually gone? What would you reach for?
2. You added `target/` to `.gitignore` and it *still* shows up in `git status`. Why — and what's the fix?
3. `git fetch` then `git status` says you're "behind by 3 commits," but your files haven't changed. Explain both halves.
4. Which of these are safe on a branch a teammate has already pulled: `commit --amend`, `merge`, `rebase`, `push --force`?
5. You committed to `main` when you meant to branch. Which reset flag gets you back to a clean `main` while *keeping* the changes staged?
6. What's the difference between `origin` and `upstream`, and which one does a fork push to?
7. A pull request shows changes you never made. What most likely happened before you branched?

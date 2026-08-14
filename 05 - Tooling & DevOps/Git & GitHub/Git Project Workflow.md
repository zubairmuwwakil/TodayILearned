---
type: concept
topic: git
status: learning
difficulty: medium
aliases:
  - Git Project Workflow
  - GitHub Project Workflow
  - Feature Branch Workflow
  - Team Git Workflow
  - Pull Request Workflow
  - Branching Strategy
tags:
  - git
  - github
  - workflow
  - collaboration
  - concepts
---

# Git Project Workflow

%% Graduated via [[Refiner Spec (Graduate)]] using Git & GitHub/_refiner.md. Test surface, not a reference — answer each prompt from memory BEFORE revealing. The solo-git recipes live in [[Setting Up New Proj]] and [[Git Helpful Reminders]]; this note is the TEAM discipline. %%

## Worked Example

One feature, start to merge — the whole loop:

```bash
# 1. START CLEAN — never branch from a stale main
git checkout main
git pull origin main

# 2. BRANCH — descriptive, owner-prefixed, one branch per feature
git checkout -b zub-setup-weatherapp-project

# 3. WORK, then commit in units that say what you did
git add .
git commit -m "Add WeatherApp Spring Boot project skeleton"

# 4. RE-SYNC BEFORE PUBLISHING — surfaces conflicts on YOUR machine
git pull origin main

# 5. PUBLISH — -u sets upstream, so later pushes are a bare `git push`
git push -u origin zub-setup-weatherapp-project

# 6. REVIEW — open a PR on GitHub, add 2 reviewers (one is the team lead),
#    the LEAD merges it into main. You never merge your own.
```

**Explain in plain English (EiPE):** `main` is never written to directly — every change takes a detour through a branch and a human review, so the shared branch is always in a state someone would be willing to deploy.

## Retrieval Prompts

1. "No one pushes to `main`" sounds like etiquette. What does it actually *buy* you technically?
> [!answer]- reveal
> `main` stays **continuously deployable**, and every change is forced through a gate where **tests (CI) and human review** run *before* it becomes shared history. It also means nobody ever has to rewrite shared history to undo a bad direct push.

2. Step 4 pulls *before* pushing. Name the two distinct things that go wrong if you skip it.
> [!answer]- reveal
> (a) Your `git push` is **rejected as non-fast-forward** if the remote moved since you branched. (b) Any conflict then surfaces **at merge/PR time, on the reviewer's plate**, instead of locally on yours where you have the context to resolve it.

3. `git fetch` vs `git pull` — which one can change the files in your working tree, and why does that distinction matter here?
> [!answer]- reveal
> **`fetch` changes nothing local** — it only updates remote-tracking refs (`origin/main`), so it's always safe. **`pull` = `fetch` + integrate** into your current branch, which *can* rewrite your working tree and raise conflicts. Use `fetch` to look, `pull` to commit to integrating.

4. You're on `zub-setup-weatherapp-project` with upstream set. You type a bare `git pull`. What gets pulled — and is that what step 4 wanted?
> [!answer]- reveal
> It pulls **your own feature branch** from the remote, *not* `main`. That is **not** what step 4 wants. To pick up teammates' merged work you must name it: `git pull origin main`.

5. Why does the course tell you to avoid `rebase` and `stash` on this project?
> [!answer]- reveal
> **`rebase` rewrites commits.** Rewriting anything already pushed/shared breaks every teammate's history and forces recovery work. **`stash`** is trivially forgettable — work parked there is invisible in `git status` and routinely lost. Both are recoverable in principle and confusing in practice, which is the wrong trade on a team deadline.

6. *Interleaving:* the course says if a merge conflict gets ugly, sometimes just delete the branch and re-branch from remote. What must you check first?
> [!answer]- reveal
> Whether anything on that branch is **committed locally but never pushed** — deleting the branch destroys it. Check with `git log origin/<branch>..<branch>` (commits you have that the remote doesn't). "Be careful what's being overwritten" is doing a lot of work in that sentence.

## Rebuild Drill

From a blank terminal — no notes — write the complete command sequence to take a feature called `zub-add-login-endpoint` from an up-to-date `main` all the way to a branch that is ready for a pull request.

**Success criteria:** starts by syncing `main` (`checkout main` + `pull`); creates the branch with `checkout -b`; commits with a message stating what was done; pulls `origin main` *before* pushing; pushes with `-u origin <branch>`; and you can state in one line who opens the PR, how many reviewers approve, and who performs the merge (you / 2 incl. lead / the lead).

## Correctness Check

Ran the Git checklist from `Git & GitHub/_refiner.md`:

- ✅ **fetch vs pull** — stated correctly: `fetch` updates remote-tracking refs and changes no local branch; `pull` = fetch + integrate into the current branch. (Prompt 3.)
- ✅ **merge vs rebase** — rebase rewrites commits onto a new base; **never rebase what's already pushed/shared.** The course's blanket "don't rebase" is stricter than the general rule but consistent with it. (Prompt 5.)
- ✅ **History rewrite is local-only-safe** — the no-direct-push-to-`main` rule is what keeps rewrite pressure off shared history. (Prompt 1.)
- ✅ **Commands verified:** `git checkout -b <name>` creates *and* switches; `git push -u origin <branch>` sets the upstream so later pushes need no arguments; `git pull origin main` while on a feature branch fetches and merges `origin/main` **into that branch** (it does not switch you to `main`).
- ➖ `reset --soft/--mixed/--hard` and `.gitignore` scope — not touched by this material; checked as N/A.
- ⚠ **Ambiguity in the source, resolved deliberately.** The slides say "before pushing any changes, pull the latest changes from the remote repository" without naming a branch. A bare `git pull` on a feature branch pulls *that branch* and accomplishes nothing toward integration — so this note reads it as `git pull origin main`, which is the only version that does the intended job. Confirm with your instructor if your team means something else.

## Flashcards

#flashcards/git/workflow

%% Deduped 2026-08-14 red-line sweep: 5 cards restating Retrieval Prompts 1, 2, 3, 4, 5 removed — one question, one home. Answers live in the prompts' collapsed callouts. %%

## TIL candidate

Showable: a merged pull request with two approving reviews and a green CI check is *itself* the artifact. → git TIL *"Feature-branch → PR → review → merge: the loop that keeps `main` deployable."* Link to the PR URL; don't copy the workflow prose across the seam.

## Links

- Related: [[Setting Up New Proj]] · [[Git Helpful Reminders]] · [[Forked Branches]]
- CI runs on the PR: [[github actions]]
- Forward: [[Merge Conflicts]] · [[Code Review Practices]]

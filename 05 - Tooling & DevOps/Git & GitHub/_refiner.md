---
type: refiner-config
domain: git
topic: learning-system
status: living
tags:
  - learning-system
  - refiner
---

# Git — refiner config

Parameters for the [[Refiner Spec (Graduate)]]. **Only what differs for Git lives here.** All shared machinery and rules are in the spec.

- **Target folder:** `50 Resources/Software Engineering/05 - Tooling & DevOps/Git & GitHub/`
- **Flashcard tag:** `#flashcards/git/<topic>`
- **Output template:** *(none — use the generic skeleton in the spec)*

## Correctness checklist (Git)

Run against every graduated Git note (spec step ④). Git errors are about *what a command moves* and *what is safe to rewrite* — verify the mental model, not just the flag spelling:

- [ ] **`reset --soft / --mixed / --hard`** — state correctly what each moves: `--soft` moves HEAD only (index + working tree kept), `--mixed` (default) moves HEAD + resets index (working tree kept), `--hard` moves all three and **discards** working-tree changes.
- [ ] **merge vs rebase** — merge preserves history and adds a merge commit; rebase rewrites commits onto a new base (linear history). **Never rebase commits already pushed/shared.**
- [ ] **fetch vs pull** — `fetch` updates remote-tracking refs and changes **no** local branch; `pull` = `fetch` + integrate (merge or rebase) into the current branch.
- [ ] **`.gitignore` scope** — it only ignores **untracked** files; it does **not** untrack a file already committed (needs `git rm --cached <file>`).
- [ ] **History rewrite is local-only-safe** — `commit --amend`, rebase, and force-push rewrite history: fine on unpushed local work, **destructive** on shared branches.

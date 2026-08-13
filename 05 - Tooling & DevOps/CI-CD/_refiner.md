---
type: refiner-config
domain: cicd
topic: learning-system
status: living
tags:
  - learning-system
  - refiner
---

# CI/CD — refiner config

Parameters for the [[Refiner Spec (Graduate)]]. **Only what differs for CI/CD lives here.** All shared machinery and rules are in the spec.

> **Scope — the pipeline layer.** This is the home for **continuous integration and delivery as a practice**, and for the **pipeline configuration** that expresses it — GitHub Actions workflows today, and whatever runs them next (Jenkins, GitLab CI, CircleCI, Docker-based builds). It was split out of `Git & GitHub/` because CI/CD is not Git-specific: Git is *where the code lives*, CI/CD is *what happens when it moves*. Git command semantics stay in `Git & GitHub/_refiner.md`; build-tool semantics stay in `Maven/_refiner.md`. Link across, never duplicate.

- **Target folder:** `50 Resources/Software Engineering/05 - Tooling & DevOps/CI-CD/`
- **Flashcard tag:** `#flashcards/cicd/<topic>`
- **Output template:** *(none — use the generic skeleton in the spec)*

> **Part tooling, part concept — split it deliberately.** Clicking through the Actions UI, reading run logs, and the workflow file's own contents are **doing**: they belong in the repo and a git TIL. Graduate to Obsidian only the **transferable why** — what triggers a run, what state a runner starts in, why a step did or didn't execute, where the human gate sits. Here the spec's "worked example" = an **annotated pipeline config**, and the "rebuild drill" = **write the workflow from a blank file**, with a deliberately failing test as the success criterion.

## Correctness checklist (CI/CD)

Run against every graduated CI/CD note (spec step ④). These traps are about **what runs, when, and with what privileges** — a pipeline that shows a green check can still be doing nothing:

- [ ] **Implicit step conditions** — every step carries an implicit `success()`, so it is **skipped once an earlier step fails**. Any step that must survive a red build (test reporting, artifact upload, cleanup) needs an explicit `if:`. Use `!cancelled()` for reporting; reserve `always()` for when a *cancelled* run should also trigger it.
- [ ] **Unknown inputs fail silently** — an invented or misspelled `with:` input produces a **warning, not an error**. Every input named in a note must exist in that action's documented API. (Real case: `format: junit` on `publish-unit-test-result-action` does not exist — the action auto-detects from the file extension.)
- [ ] **Action versions pinned and current** — every `uses:` pins a **major** tag, and that major is checked against upstream rather than copied from a tutorial. Majors move fast (`actions/checkout` went v4→v7 in roughly two years); a stale pin is a stale dependency.
- [ ] **Least-privilege permissions** — a `permissions:` block in the workflow (scoped, version-controlled, reviewable in a PR) beats the repo-wide Settings toggle, which grants write to **every** workflow forever. Note when private repos need extra read scopes.
- [ ] **The runner starts empty** — nothing persists between runs. Code must be checked out, toolchains installed, caches restored explicitly. No step may assume a developer's local database, JDK, or build output; environment/profile variables exist to enforce that.
- [ ] **CI vs CD named accurately** — a pipeline with **no deploy stage is CI**, whatever the lesson title says. Continuous **Delivery** = automatic build to release-ready + a **human approval gate** before production; Continuous **Deployment** = no gate.
- [ ] **YAML parses, and parses as intended** — validate, don't eyeball. A leading `!` is YAML's **tag indicator** (so `if: !cancelled()` is a syntax error while `(!cancelled())` is fine), and YAML 1.1 reads `on`/`off`/`yes`/`no` as **booleans** — the key `on:` parses to `true`.

## Links

- Machinery: [[Refiner Spec (Graduate)]]
- Contract: [[AI Operating Manual (READ ME)]]
- Neighbours: `Git & GitHub/_refiner.md` (command semantics) · `Maven/_refiner.md` (what the pipeline builds)

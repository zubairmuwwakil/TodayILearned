---
type: concept
topic: ci-cd
status: learning
difficulty: easy
aliases:
  - CI/CD
  - CI
  - CD
  - Continuous Integration
  - Continuous Delivery
  - Continuous Deployment
  - CI CD Pipeline
  - Pipeline Stages
tags:
  - git
  - github
  - ci-cd
  - devops
  - concepts
---

# Continuous Integration and Continuous Delivery

%% Graduated via [[Refiner Spec (Graduate)]] using CI-CD/_refiner.md. Conceptual material — no worked example by design; the test surface is the prompts + the reconstruct drill. The implementation lives in [[GitHub Actions]]. %%

> [!warning] The lesson that produced this note mislabels its own artifact
> Coding 2.53 calls its workflow a "CI/CD pipeline." It checks out, builds, tests, and publishes results. **There is no deploy stage.** It is pure CI. Prompt 3 makes you find that yourself.

## Retrieval Prompts

1. CI is defined as "developers frequently merge into a central repository." Why does the *frequency* carry the weight — what specifically gets worse if you merge monthly instead of daily?
> [!answer]- reveal
> Two things degrade **non-linearly** with time-since-last-merge. **Conflict surface:** the longer two branches diverge, the more overlapping edits accumulate, so the merge stops being mechanical and becomes a re-decision of design choices. **Diagnostic distance:** if a hundred commits land at once and the build goes red, the failure is no longer attributable — you've lost the pairing between *one small change* and *one failure*. Frequent integration is what keeps "the build broke" and "because of that commit" the same sentence.

2. Continuous **Delivery** vs Continuous **Deployment** — state the single structural difference.
> [!answer]- reveal
> **Where the human sits.** Continuous *Delivery*: every passing change is automatically built and made **release-ready**, but a person approves the final push to production. Continuous *Deployment*: no gate — every change that passes the pipeline goes to end users automatically. Same pipeline, one difference: Delivery has a manual approval step before production; Deployment does not. (Both share the "CD" abbreviation, which is why the distinction is worth owning.)

3. Look at what the FeedApp workflow actually does: checkout → set up JDK → `mvn clean test` → publish results. Which half of "CI/CD" is missing, and what would you have to add?
> [!answer]- reveal
> **The entire CD half.** Nothing packages a releasable artifact, and nothing pushes anywhere. To make it Continuous *Delivery* you'd need a `package` step producing the jar, somewhere to publish it (registry / release / container image), and a deploy job guarded by an approval — GitHub models that with a protected **environment**. To make it Continuous *Deployment*, drop the approval. As written, the pipeline stops at "we know the tests passed."

4. Name the four standard pipeline stages in order, and say what a failure at each one *tells you*.
> [!answer]- reveal
> **Source** (commit/push — the trigger; a "failure" here is really just no run). **Build** (compile/package — failure means it doesn't compile or a dependency didn't resolve; nothing about your logic). **Test** (automated verification — failure means it compiles fine and behaves wrong; this is the one that's about you). **Deploy** (to staging/production — failure here is usually environment, config, credentials, or infrastructure, *not* your code). The ordering is economic: each stage is slower and more expensive than the last, so you fail as early as possible.

5. Why is "the build is green" a weaker guarantee than it sounds?
> [!answer]- reveal
> Green means **nothing that was checked failed** — not that the software is correct. If a module has no tests, Maven reports `BUILD SUCCESS` on the strength of compilation alone (your own [[Maven Commands]] note flags exactly this). Green is only as strong as the assertions behind it, so the real questions are *what does the suite actually cover* and *would it go red if this feature broke*. A pipeline with no tests is an expensive compiler.

6. Everyone on the team already runs the tests locally before pushing. What does CI add that this doesn't?
> [!answer]- reveal
> **A clean, identical, reproducible environment** — a fresh machine with no local Postgres, no stale `target/`, no personal JDK version, no uncommitted file that's silently making it pass. **Non-optionality** — it can't be forgotten, skipped under deadline, or run on "most" of the suite. And critically, **it tests the merged result**, not each person's branch in isolation: two branches that each pass alone can still break once combined, and only the integration point catches that.

## Reconstruct-from-Memory Drill

Conceptual material, so the drill is reconstruction rather than a blank file.

From a **blank page**, draw the pipeline:

1. The four stages, in order, left to right.
2. Under each: what happens, what triggers it, and what a failure there means.
3. Then fork the diagram after **Test** into the two CD variants — mark exactly where the human approval gate sits in one and is absent in the other.
4. Finally, mark on the diagram where the FeedApp workflow **stops**.

**Success criteria:** all four stages named in order; the approval gate placed *between* Test and Deploy for Continuous Delivery and shown as absent for Continuous Deployment; the FeedApp cutoff drawn at the end of Test. Check against your Day 26 capture only *after* you've drawn it.

## Correctness Check

Ran the checklist from `CI-CD/_refiner.md`:

- ✅ **CI vs CD named accurately** — the checklist item this note exists to enforce. See the ⚠ below.
- ➖ **The remaining items are configuration-level** (step conditions, unknown inputs, version pins, permissions, empty runner, YAML parsing) and have no surface in a concepts note. They are exercised in [[GitHub Actions]]. Recorded rather than silently skipped.

Verified independently:

- ✅ **Delivery vs Deployment** — the distinction is the manual approval gate before production. Standard and correct.
- ✅ **Stage ordering** Source → Build → Test → Deploy, and the fail-early economics.
- ⚠ **The lesson's own artifact contradicts its title.** Coding 2.53 is titled "CI/CD Pipeline" and the prose claims it sets up "continuous integration and continuous delivery," but the workflow has **no deploy or release step whatsoever**. It is a CI pipeline. Flagged in the callout above rather than silently repeated.
- ➖ **Terminology note:** the raw slide heading reads `CD: Continuous Delivery/` — the trailing slash is a typo for "Delivery/Deployment," not a third meaning.

## Flashcards

#flashcards/cicd/concepts

What is the single structural difference between Continuous Delivery and Continuous Deployment?
?
Where the human sits. Delivery automatically produces a release-ready build but a person approves the push to production; Deployment has no gate — every passing change ships automatically.

Why does merge *frequency* matter in CI, rather than just merging eventually?
?
Both conflict surface and diagnostic distance grow non-linearly with divergence. Frequent small merges keep conflicts mechanical and keep "the build broke" attributable to one small change.

Name the four standard CI/CD pipeline stages in order.
?
Source, Build, Test, Deploy — ordered so the cheapest, fastest checks fail first.

A Build failure and a Test failure tell you different things. What?
?
Build failing means it doesn't compile or a dependency didn't resolve — nothing about your logic. Test failing means it compiles fine and behaves wrong.

Why is a green CI build a weaker guarantee than it sounds?
?
Green means nothing that was checked failed, not that the code is correct. With no tests, Maven still reports BUILD SUCCESS on compilation alone.

What does CI provide that "everyone runs the tests locally" cannot?
?
A clean reproducible environment with no local state, execution that can't be skipped, and testing of the merged result — two branches that each pass alone can still break together.

## TIL candidate

The concepts themselves aren't showable — no artifact. The *pipeline* is, and that pointer lives in [[GitHub Actions]]. Nothing to publish from this note.

## Links

- Implementation of these ideas: [[GitHub Actions]]
- Build tool the pipeline drives: [[Apache Maven]] · [[Maven Commands]]
- Related workflow: [[Git Project Workflow]]
- Forward: [[Deployment Environments]] · [[Trunk-Based Development]] · [[Blue-Green Deployment]]

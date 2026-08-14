---
type: concept
topic: ci-cd
status: learning
difficulty: medium
aliases:
  - GitHub Actions
  - GitHub Actions Workflow Anatomy
  - Actions workflow
  - workflow file
  - ci.yml
  - runner
  - Surefire reports
tags:
  - git
  - github
  - github-actions
  - ci-cd
  - devops
  - concepts
---

# GitHub Actions — Workflow Anatomy

%% Graduated via [[Refiner Spec (Graduate)]] using CI-CD/_refiner.md. Replaced the earlier raw YAML paste in this file (its indentation was mangled and the last two steps had collapsed onto one line). The UI choreography from Coding 2.53 — Settings tabs, clicking into run logs — is deliberately NOT here: that is doing, and doing lives in git. Process concepts are in [[Continuous Integration and Continuous Delivery]]. %%

## Worked Example

The FeedApp workflow, **corrected** (see Correctness Check for every change and why). Lives at `.github/workflows/ci.yml` — the directory is convention, the filename is free.

```yaml
name: Java CI with Maven and JUnit

# 1. TRIGGER — which repository event starts this workflow
on:
  push:
    branches: [main]

# 2. PERMISSIONS — scope the GITHUB_TOKEN here, in version control,
#    rather than flipping the repo-wide switch in Settings
permissions:
  contents: read          # clone the code
  checks: write           # create the test-results check run
  pull-requests: write    # comment results onto PRs

jobs:
  build-and-test:
    # 3. RUNNER — a fresh, disposable Ubuntu VM, empty at the start of every run
    runs-on: ubuntu-latest

    steps:
      # 4. `uses:` — pull in a prebuilt, versioned action written by someone else
      - uses: actions/checkout@v7

      - name: Set up JDK 17
        uses: actions/setup-java@v5
        with:
          java-version: "17"
          distribution: "temurin"
          cache: maven      # reuse ~/.m2 between runs instead of re-downloading

      # 5. `run:` — execute a shell command on the runner
      - name: Build and test with Maven
        env:
          SPRING_PROFILES_ACTIVE: test   # tests hit the test profile, never a real DB
        run: mvn -B clean test

      # 6. `if:` — WITHOUT this, a failing test skips the report you most need
      - name: Publish test results
        if: ${{ !cancelled() }}
        uses: EnricoMi/publish-unit-test-result-action@v2
        with:
          files: "**/surefire-reports/TEST-*.xml"
```

**Explain in plain English (EiPE):** on every push to `main`, GitHub rents you a clean Linux machine, installs Java, runs your test suite on it, and posts the results back onto the commit — so a broken test becomes visible to the whole team within minutes without anyone remembering to look.

## Retrieval Prompts

1. What is the difference between a step written with `uses:` and one written with `run:`? Why not just `run:` everything?
> [!answer]- reveal
> `uses:` pulls in a **prebuilt, versioned, shareable action** — someone else's packaged code (checkout, setup-java, publish-results). `run:` executes a **shell command** on the runner. You *could* hand-write shell for much of it, but actions encapsulate cross-platform logic, caching, and GitHub API calls — creating a check run means authenticated API requests, which as raw `curl` would be brittle and long. Rule of thumb: `uses` = reuse someone's solved problem; `run` = your project's own commands.

2. The job says `runs-on: ubuntu-latest`. What is the state of that machine at the start of each run, and what follows from it?
> [!answer]- reveal
> A **fresh, empty, disposable VM** — no code, no JDK of your choosing, no `~/.m2` cache, nothing surviving from the previous run. That's precisely *why* the workflow must explicitly check out the repository and install a JDK: nothing persists, so everything must be declared. This is also the entire value proposition — an environment with none of your laptop's accumulated state is what makes "works on my machine" impossible.

3. A test fails. Trace what happens to the "Publish test results" step in the **slide's original** workflow, and why.
> [!answer]- reveal
> `mvn test` exits non-zero → the Maven step is marked failed → every later step carries an **implicit `success()` condition** → the publish step is **skipped**. You get a red X and *no test report*, on exactly the run where you needed to know which test broke. The fix is an explicit condition: `if: ${{ !cancelled() }}`. This is a silent-failure bug: the pipeline looks perfect for as long as it's green.

4. Why `!cancelled()` rather than `always()`?
> [!answer]- reveal
> `always()` also runs when **you deliberately cancelled** the workflow — burning runner minutes and publishing a misleading report for a run you killed on purpose. `!cancelled()` runs on success *and* failure but respects cancellation. It's the difference between "no matter what" and "unless I stopped it."

5. YAML trap: `if: !cancelled()` is a syntax error, but `if: (!cancelled())` is valid. Why?
> [!answer]- reveal
> In YAML a leading `!` is the **tag indicator** (`!!str`, `!CustomType`), so a plain scalar cannot begin with it — the parser tries to read a type tag and fails. Wrapping in parentheses makes the value start with `(`, an ordinary character, so it parses as a plain scalar. `${{ !cancelled() }}` works for the same reason: it starts with `$`. The `!` is fine anywhere except position one.
>
> **Second trap in the same file.** Run this workflow through a YAML 1.1 parser and the `on:` key comes back as the **boolean `true`**, not the string `"on"` — YAML 1.1 treats `on`/`off`/`yes`/`no` as booleans. (Verified: parsing the example above yields top-level keys `['name', True, 'permissions', 'jobs']`.) GitHub's own parser handles it, so your workflow is fine — but it's why some linters and hand-rolled scripts choke on workflow files, and why the same rule bites you as the *Norway problem*: a country-code list containing `NO` silently becomes `False`.

6. What breaks if you delete `SPRING_PROFILES_ACTIVE: test`?
> [!answer]- reveal
> The app boots under the **default** profile, whose datasource points at your dev database — a Postgres URL that does not exist on a fresh Ubuntu runner. The Spring context fails to load and every test errors on connection refused, before a single assertion runs. The test profile redirects to an in-memory/test database. Generalised: **CI must not depend on anything that only exists on your laptop.**

7. The tutorial pins `actions/checkout@v3`. What does that tell you, and what's the rule for version tags?
> [!answer]- reveal
> It tells you **the tutorial is old** — `checkout` is on **v7** and `setup-java` on **v5**, with setup-java v1–v4 now emitting deprecation warnings. The rule: pin to a **major** tag (`@v7`), which keeps receiving bug and security patches automatically while shielding you from breaking changes; then *re-check the major* every time you copy a workflow from a tutorial. A pinned action version is a dependency, and a stale one rots exactly like a stale `pom.xml` entry.

8. Where do the `TEST-*.xml` files come from — who writes them?
> [!answer]- reveal
> The **Maven Surefire plugin**, which runs during the `test` phase and writes reports into `target/surefire-reports/`. The publish action does **not** run tests; it only reads files Surefire has already produced. That's why the two steps are ordered as they are, and why the `**/` glob matters: in a multi-module build every module has its own `target/`, so the pattern must reach into all of them.

9. The lesson says to flip Settings → Actions → General to "read and write." What does that cost, and what's the alternative?
> [!answer]- reveal
> The repo-wide toggle grants write to **every workflow in the repository, forever** — including workflows added later by anyone, which is a standing privilege nobody will revisit. The alternative is a `permissions:` block in the workflow file itself, scoped to the least the job needs. It is version-controlled, reviewable in a pull request, and travels with the workflow that needs it. Same result, far smaller blast radius.

## Rebuild Drill

From a **blank** `.github/workflows/ci.yml`, write a workflow that:

- triggers on push to `main` only,
- runs on Ubuntu,
- checks out the repository,
- installs Temurin JDK 17 with Maven caching enabled,
- runs the test suite in batch mode,
- publishes the Surefire results **even when tests fail**,
- and declares its own least-privilege permissions.

**Success criteria:**

1. File sits under `.github/workflows/` and ends in `.yml`.
2. `on.push.branches` restricts to `main` — a bare `on: push` fails this.
3. Every `uses:` pins a major version tag.
4. Nothing assumes state from a previous run (code checked out, JDK installed explicitly).
5. The publish step carries a condition, so a red run still reports.
6. `permissions:` declared in the file, not via the repo-wide Settings toggle.
7. **The real test:** push it with a deliberately failing assertion. A correct workflow gives you a **red run that still shows the test report**. If the report is missing, criterion 5 is wrong.

## Correctness Check

Ran the checklist from `CI-CD/_refiner.md`:

Every item on the CI/CD checklist has a surface in this note — that checklist was derived from the bugs found here:

- ✅ **Implicit step conditions** · ✅ **Unknown inputs fail silently** · ✅ **Versions pinned and current** · ✅ **Least-privilege permissions** · ✅ **Runner starts empty** · ✅ **CI vs CD named accurately** · ✅ **YAML parses as intended** — each is evidenced in the itemised list below.

Verified against upstream documentation (checked 2026-08-13), with every change from the slide listed:

- ✅ **YAML well-formed — parsed with PyYAML, not just by eye.** Four steps resolved, `permissions` and the `if:` condition landed on the right keys; consistent two-space indentation, all sequences and mappings properly nested. *The previous contents of this file were not:* the last two steps had collapsed onto a single line and the indentation mixed tabs and spaces, so it would not have parsed.
- ✅ **`format: junit` REMOVED — that input does not exist.** `EnricoMi/publish-unit-test-result-action` takes `files` and **auto-detects** format from the file extension. Unknown inputs raise a *warning* rather than failing, which is why the slide's version appeared to work while that line did nothing.
- ✅ **`@v1` → `@v2`** — v2 is the current major of that action.
- ✅ **`if: ${{ !cancelled() }}` ADDED** — steps carry an implicit `success()` condition, so the original workflow **skipped the report on every failed build**. Upstream's README recommends `if: (!cancelled())`; both are valid and equivalent — bare `if: !cancelled()` is not (prompt 5).
- ✅ **`permissions:` block ADDED** — upstream requires `checks: write` and `pull-requests: write`; `contents: read` covers checkout. Replaces the repo-wide Settings toggle the slide instructs you to flip.
- ✅ **`actions/checkout@v3` → `@v7`**; **`actions/setup-java@v3` → `@v5`.** Current majors; setup-java v1–v4 now emit deprecation warnings.
- ✅ **`--file pom.xml` REMOVED** — redundant when the POM is at the repository root, which is already Maven's default. `-B` (batch mode) is kept and *is* meaningful: non-interactive, no download-progress spam in the log.
- ✅ **`cache: maven` ADDED** to setup-java — caches `~/.m2` between runs. Supported by the action.
- ✅ **Surefire path correct** — `target/surefire-reports/TEST-*.xml`; the `**/` prefix generalises to multi-module builds.
- ✅ **Lifecycle claim not restated** — why `clean test` also compiles lives once, in [[Apache Maven]]. Linked, not duplicated.
- ⚠ **<90% — repository visibility.** Upstream states private repos additionally need `issues: read` in `permissions`. I have not seen whether the FeedApp backend repo is private. **If it is private, add `issues: read`.**
- ⚠ **<90% — version drift.** v7 / v5 / v2 were current as of 2026-08-13. Action majors move quickly (checkout alone shipped v4→v7 in roughly two years). Re-verify when you next edit this file rather than trusting these pins.
- ⚠ **Heads-up for later:** `checkout@v7` carries a breaking change around safer `pull_request_target` defaults. Irrelevant to this `push`-triggered workflow, but it will matter if you add pull-request triggers.
- ➖ **The lesson mislabels its artifact** — it is CI only, with no deploy stage. See [[Continuous Integration and Continuous Delivery]].

## Flashcards

#flashcards/cicd/github-actions

In YAML 1.1, what does the key `on:` parse to, and why doesn't it break GitHub Actions?
?
The boolean true — YAML 1.1 treats on/off/yes/no as booleans (the "Norway problem"). GitHub's parser handles it; third-party linters and hand-rolled scripts are what trip over it.

%% Deduped 2026-08-14 red-line sweep: 8 cards restating Retrieval Prompts 1, 2, 3, 4, 5, 6, 8, 9 removed — one question, one home. Answers live in the prompts' collapsed callouts. %%

## TIL candidate

**Showable.** Coding 2.53's deliverable is a commit link — that artifact belongs in git, not here. The genuinely interesting TIL is the bug the slide shipped:

> *"Your CI hides the test report exactly when you need it"* — the implicit `success()` step condition, demonstrated with one red run before the fix and one after.

Link the commit URL and the two Actions run URLs from the TIL. **Do not paste the YAML into Obsidian** — one home per item; the workflow file's home is the repo.

## Links

- Process concepts: [[Continuous Integration and Continuous Delivery]]
- Build tool this pipeline drives: [[Apache Maven]] — lifecycle, why `clean test` compiles first · [[Maven Commands]]
- Related: [[Git Project Workflow]]
- Forward: [[Maven Surefire Plugin]] · [[Secrets in GitHub Actions]] · [[GitHub Actions Matrix Builds]] · [[YAML]] · [[Deployment Environments]]

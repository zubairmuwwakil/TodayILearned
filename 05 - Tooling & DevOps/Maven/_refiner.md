---
type: refiner-config
domain: maven
topic: learning-system
status: living
tags:
  - learning-system
  - refiner
---

# Maven — refiner config

Parameters for the [[Refiner Spec (Graduate)]]. **Only what differs for Maven lives here.** All shared machinery and rules are in the spec.

- **Target folder:** `50 Resources/Software Engineering/05 - Tooling & DevOps/Maven/`
- **Flashcard tag:** `#flashcards/maven/<topic>`
- **Output template:** *(none — use the generic skeleton in the spec)*

> **Tooling domain — read this first.** Like Postman, Maven is mostly about *doing*. Command recipes ("what do I type in Eclipse to run `clean install`") belong in the existing how-to notes or a git TIL — **not** in a graduated concept note. Graduate only the **transferable why**: how Maven resolves a dependency, why the lifecycle order matters, what a coordinate identifies. Here the spec's "worked example" = an **annotated POM fragment**, and the "rebuild drill" = **write the coordinate/dependency block from a blank file**.

## Correctness checklist (Maven)

Run against every graduated Maven note (spec step ④). Maven errors are about **resolution and ordering** — a build that succeeds can still ship the wrong jar:

- [ ] **Coordinates** — `groupId:artifactId:version` (GAV) is what uniquely identifies an artifact; `packaging` and `classifier` complete the five elements. Only the three GAV parts must be declared to publish.
- [ ] **Resolution order** — Maven checks the **local** repository (`~/.m2/repository`) first and only reaches out to **central/remote** if the artifact is absent; what it downloads is then **cached locally**. Never state that it hits the network every build.
- [ ] **Transitive dependencies + mediation** — Maven pulls dependencies-of-dependencies automatically. On a version conflict the winner is the **nearest definition** in the dependency tree (shortest path), *not* the highest version number; equal depth ⇒ **first declared** wins.
- [ ] **Lifecycle is ordered and cumulative** — running a phase runs **every phase before it** in that lifecycle (`validate → compile → test → package → verify → install → deploy`). `clean` is a **separate lifecycle**, which is why `mvn clean install` names both.
- [ ] **Scopes change the classpath** — `compile` (default), `provided`, `runtime`, `test`. A `test`-scoped dependency is **not** on the runtime classpath; `provided` is present at compile time but expected from the container at runtime.
- [ ] **SNAPSHOT vs release** — a `-SNAPSHOT` version is mutable and re-resolved; a release version is immutable once published. Don't depend on a SNAPSHOT in anything reproducible.

## Links

- Machinery: [[Refiner Spec (Graduate)]]
- Contract: [[AI Operating Manual (READ ME)]]

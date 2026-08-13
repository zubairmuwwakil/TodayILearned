---
type: refiner-config
domain: java
topic: learning-system
status: living
tags:
  - learning-system
  - refiner
---

# Java — refiner config

Parameters for the [[Refiner Spec (Graduate)]]. **Only what differs for Java lives here.** All shared machinery and rules are in the spec.

- **Target folder:** `50 Resources/Software Engineering/02 - Backend/Java/`
- **Flashcard tag:** `#flashcards/java/<topic>`
- **Output template:** [[Java Concept Note]] — richer superset of the generic skeleton; use it for Java.

## Correctness checklist (Java)

Run against every graduated Java note (spec step ④):

- [ ] **Compiles** — mentally compile every block; stated outputs must be exactly right.
- [ ] **`==` vs `.equals()`** — reference identity vs value equality used correctly (esp. `String`, wrappers).
- [ ] **Overloading is *not* distinguished by return type** — signature = name + parameter list only.
- [ ] **Integer autobox cache** — `Integer` `-128..127` are cached, so `==` can *look* true; outside that range it's false. (Applies to boxed comparisons generally.)

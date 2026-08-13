---
type: refiner-config
domain: spring
topic: learning-system
status: living
tags:
  - learning-system
  - refiner
---

# Spring — refiner config

Parameters for the [[Refiner Spec (Graduate)]]. **Only what differs for Spring lives here.** All shared machinery and rules are in the spec.

- **Target folder:** `50 Resources/Software Engineering/02 - Backend/Spring/`
- **Flashcard tag:** `#flashcards/spring/<topic>`
- **Output template:** *(none — use the generic skeleton in the spec)*

> Ad-hoc Spring fixes may still live under `Spring Hacks/`. New graduated Spring concept notes land in `02 - Backend/Spring/`; move (don't copy) if you promote an old one.

## Correctness checklist (Spring)

Run against every graduated Spring note (spec step ④). Spring bugs come from the *container's* behaviour, not just syntax:

- [ ] **Bean scope** — default is **singleton** (one instance per container). Injecting a `prototype` bean into a singleton gives one fixed instance unless you use a provider/lookup — name the leak if relevant.
- [ ] **Dependency injection** — prefer **constructor injection** (final fields, testable, fails fast on missing deps) over field injection; the container wires by type then qualifier.
- [ ] **Annotation / config** — stereotype (`@Component`/`@Service`/`@Repository`/`@Controller`) vs `@Bean` in a `@Configuration` class used correctly, and the class is inside the component-scan path.
- [ ] **`@Transactional` proxy caveat** — it works through a proxy, so a **self-invocation** (one method in the class calling another `@Transactional` method directly) bypasses it; only external calls are advised.

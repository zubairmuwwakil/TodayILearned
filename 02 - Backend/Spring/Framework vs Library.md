---
type: concept
topic: spring
status: learning
difficulty: easy
aliases:
  - Framework vs Library
  - Frameworks and Libraries
  - Library vs Framework
tags:
  - spring
  - frameworks
  - concepts
---

# Framework vs Library

%% Graduated via [[Refiner Spec (Graduate)]] using Spring/_refiner.md. Test surface, not a reference — answer each prompt before revealing. %%

## Worked Example

```java
// LIBRARY — YOUR code is in charge; you call it, when you decide:
List<String> names = new ArrayList<>();
Collections.sort(names);              // you call the library

// FRAMEWORK — the framework is in charge; it calls YOUR code:
@RestController
class HelloController {
    @GetMapping("/hi")
    String hi() { return "hi"; }       // Spring invokes this when a request arrives
}
```

**Explain in plain English (EiPE):** With a library *you* are the caller; with a framework you hand it your code and *it* decides when to run it. That inversion is the whole difference.

## Retrieval Prompts

1. What single question tells you whether something is a library or a framework?
> [!answer]- reveal
> **"Who calls whom?"** You call a **library**; a **framework** calls your code — the Hollywood principle, "don't call us, we'll call you." That **inversion of control** is the defining line.

2. Why does Spring being a *framework* mean you write classes + annotations but rarely a `main` that wires everything together?
> [!answer]- reveal
> Because Spring **owns the control flow** — it instantiates your beans and invokes your controllers/methods at the right moment. You *declare*; it *calls*.

3. Give one concrete cost of a framework's control inversion.
> [!answer]- reveal
> You must work **within its patterns** — its structure, annotations, and lifecycle. You trade flexibility for the boilerplate it removes. A library imposes less but also does less.

## Rebuild Drill

From memory: (a) write the **one-sentence test** that separates a library from a framework, then (b) classify each — `Collections.sort`, **Spring**, **Jackson** (JSON), **JUnit**.
**Success criteria:** test = "who calls whom"; Collections = library, Jackson = library (you call `ObjectMapper`), Spring = framework, JUnit = framework (it calls your `@Test` methods).

## Correctness Check

- ✅ Library-vs-framework = **inversion of control** / Hollywood principle — verified; the raw "house" analogy is fine (foundation you build *on*).
- ✅ JUnit is a framework (it invokes your test methods); Jackson is a library (you invoke it) — correct classification for the drill.
- ➖ Checklist items (bean scope / DI / `@Transactional`) — N/A to this concept; noted as considered. No code errors in the source lesson.

## Flashcards

#flashcards/spring/frameworks

What is the one-question test for library vs framework?
?
Who calls whom — you call a library; a framework calls your code (inversion of control).

Why is "inversion of control" the defining trait of a framework?
?
Because the framework, not your code, drives the execution flow — it decides when to invoke the code you supply.

## TIL candidate

— Pure concept; nothing showable to spin as a git TIL.

## Links

- Related: [[IoC and Dependency Injection]] · [[The Spring Framework]]
- Map: [[Spring MOC]]

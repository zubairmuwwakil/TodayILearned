---
type: concept
topic: spring
status: learning
difficulty: medium
aliases:
  - Bean Scopes
  - Singleton Scope
  - Prototype Scope
  - Spring Scopes
tags:
  - spring
  - beans
  - scopes
  - concepts
---

# Bean Scopes

%% Graduated via [[Refiner Spec (Graduate)]] using Spring/_refiner.md. Test surface, not a reference. The load-bearing trap is prototype-in-singleton — make sure you can regenerate it. %%

## Worked Example

```java
// 1. Default scope — ONE shared instance per container:
@Component
class RateLimiter { /* shared state lives here */ }

// 2. Prototype — a FRESH instance every time it's requested:
@Component
@Scope("prototype")
class ReportBuilder { /* per-use state */ }
```

**Explain in plain English (EiPE):** `RateLimiter` is a singleton — every injection point shares the one instance; `ReportBuilder` is prototype — each request from the container hands back a brand-new object.

## Retrieval Prompts

1. What's the default scope, and what does "singleton" actually mean in Spring? (Careful — it is *not* the GoF singleton.)
> [!answer]- reveal
> **singleton** is the default. It means **one instance per Spring IoC container**, cached and shared — **not** the GoF "one per JVM" pattern. Two containers ⇒ two instances.

2. You request a `prototype` bean twice. What do you get, and what does that imply for state and lifecycle?
> [!answer]- reveal
> **Two different instances.** State on one doesn't affect the other, and the container **doesn't run destruction callbacks** for prototypes — it makes them but doesn't fully manage their teardown.

3. The classic trap: you inject a `prototype` bean into a `singleton`. How many prototype instances do you actually get, and why?
> [!answer]- reveal
> **One** — fixed at the singleton's creation time. The singleton is wired **once**, so its prototype dependency is injected once. For a fresh one per use: **`ObjectProvider`**, **`@Lookup`**, or a **scoped proxy**.

4. Name the four web-aware scopes.
> [!answer]- reveal
> **request · session · application · websocket.**

## Rebuild Drill

From memory: (a) annotate two beans, one singleton (default) and one prototype; (b) in one sentence each, say what you get on the **2nd** request from the container; (c) name the prototype-in-singleton fix.
**Success criteria:** default needs **no** annotation; prototype uses `@Scope("prototype")`; fix = `ObjectProvider` / `@Lookup` / scoped proxy.

## Correctness Check

- ✅ **singleton = one per container** (not GoF "one per JVM") — the key distinction the raw material blurred by listing Singleton among "Spring's design patterns."
- ✅ **prototype** = new per request; container does **not** invoke destroy callbacks for prototypes. ✓
- ✅ **Web scopes**: request / session / application / websocket. ✓ (from source)
- ✅ **prototype-in-singleton**: injected once at creation; fix via `ObjectProvider` / `@Lookup` / scoped proxy (Spring `_refiner` checklist item).
- ⚠️ **Source conflation flagged:** Day-16 shows the **GoF Singleton pattern** (a `getInstance()` class) *and* Spring's **singleton scope** as if one topic. They're different — the GoF pattern note belongs in Java, linked below.

## Flashcards

#flashcards/spring/scopes

%% Deduped 2026-08-14 red-line sweep: 3 cards restating Retrieval Prompts 1, 2, 3 removed — one question, one home. Answers live in the prompts' collapsed callouts. %%

## TIL candidate

Showable: a tiny demo proving prototype-in-singleton yields one instance until you add `ObjectProvider`. → git TIL. Link out; don't copy.

## Links

- Contrast: [[Singleton Pattern]] — the Java GoF pattern, a *different* thing from singleton scope
- Related: [[IoC and Dependency Injection]]
- Map: [[Spring MOC]]
- Prerequisite: [[IoC and Dependency Injection]]

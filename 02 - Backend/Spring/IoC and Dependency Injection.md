---
type: concept
topic: spring
status: learning
difficulty: medium
aliases:
  - IoC and Dependency Injection
  - Inversion of Control
  - Dependency Injection
  - IoC
  - DI
  - Spring IoC Container
  - Spring Beans
  - ApplicationContext
tags:
  - spring
  - ioc
  - dependency-injection
  - beans
  - concepts
---

# IoC and Dependency Injection

%% Graduated via [[Refiner Spec (Graduate)]] using Spring/_refiner.md. Absorbs "Spring Core" (IoC container + beans) — one home, not a second note. Test surface, not a reference. %%

## Worked Example

```java
// The dependency — a bean the container manages:
@Service
class WeatherClient {
    String forCity(String city) { return "sunny in " + city; }
}

// The dependent (client) — it NEVER does `new WeatherClient()`:
@RestController
class WeatherController {
    private final WeatherClient client;

    // 1. Declare what you need in the constructor...
    WeatherController(WeatherClient client) {   // 2. ...Spring INJECTS the managed bean here
        this.client = client;
    }

    @GetMapping("/weather/{city}")
    String weather(@PathVariable String city) { // 3. use the injected dependency
        return client.forCity(city);
    }
}
```

**Explain in plain English (EiPE):** `WeatherController` never constructs its own `WeatherClient` — it declares the need and the Spring container (IoC) injects a managed instance. That is Dependency Injection implementing Inversion of Control. (Single constructor ⇒ `@Autowired` is optional since Spring 4.3.)

## Retrieval Prompts

1. IoC and DI aren't the same *kind* of thing — what's the relationship?
> [!answer]- reveal
> **IoC is the principle** (the framework, not you, controls object creation and flow). **DI is the pattern** that implements it — dependencies are created *outside* the class and handed in.

2. Name the three roles in DI, and say who plays the injector in Spring.
> [!answer]- reveal
> **Client** (the dependent class), **Service** (the dependency), **Injector**. In Spring the **IoC container / `ApplicationContext`** is the injector.

3. Why is **constructor injection** preferred over field injection?
> [!answer]- reveal
> Dependencies can be `final`/immutable; the object is **valid the moment it's constructed**; it **fails fast** if a dependency is missing; and it's trivially unit-testable without reflection.

4. What *is* a Spring bean, and who owns its lifecycle?
> [!answer]- reveal
> An object **instantiated, wired, and lifecycle-managed by the IoC container** (`ApplicationContext`) from creation to destruction. You write the class; the container makes and manages the instance.

## Rebuild Drill

From a blank file, rewrite `WeatherController` to use **constructor injection** of a `WeatherClient` — no `new`. Then state in one line which part is IoC and which is DI.
**Success criteria:** `final` field; constructor takes the dependency; no `@Autowired` needed (single constructor); `WeatherClient` is a `@Service`; IoC = container controls creation, DI = it injects the dependency.

## Correctness Check

- ✅ **IoC = principle, DI = pattern implementing it** — verified against the source (stated correctly there).
- ✅ **`org.springframework.context.ApplicationContext`** is the IoC-container interface. ✓
- ✅ **Constructor injection**: `@Autowired` optional on a *single* constructor since Spring 4.3.
- ✅ **Three DI roles** (client / service / injector) — from the source, correct.
- ➖ **Merged "Spring Core"** (IoC container + beans) into this note rather than a separate one — beans/container are the same concept cluster (single source of truth).

## Flashcards

#flashcards/spring/ioc

%% Deduped 2026-08-14 red-line sweep: 3 cards restating Retrieval Prompts 1, 3, 4 removed — one question, one home. Answers live in the prompts' collapsed callouts. %%

Why does DI make code "loosely coupled"?
?
Classes depend on abstractions the container supplies rather than on concrete objects they construct — so implementations can be swapped or mocked without changing the dependent class.

## TIL candidate

Showable: a constructor-injected controller + service that runs with no `new` and no `@Autowired`. → git TIL *"Constructor injection in Spring — no `new`, no `@Autowired` needed."* Link out; don't copy the code here.

## Links

- Contrast: [[Framework vs Library]]
- Related: [[Bean Scopes]] · [[Spring Boot Annotations]]
- Map: [[Spring MOC]]
- Prerequisite: [[Framework vs Library]]

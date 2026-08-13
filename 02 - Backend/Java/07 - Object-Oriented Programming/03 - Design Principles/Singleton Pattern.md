---
type: concept
topic: design-principles
status: learning
difficulty: medium
aliases:
  - Singleton Pattern
  - Singleton
  - getInstance
tags:
  - java
  - design-principles
  - design-patterns
  - singleton
---

# Singleton Pattern

%% Graduated via [[Refiner Spec (Graduate)]] using Java/_refiner.md + [[Java Concept Note]]. The Day-16 slide's version of this pattern does not compile and describes its own mechanism incorrectly — both are fixed below and turned into prompts. %%

## What it is

A creational pattern that guarantees a class has **exactly one instance** and provides one global way to reach it. Enforced by making the constructor **private** so nothing outside the class can call `new`.

## Why it matters

Use it when one shared resource must be genuinely shared — a connection pool, a cache, a configuration registry. Reach for it sparingly: a singleton is global mutable state, which is hard to test and hard to reason about under concurrency.

## Syntax / Pattern

```java
private static Type instance;        // the one instance
private Type() { }                   // private constructor blocks `new`
public static Type getInstance() { } // the only door in
```

## Worked Example

```java
public class ConnectionPool {

    // 1. the single instance, held privately
    private static ConnectionPool instance = null;

    // 2. PRIVATE constructor — the parentheses are not optional.
    //    This is the line that makes `new ConnectionPool()` illegal elsewhere.
    private ConnectionPool() { }

    // 3. create on first call, hand back the same object forever after
    public static ConnectionPool getInstance() {
        if (instance == null) {
            instance = new ConnectionPool();
        }
        return instance;
    }
}
```

**Explain in plain English (EiPE):** the class hands out one object and refuses to let anyone create a second.

## Trace

**Predict before reading on:** how many times does the constructor body run across three `getInstance()` calls?  `___`

| Call | `instance` on entry | Constructor runs? | Returned |
|---|---|---|---|
| 1st `getInstance()` | `null` | **yes** | the new object |
| 2nd `getInstance()` | the object | no | the same object |
| 3rd `getInstance()` | the object | no | the same object |

**Actual:** the constructor body runs **once**. Every later call takes the `if` as false and returns the cached reference.

## Faded Practice

This version is **not thread-safe**. Fill the blank to fix it without locking on every call:

```java
public class ConnectionPool {
    private ConnectionPool() { }

    private static class Holder {
        private static final ConnectionPool INSTANCE = ______;
    }

    public static ConnectionPool getInstance() { return Holder.INSTANCE; }
}
```
> [!answer]- Answer
> `new ConnectionPool()`. This is the **initialization-on-demand holder** idiom: the JVM guarantees a class is initialized exactly once and in a thread-safe way, and `Holder` isn't initialized until `getInstance()` first touches it — so you get laziness *and* thread safety with no `synchronized` on the hot path.

## Common Mistakes

- **`private SingletonClass { }`** → does not compile. A constructor needs a parameter list: `private SingletonClass() { }`. *(This is the Day-16 slide's code, verbatim.)*
- **"The constructor returns a reference to the existing object."** → constructors return nothing, ever. `getInstance()` returns the reference, and after the first call the constructor is **never invoked again**.
- **Assuming the naive version is thread-safe** → two threads can both evaluate `instance == null` as true and each construct an object. You now have two "singletons."
- **Confusing this with Spring's `singleton` bean scope** → Spring's means *one per IoC container*, not one per JVM, and Spring enforces it for you without a private constructor. See [[Bean Scopes]].

## Examples and Non-Examples

**Example:**
```java
ConnectionPool a = ConnectionPool.getInstance();
ConnectionPool b = ConnectionPool.getInstance();
System.out.println(a == b);   // true — same reference
```

**Non-Example:**
```java
public class ConnectionPool {
    public ConnectionPool() { }          // FALSE BELIEF: "getInstance() is what makes it a singleton"
    public static ConnectionPool getInstance() { return new ConnectionPool(); }
}
// A public constructor AND a fresh object per call — this is a singleton in name only.
```

## Recall Questions

#flashcards/java/design-patterns

What single keyword makes the Singleton pattern enforceable, and why?
?
private on the constructor — it is what prevents any other class from calling `new`. Without it, getInstance() is just a suggestion.

In a lazy singleton, how many times does the constructor body execute, and what returns the reference on later calls?
?
Once. getInstance() returns the cached reference on every later call; the constructor is never invoked again — constructors never return anything.

Why is the naive `if (instance == null)` singleton unsafe with threads?
?
Two threads can both see instance as null before either assigns, so each constructs an object — producing two instances of a "singleton."

How does Spring's singleton bean scope differ from the GoF Singleton pattern?
?
Spring's means one instance per IoC container (two containers = two instances) and is enforced by the container; the GoF pattern means one per JVM/classloader and is enforced by a private constructor.

## Mini Practice

1. Write `AppConfig` as a singleton holding a `String environment` field, with a getter. **Success criterion:** `AppConfig.getInstance() == AppConfig.getInstance()` prints `true`, and `new AppConfig()` from another class is a **compile error**.
2. Convert it to the holder idiom from Faded Practice. **Success criterion:** no `synchronized` keyword anywhere, and the constructor still runs only on first use (prove it with a `System.out.println` inside the constructor).

## Correctness Check

Ran the Java checklist from `Java/_refiner.md`:

- ✅ **Compiles** — both the corrected lazy version and the holder idiom were checked line by line. The slide's `private SingletonClass{` does **not**; that error is now a Common Mistake.
- ✅ **`==` vs `.equals()`** — `a == b` is the *correct* test here: identity is exactly what the pattern guarantees. Using `.equals()` would prove nothing without an override.
- ➖ **Overloading / return type** — no overloads in this note. N/A.
- ➖ **Integer autobox cache** — N/A.
- ✅ **Holder idiom thread-safety** — rests on the JLS guarantee that class initialization is performed once, under a lock, by the JVM. Verified.

## Mistake Log

Log misses to [[Abstraction Polymorphism and Methods Mistake Log]] as: wrong output → minimal repro → misconception → recall-question form → fix.

## Links

- Contrast: [[Bean Scopes]] — Spring's singleton is a *different* guarantee
- Siblings: [[Factory Pattern]] · [[Proxy Pattern]]
- Related: [[01-Static-Variables-and-Methods]] · [[01-SOLID-Design-Principles]]
- Map: [[Design Principles MOC]]

---
type: concept
topic: design-principles
status: learning
difficulty: medium
aliases:
  - Proxy Pattern
  - Proxy
  - Lazy Loading
tags:
  - java
  - design-principles
  - design-patterns
  - proxy
---

# Proxy Pattern

%% Graduated via [[Refiner Spec (Graduate)]] using Java/_refiner.md + [[Java Concept Note]]. This pattern is not academic for you — it is the mechanism behind Spring's @Transactional and Spring Security, and behind the self-invocation trap in Spring/_refiner.md. %%

## What it is

A structural pattern that puts a **stand-in object** in front of a real one. The proxy implements the *same interface*, so callers can't tell the difference — and it decides what happens before, instead of, or after delegating to the real object.

## Why it matters

It's how you add behaviour to an object **without changing that object's code**: defer expensive construction until first use, check authorization before granting access, cache, log, or open a transaction. The caller stays oblivious.

## Syntax / Pattern

```java
Image image = new ProxyImage("photo.jpg");   // declared as the INTERFACE
image.display();                              // proxy decides what really happens
```

## Worked Example

```java
// 1. THE SHARED CONTRACT — proxy and real object are indistinguishable to callers
interface Image {
    void display();
}

// 2. THE REAL OBJECT — expensive to create
class RealImage implements Image {
    private final String filename;

    RealImage(String filename) {
        this.filename = filename;
        loadFromDisk();                       // the cost lives in the CONSTRUCTOR
    }
    private void loadFromDisk() { System.out.println("Loading " + filename); }

    @Override public void display() { System.out.println("Displaying " + filename); }
}

// 3. THE PROXY — same interface, defers construction to first actual use
class ProxyImage implements Image {
    private final String filename;
    private RealImage real;                   // deliberately not created yet

    ProxyImage(String filename) { this.filename = filename; }

    @Override public void display() {
        if (real == null) {                   // 4. build it once, on demand
            real = new RealImage(filename);
        }
        real.display();
    }
}
```

**Explain in plain English (EiPE):** creating the proxy costs nothing; the expensive load happens only if someone actually displays the image, and only the first time.

## Trace

**Predict every line of output before reading on:**
```java
Image image = new ProxyImage("photo.jpg");
System.out.println("--- created ---");
image.display();
image.display();
```
`___`

| Step | `real` on entry | Constructor runs? | Output |
|---|---|---|---|
| `new ProxyImage(...)` | — | no | *(nothing)* |
| `println` | — | — | `--- created ---` |
| 1st `display()` | `null` | **yes** | `Loading photo.jpg` then `Displaying photo.jpg` |
| 2nd `display()` | the object | no | `Displaying photo.jpg` |

**Actual output:**
```
--- created ---
Loading photo.jpg
Displaying photo.jpg
Displaying photo.jpg
```
The give-away is that `--- created ---` prints **before** `Loading` — proof the construction was deferred.

## Faded Practice

Turn this into a **protection** proxy that refuses unauthorized access. Fill the blank:

```java
@Override public void display() {
    if (______) { throw new SecurityException("Not permitted"); }
    if (real == null) { real = new RealImage(filename); }
    real.display();
}
```
> [!answer]- Answer
> `!user.canView(filename)` (any authorization check). The important part is *where* it sits: **before** the real object is constructed, so an unauthorized caller never causes the expensive load and never touches the real object at all.

## Common Mistakes

- **Proxy doesn't implement the same interface** → callers must know which one they hold, and the substitution that makes the pattern work is gone.
- **Declaring the variable as the concrete type** (`ProxyImage image = ...`) → works, but leaks the proxy into your types; declare it as `Image`.
- **Doing the expensive work in the proxy's constructor** → defeats the entire purpose. The proxy's constructor must stay cheap.
- **Expecting a proxy to intercept a *self*-call** → it can't. If the real object calls its own method internally, the call never leaves the object, so it never passes through the proxy. **This is exactly why Spring's `@Transactional` silently does nothing on self-invocation.**

## Examples and Non-Examples

**Example:**
```java
Image image = new ProxyImage("huge.png");   // no disk I/O yet
if (userWantsIt) image.display();            // cost paid only if needed
```
**Non-Example:**
```java
class ProxyImage implements Image {
    private final RealImage real;
    ProxyImage(String f) { this.real = new RealImage(f); }  // FALSE BELIEF: "the proxy just
    @Override public void display() { real.display(); }     // needs to wrap the object"
}
// Loads immediately on construction — a wrapper with no laziness and no control.
```

## Recall Questions

#flashcards/java/design-patterns

What must a proxy share with the object it stands in for, and why?
?
The same interface — that's what lets callers hold either one without knowing or caring which, so the proxy can be substituted transparently.

In a lazy-loading proxy, what proves the deferral actually happened?
?
Output ordering: work printed after the proxy is constructed but before display() is called appears BEFORE the real object's load message.

Why can a proxy never intercept a self-invocation?
?
The internal call never leaves the real object, so it never travels through the proxy — which is exactly why Spring's @Transactional does nothing when a class calls its own annotated method.

Name three jobs a proxy can do besides lazy loading.
?
Authorization checks before access, caching results, and cross-cutting concerns like logging or opening a transaction — all without modifying the real object's code.

## Mini Practice

1. Write a `Report` interface with `generate()`, a `RealReport` that prints `Crunching numbers...` in its constructor and `Report ready` in `generate()`, and a `ProxyReport` that defers construction. **Expected output** for construct-then-`generate()`-twice: `Crunching numbers...`, `Report ready`, `Report ready`.
2. Add a counter to the proxy so it reports how many times `generate()` was called. **Success criterion:** `RealReport`'s source is unchanged.

## Correctness Check

Ran the Java checklist from `Java/_refiner.md`:

- ✅ **Compiles** — interface, both implementors, `@Override` on the interface method (legal since Java 6), and the null-check field initialization are all valid.
- ✅ **Traced output exactly** — four lines, in the order shown; `--- created ---` precedes `Loading photo.jpg`, which is the whole demonstration.
- ➖ **`==` vs `.equals()`** — only `real == null` (a genuine reference check against `null`), which is correct usage.
- ➖ **Overloading / autobox cache** — N/A.
- ✅ **Self-invocation claim** — verified as the general proxy limitation and matches the `@Transactional` caveat in `Spring/_refiner.md`.

## Mistake Log

Log misses to [[Abstraction Polymorphism and Methods Mistake Log]] as: wrong output → minimal repro → misconception → recall-question form → fix.

## Links

- Why it matters in Spring: [[Spring MVC]] · [[Spring Security Filter Chain]]
- Depends on: [[Interfaces]] · [[Polymorphism]]
- Siblings: [[Singleton Pattern]] · [[Factory Pattern]]
- Map: [[Design Principles MOC]]

---
type: concept
topic: design-principles
status: learning
difficulty: medium
aliases:
  - Factory Pattern
  - Factory Method
  - Factory Method Pattern
  - Factory
tags:
  - java
  - design-principles
  - design-patterns
  - factory
---

# Factory Pattern

%% Graduated via [[Refiner Spec (Graduate)]] using Java/_refiner.md + [[Java Concept Note]]. Test surface, not a reference. %%

## What it is

A creational pattern that moves the decision of **which concrete class to instantiate** out of the calling code and into a dedicated factory. The caller asks for *a thing that can do X* and receives the right implementation for the context, without ever naming it.

## Why it matters

The caller depends only on the **interface**, so adding a new implementation means adding a class and one factory branch — no edits to any code that consumes it. That's the open/closed principle with a concrete mechanism behind it.

## Syntax / Pattern

```java
Vehicle v = VehicleFactory.forTerrain("water");   // caller never writes `new Boat()`
```

## Worked Example

```java
// 1. THE CONTRACT — everything the caller is allowed to know about
interface Vehicle {
    void travel();
}

// 2. THE VARIANTS — interchangeable behind that contract
class Boat implements Vehicle {
    @Override public void travel() { System.out.println("Sailing across water"); }
}
class Airplane implements Vehicle {
    @Override public void travel() { System.out.println("Flying through air"); }
}

// 3. THE FACTORY — the single place that knows the concrete types
class VehicleFactory {
    static Vehicle forTerrain(String terrain) {
        return switch (terrain) {
            case "water" -> new Boat();
            case "air"   -> new Airplane();
            default -> throw new IllegalArgumentException("No vehicle for: " + terrain);
        };
    }
}
```

**Explain in plain English (EiPE):** the caller says what conditions it faces and gets back something that works there, without knowing — or being able to depend on — which class it actually got.

## Trace

**Predict the output before reading on:**
```java
VehicleFactory.forTerrain("water").travel();
VehicleFactory.forTerrain("air").travel();
```
`___`

| Line | Factory returns | Static type of the expression | Method that runs | Output |
|---|---|---|---|---|
| 1 | `new Boat()` | `Vehicle` | `Boat.travel()` | `Sailing across water` |
| 2 | `new Airplane()` | `Vehicle` | `Airplane.travel()` | `Flying through air` |

**Actual:** `Sailing across water` then `Flying through air`. The static type is `Vehicle` both times — the **runtime object** selects the method, which is [[Polymorphism]] doing the work underneath.

## Faded Practice

Add a `Truck` for land travel. Fill both blanks:

```java
class Truck ______ Vehicle {
    @Override public void travel() { System.out.println("Driving on roads"); }
}
// inside forTerrain:
    case "land" -> ______;
```
> [!answer]- Answer
> `implements` and `new Truck()`. Note what you did **not** have to touch: no existing caller, no other variant, and not the `Vehicle` interface. That's the payoff.

## Common Mistakes

- **Returning the concrete type** (`static Boat forTerrain(...)`) → re-couples the caller to `Boat` and destroys the point. Return the **interface**.
- **Leaking `new` back into callers** — one `new Boat()` anywhere outside the factory and the pattern is no longer buying you anything for that call site.
- **Forgetting a `default` branch** → an unrecognized input silently returns `null`, and the failure surfaces as an `NullPointerException` far from the cause. Throw instead.
- **Confusing the three "factories"** → a *static helper* like this, the *Factory Method* pattern (subclasses override a creator method), and *Abstract Factory* (families of related products) are different things sharing a word.

## Examples and Non-Examples

**Example:**
```java
Vehicle v = VehicleFactory.forTerrain(conditions);   // depends on the abstraction
v.travel();
```
**Non-Example:**
```java
Vehicle v;
if (conditions.equals("water")) v = new Boat();      // FALSE BELIEF: "an if-chain of `new`
else v = new Airplane();                             // calls is the same thing"
// The decision is now duplicated at every call site — adding Truck means editing all of them.
```

## Recall Questions

#flashcards/java/design-patterns

What must a factory method's return type be, and what breaks if you return the concrete class?
?
The interface (or abstract parent). Returning the concrete class re-couples every caller to that implementation, which is exactly what the pattern exists to prevent.

What is the concrete benefit of a factory when you add a new implementation?
?
You add the class and one branch inside the factory — no existing caller changes. That's open/closed with a real mechanism.

Why is returning null for an unknown input worse than throwing?
?
The failure shows up later as a NullPointerException at some unrelated call site, far from the bad input that caused it.

What Java feature actually makes the factory's returned object behave correctly?
?
Polymorphism — the static type is the interface, but the runtime object selects which travel() implementation runs.

## Mini Practice

1. Write a `NotificationFactory` returning `EmailNotification` or `SmsNotification` behind a `Notification` interface with `send(String message)`. **Expected output** for `NotificationFactory.of("sms").send("hi")`: `SMS: hi`.
2. Add a third channel **without editing any calling code**. **Success criterion:** the only files you touch are the new class and the factory.

## Correctness Check

Ran the Java checklist from `Java/_refiner.md`:

- ✅ **Compiles** — `switch` *expressions* with `->` arms require **Java 14+**; your project targets **Java 17** (per your [[github actions]] workflow), so this is valid. A `throw` is a legal arm body in a switch expression.
- ✅ **Traced output** — `Sailing across water` / `Flying through air`, verified against the method bodies.
- ➖ **`==` vs `.equals()`** — the Non-Example uses `.equals()` for `String` comparison, which is correct; `==` there would compare references.
- ✅ **Overloading is not distinguished by return type** — relevant here: you could **not** create `forTerrain` twice differing only in returning `Boat` vs `Airplane`. That is precisely why the factory returns the shared interface instead.
- ➖ **Integer autobox cache** — N/A.

## Mistake Log

Log misses to [[Abstraction Polymorphism and Methods Mistake Log]] as: wrong output → minimal repro → misconception → recall-question form → fix.

## Links

- Depends on: [[Polymorphism]] · [[Interfaces]]
- Siblings: [[Singleton Pattern]] · [[Proxy Pattern]]
- Related: [[01-SOLID-Design-Principles]] — open/closed made concrete
- Map: [[Design Principles MOC]]

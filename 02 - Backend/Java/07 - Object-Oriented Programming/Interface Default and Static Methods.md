---
type: concept
topic: object-oriented-programming
status: learning
difficulty: medium
tags:
  - java
  - object-oriented-programming
  - interfaces
  - default-methods
---
# Interface Default and Static Methods

## What it is

Since **Java 8**, an interface can carry method bodies, not just signatures. Two kinds:

- A **default method** (`default`) is an *instance* method with a body. Implementing classes **inherit** it, can call it on their objects, and may **override** it.
- A **static method** (`static`) belongs to the **interface itself**. You call it through the interface name (`Interface.method()`). It is **not** inherited by implementing classes and is **not** available on their instances.

## Why it matters

Default methods let a library **add a method to an existing interface without breaking every class that already implements it** — the classic example is `Collection.stream()` and `List.sort()` bolted onto Java 8 collections. Static methods keep interface-related helpers and factories (`List.of`, `Comparator.comparing`) attached to the contract they belong to instead of a separate `*Utils` class.

## Syntax / Pattern

```java
interface Operations {
    default int add(int a, int b) { return a + b; }   // instance, inherited, overridable
    static int square(int n)      { return n * n; }   // interface-scoped, called via the name
}
```

## Worked Example
```java
interface Operations {
    default int add(int a, int b) {        // 1. default: has a body, inherited by implementers
        return a + b;
    }

    static int square(int n) {             // 2. static: belongs to the interface itself
        return n * n;
    }
}

class Calculator implements Operations {
    // 3. inherits add() unchanged; no need to write it
}

class LoudCalculator implements Operations {
    @Override
    public int add(int a, int b) {         // 4. overrides the default with its own version
        System.out.println("Adding " + a + " and " + b);
        return a + b;
    }
}

public class Main {
    public static void main(String[] args) {
        Calculator calc = new Calculator();
        System.out.println(calc.add(2, 3));          // inherited default -> 5

        LoudCalculator loud = new LoudCalculator();
        System.out.println(loud.add(4, 6));          // overridden -> prints, then 10

        System.out.println(Operations.square(5));    // static via interface name -> 25
    }
}
```

**Explain in plain English (EiPE):** one class reuses the interface's default `add` as-is, another swaps in its own version, and the static `square` is called on the interface — never on an object.

## Trace
**Predict the output first (write it before reading on):**  `___`

| Line | Statement | Which method runs | Output |
|---|---|---|---|
| 1 | `calc.add(2, 3)` | inherited default `Operations.add` | `5` |
| 2 | `loud.add(4, 6)` | overridden `LoudCalculator.add` | `Adding 4 and 6` then `10` |
| 3 | `Operations.square(5)` | interface static `square` | `25` |

**Actual output:**
```
5
Adding 4 and 6
10
25
```
`calc` never defined `add`, so the default supplied it; `loud` did, so its version won (dynamic dispatch). `square` runs only through `Operations.`, not through any object.

## Faded Practice
Fill the blank so the static method call compiles (the load-bearing decision):
```java
public class Main {
    public static void main(String[] args) {
        int r = ______.square(5);   // how do you call a static interface method?
        System.out.println(r);
    }
}
```
> [!answer]- Answer
> `Operations` — the **interface name**. A static interface method is not inherited, so `new Calculator().square(5)` does **not** compile (`cannot find symbol`). Reach it only through `Operations.square(5)`.

## Common Mistakes
- Calling a static interface method through an object → doesn't compile; use `Interface.name()`.
- Assuming a default method can't be overridden → it can; an `@Override` in the class replaces it.
- Ignoring the **diamond conflict**: if two implemented interfaces declare the *same* default signature, the class MUST override it, resolving with `InterfaceName.super.method()`.
- Forgetting the **"class wins" rule**: a concrete method inherited from a **superclass** always beats an interface default of the same signature.
- Treating a default method as a home for state → interfaces still hold no instance fields; a default can only compose other methods (via `this`).

## Examples and Non-Examples
**Example:**
```java
Calculator calc = new Calculator();
int sum = calc.add(2, 3);        // default method, called on an instance
int sq  = Operations.square(5);  // static method, called on the interface
```
**Non-Example:**
```java
Calculator calc = new Calculator();
int sq = calc.square(5);   // COMPILE ERROR: cannot find symbol
// FALSE BELIEF: "static interface methods are inherited like instance methods" -- they are not.
```

## Recall Questions
%% Review via the Spaced Repetition plugin (Cmd/Ctrl+P > "Review flashcards"), not by rereading. %%
#flashcards/java/interfaces

Why were default methods added in Java 8?
?
To evolve existing interfaces (e.g. add `stream()`/`sort()` to `Collection`/`List`) without breaking the classes already implementing them — the new method arrives with a working body.

Two implemented interfaces declare the same default method. What must the class do?
?
Override the method to resolve the conflict; inside it can delegate with `InterfaceA.super.method()` or `InterfaceB.super.method()`.

A class inherits a concrete method from its superclass AND a default of the same signature from an interface. Which runs?
?
The superclass method — the "class wins" rule: a class (or superclass) implementation always takes priority over an interface default.

## Mini Practice
1. Write a `Logger` interface with a `default void info(String msg)` that prints `[INFO] msg`, and a `static String timestamp()` returning a fixed string like `"T0"`. Call both from `main`. **Expected output:** the `[INFO] ...` line, plus the timestamp when you print it. (Predict, then run.)
2. Add a `LoudLogger implements Logger` that **overrides** `info` to prefix `!!!`. **Success criterion:** `LoudLogger` prints the `!!!` version while a plain implementer still prints the default.
3. Make a second interface `Auditor` with its own `default void info(String msg)`, then a class implementing **both**. **Success criterion:** it fails to compile until you override `info` and resolve with `Logger.super.info(msg)`.

## Mistake Log
When you miss one, add it to [[Abstraction Polymorphism and Methods Mistake Log]] as: wrong output → minimal repro → misconception → recall-question form → fix.

## Links
- Contrast: [[Abstract Classes]] (hold state + constructors) vs interface default methods (behaviour only, no instance fields)
- Map: [[Polymorphism MOC]]
- Related: [[Interfaces]] · [[20 Areas/Education/Obsidi Academy/Sessions/Java/Day 6 Jul 13/method overriding]] · [[Abstraction in Java]]
- Prerequisites: [[Interfaces]] · [[Polymorphism]]

---
type: concept
topic: methods
status: learning
difficulty: medium
tags:
  - java
  - methods
  - method-overloading
---
# Method Overloading

## What it is

Method overloading means declaring **several methods with the same name but different parameter lists** in the same class. The compiler tells them apart by their signatures and picks one **at compile time** based on the *declared (static) types* of the arguments you pass.

A parameter list counts as different if it differs by at least one of:

- **number** of parameters — `add(int, int)` vs `add(int, int, int)`
- **types** of parameters — `add(int, int)` vs `add(double, double)`
- **order** of parameter types — `log(int, String)` vs `log(String, int)`

Changing **only the return type** does **not** create a valid overload — the parameter lists must differ. (Access modifiers and `throws` clauses can't distinguish overloads either.)

## Why it matters

One operation name works with many input shapes, so callers learn a single verb (`add`, `print`, `valueOf`) instead of `addInts`, `addDoubles`, `addThree`. This is *ad-hoc* (compile-time) polymorphism — contrast the *runtime* dispatch of [[Method Overriding]]. Because selection happens at compile time from static types, the chosen overload is fixed once the code compiles.

## Syntax / Pattern

```java
public int add(int a, int b)            { return a + b; }
public double add(double a, double b)    { return a + b; }
public int add(int a, int b, int c)     { return a + b + c; }
// same name, different parameter lists → valid overloads
```

## Worked Example

```java
class Calculator {
    public int add(int a, int b) {              // 1. two ints
        return a + b;
    }
    public double add(double a, double b) {      // 2. two doubles
        return a + b;
    }
    public int add(int a, int b, int c) {        // 3. three ints
        return a + b + c;
    }
}

public class Main {
    public static void main(String[] args) {
        Calculator calc = new Calculator();
        System.out.println(calc.add(2, 3));      // 4. exact match: (int, int)
        System.out.println(calc.add(2.0, 3.0));  // 5. exact match: (double, double)
        System.out.println(calc.add(1, 2, 3));   // 6. only the 3-arg fits
        System.out.println(calc.add(2, 3.0));    // 7. int WIDENS to double
    }
}
```

**Explain in plain English (EiPE):** the compiler matches each `add(...)` call to the overload whose parameters best fit the argument types, widening `int` to `double` on line 7 because no exact `(int, double)` overload exists.

## Trace

**Predict the output first (write it before reading on):**  `___`

| Line | Call | Argument types | Overload selected | Output |
|---|---|---|---|---|
| 4 | `add(2, 3)` | `int, int` | `add(int, int)` | `5` |
| 5 | `add(2.0, 3.0)` | `double, double` | `add(double, double)` | `5.0` |
| 6 | `add(1, 2, 3)` | `int, int, int` | `add(int, int, int)` | `6` |
| 7 | `add(2, 3.0)` | `int, double` | `add(double, double)` (`2` widens to `2.0`) | `5.0` |

**Actual output:**
```
5
5.0
6
5.0
```
On line 7, `add(int, int)` is *not applicable* (you can't narrow `3.0` to `int`), so the compiler widens the `int` `2` to `double` and picks `add(double, double)`.

## Faded Practice

Make `print(...)` a valid overload of the `int` version below — fill the one load-bearing token:

```java
class Printer {
    void print(int value)     { System.out.println("int: " + value); }
    void print(______ value)  { System.out.println("text: " + value); }
}
```

> [!answer]- Answer
> Any parameter type other than `int` — e.g. `String`, `double`, `boolean`. The **parameter list must differ**. Repeating `print(int value)` with a different return type would fail to compile: return type alone cannot distinguish overloads.

## Common Mistakes

- Overloading by changing **only the return type** → parameter lists must differ; identical lists = compile error.
- Confusing overloading with [[Method Overriding]] → overloading is one class + compile-time selection; overriding is subclass + runtime dispatch.
- Expecting the **runtime** object type to pick the overload → overloading uses the *static/declared* type of each argument, decided at compile time.
- Writing overloads that are **ambiguous** (e.g. `f(int, long)` and `f(long, int)` called as `f(1, 2)`) → the compiler reports an ambiguity error.
- Piling on many near-identical overloads → sometimes distinct method names read more clearly than a wall of overloads.

## Examples and Non-Examples

**Example:**
```java
void store(int value)    {}
void store(String value) {}   // valid: parameter TYPE differs
```

**Non-Example:**
```java
int    calculate(int value) { return value; }
double calculate(int value) { return value; }
// FALSE BELIEF: "a different return type makes a valid overload"
// → identical parameter lists (int) ⇒ compile error, regardless of return type
```

## Recall Questions
%% Review via the Spaced Repetition plugin (Cmd/Ctrl+P > "Review flashcards"), not by rereading. %%
#flashcards/java/methods

Can a different return type alone create a valid overload?
?
No. If two methods have identical parameter lists, differing only in return type (or access modifier / `throws`) is a compile error.

Is overloading resolved at compile time or runtime, and using what information?
?
Compile time, using the *static/declared* types of the arguments. (Contrast [[Method Overriding]], which is resolved at runtime by the object's actual type.)

How is overloading different from overriding?
?
Overloading: same name, different parameter lists, same class, chosen at compile time (ad-hoc polymorphism). Overriding: same signature, subclass replaces a parent method, chosen at runtime (dynamic dispatch).

## Mini Practice

1. Give a `Shape` class overloaded `area` methods: `area(double side)` (square), `area(double w, double h)` (rectangle), and `area(int radius)`-style circle. Call each. **Success criterion:** each call resolves to a different overload; predict the three results before running.
2. Write a `User` class with three constructors — zero, one (`name`), and two (`name`, `age`) parameters. Build a `User` each way. **Success criterion:** all three compile and construct distinct objects.
3. Write one *invalid* overload (same parameter list, different return type). **Expected output:** a compile error; state in one line why it fails.

## Mistake Log

Log misses to [[Abstraction Polymorphism and Methods Mistake Log]] as: wrong output → minimal repro → misconception → recall-question form → fix.

## Links

- Contrast: [[Method Overriding]] (runtime, dynamic dispatch) vs Method Overloading (compile time, static types)
- Map: [[Polymorphism MOC]] · [[Java MOC]]
- Related: [[Polymorphism]]
- Prerequisites: [[Defining and Calling Methods]] · [[Java Data Types]]

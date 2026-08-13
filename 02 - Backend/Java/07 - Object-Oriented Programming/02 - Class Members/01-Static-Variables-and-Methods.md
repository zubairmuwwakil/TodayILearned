---
type: concept
topic: object-oriented-programming
status: learning
difficulty: easy
tags:
  - java
  - object-oriented-programming
  - static
  - class-members
  - oop
---
# Static Variables and Methods

## What it is

A `static` member belongs to the **class itself**, not to any one object. There is exactly **one copy per loaded class**, shared by every instance — instead of a fresh copy inside each object.

You access it through the class name (`ClassName.member`), and a static method runs **without a current object**, so it has no `this`.

## Why it matters

Use `static` for state or behaviour that logically belongs to the class as a whole, not to a particular instance:

- utility methods (`Math.max`, `Integer.parseInt`)
- constants (`static final`)
- factory methods
- shared counters
- the `main` entry point

Marking these `static` says "no object needed" — the concept lives at the class level.

## Syntax / Pattern

```java
public class ClassName {
    public static int staticVariable;      // one per class

    public static void staticMethod() {    // no object required
        // logic
    }
}
```

Call through the class name:

```java
ClassName.staticVariable;
ClassName.staticMethod();
```

Calling a static member through an *object* (`obj.staticMethod()`) compiles, but it is misleading and should be avoided.

## Worked Example: Object Counter

```java
public class Person {
    // 1. ONE shared counter for the whole class (not per object)
    private static int personCount = 0;

    private final String name;              // 2. per-object state, unique to each instance

    public Person(String name) {
        this.name = name;
        personCount++;                      // 3. every construction bumps the shared count
    }

    public static int getPersonCount() {    // 4. read shared state without any object
        return personCount;
    }

    public String getName() {
        return name;
    }
}
```

```java
public class Main {
    public static void main(String[] args) {
        System.out.println(Person.getPersonCount());   // before any objects exist

        Person first = new Person("Ava");
        Person second = new Person("Liam");

        System.out.println(Person.getPersonCount());
        System.out.println(first.getName());
        System.out.println(second.getName());
    }
}
```

**Explain in plain English (EiPE):** one class-level counter tracks how many `Person` objects have ever been created, while each object still carries its own `name`.

## Trace

**Predict the output first (write it before reading on):**  `___`

| Line | Statement | `personCount` | Output |
|---|---|---|---|
| 1 | `System.out.println(Person.getPersonCount());` | `0` | `0` |
| 2 | `Person first = new Person("Ava");` | `0 → 1` | — |
| 3 | `Person second = new Person("Liam");` | `1 → 2` | — |
| 4 | `System.out.println(Person.getPersonCount());` | `2` | `2` |
| 5 | `System.out.println(first.getName());` | `2` | `Ava` |
| 6 | `System.out.println(second.getName());` | `2` | `Liam` |

**Actual output:**

```text
0
2
Ava
Liam
```

Both objects share the one class-level counter; each keeps its own `name`.

## Static Context Rules

A static method has no current object, so it has no `this`. That constrains what it can touch directly.

**Can access static fields directly:**

```java
public class Example {
    private static int count;

    public static void increment() {
        count++;                       // fine — static reaching static
    }
}
```

**Cannot access instance fields directly** (no object to read them from):

```java
public class Example {
    private int value;

    public static void showValue() {
        System.out.println(value);     // compile-time error: no implicit instance
    }
}
```

**Can access instance fields through an explicitly passed object:**

```java
public class Example {
    private int value;

    public Example(int value) { this.value = value; }

    public static void showValue(Example example) {
        System.out.println(example.value);   // fine — explicit object, not an implicit `this`
    }
}
```

> [!tip] Why `main` is static
> `public static void main(String[] args)` — the JVM needs an entry point *before* the program has created any application objects, so it calls `main` through the class rather than an instance.

## Static vs Instance

| Feature | Static member | Instance member |
|---|---|---|
| Belongs to | class | object |
| Typical call | `Math.random()` | `person.getName()` |
| Number of copies | one per loaded class | one per object |
| Has `this` | no | yes |
| Directly accesses instance fields | no | yes |
| Directly accesses static fields | yes | yes |

## Static Constants

```java
public static final double TAX_RATE = 0.13;
```

- `static` — belongs to the class (one shared copy)
- `final` — cannot be reassigned
- convention — `UPPER_SNAKE_CASE` for constant names

## Faded Practice

Fill the blank so a single counter is shared by every `Person` (the load-bearing decision):

```java
public class Person {
    private ______ int personCount = 0;   // which modifier makes ONE counter shared by all objects?

    public Person() { personCount++; }

    public static int getPersonCount() { return personCount; }
}
```

> [!answer]- Answer
> `static`. It makes a single class-level field shared by all instances. Remove it and each `Person` gets its own `personCount` (always `1` right after construction) — and the `static` getter would no longer compile, since it cannot reach an instance field.

## Common Mistakes

- Treating a static field like per-object state → it is **one value shared by every instance**; changing it via one object changes it for all.
- Using `this` in a static method → there is no current object, so there is no `this`.
- Reading an instance field directly from a static method → pass the object explicitly (`obj.field`); there is no implicit instance.
- Calling a static member through an object (`obj.staticMethod()`) → legal but misleading; call it via the class name (`ClassName.staticMethod()`).
- Making a method static just to skip creating an object → keep behaviour that depends on object state as an instance method.
- Public mutable static fields → hidden global state that is hard to test; prefer `private static final` constants.

## Examples and Non-Examples

**Example (good static use):**

```java
double area = Math.PI * r * r;        // constant + stateless math, no object needed
int n = Integer.parseInt("42");       // pure helper, belongs to the class
```

**Non-Example:**

```java
class Player {
    static int score;                 // FALSE BELIEF: "static gives each object its own score"
}

Player a = new Player();
Player b = new Player();
a.score = 10;
b.score = 20;
System.out.println(a.score);          // 20, not 10 — there is ONE shared score
```

A `static` field is not per-object storage; the two players write to the *same* field.

## Recall Questions
%% Review via the Spaced Repetition plugin (Cmd/Ctrl+P > "Review flashcards"), not by rereading. %%
#flashcards/java/static

What does a `static` member belong to?
?
The class itself — one copy per loaded class — not any individual object.

Why does a static method have no `this`?
?
It is invoked on the class with no current object bound to it, so there is no instance for `this` to refer to.

`static` vs `final` — what does each guarantee?
?
`static` = one shared class-level copy; `final` = cannot be reassigned. `static final` combines both, the usual form for constants.

## Mini Practice

Build a `BankAccount` class with a `static accountCount`, an instance `balance`, a constructor that increments `accountCount`, a static getter `getAccountCount()`, and an instance getter `getBalance()`. Predict each output, then run.

1. Print `BankAccount.getAccountCount()` *before* creating any account. **Expected output:** `0` — proof the counter lives on the class, not an object.
2. Open three accounts, then print `BankAccount.getAccountCount()`. **Expected output:** `3` — the shared count reflects every construction.
3. Set the counter through one instance (`a.accountCount = 99;`) and read it through another (`b.accountCount`). **Expected output:** `99` — one shared field, not per-object. Then switch both accesses to `BankAccount.accountCount` to see why class-name access reads more clearly.

## Mistake Log

When you miss one, log it to [[Java Fundamentals Mistakes]] as: wrong output → minimal repro → misconception → recall-question form → fix.

## Links

- Contrast: [[Instance Variables and Methods]] (per-object state) vs `static` (class-level, no `this`)
- Map: [[Java MOC]]
- Related: [[Interface Default and Static Methods]] · [[01-SOLID-Design-Principles]]
- Prerequisites: [[classes and objects]] · [[02-Object-Superclass]]

---
type: concept
topic: object-oriented-programming
status: learning
difficulty: medium
aliases:
  - Inheritance and Constructors
tags:
  - java
  - oop
  - inheritance
  - constructors
  - super
  - constructor-chaining
---
# Inheritance and Constructors

## What it is

When you create a subclass object, its state is initialized by a **chain of constructors**, one per level of the hierarchy: the superclass constructors set up the inherited "parent slice" first, then the subclass constructor initializes the fields it adds. Two rules define the whole topic:

- **Constructors are not inherited.** A subclass does not receive its parent's constructors; it must declare its own.
- **The parent is built before the child.** Java runs the superclass constructor to completion before the subclass constructor *body* executes.

Private superclass fields still live inside the subclass object — the subclass just cannot touch them directly; it reaches them through the parent's constructor and inherited getters.

## Why it matters

A subclass extends a parent, so it can only be valid if the parent part is already valid. Java guarantees this by forcing every subclass constructor to run a superclass constructor first (explicitly via `super(...)`, or implicitly via an inserted `super()`). That ordering is what lets you rely on inherited state being fully set up before your own code runs.

## Syntax / Pattern

```java
public class Employee extends Person {

    public Employee(String name, int id) {
        super(name);          // MUST be the first statement; builds the Person slice
        this.id = id;         // then initialize this class's own fields
    }
}
```

A constructor's first statement is one of: `super(args)` (delegate to a parent constructor), `this(args)` (delegate to another constructor in the *same* class), or — if you write neither — an implicit `super()` the compiler inserts for you.

## Worked Example

```java
public class Person {
    private final String name;

    public Person() {
        this("Unknown");                 // 1. delegate to the other constructor (same class)
    }

    public Person(String name) {
        this.name = name;                // 2. set inherited state
        System.out.println("Person constructor");
    }

    public String getName() {
        return name;
    }
}
```

```java
public class Employee extends Person {
    private final int employeeId;

    public Employee(String name, int employeeId) {
        super(name);                     // 3. run Person(String) FIRST
        this.employeeId = employeeId;    // 4. then this class's own field
        System.out.println("Employee constructor");
    }

    public int getEmployeeId() {
        return employeeId;
    }
}
```

```java
public class Main {
    public static void main(String[] args) {
        Employee employee = new Employee("Maya", 501);   // 5. triggers the whole chain

        System.out.println(employee.getName());          // inherited getter
        System.out.println(employee.getEmployeeId());
    }
}
```

**Explain in plain English (EiPE):** constructing one `Employee` runs a top-down chain — `Object` → `Person` → `Employee` — so the parent slice is fully initialized before the child's constructor body adds its own field.

## Trace

**Predict the output first (write it before reading on):**  `___`

| Line | Statement / event | `name` | `employeeId` | Output |
|---|---|---|---|---|
| 1 | `new Employee("Maya", 501)` — enter `Employee` ctor | — | — | — |
| 2 | `super(name)` enters `Person("Maya")` (its implicit `super()` runs `Object` first) | — | — | — |
| 3 | `Person`: `this.name = name` | `"Maya"` | — | — |
| 4 | `Person`: `println("Person constructor")` | `"Maya"` | — | `Person constructor` |
| 5 | back in `Employee`: `this.employeeId = employeeId` | `"Maya"` | `501` | — |
| 6 | `Employee`: `println("Employee constructor")` | `"Maya"` | `501` | `Employee constructor` |
| 7 | `println(employee.getName())` | `"Maya"` | `501` | `Maya` |
| 8 | `println(employee.getEmployeeId())` | `"Maya"` | `501` | `501` |

**Actual output:**
```text
Person constructor
Employee constructor
Maya
501
```
The parent constructor prints before the child's body ever runs — construction is top-down, even though you called `new Employee(...)`.

## Construction Rules

Four rules decide whether a hierarchy even compiles. Keep them straight and constructor errors stop being mysterious.

**Execution order** is always most-general → most-specific:
```text
Object  →  Person  →  Employee
```

**Implicit `super()`** — if a constructor does not start with `this(...)` or `super(...)`, the compiler inserts `super();` as the first statement:
```java
public Employee() {
    // compiler inserts super();  ← needs an accessible Person() to succeed
}
```

**Default constructor** — the compiler generates a no-arg constructor **only when the class declares no constructors at all**:
```java
public class Person { }               // gets a free Person()
public class Person { Person(String n){} }   // gets NOTHING extra — no Person()
```

**`this(...)` vs `super(...)`** — each must be the *first* statement, so a constructor can use one or the other, never both directly. A `this(...)` chain must eventually reach a constructor that calls `super(...)`, so every chain still terminates at `Object`. (Two constructors that call `this(...)` on each other create infinite recursion — a compile error.)

## Faded Practice

`Person` declares only a parameterized constructor. Fill the blank so `Employee` compiles (the load-bearing line):

```java
public class Person {
    private final String name;
    public Person(String name) { this.name = name; }   // no no-arg constructor
}

public class Employee extends Person {
    private final int employeeId;

    public Employee(int employeeId) {
        ______;                     // Person has no Person() — what must come first?
        this.employeeId = employeeId;
    }
}
```

> [!answer]- Answer
> `super("Unknown")` (any `String` argument). Because `Person` declares only `Person(String)`, the compiler generates **no** `Person()`, so the implicit `super()` has nothing to call and fails. You must call `super(<String>)` explicitly, as the first statement.

## Common Mistakes

- Believing constructors are inherited → they are not; each class declares its own, and a subclass cannot "reuse" a parent's constructor except by calling it via `super(...)`.
- Assuming Java always supplies a no-arg constructor → it does so only when a class declares *zero* constructors.
- Putting a statement before `super(...)` (or `this(...)`) → compile error; the delegating call must be the **first** statement.
- Expecting a subclass constructor to run before the superclass finishes → construction is top-down: parent completes first, always.
- Reaching for private superclass fields directly → not accessible; go through the parent constructor or an inherited getter.
- Writing two constructors that call `this(...)` on each other → recursive constructor invocation, rejected at compile time.

## Examples and Non-Examples

**Example:**
```java
class Employee extends Person {
    Employee(String name, int id) {
        super(name);          // legal: first statement, builds the Person slice
        this.id = id;         // then the subclass's own field
    }
}
```

**Non-Example:**
```java
class Person {
    Person(String name) { }             // parent's ONLY constructor
}
class Employee extends Person { }       // Employee declares no constructor of its own

// FALSE BELIEF: "Employee inherits Person(String), so new Employee("Maya") works"
Employee e = new Employee("Maya");      // compile error: no Employee(String) exists
```
Constructors are not inherited: `Employee`'s only constructor is the generated no-arg one, so there is nothing that accepts a `String`.

## Recall Questions
%% Review via the Spaced Repetition plugin (Cmd/Ctrl+P > "Review flashcards"), not by rereading. %%
#flashcards/java/inheritance-constructors

Are constructors inherited by a subclass?
?
No. Each class declares its own constructors; a subclass reuses a parent constructor only by calling it with `super(...)`.

Why must the superclass constructor run before the subclass constructor body?
?
A subclass extends the parent, so the inherited (parent) state must be fully initialized before the subclass can safely build on top of it — construction is top-down.

When does Java generate a default no-argument constructor?
?
Only when the class declares no constructors at all. Declaring even one constructor suppresses the free no-arg one.

## Mini Practice

1. Build `Account` with a private `owner` and a parameterized constructor, and `SavingsAccount extends Account` with a private `interestRate`, its own parameterized constructor delegating with `super(owner)`, and getters for both fields. Print each field on its own line. **Success criterion:** both fields print correctly and the parent constructor runs before the child — verify by adding a `println` to each constructor and predicting the order before you run.
2. Remove `Account`'s no-arg constructor (leave only the parameterized one) and try a `SavingsAccount` constructor that does *not* call `super(...)`. **Expected result:** a compile error about a missing `Account()`. Predict the message, then reproduce it — this cements the implicit-`super()` rule.

## Mistake Log

When you miss one, log it to [[Abstraction Polymorphism and Methods Mistake Log]] as: wrong output → minimal repro → misconception → recall-question form → fix.

## Links
- Contrast: `super(...)` (delegate to the parent constructor) vs `this(...)` (delegate within the same class)
- Map: [[Inheritance MOC]]
- Related: [[01-The-Super-Keyword]] · [[02-Object-Superclass]] · [[Constructors in Java]] · [[Polymorphism]]
- Prerequisites: [[Inheritance in Java]] · [[Constructors in Java]]

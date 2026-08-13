---
type: concept
topic: object-oriented-programming
status: learning
difficulty: easy
tags:
  - java
  - object-oriented-programming
  - encapsulation
  - inheritance
---
# Inherited Getters and Setters

## What it is

A subclass **inherits** the superclass's members, but `private` fields are **not directly accessible** from the subclass. The field is part of the object at runtime, yet `private` access blocks the subclass from naming it.

To reach that private state, the subclass calls the superclass's **inherited public or protected accessors**:
- a **getter** returns a field value (controlled read),
- a **setter** changes a field value, usually after validation (controlled write).

## Why it matters

`private` fields keep an object's internal state encapsulated. Routing every read and write through accessors lets a class:
- validate changes before they take effect,
- preserve invariants (class rules that must always hold),
- hide the internal representation so it can change later,
- grant read-only, write-only, or read-write access as needed,
- support inheritance **without** leaking fields as public.

## Syntax / Pattern

```java
class Parent {
    private Type field;
    public Type getField() { return field; }                 // controlled read
    public void setField(Type field) { this.field = field; }  // controlled write
}

class Child extends Parent {
    void use() {
        setField(value);   // OK: inherited setter
        getField();        // OK: inherited getter
        // field = value;  // ERROR: private in Parent, not directly accessible
    }
}
```

## Worked Example

```java
class Person {
    private String name;                          // 1. private state: subclasses can't touch it directly

    public String getName() {                     // 2. inherited read access
        return name;
    }

    public boolean setName(String name) {         // 3. inherited write access WITH validation
        if (name == null || name.isBlank()) {
            return false;                         //    reject invalid input, report failure
        }
        this.name = name;
        return true;
    }
}

class Employee extends Person {
    private final int employeeId;

    public Employee(int employeeId, String name) {
        this.employeeId = employeeId;
        if (!setName(name)) {                      // 4. reuse the inherited setter — no direct field access
            throw new IllegalArgumentException("Name cannot be blank");
        }
    }

    public void printDetails() {
        System.out.println(employeeId + ": " + getName());  // 5. inherited getter reads the private field
    }
}

public class Main {
    public static void main(String[] args) {
        Employee employee = new Employee(101, "Andrea");
        employee.printDetails();                  // 6. prints "101: Andrea"
    }
}
```

**Explain in plain English (EiPE):** `Employee` sets and reads its inherited private `name` only through `Person`'s public setter and getter, so validation runs and the field is never touched directly.

## Trace

**Predict the output first (write it before reading on):**  `___`

| Line | Statement | `employeeId` | `name` | Output / Result |
|---|---|---|---|---|
| 1 | `this.employeeId = 101;` | `101` | `null` | — |
| 2 | `setName("Andrea")` checks input | `101` | `null` | not null/blank → proceed |
| 3 | `this.name = name;` (inside setter) | `101` | `"Andrea"` | setter returns `true` |
| 4 | `if (!setName(...))` → `if (!true)` | `101` | `"Andrea"` | `false` → no exception |
| 5 | `printDetails()` calls `getName()` | `101` | `"Andrea"` | returns `"Andrea"` |
| 6 | `println(101 + ": " + "Andrea")` | `101` | `"Andrea"` | `101: Andrea` |

**Actual output:** `101: Andrea`. The subclass never mentioned `name`; the inherited setter and getter did all the touching.

## Faded Practice

Fill the blank so `Employee` can read its inherited private `name` (the load-bearing decision):
```java
class Employee extends Person {
    private final int employeeId;

    public void printDetails() {
        System.out.println(employeeId + ": " + ______);  // name is private in Person — how does Employee read it?
    }
}
```
> [!answer]- Answer
> `getName()` — the inherited public getter. `name` itself is `private` in `Person`, so writing `name` here would be a compile error (`name has private access in Person`); the subclass must go through an inherited accessor.

## Common Mistakes

- Making a field `public` just so a subclass can reach it → breaks encapsulation; keep it `private` and inherit the accessors instead.
- Naming a `private` superclass field directly in the subclass → compile error; the field is inherited into the object but not accessible by name.
- Writing setters that accept invalid state without checking → validate first (return `false` or throw), then assign.
- Adding a setter for a value that should never change → make it `final` and set it once in the constructor.
- Assuming every field needs both a getter and a setter → expose only the access a class actually needs (often read-only).
- Forgetting `this.field` when a parameter shadows a field → the assignment writes the parameter to itself and the field stays unchanged.

## Examples and Non-Examples

**Example:**
```java
class Employee extends Person {
    void printName() {
        System.out.println(getName());  // OK: inherited public getter reaches the private field
    }
}
```

**Non-Example:**
```java
class Employee extends Person {
    void printName() {
        System.out.println(name);   // compile error: name has private access in Person
        // FALSE BELIEF: "a subclass inherits private fields, so it can read them by name"
    }
}
```
The private field *is* part of the object, but `private` access confines its name to `Person`; the subclass reaches it only through an inherited getter/setter.

## Recall Questions
%% Review via the Spaced Repetition plugin (Cmd/Ctrl+P > "Review flashcards"), not by rereading. %%
#flashcards/java/encapsulation

Why can a subclass NOT read a `private` superclass field by name?
?
`private` access confines the field's name to the declaring class. The field is inherited into the object, but the subclass cannot reference it directly — it must use an inherited public/protected accessor.

What advantage does validation inside a setter give you?
?
It centralizes the invariant: every write — from the class, a subclass, or outside code — passes the same check, so the object can never hold invalid state.

## Mini Practice

1. Create a `BankAccount` parent with a `private double balance` and controlled `deposit(double)` / `withdraw(double)` methods that reject non-positive or overdrawing amounts. **Success criterion:** `withdraw` cannot drive `balance` below `0`, and no caller can set `balance` directly.
2. Create a `SavingsAccount extends BankAccount` that adds `addInterest(double rate)` using only the inherited methods (no direct field access). **Expected output:** after `deposit(100)` then `addInterest(0.10)`, `getBalance()` returns `110.0`. (Predict it, then run.)
3. In one sentence, explain why exposing `balance` as a `public` field would make the overdraw check in step 1 impossible to enforce.

## Mistake Log

Log misses to [[Abstraction Polymorphism and Methods Mistake Log]] as: wrong output → minimal repro → misconception → recall-question form → fix.

## Links

- Contrast: [[Access Modifiers]] — `protected` field (direct subclass access) vs `private` field (accessor-only)
- Map: [[Java MOC]]
- Related: [[Abstraction in Java]] · [[Abstract Classes]] · [[20 Areas/Education/Obsidi Academy/Sessions/Java/Day 6 Jul 13/method overriding]] · [[Interfaces]]
- Prerequisites: [[02-Object-Superclass]] · [[01-The-Super-Keyword]] · [[03-Inheritance-and-Constructors]]

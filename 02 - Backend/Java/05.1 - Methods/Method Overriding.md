---
type: concept
topic: methods
status: learning
difficulty: medium
tags:
  - java
  - methods
  - method-overriding
---
# Method Overriding

## What it is

Method overriding is when a subclass **replaces the implementation of an inherited instance method** with its own. The two methods share the same *signature*, so at runtime Java's dynamic dispatch runs the subclass version whenever the object is of that subclass — even through a parent reference.

To count as an override, the subclass method must have:

- the **same name**
- the **same parameter list** (order and types)
- the **same return type, or a covariant** (subtype) return type
- access that is the **same or wider** — you may not narrow visibility (e.g. `public` → `protected`)

Only inherited, non-`static`, non-`private`, non-`final` **instance** methods can be overridden.

## Why it matters

Overriding lets each subclass specialise inherited behaviour while every caller keeps using the same parent contract. It is the engine behind **runtime [[Polymorphism]]**: `parent.method()` runs the right version automatically, so new subclasses slot in without editing existing code.

## Syntax / Pattern

```java
class Parent {
    public void greet() { System.out.println("Hello"); }
}

class Child extends Parent {
    @Override                                  // compiler verifies a real override exists
    public void greet() { System.out.println("Go away"); }
}
```

`@Override` is optional but strongly recommended: if your signature doesn't actually match a parent method, the compiler fails loudly instead of silently creating a new method.

## Worked Example
```java
class Employee {
    public String describeRole() { return "General employee"; }
}
class Developer extends Employee {
    @Override public String describeRole() { return "Writes and maintains software"; }
}
class Manager extends Employee {
    @Override public String describeRole() { return "Leads a team"; }
}

public class Main {
    public static void main(String[] args) {
        // 1. hold a Developer through an Employee reference
        Employee employee = new Developer();
        System.out.println(employee.describeRole());
        // 2. re-point the SAME reference at a Manager
        employee = new Manager();
        System.out.println(employee.describeRole());
    }
}
```

**Explain in plain English (EiPE):** the identical call `employee.describeRole()` returns different text because dispatch follows the object's real class, not the `Employee` reference type.

## Trace
**Predict the output first (write it before reading on):**  `___`

| Line | Statement | `employee` compile-time type | `employee` runtime object | Output |
|---|---|---|---|---|
| 1 | `Employee employee = new Developer();` | `Employee` | `Developer` | — |
| 2 | `System.out.println(employee.describeRole());` | `Employee` | `Developer` | `Writes and maintains software` |
| 3 | `employee = new Manager();` | `Employee` | `Manager` | — |
| 4 | `System.out.println(employee.describeRole());` | `Employee` | `Manager` | `Leads a team` |

**Actual output:**
```
Writes and maintains software
Leads a team
```
The reference type stayed `Employee` throughout; only the runtime object changed, and *that* selected the override.

## Faded Practice
Fill the blank so `Manager` actually overrides the inherited method (the load-bearing decision):
```java
class Manager extends Employee {
    @Override
    public String ______() {   // what makes @Override accept this as an override?
        return "Leads a team";
    }
}
```
> [!answer]- Answer
> `describeRole` — the name must match the inherited signature **exactly**. Rename it (e.g. `describeManager`) and `@Override` fails to compile because no parent method matches; drop `@Override` too and you'd silently create a brand-new method that never runs through an `Employee` reference.

## Common Mistakes
- Changing the parameter list and calling it overriding → different parameters make it an **overload** ([[50 Resources/Software Engineering/02 - Backend/Java/05.1 - Methods/Method Overloading]], compile-time); the parent version still runs through a parent reference.
- Narrowing access (`public` → `protected`/private) → an override may only **keep or widen** visibility, never reduce it; the compiler rejects it.
- Expecting to override a `private` method → `private` methods aren't inherited, so a same-named subclass method is a separate method, not an override.
- Trying to override a `final` method → `final` forbids overriding; it's a compile error.
- Treating `static` method **hiding** as overriding → static methods are resolved by the *reference type* at compile time (no dynamic dispatch).
- Changing to an unrelated return type → only **covariant** (subtype) returns are allowed; any other change fails to compile.
- Omitting `@Override` → a typo silently spawns a new method instead of overriding, and the parent's version keeps running.

## Examples and Non-Examples
**Example (covariant return type is a valid override):**
```java
class Employee {
    public Employee copy() { return new Employee(); }
}
class Developer extends Employee {
    @Override
    public Developer copy() { return new Developer(); } // Developer IS-A Employee → legal
}
```
**Non-Example:**
```java
class Developer extends Employee {
    public String describeRole(String extra) {          // different parameter list
        return "Writes software: " + extra;
    }
    // FALSE BELIEF: "changing the parameters still overrides the parent method"
    // Reality: this OVERLOADS. Employee.describeRole() is untouched and still runs
    // when called through an Employee reference with no argument.
}
```

## Recall Questions
%% Review via the Spaced Repetition plugin (Cmd/Ctrl+P > "Review flashcards"), not by rereading. %%
#flashcards/java/method-overriding

Which parts of a method must match for it to override a parent method?
?
Same name and same parameter list; the return type must be identical or covariant (a subtype), and access must be the same or wider.

Can an overriding method return a subtype of the original return type?
?
Yes — covariant return types are allowed (e.g. parent returns `Employee`, override returns `Developer`). Any non-subtype return change is a compile error.

Why should you add `@Override`?
?
The compiler verifies a real override exists, catching typos and signature mismatches that would otherwise silently create a new, never-dispatched method.

## Mini Practice
1. Create `Message` with `format()` returning `"Generic message"`; override it in `EmailMessage` (`"Email: hi"`) and `TextMessage` (`"Text: hi"`). Store all three in a `Message[]`, loop, and print each `format()`. **Expected output:** three distinct lines, one per subclass override. (Predict them, then run.)
2. In `EmailMessage`, try declaring the override as `protected String format()`. **Success criterion:** it fails to compile — proving an override cannot narrow visibility. Widen the parent instead and watch it compile.
3. Give `Message` a `Message copy()` and override it in `EmailMessage` with return type `EmailMessage`. **Success criterion:** it compiles (covariant return); change the return type to `String` and confirm it now fails.

## Mistake Log
When you miss one, log it to [[Abstraction Polymorphism and Methods Mistake Log]] as: wrong output → minimal repro → misconception → recall-question form → fix.

## Links
- Contrast: [[50 Resources/Software Engineering/02 - Backend/Java/05.1 - Methods/Method Overloading]] (compile-time, same name / different params) vs Method Overriding (runtime, same signature)
- Map: [[Polymorphism MOC]]
- Related: [[Polymorphism]] · [[Abstract Classes]] · [[Interfaces]] · [[Inherited Getters and Setters]]
- In practice: [[03 - List Interface and Polymorphism]]
- Prerequisites: [[01-The-Super-Keyword]] · [[02-Object-Superclass]]

---
type: concept
topic: object-oriented-programming
status: learning
difficulty: medium
tags:
  - java
  - object-oriented-programming
  - abstract-classes
---
# Abstract Classes

## What it is

An abstract class is a class marked `abstract` that **cannot be instantiated on its own** — it exists to be extended. It sits between "fully written class" and "pure contract": it can hold **fields, constructors, and concrete methods** (shared, ready-to-use behaviour) *and* declare **abstract methods** (a header with no body) that every concrete subclass must implement.

An abstract method says *"this behaviour is required, but I won't decide how"* — the concrete subclass supplies the body. An abstract class need **not** contain any abstract methods; declaring the class `abstract` alone is enough to forbid `new`.

## Why it matters

It lets a family of related classes **share code and state through a common base type** while still forcing each member to fill in the parts that must differ. You write the common logic once, guarantee at compile time that no subclass forgets a required method, and gain a shared reference type for [[Polymorphism]] — all without ever creating a meaningless "generic" instance.

## Syntax / Pattern

```java
public abstract class Parent {
    public void shared() {                 // concrete: inherited as-is
        System.out.println("Shared behaviour");
    }
    public abstract void required();       // abstract: no body, subclass must supply one
}

class Child extends Parent {
    @Override
    public void required() {               // obligation fulfilled
        System.out.println("Child behaviour");
    }
}
```

## Worked Example
```java
abstract class Vehicle {
    private final int wheels;                    // 1. shared state every vehicle has

    public Vehicle(int wheels) {                 // 2. constructor runs via super(...)
        this.wheels = wheels;
    }

    public int getWheels() { return wheels; }    // 3. reusable concrete method

    public abstract void move();                 // 4. contract each subclass must fulfil

    public void stop() {                         // 5. shared default behaviour
        System.out.println("Vehicle stopped");
    }
}

class Bicycle extends Vehicle {
    public Bicycle() { super(2); }               // 6. push state up to the abstract parent

    @Override
    public void move() {                         // 7. supply the required implementation
        System.out.println("Pedalling on " + getWheels() + " wheels");
    }
}

public class Main {
    public static void main(String[] args) {
        Vehicle vehicle = new Bicycle();         // 8. abstract reference, concrete object
        vehicle.move();
        vehicle.stop();
    }
}
```

**Explain in plain English (EiPE):** `Bicycle` inherits ready-made state and a `stop()` method from `Vehicle`, is forced to define its own `move()`, and can be held through the abstract `Vehicle` type even though `Vehicle` itself can never be instantiated.

## Trace
**Predict the output first (write it before reading on):**  `___`

| Line | Statement | `wheels` | Output |
|---|---|---|---|
| 1 | `Vehicle vehicle = new Bicycle();` | 2 | — |
| 2 | `vehicle.move();` | 2 | `Pedalling on 2 wheels` |
| 3 | `vehicle.stop();` | 2 | `Vehicle stopped` |

**Actual output:**
```
Pedalling on 2 wheels
Vehicle stopped
```
`new Bicycle()` runs `Bicycle()` → `super(2)`, which sets the parent's `final` field. `move()` dispatches to `Bicycle`'s override; `stop()` uses the concrete method inherited unchanged from `Vehicle`.

## Faded Practice
Fill the blank so a class holding an abstract method compiles (the load-bearing decision):
```java
______ class Vehicle {       // what makes it legal to declare move() with no body?
    public abstract void move();
}
```
> [!answer]- Answer
> `abstract`. Any class that declares even one abstract method must itself be declared `abstract` — otherwise the compiler complains that the class "is not abstract and does not override abstract method move()".

Progression to aim for: read this labelled example → complete-the-code (above) → write an `Employee`/`calculatePay` hierarchy from a blank editor (see Mini Practice).

## Common Mistakes
- Trying to `new` an abstract class → it has no complete implementation; only concrete subclasses can be instantiated.
- Declaring an abstract method in a **non-abstract** class → the class must also be `abstract`.
- Giving an abstract method a body (`abstract void f() { }`) → abstract means *no* body; a body makes it concrete.
- Marking an abstract method `private`, `static`, or `final` → abstract methods must stay overridable, so those modifiers are illegal.
- A concrete subclass forgetting to implement an inherited abstract method → it must implement *all* of them, or be declared `abstract` itself.
- Assuming inherited concrete methods can't be overridden → they can, unless marked `final`.
- Forgetting a class can `extend` only **one** class → need multiple types? Use [[Interfaces]].

## Examples and Non-Examples
**Example:**
```java
abstract class Animal {
    abstract void makeSound();     // legal: the class is abstract
}
```
**Non-Example:**
```java
class Animal {
    abstract void makeSound();     // compile-time error
    // FALSE BELIEF: "any class can hold an abstract method"
    //   -> a class with an abstract method must itself be `abstract`
}
```
```java
Animal a = new Animal();           // compile-time error even when Animal IS abstract
// FALSE BELIEF: "abstract classes are just classes you can still instantiate"
//   -> abstract classes can never be created with `new`
```

## Recall Questions
%% Review via the Spaced Repetition plugin (Cmd/Ctrl+P > "Review flashcards"), not by rereading. %%
#flashcards/java/abstract-classes

Why can an abstract class not be instantiated with `new`?
?
It may declare abstract methods with no body, so an instance would have missing behaviour; Java forbids creating it directly and requires a concrete subclass instead.

Can an abstract class have a constructor, and when does it run?
?
Yes. It doesn't create an abstract instance — it runs via `super(...)` when a subclass is instantiated, to initialise the shared state the parent owns.

When is an abstract class the better choice over an interface?
?
When subclasses need to share instance **state** (fields), constructor logic, or reusable non-static method bodies under one common base type — things a pre-Java-8-style interface cannot provide.

Can an inherited concrete method be overridden by a subclass?
?
Yes, unless it is declared `final`; being defined in an abstract parent does not lock it.
<!--SR:!2026-07-23,0,230-->

## Mini Practice
1. Write `abstract class Employee` with a `String name` field, a constructor, a concrete `clockIn()` that prints `name + " clocked in"`, and an abstract `double calculatePay()`. **Success criterion:** the file compiles but `new Employee(...)` is rejected.
2. Add `HourlyEmployee` (rate × hours) and `SalariedEmployee` (annual salary ÷ 12) subclasses. **Success criterion:** both compile only once `calculatePay()` is implemented.
3. Put them in an `Employee[]`, loop calling `clockIn()` and `calculatePay()`. **Expected output:** one clock-in line per employee plus each one's distinct pay. (Predict the numbers, then run.)

## Mistake Log
Log misses to [[Abstraction Polymorphism and Methods Mistake Log]] as: wrong output → minimal repro → misconception → recall-question form → fix.

## Links
- Contrast: [[Interfaces]] — abstract class (one parent, can hold state + constructors) vs interface (multiple, no instance state)
- Map: [[Polymorphism MOC]]
- Related: [[Abstraction in Java]] · [[Polymorphism]] · [[20 Areas/Education/Obsidi Academy/Sessions/Java/Day 6 Jul 13/method overriding]]
- Prerequisites: [[Inheritance in Java]] · [[01-The-Super-Keyword]]

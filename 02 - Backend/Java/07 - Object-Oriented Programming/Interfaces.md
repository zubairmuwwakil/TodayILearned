---
type: concept
topic: object-oriented-programming
status: learning
difficulty: medium
tags:
  - java
  - object-oriented-programming
  - interfaces
---
# Interfaces

## What it is

An interface is a **contract**: a named set of behaviours that any implementing class promises to supply. A class writes `implements SomeInterface` and must provide a body for every abstract method — unless the class is itself `abstract`.

An interface may contain:

- **abstract method declarations** — implicitly `public abstract`
- **constants** — implicitly `public static final` (never per-object fields)
- **default methods** — a `default` body implementers inherit and may override
- **static methods** — belong to the interface, called as `Interface.method()`
- **private methods** (Java 9+) — helpers shared by default/static methods

## Why it matters

An interface lets **unrelated classes share one type** without sharing an ancestor. Code written against the interface works with any implementation, so you gain:

- **abstraction** — callers depend on *what*, not *how*
- **polymorphism** — one reference type, many implementations
- **loose coupling** — swap implementations without touching callers
- **testability** — pass a substitute (fake/mock) that implements the same contract
- **multiple type inheritance** — a class `extends` exactly one class but can `implements` any number of interfaces

## Syntax / Pattern

```java
interface Printable {
    void print();                 // implicitly public abstract
}

class Report implements Printable {
    @Override
    public void print() {         // must be public — see Faded Practice
        System.out.println("Printing report");
    }
}
```

Abstract interface methods are `public` by contract, so an overriding implementation **must** be declared `public`.

## Worked Example

```java
interface Shape {
    void draw();
    double getArea();
}

class Circle implements Shape {
    private final double radius;

    public Circle(double radius) {   // 1. state lives in the class, not the interface
        this.radius = radius;
    }

    @Override
    public void draw() {             // 2. fulfil the first contract method
        System.out.println("Drawing a circle");
    }

    @Override
    public double getArea() {        // 3. fulfil the second contract method
        return Math.PI * radius * radius;
    }
}

public class Main {
    public static void main(String[] args) {
        // 4. reference type Shape, actual object Circle
        Shape shape = new Circle(3.0);
        shape.draw();
        System.out.println(shape.getArea());
    }
}
```

**Explain in plain English (EiPE):** `Circle` signs the `Shape` contract by implementing both methods, so a `Shape` reference can drive a `Circle` without knowing its concrete type.

### Multiple Interfaces
```java
interface Drivable  { void drive();  }
interface Chargeable { void charge(); }

class ElectricCar implements Drivable, Chargeable {  // one class, two contracts
    @Override public void drive()  { System.out.println("Driving");  }
    @Override public void charge() { System.out.println("Charging"); }
}
```
A class can honour many interfaces at once — impossible with class `extends`, which allows only one parent.

## Trace
**Predict the output first (write it before reading on):**  `___`

| Line | Statement | `shape` compile-time type | `shape` runtime object | Output |
|---|---|---|---|---|
| 1 | `Shape shape = new Circle(3.0);` | `Shape` | `Circle` | — |
| 2 | `shape.draw();` | `Shape` | `Circle` | `Drawing a circle` |
| 3 | `System.out.println(shape.getArea());` | `Shape` | `Circle` | `28.274333882308138` |

**Actual output:**
```
Drawing a circle
28.274333882308138
```
The reference is typed `Shape`, but the `Circle` implementations run because Java dispatches on the runtime object (`Math.PI * 3.0 * 3.0 = 28.274333882308138`).

## Faded Practice
Fill the blank so `Report` legally implements `Printable` (the load-bearing decision):
```java
class Report implements Printable {
    @Override
    ______ void print() {   // interface methods are public — what visibility must this be?
        System.out.println("Printing report");
    }
}
```
> [!answer]- Answer
> `public`. Interface abstract methods are implicitly `public`, and an override can never *narrow* access. Omitting the modifier makes it package-private — "weaker access privileges" — and the class fails to compile.

## Common Mistakes
- Trying `new SomeInterface()` → an interface has no object of its own; instantiate a concrete implementer instead.
- Forgetting `public` on an implementing method → cannot assign weaker access than the interface's implicit `public`; compile error.
- Leaving an abstract method unimplemented in a concrete class → the class must be declared `abstract` or won't compile.
- Saying "interfaces contain only abstract methods" → modern interfaces also allow default, static, and private methods.
- Expecting per-object instance fields in an interface → interface fields are constants only (`public static final`).
- Confusing an interface with a class → an interface is a type/contract, not a blueprint for objects.

> [!tip]- Eclipse: auto-generate the required stubs
> Red underline on a class that `implements` an interface? Open **Quick Fix** (hover the error), choose **Add unimplemented methods**, then replace each generated stub with the real logic.

## Examples and Non-Examples
**Example:**
```java
Shape shape = new Circle(3.0);   // interface reference, concrete object
shape.draw();                    // Circle's implementation runs
```
**Non-Example:**
```java
Shape shape = new Shape();       // compile-time error
// FALSE BELIEF: "an interface can be instantiated like a class"
```
An interface declares behaviour but provides no object — only a class that implements it can be constructed.

## Recall Questions
%% Review via the Spaced Repetition plugin (Cmd/Ctrl+P > "Review flashcards"), not by rereading. %%
#flashcards/java/interfaces

What does a class promise when it declares `implements SomeInterface`?
?
To provide a body for every abstract method the interface declares — or to be declared `abstract` itself and leave them for a subclass.

How many classes can a class extend versus how many interfaces can it implement?
?
Exactly one class (`extends`), but any number of interfaces (`implements`) — this is how Java gets multiple type inheritance without multiple class inheritance.

Besides abstract methods, what members can a modern interface hold?
?
Constants (`public static final`), `default` methods with bodies, `static` methods, and `private` helper methods (Java 9+).

## Mini Practice
1. Declare `interface Payable { void pay(double amount); }`; implement it with `CreditCard` and `GiftCard`, each printing how it paid. **Success criterion:** store both in a `Payable[]`, loop calling `pay`, and each element prints its own line without the loop knowing the concrete type. (Predict the two lines, then run.)
2. Add a `default void receipt()` to `Payable` that prints a generic confirmation, then override it in `GiftCard` only. **Expected output:** `CreditCard` uses the default receipt; `GiftCard` prints its custom one — proof that default methods are inherited but overridable.

## Mistake Log
When you miss one, log it to [[Abstraction Polymorphism and Methods Mistake Log]] as: wrong output → minimal repro → misconception → recall-question form → fix.

## Links
- Contrast: [[Abstract Classes]] (single inheritance, can hold state + constructors) vs Interfaces (multiple, contract-only)
- Map: [[Polymorphism MOC]]
- Related: [[Abstraction in Java]] · [[Interface Default and Static Methods]] · [[Polymorphism]]
- Prerequisites: [[Abstraction in Java]] · [[Method Overriding]]

---
type: overview
topic: object-oriented-programming
status: learning
difficulty: medium
tags:
  - java
  - oop
  - design-principles
  - solid
  - object-oriented-design
aliases:
  - SOLID
---
# SOLID Design Principles

> [!tip] Mnemonic
> **S**ingle responsibility · **O**pen/closed · **L**iskov substitution · **I**nterface segregation · **D**ependency inversion. The **L** is **Liskov Substitution** (after Barbara Liskov), not "Liskov integration." Part of [[Design Principles MOC]].

## What it is

**SOLID** is a set of five object-oriented design principles popularised by Robert C. Martin ("Uncle Bob"). Each targets one recurring cause of fragile code.

| Letter | Principle | Core idea |
|---|---|---|
| S | Single Responsibility | A class should have one main reason to change. |
| O | Open/Closed | Extend behaviour without repeatedly modifying stable code. |
| L | Liskov Substitution | A subtype must work everywhere its parent type is expected. |
| I | Interface Segregation | Prefer small, focused interfaces over one fat contract. |
| D | Dependency Inversion | Depend on abstractions, not concrete implementations. |

## Why it matters

Code that follows SOLID tends to be easier to change, easier to test (you can inject fakes), less tightly coupled, more reusable, and less likely to break when requirements shift. Most of the five converge on the same move: **program to an abstraction and let concrete types vary behind it.**

SOLID is guidance, not law. Splitting every class into the smallest possible pieces or adding an interface for every class creates indirection that buys no flexibility — apply each principle where it removes real pain.

## Syntax / Pattern

The shape most of SOLID converges on — an abstraction that clients depend on, with implementations injected in:

```java
interface Capability { void doIt(); }          // the abstraction

class Impl implements Capability {              // an implementation (swap freely — OCP)
    public void doIt() { /* ... */ }
}

class Client {
    private final Capability c;                 // depend on the abstraction (DIP)
    Client(Capability c) { this.c = c; }        // inject it, don't `new` it here
    void run() { c.doIt(); }                    // works for ANY implementation (LSP)
}
```

## The Five Principles

### 1. Single Responsibility

A class should have **one cohesive responsibility**, so only one kind of requirement change forces you to edit it.

Non-example — this class both calculates *and* prints, so it has two reasons to change:

```java
public class PerimeterCalculator {
    public double rectanglePerimeter(double length, double width) {
        double perimeter = 2 * (length + width);
        System.out.println("Perimeter: " + perimeter);   // presentation concern
        return perimeter;                                 // calculation concern
    }
}
```

Better — split the concerns:

```java
public class PerimeterCalculator {
    public double rectanglePerimeter(double length, double width) {
        return 2 * (length + width);
    }
}
```

```java
public class ResultPrinter {
    public void printPerimeter(double perimeter) {
        System.out.println("Perimeter: " + perimeter);
    }
}
```

### 2. Open/Closed

Software should be **open for extension, closed for modification** — add new behaviour with new types rather than editing already-tested code.

```java
public interface Shape {
    double perimeter();
}
```

```java
public class Rectangle implements Shape {
    private final double length;
    private final double width;

    public Rectangle(double length, double width) {
        this.length = length;
        this.width = width;
    }

    @Override
    public double perimeter() {
        return 2 * (length + width);
    }
}
```

```java
public class Circle implements Shape {
    private final double radius;

    public Circle(double radius) {
        this.radius = radius;
    }

    @Override
    public double perimeter() {
        return 2 * Math.PI * radius;
    }
}
```

```java
public class PerimeterCalculator {
    public double calculate(Shape shape) {
        return shape.perimeter();   // never changes when a new Shape is added
    }
}
```

A new shape implements `Shape` without touching `PerimeterCalculator`. This is [[Polymorphism]] doing the heavy lifting.

### 3. Liskov Substitution

A subtype must be usable wherever its parent type is expected **without breaking correct behaviour**.

Problem — a `Penguin` *is-a* `Bird`, but overriding `fly()` to throw breaks any code that treats a `Bird` as flyable:

```java
public class Bird {
    public void fly() { System.out.println("Flying"); }
}
```

```java
public class Penguin extends Bird {
    @Override
    public void fly() {
        throw new UnsupportedOperationException("Penguins cannot fly");
    }
}
```

Better — model *ability* separately, so nothing is forced to fly:

```java
public interface Bird {
    void eat();
}
```

```java
public interface Flyable {
    void fly();
}
```

```java
public class Sparrow implements Bird, Flyable {
    @Override public void eat() { System.out.println("Sparrow is eating"); }
    @Override public void fly() { System.out.println("Sparrow is flying"); }
}
```

```java
public class Penguin implements Bird {
    @Override public void eat() { System.out.println("Penguin is eating"); }
}
```

### 4. Interface Segregation

A class should not be forced to depend on methods it does not use.

Non-example — one fat interface forces every bird to implement both:

```java
public interface Bird {
    void fly();
    void swim();
}
```

Better — split into focused capability interfaces:

```java
public interface Flyable {
    void fly();
}
```

```java
public interface Swimmable {
    void swim();
}
```

```java
public class Duck implements Flyable, Swimmable {
    @Override public void fly()  { System.out.println("Duck is flying"); }
    @Override public void swim() { System.out.println("Duck is swimming"); }
}
```

```java
public class Ostrich implements Swimmable {
    @Override public void swim() { System.out.println("Ostrich is swimming"); }
}
```

Interfaces now describe *capabilities* instead of forcing empty or throwing methods on classes that don't need them.

### 5. Dependency Inversion

High-level modules should not depend on low-level modules; both should depend on an abstraction.

Tightly coupled — `OrderService` is welded to email and can never send anything else (or be tested without sending a real message):

```java
public class EmailSender {
    public void send(String message) { System.out.println("Email: " + message); }
}
```

```java
public class OrderService {
    private final EmailSender sender = new EmailSender();   // hard dependency

    public void placeOrder() {
        sender.send("Order placed");
    }
}
```

The fix — depend on a `MessageSender` abstraction and inject the implementation. Shown end-to-end in the **Worked Example** below.

## Worked Example

Dependency Inversion + Open/Closed together: `OrderService` depends only on the `MessageSender` abstraction, so the concrete sender is chosen *outside* and injected in.

```java
interface MessageSender {                        // 1. the abstraction both sides share
    void send(String message);
}

class EmailSender implements MessageSender {     // 2. one low-level implementation
    @Override public void send(String message) {
        System.out.println("Email: " + message);
    }
}

class SmsSender implements MessageSender {       // 3. a second implementation, added later
    @Override public void send(String message) {
        System.out.println("SMS: " + message);
    }
}

class OrderService {                             // 4. high-level module depends on the abstraction
    private final MessageSender sender;
    OrderService(MessageSender sender) {         //    injected via constructor, never `new`-ed inside
        this.sender = sender;
    }
    void placeOrder() {
        sender.send("Order placed");
    }
}

public class Main {
    public static void main(String[] args) {
        // 5. wire in an EmailSender
        OrderService service = new OrderService(new EmailSender());
        service.placeOrder();
        // 6. swap to SmsSender — OrderService source is untouched (Open/Closed)
        OrderService smsService = new OrderService(new SmsSender());
        smsService.placeOrder();
    }
}
```

**Explain in plain English (EiPE):** `OrderService` triggers a notification without knowing whether it is email or SMS — the concrete sender is decided at the call site and injected in, so new senders never force a change to the service.

## Trace

**Predict the output first (write it before reading on):**  `___`

| Line | Statement | injected `sender` runtime type | Output |
|---|---|---|---|
| 1 | `new OrderService(new EmailSender())` | `EmailSender` | — |
| 2 | `service.placeOrder();` | `EmailSender` | `Email: Order placed` |
| 3 | `new OrderService(new SmsSender())` | `SmsSender` | — |
| 4 | `smsService.placeOrder();` | `SmsSender` | `SMS: Order placed` |

**Actual output:**

```
Email: Order placed
SMS: Order placed
```

The `placeOrder()` body is identical both times; only the injected implementation changed, and *that* is what selected the behaviour (dynamic dispatch through the interface).

## Faded Practice

Fill the blank so `OrderService` stays swappable and testable (the load-bearing decision):

```java
class OrderService {
    private final ______ sender;                 // which type keeps this swappable?

    OrderService(______ sender) {
        this.sender = sender;
    }
    void placeOrder() {
        sender.send("Order placed");
    }
}
```

> [!answer]- Answer
> `MessageSender` — the abstraction. Declaring the field/parameter as `EmailSender` would re-couple `OrderService` to one implementation: you could no longer pass an `SmsSender` or a test double, defeating Dependency Inversion.

## Common Mistakes

- Treating SOLID as rigid laws → they are guidelines; apply each where it removes real pain, not everywhere.
- One interface per class with no second implementation → an abstraction with no substitution need is just indirection; wait for the second case.
- Reading "single responsibility" as "one method" → it means one *reason to change* (one cohesive concern), not one function.
- Using inheritance only to reuse code when the subtype isn't truly an "is-a" → prefer composition; a false "is-a" breaks Liskov.
- "Fixing" a bad hierarchy by overriding a method to throw `UnsupportedOperationException` → that hides an LSP violation; split the capability into its own interface (ISP).
- Letting high-level code `new` its own dependencies → depend on an abstraction and inject it so implementations (and fakes) can be swapped.

## Examples and Non-Examples

**Non-Example (kills a specific false belief):**

```java
public class Penguin extends Bird {              // Bird has fly()
    @Override public void fly() {
        throw new UnsupportedOperationException("Penguins cannot fly");
    }
    // FALSE BELIEF: "inheritance is for code reuse, so any 'is-a-kind-of' can extend."
    // A Penguin is a Bird, but not a *flying* Bird — substitutability breaks (LSP).
}
```

**Quick self-check — good signs vs warning signs:**

| Good sign | Warning sign |
|---|---|
| A class has one cohesive purpose. | A class calculates, prints, saves, and validates. |
| New behaviour arrives via new implementations. | Every new case edits a long `if/else` chain. |
| Subclasses honour parent expectations. | A subclass disables inherited behaviour by throwing. |
| Interfaces describe focused capabilities. | Implementations contain empty or unsupported methods. |
| Services receive abstractions through constructors. | Services `new` every dependency internally. |

## Recall Questions
%% Review via the Spaced Repetition plugin (Cmd/Ctrl+P > "Review flashcards"), not by rereading. %%
#flashcards/java/solid

What does each letter in SOLID stand for?
?
Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion.

Why does making `Penguin` override `fly()` to throw an exception violate Liskov Substitution?
?
Code that treats any `Bird` as flyable breaks when handed a `Penguin`. A subtype must honour the parent's contract; if it can't, the "is-a" relationship is wrong — model `Flyable` as a separate capability instead.

Why is constructor injection the typical way to achieve Dependency Inversion?
?
The class receives an abstraction from outside instead of `new`-ing a concrete class, so high-level code depends only on the interface and any implementation — including a test double — can be supplied.

When can applying SOLID make code worse?
?
When you add interfaces or abstractions with no real second implementation or substitution need — the extra indirection adds complexity without buying flexibility.

## Mini Practice

1. **Open/Closed:** add a `Triangle implements Shape` and compute its perimeter through the *existing* `PerimeterCalculator.calculate(Shape)` without editing that class. Define `perimeter()` as `a + b + c`. Predict, then run: for `new Triangle(3, 4, 5)`, **expected output** `12.0`. **Success criterion:** `PerimeterCalculator` source is untouched — proof of extensibility.
2. **Dependency Inversion / testability:** write a `TestSender implements MessageSender` that stores the last message in a field instead of printing, inject it into `OrderService`, call `placeOrder()`, then read the field back. **Success criterion:** the stored message equals `"Order placed"` and no real message is sent — proof that depending on the abstraction makes the service testable.

## Mistake Log

When you miss one, log it to [[Design Principles Mistake Log]] as: wrong output → minimal repro → misconception → recall-question form → fix.

## Links

- Contrast: [[Inheritance vs Composition]] — SOLID often steers you toward composition over inheritance
- Map: [[Design Principles MOC]]
- Related: [[Interfaces]] · [[Abstract Classes]] · [[Dependency Injection]] · [[Design Patterns]]
- Prerequisites: [[Inheritance in Java]] · [[Polymorphism]] · [[Interfaces]]

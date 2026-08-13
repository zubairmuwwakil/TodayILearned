---
type: concept
topic: object-oriented-programming
status: learning
difficulty: medium
tags:
  - java
  - object-oriented-programming
  - abstraction
---
# Abstraction in Java

## What it is

Abstraction means **exposing only the relevant behaviour of an object while hiding the implementation details** behind it. A caller learns *what* an object can do (its contract) without needing to know *how* it does it.

In Java it is expressed through:

- **interfaces** — a pure contract with no implementation of its own
- **abstract classes** — a partial contract that mixes required (abstract) and shared (concrete) methods
- **well-designed public methods** that keep private state and internals out of view

The payoff is that you can **program to an abstraction** (a supertype) instead of hard-wiring code to one concrete class.

## Why it matters

Depending on a stable contract instead of a concrete implementation makes code easier to understand, extend, swap, test (mock the interface), and keeps modules loosely coupled. It is the mechanism behind the Dependency Inversion Principle: high-level code depends on abstractions, not on details.

## Syntax / Pattern

```java
interface PaymentProcessor {          // the contract: WHAT, not how
    void process(double amount);
}

class CreditCardProcessor implements PaymentProcessor {
    @Override
    public void process(double amount) {   // the hidden HOW
        System.out.println("Charging credit card: $" + amount);
    }
}

PaymentProcessor p = new CreditCardProcessor();   // depend on the abstraction
```

The caller holds a `PaymentProcessor` and never mentions `CreditCardProcessor` again.

## Worked Example
```java
interface NotificationService {                 // 1. the contract every notifier must honour
    void send(String message);
}

class EmailNotificationService implements NotificationService {
    @Override public void send(String message) {          // 2. one hidden implementation
        System.out.println("Sending email: " + message);
    }
}
class SmsNotificationService implements NotificationService {
    @Override public void send(String message) {          // 3. a second, interchangeable implementation
        System.out.println("Sending SMS: " + message);
    }
}

class AlertManager {
    public void sendAlert(NotificationService service, String message) {  // 4. depend on the interface
        service.send(message);                            // 5. call the contract; which HOW runs is decided at runtime
    }
}

public class Main {
    public static void main(String[] args) {
        AlertManager manager = new AlertManager();
        manager.sendAlert(new EmailNotificationService(), "Server is down");
        manager.sendAlert(new SmsNotificationService(),  "Disk almost full");
    }
}
```

**Explain in plain English (EiPE):** `AlertManager` sends alerts through the `NotificationService` contract, so it works with email, SMS, or any future notifier without knowing — or changing — which one it holds.

## Trace
**Predict the output first (write it before reading on):**  `___`

| Line | Statement | `service` runtime object | Output |
|---|---|---|---|
| 1 | `AlertManager manager = new AlertManager();` | — | — |
| 2 | `manager.sendAlert(new EmailNotificationService(), "Server is down");` | `EmailNotificationService` | — |
| 3 | inside `sendAlert`: `service.send("Server is down");` | `EmailNotificationService` | `Sending email: Server is down` |
| 4 | `manager.sendAlert(new SmsNotificationService(), "Disk almost full");` | `SmsNotificationService` | — |
| 5 | inside `sendAlert`: `service.send("Disk almost full");` | `SmsNotificationService` | `Sending SMS: Disk almost full` |

**Actual output:**
```
Sending email: Server is down
Sending SMS: Disk almost full
```
`AlertManager` never changed between the two calls — only the concrete object behind the `NotificationService` reference did.

## Faded Practice
Fill the blank so `sendAlert` accepts *every* notifier (the load-bearing decision):
```java
class AlertManager {
    public void sendAlert(______ service, String message) {   // which type lets Email AND Sms be passed?
        service.send(message);
    }
}
```
> [!answer]- Answer
> `NotificationService` — the interface (the abstraction). Declaring the parameter as `EmailNotificationService` would reject an `SmsNotificationService`; typing it to the contract accepts every implementation.

Progression to aim for: read this labeled example → complete-the-code (above) → write a `Storage` interface with two implementations from a blank editor (see Mini Practice).

## Common Mistakes
- Thinking abstraction means "no implementation exists" → the details are *hidden*, not deleted; something concrete still has to run.
- Trying to instantiate an interface or abstract class → `new NotificationService()` will not compile; only a concrete class can be `new`ed.
- Exposing fields publicly instead of behaviour → leaks the *how*; expose methods (the *what*) and keep state private.
- Typing a variable/parameter to the concrete class when the abstraction suffices → couples callers to one implementation; program to the interface.
- Assuming abstraction and encapsulation are the same → abstraction hides *complexity* (what vs how); [[Encapsulation]] controls *access to state* (e.g. private fields + accessors).

## Examples and Non-Examples
**Example:**
```java
List<String> names = new ArrayList<>();   // variable typed to the List abstraction
names.add("Ada");
// swap ArrayList for LinkedList later — this code does not change
```

**Non-Example:**
```java
NotificationService s = new NotificationService();   // does NOT compile
// FALSE BELIEF: "an interface (or abstract type) can be instantiated like a class"
```
An interface declares only the contract; you must `new` a concrete class that supplies the implementation.

## Recall Questions
%% Review via the Spaced Repetition plugin (Cmd/Ctrl+P > "Review flashcards"), not by rereading. %%
#flashcards/java/abstraction

What is the difference between *what* an object does and *how* it does it?
?
The *what* is the public behaviour/contract a caller relies on; the *how* is the private implementation abstraction hides. Callers depend on the what, not the how.

How is abstraction different from encapsulation?
?
Abstraction hides complexity by exposing only relevant behaviour (what vs how); encapsulation bundles state with the methods that guard it and controls access. Related, but distinct.

## Mini Practice
1. Create a `Storage` interface with `save(String data)`. Implement `FileStorage` (prints `Saving to file: <data>`) and `CloudStorage` (prints `Uploading to cloud: <data>`), then write `store(Storage s, String data)` that calls `save` and invoke it with both. **Expected output:** two lines, one per implementation. (Predict them, then run.)
2. Add a `DatabaseStorage` **without editing `store`**. **Success criterion:** the new line prints while `store` stays unchanged — proof you programmed to the abstraction.

## Mistake Log
When you miss one, log it to [[Abstraction Polymorphism and Methods Mistake Log]] as: wrong output → minimal repro → misconception → recall-question form → fix.

## Links
- Contrast: [[Encapsulation]] (controls access to state) vs Abstraction (hides complexity)
- Map: [[Polymorphism MOC]] · [[Java MOC]]
- Related: [[Polymorphism]] · [[01-SOLID-Design-Principles]] · [[Inherited Getters and Setters]]
- Prerequisites: [[Interfaces]] · [[Abstract Classes]]

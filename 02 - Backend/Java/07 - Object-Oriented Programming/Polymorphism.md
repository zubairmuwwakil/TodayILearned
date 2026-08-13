---
type: concept
topic: object-oriented-programming
status: learning
difficulty: medium
tags:
  - java
  - object-oriented-programming
  - polymorphism
---
# Polymorphism

> [!example] Model note
> This note is the worked exemplar of the upgraded [[Java Concept Note|template]]. Copy its shape (Predict → subgoal labels → variable-trace table → faded practice → hidden-answer flashcards) into other notes as you revisit them. Part of [[Polymorphism MOC]].

## What it is

Polymorphism means **one reference type can stand in for objects of multiple concrete classes**. A superclass or interface reference can point to any compatible subclass or implementing object, and when an *overridden instance method* is called, Java picks the implementation from the object's **runtime type**, not the reference type.

## Why it matters

One piece of code works with many object types — improving flexibility, reuse, extensibility, maintainability, and testability. New subclasses slot in without touching code already written against the parent abstraction (open/closed principle).

## Syntax / Pattern

```java
Parent reference = new Child();
reference.overriddenMethod();   // runs Child's version (dynamic dispatch)
```

Reference type → what you can *call* (compile time). Object type → *which override runs* (runtime).

## Worked Example
```java
class Animal {
    public void makeSound() { System.out.println("Some animal sound"); }
}
class Dog extends Animal {
    @Override public void makeSound() { System.out.println("Woof"); }
}
class Cat extends Animal {
    @Override public void makeSound() { System.out.println("Meow"); }
}

public class Main {
    public static void main(String[] args) {
        // 1. hold a Dog through an Animal reference
        Animal animal = new Dog();
        animal.makeSound();
        // 2. re-point the SAME reference at a Cat
        animal = new Cat();
        animal.makeSound();
    }
}
```

**Explain in plain English (EiPE):** the same call `animal.makeSound()` produces different behaviour depending on which object the reference currently holds.

### Polymorphic Parameter
```java
abstract class Vehicle {
    public abstract void start();               // 1. contract every vehicle must fulfil
    public void stop() { System.out.println("Stopping the vehicle"); }
}
class Car extends Vehicle {
    @Override public void start() { System.out.println("Starting the car engine"); }
}
class Bike extends Vehicle {
    @Override public void start() { System.out.println("Kick-starting the bike"); }
}
class Driver {
    public void drive(Vehicle vehicle) {        // 2. accept ANY subtype via the parent type
        vehicle.start();                        // 3. dispatch to the real object's start()
        vehicle.stop();
    }
}
```
`Driver.drive` accepts any concrete subclass of `Vehicle` — write the method once, extend forever.

## Trace
**Predict the output before reading on:**  `___`

| Line | Statement | `animal` compile-time type | `animal` runtime object | Output |
|---|---|---|---|---|
| 1 | `Animal animal = new Dog();` | `Animal` | `Dog` | — |
| 2 | `animal.makeSound();` | `Animal` | `Dog` | `Woof` |
| 3 | `animal = new Cat();` | `Animal` | `Cat` | — |
| 4 | `animal.makeSound();` | `Animal` | `Cat` | `Meow` |

**Actual output:** `Woof` then `Meow`. The reference type stayed `Animal` the whole time; only the runtime object changed, and *that* is what selected the method.

## Faded Practice
Fill the blank so `drive` works for every vehicle type (the load-bearing decision):
```java
class Driver {
    public void drive(______ vehicle) {   // which type makes this accept Car AND Bike?
        vehicle.start();
        vehicle.stop();
    }
}
```
> [!answer]- Answer
> `Vehicle` — the parent type. Declaring the parameter as `Car` would reject `Bike`; declaring the abstract parent accepts every subtype.

Progression to aim for: read this labeled example → reorder scrambled lines → complete-the-code (above) → write a `Shape`/`draw` hierarchy from a blank editor (see Mini Practice).

## Common Mistakes
- Treating reference type and object type as the same concept → they are independent.
- Expecting subclass-only methods through a parent reference → not visible at compile time.
- Confusing overriding (runtime) with [[Method Overloading]] (compile time).
- Assuming **fields** are dynamically dispatched → only overridden *instance methods* are.
- Casting to a subclass without checking the actual object first → `ClassCastException`.

## Examples and Non-Examples
**Example:**
```java
Shape shape = new Circle();
shape.draw();                 // Circle's draw runs
```
**Non-Example:**
```java
Circle circle = new Shape();  // compile-time error
// FALSE BELIEF: "a parent object can be used wherever a child is expected"
```
A general parent cannot automatically be treated as a more specific child.

## Recall Questions
%% Review via the Spaced Repetition plugin (Cmd/Ctrl+P > "Review flashcards"), not by rereading. %%
#flashcards/java/polymorphism

Why can a parent reference NOT directly call a child-only method?
?
The compiler only allows members declared by the *reference (compile-time) type*; child-only methods aren't part of the parent's contract, even though the object has them at runtime.

Which type decides the overridden method that actually runs, and why?
?
The *object's runtime type* — Java uses dynamic dispatch (virtual method lookup) at the moment of the call, not the declared reference type.

## Mini Practice
1. Create a `Shape` parent with `draw` implementations in `Circle`, `Rectangle`, and `Triangle`; store them in a `Shape[]` and loop calling `draw` **without `instanceof`**. **Expected output:** three different draw lines, one per shape. (Predict them, then run.)
2. Add a `Pentagon` afterwards **without editing the loop**. **Success criterion:** the loop prints the pentagon too, unchanged — proof of extensibility.

## Mistake Log
When you miss one, add it to [[Abstraction Polymorphism and Methods Mistake Log]] as: wrong output → minimal repro → misconception → recall-question form → fix.

## Links
- Contrast: [[Method Overriding]] (runtime) vs [[Method Overloading]] (compile time)
- Map: [[Polymorphism MOC]]
- Related: [[Interfaces]] · [[Abstract Classes]] · [[Abstraction in Java]]
- In practice: [[03 - List Interface and Polymorphism]]
- Prerequisites: [[01-The-Super-Keyword]] · [[02-Object-Superclass]]

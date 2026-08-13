---
type: moc
topic: polymorphism
tags:
  - java
  - moc
  - polymorphism
---
# Polymorphism MOC

> [!info] What this map is for
> Polymorphism is spread across three folders (`05.1 - Methods`, `07 - OOP`, `06.1 - Collections`). This map pulls the scattered atomic notes into one theme so you can review them **together** and see how they connect — without copying any content. Each note still lives in exactly one place.

## The mental model
A **reference type** decides what you can *call at compile time*; the **object's runtime type** decides which overridden method *actually runs*. Overriding = runtime (dynamic dispatch). Overloading = compile time (resolved by argument shape). Keep those two apart — confusing them is the classic beginner trap.

## Core notes
- [[Polymorphism]] — the runtime-dispatch idea itself
- [[20 Areas/Education/Obsidi Academy/Sessions/Java/Day 6 Jul 13/method overriding]] — runtime substitution of behaviour
- [[20 Areas/Education/Obsidi Academy/Sessions/Java/Day 6 Jul 13/Method Overloading]] — compile-time selection by argument list *(contrast with overriding)*
- [[Interfaces]] — polymorphism without inheritance
- [[Abstract Classes]] — partial implementation + forced overrides
- [[Abstraction in Java]] — the principle polymorphism serves

## How it shows up in practice
- [[03 - List Interface and Polymorphism]] — `List ref = new ArrayList<>()` is polymorphism you use daily
- [[Inherited Getters and Setters]] — inherited behaviour vs overridden behaviour
- [[Interface Default and Static Methods]] — default methods and the dispatch rules

## Foundations (prerequisites)
- [[01-The-Super-Keyword]]
- [[02-Object-Superclass]]
- [[03-Inheritance-and-Constructors]]

## Review & mistakes
- [[OOP Abstraction and Polymorphism Review]]
- [[Abstraction Polymorphism and Methods Mistake Log]]

## Interleave check (mix these, don't study in a block)
Answer without peeking: (1) Why can a parent reference *not* call a child-only method? (2) Is `add(int)` vs `add(String)` overriding or overloading? (3) Which type — reference or object — picks the method that runs?

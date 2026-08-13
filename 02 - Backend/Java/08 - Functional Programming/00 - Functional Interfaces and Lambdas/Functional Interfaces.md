---
type: concept
topic: functional-programming
status: learning
difficulty: easy
aliases:
  - Functional Interface
  - SAM Interface
  - Single Abstract Method Interface
tags:
  - java
  - functional-programming
  - functional-interfaces
---
# Functional Interfaces

## What it is

A functional interface is an interface with exactly one abstract method. It may also have default methods, static methods, and methods inherited from `Object`.

The optional `@FunctionalInterface` annotation asks the compiler to enforce that rule.

## Why it matters

Functional interfaces are the target types that make [[Lambda Expressions]] type-safe in Java. A lambda does not stand alone; the compiler checks it against a functional interface's parameter and return types.

## Syntax / Pattern

```java
@FunctionalInterface
interface MyValue {
    double getValue();
}
```

The single abstract method defines the lambda's shape: parameters in, return value out.

## Worked Example

```java
@FunctionalInterface
interface MyValue {
    double getValue();
}

public class FunctionalInterfaceExample {
    public static void main(String[] args) {
        // 1. use the functional interface as the lambda's target type
        MyValue answer = () -> 42.0;

        // 2. call the interface method to run the lambda body
        System.out.println(answer.getValue());
    }
}
```

**Explain in plain English (EiPE):** `MyValue` tells Java what shape the lambda must have, and `getValue()` runs the lambda body.

## Trace

**Predict the output first:** `___`

| Line | Statement | `answer` target type | return value | output |
|---|---|---|---:|---|
| 1 | `MyValue answer = () -> 42.0` | `MyValue` | `42.0` | - |
| 2 | `answer.getValue()` | `MyValue` | `42.0` | `42.0` |

**Actual output:** `42.0`

## Faded Practice

Complete the annotation that asks the compiler to enforce the one-abstract-method rule:

```java
______
interface ScoreRule {
    int score(String name);
}
```

> [!answer]- Answer
> `@FunctionalInterface` makes the compiler reject the interface if it stops being functional.

## Common Mistakes

- Adding two abstract methods -> the interface is no longer functional.
- Thinking the annotation creates lambda behavior -> the one abstract method is what matters; the annotation checks it.
- Saying lambdas are weakly typed -> Java lambdas are checked against a target functional interface.
- Calling the lambda variable like a JavaScript function -> in Java, call the interface method, such as `answer.getValue()`.

## Examples and Non-Examples

**Example:**
```java
@FunctionalInterface
interface Combiner {
    int combine(int a, int b);
}
```

**Non-Example:**
```java
@FunctionalInterface
interface Broken {
    int first();
    int second();
}
// FALSE BELIEF: "a functional interface can have several abstract methods"
```

## Recall Questions

#flashcards/java/functional-programming

Why does a functional interface need exactly one abstract method?
?
Because that one method gives the lambda a single target shape: parameter list plus return type.

## Mini Practice

1. Create a `Multiplier` functional interface with `int multiply(int a, int b)`, assign `(a, b) -> a * b`, and print `multiply(3, 4)`. **Expected output:** `12`. Predict, then run.
2. Add a second abstract method to the interface while keeping `@FunctionalInterface`. **Success criterion:** the compiler rejects it.

## Mistake Log

Log misses to [[Streams Mistake Log]] as: wrong output -> minimal repro -> misconception -> recall-question form -> fix.

## Links

- Contrast: [[Interfaces]] (general interface) vs a one-method functional interface
- Map: [[Functional Programming MOC]]
- Related: [[Lambda Expressions]] · [[map and Method References]] · [[filter and Predicate]]
- Prerequisites: [[Interfaces]] · [[Abstract Classes]]

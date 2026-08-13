---
type: concept
topic: functional-programming
status: learning
difficulty: medium
aliases:
  - Lambdas
  - Lambda Expression
  - Java Lambdas
tags:
  - java
  - functional-programming
  - lambda-expressions
---
# Lambda Expressions

## What it is

A lambda expression is a compact way to provide the implementation of a functional interface's single abstract method.

In Java, a lambda needs a target type, usually a [[Functional Interfaces|functional interface]], so the compiler knows the expected parameters and return type.

## Why it matters

Lambdas reduce boilerplate when you only need behavior, not a whole named class. They are common in Streams, callbacks, sorting, filtering, and small one-method tasks like `Runnable`.

## Syntax / Pattern

```java
() -> value                         // no parameters, implicit return
x -> x * 2                          // one parameter, parentheses optional
(x, y) -> x + y                     // multiple parameters
(x, y) -> {
    int sum = x + y;
    return sum;
}
```

Single-expression lambdas can return that expression implicitly. Block lambdas use braces and need `return` when the target method returns a value.

## Worked Example

```java
@FunctionalInterface
interface Calculator {
    int calculate(int x, int y);
}

public class LambdaExample {
    public static void main(String[] args) {
        // 1. choose a functional interface as the target type
        Calculator multiply = (x, y) -> x * y;

        // 2. call the interface method to run the lambda
        int result = multiply.calculate(6, 7);

        // 3. print the returned value
        System.out.println(result);
    }
}
```

**Explain in plain English (EiPE):** the lambda supplies the `calculate` behavior, so calling `calculate(6, 7)` multiplies the two numbers.

## Trace

**Predict the output first:** `___`

| Line | Statement | `x` | `y` | `result` | output |
|---|---|---:|---:|---:|---|
| 1 | `Calculator multiply = (x, y) -> x * y` | - | - | - | - |
| 2 | `multiply.calculate(6, 7)` | 6 | 7 | 42 | - |
| 3 | `System.out.println(result)` | 6 | 7 | 42 | `42` |

**Actual output:** `42`

## Faded Practice

Complete the lambda body so the result is `42`:

```java
Calculator multiply = (x, y) -> ______;
System.out.println(multiply.calculate(6, 7));
```

> [!answer]- Answer
> `x * y` returns the product of the two parameters.

## Common Mistakes

- Writing a lambda without a target type -> Java needs a functional interface to type-check it.
- Using `{}` for a non-`void` lambda without `return` -> block lambdas must return explicitly.
- Thinking parameter names must match the interface method -> parameter count, compatible types, and return type matter.
- Calling the variable directly like `multiply(6, 7)` -> Java calls the interface method: `multiply.calculate(6, 7)`.
- Forgetting that `Runnable` returns `void` -> `() -> 42` does not match `Runnable`.

## Examples and Non-Examples

**Example:**
```java
Calculator add = (a, b) -> a + b;
System.out.println(add.calculate(2, 3));
```

**Non-Example:**
```java
Calculator add = (a, b) -> {
    a + b;
};
// FALSE BELIEF: "a block lambda returns the last expression automatically"
```

## Recall Questions

#flashcards/java/functional-programming

Why does a Java lambda need a target type?
?
Because the compiler uses the target functional interface to know the parameter types and return type.

## Mini Practice

1. Create a `Checker` functional interface with `boolean test(String value)`, assign `value -> value.length() >= 4`, and print `test("Java")`. **Expected output:** `true`. Predict, then run.
2. Convert `Runnable task = () -> System.out.println("Hi");` into an anonymous class. **Success criterion:** same output, but more boilerplate.
3. Write a block lambda that sums numbers from 1 to 4 and returns the sum. **Expected output:** `10`. Predict, then run.

## Mistake Log

Log misses to [[Streams Mistake Log]] as: wrong output -> minimal repro -> misconception -> recall-question form -> fix.

## Links

- Contrast: [[Anonymous Classes]]
- Map: [[Functional Programming MOC]]
- Related: [[Functional Interfaces]] · [[Java Streams Overview]] · [[map and Method References]] · [[Creating Threads with Runnable]]
- Prerequisites: [[Interfaces]] · [[Method Overloading]]


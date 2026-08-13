---
aliases:
  - Variables in Java
  - Variables and Assignment
  - Variables and Data Types
  - Variables
type: concept
topic: fundamentals
status: learning
difficulty: easy
tags:
  - java
  - fundamentals
  - variables
---
# Variables and Types

## What it is

A **variable** is a named box that stores a value. In Java, every variable also has a **type** fixed at declaration — the type says *what kind* of value the box may hold. Java is **statically typed**: the compiler knows and checks each variable's type *before* the program runs.

Types split into two families:
- **Primitive types** (`int`, `double`, `boolean`, `char`, `long`, `short`, `byte`, `float`) store the value **directly**.
- **Reference types** (`String`, arrays, objects) store a **reference** pointing to an object held elsewhere in memory.

## Why it matters

Declared types let the compiler catch mistakes (storing text in a number, calling a missing method) *before* the program runs instead of crashing later. They also document intent: `int age` tells any reader exactly what kind of value lives there. This early, machine-checked feedback is the foundation everything else in Java builds on.

## Syntax / Pattern

```java
type variableName = value;   // declare + initialize in one step

int count;                   // declare now
count = 10;                  // assign later
```

Declaration fixes the *name and type*. Assignment (`=`) stores or updates the *value*.

## Worked Example

```java
public class Main {
    public static void main(String[] args) {
        // 1. reference-type variable holding text
        String name = "Z";
        // 2. primitive variables (value stored directly)
        int age = 25;
        boolean isLearningJava = true;
        // 3. combine text with other values via String concatenation
        System.out.println("Hello " + name);
        System.out.println("Age: " + age);
        System.out.println("Learning Java: " + isLearningJava);
    }
}
```

**Explain in plain English (EiPE):** three typed variables are created, then each is printed — and because one side of every `+` is a `String`, the numbers and the boolean are converted to text and joined.

## Trace

**Predict the output first (write it before reading on):**  `___`

| Line | Statement | `name` | `age` | `isLearningJava` | Output |
|---|---|---|---|---|---|
| 1 | `String name = "Z";` | `"Z"` | — | — | — |
| 2 | `int age = 25;` | `"Z"` | `25` | — | — |
| 3 | `boolean isLearningJava = true;` | `"Z"` | `25` | `true` | — |
| 4 | `println("Hello " + name);` | `"Z"` | `25` | `true` | `Hello Z` |
| 5 | `println("Age: " + age);` | `"Z"` | `25` | `true` | `Age: 25` |
| 6 | `println("Learning Java: " + isLearningJava);` | `"Z"` | `25` | `true` | `Learning Java: true` |

**Actual output:**
```
Hello Z
Age: 25
Learning Java: true
```
Note line 5: `age` is the `int` `25`, but `"Age: " + age` turns it into the text `"25"` — concatenation, not arithmetic.

## Faded Practice

Fill the blank with the type that stores only `true`/`false` (the load-bearing decision):
```java
public class Main {
    public static void main(String[] args) {
        ______ isLearningJava = true;   // which type accepts true/false and nothing else?
        System.out.println(isLearningJava);
    }
}
```
> [!answer]- Answer
> `boolean` — the only type whose values are exactly `true` and `false`. Using `int` would compile-fail on `= true`, since `true` is not a number.

## Common Mistakes

- Omitting the type on a *first* declaration → Java is statically typed; a variable needs a declared type before its first use (`age = 25;` alone fails unless `age` was declared earlier).
- Assigning a value of the wrong type → the value must be compatible with the declared type; `int age = "twenty";` is a compile error.
- Reusing a name with a new type in the same scope → a variable's type is fixed for its lifetime; you cannot redeclare `int x` as `String x`.
- Ignoring case sensitivity → `age` and `Age` are two different variables.
- Confusing declaration with assignment → declaration introduces name + type once; `=` stores or updates the value.

## Examples and Non-Examples

**Examples**
```java
int score = 90;              // primitive: whole number stored directly
String firstName = "Z";      // reference: points to a String object
boolean isLoggedIn = false;  // primitive: true/false only
```

**Non-Examples**
```java
age = 25;
// FALSE BELIEF: "you can use a variable without ever giving it a type"
// Compile error if age was never declared — every variable needs a type first.

int age = "twenty";
// FALSE BELIEF: "Java converts any value to fit the variable's type"
// A String cannot be stored in an int — compile-time type mismatch.

String 1name = "Z";
// FALSE BELIEF: "any label can be a variable name"
// Identifiers may not start with a digit — invalid name.
```

## Mini Practice

1. Declare variables for your name, age, and whether you like Java, then print them in one sentence. **Expected output:** one line like `Z is 25 and likes Java: true`. (Predict the exact text first, then run.)
2. Reassign one variable to a new value of the *same* type and print again. **Success criterion:** the second line reflects the updated value with no compile error.
3. Deliberately write `int likesJava = true;` and try to compile. **Success criterion:** you can name the error *before* running — a type mismatch, `boolean` cannot go in an `int`.

## Mistake Log

When you miss one, add it to [[Fundamentals Mistake Log]] as: wrong output → minimal repro → misconception → recall-question form → fix.

## Links

- Contrast: primitives stored **by value** vs reference types stored **by reference** → [[Primitive Types Null and Defaults]]
- Map: [[Java Fundamentals MOC]]
- Related: [[Operators and Expressions]] · [[Java Typing System and Naming Conventions]]
- Prerequisites: [[Hello World in Java]]

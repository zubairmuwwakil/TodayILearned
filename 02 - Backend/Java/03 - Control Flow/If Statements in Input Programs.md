---
type: concept
topic: control-flow
status: learning
difficulty: easy
tags:
  - java
  - control-flow
  - if-statement
---
# If Statements in Input Programs

## What it is

An `if` statement lets a program **choose whether to run a block of code based on a condition**. The condition must be a `boolean` expression: if it evaluates to `true`, the block runs; otherwise Java skips it. An optional `else` supplies the alternative path, and chained `else if` branches handle multiple cases. In *input programs*, the condition usually tests a value the user just typed (from a `Scanner`), so the program reacts to real input.

## Why it matters

Without branching, a program does the same thing every run. Combined with input, `if` lets code respond to what the user enters — validate a PIN, count positives vs. negatives, classify a number as even or odd, or reject an invalid menu choice. It is the most fundamental building block of decision-making, and every loop's exit test is the same kind of boolean condition.

## Syntax / Pattern

```java
if (condition) {
    // runs only when condition is true
} else if (otherCondition) {
    // runs when the first was false and this is true
} else {
    // runs when every condition above was false
}
```

Counting pattern (the shape most input programs use):

```java
if (number > 0) {
    positives++;
} else if (number < 0) {
    negatives++;
} else {
    zeros++;          // 0 is neither positive nor negative — give it its own branch
}
```

## Worked Example

```java
import java.util.Scanner;

public class EvenOrOdd {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter an integer: ");
        int number = scanner.nextInt();      // 1. read the user's number

        // 2. build the boolean condition: is the remainder zero?
        if (number % 2 == 0) {
            System.out.println("Even");      // 3. true path
        } else {
            System.out.println("Odd");       // 4. false path
        }

        scanner.close();
    }
}
```

**Explain in plain English (EiPE):** it reads one integer and prints whether it is even or odd by testing the remainder left over when the number is divided by 2.

## Trace

**Predict the output first (write it before reading on):**  `___`

Assume the user enters `7`.

| Line | Statement | `number` | Condition `number % 2 == 0` | Output |
|---|---|---|---|---|
| 1 | `int number = scanner.nextInt();` | `7` | — | — |
| 2 | `if (number % 2 == 0)` | `7` | `7 % 2` is `1`, so `1 == 0` is `false` | — |
| 3 | *(if block skipped)* | `7` | `false` | — |
| 4 | `else { System.out.println("Odd"); }` | `7` | `false` | `Odd` |

**Actual output:** `Odd`. The remainder of `7 / 2` is `1`, not `0`, so the condition is false and only the `else` branch runs.

## Faded Practice

Fill the blank so the program correctly detects even numbers (the load-bearing decision):

```java
if (number ______) {          // which test is true exactly when number is even?
    System.out.println("Even");
} else {
    System.out.println("Odd");
}
```
> [!answer]- Answer
> `% 2 == 0`. The modulo operator `%` returns the remainder of the division; an integer is even exactly when its remainder after dividing by 2 is `0`. Prefer `== 0` over `== 1` for the odd case: in Java `%` takes the sign of the dividend, so `-7 % 2` is `-1` (not `1`), which means `% 2 == 1` misclassifies negative odd numbers. Test `% 2 != 0` for odd instead.

## Common Mistakes

- Writing `=` (assignment) where you mean `==` (comparison) → with `int` operands Java **rejects it at compile time** (`incompatible types: int cannot be converted to boolean`); with `boolean` operands it compiles silently and is a real bug.
- Forgetting the curly braces → only the single next statement is guarded; later lines run unconditionally.
- Putting a semicolon right after the condition, `if (x > 0);` → the `;` becomes an empty if-body, so the block below always runs.
- Forgetting that `%` returns the *remainder*, not the quotient.
- Comparing `String` input with `==` instead of `.equals()` → `==` compares references, not text.
- Not handling every case → e.g. counting positives and negatives but silently ignoring `0`.

## Examples and Non-Examples

**Example:**
```java
if (pin == CORRECT_PIN) {         // == compares the two int values
    System.out.println("Access granted");
}
```

**Non-Example:**
```java
if (pin = CORRECT_PIN) {          // will NOT compile when pin is an int
    System.out.println("Access granted");
}
// FALSE BELIEF: "= and == are interchangeable inside a condition."
// = assigns and yields an int; if() needs a boolean, so Java flags it at compile time.
```

**Example:**
```java
if (number % 2 == 0) {            // remainder 0 -> even
    System.out.println("Even");
}
```

## Mini Practice

1. Read an integer and print `Positive`, `Negative`, or `Zero`. **Expected output** for input `-5`: `Negative`; for input `0`: `Zero`. (Predict all three branches, then run.)
2. Read a PIN and print `Access granted` or `Access denied` by comparing against a `final int CORRECT_PIN`. **Success criterion:** wrong PINs are denied and only the exact match is granted.
3. Read a score `0–100` and print `Pass` if it is `>= 50`, else `Fail`. **Expected output** for input `49`: `Fail`; for `50`: `Pass`. (Predict the boundary case first.)

## Mistake Log

When you miss one, log it to [[Control Flow Mistake Log]] as: wrong output → minimal repro → misconception → recall-question form → fix.

## Links

- Contrast: [[Switch Statements]] (multi-way choice on one value) vs. an `if`/`else if` chain
- Map: [[Control Flow MOC]]
- Related: [[Scanner Input]] · [[While Loops]] · [[Do While Loops]] · [[Sentinel-Controlled Loops]]
- Prerequisites: [[Boolean Expressions]] · [[Comparison Operators]] · [[Variables and Data Types]]

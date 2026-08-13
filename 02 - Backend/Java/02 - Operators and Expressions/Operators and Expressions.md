---
aliases:
  - Operators
type: concept
topic: operators-and-expressions
status: learning
difficulty: easy
tags:
  - java
  - operators-and-expressions
  - operators
---
# Operators and Expressions

## What it is

An **operator** performs an action on one or more **operands**; an **expression** is any code that evaluates to a single value. Every expression has a **type** (e.g. `int`, `double`, `boolean`), and that type — together with operator **precedence** — decides how it is evaluated.

Example: in `5 + 3`, `+` is the operator, `5` and `3` are the operands, and `5 + 3` is an `int` expression that evaluates to `8`.

## Why it matters

Expressions are the atoms of every calculation, condition, assignment, loop test, and print. Two things trip up beginners constantly and change the *value* you get: the operand **types** (integer vs floating-point division) and **precedence** (what runs first). Getting these right is the difference between `3` and `3.333`.

## Syntax / Pattern

```java
int sum = a + b;              // arithmetic:  + - * / %
boolean ok = a >= b;          // comparison → boolean:  > < >= <= == !=
boolean both = ok && ready;   // logical (combine booleans):  && || !
variable = expression;        // assignment (also += -= *= /= %=)
```

Rule of thumb: `int OP int` stays `int`; comparison/logical operators always produce `boolean`.

## Worked Example

```java
public class Main {
    public static void main(String[] args) {
        int a = 10;
        int b = 3;

        // 1. arithmetic — note int/int truncates, % is the remainder
        int sum = a + b;          // 13
        int quotient = a / b;     // 3   (NOT 3.333 — both operands are int)
        int remainder = a % b;    // 1

        // 2. comparison produces a boolean
        boolean isGreater = a > b;          // true

        // 3. logical operators combine booleans
        boolean inRange = a > 5 && b < 5;   // true && true → true

        System.out.println(sum);
        System.out.println(quotient);
        System.out.println(remainder);
        System.out.println(isGreater);
        System.out.println(inRange);
    }
}
```

**Explain in plain English (EiPE):** the same two `int`s feed several operators, and the operator (plus the operand types) decides both the value and the type of each result.

## Trace
**Predict the output first (write it before reading on):**  `___`

| Line | Statement | Value produced | Output |
|---|---|---|---|
| 1 | `int sum = a + b;` | `sum` = `13` | — |
| 2 | `int quotient = a / b;` | `quotient` = `3` (int division truncates) | — |
| 3 | `int remainder = a % b;` | `remainder` = `1` (10 = 3·3 + 1) | — |
| 4 | `boolean isGreater = a > b;` | `isGreater` = `true` | — |
| 5 | `boolean inRange = a > 5 && b < 5;` | `true && true` → `true` | — |
| 6 | `System.out.println(sum);` | — | `13` |
| 7 | `System.out.println(quotient);` | — | `3` |
| 8 | `System.out.println(remainder);` | — | `1` |
| 9 | `System.out.println(isGreater);` | — | `true` |
| 10 | `System.out.println(inRange);` | — | `true` |

**Actual output:** `13`, `3`, `1`, `true`, `true`. The `/` on line 2 threw away the fractional part *because both operands were `int`* — that is the whole game.

## Faded Practice
Fill the blank so `avg` holds `3.333…` and not `3.0` (the load-bearing decision):
```java
int total = 10;
int count = 3;
double avg = ______;   // must be a real decimal, not 3.0
System.out.println(avg);
```
> [!answer]- Answer
> `(double) total / count`. The cast binds tighter than `/`, so it runs as `((double) total) / count` → `10.0 / 3` → floating-point division → `3.3333333333333335`. Writing `(double)(total / count)` gives `3.0`, because the `int / int` happens *first* and only then gets widened.

Progression to aim for: read this labeled example → predict the trace above → complete-the-code (here) → write your own expression with mixed types and precedence and predict its value from a blank editor (see Mini Practice).

## Common Mistakes
- Using `=` (assignment) where you mean `==` (comparison) → `=` stores a value; `==` tests equality.
- Reading `%` as "percent" → it is the **remainder** operator: `10 % 3` is `1`.
- Expecting `10 / 3` to give `3.333` → `int / int` truncates to `3`; cast one operand to `double` for a fractional result.
- Comparing `String` (or any object) with `==` → that tests reference identity, not contents; use `.equals()`.
- Assuming `&&` and `&` are interchangeable → `&&` short-circuits (skips the right side once the left decides the result); `&` always evaluates both.
- Trusting left-to-right reading over precedence → `2 + 3 * 4` is `14`, because `*` runs before `+`.

## Examples and Non-Examples
**Examples**
```java
int remainder = 10 % 3;              // 1
boolean isEven = number % 2 == 0;    // precedence: (number % 2) == 0, then a boolean
int nextAge = age + 1;
String message = "Age: " + age;      // + with a String concatenates
```

**Non-Examples**
```java
if (age = 18) { }        // compile error: int cannot be converted to boolean
// FALSE BELIEF: "= tests equality" — in Java it assigns, and here it won't even compile

double wrong = 10 / 3;   // 3.0, not 3.333...
// FALSE BELIEF: "assigning to a double makes / a decimal" — the int/int ran first
double right = 10.0 / 3; // 3.333... — one operand is a double, so division is floating-point
```

## Recall Questions
%% Review via the Spaced Repetition plugin (Cmd/Ctrl+P > "Review flashcards"), not by rereading. %%
#flashcards/java/operators-and-expressions

Why does `10 / 3` evaluate to `3` and not `3.333` in Java?
?
Both operands are `int`, so Java does integer division and truncates the fractional part. Cast one operand to `double` (e.g. `(double) 10 / 3`) to get `3.333…`.

What does the `%` (remainder) operator return?
?
The remainder after integer division: `10 % 3` is `1`. It does not mean "percent". In Java it is officially the *remainder* operator (loosely called "modulo"); for negative operands the result takes the sign of the dividend, so `-10 % 3` is `-1`, not `2`.

How do `&&` and `&` differ when used on booleans?
?
`&&` short-circuits — it skips evaluating the right operand once the left already determines the result. `&` always evaluates both operands.

## Mini Practice
1. Write an expression that is `true` exactly when `number` is even, and test it with `number = 7`. **Expected output:** `false`. (Predict, then run: the expression is `number % 2 == 0`.)
2. Compute the average of `int total = 7, count = 2` as a decimal. **Expected output:** `3.5` (not `3.0`). **Success criterion:** you cast to `double` before dividing.
3. Trace `int result = 2 + 3 * 4;` on paper. **Expected output:** `14`. Predict from precedence before you run it.

## Mistake Log
When you miss one, add it to [[Operators and Expressions Mistake Log]] as: wrong output → minimal repro → misconception → recall-question form → fix.

## Links
- Contrast: [[Increment and Decrement Operators]] — operators that *read and mutate* their operand, unlike the pure `+ - * / %` here.
- Map: [[Java Fundamentals MOC]]
- Related: [[Variables and Types]] · [[If Else and Else If Statements]] · [[Sentinel-Controlled Loops]]
- Prerequisites: [[Variables and Types]]

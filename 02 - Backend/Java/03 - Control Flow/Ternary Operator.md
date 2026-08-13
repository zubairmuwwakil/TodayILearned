---
type: concept
topic: control-flow
status: learning
difficulty: easy
tags:
  - java
  - control-flow
  - ternary-operator
---
# Ternary Operator

## What it is

The ternary operator `? :` (Java's only *conditional operator*, and its only three-operand operator) is a compact **expression** that evaluates a boolean condition and **produces one of two values**. Exactly one branch is evaluated, and the whole thing resolves to that branch's value.

## Why it matters

It replaces a small `if/else` whose only job is to pick a value, letting you assign or embed that choice inline. Because it is an *expression* (not a statement), it can go anywhere a value is expected — an assignment, a `println`, an argument. For anything more than a two-way value pick, a plain `if/else` or `switch` stays clearer.

## Syntax / Pattern

```java
result = condition ? valueIfTrue : valueIfFalse;
//       └ boolean ┘ └ if true ┘   └ if false ┘
```

Read it as: *"if `condition`, then `valueIfTrue`, else `valueIfFalse`."* Both branch values must have a **compatible type** — the compiler picks a single result type from both at compile time.

## Worked Example

```java
public class Main {
    public static void main(String[] args) {
        // 1. the boolean condition to test
        boolean isDaytime = true;
        // 2. pick a value from the condition (true-branch after '?')
        String lightMode = isDaytime ? "OFF" : "ON";
        // 3. use the selected value
        System.out.println("Lights are " + lightMode);
    }
}
```

**Explain in plain English (EiPE):** the single line `isDaytime ? "OFF" : "ON"` selects one of two strings based on the condition and hands it straight to `lightMode`.

### Ternary as a value inside an expression
```java
int a = 7, b = 12;
int max = a > b ? a : b;                 // 1. resolves to the larger int
System.out.println("Max: " + (a > b ? a : b));   // 2. parentheses required!
```
`+` binds tighter than `? :`, so without the parentheses `"Max: " + a > b ? a : b` would try to compare a `String` with `b` and fail to compile. Wrap the ternary when concatenating.

## Trace
**Predict the output first (write it before reading on):**  `___`

| Line | Statement | `isDaytime` | `lightMode` | Output |
|---|---|---|---|---|
| 1 | `boolean isDaytime = true;` | `true` | — | — |
| 2 | `String lightMode = isDaytime ? "OFF" : "ON";` | `true` | `"OFF"` | — |
| 3 | `System.out.println("Lights are " + lightMode);` | `true` | `"OFF"` | `Lights are OFF` |

**Actual output:** `Lights are OFF`. The condition is `true`, so the value **after `?`** wins; the `"ON"` branch is never evaluated.

## Faded Practice
Fill the blank so a score of 60 or more prints `Pass` (the load-bearing decision — which branch is the true case?):
```java
int score = 85;
String result = score >= 60 ? ______ : "Fail";
System.out.println(result);
```
> [!answer]- Answer
> `"Pass"`. The value **immediately after `?`** is returned when the condition is `true`; the value after `:` is the `false` case. Order matters — swapping them inverts the logic.

## Common Mistakes
- Using a ternary as a standalone line → it is an expression; its value must be **used or assigned**, never left dangling.
- Reaching for it to run *statements* or side effects → use it only to **select a value**, not to replace a control-flow block.
- Assuming the result type is just "whichever branch runs" → the compiler fixes **one** result type from **both** branches; mixing `int` and `double` makes the whole expression `double`.
- Mixing genuinely incompatible branch types → both must share a compatible type, or it won't compile.
- Forgetting `? :` has very low precedence → parenthesize it when embedding in `+` concatenation or arithmetic.
- Deeply nesting ternaries for multi-way choices → prefer `if/else` or `switch` for readability (chained `? :` is right-associative and hard to scan).

## Examples and Non-Examples

**Example:**
```java
int age = 20;
String status = age >= 18 ? "Adult" : "Minor";   // status = "Adult"
```

**Non-Example (dangling ternary):**
```java
age >= 18 ? "Adult" : "Minor";   // compile error: not a statement
// FALSE BELIEF: "a ternary can stand on its own line like an if statement"
```

**Non-Example (result type comes from BOTH branches):**
```java
int i = true ? 1 : 2.0;   // compile error: incompatible types (double -> int)
// FALSE BELIEF: "the result type is whatever the true branch is (int)"
// It is 'double': int and double are promoted to a common type at compile time.
```

## Recall Questions
%% Review via the Spaced Repetition plugin (Cmd/Ctrl+P > "Review flashcards"), not by rereading. %%
#flashcards/java/control-flow

Is a ternary a statement or an expression, and what follows from that?
?
An expression — it evaluates to a value, so that value must be assigned or used; it cannot stand alone as a statement.

What is the type of `true ? 1 : 2.0`, and why?
?
`double`. Java fixes one result type from *both* branches at compile time via numeric promotion — not from whichever branch happens to run.

## Mini Practice
Predict each output, then run to confirm.
1. Set `int n = 7;` and use a ternary to store `"Even"` or `"Odd"` in `parity`. **Expected output:** `Odd`.
2. Set `int score = 55;` and use a ternary (`>= 60`) to store `"Pass"` or `"Fail"`. **Expected output:** `Fail`.
3. Rewrite `String x = a > b ? "a wins" : "b wins";` as an equivalent `if/else`. **Success criterion:** `x` holds the same value as the ternary for every pair of `a`, `b`.

## Mistake Log
When you miss one, add it to [[Control Flow Mistake Log]] as: wrong output → minimal repro → misconception → recall-question form → fix.

## Links
- Contrast: [[If Else and Else If Statements]] (a *statement*, multi-way) vs the ternary (an *expression*, two-way value pick)
- Map: [[Control Flow MOC]]
- Related: [[Operators and Expressions]] · [[Switch Statement]]
- Prerequisites: [[Boolean Expressions]] · [[Variables and Data Types]]

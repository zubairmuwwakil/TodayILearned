---
type: concept
topic: control-flow
status: learning
difficulty: easy
tags:
  - java
  - control-flow
  - conditionals
---
# If Else and Else If Statements

## What it is

`if` / `else if` / `else` form a **decision ladder**: Java evaluates each condition top to bottom and runs the block of the **first** one that is `true`. Once a branch runs, the rest of the ladder is skipped. `else` is the optional catch-all that runs only when every condition above it was `false`.

## Why it matters

Branching is how a program reacts to data instead of doing the same thing every time — validation, grading, permissions, menus, pricing tiers. The ladder guarantees **exactly one** branch runs, which keeps mutually-exclusive logic (like letter grades) correct and readable.

## Syntax / Pattern

```java
if (condition) {
    // runs when condition is true
} else if (anotherCondition) {
    // runs only if condition was false AND anotherCondition is true
} else {
    // runs only if every condition above was false
}
```

The condition must be a `boolean` (in parentheses). `else if` and `else` are optional; a bare `if` is legal on its own.

## Worked Example

```java
public class Main {
    public static void main(String[] args) {
        int score = 85;                    // 1. the value we branch on

        if (score >= 90) {                 // 2. first gate: 85 >= 90 is false
            System.out.println("A");
        } else if (score >= 80) {          // 3. checked only because #2 failed: 85 >= 80 is true
            System.out.println("B");       // 4. this prints, then the ladder exits
        } else if (score >= 70) {          // 5. never evaluated
            System.out.println("C");
        } else {
            System.out.println("F");
        }
    }
}
```

**Explain in plain English (EiPE):** the ladder walks the thresholds from highest to lowest and stops at the first one the score clears, printing that grade and nothing else.

## Trace
**Predict the output first (write it before reading on):**  `___`

| Line | Statement | `score` | Condition result | Output |
|---|---|---|---|---|
| 1 | `int score = 85;` | `85` | — | — |
| 2 | `if (score >= 90)` | `85` | `false` | — |
| 3 | `else if (score >= 80)` | `85` | `true` | — |
| 4 | `System.out.println("B");` | `85` | — | `B` |
| 5 | remaining `else if` / `else` | `85` | skipped | — |

**Actual output:** `B`. The `>= 70` branch and the `else` are never even evaluated — the first true condition short-circuits the rest of the ladder.

## Faded Practice
Fill the blank so a 95 prints only `A`, not `A` and `B` (the load-bearing decision):
```java
if (score >= 90) {
    System.out.println("A");
} ______ (score >= 80) {   // keyword that makes this checked ONLY when 90+ failed
    System.out.println("B");
}
```
> [!answer]- Answer
> `else if`. With a plain second `if`, the two conditions are tested **independently** — a `95` satisfies both and prints `A` then `B`. `else if` runs only when the previous condition was `false`, so the branches stay mutually exclusive.

## Common Mistakes

- Using `=` (assignment) instead of `==` (comparison) in a condition → in Java, `if (x = 5)` is a compile error unless `x` is `boolean`; use `==`.
- Writing the ladder from least-specific to most-specific → the broad condition catches everything first and the specific branch is dead. Order from narrowest/highest to widest/lowest.
- Using separate `if` statements when you meant a ladder → multiple branches can fire; use `else if` for "pick exactly one."
- Putting a `;` right after the condition, e.g. `if (x > 0);` → the `if` controls an empty statement and the block always runs.
- Dropping braces and then adding a second line → only the first line is guarded; the second runs unconditionally. Always brace.

## Examples and Non-Examples
**Example:**
```java
if (age >= 18) {
    System.out.println("Adult");
} else {
    System.out.println("Minor");
}
```

**Non-Example:**
```java
if (score >= 70) {
    System.out.println("C or better");
} else if (score >= 90) {          // dead branch: a 95 already matched >= 70
    System.out.println("A");
}
// FALSE BELIEF: "Java scans the whole ladder and picks the best-matching branch."
// It picks the FIRST true branch, top to bottom — so order the conditions accordingly.
```

## Recall Questions
%% Review via the Spaced Repetition plugin (Cmd/Ctrl+P > "Review flashcards"), not by rereading. %%
#flashcards/java/control-flow

Why does the order of conditions matter in an else-if ladder?
?
Java checks top to bottom and stops at the first `true`. A broad condition placed above a narrower one will catch the value first, making the narrower branch unreachable.

What is the difference between `else if` and a second, separate `if`?
?
`else if` is only tested when the previous condition was `false`, so branches are mutually exclusive. Separate `if`s are tested independently, so several can run for the same value.

Why is `if (x = 5)` usually a compile error in Java?
?
`=` is assignment, producing an `int`, but `if` requires a `boolean`. (Unless `x` is itself `boolean`.) Use `==` for comparison.

## Mini Practice
1. Print `Adult` if `age >= 18`, else `Minor`. Try `age = 18`. **Expected output:** `Adult`. (Predict, then run.)
2. Grade calculator: map a `score` to `A/B/C/D/F` using an else-if ladder. Test `score = 72`. **Expected output:** `C`. (Predict every branch first.)
3. Start from a ladder ordered `>= 60`, `>= 70`, `>= 90` and fix it. **Success criterion:** each threshold prints its own grade instead of the lowest one swallowing all inputs.

## Mistake Log
Log misses to [[Control Flow Mistake Log]] as: wrong output → minimal repro → misconception → recall-question form → fix.

## Links
- Contrast: [[Switch Statement]] (many discrete values) vs the if-else ladder (ranges and arbitrary boolean tests)
- Map: [[Control Flow MOC]]
- Related: [[Ternary Operator]] · [[Nested If Statements]] · [[If Statements in Input Programs]]
- Prerequisites: [[Operators and Expressions]] · [[Variables and Data Types]]

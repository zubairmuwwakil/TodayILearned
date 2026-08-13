---
type: concept
topic: loops
status: learning
difficulty: easy
tags:
  - java
  - loops
  - loop-selection
---
# Loop Selection Guide

## What it is

A **decision note**: given a repetition task, which of Java's three basic loops fits best? A loop repeats a block while a condition is true. The three beginner loops differ in *when* they test the condition and *whether the count is known up front*:

- `for` — counter-driven, known number of repetitions.
- `while` — **entry-controlled**: tests the condition *before* the body (can run zero times).
- `do-while` — **exit-controlled**: tests the condition *after* the body (runs at least once).

(Java also has the enhanced **[[For-Each Loop]]** for iterating arrays and collections — see Links.)

## Why it matters

Picking the loop that matches the situation makes intent obvious and cuts off whole classes of bugs (off-by-one, running zero times when it should run once, infinite loops). This matters most in the everyday shapes: counting through items, reading input until a stop value, and menu-driven programs.

## Syntax / Pattern

```java
for (init; condition; update) { /* body */ }   // known count
while (condition)             { /* body */ }   // tested BEFORE body -> maybe 0 runs
do    { /* body */ } while (condition);        // tested AFTER body  -> always >= 1 run
```

### Decision Table

| Situation | Best loop |
|---|---|
| You know how many times to repeat | `for` |
| You don't know the count, but know the stopping condition | `while` |
| Code must run **at least once** | `do-while` |
| User enters values until a stop value | `while` (sentinel loop) |
| Menu-driven program (show menu, then maybe repeat) | `do-while` |

**Decision flow:** Known count? → `for`. Otherwise, must it run at least once? → `do-while`, else `while`. Input ends on a special value? → sentinel `while`.

## Worked Example

The load-bearing distinction is entry- vs exit-controlled. Watch what each does when the condition is **false from the start**:

```java
public class LoopChoice {
    public static void main(String[] args) {
        int count = 0;                              // 1. value that fails count > 0

        // while: entry-controlled — condition checked BEFORE the body
        while (count > 0) {                         // 2. 0 > 0 is false -> body never runs
            System.out.println("while: " + count);
        }

        // do-while: exit-controlled — condition checked AFTER the body
        do {
            System.out.println("do-while: " + count); // 3. runs once regardless of condition
        } while (count > 0);                        // 4. 0 > 0 is false -> stop after one pass
    }
}
```

**Explain in plain English (EiPE):** with the same false condition, the `while` body is skipped entirely while the `do-while` body still runs exactly once — that "at least once" guarantee is the whole reason to choose `do-while`.

## Trace
**Predict the output first (write it before reading on):**  `___`

| Line | Statement | `count` | Output |
|---|---|---|---|
| 1 | `int count = 0;` | `0` | — |
| 2 | `while (count > 0)` | `0` | condition false → body skipped |
| 3 | `System.out.println("do-while: " + count);` | `0` | `do-while: 0` |
| 4 | `} while (count > 0);` | `0` | condition false → exit |

**Actual output:** `do-while: 0` (one line only — the `while` printed nothing).

## Faded Practice

A menu must display **at least once**, then keep repeating until the user enters `0`. Fill the load-bearing keyword:

```java
______ {                             // which loop guarantees the menu shows at least once?
    printMenu();
    choice = scanner.nextInt();
} while (choice != 0);
```
> [!answer]- Answer
> `do` — a `do-while` is exit-controlled, so the body runs before the condition is tested, guaranteeing the menu appears at least once. A plain `while` here could show the menu zero times if `choice` already held `0`.

## Common Mistakes

- Using `while` when the count is fixed → prefer `for`, which keeps the counter, test, and update in one place.
- Using `for` when the number of repetitions depends on user input → the count isn't known, so use `while`.
- Forgetting to update the loop variable / advance the input → infinite loop.
- Writing `for (;;)` or a `while (true)` with no reachable exit → infinite loop unless there's a clear `break` or changing condition.
- Assuming `do-while` tests first → it tests **after** the body, so the body always runs once.
- Using `do-while` where the loop should be able to run **zero** times → use `while` instead.

## Examples and Non-Examples

**Example — known count, use `for`:**
```java
for (int i = 1; i <= itemCount; i++) {   // count is known up front
    total += scanner.nextDouble();
}
```

**Example — input until a sentinel, use `while`:**
```java
while (chosenNumber != 0) {              // 0 is the sentinel that ends input
    process(chosenNumber);
    chosenNumber = scanner.nextInt();
}
```

**Non-Example:**
```java
// FALSE BELIEF: "do-while and while are interchangeable"
int n = 0;
do {
    System.out.println("processed");    // prints once even though n > 0 is false
} while (n > 0);
```
They are not interchangeable: `while` here would print nothing, but `do-while` still runs once. Choose based on whether the body must run at least once.

## Recall Questions
%% Review via the Spaced Repetition plugin (Cmd/Ctrl+P > "Review flashcards"), not by rereading. %%
#flashcards/java/loops

When should you reach for a `for` loop instead of a `while`?
?
When the number of repetitions is known up front (counting through a fixed range or a known item count) — `for` bundles the counter, test, and update together.

What is the defining difference between `while` and `do-while`?
?
`while` is entry-controlled (condition tested *before* the body, so it can run zero times); `do-while` is exit-controlled (condition tested *after* the body, so it always runs at least once).

What is a sentinel value, and which loop pairs with it?
?
A special input value (e.g. `0`) that signals the end of input. It pairs with a `while` loop that keeps reading until the sentinel is entered.

## Mini Practice

1. Print the numbers 1 to 10. **Choose the loop, then run it. Expected output:** `1` through `10`, one per line. (Which loop, and why?)
2. Keep asking for numbers until the user enters `0`. **Success criterion:** the loop stops immediately after `0` is entered and never processes the `0`. (Predict which loop before coding.)
3. Show a menu, read a choice, and repeat until the user picks "Exit". **Success criterion:** the menu appears at least once even if the user exits on the first try.
4. Take Mini Practice #1 and rewrite it with a *different* loop type. **Predict-then-run:** confirm the output is identical, and note which version reads more clearly.

## Mistake Log

When you miss one, log it to [[Loops Mistake Log]] as: wrong output → minimal repro → misconception → recall-question form → fix.

## Links

- Contrast: [[While Loops]] (entry-controlled, may run 0×) vs [[Do While Loops]] (exit-controlled, runs ≥ 1×)
- Map: [[Loops MOC]]
- Related: [[For Loops]] · [[While Loops]] · [[Do While Loops]] · [[Sentinel-Controlled Loops]] · [[For-Each Loop]]
- In practice: [[Scanner and Loops Pattern]]
- Prerequisites: [[Boolean Expressions]] · [[Relational Operators]] · [[Variables and Assignment]]

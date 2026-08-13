---
type: concept
topic: loops
status: learning
difficulty: easy
tags:
  - java
  - loops
  - while-loop
---
# While Loops

## What it is

A `while` loop repeats a block of code **as long as a boolean condition stays true**. It is *entry-controlled* (pre-test): Java evaluates the condition **before** each pass, so if the condition is false at the start the body runs **zero** times.

## Why it matters

Reach for `while` when you know the **stopping condition** but not the **number of iterations** in advance:

- repeat until the user enters `0` (a sentinel value)
- repeat until a password is correct
- repeat while a value stays below a limit
- repeat while input is still valid

If you already know the iteration count, a [[For Loops|for]] loop states the bounds more clearly.

## Syntax / Pattern

```java
while (condition) {
    // repeated body
    // ...update something so the condition eventually turns false
}
```

Three moving parts live *around* the loop, not just inside the parentheses: **initialise** before, **test** at the top, **update** inside.

## Worked Example

```java
public class WhileLoop {
    public static void main(String[] args) {
        int i = 0;              // 1. initialise the loop variable BEFORE the loop
        while (i < 10) {        // 2. test the condition before every pass (entry-controlled)
            System.out.println(i);
            i = i + 2;          // 3. update so the condition eventually becomes false
        }
    }
}
```

**Explain in plain English (EiPE):** print every even number from `0` up to but not including `10`.

## Trace

**Predict the output first (write it before reading on):**  `___`

| Pass | `i` at check | `i < 10` | Output | `i` after `i = i + 2` |
|---|---|---|---|---|
| 1 | `0` | `true` | `0` | `2` |
| 2 | `2` | `true` | `2` | `4` |
| 3 | `4` | `true` | `4` | `6` |
| 4 | `6` | `true` | `6` | `8` |
| 5 | `8` | `true` | `8` | `10` |
| 6 | `10` | `false` | — | loop exits |

**Actual output:**
```text
0
2
4
6
8
```
The last printed value is `8`, not `10`: on pass 6 the condition is tested *before* any print, `10 < 10` is false, and the loop stops immediately.

## Faded Practice

Fill the blank so the loop terminates instead of running forever (the load-bearing line):
```java
int i = 0;
while (i < 10) {
    System.out.println(i);
    ______              // what keeps this loop from looping forever?
}
```
> [!answer]- Answer
> `i = i + 2;` (or `i += 2;`). Without an update to `i`, the condition `i < 10` never changes — it stays `true` forever, producing an infinite loop. The update is what lets an entry-controlled loop reach its exit.

## Common Mistakes

- Forgetting to update the loop variable → the condition never changes and the loop runs forever.
- Updating in the wrong direction (e.g. `i--` when the exit needs `i` to grow) → the loop never reaches its stop condition.
- Expecting the body to always run once → `while` is entry-controlled; a false-at-start condition runs it **zero** times (use `do-while` if you need at least one pass).
- Writing a condition that can never be true → the body never executes at all.
- Using `while` when the iteration count is fixed and known → a `for` loop reads more clearly.

## Examples and Non-Examples

**Example:**
```java
while (chosenNumber != 0) {        // repeats an UNKNOWN number of times
    process(chosenNumber);
    chosenNumber = scanner.nextInt();   // update comes from user input
}
```
Good fit: the number of repetitions is unknown, but the sentinel `0` defines a clear exit.

**Non-Example:**
```java
while (i < 10) {
    System.out.println(i);
    // FALSE BELIEF: "a condition that is true once will eventually go false on its own"
}
```
`i` is never modified, so `i < 10` stays true forever — an infinite loop. A `while` condition only changes when *your code* changes it.

## Recall Questions
%% Review via the Spaced Repetition plugin (Cmd/Ctrl+P > "Review flashcards"), not by rereading. %%
#flashcards/java/loops

What does it mean that a `while` loop is entry-controlled?
?
The condition is tested *before* each pass, including the first — so if it is false at the start, the body runs zero times.

When is a `while` loop a better choice than a `for` loop?
?
When you know the stopping condition but not the number of iterations in advance (e.g. reading until a sentinel value or valid input).

What causes an infinite `while` loop?
?
The condition never becomes false — usually because nothing inside the body updates the variable the condition depends on.

## Mini Practice

1. Count **down** from 10 to 1 with a `while` loop. **Expected output:** `10 9 8 7 6 5 4 3 2 1` (one per line). Predict, then run.
2. Ask the user for numbers until they enter `0`, printing each one back. **Success criterion:** entering `0` exits immediately without printing it.
3. Start at `1` and keep doubling until the value **exceeds** `100`, printing each step. **Expected output:** `1 2 4 8 16 32 64 128` — the loop stops once it prints `128`.

## Mistake Log

When you miss one, log it to [[Loops Mistake Log]] as: wrong output → minimal repro → misconception → recall-question form → fix.

## Links
- Contrast: [[Do While Loops]] (exit-controlled, runs at least once) vs `while` (entry-controlled, may run zero times)
- Map: [[Loops MOC]]
- Related: [[For Loops]] · [[Sentinel-Controlled Loops]] · [[Loop Selection Guide]]
- Prerequisites: [[Variables in Java]] · [[Boolean Expressions]]

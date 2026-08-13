---
type: concept
topic: loops
status: learning
difficulty: easy
tags:
  - java
  - loops
  - sentinel-controlled-loops
---
# Sentinel-Controlled Loops

## What it is

A sentinel-controlled loop repeats an **unknown** number of times, stopping only when the input equals a special "stop" value called the **sentinel**. The sentinel is a marker (e.g. `0`, `-1`, `"done"`), never real data to be processed.

Contrast this with a [[Count-Controlled Loops|count-controlled loop]], where you already know how many iterations to run.

## Why it matters

This is one of the highest-ROI patterns for beginner Java: reading input "until the user is done" appears everywhere — sum numbers until `0`, average grades until `-1`, collect names until `"done"`. Get the *shape* right once and you reuse it for every input-until-stop problem.

## Syntax / Pattern

The load-bearing shape is **read once, then read again at the bottom of every iteration**:

```text
read first value          (priming read, BEFORE the loop)
while value is not sentinel
    process value
    read next value       (advance, INSIDE the loop)
```

```java
System.out.print("Enter a number (0 to stop): ");
int number = scanner.nextInt();   // priming read

while (number != 0) {
    // process number here (the sentinel never reaches this body)

    System.out.print("Enter a number (0 to stop): ");
    number = scanner.nextInt();   // advance to the next value
}
```

## Worked Example

```java
import java.util.Scanner;

public class SumUntilZero {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // 1. priming read: get the FIRST value before the condition is tested
        System.out.print("Enter a number (0 to stop): ");
        int number = scanner.nextInt();

        int total = 0;
        int count = 0;

        // 2. loop while the value is NOT the sentinel
        while (number != 0) {
            total += number;   // process (0 never gets here, so it is never added)
            count++;

            // 3. advance: read the NEXT value before looping back
            System.out.print("Enter a number (0 to stop): ");
            number = scanner.nextInt();
        }

        // 4. guard against division by zero when no real values were entered
        double average = (count > 0) ? (double) total / count : 0.0;

        System.out.printf("Total: %d, Count: %d, Average: %.2f%n", total, count, average);
        scanner.close();
    }
}
```

**Explain in plain English (EiPE):** keep adding numbers to a running total (and counting them) until the user types `0`, then report the total, the count, and the average.

## Trace

**Predict the output first (write it before reading on):**  `___`

Inputs entered by the user: `5`, `-2`, `4`, `0`.

| Step | Action | `number` | `total` | `count` | Output |
|---|---|---|---|---|---|
| 1 | priming read | `5` | `0` | `0` | — |
| 2 | `5 != 0` true → add, count | `5` | `5` | `1` | — |
| 3 | read next | `-2` | `5` | `1` | — |
| 4 | `-2 != 0` true → add, count | `-2` | `3` | `2` | — |
| 5 | read next | `4` | `3` | `2` | — |
| 6 | `4 != 0` true → add, count | `4` | `7` | `3` | — |
| 7 | read next | `0` | `7` | `3` | — |
| 8 | `0 != 0` false → exit loop | `0` | `7` | `3` | — |
| 9 | compute average `(double)7 / 3`, print | `0` | `7` | `3` | `Total: 7, Count: 3, Average: 2.33` |

**Actual output:** `Total: 7, Count: 3, Average: 2.33`. Note `0` is read (step 7) but exits the loop *before* the body runs, so it is never added to `total` or counted.

## Faded Practice

Fill the blank so the loop terminates correctly (the one line beginners forget):
```java
System.out.print("Enter a number (0 to stop): ");
int number = scanner.nextInt();      // priming read

int total = 0;
while (number != 0) {
    total += number;

    System.out.print("Enter a number (0 to stop): ");
    ______                           // what keeps this loop from running forever?
}
```
> [!answer]- Answer
> `number = scanner.nextInt();` — you must re-read into the **same** variable the condition tests. Without it, `number` never changes, never reaches the sentinel, and the loop spins forever (an infinite loop).

## Common Mistakes

- Processing the sentinel as real data → the loop must exit *before* the body runs on the sentinel; put processing inside the loop, never after reading a value that might be the sentinel.
- Forgetting the priming read → the condition tests `number` on the very first check, so it must already hold a real value.
- Forgetting to re-read inside the loop → `number` never changes, so the loop never terminates.
- Reading into a *different* variable than the one the condition tests → the condition still sees the old value → infinite loop.
- Dividing by zero when the user enters the sentinel immediately → guard the average with `count > 0`.
- Integer division when averaging → cast one operand: `(double) total / count`, not `total / count`.

## Examples and Non-Examples

**Example — advance happens every iteration:**
```java
while (number != 0) {
    total += number;
    number = scanner.nextInt();   // 0 stops the loop and is never added
}
```

**Non-Example — no re-read:**
```java
while (number != 0) {
    total += number;
    // FALSE BELIEF: "the while condition re-reads input on its own"
    // It does not — `number` is frozen, so this loops forever.
}
```

**Example — safe average:**
```java
double average = (count > 0) ? (double) total / count : 0.0;   // no divide-by-zero, real division
```

**Non-Example — truncating average:**
```java
double average = total / count;   // FALSE BELIEF: "assigning to double makes the math floating-point"
// int / int is computed FIRST (truncating), THEN widened: 7 / 3 gives 2.0, not 2.33.
```

## Recall Questions
%% Review via the Spaced Repetition plugin (Cmd/Ctrl+P > "Review flashcards"), not by rereading. %%
#flashcards/java/loops

Why must the sentinel itself not be processed?
?
The loop condition exits before the body runs on the sentinel, so processing it would pollute totals/counts with a value that only means "stop."

Why do we read the first value BEFORE the while loop (the priming read)?
?
The condition tests the variable on its very first check, so the variable must already hold a real value; otherwise it would be uninitialized.

## Mini Practice

1. Read numbers until `0`, then print the total. **Predict then run** — for inputs `3`, `7`, `0`, **expected output:** `Total: 10`.
2. Read grades until `-1`, then print the average. For inputs `90`, `80`, `70`, `-1`, **expected output:** `Average: 80.00`.
3. Read names until `"done"`, then count them. Use `scanner.next()` and a `String` sentinel (`name.equals("done")`, not `==`). For `alice`, `bob`, `done`, **expected output:** `2 names entered`.
4. Extend program 1: also classify each number as positive/negative and even/odd, and print all counts with a `printf` text block. **Success criterion:** every non-sentinel number is counted in exactly one of positives/negatives and one of evens/odds.

## Mistake Log

When you miss one, log it to [[Loops Mistake Log]] as: wrong output → minimal repro → misconception → recall-question form → fix.

## Links

- Contrast: [[Count-Controlled Loops]] (known iteration count) vs sentinel-controlled (stop on a special value)
- Map: [[Loops MOC]]
- Related: [[While Loops]] · [[Scanner and Loops Pattern]] · [[If Statements in Input Programs]] · [[Java Input and Loops Review]]
- Prerequisites: [[While Loops]] · [[Scanner Input]]

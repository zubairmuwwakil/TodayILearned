---
type: concept
topic: loops
status: learning
difficulty: easy
tags:
  - java
  - loops
  - input-loops
  - sentinel-controlled
---
# Scanner and Loops Pattern

## What it is

A reusable shape for interactive programs: **read a value, act on it, then read again**, repeating until some stopping condition. It stitches together three primitives you already know — a [[Scanner Input|Scanner]] for reading, an `if` for processing, and a loop for repeating:

```text
prompt -> read input -> process -> repeat until stop
```

The engine of the loop is the **condition variable** (the value you read). Each pass must move it toward the stop condition, or the loop never ends.

## Why it matters

Recognizing this one pattern unlocks a huge slice of beginner problems — they are all the same skeleton with different processing in the middle:

- counting or summing numbers until a sentinel
- validating input ("keep asking until it's valid")
- menu-driven programs
- shopping carts and running totals
- limited login / PIN attempts
- grade calculators

Once you see the shape, the only real decisions left are *which loop* and *what stops it*.

## Syntax / Pattern

Unknown number of reads, stop on a **sentinel** value (the workhorse). Note the **priming read** before the loop so the condition has something to test:

```java
System.out.print("Enter value (0 to stop): ");
int value = scanner.nextInt();     // priming read

while (value != 0) {
    // process value

    System.out.print("Enter value (0 to stop): ");
    value = scanner.nextInt();     // re-read: moves toward the stop condition
}
```

Two common variants:

```java
// Known count -> for loop (no sentinel needed)
for (int i = 1; i <= count; i++) {
    System.out.print("Enter value: ");
    int value = scanner.nextInt();
    // process value
}

// Must run at least once -> do-while (read happens before the test)
int choice;
do {
    System.out.print("Enter choice: ");
    choice = scanner.nextInt();
    // process choice
} while (choice != 0);
```

## Worked Example

```java
import java.util.Scanner;

public class CountEvenNumbers {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int evenCount = 0;                                    // 1. counter set BEFORE the loop

        System.out.print("Enter a number (0 to stop): ");
        int number = scanner.nextInt();                       // 2. priming read

        while (number != 0) {                                 // 3. sentinel test: 0 ends it
            if (number % 2 == 0) {
                evenCount++;                                   // 4. process: count the evens
            }

            System.out.print("Enter a number (0 to stop): ");
            number = scanner.nextInt();                       // 5. re-read: change the condition var
        }

        System.out.println("Even numbers entered: " + evenCount);
        scanner.close();
    }
}
```

**Explain in plain English (EiPE):** keep reading numbers and tallying the even ones, stopping the moment the user types `0`, then report the tally.

## Trace

**Predict the output first (write it before reading on):**  `___`

Input stream: `2  7  10  0`

| Line | Statement | `number` | `evenCount` | Output |
|---|---|---|---|---|
| 1 | `int evenCount = 0;` | — | `0` | — |
| 2 | `number = nextInt();` (reads `2`) | `2` | `0` | — |
| 3 | `while (2 != 0)` → true | `2` | `0` | — |
| 4 | `if (2 % 2 == 0)` → true, `evenCount++` | `2` | `1` | — |
| 5 | `number = nextInt();` (reads `7`) | `7` | `1` | — |
| 6 | `while (7 != 0)` → true; `if (7 % 2 == 0)` → false | `7` | `1` | — |
| 7 | `number = nextInt();` (reads `10`) | `10` | `1` | — |
| 8 | `while (10 != 0)` → true; `if (10 % 2 == 0)` → true, `evenCount++` | `10` | `2` | — |
| 9 | `number = nextInt();` (reads `0`) | `0` | `2` | — |
| 10 | `while (0 != 0)` → false, exit loop | `0` | `2` | — |
| 11 | `System.out.println(...)` | `0` | `2` | `Even numbers entered: 2` |

**Actual output:** `Even numbers entered: 2`. The sentinel `0` is read but never processed — the `while` test rejects it before the body runs again.

## Faded Practice

Fill the blank so the loop terminates (the load-bearing line):
```java
System.out.print("Enter a number (0 to stop): ");
int number = scanner.nextInt();

while (number != 0) {
    if (number % 2 == 0) evenCount++;

    System.out.print("Enter a number (0 to stop): ");
    ______                            // what keeps this loop from spinning forever?
}
```
> [!answer]- Answer
> `number = scanner.nextInt();` — re-read inside the loop so the condition variable changes each pass. Without it, `number` keeps its first value; if that value is non-zero, `number != 0` stays true forever (infinite loop).

## Common Mistakes

- Prompting *after* the read → the program blocks on input the user hasn't been asked for yet; print the prompt first.
- Forgetting the in-loop re-read → the condition variable never changes → infinite loop.
- Omitting the priming read → nothing to test on the first `while`, or the loop is skipped entirely.
- Processing the sentinel → the stop value (`0`) leaks into your total/count; test it out *before* processing.
- Declaring the counter inside the loop → it resets every pass; declare and initialize it before the loop.
- Picking the wrong loop → known count wants `for`; "run at least once" wants `do-while`; unknown count wants sentinel `while`.

## Examples and Non-Examples

**Example — prompt before read, re-read inside the loop:**
```java
System.out.print("Enter number (0 to stop): ");
int number = scanner.nextInt();
while (number != 0) {
    // process number
    number = scanner.nextInt();   // condition variable advances every pass
}
```

**Non-Example — reads once and never again:**
```java
int number = scanner.nextInt();
while (number != 0) {
    if (number % 2 == 0) evenCount++;
    // FALSE BELIEF: "reading input once is enough."
    // number never changes, so number != 0 stays true forever: infinite loop.
}
```
The loop's condition variable must be updated inside the body, or the loop cannot end.

## Recall Questions
%% Review via the Spaced Repetition plugin (Cmd/Ctrl+P > "Review flashcards"), not by rereading. %%
#flashcards/java/loops

Why should the prompt come *before* the read?
?
`nextInt()` blocks until the user types something; if you print the prompt afterward, the program appears to hang with no instruction on screen.

## Mini Practice

Predict the output, then run each.

1. Count how many **positive** numbers the user enters before `0`. **Expected:** input `5 -3 8 0` prints a count of `2`.
2. Ask for exactly 3 item prices and print the total (use a `for` loop). **Expected:** input `1.50 2.00 0.50` prints `4.0`.
3. Ask for a PIN up to 3 times, stopping early on a correct entry. **Success criterion:** correct PIN on attempt 2 prints "Access granted" and stops; three wrong prints "Locked out".

## Mistake Log

When you miss one, add it to [[Scanner Mistakes]] as: wrong output → minimal repro → misconception → recall-question form → fix.

## Links

- Contrast: [[Sentinel-Controlled Loops]] (stop on a marker value, count unknown) vs [[For Loops]] (count known ahead of time)
- Map: [[Java MOC]] · [[Loop Selection Guide]]
- Related: [[While Loops]] · [[Do While Loops]] · [[Scanner Input]]
- Prerequisites: [[Scanner Input]] · [[While Loops]]

---
type: concept
topic: loops
status: learning
difficulty: easy
tags:
  - java
  - loops
  - do-while-loops
---
# Do While Loops

## What it is

A `do-while` loop is an **exit-controlled** (post-test) loop: it runs the body **first**, then checks the condition. Because the check happens at the *end* of each pass, the body always executes **at least once** — even when the condition is false from the very start.

Contrast this with a [[While Loops|while]] loop, which is *entry-controlled*: it tests the condition first and can run the body **zero** times.

## Why it matters

Reach for `do-while` when the program must **do something before it can decide whether to continue** — the classic "act, then re-check" shape:

- prompting for input and re-prompting only if it's invalid
- PIN / password retry limits
- menu-driven programs (show the menu, then read a choice)
- any "run once, then maybe repeat" task

## Syntax / Pattern

```java
do {
    // body — runs at least once
} while (condition);   // the trailing semicolon is REQUIRED
```

The `do-while` is a single statement, so it must end with `;` after the condition.

## Worked Example

```java
public class DoWhileDemo {
    public static void main(String[] args) {
        int i = 10;                                    // 1. condition will be false on entry
        do {
            System.out.println("Body ran, i = " + i);  // 2. runs anyway — the guarantee
            i++;                                        // 3. i becomes 11
        } while (i < 5);                                // 4. 11 < 5 is false -> loop ends
        System.out.println("Loop finished, i = " + i);
    }
}
```

**Explain in plain English (EiPE):** even though `i < 5` is false the instant we reach the loop, the body still runs exactly once because the condition is checked *after* the body, not before.

### Real-world pattern: input retry

```java
import java.util.Scanner;

public class ATM {
    public static void main(String[] args) {
        final int CORRECT_PIN = 1234;
        int attempts = 0;
        int pin;
        Scanner scanner = new Scanner(System.in);

        do {
            System.out.print("Enter your 4 digit PIN: ");
            pin = scanner.nextInt();                  // 1. always prompt at least once
            if (pin == CORRECT_PIN) {
                System.out.println("Access granted. Welcome!");
                break;                                // 2. success -> leave immediately
            } else {
                System.out.println("Incorrect PIN. Try again.");
                attempts++;                           // 3. count the failed attempt
            }
        } while (attempts < 3);                       // 4. stop after 3 wrong tries

        if (attempts == 3) {                          // reached only by exhausting attempts
            System.out.println("Incorrect PIN. Account locked.");
        }
        scanner.close();
    }
}
```

`do-while` fits here because the user must be asked for a PIN *before* we can know whether to ask again.

## Trace

**Predict the output before reading on:**  `___`

Tracing the `DoWhileDemo` worked example above:

| Line | Statement | `i` | Output |
|---|---|---|---|
| 1 | `int i = 10;` | 10 | — |
| 2 | `System.out.println("Body ran, i = " + i);` | 10 | `Body ran, i = 10` |
| 3 | `i++;` | 11 | — |
| 4 | `} while (i < 5);` → `11 < 5` is false | 11 | — (loop exits) |
| 5 | `System.out.println("Loop finished, i = " + i);` | 11 | `Loop finished, i = 11` |

**Actual output:**
```
Body ran, i = 10
Loop finished, i = 11
```

The body printed once *despite* the condition being false on entry — that is the whole point of `do-while`.

## Faded Practice

Fill the blank so the body is guaranteed to run at least once (the load-bearing choice):

```java
int i = 100;
______ {                                        // which keyword makes the body run first?
    System.out.println("Executed once, i = " + i);
    i++;
} while (i < 5);
```

> [!answer]- Answer
> `do`. A plain `while (i < 5) { ... }` would test `100 < 5` first, find it false, and skip the body entirely (zero runs). The `do` keyword moves the test to the end, so the body always runs once before the condition is checked.

## Common Mistakes

- Forgetting the semicolon after `} while (condition)` → a `do-while` is a statement and **must** end with `;`.
- Using `do-while` when the body might need to run **zero** times → use a [[While Loops|while]] or `for` (pre-test) loop instead.
- Declaring the condition's variable **inside** the `do { }` block → its scope ends at the closing brace, so the `while` condition can't see it (compile error).
- Assuming the condition is checked **before** the first pass → it is checked **after** (post-test / exit-controlled).
- Combining `break` and the loop condition in ways that overlap → keep one clear exit responsibility per mechanism.

## Examples and Non-Examples

**Example** — prompt at least once, repeat only while input is invalid:
```java
int pin;
do {
    System.out.print("Enter PIN: ");
    pin = scanner.nextInt();
} while (pin != CORRECT_PIN);   // good: the user is always asked at least once
```

**Non-Example:**
```java
int x = 5;
do {
    System.out.println("This prints once, even though x < 0 is false.");
} while (x < 0);   // FALSE BELIEF: "a do-while can skip its body when the condition is false"
```
The condition is false the instant it's reached, yet the body already ran once. A `do-while` never skips its body — if you need the possibility of zero runs, that is a `while` loop, not a `do-while`.

## Recall Questions
%% Review via the Spaced Repetition plugin (Cmd/Ctrl+P > "Review flashcards"), not by rereading. %%
#flashcards/java/do-while-loops

In a `do-while` loop, is the condition checked before or after the body?
?
After each pass (post-test / exit-controlled), so the body always runs at least once.

## Mini Practice

1. Write a `do-while` that prints the numbers `1` through `5`, one per line. **Expected output:** `1 2 3 4 5` each on its own line. (Predict it, then run.)
2. Write a `do-while` whose condition is `false`. **Success criterion:** the body still prints exactly one line — a live proof of the at-least-once rule.
3. Rewrite the ATM loop to use a boolean guard, `} while (!accessGranted && attempts < 3);`, instead of `break`. **Success criterion:** identical behaviour with no `break` statement.

## Mistake Log

Log misses to [[Loops Mistake Log]] as: wrong output → minimal repro → misconception → recall-question form → fix.

## Links

- Contrast: [[While Loops]] — pre-test (may run zero times) vs `do-while` post-test (runs at least once)
- Map: [[Loops MOC]] · [[Loop Selection Guide]]
- Related: [[For Loops]] · [[Scanner Input]] · [[If Statements in Input Programs]]
- Prerequisites: [[Variables]] · [[If Statements in Input Programs]]

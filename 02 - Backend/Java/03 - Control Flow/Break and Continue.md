---
type: concept
topic: control-flow
status: learning
difficulty: easy
tags:
  - java
  - control-flow
  - loop-control
---
# Break and Continue

## What it is

`break` and `continue` are jump statements that alter how a loop repeats.

- **`break`** ends the loop (or `switch`) **immediately** — no further iterations run.
- **`continue`** ends the **current iteration only** — it jumps to the loop's next step (the update in a `for`, the condition check in a `while`) and keeps looping.

| | `break` | `continue` |
|---|---|---|
| Effect | exits the whole loop | skips to next iteration |
| Iterations left | none run | the rest still run |
| Valid in `switch`? | yes (exits the switch) | only if the switch is inside a loop (affects the loop, not the switch) |

## Why it matters

They let a loop **stop early** or **skip cases** instead of always running to completion. This is the backbone of searches ("stop at the first match"), input validation, menu loops, and filtering — clearer and faster than dragging a flag variable through every iteration.

## Syntax / Pattern

```java
break;            // exit the innermost loop or switch
continue;         // skip to the next iteration of the innermost loop

outer:            // an optional label on a loop
for (...) {
    for (...) {
        break outer;      // exit the LABELED outer loop, not just the inner one
        continue outer;   // jump to the labeled loop's next iteration
    }
}
```

## Worked Example

```java
public class Main {
    public static void main(String[] args) {
        for (int i = 1; i <= 5; i++) {
            if (i == 3) {
                continue;               // 1. skip only when i is 3
            }
            if (i == 5) {
                break;                  // 2. stop the loop entirely when i is 5
            }
            System.out.println(i);      // 3. reached only when neither jump fired
        }
    }
}
```

**Explain in plain English (EiPE):** the loop prints 1–4 but skips 3, then quits before it can print 5.

### Labeled break (escape nested loops)
```java
outer:
for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 3; j++) {
        if (i + j == 2) {
            break outer;                // exit BOTH loops at once
        }
        System.out.println(i + "," + j);
    }
}
```
A plain `break` would leave only the inner loop and the outer loop would continue; `break outer` exits both. Output: `0,0` then `0,1`.

## Trace
**Predict the output first (write it before reading on):**  `___`

| Line | `i` | `i == 3`? | `i == 5`? | Action | Output |
|---|---|---|---|---|---|
| loop | 1 | false | false | print | `1` |
| loop | 2 | false | false | print | `2` |
| loop | 3 | true | — | `continue` → skip print | — |
| loop | 4 | false | false | print | `4` |
| loop | 5 | false | true | `break` → exit loop | — |

**Actual output:** `1` `2` `4`. Note `continue` still ran the `i++` update, so `i` reached 5; `break` then ended the loop before any value after 4 could print.

## Faded Practice
Fill the blank so the loop stops at the **first** even number instead of reporting every even number (the load-bearing decision):
```java
int[] nums = {1, 3, 4, 7, 8};
for (int n : nums) {
    if (n % 2 == 0) {
        System.out.println("First even: " + n);
        ______;                         // stop searching once found
    }
}
```
> [!answer]- Answer
> `break` — it leaves the loop the instant the first even value is found, so only `First even: 4` prints. Using `continue` (or nothing) would keep looping and also print `First even: 8`.

## Common Mistakes

- Thinking `continue` exits the loop → it only ends the **current iteration**; the loop keeps going.
- Thinking `break` skips just one iteration → it ends the **whole loop** (use `continue` to skip one).
- In a `while` loop, putting `continue` **before** the increment → the increment never runs, causing an infinite loop. Update the counter before you `continue`.
- Expecting a plain `break` inside nested loops to exit both → it exits only the innermost; use a **labeled** `break` for the outer loop.
- Writing `continue` in a `switch` that isn't inside a loop → compile error (`continue outside of loop`); `continue` never controls a switch.

## Examples and Non-Examples

**Example — `break` stops the search:**
```java
for (int i = 1; i <= 5; i++) {
    if (i == 3) {
        break;
    }
    System.out.println(i);
}
// 1, 2   (loop ends the moment i hits 3)
```

**Example — `continue` skips one value:**
```java
for (int i = 1; i <= 5; i++) {
    if (i == 3) {
        continue;
    }
    System.out.println(i);
}
// 1, 2, 4, 5   (only 3 is skipped)
```

**Non-Example:**
```java
switch (choice) {
    case 1:
        continue;   // FALSE BELIEF: "continue is the switch's version of skip"
}                   // compile error: continue only controls a loop, never a switch
```
`break` belongs in a `switch`; `continue` does not (unless the whole `switch` sits inside a loop, where it then affects that loop).

## Recall Questions
%% Review via the Spaced Repetition plugin (Cmd/Ctrl+P > "Review flashcards"), not by rereading. %%
#flashcards/java/control-flow

Which jump statement ends the entire loop, and which ends only the current iteration?
?
`break` ends the entire loop; `continue` ends only the current iteration and moves to the next one.

Why can a plain `break` fail to escape nested loops, and what fixes it?
?
A plain `break` exits only the innermost loop; a **labeled** `break` (e.g. `break outer;`) exits the loop carrying that label.

## Mini Practice
1. Loop from 1 to 10 and print every number **except 5** (use `continue`). **Expected output:** `1 2 3 4 6 7 8 9 10`. Predict, then run.
2. Loop from 1 to 10 and **stop at 7** so 7 and beyond never print (use `break`). **Expected output:** `1 2 3 4 5 6`. Predict, then run.
3. Loop from 1 to 10; `continue` on multiples of 3 and `break` once you pass 8. **Success criterion:** predict the exact printed sequence before running, then confirm it matches.

## Mistake Log
When you miss one, add it to [[Control Flow Mistake Log]] as: wrong output → minimal repro → misconception → recall-question form → fix.

## Links
- Contrast: [[Return Statement]] (exits the whole method) vs `break`/`continue` (affect only the loop)
- Map: [[Control Flow MOC]]
- Related: [[For Loops]] · [[While Loops]] · [[Switch Statements]] · [[Loop Selection Guide]]
- Prerequisites: [[For Loops]] · [[While Loops]]

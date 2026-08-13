---
aliases:
  - Switch Statement
type: concept
topic: control-flow
status: learning
difficulty: easy
tags:
  - java
  - control-flow
  - switch-statement
---
# Switch Statements

## What it is

A `switch` statement compares one controlling value against a list of constant `case` labels and **jumps to the first exact match**, running from there until it hits a `break` (or the closing brace). An optional `default` catches everything that matched nothing.

## Why it matters

When a single variable has many discrete, fixed values — day numbers, menu codes, command characters, enum states — `switch` is flatter and clearer than a long `if / else if` chain, and it signals to the reader "one variable, many exact values." The trade-off is fall-through: control keeps running into later cases unless you `break`.

## Syntax / Pattern

```java
switch (value) {
    case option1:
        // code
        break;                 // stops fall-through into option2
    case option2:
        // code
        break;
    default:
        // code if no case matches
}
```

> [!tip] Modern arrow form (Java 14+)
> `case label -> expression;` runs only its own branch and **never falls through**, so no `break` is needed. It can also be used as a value-returning [[Switch Expressions|switch expression]]:
> ```java
> String kind = switch (day) {
>     case 6, 7 -> "Weekend";
>     default   -> "Weekday";
> };
> ```

## Worked Example

```java
public class Weekend {
    public static void main(String[] args) {
        int day = 6;                                       // 1. the value we switch on

        switch (day) {                                     // 2. compare day to each label in order
            case 6:
                System.out.println("Today is Saturday");
                break;                                     // 3. break exits before the next case
            case 7:
                System.out.println("Today is Sunday");
                break;
            default:                                       // 4. runs only if no case matched
                System.out.println("Looking forward to the weekend");
        }
    }
}
```

**Explain in plain English (EiPE):** the code picks a message for a given day number by matching it to a `case`, and prints exactly one line because `break` stops execution from spilling into later cases.

## Trace

**Predict the output first (write it before reading on):**  `___`

| Line | Statement | `day` | What happens | Output |
|---|---|---|---|---|
| 1 | `int day = 6;` | `6` | store the value | — |
| 2 | `switch (day)` | `6` | evaluate `day`, scan labels | — |
| 3 | `case 6:` | `6` | matches → enter here | — |
| 4 | `println("Today is Saturday");` | `6` | run the body | `Today is Saturday` |
| 5 | `break;` | `6` | exit the switch | — |
| 6 | `case 7:` / `default:` | `6` | skipped (already exited) | — |

**Actual output:** `Today is Saturday`. Only one line prints — the `break` on line 5 is what prevents fall-through into `case 7` and `default`.

## Faded Practice

Fill the blank so the switch prints **only** `Today is Saturday` (the load-bearing line):
```java
switch (day) {          // day == 6
    case 6:
        System.out.println("Today is Saturday");
        ______           // what stops "Today is Sunday" from also printing?
    case 7:
        System.out.println("Today is Sunday");
        break;
    default:
        System.out.println("Looking forward to the weekend");
}
```
> [!answer]- Answer
> `break;` — a matched `case` is only an *entry point*. Without `break`, execution falls straight through `case 7` and `default`, printing all three lines.

## Common Mistakes

- Forgetting `break` -> execution falls through into every following case; add `break` after each body (or switch to the arrow form).
- Expecting `case` to test ranges or conditions like `x > 10` -> labels must be exact constants; use `if / else if` for ranges.
- Switching on `long`, `float`, `double`, or `boolean` -> won't compile; `switch` supports `byte`, `short`, `char`, `int` (and their wrappers), `String`, and `enum` only.
- Using a variable as a `case` label -> labels must be compile-time constants (literals, `final` constants, or enum constants).
- Reaching for `continue` to exit a switch -> `continue` belongs to loops; `break` is the switch's exit.
- Omitting `default` when unmatched input is possible -> on no match, nothing runs and the switch is skipped; add `default` for the fallback.

## Examples and Non-Examples

**Example** (each case is sealed off with `break`):
```java
int choice = 2;

switch (choice) {
    case 1:
        System.out.println("Start");
        break;
    case 2:
        System.out.println("Settings");   // only this prints
        break;
    default:
        System.out.println("Invalid choice");
}
// Output: Settings
```

**Non-Example** (missing `break` → fall-through):
```java
int day = 6;

switch (day) {
    case 6:
        System.out.println("Saturday");   // matches and runs
    case 7:
        System.out.println("Sunday");     // FALSE BELIEF: "a case stops on its own" — no break, so this runs too
    default:
        System.out.println("Weekday");    // ...and this runs as well
}
// Output:
// Saturday
// Sunday
// Weekday
```
A `case` label does not end a block — only `break`, `return`, or the closing brace does.

## Recall Questions
%% Review via the Spaced Repetition plugin (Cmd/Ctrl+P > "Review flashcards"), not by rereading. %%
#flashcards/java/switch-statements

Why does execution "fall through" into the next case when you omit `break`?
?
A matched `case` is just an entry point. Without `break`, control continues sequentially through every following statement — including later case bodies and `default` — until a `break` or the closing brace.

How does the arrow form (`case x ->`) differ from the colon form on fall-through?
?
Arrow labels run only their own branch and never fall through, so no `break` is needed; colon labels fall through unless you add `break`.

## Mini Practice

1. Write a `switch` on `int day` (1–7) that prints the weekday name, with a `default` for out-of-range values. **Expected output** for `day = 3`: one line, `Wednesday`. (Predict it, then run.)
2. Delete one `break` from your solution and re-run with the same input. **Success criterion:** you can predict the extra line(s) that now print *before* running, and explain why.
3. Rewrite the same logic as an arrow-form switch expression that assigns the name to a `String`. **Success criterion:** identical output with no `break` anywhere.

## Mistake Log

Log misses to [[Control Flow Mistake Log]] as: wrong output -> minimal repro -> misconception -> recall-question form -> fix.

## Links

- Contrast: [[If Else and Else If Statements]] (conditions & ranges) vs `switch` (exact constant match)
- Map: [[Control Flow MOC]]
- Related: [[Break and Continue]] · [[Switch Expressions]] · [[Enums]]
- Prerequisites: [[Variables and Data Types]] · [[Operators]]

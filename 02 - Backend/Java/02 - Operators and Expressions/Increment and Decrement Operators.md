---
type: concept
topic: operators-and-expressions
status: learning
difficulty: easy
tags:
  - java
  - operators-and-expressions
  - increment-decrement
---
# Increment and Decrement Operators

## What it is

`++` adds 1 to a variable; `--` subtracts 1. Both come in two flavours that differ **only in the value the expression yields**, never in the final value of the variable:

- **Post** (`a++`, `a--`): yield the *current* value, **then** change the variable.
- **Pre** (`++a`, `--a`): change the variable **first**, then yield the *new* value.

As a standalone statement, `a++;` and `++a;` are identical — the pre/post distinction matters only when the result is *used* (assigned, printed, or combined in an expression).

## Why it matters

These operators are everywhere in counters and loop headers (`for (int i = 0; i < n; i++)`). Getting the pre/post distinction wrong is a classic off-by-one bug: you either read a value one step too early or one step too late.

## Syntax / Pattern

```java
a++;    // post-increment: change AFTER yielding
++a;    // pre-increment:  change BEFORE yielding
a--;    // post-decrement
--a;    // pre-decrement
```

The operand must be a **variable** (something assignable). `5++` and `(a + b)++` are compile errors.

## Worked Example

```java
public class Main {
    public static void main(String[] args) {
        int a = 5;
        int post = a++;   // 1. post: read a (5) into post, THEN a becomes 6
        int b = 10;
        int pre = ++b;    // 2. pre: b becomes 11 FIRST, then read into pre

        // 3. print each so the pre/post difference is visible
        System.out.println(a);      // 6
        System.out.println(post);   // 5
        System.out.println(b);      // 11
        System.out.println(pre);    // 11
    }
}
```

**Explain in plain English (EiPE):** post-increment hands back the old value before bumping the variable, while pre-increment bumps first and hands back the new value.

## Trace
**Predict the output first (write it before reading on):**  `___`

| Line | Statement | `a` | `post` | `b` | `pre` | Output |
|---|---|---|---|---|---|---|
| 1 | `int a = 5;` | 5 | — | — | — | — |
| 2 | `int post = a++;` | 6 | 5 | — | — | — |
| 3 | `int b = 10;` | 6 | 5 | 10 | — | — |
| 4 | `int pre = ++b;` | 6 | 5 | 11 | 11 | — |
| 5 | `System.out.println(a);` | 6 | 5 | 11 | 11 | `6` |
| 6 | `System.out.println(post);` | 6 | 5 | 11 | 11 | `5` |
| 7 | `System.out.println(b);` | 6 | 5 | 11 | 11 | `11` |
| 8 | `System.out.println(pre);` | 6 | 5 | 11 | 11 | `11` |

**Actual output:** `6`, `5`, `11`, `11`. Notice `a` and `b` both ended up incremented — the operators differ only in *what value the assignment captured* (5 vs 11).

## Faded Practice
Fill the blank so `b` captures the **old** value (5) while `a` still ends at 6:
```java
int a = 5;
int b = ______;   // which form yields BEFORE incrementing?
System.out.println(b);   // want 5
System.out.println(a);   // want 6
```
> [!answer]- Answer
> `a++` — post-increment yields the current value (5) into `b`, then increments `a` to 6. Using `++a` would make `b` equal to 6.

## Common Mistakes

- Treating `a++` and `++a` as interchangeable when the result is used → they yield different values (old vs new).
- Reading and writing the same variable in one expression, e.g. `x = a++ + ++a` → hard to read; predict the exact value only if you apply left-to-right evaluation.
- Forgetting `count++;` as a full statement is exactly `count = count + 1;` → the pre/post choice is irrelevant here.
- Applying `++`/`--` to a non-variable like `5++` or a method result → compile error; the operand must be assignable.
- Assuming `--` is a comment or "double minus" → it is a single decrement operator on one variable.

## Examples and Non-Examples

**Examples**
```java
int count = 0;
count++;              // count is now 1 (statement form: pre/post identical)
```
```java
int a = 5;
int b = ++a;          // a is 6, b is 6 (pre: increment first, then read)
```

**Non-Example**
```java
int a = 5;
int b = a++;
// FALSE BELIEF: "++a and a++ give b the same value" — here b is 5, not 6
```
```java
int a = 5;
int result = a++ + ++a;   // legal, but mutates a twice in one expression
// FALSE BELIEF: "evaluation order doesn't matter" — Java goes left-to-right:
// a++ -> 5 (a=6), then ++a -> 7 (a=7), so result = 12 and a = 7
```

## Recall Questions
%% Review via the Spaced Repetition plugin (Cmd/Ctrl+P > "Review flashcards"), not by rereading. %%
#flashcards/java/increment-decrement

In `b = a++`, what value does `b` get and what is `a` afterward?
?
`b` gets the *old* value of `a` (post-increment yields before changing), then `a` is incremented by 1.

## Mini Practice

1. Predict then run:
   ```java
   int a = 5;
   System.out.println(a++);
   System.out.println(a);
   System.out.println(++a);
   ```
   **Expected output:** `5`, `6`, `7`.
2. Rewrite `count++;` as a plain assignment. **Success criterion:** `count = count + 1;` — identical effect as a statement.
3. Write a `for` loop that prints 1 to 5, one per line, using `i++`. **Expected output:** `1` `2` `3` `4` `5` on separate lines. (Predict the count of lines before running.)

## Mistake Log
When you miss one, add it to [[Operators and Expressions Mistake Log]] as: wrong output → minimal repro → misconception → recall-question form → fix.

## Links
- Contrast: [[Compound Assignment Operators]] (`+=`, `-=` — also mutate in place, but never split into pre/post forms)
- Map: [[Operators and Expressions]]
- Related: [[Arithmetic Operators]] · [[For Loops]] · [[While Loops]]
- Prerequisites: [[Variables and Data Types]] · [[Assignment Operators]]

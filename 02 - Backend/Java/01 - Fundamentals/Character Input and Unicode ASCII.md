---
type: concept
topic: fundamentals
status: learning
difficulty: easy
tags:
  - java
  - fundamentals
  - character-input
---
# Character Input and Unicode ASCII

## What it is

A `char` holds **exactly one character** in Java, written with single quotes (`'A'`). Scanner has **no `nextChar()`** method, so to read a single character you read a whole line and take its first character with `charAt(0)`. A `char` is really a 16-bit numeric code, so assigning it to an `int` reveals that code (e.g. `'A'` → `65`).

## Why it matters

Single-character input drives common beginner interactions — menu choices, yes/no answers, initials, letter grades. Knowing that a `char` *is* a number (its Unicode/UTF-16 code unit) also explains how the machine stores text and unlocks tricks like comparing or shifting letters arithmetically.

## Syntax / Pattern

```java
char letter = scanner.nextLine().charAt(0);   // read one character
int code = letter;                            // widen char -> its numeric code
```

Single quotes = `char`. Double quotes = `String`. `charAt(0)` bridges the two.

## Worked Example

```java
import java.util.Scanner;

public class CharacterInput {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // 1. read the whole line, then keep only its first character
        System.out.print("Enter your first initial: ");
        char initial = scanner.nextLine().charAt(0);

        // 2. widen char -> int to reveal its numeric character code
        int code = initial;

        // 3. print the character and its code
        System.out.println("Initial: " + initial);
        System.out.println("Character code: " + code);

        scanner.close();
    }
}
```

**Explain in plain English (EiPE):** it reads a line of input, keeps just the first letter, and prints that letter alongside the number Java uses to store it.

## Trace

**Predict the output first (write it before reading on):**  `___`

Assume the user types `Zubair` and presses Enter.

| Line | Statement | `initial` | `code` | Output |
|---|---|---|---|---|
| 1 | `scanner.nextLine()` reads the line | — | — | (returns `"Zubair"`) |
| 2 | `.charAt(0)` → `initial` | `'Z'` | — | — |
| 3 | `int code = initial;` (widening) | `'Z'` | `90` | — |
| 4 | `println("Initial: " + initial)` | `'Z'` | `90` | `Initial: Z` |
| 5 | `println("Character code: " + code)` | `'Z'` | `90` | `Character code: 90` |

**Actual output:**
```text
Initial: Z
Character code: 90
```
Only the first character of the line survives; the rest of `"Zubair"` is discarded. `'Z'` widens silently to its code `90`.

## Faded Practice

Fill the blank so `letter` holds a single character read from input (the load-bearing step):
```java
Scanner scanner = new Scanner(System.in);
System.out.print("Enter a letter: ");
char letter = scanner.nextLine().______;   // how do you pull the first character out of the line?
```
> [!answer]- Answer
> `charAt(0)` — full line: `char letter = scanner.nextLine().charAt(0);`. There is no `nextChar()`; you read a `String` and extract index `0`.

## Common Mistakes

- Calling `scanner.nextChar()` → it does not exist; read a line and use `charAt(0)`.
- Using double quotes for a `char` (`char c = "A";`) → won't compile; a `char` literal needs single quotes `'A'`.
- Calling `charAt(0)` on an empty line → throws `StringIndexOutOfBoundsException`; check the string isn't empty first.
- Saying "Java only uses ASCII" → Java `char` is a 16-bit Unicode (UTF-16) unit; ASCII is just its first 128 codes.
- Expecting `System.out.println(letter)` to print a number → concatenation/printing a `char` shows the *character*; assign to `int` to see the code.

## Examples and Non-Examples

**Example:**
```java
char answer = scanner.nextLine().charAt(0);   // reads the first character of the line
int code = answer;                            // 'A' -> 65, 'Z' -> 90 (widening conversion)
```

**Non-Example:**
```java
char answer = scanner.nextChar();
// FALSE BELIEF: "Scanner has nextChar() like nextInt()/nextLine()" — it does not; this won't compile.
```

**Non-Example:**
```java
char letter = "A";
// FALSE BELIEF: "single characters can go in double quotes" — "A" is a String, not a char; compile error.
```

## Recall Questions
%% Review via the Spaced Repetition plugin (Cmd/Ctrl+P > "Review flashcards"), not by rereading. %%
#flashcards/java/character-input

What happens when you assign a `char` to an `int`?
?
Java performs a widening conversion and stores the character's numeric code (its Unicode/UTF-16 code unit), e.g. `'A'` → `65`, `'Z'` → `90`.

## Mini Practice

1. Ask for the user's first initial and print it. **Expected output:** `Initial: <that letter>`. Predict it, then run.
2. Ask for a letter and print its numeric code. **Success criterion:** entering `A` prints `65`; entering `a` prints `97` (lowercase differs from uppercase). Predict both before running.
3. Read a yes/no answer, store `char first = scanner.nextLine().charAt(0);`, and print `"You chose: " + first`. **Success criterion:** typing `yes` stores only `'y'`.

## Mistake Log

When you miss one, log it to [[Fundamentals Mistake Log]] as: wrong output → minimal repro → misconception → recall-question form → fix.

## Links
- Contrast: [[Strings in Java]] (a `String` is many characters) vs a `char` (exactly one)
- Map: [[Fundamentals MOC]]
- Related: [[Scanner Input]] · [[Primitive Input Types]] · [[Scanner Mistakes]] · [[Type Casting]]
- Prerequisites: [[Primitive Types]] · [[Scanner Input]]

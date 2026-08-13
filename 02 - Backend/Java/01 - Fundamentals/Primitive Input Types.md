---
type: concept
topic: fundamentals
status: learning
difficulty: easy
tags:
  - java
  - fundamentals
  - scanner
---
# Primitive Input Types

## What it is

Primitive input means reading Java's **built-in value types** — whole numbers, decimals, booleans, single characters — straight from user input, usually with a `Scanner`. Each primitive type has a matching `Scanner` method (`nextInt`, `nextDouble`, `nextBoolean`, …) that reads the **next token** and converts it to that type. The one exception: **there is no `nextChar()`** — a single character is read as text, then indexed.

| Type | Meaning | Literal example | Scanner method |
|---|---|---|---|
| `byte` | Small whole number (−128…127) | `25` | `nextByte()` |
| `int` | Whole number | `100` | `nextInt()` |
| `float` | Decimal (needs `f` suffix) | `45.75f` | `nextFloat()` |
| `double` | More precise decimal | `45.75` | `nextDouble()` |
| `boolean` | `true` or `false` | `true` | `nextBoolean()` |
| `char` | Single character | `'A'` | *(none — use `nextLine().charAt(0)`)* |

## Why it matters

Picking the type that fits the data keeps values correct and code simple: ages and menu choices as `int`, prices and wages as `double`, yes/no flags as `boolean`. Reach for the wrong `Scanner` method and you get an `InputMismatchException` at runtime, not a compile error — so the mismatch only shows up once a real user types something.

## Syntax / Pattern

```java
int age        = scanner.nextInt();
double price   = scanner.nextDouble();
boolean active = scanner.nextBoolean();

// No nextChar(): read the line, take the first character
char letter = scanner.nextLine().charAt(0);
```

Each `nextXxx()` reads one whitespace-delimited **token**; `nextLine()` reads the **rest of the current line**.

## Worked Example

```java
import java.util.Scanner;

public class PrimitiveInputs {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // 1. read a small whole number as a byte
        System.out.print("Enter your age: ");
        byte age = scanner.nextByte();

        // 2. read a decimal as a double (the everyday choice for decimals)
        System.out.print("Enter your hourly wage: ");
        double wage = scanner.nextDouble();

        // 3. read a true/false answer directly as a boolean
        System.out.print("Are you a student? true/false: ");
        boolean isStudent = scanner.nextBoolean();

        // 4. print all three with type-matched format specifiers
        System.out.printf("Age: %d, Wage: %.2f, Student: %b%n",
                age, wage, isStudent);

        scanner.close();
    }
}
```

**Explain in plain English (EiPE):** it reads three different primitive types from one `Scanner` and prints them back, each with the format specifier that matches its type (`%d`, `%.2f`, `%b`).

## Trace

**Predict the output first (write it before reading on):**  `___`

Assume the user types `25`, then `20.5`, then `true`.

| Line | Statement | `age` | `wage` | `isStudent` | Output |
|---|---|---|---|---|---|
| 1 | `Scanner scanner = new Scanner(System.in);` | — | — | — | — |
| 2 | `byte age = scanner.nextByte();` (input `25`) | `25` | — | — | — |
| 3 | `double wage = scanner.nextDouble();` (input `20.5`) | `25` | `20.5` | — | — |
| 4 | `boolean isStudent = scanner.nextBoolean();` (input `true`) | `25` | `20.5` | `true` | — |
| 5 | `System.out.printf(...)` | `25` | `20.5` | `true` | `Age: 25, Wage: 20.50, Student: true` |

**Actual output:** `Age: 25, Wage: 20.50, Student: true` — note `%.2f` pads `20.5` to two decimals, and `%d` accepts the `byte` directly.

## Faded Practice

Fill the blank so a single character is read correctly (`Scanner` has no `nextChar()`):

```java
Scanner scanner = new Scanner(System.in);
System.out.print("Enter your initial: ");
char initial = scanner.______.charAt(0);
```

> [!answer]- Answer
> `nextLine()` — read the whole line as a `String`, then take index `0` with `charAt(0)`. There is no `nextChar()`, so you always go through a `String` for a single character.

## Common Mistakes

- Calling `scanner.nextChar()` → **no such method**; read a line and take `charAt(0)`.
- Reading a decimal like `3.5` with `nextInt()` → **`InputMismatchException`**; use `nextDouble()`.
- Calling `nextLine()` right after `nextInt()`/`nextDouble()`/`nextBoolean()` → it returns the **leftover newline** (an empty `String`), because the token method left the `\n` in the buffer. Consume it with an extra `nextLine()`, or read everything as lines and parse.
- `charAt(0)` on an empty line → **`StringIndexOutOfBoundsException`**; guard against blank input.
- Using `float` where `double` is the sensible default → prefer `double` (more precision, no `f` suffix) unless memory or an API forces `float`.
- Writing a `char` with double quotes (`"A"`) → that is a `String`; a `char` uses single quotes (`'A'`).
- Using `byte` for values that can exceed `127` → overflow or `InputMismatchException`; use `int`.

## Examples and Non-Examples

**Example:**
```java
double salary = scanner.nextDouble();   // decimals belong in a double
```

**Non-Example:**
```java
char initial = scanner.nextChar();
// FALSE BELIEF: "Scanner has a nextChar() to match nextInt()/nextDouble()" — it does NOT
```

**Example (the correct single-char read):**
```java
char initial = scanner.nextLine().charAt(0);   // line first, then index 0
```

## Recall Questions
%% Review via the Spaced Repetition plugin (Cmd/Ctrl+P > "Review flashcards"), not by rereading. %%
#flashcards/java/primitive-input

`float` vs `double` — which is the default for decimals, and why?
?
`double` — it has more precision and needs no `f` suffix; use `float` only when memory or an API requires it.

## Mini Practice

1. Ask for an age as an `int` and a price as a `double`, then print both with `printf`. **Expected output (for `30` and `4.5`):** `Age: 30, Price: 4.50`. (Predict it, then run.)
2. Ask a yes/no question and store it as a `boolean` with `nextBoolean()`, then print `Logged in: true`/`false`. **Success criterion:** typing `true` prints `Logged in: true`; typing `yes` throws `InputMismatchException` (observe why).
3. Read a number with `nextInt()`, then a name with `nextLine()`. **Success criterion:** notice the name comes back empty — fix it with an extra `nextLine()` to consume the leftover newline.

## Mistake Log

Log misses to [[Scanner Mistakes]] as: wrong output → minimal repro → misconception → recall-question form → fix.

## Links

- Contrast: [[Scanner Input]] — token methods (`nextInt`/`nextDouble`) vs line methods (`nextLine`)
- Map: [[Java Fundamentals MOC]]
- Related: [[Character Input and Unicode ASCII]] · [[Scanner Mistakes]] · [[Primitive Data Types]]
- Prerequisites: [[Scanner Input]] · [[Primitive Data Types]]

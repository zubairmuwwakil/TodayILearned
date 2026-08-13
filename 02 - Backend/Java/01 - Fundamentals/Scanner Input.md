---
type: concept
topic: fundamentals
status: learning
difficulty: easy
tags:
  - java
  - fundamentals
  - scanner
  - user-input
---
# Scanner Input

## What it is

`Scanner` is a Java class (in `java.util`) that **reads input as a stream of tokens**. Wrapped around `System.in`, it turns whatever the user types at the keyboard into typed values — `int`, `double`, a single word, or a whole line — with one read method per shape of input.

The key mental model: input arrives as one long character stream, and each read method moves a **cursor** forward through it. Token methods (`nextInt()`, `next()`, ...) stop *at* the next whitespace; `nextLine()` reads *through* the next newline and consumes it. That difference is where beginners get bitten.

## Why it matters

User input makes programs interactive: instead of hardcoding values, the program can ask for names, ages, prices, or menu choices at runtime. `Scanner` is the default input tool in beginner Java, coding assignments, and console practice — so its one famous quirk (the leftover newline) shows up constantly.

## Syntax / Pattern

```java
import java.util.Scanner;                      // 1. import before use

Scanner scanner = new Scanner(System.in);      // 2. connect to keyboard

int age    = scanner.nextInt();                // 3. read a token
String line = scanner.nextLine();              // 4. read a whole line

scanner.close();                               // 5. release the stream once, at the end
```

Common read methods (each returns the type named):

| Method | Reads | Consumes trailing newline? |
|---|---|---|
| `nextLine()` | A full line of text | Yes |
| `next()` | One whitespace-delimited token | No |
| `nextInt()` | An `int` | No |
| `nextByte()` | A `byte` | No |
| `nextFloat()` | A `float` | No |
| `nextDouble()` | A `double` | No |
| `nextBoolean()` | A `boolean` | No |

## Worked Example

```java
import java.util.Scanner;

public class Registration {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);   // 1. connect Scanner to keyboard input

        System.out.print("Enter your age: ");
        int age = scanner.nextInt();                // 2. read the number; cursor stops BEFORE the '\n'

        scanner.nextLine();                         // 3. consume that leftover '\n' (return value discarded)

        System.out.print("Enter your full name: ");
        String name = scanner.nextLine();           // 4. now read the whole line safely

        System.out.println(name + " is " + age + " years old.");
        scanner.close();                            // 5. release System.in
    }
}
```

**Explain in plain English (EiPE):** after reading a number token you must clear the leftover newline, or the next `nextLine()` will read that empty tail instead of the user's real line.

## Trace

**Predict the output first (write it before reading on):**  `___`

Input typed by the user (`⏎` marks Enter): `25⏎Ada Lovelace⏎`

| Line | Statement | Buffer remaining | `age` | `name` | Output |
|---|---|---|---|---|---|
| 1 | `int age = scanner.nextInt();` | `⏎Ada Lovelace⏎` | `25` | — | prompt shown |
| 2 | `scanner.nextLine();` | `Ada Lovelace⏎` | `25` | — | — (reads `""`, discarded) |
| 3 | `String name = scanner.nextLine();` | *(empty)* | `25` | `"Ada Lovelace"` | prompt shown |
| 4 | `System.out.println(...)` | *(empty)* | `25` | `"Ada Lovelace"` | `Ada Lovelace is 25 years old.` |

**Actual output** (user-typed values echoed after each prompt):
```
Enter your age: 25
Enter your full name: Ada Lovelace
Ada Lovelace is 25 years old.
```
The `nextInt()` on line 1 left `⏎` in the buffer; line 2 swallows it so line 3 captures the real, multi-word line.

## Faded Practice

Fill the blank so the multi-word name is read correctly (the load-bearing line):
```java
System.out.print("Enter your age: ");
int age = scanner.nextInt();

______                                    // what has to happen before the next read?

System.out.print("Enter your full name: ");
String name = scanner.nextLine();
```
> [!answer]- Answer
> `scanner.nextLine();` — `nextInt()` stops before the newline and leaves it in the buffer. This throwaway `nextLine()` consumes that newline; without it, the second `nextLine()` returns an empty string and `name` is `""`.

## Common Mistakes
- `import.java.util.Scanner` (no spaces, no semicolon) → imports are `import java.util.Scanner;`.
- `nextLine()` returns `""` right after `nextInt()`/`nextDouble()`/`next()` → those token methods leave the newline in the buffer; consume it with an extra `nextLine()` first.
- Wrong method for the input (e.g. `nextInt()` when the user types `3.5` or `abc`) → throws `InputMismatchException`; match the method to the data.
- Reading before prompting → the program looks frozen; always `print` a prompt first.
- Calling `scanner.close()` then reading again → closing also closes `System.in` permanently; close once, at the very end.
- Assuming every input is valid → guard with `hasNextInt()` (or a try/catch) before reading.

## Examples and Non-Examples

**Example:**
```java
Scanner scanner = new Scanner(System.in);
int age = scanner.nextInt();      // reads and returns an int
```

**Non-Example:**
```java
int age = scanner.nextInt();
String name = scanner.nextLine(); // returns "" — grabs the leftover newline, not the user's line
// FALSE BELIEF: "nextLine() after nextInt() reads the next line the user types"
```

**Non-Example:**
```java
String age = scanner.nextInt();   // compile-time error: nextInt() returns int, not String
// FALSE BELIEF: "every Scanner read method hands back text you can store in a String"
```

## Recall Questions
%% Review via the Spaced Repetition plugin (Cmd/Ctrl+P > "Review flashcards"), not by rereading. %%
#flashcards/java/scanner-input

Why does `nextLine()` return an empty string when it directly follows `nextInt()`?
?
`nextInt()` reads only the number token and leaves the trailing newline in the buffer; the next `nextLine()` consumes that leftover newline and returns `""`. Fix: call `nextLine()` once in between to discard it.

What is the difference between `next()` and `nextLine()`?
?
`next()` reads a single whitespace-delimited token (one word); `nextLine()` reads everything up to and including the next newline (the whole line).

## Mini Practice
1. Read a full name (line) **then** an age (int), in that order, and print a sentence. **Success criterion:** works even when the name has spaces — because the line is read before any token method, no newline cleanup is needed. (Predict the output, then run.)
2. Read two prices as `double`s and print the total to two decimals. **Expected output:** for inputs `1.50` and `2.25`, prints `Total: 3.75`.
3. Read an age (int) **then** a city that may contain spaces (line). **Success criterion:** for inputs `30` and `New York`, the city captures `New York` in full — which forces you to add the newline-consuming `nextLine()`.

## Mistake Log
Log misses to [[Scanner Mistakes]] as: wrong output → minimal repro → misconception → recall-question form → fix.

## Links
- Contrast: token reads (`nextInt()`, `next()`) leave the newline vs `nextLine()` consumes it — see [[Primitive Input Types]]
- Map: [[Java MOC]]
- Related: [[Primitive Input Types]] · [[Printing Output]] · [[Scanner and Loops Pattern]] · [[Character Input and Unicode ASCII]] · [[If Statements in Input Programs]]
- Prerequisites: [[Basic Java Program Structure]] · [[Variables and Types]]

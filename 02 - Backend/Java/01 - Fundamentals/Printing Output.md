---
type: concept
topic: fundamentals
status: learning
difficulty: easy
tags:
  - java
  - fundamentals
  - console-output
---
# Printing Output

## What it is

Printing output means sending text to the console (standard output) through the `System.out` stream. Java gives you three tools: `print` (write text, stay on the same line), `println` (write text, then move to a new line), and `printf` (write text through a **format string** with `%` placeholders).

## Why it matters

The console is your first window into a running program — showing results, tracing execution, and debugging before you have tests or a UI. `printf` also teaches format specifiers (`%d`, `%s`, `%.2f`), the same syntax reused by `String.format` and logging.

## Syntax / Pattern

```java
System.out.print(value);            // no newline — cursor stays on the line
System.out.println(value);          // value + line separator
System.out.printf(format, args...); // formatted; you add the newline (%n) yourself
```

Key placeholders: `%s` string · `%d` integer · `%.2f` decimal to 2 places · `%n` platform line separator.

## Worked Example
```java
public class Main {
    public static void main(String[] args) {
        String name = "Z";
        int age = 25;
        double price = 19.99;

        // 1. print: label with NO newline — cursor stays put
        System.out.print("Name: ");
        // 2. println: value then a newline — completes the line
        System.out.println(name);
        // 3. printf: one format string, two arguments, explicit %n
        System.out.printf("Age: %d, Price: $%.2f%n", age, price);
    }
}
```

**Explain in plain English (EiPE):** the label `Name: ` and `Z` land on the *same* line because `print` adds no newline, then `printf` writes a formatted second line.

## Trace
**Predict the output first (write it before reading on):**  `___`

| Line | Statement | Emitted text | Cursor after |
|---|---|---|---|
| 1 | `System.out.print("Name: ");` | `Name: ` | same line, after the space |
| 2 | `System.out.println(name);` | `Z` + newline | start of next line |
| 3 | `System.out.printf("Age: %d, Price: $%.2f%n", age, price);` | `Age: 25, Price: $19.99` + newline | start of next line |

**Actual output:**
```
Name: Z
Age: 25, Price: $19.99
```
`price` is `19.99` and `%.2f` rounds half-up, so it prints `19.99`; a value like `82.456` would print `82.46`.

## Faded Practice
Fill the blank so `price` prints with **exactly two decimal places** (the load-bearing specifier):
```java
double price = 3.14159;
System.out.printf("Price: $______%n", price);   // want: Price: $3.14
```
> [!answer]- Answer
> `%.2f` — the `.2` sets two digits after the decimal point and `f` selects floating-point. `%d` would throw at runtime (price is not an integer); plain `%f` prints six decimals (`3.141590`).

## Common Mistakes
- Using `print` when you meant `println` → the next output runs onto the same line.
- Forgetting the newline (`%n`) with `printf` → the following line appends with no break.
- Passing a `String` (or `double`) to `%d` → runtime `IllegalFormatConversionException`, not a compile error.
- Mismatching the number/order of arguments and specifiers → `MissingFormatArgumentException`.
- Confusing `%n` (platform separator) with `\n` (always a single line-feed) → inconsistent line endings across OSes.

## Examples and Non-Examples
**Example:**
```java
System.out.println("Hello");                 // Hello + newline
System.out.printf("Score: %d%n", 95);        // Score: 95
System.out.printf("Average: %.2f%n", 82.456);// Average: 82.46  (rounded half-up)
```
**Non-Example:**
```java
System.out.print("A");
System.out.print("B");
// FALSE BELIEF: "print starts a new line each time" — it does NOT; this prints "AB" on one line.

System.out.printf("Name: %d%n", "Z");
// FALSE BELIEF: "%d works for any value" — %d is integers only; a String throws IllegalFormatConversionException.
```

## Recall Questions
%% Review via the Spaced Repetition plugin (Cmd/Ctrl+P > "Review flashcards"), not by rereading. %%
#flashcards/java/printing-output

What does `%.2f` produce, and how does it round?
?
A floating-point value with exactly two digits after the decimal point, rounded half-up (e.g. `82.456` → `82.46`).

## Mini Practice
1. Predict then run:
   ```java
   System.out.print("A");
   System.out.print("B");
   System.out.println("C");
   ```
   **Expected output:** `ABC` on a single line.
2. Print a name and age on one line with a single `printf`. Predict the output first, then run.
   ```java
   System.out.printf("%s is %d%n", "Z", 25);
   ```
   **Expected output:** `Z is 25`
3. Print a price rounded to two decimals. Predict before running.
   ```java
   System.out.printf("$%.2f%n", 3.14159);
   ```
   **Expected output:** `$3.14`

## Mistake Log
When you miss one, add it to [[Fundamentals Mistake Log]] as: wrong output → minimal repro → misconception → recall-question form → fix.

## Links
- Contrast: `println` (simple, auto-newline) vs `printf` (format specifiers, manual `%n`) — see [[String Formatting]]
- Map: [[Fundamentals MOC]]
- Related: [[Variables and Types]] · [[Scanner Input]] · [[String Concatenation]]
- Prerequisites: [[Basic Java Program Structure]]

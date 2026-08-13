---
type: mistake-log
topic: mistake-log
tags:
  - java
  - mistakes
  - pitfall-prone
---
# Scanner Mistakes

## What it is

This note tracks common Scanner mistakes so you can recognize and fix them faster.

Mistake logs are useful because learning improves when you review errors and retrieve the correct fix later.

## Why it matters

Scanner bugs are common for beginners. They often happen because input has types, whitespace, and leftover newline characters.

The goal is not just to know the fix. The goal is to recognize the mistake quickly.

## Syntax / Pattern

Use this format for your own mistakes:

```text
Mistake:
Why it happened:
Correct fix:
Practice again:
```

## Worked Example

### Mistake: Wrong import

Wrong:

```java
import.java.util.Scanner
```

Correct:

```java
import java.util.Scanner;
```

### Mistake: `nextInt()` before `nextLine()`

Problem:

```java
int age = scanner.nextInt();
String name = scanner.nextLine();
```

`nextLine()` reads the leftover newline after the number.

Fix:

```java
int age = scanner.nextInt();
scanner.nextLine(); // consume leftover newline
String name = scanner.nextLine();
```

## Trace

For this code:

```java
int age = scanner.nextInt();
String name = scanner.nextLine();
```

If the user enters:

```text
25
Zubair
```

Then:

1. `nextInt()` reads `25`.
2. The Enter key after `25` leaves a newline in the input buffer.
3. `nextLine()` reads that leftover newline.
4. `name` becomes an empty string.
5. The program appears to “skip” the name input.

## Common Mistakes

| Mistake | Fix |
|---|---|
| `import.java.util.Scanner` | `import java.util.Scanner;` |
| Using `nextChar()` | Use `nextLine().charAt(0)` |
| `nextLine()` skipped after `nextInt()` | Add `scanner.nextLine();` |
| Wrong input method | Match method to data type |
| No prompt before input | Print prompt first |
| Infinite input loop | Read new input inside the loop |
| Closing Scanner too early | Close it at the end |
| Assuming valid input | Use validation later |

## Examples and Non-Examples

### Example

```java
System.out.print("Enter age: ");
int age = scanner.nextInt();
```

Good prompt and correct input method.

### Non-Example

```java
String age = scanner.nextInt();
```

Wrong type.

### Example

```java
scanner.nextLine(); // consume leftover newline
```

Useful after numeric input when you need to read a full line next.

## Recall Questions

1. What is the correct Scanner import?
2. Why does `nextLine()` sometimes seem skipped?
3. How do you fix the leftover newline problem?
4. Why does `nextChar()` not work?
5. Why should you prompt before reading input?
6. What causes infinite loops with Scanner?

## Mini Practice

1. Write a program that reads an `int`, then a full name correctly.
2. Fix a program where `nextLine()` is being skipped.
3. Write a small input loop and make sure the input updates each time.

## Links / Related Notes

- [[Scanner Input]]
- [[Primitive Input Types]]
- [[Character Input and Unicode ASCII]]
- [[Scanner and Loops Pattern]]

---
type: review
topic: review
tags:
  - java
  - review
---
# Java Fundamentals Review

## What it is

This is a retrieval-practice note for Java fundamentals, variables, operators, and control flow.

## Why it matters

Review notes are for testing yourself. Answer from memory before checking notes or running code.

## Syntax / Pattern

```text
prompt -> answer from memory -> check -> tiny program -> mistake log
```

## Worked Example

Prompt:

```text
What is the output of 10 / 3 and 10 % 3?
```

Answer:

```java
System.out.println(10 / 3); // 3
System.out.println(10 % 3); // 1
```

## Trace

1. `10 / 3` uses integer division.
2. The decimal part is discarded, so the result is `3`.
3. `10 % 3` gives the remainder.
4. The remainder is `1`.

## Common Mistakes

- Looking at notes before trying to answer.
- Only answering conceptually without writing code.
- Not logging mistakes.
- Reviewing everything equally instead of weak areas.

## Examples and Non-Examples

**Examples**

- List the 8 primitive types from memory.
- Predict output of `a++` and `++a`.
- Rebuild a `switch` without looking.

**Non-Examples**

- Reading the recall bank like a textbook.
- Copying code without predicting output.
- Saying “I understand” without testing.

## Recall Questions

1. What filename is required for `public class HelloWorld`?
2. What is the purpose of `main`?
3. What is the difference between `print`, `println`, and `printf`?
4. What does `javac` do?
5. What does the JVM do?
6. What are Java's 8 primitive types?
7. Can `int` be `null`? Why?
8. Can `String` be `null`? Why?
9. What is the difference between primitive and reference variables?
10. Why does `String` behave differently from `StringBuilder`?
11. What is static typing?
12. What is strong typing?
13. What is the difference between `=` and `==`?
14. What does `%` return?
15. What is the output of `10 / 3` and `10 % 3`?
16. What is the difference between `a++` and `++a`?
17. When should you use an `else if` ladder?
18. When should you use a `switch`?
19. What is switch fall-through?
20. What is the difference between `break` and `continue`?
21. Why should you use braces with `if/else`?

## Mini Practice

1. **Print formatting**: Store name, age, and height. Print them with `printf`.
2. **Even or odd**: Store an integer and print whether it is even or odd using `%`.
3. **Grade calculator**: Given `int score = 85;`, print A, B, C, D, or F with `else if`.
4. **Day switch**: Given `int day = 1;`, print the weekday name using `switch`.
5. **Ternary adult/minor**: Given `int age = 20;`, store `"Adult"` or `"Minor"` using ternary.
6. **Predict output**:

```java
int a = 5;
System.out.println(a++);
System.out.println(a);
System.out.println(++a);
```

## Spaced Review

| When | What to do |
|---|---|
| Tomorrow | Recreate Hello World. Explain JDK/JRE/JVM. List 8 primitives. |
| In 3 days | Explain primitive vs reference variables. Write examples for `null`, `%`, `a++`, and `++a`. |
| In 1 week | Write a program using variables, `printf`, `if/else`, `switch`, `%`, `break`, and `continue`. |
| In 2 weeks | Rebuild the mini practice exercises without looking. Log mistakes in [[Java Fundamentals Mistakes]]. |

## Links / Related Notes

- [[Evidence-Based Java Study Loop]]
- [[Java MOC]]
- [[Java Execution Model - JDK JRE JVM]]
- [[Basic Java Program Structure]]
- [[Variables and Types]]
- [[Operators and Expressions]]
- [[If Else and Else If Statements]]
- [[Switch Statements]]
- [[Break and Continue]]
- [[Java Fundamentals Mistakes]]

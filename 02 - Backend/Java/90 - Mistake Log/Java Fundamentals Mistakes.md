---
aliases:
  - Fundamentals Mistake Log
  - Java Fundamentals Mistake Log
type: mistake-log
topic: mistake-log
tags:
  - java
  - mistakes
  - pitfall-prone
---
# Java Fundamentals Mistakes

## What it is

A mistake log turns errors into retrieval prompts. Instead of only writing what went wrong, write the mistake as a question you can answer later.

## Why it matters

Mistakes show what your brain has not automated yet. Turning them into questions makes review active.

## Syntax / Pattern

```text
Mistake: I used = instead of == in an if statement.
Recall prompt: When should I use =, and when should I use == in Java?
Fix: = assigns. == compares.
```

## Worked Example

```java
int age = 18;

if (age == 18) {
    System.out.println("Exactly 18");
}
```

Bad version:

```java
if (age = 18) { // wrong
    System.out.println("Exactly 18");
}
```

## Trace

1. `age = 18` assigns a value.
2. `age == 18` compares two values.
3. `if` needs a boolean condition.
4. For equality checks, use `==`.

## Common Mistakes

| Mistake | Better Understanding |
|---|---|
| Thinking local variables get garbage values | Java local variables must be initialized before use. Fields get defaults. |
| Using `=` when you mean `==` | `=` assigns. `==` compares. |
| Forgetting `break` in `switch` | Missing `break` can cause fall-through. |
| Calling Python weakly typed | Python is dynamically typed and strongly typed. |
| Saying `null` is a data type | `null` is a special value for reference variables. |
| Putting too much logic in ternary | Use ternary only for simple choices. |
| Not using braces in `if/else` | Braces prevent dangling `else` and readability bugs. |
| Forgetting integer division | `10 / 3` is `3` when both operands are integers. |
| Mixing `String` and `StringBuilder` behavior | `String` is immutable. `StringBuilder` is mutable. |

## Examples and Non-Examples

**Examples**

```text
Question: When do Java fields get default values?
Answer: Fields get defaults when not explicitly initialized. Local variables do not.
```

```text
Question: What causes switch fall-through?
Answer: Missing break statements after cases.
```

**Non-Examples**

```text
I am bad at Java.
```

That is not useful. Convert it into a specific question.

## Recall Questions

1. What is the difference between `=` and `==`?
2. Do local variables get default values?
3. What causes switch fall-through?
4. Can primitives be `null`?
5. Why should ternary stay simple?
6. Why are braces useful?

## Mini Practice

1. Add three mistakes as recall questions.
2. For each mistake, write the corrected code.
3. Review this note after 1 day, 3 days, and 1 week.

## Links / Related Notes

- [[Evidence-Based Java Study Loop]]
- [[Scanner Mistakes]]
- [[Operators and Expressions]]
- [[Switch Statements]]
- [[Primitive Types Null and Defaults]]

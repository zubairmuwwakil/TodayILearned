---
type: review
topic: review
tags:
  - java
  - review
---
# Evidence-Based Java Study Loop

## What it is

A high-ROI Java study loop is:

```text
idea -> example -> trace -> recall -> tiny program -> mistake log
```

The point is not to make notes look nice. The point is to make yourself retrieve and apply Java.

## Why it matters

Rereading feels productive, but retrieval practice, spaced repetition, worked examples, self-explanation, and code tracing are much better for remembering programming concepts.

> [!warning] Judge progress by delayed recall, not by how smooth it feels
> These methods are *supposed* to feel harder and produce worse in-the-moment performance than rereading — that difficulty is what builds durable memory ("desirable difficulties", Bjork & Bjork 2011). Highlighting and rereading feel fluent but are low-utility (Dunlosky et al. 2013). If a session felt easy, you probably weren't retrieving.

## Syntax / Pattern

```text
1. Read the key idea once.
2. Cover the worked example.
3. Recreate it from memory.
4. Trace each line.
5. Answer recall questions.
6. Write one tiny variation.
7. Log mistakes as questions.
```

## Worked Example

```java
public class Main {
    public static void main(String[] args) {
        int age = 25;
        System.out.println(age >= 18);
    }
}
```

## Trace

1. `age` stores `25`.
2. `age >= 18` evaluates to `true`.
3. `println` prints `true`.

## Common Mistakes

- Rereading without testing yourself.
- Copying examples without tracing.
- Watching tutorials without writing tiny programs.
- Reviewing only right before a test.
- Writing vague mistakes instead of specific questions.

## Examples and Non-Examples

**Examples**

- Rebuild `Hello World` from memory.
- Predict output before running code.
- Turn a mistake into: “When do Java local variables get default values?”

**Non-Examples**

- Highlighting everything.
- Reading the same note repeatedly.
- Copy-pasting code and assuming you know it.

## Recall Questions

1. Why is retrieval practice better than rereading?
2. What does it mean to trace code?
3. Why should mistakes be written as questions?
4. What is spaced repetition?
5. What is one tiny Java program you can write after learning `if` statements?

## Mini Practice

1. Pick one note and answer all recall questions without looking.
2. Change one value in a worked example and predict the new output.
3. Add one mistake to [[Java Fundamentals Mistakes]].

## Links / Related Notes

- [[Java MOC]]
- [[Java Fundamentals Review]]
- [[Java Fundamentals Mistakes]]

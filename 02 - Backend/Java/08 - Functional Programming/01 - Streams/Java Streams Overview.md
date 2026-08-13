---
type: concept
topic: functional-programming
status: learning
difficulty: medium
tags:
  - java
  - streams
  - functional-programming
  - day-10
aliases:
  - Stream Basics
  - What Are Streams
---
# Java Streams Overview

## What it is

A **Stream** is a pipeline for processing a sequence of elements. You describe a series of operations, and the Stream pulls elements from a **source** (a Collection, array, or generator), passes each through the operations, and produces a result.

A Stream is **not** a data structure: it stores nothing and, by default, does not modify its source. It is a *plan for a computation* that runs once and is then consumed. Introduced in Java 8, it supports filtering, transforming, sorting, aggregating, and collecting.

## Why it matters

Streams let you describe **what result you want** rather than manually driving every loop step (imperative → declarative). Chaining several operations reads top-to-bottom as a description of intent, and the same shape parallelises with a single change (`.parallelStream()`), because the pipeline avoids shared mutable state.

## Syntax / Pattern

A pipeline has exactly three kinds of parts:

1. **Source** — where elements come from (`Collection`, array, `Stream.of(...)`, I/O).
2. **Intermediate operations** — each returns *another Stream*, so they chain; they are **lazy** (nothing runs yet).
3. **Terminal operation** — produces a result or side effect, triggers execution, and **consumes** the Stream.

```java
source.stream()          // 1. Source
    .filter(...)          // 2. Intermediate → returns a Stream (lazy)
    .map(...)             // 2. more intermediates can chain
    .collect(...);        // 3. Terminal → produces a result, consumes the Stream
```

```java
List<String> result = names.stream()       // source
    .filter(name -> name.length() >= 4)    // intermediate
    .map(String::toUpperCase)              // intermediate
    .toList();                             // terminal
```

## Worked Example

```java
import java.util.List;

public class StreamExample {
    public static void main(String[] args) {
        List<Integer> numbers = List.of(1, 2, 3, 4, 5, 6);

        List<Integer> evenSquares = numbers.stream()  // 1. source: pull from the list
            .filter(number -> number % 2 == 0)        // 2. keep evens (intermediate)
            .map(number -> number * number)           // 3. square each (intermediate)
            .toList();                                // 4. collect result (terminal)

        System.out.println(evenSquares); // [4, 16, 36]
        System.out.println(numbers);     // source unchanged
    }
}
```

**Explain in plain English (EiPE):** keep the even numbers, square them, and gather the results into a new list — without touching the original list.

## Trace

**Predict the output first (write it before reading on):**  `___`

Streams are lazy, so each element flows *all the way down* the pipeline before the next one starts (vertical, not "all filter, then all map"):

| Element | `filter` (n % 2 == 0)? | `map` (n * n) | Collected so far |
|---|---|---|---|
| 1 | false → dropped | — | `[]` |
| 2 | true | 4 | `[4]` |
| 3 | false → dropped | — | `[4]` |
| 4 | true | 16 | `[4, 16]` |
| 5 | false → dropped | — | `[4, 16]` |
| 6 | true | 36 | `[4, 16, 36]` |

**Actual output:**
```
[4, 16, 36]
[1, 2, 3, 4, 5, 6]
```

> [!tip] Key insight
> Nothing in the pipeline runs until the terminal `toList()` is reached. The intermediate `filter`/`map` calls only *build* the plan.

## Faded Practice

Fill the blank so `evenSquares` is actually computed (the load-bearing decision):
```java
List<Integer> evenSquares = numbers.stream()
    .filter(number -> number % 2 == 0)
    .map(number -> number * number)
    .______;   // what makes the pipeline run and hand back a List?
```
> [!answer]- Answer
> `toList()` — a **terminal operation**. Intermediate operations are lazy; without a terminal op the pipeline never executes and no result is produced. (`collect(Collectors.toList())` also works; `toList()` is the concise Java 16+ form and returns an *unmodifiable* list.)

## Common Mistakes

- Thinking a Stream *stores* elements → it is a processing abstraction, not a data structure.
- Forgetting the terminal operation → lazy intermediates alone never produce a result.
- Reusing a Stream after a terminal op → `IllegalStateException`; a Stream is single-use.
- Assuming Streams are automatically faster → they aid clarity, but loops can match or beat them; measure hot paths.
- Adding side effects inside operations (mutating outside state) → hard to reason about and unsafe when parallel.

## Examples and Non-Examples

**Example:**
```java
List<String> activeNames = users.stream()
    .filter(User::isActive)
    .map(User::getName)
    .toList();                // declarative: describe the result, not the loop
```

**Non-Example:**
```java
Stream<String> stream = names.stream();
stream.count();               // terminal op consumes the stream
stream.toList();              // IllegalStateException: stream has already been operated upon or closed
// FALSE BELIEF: "a Stream is a reusable container like a List"
```

**Non-Example (anti-pattern):**
```java
List<String> output = new ArrayList<>();
users.stream().forEach(user -> output.add(user.getName()));
// FALSE BELIEF: "you must accumulate into an external collection yourself"
// Prefer: users.stream().map(User::getName).toList();
```

## Recall Questions
%% Review via the Spaced Repetition plugin (Cmd/Ctrl+P > "Review flashcards"), not by rereading. %%
#flashcards/java/streams

What are the three kinds of parts in a Stream pipeline?
?
A **source** (Collection, array, generator), zero or more **intermediate operations** (each returns another Stream, lazily), and exactly one **terminal operation** (produces a result and consumes the Stream).

What makes an operation *intermediate* rather than terminal?
?
An intermediate operation returns another `Stream`, so it can be chained, and it is lazy — it builds the pipeline but runs nothing on its own (e.g. `filter`, `map`, `sorted`).

Can a Stream be reused after a terminal operation?
?
No. A Stream is single-use; calling another operation on a consumed Stream throws `IllegalStateException`. Create a fresh Stream from the source instead.

## Mini Practice

1. From `List.of("ann", "bob", "carol", "dan", "erin")`, build a Stream that keeps names with length ≥ 4, upper-cases them, and collects to a list. **Expected output:** `[CAROL, ERIN]`. Predict, then run.
2. Sum the squares of the odd numbers in `List.of(1, 2, 3, 4, 5)` using `filter`, `map`, and a terminal `reduce`/`sum`. **Expected output:** `35` (1 + 9 + 25). Predict, then run.
3. Take the reuse Non-Example and fix it so both a count and a list are produced. **Success criterion:** no exception — you create a *second* Stream from the source for the second operation.

## Mistake Log

When you miss one, log it to [[Streams and Lambdas Mistake Log]] as: wrong output → minimal repro → misconception → recall-question form → fix.

## Links

- Contrast: [[Streams vs Loops]] (declarative pipeline vs imperative loop)
- Map: [[Functional Programming MOC]]
- Related: [[Intermediate vs Terminal Operations]] · [[Method References]] · [[Collectors]] · [[Optional]]
- Prerequisites: [[Lambda Expressions]] · [[Functional Interfaces]] · [[Java Collections Framework]]

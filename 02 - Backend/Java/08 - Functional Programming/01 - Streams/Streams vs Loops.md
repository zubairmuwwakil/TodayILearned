---
type: comparison
topic: functional-programming
status: learning
difficulty: medium
tags:
  - java
  - functional-programming
  - streams
  - loops
  - performance
  - day-10
---
# Streams vs Loops

## What it is

Loops and Streams can solve the **same** data-processing problems, but they express intent differently:

- **Loops are imperative** — you spell out the control flow step by step (*how*): initialise, iterate, branch, mutate.
- **Streams are declarative** — you describe a pipeline of transformations (*what*): `filter → map → reduce`, and let the library run it.

Neither is universally better. The choice is per-problem, driven by readability and fit — not by which one is newer.

## Why it matters

Picking the right tool keeps code readable and, occasionally, faster. Reaching for a Stream reflexively can bury a simple task under pipeline ceremony; reaching for a loop reflexively can drown a multi-stage transform in boilerplate. Knowing the trade-offs lets you choose deliberately instead of by habit.

## Syntax / Pattern

```java
// Imperative loop: mutate an accumulator as you walk the source
var acc = init;
for (var e : source) {
    if (cond(e)) acc = combine(acc, e);
}

// Declarative stream: a pipeline of stages ending in a terminal op
var result = source.stream()
    .filter(cond)          // intermediate (lazy)
    .map(transform)        // intermediate (lazy)
    .reduce(init, combine); // terminal (triggers execution)
```

## Worked Example

```java
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = List.of(1, 2, 3, 4, 5, 6);

        // 1. Imperative loop: walk each element, branch, accumulate
        int loopSum = 0;
        for (int number : numbers) {
            if (number % 2 == 0) {
                loopSum += number;
            }
        }

        // 2. Declarative stream: keep evens, unbox to int, reduce to a sum
        int streamSum = numbers.stream()
            .filter(number -> number % 2 == 0)
            .mapToInt(Integer::intValue)
            .sum();

        // 3. Both strategies compute the same value
        System.out.println(loopSum);
        System.out.println(streamSum);
    }
}
```

**Explain in plain English (EiPE):** both blocks add up the even numbers (2 + 4 + 6 = 12) — the loop says *how* step by step, the Stream says *what* to compute.

## Trace

**Predict the output first (write it before reading on):**  `___`

Tracing the loop over `numbers = [1, 2, 3, 4, 5, 6]`:

| Iteration | `number` | `number % 2 == 0` | `loopSum` after |
|---|---|---|---|
| start | — | — | 0 |
| 1 | 1 | false | 0 |
| 2 | 2 | true | 2 |
| 3 | 3 | false | 2 |
| 4 | 4 | true | 6 |
| 5 | 5 | false | 6 |
| 6 | 6 | true | 12 |

The Stream applies the same `filter` and adds the survivors, reaching the same `12`.

**Actual output:** `12` then `12`. Same result, two styles — which is why the choice is about clarity, not correctness.

## Decision Guide

The comparison table that drives the choice in practice:

| Prefer **Streams** when… | Prefer **Loops** when… |
|---|---|
| Multi-stage `filter → map → reduce` pipelines | Complex control flow (`break`, `continue`, early return) |
| Aggregation / grouping (`collect`, `groupingBy`) | In-place mutation of an existing structure |
| Side-effect-free transformations | A body that throws **checked** exceptions |
| A declarative pipeline reads clearer than the loop | A simple op where a Stream only adds ceremony |
| Large CPU-bound data (*maybe* `parallelStream`) | Extremely performance-sensitive hot loops |

> [!warning] Streams are **not** automatically faster
> - Sequential Streams add abstraction overhead.
> - Lazy evaluation avoids unnecessary work; short-circuiting (`findFirst`, `anyMatch`, `limit`) can stop early.
> - `parallelStream()` may help large CPU-bound workloads but often *hurts* small inputs, blocking/IO work, ordered operations, and poorly splittable sources.
> - **Measure before optimizing.**

## Faded Practice

Fill the blank so the Stream can produce a numeric sum (the load-bearing decision):

```java
int streamSum = numbers.stream()
    .filter(number -> number % 2 == 0)
    ______                 // what turns Stream<Integer> into something with .sum()?
    .sum();
```

> [!answer]- Answer
> `.mapToInt(Integer::intValue)` — `Stream<Integer>` has **no** `sum()`; that method lives on the primitive `IntStream`. `mapToInt` unboxes each `Integer` and produces an `IntStream`, which *does* have `sum()`. (`.mapToInt(n -> n)` works too — auto-unboxing.)

## Common Mistakes

- Using a Stream because it's newer → choose by readability and fit, not novelty.
- Rewriting a clear three-line loop as a dense pipeline → if the loop reads better, keep the loop.
- Assuming `parallelStream()` guarantees a speedup → it can be *slower* for small inputs, blocking work, ordered ops, or poor splitting; measure.
- Adding shared mutable state to a pipeline → data races under parallelism; use a reduction or collector instead.
- Using `forEach()` to build up a result → prefer `reduce`/`collect` when you're producing a value.
- Assuming Streams are always faster → sequential Streams add overhead; profile before optimizing.

## Examples and Non-Examples

**Example:**
```java
// A multi-stage transform reads top-to-bottom as intent
List<Integer> squaredEvens = numbers.stream()
    .filter(n -> n % 2 == 0)
    .map(n -> n * n)
    .toList();                 // [4, 16, 36]
```

**Non-Example:**
```java
int[] total = {0};
numbers.parallelStream()
    .forEach(n -> total[0] += n);   // unsynchronized shared mutation
// FALSE BELIEF: "parallelStream() safely parallelizes any loop body"
// total[0] += n is not atomic; threads clobber each other -> lost updates.
```
A parallel Stream is not a free `for` loop. Anything that mutates shared state needs a reduction/collector (or a plain loop), not a side-effecting `forEach`.

## Recall Questions
%% Review via the Spaced Repetition plugin (Cmd/Ctrl+P > "Review flashcards"), not by rereading. %%
#flashcards/java/streams

What is the difference between imperative and declarative code?
?
Imperative code describes *how* — explicit step-by-step control flow and mutation. Declarative code describes *what* to compute — a pipeline of transformations — and lets the library decide how to run it.

Are Streams always more efficient than loops?
?
No. Sequential Streams add abstraction overhead; they can be faster (lazy evaluation, short-circuiting) or slower depending on the workload. Measure before optimizing.

Why can shared mutable state break parallel Stream code?
?
Multiple threads update the same state without synchronization, causing data races and lost updates. Use a reduction or collector so each thread accumulates independently and results merge safely.

## Mini Practice

1. Given `List.of(3, 1, 4, 1, 5, 9, 2, 6)`, sum the numbers `> 3` with (a) a loop and (b) a Stream. **Expected output:** both print `24` (4 + 5 + 9 + 6). Predict first, then run.
2. Rewrite `for (String s : words) System.out.println(s.toUpperCase());` as a Stream. **Success criterion:** it prints the same lines, and you can state one reason to prefer each form.
3. Accumulate a large list into `int[]{0}` via `parallelStream().forEach(...)` and run it several times. **Success criterion:** the total varies between runs (you reproduced a data race); then fix it with `.mapToInt(...).sum()` and confirm it's stable.

## Mistake Log

When you miss one, log it to [[Streams Mistake Log]] as: wrong output → minimal repro → misconception → recall-question form → fix.

## Links

- Contrast: [[Enhanced For Loop]] (imperative) vs [[Streams]] (declarative)
- Map: [[Streams MOC]]
- Related: [[Stream Operations]] · [[Collectors]] · [[Parallel Streams]] · [[Lambda Expressions]] · [[Method References]]
- Prerequisites: [[Streams]] · [[Lambda Expressions]] · [[Enhanced For Loop]]

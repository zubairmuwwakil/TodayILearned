---
type: concept
topic: functional-programming
status: learning
difficulty: medium
tags:
  - java
  - functional-programming
  - streams
  - pipeline
  - syntax
  - day-10
---
# Stream Pipeline Syntax

## What it is

A stream pipeline is a chain of method calls that expresses a data transformation in three parts: a **source**, zero or more **intermediate operations**, and exactly one **terminal operation**. Each intermediate operation returns another `Stream`, so the calls chain fluently — conventionally one operation per line.

## Why it matters

Vertical chaining reads top-to-bottom like a recipe: filter, then sort, then transform, then collect. It is easier to read, debug, and reorder than an equivalent nested loop, and it keeps the *source collection untouched* (a new result is produced). It also makes the lazy nature of streams visible — nothing runs until the terminal operation.

## Syntax / Pattern

```java
ResultType result = source.stream()      // 1. SOURCE — open the stream
    .intermediateOperation(...)          // 2. INTERMEDIATE — lazy, returns a Stream (chain 0+)
    .intermediateOperation(...)
    .terminalOperation();                // 3. TERMINAL — eager, produces a value (exactly 1)
```

**Common sources:**

```java
list.stream();                 // from any Collection
Stream.of("A", "B", "C");      // from explicit values
Stream.of(stringArray);        // from an object array (varargs → Stream<String>)
Arrays.stream(intArray);       // from a primitive array → IntStream (NOT Stream.of)
```

## Worked Example

```java
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<String> names = List.of("Mia", "Alexander", "Noah", "Olivia");

        List<String> result = names.stream()      // 1. open a stream over the source
            .filter(name -> name.length() >= 5)   // 2. keep names with 5+ letters
            .sorted()                             // 3. sort survivors in natural (A→Z) order
            .map(String::toUpperCase)             // 4. transform each to upper case
            .toList();                            // 5. terminal: collect into an unmodifiable List

        System.out.println(result);               // [ALEXANDER, OLIVIA]
    }
}
```

**Explain in plain English (EiPE):** it keeps the long names, alphabetises them, upper-cases each one, and gathers them into a new list — the original `names` list is never modified.

> [!tip] Order matters
> `filter(...).map(...)` can process fewer elements than `map(...).filter(...)`, because filtering first shrinks the data before the (possibly expensive) map step. When two orderings are equivalent, **filter early**.

## Trace

**Predict the output first (write it before reading on):**  `___`

The pipeline is lazy — the whole chain runs only when `.toList()` fires. This table shows the *logical* data flowing out of each stage:

| Stage | Operation | Stream contents after this stage |
|---|---|---|
| source | `names.stream()` | `Mia, Alexander, Noah, Olivia` |
| 2 | `filter(len >= 5)` | `Alexander, Olivia` |
| 3 | `sorted()` | `Alexander, Olivia` |
| 4 | `map(toUpperCase)` | `ALEXANDER, OLIVIA` |
| 5 | `toList()` | `[ALEXANDER, OLIVIA]` (a `List`) |

**Actual output:** `[ALEXANDER, OLIVIA]`. Note that `Mia` (3) and `Noah` (4) are dropped at the filter; `sorted()` leaves the pair unchanged because `Alexander` already precedes `Olivia`.

## Faded Practice

Fill the blank so the pipeline actually executes and returns a `List` (the load-bearing call):

```java
List<String> result = names.stream()
    .filter(name -> name.length() >= 5)
    .sorted()
    .map(String::toUpperCase)
    .______;                 // which call ENDS the pipeline and produces the List?
```

> [!answer]- Answer
> `toList()` — a **terminal** operation. Without a terminal op the intermediate operations are lazy: nothing runs and no result is produced. The terminal op is what triggers execution and fixes the return type.

## Common Mistakes

- Forgetting the terminal operation → intermediate ops are lazy, so the pipeline never executes and produces no result.
- Reusing a stream after a terminal op → a stream is consumed once; operating on it again throws `IllegalStateException`. Make a fresh stream from the source.
- `Stream.of(intArray)` for primitives → gives a single-element `Stream<int[]>`; use `Arrays.stream(intArray)` (an `IntStream`) instead.
- Assuming every pipeline returns a `List` → terminal return types vary (`count()` → `long`, `findFirst()` → `Optional`, `forEach()` → `void`).
- Mutating the source collection inside a lambda → undefined behaviour / `ConcurrentModificationException`; stream operations should be side-effect free.
- Ending a chain with a semicolon before the terminal op → leaves you holding a `Stream` you never run.

## Examples and Non-Examples

**Example:**
```java
long count = names.stream()
    .filter(n -> n.length() >= 5)
    .count();                          // complete: source → intermediate → terminal
```

**Non-Example:**
```java
Stream<String> s = names.stream();
s.forEach(System.out::println);        // terminal op consumes the stream
long n = s.count();                    // IllegalStateException at runtime
// FALSE BELIEF: "a stream is reusable like a collection" — it is a one-shot pipeline
```

## Recall Questions
%% Review via the Spaced Repetition plugin (Cmd/Ctrl+P > "Review flashcards"), not by rereading. %%
#flashcards/java/streams

Which helper turns an `int[]` into a usable numeric stream, and why not `Stream.of`?
?
`Arrays.stream(intArray)` (an `IntStream`). `Stream.of(intArray)` treats the array as one object, giving a single-element `Stream<int[]>`.

Why does `filter` before `map` often do less work than `map` before `filter`?
?
Filtering first removes elements early, so fewer elements reach the (possibly expensive) map step.

## Mini Practice
1. Given `List<Integer> nums = List.of(5, 2, 8, 1, 9, 3);`, write a pipeline that keeps evens, doubles each, sorts descending (`Comparator.reverseOrder()`), and collects to a list. **Expected output:** `[16, 4]`. (Predict, then run.)
2. Rewrite the worked example's terminal op as `count()` instead of `toList()`. **Success criterion:** it prints `2` (a `long`), proving terminal ops return different types.

## Mistake Log
When you miss one, log it to [[Streams Mistake Log]] as: wrong output → minimal repro → misconception → recall-question form → fix.

## Links
- Contrast: [[Streams vs Loops]] (internal vs external iteration)
- Map: [[Streams MOC]]
- Related: [[Intermediate Operations]] · [[Terminal Operations]] · [[Method References]]
- Prerequisites: [[Lambda Expressions]] · [[Functional Interfaces]]

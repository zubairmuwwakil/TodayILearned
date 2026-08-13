---
type: concept
topic: functional-programming
status: learning
difficulty: medium
tags:
  - java
  - streams
  - filter
  - predicate
  - functional-interface
  - day-10
---
# filter and Predicate

## What it is

`filter()` is an **intermediate** Stream operation that keeps only the elements for which a supplied `Predicate<T>` returns `true`; every other element is dropped from the pipeline.

A `Predicate<T>` is a functional interface whose single abstract method is `boolean test(T t)` — it takes **one** value of reference type `T` and answers a yes/no question. `filter` calls `test` on each element and forwards the `true` ones.

## Why it matters

Filtering replaces the `if`-inside-a-loop pattern with a declarative selection step: you *describe the condition* instead of writing the loop mechanics. Because the `Predicate` is a first-class value, you can name it, reuse it, pass it around, and combine conditions with `and`/`or`/`negate` — something a raw `if` cannot do.

## Syntax / Pattern

```java
stream.filter(element -> booleanCondition)   // inline lambda
```

Naming the predicate makes it reusable and testable:

```java
Predicate<Employee> retirementAge = employee -> employee.getAge() >= 65;
stream.filter(retirementAge);
```

The lambda **must** evaluate to a `boolean` — `filter` selects, it does not transform.

## Worked Example
```java
import java.util.List;
import java.util.function.Predicate;

public class FilterExample {
    public static void main(String[] args) {
        // 1. source data
        List<Integer> numbers = List.of(1, 2, 3, 4, 5, 6);
        // 2. the selection rule, captured as a reusable Predicate
        Predicate<Integer> isEven = number -> number % 2 == 0;
        // 3. keep only the elements that satisfy the predicate
        List<Integer> evens = numbers.stream()
            .filter(isEven)     // drops odds
            .toList();          // terminal op: materialises the result (Java 16+)

        System.out.println(evens); // [2, 4, 6]
    }
}
```

**Explain in plain English (EiPE):** `filter(isEven)` walks the stream and lets through only the numbers whose `test` returns `true`, so the odd numbers never reach `toList`.

### Combining predicates
```java
Predicate<Integer> isEven = n -> n % 2 == 0;
Predicate<Integer> isBig  = n -> n > 3;

isEven.and(isBig).test(4);   // true  — 4 is even AND > 3
isEven.or(isBig).test(5);    // true  — 5 is odd BUT > 3
isEven.negate().test(3);     // true  — 3 is NOT even
```
`and`, `or`, and `negate` are default methods on `Predicate`, so you build complex rules from small named ones instead of one tangled lambda.

## Trace
**Predict the output first (write it before reading on):**  `___`

Filter tests each element in encounter order and keeps it only when `test` is `true`. (The pipeline is *lazy* — this per-element work is triggered by the terminal `toList()`, not before.)

| Element | `number % 2 == 0` | `test` result | Kept? | Result so far |
|---:|---|---|:---:|---|
| 1 | `1 % 2 == 0` → `1 == 0` | `false` | No | `[]` |
| 2 | `2 % 2 == 0` → `0 == 0` | `true` | Yes | `[2]` |
| 3 | `3 % 2 == 0` → `1 == 0` | `false` | No | `[2]` |
| 4 | `4 % 2 == 0` → `0 == 0` | `true` | Yes | `[2, 4]` |
| 5 | `5 % 2 == 0` → `1 == 0` | `false` | No | `[2, 4]` |
| 6 | `6 % 2 == 0` → `0 == 0` | `true` | Yes | `[2, 4, 6]` |

**Actual output:** `[2, 4, 6]`. The source list is untouched — `filter` produces a new result rather than mutating `numbers`.

## Faded Practice
Fill the blank so only words starting with `"J"` survive (the load-bearing condition):
```java
List<String> words = List.of("Java", "Kotlin", "JUnit", "Go", "Jupyter");
List<String> result = words.stream()
    .filter(w -> ______)   // which boolean expression keeps only J-words?
    .toList();
// result should be: [Java, JUnit, Jupyter]
```
> [!answer]- Answer
> `w.startsWith("J")` — a `String` method returning `boolean`, exactly what `Predicate` needs. Result: `[Java, JUnit, Jupyter]`. (`w.charAt(0) == 'J'` also works but throws on empty strings.)

## Common Mistakes
- `.filter(number -> number * 2)` → **won't compile**; `number * 2` is an `int`, but `filter` needs a `boolean`. `filter` selects, it never transforms — that is [[map and Function|map]]'s job.
- Using `>` where you mean `>=` at a boundary → off-by-one; decide inclusivity deliberately (`age >= 65` includes 65).
- Stateful predicates like `x -> ++count[0] < 5` → results depend on encounter order and break under parallel streams; keep predicates **pure** (no side effects, no external mutation).
- Writing `Predicate<int>` → generics can't hold primitives. Use `Predicate<Integer>`, or better `IntPredicate` to skip autoboxing on primitive streams.
- Forgetting `filter` is **lazy** → a pipeline with no terminal operation does nothing; the predicate never runs until a terminal op (`toList`, `count`, `forEach`, …) pulls elements through.

## Examples and Non-Examples
**Example:**
```java
users.stream()
     .filter(User::isActive)   // method reference used as a Predicate
     .toList();
```
**Non-Example:**
```java
users.stream().filter(user -> {
    database.save(user);       // side effect — I/O inside a selector
    return true;
});
// FALSE BELIEF: "filter is just a place to run code for each element"
// filter must DESCRIBE selection; it must not mutate state or perform I/O.
// (Always returning true also means it filters nothing.)
```
A predicate answers "should this element stay?" — nothing more.

## Recall Questions
%% Review via the Spaced Repetition plugin (Cmd/Ctrl+P > "Review flashcards"), not by rereading. %%
#flashcards/java/streams

Why should a `Predicate` be stateless and side-effect-free?
?
Laziness and possible parallel execution mean the number and order of `test` calls aren't guaranteed; a stateful predicate produces order-dependent, non-reproducible results.

How do you combine two predicates without writing one big lambda?
?
Use the default methods `p1.and(p2)`, `p1.or(p2)`, and `p.negate()` to compose small, named predicates.

## Mini Practice
1. From `List.of("Java", "Kotlin", "Jupiter", "Go", "JavaScript", "Rust")`, keep words that are **at least 5 characters AND start with `"J"`**. Predict the list, then run. **Expected output:** `[Jupiter, JavaScript]`.
2. Define two named predicates (`isLong = w -> w.length() >= 5` and `startsWithJ = w -> w.startsWith("J")`) and filter with `isLong.and(startsWithJ)`. **Success criterion:** identical output to task 1 — proof that composition and one combined lambda agree.

## Mistake Log
When you miss one, log it to [[Streams Mistake Log]] as: wrong output → minimal repro → misconception → recall-question form → fix.

## Links
- Contrast: [[map and Function]] — transforms every element (`Function` → new value) vs `filter`, which *selects* elements (`Predicate` → `boolean`).
- Map: [[Streams MOC]]
- Related: [[Lambda Expressions]] · [[Functional Interfaces]] · [[Method References]] · [[reduce and BinaryOperator]]
- Prerequisites: [[Lambda Expressions]] · [[Stream Creation]]

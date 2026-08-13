---
aliases:
  - Method References
  - map and Function
type: concept
topic: functional-programming
status: learning
difficulty: medium
tags:
  - java
  - functional-programming
  - streams
  - map-operation
  - method-reference
  - day-10
---
# map and Method References

## What it is

`map()` is a **lazy intermediate stream operation** that applies a `Function<T, R>` to every element and produces a new stream of the transformed values. It is a **one-in, one-out** transform: the output stream has the same number of elements as the input, but each element may be a **different type** (`Stream<String>` → `Stream<Integer>`).

A **method reference** (`Type::methodName`) is shorthand for a lambda that just calls one existing method. `map(Integer::valueOf)` means exactly `map(s -> Integer.valueOf(s))`.

> [!warning] Name clash
> Stream `map()` (a transform operation) is **not** the `Map<K, V>` data structure (a key-value collection). They share a name and nothing else.

## Why it matters

`map()` is how you **reshape data as it flows** — extract a field, convert a type, or compute a derived value — without writing a loop or a temporary list. It is one of the most-used pipeline steps: pull salaries out of employees, parse strings to numbers, project objects to DTOs. Method references then make those transforms read like plain English (`.map(Employee::getSalary)`).

## Syntax / Pattern

```java
// Lambda form — spell out the transform
stream.map(element -> transformedValue)      // Function<T, R>

// Method-reference form — reuse an existing method
stream.map(Type::methodName)
```

Because `map` is **lazy**, nothing runs until a **terminal** operation (`toList()`, `forEach`, `collect`, `count`, ...) pulls elements through.

## Worked Example

```java
import java.util.List;

public class MapExample {
    public static void main(String[] args) {
        List<String> values = List.of("1", "2", "3");   // 1. source: Stream<String>

        List<Integer> numbers = values.stream()
            .map(Integer::valueOf)                       // 2. transform each String -> Integer
            .toList();                                   // 3. terminal op triggers the pipeline

        System.out.println(numbers);                     // 4. print the collected result
    }
}
```

**Explain in plain English (EiPE):** it converts a list of numeric *strings* into a list of `Integer`s, applying one transform per element and collecting the results.

### Method Reference Forms

`Integer::valueOf` above is a *static* method reference. A method reference has four forms:

| Form | Written as | Equivalent lambda |
|---|---|---|
| Static method | `Integer::valueOf` | `s -> Integer.valueOf(s)` |
| Bound instance (a specific object) | `p::concat` (where `String p = "Mr "`) | `x -> p.concat(x)` |
| Unbound instance (arbitrary object of a type) | `String::toUpperCase` | `s -> s.toUpperCase()` |
| Constructor | `StringBuilder::new` | `s -> new StringBuilder(s)` |

> [!warning] Not every method reference fits `map`
> `map` needs a `Function<T, R>` — a method that **returns a value**. A `void`-returning reference like `System.out::println` is a `Consumer`, so it works with `forEach`, never `map`. The bound-instance example above (`p::concat`) returns a `String`, so it *is* a valid `Function<String, String>` for `map`.

### Object Extraction Example

```java
List<Double> salaries = employees.stream()
    .map(Employee::getSalary)   // unbound instance ref: each Employee -> its Double salary
    .toList();
```

## Trace

**Predict the output first (write it before reading on):**  `___`

The pipeline is lazy, so trace it as elements flowing stage by stage:

| Line | Stage | Operation | Stream type | Contents |
|---|---|---|---|---|
| 1 | source | `List.of(...).stream()` | `Stream<String>` | `"1", "2", "3"` |
| 2 | map | `.map(Integer::valueOf)` | `Stream<Integer>` | `1, 2, 3` |
| 3 | terminal | `.toList()` | `List<Integer>` | `[1, 2, 3]` |
| 4 | print | `System.out.println` | — | `[1, 2, 3]` |

**Actual output:** `[1, 2, 3]`. Note the *type* changed at line 2 (`String` → `Integer`) while the *count* (3) stayed the same — that is the signature of `map`.

## Faded Practice

Fill the blank so each name is uppercased via a **method reference** (the load-bearing decision):

```java
List<String> upper = names.stream()
    .map(______)   // uppercase each name WITHOUT writing a lambda body
    .toList();
```

> [!answer]- Answer
> `String::toUpperCase` — an *unbound* instance-method reference. Java calls `toUpperCase()` on each stream element, so it is equivalent to `name -> name.toUpperCase()` and satisfies `Function<String, String>`.

## Common Mistakes

- Using `map` to select or drop elements → that is [[filter and Predicate|filter]]'s job; `map` never changes the element count.
- Using `map` only for side effects (printing, logging) → use `forEach` (terminal) or `peek` (debug) instead; `map` is for producing a return value.
- Passing a method reference whose signature does not match `Function<T, R>` → the method's parameters/return must fit the element type in and the target type out.
- Forgetting there is no terminal operation → a lazy pipeline with only `map` runs **nothing**.
- Forgetting primitive-specialized streams → use `mapToInt` / `mapToLong` / `mapToDouble` when you need `sum()`, `average()`, etc. on primitives.

## Examples and Non-Examples

**Example:**
```java
List<String> names = people.stream()
    .map(Person::getName)   // Person -> String, one per element
    .toList();
```

**Non-Example:**
```java
// FALSE BELIEF: "map() can drop or select elements like a filter."
numbers.stream()
    .map(n -> n % 2 == 0);  // Stream<Boolean>, SAME count: [1,2,3] -> [false,true,false]
```
`map` replaced each number with a boolean; it did **not** remove the odd ones. To keep only evens, use `filter(n -> n % 2 == 0)`.

## Recall Questions
%% Review via the Spaced Repetition plugin (Cmd/Ctrl+P > "Review flashcards"), not by rereading. %%
#flashcards/java/streams

Can `map()` change the element type? Can it change the element count?
?
It **can** change the type (`Stream<String>` → `Stream<Integer>`) but **never** the count — it is strictly one input element → one output element.

How is Stream `map()` different from `Map<K, V>`?
?
`map()` is a transform *operation* on a stream; `Map<K, V>` is a key-value *data structure*. Same word, unrelated concepts.

What is the difference between `map` and `filter`?
?
`map` **transforms** every element (count unchanged); `filter` **selects** elements that match a `Predicate` (count may shrink).

## Mini Practice
1. From `List.of("apple", "fig", "kiwi")`, produce a list of word lengths with `map(String::length)`. **Expected output:** `[5, 3, 4]`. (Predict, then run.)
2. Sum those lengths using a primitive stream: `.mapToInt(String::length).sum()`. **Expected output:** `12`. Success criterion: it compiles *without* boxing to `Integer`.
3. Uppercase `List.of("ann", "bob")` with `map(String::toUpperCase)` and print it. **Expected output:** `[ANN, BOB]`.

## Mistake Log
When you miss one, log it to [[Streams Mistake Log]] as: wrong output → minimal repro → misconception → recall-question form → fix.

## Links
- Contrast: [[filter and Predicate]] (selects) vs `map` (transforms)
- Map: [[Java Streams Overview]] · [[Day 10 - MOC]]
- Related: [[Stream Pipeline Syntax]] · [[Terminal Operations and Collectors]] · [[Streams vs Loops]]
- Prerequisites: [[Java Streams Overview]] · [[Lambda Expressions]] · [[20 Areas/Education/Obsidi Academy/Sessions/Java/Day 11 jul 20/Functional Interfaces and Lambda Expressions/Functional Interfaces]]

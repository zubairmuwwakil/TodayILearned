---
type: concept
topic: collections
status: learning
difficulty: easy
tags:
  - java
  - collections
  - set
  - linkedhashset
  - insertion-order
  - day-10
---
# LinkedHashSet

## What it is

`LinkedHashSet<E>` is a `Set` that stores **unique elements** using a hash table (like `HashSet`) but **additionally threads the entries with a doubly-linked list** so iteration follows **insertion order** — the order in which elements were *first* added. That extra linking is what costs it more memory than `HashSet`, and it's what makes its iteration order predictable.

## Why it matters

It gives you two guarantees at once: **no duplicates** and a **predictable, first-seen iteration order**. The classic high-value use is deduplicating a list while keeping the original order — something `HashSet` (unordered) and `TreeSet` (sorted) cannot do.

## Syntax / Pattern

```java
import java.util.LinkedHashSet;
import java.util.Set;

Set<String> animals = new LinkedHashSet<>();          // empty, insertion-ordered
Set<String> unique  = new LinkedHashSet<>(someList);  // dedup a collection, keep order
```

Program to the `Set` interface on the left; pick `LinkedHashSet` on the right when order matters.

## Worked Example

```java
import java.util.LinkedHashSet;
import java.util.Set;

public class PreserveOrder {
    public static void main(String[] args) {
        Set<String> seen = new LinkedHashSet<>();   // 1. empty set that remembers insertion order
        seen.add("dog");                            // 2. first-seen elements are stored in order...
        seen.add("cat");
        boolean added = seen.add("dog");            // 3. ...but a duplicate is rejected -> add() returns false
        seen.add("lion");

        System.out.println(added);                  // false
        System.out.println(seen);                   // [dog, cat, lion]
    }
}
```

**Explain in plain English (EiPE):** the set keeps each value exactly once in first-added order, and `add` returns `false` to tell you an element was already present.

## Trace

**Predict the output first (write it before reading on):**  `___`

| Line | Statement | `seen` after | `add` returns | Output |
|---|---|---|---|---|
| 1 | `new LinkedHashSet<>()` | `[]` | — | — |
| 2 | `seen.add("dog")` | `[dog]` | `true` | — |
| 3 | `seen.add("cat")` | `[dog, cat]` | `true` | — |
| 4 | `seen.add("dog")` | `[dog, cat]` | `false` | — |
| 5 | `seen.add("lion")` | `[dog, cat, lion]` | `true` | — |
| 6 | `println(added)` | `[dog, cat, lion]` | — | `false` |
| 7 | `println(seen)` | `[dog, cat, lion]` | — | `[dog, cat, lion]` |

**Actual output:** `false` then `[dog, cat, lion]`. The second `dog` is dropped and `added` captured its `false`; the surviving elements print in the order they were first inserted.

## Faded Practice

Fill the blank so `unique` deduplicates the list **and keeps first-seen order** (the load-bearing decision):

```java
List<String> input = List.of("dog", "cat", "dog", "lion");
Set<String> unique = new ______<>(input);   // which impl keeps insertion order?
System.out.println(unique);                 // want: [dog, cat, lion]
```

> [!answer]- Answer
> `LinkedHashSet`. `HashSet` would deduplicate but scramble the order; `TreeSet` would sort to `[cat, dog, lion]`. Only `LinkedHashSet` preserves first-seen order.

Progression to aim for: read the traced example → predict this blank → complete-the-code (above) → write a "dedupe-but-keep-order" utility from a blank editor (see Mini Practice).

## Common Mistakes

- Thinking it sorts its elements → it preserves **insertion** order; use `TreeSet` for sorted order.
- Thinking iteration order is unspecified → `LinkedHashSet` **guarantees** first-seen insertion-order iteration.
- Assuming re-adding an existing element moves it to the end → a duplicate `add` is a no-op; the element keeps its **original** position.
- Reaching for it when order is irrelevant → `HashSet` skips the linking overhead and uses less memory.
- Ignoring `add`'s return value → it returns `false` on a duplicate, which is the cheapest way to test "have I seen this before?".

## Examples and Non-Examples

**Example — dedup while preserving order:**
```java
Set<String> recentTags = new LinkedHashSet<>(List.of("java", "set", "java"));
System.out.println(recentTags);   // [java, set]
```

**Non-Example — expecting sorted output:**
```java
// FALSE BELIEF: "LinkedHashSet sorts its elements"
Set<Integer> nums = new LinkedHashSet<>(List.of(3, 1, 2));
System.out.println(nums);         // [3, 1, 2]  -- insertion order, NOT [1, 2, 3]
```
For sorted iteration use `TreeSet` instead.

## Mini Practice

1. Deduplicate `List.of(3, 1, 3, 2, 1, 4)` into a `LinkedHashSet`. Predict the printed set, then run. **Expected output:** `[3, 1, 2, 4]`.
2. Build a `HashSet`, `LinkedHashSet`, and `TreeSet` from `List.of("banana", "apple", "banana", "cherry")` and print each. **Success criterion:** the `LinkedHashSet` prints `[banana, apple, cherry]` (first-seen) and the `TreeSet` prints `[apple, banana, cherry]` (sorted); note that the `HashSet` order is unspecified. Predict all three first.

## Mistake Log

When you miss one, add it to [[Collections Mistake Log]] as: wrong output → minimal repro → misconception → recall-question form → fix.

## Links

- Contrast: [[HashSet]] (no order guarantee) vs [[LinkedHashSet]] (insertion order) vs [[TreeSet]] (sorted)
- Map: [[Collections MOC]]
- Related: [[Set Interface]] · [[LinkedHashMap]] · [[hashCode and equals]]
- Prerequisites: [[HashSet]] · [[Set Interface]]

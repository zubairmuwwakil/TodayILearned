---
type: concept
topic: collections
status: learning
difficulty: easy
tags:
  - java
  - collections
  - set
  - hashset
  - hashing
  - day-10
aliases: [Set, HashSet Basics, HashSet, Set Interface]
---
# Set Interface and HashSet

## What it is

A `Set<E>` is a Collection that models a **mathematical set: no duplicates, no positional index**. Adding a value that is already present is silently ignored.

`HashSet<E>` is the default general-purpose `Set`. It stores elements in a hash table, so `add`, `remove`, and `contains` run in **O(1) on average**. It decides whether two elements are "the same" by calling `hashCode()` to pick a bucket and then `equals()` to compare — so both must be correctly implemented on the element type. `HashSet` gives **no ordering guarantee** and permits a single `null`.

> [!note] A Set is not a List
> There is no `get(0)`, no `indexOf`, no duplicate slots. If you need positions or repeats, reach for a `List`.

## Why it matters

Reach for a Set whenever the question is about **membership or uniqueness**:

- "Have I seen this value before?"
- "Does this value already exist?"
- "How do I strip duplicates from this data?"

Typical uses: unique usernames or IDs, tags, visited URLs, and de-duplicating a stream of values — all in average constant time instead of an O(n) scan.

## Syntax / Pattern

```java
import java.util.HashSet;
import java.util.Set;

Set<String> tags = new HashSet<>();   // declare with the INTERFACE type
tags.add("java");                      // returns true if newly added
```

Declaring the variable as `Set` (not `HashSet`) lets you later swap in [[LinkedHashSet]] or [[50 Resources/Software Engineering/02 - Backend/Java/06.1 - Collections/03 - Sets/TreeSet]] without touching call sites.

## Worked Example

```java
import java.util.HashSet;
import java.util.Set;

public class UniqueNames {
    public static void main(String[] args) {
        // 1. start empty; interface type on the left, HashSet on the right
        Set<String> names = new HashSet<>();

        // 2. first insert of a value succeeds -> true
        System.out.println(names.add("Zara"));   // true
        System.out.println(names.add("Omar"));   // true

        // 3. re-adding an existing value is rejected -> false, set unchanged
        System.out.println(names.add("Zara"));   // false

        // 4. membership + count reflect only the UNIQUE values kept
        System.out.println(names.contains("Omar")); // true
        System.out.println(names.size());           // 2
    }
}
```

**Explain in plain English (EiPE):** the set keeps one copy of each name, and `add` reports with a boolean whether the value was actually new.

## Trace

**Predict the output first (write it before reading on):**  `___`

| Line | Statement | `names` afterward | Output |
|---|---|---|---|
| 1 | `Set<String> names = new HashSet<>();` | `{}` | — |
| 2 | `names.add("Zara")` | `{Zara}` | `true` |
| 3 | `names.add("Omar")` | `{Zara, Omar}` | `true` |
| 4 | `names.add("Zara")` | `{Zara, Omar}` (unchanged) | `false` |
| 5 | `names.contains("Omar")` | unchanged | `true` |
| 6 | `names.size()` | unchanged | `2` |

**Actual output:**
```
true
true
false
true
2
```
The second `"Zara"` returns `false` because an equal value is already present, so `size()` is `2`, not `3`.

## Common Methods

| Method | Purpose |
|---|---|
| `add(E value)` | Adds a value; returns `false` if it was already present |
| `contains(Object value)` | Membership test (O(1) average) |
| `remove(Object value)` | Removes a matching value; returns `true` if one was removed |
| `size()` | Number of unique elements |
| `isEmpty()` | Whether the set has no elements |
| `clear()` | Removes all elements |
| `addAll(collection)` | Union: add every element of another collection |
| `retainAll(collection)` | Intersection: keep only shared elements |
| `removeAll(collection)` | Difference: drop shared elements |

## Faded Practice

To de-duplicate custom objects, `HashSet` must be told what "equal" means. Complete the load-bearing line:

```java
import java.util.Objects;

class Point {
    int x, y;
    Point(int x, int y) { this.x = x; this.y = y; }

    @Override public boolean equals(Object o) {
        if (!(o instanceof Point)) return false;
        Point p = (Point) o;
        return x == p.x && y == p.y;
    }

    @Override public int ______() {          // which method MUST also be overridden?
        return Objects.hash(x, y);
    }
}
```

> [!answer]- Answer
> `hashCode`. `HashSet` first buckets by `hashCode()`, then compares candidates with `equals()`. Override `equals()` alone and two "equal" points can land in different buckets, so the duplicate is never detected — both get stored. The contract: equal objects **must** return equal hash codes.

## Common Mistakes

- Calling a Set "an unordered List" → they are different interfaces; a Set has no index and no duplicates.
- Expecting a stable print order from `HashSet` → order is unspecified and may change across runs/versions.
- Trying to index into a Set → `names.get(0)` does not compile; iterate or use `contains`.
- Ignoring the return of `add` / `remove` → the boolean tells you whether anything actually changed.
- Overriding `equals()` but not `hashCode()` on element types → breaks bucket lookup, so duplicates slip in.
- Mutating a field used by `equals`/`hashCode` after insertion → the element lands in the wrong bucket and becomes unfindable.

## Examples and Non-Examples

**Example — membership tracking (the right tool):**
```java
Set<String> visitedUrls = new HashSet<>();
if (visitedUrls.add(url)) {
    crawl(url);                 // add() returned true -> first time seeing this URL
}
```

**Non-Example — needing repeats and positions:**
```java
Set<Integer> testScores = new HashSet<>();
testScores.add(90);
testScores.add(90);            // silently dropped -> size stays 1
// FALSE BELIEF: "a Set is just an unordered List."
// A Set cannot hold duplicate scores or be read by position; use a List here.
```

## Recall Questions
%% Review via the Spaced Repetition plugin (Cmd/Ctrl+P > "Review flashcards"), not by rereading. %%
#flashcards/java/sets

What two rules distinguish a `Set` from a `List`?
?
A `Set` forbids duplicates and has no positional index; a `List` allows duplicates and supports index access like `get(i)`.

What average time complexity does hashing give `add`, `remove`, and `contains`?
?
O(1) on average with a good hash distribution; it degrades toward O(n) under heavy collisions (Java 8+ treeifies long buckets to O(log n)).

## Mini Practice

Create a `HashSet<Integer>` from `10, 20, 20, 30`, then predict each result before running:

1. Print its size. **Expected output:** `3` (the duplicate `20` is dropped).
2. Check whether it contains `20`. **Expected output:** `true`.
3. Remove `10`, then print whether adding `30` succeeds. **Expected output:** `false` (`30` is already present).

<details>
<summary>Answer</summary>

```java
Set<Integer> numbers = new HashSet<>();
numbers.add(10);
numbers.add(20);
numbers.add(20);
numbers.add(30);

System.out.println(numbers.size());       // 3
System.out.println(numbers.contains(20)); // true
numbers.remove(10);
System.out.println(numbers.add(30));      // false
```

</details>

## Mistake Log
When you miss one, add it to [[Collections Mistake Log]] as: wrong output → minimal repro → misconception → recall-question form → fix.

## Links
- Contrast: [[50 Resources/Software Engineering/02 - Backend/Java/06.1 - Collections/03 - Sets/TreeSet]] (sorted) · [[LinkedHashSet]] (insertion order) · [[List Interface and ArrayList]] (duplicates + index)
- Map: [[Collections MOC]]
- Related: [[HashMap]] · [[equals and hashCode]] · [[Iterating Collections]]
- Prerequisites: [[Java Collections Framework]] · [[Generics]]

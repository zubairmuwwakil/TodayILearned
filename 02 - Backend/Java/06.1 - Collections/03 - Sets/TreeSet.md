---
type: concept
topic: collections
status: learning
difficulty: medium
tags:
  - java
  - collections
  - set
  - treeset
  - sortedset
  - navigableset
  - day-10
---
# TreeSet

## What it is

`TreeSet<E>` is a `Set` that keeps its elements **unique and always sorted**. It is backed by a self-balancing red-black tree (a `TreeMap` internally) and implements `NavigableSet<E>`, so iteration is in ascending order and it exposes navigation queries like `first`, `last`, `lower`, and `ceiling`.

Ordering comes from either the element's **natural ordering** (`Comparable`) or a `Comparator` you pass to the constructor. Core operations — `add`, `remove`, `contains` — are `O(log n)` because each walks the height of the tree.

## Why it matters

`TreeSet` is the tool when *order and range* matter, not just membership. Reach for it when you need any of:

- **uniqueness** (like every `Set`),
- **automatic sorted iteration** with no explicit `sort` call,
- **range views** (`headSet`, `tailSet`, `subSet`),
- **nearest-neighbour lookups** (largest value below X, smallest at or above X).

If you only need fast membership and don't care about order, a [[Set Interface and HashSet|HashSet]] is simpler and `O(1)` on average.

## Syntax / Pattern

```java
import java.util.Set;
import java.util.NavigableSet;
import java.util.TreeSet;
import java.util.Comparator;

Set<Integer> a = new TreeSet<>();                                   // natural ordering
NavigableSet<Integer> b = new TreeSet<>();                          // declare NavigableSet to reach navigation methods
Set<String> c = new TreeSet<>(Comparator.comparingInt(String::length)); // custom ordering
```

Declare the variable as `NavigableSet` (or `TreeSet`) — not plain `Set` — or the compiler won't let you call `first()`, `lower()`, `ceiling()`, etc.

## Worked Example

```java
import java.util.NavigableSet;
import java.util.TreeSet;

public class ScoreRanges {
    public static void main(String[] args) {
        NavigableSet<Integer> scores = new TreeSet<>();
        // 1. insert out of order, with one duplicate
        scores.add(70);
        scores.add(90);
        scores.add(80);
        scores.add(90);

        // 2. iteration is always ascending; the second 90 was ignored
        System.out.println(scores);              // [70, 80, 90]

        // 3. endpoints
        System.out.println(scores.first());      // 70
        System.out.println(scores.last());       // 90

        // 4. nearest-neighbour queries (strict vs inclusive)
        System.out.println(scores.lower(80));    // 70  (strictly < 80)
        System.out.println(scores.ceiling(81));  // 90  (least >= 81)

        // 5. range views
        System.out.println(scores.headSet(80));  // [70]      (< 80)
        System.out.println(scores.tailSet(80));  // [80, 90]  (>= 80)
    }
}
```

**Explain in plain English (EiPE):** values go in unordered and duplicated, but the `TreeSet` stores each one once and hands them back sorted, so position-based and range-based queries answer instantly.

## Trace

**Predict the output first (write it before reading on):**  `___`

| Line | Statement | `scores` after | Output |
|---|---|---|---|
| 1 | `scores.add(70)` | `[70]` | — |
| 2 | `scores.add(90)` | `[70, 90]` | — |
| 3 | `scores.add(80)` | `[70, 80, 90]` | — (slotted into sorted position) |
| 4 | `scores.add(90)` | `[70, 80, 90]` | — (duplicate, `add` returns `false`) |
| 5 | `println(scores)` | `[70, 80, 90]` | `[70, 80, 90]` |
| 6 | `println(scores.first())` | `[70, 80, 90]` | `70` |
| 7 | `println(scores.last())` | `[70, 80, 90]` | `90` |
| 8 | `println(scores.lower(80))` | `[70, 80, 90]` | `70` |
| 9 | `println(scores.ceiling(81))` | `[70, 80, 90]` | `90` |
| 10 | `println(scores.headSet(80))` | `[70, 80, 90]` | `[70]` |
| 11 | `println(scores.tailSet(80))` | `[70, 80, 90]` | `[80, 90]` |

**Actual output:**
```
[70, 80, 90]
70
90
70
90
[70]
[80, 90]
```

## Faded Practice

You need the highest score **strictly below 85**. Fill the blank with the method that does exactly that (the load-bearing choice — strict vs inclusive):

```java
NavigableSet<Integer> scores = new TreeSet<>(java.util.List.of(70, 80, 90));
System.out.println(scores.______(85));   // want 80
```

> [!answer]- Answer
> `lower` → `scores.lower(85)` returns `80` (greatest element *strictly* less than 85). `floor(85)` would also give `80` here, but for `scores.lower(80)` you'd get `70` while `floor(80)` gives `80`. Rule: `lower`/`higher` are strict; `floor`/`ceiling` are inclusive.

## Common Mistakes

- Assuming insertion order is preserved → `TreeSet` iterates in **sorted** order; use [[LinkedHashSet]] for insertion order.
- Adding elements that aren't mutually comparable → `add` throws `ClassCastException` unless the type implements `Comparable` or you supplied a `Comparator`.
- Adding `null` with natural ordering → throws `NullPointerException`, because positioning compares the new element and `null.compareTo(...)` fails.
- Confusing `lower`/`higher` (strict) with `floor`/`ceiling` (inclusive) → off-by-one on boundary values.
- Forgetting default range endpoints → `headSet(x)` is `< x` (exclusive) and `tailSet(x)` is `>= x` (inclusive); use the two-arg overloads to flip inclusivity.
- Expecting `O(1)` operations → tree operations are `O(log n)`; `HashSet` is the `O(1)`-average choice.

## Examples and Non-Examples

**Example — order and range are the point:**
```java
NavigableSet<Integer> availableTimes = new TreeSet<>();
availableTimes.add(1400);
availableTimes.add(900);
availableTimes.add(1100);
System.out.println(availableTimes.ceiling(1000)); // 1100 — earliest slot at/after 10:00
```

**Non-Example — sorted, not insertion order:**
```java
Set<Integer> s = new TreeSet<>();
s.add(30); s.add(10); s.add(20);
System.out.println(s);   // [10, 20, 30]
// FALSE BELIEF: "a TreeSet keeps whatever order I insert in" — it re-sorts on every add.
```

**Poor fit — plain membership with no ordering need:**
```java
Set<String> ids = new TreeSet<>();   // works, but a HashSet is simpler and O(1) average
```

## Recall Questions
%% Review via the Spaced Repetition plugin (Cmd/Ctrl+P > "Review flashcards"), not by rereading. %%
#flashcards/java/treeset

What is the time complexity of `add`, `remove`, and `contains` on a TreeSet, and why?
?
`O(log n)` — it is backed by a self-balancing red-black tree, so each operation walks the tree's height.

What must an element type provide to be stored in a TreeSet that has no Comparator?
?
It must implement `Comparable` (natural ordering); otherwise `add` throws `ClassCastException`.

## Mini Practice

Build a `TreeSet<Integer>` from `50, 10, 40, 20, 30` (so it holds `[10, 20, 30, 40, 50]`). Predict each output, then run to confirm.

1. The smallest value — `first()`. **Expected output:** `10`
2. The largest value — `last()`. **Expected output:** `50`
3. All values below `35` — `headSet(35)`. **Expected output:** `[10, 20, 30]`
4. All values from `20` inclusive to `50` exclusive — `subSet(20, 50)`. **Expected output:** `[20, 30, 40]`
5. Stretch: the smallest value at or above `25` — pick between `ceiling` and `higher`. **Expected output:** `30`

## Mistake Log

When you miss one, add it to [[Collections Mistake Log]] as: wrong output → minimal repro → misconception → recall-question form → fix.

## Links
- Contrast: [[Set Interface and HashSet|HashSet]] (unordered, `O(1)` avg) · [[LinkedHashSet]] (insertion order) vs `TreeSet` (sorted, `O(log n)`)
- Compare: [[Set Implementations Comparison]]
- Map: [[Collections MOC]]
- Related: [[NavigableSet]] · [[Comparable]] · [[Comparator]] · [[TreeMap]]
- Prerequisites: [[Set Interface and HashSet]] · [[Comparable]]

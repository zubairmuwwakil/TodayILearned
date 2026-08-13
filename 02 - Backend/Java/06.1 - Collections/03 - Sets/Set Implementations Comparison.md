---
type: comparison
topic: collections
status: learning
difficulty: medium
tags:
  - java
  - collections
  - set
  - comparison
  - hashset
  - linkedhashset
  - treeset
  - day-10
---
# Set Implementations Comparison

## What it is

The three standard `Set` implementations all guarantee **no duplicates**, but they differ in **iteration order** and **cost**. `HashSet` is unordered and near-constant time; `LinkedHashSet` remembers insertion order; `TreeSet` keeps elements sorted and adds navigation methods. Picking between them is a decision about *order guarantees* first, *performance* second.

## Why it matters

They share one interface, so swapping implementations is a one-line change — but the wrong choice silently changes behaviour. Reach for insertion order and get plain `HashSet`, and your output order becomes unpredictable across runs. Choosing well the first time avoids "why did the order change?" bugs and keeps membership checks fast.

## Syntax / Pattern

```java
Set<T> a = new HashSet<>();        // fastest, no order guarantee
Set<T> b = new LinkedHashSet<>();  // insertion order preserved
Set<T> c = new TreeSet<>();        // sorted (needs Comparable or Comparator)
```

Program to the `Set` interface; pick the concrete class by the order/performance you need.

## Decision Table

| Implementation | Backing structure | Iteration order | Typical add / contains / remove | Allows one `null`? | Best use |
|---|---|---|---:|:---:|---|
| `HashSet` | Hash table | Not guaranteed | Average `O(1)` | Yes | Fast general membership checks |
| `LinkedHashSet` | Hash table + linked list | Insertion order | Average `O(1)` | Yes | Unique values with predictable order |
| `TreeSet` | Red-black tree | Sorted order | `O(log n)` | No (throws `NPE`) | Sorted values and range queries |

**High-ROI rule:** default to `HashSet`; upgrade to `LinkedHashSet` when order-of-insertion must show; use `TreeSet` when you need sorting or navigation (`first`, `last`, `headSet`).

## Worked Example

```java
import java.util.*;

public class Main {
    public static void main(String[] args) {
        // 1. same interface type, three different concrete implementations
        Set<Integer> hash = new HashSet<>();
        Set<Integer> linked = new LinkedHashSet<>();
        Set<Integer> tree = new TreeSet<>();

        // 2. feed all three the SAME values in the SAME order
        for (int value : List.of(30, 10, 20)) {
            hash.add(value);
            linked.add(value);
            tree.add(value);
        }

        // 3. only the implementation differs, so only the order differs
        System.out.println(hash);   // iteration order NOT guaranteed
        System.out.println(linked); // [30, 10, 20]  (insertion order)
        System.out.println(tree);   // [10, 20, 30]  (sorted)
    }
}
```

**Explain in plain English (EiPE):** identical data and identical inserts flow into three sets, and the *choice of implementation alone* decides the iteration order you get back.

## Trace

**Predict the output first (write it before reading on):**  `___`

| Line | Statement | `linked` contents | `tree` contents | Output |
|---|---|---|---|---|
| 1 | `add(30)` | `[30]` | `[30]` | — |
| 2 | `add(10)` | `[30, 10]` | `[10, 30]` | — |
| 3 | `add(20)` | `[30, 10, 20]` | `[10, 20, 30]` | — |
| 4 | `println(linked)` | `[30, 10, 20]` | `[10, 20, 30]` | `[30, 10, 20]` |
| 5 | `println(tree)` | `[30, 10, 20]` | `[10, 20, 30]` | `[10, 20, 30]` |

**Actual output:** `linked` prints `[30, 10, 20]`; `tree` prints `[10, 20, 30]`. `TreeSet` re-sorts on every insert (watch `10` jump in front of `30` at line 2), while `LinkedHashSet` just appends. `hash`'s order is unspecified, so never rely on it.

## Faded Practice

You need a set of names iterated in **alphabetical order** with no duplicates. Fill the blank:
```java
Set<String> names = new ______<>();   // which implementation sorts as it goes?
names.add("Charlie");
names.add("Alice");
names.add("Bob");
System.out.println(names);            // want: [Alice, Bob, Charlie]
```
> [!answer]- Answer
> `TreeSet`. It keeps elements in natural (sorted) order, so iteration yields `[Alice, Bob, Charlie]`. `HashSet` gives no order guarantee; `LinkedHashSet` would print insertion order `[Charlie, Alice, Bob]`.

Progression to aim for: read the labeled Worked Example → predict the Trace → complete-the-code above → from a blank editor, pick the right `Set` for a given order requirement and justify it in one sentence.

## Common Mistakes

- Reading "unordered" as "random" → it means **no order is guaranteed** by the API, not that order is shuffled.
- Expecting `HashSet` to keep insertion order → use `LinkedHashSet` for that.
- Expecting `TreeSet` to keep insertion order → it **sorts**, discarding insertion order.
- Adding `null` to a `TreeSet` → throws `NullPointerException` (it must call `compareTo`, even on the first element); only `HashSet`/`LinkedHashSet` accept a single `null`.
- Putting non-`Comparable` elements in a `TreeSet` without a `Comparator` → `ClassCastException` at runtime.
- Trying `set.get(0)` → sets have **no index-based access**; iterate or use a `List` instead.
- Forgetting `contains`/dedup rely on `equals` + `hashCode` (`HashSet`/`LinkedHashSet`) or `compareTo` (`TreeSet`) → broken methods break the set.

## Examples and Non-Examples

**Example** — sorted unique values with range navigation:
```java
TreeSet<Integer> scores = new TreeSet<>(List.of(30, 10, 20));
System.out.println(scores.first());        // 10
System.out.println(scores.headSet(20));    // [10]  (everything strictly < 20)
```

**Non-Example:**
```java
Set<Integer> s = new HashSet<>();
s.add(30); s.add(10); s.add(20);
System.out.println(s);
// FALSE BELIEF: "HashSet iterates in insertion order [30, 10, 20]" — it does NOT.
// Order is unspecified; switch to LinkedHashSet if you need [30, 10, 20].
```

## Recall Questions
%% Review via the Spaced Repetition plugin (Cmd/Ctrl+P > "Review flashcards"), not by rereading. %%
#flashcards/java/sets

Which `Set` removes duplicates while keeping first-seen (insertion) order?
?
`LinkedHashSet` — a hash table for fast lookup plus a linked list that records insertion order.

Which `Set` supports `first()`, `last()`, and `headSet()`?
?
`TreeSet` — those navigation methods come from `SortedSet`/`NavigableSet`, which only `TreeSet` implements. They are not on the plain `Set` interface.

Which `Set` should be the default when order is irrelevant?
?
`HashSet` — average `O(1)` add/contains/remove and the least overhead.

## Mini Practice

1. Add `20, 20, 20, 5` to a fresh `HashSet<Integer>` and print its `size()`. **Expected output:** `2`. (Predict, then run — duplicates collapse.)
2. Put `["b", "a", "c"]` into a `LinkedHashSet` and a `TreeSet`, print both. **Expected output:** `[b, a, c]` then `[a, b, c]`. (Predict before running.)
3. Call `new TreeSet<Integer>().add(null)`. **Success criterion:** it throws `NullPointerException` — proof `TreeSet` forbids `null`. Then confirm `HashSet` accepts one `null`.

## Mistake Log

Log misses to [[Collections Mistake Log]] as: wrong output → minimal repro → misconception → recall-question form → fix.

## Links

- Contrast: [[List Implementations Comparison]] (ordered, indexed, allows duplicates) vs Set (unique, membership-focused)
- Map: [[Collections MOC]]
- Related: [[HashSet]] · [[LinkedHashSet]] · [[50 Resources/Software Engineering/02 - Backend/Java/06.1 - Collections/03 - Sets/TreeSet]] · [[Map Implementations Comparison]]
- Prerequisites: [[Set Interface]] · [[equals and hashCode]] · [[Comparable and Comparator]]

---
type: concept
topic: collections
status: learning
difficulty: medium
tags:
  - java
  - collections
  - map
  - treemap
  - sortedmap
  - navigablemap
  - day-10
---
# TreeMap

## What it is

`TreeMap<K, V>` is a `Map` that keeps its entries **sorted by key at all times**. It implements `NavigableMap<K, V>` (and therefore `SortedMap<K, V>`) and is backed by a self-balancing **red-black tree**, so `get`, `put`, `remove`, and `containsKey` are `O(log n)` — not the average-case (expected) `O(1)` of a hash map.

Ordering comes from either the key's **natural ordering** (`K implements Comparable`) or a **`Comparator`** you pass to the constructor. Values are never sorted.

## Why it matters

Reach for `TreeMap` when you need the *keys* organised, not just stored:

- keys iterated in sorted order (no separate sort step)
- the smallest / largest key (`firstKey` / `lastKey`)
- ranges of keys (`headMap`, `tailMap`, `subMap`)
- the nearest key just below or above a target (`floorKey`, `ceilingKey`, `lowerKey`, `higherKey`)

If you only need fast lookup and don't care about order, a `HashMap` is the better default.

## Syntax / Pattern

```java
import java.util.Comparator;
import java.util.NavigableMap;
import java.util.TreeMap;

NavigableMap<String, Integer> ages = new TreeMap<>();          // natural ordering
NavigableMap<String, Integer> byLen =
        new TreeMap<>(Comparator.comparingInt(String::length)); // custom ordering
```

Navigation cheat-sheet (the part that's easy to mix up):

| Method | Returns the key that is... |
|---|---|
| `lowerKey(k)`   | greatest key `< k`  (strict) |
| `floorKey(k)`   | greatest key `<= k` |
| `ceilingKey(k)` | least key `>= k` |
| `higherKey(k)`  | least key `> k`  (strict) |

| Range view | Keys included |
|---|---|
| `headMap(to)`       | keys `< to`  (toKey **excluded**) |
| `tailMap(from)`     | keys `>= from` (fromKey **included**) |
| `subMap(from, to)`  | `from <= key < to` |

## Worked Example

```java
import java.util.NavigableMap;
import java.util.TreeMap;

public class SortedAges {
    public static void main(String[] args) {
        // 1. empty TreeMap — keys will auto-sort as we insert
        NavigableMap<String, Integer> ages = new TreeMap<>();

        // 2. insert in arbitrary order
        ages.put("John", 25);
        ages.put("Jane", 30);
        ages.put("Jack", 35);

        // 3. iteration/printing always follows sorted key order
        System.out.println(ages);                  // {Jack=35, Jane=30, John=25}

        // 4. navigate the sorted structure
        System.out.println(ages.firstKey());       // Jack
        System.out.println(ages.lastKey());        // John
        System.out.println(ages.ceilingKey("Jo")); // John (least key >= "Jo")
    }
}
```

**Explain in plain English (EiPE):** three name→age entries go in unordered, but the map reads them back sorted by name and lets us jump to the first, last, and nearest-above key without sorting anything ourselves.

## Trace
**Predict the output first (write it before reading on):**  `___`

| Line | Statement | `ages` (sorted view) | Output |
|---|---|---|---|
| 1 | `new TreeMap<>()` | `{}` | — |
| 2 | `put("John", 25)` | `{John=25}` | — |
| 3 | `put("Jane", 30)` | `{Jane=30, John=25}` | — |
| 4 | `put("Jack", 35)` | `{Jack=35, Jane=30, John=25}` | — |
| 5 | `println(ages)` | unchanged | `{Jack=35, Jane=30, John=25}` |
| 6 | `println(firstKey())` | unchanged | `Jack` |
| 7 | `println(lastKey())` | unchanged | `John` |
| 8 | `println(ceilingKey("Jo"))` | unchanged | `John` |

**Actual output:**
```
{Jack=35, Jane=30, John=25}
Jack
John
John
```
`"Jack" < "Jane" < "John"` lexicographically, so insertion order never shows through. `"Jo"` sorts between `"Jane"` and `"John"`, so the least key `>= "Jo"` is `"John"`.

## Faded Practice
Fill the blank so `k` becomes the least key **strictly greater than** 200 (the load-bearing choice — the wrong method returns 200 itself):
```java
NavigableMap<Integer, String> m = new TreeMap<>();
m.put(100, "a"); m.put(200, "b"); m.put(300, "c");

Integer k = m.__________(200);   // want 300, NOT 200
```
> [!answer]- Answer
> `higherKey` → returns `300`. `ceilingKey(200)` would return `200` because ceiling is inclusive (`>=`); "strictly greater" means `higherKey` (`>`).

## Common Mistakes
- Thinking values are sorted → **only keys** are ordered; a value's position is decided entirely by its key.
- Using keys with no total order and no `Comparator` → insertion throws `ClassCastException`; give the key `Comparable` or pass a `Comparator`.
- Inserting a `null` key under natural ordering → throws `NullPointerException` (a `null`-tolerant `Comparator` is the only workaround).
- Believing `null` values are banned → `null` **values** are allowed; the restriction is on keys.
- Expecting average `O(1)` lookup → tree operations are `O(log n)`; use `HashMap` when you need constant-time access and no ordering.
- Confusing `ceiling`/`floor` (inclusive) with `higher`/`lower` (strict), or `tailMap` (inclusive) with `headMap` (exclusive).
- Calling `firstKey()` / `lastKey()` on an empty map → throws `NoSuchElementException` (unlike `firstEntry()`, which returns `null`).

## Examples and Non-Examples
**Example:**
```java
// Event log keyed by timestamp — you want chronological order and range queries.
NavigableMap<Long, String> eventsByTimestamp = new TreeMap<>();
eventsByTimestamp.tailMap(cutoff);   // everything at or after a cutoff, in order
```

**Non-Example:**
```java
Map<String, User> users = new TreeMap<>();
// FALSE BELIEF: "TreeMap is just a Map, so it's fine as the default."
// Here you only do users.get(id) with no ordering need — TreeMap pays an
// O(log n) tax for a feature you never use. HashMap is the right default.
```

## Recall Questions
%% Review via the Spaced Repetition plugin (Cmd/Ctrl+P > "Review flashcards"), not by rereading. %%
#flashcards/java/treemap

Does a TreeMap sort by key or by value?
?
By key. A value simply lives wherever its key sorts to — there is no ordering on values.

Can a TreeMap use a null key? A null value?
?
Null key: not under natural ordering — it throws `NullPointerException`. Null value: yes, allowed.

## Mini Practice
Create a `TreeMap<Integer, String>` of course grades keyed by student ID (e.g. `101→"A"`, `550→"B"`, `730→"C"`, `900→"A"`). **Predict each result, then run:**

1. Print the smallest and largest ID. **Expected:** `101` and `900`.
2. Print entries with IDs below `500` (`headMap`). **Success criterion:** only `101` appears.
3. Print entries from `200` inclusive to `800` exclusive (`subMap`). **Success criterion:** `550` and `730` appear; `101` and `900` do not.
4. Find the nearest registered ID at or below `600` (`floorKey`). **Expected:** `550`.

## Mistake Log
Log misses to [[Collections Mistake Log]] as: wrong output → minimal repro → misconception → recall-question form → fix.

## Links
- Contrast: [[HashMap]] (hash order, `O(1)` average) · [[LinkedHashMap]] (insertion order) vs [[TreeMap]] (sorted, `O(log n)`)
- Map: [[Collections MOC]]
- Related: [[NavigableMap]] · [[SortedMap]] · [[Map Interface]]
- Prerequisites: [[Map Interface]] · [[Comparable]] · [[Comparator]]

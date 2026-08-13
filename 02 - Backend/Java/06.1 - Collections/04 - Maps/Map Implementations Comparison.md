---
type: comparison
topic: collections
status: learning
difficulty: medium
tags:
  - java
  - collections
  - map
  - comparison
  - map-implementations
  - day-10
---
# Map Implementations Comparison

## What it is

The three general-purpose `Map` implementations solve the **same problem — key → value lookup — with different guarantees about iteration order and cost**. `HashMap` trades order for speed (average `O(1)`), `LinkedHashMap` layers a predictable iteration order on top of that same speed, and `TreeMap` keeps keys sorted for `O(log n)` navigation. All three share the `Map` contract, so you can swap one for another by changing a single constructor call.

## Why it matters

Picking the right implementation is a one-line decision that changes iteration order, memory, and per-operation cost across your whole program. Choosing wrong is a silent bug: rely on `HashMap` iteration order and your output shuffles between JVM runs; reach for `TreeMap` when you never need sorting and you pay `O(log n)` for nothing.

## Syntax / Pattern

```java
Map<K, V> m = new HashMap<>();        // default: fast, order NOT guaranteed
Map<K, V> m = new LinkedHashMap<>();  // fast, keeps insertion order
Map<K, V> m = new TreeMap<>();        // sorted keys, O(log n)
```

Program to the `Map` interface; pick the concrete type by the guarantee you actually need.

## Decision Table

| Implementation | Iteration order | Typical get / put | Null key | Null values | Best use |
|---|---|---:|---|---|---|
| `HashMap` | **Not guaranteed** | Average `O(1)` | One allowed | Allowed | General-purpose lookup |
| `LinkedHashMap` | Insertion (or access) order | Average `O(1)` | One allowed | Allowed | Predictable order or LRU cache |
| `TreeMap` | Keys **sorted** | `O(log n)` | Rejected under natural ordering | Allowed | Sorted keys and range navigation |

**High-ROI rule:** default to `HashMap` → switch to `LinkedHashMap` only when stable order matters → switch to `TreeMap` only when you need sorted keys or range queries (`firstKey`, `subMap`).

> [!info] `HashMap` worst case
> Average `get`/`put` is `O(1)`, but many keys colliding in one bucket degrade it. Since Java 8 a bucket that grows past 8 entries (with table size ≥ 64) converts to a red-black tree, so the worst case is `O(log n)`, not `O(n)`.

## Worked Example
```java
import java.util.*;

public class Main {
    public static void main(String[] args) {
        Map<String, Integer> linked = new LinkedHashMap<>();
        Map<String, Integer> tree   = new TreeMap<>();

        // 1. same keys, deliberately inserted OUT of sorted order
        String[] keys = {"cherry", "apple", "banana"};
        for (int i = 0; i < keys.length; i++) {
            linked.put(keys[i], i);   // 2. LinkedHashMap remembers insertion order
            tree.put(keys[i], i);     // 3. TreeMap re-sorts keys on every put
        }

        // 4. iteration order reflects each map's contract
        System.out.println(linked.keySet());   // insertion order
        System.out.println(tree.keySet());      // sorted order

        // 5. TreeMap adds navigation the others lack
        TreeMap<String, Integer> nav = (TreeMap<String, Integer>) tree;
        System.out.println(nav.firstKey());
    }
}
```

**Explain in plain English (EiPE):** identical inserts produce different iteration orders because each map type enforces a different ordering contract, and `TreeMap` alone can answer "what is the smallest key?".

## Trace
**Predict the output first (write it before reading on):**  `___`

| Line | Statement | `linked` keys | `tree` keys | Output |
|---|---|---|---|---|
| 1 | `linked.put("cherry",0); tree.put("cherry",0);` | `[cherry]` | `[cherry]` | — |
| 2 | `linked.put("apple",1); tree.put("apple",1);` | `[cherry, apple]` | `[apple, cherry]` | — |
| 3 | `linked.put("banana",2); tree.put("banana",2);` | `[cherry, apple, banana]` | `[apple, banana, cherry]` | — |
| 4 | `System.out.println(linked.keySet());` | `[cherry, apple, banana]` | — | `[cherry, apple, banana]` |
| 5 | `System.out.println(tree.keySet());` | — | `[apple, banana, cherry]` | `[apple, banana, cherry]` |
| 6 | `System.out.println(nav.firstKey());` | — | `[apple, banana, cherry]` | `apple` |

**Actual output:**
```
[cherry, apple, banana]
[apple, banana, cherry]
apple
```
`LinkedHashMap` echoed the insertion order; `TreeMap` sorted alphabetically the whole time. (A `HashMap` here could print the keys in *any* order — that is exactly why it is absent from the trace.)

## Faded Practice
Fill the blank so `cache` behaves as a fixed-size LRU cache that evicts the least-recently-used entry (the load-bearing decision):
```java
// need: reorder entries on access so the eldest is the least-recently-USED
Map<String, Integer> cache = new LinkedHashMap<>(16, 0.75f, ______) {
    protected boolean removeEldestEntry(Map.Entry<String, Integer> e) {
        return size() > 3;   // keep at most 3 entries
    }
};
```
> [!answer]- Answer
> `true` — the `accessOrder` constructor flag. With `true`, every `get`/`put` moves the touched key to the end, so the *front* entry is the least-recently-used one that `removeEldestEntry` evicts. Left as the default `false`, the map orders by insertion and you would evict the oldest-inserted entry instead (an FIFO cache, not LRU).

## Common Mistakes
- Relying on `HashMap` iteration order → it is unspecified and can change between JVM versions; use `LinkedHashMap` if order matters.
- Thinking `TreeMap` sorts by **value** → it sorts by **key** (natural ordering or a supplied `Comparator`).
- Putting a `null` key in a `TreeMap` → `NullPointerException` under natural ordering (`HashMap`/`LinkedHashMap` allow one null key).
- Using `TreeMap` "just in case" → you pay `O(log n)` per op and lose null-key support for a sort you never use.
- Iterating `keySet()` then calling `get(key)` in the loop → two lookups per entry; iterate `entrySet()` for one.
- Assuming `LinkedHashMap` is slower than `HashMap` for lookup → both are average `O(1)`; the linked list only adds a small constant to preserve order.

## Examples and Non-Examples
**Example — pick the type by the guarantee you need:**
```java
Map<String, Integer> counts = new HashMap<>();        // order irrelevant -> fastest default
Map<String, Integer> logOrder = new LinkedHashMap<>(); // must replay in insertion order
Map<String, Integer> leaderboard = new TreeMap<>();    // need firstKey()/subMap()
```
**Non-Example:**
```java
Map<String, Integer> m = new HashMap<>();
m.put("b", 1); m.put("a", 2);
for (String k : m.keySet()) System.out.println(k);
// FALSE BELIEF: "HashMap iterates in insertion or sorted order."
// Order is UNSPECIFIED; do not depend on it — reach for LinkedHashMap or TreeMap.
```

## Recall Questions
%% Review via the Spaced Repetition plugin (Cmd/Ctrl+P > "Review flashcards"), not by rereading. %%
#flashcards/java/maps

Which `Map` implementation should be the default when iteration order does not matter?
?
`HashMap` — average `O(1)` `get`/`put` and the lowest overhead.

Which `Map` preserves insertion order, and which one keeps keys sorted?
?
`LinkedHashMap` preserves insertion (or access) order; `TreeMap` keeps keys sorted by natural ordering or a `Comparator`.

## Mini Practice
1. Insert the keys `{"delta","alpha","charlie","bravo"}` into a `HashMap`, `LinkedHashMap`, and `TreeMap`, then print each `keySet()`. **Expected:** `LinkedHashMap` shows insertion order, `TreeMap` shows `[alpha, bravo, charlie, delta]`, `HashMap` shows an unspecified order. (Predict all three, then run.)
2. Count word frequencies in a sentence with a `HashMap<String,Integer>`, then print results in alphabetical order. **Success criterion:** copy the map into a `new TreeMap<>(hashMap)` and iterate — output is sorted with no manual sorting code.
3. Build the LRU cache from Faded Practice, `put` four entries with one `get` in between, and print `keySet()`. **Expected output:** the least-recently-used key is gone and the cache holds exactly 3 keys.

## Mistake Log
Log misses to [[Collections Mistake Log]] as: wrong output → minimal repro → misconception → recall-question form → fix.

## Links
- Contrast: [[Set Implementations Comparison]] (the `Set`-family analog of this same decision)
- Map: [[Collections MOC]]
- Related: [[Map Interface and HashMap]] · [[LinkedHashMap]] · [[TreeMap]]
- Prerequisites: [[01 - Java Collections Framework]] · [[Map Interface and HashMap]]

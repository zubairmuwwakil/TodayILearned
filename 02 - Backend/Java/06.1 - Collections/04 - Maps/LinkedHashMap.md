---
type: concept
topic: collections
status: learning
difficulty: medium
tags:
  - java
  - collections
  - map
  - linkedhashmap
  - lru-cache
  - day-10
---
# LinkedHashMap

## What it is

`LinkedHashMap<K, V>` is a `HashMap` that **also threads all of its entries onto a doubly-linked list**, so iteration follows a *predictable* order instead of the effectively-random order of a plain `HashMap`.

- **Insertion order** (default): entries iterate in the order they were first added.
- **Access order** (opt-in via the 3-arg constructor): each `get` — and each `put` on an existing key — moves that entry to the *end*, so the least-recently-used entry sits at the front.

## Why it matters

You get `HashMap`'s O(1) average lookup **plus** a stable, meaningful iteration order — the best of both without paying for `TreeMap`'s sorting.

- Preserving the order records were first added (ordered output, config files, headers).
- Producing deterministic API/JSON output that is easy to test.
- Building an **LRU cache**: access order + `removeEldestEntry` gives automatic eviction of the least-recently-used entry.

## Syntax / Pattern

```java
// Insertion order (default)
Map<String, Integer> map = new LinkedHashMap<>();

// Access order (LRU building block): initialCapacity, loadFactor, accessOrder
LinkedHashMap<String, Integer> lru = new LinkedHashMap<>(16, 0.75f, true);
```

The third argument is the switch: `false` (or the no-arg constructor) → insertion order; `true` → access order.

## Worked Example

```java
import java.util.LinkedHashMap;
import java.util.Map;

public class InsertionOrderMap {
    public static void main(String[] args) {
        Map<String, Integer> ages = new LinkedHashMap<>();
        // 1. insert three keys — the first-seen order is remembered
        ages.put("John", 25);
        ages.put("Jane", 30);
        ages.put("Jack", 35);
        // 2. re-put an existing key — its VALUE changes, its POSITION does not
        ages.put("John", 26);
        // 3. iterate — still in first-insertion order
        for (Map.Entry<String, Integer> entry : ages.entrySet()) {
            System.out.println(entry.getKey() + ": " + entry.getValue());
        }
    }
}
```

**Explain in plain English (EiPE):** LinkedHashMap iterates keys in the order they were first inserted, and re-putting a key updates its value without moving it.

### Access order (the LRU building block)
```java
// accessOrder = true → most-recently-touched entry migrates to the end
LinkedHashMap<String, Integer> cache = new LinkedHashMap<>(16, 0.75f, true);
cache.put("a", 1);
cache.put("b", 2);
cache.put("c", 3);   // iteration order: a, b, c
cache.get("a");      // touching "a" moves it → iteration order: b, c, a

// Turn it into a real LRU cache by auto-evicting the eldest (least-recently-used) entry:
class LruCache<K, V> extends LinkedHashMap<K, V> {
    private final int capacity;
    LruCache(int capacity) {
        super(16, 0.75f, true);                      // 1. access order ON
        this.capacity = capacity;
    }
    @Override
    protected boolean removeEldestEntry(Map.Entry<K, V> eldest) {
        return size() > capacity;                     // 2. evict LRU once over capacity
    }
}
```
`removeEldestEntry` is called by LinkedHashMap after every insertion; returning `true` drops the front entry — in access order, that is the least-recently-used one.

## Trace
**Predict the output first (write it before reading on):**  `___`

| Line | Statement | Iteration order (key=value) | Output |
|---|---|---|---|
| 1 | `ages.put("John", 25);` | `John=25` | — |
| 2 | `ages.put("Jane", 30);` | `John=25, Jane=30` | — |
| 3 | `ages.put("Jack", 35);` | `John=25, Jane=30, Jack=35` | — |
| 4 | `ages.put("John", 26);` | `John=26, Jane=30, Jack=35` | — |
| 5 | iterate `entrySet()` | (unchanged) | `John: 26` / `Jane: 30` / `Jack: 35` |

**Actual output:**
```
John: 26
Jane: 30
Jack: 35
```
The re-`put` at line 4 updated John's value but left John first — in insertion-order mode, position is fixed at first insertion.

## Faded Practice
Fill the blank so `get` reorders the map (the load-bearing decision):
```java
LinkedHashMap<String, Integer> cache =
    new LinkedHashMap<>(16, 0.75f, ______);   // which value makes get() move entries?
cache.put("a", 1);
cache.put("b", 2);
cache.get("a");   // want iteration order to become: b, a
```
> [!answer]- Answer
> `true` — access order. With `false` (or the no-arg constructor) the order stays `a, b` no matter how often you call `get`; only `true` moves the accessed entry to the end.

## Common Mistakes
- Assuming it sorts keys → it never sorts; it preserves insertion (or access) order. Use [[TreeMap]] when you need sorted keys.
- Forgetting that in access-order mode `put` on an *existing* key also counts as an access → that entry jumps to the end too, not just on `get`.
- Calling `map.get(k)` while iterating an access-order map → `get` is a structural modification that bumps `modCount` and throws `ConcurrentModificationException`; read values through `entry.getValue()` instead.
- In insertion-order mode, expecting a re-`put` to reorder a key → the position is kept; only the value changes.
- Reaching for custom capacity/load-factor before measuring → the defaults are almost always right; the *ordering*, not tuning, is the reason to pick LinkedHashMap.

## Examples and Non-Examples
**Example:**
```java
// Keep HTTP headers in the exact order they were added
Map<String, String> headers = new LinkedHashMap<>();
headers.put("Content-Type", "application/json");
headers.put("Accept", "application/json");   // iterates: Content-Type, then Accept
```
**Non-Example:**
```java
// FALSE BELIEF: "LinkedHashMap keeps keys sorted."
Map<String, Integer> scores = new LinkedHashMap<>();
scores.put("Zoe", 9);
scores.put("Amy", 7);   // iterates Zoe, Amy — INSERTION order, NOT alphabetical
```
For alphabetical/comparable key order, use `TreeMap`; LinkedHashMap only remembers the order you gave it.

## Recall Questions
%% Review via the Spaced Repetition plugin (Cmd/Ctrl+P > "Review flashcards"), not by rereading. %%
#flashcards/java/linkedhashmap

How do you turn a LinkedHashMap into an LRU cache?
?
Construct it with access order (`true`) and override `removeEldestEntry` to return `size() > capacity`, so the least-recently-used entry is auto-evicted after each insert.

## Mini Practice
1. Build the worked-example map but insert in the order Jack → Jane → John. Predict the iteration output, then run. **Expected output:** `Jack: 35`, `Jane: 30`, `John: 25` (insertion order, not alphabetical).
2. Create `new LinkedHashMap<>(16, 0.75f, true)`, `put` `a`, `b`, `c`, then `get("b")`, then iterate the keys. Predict first. **Expected output:** `a c b` — `b` moved to the end.
3. Extend LinkedHashMap into a capacity-3 LRU cache (access order + `removeEldestEntry`). Put four keys, touching none. **Success criterion:** after the 4th `put`, `size()` is still 3 and the first-inserted key is gone.

## Mistake Log
When you miss one, add it to [[Collections Mistake Log]] as: wrong output → minimal repro → misconception → recall-question form → fix.

## Links
- Contrast: [[HashMap]] (no order guarantee) vs [[TreeMap]] (sorted) vs LinkedHashMap (insertion/access order)
- Map: [[Collections MOC]]
- Related: [[Map Interface]] · [[TreeMap]] · [[LRU Cache]]
- Prerequisites: [[HashMap]] · [[Map Interface]]

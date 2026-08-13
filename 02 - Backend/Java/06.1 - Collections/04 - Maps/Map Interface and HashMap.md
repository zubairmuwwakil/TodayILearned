---
type: concept
topic: collections
status: learning
difficulty: easy
tags:
  - java
  - collections
  - map
  - hashmap
  - key-value
  - day-10
aliases: [Map Basics, HashMap Basics, HashMap, Map Interface]
---
# Map Interface and HashMap

## What it is

A `Map<K, V>` stores data as **key → value pairs**, where each pair is called an *entry*. You look values up by their key, not by a numeric position.

- **Keys are unique** — one value per key.
- **Values may repeat** — many keys can map to the same value.
- **`put` on an existing key replaces** the old value (it never creates a duplicate key).

`HashMap<K, V>` is the general-purpose implementation. It stores entries using the keys' hash codes, giving **average O(1)** `get`/`put`, and makes **no guarantee about iteration order**. It permits one `null` key and any number of `null` values.

> [!note] Map is in the Collections Framework but does **not** extend `Collection`
> A `Collection` holds single elements; a `Map` holds *pairs*, so it defines its own interface with `keySet()`, `values()`, and `entrySet()` views instead.

## Why it matters

Reach for a Map whenever data is naturally retrieved by a unique label rather than an index:

- student ID → student
- username → account
- product code → price
- word → frequency

One keyed lookup replaces scanning a whole list, turning O(n) searches into average O(1).

## Syntax / Pattern

```java
import java.util.HashMap;
import java.util.Map;

Map<String, Integer> ages = new HashMap<>();   // key type = String, value type = Integer
ages.put("ada", 36);                            // add / overwrite an entry
int a = ages.get("ada");                        // read by key
```

Declare the variable as the **interface** (`Map`) and construct the **implementation** (`HashMap`) — you can swap the implementation later without changing callers.

## Worked Example

```java
import java.util.HashMap;
import java.util.Map;

public class WordFrequency {
    public static void main(String[] args) {
        String[] words = {"java", "map", "java", "set"};

        // 1. one Map to accumulate counts, keyed by the word itself
        Map<String, Integer> counts = new HashMap<>();

        // 2. for each word: read its current count (0 if never seen) and add 1
        for (String word : words) {
            counts.put(word, counts.getOrDefault(word, 0) + 1);
        }

        // 3. look results up by key (whole-map iteration order is NOT guaranteed)
        System.out.println(counts.get("java"));            // 2
        System.out.println(counts.getOrDefault("go", 0));  // 0
        System.out.println(counts.containsKey("set"));     // true
    }
}
```

**Explain in plain English (EiPE):** it counts how many times each distinct word appears by using the word as the key and bumping its stored count by one.

## Trace

**Predict the output first (write it before reading on):**  `___`

Building the counts as the loop runs (contents shown in insertion order for readability — not the real iteration order):

| Step | `word` | `getOrDefault(word, 0)` | value put | `counts` (logical contents) |
|---|---|---:|---:|---|
| start | — | — | — | `{}` |
| 1 | `java` | 0 | 1 | `{java=1}` |
| 2 | `map` | 0 | 1 | `{java=1, map=1}` |
| 3 | `java` | 1 | 2 | `{java=2, map=1}` |
| 4 | `set` | 0 | 1 | `{java=2, map=1, set=1}` |

Then the three keyed reads:

| Line | Statement | Output |
|---|---|---|
| a | `counts.get("java")` | `2` |
| b | `counts.getOrDefault("go", 0)` | `0` |
| c | `counts.containsKey("set")` | `true` |

**Actual output:**
```
2
0
true
```
If you instead printed `counts` directly, the entry *order* would be unspecified (e.g. `{java=2, set=1, map=1}` on one JVM) — never predict or depend on it.

## Common Methods

| Method | Purpose |
|---|---|
| `put(key, value)` | Adds a new entry or replaces an existing one; returns the previous value (or `null`) |
| `putIfAbsent(key, value)` | Adds a value only when the key is missing (or currently mapped to `null`) |
| `get(key)` | Returns the value, or `null` if the key is absent |
| `getOrDefault(key, defaultValue)` | Returns a fallback instead of `null` when the key is missing |
| `containsKey(key)` | Tests for a key |
| `containsValue(value)` | Tests for a value (scans all entries) |
| `remove(key)` | Removes an entry and returns its value |
| `replace(key, value)` | Replaces a value **only if the key already exists** |
| `size()` / `clear()` | Number of entries / remove all entries |
| `keySet()` / `values()` / `entrySet()` | Set of keys / Collection of values / Set of entries |

## Iterating Correctly

Iterate over `entrySet()` so you get the key **and** value together — no second lookup per key:

```java
for (Map.Entry<String, Integer> entry : ages.entrySet()) {
    System.out.println(entry.getKey() + " -> " + entry.getValue());
}
```

Looping over `keySet()` and calling `get(key)` inside works but pays for an extra hash lookup on every iteration.

## Faded Practice

Fill the blank so the counter still works on a word's **first** appearance (the load-bearing decision):

```java
for (String word : words) {
    counts.put(word, counts.__________(word, 0) + 1);
}
```

> [!answer]- Answer
> `getOrDefault` — it returns the stored count, or `0` when the word hasn't been seen yet, so `+ 1` always operates on a number. Writing `counts.get(word) + 1` throws a `NullPointerException` on the first occurrence: `get` returns `null`, and unboxing `null` to `int` fails.

## Common Mistakes

- Treating a key like a list index → a key *identifies* a value; it is not a numeric position.
- Expecting duplicate keys to coexist → a later `put()` overwrites the earlier value for that key.
- Using a primitive as a type parameter (`Map<String, int>`) → generics need reference types; use `Integer`.
- `counts.get(word) + 1` on an absent key → `get` returns `null`, unboxing it throws `NullPointerException`; use `getOrDefault(word, 0)`.
- Assuming `values()` is a `Set` or array → it returns a `Collection<V>` view that can contain duplicates.
- Assuming a `HashMap` is sorted or ordered → hashing gives fast lookup, **not** order; use `TreeMap` (sorted) or `LinkedHashMap` (insertion order).
- Using `get() == null` to test presence → `null` also means "key mapped to null"; use `containsKey()` when the difference matters.

## Examples and Non-Examples

**Example** (unique id keys a lookup):
```java
Map<Long, String> userNameById = new HashMap<>();
userNameById.put(1001L, "ada");
String name = userNameById.get(1001L);   // "ada"
```

**Non-Example** (this line does not compile):
```java
Map<String, int> ages = new HashMap<>();
// FALSE BELIEF: "type parameters can be primitives like int"
// Generics accept reference types only → use Integer (autoboxing handles the rest).
```

**Non-Example** (relying on order):
```java
Map<String, Integer> m = new HashMap<>();
m.put("z", 1); m.put("a", 2);
System.out.println(m.keySet());
// FALSE BELIEF: "HashMap keeps keys in insertion or sorted order"
// Output order is unspecified — reach for LinkedHashMap or TreeMap if order matters.
```

## Recall Questions
%% Review via the Spaced Repetition plugin (Cmd/Ctrl+P > "Review flashcards"), not by rereading. %%
#flashcards/java/collections-map

What does `get(key)` return when the key is absent, and why is that ambiguous?
?
It returns `null` — but a key explicitly mapped to `null` also returns `null`, so `null` can't distinguish "missing" from "present-with-null". Use `containsKey()` when the distinction matters.

What does `entrySet()` return, and why prefer it when iterating?
?
A `Set<Map.Entry<K, V>>` view. Iterating it exposes the key and value together, avoiding a second `get()` lookup per key.

## Mini Practice

Create a `Map<String, Double>` of three products and prices, then (predict each result, then run):

1. Update one price with `put`. **Expected:** the old price is replaced, `size()` unchanged.
2. Check whether a product exists with `containsKey`. **Expected:** `true` for one you added, `false` for one you didn't.
3. Remove one product with `remove`. **Expected:** `size()` drops by 1; a later `get` on it returns `null`.
4. Print every entry via `entrySet()`. **Success criterion:** each line shows one product and its price (order unspecified).

## Mistake Log

When you miss one, log it to [[Collections Mistake Log]] as: wrong output → minimal repro → misconception → recall-question form → fix.

## Links
- Contrast: [[Map Implementations Comparison]] — `HashMap` (no order) vs [[LinkedHashMap]] (insertion order) vs [[TreeMap]] (sorted keys)
- Map: [[Collections MOC]]
- Related: [[Set Interface and HashSet]] · [[Iterator Interface]] · [[Java Collections Framework]]
- Prerequisites: [[Java Collections Framework]] · autoboxing / generics basics

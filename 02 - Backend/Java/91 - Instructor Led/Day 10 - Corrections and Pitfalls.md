---
tags: [java, day-10, corrections, mistake-log]
---

# Day 10 - Corrections and Pitfalls

This file records important corrections to common beginner explanations.

## Sets

### “A Set is an unordered list”

More precise: a Set is a separate Collection type that stores unique elements. It is not a List and does not support index-based access.

### “LinkedHashSet has no particular iterator order”

Incorrect. `LinkedHashSet` iterates in insertion order.

### “HashSet is faster because developer-defined indexes are slow”

More precise: HashSet uses hashing for average constant-time membership operations. Lists locate arbitrary values through linear search unless additional indexing or sorting is used.

## Maps

### “Map has three internal Sets”

The interface exposes collection views:

- `keySet()` returns `Set<K>`
- `values()` returns `Collection<V>`
- `entrySet()` returns `Set<Map.Entry<K, V>>`

That does not mean every Map is literally implemented as three stored Sets.

### “A Map cannot be traversed”

Incorrect. A Map can be iterated through its views, especially `entrySet()`.

### “keySet(), values(), and entrySet() return arrays”

Incorrect. They return backed Collection views, not arrays.

### “TreeMap allows no null values”

Incorrect. TreeMap can store null values. Null keys are normally rejected with natural ordering.

### “HashMap is optimized for sorting”

Incorrect. HashMap is optimized for average fast lookup, insertion, and removal. It does not sort.

### Access-order LinkedHashMap iteration

Calling `get()` changes order when `accessOrder` is `true`. Avoid calling `get()` while iterating its key set; iterate entries and use `entry.getValue()`.

## Streams

### “forEach() returns a new Collection”

Incorrect. Stream `forEach()` is terminal and returns `void`.

### “Streams never modify data”

The pipeline does not structurally modify the source by default, but lambdas can still mutate referenced objects. Avoid side effects unless intentionally required.

### “Streams are more efficient”

Not guaranteed. Streams often improve expression and composability. Performance depends on data size, operations, JVM optimization, and whether parallelism is appropriate.

### “Terminal operations must not modify elements”

Mutation is technically possible, but side-effect-free operations are safer, easier to test, and compatible with parallel execution.

## Retrieval Check

Explain each correction without rereading the section. Mark any answer you cannot explain confidently for review tomorrow.

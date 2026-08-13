---
type: comparison
topic: collections
status: learning
difficulty: medium
tags:
  - java
  - collections
  - arraylist
  - linkedlist
  - performance
  - list
aliases:
  - List Implementations Comparison
  - ArrayList versus LinkedList
---
# ArrayList vs LinkedList

## What it is

Both implement the `List` interface, so they expose the *same* methods — but they store data with completely different structures, so their **performance profiles differ**.

```text
ArrayList  -> one resizable backing array (elements packed together)
LinkedList -> a chain of doubly-linked nodes (element + prev/next pointers)
```

The right choice depends on **which operations you do most, and where in the list you do them**.

## Why it matters

"Can it add and remove items?" is the wrong question — both can. The useful question is:

> Which operations happen most often, and *where* in the collection do they happen?

Pick by access pattern, not by gut feel. In practice `ArrayList` is the default; `LinkedList` earns its place only in specific end-heavy or iterator-heavy workloads.

## Syntax / Pattern

```java
List<T>  a = new ArrayList<>();   // array-backed: O(1) get(i), cache-friendly iteration
List<T>  b = new LinkedList<>();  // node-backed:  O(1) add/remove at the ends
Deque<T> d = new ArrayDeque<>();  // preferred for pure stack/queue work (no indexing)
```

## Structural Comparison

### ArrayList

```text
Index:   0     1     2     3
       [ A ] [ B ] [ C ] [ D ]     <- contiguous array
```

Strengths:

- fast indexed access (`get`/`set`)
- fast, cache-friendly iteration
- low per-element overhead
- usually fast appends (amortized)

Costs:

- middle insertion/removal shifts elements
- occasional growth copies into a larger array

### LinkedList

```text
null <- [A] <-> [B] <-> [C] <-> [D] -> null     <- scattered nodes joined by pointers
```

Strengths:

- efficient add/remove at either end
- efficient node unlinking *once the node is known*
- implements both `List` and `Deque`

Costs:

- indexed access requires traversal
- more memory per element (two pointers + object header per node)
- weaker CPU-cache locality
- middle-by-index operations still pay to locate the node

## Practical Performance Table

| Operation | ArrayList | LinkedList |
|---|---|---|
| `get(i)` | O(1) | O(n) |
| `set(i, x)` | O(1) | O(n) (locate node) |
| append at end | Amortized O(1) | O(1) |
| add at beginning | O(n) | O(1) |
| remove from beginning | O(n) | O(1) |
| insert/remove at known iterator position | O(n) shifting | O(1) relinking |
| insert/remove by arbitrary index | O(n) | O(n) to locate |
| iteration | Usually very fast | O(n), slower constants |
| memory per element | Lower | Higher |

> [!note] Big-O is not the whole story
> Big-O describes *growth*, not real wall-clock time. `ArrayList` often beats `LinkedList` even at equal complexity because packed arrays are compact and cache-friendly, while chasing node pointers thrashes the cache.

## Decision Guide

### Choose `ArrayList` when

- you need indexed access, or you mainly append, or you iterate a lot
- you want the best general-purpose list
- memory efficiency matters

```java
List<String> names = new ArrayList<>();
```

### Choose `LinkedList` when

- you frequently add/remove at both ends *and* need `List` behaviour too
- you delete repeatedly via an iterator (its `remove()` is O(1))
- indexed access is uncommon

```java
Deque<String> queue = new LinkedList<>();
```

### Reach for `ArrayDeque` instead when

You need a stack or queue but *don't* need `List` operations — it's the stronger default for pure deque work.

```java
Deque<String> queue = new ArrayDeque<>();
```

## Worked Example
```java
import java.util.Deque;
import java.util.LinkedList;

public class Main {
    public static void main(String[] args) {
        // 1. LinkedList can act as a double-ended queue (Deque)
        Deque<String> line = new LinkedList<>();
        // 2. add to the back — O(1) at the tail
        line.addLast("Andrea");
        line.addLast("Malik");
        // 3. jump the queue — add to the front, also O(1)
        line.addFirst("Priority");
        // 4. serve the front — removeFirst is O(1)
        System.out.println(line.removeFirst());
    }
}
```

**Explain in plain English (EiPE):** `LinkedList` gives constant-time add/remove at *both* ends — exactly the operations a queue or deque leans on, and exactly where `ArrayList` would pay O(n) to shift.

## Trace
**Predict the output first (write it before reading on):**  `___`

| Line | Statement | `line` (front → back) | Output |
|---|---|---|---|
| 1 | `Deque<String> line = new LinkedList<>();` | `[]` | — |
| 2 | `line.addLast("Andrea");` | `[Andrea]` | — |
| 3 | `line.addLast("Malik");` | `[Andrea, Malik]` | — |
| 4 | `line.addFirst("Priority");` | `[Priority, Andrea, Malik]` | — |
| 5 | `System.out.println(line.removeFirst());` | `[Andrea, Malik]` | `Priority` |

**Actual output:** `Priority`. `addFirst` inserted ahead of the existing front, so `removeFirst` served it first — no shifting of the other elements.

## Faded Practice
The program does frequent indexed reads and iteration. Fill the blank with the best-fit implementation (the load-bearing decision):
```java
// which implementation makes get(i) O(1) and iteration cache-friendly?
List<Product> products = new ______<>();
for (int i = 0; i < products.size(); i++) {
    render(products.get(i));
}
```
> [!answer]- Answer
> `ArrayList`. Its `get(i)` is O(1) (direct `base + index` addressing) and its packed array iterates cache-friendly. A `LinkedList` here makes the indexed loop O(n²) — every `get(i)` re-traverses from an end.

## Common Mistakes

- "LinkedList is always faster for adding" → location decides: `addFirst` is O(1), but `add(5000, x)` must first walk to index 5000 (O(n)).
- "ArrayList allocates a new array on every change" → no; `set` never resizes, insert/remove only shifts, and a fresh larger array is copied *only* when capacity must grow.
- "LinkedList saves memory" → usually false; each node adds an object header plus two pointers on top of the element.
- "Big-O alone names the winner" → it omits constants, cache locality, and allocation/GC cost — measure for real data.
- "Use LinkedList for a queue/stack" → prefer `ArrayDeque` when you don't need `List` indexing; it's faster with less overhead.

## Examples and Non-Examples

**Example — high-read collection:**
```java
List<Product> products = new ArrayList<>();   // frequently scanned and indexed
```

**Example — explicit deque abstraction:**
```java
Deque<Action> undoHistory = new ArrayDeque<>();  // push/pop at the ends only
```

**Non-Example — indexed loop over a LinkedList:**
```java
LinkedList<String> list = new LinkedList<>();
for (int i = 0; i < list.size(); i++) {
    process(list.get(i));   // FALSE BELIEF: "get(i) is cheap on any List"
}                           // each get(i) re-traverses -> the loop is O(n^2)
```
Fix — iterate sequentially so each step is O(1):
```java
for (String value : list) {   // enhanced-for uses the list's iterator
    process(value);
}
```

## Recall Questions
%% Review via the Spaced Repetition plugin (Cmd/Ctrl+P > "Review flashcards"), not by rereading. %%
#flashcards/java/collections

What structure backs an `ArrayList`, and a `LinkedList`?
?
`ArrayList` = one resizable (dynamic) array of packed elements. `LinkedList` = a doubly-linked chain of nodes, each holding the element plus prev/next references.

Which gives constant-time indexed access, and why?
?
`ArrayList` — it computes the element's address directly (`base + index`) in the backing array. `LinkedList` has no index math, so `get(i)` walks the links.

Why is `ArrayList` usually the best default?
?
Fast O(1) indexed access, cache-friendly iteration, low overhead, and amortized O(1) append — it wins the common cases.

What is usually preferred for pure queue/stack work, and why?
?
`ArrayDeque` — it's faster with less per-element overhead than `LinkedList` when you don't need `List` indexing.

## Mini Practice
For each scenario, write your pick (`array`, `ArrayList`, `LinkedList`, or `ArrayDeque`) plus a one-line justification, **then** check yourself.

1. A list of search results read by index.
2. A queue of print jobs (FIFO).
3. A list that is appended to and displayed frequently.
4. A structure used only as a stack.
5. A list where elements are repeatedly removed through an iterator.
6. A fixed collection of exactly seven weekdays.

> [!answer]- Answers
> 1. `ArrayList` — indexed `get(i)` is O(1).
> 2. `ArrayDeque` — pure FIFO, no `List` indexing needed.
> 3. `ArrayList` — cheap append + cache-friendly iteration.
> 4. `ArrayDeque` — the recommended stack (`push`/`pop`), beats `LinkedList` and legacy `Stack`.
> 5. `LinkedList` — `ListIterator.remove()` is O(1); `ArrayList`'s is O(n) shifting.
> 6. A plain `array` (or `List.of(...)`) — fixed size, no resizing or pointer overhead.

## Mistake Log
Log misses to [[Collections Mistake Log]] as: wrong output → minimal repro → misconception → recall-question form → fix.

## Links
- Contrast: [[ArrayDeque]] — preferred for pure stack/queue use
- Map: [[Collections MOC]]
- Related: [[ArrayList]] · [[LinkedList]] · [[Big-O Notation]]
- In practice: [[03 - List Interface and Polymorphism]]
- Prerequisites: [[List Interface]] · [[Big-O Notation]]

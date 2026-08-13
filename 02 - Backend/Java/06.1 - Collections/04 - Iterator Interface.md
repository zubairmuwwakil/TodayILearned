---
type: concept
topic: collections
status: learning
difficulty: medium
tags:
  - java
  - collections
  - iterator
  - interfaces
aliases:
  - Iterator Interface
  - Java Iterator
---
# Iterator Interface

## What it is

`Iterator<E>` is an interface that describes a **cursor-like object** for walking through a collection's elements one at a time. It tracks where you are in the traversal **without exposing the collection's internal storage** (array, linked nodes, buckets, …).

Three things people conflate — keep them separate:

- `Iterator` is an **interface**.
- `cars.iterator()` is a **method call** on the collection.
- that call **returns an object** whose class implements `Iterator<String>`.

You never write `new Iterator<>()`. The collection builds the correct iterator for its own structure and hands it to you.

> [!note] Where the object comes from
> Conceptually, `ArrayList` contains something like `public Iterator<String> iterator() { return new ArrayListIterator(); }`. That internal object knows which collection it belongs to, its current cursor position, and which element `next()` returned most recently. That is why `Iterator` can be an interface while your variable still refers to a real object.

## Why it matters

One traversal pattern works across **every** collection implementation — `ArrayList`, `LinkedList`, `HashSet`, and more — regardless of how each stores its data. It is the right tool when you:

- need to traverse manually (not with a fixed `for`),
- must **remove elements safely while traversing**,
- do not need an index, or
- use a collection that has no indexed access (e.g. a `Set`).

The enhanced `for` loop is just this pattern with the boilerplate hidden — it obtains an iterator behind the scenes for any `Iterable`.

## Syntax / Pattern

```java
import java.util.Iterator;

Iterator<ElementType> it = collection.iterator();  // collection hands you a cursor

while (it.hasNext()) {                 // is another element left?
    ElementType value = it.next();     // read current element, advance cursor
    // ... use value; call it.remove() here to delete it safely
}
```

### Core methods

| Method | Purpose |
|---|---|
| `hasNext()` | Returns `true` when another element remains (checks only — does **not** advance) |
| `next()` | Returns the next element **and** advances the cursor; throws `NoSuchElementException` if none |
| `remove()` | Deletes the element last returned by `next()` (optional operation — some iterators throw `UnsupportedOperationException`) |
| `forEachRemaining(action)` | Applies an action to every element not yet visited |

## Worked Example

```java
import java.util.ArrayList;
import java.util.Iterator;

public class Main {
    public static void main(String[] args) {
        ArrayList<String> cars = new ArrayList<>();
        cars.add("Volvo");
        cars.add("BMW");
        cars.add("Ford");

        // 1. ask the collection for its own cursor
        Iterator<String> iterator = cars.iterator();

        // 2. loop while another element remains
        while (iterator.hasNext()) {
            // 3. read the current element and advance the cursor
            String car = iterator.next();
            System.out.println(car);
        }
    }
}
```

**Explain in plain English (EiPE):** the loop pulls elements out one at a time, `hasNext()` deciding when to stop and `next()` doing the reading-and-advancing.

### Safe removal
```java
import java.util.ArrayList;
import java.util.Iterator;

public class Main {
    public static void main(String[] args) {
        ArrayList<Integer> numbers = new ArrayList<>();
        numbers.add(4);
        numbers.add(11);
        numbers.add(8);
        numbers.add(15);

        Iterator<Integer> iterator = numbers.iterator();
        while (iterator.hasNext()) {
            int number = iterator.next();   // 1. read + advance
            if (number % 2 != 0) {
                iterator.remove();          // 2. delete what next() just returned
            }
        }
        System.out.println(numbers);        // 3. [4, 8]
    }
}
```
Removing through the **iterator** keeps its internal state in sync, so the traversal stays valid. Removing through the collection directly (`numbers.remove(...)`) inside a loop can trigger a `ConcurrentModificationException`. A one-line modern alternative is `numbers.removeIf(n -> n % 2 != 0);`.

## Trace
**Predict the output first (write it before reading on):**  `___`

Collection: `[Volvo, BMW, Ford]`, cursor starting before the first element.

| Step | Call | Returns | Cursor after | Output |
|---|---|---|---|---|
| 1 | `hasNext()` | `true` | before `Volvo` | — |
| 2 | `next()` | `"Volvo"` | before `BMW` | `Volvo` |
| 3 | `hasNext()` | `true` | before `BMW` | — |
| 4 | `next()` | `"BMW"` | before `Ford` | `BMW` |
| 5 | `hasNext()` | `true` | before `Ford` | — |
| 6 | `next()` | `"Ford"` | at end | `Ford` |
| 7 | `hasNext()` | `false` | at end | — (loop ends) |

**Actual output:**
```text
Volvo
BMW
Ford
```
`hasNext()` only checks; `next()` retrieves *and* moves. The loop stops the moment `hasNext()` returns `false`.

## Faded Practice
Fill the blank so odd numbers are removed **without** ever touching `numbers` directly (the load-bearing line):
```java
Iterator<Integer> it = numbers.iterator();
while (it.hasNext()) {
    int n = it.next();
    if (n % 2 != 0) {
        ______;   // delete the element next() just returned, safely
    }
}
```
> [!answer]- Answer
> `it.remove()` — it deletes the last element returned by `next()` and updates the iterator's own state. Writing `numbers.remove(n)` here would modify the list behind the iterator's back and risk a `ConcurrentModificationException`.

## Common Mistakes
- Calling `next()` when no elements remain → `NoSuchElementException`. `next()` is safe as long as elements are left; guard manual `next()` with `hasNext()` (a `while`/for-each does this for you).
- Calling `remove()` before `next()`, or twice after one `next()` → `IllegalStateException`; `remove()` needs a "last returned" element to delete.
- Modifying the collection directly (`collection.remove(...)`, `collection.add(...)`) mid-traversal → `ConcurrentModificationException`; mutate via `iterator.remove()` or `removeIf` instead.
- Expecting a basic `Iterator` to go backward → it is forward-only; use `ListIterator` for bidirectional movement.
- Thinking `Iterator` is a class you `new` → it is an interface; obtain one from `collection.iterator()`.
- Assuming `hasNext()` advances the cursor → it only reports whether more elements exist.

## Examples and Non-Examples
**Example — obtain an iterator, then remove safely:**
```java
Iterator<String> it = names.iterator();
while (it.hasNext()) {
    if (it.next().isBlank()) {
        it.remove();          // safe: goes through the iterator
    }
}
```
**Non-Example — instantiate the interface:**
```java
Iterator<String> it = new Iterator<>();
// FALSE BELIEF: "Iterator is a class you construct."
// It is an interface; the collection supplies an implementing object via iterator().
```
**Non-Example — remove through the collection while iterating:**
```java
for (String name : names) {
    names.remove(name);       // FALSE BELIEF: "the for-each loop lets me edit the list."
}                             // structural change behind the iterator -> ConcurrentModificationException
```

## Iterator vs Alternatives

**Iterator vs enhanced `for`:**

| Feature | `Iterator` | Enhanced `for` |
|---|---|---|
| Simple read-only traversal | More verbose | Best choice |
| Manual cursor control | Yes | No |
| Safe removal while traversing | Yes (`remove()`) | No |
| Index available | No | No |
| Works with any `Iterable` | Yes | Yes (uses an iterator internally) |

**Iterator vs `ListIterator`** — a `ListIterator` (from `list.listIterator()`) adds `previous()` (move backward), `nextIndex()`/`previousIndex()`, and `set()`/`add()`. A basic `Iterator` is forward-only and can only read and `remove()`.

**Iterating a `Map`** — a `Map` is not directly a collection of single elements, so iterate one of its views:
```java
Iterator<Map.Entry<String, Integer>> it = scores.entrySet().iterator();
// or scores.keySet().iterator() / scores.values().iterator()
```

## Recall Questions
%% Review via the Spaced Repetition plugin (Cmd/Ctrl+P > "Review flashcards"), not by rereading. %%
#flashcards/java/iterator

Why is `iterator.remove()` safe while `collection.remove(...)` inside a loop is not?
?
The iterator tracks a modification count; a change made outside it invalidates the cursor and triggers `ConcurrentModificationException`. `iterator.remove()` updates that count in step, so the cursor stays consistent.

## Mini Practice
1. Build `ArrayList<String>` with `Java, Python, JavaScript, C#, SQL`. Use an iterator to remove every value shorter than four characters. **Expected output:** `[Java, Python, JavaScript]`. (Predict it, then run.)
2. Rewrite #1 as a single statement with `removeIf`. **Success criterion:** identical output in one line.
3. Iterate a `Map<String, Integer> scores` with `entrySet().iterator()` and print each `key=value`. **Success criterion:** one line per entry, no `ConcurrentModificationException`.

## Mistake Log
When you miss one, add it to [[Collections Mistake Log]] as: wrong output → minimal repro → misconception → recall-question form → fix.

## Links
- Contrast: [[ListIterator]] (bidirectional, `set`/`add`) vs Iterator (forward-only) · Iterator vs [[Enhanced For Loop]]
- Map: [[Collections MOC]]
- Related: [[Iterable Interface]] · [[ArrayList]] · [[ConcurrentModificationException]] · [[removeIf]]
- Prerequisites: [[Interfaces]] · [[Generics in Java]]

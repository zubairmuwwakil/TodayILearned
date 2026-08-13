---
type: overview
topic: collections
status: learning
difficulty: easy
tags:
  - java
  - collections
  - interfaces
  - collections-framework
aliases:
  - Java Collections
  - Java Collections Framework
---
# Java Collections Framework

> [!info] Map note
> This is the entry point for [[Collections MOC]]. It sketches the whole framework at a high level; the deep dives on each type (`List`, `Set`, `Map`) live in their own notes linked at the bottom.

## What it is

The **Java Collections Framework** is a unified set of **interfaces**, **implementing classes**, and **algorithms** for storing and manipulating groups of objects.

A **collection** is a single object that represents a group of other objects. Instead of writing a resizable list, queue, set, or key–value store from scratch, you reuse tested implementations such as `ArrayList`, `LinkedList`, `HashSet`, and `HashMap`.

The key idea: you program against **common interfaces** (`List`, `Set`, `Map`), so your code doesn't depend on one specific internal implementation.

## Why it matters

Real programs constantly need to store an unknown number of objects, add and remove elements, search for values, forbid duplicates, preserve insertion order, associate keys with values, and sort or search data.

A plain array can hold many values, but its **length is fixed at creation**. The framework gives you data structures that resize automatically and come with rich, reusable operations — so you spend time on logic, not on re-implementing dynamic arrays and hash tables.

## The Framework Map

Three kinds of pieces fit together:

**1. Interfaces** — describe *what operations* a structure supports.

| Interface | Main idea |
|---|---|
| `List<E>` | Ordered elements; duplicates allowed; index access |
| `Set<E>` | Unique elements; no duplicates |
| `Queue<E>` | Elements waiting to be processed (usually FIFO) |
| `Deque<E>` | Add/remove at **both** ends |
| `Map<K, V>` | Keys mapped to values; keys are unique |

**2. Implementations** — the concrete classes that provide the data structure and method bodies.

| Interface | Common implementations |
|---|---|
| `List<E>` | `ArrayList<E>`, `LinkedList<E>` |
| `Set<E>` | `HashSet<E>`, `LinkedHashSet<E>`, `TreeSet<E>` |
| `Queue<E>` / `Deque<E>` | `ArrayDeque<E>`, `LinkedList<E>` |
| `Map<K, V>` | `HashMap<K, V>`, `LinkedHashMap<K, V>`, `TreeMap<K, V>` |

**3. Algorithms and utility methods** — static helpers in the `Collections` class:

```java
Collections.sort(list);
Collections.reverse(list);
Collections.shuffle(list);
```

The sibling `Arrays` utility class offers similar helpers for raw arrays:

```java
Arrays.sort(numbers);
```

## Syntax / Pattern

```java
import java.util.ArrayList;
import java.util.List;

InterfaceType<ElementType> variable = new ImplementingClass<>();
List<String> names = new ArrayList<>();   // declare as the interface, build with a class
```

Declare the variable as the **interface** and instantiate a **concrete class** — that's "program to the interface, not the implementation".

## Worked Example

```java
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        // 1. program to the List interface, back it with an ArrayList
        List<String> tasks = new ArrayList<>();

        // 2. add elements — the list grows automatically, no fixed size
        tasks.add("Study Java");
        tasks.add("Play pickleball");
        tasks.add("Review notes");

        // 3. print the whole list and its current size
        System.out.println(tasks);
        System.out.println("Number of tasks: " + tasks.size());
    }
}
```

**Explain in plain English (EiPE):** we build a growable, ordered list of strings through the `List` interface, add three items, then print the list and how many it holds.

## Trace
**Predict the output first (write it before reading on):**  `___`

| Line | Statement | `tasks` | Output |
|---|---|---|---|
| 1 | `List<String> tasks = new ArrayList<>();` | `[]` | — |
| 2 | `tasks.add("Study Java");` | `[Study Java]` | — |
| 3 | `tasks.add("Play pickleball");` | `[Study Java, Play pickleball]` | — |
| 4 | `tasks.add("Review notes");` | `[Study Java, Play pickleball, Review notes]` | — |
| 5 | `System.out.println(tasks);` | *(unchanged)* | `[Study Java, Play pickleball, Review notes]` |
| 6 | `System.out.println("Number of tasks: " + tasks.size());` | *(unchanged)* | `Number of tasks: 3` |

**Actual output:**
```text
[Study Java, Play pickleball, Review notes]
Number of tasks: 3
```
Printing a `List` calls its `toString`, which renders elements in insertion order inside square brackets.

## Faded Practice
Fill the blank so the variable can later be re-bound to a `LinkedList` without touching any other line (the load-bearing decision):
```java
______<String> tasks = new ArrayList<>();   // which type keeps this code implementation-agnostic?
tasks.add("Study Java");
```
> [!answer]- Answer
> `List` — the interface type. Declaring the variable as `List` (not `ArrayList`) means the rest of the code depends only on `List` operations, so you can swap in `new LinkedList<>()` later and nothing else changes.

## Collection vs Collections

Two names that look alike but mean different things:

| Name | Meaning |
|---|---|
| `Collection<E>` | Root **interface** of the collection hierarchy (extends `Iterable`) |
| `Collections` | **Utility class** of static algorithms (`sort`, `reverse`, …) |
| Collections Framework | The overall architecture (interfaces + classes + algorithms) |

```java
Collection<String> values = new ArrayList<>();  // the interface
Collections.sort(list);                          // the utility class (note the trailing s)
```

## Map is not a Collection

`Map<K, V>` is part of the framework, but it is **not** a subtype of `Collection<E>`:

```text
Collection<E> hierarchy          Map<K, V> hierarchy
        |                                |
   List / Set / Queue / Deque       HashMap / TreeMap / LinkedHashMap
```

The hierarchies are separate because a map stores **key–value associations**, not individual elements the way a `Collection` does. (You *can* view a map's keys, values, or entries as collections via `keySet()`, `values()`, and `entrySet()`.)

## Common Mistakes
- Thinking `Map` extends `Collection` → it's in the framework but a **separate** interface hierarchy (it stores key–value pairs, not single elements).
- Confusing `Collection` with `Collections` → the interface is the root type; the class with the trailing **`s`** is the static-method helper.
- Using a primitive as a type argument, `ArrayList<int>` → generics require **reference** types; use the wrapper `ArrayList<Integer>`.
- Declaring the variable as the concrete class (`ArrayList<String> x = …`) → prefer the interface (`List<String> x = …`) so the implementation can change later.
- Reaching for a fixed-size array when the count is unknown → arrays can't grow; use a `List`.

## Examples and Non-Examples
**Example — a collection object:**
```java
List<Integer> scores = new ArrayList<>();   // resizable, ordered, indexed
```
**Example — a map object:**
```java
Map<String, Integer> ages = new HashMap<>();  // keys → values
```
**Non-Example — a fixed-size array:**
```java
int[] scores = new int[5];
// FALSE BELIEF: "any structure that holds many values is part of the Collections Framework."
// An array holds multiple values but has a fixed length and implements no collection interface.
```

## Recall Questions
%% Review via the Spaced Repetition plugin (Cmd/Ctrl+P > "Review flashcards"), not by rereading. %%
#flashcards/java/collections

Why is `Map<K, V>` not a subtype of `Collection<E>`?
?
A map stores key–value associations rather than single elements, so it lives in its own interface hierarchy — still part of the framework, but separate.

What is the difference between `Collection` and `Collections`?
?
`Collection` is the root interface of the collection hierarchy; `Collections` (with the `s`) is a utility class full of static helper methods.

Why declare `List<String> x = new ArrayList<>();` instead of `ArrayList<String> x = …`?
?
Programming to the interface lets you swap the implementation (e.g. `LinkedList`) later without changing any other line of code.

## Mini Practice
1. Start from the Worked Example, add a fourth task, then reprint the size. **Expected output:** `Number of tasks: 4` (predict the printed list line too, then run).
2. Change only the declaration/instantiation to `List<String> tasks = new LinkedList<>();`, leaving every other line untouched. **Success criterion:** the output is identical — proof that programming to the interface decouples your code from the implementation.
3. Try `ArrayList<int> nums = new ArrayList<>();`. **Success criterion:** it fails to compile; fix it with `ArrayList<Integer>`, add two numbers, and confirm it runs. (Predict the compiler's objection first, then run.)

## Mistake Log
When you miss one, log it to [[Collections Mistake Log]] as: wrong output → minimal repro → misconception → recall-question form → fix.

## Links
- Contrast: [[Java Arrays]] (fixed-size, no framework methods) vs the dynamic Collections Framework
- Map: [[Collections MOC]]
- Related: [[02 - ArrayList Fundamentals]] · [[Set Interface and HashSet]] · [[Map Interface and HashMap]] · [[04 - Iterator Interface]]
- In practice: [[03 - List Interface and Polymorphism]] · [[06 - ArrayList vs LinkedList]]
- Prerequisites: [[Interfaces]] · [[Java Arrays]]

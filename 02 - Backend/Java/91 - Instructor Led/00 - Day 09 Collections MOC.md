---
tags:
  - java
  - collections
  - instructor-led
  - day-09
date: 2026-07-16
aliases:
  - Day 9 Java Collections
---

# Day 09 — Java Collections

## Learning Goals

By the end of this section, you should be able to:

- explain why Java collections are used instead of basic arrays
- distinguish an **interface** from an **implementing class**
- create and modify an `ArrayList`
- declare a variable using the `List` interface
- explain how `iterator()` returns an object whose class implements `Iterator`
- safely remove collection elements while iterating
- explain the internal difference between `ArrayList` and `LinkedList`
- select a list implementation based on the operations your program performs

## Topic Map

1. [[01 - Java Collections Framework]]
2. [[02 - ArrayList Fundamentals]]
3. [[03 - List Interface and Polymorphism]]
4. [[04 - Iterator Interface]]
5. [[05 - LinkedList Fundamentals]]
6. [[06 - ArrayList vs LinkedList]]
7. [[07 - Collections Practice and Review]]

## Core Mental Model

```text
Interface = describes available behaviour
Class     = provides the implementation
Object    = the usable runtime instance
```

Example:

```java
List<String> names = new ArrayList<>();
```

- `List<String>` is the **reference type**
- `ArrayList<>` is the **class being instantiated**
- `names` stores a reference to the new `ArrayList` object
- the object can be used through the methods promised by `List`

## Collections Hierarchy — Simplified

```text
Iterable
└── Collection
    ├── List
    │   ├── ArrayList
    │   └── LinkedList
    ├── Set
    │   └── HashSet
    └── Queue
        └── Deque
            └── LinkedList

Map
└── HashMap
```

> [!important]
> `Map` belongs to the Java Collections Framework, but it does **not** extend the `Collection` interface. Java has a `Collection` hierarchy and a separate `Map` hierarchy.

## High-Value Comparisons

| Feature | Array | ArrayList | LinkedList |
|---|---|---|---|
| Size | Fixed | Resizable | Resizable |
| Stores primitive types directly | Yes | No generic primitives | No generic primitives |
| Indexed access | Fast | Fast | Slow for arbitrary indexes |
| Add/remove at end | Fixed structure | Usually fast | Fast |
| Add/remove near beginning | Requires shifting | Requires shifting | Fast after the node is located |
| Memory overhead | Low | Moderate | Higher per element |
| Best default | Fixed-size data | Most general-purpose lists | Frequent deque/end operations |

## Review Schedule

Use active recall instead of rereading:

- **Today:** answer each note’s recall questions without looking
- **Tomorrow:** complete the practice file
- **3 days later:** explain `List<String> x = new ArrayList<>();` aloud
- **1 week later:** recreate the ArrayList and Iterator examples from memory

## Source Material

These notes were created from Day 9 instructor-led material dated July 16, 2026 and corrected against the Java Collections API mental model.

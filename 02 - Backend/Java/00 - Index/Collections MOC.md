---
type: moc
topic: collections
tags:
  - java
  - moc
  - collections
---
# Collections MOC

> [!info] What this map is for
> A single hub over the whole `06.1 - Collections` folder so you can compare List vs Set vs Map side by side. The performance table below is **embedded** from its canonical note — edit it in one place and it updates everywhere (single source of truth).

## Start here
- [[01 - Java Collections Framework]] — the big picture: interfaces vs implementations

## List
- [[02 - ArrayList Fundamentals]]
- [[05 - LinkedList Fundamentals]]
- [[06 - ArrayList vs LinkedList]] *(decision note)*
- [[03 - List Interface and Polymorphism]]

## Set
- [[Set Interface and HashSet]]
- [[LinkedHashSet]]
- [[50 Resources/Software Engineering/02 - Backend/Java/06.1 - Collections/03 - Sets/TreeSet]]
- [[Set Implementations Comparison]]

## Map
- [[Map Interface and HashMap]]
- [[LinkedHashMap]]
- [[TreeMap]]
- [[Map Implementations Comparison]]

## Iteration
- [[04 - Iterator Interface]]

## Canonical performance reference (embedded, not copied)
![[06 - ArrayList vs LinkedList#Practical Performance Table]]

## Choosing, from memory (interleave check)
Answer before peeking at the notes:
1. Fast indexed access + mostly appends → ?
2. Need insertion order preserved in a Set → ?
3. Sorted keys with range lookups → ?
4. Pure queue/stack, no `List` ops → ?
5. Why do `HashSet`/`HashMap` need a correct `equals()`/`hashCode()` pair?

## Review & practice
- [[07 - Collections Practice and Review]]

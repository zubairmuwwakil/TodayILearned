---
tags: [java, day-10, active-recall, practice]
---

# Day 10 - Retrieval Practice

## Sets

1. Why does `HashSet.add(value)` return a boolean?
2. Predict the size:

```java
Set<Integer> set = new HashSet<>();
set.add(10);
set.add(20);
set.add(10);
```

3. Which implementation should you use for:
   - fastest general membership lookup
   - insertion order
   - sorted order
4. Explain why Sets do not have `get(index)`.
5. What is the difference between `removeAll()` and `retainAll()`?

## Maps

6. Predict the result:

```java
Map<String, Integer> map = new HashMap<>();
map.put("A", 1);
map.put("A", 2);
System.out.println(map.size());
System.out.println(map.get("A"));
```

7. Why can values be duplicated while keys cannot?
8. What are the return types of `keySet()`, `values()`, and `entrySet()`?
9. Why is `entrySet()` often the best way to iterate?
10. Choose `HashMap`, `LinkedHashMap`, or `TreeMap` for:
    - user ID lookup
    - insertion-ordered report
    - date-range lookup

## Streams

11. Label each stage:

```java
List<String> result = names.stream()
    .filter(name -> name.length() > 3)
    .map(String::toUpperCase)
    .toList();
```

12. Why are intermediate operations called lazy?
13. What happens if a Stream has no terminal operation?
14. Explain the difference between `filter()` and `map()`.
15. What does `count()` return?
16. Why might `Collectors.toMap()` throw an exception?
17. Why is `forEach()` usually not the best way to construct a List?
18. Are Streams automatically faster than loops? Explain.

## Code Tracing

Predict the output before running:

```java
List<Integer> numbers = List.of(1, 2, 2, 3, 4, 4);

long result = numbers.stream()
    .distinct()
    .filter(number -> number % 2 == 0)
    .count();

System.out.println(result);
```

## Mini Build

Create a program that:

1. receives a List of words
2. removes duplicates while preserving first-seen order
3. creates a Map from each word to its length
4. uses a Stream to keep words of length five or greater
5. prints the final entries

## Spaced-Repetition Schedule

- Today: answer all questions without notes.
- Tomorrow: retry missed questions.
- In 3 days: rebuild the mini program from memory.
- In 7 days: explain Set, Map, and Stream differences aloud in under three minutes.
